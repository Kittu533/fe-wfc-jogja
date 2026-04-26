"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type ScrollVibeProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
};

export function ScrollVibe({ children, className, ...props }: ScrollVibeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 54, scale: 0.97, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.22, margin: "-8% 0px -8% 0px" }}
      transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
