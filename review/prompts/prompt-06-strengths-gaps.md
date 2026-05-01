# Sub-prompt 06 — Strengths & Gaps

**Purpose:** Synthesise Wave 1 evidence into Part 10 (Genuine Strengths) and Part 11 (Gap Analysis) for `[[FRAMEWORK]]`, calibrated to `[[INDUSTRY]]` regulatory obligations under `[[DOMAIN_FILE]]`. Produce a prioritised remediation roadmap that names the artefacts and mechanisms required to reach the next maturity phase.

**Placeholder reminder:** Before executing, confirm every `[[VARIABLE]]` in this prompt has been substituted by the orchestrator. If any literal `[[...]]` pattern remains, stop and report.

**Wave-2 contract:** This agent is a **synthesis agent**. Its evidence is the 17 Wave 1 output files. It does NOT re-read `[[FRAMEWORK]]` source artefacts and does NOT re-derive scores. Where a `[[FRAMEWORK]]` artefact is cited, the citation is copied verbatim from the Wave 1 file that established it.

**Canonical references (do not re-quote):**
- Score weighting scheme — defined in `prompt.md` §"Score weighting scheme". Reference it; do not copy the table here.
- Severity thresholds (Critical / High / Medium / Low) — defined in `prompt.md` §"Severity thresholds". Reference; do not copy.
- Effort sizing (S / M / L / XL) — defined in `prompt.md` §"Effort sizing". Reference; do not copy.
- Canonical part numbering — defined in `prompt.md` §"Canonical part numbering". Use Part 1 through Part 13 references in output; do not re-quote the table.

---

## Step 1 — Preflight (mandatory before writing anything)

**Do not save the output file until every item below is confirmed.**

Run the following operational checks. If any check fails, output ONLY a structured report listing the missing/invalid files and STOP. Do not write Part 10, do not write Part 11, do not write the roadmap.

1. **Glob check for principle files.** Run a `Glob` for `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p*.md`. The result MUST contain exactly 12 files (p1.md through p12.md). If fewer than 12, the agent stops.
2. **Existence check for the other 5 Wave 1 files.** For each of the following paths, verify it exists:
   - `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_01_quick_overview.md`
   - `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03_loop_dod.md`
   - `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04_adoption_companion.md`
   - `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_05_maturity_financial.md`
   - `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_07_guardrails_security_appendix.md`
3. **Non-empty / non-stub check.** Read the first 5 lines and the last 5 lines of each of the 5 files in step 2. If a file has fewer than 20 lines total, treat it as invalid.
4. **Placeholder leakage check.** None of the 17 files may contain a literal `[[...]]` token in their header lines (lines 1–10). If any file shows an unsubstituted placeholder, treat it as invalid.

Stop conditions (output a structured report listing the offending files, then halt):

```
PREFLIGHT FAILED
Missing files: <paths>
Invalid files (<20 lines or placeholder leakage): <paths>
```

The agent does not proceed past Step 1 until all checks pass.

---

## Step 2 — Inputs

### 2.1 — The 17 Wave 1 output files (the only evidence base)

These are the agent's evidence. The agent reads these files end-to-end. The agent does NOT read `[[FRAMEWORK]]` source artefacts directly — Wave 1 has already done that read. Where a `[[FRAMEWORK]]` artefact citation is required in output, the agent copies it verbatim from the Wave 1 file that established it.

| File | Produced by |
| --- | --- |
| `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_01_quick_overview.md` | Agent 01 |
| `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p1.md` ... `p12.md` | Agent 02 (×12) |
| `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03_loop_dod.md` | Agent 03 |
| `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04_adoption_companion.md` | Agent 04 |
| `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_05_maturity_financial.md` | Agent 05 |
| `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_07_guardrails_security_appendix.md` | Agent 07 |

### 2.2 — Manifesto corpus (read in full, current version on disk)

- `manifesto-principles.md` — canonical P1–P12, autonomy tiers, oversight patterns, minimum bars.
- `manifesto.md` — Agentic Loop phases and the six values.
- `manifesto-done.md` — Agentic Definition of Done and evidence freshness rules.

### 2.3 — Domain file

Read `[[DOMAIN_FILE]]` in full. Every gap finding maps to a specific regulation, article, or risk type from this file.

### 2.4 — Prior reviews

If `[[PRIOR_REVIEWS]]` is not `none`, read the listed files for peer-comparison context.

---

## Step 3 — Methodology

### 3.1 — Score authority

Compare principle-file scores (Wave 1 agent 02) with overview scores (Wave 1 agent 01). Where they diverge, the principle-file scores are authoritative. Build the Score Authority Table specified in §4.2.

### 3.2 — Target phase extraction (machine-readable)

Extract the maturity verdict from `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_05_maturity_financial.md`. That file contains a bold line of the form `**Maturity Verdict: Phase {N}**`. Set `target_phase = N + 1`.

Ceiling rule: if the verdict is `Phase 6`, use `Phase 6 (Sustained Maturity)` as the target — no Phase 7 exists. The gap analysis then identifies what would prevent Phase 6 from being durable across regulatory environments.

If the verdict line names a range or expresses uncertainty (e.g., "Phase 3 with proto-Phase 4 elements"), take the lower verdict as authoritative and set `target_phase = lower_verdict + 1`. State the ambiguity in the introduction.

The integer phase number (e.g., `Phase 4`) MUST replace every `{N+1}` token before the file is saved. No literal `{N+1}` text appears in the output.

### 3.3 — Strengths derivation

Wave 1 outputs do not list "strengths" explicitly. To synthesise strengths, scan:

- The `## What works` bullets in each principle file (Review 02).
- "What works" / strengths-style observations across Reviews 01, 03, 04, 05, 07.

A capability is a strength only when (a) at least one Wave 1 file praises it on evidence and (b) the same Wave 1 file's `## Where it fails the manifesto's bar` (or equivalent evidence-against section) does not materially undermine it. Use the evidence-against material to source the fairness note.

**Anti-inflation rule.** Before writing each strength, verify it is anchored to a `## What works` bullet or equivalent in a specific Wave 1 file. If no such anchor exists, omit the strength.

**Anti-praise rule.** Do not list a strength `[[FRAMEWORK]]` does not demonstrably support. Overclaiming undermines the gap analysis.

Identify between **5 and 12 strengths**. Stop at the smallest set that materially distinguishes `[[FRAMEWORK]]` from the next-simpler alternative. If the floor of 5 cannot be reached without overclaiming, write fewer and explain why in the introduction.

**Ordering.** Order strengths by descending impact on the gap-to-Phase-{target_phase} story: strengths whose absence would lower the maturity verdict appear first; strengths that distinguish `[[FRAMEWORK]]` from peers but do not load-bear on phase placement appear later. Ties are broken by descending principle weight (per `prompt.md`).

### 3.4 — Gap derivation

Identify between **5 and 12 gaps** that block progression from the current phase to `target_phase`. Apply:

- Each gap is a missing capability — not a stylistic preference.
- Each gap connects to a `target_phase` requirement stated in the manifesto (cite the principle minimum bar or phase-gate condition).
- Severity precedence rule: when a gap touches multiple principles, take the **highest** severity (lowest score band) of the affected principles. If the gap also blocks a `target_phase` gate, escalate one severity step (Low→Medium, Medium→High, High→Critical, Critical stays Critical). State both factors in the severity label.
- Severity calibration uses the canonical thresholds in `prompt.md`.
- Effort sizing uses the canonical sizing in `prompt.md`. Effort is the dominant of: engineering effort, validation effort, organisational effort. If the dominant dimension is non-engineering, annotate parenthetically (e.g., `Effort: M (organisational dominant — engineering is S)`).
- Each gap maps to a specific regulation or risk type from `[[DOMAIN_FILE]]` with article or section number.
- Echo Critical Wave 1 findings: if Review 07 (Parts 12–13) or any P-file flags a Critical security/governance finding, that finding MUST appear as a gap in Part 11 unless explicitly justified as out-of-scope.

**Anti-scope-creep rule.** Do NOT penalise `[[FRAMEWORK]]` for capabilities that are out of its stated scope. However, if a regulation in `[[DOMAIN_FILE]]` mandates a capability that `[[FRAMEWORK]]` lacks but claims is out-of-scope, flag it as a **Scope Gap** with the controlling regulation: append `(Scope gap — {regulation})` to the gap title.

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
**Methodology:** Wave 2 synthesis — all 17 Wave 1 output files read end-to-end; no `[[FRAMEWORK]]` source re-read
**Context:** [[ORGANIZATION]] — [[INDUSTRY]]
**Source material:** [[FRAMEWORK_LOWER]]_review_01_quick_overview.md; [[FRAMEWORK_LOWER]]_review_02_principle_p1.md through p12.md; [[FRAMEWORK_LOWER]]_review_03_loop_dod.md; [[FRAMEWORK_LOWER]]_review_04_adoption_companion.md; [[FRAMEWORK_LOWER]]_review_05_maturity_financial.md; [[FRAMEWORK_LOWER]]_review_07_guardrails_security_appendix.md
```

### 4.2 — Score Authority Table (mandatory)

Insert immediately after the metadata block:

```
> **Score consistency note:** The principle files (Review 02) are authoritative when divergent from the overview file (Review 01). The table below uses principle-file scores throughout.

| # | Principle | Authoritative Score (P-file) | Overview Score (Review 01) | Severity | Divergence flag |
|---|---|---|---|---|---|
| P1 | ... | ... | ... | ... | yes/no |
... (one row per principle, P1–P12) ...
```

After the table, list any principles where the divergence crosses a severity boundary. State in one sentence that principle-file scores are authoritative.

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

*Principles touched: P{X}[, P{Y}]*

#### Mechanism
{1–2 paragraphs describing the mechanism — what it does and how it works.}

#### Why it is genuinely good
{1 paragraph describing the failure mode prevented and why this matters in [[INDUSTRY]].}

#### Evidence
- **Wave 1 anchor:** {canonical Part number and Wave 1 file section, e.g., "Review 02 P3 file §What works bullet 2"}.
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

Open with one factual sentence (semicolon-list permitted) stating the `target_phase` requirements that drive the gap list. Cite the manifesto's phase-gate condition file (e.g., `phase-assessment-checklist.md` `target_phase` section).

Each gap MUST use the EXACT heading format:

```
### Gap {N} — {title} *(Severity — P{X}, P{Y})*
```

Valid severity labels: `Critical`, `High`, `Medium`, `Low`. Do not use other formats. Multi-principle gaps list all affected principles separated by commas.

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

{Cite the specific phase-gate condition or principle minimum bar from the manifesto. This subsection makes the connection between the gap and the phase target explicit.}

#### Why it matters for [[ORGANIZATION]] in [[INDUSTRY]]

{Cite specific regulations from [[DOMAIN_FILE]] — article numbers, not just regulation names. If no article number exists, name the regulation section header. Explain the regulatory consequence if this gap is not closed before [[ORGANIZATION]] progresses to {target_phase}.}

#### What closes it

{A concrete numbered list of 3–6 actions. Each action names the file to create or modify, the function or configuration block to add, and the observable output that confirms completion.}

#### Evidence anchor

- **Wave 1 anchor:** {canonical Part number and Wave 1 file section that establishes this gap, e.g., "see Part 12.5 in Review 07"}.
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
*Review conducted by Agent 06. Source files: 17 Wave 1 outputs listed in the metadata block. Regulatory frameworks sourced from `[[DOMAIN_FILE]]` (sections cited in Part 11 listed inline). Manifesto principles sourced from `manifesto-principles.md`, `manifesto.md`, and `manifesto-done.md`.*
```

---

## Step 5 — Hard rules

These rules are non-negotiable.

1. **Evidence discipline.** Every strength and every gap quotes verbatim from a named Wave 1 source file with path. The dual-anchor format (Wave 1 anchor + source anchor) is mandatory.
2. **No `[[FRAMEWORK]]` source re-read.** This agent is a Wave 2 synthesis agent. Wave 1 has already read the source. Source-artefact citations are copied verbatim from Wave 1 files; they are not re-derived.
3. **Severity, effort, weighting, part numbering.** Reference `prompt.md`. Do not re-quote the tables.
4. **Industry mapping.** Every gap references a specific regulation or risk type from `[[DOMAIN_FILE]]` with article/section number. "Regulatory exposure" without a named regulation and identifier is not acceptable.
5. **Phase target.** The gap analysis targets `target_phase` as defined by §3.2. The integer phase number replaces every `{N+1}` token before save. Phase 6 ceiling rule applies.
6. **Cross-references.** Use canonical part numbers ("see Part 12"). Do not use file names or agent numbers in cross-references within output content.
7. **Date format.** YYYY-MM-DD throughout.
8. **No ASDLC, APLC, or handbook references.** Do not mention or link to `asdlc/`, `aplc/`, `asdlc-plan.md`, `aplc-plan.md`, or `agentic-sdlc-handbook/` anywhere in the output or in the agent's reasoning.
9. **No `[[DOMAIN_FILE]]` forward-propagation.** Do not introduce regulatory mappings beyond those that appear in `[[DOMAIN_FILE]]`. Do not import regulatory framing from other domain files. The agent does not extend the regulatory taxonomy beyond what `[[DOMAIN_FILE]]` defines.
10. **Banned soft language.** The output MUST NOT contain any of: `consider`, `may`, `could potentially`, `perhaps`, `use judgement`. Also avoid (without an evidence anchor in the same paragraph): `robust`, `comprehensive`, `world-class`, `industry-leading`, `best-in-class`, `leverages`, `empowers`, `enables` (without naming what is enabled), `seamless`, `holistic`, `mature` (without phase number), `production-ready` (without naming what is production), `powerful` (without naming the power).
11. **Principal-file score authority.** Principle-file scores override overview scores for all severity determinations. The Score Authority Table records the divergence.
12. **British English.** "Prioritised", "organisation", "behaviour" — match the manifesto corpus convention.

---

## Step 6 — Self-check (gate)

**Do not save the output file until every item below is confirmed.**

- [ ] Step 1 preflight passed: Glob returned exactly 12 principle files; the 5 other Wave 1 files exist; each has ≥20 lines; no header-line placeholder leakage.
- [ ] All 17 Wave 1 files read end-to-end. None missing or empty.
- [ ] Score Authority Table is present with 12 rows and divergence flags.
- [ ] `target_phase` extracted from `**Maturity Verdict: Phase {N}**` in Review 05; integer substituted everywhere; Phase 6 ceiling rule applied if relevant; no literal `{N+1}` text in output.
- [ ] Every strength has: dual-anchor evidence (Wave 1 anchor + source anchor verbatim from Wave 1), Mechanism / Why genuinely good / Better than the alternative subsections, fairness note sourced from the same file's evidence-against section.
- [ ] Strength count is between 5 and 12; ordering follows §3.3.
- [ ] Every gap heading uses the exact format `### Gap {N} — {title} *(Severity — P{X}, P{Y})*` with a valid severity label.
- [ ] Every gap has: Current state, What is missing, What `target_phase` requires, Why it matters for `[[ORGANIZATION]]` in `[[INDUSTRY]]` (with article/section numbers from `[[DOMAIN_FILE]]`), What closes it (3–6 numbered concrete actions), Evidence anchor (dual: Wave 1 + source), Effort (with dominant-dimension annotation when non-engineering dominates).
- [ ] Gap count is between 5 and 12.
- [ ] Severity for every multi-principle gap is the highest band of affected principles, escalated one step if a `target_phase` gate is blocked.
- [ ] All Critical Wave 1 findings (Review 07 Parts 12–13 and any P-file Critical) appear as gaps unless explicitly justified out-of-scope.
- [ ] Scope gaps tagged `(Scope gap — {regulation})` in the title.
- [ ] Architectural strengths whose deployment gap is a `target_phase` blocker also appear as gaps; each side cross-references the other by number.
- [ ] Roadmap row count equals gap count; row ordering matches gap-section ordering.
- [ ] Roadmap Dependencies column contains only `None` or comma-separated `Gap {N}` references — no prose.
- [ ] No gap depends on itself directly or transitively; every dependency target precedes its dependent in the table.
- [ ] Roadmap Interpretation has one paragraph per effort tier (S, M, L/XL) plus a closing adoption-ceiling paragraph; tier paragraphs justify sequencing by reference to regulatory exposure.
- [ ] No banned soft language appears in the output (`consider`, `may`, `could potentially`, `perhaps`, `use judgement`, plus the qualified list in Hard rule 10).
- [ ] No `asdlc/`, `aplc/`, `asdlc-plan.md`, `aplc-plan.md`, or `agentic-sdlc-handbook/` references anywhere.
- [ ] Every claim in strengths and gaps is anchored to a verbatim quote from a named Wave 1 source file with path.
- [ ] All cross-references use canonical part numbers; no file names or agent numbers in cross-references within output content.
- [ ] All dates use YYYY-MM-DD.
- [ ] Source material block has all 17 file paths with `[[FRAMEWORK_LOWER]]` substituted.
