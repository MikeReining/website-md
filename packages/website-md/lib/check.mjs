import { access, readFile, readdir, stat } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";

const REQUIRED_SECTIONS = [
  "## Site Identity",
  "## Primary User Goals",
  "## Site Structure",
  "## Canonical URLs",
  "## Content Sources",
  "## Editing Rules",
  "## Preview And Validation",
  "## Publishing"
];

const COMPANION_FILES = [
  "AGENTS.md",
  "DESIGN.md",
  "COPY.md",
  "SEO.md",
  "media.json",
  "HOSTING.md",
  "VERCEL.md"
];

const LEVEL_NAMES = {
  0: "Declared",
  1: "Checked",
  2: "Addressable",
  3: "Operable",
  4: "Optimizable"
};

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function extractReferencedFiles(text) {
  const refs = new Set();

  const contentSources = text.match(/## Content Sources[\s\S]*?(?=\n## |\n---|$)/i)?.[0] ?? "";
  for (const block of contentSources.matchAll(/```[\s\S]*?```/g)) {
    for (const line of block[0].split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("```") || trimmed.endsWith("/")) continue;
      if (/^(?:src\/|scripts\/)?[A-Za-z0-9_./-]+\.(md|json)$/i.test(trimmed)) {
        refs.add(trimmed);
      }
    }
  }

  for (const match of text.matchAll(/\b(?:Read|see|Include)\s+((?:`[^`]+\.(?:md|json)`(?:\s*(?:,|and)\s*)?)+)/gi)) {
    for (const file of match[1].matchAll(/`([^`]+)`/g)) refs.add(file[1].trim());
  }

  return refs;
}

function extractScriptCommands(text) {
  const commands = new Set();
  for (const match of text.matchAll(/npm run ([a-z][\w-]*)/gi)) {
    commands.add(match[1]);
  }
  return commands;
}

function isExternalRef(ref) {
  return /^(https?:|data:|mailto:|tel:)/i.test(ref);
}

async function localAssetExists(root, file, ref) {
  const cleanRef = ref.split("#")[0].split("?")[0];
  if (!cleanRef || isExternalRef(cleanRef)) return true;
  const assetPath = cleanRef.startsWith("/")
    ? resolve(root, "src", cleanRef.slice(1))
    : resolve(dirname(file), cleanRef);
  return fileExists(assetPath);
}

function getAttrValue(match) {
  return match[3] ?? match[4] ?? match[5] ?? "";
}

function checkUnsafeHtml(html, label, failures) {
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

async function collectHtmlFiles(dir) {
  const files = [];
  if (!(await fileExists(dir))) return files;

  for (const entry of await readdir(dir)) {
    const path = join(dir, entry);
    const info = await stat(path);
    if (info.isDirectory()) files.push(...(await collectHtmlFiles(path)));
    if (info.isFile() && extname(path) === ".html") files.push(path);
  }
  return files;
}

function relativePath(root, file) {
  return file.startsWith(`${root}/`) ? file.slice(root.length + 1) : file;
}

export async function checkProject(root, options = {}) {
  const failures = [];
  const warnings = [];
  const notes = [];
  let level = 0;

  const websitePath = resolve(root, "WEBSITE.md");
  if (!(await fileExists(websitePath))) {
    return {
      pass: false,
      level: 0,
      levelName: LEVEL_NAMES[0],
      failures: ["Missing WEBSITE.md"],
      warnings,
      notes
    };
  }

  level = 0;
  const websiteMd = await readFile(websitePath, "utf8");

  for (const section of REQUIRED_SECTIONS) {
    if (!websiteMd.includes(section)) failures.push(`WEBSITE.md missing ${section}`);
  }

  for (const ref of extractReferencedFiles(websiteMd)) {
    if (!(await fileExists(resolve(root, ref)))) {
      failures.push(`WEBSITE.md references missing file: ${ref}`);
    }
  }

  const packageJsonPath = resolve(root, "package.json");
  if (await fileExists(packageJsonPath)) {
    const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
    const scripts = packageJson.scripts ?? {};
    for (const command of extractScriptCommands(websiteMd)) {
      if (!scripts[command]) {
        failures.push(`package.json missing script referenced in WEBSITE.md: ${command}`);
      }
    }
  }

  const srcDir = resolve(root, "src");
  const htmlFiles = await collectHtmlFiles(srcDir);
  let hasSourceMappings = false;

  for (const file of htmlFiles) {
    const html = await readFile(file, "utf8");
    const label = relativePath(root, file);

    if (html.includes("data-wmd-source=")) hasSourceMappings = true;

    for (const match of html.matchAll(/<[a-z][^>]*\sdata-wmd-source="([^"]+)"/gi)) {
      const source = match[1];
      const sourcePath = source.split("#")[0];
      if (!sourcePath) {
        failures.push(`${label} has empty data-wmd-source path`);
      } else if (sourcePath.startsWith("/") || sourcePath.startsWith("file:") || sourcePath.includes("://") || sourcePath.includes("..")) {
        failures.push(`${label} has non-repo-relative data-wmd-source: ${source}`);
      } else if (!(await fileExists(resolve(root, sourcePath)))) {
        failures.push(`${label} data-wmd-source missing file: ${source}`);
      }
    }

    if (options.strictHtml) {
      if (!html.includes("<title>")) failures.push(`${label} missing <title>`);
      if (!html.includes('name="description"')) failures.push(`${label} missing meta description`);
      if (!html.includes('rel="canonical"')) failures.push(`${label} missing canonical link`);
      checkUnsafeHtml(html, label, failures);

      for (const match of html.matchAll(/<img\b[^>]*\ssrc="([^"]*)"/gi)) {
        const src = match[1];
        if (!src) {
          failures.push(`${label} has empty image src`);
        } else if (!(await localAssetExists(root, file, src))) {
          failures.push(`${label} image src missing file: ${src}`);
        }
      }
    }
  }

  if (!failures.length) level = 1;

  const hasContentCapabilities = websiteMd.includes("## Content Capabilities");
  const hasBlockFrontMatter = /wmd_[a-z_]+/i.test(websiteMd) || websiteMd.includes("## Block Front Matter");
  const hasMediaReferences = websiteMd.includes("media:") || websiteMd.includes("## Media References") || (await fileExists(resolve(root, "media.json")));
  const hasSourceAddressability = websiteMd.includes("## Source Addressability") || hasSourceMappings;
  const hasAnalytics = websiteMd.includes("## Analytics");
  const hasExperiments = websiteMd.includes("## Experiments") || websiteMd.includes("## A/B Testing");

  if (level >= 1 && hasSourceMappings) level = 2;

  if (level >= 2 && hasContentCapabilities && hasSourceAddressability && (hasBlockFrontMatter || hasMediaReferences)) {
    level = 3;
  }

  if (level >= 3 && hasAnalytics && hasExperiments) level = 4;

  if (level >= 1 && !hasSourceMappings && hasSourceAddressability) {
    notes.push("Source addressability is declared but rendered HTML has no data-wmd-source mappings yet.");
  }

  for (const companion of COMPANION_FILES) {
    if ((await fileExists(resolve(root, companion))) && !websiteMd.includes(companion)) {
      warnings.push(`Optional companion file exists but is not referenced in WEBSITE.md: ${companion}`);
    }
  }

  return {
    pass: failures.length === 0,
    level,
    levelName: LEVEL_NAMES[level],
    failures,
    warnings,
    notes,
    htmlPages: htmlFiles.length
  };
}

export function formatHumanResult(result) {
  const lines = [];
  if (result.pass) {
    lines.push(`Website.md check passed (Level ${result.level} — ${result.levelName}).`);
    if (result.htmlPages) lines.push(`${result.htmlPages} HTML page(s) checked.`);
  } else {
    lines.push(`Website.md check failed (Level ${result.level} — ${result.levelName}).`);
  }

  for (const failure of result.failures) lines.push(`- ${failure}`);
  for (const warning of result.warnings) lines.push(`- warning: ${warning}`);
  for (const note of result.notes) lines.push(`- note: ${note}`);
  return lines.join("\n");
}
