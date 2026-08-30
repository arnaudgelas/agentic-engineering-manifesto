# Sub-prompt 09 — Merge

**Purpose:** Produce `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_manifesto_alignment_review_merged.md` — a single, coherent master review of **[[FRAMEWORK]]** against the Agentic Engineering Manifesto, integrating all 27 canonical source files (Wave 1a + Wave 1b + Wave 2) into canonical Parts 1–14 plus closing sections and appendices.

**Placeholder reminder:** Before doing any work, scan this prompt for any remaining `[[...]]` patterns. If any placeholder is unsubstituted (e.g., the literal text `[[FRAMEWORK]]` still appears in your working copy), stop immediately and report which variables are unset.

**Wave 3 preflight reminder:** This agent runs in Wave 3. All 27 canonical source files from Waves 1a, 1b, and 2 must exist and be non-empty before any merging begins. Verify this before proceeding (see Preflight Check below).

**Canonical references:** Score weighting, severity thresholds, and effort sizing are provided in the Universal Prepend Block the orchestrator prepends to this prompt at spawn time (see `prompt.md`'s Universal Prepend Block). Use them for arithmetic and severity checks; do NOT re-quote the full tables inside the merged output document itself — reference them by name there (e.g., "the canonical severity thresholds").

---

## Preflight Check

### Step 1 — Verify all 27 source files pass the completion check

For each of the 27 source files listed below under `[[FRAMEWORK_LOWER]]/`, run `tail -n 2 <file> | grep -q '<!-- SELF-CHECK: PASSED -->'`. A file that fails this check is invalid, whatever its length. Output ONLY a report of all invalid files and STOP; do not write the merged output. Do not substitute a line-count or non-emptiness test — a file can be long, well-formed and still be the wreckage of an agent that died before its self-check ran.

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
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03a_loop_upstream.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03b_loop_build.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03c_loop_runtime.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03d_loop_integrity.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03e_dod.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04a_adoption.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04b_companion.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04c_synthesis.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_05a_maturity.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_05b_industry.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_06_strengths_gaps.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_07_guardrails_security_appendix.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_08a_domains.md
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_08b_enterprise_synthesis.md
```

**If any file is missing or fails the completion check: stop immediately. Report each invalid file by path. Do not produce a partial or incomplete merge. Do not proceed until all 27 files are confirmed valid.**

### Step 2 — Score-integrity cross-checks (mandatory; report-don't-fix)

After confirming file validity, perform the following cross-checks. `## Source Integrity` carries **two** subsections and every finding goes in exactly one of them:

- `### Integrity warnings` — genuine defects: a score that does not follow from its own rubric verdicts, arithmetic that does not reproduce, a maturity-versus-DoD inconsistency, a missing or malformed required field.

Record each entry verbatim in the relevant subsection of `## Source Integrity` in the merged document, using this fixed entry schema:

```
- {Dimension}: source A reports X, source B reports Y. Discrepancy ΔZ. Source A path / Source B path.
```

Cross-checks:


2. **Per-principle H1 vs Score-rationale check.** For each principle N: extract the integer from the H1 line of `_review_02_principle_p{N}.md` and the integer from its `## Score rationale` paragraph (`Score: **NN/100**`). Quote both verbatim. They MUST match (each `02-pN` agent enforces this internally before saving its file; verify before lifting).

2a. **Principle rubric-consistency check.** For each principle N: extract the final integer from the `**Score derivation.**` paragraph in `_review_02_principle_p{N}.md`'s `## Score rationale` and confirm it equals the H1 score. Also confirm it lies inside the **effective** band. Derive that band the way the prompt does — **do not count raw Met verdicts**: read `K` (applicable criteria, 5 minus any `N/A` on E4/E5), `M` (fully Met among them) and `E = round(5 × M / K)` from the derivation, recompute `E` yourself, and map `E` to a band (5 → 80–100; 4 → 60–79; 3 → 40–59; 2 → 20–39; 0–1 → 0–19). A principle with `K = 3` and `M = 3` yields `E = 5` and a legitimate 80–100 score; scoring it against the raw Met count would produce a false warning. Then intersect with `0–{cap}` for every stated override, or `0–{cap}` alone where that intersection is empty. Report a mismatch as an integrity warning; do not fix the score.


3a. **Loop-phase rubric-consistency check.** For each of the 9 phases: extract the final integer stated in that phase's `**Score derivation.**` paragraph and confirm it equals the integer in the phase heading. Also confirm the integer lies inside the **effective** band — the band the paragraph's own C1–C5 verdict count produces (5 Met → 80–100; 4 → 60–79; 3 → 40–59; 2 → 20–39; 0–1 → 0–19) intersected with `0–{cap}` for any stated override, or `0–{cap}` alone where that intersection is empty. Report a mismatch as an integrity warning; do not fix the score.

3b. **Loop Integrity Score check.** Extract the `**Loop Integrity Score:** <N>/100` line from `_review_03d_loop_integrity.md`'s metadata block and the integer computed in its §3.11.7 arithmetic block. They MUST match. This score has no second estimate and is not reconciled against any other file. It does NOT enter the weighted composite.

4. **DoD condition score population (not a comparison).** Agent 01 emits `—` in every Score cell of its Agentic Definition of Done Table by design: it runs in Wave 1a without the maturity phase and cannot apply the phase-calibrated bar or the §2.2 Gate 1 applicability gate. Populate Part 1's DoD Score column from `_review_03e_dod.md` §4.1 — an integer for an applicable condition, the literal `N/A` for an inapplicable one. Then confirm each §4.1 row's score equals that condition's `#### {Condition} | **{score}/100**` heading in §4.2 (or `**N/A**` for an `N/A` condition). Quote both verbatim. They MUST match. Record an integrity warning if agent 01 emitted an integer where `—` was required.

4a. **DoD rubric-consistency check.** For each of the 8 conditions (skip any recorded `N/A`): confirm the final integer in the condition's `**Score derivation.**` paragraph equals its heading score and lies inside the **effective** band — the band its own D1–D4 verdict count produces (4 Met → 80–100; 3 → 60–79; 2 → 40–59; 1 → 20–39; 0 → 0–19) intersected with `0–{cap}` for any stated override, or `0–{cap}` alone where that intersection is empty. Report a mismatch as an integrity warning; do not fix the score.

4b. **Loop-integrity count check.** In `_review_03d_loop_integrity.md`, confirm that each numerator used in the §3.11.7 arithmetic equals `(full verdicts) + 0.5 × (partial verdicts)` counted from its source table (§3.11.1: `Intact` full, `Partial` half; §3.11.2: `Implemented` full, `Partial` half; §3.11.3: `Met` full, `Partially met` half; §3.11.4: `Produced` full, `Partially produced` half — use each table's own verdict vocabulary, which differs between sections). Also confirm the iteration factor used in the arithmetic matches the `**Iteration verdict:**` line in §3.11.6 (Pass → 1.0, Partial → 0.5, Fail → 0.0), and that the five weighted terms sum to the stated score. Report any mismatch as an integrity warning.

4c. **Maturity-versus-DoD consistency check.** Agent 05a sets the phase; agent 03e scores the DoD *against that phase's own bar*. Nothing re-validates the phase afterwards, so a review can publish a phase verdict beside evidence that the framework fails that phase's own expectations. Because 03e is phase-calibrated, a Critical score already means "fails the bar for the phase it was placed at" — a low phase does not excuse it. Trigger on either: (a) **one or more applicable DoD conditions score Critical (≤ 39) against the stated phase bar** — one is enough, because the score is already calibrated to that phase and a Critical there means the framework fails its own phase's expectation — or (b) **a DoD condition scores Critical that agent 05a's evidence matrix cites as a met gate for the claimed phase**, which is a direct contradiction of 05a's own evidence. Record a `**Maturity-versus-DoD inconsistency**` entry in `## Source Integrity` under `### Integrity warnings`, naming the phase, the failing conditions with scores, and for (b) the 05a gate row it contradicts.

**Do not trigger on the Hardening Assessment.** §4.3's hardening steps (bundle integrity attestation, agentic provenance record, security static analysis) are `manifesto-done.md`'s *Hardening DoD additions* — Phase 5/6 machinery. `Hardening is not complete.` is the expected and correct result for a low-phase framework and says nothing about whether the phase verdict is right.

**Do not arbitrate** — do not lower the Maturity Verdict and do not raise any DoD score. Agent 09 is an editorial merge with no evidence base of its own; re-deriving a phase here would mean inventing a verdict no agent produced, which is exactly what the score-preservation rules forbid. The remedy for a contested phase is re-running 05a and 03e, not silently rewriting either. What merge owes the reader is that the contradiction is impossible to miss — hence the metadata qualifier and the Executive Verdict sentence above. Surface both and let the reader judge, consistent with every other disagreement in this section.

5. **Maturity verdict check.** Extract the phase number from agent 05b's `**Maturity Verdict: Phase {N}**` line in `_review_05b_industry.md` Part 8 and the phase number from agent 05a's verdict in `_review_05a_maturity.md`. Quote both verbatim. They MUST name the same phase — 05b lifts 05a's verdict and may not restate it. Agent 01 emits no phase, so there is no third estimate.

6. **Composite arithmetic check.** Compute `Σ(score × decimal_weight)` from the twelve `_review_02_principle_p{N}.md` H1 scores using the canonical weighting from `prompt.md`, rounding the sum once at the end. That value IS the composite — no other file states one to compare against. Write the full term-by-term derivation into Part 1 so a reader can recheck it.

7. **Severity-threshold check (scored dimensions only) — run on the *authoritative* scores, after substitution.** Severity is a function of the score, so substituting a deep-file score **obsoletes** agent 01's severity label for that row. This check covers **only** dimensions that carry a 0–100 score. For every principle row in Part 1, every per-principle H1, every loop-phase heading, every DoD condition, and the overall composite: **recompute** the severity label from the authoritative score using the canonical thresholds in `prompt.md`, and write the recomputed label. Agent 01's label is an input to nothing. Worked failure this prevents: agent 01 estimates 61 (Medium), the `02-pN` file is authoritative at 59 (High); carrying the label forward publishes `59 / Medium`, which is wrong and which every other check passes. Record in `### Estimate differences` any row whose recomputed label differs from agent 01's; that is expected, not a defect. Flag as an **integrity warning** only a *deep file* whose own stated severity disagrees with its own score.

7b. **Unscored-severity check.** For severity labels on findings that carry no score — Part 3 §3.11.8 and Parts 6, 7, 12, 13 — **but not Part 11**, which has its own check 7c below — verify each names the regulatory obligation and the compensating control (or its verified absence) that its label requires under `prompt.md` § "Severity for findings that carry no score": Critical and High both require a named obligation. Flag as an integrity warning any Critical or High that names no obligation. Do **not** recompute these labels from any score and do **not** apply the score-band table to them.

7c. **Part 11 gap-severity check.** Part 11 severities are neither score-band labels nor regulatory-impact labels: agent 06 derives each from the **anchors the gap carries**. Recompute every Part 11 gap severity independently: take the worst severity (lowest score band) across every typed anchor on the gap — `P{X}` principle scores, `Loop: {Phase}` scores, and `DoD: {Condition}` scores, using the authoritative deep-file values, excluding any `N/A` DoD condition — then escalate one step (Low→Medium→High→Critical, Critical stays Critical) if the gap blocks a `target_phase` gate. This applies to **every** gap, including single-anchor gaps. Compare against the label agent 06 wrote; record a mismatch as an integrity warning. This matters beyond bookkeeping: Part 11 severity orders the roadmap and selects the Executive Verdict's top three gaps.

8. **Agent 06 score-consistency note.** If `_review_06_strengths_gaps.md` records a score-consistency note in its header block, lift that note verbatim into Source Integrity.

### Step 3 — Score-preservation policy (resolves the score-arbitration question)

Preserve Wave 1 scores verbatim. The merged document MUST NOT re-score any principle, loop phase, DoD condition, or other dimension — that is, it never forms its own judgement about a framework's performance. **Derived aggregates are the explicit exception:** the weighted composite, its per-principle footnote terms, and the Loop-phase mean are *recomputed* here from the authoritative source scores, because substituting deep-file scores into Part 1 while carrying agent 01's arithmetic forward would leave the terms contradicting the table. Recomputing an aggregate from preserved inputs is not re-scoring; assigning a different score to a dimension is. Apply these resolution rules:




- **DoD conditions — single source, no reconciliation.** `_review_03e_dod.md` is the only source of DoD condition scores. Agent 01 produces none, so there is nothing to reconcile: use 03e's value in Part 1's DoD Table, in the Part 4 condition table, and in the Part 4 condition headings. `N/A` conditions carry `N/A` in all three places.

- **Loop Integrity Score.** Single-source, from `_review_03d_loop_integrity.md`. Reproduce it verbatim in Part 3 §3.11.7 and in the Executive Verdict. It is a diagnostic: it does NOT enter the weighted composite and MUST NOT be averaged with, or substituted for, any phase score.

- **Maturity disagreement.** Surface in Source Integrity. Do not arbitrate. Agent 05a owns the Maturity Verdict (surfaced in the combined `_review_05b_industry.md` by agent 05b). Use the owner's value in the merged document.

---

## Inputs to Read

Read all of the following end-to-end before composing a single line of the merged document:

1. All 27 source files listed in Preflight Step 1 (Preflight Step 1 only runs the completion check on each; this step reads each file end-to-end).
2. `[[DOMAIN_FILE]]` — the industry domain file for `[[INDUSTRY]]` context.
3. `[[PRIOR_REVIEWS]]` (if not `none`) — for peer-framework comparison material.
4. The manifesto's own source artefacts. Read the current files; do not rely on memory:
   - `manifesto/manifesto.md` — Agentic Loop phase definitions, loop-readiness gate, the "Evidentiary stage" paragraph quoted in `## Limitations and Assessor Independence`.
   - `manifesto/manifesto-done.md` — Agentic DoD conditions, Hardening DoD, agentic provenance record, evidence freshness rules, Loop-Complete/handoff boundary language.
   - `manifesto/manifesto-principles-01.md` through `manifesto/manifesto-principles-12.md` — the twelve principle statements, against which Part 5's preserved scores and quotes are verified.
   - `companion/frameworks.md` — per-phase failure modes.
   - `companion/principles.md`, `companion/principles-01.md`, `companion/principles-03.md`, `companion/principles-05.md`, `companion/principles-11.md` — the companion principle expansions this merge draws on in practice. The remaining `companion/principles-NN.md` files are optional (see below).
5. `[[FRAMEWORK]]`'s own source artefacts — **targeted verification only.** You have no record of what Waves 1a/1b/2 read, so do not attempt to read "whatever they missed": that instruction is not executable and an open-ended source audit is not this agent's job. Open a framework file only to (a) resolve a specific integrity discrepancy surfaced by Preflight Step 2, or (b) confirm a verbatim quote you are reproducing where the source file's rendering of it looks corrupted. Record each such read in `## Source Integrity` with the reason. Read from `[[FRAMEWORK_PATH]]`, never `[[FRAMEWORK_LOWER]]/`.
6. `glossary.md` — to enforce the Glossary scope discipline (see §Appendices).
7. **Where Wave 1 sources cite cross-stack files** in `governance/`, `integration/`, `regulatory/`, or `operational-templates/`, the merge agent does NOT re-derive content — Wave 1 has already extracted the AEM-relevant material. Read those cross-stack files only when needed to verify a Wave 1 citation is accurate, and only the AEM-relevant section.

### Optional context (consult only if a specific finding requires it)

These files carry **no reading obligation.** Open one only when a specific integrity check, quote verification, or cross-reference resolution actually needs it, and read only the relevant section:

- `manifesto/manifesto-principles.md` — the principle index; the per-principle files above carry the normative text.
- `companion/principles-02.md`, `-04.md`, `-06.md`, `-07.md`, `-08.md`, `-09.md`, `-10.md`, `-12.md` — companion expansions for principles this merge does not normally need to reopen.
- `companion/reference.md`, `companion/patterns.md`, `companion/guide.md`, `companion/re-framework.md` — companion apparatus already extracted by agents 04b/04c.
- `adoption/` files (`vmodel.md`, `path.md`, `pilot.md`, `playbook.md`, `metrics.md`, `roles.md`, `enterprise.md`) — already extracted by agents 04a/04c and 05a/05b.
- Cross-stack files in `governance/`, `integration/`, `regulatory/`, and `operational-templates/` — per item 7 above.

---

## Methodology

### Compose; do not concatenate

The merged review is an editorial integration, not a concatenation of source files. Apply these rules strictly:

- **Deduplicate headers, methodology sections, and definitions.** Each source file opens with its own context-setting material. The merged document has exactly one instance of each canonical section.
- **The merged document MUST NOT contain any of the following lifted from source files:**
  - Source-file metadata blocks (`**Framework:**`, `**Version:**`, `**Review date:**`, `**Methodology:**`, `**Source artefacts read:**`, `**Reviewer:**`, `**Reviewer methodology:**`, `**Context:**`, `**Client context:**`, `**Regulatory overlay:**`, `**Reviewer date:**`, `**Sources reviewed:**`, `**Industry:**`).
  - Per-agent "Inputs to Read" sections.
  - Per-agent "Methodology" sections (agent 04c's `## Methodology` in `_review_04c_synthesis.md` is internal to that file — fold its substance into Part 2 if not already covered).
  - Per-source-file `# H1` titles (e.g., `# [[FRAMEWORK]] Review 03a — ...`).
  - Per-source-file footers (e.g., `*Review conducted by Agent N*`, `*Assessment prepared YYYY-MM-DD ...*`).
  - Any HTML comment "Gap Inventory" blocks or other internal scratchpad markers from agents 04a/04b/04c.
  - The literal P3 Part 12 cross-reference placeholder (see "P3 cross-reference resolution" below).
- **Heading-level harmonisation.** The shift amount depends on whether the source file's content becomes a **direct** Part (shift by 1) or a **subsection nested under** an existing `## Part N` heading (shift by 2, because the Part heading itself already occupies the H2 slot the source file's own H1 would have taken). Two cases:
  - **Direct-Part sources** (e.g., `_review_06_strengths_gaps.md`, `_review_07_guardrails_security_appendix.md`): source H1 → merged H2 (and becomes the `## Part N` heading itself, or is absorbed into it); source H2 → H3; source H3 → H4; source H4 → H5.
  - **Nested-under-a-Part sources — the four loop files.** `_review_03a_loop_upstream.md`, `_review_03b_loop_build.md`, `_review_03c_loop_runtime.md`, and `_review_03d_loop_integrity.md` all nest under the single `## Part 3 — Agentic Loop Phase Analysis` heading. Their per-phase and per-section headings are already numbered `### 3.N ...` / `#### 3.11.N ...` and already sit at the correct merged depth — **carry them across unchanged**. Strip each file's H1 and metadata block; do not shift its H3/H4 headings. Assemble in numeric order: §3.1–§3.3 from the upstream file, §3.4–§3.6 from the build file, §3.7–§3.10 from the runtime file, §3.11 from the loop-integrity file. Each file's `### Upstream Segment Verdict` / `### Build Segment Verdict` / `### Runtime Segment Verdict` is preserved at the position it occupies in its source file — immediately after that file's last **scored phase** subsection (§3.3, §3.6, and §3.9 respectively). Note that `### Runtime Segment Verdict` therefore sits **between §3.9 Govern and §3.10 Human Escalation Architecture**, not after §3.10; §3.10 is not a scored phase.
  - **Nested-under-a-Part source — the DoD file.** `_review_03e_dod.md` nests under `## Part 4 — Agentic Definition of Done`. Its headings are already numbered `### 4.N` and `#### {Condition}` (an inapplicable condition reads `#### {Condition} | **N/A**`); carry them across unchanged. Strip its H1 and metadata block.
  - **Nested-under-a-Part sources — the 12 principle files**, which all nest under the single `## Part 5 — Manifesto Principles` heading: source H1 (`# P{N} — name | **{score}/100**`) → merged H3 (`### P{N} — name | **{score}/100**`); source H2 (e.g., `## Seven-Condition DoD Test`, `## Blast-Radius Test`, `## What works`) → merged H4; source H3 → H5.
  Apply the case that matches each source file; do not apply a single flat +1 shift across all 27 files.
- **Resolve all cross-references to canonical part numbers.** Where a source file says "see the strengths section" or "as noted above," replace with the canonical part number (e.g., "see Part 10"). Never use file names, agent numbers, or source-file section headings as cross-references in the merged document.
- **Preserve analytical substance.** Deduplication MUST NOT silently discard a finding, evidence citation, or remediation item that appears in only one source file. If a finding is unique to one source, it belongs in the merged document.
- **Preserve quotes and artefact citations verbatim.** Where a source file quotes from `[[FRAMEWORK]]`'s own documentation, reproduce the quote exactly.

### P3 cross-reference placeholder resolution

Scan the 12 principle files for the placeholder `*[Part 12 cross-reference …]*` (the literal string emitted by `prompts/prompt-02-principle.md` when `[[PRINCIPLE_NUMBER]]` is 3, character-for-character: `> *[Part 12 cross-reference — see Part 12 guardrails assessment; resolved at merge time]*`). Resolve each occurrence to the canonical part-number citation: "see Part 12, §12.{N}" where `{N}` is the specific subsection of Part 12 that addresses the blast-radius implication. If the specific subsection is not determinable from context, use "see Part 12." Do not leave any placeholder in the merged output.

### Preserve scores verbatim (operationalised)

- Wave 1 scores are authoritative. Agent 09 is an editorial integrator, not a scorer.
- Use the same rounding convention as the source — one decimal place — and verify the metadata `Overall score` against the Part 1 table sum.
- **Severity labels on *scored* dimensions are derived, not preserved.** For every dimension that carries a 0–100 score — the twelve principles, the nine loop phases, the eight DoD conditions, and the overall composite — the severity label is recomputed from the authoritative score per check 7. This is not relabelling; it is the same function applied to the score that actually ships. Do not carry an agent-01 severity label into the merged document. **Unscored findings are different and are never recomputed this way:** Part 3 §3.11.8 cross-phase failure modes, Parts 6 and 7 adoption/companion gaps, and Parts 12–13 guardrail and security findings carry severities derived from the **regulatory-impact rubric** in `prompt.md` § "Severity for findings that carry no score". There is no score to recompute from — preserve those labels verbatim from their source file, and never substitute a score-band label for one of them. Relabelling a deep file's severity where its own score is unchanged still requires a Source Integrity entry.
- Every numeric score in the merged document MUST trace verbatim to a specific Wave 1 source file, **except** the derived aggregates named in the score-preservation rules (weighted composite, footnote terms, Loop-phase mean), which MUST trace to stated arithmetic over those source scores and MUST show that arithmetic. Every regulatory citation MUST trace to a specific Wave 1 source file (or to the canonical regulatory citations in `[[DOMAIN_FILE]]`). Do not introduce findings, scores, severity labels, regulations, or strengths that do not appear in any Wave 1 source.

### Lead with executive verdict

The first substantive section after the Framing Warning (`## Executive Verdict`) MUST be self-contained — a reader reading only the Executive Verdict sees severity, score, maturity, top strengths, top gaps, Red Line, and recommended next move without consulting any Part. Length: approximately 1–2 pages (≤ 900 words).

The Executive Verdict MUST contain, in this order:

(a) **Overall composite score and severity label.** Use the recomputed composite from Preflight Step 3 and the canonical severity thresholds from `prompt.md`. Cite Part 1.

(b) **Maturity phase verdict and the specific evidence driving that placement — with the DoD contradiction attached if check 4c fired.** Where check 4c recorded a `**Maturity-versus-DoD inconsistency**`, this item MUST carry a following sentence naming the failing conditions and stating that the phase-calibrated DoD audit contradicts the stated phase. A reader must not be able to take the phase at face value from the Executive Verdict while the contradiction sits unread in Source Integrity. Take the phase number verbatim from the `**Maturity Verdict: Phase {N}**` line in `_review_05b_industry.md` (authored by agent 05a, surfaced by agent 05b). Cite Part 8.

(c) **Loop integrity verdict.** State, in one sentence taken from `_review_03d_loop_integrity.md`'s opening paragraph, whether `[[FRAMEWORK]]` implements the Agentic Loop as a closed feedback cycle or as a linear pipeline, and give the Loop Integrity Score with its severity label. Cite Part 3, §3.11. This is a diagnostic, not a component of the composite — say so in the same sentence if the two figures differ materially.

(d) **Top 3 genuine strengths.** Take verbatim short forms of the first three numbered strengths in agent 06's Part 10 (`_review_06_strengths_gaps.md`). State which numbers (e.g., "Strength 1, Strength 2, Strength 3"). Each in one sentence. Do not invent new items or reorder.

(e) **Top 3 gaps.** Take the three highest-severity gaps from agent 06's Part 11. Order: Critical first, then High, then by roadmap order within the same severity. State which Gap numbers, reproduce severity labels verbatim. Each in one sentence.

(f) **The Red Line.** From agent 05b's Part 9 "The Red Line" subsection in `_review_05b_industry.md`. **Verbatim, and abridgeable in exactly one way.** The subsection's opening statement and every bold lead-in naming a prohibited workflow are reproduced word for word — those carry the prohibition and must survive quotation in isolation. The supporting sentences under each lead-in may be elided with a marked `…` where the ≤900-word ceiling requires it, followed by a cross-reference to Part 9. Never paraphrase, never drop a whole prohibition, and never elide the controlling regulation that makes one binding.

Agent 05b's Red Line runs to roughly 570 words on a framework with three prohibited workflows, so on a framework with more of them the ceiling will bind. That is expected: the Executive Verdict is a summary and the full text is two clicks away in Part 9. What is not permitted is dropping a prohibition to make the count.

(g) **The highest-leverage single change.** Take verbatim from agent 04c's "Cross-Document Synthesis → Highest-Leverage Single Change" subsection in `_review_04c_synthesis.md`. Do not paraphrase. If the highest-leverage-change finding in Executive Verdict differs from agent 04c's wording, surface the discrepancy in Source Integrity.

(h) **Composite divergence warning (mandatory — never omitted).** Compute the **Loop-phase mean** per `prompt.md`'s canonical rule: the arithmetic mean of the nine authoritative loop-phase scores (from `_review_03a/03b/03c`), to one decimal place. Do **not** fold DoD-condition scores into this figure — the DoD is phase-calibrated and its scores are not on the same scale as the absolute loop-phase scores. Compare against the recomputed composite. If `|Overall Score − Loop-phase mean| ≥ 15.0` — **absolute** difference, so the test fires in both directions — or the Loop Integrity Score is ≤ 39 while the Overall Score is ≥ 60, write a `**Composite divergence warning.**` paragraph naming both figures and the triggering condition. Name which figure is higher: a composite above the loop mean means the weighted score does not reflect how `[[FRAMEWORK]]` executes the loop; a loop mean above the composite means it executes the loop better than its principle-level alignment suggests. If neither condition holds, write the same labelled paragraph stating that the two figures are within 15.0 points of each other, giving both — never that they "agree" in any broader sense. Cite Part 1 and Part 3.

### Limitations and Assessor Independence (mandatory section, placed immediately after Executive Verdict)

Write a `## Limitations and Assessor Independence` section, 150–300 words, containing:

- **Evidentiary status of the yardstick.** Quote `manifesto/manifesto.md`'s "Evidentiary stage" paragraph verbatim (the sentence containing "operable specification" and "not yet a validated discipline"), with its source path. State plainly that every principle score in this document measures alignment against a specification its own author describes as not yet independently validated at scale — not against an industry-accepted standard.
- **Assessor independence.** State plainly that this review was produced by an AI agent swarm operating on prompts authored by the same person who authored the Agentic Engineering Manifesto being scored against, and that no independent third party has verified this review's scores. Name this as a conflict-of-interest disclosure, not a caveat to soften.
- **No human sign-off.** `review_run_manifest.json` is written by the orchestrator only AFTER this agent (09, Wave 3) finishes — so it never reflects a sign-off "for this run" at the moment this section is written; a human can only sign off on a merged review that already exists. Attempt to `Read` `[[FRAMEWORK_LOWER]]/review_run_manifest.json` anyway: if it is absent (the normal case — no prior completed run for this target, or a prior run whose manifest was never populated), state: "This review has not been signed off by a named human reviewer." If it exists (a prior run for this same `[[FRAMEWORK_LOWER]]/` target completed and the manifest was later hand-edited), report the `reviewer_name` / `reviewer_signoff_date` values found there **as the sign-off status of that prior review**, and note explicitly that this new merged output supersedes it and has not itself been signed off. Either way, do not imply this specific merged document has been reviewed by a human if it has not.
- **What this document is not.** One sentence distinguishing this document from a certification, an audit opinion, or a regulator-accepted assessment.

This section MUST NOT be softened, shortened below 150 words, or omitted for any run, including runs where `[[ORGANIZATION]]` is time-pressured or where the requester asks for a shorter report.

### Flow through Parts 1–13 in canonical order

Populate every part. Do not omit or reorder parts. If a source file contains material that spans multiple parts, split it correctly.

### Closing sections

After Part 13, write two closing sections:

- `## Prioritised Remediation Roadmap` — drawn from `_review_06_strengths_gaps.md`. Preserve effort labels (S/M/L/XL) and priority ordering verbatim. Do not re-rank. Each row cites the specific Gap N entry in Part 11. The roadmap row count equals the number of gaps in Part 11. Effort labels in the Roadmap match effort labels in the corresponding gap detail.
- `## [[ORGANIZATION]] Deployment Recommendation` — synthesise from `_review_05b_industry.md` (Part 9 Deployment Path) and `_review_06_strengths_gaps.md` (Roadmap Interpretation). State clearly: the recommended deployment posture for `[[ORGANIZATION]]`, the conditions that must be met before full deployment, the regulatory constraints from `[[INDUSTRY]]` that are non-negotiable. The Deployment Recommendation MUST NOT contradict the Red Line in Part 9 or the Executive Verdict.

### Appendices

Populate all five appendices. Do not omit or merge appendices.

---

## Output Specification

**Output file:** `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_manifesto_alignment_review_merged.md`

### Idempotence

Follow the single canonical idempotency policy delivered via the orchestrator's Universal Prepend Block (defined in `prompt.md`): if the output file already exists, regenerate it from scratch if EITHER (a) any of the 27 source files has a modification timestamp newer than the existing merged file, OR (b) the existing merged file fails this prompt's own Self-Check gate below (missing parts, missing appendices, wrong line count, unsubstituted placeholders, missing provenance line, etc.) — treat any Self-Check failure as "malformed," not just staleness. Otherwise output `Merged review is up to date — no regeneration needed` and stop. The Source Integrity section MUST be regenerated on every regeneration. Do not define a different or narrower rule here.

### Required document structure

```
# [[FRAMEWORK]] — Agentic Engineering Manifesto Alignment Review (Merged)

---
Framework:           [[FRAMEWORK]]
Version:             [[FRAMEWORK_VERSION]]
Review date:         YYYY-MM-DD
Manifesto:           arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]
Reviewer methodology: Multi-agent swarm review — 17 specialised agent roles (01; 02-p1..02-p12; 03a; 03b; 03c; 03d; 03e; 04a; 04b; 04c; 05a; 05b; 06; 07; 08a; 08b; 09) producing 27 source files across Wave 1a / 1b / 2 / 3 execution
Context:             [[INDUSTRY]]
Client:              [[ORGANIZATION]]
Sources (27 files):  <list all 27 source file paths — exactly 27 entries>
Overall score:       <X.X / 100, computed via Σ(score × weight) from Part 1>
Maturity level:      <Phase N — Label, taken from the Maturity Verdict in `_review_05b_industry.md` (authored by agent 05a, surfaced by agent 05b). If check 4c fired, append ` — contested by Part 4 (see Source Integrity)`>
Severity:            <Critical | High | Medium | Low, per canonical thresholds>
---

## Framing Warning

## Executive Verdict

## Limitations and Assessor Independence

## Source Integrity

## Part 1 — Overall Scores

## Part 2 — Scoring Methodology

## Part 3 — Agentic Loop Phase Analysis

### 3.1 Specify | **<score>/100**
### 3.2 Design | **<score>/100**
### 3.3 Plan | **<score>/100**
### Upstream Segment Verdict
### 3.4 Execute | **<score>/100**
### 3.5 Verify | **<score>/100**
### 3.6 Validate | **<score>/100**
### Build Segment Verdict
### 3.7 Observe | **<score>/100**
### 3.8 Learn | **<score>/100**
### 3.9 Govern | **<score>/100**
### Runtime Segment Verdict
### 3.10 Human Escalation Architecture
### 3.11 Loop Integrity
#### 3.11.1 Forward Seam Analysis
#### 3.11.2 Feedback Arrow Analysis
#### 3.11.3 Remediation Sub-Cycle Test
#### 3.11.4 Loop-Output Test
#### 3.11.5 End-to-End Evidence Trace
#### 3.11.6 Iteration and Convergence
#### 3.11.7 Loop Integrity Score
#### 3.11.8 Cross-Phase Failure Modes

## Part 4 — Agentic Definition of Done

### 4.1 DoD Condition Table
### 4.2 Condition Narratives
### 4.3 Hardening Assessment
### 4.4 DoD Audit Scenario
### 4.5 Evidence Freshness and Rollback Currency
### 4.6 Industry-Specific DoD Requirements

## Part 5 — Manifesto Principles

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
| Executive Verdict | Synthesise across all sources per `Methodology → Lead with executive verdict` | Self-contained; ≤ 900 words; verbatim short forms only. |
| Source Integrity | Preflight Step 2 findings | Use the fixed entry schema, split across the two subsections. End with `Integrity status: N integrity warnings.` or `Integrity status: clean.` **Do not assign Critical/High/Medium/Low to integrity findings** — the canonical severity thresholds map scores, not process defects, and no check produces a severity for them. Count warnings; do not grade them. |
| Part 1 — Overall Scores | **authoritative deep files** — the twelve `_review_02_principle_p{N}.md` H1 scores, the nine loop-phase scores from `_review_03a/03b/03c`, Loop Integrity from `_review_03d`, DoD from `_review_03e`. Agent 01 supplies the table STRUCTURE and the per-row one-sentence assessments only; every Score and Severity cell in its output is `—` and MUST be filled from these files. Recompute the composite as Σ(score × weight) with a single rounding applied to the sum. |
| Part 2 — Scoring Methodology | `_review_01_quick_overview.md` Part 2 | Single instance; no duplication; agent 04c's `## Methodology` folds here if substantive. Also state here, in one paragraph, the three rubrics that produced the deep scores: the five-criterion per-phase rubric (C1–C5) behind Part 3, the four-criterion per-condition rubric (D1–D4) behind Part 4, and the five-term Loop Integrity arithmetic behind Part 3 §3.11.7. A reader must be able to tell that phase and condition scores are rubric-derived, not impressionistic. |
| Part 3 — Agentic Loop Phase Analysis | `_review_03a_loop_upstream.md` (§3.1–§3.3), `_review_03b_loop_build.md` (§3.4–§3.6), `_review_03c_loop_runtime.md` (§3.7–§3.10), `_review_03d_loop_integrity.md` (§3.11) | Assemble in numeric subsection order. Preserve all 9 per-phase `### 3.N {Phase} \| **{score}/100**` headings with their nine labelled blocks (`**Entry gate.**`, `**What [[FRAMEWORK]] does.**`, `**Mechanism inventory.**`, `**What the manifesto requires.**`, `**Exit contract.**`, `**Silent-failure probe.**`, `**Evidence quality.**`, `**The gap.**`, `**Score derivation.**`) and their phase-specific inserts (Specify's nine-row loop-readiness table; Design's four-element coverage; Plan's bounded-decomposition check; Execute's bounded-autonomy check; Verify's evaluation-contract check; Validate's independence check; Observe's coverage check; Learn's knowledge/memory separation check; Govern's five-row completion-conditions table and substrate check). Preserve the three Segment Verdict subsections in place. Preserve `### 3.10 Human Escalation Architecture` (4 sub-paragraphs) and all eight §3.11 sub-sections including the §3.11.7 arithmetic block verbatim. Do NOT re-shift these files' heading depths — they are already correct. |
| Part 4 — Agentic Definition of Done | `_review_03e_dod.md` | Preserve `### 4.1 DoD Condition Table` (6 columns × 8 rows including the phase-calibrated `Bar` column and the D1/D2/D3/D4 column; `N/A` rows preserved verbatim), the eight condition narratives — an applicable condition headed `#### {Condition} \| **{score}/100**` with all seven labelled blocks, an inapplicable one headed `#### {Condition} \| **N/A**` carrying only its §2.2 applicability paragraph. Carry `N/A` narratives across verbatim; do not synthesise a score or invent the missing blocks for them, `### 4.3 Hardening Assessment` (both tables plus the provenance-field paragraph), `### 4.4 DoD Audit Scenario` (ending with the literal sentence "Hardening is complete." or "Hardening is not complete."), `### 4.5 Evidence Freshness and Rollback Currency`, and `### 4.6 Industry-Specific DoD Requirements`. |
| Part 5 — Principles P1–P12 | `_review_02_principle_p{N}.md` ×12 | Each `### P{N}` subsection: preserve `## What [[FRAMEWORK]] asserts about this principle`, `## What works`, `## Where it fails the manifesto's bar`, `## [[ORGANIZATION]]-specific implications`, `## Score rationale`. Preserve all H3/H4 heading text exactly; preserve all bullets; do not merge or summarise bullets. Preserve every principle-specific test subsection: P1 `## Seven-Condition DoD Test`; P3 `## Blast-Radius Test`; P5 `## Tier Assessment`; P8 `## Seven-Condition DoD Test (Evaluation Edition)`; P9 `## Does [[FRAMEWORK]]'s observability cover reasoning or only execution?`; P12 `## Structured Recovery Test`. Strip per-file H1 and any metadata headers. Resolve P3 cross-reference placeholder. |
| Part 6 — Adoption Document Alignment | `_review_04a_adoption.md` `## Part 6 — Adoption Document Alignment` (agent 04a's own output, merged directly — 04c does not reproduce it). Drop 04a's H1, its `## Methodology`, its `<!-- GAP INVENTORY -->` block and its `*Sources read:*` footer; keep `## Part 6` at H2 and every subsection at its existing level. | Preserve all 7 adoption subsections with their alignment grades (Well-aligned / Partially aligned / Misaligned). |
| Part 7 — Companion Framework Alignment | `_review_04b_companion.md` `## Part 7 — Companion Framework Alignment` (agent 04b's own output, merged directly). Same drops as Part 6: H1, `## Methodology`, gap-inventory block, sources footer. | Preserve all 6 companion subsections with alignment grades and contradiction labels. |
| Cross-Document Synthesis | `_review_04c_synthesis.md` `## Cross-Document Synthesis` (generated by agent 04c from the gap inventory blocks of agents 04a and 04b) | Place between Part 7 and Part 8. Preserve `### Realistic Adoption Ceiling at [[ORGANIZATION]]` and `### Highest-Leverage Single Change` subsections. Highest-Leverage Single Change MUST agree verbatim with the Executive Verdict's item (g); flag any discrepancy in Source Integrity. |
| Part 8 — Maturity Phase Placement | `_review_05a_maturity.md` `## Part 8 — Maturity Phase Placement` (agent 05a's own output, merged directly — 05b does not reproduce it, it only restates the verdict line). Drop 05a's H1 and header block; keep `## Part 8` at H2. | Preserve `### The Verdict` (with `**Maturity Verdict: Phase {N}**` line), `### Evidence Matrix`, `### Phase Gate Non-Negotiables` (table form with `Gate \| Required to reach Phase {N+1} \| [[FRAMEWORK]] status \| Severity` columns), `### Comparison with Peer Frameworks`, `### Economics Assessment`. |
| Part 9 — `[[INDUSTRY]]` Assessment (`[[ORGANIZATION]]`) | `_review_05b_industry.md` Part 9 (written by agent 05b) | Preserve `### The Regulatory Exposure Map`, `### Fitness by Regulated Application` (including the framing sentence that precedes its table), `### The Red Line`, `### The Deployment Path`. |

**Note on the 04/05/08 lines.** Each line has an intermediate agent that does the substantive work (04a Part 6, 04b Part 7, 05a Part 8, 08a §14.1–§14.15) and a synthesis agent that adds original analysis on top (04c Cross-Document Synthesis, 05b Part 9, 08b §14.16–§14.19). **Merge each Part from the agent that wrote it.** No synthesis agent reproduces its upstream Part any more — copying long sections through a model risked truncation and drift for no gain. All seven files are required inputs.
| Part 10 — Genuine Strengths | `_review_06_strengths_gaps.md` Part 10 | Preserve all 6–10 numbered strengths with fairness notes verbatim. |
| Part 11 — Gap Analysis | `_review_06_strengths_gaps.md` Part 11 | Preserve all gaps (each with severity, principle mapping, "What is missing", "Why it matters in `[[INDUSTRY]]`", "What closes it", "Evidence anchor", "Effort"). Preserve roadmap order. Do NOT duplicate the Roadmap inside Part 11; the Roadmap is its own closing section. |
| Part 12 — AI/Runtime Guardrails Assessment | `_review_07_guardrails_security_appendix.md` Part 12 | Preserve all 5 sub-sections (12.1 Input Guardrails, 12.2 Output Guardrails, 12.3 Behavioural Guardrails, 12.4 Guardrail Architecture Assessment, 12.5 Adversarial Scenario). |
| Part 13 — Security Assessment | `_review_07_guardrails_security_appendix.md` Part 13 | Preserve all 5 sub-sections (13.1 Determinism and Output Variance, 13.2 Security Coverage Map with all 11 control families, 13.3 Bias and Fairness Exposure, 13.4 Regulatory Security Requirements, 13.5 Critical Security Findings). |
| Part 14 — Enterprise Guardrail Domain Coverage | §14.1–§14.15 from `_review_08a_domains.md` in numeric order (agent 08a's own output, merged directly), then §14.16–§14.19 from `_review_08b_enterprise_synthesis.md` | Preserve all 19 sub-sections at H3 depth (14.1–14.15 the 15 domains; 14.16 Cross-cutting matrix with importance + `[[FRAMEWORK]]` coverage matrices and Critical/High gaps; 14.17 Twelve Non-Negotiable Guardrails table with N/12 coverage; 14.18 Agent Card / Task Card schema verification with Schema Coverage Score; 14.19 Enterprise Guardrail Maturity Verdict). Preserve the `**Enterprise Guardrail Maturity: <LACKING / PARTIAL / ADEQUATE / MATURE>**` verdict line verbatim. Do NOT re-score P1–P12; Part 14's overlapping findings cite principles by number. Do NOT duplicate Part 12 or Part 13 content; cross-references stand. The intermediate `_review_08a_domains.md` is NOT a direct input to agent 09 — it is consumed by agent 08b. |
| Prioritised Remediation Roadmap | `_review_06_strengths_gaps.md` `## Prioritised Remediation Roadmap` | Preserve effort labels and priority order. Each row cites the Gap N entry in Part 11. Roadmap row count equals Part 11 gap count. Do not re-rank. |
| `[[ORGANIZATION]]` Deployment Recommendation | `_review_05b_industry.md` Part 9 Deployment Path + `_review_06_strengths_gaps.md` Roadmap Interpretation | Synthesise; include regulatory constraints; do not contradict the Red Line. |
| Appendix A — Adversarial Scenario | `_review_07_guardrails_security_appendix.md` §12.5 | Reproduce the full red-team walk-through verbatim. Do not summarise. |
| Appendix B — Security Coverage Map | `_review_07_guardrails_security_appendix.md` §13.2 | Preserve all 11 control-family rows verbatim. |
| Appendix C — Evidence Matrix | `_review_05a_maturity.md` Part 8 Evidence Matrix | Reference Part 8; do not duplicate the table — extract once and cross-reference if needed. |
| Appendix D — Peer-Framework Comparison | `_review_05a_maturity.md` `### Comparison with Peer Frameworks` + `[[PRIOR_REVIEWS]]` if any | If `[[PRIOR_REVIEWS]]` is `none`, state explicitly "No prior reviews available; peer comparison limited to the spectrum table in `companion/frameworks.md` (reproduced from agent 05b's Comparison with Peer Frameworks, lifted from agent 05a)." Do not fabricate peer data. **Confidentiality:** a prior review named here is a confidential assessment of a different client's framework. Naming that other framework and its weaknesses in `[[ORGANIZATION]]`'s deliverable is only permitted because the orchestrator confirmed reuse was authorised in `skills/review.md` Step 3.4 — do not re-derive additional detail about the peer framework beyond what is needed for the comparison; do not speculate about the peer's client identity. |
| Appendix E — Glossary | All sources | `[[FRAMEWORK]]`-specific terms only — module names, command names, configuration keys, framework-internal concepts. NOT general AI/ML/agentic terms defined in `glossary.md` (autonomy tiers, Loop phase names, DoD conditions, maturity phase names, principle names, severity labels, effort labels, manifesto vocabulary). Alphabetical, British English, one-line definition each, with citation to the source artefact in `[[FRAMEWORK]]` where the term is defined. |

---

## Hard Rules

- Read all 27 source files end-to-end before composing a single line of the merged document.
- Do not re-score. Wave 1 scores are authoritative. Agent 09 is an editorial integrator, not a scorer.
- Surface every score inconsistency in `## Source Integrity` using the fixed entry schema. Do not silently correct (except composite arithmetic per Preflight Step 3).
- Use date format **YYYY-MM-DD** wherever a date appears.
- Cross-references within the merged document use canonical part numbers only (e.g., "see Part 12"). Never use source file names, agent numbers, or Wave designations in cross-references.
- Industry context (`[[INDUSTRY]]`) is not decoration. Every major finding in the merged document MUST be connected to a specific regulation or risk type applicable to `[[ORGANIZATION]]`. Every regulation citation MUST trace to a Wave 1 source file or to `[[DOMAIN_FILE]]`.
- British English throughout. No American spellings, **except** `defense-in-depth` / `defense-in-line` (P3's name and the security-architecture term of art) — the manifesto's own P3 heading (`manifesto/manifesto-principles-03.md`) and industry usage both use the American spelling for this specific compound term; do not alter it to `defence-in-depth`.
- Do not introduce findings, scores, severity labels, regulations, or strengths that do not appear in any Wave 1 source. The merge is editorial synthesis; new analytical claims are not permitted.
- Do not relabel a deep file's severity where its own score is unchanged, without surfacing the change in Source Integrity. Recomputing a label after a score substitution is required, not a relabelling — see check 7.
- **Out-of-scope corpus / tracked-files-only.** Forward-propagation prohibition extends to `[[DOMAIN_FILE]]` and to any cross-stack file in `governance/`, `integration/`, `regulatory/`, or `operational-templates/` that the Wave 1 sources cited: do not embed full passages from those files, do not derive IGM/AEnt-M/ASDLC/APLC roadmaps, and do not invent domain bridges that are not present in `[[DOMAIN_FILE]]`. **If any Wave 1 source contains an out-of-scope-corpus token, surface it in `## Source Integrity` as an integrity warning and STOP — do not silently scrub it from lifted material; the upstream agent should have caught it.** **Narrow exception:** a Wave 1 source's permitted self-referential quote of `manifesto/manifesto-done.md`'s Loop-Complete/handoff boundary language (which names ASDLC as AEM's own stated downstream boundary — see `prompt.md`'s Out-of-scope-corpus exception) is not an integrity warning and should be lifted as-is.

---

## Self-Check (HARD GATE before saving the output file)

**Do not save the output file until every item below is confirmed.** Each item is binary yes/no. If any item fails, fix the file content and re-verify before saving.

- [ ] All 27 source files confirmed valid by Preflight Step 1 (each ends with `<!-- SELF-CHECK: PASSED -->`).
- [ ] Does the output file's header metadata block contain the substring `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]` (the mandatory provenance line — see `prompt.md`'s Hard rules)?
- [ ] Executive Verdict contains the mandatory `**Composite divergence warning.**` paragraph in one of its two forms, with the Loop-phase mean stated to one decimal place.
- [ ] **[substantive]** Every severity label on a **scored** dimension — Part 1 principle rows, per-principle headings, loop-phase headings, DoD conditions, the metadata `Severity` field, and the Executive Verdict — was recomputed from the authoritative score, not carried over from agent 01.
- [ ] **[substantive]** Every Part 11 gap severity was recomputed from its anchors per check 7c, including single-anchor gaps; mismatches recorded.
- [ ] **[substantive]** Every severity label on an **unscored** finding (Part 3 §3.11.8; Parts 6, 7, 12, 13 — Part 11 excluded, it has check 7c) was preserved from its source file and validated against the regulatory-impact rubric per check 7b — none was recomputed from a score band. Spot-check every score within 2 points of a band boundary (39/40, 59/60, 79/80).
- [ ] All 14 score-integrity cross-checks (2, 2a, 3a, 3b, 4, 4a, 4b, 4c, 5, 6, 7, 7b, 7c, 8) completed — checks 1 and 3 were removed with agent 01's scoring (task B1); there is no longer an overview score set to reconcile; every result recorded verbatim in `## Source Integrity` under either `### Integrity warnings` or `### Estimate differences (expected — not defects)`, using the fixed entry schema. No agent-01-versus-deep-file difference appears under `### Integrity warnings`.
- [ ] Composite arithmetic recomputed; metadata `Overall score` equals `Σ(score × decimal_weight)` from Part 1's table, rounded to one decimal place.
- [ ] Framing Warning section (4 sub-sections) is present between metadata and Executive Verdict.
- [ ] `## Limitations and Assessor Independence` section is present immediately after Executive Verdict, is 150–300 words, and contains: the verbatim "Evidentiary stage" quote from `manifesto/manifesto.md` with path, the assessor-independence conflict-of-interest disclosure, an explicit statement of whether `reviewer_name`/`reviewer_signoff_date` are populated, and the certification/audit-opinion disclaimer sentence.
- [ ] Part 3 contains all nine per-phase subsections in §3.1–§3.9 order, the three Segment Verdicts, §3.10 Human Escalation Architecture, and all eight §3.11 sub-sections; Part 4 contains all six §4.N sub-sections and eight condition narratives; Part 5 contains all twelve principle subsections.
- [ ] Part 1's tables appear in the order Loop Phases, DoD, Principles, Maturity Verdict, and the Loop Phases Table carries the `**Loop Integrity**` diagnostic row annotated as not weighted.
- [ ] The Loop Integrity Score appears in Part 3 §3.11.7 and the Executive Verdict, is never averaged with a phase score, and is never counted into the composite.
- [ ] All 14 canonical parts present and in order; Cross-Document Synthesis present between Part 7 and Part 8; Part 14 (Enterprise Guardrail Domain Coverage) present after Part 13 and before the Prioritised Remediation Roadmap. Part 14 contains all 19 sub-sections (§14.1–§14.15, §14.16 cross-cutting matrix, §14.17 twelve non-negotiables, §14.18 schema verification, §14.19 maturity verdict).
- [ ] Part 14 does NOT introduce any re-score of P1–P12 or restate the composite. Overlap with Part 12/Part 13 is by cross-reference, not duplication.
- [ ] Part 14 §14.19 contains a verbatim `**Enterprise Guardrail Maturity: <LACKING | PARTIAL | ADEQUATE | MATURE>**` line lifted from `_review_08b_enterprise_synthesis.md`.
- [ ] `## Executive Verdict` is self-contained, ≤ 900 words, and includes (a) overall score and severity label, (b) maturity phase, (c) the loop-integrity verdict with the Loop Integrity Score and its severity label, (d) top-3 strengths from Part 10, (e) top-3 highest-severity gaps from Part 11, (f) The Red Line verbatim from Part 9, (g) highest-leverage single change verbatim from the Cross-Document Synthesis, (h) the mandatory Composite divergence warning paragraph.
- [ ] Executive Verdict's Red Line reproduces Part 9's opening statement and every prohibited-workflow lead-in verbatim, with each controlling regulation intact. Any omission inside a lead-in's supporting text is marked `…` and the subsection cross-references Part 9. No prohibition is missing.
- [ ] Executive Verdict's highest-leverage single change equals agent 04c's Cross-Document Synthesis verbatim; any drift is logged in Source Integrity.
- [ ] All P3 cross-reference placeholders (`*[Part 12 cross-reference …]*`) resolved to canonical "see Part 12, §12.{N}" or "see Part 12" citations.
- [ ] Every gap heading lifted into Part 11 preserves its typed anchor groups verbatim (`P{X}`, `Loop: {Phase}`, `DoD: {Condition}`); every strength preserves its three-family anchor line.
- [ ] Per-principle test sections preserved: P1 `Seven-Condition DoD Test`, P3 `Blast-Radius Test`, P5 `Tier Assessment`, P8 `Seven-Condition DoD Test (Evaluation Edition)`, P9 `Does [[FRAMEWORK]]'s observability cover reasoning or only execution?`, P12 `Structured Recovery Test`.
- [ ] `## Prioritised Remediation Roadmap` row count equals the number of gaps in Part 11. Each row cites the specific Gap N entry. Effort labels match the gap detail.
- [ ] `## [[ORGANIZATION]] Deployment Recommendation` synthesises from agents 05 and 06 and addresses `[[INDUSTRY]]` regulatory constraints; does not contradict the Red Line.
- [ ] All five appendices (A–E) populated. Appendix A reproduces agent 07 §12.5 verbatim. Appendix B preserves all 11 control-family rows. Appendix D handles the `[[PRIOR_REVIEWS]] = none` case explicitly if applicable.
- [ ] Glossary (Appendix E) contains only `[[FRAMEWORK]]`-specific terms (module names, command names, configuration keys, framework-internal concepts). Contains zero entries for manifesto vocabulary defined in `glossary.md` (autonomy tiers, Loop phase names, DoD conditions, maturity phase names, principle names, severity labels, effort labels). Alphabetical, British English.
- [ ] Cross-references use canonical part numbers only — zero matches for source-file names (e.g., `_review_03a_loop_upstream.md`), agent numbers (e.g., `agent 06`), or Wave designations.
- [ ] Output file contains zero matches for `ASDLC`, `APLC`, `IGM`, `AEnt-M`, `AEnt_M`, `intelligence-governance-manifesto`, `agentic-enterprise-manifesto`, `agentic-enterprise`, `agentic-governance-stack`, `manifesto-evolution-plan`, `phase-assessment-checklist`, `asdlc`, `aplc`, `agentic-sdlc-handbook`, `asdlc-plan`, `aplc-plan`, or `igm-aent-coherence-review`, other than the permitted self-referential quote of `manifesto-done.md`'s own Loop-Complete/handoff boundary language. Every source file referenced in the merged document is tracked by git on the current branch.
- [ ] Output file contains zero matches for the banned soft-language tokens `consider`, `may`, `could potentially`, `perhaps`, `use judgement`.
- [ ] Output file contains zero remaining `[[...]]` placeholders.
- [ ] Output file contains no source-file metadata blocks, per-agent "Inputs to Read" sections, per-agent "Methodology" sections, or per-source-file H1 titles or footers.
- [ ] All dates in YYYY-MM-DD format. No `MM/DD/YYYY` or `DD/MM/YYYY` matches.
- [ ] British English throughout (organisation, behaviour, optimise, prioritise, modelling, licence, programme — not the American forms), **except** `defense-in-depth` / `defense-in-line`, which keep the American spelling used by the manifesto's own P3 heading and by industry usage.
- [ ] Front-matter `Sources (27 files):` block lists exactly 27 paths.
- [ ] Output line count is between 2,600 and 5,200 lines (a result outside this range is evidence of either concatenation or skeletonisation; investigate before saving). The expanded bounds accommodate Part 14 (15 domain sub-sections + cross-cutting matrix + 12 non-negotiables + schema tables) and the deepened Part 3 (nine per-phase subsections with mechanism-inventory tables and phase-specific inserts, plus eight loop-integrity sub-sections) and Part 4 (eight condition narratives with seven blocks each).
