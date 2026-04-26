import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CafeCard } from "@/components/cafe-card";
import { EmptyState } from "@/components/empty-state";
import { ListDetailHero } from "@/components/lists/list-detail-hero";
import { Pagination } from "@/components/pagination";
import { getCuratedListBySlug } from "@/lib/services/cafes";
import { parsePaginationParams } from "@/lib/utils/search-params";

export const dynamic = "force-dynamic";

type CuratedListDetailPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
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
  searchParams,
}: CuratedListDetailPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = (await searchParams) ?? {};
  const pagination = parsePaginationParams(resolvedSearchParams);
  const list = await getCuratedListBySlug(slug, pagination);

  if (!list) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
      <ListDetailHero list={list} />

      {list.cafes.length === 0 ? (
        <EmptyState
          title="Kurasi ini belum punya cafe"
          description="Secara arsitektur, kondisi kosong seperti ini sudah ditangani supaya aman saat nanti data datang dari backend."
          actionHref="/lists"
          actionLabel="Kembali ke semua kurasi"
        />
      ) : (
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-emerald-950">
              Explore {list.totalCafes} spots
            </h2>
            <div className="h-px flex-1 bg-emerald-100" />
          </div>
          
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.cafes.map((cafe) => (
              <CafeCard key={cafe.id} cafe={cafe} />
            ))}
          </section>
          <Pagination
            basePath={`/lists/${slug}`}
            page={list.page}
            totalPages={list.totalPages}
            searchParams={resolvedSearchParams}
          />
        </div>
      )}
    </div>
  );
}
