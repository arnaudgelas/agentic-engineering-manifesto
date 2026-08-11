# Sub-prompt 09 — Merge

**Purpose:** Produce `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_manifesto_alignment_review_merged.md` — a single, coherent master review of **[[FRAMEWORK]]** against the Agentic Engineering Manifesto, integrating all 19 canonical source files (Wave 1a + Wave 1b + Wave 2) into canonical Parts 1–14 plus closing sections and appendices.

**Placeholder reminder:** Before doing any work, scan this prompt for any remaining `[[...]]` patterns. If any placeholder is unsubstituted (e.g., the literal text `[[FRAMEWORK]]` still appears in your working copy), stop immediately and report which variables are unset.

**Wave 3 preflight reminder:** This agent runs in Wave 3. All 19 canonical source files from Waves 1a, 1b, and 2 must exist and be non-empty before any merging begins. Verify this before proceeding (see Preflight Check below).

**Canonical references (do not re-quote):** Score weighting, severity thresholds, and effort sizing are defined exclusively in `prompt.md`. Reference them by name (e.g., "the canonical severity thresholds from `prompt.md`"). Do NOT re-quote these tables in this prompt or in the output.

**Banned soft language (output MUST NOT contain):** `consider`, `may`, `could potentially`, `perhaps`, `use judgement`. Replace each with a specific evidenced claim or an explicit gap. This is a hard prohibition, not guidance.

---

## Preflight Check

### Step 1 — Verify all 19 source files exist AND are non-empty

Use `Read` to read the **first and last 5 lines** of each of the 19 source files listed below under `[[FRAMEWORK_LOWER]]/`. If any file returns empty content or fewer than 20 lines, treat it as invalid. Output ONLY a report of all invalid files and STOP. Do not write the merged output.

```
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_01_quick_overview.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p1.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p2.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p3.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p4.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p5.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p6.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p7.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p8.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p9.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p10.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p11.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p12.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03_loop_dod.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04_adoption_companion.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_05_maturity_industry.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_06_strengths_gaps.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_07_guardrails_security_appendix.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_08_enterprise_guardrails.md
```

**If any file is missing, empty, or shorter than 20 lines: stop immediately. Report each invalid file by path. Do not produce a partial or incomplete merge. Do not proceed until all 19 files are confirmed valid.**

### Step 2 — Score-integrity cross-checks (mandatory; report-don't-fix)

After confirming file validity, perform the following cross-checks. For each mismatch, record an integrity warning verbatim in the merged document's `## Source Integrity` section using this fixed schema:

```
- {Dimension}: source A reports X, source B reports Y. Discrepancy ΔZ. Source A path / Source B path.
```

Cross-checks:

1. **Per-principle score check (P1–P12).** For each principle N: extract the integer in the `Score` column of agent 01's "Manifesto Principles Table" (`_review_01_quick_overview.md` Part 1). Quote the row verbatim as evidence. Extract the integer in the H1 line of `_review_02_principle_p{N}.md` (the `**NN/100**` token). Quote the H1 line verbatim. The two integers MUST match.

2. **Per-principle H1 vs Score-rationale check.** For each principle N: extract the integer from the H1 line of `_review_02_principle_p{N}.md` and the integer from its `## Score rationale` paragraph (`Score: **NN/100**`). Quote both verbatim. They MUST match (each `02-pN` agent enforces this internally before saving its file; verify before lifting).

3. **Loop-phase score check.** For each of the 9 phases: extract the score from agent 01's "Agentic Loop Phases Table" (`_review_01_quick_overview.md` Part 1). Extract the score from the corresponding `### {Phase} | **{score}/100**` heading in `_review_03_loop_dod.md` Part 4. Quote both verbatim. They MUST match.

4. **DoD condition score check.** For each of the 8 DoD conditions: extract the score from agent 01's "Agentic Definition of Done Table" (`_review_01_quick_overview.md` Part 1). Extract the score from the corresponding row of agent 03's "DoD Condition Table" (`_review_03_loop_dod.md` Part 5). Quote both verbatim. They MUST match.

5. **Maturity verdict check.** Extract the phase number named in agent 01's "Maturity Phase Verdict" paragraph (`_review_01_quick_overview.md` Part 1). Extract the phase number from agent 05b's `**Maturity Verdict: Phase {N}**` line in `_review_05_maturity_industry.md` Part 8 (lifted verbatim from agent 05a). Quote both verbatim. They MUST name the same phase.

6. **Composite arithmetic check.** Compute `Σ(score × decimal_weight)` from agent 01's Manifesto Principles Table using the canonical weighting from `prompt.md`. Compare against the `**Overall Score:** <X.X>/100` line in `_review_01_quick_overview.md`'s header. Quote both values verbatim.

7. **Severity-threshold check.** For every score in agent 01's tables and per-principle H1 lines, verify the severity label matches the canonical thresholds from `prompt.md`. Flag any mismatch.

8. **Agent 06 score-consistency note.** If `_review_06_strengths_gaps.md` records a score-consistency note in its header block, lift that note verbatim into Source Integrity.

### Step 3 — Score-preservation policy (resolves the score-arbitration question)

Preserve Wave 1 scores verbatim. The merged document MUST NOT re-score any principle, dimension, or composite metric. Apply these resolution rules:

- **Per-principle disagreement (agent 01 table vs `02-pN` H1).** Per-principle file scores are authoritative (mirroring agent 06's rule at `prompts/prompt-06-strengths-gaps.md` rule 10). Use the `02-pN` H1 score in Part 1's table and in the merged document's per-principle H3 headings. Surface the divergence in Source Integrity with both values.

- **Composite arithmetic disagreement.** If agent 01's header `**Overall Score:** <X.X>/100` differs from the computed `Σ(score × decimal_weight)` derived from Part 1's table, report BOTH values in the Source Integrity section as an arithmetic inconsistency. Use the computed value as the authoritative score in the merged document's metadata block. Round to one decimal place.

- **Loop / DoD / Maturity disagreement.** Surface in Source Integrity. Do not arbitrate. The agent that owns that dimension is the authoritative source: agent 03 owns Loop-phase and DoD-condition scores; agent 05a owns the Maturity Verdict (surfaced in the combined `_review_05_maturity_industry.md` by agent 05b). Use the owner's value in the merged document.

---

## Inputs to Read

Read all of the following end-to-end before composing a single line of the merged document:

1. All 19 source files listed in Preflight Step 1 (Preflight Step 1 reads only the first and last 5 lines of each; this step reads each file end-to-end).
2. `[[DOMAIN_FILE]]` — the industry domain file for `[[INDUSTRY]]` context.
3. `[[PRIOR_REVIEWS]]` (if not `none`) — for peer-framework comparison material.
4. The manifesto's own source artefacts: at minimum the `manifesto-principles` source group, `manifesto/manifesto.md` (Agentic Loop phase definitions, loop-readiness gate), `manifesto/manifesto-done.md` (Agentic DoD conditions, Hardening DoD, agentic provenance record, evidence freshness rules), `companion/frameworks.md` (per-phase failure modes), and the `companion/principles` source group. Read the current files; do not rely on memory.
5. `[[FRAMEWORK]]`'s own source artefacts — any framework files not already read during Waves 1a/1b/2.
6. `glossary.md` — to enforce the Glossary scope discipline (see §Appendices).
7. **Where Wave 1 sources cite cross-stack files** in `governance/`, `integration/`, `regulatory/`, or `operational-templates/`, the merge agent does NOT re-derive content — Wave 1 has already extracted the AEM-relevant material. Read those cross-stack files only when needed to verify a Wave 1 citation is accurate, and only the AEM-relevant section.

---

## Methodology

### Compose; do not concatenate

The merged review is an editorial integration, not a concatenation of source files. Apply these rules strictly:

- **Deduplicate headers, methodology sections, and definitions.** Each source file opens with its own context-setting material. The merged document has exactly one instance of each canonical section.
- **The merged document MUST NOT contain any of the following lifted from source files:**
  - Source-file metadata blocks (`**Framework:**`, `**Version:**`, `**Review date:**`, `**Methodology:**`, `**Source artefacts read:**`, `**Reviewer:**`, `**Reviewer methodology:**`, `**Context:**`, `**Client context:**`, `**Regulatory overlay:**`, `**Reviewer date:**`, `**Sources reviewed:**`, `**Industry:**`).
  - Per-agent "Inputs to Read" sections.
  - Per-agent "Methodology" sections (agent 04c's `## Methodology` in `_review_04_adoption_companion.md` is internal to that file — fold its substance into Part 2 if not already covered).
  - Per-source-file `# H1` titles (e.g., `# [[FRAMEWORK]] Review 03 — ...`).
  - Per-source-file footers (e.g., `*Review conducted by Agent N*`, `*Assessment prepared YYYY-MM-DD ...*`).
  - Any HTML comment "Gap Inventory" blocks or other internal scratchpad markers from agents 04a/04b/04c.
  - The literal P3 Part 12 cross-reference placeholder (see "P3 cross-reference resolution" below).
- **Heading-level harmonisation.** Any heading-level H1 from a source file becomes H2 in the merged document; H2 becomes H3; H3 becomes H4; H4 becomes H5. Apply consistently. Specifically: per-principle file H1 (`# P{N} — name | **{score}/100**`) becomes `### P{N} — name | **{score}/100**` under `## Part 3`. Principle-specific test sections (`## Seven-Condition DoD Test`, `## Blast-Radius Test`, etc.) become `####`.
- **Resolve all cross-references to canonical part numbers.** Where a source file says "see the strengths section" or "as noted above," replace with the canonical part number (e.g., "see Part 10"). Never use file names, agent numbers, or source-file section headings as cross-references in the merged document.
- **Preserve analytical substance.** Deduplication MUST NOT silently discard a finding, evidence citation, or remediation item that appears in only one source file. If a finding is unique to one source, it belongs in the merged document.
- **Preserve quotes and artefact citations verbatim.** Where a source file quotes from `[[FRAMEWORK]]`'s own documentation, reproduce the quote exactly.

### P3 cross-reference placeholder resolution

Scan the 12 principle files for the placeholder `*[Part 12 cross-reference …]*` (the literal string emitted by `prompts/prompt-02-principle.md` when `[[PRINCIPLE_NUMBER]]` is 3, character-for-character: `> *[Part 12 cross-reference — see Part 12 guardrails assessment; resolved at merge time]*`). Resolve each occurrence to the canonical part-number citation: "see Part 12, §12.{N}" where `{N}` is the specific subsection of Part 12 that addresses the blast-radius implication. If the specific subsection is not determinable from context, use "see Part 12." Do not leave any placeholder in the merged output.

### Preserve scores verbatim (operationalised)

- Wave 1 scores are authoritative. Agent 09 is an editorial integrator, not a scorer.
- Use the same rounding convention as the source — one decimal place — and verify the metadata `Overall score` against the Part 1 table sum.
- Do not relabel any severity (e.g., Critical → High) without surfacing the change in Source Integrity. The merged document preserves Wave 1 severity labels verbatim.
- Every numeric score in the merged document MUST trace verbatim to a specific Wave 1 source file. Every regulatory citation MUST trace to a specific Wave 1 source file (or to the canonical regulatory citations in `[[DOMAIN_FILE]]`). Do not introduce findings, scores, severity labels, regulations, or strengths that do not appear in any Wave 1 source.

### Lead with executive verdict

The first substantive section after the Framing Warning (`## Executive Verdict`) MUST be self-contained — a reader reading only the Executive Verdict sees severity, score, maturity, top strengths, top gaps, Red Line, and recommended next move without consulting any Part. Length: approximately 1–2 pages (≤ 800 words).

The Executive Verdict MUST contain, in this order:

(a) **Overall composite score and severity label.** Use the recomputed composite from Preflight Step 3 and the canonical severity thresholds from `prompt.md`. Cite Part 1.

(b) **Maturity phase verdict and the specific evidence driving that placement.** Take the phase number verbatim from the `**Maturity Verdict: Phase {N}**` line in `_review_05_maturity_industry.md` (authored by agent 05a, surfaced by agent 05b). Cite Part 8.

(c) **Top 3 genuine strengths.** Take verbatim short forms of the first three numbered strengths in agent 06's Part 10 (`_review_06_strengths_gaps.md`). State which numbers (e.g., "Strength 1, Strength 2, Strength 3"). Each in one sentence. Do not invent new items or reorder.

(d) **Top 3 gaps.** Take the three highest-severity gaps from agent 06's Part 11. Order: Critical first, then High, then by roadmap order within the same severity. State which Gap numbers, reproduce severity labels verbatim. Each in one sentence.

(e) **The Red Line.** Take verbatim from agent 05b's Part 9 "The Red Line" subsection in `_review_05_maturity_industry.md`. Do not paraphrase.

(f) **The highest-leverage single change.** Take verbatim from agent 04c's "Cross-Document Synthesis → Highest-Leverage Single Change" subsection in `_review_04_adoption_companion.md`. Do not paraphrase. If the highest-leverage-change finding in Executive Verdict differs from agent 04c's wording, surface the discrepancy in Source Integrity.

### Flow through Parts 1–13 in canonical order

Populate every part. Do not omit or reorder parts. If a source file contains material that spans multiple parts, split it correctly.

### Closing sections

After Part 13, write two closing sections:

- `## Prioritised Remediation Roadmap` — drawn from `_review_06_strengths_gaps.md`. Preserve effort labels (S/M/L/XL) and priority ordering verbatim. Do not re-rank. Each row cites the specific Gap N entry in Part 11. The roadmap row count equals the number of gaps in Part 11. Effort labels in the Roadmap match effort labels in the corresponding gap detail.
- `## [[ORGANIZATION]] Deployment Recommendation` — synthesise from `_review_05_maturity_industry.md` (Part 9 Deployment Path) and `_review_06_strengths_gaps.md` (Roadmap Interpretation). State clearly: the recommended deployment posture for `[[ORGANIZATION]]`, the conditions that must be met before full deployment, the regulatory constraints from `[[INDUSTRY]]` that are non-negotiable. The Deployment Recommendation MUST NOT contradict the Red Line in Part 9 or the Executive Verdict.

### Appendices

Populate all five appendices. Do not omit or merge appendices.

---

## Output Specification

**Output file:** `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_manifesto_alignment_review_merged.md`

### Idempotence

If the output file already exists: check whether any of the 19 source files has a modification timestamp newer than the existing merged file. If yes, regenerate from scratch. If no, output `Merged review is up to date — no regeneration needed` and stop. The Source Integrity section MUST be regenerated on every regeneration.

### Required document structure

```
# [[FRAMEWORK]] — Agentic Engineering Manifesto Alignment Review (Merged)

---
Framework:           [[FRAMEWORK]]
Version:             [[FRAMEWORK_VERSION]]
Review date:         YYYY-MM-DD
Manifesto:           arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]
Reviewer methodology: Multi-agent swarm review — 13 specialised agent roles (01; 02-p1..02-p12; 03; 04a; 04b; 04c; 05a; 05b; 06; 07; 08a; 08b; 09) producing 19 source files across Wave 1a / 1b / 2 / 3 execution
Context:             [[INDUSTRY]]
Client:              [[ORGANIZATION]]
Sources (19 files):  <list all 19 source file paths — exactly 19 entries>
Overall score:       <X.X / 100, computed via Σ(score × weight) from Part 1>
Maturity level:      <Phase N — Label, taken from the Maturity Verdict in `_review_05_maturity_industry.md` (authored by agent 05a, surfaced by agent 05b)>
Severity:            <Critical | High | Medium | Low, per canonical thresholds>
---

## Framing Warning

## Executive Verdict

## Source Integrity

## Part 1 — Overall Scores

## Part 2 — Scoring Methodology

## Part 3 — Manifesto Principles

### P1 — <Principle name verbatim from prompt.md weighting table>
### P2 — <Principle name>
### P3 — <Principle name>
### P4 — <Principle name>
### P5 — <Principle name>
### P6 — <Principle name>
### P7 — <Principle name>
### P8 — <Principle name>
### P9 — <Principle name>
### P10 — <Principle name>
### P11 — <Principle name>
### P12 — <Principle name>

## Part 4 — Agentic Loop Phase Analysis

## Part 5 — Agentic Definition of Done

## Part 6 — Adoption Document Alignment

## Part 7 — Companion Framework Alignment

## Cross-Document Synthesis

## Part 8 — Maturity Phase Placement

## Part 9 — [[INDUSTRY]] Assessment ([[ORGANIZATION]])

## Part 10 — Genuine Strengths

## Part 11 — Gap Analysis: Path to Next Phase

## Part 12 — AI/Runtime Guardrails Assessment

## Part 13 — Security Assessment

## Part 14 — Enterprise Guardrail Domain Coverage

## Prioritised Remediation Roadmap

## [[ORGANIZATION]] Deployment Recommendation

## Appendices

### A. Adversarial Scenario

### B. Security Coverage Map

### C. Evidence Matrix

### D. Peer-Framework Comparison

### E. Glossary
```

### Section-by-section source mapping

| Section | Primary source | Notes |
| --- | --- | --- |
| Framing Warning | `_review_01_quick_overview.md` "## Framing Warning" (4 sub-sections: What `[[FRAMEWORK]]` is / scope covered / out of scope / score interpretation warning) | Place after the metadata block, before Executive Verdict. Lift verbatim with heading-level harmonisation. |
| Executive Verdict | Synthesise across all sources per `Methodology → Lead with executive verdict` | Self-contained; ≤ 800 words; verbatim short forms only. |
| Source Integrity | Preflight Step 2 findings | Use the fixed entry schema. End with `Integrity status: N issues detected (M Critical, K High, ...)` or `Integrity status: clean.` |
| Part 1 — Overall Scores | `_review_01_quick_overview.md` Part 1 (Manifesto Principles Table, Loop Phases Table, DoD Table, Maturity Phase Verdict) | Deduplicate; preserve scores verbatim; use authoritative resolution from Preflight Step 3. |
| Part 2 — Scoring Methodology | `_review_01_quick_overview.md` Part 2 | Single instance; no duplication; agent 04c's `## Methodology` and agent 03's metadata methodology fold here if substantive. |
| Part 3 — Principles P1–P12 | `_review_02_principle_p{N}.md` ×12 | Each `### P{N}` subsection: preserve `## What [[FRAMEWORK]] asserts about this principle`, `## What works`, `## Where it fails the manifesto's bar`, `## [[ORGANIZATION]]-specific implications`, `## Score rationale`. Preserve all H3/H4 heading text exactly; preserve all bullets; do not merge or summarise bullets. Preserve every principle-specific test subsection: P1 `## Seven-Condition DoD Test`; P3 `## Blast-Radius Test`; P5 `## Tier Assessment`; P8 `## Seven-Condition DoD Test (Evaluation Edition)`; P9 `## Does [[FRAMEWORK]]'s observability cover reasoning or only execution?`; P12 `## Structured Recovery Test`. Strip per-file H1 and any metadata headers. Resolve P3 cross-reference placeholder. |
| Part 4 — Agentic Loop Phase Analysis | `_review_03_loop_dod.md` Part 4 | Split loop analysis from DoD. Preserve all 9 per-phase H3 headings (`### {Phase} | **{score}/100**`) with the three labelled paragraphs (`**What [[FRAMEWORK]] does.**`, `**What the manifesto requires.**`, `**The gap.**`). Preserve `### Cross-Phase Failure Modes` (≥5 items) and `### Human Escalation Architecture` (4 sub-paragraphs). |
| Part 5 — Agentic Definition of Done | `_review_03_loop_dod.md` Part 5 | Split DoD from loop analysis. Preserve `#### DoD Condition Table` (4 columns × 7 rows), per-condition narratives, `#### DoD Hardening Test` (with literal closing sentence "Hardening is complete." or "Hardening is not complete."), `#### Industry-Specific DoD Requirements`. |
| Part 6 — Adoption Document Alignment | `_review_04_adoption_companion.md` Part 6 (written by agent 04c, which lifts Part 6 content verbatim from agent 04a's output) | Preserve all 7 adoption subsections with their alignment grades (Well-aligned / Partially aligned / Misaligned). |
| Part 7 — Companion Framework Alignment | `_review_04_adoption_companion.md` Part 7 (written by agent 04c, which lifts Part 7 content verbatim from agent 04b's output) | Preserve all 6 companion subsections with alignment grades and contradiction labels. |
| Cross-Document Synthesis | `_review_04_adoption_companion.md` `## Cross-Document Synthesis` (generated by agent 04c from the gap inventory blocks of agents 04a and 04b) | Place between Part 7 and Part 8. Preserve `### Realistic Adoption Ceiling at [[ORGANIZATION]]` and `### Highest-Leverage Single Change` subsections. Highest-Leverage Single Change MUST agree verbatim with the Executive Verdict's item (f); flag any discrepancy in Source Integrity. |
| Part 8 — Maturity Phase Placement | `_review_05_maturity_industry.md` Part 8 (written by agent 05b, which lifts Part 8 content verbatim from agent 05a's output) | Preserve `### The Verdict` (with `**Maturity Verdict: Phase {N}**` line), `### Evidence Matrix`, `### Phase Gate Non-Negotiables` (table form with `Gate \| Required to reach Phase {N+1} \| [[FRAMEWORK]] status \| Severity` columns), `### Comparison with Peer Frameworks`, `### Economics Assessment`. |
| Part 9 — `[[INDUSTRY]]` Assessment (`[[ORGANIZATION]]`) | `_review_05_maturity_industry.md` Part 9 (written by agent 05b) | Preserve `### The Regulatory Exposure Map`, `### Use-Case Fitness Analysis`, `### The Red Line`, `### The Deployment Path`. |

**Note:** `_review_04_adoption_companion.md` is written by agent 04c after it reads agents 04a+04b outputs. `_review_05_maturity_industry.md` is written by agent 05b after it reads agent 05a's output. The intermediate files `_review_04a_adoption.md`, `_review_04b_companion.md`, and `_review_05a_maturity.md` are NOT direct inputs to agent 09.
| Part 10 — Genuine Strengths | `_review_06_strengths_gaps.md` Part 10 | Preserve all 6–10 numbered strengths with fairness notes verbatim. |
| Part 11 — Gap Analysis | `_review_06_strengths_gaps.md` Part 11 | Preserve all gaps (each with severity, principle mapping, "What is missing", "Why it matters in `[[INDUSTRY]]`", "What closes it", "Evidence anchor", "Effort"). Preserve roadmap order. Do NOT duplicate the Roadmap inside Part 11; the Roadmap is its own closing section. |
| Part 12 — AI/Runtime Guardrails Assessment | `_review_07_guardrails_security_appendix.md` Part 12 | Preserve all 5 sub-sections (12.1 Input Guardrails, 12.2 Output Guardrails, 12.3 Behavioural Guardrails, 12.4 Guardrail Architecture Assessment, 12.5 Adversarial Scenario). |
| Part 13 — Security Assessment | `_review_07_guardrails_security_appendix.md` Part 13 | Preserve all 5 sub-sections (13.1 Determinism and Output Variance, 13.2 Security Coverage Map with all 11 control families, 13.3 Bias and Fairness Exposure, 13.4 Regulatory Security Requirements, 13.5 Critical Security Findings). |
| Part 14 — Enterprise Guardrail Domain Coverage | `_review_08_enterprise_guardrails.md` (canonical file written by agent 08b, which lifts §14.1–§14.15 verbatim from agent 08a's intermediate `_review_08a_domains.md`) | Preserve all 19 sub-sections at H3 depth (14.1–14.15 the 15 domains; 14.16 Cross-cutting matrix with importance + `[[FRAMEWORK]]` coverage matrices and Critical/High gaps; 14.17 Twelve Non-Negotiable Guardrails table with N/12 coverage; 14.18 Agent Card / Task Card schema verification with Schema Coverage Score; 14.19 Enterprise Guardrail Maturity Verdict). Preserve the `**Enterprise Guardrail Maturity: <LACKING / PARTIAL / ADEQUATE / MATURE>**` verdict line verbatim. Do NOT re-score P1–P12; Part 14's overlapping findings cite principles by number. Do NOT duplicate Part 12 or Part 13 content; cross-references stand. The intermediate `_review_08a_domains.md` is NOT a direct input to agent 09 — it is consumed by agent 08b. |
| Prioritised Remediation Roadmap | `_review_06_strengths_gaps.md` `## Prioritised Remediation Roadmap` | Preserve effort labels and priority order. Each row cites the Gap N entry in Part 11. Roadmap row count equals Part 11 gap count. Do not re-rank. |
| `[[ORGANIZATION]]` Deployment Recommendation | `_review_05_maturity_industry.md` Part 9 Deployment Path + `_review_06_strengths_gaps.md` Roadmap Interpretation | Synthesise; include regulatory constraints; do not contradict the Red Line. |
| Appendix A — Adversarial Scenario | `_review_07_guardrails_security_appendix.md` §12.5 | Reproduce the full red-team walk-through verbatim. Do not summarise. |
| Appendix B — Security Coverage Map | `_review_07_guardrails_security_appendix.md` §13.2 | Preserve all 11 control-family rows verbatim. |
| Appendix C — Evidence Matrix | `_review_05_maturity_industry.md` Part 8 Evidence Matrix | Reference Part 8; do not duplicate the table — extract once and cross-reference if needed. |
| Appendix D — Peer-Framework Comparison | `_review_05_maturity_industry.md` `### Comparison with Peer Frameworks` + `[[PRIOR_REVIEWS]]` if any | If `[[PRIOR_REVIEWS]]` is `none`, state explicitly "No prior reviews available; peer comparison limited to the spectrum table in `companion/frameworks.md` (reproduced from agent 05b's Comparison with Peer Frameworks, lifted from agent 05a)." Do not fabricate peer data. |
| Appendix E — Glossary | All sources | `[[FRAMEWORK]]`-specific terms only — module names, command names, configuration keys, framework-internal concepts. NOT general AI/ML/agentic terms defined in `glossary.md` (autonomy tiers, Loop phase names, DoD conditions, maturity phase names, principle names, severity labels, effort labels, manifesto vocabulary). Alphabetical, British English, one-line definition each, with citation to the source artefact in `[[FRAMEWORK]]` where the term is defined. |

---

## Hard Rules

- Read all 19 source files end-to-end before composing a single line of the merged document.
- Do not re-score. Wave 1 scores are authoritative. Agent 09 is an editorial integrator, not a scorer.
- Surface every score inconsistency in `## Source Integrity` using the fixed entry schema. Do not silently correct (except composite arithmetic per Preflight Step 3).
- Use date format **YYYY-MM-DD** wherever a date appears.
- Cross-references within the merged document use canonical part numbers only (e.g., "see Part 12"). Never use source file names, agent numbers, or Wave designations in cross-references.
- Industry context (`[[INDUSTRY]]`) is not decoration. Every major finding in the merged document MUST be connected to a specific regulation or risk type applicable to `[[ORGANIZATION]]`. Every regulation citation MUST trace to a Wave 1 source file or to `[[DOMAIN_FILE]]`.
- British English throughout. No American spellings.
- Use the canonical severity thresholds and effort labels defined in `prompt.md`. Do not restate the tables.
- Do not introduce findings, scores, severity labels, regulations, or strengths that do not appear in any Wave 1 source. The merge is editorial synthesis; new analytical claims are not permitted.
- Do not relabel severity (Critical → High, etc.) without surfacing the change in Source Integrity.
- **Out-of-scope corpus / tracked-files-only.** Every source file referenced in the merged document MUST be tracked by git on the current branch. No references to `asdlc/`, `aplc/`, `agentic-sdlc-handbook/`, `intelligence-governance-manifesto/`, `agentic-enterprise-manifesto/`, `agentic-enterprise.md`, `agentic-enterprise.html`, `agentic-governance-stack.md`, `agentic-governance-stack.html`, `manifesto/manifesto-evolution-plan.md`, `manifesto-evolution-plan.html`, `phase-assessment-checklist.md`, `phase-assessment-checklist.html`, `asdlc-plan*`, `aplc-plan*`, or `igm-aent-coherence-review*` anywhere in the merged document. The output file MUST contain zero matches for the tokens `ASDLC`, `APLC`, `IGM`, `AEnt-M`, `AEnt_M`, `intelligence-governance-manifesto`, `agentic-enterprise-manifesto`, `agentic-enterprise`, `agentic-governance-stack`, `manifesto-evolution-plan`, `phase-assessment-checklist`, `asdlc`, `aplc`, `agentic-sdlc-handbook`, `asdlc-plan`, `aplc-plan`, or `igm-aent-coherence-review`. Forward-propagation prohibition extends to `[[DOMAIN_FILE]]` and to any cross-stack file in `governance/`, `integration/`, `regulatory/`, or `operational-templates/` that the Wave 1 sources cited: do not embed full passages from those files, do not derive IGM/AEnt-M/ASDLC/APLC roadmaps, and do not invent domain bridges that are not present in `[[DOMAIN_FILE]]`. **If any Wave 1 source contains an out-of-scope-corpus token, surface it in `## Source Integrity` as an integrity warning and STOP — do not silently scrub it from lifted material; the upstream agent should have caught it.** **Narrow exception:** a Wave 1 source's permitted self-referential quote of `manifesto/manifesto-done.md`'s Loop-Complete/handoff boundary language (which names ASDLC as AEM's own stated downstream boundary — see `prompt.md`'s Out-of-scope-corpus exception) is not an integrity warning and should be lifted as-is.
- Do not praise `[[FRAMEWORK]]` for things it does not demonstrably do. Do not penalise it for problems outside its stated scope — but note scope gaps explicitly.

---

## Self-Check (HARD GATE before saving the output file)

**Do not save the output file until every item below is confirmed.** Each item is binary yes/no. If any item fails, fix the file content and re-verify before saving.

- [ ] All 19 source files confirmed valid by Preflight Step 1 (≥ 20 lines each, non-empty first/last 5 lines).
- [ ] All 8 score-integrity cross-checks completed; results recorded verbatim in `## Source Integrity` with the fixed entry schema.
- [ ] Composite arithmetic recomputed; metadata `Overall score` equals `Σ(score × decimal_weight)` from Part 1's table, rounded to one decimal place.
- [ ] Framing Warning section (4 sub-sections) is present between metadata and Executive Verdict.
- [ ] All 14 canonical parts present and in order; Cross-Document Synthesis present between Part 7 and Part 8; Part 14 (Enterprise Guardrail Domain Coverage) present after Part 13 and before the Prioritised Remediation Roadmap. Part 14 contains all 19 sub-sections (§14.1–§14.15, §14.16 cross-cutting matrix, §14.17 twelve non-negotiables, §14.18 schema verification, §14.19 maturity verdict).
- [ ] Part 14 does NOT introduce any re-score of P1–P12 or restate the composite. Overlap with Part 12/Part 13 is by cross-reference, not duplication.
- [ ] Part 14 §14.19 contains a verbatim `**Enterprise Guardrail Maturity: <LACKING | PARTIAL | ADEQUATE | MATURE>**` line lifted from `_review_08_enterprise_guardrails.md`.
- [ ] `## Executive Verdict` is self-contained, ≤ 800 words, and includes (a) overall score and severity label, (b) maturity phase, (c) top-3 strengths from agent 06 Part 10, (d) top-3 highest-severity gaps from agent 06 Part 11, (e) The Red Line verbatim from agent 05b Part 9, (f) highest-leverage single change verbatim from agent 04c Cross-Document Synthesis.
- [ ] Executive Verdict's Red Line equals Part 9's Red Line verbatim.
- [ ] Executive Verdict's highest-leverage single change equals agent 04c's Cross-Document Synthesis verbatim; any drift is logged in Source Integrity.
- [ ] All P3 cross-reference placeholders (`*[Part 12 cross-reference …]*`) resolved to canonical "see Part 12, §12.{N}" or "see Part 12" citations.
- [ ] Per-principle test sections preserved: P1 `Seven-Condition DoD Test`, P3 `Blast-Radius Test`, P5 `Tier Assessment`, P8 `Seven-Condition DoD Test (Evaluation Edition)`, P9 `Does [[FRAMEWORK]]'s observability cover reasoning or only execution?`, P12 `Structured Recovery Test`.
- [ ] `## Prioritised Remediation Roadmap` row count equals the number of gaps in Part 11. Each row cites the specific Gap N entry. Effort labels match the gap detail.
- [ ] `## [[ORGANIZATION]] Deployment Recommendation` synthesises from agents 05 and 06 and addresses `[[INDUSTRY]]` regulatory constraints; does not contradict the Red Line.
- [ ] All five appendices (A–E) populated. Appendix A reproduces agent 07 §12.5 verbatim. Appendix B preserves all 11 control-family rows. Appendix D handles the `[[PRIOR_REVIEWS]] = none` case explicitly if applicable.
- [ ] Glossary (Appendix E) contains only `[[FRAMEWORK]]`-specific terms (module names, command names, configuration keys, framework-internal concepts). Contains zero entries for manifesto vocabulary defined in `glossary.md` (autonomy tiers, Loop phase names, DoD conditions, maturity phase names, principle names, severity labels, effort labels). Alphabetical, British English.
- [ ] Cross-references use canonical part numbers only — zero matches for source-file names (e.g., `_review_03_loop_dod.md`), agent numbers (e.g., `agent 06`), or Wave designations.
- [ ] Output file contains zero matches for `ASDLC`, `APLC`, `IGM`, `AEnt-M`, `AEnt_M`, `intelligence-governance-manifesto`, `agentic-enterprise-manifesto`, `agentic-enterprise`, `agentic-governance-stack`, `manifesto-evolution-plan`, `phase-assessment-checklist`, `asdlc`, `aplc`, `agentic-sdlc-handbook`, `asdlc-plan`, `aplc-plan`, or `igm-aent-coherence-review`, other than the permitted self-referential quote of `manifesto-done.md`'s own Loop-Complete/handoff boundary language. Every source file referenced in the merged document is tracked by git on the current branch.
- [ ] Output file contains zero matches for the banned soft-language tokens `consider`, `may`, `could potentially`, `perhaps`, `use judgement`.
- [ ] Output file contains zero remaining `[[...]]` placeholders.
- [ ] Output file contains no source-file metadata blocks, per-agent "Inputs to Read" sections, per-agent "Methodology" sections, or per-source-file H1 titles or footers.
- [ ] All dates in YYYY-MM-DD format. No `MM/DD/YYYY` or `DD/MM/YYYY` matches.
- [ ] British English throughout (organisation, behaviour, optimise, defence, prioritise, modelling, licence, programme — not the American forms).
- [ ] Front-matter `Sources (19 files):` block lists exactly 19 paths.
- [ ] Output line count is between 1,800 and 3,500 lines (a result outside this range is evidence of either concatenation or skeletonisation; investigate before saving). The expanded upper bound accommodates Part 14 (15 domain sub-sections + cross-cutting matrix + 12 non-negotiables + schema tables).
