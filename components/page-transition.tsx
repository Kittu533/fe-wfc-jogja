"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  }, [pathname, shouldReduceMotion]);

  const pageMotion = shouldReduceMotion
    ? {
        initial: false,
        animate: { opacity: 1 },
        exit: { opacity: 1 },
      }
    : {
        initial: { opacity: 0, y: 18, scale: 0.992, filter: "blur(8px)" },
        animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
        exit: { opacity: 0, y: -14, scale: 0.996, filter: "blur(6px)" },
      };

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={pathname}
          className="relative z-10"
          transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
          {...pageMotion}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {shouldReduceMotion ? null : (
        <motion.div
          key={`route-progress-${pathname}`}
          aria-hidden
          className="fixed left-0 top-0 z-[70] h-1 w-full origin-left bg-emerald-600"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: [0, 0.72, 1],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </>
  );
}
