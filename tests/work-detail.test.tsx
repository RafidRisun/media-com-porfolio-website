import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { GalleryProvider, ImageCard } from "@/components/gallery";
import WorkDetailPage, { generateMetadata, generateStaticParams } from "@/app/works/[id]/page";

async function renderProject(id: string) {
  const page = await WorkDetailPage({ params: Promise.resolve({ id }) });
  return render(<GalleryProvider>{page}</GalleryProvider>);
}

describe("project detail", () => {
  it("omits the modal date element when an image has no date", async () => {
    const user = userEvent.setup();
    render(<GalleryProvider><ImageCard item={{ id: "undated", title: "An undated image", image: "/images/placeholder.svg", alt: "Undated image" }} /></GalleryProvider>);
    await user.click(screen.getByRole("button", { name: "View An undated image" }));
    expect(screen.getByRole("dialog").querySelector("time")).not.toBeInTheDocument();
  });

  it.each([
    ["photography-birulia-zamindar-bari", "Photography", "Birulia Zamindar Bari"],
    ["photography-jolshiri-park", "Photography", "Jolshiri Park"],
    ["photography-street-photography", "Photography", "Street Photography"],
    ["photography-tajhat-zamindar-bari", "Photography", "Tajhat Zamindar Bari"],
    ["graphics-uphcsdp-ii", "Graphics", "UPHCSDP-II"],
  ])("shows the category and project title with a return link for %s", async (id, category, title) => {
    await renderProject(id);
    expect(screen.getByText(category, { exact: true })).toBeVisible();
    expect(screen.getByText(title, { exact: true })).toBeVisible();
    expect(screen.getByRole("link", { name: "Return to works" })).toHaveAttribute("href", "/works");
  });

  it("shows only the requested project's images", async () => {
    await renderProject("photography-jolshiri-park");
    const gallery = screen.getByRole("region", { name: "Jolshiri Park images" });
    expect(within(gallery).getAllByRole("button")).toHaveLength(12);
    expect(within(gallery).getByRole("button", { name: "View 20221026120048_IMG_2103 (1)" })).toBeVisible();
    expect(screen.queryByRole("button", { name: "View 20221130131024_IMG_3160" })).not.toBeInTheDocument();
  });

  it("opens the clicked image with its known date in the shared modal", async () => {
    const user = userEvent.setup();
    await renderProject("photography-birulia-zamindar-bari");
    const trigger = screen.getByRole("button", { name: "View 20221130131024_IMG_3160" });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "20221130131024_IMG_3160" });
    expect(within(dialog).getByText("30/11/2022")).toBeVisible();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("opens an undated image without empty metadata", async () => {
    const user = userEvent.setup();
    await renderProject("photography-street-photography");
    await user.click(screen.getByRole("button", { name: "View _MG_0004" }));
    const dialog = screen.getByRole("dialog", { name: "_MG_0004" });
    expect(dialog).toBeVisible();
    expect(dialog).not.toHaveAttribute("aria-describedby");
    expect(dialog.querySelector("p")).not.toBeInTheDocument();
    expect(dialog.querySelector("time")).not.toBeInTheDocument();
  });

  it("builds real project routes and metadata", async () => {
    expect(new Set(generateStaticParams().map(({ id }) => id))).toEqual(new Set([
      "photography-birulia-zamindar-bari", "photography-jolshiri-park",
      "photography-street-photography", "photography-tajhat-zamindar-bari", "graphics-uphcsdp-ii",
    ]));
    await expect(generateMetadata({ params: Promise.resolve({ id: "graphics-uphcsdp-ii" }) })).resolves.toEqual({ title: "UPHCSDP-II" });
  });

  it("returns a 404 for an unknown project", async () => {
    await expect(WorkDetailPage({ params: Promise.resolve({ id: "missing-project" }) })).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
  });
});
