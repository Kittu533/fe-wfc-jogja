import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage, { metadata } from "@/app/page";

describe("homepage SEO", () => {
  it("exports enriched metadata for social previews and indexing", () => {
    expect(metadata.alternates?.canonical).toBe("/");
    expect(metadata.openGraph?.type).toBe("website");
    expect(metadata.openGraph?.images?.[0]?.url).toBe("/og/home-wfc-jogja.jpg");
    expect(metadata.twitter?.card).toBe("summary_large_image");
    expect(metadata.robots).toEqual({
      index: true,
      follow: true,
    });
  });

  it("renders website and item list JSON-LD on the homepage", async () => {
    const { container } = render(await HomePage());

    const scripts = Array.from(
      container.querySelectorAll('script[type="application/ld+json"]'),
    );

    expect(scripts).toHaveLength(1);

    const payload = JSON.parse(scripts[0]?.innerHTML ?? "{}");

    expect(payload["@context"]).toBe("https://schema.org");
    expect(Array.isArray(payload["@graph"])).toBe(true);
    expect(payload["@graph"][0]["@type"]).toBe("WebSite");
    expect(payload["@graph"][1]["@type"]).toBe("ItemList");
    expect(payload["@graph"][1].itemListElement).toHaveLength(3);
  });
});
