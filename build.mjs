#!/usr/bin/env node
/**
 * Build script: transforms manifesto markdown files into a single-page HTML site.
 *
 * Usage: node build.mjs
 * Output: index.html
 */

import {
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { marked } from "marked";

// ---------------------------------------------------------------------------
// Section definitions — order matters for navigation and page flow
// ---------------------------------------------------------------------------
const sections = [
  {
    id: "overview",
    file: "README.md",
    title: "Overview",
    group: "overview",
  },
  {
    id: "manifesto-core",
    file: "manifesto.md",
    title: "The Manifesto",
    group: "manifesto",
  },
  {
    id: "principles",
    file: "manifesto-principles.md",
    title: "Twelve Principles",
    group: "manifesto",
  },
  {
    id: "done",
    file: "manifesto-done.md",
    title: "Definition of Done",
    group: "manifesto",
  },
  {
    id: "beyond",
    file: "beyond_agile.md",
    title: "Beyond Agile",
    group: "beyond",
  },
  {
    id: "beyond-failures",
    file: "beyond-agile-failures.md",
    title: "Structural Failures",
    group: "beyond",
  },
  {
    id: "beyond-landscape",
    file: "beyond-agile-landscape.md",
    title: "Existing Frameworks",
    group: "beyond",
  },
  {
    id: "beyond-sources",
    file: "beyond-agile-sources.md",
    title: "Sources",
    group: "beyond",
  },
  {
    id: "companion-guide",
    file: "companion-guide.md",
    title: "Companion Guide",
    group: "companion",
  },
  {
    id: "companion-principles",
    file: "companion-principles.md",
    title: "Principle Guidance",
    group: "companion",
  },
  {
    id: "companion-frameworks",
    file: "companion-frameworks.md",
    title: "Frameworks",
    group: "companion",
  },
  {
    id: "companion-patterns",
    file: "companion-patterns.md",
    title: "Patterns",
    group: "companion",
  },
  {
    id: "companion-reference",
    file: "companion-reference.md",
    title: "Reference",
    group: "companion",
  },
  {
    id: "companion-re-framework",
    file: "companion-re-framework.md",
    title: "RE Framework",
    group: "companion",
  },
  {
    id: "adoption-playbook",
    file: "adoption-playbook.md",
    title: "Playbook",
    group: "adoption",
  },
  {
    id: "adoption-roles",
    file: "adoption-roles.md",
    title: "Roles",
    group: "adoption",
  },
  {
    id: "adoption-path",
    file: "adoption-path.md",
    title: "Adoption Path",
    group: "adoption",
  },
  {
    id: "adoption-vmodel",
    file: "adoption-vmodel.md",
    title: "V-Model Path",
    group: "adoption",
  },
  {
    id: "adoption-pilot",
    file: "adoption-pilot.md",
    title: "First Pilot",
    group: "adoption",
  },
  {
    id: "adoption-metrics",
    file: "adoption-metrics.md",
    title: "Metrics",
    group: "adoption",
  },
];

const groups = {
  overview: { label: "Home" },
  manifesto: { label: "Manifesto" },
  beyond: { label: "Beyond Agile" },
  companion: { label: "Companion" },
  adoption: { label: "Adoption" },
  domains: { label: "Domains" },
};

const domainPages = [
  {
    file: "domains/README.md",
    title: "Domain Overview",
  },
  {
    file: "domains/aviation.md",
    title: "Aviation",
  },
  {
    file: "domains/medical-devices.md",
    title: "Medical Devices",
  },
  {
    file: "domains/pharma.md",
    title: "Pharma",
  },
  {
    file: "domains/financial-services.md",
    title: "Financial Services",
  },
  {
    file: "domains/automotive.md",
    title: "Automotive",
  },
  {
    file: "domains/defense-government.md",
    title: "Defense / Government",
  },
];

// Maps source file path → section id, for resolving intra-document links
const sectionFileMap = new Map(sections.map(s => [path.posix.normalize(s.file), s.id]));
const domainFileSet = new Set(domainPages.map(p => path.posix.normalize(p.file)));

const packageJson = JSON.parse(readFileSync("package.json", "utf-8"));
const repositoryUrl = normalizeRepositoryUrl(packageJson.repository?.url || "");
const contributingUrl = repositoryUrl ? `${repositoryUrl}/blob/main/CONTRIBUTING.md` : "CONTRIBUTING.md";
const authors = readAuthors("AUTHORS.md");

function normalizeRepositoryUrl(url) {
  return url.replace(/^git\+/, "").replace(/\.git$/, "");
}

function readAuthors(file) {
  try {
    const markdown = readFileSync(file, "utf-8");
    return markdown
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => /^[-*]\s+/.test(line))
      .map((line) => line.replace(/^[-*]\s+/, ""))
      .map((entry) => {
        const match = entry.match(/^(.*?)\s*\((.*?)\)\s*$/);
        return match
          ? { name: match[1].trim(), detail: match[2].trim() }
          : { name: entry, detail: "Contributor" };
      });
  } catch {
    return [];
  }
}

const githubIcon = `
  <svg class="github-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8a8.01 8.01 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.57 7.57 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"></path>
  </svg>`;

// ---------------------------------------------------------------------------
// Markdown → HTML conversion
// ---------------------------------------------------------------------------
marked.setOptions({
  gfm: true,
  breaks: false,
});

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
  if (!pathPart) {
    return href;
  }

  if (!pathPart.endsWith(".md")) {
    return href;
  }

  const sourceDir = path.posix.dirname(currentSourceFile);
  const targetSourceFile = path.posix.normalize(path.posix.join(sourceDir, pathPart));

  // If the target is an integrated section, link to its in-document anchor
  const sectionId = sectionFileMap.get(targetSourceFile);
  if (sectionId) {
    if (currentOutputFile === "index.html") {
      return `#${sectionId}${suffix}`;
    } else {
      // From a standalone page (e.g. a domain page), link back to index.html#section-id
      const relativeIndex = path.posix.relative(path.posix.dirname(currentOutputFile), "index.html") || "index.html";
      return `${relativeIndex}#${sectionId}${suffix}`;
    }
  }

  // Domain pages and all other .md files: convert .md → .html (standalone pages exist)
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

function readMarkdown(file) {
  return readFileSync(file, "utf-8");
}

function stripFirstHeading(markdown) {
  return markdown.replace(/^#\s+.+\n+/, "");
}

function convertMarkdown(markdown, { sourceFile, outputFile }) {
  return marked.parse(markdown, {
    renderer: createRenderer({ sourceFile, outputFile }),
  });
}

function extractTitle(markdown, fallback) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}

function listMarkdownFiles(rootDir) {
  const entries = readdirSync(rootDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) {
      continue;
    }

    const fullPath = path.join(rootDir, entry.name);
    const relativePath = path.posix.join(
      rootDir === "." ? "" : rootDir,
      entry.name,
    );

    if (entry.isDirectory()) {
      files.push(...listMarkdownFiles(relativePath));
      continue;
    }

    if (entry.isFile() && relativePath.endsWith(".md")) {
      files.push(relativePath);
    }
  }

  return files.sort();
}

function convertSection(section) {
  let md;
  try {
    md = readMarkdown(section.file);
  } catch (e) {
    console.warn(`Warning: could not read ${section.file}, skipping.`);
    return "";
  }

  // Strip the first H1 heading — we render our own section header
  md = stripFirstHeading(md);

  return convertMarkdown(md, {
    sourceFile: section.file,
    outputFile: "index.html",
  });
}

// ---------------------------------------------------------------------------
// Build navigation
// ---------------------------------------------------------------------------
function buildNav({ outputFile = "index.html", activePath = "index.html" } = {}) {
  const relativeIndex = path.posix.relative(path.posix.dirname(outputFile), "index.html") || "index.html";

  let html = '<nav id="sidebar" class="sidebar">';
  html += '<div class="sidebar-header">';
  html +=
    '<div class="logo-lockup"><a href="#top" class="logo">Agentic Engineering</a><div class="logo-kicker">Manifesto Documentation</div></div>';
  html +=
    '<button class="sidebar-close" onclick="toggleSidebar()" aria-label="Close menu">&times;</button>';
  html += "</div>";
  html += '<div class="sidebar-scroll">';

  let currentGroup = null;
  for (const s of sections) {
    if (s.group !== currentGroup) {
      if (currentGroup !== null) html += "</div>";
      currentGroup = s.group;
      html += `<div class="nav-group">`;
      html += `<div class="nav-group-label">${groups[s.group].label}</div>`;
    }
    const sectionHref = outputFile === "index.html" ? `#${s.id}` : `${relativeIndex}#${s.id}`;
    html += `<a href="${sectionHref}" class="nav-link" data-section="${s.id}">${s.title}</a>`;
  }
  html += "</div>"; // last group

  html += `<div class="nav-group">`;
  html += `<div class="nav-group-label">${groups.domains.label}</div>`;
  for (const page of domainPages) {
    const targetFile = markdownToHtmlPath(page.file);
    const href = path.posix.relative(path.posix.dirname(outputFile), targetFile) || ".";
    const activeClass = activePath === targetFile ? " active" : "";
    html += `<a href="${href}" class="nav-link${activeClass}">${page.title}</a>`;
  }
  html += "</div>";

  html += "</div>"; // sidebar-scroll
  html += '<div class="sidebar-meta">';
  if (authors.length > 0) {
    html += '<div><div class="sidebar-meta-label">Authors</div><div class="sidebar-authors">';
    html += authors
      .map(({ name, detail }) => `<strong>${name}</strong>${detail ? `<span>${detail}</span>` : ""}`)
      .join("<br>");
    html += "</div></div>";
  }
  if (repositoryUrl) {
    html += `<a class="sidebar-repo" href="${repositoryUrl}" target="_blank" rel="noreferrer">${githubIcon}<span>View Repository</span></a>`;
  }
  html += "</div>";
  html += "</nav>";
  return html;
}

// ---------------------------------------------------------------------------
// Build sections
// ---------------------------------------------------------------------------
function buildSections() {
  let html = "";
  for (const s of sections) {
    const content = convertSection(s);
    html += `<section id="${s.id}" class="doc-section" data-group="${s.group}">`;
    html += `<div class="section-inner">`;
    html += content;
    html += `</div>`;
    html += `</section>`;
  }
  return html;
}

// ---------------------------------------------------------------------------
// JS for interactivity
// ---------------------------------------------------------------------------
const JS = `
// Sidebar toggle (mobile)
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('active');
}

document.getElementById('overlay')?.addEventListener('click', toggleSidebar);

// Close sidebar on nav link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 900) toggleSidebar();
  });
});

// Active nav tracking via IntersectionObserver
const sectionEls = document.querySelectorAll('.doc-section');
const navLinks = document.querySelectorAll('.nav-link');
const heroEl = document.querySelector('.hero');

const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
    }
  }
}, { rootMargin: '-20% 0px -75% 0px' });

sectionEls.forEach(s => observer.observe(s));

// Scroll progress bar
const progressBar = document.getElementById('progress');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
  backToTop.classList.toggle('visible', scrollTop > 600);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
`;

// ---------------------------------------------------------------------------
// Assemble HTML
// ---------------------------------------------------------------------------
const coreValues = [
  [
    "Iterative steering and alignment",
    "Rigid upfront specifications",
  ],
  [
    "Verified outcomes with auditable evidence",
    "Fluent assertions of success",
  ],
  [
    "Right-sized agent collaboration",
    "Monolithic god-agents",
  ],
  [
    "Curated, high-signal context and memory",
    "Stateless sessions and noisy memory",
  ],
  [
    "Tooling, telemetry, and observability",
    "Chat-based heroics",
  ],
  [
    "Resilience under stress",
    "Performance in ideal conditions",
  ],
];

const loopSteps = [
  "Specify",
  "Design",
  "Plan",
  "Execute",
  "Verify",
  "Validate",
  "Observe",
  "Learn",
  "Govern",
];

function buildValuesGrid() {
  let html = '<div class="values-grid">';
  for (const [left, right] of coreValues) {
    html += `<div class="value-row">
      <div class="value-left">${left}</div>
      <div class="value-over">over</div>
      <div class="value-right">${right}</div>
    </div>`;
  }
  html += "</div>";
  return html;
}

function buildHeroStats() {
  const stats = [
    { value: "12", label: "principles" },
    { value: String(sections.length), label: "linked sections" },
    { value: authors.length > 0 ? String(authors.length) : "1", label: "named author" + (authors.length === 1 ? "" : "s") },
  ];

  return `<div class="hero-facts">${stats
    .map(
      ({ value, label }) => `<div class="fact-card"><span class="fact-value">${value}</span><span class="fact-label">${label}</span></div>`,
    )
    .join("")}</div>`;
}

function buildAuthorsCard(outputFile = "index.html") {
  if (authors.length === 0) {
    return "";
  }

  const contributingHref = path.posix.relative(
    path.posix.dirname(outputFile),
    "CONTRIBUTING.html",
  ) || "CONTRIBUTING.html";

  return `<aside class="meta-card">
    <p class="meta-kicker">Authorship</p>
    <h2 class="meta-title">Written by humans (with the help of AI)</h2>
    <ul class="author-list">
      ${authors
        .map(
          ({ name, detail }) =>
            `<li class="author-item"><strong>${name}</strong>${detail ? `<span>${detail}</span>` : ""}</li>`,
        )
        .join("")}
    </ul>
    <p class="meta-copy">Want to contribute? Read <a href="${contributingHref}">CONTRIBUTING.md</a> for guidelines and contribution flow.</p>
  </aside>`;
}

function buildLoop() {
  let html = '<div class="hero-loop">';
  html += '<div class="hero-loop-label">The Agentic Loop</div>';
  html += '<div class="loop-steps">';
  loopSteps.forEach((step, i) => {
    const cls =
      step === "Verify" || step === "Validate" || step === "Govern"
        ? "loop-step accent"
        : "loop-step";
    html += `<span class="${cls}">${step}</span>`;
    if (i < loopSteps.length - 1) html += '<span class="loop-arrow">&#8594;</span>';
  });
  html += '<span class="loop-arrow">&#8635;</span>';
  html += "</div></div>";
  return html;
}

function buildHero() {
  return `<header class="hero" id="hero">
    <div class="hero-grid">
      <div class="hero-copy">
        <div class="hero-label">Manifesto Documentation</div>
        <h1>The Agentic Engineering Manifesto</h1>
        <p class="hero-lede">
          Principles for building systems where humans steer intent, agents execute within governed boundaries, and verified outcomes are the only measure that matters.
        </p>
        <p class="hero-kicker">
          This is a living document. Agentic engineering is a fast-moving field, and this manifesto evolves continuously &mdash; informed by our own practices, what we witness in the field, and the new technologies, trends, and practices that emerge. Contributions are welcome.
        </p>
        <div class="hero-actions">
          <a class="button-link primary" href="#overview">Start Reading</a>
          ${repositoryUrl ? `<a class="button-link secondary" href="${repositoryUrl}" target="_blank" rel="noreferrer">${githubIcon}<span>Open GitHub Repository</span></a>` : ""}
        </div>
        ${buildHeroStats()}
        <div class="values-panel">
          <p class="panel-kicker">Editorial Stance</p>
          ${buildValuesGrid()}
        </div>
      </div>
      <div class="hero-rail">
        ${buildAuthorsCard("index.html")}
        ${buildLoop()}
      </div>
    </div>
  </header>`;
}

function buildStandaloneHero({ title, sourceFile, outputFile }) {
  const relativeIndex = path.posix.relative(path.posix.dirname(outputFile), "index.html") || "index.html";

  return `<header class="hero" id="hero">
    <div class="hero-grid">
      <div class="hero-copy">
        <div class="hero-label">Domain Documentation</div>
        <h1>${title}</h1>
        <p class="hero-lede">
          Domain-specific regulatory alignment for the Agentic Engineering Manifesto, presented in the same documentation shell as the main site.
        </p>
        <p class="hero-kicker">
          This page is generated from <code>${sourceFile}</code> and remains part of the same document system, with shared navigation back to the manifesto, companion guidance, adoption material, and peer domain mappings.
        </p>
        <div class="hero-actions">
          <a class="button-link primary" href="${relativeIndex}">Open Main Index</a>
          ${repositoryUrl ? `<a class="button-link secondary" href="${repositoryUrl}" target="_blank" rel="noreferrer">${githubIcon}<span>Open GitHub Repository</span></a>` : ""}
        </div>
      </div>
      <div class="hero-rail">
        ${buildAuthorsCard(outputFile)}
        ${buildLoop()}
      </div>
    </div>
  </header>`;
}

function buildStandalonePage({ title, content, sourceFile, outputFile }) {
  const relativeStylesheet = path.posix.relative(path.posix.dirname(outputFile), "styles.css") || "styles.css";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} | The Agentic Engineering Manifesto</title>
  <meta name="description" content="Generated HTML page for ${title}.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=IBM+Plex+Mono:wght@500;600&family=Manrope:wght@500;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${relativeStylesheet}">
</head>
<body id="top">
  <div class="scroll-progress" id="progress"></div>

  ${buildNav({ outputFile, activePath: outputFile })}
  <div class="sidebar-overlay" id="overlay"></div>

  <div class="main">
    <div class="mobile-header">
      <button class="hamburger" onclick="toggleSidebar()" aria-label="Open menu">&#9776;</button>
      <span class="mobile-title">Agentic Engineering Manifesto</span>
    </div>

    <div class="main-shell">
      ${buildStandaloneHero({ title, sourceFile, outputFile })}
      <section class="doc-section standalone-doc" data-group="domains">
        <div class="section-inner">
          ${content}
        </div>
      </section>
      <footer class="site-footer">
        <em>Exploration is a phase. Engineering is a discipline.</em>
      </footer>
    </div>
  </div>

  <button class="back-to-top" id="backToTop" aria-label="Back to top">&uarr;</button>

  <script>${JS}</script>
</body>
</html>`;
}

function buildStandalonePages() {
  const markdownFiles = listMarkdownFiles(".");

  for (const sourceFile of markdownFiles) {
    const outputFile = markdownToHtmlPath(sourceFile);
    const markdown = readMarkdown(sourceFile);
    const title = extractTitle(markdown, path.basename(sourceFile, ".md"));
    const content = convertMarkdown(markdown, { sourceFile, outputFile });

    mkdirSync(path.dirname(outputFile), { recursive: true });
    writeFileSync(
      outputFile,
      buildStandalonePage({ title, content, sourceFile, outputFile }),
      "utf-8",
    );
  }
}

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>The Agentic Engineering Manifesto</title>
  <meta name="description" content="Principles for building systems where humans steer intent, agents execute within governed boundaries, and verified outcomes are the only measure that matters.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=IBM+Plex+Mono:wght@500;600&family=Manrope:wght@500;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body id="top">
  <div class="scroll-progress" id="progress"></div>

  ${buildNav({ outputFile: "index.html", activePath: "index.html" })}
  <div class="sidebar-overlay" id="overlay"></div>

  <div class="main">
    <div class="mobile-header">
      <button class="hamburger" onclick="toggleSidebar()" aria-label="Open menu">&#9776;</button>
      <span class="mobile-title">Agentic Engineering Manifesto</span>
    </div>

    <div class="main-shell">
      ${buildHero()}
      ${buildSections()}
      <footer class="site-footer">
        <em>Exploration is a phase. Engineering is a discipline.</em>
      </footer>
    </div>
  </div>

  <button class="back-to-top" id="backToTop" aria-label="Back to top">&uarr;</button>

  <script>${JS}</script>
</body>
</html>`;

writeFileSync("index.html", html, "utf-8");
buildStandalonePages();
console.log(`Built index.html (${(html.length / 1024).toFixed(0)} KB)`);
