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
  };
}
