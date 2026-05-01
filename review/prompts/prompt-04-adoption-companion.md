# Sub-prompt 04 — Adoption & Companion

**Purpose:** Produce Part 6 (Adoption Document Alignment) and Part 7 (Companion Framework Alignment) of a [[FRAMEWORK]] Agentic Engineering Manifesto review, plus a Cross-Document Synthesis that states the realistic adoption ceiling at [[ORGANIZATION]] and the highest-leverage single change.

**Note to orchestrator:** All `[[VARIABLE]]` placeholders in this file must be substituted before this prompt is passed to the agent. If any `[[...]]` pattern remains in your working copy, stop and resolve it before spawning.

**Wave 1 isolation:** This prompt runs in Wave 1 alongside agents 01, 02, 03, 05, and 07. Do not read sibling Wave 1 outputs. Do not produce a composite [[FRAMEWORK]] score (Part 1 is owned by agent 01). Your gap inventory at the end of Part 7 (see §3.6) will be consumed by agent 06 to build Part 11.

**Cross-prompt scope guards:**
- The `companion/frameworks.md` subsection (Part 7) assesses [[FRAMEWORK]]'s alignment with the *guidance* in `companion/frameworks.md`. It does NOT issue the determinative phase placement — that is Part 8, owned by agent 05. Do not pre-empt Part 8.
- The `adoption/pilot.md` subsection (Part 6) issues a pilot-feasibility verdict scoped to `adoption/pilot.md` criteria. It does NOT issue a production-deployment red line — that is Part 9, owned by agent 05.
- The `Highest-Leverage Single Change` (Cross-Document Synthesis) is scoped to the adoption-ceiling unlock implied by Parts 6–7 findings. It is not a remediation roadmap — Part 11 (agent 06) is broader.
- The `adoption/vmodel.md` subsection (Part 6) assesses whether [[FRAMEWORK]] *artefacts* satisfy V-model levels. Cross-reference Part 4 only via canonical part number. Do not re-derive loop-phase content.

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

Suggested reading order: README → CHANGELOG/release notes → top-level rules → core source modules → adoption corpus → companion corpus → `[[DOMAIN_FILE]]`.

### Manifesto adoption corpus — read each file end-to-end

- `adoption/path.md` — 7-step incremental adoption path; Phase 3→4 and Phase 4→5 transitions; domain boundary encoding; evidence bundle requirements; regression gates; formal contracts; durable coordination state; expansion criteria.
- `adoption/playbook.md` — business case; stage-gated investment model; supervision paradox; Agile-to-agentic ceremony conversion; cultural and human side of the transition; failure modes of the change programme.
- `adoption/enterprise.md` — enterprise wave model (Wave 0–3); six enterprise readiness dimensions; heterogeneous maturity management; cross-domain dependencies; governance integration patterns.
- `adoption/metrics.md` — success metrics by phase transition (Phase 1→2 through Phase 4→5); team health metrics; governance overhead metrics; failure modes of the change programme.
- `adoption/roles.md` — how developer, tech lead, QA, operations, platform, domain owner, and product roles evolve through phase transitions; the human side of the transition; sustainable pace.
- `adoption/pilot.md` — pilot selection criteria; pilot structure and duration guidance; success criteria; navigating organisational resistance and politics; first pilot design.
- `adoption/vmodel.md` — Agentic V-Model for regulated organisations; left-arc specification artefacts; right-arc verification artefacts; ALCOA+ compliance properties; traceability requirements; validation vs. verification distinction.

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

### 2.2 Companion file assessment procedure

For each of the six companion files, apply the same five-step procedure as above. Additionally:

- **Identify any place where `[[FRAMEWORK]]` explicitly contradicts or undermines this companion document's guidance.** Label these with a `**Contradiction:**` prefix and assign severity. A contradiction is not the same as a gap — gaps are absences; contradictions are conflicts. Candidate contradiction patterns to actively check:
  - Default autonomy tier vs. `companion/frameworks.md` hard cap.
  - Blast-radius scope (code-only) vs. `companion/principles.md` (data + users + regulatory).
  - Workspace-only isolation vs. `companion/principles.md` data/tool access enforcement.
  - INVEST or deterministic acceptance criteria vs. `companion/re-framework.md` probabilistic assurance targets.
  - Workspace agent configuration scaffolding vs. `companion/guide.md` template requirements.
  - Process-level evaluation vs. `companion/reference.md` outcome validation.
- If no contradiction is found in a subsection, state `**Contradiction:** None identified.` explicitly.

### 2.3 Scoring and grading

**Severity labels and alignment grades operate on different things.** Use the canonical severity thresholds from `prompt.md` for individual gaps. Do not re-quote the severity table here. Parts 6 and 7 do NOT use 0–100 scores. Instead: use alignment grades (see below) at the subsection level, and severity labels (Critical/High/Medium/Low per `prompt.md` thresholds) for individual gaps. Gap severity measures impact on [[ORGANIZATION]]'s regulatory and operational context, not numeric score.

**Alignment grade vocabulary.** Valid alignment grades are ONLY: `Well-aligned`, `Partially aligned`, `Misaligned`. Do not use any other phrasing. Do not invent variants such as `Mostly aligned`, `Conditionally aligned`, or `Aligned with caveats`.

- **Well-aligned** — full coverage across the subsection's primary requirements.
- **Partially aligned** — substantive coverage with identifiable gaps.
- **Misaligned** — coverage so incomplete that the subsection's primary requirements are not met, or the framework actively contradicts the guidance.

A subsection may be `Well-aligned` even if it contains Critical gaps, *provided* those gaps are documented [[FRAMEWORK]] scope exclusions and [[ORGANIZATION]] has a separate control. Disclose this explicitly in the [[ORGANIZATION]] implication paragraph if so.

**Per-step verdicts vs. gap severity.** Inside a subsection, individual checklist steps (e.g., adoption-path Steps 1–7, ALCOA+ properties, V-model arc levels) use `✅ Met` / `🟡 Partial` / `❌ Absent` per-step verdicts. Gap severity labels (`Critical|High|Medium|Low`) annotate each gap bullet. The two label systems do not collide — they label different things.

**Effort sizing for any remediation note** uses the canonical effort labels (S/M/L/XL) from `prompt.md`. Do not re-quote the effort table here.

---

## 3. Output specification

Write the following file exactly:

**File path:** `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04_adoption_companion.md`

Create the `[[FRAMEWORK_LOWER]]/` directory if it does not exist.

### 3.1 Required header

```
# [[FRAMEWORK]] Agent 04 — Adoption & Companion Framework Alignment

**Framework:** [[FRAMEWORK]]
**Version:** [[FRAMEWORK_VERSION]]
**Review date:** <YYYY-MM-DD>
**Reviewer:** Agent 04 (<model-name>)
**Methodology:** Evidence-based alignment against the manifesto adoption corpus (7 files) and companion corpus (6 files); every verdict grounded in named [[FRAMEWORK]] artefacts; [[ORGANIZATION]]-specific implications mapped to [[DOMAIN_FILE]] regulations.
**Context:** [[ORGANIZATION]] — [[INDUSTRY]]
```

If `[[FRAMEWORK_VERSION]]` is `unknown`, derive a concrete version from `pyproject.toml`, `package.json`, `CHANGELOG.md`, or git tag and record it in the Methodology section.

---

### 3.2 Methodology section

Immediately after the header, produce a `## Methodology` section. State: which [[FRAMEWORK]] source artefacts were read; the assessed framework version (with commit hash if HEAD); what was assessed (adoption alignment, companion alignment, contradictions); the scoring approach explicitly (alignment grade per subsection; severity labels per gap; no numeric scoring); how the [[ORGANIZATION]] / [[INDUSTRY]] context was applied; and what was *not* read or was time-boxed. The reference methodology block is approximately 200 words; do not enforce a tighter cap.

---

### 3.3 Per-subsection structural skeleton (mandatory for every Part 6 and Part 7 subsection)

Every subsection (13 total: 7 in Part 6, 6 in Part 7) MUST contain the following named subheadings, in this order:

1. `**Alignment grade:** Well-aligned` / `Partially aligned` / `Misaligned` (the first non-blank line after the H3 heading).
2. `#### What the Document Requires` — 1–2 paragraphs summarising the source file's testable demands, with at least one verbatim quote from the source file.
3. `#### What [[FRAMEWORK]] Covers` — paragraph(s) with cited [[FRAMEWORK]] artefacts (verbatim quotes from named source paths required for every coverage claim).
4. `#### Gaps` — bulleted list. Every bullet ends with `[Severity: Critical|High|Medium|Low]`.
5. `#### Contradictions` (Part 7 only) — bulleted list with `**Contradiction:**` prefix per item; companion guidance violated; [[FRAMEWORK]] artefact creating the conflict; severity. State `**Contradiction:** None identified.` if zero.
6. `#### [[ORGANIZATION]] Implication` — 2–4 sentence paragraph naming a specific regulation Article (with number) or named risk-type entry from `[[DOMAIN_FILE]]`; specific exposure; timing of exposure.

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

### 3.5 Part 7 — Companion Framework Alignment

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

### 3.6 Cross-Document Synthesis

Open with `## Cross-Document Synthesis`.

#### `### Realistic Adoption Ceiling at [[ORGANIZATION]]`

Begin with one verdict sentence in this exact form:

> `[[FRAMEWORK]]` can support adoption up to Phase {N} in `[[INDUSTRY]]` contexts without significant additional tooling.

Then 4–8 evidence bullets. Each bullet must:
- State a specific, concrete constraint (not a generic observation).
- Name the [[FRAMEWORK]] capability gap or default behaviour that creates the constraint.
- Tie the constraint to the maximum adoption level it implies (Phase N, wave N, or domain-class restriction).
- Reference a specific regulation Article (with number) or named risk-type entry from `[[DOMAIN_FILE]]`.
- Cite the specific Part 6 or Part 7 subsection that produced the constraint, e.g., `(see Part 6 — adoption-metrics)`.

Close with one sentence on the single binding constraint that defines the ceiling.

Across all 13 subsections and the synthesis bullets, [[ORGANIZATION]] implications must reference at least 5 distinct regulations or risk-types from `[[DOMAIN_FILE]]`. Do not map all subsections to the same regulation.

#### `### Highest-Leverage Single Change`

Identify the one change to [[FRAMEWORK]]'s capabilities, defaults, or outputs that would have the largest positive impact on the adoption ceiling at [[ORGANIZATION]]. Scoped to adoption-ceiling unlock per Parts 6–7 findings (not a remediation roadmap). The change must be:
- Specific: name the command, artefact, mechanism, or capability that would need to be added or modified.
- Grounded: explain precisely which gaps it closes (cite the Part 6 or Part 7 subsection by canonical part number) and which failure modes it mitigates.
- Proportionate: explain why this change unlocks more ceiling than any other single change.

Optionally, name a secondary change that would unlock additional capability but is not the single highest-leverage item.

---

### 3.7 Gap inventory block (machine-readable)

After Part 7's final subsection (and after Cross-Document Synthesis closes), append a machine-readable gap summary block inside an HTML comment. Agent 06 will read this block to build Part 11.

```
<!-- GAP INVENTORY
- gap-slug-1: {Critical|High|Medium|Low} | {source-doc-slug} | P6,P7 | effort {S|M|L|XL}
- gap-slug-2: ...
/GAP INVENTORY -->
```

One row per gap surfaced in Parts 6 and 7. Use stable kebab-case `gap-slug` identifiers. The `source-doc-slug` is the adoption or companion file slug (e.g., `adoption-metrics`). Part references (P6, P7, or both) indicate where the gap is identified. Effort uses canonical S/M/L/XL labels.

---

## 4. Hard rules

These rules apply without exception.

1. Read [[FRAMEWORK]]'s source artefacts before assessing. Every verdict must be grounded in a specific named file, command, module, or rule from [[FRAMEWORK]]'s own artefacts. Every claim about `[[FRAMEWORK]]` MUST quote verbatim from the named source file with its path. Do not assert capabilities from memory.
2. Read all 13 adoption and companion files end-to-end before assessing. Read the current files — do not score from memory of prior content.
3. State coverage and absence separately for each verdict. Do not merge them.
4. Do not praise [[FRAMEWORK]] for things it does not demonstrably do. Do not penalise it for documented scope gaps — but flag every scope gap explicitly and state the alignment gap it creates for [[ORGANIZATION]].
5. Every [[ORGANIZATION]]-specific implication must map to a specific regulation Article (with Article or section number) or a named risk-type entry from `[[DOMAIN_FILE]]`.
6. Severity labels must use the canonical thresholds from `prompt.md`. Do not invent different thresholds. Do not re-quote them in the output.
7. Use date format YYYY-MM-DD wherever a date appears.
8. When cross-referencing another part of the review within the output file, use canonical part numbers only (e.g., "see Part 3", "see Part 12"). Do not use file names or agent numbers in cross-references. The synthesis-level subsection reference form is `Part 6 — <file-slug>` or `Part 7 — <file-slug>`.
9. Do not reference ASDLC, APLC, `asdlc/`, `aplc/`, `asdlc-plan.md`, `aplc-plan.md`, or `agentic-sdlc-handbook/` anywhere in the output file. These are outside the scope of this review system. Do not propagate `[[DOMAIN_FILE]]` content forward into unrelated synthesis (no domain-file bleed beyond cited regulations and risk-types).
10. Contradictions (where [[FRAMEWORK]]'s behaviour conflicts with companion guidance) are distinct from gaps (where coverage is absent). Label each type explicitly.
11. The output MUST NOT contain the words `consider`, `may`, `could potentially`, `perhaps`, or `use judgement`. Make falsifiable statements grounded in cited artefacts. If evidence is uncertain, state `unverified — source artefact does not address X`.
12. Do not produce a composite [[FRAMEWORK]] score. Part 1 is owned by agent 01.
13. Subsection order within each Part is canonical (per §3.4 and §3.5) and must not be re-ordered.
14. Close the output file with an italic `*Sources read: ...*` footer listing every source file actually read.

---

## 5. Self-check before saving

**Do not save the output file until every item below is confirmed.**

- [ ] Output file path is `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04_adoption_companion.md` with `[[FRAMEWORK_LOWER]]` fully substituted (no literal `[[` remaining in the path).
- [ ] All `[[VARIABLE]]` placeholders in the output file content are substituted — scan for any remaining `[[...]]` patterns.
- [ ] All 7 adoption files are covered, each as a separate H3 subsection in the canonical order (adoption-path, adoption-playbook, adoption-enterprise, adoption-metrics, adoption-roles, adoption-pilot, adoption-vmodel).
- [ ] All 6 companion files are covered, each as a separate H3 subsection in the canonical order (companion-frameworks, companion-patterns, companion-principles, companion-guide, companion-re-framework, companion-reference).
- [ ] Every subsection's first non-blank line is `**Alignment grade:** Well-aligned` / `Partially aligned` / `Misaligned` (one of these three values exactly).
- [ ] Every subsection contains: `What the Document Requires`; `What [[FRAMEWORK]] Covers`; `Gaps`; `[[ORGANIZATION]] Implication`. Every Part 7 subsection additionally contains a `Contradictions` block (zero or more, with companion guidance violated and [[FRAMEWORK]] artefact named, or `**Contradiction:** None identified.`).
- [ ] Every gap bullet ends with a severity label `[Severity: Critical|High|Medium|Low]`.
- [ ] Every coverage statement names a specific [[FRAMEWORK]] artefact (file path, command name, rule, module) AND quotes verbatim from that artefact.
- [ ] The `adoption/path.md` subsection contains an `Output Lifecycle & Version Migration` sub-subsection with 4–6 bullets.
- [ ] The `adoption/pilot.md` subsection ends with a pilot-feasibility verdict (not a production red line).
- [ ] The `adoption/vmodel.md` subsection contains a `**Fundamental incompatibility:**` sub-header.
- [ ] The Cross-Document Synthesis section is present with both `Realistic Adoption Ceiling at [[ORGANIZATION]]` and `Highest-Leverage Single Change` subsections.
- [ ] The `Realistic Adoption Ceiling` subsection opens with the canonical verdict sentence form, contains 4–8 evidence bullets each citing a Part 6 or Part 7 subsection, and closes with the single-binding-constraint sentence.
- [ ] At least 5 distinct regulations or risk-types from `[[DOMAIN_FILE]]` are referenced across the output. No single regulation accounts for the majority of subsections.
- [ ] Every regulatory citation includes either an Article number, section number, or named risk-register entry.
- [ ] Every severity label matches the canonical thresholds from `prompt.md`.
- [ ] All dates use YYYY-MM-DD format.
- [ ] No references to ASDLC, APLC, `asdlc/`, `aplc/`, `asdlc-plan.md`, `aplc-plan.md`, or `agentic-sdlc-handbook/` appear anywhere in the output file. No `[[DOMAIN_FILE]]` content is propagated outside cited regulations and risk-types.
- [ ] The output does NOT contain the words `consider`, `may`, `could potentially`, `perhaps`, or `use judgement`.
- [ ] The output does NOT contain a composite [[FRAMEWORK]] score.
- [ ] Contradictions are distinguished from gaps throughout Part 7 (`**Contradiction:**` prefix used).
- [ ] The machine-readable `<!-- GAP INVENTORY ... /GAP INVENTORY -->` block is appended after the synthesis section, with one row per gap.
- [ ] The output file closes with an italic `*Sources read: ...*` footer.
- [ ] All cross-references to other parts use canonical part numbers (Part 1–Part 13), not file names or agent numbers.

---

*Sources to read: all files in `[[FRAMEWORK_LOWER]]/`; `adoption/path.md`; `adoption/playbook.md`; `adoption/enterprise.md`; `adoption/metrics.md`; `adoption/roles.md`; `adoption/pilot.md`; `adoption/vmodel.md`; `companion/frameworks.md`; `companion/patterns.md`; `companion/principles.md`; `companion/guide.md`; `companion/re-framework.md`; `companion/reference.md`; `[[DOMAIN_FILE]]`; and `[[PRIOR_REVIEWS]]` if not `none`.*
