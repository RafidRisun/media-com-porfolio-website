import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { GalleryProvider } from "@/components/gallery";
import WorksPage from "@/app/works/page";

describe("Works categories", () => {
  it("selects Photography initially and switches project links for every category", async () => {
    const user = userEvent.setup();
    render(<GalleryProvider><WorksPage /></GalleryProvider>);
    expect(screen.getByRole("button", { name: "Photography" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.queryByRole("button", { name: "Writings" })).not.toBeInTheDocument();
    for (const [label, count] of [["Graphics", 1], ["Photography", 4]] as const) {
      await user.click(screen.getByRole("button", { name: label }));
      expect(screen.getByRole("button", { name: label })).toHaveAttribute("aria-pressed", "true");
      const gallery = screen.getByRole("region", { name: `${label} projects` });
      expect(within(gallery).getAllByRole("link")).toHaveLength(count);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    }
  });

  it("links each cover to its own project page instead of opening an image modal", () => {
    render(<GalleryProvider><WorksPage /></GalleryProvider>);
    expect(screen.getByRole("link", { name: "View Birulia Zamindar Bari" })).toHaveAttribute("href", "/works/photography-birulia-zamindar-bari");
    expect(screen.getByRole("link", { name: "View Jolshiri Park" })).toHaveAttribute("href", "/works/photography-jolshiri-park");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
