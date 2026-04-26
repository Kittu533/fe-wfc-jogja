import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Star,
} from "lucide-react";

import { MapView } from "@/components/map-view";
import { MapHero } from "@/components/map/map-hero";
import { getCafes } from "@/lib/services/cafes";
import type { CafeListItem } from "@/lib/types";
import { getPriceLabel } from "@/lib/utils/cafes";

export const metadata: Metadata = {
  title: "Peta Cafe Jogja",
  description: "Lihat semua cafe Jogja di peta interaktif dengan shortcut ke halaman detail.",
};

export default async function MapPage() {
  const cafes = await getCafes();
  const featuredCafes = cafes.items.slice(0, 5);
  const areas = cafes.availableAreas.slice(0, 7);
  const socketReadyCount = cafes.items.filter((cafe) => cafe.amenities.hasSockets).length;
  const highRatedCount = cafes.items.filter((cafe) => cafe.rating >= 4.5).length;

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-8 sm:px-6 lg:px-8">
      <MapHero 
        totalSpots={cafes.total}
        socketCount={socketReadyCount}
        highRatedCount={highRatedCount}
      />

      <section className="flex flex-col gap-4 rounded-[2rem] border border-emerald-100/70 bg-white/70 px-6 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <p className="text-xs font-black uppercase tracking-widest text-emerald-900/40">
            Cari Berdasarkan Area
          </p>
          <div className="h-4 w-px bg-emerald-100 hidden sm:block" />
          <div className="flex flex-wrap gap-2">
            {areas.map((area) => (
              <Link
                key={area}
                href={`/cafes?area=${encodeURIComponent(area)}`}
                className="rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-black text-emerald-800 transition hover:bg-emerald-100"
              >
                {area}
              </Link>
            ))}
          </div>
        </div>
        <Link
          href="/cafes"
          className="inline-flex items-center gap-2 text-xs font-black text-emerald-700 hover:text-emerald-950"
        >
          Lihat Semua Area <span>→</span>
        </Link>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1fr_380px]">
        <div className="min-w-0">
          <MapView cafes={cafes.items} />
        </div>

        <aside className="space-y-6">
          <div className="flex items-center justify-between gap-3 px-2">
            <div>
              <h2 className="text-xl font-black text-emerald-950">
                Rekomendasi Terdekat
              </h2>
              <p className="mt-1 text-xs font-semibold text-emerald-900/40 uppercase tracking-widest">
                Spot pilihan buat nugas
              </p>
            </div>
            <Link
              href="/cafes"
              className="grid h-10 w-10 place-items-center rounded-full border border-emerald-100 bg-white text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4">
            {featuredCafes.map((cafe) => (
              <MapCafeRow key={cafe.id} cafe={cafe} />
            ))}
          </div>

          <div className="rounded-[2rem] bg-emerald-900 p-8 text-white">
            <h3 className="text-lg font-black leading-tight">
              Gak nemu spot yang cocok?
            </h3>
            <p className="mt-2 text-sm font-medium text-emerald-50/60 leading-relaxed">
              Coba gunakan filter lebih detail di halaman pencarian buat nemuin spot yang pas banget sama mood lo.
            </p>
            <Link
              href="/cafes"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white py-3 text-xs font-black text-emerald-900 transition hover:bg-emerald-50"
            >
              Buka Filter Detail
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}

function MapCafeRow({ cafe }: { cafe: CafeListItem }) {
  return (
    <Link
      href={`/cafes/${cafe.slug}`}
      className="group grid grid-cols-[84px_1fr] gap-4 rounded-[1.75rem] border border-emerald-100/50 bg-white p-2.5 transition-all hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/5"
    >
      <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-emerald-50">
        <Image
          src={cafe.coverImage}
          alt={cafe.name}
          fill
          sizes="84px"
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>
      <div className="min-w-0 py-1 flex flex-col justify-center">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.12em] text-emerald-700">
            {cafe.area}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-950">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {cafe.rating.toFixed(1)}
          </span>
        </div>
        <p className="truncate text-[15px] font-black text-emerald-950 tracking-tight group-hover:text-emerald-700">
          {cafe.name}
        </p>
        <p className="mt-1 line-clamp-1 text-[11px] font-bold text-emerald-900/40 leading-relaxed">
          {getPriceLabel(cafe.priceLevel)} · {cafe.tagline}
        </p>
      </div>
    </Link>
  );
}
