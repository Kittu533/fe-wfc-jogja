import type { Metadata } from "next";

import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi WFC Jogja terkait data pengguna dan data cafe.",
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Privasi"
      title="Kebijakan Privasi"
      description="Halaman ini menjelaskan prinsip dasar pengelolaan data di WFC Jogja secara ringkas dan mudah dipahami."
      sections={[
        {
          title: "Data yang digunakan",
          body: (
            <ul className="list-disc space-y-2 pl-5">
              <li>Data cafe seperti nama tempat, area, alamat, kategori, foto, rating, dan link Maps.</li>
              <li>Data kurasi seperti fasilitas, budget, highlight, catatan admin, dan status publikasi.</li>
              <li>Data teknis yang dibutuhkan aplikasi untuk menampilkan hasil pencarian, map, dan halaman detail.</li>
            </ul>
          ),
        },
        {
          title: "Data pribadi",
          body: "Kami tidak menjual data pribadi pengguna. Jika kamu menghubungi kami lewat email, informasi yang kamu kirim hanya dipakai untuk merespons pesan atau menindaklanjuti rekomendasi.",
        },
        {
          title: "Data yang tidak kami kumpulkan",
          body: "WFC Jogja tidak meminta password, nomor kartu pembayaran, dokumen identitas, data kesehatan, atau lokasi real-time pengguna untuk memakai fitur pencarian cafe.",
        },
        {
          title: "Data dari pihak ketiga",
          body: "Beberapa informasi cafe bisa berasal dari sumber publik atau hasil scraping yang kemudian dikurasi. Data tersebut digunakan untuk membantu pencarian dan bukan untuk menyatakan kepemilikan atas konten pihak ketiga.",
        },
        {
          title: "Email dan rekomendasi pengguna",
          body: "Jika kamu mengirim rekomendasi, koreksi, atau masukan lewat email, isi pesan dapat dipakai sebagai bahan perbaikan data. Kami tidak akan menampilkan alamat email pengirim sebagai konten publik tanpa izin.",
        },
        {
          title: "Hak koreksi dan penghapusan",
          body: "Jika kamu menemukan data cafe yang keliru, tidak relevan, atau perlu dihapus dari tampilan publik, hubungi kami lewat halaman Hubungi Kami dengan nama cafe dan alasan koreksinya.",
        },
        {
          title: "Perubahan kebijakan",
          body: "Kebijakan ini dapat diperbarui ketika fitur, sumber data, atau kebutuhan operasional berubah.",
        },
      ]}
    />
  );
}
