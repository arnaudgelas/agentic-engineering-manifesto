# Sub-prompt 08a — Enterprise Guardrail Domain Assessments (Part 14, §14.1–§14.15)

**Purpose.** Produce per-domain assessments for the 15 enterprise agentic guardrail domains: §14.1 Governance, §14.2 Architectural, §14.3 Specification & demand, §14.4 Autonomy & agency, §14.5 Tools & execution, §14.6 Data & privacy, §14.7 DevSecOps, §14.8 Supply-chain, §14.9 Verification/Validation/Evidence, §14.10 Release & deployment, §14.11 Operational resilience, §14.12 FinOps & economics, §14.13 Human controls, §14.14 Legal/Compliance/Policy, §14.15 Learning/Memory.

This is the producer half of the agent 08a / 08b split. The cross-cutting matrix (§14.16), 12 non-negotiables (§14.17), agent/task card schema verification (§14.18), and Enterprise Guardrail Maturity Verdict (§14.19) are produced by agent 08b in Wave 1b, which lifts §14.1–§14.15 verbatim from this file.

**Premise (read carefully before scoring).** Agentic guardrails are not only AI guardrails — they are enterprise delivery guardrails applied to a system in which agents can act. A guardrail model that protects only against bad model behaviour, while leaving wrong architecture, uncontrolled cost, weak ownership, unsafe deployment, regulatory gaps, poor human review, and untraceable accountability exposed, is incomplete. Score `[[FRAMEWORK]]` against this enterprise-grade bar.

**Placeholder reminder.** Before executing, confirm `[[FRAMEWORK]]`, `[[FRAMEWORK_LOWER]]`, `[[FRAMEWORK_VERSION]]`, `[[ORGANIZATION]]`, `[[INDUSTRY]]`, `[[DOMAIN_FILE]]`, `[[PRIOR_REVIEWS]]`, and `[[MANIFESTO_HASH]]` have been substituted. If any `[[...]]` pattern remains, stop and report.

**Output file.** Write one file: `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_08a_domains.md`. This is an **intermediate file** that agent 08b lifts. The canonical Part 14 file (`_review_08_enterprise_guardrails.md`) is written by agent 08b, not by this prompt.

**Canonical thresholds.** Severity, score ranges, effort labels, and principle weightings come from `prompt.md`. Reference; do not redefine.

**Banned soft language.** Output MUST NOT contain `consider`, `may`, `could potentially`, `perhaps`, `use judgement`, `use judgment`. State controls, gaps, severities, and remediations as direct facts. Where a fact is unknown, state it as `unknown` — do not hedge.

**Evidence requirement.** Every claim about `[[FRAMEWORK]]`, manifesto files, or `[[DOMAIN_FILE]]` MUST be supported by a verbatim quote (≤ 3 lines, in backticks or fenced) drawn from the named source file with its absolute path. Paraphrase is not evidence.

**Re-scoring prohibition.** This prompt MUST NOT re-score P1–P12 or restate the composite score. Where a domain finding overlaps with a principle (e.g., 14.4 Autonomy ↔ P5; 14.9 Evidence ↔ P8; 14.11 Operational resilience ↔ P9; 14.12 FinOps ↔ P11; 14.1 Governance ↔ P12), cite the principle by number — do not assign a new score to the principle.

**Idempotence (preflight).** Before writing, Glob `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_08a_domains.md`. If the file exists with ≥ 20 lines AND contains all 15 H3 sections (`### 14.1` through `### 14.15`), exit without writing. Otherwise rewrite.

---

## 1. Inputs to read

Read all of the following before writing a single scored claim. Do not score from memory.

1. **`[[FRAMEWORK]]` source artefacts** — read systematically across the 15 domains. For each domain, search for: documented controls, policies, schemas, gates, or checklists; configuration files that encode the control as policy-as-code; runtime mechanisms (functions, decorators, middleware, hooks); templates, runbooks, or operating instructions; evidence-bundle, agent-card, task-card, or release-decision artefacts that prove the control fired.

2. **`manifesto/manifesto.md`** — the agentic loop, loop-readiness gate, governance fabric, and accountability anchors.

3. **`manifesto/manifesto-principles.md` plus `manifesto/manifesto-principles-01.md` through `manifesto/manifesto-principles-12.md`** — read in full. Cross-reference these principles when scoring each domain:
   - **P1** (Outcomes are the unit of work) — relevant to 14.3 (Specification & demand) and 14.9 (Evidence).
   - **P2** (Specifications are living artifacts) — relevant to 14.3 and 14.15 (Learning/memory).
   - **P3** (Architecture is defence-in-depth) — relevant to 14.2 (Architectural) and 14.5 (Tools/execution).
   - **P4** (Right-size the swarm) — relevant to 14.4 (Autonomy) and 14.12 (FinOps).
   - **P5** (Autonomy is a tiered budget) — relevant to 14.4 (Autonomy).
   - **P6** (Knowledge and memory are infrastructure) — relevant to 14.15 (Learning/memory).
   - **P7** (Context is engineered like code) — relevant to 14.6 (Data/privacy) and 14.8 (Supply chain).
   - **P8** (Evaluations are the contract) — relevant to 14.9 (Evidence) and 14.7 (DevSecOps).
   - **P9** (Observability covers reasoning) — relevant to 14.11 (Operational resilience) and 14.1 (Governance).
   - **P10** (Assume emergence; engineer containment) — relevant to all 15 domains; in particular 14.4, 14.5, 14.6, 14.8, 14.10, 14.11.
   - **P11** (Optimize economics of intelligence) — relevant to 14.12 (FinOps).
   - **P12** (Accountability requires intelligibility) — relevant to 14.1 (Governance), 14.13 (Human), 14.14 (Legal/compliance).

4. **`manifesto/manifesto-done.md`** — the Agentic Definition of Done, evidence-bundle requirements, hardening DoD, agentic provenance record, evidence freshness rules, accountability sign-off.

5. **`adoption/path.md`** and `adoption/` directory — phase-specific guardrail expectations (especially Phases 4–6).

6. **`companion/frameworks.md`** and the `companion/principles` source group — companion expectations on guardrail coverage and per-phase failure modes.

7. **Cross-stack normative artefacts (lift only AEM-relevant content; apply scope guard from `prompt.md`):**
   - `governance/evidence-bundle-schema.md` — read the `aem_components` and `bundle_metadata` (integrity / signature) sections. Use to score §14.9.
   - `governance/integrated-audit-trail.md` — AEM execution trace section. Use to score §14.1, §14.5, §14.11.
   - `governance/governance-integration-note.md` — AEM Tier 4 section. Use to score §14.1 (kill switch, segregation of duties) and §14.4 (autonomy escalation).

8. **`[[DOMAIN_FILE]]`** — read in full for: hard autonomy caps (§14.4); regulations binding enterprise delivery (§14.14); records-retention, residency, audit obligations (§14.6, §14.14); risk-tier thresholds. **Scope guard.** If `[[DOMAIN_FILE]]` references out-of-scope corpora, ignore those sections.

9. **Regulatory crosswalks** (cite when adding specificity AND when the regulation appears in `[[DOMAIN_FILE]]`):
   - `regulatory/eu-ai-act-addendum.md` — Articles 9, 10, 12, 14, 15, 17, 27, 72, 73.
   - `regulatory/foundation-model-third-party-register.md` — DORA Pillar 4. Use for §14.8 and §14.14.
   - `regulatory/nist-ai-rmf-crosswalk.md` — Govern/Map/Measure/Manage + GenAI Profile (G1–G12). Map to §14.1, §14.6, §14.8, §14.14, §14.15.
   - `regulatory/iso-42001-crosswalk.md` — Annex A controls (A.2–A.10). Map to §14.1, §14.13, §14.14, §14.15.
   - `regulatory/iso-23894-23053-crosswalk.md` — risk treatment and AI lifecycle. Map to §14.1, §14.11, §14.14.
   - `regulatory/incidents-appendix.md` — named real-world incidents. Use to inform §14.16 (in agent 08b) by surfacing relevant per-domain failures here.

10. **Operational templates** (cite when bounding a domain control's implementation):
    - `operational-templates/agent-inventory-schema.md` — anchors §14.5 Allowed-tools and §14.1 Audit registry.
    - `operational-templates/ai-risk-register.md` — anchors §14.1 Risk acceptance and §14.14 Records.
    - `operational-templates/slo-table.md` — anchors §14.11 Operational SLOs and §14.10 Release gates.
    - `operational-templates/decommissioning-checklist.md` — anchors §14.10 (controlled retirement) and §14.8 (model deprecation).

11. **Wave-internal cross-references.** This prompt runs in Wave 1a. **Do not read Wave 1a sibling outputs** (they are not guaranteed to exist when this prompt begins). Where a finding overlaps a principle, cite the principle (P1–P12); the merge agent resolves part-number cross-references downstream.

12. **`[[PRIOR_REVIEWS]]`** — if not `none`, read all listed files. Where a prior review records the same domain finding, cross-reference (do not duplicate).

---

## 2. Methodology — the 15 Enterprise Guardrail Domains

For each of the 15 domains below, produce a subsection with this fixed structure:

### 2.0.1 Per-domain output structure (mandatory)

```
### 14.{N} {Domain name}

**Domain question.** {one-sentence question this domain answers}

**Required controls.** [Markdown table: Control | Description | Lifecycle gate]

**`[[FRAMEWORK]]` coverage.** [Markdown table: Control | `[[FRAMEWORK]]` mechanism (verbatim evidence with path) | Enforcement Level (Infrastructure / Instruction / Absent) | Gap | Severity]

**Manifesto principle anchors.** {List the P{N} principles this domain maps to, by number and name}

**Domain Coverage Score.** {0–100, severity label per `prompt.md`}

**Top remediation for `[[ORGANIZATION]]`.** {one concrete, named artefact/mechanism, with effort label per `prompt.md`}
```

### 2.1 14.1 Governance guardrails

**Domain question.** Who is allowed to let an agent do what, under whose accountability, with which evidence?

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

**Anchors.** P12 (Accountability requires intelligibility), P9 (Observability), P10 (Containment of governance failure modes).

### 2.2 14.2 Architectural guardrails

**Domain question.** Is the agent allowed to make this design decision, in this system, using this pattern, under these enterprise standards?

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

**Agent-specific architectural blockers** to assess explicitly (each as a row in the coverage table, all under 14.2):
- modifies_public_contract_without_consumer_impact_assessment
- introduces_new_runtime_without_platform_approval
- creates_cross_domain_coupling_without_adr
- duplicates_existing_capability_without_search_evidence
- bypasses_platform_abstractions
- writes_to_non_owned_database
- bypasses_event_contract_or_schema_registry

**Anchors.** P3 (Architecture is defence-in-depth), P10 (Containment).

### 2.3 14.3 Specification and demand guardrails

**Domain question.** Should this work enter the agentic engineering loop at all?

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

**Block-entry rule** to assess: does `[[FRAMEWORK]]` block work entry when any of {accountable_owner, measurable_success_metric, acceptance_criteria, risk_tier, data_classification, rollback_expectation, out_of_scope, definition_of_done} is missing? State the enforcement level for each.

**Anchors.** P1 (Outcomes are the unit of work), P2 (Specifications are living artifacts).

### 2.4 14.4 Autonomy and agency guardrails

**Domain question.** How much freedom does the agent have?

Map `[[FRAMEWORK]]`'s autonomy model to the **canonical AEM autonomy tiers** in the P5 shard (Tier 1 — Suggest; Tier 2 — Suggest+Verify; Tier 3 — Execute-with-approval; Tier 4 — Bounded autonomous). Cite the tier text verbatim.

| Control | Description | Lifecycle gate |
| --- | --- | --- |
| Tier classification per task | Every agent run has an approved tier | Specification readiness |
| Tier escalation requires evidence | Risk assessment, owner approval, prior reliability, tool-scope review, rollback, monitoring | Execution |
| Prohibited-without-explicit-approval list | Production write, customer data export, permission changes, security policy changes, financial transactions, legal commitments, public communications | Execution |
| Hard autonomy caps from `[[DOMAIN_FILE]]` | `[[INDUSTRY]]`-specific caps respected | Execution and release |
| Tier-appropriate human gates | Human in the loop at the right point of consequence | Execution and release |

**Anchors.** P5 (Autonomy is a tiered budget), P10 (Containment), P4 (Right-size the swarm).

### 2.5 14.5 Tools, environment, and execution guardrails

**Domain question.** What can the agent touch?

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

**Anchors.** P3 (Defence-in-depth), P10 (Containment), P9 (Observability).

### 2.6 14.6 Data, privacy, and confidentiality guardrails

**Domain question.** What information can agents see, use, store, infer, or disclose?

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

**Anchors.** P7 (Context is engineered like code), P10 (Containment), P12 (Accountability).

### 2.7 14.7 DevSecOps guardrails

**Domain question.** Is the work secure, tested, compliant, and releasable through engineering controls?

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

**Agent-specific DevSecOps blockers** to assess (each a row in the coverage table):
- deletes_or_weakens_tests
- marks_tests_skipped_without_waiver
- suppresses_security_findings_without_waiver
- changes_authentication_logic_without_review
- changes_authorization_logic_without_review
- modifies_crypto_code_without_expert_review
- introduces_eval_bypass
- commits_generated_code_without_trace
- produces_code_without_relevant_tests

**Boundary with Part 13.** Part 13 (Agent 07) scores the *security posture* of `[[FRAMEWORK]]` as a system. §14.7 scores the *DevSecOps gates* `[[FRAMEWORK]]` enforces over its own delivery. If a finding overlaps, cross-reference Part 13 — do not duplicate evidence.

**Anchors.** P3 (Defence-in-depth), P8 (Evaluations are the contract).

### 2.8 14.8 Supply-chain guardrails

**Domain question.** Can we trust what the agent introduced or consumed?

Asset scope is **broader than code dependencies**: prompts, models, datasets, MCP servers, plugins, containers, generated code, evaluation datasets.

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

**Anchors.** P7 (Context is engineered like code), P10 (Containment), P8 (Evaluations).

### 2.9 14.9 Verification, validation, and evidence guardrails

**Domain question.** What proof exists?

The required evidence bundle (assess each component against `manifesto/manifesto-done.md` and `governance/evidence-bundle-schema.md`):

| Component | What it contains |
| --- | --- |
| Specification | Versioned spec, acceptance criteria, out-of-scope, risk classification |
| Design | ADRs, boundary impact, dependency review, threat model if required |
| Execution | Trace IDs, agent ID/version, tool-call log, changed files, generated artefacts |
| Verification | Unit, integration, acceptance, regression, security, policy results |
| Validation | Business-metric mapping, domain-owner review, user/operator validation |
| Release | Rollback test result, release decision record, waiver records, accountable sign-off |

**Block-completion rule** to assess: does `[[FRAMEWORK]]` block completion if any of {no_trace, no_tests, stale_evidence, failing_required_check, missing_acceptance_criteria_mapping, missing_rollback_plan, missing_accountable_signoff} hold?

**Anchors.** P8 (Evaluations are the contract), P12 (Accountability requires intelligibility).

### 2.10 14.10 Release and deployment guardrails

**Domain question.** Should this verified artefact be deployed now?

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

**Block-release rule** to assess: does `[[FRAMEWORK]]` block release if any of {evidence_bundle_incomplete, rollback_untested, unresolved_critical_security_finding, unresolved_high_security_finding_without_waiver, architecture_violation, cost_threshold_exceeded_without_approval, missing_operational_owner, deployment_outside_authorized_window} hold?

**Anchors.** P3 (Defence-in-depth), P12 (Accountability), P10 (Containment).

### 2.11 14.11 Operational resilience guardrails

**Domain question.** Can this system be safely operated after deployment?

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

**Agent-runtime operations** — assess whether `[[FRAMEWORK]]` monitors: task success rate, policy violation rate, tool error rate, human override rate, hallucination/invalid-output rate, cost-per-successful-task, repeated failure patterns, autonomy escalation frequency.

**Anchors.** P9 (Observability covers reasoning), P10 (Containment).

### 2.12 14.12 FinOps and economics guardrails

**Domain question.** Is the cost of this work known, bounded, attributable, and proportionate to value?

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

**Required metrics** to verify in `[[FRAMEWORK]]`: cost per accepted change, cost per validated outcome, cost per failed run, cost per policy violation, cost per rollback avoided, cost per human approval, cost per autonomy tier.

**Anchors.** P11 (Optimize the economics of intelligence), P4 (Right-size the swarm).

### 2.13 14.13 Human guardrails (training, certification, behaviour)

**Domain question.** Are the humans who specify, supervise, approve, and rely on agents qualified, certified, and protected from rubber-stamping?

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

**Anti-rubber-stamping signals** to assess: approval_time_below_threshold, repeated_approval_without_comments, approval_of_failed_or_stale_evidence, same_human_approves_own_agent_run.

**Boundary with Part 12.** §12.4 governance failure modes (Agent 07) include `automated_rubber_stamping` and `approval_laundering`. §14.13 scores the *human-side controls* that prevent these modes — cross-reference, do not duplicate.

**Anchors.** P12 (Accountability), P5 (Tier-appropriate human gates).

### 2.14 14.14 Legal, compliance, and policy guardrails

**Domain question.** Are we allowed to do this? Can we prove it?

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

**Regulated-use-case requirements** — assess: legal_basis, policy_mapping, data_protection_review, audit_evidence, human_accountability, retention_schedule.

**Block conditions** — assess: unknown_data_rights, incompatible_license, missing_records_policy, unapproved_cross_border_processing, unresolved_regulatory_obligation.

**Anchors.** P12 (Accountability requires intelligibility), P10 (Containment of regulatory failure).

### 2.15 14.15 Learning, memory, and continuous improvement guardrails

**Domain question.** What can the system remember, reuse, escalate, and learn from failures?

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

**Memory-write gate** to assess — does `[[FRAMEWORK]]` require {source, trace_id, evidence_reference, classification, expiry_or_review_date} on every memory write, and block writes when {contains_secret, contains_unapproved_personal_data, derived_from_failed_or_unverified_output, contradicts_authoritative_source, lacks_owner}?

**Operating principle** to test: *A failed agent run must improve the harness before it is retried.* Quote evidence (or its absence).

**Anchors.** P6 (Knowledge and memory are infrastructure), P2 (Specifications are living artifacts), P10 (Containment).

---

## 3. Output Specification

Write the file `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_08a_domains.md` with the following exact structure:

```
# [[FRAMEWORK]] Review — Part 14 §14.1–§14.15: Enterprise Guardrail Domain Assessments (intermediate)

**Framework:** [[FRAMEWORK]]
**Version:** [[FRAMEWORK_VERSION]]
**Client:** [[ORGANIZATION]]
**Industry:** [[INDUSTRY]]
**Reviewer:** Agent 08a
**Date:** YYYY-MM-DD
**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]`
**Sources reviewed:** [list every file read]

**Scope note.** This file is the intermediate output for the 15 enterprise guardrail domains (§14.1–§14.15). Agent 08b lifts these sections verbatim into the canonical Part 14 file `_review_08_enterprise_guardrails.md`, adds §14.16 (cross-cutting matrix), §14.17 (twelve non-negotiables), §14.18 (agent/task card schemas), and §14.19 (maturity verdict). Do NOT compute the maturity verdict here. Do NOT compute the cross-cutting matrix here. Do NOT re-score P1–P12; overlaps cite the principle by number.

---

### 14.1 Governance guardrails
[per-domain output structure]

### 14.2 Architectural guardrails
[per-domain output structure]

### 14.3 Specification and demand guardrails
[per-domain output structure]

### 14.4 Autonomy and agency guardrails
[per-domain output structure]

### 14.5 Tools, environment, and execution guardrails
[per-domain output structure]

### 14.6 Data, privacy, and confidentiality guardrails
[per-domain output structure]

### 14.7 DevSecOps guardrails
[per-domain output structure]

### 14.8 Supply-chain guardrails
[per-domain output structure]

### 14.9 Verification, validation, and evidence guardrails
[per-domain output structure]

### 14.10 Release and deployment guardrails
[per-domain output structure]

### 14.11 Operational resilience guardrails
[per-domain output structure]

### 14.12 FinOps and economics guardrails
[per-domain output structure]

### 14.13 Human guardrails (training, certification, behaviour)
[per-domain output structure]

### 14.14 Legal, compliance, and policy guardrails
[per-domain output structure]

### 14.15 Learning, memory, and continuous improvement guardrails
[per-domain output structure]

---

*Intermediate file prepared YYYY-MM-DD based on source files in `[[FRAMEWORK_LOWER]]/` at [[FRAMEWORK_VERSION]]. Agent 08b lifts §14.1–§14.15 verbatim and produces the canonical Part 14 output file.*
```

---

## 4. Hard rules

- **Read `[[FRAMEWORK]]`'s source artefacts before scoring.** Every claim must be grounded in a specific file, function, rule, or artefact. Name it and quote it verbatim.
- **Verbatim quotes required.** A claim with no verbatim quote is unsupported and fails the self-check.
- **Separate evidence for and evidence against** each domain coverage. Where `[[FRAMEWORK]]` has a partial control, state that explicitly.
- **Ground every regulatory claim in a specific clause** from `[[DOMAIN_FILE]]` or a regulatory crosswalk, and only when that regulation appears in `[[DOMAIN_FILE]]`.
- **No praise without evidence.**
- **Do not penalise out-of-scope gaps — but note them.**
- **Do not re-score P1–P12.** Overlapping findings reference the principle by number.
- **Do not re-score Part 12 / Part 13.** Overlapping findings cross-reference the part number without duplication.
- **Do not produce §14.16, §14.17, §14.18, or §14.19.** Those sections are agent 08b's responsibility.
- Severity, effort, and weighting all come from `prompt.md`.
- Use date format **YYYY-MM-DD** throughout. British English.
- When cross-referencing other parts of the review, use canonical part numbers.
- **Out-of-scope corpus / tracked-files-only.** Every source file cited MUST be tracked by git on the current branch. Do not read or reference `asdlc/`, `aplc/`, `agentic-sdlc-handbook/`, `intelligence-governance-manifesto/`, `agentic-enterprise-manifesto/`, `agentic-enterprise.{md,html}`, `agentic-governance-stack.{md,html}`, `manifesto-evolution-plan.{md,html}`, `phase-assessment-checklist.{md,html}`, `asdlc-plan*`, `aplc-plan*`, or `igm-aent-coherence-review*`. Output MUST contain zero matches for the tokens `ASDLC`, `APLC`, `IGM`, `AEnt-M`, `AEnt_M`, `intelligence-governance-manifesto`, `agentic-enterprise-manifesto`, `agentic-enterprise`, `agentic-governance-stack`, `manifesto-evolution-plan`, `phase-assessment-checklist`, or `agentic-sdlc-handbook`.

---

## 5. Self-check before writing — gate

Each item is binary. A single failure blocks the write.

- [ ] All `[[VARIABLE]]` placeholders substituted.
- [ ] `[[FRAMEWORK]]` artefacts have been read — specific files named in sources-reviewed header.
- [ ] `manifesto/manifesto.md`, the `manifesto-principles` source group, and `manifesto/manifesto-done.md` have been read.
- [ ] `[[DOMAIN_FILE]]` has been read; at least three specific regulatory articles or clauses cited across §14.6, §14.10, §14.13, §14.14.
- [ ] All 15 domain subsections (§14.1 through §14.15) are present and non-empty, each with the per-domain output structure (Domain question, Required controls table, `[[FRAMEWORK]]` coverage table, Manifesto principle anchors, Domain Coverage Score, Top remediation).
- [ ] Each `[[FRAMEWORK]]` coverage table has every row populated with verbatim evidence (or explicit `Absent — no evidence in `[[FRAMEWORK]]``) and an Enforcement Level of `Infrastructure` / `Instruction` / `Absent`.
- [ ] No domain subsection re-scores any of P1–P12; overlaps reference the principle by number.
- [ ] No domain subsection re-scores Part 12 or Part 13; overlaps cross-reference the part number.
- [ ] No §14.16, §14.17, §14.18, or §14.19 content appears in this file (those are agent 08b's responsibility).
- [ ] Zero matches for any out-of-scope-corpus token.
- [ ] No banned soft language present.
- [ ] Every claim about `[[FRAMEWORK]]`, manifesto files, or `[[DOMAIN_FILE]]` is supported by a verbatim quote with absolute path.
- [ ] All severity labels match canonical bands in `prompt.md`. All effort labels match `prompt.md` (S/M/L/XL).
- [ ] All dates in YYYY-MM-DD format. British English throughout.
- [ ] Output file path is `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_08a_domains.md`.
