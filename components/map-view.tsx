"use client";

import dynamic from "next/dynamic";

import type { CafeListItem } from "@/lib/types";

const ClientMap = dynamic(() => import("@/components/map-view-client"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[480px] items-center justify-center rounded-[1.75rem] bg-[color:var(--surface-strong)] text-sm text-[color:var(--muted)]">
      Memuat peta cafe Jogja...
    </div>
  ),
});

export function MapView({ cafes }: { cafes: CafeListItem[] }) {
  return (
    <div className="map-panel section-shell overflow-hidden rounded-[2rem] p-3">
      <ClientMap cafes={cafes} />
    </div>
  );
}
