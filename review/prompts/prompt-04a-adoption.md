# Sub-prompt 04a — Adoption Document Alignment (Part 6 only)

**Purpose:** Produce Part 6 (Adoption Document Alignment) of a [[FRAMEWORK]] Agentic Engineering Manifesto review. This agent (04a) is one of three siblings (04a, 04b, 04c) that together replace the former monolithic agent 04. 04a covers the seven adoption corpus files only; 04b covers the six companion corpus files; 04c reads both and produces the canonical combined output plus the Cross-Document Synthesis. 04a runs in parallel with 04b; both must complete and be non-empty before 04c starts.

**Note to orchestrator:** All `[[VARIABLE]]` placeholders in this file must be substituted before this prompt is passed to the agent. If any `[[...]]` pattern remains in your working copy, stop and resolve it before spawning.

**Wave 1 isolation:** This prompt runs in Wave 1 alongside agents 01, 02, 03, 04b, 05, and 07. Do not read sibling Wave 1 outputs. Do not produce a composite [[FRAMEWORK]] score (Part 1 is owned by agent 01). Your gap inventory at the end of the file (see §3.4) will be consumed by agent 04c (synthesis) and ultimately by agent 06 (which builds Part 11 from the combined 04 output).

**Cross-prompt scope guards:**
- The `adoption/pilot.md` subsection (Part 6) issues a pilot-feasibility verdict scoped to `adoption/pilot.md` criteria. It does NOT issue a production-deployment red line — that is Part 9, owned by agent 05.
- The `adoption/vmodel.md` subsection (Part 6) assesses whether [[FRAMEWORK]] *artefacts* satisfy V-model levels. Cross-reference Part 4 only via canonical part number. Do not re-derive loop-phase content.
- Do not pre-empt Part 8 (maturity placement, owned by agent 05).
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
- Anything covering adoption guidance, role transitions, organisational change, pilots, V-Model integration, or requirements engineering.

Suggested reading order: README → CHANGELOG/release notes → top-level rules → core source modules → adoption corpus → `[[DOMAIN_FILE]]`.

### Manifesto adoption corpus — read each file end-to-end

- `adoption/path.md` — 7-step incremental adoption path; Phase 3→4 and Phase 4→5 transitions; domain boundary encoding; evidence bundle requirements; regression gates; formal contracts; durable coordination state; expansion criteria.
- `adoption/playbook.md` — business case; stage-gated investment model; supervision paradox; Agile-to-agentic ceremony conversion; cultural and human side of the transition; failure modes of the change programme.
- `adoption/enterprise.md` — enterprise wave model (Wave 0–3); six enterprise readiness dimensions; heterogeneous maturity management; cross-domain dependencies; governance integration patterns.
- `adoption/metrics.md` — success metrics by phase transition (Phase 1→2 through Phase 4→5); team health metrics; governance overhead metrics; failure modes of the change programme.
- `adoption/roles.md` — how developer, tech lead, QA, operations, platform, domain owner, and product roles evolve through phase transitions; the human side of the transition; sustainable pace.
- `adoption/pilot.md` — pilot selection criteria; pilot structure and duration guidance; success criteria; navigating organisational resistance and politics; first pilot design.
- `adoption/vmodel.md` — Agentic V-Model for regulated organisations; left-arc specification artefacts; right-arc verification artefacts; ALCOA+ compliance properties; traceability requirements; validation vs. verification distinction.

### Domain file

- `[[DOMAIN_FILE]]` — read end-to-end. Every [[ORGANIZATION]]-specific implication in the output must map to a specific regulation Article (with Article or section number) or named risk-type entry from this file. Do not propagate `[[DOMAIN_FILE]]` content forward outside its scope (no synthesis of unrelated domain material).

### Prior reviews

- If `[[PRIOR_REVIEWS]]` is not `none`, read the files listed there for peer comparison. Do not transfer scores — derive every verdict independently from [[FRAMEWORK]]'s own artefacts.

---

## 2. Methodology

### 2.1 Adoption file assessment procedure

For each of the seven adoption files, assess [[FRAMEWORK]]'s coverage in the following sequence:

1. **Identify the requirements.** Summarise what the adoption file requires — the specific infrastructure, capabilities, metrics, or processes an implementing framework must provide. Quote at least one verbatim phrase from the source file (in markdown blockquote or inline backticks) so the reader can verify the requirement is real.
2. **Assess coverage.** Evaluate whether [[FRAMEWORK]] provides:
   - **Full coverage** — the requirement is demonstrably met by a named [[FRAMEWORK]] artefact, command, or mechanism.
   - **Partial coverage** — [[FRAMEWORK]] addresses part of the requirement or provides a component that partially satisfies it.
   - **No coverage** — [[FRAMEWORK]] does not address the requirement; it is either absent or explicitly out of scope.
3. **Cite evidence.** For each verdict, cite specific [[FRAMEWORK]] artefact names, file paths, command names, or rule text. Every claim about `[[FRAMEWORK]]` MUST quote verbatim from a named source file with its path (e.g., `core/strategy.py`, `abcd verify --phase`). Do not assert coverage without a citation.
4. **Identify gaps.** For partial and absent coverage, state precisely what is missing and assign a severity label (Critical / High / Medium / Low) using the canonical thresholds defined in `prompt.md`.
5. **State [[ORGANIZATION]] implication.** End each subsection with a [[ORGANIZATION]]-specific implication paragraph (2–4 sentences) that names a specific regulation Article (with Article or section number) or named risk-type entry from `[[DOMAIN_FILE]]`, describes the specific exposure (operational, regulatory, financial), and states the timing of the exposure (immediate, on next phase transition, on supervisory review).

### 2.2 Scoring and grading

**Severity labels and alignment grades operate on different things.** Use the canonical severity thresholds from `prompt.md` for individual gaps. Do not re-quote the severity table here. Part 6 does NOT use 0–100 scores. Instead: use alignment grades (see below) at the subsection level, and severity labels (Critical/High/Medium/Low per `prompt.md` thresholds) for individual gaps. Gap severity measures impact on [[ORGANIZATION]]'s regulatory and operational context, not numeric score.

**Alignment grade vocabulary.** Valid alignment grades are ONLY: `Well-aligned`, `Partially aligned`, `Misaligned`. Do not use any other phrasing. Do not invent variants such as `Mostly aligned`, `Conditionally aligned`, or `Aligned with caveats`.

- **Well-aligned** — full coverage across the subsection's primary requirements.
- **Partially aligned** — substantive coverage with identifiable gaps.
- **Misaligned** — coverage so incomplete that the subsection's primary requirements are not met, or the framework actively contradicts the guidance.

A subsection may be `Well-aligned` even if it contains Critical gaps, *provided* those gaps are documented [[FRAMEWORK]] scope exclusions and [[ORGANIZATION]] has a separate control. Disclose this explicitly in the [[ORGANIZATION]] implication paragraph if so.

**Per-step verdicts vs. gap severity.** Inside a subsection, individual checklist steps (e.g., adoption-path Steps 1–7, ALCOA+ properties, V-model arc levels) use `✅ Met` / `🟡 Partial` / `❌ Absent` per-step verdicts. Gap severity labels (`Critical|High|Medium|Low`) annotate each gap bullet. The two label systems do not collide — they label different things.

**Effort sizing for any remediation note** uses the canonical effort labels (S/M/L/XL) from `prompt.md`. Do not re-quote the effort table here.

**Contradiction detection.** Where [[FRAMEWORK]]'s default behaviour or scoped artefacts actively conflict with the adoption document's guidance (not merely fail to cover it), surface that conflict inside the subsection's `Gaps` block prefixed with `**Contradiction:**` and assigned a severity. Contradictions remain rare in Part 6; the systematic contradiction sweep belongs to Part 7 (agent 04b).

---

## 3. Output specification

Write the following file exactly:

**File path:** `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04a_adoption.md`

Create the `[[FRAMEWORK_LOWER]]/` directory if it does not exist.

### 3.1 Required header

```
# [[FRAMEWORK]] Agent 04a — Adoption Document Alignment (Part 6)

**Framework:** [[FRAMEWORK]]
**Version:** [[FRAMEWORK_VERSION]]
**Review date:** <YYYY-MM-DD>
**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]`
**Reviewer:** Agent 04a (<model-name>)
**Methodology:** Evidence-based alignment against the manifesto adoption corpus (7 files); every verdict grounded in named [[FRAMEWORK]] artefacts; [[ORGANIZATION]]-specific implications mapped to [[DOMAIN_FILE]] regulations.
**Context:** [[ORGANIZATION]] — [[INDUSTRY]]
**Sibling outputs:** This file is consumed (with `[[FRAMEWORK_LOWER]]_review_04b_companion.md`) by agent 04c, which produces the combined `[[FRAMEWORK_LOWER]]_review_04_adoption_companion.md`.
```

If `[[FRAMEWORK_VERSION]]` is `unknown`, derive a concrete version from `pyproject.toml`, `package.json`, `CHANGELOG.md`, or git tag and record it in the Methodology section.

---

### 3.2 Methodology section

Immediately after the header, produce a `## Methodology` section. State: which [[FRAMEWORK]] source artefacts were read; the assessed framework version (with commit hash if HEAD); what was assessed (adoption alignment only — companion alignment is in 04b, synthesis is in 04c); the scoring approach explicitly (alignment grade per subsection; severity labels per gap; no numeric scoring); how the [[ORGANIZATION]] / [[INDUSTRY]] context was applied; and what was *not* read or was time-boxed. The reference methodology block is approximately 200 words; do not enforce a tighter cap.

---

### 3.3 Per-subsection structural skeleton (mandatory for every Part 6 subsection)

Every subsection (7 total) MUST contain the following named subheadings, in this order:

1. `**Alignment grade:** Well-aligned` / `Partially aligned` / `Misaligned` (the first non-blank line after the H3 heading).
2. `#### What the Document Requires` — 1–2 paragraphs summarising the source file's testable demands, with at least one verbatim quote from the source file.
3. `#### What [[FRAMEWORK]] Covers` — paragraph(s) with cited [[FRAMEWORK]] artefacts (verbatim quotes from named source paths required for every coverage claim).
4. `#### Gaps` — bulleted list. Every bullet ends with `[Severity: Critical|High|Medium|Low]`. If a contradiction is identified inside Part 6, prefix that bullet with `**Contradiction:**`.
5. `#### [[ORGANIZATION]] Implication` — 2–4 sentence paragraph naming a specific regulation Article (with number) or named risk-type entry from `[[DOMAIN_FILE]]`; specific exposure; timing of exposure.

**Depth is proportional to the document's significance.** A document where `[[FRAMEWORK]]` has major coverage or major gap warrants more depth. Minimum: 6 substantive bullets or 3 paragraphs of analysis. Do not pad to a target line count.

**Heading format:** Use H3 (`### `) for each file's heading. Wrap the filename in backticks. Format example: `` ### `adoption/path.md` — Adoption Path and Phase Transitions ``.

**Strengths surfacing:** Where [[FRAMEWORK]] demonstrably meets a requirement, name it as a strength inside `What [[FRAMEWORK]] Covers` even if other parts of the subsection are partial or absent.

**In-development capabilities:** If a manifesto requirement is partially addressed by an in-development [[FRAMEWORK]] capability (milestone, ticket, roadmap item), state the capability and its in-development status. Do NOT credit it as covered.

**Anti-hedging:** Make falsifiable statements grounded in cited artefacts. If evidence is uncertain, state `unverified — source artefact does not address X`.

---

### 3.4 Part 6 — Adoption Document Alignment

Open with `## Part 6 — Adoption Document Alignment`. Produce the following seven subsections in this exact order. Apply the structural skeleton from §3.3 to each.

#### `### \`adoption/path.md\` — Adoption Path and Phase Transitions`

Assess [[FRAMEWORK]]'s support for the 7-step incremental adoption path:
- Step 1: Domain boundary encoding and autonomy tier infrastructure enforcement (not just prompt-level constraints).
- Step 2: Evidence bundle consolidation — does [[FRAMEWORK]] produce a single, auditable artefact containing diff, test report, trace link, and rollback note?
- Step 3: Regression gate infrastructure before autonomy expansion.
- Step 4: Adversarial and security evaluations on agent-exposed surfaces (not only code-level SAST).
- Step 5: Durable coordination state for multi-agent workflows — lease management, restart-safe handoffs.
- Step 6: Formal contract capability on high-blast-radius paths.
- Step 7: Incident rate and escaped-defect-rate tracking as expansion gates.

Assign a per-step `✅ Met` / `🟡 Partial` / `❌ Absent` verdict.

#### Output Lifecycle & Version Migration

Include a `#### Output Lifecycle & Version Migration` sub-subsection (4–6 bullets) covering how `[[FRAMEWORK]]` supports output retention, versioning, and migration across framework versions. Include: whether [[FRAMEWORK]] stamps its output artefacts with the producing framework version; whether there is a migration path for artefacts produced by prior versions; whether the audit log is centrally accessible rather than local-only; and the consequence for [[ORGANIZATION]]'s multi-year regulatory artefact horizon.

#### `### \`adoption/playbook.md\` — Organisational Change Readiness`

Assess [[FRAMEWORK]]'s support for:
- Business case metrics: total cost of correctness, escaped defect rate, cycle time from specification to verified deployment.
- Supervision paradox tooling: does [[FRAMEWORK]] provide structured evidence that reduces reviewer cognitive load? Does it capture reasoning traces (not only what was done, but why)?
- Agile-to-agentic ceremony conversion: standup replacement; evidence bundle review replacing sprint review; memory curation replacing retrospective.
- Cultural and human dimensions: note explicitly if these are out of [[FRAMEWORK]]'s scope, and state the implication for [[ORGANIZATION]]'s change programme.

#### `### \`adoption/enterprise.md\` — Enterprise Wave Model`

Assess [[FRAMEWORK]]'s readiness for each wave:
- Wave 0 (one team, one domain, Phase 3→4): Can [[FRAMEWORK]] be safely deployed for a pilot? Does it produce the governance evidence artefacts Wave 0 requires?
- Wave 1 (3–5 teams, cross-domain patterns): Does [[FRAMEWORK]] support cross-team traceability, enterprise governance aggregation, and multi-team autonomy tier management?
- Wave 2 (all teams, Phase 4 minimum): Does [[FRAMEWORK]] provide memory governance infrastructure, behavioural observability, and shared evaluation registries?
- Wave 3 (Phase 5, formal methods): Does [[FRAMEWORK]] support verified inter-domain contracts, enterprise evaluation registries, and enterprise-level autonomy tier governance?

Assess all six enterprise readiness dimensions: current agentic maturity distribution, existing governance integration, infrastructure readiness (reasoning observability, memory, evaluation pipelines), skill distribution, regulatory exposure, and organisational change capacity.

#### `### \`adoption/metrics.md\` — Measurement Readiness`

Produce a coverage table with the following columns: Metric | Phase | [[FRAMEWORK]] Support | Verdict (✅/🟡/❌) | Evidence. Cover the full set of metrics from `adoption/metrics.md` across Phase 1→2, Phase 2→3, Phase 3→4, Phase 4→5, team health, and governance overhead (one row per metric). After the table, summarise the proportion met, partially met, and absent. State the consequence for [[ORGANIZATION]]'s ability to demonstrate phase transition readiness to a regulator or board.

#### `### \`adoption/roles.md\` — Role Transition Assessment`

Produce a coverage table with columns: Role | [[FRAMEWORK]] Support | Verdict (✅/🟡/❌) | Evidence. Cover, in this order: Developer (specification author), Developer (code reviewer), Tech Lead (architecture), QA Engineer (test generation), QA Engineer (evaluation design), Operations Engineer (deployment), Operations Engineer (behavioural observability), Platform Engineer (agent runtime), Platform Engineer (memory governance), Domain Owner (autonomy tier assignment), Product Owner (loop-ready specification), Specification Analyst. After the table, list the roles absent from [[FRAMEWORK]]'s tooling scope with a note on the consequence for [[ORGANIZATION]].

#### `### \`adoption/pilot.md\` — Pilot Design Readiness`

Assess:
- Pilot selection criteria alignment: which pilot domains at [[ORGANIZATION]] are safe for [[FRAMEWORK]] deployment?
- Pilot structure compatibility: sprint tracking, team size, scope enforcement, tooling investment.
- Pilot success criteria alignment: escaped defect rate tracking, evidence bundle assembly time, lesson capture, specification refinement.
- [[INDUSTRY]]-specific guard rails from `[[DOMAIN_FILE]]`: which autonomy domains require additional controls beyond [[FRAMEWORK]]'s defaults?
- Conclude with a clear pilot-feasibility verdict scoped to `adoption/pilot.md` criteria: "[[FRAMEWORK]] is pilot-feasible at [[ORGANIZATION]] in [domains] / not pilot-feasible in [domains] without [specific additional controls]." Do not extend this to a production-deployment red line — that is Part 9 territory.

#### `### \`adoption/vmodel.md\` — V-Model Integration`

Assess each arc:

**Left arc (specification):** For each V-model left level (Outcome Specifications, System Specifications, Agent Architecture, Context and Domain Design, Implementation), produce a row with: V-Model Level | [[FRAMEWORK]] Artefact | Produced By | Verdict (✅/🟡/❌). Note any regulatory annotation gaps (blast-radius, regulatory classification linkage).

**Right arc (verification):** For each V-model right level (Per-Agent Evaluation, Test Quality Gates, Cross-Agent Verification, System-Level Evaluation, Acceptance & Accountability), apply the same row format.

**ALCOA+ compliance:** Assess each ALCOA+ property (Attributable, Contemporaneous, Legible, Original, Accurate, Enduring, Complete, Consistent, Available) against [[FRAMEWORK]]'s artefacts. Use ✅ / 🟡 / ❌. State the consequence for [[ORGANIZATION]]'s V-model regulatory audit evidence requirements.

**Fundamental incompatibility statement:** Under a `**Fundamental incompatibility:**` sub-header, state the single most fundamental incompatibility between [[FRAMEWORK]]'s verification model and the V-model's requirements, with specific regulatory consequence for [[ORGANIZATION]] under `[[DOMAIN_FILE]]`. Bound this to ~3 sentences.

---

### 3.5 Gap inventory block (machine-readable)

After the seventh subsection closes, append a machine-readable gap summary block inside an HTML comment. Agent 04c will read this block (alongside agent 04b's block) to build the Cross-Document Synthesis; agent 06 will subsequently read the merged form to build Part 11.

```
<!-- GAP INVENTORY
- gap-slug-1: {Critical|High|Medium|Low} | {source-doc-slug} | P6 | effort {S|M|L|XL}
- gap-slug-2: ...
/GAP INVENTORY -->
```

One row per gap surfaced in Part 6. Use stable kebab-case `gap-slug` identifiers. The `source-doc-slug` is the adoption file slug (e.g., `adoption-metrics`). The Part reference is always `P6` for this file. Effort uses canonical S/M/L/XL labels.

---

## 4. Hard rules

These rules apply without exception. See `prompt.md` for the canonical severity, weighting, and effort tables — do not re-quote them.

1. Read [[FRAMEWORK]]'s source artefacts before assessing. Every verdict must be grounded in a specific named file, command, module, or rule from [[FRAMEWORK]]'s own artefacts. Every claim about `[[FRAMEWORK]]` MUST quote verbatim from the named source file with its path. Do not assert capabilities from memory.
2. Read all 7 adoption files end-to-end before assessing. Read the current files — do not score from memory of prior content.
3. State coverage and absence separately for each verdict. Do not merge them.
4. Do not praise [[FRAMEWORK]] for things it does not demonstrably do. Do not penalise it for documented scope gaps — but flag every scope gap explicitly and state the alignment gap it creates for [[ORGANIZATION]].
5. Every [[ORGANIZATION]]-specific implication must map to a specific regulation Article (with Article or section number) or a named risk-type entry from `[[DOMAIN_FILE]]`.
6. Severity labels must use the canonical thresholds from `prompt.md`. Do not invent different thresholds. Do not re-quote them in the output.
7. Use date format YYYY-MM-DD wherever a date appears.
8. When cross-referencing another part of the review within the output file, use canonical part numbers only (e.g., "see Part 3", "see Part 12"). Do not use file names or agent numbers in cross-references. The synthesis-level subsection reference form is `Part 6 — <file-slug>`.
9. Do not reference ASDLC, APLC, `asdlc/`, `aplc/`, `asdlc-plan.md`, `aplc-plan.md`, or `agentic-sdlc-handbook/` anywhere in the output file. These are outside the scope of this review system. Do not propagate `[[DOMAIN_FILE]]` content forward into unrelated synthesis (no domain-file bleed beyond cited regulations and risk-types).
10. The output MUST NOT contain the words `consider`, `may`, `could potentially`, `perhaps`, or `use judgement`. Make falsifiable statements grounded in cited artefacts. If evidence is uncertain, state `unverified — source artefact does not address X`.
11. Do not produce a composite [[FRAMEWORK]] score. Part 1 is owned by agent 01.
12. Do not produce Part 7 content (companion alignment) or the Cross-Document Synthesis. Those are owned by agents 04b and 04c respectively.
13. Subsection order within Part 6 is canonical (per §3.4) and must not be re-ordered.
14. Close the output file with an italic `*Sources read: ...*` footer listing every source file actually read.

---

## 5. Self-check before saving

**Do not save the output file until every item below is confirmed.**

- [ ] Output file path is `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04a_adoption.md` with `[[FRAMEWORK_LOWER]]` fully substituted (no literal `[[` remaining in the path).
- [ ] All `[[VARIABLE]]` placeholders in the output file content are substituted — scan for any remaining `[[...]]` patterns.
- [ ] All 7 adoption files are covered, each as a separate H3 subsection in the canonical order (adoption-path, adoption-playbook, adoption-enterprise, adoption-metrics, adoption-roles, adoption-pilot, adoption-vmodel).
- [ ] Every subsection's first non-blank line is `**Alignment grade:** Well-aligned` / `Partially aligned` / `Misaligned` (one of these three values exactly).
- [ ] Every subsection contains: `What the Document Requires`; `What [[FRAMEWORK]] Covers`; `Gaps`; `[[ORGANIZATION]] Implication`.
- [ ] Every gap bullet ends with a severity label `[Severity: Critical|High|Medium|Low]`.
- [ ] Every coverage statement names a specific [[FRAMEWORK]] artefact (file path, command name, rule, module) AND quotes verbatim from that artefact.
- [ ] The `adoption/path.md` subsection contains an `Output Lifecycle & Version Migration` sub-subsection with 4–6 bullets.
- [ ] The `adoption/pilot.md` subsection ends with a pilot-feasibility verdict (not a production red line).
- [ ] The `adoption/vmodel.md` subsection contains a `**Fundamental incompatibility:**` sub-header.
- [ ] At least 3 distinct regulations or risk-types from `[[DOMAIN_FILE]]` are referenced across Part 6. No single regulation accounts for the majority of subsections.
- [ ] Every regulatory citation includes either an Article number, section number, or named risk-register entry.
- [ ] Every severity label matches the canonical thresholds from `prompt.md`.
- [ ] All dates use YYYY-MM-DD format.
- [ ] No references to ASDLC, APLC, `asdlc/`, `aplc/`, `asdlc-plan.md`, `aplc-plan.md`, or `agentic-sdlc-handbook/` appear anywhere in the output file. No `[[DOMAIN_FILE]]` content is propagated outside cited regulations and risk-types.
- [ ] The output does NOT contain the words `consider`, `may`, `could potentially`, `perhaps`, or `use judgement`.
- [ ] The output does NOT contain a composite [[FRAMEWORK]] score.
- [ ] The output does NOT contain Part 7 content or the Cross-Document Synthesis (those are 04b/04c territory).
- [ ] The machine-readable `<!-- GAP INVENTORY ... /GAP INVENTORY -->` block is appended after Part 6 closes, with one row per gap and Part reference `P6`.
- [ ] The output file closes with an italic `*Sources read: ...*` footer.
- [ ] All cross-references to other parts use canonical part numbers (Part 1–Part 13), not file names or agent numbers.

---

*Sources to read: all files in `[[FRAMEWORK_LOWER]]/`; `adoption/path.md`; `adoption/playbook.md`; `adoption/enterprise.md`; `adoption/metrics.md`; `adoption/roles.md`; `adoption/pilot.md`; `adoption/vmodel.md`; `[[DOMAIN_FILE]]`; and `[[PRIOR_REVIEWS]]` if not `none`.*
