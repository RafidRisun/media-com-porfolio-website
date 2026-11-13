import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GalleryProvider, ImageCard } from "@/components/gallery";

const item = {
  id: "test-project",
  title: "A place to remember",
  description: "An exploration of space and memory.",
  date: "2026-01-12",
  image: "/images/placeholder.svg",
  alt: "Project image",
};

function renderCard() {
  return render(<GalleryProvider><ImageCard item={item} className="aspect-square" /></GalleryProvider>);
}

describe("project popup", () => {
  it("opens the image with a description and numeric date, without a visible title", async () => {
    const user = userEvent.setup();
    renderCard();
    await user.click(screen.getByRole("button", { name: `View ${item.title}` }));
    const dialog = screen.getByRole("dialog", { name: item.title });
    expect(dialog).toBeVisible();
    expect(within(dialog).queryByRole("heading")).not.toBeInTheDocument();
    expect(within(dialog).queryByText(item.title)).not.toBeInTheDocument();
    expect(screen.getByText(item.description)).toBeVisible();
    expect(screen.getByText("12/01/2026")).toBeVisible();
    expect(screen.getAllByAltText(item.alt)).toHaveLength(2);
  });

  it("closes on Escape, restores focus, and unlocks scrolling", async () => {
    const user = userEvent.setup();
    renderCard();
    const trigger = screen.getByRole("button", { name: `View ${item.title}` });
    await user.click(trigger);
    expect(document.body.style.overflow).toBe("hidden");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  });

  it("keeps focus inside and closes with the close button or backdrop", async () => {
    const user = userEvent.setup();
    renderCard();
    const trigger = screen.getByRole("button", { name: `View ${item.title}` });
    await user.click(trigger);
    const close = screen.getByRole("button", { name: "Close project" });
    expect(close).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
    await user.click(close);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(trigger);
    await user.click(screen.getByTestId("modal-backdrop"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
