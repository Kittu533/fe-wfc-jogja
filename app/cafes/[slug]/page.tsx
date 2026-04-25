import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ReviewList } from "@/components/review-list";
import { SectionHeader } from "@/components/section-header";
import { getCafeBySlug } from "@/lib/services/cafes";
import { getPriceLabel } from "@/lib/utils/cafes";

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

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="badge-soft text-xs font-semibold">{cafe.area}</span>
              <span className="rounded-full bg-[color:var(--forest)] px-4 py-2 text-xs font-semibold text-white">
                {getPriceLabel(cafe.priceLevel)}
              </span>
            </div>
            <div>
              <p className="eyebrow">Detail cafe</p>
              <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-5xl">
                {cafe.name}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
                {cafe.description}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="section-shell rounded-[1.75rem] p-5">
              <p className="text-sm text-[color:var(--muted)]">Jam buka</p>
              <p className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">{cafe.openingHours}</p>
            </div>
            <div className="section-shell rounded-[1.75rem] p-5">
              <p className="text-sm text-[color:var(--muted)]">Kontak</p>
              <p className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">{cafe.contactPhone}</p>
            </div>
            <div className="section-shell rounded-[1.75rem] p-5">
              <p className="text-sm text-[color:var(--muted)]">Alamat</p>
              <p className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">{cafe.address}</p>
            </div>
          </div>
        </div>

        <div className="section-shell overflow-hidden rounded-[2rem]">
          <div className="relative h-full min-h-[360px]">
            <Image
              src={cafe.coverImage}
              alt={cafe.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="section-shell rounded-[2rem] p-6">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--foreground)]">
              Amenities utama
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {[
                cafe.amenities.hasSockets ? "Banyak colokan" : null,
                cafe.amenities.hasMusholla ? "Ada musholla" : null,
                cafe.amenities.hasParking ? "Parkir tersedia" : null,
                cafe.amenities.smokingArea ? "Smoking area" : "Non-smoking dominan",
                cafe.amenities.indoorOutdoor ? "Indoor & outdoor" : "Indoor only",
              ]
                .filter(Boolean)
                .map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm text-[color:var(--foreground)]"
                  >
                    {item}
                  </span>
                ))}
            </div>
          </div>

          <div className="section-shell rounded-[2rem] p-6">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--foreground)]">
              Menu favorit
            </h2>
            <div className="mt-5 space-y-3">
              {cafe.recommendedMenu.map((menu) => (
                <div
                  key={menu.name}
                  className="flex items-start justify-between gap-4 rounded-[1.5rem] border border-[color:var(--border)] bg-white px-4 py-4"
                >
                  <div>
                    <p className="font-semibold text-[color:var(--foreground)]">{menu.name}</p>
                    <p className="text-sm text-[color:var(--muted)]">{menu.note}</p>
                  </div>
                  <span className="text-sm font-semibold text-[color:var(--accent-strong)]">
                    {menu.priceLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="section-shell rounded-[2rem] p-6">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--foreground)]">
              Link cepat
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={cafe.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-white"
              >
                Buka Google Maps
              </a>
              {cafe.instagram ? (
                <a
                  href={`https://instagram.com/${cafe.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[color:var(--border)] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)]"
                >
                  Instagram
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeader
            eyebrow="Review pengguna"
            title="Ringkasan kualitas yang paling relevan"
            description="Untuk fase frontend awal ini, review masih read-only tapi shape data sudah dipisah agar nanti gampang disambungkan ke endpoint review."
          />
          <ReviewList reviews={cafe.reviews} summary={cafe.ratingBreakdown} />
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeader
          eyebrow="Galeri"
          title="Suasana tempat"
          description="Galeri placeholder ini memakai aset mock agar flow visual halaman detail sudah komplet."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {cafe.galleryImages.map((image, index) => (
            <div key={image} className="section-shell relative min-h-[280px] overflow-hidden rounded-[2rem]">
              <Image
                src={image}
                alt={`${cafe.name} gallery ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
