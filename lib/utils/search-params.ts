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
  };
}
