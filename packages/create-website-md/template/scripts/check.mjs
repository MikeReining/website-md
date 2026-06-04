import { access, readFile, readdir, stat } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const requiredFiles = ["WEBSITE.md", "DESIGN.md", "COPY.md", "SEO.md", "AGENTS.md"];
const requiredSections = [
  "## Site Identity",
  "## Primary User Goals",
  "## Site Structure",
  "## Canonical URLs",
  "## Content Sources",
  "## Editing Rules",
  "## Preview And Validation",
  "## Publishing"
];
const failures = [];

async function exists(path) {
  try {
    await access(resolve(root, path));
    return true;
  } catch {
    return false;
  }
}

for (const file of requiredFiles) {
  if (!(await exists(file))) failures.push(`Missing ${file}`);
}

const websiteMd = await readFile(resolve(root, "WEBSITE.md"), "utf8");
for (const section of requiredSections) {
  if (!websiteMd.includes(section)) failures.push(`WEBSITE.md missing ${section}`);
}

const htmlFiles = [];
async function collectHtml(dir) {
  for (const entry of await readdir(dir)) {
    const path = join(dir, entry);
    const info = await stat(path);
    if (info.isDirectory()) await collectHtml(path);
    if (info.isFile() && extname(path) === ".html") htmlFiles.push(path);
  }
}

await collectHtml(resolve(root, "src"));

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const label = file.replace(`${root}/`, "");
  if (!html.includes("<title>")) failures.push(`${label} missing <title>`);
  if (!html.includes('name="description"')) failures.push(`${label} missing meta description`);
  if (!html.includes('rel="canonical"')) failures.push(`${label} missing canonical link`);
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Checks passed: ${htmlFiles.length} HTML page, ${requiredFiles.length} instruction files.`);
