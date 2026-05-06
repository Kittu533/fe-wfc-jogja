import type {
  CafeDetail,
  CafeFilters,
  CafeListItem,
  PriceLevel,
} from "@/lib/types";

export function getAverageRating(ratings: CafeDetail["ratingBreakdown"]) {
  const values = Object.values(ratings);
  const total = values.reduce((sum, value) => sum + value, 0);
  return Number((total / values.length).toFixed(1));
}

export function getPriceLabel(priceLevel: PriceLevel) {
  switch (priceLevel) {
    case "murah":
      return "Murah";
    case "menengah":
      return "Menengah";
    case "premium":
      return "Premium";
  }
}

export function formatRating(value: number) {
  return value.toFixed(1);
}

export function normalizeSearchValue(value?: string) {
  return value?.trim().toLowerCase() ?? "";
}

export function matchesCafeFilters(
  cafe: CafeListItem,
  filters: CafeFilters,
) {
  const query = normalizeSearchValue(filters.q);

  if (query) {
    const haystack = [
      cafe.name,
      cafe.tagline,
      cafe.area,
      cafe.address,
      ...cafe.bestFor,
      ...cafe.featureHighlights,
    ]
      .join(" ")
      .toLowerCase();

    if (!haystack.includes(query)) {
      return false;
    }
  }

  if (filters.area && cafe.area !== filters.area) {
    return false;
  }

  if (filters.priceLevel && cafe.priceLevel !== filters.priceLevel) {
    return false;
  }

  if (filters.hasSockets && !cafe.amenities.hasSockets) {
    return false;
  }

  if (filters.hasMusholla && !cafe.amenities.hasMusholla) {
    return false;
  }

  if (filters.hasParking && !cafe.amenities.hasParking) {
    return false;
  }

  if (filters.useCase && !matchesUseCase(cafe, filters.useCase)) {
    return false;
  }

  return true;
}

export function toCafeListItem(cafe: CafeDetail): CafeListItem {
  return {
    id: cafe.id,
    slug: cafe.slug,
    name: cafe.name,
    tagline: cafe.tagline,
    area: cafe.area,
    address: cafe.address,
    priceLevel: cafe.priceLevel,
    rating: getAverageRating(cafe.ratingBreakdown),
    reviewCount: cafe.reviews.length,
    coordinates: cafe.coordinates,
    coverImage: cafe.coverImage,
    featureHighlights: cafe.featureHighlights,
    bestFor: cafe.bestFor,
    amenities: cafe.amenities,
    wfcRecommendation: cafe.wfcRecommendation,
  };
}

function matchesUseCase(cafe: CafeListItem, useCase: NonNullable<CafeFilters["useCase"]>) {
  const haystack = [
    cafe.priceLevel,
    ...cafe.bestFor,
    ...cafe.featureHighlights,
    ...(cafe.wfcRecommendation?.badges ?? []),
    ...(cafe.wfcRecommendation?.reasons ?? []),
  ]
    .join(" ")
    .toLowerCase();

  if (useCase === "wifi") return /wifi|internet|wfc/.test(haystack);
  if (useCase === "budget") return cafe.priceLevel === "murah" || /budget|murah|hemat|mahasiswa/.test(haystack);
  if (useCase === "sockets") return cafe.amenities.hasSockets || /colokan|socket|stop kontak/.test(haystack);
  if (useCase === "night") return /24\s*jam|malam|tutup pukul 0[0-5]/.test(haystack);
  if (useCase === "meeting") return /meeting|workspace|ruang kerja/.test(haystack);
  if (useCase === "coworking") return /coworking|workspace/.test(haystack);
  return true;
}
