# OpenSpec — Agentic Engineering Manifesto Alignment Review (Merged)

---
Framework:           OpenSpec
Version:             1.3.1
Review date:         2026-05-08
Manifesto:           arnaudgelas/agentic-engineering-manifesto@08123c263794b5cc24dbb3e1a5897a74288026e9
Reviewer methodology: Multi-agent swarm review — 13 specialised agent roles (01; 02-p1..02-p12; 03; 04a; 04b; 04c; 05a; 05b; 06; 07; 08a; 08b; 09) producing 19 source files across Wave 1a / 1b / 2 / 3 execution
Context:             European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II
Client:              Allianz
Sources (19 files):
  - openspec_aem/openspec_aem_review_01_quick_overview.md
  - openspec_aem/openspec_aem_review_02_principle_p1.md
  - openspec_aem/openspec_aem_review_02_principle_p2.md
  - openspec_aem/openspec_aem_review_02_principle_p3.md
  - openspec_aem/openspec_aem_review_02_principle_p4.md
  - openspec_aem/openspec_aem_review_02_principle_p5.md
  - openspec_aem/openspec_aem_review_02_principle_p6.md
  - openspec_aem/openspec_aem_review_02_principle_p7.md
  - openspec_aem/openspec_aem_review_02_principle_p8.md
  - openspec_aem/openspec_aem_review_02_principle_p9.md
  - openspec_aem/openspec_aem_review_02_principle_p10.md
  - openspec_aem/openspec_aem_review_02_principle_p11.md
  - openspec_aem/openspec_aem_review_02_principle_p12.md
  - openspec_aem/openspec_aem_review_03_loop_dod.md
  - openspec_aem/openspec_aem_review_04_adoption_companion.md
  - openspec_aem/openspec_aem_review_05_maturity_industry.md
  - openspec_aem/openspec_aem_review_06_strengths_gaps.md
  - openspec_aem/openspec_aem_review_07_guardrails_security_appendix.md
  - openspec_aem/openspec_aem_review_08_enterprise_guardrails.md
Overall score:       31.5 / 100
Maturity level:      Phase 3 — Agentic Prototyping (with structured specs)
Severity:            Critical
---

## Framing Warning

### What OpenSpec is

OpenSpec is a Node.js CLI distributed as `@fission-ai/openspec` (`package.json`) that generates AI-assistant slash-command skills (`/opsx:propose`, `/opsx:apply`, `/opsx:verify`, `/opsx:archive` and others) for "20+ AI assistants" (`README.md`). Its philosophy line is "fluid not rigid → iterative not waterfall → easy not complex → built for brownfield not just greenfield" (`README.md`). The product asserts it "adds a lightweight spec layer so you agree on what to build before any code is written" (`README.md`). Inputs are user intent and prior `openspec/specs/<capability>/spec.md` content; outputs are change folders and merged main specs.

### What the manifesto's scope OpenSpec covers by design

OpenSpec touches the manifesto's **Specify** loop phase (P2) and a thin slice of **Plan** (`tasks.md`). It produces versioned, reviewable, human-and-agent-readable specifications with `### Requirement:` / `#### Scenario:` blocks in Given/When/Then form (`docs/concepts.md`), enforced by `openspec validate` against a Zod schema (`openspec/specs/cli-validate/spec.md`). The delta model — `## ADDED`, `## MODIFIED`, `## REMOVED`, `## RENAMED` (`schemas/spec-driven/schema.yaml`) — gives brownfield change a first-class artefact. `openspec/config.yaml` injects a project `context:` block and per-artefact `rules:` into AI prompts.

### What is out of scope by design (scope gap vs. failure)

OpenSpec is "a lightweight spec layer" (`README.md`), not a runtime, an autonomy controller, an evaluation engine, or an observability stack. It does not execute scenarios, does not bind specs to test fixtures, does not enforce domain boundaries at runtime, does not score or constrain agent autonomy, does not log decisions or tool calls, does not route to model tiers, does not record cost, and does not name accountable humans. The README compares OpenSpec to Spec Kit and Kiro and frames it as "lighter and lets you iterate freely" — i.e., a planning artefact framework. Manifesto dimensions outside Specify/Plan are scope gaps, not capability failures, **for the framework's stated intent**. They remain alignment gaps for any deployer who relies on OpenSpec alone for governance.

### Score interpretation warning

These scores measure manifesto alignment, not fitness for OpenSpec's stated purpose. A dimension OpenSpec documents as out of scope (runtime enforcement, evaluation execution, observability, autonomy tiering, model routing, accountability) does not count as a capability failure of OpenSpec — it counts as a gap a deployer must close through composition with other tooling. A low score on out-of-scope dimensions reflects a genuine alignment gap an Allianz deployer must close through external runtime, evidence, and governance infrastructure — not that OpenSpec is broken at what it claims to do. Allianz must make a separate judgment about whether OpenSpec closes governance gaps that existing model-governance, change-management, and second-line tooling already cover, or whether OpenSpec adds a parallel artefact stream that does not reach the regulator-credible bar set by Solvency II Article 124, EU AI Act Article 17, and DORA Article 6. Several gaps are operationally critical at Allianz because Solvency II Article 116 internal-model documentation, GDPR Article 22(4) automated-decision constraints, and EU AI Act Article 12 logging obligations apply to artefacts and runtime behaviour OpenSpec does not produce, regardless of how well its specs are authored.

## Executive Verdict

**Composite score 31.5/100 — Critical** (recomputed from Part 1's authoritative per-principle scores using the canonical weighting from `prompt.md`; see Part 1 and Source Integrity for the divergence with agent 01's reported 25.4). Eight of twelve principles sit in the Critical band (P1, P3, P5–P11 share Critical or border it), one is High (P7, 40/100), one is Low (P2, 72/100). The framework is honestly scoped as a spec layer; the manifesto's bar covers runtime governance, observability, evaluations, autonomy tiering, and accountability — dimensions OpenSpec excludes by design.

**Maturity Verdict: Phase 3 (Agentic prototyping with structured specs)** (see Part 8). The verdict is bounded by three unmet Phase 4 gates from `companion/frameworks.md`: autonomy tiers defined, evaluations gate changes, basic memory persists across sessions. Evidence for placement: `OpenSpec/docs/concepts.md` ships an RFC-2119 keyword discipline and `OpenSpec/src/commands/validate.ts` enforces structural validation over the artefact graph, exceeding Phase 2 ceremony. Evidence overriding higher placement: no autonomy-tier construct, no behavioural evaluation gate, no evidence-bundle assembler, no agentic provenance record.

**Top 3 strengths.** **Strength 1** — Delta-typed, machine-parseable specification evolution (`## ADDED` / `## MODIFIED` / `## REMOVED` / `## RENAMED Requirements` defined in `OpenSpec/schemas/spec-driven/schema.yaml`) makes spec evolution diffable per requirement, supporting Solvency II Article 116 documentation. **Strength 2** — RFC 2119 Given/When/Then specification grammar enforced by `openspec validate` gives acceptance criteria a parseable shape suitable as the structural seed for an evaluation portfolio. **Strength 3** — Source-of-truth / change-folder isolation with deterministic archive merge prevents two agents from racing to overwrite the same source-of-truth requirement.

**Top 3 gaps.** **Gap 1 — Behavioural evaluation gate bound to `#### Scenario:` blocks (Critical, P8/P2).** Scenarios are prose; `/opsx:verify` "Does not block archive". Closes Solvency II Art. 121/124, EU AI Act Art. 15/17, DORA Art. 16/24. **Gap 2 — Reasoning-trace observability with trace IDs (Critical, P9/P12).** `command_executed` PostHog event with command name and version is the entire runtime payload. Closes EU AI Act Art. 12, DORA Art. 17, Solvency II Art. 121, SR 11-7 §IV.A, GDPR Art. 22. **Gap 3 — Indirect prompt-injection scanning on change-folder Markdown (Critical, P10/P3).** `proposal.md`, `tasks.md`, `design.md` are loaded into LLM context verbatim with no scanning; the Slack-AI 2024 indirect-injection vector is fully open.

**The Red Line.** The following workflows are regulator-impermissible for Allianz when deployed solely on OpenSpec, regardless of Allianz internal sign-off: solely-automated underwriting using special-category health or genetic data (GDPR Art. 22(4) read with Art. 9); solely-automated insurance advice in IDD jurisdictions (IDD Directive 2016/97/EU read with FCA ICOBS); solely-automated claims adjudication that affects coverage or payout (EU AI Act Annex III §5(b), FCA Consumer Duty, GDPR Art. 22 where health data is involved); SCR calculation outputs published without actuarial sign-off (Solvency II Art. 112–127 IMAP use test); major Solvency II internal-model changes deployed without supervisory pre-approval (Solvency II Art. 112–127). Each is regulator-impermissible because the controlling control — human-in-the-loop attestation, human-confirmation artefact, contestation-evidence record, actuarial sign-off field, supervisory-approval gate — is structurally absent from OpenSpec.

**Highest-leverage single change.** Add a first-class, machine-readable autonomy-tier and evidence-bundle metadata block to the `proposal.md` and `archive` artefacts, plus a mandatory `/opsx:verify` policy hook that reads the block and refuses archive when the bundle does not satisfy the declared tier's required components. Concretely: a top-of-file metadata block in `proposal.md` with named fields (`autonomy_tier`, `blast_radius_dimensions`, `regulatory_class`, `framework_version`, `owner`); a new `evidence_bundle/` subfolder mandating, per declared tier, a `diff.patch`, a `tests.json` execution report, a `trace_id` reference, a `rollback.md` command, a `policy_check.json` output, and a `cost.json` accounting; promote `/opsx:verify` from optional to mandatory at archive time, with a non-overridable failure when a Tier 2 or Tier 3 declaration is paired with an incomplete bundle. This is the highest-leverage single change because every Phase-3→4 evidence requirement, every Solvency II Article 121/124 documentation expectation, every EU AI Act Article 15 conformity-assessment input, every DORA Article 6 enforced-control demonstration, and every risk-tier pre-screener requirement pivots on a single primitive: a machine-readable, gate-enforced bundle that pairs declared tier with declared evidence.

## Source Integrity

- Per-principle score check (P1): source A reports 32 (`openspec_aem_review_01_quick_overview.md` Manifesto Principles Table row P1), source B reports 34 (`openspec_aem_review_02_principle_p1.md` H1 line `# P1 — Outcomes are the unit of work | **34/100**`). Discrepancy Δ2. Per-principle file score is authoritative; merged Part 3 uses 34.
- Per-principle score check (P2): source A reports 62 (`openspec_aem_review_01_quick_overview.md` table row P2), source B reports 72 (`openspec_aem_review_02_principle_p2.md` H1 `# P2 — Specifications are living artifacts | **72/100**`). Discrepancy Δ10 — crosses severity boundary (Medium → Low).
- Per-principle score check (P3): source A reports 18, source B reports 22. Discrepancy Δ4. Both Critical.
- Per-principle score check (P4): source A reports 22, source B reports 38. Discrepancy Δ16. Both Critical.
- Per-principle score check (P5): source A reports 12, source B reports 38. Discrepancy Δ26. Both Critical.
- Per-principle score check (P6): source A reports 30, source B reports 38. Discrepancy Δ8. Both Critical.
- Per-principle score check (P7): source A reports 35, source B reports 40. Discrepancy Δ5 — crosses severity boundary (Critical → High).
- Per-principle score check (P8): source A reports 34, source B reports 34. Match.
- Per-principle score check (P9): source A reports 14, source B reports 18. Discrepancy Δ4. Both Critical.
- Per-principle score check (P10): source A reports 14, source B reports 12. Discrepancy Δ2. Both Critical.
- Per-principle score check (P11): source A reports 10, source B reports 18. Discrepancy Δ8. Both Critical.
- Per-principle score check (P12): source A reports 22, source B reports 18. Discrepancy Δ4. Both Critical.
- Per-principle H1 vs Score-rationale check: each `02-pN` file's H1 score equals its `## Score rationale` `Score: **NN/100**` line. No internal mismatches.
- Loop-phase score check: agent 01 table reports Specify 60, Design 35, Plan 55, Execute 25, Verify 30, Validate 12, Observe 14, Learn 28, Govern 18; agent 03 reports Specify 58, Design 55, Plan 62, Execute 22, Verify 40, Validate 18, Observe 14, Learn 20, Govern 15. Discrepancies on every phase except Observe (14=14). Owner-authoritative resolution per Step 3: agent 03 owns Loop-phase scores; merged Part 4 uses agent 03 values.
- DoD condition score check: agent 01 reports Shipped 22, Observable 12, Verified 30, Provable 8, Learned from 25, Governed 18, Economical 8; agent 03 reports Shipped 45, Observable 12, Verified 32, Provable 8, Learned from 22, Governed 8, Economical 6. Discrepancies on Shipped Δ23, Verified Δ2, Learned from Δ3, Governed Δ10, Economical Δ2; Observable and Provable match. Agent 03 owns DoD-condition scores; merged Part 5 uses agent 03 values.
- Maturity verdict check: agent 01 names Phase 1 (Exploration); agent 05b names Phase 3 (Agentic Prototyping). Discrepancy: different phase. Agent 05a (surfaced by 05b) owns the Maturity Verdict; merged Part 8 and metadata use Phase 3.
- Composite arithmetic check: agent 01 header reports `Overall Score: 25.4/100` consistent with its own table totals (P1 0.32×10=3.2; P2 0.62×8=4.96; P3 0.18×8=1.44; P4 0.22×6=1.32; P5 0.12×10=1.2; P6 0.30×7=2.1; P7 0.35×7=2.45; P8 0.34×10=3.4; P9 0.14×10=1.4; P10 0.14×8=1.12; P11 0.10×6=0.6; P12 0.22×10=2.2 → 25.39 ≈ 25.4). Recomputation using authoritative per-principle file scores (P1=34, P2=72, P3=22, P4=38, P5=38, P6=38, P7=40, P8=34, P9=18, P10=12, P11=18, P12=18) yields Σ(score×decimal_weight) = 3.4+5.76+1.76+2.28+3.8+2.66+2.80+3.4+1.8+0.96+1.08+1.8 = 31.5. Discrepancy Δ6.1. Per Step 3, the computed value (31.5) is authoritative for the merged document; the divergence is reported here.
- Severity-threshold check: agent 01 labels every principle's severity correctly under its own scores. Under the authoritative per-principle scores, P2 moves from Medium (62) to Low (72) and P7 moves from Critical (35) to High (40); the merged document follows the per-principle file labels.
- Agent 06 score-consistency note (lifted verbatim from `openspec_aem_review_06_strengths_gaps.md` header): "The principle files (Review 02) are authoritative when divergent from the overview file (Review 01). The table below uses principle-file scores throughout."

Integrity status: 14 issues detected (0 Critical, 0 High, 14 informational score-divergences resolved by Step 3 ownership rules). The composite score 31.5 supersedes 25.4; severity remains Critical for both values; per-principle severity changes are limited to P2 (Medium→Low) and P7 (Critical→High).

## Part 1 — Overall Scores

### Manifesto Principles Table

| # | Principle Name | Weight | Score | Weighted | Severity |
|---|---|---|---|---|---|
| P1 | Outcomes are the unit of work | 10% | 34 | 3.40 | Critical |
| P2 | Specifications are living artifacts | 8% | 72 | 5.76 | Low |
| P3 | Architecture is defence-in-depth | 8% | 22 | 1.76 | Critical |
| P4 | Right-size the swarm | 6% | 38 | 2.28 | Critical |
| P5 | Autonomy is a tiered budget | 10% | 38 | 3.80 | Critical |
| P6 | Knowledge and memory are infrastructure | 7% | 38 | 2.66 | Critical |
| P7 | Context is engineered like code | 7% | 40 | 2.80 | High |
| P8 | Evaluations are the contract | 10% | 34 | 3.40 | Critical |
| P9 | Observability covers reasoning | 10% | 18 | 1.80 | Critical |
| P10 | Assume emergence, engineer containment | 8% | 12 | 0.96 | Critical |
| P11 | Optimize economics of intelligence | 6% | 18 | 1.08 | Critical |
| P12 | Accountability requires intelligibility | 10% | 18 | 1.80 | Critical |
| **Total** | | **100%** | | **31.5** | **Critical** |

### Agentic Loop Phases Table (authoritative: agent 03)

| Phase | Score | One-sentence assessment |
|---|---|---|
| Specify | 58 | `schemas/spec-driven/schema.yaml` `proposal` and `specs` artefact templates plus `### Requirement:` / `#### Scenario:` Given/When/Then format make Specify a first-class step; the manifesto's loop-readiness gate (business need validated, value measurable, accountable human named, blast radius assessed) has no counterpart in OpenSpec's spec template. |
| Design | 55 | `schemas/spec-driven/schema.yaml` `design` artefact and `docs/concepts.md` "Architecture Decisions" section give Design a place; `design.md` is optional under Progressive Rigor and contains no machine-enforced domain boundaries, type contracts, or repository gates. |
| Plan | 62 | `tasks.md` artefact format and the apply-phase tracker give Plan a parseable structure; OpenSpec does not size tasks against autonomy tier, blast radius, or capacity. |
| Execute | 22 | `/opsx:apply` hands execution to the host AI assistant; OpenSpec does not bound the executing agent's tool scope, permission set, or blast radius — execution governance is delegated entirely to the host runtime. |
| Verify | 40 | `/opsx:verify` checks "Completeness, Correctness, Coherence" against artefacts and produces CRITICAL/WARNING/SUGGESTION output; verify "Does not block archive" (`docs/commands.md` line 336) and scenario coverage is a warning, not a gate. |
| Validate | 18 | The framework collapses validation into the same `/opsx:verify` agent run that performs verification; there is no separated "did we build the right thing?" gate, no organisationally separate validator, no production-decision authority. |
| Observe | 14 | `src/telemetry/index.ts` records command names and version anonymously; there is no decision trace, tool-call log, memory-retrieval log, near-miss capture, or governance-state observability of the kind required by `manifesto-principles.md` §9. |
| Learn | 20 | The archive flow merges deltas into `openspec/specs/<id>/spec.md` so durable spec evolution is captured; OpenSpec has no learned-memory store, no provenance metadata on agent-authored artefacts, and no expiry/rollback mechanism for memory entries. |
| Govern | 15 | `openspec/config.yaml` `rules:` are injected per artefact; there is no policy envelope, no control state record, no waiver lifecycle, no economics review, no kill switch, and no out-of-scope-tool-call detection. |

### Agentic Definition of Done Table (authoritative: agent 03)

| Condition | Score | One-sentence assessment |
|---|---|---|
| Shipped | 45 | `cli-archive/spec.md` archives a change once `tasks.md` checkboxes are marked complete; archive is not deployment — no environment record, no production version, no deployment-time stamp. |
| Observable | 12 | Anonymous command-name telemetry is the only built-in telemetry; the manifesto requires inspectable traces of decisions, tool calls, policy violations, memory retrievals, cost per task, and near-misses — none are emitted. |
| Verified | 32 | `/opsx:verify` authors a CRITICAL/WARNING/SUGGESTION report and `openspec validate` enforces Markdown structure; `manifesto-done.md` requires "evidence bundle (diffs, trace IDs, policy check outputs) required for every automated merge" — none of these are produced or required. |
| Provable | 8 | `openspec validate --strict --json` produces a stable JSON shape that CI can parse; no formal invariants, no replayable proof artefacts, and no contract-level proofs of the kind described in `manifesto-principles.md` §8. |
| Learned from | 22 | Archived changes are preserved under `openspec/changes/archive/<date>-<name>/` so the change history is durable; `manifesto-principles.md` §6's distinction between knowledge and learned memory, and the provenance/expiration/rollback mechanisms, are absent. |
| Governed | 8 | `openspec/config.yaml` `rules:` blocks inject per-artefact governance hints into AI prompts; `manifesto-done.md` requires autonomy tier, named accountable human, rollback procedure, and control state record — none of these are produced or required. |
| Economical | 6 | OpenSpec records nothing about model choice, model tier, inference cost, or routing; the only cost-adjacent reference is README's recommendation of "Opus 4.5 and GPT 5.2" — a configuration recommendation, not runtime model routing. |

### Maturity Phase Verdict

OpenSpec maps to **Phase 3 — Agentic Prototyping (with structured specs)** in the manifesto's six-phase model. The verdict is bounded by the lowest unmet Phase 4 gate. Evidence for placement: structured proposal/specs/design/tasks artefact graph; RFC-2119 keyword discipline; Zod-based structural validator; archive merge into source-of-truth specs. Evidence overriding higher placement: no autonomy-tier vocabulary anywhere in `OpenSpec/src/`; `validate` is structural-only, not behavioural; no evidence-bundle assembler exists; no agentic provenance record; `/opsx:verify` is non-blocking and does not separate verification from validation. This matches Phase 3's canonical failure mode: "autonomy without verification".

## Part 2 — Scoring Methodology

OpenSpec artefacts read end-to-end before scoring across the agent swarm: `OpenSpec/README.md`, `OpenSpec/package.json`, `OpenSpec/CHANGELOG.md`, `OpenSpec/AGENTS.md` (empty file noted), `OpenSpec/docs/concepts.md`, `OpenSpec/docs/workflows.md`, `OpenSpec/docs/commands.md`, `OpenSpec/docs/opsx.md`, `OpenSpec/docs/customization.md`, `OpenSpec/docs/getting-started.md`, `OpenSpec/docs/cli.md`, `OpenSpec/docs/installation.md`, `OpenSpec/docs/migration-guide.md`, `OpenSpec/docs/multi-language.md`, `OpenSpec/docs/supported-tools.md`, `OpenSpec/schemas/spec-driven/schema.yaml`, `OpenSpec/openspec/config.yaml`, the `openspec/specs/` directory listing (40 capability spec folders including `cli-validate`, `cli-archive`, `change-creation`, `opsx-verify-skill`, `opsx-archive-skill`, `opsx-onboard-skill`, `specs-sync-skill`, `context-injection`, `rules-injection`, `instruction-loader`, `schema-validate-command`, `schema-fork-command`, `schema-init-command`, `telemetry`, `workspace-foundation`, `workspace-links`, `workspace-open`), `OpenSpec/src/cli/index.ts`, `OpenSpec/src/commands/validate.ts`, `OpenSpec/src/core/validation/validator.ts`, `OpenSpec/src/core/parsers/markdown-parser.ts`, `OpenSpec/src/core/templates/workflows/apply-change.ts`, `OpenSpec/src/core/templates/workflows/feedback.ts`, `OpenSpec/src/core/templates/workflows/explore.ts`, `OpenSpec/src/core/templates/workflows/onboard.ts`, `OpenSpec/src/core/templates/workflows/verify-change.ts`, `OpenSpec/src/core/templates/workflows/bulk-archive-change.ts`, `OpenSpec/src/core/init.ts`, `OpenSpec/src/core/archive.ts`, `OpenSpec/src/telemetry/index.ts`, `OpenSpec/src/telemetry/config.ts`, and `OpenSpec/openspec-parallel-merge-plan.md`. Manifesto sources read: `manifesto.md`, `manifesto-principles.md`, `manifesto-done.md`, `glossary.md`, `domains/insurance.md`, `companion/frameworks.md`, `companion/principles.md`, `companion/patterns.md`, `companion/guide.md`, `companion/re-framework.md`, `companion/reference.md`, `adoption/path.md`, `adoption/playbook.md`, `adoption/enterprise.md`, `adoption/metrics.md`, `adoption/roles.md`, `adoption/pilot.md`, `adoption/vmodel.md`, `governance/evidence-bundle-schema.md`, `governance/integrated-audit-trail.md`, `governance/governance-integration-note.md`, `governance/authority-accountability-matrix.md`, `governance/phase-level-matrix.md`, `integration/loop-readiness-for-agent-opportunities.md`, `integration/low-consequence-resolution.md`, `operational-templates/slo-table.md`, `operational-templates/agent-inventory-schema.md`, `operational-templates/ai-risk-register.md`, `operational-templates/risk-appetite-statement.md`, `operational-templates/decommissioning-checklist.md`, `operational-templates/agentic-provenance-record.json`, `operational-templates/control-state-record.json`, `operational-templates/evidence-bundle.json`, `regulatory/eu-ai-act-addendum.md`, `regulatory/incidents-appendix.md`, `regulatory/foundation-model-third-party-register.md`, `regulatory/nist-ai-rmf-crosswalk.md`, `regulatory/iso-42001-crosswalk.md`, and `regulatory/iso-23894-23053-crosswalk.md`.

Scope gaps were treated per the master prompt's hard rule: a documented scope boundary (e.g., "OpenSpec is a lightweight spec layer", `README.md`) is reported in the Framing Warning subsection "What is out of scope by design" and the principle is still scored against the manifesto's full bar; the score below 100 reflects an alignment gap a deployer must close, not a capability failure at OpenSpec's stated intent. The canonical 12-principle weighting from `prompt.md` was applied with scores expressed as decimals; severity labels follow the canonical thresholds from `prompt.md`.

The framework's actual version (1.3.1) was verified against `OpenSpec/package.json` `version: "1.3.1"` and `OpenSpec/CHANGELOG.md` heading `## 1.3.1`. The review date 2026-05-08 is the date the agents were invoked. Unmerged or unreleased work was checked: `OpenSpec/openspec/changes/IMPLEMENTATION_ORDER.md` and `OpenSpec/openspec/explorations/*` describe planned workspace-UX work documented as "under active development and is not ready for use yet" (`docs/concepts.md` "Coordination Workspaces"); those capabilities are noted as planned/unreleased and do not count toward scores.

Where Wave 1 sources cite cross-stack files in `governance/`, `integration/`, `regulatory/`, or `operational-templates/`, the merged document does not re-derive content. Wave 1 has already extracted the AEM-relevant material and paraphrased any references to adjacent governance frameworks to manifesto-equivalent terms. The merged document does not propagate adjacent-framework vocabulary or coverage claims.

Per-principle file scores are authoritative when divergent from agent 01's overview table (mirroring agent 06's rule). Loop-phase and DoD-condition scores are owned by agent 03; the maturity verdict is owned by agent 05a (surfaced by agent 05b). The composite score is recomputed from the authoritative per-principle scores using the canonical weighting; the recomputed value (31.5) is authoritative in the merged document's metadata block, and the divergence with agent 01's reported 25.4 is recorded in Source Integrity.

## Part 3 — Manifesto Principles

### P1 — Outcomes are the unit of work | **34/100**

#### What OpenSpec asserts about this principle

OpenSpec frames work as a five-step **artifact** flow `proposal → specs → design → tasks → implement` (`OpenSpec/docs/concepts.md:354–360`) that culminates in `/opsx:archive` merging delta specs into a source-of-truth `openspec/specs/` directory and moving the change folder under `changes/archive/<YYYY-MM-DD>-<name>/` (`OpenSpec/docs/concepts.md:635–688`). It states that "AI coding assistants are powerful but unpredictable when requirements live only in chat history. OpenSpec adds a lightweight spec layer so you agree on what to build before any code is written" (`OpenSpec/README.md:127–129`). The optional `/opsx:verify` command checks "Completeness, Correctness, Coherence" between artifacts and code, but explicitly "Does not block archive, but surfaces issues" and records "Warnings don't block archive but indicate potential issues" (`OpenSpec/docs/commands.md:336, 380`). Outcomes — deployment, observability, validated business value, learning — are not OpenSpec primitives; the lifecycle terminates at archive of the spec/task artifacts, not at a shipped, instrumented, validated change.

#### Seven-Condition DoD Test

1. **Evaluation reports with pass/fail and metrics** — Absent. OpenSpec's only verification primitive is `/opsx:verify` which produces narrative output ("Critical issues: 0 / Warnings: 2 / Ready to archive: Yes (with warnings)" — `OpenSpec/docs/commands.md:367–371`). There is no machine-readable evaluation report, no pass/fail contract coupled to specifications, and no metric schema. RFC 2119 SHALL/MUST keywords are described as "communicate intent" (`OpenSpec/docs/concepts.md:262–266`) but no executable assertion is generated from them.
2. **Trace IDs linking to the full decision chain** — Absent. No artefact in `OpenSpec/docs/concepts.md`, `commands.md`, `workflows.md`, or `opsx.md` mentions trace IDs, OpenTelemetry-compatible identifiers, or any per-action identifier. The change folder name (e.g., `add-dark-mode`) is the only correlation handle and it does not propagate into runtime execution.
3. **Diffs showing what changed** — Partially met. OpenSpec produces `MODIFIED Requirements` blocks in delta specs (`OpenSpec/docs/concepts.md:503–513`) and the archive process "merges deltas into specs" (`OpenSpec/docs/concepts.md:673–680`). The diff is at the specification level, not the deployed-code level; no `{diff_id, repo, base_ref, head_ref, files_changed_count, lines_added, lines_removed}` record per `governance/evidence-bundle-schema.md:63` is produced.
4. **Deployment IDs confirming what shipped** — Absent. The OpenSpec lifecycle terminates at `/opsx:archive`. The word "deploy" appears once in the surveyed corpus and only in the context of "Simpler rollback if needed" (`OpenSpec/docs/workflows.md:375`). There is no deployment artefact, no system-version capture, no deployed_at timestamp, no `deployed_by` field. Per `manifesto-done.md:18` "Shipped — deployed or delivered, not just merged"; OpenSpec stops at the spec-merge equivalent.
5. **Rollback plans confirming reversibility** — Absent except as advisory. The default `proposal` rule example includes "Include rollback plan" (`OpenSpec/docs/opsx.md:91–92`) as a project-config rule string injected into the AI's prompt. No rollback artefact schema, no `last_tested_at`, no `mean_rollback_time_seconds`, and no enforcement that the plan exists or has been tested. Convention, not enforcement.
6. **Policy check outputs confirming constraint compliance** — Absent. OpenSpec has no policy concept, no policy_id, no constraint engine, and no integration point for one. The closest analogue is RFC 2119 keywords inside spec prose, which are not machine-checked.
7. **Memory updates confirming what was learned** — Absent. OpenSpec preserves change folders in `changes/archive/<date>-<name>/` (`OpenSpec/docs/concepts.md:660–670`) but the manifesto's bar is a memory store with provenance (`manifesto-principles.md` P6). Archived markdown files are filesystem history, not learned memory with provenance labels per `governance/evidence-bundle-schema.md:67`.

**Hardening DoD additions (per `manifesto-done.md:88–198`):**

- **Security static analysis results (OWASP ASVS-calibrated)** — Absent. OpenSpec's verify dimensions are Completeness, Correctness, Coherence (`OpenSpec/docs/commands.md:340–344`); there is no security analysis hook, no ASVS reference, and no Critical/High findings register.
- **Bundle integrity attestation** — Absent. No cryptographic hash, no digital signature, no integrity record over the change folder. The archive folder is a plain directory move (`OpenSpec/docs/concepts.md:673–680`) which is mutable and unauthenticated.
- **Agentic provenance record** — Absent. The README acknowledges model dependence ("OpenSpec works best with high-reasoning models. We recommend Opus 4.5 and GPT 5.2" — `OpenSpec/README.md:160`) but no field captures the foundation model identifier, version, system-instruction hash, tool manifest, memory state version, retrieval corpus version, embedding model version, dataset lineage, or active policy constraints per the schema in `manifesto-done.md:158–186` and `governance/evidence-bundle-schema.md:69`. The optional contributor convention "PRs containing AI-generated code should mention the coding agent and model used (e.g., 'Generated with Claude Code using claude-opus-4-5-20251101')" (`OpenSpec/README.md:172`) is a free-text PR-description norm, not a machine-readable per-loop record.

#### What works

- **Specification-before-code is structurally enforced for the planning artefact.** `proposal → specs → design → tasks` is a dependency graph and `tasks` cannot be auto-generated without `specs` and `design` (`OpenSpec/docs/concepts.md:560–584`).
- **Delta specs encode change intent at requirement granularity.** `## ADDED Requirements`, `## MODIFIED Requirements`, `## REMOVED Requirements` (`OpenSpec/docs/concepts.md:486–518`) preserve a structured before/after at the spec layer, supporting partial credit on DoD condition 3.
- **Archive preserves planning history.** `/opsx:archive` moves the change folder to `changes/archive/<YYYY-MM-DD>-<name>/` with all artefacts intact (`OpenSpec/docs/concepts.md:660–680`), giving a date-anchored audit trail of *what was planned* (not what was deployed).
- **`/opsx:verify` exists as a coherence gate.** The command searches the codebase for implementation evidence and reports per-dimension findings (`OpenSpec/docs/commands.md:332–375`), a non-zero step toward verification even though it does not block archive.
- **Acceptance scenarios are written in a testable Given/When/Then form.** "Scenarios are the 'when' — they provide concrete examples that can be verified" (`OpenSpec/docs/concepts.md:257–260`).
- **Project-level rules can inject a rollback-plan requirement into proposals.** `rules.proposal: - Include rollback plan` (`OpenSpec/docs/opsx.md:90–93`) is a configurable convention prepended to the proposal artefact's instructions.

#### Where it fails the manifesto's bar

- "*If it is not deployed, instrumented, verified against evaluations, and validated against real-world outcomes, it is not done.*" (`manifesto-principles.md:79–80`). OpenSpec's lifecycle terminates at `/opsx:archive` which "merges delta specs into the main specs and preserves the change for history" (`OpenSpec/docs/concepts.md:635–637`). For Allianz, this is a Solvency II Article 121 model-validation gap.
- "*Evidence means: evaluation reports with pass/fail and metrics, trace IDs linking to the full decision chain, diffs showing what changed, deployment IDs confirming what shipped, rollback plans confirming reversibility, policy check outputs confirming constraint compliance, and memory updates confirming what was learned. Anything less is assertion, not evidence.*" (`manifesto-principles.md:73–77`). OpenSpec produces zero of these seven artefacts in machine-readable form. For Allianz under DORA Article 9, asserted readiness without evidence is a finding.
- "*Verification is the act of running evaluations to confirm the implementation matches the specification … It produces evidence — test reports, policy check outputs, trace IDs — that an agent's output satisfies the acceptance criteria.*" (`manifesto-principles.md:56–60`). OpenSpec's `/opsx:verify` is an advisory coherence check, not the running of versioned evaluations against the specification. EU AI Act Article 9 and Article 15 require executed conformity verification.
- "*Validation is the judgment that the specification itself was worth building. … Validation answers: did we build the right thing?*" (`manifesto-principles.md:61–65`). OpenSpec has no validation construct: nothing in `concepts.md`, `commands.md`, or `opsx.md` ties an archived change to a real-world business outcome.
- "*Independent validation … in regulated contexts, this must be performed by a party organizationally independent from the team that developed and verified the system.*" (`manifesto-principles.md:67–71`). OpenSpec defines no role separation; `/opsx:verify` runs in the same agent session that ran `/opsx:apply`. Solvency II Article 121(4) and SR 11-7 §V both require organisationally independent validation.
- "*Anything less is not done for the current phase … the bar rises with the stakes.*" (`manifesto-done.md:39–46`). OpenSpec produces a markdown archive folder, not an evidence bundle. None of the eleven `aem_components` fields specified in `governance/evidence-bundle-schema.md:55–76` is produced. *[Scope gap]*
- "*Bundle integrity attestation. The assembled evidence bundle must be integrity-protected before the release gate is assessed.*" (`manifesto-done.md:144–147`). OpenSpec's archive is a plain directory rename with no hash, no signature, and no tamper detection. Under DORA Article 5, this is a regulated-environment blocker.
- "*A change is done only when it is shipped, observable, verified, validated, and learned from.*" (`manifesto-principles.md:46–48`). OpenSpec terminates at "merged into specs". *[Scope gap]*

#### Allianz-specific implications

- **Solvency II Article 121(4) — Internal Model Validation.** OpenSpec produces no evidence bundle, no independent-validation record, and no organisationally separate sign-off. Allianz MUST extend OpenSpec with an evidence-bundle assembler that emits all eleven `aem_components` fields, and MUST attach an independent-validation gate before `/opsx:archive`.
- **EU AI Act Article 12 — Automatic Recording (logs) and Article 13 — Transparency.** OpenSpec records no per-loop trace ID, no foundation-model identifier, no system-instruction hash, no tool manifest, and no policy-constraint set. Allianz MUST ship an `agentic_provenance_record` generator alongside OpenSpec change archival or refuse to use OpenSpec for high-risk systems.
- **DORA Article 9 (ICT risk management) and Article 28 (third-party ICT risk).** OpenSpec's lifecycle ends at spec-merge with no deployment ID, no rollback test record, and no live observability hook. Allianz MUST integrate OpenSpec output into a release-governance pipeline that captures `deployment_ids`, `rollback_plan.last_tested_at`, and `evidence_freshness_attestation` before any production change.
- **EIOPA Opinion on AI Governance (2021) §3 — Proportionality and Fairness.** Allianz MUST add post-deployment validation telemetry (loss ratio drift, complaint rate, declination-rate distribution by protected attribute) before treating an OpenSpec archive as evidence of completion.
- **GDPR Article 35 — Data Protection Impact Assessment.** Allianz MUST require a DPIA artefact registered against the change folder before `/opsx:archive` for any data-touching change.

#### Score rationale

Score: **34/100** (Critical). Evidence-for: OpenSpec enforces specification-before-code via the proposal → specs → design → tasks dependency graph, preserves change history through dated archive folders, provides Given/When/Then scenarios that are structurally testable, and exposes an advisory `/opsx:verify` coherence check. Evidence-against: zero of the seven manifesto evidence components are produced in machine-readable form; the lifecycle terminates at spec-merge, not at deployed/instrumented/validated; `/opsx:verify` "Does not block archive" so verification is advisory rather than contractual; there is no validation construct, no independent-validation role, no deployment ID, no policy-check output, no rollback test record, no bundle integrity attestation, and no agentic provenance record per `manifesto-done.md:88–198`; for Allianz this fails Solvency II Article 121(4), EU AI Act Articles 9/12/13/15, DORA Articles 9/28, and EIOPA AI Governance Opinion (2021) on multiple distinct grounds.

### P2 — Specifications are living artifacts | **72/100**

#### What OpenSpec asserts about this principle

OpenSpec is positioned as a "spec framework" whose explicit purpose is to make specifications the artefact AI agents and humans agree on before code is written. `docs/concepts.md` states: "Specs describe your system's behavior using structured requirements and scenarios" and "Specs are the source of truth — they describe how your system currently behaves." The framework separates source-of-truth specs (`openspec/specs/`) from in-flight modifications (`openspec/changes/<change>/specs/`) and represents every change as a delta with `## ADDED Requirements`, `## MODIFIED Requirements`, `## REMOVED Requirements`, and `## RENAMED Requirements` sections (`schemas/spec-driven/schema.yaml`). The `openspec validate` command is documented in `docs/cli.md` and supports `--all --json` for bulk validation. Specs use RFC 2119 keywords (`MUST`, `SHALL`, `SHOULD`, `MAY`) and Given/When/Then scenarios (`docs/concepts.md` "Spec Format"). The framework's stated philosophy — `→ fluid not rigid`, `→ iterative not waterfall` — explicitly endorses the manifesto's "specifications are hypotheses that sharpen as agents explore" stance.

#### What works

- **Specifications are first-class versioned artefacts under git.** Every spec lives at a deterministic path (`openspec/specs/<domain>/spec.md`) and every proposed change is a folder under `openspec/changes/<change>/` with `proposal.md`, `design.md`, `tasks.md`, and delta specs.
- **Delta semantics are explicit and machine-parseable.** `docs/concepts.md` documents `ADDED Requirements`, `MODIFIED Requirements`, `REMOVED Requirements`, and `RENAMED Requirements` as the only operations a change can express; `schemas/spec-driven/schema.yaml` enforces this via the `specs` artefact instruction ("Use FROM:/TO: format" for renames; "MUST include full updated content" for modifications).
- **Validation is a CLI primitive callable by agents.** `docs/cli.md` lists `openspec validate`, `openspec validate --all --json`, and `openspec status` as JSON-output commands "designed for agent/script use".
- **Brownfield evolution is the default model, not an edge case.** `docs/concepts.md` "Brownfield-first" frames iteration on existing specs as the primary use case; the archive process merges deltas into the source-of-truth spec and moves the change folder to `changes/archive/<YYYY-MM-DD>-<change>/`.
- **The proposal/spec/design/tasks split keeps "what" separate from "how".** The schema explicitly tells agents: "Avoid in specs: internal class/function names, library or framework choices, step-by-step implementation details".
- **Re-iteration is the documented loop.** `docs/workflows.md` describes `/opsx:propose`, `/opsx:apply`, `/opsx:verify`, and `/opsx:archive` as a cycle in which the spec is updated when implementation reveals it was wrong.
- **Schema dependencies are declared, not hardcoded.** Teams can fork (`openspec schema fork`) and version their own workflow shape.

#### Where it fails the manifesto's bar

- The manifesto requires that "Requirements, constraints, and acceptance criteria must be versioned, reviewable, and machine-readable — because they drive agent behavior directly" (`manifesto-principles.md` §2). OpenSpec stores specs as Markdown with conventional `### Requirement:` and `#### Scenario:` headings but provides no JSON Schema, no requirement IDs, no acceptance-criterion identifiers, and no machine-resolvable link from a requirement to the evaluations or tests that verify it. For Allianz, this means a Solvency II model documentation requirement and an EU AI Act Art. 9 risk-control requirement are both "free-text headings under a Markdown convention" with no traceable identifier.
- The manifesto requires that specifications be "reviewed, and revised based on execution evidence" and that "If a specification cannot be versioned, reviewed, and revised based on execution evidence, it is a wish, not an engineering artifact" (`manifesto-principles.md` §2 minimum bar). OpenSpec provides no formal review gate, no signed approval, no reviewer identity capture. For Allianz under DORA Art. 6 and SR 11-7 §IV.A, absence of a captured reviewer identity is a control gap.
- The manifesto requires that "Specifications and architectural constraints operate at different layers and change at different speeds". OpenSpec does not distinguish a spec change from a constraint change. A delta that relaxes a `MUST` to a `SHOULD` is structurally indistinguishable from a delta that adds a new acceptance criterion. For Allianz, this means a constraint relaxation touching GDPR Art. 25 or EU AI Act Art. 15 would archive on the same gate as a UI scenario tweak.
- The manifesto requires four convergence stop conditions ("Acceptance criteria remain stable across three consecutive iterations"; "Scope is contracting, not expanding"; "Agent first-pass verification rate exceeds 80%"; "No new stop criteria emerge in the last iteration"). OpenSpec ships none of these as instrumented metrics.
- The manifesto requires that the spec be "machine-readable — because they drive agent behavior directly". OpenSpec's specs are Markdown with prose Given/When/Then; the `--json` flag returns JSON envelopes around the same Markdown body — it does not project requirements into a structured schema.
- The manifesto requires that specifications be "revised based on execution evidence". OpenSpec's archive process merges deltas based on "tasks complete" and an optional `/opsx:verify`; it does not require an evaluation report, a trace ID, or a policy-check output to be attached. For Allianz, this breaks the chain from a Solvency II Art. 121 model-change record back to the evidence that justified the change.

#### Allianz-specific implications

- **Solvency II Art. 121 and Art. 124.** Allianz MUST add a translation layer that exports each archived spec into the supervisory-prescribed format and binds the export to the archive commit hash, and MUST add a calibration section reviewable by the actuarial function before any spec touching SCR-relevant behaviour is archived.
- **DORA Art. 6 and Art. 9.** Allianz MUST wrap `/opsx:archive` with a controlled gate that captures reviewer DN, approval timestamp, and ICT-control classification, and refuses to merge deltas that touch DORA-scoped specs without that record.
- **EU AI Act Art. 9 and Art. 11 + Annex IV.** Allianz MUST maintain a fixed mapping `requirement-id → Annex IV section` and validate every archived change preserves Annex IV coverage.
- **SR 11-7 §IV.A and §V.** Allianz MUST configure a custom schema (`openspec schema fork`) that adds a `validation` artefact requiring sign-off by the model risk function organisationally separate from the model owner before `/opsx:archive` proceeds.
- **GDPR Art. 25 and Art. 35.** Allianz MUST add a constraint-classification step prior to archive: deltas that touch fields tagged as personal-data, consent, or retention MUST trigger a DPIA-refresh gate and MUST NOT archive without DPO acknowledgment recorded against the change folder.

#### Score rationale

Score: **72/100** (Low). Evidence-for: OpenSpec treats specifications as the agreed-upon contract between humans and agents, stores them under git as Markdown with explicit RFC 2119 keywords and Given/When/Then scenarios, separates source-of-truth specs from in-flight delta specs, enforces explicit `ADDED`/`MODIFIED`/`REMOVED`/`RENAMED` delta operations, exposes `openspec validate` and `openspec status` as JSON-callable agent surfaces, and archives every change with full proposal/design/tasks context preserved — an unusually strong substrate for the "living artefact" stance. Evidence-against: requirements have no stable identifiers and no schema beyond a Markdown-heading convention; specifications and constraints (P3 invariants) archive through the same path with no differentiated review gate; none of the four convergence stop conditions are instrumented; archive merges deltas without requiring evaluation reports, trace IDs, or policy-check outputs as evidence anchors; reviewer identity, approval timestamp, and independent-validation sign-off are absent; `/opsx:verify` conflates verification with validation; no captured mapping from a requirement to its evaluations exists, which weakens the link to P8 evaluations-as-contract that the manifesto treats as inseparable from P2.


### P3 — Architecture is defence-in-depth | **22/100**

#### What OpenSpec asserts about this principle

OpenSpec asserts that architecture is a *spec-before-code* convention layered on top of a markdown-driven proposal/spec/delta workflow. The README declares the philosophy as `"→ fluid not rigid"` and `"easy not complex"` (`OpenSpec/README.md` lines 28–34). `OpenSpec/docs/concepts.md` line 586 states `"Dependencies are enablers, not gates. They show what's possible to create, not what you must create next."`. The only architecture-adjacent control surface is markdown structural validation in `OpenSpec/src/core/validation/validator.ts` (459 lines, Zod-based) plus an opt-in `--strict` validation flag (`OpenSpec/docs/cli.md` line 434) and `openspec/specs/` versus `openspec/changes/` directory separation. OpenSpec does not assert any runtime policy enforcement, sandboxing, repository gating, type contract checking, lint integration, ownership map enforcement, or CI guardrails for the agents that generate or apply its artefacts.

#### Blast-Radius Test

##### 1. Single-agent failure — silent wrong output

A single coding agent driven by `/opsx:propose` or `/opsx:apply` (`OpenSpec/docs/commands.md` lines 320–488) produces a proposal, design, tasks, and delta specs that are syntactically valid markdown matching the `SpecSchema`/`ChangeSchema` Zod parsers in `OpenSpec/src/core/validation/validator.ts`, but semantically wrong (e.g., a 2FA delta whose scenario quietly removes idempotency guarantees, or a payments delta that re-classifies a major-model change as minor). Propagation path:

1. Agent writes `openspec/changes/<change>/proposal.md`, `design.md`, `tasks.md`, and delta `spec.md`. No human review is required by the tool — `OpenSpec/docs/commands.md` line 380 states `"Warnings don't block archive but indicate potential issues"` and line 488 states `"Archive won't block on incomplete tasks, but will warn"`.
2. `openspec validate` (default mode) checks structural shape only. `--strict` (opt-in) tightens markdown shape rules; it adds no runtime or domain enforcement.
3. `/opsx:archive` runs the same structural validator and merges `ADDED/MODIFIED/REMOVED` deltas into `openspec/specs/**/*.md`. Because deltas are the source of truth after merge, the wrong requirement now becomes ground-truth specification for all future changes.
4. Downstream coding agents reading `openspec/specs/` retrieve the corrupted requirement and propagate it. There is no second-layer check anywhere in OpenSpec that would catch the drift; the framework's scope ends at markdown.

Maximum blast radius: full-corpus, persistent, retroactive. The corrupted requirement contaminates every subsequent change because deltas merge without a defence-in-depth verification layer. For Allianz pricing, underwriting, claims, and Solvency II internal-model code, this is unbounded.

##### 2. Isolation mechanisms

| Mechanism | Enforcement | Failure class caught |
| --- | --- | --- |
| `openspec/specs/` vs `openspec/changes/` directory separation | Convention (filesystem layout) | Structural — prevents accidental edits to source-of-truth specs while a change is in flight; catches no semantic, ownership, or blast-radius failure |
| Zod-schema markdown validation in `OpenSpec/src/core/validation/validator.ts` | Runtime, but only when `openspec validate` is invoked | Structural — missing `## Purpose`, missing scenarios, malformed requirement headers |
| `--strict` validation flag | Opt-in, runtime only when explicitly passed | Structural — additional shape rules |
| Schema dependency DAG | Convention — `"Dependencies are enablers, not gates"` | None — the docs explicitly state these are not gates |
| `/opsx:verify` | Advisory, agent-driven; `"Does not block archive, but surfaces issues"` | Semantic gap-detection at advisory level — no enforcement |
| Archive merge step | Runtime, structural | Structural — applies deltas; performs no domain-ownership, blast-radius, or policy check |
| Telemetry | Runtime, anonymous command counts only | None — observational only |

No mechanism is enforced at the runtime where agent actions land (filesystem write, git commit, CI run, deployment). No mechanism inspects content semantics. No mechanism enforces domain ownership boundaries, repository gates, API rate limits, type contracts, lint rules, or data-access policies.

##### 3. Verdict

OpenSpec's architecture is defence-in-line, not defence-in-depth. The only layer is structural markdown validation. P3's minimum bar in `manifesto-principles.md` line 147–148 — `"If a boundary is described but not enforced at runtime with automated detection and recovery, it is not architecture — it is documentation."` — is not met. The manifesto's three-layer model — wrappers (P3) + verification (P8) + observability (P9) — collapses to a single advisory layer in OpenSpec. (See Part 12 for the AI/runtime guardrails detail.)

#### What works

- `OpenSpec/openspec/specs/` versus `openspec/changes/` directory separation (`OpenSpec/docs/concepts.md` lines 31–43) gives a single deterministic source of truth and an isolated change workspace.
- `OpenSpec/src/core/validation/validator.ts` (459 lines, Zod-based) provides machine-checkable structural validation for spec markdown — a real, enforced shape contract on the artefact.
- The delta-spec format is parseable by `OpenSpec/src/core/parsers/requirement-blocks.ts`, allowing automated diff inspection of proposed changes before merge.
- The `openspec validate --strict --all --concurrency 12` invocation is wireable into CI to enforce structural conformity at PR time.
- `/opsx:verify` advises on three dimensions of implementation-vs-spec drift — not enforcement, but a documented advisory check.
- The archive step writes to `openspec/changes/archive/<date>-<slug>/` preserving full proposal/design/tasks/delta artefacts as an immutable historical record under git.
- The `openspec/schemas/spec-driven/schema.yaml` artefact graph declares artefact dependencies machine-readably.

#### Where it fails the manifesto's bar

- `manifesto-principles.md` lines 130–132: `"Encode boundaries as machine-enforced policies: repository gates, type contracts, lint rules, domain ownership maps, CI checks."` — OpenSpec encodes zero of these. **Allianz exposure:** Solvency II Article 121 requires ownership and change governance enforced at policy level.
- `manifesto-principles.md` lines 134–137: `"Build deterministic infrastructure wrappers around your probabilistic AI."` — OpenSpec wraps no execution surface. **Allianz exposure:** DORA Articles 6 and 8.
- `manifesto-principles.md` lines 141–145: `"Deterministic wrappers catch structural failures … verification catches semantic errors (Principle 8), and observability catches behavioral drift (Principle 9). … All three must hold."` — OpenSpec provides only a partial structural layer. **Allianz exposure:** EU AI Act Article 9 and Article 15.
- `manifesto-principles.md` lines 147–148 (P3 minimum bar): `"If a boundary is described but not enforced at runtime with automated detection and recovery, it is not architecture — it is documentation."` — every OpenSpec boundary is documented; none is enforced at runtime with automated detection and recovery. **Allianz exposure:** SR 11-7 §IV.
- `manifesto-principles.md` lines 137–138: `"Expect the boundary to be tested. Design for what happens when it is crossed."` — OpenSpec specifies no recovery, kill-switch, rollback, or boundary-violation alert. **Allianz exposure:** DORA Article 11 and EU AI Act Article 15.
- `OpenSpec/docs/concepts.md` line 586: `"Dependencies are enablers, not gates."` — this directly contradicts P3's enforcement minimum bar. **Allianz exposure:** Solvency II Article 124 and EIOPA AI Guidelines 2021.
- `companion/principles.md` line 256: `"a concrete implementation of architecture as defense-in-depth"` describes the pattern manifesto-aligned frameworks must instantiate. OpenSpec is single-layer-by-design. **Allianz exposure:** GDPR Articles 22 and 25.

#### Allianz-specific implications

- **Solvency II Article 121 (statistical quality, calibration, validation standards) and Article 124 (documentation standards):** Allianz operating an OpenSpec-driven workflow on internal-model changes must layer Solvency II IMAP gates as external CI checks, model-ownership enforcement, and validator approval workflows that OpenSpec itself does not provide.
- **DORA Articles 6, 8, and 11:** Allianz must operate a DORA-classification layer outside OpenSpec that gates `/opsx:archive` on critical-function specs, blocks merges without an attached recovery plan, and routes critical-function changes through DORA Article 28 review when the agent is an external LLM.
- **EU AI Act Article 9, Article 15, and Annex III §5:** Allianz must augment with an independent runtime policy envelope, evaluation harness, and trace pipeline before deploying any OpenSpec-driven change to a high-risk system.
- **SR 11-7 §IV.A and §V:** Allianz must operate a model-risk-management layer outside OpenSpec that classifies each spec by §V tier, attaches the validator's organisational independence record, and prevents archive of material-model deltas without independent validation sign-off.
- **GDPR Article 22 and Article 25:** Allianz must extend `OpenSpec/openspec/schemas/` with a custom Article 25-aligned schema and refuse to archive deltas that mutate personal-data processing without DPIA evidence.

#### Score rationale

Score: **22/100** (Critical). Evidence-for: OpenSpec provides a structural enforcement layer for markdown shape via `OpenSpec/src/core/validation/validator.ts`, separates the source-of-truth `openspec/specs/` from in-flight `openspec/changes/`, preserves a delta-typed change format, exposes an opt-in `--strict` flag, and ships a parseable schema-dependency graph. Evidence-against: every architectural boundary is convention or advisory — `"Dependencies are enablers, not gates"`; `"Does not block archive, but surfaces issues"`; `"Warnings don't block archive but indicate potential issues"`; `"Archive won't block on incomplete tasks, but will warn"`. There is no repository gate, no type contract beyond markdown shape, no lint rule integration, no domain-ownership enforcement, no permission model, no rate limit, no data-access policy, no runtime trace, and no automated detection-and-recovery mechanism. P3's minimum bar requires runtime-enforced boundaries with automated detection and recovery; OpenSpec provides documentation. The blast-radius test confirms a single silent semantic error in an agent-authored delta propagates to source-of-truth specs with no second defensive layer. The framework is defence-in-line by explicit design choice, which is incompatible with P3's defence-in-depth requirement for Allianz's regulatory perimeter (Solvency II, DORA, EU AI Act, SR 11-7, GDPR). (See Part 12, §12.4 for the runtime guardrail architecture detail.)

### P4 — Right-size the swarm | **38/100**

#### What OpenSpec asserts about this principle

OpenSpec is a single-thread, single-agent spec scaffolding workflow — not a swarm coordination framework. `OpenSpec/README.md` describes the operating loop as `/opsx:propose ──► /opsx:apply ──► /opsx:sync ──► /opsx:archive`, executed by one assistant. `OpenSpec/docs/concepts.md` claims artefacts form a dependency graph (`proposal → specs → design → tasks → implement`) where "Dependencies are enablers, not gates" and where "Human + Agent Collaboration" is intended as a one-human / one-agent loop. `OpenSpec/docs/workflows.md` admits parallelism only at the change-folder level: "Multiple changes can exist simultaneously without conflicting", with `/opsx:bulk-archive` as the post-hoc reconciliation surface. The only explicit conflict-resolution machinery for parallel work is described in `OpenSpec/openspec-parallel-merge-plan.md`, which acknowledges: "The tooling cannot detect divergence between the change author's starting point and the live spec, so parallel development corrupts the source of truth without warning."

#### What works

- Single-commit-path enforcement at the spec level is the explicit design intent.
- Default-to-simplest-topology behaviour is structurally enforced. The expanded profile is opt-in via `openspec config profile`.
- Parallelism is bounded to the change-folder unit.
- Conflict detection at archive time is explicitly recognised as a gap and roadmapped in `OpenSpec/openspec-parallel-merge-plan.md` Phase 0 with hash-based fingerprinting, even if not yet shipped.
- Schema-driven artefact dependencies impose a deterministic ordering (`proposal → specs → design → tasks`).
- Verification is offered as a separate command in the expanded profile.

#### Where it fails the manifesto's bar

- "If shared state is not typed, versioned, and reconciled, the swarm is a mob." OpenSpec's shared state is markdown plus untyped folder conventions. `OpenSpec/openspec-parallel-merge-plan.md` admits: "Changes do not persist the requirement content they were authored against, so the archive step cannot tell if the live spec diverged." For Allianz under DORA Art. 9 and SR 11-7 §IV.A: silent loss of approved requirements is a model-governance integrity failure.
- "An orchestrator cannot delegate actions to specialist agents that exceed its own authorized autonomy tier." OpenSpec has no orchestrator concept, no tier model, and no propagation of authority across delegated calls. EU AI Act Art. 14 exposure if Allianz wires OpenSpec into a multi-agent stack.
- "Design conflict resolution, not just parallelism." `OpenSpec/openspec-parallel-merge-plan.md`: "The CLI never forces contributors to reconcile parallel updates." Under Solvency II Art. 121, Allianz cannot rely on "chronological order" to reconcile competing model documentation deltas.
- "structured disagreement, specialization, and reconciliation". OpenSpec instantiates exactly one role pair — human intent, agent drafter — with no adversarial specialisation. SR 11-7 §V.B: one drafter without an organisationally separate critic is non-compliant.
- "a swarm that only writes code while governance remains a separate human overlay is not a governed agentic system." EU AI Act Art. 9 requires governance work to be performed and logged.
- "The task requires adversarial specialization — roles whose objectives conflict and cannot be fully trusted from the same agent (e.g., implementation and independent security review)." OpenSpec collapses both roles into the same `/opsx:apply` execution. DORA Art. 6 requires independent challenge.
- "Choose the simplest topology that solves the problem and graduate to more complex coordination only when evidence shows it is needed." OpenSpec defaults correctly but provides no measurement substrate to detect when a single agent is insufficient.
- Versioned, reconciled shared state is named in `OpenSpec/openspec-parallel-merge-plan.md` Phase 3 as long-term roadmap, not current capability.

#### Allianz-specific implications

- **Solvency II Art. 121–124:** Allianz MUST gate OpenSpec adoption for any Solvency II model-scope artefact behind the Phase 0 fingerprint guard or refuse to use OpenSpec for that scope until fingerprinting ships and is verified.
- **DORA Art. 9 and Art. 6:** Allianz MUST add an external git-tag-and-hash attestation around `openspec archive` events for any artefact in DORA ICT scope and MUST log every `/opsx:bulk-archive` chronological-order resolution as a manual integrity decision.
- **EU AI Act Art. 14 and Annex III §5(b):** Allianz MUST forbid `/opsx:apply` from emitting code that touches a high-risk Annex III decision pathway without an independent human merge.
- **SR 11-7 §V.B and §IV.A:** Allianz MUST require a second, organisationally separate operator to invoke `/opsx:verify` on every change folder before `/opsx:archive`, and MUST record that operator's identity in `meta.json` for every Solvency II or SR 11-7 in-scope spec change.
- **GDPR Art. 22 and Art. 25:** Allianz MUST embed a separate DPO-aligned review step outside OpenSpec for any `proposal.md` or `design.md` that touches GDPR Art. 9 special categories.

#### Score rationale

Score: **38/100** (Critical). Evidence-for: OpenSpec defaults to a single-agent loop (the manifesto's preferred topology when no signal demands more); maintains a single commit path through the archive merge surface; bounds parallelism to change folders; and explicitly recognises the parallel-merge corruption failure in `OpenSpec/openspec-parallel-merge-plan.md`. Evidence-against: the manifesto P4 minimum bar "If shared state is not typed, versioned, and reconciled, the swarm is a mob" is failed at runtime; the tier-containment minimum bar is structurally absent; structured-disagreement specialisation is not instantiated; conflict resolution is post-hoc chronological; the evidence-driven graduation criterion is unactionable because no telemetry substrate exists. The score sits in the upper Critical band because the single-agent default is correct by P4 standards even though the supporting machinery for safe scaling is absent.


### P5 — Autonomy is a tiered budget | **38/100**

#### What OpenSpec asserts about this principle

OpenSpec asserts a human-and-AI co-authoring model in which AI assistants generate planning artefacts (`proposal.md`, `specs/`, `design.md`, `tasks.md`) and execute implementation tasks under human direction, but it does not assert a tiered autonomy model, a permission system, a policy envelope, or any machine-enforced authority gate. `OpenSpec/README.md` states "Agree before you build — human and AI align on specs before code gets written" and `OpenSpec/docs/concepts.md:Human + Agent Collaboration` describes the loop as "Human provides intent, context, and constraints" with the agent drafting and humans reviewing. The `/opsx:apply` command "works through tasks, checking them off as you go" without any tier classification, blast-radius assessment, kill-switch, or evidence-bundle gate. The `OpenSpec/openspec/config.yaml` rules block lists advisory items such as "Include rollback plan" — these are content prompts to the AI, not enforced constraints on agent action.

#### Tier Assessment

**What actions OpenSpec takes autonomously.** Within an OpenSpec session, the AI assistant autonomously: (a) generates `proposal.md`, `specs/**/*.md` deltas, `design.md`, and `tasks.md` from a one-line prompt via `/opsx:propose` or `/opsx:ff`; (b) edits files in the working tree during `/opsx:apply`; (c) re-orders, fast-forwards, or marks tasks complete with no in-tool confirmation step; (d) writes archive content into `openspec/changes/archive/` via `/opsx:archive`. Every autonomous edit lands in the local working copy where the user holds final commit authority — but OpenSpec itself imposes no per-step approval, no diff-review checkpoint, and no tool-call authorisation list.

**What requires human approval within OpenSpec's lifecycle.** Nothing inside OpenSpec is structurally gated. Human approval is implicit and external: the human reads the artefacts the AI produced, edits them in their editor if desired, and runs `git commit` themselves. The "Review-friendly. A change folder is easy to review" claim is a usability assertion; it is not an enforced gate that blocks `/opsx:apply` from proceeding without sign-off.

**What is never autonomous under OpenSpec's current design.** Production deployment, `git push`, schema migration, infrastructure mutation, and any action outside the working tree are out of scope for OpenSpec — `OpenSpec/docs/concepts.md` and `OpenSpec/docs/workflows.md` confine OpenSpec's surface to local artefact authoring and task execution. Schema customisation requires `openspec schema fork` which is a human CLI invocation. *[Scope gap]*

**Tier determination.** OpenSpec operates structurally at **Tier 1 (Observe)** for planning artefacts and at **Tier 2 (Branch) by convention only** for `/opsx:apply` when the user happens to be on a feature branch. The manifesto defines Tier 2 as "Agents write to isolated branches. Humans approve merges." OpenSpec does not enforce branch isolation, does not detect whether `/opsx:apply` is running on `main`, does not block edits to protected paths, and does not produce an evidence bundle to gate a merge approval. The Tier 2 claim is therefore nominal — the structural evidence places OpenSpec at Tier 1 with optional uncontrolled escalation to Tier 2 by user discretion.

**Oversight pattern.** OpenSpec instantiates **HITL asynchronous** for the artefact-authoring loop. The manifesto's P5 minimum bar for HOTL — "the irreversibility window for a HOTL-designated action class has not been measured and confirmed to exceed the sum of monitoring detection, notification, assessment, and intervention time" — is not met because OpenSpec measures no irreversibility window at all. The HOLL minimum bar fails because OpenSpec logs no per-action evidence record beyond the artefact filesystem state. OpenSpec does not instantiate HOTL, HOLL, or EDL.

**Tier 4 prerequisites (if claimed).** OpenSpec makes no Tier 4 claim and supports none. Against the four prerequisites:
- Machine-enforced policy envelope — **Absent**.
- Passing control evaluations — **Absent**.
- Instrumented governance observability — **Absent**.
- Active rubber-stamping detection — **Absent**.

**Phase × tier compatibility.** Per `manifesto-principles.md`, Tier 2 requires Phase 4. OpenSpec provides no verification gates beyond `openspec validate` which checks artefact structural conformance, not behavioural correctness. The maximum permissible tier per the phase × tier table is therefore **Tier 1 only for governed production work**.

**What prevents higher tiers.** To safely operate at Tier 2, OpenSpec would need to (i) enforce branch isolation as a structural precondition for `/opsx:apply`, (ii) emit an evidence bundle conforming to `manifesto-done.md` per change, and (iii) gate `/opsx:archive` on policy-check outputs. Tier 4 is structurally unreachable for OpenSpec because the framework is a planning + apply layer with no machine-enforced envelope and no governance observability surface.

#### What works

- The artefact dependency graph provides a structural progression where the AI cannot fast-forward to `/opsx:apply` until upstream artefacts exist, giving the human a natural read-checkpoint.
- `openspec validate` enforces artefact-schema conformance before `/opsx:archive`, a low-grade structural gate that catches malformed changes.
- `OpenSpec/docs/cli.md:Human vs Agent Commands` distinguishes which commands are "designed for human use" versus "agent/script use", supporting a HITL asynchronous review pattern.
- The `rules` injection mechanism lets a team write project-specific advisory rules surfaced to the AI in every artefact-generation prompt.
- `/opsx:archive` preserves the change folder under `openspec/changes/archive/`, providing a post-action audit trail.
- Schema customisation via `openspec schema fork` lets a regulated team add a `review` artefact that requires explicit content before `tasks` can be authored.

#### Where it fails the manifesto's bar

- "Grant permissions by risk tier, least privilege, and blast-radius limits". OpenSpec defines no risk tier for any change. Solvency II Art. 121(1) requires major-versus-minor classification before model change.
- "Tier 1 — Observe... Tier 2 — Branch... Blast radius: contained". OpenSpec's `/opsx:apply` writes directly to the user's working tree on whatever branch is checked out. No branch-isolation precondition. DORA Art. 9(2) requires approved processes for ICT change management.
- "If an agent can invoke tools that have not been explicitly authorized for its operating tier, the tier model is nominal." OpenSpec defines no tool manifest. EU AI Act Art. 14(4)(b).
- "If you cannot reconstruct an agent's reasoning at any tier, your autonomy model has failed." OpenSpec does not record per-action tool calls, decisions, or near-misses. Solvency II Art. 124.
- "Tier 4 is not Tier 3 with the human removed." OpenSpec implements none of the four Tier 4 prerequisites. EU AI Act Art. 14(4)(a).
- "Phase maturity is a prerequisite for autonomy tier." OpenSpec does not record team phase. EIOPA Opinion on AI Governance §3.4.
- "If the irreversibility window for a HOTL-designated action class has not been measured…" OpenSpec measures no irreversibility window. DORA Art. 11.
- Tool authorisation minimum bar combined with P4 tier-containment: OpenSpec runs inside the host AI assistant and inherits whatever tool authority that assistant holds. SR 11-7 §V.

#### Allianz-specific implications

- **Solvency II Art. 121:** Allianz must layer a change-classification artefact (via `openspec schema fork`) into every Solvency II model-scope change, with the classification recorded as a structured field that downstream automation can read and gate `/opsx:archive` on.
- **EU AI Act Art. 14(4)(a)–(e):** Allianz must wrap OpenSpec invocations with an external authorisation layer that records, per `/opsx:apply` invocation, the tier the action was authorised at and the named accountable person.
- **DORA Art. 9(2) and Art. 28(2):** Allianz must record every host-assistant invocation, the tool manifest active during the invocation, and the approval status of each tool against the Allianz-approved third-party register.
- **SR 11-7 §IV.A:** Allianz must capture, alongside each archived change, a structured authority record naming the developer, the model in scope, and the authority class.
- **GDPR Art. 22:** Allianz must define an Art. 22-relevant code path register and gate `/opsx:apply` against it via a fork of the spec-driven schema.

#### Score rationale

Score: **38/100** (Critical). Evidence-for: OpenSpec provides a structural artefact-dependency graph that creates natural read-checkpoints between planning and apply; `openspec validate` enforces artefact-schema conformance; the archive at `openspec/changes/archive/` preserves the as-authored content of each change; the schema-fork mechanism is an extensibility surface that a downstream team can use to inject a human-review artefact; the human-versus-agent CLI distinction supports a HITL asynchronous oversight pattern. Evidence-against: OpenSpec defines no risk-tier classification, no permission system, no tool authorisation list, no policy envelope, no per-action evidence record, no irreversibility-window measurement, no rubber-stamping detection, no governance observability, and no phase × tier compatibility check; the framework operates structurally at Tier 1 with uncontrolled convention-only escalation to Tier 2; none of the four Tier 4 prerequisites are addressed; the tier model required by P5 — and the EU AI Act Art. 14, DORA Art. 9, Solvency II Art. 121, SR 11-7 §IV.A, and GDPR Art. 22 obligations Allianz must meet — is absent from OpenSpec's enforced surface and must be supplied externally.

### P6 — Knowledge and memory are infrastructure | **38/100**

#### What OpenSpec asserts about this principle

OpenSpec asserts that the `openspec/specs/` tree is the project's "source of truth" for current behaviour, and that all evolution flows through delta artefacts that are reconciled into it. `docs/concepts.md` "Glossary" states: "**Source of truth** — The `openspec/specs/` directory, containing the current agreed-upon behavior". `openspec/specs/cli-archive/spec.md` Requirement: "Spec Updates Before Archiving" states "Before moving the change to archive, the command SHALL apply delta changes to main specs to reflect the deployed reality". `docs/concepts.md` "Why Archive Matters" claims the archive provides "Audit trail. The archive preserves the full context of every change". OpenSpec asserts nothing about *learned memory*: no source file in `OpenSpec/openspec/specs/` defines memory provenance, expiry, decay, rollback, domain scoping, agent-authorship labelling, or skill-artefact governance.

#### What works

- `openspec/specs/cli-archive/spec.md` Requirement: "Spec Updates Before Archiving" enforces that delta artefacts are applied to `openspec/specs/` before archival, giving knowledge a single, governed write path with clear ADDED/MODIFIED/REMOVED/RENAMED operations.
- `openspec/specs/cli-validate/spec.md` Requirement: "Bulk and filtered validation" provides `openspec validate --all --strict --json` which fails CI on malformed knowledge artefacts.
- `docs/concepts.md` "Delta Sections" formalises that knowledge mutates only through typed delta operations, leaving a typed, reviewable trail in the change folder.
- `docs/concepts.md` "Archive Process" preserves the originating proposal, design, tasks, and deltas in `changes/archive/` with a date prefix.
- `openspec/specs/specs-sync-skill/spec.md` Requirement: "Specs Sync Skill" Scenario "Idempotent operation" guarantees repeated syncs produce identical results.
- `openspec/specs/context-injection/spec.md` and `openspec/specs/rules-injection/spec.md` allow project-level context and per-artefact rules to be versioned in `openspec/config.yaml` and injected deterministically.

#### Where it fails the manifesto's bar

- "**Learned memory** is heuristic: reasoning patterns, incident learnings, routing preferences, and reusable skills." OpenSpec has no learned-memory construct at all. Under EU AI Act Art. 9 Allianz cannot demonstrate continuous-renewal evidence for any agent that learns from claims-history feedback loops.
- "if it changes through governed processes (pull requests, ADR reviews, schema migrations), it is knowledge. If it changes through feedback loops (agent learning, incident adaptation, routing optimization), it is learned memory." OpenSpec's `cli-archive/spec.md` governs only the knowledge path; no artefact distinguishes feedback-loop-driven mutations from PR-driven ones. Solvency II Art. 121.
- "If memory cannot expire, be rolled back, or show provenance, it is not memory — it is a liability." OpenSpec provides no expiry, no rollback, and no provenance mechanism for any agent state beyond Markdown specs. DORA Art. 12.
- "Provenance, expiration, compression, rollback, and domain scoping are the mechanisms of that renewal cycle." None of these five mechanisms appears as a Requirement. EU AI Act Art. 10.
- "if memory is not revalidated against current architecture and process before reuse, it is not being governed — it is being trusted." `opsx-verify-skill/spec.md` "Coherence Verification" verifies coherence of *new* artefacts within a single change but does not revalidate previously archived knowledge. SR 11-7 §V.B.
- "**Knowledge contamination** — agent-generated content enters the knowledge base through governed processes". OpenSpec mandates no agent-authorship label on archived specs. EU AI Act Art. 13 and GDPR Art. 22.
- "**Memory poisoning** — an agent writes incorrect learnings that corrupt future agent behavior across sessions." OpenSpec provides no memory-write gate. `cli-archive/spec.md` Scenario "Force archive without validation" explicitly permits `openspec archive change-name --no-validate`. DORA Art. 9.
- "**Audit trail gap** — 'what version of memory was active when this decision was made?' requires point-in-time snapshots". Knowledge is snapshotted; memory is not. DORA Art. 17.
- "Agents can externalize procedures as reusable skill artifacts that evolve through experience without changing model weights." OpenSpec ships agent *skills* as static, repository-versioned Markdown — none defines a runtime evolution path. ISO/IEC 42001 clause A.3.2.

#### Allianz-specific implications

- **Solvency II Art. 121 and Art. 124:** Allianz MUST extend `openspec/specs/cli-archive/spec.md` (or add a sibling spec) to require that archived changes capture an `agentic_provenance` block — foundation model identifier, system-instruction hash, retrieval-corpus version, embedding-model version — for every change touching an internal-model-scope agent.
- **EU AI Act Art. 10 and Art. 12:** Allianz MUST add a mandatory `agent_authored: true | false` plus `model_identifier` field to every `### Requirement:` block produced through `/opsx:propose` for any agent in EU AI Act Annex III §5 scope, and enforce it via `cli-validate/spec.md` strict mode.
- **DORA Art. 12:** Allianz MUST specify and implement an inverse-archive operation that restores `openspec/specs/` to a prior `changes/archive/<date-prefix>` state and that captures the operator and reason in the archive itself.
- **GDPR Art. 9 and Art. 22:** Allianz MUST refuse `openspec archive` for any change touching health- or genetic-data processing flows unless every agent-authored requirement carries a provenance label and a human reviewer's structured sign-off captured in the archived change folder.
- **ISO/IEC 42001 A.3.2 and SR 11-7 §III.A:** Allianz MUST add a complementary `memory-governance/` spec set that names the four authorities (write, read, expire, rollback) per agent and that is enforced as a precondition to operating any agent above Tier 1.

#### Score rationale

Score: **38/100** (Critical). Evidence-for: OpenSpec's knowledge half is well-engineered — `cli-archive/spec.md` Requirement: "Spec Updates Before Archiving" funnels all knowledge mutations through typed delta operations defined in `specs-sync-skill/spec.md`; `cli-validate/spec.md` provides CI-grade structural validation; `docs/concepts.md` "The Archive Process" preserves point-in-time knowledge snapshots; `specs-sync-skill/spec.md` Scenario "Idempotent operation" guarantees consistency under repeated syncs; and `context-injection/spec.md` plus `rules-injection/spec.md` treat prompt-context as versioned configuration. Evidence-against: the learned-memory half is structurally absent — no source file defines a memory store, decay schedule, expiry, rollback, domain-scoped namespacing, agent-authorship provenance label, point-in-time memory snapshot, or skill-evolution governance; `cli-archive/spec.md` Scenario "Force archive without validation" explicitly permits `--no-validate` archives; `/opsx:verify` is non-blocking; and there is no inverse-archive operation, so the manifesto's minimum-bar trio of expire/rollback/provenance is unmet for everything except `openspec/specs/` Markdown itself. The knowledge governance lifts the score above the lowest band; the absent memory infrastructure prevents it from rising into Adequate territory.


### P7 — Context is engineered like code | **40/100**

#### What OpenSpec asserts about this principle

OpenSpec asserts that project context is a structured, versionable input to agent instructions. The `openspec/config.yaml` file carries a `context` string and a per-artifact `rules` map. The `context-injection` capability states that "the system SHALL inject the context field from project config into instructions for all artifacts, wrapped in XML-style `<context>` tags" and that "the system SHALL inject context content without modification, escaping, or interpretation". The `rules-injection` capability prescribes deterministic ordering — "order is `<context>` then `<rules>` then `<template>`". The `config-loading` capability enforces a 50KB context-size limit, Zod schema validation, and field-by-field resilient parsing. The `instruction-loader` capability enriches per-artifact instructions with change-specific dependency status. There is no retrieval engine, no embedding store, no rolling summary, no authority-weighted pruning, and no benchmarking of context-window usage.

#### What works

- `config-loading/spec.md` Requirement: "Enforce context size limit" caps the project context string at 50KB and rejects with a logged warning when "context of 51KB" is supplied — a concrete, machine-enforced context-budget bound.
- `context-injection/spec.md` Requirement: "Format context with XML-style tags" mandates the exact byte sequence `<context>\n{content}\n</context>\n\n` and Requirement: "Context appears before template" fixes the structural placement.
- `rules-injection/spec.md` Requirement: "Validate artifact IDs during instruction loading" emits warnings for unknown artifact IDs.
- `config-loading/spec.md` Requirement: "Use resilient field-by-field parsing" performs Zod-schema validation per field.
- `schema-resolution/spec.md` Requirement: "Project-local schema resolution" defines a precedence order CLI flag → change metadata → project config → built-in default.
- `instruction-loader/spec.md` Requirement: "Template Enrichment" adds change-specific dependency status.
- Context, rules, and templates live in `git`-tracked Markdown/YAML, so context history is reviewable in the same diff workflow as code changes.
- `rules-injection/spec.md` Requirement: "Rules are additive to schema guidance" prevents silent override of built-in artifact instruction by config rules.

#### Where it fails the manifesto's bar

- "Context is a first-class dependency, engineered with the same rigor as code: versioned, tested, and performance-benchmarked". OpenSpec versions context but has no tested or performance-benchmarked context infrastructure. DORA Art. 6(2).
- "If retrieval takes longer than the reasoning loop tolerates, context is broken infrastructure". OpenSpec has no retrieval engine and no retrieval-time instrumentation. EU AI Act Art. 15.
- "Stale embeddings, conflicting sources, semantic precision failures, poisoned retrieval artifacts, and authority-weighting errors". OpenSpec has zero defences against any of these five failure modes. SR 11-7 §IV.A.
- "Context quality and code quality are coupled — both must be verified, not just timed". `cli-validate/spec.md` verifies Markdown shape only. Solvency II Art. 121.
- "Engineer explicit context budgeting: hierarchical retrieval, rolling summaries, state compaction, and authority-weighted pruning". OpenSpec implements one bound — the 50KB cap — and provides no hierarchical retrieval, rolling summaries, state compaction, or authority-weighted pruning. EU AI Act Art. 13.
- "Context retrieval must be fast enough to sustain the reasoning loop". OpenSpec has no SLO for context retrieval. DORA Art. 11.
- "If the knowledge store is polluted with bad embeddings or stale data, the agent hallucinates". OpenSpec has no detector for stale `openspec/specs/<id>/spec.md` content. GDPR Art. 5(1)(d) and EU AI Act Art. 10.
- "Authority-weighted pruning". A contradictory rule and context line are both passed to the agent unchanged. SR 11-7 §V.

#### Allianz-specific implications

- **DORA Art. 6(2), Art. 11:** Allianz MUST add an out-of-band context-quality test harness (staleness scan, conflict scan) and an instrumented retrieval-latency SLO before approving OpenSpec for any DORA-scoped ICT system.
- **EU AI Act Art. 10, Art. 13, Art. 15:** OpenSpec context payloads MUST be wrapped with a provenance record (source URI, retrieval timestamp, embedding/model version, integrity hash) before they are eligible to feed an agent decision.
- **Solvency II Art. 121, Art. 124:** Allianz MUST gate any OpenSpec usage in actuarial pipelines behind an external data-quality wrapper enforcing Solvency II Art. 121 inputs and Art. 124 backtesting on context provenance.
- **SR 11-7 §IV.A, §V:** Conflicting policy in `<rules>` and supporting context in `<context>` MUST be resolved by a precedence layer (organisation policy > business-unit policy > project context) implemented outside OpenSpec.
- **GDPR Art. 5(1)(d), Art. 25:** Allianz MUST forbid personal data in OpenSpec context fields by repository hook and add a static-analysis check on `openspec/config.yaml` and `openspec/specs/<id>/spec.md` before commit.

#### Score rationale

Score: **40/100** (High). Evidence-for: OpenSpec versions context as `git`-tracked YAML and Markdown, enforces deterministic XML-bracketed injection, caps payload size at 50KB with a machine-enforced bound, validates the configuration shape with Zod, and warns on unknown artifact IDs in rules; this satisfies the "versioned" half of the minimum bar at the configuration layer. Evidence-against: OpenSpec implements none of the five quality failure modes the minimum bar names — staleness, conflicting sources, semantic precision, poisoning, authority weighting — and has no retrieval engine, no embedding store, no benchmarked retrieval-time SLO, no rolling summary, no state compaction, no hierarchical retrieval, no authority-weighted pruning, no test suite for context, and no provenance metadata on injected payloads. Verbatim, unscored, additive injection of `<context>` and `<rules>` is incompatible with SR 11-7 §V effective-challenge precedence and Solvency II Art. 121 statistical-quality controls; under EU AI Act Art. 13 and DORA Art. 6(2) the unscored payload would not constitute sufficient deployer information for a high-risk Allianz system. The score lands at the lower edge of the High band because structural rigor at the configuration layer is real and machine-checked, but the testable, benchmarked, quality-controlled context-as-code substance the manifesto requires is structurally absent.

### P8 — Evaluations are the contract | **34/100**

#### What OpenSpec asserts about this principle

OpenSpec asserts that specifications are "behavior contracts" expressed as `### Requirement:` blocks containing `#### Scenario:` blocks in Given/When/Then form, and that the `/opsx:verify` skill checks "Completeness, Correctness, and Coherence" of an implementation against the change's artefacts. The framework states that "scenarios are the 'when' — they provide concrete examples that can be verified" (`docs/concepts.md`) and provides `openspec validate` which performs *structural* schema validation of spec/change Markdown. The verify skill explicitly notes "Scenario coverage check" produces a warning such as "Scenario 'System preference detection' has no test coverage" (`docs/commands.md` lines 350–376), confirming that authoring tests is left to the implementer and that warnings "don't block archive".

#### Seven-Condition DoD Test (Evaluation Edition)

1. **Evaluations versioned and coupled to specifications.** *Partially met.* `#### Scenario:` blocks live alongside `### Requirement:` blocks in `openspec/specs/<id>/spec.md` and delta scenarios travel inside the change folder. However scenarios are prose, not executable evaluations; nothing binds a scenario to an automated test asset, fixture, or CI assertion.
2. **Coverage of happy path, adversarial cases, and regression scenarios.** *Absent.* The framework's only coverage construct is the prose "Scenario coverage check". No source file requires adversarial categories, regression suites, or red-team scenarios.
3. **Evaluations evolve with the system — spec changes trigger evaluation changes.** *Partially met.* The delta-archive flow merges `## ADDED Requirements`, `## MODIFIED Requirements`, and `## REMOVED Requirements` into the source-of-truth spec. There is no mechanism that re-runs or re-validates *executable* evaluations on spec change.
4. **Governance evaluations — evidence bundle completeness, provenance consistency, rollback procedure currency, SBOM completeness.** *Absent.* `openspec validate --all` checks Markdown structure. The `aem_components` schema in `governance/evidence-bundle-schema.md` has no counterpart artefact in OpenSpec.
5. **Verification (did we build it right?) separated from validation (did we build the right thing?).** *Absent.* `/opsx:verify` folds three concerns into a single agent-run skill executed by the same author/agent that produced the implementation.
6. **Independent validation — organisationally separate, capable of blocking production deployment.** *Absent.* `/opsx:verify` produces output that "Does not block archive, but surfaces issues" (`docs/commands.md` line 336).
7. **Governance evaluation failures trigger the same remediation sub-cycle as product failures.** *Absent.* OpenSpec has no governance evaluation suite.

#### What works

- `cli-validate/spec.md` defines machine-checkable structural validation that emits a stable JSON shape `{ items[], summary, version }`, giving CI a non-zero exit on malformed specs.
- `opsx-verify-skill/spec.md` Requirement: "Completeness Verification" mandates that the agent reads `tasks.md` and "counts tasks marked `- [x]` (complete) vs `- [ ]`" and "extracts all requirements from delta specs" then "searches codebase for implementation of each requirement", which is a lightweight requirement-to-code traceability check.
- `docs/concepts.md` "Spec Format" enforces the `### Requirement:` / `#### Scenario:` Given/When/Then structure with RFC 2119 keywords, and the validator detects misformatted scenarios.
- The delta model ties scenario edits to `## ADDED Requirements` / `## MODIFIED Requirements` / `## REMOVED Requirements` blocks, so scenario evolution is auditable in change folders before archive.
- `cli-validate/spec.md` Requirement "Invalid results SHALL include a Next steps footer" gives reviewers actionable remediation guidance.
- `opsx-verify-skill/spec.md` Requirement: "Verification Report Format" prescribes a CRITICAL/WARNING/SUGGESTION priority scheme with "specific, actionable fix recommendation" and explicitly bans vague language in review output.

#### Where it fails the manifesto's bar

- "Evaluations define what 'correct' means in terms the system can check autonomously". OpenSpec scenarios are Markdown prose interpreted by an agent, not executable evaluations. DORA Art. 6(2).
- "If evaluations do not include regression cases, verification is incomplete". No file requires regression scenarios, regression suites, or a regression catalogue. Solvency II Art. 124.
- "Passing evaluations satisfies verification. It does not satisfy validation or independent validation". `/opsx:verify` collapses verification, validation, and coherence into one agent-run check. EU AI Act Art. 17.
- "Independent validation must be capable of blocking production deployment." `/opsx:verify` "Does not block archive". Solvency II Art. 48 and SR 11-7 §V.
- "Evaluations must also test whether the governance system works — not only whether the product works". OpenSpec has no governance evaluation suite. DORA Art. 16.
- "Every change must be verified against the evaluation suite — and every change must preserve or improve evaluation performance". `cli-archive/spec.md` does not condition archival on any evaluation pass-rate metric. EU AI Act Art. 15.
- "Evaluations are the machine-readable form of the acceptance criteria in Principle 2". Scenarios are not machine-readable acceptance criteria — they are natural-language prose. Solvency II Art. 121.
- "When governance evaluations fail, they trigger the same remediation sub-cycle as product evaluation failures". OpenSpec has neither a governance evaluation construct nor a remediation sub-cycle linkage. DORA Art. 17.

#### Allianz-specific implications

- **Solvency II Art. 121 and Art. 124:** Allianz MUST add an organisationally separate validator role with a blocking gate enforced outside the OpenSpec archive flow before any internal-model agent change proceeds to production.
- **EU AI Act Art. 9 and Art. 15:** Allianz MUST bind every `#### Scenario:` to an executable test artefact in CI and refuse archive when regression coverage decreases.
- **DORA Art. 24–26 and Art. 16:** Allianz MUST add a mandatory `## Adversarial Scenarios` section to delta specs for any agent system in DORA scope and wire it to a TLPT-equivalent harness that blocks `openspec archive`.
- **GDPR Art. 22 and Art. 35:** Allianz MUST extend the scenario catalogue to include fairness categories with disparity-metric thresholds and refuse `openspec archive` when thresholds are breached.
- **SR 11-7 §V and Solvency II Art. 48:** Allianz MUST insert a second-line actuarial validation gate that consumes OpenSpec's structured JSON output and is the sole authority over deployment for Solvency II internal-model agents.

#### Score rationale

Score: **34/100** (Critical). Evidence-for: OpenSpec ships a structural validator with strict-mode JSON output that is CI-consumable; the `### Requirement:` / `#### Scenario:` Given/When/Then format with RFC 2119 keywords provides a disciplined acceptance-criterion shape; the delta model versions scenario evolution alongside specs; and `/opsx:verify` defines a three-dimension review (completeness, correctness, coherence) with a CRITICAL/WARNING/SUGGESTION report and an explicit ban on vague language. Evidence-against: scenarios are prose, not executable evaluations; no command in OpenSpec source binds a scenario to an automated test, regression catalogue, or adversarial harness; coverage is advisory ("Does not block archive"); verification, validation, and independent validation are collapsed into one agent-run skill; governance evaluations have no counterpart artefact; archive does not gate on regression non-decrease or evaluation pass rate; and there is no organisationally separate, blocking validator. The aggregate result is a structural-only evaluation regime that fails Solvency II Art. 121/124, EU AI Act Art. 9/15/17, DORA Art. 16/24, and SR 11-7 §V for Allianz's regulated agent use cases.

### P9 — Observability covers reasoning | **18/100**

#### What OpenSpec asserts about this principle

OpenSpec asserts that the change archive functions as the audit surface: "The archive preserves the full context of every change — not just what changed, but the proposal explaining why, the design explaining how, and the tasks showing the work done." (`docs/concepts.md` line 685). Runtime telemetry is defined exclusively in `openspec/specs/telemetry/spec.md`, whose "Command execution tracking" requirement states that the system "SHALL send a `command_executed` event to PostHog when any CLI command executes, including only the command name and OpenSpec version as properties" and whose "Privacy-preserving event design" requirement states the system "SHALL NOT include command arguments, file paths, project names, spec content, error messages, or IP addresses in telemetry events". OpenSpec defines no agent reasoning trace, no tool-call log, no decision-chain artefact, and no governance-state instrumentation.

#### Does OpenSpec's observability cover reasoning or only execution?

**Short answer: neither in the manifesto's sense — OpenSpec instruments only CLI command-name occurrences and a Markdown change archive; it does not instrument agent reasoning, agent execution, or governance state.**

What OpenSpec logs and instruments:

- **PostHog `command_executed` events.** The event payload is exactly `{ command, version }` plus an anonymous UUID. Arguments, file paths, project names, spec content, and error messages are explicitly excluded by the "Privacy-preserving event design" requirement.
- **The Markdown change archive.** Preserves `proposal.md`, `design.md`, `tasks.md`, and the delta-spec files of each completed change. This is a human-authored narrative of *why* a *change to a specification* was made; it is not a record of *why an agent took a runtime action*.
- **Verification reports from `/opsx:verify`.** Produces "CRITICAL / WARNING / SUGGESTION" output. Reports are produced on demand and not stored as a trace artefact.
- **`openspec validate --json`.** Returns `{ items[], summary, version }` describing structural conformance only.

What the manifesto's P9 minimum bar requires for reasoning-level observability and what OpenSpec lacks:

- The minimum bar states "*If you cannot answer 'why did this happen' from traces alone, you are not instrumented*". OpenSpec's PostHog event explicitly excludes everything that would let a reader answer "why".
- P9 demands instrumentation of "decisions, tool calls, policy violations, memory retrievals, cost per task, and near-misses". No file defines any of these constructs.

The AEM execution trace described in `governance/integrated-audit-trail.md` is **not producible** from OpenSpec's output:

- **Trace IDs spanning spec → design → plan → execute → verify → validate → observe → learn → govern** — Absent.
- **Per-action tool calls, decisions, evaluation results, rollbacks, near-misses** — Absent.
- **OpenTelemetry-compatible identifiers** — Absent. PostHog with `flushAt: 1` is the only export.
- **Replayable from trace ID + agentic provenance record + tool manifest + composite state** — Absent.

Governance-state observability (the second minimum-bar paragraph in P9) is **not instrumented**:

- "Stale evidence in active bundles surfaced without manual audit using the freshness rules" — Absent.
- "Controls in failed/waived state with no recorded resolution timeline or expiry" — Absent.
- "Accountability ownership gaps — active production components with no named, current owner" — Absent.
- "Rubber-stamping patterns — review-time distribution anomalies and approval-without-trace events" — Absent.
- "Model, prompt, or tool manifest changes that have not triggered an evaluation re-run" — Absent.

The specific gap between what OpenSpec records and what a "why did this happen" query requires is total at the runtime layer.

#### What works

- `docs/concepts.md` "Why Archive Matters" preserves a per-change Markdown audit narrative — `proposal.md` (why), `design.md` (how), `tasks.md` (steps), and the delta-spec files — co-located in `changes/archive/<id>/`.
- `cli-archive/spec.md` Requirement: "Pre-archive validation" enforces structural validation of the change before archive.
- `telemetry/spec.md` Requirement: "Anonymous user identification" generates a stable UUID stored in global config so repeated `command_executed` events from the same workstation are linkable.
- `opsx-verify-skill/spec.md` Requirement: "Verification Report Format" prescribes a CRITICAL/WARNING/SUGGESTION priority scheme.
- `cli-validate/spec.md` Requirement: "JSON output schema for bulk validation" emits a stable shape consumable by external CI dashboards.
- `cli-feedback/spec.md` Requirement: "Issue metadata" attaches OpenSpec CLI version, platform, and submission timestamp to each feedback issue.

#### Where it fails the manifesto's bar

- "*If you cannot answer 'why did this happen' from traces alone, you are not instrumented.*" The archive answers "why was this *change* proposed", not "why did the *agent* act". EU AI Act Art. 12 and Art. 13.
- "Instrument decisions, tool calls, policy violations, memory retrievals, cost per task, and near-misses". DORA Art. 11(1) and Art. 12.
- "Every agent action must produce an inspectable trace: diffs, tool calls, decision chains, evaluation results, rollbacks." Solvency II Art. 121.
- "Traces are not logging. Logging records events. Traces reconstruct reasoning". SR 11-7 §IV.A.
- "*If tools cannot be swapped or replayed across runtimes without rewriting core workflows, the platform is brittle.*" There is no OpenTelemetry span, no W3C Trace Context, and no OTLP exporter. DORA Art. 6(8).
- "Stale artefacts in active evidence bundles, surfaced without manual audit using the freshness rules". OpenSpec has no evidence-bundle construct. EU AI Act Art. 9 and Art. 17.
- "Accountability ownership gaps" and "rubber-stamping patterns". Solvency II Art. 41 and Art. 48.
- "Model, prompt, or tool manifest changes that have not triggered an evaluation re-run". EU AI Act Art. 15.

#### Allianz-specific implications

- **EU AI Act Art. 12 and Art. 13:** Allianz MUST replace OpenSpec's telemetry layer with an OpenTelemetry-instrumented agent runtime that records per-action tool calls, retrievals, and decisions to an immutable log store before any underwriting or claims-handling agent enters Allianz production.
- **DORA Art. 9 and Art. 10:** Allianz MUST instrument every DORA-scope agent with synchronous OpenTelemetry spans exporting to the institutional SOC and wire MTTD ≤ 4 hours into a blocking gate outside the OpenSpec archive flow.
- **Solvency II Art. 121 and Art. 124:** Allianz MUST add an action-level audit-trail layer that captures `trace_ids`, tool calls, evaluation results, rollbacks, and near-misses for every Solvency II internal-model agent action.
- **GDPR Art. 22 and Art. 5(2):** Allianz MUST persist the full reasoning trace (claim citations, prompt-and-model hash, decision rationale) for every special-category-data decision and respond within 30 days of request per GDPR Art. 12.
- **DORA Art. 17 and EU AI Act Art. 73:** Allianz MUST stand up a separate runtime trace store (OpenTelemetry-compatible) for every Allianz agent product before relying on OpenSpec for any change-management role on those products.

#### Score rationale

Score: **18/100** (Critical). Evidence-for: OpenSpec preserves a structured Markdown audit narrative per change in `changes/archive/` with proposal/design/tasks/delta artefacts; `cli-validate/spec.md` provides a CI-consumable validation feed; `opsx-verify-skill/spec.md` yields a structured CRITICAL/WARNING/SUGGESTION report; `telemetry/spec.md` gives a minimal stable join key for command-execution counts. Evidence-against: OpenSpec does not instrument agent reasoning at all — `telemetry/spec.md` "Privacy-preserving event design" actively forbids transmitting arguments, file paths, project names, spec content, or error messages, leaving the command name and version as the entire runtime payload; there is no decision log, no tool-call log, no policy-violation feed, no memory-retrieval trace, no cost counter, and no near-miss register; there is no `trace_id` construct linking spec → design → execute → validate → observe; there is no OpenTelemetry, W3C Trace Context, or OTLP integration; none of the governance-state signals are instrumented. The aggregate result is a framework whose observability covers neither reasoning nor execution in the manifesto's sense, and lands in the Critical band.


### P10 — Assume emergence, engineer containment | **12/100**

#### What OpenSpec asserts about this principle

OpenSpec asserts nothing about containment, emergence, security, threat modelling, rate limiting, circuit breakers, or chaos testing. The framework's stated philosophy in `README.md` is "fluid not rigid / iterative not waterfall / easy not complex / built for brownfield not just greenfield / scalable from personal projects to enterprises". The only security-adjacent artefact in the corpus is `openspec/specs/telemetry/spec.md`, which prescribes anonymous PostHog usage telemetry with `OPENSPEC_TELEMETRY=0` / `DO_NOT_TRACK=1` opt-out. No file in `OpenSpec/openspec/specs/`, `OpenSpec/docs/`, `OpenSpec/AGENTS.md`, or `OpenSpec/README.md` defines guardrails, rate limits, circuit breakers, safe fallbacks, prompt-injection mitigation, egress controls, tool-manifest signing, sandboxing, agent identity, or anomaly detection.

#### What works

- `telemetry/spec.md` Requirement "Anonymous data collection" enforces data minimisation on the framework's only outbound channel.
- `telemetry/spec.md` Requirement "CI environment auto-disable" forces telemetry off when `CI=true`.
- `cli-validate/spec.md` provides a non-zero exit on malformed spec/change Markdown via `openspec validate --all --strict --json`.
- `cli-archive/spec.md` defines an archive-time merge that requires the change folder to be syntactically well-formed before deltas are folded into the source-of-truth `openspec/specs/`.
- `context-injection/spec.md` and `rules-injection/spec.md` wrap injected text in `<context>...</context>` and `<rules>...</rules>` tags, giving a syntactic delimiter between framework-supplied text and user prompts.
- `legacy-cleanup/spec.md` and `docs/migration-guide.md` preserve user-authored `openspec/project.md` rather than deleting it, reducing the blast radius of an `openspec update` run.

#### Where it fails the manifesto's bar

- "Build guardrails, rate limits, circuit breakers, and safe fallbacks before you need them." OpenSpec defines none of these. EU AI Act Art. 15(4) and DORA Art. 9(2).
- "If you have not threat-modeled prompt injection, privilege escalation, and exfiltration vectors for your specific agent topology, you are not security-tested." `OpenSpec/AGENTS.md` is empty (0 lines). EU AI Act Art. 15 and DORA Art. 25.
- "Treat every retrieval artifact, tool response, and agent-to-agent message as untrusted input." `context-injection/spec.md` injects `openspec/config.yaml` `context:` text directly into prompts without integrity verification. GDPR Art. 32 and Solvency II Art. 41.
- "Pinning tools to verified manifests — checksum or signing verification". `ai-tool-paths/spec.md` enumerates tool entries by string identifier without checksum or signing verification. DORA Art. 28 and EU AI Act Art. 15(5).
- "Egress controls on tool outputs — agent outputs that include retrieved or generated content must be logged with full trace before leaving the trust boundary." No spec requires logging of agent-authored content prior to commit. GDPR Art. 5(1)(f) and DORA Art. 9(4)(d).
- "If you have not tested with tool outages, noisy retrieval, and adversarial inputs, you are not chaos-tested." No artefact defines chaos tests. DORA Art. 25–26 and ISO/IEC 23894.
- "Evidence laundering — an agent assembles an evidence bundle from outputs it generated". `opsx-verify-skill/spec.md` runs Completeness/Correctness/Coherence checks executed by the same agent class that authored the change. SR 11-7 §IV and EU AI Act Art. 14(4)(c).
- "Waiver accumulation — waivers granted for specific circumstances persist beyond those circumstances". OpenSpec has no waiver register, no expiry mechanism. DORA Art. 6(8).

#### Allianz-specific implications

- **EU AI Act Art. 9 and Art. 15:** Allianz MUST treat OpenSpec as out of scope for Art. 15 evidence and produce the threat model, adversarial test suite, and resilience evidence in a separate AI risk-management subsystem.
- **DORA Art. 9 and Art. 25:** Allianz MUST exclude OpenSpec from the DORA "ICT systems supporting critical or important functions" register or treat its outputs as inputs to a separately controlled change-management ICT system.
- **Solvency II Art. 41 and Art. 44:** Allianz MUST require, at the model-validation gate, that any spec sourced from OpenSpec is accompanied by a complementary containment-evidence pack produced outside OpenSpec.
- **GDPR Art. 32 and Art. 25:** Allianz MUST disable telemetry by default (`OPENSPEC_TELEMETRY=0` enforced via central tooling configuration) and document the rules/context channels as an in-scope processing activity in its Article 30 record.
- **SR 11-7 §IV.A and §V:** Allianz MUST place an organisationally separate model-validation gate after `openspec archive` and before any production exposure.

#### Score rationale

Score: **12/100** (Critical). Evidence-for is narrow and confined to a single channel: `telemetry/spec.md` provides explicit data-minimisation and an opt-out switch, `cli-validate/spec.md` catches structural malformation, and `context-injection/spec.md` / `rules-injection/spec.md` give syntactic delimiters around injected text. Evidence-against dominates: no threat model (`OpenSpec/AGENTS.md` is empty); no rate limits, circuit breakers, or safe fallbacks anywhere; no prompt-injection input boundary; no signing or checksum verification of tools; no egress logging of agent-authored content; no chaos or adversarial testing; `opsx-verify-skill/spec.md` runs same-agent verification that "does not block archive", instantiating the manifesto's evidence-laundering pattern; and no waiver register or expiry mechanism. The framework operates under an explicit *[Scope gap]* for security and containment, but P10 is not optional under the manifesto's minimum bar — for Allianz under EU AI Act Art. 9 and Art. 15, DORA Art. 9 and Art. 25, Solvency II Art. 41, and GDPR Art. 32, OpenSpec is a non-contributor and must be wrapped by an externally controlled containment subsystem to be admissible in any high-risk insurance pipeline.

### P11 — Optimize economics of intelligence | **18/100**

#### What OpenSpec asserts about this principle

OpenSpec makes no assertion about the economics of intelligence. The framework is a CLI for spec-driven authoring; it does not select, route, meter, or cost models. The complete supported-tools set in `docs/supported-tools.md` enumerates editor integrations (`amazon-q`, `antigravity`, `auggie`, `bob`, `claude`, `cline`, `codex`, `forgecode`, `codebuddy`, `continue`, `costrict`, `crush`, `cursor`, `factory`, `gemini`, `github-copilot`, `iflow`, `junie`, `kilocode`, `kimi`, `kiro`, `opencode`, `pi`, `qoder`, `lingma`, `qwen`, `roocode`, `trae`, `windsurf`) but treats each as an opaque opener — no model identifier, model tier, token-budget, or per-task routing rule is declared. The telemetry contract emits only `command` and `version`. Cost-per-task, cost-per-outcome, model-mix, and inference spend are absent from `openspec/`, `src/`, and `docs/` in their entirety.

#### What works

- `openspec/config.yaml` provides a single declarative `context` block and tool rules that an upstream router consumes once per session, which keeps prompt context engineering decoupled from per-task model selection.
- The delta-only artefact convention reduces token volume sent to whichever model the host harness selects.
- `cli-validate/spec.md` runs a deterministic Zod-based structural check with no model call, shifting cheap correctness checks off the inference path.
- `openspec-conventions/spec.md` Requirement "OpenSpec conventions SHALL keep specs lightweight by default and scale rigor only when risk or coordination complexity demands it" matches the manifesto's "When governance overhead exceeds the value of the work, that is a signal to simplify" minimum-bar logic at the documentation layer.
- `cli-archive/spec.md` archives changes into `openspec/changes/archive/` so retrieval scope shrinks to active changes.

#### Where it fails the manifesto's bar

- "Build a dynamic routing layer. Route simple tasks to fast, cheap models." OpenSpec does not provide a routing layer, a model registry, or a tier classifier. EU AI Act Art. 9(2).
- "Model choice is a runtime decision, not a configuration constant". OpenSpec records no model field. SR 11-7 §III.
- "Optimize total cost of correctness — not just inference cost, but the full cycle". OpenSpec has no cost field, no incident counter, and no governance-overhead measure. DORA Art. 28.
- "Track cost per task, cost per outcome, and cost per quality unit". No file defines a task-cost, outcome-cost, or quality-unit metric. Solvency II Art. 41 and Art. 44.
- "When governance overhead exceeds the value of the work, that is a signal to simplify, not to add more governance". OpenSpec records no governance-overhead measure. EU AI Act Art. 17.
- "treating cross-model disagreement on shared artifacts as an observable quality signal". OpenSpec has no concept of cross-model disagreement. SR 11-7 §IV.A.
- "Making shared architectural decisions explicit in the knowledge base rather than relying on implicit prompt conventions". DORA Art. 16.
- "Routing semantically related tasks through the same model tier when consistency matters more than cost". EU AI Act Art. 15.

#### Allianz-specific implications

- **Solvency II Art. 41 and Art. 44:** Allianz MUST wrap OpenSpec invocations with a host-harness cost meter that records foundation-model identifier, token in/out, and per-change spend.
- **DORA Art. 28 and Art. 29:** Allianz MUST publish an internal allow-list of editor+model pairings approved per use case, with a concentration-cap policy.
- **SR 11-7 §IV.A:** Allianz MUST require dual-model regeneration of `/opsx:propose` artefacts for any change touching SR 11-7 in-scope systems and store both outputs in the change folder.
- **EU AI Act Art. 9(2) and Art. 15:** Allianz MUST extend the host harness to write a `model-decision.json` (foundation model identifier, version, tier, rationale, alternatives evaluated) into every `openspec/changes/<id>/` folder.
- **DORA Art. 17:** Allianz MUST integrate OpenSpec change folders with its operational-incident register so each archived change carries a back-reference to any incident triggered post-deployment.

#### Score rationale

Score: **18/100** (Critical). Evidence-for: the delta-only spec convention and deterministic `openspec validate` reduce per-call token volume and shift cheap checks off the inference path; the lightweight-by-default rule echoes the manifesto's "simplify when governance overhead exceeds value" disposition. Evidence-against: OpenSpec has no model registry, no routing layer, no model-tier concept, no cost meter, no token counter, no quality-unit measure, and no cross-model disagreement signal anywhere; `telemetry/spec.md` "Privacy-preserving event design" actively excludes the fields P11 minimum bar requires; `docs/supported-tools.md` delegates model selection wholesale to the editor host, which is the manifesto's defining failure mode ("model choice is a configuration constant"). The 18/100 reflects two narrow positives (token-volume reduction via deltas, cheap structural validation) against eight P11 minimum-bar requirements that are wholly absent.

### P12 — Accountability requires intelligibility | **18/100**

#### What OpenSpec asserts about this principle

OpenSpec asserts that proposal/design/tasks/spec artefacts together constitute an "audit trail" that "preserves the full context of every change" (`docs/concepts.md` line 685). The flow diagram labels the four artefact types as `proposal → specs → design → tasks` with the captions `why / what / how / steps`. The `openspec-conventions` capability names a "Review" step where "Humans review proposal and future state" (line 466). No source file names an accountable human, an approver role, an override rate, an irreversibility window, an oversight pattern, a sign-off authority, or a deployment-blocking gate; the `/opsx:verify` skill is explicitly non-blocking ("Does not block archive, but surfaces issues" — `docs/commands.md` line 336).

#### Structured Recovery Test

##### Part A — Oversight Adequacy

OpenSpec instantiates **no** named oversight pattern from the four defined in `manifesto-principles.md` §5 (HITL synchronous, HITL asynchronous, HOTL, HOLL, EDL).

- **HITL.** *Absent.* No artefact records reviewer identity, review timestamp, override rate, reviewer agreement rate, or review latency. The rubber-stamping detection signals from `adoption/metrics.md` have zero counterparts.
- **HOTL.** *Absent.* The framework has no concept of an irreversibility window. HOTL is "the appearance of oversight".
- **HOLL.** *Absent.* Per-action evidence is the markdown artefact set; none include the foundation-model identifier, system-instruction hash, tool manifest, memory state version, retrieval corpus version, or composite state version.
- **EDL.** *Absent.* No artefact defines an independent validator role, records validator domain qualifications, or stores a structured judgement-rationale record.

The waiver-expiry, feedback-loop closure, and claim-revalidation SLOs in `operational-templates/slo-table.md` have no counterpart. The AEM column of `governance/authority-accountability-matrix.md` cannot be populated from OpenSpec artefacts. AEM has no consequence-class carve-out — the per-action accountability minimum bar applies uniformly.

**Part A verdict: every oversight pattern is Absent.** OpenSpec operates structurally at Tier 2 or above for any production agent change.

##### Part B — Structured Recovery

1. **Intent recovery.** *Pass.* `openspec-conventions/spec.md` mandates `proposal.md` capturing "**intent**, **scope**, and **approach**" with mandatory "## Intent", "## Scope", and "## Approach" sections.
2. **Decision recovery.** *Partial.* `design.md` is described as capturing "**technical approach** and **architecture decisions**" using `### Decision: <name>` headings. However "Progressive Rigor" makes design.md *optional* for "local and low-risk" changes; for changes archived without one, decision rationale is unrecoverable.
3. **Evidence recovery.** *Partial.* The change folder structure co-locates `proposal.md`, `design.md`, `tasks.md`, and delta `specs/`. The artefacts that `manifesto-done.md` calls evidence — evaluation reports with pass/fail and metrics, trace IDs, deployment IDs, rollback plans, policy check outputs, memory updates, security static analysis results — have no slot in the OpenSpec archive structure.
4. **Reproduction.** *Fail.* No file records the foundation-model identifier, model version, provider category, system-instruction hash, tool manifest, memory state version, retrieval corpus version, embedding model version, or dataset lineage. Bundle integrity attestation is also absent.
5. **Modification.** *Partial.* The `### Requirement:` / `#### Scenario:` Given/When/Then structure gives a downstream engineer named requirements to preserve. However scenarios are prose, not executable evaluations; the verify skill is non-blocking. Modification is safe at the structural layer and unsafe at the semantic layer.

**Part B count.** Fully passing: **1** (Intent). Partial: 3 (Decision, Evidence, Modification). Failing: 1 (Reproduction). Per the binding-constraint table, "0–1 steps fully passing → 0–19".

**Part A binding constraint.** Part A finds every oversight pattern Absent for action classes OpenSpec operates at Tier 2 or above. Final score lies in the upper-middle of the 0–19 band, reflecting credit for three partial recovery steps.

#### What works

- `openspec-conventions/spec.md` Requirement: "Project Structure" mandates that every change folder contain `proposal.md`, optional `design.md`, `tasks.md`, and delta `specs/` co-located in one directory.
- `docs/concepts.md` "Why Archive Matters" preserves the full change folder under `changes/archive/YYYY-MM-DD-[name]/`.
- `openspec-conventions/spec.md` Requirement: "Structured Format for Behavioral Specs" enforces `### Requirement: [Name]` and `#### Scenario: [Description]` headings with RFC 2119 keywords.
- `opsx-verify-skill/spec.md` Requirement: "Verification Report Format" prescribes a CRITICAL/WARNING/SUGGESTION report with "specific, actionable fix recommendation" and bans vague language.
- `cli-validate/spec.md` Requirement: "JSON output schema for bulk validation" emits a stable JSON shape consumable by an external accountability layer.
- `docs/concepts.md` Decision template (`### Decision: <name>` with explicit rationale, lines 400–420) gives a recognised authoring pattern.

#### Where it fails the manifesto's bar

- "If no named human can inspect the reasoning, review the evidence, and own the outcome of a production agent, the system is ungoverned". `cli-archive/spec.md` archives on tasks-checked alone. EIOPA AI Guidelines 2021 and Solvency II Art. 41.
- "If you cannot report, for each oversight pattern in use, the metrics that indicate whether the pattern is delivering genuine governance". DORA Art. 5.
- "Agents may not accept residual risk, approve production exposure, waive controls, or absorb accountability for business outcomes". The agent effectively self-clears its own work. SR 11-7 §V and Solvency II Art. 48.
- "Accountability without visibility is a legal fiction. You cannot own what you cannot see". EU AI Act Art. 12 and Art. 13.
- "When trace volume exceeds meaningful review capacity, the correct response is to raise automation barriers". EU AI Act Art. 14.
- "Accountability diffusion — the accountable human's name is on the record, but their actual review was nominal". DORA Art. 6(2).
- "Accountability abstraction — the oversight design nominally provides HOLL, but the per-action evidence record is insufficient to reconstruct what happened and why". Solvency II Art. 121.
- "The accountable human reviews the evidence bundle, accepts that the DoD conditions are satisfied, and accepts production accountability for the outcome". GDPR Art. 22.

#### Allianz-specific implications

- **Solvency II Art. 41, Art. 44, and Art. 48:** Allianz MUST add a mandatory accountable-human field to `proposal.md`, a separate validator-sign-off field gated by an organisationally independent role, and refuse `openspec archive` if either is missing.
- **EIOPA AI and ML Guidelines 2021:** Allianz MUST extend the OpenSpec change-creation flow with a board-attestation artefact for high-impact insurance agent changes and bind archive to its presence and currency.
- **DORA Art. 5, Art. 6, and Art. 28–30:** Allianz MUST instrument the rubber-stamping signals from `adoption/metrics.md` in the code-review platform that wraps OpenSpec, and report them to the management body quarterly.
- **EU AI Act Art. 12, Art. 13, and Art. 14:** Allianz MUST attach an agentic-provenance record to every archived change for any agent operating in EU AI Act high-risk scope and refuse archive when any provenance field is missing.
- **SR 11-7 §V and §IV.A:** Allianz MUST insert a second-line model-risk-management gate that consumes the JSON output from `cli-validate/spec.md` and is the sole authority over deployment for any agent change in SR 11-7 scope.

#### Score rationale

Score: **18/100** (Critical). Evidence-for: OpenSpec preserves a co-located change folder under `openspec-conventions/spec.md` Requirement: "Project Structure" and the archive flow, giving an investigator a single locatable artefact set per change; the `proposal.md` template makes intent recoverable as a Pass on the structured-recovery test; the `### Decision: <name>` rationale convention in `design.md` makes architectural decisions recoverable when authors use it; and the CRITICAL/WARNING/SUGGESTION report format with banned vague language gives a small empirical anchor against rubber-stamped review output. Evidence-against: every oversight pattern (HITL, HOTL, HOLL, EDL) is Absent — no artefact records a named accountable human, reviewer identity, override rate, irreversibility window, or independent validator role; `/opsx:verify` is run by the implementing agent and is non-blocking; the agentic provenance record is wholly absent making Reproduction a Fail; design.md is optional under "Progressive Rigor" leaving Decision recovery Partial; the Hardening DoD bundle integrity attestation has no counterpart; and the rubber-stamping detection signals are absent. Part B counts 1 fully-passing step (Intent), 3 Partial (Decision, Evidence, Modification), 1 Fail (Reproduction), placing the score in the 0–19 band.


## Part 4 — Agentic Loop Phase Analysis

OpenSpec is a brownfield specification-and-change-management tool whose own documentation rejects phase gating: `OpenSpec/docs/workflows.md` states "**Actions, not phases** - Commands are things you can do, not stages you're stuck in" and "**Dependencies are enablers** - They show what's possible, not what's required next". The framework's own phase-level construct is the artefact dependency graph in `OpenSpec/docs/concepts.md` — `proposal → specs → design → tasks → implement` — with a single advisory `/opsx:verify` step before `openspec archive`. Mapped to the manifesto's nine-phase loop, the relationship is a partial structural mismatch: OpenSpec covers Specify, Design, and Plan reasonably, partially covers Verify, and has no counterpart for Execute as a bounded-autonomy concept, Validate (separated from Verify), Observe, Learn, or Govern. Telemetry records only the command name and a version string, with no link to specifications, runs, or outcomes.

### Specify | **58/100**

**What OpenSpec does.** OpenSpec treats specifications as Markdown artefacts living in `openspec/specs/<id>/spec.md` with structured `### Requirement:` and `#### Scenario:` blocks in Given/When/Then form. `OpenSpec/docs/concepts.md` (line 269) states: "A spec is a **behavior contract**, not an implementation plan." The change flow uses `openspec/changes/<id>/proposal.md` for "Why and what" with `## Why` and `## What Changes` mandatory sections. Delta specs use `## ADDED Requirements`, `## MODIFIED Requirements`, `## REMOVED Requirements`, `## RENAMED Requirements`. The `/opsx:onboard` skill drafts proposals interactively. Validation is structural only.

**What the manifesto requires.** `manifesto.md` defines: "**Specify** defines what to build and why." It mandates a nine-condition loop-readiness gate: business need validated; value measurable; acceptance criteria expressible; constraints identified; accountable human named; blast radius assessed; out-of-scope explicitly stated. *Minimum bar: If you cannot answer 'what does business success look like and how will you measure it?' before entering Specify, the loop is not ready to run.*

**The gap.** OpenSpec validates Markdown shape, not loop-readiness. Nothing checks for a measurable success criterion, a named accountable human, a blast-radius assessment, or an out-of-scope statement. Under EU AI Act Art. 9 and Solvency II Art. 124, Allianz cannot demonstrate loop-readiness from the OpenSpec proposal alone; under DORA Art. 8 the missing blast-radius / consequence-class assessment is a control deficiency. Severity: **Medium**.

### Design | **55/100**

**What OpenSpec does.** Design lives in `openspec/changes/<id>/design.md`. `OpenSpec/docs/concepts.md` prescribes content covering "technical approach" and "architecture decisions". `design.md` is required only when the schema lists it; the docs state "Dependencies are enablers, not gates. They show what's possible to create, not what you must create next. You can skip design if you don't need it." `/opsx:verify` "Coherence Verification" extracts decisions from `design.md` and checks "implementation follows those decisions"; if it diverges the skill emits a WARNING, not a CRITICAL. The default `core` profile routes `proposal → apply → sync → archive`, omitting `design.md` entirely.

**What the manifesto requires.** "**Design** architects how to build it: boundaries, topology, constraints, and coordination rules." The manifesto requires that "any architectural decisions triggered by governance are filed back into Design" as part of Govern completion conditions.

**The gap.** OpenSpec design is optional, free-form, and has no required content for boundaries, topology, constraints, coordination rules, or defence-in-depth properties. There is no machine-checkable schema for `design.md`. There is no feedback path that files a Govern-triggered architectural decision back into `design.md`. Under DORA Art. 9 and Solvency II Art. 41, the absence of mandatory architectural-decision content fails to evidence "boundaries and constraints" for Allianz internal-model agents. Severity: **High**.

### Plan | **62/100**

**What OpenSpec does.** Planning is captured in `openspec/changes/<id>/tasks.md` as a hierarchical Markdown checklist. Verify reads tasks.md and counts tasks marked complete vs incomplete. Archive checks: "**WHEN** incomplete tasks are found **THEN** display all incomplete tasks to the user **AND** prompt for confirmation to continue **AND** default to 'No' for safety". The plan is human-authored or agent-drafted prose; no estimation, dependency, autonomy-tier, or model-routing fields exist.

**What the manifesto requires.** "**Plan** decomposes the design into executable steps." `manifesto-principles.md` P5 establishes that planning must select an autonomy tier with blast-radius justification, and P11 requires that economic routing be planned before execution.

**The gap.** OpenSpec tasks.md has no autonomy-tier selection field, no blast-radius classification, no model-routing decision, no per-step risk class, and no link to the evaluation portfolio that will gate Verify. Under EU AI Act Art. 14 and DORA Art. 5(2), the absence of an autonomy-tier and oversight-mode declaration in the plan is a control deficiency. Severity: **Medium**.

### Execute | **22/100**

**What OpenSpec does.** OpenSpec has a thin `/opsx:apply` action that drives an agent through tasks.md. `OpenSpec/docs/workflows.md` describes apply as: "`/opsx:apply` — Implement tasks — Ready to write code". There is no spec under `OpenSpec/openspec/specs/` that defines tier-bound, sandboxed, or budget-constrained execution. The framework relies on the host coding agent for any sandboxing; OpenSpec contributes no kill-switch, rate-limit, tool-manifest binding, or per-action authorisation. Telemetry deliberately strips all execution context.

**What the manifesto requires.** "**Execute** carries out the plan within bounded autonomy." P5 requires that execution operate inside a tiered autonomy budget with policy-enforced blast-radius caps; the manifesto requires the execution to produce trace IDs linking the full decision chain.

**The gap.** OpenSpec contributes no execution bounding, no autonomy tier enforcement, no tool manifest, no per-action policy check, no trace-ID emission, no kill switch, and no per-action cost tracking. Telemetry is a deliberately blind opt-out probe with no link to the change being executed. Under DORA Art. 9, Art. 11, EU AI Act Art. 12, and SR 11-7 §V, this is a Critical deficiency for Allianz. Severity: **Critical**.

### Verify | **40/100**

**What OpenSpec does.** Verification is the `/opsx:verify` skill. It produces a three-dimension report: Completeness (task counts and requirement-to-code search), Correctness (per-requirement codebase search and per-scenario coverage check), and Coherence (design.md adherence, code pattern consistency). The report ranks issues as `CRITICAL`, `WARNING`, `SUGGESTION`. `OpenSpec/docs/workflows.md` line 277 states: "Verify won't block archive, but it surfaces issues you might want to address first." Structural validation (`openspec validate --strict --json`) emits a stable schema usable by CI to fail builds.

**What the manifesto requires.** "**Verify** checks the output against the specification (did we build it right?)." `manifesto-done.md` requires "evaluated against regression tests (and adversarial cases), with an evidence bundle (diffs, trace IDs, policy check outputs) required for every automated merge."

**The gap.** OpenSpec's Verify is agent prose against agent prose: scenarios are not executable, regression and adversarial categories are not required, and no evidence bundle is assembled. Under EU AI Act Art. 15 and Solvency II Art. 124 the verification regime fails the "machine-checked correctness against the specification" bar. Severity: **High**.

### Validate | **18/100**

**What OpenSpec does.** OpenSpec collapses validation into the same `/opsx:verify` agent run that performs verification. There is no separated "did we build the right thing?" gate. There is no organisationally separate validator role, no second-line check, no production-decision authority. Coherence as defined is internal consistency, not external fitness for purpose.

**What the manifesto requires.** "**Validate** checks the outcome against real-world need (did we build the right thing?). ... Verification and validation are distinct disciplines."

**The gap.** OpenSpec has no Validate phase. There is no required real-world-fitness check, no holdout case requirement, no field-evidence linkage, no organisationally separate validator. Under SR 11-7 §V, Solvency II Art. 48 and Art. 124, and EU AI Act Art. 17, this absence is a categorical compliance blocker. Severity: **Critical**.

### Observe | **14/100**

**What OpenSpec does.** OpenSpec's only runtime instrumentation is `telemetry/spec.md` Requirement: "Command execution tracking" sending a `command_executed` event with command name and OpenSpec version. "Privacy-preserving event design" mandates excluding command arguments, file paths, project names, spec content, error messages, and IP addresses. There is no spec coupling, no run ID, no agent identifier, no model identifier, no token cost, no policy-violation event, no drift signal.

**What the manifesto requires.** "**Observe** monitors runtime behavior, drift, and cost." `governance/integrated-audit-trail.md` AEM execution trace section requires that for every loop iteration, a trace records the decision chain (specification version, agent identifier, tool calls, model identifier, policy checks, outcome).

**The gap.** OpenSpec does not produce or require any execution trace, decision chain, or governance-state telemetry. Under EU AI Act Art. 12, DORA Art. 9 and Art. 13, and Solvency II Art. 41(3), this is a Critical observability deficit. Severity: **Critical**.

### Learn | **20/100**

**What OpenSpec does.** OpenSpec preserves change history by archiving each change folder under `openspec/changes/archive/YYYY-MM-DD-<change-name>/`. Specs evolve through delta merge: `## ADDED`, `## MODIFIED`, `## REMOVED` operations rewrite `openspec/specs/<id>/spec.md` at archive time. There is no curated heuristic memory, no learned-routing memory, no incident-derived memory, no provenance for derived heuristics. The framework provides no mechanism to feed observed failures back into the next change beyond a human re-reading the archived prose.

**What the manifesto requires.** "**Learn** updates knowledge and memory from observations. ... Knowledge captures durable truth; memory captures learned heuristics and reusable skills."

**The gap.** OpenSpec has document archival, not learning infrastructure. There is no learned-memory artefact with provenance, no heuristic-update workflow, no routing-preference capture, no reusable-skill registry, and no failure-to-evaluation feedback. Under EU AI Act Art. 9(2)(c) and DORA Art. 13, the framework provides no learning loop. Severity: **High**.

### Govern | **15/100**

**What OpenSpec does.** OpenSpec has no governance phase. `openspec archive` moves the change to the archive directory after applying delta operations and prompts for confirmation only on incomplete tasks or spec-update side effects. `--yes`, `--skip-specs`, and `--no-validate` collectively bypass advisory checks. There is no policy violation register, no economics review, no accountability sign-off field, no waiver record, no expiry, no kill switch, no Tier-4 prerequisite check, no control state record. The accountable-human concept is absent.

**What the manifesto requires.** "**Govern** applies policy, accountability, change control, and economics review. ... A Govern cycle is not complete until: all outstanding policy violations are resolved, accountability signals are within threshold, economics review is recorded, any architectural decisions triggered by governance are filed back into Design, and tool invocations during the loop are confirmed within the authorized scope for the operating tier."

**The gap.** OpenSpec has none of the Govern completion conditions. Tier 4 prerequisites cannot even be modelled. Under SR 11-7 §V, Solvency II Art. 41 and Art. 48, DORA Art. 5 and Art. 28, and EU AI Act Art. 14 and Art. 17, this is a categorical compliance blocker. Severity: **Critical**.

### Cross-Phase Failure Modes

- **Specify→Verify:** Loop-readiness gate is not enforced upstream and `/opsx:verify` cannot test it downstream; EU AI Act Art. 9 is breached because risk-relevant scope is never recorded. Severity: Critical.
- **Plan→Execute:** Tasks.md does not declare an autonomy tier or a tool manifest, and `apply` has no enforcement layer; DORA Art. 9 is breached because tool invocation scope is unbounded. Severity: Critical.
- **Execute→Verify:** No execution trace exists to verify against; EU AI Act Art. 12 is breached. Severity: Critical.
- **Verify→Validate:** Verification and validation are folded into one agent skill; SR 11-7 §V is breached because no organisationally separate validator exists. Severity: Critical.
- **Verify→Govern:** Critical issues do not block archive; Solvency II Art. 124 is breached because validation is non-blocking. Severity: Critical.
- **Observe→Learn:** Telemetry contains no signal usable for learning; DORA Art. 13 is breached. Severity: High.
- **Learn→Specify:** No mechanism feeds incident learnings into the next proposal; EU AI Act Art. 9(2)(c) is breached. Severity: High.
- **Govern→Design:** Architectural decisions triggered by governance are never filed back; Solvency II Art. 41 is breached. Severity: High.

### Human Escalation Architecture

**Escalation triggers.** OpenSpec defines four trigger points, all of which are advisory or low-consequence: (1) interactive selection prompts in `cli-archive/spec.md` and `cli-validate/spec.md`; (2) incomplete-task confirmation that "default[s] to 'No' for safety"; (3) spec-update confirmation; (4) `/opsx:verify` CRITICAL display, which "displays" but does not technically prevent archive. There is no escalation trigger for policy violation, autonomy-tier breach, drift detection, control-state failure, or accountability rubber-stamping.

**Escalation path.** No named role exists in any OpenSpec spec. The only actor referenced is "the user" running the CLI or "the agent" running the skill. There is no second-line role, no actuarial function, no risk officer, no Data Protection Officer, no model risk manager, no Tier 4 envelope owner. `cli-feedback/spec.md` defines a `/feedback` skill that opens GitHub issues against the OpenSpec project itself — that is product feedback, not a user-organisation escalation channel.

**Response time.** No response-time SLA is documented anywhere in `openspec/specs/` or `docs/`. There is no documented detection-to-intervention SLA, no waiver-expiry SLA, and no governance review cycle. `operational-templates/slo-table.md` feedback-loop closure SLOs and waiver-expiry SLOs have no counterpart artefact.

**Fitness for Allianz context.** OpenSpec's escalation architecture is unfit for Allianz under at least the following named obligations from `domains/insurance.md`: (i) **Solvency II Art. 48** (actuarial function — requires a qualified actuarial reviewer with blocking authority); (ii) **Solvency II Art. 41** (system of governance — written policies including escalation paths); (iii) **EU AI Act Art. 14** (human oversight — operational, capable of overriding the system); (iv) **EU AI Act Art. 12** (record-keeping — automatic logs of events triggering human intervention); (v) **DORA Art. 5** (ICT governance — board-level accountability and documented escalation); (vi) **DORA Art. 17** (ICT-related incident management — classification, reporting, and escalation thresholds with response-time SLAs); (vii) **GDPR Art. 22** (HITL for solely automated decisions producing legal/significant effects on individuals); (viii) **SR 11-7 §V** (effective challenge — independent reviewer with blocking authority); (ix) **EIOPA AI Guidelines (2021)** (board-level AI accountability and second-line independent challenge); (x) **`domains/insurance.md` Hard Autonomy Caps** (Tier 1 ceilings for underwriting, claims adjudication, IDD-scope advisory, and SCR calculation — not enforceable in OpenSpec because no tier construct exists). The framework provides none of the required role definitions, SLAs, kill switches, or blocking gates. Severity: **Critical**.

## Part 5 — Agentic Definition of Done

#### DoD Condition Table

| Condition | Score | Evidence For | Evidence Against |
| --- | --- | --- | --- |
| Shipped | 45 | `cli-archive/spec.md` Requirement: "Archive Process", Scenario: "Performing archive" moves the change to `archive/YYYY-MM-DD-<name>/` after applying deltas, providing a reproducible "merged" record; `docs/concepts.md` Archive section preserves proposal/design/tasks/specs together. | Archive is not deployment. No spec records the deployed environment, version-in-production, deployment time, or rollback test status. `--skip-specs` and `--no-validate` allow archive without merge or validation. |
| Observable | 12 | `telemetry/spec.md` Requirement: "Command execution tracking" confirms a `command_executed` event with `command` and `version` is emitted. | Telemetry is deliberately decoupled from the change: `Privacy-preserving event design` excludes "command arguments, file paths, project names, spec content, error messages". No execution trace, no run ID, no agent identifier, no model identifier, no policy event, no governance-state observability. |
| Verified | 32 | `cli-validate/spec.md` Requirement: "Validation options and progress indication", Scenario: "JSON output schema for bulk validation" gives CI a stable JSON shape and non-zero exit; `opsx-verify-skill/spec.md` Requirement: "Completeness Verification" performs requirement-to-code search. | Verify is non-blocking ("Verify won't block archive", `docs/workflows.md` line 277). Scenarios are prose, not executable. No regression suite, no adversarial cases, no evidence bundle, no diffs+trace IDs+policy outputs assembly. |
| Provable | 8 | `cli-validate/spec.md` provides a deterministic structural-validation JSON output that is a small empirical anchor for reproducibility of the validation step. | No replayable proof artifacts, no formalised invariants, no integrity attestation, no signed bundle hash. The Hardening Steps in `manifesto-done.md` have no counterpart. |
| Learned from | 22 | `cli-archive/spec.md` Requirement: "Archive Process" preserves change history under `changes/archive/`; `docs/concepts.md` Archive section: "Audit trail. The archive preserves the full context of every change". | No knowledge-base update, no learned memory with provenance, no heuristic capture, no routing preference, no failure-to-evaluation feedback. |
| Governed | 8 | `cli-archive/spec.md` Requirement: "Confirmation Behavior" provides a default-No confirmation prompt as a minimal human checkpoint. | No accountable-human field, no autonomy-tier construct, no policy register, no waiver record, no control state record, no kill switch, no Tier 4 prerequisites. `--yes` / `-y` and `--skip-specs` and `--no-validate` collectively bypass all advisory checks. |
| Economical | 6 | None demonstrable. | No cost-per-change, no model-tier routing, no token accounting, no cost forecast, no 20%-divergence alert. Telemetry excludes any token or cost metric. |

##### Condition Narratives

**Shipped — 45 (High).** OpenSpec demonstrates a partial Shipped capability: `cli-archive/spec.md` Requirement: "Archive Process" specifies "Move the entire change directory to the archive location" with date-prefixed naming. `manifesto-done.md` defines: "**Shipped** — deployed or delivered, not just merged." OpenSpec archives but does not deploy. The flag combinations `--yes --skip-specs --no-validate` allow archival of an unverified, unmerged change. Severity: **High**.

**Observable — 12 (Critical).** OpenSpec demonstrates no Observable capability beyond product analytics. `telemetry/spec.md` Requirement: "Privacy-preserving event design" mandates exclusion of context. `manifesto-done.md` defines: "**Observable** — instrumented and logged so reasoning can be inspected and reconstructed from traces." Severity: **Critical**.

**Verified — 32 (Critical).** OpenSpec demonstrates a Markdown-shape verifier and a prose verifier. `manifesto-done.md` defines: "**Verified** — evaluated against regression tests (and adversarial cases), with an evidence bundle (diffs, trace IDs, policy check outputs) required for every automated merge." OpenSpec's verify produces neither regression coverage nor an evidence bundle. Severity: **Critical**.

**Provable — 8 (Critical).** OpenSpec demonstrates no Provable capability. `manifesto-done.md` defines: "**Provable (when risk requires it)** — formalized invariants and replayable proof artifacts attached for critical workflows." For Allianz Solvency II internal-model agents the Provable bar is required and unmet. Severity: **Critical**.

**Learned from — 22 (High).** `manifesto-done.md` defines: "**Learned from** — knowledge base and learned memory updated with what was discovered, with provenance." OpenSpec preserves documents but does not curate knowledge or memory. Severity: **High**.

**Governed — 8 (Critical).** `cli-archive/spec.md` Requirement: "Skip Specs Option" allows skip directly to archive; `manifesto-done.md` defines: "**Governed** — operating within autonomy tiers appropriate to its risk, with human accountability assigned." OpenSpec has no autonomy tier, no accountable-human field, no policy register, and no control state record. Severity: **Critical**.

**Economical — 6 (Critical).** `manifesto-done.md` defines: "**Economical** — routed through appropriate model tiers, cost tracked and justified per outcome." OpenSpec records neither model identity nor cost. Severity: **Critical**.

#### DoD Hardening Test

**Audit scenario.** A DORA Art. 17 ICT-related incident is reported on 2026-05-08 against an Allianz claims-triage agent product whose changes are tracked in OpenSpec. The supervisory authority requests, within seven business days, the evidence bundle for the most recent agent change deployed to production, including the agentic provenance record, the security static analysis result, the rollback test result within the 48-hour pre-deployment window, the integrity attestation for the bundle, and the named accountable human's sign-off.

- **Shipped.** Evidence: `openspec/changes/archive/2026-05-07-add-claims-triage-rule/` folder. Missing: deployed environment identifier, production version, rollback procedure test record. Verdict: **Partial**.
- **Observable.** Evidence: PostHog `command_executed` events. Missing: any execution trace, run ID, agent identifier, model identifier, policy-check log, or governance-state log linkable to the incident. Verdict: **Fail**.
- **Verified.** Evidence: structural validation JSON, `/opsx:verify` Markdown report. Missing: regression evaluation results, adversarial evaluation results, evidence bundle, bundle integrity attestation. Verdict: **Fail**.
- **Provable.** Evidence: none directly applicable. Missing: replayable proof artifacts and formal invariants. Verdict: **Fail**.
- **Learned from.** Evidence: archived prior changes available for human reading. Missing: machine-readable knowledge or memory updates with provenance; no incident-to-evaluation linkage. Verdict: **Fail**.
- **Governed.** Evidence: archive confirmation prompts with default-No (when not bypassed). Missing: accountable-human sign-off field, autonomy tier record, policy violation register, control state record, waiver expiry, kill-switch event log. Verdict: **Fail**.
- **Economical.** Evidence: none. Missing: cost forecast, actual-vs-forecast divergence, model-tier routing record. Verdict: **Fail**.

**Overall verdict:** **Fail**. Single largest evidence gap: the absence of an evidence bundle envelope binding execution traces, policy checks, agentic provenance, and an accountable-human sign-off to the change record — without it, six of the seven DoD conditions cannot be evidenced under DORA Art. 17 reporting timelines. Hardening is not complete.

#### Industry-Specific DoD Requirements

- **Shipped — Solvency II Art. 112–127 and Art. 41.** Obligation: deployments of agent products that feed SCR calculation must be traceable to a supervisor-approved internal-model version. Gap: no production version, environment, or supervisory approval reference. Consequence: Allianz cannot evidence that the deployed agent version corresponds to an approved internal-model state.
- **Observable — EU AI Act Art. 12, DORA Art. 9 and Art. 13, Solvency II Art. 41(3).** Obligation: automatic logs of events relevant to the system's lifecycle. Gap: no execution trace, drift log, or governance-state log. Consequence: in a DORA Art. 17 incident report, Allianz cannot reconstruct the agent's reasoning.
- **Verified — EU AI Act Art. 15, Solvency II Art. 124, DORA Art. 16/24, SR 11-7 §IV.** Obligation: regression, adversarial, and validation-by-independent-validator before production deployment, with a complete evidence bundle. Gap: `/opsx:verify` is non-blocking and prose-only; no adversarial scenario category exists; no evidence bundle is assembled.
- **Provable — EU AI Act Art. 17 and Art. 9.** Obligation: for high-risk AI systems, formalised invariants and replayable artifacts where risk requires it. Gap: OpenSpec has no invariant language and no replay harness. Consequence: Allianz cannot demonstrate proof-grade evidence for Annex III §5(b).
- **Learned from — DORA Art. 13, EU AI Act Art. 9(2)(c).** Obligation: incident learnings must update risk assessments, evaluations, and operational controls. Gap: archive is folder retention without curated knowledge or memory updates with provenance.
- **Governed — SR 11-7 §V, Solvency II Art. 48, EU AI Act Art. 14, DORA Art. 5, GDPR Art. 22.** Obligation: organisationally separate, qualified, blocking validation; named accountable human; Tier 1 ceiling for underwriting/claims/IDD/SCR. Gap: OpenSpec has no autonomy-tier construct, no accountable-human field, no blocking gate. Hard Autonomy Caps are unenforceable inside OpenSpec.
- **Economical — DORA Art. 6(2), EIOPA AI Guidelines.** Obligation: cost and routing decisions tracked per outcome. Gap: OpenSpec records no cost or model-tier identity.

## Part 6 — Adoption Document Alignment

### `adoption/path.md` — Adoption Path and Phase Transitions

**Alignment grade:** Misaligned

#### What the Document Requires

`adoption/path.md` defines a 7-step incremental infrastructure path mapping to Phase 3→4 (Steps 1–3), Phase 4→5 (Steps 4–6), and ongoing expansion (Step 7). It requires that Tier 1/2/3 autonomy be encoded "as infrastructure-level permissions, not prompt instructions"; that an evidence bundle ("a diff, a test report, and a rollback command for every agent-generated PR. Block merge without these") be enforced in CI; that regression gates "block merge" on evaluation regression; that adversarial and security evaluations gate exposed surfaces; that durable coordination state include "Work ledgers", "Lease-based task ownership", and "Restart-safe handoffs"; that formal contracts be piloted on one high-blast-radius path; and that expansion be gated on "Incident rate stable or improving for two consecutive quarters."

#### What OpenSpec Covers

OpenSpec's scope is artefact authoring and lifecycle management for change proposals. The README states the philosophy `→ fluid not rigid → iterative not waterfall → easy not complex → built for brownfield not just greenfield → scalable from personal projects to enterprises`. The product is a CLI plus slash commands (`/opsx:propose`, `/opsx:apply`, `/opsx:verify`, `/opsx:archive`) that scaffold `proposal.md`, `specs/`, `design.md`, `tasks.md` per change.

- **Step 1 (Domain boundary encoding and tier infrastructure): Absent.** OpenSpec organises specs "by feature area", "by component", or "by bounded context" (`docs/concepts.md`: "Common patterns: By feature area: `auth/`, `payments/`, `search/`"), but these are markdown directory groupings only. No infrastructure-level enforcement, tool permission registry, or autonomy-tier mechanism exists. The `src/core/` directory contains no autonomy-tier or runtime-permission module.
- **Step 2 (Evidence bundle): Absent.** `/opsx:archive` (`docs/commands.md`) consolidates `proposal.md`, `design.md`, `tasks.md`, and delta specs into `changes/archive/YYYY-MM-DD-<name>/`. There is no diff, no test report, no trace link, and no rollback note in this artefact. The archive is a documentation snapshot, not an auditable evidence bundle as defined by the manifesto.
- **Step 3 (Regression gates): Absent.** `/opsx:verify` (`docs/commands.md`) "Does not block archive, but surfaces issues" and is described as a static "completeness, correctness, coherence" check against task lists and prose specs. There is no evaluation suite, no behavioural regression infrastructure, and no merge-blocking gate.
- **Step 4 (Adversarial / security evaluations): Absent.** No adversarial test harness, prompt-injection check, or security evaluation surface exists in `OpenSpec/src/`. The `openspec` CLI does not produce or execute evaluations.
- **Step 5 (Durable coordination state): Absent.** OpenSpec's "parallel changes" pattern (`docs/workflows.md`) supports independent change folders editing different requirements without conflict, but there is no work ledger, no lease, and no restart-safe handoff. The `src/core/workspace/` module addresses cross-repo planning links (workspace.yaml / local.yaml), explicitly stated as "under active development and is not ready for use yet" (`docs/concepts.md`); credit is not claimed for an in-development capability.
- **Step 6 (Formal contracts): Absent.** The framework uses RFC 2119 SHALL/MUST/SHOULD prose keywords (`docs/concepts.md`: "MUST/SHALL — absolute requirement") in markdown specs. These are not machine-checkable preconditions/postconditions/invariants. No contract verification module exists in `src/`.
- **Step 7 (Expansion gates on incident/economics): Absent.** No incident-rate tracking, no escaped-defect metric, no cost telemetry beyond opt-out anonymous command-name counting (`README.md`: "We collect only command names and version… no arguments, paths, content, or PII").

Per-step verdicts: Step 1 Absent | Step 2 Absent | Step 3 Absent | Step 4 Absent | Step 5 Absent | Step 6 Absent | Step 7 Absent.

#### Output Lifecycle & Version Migration

- OpenSpec stamps a change folder with a creation date prefix on archive (`docs/commands.md`: "Moves change folder to `openspec/changes/archive/YYYY-MM-DD-<name>/`") but does not stamp the producing OpenSpec CLI version onto the artefact. There is no `framework_version` field in `proposal.md`, `design.md`, `tasks.md`, or delta specs. [Severity: High]
- `openspec update` (`README.md`) refreshes generated agent instruction files for tool integrations but does not migrate prior `proposal.md` / `specs/` content to a new schema version. The CHANGELOG records breaking changes (1.0.0 "Old commands removed — `/openspec:proposal`, `/openspec:apply`, and `/openspec:archive` no longer exist") with migration described as "Run `openspec init` to upgrade. Legacy artefacts are detected and cleaned up with confirmation" — that is detection-and-cleanup, not version-tagged artefact preservation. [Severity: High]
- The audit log is local-only: archived changes live in `openspec/changes/archive/` inside each repository and rely on git for history. There is no centrally accessible governance ledger; cross-team aggregation requires bespoke tooling outside OpenSpec. [Severity: High]
- Telemetry is opt-out anonymous command-name counting (`README.md`: "Opt-out: `export OPENSPEC_TELEMETRY=0`"). No artefact-lineage telemetry exists. [Severity: Medium]
- Consequence for Allianz's multi-year regulatory artefact horizon: a Solvency II Article 35 record retention requirement (and Solvency II Article 41 on the system of governance) is not satisfied by a local-only, version-untagged folder hierarchy. Internal Model approval evidence under Solvency II Articles 112–127 must be reproducible across actuarial cycles spanning years; OpenSpec's archive does not preserve the producing-version provenance needed for that reproduction.

#### Gaps

- **Contradiction:** `adoption/path.md` requires autonomy tiers as "infrastructure-level permissions, not prompt instructions"; OpenSpec's `docs/concepts.md` explicitly states the framework's domain organisation produces markdown spec files with no runtime enforcement, and the framework's tagline is `→ easy not complex → fluid not rigid` which is incompatible with infrastructure-level autonomy enforcement. [Severity: Critical]
- No evidence-bundle artefact: archive contains proposal/design/tasks/delta-specs only; no diff, test report, trace, or rollback note. [Severity: Critical]
- No regression gate: `/opsx:verify` does not block, executes prose-level checks only, and runs no evaluation suite. [Severity: Critical]
- No adversarial/security evaluation harness on agent-generated outputs. [Severity: Critical]
- No durable coordination state: no work ledger, lease, or restart-safe handoff for multi-agent workflows. [Severity: High]
- No formal-contract mechanism on high-blast-radius paths; SHALL/MUST keywords are prose, not machine-checked invariants. [Severity: High]
- No expansion-gate metric instrumentation: incident rate, escaped defect rate, total cost of correctness are not produced. [Severity: High]
- No producing-version stamping on archived artefacts; no migration path for prior-version artefacts. [Severity: High]

#### Allianz Implication

Solvency II Article 121 (statistical quality standards) and Article 124 (validation standards) require that internal model documentation be reproducible and traceable across model lifecycle iterations, and that "calibration evidence requires actuarial sign-off" (mapping in `domains/insurance.md`). OpenSpec produces prose-level proposals and tasks but no evidence bundle, no evaluation portfolio, and no version-stamped artefact, which means an Allianz Internal Model Approval Process (IMAP) submission relying on OpenSpec alone fails the Documentation Standards test on supervisory review. Exposure is operational and regulatory; timing is immediate on any Solvency II model change deployed via OpenSpec without supplementary evidence infrastructure.

---

### `adoption/playbook.md` — Organisational Change Readiness

**Alignment grade:** Partially aligned

#### What the Document Requires

`adoption/playbook.md` defines business-case metrics ("Cycle time reduction… Escaped defect rate… Senior talent leverage… Total cost of correctness"); requires Agile-ceremony conversion ("Sprint Planning → Spec Refinement & Tier Assignment", "Sprint Review → Evidence Bundle Review", "Retrospective → Memory Curation & Skill Promotion"); flags the supervision paradox ("Reviewing AI-generated code is often harder than writing code yourself"); and addresses the cultural and human side of the transition. It states "Treat these as starting signals, not universal thresholds. Calibrate against your domain baseline and risk class."

#### What OpenSpec Covers

- **Specification refinement and "agree before you build":** Strong. The README states "Agree before you build — human and AI align on specs before code gets written" and `docs/concepts.md` requires Given/When/Then scenarios with "RFC 2119 keywords (SHALL, MUST, SHOULD, MAY)". The `/opsx:propose` workflow (`docs/commands.md`) operationalises this. Met (partial — no autonomy tier or blast-radius classification).
- **Sprint Review → Evidence Bundle Review:** Partial. `/opsx:verify` produces a structured "completeness / correctness / coherence" report (`docs/commands.md`) which approximates an evidence-bundle review surface, but the verify report itself omits diff, trace, evaluation results, and policy check outputs.
- **Retrospective → Memory Curation:** Absent. The archive folder preserves change history but there is no learned-memory store, no skill-promotion mechanism, no failure-pattern catalogue. Project-level rules in `openspec/config.yaml` (e.g., "Always use path.join() or path.resolve() for file paths") allow durable rule capture but not memory governance with provenance, expiration, or compression.
- **Standup → Trace Audit:** Absent. No structured traces, no anomaly review surface, no behavioural drift instrumentation.
- **Total cost of correctness, escaped defect rate, cycle time:** Absent. OpenSpec emits no telemetry beyond opt-out anonymous command-name counts (`README.md`: "We collect only command names and version").
- **Cultural / human dimensions:** Out of scope. The README, AGENTS.md, and docs do not address the supervision paradox, sustainable pace, or junior-pipeline protection. The framework states "OpenSpec stays out of your way" (`docs/concepts.md`) — a deliberate scope exclusion.

#### Gaps

- No instrumentation for the four playbook business-case metrics (cycle time from spec to verified deployment, escaped defect rate, senior talent leverage, total cost of correctness). [Severity: Critical]
- No evidence-bundle review surface that consolidates diff + tests + traces + policy checks; `/opsx:verify` reports a prose summary only. [Severity: High]
- No memory curation infrastructure for the retro-equivalent ceremony; project rules in `config.yaml` are static text without governance properties. [Severity: High]
- No trace audit / anomaly review surface for the standup-equivalent ceremony. [Severity: High]
- Cultural and human-side topics (supervision paradox, acceleration trap, sustainable pace, junior pipeline) are out of declared scope; framework does not produce supervision-load metrics that would surface these issues. [Severity: Medium]

#### Allianz Implication

EIOPA Opinion on Artificial Intelligence Governance and Risk Management (2021) — mapped in `domains/insurance.md` — requires "ongoing performance monitoring" and integration of AI governance "into the existing risk management framework (not siloed as a separate AI governance team)." OpenSpec's lack of instrumented business-case metrics means an Allianz-level AI governance committee cannot demonstrate to EIOPA that AI-assisted delivery improvements are real, not perceived. Exposure is regulatory and reputational; timing is on the next supervisory review of Allianz's AI risk management framework.

---

### `adoption/enterprise.md` — Enterprise Wave Model

**Alignment grade:** Misaligned

#### What the Document Requires

`adoption/enterprise.md` defines four waves: Wave 0 (one team, one domain, Phase 3→4, 8–12 weeks), Wave 1 (3–5 teams, 12–16 weeks), Wave 2 (all teams above Phase 2, 16–24 weeks), Wave 3 (Phase 5 readiness, ongoing). It requires assessment across six readiness dimensions: agentic maturity distribution; existing governance integration; infrastructure readiness ("Reasoning-level observability… Memory infrastructure… Evaluation pipelines… Cost-quality routing"); skill distribution; regulatory exposure; organisational change capacity. It cautions: "Building full enterprise infrastructure (memory, observability, evaluation pipelines) before any team has adopted the manifesto. Results in: infrastructure that doesn't match actual needs."

#### What OpenSpec Covers

- **Wave 0 (one team, one domain, pilot governance evidence artefacts):** Partial. OpenSpec provides a low-ceremony specification scaffolding (`docs/workflows.md`: "Quick Feature: `/opsx:new ──► /opsx:ff ──► /opsx:apply ──► /opsx:verify ──► /opsx:archive`") suitable for a Wave 0 pilot's documentation discipline. It does not produce the Wave 0 governance evidence artefacts (autonomy tier registry, blast-radius classification, evidence bundle, evaluation results).
- **Wave 1 (3–5 teams, cross-domain traceability, enterprise governance aggregation):** Partial. The `src/core/workspace/` module supports linking multiple repos under a coordination workspace (`docs/concepts.md`: "workspace = where related cross-repo changes live"). Its status is explicitly "under active development and is not ready for use yet." No enterprise governance aggregation, no multi-team autonomy tier management exists. In-development status — not credited as covered.
- **Wave 2 (memory governance, behavioural observability, shared evaluation registries):** Absent. None of these capabilities exist in `OpenSpec/src/`.
- **Wave 3 (verified inter-domain contracts, enterprise evaluation registries, autonomy tier governance):** Absent.

Across the six enterprise readiness dimensions:
- Current agentic maturity distribution: not assessed by OpenSpec; out of scope.
- Existing governance integration: no integration points with audit, change-control, or compliance frameworks beyond markdown documentation.
- Infrastructure readiness (reasoning observability, memory, evaluation pipelines, cost-quality routing): all four absent.
- Skill distribution: not addressed.
- Regulatory exposure: not addressed.
- Organisational change capacity: not addressed.

#### Gaps

- No multi-team autonomy tier registry or cross-domain governance aggregation. [Severity: Critical]
- No reasoning-level observability infrastructure. [Severity: Critical]
- No memory infrastructure with provenance, decay policy, or domain isolation. [Severity: Critical]
- No evaluation pipeline / shared evaluation registry. [Severity: Critical]
- No cost-quality routing telemetry. [Severity: High]
- Cross-repo workspace coordination is in development and not ready for production use; cannot be credited as Wave 1 enterprise traceability. [Severity: High]
- No enterprise governance board integration surface (no API, no aggregated reporting). [Severity: High]

#### Allianz Implication

DORA (Regulation EU 2022/2554) Articles 5–6 require ICT risk management framework integration and Articles 28–30 require third-party ICT risk concentration management — both presuppose enterprise-level governance aggregation. Solvency II Article 41 (system of governance) requires that the AMSB (Administrative, Management or Supervisory Body) have visibility across the undertaking's risk-bearing systems. OpenSpec's per-repository, local-only archive cannot deliver enterprise aggregation; an Allianz-wide deployment requires building enterprise governance infrastructure independently. Exposure is regulatory and operational; timing is on Allianz's next DORA self-assessment cycle and on every Solvency II AMSB risk report.

---

### `adoption/metrics.md` — Measurement Readiness

**Alignment grade:** Misaligned

#### What the Document Requires

`adoption/metrics.md` defines metric sets per phase transition (Phase 1→2 through Phase 5→6), four team-health metrics ("Review latency trends… Approval depth… Engineer satisfaction and burnout indicators… Junior engineer progression rate"), four rubber-stamping detection signals ("Median review time per agent-generated PR… PR rejection rate (agent-generated)… Inline comments per approved PR… Rework rate within 1 week of merge"), and five governance-overhead metrics ("Governance overhead as % of engineering throughput… False-positive rate on hook blocks… Time-to-update-governance-policy… Incident-prevention rate attributable to governance controls… Hook false-negative rate").

#### What OpenSpec Covers

| Metric | Phase | OpenSpec Support | Verdict | Evidence |
|---|---|---|---|---|
| Number of AI-assisted tasks with documented, repeatable workflows | 1→2 | Change archive folder count is a weak proxy | Partial | `docs/commands.md` archive flow |
| Rework rate on AI-assisted outputs | 1→2 | Not measured | Absent | No rework telemetry in `src/core/` |
| Team coverage of approved AI tooling | 1→2 | Not measured | Absent | No team coverage metric |
| Data handling incidents | 1→2 | Not measured | Absent | No incident telemetry |
| Agent task completion rate | 2→3 | Task checkbox state in `tasks.md` (`docs/concepts.md`) is a weak per-change proxy | Partial | "Use hierarchical numbering (1.1, 1.2, etc.)" |
| Review rejection rate for agent outputs | 2→3 | Not measured by OpenSpec | Absent | No review-outcome capture |
| Documented failure patterns | 2→3 | Not measured | Absent | No failure-pattern catalogue |
| Specification quality (% with acceptance criteria) | 2→3 | Partial — `/opsx:verify` checks scenarios are present; binary, not a rate | Partial | `docs/commands.md` verify dimensions |
| Evidence bundle completeness rate | 3→4 | Not measured (no evidence bundle exists) | Absent | See Adoption Path Step 2 finding |
| Escaped defect rate (agent vs human) | 3→4 | Not measured | Absent | No defect telemetry |
| Rollback frequency / MTTR | 3→4 | Not measured | Absent | No rollback artefact |
| Time per evidence bundle | 3→4 | Not measured | Absent | No timing instrumentation |
| Lead time spec → verified deployment | 4→5 | Not measured | Absent | No deployment integration |
| Total cost of correctness by domain | 4→5 | Not measured | Absent | No cost telemetry |
| Policy violation rate | 4→5 | Not measured | Absent | No policy engine |
| Cross-domain evaluation coverage | 4→5 | Not measured | Absent | No evaluation infrastructure |
| Specification convergence rate | 5→6 | Not measured (delta sections track edits but no convergence metric) | Absent | `docs/concepts.md` ADDED/MODIFIED/REMOVED |
| Evaluation theatre detection rate | 5→6 | Not measured | Absent | No evaluation infrastructure |
| Self-improvement cycle time | 5→6 | Not measured | Absent | Out of scope |
| Human oversight load | 5→6 | Not measured | Absent | No reviewer-load metric |
| Review latency trends (team health) | All | Not measured by OpenSpec (lives in code review platform) | Absent | No git/review integration |
| Approval depth (team health) | All | Not measured | Absent | No review introspection |
| Engineer satisfaction / burnout | All | Not measured | Absent | Out of scope |
| Junior progression rate | All | Not measured | Absent | Out of scope |
| Median review time per agent PR | Rubber-stamping | Not measured | Absent | No PR introspection |
| PR rejection rate (agent-generated) | Rubber-stamping | Not measured | Absent | No PR introspection |
| Inline comments per approved PR | Rubber-stamping | Not measured | Absent | No PR introspection |
| Rework rate within 1 week of merge | Rubber-stamping | Not measured | Absent | No rework telemetry |
| Governance overhead as % throughput | Governance | Not measured | Absent | No throughput metric |
| False-positive rate on hook blocks | Governance | No hooks; not applicable to OpenSpec | Absent | No policy engine |
| Time-to-update-governance-policy | Governance | Not measured | Absent | Out of scope |
| Incident-prevention rate by control | Governance | Not measured | Absent | No incident telemetry |
| Hook false-negative rate | Governance | No hooks | Absent | No policy engine |

Coverage summary: 0 of 33 metrics fully met; 3 of 33 partially met (specification quality binary, task completion proxy, change archive count proxy); 30 of 33 absent.

#### Gaps

- 30 of 33 manifesto metrics are absent from OpenSpec instrumentation. [Severity: Critical]
- The three partial metrics (specification quality, task completion, archived change count) are documentation proxies, not the operational signals the manifesto requires. [Severity: High]
- No team-health instrumentation, no rubber-stamping detection, no governance-overhead measurement. [Severity: Critical]
- Telemetry surface is intentionally minimal ("We collect only command names and version", `README.md`) and cannot be extended without modifying the framework. [Severity: High]

#### Allianz Implication

EIOPA AI Guidelines mapping in `domains/insurance.md` requires "Ongoing performance monitoring" with "Good fit" to manifesto Principle 9. SR 11-7 model risk management (referenced through Solvency II Articles 121–124 for European insurance) requires that model risk indicators be measured and reported on a defined cadence. OpenSpec produces no such indicators, so an Allianz phase-transition readiness submission to internal model risk committee or to EIOPA cannot demonstrate evidence-based progression. Exposure is regulatory and supervisory; timing is on the next quarterly model risk report and on any EIOPA AI-system supervisory inquiry.

---

### `adoption/roles.md` — Role Transition Assessment

**Alignment grade:** Misaligned

#### What the Document Requires

`adoption/roles.md` describes role evolution from current state through Phase 5: Developers shift to "specification quality, constraint encoding, and outcome acceptance"; Tech Leads to "domain boundaries, decision records, topology choices, and conflict-resolution rules"; QA Engineers to "evaluation portfolios, adversarial coverage, formal-invariant checks where needed, and evidence gates"; Operations Engineers to "behavioural observability, cost routing, memory governance, runtime safety, and chaos drills"; Platform Engineers own agent runtime and memory governance; Domain Owner owns autonomy tier assignment; Product Owner produces a "loop-ready specification"; Specification Analyst translates validated need to spec.

#### What OpenSpec Covers

| Role | OpenSpec Support | Verdict | Evidence |
|---|---|---|---|
| Developer (specification author) | Strong — `/opsx:propose` and `/opsx:continue` scaffold proposal/specs/design/tasks with Given/When/Then scenarios | Met | `docs/concepts.md` spec format; `docs/commands.md` |
| Developer (code reviewer) | Weak — `/opsx:verify` is prose-level coherence check; no diff review surface | Partial | `docs/commands.md` verify dimensions |
| Tech Lead (architecture) | Partial — `design.md` artefact captures architecture decisions ("Decision: Context over Redux", `docs/concepts.md`); no domain-boundary enforcement, no topology specification | Partial | `docs/concepts.md` design artefact |
| QA Engineer (test generation) | Absent — no test harness, no test generation | Absent | No test module in `src/` |
| QA Engineer (evaluation design) | Absent — no evaluation portfolio infrastructure | Absent | No evaluation module in `src/` |
| Operations Engineer (deployment) | Absent — out of declared scope | Absent | README scope statement |
| Operations Engineer (behavioural observability) | Absent — no agent reasoning trace capture | Absent | No observability module |
| Platform Engineer (agent runtime) | Absent — OpenSpec does not run agents; agents invoke the CLI | Absent | `docs/commands.md` slash-command model |
| Platform Engineer (memory governance) | Absent — no learned-memory store | Absent | No memory module |
| Domain Owner (autonomy tier assignment) | Absent — no autonomy tier mechanism | Absent | See Adoption Path Step 1 finding |
| Product Owner (loop-ready specification) | Partial — proposal artefact captures intent and scope ("Intent… Scope… Approach", `docs/concepts.md`); machine-readable acceptance criteria are partially supported via Given/When/Then scenarios | Partial | `docs/concepts.md` proposal example |
| Specification Analyst | Partial — same scaffolding as Product Owner; no separation of business demand validation from spec authoring | Partial | `docs/concepts.md` |

Roles absent from OpenSpec's tooling scope: QA Engineer (both responsibilities), Operations Engineer (both responsibilities), Platform Engineer (both responsibilities), Domain Owner (autonomy tier). Six of twelve role responsibilities are completely unsupported; four are weakly partial; two (Developer-as-spec-author, Specification Analyst) are the framework's strength.

#### Gaps

- Six of twelve role responsibilities have no tooling support; OpenSpec is concentrated on the spec-authoring quadrant only. [Severity: Critical]
- No autonomy-tier-assignment surface for the Domain Owner role. [Severity: Critical]
- No evaluation-portfolio surface for the QA Engineer role. [Severity: Critical]
- No behavioural observability surface for Operations Engineer. [Severity: Critical]
- No agent-runtime or memory-governance surface for Platform Engineer. [Severity: High]
- Product Owner / Specification Analyst separation is not modelled — single proposal author by default. [Severity: Medium]

#### Allianz Implication

Solvency II Article 268 (Outsourcing of critical or important functions) and the EIOPA AI guidelines mapping in `domains/insurance.md` ("Board-level AI accountability" with "Strong" alignment to P12) require named role accountability for each critical AI function. With six of twelve manifesto roles unsupported by OpenSpec tooling, an Allianz Phase 4 deployment requires those roles to operate outside any framework support — creating a documentation-vs-operation gap that internal audit will surface on review. Exposure is operational and audit-trail; timing is on the next internal audit cycle covering AI delivery functions.

---

### `adoption/pilot.md` — Pilot Design Readiness

**Alignment grade:** Partially aligned

#### What the Document Requires

`adoption/pilot.md` requires a pilot domain that is "Bounded… Low-to-medium risk… Well-tested… Owned by a willing team", explicitly excludes "payment processing, authentication, customer-facing decisions with legal or financial impact, and other high-blast-radius or controlled-data workflows", specifies "Duration: 6-8 weeks minimum", "Team size: 3-5 engineers… plus one operations engineer and one QA engineer", "Tier 1 autonomy (agents analyse and propose), with evidence bundles required for every merged change", and pilot success criteria including "Escaped defect rate for agent-generated changes is equal to or lower than the domain's historical baseline."

#### What OpenSpec Covers

- **Pilot selection criteria alignment:** Strong fit for low-to-medium-risk, bounded, well-tested domains (e.g., internal tools, documentation generation, CI/CD improvements). The framework's stated philosophy (`README.md`: "→ easy not complex") aligns with low-ceremony pilot scope. Met for selection scope.
- **Pilot structure compatibility:** Partial. Sprint tracking is unaddressed (no sprint integration). Team-size compatibility is good — the framework imposes no team-size constraints. Scope enforcement is weak — there is no Tier-1 autonomy mechanism, only social convention. Tooling investment is minimal as required (`docs/commands.md`: a single npm package install plus `openspec init`).
- **Pilot success criteria alignment:** Misaligned. Of four pilot success criteria — escaped defect rate, evidence bundle assembly time, lesson capture, specification refinement — only specification refinement is supported (delta specs ADDED/MODIFIED/REMOVED, `docs/concepts.md`). Escaped defect rate, bundle assembly time, and structured lesson capture are all absent.
- **Insurance guard rails from `domains/insurance.md`:** The Hard Autonomy Caps table requires Tier 1 (observe only) for "Underwriting decisions for individual cover", "Claims decisions affecting coverage or payout", "IDD-scope customer advisory", and "SCR calculation using internal model". OpenSpec has no Tier mechanism, so any Allianz pilot that touches these use cases requires additional infrastructure-level controls beyond the framework.

#### Gaps

- No Tier-1 autonomy enforcement mechanism; the pilot's "agents analyse and propose" boundary is enforced socially, not by the framework. [Severity: High]
- No evidence-bundle assembly mechanism, so "evidence bundles required for every merged change" cannot be implemented natively. [Severity: Critical]
- No escaped-defect-rate or bundle-assembly-time instrumentation, so two of four pilot success criteria are unmeasurable. [Severity: High]
- No structured lesson-capture artefact beyond free-text retro notes; "documenting failure patterns" requires bespoke convention. [Severity: Medium]
- No insurance-domain Hard Autonomy Cap enforcement; Allianz must layer Tier-1 controls on the agent runtime, not on OpenSpec. [Severity: High]

**Pilot-feasibility verdict.** OpenSpec is pilot-feasible at Allianz in low-blast-radius internal-tooling domains (developer tooling, documentation generation, internal API scaffolding, CI/CD configuration management) where Tier-1 autonomy is enforced by reviewer convention rather than by framework infrastructure. OpenSpec is not pilot-feasible at Allianz in any domain governed by the Hard Autonomy Caps table in `domains/insurance.md` (underwriting, claims adjudication, IDD-scope advisory, SCR calculation, fraud action triggers, regulated pricing) without specific additional controls supplying autonomy-tier enforcement, evidence-bundle assembly, and escaped-defect instrumentation external to OpenSpec.

#### Allianz Implication

Solvency II Article 41 (system of governance) and EIOPA AI Guidelines (`domains/insurance.md`: "second-line independent challenge") require that pilot programmes for AI systems demonstrate measurable governance readiness before scope expansion. OpenSpec's lack of escaped-defect-rate and evidence-bundle-time instrumentation means an Allianz pilot using OpenSpec alone cannot satisfy the manifesto's pilot-success criteria, which means the second-line challenge function cannot independently validate pilot success. Exposure is regulatory and audit-trail; timing is at pilot exit gate before any expansion decision.

---

### `adoption/vmodel.md` — V-Model Integration

**Alignment grade:** Partially aligned

#### What the Document Requires

`adoption/vmodel.md` requires structural symmetry between five left-arc specification levels (Outcome Specifications, System Specifications, Agent Architecture, Context and Domain Design, Implementation/Agent Execution) and five right-arc verification levels (Per-Agent Evaluation, Cross-Agent Verification, System-Level Evaluation, Acceptance & Accountability, plus the bottom Implementation node). It requires ALCOA+ records at every layer ("Original, Legible, Enduring… Consistent, Complete… Attributable, Accurate… Contemporaneous… Available"). It states "specifications first, verification second, architecture third, autonomy fourth" and warns of failure modes including "Automating implementation before fixing requirement quality."

#### Left arc (specification)

| V-Model Level | OpenSpec Artefact | Produced By | Verdict |
|---|---|---|---|
| Outcome Specifications (P1, P2) | `proposal.md` Intent + Scope sections (`docs/concepts.md`) | `/opsx:propose` or `/opsx:new` + `/opsx:continue` | Partial — captures intent and scope; no risk classification, no blast-radius annotation, no validation criteria distinct from verification criteria |
| System Specifications (P2, P3) | `specs/<capability>/spec.md` with RFC 2119 SHALL/MUST | `/opsx:propose` artefact step | Partial — captures requirements/scenarios; no domain boundary enforcement, no inter-domain typed contracts, no autonomy tier per domain |
| Agent Architecture (P3, P4, P5) | `design.md` Architecture Decisions section (`docs/concepts.md`: "Decision: Context over Redux… Decision: CSS Custom Properties") | `/opsx:propose` artefact step | Partial — captures architecture decisions in prose; no agent topology specification, no autonomy tier per agent, no model-selection rationale field |
| Context and Domain Design (P6, P7, P11) | `design.md` Data Flow section, plus `openspec/config.yaml` `context` block | `/opsx:propose` + repo-level config | Absent — no agent context budget specification, no retrieval configuration, no tool permission registry, no cost-target field |
| Implementation / Agent Execution | `tasks.md` (`docs/concepts.md`: "- [ ] 1.1 Add theme context provider") | `/opsx:apply` (executes via host AI tool, not OpenSpec) | Partial — task list captures execution steps; no harness, no trace capture, no autonomy bound enforced by OpenSpec |

**Left-arc regulatory annotation gaps:** No blast-radius classification field; no regulatory-classification field linking specs to applicable regulations (EU AI Act Annex III, GDPR Article 22, Solvency II Article 121); no risk-tag field. Allianz must overlay these annotations on top of OpenSpec via project-rule conventions.

#### Right arc (verification)

| V-Model Level | OpenSpec Artefact | Produced By | Verdict |
|---|---|---|---|
| Per-Agent Evaluation (P8, P9) | `/opsx:verify` summary report ("CRITICAL, WARNING, or SUGGESTION", `docs/commands.md`) | `/opsx:verify` | Absent — prose-level coherence check; no evaluation portfolio, no holdout, no adversarial cases, no structured trace |
| Cross-Agent Verification (P9, P10) | None | n/a | Absent |
| System-Level Evaluation (P10, P8) | None | n/a | Absent |
| Acceptance & Accountability (P12, P8) | Archive folder (`changes/archive/YYYY-MM-DD-<name>/`) | `/opsx:archive` | Absent — folder preserves prose artefacts; no diff, no test report, no trace ID, no rollback command, no policy check output, no cost accounting, no named-owner sign-off field |
| Bottom (Agent Execution) | `tasks.md` checkboxes | `/opsx:apply` | Partial — completion tracked; no replay, no full trace |

#### ALCOA+ compliance

| ALCOA+ Property | OpenSpec Coverage | Verdict |
|---|---|---|
| Attributable | No author/owner field on artefacts; relies on git commit metadata external to OpenSpec | Absent |
| Contemporaneous | Archive folder is timestamped (`YYYY-MM-DD-<name>`) at archive time, not at artefact-creation time per requirement | Partial |
| Legible | Markdown is human-legible | Met |
| Original | Delta specs preserve ADDED/MODIFIED/REMOVED markers (`docs/concepts.md`); historical originals preserved in archived change folders | Partial |
| Accurate | No verification of artefact accuracy against execution evidence (no execution evidence captured) | Absent |
| Enduring | Local-only filesystem persistence; no central durable store | Partial |
| Complete | No completeness gate; `/opsx:archive` "won't block on incomplete tasks, but will warn" (`docs/commands.md`) | Absent |
| Consistent | No cross-artefact consistency enforcement beyond `/opsx:verify` prose check | Partial |
| Available | Local repo only; not centrally available to supervisors or auditors without per-repo access | Partial |

Three ALCOA+ properties are absent (Attributable, Accurate, Complete); five are partial (Contemporaneous, Original, Enduring, Consistent, Available); one is met (Legible). The consequence for Allianz's V-model regulatory audit evidence: a Solvency II validation report referencing OpenSpec artefacts fails the Validation Standards test on ALCOA+ properties unless Allianz layers attribution, accuracy verification, and completeness enforcement infrastructure outside OpenSpec.

#### Gaps

- Left-arc Context and Domain Design level is largely unsupported (no context budget, no retrieval config, no tool permission registry, no cost target). [Severity: High]
- Right-arc Per-Agent Evaluation, Cross-Agent Verification, System-Level Evaluation are all absent — three of four right-arc levels have no OpenSpec artefact. [Severity: Critical]
- Acceptance & Accountability level is documentation-only, missing all six manifesto-required evidence-bundle components (diff, tests, trace, rollback, policy check, cost). [Severity: Critical]
- ALCOA+ Attributable, Accurate, and Complete are absent; five other properties are partial. [Severity: Critical]
- No regulatory annotation fields (blast radius, regulatory class, risk tag) on any spec or design artefact. [Severity: High]

**Fundamental incompatibility:** OpenSpec's verification model is a prose-level static coherence check between human-authored documents (`/opsx:verify` reports "Implementation matches spec intent" by language inspection), whereas the V-model right arc requires executable evaluation portfolios, structured traces, and machine-checkable verification at every level. For Allianz under Solvency II Articles 121 (statistical quality standards) and 124 (validation standards), this means OpenSpec cannot supply the validation evidence required for an internal model under SCR calculation, and any agent product feeding the SCR remains exposed to a Documentation Standards test failure on supervisory review of the IMAP file.

#### Allianz Implication

Solvency II Article 124 (validation standards) — mapped in `domains/insurance.md` to "P8 independent validation; Stage 3 governance" with "Good fit" — combined with EIOPA AI Guidelines on second-line challenge, requires that validation evidence be independent and reproducible. OpenSpec's three-of-four-absent right arc and three-of-nine-absent ALCOA+ properties leave a validation evidence vacuum that Allianz's internal validation function cannot fill from OpenSpec output alone. Exposure is regulatory and supervisory; timing is on the next IMAP submission and on every annual model validation cycle.

## Part 7 — Companion Framework Alignment

### `companion/frameworks.md` — Maturity Guidance Alignment

**Alignment grade:** Misaligned

#### What the Document Requires

`companion/frameworks.md` defines a six-phase maturity spectrum with named failure modes per phase, asserts that "Maturity is domain-specific, not organization-wide", and states that "phase maturity is a prerequisite for autonomy tier: Phase 3 or below → Tier 1 only, regardless of infrastructure". It enumerates hard autonomy caps for regulated industries — for financial services: `**Financial Services** (credit/insurance decisions; algorithmic trading) | Tier 1 (observe only) | EU AI Act Annex III §5; GDPR Art. 22; MiFID II`. It defines `Blast radius` as "the maximum credible impact of a wrong action across users, data, services, or regulatory obligations." It defines an `Evidence bundle` as "the minimum artifacts needed to justify a change at a given phase and risk tier" with phase-calibrated examples (Phase 4 adds "policy checks and incident tags"; Phase 5+ adds "reproducible replay and, where justified, formal artifacts"). It also enumerates the per-phase failure mode for Phase 3 ("autonomy without verification — the agent said it worked"), Phase 4 ("governance without feedback"), and Phase 5 ("evaluation theater").

#### What OpenSpec Covers

OpenSpec is a specification-authoring and change-management framework for AI coding assistants. Its scope, per `OpenSpec/README.md`, is the workflow: "OpenSpec adds a lightweight spec layer so you agree on what to build before any code is written" and the loop "/opsx:propose → /opsx:archive". Its philosophy in `OpenSpec/docs/concepts.md` reads: "fluid not rigid — no phase gates, work on what makes sense" and "iterative not waterfall — learn as you build, refine as you go". The CLI lifecycle in `OpenSpec/openspec/specs/openspec-conventions/spec.md` lists seven states: `1. Propose`, `2. Review`, `3. Approve`, `4. Implement`, `5. Deploy`, `6. Update`, `7. Archive`.

OpenSpec covers no part of the manifesto's maturity-spectrum requirements. There is no phase concept, no per-phase failure-mode mitigation, no autonomy tier, no blast-radius variable, and no evidence-bundle definition anywhere in `OpenSpec/README.md`, `OpenSpec/AGENTS.md` (empty file), `OpenSpec/openspec/config.yaml`, or `OpenSpec/schemas/spec-driven/schema.yaml`. The verb-noun CLI structure in `openspec-conventions/spec.md` ("OpenSpec CLI design SHALL use verbs as top-level commands") is operational, not maturity-related.

Per-phase failure-mode mitigation assessment:

- Phase 3 — "Autonomy without verification": Absent. OpenSpec defines no autonomy tier and no verification gate that an agent must clear before its output ships. The `/opsx:verify` command exists per `OpenSpec/CHANGELOG.md` 0.20.0 ("Validate that change implementations match their specifications") but verification is optional in the workflow ("4. VERIFY WORK | /opsx:verify (optional)" in `OpenSpec/docs/concepts.md`). Optional verification does not mitigate "autonomy without verification".
- Phase 4 — "Governance without feedback": Absent. There is no feedback channel from production incidents back into the specification or schema. Schema rules in `OpenSpec/openspec/config.yaml` are static; they are not updated by what the system discovers in operation.
- Phase 5 — "Evaluation theater": Absent. OpenSpec has no evaluation portfolio, no holdout, no adversarial-case requirement, and no concept of test distribution. The CLI's `validate` command (`OpenSpec/openspec/specs/cli-validate/spec.md`) validates structural shape of spec markdown, not behavioural correctness against an evaluation distribution.

Mapping OpenSpec's default operating mode against `domains/insurance.md` hard caps: OpenSpec's default workflow lets a single agent produce a proposal, specs, design, tasks, and then implement them via `/opsx:apply`. The `OpenSpec/CHANGELOG.md` 1.2.0 entry describes this: "Propose workflow — New one-step workflow creates a complete change proposal with design, specs, and tasks from a single request — no need to run new then ff separately". The framework provides no infrastructure-level enforcement that would prevent an Allianz underwriting agent from authoring its own specification, generating its own implementation, and merging — i.e., it neither assumes nor implements the Tier 1 (observe only) hard cap that `domains/insurance.md` requires for "Underwriting decisions for individual cover (personal lines)".

#### Gaps

- No maturity phase concept anywhere in OpenSpec source artefacts; the framework cannot calibrate evidence requirements to phase. [Severity: Critical]
- No autonomy tier model; OpenSpec does not distinguish observe-only from production-impacting agent actions. [Severity: Critical]
- No blast-radius classification on changes; `OpenSpec/openspec/specs/openspec-conventions/spec.md` distinguishes only "A proposal SHALL be created for: New features or capabilities; Breaking changes …" — i.e., a binary proposal-required test, not a graded blast-radius assessment over users, data, services, and regulatory obligations. [Severity: High]
- No evidence-bundle concept; archived changes preserve `proposal.md`, `tasks.md`, `design.md`, and delta specs, but there is no Phase-4 policy check, incident tag, or Phase-5 reproducible replay artifact required at archive. [Severity: High]
- Phase 3 failure mode unmitigated: `/opsx:verify` is optional and verifies "implementation matches specifications" — it does not run an evaluation suite or adversarial case set. `OpenSpec/CHANGELOG.md` 0.20.0 confirms verify scope. [Severity: Critical]
- Phase 4 failure mode unmitigated: no incident-feedback loop into specs or rules; rule updates in `OpenSpec/openspec/config.yaml` happen only when a human edits the file. [Severity: High]
- Phase 5 failure mode unmitigated: no evaluation portfolio, no holdout discipline, no adversarial input class. [Severity: Critical]

#### Contradictions

- **Contradiction:** OpenSpec's stated philosophy "fluid not rigid — no phase gates" (`OpenSpec/docs/concepts.md`) directly contradicts `companion/frameworks.md`'s phase-gated evidence model: "Phase 3 or below → Tier 1 only, regardless of infrastructure" and the phase-calibrated evidence examples ("Phase 4: Phase 3 bundle plus policy checks and incident tags"). The companion model requires gates calibrated to phase; OpenSpec advertises the absence of gates as a feature. [Severity: Critical]
- **Contradiction:** OpenSpec's "Dependencies are enablers, not gates. They show what's possible to create, not what you must create next" (`OpenSpec/docs/concepts.md`, Schemas section) contradicts `companion/frameworks.md`'s rule that the companion guide treats certain artifacts as mandatory at each phase ("incomplete bundles block merge" — quoted from the ALCOA+ table row "Complete | Evidence bundles are phase-gated; incomplete bundles block merge"). [Severity: High]
- **Contradiction:** OpenSpec ships no autonomy cap and no infrastructure that could enforce one. This contradicts `companion/frameworks.md`'s rule "These caps are not recommendations — they are regulatory constraints. A Phase 5 team operating at full agentic maturity still cannot exceed these caps." For an Allianz underwriting use case, OpenSpec offers no mechanism that would block an agent from writing-and-applying its own change — exactly the action `domains/insurance.md` Hard Autonomy Caps row "Underwriting decisions for individual cover (personal lines)" forbids. [Severity: Critical]

#### Allianz Implication

Under EU AI Act Annex III §5(b) (high-risk AI systems for creditworthiness and pricing of life and health insurance — referenced in `domains/insurance.md` Hard Autonomy Caps), Allianz is required to maintain a Tier 1 (observe only) cap for individual underwriting decisions. OpenSpec's "fluid, no phase gates" workflow and absence of an autonomy tier model creates immediate regulatory exposure if applied to underwriting, claims adjudication (Tier 1 cap, FCA Consumer Duty), or any IDD-scope advisory agent: there is no infrastructure-level block on a Tier 3 action regardless of the agent's prompt. Exposure is immediate from first deployment in any in-scope use case and would be visible at supervisory review under EIOPA AI Governance Opinion (2021), which requires that "AI governance is integrated into the existing risk management framework". OpenSpec must be augmented with an external tier-enforcement layer before being used on any agent affecting Solvency II Article 112–127 internal model artefacts.

---

### `companion/patterns.md` — Pattern Implementation Assessment

**Alignment grade:** Misaligned

#### What the Document Requires

`companion/patterns.md` defines eight worked patterns (A–H) and two failure patterns (Hallucination Loop, Operational Recovery Cycle). It states the Pattern E escalation protocol verbatim: "Agent pauses migration and emits a structured escalation request" and "System routes the request to the domain owner … requires human approval". For Pattern G it requires "Classify all changes by risk tier using an automated pre-screener built from domain rules and change impact analysis: High-risk … mandatory human review before merge". For the Operational Recovery Cycle it requires steps including "Add or tighten contract/invariant for the violated behavior" and "Re-run verification and canary on constrained scope".

#### What OpenSpec Covers

| Pattern | OpenSpec Implementation | Verdict | Evidence |
| --- | --- | --- | --- |
| A — Single-Domain Reliability Fix | Authors a `proposal.md` with "Why / What Changes / Capabilities / Impact", a `tasks.md` checklist, and delta specs in `specs/<capability>/spec.md`. No regression tests, trace ID, policy check, or rollback command bundle. | Partial | `OpenSpec/schemas/spec-driven/schema.yaml` (proposal `instruction`); `OpenSpec/docs/concepts.md` change folder layout. |
| B — Multi-Agent, Cross-Domain Coordination | OpenSpec is single-track. The workspace concept (`OpenSpec/docs/concepts.md` "Coordination Workspaces") allows coordination across linked repos but explicitly states "Workspace support is under active development and is not ready for use yet. Do not build external automation, integrations, or long-lived workflows on top of workspace behavior." No planner agent, verification agent, coordinator agent, or canary mechanism. | Absent | `OpenSpec/docs/concepts.md` Coordination Workspaces section, verbatim quote above. |
| C — Memory Poisoning Recovery | OpenSpec has no agent memory layer, no retrieval shard, no provenance metadata, and no rollback snapshot. Out of scope. | Absent | `unverified — source artefact does not address X` for memory; `OpenSpec/openspec/specs/` directory listing contains no memory-related spec. |
| D — Economics Routing Decision | Per `OpenSpec/README.md` "Model selection: OpenSpec works best with high-reasoning models. We recommend Opus 4.5 and GPT 5.2 for both planning and implementation." Single-model recommendation; no routing logic. | Absent | `OpenSpec/README.md` Usage Notes section. |
| E — Autonomy Tier Escalation at Runtime | No tier model, therefore no escalation protocol. The CLI workflow steps in `OpenSpec/openspec/specs/openspec-conventions/spec.md` are linear (Propose → Review → Approve → Implement → Deploy → Update → Archive); "Approve" is a human step but not tier-scoped or blast-radius-routed. | Absent | `OpenSpec/openspec/specs/openspec-conventions/spec.md` Change Lifecycle section. |
| F — Governance That Didn't Prevent the Incident | OpenSpec has no governance overlay to fail in this way. Spec-validation is structural (`OpenSpec/openspec/specs/cli-validate/spec.md`: "Validation output SHALL include specific guidance to fix each error, including expected structure, example headers"), not behavioural. | Absent | `OpenSpec/openspec/specs/cli-validate/spec.md`. |
| G — Exception-Based Governance at Scale | The schema instructs proposers to mark "**BREAKING**" changes (`OpenSpec/schemas/spec-driven/schema.yaml` proposal instruction: "Mark breaking changes with **BREAKING**") and `openspec-conventions/spec.md` gives a binary "proposal SHALL be created for: New features … Breaking changes". This is a coarse two-class classification, not the High/Medium/Low risk tier model the pattern requires; it has no automated pre-screener and no statistical sampling cadence. | Absent | `OpenSpec/schemas/spec-driven/schema.yaml`; `OpenSpec/openspec/specs/openspec-conventions/spec.md` "When Changes Require Proposals" section. |
| H — The Persona Simulator | OpenSpec has no simulation mechanism, no evaluation portfolio, and no validate-before-implement loop in the Pattern H sense. | Absent | `unverified — source artefact does not address X` across all OpenSpec specs. |
| Hallucination Loop (failure pattern) | The Hallucination Loop fix requires "Add a contract/invariant: 'timeout retry must not mutate credentials.' Update evaluations with the failure class as a regression test. Gate rollout until traces confirm the corrected behavior." OpenSpec has no contract/invariant primitive, no evaluations, and no trace-gated rollout. | Absent | `OpenSpec/openspec/specs/` listing; no contract or evaluation spec. |
| Operational Recovery Cycle (failure pattern) | OpenSpec offers a manual change loop (author a new `proposal.md` and tasks). It has no canary, no contract tightening primitive, no regression-test artefact requirement at archive. | Absent | `OpenSpec/schemas/spec-driven/schema.yaml`. |

The pattern most operationally relevant to Allianz is Pattern G — Exception-Based Governance at Scale. `domains/insurance.md` Solvency II Model Governance section requires that "The internal model approval process (IMAP) requires the undertaking to demonstrate that the model meets the use test, statistical quality standards, calibration standards, profit and loss attribution, validation standards, and documentation standards" (Solvency II Article 112–127). At agentic-coding scale, an Allianz CoE producing dozens of agent-authored changes per week against insurance-impacting code (claims systems, pricing engines) cannot give every change full IMAP-style scrutiny; the risk-tier pre-screener in Pattern G is the structural answer. OpenSpec's binary "BREAKING" annotation does not satisfy this — it does not differentiate "touches `src/pricing/**`" (high-risk in Pattern G's classification table) from a documentation typo, both of which mark BREAKING or not BREAKING with no infrastructural consequence beyond a string in `proposal.md`.

#### Gaps

- No risk-tier pre-screener; the proposal-or-not test in `openspec-conventions/spec.md` is binary and human-applied. [Severity: Critical]
- No mandatory rollback artefact at archive time; the archive command in `OpenSpec/openspec/specs/openspec-conventions/spec.md` `Archive Process Enhancement` only "programmatically apply delta changes to current specifications using header-based matching", not capture rollback state. [Severity: High]
- No canary or constrained-scope verification step in the Operational Recovery Cycle equivalent. [Severity: High]
- No persona-simulator or behavioural-envelope validation before implementation begins. [Severity: Medium]
- No multi-agent coordination primitive in production-ready state; workspace mode is explicitly "not ready for use yet" per `OpenSpec/docs/concepts.md`. [Severity: Medium]
- No model-routing or fast/strong model split; single-model recommendation only. [Severity: Low]

#### Contradictions

- **Contradiction:** Pattern E requires that infrastructure (not prompt compliance) blocks a tier-2 agent from production-impacting actions: "Infrastructure enforcement — not prompt compliance — must block this." OpenSpec's `openspec-conventions/spec.md` lifecycle relies entirely on the human at step "3. Approve" to provide governance; this is the rubber-stamping pattern Pattern G explicitly identifies as a failure mode ("The supervision paradox: Human review does not scale to machine-speed output"). [Severity: High]
- **Contradiction:** None additionally identified for Patterns A, C, D, F, H, Hallucination Loop, or Operational Recovery Cycle — these are absences (gaps), not active conflicts.

#### Allianz Implication

Under DORA Article 17–23 (ICT-related incident management and reporting — referenced in `domains/insurance.md` Cross-Domain Incident Classification Framework severity table) Allianz must classify and report ICT incidents on strict timelines. Without a Pattern G risk-tier pre-screener and without Pattern E infrastructure-enforced tier escalation, OpenSpec-authored changes affecting `domains/insurance.md` "Fraud detection triggering account/claim action (Tier 2 max)" cannot be reliably classified before merge. Exposure is immediate on the first agent-authored change to a fraud-detection rule and is detected at supervisory review under DORA Article 28 (third-party ICT risk) when Allianz cannot produce a risk classification for the change.

---

### `companion/principles.md` — Principle-Level Design Decisions

**Alignment grade:** Misaligned

#### What the Document Requires

`companion/principles.md` requires that systems address the four correlated failure domains: "Correlated model failure … Correlated retrieval failure … Correlated tool failure … Correlated governance failure". For blast radius it requires (P10 territory) that impact analysis cover "users, data, services, or regulatory obligations" (operational definition lifted from `companion/frameworks.md`, referenced through P10 guidance). For isolation design (P3 / P5) it requires "An agent at Tier 1 physically cannot write to a production database, regardless of what its prompt says" — i.e., enforcement at the infrastructure layer, not the workspace filesystem. The same file requires that infrastructure-level tier enforcement is "declarative permission policies (typically YAML or equivalent), audit logs for every agent action, and guardrail constraints that the agent cannot override regardless of prompt instructions."

#### What OpenSpec Covers

OpenSpec addresses **probability-compounding** and **correlated failure domains** at zero. There is no model-diversity requirement (`OpenSpec/README.md` Usage Notes recommends a single high-reasoning model class), no retrieval layer (and therefore no shard-poisoning risk surface, but also no defence), no tool-chain enumeration, and no governance-failure detection.

OpenSpec addresses **blast radius** at the code-module level only. Quoted verbatim from `OpenSpec/openspec/specs/openspec-conventions/spec.md` `Capability Naming` section: "Capabilities SHALL use: Verb-noun patterns (e.g., `user-auth`, `payment-capture`); Hyphenated lowercase names; Singular focus (one responsibility per capability); No nesting (flat structure under `specs/`)." This bounds change scope to a code capability. It does not extend to data, users, services, or regulatory obligations as `companion/frameworks.md` defines blast radius.

OpenSpec **isolation** is workspace-filesystem-only. The change folder isolation is described in `OpenSpec/docs/concepts.md`: "Each change is self-contained" and "Multiple changes can exist simultaneously without conflicting". This isolates spec authorship between in-flight changes; it does not isolate agent data access, tool access, or production impact at runtime. There is no permission policy file, no audit log specification, and no guardrail constraint primitive in `OpenSpec/openspec/specs/`.

#### Gaps

- No model-correlation defence; OpenSpec's single-model recommendation maximises correlated model failure exposure. [Severity: High]
- No retrieval governance; OpenSpec does not assert a retrieval contract because it has no retrieval layer, but this leaves any retrieval the host agent does ungoverned by the framework. [Severity: Medium]
- No tool-chain enumeration or allow-list; agents using OpenSpec inherit whatever tool surface their host runtime exposes. [Severity: High]
- No governance-failure detection (e.g., approval-latency tracking that `companion/principles.md` calls a "control theater" tell). [Severity: High]
- Blast-radius scope is code-module only; no extension to data classes (PII, GxP, ITAR), user impact, service dependencies, or regulatory obligations. [Severity: Critical]
- Isolation is workspace-filesystem only; no infrastructure-level enforcement of data or tool access boundaries. [Severity: Critical]
- No declarative permission policy file; no audit-log specification; no guardrail-constraint primitive. [Severity: Critical]

For Allianz, the most dangerous correlated failure domain in European insurance and financial services context — anchored to the **highest regulatory exposure** criterion — is **correlated retrieval failure**. `domains/insurance.md` GDPR Article 9 special-category data section warns: "Insurance underwriting decisions based solely on automated processing of special category health or genetic data are subject to GDPR Article 22(4)'s prohibition." If multiple Allianz agents share a poisoned retrieval shard containing health-data exemplars or proxy-discrimination patterns, every agent fed by that shard simultaneously violates GDPR Article 22(4). OpenSpec has zero detection capability here: no retrieval primitive, no provenance metadata, no canary, no health/special-category data classifier in any spec. This is a Critical-severity exposure that OpenSpec does not even surface as in-scope.

#### Contradictions

- **Contradiction:** OpenSpec's "Each change is self-contained" workspace-folder isolation (`OpenSpec/docs/concepts.md`) is positioned as the framework's isolation guarantee, but `companion/principles.md` requires data-and-tool-access enforcement at the infrastructure layer. Workspace-filesystem isolation does not stop an agent operating inside an OpenSpec change folder from calling any tool the host runtime permits. The framework's isolation claim is at the wrong layer for the manifesto's standard. [Severity: High]
- **Contradiction:** OpenSpec's blast-radius implicit model is "code capability" (`Capability Naming` rule "Singular focus"), which contradicts `companion/frameworks.md`'s definition: "the maximum credible impact of a wrong action across users, data, services, or regulatory obligations." A change that touches a single capability can have arbitrary regulatory blast radius (e.g., a change to a single `pricing` capability under Solvency II). [Severity: High]

#### Allianz Implication

Under GDPR Article 22(4) — automated individual decision-making prohibition for special-category data, named in `domains/insurance.md` GDPR section — Allianz must ensure no automated underwriting decision based on health or genetic data ships without a human in the loop. OpenSpec's workspace-only isolation and code-module-only blast radius mean that an OpenSpec-authored change to an underwriting capability ships without any framework-level signal that it has touched a GDPR Article 22(4) decision path. Exposure is immediate on first agent-authored change to underwriting, claims, or pricing code; it would be detected at supervisory review under EIOPA AI Governance Opinion (2021) explainability and fairness expectations.

---

### `companion/guide.md` — Practical Implementation Guidance

**Alignment grade:** Partially aligned

#### What the Document Requires

`companion/guide.md` is a contents index that points to the Annotated Agent Configuration Template defined in `companion/reference.md` (the template was refactored under that file). The template requires: "Owner: [name or team]; Last updated: [date]; Applicable systems"; mandatory sections "Project Overview", "Build, Test, Deploy Commands", "Domain Constraints" ("Never modify [schema/table/config] without a migration file and a rollback"; "Never generate pricing, underwriting, or claims logic — flag for human review"), "Security", "Testing Conventions" ("Coverage threshold: [minimum %, matches hook threshold]"), "Commit and PR Conventions". It also enforces the size bound: "Do not exceed 200 lines. Use @path/to/file imports for larger reference docs."

The CoE review checklist requires verifying: project overview (domain boundary clearly stated); build/test/deploy commands present; domain constraints; security section references enterprise rules; testing conventions including coverage threshold; no credentials/hostnames; under 200 lines.

#### What OpenSpec Covers

OpenSpec scaffolds an agent configuration file. `OpenSpec/CHANGELOG.md` 0.7.0 records: "Always scaffold the managed root `AGENTS.md` hand-off stub and regroup the AI tool prompts during init/update to keep instructions consistent." This is reaffirmed in 0.6.0: "Slim the generated root agent instructions down to a managed hand-off stub". OpenSpec also generates per-tool slash commands across 25+ AI tools per `OpenSpec/README.md`. The OpenSpec self-spec requires `openspec/AGENTS.md` and `openspec/project.md` per `OpenSpec/openspec/specs/openspec-conventions/spec.md` Project Structure scenario:

> ```
> openspec/
> ├── project.md              # Project-specific context
> ├── AGENTS.md               # AI assistant instructions
> ```

The shipped `OpenSpec/AGENTS.md` in the source repository is a 1-line file (verified via `OpenSpec/AGENTS.md` read), confirming the "hand-off stub" model — i.e., the framework's own root file is intentionally minimal.

Per template-section coverage:

- **Project Overview:** Absent. The OpenSpec `AGENTS.md` stub does not require Project Overview content; `openspec/project.md` is described as "Project-specific context" but no schema enforces the Project Overview content required by the manifesto template.
- **Build, Test, Deploy Commands:** Absent. No required section in scaffolded `AGENTS.md` or `project.md` for Build/Test/Deploy. `OpenSpec/openspec/config.yaml` for OpenSpec itself contains a `context` field with stack info but nothing about Build/Test/Deploy commands as the template requires.
- **Domain Constraints:** Absent. No required "Never do X" section. The template's example "Never generate pricing, underwriting, or claims logic" is not even cited in the framework.
- **Security:** Absent. No required Security section in the scaffolded file.
- **Testing Conventions:** Partial. The OpenSpec self-config at `OpenSpec/openspec/config.yaml` `rules.tasks` includes "Add Windows CI verification as a task when changes involve file paths" — i.e., a project-specific rule for testing. This is closer to a content example than a structural mandate; the framework does not require any consumer to populate a Testing Conventions section.
- **Commit and PR Conventions:** Absent. No required section in scaffolded files.
- **Size bound (≤200 lines):** Absent. No size enforcement on `AGENTS.md` or `project.md`. The deliberate "stub" approach in `OpenSpec/CHANGELOG.md` 0.6.0 keeps the framework's *own* root file small but does not enforce the bound on consumer projects.

The CoE checklist mapping:

| Checklist Item | OpenSpec Status | Evidence |
| --- | --- | --- |
| Project overview / domain boundary | Not enforced | No required section in scaffolded `AGENTS.md`. |
| Build/test/deploy commands | Not enforced | No required section. |
| Domain Constraints | Not enforced | No required section. |
| Security section | Not enforced | No required section. |
| Testing Conventions (coverage threshold matching hook) | Allowed via `config.yaml` rules | `OpenSpec/openspec/config.yaml` `rules:` block. |
| No credentials, hostnames | Not enforced by validator | `OpenSpec/openspec/specs/cli-validate/spec.md` validates spec-markdown shape only. |
| Under 200 lines | Not enforced | No length validation. |

#### Gaps

- Scaffolded agent configuration is a "hand-off stub" with no structural sections — does not match the mandatory-section list in the manifesto template. [Severity: High]
- No enforcement of the 200-line size bound on `AGENTS.md` or `project.md`. [Severity: Medium]
- No enforcement that Domain Constraints includes regulated-domain phrases (e.g., "Never generate pricing, underwriting, or claims logic — flag for human review") that `domains/insurance.md` Hard Autonomy Caps require. [Severity: Critical]
- No Security section template; OpenSpec consumers must invent the structure independently. [Severity: High]
- No coverage-threshold-matches-hook discipline in scaffolded testing conventions. [Severity: Medium]
- No CoE-review-checklist artefact; `OpenSpec/openspec/specs/cli-validate/spec.md` validates structural markdown only. [Severity: High]

#### Contradictions

- **Contradiction:** OpenSpec's deliberate "Slim the generated root agent instructions down to a managed hand-off stub" (`OpenSpec/CHANGELOG.md` 0.6.0) directly opposes the manifesto template's mandatory-section list. The manifesto template makes "Project Overview", "Build/Test/Deploy", "Domain Constraints", "Security", "Testing Conventions", "Commit and PR Conventions" all MANDATORY; OpenSpec's design choice is to remove rather than mandate these. [Severity: High]
- **Contradiction:** OpenSpec's `openspec/project.md` and `openspec/AGENTS.md` separate the project context from AI instructions, while the manifesto template puts everything in one ≤200-line file with `@path/to/file imports for larger reference docs`. The two-file split is not a contradiction in itself, but OpenSpec offers no structural mandate or template for either file's content, which contradicts the template's explicit MANDATORY/RECOMMENDED annotations. [Severity: Medium]

#### Allianz Implication

Under EIOPA AI Governance Opinion (2021) governance expectations referenced in `domains/insurance.md` ("EIOPA expects that insurance undertakings have board-level accountability for AI systems") and Solvency II Article 41 (governance system), Allianz must demonstrate that domain constraints — particularly the `domains/insurance.md` Hard Autonomy Caps row "Underwriting decisions for individual cover (personal lines) | Tier 1 (observe only)" — are encoded in the agent instruction layer that governs every coding session. OpenSpec's scaffolded stub contains none of these constraints by default. Allianz adopting OpenSpec must author the missing sections itself before any pilot; the exposure is immediate on first agent-driven change to underwriting, claims, or pricing code, and would be detected at internal audit (3rd line of defence) review of the AI control framework.

---

### `companion/re-framework.md` — Requirements Engineering Assessment

**Alignment grade:** Misaligned

#### What the Document Requires

`companion/re-framework.md` requires every requirements artefact to be placed on the two-axes matrix (system type ∈ {deterministic, agentic, hybrid} × consumer type ∈ {human, agent, hybrid}). It demands probabilistic assurance targets for non-deterministic behaviour: "Probabilistic assurance targets define acceptable performance ranges across an evaluation distribution." It requires the behavioural-envelope four layers ("Layer 1 — Hard boundaries (must never) … enforced structurally (tool removal, permission policy) not by prompt instruction"). It requires the single-source / multiple-projections principle: "One canonical source document … is the source of truth. All other representations are generated or derived from it, not independently authored. When the source changes, all projections must be updated." And the change-control rule: "no projection [is to be] updated independently. The canonical source is updated first; projections are re-derived." (bracket substitution in the verbatim quote complies with the review style guide.)

#### What OpenSpec Covers

OpenSpec sits in the **deterministic-system × hybrid-consumer** cell of the two-axes matrix. The requirements language is RFC-2119 style, deterministic in spirit, intended for both human review and agent execution. Quoted from `OpenSpec/openspec/specs/openspec-conventions/spec.md`:

> "Behavioral specifications SHALL use a structured format with consistent section headers and keywords … Each requirement: `### Requirement: <name>` followed by description. Use SHALL/MUST for normative requirements (avoid should/[the optional keyword])."

This format is appropriate for the deterministic-system × hybrid-consumer cell. For the **agentic-system × any-consumer** cells (which is where insurance underwriting agents, claims agents, fraud agents reside), the cell requires "Behavioral contracts (arXiv:2602.22302). AgentSpec format (arXiv:2503.18666). Enumerated constraints with explicit probability bounds." OpenSpec ships none of these.

Assessment of specific requirements:

- **Machine-readable output with structured acceptance criteria:** Met. `OpenSpec/openspec/specs/openspec-conventions/spec.md` mandates the `### Requirement:` / `#### Scenario:` Given/When/Then structure, and `OpenSpec/openspec/specs/cli-validate/spec.md` validates this structure programmatically. Quoted: "validation tools SHALL flag duplicate headers as errors".
- **INVEST or equivalent quality scoring:** Absent. No INVEST score, no equivalent quality scoring. `OpenSpec/openspec/specs/cli-validate/spec.md` validates shape (presence of `## Purpose`, `## Requirements`, scenario format, descriptive text), not requirement quality.
- **Governance projection as a separate artefact:** Absent. OpenSpec produces `proposal.md`, `spec.md` deltas, `design.md`, `tasks.md`. None of these is a compliance projection mapping the change to NIST AI RMF / ISO 5338 / EU AI Act / Solvency II requirements. `domains/insurance.md` requires explicit Solvency II model documentation projection ("Solvency II model documentation must follow the format prescribed by the applicable supervisory authority"); OpenSpec produces no such projection.
- **Single-source / multiple-projections:** Partial. OpenSpec's archive process (`openspec-conventions/spec.md` Archive Process Enhancement) propagates the delta into the main spec, ensuring `specs/<capability>/spec.md` remains canonical for OpenSpec's own internal consumers. However, OpenSpec performs no automatic update of downstream representations (Azure DevOps stories, Jira tickets, NIST AI RMF compliance mapping, Solvency II IMAP documentation). When a `specs/<capability>/spec.md` changes, no projection is automatically regenerated.
- **Probabilistic assurance targets:** Absent. `OpenSpec/openspec/specs/openspec-conventions/spec.md` mandates SHALL/MUST and tells authors to avoid the weaker RFC-2119 keywords: "Use SHALL/MUST for normative requirements (avoid should/[the optional keyword])." This is hard-requirement-only language. There is no syntax in the spec format for "F1 ≥ 0.85 across a held-out evaluation set of 500 documents with 95% CI lower bound ≥ 0.82".

#### Gaps

- No two-axes classification metadata on requirements; OpenSpec specs are written in a single deterministic-style format regardless of whether the underlying system is deterministic, agentic, or hybrid. [Severity: Critical]
- No probabilistic assurance target syntax; the framework cannot express the assurance contract for non-deterministic agent behaviour. [Severity: Critical]
- No governance projection (NIST AI RMF, ISO 5338, EU AI Act, Solvency II model documentation) generated from the canonical spec. [Severity: Critical]
- No automated downstream-projection synchronisation (ADO/Jira/regulatory artefacts). [Severity: High]
- INVEST or equivalent quality scoring not part of `cli-validate` rules. [Severity: Medium]
- No behavioural-envelope structure in the spec format; no Layer 1 / 2 / 3 / 4 demarcation. [Severity: High]

#### Contradictions

- **Contradiction:** OpenSpec mandates "Use SHALL/MUST for normative requirements (avoid should/[the optional keyword])" (`OpenSpec/schemas/spec-driven/schema.yaml` `specs` instruction, with the weaker RFC-2119 keyword elided to comply with the review style guide). For agentic systems, `companion/re-framework.md` states: "Writing a hard requirement for probabilistic behavior is not more rigorous — it is a category error that will always fail at verification." OpenSpec's house style is the category error for agentic-system requirements. [Severity: Critical]
- **Contradiction:** OpenSpec's `openspec-conventions/spec.md` `Behavior-First Specification Boundary` requires "requirements focus on externally observable behavior, interfaces, error handling, and constraints" and "scenarios remain testable or explicitly verifiable" — this is the deterministic-test paradigm (the requirement is satisfied or not by a single test execution). `companion/re-framework.md` Section 1 "The Paradigm Break" rules: "A requirement stating 'the system shall return X given input Y' cannot be verified by a single test execution. It must be stated as a probabilistic assurance target." [Severity: Critical]

#### Allianz Implication

Under EU AI Act Article 9 (risk management system for high-risk AI) and Article 15 (accuracy, robustness, cybersecurity) referenced by `domains/insurance.md` Hard Autonomy Caps row "Underwriting decisions for individual cover (personal lines) | Regulatory Basis: EU AI Act Annex III §5(b)", Allianz's high-risk AI systems require accuracy metrics expressed as probability distributions and tested against representative datasets. OpenSpec's deterministic-only spec format cannot express the probabilistic assurance target an EU AI Act Article 15 conformity assessment requires. Exposure is immediate at first deployment of any in-scope underwriting, claims, or pricing agent specified through OpenSpec; it will be detected at the EU AI Act Article 43 conformity-assessment audit (applicable from 2 August 2026 per `companion/re-framework.md` Section 7 NFR table).

---

### `companion/reference.md` — Failure Modes Risk Table

**Alignment grade:** Partially aligned

#### What the Document Requires

`companion/reference.md` enumerates eight manifesto failure modes with operational definitions and tells. The corrective principle is summarised verbatim: "The corrective action is always the same: reduce ceremony, increase signal, and measure cycle time, defect rate, and incident severity together."

#### What OpenSpec Covers

| Failure Mode | Definition (1 line, verbatim from `companion/reference.md`) | OpenSpec Risk Level | Evidence |
| --- | --- | --- | --- |
| Over-governance | "Constraints so heavy that human coding becomes faster." | Low | OpenSpec is explicitly anti-ceremony (`OpenSpec/docs/concepts.md`: "easy not complex — lightweight setup, minimal ceremony"). The framework's design optimises for cycle time. Risk of over-governance from OpenSpec itself is low. |
| Evidence theater | "Large bundles with low signal." | Medium | `OpenSpec/schemas/spec-driven/schema.yaml` proposal instruction "Keep it concise (1-2 pages)" and design instruction "Focus on architecture and approach, not line-by-line implementation" actively guard against bloat. However, archived changes are preserved verbatim in `changes/archive/YYYY-MM-DD-<name>/` per `OpenSpec/openspec/specs/openspec-conventions/spec.md`, with no signal-quality audit; volume can grow with no review of which artefacts ever influenced a decision. |
| Control theater | "Humans nominally accountable but operationally blind." | High | OpenSpec's Approve step in the lifecycle (`openspec-conventions/spec.md` Change Lifecycle: "3. Approve: Change is approved for implementation") is unscoped — no risk-tier router (Pattern G), no approval-latency tracking, no rubber-stamping detection. The "human approves" pattern at machine-speed agent output is exactly Control theater's failure mode. |
| Security theater | "Policies documented but not enforced at tool/runtime boundaries." | Critical | `OpenSpec/openspec/specs/openspec-conventions/spec.md` `Domain Constraints` example template line "Never generate pricing, underwriting, or claims logic — flag for human review" (lifted from `companion/reference.md` template) is a documented policy that OpenSpec offers no infrastructure to enforce. The framework has no PreToolUse hook spec, no permission engine, no allow-list. Documented constraints in `AGENTS.md` are aspirational; OpenSpec validates spec markdown shape (`cli-validate/spec.md`), not runtime enforcement. |
| Adoption theater | "Teams adopt the manifesto's vocabulary without its discipline." | High | OpenSpec's `### Requirement:` / `#### Scenario:` ceremony is easy to adopt without any of the manifesto's other disciplines (autonomy tiers, evidence bundles, evaluations, tracing). A team can fully adopt OpenSpec and remain at Phase 2 maturity by the manifesto's own definition. |
| Maturity inflation | "Teams self-assess at Phase 4 or 5 because the phase descriptions are aspirational enough to pattern-match to current practice." | High | OpenSpec produces structured spec artefacts that resemble Phase-4-like evidence at first glance. Without phase-calibrated evidence checks (incident tags, replayable traces), teams using OpenSpec pattern-match their workflow to Phase 4 without producing Phase 4 evidence. |
| Verification without validation | "Every gate passes, evidence bundles are complete, escaped defect rate is low — but the team ships the wrong thing." | High | `/opsx:verify` is described in `OpenSpec/CHANGELOG.md` 0.20.0 as "Validate that change implementations match their specifications" — this is verification, not validation. OpenSpec has no Pattern H persona simulator, no business-outcome connection, no stop-criteria primitive. The framework structurally cannot detect "we shipped the wrong thing because the spec was wrong". |
| Structural regression without detection | "Every change passes current tests, regression suites are green … but the codebase is progressively harder to maintain." | High | OpenSpec has no EvoScore equivalent, no iteration-over-iteration regression-frequency tracking, no coupling/dependency trajectory analysis. Spec-evolution data exists in the archive (`changes/archive/`) but is not analysed for structural-regression signals. |

The highest-risk failure mode for Allianz in European insurance and financial services context is **Security theater** [Critical]. Regulatory basis: `domains/insurance.md` Hard Autonomy Caps section, mapped to EU AI Act Annex III §5(b) (high-risk AI for insurance pricing and risk assessment of life and health insurance) and GDPR Article 22(4) (prohibition on solely-automated decisions based on special category data). These two articles establish hard prohibitions that must be enforced at the infrastructure layer, not merely documented. OpenSpec produces clean documented constraints in `AGENTS.md` and `project.md` (when authored) but enforces none of them. An Allianz CoE that ships an OpenSpec-authored change to an underwriting agent has no framework-level guarantee that GDPR Article 22(4) is honoured at runtime; the constraint exists only as text in a markdown file. This is the canonical Security theater pattern from `companion/reference.md`.

#### Gaps

- No telemetry on which archived `proposal.md` / `design.md` / `tasks.md` artefacts ever influenced a decision; cannot detect Evidence theater drift. [Severity: Medium]
- No approval-latency tracking; cannot detect Control theater rubber-stamping. [Severity: High]
- No PreToolUse hook specification, no permission engine, no allow-list — Security theater risk is structural. [Severity: Critical]
- No phase-calibrated evidence litmus test in `cli-validate`; Maturity inflation risk is structural. [Severity: High]
- No EvoScore or iteration-regression metric; Structural regression is not detectable through OpenSpec. [Severity: High]
- No business-outcome connection or stop-criteria; Verification-without-validation risk is structural. [Severity: High]

#### Contradictions

- **Contradiction:** `companion/reference.md` corrective rule "enforce before you document — if the infrastructure can't block it, the policy is aspirational, not real" is contradicted by OpenSpec's design model: OpenSpec's `domain constraints` section in the agent configuration template is purely documentary; the framework provides no enforcement layer at all. Adopting the OpenSpec template wholesale produces aspirational policies that OpenSpec cannot block. [Severity: Critical]
- **Contradiction:** OpenSpec's "fluid not rigid" philosophy (`OpenSpec/docs/concepts.md`) is in tension with the manifesto's anti-Adoption-theater rule "measure outcomes (escaped defect rate, incident severity, rollback frequency), not adoption checkboxes." OpenSpec ships no outcome measurement; the framework's success indicators (clean specs, archived changes, validation passes) are exactly the adoption-checkbox class the corrective rule warns against. [Severity: High]

#### Allianz Implication

Under DORA Article 5 (ICT risk management framework) and Article 6 (ICT internal governance and control) referenced through `domains/insurance.md` DORA mapping, Allianz must demonstrate that information-security and operational-resilience controls are enforced, not merely documented. The Security-theater risk from OpenSpec adoption — Critical — would surface immediately at the first DORA Article 27 internal audit of the AI/ICT control environment if OpenSpec-encoded `domain constraints` were treated as enforceable controls. Exposure is immediate; detection is at the next DORA-aligned ICT audit cycle.

## Cross-Document Synthesis

### Realistic Adoption Ceiling at Allianz

> `OpenSpec` can support adoption up to Phase 2 in `European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II` contexts without significant additional tooling.

- The framework has no autonomy tier model and no infrastructure layer that blocks an agent at Tier 1 (observe only) from authoring-and-applying a change; under EU AI Act Annex III §5(b) (high-risk AI for life and health insurance pricing — `domains/insurance.md` Hard Autonomy Caps row "Underwriting decisions for individual cover (personal lines)"), Allianz must keep agents at Tier 1 by infrastructure, which OpenSpec cannot supply. This caps unaugmented adoption below the Phase 3 (Agentic Prototyping) threshold (see Part 7 — companion-frameworks; see Part 6 — adoption-path Step 1).
- The archive artefact (`/opsx:archive` produces `changes/archive/YYYY-MM-DD-<name>/` with `proposal.md`, `design.md`, `tasks.md`, delta specs) is missing every Phase-3→4 evidence-bundle component required by the manifesto: no diff, no test report, no trace, no rollback command. Solvency II Article 121 (statistical quality standards) and Article 124 (validation standards) require reproducible documentation; the archive cannot meet those standards (see Part 6 — adoption-path Step 2; see Part 6 — adoption-vmodel; see Part 7 — companion-frameworks).
- `/opsx:verify` is optional ("4. VERIFY WORK | /opsx:verify (optional)") and prose-level; it runs no evaluation suite, no holdout, no adversarial cases. EU AI Act Article 15 (accuracy, robustness, cybersecurity) and the EIOPA AI Governance Opinion (2021) "ongoing performance monitoring" expectation require an executable evaluation portfolio — absent in OpenSpec — so the Phase 3 failure mode "autonomy without verification" is unmitigated (see Part 7 — companion-frameworks; see Part 7 — companion-reference).
- 30 of 33 manifesto adoption metrics are absent (see the metric table in Part 6 — adoption-metrics). Without escaped defect rate, evidence-bundle completeness rate, rollback frequency, or policy-violation rate, Allianz cannot evidence the Phase 3→4 transition required by `adoption/metrics.md`; SR 11-7 (mapped through Solvency II Articles 121–124) requires defined-cadence model-risk indicators that OpenSpec does not produce (see Part 6 — adoption-metrics).
- Six of twelve manifesto roles (QA Engineer × 2, Operations Engineer × 2, Platform Engineer × 2) have no tooling support, and the Domain Owner autonomy-tier-assignment surface is absent. Solvency II Article 268 (outsourcing of critical or important functions) and the EIOPA AI guideline "Board-level AI accountability" require named role accountability; an OpenSpec-only deployment leaves those roles operating outside framework support (see Part 6 — adoption-roles).
- Isolation is workspace-filesystem-only (`OpenSpec/docs/concepts.md` "Each change is self-contained"); there is no declarative permission policy, no audit-log specification, no guardrail-constraint primitive. GDPR Article 22(4) (prohibition on solely-automated decisions based on special-category health data — `domains/insurance.md` GDPR section) requires infrastructure-level enforcement that OpenSpec does not provide (see Part 7 — companion-principles).
- The agent configuration scaffold is a "hand-off stub" (`OpenSpec/CHANGELOG.md` 0.6.0 "Slim the generated root agent instructions down to a managed hand-off stub") with no mandatory Project Overview, Build/Test/Deploy, Domain Constraints, Security, Testing Conventions, or Commit/PR sections. The `domains/insurance.md` Hard Autonomy Caps prohibition phrase "Never generate pricing, underwriting, or claims logic — flag for human review" is not templated; consumers must author it themselves. Under DORA Article 6 (ICT internal governance and control) this leaves the control environment aspirational on day one (see Part 7 — companion-guide; see Part 7 — companion-reference).
- Spec language is hard-requirement RFC-2119 only ("Use SHALL/MUST for normative requirements"); there is no probabilistic-assurance-target syntax. The two-axes classification (deterministic / agentic / hybrid) is not encoded on any artefact. EU AI Act Article 9 (risk management system) and Article 15 (accuracy, robustness, cybersecurity) — applicable to the high-risk row in `domains/insurance.md` — require accuracy metrics expressed as probability distributions, which OpenSpec's spec format cannot represent (see Part 7 — companion-re-framework).

The single binding constraint that defines the ceiling is the absence of any infrastructure-level autonomy-tier enforcement primitive: without a permission policy, audit log, or guardrail-constraint mechanism that OpenSpec itself owns or mandates, every Phase 3+ requirement that depends on tier enforcement (evidence bundles gating merge, regression gates blocking merge, hard-cap blocks for regulated decisions) is unenforceable from inside the framework.

### Highest-Leverage Single Change

Add a first-class, machine-readable **autonomy-tier and evidence-bundle metadata block** to the `proposal.md` and `archive` artefacts, plus a **mandatory `/opsx:verify` policy hook** that reads the block and refuses archive when the bundle does not satisfy the declared tier's required components. Concretely:

- A new top-of-file metadata block in `proposal.md` with named fields: `autonomy_tier` (Tier 1 / Tier 2 / Tier 3), `blast_radius_dimensions` (users, data, services, regulatory_obligations — each with a value), `regulatory_class` (e.g., `EU_AI_Act_Annex_III_5b`, `GDPR_Art_22_4`, `Solvency_II_Art_121`, `DORA_Art_6`), `framework_version`, and `owner` — addressing the version-stamp gap in Part 6 — adoption-path and the regulatory-annotation gap in Part 6 — adoption-vmodel.
- A new `evidence_bundle/` subfolder co-located with the change, mandating, per declared tier, a `diff.patch`, a `tests.json` execution report, a `trace_id` reference, a `rollback.md` command, a `policy_check.json` output, and a `cost.json` accounting — matching the six manifesto evidence-bundle components currently absent from `/opsx:archive` (see Part 6 — adoption-path Step 2; see Part 6 — adoption-vmodel Acceptance & Accountability row).
- Promote `/opsx:verify` from optional to mandatory at archive time, with a non-overridable failure when a Tier 2 or Tier 3 declaration is paired with an incomplete bundle (closing the Part 7 — companion-frameworks Phase-3 unmitigated-verification gap and the Part 7 — companion-reference Security theater Critical risk).

This is the highest-leverage single change because every Phase-3→4 evidence requirement, every Solvency II Article 121/124 documentation expectation, every EU AI Act Article 15 conformity-assessment input, every DORA Article 6 enforced-control demonstration, and every Pattern G risk-tier pre-screener requirement pivots on a single primitive: a machine-readable, gate-enforced bundle that pairs declared tier with declared evidence. No other single change unlocks as many ceiling constraints simultaneously; competing candidates (a permission-policy file alone, an evaluation harness alone, telemetry alone) each address one regulatory exposure but leave the other six listed in the ceiling bullets uncovered.

A secondary change that would unlock additional ceiling: a declarative `tool_permissions.yaml` policy file at the repo root, parsed by `/opsx:apply`, that names the tool surface an agent is permitted to invoke per declared tier — moving the Part 7 — companion-principles isolation gap from workspace-filesystem-only to declarative-permission-policy. This does not displace the bundle change as primary because, without the metadata block, the permission file has no tier signal to attach itself to.

## Part 8 — Maturity Phase Placement

### The Verdict

**Maturity Verdict: Phase 3**

OpenSpec is a spec-authoring and change-folder discipline that elevates teams from `Phase 1 — Guided Exploration ("vibe coding")` and `Phase 2 — Assisted Delivery` (`companion/frameworks.md` lines 18–28) into structured proposals, scenarios, and delta specs. The next-phase claim to Phase 4 is bounded by the absence of three Phase-4 gates from `companion/frameworks.md` line 38 — "autonomy tiers are defined, evaluations gate changes, and basic memory persists across sessions". Evidence for higher placement: `OpenSpec/docs/concepts.md` line 211 ships an RFC-2119 keyword discipline (`"MUST/SHALL — absolute requirement"`) and `OpenSpec/src/commands/validate.ts` line 131 enforces `new Validator(opts.strict)` over the artefact graph, which exceeds Phase 2 ceremony. Evidence overriding the higher claim: (1) no autonomy-tier definition exists — searches across `OpenSpec/src/` return zero hits for `tier`, `autonomy`, `policy envelope`, or `kill switch`; (2) the `validate` gate is structural-only, not a behavioural evaluation gate — `OpenSpec/src/commands/validate.ts` line 173 emits only `"Each requirement MUST include at least one #### Scenario: block"`-class issues, not pass/fail evaluations of agent behaviour against the spec; (3) no evidence-bundle assembler exists — `OpenSpec/src/core/templates/workflows/verify-change.ts` line 78 instructs the human/agent to `"Search codebase for implementation evidence"` as a prompt step, not as a machine-attestable bundle per `manifesto-done.md` lines 127–144 (`"Bundle integrity attestation. The assembled evidence bundle must be"`). This matches Phase 3's canonical failure mode named in `companion/frameworks.md` line 30: `"Failure mode: autonomy without verification"`.

---

### Evidence Matrix

| Gate | Required capability | OpenSpec evidence | Gap |
|---|---|---|---|
| Phase 1 — Guided exploration | "Single prompts, no structure, no governance" (`companion/frameworks.md` line 18) | OpenSpec exceeds this floor. `OpenSpec/openspec/config.yaml` line 1: `schema: spec-driven` mandates artefact structure. | Met — exceeds Phase 1 floor. |
| Phase 2 — Assisted delivery | "AI as autocomplete... humans drive" (`companion/frameworks.md` lines 23–24) | `OpenSpec/docs/concepts.md` lines 304–311 specifies the `"Human + Agent Collaboration"` loop where agents draft artefacts and humans validate. | Met — OpenSpec is purpose-built for this collaboration. |
| Phase 3 — Agentic prototyping (structured specs) | "Agents execute tasks autonomously within a session" with structured prompts (`companion/frameworks.md` lines 28–30) | `OpenSpec/docs/concepts.md` line 354: `"proposal ──────► specs ──────► design ──────► tasks ──────► implement"` codifies a multi-artefact agent workflow with dependency graph at line 564 (`"requires: [specs, design]"`). `OpenSpec/src/commands/validate.ts` line 131: `const validator = new Validator(opts.strict)` enforces structural conformance. | Met — explicit artefact graph and structural validator. |
| Phase 3 — Delta-based brownfield discipline | Spec discipline beyond ad-hoc prompting | `OpenSpec/docs/concepts.md` lines 482–518: `"## ADDED Requirements"`, `"## MODIFIED Requirements"`, `"## REMOVED Requirements"` give a delta grammar with archive merge per line 522 `"Appended to main spec"`. | Met. |
| Phase 4 gate A — Autonomy tiers defined | Phase 4 requires "autonomy tiers are defined" (`companion/frameworks.md` line 38) and `manifesto-principles.md` lines 207–216 enumerate `"Tier 1 — Observe"`, `"Tier 2 — Branch"`, `"Tier 3 — Commit"`, `"Tier 4 — Operate"` with blast-radius semantics. | No tier vocabulary in OpenSpec. `grep -rn "tier\|autonomy" OpenSpec/src/` returns zero matches in a tier sense; `OpenSpec/AGENTS.md` is empty (`wc -l OpenSpec/AGENTS.md` returns `0`). The four `/opsx:propose`, `/opsx:apply`, `/opsx:archive`, `/opsx:verify` commands listed in `OpenSpec/README.md` lines 49–67 do not differentiate by blast radius. | Unmet — bounding gap. |
| Phase 4 gate B — Evaluations gate changes | "evaluations gate changes" (`companion/frameworks.md` line 38). DoD requires "passing evaluations" per `manifesto-done.md` line 123. | `OpenSpec/src/commands/validate.ts` line 173 only emits structural issues `"Each requirement MUST include at least one #### Scenario: block"`. There is no behavioural evaluation harness, no test execution gate, no diff-vs-spec assertion. `OpenSpec/src/core/templates/workflows/verify-change.ts` line 78 instructs `"Search codebase for implementation evidence"` — a prompt, not a gate. | Unmet — bounding gap. |
| Phase 4 gate C — Basic memory persists across sessions | "basic memory persists across sessions" (`companion/frameworks.md` line 38) | The archived change folder per `OpenSpec/docs/concepts.md` line 657 (`"changes/archive/2025-01-23-add-dark-mode/"`) is durable artefact memory of intent and design across sessions. No agent runtime memory layer is wired in. | Partial — artefact memory is real; agent-runtime memory is absent. |
| Phase 4 gate D — Evidence bundle assembled | `manifesto-done.md` lines 123–144: bundle of "passing evaluations... diffs, trace IDs, policy check outputs" with `"Bundle integrity attestation"`. | OpenSpec produces proposal/design/tasks/spec deltas (`OpenSpec/docs/concepts.md` lines 320–328) but no signed bundle, no trace IDs, no policy-check output, no integrity attestation. | Unmet. |
| Phase 5 — Full Agentic Loop with verification, validation, domain-scoped accountability | `governance/phase-level-matrix.md` line 23: `"5 \| Full Agentic Loop with verification, validation, domain-scoped accountability \| Tier 3"`. `manifesto-principles.md` line 487: validation requires `"Did we build the right thing?"` distinct from verification. | OpenSpec does not separate verification from validation; `OpenSpec/src/core/templates/workflows/verify-change.ts` line 78 calls one prompt-driven step `"Search codebase for implementation evidence"`. No domain-scoped accountability assignment per change. | Unmet. |
| Phase 6 — Validated governance infrastructure (Tier 4) | `governance/phase-level-matrix.md` line 24: `"machine-enforced envelopes, control evaluations passing, governance observability, rubber-stamping detection"`. `manifesto-principles.md` line 249: `"If the policy envelope is not machine-enforced... Tier 4 operation is not permitted"`. | Zero matches in `OpenSpec/src/` for `envelope`, `control evaluation`, `rubber-stamp`. Telemetry (`OpenSpec/src/telemetry/index.ts` line 126: `event: 'command_executed'`) captures only command name + version, which is not governance observability. | Unmet. |
| Phase-calibrated DoD at current phase | `manifesto-done.md` line 41: `"At Phase 3, 'verified' means tests and a diff"`; line 362: `"Phase 3: tests, diff, trace link, rollback note"`. | OpenSpec produces the diff (delta spec per `OpenSpec/docs/concepts.md` line 482) and the task checklist (`OpenSpec/docs/concepts.md` line 451 `"Tasks are the implementation checklist"`). It does not produce the test result, the trace link, or the rollback note. | Partial — diff yes; tests / trace link / rollback no. |

---

### Phase Gate Non-Negotiables

| Gate | Required to reach Phase 4 | OpenSpec status | Severity |
|---|---|---|---|
| Autonomy tier definition | `manifesto-principles.md` lines 207–216 require explicit `"Tier 1 — Observe"`, `"Tier 2 — Branch"`, `"Tier 3 — Commit"`, `"Tier 4 — Operate"` with documented blast radius per tier. | unmet — `OpenSpec/AGENTS.md` is empty (size 0); `grep -rn "Tier 1\|Tier 2\|autonomy tier" OpenSpec/` returns zero matches; the workflow surface in `OpenSpec/README.md` line 39 (`/opsx:propose`) and lines 58–67 (`/opsx:apply`, `/opsx:archive`) is tier-agnostic. | Critical |
| Behavioural evaluation gate | `companion/frameworks.md` line 38: `"evaluations gate changes"`; `manifesto-done.md` line 123: `"passing evaluations"` are required components of the bundle. | unmet — `OpenSpec/src/commands/validate.ts` line 173 emits only structural messages: `"Each requirement MUST include at least one #### Scenario: block"`. No behavioural test runner, no agent-vs-spec adjudicator. | Critical |
| Evidence bundle assembly with integrity attestation | `manifesto-done.md` line 144: `"Bundle integrity attestation. The assembled evidence bundle must be"` cryptographically integrity-protected. | unmet — `OpenSpec/src/core/templates/workflows/verify-change.ts` line 78 issues `"Search codebase for implementation evidence"` as an instruction; there is no signed bundle artefact and no integrity check. | Critical |
| Trace link and rollback evidence | `manifesto-done.md` line 362: `"Phase 3: tests, diff, trace link, rollback note"` — even Phase 3 calibration requires a trace link and rollback note. | partial — `OpenSpec/docs/concepts.md` lines 657–671 archive each change to `changes/archive/2025-01-23-add-dark-mode/`, which traces intent → spec but no rollback note artefact is templated. | High |
| Memory persistence across sessions | `companion/frameworks.md` line 38 requires `"basic memory persists across sessions"`. | partial — durable spec/change archive per `OpenSpec/docs/concepts.md` line 635 (`"merging its delta specs into the main specs and preserving the change for history"`) gives artefact memory, but no agent-runtime memory store is wired into `OpenSpec/src/`. | Medium |
| Domain-scoped accountability per change | `manifesto-principles.md` line 487 calls out `"Product / domain owner"` as accountable for validation. | unmet — `OpenSpec/openspec/config.yaml` does not require an owner field and `OpenSpec/src/core/parsers/change-parser.ts` does not enforce one. | High |
| Independent verification vs validation separation | `manifesto-principles.md` line 487 separates verification ("Did we build the thing right?") from validation ("Did we build the right thing?"). | unmet — OpenSpec collapses both into the same human-driven `verify-change` template (`OpenSpec/src/core/templates/workflows/verify-change.ts`). | Medium |

---

### Comparison with Peer Frameworks

No prior framework reviews have been provided (`PRIOR_REVIEWS=none`). Peer comparison therefore relies on `companion/frameworks.md` only.

| Framework family (per `companion/frameworks.md`) | Comparable axis | OpenSpec position |
|---|---|---|
| Level-0/1 "Spicy Autocomplete" tools (`companion/frameworks.md` line 117) | Pure autocomplete, no spec discipline | OpenSpec is materially above this — it imposes proposal/specs/design/tasks structure per `OpenSpec/docs/concepts.md` line 354. |
| Level-2 "Supervised Agents" tools (`companion/frameworks.md` line 119) | Single-session agent execution with prompted structure | Comparable. OpenSpec is the prompt-and-artefact discipline layer for these agents (`OpenSpec/README.md` line 102: `"works with 25+ tools"`). |
| Level-3 "Async Agents" patterns (`companion/frameworks.md` line 125) | Agents run hours, no human review of code | OpenSpec does not enable Level 3 by itself; it lacks the Phase 4 governance the manifesto says is required. `companion/frameworks.md` line 142–144: `"Level 3 safe... advancing levels without advancing phases is how you get Level 4 velocity with Phase 2 governance"`. OpenSpec without external evaluation gates would be a Level-3-velocity / Phase-2-governance trap if pushed beyond Tier 1. |
| Spec Kit (named in `OpenSpec/README.md` line 136) | Heavyweight spec gates | OpenSpec is the lighter peer; both sit at the spec-discipline layer of Phase 3, neither delivers Phase 4 evaluation gates. |

---

### Economics Assessment

Anchored to **P11 (Optimize economics of intelligence)**.

#### 1. Model-Tier Selection Maturity

No evidence of model-tier (Opus / Sonnet / Haiku class) selection logic. `grep -rn "opus\|sonnet\|haiku\|model.tier\|router" OpenSpec/src/` returns zero matches in a model-routing sense (the only `cost` hits are unrelated: `OpenSpec/src/utils/match.ts` line 15 `"const cost = a[i - 1] === b[j - 1] ? 0 : 1"` is a Levenshtein edit-distance constant). `OpenSpec/README.md` line 160 states `"OpenSpec works best with high-reasoning models. We recommend Opus 4.5 and GPT 5.2 for both planning and implementation"` — this is a static recommendation, not a routing capability. Gap relative to Phase 4: no infrastructure to route low-stakes artefact edits to a cheaper tier.

#### 2. Token-Cost Attribution per Workflow

No token accounting. `OpenSpec/src/telemetry/index.ts` line 126 captures `event: 'command_executed'` with `properties: { command: commandName, version: version, surface: 'cli' }` (line 128–130) and explicitly excludes `$ip` (line 131). There is no token count, no model identifier, no per-workflow cost field. The README confirms the privacy posture at line 189: `"We collect only command names and version to understand usage patterns. No arguments, paths, content, or PII"`. Gap: cannot attribute cost to a `proposal` vs `apply` vs `verify` execution.

#### 3. Cost-SLO Existence

No cost ceiling, no per-task budget, no pre-execution warning. `grep -rn "budget\|SLO\|ceiling\|max.cost" OpenSpec/src/` returns zero matches. The validator (`OpenSpec/src/commands/validate.ts`) blocks on structural errors only. Gap relative to Phase 4: a Phase 4 framework warns or blocks before a `apply` run that risks a cost spike on a large change folder.

#### 4. Dynamic Routing Capability

No runtime re-routing. The `/opsx:apply` and `/opsx:verify` commands as documented in `OpenSpec/README.md` lines 58–67 do not consult a cost or quality signal. `OpenSpec/src/core/templates/workflows/verify-change.ts` line 247 issues the same instruction `"Search codebase for implementation evidence"` regardless of change size. Gap: no mechanism to downgrade a change to a cheaper model on cost pressure or upgrade on quality regression.

**Summary:** P11 is unaddressed. OpenSpec inherits whatever cost discipline its host coding agent imposes; it does not contribute any of the four P11 dimensions itself. This is consistent with a Phase 3 placement — Phase 5 expects routing maturity per `manifesto-principles.md` and `governance/phase-level-matrix.md` line 23.

## Part 9 — European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II Assessment (Allianz)

The regulations enumerated below are drawn exclusively from `domains/insurance.md`. Per the file's own scope (`domains/insurance.md` lines 13–18: `"This document reflects Solvency II (Directive 2009/138/EC), EIOPA Guidelines on the Use of AI and ML in Insurance (2021), IDD (Directive 2016/97/EU), GDPR, DORA (EU 2022/2554), FCA ICOBS, and IAIS Insurance Core Principles"`), Allianz's industry context is the European insurance regulatory perimeter. Where `domains/insurance.md` itself references out-of-scope governance frameworks (e.g., references at `domains/insurance.md` lines 56–59 to a behavioural specification artefact, evaluation portfolio, and composite state manifest assembly), those are paraphrased here as "the framework's specification artefact" / "evaluation portfolio" / "the framework's change-record bundle outside the AEM scope" with no propagation of out-of-scope vocabulary.

### The Regulatory Exposure Map

| Regulation | Applicability | OpenSpec Coverage | Gap | Severity |
|---|---|---|---|---|
| Solvency II Article 112–127 — Internal Model Approval (use test, statistical quality, calibration, P&L attribution, validation, documentation) per `domains/insurance.md` lines 53–59 (`"Agent products used in SCR calculation or that feed the technical provisions are internal models under Solvency II Article 112–127"`) | Any OpenSpec-authored agent change touching SCR calculation or technical provisions at Allianz must satisfy the six tests. | OpenSpec produces a delta spec (`OpenSpec/docs/concepts.md` line 482 `"## ADDED Requirements"`) and a task list (`OpenSpec/docs/concepts.md` line 451 `"Tasks are the implementation checklist"`). It does not produce calibration evidence, P&L attribution evidence, or a validation report. `OpenSpec/src/commands/validate.ts` line 173 emits only structural errors `"Each requirement MUST include at least one #### Scenario: block"`. | No actuarial calibration artefact, no statistical-quality test record, no validation-report template; no link from a change folder to the `domains/insurance.md` lines 245–247 mapping (`"Empirical validation — model outputs compared to observed outcomes... P8 evaluation portfolio with backtesting against historical claims"`). | Critical |
| Solvency II model change policy — major vs. minor classification per `domains/insurance.md` lines 79–87 (`"A major model change deployed without supervisory approval is a Solvency II compliance breach"`) | Every Allianz internal-model change routed through OpenSpec must be classified and, when major, gated by supervisory pre-approval before deployment. | `OpenSpec/openspec/config.yaml` does not define a major/minor classification field. `OpenSpec/src/core/templates/workflows/verify-change.ts` line 78 (`"Search codebase for implementation evidence"`) is the only verification step; there is no supervisory-pre-approval gate. | No classification metadata in the change folder schema; no machine-enforced supervisory-approval gate; the four `/opsx:propose`, `/opsx:apply`, `/opsx:archive`, `/opsx:verify` commands per `OpenSpec/README.md` lines 49–67 expose no hold for regulatory pre-approval. | Critical |
| EIOPA AI/ML Guidelines (2021) — board-level AI accountability, second-line independent challenge, explainability for supervisors and affected individuals, fairness and non-discrimination assessment, data governance, ongoing performance monitoring per `domains/insurance.md` lines 105–148 | All material AI use at Allianz, including pricing, underwriting, claims, and customer-facing systems. | OpenSpec does not implement an accountable-owner field per change (`OpenSpec/openspec/config.yaml` has no owner key). No fairness-test definition, no explanation-capability requirement template, no second-line approval step. The structural validator in `OpenSpec/src/commands/validate.ts` line 131 (`new Validator(opts.strict)`) checks artefact shape only. | No board-accountable field, no fairness-test artefact, no explainability requirement, no second-line independent-challenge gate, no operational SLO link. | Critical |
| Insurance Distribution Directive — IDD (Directive 2016/97/EU) — suitability assessment and demands-and-needs statement per `domains/insurance.md` lines 168–175 (`"An agent product that provides insurance advice must perform the suitability assessment"`) | Any OpenSpec-authored Allianz advisory or quotation agent. | OpenSpec's spec grammar (`OpenSpec/docs/concepts.md` line 211 `"MUST/SHALL — absolute requirement"`) expresses "the agent SHALL produce a demands-and-needs statement" as a requirement. However, no behavioural evaluation harness in `OpenSpec/src/` checks whether the deployed agent actually does so. `OpenSpec/src/commands/validate.ts` line 173 verifies that a `#### Scenario:` block exists, not that the implementation passes it. | Behavioural evaluation gate against IDD scenarios is unmet; the suitability check is a documented MUST that no machinery enforces. | High |
| FCA ICOBS and FCA Consumer Duty (PS22/9) per `domains/insurance.md` lines 187–194 (`"Agents providing insurance advice to retail customers must meet ICOBS fair, clear, and not misleading communication standards"`) | Allianz UK retail-distribution channels routed through OpenSpec change folders. | Same as IDD row — RFC-2119 phrasing captures the rule; no runtime enforcement and no customer-outcome SLO is wired into OpenSpec. | No customer-outcome-SLO calibration as required by `domains/insurance.md` line 201 (`"SLO calibration must be against customer outcome metrics, not only technical accuracy"`). | High |
| GDPR Article 9 (special category data) and Article 22 (solely automated decisions) per `domains/insurance.md` lines 205–231 (`"a human must be in the decision loop for every individual underwriting decision based on special category data — not available for review on request, but actually reviewing and accepting responsibility for the decision"`) | Allianz health, life, and personal-lines underwriting and claims agents. | OpenSpec has no human-in-the-loop ceiling, no special-category-data tag in the change folder, no Article-22 escape-valve test. The four-command surface in `OpenSpec/README.md` lines 49–67 does not differentiate decisions by data class. | No data-class metadata, no Article-22 human-in-loop gate, no consent/legal-basis artefact in the change folder. | Critical |
| GDPR Chapter V — cross-border transfer per `domains/insurance.md` lines 233–239 (`"which data can the agent access, through which infrastructure, and under what transfer mechanism"`) | Allianz Group cross-border processing (multi-jurisdiction reinsurance, shared services). | OpenSpec change folders carry no data-residency or transfer-mechanism field. `OpenSpec/openspec/config.yaml` is silent on data classification. | No transfer-mechanism artefact; no infrastructure-binding statement per change. | High |
| EU AI Act — high-risk classification (Annex III §5(b) life and health insurance) per `domains/insurance.md` lines 263–264 (`"EU AI Act Annex III §5(b) (high-risk)"`) and the cross-reference at `regulatory/eu-ai-act-addendum.md` for Articles 9, 14, 15 | Allianz personal-lines underwriting under Annex III §5(b). Triggers Article 9 risk management, Article 14 human oversight, Article 15 accuracy/robustness/cybersecurity. | OpenSpec has no risk-management artefact (Article 9), no human-oversight specification (Article 14), no accuracy/robustness evidence (Article 15). `OpenSpec/src/telemetry/index.ts` line 126 (`event: 'command_executed'`) captures only command name + version, not Article 12 logging content. | No high-risk classification field; no Article 9 / 14 / 15 evidence templates; no Article 12 log-content schema. | Critical |
| DORA (Regulation EU 2022/2554) — ICT third-party risk and register per `domains/insurance.md` line 14 (named in scope) and the cross-reference at `regulatory/foundation-model-third-party-register.md` | Allianz's foundation-model providers and any third-party agent runtime invoked from an OpenSpec workflow. | OpenSpec does not record the model provider, model identifier, or contract-class field for an agent run; `OpenSpec/src/telemetry/index.ts` line 131 explicitly excludes context (`"explicitly excludes $ip"`) and the broader privacy posture in `OpenSpec/README.md` line 189 (`"We collect only command names and version"`) means no third-party register is assembled from OpenSpec telemetry. | No ICT third-party register integration; no exit-strategy artefact per change folder. | High |
| IAIS Insurance Core Principles (named at `domains/insurance.md` line 14) | Group-level supervisory expectations applying to Allianz globally. | OpenSpec is silent on board-level oversight, group governance, and supervisory reporting integration. | No group-supervisory hooks; no ICP-level reporting artefact. | Medium |

Severity labels use the canonical thresholds defined in `prompt.md`.

---

### Use-Case Fitness Analysis

Use-case names below are quoted verbatim from `domains/insurance.md`'s **Hard Autonomy Caps** table (`domains/insurance.md` lines 261–269) and **Market-Specific Autonomy Guidance** table (`domains/insurance.md` lines 275–282). Autonomy-cap ceilings are sourced from `companion/frameworks.md` "Hard Autonomy Caps by Regulated Use Case" (lines 167–188) and the domain-specific cap table in `domains/insurance.md` lines 261–269. Fit verdicts assume OpenSpec's Phase-3 placement from Part 8 — a use case requiring Phase 4 evaluation gates is bounded to Conditional or Unfit.

| Use Case | Autonomy-Cap Ceiling | Fitness | Regulatory Constraint | OpenSpec Limiting Factor |
|---|---|---|---|---|
| `"Underwriting decisions for individual cover (personal lines)"` (`domains/insurance.md` line 263) | **Tier 1 (observe only)** per `domains/insurance.md` line 263 (`"EU AI Act Annex III §5(b) (high-risk); GDPR Art. 22 (health/genetic data); EIOPA AI guidelines"`); reinforced by `companion/frameworks.md` line 180 (`"Financial Services... Tier 1 (observe only)"`). | **Unfit** (without compensating controls outside OpenSpec). | `domains/insurance.md` line 263: `"Agent may analyse and recommend; human underwrites every individual risk. Full explainability required. Fairness testing mandatory."` GDPR Article 22(4) and EU AI Act Annex III §5(b) require human-in-the-loop and high-risk evidence. | OpenSpec has no human-in-the-loop enforcement mechanism, no fairness-test template, no explainability-evidence artefact. The verify-change template at `OpenSpec/src/core/templates/workflows/verify-change.ts` line 78 (`"Search codebase for implementation evidence"`) is a prompt, not a regulatory gate. To become Fit at Tier 1, OpenSpec needs: (a) a mandatory `decision_class` metadata field in the change folder, (b) a fairness-evaluation harness wired into the validator, (c) an explainability-output schema in the spec grammar, (d) a human-decision attestation artefact stored alongside the archive entry. |
| `"Claims decisions affecting coverage or payout"` (`domains/insurance.md` line 264) | **Tier 1 (observe only)** per `domains/insurance.md` line 264 (`"EU AI Act high-risk; FCA Consumer Duty; GDPR Art. 22 where health data involved"`). | **Unfit** (without compensating controls outside OpenSpec). | `domains/insurance.md` line 264: `"Agent may triage and summarise; human adjudicates every claim. Right to contestation must be operational, not nominal."` | OpenSpec has no contestation-evidence artefact and no triage/adjudicate split in its workflow surface. The `/opsx:apply` command in `OpenSpec/README.md` line 58 is decision-class-agnostic. To become Fit, OpenSpec needs a `decision_class=claims_adjudication` gate that blocks `apply` until a human-adjudication record is attached. |
| `"IDD-scope customer advisory (products advice)"` (`domains/insurance.md` line 265) | **Tier 1 (observe only)** per `domains/insurance.md` line 265 (`"IDD suitability requirement; FCA ICOBS"`). | **Unfit** (without compensating controls outside OpenSpec). | `domains/insurance.md` line 265: `"Suitability assessment must be demonstrably connected to individual customer demands and needs. Automated advice without human confirmation is IDD non-compliant in most jurisdictions."` | OpenSpec expresses the suitability MUST as a requirement (`OpenSpec/docs/concepts.md` line 211), but provides no behavioural test that the deployed agent emits a demands-and-needs statement and no human-confirmation gate. To become Fit, OpenSpec needs a behavioural-evaluation runner against a `#### Scenario: IDD-suitability` block and a human-confirmation attestation artefact. |
| `"Fraud detection triggering account/claim action"` (`domains/insurance.md` line 266) | **Tier 2 max** per `domains/insurance.md` line 266 (`"Consumer Duty; GDPR"`). | **Conditional**. | `domains/insurance.md` line 266: `"Agent may score and flag; human authorises account restriction or claim suspension."` | OpenSpec exposes no Tier-2 boundary on `/opsx:apply` and no "score and flag" vs "execute restriction" split. To make Fit, OpenSpec needs: (a) a `tier_ceiling=2` field on the change folder, (b) a downstream connector that blocks any account-restriction action until a human-authorisation artefact is attached. Both controls live outside OpenSpec today; OpenSpec is then a documentation-and-spec layer above an external authorisation engine. |
| `"Pricing optimisation (fleet, commercial, non-personal-lines)"` (`domains/insurance.md` line 267) | **Tier 2 max** per `domains/insurance.md` line 267 (`"EIOPA AI guidelines; indirect discrimination obligation"`). | **Conditional**. | `domains/insurance.md` line 267: `"Agent may optimise; pricing actuary reviews material rate changes before implementation. Proxy discrimination assessment mandatory."` | OpenSpec lacks a proxy-discrimination assessment template and an actuarial-sign-off artefact. To make Fit, OpenSpec needs a `proxy_discrimination_assessment.md` template emitted by `/opsx:propose` and a sign-off field that blocks `/opsx:archive`. |
| `"SCR calculation using internal model"` (`domains/insurance.md` line 268) | **Tier 1 (observe only)** per `domains/insurance.md` line 268 (`"Solvency II Art. 112–127; IMAP use test"`). | **Unfit** (without compensating controls outside OpenSpec). | `domains/insurance.md` line 268: `"Agent output is a model input; the actuarial function owns the SCR output. Agent cannot produce the final SCR without actuarial sign-off."` | OpenSpec has no actuarial-function ownership marker on a change and no IMAP-evidence template. The change-folder schema implied by `OpenSpec/docs/concepts.md` lines 320–328 does not capture the six IMAP tests. To make Fit at Tier 1, OpenSpec needs a Solvency II evidence template (use test, statistical quality, calibration, P&L attribution, validation, documentation) attached to every change touching SCR. |
| `"Back-office automation (document processing, data entry)"` (`domains/insurance.md` line 269) | **Tier 3 available** per `domains/insurance.md` line 269 (`"Minimal regulatory overlay"`). | **Fit** (within OpenSpec's Phase-3 placement and the Tier-1-only ceiling that Phase-3 imposes per `companion/frameworks.md` lines 192–193 `"Phase 3 or below → Tier 1 only, regardless of infrastructure"`). | `domains/insurance.md` line 269: `"Standard manifesto adoption applies. Not in scope for Solvency II internal model governance unless it feeds risk calculation."` | OpenSpec's spec/delta/archive workflow per `OpenSpec/docs/concepts.md` line 354 is a clean fit for back-office automation tasks where blast radius is low. The Phase-3 ceiling caps the deployment at Tier 1 regardless. |
| `"Solvency II internal model support"` (`domains/insurance.md` line 282) | **Tier 1** per `domains/insurance.md` line 282 (`"Solvency II Art. 112–127; EIOPA guidelines"`). | **Conditional**. | `domains/insurance.md` line 282: `"Agent assists model documentation, validation evidence assembly, and change impact analysis. The model itself and all SCR outputs remain human-owned."` | OpenSpec is well-shaped for the documentation-assembly task — the proposal/specs/design/tasks artefacts at `OpenSpec/docs/concepts.md` line 354 align with model documentation. To become Fit, OpenSpec needs a Solvency II model-documentation profile (template + validator extension) so the assembled bundle matches supervisory format. |

---

### The Red Line

The following workflows are regulator-impermissible for Allianz when deployed solely on OpenSpec, regardless of Allianz internal sign-off.

**Solely-automated underwriting using special-category health or genetic data.** `domains/insurance.md` lines 224–231: `"a human must be in the decision loop for every individual underwriting decision based on special category data — not available for review on request, but actually reviewing and accepting responsibility for the decision"`. The controlling regulation is GDPR Article 22(4) read with Article 9. The exact missing OpenSpec control is the absence of a human-in-the-loop attestation artefact tied to the change folder: `OpenSpec/openspec/config.yaml` has no `human_decision_record` field; `OpenSpec/src/core/templates/workflows/verify-change.ts` line 78 issues a prompt (`"Search codebase for implementation evidence"`), not an attestation gate. Until OpenSpec emits and verifies a per-decision human-attestation record, this workflow cannot be deployed.

**Solely-automated insurance advice in IDD jurisdictions.** `domains/insurance.md` line 265: `"Automated advice without human confirmation is IDD non-compliant in most jurisdictions."` The controlling regulation is the Insurance Distribution Directive (Directive 2016/97/EU) suitability assessment requirement read with FCA ICOBS in the UK. The exact missing OpenSpec control is the absence of a human-confirmation artefact in the `/opsx:archive` step (`OpenSpec/README.md` line 65); the change folder closes without a confirmation record. Until OpenSpec blocks archive on a missing IDD-confirmation artefact, this workflow cannot be deployed.

**Solely-automated claims adjudication that affects coverage or payout.** `domains/insurance.md` line 264: `"human adjudicates every claim. Right to contestation must be operational, not nominal."` Controlling regulations: EU AI Act Annex III §5(b) (high-risk under `domains/insurance.md` line 263), FCA Consumer Duty, GDPR Article 22 where health data is involved. Missing OpenSpec control: no contestation-evidence artefact and no human-adjudication gate — the four-command surface in `OpenSpec/README.md` lines 49–67 does not differentiate by decision class.

**SCR calculation outputs published without actuarial sign-off.** `domains/insurance.md` line 268: `"Agent cannot produce the final SCR without actuarial sign-off."` Controlling regulation: Solvency II Article 112–127 (IMAP use test). Missing OpenSpec control: no actuarial-sign-off field on change folders touching SCR, no IMAP-evidence template; `OpenSpec/openspec/config.yaml` does not enforce an actuarial-owner role.

**Major Solvency II internal-model changes deployed without supervisory pre-approval.** `domains/insurance.md` lines 79–87: `"A major model change deployed without supervisory approval is a Solvency II compliance breach"`. Controlling regulation: Solvency II internal-model-change policy under Articles 112–127. Missing OpenSpec control: no major/minor classification field, no supervisory-approval gate on `/opsx:apply` or `/opsx:archive`.

---

### The Deployment Path

Six dependency-ordered stages. Effort labels (S / M / L / XL) use the canonical sizing from `prompt.md`.

**Stage 1 — Back-office automation pilot (OpenSpec as authoring discipline).**
- (a) Named workflows in scope: `"Back-office automation (document processing, data entry)"` (`domains/insurance.md` line 269); `"Policy administration and renewals"` non-advisory tasks per `domains/insurance.md` line 281. Tier 1 only per `companion/frameworks.md` line 192 (`"Phase 3 or below → Tier 1 only"`).
- (b) Gating evidence required before next stage: `OpenSpec/openspec/changes/` archive entries with `proposal.md`, delta-spec (`## ADDED Requirements` per `OpenSpec/docs/concepts.md` line 482), `tasks.md` checklist, and a per-change record of agent activity in an external evidence store; an `agent-inventory-schema.md` register entry per `operational-templates/agent-inventory-schema.md` for every OpenSpec-driven agent with model identifier, owner role, and decision class.
- (c) Effort: M.

**Stage 2 — Owner-attribution and decision-class metadata wired into the change folder.**
- (a) Named workflows in scope: extend Stage 1 workflows with `"Claims document triage and classification"` (`domains/insurance.md` line 277) and `"Regulatory reporting consistency checking"` (`domains/insurance.md` line 279), both at Tier 1.
- (b) Gating evidence: an extension to `OpenSpec/openspec/config.yaml` introducing required fields `accountable_owner`, `decision_class`, `data_class`, `tier_ceiling`, validated by `OpenSpec/src/commands/validate.ts`; an `ai-risk-register.md` entry per `operational-templates/ai-risk-register.md` linked to each change; a second-line review attestation artefact (per `domains/insurance.md` line 116 `"the second line of defence independently challenges AI system outputs"`).
- (c) Effort: M.

**Stage 3 — Behavioural-evaluation gate plugged into `/opsx:verify`.**
- (a) Named workflows in scope: `"Fraud pattern detection and alert generation"` (`domains/insurance.md` line 278) at Tier 1, with a Tier-2 ceiling reachable only after Phase-4 attainment per `companion/frameworks.md` line 193.
- (b) Gating evidence: a behavioural test runner that consumes the `#### Scenario:` blocks defined in `OpenSpec/docs/concepts.md` line 211 RFC-2119 grammar and returns pass/fail (closing the gap identified in `OpenSpec/src/core/templates/workflows/verify-change.ts` line 78); a fairness-evaluation harness per `domains/insurance.md` line 132 (`"The evaluation portfolio at Stage 3 must include a fairness assessment"`); an SLO from `operational-templates/slo-table.md` for output quality rate and feedback-loop closure. Reaching Phase 4 per `companion/frameworks.md` line 38 is the structural precondition for opening Tier 2 use cases.
- (c) Effort: L.

**Stage 4 — Solvency II internal-model support profile.**
- (a) Named workflows in scope: `"Solvency II internal model support"` (`domains/insurance.md` line 282) and `"Actuarial analysis assistance"` (`domains/insurance.md` line 280) at Tier 1.
- (b) Gating evidence: a Solvency II profile extending the OpenSpec spec grammar with the six IMAP test artefacts (use test, statistical quality, calibration, P&L attribution, validation, documentation) per `domains/insurance.md` lines 89–96; a major/minor classification field on the change folder enforced at `/opsx:apply` per `domains/insurance.md` lines 79–87; an actuarial-sign-off attestation stored alongside the archive entry; supervisory-pre-approval gate for major changes; a `decommissioning-checklist.md` artefact per `operational-templates/decommissioning-checklist.md` for any retired internal-model-support agent.
- (c) Effort: L.

**Stage 5 — IDD/ICOBS distribution-support profile.**
- (a) Named workflows in scope: `"IDD-scope customer advisory (products advice)"` (`domains/insurance.md` line 265) at Tier 1 only — agents draft suitability content, humans confirm.
- (b) Gating evidence: an OpenSpec spec template emitting an IDD demands-and-needs statement and a behavioural test that the deployed agent populates it; a human-confirmation attestation field that blocks `/opsx:archive`; a customer-outcome SLO per `domains/insurance.md` line 201 (`"SLO calibration must be against customer outcome metrics, not only technical accuracy"`).
- (c) Effort: L.

**Stage 6 — Personal-lines underwriting and claims adjudication assistance (Tier 1 hard cap).**
- (a) Named workflows in scope: `"Underwriting decisions for individual cover (personal lines)"` (`domains/insurance.md` line 263), `"Claims decisions affecting coverage or payout"` (`domains/insurance.md` line 264) — both at Tier 1 with a permanent ceiling per `domains/insurance.md` lines 261–269.
- (b) Gating evidence: a per-decision human-in-the-loop attestation artefact tied to the change folder closing the GDPR Article 22(4) gap; an EU AI Act high-risk evidence pack covering Article 9 (risk management), Article 14 (human oversight), Article 15 (accuracy/robustness/cybersecurity) per the Annex III §5(b) classification at `domains/insurance.md` line 263; a fairness-test result; an explainability-output schema; a contestation-evidence record; a DORA ICT third-party register entry per `regulatory/foundation-model-third-party-register.md` for every foundation-model provider; a board-level risk-appetite ceiling per `operational-templates/risk-appetite-statement.md`.
- (c) Effort: XL.

The path is dependency-ordered: Stage 1 establishes the evidence-archive substrate; Stage 2 adds the metadata schema that all later regulatory profiles read; Stage 3 closes the Phase-4 evaluation-gate gap and unlocks Tier-2-eligible use cases; Stage 4 layers the Solvency II profile on top; Stage 5 layers the IDD profile; Stage 6 layers the high-risk personal-lines profile. Stages 4–6 cannot deploy until Stage 3 is complete because each high-risk profile depends on a working behavioural-evaluation gate.

