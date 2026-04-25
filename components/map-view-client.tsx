"use client";

import Link from "next/link";
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
} from "react-leaflet";

import type { CafeListItem } from "@/lib/types";

export default function MapViewClient({ cafes }: { cafes: CafeListItem[] }) {
  const center =
    cafes.length > 0
      ? ([cafes[0].coordinates.latitude, cafes[0].coordinates.longitude] as [number, number])
      : ([-7.797068, 110.370529] as [number, number]);

  return (
    <MapContainer center={center} zoom={12} scrollWheelZoom className="z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {cafes.map((cafe) => (
        <CircleMarker
          key={cafe.id}
          center={[cafe.coordinates.latitude, cafe.coordinates.longitude]}
          radius={10}
          pathOptions={{
            color: "#8f3413",
            fillColor: "#bd5b31",
            fillOpacity: 0.85,
            weight: 2,
          }}
        >
          <Popup>
            <div className="space-y-2">
              <p className="text-sm font-bold">{cafe.name}</p>
              <p className="text-xs text-neutral-600">{cafe.area}</p>
              <p className="text-xs text-neutral-700">{cafe.tagline}</p>
              <Link href={`/cafes/${cafe.slug}`} className="text-xs font-semibold text-[#8f3413]">
                Lihat detail
              </Link>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
