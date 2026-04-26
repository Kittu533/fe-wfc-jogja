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

type PaginationInput = Pick<CafeFilters, "page" | "limit">;

async function fetchJson<T>(path: string) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
  });

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

    const response = await fetchJson<Partial<CafesResponse> & { items: CafesResponse["items"]; total: number }>(
      `/cafes?${params.toString()}`,
    );

    return normalizeCafesResponse(response, filters);
  }

  const items = mockCafes
    .map(toCafeListItem)
    .filter((cafe) => matchesCafeFilters(cafe, filters));
  const { items: paginatedItems, meta } = paginateItems(
    items,
    filters.page ?? 1,
    filters.limit ?? 12,
  );

  return {
    items: paginatedItems,
    total: meta.total,
    page: meta.page,
    limit: meta.limit,
    totalPages: meta.totalPages,
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
  pagination: PaginationInput = {},
): Promise<CuratedListWithCafes | null> {
  if (!isMockDataSource) {
    const params = new URLSearchParams();

    Object.entries(pagination).forEach(([key, value]) => {
      if (value === undefined) return;
      params.set(key, String(value));
    });

    const query = params.toString();
    const response = await fetchJson<Partial<CuratedListWithCafes> & Pick<CuratedListWithCafes, "cafes"> | null>(
      `/lists/${slug}${query ? `?${query}` : ""}`,
    );

    if (!response) return null;

    return normalizeCuratedListResponse(response as CuratedListWithCafes, pagination);
  }

  const curatedList = mockCuratedLists.find((item) => item.slug === slug);

  if (!curatedList) {
    return null;
  }

  const allCafes = curatedList.cafeSlugs
    .map((cafeSlug) => mockCafes.find((cafe) => cafe.slug === cafeSlug))
    .filter((cafe): cafe is CafeDetail => Boolean(cafe))
    .map(toCafeListItem);
  const { items: cafes, meta } = paginateItems(
    allCafes,
    pagination.page ?? 1,
    pagination.limit ?? 12,
  );

  return {
    ...curatedList,
    cafes,
    totalCafes: meta.total,
    page: meta.page,
    limit: meta.limit,
    totalPages: meta.totalPages,
  };
}

function paginateItems<T>(items: T[], page: number, limit: number) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * limit;

  return {
    items: items.slice(start, start + limit),
    meta: {
      total,
      page: safePage,
      limit,
      totalPages,
    },
  };
}

function normalizeCafesResponse(
  response: Partial<CafesResponse> & { items: CafesResponse["items"]; total: number },
  filters: CafeFilters,
): CafesResponse {
  if (
    typeof response.page === "number" &&
    typeof response.limit === "number" &&
    typeof response.totalPages === "number"
  ) {
    return response as CafesResponse;
  }

  const { items, meta } = paginateItems(
    response.items,
    filters.page ?? 1,
    filters.limit ?? 12,
  );

  return {
    items,
    total: response.total,
    page: meta.page,
    limit: meta.limit,
    totalPages: Math.max(1, Math.ceil(response.total / meta.limit)),
    availableAreas: response.availableAreas ?? [],
  };
}

function normalizeCuratedListResponse(
  response: CuratedListWithCafes,
  pagination: PaginationInput,
): CuratedListWithCafes {
  if (
    typeof response.page === "number" &&
    typeof response.limit === "number" &&
    typeof response.totalPages === "number" &&
    typeof response.totalCafes === "number"
  ) {
    return response;
  }

  const totalCafes = response.totalCafes ?? response.cafes.length;
  const { items: cafes, meta } = paginateItems(
    response.cafes,
    pagination.page ?? 1,
    pagination.limit ?? 12,
  );

  return {
    ...response,
    cafes,
    totalCafes,
    page: meta.page,
    limit: meta.limit,
    totalPages: Math.max(1, Math.ceil(totalCafes / meta.limit)),
  };
}
