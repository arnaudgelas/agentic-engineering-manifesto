# Sub-prompt 03c — Agentic Loop, Runtime Phases (Observe, Learn, Govern) and Human Escalation

**Purpose:** Produce a rigorous, evidence-grounded assessment of how well `[[FRAMEWORK]]` implements the final three phases of the Agentic Loop — **Observe**, **Learn**, and **Govern** — plus the Human Escalation Architecture, mapped to `[[INDUSTRY]]` regulatory risk. This agent owns canonical **Part 3, §3.7–§3.10**.

**Placeholder reminder:** Before executing, verify that every `[[...]]` token in this file has been replaced by the orchestrator. If any placeholder is still literal text, stop and report it.

**Canonical references (do not duplicate inline):** Severity thresholds, score weighting, effort sizing, banned soft language, idempotency policy, universal hard rules, and the out-of-scope corpus list are all delivered in the orchestrator's Universal Prepend Block. Apply them; do not restate or narrow them.

**Scope boundary — read this before you start.** You score **three phases only**, and you author the Human Escalation Architecture section. You do **not** score Specify, Design, Plan, Execute, Verify, or Validate (agents 03a and 03b own those). You do **not** score cross-phase seams, feedback arrows, the remediation sub-cycle, the loop-output artefacts, or the end-to-end evidence trace (agent 03d owns those). You do **not** score the Definition of Done (agent 03e owns it). Do not produce a composite score, a maturity verdict, or a remediation roadmap. Staying inside this boundary is what buys the depth this prompt demands.

---

## 1. Inputs to Read

Read the following before writing a single score. Do not score from memory or assumption.

### 1.1 `[[FRAMEWORK]]` artefacts

Read all source files, configuration, phase-gate logic, and lifecycle enforcement mechanisms from `[[FRAMEWORK_PATH]]` — never from `[[FRAMEWORK_LOWER]]/`, which is this review's own output directory. For every claim made about `[[FRAMEWORK]]`'s behaviour, the supporting evidence MUST be a verbatim quote from a named source file with its path.

For these three phases, pay particular attention to: logging and telemetry configuration, trace and span emission, watcher or monitor plugins, dashboards and HUD definitions, cost and token accounting, drift detection, memory stores and their write paths, knowledge bases and their curation mechanisms, retrieval corpora, skill or heuristic registries, policy definitions and their enforcement points, approval workflows, audit-trail artefacts, escalation hooks, and any economics, budget, or spend-limit mechanism.

### 1.2 Manifesto corpus

- `manifesto/manifesto.md` — the Agentic Loop section, specifically the definitions of Observe, Learn (including the Phase 4–5 knowledge/memory distinction and the Phase 6 weight-update boundary), and Govern (including the **five Govern completion conditions**: all outstanding policy violations resolved; accountability signals within threshold with no rubber-stamping pattern detected; economics review recorded; architectural decisions triggered by governance filed back into Design; tool invocations confirmed within the authorised scope for the operating tier, with any out-of-scope tool call classified as a policy violation triggering the remediation sub-cycle).
- `manifesto/manifesto-principles.md` plus the shards that carry these phases' binding bars: `manifesto/manifesto-principles-06.md` (P6 knowledge and memory are distinct infrastructure), `manifesto/manifesto-principles-09.md` (P9 observability and interoperability cover reasoning — both minimum-bar paragraphs), `manifesto/manifesto-principles-11.md` (P11 economics of intelligence), `manifesto/manifesto-principles-12.md` (P12 accountability requires visibility), `manifesto/manifesto-principles-05.md` (P5 — the four oversight patterns and the Tier 4 prerequisites).
- `manifesto/manifesto-done.md` — the `Governed`, `Learned from`, and `Economical` conditions, read here only to establish the phase bar. Do not score DoD conditions; agent 03e owns them.
- `glossary.md` — canonical term definitions.

### 1.3 Cross-stack normative artefacts (lift only AEM-relevant content; apply the scope guard from the prepend block)

- `governance/integrated-audit-trail.md` — the AEM execution trace section. Primary anchor for **Observe**.
- `governance/governance-integration-note.md` — the AEM Tier 4 binary policy envelope and the four Tier 4 prerequisites. Primary anchor for **Govern**.
- `governance/authority-accountability-matrix.md` — AEM column. Anchors **Govern** and the Human Escalation Architecture.
- `governance/phase-level-matrix.md` — AEM column only. Anchors **Govern**.
- `integration/low-consequence-resolution.md` — the per-action accountability minimum bar. AEM has **no** consequence-class carve-out; a framework that exempts "low-risk" actions from per-action accountability fails the AEM bar. Anchors **Govern**.
- `operational-templates/slo-table.md` — feedback-loop-closure SLOs, claim-revalidation SLOs, waiver-expiry SLOs. Anchors **Learn** and **Govern**.
- `operational-templates/agent-inventory-schema.md` — a registered estate is a precondition for governance. Anchors **Govern**.
- `operational-templates/control-state-record.json` — the machine-readable per-control verdict schema. Anchors **Govern**.
- `operational-templates/risk-appetite-statement.md` — board-level appetite. Anchors **Govern**.
- `adoption/metrics.md` — rubber-stamping detection and oversight-adequacy metrics. Anchors **Govern** and the Human Escalation Architecture.
- `regulatory/incidents-appendix.md` — named real-world incidents, including memory poisoning. Anchors the **Learn** silent-failure probe.
- `regulatory/eu-ai-act-addendum.md` — Articles 12 and 13 (logging and transparency) for **Observe**; Article 14 (human oversight) for the Human Escalation Architecture.
- `companion/reference.md` — failure modes including over-governance, evidence theater, and rubber-stamping.

### 1.4 Domain file

`[[DOMAIN_FILE]]` — read in full. Every phase's gap paragraph maps to a specific regulation or risk type from this file, cited by article or section number. Do not forward-propagate content from `[[DOMAIN_FILE]]` into `[[FRAMEWORK]]` claims.

### 1.5 Prior reviews

`[[PRIOR_REVIEWS]]` — read if not `none`. Peer comparison only. Do not let prior scores anchor your own.

---

## 2. Methodology

### 2.1 The absence-verification rule (hard requirement)

Every claim that `[[FRAMEWORK]]` lacks a mechanism MUST name the search that established the absence — the literal Grep pattern or Glob pattern run, and the directory searched. Format: `(no match for \`Grep "otel|opentelemetry|trace_id" [[FRAMEWORK_PATH]]\`)`. An unverified absence claim is a scoring defect. Inferring absence from "I did not see it while reading" is not permitted; run the search.

### 2.2 The per-phase scoring rubric (binding constraint)

For each of the three phases, assess these five criteria independently. Each receives exactly one verdict: **Met**, **Partially met**, or **Absent**.

| # | Criterion | Met when |
| --- | --- | --- |
| C1 | **Phase presence** | A named, identifiable construct in `[[FRAMEWORK]]` corresponds to this manifesto phase, and you can name it verbatim from a `[[FRAMEWORK]]` source file. |
| C2 | **Entry gate** | `[[FRAMEWORK]]` tests this phase's preconditions and refuses to proceed when they are unmet — and the refusal is enforced by a mechanism (hook, schema validation, CI check, blocking gate), not merely advised in prose. |
| C3 | **Mechanism enforcement** | At least one *runtime-enforced* mechanism carries the phase's core obligation. Documentation, templates, checklists, and prompt instructions are convention, not enforcement. |
| C4 | **Exit artefact** | The phase produces a durable, named, machine-readable artefact that the next phase demonstrably consumes. For Govern, "the next phase" is the next loop iteration's Specify. A prose summary that no downstream step reads does not satisfy C4. |
| C5 | **Evidence quality** | The phase's output satisfies all four Evidence Quality Gate properties: **Attributable** (named agent/tool plus named accountable human), **Contemporaneous** (recorded during the work, not reconstructed), **Queryable** (retrievable without heroic manual effort), **Bound-to-outcome** (clearly linked to the change, decision, or action). |

Map the count of **fully Met** criteria to a score band:

| Fully Met | Band |
| --- | --- |
| 5 | 80–100 |
| 4 | 60–79 |
| 3 | 40–59 |
| 2 | 20–39 |
| 0–1 | 0–19 |

Partially-met criteria earn credit *within* the band and cannot move the score across a band boundary.

**Placing the score inside the band — binding.** Partial credit is not a matter of impression. Let `P` = the number of **Partially met** criteria and `A` = the number of **Absent** criteria. If `P + A = 0`, the score is the band's **ceiling**. Otherwise the score is `floor + round(width × P / (P + A))`, where `floor` is the band's lower bound and `width` is `ceiling − floor` (round halves up). This is the only permitted placement rule — do not adjust the integer on judgement. Example: three criteria Met (band 40–59, floor 40, width 19) with one Partially met and one Absent gives `40 + round(19 × 0.5) = 50`.

**Two hard overrides, applied after the band is set:**
- If **C1 is Absent**, the score cannot exceed **19**.
- If **C3 is Absent** — no runtime-enforced mechanism anywhere in the phase — the score cannot exceed **39**.

**One additional override specific to this segment:** if any of the **five Govern completion conditions** is Absent, **Govern cannot exceed 59**, and the missing condition must be named in Govern's `**The gap.**` paragraph. `manifesto/manifesto.md` states a Govern cycle is not complete until all five hold; a framework satisfying four of five does not complete Govern.

**Resolving overrides against the band — binding.** An override sets a hard ceiling. The **effective band** is the derived band intersected with `0–{cap}`; where more than one override applies, use the lowest cap. If that intersection is empty — the cap sits below the derived band's floor — the effective band is `0–{cap}`. **When the cap sits below the derived band's floor**, do not re-run the placement formula over `0–{cap}`: compute the placement inside the *derived* band as normal, then clamp to the cap — `score = min(placement, cap)`. The criteria counts earned the band position; a cap is a ceiling, not a re-scaling. Worked example: three criteria Met with one Partially met and one Absent places at 50 in band 40–59; a cap of 39 makes the final score 39, not 20. The final integer MUST lie inside the **effective** band. Example: three criteria Met (derived band 40–59) with C3 Absent (cap 39) gives an effective band of 0–39, not 40–59.

State the rubric verdicts, the count, the derived band, any override, the effective band, and the final integer explicitly in each phase's `**Score derivation.**` paragraph. A score that does not follow from its own stated rubric verdicts is a defect; resolve it before saving.

### 2.3 Per-phase analysis procedure

For each phase in order (Observe, Learn, Govern):

1. Re-read the phase definition in `manifesto/manifesto.md` and the binding principle bar from the shard named in §3 below, to establish the bar *before* assessing `[[FRAMEWORK]]`.
2. Identify every artefact, function, gate, hook, schema, or mechanism in `[[FRAMEWORK]]` that corresponds to this phase. Name files and rule text with full paths.
3. Build the mechanism inventory and classify each mechanism's enforcement level honestly. A prompt-file instruction is `Convention-only`. A policy engine that denies a call is `Runtime-enforced`.
4. Establish the entry gate and exit contract independently of the phase's internal behaviour.
5. Run the silent-failure probe: name the specific way this phase produces plausible-but-wrong output that `[[FRAMEWORK]]` does not catch, and trace how far that output travels before anything would stop it. For Observe, the probe must address whether an absence of signal is distinguishable from an absence of problem. For Learn, the probe must address memory poisoning per `regulatory/incidents-appendix.md`.
6. Apply the Evidence Quality Gate as four separate verdicts, not as a single impression.
7. Apply the §2.2 rubric and derive the score.
8. Map the gap to a specific regulation or risk type from `[[DOMAIN_FILE]]`, cited by article or section number.

### 2.4 Phase-specific mandatory content

**Observe** — the manifesto's bar is "monitors runtime behavior, drift, and cost", and P9's bar is that traces must let you answer "why did this happen" from decision-relevant observable evidence and causal execution history alone. Assess all three of behaviour, drift, and cost separately — a framework that logs invocations but tracks neither drift nor cost meets one third of the bar. Assess whether model-authored rationale is correctly treated as an untrusted assertion rather than ground truth. Assess **governance-state observability** per P9's second minimum-bar paragraph: stale evidence in active bundles, controls in failed or waived state without a resolution timeline, accountability ownership gaps, rubber-stamping patterns, and model/prompt/tool-manifest changes that did not trigger an evaluation re-run.

**Learn** — the manifesto's bar distinguishes **knowledge** ("durable truth", added to the knowledge base) from **memory** ("learned heuristics and reusable skills", curated with new heuristics, routing preferences, and reusable skills). Assess whether `[[FRAMEWORK]]` maintains these as distinct infrastructure or collapses them into one store — collapsing them is the P6 failure. Assess whether the write path is curated (reviewed, attributable, revocable) or append-anything. Assess whether observations demonstrably reach the store, or whether Learn is a documented intention with no wired input. State whether weight updates are correctly scoped out as Phase 6 infrastructure rather than treated as a per-loop operation.

**Govern** — assess each of the **five completion conditions** as a separate verdict, in a table. Assess the per-action accountability bar with no consequence-class carve-out per `integration/low-consequence-resolution.md`. Assess whether a control state record is produced at loop completion (not assembled post-hoc) per `operational-templates/control-state-record.json`, including waiver rationale, granting human's name, and expiry date. Assess whether the agent estate is registered per `operational-templates/agent-inventory-schema.md` — an unregistered estate cannot be governed. If `[[FRAMEWORK]]` claims or supports Tier 4, evaluate the four Tier 4 prerequisites.

### 2.5 Human Escalation Architecture (§3.10)

Assess `[[FRAMEWORK]]`'s escalation triggers, escalation path, response-time SLAs, and fitness for `[[ORGANIZATION]]`'s regulatory context. This section sits at the boundary between the loop and the humans accountable for it; it belongs with the runtime segment because escalation is what Observe and Govern do when a threshold is crossed. Required content is specified in §3.5 below.

---

## 3. Output Specification

Write the output to: `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03c_loop_runtime.md`

### 3.1 Title and metadata block

```
# [[FRAMEWORK]] Review 03c — Agentic Loop, Runtime Phases (Observe, Learn, Govern) and Human Escalation

**Framework:** [[FRAMEWORK]]
**Version:** [[FRAMEWORK_VERSION]]
**Client context:** [[ORGANIZATION]]
**Regulatory overlay:** [[INDUSTRY]]
**Reviewer date:** YYYY-MM-DD
**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]`
**Scope:** Canonical Part 3, §3.7–§3.10 (Observe, Learn, Govern, Human Escalation Architecture)
**Source artefacts read:** <list every file actually read, with paths>
```

### 3.2 Opening paragraph

3–5 sentences characterising `[[FRAMEWORK]]`'s relationship to the *runtime* segment of the loop. The paragraph must (a) state whether the mapping is direct, partial, or a structural mismatch; (b) name `[[FRAMEWORK]]`'s own phase-level construct verbatim; (c) state which of Observe / Learn / Govern have no `[[FRAMEWORK]]` counterpart.

### 3.3 Per-phase subsections

Exactly three subsections, in this order, using these exact heading formats:

```
### 3.7 Observe | **{score}/100**
### 3.8 Learn | **{score}/100**
### 3.9 Govern | **{score}/100**
```

Each subsection contains the following labelled blocks, in this exact order. All are prose paragraphs except `**Mechanism inventory.**` (a table) and each phase's specific insert.

```
**Entry gate.** [What must be true before [[FRAMEWORK]] enters this phase; whether [[FRAMEWORK]] tests it; enforced or advisory. Verbatim [[FRAMEWORK]] quote with path, or an explicit absence statement carrying the search per §2.1.]

**What [[FRAMEWORK]] does.** [At least one verbatim quote from a [[FRAMEWORK]] source file with its path. Name specific files, functions, commands, and rule identifiers.]

**Mechanism inventory.**

| Mechanism | Artefact (path + identifier) | Enforcement | Failure class caught |
|---|---|---|---|

[Enforcement is one of: `Runtime-enforced`, `Convention-only`, `Documented-not-implemented`, `Absent`. Failure class is one of: `Structural`, `Semantic`, `Both`, `None`. Minimum three rows, or a single row recording `Absent` with the §2.1 search that established it.]

**What the manifesto requires.** [Verbatim quote of the phase definition from `manifesto/manifesto.md` with its path, AND a verbatim quote of the binding principle minimum bar from the named shard with its path.]

**Exit contract.** [The named durable artefact this phase must hand to the next; whether [[FRAMEWORK]] produces it; whether it is machine-readable; whether the next phase demonstrably consumes it or it is dropped. For Govern, state what is handed to the next loop iteration's Specify.]

**Silent-failure probe.** [The specific way this phase produces plausible-but-wrong output that [[FRAMEWORK]] does not catch. What would be observably wrong. Which [[FRAMEWORK]] artefact would or would not detect it. How far the wrong output travels before anything stops it.]

**Evidence quality.** [Four separate verdicts — Attributable, Contemporaneous, Queryable, Bound-to-outcome — each Met / Partially met / Absent, each with a named artefact or a verified absence.]

**The gap.** [The specific missing artefact, mechanism, or process that the manifesto requires and [[FRAMEWORK]] does not demonstrably provide. Tie to a named [[INDUSTRY]] regulation by article or section number from [[DOMAIN_FILE]].]

**Score derivation.** [C1–C5 verdicts, count of fully Met, derived band, the placement arithmetic `floor + round(width × P/(P+A))` with P and A stated, any override applied and why, effective band, final integer.]
```

**Observe only** — insert immediately after `**What [[FRAMEWORK]] does.**`:

```
**Observability coverage check.**

- **Runtime behaviour:** {Met / Partially met / Absent} — {evidence}
- **Drift:** {Met / Partially met / Absent} — {evidence or verified absence}
- **Cost:** {Met / Partially met / Absent} — {evidence or verified absence}
- **Reasoning vs execution:** {Reasoning covered / Execution only} — {state directly; do not equivocate}
- **Model-authored rationale treated as untrusted:** {Met / Partially met / Absent} — {evidence; a chain-of-thought summary attached to a trace is an assertion, not proof}
- **AEM execution trace producible** (`governance/integrated-audit-trail.md`): trace IDs linking spec → design → plan → execute → verify → validate → observe → learn → govern {verdict}; per-action tool calls, decisions, evaluation results, rollbacks, near-misses {verdict}; OpenTelemetry-compatible identifiers {verdict}; replayable from trace ID plus provenance record plus tool manifest plus composite state {verdict}
- **Governance-state observability** (P9 second minimum bar): stale evidence in active bundles {verdict}; controls failed or waived without resolution timeline {verdict}; accountability ownership gaps {verdict}; rubber-stamping patterns {verdict}; model/prompt/tool-manifest changes not triggering an evaluation re-run {verdict}
- **Absence of signal vs absence of problem:** {can [[FRAMEWORK]] distinguish them? state plainly with evidence}
```

**Learn only** — insert immediately after `**What [[FRAMEWORK]] does.**`:

```
**Knowledge/memory separation check.**

- **Knowledge base (durable truth) exists as distinct infrastructure:** {Met / Partially met / Absent} — {evidence or verified absence}
- **Learned memory (heuristics, routing preferences, reusable skills) exists as distinct infrastructure:** {Met / Partially met / Absent} — {evidence or verified absence}
- **The two are separated, not collapsed into one store:** {Met / Partially met / Absent} — {evidence; collapsing them is the P6 failure}
- **Write path is curated — reviewed, attributable, revocable:** {Met / Partially met / Absent} — {evidence}
- **Observations demonstrably reach the store:** {Met / Partially met / Absent} — {evidence; a Learn phase with no wired input is documented intention, not implementation}
- **Feedback-loop closure SLO** (`operational-templates/slo-table.md`): {Met / Partially met / Absent} — {evidence}
- **Weight updates correctly scoped as Phase 6 infrastructure, not a per-loop operation:** {Met / Partially met / Absent / Not addressed} — {evidence}
```

**Govern only** — insert immediately after `**What [[FRAMEWORK]] does.**`:

```
**Govern completion conditions.**

| # | Condition (`manifesto/manifesto.md`) | Verdict | [[FRAMEWORK]] evidence or verified absence |
|---|---|---|---|
| 1 | All outstanding policy violations resolved | | |
| 2 | Accountability signals within threshold; no rubber-stamping pattern detected | | |
| 3 | Economics review recorded | | |
| 4 | Architectural decisions triggered by governance filed back into Design | | |
| 5 | Tool invocations confirmed within authorised scope for the operating tier | | |

**Governance substrate check.**

- **Per-action accountability with no consequence-class carve-out** (`integration/low-consequence-resolution.md`): {Met / Partially met / Absent} — {evidence}
- **Control state record produced at loop completion, not post-hoc** (`operational-templates/control-state-record.json`): {Met / Partially met / Absent} — {evidence}
- **Waiver carries rationale, granting human's name, and expiry date:** {Met / Partially met / Absent} — {evidence}
- **Agent estate registered** (`operational-templates/agent-inventory-schema.md`): {Met / Partially met / Absent} — {evidence}
- **Tier 4 prerequisites** (only if [[FRAMEWORK]] claims or supports Tier 4): machine-enforced policy envelope {verdict}; passing control evaluations {verdict}; instrumented governance observability {verdict}; active rubber-stamping detection {verdict}. Absence of any one means Tier 4 is ungoverned production autonomy per the manifesto.
```

### 3.4 Runtime segment verdict

```
### Runtime Segment Verdict
```

Three to five sentences. State which of the three phases is the weakest link and why, in terms of the rubric criteria — not in terms of overall impression. Name the single artefact whose absence most constrains the runtime segment. Do not average the three scores; do not extend the verdict to phases you did not score.

### 3.5 Human Escalation Architecture

```
### 3.10 Human Escalation Architecture
```

Four required sub-paragraphs, in this order, each labelled:

- **Escalation triggers** — the conditions under which `[[FRAMEWORK]]` requires human intervention. Cite specific artefacts with paths. State for each trigger whether it is runtime-enforced or convention-only. If no trigger exists, state so with the §2.1 search.
- **Escalation path** — named roles and steps within `[[FRAMEWORK]]`'s artefacts, or an explicit statement of their absence. Anchor to `governance/authority-accountability-matrix.md` (AEM column). State whether the path terminates in a *named individual* or in an unnamed role — an escalation path that ends at "the team" does not satisfy P12.
- **Response time** — the documented SLA or timeout. Cite the artefact or state the absence. State whether the response window has been measured against the irreversibility window; if it has not, state that the escalation architecture is unvalidated.
- **Fitness for `[[ORGANIZATION]]` context** — enumerate **at least four** named regulatory obligations from `[[DOMAIN_FILE]]`, each with its article or section number, and state the gap against each.

---

## 4. Hard Rules

- **Verbatim quotes are mandatory.** Each of the three phases carries at least one verbatim `[[FRAMEWORK]]` quote with path and at least one verbatim `manifesto/manifesto.md` quote with path, plus one verbatim principle-shard quote with path.
- **Absence claims carry their search** (§2.1). No exceptions.
- **Whole integer scores only.** 0–100, no decimals.
- **The score must follow from the rubric.** A score outside the **effective** band its own C1–C5 verdicts and overrides produce is a defect.
- **Do not equivocate on the Observe reasoning question.** If the observability covers only execution, state so. Do not soften the finding.
- **No praise for undemonstrated capability.** Mark roadmapped capability `_[Planned, not operational]_` and give it zero weight.
- **Out-of-scope gaps are annotated, not discounted.** The rubric governs the integer without exception: a capability that is absent scores as absent, whether or not `[[FRAMEWORK]]` documents it as out of scope. Mark such a dimension `*[Scope gap]*` and state in its `**The gap.**` paragraph that the gap is closed by composition rather than by `[[FRAMEWORK]]` — that annotation is what carries the scope finding, not a score adjustment. Do not apply any deduction *beyond* the rubric for an out-of-scope item, and do not raise a rubric-derived score because a gap is documented.
- **No two phases share a gap sentence.** If Observe and Govern would receive the same gap paragraph, at least one of them is under-analysed. Rewrite.
- **Score-consistency invariant.** This agent is the **sole source** of the phase scores for Part 3 §3.7–§3.9. No other agent scores these phases — agent 01 emits `—` in its Agentic Loop Phases Table by design. Agent 09 lifts these scores verbatim. There is no second estimate to reconcile, so a score written loosely here is never caught downstream: derive each one from the C1–C5 rubric and show the derivation.
- **Cross-references use canonical part numbers** (e.g., "see Part 3, §3.11", "see Part 12"). Never use file names, agent numbers, or wave designations in cross-references within output content.
- **Dates in YYYY-MM-DD.** British English throughout.
- **No forward-propagation from `[[DOMAIN_FILE]]` into framework claims.**

---

## 5. Self-Check Before Writing

**Do not save the output file until every item below is confirmed.** Items marked **[substantive]** are not formatting checks — they gate analytical quality and are the reason this agent exists.

- [ ] Header metadata block contains the substring `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]`.
- [ ] Exactly three phase subsections, headed `### 3.7 Observe | **{score}/100**`, `### 3.8 Learn | **{score}/100**`, `### 3.9 Govern | **{score}/100**`.
- [ ] Each phase subsection contains all nine labelled blocks in the mandated order, plus its phase-specific insert.
- [ ] Observe's coverage check has all eight bullets; Learn's separation check has all seven bullets; Govern has both the five-row completion-conditions table and the five-bullet substrate check.
- [ ] Every mechanism inventory table classifies enforcement using only the four permitted values.
- [ ] **[substantive]** Every absence claim in the file names the Grep or Glob search that established it.
- [ ] **[substantive]** Each phase's `**Score derivation.**` states five verdicts, a count, a band, any override, a final integer, and — where an override applies — the effective band; the integer lies inside the effective band.
- [ ] **[substantive]** The Govern five-condition override is applied: if any condition is Absent, Govern does not exceed 59 and the missing condition is named in Govern's gap paragraph.
- [ ] **[substantive]** The Observe reasoning-vs-execution question is answered directly and without softening.
- [ ] **[substantive]** Learn's silent-failure probe addresses memory poisoning with reference to `regulatory/incidents-appendix.md`.
- [ ] **[substantive]** No two phases share a gap sentence or a silent-failure probe. Each probe names a concrete, phase-specific failure and traces its propagation distance.
- [ ] **[substantive]** Each phase's `**Evidence quality.**` block gives four separate verdicts, not one blended judgement.
- [ ] Each phase cites a regulation by article or section number from `[[DOMAIN_FILE]]`.
- [ ] `### Runtime Segment Verdict` present; names the weakest phase by rubric criteria; does not average the scores; does not extend to unscored phases.
- [ ] `### 3.10 Human Escalation Architecture` present with all four labelled sub-paragraphs, and the Fitness paragraph enumerates at least four named regulatory obligations with article or section numbers.
- [ ] **[substantive]** The escalation path sub-paragraph states whether the path terminates in a named individual or an unnamed role; the response-time sub-paragraph states whether the window has been measured against the irreversibility window.
- [ ] No composite score, maturity verdict, DoD assessment, cross-phase seam analysis, or remediation roadmap appears anywhere in the file.
- [ ] All dates YYYY-MM-DD. British English.
- [ ] No remaining `[[` or `]]` tokens.
- [ ] No banned soft language in the agent's own prose.
- [ ] Zero out-of-scope-corpus token matches. Every manifesto-side file cited is tracked by git on the current branch.
