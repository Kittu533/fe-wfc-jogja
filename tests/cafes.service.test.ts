import { describe, expect, it } from "vitest";

import { getCafeBySlug, getCafes, getCuratedListBySlug } from "@/lib/services/cafes";

describe("cafes service", () => {
  it("filters cafes by query, area, and price level", async () => {
    const result = await getCafes({
      q: "kopi",
      area: "Seturan",
      priceLevel: "menengah",
    });

    expect(result.items.length).toBeGreaterThan(0);
    expect(
      result.items.every(
        (cafe) =>
          cafe.area === "Seturan" &&
          cafe.priceLevel === "menengah" &&
          `${cafe.name} ${cafe.tagline}`.toLowerCase().includes("kopi"),
      ),
    ).toBe(true);
  });

  it("returns cafe detail by slug with reviews", async () => {
    const cafe = await getCafeBySlug("space-roastery-seturan");

    expect(cafe).toBeTruthy();
    expect(cafe?.name).toBe("Space Roastery Seturan");
    expect(cafe?.reviews.length).toBeGreaterThan(0);
  });

  it("returns curated list items only from that list", async () => {
    const curatedList = await getCuratedListBySlug("cafe-buat-skripsi-seharian");

    expect(curatedList).toBeTruthy();
    expect(curatedList?.cafes.length).toBeGreaterThan(0);
    expect(
      curatedList?.cafes.every((cafe) =>
        curatedList.cafeSlugs.includes(cafe.slug),
      ),
    ).toBe(true);
  });
});
