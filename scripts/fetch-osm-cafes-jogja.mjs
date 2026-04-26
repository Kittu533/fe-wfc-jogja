#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OVERPASS_ENDPOINT =
  process.env.OVERPASS_ENDPOINT ?? "https://overpass-api.de/api/interpreter";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "data";
const OUTPUT_BASENAME = process.env.OUTPUT_BASENAME ?? "osm-wfc-candidates-jogja";
const FETCH_WEBSITE_IMAGES = process.env.FETCH_WEBSITE_IMAGES !== "0";
const REQUIRE_REAL_IMAGES = process.env.REQUIRE_REAL_IMAGES === "1";
const IMAGE_FETCH_TIMEOUT_MS = Number(process.env.IMAGE_FETCH_TIMEOUT_MS ?? 15000);

const FALLBACK_COVER_IMAGES = {
  cafe: "/dataset-images/wfc-cafe.svg",
  coffee_shop: "/dataset-images/wfc-coffee.svg",
  coworking_space: "/dataset-images/wfc-coworking.svg",
  wifi_spot: "/dataset-images/wfc-wifi.svg",
  other: "/dataset-images/wfc-cafe.svg",
};

const JOGJA_BBOX = {
  south: -7.88,
  west: 110.29,
  north: -7.68,
  east: 110.48,
};

const overpassQuery = `
[out:json][timeout:60];
(
  node["amenity"="cafe"](${JOGJA_BBOX.south},${JOGJA_BBOX.west},${JOGJA_BBOX.north},${JOGJA_BBOX.east});
  way["amenity"="cafe"](${JOGJA_BBOX.south},${JOGJA_BBOX.west},${JOGJA_BBOX.north},${JOGJA_BBOX.east});
  relation["amenity"="cafe"](${JOGJA_BBOX.south},${JOGJA_BBOX.west},${JOGJA_BBOX.north},${JOGJA_BBOX.east});
  node["office"="coworking"](${JOGJA_BBOX.south},${JOGJA_BBOX.west},${JOGJA_BBOX.north},${JOGJA_BBOX.east});
  way["office"="coworking"](${JOGJA_BBOX.south},${JOGJA_BBOX.west},${JOGJA_BBOX.north},${JOGJA_BBOX.east});
  relation["office"="coworking"](${JOGJA_BBOX.south},${JOGJA_BBOX.west},${JOGJA_BBOX.north},${JOGJA_BBOX.east});
  node["amenity"="coworking_space"](${JOGJA_BBOX.south},${JOGJA_BBOX.west},${JOGJA_BBOX.north},${JOGJA_BBOX.east});
  way["amenity"="coworking_space"](${JOGJA_BBOX.south},${JOGJA_BBOX.west},${JOGJA_BBOX.north},${JOGJA_BBOX.east});
  relation["amenity"="coworking_space"](${JOGJA_BBOX.south},${JOGJA_BBOX.west},${JOGJA_BBOX.north},${JOGJA_BBOX.east});
  node["name"~"coffee|kopi|cafe|kafe|coffeeshop|roastery|espresso|cowork|co-work|workspace|working space|study",i](${JOGJA_BBOX.south},${JOGJA_BBOX.west},${JOGJA_BBOX.north},${JOGJA_BBOX.east});
  way["name"~"coffee|kopi|cafe|kafe|coffeeshop|roastery|espresso|cowork|co-work|workspace|working space|study",i](${JOGJA_BBOX.south},${JOGJA_BBOX.west},${JOGJA_BBOX.north},${JOGJA_BBOX.east});
  relation["name"~"coffee|kopi|cafe|kafe|coffeeshop|roastery|espresso|cowork|co-work|workspace|working space|study",i](${JOGJA_BBOX.south},${JOGJA_BBOX.west},${JOGJA_BBOX.north},${JOGJA_BBOX.east});
);
out center tags;
`;

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  console.log("Fetching WFC-focused candidates from OpenStreetMap Overpass...");

  const response = await fetch(OVERPASS_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "user-agent": "wfc-jogja-dataset-builder/0.1",
    },
    body: new URLSearchParams({ data: overpassQuery }),
  });

  if (!response.ok) {
    throw new Error(`Overpass request failed: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();
  const candidates = payload.elements
    .map(normalizeElement)
    .filter(Boolean)
    .filter(isWfcCandidate)
    .sort((a, b) => a.name.localeCompare(b.name, "id"));

  const uniqueCandidates = dedupeByNameAndCoordinate(candidates);
  const enrichedCandidates = (await enrichImages(uniqueCandidates))
    .map(ensureMandatoryImage)
    .filter((item) => !REQUIRE_REAL_IMAGES || item.imageStatus === "scraped");
  const outputDir = path.resolve(process.cwd(), OUTPUT_DIR);

  await mkdir(outputDir, { recursive: true });

  const jsonPath = path.join(outputDir, `${OUTPUT_BASENAME}.json`);
  const csvPath = path.join(outputDir, `${OUTPUT_BASENAME}.csv`);

  await writeFile(jsonPath, `${JSON.stringify(enrichedCandidates, null, 2)}\n`);
  await writeFile(csvPath, toCsv(enrichedCandidates));

  const scrapedImageCount = enrichedCandidates.filter((item) => item.imageStatus === "scraped").length;

  console.log(`Done. Found ${enrichedCandidates.length} WFC candidate places.`);
  console.log(`Images: ${scrapedImageCount} scraped images, ${enrichedCandidates.length - scrapedImageCount} fallback covers.`);
  console.log(`JSON: ${jsonPath}`);
  console.log(`CSV : ${csvPath}`);
}

function normalizeElement(element) {
  const tags = element.tags ?? {};
  const latitude = element.lat ?? element.center?.lat;
  const longitude = element.lon ?? element.center?.lon;
  const name = clean(tags.name);

  if (!name || !latitude || !longitude) {
    return null;
  }

  return {
    source: "openstreetmap",
    sourceId: `${element.type}/${element.id}`,
    name,
    slug: slugify(name),
    amenity: clean(tags.amenity),
    category: inferCategory(tags),
    areaHint: inferArea(tags),
    address: buildAddress(tags),
    latitude: roundCoordinate(latitude),
    longitude: roundCoordinate(longitude),
    phone: clean(tags.phone ?? tags["contact:phone"]),
    website: clean(tags.website ?? tags["contact:website"]),
    instagram: clean(tags.instagram ?? tags["contact:instagram"]),
    imageUrl: inferDirectImageUrl(tags),
    imageSource: inferDirectImageSource(tags),
    imageStatus: inferDirectImageUrl(tags) ? "scraped" : "missing",
    realImageUrl: inferDirectImageUrl(tags),
    fallbackCoverImage: inferFallbackCoverImage(tags),
    openingHours: clean(tags.opening_hours),
    cuisine: clean(tags.cuisine),
    internetAccess: clean(tags.internet_access),
    hasWifiSignal: hasWifiSignal(tags),
    wfcScore: estimateWfcScore(tags, name),
    rawTags: tags,
    curationStatus: "needs_review",
    notes:
      "Candidate from OpenStreetMap. Verify WFC quality manually: wifi, sockets, ambience, seating, and current operating status.",
  };
}

async function enrichImages(items) {
  if (!FETCH_WEBSITE_IMAGES) {
    return items;
  }

  return Promise.all(
    items.map(async (item) => {
      if (item.imageUrl || !isFetchableWebsite(item.website)) {
        return item;
      }

      const websiteImageUrl = await fetchWebsiteImageUrl(item.website);

      if (!websiteImageUrl) {
        return item;
      }

      return {
        ...item,
        imageUrl: websiteImageUrl,
        imageSource: "website-og-image",
        imageStatus: "scraped",
        realImageUrl: websiteImageUrl,
      };
    }),
  );
}

function ensureMandatoryImage(item) {
  if (item.imageUrl) {
    return {
      ...item,
      imageStatus: item.imageStatus === "scraped" ? "scraped" : "fallback",
      realImageUrl: item.imageStatus === "scraped" ? item.imageUrl : item.realImageUrl || "",
    };
  }

  return {
    ...item,
    imageUrl: item.fallbackCoverImage,
    imageSource: "fallback-cover",
    imageStatus: "fallback",
    realImageUrl: "",
  };
}

function dedupeByNameAndCoordinate(items) {
  const seen = new Set();

  return items.filter((item) => {
    const key = [
      item.name.toLowerCase(),
      item.latitude.toFixed(4),
      item.longitude.toFixed(4),
    ].join("|");

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function isWfcCandidate(item) {
  if (isExcludedPlace(item.rawTags)) {
    return false;
  }

  if (item.category === "coworking_space" || item.category === "coffee_shop") {
    return true;
  }

  if (item.category === "cafe" && (item.hasWifiSignal || item.wfcScore >= 3)) {
    return true;
  }

  if (item.hasWifiSignal && looksLikeWorkFriendlyName(item.name)) {
    return true;
  }

  return item.wfcScore >= 3;
}

function isExcludedPlace(tags) {
  const amenity = clean(tags.amenity).toLowerCase();
  const tourism = clean(tags.tourism).toLowerCase();
  const shop = clean(tags.shop).toLowerCase();
  const name = clean(tags.name).toLowerCase();
  const fields = [amenity, tourism, shop, name].join(" ");

  if (/restaurant|fast_food|food_court|bar|pub|nightclub|atm|bank/.test(amenity)) {
    return true;
  }

  if (/hotel|guest_house|hostel|motel|apartment|homestay/.test(tourism)) {
    return true;
  }

  if (/hotel|guesthouse|guest house|hostel|homestay|villa|resort/.test(name)) {
    return true;
  }

  if (
    /atm|bank|bukopin|fotokopi|photo copy|photocopy|resto|restaurant|dapur|angkringan|bakso|soto|mie ayam|ayam geprek|nasi goreng|warung|seafood|steakhouse|juice|jus|es krim|martabak|pempek|sate/.test(
      fields,
    )
  ) {
    return true;
  }

  return false;
}

function inferCategory(tags) {
  const amenity = clean(tags.amenity).toLowerCase();
  const office = clean(tags.office).toLowerCase();
  const name = clean(tags.name).toLowerCase();

  if (office === "coworking" || amenity === "coworking_space") {
    return "coworking_space";
  }

  if (/coffee|kopi|coffeeshop|coffee shop|roastery|espresso/.test(name)) {
    return "coffee_shop";
  }

  if (amenity === "cafe" || /cafe|kafe/.test(name)) {
    return "cafe";
  }

  if (hasWifiSignal(tags)) {
    return "wifi_spot";
  }

  return "other";
}

function inferDirectImageUrl(tags) {
  const candidate = clean(
    tags.image ??
      tags["image:0"] ??
      tags["contact:image"] ??
      wikimediaCommonsImageUrl(tags.wikimedia_commons),
  );

  if (!candidate || !isAllowedImageUrl(candidate)) {
    return "";
  }

  return candidate;
}

function inferDirectImageSource(tags) {
  const directImage = clean(tags.image ?? tags["image:0"] ?? tags["contact:image"]);

  if (directImage && isAllowedImageUrl(directImage)) {
    return "openstreetmap-image-tag";
  }

  if (wikimediaCommonsImageUrl(tags.wikimedia_commons)) {
    return "wikimedia-commons";
  }

  return "";
}

function inferFallbackCoverImage(tags) {
  return FALLBACK_COVER_IMAGES[inferCategory(tags)] ?? FALLBACK_COVER_IMAGES.other;
}

function wikimediaCommonsImageUrl(value) {
  const commons = clean(value);

  if (!commons || !commons.toLowerCase().startsWith("file:")) {
    return "";
  }

  const fileName = commons.replace(/^file:/i, "").trim();

  if (!fileName) {
    return "";
  }

  return `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(fileName)}`;
}

function isAllowedImageUrl(value) {
  let url;

  try {
    url = new URL(value);
  } catch {
    return false;
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    return false;
  }

  const hostname = url.hostname.toLowerCase();

  return !/(googleapis|googleusercontent|ggpht|google|gstatic|googleusercontent)/.test(hostname);
}

function isFetchableWebsite(value) {
  let url;

  try {
    url = new URL(value);
  } catch {
    return false;
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    return false;
  }

  return !/(instagram|facebook|wa\.me|whatsapp|tiktok|x\.com|twitter)/.test(url.hostname.toLowerCase());
}

async function fetchWebsiteImageUrl(websiteUrl) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), IMAGE_FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(websiteUrl, {
      headers: {
        accept: "text/html,application/xhtml+xml",
        "user-agent": "wfc-jogja-dataset-builder/0.1",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      return "";
    }

    const html = await response.text();
    const imageUrl = extractMetaImageUrl(html, websiteUrl);

    return isAllowedImageUrl(imageUrl) ? imageUrl : "";
  } catch {
    return "";
  } finally {
    clearTimeout(timeout);
  }
}

function extractMetaImageUrl(html, baseUrl) {
  const patterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["'][^>]*>/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["'][^>]*>/i,
    /<link[^>]+rel=["'][^"']*image_src[^"']*["'][^>]+href=["']([^"']+)["'][^>]*>/i,
    /<link[^>]+href=["']([^"']+)["'][^>]+rel=["'][^"']*image_src[^"']*["'][^>]*>/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);

    if (match?.[1]) {
      return absolutizeUrl(decodeHtmlAttribute(match[1]), baseUrl);
    }
  }

  return extractFirstContentImageUrl(html, baseUrl);
}

function extractFirstContentImageUrl(html, baseUrl) {
  const imageMatches = html.matchAll(/<img[^>]+(?:src|data-src)=["']([^"']+)["'][^>]*>/gi);

  for (const match of imageMatches) {
    const imageUrl = absolutizeUrl(decodeHtmlAttribute(match[1] ?? ""), baseUrl);

    if (isLikelyContentImage(imageUrl)) {
      return imageUrl;
    }
  }

  return "";
}

function isLikelyContentImage(value) {
  if (!value || !isAllowedImageUrl(value)) {
    return false;
  }

  return !/logo|icon|avatar|badge|sprite|placeholder|\.svg(\?|$)/i.test(value);
}

function absolutizeUrl(value, baseUrl) {
  try {
    return new URL(value, baseUrl).toString();
  } catch {
    return "";
  }
}

function decodeHtmlAttribute(value) {
  return clean(value)
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'")
    .replaceAll("&#x27;", "'");
}

function hasWifiSignal(tags) {
  const internetAccess = clean(tags.internet_access).toLowerCase();
  const name = clean(tags.name).toLowerCase();
  const description = [
    tags.description,
    tags["description:id"],
    tags["description:en"],
    tags.note,
    tags.cuisine,
  ]
    .map(clean)
    .join(" ")
    .toLowerCase();

  return (
    internetAccess === "wlan" ||
    internetAccess === "wifi" ||
    /wifi|wi-fi|internet/.test(name) ||
    /wifi|wi-fi|internet|cowork|working space|workspace|study/.test(description)
  );
}

function looksLikeWorkFriendlyName(name) {
  return /coffee|kopi|cafe|kafe|coffeeshop|roastery|espresso|cowork|working|workspace|space|study|library|perpus/i.test(
    name,
  );
}

function estimateWfcScore(tags, name) {
  const fields = [
    name,
    tags.amenity,
    tags.office,
    tags.cuisine,
    tags.description,
    tags["description:id"],
    tags["description:en"],
    tags.internet_access,
    tags.opening_hours,
  ]
    .map(clean)
    .join(" ")
    .toLowerCase();

  let score = 0;

  if (/coffee|kopi|cafe|kafe|coffeeshop|coffee shop|roastery|espresso/.test(fields)) score += 2;
  if (/cowork|working space|workspace|study|library|perpus/.test(fields)) score += 3;
  if (/wifi|wi-fi|internet|wlan/.test(fields)) score += 2;
  if (/24\/7|24 hours|24 jam/.test(fields)) score += 1;
  if (/restaurant|fast_food|warung|bakso|soto|mie ayam|ayam geprek|nasi|hotel|guest_house|hostel/.test(fields)) score -= 4;

  return score;
}

function inferArea(tags) {
  return clean(
    tags["addr:suburb"] ??
      tags["addr:village"] ??
      tags["addr:city"] ??
      tags["addr:district"] ??
      tags["is_in:suburb"] ??
      tags["is_in"],
  );
}

function buildAddress(tags) {
  const parts = [
    tags["addr:street"],
    tags["addr:housenumber"],
    tags["addr:suburb"] ?? tags["addr:village"],
    tags["addr:city"],
  ]
    .map(clean)
    .filter(Boolean);

  return parts.join(", ");
}

function toCsv(items) {
  const headers = [
    "source",
    "sourceId",
    "name",
    "slug",
    "amenity",
    "category",
    "areaHint",
    "address",
    "latitude",
    "longitude",
    "phone",
    "website",
    "instagram",
    "imageUrl",
    "imageSource",
    "imageStatus",
    "realImageUrl",
    "fallbackCoverImage",
    "openingHours",
    "cuisine",
    "internetAccess",
    "hasWifiSignal",
    "wfcScore",
    "curationStatus",
    "notes",
  ];

  const rows = items.map((item) =>
    headers.map((header) => csvEscape(item[header] ?? "")).join(","),
  );

  return `${headers.join(",")}\n${rows.join("\n")}\n`;
}

function csvEscape(value) {
  const stringValue = String(value);

  if (/[",\n\r]/.test(stringValue)) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }

  return stringValue;
}

function clean(value) {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim();
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function roundCoordinate(value) {
  return Number(Number(value).toFixed(7));
}
