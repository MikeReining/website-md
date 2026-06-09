import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { checkProject, formatHumanResult } from "../packages/website-md/lib/check.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const requiredRoutes = [
  "src/index.html",
  "src/spec/index.html",
  "src/examples/index.html",
  "src/examples/simple-consultant/index.html",
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

const result = await checkProject(root, { strictHtml: true });

for (const route of requiredRoutes) {
  if (!(await exists(route))) failures.push(`Missing route file ${route}`);
}

const allFailures = [...result.failures, ...failures];

if (allFailures.length) {
  console.error(formatHumanResult({ ...result, pass: false, failures: allFailures }));
  process.exit(1);
}

console.log(formatHumanResult(result));
console.log(`Route checks passed: ${requiredRoutes.length} required pages.`);
