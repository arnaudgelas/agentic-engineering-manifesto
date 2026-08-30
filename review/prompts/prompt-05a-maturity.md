# Sub-prompt 05a — Maturity Phase Placement (Domain-Agnostic)

**Purpose:** Produce **Part 8 — Maturity Phase Placement** for the `[[FRAMEWORK]]` review.
This sub-prompt is agent **05a** in the review-orchestration system. It is intentionally
**domain-agnostic**: it does **NOT** read `[[DOMAIN_FILE]]` and does **NOT** produce any
industry, regulatory, or client-specific content. Its sole responsibility is the generic,
reusable maturity phase placement assessment.

This agent runs in **Wave 1a** and produces the machine-readable **Maturity Verdict** line
that agents **05b** (Wave 1b), **03e**, **06** and **09** all consume. **This file's `## Part 8` is
merged into the review unchanged by agent 09** — no other agent reproduces it, so write it to
publication standard. 05b restates only the `**Maturity Verdict: Phase {N}**` line.

**Canonical references (do not re-quote):** Weighting scheme, severity thresholds, and
effort sizing are defined exclusively in `prompt.md`. Reference them by name (e.g.,
"the canonical severity thresholds from `prompt.md`"). Do NOT re-quote the tables in
this sub-prompt or in the output.

**Placeholder reminder:** Before execution, verify that all double-bracket placeholder tokens have
been substituted. If any literal `[[...]]` text remains, stop and report the unset
variable to the orchestrator — do not proceed.

---

## Inputs to Read

Read all of the following before writing a single word of the output. Do not score
from memory. Quote specific file names, rule text, phase numbers, and clause
references wherever possible.

1. `[[FRAMEWORK]]` source artefacts — all available files under `[[FRAMEWORK_PATH]]` (`[[FRAMEWORK]]`'s own source tree, never `[[FRAMEWORK_LOWER]]/`, which is this review's own output directory).
   Read enough to form an evidence-grounded opinion on every maturity criterion below.
2. `manifesto/manifesto.md` — the six-phase maturity spectrum (Phase 1 through Phase 6) and the
   Agentic Loop phase definitions.
3. `manifesto/manifesto-principles.md` plus `manifesto/manifesto-principles-01.md` through `manifesto/manifesto-principles-12.md` — the AEM Phase × maximum autonomy tier table in P5,
   the four oversight patterns, and the Tier 4 prerequisites.
4. `manifesto/manifesto-done.md` — the Agentic DoD phase calibration ("phase-calibrated, not
   all-or-nothing") and the evidence freshness rules.
5. `companion/frameworks.md` — the six-phase maturity spectrum failure modes per
   phase, the peer framework comparison table, and the boundary condition guidance.
   (Hard autonomy caps by regulated use case are consumed by 05b, not here.)
6. `companion/principles.md` plus `companion/principles-01.md` through `companion/principles-12.md` — extended guidance on phase progression and structural
   regression.
7. `governance/phase-level-matrix.md` — the AEM Phase column with the corresponding
   maximum autonomy tier and the Tier 4 prerequisites. **Read the AEM column only;
   ignore the IGM Maturity Level and AEnt-M Phase columns — those are out of scope.**
8. `governance/governance-integration-note.md` — for the AEM Tier 4 binary policy
   envelope prerequisites that bound any Phase 6 verdict.
9. `[[PRIOR_REVIEWS]]` — if not `none`, read the listed review files for peer
   framework context before completing the Comparison with Peer Frameworks section.

**DO NOT read `[[DOMAIN_FILE]]`.** Domain regulations and use cases are out of scope
for this agent. Any regulatory or client-specific content belongs to agent 05b.

---

## Methodology

### Part 8 — Maturity Phase Placement

**Step 1 — Evidence inventory.** For each of the six phases, collect every piece
of positive and negative evidence from `[[FRAMEWORK]]`'s source artefacts. Evidence
must be attributable (file name, function name, rule text) and contemporaneous (in
the artefacts as they stand, not as they are planned).

**Step 2 — Gate-by-gate assessment.** For each phase in ascending order, derive
the gate requirements directly from `manifesto/manifesto.md` (the six-phase model and the
Agentic Loop / DoD it implies at each phase), the `manifesto-principles` source group (P5 Phase
× maximum autonomy tier table; principle minimum bars), `companion/frameworks.md`
(the named failure mode for each phase: e.g., Phase 3 "autonomy without
verification"; Phase 4 "governance without feedback"; Phase 5 "evaluation
theater"), `manifesto/manifesto-done.md` (the phase-calibrated DoD), and
`governance/phase-level-matrix.md` (AEM column only). Mark each gate as: met
(evidence on file), partial (evidence present but incomplete), or unmet (no
evidence). An unmet gate at Phase N means `[[FRAMEWORK]]` cannot be placed at
Phase N or higher. Apply the Evidence Quality Gate to every cited artefact:
Attributable, Contemporaneous, Queryable, Bound-to-outcome.

**Step 3 — Verdict (bounded by lowest unmet gate).** The phase verdict is bounded
by the **LOWEST unmet gate**, **NOT** by the highest demonstrated feature. Partial
credit is not awarded for phase placement — a partially met gate is an unmet gate.
State the maturity verdict as a single standalone bold line of the exact form:

```
**Maturity Verdict: Phase {N}**
```

`{N}` MUST be a single digit (1–6). This line is the **machine-readable token**
consumed by agent 05b (Wave 1b) and agent 06. It MUST appear as a standalone bold
line — no annotations on that line, no parenthetical qualifiers, no proto-phase
modifiers.

Annotations about proto-elements, evidence in favour of the next phase, and the
bounding-gate explanation go in the body paragraph *below* the verdict line — never
on the verdict line itself. The body paragraph names the specific gates that
prevent the next-phase claim and explains why each matters for governed agentic
engineering.

**Step 4 — Evidence matrix.** Build a markdown table covering all six phases with
one row per material capability criterion (cover all six phases; include both met
and unmet rows). Columns:

```
| Gate | Required capability | [[FRAMEWORK]] evidence | Gap |
```

Use ✅ / 🟡 / ❌ status symbols consistently. Include rows for Phase 1 through
Phase 6.

**Step 5 — Phase Gate Non-Negotiables.** Produce a markdown table — NOT a flat
bulleted list — of every unmet or partial gate that prevents the next-phase claim.
The table MUST use this exact column header:

```
| Gate | Required to reach Phase {N+1} | [[FRAMEWORK]] status | Severity |
```

Use `met` / `partial` / `unmet` in the status column. Severity uses the canonical
thresholds from `prompt.md`. Every claim in the gate description and status cells
must quote verbatim from a named source file with path (e.g., ``verify_phases.py
line 142: `check_traceability(threshold=0.7)`` from `[[FRAMEWORK_PATH]]/src/...`).

**Step 6 — Peer comparison.** Using `companion/frameworks.md` and any frameworks
listed in `[[PRIOR_REVIEWS]]`, build a short comparison. If no prior reviews are
available, note this explicitly and limit comparison to what `companion/frameworks.md`
provides. Do not fabricate peer data. Source: `companion/frameworks.md` peer
framework comparison table.

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

---

## Output Specification

Write the output file to:

```
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_05a_maturity.md
```

Create the `[[FRAMEWORK_LOWER]]/` directory if it does not exist. Use the exact
structure below. Do not add, remove, or rename sections.

This file is consumed verbatim by agent 05b. Agent 05b reads this file's content,
extracts the `**Maturity Verdict: Phase {N}**` line, copies the Part 8 content into
the canonical combined output file, and appends Part 9 (Industry & Client Assessment)
based on `[[DOMAIN_FILE]]`.

---

### Required Structure

```
# [[FRAMEWORK]] Review 05a — Maturity Phase Placement

**Framework reviewed:** [[FRAMEWORK]]
**Framework version:** [[FRAMEWORK_VERSION]]
**Source artefacts read:** [list every file read, one per bullet]
**Prior reviews:** [[PRIOR_REVIEWS]]
**Review date:** YYYY-MM-DD
**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]`

---

## Part 8 — Maturity Phase Placement

### The Verdict

[Begin with a single standalone bold line in the exact form
`**Maturity Verdict: Phase {N}**` where `{N}` is a single digit 1–6. This is the
machine-readable token consumed by agent 05b and agent 06.

Then one paragraph. Name the bounding gate(s) that prevent the next-phase claim.
Acknowledge any verified proto-elements of the next phase but do not let them
override the verdict. Cite evidence FOR a higher placement and the evidence that
overrides it. Be direct.]

---

### Evidence Matrix

| Gate | Required capability | [[FRAMEWORK]] evidence | Gap |
|---|---|---|---|
[One row per material criterion across all six phases (Phase 1 through Phase 6).
Include both met and unmet rows. Use ✅ / 🟡 / ❌.]

---

### Phase Gate Non-Negotiables

[A markdown table — NOT a bulleted list — with the exact columns:

| Gate | Required to reach Phase {N+1} | [[FRAMEWORK]] status | Severity |

Status uses `met` / `partial` / `unmet`. Severity uses the canonical thresholds
from `prompt.md`. Every row's status cell must quote verbatim from a named source
file with path.]

---

### Comparison with Peer Frameworks

[Short markdown table or bulleted list. Source: `companion/frameworks.md` plus
[[PRIOR_REVIEWS]] if available. If no peer data is available, state this explicitly.]

---

### Economics Assessment

[Anchor explicitly to **P11 (Optimize economics of intelligence)**. Four sub-sections,
in this order:

1. **Model-Tier Selection Maturity**
2. **Token-Cost Attribution per Workflow**
3. **Cost-SLO Existence**
4. **Dynamic Routing Capability**

Ground every claim in `[[FRAMEWORK]]` source artefacts with file path and quoted text,
or state explicitly that no evidence was found.]

---

*Review conducted by: Agent 05a — Maturity Phase Placement (Domain-Agnostic)*
*Source artefacts: [[FRAMEWORK]] [[FRAMEWORK_VERSION]] as of [[REVIEW_DATE]]*
```

---

## Hard Rules

These rules are non-negotiable and mirror the master orchestrator's hard rules.

- **Read the manifesto's own source artefacts before scoring.** At minimum:
  `manifesto/manifesto.md`, the `manifesto-principles` source group, `manifesto/manifesto-done.md`,
  `companion/frameworks.md`, the `companion/principles` source group, and
  `governance/phase-level-matrix.md` (AEM column only). Do not score from memory.
- **Do NOT read `[[DOMAIN_FILE]]`.** This agent is intentionally domain-agnostic.
  Any regulatory, client, or industry-specific content is out of scope and must
  not appear anywhere in the output. That content is produced by agent 05b.
- **Do NOT re-quote tables from `prompt.md`.** Reference the canonical weighting
  scheme, severity thresholds, and effort sizing by name only.
- **Evidence requirement — verbatim quotation.** Every claim MUST quote verbatim
  from a named source file with its path. "The framework supports X" is not
  acceptable; ``verify_phases.py line 142: `check_traceability(threshold=0.7)``` is.
  Paraphrase only after the verbatim quote has been provided.
- **Evidence for / against.** For every major finding, state both the evidence that
  supports it and the evidence (or absence of evidence) that challenges it.
- **No praise without evidence.** Do not credit `[[FRAMEWORK]]` for capabilities it
  does not demonstrably implement. "The documentation mentions X" is not the same as
  "X is implemented."
- **Date format YYYY-MM-DD** wherever a date appears.
- **Canonical part numbers** in all cross-references (e.g., "see Part 12"). Do not
  use file names or agent numbers in cross-references within the output content.
- **Out-of-scope corpus / tracked-files-only.** When reading
  `governance/phase-level-matrix.md` or
  `governance/governance-integration-note.md`, lift only the AEM column /
  AEM Tier 4 section content; ignore IGM and AEnt-M columns and sections.

---

## Self-Check Before Writing

**Do not save the output file until every item below is confirmed.** This is a
gate, not a checklist. If any item cannot be confirmed, fix the underlying issue
and re-verify before saving.

- [ ] Output file is written to `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_05a_maturity.md`
      Agent 09 merges `## Part 8` from here; 05b writes Part 9 in its own file.
- [ ] Does the output file's header metadata block include the exact line
      `Manifesto: arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]`
      (the mandatory provenance line — see `prompt.md`'s Hard rules)?
- [ ] Verdict line appears as a single standalone bold line of the exact form
      `**Maturity Verdict: Phase {N}**` with `{N}` a single digit 1–6, and no
      annotations on that line. **This line is required and machine-readable —
      05b and 06 will fail to extract it if absent or malformed.**
- [ ] **Enumerate every gate you marked partial or unmet, lowest phase first, and state the phase number of the lowest.** The verdict MUST be below that phase. Write the enumeration out — do not assert the bound without listing what it was computed from. This check is worded to be falsifiable on purpose: a real run placed a framework at Phase 3 while its own matrix recorded the Phase 3 evidence criterion as partial, and the previous wording ("verdict is bounded by the lowest unmet gate") was ticked anyway, because a restatement of the rule cannot catch a violation of it.
- [ ] Phase verdict is bounded by the **lowest unmet gate**, not the highest
      demonstrated feature. The verdict body paragraph names at least one unmet
      gate and cites a specific `[[FRAMEWORK]]` artefact (or absence) demonstrating
      non-compliance.
- [ ] Evidence matrix contains rows for **all six phases** (Phase 1 through Phase 6)
      and includes both met and unmet rows.
- [ ] Phase Gate Non-Negotiables is rendered as a markdown table with columns
      `Gate | Required to reach Phase {N+1} | [[FRAMEWORK]] status | Severity` —
      NOT as a flat bulleted list.
- [ ] Economics Assessment is anchored to **P11** and contains all four required
      sub-sections: Model-Tier Selection Maturity; Token-Cost Attribution per
      Workflow; Cost-SLO Existence; Dynamic Routing Capability.
- [ ] **No `[[DOMAIN_FILE]]` content is referenced anywhere in the output.** No
      regulations are named (no SR 11-7, DORA, EU AI Act, GDPR, Solvency II, IDD,
      HIPAA, etc.). No use cases are named. No client-specific content.
- [ ] No `[[...]]` placeholders remain in the output file.
- [ ] Zero matches for any out-of-scope-corpus token (`ASDLC`, `APLC`, `IGM`,
      `AEnt-M`, `AEnt_M`, `intelligence-governance-manifesto`,
      `agentic-enterprise-manifesto`, `agentic-enterprise`,
      `agentic-governance-stack`, `manifesto-evolution-plan`,
      `phase-assessment-checklist`, `asdlc/`, `aplc/`, `agentic-sdlc-handbook`,
      `asdlc-plan`, `aplc-plan`, `igm-aent-coherence-review`) anywhere in the
      output file. Every source file referenced is tracked by git on the current
      branch.
- [ ] No banned soft language (`consider`, `may`, `could potentially`, `perhaps`,
      `use judgement`) appears anywhere in the output file.
- [ ] Every claim in the output quotes verbatim from a named source file with
      its path before any paraphrase.
- [ ] All dates are in YYYY-MM-DD format.
- [ ] All severity labels use the canonical thresholds from `prompt.md`.
