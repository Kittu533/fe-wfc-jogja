"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Save, UploadCloud } from "lucide-react";

import {
  createAdminPlace,
  createEmptyAdminPlace,
  getAdminPlaceById,
  updateAdminPlace,
  uploadAdminPlaceImage,
  validateAdminPlaceForPublish,
} from "@/lib/services/admin-places";
import type {
  AdminPlace,
  AdminPlaceStatus,
  CafeAmenityKey,
  PriceLevel,
} from "@/lib/types";

type AdminPlaceFormProps = {
  placeId?: string;
};

const amenityLabels: Record<CafeAmenityKey, string> = {
  hasSockets: "Colokan",
  hasMusholla: "Musholla",
  hasParking: "Parkir",
  smokingArea: "Smoking area",
  indoorOutdoor: "Indoor/outdoor",
};

export function AdminPlaceForm({ placeId }: AdminPlaceFormProps) {
  const router = useRouter();
  const [place, setPlace] = useState<AdminPlace>(() => createEmptyAdminPlace());
  const [loading, setLoading] = useState(Boolean(placeId));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadPlace() {
      if (!placeId) {
        setLoading(false);
        return;
      }

      const found = await getAdminPlaceById(placeId);

      if (active) {
        setPlace(found ?? createEmptyAdminPlace());
        setLoading(false);
      }
    }

    loadPlace();

    return () => {
      active = false;
    };
  }, [placeId]);

  const publishValidation = useMemo(
    () => validateAdminPlaceForPublish({ ...place, status: "published" }),
    [place],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await savePlace(place.status);
  }

  async function savePlace(status: AdminPlaceStatus) {
    setSaving(true);
    setError("");
    setMessage("");

    const nextPlace = { ...place, status };

    if (status === "published") {
      const validation = validateAdminPlaceForPublish(nextPlace);

      if (!validation.valid) {
        setError(validation.errors.join(" "));
        setSaving(false);
        return;
      }
    }

    try {
      const saved = placeId
        ? await updateAdminPlace(placeId, nextPlace)
        : await createAdminPlace(nextPlace);

      setPlace(saved);
      setMessage(status === "published" ? "Tempat berhasil dipublish." : "Draft berhasil disimpan.");

      if (!placeId) {
        router.replace(`/admin/places/${saved.id}`);
      }
    } catch {
      setError("Gagal menyimpan data. Cek koneksi backend atau token admin.");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadError("");

    try {
      const upload = await uploadAdminPlaceImage(file);

      setPlace((current) => ({
        ...current,
        coverImage: upload.url,
        realImageUrl: upload.url,
        imageStatus: "uploaded",
        uploadMetadata: upload,
        galleryImages: Array.from(new Set([upload.url, ...current.galleryImages])),
      }));
    } catch {
      setUploadError("Upload gagal. Data form tetap aman, coba pilih file lagi.");
    }
  }

  if (loading) {
    return (
      <div className="rounded-[2rem] bg-white/70 p-8 text-center text-sm font-black text-emerald-900/55">
        Memuat form admin...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="rounded-[2.5rem] bg-emerald-950 p-8 text-white">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
          {placeId ? "Edit mode" : "Create mode"}
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight">
          {placeId ? "Edit tempat" : "Tambah tempat"}
        </h1>
        <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-emerald-50/65">
          Lengkapi semua data cafe, upload cover image asli, lalu publish jika
          validasi sudah aman.
        </p>
      </section>

      <FormSection title="Basic Info">
        <TextInput label="Nama tempat" value={place.name} onChange={(name) => update({ name, slug: place.slug || slugify(name) })} />
        <TextInput label="Slug" value={place.slug} onChange={(slug) => update({ slug })} />
        <SelectInput
          label="Kategori"
          value={place.category}
          onChange={(category) => update({ category: category as AdminPlace["category"] })}
          options={["coffee_shop", "cafe", "coworking_space", "wifi_spot", "other"]}
        />
        <TextInput label="Tagline" value={place.tagline} onChange={(tagline) => update({ tagline })} />
        <TextareaInput label="Deskripsi" value={place.description} onChange={(description) => update({ description })} />
      </FormSection>

      <FormSection title="Location">
        <TextInput label="Area" value={place.area} onChange={(area) => update({ area })} />
        <TextareaInput label="Alamat lengkap" value={place.address} onChange={(address) => update({ address })} />
        <NumberInput label="Latitude" value={place.coordinates.latitude} onChange={(latitude) => update({ coordinates: { ...place.coordinates, latitude } })} />
        <NumberInput label="Longitude" value={place.coordinates.longitude} onChange={(longitude) => update({ coordinates: { ...place.coordinates, longitude } })} />
        <TextInput label="Maps URL" value={place.mapsUrl} onChange={(mapsUrl) => update({ mapsUrl })} />
      </FormSection>

      <FormSection title="Media">
        <div className="md:col-span-2">
          <p className="mb-2 text-sm font-black text-emerald-950">Cover image</p>
          <div
            className="mb-4 h-56 rounded-[2rem] border border-emerald-100 bg-emerald-50 bg-cover bg-center"
            style={{ backgroundImage: place.coverImage ? `url(${place.coverImage})` : undefined }}
          />
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-950">
            <UploadCloud className="h-4 w-4" />
            Upload file gambar
            <input type="file" accept="image/*" onChange={handleUpload} className="sr-only" />
          </label>
          {uploadError && <p className="mt-3 text-sm font-bold text-red-700">{uploadError}</p>}
        </div>
        <TextInput label="Cover image URL" value={place.coverImage} onChange={(coverImage) => update({ coverImage, realImageUrl: coverImage, imageStatus: coverImage ? "uploaded" : "missing" })} />
        <SelectInput
          label="Image status"
          value={place.imageStatus}
          onChange={(imageStatus) => update({ imageStatus: imageStatus as AdminPlace["imageStatus"] })}
          options={["scraped", "uploaded", "fallback", "missing"]}
        />
      </FormSection>

      <FormSection title="Price/Menu">
        <SelectInput
          label="Price level"
          value={place.priceLevel}
          onChange={(priceLevel) => update({ priceLevel: priceLevel as PriceLevel })}
          options={["murah", "menengah", "premium"]}
        />
        <NumberInput label="Harga kopi mulai" value={place.coffeePriceMin} onChange={(coffeePriceMin) => update({ coffeePriceMin })} />
        <TextInput label="Menu rekomendasi" value={place.recommendedMenu.map((item) => item.name).join(", ")} onChange={(value) => update({ recommendedMenu: toMenu(value) })} />
      </FormSection>

      <FormSection title="WFC Facilities">
        <TextInput label="Jam buka" value={place.openingHours} onChange={(openingHours) => update({ openingHours })} />
        <TextInput label="Telepon" value={place.contactPhone} onChange={(contactPhone) => update({ contactPhone })} />
        <TextInput label="Website" value={place.website ?? ""} onChange={(website) => update({ website })} />
        <TextInput label="Instagram" value={place.instagram ?? ""} onChange={(instagram) => update({ instagram })} />
        <TextInput label="Best for" value={place.bestFor.join(", ")} onChange={(value) => update({ bestFor: toList(value) })} />
        <TextInput label="Highlights" value={place.featureHighlights.join(", ")} onChange={(value) => update({ featureHighlights: toList(value) })} />
        <div className="grid gap-3 md:col-span-2 md:grid-cols-3">
          {(Object.keys(amenityLabels) as CafeAmenityKey[]).map((key) => (
            <label key={key} className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-emerald-950">
              <input
                type="checkbox"
                checked={place.amenities[key]}
                onChange={(event) => update({ amenities: { ...place.amenities, [key]: event.target.checked } })}
              />
              {amenityLabels[key]}
            </label>
          ))}
        </div>
      </FormSection>

      <FormSection title="Ratings/Reviews">
        {Object.entries(place.ratingBreakdown).map(([key, value]) => (
          <NumberInput
            key={key}
            label={`Rating ${key}`}
            value={value}
            onChange={(rating) => update({ ratingBreakdown: { ...place.ratingBreakdown, [key]: rating } })}
          />
        ))}
        <TextareaInput label="Admin notes" value={place.adminNotes} onChange={(adminNotes) => update({ adminNotes })} />
      </FormSection>

      <FormSection title="Publishing">
        <SelectInput
          label="Status"
          value={place.status}
          onChange={(status) => update({ status: status as AdminPlaceStatus })}
          options={["draft", "published", "archived"]}
        />
        <div className="md:col-span-2 rounded-2xl bg-emerald-50 p-4">
          <p className="text-sm font-black text-emerald-950">Validasi publish</p>
          {publishValidation.valid ? (
            <p className="mt-2 text-sm font-bold text-emerald-700">
              Data aman untuk dipublish.
            </p>
          ) : (
            <ul className="mt-2 space-y-1 text-sm font-bold text-red-700">
              {publishValidation.errors.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </FormSection>

      {(message || error) && (
        <p className={`rounded-2xl px-4 py-3 text-sm font-black ${error ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-800"}`}>
          {error || message}
        </p>
      )}

      <div className="sticky bottom-4 z-10 flex flex-col gap-3 rounded-[2rem] border border-emerald-100 bg-white/85 p-3 shadow-[0_24px_70px_-42px_rgba(6,78,59,0.75)] backdrop-blur-xl sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => savePlace("draft")}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-50 px-5 py-3 text-sm font-black text-emerald-900 transition hover:bg-emerald-100 disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          Simpan draft
        </button>
        <button
          type="button"
          onClick={() => savePlace("published")}
          disabled={saving || !publishValidation.valid}
          className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-950 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Publish
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center rounded-full bg-emerald-950 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-800 disabled:opacity-60"
        >
          Save current status
        </button>
      </div>
    </form>
  );

  function update(patch: Partial<AdminPlace>) {
    setPlace((current) => ({ ...current, ...patch }));
  }
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-emerald-100/80 bg-white/85 p-5 shadow-sm backdrop-blur">
      <h2 className="mb-5 text-xl font-black text-emerald-950">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

function TextInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-emerald-950">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-bold text-emerald-950 outline-none transition focus:border-emerald-500"
      />
    </label>
  );
}

function NumberInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-emerald-950">{label}</span>
      <input
        type="number"
        value={Number.isFinite(value) ? value : 0}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-bold text-emerald-950 outline-none transition focus:border-emerald-500"
      />
    </label>
  );
}

function SelectInput({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-emerald-950">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-bold text-emerald-950 outline-none transition focus:border-emerald-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextareaInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block md:col-span-2">
      <span className="text-sm font-black text-emerald-950">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="mt-2 w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-bold text-emerald-950 outline-none transition focus:border-emerald-500"
      />
    </label>
  );
}

function toList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toMenu(value: string) {
  return toList(value).map((name) => ({
    name,
    priceLabel: "Cek menu",
    note: "Lengkapi harga dari admin.",
  }));
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
