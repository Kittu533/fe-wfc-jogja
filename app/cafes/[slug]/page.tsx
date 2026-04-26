import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Wifi, 
  Zap, 
  MapPin, 
  Clock, 
  Camera, 
  ExternalLink, 
  ChevronRight, 
  Home, 
  Car, 
  Wind, 
  Users,
  Check,
  Star,
  Coffee,
  Utensils
} from "lucide-react";

import { ReviewList } from "@/components/review-list";
import { SectionHeader } from "@/components/section-header";
import { getCafeBySlug } from "@/lib/services/cafes";
import { getPriceLabel } from "@/lib/utils/cafes";
import { RatingStars } from "@/components/rating-stars";
import { getAverageRating } from "@/lib/utils/cafes";

type CafeDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CafeDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cafe = await getCafeBySlug(slug);

  if (!cafe) {
    return {
      title: "Cafe tidak ditemukan",
    };
  }

  return {
    title: cafe.name,
    description: cafe.tagline,
  };
}

export default async function CafeDetailPage({ params }: CafeDetailPageProps) {
  const { slug } = await params;
  const cafe = await getCafeBySlug(slug);

  if (!cafe) {
    notFound();
  }

  const avgRating = getAverageRating(cafe.ratingBreakdown);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src={cafe.coverImage}
          alt={cafe.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <nav className="mb-6 flex items-center gap-2 text-sm font-medium text-white/70">
              <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/cafes" className="hover:text-white transition-colors">
                Cafes
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{cafe.name}</span>
            </nav>
            
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="space-y-4 max-w-3xl">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-emerald-500/20 backdrop-blur-md px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
                    {cafe.area}
                  </span>
                  <span className="rounded-full bg-white/10 backdrop-blur-md px-3 py-1 text-xs font-bold text-white border border-white/20">
                    {getPriceLabel(cafe.priceLevel)}
                  </span>
                </div>
                <h1 className="font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-white sm:text-6xl">
                  {cafe.name}
                </h1>
                <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
                  {cafe.tagline}
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <RatingStars value={avgRating} />
                  <span className="text-white/60 text-sm font-medium border-l border-white/20 pl-4">
                    {cafe.reviews.length} Review
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-16">
            {/* Description */}
            <section className="space-y-6">
              <h2 className="text-2xl font-black text-emerald-950 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                Tentang Cafe
              </h2>
              <p className="text-lg leading-relaxed text-slate-600">
                {cafe.description}
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {cafe.featureHighlights.map((feat) => (
                  <span key={feat} className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 border border-emerald-100">
                    <Check className="w-4 h-4" />
                    {feat}
                  </span>
                ))}
              </div>
            </section>

            {/* Amenities Section */}
            <section className="space-y-6">
              <h2 className="text-2xl font-black text-emerald-950 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                Amenities & Fasilitas
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: Zap, label: "Banyak Colokan", show: cafe.amenities.hasSockets },
                  { icon: Wifi, label: "Wifi Cepat", show: true }, // Assumed
                  { icon: Home, label: "Indoor & Outdoor", show: cafe.amenities.indoorOutdoor },
                  { icon: Wind, label: cafe.amenities.smokingArea ? "Smoking Area" : "AC Area", show: true },
                  { icon: Users, label: "Meeting Spot", show: cafe.bestFor.includes("Meeting") },
                  { icon: Car, label: "Parkir Luas", show: cafe.amenities.hasParking },
                ]
                  .filter(a => a.show)
                  .map((item) => (
                    <div key={item.label} className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:border-emerald-200 transition-colors group">
                      <item.icon className="w-8 h-8 text-emerald-600 mb-3 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-bold text-slate-700 text-center">{item.label}</span>
                    </div>
                  ))}
              </div>
            </section>

            {/* Recommended Menu */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-emerald-950 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                  Menu Rekomendasi
                </h2>
                <div className="px-4 py-1.5 bg-emerald-50 rounded-full text-xs font-black text-emerald-700 uppercase tracking-wider">
                  Verified Picks
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {cafe.recommendedMenu.map((menu) => (
                  <div key={menu.name} className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {menu.name.toLowerCase().includes("kopi") || menu.name.toLowerCase().includes("latte") ? (
                          <Coffee className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Utensils className="w-4 h-4 text-amber-600" />
                        )}
                        <h3 className="font-black text-emerald-950">{menu.name}</h3>
                      </div>
                      <p className="text-sm text-slate-500 font-medium">{menu.note}</p>
                    </div>
                    <span className="text-emerald-600 font-black text-sm bg-emerald-50 px-3 py-1 rounded-lg">
                      {menu.priceLabel}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery */}
            <section className="space-y-6">
              <h2 className="text-2xl font-black text-emerald-950 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                Galeri Suasana
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {cafe.galleryImages.map((img, i) => (
                  <div key={i} className="relative h-64 overflow-hidden rounded-3xl group">
                    <Image
                      src={img}
                      alt={`Gallery ${i}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className="space-y-8">
              <SectionHeader
                eyebrow="Review Pengunjung"
                title="Apa Kata Mereka?"
                description="Review jujur dari para WFC warrior Jogja."
              />
              <ReviewList reviews={cafe.reviews} summary={cafe.ratingBreakdown} />
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-6">
              {/* Quick Card */}
              <div className="p-8 rounded-[2.5rem] bg-emerald-900 text-white shadow-xl relative overflow-hidden group">
                {/* Decorative element */}
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
                
                <div className="relative z-10 space-y-8">
                  <div className="space-y-2">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">Quick Info</p>
                    <h3 className="text-2xl font-black">Plan Your Visit</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white/10 rounded-2xl">
                        <Clock className="w-5 h-5 text-emerald-300" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-white/50 uppercase">Buka Sekarang</p>
                        <p className="font-black text-lg">{cafe.openingHours}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white/10 rounded-2xl">
                        <MapPin className="w-5 h-5 text-emerald-300" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-white/50 uppercase">Lokasi Area</p>
                        <p className="font-bold text-sm leading-relaxed text-white/80">{cafe.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <a
                      href={cafe.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-black rounded-2xl transition-all shadow-lg shadow-emerald-950/20"
                    >
                      <MapPin className="w-4 h-4" />
                      Google Maps
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    {cafe.instagram && (
                      <a
                        href={`https://instagram.com/${cafe.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-4 bg-white/10 hover:bg-white/20 text-white font-black rounded-2xl transition-all border border-white/10"
                      >
                        <Camera className="w-4 h-4" />
                        Instagram
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Best For Card */}
              <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm space-y-6">
                <h4 className="text-lg font-black text-emerald-950">Terbaik Untuk</h4>
                <div className="space-y-3">
                  {cafe.bestFor.map(item => (
                    <div key={item} className="flex items-center gap-3 p-4 bg-emerald-50/50 rounded-2xl">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <span className="font-bold text-emerald-900">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
