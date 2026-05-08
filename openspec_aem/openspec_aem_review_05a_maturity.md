# OpenSpec Review 05a — Maturity Phase Placement

**Framework reviewed:** OpenSpec
**Framework version:** 1.3.1
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

**Prior reviews:** none
**Review date:** 2026-05-08
**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@08123c263794b5cc24dbb3e1a5897a74288026e9`

---

## Part 8 — Maturity Phase Placement

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

*Review conducted by: Agent 05a — Maturity Phase Placement (Domain-Agnostic)*
*Source artefacts: OpenSpec 1.3.1 as of 2026-05-08*
