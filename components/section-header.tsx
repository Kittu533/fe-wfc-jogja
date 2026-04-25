import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl space-y-4">
        {eyebrow ? (
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[color:var(--accent)]" />
            <p className="eyebrow text-[color:var(--accent)]">{eyebrow}</p>
          </div>
        ) : null}
        <h2 className="font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-[color:var(--foreground)] sm:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="text-lg leading-relaxed text-[color:var(--muted)]">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
