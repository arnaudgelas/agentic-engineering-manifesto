#!/usr/bin/env node
/**
 * Build script: transforms manifesto markdown files into a print-ready PDF.
 *
 * Usage: node build-pdf.mjs
 * Output: manifesto.pdf
 */

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { marked } from "marked";

// ---------------------------------------------------------------------------
// Section definitions — same order as the HTML site
// ---------------------------------------------------------------------------
const sections = [
  { id: "overview", file: "README.md", title: "Overview", group: "overview" },
  { id: "manifesto", file: "manifesto-agentic-engineering.md", title: "The Manifesto", group: "manifesto" },
  { id: "principles", file: "manifesto-principles.md", title: "Twelve Principles", group: "manifesto" },
  { id: "done", file: "manifesto-done.md", title: "Definition of Done", group: "manifesto" },
  { id: "beyond-failures", file: "beyond-agile-failures.md", title: "Structural Failures", group: "beyond" },
  { id: "beyond-landscape", file: "beyond-agile-landscape.md", title: "Existing Frameworks", group: "beyond" },
  { id: "beyond-sources", file: "beyond-agile-sources.md", title: "Sources", group: "beyond" },
  { id: "companion-guide", file: "companion-guide.md", title: "Companion Guide", group: "companion" },
  { id: "companion-principles", file: "companion-principles.md", title: "Principle Guidance", group: "companion" },
  { id: "companion-frameworks", file: "companion-frameworks.md", title: "Frameworks", group: "companion" },
  { id: "companion-patterns", file: "companion-patterns.md", title: "Patterns", group: "companion" },
  { id: "companion-reference", file: "companion-reference.md", title: "Reference", group: "companion" },
  { id: "companion-re-framework", file: "companion-re-framework.md", title: "RE Framework", group: "companion" },
  { id: "adoption-playbook", file: "adoption-playbook.md", title: "Playbook", group: "adoption" },
  { id: "adoption-roles", file: "adoption-roles.md", title: "Roles", group: "adoption" },
  { id: "adoption-path", file: "adoption-path.md", title: "Adoption Path", group: "adoption" },
  { id: "adoption-pilot", file: "adoption-pilot.md", title: "First Pilot", group: "adoption" },
  { id: "adoption-metrics", file: "adoption-metrics.md", title: "Metrics", group: "adoption" },
];

const groups = {
  overview: { label: "Home", number: "I" },
  manifesto: { label: "The Manifesto", number: "II" },
  beyond: { label: "Beyond Agile", number: "III" },
  companion: { label: "Companion Guide", number: "IV" },
  adoption: { label: "Adoption", number: "V" },
};

const packageJson = JSON.parse(readFileSync("package.json", "utf-8"));
const repositoryUrl = packageJson.repository?.url?.replace(/^git\+/, "").replace(/\.git$/, "") || "";
const authors = readAuthors("AUTHORS.md");

function readAuthors(file) {
  try {
    const markdown = readFileSync(file, "utf-8");
    return markdown
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => /^[-*]\s+/.test(l))
      .map((l) => l.replace(/^[-*]\s+/, ""))
      .map((entry) => {
        const m = entry.match(/^(.*?)\s*\((.*?)\)\s*$/);
        return m ? { name: m[1].trim(), detail: m[2].trim() } : { name: entry, detail: "" };
      });
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Markdown → HTML conversion
// ---------------------------------------------------------------------------
marked.setOptions({ gfm: true, breaks: false });

function slugifyHeading(raw) {
  return raw
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function markdownToHtmlPath(file) {
  return file.replace(/\.md$/i, ".html");
}

function isExternalLink(href) {
  return /^(?:[a-z]+:)?\/\//i.test(href) || /^(?:mailto|tel):/i.test(href);
}

function splitHref(href) {
  const hashIndex = href.indexOf("#");
  const queryIndex = href.indexOf("?");
  const splitIndex =
    hashIndex === -1
      ? queryIndex
      : queryIndex === -1
        ? hashIndex
        : Math.min(hashIndex, queryIndex);

  if (splitIndex === -1) {
    return { pathPart: href, suffix: "" };
  }

  return {
    pathPart: href.slice(0, splitIndex),
    suffix: href.slice(splitIndex),
  };
}

function rewriteHref(href, currentSourceFile, currentOutputFile) {
  if (!href || href.startsWith("#") || isExternalLink(href)) {
    return href;
  }

  const { pathPart, suffix } = splitHref(href);
  if (!pathPart || !pathPart.endsWith(".md")) {
    return href;
  }

  const targetSourceFile = path.posix.normalize(
    path.posix.join(path.posix.dirname(currentSourceFile), pathPart),
  );
  const targetOutputFile = markdownToHtmlPath(targetSourceFile);
  const relativeTarget = path.posix.relative(
    path.posix.dirname(currentOutputFile),
    targetOutputFile,
  );

  return `${relativeTarget || "."}${suffix}`;
}

function createRenderer({ sourceFile, outputFile }) {
  const renderer = new marked.Renderer();

  renderer.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const raw = tokens.map((t) => t.raw || t.text || "").join("");
    return `<h${depth} id="${slugifyHeading(raw)}">${text}</h${depth}>`;
  };

  renderer.link = function ({ href, title, tokens }) {
    const text = this.parser.parseInline(tokens);
    const resolvedHref = rewriteHref(href, sourceFile, outputFile);
    const titleAttr = title ? ` title="${title}"` : "";
    return `<a href="${resolvedHref}"${titleAttr}>${text}</a>`;
  };

  return renderer;
}

function convertSection(section) {
  let md;
  try {
    md = readFileSync(section.file, "utf-8");
  } catch {
    console.warn(`Warning: could not read ${section.file}, skipping.`);
    return "";
  }

  // Strip first H1
  md = md.replace(/^#\s+.+\n+/, "");

  // Remove mermaid code blocks (can't render in print)
  md = md.replace(/```mermaid[\s\S]*?```/g, "");

  return marked.parse(md, {
    renderer: createRenderer({
      sourceFile: section.file,
      outputFile: "manifesto-print.html",
    }),
  });
}

// ---------------------------------------------------------------------------
// Core values and loop (for cover page)
// ---------------------------------------------------------------------------
const coreValues = [
  ["Iterative steering and alignment", "Rigid upfront specifications"],
  ["Verified outcomes with auditable evidence", "Fluent assertions of success"],
  ["Right-sized agent collaboration", "Monolithic god-agents"],
  ["Curated, high-signal context and memory", "Stateless sessions and noisy memory"],
  ["Tooling, telemetry, and observability", "Chat-based heroics"],
  ["Resilience under stress", "Performance in ideal conditions"],
];

const loopSteps = ["Specify", "Design", "Plan", "Execute", "Verify", "Validate", "Observe", "Learn", "Govern"];

// ---------------------------------------------------------------------------
// Build the print-optimised HTML document
// ---------------------------------------------------------------------------

function buildCover() {
  const date = new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long" });
  const authorLine = authors.map((a) => `${a.name}${a.detail ? ` (${a.detail})` : ""}`).join(", ") || "The Agentic Engineering Community";

  return `
  <div class="cover-page">
    <div class="cover-accent"></div>
    <div class="cover-content">
      <p class="cover-kicker">Manifesto &amp; Companion Guide</p>
      <h1 class="cover-title">The Agentic<br>Engineering<br>Manifesto</h1>
      <p class="cover-lede">Principles for building systems where humans steer intent, agents execute within governed boundaries, and verified outcomes are the only measure that matters.</p>
      <p class="cover-lede" style="font-size:10px;margin-top:3mm;">This is a living document. Agentic engineering is a fast-moving field, and this manifesto evolves continuously &mdash; informed by our own practices, what we witness in the field, and the new technologies, trends, and practices that emerge. Contributions are welcome.</p>

      <div class="cover-values">
        ${coreValues.map(([l, r]) => `<div class="cv-row"><span class="cv-left">${l}</span><span class="cv-over">over</span><span class="cv-right">${r}</span></div>`).join("")}
      </div>

      <div class="cover-loop">
        <span class="cover-loop-label">The Agentic Loop</span>
        <span class="cover-loop-steps">${loopSteps.map((s) => {
          const accent = s === "Verify" || s === "Validate" || s === "Govern";
          return `<span class="${accent ? "ls accent" : "ls"}">${s}</span>`;
        }).join('<span class="la">\u2192</span>')}<span class="la">\u21BB</span></span>
      </div>

      <div class="cover-meta">
        <span class="cover-author">${authorLine}</span>
        <span class="cover-date">${date}</span>
        ${repositoryUrl ? `<span class="cover-url">${repositoryUrl}</span>` : ""}
      </div>
    </div>
  </div>`;
}

function buildToc() {
  let html = '<div class="toc-page"><h2 class="toc-heading">Contents</h2>';
  let currentGroup = null;
  let sectionNum = 0;

  for (const s of sections) {
    if (s.group !== currentGroup) {
      if (currentGroup !== null) html += "</div>";
      currentGroup = s.group;
      html += `<div class="toc-group"><div class="toc-group-label">${groups[s.group].number}. ${groups[s.group].label}</div>`;
    }
    sectionNum++;
    html += `<a class="toc-entry" href="#${s.id}"><span class="toc-num">${sectionNum}.</span><span class="toc-title">${s.title}</span><span class="toc-dots"></span></a>`;
  }
  html += "</div></div>";
  return html;
}

function buildSections() {
  let html = "";
  let sectionNum = 0;
  let currentGroup = null;

  for (const s of sections) {
    const content = convertSection(s);
    sectionNum++;

    // Add part divider when entering a new group
    if (s.group !== currentGroup) {
      currentGroup = s.group;
      html += `<div class="part-divider"><span class="part-number">Part ${groups[s.group].number}</span><span class="part-label">${groups[s.group].label}</span></div>`;
    }

    html += `<section id="${s.id}" class="pdf-section">`;
    html += `<div class="section-header"><span class="section-num">${sectionNum}</span><h2 class="section-title">${s.title}</h2></div>`;
    html += `<div class="section-body">${content}</div>`;
    html += `</section>`;
  }
  return html;
}

const CSS = `
/* -------------------------------------------------------------------------
   PDF Print Stylesheet — The Agentic Engineering Manifesto
   Designed for A4 print via Puppeteer
   ------------------------------------------------------------------------- */

@page {
  size: A4;
  margin: 22mm 20mm 26mm 20mm;

  @bottom-center {
    content: counter(page);
    font: 500 9px/1 "Manrope", "Segoe UI", sans-serif;
    color: #8a7f73;
  }
}

@page :first {
  margin: 0;
  @bottom-center { content: none; }
}

:root {
  --bg: #ffffff;
  --text: #1a1613;
  --text-soft: #5f5549;
  --text-faint: #8a7f73;
  --accent: #9f2f24;
  --accent-soft: rgba(159, 47, 36, 0.08);
  --emerald: #1d6b57;
  --gold: #b57919;
  --line: rgba(60, 47, 34, 0.14);
  --line-strong: rgba(60, 47, 34, 0.28);
  --font-serif: "Fraunces", Georgia, "Times New Roman", serif;
  --font-sans: "Manrope", "Segoe UI", sans-serif;
  --font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
}

*, *::before, *::after { box-sizing: border-box; }

html { font-size: 10.5px; }

body {
  margin: 0;
  padding: 0;
  color: var(--text);
  font: 500 1rem/1.78 var(--font-sans);
  background: var(--bg);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* ----- Cover page -------------------------------------------------------- */

.cover-page {
  page-break-after: always;
  width: 210mm;
  height: 297mm;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  background: #f8f5f0;
}

.cover-accent {
  position: absolute;
  top: 0; right: 0;
  width: 55%;
  height: 100%;
  background:
    linear-gradient(160deg, var(--accent) 0%, #6b1d15 100%);
  clip-path: polygon(28% 0, 100% 0, 100% 100%, 0 100%);
}

.cover-content {
  position: relative;
  z-index: 1;
  padding: 40mm 22mm 28mm 22mm;
  width: 100%;
}

.cover-kicker {
  font: 600 10px/1 var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--accent);
  margin: 0 0 10mm;
}

.cover-title {
  font: 700 46px/1.08 var(--font-serif);
  color: var(--text);
  margin: 0 0 8mm;
  max-width: 55%;
}

.cover-lede {
  font: 500 12px/1.6 var(--font-sans);
  color: var(--text-soft);
  max-width: 54%;
  margin: 0 0 10mm;
}

.cover-values {
  max-width: 58%;
  margin: 0 0 8mm;
  border-top: 1px solid var(--line);
  padding-top: 4mm;
}

.cv-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-size: 9.5px;
  line-height: 1.5;
  padding: 1.5mm 0;
}

.cv-left { font-weight: 700; color: var(--text); flex: 1; }
.cv-over { font-weight: 500; color: var(--text-faint); font-style: italic; flex-shrink: 0; }
.cv-right { color: var(--text-faint); flex: 1; text-align: right; }

.cover-loop {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 12mm;
  flex-wrap: wrap;
}

.cover-loop-label {
  font: 600 9px/1 var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--text-faint);
  margin-right: 4px;
}

.cover-loop-steps {
  display: flex;
  align-items: center;
  gap: 3px;
  flex-wrap: wrap;
}

.ls {
  font: 600 9px/1 var(--font-sans);
  padding: 2.5px 7px;
  border-radius: 4px;
  background: rgba(0,0,0,0.05);
  color: var(--text);
}

.ls.accent {
  background: var(--accent);
  color: #fff;
}

.la {
  font-size: 10px;
  color: var(--text-faint);
}

.cover-meta {
  display: flex;
  flex-direction: column;
  gap: 2mm;
  font: 500 10px/1.4 var(--font-sans);
  color: var(--text-soft);
  border-top: 1px solid var(--line);
  padding-top: 4mm;
  max-width: 54%;
}

.cover-author { font-weight: 700; }
.cover-url { font-family: var(--font-mono); font-size: 9px; color: var(--text-faint); }

/* ----- Table of Contents ------------------------------------------------- */

.toc-page {
  page-break-after: always;
  padding: 0;
}

.toc-heading {
  font: 700 28px/1.2 var(--font-serif);
  color: var(--text);
  margin: 0 0 8mm;
  padding-bottom: 4mm;
  border-bottom: 2px solid var(--accent);
}

.toc-group {
  margin-bottom: 5mm;
}

.toc-group-label {
  font: 700 11px/1 var(--font-sans);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--accent);
  margin-bottom: 2mm;
  padding-top: 3mm;
}

.toc-entry {
  display: flex;
  align-items: baseline;
  text-decoration: none;
  color: var(--text);
  font: 500 11px/1 var(--font-sans);
  padding: 2mm 0;
}

.toc-num {
  font-weight: 700;
  color: var(--text-faint);
  width: 8mm;
  flex-shrink: 0;
}

.toc-title {
  flex-shrink: 0;
}

.toc-dots {
  flex: 1;
  border-bottom: 1px dotted var(--line);
  margin: 0 2mm;
  min-width: 10mm;
}

/* ----- Part dividers ----------------------------------------------------- */

.part-divider {
  page-break-before: always;
  page-break-after: always;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40mm 20mm;
}

.part-number {
  display: block;
  font: 700 13px/1 var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 4px;
  color: var(--accent);
  margin-bottom: 6mm;
}

.part-label {
  display: block;
  font: 700 36px/1.1 var(--font-serif);
  color: var(--text);
}

/* ----- Sections ---------------------------------------------------------- */

.pdf-section {
  page-break-before: always;
}

.section-header {
  display: flex;
  align-items: baseline;
  gap: 4mm;
  margin-bottom: 6mm;
  padding-bottom: 4mm;
  border-bottom: 2px solid var(--accent);
}

.section-num {
  font: 700 32px/1 var(--font-serif);
  color: var(--accent);
  opacity: 0.35;
  flex-shrink: 0;
}

.section-title {
  font: 700 22px/1.2 var(--font-serif);
  color: var(--text);
  margin: 0;
}

.section-body {
  columns: 1;
}

/* ----- Typography -------------------------------------------------------- */

h1 { font: 700 24px/1.2 var(--font-serif); color: var(--text); margin: 6mm 0 3mm; }
h2 { font: 700 18px/1.25 var(--font-serif); color: var(--text); margin: 6mm 0 2mm; }
h3 { font: 700 14px/1.3 var(--font-serif); color: var(--accent); margin: 5mm 0 2mm; }
h4 { font: 700 12px/1.35 var(--font-sans); color: var(--text); margin: 4mm 0 1.5mm; }
h5, h6 { font: 700 11px/1.4 var(--font-sans); color: var(--text-soft); margin: 3mm 0 1mm; }

/* Avoid orphaned headings */
h1, h2, h3, h4, h5, h6 {
  page-break-after: avoid;
  break-after: avoid;
}

p {
  margin: 0 0 2.5mm;
  orphans: 3;
  widows: 3;
}

a {
  color: var(--accent);
  text-decoration: none;
}

strong { font-weight: 700; }
em { font-style: italic; }

/* ----- Lists ------------------------------------------------------------- */

ul, ol {
  margin: 0 0 3mm;
  padding-left: 6mm;
}

li {
  margin-bottom: 1mm;
}

li > ul, li > ol {
  margin-top: 1mm;
  margin-bottom: 0;
}

/* ----- Blockquotes ------------------------------------------------------- */

blockquote {
  margin: 3mm 0;
  padding: 3mm 4mm 3mm 5mm;
  border-left: 3px solid var(--accent);
  background: var(--accent-soft);
  border-radius: 0 6px 6px 0;
  font-style: italic;
  color: var(--text-soft);
  page-break-inside: avoid;
}

blockquote p { margin: 0; }

/* ----- Code -------------------------------------------------------------- */

code {
  font: 600 0.88em/1 var(--font-mono);
  padding: 1px 4px;
  border-radius: 3px;
  background: rgba(0,0,0,0.05);
  color: var(--accent);
}

pre {
  margin: 3mm 0;
  padding: 4mm;
  background: #1e1e2e;
  color: #cdd6f4;
  border-radius: 6px;
  font: 500 9px/1.6 var(--font-mono);
  overflow-x: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
  page-break-inside: avoid;
}

pre code {
  padding: 0;
  background: transparent;
  color: inherit;
  font-size: inherit;
}

/* ----- Tables ------------------------------------------------------------ */

table {
  width: 100%;
  border-collapse: collapse;
  margin: 3mm 0;
  font-size: 9.5px;
  page-break-inside: avoid;
}

thead {
  background: rgba(0,0,0,0.04);
}

th {
  font-weight: 700;
  text-align: left;
  padding: 2mm 3mm;
  border-bottom: 2px solid var(--line-strong);
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-soft);
}

td {
  padding: 2mm 3mm;
  border-bottom: 1px solid var(--line);
  vertical-align: top;
}

tr:last-child td {
  border-bottom: none;
}

/* ----- Horizontal rules -------------------------------------------------- */

hr {
  border: none;
  border-top: 1px solid var(--line);
  margin: 5mm 0;
}

/* ----- Images ------------------------------------------------------------ */

img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

/* ----- Footer ------------------------------------------------------------ */

.pdf-footer {
  page-break-before: always;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 50mm 20mm;
}

.pdf-footer em {
  font: 600 16px/1.4 var(--font-serif);
  color: var(--text-soft);
}

.pdf-footer .footer-url {
  font: 500 10px/1 var(--font-mono);
  color: var(--text-faint);
  margin-top: 6mm;
}
`;

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>The Agentic Engineering Manifesto</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=IBM+Plex+Mono:wght@500;600&family=Manrope:wght@500;700;800&display=swap" rel="stylesheet">
  <style>${CSS}</style>
</head>
<body>
  ${buildCover()}
  ${buildToc()}
  ${buildSections()}
  <div class="pdf-footer">
    <em>Exploration is a phase. Engineering is a discipline.</em>
    ${repositoryUrl ? `<div class="footer-url">${repositoryUrl}</div>` : ""}
  </div>
</body>
</html>`;

// Write intermediate HTML for debugging (optional)
writeFileSync("manifesto-print.html", html, "utf-8");
console.log(`Built manifesto-print.html (${(html.length / 1024).toFixed(0)} KB)`);

// ---------------------------------------------------------------------------
// Generate PDF with Puppeteer
// ---------------------------------------------------------------------------
async function generatePdf() {
  let puppeteer;
  try {
    puppeteer = await import("puppeteer");
  } catch {
    console.error(
      "Error: puppeteer is not installed.\n" +
      "Run: npm install --save-dev puppeteer\n" +
      "Then re-run: node build-pdf.mjs"
    );
    process.exit(1);
  }

  const browser = await puppeteer.default.launch({ headless: true });
  const page = await browser.newPage();

  // Load the print HTML — use a file URL so fonts can load
  const fileUrl = `file://${process.cwd()}/manifesto-print.html`;
  await page.goto(fileUrl, { waitUntil: "networkidle0", timeout: 30000 });

  // Give web fonts a moment to settle
  await page.evaluateHandle("document.fonts.ready");

  await page.pdf({
    path: "manifesto.pdf",
    format: "A4",
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: "<span></span>",
    footerTemplate: `
      <div style="width:100%;text-align:center;font-size:8px;color:#8a7f73;font-family:'Manrope',sans-serif;padding:0 20mm;">
        <span>The Agentic Engineering Manifesto</span>
        <span style="float:right;"><span class="pageNumber"></span></span>
      </div>`,
    margin: {
      top: "22mm",
      bottom: "22mm",
      left: "20mm",
      right: "20mm",
    },
  });

  await browser.close();
  console.log("Built manifesto.pdf");
}

generatePdf().catch((err) => {
  console.error("PDF generation failed:", err);
  process.exit(1);
});
