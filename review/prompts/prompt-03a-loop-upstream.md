# Sub-prompt 03a — Agentic Loop, Upstream Phases (Specify, Design, Plan)

**Purpose:** Produce a rigorous, evidence-grounded assessment of how well `[[FRAMEWORK]]` implements the first three phases of the Agentic Loop — **Specify**, **Design**, and **Plan** — mapped to `[[INDUSTRY]]` regulatory risk. This agent owns canonical **Part 3, §3.1–§3.3**.

**Placeholder reminder:** Before executing, verify that every `[[...]]` token in this file has been replaced by the orchestrator. If any placeholder is still literal text, stop and report it.

**Canonical references (do not duplicate inline):** Severity thresholds, score weighting, effort sizing, banned soft language, idempotency policy, universal hard rules, and the out-of-scope corpus list are all delivered in the orchestrator's Universal Prepend Block. Apply them; do not restate or narrow them.

**Idempotency.** Follow the single canonical idempotency policy delivered via the orchestrator's Universal Prepend Block (defined in `prompt.md`). Do not define a different or narrower rule here.

**Scope boundary — read this before you start.** You score **three phases only**. You do **not** score Execute, Verify, Validate, Observe, Learn, or Govern (agents 03b and 03c own those). You do **not** score cross-phase seams, feedback arrows, the remediation sub-cycle, the loop-output artefacts, or the end-to-end evidence trace (agent 03d owns those). You do **not** score the Definition of Done (agent 03e owns it). Do not produce a composite score, a maturity verdict, or a remediation roadmap. Staying inside this boundary is what buys the depth this prompt demands.

---

## 1. Inputs to Read

Read the following before writing a single score. Do not score from memory or assumption.

### 1.1 `[[FRAMEWORK]]` artefacts

Read all source files, configuration, phase-gate logic, and lifecycle enforcement mechanisms from `[[FRAMEWORK_PATH]]` — never from `[[FRAMEWORK_LOWER]]/`, which is this review's own output directory. For every claim made about `[[FRAMEWORK]]`'s behaviour, the supporting evidence MUST be a verbatim quote from a named source file with its path.

For these three phases, pay particular attention to: specification artefacts and templates, intake or triage mechanisms, requirements or acceptance-criteria formats, architecture and design artefacts, agent topology and coordination definitions, task decomposition logic, planning artefacts, work-breakdown mechanisms, and any gate, hook, schema, linter, or CI check that runs before or between these phases.

### 1.2 Manifesto corpus

- `manifesto/manifesto.md` — the Agentic Loop section (phase definitions for Specify, Design, and Plan), and the loop-readiness gate ("What Must Be True Before Entering Specify").
- `manifesto/manifesto-principles.md` plus the shards that carry these phases' binding bars: `manifesto/manifesto-principles-01.md` (P1 outcomes), `manifesto/manifesto-principles-02.md` (P2 living specifications), `manifesto/manifesto-principles-03.md` (P3 defense-in-depth), `manifesto/manifesto-principles-04.md` (P4 right-size the swarm), `manifesto/manifesto-principles-07.md` (P7 context engineering), `manifesto/manifesto-principles-11.md` (P11 economics).
- `manifesto/manifesto-done.md` — the specification artefact requirement in the loop's output package, and the evidence-freshness rules.
- `glossary.md` — canonical term definitions.

### 1.3 The loop-readiness gate — accurate condition count

`manifesto/manifesto.md` § "What Must Be True Before Entering Specify" states **seven** explicitly bolded conditions:

1. Business need validated
2. Value measurable
3. Acceptance criteria expressible
4. Constraints identified
5. Accountable human named
6. Blast radius assessed
7. Out-of-scope explicitly stated

`integration/loop-readiness-for-agent-opportunities.md` §"Phase 4 — Loop-readiness review" enumerates the same gate as **nine** conditions, adding (8) the AEM minimum bar — "what does business success look like and how will it be measured?" — as separately answerable, and (9) the demand sitting inside an AEM-conformant operating envelope. Assess all nine. Attribute conditions 1–7 to `manifesto/manifesto.md` and conditions 8–9 to `integration/loop-readiness-for-agent-opportunities.md`. Do not attribute a "nine-condition gate" to `manifesto/manifesto.md` alone — that is a mis-citation.

### 1.4 Cross-stack normative artefacts (lift only AEM-relevant content; apply the scope guard from the prepend block)

- `integration/loop-readiness-for-agent-opportunities.md` — the nine-condition enumeration and the handling of agent-surfaced opportunities. Primary anchor for **Specify**.
- `governance/phase-level-matrix.md` — AEM column only; Phase × maximum tier. Anchors **Design** (topology decisions that presuppose a tier) and **Plan** (decomposition that presupposes per-step autonomy).
- `governance/composition-rule.md` — the AEM autonomy-tier gate as it constrains architectural choice at **Design**.
- `operational-templates/agent-inventory-schema.md` — a designed agent estate that is not registered is not governable. Anchors **Design**.
- `operational-templates/ai-risk-register.md` — blast-radius and risk classification recorded at intake. Anchors **Specify**.
- `companion/principles-01.md`, `companion/principles-02.md`, `companion/principles-03.md`, `companion/principles-04.md` — the specifications-vs-constraints distinction and blast-radius guidance.
- `companion/frameworks.md` — boundary conditions and hard autonomy caps by regulated use case.
- `adoption/vmodel.md` — ALCOA+ properties as they bear on specification artefacts.

### 1.5 Domain file

`[[DOMAIN_FILE]]` — read in full. Every phase's gap paragraph maps to a specific regulation or risk type from this file, cited by article or section number. Do not forward-propagate content from `[[DOMAIN_FILE]]` into `[[FRAMEWORK]]` claims; the framework's behaviour is established only from its own artefacts.

### 1.6 Prior reviews

`[[PRIOR_REVIEWS]]` — read if not `none`. Peer comparison only. Do not let prior scores anchor your own.

---

## 2. Methodology

### 2.1 The absence-verification rule (hard requirement)

Every claim that `[[FRAMEWORK]]` lacks a mechanism MUST name the search that established the absence — the literal Grep pattern or Glob pattern run, and the directory searched. Format: `(no match for \`Grep "rollback|revert" [[FRAMEWORK_PATH]]\`)`. An unverified absence claim is a scoring defect. Inferring absence from "I did not see it while reading" is not permitted; run the search.

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
- If **C1 is Absent**, the score cannot exceed **19**, regardless of the other criteria. A framework cannot score for a phase it does not have.
- If **C3 is Absent** — no runtime-enforced mechanism anywhere in the phase — the score cannot exceed **39**. Convention-only implementation of a phase is a Critical finding, not a Medium one.

**Resolving overrides against the band — binding.** An override sets a hard ceiling. The **effective band** is the derived band intersected with `0–{cap}`; where more than one override applies, use the lowest cap. If that intersection is empty — the cap sits below the derived band's floor — the effective band is `0–{cap}`. **When the cap sits below the derived band's floor**, do not re-run the placement formula over `0–{cap}`: compute the placement inside the *derived* band as normal, then clamp to the cap — `score = min(placement, cap)`. The criteria counts earned the band position; a cap is a ceiling, not a re-scaling. Worked example: three criteria Met with one Partially met and one Absent places at 50 in band 40–59; a cap of 39 makes the final score 39, not 20. The final integer MUST lie inside the **effective** band. Example: three criteria Met (derived band 40–59) with C3 Absent (cap 39) gives an effective band of 0–39, not 40–59.

State the rubric verdicts, the count, the derived band, any override, the effective band, and the final integer explicitly in each phase's `**Score derivation.**` paragraph. A score that does not follow from its own stated rubric verdicts is a defect; resolve it before saving.

### 2.3 Per-phase analysis procedure

For each phase in order (Specify, Design, Plan):

1. Re-read the phase definition in `manifesto/manifesto.md` and the binding principle bar from the shard named in §3 below, to establish the bar *before* assessing `[[FRAMEWORK]]`.
2. Identify every artefact, function, gate, hook, schema, or mechanism in `[[FRAMEWORK]]` that corresponds to this phase. Name files and rule text with full paths.
3. Build the mechanism inventory and classify each mechanism's enforcement level honestly. A prompt-file instruction is `Convention-only`. A pre-commit hook that exits non-zero is `Runtime-enforced`.
4. Establish the entry gate and exit contract independently of the phase's internal behaviour — most loop failures live at the boundaries, and this agent's job is to make the boundaries of §3.1–§3.3 legible before agent 03d assesses the seams between them.
5. Run the silent-failure probe: name the specific way this phase produces plausible-but-wrong output that `[[FRAMEWORK]]` does not catch, and trace how far that output travels before anything would stop it.
6. Apply the Evidence Quality Gate as four separate verdicts, not as a single impression.
7. Apply the §2.2 rubric and derive the score.
8. Map the gap to a specific regulation or risk type from `[[DOMAIN_FILE]]`, cited by article or section number.

### 2.4 Phase-specific mandatory content

**Specify** — assess `[[FRAMEWORK]]`'s handling of the loop-readiness gate as a **nine-row table**, one row per condition (§1.3), each with a verdict of Met / Partially met / Absent and a named `[[FRAMEWORK]]` artefact or a verified absence. State plainly whether `[[FRAMEWORK]]` *rejects* work that fails the gate or merely *documents* the expectation. Assess the handling of agent-surfaced opportunities against `integration/loop-readiness-for-agent-opportunities.md`.

**Design** — assess whether `[[FRAMEWORK]]`'s design artefacts fix the four things `manifesto/manifesto.md` names for this phase: **boundaries, topology, constraints, and coordination rules**. Give a verdict per element. Then state whether design decisions are recorded as durable, versioned architectural decisions that Govern can file back into (the Govern→Design feedback arrow's landing site — agent 03c scores Govern, agent 03d scores the arrow; your job is to establish whether the landing site exists).

**Plan** — assess whether decomposition is *bounded*: whether each planned step carries an explicit autonomy tier, a blast-radius inheritance from Specify, and a stopping condition. Cross-check the per-step tier against `governance/phase-level-matrix.md` (AEM column only). State whether re-planning after a Verify failure is a first-class operation in `[[FRAMEWORK]]` or an ad-hoc re-run.

---

## 3. Output Specification

Write the output to: `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03a_loop_upstream.md`

### 3.1 Title and metadata block

```
# [[FRAMEWORK]] Review 03a — Agentic Loop, Upstream Phases (Specify, Design, Plan)

**Framework:** [[FRAMEWORK]]
**Version:** [[FRAMEWORK_VERSION]]
**Client context:** [[ORGANIZATION]]
**Regulatory overlay:** [[INDUSTRY]]
**Reviewer date:** YYYY-MM-DD
**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]`
**Scope:** Canonical Part 3, §3.1–§3.3 (Specify, Design, Plan)
**Source artefacts read:** <list every file actually read, with paths>
```

### 3.2 Opening paragraph

3–5 sentences characterising `[[FRAMEWORK]]`'s relationship to the *upstream* segment of the loop. The paragraph must (a) state whether the mapping is direct, partial, or a structural mismatch; (b) name `[[FRAMEWORK]]`'s own phase-level construct verbatim; (c) state which of Specify / Design / Plan have no `[[FRAMEWORK]]` counterpart.

### 3.3 Per-phase subsections

Exactly three subsections, in this order, using these exact heading formats:

```
### 3.1 Specify | **{score}/100**
### 3.2 Design | **{score}/100**
### 3.3 Plan | **{score}/100**
```

Each subsection contains the following labelled blocks, in this exact order. All are prose paragraphs except `**Mechanism inventory.**` (a table), the Specify loop-readiness gate table, and the Design four-element verdict list.

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

**Specify only** — insert the loop-readiness gate table immediately after `**What [[FRAMEWORK]] does.**`:

```
**Loop-readiness gate.**

| # | Condition | Source | Verdict | [[FRAMEWORK]] evidence or verified absence |
|---|---|---|---|---|
```

Nine rows, in the §1.3 order. Source column names `manifesto/manifesto.md` for rows 1–7 and `integration/loop-readiness-for-agent-opportunities.md` for rows 8–9. Follow the table with one sentence stating plainly whether `[[FRAMEWORK]]` rejects non-loop-ready work or merely documents the expectation, and one sentence on agent-surfaced opportunities.

**Design only** — insert immediately after `**What [[FRAMEWORK]] does.**`:

```
**Four-element coverage.**

- **Boundaries:** {Met / Partially met / Absent} — {evidence or verified absence}
- **Topology:** {Met / Partially met / Absent} — {evidence or verified absence}
- **Constraints:** {Met / Partially met / Absent} — {evidence or verified absence}
- **Coordination rules:** {Met / Partially met / Absent} — {evidence or verified absence}
- **Architectural decision record:** {Met / Partially met / Absent} — {whether a durable, versioned decision record exists for Govern to file back into}
```

**Plan only** — insert immediately after `**What [[FRAMEWORK]] does.**`:

```
**Bounded-decomposition check.**

- **Per-step autonomy tier:** {Met / Partially met / Absent} — {evidence}
- **Blast-radius inheritance from Specify:** {Met / Partially met / Absent} — {evidence}
- **Per-step stopping condition:** {Met / Partially met / Absent} — {evidence}
- **Phase × tier compatibility** (`governance/phase-level-matrix.md`, AEM column): {verdict and reasoning}
- **Re-planning after Verify failure:** {first-class operation / ad-hoc re-run / absent} — {evidence}
```

### 3.4 Closing subsection

```
### Upstream Segment Verdict
```

Three to five sentences. State which of the three phases is the weakest link and why, in terms of the rubric criteria — not in terms of overall impression. Name the single artefact whose absence most constrains the upstream segment. Do not compute an average of the three scores; do not extend the verdict to phases you did not score.

---

## 4. Hard Rules

- **Read first, score second.** Every score is grounded in a named file, rule, or function from `[[FRAMEWORK]]`'s own artefacts and from the manifesto's source files.
- **Verbatim quotes are mandatory.** Each of the three phases carries at least one verbatim `[[FRAMEWORK]]` quote with path and at least one verbatim `manifesto/manifesto.md` quote with path, plus one verbatim principle-shard quote with path.
- **Absence claims carry their search** (§2.1). No exceptions.
- **Whole integer scores only.** 0–100, no decimals.
- **The score must follow from the rubric.** A score outside the **effective** band its own C1–C5 verdicts and overrides produce is a defect.
- **No praise for undemonstrated capability.** Mark roadmapped capability `_[Planned, not operational]_` and give it zero weight.
- **Out-of-scope gaps are annotated, not discounted.** The rubric governs the integer without exception: a capability that is absent scores as absent, whether or not `[[FRAMEWORK]]` documents it as out of scope. Mark such a dimension `*[Scope gap]*` and state in its `**The gap.**` paragraph that the gap is closed by composition rather than by `[[FRAMEWORK]]` — that annotation is what carries the scope finding, not a score adjustment. Do not apply any deduction *beyond* the rubric for an out-of-scope item, and do not raise a rubric-derived score because a gap is documented.
- **No two phases share a gap sentence.** If Specify and Design would receive the same gap paragraph, at least one of them is under-analysed. Rewrite.
- **Score-consistency invariant.** This agent is the **sole source** of the phase scores for Part 3 §3.1–§3.3. No other agent scores these phases — agent 01 emits `—` in its Agentic Loop Phases Table by design. Agent 09 lifts these scores verbatim. There is no second estimate to reconcile, so a score written loosely here is never caught downstream: derive each one from the C1–C5 rubric and show the derivation.
- **Cross-references use canonical part numbers** (e.g., "see Part 3, §3.11", "see Part 13"). Never use file names, agent numbers, or wave designations in cross-references within output content.
- **Dates in YYYY-MM-DD.** British English throughout.
- **No forward-propagation from `[[DOMAIN_FILE]]` into framework claims.**

---

## 5. Self-Check Before Writing

**Do not save the output file until every item below is confirmed.** Items marked **[substantive]** are not formatting checks — they gate analytical quality and are the reason this agent exists.

- [ ] Header metadata block contains the substring `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]`.
- [ ] Exactly three phase subsections, headed `### 3.1 Specify | **{score}/100**`, `### 3.2 Design | **{score}/100**`, `### 3.3 Plan | **{score}/100**`.
- [ ] Each phase subsection contains all nine labelled blocks in the mandated order, plus its phase-specific insert.
- [ ] Specify's loop-readiness gate table has nine rows with correct source attribution (rows 1–7 to `manifesto/manifesto.md`, rows 8–9 to `integration/loop-readiness-for-agent-opportunities.md`).
- [ ] Design's four-element coverage list has all five bullets; Plan's bounded-decomposition check has all five bullets.
- [ ] Every mechanism inventory table classifies enforcement using only the four permitted values.
- [ ] **[substantive]** Every absence claim in the file names the Grep or Glob search that established it.
- [ ] **[substantive]** Each phase's `**Score derivation.**` states five verdicts, a count, a band, any override, a final integer, and — where an override applies — the effective band; the integer lies inside the effective band.
- [ ] **[substantive]** No two phases share a gap sentence or a silent-failure probe. Each probe names a concrete, phase-specific failure and traces its propagation distance.
- [ ] **[substantive]** Each phase's `**Evidence quality.**` block gives four separate verdicts, not one blended judgement.
- [ ] **[substantive]** At least one mechanism in the file is classified `Runtime-enforced` with a named enforcing artefact, or the file states explicitly that no upstream phase carries runtime enforcement and applies the C3 override accordingly.
- [ ] Each phase cites a regulation by article or section number from `[[DOMAIN_FILE]]`.
- [ ] `### Upstream Segment Verdict` present; names the weakest phase by rubric criteria; does not average the scores; does not extend to unscored phases.
- [ ] No composite score, maturity verdict, DoD assessment, cross-phase seam analysis, or remediation roadmap appears anywhere in the file.
- [ ] All dates YYYY-MM-DD. British English.
- [ ] No remaining `[[` or `]]` tokens.
- [ ] No banned soft language in the agent's own prose.
- [ ] Zero out-of-scope-corpus token matches. Every manifesto-side file cited is tracked by git on the current branch.
