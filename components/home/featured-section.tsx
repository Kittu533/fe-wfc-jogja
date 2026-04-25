"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { CafeCard } from "@/components/cafe-card";
import type { CafeListItem } from "@/lib/types";

export function FeaturedSection({ featuredCafes }: { featuredCafes: CafeListItem[] }) {
  const spotlightCafe = featuredCafes[0];
  const secondaryCafes = featuredCafes.slice(1, 3);

  return (
    <section className="relative overflow-hidden px-4 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">
                Shortlist Pilihan
              </span>
            </div>
            <h2 className="text-4xl font-black leading-[1.1] tracking-tight text-emerald-950 md:text-5xl">
              Gas ke Sini Dulu, <br />
              <span className="text-emerald-600">Biar Gak Bingung.</span>
            </h2>
          </div>

          <Link
            href="/cafes"
            className="group inline-flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-6 py-3.5 text-[10px] font-black uppercase tracking-widest text-emerald-700 shadow-sm transition-all hover:border-emerald-500 hover:bg-emerald-50"
          >
            Lihat Semua Spot
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          {spotlightCafe ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6"
            >
              <Link
                href={`/cafes/${spotlightCafe.slug}`}
                className="group relative block h-full min-h-[380px] overflow-hidden rounded-[2.5rem] bg-emerald-100 shadow-xl shadow-emerald-900/5 transition-all duration-500 hover:shadow-2xl"
              >
                <Image
                  src={spotlightCafe.coverImage}
                  alt={spotlightCafe.name}
                  fill
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent" />

                <div className="absolute left-8 top-8">
                  <span className="rounded-full border border-white/20 bg-white/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-xl backdrop-blur-md">
                    Editor&apos;s Pick
                  </span>
                </div>

                <div className="absolute bottom-10 left-10 right-10">
                  <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                    {spotlightCafe.area} • {spotlightCafe.rating.toFixed(1)} Rating
                  </p>
                  <h3 className="mb-6 text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
                    {spotlightCafe.name}
                  </h3>
                  <div className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md transition-all group-hover:border-transparent group-hover:bg-emerald-600">
                    Cek Detail Spot <span>→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ) : null}

          {secondaryCafes.map((cafe, idx) => (
            <motion.div
              key={cafe.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (idx + 1) }}
              className="lg:col-span-3"
            >
              <CafeCard cafe={cafe} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


