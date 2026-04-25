import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CafeCard } from "@/components/cafe-card";
import { EmptyState } from "@/components/empty-state";
import { SectionHeader } from "@/components/section-header";
import { getCuratedListBySlug } from "@/lib/services/cafes";

type CuratedListDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CuratedListDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const list = await getCuratedListBySlug(slug);

  if (!list) {
    return {
      title: "Kurasi tidak ditemukan",
    };
  }

  return {
    title: list.title,
    description: list.summary,
  };
}

export default async function CuratedListDetailPage({
  params,
}: CuratedListDetailPageProps) {
  const { slug } = await params;
  const list = await getCuratedListBySlug(slug);

  if (!list) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow={list.heroLabel}
        title={list.title}
        description={list.description}
      />

      <section className="section-shell rounded-[2rem] p-6 text-sm leading-7 text-[color:var(--muted)]">
        {list.summary}
      </section>

      {list.cafes.length === 0 ? (
        <EmptyState
          title="Kurasi ini belum punya cafe"
          description="Secara arsitektur, kondisi kosong seperti ini sudah ditangani supaya aman saat nanti data datang dari backend."
          actionHref="/lists"
          actionLabel="Kembali ke semua kurasi"
        />
      ) : (
        <section className="grid gap-6 lg:grid-cols-3">
          {list.cafes.map((cafe) => (
            <CafeCard key={cafe.id} cafe={cafe} />
          ))}
        </section>
      )}
    </div>
  );
}
