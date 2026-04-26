import type { Metadata } from "next";
import Link from "next/link";

import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description: "Hubungi WFC Jogja untuk rekomendasi cafe, koreksi data, atau masukan fitur.",
};

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="Kontak"
      title="Hubungi Kami"
      description="Punya rekomendasi spot, koreksi data cafe, atau masukan fitur? Kirimkan detailnya supaya bisa masuk proses kurasi."
      sections={[
        {
          title: "Rekomendasi cafe",
          body: (
            <>
              Kirim nama cafe, area, link Maps, dan alasan kenapa spot itu nyaman buat kerja.{" "}
              <Link
                href="mailto:halo@wfcjogja.local"
                className="font-black text-emerald-700 hover:text-emerald-950"
              >
                Kirim rekomendasi
              </Link>
              .
            </>
          ),
        },
        {
          title: "Format rekomendasi",
          body: (
            <ul className="list-disc space-y-2 pl-5">
              <li>Nama cafe dan area atau kecamatan.</li>
              <li>Link Google Maps jika ada.</li>
              <li>Alasan cafe cocok untuk WFC, misalnya wifi stabil, colokan banyak, atau suasana tenang.</li>
              <li>Catatan tambahan seperti jam ramai, kisaran harga, parkir, musholla, dan menu yang direkomendasikan.</li>
            </ul>
          ),
        },
        {
          title: "Koreksi data",
          body: (
            <div className="space-y-3">
              <p>
                Kalau ada jam buka, alamat, foto, atau fasilitas yang tidak sesuai,
                sertakan nama cafe dan bagian yang perlu diperbarui.
              </p>
              <p>
                Untuk koreksi yang berhubungan dengan foto atau alamat, lampirkan sumber
                pembanding seperti link Maps, website resmi, atau unggahan media sosial cafe.
              </p>
            </div>
          ),
        },
        {
          title: "Kolaborasi",
          body: "Untuk kebutuhan kampus, komunitas, atau brand lokal yang ingin membuat kurasi WFC khusus, jelaskan konteks dan target penggunanya.",
        },
        {
          title: "Estimasi tindak lanjut",
          body: "Masukan akan dipakai sebagai bahan kurasi. Rekomendasi yang datanya lengkap lebih mudah dicek, dinormalisasi, lalu masuk ke dataset. Jika butuh respons cepat, tulis kebutuhan utama dan tenggatnya di awal email.",
        },
        {
          title: "Hal yang belum bisa kami layani",
          body: "Kami belum menerima reservasi cafe, komplain transaksi, atau permintaan yang harus ditangani langsung oleh pemilik cafe. Untuk hal tersebut, hubungi cafe terkait melalui kanal resminya.",
        },
      ]}
    />
  );
}
