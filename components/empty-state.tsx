import Link from "next/link";

export function EmptyState({
  title,
  description,
  actionHref,
  actionLabel,
}: {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="section-shell rounded-[2rem] p-8 text-center">
      <p className="eyebrow mb-3">Kosong dulu</p>
      <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--foreground)]">
        {title}
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-[color:var(--muted)]">{description}</p>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="mt-6 inline-flex rounded-full bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-strong)]"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
