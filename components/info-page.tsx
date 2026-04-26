import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

type InfoPageSection = {
  title: string;
  body: ReactNode;
};

type InfoPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  sections: InfoPageSection[];
  cta?: {
    label: string;
    href: string;
  };
};

export function InfoPage({
  eyebrow,
  title,
  description,
  sections,
  cta,
}: InfoPageProps) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2.5rem] bg-emerald-950 px-6 py-12 text-white shadow-[0_35px_100px_-45px_rgba(6,78,59,1)] sm:px-10 lg:px-12">
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-300">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-emerald-50/75 sm:text-lg">
          {description}
        </p>
        {cta ? (
          <Link
            href={cta.href}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-emerald-950 transition hover:bg-emerald-50"
          >
            {cta.label}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        ) : null}
      </section>

      <section className="mt-8 grid gap-4">
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-[2rem] border border-emerald-100/70 bg-white/85 p-6 shadow-sm backdrop-blur sm:p-8"
          >
            <div className="flex gap-4">
              <div className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-emerald-950">
                  {section.title}
                </h2>
                <div className="mt-3 text-sm font-medium leading-relaxed text-emerald-900/65 sm:text-base">
                  {section.body}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
