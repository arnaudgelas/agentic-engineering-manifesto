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
