# Sub-prompt 01 — Overview

**Purpose:** Produce the overview file for a [[FRAMEWORK]] Agentic Engineering Manifesto alignment review, covering overall scores, scoring methodology, a framing-warning header, principle-by-principle score rationale, and client/industry-specific observations.

**Wave:** Wave 1a. This prompt runs in parallel with prompts 02-p1..p12, 03a, 03b, 03c, 03d, 04a, 04b, 05a, 07, and 08a. Agent 03e (Part 4) runs later, in Wave 1b, because the Definition of Done is phase-calibrated and 03e needs agent 05a's Maturity Verdict. It cannot read their outputs. Use canonical Part numbers ("see Part 12") for any cross-reference whose target is produced by another agent — agent 09 (merge) will resolve cross-references at synthesis time.

**Note to orchestrator:** All double-bracket placeholders in this file must be substituted before this prompt is passed to the agent. If any `[[...]]` pattern remains in your working copy, stop and resolve it before spawning.

---

## 1. Inputs — read all before scoring

Read the mandatory files below in full before producing any scores. Do not score from memory. Do not proceed if any mandatory file is inaccessible.

### [[FRAMEWORK]] source artefacts

Read every source file in `[[FRAMEWORK_PATH]]` end-to-end — this is `[[FRAMEWORK]]`'s own source tree, never `[[FRAMEWORK_LOWER]]/` (this review's own output directory). At a minimum this includes:

- The primary README (or equivalent top-level documentation file).
- All core module source files, configuration schemas, and lifecycle rule files.
- Any CHANGELOG, version history, or release notes available.
- Any internal rules, patterns, or architectural decision records included with the framework.

Score only against artefacts and capabilities present at `[[FRAMEWORK_VERSION]]`. Unmerged or unreleased work (epics in progress, ADRs in `Proposed` rather than `Accepted` state, features behind disabled feature flags, design documents not yet implemented) MUST be noted as "planned / unreleased" in the score rationale, not counted toward the score.

### Manifesto corpus

The Agentic Engineering Manifesto (AEM) corpus is the body this review scores against. The mandatory list below is scoped to what this overview agent needs; everything else in the corpus is available as optional context and carries no reading obligation.

**Mandatory (read each end-to-end — abort if missing):**
- `manifesto/manifesto.md` — core values, the Agentic Loop definition (Specify / Design / Plan / Execute / Verify / Validate / Observe / Learn / Govern), the loop-readiness gate ("What Must Be True Before Entering Specify"), the six-phase maturity model, and the evidence-backed deployable definition.
- `manifesto/manifesto-principles.md` — the twelve-principle index: the canonical principle set, the values-to-principles mapping, and the sequencing dependencies (P2→P8, P3→P5, P6→P7, P9→P12). This is the basis for naming and ordering all twelve principles in the Manifesto Principles Table; the numbered shards carrying each principle's minimum bar are listed under Optional context below.
- `manifesto/manifesto-done.md` — the Agentic Definition of Done (Loop-Complete / Traceable / Verified / Provable / Learned from / Governed / Economical / Within Service Envelope), the four-step Hardening DoD, the agentic provenance record, the bundle integrity attestation, and the evidence freshness rules.
- `glossary.md` — canonical term definitions.
- `companion/frameworks.md` — six-phase maturity spectrum failure modes, hard autonomy caps by regulated use-case. This is the basis for the Maturity Phase Verdict (§ 2.6).
- `manifesto/manifesto-principles-05.md` — the P5 autonomy-as-permission-ceiling minimum bar and tier definitions, which the Maturity Phase Verdict and the industry hard-cap discussion both depend on.

If any of the six files above cannot be read, abort and report the missing file. Do not proceed with scoring.

### Optional context (consult only if a specific finding requires it)

The files below carry **no reading obligation**. This agent produces the overview (Parts 1 and 2) and **emits no scores** — see "This agent does not score" in §2.1; agent 09 fills every Score and Severity cell from the authoritative deep files.

**Manifesto principle shards:**
- `manifesto/manifesto-principles-01.md` through `manifesto/manifesto-principles-12.md` — each principle's full statement, minimum bar, the four oversight patterns (HITL/HOTL/HOLL/EDL), and its sequencing dependencies. Consult the matching shard when writing that principle's rationale paragraph. (`manifesto-principles-05.md` is mandatory above.)

**Companion corpus:**
- `companion/guide.md` — extended rationale and companion guidance index, Annotated Agent Configuration Template.
- `companion/principles.md` plus `companion/principles-01.md` through `companion/principles-12.md` — specifications-vs-constraints distinction, structural vs. behavioural regression, probability compounding, blast-radius management, accountability paradox.
- `companion/patterns.md` — worked failure-mode patterns (Patterns A–H, Hallucination Loop, Operational Recovery Cycle).
- `companion/re-framework.md` — requirements engineering paradigm break for agentic systems.
- `companion/reference.md` — failure modes of the manifesto (over-governance, evidence theater, control theater, etc.).

**Adoption corpus:**
- `adoption/path.md` — 7-step incremental adoption path and Phase 3→4 / Phase 4→5 transitions.
- `adoption/playbook.md` — business case, supervision paradox, Agile-to-agentic ceremony conversion.
- `adoption/enterprise.md` — enterprise wave model and six readiness dimensions.
- `adoption/metrics.md` — team health metrics, oversight-adequacy metrics, rubber-stamping detection.
- `adoption/roles.md` — role evolution through phase transitions.
- `adoption/pilot.md` — pilot selection, structure, success criteria.
- `adoption/vmodel.md` — Agentic V-Model transition framework, ALCOA+ properties.

**Beyond-Agile context (contextual framing for agentic delivery beyond Agile / DevOps):**
- `beyond-agile/main.md` — primary framing.
- `beyond-agile/landscape.md` — landscape of agentic delivery vs prior software-delivery paradigms.
- `beyond-agile/failures.md` — failure modes of carrying Agile assumptions into agentic delivery.
- `beyond-agile/sources.md` — references and sources.

**Governance corpus (apply the scope guard from `prompt.md` if consulted):**
- `governance/aem-principle-coverage-map.md` — for the AEM principle landscape and where extension layers attach. Treat the IGM/AEnt-M columns as out-of-scope context only.
- `governance/governance-integration-note.md` — Tier 4 binary policy envelope (AEM column).
- `governance/composition-rule.md` — AEM autonomy-tier gate as one of three composition gates.
- `governance/evidence-bundle-schema.md` (and the companion JSON schema `governance/evidence_bundle.schema.json`) — `aem_components` section of the unified evidence bundle.
- `governance/integrated-audit-trail.md` — AEM execution trace.
- `governance/phase-level-matrix.md` — AEM Phase 1–6 with maximum autonomy tier table.
- `governance/authority-accountability-matrix.md` — accountability anchors that intersect AEM P12.

**Integration corpus:**
- `integration/loop-readiness-for-agent-opportunities.md` — the loop-readiness gate vs agent-surfaced opportunities. Note the condition count: `manifesto/manifesto.md` states **seven** explicitly bolded conditions; this file enumerates the same gate as **nine**, adding the AEM minimum-bar answerability question and the AEM-conformant-operating-envelope condition. Do not attribute a nine-condition gate to `manifesto/manifesto.md` alone.
- `integration/low-consequence-resolution.md` — AEM P12 per-action accountability minimum bar.

**Regulatory crosswalks (AEM content is the floor for evidence and governance discipline):**
- `regulatory/eu-ai-act-addendum.md` — Annex III mapping; Articles 9, 10, 12, 13, 14, 15, 27, 72, 73; GPAI obligations.
- `regulatory/foundation-model-third-party-register.md` — DORA Pillar 4 register schema, exit strategy, CTPP analysis.
- `regulatory/nist-ai-rmf-crosswalk.md` — NIST AI RMF 1.0 (Govern / Map / Measure / Manage) + AI 600-1 GenAI Profile.
- `regulatory/iso-42001-crosswalk.md` — ISO/IEC 42001:2023 AI Management System.
- `regulatory/iso-23894-23053-crosswalk.md` — ISO/IEC 23894 (AI risk management) + 23053 (AI system framework).
- `regulatory/coso-cobit-crosswalk.md` — COSO ERM 2017 + COBIT 2019/2023 with Three-Lines operationalisation.
- `regulatory/incidents-appendix.md` — named real-world events (Slack-AI exfiltration, DocGo SDNY, etc.) the manifesto is designed to prevent.

**Operational templates:**
- `operational-templates/agent-inventory-schema.md` — AI agent discovery and registration.
- `operational-templates/ai-risk-register.md` — AI risk register schema.
- `operational-templates/risk-appetite-statement.md` — board-level AI risk appetite.
- `operational-templates/slo-table.md` — consolidated SLO table including evidence freshness.
- `operational-templates/decommissioning-checklist.md` — orderly retirement of agents.
- `operational-templates/agentic-provenance-record.json` — JSON Schema for the agentic provenance record (cross-reference against the eleven provenance fields enumerated in `manifesto/manifesto-done.md`, which now leads with **harness identity** per Principle 3/7 — the schema file is a secondary artefact and may lag the prose definition; score against the manifesto text, not the schema, if they diverge).
- `operational-templates/control-state-record.json` — JSON Schema for the Control State Record (`manifesto/manifesto.md` What the Loop Produces).
- `operational-templates/evidence-bundle.json` — JSON Schema for the Evidence Bundle envelope (`manifesto/manifesto-done.md`).

### Domain file

- `[[DOMAIN_FILE]]` — read end-to-end. Map every major finding to a specific regulation or risk type identified in this file.

### Prior reviews (peer comparison)

If `[[PRIOR_REVIEWS]]` is not `none`, treat the comma-separated paths it contains as required reading. Read each listed file end-to-end before scoring. Do not transfer scores from prior reviews — derive scores independently from `[[FRAMEWORK]]`'s artefacts. When `[[PRIOR_REVIEWS]]` is not `none`, the output MUST include a "Peer Comparison" subsection within the Industry/Client Observations section that names each prior review and states (a) one capability `[[FRAMEWORK]]` covers more strongly than the peer and (b) one capability `[[FRAMEWORK]]` covers less strongly. When `[[PRIOR_REVIEWS]]` is `none`, omit the Peer Comparison subsection entirely.

---

## 2. Methodology

### 2.1 Principle scores

Score each of the twelve manifesto principles 0–100. Use the canonical 12-principle weighting scheme defined in `prompt.md` (§ Score weighting scheme). Do not invent or copy alternative values. If this prompt and `prompt.md` ever disagree, `prompt.md` wins.

Use the SHORT-FORM principle names from the `prompt.md` weighting table. These are canonical for this review system. Do NOT use the long-form names from the `manifesto-principles` source group. The short forms are:

- P1 — Outcomes are the unit of work
- P2 — Specifications are living artifacts
- P3 — Architecture is defense-in-depth
- P4 — Right-size the swarm
- P5 — Autonomy is a permission ceiling
- P6 — Knowledge and memory are distinct infrastructure
- P7 — Context is engineered like code
- P8 — Evaluations are the contract
- P9 — Observability and interoperability cover reasoning
- P10 — Assume emergence, engineer containment
- P11 — Optimize economics of intelligence
- P12 — Accountability requires visibility

For each principle score, state:

1. The score (0–100, integer).
2. **Evidence for** — specific artefact names, module names, rule text, or file sections that support a higher score.
3. **Evidence against** — specific artefact names, absences, or limitations that support a lower score.

Do not conflate evidence-for and evidence-against. State them separately.

Every claim about `[[FRAMEWORK]]` MUST be grounded in a verbatim quote from a named source file, including the file path. Paraphrase without citation is forbidden. Each principle's evidence-for must include at least one verbatim quote (in single backticks or double quotes, ≤30 words) from a `[[FRAMEWORK]]` artefact, with the file path in parentheses (e.g., `"delegates AI operations to Claude Code CLI"` (`README.md`)). Each principle's evidence-against must include at least one specific named absence (artefact name, function name, or rule that does not exist in `[[FRAMEWORK]]` but the manifesto requires).

**This agent does not score.** It runs in Wave 1a, in parallel with agents 02-p1..p12, 03a, 03b, 03c and 03d, and cannot read their outputs. Earlier versions of this prompt had it emit its own impressionistic principle and loop-phase estimates, which agent 09 then reconciled against the rubric-derived deep scores. Three complete runs showed those estimates were not merely noisy but **biased**: composites of 33.7 and 38.9 against authoritative 17.9 and 16.5 — roughly double, in the same direction — and a maturity estimate of Phase 3 in every run where the phase owner said Phase 2. They generated ~24 "estimate differences" and one integrity warning per run, and every downstream agent had to override them.

So: emit `—` in every Score cell of the Manifesto Principles Table and the Agentic Loop Phases Table, exactly as this prompt already requires for the Definition of Done table. **Do not compute an Overall Score and do not estimate a maturity phase.** Agent 09 populates those cells from the authoritative deep files.

What this agent still owns, and why it exists: the framing, the scope and methodology statement (Part 2), the structure of Parts 1 and 2, the Framing Warning, and a one-sentence qualitative assessment per row — the narrative frame a reader needs before the numbers arrive. That content is not reproducible from the deep files and is the reason this agent is kept rather than deleted.

### 2.2 Overall score — NOT computed by this agent

Do not compute a composite. Agent 09 recomputes it from the twelve authoritative `02-pN` files as `Σ(score × weight)` with a single rounding applied to the sum. Emit `—` in the Total row's Score cell and omit the weighted-calculation footnote.

### 2.3 Severity mapping

This agent emits no scores, so it assigns no severity labels. Emit `—` in every Severity cell; agent 09 derives them from the authoritative scores. Retained here so the output schema's column set is unchanged. Do not use different thresholds. The Loop Phases table and the DoD table do NOT include a Severity column — only the Manifesto Principles Table does.

### 2.4 Agentic Loop phase scores

Score each phase 0–100 (integer) and provide a single-sentence assessment (≤ 50 words; semicolon-joined two-clause sentences count as a single sentence):

- Specify
- Design
- Plan
- Execute
- Verify
- Validate
- Observe
- Learn
- Govern

For each phase, the one-sentence assessment must contain BOTH an evidence-for clause (a specific [[FRAMEWORK]] artefact that supports the score) AND an evidence-against clause (the specific gap or limitation against the manifesto's minimum bar). Score gaps that are explicitly outside [[FRAMEWORK]]'s stated scope by noting the scope-gap in the assessment; the score reflects what the framework provides relative to the manifesto bar.

### 2.5 Agentic Definition of Done assessments (not scored)

**Do not score these.** Provide a single-sentence assessment only (≤ 50 words) for each condition, and emit `—` in the Score column. The Definition of Done is phase-calibrated (`manifesto/manifesto-done.md`); this agent runs in Wave 1a before the Maturity Verdict exists and can apply neither the phase bar nor the applicability gate. Agent 03e (Wave 1b) is the sole source of DoD scores; agent 09 fills the column from Part 4.

- Loop-Complete
- Traceable
- Verified
- Provable
- Learned from
- Governed
- Economical
- Within Service Envelope

For each condition, the one-sentence assessment must contain BOTH an evidence-for clause (a specific [[FRAMEWORK]] artefact) AND an evidence-against clause (the specific gap against the DoD definition in `manifesto/manifesto-done.md`).

### 2.6 Maturity phase — NOT determined by this agent

Agent 05a determines the maturity phase by walking the phase gates and applying the lowest-unmet-gate bound; agent 05b lifts that verdict for the industry analysis. This agent has neither the gate walk nor the evidence base to second it, and when it tried, the two verdicts contested each other and cost a resolution pass that changed nothing about the evidence. Emit `—` for Maturity Level in the header and write no phase number anywhere in the file.

You still read `companion/frameworks.md` and `manifesto/manifesto-principles-05.md` — the industry hard autonomy caps belong in the Framing Warning and the [[ORGANIZATION]]-specific observations. Name the cap; do not name a phase.

---

## 3. Output specification

Write the following file exactly:

**File path:** `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_01_quick_overview.md`

Create the `[[FRAMEWORK_LOWER]]/` directory if it does not exist.

When `[[INDUSTRY]]` is a long sentence (e.g., "European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II"), abbreviate it to a short form (e.g., "European Insurance" or "Insurance Domain") for any section heading. Use the full form in the metadata `Context:` line and in the opening sentence of the Industry/Client Observations section.

### 3.1 Required structure

Produce all sections below in this exact order, using these exact headings.

---

```
# [[FRAMEWORK]] — Agentic Engineering Manifesto Alignment Review

**Framework:** [[FRAMEWORK]] — <one-line description of what [[FRAMEWORK]] is, extracted from [[FRAMEWORK]]'s own README or top-level documentation>
**Version reviewed:** [[FRAMEWORK_VERSION]]
**Review date:** <YYYY-MM-DD; the date the agent was invoked>
**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]`
**Reviewer methodology:** Agentic Engineering Manifesto — 12 Principles, 6-Phase Model, Agentic Loop, Agentic DoD, and [[INDUSTRY]] domain guidance. List here only the manifesto-side files you actually read; do not claim corpus-wide coverage you did not perform
**Context:** [[ORGANIZATION]] — [[INDUSTRY]]
**Overall Score:** — (computed by agent 09 from the twelve principle files; this agent does not score)
**Maturity Level:** — (determined by agent 05a against the phase gates; this agent does not estimate a phase)

---

## Framing Warning

### What [[FRAMEWORK]] is

<Two to four sentences. State what [[FRAMEWORK]] is, who uses it, its primary inputs and outputs, and its stated scope boundary. Quote from [[FRAMEWORK]]'s own documentation where possible.>

### What the manifesto's scope [[FRAMEWORK]] covers by design

<Two to four sentences. State which manifesto dimensions [[FRAMEWORK]] directly addresses, citing specific modules, commands, or artefact types. Be specific — name the artefacts.>

### What is out of scope by design (scope gap vs. failure)

<Two to four sentences. State which manifesto dimensions are explicit scope gaps, not failures. Explain the difference between a scope gap and a failure for this framework. Reference [[FRAMEWORK]]'s own scope statements where they exist.>

### Score interpretation warning

<Three to five sentences. Warn the reader that scores measure manifesto alignment, not fitness for purpose. Distinguish scope-gap from capability-failure by what the reader should conclude, not by the score: both score on what is absent, but a scope gap is closed by composing another tool while a capability-failure means `[[FRAMEWORK]]` attempts the capability and falls short of the manifesto's bar. State the boundary explicitly: a dimension that is documented as out-of-scope is reported in the "What is out of scope by design" subsection and still scores on what is absent — documenting a gap does not close it — but attracts no deduction beyond the absence itself; a dimension where the framework attempts the capability but falls short of the manifesto's minimum bar is a capability-failure and DOES lower the score. Note that low scores on out-of-scope dimensions reflect genuine alignment gaps a deployer must close through composition — not that [[FRAMEWORK]] is broken. State that [[ORGANIZATION]] must make a separate judgment about whether [[FRAMEWORK]] closes governance gaps that existing tooling leaves open. Note any dimensions where [[ORGANIZATION]]'s regulatory context (from [[DOMAIN_FILE]]) makes certain gaps more or less operationally significant.>

---

## Part 1 — Overall Scores

> **Table order.** The loop and Definition of Done tables come first because the loop is the system the principles keep honest.
>
> **Scores.** Every Score, Weighted and Severity cell below is `—`. This agent reads only [[FRAMEWORK]]'s own artefacts and produces the one-sentence assessments; the rubric-derived integers come from the deep files (02-pN, 03a–03e) and agent 09 substitutes them at merge. Do not fill any cell with an estimate, and do not compute a composite.

### Agentic Loop Phases Table

| Phase | Score | One-sentence assessment |
|---|---|---|
| Specify | — | <one sentence with evidence-for clause and evidence-against clause, grounded in [[FRAMEWORK]] artefacts> |
| Design | — | <one sentence with evidence-for and evidence-against> |
| Plan | — | <one sentence with evidence-for and evidence-against> |
| Execute | — | <one sentence with evidence-for and evidence-against> |
| Verify | — | <one sentence with evidence-for and evidence-against> |
| Validate | — | <one sentence with evidence-for and evidence-against> |
| Observe | — | <one sentence with evidence-for and evidence-against> |
| Learn | — | <one sentence with evidence-for and evidence-against> |
| Govern | — | <one sentence with evidence-for and evidence-against> |

---

### Agentic Definition of Done Table

**Do not score these conditions.** The Definition of Done is phase-calibrated (`manifesto/manifesto-done.md`), and this agent runs in Wave 1a before the Maturity Verdict exists — it can apply neither the phase-calibrated bar nor the applicability gate that agent 03e applies in Wave 1b. An estimate produced without those inputs is not an independent cross-check of 03e's score; it is a different measurement, and reporting the difference manufactures Source Integrity noise. Emit the table with `—` in every Score cell and the one-sentence assessments only. Agent 09 fills the Score column from Part 4 at merge time.

| Condition | Score | One-sentence assessment |
|---|---|---|
| Loop-Complete | — | <one sentence with evidence-for and evidence-against, grounded in [[FRAMEWORK]] artefacts> |
| Traceable | — | <one sentence with evidence-for and evidence-against> |
| Verified | — | <one sentence with evidence-for and evidence-against> |
| Provable | — | <one sentence with evidence-for and evidence-against> |
| Learned from | — | <one sentence with evidence-for and evidence-against> |
| Governed | — | <one sentence with evidence-for and evidence-against> |
| Economical | — | <one sentence with evidence-for and evidence-against> |
| Within Service Envelope | — | <one sentence with evidence-for and evidence-against> |

---

### Manifesto Principles Table

| # | Principle Name | Weight | Score | Weighted | Severity |
|---|---|---|---|---|---|
| P1 | Outcomes are the unit of work | 10% | — | — | — |
| P2 | Specifications are living artifacts | 8% | — | — | — |
| P3 | Architecture is defense-in-depth | 8% | — | — | — |
| P4 | Right-size the swarm | 6% | — | — | — |
| P5 | Autonomy is a permission ceiling | 10% | — | — | — |
| P6 | Knowledge and memory are distinct infrastructure | 7% | — | — | — |
| P7 | Context is engineered like code | 7% | — | — | — |
| P8 | Evaluations are the contract | 10% | — | — | — |
| P9 | Observability and interoperability cover reasoning | 10% | — | — | — |
| P10 | Assume emergence, engineer containment | 8% | — | — | — |
| P11 | Optimize economics of intelligence | 6% | — | — | — |
| P12 | Accountability requires visibility | 10% | — | — | — |
| **Total** | | **100%** | — | — | — |

> **No weighted calculation is performed here.** Agent 09 computes `Σ(score × weight)` from the twelve `_review_02_principle_p{N}.md` H1 scores, rounding the sum once. Reproducing that arithmetic from estimates in this file produced a biased composite in three measured runs, which is why these cells are `—`.

---

### Maturity Phase Verdict

*(This agent emits no phase. Agent 09 fills this section from `[[FRAMEWORK_LOWER]]_review_05b_industry.md` Part 8. Leave the heading and this note; write no phase number.)*

---

## Part 2 — Scoring Methodology

<Two to three paragraphs describing the scoring approach: which [[FRAMEWORK]] artefacts were read (enumerate them with file paths in a bullet list or comma-separated list — the reader must be able to verify that the listed artefacts cover the framework's stated scope), how scope gaps were handled (evidence of documented delegation treated as scope boundary, not failure), how the weighted scheme was applied, and how the six-phase model was applied. Reference the manifesto sources used. State the review date. State `[[FRAMEWORK_VERSION]]` and confirm whether the framework's actual version was verified (e.g., by reading CHANGELOG or git HEAD).>

---

## Principle-by-Principle Score Rationale

### P1 — Outcomes are the unit of work (score in `[[FRAMEWORK_LOWER]]_review_02_principle_p1.md`)

<One paragraph, 80–120 words. State: (a) what [[FRAMEWORK]] does that supports this principle — name specific artefacts and include at least one verbatim quote with file path; (b) what is absent or insufficient — name the specific gaps against the P1 minimum bar from the matching `manifesto/manifesto-principles-0N.md` shard; (c) any [[ORGANIZATION]]-relevant implication from `[[DOMAIN_FILE]]`.>

### P2 — Specifications are living artifacts (score in `[[FRAMEWORK_LOWER]]_review_02_principle_p2.md`)

<One paragraph, 80–120 words. Same structure as P1.>

### P3 — Architecture is defense-in-depth (score in `[[FRAMEWORK_LOWER]]_review_02_principle_p3.md`)

<One paragraph, 80–120 words.>

### P4 — Right-size the swarm (score in `[[FRAMEWORK_LOWER]]_review_02_principle_p4.md`)

<One paragraph, 80–120 words.>

### P5 — Autonomy is a permission ceiling (score in `[[FRAMEWORK_LOWER]]_review_02_principle_p5.md`)

<One paragraph, 80–120 words.>

### P6 — Knowledge and memory are distinct infrastructure (score in `[[FRAMEWORK_LOWER]]_review_02_principle_p6.md`)

<One paragraph, 80–120 words.>

### P7 — Context is engineered like code (score in `[[FRAMEWORK_LOWER]]_review_02_principle_p7.md`)

<One paragraph, 80–120 words.>

### P8 — Evaluations are the contract (score in `[[FRAMEWORK_LOWER]]_review_02_principle_p8.md`)

<One paragraph, 80–120 words.>

### P9 — Observability and interoperability cover reasoning (score in `[[FRAMEWORK_LOWER]]_review_02_principle_p9.md`)

<One paragraph, 80–120 words.>

### P10 — Assume emergence, engineer containment (score in `[[FRAMEWORK_LOWER]]_review_02_principle_p10.md`)

<One paragraph, 80–120 words.>

### P11 — Optimize economics of intelligence (score in `[[FRAMEWORK_LOWER]]_review_02_principle_p11.md`)

<One paragraph, 80–120 words.>

### P12 — Accountability requires visibility (score in `[[FRAMEWORK_LOWER]]_review_02_principle_p12.md`)

<One paragraph, 80–120 words.>

---

## [[ORGANIZATION]] / <INDUSTRY_SHORT> Specific Observations

<Three to five paragraphs. Each paragraph must map to a specific regulatory provision (article, paragraph, or rule number) from `[[DOMAIN_FILE]]` — not just the regulation's name. Generic references ("GDPR") are insufficient; specific references ("GDPR Article 25", "DORA Article 19", "Solvency II Article 41") are required. Cover: (1) which [[FRAMEWORK]] capabilities are most valuable for [[ORGANIZATION]]'s regulatory context; (2) which manifesto gaps are most operationally critical given [[INDUSTRY]] hard autonomy caps; (3) which gaps are less critical because the relevant use cases are already capped at lower tiers by [[DOMAIN_FILE]]; (4) any specific regulatory requirement from [[DOMAIN_FILE]] that [[FRAMEWORK]] directly addresses or structurally cannot address.>

<If `[[PRIOR_REVIEWS]]` is not `none`, append a "### Peer Comparison" subsection naming each prior review and stating one capability [[FRAMEWORK]] covers more strongly than the peer and one capability it covers less strongly. Omit this subsection entirely when `[[PRIOR_REVIEWS]]` is `none`.>
```

---

## 4. Hard rules

These rules apply without exception. They mirror the hard rules in `prompt.md`.

1. Read [[FRAMEWORK]]'s source artefacts before scoring. Every claim about `[[FRAMEWORK]]` MUST be grounded in a verbatim quote from a named source file, including the file path. Paraphrase without citation is forbidden.
2. Read the manifesto's source artefacts before scoring. Do not score from memory of the manifesto — read the current files listed in Section 1.
3. For every score, state evidence-for and evidence-against separately. Do not merge them.
4. Do not praise [[FRAMEWORK]] for things it does not demonstrably do. Distinguish "claimed capability" (documented in README, design docs, ADRs in `Proposed` state, rules files, or roadmap) from "demonstrated capability" (implemented in deployed/HEAD source code at `[[FRAMEWORK_VERSION]]`). Score against demonstrated capability only; note material claims under evidence-against.
5. Assess every principle and every loop phase against the manifesto's full bar — including areas `[[FRAMEWORK]]` documents as out of scope. **Out-of-scope gaps are annotated, not discounted.** The assessment is the one-sentence cell; the score is not yours to write.
6. Every major finding must map to a specific regulatory provision (article, paragraph, or rule number) from `[[DOMAIN_FILE]]` as it applies to [[ORGANIZATION]]. Generic regulation names are insufficient.
7. Use date format YYYY-MM-DD wherever a date appears. The `Review date` line is the date the agent was invoked.
8. When cross-referencing another part of the review within the output file, use canonical part numbers (e.g., "see Part 12"). Do not use file names or agent numbers in cross-references.
9. Emit no integer in any Score, Weighted or Severity cell, no composite in the header, and no maturity phase. Every one of those cells is `—`. If you find yourself computing arithmetic over principle scores, you have left this agent's scope.
10. This is a regulator-credible technical review, not a vendor blog post. Do not use marketing language ("robust", "best-in-class", "industry-leading"). Do not soften findings. Do not try to please. Score the framework as it is at HEAD.
11. This agent does not produce a remediation roadmap (that is agent 06's responsibility). Do not invent S/M/L/XL effort labels — those belong to agent 06.

---

## 5. Self-check before saving

**Do not save the output file until every item below is confirmed satisfied.** Each item is a binary yes/no question. Answer yes to all before writing the file.

- [ ] Is the output file path `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_01_quick_overview.md` with `[[FRAMEWORK_LOWER]]` fully substituted (no literal `[[` remaining)?
- [ ] Does the output file's header metadata block contain the substring `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]` (the mandatory provenance line — see `prompt.md`'s Hard rules)?
- [ ] Have all double-bracket placeholders in the output file content been substituted? (Scan the output for any remaining `[[...]]` patterns.)
- [ ] Have all template angle-bracket placeholders been replaced? (Scan for `<severity>`, `<one sentence...>`, `<one-line description...>`, `<YYYY-MM-DD>`, `<N>`, `<Name>`, `<sum>`, `<total>`, `<INDUSTRY_SHORT>`, and the regex pattern `<[A-Za-z][^>]+>` more broadly.)
- [ ] Does the file header metadata block carry `—` for BOTH Overall Score and Maturity Level, with no composite and no phase number anywhere in the file? (Agent 09 fills the score; agent 05a determines the phase.)
- [ ] Do ALL THREE tables — Manifesto Principles, Agentic Loop Phases, and Agentic Definition of Done — carry `—` in every Score cell, with no integer anywhere in those columns, and the explanatory note above each?
- [ ] Does every Severity cell in the Manifesto Principles Table and the Agentic Loop Phases Table carry `—`, with no severity label derived by this agent?
- [ ] Does every principle name in the Manifesto Principles Table and in the Principle-by-Principle Score Rationale headers use the SHORT-FORM names from the `prompt.md` weighting table (matching this prompt's Section 2.1 list verbatim)?
- [ ] Are all dates in the output file in YYYY-MM-DD format, and does the `Review date` equal the date the agent was invoked?
- [ ] Are there zero references to `ASDLC`, `APLC`, `IGM`, `AEnt-M`, `AEnt_M`, `intelligence-governance-manifesto`, `agentic-enterprise-manifesto`, `agentic-enterprise`, `agentic-governance-stack`, `manifesto-evolution-plan`, `phase-assessment-checklist`, `asdlc/`, `aplc/`, `agentic-sdlc-handbook/`, `asdlc-plan`, `aplc-plan`, or `igm-aent-coherence-review` anywhere in the output file (other than the permitted self-referential quote of `manifesto-done.md`'s own Loop-Complete/handoff boundary language)? Are all source files referenced in the output tracked by git on the current branch?
- [ ] Have any soft-language tokens been removed? (Scan the output for: "consider", "may", "could potentially", "it might be worth", "perhaps", "use judgement", "should ideally", "may want to", "appears to", "arguably", "seemingly".)
- [ ] Does every principle score paragraph contain both an evidence-for clause AND an evidence-against clause?
- [ ] Does every principle score paragraph contain at least one verbatim quote (≤30 words, in backticks or double quotes) from a `[[FRAMEWORK]]` artefact with the file path stated?
- [ ] Does every Loop phase row's one-sentence assessment contain both an evidence-for clause AND an evidence-against clause?
- [ ] Does every DoD condition row's one-sentence assessment contain both an evidence-for clause AND an evidence-against clause?
- [ ] In Part 1, do the Agentic Loop Phases Table and the Agentic Definition of Done Table both appear BEFORE the Manifesto Principles Table, with the table-order note present?
- [ ] Is the Loop Integrity Score absent from this file (it is owned solely by Part 3 §3.11)?
- [ ] Does the Agentic Loop Phases Table contain exactly nine rows in the canonical order (Specify, Design, Plan, Execute, Verify, Validate, Observe, Learn, Govern) and exactly three columns (Phase, Score, One-sentence assessment)?
- [ ] Does the Agentic Definition of Done Table contain exactly eight rows in the canonical order (Loop-Complete, Traceable, Verified, Provable, Learned from, Governed, Economical, Within Service Envelope) and exactly three columns (Condition, Score, One-sentence assessment)?
- [ ] Does the Framing Warning section contain exactly four subsections in this order: "What [[FRAMEWORK]] is", "What the manifesto's scope [[FRAMEWORK]] covers by design", "What is out of scope by design (scope gap vs. failure)", "Score interpretation warning"?
- [ ] Does every major finding in the [[ORGANIZATION]] / Industry Specific Observations section cite a specific regulatory provision (article, paragraph, or rule number) from `[[DOMAIN_FILE]]`?
- [ ] If `[[PRIOR_REVIEWS]]` is not `none`, does the output include a "Peer Comparison" subsection that names each prior review and states one stronger capability and one weaker capability per peer?
- [ ] If `[[PRIOR_REVIEWS]]` is `none`, is the "Peer Comparison" subsection absent from the output?
- [ ] Do all cross-references within the output use canonical part numbers (e.g., "see Part 12") and not file names, agent numbers, or section headings?
- [ ] Is the Industry/Client Observations section heading abbreviated to a short form when `[[INDUSTRY]]` is a long sentence (e.g., "European Insurance" or "Insurance Domain"), with the full form preserved in the metadata `Context:` line?
- [ ] Is `[[FRAMEWORK_VERSION]]` in the `Version reviewed:` line either a tag, a commit SHA, a release name, `HEAD`, or `unknown` — and was the framework's actual version verified against this value?
- [ ] Has unmerged or unreleased work been noted as "planned / unreleased" in score rationales rather than counted toward scores?
