# Sub-prompt 03d — Loop Integrity (Seams, Feedback Arrows, Remediation, Loop Output, End-to-End Trace, Iteration)

**Purpose:** Assess whether `[[FRAMEWORK]]` implements the Agentic Loop as a **loop** — a closed feedback cycle that returns on evidence, remediates before retrying, produces a complete output package, and can run again — rather than as a nine-step pipeline that happens to use the manifesto's phase names. This agent owns canonical **Part 3, §3.11**.

This is the agent that catches the failure the per-phase agents structurally cannot: a framework can score respectably on all nine phases individually and still be a waterfall. Phase-by-phase scoring measures the boxes. This agent measures the arrows.

**Placeholder reminder:** Before executing, verify that every `[[...]]` token in this file has been replaced by the orchestrator. If any placeholder is still literal text, stop and report it.

**Canonical references (do not duplicate inline):** Severity thresholds, score weighting, effort sizing, banned soft language, idempotency policy, universal hard rules, and the out-of-scope corpus list are all delivered in the orchestrator's Universal Prepend Block. Apply them; do not restate or narrow them.

**Scope boundary — read this before you start.** You do **not** score the nine loop phases individually (agents 03a, 03b, and 03c own those, and you cannot read their output — you run in the same wave). You do **not** score the Definition of Done (agent 03e owns it). You do **not** produce a composite score, a maturity verdict, or a remediation roadmap. You produce one **Loop Integrity Score**, which is a diagnostic for Part 3 and does **not** enter the weighted composite — the composite is principle-weighted only. No other agent estimates the Loop Integrity Score, so no reconciliation is required at merge time.

---

## 1. Inputs to Read

### 1.1 `[[FRAMEWORK]]` artefacts

Read all source files, configuration, orchestration logic, state management, and lifecycle enforcement from `[[FRAMEWORK_PATH]]` — never from `[[FRAMEWORK_LOWER]]/`, which is this review's own output directory. For every claim about `[[FRAMEWORK]]`'s behaviour, the supporting evidence MUST be a verbatim quote from a named source file with its path.

Pay particular attention to: orchestration entry points, state machines, workflow definitions, session or run state, artefact-passing conventions, schema definitions for inter-step data, retry and re-run logic, failure handlers, incident or post-mortem mechanisms, release or handoff packaging, and anything that persists across a run boundary.

### 1.2 Manifesto corpus

- `manifesto/manifesto.md` — the whole Agentic Loop section, specifically: the forward sequence; the statement "This loop is not a waterfall. Any phase can trigger a return to an earlier one based on evidence"; the mermaid diagram's eight dotted feedback arrows with their labels; the "What the Loop Produces" subsection listing the six output artefacts; and the four-step remediation sub-cycle with its closing warning that "Skipping to step 4 without steps 1–3 is a retry, not remediation, and is the primary cause of hallucination loops."
- `manifesto/manifesto-done.md` — the `Loop-Complete` condition and the "Handoff to the Release Layer" section, read here to establish the loop-output bar. Do not score DoD conditions; agent 03e owns them.
- `manifesto/manifesto-principles.md` plus `manifesto/manifesto-principles-01.md` (P1 outcomes and the evidence bundle), `manifesto/manifesto-principles-02.md` (P2 specifications are living artefacts — the arrows are how they stay living), `manifesto/manifesto-principles-06.md` (P6 — Learn→Govern→Specify carries knowledge forward), `manifesto/manifesto-principles-09.md` (P9 — trace IDs linking the whole chain).
- `glossary.md`.

### 1.3 Cross-stack normative artefacts (lift only AEM-relevant content; apply the scope guard from the prepend block)

- `governance/integrated-audit-trail.md` — the AEM execution trace section. The trace is the artefact that proves the seams carry evidence.
- `governance/evidence-bundle-schema.md` — the `aem_components` section.
- `operational-templates/evidence-bundle.json` — the Evidence Bundle envelope schema.
- `operational-templates/control-state-record.json` — the Control State Record schema.
- `operational-templates/agentic-provenance-record.json` — the harness-identity schema.
- `operational-templates/slo-table.md` — feedback-loop-closure SLOs. A feedback arrow with no closure SLO is an arrow with no deadline.
- `companion/reference.md` and `companion/patterns.md` — failure-mode patterns.
- `regulatory/incidents-appendix.md` — named real-world incidents; use where a seam failure matches a named incident class.

### 1.4 Domain file

`[[DOMAIN_FILE]]` — read in full. Every seam failure, broken arrow, and missing loop-output artefact maps to a specific regulation or risk type from this file, cited by article or section number.

### 1.5 Prior reviews

`[[PRIOR_REVIEWS]]` — read if not `none`. Peer comparison only.

---

## 2. Methodology

### 2.1 The absence-verification rule (hard requirement)

Every claim that `[[FRAMEWORK]]` lacks a mechanism MUST name the search that established the absence — the literal Grep or Glob pattern run, and the directory searched. Format: `(no match for \`Grep "rollback|revert|undo" [[FRAMEWORK_PATH]]\`)`. An unverified absence claim is a defect. This rule matters more here than anywhere else in the review: an agent assessing arrows is assessing things that are frequently absent, and an unverified absence claim is indistinguishable from a guess.

### 2.2 Forward seam analysis (§3.11.1)

The loop has **nine forward transitions**, including the wrap-around:

| # | Seam |
| --- | --- |
| 1 | Specify → Design |
| 2 | Design → Plan |
| 3 | Plan → Execute |
| 4 | Execute → Verify |
| 5 | Verify → Validate |
| 6 | Validate → Observe |
| 7 | Observe → Learn |
| 8 | Learn → Govern |
| 9 | Govern → Specify (the repeat) |

For each seam, establish four things:

- **Handoff artefact** — what the upstream phase hands to the downstream phase. Name it, with a path or schema, or record a verified absence.
- **Machine-readable** — whether that artefact is structured data a program can consume, or prose a human must re-read.
- **Consumed** — whether the downstream phase demonstrably reads it. An artefact that is written and never read does not bridge a seam; it is a log.
- **Loss** — what information present upstream is not present downstream. This is the seam's actual failure surface.

A seam counts as **Intact** only when the handoff artefact exists, is machine-readable, is demonstrably consumed, **and carries no material loss**. *Material loss* means the downstream phase does not receive information the upstream phase held and needs: acceptance criteria, risk or blast-radius classification, accountable-human attribution, or the trace identifier that links the two. A seam whose artefact is consumed but silently drops any of those is **Partial**, not Intact — loss is the seam's failure surface, so it must move the verdict. A seam with no artefact, or one written and never read, is **Broken**. State the loss finding explicitly in the seam's row.

### 2.3 Feedback arrow analysis (§3.11.2)

`manifesto/manifesto.md`'s mermaid diagram defines **eight** evidence-triggered returns:

| # | Arrow | Trigger label |
| --- | --- | --- |
| 1 | Verify → Plan | Plan / Execution Failure |
| 2 | Verify → Specify | Invalid Intent |
| 3 | Validate → Specify | Wrong Thing Built |
| 4 | Validate → Design | Design Flaw |
| 5 | Observe → Specify | Runtime Drift |
| 6 | Observe → Plan | Decomposition Error |
| 7 | Govern → Specify | Economics / Complexity Breach |
| 8 | Govern → Design | Architectural Policy Change |

For each arrow, establish four things:

- **Detection** — does `[[FRAMEWORK]]` detect the triggering condition at all? Name the mechanism or record a verified absence.
- **Routing** — when detected, does the condition route back to the named upstream phase, or does it terminate in a log line, an alert, or a human's inbox with no defined return?
- **Enforcement** — is the return blocking (work cannot proceed until the upstream phase re-runs) or advisory?
- **Closure SLO** — is there a deadline by which the return must complete, per `operational-templates/slo-table.md`? An arrow with no closure SLO can stay open indefinitely, which is functionally the same as not existing.

An arrow counts as **Implemented** only when detection exists, routing reaches the named upstream phase, the return is blocking, **and a closure SLO is defined**. An arrow with no closure deadline can stay open indefinitely — the prompt calls that functionally equivalent to not existing, so it must cost something: such an arrow is **Partial** at best, never Implemented. An arrow missing detection or routing is **Absent**; anything else short of the four is **Partial**. State the closure SLO, or its verified absence, in the arrow's row.

**The pipeline verdict.** State explicitly, in one sentence, whether `[[FRAMEWORK]]` implements a loop or a pipeline. The verdict is **pipeline** only when the arrow numerator is exactly 0 — no arrow is Implemented *or* Partial. Where every arrow is Partial (detection and routing present, blocking enforcement absent), the verdict is **a weak loop, not a pipeline**: say so and name the missing enforcement. This wording must match the §2.7 override condition exactly.

### 2.4 Remediation sub-cycle test (§3.11.3)

`manifesto/manifesto.md` mandates a four-step sub-cycle when any feedback arrow fires:

1. **Diagnose** — classify the failure from traces: specification error, verification gap, enforcement failure, or operational override.
2. **Update** — patch memory, tighten contracts, or revise the specification to address the root cause.
3. **Gate** — add or strengthen an evaluation that would catch this failure class before retrying.
4. **Re-verify** — run the updated evaluation suite before advancing.

For each step: verdict **Met / Partially met / Absent**, with a named `[[FRAMEWORK]]` artefact or a verified absence.

Then answer the manifesto's own diagnostic directly: **does `[[FRAMEWORK]]` remediate, or does it retry?** Quote the manifesto's warning verbatim with its path. If `[[FRAMEWORK]]`'s failure handling jumps to re-running the work without Diagnose, Update, and Gate, state that `[[FRAMEWORK]] retries; it does not remediate` and name the artefact that performs the bare retry.

### 2.5 Loop-Output Test (§3.11.4)

`manifesto/manifesto.md` § "What the Loop Produces" names **six** artefacts that a complete loop output contains. For each, give a verdict of **Produced / Partially produced / Absent** with a named `[[FRAMEWORK]]` artefact or a verified absence:

| # | Artefact | The bar |
| --- | --- | --- |
| 1 | The deployable artefact | Built, tested, ready to deploy to the target environment. |
| 2 | The evidence bundle | Evaluation reports with pass/fail and metrics, trace IDs linking the full decision chain, diffs, policy check outputs, memory updates. Machine-readable. |
| 3 | The specification artefact | The versioned, final specification as it stood when the evaluation suite passed. |
| 4 | The rollback procedure | **Tested in a representative environment**, not merely documented. A documented-but-untested rollback is Partially produced at best. |
| 5 | The accountability sign-off | A **named human** who reviewed the evidence bundle and accepts production accountability. Not a rubber stamp; a governance record that the evidence was reviewed. |
| 6 | The control state record | Machine-readable, **generated at loop completion, not assembled post-hoc**, stating for every required control whether it passed, failed, was waived, is stale, or requires a human decision. Waivers carry rationale, granting human's name, and expiry date. |

Close with one sentence stating whether the package `[[FRAMEWORK]]` hands to a release layer is complete, and — if not — which missing artefact would cause a release layer to accept unverified or ungoverned output.

### 2.6 End-to-end evidence trace (§3.11.5)

This is the highest-yield diagnostic in Part 3. Do not skip it and do not abstract it.

Choose **one concrete, realistic work item** that `[[FRAMEWORK]]` would plausibly handle — a specific change, of a kind the framework's own documentation or examples describe. Name it concretely (not "a change" but, for example, "adding a new validation rule to a claims-intake handler"). Then walk it through all nine phases in order. At each phase state, in one or two sentences:

- what evidence exists at that point,
- what identifier links it to the previous phase's evidence,
- and whether that link survives to the next phase.

Then state the **evidence death point**: the first phase at which the chain from Specify can no longer be reconstructed. Name the specific artefact whose absence breaks it. If the chain survives all nine phases, say so and name the identifier that carries it.

Close with a regulator-facing sentence: given a request under a named obligation from `[[DOMAIN_FILE]]` (cited by article or section), state what `[[ORGANIZATION]]` would be able to produce and what it would not.

### 2.7 The Loop Integrity Score (§3.11.7)

Compute the score arithmetically from the counts established above. Show the arithmetic.

```
Loop Integrity Score =
    25 × (Intact seams / 9)
  + 25 × (Implemented arrows / 8)
  + 20 × (Met remediation steps / 4)
  + 20 × (Produced loop-output artefacts / 6)
  + 10 × (Iteration factor: 1.0 Pass, 0.5 Partial, 0.0 Fail)
```

**Partial verdicts count as 0.5.** A numerator is `(full verdicts) + 0.5 × (partial verdicts)`. A seam that carries the artefact but does not enforce it, or a feedback arrow with detection and routing but no blocking enforcement, is materially different from one that does not exist — scoring the two identically would destroy the third verdict's discriminatory value and overstate remediation priority. Round the final total to the nearest whole integer.

**Override:** if **no feedback arrow is Implemented or Partial** — the arrow numerator is exactly 0 — the Loop Integrity Score cannot exceed **39**, regardless of the arithmetic, and the output must state that `[[FRAMEWORK]]` implements a pipeline rather than a loop. Arrows that are all Partial do **not** trigger this override: detection and routing without blocking enforcement is a weak loop, not a pipeline. Where every arrow is Partial, say so explicitly in §3.11.2 and name what enforcement is missing.

The score, the five component terms, the counts, and any override must all appear explicitly. A score that does not follow from its own stated arithmetic is a defect.

### 2.8 Iteration and convergence (§3.11.6)

Assess whether the loop can actually run more than once:

- **Re-entry** — can a second iteration begin from the state the first left behind, or does the framework start clean each run?
- **State carry-over** — what persists across iterations: specifications, evaluations, memory, decisions, control state? Name each with a path or record a verified absence.
- **Convergence** — is there any mechanism that would stop an oscillating loop (the same failure re-detected and re-remediated indefinitely)? Name it or record its absence.
- **Termination** — what condition ends the loop for a given work item, and who decides?

Verdict: **Pass / Partial / Fail**, feeding the iteration factor in §2.7.

### 2.9 Cross-phase failure modes (§3.11.8)

Derive **at least five** distinct failure modes **from the seam and arrow analyses above** — not freely invented. Each must trace to a specific Broken or Partial seam, or a Partial or Absent arrow, established earlier in this file. Each must cite at least two `[[FRAMEWORK]]` artefacts (file path plus function or rule identifier) and at least one regulation by article from `[[DOMAIN_FILE]]`.

---

## 3. Output Specification

Write the output to: `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03d_loop_integrity.md`

### 3.1 Title and metadata block

```
# [[FRAMEWORK]] Review 03d — Loop Integrity

**Framework:** [[FRAMEWORK]]
**Version:** [[FRAMEWORK_VERSION]]
**Client context:** [[ORGANIZATION]]
**Regulatory overlay:** [[INDUSTRY]]
**Reviewer date:** YYYY-MM-DD
**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]`
**Scope:** Canonical Part 3, §3.11 (loop integrity — seams, feedback arrows, remediation, loop output, end-to-end trace, iteration, cross-phase failure modes)
**Loop Integrity Score:** <N>/100 — diagnostic only; does not enter the weighted composite
**Source artefacts read:** <list every file actually read, with paths>
```

### 3.2 Opening paragraph

3–5 sentences. State plainly whether `[[FRAMEWORK]]` implements the Agentic Loop as a closed feedback cycle or as a linear pipeline, and name the evidence that settles the question. Do not defer this to the end of the document.

### 3.3 Required sections

Use these exact headings, in this order:

```
### 3.11 Loop Integrity
#### 3.11.1 Forward Seam Analysis
#### 3.11.2 Feedback Arrow Analysis
#### 3.11.3 Remediation Sub-Cycle Test
#### 3.11.4 Loop-Output Test
#### 3.11.5 End-to-End Evidence Trace
#### 3.11.6 Iteration and Convergence
#### 3.11.7 Loop Integrity Score
#### 3.11.8 Cross-Phase Failure Modes
```

**§3.11.1** — a nine-row table, then prose. Table columns: `# | Seam | Handoff artefact | Machine-readable | Consumed | Material loss | Verdict`. The `Material loss` cell names what the downstream phase does not receive, or `none`. Verdict is `Intact` / `Partial` / `Broken`. Follow the table with one short paragraph per **Broken** seam naming the specific information loss and its regulatory consequence. Close with the count of Intact seams out of 9.

**§3.11.2** — an eight-row table, then prose. Table columns: `# | Arrow | Trigger | Detection | Routing | Enforcement | Closure SLO | Verdict`. Verdict is `Implemented` / `Partial` / `Absent`. Follow the table with one short paragraph per **Absent** arrow naming what failure class goes undetected or unreturned, with a regulation cited by article. Close with the count of Implemented arrows out of 8 and the one-sentence pipeline-or-loop verdict.

**§3.11.3** — a four-row table (`Step | Verdict | [[FRAMEWORK]] evidence or verified absence`), then the verbatim manifesto quote with path, then the direct remediate-or-retry verdict in a sentence of its own. Close with the count of Met steps out of 4.

**§3.11.4** — a six-row table (`# | Artefact | Verdict | [[FRAMEWORK]] evidence or verified absence`), then the release-layer completeness sentence. Close with the count of Produced artefacts out of 6.

**§3.11.5** — name the chosen work item in bold in the first sentence. Then nine labelled paragraphs, one per phase, in loop order. Then a paragraph headed `**Evidence death point.**` naming the phase and the breaking artefact. Then a paragraph headed `**Regulator-facing consequence.**` citing a named obligation from `[[DOMAIN_FILE]]` by article or section.

**§3.11.6** — four labelled paragraphs (`**Re-entry.**`, `**State carry-over.**`, `**Convergence.**`, `**Termination.**`), then a bold verdict line: `**Iteration verdict: Pass / Partial / Fail**`.

**§3.11.7** — show the arithmetic explicitly, in this form, with real numbers substituted:

```
Seams:        {full} Intact + {part} Partial → numerator {full}+0.5×{part} = {e}   → 25 × ({e}/9) = {x}
Arrows:       {full} Implemented + {part} Partial → numerator {full}+0.5×{part} = {e} → 25 × ({e}/8) = {x}
Remediation:  {full} Met + {part} Partial → numerator {full}+0.5×{part} = {e}         → 20 × ({e}/4) = {x}
Loop-output:  {full} Produced + {part} Partial → numerator {full}+0.5×{part} = {e}    → 20 × ({e}/6) = {x}
Iteration factor: {1.0|0.5|0.0} → 10 × {f} = {x}
                                   ─────────────
Loop Integrity Score:              {N}/100
```

Follow with one sentence stating the severity band per the canonical thresholds, and — if the zero-arrows override applied — a sentence naming it explicitly.

**§3.11.8** — at least five items, each in this exact format. These findings carry **no 0–100 score**, so the canonical score-band thresholds in `prompt.md` do not apply to them. Assign `Severity:` using the **regulatory-impact rubric** in `prompt.md` § "Severity for findings that carry no score" — the same rubric agent 07 applies to its unscored findings. Name the obligation and the compensating control (or its verified absence) in the item itself, so the label is checkable:

```
- **{Phase A}→{Phase B}:** {what breaks} — traces to {§3.11.1 seam N / §3.11.2 arrow N}; `[[FRAMEWORK]]` artefacts `{file}:{identifier}` and `{file}:{identifier}` fail to bridge because {reason}. Regulation: {name, article}. Severity: {Critical/High/Medium/Low}.
```

---

## 4. Hard Rules

- **Read first, assess second.** Every verdict is grounded in a named file, rule, or function from `[[FRAMEWORK]]`'s own artefacts.
- **Absence claims carry their search** (§2.1). No exceptions. This is the load-bearing rule for this agent.
- **Every count must be traceable to its table.** The Intact-seam count equals the number of `Intact` rows in §3.11.1; the Implemented-arrow count equals the number of `Implemented` rows in §3.11.2; and so on. A mismatch is a defect.
- **The Loop Integrity Score must follow from its own arithmetic.** Show the working.
- **The end-to-end trace must be concrete.** A trace that describes "a change" rather than a named, specific work item does not satisfy §2.6 and must be rewritten.
- **Failure modes derive from the tables**, not from invention. Each must name the seam or arrow it traces to.
- **Do not re-score the nine phases.** Reference them by their canonical subsection numbers (`see Part 3, §3.5`) where relevant. You did not read agents 03a/03b/03c's output and must not claim to have.
- **Do not assess the Definition of Done.** Reference Part 4 by number where relevant.
- **No praise for undemonstrated capability.** Mark roadmapped capability `_[Planned, not operational]_` and give it zero weight.
- **Cross-references use canonical part numbers** (e.g., "see Part 4", "see Part 12"). Never use file names, agent numbers, or wave designations in cross-references within output content.
- **Dates in YYYY-MM-DD.** British English throughout.
- **No forward-propagation from `[[DOMAIN_FILE]]` into framework claims.**

---

## 5. Self-Check Before Writing

**Do not save the output file until every item below is confirmed.** Items marked **[substantive]** gate analytical quality.

- [ ] Header metadata block contains the substring `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]` and the `Loop Integrity Score` line with the diagnostic-only qualifier.
- [ ] All eight required section headings present, in order, at the specified depths.
- [ ] §3.11.1 table has exactly nine rows, one per forward seam, in the §2.2 order; every verdict is `Intact`, `Partial`, or `Broken`, and every row's `Material loss` cell is populated (`none` or the named loss).
- [ ] **[substantive]** No seam is graded `Intact` while its `Material loss` cell names a loss — material loss caps a seam at `Partial`.
- [ ] **[substantive]** No arrow is graded `Implemented` while its `Closure SLO` cell records a verified absence — a missing closure SLO caps an arrow at `Partial`.
- [ ] §3.11.2 table has exactly eight rows, one per feedback arrow, in the §2.3 order, with the manifesto's own trigger labels; every verdict is `Implemented`, `Partial`, or `Absent`.
- [ ] §3.11.3 table has exactly four rows and includes the verbatim manifesto quote with its path.
- [ ] §3.11.4 table has exactly six rows.
- [ ] §3.11.5 names a specific work item in bold, contains nine labelled per-phase paragraphs, an `**Evidence death point.**` paragraph, and a `**Regulator-facing consequence.**` paragraph citing an article or section.
- [ ] Each §3.11.7 numerator line states the full count, the partial count, and the effective numerator separately, and the full and partial counts equal the matching verdict rows in the source table.
- [ ] §3.11.6 has all four labelled paragraphs and a bold `**Iteration verdict:**` line.
- [ ] §3.11.7 shows the five-term arithmetic with real numbers and a final integer.
- [ ] §3.11.8 has at least five items in the mandated format, each tracing to a numbered seam or arrow and citing two `[[FRAMEWORK]]` artefacts plus one regulation by article.
- [ ] **[substantive]** Every absence claim in the file names the Grep or Glob search that established it.
- [ ] **[substantive]** Every count used in §3.11.7 equals the number of matching verdict rows in its source table. Verify each of the four counts by recounting the table.
- [ ] **[substantive]** The zero-arrows override is applied if and only if the arrow numerator is exactly 0 (no arrow Implemented or Partial), and named explicitly. An all-Partial arrow set does NOT trigger it and is reported as a weak loop.
- [ ] **[substantive]** The remediate-or-retry verdict is stated in a sentence of its own, without hedging.
- [ ] **[substantive]** The end-to-end trace names a concrete work item, not a generic one, and identifies a specific evidence death point or states explicitly that the chain survives all nine phases.
- [ ] **[substantive]** The pipeline-or-loop verdict appears both in the opening paragraph and in §3.11.2, and the two agree.
- [ ] No per-phase 0–100 score for any of the nine phases appears anywhere in the file.
- [ ] No DoD condition score, composite score, maturity verdict, or remediation roadmap appears anywhere in the file.
- [ ] All dates YYYY-MM-DD. British English.
- [ ] No remaining `[[` or `]]` tokens.
- [ ] No banned soft language in the agent's own prose.
- [ ] Zero out-of-scope-corpus token matches. Every manifesto-side file cited is tracked by git on the current branch.
