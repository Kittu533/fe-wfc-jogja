import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import HomePage from "@/app/page";
import CafesPage from "@/app/cafes/page";
import CafeDetailPage from "@/app/cafes/[slug]/page";
import CuratedListDetailPage from "@/app/lists/[slug]/page";

const notFoundMock = vi.fn(() => {
  throw new Error("NEXT_NOT_FOUND");
});

vi.mock("next/navigation", () => ({
  notFound: () => notFoundMock(),
}));

describe("app pages smoke", () => {
  it("renders homepage hero and discovery panel", async () => {
    render(await HomePage());

    expect(
      screen.getByRole("heading", {
        name: /cari cafe wfc jogja\s*gak pake gambling/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/jogja wfc survival kit/i)).toBeInTheDocument();
    expect(screen.getByText(/satu layar buat decide/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /yang ini dulu aja,\s*biar gak overthinking/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /hari ini mau\s*ngegas apa/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /list buat\s*wfc era/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders cafes page with active filters applied", async () => {
    render(
      await CafesPage({
        searchParams: Promise.resolve({
          q: "nilu",
          area: "Kaliurang",
        }),
      }),
    );

    expect(screen.getByText(/spot ketemu/i).closest("p")).toHaveTextContent("1 Spot ketemu");
    expect(screen.getByRole("heading", { name: "Nilu Coffee" })).toBeInTheDocument();
  });

  it("renders cafe detail page for valid slug", async () => {
    render(
      await CafeDetailPage({
        params: Promise.resolve({
          slug: "nilu-coffee",
        }),
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: "Nilu Coffee",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/candidate from openstreetmap/i)).toBeInTheDocument();
    expect(screen.getByText(/Review WFC awal/i)).toBeInTheDocument();
  });

  it("renders curated list detail only with cafes in that list", async () => {
    render(
      await CuratedListDetailPage({
        params: Promise.resolve({
          slug: "coworking-dan-workspace-jogja",
        }),
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: "Coworking dan Workspace Jogja",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Crônica Creative Workspace" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Altilis Coffee" })).not.toBeInTheDocument();
  });
});
