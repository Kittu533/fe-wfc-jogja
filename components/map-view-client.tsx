"use client";

import Image from "next/image";
import Link from "next/link";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import type { CafeListItem } from "@/lib/types";
import { shouldUnoptimizeImage } from "@/lib/utils/images";

// Fix Leaflet icon issue in Next.js
const createCustomIcon = (cafe: CafeListItem) => {
  const rating = cafe.rating;
  const score = cafe.wfcRecommendation?.score;
  const colorClass = rating >= 4.7 ? "bg-emerald-900" : rating >= 4.4 ? "bg-emerald-700" : "bg-amber-700";
  const tailColorClass = rating >= 4.7 ? "bg-emerald-900" : rating >= 4.4 ? "bg-emerald-700" : "bg-amber-700";

  return L.divIcon({
    className: "custom-div-icon",
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute -top-10 flex flex-col items-center">
          <div class="relative flex h-10 w-10 items-center justify-center rounded-full ${colorClass} border-2 border-white shadow-lg transition-transform hover:scale-110">
            <span class="text-[10px] font-black text-white">${rating.toFixed(1)}</span>
            ${score ? `<span class="absolute -right-2 -top-2 rounded-full bg-white px-1.5 py-0.5 text-[8px] font-black text-emerald-900 shadow">${score}</span>` : ""}
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 ${tailColorClass} border-r-2 border-b-2 border-white"></div>
          </div>
        </div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

export default function MapViewClient({ cafes }: { cafes: CafeListItem[] }) {
  const center = [-7.797068, 110.370529] as [number, number];

  return (
    <MapContainer
      center={center}
      zoom={12}
      scrollWheelZoom
      className="z-0 min-h-[600px] rounded-[2rem] shadow-inner"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      {cafes.map((cafe) => (
        <Marker
          key={cafe.id}
          position={[cafe.coordinates.latitude, cafe.coordinates.longitude]}
          icon={createCustomIcon(cafe)}
        >
          <Popup className="custom-popup">
            <div className="w-64 overflow-hidden rounded-xl bg-white p-0">
              <div className="relative h-24 w-full">
                <Image 
                  src={cafe.coverImage} 
                  alt={cafe.name} 
                  fill
                  sizes="256px"
                  className="h-full w-full object-cover"
                  unoptimized={shouldUnoptimizeImage(cafe.coverImage)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                    {cafe.area}
                  </p>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-emerald-950">{cafe.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                       <span className="text-[10px] font-bold text-amber-500">★</span>
                       <span className="text-[10px] font-black text-emerald-900/60">{cafe.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs font-medium leading-relaxed text-neutral-500 line-clamp-2">
                  {cafe.wfcRecommendation?.reasons[0] ?? cafe.tagline}
                </p>
                {cafe.wfcRecommendation && (
                  <div className="flex flex-wrap gap-1.5">
                    {cafe.wfcRecommendation.badges.slice(0, 2).map((badge) => (
                      <span key={badge} className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-black text-emerald-800">
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
                <Link
                  href={`/cafes/${cafe.slug}`}
                  className="flex w-full items-center justify-center rounded-xl bg-emerald-900 py-2.5 text-xs font-black text-white transition hover:bg-emerald-950"
                >
                  Detail Spot
                </Link>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
