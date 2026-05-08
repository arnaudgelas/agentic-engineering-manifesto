# Sub-prompt 02 — Single Principle Review

**Purpose.** Produce ONE principle-review file for `[[FRAMEWORK]]` against manifesto principle **P[[PRINCIPLE_NUMBER]]**. This prompt is invoked 12 times in parallel by the orchestrator, once per principle (P1 through P12).

**Per-invocation parameters (substituted by orchestrator).**
- `[[PRINCIPLE_NUMBER]]` — integer 1–12.
- `[[PRINCIPLE_NAME]]` — the canonical short name from `prompt.md`'s weighting table (NOT from `manifesto/manifesto-principles.md`).

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

**Placeholder reminder.** Before executing, confirm every `[[VARIABLE]]` token has been substituted by the orchestrator (including `[[PRINCIPLE_NUMBER]]` and `[[PRINCIPLE_NAME]]`). If any literal `[[...]]` pattern remains, stop and report.

**Output file.** Write exactly one file: `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p[[PRINCIPLE_NUMBER]].md`

**Canonical thresholds.** Severity labels, score ranges, effort labels, and principle weightings are defined in `prompt.md`. Reference them; do not redefine.

---

## 1. Inputs to read

Before scoring, read the following in full. Do not score from memory.

### 1.1 `[[FRAMEWORK]]` artefacts
Read every source file that constitutes `[[FRAMEWORK]]` at version `[[FRAMEWORK_VERSION]]`. Include all documentation, rule files, configuration, architecture artefacts, and lifecycle definitions. Quote exact artefact names, rule identifiers, and phase numbers when making claims.

### 1.2 Manifesto corpus (mandatory)
- `manifesto/manifesto.md` — core values, the Agentic Loop, the loop-readiness gate.
- `manifesto/manifesto-principles.md` and the matching `manifesto/manifesto-principles-0N.md` shard for the current invocation — authoritative definitions of P1–P12 (used for **definitions and minimum-bar text only**, NOT for the H1 principle name).
- `manifesto/manifesto-done.md` — Definition of Done, the four-step Hardening DoD, agentic provenance record, bundle integrity attestation, evidence freshness rules.
- `glossary.md` — canonical term definitions.

### 1.3 Canonical principle names

These are the authoritative short names used in the H1 heading of every principle file. The value of `[[PRINCIPLE_NAME]]` is drawn from this table:

| P | Principle |
| --- | --- |
| P1 | Outcomes are the unit of work |
| P2 | Specifications are living artifacts |
| P3 | Architecture is defence-in-depth |
| P4 | Right-size the swarm |
| P5 | Autonomy is a tiered budget |
| P6 | Knowledge and memory are infrastructure |
| P7 | Context is engineered like code |
| P8 | Evaluations are the contract |
| P9 | Observability covers reasoning |
| P10 | Assume emergence, engineer containment |
| P11 | Optimize economics of intelligence |
| P12 | Accountability requires intelligibility |

### 1.4 Companion corpus
- `companion/principles.md` and the matching `companion/principles-0N.md` shard for the current invocation — extended guidance, specifications-vs-constraints distinction, blast-radius, accountability paradox.
- `companion/frameworks.md` — boundary conditions and hard autonomy caps by regulated use case.
- `companion/patterns.md` — failure-mode patterns (relevant to P10 containment, P12 accountability).
- `companion/reference.md` — failure modes (over-governance, evidence theater, rubber-stamping).

### 1.5 Adoption corpus
- `adoption/path.md` — incremental adoption order and phase definitions.
- `adoption/metrics.md` — rubber-stamping detection (P12) and oversight-adequacy metrics.
- `adoption/roles.md` — accountability anchors per role (P12).
- `adoption/vmodel.md` — ALCOA+ (P1, P9 evidence properties).

### 1.5 Beyond-Agile context (optional but useful for framing)
- `beyond-agile/main.md`, `beyond-agile/landscape.md`, `beyond-agile/failures.md`, `beyond-agile/sources.md`.

### 1.6 Cross-stack normative artefacts (lift only AEM-relevant content; apply scope guard from `prompt.md`)
- `governance/aem-principle-coverage-map.md` — for principle landscape; ignore IGM/AEnt-M columns when scoring AEM only.
- `governance/governance-integration-note.md` — read for **P5 Tier 4 prerequisites** (machine-enforced envelope, control evaluations, governance observability, rubber-stamping detection).
- `governance/composition-rule.md` — read for the **P5** AEM autonomy-tier gate.
- `governance/evidence-bundle-schema.md` — read the `aem_components` section for **P1** evidence-bundle and **P8** governance evaluations.
- `governance/integrated-audit-trail.md` — read the AEM execution trace for **P9**.
- `governance/authority-accountability-matrix.md` — read for **P12** accountability anchors.
- `governance/phase-level-matrix.md` — read for P5 (Phase × maximum tier).
- `integration/loop-readiness-for-agent-opportunities.md` — read for **P1** (loop-readiness gate) and **P12** (accountable human named upstream).
- `integration/low-consequence-resolution.md` — read for **P12** per-action accountability minimum bar.

### 1.7 Regulatory crosswalks (cite when relevant to this principle's regulatory exposure for `[[ORGANIZATION]]`)
- `regulatory/eu-ai-act-addendum.md` — Articles 9 (P10), 12 (P9), 13 (P9), 14 (P5/P12), 15 (P10).
- `regulatory/nist-ai-rmf-crosswalk.md` — Govern (P12), Map (P1), Measure (P8), Manage (P10).
- `regulatory/iso-42001-crosswalk.md` — AIMS controls (P3, P6, P12).
- `regulatory/iso-23894-23053-crosswalk.md` — risk management (P10).
- `regulatory/incidents-appendix.md` — named real-world incidents (P10 prompt injection, P6 memory poisoning, P12 accountability).

### 1.8 Operational templates (cite when this principle's minimum bar maps to a template)
- `operational-templates/agent-inventory-schema.md` — discovery/registration (P5, P9, P12).
- `operational-templates/ai-risk-register.md` — risk register (P10, P12).
- `operational-templates/slo-table.md` — feedback-loop closure, claim revalidation, waiver expiry SLOs (P9).
- `operational-templates/risk-appetite-statement.md` — board-level (P12).

### 1.9 Domain file
Read `[[DOMAIN_FILE]]` in full. Map every major finding to a specific regulation or risk type from `[[INDUSTRY]]` that applies to `[[ORGANIZATION]]`. Domain context is not decoration.

### 1.10 Prior reviews
If `[[PRIOR_REVIEWS]]` is not `none`, read those files for peer comparison. Note where `[[FRAMEWORK]]` diverges from prior-reviewed frameworks on this principle.

---

## 2. Methodology

### 2.1 Scoring
Score this principle 0–100 (integer only, no decimals). Use the weighting and severity thresholds defined in `prompt.md` — refer to those tables, do NOT re-quote them. State the score in the H1 heading and again in `## Score rationale`. The two MUST match.

1. State **evidence-for** (what `[[FRAMEWORK]]` demonstrably does that satisfies this principle) separately from **evidence-against** (what is absent, partial, or wrong). evidence-for is captured in `## What works`; evidence-against in `## Where it fails the manifesto's bar`. Do NOT add a separate `Evidence` section.
2. Quote exact rule text, phase names, artefact filenames, or command names from `[[FRAMEWORK]]`'s own source files when claiming it asserts or fails to assert something. Every claim about `[[FRAMEWORK]]` MUST quote verbatim from a named source file with its path. Paraphrase is not evidence.
3. Do not praise undemonstrated capability. Do not penalise out-of-scope problems — but flag any scope gap explicitly.
4. Map the score to a severity label using the threshold table in `prompt.md`.

### 2.2 Client-specific mapping
For `## [[ORGANIZATION]]-specific implications`, tie each bullet to a specific regulation or risk type from `[[DOMAIN_FILE]]` and `[[INDUSTRY]]`. Each bullet MUST cite at least one specific regulation, clause number, or risk framework (e.g., `DORA Art. 9`, `SR 11-7 §IV.A`, `Solvency II Art. 121`, `EU AI Act Art. 12`). Generic regulatory references are not acceptable.

### 2.3 Banned soft language
Output MUST NOT contain `consider`, `may`, `could potentially`, `perhaps`, `use judgement`, `use judgment`. Use declarative form (`is`, `is not`, `does not`, `is absent`, `enforces`, `fails to enforce`).

### 2.4 Idempotence (preflight)
Before writing, Glob `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p[[PRINCIPLE_NUMBER]].md`. If the file exists AND all of the following hold true, exit without writing:
- File has ≥ 20 lines
- H1 line matches exactly `# P[[PRINCIPLE_NUMBER]] — [[PRINCIPLE_NAME]] | **NN/100**` (with integer score in range 0–100)
- File contains all six required section headings: `## What [[FRAMEWORK]] asserts about P[[PRINCIPLE_NUMBER]]`, `## [[PRINCIPLE_NUMBER]] — <Test name>`, `## What works`, `## Where it fails`, `## [[ORGANIZATION]]-specific implications`, `## Score rationale`
- `## Score rationale` section contains `Score: **NN/100**` with integer 0–100 matching H1 score
Otherwise rewrite from scratch.

---

## 3. Output structure

### 3.1 File path

```
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p[[PRINCIPLE_NUMBER]].md
```

### 3.2 H1 heading — exact format

```
# P[[PRINCIPLE_NUMBER]] — [[PRINCIPLE_NAME]] | **{score}/100**
```

The H1 line MUST end with the literal pattern ` | **NN/100**` where `NN` is an integer 0–100. No decimals. No surrounding text after the score. The principle name MUST be character-for-character identical to the corresponding row of `prompt.md`'s weighting table.

`manifesto/manifesto-principles.md` and the matching `manifesto/manifesto-principles-0N.md` shard are read for the principle's **definition and Minimum-bar paragraph** only — never for the H1 principle name.

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
One paragraph. State first: `Score: **{score}/100** ({Severity})`. Then in the same paragraph cite **evidence-for** explicitly (what `[[FRAMEWORK]]` demonstrably does that satisfies this principle), THEN **evidence-against** explicitly (what is absent, partial, or wrong). Do not introduce a separate `Evidence` section elsewhere.

---

## 4. Principle-specific test sections (apply only the section matching `[[PRINCIPLE_NUMBER]]`)

Place the test section **immediately after** `## What [[FRAMEWORK]] asserts about this principle` and **before** `## What works`. Reproduce the section title character-for-character.

### 4.1 If `[[PRINCIPLE_NUMBER]]` = 1 — `## Seven-Condition DoD Test`

Assess each of the seven evidence conditions from `manifesto/manifesto-done.md` against `[[FRAMEWORK]]`'s artefacts. Present as a numbered list:
1. Evaluation reports with pass/fail and metrics
2. Trace IDs linking to the full decision chain
3. Diffs showing what changed
4. Deployment IDs confirming what shipped
5. Rollback plans confirming reversibility
6. Policy check outputs confirming constraint compliance
7. Memory updates confirming what was learned

For each condition: verdict (Met / Partially met / Absent), followed by a one-to-two sentence explanation citing specific `[[FRAMEWORK]]` evidence with file paths in backticks. If absent, state directly.

After the seven conditions, assess the **Hardening DoD additions** from `manifesto/manifesto-done.md`:
- Security static analysis results (OWASP ASVS-calibrated, no unresolved Critical/High).
- **Bundle integrity attestation** (cryptographic hash or digital signature of the assembled bundle).
- **Agentic provenance record** (foundation model identifier and version, provider category, evaluation/production model parity, system-instruction hash, tool manifest, memory state version, retrieval corpus version, embedding model version, dataset lineage, policy constraints active).

For each: Met / Partially met / Absent verdict with citation. The `aem_components` section of `governance/evidence-bundle-schema.md` formalises the schema — cite it where useful.

### 4.2 If `[[PRINCIPLE_NUMBER]]` = 3 — `## Blast-Radius Test`

Three numbered sub-sections:

1. **Single-agent failure — silent wrong output.** Worst-case scenario: if one agent in a `[[FRAMEWORK]]`-managed workflow produces wrong output silently (syntactically valid, semantically incorrect), what is the maximum blast radius? Trace the propagation path through `[[FRAMEWORK]]`'s lifecycle to its endpoint.

2. **Isolation mechanisms.** List every containment mechanism `[[FRAMEWORK]]` provides. For each: name the mechanism, state whether it is enforced at runtime or only by convention, and state what class of failure it catches (structural / semantic / both).

3. **Verdict.** State plainly whether `[[FRAMEWORK]]`'s architecture is defense-in-depth or defense-in-line, and why. Reference the P3 shard's minimum bar.

After sub-section 3 (Verdict) and before `## What works`, add this cross-reference placeholder verbatim:

```
> *[Part 12 cross-reference — see Part 12 guardrails assessment; resolved at merge time]*
```

### 4.3 If `[[PRINCIPLE_NUMBER]]` = 5 — `## Tier Assessment`

Tier-by-tier analysis:
- **What actions `[[FRAMEWORK]]` takes autonomously** (without any human step).
- **What requires human approval** within `[[FRAMEWORK]]`'s lifecycle.
- **What is never autonomous** under `[[FRAMEWORK]]`'s current design.
- **Tier determination.** State the highest manifesto autonomy tier (Tier 1–4) `[[FRAMEWORK]]` operates at, with structural evidence supporting this.
- **Oversight pattern.** Name which of the four oversight patterns from the matching `manifesto/manifesto-principles-0N.md` shard (HITL synchronous/asynchronous, HOTL, HOLL, EDL) `[[FRAMEWORK]]` instantiates and whether its irreversibility window is measured (HOTL minimum bar) and whether per-action evidence is sufficient to reconstruct accountability without a human witness (HOLL minimum bar).
- **Tier 4 prerequisites (if claimed).** If `[[FRAMEWORK]]` claims or supports Tier 4, evaluate the four prerequisites from the P5 shard and `governance/governance-integration-note.md`: machine-enforced policy envelope; passing control evaluations; instrumented governance observability; active rubber-stamping detection. State Met / Partially met / Absent for each. Absence of any one prerequisite means Tier 4 is "ungoverned production autonomy" per the manifesto.
- **Phase × tier compatibility.** Cross-check against `governance/phase-level-matrix.md` (AEM Phase column only) and the table in the P5 shard to confirm the operating tier is permissible at the framework's phase placement.
- **What prevents higher tiers.** Name the specific mechanisms or artefacts that would need to exist for `[[FRAMEWORK]]` to safely operate at a higher tier.

### 4.4 If `[[PRINCIPLE_NUMBER]]` = 8 — `## Seven-Condition DoD Test (Evaluation Edition)`

Apply the seven-condition structure as P1, focused on evaluations as a contract:
1. Evaluations versioned and coupled to specifications
2. Coverage of happy path, adversarial cases, and regression scenarios
3. Evaluations evolve with the system — spec changes trigger evaluation changes
4. Governance evaluations — evidence bundle completeness, provenance consistency, rollback procedure currency, SBOM completeness
5. Verification (did we build it right?) separated from validation (did we build the right thing?)
6. Independent validation — organisationally separate, capable of blocking production deployment
7. Governance evaluation failures trigger the same remediation sub-cycle as product failures

For each condition: verdict (Met / Partially met / Absent) plus a one-to-two sentence explanation citing specific `[[FRAMEWORK]]` evidence with file paths in backticks.

### 4.5 If `[[PRINCIPLE_NUMBER]]` = 9 — `## Does [[FRAMEWORK]]'s observability cover reasoning or only execution?`

This section is a binary diagnostic. Answer the question in the section heading directly and unambiguously (e.g., "**Short answer: execution only.**"). Then explain:
- What `[[FRAMEWORK]]` logs and instruments — be specific: name the log files, watcher plugins, HUD fields, audit-trail artefacts.
- What the manifesto's P9 minimum bar requires for reasoning-level observability (a trace must reconstruct *why*, not just *that*), and whether `[[FRAMEWORK]]`'s instrumentation meets it.
- Whether the AEM execution trace described in `governance/integrated-audit-trail.md` is producible from `[[FRAMEWORK]]`'s output: trace IDs that link spec → design → plan → execute → verify → validate → observe → learn → govern; per-action tool calls, decisions, evaluation results, rollbacks, near-misses; OpenTelemetry-compatible identifiers; replayable from trace ID + agentic provenance record + tool manifest + composite state.
- Whether **governance-state observability** (per the second minimum-bar paragraph in P9) is instrumented: stale evidence in active bundles, controls in failed/waived state without resolution timeline, accountability ownership gaps, rubber-stamping patterns (per `adoption/metrics.md` and `operational-templates/slo-table.md`), and model/prompt/tool manifest changes that did not trigger an evaluation re-run.
- The specific gap between what `[[FRAMEWORK]]` records and what a "why did this happen" query requires.

Do not equivocate. If the observability covers only execution, state so; do not soften the finding.

### 4.6 If `[[PRINCIPLE_NUMBER]]` = 12 — `## Structured Recovery Test`

Two parts. **Part A — Oversight adequacy** is a precondition: oversight that cannot be measured cannot be claimed. **Part B — Structured recovery** is the binding-constraint scoring test.

**Part A — Oversight Adequacy.** For each oversight pattern `[[FRAMEWORK]]` instantiates (HITL synchronous/asynchronous, HOTL, HOLL, EDL — defined in the matching shard), assess:
- **HITL:** does `[[FRAMEWORK]]` report override rate, reviewer agreement rate, and review latency by work-item class? Override rate near zero or sustained reviewer agreement >95% indicates accountability diffusion (`adoption/metrics.md`).
- **HOTL:** has the irreversibility window been measured and confirmed to exceed monitoring detection + notification + assessment + intervention time? If not, HOTL is "the appearance of oversight" per the P5 minimum bar.
- **HOLL:** is per-action evidence sufficient to reconstruct accountability from logs alone, without any human witness?
- **EDL:** are the independent validator's domain qualifications documented and current; does each expert review produce a structured record of judgment rationale?

Cite `governance/authority-accountability-matrix.md` (AEM column only), `integration/low-consequence-resolution.md` (per-action accountability minimum bar — no consequence-class carve-out in AEM), and `operational-templates/slo-table.md` (waiver expiry, feedback-loop closure SLOs) where relevant. Verdict per pattern: Met / Partially met / Absent.

**Part B — Structured Recovery.** Five recovery steps:
1. **Intent recovery.** Can a new engineer determine what the original engineer was trying to achieve from `[[FRAMEWORK]]`'s artefacts alone?
2. **Decision recovery.** Can a new engineer reconstruct why each significant choice was made?
3. **Evidence recovery.** Can a new engineer locate the artefacts that informed each decision?
4. **Reproduction.** Can a new engineer reproduce the same output given the same inputs?
5. **Modification.** Can a new engineer safely modify the output without breaking undocumented invariants?

For each step: verdict (Pass / Partial / Fail) plus a specific explanation citing `[[FRAMEWORK]]` artefacts with backticked paths.

After the five steps, apply the binding constraint: count how many steps pass fully. Map to score band:
- 5 steps fully passing → 80–100
- 4 steps fully passing → 60–79
- 3 steps fully passing → 40–59
- 2 steps fully passing → 20–39
- 0–1 steps fully passing → 0–19

Partial passes provide credit within the band but cannot move the score across a band boundary. **If Part A finds any oversight pattern Absent or Partially met for an action class `[[FRAMEWORK]]` operates at Tier 2 or above, the score cannot exceed the upper bound of the band one step lower than Part B alone would set.**

### 4.7 If `[[PRINCIPLE_NUMBER]]` is 2, 4, 6, 7, 10, or 11

These principles do **NOT** have a mandatory test section. Do NOT add a discretionary test section. Diagnostic depth belongs inside `## What works` or `## Where it fails the manifesto's bar`.

---

## 5. Hard rules

- **Read `[[FRAMEWORK]]`'s source files before scoring.** Do not score by analogy.
- **Use the canonical principle name from `prompt.md`'s weighting table** in the H1 heading (the value of `[[PRINCIPLE_NAME]]` is taken from there).
- **Quote exact rule text, command names, or artefact names from `[[FRAMEWORK]]`** when claiming it asserts (or fails to assert) something. Inline code MUST be enclosed in backticks. You may not cite an artefact you have not read or located via Read/Grep/Glob.
- **No praise for undemonstrated capability.** Mark roadmapped capability `_[Planned, not operational]_` and assign it zero score weight.
- **No penalty for out-of-scope problems.** Mark `*[Scope gap]*` explicitly and do not deduct.
- **Do not compute or report an overall composite score.** That is agent 01's responsibility.
- **Do not include a `Gap to Next Level` section.** That section belongs in Part 8.
- **YYYY-MM-DD** date format. British English throughout.
- **Cross-references** use canonical part numbers per `prompt.md` (e.g., "see Part 12"). Do not use file names or agent numbers.
- **Score consistency:** the score in `# P[[PRINCIPLE_NUMBER]] — [[PRINCIPLE_NAME]] | **{score}/100**` MUST be numerically identical to the score in `## Score rationale`. Resolve before saving.
- **Cross-file coordination:** agent 01 is the AUTHORITATIVE consumer of this score for Part 1. Agent 09 (merge) detects mismatches.
- **Out-of-scope corpus.** Do not read or cite `asdlc/`, `aplc/`, `agentic-sdlc-handbook/`, `intelligence-governance-manifesto/`, `agentic-enterprise-manifesto/`, `agentic-enterprise.{md,html}`, `agentic-governance-stack.{md,html}`, `manifesto-evolution-plan.{md,html}`, `phase-assessment-checklist.{md,html}`, `asdlc-plan*`, `aplc-plan*`, or `igm-aent-coherence-review*`. Output MUST contain zero matches for the tokens `ASDLC`, `APLC`, `IGM`, `AEnt-M`, `AEnt_M`, `intelligence-governance-manifesto`, `agentic-enterprise-manifesto`, `agentic-enterprise`, `agentic-governance-stack`, `manifesto-evolution-plan`, `phase-assessment-checklist`, or `agentic-sdlc-handbook`.
- **Do not propagate `[[DOMAIN_FILE]]` content forward beyond what is needed for principle-level regulatory citation.** Do not embed full domain-file passages, do not derive ASDLC/APLC roadmaps, and do not invent domain bridges that are not present in `[[DOMAIN_FILE]]`.

---

## 6. Self-check — HARD GATE before saving the file

Each item is binary yes/no. If any item fails, fix the file content and re-verify.

- [ ] Output path is `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p[[PRINCIPLE_NUMBER]].md`.
- [ ] H1 line ends with the literal pattern ` | **NN/100**` (single space, single pipe, single space, double-asterisk, integer 0–100, slash, `100`, double-asterisk).
- [ ] H1 principle name is character-for-character identical to the row of `prompt.md`'s weighting table for P[[PRINCIPLE_NUMBER]] (the value substituted into `[[PRINCIPLE_NAME]]`). The literal string `[[PRINCIPLE_NAME]]` does not appear.
- [ ] Score in `## Score rationale` is numerically identical to score in H1.
- [ ] Severity label in `## Score rationale` matches the threshold band per `prompt.md`.
- [ ] If `[[PRINCIPLE_NUMBER]]` = 1: file contains `## Seven-Condition DoD Test` immediately after `## What [[FRAMEWORK]] asserts about this principle`.
- [ ] If `[[PRINCIPLE_NUMBER]]` = 3: file contains `## Blast-Radius Test` AND the verbatim Part 12 cross-reference placeholder line `> *[Part 12 cross-reference — see Part 12 guardrails assessment; resolved at merge time]*`.
- [ ] If `[[PRINCIPLE_NUMBER]]` = 5: file contains `## Tier Assessment`.
- [ ] If `[[PRINCIPLE_NUMBER]]` = 8: file contains `## Seven-Condition DoD Test (Evaluation Edition)`.
- [ ] If `[[PRINCIPLE_NUMBER]]` = 9: heading is exactly `## Does {FRAMEWORK}'s observability cover reasoning or only execution?` where `{FRAMEWORK}` is the substituted value of `[[FRAMEWORK]]`. The literal string `[[FRAMEWORK]]` does NOT appear in the heading.
- [ ] If `[[PRINCIPLE_NUMBER]]` = 12: file contains `## Structured Recovery Test` AND the score lies in the binding-constraint band that matches the count of fully-passing steps.
- [ ] No occurrence of `[[` or `]]` anywhere in the file (all placeholders substituted).
- [ ] No occurrence of any out-of-scope-corpus token (see §5).
- [ ] No occurrence of any prior-framework name (e.g., from `[[PRIOR_REVIEWS]]`) unless `[[FRAMEWORK]]` itself resolves to that name.
- [ ] No banned soft-language tokens: `consider`, `may`, `could potentially`, `perhaps`, `use judgement`, `use judgment`.
- [ ] Every bullet in `## What works` and `## Where it fails the manifesto's bar` cites at least one named `[[FRAMEWORK]]` artefact in backticks.
- [ ] Every bullet in `## Where it fails the manifesto's bar` (i) quotes the manifesto's actual requirement verbatim from the matching `manifesto/manifesto-principles-0N.md` shard and (ii) shows what `[[FRAMEWORK]]` is missing.
- [ ] Every bullet in `## [[ORGANIZATION]]-specific implications` cites a specific regulation, article, clause number, or risk framework from `[[DOMAIN_FILE]]`.
- [ ] All dates in `YYYY-MM-DD`. British English throughout.
- [ ] All cross-references use canonical part numbers per `prompt.md`'s part-numbering table; no agent numbers or file names appear in cross-references.
