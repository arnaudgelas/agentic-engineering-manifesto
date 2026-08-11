#!/usr/bin/env node
/**
 * check-numeric-claim-citations.mjs
 *
 * WARN-ONLY checker for numeric-claim citations.
 *
 * Scans tracked `.md` files for lines containing a numeric claim (a percentage,
 * a "N of M" / "N models" / "N tasks" style figure, or another bare statistic)
 * and flags lines where no citation or claim-ledger reference is found nearby
 * (same line, or the line immediately before/after).
 *
 * A "citation or ledger reference" is any of:
 *   - a markdown link:            [text](https://...)
 *   - a bracketed footnote ref:   [12]  or  [^12]
 *   - an inline URL:              https://...
 *   - a claim-ledger id:          CL-0001  (see evidence/claim-ledger-schema.md)
 *   - an arXiv identifier:        arXiv:XXXX.XXXXX or arxiv.org/...
 *
 * IMPORTANT — this job is WARN-ONLY and MUST stay warn-only until the citation
 * ledger (evidence/claim-ledger.jsonl, schema in evidence/claim-ledger-schema.md)
 * is actually populated:
 *   - evidence/claim-ledger.jsonl currently holds exactly one worked example row.
 *     The corpus-wide population pass (e.g. `beyond-agile/sources.md`'s ~60
 *     entries, plus the regulatory/domains corpus) has not run yet.
 *   - Enforcing mode against a corpus whose ledger is ~99% unpopulated would fail
 *     nearly every tracked file and would not reflect a real citation defect —
 *     it would just be noise.
 *
 * DO NOT flip this script's exit code to non-zero on findings, and do not remove
 * the "warn only, never fail" behavior below, until the ledger is populated
 * across the corpus and the allowlist below has been reviewed down to
 * justified entries only.
 */

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..", "..");
const ALLOWLIST_PATH = path.join(REPO_ROOT, "evidence", "citation-check-allowlist.txt");

// Heuristic numeric-claim patterns. Deliberately conservative (misses are fine
// for a warn-only job; the goal is a useful signal, not exhaustive recall).
const NUMERIC_CLAIM_RE =
  /\b\d+(?:\.\d+)?\s?%|\b\d+\s?(?:of|out of)\s?\d+\b|\b\d+(?:\.\d+)?[xX]\b|\b\d{1,3}(?:,\d{3})+\b/;

// Anything that counts as "has a citation nearby".
const CITATION_RE =
  /\[[^\]]*\]\(https?:\/\/[^)]+\)|\[\^?\d+\]|https?:\/\/\S+|\bCL-\d{4}\b|arXiv:\S+|arxiv\.org\/\S+/i;

// Lines that are pure structure (tables' separator rows, headings-only, etc.)
// or otherwise unlikely to be prose claims — skip to cut noise.
const SKIP_LINE_RE = /^\s*(\|[\s-:|]+\||#{1,6}\s|```|~~~)/;

function listTrackedMarkdownFiles() {
  const out = execSync("git ls-files -- '*.md'", {
    cwd: REPO_ROOT,
    encoding: "utf8",
  });
  return out
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    // exclude vendored/third-party trees if any slip into tracked files
    .filter((f) => !f.startsWith("node_modules/"));
}

function loadAllowlist() {
  const set = new Set();
  try {
    const raw = readFileSync(ALLOWLIST_PATH, "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      // allowlist entries are "path/to/file.md:LINE  # justification"
      const entry = trimmed.split(/\s+#/)[0].trim();
      if (entry) set.add(entry);
    }
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }
  return set;
}

function hasNearbyCitation(lines, idx) {
  const window = [lines[idx - 1], lines[idx], lines[idx + 1]].filter(
    (l) => l !== undefined
  );
  return window.some((l) => CITATION_RE.test(l));
}

function checkFile(relPath, allowlist, findings) {
  const abs = path.join(REPO_ROOT, relPath);
  const content = readFileSync(abs, "utf8");
  const lines = content.split("\n");

  lines.forEach((line, i) => {
    if (SKIP_LINE_RE.test(line)) return;
    if (!NUMERIC_CLAIM_RE.test(line)) return;
    if (hasNearbyCitation(lines, i)) return;

    const lineNo = i + 1;
    const key = `${relPath}:${lineNo}`;
    if (allowlist.has(key)) return;

    findings.push({ file: relPath, line: lineNo, text: line.trim() });
  });
}

function main() {
  const allowlist = loadAllowlist();
  const files = listTrackedMarkdownFiles();
  const findings = [];

  for (const f of files) {
    checkFile(f, allowlist, findings);
  }

  console.log(
    `check-numeric-claim-citations: scanned ${files.length} tracked .md files, ` +
      `${findings.length} uncited numeric claim(s) found (warn-only, ` +
      `${allowlist.size} allowlisted).`
  );

  if (findings.length > 0) {
    console.log(
      "\n::warning::Numeric-claim citation check found " +
        `${findings.length} numeric claim(s) with no adjacent citation or ledger reference. ` +
        "This is WARN-ONLY pending citation ledger population — see " +
        "evidence/claim-ledger-schema.md and evidence/citation-check-allowlist.txt."
    );
    for (const f of findings) {
      console.log(`::warning file=${f.file},line=${f.line}::Uncited numeric claim: ${f.text}`);
    }
  }

  // WARN-ONLY: always exit 0. Do not change this until the ledger is populated
  // across the corpus and the enforcing-mode transition has been explicitly
  // approved (see the header comment above and the CI workflow's comment).
  process.exit(0);
}

main();
