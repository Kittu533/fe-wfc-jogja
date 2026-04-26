import type { Metadata } from "next";

import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Pertanyaan umum tentang data, filter, dan kurasi WFC Jogja.",
};

export default function FaqPage() {
  return (
    <InfoPage
      eyebrow="Pertanyaan Umum"
      title="FAQ"
      description="Jawaban singkat tentang cara WFC Jogja mengolah data cafe dan cara memakai fitur pencarian."
      cta={{ label: "Lihat semua cafe", href: "/cafes" }}
      sections={[
        {
          title: "Data cafe berasal dari mana?",
          body: "Data cafe berasal dari dataset backend, hasil scraping yang disinkronkan, dan kurasi admin. Data mentah kemudian dipetakan ke format yang sama supaya bisa dipakai oleh filter, halaman detail, map, dan list kurasi.",
        },
        {
          title: "Apakah semua data selalu akurat?",
          body: "Belum tentu. WFC Jogja membantu mempercepat proses shortlist, tapi detail seperti jam buka, harga, fasilitas, keramaian, dan aturan tempat bisa berubah. Gunakan data ini sebagai titik awal sebelum validasi langsung.",
        },
        {
          title: "Bagaimana cara mencari cafe dengan wifi atau colokan?",
          body: "Buka halaman Cari Cafe, gunakan keyword seperti wifi, pilih filter colokan, atau pakai kurasi tematik yang sudah disiapkan.",
        },
        {
          title: "Kenapa hasil filter bisa berubah?",
          body: "Hasil filter bisa berubah saat data baru hasil scraping atau kurasi admin disinkronkan. Cafe yang sebelumnya belum punya sinyal colokan, foto, area, atau budget bisa masuk ke filter setelah datanya dilengkapi.",
        },
        {
          title: "Apa arti budget murah, menengah, dan premium?",
          body: "Budget adalah estimasi praktis untuk membantu sorting awal. Murah cocok untuk pilihan hemat, menengah untuk cafe umum dengan harga standar, dan premium untuk tempat yang biasanya punya biaya lebih tinggi atau fasilitas lebih serius.",
        },
        {
          title: "Kenapa ada cafe yang fotonya belum sempurna?",
          body: "Beberapa foto berasal dari sumber publik atau thumbnail Maps. Sistem sudah mencoba mengambil versi gambar yang lebih besar, tapi kualitas tetap bergantung pada sumber data yang tersedia.",
        },
        {
          title: "Apa bedanya halaman Cafe, Map, dan Kurasi?",
          body: "Halaman Cafe dipakai untuk filter detail, Map untuk melihat sebaran lokasi, sedangkan Kurasi berisi list tematik agar pengguna bisa memilih lebih cepat berdasarkan kebutuhan tertentu.",
        },
        {
          title: "Bisa rekomendasikan cafe baru?",
          body: "Bisa. Kirim nama cafe, area, dan alasan kenapa spot tersebut nyaman buat kerja lewat halaman Hubungi Kami.",
        },
        {
          title: "Apakah WFC Jogja terafiliasi dengan cafe tertentu?",
          body: "Tidak secara default. Data yang tampil adalah hasil kurasi platform. Jika suatu saat ada kerja sama khusus, informasi tersebut perlu ditampilkan secara jelas agar pengguna tahu konteksnya.",
        },
      ]}
    />
  );
}
