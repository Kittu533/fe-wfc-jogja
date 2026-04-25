import type { CafeFilters, PriceLevel } from "@/lib/types";

const priceOptions: Array<{ value: PriceLevel; label: string }> = [
  { value: "murah", label: "Murah" },
  { value: "menengah", label: "Menengah" },
  { value: "premium", label: "Premium" },
];

export function Filters({
  filters,
  areas,
}: {
  filters: CafeFilters;
  areas: string[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <label className="space-y-2 text-sm font-medium text-[color:var(--foreground)]">
        <span>Area</span>
        <select
          name="area"
          defaultValue={filters.area ?? ""}
          className="h-12 w-full rounded-2xl border border-[color:var(--border)] bg-white px-4 text-sm outline-none focus:border-[color:var(--accent)]"
        >
          <option value="">Semua area</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2 text-sm font-medium text-[color:var(--foreground)]">
        <span>Budget</span>
        <select
          name="priceLevel"
          defaultValue={filters.priceLevel ?? ""}
          className="h-12 w-full rounded-2xl border border-[color:var(--border)] bg-white px-4 text-sm outline-none focus:border-[color:var(--accent)]"
        >
          <option value="">Semua budget</option>
          {priceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm font-medium text-[color:var(--foreground)]">
        <input type="checkbox" name="hasSockets" value="true" defaultChecked={filters.hasSockets} />
        Banyak colokan
      </label>

      <label className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm font-medium text-[color:var(--foreground)]">
        <input type="checkbox" name="hasMusholla" value="true" defaultChecked={filters.hasMusholla} />
        Ada musholla
      </label>

      <label className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm font-medium text-[color:var(--foreground)]">
        <input type="checkbox" name="hasParking" value="true" defaultChecked={filters.hasParking} />
        Parkir lega
      </label>
    </div>
  );
}
