# Sub-prompt 02 — Principles

**Purpose.** Produce 12 individual principle-review files — one per manifesto principle (P1–P12) — assessing how well `[[FRAMEWORK]]` satisfies each principle against the Agentic Engineering Manifesto.

**Placeholder reminder.** Before executing this prompt, confirm that every `[[VARIABLE]]` token has been substituted by the orchestrator. If any literal `[[...]]` pattern remains, stop and report it.

---

## 1. Inputs to read

Before scoring any principle, read the following in full. Do not score from memory.

### [[FRAMEWORK]] artefacts
Read every source file that constitutes `[[FRAMEWORK]]` at version `[[FRAMEWORK_VERSION]]`. Include all documentation, rule files, configuration, architecture artefacts, and lifecycle definitions that the framework ships or publishes. Quote exact artefact names, rule identifiers, and phase numbers when making claims.

### Manifesto corpus
Read each of the following files before scoring P1–P12:
- `manifesto.md` — core values and agentic loop definition
- `manifesto-principles.md` — authoritative definitions of P1–P12 (used for **definitions and minimum-bar text only**, NOT for the H1 principle name — see `prompts/prompt-02-principle-template.md`)
- `manifesto-done.md` — Definition of Done, including the seven evidence conditions
- `companion-principles.md` — extended guidance including the specifications-vs-constraints distinction
- `companion-frameworks.md` — boundary conditions and hard autonomy caps by regulated use case
- `adoption-path.md` — incremental adoption order and phase definitions
- `adoption-metrics.md` — rubber-stamping detection and oversight metrics
- `agentic-enterprise.md` — enterprise deployment context
- `beyond-agile-*.md` — any files matching this pattern
- `glossary.md` — canonical term definitions

### Domain file
Read `[[DOMAIN_FILE]]` in full. Map every major finding to a specific regulation or risk type from `[[INDUSTRY]]` that applies to `[[ORGANIZATION]]`. Domain context is not decoration.

### Prior reviews
If `[[PRIOR_REVIEWS]]` is not `none`, read those files for peer comparison. Note where `[[FRAMEWORK]]` diverges from prior-reviewed frameworks on the same principle.

---

## 2. Methodology

Apply the following procedure for each principle P1 through P12, in order.

### 2a. Scoring
Score each principle 0–100 (integer only, no decimals). Use the weighting and severity thresholds defined in `prompt.md` — refer to those tables in `prompt.md`; do NOT re-quote them in this prompt or in the produced files. State the score in the H1 heading and again in the `## Score rationale` section. The two scores MUST match.

For each principle:
1. State evidence-for (what `[[FRAMEWORK]]` demonstrably does that satisfies this principle) separately from evidence-against (what is absent, partial, or wrong). These map to required sections: evidence-for is captured in `## What works`; evidence-against is captured in `## Where it fails the manifesto's bar`. Do not add a separate `Evidence` section.
2. Quote exact rule text, phase names, artefact filenames, or command names from `[[FRAMEWORK]]`'s own source files when claiming it asserts or fails to assert something. Every claim about `[[FRAMEWORK]]` MUST quote verbatim from a named source file with its path. Paraphrase is not evidence.
3. Do not praise undemonstrated capability. Do not penalise out-of-scope problems — but flag any scope gap explicitly.
4. Map the score to a severity label using the threshold table in `prompt.md`.

### 2b. Client-specific mapping
For the `## [[ORGANIZATION]]-specific implications` section, tie each bullet to a specific regulation or risk type from `[[DOMAIN_FILE]]` and `[[INDUSTRY]]`. Each bullet MUST cite at least one specific regulation, clause number, or risk framework (e.g., `DORA Art. 9`, `SR 11-7 §IV.A`, `Solvency II Art. 121`, `EU AI Act Art. 12`). Generic regulatory references ("GDPR compliance") are not acceptable.

### 2c. Banned soft language
Output MUST NOT contain the words `consider`, `may`, `could potentially`, `perhaps`, or the phrase `use judgement`. Use declarative form (`is`, `is not`, `does not`, `is absent`, `enforces`, `fails to enforce`).

---

## 3. Per-principle output format

Load `prompts/prompt-02-principle-template.md` and apply it for each principle. Substitute the orchestrator's `[[VARIABLE]]` placeholders before applying.

The template defines: file path, H1 format with canonical principle names, required sections (`## What [[FRAMEWORK]] asserts about this principle`, optional principle-specific test, `## What works`, `## Where it fails the manifesto's bar`, `## [[ORGANIZATION]]-specific implications`, `## Score rationale`), the mandatory principle-specific test sections for P1/P3/P5/P8/P9/P12, evidence requirements (verbatim quote + file path), and the intra-file score consistency rule. Do not duplicate that content here.

---

## 4. Sequencing and idempotence (operationalised)

- Write P1 first, then P2, then P3, ..., then P12. Do not reorder.
- **Before writing P{N}**, check if `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p{N}.md` exists and has a `## Score rationale` section (Glob the path, then Read the last 20 lines). If yes and complete, skip. If the file exists but appears truncated (no `## Score rationale`), delete it and rewrite from scratch.
- After writing each file, verify that the score in the H1 line equals the score stated in `## Score rationale`. If they differ, correct both before proceeding to the next principle.

---

## 5. Score consistency rules

### 5a. Intra-file
The score in `# P{N} — ... | **{score}/100**` MUST be numerically identical to the score stated in `## Score rationale`. If they differ, resolve before saving that file. (This rule is also stated in the per-principle template — keep both in sync.)

### 5b. Cross-file (Wave 1 coordination)
This sub-prompt and the Overview sub-prompt run in Wave 1 simultaneously. The Part 1 table in the Overview output is the AUTHORITATIVE consumer of per-principle scores; ensure this agent's 12 files use scores that are internally consistent and reproducible from the evidence cited.

In practice: this agent produces the 12 per-principle files, and the Overview agent reads them to populate the Part 1 table — so the Overview agent is the downstream consumer. Do NOT independently derive different scores. Part 12 (merge) will detect mismatches.

---

## 6. Hard rules

These rules apply to every principle file without exception.

- **Read `[[FRAMEWORK]]`'s source files before scoring each principle.** Do not score by analogy from a previously scored principle.
- **Use the canonical principle name from `prompt.md`'s weighting table** in the H1 heading (the per-principle template at `prompts/prompt-02-principle-template.md` lists all twelve verbatim).
- **Quote exact rule text, command names, or artefact names from `[[FRAMEWORK]]`** when claiming it asserts (or fails to assert) something. Inline code (file paths, command names, rule identifiers) MUST be enclosed in backticks. You may not cite an artefact you have not read or located via Read/Grep/Glob.
- **No praise for undemonstrated capability.** If a capability is in a roadmap, planned, or under development but not operational, mark it `_[Planned, not operational]_` and assign it zero score weight.
- **No penalty for out-of-scope problems.** If a gap exists outside `[[FRAMEWORK]]`'s stated scope, mark it `*[Scope gap]*` explicitly and do not deduct from the score.
- **YYYY-MM-DD** date format wherever a date appears.
- **Cross-references** use canonical part numbers per `prompt.md`'s part-numbering table (e.g., "see Part 12"). Do not use file names or agent numbers.
- **Do not reference ASDLC, APLC, `asdlc/`, `aplc/`, or `agentic-sdlc-handbook/`** anywhere in any output file.
- **Do not propagate `[[DOMAIN_FILE]]` content forward beyond what is needed for principle-level regulatory citation.** Do not embed full domain-file passages, do not derive ASDLC/APLC roadmaps, and do not invent domain bridges that are not present in `[[DOMAIN_FILE]]`.
- **Do not compute or report an overall composite score** in any of the 12 files; that is the Overview agent's responsibility.
- **Do not include a `Gap to Next Level` section.** That section is produced by the Maturity agent (Part 8).

---

## 7. Self-check — HARD GATE before saving each file

**Do not save ANY output file until every item below is satisfied for THAT file.** Each item is binary yes/no. If any item fails, fix the file content and re-verify before saving.

- [ ] The file is named `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p{N}.md`.
- [ ] The H1 line ends with the literal pattern ` | **NN/100**` (single space, single pipe, single space, double-asterisk, integer 0–100, slash, `100`, double-asterisk).
- [ ] The principle name in the H1 heading is taken verbatim from `prompt.md`'s weighting table (the list in `prompts/prompt-02-principle-template.md` §2) — NOT from `manifesto-principles.md`.
- [ ] The score in `## Score rationale` is numerically identical to the score in the H1 heading.
- [ ] The severity label in `## Score rationale` matches the threshold band of that file's score per `prompt.md`'s thresholds table.
- [ ] If P1, the file contains `## Seven-Condition DoD Test` placed immediately after `## What [[FRAMEWORK]] asserts about this principle`.
- [ ] If P3, the file contains `## Blast-Radius Test` AND the verbatim Part 12 cross-reference placeholder line `> *[Part 12 cross-reference — see Part 12 guardrails assessment; resolved at merge time]*`.
- [ ] If P5, the file contains `## Tier Assessment`.
- [ ] If P8, the file contains `## Seven-Condition DoD Test (Evaluation Edition)`.
- [ ] If P9, the file contains `## Does [[FRAMEWORK]]'s observability cover reasoning or only execution?` (with `[[FRAMEWORK]]` substituted, NOT a hardcoded prior framework name).
- [ ] If P12, the file contains `## Structured Recovery Test` and the score lies in the binding-constraint band that matches the count of fully-passing steps.
- [ ] No occurrence of the literal substrings `[[` or `]]` anywhere in the file (all placeholders substituted).
- [ ] No occurrence of the words `ASDLC`, `APLC`, `asdlc`, `aplc`, or `agentic-sdlc-handbook` anywhere in the file.
- [ ] No occurrence of any prior-framework name from a reference set (e.g., `abcd`) unless `[[FRAMEWORK]]` itself resolves to that name.
- [ ] No occurrence of the banned soft-language tokens `consider`, `may`, `could potentially`, `perhaps`, `use judgement` anywhere in the file.
- [ ] Every bullet in `## What works` and `## Where it fails the manifesto's bar` cites at least one named `[[FRAMEWORK]]` artefact in backticks.
- [ ] Every bullet in `## Where it fails the manifesto's bar` (i) quotes the manifesto's actual requirement verbatim from `manifesto-principles.md` and (ii) shows what `[[FRAMEWORK]]` is missing.
- [ ] Every bullet in `## [[ORGANIZATION]]-specific implications` cites a specific regulation, article, clause number, or risk framework from `[[DOMAIN_FILE]]`.
- [ ] All dates in the file are in `YYYY-MM-DD` format.
- [ ] All cross-references use canonical part numbers per `prompt.md`'s part-numbering table; no agent numbers or file names appear in cross-references.
