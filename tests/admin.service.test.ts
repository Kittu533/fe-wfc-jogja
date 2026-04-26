import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  ADMIN_TOKEN_STORAGE_KEY,
  getAdminPlaceById,
  getAdminPlaces,
  loginAdmin,
  updateAdminPlace,
  validateAdminPlaceForPublish,
} from "@/lib/services/admin-places";

describe("admin places service", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("stores JWT token after admin login", async () => {
    const session = await loginAdmin({
      email: "admin@wfc.test",
      password: "secret",
    });

    expect(session.accessToken).toBeTruthy();
    expect(localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY)).toBe(session.accessToken);
  });

  it("lists editable places and filters by publish status", async () => {
    localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, "dev-admin-token");

    const allPlaces = await getAdminPlaces();
    const publishedPlaces = await getAdminPlaces({ status: "published" });

    expect(allPlaces.total).toBeGreaterThan(publishedPlaces.total);
    expect(publishedPlaces.items.length).toBeGreaterThan(0);
    expect(publishedPlaces.items.every((place) => place.status === "published")).toBe(true);
    expect(publishedPlaces.items.every((place) => place.coverImage.startsWith("http"))).toBe(true);
  });

  it("blocks publish when a place has no real or uploaded cover image", async () => {
    localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, "dev-admin-token");

    const place = await getAdminPlaceById("osm-node-11064518681");

    expect(place?.name).toBe("Altilis Coffee");

    const validation = validateAdminPlaceForPublish({
      ...place!,
      status: "published",
    });

    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain("Cover image asli wajib diisi sebelum publish.");
  });

  it("updates an editable place through backend API", async () => {
    localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, "dev-admin-token");

    const updated = await updateAdminPlace("osm-node-11873831454", {
      coffeePriceMin: 28000,
      adminNotes: "Harga kopi sudah dikurasi admin.",
    });

    expect(updated.coffeePriceMin).toBe(28000);
    expect(updated.adminNotes).toBe("Harga kopi sudah dikurasi admin.");
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining("/admin/places/osm-node-11873831454"),
      expect.objectContaining({
        headers: expect.objectContaining({
          authorization: "Bearer dev-admin-token",
        }),
      }),
    );
  });
});
