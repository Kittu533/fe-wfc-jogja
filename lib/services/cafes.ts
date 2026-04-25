import { API_BASE_URL, isMockDataSource } from "@/lib/config";
import { mockCafes, mockCuratedLists } from "@/lib/data/cafes";
import type {
  CafeDetail,
  CafeFilters,
  CafesResponse,
  CafeReview,
  CuratedList,
  CuratedListWithCafes,
} from "@/lib/types";
import { matchesCafeFilters, toCafeListItem } from "@/lib/utils/cafes";

async function fetchJson<T>(path: string) {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }

  return (await response.json()) as T;
}

export async function getCafes(filters: CafeFilters = {}): Promise<CafesResponse> {
  if (!isMockDataSource) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value === undefined || value === "" || value === false) {
        return;
      }
      params.set(key, String(value));
    });

    return fetchJson<CafesResponse>(`/cafes?${params.toString()}`);
  }

  const items = mockCafes
    .map(toCafeListItem)
    .filter((cafe) => matchesCafeFilters(cafe, filters));

  return {
    items,
    total: items.length,
    availableAreas: Array.from(new Set(mockCafes.map((cafe) => cafe.area))).sort(),
  };
}

export async function getCafeBySlug(slug: string): Promise<CafeDetail | null> {
  if (!isMockDataSource) {
    return fetchJson<CafeDetail | null>(`/cafes/${slug}`);
  }

  return mockCafes.find((cafe) => cafe.slug === slug) ?? null;
}

export async function getCafeReviews(cafeId: string): Promise<CafeReview[]> {
  if (!isMockDataSource) {
    return fetchJson<CafeReview[]>(`/cafes/${cafeId}/reviews`);
  }

  return mockCafes.find((cafe) => cafe.id === cafeId)?.reviews ?? [];
}

export async function getCuratedLists(): Promise<CuratedList[]> {
  if (!isMockDataSource) {
    return fetchJson<CuratedList[]>("/lists");
  }

  return mockCuratedLists;
}

export async function getCuratedListBySlug(
  slug: string,
): Promise<CuratedListWithCafes | null> {
  if (!isMockDataSource) {
    return fetchJson<CuratedListWithCafes | null>(`/lists/${slug}`);
  }

  const curatedList = mockCuratedLists.find((item) => item.slug === slug);

  if (!curatedList) {
    return null;
  }

  return {
    ...curatedList,
    cafes: curatedList.cafeSlugs
      .map((cafeSlug) => mockCafes.find((cafe) => cafe.slug === cafeSlug))
      .filter((cafe): cafe is CafeDetail => Boolean(cafe))
      .map(toCafeListItem),
  };
}
