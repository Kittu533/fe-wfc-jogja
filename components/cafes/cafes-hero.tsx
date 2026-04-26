"use client";

import Image from "next/image";
import { Coffee, MapPin, Sparkles, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type StatPillProps = {
  label: string;
  value: string;
  icon: LucideIcon;
  description: string;
};

function StatPill({ label, value, icon: Icon, description }: StatPillProps) {
  return (
    <div className="group relative flex items-center gap-4 rounded-[1.75rem] border border-white/12 bg-white/10 p-4 transition hover:bg-white/15 lg:p-5">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400/20 text-emerald-300 transition group-hover:scale-110 group-hover:bg-emerald-400/30">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <div className="flex items-baseline gap-1.5">
          <p className="text-2xl font-black leading-none lg:text-3xl">{value}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-100/60">
            {label}
          </p>
        </div>
        <p className="mt-1 text-xs font-medium text-emerald-50/50">
          {description}
        </p>
      </div>
    </div>
  );
}

type CafesHeroProps = {
  totalResults: number;
  areaCount: number;
  highRatedCount: number;
};

export function CafesHero({ totalResults, areaCount, highRatedCount }: CafesHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-emerald-900/10 bg-emerald-950 px-6 py-10 text-white shadow-[0_35px_100px_-45px_rgba(6,78,59,1)] sm:px-10 lg:px-12 lg:py-14">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
          alt="Cafe background"
          fill
          className="object-cover opacity-40 mix-blend-overlay brightness-75 transition-transform duration-[20s] hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950 via-emerald-950/80 to-emerald-900/40" />
        <div 
          className="absolute inset-0 opacity-[0.15] mix-blend-soft-light pointer-events-none" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
          }}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]">
        <svg className="h-full w-full" aria-hidden="true">
          <defs>
            <pattern
              id="grid-pattern"
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
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
      
      <div className="absolute -right-16 -top-16 h-80 w-80 rounded-full bg-emerald-400/25 blur-[100px]" />
      <div className="absolute -bottom-24 left-10 h-96 w-96 rounded-full bg-lime-300/15 blur-[110px]" />
      
      <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-emerald-50 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-emerald-300" />
            Spot Discovery
          </div>
          <h1 className="text-4xl font-black leading-[0.96] tracking-tight sm:text-5xl lg:text-7xl">
            Cari spot WFC <br />
            <span className="text-emerald-300">anti-boncos.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-emerald-50/80 sm:text-lg">
            Filter cafe Jogja berdasarkan area, budget, colokan, sampai parkir. 
            Cocok buat skripsi, remote shift, atau sekadar cari mood baru.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <StatPill 
            label="Cafe ketemu" 
            value={`${totalResults}`} 
            icon={Coffee}
            description="Total pilihan spot"
          />
          <StatPill 
            label="Area aktif" 
            value={`${areaCount}`} 
            icon={MapPin}
            description="Tersebar di Jogja"
          />
          <StatPill 
            label="Rating 4.5+" 
            value={`${highRatedCount}`} 
            icon={Star}
            description="Pilihan paling solid"
          />
        </div>
      </div>
    </section>
  );
}
