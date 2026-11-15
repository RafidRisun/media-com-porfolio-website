import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GalleryProvider } from "@/components/gallery";
import HomePage from "@/app/page";

vi.mock("@/data/projects.json", async (importOriginal) => {
  const { default: data } = await importOriginal<{ default: typeof import("@/data/projects.json") }>();
  return {
    default: {
      ...data,
      Photography: data.Photography.map((project, index) => index === 0 ? { ...project, title: "Stories from Dhaka" } : project),
    },
  };
});

describe("featured projects", () => {
  it("uses the featured project's JSON title after it is renamed", () => {
    render(<GalleryProvider><HomePage /></GalleryProvider>);
    expect(screen.getByRole("heading", { level: 2, name: /Stories\s+from Dhaka/ })).toBeVisible();
  });

  it("links each featured preview to its own project's gallery", () => {
    render(<GalleryProvider><HomePage /></GalleryProvider>);
    const links = screen.getAllByRole("link", { name: "See Project" });
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/works/photography-birulia-zamindar-bari", "/works/photography-jolshiri-park", "/works/photography-street-photography",
    ]);
    expect(screen.getByRole("button", { name: "View 20221130131024_IMG_3160" })).toBeVisible();
    expect(screen.getByRole("button", { name: "View 20221026120048_IMG_2103 (1)" })).toBeVisible();
    expect(screen.getByRole("button", { name: "View _MG_0004" })).toBeVisible();
    const closing = screen.getByRole("region", { name: "More about my work" });
    const closingImageUrl = new URL(closing.querySelector("img")!.getAttribute("src")!, "http://localhost");
    expect(closingImageUrl.searchParams.get("url")).toBe("/projects/Photography/Tajhat%20Zamindar%20Bari/20221007122632_IMG_0420.jpg");
  });
});
