# Sub-prompt 04c — Adoption & Companion Cross-Document Synthesis

**Purpose:** Produce `[[FRAMEWORK_LOWER]]_review_04c_synthesis.md` — the Cross-Document Synthesis across the Agent 04 line, plus the merged Gap Inventory. This agent authors original synthesis only. **It does not reproduce Parts 6 or 7.** Agent 09 assembles those into the merged review straight from `_review_04a_adoption.md` and `_review_04b_companion.md`, so copying them here would only add a chance to truncate or drift.

**Note to orchestrator:** All double-bracket placeholders in this file must be substituted before this prompt is passed to the agent. If any `[[...]]` pattern remains in your working copy, stop and resolve it before spawning.

**Idempotency.** Follow the single canonical idempotency policy delivered via the orchestrator's Universal Prepend Block (defined in `prompt.md`): regenerate the output file if it is missing, if it is older than either upstream input (`_review_04a_adoption.md` or `_review_04b_companion.md`), or if it fails this prompt's own Self-check gate (§5 below) — treat any Self-check failure as "malformed." Otherwise skip regeneration. Do not define a different or narrower rule here.

**Wave dependency:** Run ONLY after `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04a_adoption.md` and `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04b_companion.md` both pass the completion check (`tail -n 2 <file> | grep -q '<!-- SELF-CHECK: PASSED -->'`). **If either file is missing or fails that check, report which file and STOP. Do not attempt to fabricate content for the missing sibling.**

**Cross-prompt scope guards:**
- Do NOT re-read [[FRAMEWORK]] source artefacts to re-derive scores. The verdicts in 04a and 04b are authoritative; cite them, never restate them at length. The only re-reading permitted is `[[DOMAIN_FILE]]` (for synthesis citations) and `companion/frameworks.md` (for any phase-name reference in the ceiling sentence).
- Do NOT issue a determinative phase placement. The synthesis verdict sentence is scoped to the *adoption ceiling implied by Parts 6–7 findings*, not the determinative phase placement (which is Part 8, owned by agent 05).
- Do NOT issue a production-deployment red line. The Highest-Leverage Single Change is scoped to the adoption-ceiling unlock implied by Parts 6–7 findings — not a remediation roadmap (which is Part 11, owned by agent 06) and not a production red line (Part 9, owned by agent 05).
- Do NOT pre-empt Part 8.

---

## 1. Inputs

### Required (must read end-to-end)

- `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04a_adoption.md` — Part 6 source.
- `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04b_companion.md` — Part 7 source.

### Optional (read only for synthesis citations)

- `[[DOMAIN_FILE]]` — for regulation/risk-type citations in the synthesis bullets.
- `companion/frameworks.md` — for phase-name reference in the ceiling sentence (Phase 1–6 vocabulary). Do not re-derive companion alignment.

### Do NOT read

- `[[FRAMEWORK]]` source artefacts. Re-derivation is forbidden.
- Adoption corpus or companion corpus files (other than `companion/frameworks.md` for phase-name reference). The siblings have already assessed them.
- `[[PRIOR_REVIEWS]]`. Sibling files have already integrated peer comparison if applicable.

---

## 2. Methodology

### 2.1 Preflight (mandatory, before any output)

1. Verify `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04a_adoption.md` passes the completion check (`tail -n 2 <file> | grep -q '<!-- SELF-CHECK: PASSED -->'`). Confirm a `## Part 6 — Adoption Document Alignment` heading is present.
2. Verify `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04b_companion.md` exists. Read its first 5 lines and last 5 lines. Confirm total line count ≥ 20. Confirm a `## Part 7 — Companion Framework Alignment` heading is present.
3. If either check fails, STOP. Report:
   - Which file is missing or under-sized.
   - The first/last 5 lines actually read (or the error message).
   Do not write any output file.

### 2.2 Gap Inventory extraction

1. Locate the `<!-- GAP INVENTORY ... /GAP INVENTORY -->` block in the 04a file. Extract every line.
2. Locate the `<!-- GAP INVENTORY ... /GAP INVENTORY -->` block in the 04b file. Extract every line.
3. Build a single de-duplicated list, preserving each row's `gap-slug | severity | source-doc-slug | part-reference | effort` shape. If a gap-slug appears in both files (rare), retain both entries — the part references differ.
4. The merged Gap Inventory drives the Cross-Document Synthesis bullets. Every synthesis bullet must trace to either a row in the merged Gap Inventory or to a contradiction surfaced in the 04b file.

### 2.3 Quotation limit

You may quote an alignment grade, a gap bullet or a single sentence from 04a/04b to anchor a synthesis bullet. You may not reproduce a subsection. If a synthesis bullet needs more than about two sentences of upstream text to make sense, cite it by subsection heading instead — the reader has the full text in Parts 6 and 7 of the merged review.

Do not edit substantive content when quoting. Do not "improve" wording. Do not rebalance grades. If 04a or 04b contains a placeholder or an obvious error, do NOT silently fix it — flag it in your synthesis as `unverified upstream defect` naming the file and heading.

### 2.4 Realistic Adoption Ceiling (synthesis writing)

Write `### Realistic Adoption Ceiling at [[ORGANIZATION]]` per §3.6.1. Source material:
- The merged Gap Inventory.
- The contradiction bullets from Part 7 (in `_review_04b_companion.md`).
- The `[[ORGANIZATION]] Implication` paragraphs from each subsection (for regulatory citations).
- `companion/frameworks.md` — only for phase-name vocabulary in the ceiling sentence.

The ceiling sentence has a fixed form:
> `[[FRAMEWORK]]` can support adoption up to Phase {N} in `[[INDUSTRY]]` contexts without significant additional tooling.

Choose `{N}` based on the highest phase whose primary requirements are met across Parts 6 and 7. Justify with 4–8 evidence bullets, then close with one sentence on the binding constraint.

### 2.5 Highest-Leverage Single Change (synthesis writing)

Write `### Highest-Leverage Single Change` per §3.6.2. Identify the *one* change with the largest positive impact on the adoption ceiling. Source material:
- The merged Gap Inventory (rank by severity × adoption-ceiling impact).
- Any Part 7 contradiction whose resolution would lift the ceiling.

The change must satisfy: specific (named command, artefact, or capability); grounded (cite the Part 6 or Part 7 subsection by canonical part number); proportionate (explain why this unlocks more ceiling than any other single change). Optionally name a secondary change.

---

## 3. Output specification

Write the following file exactly. **Downstream agents (06, 09) read this file for the synthesis and the merged Gap Inventory; they read 04a and 04b directly for Parts 6 and 7.**

**File path:** `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04c_synthesis.md`

Create the `[[FRAMEWORK_LOWER]]/` directory if it does not exist (it should already exist because 04a/04b wrote into it).

### 3.1 Required header

```
# [[FRAMEWORK]] Agent 04c — Adoption & Companion Cross-Document Synthesis

**Framework:** [[FRAMEWORK]]
**Version:** [[FRAMEWORK_VERSION]]
**Review date:** <YYYY-MM-DD>
**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]`
**Reviewer:** Agent 04 — composed from Agent 04a (adoption) + Agent 04b (companion) by Agent 04c (<model-name>)
**Methodology:** Evidence-based alignment against the manifesto adoption corpus (7 files) and companion corpus (6 files); every verdict grounded in named [[FRAMEWORK]] artefacts; [[ORGANIZATION]]-specific implications mapped to [[DOMAIN_FILE]] regulations. cross-document synthesis over sibling outputs 04a (Part 6) and 04b (Part 7), which agent 09 merges from their own files; Cross-Document Synthesis derived from the merged Gap Inventory.
**Context:** [[ORGANIZATION]] — [[INDUSTRY]]
**Source files:** `[[FRAMEWORK_LOWER]]_review_04a_adoption.md` (Part 6), `[[FRAMEWORK_LOWER]]_review_04b_companion.md` (Part 7). Those Parts are NOT reproduced here; agent 09 merges them from the source files.
```

### 3.2 Methodology (brief)

Immediately after the header, produce a `## Methodology (brief)` section (≤120 words). State:
- That Parts 6 and 7 are NOT in this file — agent 09 takes them from 04a and 04b directly.
- That re-derivation of scores or alignment grades is forbidden in this agent.
- That the Cross-Document Synthesis is the only original content produced by 04c.
- Where the merged Gap Inventory came from (the two sibling blocks, de-duplicated).

Do not re-quote the full per-subsection methodology — that lives in 04a and 04b.

### 3.3–3.4 Parts 6 and 7 — not in this file

This agent writes neither. Agent 09 reads `## Part 6 — Adoption Document Alignment` from `_review_04a_adoption.md` and `## Part 7 — Companion Framework Alignment` from `_review_04b_companion.md` and merges them at H2 unchanged. Do not paste, summarise, or restructure either Part here.

### 3.5 Cross-Document Synthesis

Open with `## Cross-Document Synthesis`. This is the only section authored by 04c (beyond the header and methodology-brief).

#### 3.6.1 — `### Realistic Adoption Ceiling at [[ORGANIZATION]]`

Begin with one verdict sentence in this exact form:

> `[[FRAMEWORK]]` can support adoption up to Phase {N} in `[[INDUSTRY]]` contexts without significant additional tooling.

Then 4–8 evidence bullets. Each bullet must:
- State a specific, concrete constraint (not a generic observation).
- Name the [[FRAMEWORK]] capability gap or default behaviour that creates the constraint.
- Tie the constraint to the maximum adoption level it implies (Phase N, wave N, or domain-class restriction).
- Reference a specific regulation Article (with number) or named risk-type entry from `[[DOMAIN_FILE]]`.
- Cite the specific Part 6 or Part 7 subsection that produced the constraint, e.g., `(see Part 6 — adoption-metrics)`.

Close with one sentence on the single binding constraint that defines the ceiling.

Across the synthesis bullets, [[ORGANIZATION]] implications must reference at least 5 distinct regulations or risk-types from `[[DOMAIN_FILE]]` — drawn from the 13 upstream subsections you are synthesising over. Do not map all subsections to the same regulation. (This count is verified across the combined file, not per-section.)

#### 3.6.2 — `### Highest-Leverage Single Change`

Identify the one change to [[FRAMEWORK]]'s capabilities, defaults, or outputs that would have the largest positive impact on the adoption ceiling at [[ORGANIZATION]]. Scoped to adoption-ceiling unlock per Parts 6–7 findings (not a remediation roadmap). The change must be:
- Specific: name the command, artefact, mechanism, or capability that would need to be added or modified.
- Grounded: explain precisely which gaps it closes (cite the Part 6 or Part 7 subsection by canonical part number) and which failure modes it mitigates.
- Proportionate: explain why this change unlocks more ceiling than any other single change.

Optionally, name a secondary change that would unlock additional capability but is not the single highest-leverage item.

### 3.7 Closing material — order

After Cross-Document Synthesis closes, append (in this order):

1. **Sources read footer** — italic `*Sources read: ...*`. Merge the lists from 04a and 04b's footers, de-duplicate, and add the synthesis-only inputs (`[[DOMAIN_FILE]]`, optionally `companion/frameworks.md`).
2. **Merged Gap Inventory block** — the de-duplicated `<!-- GAP INVENTORY ... /GAP INVENTORY -->` block built from both siblings (per §2.2). Each row keeps its original `P6` or `P7` part reference. Format:

```
<!-- GAP INVENTORY
- gap-slug-1: {Critical|High|Medium|Low} | {source-doc-slug} | P6 | effort {S|M|L|XL}
- gap-slug-2: {...} | P7 | effort {...}
- gap-slug-3: ...
/GAP INVENTORY -->
```

---

## 4. Hard rules

These rules apply without exception. See `prompt.md` for the canonical severity, weighting, and effort tables — do not re-quote them.

1. **Do not re-read [[FRAMEWORK]] source files to re-derive scores or alignment grades.** Cite 04a and 04b; do not reproduce their Parts. The only permitted re-read is `[[DOMAIN_FILE]]`.
2. **Do not reproduce Part 6 or Part 7.** Quote at most a grade, a gap bullet or a sentence to anchor a synthesis bullet; cite anything longer by heading. 
3. The Cross-Document Synthesis is the only original content authored by 04c. Its bullets must trace to entries in the merged Gap Inventory or to Part 7 contradictions.
4. **Placeholder scan.** Before saving, scan this file for any remaining `[[...]]` patterns. If any remain (including inside quoted material from 04a/04b), STOP and report — the siblings should have substituted them, but if they did not, fixing it here masks the upstream defect.
6. Do not produce a composite [[FRAMEWORK]] score. Part 1 is assembled by agent 09 from the deep files.
7. The `Realistic Adoption Ceiling` verdict sentence must use the exact canonical form. Do not paraphrase.
8. The `Highest-Leverage Single Change` is scoped to *adoption-ceiling unlock*, not a remediation roadmap (Part 11) and not a production red line (Part 9).
10. When cross-referencing, use canonical part numbers (`Part 6`, `Part 7`). The synthesis-level subsection reference form is `Part 6 — <file-slug>` or `Part 7 — <file-slug>`.
11. **Out-of-scope corpus / tracked-files-only.** Do not propagate `[[DOMAIN_FILE]]` content forward outside cited regulations and risk-types. If quoted material from 04a or 04b contains any out-of-scope token, STOP and report — do not silently fix it.
13. **Preflight is non-optional.** If 04a or 04b is missing, empty, or malformed, STOP and report — do not fabricate content.

---

## 5. Self-check before saving

**Do not save the output file until every item below is confirmed.**

- [ ] Preflight passed: 04a and 04b both exist, both pass the completion check (`tail -n 2 <file> | grep -q '<!-- SELF-CHECK: PASSED -->'`), both contain their canonical Part heading.
- [ ] Does the output file's header metadata block contain the substring `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]` (the mandatory provenance line — see `prompt.md`'s Hard rules)?
- [ ] Output file path is `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04c_synthesis.md` with `[[FRAMEWORK_LOWER]]` fully substituted (no literal `[[` remaining in the path).
- [ ] All double-bracket placeholders in the output file content are substituted — scan for any remaining `[[...]]` patterns. Any remaining placeholder triggers STOP-and-report (see hard rule 4).
- [ ] The header block names both sibling source files explicitly.
- [ ] `## Methodology (brief)` is present, ≤120 words, and explicitly states that re-derivation is forbidden.
- [ ] No 04a/04b H1, no 04a/04b `## Methodology`, no 04a/04b `<!-- GAP INVENTORY -->` block, and no 04a/04b `*Sources read: ...*` footer is duplicated inside the combined file's Part 6/Part 7 sections.
- [ ] The Cross-Document Synthesis section is present with both `Realistic Adoption Ceiling at [[ORGANIZATION]]` and `Highest-Leverage Single Change` subsections.
- [ ] The `Realistic Adoption Ceiling` subsection opens with the canonical verdict sentence form, contains 4–8 evidence bullets each citing a Part 6 or Part 7 subsection, and closes with the single-binding-constraint sentence.
- [ ] At least 5 distinct regulations or risk-types from `[[DOMAIN_FILE]]` are referenced across the synthesis. No single regulation accounts for the majority of bullets.
- [ ] Every regulatory citation includes either an Article number, section number, or named risk-register entry.
- [ ] All dates use YYYY-MM-DD format.
- [ ] Zero matches for any out-of-scope-corpus token (`ASDLC`, `APLC`, `IGM`, `AEnt-M`, `AEnt_M`, `intelligence-governance-manifesto`, `agentic-enterprise-manifesto`, `agentic-enterprise`, `agentic-governance-stack`, `manifesto-evolution-plan`, `phase-assessment-checklist`, `asdlc/`, `aplc/`, `agentic-sdlc-handbook`, `asdlc-plan`, `aplc-plan`, `igm-aent-coherence-review`) anywhere in the output file. Every cited source file is tracked by git on the current branch.
- [ ] The output contains NO `## Part 6` and NO `## Part 7` heading, and no upstream subsection reproduced at length. (Agent 09 merges those from 04a/04b.)
- [ ] The output does NOT contain any token from the canonical banned soft-language list in the Universal Prepend Block — both the core list and the extended list, which applies to this agent (04c) — in either quoted or synthesis content.
- [ ] The output does NOT contain a composite [[FRAMEWORK]] score.
- [ ] The output does NOT contain a determinative phase placement (Part 8 territory) or a production-deployment red line (Part 9 territory).
- [ ] A single merged `<!-- GAP INVENTORY ... /GAP INVENTORY -->` block is appended after the synthesis section, with one row per gap (de-duplicated across siblings) and original P6/P7 part references preserved.
- [ ] A single merged `*Sources read: ...*` footer is present at the canonical position (per §3.7).
- [ ] All cross-references to other parts use canonical part numbers (Part 1–Part 14), not file names or agent numbers.

---

*Sources to read: `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04a_adoption.md`; `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04b_companion.md`; `[[DOMAIN_FILE]]` (synthesis citations only); `companion/frameworks.md` (phase-name reference only).*
