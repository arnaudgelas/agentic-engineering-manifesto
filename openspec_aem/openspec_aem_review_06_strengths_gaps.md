# OpenSpec Review 06 — Genuine Strengths and Gap Analysis to Next Maturity Level

**Framework:** OpenSpec
**Version:** 1.3.1
**Review date:** 2026-05-08
**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@08123c263794b5cc24dbb3e1a5897a74288026e9`
**Reviewer:** Agent 06 — Strengths & Gaps
**Methodology:** Wave 2 synthesis — all 18 upstream output files read end-to-end; no OpenSpec source re-read
**Context:** Allianz — European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II
**Source material:** openspec_aem_review_01_quick_overview.md; openspec_aem_review_02_principle_p1.md through p12.md; openspec_aem_review_03_loop_dod.md; openspec_aem_review_04_adoption_companion.md; openspec_aem_review_05_maturity_industry.md; openspec_aem_review_07_guardrails_security_appendix.md; openspec_aem_review_08_enterprise_guardrails.md

> **Score consistency note:** The principle files (Review 02) are authoritative when divergent from the overview file (Review 01). The table below uses principle-file scores throughout.

| # | Principle | Authoritative Score (P-file) | Overview Score (Review 01) | Severity | Divergence flag |
|---|---|---|---|---|---|
| P1 | Outcomes are the unit of work | 34 | 32 | Critical | no |
| P2 | Specifications are living artifacts | 72 | 62 | Low | yes |
| P3 | Architecture is defence-in-depth | 22 | 18 | Critical | no |
| P4 | Right-size the swarm | 38 | 22 | Critical | no |
| P5 | Autonomy is a tiered budget | 38 | 12 | Critical | no |
| P6 | Knowledge and memory are infrastructure | 38 | 30 | Critical | no |
| P7 | Context is engineered like code | 40 | 35 | High | yes |
| P8 | Evaluations are the contract | 34 | 34 | Critical | no |
| P9 | Observability covers reasoning | 18 | 14 | Critical | no |
| P10 | Assume emergence, engineer containment | 12 | 14 | Critical | no |
| P11 | Optimize economics of intelligence | 18 | 10 | Critical | no |
| P12 | Accountability requires intelligibility | 18 | 22 | Critical | no |

Two principles cross a severity boundary between the overview and the principle files: P2 (62 Medium → 72 Low) and P7 (35 Critical → 40 High). The principle-file scores are authoritative; the severity labels above and used throughout Parts 10 and 11 follow them.

## Introduction

This review is a fair assessment, not a takedown. OpenSpec's stated scope is "AI-native system for spec-driven development" (Review 01, Framing Warning); evaluating it against a 12-principle manifesto whose bar covers runtime governance, observability, and economics necessarily produces low scores against the dimensions OpenSpec excludes by design. Two commitments structure the analysis: (1) every strength below is anchored to a `## What works` bullet in a specific Wave 1 file and is omitted when no such anchor exists; (2) every gap maps to a regulation in `domains/insurance.md` with article or section identifier, and where Allianz regulations demand a capability OpenSpec scopes out, the gap is flagged as a Scope Gap rather than charged as a capability failure.

The maturity verdict in Part 8 is **Phase 3 (Agentic prototyping with structured specs)**, bounded by three unmet Phase 4 gates — autonomy tiers, evaluation gates, and basic memory persistence — named in Review 05. The target_phase is therefore **Phase 4**. Eight of twelve principles sit in the Critical severity band (P1, P3, P4, P5, P6, P8, P9, P10, P11, P12), one is High (P7), one is Low (P2). The gap list below targets the smallest set of capabilities whose addition would lift OpenSpec into Phase 4 for the regulated Allianz workloads enumerated in `domains/insurance.md` Hard Autonomy Caps (lines 261–269).

A note on Allianz's autonomy ceiling: per `companion/frameworks.md` line 192 (cited in Review 05), Phase 3 caps deployment at Tier 1 regardless of infrastructure. The hardest-binding `domains/insurance.md` use cases (personal-lines underwriting line 263, claims adjudication line 264, IDD-scope advisory line 265, SCR calculation line 268) are themselves Tier 1 ceilings for permanent regulatory reasons. Phase 4 unblocks Tier 2 use cases — fraud detection (line 266), pricing optimisation for fleet/commercial (line 267) — that are otherwise out of reach.

## Part 10 — What OpenSpec Gets Right (Fairly Assessed)

**1. Delta-typed, machine-parseable specification evolution**

*Principles touched: P2, P6*

#### Mechanism
Every change to an OpenSpec source-of-truth specification flows through one of four typed delta operations — `## ADDED Requirements`, `## MODIFIED Requirements`, `## REMOVED Requirements`, `## RENAMED Requirements` — defined in `OpenSpec/schemas/spec-driven/schema.yaml` and documented in `OpenSpec/docs/concepts.md` "Delta Specs". The deltas live in `openspec/changes/<id>/specs/` until archive, at which point `openspec/specs/cli-archive/spec.md` Requirement: "Spec Updates Before Archiving" applies them to `openspec/specs/`. The reconciliation logic in `openspec/specs/specs-sync-skill/spec.md` Scenario "Idempotent operation" guarantees repeated syncs produce identical results.

The grammar makes the diff between "the spec before this change" and "the spec after this change" first-class data rather than a narrative: a delta cannot pretend to add a requirement that already exists or remove one that does not, because the structural validator rejects malformed deltas before archive.

#### Why it is genuinely good
This prevents one of the failure modes named in `manifesto-principles.md` §2: spec evolution becoming a free-text rewrite where it is unclear what changed, when, or by whom. For Allianz under Solvency II Article 116 (internal-model documentation), a regulator-readable trail of which requirements were added/modified/removed/renamed across model iterations is exactly the format that supervisory review requires. The same property supports SR 11-7 §IV.A model-development documentation.

#### Evidence
- **Wave 1 anchor:** Review 02 P2 file `## What works` bullets 2 ("Delta semantics are explicit and machine-parseable") and 3.
- **Source anchor (verbatim from Wave 1):** "`OpenSpec/schemas/spec-driven/schema.yaml` enforces this via the `specs` artefact instruction (\"Use FROM:/TO: format\" for renames; \"MUST include full updated content\" for modifications)" (Review 02 P2, `## What works` bullet 2).

#### Better than the alternative
The simpler alternative is free-form Markdown spec files edited via pull request, where reviewers reconstruct the change semantics from a unified diff. That alternative loses the "added/modified/removed/renamed" classification at the requirement level, which is the unit Solvency II validation operates on. OpenSpec's typed deltas give a regulator a per-requirement event stream rather than a per-line diff.

*Fairness note: Deltas are typed but their content is prose — `### Requirement:` text and `#### Scenario:` blocks are not machine-readable beyond Markdown shape. Review 02 P2 evidence-against (paragraph 1) records that "requirements have no stable identifiers and no schema beyond a Markdown-heading convention", so the typing buys structural traceability and not semantic verifiability.*

---

**2. RFC 2119 Given/When/Then specification grammar**

*Principles touched: P2, P8*

#### Mechanism
`OpenSpec/docs/concepts.md` "Spec Format" enforces `### Requirement:` blocks each containing one or more `#### Scenario:` blocks in Given/When/Then form, with RFC 2119 keywords (`MUST`, `SHALL`, `SHOULD`, `MAY`) defined as "MUST/SHALL — absolute requirement" (per Review 01 §Specify and Review 02 P2). `openspec/specs/openspec-conventions/spec.md` Requirement: "Structured Format for Behavioral Specs" enforces the heading format. `openspec validate` (Zod-based, per `openspec/specs/cli-validate/spec.md` Requirement: "Bulk and filtered validation") rejects malformed scenarios before archive.

#### Why it is genuinely good
The Given/When/Then form gives an acceptance criterion a parseable shape — a precondition, a stimulus, a postcondition — that an evaluation runner can later bind to a test asset. RFC 2119 keywords distinguish absolute requirements from preferences, removing one class of ambiguity from agent-authored specs. For Allianz under EU AI Act Article 11 (technical documentation) and IDD suitability assessment (`domains/insurance.md` line 168), having a "the agent SHALL produce a demands-and-needs statement" requirement expressible in a known grammar is a precondition for any later behavioural test.

#### Evidence
- **Wave 1 anchor:** Review 02 P8 file `## What works` bullet 3.
- **Source anchor (verbatim from Wave 1):** "`docs/concepts.md` \"Spec Format\" enforces the `### Requirement:` / `#### Scenario:` Given/When/Then structure with RFC 2119 keywords, and `openspec/specs/cli-validate/spec.md` Requirement \"Validator SHALL detect likely misformatted scenarios and warn with a fix\"" (Review 02 P8, `## What works` bullet 3).

#### Better than the alternative
The simpler alternative is prose acceptance criteria in a `## Acceptance Criteria` heading. That form admits sentences whose precondition and stimulus are entangled and whose RFC 2119 weight is implicit — exactly the failure mode `manifesto-principles.md` §2 calls out as "a wish, not an engineering artifact". OpenSpec's grammar narrows the ambiguity surface.

*Fairness note: Scenarios remain prose interpreted by an agent; no command in OpenSpec source binds a scenario to an automated test asset, fixture, or CI assertion — Review 02 P8 evidence-against bullet 1 names this directly. The grammar is the structural seed an evaluation portfolio could be built from, not the portfolio itself. **This strength is architectural** for the contract-test use case: the parseable shape exists, but the runtime that exercises it does not. The deployment gap is itself a Phase 4 blocker — see Gap 1.*

---

**3. Source-of-truth / change-folder isolation with deterministic archive merge**

*Principles touched: P3, P4*

#### Mechanism
`OpenSpec/docs/concepts.md` lines 31–43 (per Review 02 P3) separate `openspec/specs/` (the source of truth) from `openspec/changes/<id>/` (the in-flight workspace). A change folder cannot edit the source-of-truth specs directly; deltas live in `openspec/changes/<id>/specs/` and are applied to `openspec/specs/` only at `openspec archive` time, by the reconciliation logic in `openspec/specs/specs-sync-skill/spec.md`. Parallelism is bounded to the change-folder unit per `OpenSpec/docs/workflows.md` "Parallel Changes": multiple changes can exist simultaneously without conflicting at the file-system level.

#### Why it is genuinely good
A single commit path — the archive merge — is the manifesto's preferred topology for swarm-style work (`manifesto-principles.md` §4 "swarms propose; a single commit path commits", per Review 02 P4 `## What works` bullet 1). It prevents two agents from racing to overwrite the same source-of-truth requirement, which is the failure mode `manifesto-principles.md` §4 calls "the swarm is a mob". For Allianz, this isolation means a rejected change does not contaminate the spec corpus.

#### Evidence
- **Wave 1 anchor:** Review 02 P3 file `## What works` bullet 1; Review 02 P4 file `## What works` bullets 1 and 3.
- **Source anchor (verbatim from Wave 1):** "`OpenSpec/openspec/specs/` versus `openspec/changes/` directory separation (`OpenSpec/docs/concepts.md` lines 31–43) gives a single deterministic source of truth and an isolated change workspace, reducing accidental edits to current specs" (Review 02 P3, `## What works` bullet 1).

#### Better than the alternative
The simpler alternative is editing specs in place via PR. That allows two agents to push conflicting edits to the same `### Requirement:` block; the merge is then a 3-way text merge with no semantic typing. OpenSpec's separation forces the conflict into a defined surface (the archive merge) where typed deltas are applied in a defined order.

*Fairness note: The isolation is structural, not enforced beyond filesystem convention. Review 02 P3 evidence-against records `OpenSpec/docs/concepts.md` line 586: "Dependencies are enablers, not gates"; and `OpenSpec/openspec-parallel-merge-plan.md` (cited in Review 02 P4) admits the archive step "cannot detect divergence between the change author's starting point and the live spec, so parallel development corrupts the source of truth without warning". Two changes archived sequentially against stale base versions can silently overwrite each other.*

---

**4. Structural Markdown validator with stable JSON output for CI**

*Principles touched: P2, P3, P8*

#### Mechanism
`openspec/specs/cli-validate/spec.md` Requirement: "Bulk and filtered validation" defines `openspec validate --all --strict --json` as a CLI primitive (per Review 02 P2, P3, and P8). The validator is Zod-based and lives in `OpenSpec/src/core/validation/validator.ts` (459 lines per Review 02 P3 `## What works` bullet 2). The JSON output schema is `{ items[], summary, version }` per Review 02 P8 Requirement "JSON output schema for bulk validation". Invalid results include a "Next steps footer" with actionable remediation.

#### Why it is genuinely good
A non-zero CI exit on malformed specs is the only enforcement lever OpenSpec offers, but it is real and machine-actionable. It catches one structural failure mode — corrupted spec deltas, missing scenario blocks, missing `## Why` / `## What Changes` sections — before deltas are merged into `openspec/specs/`. For Allianz, the JSON envelope is consumable by an external CI gate that an Allianz integration team can wire to refuse a PR until the structural validation passes.

#### Evidence
- **Wave 1 anchor:** Review 02 P3 file `## What works` bullet 4; Review 02 P8 file `## What works` bullet 1.
- **Source anchor (verbatim from Wave 1):** "`openspec/specs/cli-validate/spec.md` defines machine-checkable structural validation (`openspec validate --all --strict --json`) that emits a stable JSON shape `{ items[], summary, version }` per the \"JSON output schema for bulk validation\" scenario, giving CI a non-zero exit on malformed specs" (Review 02 P8, `## What works` bullet 1).

#### Better than the alternative
The simpler alternative is no CLI validator at all, leaving spec well-formedness to manual reviewer attention. That is exactly the "vague prompts and unpredictable results" failure mode OpenSpec's README cites. The Zod validator gives a structural integrity claim that CI can attest mechanically.

*Fairness note: The validator is structural-only. Review 02 P3 evidence-against records `OpenSpec/docs/commands.md` line 336: "Does not block archive, but surfaces issues" — the structural validator can be bypassed via `--no-validate` per Review 02 P10 `## What works` discussion of `--skip-specs` and `--no-validate` flags. Semantic correctness, factual fidelity, and behavioural conformance are not checked.*

---

**5. Versioned context-injection pipeline with deterministic ordering and a 50KB budget**

*Principles touched: P7*

#### Mechanism
`openspec/config.yaml` carries a `context` string and a per-artefact `rules` map. `openspec/specs/context-injection/spec.md` Requirement "Format context with XML-style tags" mandates the exact byte sequence `<context>\n{content}\n</context>\n\n`. `openspec/specs/rules-injection/spec.md` Requirement "Validate artifact IDs during instruction loading" warns on unknown artifact IDs and caches them. `openspec/specs/config-loading/spec.md` Requirement "Enforce context size limit" caps the project context string at 50KB and rejects with a logged warning when "context of 51KB" is supplied.

#### Why it is genuinely good
The pipeline gives context engineering one machine-enforced budget bound (50KB) and one machine-enforced structural placement (`<context>` before `<rules>` before `<template>`). This is the "versioned" half of the P7 minimum bar at the configuration layer, and it removes one class of context drift — silent context-size growth — from the failure surface. For Allianz under DORA Article 6(2) ICT-risk-management proportionality, having a documented context budget is a precondition for arguing context is bounded.

#### Evidence
- **Wave 1 anchor:** Review 02 P7 file `## What works` bullets 1 and 2.
- **Source anchor (verbatim from Wave 1):** "`OpenSpec/openspec/specs/config-loading/spec.md` Requirement: \"Enforce context size limit\" caps the project context string at 50KB and rejects with a logged warning when \"context of 51KB\" is supplied — a concrete, machine-enforced context-budget bound rather than a guideline" (Review 02 P7, `## What works` bullet 1).

#### Better than the alternative
The simpler alternative is shipping the host editor a free-form prompt that aggregates context, rules, and templates with no documented order or budget. That admits the failure modes the manifesto names: stale embeddings, conflicting sources, authority-weighting errors. OpenSpec at least pins the ordering and bounds the size.

*Fairness note: The 50KB cap is the only quantitative bound. Review 02 P7 evidence-against records that there is "no hierarchical retrieval, no rolling summaries, no state compaction, and no authority-weighted pruning"; verbatim injection treats every byte as authoritative. The pipeline is "versioned" but not "tested" or "performance-benchmarked" in the P7 minimum-bar sense.*

---

**6. Co-located change folder preserves intent, design, and tasks for forensic recovery**

*Principles touched: P12, P6*

#### Mechanism
`openspec/specs/openspec-conventions/spec.md` Requirement: "Project Structure" mandates each change folder contain `proposal.md` (intent / scope / approach), optional `design.md`, `tasks.md`, and delta `specs/` co-located in one directory. `openspec/specs/cli-archive/spec.md` archives the folder under `openspec/changes/archive/YYYY-MM-DD-<name>/` preserving every file. The proposal template (`OpenSpec/docs/concepts.md` lines 365–388 per Review 02 P12) requires `## Intent`, `## Scope`, and `## Approach` sections.

#### Why it is genuinely good
This passes the "Intent recovery" step of the structured-recovery test in Review 02 P12 Part B: a new engineer can determine what the original engineer was trying to achieve from the proposal alone, in a single locatable directory, with a date prefix that orders changes chronologically. For Allianz under Solvency II Article 41 (system of governance — written records of decisions) and EIOPA AI Guidelines (board-level AI accountability per `domains/insurance.md` lines 108–115), the intent record is one of the documents the supervisor expects.

#### Evidence
- **Wave 1 anchor:** Review 02 P12 file `## What works` bullets 1 and 2; Review 02 P6 `## What works` bullet 4.
- **Source anchor (verbatim from Wave 1):** "`OpenSpec/openspec/specs/openspec-conventions/spec.md` Requirement: \"Project Structure\" mandates that every change folder contain `proposal.md` (intent/scope/approach), optional `design.md`, `tasks.md`, and delta `specs/` co-located in one directory, giving a single locatable artefact set per change for any future investigator" (Review 02 P12, `## What works` bullet 1).

#### Better than the alternative
The simpler alternative is a free-form `CHANGES.md` file or per-PR descriptions in git history. Both lose the structural separation between intent (why), design (how), tasks (steps), and spec deltas (what), and neither survives outside the git host. OpenSpec's directory-per-change model gives forensic recovery a single attachable artefact.

*Fairness note: The other four structured-recovery steps from Review 02 P12 Part B are partial or failing — Decision recovery is partial because `design.md` is optional under "Progressive Rigor"; Evidence recovery is partial because the artefacts that `manifesto-done.md` calls evidence (evaluation reports, trace IDs, deployment IDs) have no slot; Reproduction is failing because no foundation-model identifier, system-instruction hash, or tool manifest is captured. Intent recovery alone passes; the rest are addressed in the gaps below.*

---

**7. Lightweight-by-default, single-agent topology aligned with manifesto P4 guidance**

*Principles touched: P4*

#### Mechanism
OpenSpec's default `core` profile (per Review 02 P4 `## What works` bullet 2) ships five commands — `/opsx:propose`, `/opsx:explore`, `/opsx:apply`, `/opsx:sync`, `/opsx:archive` — invoked by one host AI assistant per `OpenSpec/docs/opsx.md` "Commands" table (per Review 02 P4 `## What OpenSpec asserts`). Expanded profile features are opt-in via `openspec config profile`. The artefact dependency graph (`proposal → specs → design → tasks → implement` per `OpenSpec/docs/concepts.md` line 354) progresses linearly; the user does not graduate to coordination complexity by default.

#### Why it is genuinely good
`manifesto-principles.md` §4 instructs "Choose the simplest topology that solves the problem and graduate to more complex coordination only when evidence shows it is needed" (per Review 02 P4 evidence-against discussion). OpenSpec defaults correctly: no orchestration, no agent-to-agent message bus, no role specialisation by default. For an Allianz pilot in back-office automation (`domains/insurance.md` line 269, "Tier 3 available — Minimal regulatory overlay"), the lightweight default is fit-for-purpose without coordination overhead the work item does not require.

#### Evidence
- **Wave 1 anchor:** Review 02 P4 file `## What works` bullets 1 and 2.
- **Source anchor (verbatim from Wave 1):** "Default-to-simplest-topology behaviour is structurally enforced. `OpenSpec/README.md` lists the `core` profile as default with five commands... the expanded profile is opt-in via `openspec config profile`. Users do not graduate to coordination complexity by default" (Review 02 P4, `## What works` bullet 2).

#### Better than the alternative
The simpler alternative is shipping every command in the default profile. That presents a swarm-style coordination surface to a single-agent use case, inviting users to wire workflows that need typed shared state and conflict resolution they do not have. OpenSpec defers that complexity until the user opts in.

*Fairness note: Defaulting to single-agent is correct by P4 standards even though the supporting machinery for safe scaling is absent. Review 02 P4 evidence-against records `OpenSpec/openspec-parallel-merge-plan.md` admitting that parallel development corrupts the source of truth, and that no telemetry substrate exists to detect when a single agent becomes insufficient — so the evidence-driven graduation criterion is unactionable inside OpenSpec.*

---

## Part 11 — Gap Analysis: What's Missing to Reach Phase 4

The Phase 4 requirements that drive the gap list below are: autonomy tiers defined per `manifesto-principles.md` lines 207–216 (Tier 1 Observe, Tier 2 Branch, Tier 3 Commit, Tier 4 Operate); evaluations gate changes per `companion/frameworks.md` line 38; basic memory persists across sessions per `companion/frameworks.md` line 38; an evidence bundle assembled at completion per `manifesto-done.md` lines 123–144 with bundle integrity attestation; verification separated from validation per `manifesto-principles.md` line 487; per-change accountable human per `manifesto-principles.md` line 487 P12 minimum bar; AEM execution-trace observability per `governance/integrated-audit-trail.md` and the P9 minimum bar.

### Gap 1 — Behavioural evaluation gate bound to `#### Scenario:` blocks *(Critical — P8, P2)*

OpenSpec scenarios are prose interpreted by an agent; no command binds a scenario to an executable test asset, and `/opsx:verify` is non-blocking.

#### Current state

Per Review 02 P8 evidence-against bullet 1, scenarios in `openspec/specs/<id>/spec.md` are Markdown prose; `openspec validate` checks Markdown shape; `/opsx:verify` (`openspec/specs/opsx-verify-skill/spec.md`) "Does not block archive, but surfaces issues" (`OpenSpec/docs/commands.md` line 336, cited in Review 02 P8). Review 03 records the Verify phase score as 40 with the same finding: "OpenSpec's Verify is agent prose against agent prose: scenarios are not executable, regression and adversarial categories are not required, and no evidence bundle... is assembled".

#### What is missing

A scenario-to-test-asset binding mechanism in the spec schema, a runner that executes the bound assertions, and an archive precondition that fails the merge when scenarios fail or coverage decreases. Specifically:
- Extend `openspec/schemas/spec-driven/schema.yaml` `Scenario` shape with a required `evaluation:` field whose value is a relative path to an executable test asset (Pytest, Jest, behave) plus a `kind:` enumeration (`happy_path`, `regression`, `adversarial`, `fairness`).
- Add an `openspec evaluate <change>` command that resolves every scenario's `evaluation:` reference, executes the runner, and emits a `{change_id, scenario_id, kind, status, evidence_path}` JSON record per scenario.
- Add an archive precondition in `openspec/specs/cli-archive/spec.md` Requirement: "Archive Validation" that fails when any `kind: regression` or `kind: adversarial` scenario is in `failed` state or when overall coverage decreases relative to the previous archived snapshot.

#### What Phase 4 requires

`companion/frameworks.md` line 38 requires "evaluations gate changes" as a Phase 4 gate. `manifesto-done.md` line 123 requires "passing evaluations" as a component of the bundle. `manifesto-principles.md` §8 requires "Every change must be verified against the evaluation suite — and every change must preserve or improve evaluation performance" (per Review 02 P8 evidence-against bullet 6).

#### Why it matters for Allianz in European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II

Solvency II Article 121 (statistical quality standards, `domains/insurance.md` line 89, "Strong fit") and Article 124 (validation standards, `domains/insurance.md` line 94 "Good fit") require executable validation evidence; backtesting against historical claims is required for any internal-model agent (`domains/insurance.md` line 247 mapping). EU AI Act Article 15 (accuracy, robustness, cybersecurity) and Article 17 (quality management) require continuous evaluation across the lifecycle for high-risk AI under Annex III §5(b) (`domains/insurance.md` line 263). DORA Article 16 (digital operational resilience testing) and Article 24–26 (TLPT) require adversarial testing for ICT systems supporting critical functions (`domains/insurance.md` preamble line 14). Without a behavioural evaluation gate, Allianz cannot evidence Article 15 robustness or Article 124 statistical-quality validation for any agent change archived through OpenSpec.

#### What closes it

1. Extend `OpenSpec/openspec/schemas/spec-driven/schema.yaml` Scenario node with `evaluation: { runner: <enum>, path: <relpath>, kind: <enum> }` required for every scenario tagged `kind: regression|adversarial|fairness`.
2. Add `OpenSpec/src/commands/evaluate.ts` registering an `openspec evaluate <change>` command; output a `{change_id, scenario_id, kind, status, evidence_path}` JSON file at `openspec/changes/<id>/.evaluation.json`.
3. Modify `OpenSpec/src/core/archive.ts` archive precondition (per Review 07 §13.5 Finding 1 remediation pattern) to read `.evaluation.json` and refuse archive if any required-kind scenario is `failed` or coverage decreased.
4. Extend `openspec/specs/cli-validate/spec.md` Requirement: "Bulk and filtered validation" to also fail validation when a scenario lacks `evaluation:` for the kinds enumerated as required by the schema.
5. Add a `community schema` (per Review 07 §13.5 Finding 6) `insurance-high-risk` requiring `kind: fairness` scenarios for changes affecting personal-lines underwriting, claims, or pricing.
6. Wire the JSON output to a CI gate in Allianz's existing pipeline that blocks PR merge.

#### Evidence anchor

- **Wave 1 anchor:** see Part 3 P8 score rationale; Part 4 Verify phase analysis.
- **Source anchor (verbatim from Wave 1):** "`/opsx:verify` (`openspec/specs/opsx-verify-skill/spec.md`) is described in `OpenSpec/docs/workflows.md` as \"Check implementation matches specs\"... it is described as `/opsx:verify` invoked by the same operator/agent... The skill 'Does not block archive, but surfaces issues' (`OpenSpec/docs/commands.md` line 336)" (Review 02 P8 evidence-against).

#### Effort

L.

---

### Gap 2 — Reasoning-trace observability with trace IDs *(Critical — P9, P12)*

OpenSpec emits only an anonymous `command_executed` event with command name and version; no per-action trace, decision chain, tool-call log, or model identifier is recorded.

#### Current state

Per Review 02 P9 evidence-against bullet 1 and Review 03 §Observe, `openspec/specs/telemetry/spec.md` Requirement: "Privacy-preserving event design" mandates the system "SHALL NOT include command arguments, file paths, project names, spec content, error messages, or IP addresses in telemetry events". Review 07 §13.5 Finding 3 records the same: "verbatim README claim: 'We collect only command names and version to understand usage patterns. No arguments, paths, content, or PII'". There is no W3C Trace Context, no OpenTelemetry span, and no OTLP export.

#### What is missing

An OpenTelemetry-compatible per-command trace store covering the `governance/integrated-audit-trail.md` AEM execution-trace fields. Specifically:
- An opt-in `OPENSPEC_TRACE_PATH` environment variable that, when set, causes the CLI to write a structured local trace per command run.
- Per-trace fields: `trace_id` (W3C-compliant), `change_id`, `command`, `inputs_sha256`, `outputs_sha256`, `tool_calls[]`, `decisions[]`, `policy_checks[]`, `model_identifier`, `model_version`, `system_instruction_sha256`, `tool_manifest_sha256`, `started_at`, `completed_at`.
- A `--trace-id` flag on every CLI command that propagates the W3C trace context into downstream LLM client invocations through environment variables the host editor honours.

#### What Phase 4 requires

`manifesto-principles.md` §9 minimum bar (per Review 02 P9 evidence-against bullet 1) — "If you cannot answer 'why did this happen' from traces alone, you are not instrumented". `governance/integrated-audit-trail.md` §1.1 AEM execution trace requires per-loop iteration capture of decision chain, tool calls, model identifier, and policy checks. P9 minimum bar instrumentation list — "decisions, tool calls, policy violations, memory retrievals, cost per task, and near-misses".

#### Why it matters for Allianz in European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II

EU AI Act Article 12 (record-keeping, `regulatory/eu-ai-act-addendum.md` per Review 07 sources) requires high-risk AI systems to "automatically record events ('logs') over their lifetime"; the command-name-only event fails this structurally. EU AI Act Article 73 (serious-incident reporting per Review 07 §13.5 Finding 1) opens reporting clocks at incident detection; without traces Allianz cannot reconstruct causation. DORA Article 17 (ICT-related incident management) and Article 9–10 (continuous monitoring) require post-hoc reconstruction of incident causal chains. GDPR Article 22 (`domains/insurance.md` lines 222–231) read with Article 5(2) requires the controller to "demonstrate compliance" — an Article 22 explanation request cannot be served from a command-name event. Solvency II Article 121 (`domains/insurance.md` line 92, "Strong fit") and SR 11-7 §IV.A model documentation require auditable decision data.

#### What closes it

1. Add `OpenSpec/src/cli/index.ts` `preAction` and `postAction` Commander hooks that capture inputs, outputs, model env vars, and timing for every command.
2. Implement `OpenSpec/src/telemetry/trace.ts` writing newline-delimited JSON trace records to `${OPENSPEC_TRACE_PATH}/<change_id>/<trace_id>.jsonl` when the env var is set; default disabled.
3. Define the trace JSON schema in `openspec/schemas/trace/schema.yaml` with the fields enumerated above; validate on read.
4. Add `openspec trace export <change>` command emitting OTLP-compatible spans to a configured collector.
5. Add an archive precondition (paired with Gap 1) that requires a non-empty `.trace.jsonl` file for the change when the schema is `insurance-high-risk`.
6. Wire the OTLP export into Allianz's institutional SOC retention store with the EU AI Act lifetime-retention setting.

#### Evidence anchor

- **Wave 1 anchor:** see Part 12.5 in Review 07; Part 9 P9 score rationale; Part 4 Observe phase analysis.
- **Source anchor (verbatim from Wave 1):** "`OpenSpec/src/telemetry/index.ts:124-131` — verbatim `client.capture({ distinctId: userId, event: 'command_executed', properties: { command: commandName, version: version, surface: 'cli',`; `OpenSpec/README.md:189` — verbatim `We collect only command names and version to understand usage patterns. No arguments, paths, content, or PII.`" (Review 07 §13.5 Finding 3).

#### Effort

L.

---

### Gap 3 — Indirect prompt-injection scanning on change-folder Markdown *(Critical — P10, P3)*

`proposal.md`, `tasks.md`, `design.md`, and delta specs are loaded into LLM context verbatim with no scanning for embedded instructions, invisible Unicode, or jailbreak strings.

#### Current state

Per Review 07 §12.5 and §13.5 Finding 1, the `apply-change` skill template instructs the LLM: "Read every file path listed under `contextFiles` from the apply instructions output". `OpenSpec/src/core/validation/validator.ts:28` reads files via `readFileSync(filePath, 'utf-8')` and forwards them unmodified. Review 07 §12.5 walks the Slack-AI 2024 indirect-injection vector through OpenSpec's `apply-change` flow and concludes the controls that fire are "Zod structural validation (no semantic effect on the attack); telemetry capture" — none semantically blocks the attack.

#### What is missing

A content-safety pass over change-folder Markdown that runs at validate time and at archive time, plus a strict-archive flag that promotes proposal-level errors from informative to blocking. Specifically:
- A `applyContentSafetyRules` step in `OpenSpec/src/core/validation/validator.ts` invoked from `validateChange` and `validateSpec`.
- Detection rules for: zero-width Unicode, white-on-white text, RTL overrides, fenced-block instruction markers, and a configurable jailbreak-string registry.
- A `--strict-archive` flag on `archive` that promotes the current "informative only" proposal validation (`OpenSpec/src/core/archive.ts:101` per Review 07 §13.5 Finding 1) to blocking.
- A SHA-256 of every change folder written to a `.openspec.integrity` sidecar at archive time.

#### What Phase 4 requires

`manifesto-principles.md` §10 — "Treat every retrieval artifact, tool response, and agent-to-agent message as untrusted input" (per Review 02 P10 evidence-against bullet 3). `manifesto-principles.md` §3 minimum bar — "If a boundary is described but not enforced at runtime with automated detection and recovery, it is not architecture — it is documentation" (per Review 02 P3 evidence-against). The Phase 4 evidence-bundle gate (`manifesto-done.md` lines 123–144) requires bundle integrity attestation.

#### Why it matters for Allianz in European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II

The Slack-AI 2024 incident pattern named in the OpenSpec attack walkthrough (Review 07 §12.5) is a live exfiltration vector. Triggers for Allianz: DORA Article 17 ICT major-incident reporting (`domains/insurance.md` preamble line 14 places DORA in scope); EU AI Act Article 73 serious-incident reporting for high-risk underwriting (`domains/insurance.md` line 263); GDPR Article 33 72-hour notification if customer data is reachable through exfiltrated credentials (`domains/insurance.md` lines 205–220). EU AI Act Article 15 (accuracy, robustness, cybersecurity, `domains/insurance.md` line 263) explicitly requires resilience to adversarial inputs. Solvency II Article 112–127 internal-model approval is jeopardised when the SCR pipeline's authoring path admits unauthorised access (`domains/insurance.md` lines 91–95).

#### What closes it

1. Add `OpenSpec/src/core/validation/content-safety.ts` exporting `applyContentSafetyRules(content: string): SafetyFinding[]` covering zero-width Unicode, RTL overrides, white-on-white text, fenced instruction markers, and jailbreak-string matches.
2. Invoke `applyContentSafetyRules` from `Validator.validateChange` and `Validator.validateSpec` in `OpenSpec/src/core/validation/validator.ts:17`; emit Critical findings for any positive match.
3. Add the `--strict-archive` flag in `OpenSpec/src/core/archive.ts:50` `ArchiveCommand`, replacing the line-101 `// Proposal validation is informative only` behaviour when the flag is set.
4. Compute SHA-256 over each archived change folder and write `archive/<id>/.openspec.integrity.json` with `{ content_hashes, archive_timestamp, signature_slot }` aligned to `governance/evidence-bundle-schema.md` `aem_components` fields.
5. Add a documented data/instruction separator convention to `OpenSpec/src/core/templates/workflows/apply-change.ts` — a literal `<<<DATA_BEGIN>>>` / `<<<DATA_END>>>` envelope around `proposal.md` content the LLM is told to treat as data.
6. Mandate `--strict-archive` in Allianz's CI pipeline for any change in DORA-scope or EU AI Act high-risk scope.

#### Evidence anchor

- **Wave 1 anchor:** see Part 12.5 in Review 07; see Part 13.5 Finding 1 in Review 07; Part 3 P10 score rationale.
- **Source anchor (verbatim from Wave 1):** "`OpenSpec/src/core/templates/workflows/apply-change.ts:38-44` — verbatim `Read every file path listed under \`contextFiles\` from the apply instructions output.` ; `OpenSpec/src/core/validation/validator.ts:28` — verbatim `const content = readFileSync(filePath, 'utf-8');`. There is no instruction-content scanner anywhere in `src/`" (Review 07 §13.5 Finding 1).

#### Effort

M.

---

### Gap 4 — Autonomy-tier declaration per change with phase × tier compatibility check *(Critical — P5, P4)*

OpenSpec records no autonomy tier per change; the four-command surface is tier-agnostic and `domains/insurance.md` Hard Autonomy Caps cannot be enforced through OpenSpec.

#### Current state

Per Review 02 P5 Tier Assessment, OpenSpec operates structurally at Tier 1 (Observe) for planning artefacts and at "Tier 2 (Branch) by convention only". Review 05 Phase Gate Non-Negotiables records the autonomy-tier definition gate as unmet: "`OpenSpec/AGENTS.md` is empty (size 0); `grep -rn \"Tier 1|Tier 2|autonomy tier\" OpenSpec/` returns zero matches; the workflow surface in `OpenSpec/README.md` line 39 (`/opsx:propose`) and lines 58–67 (`/opsx:apply`, `/opsx:archive`) is tier-agnostic". Review 08 §14.1 records "Autonomy tier approval — Absent — no evidence in OpenSpec".

#### What is missing

A required `autonomy_tier:` field per change with values 1–4 plus a tier-vs-phase validation step. Specifically:
- A required `autonomy_tier:` and `decision_class:` field in `openspec/changes/<id>/.openspec.yaml` with enums (1, 2, 3, 4) and (`personal_lines_underwriting`, `claims_adjudication`, `idd_advisory`, `scr_calculation`, `fraud_action`, `pricing_optimisation`, `back_office`).
- A validator rule (`openspec/specs/cli-validate/spec.md`) refusing the change when `autonomy_tier` exceeds the cap declared for the given `decision_class` (e.g., Tier 1 for `personal_lines_underwriting` per `domains/insurance.md` line 263).
- A phase × tier compatibility check enforcing `domains/insurance.md` line 192's `companion/frameworks.md` rule "Phase 3 or below → Tier 1 only, regardless of infrastructure".

#### What Phase 4 requires

`companion/frameworks.md` line 38 — "autonomy tiers are defined" is named as a Phase 4 gate. `manifesto-principles.md` lines 207–216 enumerate the Tier 1–4 definitions. `manifesto-principles.md` lines 253–255 — "Phase maturity is a prerequisite for autonomy tier" (per Review 02 P5 evidence-against bullet 6).

#### Why it matters for Allianz in European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II

`domains/insurance.md` Hard Autonomy Caps (lines 261–269) impose Tier 1 ceilings for personal-lines underwriting (line 263, EU AI Act Annex III §5(b); GDPR Article 22; EIOPA AI Guidelines), claims adjudication (line 264, EU AI Act high-risk; FCA Consumer Duty; GDPR Article 22), IDD-scope advisory (line 265, IDD suitability; FCA ICOBS), and SCR calculation (line 268, Solvency II Articles 112–127; IMAP use test). Without a tier field on the change folder, these regulatory floors are unenforceable inside OpenSpec, and a developer using `/opsx:apply` cannot demonstrate to BaFin or to the EIOPA-channelled supervisor that the agent's authority during development was bounded (`domains/insurance.md` Article 14 mapping in Review 02 P5 Allianz implications). Solvency II Article 121(1) major/minor change classification (`domains/insurance.md` lines 78–87) requires the same field as a precondition for supervisory pre-approval routing.

#### What closes it

1. Extend `OpenSpec/openspec/schemas/spec-driven/schema.yaml` change metadata with required `autonomy_tier: 1|2|3|4` and `decision_class: <enum>` fields.
2. Add `OpenSpec/src/core/validation/tier-policy.ts` exporting `validateTierAgainstDecisionClass(tier, decision_class, phase)` returning a typed violation list.
3. Wire the call from `Validator.validateChange` and refuse archive when violations present.
4. Add a `domains/<domain>.policy.yaml` configuration loaded at validate time mapping `decision_class` → `max_tier` (defaulted from `domains/insurance.md` Hard Autonomy Caps for the insurance domain).
5. Surface the tier in `openspec list` and in the archive directory name (e.g., `archive/2026-05-08-add-claims-rule.tier1/`).
6. Block `/opsx:apply` from invoking host-editor write-tools when `autonomy_tier=1` (Observe-only); enforced via the host-editor adapter in `OpenSpec/src/core/command-generation/adapters/`.

#### Evidence anchor

- **Wave 1 anchor:** see Part 3 P5 score rationale; see Part 8 Phase Gate Non-Negotiables (Autonomy tier definition row); see Part 14.1 in Review 08 (Autonomy tier approval row).
- **Source anchor (verbatim from Wave 1):** "unmet — `OpenSpec/AGENTS.md` is empty (size 0); `grep -rn \"Tier 1|Tier 2|autonomy tier\" OpenSpec/` returns zero matches; the workflow surface in `OpenSpec/README.md` line 39 (`/opsx:propose`) and lines 58–67 (`/opsx:apply`, `/opsx:archive`) is tier-agnostic" (Review 05 Phase Gate Non-Negotiables, Autonomy tier definition row).

#### Effort

L (organisational dominant — engineering is M; the policy mapping step requires Allianz second-line and actuarial-function review).

---

### Gap 5 — Named accountable human and segregation-of-duties gate before archive *(Critical — P12)*

No artefact in OpenSpec records a named accountable human or enforces author-vs-approver separation; `--yes` skips the only confirmation prompt and `/opsx:verify` is run by the implementing agent.

#### Current state

Per Review 02 P12 Part A — every oversight pattern (HITL, HOTL, HOLL, EDL) is Absent. `openspec/specs/cli-archive/spec.md` archives once tasks are checked; `/opsx:verify` "is run by the implementing agent and is non-blocking" (Review 02 P12 score rationale). Review 08 §14.1 records "Accountable human owner — Absent — `OpenSpec/openspec/specs/workspace-links/spec.md` lines 269–271: ... `OpenSpec SHALL not ask for owner or handoff metadata`. The framework explicitly declines to record an owner". Review 08 §14.1 also flags "Segregation of duties — `--yes` removes the only human prompt".

#### What is missing

A required `accountable_human` and `independent_validator` field per change, plus an archive precondition refusing the merge when both names are missing or identical. Specifically:
- A required `accountable_human: { name, email, role, attestation_signature }` block in `openspec/changes/<id>/.openspec.yaml`.
- A required `independent_validator: { name, email, role, attestation_signature }` block, refused at archive when `independent_validator.email == accountable_human.email`.
- A `--yes` flag restriction that refuses to bypass the accountable-human prompt; only `--yes-skip-task-confirmation` is permitted to bypass non-accountability prompts.

#### What Phase 4 requires

`manifesto-principles.md` P12 minimum bar — "If no named human can inspect the reasoning, review the evidence, and own the outcome of a production agent, the system is ungoverned" (per Review 02 P12 evidence-against bullet 1). `manifesto-principles.md` §8 — "Independent validation must be capable of blocking production deployment. A team that can only observe and advise is not independent validation — it is a consultation" (per Review 02 P8 evidence-against bullet 3). The Phase 4 governance baseline requires the manifesto-done.md "Governed" condition to be evidenced.

#### Why it matters for Allianz in European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II

EIOPA AI Guidelines (`domains/insurance.md` lines 108–115) require board-level accountability and second-line independent challenge for material AI use. Solvency II Article 41 (system of governance, `domains/insurance.md` Solvency II Article 41 mapping) and Article 48 (actuarial function independence, `domains/insurance.md` line 144 "Strong fit") require organisationally separate accountability with documented reviewer qualifications. SR 11-7 §V (effective challenge, `domains/insurance.md` SR 11-7 mapping) requires qualified, independent challenge with blocking authority. EU AI Act Article 14 (human oversight) requires natural persons with the necessary competence and authority. GDPR Article 22(4) (`domains/insurance.md` lines 222–231) requires that "a human must be in the decision loop... actually reviewing and accepting responsibility for the decision".

#### What closes it

1. Extend `OpenSpec/openspec/schemas/spec-driven/schema.yaml` change metadata with required `accountable_human` and `independent_validator` blocks.
2. Modify `OpenSpec/src/core/archive.ts` `ArchiveCommand.execute` to load both blocks, verify both signatures (sigstore-compatible), and refuse archive when either is missing or both emails are identical.
3. Restrict the `--yes` flag in `OpenSpec/src/core/archive.ts:53` to bypass only task-completion confirmation; never bypass accountable-human verification.
4. Add an `openspec attest <change>` command that produces a detached signature for each named human, written to `openspec/changes/<id>/.attestations/`.
5. Surface the accountable human in `openspec list` output and in the archive directory metadata so a Solvency II Article 41 governance-record query can return the named owner per change.
6. Wire the segregation-of-duties check into Allianz's CI gate: refuse merge when `git log --format=%ae` for the change branch contains the `accountable_human.email`.

#### Evidence anchor

- **Wave 1 anchor:** see Part 3 P12 score rationale; see Part 14.1 in Review 08 (Accountable human owner, Segregation of duties rows).
- **Source anchor (verbatim from Wave 1):** "`OpenSpec/openspec/specs/workspace-links/spec.md` lines 269–271: ... `OpenSpec SHALL not ask for owner or handoff metadata`. The framework explicitly declines to record an owner" (Review 08 §14.1, Accountable human owner row).

#### Effort

M.

---

### Gap 6 — Evidence-bundle assembly with integrity attestation at archive *(Critical — P1, P9)*

OpenSpec produces a Markdown archive folder; none of the eleven `aem_components` from `governance/evidence-bundle-schema.md` (evaluation_reports, trace_ids, diffs, deployment_ids, rollback_plan, policy_check_outputs, memory_updates, control_state_record, agentic_provenance_record, bundle_integrity_attestation, evidence_freshness_attestation) is produced or required.

#### Current state

Per Review 02 P1 Seven-Condition DoD Test, "OpenSpec produces zero of these seven artefacts in machine-readable form. `/opsx:verify`'s 'Ready to archive: Yes (with warnings)' string is assertion, not evidence". Review 03 Part 5 DoD condition table records Verified at 32 with the gap "no evidence bundle, no diffs+trace IDs+policy outputs assembly". Review 07 §13.5 Finding 2 confirms "No SHA-256, no signature, no manifest is written" at archive. Review 05 Phase Gate Non-Negotiables row "Evidence bundle assembly with integrity attestation" is unmet (Critical).

#### What is missing

An archive-time assembler that emits an evidence bundle conforming to `governance/evidence-bundle-schema.md` `aem_components`, plus a SHA-256 integrity attestation. Specifically:
- An `openspec assemble-bundle <change>` command that gathers the evaluation JSON (Gap 1), trace JSONL (Gap 2), git diff, deployment ID (from a configurable hook), rollback plan path, policy-check outputs (Gap 3 content-safety findings), memory updates (Gap 7), agentic provenance record, and integrity attestation into a single `archive/<id>/evidence-bundle.json`.
- A SHA-256 over the bundle written to `archive/<id>/.openspec.integrity.json`.
- An `evidence_freshness_attestation` per `manifesto-done.md` evidence freshness rules.

#### What Phase 4 requires

`manifesto-done.md` lines 123–144 require "passing evaluations... diffs, trace IDs, policy check outputs" and "Bundle integrity attestation. The assembled evidence bundle must be" cryptographically integrity-protected (per Review 02 P1 evidence-against bullet 7). `manifesto-principles.md` §1 evidence definition (per Review 02 P1 evidence-against bullet 2) names evaluation reports, trace IDs, diffs, deployment IDs, rollback plans, policy check outputs, memory updates as the seven evidence components.

#### Why it matters for Allianz in European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II

Solvency II Article 121(4) — Internal Model Validation (`domains/insurance.md` line 92, "Strong fit" but with documentation-format gap) requires evidenced validation; an Allianz agent product touching SCR governed by OpenSpec alone fails validation-process supervisory review without the bundle. EU AI Act Article 12 (`regulatory/eu-ai-act-addendum.md` per Review 07 sources) and Article 13 (transparency, `domains/insurance.md` line 145 partial fit) require record-keeping per high-risk system; the bundle is the consolidation point. DORA Article 5 (governance and control framework) requires tamper-evident audit trails; the absence of bundle integrity attestation is a regulated-environment blocker (per Review 02 P1 Allianz implications). GDPR Article 35 DPIA reference (per Review 02 P1 Allianz implications, Article 35 mapping) needs the bundle as the registered artefact.

#### What closes it

1. Define `openspec/schemas/evidence-bundle/schema.yaml` aligned 1:1 with `governance/evidence-bundle-schema.md` `aem_components` field list.
2. Add `OpenSpec/src/commands/assemble-bundle.ts` registering `openspec assemble-bundle <change>`; reads from `.evaluation.json` (Gap 1), `.trace.jsonl` (Gap 2), `.attestations/` (Gap 5), `.policy-checks.json` (Gap 3).
3. Modify `OpenSpec/src/core/archive.ts` to invoke `assembleBundle` as a post-archive hook (per Review 07 §13.5 Finding 2 remediation) and refuse archive without it when the schema is `insurance-high-risk`.
4. Compute SHA-256 over the bundle, write `archive/<id>/.openspec.integrity.json` with `{ content_hashes, bundle_sha256, archive_timestamp, signature_slot }`.
5. Add an `evidence_freshness_attestation` field that captures the timestamps of each component and a freshness-rule pass/fail verdict.
6. Wire bundle archival into Allianz's regulator-evidence vault via a configured exporter that runs after archive.

#### Evidence anchor

- **Wave 1 anchor:** see Part 3 P1 score rationale; see Part 5 Verified condition narrative; see Part 13.5 Finding 2 in Review 07.
- **Source anchor (verbatim from Wave 1):** "`OpenSpec/src/core/archive.ts:36-48` — verbatim `async function moveDirectory(src: string, dest: string): Promise<void> { try { await fs.rename(src, dest); } catch (err: any) { ... } }`. No SHA-256, no signature, no manifest is written" (Review 07 §13.5 Finding 2).

#### Effort

L.

---

### Gap 7 — Agentic provenance record with foundation-model and tool-manifest fields *(Critical — P6, P12)*

Archived changes carry no foundation-model identifier, system-instruction hash, tool manifest, retrieval-corpus version, or embedding-model version; agent-authored requirements are retrieved with the same epistemic authority as human-authored ones.

#### Current state

Per Review 02 P6 evidence-against bullet 6 ("Knowledge contamination"), "OpenSpec mandates no agent-authorship label on archived specs". Review 02 P12 Part B records Reproduction as a Fail because "no file in `OpenSpec/openspec/specs/` records the foundation-model identifier, model version, provider category, system-instruction hash, tool manifest, memory state version, retrieval corpus version, embedding model version, or dataset lineage that produced any artefact". Review 02 P11 evidence-against bullet 2 records "`OpenSpec/openspec/config.yaml` schema (`schema: spec-driven`) and `OpenSpec/openspec/specs/global-config/spec.md` define no model field".

#### What is missing

A required agentic-provenance block per change, conforming to `operational-templates/agentic-provenance-record.json`. Specifically:
- A required `agentic_provenance: { foundation_model: { id, version, provider }, system_instruction_sha256, tool_manifest: [], retrieval_corpus_version, embedding_model_version, dataset_lineage[] }` block in `openspec/changes/<id>/.openspec.yaml`.
- An `agent_authored: true|false` plus `model_identifier` field per `### Requirement:` block produced through `/opsx:propose`.
- Refusal at archive when the provenance block is missing for any change in EU AI Act high-risk scope.

#### What Phase 4 requires

`manifesto-principles.md` §6 — "Mitigate by requiring provenance labeling of all agent-authored artefacts at commit time" (per Review 02 P6 evidence-against bullet 6). `manifesto-done.md` agentic provenance record requirement (per Review 02 P1 Hardening DoD bullet 3). The Phase 4 evidence-bundle gate (`manifesto-done.md` lines 123–144) requires the provenance record as a bundle component.

#### Why it matters for Allianz in European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II

EU AI Act Article 10 (data governance) and Article 12 (record-keeping) for high-risk AI under Annex III §5(b) (`domains/insurance.md` line 263) mandate documented data lineage; the provenance record is the lineage artefact. EU AI Act Article 13 (transparency) requires deployer-readable model identification. DORA Article 28 (ICT third-party risk, `domains/insurance.md` preamble line 14) and Article 29 (concentration risk) require Allianz to track foundation-model providers — the foundation_model.provider field is the register key (`regulatory/foundation-model-third-party-register.md` per Review 07 sources). Solvency II Article 121 (statistical quality, `domains/insurance.md` line 92) requires data-lineage and assumption-tracking on internal models. GDPR Article 5(1)(d) (accuracy) requires provenance to distinguish agent-authored rules from human-authored rules in claims and underwriting flows (per Review 02 P6 Allianz implications, GDPR Article 9/22 mapping).

#### What closes it

1. Define `openspec/schemas/agentic-provenance/schema.yaml` aligned 1:1 with `operational-templates/agentic-provenance-record.json`.
2. Add a required `agentic_provenance` block to `openspec/changes/<id>/.openspec.yaml`; validate via Zod in `OpenSpec/src/core/validation/validator.ts`.
3. Modify `/opsx:propose` skill template (`OpenSpec/src/core/templates/workflows/...`) to capture host-editor model identifier, prompt SHA-256, and tool manifest into the provenance block when invoking the agent.
4. Add `agent_authored: true|false` and `model_identifier` to every `### Requirement:` block emitted by `/opsx:propose`; validate in `cli-validate`.
5. Refuse archive in `OpenSpec/src/core/archive.ts` when `agentic_provenance` is missing and the change schema is `insurance-high-risk`.
6. Export the provenance block to Allianz's DORA Pillar 4 third-party-ICT register via a configured exporter (closes the register gap named in Review 01 Allianz observations).

#### Evidence anchor

- **Wave 1 anchor:** see Part 3 P6 evidence-against bullet 6; see Part 3 P12 Part B Reproduction step; see Part 13.5 Finding 5 in Review 07.
- **Source anchor (verbatim from Wave 1):** "`OpenSpec mandates no agent-authorship label on archived specs.`... nothing in `openspec/specs/cli-archive/spec.md` requires that an agent-authored requirement carry an `agent_authored: true` marker, model identifier, or system-instruction hash that travels with the artefact through retrieval" (Review 02 P6 evidence-against bullet 6).

#### Effort

M.

---

### Gap 8 — Verification-vs-validation separation with blocking independent validator *(High — P8)*

`/opsx:verify` collapses verification, validation, and coherence into one agent-run skill executed by the same actor that produced the implementation; the skill is non-blocking.

#### Current state

Per Review 02 P8 evidence-against bullet 3, "`/opsx:verify` (`openspec/specs/opsx-verify-skill/spec.md`) collapses verification, validation, and coherence into one agent-run skill executed by the same actor who produced the implementation". Review 03 Part 4 Validate phase scores 18 with the finding "OpenSpec collapses validation into the same `/opsx:verify` agent run that performs verification". Review 02 P10 evidence-against bullet 7 names this the "evidence laundering" failure pattern.

#### What is missing

A separate `validate` phase that runs after `verify`, executed by a different actor, with blocking authority. Specifically:
- A `/opsx:validate` skill (separate from `/opsx:verify`) that asks "did we build the right thing" against business outcomes, not "did we build it right" against the spec.
- An archive precondition refusing the merge when `validate` has not been signed by an `independent_validator` (Gap 5) holding qualifications matching the `decision_class` (e.g., Fellow of an actuarial professional body for `scr_calculation`).
- A blocking gate that fails when `validate.status == failed`.

#### What Phase 4 requires

`manifesto-principles.md` line 487 — "Verification answers: did we build the thing right? Validation answers: did we build the right thing?" (per Review 02 P8 evidence-against bullet 3). Phase 5 readiness per `governance/phase-level-matrix.md` line 23 (per Review 05 Evidence Matrix Phase 5 row) requires "validation, domain-scoped accountability". Phase 4 attainment requires the structural separation as a precondition.

#### Why it matters for Allianz in European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II

Solvency II Article 124 (validation standards, `domains/insurance.md` line 94 "Good fit") requires "Validation must be conducted by persons independent of model development and with sufficient actuarial expertise. The validation function must be organisationally separate". Solvency II Article 48 (actuarial function, `domains/insurance.md` line 144 "Strong fit") requires qualified actuarial review. SR 11-7 §V (effective challenge, `domains/insurance.md` SR 11-7 mapping) requires "Independent validation must be capable of blocking production deployment". EU AI Act Article 17 (quality management) requires distinct verification and validation procedures. EIOPA AI Guidelines (`domains/insurance.md` line 144 "Strong fit") require second-line independent challenge.

#### What closes it

1. Define a new skill `openspec/specs/opsx-validate-skill/spec.md` separate from `opsx-verify-skill`; the skill asks "does the implementation deliver the business outcome stated in `## Why`" against measurable success criteria (Gap requires loop-readiness fields).
2. Add `OpenSpec/src/core/templates/workflows/validate-change.ts` instructing the LLM client (operating as a different identity from the implementer) to run validate.
3. Modify `OpenSpec/src/core/archive.ts` to require both `verify.status == passed` and `validate.signed_by == independent_validator.email` before archive.
4. Add a `qualifications:` field in the `independent_validator` block (Gap 5) checked against a `domains/<domain>.policy.yaml` qualifications map (e.g., `scr_calculation: ["FIA", "FIAA"]`).
5. Persist both verification and validation reports into the evidence bundle (Gap 6).
6. Wire the validation step into Allianz's actuarial-function workflow as the sole authority over deployment for Solvency II in-scope agents.

#### Evidence anchor

- **Wave 1 anchor:** see Part 3 P8 evidence-against bullet 3; see Part 4 Validate phase analysis.
- **Source anchor (verbatim from Wave 1):** "`/opsx:verify` (`openspec/specs/opsx-verify-skill/spec.md`) collapses verification, validation, and coherence into one agent-run skill executed by the same actor who produced the implementation. EU AI Act Art. 17 (quality management system for high-risk AI) requires distinct verification and validation procedures; OpenSpec does not provide them" (Review 02 P8 evidence-against bullet 3).

#### Effort

M.

---

### Gap 9 — Waiver register with expiry, justification, and staleness detection *(High — P10, P12)*

`--no-validate`, `--skip-specs`, and `--yes` flags bypass the only structural and confirmation gates without an expiry, logged justification, or staleness signal.

#### Current state

Per Review 07 §13.5 Finding 4, `OpenSpec/src/core/archive.ts:53` defines `options: { yes?: boolean; skipSpecs?: boolean; noValidate?: boolean; validate?: boolean }` and line 89 `const skipValidation = options.validate === false || options.noValidate === true;`. Review 02 P10 evidence-against bullet 8 records "OpenSpec has no waiver register, no expiry mechanism, and no detection of accumulated waivers across change folders". Review 08 §14.1 records "Waiver governance — Absent — no waiver, exception, or expiry artefact exists in `OpenSpec/openspec/specs/`".

#### What is missing

A waiver log requiring justification and expiry, written when any bypass flag is used. Specifically:
- A `--waiver-reason` and `--waiver-expiry` (date) flag pair required when `--no-validate`, `--skip-specs`, or `--yes` is passed in a high-risk schema.
- An `openspec/.waivers.jsonl` append-only log capturing `{change_id, flag, reason, expiry, approver_email, attestation_signature}`.
- An `openspec list --waivers` command surfacing accumulated and expired waivers.

#### What Phase 4 requires

`manifesto-principles.md` §10 — "Waiver accumulation — waivers granted for specific circumstances persist beyond those circumstances, silently expanding the system's effective policy boundary" (per Review 02 P10 evidence-against bullet 8). `governance/governance-integration-note.md` Tier 4 prerequisites (per Review 05 evidence) require waiver-state observability as a Phase 4 precondition.

#### Why it matters for Allianz in European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II

EIOPA second-line challenge expectation (`domains/insurance.md` lines 108–117) cannot be met if validation can be bypassed without an audit record. DORA Article 6(8) (review of ICT risk-management framework on documented basis, `domains/insurance.md` preamble line 14) requires waiver documentation. The CSA *Autonomous but Not Controlled* finding (per Review 07 §13.5 Finding 4) — only 21% of enterprises have formal AI-agent decommissioning processes — has the same root cause: ungoverned waivers persisting beyond their justification. EU AI Act Article 17 (quality management) requires documented exceptions.

#### What closes it

1. Modify `OpenSpec/src/core/archive.ts:89` to refuse `--no-validate`, `--skip-specs`, or `--yes` without accompanying `--waiver-reason <text>` and `--waiver-expiry <YYYY-MM-DD>`.
2. Add `OpenSpec/src/core/waivers.ts` exporting `recordWaiver(record: WaiverRecord): void`; append JSONL to `openspec/.waivers.jsonl`.
3. Add `openspec list --waivers` rendering active and expired waivers with sortable columns; implemented in `OpenSpec/src/commands/list.ts`.
4. Add a daily-runnable `openspec waivers --report-stale` that lists waivers past their expiry and emits a non-zero exit; wirable into Allianz's CI cron.
5. Require `approver_email` to be different from the change author's `git author` email (segregation enforcement, paired with Gap 5).
6. Pipe expired-waiver events into the Allianz governance review cadence per `domains/insurance.md` operational-risk register.

#### Evidence anchor

- **Wave 1 anchor:** see Part 13.5 Finding 4 in Review 07; see Part 14.1 in Review 08 (Waiver governance row).
- **Source anchor (verbatim from Wave 1):** "`OpenSpec/src/core/archive.ts:53` — verbatim `options: { yes?: boolean; skipSpecs?: boolean; noValidate?: boolean; validate?: boolean } = {}`; line 89 — verbatim `const skipValidation = options.validate === false || options.noValidate === true;`. No record is written when these flags are used" (Review 07 §13.5 Finding 4).

#### Effort

S.

---

### Gap 10 — Loop-readiness gate on the proposal artefact *(High — P1, P2)*

`openspec validate` accepts a proposal whose `## Why` is a single sentence with no measurable success criterion, no named accountable human, no blast-radius assessment, and no out-of-scope statement.

#### Current state

Per Review 03 Specify phase analysis, "OpenSpec validates Markdown shape, not loop-readiness. Nothing in `OpenSpec/openspec/specs/cli-validate/spec.md` checks for a measurable success criterion, a named accountable human, a blast-radius assessment, or an out-of-scope statement". The minimum bar in `manifesto.md` "What Must Be True Before Entering Specify" (cited in Review 03 Specify) is unmet.

#### What is missing

A loop-readiness check on `proposal.md` enforcing the nine-condition gate from `manifesto.md`. Specifically:
- Required sections in the proposal: `## Business Need`, `## Measurable Value`, `## Acceptance Criteria`, `## Constraints`, `## Accountable Human`, `## Blast Radius`, `## Out of Scope`, `## Loop Readiness Attestation`.
- A `loop-readiness` validator rule rejecting proposals with empty or stub content in any required section.
- A signed `Loop Readiness Attestation` from the named accountable human (Gap 5) before `/opsx:propose` can be archived.

#### What Phase 4 requires

`manifesto.md` "What Must Be True Before Entering Specify" minimum bar — "If you cannot answer 'what does business success look like and how will you measure it?' before entering Specify, the loop is not ready to run" (per Review 03 Specify analysis). `companion/frameworks.md` Phase 4 readiness expectations include loop-readiness as a precondition.

#### Why it matters for Allianz in European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II

EU AI Act Article 9 (risk management system, `domains/insurance.md` Annex III §5(b) line 263) requires risk-relevant scope to be recorded before any high-risk system enters the lifecycle — the `## Blast Radius` section is the recording surface. Solvency II Article 124 (validation standards, `domains/insurance.md` line 94) requires documented business need; DORA Article 8 (ICT risk management framework) requires consequence-class assessment as a control precondition. The IDD suitability assessment (`domains/insurance.md` lines 168–175) starts with a recorded business-need-and-target-market statement; missing it cascades to IDD non-compliance.

#### What closes it

1. Extend `OpenSpec/openspec/schemas/spec-driven/schema.yaml` `proposal` artefact to require the eight sections enumerated above.
2. Modify `OpenSpec/src/core/validation/validator.ts` proposal validator to refuse proposals where any required section is empty (length < 50 chars, configurable threshold).
3. Add a `loop_readiness_attestation` field carrying the signature of the `accountable_human` (Gap 5).
4. Refuse `/opsx:propose` archive flow when the attestation is missing.
5. Add an `openspec readiness <change>` command emitting a `{change_id, ready: bool, missing_fields[]}` JSON report consumable by CI.
6. Wire the readiness check into Allianz's PR template and CI gate.

#### Evidence anchor

- **Wave 1 anchor:** see Part 4 Specify phase analysis.
- **Source anchor (verbatim from Wave 1):** "`OpenSpec validates Markdown shape, not loop-readiness. Nothing in `OpenSpec/openspec/specs/cli-validate/spec.md` checks for a measurable success criterion, a named accountable human, a blast-radius assessment, or an out-of-scope statement.`" (Review 03 Specify phase, "The gap").

#### Effort

S.

---

### Gap 11 — Cost and model-routing record per change *(High — P11)* (Scope gap — DORA Article 28 / Solvency II Article 41)

OpenSpec records no foundation-model identifier, token usage, cost-per-task, or routing rationale; model selection is a host-editor configuration constant rather than a per-task runtime decision.

#### Current state

Per Review 02 P11 evidence-against bullet 1, "OpenSpec does not provide a routing layer, a model registry, or a tier classifier in any source file under `OpenSpec/src/` or `OpenSpec/openspec/specs/`. Model selection is delegated wholesale to the host editor". Review 02 P11 evidence-against bullet 4 records "No file in `OpenSpec/openspec/specs/` defines a task-cost, outcome-cost, or quality-unit metric". Telemetry per Review 02 P9 evidence-against actively excludes the fields needed for cost attribution.

#### What is missing

A required `model_decision` record per change capturing model choice and cost. Specifically:
- A required `model_decision: { foundation_model_id, version, tier, rationale, alternatives_evaluated[], expected_cost_eur, actual_cost_eur }` block written by the host-editor harness into `openspec/changes/<id>/.openspec.yaml`.
- A token-counter wrapper around host-editor invocations writing into `model_decision.actual_cost_eur` post-run.
- A concentration check refusing archive when foundation-model usage exceeds an allow-list per `regulatory/foundation-model-third-party-register.md`.

#### What Phase 4 requires

`manifesto-principles.md` §11 minimum bar — "Model choice is a runtime decision, not a configuration constant" (per Review 02 P11 evidence-against bullet 2). Phase 4 readiness per `companion/frameworks.md` lines 192–193 — "Phase 3 or below → Tier 1 only, regardless of infrastructure" — and Phase 5 routing maturity (per Review 05 Economics Assessment) require the cost record as the substrate.

#### Why it matters for Allianz in European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II

DORA Article 28 (ICT third-party risk, `domains/insurance.md` preamble line 14) and Article 29 (concentration risk) require Allianz to monitor concentration on a single foundation-model provider; the host-editor delegation in Review 02 P11 means model selection is opaque from OpenSpec's surface. Solvency II Article 41 (system of governance, `domains/insurance.md` line 105 mapping) requires evidence of operational and model-risk cost drivers — cost telemetry is the evidence (per Review 02 P11 Allianz implications, Solvency II Article 41/44 mapping). EU AI Act Article 11 / Annex IV §2(b) (technical documentation) requires documented model selection rationale per high-risk task class. SR 11-7 §IV.A requires effective challenge using challenger models; the `alternatives_evaluated[]` field is the substrate.

This is flagged as a Scope Gap because OpenSpec's stated scope (per Review 01 Framing Warning) excludes runtime model routing. The DORA Article 28 obligation and Solvency II Article 41 obligation are nonetheless binding for Allianz; OpenSpec must therefore admit a record that an external host-harness fills.

#### What closes it

1. Extend `OpenSpec/openspec/schemas/spec-driven/schema.yaml` change metadata with a required `model_decision` block.
2. Add `OpenSpec/src/core/host-adapters/model-decision.ts` exporting `recordModelDecision(record: ModelDecision): void` invoked by the host-editor adapter (`OpenSpec/src/core/command-generation/adapters/`).
3. Add a `model_decision.expected_cost_eur` validation rule refusing archive when the value exceeds a per-`decision_class` ceiling (defaulted from `domains/insurance.md` Hard Autonomy Caps cost-class mapping).
4. Add a concentration-check rule consulting `regulatory/foundation-model-third-party-register.md`-derived allow-list.
5. Pipe the cost record into Allianz's ORSA cost-tracking ledger via a configured exporter (per Review 02 P11 Allianz implications).
6. Surface concentration warnings in `openspec list --concentration`.

#### Evidence anchor

- **Wave 1 anchor:** see Part 3 P11 evidence-against bullets 1, 2, 4; see Part 9 Economics Assessment row in Review 05.
- **Source anchor (verbatim from Wave 1):** "OpenSpec does not provide a routing layer, a model registry, or a tier classifier in any source file under `OpenSpec/src/` or `OpenSpec/openspec/specs/`. Model selection is delegated wholesale to the host editor (`OpenSpec/docs/supported-tools.md`), making model choice a configuration constant of the host, not a runtime decision of OpenSpec" (Review 02 P11 evidence-against bullet 1).

#### Effort

M (organisational dominant — engineering is S; the cost-class mapping requires Allianz finance and ORSA team review).

---

### Gap 12 — Memory store with provenance, expiry, rollback, and domain scoping *(High — P6)*

OpenSpec has no learned-memory construct: no source file defines a memory store, decay schedule, expiry, rollback, domain-scoped namespacing, or skill-evolution governance.

#### Current state

Per Review 02 P6 evidence-against bullet 1, "OpenSpec has no learned-memory construct at all. No file under `OpenSpec/openspec/specs/` defines a memory store, decay schedule, or renewal mechanism". Review 02 P6 evidence-against bullet 3 — "OpenSpec provides no expiry, no rollback, and no provenance mechanism for any agent state beyond Markdown specs". Review 05 Phase Gate Non-Negotiables records "Memory persistence across sessions" as Partial — "durable spec/change archive... gives artefact memory, but no agent-runtime memory store is wired into `OpenSpec/src/`".

#### What is missing

A memory store sibling to `openspec/specs/` that captures learned heuristics with the five P6 mechanisms. Specifically:
- An `openspec/memory/` directory with typed `entry.yaml` files carrying `{id, content, agent_authored, model_identifier, created_at, expires_at, domain_scope, supersedes_id?}`.
- A `memory.write` validator rule refusing entries from agents above Tier 1 without an `independent_validator` signature (Gap 5).
- An `openspec memory expire` command running freshness rules and archiving expired entries.
- An `openspec memory rollback <entry_id>` command.

#### What Phase 4 requires

`companion/frameworks.md` line 38 — "basic memory persists across sessions" is named as a Phase 4 gate. `manifesto-principles.md` §6 minimum bar — "If memory cannot expire, be rolled back, or show provenance, it is not memory — it is a liability" (per Review 02 P6 evidence-against bullet 3). The Phase 4 readiness checks in Review 05 Evidence Matrix list this gate as Partial, blocking the verdict.

#### Why it matters for Allianz in European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II

DORA Article 12 (backup, restoration, recovery, `domains/insurance.md` preamble line 14) requires demonstrable rollback for ICT-supporting components; the rollback command is the lever. EU AI Act Article 10 (data governance, `domains/insurance.md` Annex III §5(b) line 263) requires data lineage with provenance for high-risk AI; the memory entry's provenance fields are the lineage. GDPR Article 5(1)(d) (accuracy) requires distinguishing agent-authored heuristics from human-authored ones (per Review 02 P6 Allianz implications). Solvency II Article 121 (statistical quality, `domains/insurance.md` line 92) requires data-lineage tracking for internal models including learned-state lineage. ISO/IEC 42001 clause A.3.2 (AI roles and responsibilities, per Review 02 P6 evidence-against bullet 8) requires named accountability for memory evolution.

#### What closes it

1. Define `openspec/schemas/memory/schema.yaml` with the entry shape enumerated above.
2. Add `OpenSpec/src/commands/memory.ts` registering `memory write`, `memory list`, `memory expire`, `memory rollback`.
3. Modify `cli-validate` to walk `openspec/memory/` and refuse entries authored by Tier 2+ agents without an `independent_validator` signature.
4. Add a freshness-rule executor that marks entries expired when `expires_at < now` and writes them to `openspec/memory/archive/`.
5. Pipe the rollback command into a Solvency II Article 41 governance-record event when a memory entry is reverted.
6. Domain-scope every memory write via the `decision_class` field (Gap 4) so claims-domain entries cannot be retrieved by underwriting-domain agents (per `domains/insurance.md` GDPR Article 9 special-category-data isolation).

#### Evidence anchor

- **Wave 1 anchor:** see Part 3 P6 evidence-against bullets 1, 3; see Part 8 Phase Gate Non-Negotiables (Memory persistence row).
- **Source anchor (verbatim from Wave 1):** "OpenSpec has no learned-memory construct at all. No file under `OpenSpec/openspec/specs/` defines a memory store, decay schedule, or renewal mechanism" (Review 02 P6 evidence-against bullet 1).

#### Effort

L.

---

## Prioritised Remediation Roadmap

| Gap | Short Name | Severity | Effort | Impact for Allianz | Dependencies |
|---|---|---|---|---|---|
| Gap 5 | Accountable human + segregation gate | Critical | M | Closes Solvency II Art. 41/48, EIOPA board-accountability, SR 11-7 §V, GDPR Art. 22(4) gaps | None |
| Gap 9 | Waiver register with expiry | High | S | Closes EIOPA second-line challenge, DORA Art. 6(8) gaps | None |
| Gap 10 | Loop-readiness gate on proposal | High | S | Closes EU AI Act Art. 9 risk-management scope record gap | None |
| Gap 3 | Prompt-injection scanning | Critical | M | Closes EU AI Act Art. 15, DORA Art. 17, GDPR Art. 33 exposure on the live indirect-injection vector | None |
| Gap 4 | Autonomy-tier per change | Critical | L | Enforces `domains/insurance.md` Hard Autonomy Caps; closes EU AI Act Art. 14, Solvency II Art. 121(1) classification gaps | Gap 5 |
| Gap 7 | Agentic provenance record | Critical | M | Closes EU AI Act Art. 10/12/13, DORA Art. 28 register, Solvency II Art. 121, GDPR Art. 5(1)(d) gaps | Gap 5 |
| Gap 1 | Behavioural evaluation gate | Critical | L | Closes Solvency II Art. 121/124, EU AI Act Art. 15/17, DORA Art. 16/24 gaps | Gap 4, Gap 5 |
| Gap 2 | Reasoning-trace observability | Critical | L | Closes EU AI Act Art. 12, DORA Art. 17, Solvency II Art. 121, SR 11-7 §IV.A, GDPR Art. 22 gaps | Gap 5 |
| Gap 6 | Evidence-bundle assembly + integrity | Critical | L | Closes Solvency II Art. 121(4), EU AI Act Art. 12, DORA Art. 5, GDPR Art. 35 gaps | Gap 1, Gap 2, Gap 5, Gap 7 |
| Gap 8 | Verify vs validate separation | High | M | Closes Solvency II Art. 124/48, SR 11-7 §V, EU AI Act Art. 17 gaps | Gap 5, Gap 1 |
| Gap 12 | Memory store with provenance | High | L | Closes DORA Art. 12, EU AI Act Art. 10, GDPR Art. 5(1)(d), Solvency II Art. 121 lineage gaps | Gap 5, Gap 7 |
| Gap 11 | Cost and model-routing record | High | M | Closes DORA Art. 28/29, Solvency II Art. 41, EU AI Act Art. 11/Annex IV §2(b), SR 11-7 §IV.A gaps | Gap 7 |

### Roadmap Interpretation for Allianz

**Effort tier S (Gaps 9 and 10).** These two gaps unblock the rest of the roadmap by adding text-only artefacts (waiver log, proposal sections) to existing schemas and the existing validator. They sequence first not because they are the most regulator-critical individually, but because they are precondition substrates: the loop-readiness sections in Gap 10 are read by every later gap (autonomy tier, provenance, evaluation), and the waiver register in Gap 9 closes the audit-trail loophole that would otherwise let later controls be silently bypassed via `--no-validate` or `--yes`. Regulator-driven sequencing rationale: EIOPA second-line challenge (`domains/insurance.md` lines 108–117) and EU AI Act Article 9 risk-scope recording (`domains/insurance.md` line 263) both predicate every downstream control on a recorded scope and an accountable bypass register; deferring them inverts the audit chain.

**Effort tier M (Gaps 3, 5, 7, 8, 11).** This tier delivers the per-change accountability and provenance substrate plus the prompt-injection defence and the validate/verify separation. Gap 5 (accountable human) sequences first within the tier because Gaps 4, 7, 8, 12 depend on the `independent_validator` field it introduces. Gap 3 sequences early because it closes a live exfiltration vector (Review 07 §12.5 attack walkthrough, Slack-AI 2024 pattern) whose materialisation triggers DORA Article 17 ICT-major-incident reporting and EU AI Act Article 73 serious-incident clocks regardless of any other control state. Gap 7 (provenance) follows Gap 5 because the agentic-provenance block names the accountable-human's signed scope. Gap 8 (verify vs validate) follows Gap 5 because the independent-validator field is the role separation Solvency II Article 124, SR 11-7 §V, and EIOPA all require. Gap 11 (cost record) follows Gap 7 because the foundation-model identifier is shared between the provenance record and the cost record; doing them out of order forces a schema rewrite. Regulator-driven sequencing rationale: the Solvency II Article 41 system-of-governance record needs the accountable human before any model-decision rationale becomes meaningful; the EU AI Act Article 12 logging obligation needs the provenance fields before traces become reconstructable; the DORA Article 28 third-party register needs the foundation-model identifier before concentration checks become possible.

**Effort tier L (Gaps 1, 2, 4, 6, 12).** This tier delivers the runtime substrate that lifts OpenSpec into Phase 4: behavioural evaluations gate changes (Gap 1), reasoning traces are observable (Gap 2), autonomy tiers are enforced per change (Gap 4), evidence bundles are assembled and integrity-protected (Gap 6), and learned memory persists with provenance (Gap 12). Gap 4 sequences first within the tier because the tier-vs-decision-class enforcement is the gate downstream tooling (Gap 1 evaluations, Gap 8 validate skill, Gap 12 memory writes) consults. Gap 1 and Gap 2 sequence in parallel: both feed into Gap 6 (evidence bundle), and neither depends on the other. Gap 6 is the last-mile assembler that consolidates Gaps 1, 2, 5, and 7 outputs into a single attestable artefact. Gap 12 (memory) sequences last because its segregation rule depends on Gap 5 and its provenance fields depend on Gap 7. Regulator-driven sequencing rationale: Solvency II Article 121/124 validation evidence (`domains/insurance.md` line 92) is the single largest evidence gap (Review 03 DoD Hardening Test verdict — six of seven DoD conditions cannot be evidenced under DORA Art. 17 without the bundle); closing Gaps 1, 2, and 6 produces the bundle that all subsequent supervisory queries — Solvency II IMAP, EU AI Act Article 12 logs, DORA Article 17 incident reconstruction, GDPR Article 22 explanation requests — can be answered from. Gap 4 unlocks Tier 2 use cases (`domains/insurance.md` lines 266–267 fraud detection and pricing optimisation) that are otherwise unreachable from a Phase 3 ceiling.

**Adoption ceiling after full roadmap completion.** OpenSpec's adoption ceiling at Allianz becomes Phase 4. The framework will then satisfy `companion/frameworks.md` Phase 4 gates A (autonomy tiers defined — Gap 4), B (evaluations gate changes — Gap 1), and C (basic memory persists — Gap 12), plus the evidence-bundle assembly with integrity attestation gate that Review 05 named as a Phase 4 non-negotiable. Tier 2 use cases unlock per `domains/insurance.md`: fraud detection triggering account/claim action (line 266) and pricing optimisation for fleet, commercial, non-personal-lines (line 267). Tier 1 hard caps on personal-lines underwriting (line 263), claims adjudication (line 264), IDD-scope advisory (line 265), and SCR calculation (line 268) remain in force as regulatory floors regardless of phase. Phase 5 progression — domain-scoped validation, full Agentic Loop with verification + validation + observe + learn + govern phases populated — is reachable once the Gap 8 separation, the Gap 11 economics record, and the operational-risk feedback loop are in steady-state production for at least one quarter, per the Review 05 Deployment Path Stages 4–6 sequence.

---

*Review conducted by Agent 06. Source files: 18 upstream outputs listed in the metadata block. Regulatory frameworks sourced from `domains/insurance.md` (sections cited in Part 11 listed inline). Manifesto principles sourced from `manifesto-principles.md`, `manifesto.md`, and `manifesto-done.md`.*
