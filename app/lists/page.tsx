import type { Metadata } from "next";

import { EmptyState } from "@/components/empty-state";
import { ListsHero } from "@/components/lists/lists-hero";
import { ListCard } from "@/components/lists/list-card";
import { getCuratedLists } from "@/lib/services/cafes";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kurasi Cafe",
  description: "Daftar list tematik untuk membantu pengguna memilih cafe lebih cepat.",
};

export default async function ListsPage() {
  const lists = await getCuratedLists();

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
      <ListsHero />

      {lists.length === 0 ? (
        <EmptyState
          title="Belum ada kurasi yang tampil"
          description="Saat ini list editorial belum tersedia. Nanti bagian ini bisa diarahkan ke admin atau CMS."
          actionHref="/cafes"
          actionLabel="Lihat semua cafe"
        />
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          {lists.map((item, index) => (
            <ListCard key={item.id} list={item} index={index} />
          ))}
        </div>
      )}

      {/* Info Section */}
      <section className="rounded-[2.5rem] bg-emerald-50 px-8 py-12 text-center sm:px-12">
        <h3 className="text-2xl font-black text-emerald-950 sm:text-3xl">
          Butuh kurasi khusus?
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-emerald-900/60 sm:text-base">
          Tim kami terus memperbarui daftar ini. Kalau kamu punya rekomendasi spot 
          yang belum masuk atau butuh kurasi untuk kebutuhan tertentu, feel free to spill!
        </p>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-900 px-6 py-3 text-xs font-black text-white shadow-lg shadow-emerald-900/10">
            Suggest a List <span>✨</span>
          </div>
        </div>
      </section>
    </div>
  );
}
