import { API_BASE_URL } from "@/lib/config";
import type {
  AdminLoginInput,
  AdminPlace,
  AdminPlacesFilters,
  AdminPlacesResponse,
  AdminSession,
} from "@/lib/types";

export const ADMIN_TOKEN_STORAGE_KEY = "wfc-jogja-admin-token";

export async function loginAdmin(input: AdminLoginInput): Promise<AdminSession> {
  const session = await fetchJson<AdminSession>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });

  setAdminToken(session.accessToken);
  return session;
}

export function getAdminToken() {
  if (typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY) ?? "";
}

export function setAdminToken(token: string) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
}

export function logoutAdmin() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
}

export async function getAdminPlaces(
  filters: AdminPlacesFilters = {},
): Promise<AdminPlacesResponse> {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (!value || value === "all") {
      return;
    }

    params.set(key, value);
  });

  return fetchJson<AdminPlacesResponse>(`/admin/places?${params.toString()}`);
}

export async function getAdminPlaceById(id: string): Promise<AdminPlace | null> {
  return fetchJson<AdminPlace | null>(`/admin/places/${id}`);
}

export async function createAdminPlace(
  input: Partial<AdminPlace>,
): Promise<AdminPlace> {
  return fetchJson<AdminPlace>("/admin/places", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateAdminPlace(
  id: string,
  input: Partial<AdminPlace>,
): Promise<AdminPlace> {
  return fetchJson<AdminPlace>(`/admin/places/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export async function archiveAdminPlace(id: string): Promise<AdminPlace> {
  return fetchJson<AdminPlace>(`/admin/places/${id}`, {
    method: "DELETE",
  });
}

export async function uploadAdminPlaceImage(file: File) {
  const formData = new FormData();
  formData.set("file", file);

  const token = getAdminToken();
  const response = await fetch(`${API_BASE_URL}/admin/uploads/images`, {
    method: "POST",
    headers: token ? { authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed upload admin image");
  }

  return (await response.json()) as {
    url: string;
    width?: number;
    height?: number;
    mimeType?: string;
    fileName?: string;
  };
}

export function validateAdminPlaceForPublish(place: AdminPlace) {
  const errors: string[] = [];

  if (!place.name.trim()) errors.push("Nama tempat wajib diisi.");
  if (!place.slug.trim()) errors.push("Slug wajib diisi.");
  if (!place.area.trim()) errors.push("Area wajib diisi.");
  if (!place.address.trim()) errors.push("Alamat lengkap wajib diisi.");
  if (!place.coordinates.latitude || !place.coordinates.longitude) {
    errors.push("Koordinat wajib diisi.");
  }
  if (!place.priceLevel) errors.push("Price level wajib dipilih.");
  if (!place.openingHours.trim()) errors.push("Jam buka wajib diisi.");
  if (
    !place.coverImage ||
    !["scraped", "uploaded"].includes(place.imageStatus) ||
    place.coverImage.startsWith("/dataset-images/")
  ) {
    errors.push("Cover image asli wajib diisi sebelum publish.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function createEmptyAdminPlace(): AdminPlace {
  const now = new Date().toISOString();

  return {
    id: "",
    slug: "",
    name: "",
    tagline: "",
    area: "",
    address: "",
    category: "coffee_shop",
    priceLevel: "menengah",
    coffeePriceMin: 0,
    coordinates: { latitude: -7.797068, longitude: 110.370529 },
    coverImage: "",
    imageStatus: "missing",
    realImageUrl: "",
    galleryImages: [],
    featureHighlights: [],
    bestFor: [],
    amenities: {
      hasSockets: false,
      hasMusholla: false,
      hasParking: false,
      smokingArea: false,
      indoorOutdoor: true,
    },
    description: "",
    openingHours: "",
    contactPhone: "",
    instagram: "",
    website: "",
    mapsUrl: "",
    ratingBreakdown: {
      food: 4,
      drink: 4,
      wifi: 4,
      ambience: 4,
      workFriendly: 4,
      value: 4,
    },
    recommendedMenu: [],
    reviews: [],
    status: "draft",
    adminNotes: "",
    sourceMentions: [],
    webSignalScore: 0,
    freshnessStatus: "osm-only",
    createdAt: now,
    updatedAt: now,
  };
}

async function fetchJson<T>(path: string, init?: RequestInit) {
  const token = getAdminToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed admin request: ${path}`);
  }

  return (await response.json()) as T;
}
