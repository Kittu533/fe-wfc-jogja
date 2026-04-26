"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Archive, CheckCircle2, Image as ImageIcon, Pencil, Plus, Search } from "lucide-react";

import {
  archiveAdminPlace,
  getAdminPlaces,
} from "@/lib/services/admin-places";
import type { AdminImageStatus, AdminPlace, AdminPlaceStatus } from "@/lib/types";

const statusOptions: Array<AdminPlaceStatus | "all"> = [
  "all",
  "draft",
  "published",
  "archived",
];
const imageStatusOptions: Array<AdminImageStatus | "all"> = [
  "all",
  "scraped",
  "uploaded",
  "fallback",
  "missing",
];

export function AdminPlacesClient() {
  const [places, setPlaces] = useState<AdminPlace[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<AdminPlaceStatus | "all">("all");
  const [imageStatus, setImageStatus] = useState<AdminImageStatus | "all">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadPlaces() {
      setLoading(true);
      setError("");

      try {
        const response = await getAdminPlaces({ q, status, imageStatus });

        if (active) {
          setPlaces(response.items);
        }
      } catch {
        if (active) {
          setError("Gagal memuat data admin. Pastikan backend Express jalan dan token admin valid.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadPlaces();

    return () => {
      active = false;
    };
  }, [q, status, imageStatus]);

  const stats = useMemo(() => {
    return {
      total: places.length,
      published: places.filter((place) => place.status === "published").length,
      draft: places.filter((place) => place.status === "draft").length,
      realImage: places.filter((place) => ["scraped", "uploaded"].includes(place.imageStatus)).length,
    };
  }, [places]);

  async function handleArchive(id: string) {
    await archiveAdminPlace(id);
    const response = await getAdminPlaces({ q, status, imageStatus });
    setPlaces(response.items);
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2.5rem] border border-emerald-100/80 bg-emerald-950 p-8 text-white shadow-[0_30px_90px_-55px_rgba(6,78,59,0.9)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
              Admin Console
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              Admin Tempat WFC
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-emerald-50/65">
              Lengkapi data tempat, validasi gambar asli, atur publikasi, dan
              publish hanya spot yang sudah punya cover image real.
            </p>
          </div>
          <Link
            href="/admin/places/new"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-emerald-950 transition hover:bg-emerald-50"
          >
            <Plus className="h-4 w-4" />
            Tambah tempat
          </Link>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-4">
          <StatCard label="Total" value={stats.total} />
          <StatCard label="Published" value={stats.published} />
          <StatCard label="Draft" value={stats.draft} />
          <StatCard label="Real image" value={stats.realImage} />
        </div>
      </section>

      <section className="rounded-[2rem] border border-emerald-100/80 bg-white/80 p-4 backdrop-blur-xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-900/35" />
            <input
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="Cari nama, area, kategori..."
              className="w-full rounded-2xl border border-emerald-100 bg-white py-3 pl-11 pr-4 text-sm font-bold text-emerald-950 outline-none transition focus:border-emerald-500"
            />
          </div>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as AdminPlaceStatus | "all")}
            className="rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-emerald-950 outline-none transition focus:border-emerald-500"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "Semua status" : option}
              </option>
            ))}
          </select>
          <select
            value={imageStatus}
            onChange={(event) => setImageStatus(event.target.value as AdminImageStatus | "all")}
            className="rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-emerald-950 outline-none transition focus:border-emerald-500"
          >
            {imageStatusOptions.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "Semua image" : option}
              </option>
            ))}
          </select>
        </div>
      </section>

      {error ? (
        <div className="rounded-[2rem] border border-red-100 bg-red-50 p-8 text-center text-sm font-black text-red-700">
          {error}
        </div>
      ) : loading ? (
        <div className="rounded-[2rem] bg-white/70 p-8 text-center text-sm font-black text-emerald-900/55">
          Memuat data admin...
        </div>
      ) : places.length === 0 ? (
        <div className="rounded-[2rem] border border-emerald-100 bg-white/80 p-8 text-center">
          <p className="text-lg font-black text-emerald-950">Data kosong untuk filter ini.</p>
          <p className="mt-2 text-sm font-bold text-emerald-900/55">
            Coba ubah keyword, status publikasi, atau status image.
          </p>
        </div>
      ) : (
        <section className="grid gap-4">
          {places.map((place) => (
            <article
              key={place.id}
              className="grid gap-4 rounded-[2rem] border border-emerald-100/80 bg-white/85 p-4 shadow-sm backdrop-blur transition hover:border-emerald-300 lg:grid-cols-[1.2fr_0.8fr_auto]"
            >
              <div className="flex gap-4">
                <div
                  className="h-24 w-24 shrink-0 rounded-[1.5rem] bg-emerald-50 bg-cover bg-center"
                  style={{ backgroundImage: place.coverImage ? `url(${place.coverImage})` : undefined }}
                />
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <StatusBadge status={place.status} />
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-700">
                      <ImageIcon className="h-3 w-3" />
                      {place.imageStatus}
                    </span>
                  </div>
                  <h2 className="truncate text-xl font-black text-emerald-950">
                    {place.name || "Untitled place"}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-sm font-medium text-emerald-900/55">
                    {place.address}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm font-bold text-emerald-950/70 sm:grid-cols-4 lg:grid-cols-2">
                <Metric label="Area" value={place.area || "-"} />
                <Metric label="Kategori" value={place.category} />
                <Metric label="Kopi mulai" value={place.coffeePriceMin ? `Rp${place.coffeePriceMin.toLocaleString("id-ID")}` : "-"} />
                <Metric label="Updated" value={new Date(place.updatedAt).toLocaleDateString("id-ID")} />
              </div>

              <div className="flex items-center gap-2 lg:justify-end">
                <Link
                  href={`/admin/places/${place.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-2 text-sm font-black text-white transition hover:bg-emerald-950"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </Link>
                {place.status !== "archived" && (
                  <button
                    type="button"
                    onClick={() => handleArchive(place.id)}
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800 transition hover:bg-red-50 hover:text-red-700"
                  >
                    <Archive className="h-4 w-4" />
                    Arsip
                  </button>
                )}
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-4">
      <p className="text-3xl font-black">{value}</p>
      <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-100/55">
        {label}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: AdminPlaceStatus }) {
  const active = status === "published";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
        active ? "bg-emerald-700 !text-white" : "bg-amber-50 text-amber-700"
      }`}
    >
      <CheckCircle2 className="h-3 w-3" />
      {status}
    </span>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-900/35">
        {label}
      </p>
      <p className="mt-1 truncate">{value}</p>
    </div>
  );
}
