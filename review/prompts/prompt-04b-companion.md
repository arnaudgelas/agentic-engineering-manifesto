# Sub-prompt 04b — Companion Framework Alignment (Part 7 only)

**Purpose:** Produce Part 7 (Companion Framework Alignment) of a [[FRAMEWORK]] Agentic Engineering Manifesto review. This agent (04b) is one of three siblings (04a, 04b, 04c) that together replace the former monolithic agent 04. 04a covers the seven adoption corpus files; 04b (this agent) covers the six companion corpus files only; 04c reads both and produces the canonical combined output plus the Cross-Document Synthesis. 04b runs in parallel with 04a; both must complete and be non-empty before 04c starts.

**Note to orchestrator:** All `[[VARIABLE]]` placeholders in this file must be substituted before this prompt is passed to the agent. If any `[[...]]` pattern remains in your working copy, stop and resolve it before spawning.

**Wave 1a isolation:** This prompt runs in Wave 1a alongside agents 01, 02, 03, 04a, 05a, and 07. Do not read sibling Wave 1a outputs. Do not produce a composite [[FRAMEWORK]] score (Part 1 is owned by agent 01). Your gap inventory at the end of the file (see §3.4) will be consumed by agent 04c (synthesis) and ultimately by agent 06 (which builds Part 11 from the combined 04 output).

**Cross-prompt scope guards:**
- The `companion/frameworks.md` subsection (Part 7) assesses [[FRAMEWORK]]'s alignment with the *guidance* in `companion/frameworks.md`. It does NOT issue the determinative phase placement — that is Part 8, owned by agent 05. Do not pre-empt Part 8.
- Do not produce Part 6 content (adoption alignment). That is owned by agent 04a.
- Do not produce the Cross-Document Synthesis. That is owned by agent 04c.

---

## 1. Inputs — read all before assessing

Read every file listed below **end-to-end** before producing any assessment. Do not score from memory. Do not proceed if any file is inaccessible.

### [[FRAMEWORK]] source artefacts

Read every source file in the `[[FRAMEWORK_LOWER]]/` directory, including at minimum:

- The primary README or equivalent top-level documentation file.
- All core module source files, configuration schemas, lifecycle rules, and phase-gate definitions.
- Any CHANGELOG, version history, or release notes.
- Any internal rules, patterns, or architectural decision records shipped with the framework.
- Anything covering autonomy tiers, blast radius, isolation, agent configuration scaffolding, requirements engineering, or failure-mode controls.

Suggested reading order: README → CHANGELOG/release notes → top-level rules → core source modules → companion corpus → `[[DOMAIN_FILE]]`.

### Manifesto companion corpus — read each file end-to-end

- `companion/frameworks.md` — six-phase maturity spectrum (Phase 1–6) with failure modes per phase; boundary conditions for regulated industries; hard autonomy caps by use-case class; operational definitions of blast radius, right-sized, and evidence bundle.
- `companion/patterns.md` — Patterns A–H (Single-Domain Reliability Fix, Multi-Agent Cross-Domain Coordination, Memory Poisoning Recovery, Economics Routing, Autonomy Tier Escalation, Governed Failure, Exception-Based Governance, Persona Simulator); Hallucination Loop failure pattern; Operational Recovery Cycle failure pattern.
- `companion/principles.md` — extended guidance for all 12 principles; probability-compounding problem; correlated failure domains (model, retrieval, tool, governance); blast radius management; isolation design; accountability paradox; retrieval SLOs; context budgeting; tier boundary design; memory governance operational detail.
- `companion/guide.md` — Annotated Agent Configuration Template (`AGENTS.md` / `CLAUDE.md`); CoE review checklist; contents index for the full companion suite.
- `companion/re-framework.md` — requirements engineering paradigm break for agentic systems; two-axes classification matrix (system type × consumer type); single-source / multiple-projections principle; spec lifecycle and convergence; hard requirements vs. probabilistic assurance targets.
- `companion/reference.md` — failure modes of the manifesto (over-governance, evidence theater, control theater, security theater, adoption theater, maturity inflation, verification without validation, structural regression without detection); skill requirements by principle with readiness assessment.

### Domain file

- `[[DOMAIN_FILE]]` — read end-to-end. Every [[ORGANIZATION]]-specific implication in the output must map to a specific regulation Article (with Article or section number) or named risk-type entry from this file. Do not propagate `[[DOMAIN_FILE]]` content forward outside its scope (no synthesis of unrelated domain material).

### Prior reviews

- If `[[PRIOR_REVIEWS]]` is not `none`, read the files listed there for peer comparison. Do not transfer scores — derive every verdict independently from [[FRAMEWORK]]'s own artefacts.

---

## 2. Methodology

### 2.1 Companion file assessment procedure

For each of the six companion files, assess [[FRAMEWORK]]'s coverage in the following sequence:

1. **Identify the requirements.** Summarise what the companion file requires — the specific infrastructure, capabilities, design rules, or governance behaviours an implementing framework must provide. Quote at least one verbatim phrase from the source file (in markdown blockquote or inline backticks) so the reader can verify the requirement is real.
2. **Assess coverage.** Evaluate whether [[FRAMEWORK]] provides:
   - **Full coverage** — the requirement is demonstrably met by a named [[FRAMEWORK]] artefact, command, or mechanism.
   - **Partial coverage** — [[FRAMEWORK]] addresses part of the requirement or provides a component that partially satisfies it.
   - **No coverage** — [[FRAMEWORK]] does not address the requirement; it is either absent or explicitly out of scope.
3. **Cite evidence.** For each verdict, cite specific [[FRAMEWORK]] artefact names, file paths, command names, or rule text. Every claim about `[[FRAMEWORK]]` MUST quote verbatim from a named source file with its path. Do not assert coverage without a citation.
4. **Identify gaps.** For partial and absent coverage, state precisely what is missing and assign a severity label (Critical / High / Medium / Low) using the canonical thresholds defined in `prompt.md`.
5. **Identify contradictions.** This is mandatory for every Part 7 subsection. Identify any place where `[[FRAMEWORK]]` explicitly contradicts or undermines this companion document's guidance. Label these with a `**Contradiction:**` prefix and assign severity. A contradiction is not the same as a gap — gaps are absences; contradictions are conflicts. Candidate contradiction patterns to actively check:
   - Default autonomy tier vs. `companion/frameworks.md` hard cap.
   - Blast-radius scope (code-only) vs. `companion/principles.md` (data + users + regulatory).
   - Workspace-only isolation vs. `companion/principles.md` data/tool access enforcement.
   - INVEST or deterministic acceptance criteria vs. `companion/re-framework.md` probabilistic assurance targets.
   - Workspace agent configuration scaffolding vs. `companion/guide.md` template requirements.
   - Process-level evaluation vs. `companion/reference.md` outcome validation.
   If no contradiction is found in a subsection, state `**Contradiction:** None identified.` explicitly.
6. **State [[ORGANIZATION]] implication.** End each subsection with a [[ORGANIZATION]]-specific implication paragraph (2–4 sentences) that names a specific regulation Article (with Article or section number) or named risk-type entry from `[[DOMAIN_FILE]]`, describes the specific exposure (operational, regulatory, financial), and states the timing of the exposure (immediate, on next phase transition, on supervisory review).

### 2.2 Scoring and grading

**Severity labels and alignment grades operate on different things.** Use the canonical severity thresholds from `prompt.md` for individual gaps. Do not re-quote the severity table here. Part 7 does NOT use 0–100 scores. Instead: use alignment grades (see below) at the subsection level, and severity labels (Critical/High/Medium/Low per `prompt.md` thresholds) for individual gaps and contradictions. Gap and contradiction severity measures impact on [[ORGANIZATION]]'s regulatory and operational context, not numeric score.

**Alignment grade vocabulary.** Valid alignment grades are ONLY: `Well-aligned`, `Partially aligned`, `Misaligned`. Do not use any other phrasing. Do not invent variants such as `Mostly aligned`, `Conditionally aligned`, or `Aligned with caveats`.

- **Well-aligned** — full coverage across the subsection's primary requirements.
- **Partially aligned** — substantive coverage with identifiable gaps.
- **Misaligned** — coverage so incomplete that the subsection's primary requirements are not met, or the framework actively contradicts the guidance.

A subsection may be `Well-aligned` even if it contains Critical gaps, *provided* those gaps are documented [[FRAMEWORK]] scope exclusions and [[ORGANIZATION]] has a separate control. Disclose this explicitly in the [[ORGANIZATION]] implication paragraph if so.

**Per-step verdicts vs. gap severity.** Inside a subsection, individual checklist steps (e.g., phase failure-mode mitigations, ALCOA+ properties, pattern coverage rows) use `✅ Met` / `🟡 Partial` / `❌ Absent` per-step verdicts. Gap and contradiction severity labels (`Critical|High|Medium|Low`) annotate each bullet. The two label systems do not collide — they label different things.

**Effort sizing for any remediation note** uses the canonical effort labels (S/M/L/XL) from `prompt.md`. Do not re-quote the effort table here.

---

## 3. Output specification

Write the following file exactly:

**File path:** `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04b_companion.md`

Create the `[[FRAMEWORK_LOWER]]/` directory if it does not exist.

### 3.1 Required header

```
# [[FRAMEWORK]] Agent 04b — Companion Framework Alignment (Part 7)

**Framework:** [[FRAMEWORK]]
**Version:** [[FRAMEWORK_VERSION]]
**Review date:** <YYYY-MM-DD>
**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]`
**Reviewer:** Agent 04b (<model-name>)
**Methodology:** Evidence-based alignment against the manifesto companion corpus (6 files); every verdict grounded in named [[FRAMEWORK]] artefacts; explicit contradiction sweep per subsection; [[ORGANIZATION]]-specific implications mapped to [[DOMAIN_FILE]] regulations.
**Context:** [[ORGANIZATION]] — [[INDUSTRY]]
**Sibling outputs:** This file is consumed (with `[[FRAMEWORK_LOWER]]_review_04a_adoption.md`) by agent 04c, which produces the combined `[[FRAMEWORK_LOWER]]_review_04_adoption_companion.md`.
```

If `[[FRAMEWORK_VERSION]]` is `unknown`, derive a concrete version from `pyproject.toml`, `package.json`, `CHANGELOG.md`, or git tag and record it in the Methodology section.

---

### 3.2 Methodology section

Immediately after the header, produce a `## Methodology` section. State: which [[FRAMEWORK]] source artefacts were read; the assessed framework version (with commit hash if HEAD); what was assessed (companion alignment and contradictions only — adoption alignment is in 04a, synthesis is in 04c); the scoring approach explicitly (alignment grade per subsection; severity labels per gap and contradiction; no numeric scoring); how the [[ORGANIZATION]] / [[INDUSTRY]] context was applied; and what was *not* read or was time-boxed. The reference methodology block is approximately 200 words; do not enforce a tighter cap.

---

### 3.3 Per-subsection structural skeleton (mandatory for every Part 7 subsection)

Every subsection (6 total) MUST contain the following named subheadings, in this order:

1. `**Alignment grade:** Well-aligned` / `Partially aligned` / `Misaligned` (the first non-blank line after the H3 heading).
2. `#### What the Document Requires` — 1–2 paragraphs summarising the source file's testable demands, with at least one verbatim quote from the source file.
3. `#### What [[FRAMEWORK]] Covers` — paragraph(s) with cited [[FRAMEWORK]] artefacts (verbatim quotes from named source paths required for every coverage claim).
4. `#### Gaps` — bulleted list. Every bullet ends with `[Severity: Critical|High|Medium|Low]`.
5. `#### Contradictions` — **mandatory** for every Part 7 subsection. Bulleted list with `**Contradiction:**` prefix per item; companion guidance violated; [[FRAMEWORK]] artefact creating the conflict; severity. State `**Contradiction:** None identified.` if zero.
6. `#### [[ORGANIZATION]] Implication` — 2–4 sentence paragraph naming a specific regulation Article (with number) or named risk-type entry from `[[DOMAIN_FILE]]`; specific exposure; timing of exposure.

**Depth is proportional to the document's significance.** A document where `[[FRAMEWORK]]` has major coverage or major gap warrants more depth. Minimum: 6 substantive bullets or 3 paragraphs of analysis. Do not pad to a target line count.

**Heading format:** Use H3 (`### `) for each file's heading. Wrap the filename in backticks. Format example: `` ### `companion/frameworks.md` — Maturity Guidance Alignment ``.

**Strengths surfacing:** Where [[FRAMEWORK]] demonstrably meets a requirement, name it as a strength inside `What [[FRAMEWORK]] Covers` even if other parts of the subsection are partial or absent.

**In-development capabilities:** If a manifesto requirement is partially addressed by an in-development [[FRAMEWORK]] capability (milestone, ticket, roadmap item), state the capability and its in-development status. Do NOT credit it as covered.

**Anti-hedging:** Make falsifiable statements grounded in cited artefacts. If evidence is uncertain, state `unverified — source artefact does not address X`.

---

### 3.4 Part 7 — Companion Framework Alignment

Open with `## Part 7 — Companion Framework Alignment`. Produce the following six subsections in this exact order. Apply the structural skeleton from §3.3, including the mandatory `Contradictions` block.

#### `### \`companion/frameworks.md\` — Maturity Guidance Alignment`

Assess [[FRAMEWORK]]'s alignment with the *guidance* in `companion/frameworks.md`. Do NOT issue a determinative phase placement (that is Part 8, agent 05). State which `companion/frameworks.md` requirements [[FRAMEWORK]] meets and misses; map [[FRAMEWORK]]'s default operating mode against the hard autonomy caps for [[INDUSTRY]] domains from `[[DOMAIN_FILE]]`.

Assess [[FRAMEWORK]]'s mitigation of the failure mode for each phase:
- Phase 3: "Autonomy without verification." Is this mitigated?
- Phase 4: "Governance without feedback." Is this mitigated?
- Phase 5: "Evaluation theater." Is this mitigated?

#### `### \`companion/patterns.md\` — Pattern Implementation Assessment`

Produce a table: Pattern | [[FRAMEWORK]] Implementation | Verdict (✅/🟡/❌) | Evidence. Cover Patterns A–H plus the Hallucination Loop and Operational Recovery Cycle failure patterns (10 rows). After the table, identify the pattern most operationally relevant to [[ORGANIZATION]]'s [[INDUSTRY]] context and explain its relevance with a named regulatory basis.

#### `### \`companion/principles.md\` — Principle-Level Design Decisions`

For each of the following extended guidance topics, assess [[FRAMEWORK]]'s alignment and identify any contradictions:
- Probability compounding and correlated failure domains (model, retrieval, tool, governance): does [[FRAMEWORK]] address any of these failure domains explicitly?
- Blast radius management: does [[FRAMEWORK]]'s impact analysis cover code-module blast radius? Does it extend to data, users, and regulatory obligation blast radius?
- Isolation design: does [[FRAMEWORK]]'s isolation operate at the workspace filesystem level only, or at the data and tool access enforcement level?

For [[ORGANIZATION]], identify the most dangerous correlated failure domain in [[INDUSTRY]] context (anchored to a specific criterion: highest probability, highest blast radius, or highest regulatory exposure — name the criterion) and assess whether [[FRAMEWORK]] has detection capability for it.

#### `### \`companion/guide.md\` — Practical Implementation Guidance`

Assess [[FRAMEWORK]]'s alignment with the Annotated Agent Configuration Template requirements:
- Does [[FRAMEWORK]] scaffold an agent configuration file (`AGENTS.md`, `CLAUDE.md`, or equivalent)?
- Does the scaffolded configuration include: domain constraints, security section, testing conventions, commit/PR conventions?
- Is the scaffolded configuration within the companion guide's recommended size bound?

Assess CoE review checklist compliance: project overview / domain boundary; build/test/deploy commands; domain constraints; security section; testing conventions. For each checklist item, state whether [[FRAMEWORK]] satisfies it and cite the artefact.

#### `### \`companion/re-framework.md\` — Requirements Engineering Assessment`

Assess [[FRAMEWORK]]'s requirements output against the two-axes classification matrix (system type ∈ {deterministic, agentic, hybrid} × consumer type ∈ {human, agent, hybrid}). State which cell [[FRAMEWORK]]'s output falls in and what the full RE framework requirements are for that cell.

Assess the following requirements:
- Machine-readable output with structured acceptance criteria.
- INVEST or equivalent quality scoring.
- Governance projection as a separate artefact (compliance mapping per a relevant standard or regulation from `[[DOMAIN_FILE]]`).
- Single-source / multiple-projections principle: if [[FRAMEWORK]] produces a YAML/canonical source and then downstream representations (ADO stories, ticket descriptions, etc.), are the downstream representations automatically synchronised when the source changes?
- Probabilistic assurance targets: does [[FRAMEWORK]] generate or validate probabilistic assurance targets for non-deterministic agent behaviour? State the consequence for [[ORGANIZATION]]'s [[INDUSTRY]] AI systems, which are non-deterministic by nature.

#### `### \`companion/reference.md\` — Failure Modes Risk Table`

For each failure mode in `companion/reference.md`, produce a row assessing [[FRAMEWORK]]'s risk level, with evidence. Cover all eight failure modes: Over-governance, Evidence theater, Control theater, Security theater, Adoption theater, Maturity inflation, Verification without validation, Structural regression without detection. Quote the operational definition from `companion/reference.md` (1 line) before scoring [[FRAMEWORK]]'s risk level.

Use this format: a table with columns Failure Mode | Definition | [[FRAMEWORK]] Risk Level (Low/Medium/High/Critical) | Evidence. After the table, identify the highest-risk failure mode for [[ORGANIZATION]] in [[INDUSTRY]] context with a named regulatory basis (Article number) from `[[DOMAIN_FILE]]`.

---

### 3.5 Gap inventory block (machine-readable)

After the sixth subsection closes, append a machine-readable gap summary block inside an HTML comment. Agent 04c will read this block (alongside agent 04a's block) to build the Cross-Document Synthesis; agent 06 will subsequently read the merged form to build Part 11.

```
<!-- GAP INVENTORY
- gap-slug-1: {Critical|High|Medium|Low} | {source-doc-slug} | P7 | effort {S|M|L|XL}
- gap-slug-2: ...
/GAP INVENTORY -->
```

One row per gap (and one row per material contradiction, treating contradictions as gap entries with the appropriate slug) surfaced in Part 7. Use stable kebab-case `gap-slug` identifiers. The `source-doc-slug` is the companion file slug (e.g., `companion-principles`). The Part reference is always `P7` for this file. Effort uses canonical S/M/L/XL labels.

---

## 4. Hard rules

These rules apply without exception. See `prompt.md` for the canonical severity, weighting, and effort tables — do not re-quote them.

1. Read [[FRAMEWORK]]'s source artefacts before assessing. Every verdict must be grounded in a specific named file, command, module, or rule from [[FRAMEWORK]]'s own artefacts. Every claim about `[[FRAMEWORK]]` MUST quote verbatim from the named source file with its path. Do not assert capabilities from memory.
2. Read all 6 companion files end-to-end before assessing. Read the current files — do not score from memory of prior content.
3. State coverage and absence separately for each verdict. Do not merge them.
4. Do not praise [[FRAMEWORK]] for things it does not demonstrably do. Do not penalise it for documented scope gaps — but flag every scope gap explicitly and state the alignment gap it creates for [[ORGANIZATION]].
5. Every [[ORGANIZATION]]-specific implication must map to a specific regulation Article (with Article or section number) or a named risk-type entry from `[[DOMAIN_FILE]]`.
6. Severity labels must use the canonical thresholds from `prompt.md`. Do not invent different thresholds. Do not re-quote them in the output.
7. Use date format YYYY-MM-DD wherever a date appears.
8. When cross-referencing another part of the review within the output file, use canonical part numbers only (e.g., "see Part 3", "see Part 12"). Do not use file names or agent numbers in cross-references. The synthesis-level subsection reference form is `Part 7 — <file-slug>`.
9. **Out-of-scope corpus / tracked-files-only.** Every source file cited MUST be tracked by git on the current branch. Do not read or reference `asdlc/`, `aplc/`, `agentic-sdlc-handbook/`, `intelligence-governance-manifesto/`, `agentic-enterprise-manifesto/`, `agentic-enterprise.md`, `agentic-enterprise.html`, `agentic-governance-stack.md`, `agentic-governance-stack.html`, `manifesto-evolution-plan.md`, `manifesto-evolution-plan.html`, `phase-assessment-checklist.md`, `phase-assessment-checklist.html`, `asdlc-plan*`, `aplc-plan*`, or `igm-aent-coherence-review*` anywhere in the output file. The output MUST contain zero matches for the tokens `ASDLC`, `APLC`, `IGM`, `AEnt-M`, `AEnt_M`, `intelligence-governance-manifesto`, `agentic-enterprise-manifesto`, `agentic-enterprise`, `agentic-governance-stack`, `manifesto-evolution-plan`, `phase-assessment-checklist`, or `agentic-sdlc-handbook`. Do not propagate `[[DOMAIN_FILE]]` content forward into unrelated synthesis (no domain-file bleed beyond cited regulations and risk-types).
10. **Contradictions (where [[FRAMEWORK]]'s behaviour conflicts with companion guidance) are distinct from gaps (where coverage is absent). Label each type explicitly. Every Part 7 subsection MUST contain a `Contradictions` block, even if it states `**Contradiction:** None identified.`**
11. The output MUST NOT contain the words `consider`, `may`, `could potentially`, `perhaps`, or `use judgement`. Make falsifiable statements grounded in cited artefacts. If evidence is uncertain, state `unverified — source artefact does not address X`.
12. Do not produce a composite [[FRAMEWORK]] score. Part 1 is owned by agent 01.
13. Do not produce Part 6 content (adoption alignment) or the Cross-Document Synthesis. Those are owned by agents 04a and 04c respectively.
14. Subsection order within Part 7 is canonical (per §3.4) and must not be re-ordered.
15. Close the output file with an italic `*Sources read: ...*` footer listing every source file actually read.

---

## 5. Self-check before saving

**Do not save the output file until every item below is confirmed.**

- [ ] Output file path is `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04b_companion.md` with `[[FRAMEWORK_LOWER]]` fully substituted (no literal `[[` remaining in the path).
- [ ] All `[[VARIABLE]]` placeholders in the output file content are substituted — scan for any remaining `[[...]]` patterns.
- [ ] All 6 companion files are covered, each as a separate H3 subsection in the canonical order (companion-frameworks, companion-patterns, companion-principles, companion-guide, companion-re-framework, companion-reference).
- [ ] Every subsection's first non-blank line is `**Alignment grade:** Well-aligned` / `Partially aligned` / `Misaligned` (one of these three values exactly).
- [ ] Every subsection contains: `What the Document Requires`; `What [[FRAMEWORK]] Covers`; `Gaps`; `Contradictions` (with `**Contradiction:**` prefix per item, or `**Contradiction:** None identified.` if zero); `[[ORGANIZATION]] Implication`.
- [ ] Every gap bullet ends with a severity label `[Severity: Critical|High|Medium|Low]`.
- [ ] Every coverage statement names a specific [[FRAMEWORK]] artefact (file path, command name, rule, module) AND quotes verbatim from that artefact.
- [ ] At least 3 distinct regulations or risk-types from `[[DOMAIN_FILE]]` are referenced across Part 7. No single regulation accounts for the majority of subsections.
- [ ] Every regulatory citation includes either an Article number, section number, or named risk-register entry.
- [ ] Every severity label matches the canonical thresholds from `prompt.md`.
- [ ] All dates use YYYY-MM-DD format.
- [ ] Zero matches for any out-of-scope-corpus token (`ASDLC`, `APLC`, `IGM`, `AEnt-M`, `AEnt_M`, `intelligence-governance-manifesto`, `agentic-enterprise-manifesto`, `agentic-enterprise`, `agentic-governance-stack`, `manifesto-evolution-plan`, `phase-assessment-checklist`, `asdlc/`, `aplc/`, `agentic-sdlc-handbook`, `asdlc-plan`, `aplc-plan`, `igm-aent-coherence-review`) anywhere in the output file. Every cited source file is tracked by git on the current branch. No `[[DOMAIN_FILE]]` content is propagated outside cited regulations and risk-types.
- [ ] The output does NOT contain the words `consider`, `may`, `could potentially`, `perhaps`, or `use judgement`.
- [ ] The output does NOT contain a composite [[FRAMEWORK]] score.
- [ ] The output does NOT contain Part 6 content or the Cross-Document Synthesis (those are 04a/04c territory).
- [ ] Contradictions are distinguished from gaps throughout (`**Contradiction:**` prefix used).
- [ ] The machine-readable `<!-- GAP INVENTORY ... /GAP INVENTORY -->` block is appended after Part 7 closes, with one row per gap and Part reference `P7`.
- [ ] The output file closes with an italic `*Sources read: ...*` footer.
- [ ] All cross-references to other parts use canonical part numbers (Part 1–Part 13), not file names or agent numbers.

---

*Sources to read: all files in `[[FRAMEWORK_LOWER]]/`; `companion/frameworks.md`; `companion/patterns.md`; `companion/principles.md`; `companion/guide.md`; `companion/re-framework.md`; `companion/reference.md`; `[[DOMAIN_FILE]]`; and `[[PRIOR_REVIEWS]]` if not `none`.*
