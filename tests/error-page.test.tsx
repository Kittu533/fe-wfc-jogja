import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ErrorPage from "@/app/error";

describe("app error page", () => {
  it("renders fallback UI and lets user retry", () => {
    const reset = vi.fn();

    render(<ErrorPage error={new Error("boom")} reset={reset} />);

    expect(
      screen.getByRole("heading", {
        name: /terjadi gangguan saat memuat halaman/i,
      }),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: /coba muat ulang/i,
      }),
    );

    expect(reset).toHaveBeenCalledTimes(1);
  });
});
