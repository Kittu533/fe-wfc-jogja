import type { CafeListItem } from "@/lib/types";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export function buildHomePageJsonLd(featuredCafes: CafeListItem[]) {
  const shortlist = featuredCafes.slice(0, 3);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        inLanguage: "id-ID",
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/cafes?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#homepage-shortlist`,
        name: "Shortlist cafe work-friendly di Jogja",
        url: SITE_URL,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: shortlist.length,
        itemListElement: shortlist.map((cafe, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/cafes/${cafe.slug}`,
          item: {
            "@type": "CafeOrCoffeeShop",
            name: cafe.name,
            image: cafe.coverImage,
            address: cafe.address,
            areaServed: cafe.area,
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: cafe.rating,
              reviewCount: cafe.reviewCount,
            },
          },
        })),
      },
    ],
  };
}
