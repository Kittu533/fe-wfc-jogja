"use client";

import { motion } from "framer-motion";
import { Bookmark, Sparkles } from "lucide-react";

export function ListsHero() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-emerald-900/10 bg-emerald-950 px-6 py-12 text-white shadow-[0_35px_100px_-45px_rgba(6,78,59,1)] sm:px-10 lg:px-12 lg:py-16">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]">
        <svg className="h-full w-full" aria-hidden="true">
          <defs>
            <pattern
              id="lists-grid-pattern"
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
          <rect width="100%" height="100%" fill="url(#lists-grid-pattern)" />
        </svg>
      </div>
      
      <div className="absolute -right-16 -top-16 h-80 w-80 rounded-full bg-emerald-400/25 blur-[100px]" />
      <div className="absolute -bottom-24 left-10 h-96 w-96 rounded-full bg-lime-300/15 blur-[110px]" />
      
      <div className="relative z-10 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-emerald-50 backdrop-blur-md"
        >
          <Bookmark className="h-4 w-4 text-emerald-300" />
          Editor's Picks
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-black leading-[0.96] tracking-tight sm:text-5xl lg:text-7xl"
        >
          Kurasi Cepat <br />
          <span className="text-emerald-300">Buat Nugas Efektif.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-emerald-50/80 sm:text-xl"
        >
          Alih-alih mulai dari nol, tim kami sudah memilah cafe-cafe terbaik di Jogja 
          berdasarkan kebutuhan spesifik kamu. Langsung gas tanpa overthinking.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute bottom-10 right-10 hidden lg:block"
      >
        <Sparkles className="h-32 w-32 text-emerald-300" />
      </motion.div>
    </section>
  );
}
