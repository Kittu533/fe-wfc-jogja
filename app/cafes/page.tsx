import type { Metadata } from "next";

import { CafeCard } from "@/components/cafe-card";
import { EmptyState } from "@/components/empty-state";
import { Filters } from "@/components/filters";
import { SearchBar } from "@/components/search-bar";
import { SectionHeader } from "@/components/section-header";
import { getCafes } from "@/lib/services/cafes";
import { parseCafeFilters } from "@/lib/utils/search-params";

export const metadata: Metadata = {
  title: "Cari Cafe",
  description: "Filter cafe Jogja berdasarkan area, budget, colokan, musholla, dan parkir.",
};

type CafesPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function CafesPage({ searchParams }: CafesPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseCafeFilters(resolvedSearchParams);
  const result = await getCafes(filters);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Explorer"
        title="Cari cafe Jogja yang nyambung dengan ritmemu"
        description="Gunakan query, area, budget, dan fasilitas penting. Halaman ini sudah siap diarahkan ke backend saat endpoint live."
      />

      <section className="section-shell rounded-[2rem] p-6 sm:p-8">
        <form action="/cafes" className="space-y-4">
          <SearchBar defaultValue={filters.q} />
          <Filters filters={filters} areas={result.availableAreas} />
        </form>
      </section>

      <section className="flex flex-col gap-3 rounded-[1.5rem] border border-[color:var(--border)] bg-white/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[color:var(--muted)]">
          Menampilkan <span className="font-semibold text-[color:var(--foreground)]">{result.total}</span> cafe
          {filters.area ? ` di ${filters.area}` : ""}.
        </p>
        <p className="text-sm text-[color:var(--muted)]">
          Filter aktif: {filters.priceLevel || filters.hasSockets || filters.hasMusholla || filters.hasParking || filters.q ? "ya" : "belum"}
        </p>
      </section>

      {result.items.length === 0 ? (
        <EmptyState
          title="Belum ada cafe yang cocok dengan filter ini"
          description="Coba longgarkan area atau budget, atau hapus filter fasilitas yang terlalu ketat."
          actionHref="/cafes"
          actionLabel="Reset filter"
        />
      ) : (
        <section className="grid gap-6 lg:grid-cols-3">
          {result.items.map((cafe) => (
            <CafeCard key={cafe.id} cafe={cafe} />
          ))}
        </section>
      )}
    </div>
  );
}
