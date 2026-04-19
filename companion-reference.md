# Companion Guide — Failure Modes and Skill Requirements

*How this manifesto can fail, and the skills teams need to implement it.*

Read the [Manifesto](manifesto.md) for the core values and minimum bars.
See the [Companion Guide](companion-guide.md) for the full table of contents.
See the [Adoption Playbook](adoption-playbook.md) for organizational change
management, role transitions, and pilot design.

---

## Failure Modes of This Manifesto

These are failure modes of the manifesto's technical implementation. For
failure modes of the organizational change process (adoption without support,
incentive mismatch, skipping phases), see the
[Adoption Playbook](adoption-metrics.md#common-failure-modes-of-the-change-program).

Applied poorly, this manifesto can fail through:

- **Over-governance**: Constraints so heavy that human coding becomes faster.
  The tell: lead time increases without corresponding quality improvement.
  The fix: reduce ceremony, widen Tier 1/Tier 2 boundaries, and measure
  whether governance overhead is justified by incident reduction.

- **Evidence theater**: Large bundles with low signal. Teams produce
  voluminous evidence artifacts that nobody reads and that don't catch real
  failures. The tell: evidence bundle size grows while escaped defect rate
  stays flat. The fix: audit which evidence artifacts actually influenced a
  decision in the last quarter. Cut the rest.

- **Control theater**: Humans nominally accountable but operationally blind.
  A named domain owner "approves" changes they cannot meaningfully review
  because volume exceeds capacity. The tell: approval latency drops to near
  zero (rubber-stamping). The fix: reduce autonomy scope until review is
  meaningful, or invest in automated pre-screening that surfaces only the
  exceptions worth human attention.

- **Security theater**: Policies documented but not enforced at tool/runtime
  boundaries. The architecture describes constraints that no infrastructure
  actually blocks. The tell: agents violate documented policies with no
  system-level detection. The fix: enforce before you document — if the
  infrastructure can't block it, the policy is aspirational, not real.

- **Adoption theater**: Teams adopt the manifesto's vocabulary without its
  discipline. Evidence bundles are renamed PR descriptions. Autonomy tiers
  are defined but not enforced. Maturity self-assessments are aspirational.
  The tell: the language changes but incident patterns don't. The fix:
  measure outcomes (escaped defect rate, incident severity, rollback
  frequency), not adoption checkboxes.

- **Maturity inflation**: Teams self-assess at Phase 4 or 5 because the
  phase descriptions are aspirational enough to pattern-match to current
  practice. The tell: a team claims Phase 4 but cannot produce an evidence
  bundle for a recent change. The fix: use the phase-calibrated evidence
  examples ([Operational Definitions](companion-frameworks.md#operational-definitions))
  as a litmus test — the evidence you can actually produce determines your
  phase, not the practices you intend to adopt.

- **Verification without validation**: Every gate passes, evidence bundles
  are complete, escaped defect rate is low — but the team ships the wrong
  thing. The specification was never worth implementing, and the manifesto's
  verification machinery confirmed the implementation was *correct* without
  anyone confirming it was *valuable*. The tell: system quality metrics
  improve while business outcome metrics (adoption, usage, revenue impact,
  customer satisfaction) stay flat or decline. The fix: treat the Agentic
  Loop's Observe → Learn phases as validation checkpoints — connect
  evaluation results to business outcomes, define stop criteria (not just
  acceptance criteria) for every specification, and make business
  assumptions explicit before the Loop begins. See the
  [Validation vs. Verification](companion-principles.md#validation-vs-verification)
  section in P2 extended guidance.

- **Structural regression without detection**: Every change passes current
  tests, regression suites are green, evidence bundles are complete — but the
  codebase is progressively harder to maintain. Each iteration's decisions
  (naming conventions, dependency structures, architectural choices) create
  friction that compounds across subsequent iterations. The code is locally
  correct but globally harmful. The tell: iteration-over-iteration regression
  frequency rises, time per change increases, and specification convergence
  slows — all while current test pass rates remain high. The fix: track
  evolution-weighted metrics (see
  [EvoScore](companion-frameworks.md#operational-definitions) in Operational
  Definitions), monitor coupling and dependency trajectories across iterations,
  and include structural quality indicators in evaluation portfolios alongside
  behavioral regression tests. See the
  [Structural Regression](companion-principles.md#behavioral-regression-vs-structural-regression)
  section in P8 extended guidance. The SWE-CI benchmark (arXiv:2603.03823)
  provides empirical evidence: most agents introduce regressions in over 75% of
  CI iterations, many of which are structural rather than behavioral.

The corrective action is always the same: reduce ceremony, increase signal, and
measure cycle time, defect rate, and incident severity together.

---

## Skill Requirements by Principle

Not all principles require the same skills. This table helps teams identify
capability gaps before they become adoption blockers. See the
[Adoption Playbook](adoption-playbook.md) for guidance on building these
capabilities.

| Principle | Core Skill Required | Team Readiness | Notes |
|---|---|---|---|
| P1 — Outcomes | CI/CD, release engineering | Ready | Existing pipelines need extension, not replacement |
| P2 — Specifications | Formal requirements, contract design | Reorient | Requirements skills exist but need machine-readable precision. Agent Skills, AGENTS.md, and specification-driven development frameworks provide concrete formats and workflows |
| P3 — Architecture | Infrastructure engineering, policy-as-code | Reorient | Infra skills exist but policy-as-code enforcement is new |
| P4 — Swarm Topology | Distributed systems design | Acquire | Few teams have multi-agent coordination experience. A2A protocol provides emerging standards for agent discovery and task delegation |
| P5 — Autonomy | Security engineering, access control | Reorient | Access control exists but agent-specific tier enforcement is new. Infrastructure-level policy systems (YAML-based permissions, audit logs, guardrail constraints) offer reference implementations |
| P6 — Knowledge & Memory | Data engineering, information retrieval | Acquire | Memory governance (provenance, expiration, rollback) is a new discipline. Git-native agent memory systems provide early reference architectures |
| P7 — Context | ML/retrieval engineering, context engineering | Acquire | Retrieval engineering at agent scale requires specialized skills. Agent-to-tool protocols, capability definitions, and agent memory systems form an emerging tooling ecosystem |
| P8 — Evaluations & Proofs | Test engineering, formal methods | Split | Test engineering: ready. Formal methods: acquire (and defer until Phase 5) |
| P9 — Observability | SRE, distributed tracing | Reorient | SRE exists but agentic traces require new schema and tooling. Emerging interoperability standards under neutral governance (AAIF) provide the foundation |
| P10 — Emergence | Chaos engineering, security | Acquire | Chaos engineering for agentic systems has no established playbook. Early autonomous agent security incidents provide case studies |
| P11 — Economics | FinOps, cost optimization | Reorient | FinOps exists but total-cost-of-correctness models are new |
| P12 — Accountability | Incident management, compliance | Ready | Incident management extends naturally; compliance may need updates |

**Reading the Readiness column:**
- **Ready**: The skill exists and applies with minor extension.
- **Reorient**: The skill exists but must be redirected toward agentic concerns.
  Training and practice are sufficient; hiring is not required.
- **Split**: Part of the skill is ready; part must be acquired separately.
- **Acquire**: The skill is rare or nonexistent in most teams. Requires hiring,
  dedicated training, or partnering with specialists.

Principles marked "Acquire" are the adoption bottlenecks. Do not attempt
these at full depth without investing in the skill. Start with "Ready" and
"Reorient" principles (P1, P3, P5, P9, P12) and build toward the harder
ones incrementally. The [Adoption Playbook](adoption-playbook.md) maps these
skills to specific phase transitions.

---

## Annotated Agent Configuration Template

Every project needs an agent configuration file (commonly named `AGENTS.md`,
`CLAUDE.md`, or similar depending on tooling). Neither the manifesto nor most
tooling documentation provides a starting point. Use this template — adapt it,
do not just copy it. Annotations explain what each section must contain and
whether it is mandatory per CoE policy.

```markdown
# [Project Name] — Agent Instructions

## Scope and Version
<!-- RECOMMENDED. Establish ownership and applicability before the agent reads further. -->
Owner: [name or team]
Last updated: [date]
Applicable systems: [which services, repos, or pipelines this file governs]

## Project Overview
<!-- MANDATORY. 3-5 lines. What does this service do? What domain does it own?
     What is its upstream/downstream position in the system? -->
[Service name] is responsible for [core function]. It owns [domain boundary].
Upstream: [what feeds into it]. Downstream: [what consumes its output].
Stack: [language, framework, runtime].

## Build, Test, Deploy Commands
<!-- MANDATORY. Agents must be able to run these without asking. -->
Build:  [command]
Test:   [command]          # Must exit 0 before any PR
Lint:   [command]
Deploy: [command or "see CI pipeline — do not deploy manually"]

## Domain Constraints
<!-- MANDATORY. What must this agent never do in this codebase? -->
- Never modify [schema/table/config] without a migration file and a rollback.
- Never call external APIs directly — use the adapter layer at [path].
- Never generate pricing, underwriting, or claims logic — flag for human review.
- [Any other non-negotiable domain boundary]

## Security
<!-- MANDATORY. Do not duplicate enterprise-wide policy here; link to the
     governing file instead. Add only project-specific security constraints. -->
Follows enterprise security rules. Project-specific additions:
- All [entity type] inputs must be validated against [schema/contract] at [path].
- [Any project-specific credential or secret handling requirement]

## Testing Conventions
<!-- MANDATORY. Agents must know how tests are structured before writing them. -->
Test location: [path pattern]
Naming: [convention, e.g., describe/it or TestFunctionName_Scenario]
Mocking: [approved mock strategy — real DB / in-memory / stub]
Coverage threshold: [minimum %, matches hook threshold]

## Commit and PR Conventions
<!-- MANDATORY. -->
Commit format: [conventional commits / other]
PR title: [format]
Every agent-assisted commit must include: "Co-Authored-By: [agent-id]"

## Architecture Notes
<!-- RECOMMENDED. Key decisions agents must respect. Keep brief. -->
- [ADR reference or one-line constraint, e.g., "hexagonal architecture — no
  framework code in domain layer"]
- [Data flow constraint, e.g., "all writes go through the command bus at [path]"]

## MCP Integrations in Use
<!-- RECOMMENDED. List approved MCPs available in this project. -->
- [MCP name]: [what it does, what data classification it can access]

## What NOT to Put Here
<!-- Advisory — for the human writing this file -->
Do not include: credentials, environment variable values, hostnames, IPs,
information that belongs in enterprise rules (already loaded), information
that should be in a path-scoped rule file.
Do not exceed 200 lines. Use @path/to/file imports for larger reference docs.
```

**CoE review checklist for project agent configuration file:**
- [ ] Project Overview: domain boundary clearly stated
- [ ] Build/test/deploy commands: all present and tested
- [ ] Domain Constraints: no overlap with enterprise-managed agent configuration
- [ ] Security section: references enterprise rules rather than duplicating them
- [ ] Testing Conventions: coverage threshold matches hook threshold
- [ ] No credentials, hostnames, or environment-specific values
- [ ] Under 200 lines

---

## Cross-Domain Supplier and Vendor Qualification

Every regulated domain requires qualification of critical suppliers of
software systems. In agentic engineering, "supplier" is an ambiguous
category — LLM providers, open-source frameworks, agent runtimes, and
tool integrations all fall into scope. This section provides a
cross-domain synthesis; domain documents provide the regulatory specifics.

### Who Is the Supplier?

| Component | Supplier Type | Qualification Obligation | Key Issue |
|---|---|---|---|
| Commercial LLM API (OpenAI, Anthropic, etc.) | Named vendor with terms of service | Vendor assessment: data handling, version notification, SLA, incident notification | No access to training data, model weights, or full anomaly documentation. Regulatory expectations were written for traditional software suppliers. |
| Open-source foundation model (Llama, Mistral, etc.) | No identified supplier entity | **Deploying organization assumes full supplier responsibility**: validation, maintenance, version control, anomaly tracking, incident response | No quality agreement possible. The QMS burden falls entirely on the deployer. |
| Agent framework / orchestration library | OSS or commercial | Same as above, based on licensing model | Framework updates may change agent behavior without semantic versioning signals |
| MCP tool integrations | Varies | Each tool integration is a system boundary requiring supplier qualification appropriate to the data classification it can access | External API access expands the effective supply chain |
| Agent memory infrastructure | Internal or vendor | Internal: first-party governance. Vendor: assess data residency, backup/recovery, retention controls | Memory stores may hold regulated data; the store's supplier must be qualified accordingly |

### The Open-Source Supplier Problem

GAMP 5 (pharma), ISO 13485 (medical devices), and SR 11-7 (financial
services) assume an identifiable supplier with a quality system. Open-source
foundation models have no such entity. The deploying organization must
formally document that it assumes supplier responsibilities. This is not
optional — it is the regulatory consequence of the build decision.

**Documentation required:**
1. **Assumption of supplier responsibilities**: A formal record stating that
   the organization assumes full validation, maintenance, monitoring, anomaly
   tracking, and incident response responsibilities for the open-source model.
2. **Version management plan**: How model versions are tracked, tested before
   upgrade, and rolled back if needed.
3. **Anomaly tracking**: How the organization monitors community-reported
   issues and assesses impact on its validated use cases.
4. **Exit strategy**: How the organization would migrate to a different model
   if the open-source project is abandoned or compromised.

### Cross-Domain Qualification Minimum Requirements

Regardless of domain, agent supplier qualification should address:

| Requirement | Why It Matters | Minimum Evidence |
|---|---|---|
| Data handling and residency | Regulated data must not leave compliant infrastructure | Data processing agreement or on-premises deployment confirmation |
| Version notification | Model updates change agent behavior | Version change notification procedure with minimum lead time |
| Availability SLA | Agent unavailability is an ICT operational risk | SLA documentation with incident notification commitments |
| Security posture | Agent infrastructure is an attack surface | Security assessment (SOC 2, ISO 27001, or equivalent) |
| Sub-processor visibility | Data may pass through additional third parties | Sub-processor list and flow-down requirements |
| Exit strategy | Concentration risk requires mitigation | Multi-model routing plan (P11) as DORA/third-party risk mitigation |

**Multi-vendor routing as qualification simplification.** P11's multi-model
routing strategy (routing tasks to the cheapest capable model) also reduces
supplier qualification burden by preventing dangerous concentration in a
single provider — a regulatory requirement under DORA for financial services,
and a prudent risk management practice in all regulated domains. Each
provider still requires qualification, but no single provider's failure
can take down the entire capability.

---

## Ecosystem References

This guide references standards and tools that are evolving rapidly. Rather
than duplicate descriptions that will age, we list the categories that matter
and point to the authoritative sources.

**Standards under AAIF governance:** MCP (agent-to-tool), A2A (agent-to-agent),
Agent Skills (capability definition), AGENTS.md (repository-level constraints).
The Agentic AI Foundation, launched December 2025 under the Linux Foundation,
provides neutral governance across these protocols.

**Specification-driven development frameworks:** Multiple open-source frameworks
enforce the specification-first workflow described in P2: specify before
implementing, treat specs as code artifacts, and consume them at agent runtime.
See [Sources](beyond-agile-sources.md) refs 43–47 for specific projects.

**Memory and coordination infrastructure:** Git-native agent memory systems,
autonomous agent runtimes with infrastructure-level policy enforcement, and
continuous integration benchmarks for structural regression. See
[Sources](beyond-agile-sources.md) refs 40–42 for specifics.

The manifesto does not endorse specific tools. Its contribution is the
governance model that applies across them. The [Sources](beyond-agile-sources.md)
file carries the dated references; this guide carries the principles.
