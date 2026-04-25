"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Transition, Variants } from "framer-motion";
import { Map, Zap, BookOpen, Coffee, Wind, Battery, Users, Wifi, Wallet, Sparkles, Star, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";

import { SearchBar } from "@/components/search-bar";
import { CafeCard } from "@/components/cafe-card";
import type { CafeListItem, CuratedList } from "@/lib/types";

const quickSearches = [
  { label: "Wifi Anti-Lag", href: "/cafes?q=wifi kencang", icon: Wind },
  { label: "Surga Colokan", href: "/cafes?q=colokan", icon: Battery },
  { label: "Dekat Kampus", href: "/cafes?q=dekat kampus", icon: BookOpen },
  { label: "Spot Meeting", href: "/cafes?q=meeting room", icon: Users },
];

const springTransition: Transition = { type: "spring", stiffness: 100, damping: 20 };

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
};

const BackgroundBlobs = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-emerald-100/40 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-blue-50/50 rounded-full blur-[100px]" />
    <div className="absolute bottom-[-5%] left-[10%] w-[30%] h-[30%] bg-emerald-50/60 rounded-full blur-[100px]" />
  </div>
);

const SkylineSubtle = () => (
  <div className="absolute bottom-0 left-0 right-0 h-32 opacity-[0.06] pointer-events-none text-emerald-600">
    <svg viewBox="0 0 1440 220" className="h-full w-full fill-current" preserveAspectRatio="none">
      <path d="M0 190 L110 190 L132 164 L158 190 L236 190 L270 152 L304 190 L406 190 L446 140 L486 190 L612 190 L648 118 L690 190 L766 190 L794 160 L828 190 L960 190 L996 146 L1028 190 L1142 190 L1180 132 L1220 190 L1326 190 L1360 162 L1396 190 L1440 190 L1440 220 L0 220 Z" />
    </svg>
  </div>
);

export function HomePageClient({
  featuredCafes,
  curatedLists,
  totalCafes,
}: {
  featuredCafes: CafeListItem[];
  curatedLists: CuratedList[];
  totalCafes: number;
}) {
  return (
    <div className="relative overflow-hidden bg-[#fafaf9]">
      <BackgroundBlobs />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-24 lg:pt-28 lg:pb-40 px-4">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col items-center text-center"
          >
            <motion.div variants={itemVariants} className="mb-8 flex flex-col items-center gap-4">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                <Zap className="w-3 h-3" />
                Anti Zonk Era: Guide WFC Jogja Ter-Ok
              </span>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold text-emerald-900/40 uppercase tracking-widest">
                  {totalCafes} Spot Terverifikasi
                </span>
              </div>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-8 text-emerald-950"
            >
              Nugas Jadi <br />
              <span className="text-emerald-600 italic">Sat-set</span> & <span className="text-emerald-600">Anti-Drama.</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="max-w-2xl text-lg md:text-xl text-emerald-900/60 font-medium leading-relaxed mb-12"
            >
              Gak usah gambling cari cafe. Kita udah kurasi spot WFC Jogja yang wifi-nya kenceng parah, colokan melimpah, dan kursi yang ramah buat pinggang lo.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="w-full max-w-2xl bg-white p-2.5 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(6,78,59,0.12)] border border-emerald-50 mb-8"
            >
              <form action="/cafes">
                <SearchBar placeholder="Lagi pengen gas area mana?" />
              </form>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
              {quickSearches.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-emerald-100/50 hover:border-emerald-500 hover:bg-emerald-50 transition-all shadow-sm"
                >
                  <item.icon className="w-4 h-4 text-emerald-300 group-hover:text-emerald-500 transition-colors" />
                  <span className="text-xs font-bold text-emerald-900/70 group-hover:text-emerald-700 uppercase tracking-wider">{item.label}</span>
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>
        <SkylineSubtle />
      </section>

      {/* 2. FEATURED SECTION - Spotlight Bento Grid */}
      <section className="py-28 bg-white px-4 relative overflow-hidden border-y border-emerald-100/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Shortlist Pilihan</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-emerald-950 leading-[1.1] tracking-tight">
                Gas ke Sini Dulu, <br />
                <span className="text-emerald-600">Biar Gak Bingung.</span>
              </h2>
            </div>
            <Link 
              href="/cafes" 
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 font-black text-xs uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
            >
              Lihat Semua Spot
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {featuredCafes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7"
              >
                <Link href={`/cafes/${featuredCafes[0].slug}`} className="group relative block h-full min-h-[460px] overflow-hidden rounded-[2.5rem] bg-emerald-100 shadow-xl shadow-emerald-900/5 transition-all duration-500 hover:shadow-2xl">
                  <Image 
                    src={featuredCafes[0].coverImage} 
                    alt={featuredCafes[0].name}
                    fill
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent" />
                  
                  <div className="absolute top-8 left-8">
                    <span className="backdrop-blur-md bg-white/20 border border-white/20 px-4 py-1.5 rounded-full text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
                      Editor&apos;s Pick
                    </span>
                  </div>

                  <div className="absolute bottom-10 left-10 right-10">
                    <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                      {featuredCafes[0].area} • Rating {featuredCafes[0].rating.toFixed(1)}
                    </p>
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                      {featuredCafes[0].name}
                    </h3>
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-xs uppercase tracking-widest group-hover:bg-emerald-600 group-hover:border-transparent transition-all">
                      Cek Detail Spot <span>→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            <div className="lg:col-span-5 flex flex-col gap-8">
              {featuredCafes.slice(1, 3).map((cafe, idx) => (
                <motion.div
                  key={cafe.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex-1"
                >
                  <CafeCard cafe={cafe} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. DISCOVERY BOARD - Intent Mission Cards */}
      <section className="py-28 px-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Mood Tracker</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-emerald-950 mb-6 tracking-tight">Lo Lagi Mau Ngapain?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "Pejuang Skripsi", 
                href: "/lists/cafe-buat-skripsi-seharian", 
                icon: Coffee, 
                img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80",
                highlight: true 
              },
              { 
                title: "Cek Map Terdekat", 
                href: "/map", 
                icon: Map, 
                desc: "Mager jauh? Cari yang sat-set deket lo.",
                color: "bg-emerald-50 text-emerald-600" 
              },
              { 
                title: "Wifi Anti-Lag", 
                href: "/cafes?q=wifi kencang", 
                icon: Wifi, 
                desc: "Speed monster buat upload atau meeting.",
                color: "bg-blue-50 text-blue-600" 
              },
              { 
                title: "Dompet Aman Era", 
                href: "/cafes?price=1", 
                icon: Wallet, 
                desc: "Nugas tetep jalan, saldo tetep tenang.",
                color: "bg-amber-50 text-amber-600" 
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`group relative flex flex-col justify-end overflow-hidden rounded-[2.5rem] p-8 min-h-[340px] transition-all duration-500 hover:-translate-y-2 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] border border-emerald-100/50 ${item.highlight ? 'bg-emerald-600 text-white border-transparent' : 'bg-white text-emerald-950'}`}
                >
                  {item.img && (
                    <>
                      <Image src={item.img} alt={item.title} fill className="absolute inset-0 object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-800/20 to-transparent" />
                    </>
                  )}
                  
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${item.color || 'bg-white/20 backdrop-blur-md text-white'}`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black mb-2 leading-tight tracking-tight">{item.title}</h3>
                    {item.desc && <p className="text-emerald-900/60 text-sm font-medium leading-relaxed mb-6">{item.desc}</p>}
                    <div className={`inline-flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${item.highlight ? 'text-emerald-300' : 'text-emerald-600'}`}>
                      Explore <span>→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PREMIUM SHOWCASE - Editorial Style */}
      <section className="pb-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="bg-emerald-50/50 rounded-[3rem] overflow-hidden relative border border-emerald-100 shadow-xl shadow-emerald-900/5">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.12),transparent_50%)] pointer-events-none" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-0">
              <div className="p-10 md:p-16 lg:p-20 flex flex-col">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8 w-fit">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  Premium Curation
                </div>
                
                <h2 className="text-5xl md:text-7xl font-black text-emerald-950 mb-8 leading-[0.95] tracking-tighter">
                  The Jogja <br />
                  <span className="text-emerald-600">Shortlist.</span>
                </h2>
                
                <p className="text-emerald-900/70 text-lg font-medium leading-relaxed mb-12 max-w-md">
                  Gak semua cafe enak buat kerja. Kita kurasi manual satu-satu biar lo gak dapet zonk pas udah sampe lokasi.
                </p>

                <div className="space-y-4 mb-16">
                  {["Verified Wifi & Colokan", "Cek Kenyamanan Kursi", "Jujur & Independen"].map((text) => (
                    <div key={text} className="flex items-center gap-4 text-emerald-800">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span className="font-bold text-xs uppercase tracking-widest">{text}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/lists"
                  className="group inline-flex items-center gap-4 px-10 py-5 rounded-full bg-emerald-600 text-white font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all w-fit shadow-lg shadow-emerald-600/20"
                >
                  Cek Semua Kurasi
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="bg-white/40 backdrop-blur-sm border-l border-emerald-100/50 p-6 md:p-12 lg:p-16 grid gap-6 content-center">
                {curatedLists.slice(0, 3).map((list, idx) => (
                  <motion.div
                    key={list.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                  >
                    <Link
                      href={`/lists/${list.slug}`}
                      className="group relative flex flex-col justify-end p-8 rounded-[2.5rem] min-h-[140px] overflow-hidden transition-all bg-white border border-emerald-100/50 hover:border-emerald-400 hover:shadow-lg"
                    >
                      <Image 
                        src={idx === 0 ? "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" : 
                             idx === 1 ? "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80" : 
                             "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=800&q=80"}
                        alt={list.title}
                        fill
                        className="absolute inset-0 object-cover opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500"
                      />
                      
                      <div className="relative z-10">
                         <div className="flex items-center justify-between mb-2">
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-500">
                              {list.heroLabel}
                            </span>
                            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                               <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:text-white" />
                            </div>
                         </div>
                         <h3 className="text-2xl font-black text-emerald-950 leading-tight tracking-tight">{list.title}</h3>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
