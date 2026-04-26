"use client";

import { motion } from "framer-motion";
import { Coffee, MapPinned, PlugZap, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type MapStatProps = {
  icon: LucideIcon;
  label: string;
  value: number;
  description: string;
};

function MapStat({ icon: Icon, label, value, description }: MapStatProps) {
  return (
    <div className="group relative flex items-center gap-4 rounded-[1.75rem] border border-white/12 bg-white/10 p-4 transition hover:bg-white/15">
      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-400/20 text-emerald-300 transition group-hover:scale-110 group-hover:bg-emerald-400/30">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="flex items-baseline gap-1.5">
          <p className="text-2xl font-black leading-none">{value}</p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-100/60">
            {label}
          </p>
        </div>
        <p className="mt-0.5 text-[10px] font-medium text-emerald-50/40">
          {description}
        </p>
      </div>
    </div>
  );
}

type MapHeroProps = {
  totalSpots: number;
  socketCount: number;
  highRatedCount: number;
};

export function MapHero({ totalSpots, socketCount, highRatedCount }: MapHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-emerald-900/10 bg-emerald-950 px-6 py-10 text-white shadow-[0_35px_100px_-45px_rgba(6,78,59,1)] sm:px-10 lg:px-12 lg:py-14">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]">
        <svg className="h-full w-full" aria-hidden="true">
          <defs>
            <pattern
              id="map-grid-pattern"
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
          <rect width="100%" height="100%" fill="url(#map-grid-pattern)" />
        </svg>
      </div>
      
      <div className="absolute -right-16 -top-16 h-80 w-80 rounded-full bg-emerald-400/25 blur-[100px]" />
      <div className="absolute -bottom-24 left-10 h-96 w-96 rounded-full bg-lime-300/15 blur-[110px]" />
      
      <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-emerald-50 backdrop-blur-md"
          >
            <MapPinned className="h-4 w-4 text-emerald-300" />
            Interactive Map
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black leading-[0.96] tracking-tight sm:text-5xl lg:text-7xl"
          >
            Eksplorasi Spot <br />
            <span className="text-emerald-300">Paling Dekat.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-xl text-base font-medium leading-relaxed text-emerald-50/80 sm:text-lg"
          >
            Lihat persebaran cafe WFC Jogja secara visual. Cek rating, area, dan shortcut 
            detail tanpa harus bolak-balik buka Google Maps.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1"
        >
          <MapStat 
            label="Spot" 
            value={totalSpots} 
            icon={Coffee}
            description="Total pilihan cafe"
          />
          <MapStat 
            label="Colokan" 
            value={socketCount} 
            icon={PlugZap}
            description="Banyak sumber daya"
          />
          <MapStat 
            label="4.5+" 
            value={highRatedCount} 
            icon={Star}
            description="Rating paling solid"
          />
        </motion.div>
      </div>
    </section>
  );
}
