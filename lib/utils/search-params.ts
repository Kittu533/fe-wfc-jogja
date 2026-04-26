import type { CafeFilters } from "@/lib/types";

type SearchParamValue = string | string[] | undefined;

export function getSingleSearchParam(value: SearchParamValue) {
  return Array.isArray(value) ? value[0] : value;
}

export function parseCafeFilters(
  searchParams: Record<string, SearchParamValue>,
): CafeFilters {
  const truthy = (value: SearchParamValue) => {
    const current = getSingleSearchParam(value);
    return current === "true" || current === "1" || current === "on";
  };

  return {
    q: getSingleSearchParam(searchParams.q) ?? "",
    area: getSingleSearchParam(searchParams.area) ?? "",
    priceLevel: (getSingleSearchParam(searchParams.priceLevel) as
      | CafeFilters["priceLevel"]
      | undefined) ?? "",
    hasSockets: truthy(searchParams.hasSockets),
    hasMusholla: truthy(searchParams.hasMusholla),
    hasParking: truthy(searchParams.hasParking),
    page: parsePositiveInteger(searchParams.page, 1),
    limit: parsePositiveInteger(searchParams.limit, 12, 50),
  };
}

export function parsePaginationParams(
  searchParams: Record<string, SearchParamValue>,
) {
  return {
    page: parsePositiveInteger(searchParams.page, 1),
    limit: parsePositiveInteger(searchParams.limit, 12, 50),
  };
}

function parsePositiveInteger(
  value: SearchParamValue,
  fallback: number,
  max = 9999,
) {
  const parsed = Number.parseInt(getSingleSearchParam(value) ?? "", 10);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.min(parsed, max);
}
