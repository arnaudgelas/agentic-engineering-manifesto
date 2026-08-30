# Sub-prompt 02 — Single Principle Review

**Purpose.** Produce ONE principle-review file for `[[FRAMEWORK]]` against manifesto principle **P[[PRINCIPLE_NUMBER]]**. This prompt is invoked 12 times in parallel by the orchestrator, once per principle (P1 through P12).

**Per-invocation parameters (substituted by orchestrator).**
- `[[PRINCIPLE_NUMBER]]` — integer 1–12.
- `[[PRINCIPLE_NAME]]` — the canonical short name, re-derived by the orchestrator from the `## N.` heading of `manifesto/manifesto-principles-0N.md` at spawn time (see `prompt.md`'s "Principle-name provenance"). The weighting table in `prompt.md` is a cache of this value, not its source.

**Shard mapping for this invocation.** Read the matching `manifesto/manifesto-principles-0N.md` and `companion/principles-0N.md` shards for the current principle number:

| P | Manifesto shard | Companion shard |
| --- | --- | --- |
| P1 | `manifesto/manifesto-principles-01.md` | `companion/principles-01.md` |
| P2 | `manifesto/manifesto-principles-02.md` | `companion/principles-02.md` |
| P3 | `manifesto/manifesto-principles-03.md` | `companion/principles-03.md` |
| P4 | `manifesto/manifesto-principles-04.md` | `companion/principles-04.md` |
| P5 | `manifesto/manifesto-principles-05.md` | `companion/principles-05.md` |
| P6 | `manifesto/manifesto-principles-06.md` | `companion/principles-06.md` |
| P7 | `manifesto/manifesto-principles-07.md` | `companion/principles-07.md` |
| P8 | `manifesto/manifesto-principles-08.md` | `companion/principles-08.md` |
| P9 | `manifesto/manifesto-principles-09.md` | `companion/principles-09.md` |
| P10 | `manifesto/manifesto-principles-10.md` | `companion/principles-10.md` |
| P11 | `manifesto/manifesto-principles-11.md` | `companion/principles-11.md` |
| P12 | `manifesto/manifesto-principles-12.md` | `companion/principles-12.md` |

**Placeholder reminder.** Before executing, confirm every double-bracket placeholder token has been substituted by the orchestrator (including `[[PRINCIPLE_NUMBER]]` and `[[PRINCIPLE_NAME]]`). If any literal `[[...]]` pattern remains, stop and report.

**Output file.** Write exactly one file: `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p[[PRINCIPLE_NUMBER]].md`

---

## 1. Inputs to read

Before scoring, read the mandatory inputs below in full. Do not score from memory. Section 1.4 is optional context and carries no reading obligation.

### 1.1 `[[FRAMEWORK]]` artefacts
Read every source file that constitutes `[[FRAMEWORK]]` at version `[[FRAMEWORK_VERSION]]`, from `[[FRAMEWORK_PATH]]` — the framework's own source tree, never from `[[FRAMEWORK_LOWER]]/` (this review's output directory). Include all documentation, rule files, configuration, architecture artefacts, and lifecycle definitions. Quote exact artefact names, rule identifiers, and phase numbers when making claims.

### 1.2 Manifesto corpus (mandatory — five files for this invocation)

Exactly these five, resolved for the current `[[PRINCIPLE_NUMBER]]`. Read them in full.

- `manifesto/manifesto.md` — core values, the Agentic Loop, the loop-readiness gate.
- the matching `manifesto/manifesto-principles-NN.md` shard for this invocation, resolved via the "Shard mapping for this invocation" table above — the authoritative definition of P[[PRINCIPLE_NUMBER]], its minimum-bar text, and (via its `## N.` heading) the source of `[[PRINCIPLE_NAME]]` itself. Read only this shard, not the other eleven and not the `manifesto/manifesto-principles.md` index.
- the matching `companion/principles-NN.md` shard for this invocation, resolved via the same table — extended guidance on this principle, the specifications-vs-constraints distinction, blast-radius, accountability paradox. Read only this shard, not the other eleven and not the `companion/principles.md` index.
- `manifesto/manifesto-done.md` — Definition of Done, the four-step Hardening DoD, agentic provenance record, bundle integrity attestation, evidence freshness rules.
- `glossary.md` — canonical term definitions.

### 1.3 Canonical principle name

The value of `[[PRINCIPLE_NAME]]` for this invocation is substituted by the orchestrator, re-derived at spawn time from the `## N.` heading of the manifesto shard named in the "Shard mapping for this invocation" table above for `[[PRINCIPLE_NUMBER]]` (see `prompt.md`'s "Principle-name provenance"). Do not construct the shard filename yourself by prefixing `[[PRINCIPLE_NUMBER]]` with a literal `0` — that produces `manifesto-principles-010.md` / `-011.md` / `-012.md` for P10–P12, none of which exist. Always resolve the path via the shard-mapping table. Do not independently re-derive the name here — use the substituted `[[PRINCIPLE_NAME]]` value.

### 1.4 Optional context (consult only if a specific finding requires it)

These carry **no reading obligation**. Open one only when a finding you are already making needs it, and cite it only if you read it. Where an entry names the principles it bears on, it is relevant to this invocation only if `[[PRINCIPLE_NUMBER]]` is among them.

- `companion/frameworks.md` — boundary conditions and hard autonomy caps by regulated use case.
- `companion/patterns.md` — failure-mode patterns (relevant to P10 containment, P12 accountability).
- `companion/reference.md` — failure modes (over-governance, evidence theater, rubber-stamping).
- `adoption/path.md` — incremental adoption order and phase definitions.
- `adoption/metrics.md` — rubber-stamping detection (P12) and oversight-adequacy metrics.
- `adoption/roles.md` — accountability anchors per role (P12).
- `adoption/vmodel.md` — ALCOA+ (P1, P9 evidence properties).
- `beyond-agile/main.md`, `beyond-agile/landscape.md`, `beyond-agile/failures.md`, `beyond-agile/sources.md` — framing context only.
- Cross-stack normative artefacts (lift only AEM-relevant content; apply scope guard from `prompt.md`):
  - `governance/aem-principle-coverage-map.md` — for principle landscape; ignore IGM/AEnt-M columns when scoring AEM only.
  - `governance/governance-integration-note.md` — **P5 Tier 4 prerequisites** (machine-enforced envelope, control evaluations, governance observability, rubber-stamping detection).
  - `governance/composition-rule.md` — the **P5** AEM autonomy-tier gate.
  - `governance/evidence-bundle-schema.md` — the `aem_components` section, for **P1** evidence-bundle and **P8** governance evaluations.
  - `governance/integrated-audit-trail.md` — the AEM execution trace, for **P9**.
  - `governance/authority-accountability-matrix.md` — **P12** accountability anchors.
  - `governance/phase-level-matrix.md` — P5 (Phase × maximum tier).
  - `integration/loop-readiness-for-agent-opportunities.md` — **P1** (loop-readiness gate) and **P12** (accountable human named upstream).
  - `integration/low-consequence-resolution.md` — **P12** per-action accountability minimum bar.
- Regulatory crosswalks (cite when relevant to this principle's regulatory exposure for `[[ORGANIZATION]]`):
  - `regulatory/eu-ai-act-addendum.md` — Articles 9 (P10), 12 (P9), 13 (P9), 14 (P5/P12), 15 (P10).
  - `regulatory/nist-ai-rmf-crosswalk.md` — Govern (P12), Map (P1), Measure (P8), Manage (P10).
  - `regulatory/iso-42001-crosswalk.md` — AIMS controls (P3, P6, P12).
  - `regulatory/iso-23894-23053-crosswalk.md` — risk management (P10).
  - `regulatory/incidents-appendix.md` — named real-world incidents (P10 prompt injection, P6 memory poisoning, P12 accountability).
- Operational templates (cite when this principle's minimum bar maps to a template):
  - `operational-templates/agent-inventory-schema.md` — discovery/registration (P5, P9, P12).
  - `operational-templates/ai-risk-register.md` — risk register (P10, P12).
  - `operational-templates/slo-table.md` — feedback-loop closure, claim revalidation, waiver expiry SLOs (P9).
  - `operational-templates/risk-appetite-statement.md` — board-level (P12).

### 1.5 Domain file
Read `[[DOMAIN_FILE]]` in full. Map every major finding to a specific regulation or risk type from `[[INDUSTRY]]` that applies to `[[ORGANIZATION]]`. Domain context is not decoration.

### 1.6 Prior reviews
If `[[PRIOR_REVIEWS]]` is not `none`, read those files for peer comparison. Note where `[[FRAMEWORK]]` diverges from prior-reviewed frameworks on this principle.

---

## 2. Methodology

### 2.1 Scoring rubric (binding constraint)

Score this principle 0–100 (integer only, no decimals). State the score in the H1 heading and again in `## Score rationale`. The two MUST match.

The score is **derived**, not impressionistic. Assess these five criteria independently against the minimum bar stated in the matching `manifesto/manifesto-principles-0N.md` shard. Quote that bar verbatim before assigning verdicts — every criterion is judged against **what this principle's bar actually obliges**, not against a template applied uniformly. A criterion is **Absent** when the bar asks for something and `[[FRAMEWORK]]` does not deliver it.

**Permitted verdicts.** E1, E2, and E3 receive exactly one of **Met**, **Partially met**, or **Absent** — never `N/A`. Every shard states a minimum bar, so E2 always applies; and E3 is written broadly enough to cover epistemic and reporting-shaped bars as well as blocking gates, so it always applies too. **E4 and E5 may additionally be `N/A`**, and only when the shard's bar asks for nothing of that kind — no durable artefact for E4, no evidence-quality obligation for E5. To use `N/A` you MUST quote the bar and state which clause is missing. Restricting `N/A` to E4 and E5 keeps the denominator at 3, 4, or 5 and prevents an `N/A` on E3 from evading the convention-only cap.

| # | Criterion | Met when |
| --- | --- | --- |
| E1 | **Principle addressed** | A named, identifiable construct in `[[FRAMEWORK]]` corresponds to this principle's subject, and you can quote it verbatim from a `[[FRAMEWORK]]` source file. |
| E2 | **Minimum bar met** | `[[FRAMEWORK]]` satisfies the explicit minimum bar stated in the matching principle shard — not merely the principle's general theme. Quote the bar and the satisfying artefact. |
| E3 | **Obligation enforced, not merely described** | The obligation stated in this principle's own minimum bar is carried by a mechanism that operates without anyone remembering to act — a runtime gate, schema validation, CI check, blocking hook, or an artefact/report that is produced and consumed automatically. Documentation, templates, checklists, and prompt instructions are convention, not enforcement. **Judge against the shard's bar, not a generic gate:** where the bar is epistemic or reporting-shaped (P11 requires that units, task population, and observation window be stated behind any cost claim), E3 is Met when that statement is produced automatically and consumed, not only when something is blocked. |
| E4 | **Durable artefact** | The obligation produces a durable, named, machine-readable artefact that a downstream step demonstrably consumes. A prose summary nothing reads does not satisfy E4. |
| E5 | **Evidence quality** | The principle's output satisfies all four Evidence Quality Gate properties: **Attributable** (named agent/tool plus named accountable human), **Contemporaneous** (recorded during the work, not reconstructed), **Queryable** (retrievable without heroic manual effort), **Bound-to-outcome** (clearly linked to the change, decision, or action). |

Let `K` = the number of **applicable** criteria (5 minus the number marked `N/A`) and `M` = the number of those graded fully **Met**. Compute the **equivalent count** `E = round(5 × M / K)` (round halves up), then map `E` to a score band:

| Equivalent count `E` | Band |
| --- | --- |
| 5 | 80–100 |
| 4 | 60–79 |
| 3 | 40–59 |
| 2 | 20–39 |
| 0–1 | 0–19 |

When nothing is `N/A`, `K = 5` and `E = M`, so this is the plain count-to-band mapping. State `K`, `M`, and `E` in the derivation. Because the composite averages the twelve principle scores, a reduced denominator must be visible: where `K < 5`, say so in one sentence in `## Score rationale`, naming which criteria are `N/A` and why. A score of 100 at `K = 3` means the framework fully meets everything this principle's bar obliges — it does not mean it satisfies the same number of criteria as a `K = 5` principle scoring 100.

**Placing the score inside the band — binding.** Partial credit is not a matter of impression. Let `P` = the number of **Partially met** criteria and `A` = the number of **Absent** criteria, counting **applicable criteria only** — `N/A` criteria enter neither. If `P + A = 0`, the score is the band's **ceiling**. Otherwise the score is `floor + round(width × P / (P + A))`, where `floor` is the band's lower bound and `width` is `ceiling − floor` (round halves up). This is the only permitted placement rule — do not adjust the integer on judgement. Example: three criteria Met (band 40–59, floor 40, width 19) with one Partially met and one Absent gives `40 + round(19 × 0.5) = 50`.

**Universal hard overrides, applied after the band is set:**
- If **E1 is Absent**, the score cannot exceed **19**. A framework cannot score for a principle it does not address.
- If **E3 is Absent** — nothing carries the shard's stated obligation except convention, and the framework relies on someone remembering — the score cannot exceed **39**. E3 is never `N/A`, so this cap can never be evaded by declaring the criterion inapplicable. Convention-only implementation of a principle is a Critical finding.

**Principle-specific overrides.** If `[[PRINCIPLE_NUMBER]]` has a test section in §4, that section states one or more additional caps. Apply them alongside the universal overrides.

**Resolving overrides against the band — binding.** An override sets a hard ceiling. The **effective band** is the derived band intersected with `0–{cap}`; where more than one override applies, use the lowest cap. If that intersection is empty — the cap sits below the derived band's floor — the effective band is `0–{cap}`. **When the cap sits below the derived band's floor**, do not re-run the placement formula over `0–{cap}`: compute the placement inside the *derived* band as normal, then clamp to the cap — `score = min(placement, cap)`. The criteria counts earned the band position; a cap is a ceiling, not a re-scaling. Worked example: three criteria Met with one Partially met and one Absent places at 50 in band 40–59; a cap of 39 makes the final score 39, not 20. The final integer MUST lie inside the **effective** band. Example: three criteria Met (derived band 40–59) with E3 Absent (cap 39) gives an effective band of 0–39, not 40–59.

State the five verdicts (`N/A` permitted on E4/E5 only, each with the bar clause justifying it), `K`, `M`, `E`, the derived band, the placement arithmetic with `P` and `A` stated, every override applied and why, the effective band, and the final integer explicitly in `## Score rationale`. A score that does not follow from its own stated rubric verdicts is a defect; resolve it before saving.

1. State **evidence-for** (what `[[FRAMEWORK]]` demonstrably does that satisfies this principle) separately from **evidence-against** (what is absent, partial, or wrong). evidence-for is captured in `## What works`; evidence-against in `## Where it fails the manifesto's bar`. Do NOT add a separate `Evidence` section.
2. Quote exact rule text, phase names, artefact filenames, or command names from `[[FRAMEWORK]]`'s own source files when claiming it asserts or fails to assert something. Every claim about `[[FRAMEWORK]]` MUST quote verbatim from a named source file with its path. Paraphrase is not evidence.

### 2.2 Client-specific mapping
For `## [[ORGANIZATION]]-specific implications`, tie each bullet to a specific regulation or risk type from `[[DOMAIN_FILE]]` and `[[INDUSTRY]]`. Each bullet MUST cite at least one specific regulation, clause number, or risk framework (e.g., `DORA Art. 9`, `SR 11-7 §IV.A`, `Solvency II Art. 121`, `EU AI Act Art. 12`). Generic regulatory references are not acceptable.

### 2.4 Idempotence (preflight)
Follow the canonical idempotency policy in `prompt.md`. Before writing, Glob `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p[[PRINCIPLE_NUMBER]].md`. Treat the file as malformed unless ALL of the following hold true:
- File has ≥ 20 lines
- H1 line matches exactly `# P[[PRINCIPLE_NUMBER]] — [[PRINCIPLE_NAME]] | **NN/100**` (with integer score in range 0–100)
- File contains every heading actually required by §3.3 for this invocation: `## What [[FRAMEWORK]] asserts about this principle`, `## What works`, `## Where it fails the manifesto's bar`, `## [[ORGANIZATION]]-specific implications`, `## Score rationale`, plus — only if `[[PRINCIPLE_NUMBER]]` is 1, 3, 5, 8, 9, or 12 — the matching §4 test-section heading (e.g., `## Seven-Condition DoD Test` for P1)
- `## Score rationale` section contains `Score: **NN/100**` with integer 0–100 matching H1 score
- Header metadata block contains `Manifesto: arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]`

---

## 3. Output structure

### 3.1 File path

```
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p[[PRINCIPLE_NUMBER]].md
```

### 3.2 H1 heading and metadata line — exact format

```
# P[[PRINCIPLE_NUMBER]] — [[PRINCIPLE_NAME]] | **{score}/100**

**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]`
```

The metadata line is mandatory (see `prompt.md`'s provenance rule) and MUST appear immediately after the H1, before `## What [[FRAMEWORK]] asserts about this principle`.

The H1 line MUST end with the literal pattern ` | **NN/100**` where `NN` is an integer 0–100. No decimals. No surrounding text after the score. The principle name MUST be character-for-character identical to the substituted `[[PRINCIPLE_NAME]]` value (which the orchestrator derived from the `## N.` heading of the matching `manifesto/manifesto-principles-0N.md` shard).

### 3.3 Required sections (in order)

1. `## What [[FRAMEWORK]] asserts about this principle`
2. *(Optional — MANDATORY if `[[PRINCIPLE_NUMBER]]` is 1, 3, 5, 8, 9, or 12)* the principle-specific test section (see §4)
3. `## What works`
4. `## Where it fails the manifesto's bar`
5. `## [[ORGANIZATION]]-specific implications`
6. `## Score rationale`

#### 3.3.1 `## What [[FRAMEWORK]] asserts about this principle`
One short paragraph. Describe what `[[FRAMEWORK]]` claims or implies about this principle. Quote claims and name artefacts. Cite specific files, commands, or rule identifiers. Use only descriptive verbs (`asserts`, `claims`, `states`, `provides`); avoid evaluative verbs.

#### 3.3.2 `## What works`
4–8 bullets. Each bullet MUST:
- Be concrete and evidence-anchored — name the artefact, command, rule, or mechanism with backtick-quoted file path or identifier.
- State what `[[FRAMEWORK]]` does, not what it could do.
- Avoid hedging language that obscures whether the capability exists.

#### 3.3.3 `## Where it fails the manifesto's bar`
4–8 bullets. Each bullet MUST:
1. **Quote the manifesto's actual requirement verbatim** from the matching `manifesto/manifesto-principles-0N.md` shard (the Minimum-bar paragraph or principle prose, in double quotes), THEN
2. Show what `[[FRAMEWORK]]` is missing or insufficient — name the specific failure mode (absent, partial, advisory-only, convention-not-enforcement, scope-gap-with-flag).
3. Tie to a `[[ORGANIZATION]]`-specific regulatory exposure with a specific article or obligation number.

The verbatim manifesto quote MUST come first in the bullet — paraphrase is not permitted.

#### 3.3.4 `## [[ORGANIZATION]]-specific implications`
3–5 bullets. Each bullet MUST:
- Cite at least one specific regulation, clause number, or risk framework from `[[INDUSTRY]]` / `[[DOMAIN_FILE]]`. Generic references not acceptable.
- Explain the practical consequence for `[[ORGANIZATION]]` of `[[FRAMEWORK]]`'s gap or capability on this principle.
- State what `[[ORGANIZATION]]` MUST do to address the gap.

#### 3.3.5 `## Score rationale`
Two paragraphs. First, `Score: **{score}/100** ({Severity})` followed by **evidence-for** explicitly (what `[[FRAMEWORK]]` demonstrably does that satisfies this principle), THEN **evidence-against** explicitly (what is absent, partial, or wrong). Do not introduce a separate `Evidence` section elsewhere.

Second, a `**Score derivation.**` paragraph carrying the §2.1 arithmetic: the five E1–E5 verdicts (`N/A` permitted on E4/E5 only, with the bar clause that justifies it), `K`, `M`, `E`, the derived band, the placement arithmetic `floor + round(width × P/(P+A))` with `P` and `A` stated, every override applied (universal and principle-specific) and why, the effective band, and the final integer. The integer MUST equal the H1 score and MUST lie inside the effective band.

---

## 4. Principle-specific test section (appended by the orchestrator when one exists)

Six principles — P1, P3, P5, P8, P9, and P12 — carry a mandatory principle-specific test. For those invocations the orchestrator appends the matching fragment from `prompts/tests/` (`p01.md`, `p03.md`, `p05.md`, `p08.md`, `p09.md`, `p12.md`) after this prompt. That fragment carries the test's own heading, its placement instruction, its full instructions, and its principle-specific score cap; it is binding for this invocation, and it is the section §2.1's "Principle-specific overrides" and §3.3 item 2 refer to.

If no fragment is appended — `[[PRINCIPLE_NUMBER]]` is 2, 4, 6, 7, 10, or 11 — no principle-specific test applies and you proceed without one. Do NOT add a discretionary test section. Diagnostic depth belongs inside `## What works` or `## Where it fails the manifesto's bar`. Their scores are derived from the universal E1–E5 rubric and the universal E1/E3 overrides in §2.1, with no principle-specific cap.

---

## 5. Hard rules

- **Use the substituted `[[PRINCIPLE_NAME]]` value** in the H1 heading (the orchestrator derived it from the matching manifesto shard's `## N.` heading — see `prompt.md`'s "Principle-name provenance").
- **Quote exact rule text, command names, or artefact names from `[[FRAMEWORK]]`** when claiming it asserts (or fails to assert) something. Inline code MUST be enclosed in backticks. You may not cite an artefact you have not read or located via Read/Grep/Glob.
- **No praise for undemonstrated capability.** Mark roadmapped capability `_[Planned, not operational]_` and assign it zero score weight.
- **Do not compute or report an overall composite score.** Agent 09 computes it at merge from this file's H1 score and the other eleven.
- **Do not include a `Gap to Next Level` section.** That section belongs in Part 8.
- British English throughout.
- **Score consistency:** the score in `# P[[PRINCIPLE_NUMBER]] — [[PRINCIPLE_NAME]] | **{score}/100**` MUST be numerically identical to the score in `## Score rationale`. Resolve before saving.
- **The score must follow from the rubric.** A score outside the **effective** band its own E1–E5 verdicts and overrides produce is a defect. Whole integers only, 0–100, no decimals.
- **Cross-file coordination:** this agent is the **sole source** of P{N}'s score. Agent 01 runs in parallel but emits `—` in every Score cell, so nothing else in the review estimates this principle. Agent 09 lifts the H1 score verbatim and weights it into the composite. Nothing downstream will catch a score that does not follow from the E1–E5 rubric — show the derivation.
- **Do not propagate `[[DOMAIN_FILE]]` content forward beyond what is needed for principle-level regulatory citation.** Do not embed full domain-file passages, do not derive ASDLC/APLC roadmaps, and do not invent domain bridges that are not present in `[[DOMAIN_FILE]]`.

---

## 6. Self-check — HARD GATE before saving the file

Each item is binary yes/no. If any item fails, fix the file content and re-verify.

- [ ] Output path is `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p[[PRINCIPLE_NUMBER]].md`.
- [ ] H1 line ends with the literal pattern ` | **NN/100**` (single space, single pipe, single space, double-asterisk, integer 0–100, slash, `100`, double-asterisk).
- [ ] H1 principle name is character-for-character identical to the substituted `[[PRINCIPLE_NAME]]` value. The literal string `[[PRINCIPLE_NAME]]` does not appear.
- [ ] Header metadata block contains `Manifesto: arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]` with `[[MANIFESTO_HASH]]` fully substituted.
- [ ] Score in `## Score rationale` is numerically identical to score in H1.
- [ ] **[substantive]** `## Score rationale` contains a `**Score derivation.**` paragraph stating five E1–E5 verdicts, the count, the derived band, the placement arithmetic with `P` and `A`, every applied override, the effective band, and the final integer — and the integer lies inside the effective band.
- [ ] **[substantive]** Where `[[PRINCIPLE_NUMBER]]` is 1, 3, 5, 8, 9, or 12, the §4 test section's score cap is named in the derivation and applied; where it is 2, 4, 6, 7, 10, or 11, no principle-specific cap is claimed.
- [ ] Severity label in `## Score rationale` matches the threshold band per `prompt.md`.
- [ ] If `[[PRINCIPLE_NUMBER]]` = 1: file contains `## Seven-Condition DoD Test` immediately after `## What [[FRAMEWORK]] asserts about this principle`.
- [ ] If `[[PRINCIPLE_NUMBER]]` = 3: file contains `## Blast-Radius Test` AND the verbatim Part 12 cross-reference placeholder line `> *[Part 12 cross-reference — see Part 12 guardrails assessment; resolved at merge time]*`.
- [ ] If `[[PRINCIPLE_NUMBER]]` = 5: file contains `## Tier Assessment`.
- [ ] If `[[PRINCIPLE_NUMBER]]` = 8: file contains `## Seven-Condition DoD Test (Evaluation Edition)`.
- [ ] If `[[PRINCIPLE_NUMBER]]` = 9: heading is exactly `## Does {FRAMEWORK}'s observability cover reasoning or only execution?` where `{FRAMEWORK}` is the substituted value of `[[FRAMEWORK]]`. The literal string `[[FRAMEWORK]]` does NOT appear in the heading.
- [ ] If `[[PRINCIPLE_NUMBER]]` = 12: file contains `## Structured Recovery Test` AND the score respects the cap that matches the count of fully-passing steps, after any Part A escalation.
- [ ] No occurrence of `[[` or `]]` anywhere in the file (all placeholders substituted).
- [ ] No occurrence of any out-of-scope-corpus token from the canonical list in the orchestrator's Universal Prepend Block.
- [ ] No occurrence of any prior-framework name (e.g., from `[[PRIOR_REVIEWS]]`) unless `[[FRAMEWORK]]` itself resolves to that name.
- [ ] No banned soft-language tokens: `consider`, `may`, `could potentially`, `perhaps`, `use judgement`, `use judgment`.
- [ ] Every bullet in `## What works` and `## Where it fails the manifesto's bar` cites at least one named `[[FRAMEWORK]]` artefact in backticks.
- [ ] Every bullet in `## Where it fails the manifesto's bar` (i) quotes the manifesto's actual requirement verbatim from the matching `manifesto/manifesto-principles-0N.md` shard and (ii) shows what `[[FRAMEWORK]]` is missing.
- [ ] Every bullet in `## [[ORGANIZATION]]-specific implications` cites a specific regulation, article, clause number, or risk framework from `[[DOMAIN_FILE]]`.
- [ ] All dates in `YYYY-MM-DD`. British English throughout.
- [ ] All cross-references use canonical part numbers per `prompt.md`'s part-numbering table; no agent numbers or file names appear in cross-references.
