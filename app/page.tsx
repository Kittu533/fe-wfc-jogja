import type { Metadata } from "next";

import { HomePageClient } from "@/components/home-page-client";
import { buildHomePageJsonLd } from "@/lib/seo";
import { getCafes, getCuratedLists } from "@/lib/services/cafes";
import { HOME_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cari Cafe Jogja Buat Kerja, Nugas, dan Stay Lama",
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Cari Cafe Jogja Buat Kerja, Nugas, dan Stay Lama",
    description: SITE_DESCRIPTION,
    type: "website",
    siteName: SITE_NAME,
    locale: "id_ID",
    url: "/",
    images: [
      {
        url: HOME_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "WFC Jogja homepage preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cari Cafe Jogja Buat Kerja, Nugas, dan Stay Lama",
    description: SITE_DESCRIPTION,
    images: [HOME_OG_IMAGE],
  },
};

export default async function HomePage() {
  const [cafes, curatedLists] = await Promise.all([getCafes(), getCuratedLists()]);
  const featuredCafes = cafes.items.slice(0, 6);
  const jsonLd = buildHomePageJsonLd(featuredCafes);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HomePageClient
        featuredCafes={featuredCafes}
        curatedLists={curatedLists}
        totalCafes={cafes.total}
      />
    </>
  );
}
