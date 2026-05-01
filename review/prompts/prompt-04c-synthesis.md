# Sub-prompt 04c — Adoption & Companion Synthesis (Combined Output + Cross-Document Synthesis)

**Purpose:** Produce the canonical combined output `[[FRAMEWORK_LOWER]]_review_04_adoption_companion.md` for the Agent 04 line of the [[FRAMEWORK]] manifesto review. This agent (04c) is one of three siblings (04a, 04b, 04c). 04a produces Part 6 (adoption alignment); 04b produces Part 7 (companion alignment) with explicit contradictions. 04c (this agent) reads both, lifts their content into a single combined file with heading harmonisation, and adds the Cross-Document Synthesis (Realistic Adoption Ceiling at [[ORGANIZATION]] + Highest-Leverage Single Change). The combined output filename is unchanged from the legacy single-agent version, so downstream consumers (agent 06 building Part 11; agent 08 merging) need no modification.

**Note to orchestrator:** All `[[VARIABLE]]` placeholders in this file must be substituted before this prompt is passed to the agent. If any `[[...]]` pattern remains in your working copy, stop and resolve it before spawning.

**Wave dependency:** Run ONLY after `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04a_adoption.md` and `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04b_companion.md` both exist and are non-empty. Confirm both files satisfy: first 5 lines readable, last 5 lines readable, total line count ≥ 20. **If either file is missing, empty, or fails the readability check, report which file is missing and STOP. Do not attempt to fabricate content for the missing sibling.**

**Cross-prompt scope guards:**
- Do NOT re-read [[FRAMEWORK]] source artefacts to re-derive scores. The verdicts in 04a and 04b are authoritative; lift them verbatim. The only re-reading permitted is `[[DOMAIN_FILE]]` (for synthesis citations) and `companion-frameworks.md` (for any phase-name reference in the ceiling sentence).
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
- `companion-frameworks.md` — for phase-name reference in the ceiling sentence (Phase 1–6 vocabulary). Do not re-derive companion alignment.

### Do NOT read

- `[[FRAMEWORK]]` source artefacts. Re-derivation is forbidden.
- Adoption corpus or companion corpus files (other than `companion-frameworks.md` for phase-name reference). The siblings have already assessed them.
- `[[PRIOR_REVIEWS]]`. Sibling files have already integrated peer comparison if applicable.

---

## 2. Methodology

### 2.1 Preflight (mandatory, before any output)

1. Verify `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04a_adoption.md` exists. Read its first 5 lines and last 5 lines. Confirm total line count ≥ 20. Confirm a `## Part 6 — Adoption Document Alignment` heading is present.
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

### 2.3 Verbatim lifting with heading harmonisation

When transferring Part 6 (from 04a) and Part 7 (from 04b) into the combined file, lift the content **verbatim** with one mechanical transformation:

- The 04a/04b files are stand-alone documents whose top-level heading is H1 (`# `). In the combined file, those become H2 (`## `).
- Inside each lifted section, every heading shifts down by one level: H2 → H3, H3 → H4, H4 → H5. The H3 subsection title `### \`adoption-path.md\` — ...` therefore becomes H4 `#### \`adoption-path.md\` — ...` in the combined file? **No.** The combined file's `## Part 6 — Adoption Document Alignment` heading replaces the 04a top-level heading; the existing H3 subsection headings inside Part 6 (e.g., `### \`adoption-path.md\` — ...`) are kept at H3 because Part 6 is at H2. The same applies to Part 7. Concretely:
  - 04a's `# [[FRAMEWORK]] Agent 04a — Adoption Document Alignment (Part 6)` → drop entirely (replaced by combined header).
  - 04a's `## Methodology` → drop entirely (replaced by combined `## Methodology (brief)` block written by 04c).
  - 04a's `## Part 6 — Adoption Document Alignment` → keep as-is in combined file at H2.
  - 04a's `### \`adoption-path.md\` — ...` H3 subsections → keep as H3.
  - 04a's `#### What the Document Requires` H4 sub-subsections → keep as H4.
  - Same pattern for 04b's Part 7.
- The `<!-- GAP INVENTORY ... /GAP INVENTORY -->` blocks in 04a and 04b are NOT lifted into the body of the combined file. They are extracted (per §2.2) and their contents are merged into a single `<!-- GAP INVENTORY ... /GAP INVENTORY -->` block at the very end of the combined file.
- The `*Sources read: ...*` footers in 04a and 04b are merged into a single `*Sources read: ...*` footer at the bottom of the combined file (above the gap inventory block, or below — see §3.7 for canonical order).

Do not edit substantive content. Do not "improve" wording. Do not rebalance grades. If 04a or 04b contains a placeholder or an obvious error, do NOT silently fix it — flag it in your synthesis as `unverified — sibling output appears inconsistent`.

### 2.4 Realistic Adoption Ceiling (synthesis writing)

Write `### Realistic Adoption Ceiling at [[ORGANIZATION]]` per §3.6.1. Source material:
- The merged Gap Inventory.
- The contradiction bullets from Part 7 (now in the combined file).
- The `[[ORGANIZATION]] Implication` paragraphs from each subsection (for regulatory citations).
- `companion-frameworks.md` — only for phase-name vocabulary in the ceiling sentence.

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

Write the following file exactly. **This is the canonical combined output read by downstream agents (06, 08).**

**File path:** `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04_adoption_companion.md`

Create the `[[FRAMEWORK_LOWER]]/` directory if it does not exist (it should already exist because 04a/04b wrote into it).

### 3.1 Required header

```
# [[FRAMEWORK]] Agent 04 — Adoption & Companion Framework Alignment

**Framework:** [[FRAMEWORK]]
**Version:** [[FRAMEWORK_VERSION]]
**Review date:** <YYYY-MM-DD>
**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]`
**Reviewer:** Agent 04 — composed from Agent 04a (adoption) + Agent 04b (companion) by Agent 04c (<model-name>)
**Methodology:** Evidence-based alignment against the manifesto adoption corpus (7 files) and companion corpus (6 files); every verdict grounded in named [[FRAMEWORK]] artefacts; [[ORGANIZATION]]-specific implications mapped to [[DOMAIN_FILE]] regulations. Parts 6 and 7 lifted verbatim from sibling outputs; Cross-Document Synthesis derived from the merged Gap Inventory.
**Context:** [[ORGANIZATION]] — [[INDUSTRY]]
**Source files:** `[[FRAMEWORK_LOWER]]_review_04a_adoption.md` (Part 6), `[[FRAMEWORK_LOWER]]_review_04b_companion.md` (Part 7).
```

### 3.2 Methodology (brief)

Immediately after the header, produce a `## Methodology (brief)` section (≤120 words). State:
- That Parts 6 and 7 below are lifted verbatim from siblings 04a and 04b.
- That re-derivation of scores or alignment grades is forbidden in this agent.
- That the Cross-Document Synthesis is the only original content produced by 04c.
- Where the merged Gap Inventory came from (the two sibling blocks, de-duplicated).

Do not re-quote the full per-subsection methodology — that lives in 04a and 04b.

### 3.3 Part 6 (lifted verbatim from 04a)

Insert the entire Part 6 section from `[[FRAMEWORK_LOWER]]_review_04a_adoption.md`:
- Begin with `## Part 6 — Adoption Document Alignment` (which exists in 04a).
- Include all seven H3 subsections in the canonical order (adoption-path, adoption-playbook, adoption-enterprise, adoption-metrics, adoption-roles, adoption-pilot, adoption-vmodel).
- Preserve the `Output Lifecycle & Version Migration` sub-subsection inside the adoption-path subsection.
- Preserve the `**Fundamental incompatibility:**` sub-header inside the adoption-vmodel subsection.
- Preserve every alignment grade, gap bullet, severity label, and `[[ORGANIZATION]] Implication` paragraph.
- Do NOT include 04a's top-level H1 header, 04a's `## Methodology` block, 04a's `<!-- GAP INVENTORY ... /GAP INVENTORY -->` block, or 04a's trailing `*Sources read: ...*` footer.

### 3.4 Part 7 (lifted verbatim from 04b)

Insert the entire Part 7 section from `[[FRAMEWORK_LOWER]]_review_04b_companion.md`:
- Begin with `## Part 7 — Companion Framework Alignment` (which exists in 04b).
- Include all six H3 subsections in the canonical order (companion-frameworks, companion-patterns, companion-principles, companion-guide, companion-re-framework, companion-reference).
- Preserve every alignment grade, gap bullet, severity label, `Contradictions` block (including `**Contradiction:** None identified.` where applicable), and `[[ORGANIZATION]] Implication` paragraph.
- Do NOT include 04b's top-level H1 header, 04b's `## Methodology` block, 04b's `<!-- GAP INVENTORY ... /GAP INVENTORY -->` block, or 04b's trailing `*Sources read: ...*` footer.

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

Across all 13 lifted subsections plus the synthesis bullets, [[ORGANIZATION]] implications must reference at least 5 distinct regulations or risk-types from `[[DOMAIN_FILE]]`. Do not map all subsections to the same regulation. (This count is verified across the combined file, not per-section.)

#### 3.6.2 — `### Highest-Leverage Single Change`

Identify the one change to [[FRAMEWORK]]'s capabilities, defaults, or outputs that would have the largest positive impact on the adoption ceiling at [[ORGANIZATION]]. Scoped to adoption-ceiling unlock per Parts 6–7 findings (not a remediation roadmap). The change must be:
- Specific: name the command, artefact, mechanism, or capability that would need to be added or modified.
- Grounded: explain precisely which gaps it closes (cite the Part 6 or Part 7 subsection by canonical part number) and which failure modes it mitigates.
- Proportionate: explain why this change unlocks more ceiling than any other single change.

Optionally, name a secondary change that would unlock additional capability but is not the single highest-leverage item.

### 3.7 Closing material — order

After Cross-Document Synthesis closes, append (in this order):

1. **Sources read footer** — italic `*Sources read: ...*`. Merge the lists from 04a and 04b's footers, de-duplicate, and add the synthesis-only inputs (`[[DOMAIN_FILE]]`, optionally `companion-frameworks.md`).
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

1. **Do not re-read [[FRAMEWORK]] source files to re-derive scores or alignment grades.** Lift Part 6 and Part 7 verbatim from the sibling outputs. The only permissible re-reads are `[[DOMAIN_FILE]]` (for synthesis citations) and `companion-frameworks.md` (for the phase-name in the ceiling sentence).
2. **Do not edit substantive content of Part 6 or Part 7.** Heading-level harmonisation (dropping the sibling H1, the sibling `## Methodology`, the sibling gap inventory, and the sibling sources footer) is permitted; rewording, regrading, or "improvement" of bullets is not.
3. The Cross-Document Synthesis is the only original content authored by 04c. Its bullets must trace to entries in the merged Gap Inventory or to Part 7 contradictions.
4. **Placeholder scan.** Before saving, scan the combined file for any remaining `[[...]]` patterns. If any remain (including in lifted material from 04a/04b), STOP and report — the siblings should have substituted them, but if they did not, fixing it here masks the upstream defect.
5. The output MUST NOT contain the words `consider`, `may`, `could potentially`, `perhaps`, or `use judgement`. If lifted material contains these, STOP and report — fixing them in 04c masks the upstream defect.
6. Do not produce a composite [[FRAMEWORK]] score. Part 1 is owned by agent 01.
7. The `Realistic Adoption Ceiling` verdict sentence must use the exact canonical form. Do not paraphrase.
8. The `Highest-Leverage Single Change` is scoped to *adoption-ceiling unlock*, not a remediation roadmap (Part 11) and not a production red line (Part 9).
9. Use date format YYYY-MM-DD wherever a date appears.
10. When cross-referencing within the combined file, use canonical part numbers (`Part 6`, `Part 7`). The synthesis-level subsection reference form is `Part 6 — <file-slug>` or `Part 7 — <file-slug>`.
11. Do not reference ASDLC, APLC, `asdlc/`, `aplc/`, `asdlc-plan.md`, `aplc-plan.md`, or `agentic-sdlc-handbook/` anywhere in the output. Do not propagate `[[DOMAIN_FILE]]` content forward outside cited regulations and risk-types.
12. Subsection order within each Part is canonical (per the sibling specs) and must not be re-ordered during lifting.
13. **Preflight is non-optional.** If 04a or 04b is missing, empty, or malformed, STOP and report — do not fabricate content.

---

## 5. Self-check before saving

**Do not save the output file until every item below is confirmed.**

- [ ] Preflight passed: 04a and 04b both exist, both have ≥ 20 lines, both contain their canonical Part heading.
- [ ] Output file path is `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04_adoption_companion.md` with `[[FRAMEWORK_LOWER]]` fully substituted (no literal `[[` remaining in the path).
- [ ] All `[[VARIABLE]]` placeholders in the output file content are substituted — scan for any remaining `[[...]]` patterns. Any remaining placeholder triggers STOP-and-report (see hard rule 4).
- [ ] The header block names both sibling source files explicitly.
- [ ] `## Methodology (brief)` is present, ≤120 words, and explicitly states that re-derivation is forbidden.
- [ ] Part 6 has been lifted from 04a verbatim, with the seven canonical H3 subsections in order, the `Output Lifecycle & Version Migration` sub-subsection inside adoption-path, and the `**Fundamental incompatibility:**` sub-header inside adoption-vmodel.
- [ ] Part 7 has been lifted from 04b verbatim, with the six canonical H3 subsections in order, and a `Contradictions` block inside every Part 7 subsection.
- [ ] No 04a/04b H1, no 04a/04b `## Methodology`, no 04a/04b `<!-- GAP INVENTORY -->` block, and no 04a/04b `*Sources read: ...*` footer is duplicated inside the combined file's Part 6/Part 7 sections.
- [ ] The Cross-Document Synthesis section is present with both `Realistic Adoption Ceiling at [[ORGANIZATION]]` and `Highest-Leverage Single Change` subsections.
- [ ] The `Realistic Adoption Ceiling` subsection opens with the canonical verdict sentence form, contains 4–8 evidence bullets each citing a Part 6 or Part 7 subsection, and closes with the single-binding-constraint sentence.
- [ ] At least 5 distinct regulations or risk-types from `[[DOMAIN_FILE]]` are referenced across the combined file. No single regulation accounts for the majority of subsections.
- [ ] Every regulatory citation includes either an Article number, section number, or named risk-register entry.
- [ ] All dates use YYYY-MM-DD format.
- [ ] No references to ASDLC, APLC, `asdlc/`, `aplc/`, `asdlc-plan.md`, `aplc-plan.md`, or `agentic-sdlc-handbook/` appear anywhere in the output file.
- [ ] The output does NOT contain the words `consider`, `may`, `could potentially`, `perhaps`, or `use judgement` (in either lifted or synthesis content).
- [ ] The output does NOT contain a composite [[FRAMEWORK]] score.
- [ ] The output does NOT contain a determinative phase placement (Part 8 territory) or a production-deployment red line (Part 9 territory).
- [ ] A single merged `<!-- GAP INVENTORY ... /GAP INVENTORY -->` block is appended after the synthesis section, with one row per gap (de-duplicated across siblings) and original P6/P7 part references preserved.
- [ ] A single merged `*Sources read: ...*` footer is present at the canonical position (per §3.7).
- [ ] All cross-references to other parts use canonical part numbers (Part 1–Part 13), not file names or agent numbers.

---

*Sources to read: `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04a_adoption.md`; `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04b_companion.md`; `[[DOMAIN_FILE]]` (synthesis citations only); `companion-frameworks.md` (phase-name reference only).*
