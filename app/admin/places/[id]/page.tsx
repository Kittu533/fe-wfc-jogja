import type { Metadata } from "next";

import { AdminAuthGuard } from "@/components/admin/admin-auth-guard";
import { AdminPlaceForm } from "@/components/admin/admin-place-form";
import { AdminShell } from "@/components/admin/admin-shell";

export const dynamic = "force-dynamic";

type AdminPlaceEditPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Edit Tempat",
  description: "Edit data tempat WFC Jogja.",
};

export default async function AdminPlaceEditPage({ params }: AdminPlaceEditPageProps) {
  const { id } = await params;

  return (
    <AdminAuthGuard>
      <AdminShell>
        <AdminPlaceForm placeId={id} />
      </AdminShell>
    </AdminAuthGuard>
  );
}
