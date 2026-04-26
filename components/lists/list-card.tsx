"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Coffee } from "lucide-react";
import type { CuratedList } from "@/lib/types";

export function ListCard({ list, index }: { list: CuratedList; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <Link
        href={`/lists/${list.slug}`}
        className="group relative block overflow-hidden rounded-[2.5rem] border border-emerald-100 bg-white p-8 shadow-sm transition-all hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/5 lg:p-10"
      >
        <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 opacity-[0.03] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
          <Coffee size={240} strokeWidth={1} />
        </div>

        <div className="relative z-10">
          <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-700">
            {list.heroLabel}
          </span>
          
          <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight text-emerald-950 sm:text-4xl">
            {list.title}
          </h2>
          
          <p className="mt-4 text-sm font-medium leading-relaxed text-emerald-900/60 sm:text-base">
            {list.description}
          </p>
          
          <div className="mt-10 flex items-center justify-between border-t border-emerald-50 pt-6">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-white bg-emerald-100 grid place-items-center text-emerald-700 text-[10px] font-bold"
                  >
                    <Coffee size={12} />
                  </div>
                ))}
              </div>
              <span className="text-xs font-bold text-emerald-900/50">
                {list.cafeSlugs.length} spot
              </span>
            </div>
            
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-900 text-white transition-transform duration-300 group-hover:rotate-[-45deg] group-hover:bg-emerald-700">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
