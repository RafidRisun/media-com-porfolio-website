import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { GalleryProvider } from "@/components/gallery";
import WorksPage from "@/app/works/page";

vi.mock("@/data/videos.json", () => ({ default: [
  {
    id: "a-short-film",
    title: "A short film",
    description: "A film about everyday life.",
    link: "https://youtu.be/M7lc1UVf-VE?si=share",
    image: "",
  },
  {
    id: "invalid-video",
    title: "Unavailable film",
    description: "",
    link: "https://example.com/not-youtube",
    image: "/images/placeholder.svg",
  },
  {
    id: "custom-cover",
    title: "Custom cover film",
    link: "https://youtu.be/M7lc1UVf-VE",
    image: "/images/placeholder.svg",
  },
  {
    id: "whitespace-cover",
    title: "Whitespace cover film",
    link: "https://youtu.be/M7lc1UVf-VE",
    image: "   ",
  },
] }));

async function showVideos() {
  const user = userEvent.setup();
  render(<GalleryProvider><WorksPage /></GalleryProvider>);
  await user.click(screen.getByRole("button", { name: "Videography" }));
  return user;
}

describe("Videography", () => {
  it("keeps a custom thumbnail instead of replacing it with YouTube's thumbnail", async () => {
    await showVideos();
    const card = screen.getByRole("button", { name: "Play Custom cover film" });
    expect(within(card).getByRole("img")).toHaveAttribute("src", "/images/placeholder.svg");
  });

  it("treats whitespace-only thumbnail fields as empty", async () => {
    await showVideos();
    const card = screen.getByRole("button", { name: "Play Whitespace cover film" });
    expect(within(card).getByRole("img")).toHaveAttribute("src", "https://i.ytimg.com/vi/M7lc1UVf-VE/hqdefault.jpg");
  });

  it("shows video thumbnails and full titles instead of project-page links", async () => {
    await showVideos();
    const grid = screen.getByRole("region", { name: "Videography projects" });
    const card = within(grid).getByRole("button", { name: "Play A short film" });
    expect(within(card).getByText("A short film")).toBeInTheDocument();
    expect(within(card).getByRole("img")).toHaveAttribute("src", "https://i.ytimg.com/vi/M7lc1UVf-VE/hqdefault.jpg");
    expect(within(grid).queryByRole("link")).not.toBeInTheDocument();
  });

  it("opens the matching YouTube player and description, then removes it on close", async () => {
    const user = await showVideos();
    const card = screen.getByRole("button", { name: "Play A short film" });
    await user.click(card);
    const dialog = screen.getByRole("dialog", { name: "A short film" });
    expect(within(dialog).getByTitle("YouTube player: A short film")).toHaveAttribute("src", "https://www.youtube-nocookie.com/embed/M7lc1UVf-VE?playsinline=1&rel=0");
    expect(within(dialog).getByText("A film about everyday life.")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Close project" }));
    expect(screen.queryByTitle("YouTube player: A short film")).not.toBeInTheDocument();
    expect(card).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  });

  it("lets keyboard users enter the player and return to the close button", async () => {
    const user = await showVideos();
    await user.click(screen.getByRole("button", { name: "Play A short film" }));
    const close = screen.getByRole("button", { name: "Close project" });
    expect(close).toHaveFocus();
    await user.tab();
    expect(screen.getByTitle("YouTube player: A short film")).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
  });

  it("does not embed non-YouTube links", async () => {
    const user = await showVideos();
    await user.click(screen.getByRole("button", { name: "Play Unavailable film" }));
    const dialog = screen.getByRole("dialog", { name: "Unavailable film" });
    expect(within(dialog).getByText("This video is unavailable.")).toBeVisible();
    expect(dialog.querySelector("iframe")).not.toBeInTheDocument();
  });
});
