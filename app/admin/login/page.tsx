import type { Metadata } from "next";

import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata: Metadata = {
  title: "Login Admin",
  description: "Masuk ke dashboard admin WFC Jogja.",
};

export default function AdminLoginPage() {
  return <AdminLoginForm />;
}
