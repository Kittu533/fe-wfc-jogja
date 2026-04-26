"use client";

import dynamic from "next/dynamic";

import type { CafeListItem } from "@/lib/types";

const ClientMap = dynamic(() => import("@/components/map-view-client"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[560px] items-center justify-center rounded-[1.75rem] bg-emerald-50/80 text-sm font-bold text-emerald-900/55">
      Memuat peta WFC Jogja...
    </div>
  ),
});

export function MapView({ cafes }: { cafes: CafeListItem[] }) {
  return (
    <div className="map-panel overflow-hidden rounded-[2rem] border border-emerald-100/70 bg-white/85 p-3 shadow-[0_24px_80px_-55px_rgba(6,78,59,0.8)] backdrop-blur">
      <ClientMap cafes={cafes} />
    </div>
  );
}
