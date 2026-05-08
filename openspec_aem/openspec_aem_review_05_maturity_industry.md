# OpenSpec Review 05 — Maturity Phase Placement and European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II Assessment

**Framework reviewed:** OpenSpec
**Framework version:** 1.3.1
**Client context:** Allianz — European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II
**Source artefacts read:**
- `OpenSpec/README.md`
- `OpenSpec/AGENTS.md`
- `OpenSpec/docs/concepts.md`
- `OpenSpec/docs/workflows.md` (directory listing)
- `OpenSpec/docs/commands.md` (directory listing)
- `OpenSpec/docs/getting-started.md` (directory listing)
- `OpenSpec/openspec/config.yaml`
- `OpenSpec/src/cli/index.ts`
- `OpenSpec/src/commands/validate.ts`
- `OpenSpec/src/core/validation/validator.ts`
- `OpenSpec/src/telemetry/index.ts`
- `OpenSpec/src/telemetry/config.ts`
- `OpenSpec/src/core/templates/workflows/verify-change.ts`
- `OpenSpec/src/core/templates/workflows/bulk-archive-change.ts`
- `OpenSpec/openspec/specs/` (directory listing)
- `OpenSpec/openspec/changes/` (directory listing)
- `manifesto.md`
- `manifesto-principles.md`
- `manifesto-done.md`
- `companion/frameworks.md`
- `companion/principles.md`
- `governance/phase-level-matrix.md` (AEM column only)
- `governance/governance-integration-note.md` (AEM Tier 4 prerequisites only)
- `domains/insurance.md`
- `governance/authority-accountability-matrix.md` (AEM column only)
- `operational-templates/agent-inventory-schema.md`
- `operational-templates/ai-risk-register.md`
- `operational-templates/risk-appetite-statement.md`
- `operational-templates/slo-table.md`
- `operational-templates/decommissioning-checklist.md`
- `regulatory/eu-ai-act-addendum.md` (Annex III §5(b); Articles 9, 14, 15)
- `regulatory/foundation-model-third-party-register.md` (DORA Pillar 4 register)

**Prior reviews:** none
**Review date:** 2026-05-08
**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@08123c263794b5cc24dbb3e1a5897a74288026e9`

---

## Part 8 — Maturity Phase Placement

> Note: This file includes Part 8 (from agent 05a) verbatim and adds Part 9 below.

### The Verdict

**Maturity Verdict: Phase 3**

OpenSpec is a spec-authoring and change-folder discipline that elevates teams from `Phase 1 — Guided Exploration ("vibe coding")` and `Phase 2 — Assisted Delivery` (`companion/frameworks.md` lines 18–28) into structured proposals, scenarios, and delta specs. The next-phase claim to Phase 4 is bounded by the absence of three Phase-4 gates from `companion/frameworks.md` line 38 — "autonomy tiers are defined, evaluations gate changes, and basic memory persists across sessions". Evidence for higher placement: `OpenSpec/docs/concepts.md` line 211 ships an RFC-2119 keyword discipline (`"MUST/SHALL — absolute requirement"`) and `OpenSpec/src/commands/validate.ts` line 131 enforces `new Validator(opts.strict)` over the artefact graph, which exceeds Phase 2 ceremony. Evidence overriding the higher claim: (1) no autonomy-tier definition exists — searches across `OpenSpec/src/` return zero hits for `tier`, `autonomy`, `policy envelope`, or `kill switch`; (2) the `validate` gate is structural-only, not a behavioural evaluation gate — `OpenSpec/src/commands/validate.ts` line 173 emits only `"Each requirement MUST include at least one #### Scenario: block"`-class issues, not pass/fail evaluations of agent behaviour against the spec; (3) no evidence-bundle assembler exists — `OpenSpec/src/core/templates/workflows/verify-change.ts` line 78 instructs the human/agent to `"Search codebase for implementation evidence"` as a prompt step, not as a machine-attestable bundle per `manifesto-done.md` lines 127–144 (`"Bundle integrity attestation. The assembled evidence bundle must be"`). This matches Phase 3's canonical failure mode named in `companion/frameworks.md` line 30: `"Failure mode: autonomy without verification"`.

---

### Evidence Matrix

| Gate | Required capability | OpenSpec evidence | Gap |
|---|---|---|---|
| Phase 1 — Guided exploration | "Single prompts, no structure, no governance" (`companion/frameworks.md` line 18) | OpenSpec exceeds this floor. `OpenSpec/openspec/config.yaml` line 1: `schema: spec-driven` mandates artefact structure. | ✅ Met — exceeds Phase 1 floor. |
| Phase 2 — Assisted delivery | "AI as autocomplete... humans drive" (`companion/frameworks.md` lines 23–24) | `OpenSpec/docs/concepts.md` lines 304–311 specifies the `"Human + Agent Collaboration"` loop where agents draft artefacts and humans validate. | ✅ Met — OpenSpec is purpose-built for this collaboration. |
| Phase 3 — Agentic prototyping (structured specs) | "Agents execute tasks autonomously within a session" with structured prompts (`companion/frameworks.md` lines 28–30) | `OpenSpec/docs/concepts.md` line 354: `"proposal ──────► specs ──────► design ──────► tasks ──────► implement"` codifies a multi-artefact agent workflow with dependency graph at line 564 (`"requires: [specs, design]"`). `OpenSpec/src/commands/validate.ts` line 131: `const validator = new Validator(opts.strict)` enforces structural conformance. | ✅ Met — explicit artefact graph and structural validator. |
| Phase 3 — Delta-based brownfield discipline | Spec discipline beyond ad-hoc prompting | `OpenSpec/docs/concepts.md` lines 482–518: `"## ADDED Requirements"`, `"## MODIFIED Requirements"`, `"## REMOVED Requirements"` give a delta grammar with archive merge per line 522 `"Appended to main spec"`. | ✅ Met. |
| Phase 4 gate A — Autonomy tiers defined | Phase 4 requires "autonomy tiers are defined" (`companion/frameworks.md` line 38) and `manifesto-principles.md` lines 207–216 enumerate `"Tier 1 — Observe"`, `"Tier 2 — Branch"`, `"Tier 3 — Commit"`, `"Tier 4 — Operate"` with blast-radius semantics. | No tier vocabulary in OpenSpec. `grep -rn "tier\|autonomy" OpenSpec/src/` returns zero matches in a tier sense; `OpenSpec/AGENTS.md` is empty (`wc -l OpenSpec/AGENTS.md` returns `0`). The four `/opsx:propose`, `/opsx:apply`, `/opsx:archive`, `/opsx:verify` commands listed in `OpenSpec/README.md` lines 49–67 do not differentiate by blast radius. | ❌ Unmet — bounding gap. |
| Phase 4 gate B — Evaluations gate changes | "evaluations gate changes" (`companion/frameworks.md` line 38). DoD requires "passing evaluations" per `manifesto-done.md` line 123. | `OpenSpec/src/commands/validate.ts` line 173 only emits structural issues `"Each requirement MUST include at least one #### Scenario: block"`. There is no behavioural evaluation harness, no test execution gate, no diff-vs-spec assertion. `OpenSpec/src/core/templates/workflows/verify-change.ts` line 78 instructs `"Search codebase for implementation evidence"` — a prompt, not a gate. | ❌ Unmet — bounding gap. |
| Phase 4 gate C — Basic memory persists across sessions | "basic memory persists across sessions" (`companion/frameworks.md` line 38) | The archived change folder per `OpenSpec/docs/concepts.md` line 657 (`"changes/archive/2025-01-23-add-dark-mode/"`) is durable artefact memory of intent and design across sessions. No agent runtime memory layer is wired in. | 🟡 Partial — artefact memory is real; agent-runtime memory is absent. |
| Phase 4 gate D — Evidence bundle assembled | `manifesto-done.md` lines 123–144: bundle of "passing evaluations... diffs, trace IDs, policy check outputs" with `"Bundle integrity attestation"`. | OpenSpec produces proposal/design/tasks/spec deltas (`OpenSpec/docs/concepts.md` lines 320–328) but no signed bundle, no trace IDs, no policy-check output, no integrity attestation. | ❌ Unmet. |
| Phase 5 — Full Agentic Loop with verification, validation, domain-scoped accountability | `governance/phase-level-matrix.md` line 23: `"5 \| Full Agentic Loop with verification, validation, domain-scoped accountability \| Tier 3"`. `manifesto-principles.md` line 487: validation requires `"Did we build the right thing?"` distinct from verification. | OpenSpec does not separate verification from validation; `OpenSpec/src/core/templates/workflows/verify-change.ts` line 78 calls one prompt-driven step `"Search codebase for implementation evidence"`. No domain-scoped accountability assignment per change. | ❌ Unmet. |
| Phase 6 — Validated governance infrastructure (Tier 4) | `governance/phase-level-matrix.md` line 24: `"machine-enforced envelopes, control evaluations passing, governance observability, rubber-stamping detection"`. `manifesto-principles.md` line 249: `"If the policy envelope is not machine-enforced... Tier 4 operation is not permitted"`. | Zero matches in `OpenSpec/src/` for `envelope`, `control evaluation`, `rubber-stamp`. Telemetry (`OpenSpec/src/telemetry/index.ts` line 126: `event: 'command_executed'`) captures only command name + version, which is not governance observability. | ❌ Unmet. |
| Phase-calibrated DoD at current phase | `manifesto-done.md` line 41: `"At Phase 3, 'verified' means tests and a diff"`; line 362: `"Phase 3: tests, diff, trace link, rollback note"`. | OpenSpec produces the diff (delta spec per `OpenSpec/docs/concepts.md` line 482) and the task checklist (`OpenSpec/docs/concepts.md` line 451 `"Tasks are the implementation checklist"`). It does not produce the test result, the trace link, or the rollback note. | 🟡 Partial — diff yes; tests / trace link / rollback no. |

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

No cost ceiling, no per-task budget, no pre-execution warning. `grep -rn "budget\|SLO\|ceiling\|max.cost" OpenSpec/src/` returns zero matches. The validator (`OpenSpec/src/commands/validate.ts`) blocks on structural errors only. Gap relative to Phase 4: a Phase 4 framework should warn or block before a `apply` run that risks a cost spike on a large change folder.

#### 4. Dynamic Routing Capability

No runtime re-routing. The `/opsx:apply` and `/opsx:verify` commands as documented in `OpenSpec/README.md` lines 58–67 do not consult a cost or quality signal. `OpenSpec/src/core/templates/workflows/verify-change.ts` line 247 issues the same instruction `"Search codebase for implementation evidence"` regardless of change size. Gap: no mechanism to downgrade a change to a cheaper model on cost pressure or upgrade on quality regression.

**Summary:** P11 is unaddressed. OpenSpec inherits whatever cost discipline its host coding agent imposes; it does not contribute any of the four P11 dimensions itself. This is consistent with a Phase 3 placement — Phase 5 expects routing maturity per `manifesto-principles.md` and `governance/phase-level-matrix.md` line 23.

---

## Part 9 — European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II Assessment (Allianz)

The regulations enumerated below are drawn exclusively from `domains/insurance.md`. Per the file's own scope (`domains/insurance.md` lines 13–18: `"This document reflects Solvency II (Directive 2009/138/EC), EIOPA Guidelines on the Use of AI and ML in Insurance (2021), IDD (Directive 2016/97/EU), GDPR, DORA (EU 2022/2554), FCA ICOBS, and IAIS Insurance Core Principles"`), Allianz's industry context is the European insurance regulatory perimeter. Where `domains/insurance.md` itself references out-of-scope governance frameworks (e.g., references at `domains/insurance.md` lines 56–59 to a behavioural specification artefact, evaluation portfolio, and composite state manifest assembly), those are paraphrased here as "the framework's specification artefact" / "evaluation portfolio" / "the framework's change-record bundle outside the AEM scope" with no propagation of out-of-scope vocabulary.

### The Regulatory Exposure Map

| Regulation | Applicability | OpenSpec Coverage | Gap | Severity |
|---|---|---|---|---|
| Solvency II Article 112–127 — Internal Model Approval (use test, statistical quality, calibration, P&L attribution, validation, documentation) per `domains/insurance.md` lines 53–59 (`"Agent products used in SCR calculation or that feed the technical provisions are internal models under Solvency II Article 112–127"`) | Any OpenSpec-authored agent change touching SCR calculation or technical provisions at Allianz must satisfy the six tests. | OpenSpec produces a delta spec (`OpenSpec/docs/concepts.md` line 482 `"## ADDED Requirements"`) and a task list (`OpenSpec/docs/concepts.md` line 451 `"Tasks are the implementation checklist"`). It does not produce calibration evidence, P&L attribution evidence, or a validation report. `OpenSpec/src/commands/validate.ts` line 173 emits only structural errors `"Each requirement MUST include at least one #### Scenario: block"`. | No actuarial calibration artefact, no statistical-quality test record, no validation-report template; no link from a change folder to the `domains/insurance.md` lines 245–247 mapping (`"Empirical validation — model outputs compared to observed outcomes... P8 evaluation portfolio with backtesting against historical claims"`). | Critical |
| Solvency II model change policy — major vs. minor classification per `domains/insurance.md` lines 79–87 (`"A major model change deployed without supervisory approval is a Solvency II compliance breach"`) | Every Allianz internal-model change routed through OpenSpec must be classified and, when major, gated by supervisory pre-approval before deployment. | `OpenSpec/openspec/config.yaml` does not define a major/minor classification field. `OpenSpec/src/core/templates/workflows/verify-change.ts` line 78 (`"Search codebase for implementation evidence"`) is the only verification step; there is no supervisory-pre-approval gate. | No classification metadata in the change folder schema; no machine-enforced supervisory-approval gate; the four `/opsx:propose`, `/opsx:apply`, `/opsx:archive`, `/opsx:verify` commands per `OpenSpec/README.md` lines 49–67 expose no hold for regulatory pre-approval. | Critical |
| EIOPA AI/ML Guidelines (2021) — board-level AI accountability, second-line independent challenge, explainability for supervisors and affected individuals, fairness and non-discrimination assessment, data governance, ongoing performance monitoring per `domains/insurance.md` lines 105–148 | All material AI use at Allianz, including pricing, underwriting, claims, and customer-facing systems. | OpenSpec does not implement an accountable-owner field per change (`OpenSpec/openspec/config.yaml` has no owner key). No fairness-test definition, no explanation-capability requirement template, no second-line approval step. The structural validator in `OpenSpec/src/commands/validate.ts` line 131 (`new Validator(opts.strict)`) checks artefact shape only. | No board-accountable field, no fairness-test artefact, no explainability requirement, no second-line independent-challenge gate, no operational SLO link. | Critical |
| Insurance Distribution Directive — IDD (Directive 2016/97/EU) — suitability assessment and demands-and-needs statement per `domains/insurance.md` lines 168–175 (`"An agent product that provides insurance advice must perform the suitability assessment"`) | Any OpenSpec-authored Allianz advisory or quotation agent. | OpenSpec's spec grammar (`OpenSpec/docs/concepts.md` line 211 `"MUST/SHALL — absolute requirement"`) can express "the agent SHALL produce a demands-and-needs statement" as a requirement. However, no behavioural evaluation harness in `OpenSpec/src/` checks whether the deployed agent actually does so. `OpenSpec/src/commands/validate.ts` line 173 verifies that a `#### Scenario:` block exists, not that the implementation passes it. | Behavioural evaluation gate against IDD scenarios is unmet; the suitability check is a documented MUST that no machinery enforces. | High |
| FCA ICOBS and FCA Consumer Duty (PS22/9) per `domains/insurance.md` lines 187–194 (`"Agents providing insurance advice to retail customers must meet ICOBS fair, clear, and not misleading communication standards"`) | Allianz UK retail-distribution channels routed through OpenSpec change folders. | Same as IDD row — RFC-2119 phrasing can capture the rule; no runtime enforcement and no customer-outcome SLO is wired into OpenSpec. | No customer-outcome-SLO calibration as required by `domains/insurance.md` line 201 (`"SLO calibration must be against customer outcome metrics, not only technical accuracy"`). | High |
| GDPR Article 9 (special category data) and Article 22 (solely automated decisions) per `domains/insurance.md` lines 205–231 (`"a human must be in the decision loop for every individual underwriting decision based on special category data — not available for review on request, but actually reviewing and accepting responsibility for the decision"`) | Allianz health, life, and personal-lines underwriting and claims agents. | OpenSpec has no human-in-the-loop ceiling, no special-category-data tag in the change folder, no Article-22 escape-valve test. The four-command surface in `OpenSpec/README.md` lines 49–67 does not differentiate decisions by data class. | No data-class metadata, no Article-22 human-in-loop gate, no consent/legal-basis artefact in the change folder. | Critical |
| GDPR Chapter V — cross-border transfer per `domains/insurance.md` lines 233–239 (`"which data can the agent access, through which infrastructure, and under what transfer mechanism"`) | Allianz Group cross-border processing (multi-jurisdiction reinsurance, shared services). | OpenSpec change folders carry no data-residency or transfer-mechanism field. `OpenSpec/openspec/config.yaml` is silent on data classification. | No transfer-mechanism artefact; no infrastructure-binding statement per change. | High |
| EU AI Act — high-risk classification (Annex III §5(b) life and health insurance) per `domains/insurance.md` lines 263–264 (`"EU AI Act Annex III §5(b) (high-risk)"`) and the cross-reference at `regulatory/eu-ai-act-addendum.md` for Articles 9, 14, 15 | Allianz personal-lines underwriting under Annex III §5(b). Triggers Article 9 risk management, Article 14 human oversight, Article 15 accuracy/robustness/cybersecurity. | OpenSpec has no risk-management artefact (Article 9), no human-oversight specification (Article 14), no accuracy/robustness evidence (Article 15). `OpenSpec/src/telemetry/index.ts` line 126 (`event: 'command_executed'`) captures only command name + version, not Article 12 logging content. | No high-risk classification field; no Article 9 / 14 / 15 evidence templates; no Article 12 log-content schema. | Critical |
| DORA (Regulation EU 2022/2554) — ICT third-party risk and register per `domains/insurance.md` line 14 (named in scope) and the cross-reference at `regulatory/foundation-model-third-party-register.md` | Allianz's foundation-model providers and any third-party agent runtime invoked from an OpenSpec workflow. | OpenSpec does not record the model provider, model identifier, or contract-class field for an agent run; `OpenSpec/src/telemetry/index.ts` line 131 explicitly excludes context (`"explicitly excludes $ip"`) and the broader privacy posture in `OpenSpec/README.md` line 189 (`"We collect only command names and version"`) means no third-party register can be assembled from OpenSpec telemetry. | No ICT third-party register integration; no exit-strategy artefact per change folder. | High |
| IAIS Insurance Core Principles (named at `domains/insurance.md` line 14) | Group-level supervisory expectations applying to Allianz globally. | OpenSpec is silent on board-level oversight, group governance, and supervisory reporting integration. | No group-supervisory hooks; no ICP-level reporting artefact. | Medium |

Severity labels use the canonical thresholds defined in `prompt.md`.

---

### Use-Case Fitness Analysis

Use-case names below are quoted verbatim from `domains/insurance.md`'s **Hard Autonomy Caps** table (`domains/insurance.md` lines 261–269) and **Market-Specific Autonomy Guidance** table (`domains/insurance.md` lines 275–282). Autonomy-cap ceilings are sourced from `companion/frameworks.md` "Hard Autonomy Caps by Regulated Use Case" (lines 167–188) and the domain-specific cap table in `domains/insurance.md` lines 261–269. Fit verdicts assume OpenSpec's Phase-3 placement from Part 8 — a use case requiring Phase 4 evaluation gates is bounded to Conditional or Unfit.

| Use Case | Autonomy-Cap Ceiling | Fitness | Regulatory Constraint | OpenSpec Limiting Factor |
|---|---|---|---|---|
| `"Underwriting decisions for individual cover (personal lines)"` (`domains/insurance.md` line 263) | **Tier 1 (observe only)** per `domains/insurance.md` line 263 (`"EU AI Act Annex III §5(b) (high-risk); GDPR Art. 22 (health/genetic data); EIOPA AI guidelines"`); reinforced by `companion/frameworks.md` line 180 (`"Financial Services... Tier 1 (observe only)"`). | **Unfit** (without compensating controls outside OpenSpec). | `domains/insurance.md` line 263: `"Agent may analyse and recommend; human underwrites every individual risk. Full explainability required. Fairness testing mandatory."` GDPR Article 22(4) and EU AI Act Annex III §5(b) require human-in-the-loop and high-risk evidence. | OpenSpec has no human-in-the-loop enforcement mechanism, no fairness-test template, no explainability-evidence artefact. The verify-change template at `OpenSpec/src/core/templates/workflows/verify-change.ts` line 78 (`"Search codebase for implementation evidence"`) is a prompt, not a regulatory gate. To become Fit at Tier 1, OpenSpec would need: (a) a mandatory `decision_class` metadata field in the change folder, (b) a fairness-evaluation harness wired into the validator, (c) an explainability-output schema in the spec grammar, (d) a human-decision attestation artefact stored alongside the archive entry. |
| `"Claims decisions affecting coverage or payout"` (`domains/insurance.md` line 264) | **Tier 1 (observe only)** per `domains/insurance.md` line 264 (`"EU AI Act high-risk; FCA Consumer Duty; GDPR Art. 22 where health data involved"`). | **Unfit** (without compensating controls outside OpenSpec). | `domains/insurance.md` line 264: `"Agent may triage and summarise; human adjudicates every claim. Right to contestation must be operational, not nominal."` | OpenSpec has no contestation-evidence artefact and no triage/adjudicate split in its workflow surface. The `/opsx:apply` command in `OpenSpec/README.md` line 58 is decision-class-agnostic. To become Fit, OpenSpec would need a `decision_class=claims_adjudication` gate that blocks `apply` until a human-adjudication record is attached. |
| `"IDD-scope customer advisory (products advice)"` (`domains/insurance.md` line 265) | **Tier 1 (observe only)** per `domains/insurance.md` line 265 (`"IDD suitability requirement; FCA ICOBS"`). | **Unfit** (without compensating controls outside OpenSpec). | `domains/insurance.md` line 265: `"Suitability assessment must be demonstrably connected to individual customer demands and needs. Automated advice without human confirmation is IDD non-compliant in most jurisdictions."` | OpenSpec can express the suitability MUST as a requirement (`OpenSpec/docs/concepts.md` line 211), but provides no behavioural test that the deployed agent emits a demands-and-needs statement and no human-confirmation gate. To become Fit, OpenSpec would need a behavioural-evaluation runner against a `#### Scenario: IDD-suitability` block and a human-confirmation attestation artefact. |
| `"Fraud detection triggering account/claim action"` (`domains/insurance.md` line 266) | **Tier 2 max** per `domains/insurance.md` line 266 (`"Consumer Duty; GDPR"`). | **Conditional**. | `domains/insurance.md` line 266: `"Agent may score and flag; human authorises account restriction or claim suspension."` | OpenSpec exposes no Tier-2 boundary on `/opsx:apply` and no "score and flag" vs "execute restriction" split. To make Fit, OpenSpec would need: (a) a `tier_ceiling=2` field on the change folder, (b) a downstream connector that blocks any account-restriction action until a human-authorisation artefact is attached. Both controls live outside OpenSpec today; OpenSpec is then a documentation-and-spec layer above an external authorisation engine. |
| `"Pricing optimisation (fleet, commercial, non-personal-lines)"` (`domains/insurance.md` line 267) | **Tier 2 max** per `domains/insurance.md` line 267 (`"EIOPA AI guidelines; indirect discrimination obligation"`). | **Conditional**. | `domains/insurance.md` line 267: `"Agent may optimise; pricing actuary reviews material rate changes before implementation. Proxy discrimination assessment mandatory."` | OpenSpec lacks a proxy-discrimination assessment template and an actuarial-sign-off artefact. To make Fit, OpenSpec would need a `proxy_discrimination_assessment.md` template emitted by `/opsx:propose` and a sign-off field that blocks `/opsx:archive`. |
| `"SCR calculation using internal model"` (`domains/insurance.md` line 268) | **Tier 1 (observe only)** per `domains/insurance.md` line 268 (`"Solvency II Art. 112–127; IMAP use test"`). | **Unfit** (without compensating controls outside OpenSpec). | `domains/insurance.md` line 268: `"Agent output is a model input; the actuarial function owns the SCR output. Agent cannot produce the final SCR without actuarial sign-off."` | OpenSpec has no actuarial-function ownership marker on a change and no IMAP-evidence template. The change-folder schema implied by `OpenSpec/docs/concepts.md` lines 320–328 does not capture the six IMAP tests. To make Fit at Tier 1, OpenSpec would need a Solvency II evidence template (use test, statistical quality, calibration, P&L attribution, validation, documentation) attached to every change touching SCR. |
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

---

*Review conducted by: Agent 05b — Industry & Client Assessment (canonical combined output)*
*Part 8 produced by: Agent 05a — Maturity Phase Placement (Domain-Agnostic)*
*Source artefacts: OpenSpec 1.3.1 as of 2026-05-08*
*Regulatory frameworks sourced from: domains/insurance.md (last reviewed 2026-05-08)*
