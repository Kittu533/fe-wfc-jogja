#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DATASET_PATH =
  process.env.DATASET_PATH ?? "data/osm-wfc-candidates-jogja.json";
const SOURCES_PATH =
  process.env.SOURCES_PATH ?? "data/web-discovery-sources.json";
const SOCIAL_SIGNALS_PATH =
  process.env.SOCIAL_SIGNALS_PATH ?? "data/social-discovery-signals.json";
const OUTPUT_PATH =
  process.env.OUTPUT_PATH ?? "data/wfc-candidates-jogja.enriched.json";
const SUMMARY_PATH =
  process.env.SUMMARY_PATH ?? "data/web-discovery-summary.json";
const FETCH_TIMEOUT_MS = Number(process.env.FETCH_TIMEOUT_MS ?? 12000);

const SIGNAL_KEYWORDS = [
  "wfc",
  "work from cafe",
  "nugas",
  "kerja",
  "coworking",
  "co-working",
  "wifi",
  "wi-fi",
  "internet",
  "colokan",
  "stop kontak",
  "laptop",
  "meeting",
  "remote",
  "skripsi",
  "mahasiswa",
  "24 jam",
  "buka 24",
];

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  const dataset = JSON.parse(await readFile(path.resolve(DATASET_PATH), "utf8"));
  const sources = JSON.parse(await readFile(path.resolve(SOURCES_PATH), "utf8"));
  const socialSignals = await readOptionalJson(SOCIAL_SIGNALS_PATH, []);

  console.log(`Enriching ${dataset.length} candidates from ${sources.length} web sources...`);

  const fetchedSources = await Promise.all(sources.map(fetchSource));
  const socialSources = normalizeSocialSignals(socialSignals);
  const allSignals = [...fetchedSources.filter(Boolean), ...socialSources];
  const enriched = dataset
    .map((candidate) => enrichCandidate(candidate, allSignals))
    .sort((a, b) => b.webSignalScore - a.webSignalScore || b.wfcScore - a.wfcScore || a.name.localeCompare(b.name, "id"));

  const summary = {
    generatedAt: new Date().toISOString(),
    inputDataset: DATASET_PATH,
    outputDataset: OUTPUT_PATH,
    sourceCount: sources.length,
    fetchedSourceCount: fetchedSources.filter(Boolean).length,
    socialSignalCount: socialSources.length,
    mentionedCandidateCount: enriched.filter((item) => item.sourceMentions.length > 0).length,
    topMentionedCandidates: enriched
      .filter((item) => item.sourceMentions.length > 0)
      .slice(0, 20)
      .map((item) => ({
        name: item.name,
        slug: item.slug,
        webSignalScore: item.webSignalScore,
        mentions: item.sourceMentions.length,
        sources: item.sourceMentions.map((mention) => mention.publisher),
      })),
    sources: allSignals.map((source) => ({
      id: source.id,
      type: source.type,
      publisher: source.publisher,
      title: source.title,
      url: source.url,
      fetchedAt: source.fetchedAt,
      publishedAt: source.publishedAt,
      keywordHits: source.keywordHits,
    })),
  };

  await writeFile(path.resolve(OUTPUT_PATH), `${JSON.stringify(enriched, null, 2)}\n`);
  await writeFile(path.resolve(SUMMARY_PATH), `${JSON.stringify(summary, null, 2)}\n`);

  console.log(`Done. Mentioned candidates: ${summary.mentionedCandidateCount}.`);
  console.log(`Dataset: ${path.resolve(OUTPUT_PATH)}`);
  console.log(`Summary: ${path.resolve(SUMMARY_PATH)}`);
}

async function fetchSource(source) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(source.url, {
      headers: {
        accept: "text/html,application/xhtml+xml,application/xml,text/xml",
        "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
        "user-agent":
          "Mozilla/5.0 (compatible; wfc-jogja-web-discovery/0.1; +https://wfc-jogja.local)",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      console.warn(`Skip ${source.id}: ${response.status} ${response.statusText}`);
      return null;
    }

    const html = await response.text();
    const text = normalizeWhitespace(stripHtml(html));
    const title = extractMeta(html, "property", "og:title") || extractTitle(html) || source.title;
    const publishedAt =
      extractMeta(html, "property", "article:published_time") ||
      extractMeta(html, "name", "pubdate") ||
      extractMeta(html, "name", "date") ||
      "";

    return {
      id: source.id,
      type: source.type ?? "article",
      publisher: source.publisher ?? hostname(source.url),
      title: decodeHtml(title),
      url: source.url,
      focus: source.focus ?? [],
      fetchedAt: new Date().toISOString(),
      publishedAt,
      text,
      keywordHits: findKeywordHits(`${title} ${text}`),
    };
  } catch (error) {
    console.warn(`Skip ${source.id}: ${error.name} ${error.message}`);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function enrichCandidate(candidate, sources) {
  const aliases = buildCandidateAliases(candidate);
  const sourceMentions = sources
    .map((source) => buildMention(candidate, aliases, source))
    .filter(Boolean);
  const keywordBoost = new Set(sourceMentions.flatMap((mention) => mention.keywordHits)).size;
  const recencyBoost = sourceMentions.some((mention) => isRecentSignal(mention.publishedAt || mention.fetchedAt)) ? 2 : 0;

  return {
    ...candidate,
    sourceMentions,
    webSignalScore: sourceMentions.length * 3 + keywordBoost + recencyBoost,
    freshnessStatus: sourceMentions.length > 0 ? "has-web-signal" : "osm-only",
    lastSignalAt: latestDate(sourceMentions.map((mention) => mention.publishedAt || mention.fetchedAt)),
  };
}

function buildMention(candidate, aliases, source) {
  const sourceText = normalizeForMatch(`${source.title} ${source.text}`);
  const matchedAliases = aliases.filter((alias) => sourceText.includes(alias));

  if (matchedAliases.length === 0) {
    return null;
  }

  return {
    sourceId: source.id,
    type: source.type,
    publisher: source.publisher,
    title: source.title,
    url: source.url,
    publishedAt: source.publishedAt,
    fetchedAt: source.fetchedAt,
    matchedAliases,
    keywordHits: source.keywordHits,
    snippet: buildSnippet(source.text, matchedAliases[0]),
  };
}

function normalizeSocialSignals(signals) {
  return signals.map((signal) => ({
    id: signal.id,
    type: signal.platform ?? "social",
    publisher: signal.author ?? signal.platform ?? "social",
    title: `${signal.platform ?? "social"} signal`,
    url: signal.url,
    fetchedAt: new Date().toISOString(),
    publishedAt: signal.publishedAt ?? "",
    text: [
      signal.text,
      ...(signal.mentionedPlaces ?? []),
      ...(signal.keywords ?? []),
    ].join(" "),
    keywordHits: findKeywordHits(`${signal.text ?? ""} ${(signal.keywords ?? []).join(" ")}`),
  }));
}

async function readOptionalJson(filePath, fallback) {
  try {
    return JSON.parse(await readFile(path.resolve(filePath), "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") {
      return fallback;
    }

    throw error;
  }
}

function buildCandidateAliases(candidate) {
  const name = normalizeForMatch(candidate.name);
  const aliases = new Set([name]);

  aliases.add(name.replace(/\bcoffee\b/g, "kopi"));
  aliases.add(name.replace(/\bkopi\b/g, "coffee"));
  aliases.add(name.replace(/\bcafe\b/g, "kafe"));
  aliases.add(name.replace(/\bkafe\b/g, "cafe"));
  aliases.add(name.replace(/\s+/g, ""));

  return Array.from(aliases).filter((alias) => alias.length >= 4);
}

function findKeywordHits(value) {
  const text = normalizeForMatch(value);

  return SIGNAL_KEYWORDS.filter((keyword) => text.includes(normalizeForMatch(keyword)));
}

function buildSnippet(text, alias) {
  const normalizedText = normalizeForMatch(text);
  const index = normalizedText.indexOf(alias);

  if (index === -1) {
    return "";
  }

  const start = Math.max(0, index - 90);
  const end = Math.min(text.length, index + alias.length + 160);

  return normalizeWhitespace(text.slice(start, end));
}

function latestDate(values) {
  const timestamps = values
    .map((value) => Date.parse(value))
    .filter((value) => Number.isFinite(value));

  if (timestamps.length === 0) {
    return "";
  }

  return new Date(Math.max(...timestamps)).toISOString();
}

function isRecentSignal(value) {
  const timestamp = Date.parse(value);

  if (!Number.isFinite(timestamp)) {
    return false;
  }

  const sixMonthsMs = 1000 * 60 * 60 * 24 * 183;

  return Date.now() - timestamp < sixMonthsMs;
}

function stripHtml(value) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");
}

function extractMeta(html, attr, key) {
  const pattern = new RegExp(`<meta[^>]+${attr}=["']${escapeRegExp(key)}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i");
  const reversed = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+${attr}=["']${escapeRegExp(key)}["'][^>]*>`, "i");

  return html.match(pattern)?.[1] ?? html.match(reversed)?.[1] ?? "";
}

function extractTitle(html) {
  return html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "";
}

function hostname(value) {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "web";
  }
}

function normalizeForMatch(value) {
  return decodeHtml(String(value ?? ""))
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeWhitespace(value) {
  return decodeHtml(value).replace(/\s+/g, " ").trim();
}

function decodeHtml(value) {
  return String(value ?? "")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'")
    .replaceAll("&#x27;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&nbsp;", " ");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
