#!/usr/bin/env node
import { cp, mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const templateRoot = resolve(packageRoot, "template");
const cwd = process.cwd();
const targetArg = process.argv[2];

function usage() {
  console.log("Create a Website.md starter site.");
  console.log("");
  console.log("Usage:");
  console.log("  npm create website-md@latest my-site");
  console.log("");
}

function toProjectName(value) {
  return value
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

if (!targetArg || targetArg === "--help" || targetArg === "-h") {
  usage();
  process.exit(targetArg ? 0 : 1);
}

const projectName = toProjectName(targetArg);

if (!projectName) {
  console.error("Please provide a valid project name.");
  process.exit(1);
}

const targetDir = resolve(cwd, projectName);

try {
  const info = await stat(targetDir);
  if (!info.isDirectory()) {
    console.error(`${projectName} exists and is not a directory.`);
    process.exit(1);
  }

  const entries = await readdir(targetDir);
  if (entries.length > 0) {
    console.error(`${projectName} already exists and is not empty.`);
    console.error("Choose a new folder or empty the existing one first.");
    process.exit(1);
  }
} catch (error) {
  if (error.code !== "ENOENT") throw error;
  await mkdir(targetDir, { recursive: true });
}

await cp(templateRoot, targetDir, { recursive: true });

const packageJsonPath = resolve(targetDir, "package.json");
const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
packageJson.name = projectName;
await writeFile(`${packageJsonPath}`, `${JSON.stringify(packageJson, null, 2)}\n`);

console.log(`Created ${projectName}`);
console.log("");
console.log("Next steps:");
console.log(`  cd ${projectName}`);
console.log("  npm run dev");
console.log("");
console.log("Then open:");
console.log("  http://localhost:4177");
console.log("");
console.log("Ask your AI agent:");
console.log("  Use WEBSITE.md, DESIGN.md, COPY.md, and SEO.md to customize this site.");
