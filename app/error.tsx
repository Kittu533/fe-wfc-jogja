"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="section-shell rounded-[2rem] p-8 text-center">
        <p className="eyebrow mb-3">Ada kendala</p>
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[color:var(--foreground)]">
          Terjadi gangguan saat memuat halaman
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-[color:var(--muted)]">
          Data atau tampilan belum bisa diproses dengan normal. Kamu bisa coba muat ulang halaman, lalu lanjutkan pencarian cafe.
        </p>
        {error.message ? (
          <p className="mx-auto mt-4 max-w-xl rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm text-[color:var(--muted)]">
            Detail: {error.message}
          </p>
        ) : null}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-strong)]"
          >
            Coba muat ulang
          </button>
        </div>
      </div>
    </div>
  );
}
