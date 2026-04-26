"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Star, Sparkles, ExternalLink, ShieldCheck, Zap, Wifi } from "lucide-react";

import { ScrollVibe } from "@/components/home/scroll-vibe";
import type { CuratedList } from "@/lib/types";

const premiumImages = [
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=800&q=80",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function PremiumShowcaseSection({
  curatedLists,
}: {
  curatedLists: CuratedList[];
}) {
  return (
    <section className="relative z-10 px-4 py-20 lg:py-24">
      <ScrollVibe className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* Left Side: Header & Info (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              className="space-y-8"
            >
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">
                    Kurasi anti zonk
                  </span>
                </div>
                
                <h2 className="mb-6 text-4xl font-black leading-[1.1] tracking-tighter text-emerald-950 md:text-5xl">
                  List Buat <br />
                  <span className="relative inline-block">
                    <svg className="absolute inset-x-0 -bottom-1 -top-1 h-full w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <motion.path
                        d="M0,15 Q25,19 50,15 T100,16"
                        stroke="#10b981"
                        strokeWidth="10"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.15 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
                      />
                    </svg>
                    <span className="relative italic text-emerald-600">WFC Era.</span>
                  </span>
                </h2>
                
                <p className="text-sm font-medium leading-relaxed text-emerald-900/50">
                  Buat yang males scroll Maps sejam tapi tetap pengen tempat
                  yang nyaman, stabil, dan gak salah vibes.
                </p>
              </div>

              <div className="space-y-4 rounded-3xl border border-emerald-100 bg-emerald-50/30 p-6 backdrop-blur-sm">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-900/40">Standar wajib sebelum gas:</p>
                {[
                  { icon: Wifi, label: "Wifi gak prank", color: "text-blue-600" },
                  { icon: Zap, label: "Colokan gak rebutan", color: "text-amber-600" },
                  { icon: Sparkles, label: "Vibe fokus tapi tetep chill", color: "text-emerald-600" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                    <span className="text-[11px] font-bold text-emerald-950">{item.label}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/lists"
                className="group inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest text-emerald-950 transition-all hover:text-emerald-600"
              >
                Lihat semua kurasi
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </motion.div>
          </div>

          {/* Right Side: Bento Grid (8 cols) */}
          <div className="lg:col-span-8">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-50px", amount: 0.2 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {/* Main Feature - Tall (2 cols span) */}
              {curatedLists[0] && (
                <motion.div variants={itemVariants} className="md:col-span-2">
                  <Link
                    href={`/lists/${curatedLists[0].slug}`}
                    className="group relative flex min-h-[380px] flex-col justify-end overflow-hidden rounded-[2.5rem] border border-emerald-100/50 bg-emerald-900 shadow-xl transition-all duration-700 hover:shadow-emerald-900/20 lg:min-h-[420px]"
                  >
                    <Image
                      src={premiumImages[0]}
                      alt={curatedLists[0].title}
                      fill
                      className="object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/10 to-transparent" />
                    
                    <div className="absolute top-8 left-8">
                      <span className="flex items-center gap-2 rounded-full bg-emerald-500/90 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-white shadow-lg backdrop-blur-md">
                        <Star className="h-3 w-3 fill-current" />
                        Paling aman buat mulai
                      </span>
                    </div>

                    <div className="absolute bottom-8 left-8 right-8 lg:bottom-10 lg:left-10 lg:right-10">
                      <div className="mb-4 flex flex-wrap gap-2">
                        {["Wifi aman", "Vibe fokus"].map(tag => (
                          <span key={tag} className="rounded-lg bg-white/10 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-white backdrop-blur-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-3xl font-black leading-tight tracking-tighter text-white lg:text-5xl">
                        {curatedLists[0].title}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Secondary Items */}
              {curatedLists.slice(1, 3).map((list, idx) => (
                <motion.div 
                  key={list.id}
                  variants={itemVariants}
                >
                  <Link
                    href={`/lists/${list.slug}`}
                    className="group relative flex min-h-[200px] flex-col justify-end overflow-hidden rounded-[2rem] border border-emerald-100/50 bg-emerald-50 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Image
                      src={premiumImages[idx + 1]}
                      alt={list.title}
                      fill
                      className="object-cover opacity-20 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-50 via-transparent to-transparent opacity-80" />
                    
                    <div className="relative z-10 p-6">
                      <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                        <ExternalLink className="h-4 w-4" />
                      </div>
                      <span className="mb-1 block text-[8px] font-black uppercase tracking-[0.3em] text-emerald-500">
                        {list.heroLabel}
                      </span>
                      <h3 className="text-lg font-black leading-tight text-emerald-950">
                        {list.title}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </ScrollVibe>
    </section>
  );
}
