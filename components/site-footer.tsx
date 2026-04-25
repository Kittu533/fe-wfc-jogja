import Link from "next/link";
import Image from "next/image";
import { Globe, Camera, Send } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative z-10 bg-slate-50 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative h-32 w-32">
                <Image
                  src="/logo-wfc.png"
                  alt="WFC Jogja Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-black tracking-tight text-emerald-950">WFC Jogja</span>
            </Link>
            <p className="text-slate-500 font-medium leading-relaxed max-w-sm mb-8">
              Frontend discovery guide untuk cafe-cafe di Jogja yang benar-benar layak buat kerja. Kami kurasi wifi, colokan, dan kenyamanan buat produktivitasmu.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <Send className="w-5 h-5 hover:text-emerald-600 transition-colors cursor-pointer" />
              <Camera className="w-5 h-5 hover:text-emerald-600 transition-colors cursor-pointer" />
              <Globe className="w-5 h-5 hover:text-emerald-600 transition-colors cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-emerald-950 mb-6">Eksplorasi</h4>
            <ul className="space-y-4">
              {["Cari Cafe", "Peta Spot", "Kurasi Spesial", "Daftar Area"].map((item) => (
                <li key={item}>
                  <span className="text-slate-500 font-medium hover:text-emerald-600 transition-colors cursor-pointer">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-emerald-950 mb-6">Bantuan</h4>
            <ul className="space-y-4">
              {["Tentang Kami", "FAQ", "Hubungi Kami", "Kebijakan Privasi"].map((item) => (
                <li key={item}>
                  <span className="text-slate-500 font-medium hover:text-emerald-600 transition-colors cursor-pointer">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400 font-medium">
          <p>© 2026 WFC Jogja. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Built with Next.js & Framer Motion</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold">
              BETA
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
