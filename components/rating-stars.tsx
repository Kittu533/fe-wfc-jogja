type RatingStarsProps = {
  value: number;
  compact?: boolean;
};

export function RatingStars({ value, compact = false }: RatingStarsProps) {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 text-amber-500">
        {stars.map((star) => {
          const active = star <= Math.round(value);
          return (
            <span
              key={star}
              aria-hidden="true"
              className={active ? "opacity-100" : "opacity-25"}
            >
              ★
            </span>
          );
        })}
      </div>
      <span
        className={
          compact
            ? "text-sm font-semibold text-[color:var(--foreground)]"
            : "text-base font-semibold text-[color:var(--foreground)]"
        }
      >
        {value.toFixed(1)}
      </span>
    </div>
  );
}
