# Sub-prompt 05 — Maturity & Industry

**Purpose:** Produce Part 8 (Maturity Phase Placement) and Part 9 (Industry & Client
Assessment) for the `[[FRAMEWORK]]` review. This sub-prompt is spawned by the master
orchestrator (`prompt.md`) and runs independently in Wave 1.

**Canonical references (do not re-quote):** Weighting scheme, severity thresholds, and
effort sizing are defined exclusively in `prompt.md`. Reference them by name (e.g.,
"the canonical severity thresholds from `prompt.md`"). Do NOT re-quote the tables in
this sub-prompt or in the output.

**Placeholder reminder:** Before execution, verify that all `[[VARIABLE]]` tokens have
been substituted. If any literal `[[...]]` text remains, stop and report the unset
variable to the orchestrator — do not proceed.

**Naming note:** The output file is always named
`[[FRAMEWORK_LOWER]]_review_05_maturity_financial.md` regardless of which domain
`[[DOMAIN_FILE]]` resolves to. The `_financial` suffix is a historical artefact of
the file's origin; the *content* of Part 9 is fully domain-specific and adapts to
whatever `[[DOMAIN_FILE]]` contains.

**Banned soft language (output MUST NOT contain):** `consider`, `may`, `could
potentially`, `perhaps`, `use judgement`. Replace each with a specific evidenced claim
or an explicit gap. This is a hard prohibition, not guidance.

---

## Inputs to Read

Read all of the following before writing a single word of the output. Do not score
from memory. Quote specific file names, rule text, phase numbers, and clause
references wherever possible.

1. `[[FRAMEWORK]]` source artefacts — all available files under `[[FRAMEWORK_LOWER]]/`.
   Read enough to form an evidence-grounded opinion on every maturity criterion below.
2. `manifesto.md` — the six-phase maturity spectrum (Phase 1 through Phase 6) and the
   Agentic Loop phase definitions.
3. `companion/frameworks.md` — the peer framework comparison table, the hard autonomy
   caps by regulated use case, and the boundary condition guidance.
4. `phase-assessment-checklist.md` — the hard proof standard and per-phase evidence
   requirements for all six phases.
5. `[[DOMAIN_FILE]]` — the full domain regulatory alignment mapping for
   `[[INDUSTRY]]`. Read every section: regulatory requirements, use-case cap table,
   and any domain-specific autonomy cap guidance.
6. `[[PRIOR_REVIEWS]]` — if not `none`, read the listed review files for peer
   framework context before completing the Comparison with Peer Frameworks section.

---

## Methodology

### Part 8 — Maturity Phase Placement

**Step 1 — Evidence inventory.** For each of the six phases, collect every piece
of positive and negative evidence from `[[FRAMEWORK]]`'s source artefacts. Evidence
must be attributable (file name, function name, rule text) and contemporaneous (in
the artefacts as they stand, not as they are planned).

**Step 2 — Gate-by-gate assessment.** Work through the Phase Assessment Checklist
(`phase-assessment-checklist.md`) for each phase in ascending order. Mark each gate
as: met (evidence on file), partial (evidence present but incomplete), or unmet
(no evidence). An unmet gate at Phase N means `[[FRAMEWORK]]` cannot be placed at
Phase N or higher.

**Step 3 — Verdict.** The highest phase `[[FRAMEWORK]]` defensibly occupies is
bounded by the lowest unmet gate. Partial credit is not awarded for phase placement —
a partially met gate is an unmet gate. State the maturity verdict as a single
standalone bold line of the exact form:

```
**Maturity Verdict: Phase {N}**
```

This is the machine-readable token consumed by agent 06 to set Part 11's gap target.
`{N}` MUST be a single digit (1–6). Annotations about proto-elements, evidence in
favour of the next phase, and the bounding-gate explanation go in the body paragraph
*below* the verdict line — never on the verdict line itself. The body paragraph names
the specific gates that prevent the next-phase claim and explains why each matters
for governed agentic engineering.

**Step 4 — Evidence matrix.** Build a markdown table with one row per material
capability criterion (cover all six phases; include both met and unmet rows). Columns:
Phase / Required Capability / `[[FRAMEWORK]]` Evidence / Gap. Use ✅ / 🟡 / ❌ status
symbols consistently.

**Step 5 — Phase Gate Non-Negotiables.** Produce a markdown table — NOT a flat
bulleted list — of every unmet or partial gate that prevents the next-phase claim.
The table MUST use this exact column header:

```
| Gate | Required to reach Phase {N+1} | [[FRAMEWORK]] status | Severity |
```

Use `met` / `partial` / `unmet` in the status column. Severity uses the canonical
thresholds from `prompt.md`. Every claim in the gate description and status cells
must quote verbatim from a named source file with path (e.g., ``verify_phases.py
line 142: `check_traceability(threshold=0.7)`` from `[[FRAMEWORK_LOWER]]/src/...`).

**Step 6 — Peer comparison.** Using `companion/frameworks.md` and any frameworks
listed in `[[PRIOR_REVIEWS]]`, build a short comparison. If no prior reviews are
available, note this explicitly and limit comparison to what `companion/frameworks.md`
provides. Do not fabricate peer data.

**Step 7 — Economics assessment.** Anchor this sub-section explicitly to **P11
(Optimize economics of intelligence)**. Assess `[[FRAMEWORK]]`'s token-cost tracking,
model routing maturity, and cost-attribution capability at its phase placement.
Cover, at minimum, all four P11 dimensions:

1. **Model-tier selection maturity** — does `[[FRAMEWORK]]` select model tiers
   (Opus/Sonnet/Haiku class) by task complexity? Cite the routing module or note
   its absence.
2. **Token-cost attribution per workflow** — can `[[FRAMEWORK]]` attribute cost to a
   specific workflow / phase engine output (not just to a session or work item)?
3. **Cost-SLO existence** — is there a configured per-task or per-workflow budget
   ceiling that blocks or warns *before* execution?
4. **Dynamic routing capability** — does `[[FRAMEWORK]]` re-route on cost-pressure
   or quality signals at runtime?

Identify gaps relative to what the manifesto requires at `[[FRAMEWORK]]`'s current
phase and the next phase. Every claim must quote verbatim from a named source file
with path.

### Part 9 — Industry & Client Assessment

**Step 8 — Regulatory Exposure Map.** Apply the material regulations enumerated in
`[[DOMAIN_FILE]]`. Enumerate regulations **exclusively** from `[[DOMAIN_FILE]]`'s
regulatory mapping sections — section headers, table columns, and autonomy-cap rows.
Do NOT assume financial-services regulations (e.g., SR 11-7, DORA, Solvency II) for
non-financial-services domain files. Do NOT import regulations from memory; if a
regulation is not named in `[[DOMAIN_FILE]]`, it is out of scope.

For every regulation so identified, build one row in a markdown table: Regulation
(with clause / section / article / paragraph / annex reference verbatim from
`[[DOMAIN_FILE]]`) / Applicability to `[[ORGANIZATION]]` / `[[FRAMEWORK]]` Coverage /
Gap / Severity. Coverage must be grounded in `[[FRAMEWORK]]` source artefacts —
quote the exact file path and line/function that provides (or fails to provide)
the required control. Severity uses the canonical thresholds from `prompt.md`.

**Step 9 — Use-Case Fitness Analysis.** Identify 4–8 named use cases for `[[ORGANIZATION]]`.
Name use cases **verbatim** from `[[DOMAIN_FILE]]`'s example use cases (use-case cap
table or named workflow examples). Do NOT invent use cases that are not present in
`[[DOMAIN_FILE]]`. If `[[DOMAIN_FILE]]` does not contain enough named use cases,
state this and use only what is present.

Read `companion/frameworks.md`'s **hard-autonomy-caps-by-regulated-use-case** table
(section "Hard Autonomy Caps by Regulated Use Case"). For each use case in this
analysis, note the autonomy-cap ceiling it faces (e.g., "Tier 2 cap — human approval
mandatory") and treat that ceiling as a hard upper bound on Fit verdicts.

For each use case, state: Fit / Conditional / Unfit. Justify each verdict by citing
(a) the regulatory constraint quoted verbatim from `[[DOMAIN_FILE]]` with article /
section / clause reference, (b) the autonomy-cap ceiling from `companion/frameworks.md`,
and (c) the specific `[[FRAMEWORK]]` capability or gap (with file path) that
determines fitness. Do not mark a use case Conditional without stating exactly what
additional control would make it Fit.

**Step 10 — The Red Line.** State, in plain language, the workflows where deploying
`[[FRAMEWORK]]` for `[[ORGANIZATION]]` would be regulator-impermissible regardless of
internal sign-off. For each prohibited workflow, cite: (a) the controlling regulation
and specific article or section from `[[DOMAIN_FILE]]`, and (b) the exact missing
control in `[[FRAMEWORK]]` that creates the hard stop. This section must be present
even if the list is short.

**Step 11 — Deployment Path.** Recommend a dependency-ordered staged rollout.
Typically 3–6 stages for regulated deployments (raise the count above 6 when the
regulatory mapping in `[[DOMAIN_FILE]]` requires it; do NOT compress essential
stages to fit an arbitrary cap). Each stage MUST specify:

- **(a) Named workflows in scope** — drawn verbatim from `[[DOMAIN_FILE]]`'s use-case
  list and the Use-Case Fitness Analysis above.
- **(b) Gating evidence required before next stage** — concrete artefact paths,
  named approvals, or named validation reports.
- **(c) Expected calendar timeline** — using the canonical effort-sizing labels
  (S / M / L / XL) from `prompt.md`.

The path must be dependency-ordered — each stage's gating evidence must logically
precede the workflows unlocked by the next stage.

---

## Output Specification

**Output filename disclaimer (mandatory first content of the output file).** Begin
the output file with the following blockquote line, verbatim, before any other
content:

```
> Note: This file is named `_review_05_maturity_financial.md` for historical reasons, regardless of the domain under review. Part 9 content is fully domain-specific and adapts to [[DOMAIN_FILE]].
```

Write the output file to:

```
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_05_maturity_financial.md
```

Create the `[[FRAMEWORK_LOWER]]/` directory if it does not exist. Use the exact
structure below. Do not add, remove, or rename sections.

---

### Required Structure

```
# [[FRAMEWORK]] Review 05 — Maturity Phase Placement and [[INDUSTRY]] Assessment

**Framework reviewed:** [[FRAMEWORK]]
**Framework version:** [[FRAMEWORK_VERSION]]
**Client context:** [[ORGANIZATION]] — [[INDUSTRY]]
**Source artefacts read:** [list every file read, one per bullet]
**Prior reviews:** [[PRIOR_REVIEWS]]
**Review date:** YYYY-MM-DD

---

## Part 8 — Maturity Phase Placement

### The Verdict

[Begin with a single standalone bold line in the exact form
`**Maturity Verdict: Phase {N}**` where `{N}` is a single digit 1–6. This is the
machine-readable token consumed by agent 06.

Then one paragraph. Name the bounding gate(s) that prevent the next-phase claim.
Acknowledge any verified proto-elements of the next phase but do not let them
override the verdict. Cite evidence FOR a higher placement and the evidence that
overrides it. Be direct.]

---

### Evidence Matrix

| Phase | Required Capability | [[FRAMEWORK]] Evidence | Gap |
|---|---|---|---|
[One row per material criterion across all six phases. Use ✅ / 🟡 / ❌.]

---

### Phase Gate Non-Negotiables

[A markdown table — NOT a bulleted list — with the exact columns:

| Gate | Required to reach Phase {N+1} | [[FRAMEWORK]] status | Severity |

Status uses `met` / `partial` / `unmet`. Severity uses the canonical thresholds
from `prompt.md`. Every row's status cell must quote verbatim from a named source
file with path.]

---

### Comparison with Peer Frameworks

[Short markdown table or bulleted list. Source: companion/frameworks.md plus
[[PRIOR_REVIEWS]] if available. If no peer data is available, state this explicitly.]

---

### Economics Assessment

[Anchor explicitly to **P11 (Optimize economics of intelligence)**. Four sub-sections,
in this order: Model-Tier Selection Maturity; Token-Cost Attribution per Workflow;
Cost-SLO Existence; Dynamic Routing Capability. Ground every claim in `[[FRAMEWORK]]`
source artefacts with file path and quoted text, or state explicitly that no
evidence was found.]

---

## Part 9 — [[INDUSTRY]] Assessment ([[ORGANIZATION]])

### The Regulatory Exposure Map

| Regulation | Applicability | [[FRAMEWORK]] Coverage | Gap | Severity |
|---|---|---|---|---|
[One row per material regulation enumerated **exclusively** from `[[DOMAIN_FILE]]`'s
regulatory mapping sections. Cite the clause / section / article / paragraph / annex
reference verbatim from `[[DOMAIN_FILE]]`. Do NOT assume financial-services
regulations for non-FS domain files.]

---

### Use-Case Fitness Analysis

| Use Case | Autonomy-Cap Ceiling | Fitness | Regulatory Constraint | [[FRAMEWORK]] Limiting Factor |
|---|---|---|---|---|
[4–8 rows. Use-case names verbatim from `[[DOMAIN_FILE]]` — do NOT invent use cases.
Autonomy-Cap Ceiling sourced from `companion/frameworks.md`'s
hard-autonomy-caps-by-regulated-use-case table. Fitness: Fit / Conditional / Unfit.]

---

### The Red Line

[One paragraph per prohibited workflow. Cite the controlling regulation (article/section
from [[DOMAIN_FILE]]) and the exact missing [[FRAMEWORK]] control. Section must be
present. If no hard stops exist, state that explicitly with regulatory justification.]

---

### The Deployment Path

[Typically 3–6 stages for regulated deployments; raise the count above 6 when the
regulatory mapping in `[[DOMAIN_FILE]]` requires it. Do NOT compress essential
stages to fit an arbitrary cap. Each stage MUST specify: (a) named workflows in
scope (verbatim from `[[DOMAIN_FILE]]`), (b) gating evidence required before next
stage (concrete artefact paths, named approvals, or named validation reports),
and (c) expected calendar timeline using the canonical effort-sizing labels
(S / M / L / XL) from `prompt.md`. Steps must be dependency-ordered.]

---

*Review conducted by: Agent 05 — Maturity Phase Placement and Industry Assessment*
*Source artefacts: [[FRAMEWORK]] [[FRAMEWORK_VERSION]] as of [[REVIEW_DATE]]*
*Regulatory frameworks sourced from: [[DOMAIN_FILE]] (last reviewed [[REVIEW_DATE]])*
```

---

## Hard Rules

These rules are non-negotiable and mirror the master orchestrator's hard rules.

- **Read `[[FRAMEWORK]]`'s source artefacts before scoring.** Every claim must be
  grounded in a specific file, rule, or phase within `[[FRAMEWORK_LOWER]]/`.
- **Read the manifesto's own source artefacts before scoring.** At minimum:
  `manifesto.md`, `companion/frameworks.md`, and `phase-assessment-checklist.md`.
  Do not score from memory.
- **Evidence requirement — verbatim quotation.** Every claim MUST quote verbatim
  from a named source file with its path. "The framework supports X" is not
  acceptable; ``verify_phases.py line 142: `check_traceability(threshold=0.7)``` is.
  Paraphrase only after the verbatim quote has been provided.
- **Evidence for / against.** For every major finding, state both the evidence that
  supports it and the evidence (or absence of evidence) that challenges it.
- **Cite specific clauses from `[[DOMAIN_FILE]]`.** Every regulatory claim in Part 9
  must reference a named regulation with a clause / section / article / paragraph /
  annex reference drawn verbatim from `[[DOMAIN_FILE]]`. Generic statements without
  citations are not acceptable.
- **No praise without evidence.** Do not credit `[[FRAMEWORK]]` for capabilities it
  does not demonstrably implement. "The documentation mentions X" is not the same as
  "X is implemented."
- **Flag scope gaps.** If a manifesto requirement is outside `[[FRAMEWORK]]`'s stated
  scope, note the gap explicitly rather than penalising the score — but do not omit it.
- **Date format YYYY-MM-DD** wherever a date appears.
- **Canonical part numbers** in all cross-references (e.g., "see Part 12"). Do not
  use file names or agent numbers in cross-references within the output content.
- **No ASDLC / APLC references — including forward-propagation from `[[DOMAIN_FILE]]`.**
  Do not mention `asdlc/`, `aplc/`, `asdlc-plan.md`, `aplc-plan.md`, or
  `agentic-sdlc-handbook/` anywhere in the output. These paths are out of scope for
  this review. **When `[[DOMAIN_FILE]]` itself references APLC or ASDLC mechanisms
  (e.g., `domains/insurance.md` references "the APLC's behavioural specification"),
  paraphrase to manifesto-equivalent terms** (e.g., "APLC behavioural specification"
  → "the framework's specification artefact"; "ASDLC phase gate" → "the framework's
  phase gate"). Do NOT propagate APLC/ASDLC vocabulary, paths, or filenames into the
  output even when they appear in the cited domain file.

---

## Self-Check Before Writing

**Do not save the output file until every item below is confirmed.** This is a
gate, not a checklist. If any item cannot be confirmed, fix the underlying issue
and re-verify before saving.

- [ ] Output file begins with the filename-invariance disclaimer blockquote
      (`> Note: This file is named ...`) verbatim.
- [ ] Verdict line appears as a single standalone bold line of the exact form
      `**Maturity Verdict: Phase {N}**` with `{N}` a single digit 1–6, and no
      annotations on that line.
- [ ] Phase verdict is bounded by the lowest unmet gate, not the highest demonstrated
      feature. The verdict body paragraph names at least one unmet gate and cites a
      specific `[[FRAMEWORK]]` artefact (or absence) demonstrating non-compliance.
- [ ] Evidence matrix contains rows for all six phases (Phase 1 through Phase 6) and
      includes both met and unmet rows.
- [ ] Phase Gate Non-Negotiables is rendered as a markdown table with columns
      `Gate | Required to reach Phase {N+1} | [[FRAMEWORK]] status | Severity` —
      NOT as a flat bulleted list.
- [ ] Economics Assessment is anchored to **P11** and contains all four required
      sub-sections: Model-Tier Selection Maturity; Token-Cost Attribution per
      Workflow; Cost-SLO Existence; Dynamic Routing Capability.
- [ ] Regulatory Exposure Map enumerates regulations exclusively from
      `[[DOMAIN_FILE]]`'s regulatory mapping sections; no financial-services
      regulation names appear unless `[[DOMAIN_FILE]]` is `domains/financial-services.md`
      or another FS-domain file.
- [ ] Use-Case Fitness Analysis use cases are named verbatim from `[[DOMAIN_FILE]]`;
      no invented use cases. Each row carries an autonomy-cap ceiling sourced from
      `companion/frameworks.md`.
- [ ] Red Line section is present and cites specific clauses / sections / articles
      from `[[DOMAIN_FILE]]`.
- [ ] Deployment Path has the stage count appropriate to the regulatory mapping
      (typically 3–6 stages; more if `[[DOMAIN_FILE]]` requires it). Each stage
      specifies workflows in scope, gating evidence, and an effort label.
- [ ] No `[[...]]` placeholders remain in the output file.
- [ ] No ASDLC / APLC references appear anywhere in the output file, including
      paraphrased forms when `[[DOMAIN_FILE]]` itself contains APLC / ASDLC
      vocabulary.
- [ ] No banned soft language (`consider`, `may`, `could potentially`, `perhaps`,
      `use judgement`) appears anywhere in the output file.
- [ ] Every claim in the output quotes verbatim from a named source file with
      its path before any paraphrase.
- [ ] All dates are in YYYY-MM-DD format.
- [ ] All severity labels use the canonical thresholds from `prompt.md`.
- [ ] All effort labels use the canonical sizing from `prompt.md`.
