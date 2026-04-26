import type { Metadata } from "next";

import { AdminAuthGuard } from "@/components/admin/admin-auth-guard";
import { AdminPlaceForm } from "@/components/admin/admin-place-form";
import { AdminShell } from "@/components/admin/admin-shell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tambah Tempat",
  description: "Tambah data tempat WFC Jogja.",
};

export default function AdminPlaceNewPage() {
  return (
    <AdminAuthGuard>
      <AdminShell>
        <AdminPlaceForm />
      </AdminShell>
    </AdminAuthGuard>
  );
}
