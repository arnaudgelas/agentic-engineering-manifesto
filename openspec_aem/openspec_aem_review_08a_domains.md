# OpenSpec Review — Part 14 §14.1–§14.15: Enterprise Guardrail Domain Assessments (intermediate)

**Framework:** OpenSpec
**Version:** 1.3.1
**Client:** Allianz
**Industry:** European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II
**Reviewer:** Agent 08a
**Date:** 2026-05-08
**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@08123c263794b5cc24dbb3e1a5897a74288026e9`

**Sources reviewed:**
- `OpenSpec/README.md`
- `OpenSpec/docs/concepts.md`
- `OpenSpec/docs/commands.md`
- `OpenSpec/docs/workflows.md`
- `OpenSpec/docs/customization.md`
- `OpenSpec/docs/migration-guide.md`
- `OpenSpec/docs/opsx.md`
- `OpenSpec/openspec/specs/cli-validate/spec.md`
- `OpenSpec/openspec/specs/cli-archive/spec.md`
- `OpenSpec/openspec/specs/cli-init/spec.md`
- `OpenSpec/openspec/specs/cli-feedback/spec.md`
- `OpenSpec/openspec/specs/global-config/spec.md`
- `OpenSpec/openspec/specs/telemetry/spec.md`
- `OpenSpec/openspec/specs/openspec-conventions/spec.md`
- `OpenSpec/openspec/specs/change-creation/spec.md`
- `OpenSpec/openspec/specs/opsx-verify-skill/spec.md`
- `OpenSpec/openspec/specs/opsx-onboard-skill/spec.md`
- `OpenSpec/openspec/specs/opsx-archive-skill/spec.md`
- `OpenSpec/openspec/specs/rules-injection/spec.md`
- `OpenSpec/openspec/specs/workspace-foundation/spec.md`
- `OpenSpec/openspec/specs/workspace-links/spec.md`
- `OpenSpec/AGENTS.md`
- `manifesto.md`
- `manifesto-principles.md`
- `manifesto-done.md`
- `domains/insurance.md`
- `governance/evidence-bundle-schema.md`
- `governance/integrated-audit-trail.md`
- `governance/governance-integration-note.md`
- `regulatory/eu-ai-act-addendum.md`
- `regulatory/foundation-model-third-party-register.md`
- `regulatory/nist-ai-rmf-crosswalk.md`
- `regulatory/iso-42001-crosswalk.md`
- `regulatory/iso-23894-23053-crosswalk.md`
- `operational-templates/agent-inventory-schema.md`
- `operational-templates/ai-risk-register.md`
- `operational-templates/slo-table.md`
- `operational-templates/decommissioning-checklist.md`

**Scope note.** This file is the intermediate output for the 15 enterprise guardrail domains (§14.1–§14.15). Agent 08b lifts these sections verbatim into the canonical Part 14 file `_review_08_enterprise_guardrails.md`, adds §14.16 (cross-cutting matrix), §14.17 (twelve non-negotiables), §14.18 (agent/task card schemas), and §14.19 (maturity verdict). Do NOT compute the maturity verdict here. Do NOT compute the cross-cutting matrix here. Do NOT re-score P1–P12; overlaps cite the principle by number.

---

### 14.1 Governance guardrails

**Domain question.** Who is allowed to let an agent do what, under whose accountability, with which evidence?

**Required controls.**

| Control | Description | Lifecycle gate |
| --- | --- | --- |
| Accountable human owner | Every agent, task, system, release, and waiver has a named human owner | All gates |
| RACI / DACI model | Defines responsible, accountable, consulted, informed roles | Specification readiness |
| Autonomy tier approval | Work classified by autonomy tier before execution | Specification readiness |
| Risk tiering | Classifies blast radius, data sensitivity, user/regulatory/financial exposure | Specification readiness |
| Policy-as-code | Governance policies are executable, versioned, and auditable | Execution and release |
| Waiver governance | Exceptions have owner, rationale, expiry, compensating control, review date | All gates |
| Segregation of duties | Author, reviewer, release approver, waiver approver cannot collapse into one role | Release |
| Audit trail | Every agent action, tool call, approval, waiver, and evidence update is traceable | All gates |
| Kill switch | Ability to suspend agent, tool, workflow, environment, or release path | Runtime |
| Governance review cadence | Regular review of incidents, costs, drift, waivers, violations, adoption | Operations |

**OpenSpec coverage.**

| Control | OpenSpec mechanism (verbatim evidence with path) | Enforcement Level | Gap | Severity |
| --- | --- | --- | --- | --- |
| Accountable human owner | `OpenSpec/openspec/specs/workspace-links/spec.md` lines 269–271: ``` #### Scenario: Avoiding owner and handoff fields ``` and `- **THEN** OpenSpec SHALL not ask for owner or handoff metadata`. The framework explicitly declines to record an owner. | Absent | No spec, change, or workspace artefact captures a named human owner; archive proceeds without owner attestation per `OpenSpec/openspec/specs/cli-archive/spec.md` "Performing archive" steps 1–5 | Critical |
| RACI / DACI model | Absent — no evidence in OpenSpec | Absent | No requirement in `OpenSpec/openspec/specs/` defines responsible/accountable/consulted/informed roles | Critical |
| Autonomy tier approval | Absent — no evidence in OpenSpec | Absent | The framework has no autonomy-tier construct; `OpenSpec/AGENTS.md` is empty (1-line file) | Critical |
| Risk tiering | Absent — no evidence in OpenSpec. `OpenSpec/openspec/specs/openspec-conventions/spec.md` "behavioral requirements" content (line 26) names only spec/design/tasks placement, not risk tiers | Absent | No `risk_tier` field on a change, spec, or release artefact | Critical |
| Policy-as-code | `OpenSpec/openspec/specs/cli-validate/spec.md` Requirement: "Bulk and filtered validation" enforces Markdown-shape validation: `- **WHEN** executing `openspec validate --all` / - **THEN** validate all changes in openspec/changes/ (excluding archive)`. This is structural-only, not governance policy | Instruction | The validator checks Markdown headings via Zod (`OpenSpec/openspec/specs/cli-validate/spec.md` "Zod validation error" scenario); it does not encode governance policy (owner, tier, risk, waiver) | High |
| Waiver governance | Absent — no evidence in OpenSpec | Absent | No waiver, exception, or expiry artefact exists in `OpenSpec/openspec/specs/` | Critical |
| Segregation of duties | `OpenSpec/openspec/specs/cli-archive/spec.md` Requirement: "Confirmation Behavior" allows `--yes` to "Skip confirmation prompts (for automation)" (lines 11–12) — same actor authors, validates, and archives | Absent | Author, reviewer, and release approver collapse into a single agent run; `--yes` removes the only human prompt | Critical |
| Audit trail | `OpenSpec/openspec/specs/cli-archive/spec.md` "Performing archive" preserves the change folder under `archive/YYYY-MM-DD-[change-name]` and `OpenSpec/docs/concepts.md` line 685 states `**Audit trail.** The archive preserves the full context of every change`. Trail covers Markdown artefacts only — not tool calls, model invocations, or approvals | Instruction | No trace_id, agent ID, model version, tool-call log, approval record, or waiver record per `governance/integrated-audit-trail.md` line 13 "AEM execution trace" | High |
| Kill switch | Absent — no evidence in OpenSpec | Absent | No suspend/halt mechanism for an in-flight agent run; no kill-switch surface in any spec under `OpenSpec/openspec/specs/` | Critical |
| Governance review cadence | Absent — no evidence in OpenSpec | Absent | No scheduled review of incidents, drift, waivers, or adoption metrics | Critical |

**Manifesto principle anchors.** P12 (Accountability requires intelligibility), P9 (Observability covers reasoning), P10 (Assume emergence; engineer containment).

**Domain Coverage Score.** **18/100** (Critical).

**Top remediation for Allianz.** Bind every change folder to an `agent-inventory.json` record per `operational-templates/agent-inventory-schema.md` (named accountable owner, autonomy tier, risk tier, allowed tools) and an `ai-risk-register.json` entry per `operational-templates/ai-risk-register.md`; refuse `openspec archive` when either record is missing or the named approver is the same identity as the implementer. Effort: **L**.

### 14.2 Architectural guardrails

**Domain question.** Is the agent allowed to make this design decision, in this system, using this pattern, under these enterprise standards?

**Required controls.**

| Control | Description | Lifecycle gate |
| --- | --- | --- |
| Enterprise architecture standards | Approved patterns, platforms, integration rules | Design |
| Domain boundaries | No cross-context crossing without approval | Design and execution |
| Technology radar / allowed stack | Only approved languages, frameworks, databases, protocols, cloud services | Design |
| Dependency introduction rules | New libraries/services/SaaS/models/APIs require architecture and supply-chain checks | Design and release |
| ADR requirement | Significant design decisions require Architecture Decision Records | Design |
| API governance | Public API changes require compatibility/versioning/security/consumer-impact checks | Design and release |
| Integration guardrails | No point-to-point integrations that violate enterprise patterns | Design |
| Data architecture guardrails | Source-of-truth, lineage, retention, data-product ownership respected | Design |
| Resilience patterns | Required retries, idempotency, circuit breakers, queues, backpressure, failover | Design and release |
| Cloud landing-zone compliance | Approved account/network/IAM/tagging/encryption/logging standards | Execution and release |

**OpenSpec coverage.**

| Control | OpenSpec mechanism (verbatim evidence with path) | Enforcement Level | Gap | Severity |
| --- | --- | --- | --- | --- |
| Enterprise architecture standards | Absent — no evidence in OpenSpec. `OpenSpec/docs/concepts.md` line 277 advises `Avoid in specs: Internal class/function names, Library or framework choices` — explicitly excludes architecture from the spec | Absent | The framework excludes architecture concerns from the spec by design | High |
| Domain boundaries | `OpenSpec/docs/concepts.md` lines 201–205: `Organize specs by domain — logical groupings that make sense for your system. Common patterns: By feature area: auth/, payments/, search/; By component: api/, frontend/, workers/; By bounded context: ordering/, fulfillment/, inventory/`. Folder convention only — not enforced | Instruction | No validator rule prevents cross-domain coupling; `OpenSpec/openspec/specs/cli-validate/spec.md` does not check domain ownership | High |
| Technology radar / allowed stack | Absent — no evidence in OpenSpec | Absent | No approved-stack registry or check | High |
| Dependency introduction rules | `OpenSpec/openspec/specs/rules-injection/spec.md` line 32: `- **WHEN** config has `rules: { proposal: ["Include rollback plan"] }`` injects free-text rules into agent prompts. Pattern is prompt-only, not enforced | Instruction | Rules render as prose in the agent's instructions; no policy check fails the change when the rule is violated | High |
| ADR requirement | `OpenSpec/docs/concepts.md` line 411: `Architecture Decisions` block in `design.md` example, and lines 418–423 ADR-style `### Decision: Context over Redux`. `design.md` is optional per `OpenSpec/openspec/specs/opsx-verify-skill/spec.md` "No design.md" scenario (lines 96–100) | Instruction | `design.md` presence is optional and unenforced; archive proceeds without it | Medium |
| API governance | Absent — no evidence in OpenSpec | Absent | No public-API compatibility, versioning, or consumer-impact gate | High |
| Integration guardrails | Absent — no evidence in OpenSpec | Absent | No integration-pattern policy | High |
| Data architecture guardrails | Absent — no evidence in OpenSpec | Absent | No source-of-truth, lineage, or data-product-owner check | High |
| Resilience patterns | Absent — no evidence in OpenSpec | Absent | No retries/idempotency/circuit-breaker/backpressure check | High |
| Cloud landing-zone compliance | Absent — no evidence in OpenSpec | Absent | No IAM/tagging/encryption/logging policy in `OpenSpec/openspec/specs/` | High |
| modifies_public_contract_without_consumer_impact_assessment | Absent — no evidence in OpenSpec | Absent | No consumer-impact-assessment artefact | High |
| introduces_new_runtime_without_platform_approval | Absent — no evidence in OpenSpec | Absent | No platform-approval gate | High |
| creates_cross_domain_coupling_without_adr | Absent — no evidence in OpenSpec | Absent | Spec organisation by domain is convention only (`OpenSpec/docs/concepts.md` line 201) | High |
| duplicates_existing_capability_without_search_evidence | Absent — no evidence in OpenSpec | Absent | No duplication search rule | Medium |
| bypasses_platform_abstractions | Absent — no evidence in OpenSpec | Absent | No abstraction-bypass detector | High |
| writes_to_non_owned_database | Absent — no evidence in OpenSpec | Absent | No owner-database mapping; cf. `OpenSpec/openspec/specs/workspace-links/spec.md` line 271 declines to record owners | Critical |
| bypasses_event_contract_or_schema_registry | Absent — no evidence in OpenSpec | Absent | No event-contract or schema-registry check | High |

**Manifesto principle anchors.** P3 (Architecture is defence-in-depth), P10 (Containment).

**Domain Coverage Score.** **20/100** (Critical).

**Top remediation for Allianz.** Add a mandatory `## Architecture Impact` block to every change `proposal.md` (covering domain boundary, owned-database identity, public-contract change, cross-domain coupling, runtime introduction) and extend `OpenSpec/openspec/specs/cli-validate/spec.md` Zod schemas to require its presence and refuse archive when any field is empty. Effort: **L**.

### 14.3 Specification and demand guardrails

**Domain question.** Should this work enter the agentic engineering loop at all?

**Required controls.**

| Control | Description | Lifecycle gate |
| --- | --- | --- |
| Validated need | Evidence the problem matters | Specification readiness |
| Measurable value | Defined business/user/risk/compliance/operational metric | Specification readiness |
| Acceptance criteria | Testable, preferably machine-checkable | Specification readiness |
| Out-of-scope boundaries | Explicit definition of what the agent must NOT solve | Specification readiness |
| Risk classification | Blast radius, data sensitivity, regulatory, financial impact | Specification readiness |
| Definition of Done | Required evidence bundle before completion | Specification readiness + Verification |
| Human owner | Accountable product/engineering/operational owner | All gates |
| Feasibility check | Whether agentic execution is appropriate for this work | Specification readiness |
| Non-agent suitability check | Some work should NOT be delegated to agents | Specification readiness |

**OpenSpec coverage.**

| Control | OpenSpec mechanism (verbatim evidence with path) | Enforcement Level | Gap | Severity |
| --- | --- | --- | --- | --- |
| Validated need | `OpenSpec/docs/concepts.md` line 372: `## Intent / Users have requested a dark mode option to reduce eye strain` and `OpenSpec/openspec/specs/cli-validate/spec.md` "Missing required sections" scenario lists `For Change: ## Why, ## What Changes` as required headers | Instruction | The `## Why` section is required as Markdown shape; no rule checks that the rationale is evidence-backed | Medium |
| Measurable value | Absent — no evidence in OpenSpec | Absent | No measurable-success-metric field on a change | High |
| Acceptance criteria | `OpenSpec/docs/concepts.md` line 219: `### Requirement: User Authentication / The system SHALL issue a JWT token upon successful login` and lines 257–260: `Scenarios are the "when" — they provide concrete examples that can be verified. Good scenarios: Are testable (you could write an automated test for them); Cover both happy path and edge cases` | Instruction | Acceptance criteria are prose; not machine-checkable beyond Markdown shape per `OpenSpec/openspec/specs/cli-validate/spec.md` | High |
| Out-of-scope boundaries | `OpenSpec/docs/concepts.md` lines 376–381: `Out of scope: Custom color themes (future work); Per-page theme overrides`. Pattern in proposal example | Instruction | No validator rule requires an explicit out-of-scope section; absence does not block archive | Medium |
| Risk classification | Absent — no evidence in OpenSpec | Absent | No risk_tier or data_classification field on changes | Critical |
| Definition of Done | `OpenSpec/openspec/specs/cli-archive/spec.md` "Task Completion Check" / "Incomplete tasks found" requires `prompt for confirmation to continue` and `default to "No" for safety` (lines 36–39). DoD is "tasks ticked" only | Instruction | No evidence-bundle requirement; `manifesto-done.md` "evidence bundle required for every automated merge" is unmatched | High |
| Human owner | `OpenSpec/openspec/specs/workspace-links/spec.md` lines 269–271: `OpenSpec SHALL not ask for owner or handoff metadata` | Absent | The framework explicitly does not capture an owner | Critical |
| Feasibility check | Absent — no evidence in OpenSpec | Absent | No agent-suitability assessment in `OpenSpec/openspec/specs/` | Medium |
| Non-agent suitability check | Absent — no evidence in OpenSpec | Absent | No "do not delegate" classification | Medium |

**Block-entry rule.** OpenSpec blocks work entry only on missing Markdown sections (`## Why`, `## What Changes`) per `OpenSpec/openspec/specs/cli-validate/spec.md` "Missing required sections" scenario. It does NOT block entry when {accountable_owner, measurable_success_metric, risk_tier, data_classification, rollback_expectation, out_of_scope, definition_of_done} are missing. Enforcement level for each: `accountable_owner` Absent, `measurable_success_metric` Absent, `acceptance_criteria` Instruction, `risk_tier` Absent, `data_classification` Absent, `rollback_expectation` Instruction (rules-injection prompt only — `OpenSpec/openspec/specs/rules-injection/spec.md` line 32), `out_of_scope` Instruction, `definition_of_done` Instruction.

**Manifesto principle anchors.** P1 (Outcomes are the unit of work), P2 (Specifications are living artifacts).

**Domain Coverage Score.** **32/100** (Critical).

**Top remediation for Allianz.** Add a mandatory `## Demand Guard` block to `proposal.md` containing `accountable_owner` (named human), `risk_tier`, `data_classification` (per `domains/insurance.md` line 208 special-category data), `measurable_success_metric`, and `rollback_expectation`, and extend `OpenSpec/openspec/specs/cli-validate/spec.md` "Missing required sections" to fail validation when any field is empty. Effort: **M**.

### 14.4 Autonomy and agency guardrails

**Domain question.** How much freedom does the agent have?

`manifesto-principles.md` line 207 (Tier 1 — Observe; line 209 Tier 2 — Branch; line 212 Tier 3 — Commit; line 216 Tier 4 — Operate). OpenSpec does not map to these tiers. `OpenSpec/AGENTS.md` is a 1-line file.

**Required controls.**

| Control | Description | Lifecycle gate |
| --- | --- | --- |
| Tier classification per task | Every agent run has an approved tier | Specification readiness |
| Tier escalation requires evidence | Risk assessment, owner approval, prior reliability, tool-scope review, rollback, monitoring | Execution |
| Prohibited-without-explicit-approval list | Production write, customer data export, permission changes, security policy changes, financial transactions, legal commitments, public communications | Execution |
| Hard autonomy caps from `domains/insurance.md` | Insurance-specific caps respected | Execution and release |
| Tier-appropriate human gates | Human in the loop at the right point of consequence | Execution and release |

**OpenSpec coverage.**

| Control | OpenSpec mechanism (verbatim evidence with path) | Enforcement Level | Gap | Severity |
| --- | --- | --- | --- | --- |
| Tier classification per task | Absent — no evidence in OpenSpec | Absent | No tier field on a change or task | Critical |
| Tier escalation requires evidence | Absent — no evidence in OpenSpec | Absent | No escalation gate | Critical |
| Prohibited-without-explicit-approval list | `OpenSpec/openspec/specs/cli-feedback/spec.md` line 167: `API keys, tokens, secrets with <redacted>` and line 176: `ask for explicit approval before submitting` — applied only to feedback submission, not to agent task scope | Instruction | No allowlist/denylist of prohibited actions for agent runs | Critical |
| Hard autonomy caps from `domains/insurance.md` | Absent — no evidence in OpenSpec. `domains/insurance.md` line 263 caps `Underwriting decisions for individual cover (personal lines)` at `**Tier 1** (observe only)`; line 268 caps `SCR calculation using internal model` at `**Tier 1** (observe only)` | Absent | OpenSpec has no tier field; insurance caps cannot be expressed | Critical |
| Tier-appropriate human gates | `OpenSpec/openspec/specs/cli-archive/spec.md` "Confirmation Behavior" defaults to `default to "No" for safety (require explicit "y" or "yes")` (line 121) — single Yes/No prompt only, removable by `--yes`/`-y` (line 12) | Instruction | One Markdown-archive prompt; no risk-graded human gates; bypassable | Critical |

**Manifesto principle anchors.** P5 (Autonomy is a tiered budget, not a switch), P10 (Containment), P4 (Right-size the swarm). Findings overlap P5 — see P5 score; not re-scored here.

**Domain Coverage Score.** **10/100** (Critical).

**Top remediation for Allianz.** Add a `tier:` field (1–4) and `prohibited_actions: []` array to a per-change `.openspec.yaml` per `OpenSpec/openspec/specs/openspec-conventions/spec.md`, hard-code the `domains/insurance.md` line 263–268 caps for any change tagged with `regulated_use_case: solvency_ii_internal_model | underwriting | claims | idd_advisory`, and refuse `openspec archive` when the declared tier exceeds the cap. Effort: **L**.

### 14.5 Tools, environment, and execution guardrails

**Domain question.** What can the agent touch?

**Required controls.**

| Control | Description | Lifecycle gate |
| --- | --- | --- |
| Least privilege | Permissions limited to approved task | Execution |
| Tool allowlist | Only approved tools and MCP servers | Execution |
| Environment isolation | Sandbox by default | Execution |
| Network egress control | Deny or restrict external calls | Execution |
| Secret isolation | No default secret access | Execution |
| Repository scope | No modification of unrelated repos | Execution |
| Branch protection | No direct commits to protected branches | Execution |
| Tool-call logging | Every call logged with input, output, trace, policy verdict | Execution + Audit |
| Dangerous command blocking | Destructive shell commands blocked unless explicitly approved | Execution |
| Session expiration | Permissions expire after task/session | Execution |
| Break-glass process | Emergency override requires human approval and audit | Execution |

**OpenSpec coverage.**

| Control | OpenSpec mechanism (verbatim evidence with path) | Enforcement Level | Gap | Severity |
| --- | --- | --- | --- | --- |
| Least privilege | Absent — no evidence in OpenSpec | Absent | No permission scope on agent runs | Critical |
| Tool allowlist | Absent — no evidence in OpenSpec | Absent | No `allowed_tools` per `operational-templates/agent-inventory-schema.md` | Critical |
| Environment isolation | Absent — no evidence in OpenSpec | Absent | No sandbox specification in `OpenSpec/openspec/specs/` | Critical |
| Network egress control | Absent — no evidence in OpenSpec | Absent | OpenSpec sends telemetry by default (`OpenSpec/openspec/specs/telemetry/spec.md` Requirement: "Disabled in CI"); no agent-side egress control | High |
| Secret isolation | `OpenSpec/openspec/specs/cli-feedback/spec.md` line 167: redact `API keys, tokens, secrets with <redacted>` — feedback path only | Instruction | Redaction is one-path; no general secret-isolation policy for agent runs | High |
| Repository scope | `OpenSpec/openspec/specs/workspace-foundation/spec.md` line 196: `OpenSpec SHALL keep repo ownership legible when planning happens in a workspace` — coordination boundary, not modification scope | Instruction | No write-scope enforcement | High |
| Branch protection | Absent — no evidence in OpenSpec | Absent | No protected-branch concept | High |
| Tool-call logging | Absent — no evidence in OpenSpec. `governance/integrated-audit-trail.md` line 13 "AEM execution trace" requires tool-call logging; no counterpart in OpenSpec | Absent | No tool-call log artefact | Critical |
| Dangerous command blocking | Absent — no evidence in OpenSpec | Absent | No destructive-command list | Critical |
| Session expiration | Absent — no evidence in OpenSpec | Absent | No session/permission TTL | High |
| Break-glass process | `OpenSpec/openspec/specs/cli-archive/spec.md` Requirement: "Archive Validation" / `Force archive without validation` (line 196): `- **WHEN** executing `openspec archive change-name --no-validate` / - **THEN** skip validation (unsafe mode) / - **AND** show warning about skipping validation` — bypass exists but is unaudited beyond a warning string | Instruction | Bypass is uncontrolled — no approver, audit record, or expiry; warning is text only | Critical |

**Manifesto principle anchors.** P3 (Defence-in-depth), P10 (Containment), P9 (Observability).

**Domain Coverage Score.** **12/100** (Critical).

**Top remediation for Allianz.** Bind every change to an `agent-inventory.json` record (per `operational-templates/agent-inventory-schema.md`) declaring `allowed_tools`, `allowed_egress_hosts`, and `protected_branches`, and replace the `--no-validate` "unsafe mode" flag in `OpenSpec/openspec/specs/cli-archive/spec.md` line 196 with a break-glass record that requires a named approver, expiry, and audit-trail emission. Effort: **L**.

### 14.6 Data, privacy, and confidentiality guardrails

**Domain question.** What information can agents see, use, store, infer, or disclose?

**Required controls.**

| Control | Description | Lifecycle gate |
| --- | --- | --- |
| Data classification | Public / internal / confidential / restricted / regulated | Specification + Execution |
| Purpose limitation | Data used only for approved task | Execution |
| Need-to-know access | Role-, task-, and context-based access | Execution |
| PII / PHI / PCI / secrets detection | Detect sensitive input and output | Execution + Verification |
| Data residency | Geography and jurisdiction enforced | Execution + Release |
| Prompt and context minimisation | Only necessary context included | Execution |
| Retrieval filtering | RAG constrained by user authorisation and task scope | Execution |
| Output redaction | Prevent leakage in responses, logs, PRs, issues | Verification |
| Memory controls | Govern what is stored long-term | Execution + Learning |
| Retention and deletion | Logs and traces retained per policy | Operations |
| Cross-tenant isolation | No leakage across customers, teams, environments | Execution |

**OpenSpec coverage.**

| Control | OpenSpec mechanism (verbatim evidence with path) | Enforcement Level | Gap | Severity |
| --- | --- | --- | --- | --- |
| Data classification | Absent — no evidence in OpenSpec | Absent | No data-classification field on a change; `domains/insurance.md` line 208 (`special category data under GDPR Article 9: health data, genetic data`) cannot be tagged | Critical |
| Purpose limitation | Absent — no evidence in OpenSpec | Absent | No purpose-limitation declaration | High |
| Need-to-know access | Absent — no evidence in OpenSpec | Absent | No role-based access on changes/specs | High |
| PII / PHI / PCI / secrets detection | `OpenSpec/openspec/specs/cli-feedback/spec.md` line 167: redact `API keys, tokens, secrets with <redacted>` — feedback submission path only | Instruction | Redaction limited to feedback path; no PII/PHI detector across agent inputs/outputs; GDPR Art. 9 special-category data per `domains/insurance.md` line 208 not covered | Critical |
| Data residency | Absent — no evidence in OpenSpec. `OpenSpec/openspec/specs/global-config/spec.md` line 8: `~/.config/openspec/config.json` stores telemetry config locally; `OpenSpec/openspec/specs/telemetry/spec.md` sends events to `PostHog`. `domains/insurance.md` line 233 requires `Data residency and cross-border transfer` enforcement under GDPR Chapter V | Absent | Telemetry destination is a third-party service; no residency control | Critical |
| Prompt and context minimisation | `OpenSpec/openspec/specs/rules-injection/spec.md` line 32: `- **WHEN** config has `rules: { proposal: ["Include rollback plan"] }` / - **THEN** instruction output includes `<rules>...</rules>``. Injection mechanism, not minimisation | Absent | No context-budget rule | High |
| Retrieval filtering | Absent — no evidence in OpenSpec | Absent | No RAG-authorisation gate | High |
| Output redaction | `OpenSpec/openspec/specs/cli-feedback/spec.md` line 167 redacts secrets in feedback only | Instruction | No general output-redaction rule | High |
| Memory controls | Absent — no evidence in OpenSpec | Absent | No memory-write gate | Critical |
| Retention and deletion | `OpenSpec/openspec/specs/cli-archive/spec.md` "Performing archive" preserves the change folder under `archive/YYYY-MM-DD-[change-name]` indefinitely | Instruction | Indefinite retention; no deletion or expiry policy | Medium |
| Cross-tenant isolation | Absent — no evidence in OpenSpec | Absent | No tenant boundary in `OpenSpec/openspec/specs/` | High |

**Manifesto principle anchors.** P7 (Context is engineered like code), P10 (Containment), P12 (Accountability).

**Domain Coverage Score.** **18/100** (Critical). Citing GDPR Art. 9 (`domains/insurance.md` line 208), GDPR Art. 22 (`domains/insurance.md` line 222), and GDPR Chapter V cross-border transfer (`domains/insurance.md` line 233–236).

**Top remediation for Allianz.** Add a `data_classification:` field (`public|internal|confidential|restricted|regulated|special_category`) to a per-change `.openspec.yaml`, plus a residency declaration, and gate `openspec archive` and the `OpenSpec/openspec/specs/telemetry/spec.md` send path on the field — block telemetry and archive when `regulated|special_category` data is present and residency is non-EEA. Effort: **L**.

### 14.7 DevSecOps guardrails

**Domain question.** Is the work secure, tested, compliant, and releasable through engineering controls?

**Required controls.**

| Control | Mandatory? | Notes |
| --- | --- | --- |
| Secrets scanning | Yes | Block any secret committed by human or agent |
| SAST | Yes | Stricter by tier |
| SCA / dependency scanning | Yes | License + vulnerability |
| Container scanning | If applicable | Containerised workloads |
| IaC scanning | If applicable | Terraform/CloudFormation/Helm/Kubernetes |
| DAST | For exposed services | Web/API exposure |
| API security testing | For APIs | AuthN/AuthZ, schema, rate limits, input validation |
| SBOM | For release | Required for production |
| Provenance / attestations | For release | High-integrity delivery |
| Test coverage threshold | Yes | Varies by system |
| Mutation / regression tests | For critical code | Catches shallow agent-generated tests |
| Policy-as-code checks | Yes | Architecture, security, cost, data, compliance |
| PR review | Yes | Human or independent agent + human gate by tier |

**OpenSpec coverage.**

| Control | OpenSpec mechanism (verbatim evidence with path) | Enforcement Level | Gap | Severity |
| --- | --- | --- | --- | --- |
| Secrets scanning | `OpenSpec/openspec/specs/cli-feedback/spec.md` line 167: redact `API keys, tokens, secrets with <redacted>` — feedback path only | Instruction | No commit-time secret scanner gate | Critical |
| SAST | Absent — no evidence in OpenSpec | Absent | No SAST gate | Critical |
| SCA / dependency scanning | Absent — no evidence in OpenSpec | Absent | No SCA gate | Critical |
| Container scanning | Absent — no evidence in OpenSpec | Absent | n/a | Medium |
| IaC scanning | Absent — no evidence in OpenSpec | Absent | n/a | Medium |
| DAST | Absent — no evidence in OpenSpec | Absent | n/a | Medium |
| API security testing | Absent — no evidence in OpenSpec | Absent | n/a | Medium |
| SBOM | Absent — no evidence in OpenSpec | Absent | No SBOM at archive | High |
| Provenance / attestations | Absent — no evidence in OpenSpec | Absent | No release attestation; cf. `governance/evidence-bundle-schema.md` line 51 `bundle_hash` and line 52 `bundle_signature` — no counterpart | Critical |
| Test coverage threshold | Absent — no evidence in OpenSpec. `OpenSpec/openspec/specs/opsx-verify-skill/spec.md` "Scenario coverage check" (line 63) checks scenarios in prose only | Absent | No coverage gate | High |
| Mutation / regression tests | Absent — no evidence in OpenSpec | Absent | No regression catalogue | High |
| Policy-as-code checks | `OpenSpec/openspec/specs/cli-validate/spec.md` Requirement: "Bulk and filtered validation" enforces Zod-schema Markdown validation with `level, path, message` JSON output (line 152). Structural-only | Instruction | Zod schemas check Markdown shape; no security/data/cost/compliance policies | High |
| PR review | `OpenSpec/openspec/specs/opsx-verify-skill/spec.md` Requirement: "Verification Report Format" / "Issue prioritization" emits `1. CRITICAL - Must fix before archive (missing implementation, incomplete tasks); 2. WARNING - Should fix; 3. SUGGESTION - Nice to fix`. Same agent runs both halves; non-blocking per `OpenSpec/docs/commands.md` "Does not block archive" | Instruction | No independent reviewer; agent reviews its own output | Critical |
| deletes_or_weakens_tests | Absent — no evidence in OpenSpec | Absent | No test-deletion guard | Critical |
| marks_tests_skipped_without_waiver | Absent — no evidence in OpenSpec | Absent | No skipped-test waiver | Critical |
| suppresses_security_findings_without_waiver | Absent — no evidence in OpenSpec | Absent | No finding-suppression waiver | Critical |
| changes_authentication_logic_without_review | Absent — no evidence in OpenSpec | Absent | No auth-change reviewer | Critical |
| changes_authorization_logic_without_review | Absent — no evidence in OpenSpec | Absent | No authz-change reviewer | Critical |
| modifies_crypto_code_without_expert_review | Absent — no evidence in OpenSpec | Absent | No crypto-change expert reviewer | Critical |
| introduces_eval_bypass | Absent — no evidence in OpenSpec | Absent | No eval-bypass detector | High |
| commits_generated_code_without_trace | Absent — no evidence in OpenSpec | Absent | No agent/model trace per `governance/integrated-audit-trail.md` line 13 | Critical |
| produces_code_without_relevant_tests | `OpenSpec/openspec/specs/opsx-verify-skill/spec.md` "Scenario coverage check" (line 63) checks if `tests exist that cover the scenario`; output is a WARNING that does not block | Instruction | Warning-only; `OpenSpec/docs/commands.md` "Does not block archive" | High |

**Boundary with Part 13.** Part 13 (Agent 07) scores OpenSpec's security posture as a system. §14.7 here scores the DevSecOps gates OpenSpec enforces over its own delivery. No re-score; cross-reference Part 13 for AGENTS.md-empty-file finding and PostHog-egress finding.

**Manifesto principle anchors.** P3 (Defence-in-depth), P8 (Evaluations are the contract).

**Domain Coverage Score.** **14/100** (Critical).

**Top remediation for Allianz.** Wire `openspec validate --all --strict --json` (`OpenSpec/openspec/specs/cli-validate/spec.md` "JSON output schema for bulk validation") into a CI pipeline that also runs secrets scanning, SAST, SCA, SBOM generation, and a regression evaluation harness — and have a separate CI job verify a release attestation conforming to `governance/evidence-bundle-schema.md` `bundle_metadata.signatures` (line 53) before any tag is allowed to ship. Effort: **L**.

### 14.8 Supply-chain guardrails

**Domain question.** Can we trust what the agent introduced or consumed?

**Required controls.**

| Asset | Guardrail | Lifecycle gate |
| --- | --- | --- |
| Open-source dependencies | SCA, license, provenance, maintainer health, malicious-package detection | Design + Release |
| Containers | Base-image approval, vulnerability scan, signing | Release |
| Models | Approved model registry, usage policy, data-handling terms, eval history | Design + Release |
| Prompts | Versioned, reviewed, tested, access-controlled | Execution |
| Tools / MCP servers | Allowlist, permissions manifest, logging, risk tiering | Execution |
| Datasets | Provenance, consent/legal basis, quality, poisoning checks | Execution + Learning |
| Generated code | Traceability, scan, review, tests | Verification + Release |
| Evaluation sets | Versioning, contamination checks, coverage | Verification |

**OpenSpec coverage.**

| Asset | OpenSpec mechanism (verbatim evidence with path) | Enforcement Level | Gap | Severity |
| --- | --- | --- | --- | --- |
| Open-source dependencies | Absent — no evidence in OpenSpec | Absent | No dependency-introduction rule | High |
| Containers | Absent — no evidence in OpenSpec | Absent | n/a | Medium |
| Models | `OpenSpec/README.md` line 160: `**Model selection**: OpenSpec works best with high-reasoning models. We recommend Opus 4.5 and GPT 5.2 for both planning and implementation` — recommendation only | Instruction | No approved-model registry per `regulatory/foundation-model-third-party-register.md` (DORA Pillar 4); model choice is unrestricted prose | Critical |
| Prompts | `OpenSpec/openspec/specs/rules-injection/spec.md` line 32: `- **WHEN** config has `rules: { proposal: ["Include rollback plan"] }` / - **THEN** instruction output includes `<rules>\n- Include rollback plan\n</rules>\n\n``. Rules are versioned via repo config | Instruction | No prompt review/test/access-control rule beyond config commit | High |
| Tools / MCP servers | Absent — no evidence in OpenSpec | Absent | No allowlist/permissions manifest per `operational-templates/agent-inventory-schema.md` | Critical |
| Datasets | Absent — no evidence in OpenSpec | Absent | No dataset provenance | High |
| Generated code | Absent — no evidence in OpenSpec | Absent | No traceability marker on agent-generated code per `governance/integrated-audit-trail.md` line 13 | Critical |
| Evaluation sets | Absent — no evidence in OpenSpec | Absent | No eval-set versioning per `OpenSpec/openspec/specs/cli-validate/spec.md`; scenario blocks live in spec but are not evaluation artefacts | Critical |

**Manifesto principle anchors.** P7 (Context is engineered like code), P10 (Containment), P8 (Evaluations).

**Domain Coverage Score.** **15/100** (Critical). Citing DORA Pillar 4 third-party register per `regulatory/foundation-model-third-party-register.md`.

**Top remediation for Allianz.** Add a `supply-chain.yaml` per change declaring approved model id+version, MCP server allowlist (per `operational-templates/agent-inventory-schema.md`), prompt version pin, and dataset provenance, and refuse `openspec archive` when any field is missing or the model is not on the DORA Pillar 4 register per `regulatory/foundation-model-third-party-register.md`. Effort: **L**.

### 14.9 Verification, validation, and evidence guardrails

**Domain question.** What proof exists?

**Required components.**

| Component | What it contains |
| --- | --- |
| Specification | Versioned spec, acceptance criteria, out-of-scope, risk classification |
| Design | ADRs, boundary impact, dependency review, threat model if required |
| Execution | Trace IDs, agent ID/version, tool-call log, changed files, generated artefacts |
| Verification | Unit, integration, acceptance, regression, security, policy results |
| Validation | Business-metric mapping, domain-owner review, user/operator validation |
| Release | Rollback test result, release decision record, waiver records, accountable sign-off |

**OpenSpec coverage.**

| Component | OpenSpec mechanism (verbatim evidence with path) | Enforcement Level | Gap | Severity |
| --- | --- | --- | --- | --- |
| Specification | `OpenSpec/openspec/specs/change-creation/spec.md` defines the change folder; `OpenSpec/docs/concepts.md` line 219 defines `### Requirement:` and line 222 `#### Scenario:`. Versioned via the change folder + git | Instruction | Acceptance criteria are prose; no risk classification field | High |
| Design | `OpenSpec/docs/concepts.md` line 411: `## Architecture Decisions / ### Decision: Context over Redux`. Optional per `OpenSpec/openspec/specs/opsx-verify-skill/spec.md` "No design.md" (line 96) | Instruction | Design optional; no threat-model requirement | Medium |
| Execution | Absent — no evidence in OpenSpec. `governance/integrated-audit-trail.md` line 13 "AEM execution trace" requires trace IDs, agent ID/version, tool-call log; OpenSpec has none of these | Absent | No execution-trace artefact | Critical |
| Verification | `OpenSpec/openspec/specs/opsx-verify-skill/spec.md` Requirement: "Completeness Verification" counts `tasks marked - [x] (complete) vs - [ ] (incomplete)` (line 31). Same-agent self-verification | Instruction | Self-verification, prose-only; no executable evaluation suite per P8 | High |
| Validation | Absent — no evidence in OpenSpec. `/opsx:verify` collapses verification, validation, and coherence into one skill (`OpenSpec/openspec/specs/opsx-verify-skill/spec.md` Purpose lines 1–4) | Absent | No business-metric mapping or domain-owner review | Critical |
| Release | `OpenSpec/openspec/specs/cli-archive/spec.md` "Performing archive" steps 1–5 (lines 50–55). No rollback-test result, no release decision record, no waiver record, no accountable sign-off | Instruction | Archive ≠ release; no `release_decision_record` per `governance/evidence-bundle-schema.md` | Critical |

**Block-completion rule.** `OpenSpec/openspec/specs/cli-archive/spec.md` "Task Completion Check" / "Incomplete tasks found" (line 36) prompts on `- [ ]` markers and `default to "No" for safety` — bypassable with `--yes` (line 12). The framework does NOT block completion when {no_trace, no_tests, stale_evidence, failing_required_check, missing_acceptance_criteria_mapping, missing_rollback_plan, missing_accountable_signoff} hold. Enforcement: `no_trace` Absent, `no_tests` Absent, `stale_evidence` Absent, `failing_required_check` Absent (warning per `/opsx:verify`), `missing_acceptance_criteria_mapping` Absent, `missing_rollback_plan` Instruction (rules-injection prompt only), `missing_accountable_signoff` Absent (workspace-links explicitly declines owner per `OpenSpec/openspec/specs/workspace-links/spec.md` line 271).

**Manifesto principle anchors.** P8 (Evaluations are the contract), P12 (Accountability requires intelligibility). Findings overlap P8 — see P8 score; not re-scored here.

**Domain Coverage Score.** **22/100** (Critical).

**Top remediation for Allianz.** Implement an `evidence-bundle.json` artefact per change conforming to `governance/evidence-bundle-schema.md` `aem_components` (line 55) with `bundle_hash` and `bundle_signature` (lines 51–52), and refuse `openspec archive` when any of {execution_trace, verification_report, validation_signoff, rollback_test_result, accountable_signoff} is missing. Effort: **L**.

### 14.10 Release and deployment guardrails

**Domain question.** Should this verified artefact be deployed now?

**Required controls.**

| Control | Description |
| --- | --- |
| Release decision record | Explicit deploy/no-deploy decision |
| Environment readiness | Target environment healthy and compatible |
| Change window | Deployment timing approved |
| Rollback tested | Rollback verified in representative environment |
| Progressive delivery | Feature flags, canary, blue/green, phased rollout |
| Separation of duties | Builder and releaser separated |
| Release approver | Named accountable human |
| Customer/user impact review | Required for external-facing changes |
| Compliance artefacts | Required before regulated releases |
| Post-release monitoring plan | Metrics, alerts, owner, timeframe |

**OpenSpec coverage.**

| Control | OpenSpec mechanism (verbatim evidence with path) | Enforcement Level | Gap | Severity |
| --- | --- | --- | --- | --- |
| Release decision record | Absent — no evidence in OpenSpec. `OpenSpec/openspec/specs/cli-archive/spec.md` archives a Markdown bundle; not a deploy decision | Absent | No release decision record; `archive` ≠ `release` | Critical |
| Environment readiness | Absent — no evidence in OpenSpec | Absent | No environment check | High |
| Change window | Absent — no evidence in OpenSpec | Absent | No change-window concept | High |
| Rollback tested | `OpenSpec/openspec/specs/rules-injection/spec.md` line 32: rules-injection of `Include rollback plan` is prompt prose; not enforced | Instruction | Rollback prose only; no rollback-test artefact | Critical |
| Progressive delivery | Absent — no evidence in OpenSpec | Absent | No flag/canary/phased rollout integration | High |
| Separation of duties | `OpenSpec/openspec/specs/cli-archive/spec.md` Confirmation Behavior allows `--yes` (line 12) bypass; no separation between builder and releaser | Absent | One-actor flow; same agent authors, validates, and archives | Critical |
| Release approver | `OpenSpec/openspec/specs/workspace-links/spec.md` line 271: `OpenSpec SHALL not ask for owner or handoff metadata` | Absent | No release approver concept | Critical |
| Customer/user impact review | Absent — no evidence in OpenSpec | Absent | No public-impact gate | High |
| Compliance artefacts | Absent — no evidence in OpenSpec | Absent | No regulatory-classification artefact per `domains/insurance.md` line 263 caps | Critical |
| Post-release monitoring plan | Absent — no evidence in OpenSpec | Absent | No SLO/alert plan per `operational-templates/slo-table.md` | High |

**Block-release rule.** OpenSpec does NOT block release when any of {evidence_bundle_incomplete, rollback_untested, unresolved_critical_security_finding, unresolved_high_security_finding_without_waiver, architecture_violation, cost_threshold_exceeded_without_approval, missing_operational_owner, deployment_outside_authorized_window} hold. Enforcement levels: all Absent except `architecture_violation` Instruction (no validator rule but Markdown design pattern in `OpenSpec/docs/concepts.md` line 411).

**Manifesto principle anchors.** P3 (Defence-in-depth), P12 (Accountability), P10 (Containment).

**Domain Coverage Score.** **15/100** (Critical). Citing Solvency II Art. 112–127 internal model approval per `domains/insurance.md` line 51, and Solvency II major-vs-minor change classification per `domains/insurance.md` lines 77–87.

**Top remediation for Allianz.** Treat `openspec archive` as a documentation event and introduce a separate `openspec release` command that requires an `evidence-bundle.json` (per `governance/evidence-bundle-schema.md`), a rollback-test attestation, and a named release approver distinct from the implementer; refuse release for Solvency-II-scope changes without supervisory pre-approval evidence per `domains/insurance.md` line 86. Effort: **XL**.

### 14.11 Operational resilience guardrails

**Domain question.** Can this system be safely operated after deployment?

**Required controls.**

| Control | Description |
| --- | --- |
| Service owner | Named owner after deployment |
| Runbook | Diagnosis, rollback, escalation, recovery |
| SLO / SLA | Reliability expectations |
| Monitoring | Metrics, logs, traces, model/agent behaviour |
| Alerting | Actionable alerts routed to owners |
| Incident response | Severity, escalation, communication |
| Rollback / roll-forward | Tested recovery path |
| Disaster recovery | Backup, restore, RTO/RPO |
| Drift detection | Behaviour, cost, security, model, data, dependency drift |
| Post-incident learning | Incidents update specs, tests, policies, memory |

**OpenSpec coverage.**

| Control | OpenSpec mechanism (verbatim evidence with path) | Enforcement Level | Gap | Severity |
| --- | --- | --- | --- | --- |
| Service owner | `OpenSpec/openspec/specs/workspace-links/spec.md` line 271 declines owner | Absent | No service-owner field | Critical |
| Runbook | Absent — no evidence in OpenSpec | Absent | No runbook artefact | High |
| SLO / SLA | Absent — no evidence in OpenSpec; cf. `operational-templates/slo-table.md` has no counterpart | Absent | No SLO artefact | High |
| Monitoring | `OpenSpec/openspec/specs/telemetry/spec.md` "Privacy-preserving event design" sends only `command: "init"` and `version: "<version>"` to PostHog (line 25) — product telemetry, not operational monitoring | Instruction | Anonymous product telemetry only; no agent-runtime monitoring | High |
| Alerting | Absent — no evidence in OpenSpec | Absent | No alerting | High |
| Incident response | Absent — no evidence in OpenSpec | Absent | No incident-response process | High |
| Rollback / roll-forward | Prose-only via `OpenSpec/openspec/specs/rules-injection/spec.md` line 32 | Instruction | No tested rollback artefact | High |
| Disaster recovery | Absent — no evidence in OpenSpec | Absent | No DR/RTO/RPO | High |
| Drift detection | Absent — no evidence in OpenSpec | Absent | No drift detector | High |
| Post-incident learning | Absent — no evidence in OpenSpec | Absent | No incident-to-spec link per `manifesto-principles.md` P9 (Observability covers reasoning) | High |

**Agent-runtime operations monitored.** None of {task success rate, policy violation rate, tool error rate, human override rate, hallucination/invalid-output rate, cost-per-successful-task, repeated failure patterns, autonomy escalation frequency} are monitored by OpenSpec. `OpenSpec/openspec/specs/telemetry/spec.md` line 21 explicitly excludes `command arguments, file paths, project names, spec content, error messages, or IP addresses` from telemetry, so no agent-runtime signal is collected.

**Manifesto principle anchors.** P9 (Observability covers reasoning), P10 (Containment). Findings overlap P9 — see P9 score; not re-scored here.

**Domain Coverage Score.** **15/100** (Critical). Citing DORA Art. 6 ICT-risk-management and DORA Art. 17 ICT-related-incident-management.

**Top remediation for Allianz.** Wire OpenSpec runs into an external observability stack that emits trace per `governance/integrated-audit-trail.md` line 13, with SLO targets per `operational-templates/slo-table.md` and an incident-to-spec feedback loop that creates a `## ADDED Requirements` delta on incident closure. Effort: **L**.

### 14.12 FinOps and economics guardrails

**Domain question.** Is the cost of this work known, bounded, attributable, and proportionate to value?

**Required controls.**

| Control | Description |
| --- | --- |
| Cost estimation before execution | Token/model/tool/infra/test/review cost estimated |
| Budget per task/workflow | Hard and soft limits |
| Model routing policy | Cheapest sufficient model; escalate only when justified |
| Retry budget | Prevent infinite or wasteful retry loops |
| Tool-call budget | Limit expensive searches, builds, deployments, scans |
| Environment TTL | Auto-expire sandboxes and preview environments |
| Cost-per-outcome tracking | Cost per accepted PR, resolved issue, release, incident avoided |
| Budget alerts | Alert owner before threshold breach |
| Cost anomaly detection | Detect runaway loops or abnormal usage |
| Value review | Cost compared to business value and risk reduction |

**OpenSpec coverage.**

| Control | OpenSpec mechanism (verbatim evidence with path) | Enforcement Level | Gap | Severity |
| --- | --- | --- | --- | --- |
| Cost estimation before execution | Absent — no evidence in OpenSpec | Absent | No cost-estimation field | High |
| Budget per task/workflow | Absent — no evidence in OpenSpec | Absent | No budget enforcement | High |
| Model routing policy | `OpenSpec/README.md` line 160: `**Model selection**: OpenSpec works best with high-reasoning models. We recommend Opus 4.5 and GPT 5.2 for both planning and implementation`. Recommendation pushes towards the most expensive tier | Instruction | The recommendation contradicts P11 (cheapest sufficient model); no cost-aware routing | High |
| Retry budget | Absent — no evidence in OpenSpec | Absent | No retry budget | High |
| Tool-call budget | Absent — no evidence in OpenSpec | Absent | No tool-call budget | High |
| Environment TTL | Absent — no evidence in OpenSpec | Absent | No sandbox TTL | Medium |
| Cost-per-outcome tracking | Absent — no evidence in OpenSpec | Absent | No cost/outcome metric | High |
| Budget alerts | Absent — no evidence in OpenSpec | Absent | No alerting | High |
| Cost anomaly detection | Absent — no evidence in OpenSpec | Absent | No anomaly detection | High |
| Value review | Absent — no evidence in OpenSpec | Absent | No value/cost ratio review | Medium |

**Required metrics.** None of {cost per accepted change, cost per validated outcome, cost per failed run, cost per policy violation, cost per rollback avoided, cost per human approval, cost per autonomy tier} are emitted or tracked by OpenSpec.

**Manifesto principle anchors.** P11 (Optimize the economics of intelligence), P4 (Right-size the swarm). Findings overlap P11 — see P11 score; not re-scored here.

**Domain Coverage Score.** **12/100** (Critical).

**Top remediation for Allianz.** Add a per-change `cost-budget.yaml` (token/model/tool budgets) and post-archive `cost-actual.json` (emitted by the CI runner that invoked the agent), and refuse archive when actual cost exceeds budget without a named approver; remove the `Opus 4.5 and GPT 5.2` recommendation from `OpenSpec/README.md` line 160 in Allianz's internal fork and replace with a tiered routing policy. Effort: **M**.

### 14.13 Human guardrails (training, certification, behaviour)

**Domain question.** Are the humans who specify, supervise, approve, and rely on agents qualified, certified, and protected from rubber-stamping?

**Required controls.**

| Control | Description |
| --- | --- |
| Role-based training | Different training for users, engineers, reviewers, approvers, owners, executives |
| Certification before approval rights | Humans cannot approve high-risk agent work without qualification |
| Review checklists | Evidence-based human-review checklists |
| Anti-rubber-stamping controls | Detect repeated fast approvals, low review depth, same-person loops |
| Human escalation paths | Clear paths for uncertainty, incident, policy violation |
| Prompt hygiene training | Avoid leaking secrets, regulated data, bad instructions |
| Secure agent-use training | Tool risks, data boundaries, hallucination |
| Architecture review training | Reviewers know enterprise standards |
| FinOps awareness | Users understand cost of retries, large-context prompts, high-end models |
| Legal/compliance awareness | Users know what cannot be delegated or disclosed |

**OpenSpec coverage.**

| Control | OpenSpec mechanism (verbatim evidence with path) | Enforcement Level | Gap | Severity |
| --- | --- | --- | --- | --- |
| Role-based training | Absent — no evidence in OpenSpec | Absent | No role concept | High |
| Certification before approval rights | Absent — no evidence in OpenSpec | Absent | No certification gate | Critical |
| Review checklists | `OpenSpec/openspec/specs/opsx-verify-skill/spec.md` Requirement: "Verification Report Format" provides `## Verification Report: <change-name> / ### Summary / Dimension | Status / Completeness | X/Y / Correctness | X/Y / Coherence | Followed` (lines 122–133). Checklist for an agent run, not a human reviewer | Instruction | Checklist is agent self-report, not human checklist | High |
| Anti-rubber-stamping controls | `OpenSpec/openspec/specs/cli-archive/spec.md` line 12 `--yes` `Skip confirmation prompts (for automation)` and line 121 `default to "No" for safety` — single Yes/No prompt is the entire human-gate surface. The `--yes` flag is the canonical rubber-stamp path | Absent | No detection of {approval_time_below_threshold, repeated_approval_without_comments, approval_of_failed_or_stale_evidence, same_human_approves_own_agent_run} | Critical |
| Human escalation paths | `OpenSpec/openspec/specs/cli-feedback/spec.md` Requirement: "Feedback submission" lets users send feedback to maintainers with `presents the draft to the user for approval` (line 151). Maintainer feedback channel, not an internal escalation path | Instruction | No internal escalation path | High |
| Prompt hygiene training | `OpenSpec/openspec/specs/cli-feedback/spec.md` line 167 redacts `API keys, tokens, secrets with <redacted>` — runtime redaction, not training | Absent | No training in `OpenSpec/openspec/specs/` | High |
| Secure agent-use training | Absent — no evidence in OpenSpec | Absent | No training | High |
| Architecture review training | Absent — no evidence in OpenSpec | Absent | No training | Medium |
| FinOps awareness | Absent — no evidence in OpenSpec | Absent | No training; the `OpenSpec/README.md` line 160 recommendation increases token spend | Medium |
| Legal/compliance awareness | Absent — no evidence in OpenSpec | Absent | No training | High |

**Anti-rubber-stamping signals.** None of {approval_time_below_threshold, repeated_approval_without_comments, approval_of_failed_or_stale_evidence, same_human_approves_own_agent_run} are measured by OpenSpec. The `--yes` flag (line 12 of `OpenSpec/openspec/specs/cli-archive/spec.md`) is structurally a same-human-approves-own-agent-run path.

**Boundary with Part 12.** Part 12 governance failure modes (Agent 07) include `automated_rubber_stamping` and `approval_laundering`. Findings here are the human-side controls; cross-reference Part 12, do not duplicate.

**Manifesto principle anchors.** P12 (Accountability), P5 (Tier-appropriate human gates). Findings overlap P12 — see P12 score; not re-scored here.

**Domain Coverage Score.** **15/100** (Critical). Citing Solvency II Art. 48 actuarial-function independence per `domains/insurance.md` line 94, and SR 11-7 §V effective challenge.

**Top remediation for Allianz.** Replace the `--yes` automation bypass in `OpenSpec/openspec/specs/cli-archive/spec.md` line 12 with a signed approver attestation (named human distinct from the agent runner) and emit anti-rubber-stamping signals (approval-time, comment-presence, identity-distinctness, evidence-freshness) into the audit trail per `governance/integrated-audit-trail.md` line 13. Effort: **L**.

### 14.14 Legal, compliance, and policy guardrails

**Domain question.** Are we allowed to do this? Can we prove it?

**Required controls.**

| Area | Guardrail |
| --- | --- |
| Regulatory classification | Identify applicable rules before execution |
| Contractual restrictions | Customer, vendor, licensing, data-use contracts |
| IP and copyright | Generated code, training data, third-party content, license compatibility |
| Records retention | Decisions, approvals, traces, evidence preserved |
| Explainability | Required for high-impact decisions |
| Audit readiness | Evidence exportable and understandable |
| Cross-border transfer | Jurisdiction and residency enforced |
| Accessibility | Required for user-facing systems |
| AI disclosure | Required where users must know AI is involved |
| Third-party model terms | Data usage, retention, indemnity, confidentiality terms verified |

**OpenSpec coverage.**

| Area | OpenSpec mechanism (verbatim evidence with path) | Enforcement Level | Gap | Severity |
| --- | --- | --- | --- | --- |
| Regulatory classification | Absent — no evidence in OpenSpec | Absent | No regulatory tag per `domains/insurance.md` line 263 caps | Critical |
| Contractual restrictions | Absent — no evidence in OpenSpec | Absent | No contract-restriction field | High |
| IP and copyright | `OpenSpec/LICENSE` (MIT) and `OpenSpec/README.md` line 172: `AI-generated code is welcome — as long as it's been tested and verified. PRs containing AI-generated code should mention the coding agent and model used (e.g., "Generated with Claude Code using claude-opus-4-5-20251101")` — disclosure norm for the framework's own contributors | Instruction | No license-compatibility check on generated code; norm is contributor-only | High |
| Records retention | `OpenSpec/openspec/specs/cli-archive/spec.md` retains the change folder under `archive/YYYY-MM-DD-[change-name]` indefinitely | Instruction | Indefinite ≠ policy; no per-jurisdiction retention schedule | Medium |
| Explainability | `OpenSpec/openspec/specs/cli-validate/spec.md` Requirement: "Invalid results SHALL include a Next steps footer" gives natural-language remediation. Markdown explainability for validator output only | Instruction | No agent-decision explainability per EU AI Act Art. 13/14 | Critical |
| Audit readiness | `OpenSpec/openspec/specs/cli-validate/spec.md` "JSON output schema for bulk validation" emits `{ items[], summary, version }` (line 152). Structural reports, not audit evidence per `governance/evidence-bundle-schema.md` | Instruction | JSON is exportable but contains no provenance, signature, or evidence | High |
| Cross-border transfer | `OpenSpec/openspec/specs/telemetry/spec.md` Requirement: "Anonymous identifier" sends to PostHog (line 92 `flushAt: 1`); `OpenSpec/openspec/specs/global-config/spec.md` line 8 stores config locally. No residency control per GDPR Chapter V (`domains/insurance.md` line 233) | Absent | Telemetry leaves the jurisdiction by default | Critical |
| Accessibility | Absent — no evidence in OpenSpec | Absent | No accessibility check | Medium |
| AI disclosure | `OpenSpec/README.md` line 172: `PRs containing AI-generated code should mention the coding agent and model used` — contributor norm, not user-facing AI disclosure per EU AI Act Art. 50 | Instruction | No user-facing AI disclosure | High |
| Third-party model terms | `OpenSpec/README.md` line 160 recommends `Opus 4.5 and GPT 5.2` without verifying data-handling terms per `regulatory/foundation-model-third-party-register.md` (DORA Pillar 4) | Instruction | No model-terms verification | Critical |

**Regulated-use-case requirements.** None of {legal_basis, policy_mapping, data_protection_review, audit_evidence, human_accountability, retention_schedule} are captured per change in OpenSpec. Cf. `domains/insurance.md` line 213: GDPR Art. 9 requires a legal basis for processing health/genetic data; no field exists for it.

**Block conditions.** OpenSpec does NOT block on any of {unknown_data_rights, incompatible_license, missing_records_policy, unapproved_cross_border_processing, unresolved_regulatory_obligation}.

**Manifesto principle anchors.** P12 (Accountability requires intelligibility), P10 (Containment of regulatory failure).

**Domain Coverage Score.** **15/100** (Critical). Citing GDPR Art. 9 special-category data (`domains/insurance.md` line 213), GDPR Art. 22 automated decision-making (`domains/insurance.md` line 222), GDPR Chapter V cross-border transfer (`domains/insurance.md` line 233), Solvency II Art. 112–127 internal model approval (`domains/insurance.md` line 51), DORA Art. 28 third-party register per `regulatory/foundation-model-third-party-register.md`, and EU AI Act Art. 50 AI disclosure.

**Top remediation for Allianz.** Add a `regulatory.yaml` per change declaring `legal_basis`, `policy_mapping`, `data_protection_review`, `human_accountability`, and `retention_schedule`, and disable telemetry (`OpenSpec/openspec/specs/telemetry/spec.md`) by default in Allianz's internal fork; refuse archive when any regulated_use_case lacks supervisory pre-approval evidence per `domains/insurance.md` line 86. Effort: **L**.

### 14.15 Learning, memory, and continuous improvement guardrails

**Domain question.** What can the system remember, reuse, escalate, and learn from failures?

**Required controls.**

| Control | Description |
| --- | --- |
| Memory classification | Separate durable facts, heuristics, preferences, temporary context |
| Provenance requirement | Every memory item has source and evidence |
| Expiry and review | Memory expires or is reviewed periodically |
| No secret memory | Secrets and regulated data cannot be stored as memory |
| Failure learning | Failures update tests, policies, specs, or tools BEFORE retry |
| Eval updates | New failure modes become regression tests |
| Drift review | Detect changes in agent/model behaviour or assumptions |
| Human approval for high-impact memory | Agents cannot silently update critical operating rules |

**OpenSpec coverage.**

| Control | OpenSpec mechanism (verbatim evidence with path) | Enforcement Level | Gap | Severity |
| --- | --- | --- | --- | --- |
| Memory classification | `OpenSpec/openspec/specs/openspec-conventions/spec.md` separates `proposal.md / specs / design.md / tasks.md` (lines 50–57) — artefact classification, not memory classification. `OpenSpec/openspec/specs/rules-injection/spec.md` injects rules from config | Instruction | No durable/heuristic/preference/temporary distinction | High |
| Provenance requirement | `OpenSpec/openspec/specs/cli-archive/spec.md` "Performing archive" preserves the change folder; provenance is the git history of the folder | Instruction | No source/evidence/trace_id field per `governance/evidence-bundle-schema.md` `aem_components` (line 55) | High |
| Expiry and review | Absent — no evidence in OpenSpec | Absent | No memory expiry; archived changes live forever | High |
| No secret memory | `OpenSpec/openspec/specs/cli-feedback/spec.md` line 167 redacts secrets in feedback only | Instruction | No general no-secret-memory rule for spec/design/proposal authoring | High |
| Failure learning | `OpenSpec/docs/concepts.md` lines 730–737 "The virtuous cycle: 1. Specs describe current behavior; 2. Changes propose modifications (as deltas); 3. Implementation makes the changes real; 4. Archive merges deltas into specs; 5. Specs now describe the new behavior; 6. Next change builds on updated specs". Updates flow through deltas, not through failure-triggered learning | Instruction | No failure-triggered improvement-before-retry mechanism | High |
| Eval updates | Absent — no evidence in OpenSpec | Absent | No regression-test addition on failure | Critical |
| Drift review | Absent — no evidence in OpenSpec | Absent | No drift detector | High |
| Human approval for high-impact memory | `OpenSpec/openspec/specs/cli-archive/spec.md` Confirmation Behavior at archive (line 100) — single Yes/No bypassable by `--yes` | Instruction | Single non-tiered prompt; no high-impact category | High |

**Memory-write gate.** OpenSpec does NOT require {source, trace_id, evidence_reference, classification, expiry_or_review_date} on every memory write; it does NOT block writes when {contains_secret, contains_unapproved_personal_data, derived_from_failed_or_unverified_output, contradicts_authoritative_source, lacks_owner} hold. The closest mechanism is `OpenSpec/openspec/specs/cli-validate/spec.md` Markdown-shape validation, which checks none of the above.

**Operating principle.** *A failed agent run must improve the harness before it is retried.* Evidence: absent. `OpenSpec/openspec/specs/opsx-verify-skill/spec.md` Requirement: "Incomplete tasks found" suggests `Complete remaining tasks or mark as done if already implemented` (line 51) — re-run path without harness improvement. `OpenSpec/openspec/specs/cli-validate/spec.md` "Next steps footer" suggests fixes for the current change only — not harness changes.

**Manifesto principle anchors.** P6 (Knowledge and memory are infrastructure), P2 (Specifications are living artifacts), P10 (Containment). Findings overlap P6 — see P6 score; not re-scored here.

**Domain Coverage Score.** **22/100** (Critical).

**Top remediation for Allianz.** Add a `memory-write.json` artefact per change declaring `{source, trace_id, evidence_reference, classification, expiry_or_review_date, owner}` and refuse archive when any required field is missing or when the change is `derived_from_failed_or_unverified_output`; bind incident closure to a mandatory new `## ADDED Requirements` regression scenario per `OpenSpec/docs/concepts.md` line 484. Effort: **L**.

---

*Intermediate file prepared 2026-05-08 based on source files in `OpenSpec/` at 1.3.1. Agent 08b lifts §14.1–§14.15 verbatim and produces the canonical Part 14 output file.*
