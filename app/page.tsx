import type { Metadata } from "next";

import { HomePageClient } from "@/components/home-page-client";
import { getCafes, getCuratedLists } from "@/lib/services/cafes";

export const metadata: Metadata = {
  title: "Cari Cafe Jogja Buat Kerja, Nugas, dan Stay Lama",
  description:
    "Temukan cafe Jogja yang relevan untuk skripsi, kerja remote, meeting kecil, dan stay lama tanpa drama wifi, colokan, atau kursi.",
};

export default async function HomePage() {
  const [cafes, curatedLists] = await Promise.all([getCafes(), getCuratedLists()]);
  const featuredCafes = cafes.items.slice(0, 6);

  return (
    <HomePageClient
      featuredCafes={featuredCafes}
      curatedLists={curatedLists}
      totalCafes={cafes.total}
    />
  );
}
