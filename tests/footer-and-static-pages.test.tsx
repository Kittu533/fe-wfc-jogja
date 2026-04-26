import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import AboutPage from "@/app/tentang-kami/page";
import ContactPage from "@/app/hubungi-kami/page";
import FaqPage from "@/app/faq/page";
import PrivacyPage from "@/app/kebijakan-privasi/page";
import { SiteFooter } from "@/components/site-footer";

vi.mock("next/navigation", () => ({
  usePathname: () => "/tentang-kami",
}));

describe("footer and static info pages", () => {
  it("renders footer navigation as clickable links", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("link", { name: "Cari Cafe" })).toHaveAttribute("href", "/cafes");
    expect(screen.getByRole("link", { name: "Peta Spot" })).toHaveAttribute("href", "/map");
    expect(screen.getByRole("link", { name: "Kurasi Spesial" })).toHaveAttribute("href", "/lists");
    expect(screen.getByRole("link", { name: "Daftar Area" })).toHaveAttribute("href", "/cafes");
    expect(screen.getByRole("link", { name: "Tentang Kami" })).toHaveAttribute("href", "/tentang-kami");
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "/faq");
    expect(screen.getByRole("link", { name: "Hubungi Kami" })).toHaveAttribute("href", "/hubungi-kami");
    expect(screen.getByRole("link", { name: "Kebijakan Privasi" })).toHaveAttribute("href", "/kebijakan-privasi");
  });

  it("uses black text for inactive footer links and white text for the active footer link", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("link", { name: "Tentang Kami" })).toHaveClass("!text-white");
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveClass("text-slate-950");
  });

  it("renders the about page", () => {
    render(<AboutPage />);

    expect(screen.getByRole("heading", { name: "Tentang Kami" })).toBeInTheDocument();
    expect(screen.getByText(/WFC Jogja membantu/i)).toBeInTheDocument();
    expect(screen.getByText(/Alur kurasi data/i)).toBeInTheDocument();
    expect(screen.getByText(/Sinyal yang kami nilai/i)).toBeInTheDocument();
  });

  it("renders the FAQ page", () => {
    render(<FaqPage />);

    expect(screen.getByRole("heading", { name: "FAQ" })).toBeInTheDocument();
    expect(screen.getByText(/data cafe berasal dari mana/i)).toBeInTheDocument();
    expect(screen.getByText(/Kenapa hasil filter bisa berubah/i)).toBeInTheDocument();
    expect(screen.getByText(/Apa arti budget murah/i)).toBeInTheDocument();
  });

  it("renders the contact page", () => {
    render(<ContactPage />);

    expect(screen.getByRole("heading", { name: "Hubungi Kami" })).toBeInTheDocument();
    expect(screen.getByText(/Format rekomendasi/i)).toBeInTheDocument();
    expect(screen.getByText(/Estimasi tindak lanjut/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Kirim rekomendasi/i })).toHaveAttribute(
      "href",
      "mailto:halo@wfcjogja.local",
    );
  });

  it("renders the privacy page", () => {
    render(<PrivacyPage />);

    expect(screen.getByRole("heading", { name: "Kebijakan Privasi" })).toBeInTheDocument();
    expect(screen.getByText(/tidak menjual data pribadi/i)).toBeInTheDocument();
    expect(screen.getByText(/Data yang tidak kami kumpulkan/i)).toBeInTheDocument();
    expect(screen.getByText(/Hak koreksi dan penghapusan/i)).toBeInTheDocument();
  });
});
