# OpenSpec Agent 04a — Adoption Document Alignment (Part 6)

**Framework:** OpenSpec
**Version:** 1.3.1
**Review date:** 2026-05-08
**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@08123c263794b5cc24dbb3e1a5897a74288026e9`
**Reviewer:** Agent 04a (Opus 4.7)
**Methodology:** Evidence-based alignment against the manifesto adoption corpus (7 files); every verdict grounded in named OpenSpec artefacts; Allianz-specific implications mapped to `domains/insurance.md` regulations.
**Context:** Allianz — European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II
**Sibling outputs:** This file is consumed (with `openspec_aem_review_04b_companion.md`) by agent 04c, which produces the combined `openspec_aem_review_04_adoption_companion.md`.

## Methodology

OpenSpec source artefacts read end-to-end: `OpenSpec/README.md`, `OpenSpec/CHANGELOG.md` (confirms version 1.3.1), `OpenSpec/AGENTS.md` (empty hand-off stub), `OpenSpec/docs/concepts.md`, `OpenSpec/docs/workflows.md`, `OpenSpec/docs/commands.md`, `OpenSpec/openspec/config.yaml`, plus directory inspection of `OpenSpec/src/core/` (validation, archive, list, init, migration, profiles, project-config, schemas, workspace, converters, command-generation, telemetry, parsers, specs-apply), `OpenSpec/src/commands/` (change, completion, config, feedback, schema, show, spec, validate, view, workflow, workspace), `OpenSpec/openspec/specs/` (40+ capability specs), and `OpenSpec/openspec/changes/` (active change proposals). Manifesto adoption corpus read end-to-end: `adoption/path.md`, `adoption/playbook.md`, `adoption/enterprise.md`, `adoption/metrics.md`, `adoption/roles.md`, `adoption/pilot.md`, `adoption/vmodel.md`. Domain file `domains/insurance.md` read end-to-end. No prior reviews exist for OpenSpec.

This file assesses adoption alignment only. Companion-document alignment (Part 7) is in agent 04b's output; cross-document synthesis is in agent 04c's output. Maturity placement (Part 8) is owned by agent 05. Scoring uses subsection-level alignment grades (`Well-aligned` / `Partially aligned` / `Misaligned`) and per-gap severity labels (Critical / High / Medium / Low) per the canonical thresholds in `prompt.md`. No 0–100 scores are produced here. Allianz / European insurance regulatory context is applied by mapping every gap to a specific Article or named risk-type from `domains/insurance.md`. Source files outside `OpenSpec/`, `adoption/`, and `domains/insurance.md` were not read for this part.

## Part 6 — Adoption Document Alignment

### `adoption/path.md` — Adoption Path and Phase Transitions

**Alignment grade:** Misaligned

#### What the Document Requires

`adoption/path.md` defines a 7-step incremental infrastructure path mapping to Phase 3→4 (Steps 1–3), Phase 4→5 (Steps 4–6), and ongoing expansion (Step 7). It requires that Tier 1/2/3 autonomy be encoded "as infrastructure-level permissions, not prompt instructions"; that an evidence bundle ("a diff, a test report, and a rollback command for every agent-generated PR. Block merge without these") be enforced in CI; that regression gates "block merge" on evaluation regression; that adversarial and security evaluations gate exposed surfaces; that durable coordination state include "Work ledgers", "Lease-based task ownership", and "Restart-safe handoffs"; that formal contracts be piloted on one high-blast-radius path; and that expansion be gated on "Incident rate stable or improving for two consecutive quarters."

#### What OpenSpec Covers

OpenSpec's scope is artefact authoring and lifecycle management for change proposals. The README states the philosophy `→ fluid not rigid → iterative not waterfall → easy not complex → built for brownfield not just greenfield → scalable from personal projects to enterprises`. The product is a CLI plus slash commands (`/opsx:propose`, `/opsx:apply`, `/opsx:verify`, `/opsx:archive`) that scaffold `proposal.md`, `specs/`, `design.md`, `tasks.md` per change.

- **Step 1 (Domain boundary encoding and tier infrastructure): ❌ Absent.** OpenSpec organises specs "by feature area", "by component", or "by bounded context" (`docs/concepts.md`: "Common patterns: By feature area: `auth/`, `payments/`, `search/`"), but these are markdown directory groupings only. No infrastructure-level enforcement, tool permission registry, or autonomy-tier mechanism exists. The `src/core/` directory contains no autonomy-tier or runtime-permission module.
- **Step 2 (Evidence bundle): ❌ Absent.** `/opsx:archive` (`docs/commands.md`) consolidates `proposal.md`, `design.md`, `tasks.md`, and delta specs into `changes/archive/YYYY-MM-DD-<name>/`. There is no diff, no test report, no trace link, and no rollback note in this artefact. The archive is a documentation snapshot, not an auditable evidence bundle as defined by the manifesto.
- **Step 3 (Regression gates): ❌ Absent.** `/opsx:verify` (`docs/commands.md`) "Does not block archive, but surfaces issues" and is described as a static "completeness, correctness, coherence" check against task lists and prose specs. There is no evaluation suite, no behavioural regression infrastructure, and no merge-blocking gate.
- **Step 4 (Adversarial / security evaluations): ❌ Absent.** No adversarial test harness, prompt-injection check, or security evaluation surface exists in `OpenSpec/src/`. The `openspec` CLI does not produce or execute evaluations.
- **Step 5 (Durable coordination state): ❌ Absent.** OpenSpec's "parallel changes" pattern (`docs/workflows.md`) supports independent change folders editing different requirements without conflict, but there is no work ledger, no lease, and no restart-safe handoff. The `src/core/workspace/` module addresses cross-repo planning links (workspace.yaml / local.yaml), explicitly stated as "under active development and is not ready for use yet" (`docs/concepts.md`); credit cannot be claimed for an in-development capability.
- **Step 6 (Formal contracts): ❌ Absent.** The framework uses RFC 2119 SHALL/MUST/SHOULD prose keywords (`docs/concepts.md`: "MUST/SHALL — absolute requirement") in markdown specs. These are not machine-checkable preconditions/postconditions/invariants. No contract verification module exists in `src/`.
- **Step 7 (Expansion gates on incident/economics): ❌ Absent.** No incident-rate tracking, no escaped-defect metric, no cost telemetry beyond opt-out anonymous command-name counting (`README.md`: "We collect only command names and version… no arguments, paths, content, or PII").

Per-step verdicts: Step 1 ❌ | Step 2 ❌ | Step 3 ❌ | Step 4 ❌ | Step 5 ❌ | Step 6 ❌ | Step 7 ❌.

#### Output Lifecycle & Version Migration

- OpenSpec stamps a change folder with a creation date prefix on archive (`docs/commands.md`: "Moves change folder to `openspec/changes/archive/YYYY-MM-DD-<name>/`") but does not stamp the producing OpenSpec CLI version onto the artefact. There is no `framework_version` field in `proposal.md`, `design.md`, `tasks.md`, or delta specs. [Severity: High]
- `openspec update` (`README.md`) refreshes generated agent instruction files for tool integrations but does not migrate prior `proposal.md` / `specs/` content to a new schema version. The CHANGELOG records breaking changes (1.0.0 "Old commands removed — `/openspec:proposal`, `/openspec:apply`, and `/openspec:archive` no longer exist") with migration described as "Run `openspec init` to upgrade. Legacy artefacts are detected and cleaned up with confirmation" — that is detection-and-cleanup, not version-tagged artefact preservation. [Severity: High]
- The audit log is local-only: archived changes live in `openspec/changes/archive/` inside each repository and rely on git for history. There is no centrally accessible governance ledger; cross-team aggregation requires bespoke tooling outside OpenSpec. [Severity: High]
- Telemetry is opt-out anonymous command-name counting (`README.md`: "Opt-out: `export OPENSPEC_TELEMETRY=0`"). No artefact-lineage telemetry exists. [Severity: Medium]
- Consequence for Allianz's multi-year regulatory artefact horizon: a Solvency II Article 35 record retention requirement (and Solvency II Article 41 on the system of governance) cannot be satisfied by a local-only, version-untagged folder hierarchy. Internal Model approval evidence under Solvency II Articles 112–127 must be reproducible across actuarial cycles spanning years; OpenSpec's archive does not preserve the producing-version provenance needed for that reproduction.

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

Solvency II Article 121 (statistical quality standards) and Article 124 (validation standards) require that internal model documentation be reproducible and traceable across model lifecycle iterations, and that "calibration evidence requires actuarial sign-off" (mapping in `domains/insurance.md`). OpenSpec produces prose-level proposals and tasks but no evidence bundle, no evaluation portfolio, and no version-stamped artefact, which means an Allianz Internal Model Approval Process (IMAP) submission relying on OpenSpec alone would fail the Documentation Standards test on supervisory review. Exposure is operational and regulatory; timing is immediate on any Solvency II model change deployed via OpenSpec without supplementary evidence infrastructure.

---

### `adoption/playbook.md` — Organisational Change Readiness

**Alignment grade:** Partially aligned

#### What the Document Requires

`adoption/playbook.md` defines business-case metrics ("Cycle time reduction… Escaped defect rate… Senior talent leverage… Total cost of correctness"); requires Agile-ceremony conversion ("Sprint Planning → Spec Refinement & Tier Assignment", "Sprint Review → Evidence Bundle Review", "Retrospective → Memory Curation & Skill Promotion"); flags the supervision paradox ("Reviewing AI-generated code is often harder than writing code yourself"); and addresses the cultural and human side of the transition. It states "Treat these as starting signals, not universal thresholds. Calibrate against your domain baseline and risk class."

#### What OpenSpec Covers

- **Specification refinement and "agree before you build":** Strong. The README states "Agree before you build — human and AI align on specs before code gets written" and `docs/concepts.md` requires Given/When/Then scenarios with "RFC 2119 keywords (SHALL, MUST, SHOULD, MAY)". The `/opsx:propose` workflow (`docs/commands.md`) operationalises this. ✅ Met (partial — no autonomy tier or blast-radius classification).
- **Sprint Review → Evidence Bundle Review:** Partial. `/opsx:verify` produces a structured "completeness / correctness / coherence" report (`docs/commands.md`) which approximates an evidence-bundle review surface, but the verify report itself omits diff, trace, evaluation results, and policy check outputs. 🟡 Partial.
- **Retrospective → Memory Curation:** Absent. The archive folder preserves change history but there is no learned-memory store, no skill-promotion mechanism, no failure-pattern catalogue. Project-level rules in `openspec/config.yaml` (e.g., "Always use path.join() or path.resolve() for file paths") allow durable rule capture but not memory governance with provenance, expiration, or compression. ❌ Absent.
- **Standup → Trace Audit:** Absent. No structured traces, no anomaly review surface, no behavioural drift instrumentation. ❌ Absent.
- **Total cost of correctness, escaped defect rate, cycle time:** Absent. OpenSpec emits no telemetry beyond opt-out anonymous command-name counts (`README.md`: "We collect only command names and version"). ❌ Absent.
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

- **Wave 0 (one team, one domain, pilot governance evidence artefacts):** 🟡 Partial. OpenSpec provides a low-ceremony specification scaffolding (`docs/workflows.md`: "Quick Feature: `/opsx:new ──► /opsx:ff ──► /opsx:apply ──► /opsx:verify ──► /opsx:archive`") suitable for a Wave 0 pilot's documentation discipline. It does not produce the Wave 0 governance evidence artefacts (autonomy tier registry, blast-radius classification, evidence bundle, evaluation results).
- **Wave 1 (3–5 teams, cross-domain traceability, enterprise governance aggregation):** 🟡 Partial. The `src/core/workspace/` module supports linking multiple repos under a coordination workspace (`docs/concepts.md`: "workspace = where related cross-repo changes live"). Its status is explicitly "under active development and is not ready for use yet." No enterprise governance aggregation, no multi-team autonomy tier management exists. In-development status — not credited as covered.
- **Wave 2 (memory governance, behavioural observability, shared evaluation registries):** ❌ Absent. None of these capabilities exist in `OpenSpec/src/`.
- **Wave 3 (verified inter-domain contracts, enterprise evaluation registries, autonomy tier governance):** ❌ Absent.

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

DORA (Regulation EU 2022/2554) Articles 5–6 require ICT risk management framework integration and Articles 28–30 require third-party ICT risk concentration management — both presuppose enterprise-level governance aggregation. Solvency II Article 41 (system of governance) requires that the AMSB (Administrative, Management or Supervisory Body) have visibility across the undertaking's risk-bearing systems. OpenSpec's per-repository, local-only archive cannot deliver enterprise aggregation; an Allianz-wide deployment would require building enterprise governance infrastructure independently. Exposure is regulatory and operational; timing is on Allianz's next DORA self-assessment cycle and on every Solvency II AMSB risk report.

---

### `adoption/metrics.md` — Measurement Readiness

**Alignment grade:** Misaligned

#### What the Document Requires

`adoption/metrics.md` defines metric sets per phase transition (Phase 1→2 through Phase 5→6), four team-health metrics ("Review latency trends… Approval depth… Engineer satisfaction and burnout indicators… Junior engineer progression rate"), four rubber-stamping detection signals ("Median review time per agent-generated PR… PR rejection rate (agent-generated)… Inline comments per approved PR… Rework rate within 1 week of merge"), and five governance-overhead metrics ("Governance overhead as % of engineering throughput… False-positive rate on hook blocks… Time-to-update-governance-policy… Incident-prevention rate attributable to governance controls… Hook false-negative rate").

#### What OpenSpec Covers

| Metric | Phase | OpenSpec Support | Verdict | Evidence |
|---|---|---|---|---|
| Number of AI-assisted tasks with documented, repeatable workflows | 1→2 | Change archive folder count is a weak proxy | 🟡 | `docs/commands.md` archive flow |
| Rework rate on AI-assisted outputs | 1→2 | Not measured | ❌ | No rework telemetry in `src/core/` |
| Team coverage of approved AI tooling | 1→2 | Not measured | ❌ | No team coverage metric |
| Data handling incidents | 1→2 | Not measured | ❌ | No incident telemetry |
| Agent task completion rate | 2→3 | Task checkbox state in `tasks.md` (`docs/concepts.md`) is a weak per-change proxy | 🟡 | "Use hierarchical numbering (1.1, 1.2, etc.)" |
| Review rejection rate for agent outputs | 2→3 | Not measured by OpenSpec | ❌ | No review-outcome capture |
| Documented failure patterns | 2→3 | Not measured | ❌ | No failure-pattern catalogue |
| Specification quality (% with acceptance criteria) | 2→3 | Partial — `/opsx:verify` checks scenarios are present; binary, not a rate | 🟡 | `docs/commands.md` verify dimensions |
| Evidence bundle completeness rate | 3→4 | Not measured (no evidence bundle exists) | ❌ | See Adoption Path Step 2 finding |
| Escaped defect rate (agent vs human) | 3→4 | Not measured | ❌ | No defect telemetry |
| Rollback frequency / MTTR | 3→4 | Not measured | ❌ | No rollback artefact |
| Time per evidence bundle | 3→4 | Not measured | ❌ | No timing instrumentation |
| Lead time spec → verified deployment | 4→5 | Not measured | ❌ | No deployment integration |
| Total cost of correctness by domain | 4→5 | Not measured | ❌ | No cost telemetry |
| Policy violation rate | 4→5 | Not measured | ❌ | No policy engine |
| Cross-domain evaluation coverage | 4→5 | Not measured | ❌ | No evaluation infrastructure |
| Specification convergence rate | 5→6 | Not measured (delta sections track edits but no convergence metric) | ❌ | `docs/concepts.md` ADDED/MODIFIED/REMOVED |
| Evaluation theatre detection rate | 5→6 | Not measured | ❌ | No evaluation infrastructure |
| Self-improvement cycle time | 5→6 | Not measured | ❌ | Out of scope |
| Human oversight load | 5→6 | Not measured | ❌ | No reviewer-load metric |
| Review latency trends (team health) | All | Not measured by OpenSpec (lives in code review platform) | ❌ | No git/review integration |
| Approval depth (team health) | All | Not measured | ❌ | No review introspection |
| Engineer satisfaction / burnout | All | Not measured | ❌ | Out of scope |
| Junior progression rate | All | Not measured | ❌ | Out of scope |
| Median review time per agent PR | Rubber-stamping | Not measured | ❌ | No PR introspection |
| PR rejection rate (agent-generated) | Rubber-stamping | Not measured | ❌ | No PR introspection |
| Inline comments per approved PR | Rubber-stamping | Not measured | ❌ | No PR introspection |
| Rework rate within 1 week of merge | Rubber-stamping | Not measured | ❌ | No rework telemetry |
| Governance overhead as % throughput | Governance | Not measured | ❌ | No throughput metric |
| False-positive rate on hook blocks | Governance | No hooks; not applicable to OpenSpec | ❌ | No policy engine |
| Time-to-update-governance-policy | Governance | Not measured | ❌ | Out of scope |
| Incident-prevention rate by control | Governance | Not measured | ❌ | No incident telemetry |
| Hook false-negative rate | Governance | No hooks | ❌ | No policy engine |

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
| Developer (specification author) | Strong — `/opsx:propose` and `/opsx:continue` scaffold proposal/specs/design/tasks with Given/When/Then scenarios | ✅ | `docs/concepts.md` spec format; `docs/commands.md` |
| Developer (code reviewer) | Weak — `/opsx:verify` is prose-level coherence check; no diff review surface | 🟡 | `docs/commands.md` verify dimensions |
| Tech Lead (architecture) | Partial — `design.md` artefact captures architecture decisions ("Decision: Context over Redux", `docs/concepts.md`); no domain-boundary enforcement, no topology specification | 🟡 | `docs/concepts.md` design artefact |
| QA Engineer (test generation) | Absent — no test harness, no test generation | ❌ | No test module in `src/` |
| QA Engineer (evaluation design) | Absent — no evaluation portfolio infrastructure | ❌ | No evaluation module in `src/` |
| Operations Engineer (deployment) | Absent — out of declared scope | ❌ | README scope statement |
| Operations Engineer (behavioural observability) | Absent — no agent reasoning trace capture | ❌ | No observability module |
| Platform Engineer (agent runtime) | Absent — OpenSpec does not run agents; agents invoke the CLI | ❌ | `docs/commands.md` slash-command model |
| Platform Engineer (memory governance) | Absent — no learned-memory store | ❌ | No memory module |
| Domain Owner (autonomy tier assignment) | Absent — no autonomy tier mechanism | ❌ | See Adoption Path Step 1 finding |
| Product Owner (loop-ready specification) | Partial — proposal artefact captures intent and scope ("Intent… Scope… Approach", `docs/concepts.md`); machine-readable acceptance criteria are partially supported via Given/When/Then scenarios | 🟡 | `docs/concepts.md` proposal example |
| Specification Analyst | Partial — same scaffolding as Product Owner; no separation of business demand validation from spec authoring | 🟡 | `docs/concepts.md` |

Roles absent from OpenSpec's tooling scope: QA Engineer (both responsibilities), Operations Engineer (both responsibilities), Platform Engineer (both responsibilities), Domain Owner (autonomy tier). Six of twelve role responsibilities are completely unsupported; four are weakly partial; two (Developer-as-spec-author, Specification Analyst) are the framework's strength.

#### Gaps

- Six of twelve role responsibilities have no tooling support; OpenSpec is concentrated on the spec-authoring quadrant only. [Severity: Critical]
- No autonomy-tier-assignment surface for the Domain Owner role. [Severity: Critical]
- No evaluation-portfolio surface for the QA Engineer role. [Severity: Critical]
- No behavioural observability surface for Operations Engineer. [Severity: Critical]
- No agent-runtime or memory-governance surface for Platform Engineer. [Severity: High]
- Product Owner / Specification Analyst separation is not modelled — single proposal author by default. [Severity: Medium]

#### Allianz Implication

Solvency II Article 268 (Outsourcing of critical or important functions) and the EIOPA AI guidelines mapping in `domains/insurance.md` ("Board-level AI accountability" with "Strong" alignment to P12) require named role accountability for each critical AI function. With six of twelve manifesto roles unsupported by OpenSpec tooling, an Allianz Phase 4 deployment would require those roles to operate outside any framework support — creating a documentation-vs-operation gap that internal audit will surface on review. Exposure is operational and audit-trail; timing is on the next internal audit cycle covering AI delivery functions.

---

### `adoption/pilot.md` — Pilot Design Readiness

**Alignment grade:** Partially aligned

#### What the Document Requires

`adoption/pilot.md` requires a pilot domain that is "Bounded… Low-to-medium risk… Well-tested… Owned by a willing team", explicitly excludes "payment processing, authentication, customer-facing decisions with legal or financial impact, and other high-blast-radius or controlled-data workflows", specifies "Duration: 6-8 weeks minimum", "Team size: 3-5 engineers… plus one operations engineer and one QA engineer", "Tier 1 autonomy (agents analyse and propose), with evidence bundles required for every merged change", and pilot success criteria including "Escaped defect rate for agent-generated changes is equal to or lower than the domain's historical baseline."

#### What OpenSpec Covers

- **Pilot selection criteria alignment:** Strong fit for low-to-medium-risk, bounded, well-tested domains (e.g., internal tools, documentation generation, CI/CD improvements). The framework's stated philosophy (`README.md`: "→ easy not complex") aligns with low-ceremony pilot scope. ✅ Met for selection scope.
- **Pilot structure compatibility:** Partial. Sprint tracking is unaddressed (no sprint integration). Team-size compatibility is good — the framework imposes no team-size constraints. Scope enforcement is weak — there is no Tier-1 autonomy mechanism, only social convention. Tooling investment is minimal as required (`docs/commands.md`: a single npm package install plus `openspec init`). 🟡 Partial.
- **Pilot success criteria alignment:** Misaligned. Of four pilot success criteria — escaped defect rate, evidence bundle assembly time, lesson capture, specification refinement — only specification refinement is supported (delta specs ADDED/MODIFIED/REMOVED, `docs/concepts.md`). Escaped defect rate, bundle assembly time, and structured lesson capture are all absent. ❌ Absent.
- **Insurance guard rails from `domains/insurance.md`:** The Hard Autonomy Caps table requires Tier 1 (observe only) for "Underwriting decisions for individual cover", "Claims decisions affecting coverage or payout", "IDD-scope customer advisory", and "SCR calculation using internal model". OpenSpec has no Tier mechanism, so any Allianz pilot that touches these use cases requires additional infrastructure-level controls beyond the framework.

#### Gaps

- No Tier-1 autonomy enforcement mechanism; the pilot's "agents analyse and propose" boundary is enforced socially, not by the framework. [Severity: High]
- No evidence-bundle assembly mechanism, so "evidence bundles required for every merged change" cannot be implemented natively. [Severity: Critical]
- No escaped-defect-rate or bundle-assembly-time instrumentation, so two of four pilot success criteria are unmeasurable. [Severity: High]
- No structured lesson-capture artefact beyond free-text retro notes; "documenting failure patterns" requires bespoke convention. [Severity: Medium]
- No insurance-domain Hard Autonomy Cap enforcement; Allianz must layer Tier-1 controls on the agent runtime, not on OpenSpec. [Severity: High]

**Pilot-feasibility verdict.** OpenSpec is pilot-feasible at Allianz in low-blast-radius internal-tooling domains (developer tooling, documentation generation, internal API scaffolding, CI/CD configuration management) where Tier-1 autonomy can be enforced by reviewer convention rather than by framework infrastructure. OpenSpec is not pilot-feasible at Allianz in any domain governed by the Hard Autonomy Caps table in `domains/insurance.md` (underwriting, claims adjudication, IDD-scope advisory, SCR calculation, fraud action triggers, regulated pricing) without specific additional controls supplying autonomy-tier enforcement, evidence-bundle assembly, and escaped-defect instrumentation external to OpenSpec.

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
| Outcome Specifications (P1, P2) | `proposal.md` Intent + Scope sections (`docs/concepts.md`) | `/opsx:propose` or `/opsx:new` + `/opsx:continue` | 🟡 Partial — captures intent and scope; no risk classification, no blast-radius annotation, no validation criteria distinct from verification criteria |
| System Specifications (P2, P3) | `specs/<capability>/spec.md` with RFC 2119 SHALL/MUST | `/opsx:propose` artefact step | 🟡 Partial — captures requirements/scenarios; no domain boundary enforcement, no inter-domain typed contracts, no autonomy tier per domain |
| Agent Architecture (P3, P4, P5) | `design.md` Architecture Decisions section (`docs/concepts.md`: "Decision: Context over Redux… Decision: CSS Custom Properties") | `/opsx:propose` artefact step | 🟡 Partial — captures architecture decisions in prose; no agent topology specification, no autonomy tier per agent, no model-selection rationale field |
| Context and Domain Design (P6, P7, P11) | `design.md` Data Flow section, plus `openspec/config.yaml` `context` block | `/opsx:propose` + repo-level config | ❌ Absent — no agent context budget specification, no retrieval configuration, no tool permission registry, no cost-target field |
| Implementation / Agent Execution | `tasks.md` (`docs/concepts.md`: "- [ ] 1.1 Add theme context provider") | `/opsx:apply` (executes via host AI tool, not OpenSpec) | 🟡 Partial — task list captures execution steps; no harness, no trace capture, no autonomy bound enforced by OpenSpec |

**Left-arc regulatory annotation gaps:** No blast-radius classification field; no regulatory-classification field linking specs to applicable regulations (EU AI Act Annex III, GDPR Article 22, Solvency II Article 121); no risk-tag field. Allianz must overlay these annotations on top of OpenSpec via project-rule conventions.

#### Right arc (verification)

| V-Model Level | OpenSpec Artefact | Produced By | Verdict |
|---|---|---|---|
| Per-Agent Evaluation (P8, P9) | `/opsx:verify` summary report ("CRITICAL, WARNING, or SUGGESTION", `docs/commands.md`) | `/opsx:verify` | ❌ Absent — prose-level coherence check; no evaluation portfolio, no holdout, no adversarial cases, no structured trace |
| Cross-Agent Verification (P9, P10) | None | n/a | ❌ Absent |
| System-Level Evaluation (P10, P8) | None | n/a | ❌ Absent |
| Acceptance & Accountability (P12, P8) | Archive folder (`changes/archive/YYYY-MM-DD-<name>/`) | `/opsx:archive` | ❌ Absent — folder preserves prose artefacts; no diff, no test report, no trace ID, no rollback command, no policy check output, no cost accounting, no named-owner sign-off field |
| Bottom (Agent Execution) | `tasks.md` checkboxes | `/opsx:apply` | 🟡 Partial — completion tracked; no replay, no full trace |

#### ALCOA+ compliance

| ALCOA+ Property | OpenSpec Coverage | Verdict |
|---|---|---|
| Attributable | No author/owner field on artefacts; relies on git commit metadata external to OpenSpec | ❌ |
| Contemporaneous | Archive folder is timestamped (`YYYY-MM-DD-<name>`) at archive time, not at artefact-creation time per requirement | 🟡 |
| Legible | Markdown is human-legible | ✅ |
| Original | Delta specs preserve ADDED/MODIFIED/REMOVED markers (`docs/concepts.md`); historical originals preserved in archived change folders | 🟡 |
| Accurate | No verification of artefact accuracy against execution evidence (no execution evidence captured) | ❌ |
| Enduring | Local-only filesystem persistence; no central durable store | 🟡 |
| Complete | No completeness gate; `/opsx:archive` "won't block on incomplete tasks, but will warn" (`docs/commands.md`) | ❌ |
| Consistent | No cross-artefact consistency enforcement beyond `/opsx:verify` prose check | 🟡 |
| Available | Local repo only; not centrally available to supervisors or auditors without per-repo access | 🟡 |

Three ALCOA+ properties are absent (Attributable, Accurate, Complete); five are partial (Contemporaneous, Original, Enduring, Consistent, Available); one is met (Legible). The consequence for Allianz's V-model regulatory audit evidence: a Solvency II validation report referencing OpenSpec artefacts would fail the Validation Standards test on ALCOA+ properties unless Allianz layers attribution, accuracy verification, and completeness enforcement infrastructure outside OpenSpec.

#### Gaps

- Left-arc Context and Domain Design level is largely unsupported (no context budget, no retrieval config, no tool permission registry, no cost target). [Severity: High]
- Right-arc Per-Agent Evaluation, Cross-Agent Verification, System-Level Evaluation are all absent — three of four right-arc levels have no OpenSpec artefact. [Severity: Critical]
- Acceptance & Accountability level is documentation-only, missing all six manifesto-required evidence-bundle components (diff, tests, trace, rollback, policy check, cost). [Severity: Critical]
- ALCOA+ Attributable, Accurate, and Complete are absent; five other properties are partial. [Severity: Critical]
- No regulatory annotation fields (blast radius, regulatory class, risk tag) on any spec or design artefact. [Severity: High]

**Fundamental incompatibility:** OpenSpec's verification model is a prose-level static coherence check between human-authored documents (`/opsx:verify` reports "Implementation matches spec intent" by language inspection), whereas the V-model right arc requires executable evaluation portfolios, structured traces, and machine-checkable verification at every level. For Allianz under Solvency II Articles 121 (statistical quality standards) and 124 (validation standards), this means OpenSpec cannot supply the validation evidence required for an internal model under SCR calculation, and any agent product feeding the SCR remains exposed to a Documentation Standards test failure on supervisory review of the IMAP file.

#### Allianz Implication

Solvency II Article 124 (validation standards) — mapped in `domains/insurance.md` to "P8 independent validation; Stage 3 governance" with "Good fit" — combined with EIOPA AI Guidelines on second-line challenge, requires that validation evidence be independent and reproducible. OpenSpec's three-of-four-absent right arc and three-of-nine-absent ALCOA+ properties leave a validation evidence vacuum that Allianz's internal validation function cannot fill from OpenSpec output alone. Exposure is regulatory and supervisory; timing is on the next IMAP submission and on every annual model validation cycle.

---

<!-- GAP INVENTORY
- autonomy-tier-infrastructure: Critical | adoption-path | P6 | effort XL
- evidence-bundle-absent: Critical | adoption-path | P6 | effort L
- regression-gate-absent: Critical | adoption-path | P6 | effort L
- adversarial-security-eval-absent: Critical | adoption-path | P6 | effort L
- coordination-state-absent: High | adoption-path | P6 | effort L
- formal-contracts-absent: High | adoption-path | P6 | effort XL
- expansion-gate-metrics-absent: High | adoption-path | P6 | effort M
- artefact-version-stamp-absent: High | adoption-path | P6 | effort S
- artefact-migration-path-absent: High | adoption-path | P6 | effort M
- audit-log-local-only: High | adoption-path | P6 | effort L
- artefact-lineage-telemetry-absent: Medium | adoption-path | P6 | effort M
- business-case-metrics-absent: Critical | adoption-playbook | P6 | effort L
- evidence-bundle-review-surface-absent: High | adoption-playbook | P6 | effort M
- memory-curation-absent: High | adoption-playbook | P6 | effort L
- trace-audit-surface-absent: High | adoption-playbook | P6 | effort L
- supervision-load-metrics-absent: Medium | adoption-playbook | P6 | effort M
- enterprise-tier-registry-absent: Critical | adoption-enterprise | P6 | effort XL
- reasoning-observability-absent: Critical | adoption-enterprise | P6 | effort XL
- memory-infrastructure-absent: Critical | adoption-enterprise | P6 | effort XL
- evaluation-pipeline-absent: Critical | adoption-enterprise | P6 | effort XL
- cost-quality-routing-absent: High | adoption-enterprise | P6 | effort L
- workspace-coordination-in-development: High | adoption-enterprise | P6 | effort M
- enterprise-governance-aggregation-absent: High | adoption-enterprise | P6 | effort L
- metrics-coverage-30-of-33-absent: Critical | adoption-metrics | P6 | effort XL
- partial-metrics-are-proxies: High | adoption-metrics | P6 | effort M
- team-health-instrumentation-absent: Critical | adoption-metrics | P6 | effort L
- telemetry-surface-minimal: High | adoption-metrics | P6 | effort M
- six-of-twelve-roles-unsupported: Critical | adoption-roles | P6 | effort XL
- domain-owner-tier-surface-absent: Critical | adoption-roles | P6 | effort L
- qa-evaluation-surface-absent: Critical | adoption-roles | P6 | effort L
- ops-observability-surface-absent: Critical | adoption-roles | P6 | effort L
- platform-runtime-memory-surface-absent: High | adoption-roles | P6 | effort XL
- po-spec-analyst-undifferentiated: Medium | adoption-roles | P6 | effort S
- pilot-tier-enforcement-absent: High | adoption-pilot | P6 | effort L
- pilot-evidence-bundle-absent: Critical | adoption-pilot | P6 | effort L
- pilot-success-metrics-absent: High | adoption-pilot | P6 | effort M
- pilot-lesson-capture-absent: Medium | adoption-pilot | P6 | effort S
- pilot-insurance-hardcap-enforcement-absent: High | adoption-pilot | P6 | effort L
- vmodel-context-domain-design-absent: High | adoption-vmodel | P6 | effort L
- vmodel-right-arc-three-of-four-absent: Critical | adoption-vmodel | P6 | effort XL
- vmodel-acceptance-evidence-bundle-absent: Critical | adoption-vmodel | P6 | effort L
- alcoa-attributable-accurate-complete-absent: Critical | adoption-vmodel | P6 | effort L
- vmodel-regulatory-annotation-fields-absent: High | adoption-vmodel | P6 | effort M
/GAP INVENTORY -->

*Sources read: `OpenSpec/README.md`, `OpenSpec/CHANGELOG.md`, `OpenSpec/AGENTS.md`, `OpenSpec/docs/concepts.md`, `OpenSpec/docs/workflows.md`, `OpenSpec/docs/commands.md`, `OpenSpec/openspec/config.yaml`, directory inspection of `OpenSpec/src/core/`, `OpenSpec/src/commands/`, `OpenSpec/openspec/specs/`, `OpenSpec/openspec/changes/`, `OpenSpec/openspec/explorations/`; `adoption/path.md`; `adoption/playbook.md`; `adoption/enterprise.md`; `adoption/metrics.md`; `adoption/roles.md`; `adoption/pilot.md`; `adoption/vmodel.md`; `domains/insurance.md`.*
