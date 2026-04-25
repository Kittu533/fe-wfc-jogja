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
  it("renders homepage hero and curated section", async () => {
    render(await HomePage());

    expect(
      screen.getByRole("heading", {
        name: /nugas jadi\s*sat-set\s*&\s*anti-drama/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /gas ke sini dulu,\s*biar gak bingung/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /lo lagi mau ngapain/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders cafes page with active filters applied", async () => {
    render(
      await CafesPage({
        searchParams: Promise.resolve({
          q: "kopi",
          area: "Seturan",
          priceLevel: "menengah",
        }),
      }),
    );

    expect(screen.getByText(/menampilkan/i)).toHaveTextContent("Menampilkan 1 cafe di Seturan.");
    expect(screen.getByRole("heading", { name: "Space Roastery Seturan" })).toBeInTheDocument();
  });

  it("renders cafe detail page for valid slug", async () => {
    render(
      await CafeDetailPage({
        params: Promise.resolve({
          slug: "space-roastery-seturan",
        }),
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: "Space Roastery Seturan",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Amenities utama")).toBeInTheDocument();
    expect(screen.getByText("Nadia")).toBeInTheDocument();
  });

  it("renders curated list detail only with cafes in that list", async () => {
    render(
      await CuratedListDetailPage({
        params: Promise.resolve({
          slug: "cafe-buat-skripsi-seharian",
        }),
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: "Cafe Buat Skripsi Seharian",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Space Roastery Seturan" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Teras Kotabaru" })).not.toBeInTheDocument();
  });
});
