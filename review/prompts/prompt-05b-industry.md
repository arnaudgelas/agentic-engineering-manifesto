# Sub-prompt 05b — Industry & Client Assessment (Domain-Specific)

**Purpose:** Produce **Part 9 — Industry & Client Assessment** for the `[[FRAMEWORK]]`
review and assemble the **canonical combined output file** by joining Part 8 (from
agent 05a) with Part 9 (produced here). This sub-prompt is agent **05b** in the
review-orchestration system.

This agent runs in **Wave 1b** — it MUST run **after** agent 05a has produced
`[[FRAMEWORK_LOWER]]_review_05a_maturity.md`. It reads 05a's output to:
1. Lift Part 8 verbatim into the combined output, and
2. Extract the `**Maturity Verdict: Phase {N}**` machine-readable line so the
   regulatory and use-case analysis is anchored to `[[FRAMEWORK]]`'s actual
   maturity placement.

Part 9 is **domain-specific** — its content changes for every distinct
`[[DOMAIN_FILE]]`. The same `[[FRAMEWORK]]` produces different Part 9 content
for `domains/financial-services.md` versus `domains/insurance.md` versus
`domains/medical-devices.md`. Part 8 (from 05a) is reused unchanged across
domains.

The output filename is `[[FRAMEWORK_LOWER]]_review_05_maturity_industry.md`.
Downstream agents (prompt-06 reads Part 8 from this file; prompt-08 reads both
Part 8 and Part 9) consume this exact path.

**Canonical references (do not re-quote):** Weighting scheme, severity thresholds,
and effort sizing are defined exclusively in `prompt.md`. Reference them by name.
Do NOT re-quote the tables.

**Placeholder reminder:** Before execution, verify that all `[[VARIABLE]]` tokens
have been substituted. If any literal `[[...]]` text remains, stop and report the
unset variable to the orchestrator — do not proceed.

**Banned soft language (output MUST NOT contain):** `consider`, `may`, `could
potentially`, `perhaps`, `use judgement`. Replace each with a specific evidenced
claim or an explicit gap. This is a hard prohibition, not guidance.

---

## Wave Dependency — Read 05a Output First

**This agent runs ONLY after agent 05a has completed.** Before reading any
domain-specific input or writing any output:

1. Confirm that `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_05a_maturity.md`
   exists and is **non-empty**. Read the **first 5 lines** and the **last 5 lines**
   of the file. The file MUST be at least **20 lines** in length. If the file
   is missing, empty, or shorter than 20 lines: **report the failure and STOP**.
   Do not attempt to produce Part 9 without 05a's output.

2. Extract the `**Maturity Verdict: Phase {N}**` line from 05a's Part 8. The line
   MUST appear as a standalone bold line with `{N}` a single digit 1–6. If the
   line is absent or malformed: **report the failure and STOP**. The deployment
   path and the use-case fitness analysis depend on knowing `[[FRAMEWORK]]`'s
   current phase placement.

3. Read 05a's Part 8 content in full. It will be copied verbatim into the
   canonical combined output file (with heading harmonisation if required —
   see Output Specification below).

---

## Inputs to Read

Read all of the following before writing a single word of Part 9. Do not score
from memory. Quote specific file names, rule text, regulation references, and
clause references wherever possible.

1. `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_05a_maturity.md` — agent 05a's
   Part 8 output. Required: full content (for verbatim copy into combined output)
   and the `**Maturity Verdict: Phase {N}**` line.
2. `[[DOMAIN_FILE]]` — the full domain regulatory alignment mapping for
   `[[INDUSTRY]]`. Read **every** section: regulatory requirements, use-case cap
   table, and any domain-specific autonomy cap guidance. **All regulations named
   in `[[DOMAIN_FILE]]` are the canonical regulations for the Regulatory Exposure
   Map and the Use-Case Fitness Analysis. The regulatory crosswalk artefacts
   listed below are *supplementary cross-references* — they do not replace
   `[[DOMAIN_FILE]]` and they cannot introduce regulations that are not relevant
   to `[[ORGANIZATION]]`'s jurisdiction.**
3. `companion/frameworks.md` — specifically the **hard autonomy caps by regulated
   use case** table (section "Hard Autonomy Caps by Regulated Use Case") and the
   boundary condition guidance.
4. `[[FRAMEWORK]]` source artefacts — all available files under `[[FRAMEWORK_LOWER]]/`.
   Read enough to ground use-case fitness verdicts and Red Line claims in concrete
   file paths and code references.

5. **Regulatory crosswalks (read those that map to a regulation `[[DOMAIN_FILE]]`
   names; cite them when they add specificity to `[[FRAMEWORK]]`'s gap):**
   - `regulatory/eu-ai-act-addendum.md` — Annex III mapping, Articles 9 / 10 / 12 /
     13 / 14 / 15 / 27 / 72 / 73, GPAI obligations.
   - `regulatory/foundation-model-third-party-register.md` — DORA Pillar 4 register
     schema, exit strategy, CTPP analysis.
   - `regulatory/nist-ai-rmf-crosswalk.md` — NIST AI RMF 1.0 + GenAI Profile.
   - `regulatory/iso-42001-crosswalk.md` — ISO/IEC 42001:2023 AIMS controls.
   - `regulatory/iso-23894-23053-crosswalk.md` — ISO/IEC 23894 + 23053 risk
     management.
   - `regulatory/coso-cobit-crosswalk.md` — COSO ERM 2017 + COBIT 2019/2023.
   - `regulatory/incidents-appendix.md` — named real-world incidents that the
     manifesto is designed to prevent.

6. **Operational templates (cite when an SLO, register, or appetite directly
   bounds `[[FRAMEWORK]]`'s deployment path or red-line):**
   - `operational-templates/agent-inventory-schema.md` — discovery and
     registration; precondition for every other control.
   - `operational-templates/ai-risk-register.md` — AI risk register schema.
   - `operational-templates/risk-appetite-statement.md` — board-level risk
     appetite ceiling.
   - `operational-templates/slo-table.md` — incident-reporting (regulator),
     waiver expiry, feedback-loop closure SLOs.
   - `operational-templates/decommissioning-checklist.md` — orderly retirement
     of agents.

7. `governance/authority-accountability-matrix.md` — read the AEM column for the
   accountability anchors that bear on the Red Line and Deployment Path.

**Scope guard.** When reading regulatory crosswalk, governance, or operational
template files, lift only the AEM-relevant content. Do not propagate IGM,
AEnt-M, ASDLC, or APLC vocabulary, file paths, or coverage statements into
Part 9.

---

## Methodology

### Part 9 — Industry & Client Assessment

**Step 1 — Anchor to 05a's verdict.** Extract the `**Maturity Verdict: Phase {N}**`
line from 05a's Part 8. The use-case fitness analysis (Step 3) and the deployment
path (Step 5) must be consistent with this phase placement. A use case that
requires Phase 4 capabilities cannot be marked Fit for a Phase 3 framework.

**Step 2 — Regulatory Exposure Map.** Apply the material regulations enumerated in
`[[DOMAIN_FILE]]`. Enumerate regulations **exclusively** from `[[DOMAIN_FILE]]`'s
regulatory mapping sections — section headers, table columns, and autonomy-cap rows.

**Do NOT assume financial-services regulations** (e.g., SR 11-7, DORA, Solvency II)
for non-financial-services domain files. **Do NOT import regulations from memory**;
if a regulation is not named in `[[DOMAIN_FILE]]`, it is out of scope. If
`[[DOMAIN_FILE]]` is `domains/medical-devices.md`, only medical-device regulations
appear. If `[[DOMAIN_FILE]]` is `domains/insurance.md`, only insurance regulations
appear.

For every regulation so identified, build one row in a markdown table:

```
| Regulation | Applicability | [[FRAMEWORK]] coverage | Gap | Severity |
```

The Regulation column must include the clause / section / article / paragraph /
annex reference verbatim from `[[DOMAIN_FILE]]`. Coverage must be grounded in
`[[FRAMEWORK]]` source artefacts — quote the exact file path and line/function
that provides (or fails to provide) the required control. Severity uses the
canonical thresholds from `prompt.md`.

**Step 3 — Use-Case Fitness Analysis.** Identify **4–8 named use cases** for
`[[ORGANIZATION]]`. Name use cases **verbatim** from `[[DOMAIN_FILE]]`'s example use
cases (use-case cap table or named workflow examples). **Do NOT invent use cases**
that are not present in `[[DOMAIN_FILE]]`. If `[[DOMAIN_FILE]]` does not contain
enough named use cases, state this and use only what is present.

Read `companion/frameworks.md`'s **hard autonomy caps by regulated use case** table
(section "Hard Autonomy Caps by Regulated Use Case"). For each use case in this
analysis, note the autonomy-cap ceiling it faces (e.g., "Tier 2 cap — human approval
mandatory") and treat that ceiling as a **hard upper bound** on Fit verdicts.

For each use case, state: **Fit** / **Conditional** / **Unfit**. Justify each
verdict by citing:
- (a) the regulatory constraint quoted verbatim from `[[DOMAIN_FILE]]` with
  article / section / clause reference,
- (b) the autonomy-cap ceiling from `companion/frameworks.md`, and
- (c) the specific `[[FRAMEWORK]]` capability or gap (with file path) that
  determines fitness.

Do not mark a use case Conditional without stating exactly what additional control
would make it Fit.

**Step 4 — The Red Line.** State, in plain language, the workflows where deploying
`[[FRAMEWORK]]` for `[[ORGANIZATION]]` would be **regulator-impermissible regardless of
internal sign-off**. For each prohibited workflow, cite:
- (a) the controlling regulation and specific article or section from
  `[[DOMAIN_FILE]]`, and
- (b) the exact missing control in `[[FRAMEWORK]]` that creates the hard stop.

This section must be present even if the list is short. If no hard stops exist,
state that explicitly with regulatory justification grounded in `[[DOMAIN_FILE]]`.

**Step 5 — The Deployment Path.** Recommend a dependency-ordered staged rollout.
**Typically 3–6 stages** for regulated deployments. Raise the count above 6 when
the regulatory mapping in `[[DOMAIN_FILE]]` requires it; **do NOT compress
essential stages** to fit an arbitrary cap, and do NOT pad with cosmetic stages.

Each stage MUST specify:
- **(a) Named workflows in scope** — drawn verbatim from `[[DOMAIN_FILE]]`'s
  use-case list and the Use-Case Fitness Analysis above.
- **(b) Gating evidence required before next stage** — concrete artefact paths,
  named approvals, or named validation reports.
- **(c) Expected calendar timeline** — using the canonical effort-sizing labels
  (S / M / L / XL) from `prompt.md`.

The path must be dependency-ordered — each stage's gating evidence must logically
precede the workflows unlocked by the next stage.

---

## Output Specification

**The output file is the canonical combined review file** read by downstream
agents (prompt-06 and prompt-08) without modification. Write to:

```
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_05_maturity_industry.md
```

The output file MUST contain:

1. **Header metadata block** (re-emit using the canonical combined-file format —
   see Required Structure below). Include `[[INDUSTRY]]` and `[[ORGANIZATION]]` here
   even though 05a's header did not.

2. **Part 8 — Maturity Phase Placement** — copied verbatim from 05a's output
   (`[[FRAMEWORK_LOWER]]_review_05a_maturity.md`). Heading harmonisation:
   if 05a's H1 was `# [[FRAMEWORK]] Review 05a — Maturity Phase Placement`,
   replace it with the combined-file H1 in the Required Structure below; the
   `## Part 8 — Maturity Phase Placement` heading and all sub-sections remain
   unchanged. The `**Maturity Verdict: Phase {N}**` line MUST be preserved
   verbatim.

   Add an explanatory note at the top of Part 8 (immediately under the
   `## Part 8` heading):

   ```
   > Note: This file includes Part 8 (from agent 05a) verbatim and adds Part 9 below.
   ```

3. **Part 9 — [[INDUSTRY]] Assessment ([[ORGANIZATION]])** — produced here per the
   methodology above.

4. **Footer.**

Create the `[[FRAMEWORK_LOWER]]/` directory if it does not exist. Use the exact
structure below. Do not add, remove, or rename sections.

---

### Required Structure

```
# [[FRAMEWORK]] Review 05 — Maturity Phase Placement and [[INDUSTRY]] Assessment

**Framework reviewed:** [[FRAMEWORK]]
**Framework version:** [[FRAMEWORK_VERSION]]
**Client context:** [[ORGANIZATION]] — [[INDUSTRY]]
**Source artefacts read:** [list every file read across 05a and 05b, one per bullet]
**Prior reviews:** [[PRIOR_REVIEWS]]
**Review date:** YYYY-MM-DD
**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]`

---

## Part 8 — Maturity Phase Placement

> Note: This file includes Part 8 (from agent 05a) verbatim and adds Part 9 below.

### The Verdict

[Copy verbatim from 05a. The `**Maturity Verdict: Phase {N}**` line and the body
paragraph below it appear here unchanged.]

---

### Evidence Matrix

[Copy verbatim from 05a.]

---

### Phase Gate Non-Negotiables

[Copy verbatim from 05a.]

---

### Comparison with Peer Frameworks

[Copy verbatim from 05a.]

---

### Economics Assessment

[Copy verbatim from 05a — all four sub-sections.]

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
present. If no hard stops exist, state that explicitly with regulatory justification
grounded in [[DOMAIN_FILE]].]

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

*Review conducted by: Agent 05b — Industry & Client Assessment (canonical combined output)*
*Part 8 produced by: Agent 05a — Maturity Phase Placement (Domain-Agnostic)*
*Source artefacts: [[FRAMEWORK]] [[FRAMEWORK_VERSION]] as of [[REVIEW_DATE]]*
*Regulatory frameworks sourced from: [[DOMAIN_FILE]] (last reviewed [[REVIEW_DATE]])*
```

---

## Hard Rules

These rules are non-negotiable and mirror the master orchestrator's hard rules.

- **Run only after 05a has completed.** If
  `[[FRAMEWORK_LOWER]]_review_05a_maturity.md` is missing, empty, fewer than 20
  lines, or missing the `**Maturity Verdict: Phase {N}**` line — report and STOP.
- **All regulations come from `[[DOMAIN_FILE]]`.** Do NOT name any regulation
  that does not appear in `[[DOMAIN_FILE]]`. Do NOT default to financial-services
  regulations (SR 11-7, DORA, Solvency II) for non-FS domain files. Do NOT import
  regulations from memory.
- **All use cases come from `[[DOMAIN_FILE]]`.** Use-case names appear verbatim
  from `[[DOMAIN_FILE]]`'s use-case cap table or named workflow examples.
  Do NOT invent use cases.
- **Autonomy-cap ceilings come from `companion/frameworks.md`** — specifically
  the "Hard Autonomy Caps by Regulated Use Case" section. Treat them as hard
  upper bounds on Fit verdicts.
- **Read `[[FRAMEWORK]]`'s source artefacts before grounding any claim.** Every
  Coverage / Limiting Factor / Red Line claim must reference a specific file,
  rule, function, or phase within `[[FRAMEWORK_LOWER]]/`.
- **Do NOT re-quote tables from `prompt.md`.** Reference the canonical severity
  thresholds and effort sizing by name only.
- **Evidence requirement — verbatim quotation.** Every claim MUST quote verbatim
  from a named source file (whether `[[DOMAIN_FILE]]`, `companion/frameworks.md`,
  or a `[[FRAMEWORK]]` source artefact) with its path. "The framework supports
  X" is not acceptable; ``verify_phases.py line 142: `check_traceability(threshold=0.7)```
  is. Paraphrase only after the verbatim quote has been provided.
- **Cite specific clauses from `[[DOMAIN_FILE]]`.** Every regulatory claim in
  Part 9 must reference a named regulation with a clause / section / article /
  paragraph / annex reference drawn verbatim from `[[DOMAIN_FILE]]`. Generic
  statements without citations are not acceptable.
- **No praise without evidence.** Do not credit `[[FRAMEWORK]]` for capabilities
  it does not demonstrably implement.
- **Date format YYYY-MM-DD** wherever a date appears.
- **Canonical part numbers** in all cross-references (e.g., "see Part 12"). Do
  not use file names or agent numbers in cross-references within the output content.
- **Out-of-scope corpus / tracked-files-only — including forward-propagation
  from `[[DOMAIN_FILE]]` and from cross-stack files.** Every source file cited
  MUST be tracked by git on the current branch. Do not read or reference
  `asdlc/`, `aplc/`, `agentic-sdlc-handbook/`,
  `intelligence-governance-manifesto/`, `agentic-enterprise-manifesto/`,
  `agentic-enterprise.md`, `agentic-enterprise.html`,
  `agentic-governance-stack.md`, `agentic-governance-stack.html`,
  `manifesto-evolution-plan.md`, `manifesto-evolution-plan.html`,
  `phase-assessment-checklist.md`, `phase-assessment-checklist.html`,
  `asdlc-plan*`, `aplc-plan*`, or `igm-aent-coherence-review*` anywhere in the
  output. The output MUST contain zero matches for the tokens `ASDLC`, `APLC`,
  `IGM`, `AEnt-M`, `AEnt_M`, `intelligence-governance-manifesto`,
  `agentic-enterprise-manifesto`, `agentic-enterprise`,
  `agentic-governance-stack`, `manifesto-evolution-plan`,
  `phase-assessment-checklist`, or `agentic-sdlc-handbook`. **When `[[DOMAIN_FILE]]`,
  a regulatory crosswalk, a governance file, or an operational template
  references APLC, ASDLC, IGM, or AEnt-M mechanisms** (e.g.,
  `governance/composition-rule.md` references "AEnt-M consequence class";
  `domains/insurance.md` references "the APLC's behavioural specification"),
  **paraphrase to manifesto-equivalent terms** (e.g., "APLC behavioural
  specification" → "the framework's specification artefact"; "AEnt-M consequence
  class" → "consequence-class assessment outside the AEM scope"; "IGM epistemic
  tier" → "claim-confidence tier outside the AEM scope"). Do NOT propagate
  vocabulary, paths, or filenames into the output even when they appear in the
  cited source file.

---

## Self-Check Before Writing

**Do not save the output file until every item below is confirmed.** This is a
gate, not a checklist. If any item cannot be confirmed, fix the underlying issue
and re-verify before saving.

- [ ] `[[FRAMEWORK_LOWER]]_review_05a_maturity.md` exists, is non-empty, has at
      least 20 lines, and contains a `**Maturity Verdict: Phase {N}**` line that
      was successfully extracted. **The combined output's Part 8 verdict line
      matches the line read from 05a's output verbatim.**
- [ ] Output file is written to
      `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_05_maturity_industry.md`
      (the canonical combined file name).
- [ ] Part 8 content is copied verbatim from 05a's output (with H1 harmonised
      to the combined-file H1). The `**Maturity Verdict: Phase {N}**` line is
      preserved as a standalone bold line with no annotations.
- [ ] Part 8 includes the explanatory note: `> Note: This file includes Part 8
      (from agent 05a) verbatim and adds Part 9 below.`
- [ ] Regulatory Exposure Map enumerates regulations **exclusively** from
      `[[DOMAIN_FILE]]`'s regulatory mapping sections; no financial-services
      regulation names appear unless `[[DOMAIN_FILE]]` is `domains/financial-services.md`
      or another FS-domain file.
- [ ] Use-Case Fitness Analysis use cases are named verbatim from
      `[[DOMAIN_FILE]]`; no invented use cases. Each row carries an
      autonomy-cap ceiling sourced from `companion/frameworks.md`.
- [ ] Red Line section is present and cites a specific clause / section / article
      from `[[DOMAIN_FILE]]` for at least one prohibited workflow (or states
      explicitly that no hard stops exist, with regulatory justification).
- [ ] Deployment Path has a stage count appropriate to the regulatory mapping
      (typically 3–6 stages; more if `[[DOMAIN_FILE]]` requires it). Each stage
      specifies (a) named workflows in scope, (b) gating evidence required before
      next stage, and (c) effort label (S / M / L / XL).
- [ ] No `[[...]]` placeholders remain in the output file.
- [ ] Zero matches for any out-of-scope-corpus token (`ASDLC`, `APLC`, `IGM`,
      `AEnt-M`, `AEnt_M`, `intelligence-governance-manifesto`,
      `agentic-enterprise-manifesto`, `agentic-enterprise`,
      `agentic-governance-stack`, `manifesto-evolution-plan`,
      `phase-assessment-checklist`, `asdlc/`, `aplc/`, `agentic-sdlc-handbook`,
      `asdlc-plan`, `aplc-plan`, `igm-aent-coherence-review`) anywhere in the
      output file, including paraphrased forms when `[[DOMAIN_FILE]]` or any
      cross-stack file in `governance/`, `integration/`, `regulatory/`, or
      `operational-templates/` contains the vocabulary. Every cited source
      file is tracked by git on the current branch.
- [ ] No banned soft language (`consider`, `may`, `could potentially`, `perhaps`,
      `use judgement`) appears anywhere in the output file.
- [ ] Every claim in the output quotes verbatim from a named source file with
      its path before any paraphrase.
- [ ] All dates are in YYYY-MM-DD format.
- [ ] All severity labels use the canonical thresholds from `prompt.md`.
- [ ] All effort labels use the canonical sizing from `prompt.md`.
