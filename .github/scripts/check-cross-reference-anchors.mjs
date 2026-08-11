#!/usr/bin/env node
/**
 * check-cross-reference-anchors.mjs
 *
 * ENFORCING checker for cross-reference anchors.
 *
 * Scans tracked `.md` files for cross-reference anchors of the two forms
 * used across the corpus:
 *
 *   - markdown links:   [text](relative/path.md#heading-slug)
 *                       [text](relative/path.md:123-145)
 *   - inline citations: `relative/path.md#heading-slug`
 *                       `relative/path.md:123` / `relative/path.md:123-145`
 *
 * For every anchor found, this script verifies:
 *   1. The target file resolves (relative to the citing file, relative to the
 *      repo root, or via the same basename-alias table build.mjs uses for the
 *      compiled site) and exists on disk.
 *   2. A `:line` or `:line-line` anchor falls within the target file's line
 *      count.
 *   3. A `#heading-slug` anchor matches an actual heading in the target file,
 *      slugified the same way build.mjs's `slugifyHeading` does.
 *   4. If the anchor is immediately followed by a quoted phrase — e.g.
 *      `[...](path.md#heading), "Evidence means"` — that phrase must appear
 *      verbatim (whitespace-normalized) near the anchor's target: within the
 *      cited line range (+/- a few lines of slack) for line anchors, or
 *      within that heading's section for heading anchors. This is the check
 *      that catches a spliced or misattributed quotation, not just a dead
 *      link.
 *
 * Any failure fails the build. Unlike the numeric-claim citation check (still
 * warn-only pending citation ledger population), this check is enforcing:
 * cross-reference anchor repair across the corpus is already done.
 *
 * Usage: node .github/scripts/check-cross-reference-anchors.mjs
 */

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..", "..");

// Bare-basename aliases a citing file may use instead of a repo-root-relative
// path, mirrored from build.mjs's `sourceAliases` map (kept in sync manually
// — see build.mjs if the site's canonical file layout changes).
const BASENAME_ALIASES = new Map([
  ["adoption-enterprise.md", "adoption/enterprise.md"],
  ["adoption-metrics.md", "adoption/metrics.md"],
  ["adoption-path.md", "adoption/path.md"],
  ["adoption-pilot.md", "adoption/pilot.md"],
  ["adoption-playbook.md", "adoption/playbook.md"],
  ["adoption-roles.md", "adoption/roles.md"],
  ["adoption-vmodel.md", "adoption/vmodel.md"],
  ["beyond_agile.md", "beyond-agile/main.md"],
  ["beyond-agile-failures.md", "beyond-agile/failures.md"],
  ["beyond-agile-landscape.md", "beyond-agile/landscape.md"],
  ["beyond-agile-sources.md", "beyond-agile/sources.md"],
  ["companion-frameworks.md", "companion/frameworks.md"],
  ["companion-guide.md", "companion/guide.md"],
  ["companion-patterns.md", "companion/patterns.md"],
  ["companion-principles.md", "companion/principles.md"],
  ["companion-re-framework.md", "companion/re-framework.md"],
  ["companion-reference.md", "companion/reference.md"],
  ["manifesto.md", "manifesto/manifesto.md"],
  ["manifesto-done.md", "manifesto/manifesto-done.md"],
  ["manifesto-principles.md", "manifesto/manifesto-principles.md"],
  ["manifesto-principles-01.md", "manifesto/manifesto-principles-01.md"],
  ["manifesto-principles-02.md", "manifesto/manifesto-principles-02.md"],
  ["manifesto-principles-03.md", "manifesto/manifesto-principles-03.md"],
  ["manifesto-principles-04.md", "manifesto/manifesto-principles-04.md"],
  ["manifesto-principles-05.md", "manifesto/manifesto-principles-05.md"],
  ["manifesto-principles-06.md", "manifesto/manifesto-principles-06.md"],
  ["manifesto-principles-07.md", "manifesto/manifesto-principles-07.md"],
  ["manifesto-principles-08.md", "manifesto/manifesto-principles-08.md"],
  ["manifesto-principles-09.md", "manifesto/manifesto-principles-09.md"],
  ["manifesto-principles-10.md", "manifesto/manifesto-principles-10.md"],
  ["manifesto-principles-11.md", "manifesto/manifesto-principles-11.md"],
  ["manifesto-principles-12.md", "manifesto/manifesto-principles-12.md"],
  ["manifesto-evolution-plan.md", "manifesto/manifesto-evolution-plan.md"],
]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function listTrackedMarkdownFiles() {
  const out = execSync("git ls-files -- '*.md'", {
    cwd: REPO_ROOT,
    encoding: "utf8",
  });
  return out.split("\n").filter(Boolean);
}

// Mirrors build.mjs's slugifyHeading exactly, so anchors validated here match
// what the compiled site actually generates.
function slugifyHeading(raw) {
  return raw
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function headingSlugs(lines) {
  const slugs = new Set();
  for (const line of lines) {
    const m = line.match(/^\s{0,3}#{1,6}\s+(.+?)\s*#*\s*$/);
    if (m) {
      // Strip an explicit {#custom-id} attribute if present and register that
      // id verbatim (it overrides the auto-slug), in addition to the
      // auto-generated slug of the heading text.
      const attr = m[1].match(/\{#([A-Za-z0-9_-]+)\}\s*$/);
      if (attr) slugs.add(attr[1]);
      const text = m[1].replace(/\{#[A-Za-z0-9_-]+\}\s*$/, "").trim();
      slugs.add(slugifyHeading(text));
    }
    // Explicit HTML anchors, e.g. <a id="ref-1"></a> or <a name="ref-1">.
    for (const am of line.matchAll(/<a\s+(?:id|name)=["']([^"']+)["']/gi)) {
      slugs.add(am[1]);
    }
  }
  return slugs;
}

// Returns the [startLine, endLine] (1-indexed, inclusive) of the section
// starting at `headingLineIdx` (0-indexed), ending right before the next
// heading of the same or shallower depth, or EOF.
function sectionRange(lines, headingLineIdx) {
  const headingMatch = lines[headingLineIdx].match(/^\s{0,3}(#{1,6})\s/);
  const depth = headingMatch ? headingMatch[1].length : 6;
  let end = lines.length;
  for (let i = headingLineIdx + 1; i < lines.length; i++) {
    const m = lines[i].match(/^\s{0,3}(#{1,6})\s/);
    if (m && m[1].length <= depth) {
      end = i; // 0-indexed exclusive -> becomes 1-indexed inclusive end below
      break;
    }
  }
  return [headingLineIdx + 1, end];
}

// Whitespace-normalized, lowercased comparison key. Case is deliberately
// ignored: a citation quoting mid-sentence text often re-cases the leading
// word (e.g. "When X" -> "when X"), which is not a misquotation.
function normalizeWhitespace(s) {
  return s.replace(/\s+/g, " ").trim().toLowerCase();
}

function fileCache() {
  const cache = new Map();
  return (absPath) => {
    if (!cache.has(absPath)) {
      if (!existsSync(absPath)) {
        cache.set(absPath, null);
      } else {
        const content = readFileSync(absPath, "utf8");
        cache.set(absPath, {
          content,
          lines: content.split("\n"),
        });
      }
    }
    return cache.get(absPath);
  };
}

const getFile = fileCache();

// Resolve a cited path (as written in the source markdown) to a repo-root-
// relative path, trying: relative to the citing file's directory, relative
// to the repo root, and the basename-alias table.
function resolveTargetPath(citedPath, citingFileRelPath) {
  const candidates = [];

  const fromCiting = path.posix.normalize(
    path.posix.join(path.posix.dirname(citingFileRelPath), citedPath),
  );
  candidates.push(fromCiting);

  const fromRoot = path.posix.normalize(citedPath);
  candidates.push(fromRoot);

  if (BASENAME_ALIASES.has(citedPath)) {
    candidates.push(BASENAME_ALIASES.get(citedPath));
  }
  const bareName = citedPath.split("/").pop();
  if (BASENAME_ALIASES.has(bareName)) {
    candidates.push(BASENAME_ALIASES.get(bareName));
  }

  for (const candidate of candidates) {
    const abs = path.join(REPO_ROOT, candidate);
    if (getFile(abs)) return candidate;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Anchor extraction
// ---------------------------------------------------------------------------

// [text](path.md#heading) / [text](path.md:12) / [text](path.md:12-34)
const MD_LINK_RE =
  /\[([^\]]*)\]\((?!https?:\/\/)([^)\s]+\.md)((?:#[^)\s]+)|(?::\d+(?:[-–]\d+)?))?\)(?:,\s*"([^"]{3,120})")?/g;

// `path.md#heading` / `path.md:12` / `path.md:12-34`, not immediately part of
// a markdown link href (those are handled by MD_LINK_RE above).
const BACKTICK_CITE_RE =
  /`([A-Za-z0-9_./-]+\.md)((?:#[A-Za-z0-9_-]+)|(?::\d+(?:[-–]\d+)?))`(?:,?\s*"([^"]{3,120})")?/g;

function parseAnchorSuffix(suffix) {
  if (!suffix) return { heading: null, lineStart: null, lineEnd: null };
  if (suffix.startsWith("#")) {
    return { heading: suffix.slice(1), lineStart: null, lineEnd: null };
  }
  const m = suffix.match(/^:(\d+)(?:[-–](\d+))?$/);
  if (!m) return { heading: null, lineStart: null, lineEnd: null };
  return {
    heading: null,
    lineStart: Number(m[1]),
    lineEnd: m[2] ? Number(m[2]) : Number(m[1]),
  };
}

function extractAnchors(content) {
  const anchors = [];
  const seen = new Set();

  for (const re of [MD_LINK_RE, BACKTICK_CITE_RE]) {
    re.lastIndex = 0;
    let match;
    while ((match = re.exec(content)) !== null) {
      const isLink = re === MD_LINK_RE;
      const citedPath = isLink ? match[2] : match[1];
      const suffix = isLink ? match[3] : match[2];
      const quote = isLink ? match[4] : match[3];
      if (!suffix) continue; // bare nav links carry no anchor to verify

      const lineNo = content.slice(0, match.index).split("\n").length;
      const key = `${lineNo}:${citedPath}${suffix}`;
      if (seen.has(key)) continue;
      seen.add(key);

      anchors.push({
        citedPath,
        suffix,
        quote: quote || null,
        sourceLine: lineNo,
        ...parseAnchorSuffix(suffix),
      });
    }
  }
  return anchors;
}

// ---------------------------------------------------------------------------
// Verification
// ---------------------------------------------------------------------------

function verifyAnchor(anchor, citingFileRelPath, findings) {
  const targetRelPath = resolveTargetPath(anchor.citedPath, citingFileRelPath);
  const where = `${citingFileRelPath}:${anchor.sourceLine}`;
  const raw = `${anchor.citedPath}${anchor.suffix}`;

  if (!targetRelPath) {
    findings.push({
      file: citingFileRelPath,
      line: anchor.sourceLine,
      message: `Cross-reference \`${raw}\` does not resolve: target file not found.`,
    });
    return;
  }

  const target = getFile(path.join(REPO_ROOT, targetRelPath));

  if (anchor.heading !== null) {
    const slugs = headingSlugs(target.lines);
    if (!slugs.has(anchor.heading)) {
      findings.push({
        file: citingFileRelPath,
        line: anchor.sourceLine,
        message: `Cross-reference \`${raw}\` does not resolve: no heading slug "${anchor.heading}" in ${targetRelPath}.`,
      });
      return;
    }
    if (anchor.quote) {
      const headingIdx = target.lines.findIndex((l) => {
        const m = l.match(/^\s{0,3}#{1,6}\s+(.+?)\s*#*\s*$/);
        return m && slugifyHeading(m[1]) === anchor.heading;
      });
      const [start, end] = sectionRange(target.lines, headingIdx);
      const sectionText = normalizeWhitespace(
        target.lines.slice(start - 1, end).join(" "),
      );
      const wholeText = normalizeWhitespace(target.content);
      const needle = normalizeWhitespace(anchor.quote);
      if (!sectionText.includes(needle) && !wholeText.includes(needle)) {
        findings.push({
          file: citingFileRelPath,
          line: anchor.sourceLine,
          message: `Cross-reference \`${raw}\` does not resolve to the quoted text: "${anchor.quote}" not found in ${targetRelPath}.`,
        });
      }
    }
    return;
  }

  if (anchor.lineStart !== null) {
    if (anchor.lineStart < 1 || anchor.lineEnd > target.lines.length || anchor.lineStart > anchor.lineEnd) {
      findings.push({
        file: citingFileRelPath,
        line: anchor.sourceLine,
        message: `Cross-reference \`${raw}\` does not resolve: ${targetRelPath} has ${target.lines.length} lines.`,
      });
      return;
    }
    if (anchor.quote) {
      const slack = 5;
      const windowStart = Math.max(1, anchor.lineStart - slack);
      const windowEnd = Math.min(target.lines.length, anchor.lineEnd + slack);
      const windowText = normalizeWhitespace(
        target.lines.slice(windowStart - 1, windowEnd).join(" "),
      );
      const wholeText = normalizeWhitespace(target.content);
      const needle = normalizeWhitespace(anchor.quote);
      if (!windowText.includes(needle) && !wholeText.includes(needle)) {
        findings.push({
          file: citingFileRelPath,
          line: anchor.sourceLine,
          message: `Cross-reference \`${raw}\` does not resolve to the quoted text: "${anchor.quote}" not found near ${targetRelPath}:${anchor.lineStart}-${anchor.lineEnd}.`,
        });
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const files = listTrackedMarkdownFiles();
  const findings = [];
  let anchorCount = 0;

  for (const relPath of files) {
    const abs = path.join(REPO_ROOT, relPath);
    const file = getFile(abs);
    if (!file) continue;
    const anchors = extractAnchors(file.content);
    anchorCount += anchors.length;
    for (const anchor of anchors) {
      verifyAnchor(anchor, relPath, findings);
    }
  }

  console.log(
    `check-cross-reference-anchors: scanned ${files.length} tracked .md files, ` +
      `${anchorCount} cross-reference anchor(s) checked, ${findings.length} broken.`,
  );

  for (const f of findings) {
    console.log(`::error file=${f.file},line=${f.line}::${f.message}`);
  }

  process.exit(findings.length > 0 ? 1 : 0);
}

main();
