// @vitest-environment node
import { readdir } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";

describe("imported portfolio", () => {
  it("uses unique route IDs and a cover from each project's own images", () => {
    expect(projects.length).toBeGreaterThan(0);
    expect(new Set(projects.map(({ id }) => id)).size).toBe(projects.length);
    for (const project of projects) {
      expect(project.images.map(({ image }) => image)).toContain(project.coverImage.image);
    }
  });

  it("references each source image exactly once and resolves encoded paths to actual files", async () => {
    const actual = await readdir(path.resolve("public/projects"), { recursive: true, withFileTypes: true });
    const actualPaths = actual.filter((entry) => entry.isFile() && /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(entry.name)).map((entry) => path.resolve(entry.parentPath, entry.name)).sort();
    const imagePaths = projects.flatMap(({ images }) => images.map(({ image }) => path.resolve("public", ...image.slice(1).split("/").map(decodeURIComponent)))).sort();
    expect(imagePaths).toEqual(actualPaths);
    expect(new Set(imagePaths).size).toBe(actualPaths.length);
    expect(new Set(projects.flatMap(({ images }) => images.map(({ id }) => id))).size).toBe(imagePaths.length);
  });
});
