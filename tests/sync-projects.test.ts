// @vitest-environment node
import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const temporaryRoots: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

async function scan(files: string[]) {
  const root = await mkdtemp(path.join(tmpdir(), "portfolio-projects-"));
  temporaryRoots.push(root);
  const source = path.join(root, "projects");
  for (const filename of files) {
    const target = path.join(source, filename);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, "fixture image");
  }
  const destination = path.join(root, "projects.json");
  const result = spawnSync(process.execPath, ["scripts/sync-projects.mjs", source, destination], { encoding: "utf8" });
  expect(result.status, result.stderr).toBe(0);
  return JSON.parse(await readFile(destination, "utf8"));
}

describe("project folder import", () => {
  it("keeps both categories, readable names, safe URLs, and natural cover order", async () => {
    const data = await scan([
      "Graphics/Health & care/স্বল্পমূল্যে সেবা (1).png",
      "Photography/City walks/photo 10.jpg",
      "Photography/City walks/photo 2.jpg",
      "Photography/City walks/notes.txt",
    ]);
    expect(Object.keys(data)).toEqual(["Photography", "Graphics"]);
    expect(data.Photography).toHaveLength(1);
    expect(data.Graphics).toHaveLength(1);
    expect(data.Photography[0]).toMatchObject({ id: "photography-city-walks", title: "City walks", description: "" });
    expect(data.Photography[0].images.map((image: { title: string }) => image.title)).toEqual(["photo 2", "photo 10"]);
    expect(data.Photography[0].coverImage.image).toBe("/projects/Photography/City%20walks/photo%202.jpg");
    expect(data.Graphics[0].images[0].title).toBe("স্বল্পমূল্যে সেবা (1)");
    expect(data.Graphics[0].images[0].image).toBe("/projects/Graphics/Health%20%26%20care/%E0%A6%B8%E0%A7%8D%E0%A6%AC%E0%A6%B2%E0%A7%8D%E0%A6%AA%E0%A6%AE%E0%A7%82%E0%A6%B2%E0%A7%8D%E0%A6%AF%E0%A7%87%20%E0%A6%B8%E0%A7%87%E0%A6%AC%E0%A6%BE%20%281%29.png");
  });

  it("honors an explicit cover file and extracts only valid filename dates", async () => {
    const data = await scan([
      "Photography/Dated/20240229121212_IMG_1.jpg",
      "Photography/Dated/20240229131313_IMG_2.jpg",
      "Photography/Undated/20230230121212_IMG_1.jpg",
      "Photography/Undated/photo 1.jpg",
      "Photography/Undated/cover.png",
    ]);
    const [dated, undated] = data.Photography;
    expect(dated.date).toBe("2024-02-29");
    expect(dated.images.map((image: { date?: string }) => image.date)).toEqual(["2024-02-29", "2024-02-29"]);
    expect(undated.coverImage.image).toBe("/projects/Photography/Undated/cover.png");
    expect(undated).not.toHaveProperty("date");
    for (const image of undated.images) expect(image).not.toHaveProperty("date");
  });
});
