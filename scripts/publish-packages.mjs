#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dryRun = process.argv.includes("--dry-run");
const skipSmoke = process.argv.includes("--skip-smoke");

const packages = [
  resolve(root, "packages/create-website-md"),
  resolve(root, "packages/website-md")
];

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    ...options
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function npm(args, cwd) {
  run("npm", args, { cwd });
}

console.log(dryRun ? "Dry run: package publish checks only." : "Publishing Website.md npm packages.");

const whoami = spawnSync("npm", ["whoami"], { encoding: "utf8" });
if (!dryRun && whoami.status !== 0) {
  console.error("npm is not logged in. Run: npm login");
  process.exit(1);
}

if (!dryRun) {
  console.log(`npm user: ${whoami.stdout.trim()}`);
}

for (const dir of packages) {
  const pkg = JSON.parse(await readFile(resolve(dir, "package.json"), "utf8"));
  console.log(`\n→ ${pkg.name}@${pkg.version}`);

  npm(["pack", "--pack-destination", "/tmp"], dir);

  if (dryRun) {
    console.log(`  would publish ${pkg.name}@${pkg.version}`);
    continue;
  }

  npm(["publish", "--access", "public"], dir);
  console.log(`  published ${pkg.name}@${pkg.version}`);
}

if (dryRun || skipSmoke) {
  console.log("\nDone.");
  process.exit(0);
}

console.log("\nSmoke test: create-website-md");
const smokeName = `website-md-smoke-${Date.now()}`;
const smokeDir = resolve("/tmp", smokeName);
spawnSync("rm", ["-rf", smokeDir], { stdio: "inherit" });
run("npm", ["create", "website-md@latest", smokeName], { cwd: "/tmp" });
run("npm", ["run", "check"], { cwd: smokeDir });
run("npm", ["run", "build"], { cwd: smokeDir });

console.log("\nSmoke test: website-md check");
run("npx", ["website-md@latest", "check"], { cwd: root });

console.log("\nAll packages published and smoke tests passed.");
