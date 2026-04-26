"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, MapPin, Plus, Shield } from "lucide-react";

import { logoutAdmin } from "@/lib/services/admin-places";

const navItems = [
  { href: "/admin/places", label: "Tempat", icon: MapPin },
  { href: "/admin/places/new", label: "Tambah", icon: Plus },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    logoutAdmin();
    router.replace("/admin/login");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-[2rem] border border-emerald-100/80 bg-white/70 p-3 shadow-[0_22px_80px_-55px_rgba(6,78,59,0.8)] backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/admin/places" className="flex items-center gap-3 px-2">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-700 text-white">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-black text-emerald-950">Admin WFC Jogja</p>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700/50">
                Data tempat & publikasi
              </p>
            </div>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black transition ${
                    active
                      ? "bg-emerald-700 !text-white"
                      : "bg-white/70 text-emerald-900 hover:bg-emerald-50"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-950 px-4 py-2 text-sm font-black text-white transition hover:bg-emerald-800"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
