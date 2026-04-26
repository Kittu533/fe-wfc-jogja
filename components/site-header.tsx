"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/cafes", label: "Cari Cafe" },
  { href: "/map", label: "Peta" },
  { href: "/lists", label: "Kurasi" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-transparent px-3 pt-3 sm:px-5">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-3 rounded-[1.75rem] border border-white/60 bg-white/42 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_22px_70px_-48px_rgba(6,78,59,0.8)] backdrop-blur-2xl md:grid-cols-[1fr_auto_1fr] md:px-4">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3 justify-self-start"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative h-14 w-14 shrink-0 transition-transform group-hover:scale-105 sm:h-16 sm:w-16">
            <Image
              src="/logo-wfc.png"
              alt="WFC Jogja Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-black tracking-tight text-emerald-950">
              WFC Jogja
            </p>
            <p className="hidden truncate text-[10px] font-black uppercase tracking-[0.16em] text-emerald-700/55 sm:block">
              Jogja Cafe Radar
            </p>
          </div>
        </Link>

        <nav className="hidden items-center justify-center gap-1 rounded-full border border-white/60 bg-white/45 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_18px_50px_-34px_rgba(6,78,59,0.7)] backdrop-blur-2xl md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              active={isActivePath(pathname, item.href)}
            />
          ))}
        </nav>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center justify-self-end rounded-full border border-white/60 bg-white/45 text-emerald-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl transition hover:bg-white/70 md:hidden"
        >
          <span className="sr-only">Toggle navigation</span>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="hidden justify-self-end md:block">
          <Link
            href="/cafes"
            className="inline-flex rounded-full border border-emerald-700/10 bg-emerald-700 px-4 py-2 text-sm font-black !text-white shadow-[0_14px_34px_-24px_rgba(6,78,59,0.9)] transition hover:bg-emerald-950"
          >
            Mulai cari
          </Link>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`md:hidden ${isOpen ? "block" : "hidden"}`}
      >
        <div className="mx-auto mt-2 max-w-7xl rounded-[1.5rem] border border-white/60 bg-white/55 p-2 shadow-[0_24px_70px_-42px_rgba(6,78,59,0.75)] backdrop-blur-2xl">
          <nav className="grid gap-2">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-[1.35rem] px-4 py-3 text-sm font-black transition ${
                    active
                      ? "bg-emerald-700 !text-white shadow-sm"
                      : "text-emerald-950 hover:bg-emerald-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  active,
  item,
}: {
  active: boolean;
  item: (typeof navItems)[number];
}) {
  return (
    <Link
      href={item.href}
      className={`rounded-full px-4 py-2 text-sm font-black transition ${
        active
          ? "bg-emerald-700 !text-white shadow-sm"
          : "text-emerald-950/65 hover:bg-white/60 hover:text-emerald-800"
      }`}
    >
      {item.label}
    </Link>
  );
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
