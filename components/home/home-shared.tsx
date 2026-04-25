"use client";

import type { Transition, Variants } from "framer-motion";
import { Battery, BookOpen, Users, Wind } from "lucide-react";

export const quickSearches = [
  { label: "Wifi Anti-Lag", href: "/cafes?q=wifi kencang", icon: Wind },
  { label: "Surga Colokan", href: "/cafes?q=colokan", icon: Battery },
  { label: "Dekat Kampus", href: "/cafes?q=dekat kampus", icon: BookOpen },
  { label: "Spot Meeting", href: "/cafes?q=meeting room", icon: Users },
];

export const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
};

export function BackgroundBlobs() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute left-[-5%] top-[-10%] h-[40%] w-[40%] animate-pulse rounded-full bg-emerald-100/40 blur-[120px]" />
      <div className="absolute right-[-10%] top-[20%] h-[35%] w-[35%] rounded-full bg-blue-50/50 blur-[100px]" />
      <div className="absolute bottom-[-5%] left-[10%] h-[30%] w-[30%] rounded-full bg-emerald-50/60 blur-[100px]" />
    </div>
  );
}

export function SkylineSubtle() {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 text-emerald-600 opacity-[0.06]">
      <svg
        viewBox="0 0 1440 220"
        className="h-full w-full fill-current"
        preserveAspectRatio="none"
      >
        <path d="M0 190 L110 190 L132 164 L158 190 L236 190 L270 152 L304 190 L406 190 L446 140 L486 190 L612 190 L648 118 L690 190 L766 190 L794 160 L828 190 L960 190 L996 146 L1028 190 L1142 190 L1180 132 L1220 190 L1326 190 L1360 162 L1396 190 L1440 190 L1440 220 L0 220 Z" />
      </svg>
    </div>
  );
}
