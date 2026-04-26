"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";

import { loginAdmin } from "@/lib/services/admin-places";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@wfc.test");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginAdmin({ email, password });
      router.replace("/admin/places");
    } catch {
      setError("Login gagal. Cek email/password atau koneksi backend.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-6xl place-items-center px-4 py-12">
      <section className="grid w-full overflow-hidden rounded-[2.5rem] border border-emerald-100 bg-white/80 shadow-[0_28px_90px_-60px_rgba(6,78,59,0.9)] backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-emerald-950 p-8 text-white sm:p-10">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-400/20">
            <LockKeyhole className="h-7 w-7 text-emerald-200" />
          </div>
          <p className="mt-10 text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
            Backend-ready JWT
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
            Masuk Admin
          </h1>
          <p className="mt-4 max-w-md text-sm font-medium leading-relaxed text-emerald-50/65">
            Dashboard ini terhubung ke Express API. Setelah login, token JWT
            dipakai untuk semua request admin.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-8 sm:p-10">
          <div>
            <label htmlFor="admin-email" className="text-sm font-black text-emerald-950">
              Email admin
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-bold text-emerald-950 outline-none transition focus:border-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="text-sm font-black text-emerald-950">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-bold text-emerald-950 outline-none transition focus:border-emerald-500"
              placeholder="Password admin"
            />
          </div>

          {error && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-950 disabled:cursor-wait disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Masuk dashboard"}
          </button>
        </form>
      </section>
    </div>
  );
}
