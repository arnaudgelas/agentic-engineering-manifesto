# Sub-prompt 01 — Overview

**Purpose:** Produce the overview file for a [[FRAMEWORK]] Agentic Engineering Manifesto alignment review, covering overall scores, scoring methodology, a framing-warning header, principle-by-principle score rationale, and client/industry-specific observations.

**Wave:** Wave 1a. This prompt runs in parallel with prompts 02, 03, 04a, 04b, 05a, and 07. It cannot read their outputs. Use canonical Part numbers ("see Part 12") for any cross-reference whose target is produced by another agent — agent 08 (merge) will resolve cross-references at synthesis time.

**Note to orchestrator:** All `[[VARIABLE]]` placeholders in this file must be substituted before this prompt is passed to the agent. If any `[[...]]` pattern remains in your working copy, stop and resolve it before spawning.

---

## 1. Inputs — read all before scoring

Read the following files in full before producing any scores. Do not score from memory. Do not proceed if any file is inaccessible.

### [[FRAMEWORK]] source artefacts

Read every source file in the `[[FRAMEWORK_LOWER]]/` directory end-to-end. At a minimum this includes:

- The primary README (or equivalent top-level documentation file).
- All core module source files, configuration schemas, and lifecycle rule files.
- Any CHANGELOG, version history, or release notes available.
- Any internal rules, patterns, or architectural decision records included with the framework.

Score only against artefacts and capabilities present at `[[FRAMEWORK_VERSION]]`. Unmerged or unreleased work (epics in progress, ADRs in `Proposed` rather than `Accepted` state, features behind disabled feature flags, design documents not yet implemented) MUST be noted as "planned / unreleased" in the score rationale, not counted toward the score.

### Manifesto corpus

Read each of the following files end-to-end. These constitute the Agentic Engineering Manifesto (AEM) corpus that this review scores against:

**Core (mandatory — abort if missing):**
- `manifesto.md` — core values, the Agentic Loop definition (Specify / Design / Plan / Execute / Verify / Validate / Observe / Learn / Govern), the loop-readiness gate ("What Must Be True Before Entering Specify"), the six-phase maturity model, and the evidence-backed deployable definition.
- `manifesto-principles.md` — all twelve principles, their minimum bars, the four oversight patterns (HITL/HOTL/HOLL/EDL), and their sequencing dependencies.
- `manifesto-done.md` — the Agentic Definition of Done (Shipped / Observable / Verified / Provable / Learned from / Governed / Economical), the four-step Hardening DoD, the agentic provenance record, the bundle integrity attestation, and the evidence freshness rules.
- `glossary.md` — canonical term definitions.

**Companion corpus (read each end-to-end):**
- `companion/guide.md` — extended rationale and companion guidance index, Annotated Agent Configuration Template.
- `companion/principles.md` — specifications-vs-constraints distinction, structural vs. behavioural regression, probability compounding, blast-radius management, accountability paradox.
- `companion/frameworks.md` — six-phase maturity spectrum failure modes, hard autonomy caps by regulated use-case.
- `companion/patterns.md` — worked failure-mode patterns (Patterns A–H, Hallucination Loop, Operational Recovery Cycle).
- `companion/re-framework.md` — requirements engineering paradigm break for agentic systems.
- `companion/reference.md` — failure modes of the manifesto (over-governance, evidence theater, control theater, etc.).

**Adoption corpus (read each end-to-end):**
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

**Governance corpus (read for AEM-relevant content; apply scope guard from `prompt.md`):**
- `governance/aem-principle-coverage-map.md` — for the AEM principle landscape and where extension layers attach. Treat the IGM/AEnt-M columns as out-of-scope context only.
- `governance/governance-integration-note.md` — Tier 4 binary policy envelope (AEM column).
- `governance/composition-rule.md` — AEM autonomy-tier gate as one of three composition gates.
- `governance/evidence-bundle-schema.md` (and the companion JSON schema `governance/evidence_bundle.schema.json`) — `aem_components` section of the unified evidence bundle.
- `governance/integrated-audit-trail.md` — AEM execution trace.
- `governance/phase-level-matrix.md` — AEM Phase 1–6 with maximum autonomy tier table.
- `governance/authority-accountability-matrix.md` — accountability anchors that intersect AEM P12.

**Integration corpus (read for AEM-relevant content):**
- `integration/loop-readiness-for-agent-opportunities.md` — AEM nine-condition loop-readiness gate vs agent-surfaced opportunities.
- `integration/low-consequence-resolution.md` — AEM P12 per-action accountability minimum bar.

**Regulatory crosswalks (read those relevant to `[[INDUSTRY]]`; AEM content is the floor for evidence and governance discipline):**
- `regulatory/eu-ai-act-addendum.md` — Annex III mapping; Articles 9, 10, 12, 13, 14, 15, 27, 72, 73; GPAI obligations.
- `regulatory/foundation-model-third-party-register.md` — DORA Pillar 4 register schema, exit strategy, CTPP analysis.
- `regulatory/nist-ai-rmf-crosswalk.md` — NIST AI RMF 1.0 (Govern / Map / Measure / Manage) + AI 600-1 GenAI Profile.
- `regulatory/iso-42001-crosswalk.md` — ISO/IEC 42001:2023 AI Management System.
- `regulatory/iso-23894-23053-crosswalk.md` — ISO/IEC 23894 (AI risk management) + 23053 (AI system framework).
- `regulatory/coso-cobit-crosswalk.md` — COSO ERM 2017 + COBIT 2019/2023 with Three-Lines operationalisation.
- `regulatory/incidents-appendix.md` — named real-world events (Slack-AI exfiltration, DocGo SDNY, etc.) the manifesto is designed to prevent.

**Operational templates (read those relevant to assessing `[[FRAMEWORK]]`'s alignment):**
- `operational-templates/agent-inventory-schema.md` — AI agent discovery and registration.
- `operational-templates/ai-risk-register.md` — AI risk register schema.
- `operational-templates/risk-appetite-statement.md` — board-level AI risk appetite.
- `operational-templates/slo-table.md` — consolidated SLO table including evidence freshness.
- `operational-templates/decommissioning-checklist.md` — orderly retirement of agents.
- `operational-templates/agentic-provenance-record.json` — JSON Schema for the agentic provenance record (the ten provenance fields enumerated in `manifesto-done.md`).
- `operational-templates/control-state-record.json` — JSON Schema for the Control State Record (`manifesto.md` What the Loop Produces).
- `operational-templates/evidence-bundle.json` — JSON Schema for the Evidence Bundle envelope (`manifesto-done.md`).

If `manifesto.md`, `manifesto-principles.md`, `manifesto-done.md`, or `glossary.md` cannot be read, abort and report the missing file. Do not proceed with scoring.

### Domain file

- `[[DOMAIN_FILE]]` — read end-to-end. Map every major finding to a specific regulation or risk type identified in this file.

### Prior reviews (peer comparison)

If `[[PRIOR_REVIEWS]]` is not `none`, treat the comma-separated paths it contains as required reading. Read each listed file end-to-end before scoring. Do not transfer scores from prior reviews — derive scores independently from `[[FRAMEWORK]]`'s artefacts. When `[[PRIOR_REVIEWS]]` is not `none`, the output MUST include a "Peer Comparison" subsection within the Industry/Client Observations section that names each prior review and states (a) one capability `[[FRAMEWORK]]` covers more strongly than the peer and (b) one capability `[[FRAMEWORK]]` covers less strongly. When `[[PRIOR_REVIEWS]]` is `none`, omit the Peer Comparison subsection entirely.

---

## 2. Methodology

### 2.1 Principle scores

Score each of the twelve manifesto principles 0–100. Use the canonical 12-principle weighting scheme defined in `prompt.md` (§ Score weighting scheme). Do not invent or copy alternative values. If this prompt and `prompt.md` ever disagree, `prompt.md` wins.

Use the SHORT-FORM principle names from the `prompt.md` weighting table. These are canonical for this review system. Do NOT use the long-form names from `manifesto-principles.md`. The short forms are:

- P1 — Outcomes are the unit of work
- P2 — Specifications are living artifacts
- P3 — Architecture is defense-in-depth
- P4 — Right-size the swarm
- P5 — Autonomy is a tiered budget
- P6 — Knowledge and memory are infrastructure
- P7 — Context is engineered like code
- P8 — Evaluations are the contract
- P9 — Observability covers reasoning
- P10 — Assume emergence, engineer containment
- P11 — Optimize economics of intelligence
- P12 — Accountability requires intelligibility

For each principle score, state:

1. The score (0–100, integer).
2. **Evidence for** — specific artefact names, module names, rule text, or file sections that support a higher score.
3. **Evidence against** — specific artefact names, absences, or limitations that support a lower score.

Do not conflate evidence-for and evidence-against. State them separately.

Every claim about `[[FRAMEWORK]]` MUST be grounded in a verbatim quote from a named source file, including the file path. Paraphrase without citation is forbidden. Each principle's evidence-for must include at least one verbatim quote (in single backticks or double quotes, ≤30 words) from a `[[FRAMEWORK]]` artefact, with the file path in parentheses (e.g., `"delegates AI operations to Claude Code CLI"` (`README.md`)). Each principle's evidence-against must include at least one specific named absence (artefact name, function name, or rule that does not exist in `[[FRAMEWORK]]` but the manifesto requires).

**Cross-prompt score authority:** The per-principle scores entered in the Manifesto Principles Table in this review are the AUTHORITATIVE scores for this review run. Agent 02 will use these scores as a reference; agent 03 will provide Loop/DoD scores that must match the corresponding rows in Part 1. Agent 08 performs the final cross-check. Do NOT independently re-derive scores from other agents' outputs (you cannot read them — they run in parallel).

### 2.2 Overall score

Compute `Σ(P{N}_score × decimal_weight)` where each `P{N}_score` is expressed as a decimal between 0 and 1 (e.g., score 52 → 0.52) and each `decimal_weight` is the integer percent weight from `prompt.md` (e.g., P1 weight 10% → 10). The product is the weighted contribution to one decimal place. Sum the twelve weighted contributions; round the total to one decimal place.

Show the calculation inline in a footnote under the Manifesto Principles Table using the format `P{N} {score_decimal}×{weight_int}={weighted}` (worked example: `P1 0.52×10=5.2`). The "Overall Score" in the document header MUST equal the Total row of the principles table to one decimal place. If after rounding individual principle scores to integers the header value differs from the table-arithmetic sum by ≥ 0.1, correct the header value before saving so they agree, OR include the italic caveat sentence in the format demonstrated in the canonical reference output (`abcd/abcd_review_01_quick_overview.md`) under the footnote, with the table-arithmetic sum named as the authoritative figure.

### 2.3 Severity mapping

Map every principle score and the overall score to a severity label using the canonical severity thresholds defined in `prompt.md` (§ Severity thresholds). Do not use different thresholds. The Loop Phases table and the DoD table do NOT include a Severity column — only the Manifesto Principles Table does.

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

### 2.5 Agentic Definition of Done scores

Score each DoD condition 0–100 (integer) and provide a single-sentence assessment (≤ 50 words):

- Shipped
- Observable
- Verified
- Provable
- Learned from
- Governed
- Economical

For each condition, the one-sentence assessment must contain BOTH an evidence-for clause (a specific [[FRAMEWORK]] artefact) AND an evidence-against clause (the specific gap against the DoD definition in `manifesto-done.md`).

### 2.6 Maturity phase verdict

State which of the six manifesto maturity phases [[FRAMEWORK]] maps to. The Maturity Phase Verdict MUST be bounded by the LOWEST unmet gate — not by the highest demonstrated feature. The maturity verdict is the highest phase ALL of whose gate requirements are demonstrably met by `[[FRAMEWORK]]`'s current artefacts at `[[FRAMEWORK_VERSION]]`. Proto-elements of higher phases may be noted but do not raise the verdict. State the verdict as "Phase {N}", then list the lowest unmet gate by name in the body paragraph that follows.

Specify:

- Which phase requirements are met and by which artefacts.
- Which phase-gate requirements for the next phase are unmet, naming the specific artefact, mechanism, or process that would close each gap.
- Where [[ORGANIZATION]]'s context (industry hard caps, regulatory environment) affects the operational significance of the verdict.

The deep maturity placement and gate-by-gate analysis is owned by Part 8 (agent 05). The verdict in this overview is a high-level summary that must align with Part 8.

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
**Reviewer methodology:** Agentic Engineering Manifesto — 12 Principles, 6-Phase Model, Agentic Loop, Agentic DoD (incl. Hardening DoD, agentic provenance record, evidence freshness rules), all Adoption / Companion / Beyond-Agile documents, AEM-relevant content from `governance/`, `integration/`, `regulatory/`, and `operational-templates/`, and [[INDUSTRY]] domain guidance
**Context:** [[ORGANIZATION]] — [[INDUSTRY]]
**Overall Score:** <X.X>/100
**Maturity Level:** Phase <N> — <Name>, with <any proto-elements or isolated capabilities at higher phases noted>. <One sentence stating that the next phase's gate requirements are substantially unmet, naming the lowest unmet gate.>

---

## Framing Warning

### What [[FRAMEWORK]] is

<Two to four sentences. State what [[FRAMEWORK]] is, who uses it, its primary inputs and outputs, and its stated scope boundary. Quote from [[FRAMEWORK]]'s own documentation where possible.>

### What the manifesto's scope [[FRAMEWORK]] covers by design

<Two to four sentences. State which manifesto dimensions [[FRAMEWORK]] directly addresses, citing specific modules, commands, or artefact types. Be specific — name the artefacts.>

### What is out of scope by design (scope gap vs. failure)

<Two to four sentences. State which manifesto dimensions are explicit scope gaps, not failures. Explain the difference between a scope gap and a failure for this framework. Reference [[FRAMEWORK]]'s own scope statements where they exist.>

### Score interpretation warning

<Three to five sentences. Warn the reader that scores measure manifesto alignment, not fitness for purpose. Distinguish scope-gap (note the gap, do not penalise in the score) from capability-failure (score low). State the boundary explicitly: a dimension that is documented as out-of-scope is reported in the "What is out of scope by design" subsection and does not lower the score; a dimension where the framework attempts the capability but falls short of the manifesto's minimum bar is a capability-failure and DOES lower the score. Note that low scores on out-of-scope dimensions reflect genuine alignment gaps a deployer must close through composition — not that [[FRAMEWORK]] is broken. State that [[ORGANIZATION]] must make a separate judgment about whether [[FRAMEWORK]] closes governance gaps that existing tooling leaves open. Note any dimensions where [[ORGANIZATION]]'s regulatory context (from [[DOMAIN_FILE]]) makes certain gaps more or less operationally significant.>

---

## Part 1 — Overall Scores

### Manifesto Principles Table

| # | Principle Name | Weight | Score | Weighted | Severity |
|---|---|---|---|---|---|
| P1 | Outcomes are the unit of work | 10% | <score> | <weighted> | <severity> |
| P2 | Specifications are living artifacts | 8% | <score> | <weighted> | <severity> |
| P3 | Architecture is defense-in-depth | 8% | <score> | <weighted> | <severity> |
| P4 | Right-size the swarm | 6% | <score> | <weighted> | <severity> |
| P5 | Autonomy is a tiered budget | 10% | <score> | <weighted> | <severity> |
| P6 | Knowledge and memory are infrastructure | 7% | <score> | <weighted> | <severity> |
| P7 | Context is engineered like code | 7% | <score> | <weighted> | <severity> |
| P8 | Evaluations are the contract | 10% | <score> | <weighted> | <severity> |
| P9 | Observability covers reasoning | 10% | <score> | <weighted> | <severity> |
| P10 | Assume emergence, engineer containment | 8% | <score> | <weighted> | <severity> |
| P11 | Optimize economics of intelligence | 6% | <score> | <weighted> | <severity> |
| P12 | Accountability requires intelligibility | 10% | <score> | <weighted> | <severity> |
| **Total** | | **100%** | | **<sum>** | **<overall severity>** |

> **Weighted calculation:**
> P1 0.<score>×10=<weighted>; P2 0.<score>×8=<weighted>; P3 0.<score>×8=<weighted>; P4 0.<score>×6=<weighted>; P5 0.<score>×10=<weighted>;
> P6 0.<score>×7=<weighted>; P7 0.<score>×7=<weighted>; P8 0.<score>×10=<weighted>; P9 0.<score>×10=<weighted>; P10 0.<score>×8=<weighted>;
> P11 0.<score>×6=<weighted>; P12 0.<score>×10=<weighted> → **sum = <total>**

The Score column on the Total row is left blank. The Severity column on the Total row reflects the overall severity of `<sum>` per the canonical thresholds.

---

### Agentic Loop Phases Table

| Phase | Score | One-sentence assessment |
|---|---|---|
| Specify | <score> | <one sentence with evidence-for clause and evidence-against clause, grounded in [[FRAMEWORK]] artefacts> |
| Design | <score> | <one sentence with evidence-for and evidence-against> |
| Plan | <score> | <one sentence with evidence-for and evidence-against> |
| Execute | <score> | <one sentence with evidence-for and evidence-against> |
| Verify | <score> | <one sentence with evidence-for and evidence-against> |
| Validate | <score> | <one sentence with evidence-for and evidence-against> |
| Observe | <score> | <one sentence with evidence-for and evidence-against> |
| Learn | <score> | <one sentence with evidence-for and evidence-against> |
| Govern | <score> | <one sentence with evidence-for and evidence-against> |

---

### Agentic Definition of Done Table

| Condition | Score | One-sentence assessment |
|---|---|---|
| Shipped | <score> | <one sentence with evidence-for and evidence-against, grounded in [[FRAMEWORK]] artefacts> |
| Observable | <score> | <one sentence with evidence-for and evidence-against> |
| Verified | <score> | <one sentence with evidence-for and evidence-against> |
| Provable | <score> | <one sentence with evidence-for and evidence-against> |
| Learned from | <score> | <one sentence with evidence-for and evidence-against> |
| Governed | <score> | <one sentence with evidence-for and evidence-against> |
| Economical | <score> | <one sentence with evidence-for and evidence-against> |

---

### Maturity Phase Verdict

[[FRAMEWORK]] maps to **Phase <N> (<Name>)** in the manifesto's six-phase model. The verdict is bounded by the lowest unmet gate, named in the next paragraph.

<Paragraph A: state which Phase N requirements are met and cite the specific [[FRAMEWORK]] artefacts that satisfy them. List proto-elements of higher phases if present, but do not raise the verdict above Phase N.>

<Paragraph B: state the phase-gate requirements for Phase N+1 that are unmet. Identify the LOWEST unmet gate by name first. For each unmet requirement, name the specific artefact, mechanism, or process that would close the gap.>

<Paragraph C: state the relevance to [[ORGANIZATION]] specifically: how do the industry hard autonomy caps from `[[DOMAIN_FILE]]` interact with [[FRAMEWORK]]'s maturity verdict? Which gaps are most operationally critical for [[ORGANIZATION]]'s regulatory context? Which gaps are less critical because the relevant autonomy tiers are already capped?>

---

## Part 2 — Scoring Methodology

<Two to three paragraphs describing the scoring approach: which [[FRAMEWORK]] artefacts were read (enumerate them with file paths in a bullet list or comma-separated list — the reader must be able to verify that the listed artefacts cover the framework's stated scope), how scope gaps were handled (evidence of documented delegation treated as scope boundary, not failure), how the weighted scheme was applied, and how the six-phase model was applied. Reference the manifesto sources used. State the review date. State `[[FRAMEWORK_VERSION]]` and confirm whether the framework's actual version was verified (e.g., by reading CHANGELOG or git HEAD).>

---

## Principle-by-Principle Score Rationale

### P1 — Outcomes are the unit of work (<score>/100 — <severity>)

<One paragraph, 80–120 words. State: (a) what [[FRAMEWORK]] does that supports this principle — name specific artefacts and include at least one verbatim quote with file path; (b) what is absent or insufficient — name the specific gaps against the P1 minimum bar from `manifesto-principles.md`; (c) any [[ORGANIZATION]]-relevant implication from `[[DOMAIN_FILE]]`.>

### P2 — Specifications are living artifacts (<score>/100 — <severity>)

<One paragraph, 80–120 words. Same structure as P1.>

### P3 — Architecture is defense-in-depth (<score>/100 — <severity>)

<One paragraph, 80–120 words.>

### P4 — Right-size the swarm (<score>/100 — <severity>)

<One paragraph, 80–120 words.>

### P5 — Autonomy is a tiered budget (<score>/100 — <severity>)

<One paragraph, 80–120 words.>

### P6 — Knowledge and memory are infrastructure (<score>/100 — <severity>)

<One paragraph, 80–120 words.>

### P7 — Context is engineered like code (<score>/100 — <severity>)

<One paragraph, 80–120 words.>

### P8 — Evaluations are the contract (<score>/100 — <severity>)

<One paragraph, 80–120 words.>

### P9 — Observability covers reasoning (<score>/100 — <severity>)

<One paragraph, 80–120 words.>

### P10 — Assume emergence, engineer containment (<score>/100 — <severity>)

<One paragraph, 80–120 words.>

### P11 — Optimize economics of intelligence (<score>/100 — <severity>)

<One paragraph, 80–120 words.>

### P12 — Accountability requires intelligibility (<score>/100 — <severity>)

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
5. Score every principle, phase, and condition against the manifesto's full bar — even if [[FRAMEWORK]] documents the area as out of scope. A documented scope boundary is reported in the Framing Warning subsection "What is out of scope by design (scope gap vs. failure)". A score below 100 reflects a gap a deployer must close through composition; it is not a moral failing of the framework. Do not penalise [[FRAMEWORK]] for problems explicitly outside its stated scope beyond the alignment gap that the scope boundary creates.
6. Every major finding must map to a specific regulatory provision (article, paragraph, or rule number) from `[[DOMAIN_FILE]]` as it applies to [[ORGANIZATION]]. Generic regulation names are insufficient.
7. Use date format YYYY-MM-DD wherever a date appears. The `Review date` line is the date the agent was invoked.
8. When cross-referencing another part of the review within the output file, use canonical part numbers (e.g., "see Part 12"). Do not use file names or agent numbers in cross-references.
9. **Out-of-scope corpus / tracked-files-only.** This review covers the Agentic Engineering Manifesto (AEM) only. Do not read, cite, or reference any file untracked by git on the current branch. Specifically the following are out of scope: `asdlc/`, `aplc/`, `agentic-sdlc-handbook/`, `intelligence-governance-manifesto/`, `agentic-enterprise-manifesto/`, `agentic-enterprise.md`, `agentic-enterprise.html`, `agentic-governance-stack.md`, `agentic-governance-stack.html`, `manifesto-evolution-plan.md`, `manifesto-evolution-plan.html`, `phase-assessment-checklist.md`, `phase-assessment-checklist.html`, `asdlc-plan.md`, `asdlc-plan.html`, `aplc-plan.md`, `aplc-plan.html`, `igm-aent-coherence-review.md`, and `igm-aent-coherence-review.html`. The output MUST contain zero matches for the tokens `ASDLC`, `APLC`, `IGM`, `AEnt-M`, `AEnt_M`, `intelligence-governance-manifesto`, `agentic-enterprise-manifesto`, `agentic-enterprise`, `agentic-governance-stack`, `manifesto-evolution-plan`, `phase-assessment-checklist`, or `agentic-sdlc-handbook`. Do not forward-propagate out-of-scope references from `[[DOMAIN_FILE]]` or from cross-stack files in `governance/`, `integration/`, `regulatory/`, or `operational-templates/` — paraphrase to manifesto-equivalent terms.
10. The weighted calculation in the footnote must verify arithmetically. Check that `Σ(P{N}_score × decimal_weight)` equals the stated total before saving, and that the header `Overall Score` equals the table sum to one decimal place (or includes the rounding caveat sentence).
11. The output MUST NOT contain any of the following soft-language tokens: "consider", "may", "could potentially", "it might be worth", "perhaps", "use judgement", "should ideally", "may want to", "appears to", "arguably", "seemingly". Use declarative statements. State what `[[FRAMEWORK]]` does or does not do at `[[FRAMEWORK_VERSION]]`. Do not state what `[[FRAMEWORK]]` will do, plans to do, or could do.
12. This is a regulator-credible technical review, not a vendor blog post. Do not use marketing language ("robust", "best-in-class", "industry-leading"). Do not soften findings. Do not try to please. Score the framework as it is at HEAD.
13. This agent does not produce a remediation roadmap (that is agent 06's responsibility). Do not invent S/M/L/XL effort labels — those belong to agent 06.

---

## 5. Self-check before saving

**Do not save the output file until every item below is confirmed satisfied.** Each item is a binary yes/no question. Answer yes to all before writing the file.

- [ ] Is the output file path `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_01_quick_overview.md` with `[[FRAMEWORK_LOWER]]` fully substituted (no literal `[[` remaining)?
- [ ] Have all `[[VARIABLE]]` placeholders in the output file content been substituted? (Scan the output for any remaining `[[...]]` patterns.)
- [ ] Have all template angle-bracket placeholders been replaced? (Scan for `<score>`, `<weighted>`, `<severity>`, `<one sentence...>`, `<one-line description...>`, `<YYYY-MM-DD>`, `<N>`, `<Name>`, `<sum>`, `<total>`, `<INDUSTRY_SHORT>`, and the regex pattern `<[A-Za-z][^>]+>` more broadly.)
- [ ] Does the weighted total in the principles table Total row equal the footnote calculation arithmetically?
- [ ] Does the `Overall Score:` value in the file header metadata block equal the weighted total in the principles table footnote, rounded to one decimal place — OR is the rounding-caveat sentence present and does its "Authoritative figure" match the table sum?
- [ ] Does the overall severity label in the principles-table Total row match the canonical severity threshold for the overall score (e.g., 50.6 → High because 40–54)?
- [ ] Does every severity label in every principle row match the canonical thresholds defined in `prompt.md`?
- [ ] Does every principle name in the Manifesto Principles Table and in the Principle-by-Principle Score Rationale headers use the SHORT-FORM names from the `prompt.md` weighting table (matching this prompt's Section 2.1 list verbatim)?
- [ ] Are all dates in the output file in YYYY-MM-DD format, and does the `Review date` equal the date the agent was invoked?
- [ ] Are there zero references to `ASDLC`, `APLC`, `IGM`, `AEnt-M`, `AEnt_M`, `intelligence-governance-manifesto`, `agentic-enterprise-manifesto`, `agentic-enterprise`, `agentic-governance-stack`, `manifesto-evolution-plan`, `phase-assessment-checklist`, `asdlc/`, `aplc/`, `agentic-sdlc-handbook/`, `asdlc-plan`, `aplc-plan`, or `igm-aent-coherence-review` anywhere in the output file? Are all source files referenced in the output tracked by git on the current branch?
- [ ] Have any soft-language tokens been removed? (Scan the output for: "consider", "may", "could potentially", "it might be worth", "perhaps", "use judgement", "should ideally", "may want to", "appears to", "arguably", "seemingly".)
- [ ] Does every principle score paragraph contain both an evidence-for clause AND an evidence-against clause?
- [ ] Does every principle score paragraph contain at least one verbatim quote (≤30 words, in backticks or double quotes) from a `[[FRAMEWORK]]` artefact with the file path stated?
- [ ] Does every Loop phase row's one-sentence assessment contain both an evidence-for clause AND an evidence-against clause?
- [ ] Does every DoD condition row's one-sentence assessment contain both an evidence-for clause AND an evidence-against clause?
- [ ] Does the Agentic Loop Phases Table contain exactly nine rows in the canonical order (Specify, Design, Plan, Execute, Verify, Validate, Observe, Learn, Govern) and exactly three columns (Phase, Score, One-sentence assessment)?
- [ ] Does the Agentic Definition of Done Table contain exactly seven rows in the canonical order (Shipped, Observable, Verified, Provable, Learned from, Governed, Economical) and exactly three columns (Condition, Score, One-sentence assessment)?
- [ ] Does the Framing Warning section contain exactly four subsections in this order: "What [[FRAMEWORK]] is", "What the manifesto's scope [[FRAMEWORK]] covers by design", "What is out of scope by design (scope gap vs. failure)", "Score interpretation warning"?
- [ ] Does the Maturity Level header line name a specific phase (Phase 1–6) AND a sentence stating that the next phase's gate requirements are substantially unmet (naming the lowest unmet gate)?
- [ ] Is the Maturity Phase Verdict bounded by the LOWEST unmet gate (not by the highest demonstrated feature), and does the body name that gate?
- [ ] Does the Maturity Phase Verdict name at least one specific [[FRAMEWORK]] artefact per met requirement and at least one specific gap per unmet next-phase requirement?
- [ ] Does every major finding in the [[ORGANIZATION]] / Industry Specific Observations section cite a specific regulatory provision (article, paragraph, or rule number) from `[[DOMAIN_FILE]]`?
- [ ] If `[[PRIOR_REVIEWS]]` is not `none`, does the output include a "Peer Comparison" subsection that names each prior review and states one stronger capability and one weaker capability per peer?
- [ ] If `[[PRIOR_REVIEWS]]` is `none`, is the "Peer Comparison" subsection absent from the output?
- [ ] Do all cross-references within the output use canonical part numbers (e.g., "see Part 12") and not file names, agent numbers, or section headings?
- [ ] Is the Industry/Client Observations section heading abbreviated to a short form when `[[INDUSTRY]]` is a long sentence (e.g., "European Insurance" or "Insurance Domain"), with the full form preserved in the metadata `Context:` line?
- [ ] Is `[[FRAMEWORK_VERSION]]` in the `Version reviewed:` line either a tag, a commit SHA, a release name, `HEAD`, or `unknown` — and was the framework's actual version verified against this value?
- [ ] Has unmerged or unreleased work been noted as "planned / unreleased" in score rationales rather than counted toward scores?
