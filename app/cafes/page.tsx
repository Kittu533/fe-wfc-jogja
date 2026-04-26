import type { Metadata } from "next";
import Link from "next/link";
import {
  Filter,
  MapPin,
  PlugZap,
  Search,
} from "lucide-react";

import { CafeCard } from "@/components/cafe-card";
import { EmptyState } from "@/components/empty-state";
import { Filters } from "@/components/filters";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/search-bar";
import { CafesHero } from "@/components/cafes/cafes-hero";
import { ResultsBar } from "@/components/cafes/results-bar";
import { getCafes } from "@/lib/services/cafes";
import type { CafeFilters } from "@/lib/types";
import { getPriceLabel } from "@/lib/utils/cafes";
import { parseCafeFilters } from "@/lib/utils/search-params";

export const dynamic = "force-dynamic";

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
  const activeFilters = getActiveFilterLabels(filters);
  const hasActiveFilters = activeFilters.length > 0;
  const highRatedCount = result.items.filter((cafe) => cafe.rating >= 4.5).length;

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <CafesHero 
        totalResults={result.total}
        areaCount={result.availableAreas.length}
        highRatedCount={highRatedCount}
      />

      <section className="rounded-[2rem] border border-emerald-100/70 bg-white/85 p-4 shadow-[0_20px_60px_-35px_rgba(6,78,59,0.35)] backdrop-blur sm:p-6">
        <form action="/cafes" className="space-y-5">
          <SearchBar
            defaultValue={filters.q}
            placeholder="Cari cafe, area, wifi, colokan, atau vibes..."
          />
          <div className="flex flex-wrap gap-2">
            {quickIntents.map((intent) => (
              <Link
                key={intent.href}
                href={intent.href}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/70 px-4 py-2 text-xs font-black text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-100"
              >
                <intent.icon className="h-3.5 w-3.5" />
                {intent.label}
              </Link>
            ))}
          </div>
          <Filters filters={filters} areas={result.availableAreas} />
        </form>
      </section>

      <ResultsBar 
        totalResults={result.total}
        activeFilters={activeFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:items-start">
        <aside className="hidden rounded-[2rem] border border-emerald-100/70 bg-white/80 p-5 backdrop-blur lg:block lg:sticky lg:top-28">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Filter className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-black text-emerald-950">Tips filter</p>
              <p className="text-xs font-medium text-emerald-900/50">
                Biar gak buang waktu scroll.
              </p>
            </div>
          </div>
          <div className="space-y-3 text-sm font-medium leading-relaxed text-emerald-900/60">
            <p>Butuh call? Prioritaskan wifi dan colokan.</p>
            <p>Lagi hemat? Pilih budget murah atau menengah.</p>
            <p>Bawa kendaraan? Aktifkan parkir lega sebelum gas.</p>
          </div>
        </aside>

        {result.items.length === 0 ? (
          <EmptyState
            title="Belum ada cafe yang cocok dengan filter ini"
            description="Coba longgarkan area atau budget, atau hapus filter fasilitas yang terlalu ketat."
            actionHref="/cafes"
            actionLabel="Reset filter"
          />
        ) : (
          <div className="space-y-8">
            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {result.items.map((cafe) => (
                <CafeCard key={cafe.id} cafe={cafe} />
              ))}
            </section>
            <Pagination
              basePath="/cafes"
              page={result.page}
              totalPages={result.totalPages}
              searchParams={resolvedSearchParams}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const quickIntents = [
  {
    label: "Wifi aman",
    href: "/cafes?q=wifi kencang",
    icon: Search,
  },
  {
    label: "Colokan banyak",
    href: "/cafes?hasSockets=true",
    icon: PlugZap,
  },
  {
    label: "Dekat kampus",
    href: "/cafes?q=kampus",
    icon: MapPin,
  },
];

function getActiveFilterLabels(filters: CafeFilters) {
  const labels: string[] = [];

  if (filters.q) {
    labels.push(`Keyword: ${filters.q}`);
  }

  if (filters.area) {
    labels.push(`Area: ${filters.area}`);
  }

  if (filters.priceLevel) {
    labels.push(`Budget: ${getPriceLabel(filters.priceLevel)}`);
  }

  if (filters.hasSockets) {
    labels.push("Colokan banyak");
  }

  if (filters.hasMusholla) {
    labels.push("Ada musholla");
  }

  if (filters.hasParking) {
    labels.push("Parkir lega");
  }

  return labels;
}
