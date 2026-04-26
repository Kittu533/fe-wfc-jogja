import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import MapViewClient from "@/components/map-view-client";
import { mockCafes } from "@/lib/data/cafes";

vi.mock("react-leaflet", () => ({
  MapContainer: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div data-testid="map-container">{children}</div>,
  TileLayer: () => <div data-testid="tile-layer" />,
  CircleMarker: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div data-testid="map-marker">{children}</div>,
  Marker: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div data-testid="map-marker">{children}</div>,
  Popup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("map view client", () => {
  it("renders one marker for each cafe", () => {
    const cafes = mockCafes.slice(0, 4).map((cafe) => ({
      id: cafe.id,
      slug: cafe.slug,
      name: cafe.name,
      tagline: cafe.tagline,
      area: cafe.area,
      address: cafe.address,
      priceLevel: cafe.priceLevel,
      rating: 4.5,
      reviewCount: cafe.reviews.length,
      coordinates: cafe.coordinates,
      coverImage: cafe.coverImage,
      featureHighlights: cafe.featureHighlights,
      bestFor: cafe.bestFor,
      amenities: cafe.amenities,
    }));

    render(<MapViewClient cafes={cafes} />);

    expect(screen.getAllByTestId("map-marker")).toHaveLength(cafes.length);
  });
});
