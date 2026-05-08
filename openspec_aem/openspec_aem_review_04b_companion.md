# OpenSpec Agent 04b — Companion Framework Alignment (Part 7)

**Framework:** OpenSpec
**Version:** 1.3.1
**Review date:** 2026-05-08
**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@08123c263794b5cc24dbb3e1a5897a74288026e9`
**Reviewer:** Agent 04b (Claude Opus 4.7)
**Methodology:** Evidence-based alignment against the manifesto companion corpus (6 files); every verdict grounded in named OpenSpec artefacts; explicit contradiction sweep per subsection; Allianz-specific implications mapped to `domains/insurance.md` regulations.
**Context:** Allianz — European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II
**Sibling outputs:** This file is consumed (with `openspec_aem_review_04a_adoption.md`) by agent 04c, which produces the combined `openspec_aem_review_04_adoption_companion.md`.

## Methodology

This review reads the OpenSpec 1.3.1 source artefacts (`OpenSpec/README.md`, `OpenSpec/AGENTS.md`, `OpenSpec/CHANGELOG.md`, `OpenSpec/package.json`, `OpenSpec/openspec/config.yaml`, `OpenSpec/schemas/spec-driven/schema.yaml` plus templates in `OpenSpec/schemas/spec-driven/templates/`, the OpenSpec self-spec at `OpenSpec/openspec/specs/openspec-conventions/spec.md`, and selected CLI specs at `OpenSpec/openspec/specs/cli-validate/spec.md` and `OpenSpec/openspec/specs/cli-init/spec.md`, plus `OpenSpec/docs/concepts.md`). Version was confirmed from `OpenSpec/package.json` (`"version": "1.3.1"`) and `OpenSpec/CHANGELOG.md` (top entry `## 1.3.1`). The full manifesto companion corpus was read end-to-end: `companion/frameworks.md`, `companion/patterns.md`, `companion/principles.md`, `companion/guide.md`, `companion/re-framework.md`, `companion/reference.md`. The Allianz domain file `domains/insurance.md` was read end-to-end.

What was assessed: companion alignment and explicit contradictions only. Adoption alignment is owned by agent 04a; cross-document synthesis is owned by agent 04c; determinative phase placement is owned by agent 05.

Scoring approach: alignment grade per subsection (`Well-aligned` / `Partially aligned` / `Misaligned`); severity labels (Critical/High/Medium/Low) per gap and contradiction using the canonical thresholds in `review/prompt.md`; per-step verdicts (✅ Met / 🟡 Partial / ❌ Absent); no numeric scoring.

Allianz / European insurance and financial services context was applied by mapping every Part 7 implication to a specific Article in Solvency II, EU AI Act, GDPR, DORA, EIOPA AI guidelines, IDD, FCA ICOBS, or a named risk-type entry from `domains/insurance.md` (e.g., the Hard Autonomy Caps table, the Solvency II Model Validation Mapping table, the Market-Specific Autonomy Guidance table).

What was not read or was time-boxed: the full OpenSpec TypeScript source tree under `OpenSpec/src/` was scanned for structure only and not read line-by-line; individual ai-tool adapter specs under `OpenSpec/openspec/specs/ai-tool-paths/` and `OpenSpec/openspec/specs/command-generation/` were not read end-to-end. Where this matters, gaps are flagged as `unverified — source artefact does not address X`.

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

<!-- GAP INVENTORY
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

*Sources read: `OpenSpec/README.md`; `OpenSpec/AGENTS.md`; `OpenSpec/CHANGELOG.md`; `OpenSpec/package.json`; `OpenSpec/openspec/config.yaml`; `OpenSpec/schemas/spec-driven/schema.yaml`; `OpenSpec/schemas/spec-driven/templates/proposal.md`, `design.md`, `spec.md`, `tasks.md` (listing-level); `OpenSpec/openspec/specs/openspec-conventions/spec.md`; `OpenSpec/openspec/specs/cli-validate/spec.md`; `OpenSpec/openspec/specs/cli-init/spec.md` (listing-level); `OpenSpec/docs/concepts.md`; `companion/frameworks.md`; `companion/patterns.md`; `companion/principles.md`; `companion/guide.md`; `companion/re-framework.md`; `companion/reference.md`; `domains/insurance.md`; `review/prompt.md`; `review/prompts/prompt-04b-companion.md`.*
