# OpenSpec Agent 04 — Adoption & Companion Framework Alignment

**Framework:** OpenSpec
**Version:** 1.3.1
**Review date:** 2026-05-08
**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@08123c263794b5cc24dbb3e1a5897a74288026e9`
**Reviewer:** Agent 04 — composed from Agent 04a (adoption) + Agent 04b (companion) by Agent 04c (Opus 4.7)
**Methodology:** Evidence-based alignment against the manifesto adoption corpus (7 files) and companion corpus (6 files); every verdict grounded in named OpenSpec artefacts; Allianz-specific implications mapped to `domains/insurance.md` regulations. Parts 6 and 7 lifted verbatim from sibling outputs; Cross-Document Synthesis derived from the merged Gap Inventory.
**Context:** Allianz — European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II
**Source files:** `openspec_aem_review_04a_adoption.md` (Part 6), `openspec_aem_review_04b_companion.md` (Part 7).

## Methodology (brief)

Parts 6 and 7 below are lifted verbatim from sibling outputs `openspec_aem_review_04a_adoption.md` and `openspec_aem_review_04b_companion.md`. Re-derivation of alignment grades, severity labels, or per-step verdicts is forbidden in this agent; siblings' verdicts are authoritative. The only original content authored by 04c is the Cross-Document Synthesis section (Realistic Adoption Ceiling at Allianz; Highest-Leverage Single Change). The merged Gap Inventory at the foot of this file was built by extracting the `<!-- GAP INVENTORY ... /GAP INVENTORY -->` blocks from each sibling and concatenating them; siblings' part-references (P6 / P7) are preserved. The merged sources footer is built by de-duplicating the two siblings' footers and adding the synthesis-only inputs (`domains/insurance.md`, `companion/frameworks.md`).

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

## Part 7 — Companion Framework Alignment

### `companion/frameworks.md` — Maturity Guidance Alignment

**Alignment grade:** Misaligned

#### What the Document Requires

`companion/frameworks.md` defines a six-phase maturity spectrum with named failure modes per phase, asserts that "Maturity is domain-specific, not organization-wide", and states that "phase maturity is a prerequisite for autonomy tier: Phase 3 or below → Tier 1 only, regardless of infrastructure". It enumerates hard autonomy caps for regulated industries — for financial services: `**Financial Services** (credit/insurance decisions; algorithmic trading) | Tier 1 (observe only) | EU AI Act Annex III §5; GDPR Art. 22; MiFID II`. It defines `Blast radius` as "the maximum credible impact of a wrong action across users, data, services, or regulatory obligations." It defines an `Evidence bundle` as "the minimum artifacts needed to justify a change at a given phase and risk tier" with phase-calibrated examples (Phase 4 adds "policy checks and incident tags"; Phase 5+ adds "reproducible replay and, where justified, formal artifacts"). It also enumerates the per-phase failure mode for Phase 3 ("autonomy without verification — the agent said it worked"), Phase 4 ("governance without feedback"), and Phase 5 ("evaluation theater").

#### What OpenSpec Covers

OpenSpec is a specification-authoring and change-management framework for AI coding assistants. Its scope, per `OpenSpec/README.md`, is the workflow: "OpenSpec adds a lightweight spec layer so you agree on what to build before any code is written" and the loop "/opsx:propose → /opsx:archive". Its philosophy in `OpenSpec/docs/concepts.md` reads: "fluid not rigid — no phase gates, work on what makes sense" and "iterative not waterfall — learn as you build, refine as you go". The CLI lifecycle in `OpenSpec/openspec/specs/openspec-conventions/spec.md` lists seven states: `1. Propose`, `2. Review`, `3. Approve`, `4. Implement`, `5. Deploy`, `6. Update`, `7. Archive`.

OpenSpec covers no part of the manifesto's maturity-spectrum requirements. There is no phase concept, no per-phase failure-mode mitigation, no autonomy tier, no blast-radius variable, and no evidence-bundle definition anywhere in `OpenSpec/README.md`, `OpenSpec/AGENTS.md` (empty file), `OpenSpec/openspec/config.yaml`, or `OpenSpec/schemas/spec-driven/schema.yaml`. The verb-noun CLI structure in `openspec-conventions/spec.md` ("OpenSpec CLI design SHALL use verbs as top-level commands") is operational, not maturity-related.

Per-phase failure-mode mitigation assessment:

- Phase 3 — "Autonomy without verification": ❌ Absent. OpenSpec defines no autonomy tier and no verification gate that an agent must clear before its output ships. The `/opsx:verify` command exists per `OpenSpec/CHANGELOG.md` 0.20.0 ("Validate that change implementations match their specifications") but verification is optional in the workflow ("4. VERIFY WORK | /opsx:verify (optional)" in `OpenSpec/docs/concepts.md`). Optional verification does not mitigate "autonomy without verification".
- Phase 4 — "Governance without feedback": ❌ Absent. There is no feedback channel from production incidents back into the specification or schema. Schema rules in `OpenSpec/openspec/config.yaml` are static; they are not updated by what the system discovers in operation.
- Phase 5 — "Evaluation theater": ❌ Absent. OpenSpec has no evaluation portfolio, no holdout, no adversarial-case requirement, and no concept of test distribution. The CLI's `validate` command (`OpenSpec/openspec/specs/cli-validate/spec.md`) validates structural shape of spec markdown, not behavioural correctness against an evaluation distribution.

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
| A — Single-Domain Reliability Fix | Authors a `proposal.md` with "Why / What Changes / Capabilities / Impact", a `tasks.md` checklist, and delta specs in `specs/<capability>/spec.md`. No regression tests, trace ID, policy check, or rollback command bundle. | 🟡 Partial | `OpenSpec/schemas/spec-driven/schema.yaml` (proposal `instruction`); `OpenSpec/docs/concepts.md` change folder layout. |
| B — Multi-Agent, Cross-Domain Coordination | OpenSpec is single-track. The workspace concept (`OpenSpec/docs/concepts.md` "Coordination Workspaces") allows coordination across linked repos but explicitly states "Workspace support is under active development and is not ready for use yet. Do not build external automation, integrations, or long-lived workflows on top of workspace behavior." No planner agent, verification agent, coordinator agent, or canary mechanism. | ❌ Absent | `OpenSpec/docs/concepts.md` Coordination Workspaces section, verbatim quote above. |
| C — Memory Poisoning Recovery | OpenSpec has no agent memory layer, no retrieval shard, no provenance metadata, and no rollback snapshot. Out of scope. | ❌ Absent | `unverified — source artefact does not address X` for memory; `OpenSpec/openspec/specs/` directory listing contains no memory-related spec. |
| D — Economics Routing Decision | Per `OpenSpec/README.md` "Model selection: OpenSpec works best with high-reasoning models. We recommend Opus 4.5 and GPT 5.2 for both planning and implementation." Single-model recommendation; no routing logic. | ❌ Absent | `OpenSpec/README.md` Usage Notes section. |
| E — Autonomy Tier Escalation at Runtime | No tier model, therefore no escalation protocol. The CLI workflow steps in `OpenSpec/openspec/specs/openspec-conventions/spec.md` are linear (Propose → Review → Approve → Implement → Deploy → Update → Archive); "Approve" is a human step but not tier-scoped or blast-radius-routed. | ❌ Absent | `OpenSpec/openspec/specs/openspec-conventions/spec.md` Change Lifecycle section. |
| F — Governance That Didn't Prevent the Incident | OpenSpec has no governance overlay to fail in this way. Spec-validation is structural (`OpenSpec/openspec/specs/cli-validate/spec.md`: "Validation output SHALL include specific guidance to fix each error, including expected structure, example headers"), not behavioural. | ❌ Absent | `OpenSpec/openspec/specs/cli-validate/spec.md`. |
| G — Exception-Based Governance at Scale | The schema instructs proposers to mark "**BREAKING**" changes (`OpenSpec/schemas/spec-driven/schema.yaml` proposal instruction: "Mark breaking changes with **BREAKING**") and `openspec-conventions/spec.md` gives a binary "proposal SHALL be created for: New features … Breaking changes". This is a coarse two-class classification, not the High/Medium/Low risk tier model the pattern requires; it has no automated pre-screener and no statistical sampling cadence. | ❌ Absent | `OpenSpec/schemas/spec-driven/schema.yaml`; `OpenSpec/openspec/specs/openspec-conventions/spec.md` "When Changes Require Proposals" section. |
| H — The Persona Simulator | OpenSpec has no simulation mechanism, no evaluation portfolio, and no validate-before-implement loop in the Pattern H sense. | ❌ Absent | `unverified — source artefact does not address X` across all OpenSpec specs. |
| Hallucination Loop (failure pattern) | The Hallucination Loop fix requires "Add a contract/invariant: 'timeout retry must not mutate credentials.' Update evaluations with the failure class as a regression test. Gate rollout until traces confirm the corrected behavior." OpenSpec has no contract/invariant primitive, no evaluations, and no trace-gated rollout. | ❌ Absent | `OpenSpec/openspec/specs/` listing; no contract or evaluation spec. |
| Operational Recovery Cycle (failure pattern) | OpenSpec offers a manual change loop (author a new `proposal.md` and tasks). It has no canary, no contract tightening primitive, no regression-test artefact requirement at archive. | ❌ Absent | `OpenSpec/schemas/spec-driven/schema.yaml`. |

The pattern most operationally relevant to Allianz is Pattern G — Exception-Based Governance at Scale. `domains/insurance.md` Solvency II Model Governance section requires that "The internal model approval process (IMAP) requires the undertaking to demonstrate that the model meets the use test, statistical quality standards, calibration standards, profit and loss attribution, validation standards, and documentation standards" (Solvency II Article 112–127). At agentic-coding scale, an Allianz CoE producing dozens of agent-authored changes per week against insurance-impacting code (claims systems, pricing engines) cannot give every change full IMAP-style scrutiny; the risk-tier pre-screener in Pattern G is the structural answer. OpenSpec's binary "BREAKING" annotation does not satisfy this — it does not differentiate "touches `src/pricing/**`" (high-risk in Pattern G's classification table) from a documentation typo, both of which can be marked BREAKING or not BREAKING with no infrastructural consequence beyond a string in `proposal.md`.

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

Under GDPR Article 22(4) — automated individual decision-making prohibition for special-category data, named in `domains/insurance.md` GDPR section — Allianz must ensure no automated underwriting decision based on health or genetic data ships without a human in the loop. OpenSpec's workspace-only isolation and code-module-only blast radius mean that an OpenSpec-authored change to an underwriting capability could ship without any framework-level signal that it has touched a GDPR Article 22(4) decision path. Exposure is immediate on first agent-authored change to underwriting, claims, or pricing code; it would be detected at supervisory review under EIOPA AI Governance Opinion (2021) explainability and fairness expectations.

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

- **Project Overview:** ❌ Absent. The OpenSpec `AGENTS.md` stub does not require Project Overview content; `openspec/project.md` is described as "Project-specific context" but no schema enforces the Project Overview content required by the manifesto template.
- **Build, Test, Deploy Commands:** ❌ Absent. No required section in scaffolded `AGENTS.md` or `project.md` for Build/Test/Deploy. `OpenSpec/openspec/config.yaml` for OpenSpec itself contains a `context` field with stack info but nothing about Build/Test/Deploy commands as the template requires.
- **Domain Constraints:** ❌ Absent. No required "Never do X" section. The template's example "Never generate pricing, underwriting, or claims logic" is not even cited in the framework.
- **Security:** ❌ Absent. No required Security section in the scaffolded file.
- **Testing Conventions:** 🟡 Partial. The OpenSpec self-config at `OpenSpec/openspec/config.yaml` `rules.tasks` includes "Add Windows CI verification as a task when changes involve file paths" — i.e., a project-specific rule for testing. This is closer to a content example than a structural mandate; the framework does not require any consumer to populate a Testing Conventions section.
- **Commit and PR Conventions:** ❌ Absent. No required section in scaffolded files.
- **Size bound (≤200 lines):** ❌ Absent. No size enforcement on `AGENTS.md` or `project.md`. The deliberate "stub" approach in `OpenSpec/CHANGELOG.md` 0.6.0 keeps the framework's *own* root file small but does not enforce the bound on consumer projects.

The CoE checklist mapping:

| Checklist Item | OpenSpec Status | Evidence |
| --- | --- | --- |
| Project overview / domain boundary | ❌ Not enforced | No required section in scaffolded `AGENTS.md`. |
| Build/test/deploy commands | ❌ Not enforced | No required section. |
| Domain Constraints | ❌ Not enforced | No required section. |
| Security section | ❌ Not enforced | No required section. |
| Testing Conventions (coverage threshold matching hook) | 🟡 Allowed via `config.yaml` rules | `OpenSpec/openspec/config.yaml` `rules:` block. |
| No credentials, hostnames | ❌ Not enforced by validator | `OpenSpec/openspec/specs/cli-validate/spec.md` validates spec-markdown shape only. |
| Under 200 lines | ❌ Not enforced | No length validation. |

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

- **Machine-readable output with structured acceptance criteria:** ✅ Met. `OpenSpec/openspec/specs/openspec-conventions/spec.md` mandates the `### Requirement:` / `#### Scenario:` Given/When/Then structure, and `OpenSpec/openspec/specs/cli-validate/spec.md` validates this structure programmatically. Quoted: "validation tools SHALL flag duplicate headers as errors".
- **INVEST or equivalent quality scoring:** ❌ Absent. No INVEST score, no equivalent quality scoring. `OpenSpec/openspec/specs/cli-validate/spec.md` validates shape (presence of `## Purpose`, `## Requirements`, scenario format, descriptive text), not requirement quality.
- **Governance projection as a separate artefact:** ❌ Absent. OpenSpec produces `proposal.md`, `spec.md` deltas, `design.md`, `tasks.md`. None of these is a compliance projection mapping the change to NIST AI RMF / ISO 5338 / EU AI Act / Solvency II requirements. `domains/insurance.md` requires explicit Solvency II model documentation projection ("Solvency II model documentation must follow the format prescribed by the applicable supervisory authority"); OpenSpec produces no such projection.
- **Single-source / multiple-projections:** 🟡 Partial. OpenSpec's archive process (`openspec-conventions/spec.md` Archive Process Enhancement) propagates the delta into the main spec, ensuring `specs/<capability>/spec.md` remains canonical for OpenSpec's own internal consumers. However, OpenSpec performs no automatic update of downstream representations (Azure DevOps stories, Jira tickets, NIST AI RMF compliance mapping, Solvency II IMAP documentation). When a `specs/<capability>/spec.md` changes, no projection is automatically regenerated.
- **Probabilistic assurance targets:** ❌ Absent. `OpenSpec/openspec/specs/openspec-conventions/spec.md` mandates SHALL/MUST and tells authors to avoid the weaker RFC-2119 keywords: "Use SHALL/MUST for normative requirements (avoid should/[the optional keyword])." This is hard-requirement-only language. There is no syntax in the spec format for "F1 ≥ 0.85 across a held-out evaluation set of 500 documents with 95% CI lower bound ≥ 0.82".

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
| Security theater | "Policies documented but not enforced at tool/runtime boundaries." | Critical | `OpenSpec/openspec/specs/openspec-conventions/spec.md` `Domain Constraints` example template line "Never generate pricing, underwriting, or claims logic — flag for human review" (lifted from `companion/reference.md` template) would be a documented policy that OpenSpec offers no infrastructure to enforce. The framework has no PreToolUse hook spec, no permission engine, no allow-list. Documented constraints in `AGENTS.md` are aspirational; OpenSpec validates spec markdown shape (`cli-validate/spec.md`), not runtime enforcement. |
| Adoption theater | "Teams adopt the manifesto's vocabulary without its discipline." | High | OpenSpec's `### Requirement:` / `#### Scenario:` ceremony is easy to adopt without any of the manifesto's other disciplines (autonomy tiers, evidence bundles, evaluations, tracing). A team can fully adopt OpenSpec and remain at Phase 2 maturity by the manifesto's own definition. |
| Maturity inflation | "Teams self-assess at Phase 4 or 5 because the phase descriptions are aspirational enough to pattern-match to current practice." | High | OpenSpec produces structured spec artefacts that resemble Phase-4-like evidence at first glance. Without phase-calibrated evidence checks (incident tags, replayable traces), teams using OpenSpec can pattern-match their workflow to Phase 4 without producing Phase 4 evidence. |
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

---

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

---

*Sources read: `OpenSpec/README.md`; `OpenSpec/CHANGELOG.md`; `OpenSpec/AGENTS.md`; `OpenSpec/docs/concepts.md`; `OpenSpec/docs/workflows.md`; `OpenSpec/docs/commands.md`; `OpenSpec/openspec/config.yaml`; `OpenSpec/package.json`; `OpenSpec/schemas/spec-driven/schema.yaml`; `OpenSpec/schemas/spec-driven/templates/proposal.md`, `design.md`, `spec.md`, `tasks.md` (listing-level); `OpenSpec/openspec/specs/openspec-conventions/spec.md`; `OpenSpec/openspec/specs/cli-validate/spec.md`; `OpenSpec/openspec/specs/cli-init/spec.md` (listing-level); directory inspection of `OpenSpec/src/core/`, `OpenSpec/src/commands/`, `OpenSpec/openspec/specs/`, `OpenSpec/openspec/changes/`, `OpenSpec/openspec/explorations/`; `adoption/path.md`; `adoption/playbook.md`; `adoption/enterprise.md`; `adoption/metrics.md`; `adoption/roles.md`; `adoption/pilot.md`; `adoption/vmodel.md`; `companion/frameworks.md`; `companion/patterns.md`; `companion/principles.md`; `companion/guide.md`; `companion/re-framework.md`; `companion/reference.md`; `domains/insurance.md`; `review/prompt.md`; `review/prompts/prompt-04b-companion.md`; `review/prompts/prompt-04c-synthesis.md`.*

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
- maturity-phase-concept-absent: Critical | companion-frameworks | P7 | effort XL
- autonomy-tier-model-absent: Critical | companion-frameworks | P7 | effort XL
- blast-radius-classification-code-only: High | companion-frameworks | P7 | effort L
- evidence-bundle-not-required-at-archive: High | companion-frameworks | P7 | effort M
- phase3-failure-mode-unmitigated-optional-verify: Critical | companion-frameworks | P7 | effort L
- phase4-failure-mode-unmitigated-no-feedback-loop: High | companion-frameworks | P7 | effort L
- phase5-failure-mode-unmitigated-no-eval-portfolio: Critical | companion-frameworks | P7 | effort XL
- contradiction-no-phase-gates-vs-phase-gated-evidence: Critical | companion-frameworks | P7 | effort XL
- contradiction-dependencies-as-enablers-vs-mandatory-bundles: High | companion-frameworks | P7 | effort L
- contradiction-no-infrastructure-enforced-autonomy-cap: Critical | companion-frameworks | P7 | effort XL
- pattern-g-risk-tier-prescreener-absent: Critical | companion-patterns | P7 | effort L
- pattern-e-tier-escalation-protocol-absent: Critical | companion-patterns | P7 | effort L
- pattern-c-memory-poisoning-recovery-out-of-scope: Medium | companion-patterns | P7 | effort XL
- pattern-d-economics-routing-single-model: Low | companion-patterns | P7 | effort M
- pattern-h-persona-simulator-absent: Medium | companion-patterns | P7 | effort L
- pattern-b-multiagent-coordination-not-production-ready: Medium | companion-patterns | P7 | effort L
- operational-recovery-cycle-no-canary-no-contract-tightening: High | companion-patterns | P7 | effort M
- contradiction-human-approve-rubber-stamping-pattern: High | companion-patterns | P7 | effort M
- correlated-model-failure-no-defence: High | companion-principles | P7 | effort M
- correlated-tool-failure-no-allow-list: High | companion-principles | P7 | effort M
- governance-failure-detection-absent: High | companion-principles | P7 | effort M
- blast-radius-data-users-services-regulatory-absent: Critical | companion-principles | P7 | effort L
- isolation-workspace-only-not-data-tool-access: Critical | companion-principles | P7 | effort XL
- declarative-permission-policy-absent: Critical | companion-principles | P7 | effort XL
- audit-log-spec-absent: Critical | companion-principles | P7 | effort L
- guardrail-constraint-primitive-absent: Critical | companion-principles | P7 | effort XL
- contradiction-workspace-isolation-wrong-layer: High | companion-principles | P7 | effort XL
- contradiction-blast-radius-code-only-vs-regulatory: High | companion-principles | P7 | effort L
- agents-md-stub-no-mandatory-sections: High | companion-guide | P7 | effort M
- size-bound-200-lines-not-enforced: Medium | companion-guide | P7 | effort S
- domain-constraints-regulated-phrases-not-templated: Critical | companion-guide | P7 | effort S
- security-section-not-templated: High | companion-guide | P7 | effort S
- coverage-threshold-matches-hook-not-enforced: Medium | companion-guide | P7 | effort M
- coe-review-checklist-absent: High | companion-guide | P7 | effort M
- contradiction-handoff-stub-vs-mandatory-sections: High | companion-guide | P7 | effort S
- two-axes-classification-metadata-absent: Critical | companion-re-framework | P7 | effort L
- probabilistic-assurance-target-syntax-absent: Critical | companion-re-framework | P7 | effort L
- governance-projection-not-generated: Critical | companion-re-framework | P7 | effort L
- downstream-projection-synchronisation-absent: High | companion-re-framework | P7 | effort M
- invest-quality-scoring-absent: Medium | companion-re-framework | P7 | effort M
- behavioural-envelope-layers-not-in-spec-format: High | companion-re-framework | P7 | effort L
- contradiction-shall-must-only-vs-probabilistic: Critical | companion-re-framework | P7 | effort L
- contradiction-deterministic-test-paradigm-vs-distribution: Critical | companion-re-framework | P7 | effort L
- evidence-theater-no-decision-influence-telemetry: Medium | companion-reference | P7 | effort M
- control-theater-no-approval-latency-tracking: High | companion-reference | P7 | effort M
- security-theater-no-pretooluse-hook-no-permission-engine: Critical | companion-reference | P7 | effort XL
- maturity-inflation-no-phase-calibrated-evidence-litmus: High | companion-reference | P7 | effort L
- structural-regression-no-evoscore-no-iteration-metric: High | companion-reference | P7 | effort L
- verification-without-validation-no-business-outcome-link: High | companion-reference | P7 | effort L
- contradiction-policy-as-text-vs-enforce-before-document: Critical | companion-reference | P7 | effort XL
- contradiction-fluid-philosophy-vs-outcome-measurement: High | companion-reference | P7 | effort L
/GAP INVENTORY -->
