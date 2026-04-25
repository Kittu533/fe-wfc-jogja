import Link from "next/link";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/cafes", label: "Cari Cafe" },
  { href: "/map", label: "Peta" },
  { href: "/lists", label: "Kurasi" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-50 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-xs font-black text-white shadow-lg shadow-emerald-200 group-hover:scale-105 transition-transform">
            WFC
          </div>
          <div>
            <p className="text-base font-black tracking-tight text-emerald-950">
              WFC Jogja
            </p>
            <p className="text-[10px] font-bold text-emerald-600/60 uppercase tracking-widest">
              Verified Cafe Guide
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-700 border border-emerald-100 uppercase tracking-widest">
            Discovery Mode
          </div>
        </div>
      </div>
    </header>
  );
}
