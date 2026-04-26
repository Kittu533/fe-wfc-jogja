"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { getAdminToken } from "@/lib/services/admin-places";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const allowed = Boolean(getAdminToken());

  useEffect(() => {
    if (!allowed) {
      router.replace("/admin/login");
    }
  }, [allowed, router]);

  if (!allowed) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-7xl items-center justify-center px-4 text-sm font-black text-emerald-900/55">
        Mengecek akses admin...
      </div>
    );
  }

  return <>{children}</>;
}
