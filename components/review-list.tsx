import { RatingStars } from "@/components/rating-stars";
import { getAverageRating } from "@/lib/utils/cafes";
import type { CafeReview, RatingBreakdown } from "@/lib/types";
import { User, Calendar, MessageSquare } from "lucide-react";

const ratingLabels: Array<{ key: keyof RatingBreakdown; label: string }> = [
  { key: "food", label: "Makanan" },
  { key: "drink", label: "Minuman" },
  { key: "wifi", label: "Wifi" },
  { key: "ambience", label: "Suasana" },
  { key: "workFriendly", label: "Work-friendly" },
  { key: "value", label: "Value" },
];

export function ReviewList({
  reviews,
  summary,
}: {
  reviews: CafeReview[];
  summary: RatingBreakdown;
}) {
  return (
    <div className="space-y-12">
      {/* Rating Summary Card */}
      <div className="p-8 rounded-[2.5rem] bg-emerald-50 border border-emerald-100 shadow-sm overflow-hidden relative">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 space-y-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">Rating Overview</p>
              <h3 className="font-[family-name:var(--font-display)] text-3xl font-black text-emerald-950">
                Skor Pengunjung
              </h3>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-emerald-100 shadow-sm">
              <div className="text-4xl font-black text-emerald-600">
                {getAverageRating(summary).toFixed(1)}
              </div>
              <div className="h-10 w-px bg-emerald-100" />
              <RatingStars value={getAverageRating(summary)} compact />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ratingLabels.map((item) => (
              <div
                key={item.key}
                className="bg-white p-5 rounded-2xl border border-emerald-100/50 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-500">{item.label}</span>
                  <span className="text-sm font-black text-emerald-700">{summary[item.key].toFixed(1)}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full" 
                    style={{ width: `${(summary[item.key] / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="w-5 h-5 text-emerald-600" />
          <h4 className="text-xl font-black text-emerald-950">
            {reviews.length} Komentar Terverifikasi
          </h4>
        </div>

        <div className="space-y-6">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:border-emerald-200 transition-colors"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
                    <User className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-emerald-950">
                      {review.author}
                    </h4>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                      <span className="text-emerald-600">{review.role}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {review.visitDate}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-emerald-50 px-4 py-2 rounded-xl">
                  <RatingStars value={getAverageRating(review.ratings)} compact />
                </div>
              </div>
              
              <div className="mt-8 relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-emerald-100 rounded-full" />
                <p className="text-lg leading-relaxed text-slate-600 font-medium italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50 flex flex-wrap gap-2">
                {ratingLabels.filter(rl => review.ratings[rl.key] >= 4.5).map(rl => (
                  <span key={rl.key} className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider rounded-full">
                    Excellent {rl.label}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
