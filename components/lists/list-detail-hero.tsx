"use client";

import { motion } from "framer-motion";
import { Bookmark, Coffee, Sparkles } from "lucide-react";
import type { CuratedList } from "@/lib/types";

export function ListDetailHero({ list }: { list: CuratedList }) {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-emerald-900/10 bg-emerald-950 px-6 py-12 text-white shadow-[0_35px_100px_-45px_rgba(6,78,59,1)] sm:px-10 lg:px-12 lg:py-16">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]">
        <svg className="h-full w-full" aria-hidden="true">
          <defs>
            <pattern
              id="list-detail-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 40V.5H40"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#list-detail-grid)" />
        </svg>
      </div>
      
      <div className="absolute -right-16 -top-16 h-80 w-80 rounded-full bg-emerald-400/25 blur-[100px]" />
      <div className="absolute -bottom-24 left-10 h-96 w-96 rounded-full bg-lime-300/15 blur-[110px]" />
      
      <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-emerald-50 backdrop-blur-md"
          >
            <Bookmark className="h-4 w-4 text-emerald-300" />
            {list.heroLabel}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-black leading-[0.96] tracking-tight sm:text-5xl lg:text-7xl"
          >
            {list.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-emerald-50/80 sm:text-xl"
          >
            {list.description}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative hidden lg:block"
        >
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400/20 text-emerald-300">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-emerald-100/60">Curator Note</p>
                <p className="text-lg font-bold text-white">Why this list exists</p>
              </div>
            </div>
            <p className="text-sm font-medium leading-relaxed text-emerald-50/70 italic">
              &ldquo;{list.summary}&rdquo;
            </p>
            <div className="mt-8 flex items-center gap-2">
              <div className="flex -space-x-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-emerald-950 bg-emerald-800 grid place-items-center">
                    <Coffee size={14} className="text-emerald-300" />
                  </div>
                ))}
              </div>
              <p className="ml-2 text-xs font-black uppercase tracking-widest text-emerald-300">
                Verified Spots
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
