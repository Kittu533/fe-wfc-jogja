import type { Metadata } from "next";

import { CafeCard } from "@/components/cafe-card";
import { MapView } from "@/components/map-view";
import { SectionHeader } from "@/components/section-header";
import { getCafes } from "@/lib/services/cafes";

export const metadata: Metadata = {
  title: "Peta Cafe Jogja",
  description: "Lihat semua cafe Jogja di peta interaktif dengan shortcut ke halaman detail.",
};

export default async function MapPage() {
  const cafes = await getCafes();

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Peta interaktif"
        title="Lihat persebaran cafe langsung dari peta"
        description="Pin bisa diklik untuk melihat ringkasan cafe dan pindah ke detail. Dataset masih mock, tapi shape koordinat sudah siap untuk API list."
      />

      <MapView cafes={cafes.items} />

      <section className="grid gap-6 lg:grid-cols-3">
        {cafes.items.slice(0, 3).map((cafe) => (
          <CafeCard key={cafe.id} cafe={cafe} />
        ))}
      </section>
    </div>
  );
}
