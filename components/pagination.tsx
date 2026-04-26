import Link from "next/link";
import type { ReactNode } from "react";

type SearchParamValue = string | string[] | undefined;

type PaginationProps = {
  basePath: string;
  page: number;
  totalPages: number;
  searchParams?: Record<string, SearchParamValue>;
};

export function Pagination({
  basePath,
  page,
  totalPages,
  searchParams = {},
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getVisiblePages(page, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      <PaginationLink
        disabled={page <= 1}
        href={buildPageHref(basePath, searchParams, page - 1)}
      >
        Sebelumnya
      </PaginationLink>

      {pages.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="grid h-10 min-w-10 place-items-center px-2 text-sm font-black text-emerald-900/40"
          >
            ...
          </span>
        ) : (
          <PaginationLink
            key={item}
            active={item === page}
            href={buildPageHref(basePath, searchParams, item)}
          >
            {item}
          </PaginationLink>
        ),
      )}

      <PaginationLink
        disabled={page >= totalPages}
        href={buildPageHref(basePath, searchParams, page + 1)}
      >
        Berikutnya
      </PaginationLink>
    </nav>
  );
}

function PaginationLink({
  active = false,
  disabled = false,
  href,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  href: string;
  children: ReactNode;
}) {
  const className = [
    "inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-4 text-sm font-black transition",
    active
      ? "border-emerald-700 bg-emerald-700 !text-white"
      : "border-emerald-100 bg-white text-emerald-900 hover:border-emerald-300 hover:bg-emerald-50",
    disabled ? "pointer-events-none opacity-40" : "",
  ].join(" ");

  if (disabled) {
    return <span className={className}>{children}</span>;
  }

  return (
    <Link className={className} href={href} aria-current={active ? "page" : undefined}>
      {children}
    </Link>
  );
}

function buildPageHref(
  basePath: string,
  searchParams: Record<string, SearchParamValue>,
  page: number,
) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    const current = Array.isArray(value) ? value[0] : value;

    if (!current) return;
    params.set(key, current);
  });

  if (page <= 1) {
    params.delete("page");
  } else {
    params.set("page", String(page));
  }

  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

function getVisiblePages(page: number, totalPages: number) {
  const pages: Array<number | "ellipsis"> = [];
  const windowStart = Math.max(2, page - 1);
  const windowEnd = Math.min(totalPages - 1, page + 1);

  pages.push(1);

  if (windowStart > 2) {
    pages.push("ellipsis");
  }

  for (let current = windowStart; current <= windowEnd; current += 1) {
    pages.push(current);
  }

  if (windowEnd < totalPages - 1) {
    pages.push("ellipsis");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}
