import type { ReactNode } from "react";

import { PageTransition } from "@/components/page-transition";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const GlobalParang = () => (
  <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none overflow-hidden">
    <svg width="100%" height="100%">
      <pattern
        id="global-parang"
        x="0"
        y="0"
        width="120"
        height="120"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(-20)"
      >
        <path
          d="M20 60 C30 30, 50 30, 60 60 S90 90, 100 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <circle cx="20" cy="60" r="3" fill="currentColor" />
        <circle cx="100" cy="60" r="3" fill="currentColor" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#global-parang)" />
    </svg>
  </div>
);

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <GlobalParang />
      <SiteHeader />
      <PageTransition>{children}</PageTransition>
      <SiteFooter />
    </div>
  );
}
