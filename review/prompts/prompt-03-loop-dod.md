# Sub-prompt 03 — Loop & DoD

**Purpose:** Produce a rigorous, evidence-grounded assessment of how well `[[FRAMEWORK]]` implements each phase of the Agentic Loop and satisfies each condition of the Agentic Definition of Done, mapped to `[[INDUSTRY]]` regulatory risk.

**Placeholder reminder:** Before executing, verify that every `[[...]]` token in this file has been replaced by the orchestrator. If any placeholder is still literal text, stop and report it.

**Canonical references (do not duplicate inline):**
- Severity thresholds — see `prompt.md` "Severity thresholds".
- Score weighting scheme — see `prompt.md` "Score weighting scheme".
- Effort sizing — see `prompt.md` "Effort sizing".

Do not re-quote these tables in this prompt or in the output. Reference them by name.

---

## 1. Inputs to Read

Read the following before writing a single score. Do not score from memory or assumption.

**`[[FRAMEWORK]]` artefacts** — read all source files, configuration, phase-gate logic, and any lifecycle enforcement mechanisms. For every claim made in the output about `[[FRAMEWORK]]`'s behaviour, the supporting evidence MUST be a verbatim quote from a named source file with its path. Pay particular attention to: specification artefacts, phase gate definitions, verification mechanisms, feedback modules, observability plugins, governance and audit trail mechanisms, and any escalation or approval workflows.

**Manifesto corpus:**
- `manifesto/manifesto.md` — for the nine Agentic Loop phase definitions (Specify / Design / Plan / Execute / Verify / Validate / Observe / Learn / Govern), the loop-readiness gate ("What Must Be True Before Entering Specify" — nine conditions before entry), and the Govern completion conditions.
- `manifesto/manifesto-done.md` — for the seven Agentic DoD conditions (Shipped / Observable / Verified / Provable / Learned from / Governed / Economical), the Hardening Steps (Capture / Extract Specification / Build Evaluation Portfolio / Verify and Refactor), the evidence bundle requirements (agentic provenance record, bundle integrity attestation, security static analysis, evidence freshness rules).
- `manifesto/manifesto-principles.md` plus the matching `manifesto/manifesto-principles-0N.md` shard — for the four oversight patterns (HITL/HOTL/HOLL/EDL) that bear on the Govern phase and the Human Escalation Architecture sub-section.
- **Evidence Quality Gate (apply throughout).** Every piece of evidence cited in Loop or DoD scoring must be Attributable (named agent/tool + named accountable human), Contemporaneous (recorded during the work, not reconstructed), Queryable (retrievable without heroic manual effort), and Bound-to-outcome (clearly linked to the change/decision/action). Apply this gate regardless of phase; evidence that fails the gate cannot raise a score.

**Cross-stack normative artefacts (lift only the AEM-relevant content; apply the scope guard from `prompt.md`):**
- `governance/evidence-bundle-schema.md` — read the `aem_components` section. Use it to score the DoD's evidence-bundle conditions and the agentic provenance record.
- `governance/integrated-audit-trail.md` — read the AEM execution trace section. Use it to score the **Observe** phase, the DoD **Observable** condition, and the Human Escalation Architecture sub-section.
- `governance/governance-integration-note.md` — read the AEM Tier 4 binary policy envelope section. Use it to score the **Govern** phase Tier 4 prerequisites.
- `governance/authority-accountability-matrix.md` — read the AEM column. Use it for the Human Escalation Architecture sub-section.
- `integration/loop-readiness-for-agent-opportunities.md` — use it to score the **Specify** phase's handling of agent-surfaced opportunities against AEM's nine-condition loop-readiness gate.
- `integration/low-consequence-resolution.md` — use it to score the **Govern** phase per-action accountability bar for low-consequence actions (AEM has no consequence-class carve-out).
- `operational-templates/slo-table.md` — use it to score the DoD **Observable** and **Governed** conditions (feedback-loop closure SLOs, waiver-expiry SLOs).
- `operational-templates/agent-inventory-schema.md` — use it to score the DoD **Governed** condition (registered estate is a precondition for governance).
- `operational-templates/agentic-provenance-record.json` — JSON Schema for the agentic provenance record. Use it to bind DoD `Verified` and the agentic-provenance-record requirement in `manifesto/manifesto-done.md`.
- `operational-templates/control-state-record.json` — JSON Schema for the Control State Record. Use it to score the DoD `Governed` condition (`manifesto/manifesto.md` What the Loop Produces).
- `operational-templates/evidence-bundle.json` — JSON Schema for the Evidence Bundle envelope. Use it to anchor DoD `Verified` evidence-bundle scoring (complement to `governance/evidence-bundle-schema.md`).

**Domain file:** `[[DOMAIN_FILE]]` — read in full. Map every major finding to a specific regulation or risk type identified in this file by article or section number. Do not forward-propagate content from `[[DOMAIN_FILE]]` into `[[FRAMEWORK]]` claims; the framework's behaviour is established only from `[[FRAMEWORK]]`'s own artefacts.

**Prior reviews:** `[[PRIOR_REVIEWS]]` — read if not `none`. Use for peer comparison only; do not let prior scores anchor your own.

---

## 2. Methodology

### 2.1 Agentic Loop Phase Analysis

For each of the nine phases in order (Specify, Design, Plan, Execute, Verify, Validate, Observe, Learn, Govern):

1. Re-read the phase definition in `manifesto/manifesto.md` to establish the bar before assessing `[[FRAMEWORK]]`. **For Specify**, also assess `[[FRAMEWORK]]`'s handling of the loop-readiness gate (the nine conditions in "What Must Be True Before Entering Specify"): does `[[FRAMEWORK]]` reject or accept work that lacks a validated business need, measurable value, expressible acceptance criteria, identified constraints, named accountable human, blast-radius assessment, or explicit out-of-scope statement? Cross-reference `integration/loop-readiness-for-agent-opportunities.md` for handling of agent-surfaced opportunities. **For Observe**, anchor to the AEM execution trace section of `governance/integrated-audit-trail.md` and the governance-state observability minimum bar in P9. **For Govern**, anchor explicitly to the Govern completion conditions in `manifesto/manifesto.md` (no outstanding policy violations, accountability signals within threshold, economics review recorded, architectural decisions filed back to Design, tool invocations confirmed within authorised scope), and — if `[[FRAMEWORK]]` claims or supports Tier 4 — to the four Tier 4 prerequisites in the P5 shard and `governance/governance-integration-note.md`.
2. Identify every artefact, function, gate, or mechanism in `[[FRAMEWORK]]` that corresponds to this phase. Name the files and rule text explicitly with full path.
3. Quote verbatim, with the source file path, at least one passage from a `[[FRAMEWORK]]` source file that directly supports the score.
4. Quote verbatim, with the source file path, the relevant phase definition from `manifesto/manifesto.md`.
5. Assess the gap: name the specific missing artefact, mechanism, or process that `manifesto/manifesto.md` requires and `[[FRAMEWORK]]` does not demonstrably provide.
6. Assign a score 0–100 (whole integer only) and state evidence for and evidence against separately.
7. Apply the canonical severity thresholds defined in `prompt.md`.
8. Map the finding to a specific regulation or risk type from `[[DOMAIN_FILE]]` / `[[INDUSTRY]]`, citing the regulation by article or section number.

### 2.2 Cross-Phase Failure Modes

After scoring all nine phases, identify cross-phase failure modes: where the loop breaks between consecutive or non-consecutive phases. Name at least five distinct failure modes. Each must cite at least two specific `[[FRAMEWORK]]` artefacts (file path + function or rule identifier) and at least one regulation by article.

### 2.3 Agentic Definition of Done Assessment

For each of the seven DoD conditions, in canonical order (Shipped, Observable, Verified, Provable, Learned from, Governed, Economical):

1. Re-read the condition definition in `manifesto/manifesto-done.md` before assessing.
2. Quote verbatim, with the source file path, at least one passage from `manifesto/manifesto-done.md` that directly defines the bar for this condition.
3. Quote verbatim, with the source file path, at least one passage from a `[[FRAMEWORK]]` source file that directly supports the score.
4. Assess `[[FRAMEWORK]]`'s implementation: what exists, what is absent, what is present but insufficient.
5. Assign a score 0–100 (whole integer only).
6. Map to a specific regulation or risk from `[[DOMAIN_FILE]]` / `[[INDUSTRY]]` by article or section number.

### 2.4 DoD Hardening Test

Describe a single concrete audit scenario (e.g., a regulator requests evidence post-incident). For each of the seven DoD conditions, state: (a) what evidence `[[FRAMEWORK]]` would produce, (b) what is missing, (c) Pass / Partial / Fail verdict. Conclude with overall pass/fail and the single largest evidence gap. Use the literal phrase "Hardening is complete." or "Hardening is not complete." in the closing sentence.

### 2.5 Industry-Specific DoD Requirements

This section is ALWAYS required when `[[DOMAIN_FILE]]` specifies a regulated industry. There is no score floor. For each DoD condition where `[[DOMAIN_FILE]]` identifies a specific regulatory obligation, describe the obligation by name and article/section, the gap in `[[FRAMEWORK]]`'s current implementation, and the consequence for `[[ORGANIZATION]]`.

### 2.6 Human Escalation Architecture

Assess `[[FRAMEWORK]]`'s escalation triggers, escalation path, response time SLAs, and fitness for `[[ORGANIZATION]]`'s regulatory context. Required content is specified in §3.

---

## 3. Output Specification

Write the output to: `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03_loop_dod.md`

The file must contain exactly the following structure.

H1 title (literal, except `[[FRAMEWORK]]` substitution):

```
# [[FRAMEWORK]] Review 03 — Agentic Loop Phase Analysis & Definition of Done
```

Followed by a header metadata block (use these exact field labels):

```
**Framework:** [[FRAMEWORK]]
**Client context:** [[ORGANIZATION]]
**Regulatory overlay:** [[INDUSTRY]]
**Reviewer date:** YYYY-MM-DD
**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]`
**Source artefacts read:** <list every file actually read>
```

### Part 4 — Agentic Loop Phase Analysis

Open with a paragraph (3–5 sentences) characterising `[[FRAMEWORK]]`'s overall relationship to the nine-phase loop. The paragraph must (a) state whether the mapping is direct, partial, or a structural mismatch; (b) name the framework's own phase-level construct verbatim; and (c) state which manifesto phases have no `[[FRAMEWORK]]` counterpart.

Then one subsection per phase, in canonical order, using this exact heading format (single pipe, single bold):

```
### Specify | **{score}/100**
### Design | **{score}/100**
### Plan | **{score}/100**
### Execute | **{score}/100**
### Verify | **{score}/100**
### Validate | **{score}/100**
### Observe | **{score}/100**
### Learn | **{score}/100**
### Govern | **{score}/100**
```

Each phase subsection must contain exactly three labelled paragraphs in this order, in prose only — do not use bullets:

```
**What [[FRAMEWORK]] does.** [1 paragraph; include verbatim quote from a [[FRAMEWORK]] source file with path; name specific files and functions]
**What the manifesto requires.** [1 paragraph; quote the relevant manifesto/manifesto.md phase definition verbatim with path]
**The gap.** [1 paragraph; name the specific missing artefact/mechanism; tie back to [[INDUSTRY]] regulation by article or section]
```

After the nine phase subsections, include the following two subsections (both at `###` heading depth):

```
### Cross-Phase Failure Modes
```

A list of at least five distinct failure modes. Each must use this exact format:

```
- **{Phase A}→{Phase B}:** {what breaks} — [[FRAMEWORK]] artefact `{file}` fails to bridge because {reason}. Severity: {Critical/High/Medium/Low}.
```

Each failure mode must cite at least two `[[FRAMEWORK]]` artefacts (file path + function or rule identifier) and at least one regulation by article.

```
### Human Escalation Architecture
```

Four required sub-paragraphs, in this order, each labelled:

- **Escalation triggers** — conditions under which `[[FRAMEWORK]]` requires human intervention. Cite specific artefacts.
- **Escalation path** — named roles and steps within `[[FRAMEWORK]]`'s artefacts (or state their absence).
- **Response time** — documented SLA or timeout. Cite the artefact or state absence.
- **Fitness for `[[ORGANIZATION]]` context** — regulatory mandate (DORA, SR 11-7, Solvency II, EU AI Act, GDPR, or whichever obligations `[[DOMAIN_FILE]]` names) and gap. Enumerate at least four named regulatory obligations from `[[DOMAIN_FILE]]`.

### Part 5 — Agentic Definition of Done Assessment

#### DoD Condition Table

A markdown table with exactly four columns and seven rows (in canonical order: Shipped, Observable, Verified, Provable, Learned from, Governed, Economical):

```
| Condition | Score | Evidence For | Evidence Against |
```

#### Condition Narratives

One focused paragraph per condition (in the same order as the table). Each paragraph must: state the score, quote verbatim (with path) at least one supporting `[[FRAMEWORK]]` artefact passage, identify the gap against `manifesto/manifesto-done.md` with a verbatim quote (with path), and note the severity using the canonical thresholds in `prompt.md`.

#### DoD Hardening Test

Describe a single concrete audit scenario (e.g., a regulator requests evidence post-incident). For each of the seven DoD conditions, state: (a) what evidence `[[FRAMEWORK]]` would produce, (b) what is missing, (c) Pass / Partial / Fail verdict. Conclude with overall pass/fail and the single largest evidence gap. The closing sentence must be the literal phrase "Hardening is complete." or "Hardening is not complete."

#### Industry-Specific DoD Requirements

ALWAYS required when `[[DOMAIN_FILE]]` specifies a regulated industry. For each DoD condition where `[[DOMAIN_FILE]]` identifies a specific regulatory obligation (Solvency II model governance, DORA ICT risk management, SR 11-7 independent validation, EU AI Act Article 12 logging, GDPR Article 22 HITL, ALCOA+ data integrity, retention-period requirements, model-risk traceability, or any other obligation named in `[[DOMAIN_FILE]]`), provide a sub-paragraph covering:
- The regulatory obligation by name and article/section.
- The specific gap in `[[FRAMEWORK]]`'s current implementation.
- The consequence for `[[ORGANIZATION]]` in `[[INDUSTRY]]`.

---

## 4. Hard Rules

- **Read first, score second.** Every score must be grounded in a named file, rule, or function from `[[FRAMEWORK]]`'s own artefacts and from the manifesto's source files. Do not rely on prior knowledge of either.
- **Verbatim quotes are mandatory.** For every phase and every DoD condition, include at least one verbatim quote from a `[[FRAMEWORK]]` source file (with path) that directly supports the score, and at least one verbatim quote from `manifesto/manifesto.md` or `manifesto/manifesto-done.md` (with path) that establishes the bar.
- **Whole integer scores only.** Scores are 0–100. No decimals, no half-points.
- **Evidence for and evidence against.** Both must be stated for every score. The DoD Condition Table is the canonical home for DoD evidence; per-phase narratives carry phase evidence.
- **No praise for undemonstrated capability.** If a mechanism is planned or documented but not present in the current codebase, flag it as planned-not-shipped and score accordingly.
- **No penalty for out-of-scope gaps.** If a phase or condition is explicitly outside `[[FRAMEWORK]]`'s stated scope, note the scope gap without penalising; but score what is absent, not what is claimed.
- **Score consistency invariant.** Part 4 per-phase scores and Part 5 per-condition scores MUST equal the corresponding rows in agent 01's Part 1 tables. Agent 03 is the authoritative source for Loop and DoD scores. Agent 01 reads these files to populate Part 1. Agent 09 (merge) detects mismatches.
- **Dates in YYYY-MM-DD format** everywhere a date appears.
- **Cross-references use canonical part numbers** (e.g., "see Part 3", "see Part 12"). Do not use file names or agent numbers in cross-references within the output content.
- **No references to out-of-scope corpora or untracked files.** Every source file cited MUST be tracked by git on the current branch. Do not read or cite `asdlc/`, `aplc/`, `agentic-sdlc-handbook/`, `intelligence-governance-manifesto/`, `agentic-enterprise-manifesto/`, `agentic-enterprise.md`, `agentic-enterprise.html`, `agentic-governance-stack.md`, `agentic-governance-stack.html`, `manifesto/manifesto-evolution-plan.md`, `manifesto-evolution-plan.html`, `phase-assessment-checklist.md`, `phase-assessment-checklist.html`, `asdlc-plan*`, `aplc-plan*`, or `igm-aent-coherence-review*` anywhere in the output. The output MUST contain zero matches for the tokens `ASDLC`, `APLC`, `IGM`, `AEnt-M`, `AEnt_M`, `intelligence-governance-manifesto`, `agentic-enterprise-manifesto`, `agentic-enterprise`, `agentic-governance-stack`, `manifesto-evolution-plan`, `phase-assessment-checklist`, or `agentic-sdlc-handbook`.
- **No forward-propagation from `[[DOMAIN_FILE]]` into framework claims.** Use `[[DOMAIN_FILE]]` only to establish regulatory obligations. Never assert that `[[FRAMEWORK]]` implements behaviour by extrapolating from `[[DOMAIN_FILE]]`.
- **Banned soft language.** The output MUST NOT contain `consider`, `may`, `could potentially`, `perhaps`, or `use judgement`. Make claims with evidence or do not make them.
- **Severity labels must use the canonical thresholds** defined in `prompt.md`.

---

## 5. Self-Check Before Writing

**Do not save the output file until every item below is confirmed.**

- [ ] All 9 Agentic Loop phases are scored with an explicit whole-integer numeric score.
- [ ] All 7 Agentic DoD conditions are scored with an explicit whole-integer numeric score.
- [ ] Each phase subsection contains exactly the three labelled paragraphs `**What [[FRAMEWORK]] does.**`, `**What the manifesto requires.**`, `**The gap.**`, in this order, with no bullets.
- [ ] Each phase subsection contains at least one verbatim quote from a `[[FRAMEWORK]]` source file with its path.
- [ ] Each phase subsection contains at least one verbatim quote from `manifesto/manifesto.md` with its path.
- [ ] Each phase subsection cites a regulation by article or section number from `[[DOMAIN_FILE]]`.
- [ ] Cross-Phase Failure Modes section contains at least 5 items, each in the mandated format `- **{Phase A}→{Phase B}:** ...`, each citing at least two `[[FRAMEWORK]]` artefacts and at least one regulation by article.
- [ ] Human Escalation Architecture section contains all four labelled sub-paragraphs (Escalation triggers, Escalation path, Response time, Fitness for `[[ORGANIZATION]]` context) with at least four named regulatory obligations in the Fitness paragraph.
- [ ] DoD Condition Table has exactly 4 columns (Condition | Score | Evidence For | Evidence Against) and 7 rows in canonical order.
- [ ] Each condition narrative contains at least one verbatim quote from a `[[FRAMEWORK]]` source file with its path and at least one verbatim quote from `manifesto/manifesto-done.md` with its path.
- [ ] DoD Hardening Test names all 7 DoD conditions and assigns Pass / Partial / Fail to each, ending with the literal phrase "Hardening is complete." or "Hardening is not complete."
- [ ] Industry-Specific DoD Requirements section is present and references named articles/sections from `[[DOMAIN_FILE]]`.
- [ ] Part 4 per-phase scores and Part 5 per-condition scores match the corresponding rows of agent 01's Part 1 tables (or this file is treated as authoritative and agent 01 will reconcile).
- [ ] All dates are in YYYY-MM-DD format.
- [ ] No remaining `[[...]]` placeholders appear in the output.
- [ ] No out-of-scope-corpus references appear anywhere in the output (zero matches for `ASDLC`, `APLC`, `IGM`, `AEnt-M`, `AEnt_M`, `intelligence-governance-manifesto`, `agentic-enterprise-manifesto`, `agentic-enterprise`, `agentic-governance-stack`, `manifesto-evolution-plan`, `phase-assessment-checklist`, `asdlc/`, `aplc/`, `agentic-sdlc-handbook`, `asdlc-plan`, `aplc-plan`, or `igm-aent-coherence-review`). Every cited source file is tracked by git on the current branch.
- [ ] No banned soft language (`consider`, `may`, `could potentially`, `perhaps`, `use judgement`) appears.
- [ ] Header metadata block uses exactly the labels `Framework`, `Client context`, `Regulatory overlay`, `Reviewer date`, `Source artefacts read` and lists every source artefact actually read.
- [ ] Every score states evidence for and evidence against separately.
- [ ] Canonical severity thresholds and weighting (referenced from `prompt.md`, not duplicated) are used consistently throughout.
