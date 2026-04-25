import { EmptyState } from "@/components/empty-state";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <EmptyState
        title="Halaman yang kamu cari tidak ketemu"
        description="Coba kembali ke halaman pencarian atau buka daftar kurasi untuk menemukan cafe yang sesuai kebutuhanmu."
        actionHref="/cafes"
        actionLabel="Kembali ke daftar cafe"
      />
    </div>
  );
}
