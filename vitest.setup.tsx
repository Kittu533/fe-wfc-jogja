import "@testing-library/jest-dom/vitest";

import { createElement } from "react";
import type { AnchorHTMLAttributes, ComponentProps } from "react";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

if (!globalThis.IntersectionObserver) {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = "";
    readonly thresholds = [];

    disconnect() {}

    observe() {}

    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }

    unobserve() {}
  }

  globalThis.IntersectionObserver = MockIntersectionObserver;
}

if (
  !globalThis.localStorage ||
  typeof globalThis.localStorage.getItem !== "function" ||
  typeof globalThis.localStorage.setItem !== "function" ||
  typeof globalThis.localStorage.clear !== "function"
) {
  const storage = new Map<string, string>();

  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
      removeItem: (key: string) => storage.delete(key),
      clear: () => storage.clear(),
    },
  });
}

const adminPlaces = [
  {
    id: "osm-node-11873831454",
    slug: "nilu-coffee",
    name: "Nilu Coffee",
    tagline: "Coffee shop di Kaliurang untuk kandidat WFC Jogja.",
    area: "Kaliurang",
    address: "Jl. Arvia Mulia Regency No.2a, Condongcatur, Sleman",
    category: "coffee_shop",
    priceLevel: "menengah",
    coffeePriceMin: 22000,
    coordinates: { latitude: -7.749111, longitude: 110.4010151 },
    coverImage: "https://pameo.co/wp-content/uploads/2024/02/Mask-Group-31.jpg",
    imageStatus: "scraped",
    realImageUrl: "https://pameo.co/wp-content/uploads/2024/02/Mask-Group-31.jpg",
    galleryImages: ["https://pameo.co/wp-content/uploads/2024/02/Mask-Group-31.jpg"],
    featureHighlights: ["Coffee shop", "Punya real image"],
    bestFor: ["Nugas", "Kerja remote"],
    amenities: {
      hasSockets: true,
      hasMusholla: false,
      hasParking: true,
      smokingArea: false,
      indoorOutdoor: true,
    },
    description: "Candidate from OpenStreetMap untuk kebutuhan WFC di Jogja.",
    openingHours: "09:00-22:00",
    contactPhone: "",
    instagram: "",
    website: "https://pameo.co/",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=-7.749111,110.4010151",
    ratingBreakdown: {
      food: 4.2,
      drink: 4.3,
      wifi: 4.1,
      ambience: 4.2,
      workFriendly: 4.2,
      value: 4.1,
    },
    recommendedMenu: [{ name: "Kopi Signature", priceLabel: "Cek menu", note: "Lengkapi harga dari admin." }],
    reviews: [
      {
        id: "review-nilu",
        cafeId: "osm-node-11873831454",
        author: "Kurator WFC Jogja",
        role: "Dataset reviewer",
        comment: "Review WFC awal dari dataset.",
        visitDate: "2026-04-26",
        createdAt: "2026-04-26T09:00:00+07:00",
        ratings: {
          food: 4,
          drink: 4,
          wifi: 4,
          ambience: 4,
          workFriendly: 4,
          value: 4,
        },
      },
    ],
    status: "published",
    adminNotes: "Auto-published karena punya real image.",
    sourceMentions: [],
    webSignalScore: 0,
    freshnessStatus: "osm-only",
    createdAt: "2026-04-26T09:00:00+07:00",
    updatedAt: "2026-04-26T09:00:00+07:00",
  },
  {
    id: "osm-node-12965873082",
    slug: "cronica-creative-workspace",
    name: "Crônica Creative Workspace",
    tagline: "Coworking space di Yogyakarta untuk kandidat WFC Jogja.",
    area: "Yogyakarta",
    address: "Jalan A.M. Sangaji, 62, Yogyakarta",
    category: "coworking_space",
    priceLevel: "premium",
    coffeePriceMin: 35000,
    coordinates: { latitude: -7.7755597, longitude: 110.3681831 },
    coverImage: "https://antologi.group/wp-content/themes/anto/assets/img/Moshi_images/Moshi_red.png",
    imageStatus: "scraped",
    realImageUrl: "https://antologi.group/wp-content/themes/anto/assets/img/Moshi_images/Moshi_red.png",
    galleryImages: ["https://antologi.group/wp-content/themes/anto/assets/img/Moshi_images/Moshi_red.png"],
    featureHighlights: ["Coworking space", "Punya real image"],
    bestFor: ["Remote work", "Meeting", "Deep work"],
    amenities: {
      hasSockets: true,
      hasMusholla: false,
      hasParking: true,
      smokingArea: false,
      indoorOutdoor: true,
    },
    description: "Candidate from OpenStreetMap untuk kebutuhan WFC di Jogja.",
    openingHours: "Mo-Su 07:00-22:00",
    contactPhone: "",
    instagram: "@antologispace",
    website: "https://antologi.group/cronica/",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=-7.7755597,110.3681831",
    ratingBreakdown: {
      food: 4.5,
      drink: 4.5,
      wifi: 4.7,
      ambience: 4.6,
      workFriendly: 4.8,
      value: 4.2,
    },
    recommendedMenu: [{ name: "Day Pass / Workspace", priceLabel: "Cek menu", note: "Lengkapi harga dari admin." }],
    reviews: [],
    status: "published",
    adminNotes: "Auto-published karena punya real image.",
    sourceMentions: [],
    webSignalScore: 14,
    freshnessStatus: "has-web-signal",
    createdAt: "2026-04-26T09:00:00+07:00",
    updatedAt: "2026-04-26T09:00:00+07:00",
  },
  {
    id: "osm-node-11064518681",
    slug: "altilis-coffee",
    name: "Altilis Coffee",
    tagline: "Coffee shop di Sleman untuk kandidat WFC Jogja.",
    area: "Sleman",
    address: "Jalan Baru Mulungan, 88, Sleman",
    category: "coffee_shop",
    priceLevel: "menengah",
    coffeePriceMin: 22000,
    coordinates: { latitude: -7.7273582, longitude: 110.3646145 },
    coverImage: "/dataset-images/wfc-coffee.svg",
    imageStatus: "fallback",
    realImageUrl: "",
    galleryImages: [],
    featureHighlights: ["Coffee shop", "Butuh image"],
    bestFor: ["Nugas"],
    amenities: {
      hasSockets: true,
      hasMusholla: false,
      hasParking: true,
      smokingArea: true,
      indoorOutdoor: true,
    },
    description: "Candidate from OpenStreetMap untuk kebutuhan WFC di Jogja.",
    openingHours: "Mo-Su 11:00-23:00",
    contactPhone: "",
    instagram: "",
    website: "",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=-7.7273582,110.3646145",
    ratingBreakdown: {
      food: 4,
      drink: 4,
      wifi: 4,
      ambience: 4,
      workFriendly: 4,
      value: 4,
    },
    recommendedMenu: [],
    reviews: [],
    status: "draft",
    adminNotes: "Lengkapi cover image asli sebelum publish.",
    sourceMentions: [],
    webSignalScore: 0,
    freshnessStatus: "osm-only",
    createdAt: "2026-04-26T09:00:00+07:00",
    updatedAt: "2026-04-26T09:00:00+07:00",
  },
];

function toCafeListItem(place: (typeof adminPlaces)[number]) {
  return {
    id: place.id,
    slug: place.slug,
    name: place.name,
    tagline: place.tagline,
    area: place.area,
    address: place.address,
    priceLevel: place.priceLevel,
    rating: 4.3,
    reviewCount: place.reviews.length,
    coordinates: place.coordinates,
    coverImage: place.coverImage,
    featureHighlights: place.featureHighlights,
    bestFor: place.bestFor,
    amenities: place.amenities,
  };
}

function paginateItems<T>(items: T[], url: URL) {
  const page = Math.max(1, Number.parseInt(url.searchParams.get("page") ?? "1", 10) || 1);
  const limit = Math.max(1, Number.parseInt(url.searchParams.get("limit") ?? "12", 10) || 12);
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * limit;

  return {
    items: items.slice(start, start + limit),
    page: safePage,
    limit,
    total,
    totalPages,
  };
}

function jsonResponse(body: unknown, init: ResponseInit = {}) {
  return Promise.resolve(
    new Response(JSON.stringify(body), {
      status: 200,
      headers: { "content-type": "application/json" },
      ...init,
    }),
  );
}

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      const method = init?.method ?? "GET";
      const url = new URL(String(input), "http://localhost:4000");
      const publicPlaces = adminPlaces.filter((place) => place.status === "published");

      if (url.pathname === "/auth/login" && method === "POST") {
        return jsonResponse({
          accessToken: "dev-admin-token",
          user: {
            id: "admin-01",
            email: "admin@wfc.test",
            name: "Admin WFC Jogja",
            role: "admin",
          },
        });
      }

      if (url.pathname.startsWith("/admin/") && init?.headers) {
        const headers = init.headers as Record<string, string>;
        if (headers.authorization !== "Bearer dev-admin-token") {
          return jsonResponse({ error: "Unauthorized" }, { status: 401 });
        }
      }

      if (url.pathname === "/admin/places" && method === "GET") {
        const status = url.searchParams.get("status");
        const imageStatus = url.searchParams.get("imageStatus");
        const q = url.searchParams.get("q")?.toLowerCase();
        const items = adminPlaces.filter((place) => {
          if (status && status !== "all" && place.status !== status) return false;
          if (imageStatus && imageStatus !== "all" && place.imageStatus !== imageStatus) return false;
          if (q && !`${place.name} ${place.area} ${place.address}`.toLowerCase().includes(q)) return false;
          return true;
        });
        return jsonResponse({ items, total: items.length });
      }

      if (url.pathname.startsWith("/admin/places/") && method === "GET") {
        const id = decodeURIComponent(url.pathname.replace("/admin/places/", ""));
        return jsonResponse(adminPlaces.find((place) => place.id === id) ?? null);
      }

      if (url.pathname.startsWith("/admin/places/") && ["PATCH", "DELETE"].includes(method)) {
        const id = decodeURIComponent(url.pathname.replace("/admin/places/", ""));
        const place = adminPlaces.find((item) => item.id === id);
        return jsonResponse({ ...place, ...(method === "DELETE" ? { status: "archived" } : JSON.parse(String(init?.body ?? "{}"))) });
      }

      if (url.pathname === "/admin/places" && method === "POST") {
        return jsonResponse({ ...adminPlaces[0], ...JSON.parse(String(init?.body ?? "{}")), id: "admin-new" }, { status: 201 });
      }

      if (url.pathname === "/cafes" && method === "GET") {
        let items = publicPlaces.map(toCafeListItem);
        const q = url.searchParams.get("q")?.toLowerCase();
        const area = url.searchParams.get("area");
        const priceLevel = url.searchParams.get("priceLevel");
        if (q) items = items.filter((item) => `${item.name} ${item.tagline}`.toLowerCase().includes(q));
        if (area) items = items.filter((item) => item.area === area);
        if (priceLevel) items = items.filter((item) => item.priceLevel === priceLevel);
        const paginated = paginateItems(items, url);
        return jsonResponse({
          items: paginated.items,
          total: paginated.total,
          page: paginated.page,
          limit: paginated.limit,
          totalPages: paginated.totalPages,
          availableAreas: Array.from(new Set(publicPlaces.map((place) => place.area))).sort(),
        });
      }

      if (url.pathname.startsWith("/cafes/") && method === "GET") {
        const slug = decodeURIComponent(url.pathname.replace("/cafes/", ""));
        return jsonResponse(publicPlaces.find((place) => place.slug === slug) ?? null);
      }

      if (url.pathname === "/lists" && method === "GET") {
        return jsonResponse([
          {
            id: "list-osm-02",
            slug: "coworking-dan-workspace-jogja",
            title: "Coworking dan Workspace Jogja",
            summary: "Tempat kerja serius dari dataset admin.",
            description: "Kurasi coworking/workspace yang sudah published.",
            heroLabel: "Kerja serius",
            cafeSlugs: ["cronica-creative-workspace", "nilu-coffee"],
          },
        ]);
      }

      if (url.pathname === "/lists/coworking-dan-workspace-jogja" && method === "GET") {
        const cafes = [toCafeListItem(adminPlaces[1]), toCafeListItem(adminPlaces[0])];
        const paginated = paginateItems(cafes, url);
        return jsonResponse({
          id: "list-osm-02",
          slug: "coworking-dan-workspace-jogja",
          title: "Coworking dan Workspace Jogja",
          summary: "Tempat kerja serius dari dataset admin.",
          description: "Kurasi coworking/workspace yang sudah published.",
          heroLabel: "Kerja serius",
          cafeSlugs: ["cronica-creative-workspace", "nilu-coffee"],
          cafes: paginated.items,
          totalCafes: paginated.total,
          page: paginated.page,
          limit: paginated.limit,
          totalPages: paginated.totalPages,
        });
      }

      return jsonResponse({ error: `Unhandled test route ${method} ${url.pathname}` }, { status: 404 });
    }),
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

vi.mock("next/image", () => ({
  default: ({
    fill,
    ...props
  }: ComponentProps<"img"> & { fill?: boolean }) =>
    createElement("img", {
      ...props,
      alt: props.alt ?? "",
      "data-fill": fill ? "true" : undefined,
    }),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
