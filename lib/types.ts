export type PriceLevel = "murah" | "menengah" | "premium";

export type RatingBreakdown = {
  food: number;
  drink: number;
  wifi: number;
  ambience: number;
  workFriendly: number;
  value: number;
};

export type CafeCoordinates = {
  latitude: number;
  longitude: number;
};

export type CafeAmenityKey =
  | "hasSockets"
  | "hasMusholla"
  | "hasParking"
  | "smokingArea"
  | "indoorOutdoor";

export type CafeAmenityMap = Record<CafeAmenityKey, boolean>;

export type CafeReview = {
  id: string;
  cafeId: string;
  author: string;
  role: string;
  comment: string;
  visitDate: string;
  createdAt: string;
  ratings: RatingBreakdown;
};

export type CafeMenuItem = {
  name: string;
  priceLabel: string;
  note: string;
};

export type CafeBase = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  area: string;
  address: string;
  priceLevel: PriceLevel;
  coordinates: CafeCoordinates;
  coverImage: string;
  featureHighlights: string[];
  bestFor: string[];
  amenities: CafeAmenityMap;
};

export type CafeListItem = CafeBase & {
  rating: number;
  reviewCount: number;
};

export type CafeDetail = CafeBase & {
  description: string;
  openingHours: string;
  contactPhone: string;
  instagram?: string;
  website?: string;
  mapsUrl: string;
  galleryImages: string[];
  ratingBreakdown: RatingBreakdown;
  recommendedMenu: CafeMenuItem[];
  reviews: CafeReview[];
};

export type CuratedList = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  heroLabel: string;
  cafeSlugs: string[];
};

export type CafeFilters = {
  q?: string;
  area?: string;
  priceLevel?: PriceLevel | "";
  hasSockets?: boolean;
  hasMusholla?: boolean;
  hasParking?: boolean;
};

export type CafesResponse = {
  items: CafeListItem[];
  total: number;
  availableAreas: string[];
};

export type CuratedListWithCafes = CuratedList & {
  cafes: CafeListItem[];
};
