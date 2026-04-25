"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

import { SearchBar } from "@/components/search-bar";
import {
  containerVariants,
  itemVariants,
  quickSearches,
} from "@/components/home/home-shared";

export function HeroSection({ totalCafes }: { totalCafes: number }) {
  return (
    <section className="relative px-4 pb-24 pt-16 lg:px-4 lg:pb-40 lg:pt-28">
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={itemVariants} className="mb-8 flex flex-col items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 shadow-sm">
              <Zap className="h-3 w-3" />
              Anti Zonk Era: Guide WFC Jogja Ter-Ok
            </span>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-900/40">
                {totalCafes} Spot Terverifikasi
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mb-8 text-5xl font-black leading-[1.2] tracking-tight text-emerald-950 md:text-7xl lg:text-8xl"
          >
            Nugas Jadi <br />
            <motion.span 
              whileInView={{ scale: [1, 1.05, 1] }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="relative inline-block px-4"
            >
              <svg className="absolute inset-x-0 -bottom-2 -top-1 h-full w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                <motion.path
                  d="M0,14 Q25,18 50,14 T100,15"
                  stroke="#fcd34d"
                  strokeWidth="14"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.5 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                />
                <motion.path
                  d="M5,16 Q30,19 60,16 T95,17"
                  stroke="#fbbf24"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                />
              </svg>
              <span className="relative italic text-emerald-700">Sat-set</span>
            </motion.span>{" "}
            &{" "}
            <motion.span 
              whileInView={{ scale: [1, 1.05, 1] }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="relative inline-block px-4"
            >
              <svg className="absolute inset-x-0 -bottom-2 -top-1 h-full w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                <motion.path
                  d="M2,15 Q30,12 60,15 T98,14"
                  stroke="#a7f3d0"
                  strokeWidth="16"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
                />
                <motion.path
                  d="M10,14 Q40,11 70,14 T90,13"
                  stroke="#34d399"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.2 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.9 }}
                />
              </svg>
              <span className="relative text-emerald-600">Anti-Drama.</span>
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mb-12 max-w-2xl text-lg font-medium leading-relaxed text-emerald-900/60 md:text-xl"
          >
            Gak usah gambling cari cafe. Kita udah kurasi spot WFC Jogja yang wifi-nya
            kenceng parah, colokan melimpah, dan kursi yang ramah buat pinggang lo.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mb-8 w-full max-w-2xl rounded-[3rem] border border-emerald-50 bg-white p-2.5 shadow-[0_30px_60px_-15px_rgba(6,78,59,0.12)]"
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
                className="group flex items-center gap-2 rounded-2xl border border-emerald-100/50 bg-white px-5 py-2.5 shadow-sm transition-all hover:border-emerald-500 hover:bg-emerald-50"
              >
                <item.icon className="h-4 w-4 text-emerald-300 transition-colors group-hover:text-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900/70 group-hover:text-emerald-700">
                  {item.label}
                </span>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
