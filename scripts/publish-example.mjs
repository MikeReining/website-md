#!/usr/bin/env node
import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const exampleSource = resolve(root, "examples/simple-consultant");
const repoName = process.argv[2] ?? "website-md-simple-consultant";
const dryRun = process.argv.includes("--dry-run");

const workDir = resolve("/tmp", `publish-${repoName}`);

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { stdio: "inherit", ...options });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

console.log(`Preparing standalone example repo: ${repoName}`);

if (dryRun) {
  console.log(`Would copy ${exampleSource} → ${workDir}`);
  console.log(`Would run: gh repo create ${repoName} --public --source ${workDir} --push`);
  console.log("Then deploy dist/ with your host (Vercel recommended).");
  process.exit(0);
}

await rm(workDir, { recursive: true, force: true });
await mkdir(workDir, { recursive: true });
await cp(exampleSource, workDir, { recursive: true });

run("git", ["init"], { cwd: workDir });
run("git", ["add", "."], { cwd: workDir });
run("git", ["commit", "-m", "Initial Rivera Consulting Website.md example"], { cwd: workDir });

const gh = spawnSync("gh", ["auth", "status"], { encoding: "utf8" });
if (gh.status !== 0) {
  console.error("GitHub CLI is not authenticated. Run: gh auth login");
  console.error(`Example is ready locally at ${workDir}`);
  process.exit(1);
}

run("gh", ["repo", "create", repoName, "--public", "--source", ".", "--remote", "origin", "--push"], { cwd: workDir });

const repoUrl = spawnSync("gh", ["repo", "view", "--json", "url", "-q", ".url"], {
  cwd: workDir,
  encoding: "utf8"
});

console.log("\nStandalone example repo pushed.");
if (repoUrl.stdout.trim()) console.log(`Repo: ${repoUrl.stdout.trim()}`);
console.log("\nNext: deploy from the repo root");
console.log("  cd", workDir);
console.log("  npm run build");
console.log("  npx vercel --prod");
console.log("\nAfter deploy, add the live URL to src/examples/simple-consultant/index.html");
