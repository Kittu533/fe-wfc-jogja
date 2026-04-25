import Image from "next/image";
import Link from "next/link";

import { RatingStars } from "@/components/rating-stars";
import { getPriceLabel } from "@/lib/utils/cafes";
import type { CafeListItem } from "@/lib/types";

export function CafeCard({ cafe }: { cafe: CafeListItem }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(6,78,59,0.12)] border border-emerald-100/50">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={cafe.coverImage}
          alt={cafe.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="backdrop-blur-md bg-white/70 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-950">
            {cafe.area}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="backdrop-blur-md bg-emerald-600/80 px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
             <span className="text-[10px] font-black text-white">{cafe.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4">
           <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-emerald-900/30 uppercase tracking-[0.2em]">{getPriceLabel(cafe.priceLevel)}</span>
              <span className="w-1 h-1 rounded-full bg-emerald-100" />
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Verified</span>
           </div>
           <h3 className="text-xl font-black leading-tight text-emerald-950 group-hover:text-emerald-600 transition-colors">
              {cafe.name}
           </h3>
        </div>
        
        <p className="line-clamp-2 text-sm font-medium leading-relaxed text-emerald-900/50 mb-6">
          {cafe.tagline}
        </p>

        <div className="mt-auto pt-4 border-t border-emerald-50/50 flex items-center justify-between">
          <RatingStars value={cafe.rating} compact />
          <Link
            href={`/cafes/${cafe.slug}`}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm"
          >
            <span className="sr-only">Detail</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
