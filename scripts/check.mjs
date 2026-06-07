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
const requiredRoutes = [
  "src/index.html",
  "src/spec/index.html",
  "src/examples/index.html",
  "src/guides/create-site/index.html",
  "src/guides/replace-squarespace/index.html",
  "src/docs/cli/index.html"
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

async function absoluteExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function isExternalRef(ref) {
  return /^(https?:|data:|mailto:|tel:)/i.test(ref);
}

async function localAssetExists(file, ref) {
  const cleanRef = ref.split("#")[0].split("?")[0];
  if (!cleanRef || isExternalRef(cleanRef)) return true;
  const assetPath = cleanRef.startsWith("/")
    ? resolve(root, "src", cleanRef.slice(1))
    : resolve(dirname(file), cleanRef);
  return absoluteExists(assetPath);
}

function getAttrValue(match) {
  return match[3] ?? match[4] ?? match[5] ?? "";
}

function checkUnsafeHtml(html, label) {
  for (const match of html.matchAll(/\s(href|src|action|formaction)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/gi)) {
    const name = match[1];
    const value = getAttrValue(match).trim();
    if (/^javascript:/i.test(value)) failures.push(`${label} has unsafe ${name} URL`);
  }

  for (const match of html.matchAll(/\son[a-z][\w:-]*\s*=/gi)) {
    failures.push(`${label} has unsafe event attribute: ${match[0].trim().replace("=", "")}`);
  }

  for (const match of html.matchAll(/\s(style)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/gi)) {
    const value = getAttrValue(match);
    if (/javascript:|expression\s*\(/i.test(value)) failures.push(`${label} has unsafe style attribute`);
  }

  if (/<iframe\b[^>]*\ssrcdoc\s*=/i.test(html)) {
    failures.push(`${label} has unsafe iframe srcdoc attribute`);
  }
}

for (const file of requiredFiles) {
  if (!(await exists(file))) failures.push(`Missing ${file}`);
}

const websiteMd = await readFile(resolve(root, "WEBSITE.md"), "utf8");
for (const section of requiredSections) {
  if (!websiteMd.includes(section)) failures.push(`WEBSITE.md missing ${section}`);
}

for (const route of requiredRoutes) {
  if (!(await exists(route))) failures.push(`Missing route file ${route}`);
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
  checkUnsafeHtml(html, label);

  for (const match of html.matchAll(/<img\b[^>]*\ssrc="([^"]*)"/gi)) {
    const src = match[1];
    if (!src) {
      failures.push(`${label} has empty image src`);
    } else if (!(await localAssetExists(file, src))) {
      failures.push(`${label} image src missing file: ${src}`);
    }
  }

  for (const match of html.matchAll(/<[a-z][^>]*\sdata-wmd-source="([^"]+)"/gi)) {
    const source = match[1];
    const sourcePath = source.split("#")[0];
    if (!sourcePath) {
      failures.push(`${label} has empty data-wmd-source path`);
    } else if (sourcePath.startsWith("/") || sourcePath.startsWith("file:") || sourcePath.includes("://") || sourcePath.includes("..")) {
      failures.push(`${label} has non-repo-relative data-wmd-source: ${source}`);
    } else if (!(await exists(sourcePath))) {
      failures.push(`${label} data-wmd-source missing file: ${source}`);
    }
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Checks passed: ${htmlFiles.length} HTML pages, ${requiredFiles.length} instruction files.`);
