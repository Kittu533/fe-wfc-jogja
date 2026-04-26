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
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
      <label className="space-y-2 text-sm font-bold text-emerald-950">
        <span className="text-xs uppercase tracking-[0.14em] text-emerald-900/45">Area</span>
        <select
          name="area"
          defaultValue={filters.area ?? ""}
          className="h-[3.25rem] w-full rounded-[1.25rem] border border-emerald-100 bg-white px-4 text-sm font-semibold text-emerald-950 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
        >
          <option value="">Semua area</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2 text-sm font-bold text-emerald-950">
        <span className="text-xs uppercase tracking-[0.14em] text-emerald-900/45">Budget</span>
        <select
          name="priceLevel"
          defaultValue={filters.priceLevel ?? ""}
          className="h-[3.25rem] w-full rounded-[1.25rem] border border-emerald-100 bg-white px-4 text-sm font-semibold text-emerald-950 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
        >
          <option value="">Semua budget</option>
          {priceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <FilterCheck
        name="hasSockets"
        label="Banyak colokan"
        defaultChecked={filters.hasSockets}
      />

      <FilterCheck
        name="hasMusholla"
        label="Ada musholla"
        defaultChecked={filters.hasMusholla}
      />

      <FilterCheck
        name="hasParking"
        label="Parkir lega"
        defaultChecked={filters.hasParking}
      />
    </div>
  );
}

function FilterCheck({
  defaultChecked,
  label,
  name,
}: {
  defaultChecked?: boolean;
  label: string;
  name: string;
}) {
  return (
    <label className="group flex h-[3.25rem] cursor-pointer items-center gap-3 rounded-[1.25rem] border border-emerald-100 bg-white px-4 text-sm font-black text-emerald-950 transition hover:border-emerald-300 hover:bg-emerald-50/70 has-[:checked]:border-emerald-700 has-[:checked]:bg-emerald-700 has-[:checked]:!text-white">
      <input
        type="checkbox"
        name={name}
        value="true"
        defaultChecked={defaultChecked}
        className="h-5 w-5 rounded-md border-emerald-200 accent-white"
      />
      {label}
    </label>
  );
}
