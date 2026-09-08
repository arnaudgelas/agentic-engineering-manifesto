#!/usr/bin/env node
/**
 * check-build-coverage.mjs — enumerate every .md file in this repo and
 * classify it as published / deliberately-unpublished / silently-unpublished,
 * verified against the BUILT index.html, not against build.mjs's own lists.
 *
 * Why this exists (T4.9, D-57, F20): build.mjs carries two independent
 * catalogs of "files that exist" — a `sourceAliases` map (used only to
 * resolve markdown links) and a `sections` array (the only thing actually
 * rendered into index.html). A file can sit in the first and be absent from
 * the second: its links resolve (to a standalone page or a dead anchor) but
 * its content never reaches the single-page site a reader loads. errata.md
 * and glossary.md were both found in that state by hand; this script makes
 * the check mechanical and repo-wide instead of by-eye and per-file.
 *
 * Method:
 *   1. Statically parse build.mjs's `sections` array (regex over the source
 *      text — this script does not execute build.mjs) to get the exact list
 *      of .md files that are compiled into index.html's sections.
 *   2. List every .md file under the repo (excluding node_modules).
 *   3. For each file NOT in the sections list, decide deliberately- vs
 *      silently-unpublished using two independent signals: (a) does any
 *      other .md file in the repo link to it (by filename), and (b) does it
 *      match a known repo-meta/template/log pattern.
 *   4. Independently verify the PUBLISHED claim against the actual built
 *      index.html: for every sections-listed file, confirm its section id
     *      (`id="<id>"`) is present, and spot-check a distinctive phrase drawn
 *      from the file's own first heading/subtitle line is present in the
 *      rendered text. This is the check that matters — build.mjs saying a
 *      file is listed is not proof it rendered.
 *
 * Usage:
 *   node tools/check-build-coverage.mjs            human-readable report
 *   node tools/check-build-coverage.mjs --json      machine-readable
 *
 * Run from the agentic-engineering-manifesto repo root (cwd-independent via
 * the path fix-up below).
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(REPO_ROOT);

const jsonMode = process.argv.includes("--json");

// ---------------------------------------------------------------------------
// 1. Parse build.mjs's sections array statically (no execution).
// ---------------------------------------------------------------------------
const buildSrc = readFileSync("build.mjs", "utf-8");
const secStart = buildSrc.indexOf("const sections = [");
const secEnd = buildSrc.indexOf("\nconst groups");
if (secStart === -1 || secEnd === -1) {
  console.error("Could not locate `sections` array in build.mjs — parser assumption broken.");
  process.exit(2);
}
const sectionsBlock = buildSrc.slice(secStart, secEnd);
const sectionFiles = [...sectionsBlock.matchAll(/"([^"]+\.md)"/g)].map((m) => m[1]);
const sectionFilesSet = new Set(sectionFiles);

// Section id for each file (best-effort: associate each file with the id of
// the entry block it appears nearest to, by scanning entry-by-entry).
const entryRe = /\{\s*id:\s*"([^"]+)"\s*,\s*file:\s*(\[[\s\S]*?\]|"[^"]+\.md")/g;
const fileToSectionId = new Map();
for (const m of sectionsBlock.matchAll(entryRe)) {
  const id = m[1];
  const filesRaw = m[2];
  const files = [...filesRaw.matchAll(/"([^"]+\.md)"/g)].map((x) => x[1]);
  for (const f of files) fileToSectionId.set(f, id);
}

// ---------------------------------------------------------------------------
// 2. Parse the alias map (informational — shows which unpublished files are
//    still link-resolvable, i.e. present in the "first list" the defect
//    describes).
// ---------------------------------------------------------------------------
const aliasStart = buildSrc.indexOf("const sourceAliases = new Map([");
const aliasEnd = buildSrc.indexOf("]);", aliasStart);
const aliasBlock = buildSrc.slice(aliasStart, aliasEnd);
const aliasTargets = new Set(
  [...aliasBlock.matchAll(/\[\s*"[^"]+"\s*,\s*"([^"]+\.md)"\s*\]/g)].map((m) => m[1]),
);

// ---------------------------------------------------------------------------
// 3. List every .md file in the repo.
// ---------------------------------------------------------------------------
function listMd(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const full = path.posix.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listMd(full));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      out.push(full);
    }
  }
  return out;
}
const allMd = listMd(".").map((f) => f.replace(/^\.\//, "")).sort();

// ---------------------------------------------------------------------------
// 4. Deliberate-unpublished patterns — stated reasons, not guesses.
// ---------------------------------------------------------------------------
const deliberateRules = [
  { test: (f) => f === "AUTHORS.md", reason: "repo-meta: contributor roster, read by build.mjs directly (readAuthors), not rendered as a section" },
  { test: (f) => f === "CONTRIBUTING.md", reason: "repo-meta: contribution guide, linked from the authors card, not narrative manifesto content" },
  { test: (f) => f === "governance/_swarm-changelog.md", reason: "machine-generated changelog log, not authored content" },
  { test: (f) => f.startsWith("review/"), reason: "review/audit tooling (prompts, test fixtures, skill scripts) used to evaluate the manifesto, not manifesto content itself" },
];

function deliberateReason(f) {
  for (const rule of deliberateRules) {
    if (rule.test(f)) return rule.reason;
  }
  return null;
}

// ---------------------------------------------------------------------------
// 5. For every non-section file, check whether other .md sources link to it
//    (by basename — cheap but sufficient to show "working links point at
//    it", the defect's own phrase) and whether it's in the alias map.
// ---------------------------------------------------------------------------
function referencingFiles(target) {
  const base = path.basename(target);
  const refs = [];
  for (const f of allMd) {
    if (f === target) continue;
    const text = readFileSync(f, "utf-8");
    if (text.includes(base)) refs.push(f);
  }
  return refs;
}

// ---------------------------------------------------------------------------
// 6. Verify PUBLISHED files against the actual built index.html — not
//    against build.mjs. Two independent checks per file: section id anchor,
//    and a distinctive phrase (first non-blank content line after the H1).
// ---------------------------------------------------------------------------
const indexHtmlPath = "index.html";
const indexHtml = existsSync(indexHtmlPath) ? readFileSync(indexHtmlPath, "utf-8") : null;
// Visible-text comparison, tags stripped — a markdown phrase that spans a
// **bold** or _italic_ run has an HTML tag inserted mid-phrase in the raw
// markup, which defeats a raw substring search; stripping tags first (same
// method D-55 used) makes the phrase check robust to that.
const indexHtmlText = indexHtml ? indexHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ") : null;

function distinctivePhrase(file) {
  const text = readFileSync(file, "utf-8");
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  // Skip headings, blockquotes, fences, and lines containing a markdown link
  // or image (their href gets rewritten by the build, so the raw markdown
  // text never appears verbatim in the rendered HTML). Take the first plain
  // prose line of reasonable length.
  for (const line of lines) {
    if (/^#{1,6}\s+/.test(line)) continue;
    if (/^>/.test(line)) continue;
    if (/^```/.test(line)) continue;
    if (/^[-*]\s/.test(line)) continue;
    if (/^<!--/.test(line)) continue;
    if (/\]\(/.test(line) || /^!\[/.test(line)) continue;
    if (line.length > 20 && line.length < 200) return line.replace(/[*_`]/g, "").slice(0, 60);
  }
  return null;
}

// marked HTML-escapes quotes/apostrophes as entities; normalize both sides
// (strip quote-like characters entirely) before comparing so that a real
// content match isn't reported as missing over punctuation encoding.
function normalizeForMatch(s) {
  return s
    .replace(/&quot;|&#39;|&#x27;/g, "")
    .replace(/['"’‘“”]/g, "");
}

function verifyPublished(file) {
  if (!indexHtml) return { ok: false, method: "index.html not found — run npm run build first" };
  const id = fileToSectionId.get(file);
  const idOk = id ? indexHtml.includes(`id="${id}"`) : false;
  const phrase = distinctivePhrase(file);
  const phraseOk = phrase
    ? normalizeForMatch(indexHtmlText).includes(normalizeForMatch(phrase))
    : null;
  return { ok: idOk && (phraseOk !== false), id, idOk, phrase, phraseOk, method: `grep id="${id}" index.html; tag-stripped, quote-normalized phrase match` };
}

// ---------------------------------------------------------------------------
// Classify.
// ---------------------------------------------------------------------------
const published = [];
const deliberatelyUnpublished = [];
const silentlyUnpublished = [];

for (const f of allMd) {
  if (sectionFilesSet.has(f)) {
    const v = verifyPublished(f);
    published.push({ file: f, ...v });
    continue;
  }
  const reason = deliberateReason(f);
  if (reason) {
    deliberatelyUnpublished.push({ file: f, reason });
    continue;
  }
  const refs = referencingFiles(f);
  const inAliasMap = aliasTargets.has(f);
  silentlyUnpublished.push({
    file: f,
    inAliasMap,
    referencedBy: refs,
    referencedByCount: refs.length,
  });
}

// ---------------------------------------------------------------------------
// Report.
// ---------------------------------------------------------------------------
if (jsonMode) {
  console.log(JSON.stringify({ published, deliberatelyUnpublished, silentlyUnpublished }, null, 2));
  process.exit(0);
}

console.log(`Total .md files: ${allMd.length}`);
console.log(`  Published (in build.mjs sections list, verified against index.html): ${published.length}`);
console.log(`  Deliberately unpublished (repo-meta/tooling, reason stated): ${deliberatelyUnpublished.length}`);
console.log(`  Silently unpublished (not in sections list, not repo-meta): ${silentlyUnpublished.length}`);
console.log();

const failedVerify = published.filter((p) => !p.ok);
if (failedVerify.length) {
  console.log(`WARNING: ${failedVerify.length} file(s) are in build.mjs's sections list but FAILED index.html verification:`);
  for (const p of failedVerify) {
    console.log(`  - ${p.file} (id=${p.id ?? "?"} idOk=${p.idOk} phraseOk=${p.phraseOk} phrase="${p.phrase ?? ""}")`);
  }
  console.log();
}

console.log("-- Deliberately unpublished --");
for (const d of deliberatelyUnpublished) {
  console.log(`  ${d.file} — ${d.reason}`);
}
console.log();

console.log("-- Silently unpublished (candidates) --");
for (const s of silentlyUnpublished) {
  console.log(`  ${s.file}  [in alias map: ${s.inAliasMap}]  [referenced by ${s.referencedByCount} other .md file(s)]`);
}
