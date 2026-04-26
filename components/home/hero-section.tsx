"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  BatteryCharging,
  Coffee,
  MapPin,
  PlugZap,
  Sparkles,
  Star,
  Wifi,
} from "lucide-react";

import {
  containerVariants,
  itemVariants,
} from "@/components/home/home-shared";
import type { CafeListItem, CuratedList } from "@/lib/types";

type HeroSectionProps = {
  curatedLists: CuratedList[];
  featuredCafes: CafeListItem[];
  totalCafes: number;
};

const areaBadges = ["Prawirotaman", "Seturan", "Kotabaru", "Kaliurang", "Gejayan"];
const marqueeCopy = "WFC JOGJA · KOPI · COWORKING · NUGAS · REMOTE · ";
const heroPhrases = [
  "Gak Pake Gambling",
  "Wifi Gak Prank",
  "Colokan Aman",
  "Vibe Gak Zonk",
  "Langsung Ketemu",
];

export function HeroSection({
  curatedLists,
  featuredCafes,
  totalCafes,
}: HeroSectionProps) {
  const visibleLists = curatedLists.slice(0, 3);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });
  const phoneY = useTransform(smoothScroll, [0, 1], [0, -72]);
  const phoneRotate = useTransform(smoothScroll, [0, 1], ["0deg", "5deg"]);
  const panelY = useTransform(smoothScroll, [0, 1], [0, 42]);
  const sideCopyY = useTransform(smoothScroll, [0, 1], [0, -28]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 pb-8 pt-6 text-emerald-950 sm:px-6 lg:px-8"
    >
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="absolute right-[12%] top-24 hidden h-12 w-12 text-emerald-600 lg:block"
      >
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid min-h-[560px] items-start gap-8 lg:grid-cols-[0.9fr_0.88fr_0.72fr] lg:gap-4"
        >
          <motion.div variants={itemVariants} className="pt-10 lg:pt-20">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" />
              Jogja WFC Survival Kit
            </span>
            <h1 className="max-w-[560px] text-[3.35rem] font-black leading-[0.96] text-[#111612] sm:text-[4.65rem] lg:text-[5.35rem] xl:text-[5.7rem]">
              Cari Cafe WFC Jogja
              <RotatingHeroPhrase />
            </h1>
            <div className="mt-7 flex items-center gap-4">
              <span className="hidden h-px w-20 bg-neutral-300 sm:block" />
              <Link
                href="/cafes"
                className="group inline-flex items-center rounded-full bg-emerald-50 py-2 pl-6 pr-2 text-sm font-black text-emerald-800 shadow-sm ring-1 ring-emerald-100 transition hover:bg-emerald-100 sm:text-base"
              >
                Cari Spot Sekarang
                <span className="ml-4 grid h-12 w-12 place-items-center rounded-full bg-emerald-700 text-white transition group-hover:rotate-12 group-hover:bg-emerald-950 sm:h-[3.25rem] sm:w-[3.25rem]">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative z-20 flex justify-center lg:pt-14"
            style={{ y: phoneY, rotate: phoneRotate }}
          >
            <PhoneMockup cafes={featuredCafes} />
          </motion.div>

          <motion.aside
            variants={itemVariants}
            className="pt-4 lg:pt-[7.5rem]"
            style={{ y: sideCopyY }}
          >
            <div className="mb-8 h-9 w-9 text-emerald-600">
              <span className="block h-full w-px translate-x-4 bg-current" />
              <span className="-mt-5 block h-px w-full bg-current" />
            </div>
            <p className="max-w-[340px] text-xl font-semibold leading-snug text-[#171a17] xl:text-[1.35rem]">
              Butuh tempat buat ngegas skripsi, client call, atau remote shift?
              Cek wifi, colokan, vibe, dan area sebelum lo berangkat.
            </p>
            <div className="mt-14 flex items-center gap-4">
              <div className="flex -space-x-3">
                {featuredCafes.slice(0, 3).map((cafe) => (
                  <div
                    key={cafe.id}
                    className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white bg-emerald-100 shadow-md"
                  >
                    <Image
                      src={cafe.coverImage}
                      alt={cafe.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-4xl font-black leading-none text-[#111612]">
                  {totalCafes}+
                </p>
                <p className="mt-2 max-w-[220px] text-[13px] font-semibold leading-relaxed text-neutral-500">
                  spot WFC lokal buat laptop-warrior, anak kos produktif, dan
                  tim brainstorm dadakan.
                </p>
              </div>
            </div>
          </motion.aside>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 42 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
          style={{ y: panelY }}
          className="relative z-0 -mt-2 overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-700 via-emerald-800 to-[#083f2d] px-6 py-12 text-white shadow-[0_40px_90px_-35px_rgba(6,78,59,0.7)] sm:rounded-[3rem] sm:px-10 lg:-mt-24 lg:min-h-[400px] lg:px-16 lg:py-20"
        >
          <div
            aria-hidden
            className="hero-marquee absolute left-0 top-8 flex w-max items-center text-[4.5rem] font-black uppercase leading-none text-white/14 sm:text-[6.8rem] lg:text-[8.2rem]"
          >
            <span className="pr-8">{marqueeCopy.repeat(2)}</span>
            <span className="pr-8">{marqueeCopy.repeat(2)}</span>
          </div>
          <div className="relative mx-auto grid max-w-5xl gap-7 pt-24 text-center lg:pt-[9.5rem]">
            <div className="mx-auto max-w-4xl">
              <span className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-50/85 backdrop-blur">
                Quick decision board
              </span>
              <p className="mx-auto max-w-4xl text-[1.65rem] font-semibold leading-[1.18] sm:text-3xl lg:text-[2.15rem]">
                Satu layar buat decide: gas sekarang, simpan buat nanti, atau
                skip spot yang vibe-nya zonk.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-emerald-50/72 sm:text-base">
                Dibuat buat ritme Jogja yang kadang random: dari kelas, kos,
                client call, sampai deadline yang datangnya gak pake permisi.
              </p>
            </div>

            <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {visibleLists.map((list) => (
                <Link
                  key={list.id}
                  href={`/lists/${list.slug}`}
                  className="rounded-full border border-white/20 bg-white/12 px-4 py-2.5 text-xs font-black text-white backdrop-blur transition hover:bg-white hover:text-emerald-800 sm:px-5 sm:text-sm"
                >
                  {list.heroLabel}
                </Link>
              ))}
              {areaBadges.map((area) => (
                <Link
                  key={area}
                  href={`/cafes?area=${encodeURIComponent(area)}`}
                  className="rounded-full border border-white/15 px-4 py-2.5 text-xs font-black text-emerald-50/78 transition hover:border-white hover:bg-white/8 hover:text-white sm:px-5 sm:text-sm"
                >
                  {area}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function RotatingHeroPhrase() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroPhrases.length);
    }, 2100);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <span className="relative mt-1 block min-h-[1.05em] overflow-hidden font-semibold text-emerald-700">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={heroPhrases[activeIndex]}
          initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -26, filter: "blur(6px)" }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="block"
        >
          {heroPhrases[activeIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function PhoneMockup({ cafes }: { cafes: CafeListItem[] }) {
  const leadCafe = cafes[0];
  const secondaryCafes = cafes.slice(1, 4);

  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      className="relative h-[510px] w-[258px] rotate-[10deg] rounded-[2.6rem] border-[8px] border-[#111612] bg-[#111612] p-2 shadow-[34px_48px_90px_-34px_rgba(17,24,17,0.65)] sm:h-[560px] sm:w-[282px] lg:-rotate-[13deg]"
    >
      <div className="absolute left-1/2 top-3 z-20 h-6 w-[5.5rem] -translate-x-1/2 rounded-full bg-[#111612]" />
      <div className="relative h-full overflow-hidden rounded-[2rem] bg-[#f4f8ef] p-4 text-emerald-950 sm:p-5">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-emerald-900/45">
              Pagi, WFC Hunter
            </p>
            <p className="text-base font-black sm:text-lg">Mau fokus di mana?</p>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-emerald-700 shadow-sm">
            09:41
          </span>
        </div>

        {leadCafe ? (
          <Link
            href={`/cafes/${leadCafe.slug}`}
            className="group relative block h-[9.5rem] overflow-hidden rounded-[1.5rem] bg-emerald-900 shadow-xl sm:h-[10.5rem]"
          >
            <Image
              src={leadCafe.coverImage}
              alt={leadCafe.name}
              fill
              sizes="300px"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/18 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur">
                <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
                {leadCafe.rating}
              </span>
              <p className="mt-2 text-lg font-black leading-tight text-white sm:text-xl">
                {leadCafe.name}
              </p>
              <p className="text-xs font-semibold text-white/75">
                {leadCafe.area} · {leadCafe.tagline}
              </p>
            </div>
          </Link>
        ) : null}

        <div className="my-4 grid grid-cols-3 gap-2 sm:gap-3">
          <PhoneAction icon={Wifi} label="Wifi" />
          <PhoneAction icon={PlugZap} label="Colokan" />
          <PhoneAction icon={Coffee} label="Kopi" />
        </div>

        <div className="rounded-[1.5rem] bg-white p-3 shadow-sm sm:p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-black">Shortlist sore ini</p>
            <BatteryCharging className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="space-y-3">
            {secondaryCafes.map((cafe) => (
              <Link
                key={cafe.id}
                href={`/cafes/${cafe.slug}`}
                className="flex items-center gap-3 rounded-2xl p-1 transition hover:bg-emerald-50"
              >
                <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-emerald-100">
                  <Image
                    src={cafe.coverImage}
                    alt={cafe.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black">{cafe.name}</p>
                  <p className="flex items-center gap-1 text-xs font-semibold text-emerald-900/45">
                    <MapPin className="h-3 w-3" />
                    {cafe.area}
                  </p>
                </div>
                <span className="text-xs font-black text-emerald-700">
                  {cafe.rating}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PhoneAction({
  icon: Icon,
  label,
}: {
  icon: typeof Wifi;
  label: string;
}) {
  return (
    <div className="grid justify-items-center gap-2">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-100">
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-[11px] font-black">{label}</span>
    </div>
  );
}
