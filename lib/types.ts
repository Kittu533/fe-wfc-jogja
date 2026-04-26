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
  page?: number;
  limit?: number;
};

export type CafesResponse = {
  items: CafeListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  availableAreas: string[];
};

export type CuratedListWithCafes = CuratedList & {
  cafes: CafeListItem[];
  totalCafes: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type AdminPlaceStatus = "draft" | "published" | "archived";

export type AdminImageStatus = "scraped" | "uploaded" | "fallback" | "missing";

export type AdminSourceMention = {
  sourceId?: string;
  source?: string;
  type?: string;
  publisher?: string;
  title?: string;
  url?: string;
  publishedAt?: string;
  fetchedAt?: string;
  matchedAliases?: string[];
  keywordHits?: string[];
  snippet?: string;
  excerpt?: string;
};

export type AdminUploadMetadata = {
  url: string;
  width?: number;
  height?: number;
  mimeType?: string;
  fileName?: string;
};

export type AdminPlace = CafeDetail & {
  category: "cafe" | "coffee_shop" | "coworking_space" | "wifi_spot" | "other";
  coffeePriceMin: number;
  imageStatus: AdminImageStatus;
  realImageUrl: string;
  uploadMetadata?: AdminUploadMetadata;
  status: AdminPlaceStatus;
  adminNotes: string;
  sourceMentions: AdminSourceMention[];
  webSignalScore: number;
  freshnessStatus: "has-web-signal" | "osm-only" | "web-enriched";
  createdAt: string;
  updatedAt: string;
};

export type AdminPlacesFilters = {
  q?: string;
  status?: AdminPlaceStatus | "all";
  imageStatus?: AdminImageStatus | "all";
};

export type AdminPlacesResponse = {
  items: AdminPlace[];
  total: number;
};

export type AdminLoginInput = {
  email: string;
  password: string;
};

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: "admin";
};

export type AdminSession = {
  accessToken: string;
  user: AdminUser;
};
