#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const INPUT_PATH =
  process.env.INPUT_PATH ?? "data/wfc-candidates-jogja.enriched.json";
const OUTPUT_PATH =
  process.env.OUTPUT_PATH ?? "data/wfc-candidates-jogja.selected.json";
const SUMMARY_PATH =
  process.env.SUMMARY_PATH ?? "data/wfc-candidates-jogja.selection-summary.json";
const CSV_PATH =
  process.env.CSV_PATH ?? "data/wfc-candidates-jogja.selected.csv";
const SELECTION_MODE = process.env.SELECTION_MODE ?? "real-images";

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  const input = JSON.parse(await readFile(path.resolve(INPUT_PATH), "utf8"));
  const selected = input.filter((item) => isSelected(item, SELECTION_MODE));
  const summary = {
    generatedAt: new Date().toISOString(),
    inputPath: INPUT_PATH,
    outputPath: OUTPUT_PATH,
    selectionMode: SELECTION_MODE,
    totalInput: input.length,
    totalSelected: selected.length,
    rejected: input.length - selected.length,
    selectedItems: selected.map((item) => ({
      name: item.name,
      slug: item.slug,
      imageUrl: item.imageUrl,
      imageSource: item.imageSource,
      imageStatus: item.imageStatus,
      webSignalScore: item.webSignalScore ?? 0,
    })),
  };

  await writeFile(path.resolve(OUTPUT_PATH), `${JSON.stringify(selected, null, 2)}\n`);
  await writeFile(path.resolve(SUMMARY_PATH), `${JSON.stringify(summary, null, 2)}\n`);
  await writeFile(path.resolve(CSV_PATH), toCsv(selected));

  console.log(`Selection mode: ${SELECTION_MODE}`);
  console.log(`Selected ${selected.length} of ${input.length} candidates.`);
  console.log(`JSON: ${path.resolve(OUTPUT_PATH)}`);
  console.log(`CSV : ${path.resolve(CSV_PATH)}`);
  console.log(`Summary: ${path.resolve(SUMMARY_PATH)}`);
}

function isSelected(item, mode) {
  if (mode === "all") {
    return true;
  }

  if (mode === "real-images") {
    return Boolean(
      item.imageStatus === "scraped" &&
        item.realImageUrl &&
        item.imageUrl &&
        !String(item.imageUrl).startsWith("/"),
    );
  }

  throw new Error(`Unknown SELECTION_MODE: ${mode}`);
}

function toCsv(items) {
  const headers = [
    "name",
    "slug",
    "category",
    "areaHint",
    "address",
    "latitude",
    "longitude",
    "website",
    "imageUrl",
    "imageSource",
    "imageStatus",
    "realImageUrl",
    "webSignalScore",
    "freshnessStatus",
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
