# Sub-prompt 06 — Strengths & Gaps

**Purpose:** Synthesise Wave 1 evidence into Part 10 (Genuine Strengths) and Part 11 (Gap Analysis) for `[[FRAMEWORK]]`, calibrated to `[[INDUSTRY]]` regulatory obligations under `[[DOMAIN_FILE]]`. Produce a prioritised remediation roadmap that names the artefacts and mechanisms required to reach the next maturity phase.

**Placeholder reminder:** Before executing, confirm every double-bracket placeholder in this prompt has been substituted by the orchestrator. If any literal `[[...]]` pattern remains, stop and report.

**Idempotency.** Follow the single canonical idempotency policy delivered via the orchestrator's Universal Prepend Block (defined in `prompt.md`): regenerate the output file if it is missing, if it is older than any of the 22 upstream Wave 1 output files it reads, or if it fails this prompt's own Self-check gate (Step 6 below) — treat any Self-check failure as "malformed." Otherwise skip regeneration. Do not define a different or narrower rule here.

**Wave-2 contract:** This agent is a **synthesis agent**. Its evidence is the 26 upstream output files available before Part 11 synthesis. It does NOT re-read `[[FRAMEWORK]]` source artefacts and does NOT re-derive scores. Where a `[[FRAMEWORK]]` artefact is cited, the citation is copied verbatim from the Wave 1 file that established it.

**Canonical references (do not re-quote):**
- Canonical part numbering — defined in `prompt.md` §"Canonical part numbering". Use Part 1 through Part 14 references in output; do not re-quote the table.

---

## Step 1 — Preflight (mandatory before writing anything)

**Do not save the output file until every item below is confirmed.**

Run the following operational checks. If any check fails, output ONLY a structured report listing the missing/invalid files and STOP. Do not write Part 10, do not write Part 11, do not write the roadmap.

1. **Glob check for principle files.** Run a `Glob` for `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p*.md`. The result MUST contain exactly 12 files (p1.md through p12.md). If fewer than 12, the agent stops.
2. **Existence check for the other 10 Wave 1 files.** For each of the following paths, verify it exists:
   - `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_01_quick_overview.md`
   - `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03a_loop_upstream.md`
   - `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03b_loop_build.md`
   - `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03c_loop_runtime.md`
   - `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03d_loop_integrity.md`
   - `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03e_dod.md`
   - `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04a_adoption.md` (Part 6)
   - `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04b_companion.md` (Part 7)
   - `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04c_synthesis.md` (Cross-Document Synthesis + merged gap inventory)
   - `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_05a_maturity.md` (Part 8)
   - `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_05b_industry.md` (Part 9)
   - `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_07_guardrails_security_appendix.md`
   - `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_08a_domains.md` (§14.1–§14.15)
   - `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_08b_enterprise_synthesis.md` (§14.16–§14.19)
3. **Completion check.** For each of the 14 files in step 2, run `tail -n 2 <file> | grep -q '<!-- SELF-CHECK: PASSED -->'`. A file that fails is invalid, whatever its length — length does not distinguish a finished output from one whose agent died before its self-check ran.
4. **Placeholder leakage check.** None of the 26 files may contain a literal `[[...]]` token in their header lines (lines 1–10). If any file shows an unsubstituted placeholder, treat it as invalid.

Stop conditions (output a structured report listing the offending files, then halt):

```
PREFLIGHT FAILED
Missing files: <paths>
Invalid files (failed completion check or placeholder leakage): <paths>
```

The agent does not proceed past Step 1 until all checks pass.

---

## Step 2 — Inputs

### 2.1 — The 26 upstream output files (the only evidence base)

These are the agent's evidence. The agent reads these files end-to-end. The agent does NOT read `[[FRAMEWORK]]` source artefacts directly — Wave 1 has already done that read. Where a `[[FRAMEWORK]]` artefact citation is required in output, the agent copies it verbatim from the Wave 1 file that established it.

| File | Produced by |
| --- | --- |
| `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_01_quick_overview.md` | Agent 01 |
| `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p1.md` ... `p12.md` | Agent 02 (×12) |
| `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03a_loop_upstream.md` | Agent 03a (Part 3 §3.1–§3.3) |
| `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03b_loop_build.md` | Agent 03b (Part 3 §3.4–§3.6) |
| `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03c_loop_runtime.md` | Agent 03c (Part 3 §3.7–§3.10) |
| `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03d_loop_integrity.md` | Agent 03d (Part 3 §3.11) |
| `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03e_dod.md` | Agent 03e (Part 4) |
| `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04a_adoption.md` | Agent 04a (Part 6) |
| `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04b_companion.md` | Agent 04b (Part 7) |
| `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04c_synthesis.md` | Agent 04c (synthesis) |
| `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_05a_maturity.md` | Agent 05a (Part 8) |
| `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_05b_industry.md` | Agent 05b (Part 9) |
| `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_07_guardrails_security_appendix.md` | Agent 07 |
| `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_08a_domains.md` | Agent 08a (§14.1–§14.15) |
| `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_08b_enterprise_synthesis.md` | Agent 08b (§14.16–§14.19) |

### 2.2 — Manifesto corpus (read in full, current version on disk)

- `manifesto/manifesto-principles.md` plus `manifesto/manifesto-principles-01.md` through `manifesto/manifesto-principles-12.md` — canonical P1–P12, autonomy tiers, oversight patterns, minimum bars.
- `manifesto/manifesto.md` — Agentic Loop phases, loop-readiness gate, and the six values.
- `manifesto/manifesto-done.md` — Agentic Definition of Done, Hardening DoD, and evidence freshness rules.
- `companion/frameworks.md` — six-phase failure modes used to anchor target_phase gates.
- `companion/principles.md` plus `companion/principles-01.md` through `companion/principles-12.md` — extended guidance for principle minimum bars cited in gaps.

**Cross-stack normative artefacts (lift only AEM-relevant content; apply scope guard from `prompt.md`):**
- `governance/governance-integration-note.md` — for AEM Tier 4 prerequisites cited in target_phase Phase 6 gaps.
- `governance/phase-level-matrix.md` — AEM column only; for Phase × tier compatibility cited in target_phase gaps.
- `governance/evidence-bundle-schema.md` — `aem_components` for evidence-bundle gap remediations.
- `operational-templates/slo-table.md` — for SLO-based remediation actions.

### 2.3 — Domain file

Read `[[DOMAIN_FILE]]` in full. Every gap finding maps to a specific regulation, article, or risk type from this file.

### 2.4 — Prior reviews

If `[[PRIOR_REVIEWS]]` is not `none`, read the listed files for peer-comparison context.

---

## Step 3 — Methodology

### 3.1 — Score authority

Every score family is **single-source**. Agent 01 emits no scores at all — `—` in every Score cell of all three of its tables — so there is no second estimate anywhere in this review and no divergence to resolve. Take each score from exactly one file:

- **Principles (P1–P12).** The H1 score in `_review_02_principle_p{N}.md`.
- **Loop phases (§3.1–§3.9).** Specify/Design/Plan from the upstream-phases file; Execute/Verify/Validate from the build-phases file; Observe/Learn/Govern from the runtime-phases file.
- **Loop Integrity.** The loop-integrity file.
- **DoD conditions.** The DoD file. Where it records a condition `N/A` (unmet §2.2 Gate 1 trigger for `Provable` or `Economical`), carry `N/A` through — never treat it as a low score.

Never restate a score from memory or recompute one; copy the integer from its source file. If a source file is missing, say so in the row rather than substituting an estimate.

Build the three Score Index Tables specified in §4.2.

### 3.2 — Target phase extraction (machine-readable)

Extract the maturity verdict from `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_05a_maturity.md` (05b restates the same line; 05a is the source). That file contains a bold line of the form `**Maturity Verdict: Phase {N}**`. Set `target_phase = N + 1`.

Ceiling rule: if the verdict is `Phase 6`, use `Phase 6 (Sustained Maturity)` as the target — no Phase 7 exists. The gap analysis then identifies what would prevent Phase 6 from being durable across regulatory environments.

If the verdict line names a range or expresses uncertainty (e.g., "Phase 3 with proto-Phase 4 elements"), take the lower verdict as authoritative and set `target_phase = lower_verdict + 1`. State the ambiguity in the introduction.

The integer phase number (e.g., `Phase 4`) MUST replace every `{N+1}` token before the file is saved. No literal `{N+1}` text appears in the output.

### 3.3 — Strengths derivation

Wave 1 outputs do not list "strengths" explicitly. To synthesise strengths, scan:

- The `## What works` bullets in each principle file.
- The `**What [[FRAMEWORK]] does.**` paragraphs and any `Runtime-enforced` rows in the mechanism-inventory tables of the three loop-phase files — a runtime-enforced mechanism is the strongest strength evidence this review produces, and it is invisible if you only scan the principle files.
- The `Intact` seam rows, `Implemented` arrow rows, `Met` remediation steps, and `Produced` loop-output artefacts in the loop-integrity file.
- The `**What [[FRAMEWORK]] produces.**` blocks and any condition scoring in the Low severity band in the DoD file.
- Strengths-style observations across the overview, adoption/companion, maturity/industry, guardrails/security, and enterprise-guardrail files.

**Anchor typing.** Every strength carries at least one anchor, and the anchor is typed: a **principle** anchor (P1–P12), a **loop-phase** anchor (Specify … Govern, or Loop Integrity), or a **DoD-condition** anchor (Loop-Complete … Within Service Envelope). A strength anchored only to a principle when the underlying evidence came from a loop or DoD file is a mis-attribution; type the anchor to where the evidence actually lives.

A capability is a strength only when (a) at least one Wave 1 file praises it on evidence and (b) the same Wave 1 file's `## Where it fails the manifesto's bar` (or equivalent evidence-against section) does not materially undermine it. Use the evidence-against material to source the fairness note.

**Anti-inflation rule.** Before writing each strength, verify it is anchored to a `## What works` bullet or equivalent in a specific Wave 1 file. If no such anchor exists, omit the strength.

**Anti-praise rule.** Do not list a strength `[[FRAMEWORK]]` does not demonstrably support. Overclaiming undermines the gap analysis.

Identify between **5 and 12 strengths**. Stop at the smallest set that materially distinguishes `[[FRAMEWORK]]` from the next-simpler alternative. If the floor of 5 cannot be reached without overclaiming, write fewer and explain why in the introduction.

**Ordering.** Order strengths by descending impact on the gap-to-Phase-{target_phase} story: strengths whose absence would lower the maturity verdict appear first; strengths that distinguish `[[FRAMEWORK]]` from peers but do not load-bear on phase placement appear later. Ties are broken by descending principle weight (per `prompt.md`).

### 3.4 — Gap derivation

Identify between **5 and 12 gaps** that block progression from the current phase to `target_phase`. Apply:

- Each gap is a missing capability — not a stylistic preference.
- Each gap connects to a `target_phase` requirement stated in the manifesto (cite the principle minimum bar, the loop-phase definition, the DoD condition, or the maturity phase-gate condition that establishes it). Note that "phase gate" here means a **maturity** phase gate (Phase 1–6), which is a different thing from a **loop** phase (Specify … Govern); do not conflate them in the gap text.
- **Every gap carries at least one typed anchor** — principle, loop phase, or DoD condition — recorded in the gap heading per §4.5. A gap whose evidence came from a loop or DoD file must carry the loop or DoD anchor; laundering it through a nearby principle loses the attribution and produces a roadmap that cannot tell `[[ORGANIZATION]]` where its loop breaks.
- Severity precedence rule: when a gap touches multiple anchors, take the **highest** severity (lowest score band) across every anchor it touches — principle scores, loop-phase scores, and DoD-condition scores are all eligible inputs, using the same canonical thresholds. If the gap also blocks a `target_phase` gate, escalate one severity step (Low→Medium, Medium→High, High→Critical, Critical stays Critical). State both factors in the severity label.
- Effort is the dominant of: engineering effort, validation effort, organisational effort. If the dominant dimension is non-engineering, annotate parenthetically (e.g., `Effort: M (organisational dominant — engineering is S)`).
- Each gap maps to a specific regulation or risk type from `[[DOMAIN_FILE]]` with article or section number.
- Echo Critical Wave 1 findings: if the guardrails/security file (Parts 12–13) or any principle file flags a Critical security or governance finding, that finding MUST appear as a gap in Part 11 unless explicitly justified as out-of-scope.

**Coverage floors (mandatory).** Each of the following MUST appear as a gap in Part 11, or be explicitly justified as out-of-scope in a named sentence that cites the framework's own scope statement:

1. **Every loop phase scored below 60** (the High/Medium severity boundary) in the three loop-phase files.
2. **Every DoD condition graded `Fail`** in the DoD Audit Scenario table. Conditions graded `N/A` are **excluded** — the DoD is phase-calibrated (`manifesto/manifesto-done.md`), and an inapplicable condition is not a gap. Do not convert an `N/A` into a gap, and do not treat its absence from the roadmap as a silent omission.
3. **Every feedback arrow graded `Absent`** in the loop-integrity file's arrow table, where its absence blocks a `target_phase` requirement.
4. **Every remediation sub-cycle step graded `Absent`**, and the remediate-or-retry verdict if it is "retries; does not remediate".
5. **Every loop-output artefact graded `Absent`** in the Loop-Output Test.

Where a coverage floor forces more than 12 gaps, merge first by **shared root cause**. Where more than twelve floor items remain genuinely independent, merge the residue into **umbrella gaps** grouped by anchor family (loop phase, DoD condition, feedback arrow, remediation step, loop-output artefact) — an umbrella gap needs no shared root cause, but MUST enumerate every floor item it absorbs as a named sub-item carrying its own anchor and its own "What closes it" action, and MUST take the highest severity across the items it absorbs. The 12-gap cap binds; silently dropping a floor item does not. State in the introduction how many floor items were merged, by which mechanism (root cause or umbrella), and into which gaps.

**Anti-scope-creep rule.** Where a regulation in `[[DOMAIN_FILE]]` mandates a capability that `[[FRAMEWORK]]` lacks but claims is out-of-scope, flag it as a **Scope Gap** with the controlling regulation: append `(Scope gap — {regulation})` to the gap title.

### 3.5 — Roadmap construction

Order gaps by a 3-key sort:
1. Severity descending (Critical → Low).
2. Dependency ascending (gaps with no dependencies precede dependent gaps; transitive ordering enforced).
3. Effort ascending (S precedes XL).

Cycle prevention: no gap may depend on itself directly or transitively. Every dependency target precedes its dependent in the table.

The Dependency column lists gap numbers ONLY (e.g., `None`, `Gap 2`, `Gap 2, Gap 5`). Do NOT use prose in this column.

The gap-section ordering in §4.4 must match the roadmap row ordering exactly.

---

## Step 4 — Output specification

Write the following file:

**`[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_06_strengths_gaps.md`**

The file contains exactly the sections below, in this order.

### 4.1 — Document header

```
# [[FRAMEWORK]] Review 06 — Genuine Strengths and Gap Analysis to Next Maturity Level
```

Metadata block immediately below the title:

```
**Framework:** [[FRAMEWORK]]
**Version:** [[FRAMEWORK_VERSION]]
**Review date:** YYYY-MM-DD
**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]`
**Reviewer:** Agent 06 — Strengths & Gaps
**Methodology:** Wave 2 synthesis — all 26 upstream output files read end-to-end; no `[[FRAMEWORK]]` source re-read
**Context:** [[ORGANIZATION]] — [[INDUSTRY]]
**Source material:** [[FRAMEWORK_LOWER]]_review_01_quick_overview.md; [[FRAMEWORK_LOWER]]_review_02_principle_p1.md … p12.md (enumerate all twelve individually in the output — the self-check requires 26 paths, not a range); [[FRAMEWORK_LOWER]]_review_03a_loop_upstream.md; [[FRAMEWORK_LOWER]]_review_03b_loop_build.md; [[FRAMEWORK_LOWER]]_review_03c_loop_runtime.md; [[FRAMEWORK_LOWER]]_review_03d_loop_integrity.md; [[FRAMEWORK_LOWER]]_review_03e_dod.md; [[FRAMEWORK_LOWER]]_review_04a_adoption.md; [[FRAMEWORK_LOWER]]_review_04b_companion.md; [[FRAMEWORK_LOWER]]_review_04c_synthesis.md; [[FRAMEWORK_LOWER]]_review_05a_maturity.md; [[FRAMEWORK_LOWER]]_review_05b_industry.md; [[FRAMEWORK_LOWER]]_review_07_guardrails_security_appendix.md; [[FRAMEWORK_LOWER]]_review_08a_domains.md; [[FRAMEWORK_LOWER]]_review_08b_enterprise_synthesis.md
```

### 4.2 — Score Index Tables (mandatory)

Insert immediately after the metadata block. Three tables, in this order — loop first, DoD second, principles third, mirroring the merged document's part order. Each is a straight index of single-source scores; there is no second estimate to reconcile.

```
> **Score sources.** Every score below is copied from the deep file named in its row. Agent 01 emits `—` in all of its Score cells, so no score in this review has a competing estimate.

**Loop phase scores**

| Phase | Score | Severity | Source file |
|---|---|---|---|
| Specify | ... | ... | `..._review_03a_loop_upstream.md` |
... (one row per phase, Specify through Govern — nine rows) ...
| **Loop Integrity** | ... | ... | `..._review_03d_loop_integrity.md` |

**DoD condition scores**

| Condition | Score | Severity | Source file |
|---|---|---|---|
... (one row per condition, Loop-Complete through Within Service Envelope — eight rows, all sourced from `..._review_03e_dod.md`) ...

Where agent 03e records a condition `N/A`, write `N/A` in Score and `n/a` in Severity. Never treat `N/A` as a low score.

**Principle scores**

| # | Principle | Score | Severity | Source file |
|---|---|---|---|---|
| P1 | ... | ... | ... | `..._review_02_principle_p1.md` |
... (one row per principle, P1–P12) ...
```

After the three tables, state in one sentence that every score is single-source and name the files it came from.

### 4.3 — Introduction (2–4 paragraphs)

Frame the fair-assessment posture. Make two commitments explicit:

1. No strength is listed that `[[FRAMEWORK]]` does not demonstrably support; every strength claim is audited against a Wave 1 anchor.
2. No gap is invented out of scope; where `[[INDUSTRY]]` regulations demand a capability `[[FRAMEWORK]]` does not provide, the scope gap is flagged explicitly.

State the current maturity phase (from Part 8) and `target_phase` (current + 1, with the ceiling rule applied).

### 4.4 — Part 10: Genuine Strengths

```markdown
## Part 10 — What [[FRAMEWORK]] Gets Right (Fairly Assessed)
```

Each strength uses this exact structure:

```
**N. {Strength Title}**

*Anchors — Principles: P{X}[, P{Y}] | Loop phases: {Phase}[, {Phase}] | DoD conditions: {Condition}[, {Condition}]*

[At least one of the three anchor families is populated. Write `none` for a family with no anchor; do not omit the family.]

#### Mechanism
{1–2 paragraphs describing the mechanism — what it does and how it works.}

#### Why it is genuinely good
{1 paragraph describing the failure mode prevented and why this matters in [[INDUSTRY]].}

#### Evidence
- **Wave 1 anchor:** {canonical Part number and Wave 1 file section, e.g., "Part 5, P3 §What works bullet 2"}.
- **Source anchor (verbatim from Wave 1):** {the specific [[FRAMEWORK]] file/function/rule cited IN that Wave 1 section, copied verbatim — do not re-derive}.

#### Better than the alternative
{1 paragraph naming the simpler alternative and why this is better.}

*Fairness note: {Honest acknowledgement of limits, partial implementation, or conditions under which this strength does not hold. Source from the same Wave 1 file's evidence-against section.}*
```

**Dual-anchor rule.** Each strength MUST cite both anchors. If either anchor is absent, the strength is omitted.

**Architectural-strength cross-link.** Before including a strength, scan the Wave 1 file's evidence-for section for phrases like "epic", "planned", "in progress", "not yet at HEAD", "design only", "future feature". If found, label the strength as **architectural** and the fairness note must state the deployment gap explicitly. If the architectural strength's deployment gap is itself a `target_phase` blocker, the same item also appears as a gap in Part 11, and each side cross-references the other by number.

### 4.5 — Part 11: Gap Analysis

```markdown
## Part 11 — Gap Analysis: What's Missing to Reach {target_phase}
```

Open with one factual sentence (semicolon-list permitted) stating the `target_phase` requirements that drive the gap list. Cite the manifesto sources that establish those requirements (e.g., `manifesto/manifesto.md` six-phase model, the `manifesto-principles` source group P5 Phase × tier table, `companion/frameworks.md` per-phase failure modes, and `governance/phase-level-matrix.md` AEM column).

Each gap MUST use the EXACT heading format:

```
### Gap {N} — {title} *(Severity — {anchors})*
```

`{anchors}` is a semicolon-separated list of one to three typed anchor groups, in this order, omitting any group that is empty:

- `P{X}, P{Y}` — principle anchors
- `Loop: {Phase}, {Phase}` — loop-phase anchors (a phase name, or `Loop Integrity`)
- `DoD: {Condition}, {Condition}` — DoD-condition anchors

At least one group MUST be present. Examples: `*(Critical — P9, P12; Loop: Observe, Govern)*`, `*(High — Loop: Loop Integrity; DoD: Traceable)*`, `*(Medium — P6)*`.

Valid severity labels: `Critical`, `High`, `Medium`, `Low`. Do not use other formats.

Each gap follows this structure:

```markdown
### Gap N — {Title} *(Severity — P{X}[, P{Y}])*

{One sentence (≤30 words) stating what is missing. Do not pre-empt the structured subsections.}

#### Current state

{1–3 sentences describing what `[[FRAMEWORK]]` currently does in this area, citing specific Wave 1 review sections and the [[FRAMEWORK]] artefact (copied verbatim from Wave 1). Without this anchor, "What is missing" is ungrounded.}

#### What is missing

{Specific description of the absent artefact, mechanism, or process. Name the function, configuration block, command, or data structure that would close this gap. Generic recommendations are not acceptable.

ACCEPTABLE example: "Add a `_journal_call()` private function to `ai/claude.py` that appends a structured JSON record with fields `timestamp`, `prompt_sha256`, `response_sha256`, `model`, `token_input`, `token_output`."

UNACCEPTABLE: "Add LLM call logging."}

#### What {target_phase} requires

{Cite the specific maturity phase-gate condition, principle minimum bar, loop-phase definition, or DoD condition from the manifesto that establishes the requirement. Name which. This subsection makes the connection between the gap and the phase target explicit. Where the anchor is a loop phase or DoD condition, quote the bar from `manifesto/manifesto.md` or `manifesto/manifesto-done.md` rather than substituting a nearby principle's bar.}

#### Why it matters for [[ORGANIZATION]] in [[INDUSTRY]]

{Cite specific regulations from [[DOMAIN_FILE]] — article numbers, not just regulation names. If no article number exists, name the regulation section header. Explain the regulatory consequence if this gap is not closed before [[ORGANIZATION]] progresses to {target_phase}.}

#### What closes it

{A concrete numbered list of 3–6 actions. Each action names the file to create or modify, the function or configuration block to add, and the observable output that confirms completion.}

#### Evidence anchor

- **Wave 1 anchor:** {canonical Part number and Wave 1 file section that establishes this gap, e.g., "see Part 12, §12.5"}.
- **Source anchor (verbatim from Wave 1):** {the specific [[FRAMEWORK]] artefact or absence-of-artefact cited IN that Wave 1 section}.

#### Effort

{S / M / L / XL — calibrated against `prompt.md` definitions. Annotate dominant dimension parenthetically when non-engineering dominates.}
```

Gap-section ordering matches the roadmap row ordering exactly.

### 4.6 — Prioritised Remediation Roadmap

```markdown
## Prioritised Remediation Roadmap
```

Markdown table:

| Gap | Short Name | Severity | Effort | Impact for [[ORGANIZATION]] | Dependencies |

The Dependencies column contains gap numbers only (e.g., `None`, `Gap 1`, `Gap 1, Gap 4`). No prose.

Row order = gap-section order (3-key sort: severity desc, dependency asc, effort asc).

Immediately follow the table with:

```markdown
### Roadmap Interpretation for [[ORGANIZATION]]
```

Required structure:
- One paragraph for each effort tier (S, M, L/XL) explaining sequencing within the tier and tying each tier to a regulator-driven sequencing rationale (not just engineering availability).
- One closing paragraph stating the adoption-ceiling change after full roadmap completion (`[[FRAMEWORK]]`'s ceiling becomes `target_phase`).

Reference specific `[[INDUSTRY]]` regulations and articles throughout.

### 4.7 — Footer

```
*Review conducted by Agent 06. Source files: 26 upstream outputs listed in the metadata block. Regulatory frameworks sourced from `[[DOMAIN_FILE]]` (sections cited in Part 11 listed inline). Manifesto principles sourced from the `manifesto-principles` source group, `manifesto/manifesto.md`, and `manifesto/manifesto-done.md`.*
```

---

## Step 5 — Hard rules

These rules are non-negotiable.

1. **Evidence discipline.** Every strength and every gap quotes verbatim from a named Wave 1 source file with path. The dual-anchor format (Wave 1 anchor + source anchor) is mandatory.
2. **No `[[FRAMEWORK]]` source re-read.** This agent is a Wave 2 synthesis agent. Wave 1 has already read the source. Source-artefact citations are copied verbatim from Wave 1 files; they are not re-derived.
3. **Industry mapping.** Every gap references a specific regulation or risk type from `[[DOMAIN_FILE]]` with article/section number. "Regulatory exposure" without a named regulation and identifier is not acceptable.
4. **Phase target.** The gap analysis targets `target_phase` as defined by §3.2. The integer phase number replaces every `{N+1}` token before save. Phase 6 ceiling rule applies.
5. **No `[[DOMAIN_FILE]]` forward-propagation.** Do not introduce regulatory mappings beyond those that appear in `[[DOMAIN_FILE]]`. Do not import regulatory framing from other domain files. The agent does not extend the regulatory taxonomy beyond what `[[DOMAIN_FILE]]` defines.
6. **Banned soft language.** The output MUST NOT contain any of: `consider`, `may`, `could potentially`, `perhaps`, `use judgement`. Also avoid (without an evidence anchor in the same paragraph): `robust`, `comprehensive`, `world-class`, `industry-leading`, `best-in-class`, `leverages`, `empowers`, `enables` (without naming what is enabled), `seamless`, `holistic`, `mature` (without phase number), `production-ready` (without naming what is production), `powerful` (without naming the power).
7. **Single-source scores.** Every score and every severity determination comes from exactly one deep file — principles from the principle files, loop phases from the three loop-phase files, Loop Integrity from the loop-integrity file, DoD conditions from the DoD file. Agent 01 supplies no scores. The three Score Index Tables record the source of each.
8. **Typed anchors are mandatory.** Every strength carries an anchor line naming all three families (with `none` where empty); every gap heading carries at least one typed anchor group. A finding sourced from a loop or DoD file must carry the loop or DoD anchor.
9. **Coverage floors are mandatory.** Every item named in §3.4's coverage floors appears as a gap or carries an explicit, named out-of-scope justification. Silent omission is a defect.
10. **British English.** "Prioritised", "organisation", "behaviour" — match the manifesto corpus convention.

---

## Step 6 — Self-check (gate)

**Do not save the output file until every item below is confirmed.**

- [ ] Step 1 preflight passed: Glob returned exactly 12 principle files; the 14 other Wave 1 files exist; every file passes the completion check; no header-line placeholder leakage.
- [ ] Does the output file's header metadata block contain the substring `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]` (the mandatory provenance line — see `prompt.md`'s Hard rules)?
- [ ] All 26 upstream output files read end-to-end. None missing or empty.
- [ ] All three Score Index Tables present, in the order loop / DoD / principles: the loop table has nine phase rows plus the Loop Integrity row; the DoD table has eight rows; the principle table has twelve rows. Every row names its source file.
- [ ] **Every score in the three tables matches the integer in the source file named in its own row.** Spot-check by re-opening at least the twelve principle files; a score written from memory rather than copied is the defect this item exists to catch.
- [ ] `target_phase` extracted from `**Maturity Verdict: Phase {N}**` in the maturity/industry file; integer substituted everywhere; Phase 6 ceiling rule applied if relevant; no literal `{N+1}` text in output.
- [ ] Every strength has: dual-anchor evidence (Wave 1 anchor + source anchor verbatim from Wave 1), Mechanism / Why genuinely good / Better than the alternative subsections, fairness note sourced from the same file's evidence-against section.
- [ ] Every strength's anchor line names all three families (Principles / Loop phases / DoD conditions), with `none` where a family is empty.
- [ ] At least one strength or gap in the file is sourced from a loop-phase file, the loop-integrity file, or the DoD file — not exclusively from the principle files. If none is, the synthesis has ignored Parts 3 and 4; re-derive before saving.
- [ ] Strength count is between 5 and 12; ordering follows §3.3.
- [ ] DoD Score Index Table has eight rows, all sourced from `03e`; any `N/A` condition carries `N/A` as Score and `n/a` as Severity, and is never treated as a low score.
- [ ] Every gap heading uses the exact format `### Gap {N} — {title} *(Severity — {anchors})*` with a valid severity label and at least one typed anchor group (`P{X}`, `Loop: {Phase}`, or `DoD: {Condition}`) in the §4.5 order.
- [ ] Every gap has: Current state, What is missing, What `target_phase` requires, Why it matters for `[[ORGANIZATION]]` in `[[INDUSTRY]]` (with article/section numbers from `[[DOMAIN_FILE]]`), What closes it (3–6 numbered concrete actions), Evidence anchor (dual: Wave 1 + source), Effort (with dominant-dimension annotation when non-engineering dominates).
- [ ] Gap count is between 5 and 12, and every coverage-floor item appears either as its own gap or as a named, individually-anchored sub-item of an umbrella gap. Zero floor items are unaccounted for.
- [ ] Severity for **every** gap — single-anchor and multi-anchor alike — is the highest severity (lowest score band) across **every** anchor it carries: principle scores, loop-phase scores, and DoD-condition scores, not principles alone. A gap anchored only to `Loop:` and/or `DoD:` anchors, and a gap carrying exactly one anchor, are checked the same way. `N/A` DoD conditions carry no score and are excluded. Escalate one step where a `target_phase` gate is blocked. Agent 09 recomputes this independently (check 7c) — a mismatch there is a defect in this file.
- [ ] All Critical Wave 1 findings (Parts 12–13 and any principle-file Critical) appear as gaps unless explicitly justified out-of-scope.
- [ ] **Coverage floors satisfied:** every loop phase scored below 60; every DoD condition graded `Fail` (never one graded `N/A`) in the audit scenario; every `Absent` feedback arrow that blocks a `target_phase` requirement; every `Absent` remediation sub-cycle step and the remediate-or-retry verdict where negative; every `Absent` loop-output artefact — each appears as a gap or carries a named out-of-scope justification.
- [ ] If coverage floors forced merges, the introduction states how many floor items were merged and into which gaps.
- [ ] Scope gaps tagged `(Scope gap — {regulation})` in the title.
- [ ] Architectural strengths whose deployment gap is a `target_phase` blocker also appear as gaps; each side cross-references the other by number.
- [ ] Roadmap row count equals gap count; row ordering matches gap-section ordering.
- [ ] Roadmap Dependencies column contains only `None` or comma-separated `Gap {N}` references — no prose.
- [ ] No gap depends on itself directly or transitively; every dependency target precedes its dependent in the table.
- [ ] Roadmap Interpretation has one paragraph per effort tier (S, M, L/XL) plus a closing adoption-ceiling paragraph; tier paragraphs justify sequencing by reference to regulatory exposure.
- [ ] No banned soft language appears in the output — neither the canonical core list nor the extended list, which applies to this agent (06), both delivered in the Universal Prepend Block.
- [ ] Zero matches for any out-of-scope-corpus token (`ASDLC`, `APLC`, `IGM`, `AEnt-M`, `AEnt_M`, `intelligence-governance-manifesto`, `agentic-enterprise-manifesto`, `agentic-enterprise`, `agentic-governance-stack`, `manifesto-evolution-plan`, `phase-assessment-checklist`, `asdlc/`, `aplc/`, `agentic-sdlc-handbook`, `asdlc-plan`, `aplc-plan`, `igm-aent-coherence-review`) anywhere in the output. Every source file referenced is tracked by git on the current branch.
- [ ] Every claim in strengths and gaps is anchored to a verbatim quote from a named Wave 1 source file with path.
- [ ] All cross-references use canonical part numbers; no file names or agent numbers in cross-references within output content.
- [ ] All dates use YYYY-MM-DD.
- [ ] Source material block has all 26 file paths with `[[FRAMEWORK_LOWER]]` substituted.
