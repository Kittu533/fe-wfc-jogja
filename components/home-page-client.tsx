"use client";

import { DiscoveryBoardSection } from "@/components/home/discovery-board-section";
import { FeaturedSection } from "@/components/home/featured-section";
import { HeroSection } from "@/components/home/hero-section";
import { PremiumShowcaseSection } from "@/components/home/premium-showcase-section";
import {
  BackgroundBlobs,
  SkylineSubtle,
} from "@/components/home/home-shared";
import type { CafeListItem, CuratedList } from "@/lib/types";

export function HomePageClient({
  featuredCafes,
  curatedLists,
  totalCafes,
}: {
  featuredCafes: CafeListItem[];
  curatedLists: CuratedList[];
  totalCafes: number;
}) {
  return (
    <div className="relative">
      <HeroSection totalCafes={totalCafes} />
      <FeaturedSection featuredCafes={featuredCafes} />
      <DiscoveryBoardSection />
      <PremiumShowcaseSection curatedLists={curatedLists} />
    </div>
  );
}
