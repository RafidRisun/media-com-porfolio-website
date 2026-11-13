import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { GalleryProvider } from "@/components/gallery";
import WorksPage from "@/app/works/page";

describe("Works categories", () => {
  it("selects Writings initially and switches projects for every category", async () => {
    const user = userEvent.setup();
    render(<GalleryProvider><WorksPage /></GalleryProvider>);
    expect(screen.getByRole("button", { name: "Writings" })).toHaveAttribute("aria-pressed", "true");
    for (const label of ["Photography", "Videography", "Presentations", "Writings"]) {
      await user.click(screen.getByRole("button", { name: label }));
      expect(screen.getByRole("button", { name: label })).toHaveAttribute("aria-pressed", "true");
      const gallery = screen.getByRole("region", { name: `${label} projects` });
      expect(within(gallery).getAllByRole("button")).toHaveLength(9);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    }
  });

  it("opens the selected category's project details", async () => {
    const user = userEvent.setup();
    render(<GalleryProvider><WorksPage /></GalleryProvider>);
    await user.click(screen.getByRole("button", { name: "Photography" }));
    await user.click(screen.getByRole("button", { name: "View Photography project 1" }));
    expect(screen.getByRole("dialog", { name: "Photography project 1" })).toBeVisible();
  });
});
