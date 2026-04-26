"use client";

import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";

type ResultsBarProps = {
  totalResults: number;
  activeFilters: string[];
  hasActiveFilters: boolean;
};

export function ResultsBar({ totalResults, activeFilters, hasActiveFilters }: ResultsBarProps) {
  return (
    <section className="flex flex-col gap-6 rounded-[2rem] border border-emerald-100/70 bg-white/80 px-6 py-5 backdrop-blur-md shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex items-center gap-3 border-emerald-100/80 pr-6 sm:border-r">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
            <Search className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-900/40">
              Hasil Pencarian
            </p>
            <p className="text-sm font-black text-emerald-950">
              {totalResults} <span className="text-emerald-900/50">Spot ketemu</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {hasActiveFilters ? (
            activeFilters.map((filter) => (
              <span
                key={filter}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50/50 px-3 py-1.5 text-[10px] font-black text-emerald-800 transition hover:bg-emerald-100"
              >
                <div className="h-1 w-1 rounded-full bg-emerald-500" />
                {filter}
              </span>
            ))
          ) : (
            <span className="text-[11px] font-medium text-emerald-900/40 italic">
              Semua spot ditampilkan
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        {hasActiveFilters && (
          <Link
            href="/cafes"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-red-600 px-5 text-xs font-black text-white transition hover:bg-red-700 shadow-lg shadow-red-900/10"
          >
            <X className="h-4 w-4 text-white" />
            Reset Filter
          </Link>
        )}
        <Link
          href="/map"
          className="group inline-flex h-11 items-center gap-2 rounded-full bg-emerald-900 px-6 text-xs font-black text-white transition hover:bg-emerald-950 shadow-lg shadow-emerald-900/10"
        >
          <span className="text-white">Lihat di Map</span>
          <ArrowUpRight className="h-4 w-4 text-white transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
