import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const source = path.resolve(process.argv[2] ?? path.join(repositoryRoot, "public/projects"));
const destination = path.resolve(process.argv[3] ?? path.join(repositoryRoot, "src/data/projects.json"));
const collator = new Intl.Collator("en", { numeric: true });
const compareNames = (a, b) => collator.compare(a.name, b.name) || (a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
const imageExtension = /\.(avif|gif|jpe?g|png|svg|webp)$/i;

function slug(value) {
  return value.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{M}\p{N}]+/gu, "-").replace(/^-|-$/g, "");
}

function encodeSegment(value) {
  return encodeURIComponent(value).replace(/[!'()*]/g, (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`);
}

function filenameDate(filename) {
  const match = /^(\d{4})(\d{2})(\d{2})/.exec(filename);
  if (!match) return undefined;
  const value = `${match[1]}-${match[2]}-${match[3]}`;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value ? value : undefined;
}

const categories = (await readdir(source, { withFileTypes: true })).filter((entry) => entry.isDirectory()).sort(compareNames);
categories.sort((a, b) => Number(b.name === "Photography") - Number(a.name === "Photography"));
const data = {};
const projectIds = new Set();
const imageIds = new Set();

for (const category of categories) {
  const categoryPath = path.join(source, category.name);
  const folders = (await readdir(categoryPath, { withFileTypes: true })).filter((entry) => entry.isDirectory()).sort(compareNames);
  const projects = [];
  for (const folder of folders) {
    const filenames = (await readdir(path.join(categoryPath, folder.name), { withFileTypes: true }))
      .filter((entry) => entry.isFile() && imageExtension.test(entry.name)).sort(compareNames).map((entry) => entry.name);
    if (!filenames.length) continue;
    const id = `${slug(category.name)}-${slug(folder.name)}`;
    if (projectIds.has(id)) throw new Error(`Duplicate project ID: ${id}. Rename the conflicting folder.`);
    projectIds.add(id);
    const images = filenames.map((filename) => {
      const title = filename.slice(0, -path.extname(filename).length).trim();
      const imageId = `${id}-${slug(filename)}`;
      if (imageIds.has(imageId)) throw new Error(`Duplicate image ID: ${imageId}. Rename the conflicting file.`);
      imageIds.add(imageId);
      const date = filenameDate(filename);
      return {
        id: imageId,
        title,
        image: `/${["projects", category.name, folder.name, filename].map(encodeSegment).join("/")}`,
        alt: `${folder.name} — ${title}`,
        ...(date ? { date } : {}),
      };
    });
    const coverIndex = filenames.findIndex((filename) => /^cover\.[^.]+$/i.test(filename));
    const cover = images[coverIndex < 0 ? 0 : coverIndex];
    const date = images[0].date;
    projects.push({
      id,
      title: folder.name,
      description: "",
      ...(date && images.every((image) => image.date === date) ? { date } : {}),
      coverImage: { image: cover.image, alt: cover.alt },
      images,
    });
  }
  if (projects.length) data[category.name] = projects;
}

await mkdir(path.dirname(destination), { recursive: true });
await writeFile(destination, `${JSON.stringify(data, null, 2)}\n`, "utf8");
console.log(`Synced ${projectIds.size} projects and ${imageIds.size} images to ${path.relative(repositoryRoot, destination)}.`);
