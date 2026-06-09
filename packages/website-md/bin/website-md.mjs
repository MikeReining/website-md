#!/usr/bin/env node
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { checkProject, formatHumanResult } from "../lib/check.mjs";

const args = process.argv.slice(2);
const command = args[0];

function usage() {
  console.log("Website.md portable checker.");
  console.log("");
  console.log("Usage:");
  console.log("  npx website-md check [path] [--json]");
  console.log("");
}

if (!command || command === "--help" || command === "-h") {
  usage();
  process.exit(command ? 0 : 1);
}

if (command !== "check") {
  console.error(`Unknown command: ${command}`);
  usage();
  process.exit(1);
}

const json = args.includes("--json");
const pathArg = args.find((arg) => arg !== "check" && arg !== "--json");
const root = resolve(pathArg ?? process.cwd());

const result = await checkProject(root, { strictHtml: false });
const output = json ? JSON.stringify(result, null, 2) : formatHumanResult(result);

if (result.pass) {
  console.log(output);
  process.exit(0);
}

console.error(output);
process.exit(1);
