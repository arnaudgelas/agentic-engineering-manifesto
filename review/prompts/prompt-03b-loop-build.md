# Sub-prompt 03b — Agentic Loop, Build Phases (Execute, Verify, Validate)

**Purpose:** Produce a rigorous, evidence-grounded assessment of how well `[[FRAMEWORK]]` implements the middle three phases of the Agentic Loop — **Execute**, **Verify**, and **Validate** — mapped to `[[INDUSTRY]]` regulatory risk. This agent owns canonical **Part 3, §3.4–§3.6**.

**Placeholder reminder:** Before executing, verify that every `[[...]]` token in this file has been replaced by the orchestrator. If any placeholder is still literal text, stop and report it.

**Canonical references (do not duplicate inline):** Severity thresholds, score weighting, effort sizing, banned soft language, idempotency policy, universal hard rules, and the out-of-scope corpus list are all delivered in the orchestrator's Universal Prepend Block. Apply them; do not restate or narrow them.

**Scope boundary — read this before you start.** You score **three phases only**. You do **not** score Specify, Design, Plan, Observe, Learn, or Govern (agents 03a and 03c own those). You do **not** score cross-phase seams, feedback arrows, the remediation sub-cycle, the loop-output artefacts, or the end-to-end evidence trace (agent 03d owns those). You do **not** score the Definition of Done (agent 03e owns it). Do not produce a composite score, a maturity verdict, or a remediation roadmap. Staying inside this boundary is what buys the depth this prompt demands.

---

## 1. Inputs to Read

Read the following before writing a single score. Do not score from memory or assumption.

### 1.1 `[[FRAMEWORK]]` artefacts

Read all source files, configuration, phase-gate logic, and lifecycle enforcement mechanisms from `[[FRAMEWORK_PATH]]` — never from `[[FRAMEWORK_LOWER]]/`, which is this review's own output directory. For every claim made about `[[FRAMEWORK]]`'s behaviour, the supporting evidence MUST be a verbatim quote from a named source file with its path.

For these three phases, pay particular attention to: execution loops and agent runners, tool registries and permission sets, sandboxing or isolation configuration, approval and gating hooks, test and evaluation harnesses, evaluation definitions and their versioning, CI configuration, regression suites, adversarial or red-team suites, acceptance-criteria checking, sign-off mechanisms, and anything that can block a change from proceeding.

### 1.2 Manifesto corpus

- `manifesto/manifesto.md` — the Agentic Loop section (phase definitions for Execute, Verify, and Validate), and the paragraph distinguishing verification from validation ("Verification is technical correctness against the spec. Validation is fitness for intended use in the real world.").
- `manifesto/manifesto-principles.md` plus the shards that carry these phases' binding bars: `manifesto/manifesto-principles-05.md` (P5 autonomy is a permission ceiling — including the four oversight patterns HITL/HOTL/HOLL/EDL and the Tier 4 prerequisites), `manifesto/manifesto-principles-08.md` (P8 evaluations are the contract), `manifesto/manifesto-principles-10.md` (P10 assume emergence, engineer containment), `manifesto/manifesto-principles-03.md` (P3 defense-in-depth).
- `manifesto/manifesto-done.md` — the `Verified` and `Provable` conditions and the evidence-freshness rules, read here only to establish the Verify/Validate bar. Do not score DoD conditions; agent 03e owns them.
- `glossary.md` — canonical term definitions.

### 1.3 Cross-stack normative artefacts (lift only AEM-relevant content; apply the scope guard from the prepend block)

- `governance/composition-rule.md` — the AEM autonomy-tier gate. Primary anchor for **Execute**.
- `governance/phase-level-matrix.md` — AEM column only; Phase × maximum tier. Anchors **Execute**.
- `governance/governance-integration-note.md` — the AEM Tier 4 binary policy envelope and the four Tier 4 prerequisites. Anchors **Execute** where `[[FRAMEWORK]]` claims or supports Tier 4.
- `governance/evidence-bundle-schema.md` — the `aem_components` section; evaluation reports and governance evaluations. Anchors **Verify**.
- `governance/authority-accountability-matrix.md` — AEM column; who holds blocking authority. Anchors **Validate**.
- `operational-templates/agentic-provenance-record.json` — the harness-identity schema that makes an evaluation result reproducible. Anchors **Verify**.
- `operational-templates/slo-table.md` — claim-revalidation and feedback-loop-closure SLOs. Anchors **Validate**.
- `regulatory/incidents-appendix.md` — named real-world incidents. Use for the Execute silent-failure probe where a named incident matches the failure class.
- `companion/patterns.md` and `companion/reference.md` — failure-mode patterns, including evidence theater and rubber-stamping.
- `companion/frameworks.md` — hard autonomy caps by regulated use case.
- `adoption/metrics.md` — rubber-stamping detection and oversight-adequacy metrics. Anchors **Validate**.

### 1.4 Domain file

`[[DOMAIN_FILE]]` — read in full. Every phase's gap paragraph maps to a specific regulation or risk type from this file, cited by article or section number. Do not forward-propagate content from `[[DOMAIN_FILE]]` into `[[FRAMEWORK]]` claims.

### 1.5 Prior reviews

`[[PRIOR_REVIEWS]]` — read if not `none`. Peer comparison only. Do not let prior scores anchor your own.

---

## 2. Methodology

### 2.1 The absence-verification rule (hard requirement)

Every claim that `[[FRAMEWORK]]` lacks a mechanism MUST name the search that established the absence — the literal Grep pattern or Glob pattern run, and the directory searched. Format: `(no match for \`Grep "adversarial|red.?team" [[FRAMEWORK_PATH]]\`)`. An unverified absence claim is a scoring defect. Inferring absence from "I did not see it while reading" is not permitted; run the search.

### 2.2 The per-phase scoring rubric (binding constraint)

For each of the three phases, assess these five criteria independently. Each receives exactly one verdict: **Met**, **Partially met**, or **Absent**.

| # | Criterion | Met when |
| --- | --- | --- |
| C1 | **Phase presence** | A named, identifiable construct in `[[FRAMEWORK]]` corresponds to this manifesto phase, and you can name it verbatim from a `[[FRAMEWORK]]` source file. |
| C2 | **Entry gate** | `[[FRAMEWORK]]` tests this phase's preconditions and refuses to proceed when they are unmet — and the refusal is enforced by a mechanism (hook, schema validation, CI check, blocking gate), not merely advised in prose. |
| C3 | **Mechanism enforcement** | At least one *runtime-enforced* mechanism carries the phase's core obligation. Documentation, templates, checklists, and prompt instructions are convention, not enforcement. |
| C4 | **Exit artefact** | The phase produces a durable, named, machine-readable artefact that the next phase demonstrably consumes. A prose summary that no downstream step reads does not satisfy C4. |
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

**One additional override specific to this segment:** if **Verify and Validate are not separated** — that is, if `[[FRAMEWORK]]` performs a single "testing" or "review" step that conflates technical correctness against the specification with fitness for real-world use — then **Validate cannot exceed 39**, and the conflation must be named explicitly in Validate's `**The gap.**` paragraph. `manifesto/manifesto.md` states both are required; a framework that provides one and calls it both provides one.

**Resolving overrides against the band — binding.** An override sets a hard ceiling. The **effective band** is the derived band intersected with `0–{cap}`; where more than one override applies, use the lowest cap. If that intersection is empty — the cap sits below the derived band's floor — the effective band is `0–{cap}`. **When the cap sits below the derived band's floor**, do not re-run the placement formula over `0–{cap}`: compute the placement inside the *derived* band as normal, then clamp to the cap — `score = min(placement, cap)`. The criteria counts earned the band position; a cap is a ceiling, not a re-scaling. Worked example: three criteria Met with one Partially met and one Absent places at 50 in band 40–59; a cap of 39 makes the final score 39, not 20. The final integer MUST lie inside the **effective** band. Example: three criteria Met (derived band 40–59) with C3 Absent (cap 39) gives an effective band of 0–39, not 40–59.

State the rubric verdicts, the count, the derived band, any override, the effective band, and the final integer explicitly in each phase's `**Score derivation.**` paragraph. A score that does not follow from its own stated rubric verdicts is a defect; resolve it before saving.

### 2.3 Per-phase analysis procedure

For each phase in order (Execute, Verify, Validate):

1. Re-read the phase definition in `manifesto/manifesto.md` and the binding principle bar from the shard named in §3 below, to establish the bar *before* assessing `[[FRAMEWORK]]`.
2. Identify every artefact, function, gate, hook, schema, or mechanism in `[[FRAMEWORK]]` that corresponds to this phase. Name files and rule text with full paths.
3. Build the mechanism inventory and classify each mechanism's enforcement level honestly. A prompt-file instruction is `Convention-only`. A CI job that fails the build is `Runtime-enforced`.
4. Establish the entry gate and exit contract independently of the phase's internal behaviour.
5. Run the silent-failure probe: name the specific way this phase produces plausible-but-wrong output that `[[FRAMEWORK]]` does not catch, and trace how far that output travels before anything would stop it. For Execute, a passing test suite is not a catch if the test suite was authored by the same agent that wrote the code — say so if that is the case.
6. Apply the Evidence Quality Gate as four separate verdicts, not as a single impression.
7. Apply the §2.2 rubric and derive the score.
8. Map the gap to a specific regulation or risk type from `[[DOMAIN_FILE]]`, cited by article or section number.

### 2.4 Phase-specific mandatory content

**Execute** — the manifesto's bar is "carries out the plan within **bounded autonomy**". The word that carries the weight is *bounded*. Establish, with evidence: the autonomy tier `[[FRAMEWORK]]` actually operates at during execution; whether the permission set is enumerable and enforced rather than implicit; whether tool invocations outside the authorised scope are *prevented* or merely *logged*; whether the irreversibility window has been measured; and which containment mechanisms exist. Name which of the four oversight patterns (HITL synchronous / HITL asynchronous / HOTL / HOLL / EDL) `[[FRAMEWORK]]` instantiates during execution.

**Verify** — the manifesto's bar is "checks the output against the specification (did we build it right?)". Assess evaluations as a contract per P8: whether evaluations are versioned and coupled to a specification, whether coverage spans happy path *and* adversarial cases *and* regression scenarios, and whether a specification change *triggers* an evaluation change rather than leaving the two to drift. Assess whether governance evaluations (evidence-bundle completeness, provenance consistency, rollback-procedure currency) run alongside product evaluations. Assess reproducibility: whether a Verify result can be reproduced from the recorded harness identity per `operational-templates/agentic-provenance-record.json`.

**Validate** — the manifesto's bar is "checks the outcome against real-world need (did we build the right thing?)". Assess whether validation is *independent*: performed by a party organisationally separate from the builder, with the authority to block. Assess whether validation closes against the business-level success criterion established at the loop-readiness gate — if `[[FRAMEWORK]]` never captured that criterion, validation has nothing to close against, and that is the finding. Assess EDL qualification recording where expert-driven validation is used. Apply the Verify/Validate separation override from §2.2 if the two are conflated.

---

## 3. Output Specification

Write the output to: `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03b_loop_build.md`

### 3.1 Title and metadata block

```
# [[FRAMEWORK]] Review 03b — Agentic Loop, Build Phases (Execute, Verify, Validate)

**Framework:** [[FRAMEWORK]]
**Version:** [[FRAMEWORK_VERSION]]
**Client context:** [[ORGANIZATION]]
**Regulatory overlay:** [[INDUSTRY]]
**Reviewer date:** YYYY-MM-DD
**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]`
**Scope:** Canonical Part 3, §3.4–§3.6 (Execute, Verify, Validate)
**Source artefacts read:** <list every file actually read, with paths>
```

### 3.2 Opening paragraph

3–5 sentences characterising `[[FRAMEWORK]]`'s relationship to the *build* segment of the loop. The paragraph must (a) state whether the mapping is direct, partial, or a structural mismatch; (b) name `[[FRAMEWORK]]`'s own phase-level construct verbatim; (c) state explicitly whether `[[FRAMEWORK]]` separates verification from validation or conflates them.

### 3.3 Per-phase subsections

Exactly three subsections, in this order, using these exact heading formats:

```
### 3.4 Execute | **{score}/100**
### 3.5 Verify | **{score}/100**
### 3.6 Validate | **{score}/100**
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

**Exit contract.** [The named durable artefact this phase must hand to the next; whether [[FRAMEWORK]] produces it; whether it is machine-readable; whether the next phase demonstrably consumes it or it is dropped.]

**Silent-failure probe.** [The specific way this phase produces plausible-but-wrong output that [[FRAMEWORK]] does not catch. What would be observably wrong. Which [[FRAMEWORK]] artefact would or would not detect it. How far the wrong output travels before anything stops it.]

**Evidence quality.** [Four separate verdicts — Attributable, Contemporaneous, Queryable, Bound-to-outcome — each Met / Partially met / Absent, each with a named artefact or a verified absence.]

**The gap.** [The specific missing artefact, mechanism, or process that the manifesto requires and [[FRAMEWORK]] does not demonstrably provide. Tie to a named [[INDUSTRY]] regulation by article or section number from [[DOMAIN_FILE]].]

**Score derivation.** [C1–C5 verdicts, count of fully Met, derived band, the placement arithmetic `floor + round(width × P/(P+A))` with P and A stated, any override applied and why, effective band, final integer.]
```

**Execute only** — insert immediately after `**What [[FRAMEWORK]] does.**`:

```
**Bounded-autonomy check.**

- **Operating tier during execution:** Tier {1–4} — {structural evidence from a named [[FRAMEWORK]] artefact}
- **Permission set enumerable:** {Met / Partially met / Absent} — {evidence or verified absence}
- **Out-of-scope tool invocation:** {Prevented / Logged only / Undetected} — {evidence or verified absence}
- **Irreversibility window measured:** {Met / Partially met / Absent} — {evidence; if Absent, state that any HOTL claim is "the appearance of oversight" per the P5 minimum bar}
- **Containment mechanisms:** {list each with enforcement level, or a verified absence}
- **Oversight pattern instantiated:** {HITL synchronous / HITL asynchronous / HOTL / HOLL / EDL / none} — {evidence}
- **Phase × tier compatibility** (`governance/phase-level-matrix.md`, AEM column): {verdict and reasoning}
- **Tier 4 prerequisites** (only if [[FRAMEWORK]] claims or supports Tier 4): machine-enforced policy envelope {verdict}; passing control evaluations {verdict}; instrumented governance observability {verdict}; active rubber-stamping detection {verdict}. Absence of any one means Tier 4 is ungoverned production autonomy per the manifesto.
```

**Verify only** — insert immediately after `**What [[FRAMEWORK]] does.**`:

```
**Evaluation-contract check.**

- **Evaluations versioned and coupled to a specification:** {Met / Partially met / Absent} — {evidence}
- **Coverage — happy path:** {Met / Partially met / Absent} — {evidence}
- **Coverage — adversarial cases:** {Met / Partially met / Absent} — {evidence}
- **Coverage — regression scenarios:** {Met / Partially met / Absent} — {evidence}
- **Specification change triggers evaluation change:** {Met / Partially met / Absent} — {evidence; name the mechanism or the verified absence}
- **Governance evaluations run alongside product evaluations:** {Met / Partially met / Absent} — {evidence, anchored to `governance/evidence-bundle-schema.md` `aem_components`}
- **Result reproducible from recorded harness identity:** {Met / Partially met / Absent} — {evidence, anchored to `operational-templates/agentic-provenance-record.json`}
- **Author independence:** {are the evaluations authored by the same agent that produced the output under test? state plainly}
```

**Validate only** — insert immediately after `**What [[FRAMEWORK]] does.**`:

```
**Independence check.**

- **Verification and validation separated:** {Met / Partially met / Absent} — {evidence; if Absent, the §2.2 conflation override applies}
- **Validator organisationally separate from builder:** {Met / Partially met / Absent} — {evidence, anchored to `governance/authority-accountability-matrix.md` AEM column}
- **Validator holds blocking authority:** {Met / Partially met / Absent} — {evidence; a reviewer who cannot block is not a validator}
- **Closes against the business-level success criterion from the loop-readiness gate:** {Met / Partially met / Absent} — {evidence; if [[FRAMEWORK]] never captures that criterion, state that validation has nothing to close against}
- **EDL qualifications documented and current:** {Met / Partially met / Absent / Not applicable} — {evidence}
- **Rubber-stamping detection:** {Met / Partially met / Absent} — {evidence, anchored to `adoption/metrics.md`; sustained reviewer agreement above 95% or a near-zero override rate indicates accountability diffusion}
```

### 3.4 Closing subsection

```
### Build Segment Verdict
```

Three to five sentences. State which of the three phases is the weakest link and why, in terms of the rubric criteria — not in terms of overall impression. State explicitly whether `[[FRAMEWORK]]`'s build segment can distinguish "built it right" from "built the right thing", and what the consequence is for `[[ORGANIZATION]]`. Do not average the three scores; do not extend the verdict to phases you did not score.

---

## 4. Hard Rules

- **Read first, score second.** Every score is grounded in a named file, rule, or function from `[[FRAMEWORK]]`'s own artefacts and from the manifesto's source files.
- **Verbatim quotes are mandatory.** Each of the three phases carries at least one verbatim `[[FRAMEWORK]]` quote with path and at least one verbatim `manifesto/manifesto.md` quote with path, plus one verbatim principle-shard quote with path.
- **Absence claims carry their search** (§2.1). No exceptions.
- **Whole integer scores only.** 0–100, no decimals.
- **The score must follow from the rubric.** A score outside the **effective** band its own C1–C5 verdicts and overrides produce is a defect.
- **No praise for undemonstrated capability.** Mark roadmapped capability `_[Planned, not operational]_` and give it zero weight.
- **Out-of-scope gaps are annotated, not discounted.** The rubric governs the integer without exception: a capability that is absent scores as absent, whether or not `[[FRAMEWORK]]` documents it as out of scope. Mark such a dimension `*[Scope gap]*` and state in its `**The gap.**` paragraph that the gap is closed by composition rather than by `[[FRAMEWORK]]` — that annotation is what carries the scope finding, not a score adjustment. Do not apply any deduction *beyond* the rubric for an out-of-scope item, and do not raise a rubric-derived score because a gap is documented.
- **No two phases share a gap sentence.** If Verify and Validate would receive the same gap paragraph, that is itself the conflation finding — state it as such rather than duplicating prose.
- **Score-consistency invariant.** This agent is the **sole source** of the phase scores for Part 3 §3.4–§3.6. No other agent scores these phases — agent 01 emits `—` in its Agentic Loop Phases Table by design. Agent 09 lifts these scores verbatim. There is no second estimate to reconcile, so a score written loosely here is never caught downstream: derive each one from the C1–C5 rubric and show the derivation.
- **Cross-references use canonical part numbers** (e.g., "see Part 3, §3.11", "see Part 12"). Never use file names, agent numbers, or wave designations in cross-references within output content.
- **Dates in YYYY-MM-DD.** British English throughout.
- **No forward-propagation from `[[DOMAIN_FILE]]` into framework claims.**

---

## 5. Self-Check Before Writing

**Do not save the output file until every item below is confirmed.** Items marked **[substantive]** are not formatting checks — they gate analytical quality and are the reason this agent exists.

- [ ] Header metadata block contains the substring `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]`.
- [ ] Exactly three phase subsections, headed `### 3.4 Execute | **{score}/100**`, `### 3.5 Verify | **{score}/100**`, `### 3.6 Validate | **{score}/100**`.
- [ ] Each phase subsection contains all nine labelled blocks in the mandated order, plus its phase-specific insert.
- [ ] Execute's bounded-autonomy check has all eight bullets (Tier 4 prerequisites bullet present or explicitly marked not applicable).
- [ ] Verify's evaluation-contract check has all eight bullets; Validate's independence check has all six bullets.
- [ ] Every mechanism inventory table classifies enforcement using only the four permitted values.
- [ ] **[substantive]** Every absence claim in the file names the Grep or Glob search that established it.
- [ ] **[substantive]** Each phase's `**Score derivation.**` states five verdicts, a count, a band, any override, a final integer, and — where an override applies — the effective band; the integer lies inside the effective band.
- [ ] **[substantive]** The Verify/Validate separation question is answered explicitly, and if the two are conflated the §2.2 override is applied to Validate's score and named in Validate's gap paragraph.
- [ ] **[substantive]** Execute's silent-failure probe addresses whether a passing test suite constitutes an independent catch, given who authored the tests.
- [ ] **[substantive]** No two phases share a gap sentence or a silent-failure probe. Each probe names a concrete, phase-specific failure and traces its propagation distance.
- [ ] **[substantive]** Each phase's `**Evidence quality.**` block gives four separate verdicts, not one blended judgement.
- [ ] Each phase cites a regulation by article or section number from `[[DOMAIN_FILE]]`.
- [ ] `### Build Segment Verdict` present; names the weakest phase by rubric criteria; answers the built-it-right vs built-the-right-thing question; does not average the scores; does not extend to unscored phases.
- [ ] No composite score, maturity verdict, DoD assessment, cross-phase seam analysis, or remediation roadmap appears anywhere in the file.
- [ ] All dates YYYY-MM-DD. British English.
- [ ] No remaining `[[` or `]]` tokens.
- [ ] No banned soft language in the agent's own prose.
- [ ] Zero out-of-scope-corpus token matches. Every manifesto-side file cited is tracked by git on the current branch.
