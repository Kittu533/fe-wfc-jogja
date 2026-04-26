import type { Metadata } from "next";

import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Tentang misi WFC Jogja dalam membantu pengguna memilih cafe kerja di Jogja.",
};

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="Tentang WFC Jogja"
      title="Tentang Kami"
      description="WFC Jogja membantu kamu menemukan cafe yang lebih masuk akal buat kerja, nugas, meeting kecil, atau sekadar stay produktif di Jogja."
      cta={{ label: "Mulai cari cafe", href: "/cafes" }}
      sections={[
        {
          title: "Kenapa platform ini dibuat",
          body: (
            <div className="space-y-3">
              <p>
                Tidak semua cafe yang bagus buat nongkrong otomatis nyaman buat kerja.
                WFC Jogja dibuat sebagai alat bantu shortlist: pengguna bisa melihat area,
                budget, fasilitas dasar, dan sinyal kenyamanan sebelum memutuskan datang.
              </p>
              <p>
                Fokus kami bukan membuat direktori cafe paling besar, tapi membuat daftar
                yang lebih praktis untuk kebutuhan kerja, nugas, meeting kecil, dan stay
                beberapa jam tanpa banyak trial error.
              </p>
            </div>
          ),
        },
        {
          title: "Alur kurasi data",
          body: (
            <ol className="list-decimal space-y-2 pl-5">
              <li>Data awal dikumpulkan dari dataset backend, hasil scraping aman, dan input admin.</li>
              <li>Nama, alamat, area, kategori, rating, foto, dan link Maps dinormalisasi ke format yang sama.</li>
              <li>Tempat yang punya indikasi WFC diberi label seperti wifi, colokan, budget, parkir, dan 24 jam.</li>
              <li>Data yang sudah cukup layak ditampilkan sebagai cafe publik, sedangkan yang belum lengkap tetap perlu kurasi admin.</li>
            </ol>
          ),
        },
        {
          title: "Sinyal yang kami nilai",
          body: (
            <ul className="list-disc space-y-2 pl-5">
              <li>Kenyamanan kerja: colokan, wifi, area duduk, dan ambience.</li>
              <li>Kebutuhan praktis: parkir, musholla, jam operasional, dan akses lokasi.</li>
              <li>Budget: indikasi harga murah, menengah, atau premium dari data yang tersedia.</li>
              <li>Kualitas data: foto real, rating, jumlah review, dan kelengkapan alamat.</li>
            </ul>
          ),
        },
        {
          title: "Apa yang perlu divalidasi",
          body: (
            <div className="space-y-3">
              <p>
                Informasi operasional cafe bisa berubah. Jam buka, harga, fasilitas,
                keramaian, dan aturan minimum order tetap perlu dicek ulang sebelum datang.
              </p>
              <p>
                Untuk kebutuhan penting seperti meeting, call panjang, atau kerja satu hari
                penuh, kami sarankan konfirmasi langsung lewat Maps, media sosial, atau kontak cafe.
              </p>
            </div>
          ),
        },
        {
          title: "Arah pengembangan",
          body: (
            <ul className="list-disc space-y-2 pl-5">
              <li>Menambah validasi manual dari admin agar filter makin akurat.</li>
              <li>Menguatkan kurasi tematik seperti murah, wifi kencang, colokan banyak, dan 24 jam.</li>
              <li>Menyediakan kanal rekomendasi dari pengguna untuk memperbaiki data lapangan.</li>
            </ul>
          ),
        },
      ]}
    />
  );
}
