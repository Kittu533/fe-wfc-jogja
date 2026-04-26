import type { Metadata } from "next";

import { AdminAuthGuard } from "@/components/admin/admin-auth-guard";
import { AdminPlacesClient } from "@/components/admin/admin-places-client";
import { AdminShell } from "@/components/admin/admin-shell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Tempat",
  description: "Kelola data tempat WFC Jogja.",
};

export default async function AdminPlacesPage() {
  return (
    <AdminAuthGuard>
      <AdminShell>
        <AdminPlacesClient />
      </AdminShell>
    </AdminAuthGuard>
  );
}
