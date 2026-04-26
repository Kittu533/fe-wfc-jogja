"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Coffee, Map, Sparkles, Wallet, Wifi, ArrowUpRight } from "lucide-react";

import { ScrollVibe } from "@/components/home/scroll-vibe";

const discoveryItems = [
  {
    title: "Pejuang Skripsi",
    href: "/lists/cafe-buat-skripsi-seharian",
    icon: Coffee,
    img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80",
    color: "from-emerald-600/90 to-emerald-900/95",
    badge: "Mode Serius",
  },
  {
    title: "Map Anti Muter",
    href: "/map",
    icon: Map,
    img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80",
    color: "from-blue-600/90 to-blue-900/95",
    desc: "Buka peta, pilih yang deket, gas tanpa drama parkir.",
  },
  {
    title: "Wifi Gak Bikin Emosi",
    href: "/cafes?q=wifi kencang",
    icon: Wifi,
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    color: "from-purple-600/90 to-purple-900/95",
    desc: "Buat Zoom, upload tugas, sampai deploy tengah malam.",
  },
  {
    title: "Dompet Tetap Waras",
    href: "/cafes?price=1",
    icon: Wallet,
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    color: "from-amber-500/90 to-amber-800/95",
    desc: "Tetap produktif tanpa checkout menu yang bikin nyesel.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function DiscoveryBoardSection() {
  return (
    <section className="relative z-10 overflow-hidden px-4 py-24 lg:py-32">
      <ScrollVibe className="relative z-10 mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          className="mb-20 text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-emerald-200" />
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">
                Pilih sesuai mood
              </span>
            </div>
            <div className="h-px w-12 bg-emerald-200" />
          </div>
          <h2 className="text-5xl font-black leading-tight tracking-tighter text-emerald-950 md:text-7xl">
            Hari Ini Mau <br />
            <span className="relative inline-block">
              <span className="absolute inset-x-[-10px] bottom-2 top-6 -rotate-1 bg-amber-300/60 transition-transform group-hover:rotate-1" />
              <span className="relative italic text-emerald-900">Ngegas Apa?</span>
            </span>
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px", amount: 0.18 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {discoveryItems.map((item) => (
            <motion.div key={item.title} variants={itemVariants}>
              <Link
                href={item.href}
                className="group relative flex min-h-[420px] flex-col overflow-hidden rounded-[3rem] bg-emerald-900 p-8 shadow-2xl transition-all duration-700 hover:-translate-y-3"
              >
                {/* Image Background */}
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="absolute inset-0 object-cover opacity-50 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-30"
                />
                
                {/* Dynamic Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${item.color} mix-blend-multiply opacity-60 transition-opacity group-hover:opacity-80`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="relative z-10 flex h-full flex-col">
                  {item.badge && (
                    <div className="mb-auto self-start">
                      <span className="rounded-full bg-white/20 px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-white backdrop-blur-md">
                        {item.badge}
                      </span>
                    </div>
                  )}

                  <div className="mt-auto">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-md transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-white group-hover:text-emerald-900">
                      <item.icon className="h-8 w-8" />
                    </div>
                    
                    <h3 className="mb-3 text-3xl font-black leading-tight tracking-tight text-white">
                      {item.title}
                    </h3>
                    
                    {item.desc && (
                      <p className="mb-6 text-sm font-medium leading-relaxed text-white/70">
                        {item.desc}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60 transition-colors group-hover:text-white">
                        Langsung cek <span>→</span>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white opacity-0 transition-all duration-500 group-hover:opacity-100">
                        <ArrowUpRight className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </ScrollVibe>
    </section>
  );
}
