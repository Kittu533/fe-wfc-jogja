import { RatingStars } from "@/components/rating-stars";
import { getAverageRating } from "@/lib/utils/cafes";
import type { CafeReview, RatingBreakdown } from "@/lib/types";

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
    <div className="space-y-8">
      <div className="section-shell rounded-[2rem] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">Ringkasan rating</p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--foreground)]">
              Skor rata-rata pengunjung
            </h3>
          </div>
          <RatingStars value={getAverageRating(summary)} />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ratingLabels.map((item) => (
            <div
              key={item.key}
              className="rounded-[1.5rem] border border-[color:var(--border)] bg-white px-4 py-4"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-[color:var(--muted)]">{item.label}</span>
                <span className="text-lg font-bold text-[color:var(--foreground)]">
                  {summary[item.key].toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="section-shell rounded-[2rem] p-6"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h4 className="text-lg font-semibold text-[color:var(--foreground)]">
                  {review.author}
                </h4>
                <p className="text-sm text-[color:var(--muted)]">
                  {review.role} • Kunjungan {review.visitDate}
                </p>
              </div>
              <RatingStars value={getAverageRating(review.ratings)} compact />
            </div>
            <p className="mt-4 text-sm leading-7 text-[color:var(--foreground)]">
              {review.comment}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
