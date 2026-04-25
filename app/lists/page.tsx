import type { Metadata } from "next";
import Link from "next/link";

import { EmptyState } from "@/components/empty-state";
import { SectionHeader } from "@/components/section-header";
import { getCuratedLists } from "@/lib/services/cafes";

export const metadata: Metadata = {
  title: "Kurasi Cafe",
  description: "Daftar list tematik untuk membantu pengguna memilih cafe lebih cepat.",
};

export default async function ListsPage() {
  const lists = await getCuratedLists();

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Editorial lists"
        title="Kurasi cepat untuk intent yang paling sering dicari"
        description="Alih-alih mulai dari nol, user bisa lompat ke kumpulan cafe yang sudah dipilih berdasarkan kebutuhan spesifik."
      />

      {lists.length === 0 ? (
        <EmptyState
          title="Belum ada kurasi yang tampil"
          description="Saat ini list editorial belum tersedia. Nanti bagian ini bisa diarahkan ke admin atau CMS."
          actionHref="/cafes"
          actionLabel="Lihat semua cafe"
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {lists.map((item) => (
            <Link
              key={item.id}
              href={`/lists/${item.slug}`}
              className="section-shell rounded-[2rem] p-6 transition hover:-translate-y-1"
            >
              <p className="eyebrow">{item.heroLabel}</p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-[color:var(--foreground)]">
                {item.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">{item.description}</p>
              <p className="mt-6 text-sm font-semibold text-[color:var(--accent-strong)]">
                {item.cafeSlugs.length} cafe di dalam kurasi →
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
