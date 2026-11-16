import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { GalleryProvider } from "@/components/gallery";
import HomePage from "@/app/page";

vi.mock("@/data/projects.json", async (importOriginal) => {
  const { default: data } = await importOriginal<{ default: typeof import("@/data/projects.json") }>();
  return {
    default: {
      ...data,
      Photography: [...data.Photography].reverse().map((project) => project.id === "photography-tajhat-zamindar-bari" ? { ...project, title: "Stories from Dhaka" } : project),
    },
  };
});

vi.mock("@/data/videos.json", () => ({ default: [{
  id: "video-2",
  title: "Conch Bangles of Old Dhaka",
  description: "The conch bangles film.",
  link: "https://youtu.be/2vJ5-LlL3sI",
  image: "",
}] }));

describe("featured projects", () => {
  it("keeps the selected projects in order and uses their JSON titles regardless of JSON order", () => {
    render(<GalleryProvider><HomePage /></GalleryProvider>);
    const titles = screen.getAllByRole("heading", { level: 2 })
      .map((heading) => heading.textContent?.replace(/\s+/g, " ").trim());
    expect(titles).toEqual(["Stories from Dhaka", "Conch Bangles of Old Dhaka", "UPHCSDP-II"]);
    expect(screen.getAllByRole("link", { name: "See Project" }).map((link) => link.getAttribute("href"))).toEqual([
      "/works/photography-tajhat-zamindar-bari", "/works/graphics-uphcsdp-ii",
    ]);
  });

  it("uses Shakha as a plain, noninteractive Home image", () => {
    render(<GalleryProvider><HomePage /></GalleryProvider>);
    const preview = screen.getByRole("region", { name: /Conch\s+Bangles of Old Dhaka/ });
    const image = within(preview).getByRole("img");
    const url = new URL(image.getAttribute("src")!, "http://localhost");
    expect(url.searchParams.get("url") ?? url.pathname).toBe("/images/shakha.png");
    expect(image.closest("button, a")).toBeNull();
    expect(screen.queryByRole("button", { name: "Play Conch Bangles of Old Dhaka" })).not.toBeInTheDocument();
  });

  it("opens the Conch Bangles video from See Project", async () => {
    const user = userEvent.setup();
    render(<GalleryProvider><HomePage /></GalleryProvider>);
    await user.click(screen.getByRole("button", {
      name: "See Project",
    }));
    const dialog = screen.getByRole("dialog", { name: "Conch Bangles of Old Dhaka" });
    expect(within(dialog).getByTitle("YouTube player: Conch Bangles of Old Dhaka"))
      .toHaveAttribute("src", "https://www.youtube-nocookie.com/embed/2vJ5-LlL3sI?playsinline=1&rel=0");
  });
});
