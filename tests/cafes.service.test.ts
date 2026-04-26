import { describe, expect, it, vi } from "vitest";

import { getCafeBySlug, getCafes, getCuratedListBySlug } from "@/lib/services/cafes";

describe("cafes service", () => {
  it("filters cafes by query, area, and price level", async () => {
    const result = await getCafes({
      q: "nilu",
      area: "Kaliurang",
      priceLevel: "menengah",
    });

    expect(result.items.length).toBeGreaterThan(0);
    expect(
      result.items.every(
        (cafe) =>
          cafe.area === "Kaliurang" &&
          cafe.priceLevel === "menengah" &&
          `${cafe.name} ${cafe.tagline}`.toLowerCase().includes("nilu"),
      ),
    ).toBe(true);
    expect(result.items.every((cafe) => cafe.coverImage.startsWith("http"))).toBe(true);
  });

  it("paginates cafe results", async () => {
    const result = await getCafes({ page: 2, limit: 1 });

    expect(result.page).toBe(2);
    expect(result.limit).toBe(1);
    expect(result.total).toBeGreaterThan(1);
    expect(result.totalPages).toBe(result.total);
    expect(result.items).toHaveLength(1);
  });

  it("paginates legacy API responses that do not include pagination metadata", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          items: [
            {
              id: "legacy-1",
              slug: "legacy-1",
              name: "Legacy 1",
              tagline: "Legacy cafe 1",
              area: "Jogja",
              address: "Jogja",
              priceLevel: "murah",
              rating: 4.5,
              reviewCount: 0,
              coordinates: { latitude: -7.8, longitude: 110.3 },
              coverImage: "https://example.com/1.jpg",
              featureHighlights: [],
              bestFor: [],
              amenities: {
                hasSockets: true,
                hasMusholla: false,
                hasParking: true,
                smokingArea: false,
                indoorOutdoor: true,
              },
            },
            {
              id: "legacy-2",
              slug: "legacy-2",
              name: "Legacy 2",
              tagline: "Legacy cafe 2",
              area: "Jogja",
              address: "Jogja",
              priceLevel: "murah",
              rating: 4.5,
              reviewCount: 0,
              coordinates: { latitude: -7.8, longitude: 110.3 },
              coverImage: "https://example.com/2.jpg",
              featureHighlights: [],
              bestFor: [],
              amenities: {
                hasSockets: true,
                hasMusholla: false,
                hasParking: true,
                smokingArea: false,
                indoorOutdoor: true,
              },
            },
          ],
          total: 2,
          availableAreas: ["Jogja"],
        }),
        { status: 200, headers: { "content-type": "application/json" } },
      ),
    );

    const result = await getCafes({ page: 2, limit: 1 });

    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.slug).toBe("legacy-2");
    expect(result.page).toBe(2);
    expect(result.limit).toBe(1);
    expect(result.totalPages).toBe(2);
  });

  it("returns cafe detail by slug with reviews", async () => {
    const cafe = await getCafeBySlug("nilu-coffee");

    expect(cafe).toBeTruthy();
    expect(cafe?.name).toBe("Nilu Coffee");
    expect(cafe?.coverImage).toContain("pameo.co");
    expect(cafe?.reviews.length).toBeGreaterThan(0);
  });

  it("returns curated list items only from that list", async () => {
    const curatedList = await getCuratedListBySlug("coworking-dan-workspace-jogja");

    expect(curatedList).toBeTruthy();
    expect(curatedList?.cafes.length).toBeGreaterThan(0);
    expect(
      curatedList?.cafes.every((cafe) =>
        curatedList.cafeSlugs.includes(cafe.slug),
      ),
    ).toBe(true);
  });

  it("paginates curated list cafe items", async () => {
    const curatedList = await getCuratedListBySlug("coworking-dan-workspace-jogja", {
      page: 1,
      limit: 1,
    });

    expect(curatedList).toBeTruthy();
    expect(curatedList?.page).toBe(1);
    expect(curatedList?.limit).toBe(1);
    expect(curatedList?.totalCafes).toBeGreaterThan(0);
    expect(curatedList?.totalPages).toBeGreaterThan(0);
    expect(curatedList?.cafes).toHaveLength(1);
  });
});
