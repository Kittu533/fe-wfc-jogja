import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AdminLoginPage from "@/app/admin/login/page";
import AdminPlacesPage from "@/app/admin/places/page";
import AdminPlaceNewPage from "@/app/admin/places/new/page";
import AdminPlaceEditPage from "@/app/admin/places/[id]/page";
import { ADMIN_TOKEN_STORAGE_KEY } from "@/lib/services/admin-places";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => "/admin/places",
}));

describe("admin pages", () => {
  beforeEach(() => {
    localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, "dev-admin-token");
  });

  it("renders admin login form", () => {
    render(<AdminLoginPage />);

    expect(screen.getByRole("heading", { name: /masuk admin/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email admin/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("renders admin places list with stats and filters", async () => {
    render(await AdminPlacesPage());

    expect(await screen.findByRole("heading", { name: /admin tempat wfc/i })).toBeInTheDocument();
    expect(screen.getAllByText(/published/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /tambah tempat/i })).toBeInTheDocument();
  });

  it("renders create form with required publishing sections", () => {
    render(<AdminPlaceNewPage />);

    expect(screen.getByRole("heading", { name: /tambah tempat/i })).toBeInTheDocument();
    expect(screen.getByText(/basic info/i)).toBeInTheDocument();
    expect(screen.getByText(/media/i)).toBeInTheDocument();
    expect(screen.getByText(/publishing/i)).toBeInTheDocument();
  });

  it("renders edit form for an existing place", async () => {
    render(
      await AdminPlaceEditPage({
        params: Promise.resolve({ id: "osm-node-11873831454" }),
      }),
    );

    expect(await screen.findByRole("heading", { name: /edit tempat/i })).toBeInTheDocument();
    expect(screen.getByDisplayValue("Nilu Coffee")).toBeInTheDocument();
    expect(screen.getByText(/validasi publish/i)).toBeInTheDocument();
  });
});
