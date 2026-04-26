import selectedCandidates from "@/data/wfc-candidates-jogja.selected.json";
import type {
  CafeDetail,
  CafeMenuItem,
  CafeReview,
  CuratedList,
  PriceLevel,
  RatingBreakdown,
} from "@/lib/types";

type OsmWfcCandidate = {
  source: string;
  sourceId: string;
  name: string;
  slug: string;
  amenity: string;
  category: "cafe" | "coffee_shop" | "coworking_space" | "wifi_spot" | "other";
  areaHint: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  website: string;
  instagram: string;
  imageUrl: string;
  imageSource: string;
  imageStatus: "scraped" | "fallback" | "missing";
  realImageUrl: string;
  fallbackCoverImage: string;
  openingHours: string;
  cuisine: string;
  internetAccess: string;
  hasWifiSignal: boolean;
  wfcScore: number;
  rawTags: Record<string, string>;
  curationStatus: string;
  notes: string;
  webSignalScore?: number;
  freshnessStatus?: "has-web-signal" | "osm-only";
  lastSignalAt?: string;
  sourceMentions?: Array<{
    sourceId: string;
    type: string;
    publisher: string;
    title: string;
    url: string;
    publishedAt: string;
    fetchedAt: string;
    matchedAliases: string[];
    keywordHits: string[];
    snippet: string;
  }>;
};

const candidates = selectedCandidates as unknown as OsmWfcCandidate[];

export const mockCafes: CafeDetail[] = candidates.map(toCafeDetail);

export const mockCuratedLists: CuratedList[] = buildCuratedLists(candidates);

function toCafeDetail(candidate: OsmWfcCandidate, index: number): CafeDetail {
  const id = `osm-${candidate.sourceId.replace("/", "-")}`;
  const area = normalizeArea(candidate);
  const ratingBreakdown = buildRatingBreakdown(candidate);
  const coverImage = pickCoverImage(candidate);
  const fallbackGallery = candidate.fallbackCoverImage || "/dataset-images/wfc-cafe.svg";

  return {
    id,
    slug: candidate.slug,
    name: candidate.name,
    tagline: buildTagline(candidate),
    area,
    address: buildDisplayAddress(candidate, area),
    priceLevel: inferPriceLevel(candidate),
    coordinates: {
      latitude: candidate.latitude,
      longitude: candidate.longitude,
    },
    coverImage,
    featureHighlights: buildFeatureHighlights(candidate),
    bestFor: buildBestFor(candidate),
    amenities: {
      hasSockets: candidate.category === "coworking_space" || candidate.wfcScore >= 4,
      hasMusholla: Boolean(candidate.rawTags.muslim || candidate.rawTags.prayer_room),
      hasParking: candidate.category !== "coworking_space" || candidate.wfcScore >= 4,
      smokingArea: candidate.rawTags.outdoor_seating === "yes",
      indoorOutdoor: candidate.rawTags.outdoor_seating === "yes" || candidate.category !== "wifi_spot",
    },
    description: buildDescription(candidate, area),
    openingHours: candidate.openingHours || "Belum ada data jam buka dari OSM",
    contactPhone: candidate.phone,
    instagram: normalizeInstagram(candidate.instagram),
    website: candidate.website,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${candidate.latitude},${candidate.longitude}`,
    galleryImages:
      candidate.imageStatus === "scraped"
        ? [coverImage]
        : Array.from(new Set([coverImage, fallbackGallery])).filter(Boolean),
    ratingBreakdown,
    recommendedMenu: buildRecommendedMenu(candidate),
    reviews: [buildSyntheticReview(candidate, id, ratingBreakdown, index)],
  };
}

function buildCuratedLists(items: OsmWfcCandidate[]): CuratedList[] {
  const byScore = [...items].sort(
    (a, b) =>
      (b.webSignalScore ?? 0) - (a.webSignalScore ?? 0) ||
      b.wfcScore - a.wfcScore ||
      a.name.localeCompare(b.name, "id"),
  );
  const coworking = byScore.filter((item) => item.category === "coworking_space");
  const coffee = byScore.filter((item) => item.category === "coffee_shop");
  const wifiReady = byScore.filter((item) => item.hasWifiSignal || item.internetAccess);

  return [
    {
      id: "list-osm-01",
      slug: "spot-wfc-terkurasi-osm",
      title: "Spot WFC Terkurasi OSM",
      summary: "Kandidat paling kuat dari OpenStreetMap buat kerja, nugas, dan laptop-an di Jogja.",
      description:
        "List ini dibentuk dari dataset OSM lokal: prioritas ke nama yang jelas, sinyal wifi, workspace, dan skor WFC. Tetap perlu validasi manual untuk colokan, suasana, dan kondisi terbaru.",
      heroLabel: "OSM candidates",
      cafeSlugs: byScore.slice(0, 12).map((item) => item.slug),
    },
    {
      id: "list-osm-02",
      slug: "coworking-dan-workspace-jogja",
      title: "Coworking dan Workspace Jogja",
      summary: "Buat yang butuh suasana lebih serius dari sekadar nongkrong kopi.",
      description:
        "Kurasi tempat dengan sinyal coworking/workspace dari dataset. Cocok buat call, sprint kerja, atau pindah suasana tanpa gambling berlebihan.",
      heroLabel: "Kerja serius",
      cafeSlugs: coworking.slice(0, 12).map((item) => item.slug),
    },
    {
      id: "list-osm-03",
      slug: "coffee-shop-buat-nugas",
      title: "Coffee Shop Buat Nugas",
      summary: "Coffee shop yang namanya kuat ke kopi dan potensial buat sesi fokus.",
      description:
        "List ini fokus ke coffee shop dari dataset OSM. Cocok buat mahasiswa, freelancer, dan remote worker yang nyari tempat mulai dari kopi dulu.",
      heroLabel: "Kopi + fokus",
      cafeSlugs: coffee.slice(0, 12).map((item) => item.slug),
    },
    {
      id: "list-osm-04",
      slug: "wifi-ready-jogja",
      title: "Wifi Ready Jogja",
      summary: "Tempat yang punya indikasi wifi atau internet access di data OSM.",
      description:
        "Ini bukan jaminan speedtest, tapi start point paling masuk akal sebelum validasi manual. Pakai list ini kalau kebutuhan utamanya online meeting atau upload tugas.",
      heroLabel: "Wifi signal",
      cafeSlugs: wifiReady.slice(0, 12).map((item) => item.slug),
    },
  ];
}

function normalizeArea(candidate: OsmWfcCandidate) {
  const areaHint = clean(candidate.areaHint);
  const rawArea = areaHint || candidate.rawTags["addr:suburb"] || candidate.rawTags["addr:village"];

  if (/sleman|condong|catur|depok/i.test(rawArea)) return "Sleman";
  if (/kadipaten|kraton|prawiro|mantrijeron/i.test(rawArea)) return "Prawirotaman";
  if (/yogyakarta|jogja|kota/i.test(rawArea)) return "Yogyakarta";
  if (/ambarketawang|gamping/i.test(rawArea)) return "Gamping";
  if (/pogung|kaliurang/i.test(rawArea)) return "Kaliurang";

  const { latitude, longitude } = candidate;

  if (latitude > -7.755) return "Kaliurang";
  if (longitude > 110.397 && latitude > -7.792) return "Seturan";
  if (longitude > 110.385 && latitude > -7.805) return "Gejayan";
  if (latitude < -7.81 && longitude < 110.39) return "Prawirotaman";
  if (longitude < 110.355) return "Gamping";

  return "Yogyakarta";
}

function buildDisplayAddress(candidate: OsmWfcCandidate, area: string) {
  const address =
    clean(candidate.address) ||
    clean(candidate.rawTags.description) ||
    clean(candidate.rawTags["addr:full"]);

  if (address) {
    return address;
  }

  return `Area ${area}, titik OSM ${candidate.latitude.toFixed(5)}, ${candidate.longitude.toFixed(5)}`;
}

function inferPriceLevel(candidate: OsmWfcCandidate): PriceLevel {
  const fields = [candidate.name, candidate.category, candidate.cuisine, candidate.rawTags.description]
    .join(" ")
    .toLowerCase();

  if (/cowork|workspace|premium|roastery|reserve|specialty/.test(fields)) {
    return "premium";
  }

  if (/kampus|murah|warung|budget|angkring/.test(fields)) {
    return "murah";
  }

  return "menengah";
}

function pickCoverImage(candidate: OsmWfcCandidate) {
  if (candidate.imageUrl && isDisplayImageAllowed(candidate.imageUrl)) {
    return candidate.imageUrl;
  }

  return candidate.fallbackCoverImage || "/dataset-images/wfc-cafe.svg";
}

function isDisplayImageAllowed(value: string) {
  if (value.startsWith("/")) {
    return true;
  }

  try {
    const hostname = new URL(value).hostname.toLowerCase();

    return ["images.unsplash.com", "pameo.co", "antologi.group"].includes(hostname);
  } catch {
    return false;
  }
}

function buildTagline(candidate: OsmWfcCandidate) {
  const categoryLabel = getCategoryLabel(candidate);
  const wifiLabel = candidate.hasWifiSignal ? "punya sinyal wifi di OSM" : "masih perlu cek wifi manual";
  const area = normalizeArea(candidate);
  const webSignalLabel = candidate.freshnessStatus === "has-web-signal" ? "dan sudah muncul di source web terbaru" : "";

  return `${categoryLabel} di ${area}, ${wifiLabel} ${webSignalLabel}, cocok jadi kandidat WFC sebelum lo gas ke lokasi.`
    .replace(/\s+/g, " ")
    .trim();
}

function buildDescription(candidate: OsmWfcCandidate, area: string) {
  const sourceLabel = candidate.sourceId.replace("/", " ");

  return [
    `Candidate from OpenStreetMap untuk kebutuhan WFC di area ${area}.`,
    `Data awal ini membaca kategori, nama tempat, koordinat, website, jam buka, dan sinyal internet kalau tersedia dari OSM (${sourceLabel}).`,
    "Sebelum dijadikan rekomendasi final, tetap validasi manual: kualitas wifi, colokan, kursi, noise level, dan apakah tempatnya masih aktif.",
  ].join(" ");
}

function buildFeatureHighlights(candidate: OsmWfcCandidate) {
  const highlights = new Set<string>();

  highlights.add(getCategoryLabel(candidate));

  if (candidate.freshnessStatus === "has-web-signal") highlights.add("Disebut artikel");
  if (candidate.hasWifiSignal || candidate.internetAccess) highlights.add("Indikasi wifi");
  if (candidate.wfcScore >= 5) highlights.add("Skor WFC tinggi");
  if (candidate.wfcScore >= 4) highlights.add("Potensial buat fokus");
  if (candidate.openingHours) highlights.add("Jam buka tersedia");
  if (candidate.website) highlights.add("Ada website");
  if (candidate.rawTags.outdoor_seating === "yes") highlights.add("Ada outdoor");

  return Array.from(highlights).slice(0, 4);
}

function buildBestFor(candidate: OsmWfcCandidate) {
  if (candidate.category === "coworking_space") {
    return ["Remote work", "Meeting", "Deep work"];
  }

  if (candidate.hasWifiSignal) {
    return ["Nugas", "Kerja remote", "Online meeting"];
  }

  if (candidate.category === "coffee_shop") {
    return ["Coffee break", "Nugas ringan", "Cari mood"];
  }

  return ["Survey spot", "Nugas ringan"];
}

function buildRatingBreakdown(candidate: OsmWfcCandidate): RatingBreakdown {
  const base = clampRating(3.7 + candidate.wfcScore * 0.16);
  const wifi = clampRating(candidate.hasWifiSignal ? base + 0.4 : base - 0.2);
  const workFriendly = clampRating(base + (candidate.category === "coworking_space" ? 0.45 : 0.1));
  const value = clampRating(candidate.category === "coworking_space" ? base - 0.15 : base + 0.05);

  return {
    food: clampRating(base - 0.15),
    drink: clampRating(candidate.category === "coffee_shop" ? base + 0.2 : base),
    wifi,
    ambience: clampRating(base),
    workFriendly,
    value,
  };
}

function buildRecommendedMenu(candidate: OsmWfcCandidate): CafeMenuItem[] {
  if (candidate.category === "coworking_space") {
    return [
      { name: "Day Pass / Workspace", priceLabel: "Cek lokasi", note: "validasi paket kerja langsung" },
      { name: "Kopi Pendamping", priceLabel: "Cek menu", note: "buat sesi fokus panjang" },
    ];
  }

  if (candidate.category === "coffee_shop") {
    return [
      { name: "Kopi Signature", priceLabel: "Cek menu", note: "pilihan aman buat mulai sesi" },
      { name: "Manual Brew / Espresso", priceLabel: "Cek menu", note: "kalau butuh kopi yang lebih niat" },
    ];
  }

  return [
    { name: "Menu utama", priceLabel: "Cek menu", note: "data menu belum tersedia dari OSM" },
    { name: "Minuman fokus", priceLabel: "Cek menu", note: "validasi langsung di lokasi" },
  ];
}

function buildSyntheticReview(
  candidate: OsmWfcCandidate,
  cafeId: string,
  ratings: RatingBreakdown,
  index: number,
): CafeReview {
  return {
    id: `osm-review-${index + 1}`,
    cafeId,
    author: "Kurator WFC Jogja",
    role: "Dataset reviewer",
    comment:
      "Review WFC awal dari dataset OSM. Tempat ini masuk kandidat, tapi masih perlu validasi manual untuk colokan, ambience, dan kondisi ramai.",
    visitDate: "2026-04-26",
    createdAt: "2026-04-26T09:00:00+07:00",
    ratings,
  };
}

function normalizeInstagram(value: string) {
  const instagram = clean(value);

  if (!instagram) {
    return undefined;
  }

  return instagram.startsWith("@") ? instagram : `@${instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, "")}`;
}

function getCategoryLabel(candidate: OsmWfcCandidate) {
  switch (candidate.category) {
    case "coworking_space":
      return "Coworking space";
    case "coffee_shop":
      return "Coffee shop";
    case "wifi_spot":
      return "Wifi spot";
    case "cafe":
      return "Cafe";
    case "other":
      return "WFC candidate";
  }
}

function clampRating(value: number) {
  return Number(Math.min(4.9, Math.max(3.6, value)).toFixed(1));
}

function clean(value?: string) {
  return value?.trim() ?? "";
}
