# Agentic Engineering — Companion Guide

*Extended guidance, tradeoffs, failure modes, and reference material for each
principle in the Agentic Engineering Manifesto.*

This guide provides the deeper rationale, advanced bars, and operational detail
behind each principle. Read the [Manifesto](manifesto.md) first for the core
values and minimum bars. Come here when implementing.

---

## Principle 1 — Outcomes: Extended Guidance

### The Probability-Compounding Problem

A common intuition is that system correctness compounds multiplicatively — if
each module is correct with probability `p`, a system of `N` modules has roughly
`p^N` correctness. This mental model is misleading in two directions:

- **Too optimistic**, because it assumes independent failures. Real agentic
  systems share models, knowledge bases, and tool chains that create correlated
  failure domains. A single poisoned retrieval shard or a shared model blind spot
  can invalidate every agent simultaneously — far worse than `p^N` predicts.
- **Too pessimistic**, because cross-verification between agents can break the
  compounding chain in ways that independent modules cannot. When agents verify
  each other's outputs against independent evidence sources, the effective error
  rate can be driven below any individual module's failure rate.

The useful question is not "what is `p^N`?" but **"where are the shared
dependencies that make failures correlated?"** A working failure-domain
decomposition:

- **Correlated model failure**: The same base model is used everywhere, making
  reasoning blind spots systemic.
- **Correlated retrieval failure**: The same poisoned or stale knowledge base
  shard feeds multiple agents. In practice, this is often the most insidious
  class because it produces plausible-looking but systematically wrong outputs.
- **Correlated tool failure**: The same flaky integration or API rate limit
  blocks the entire swarm.
- **Correlated governance failure**: The same reviewer fatigue or policy
  misconfiguration rubber-stamps errors.

This is a practitioner framework, not a proven exhaustive taxonomy. Teams should
extend it for their specific failure surfaces and validate priority ordering
against their own incident data. The shared dependencies it names mean
system-level risk is often much worse than independent-failure models suggest —
but also that targeted decorrelation (diverse models, independent retrieval
indexes, redundant tool chains) can yield outsized reliability gains.

### Evidence Bundles and Assurance Levels

This does not mean full formal verification is a near-term default for every
team. It means assurance must scale with blast radius and system size.
Evidence bundles should be immutable, replayable, and auditable, with proof
artifacts introduced where risk justifies cost: signed trace manifests when
required by policy, deterministic replay artifacts, and formalized invariants
verified by proof or model-checking tools where warranted.

---

## Principle 2 — Specifications: Extended Guidance

### Contract-First Agentic Development

In practice, this can include contract-first agentic development: agents propose
both implementation and machine-checkable contracts (preconditions,
postconditions, invariants), then iterate in a tight loop: specify, implement,
attempt to prove, fail, refine, repeat. Proof failure is not a blocker to hide;
it is a steering signal.

### Convergence Criteria

Specification evolution needs convergence criteria. Treat a specification as
converging when acceptance criteria remain stable across successive iterations,
scope narrows rather than expands, and incident classes trend downward. If each
loop adds ambiguity or expanding goals without quality improvement, treat it as
scope drift and reset the boundary.

---

## Principle 3 — Architecture: Extended Guidance

### Prompt Drift and Enforcement

Prompts drift, and context windows degrade. They approximate compliance — they
do not guarantee it the way a compiler obeys syntax. When architecture is
merely described rather than enforced, agents will violate it. When architecture
is enforced but not monitored, violations will go undetected.

Build deterministic infrastructure wrappers around your probabilistic AI.
Enforce permissions, repository gates, API rate limits, and data access at the
system level. If an agent tries to execute a destructive command, the
infrastructure — not the AI's internal logic — must block it. This contains
your blast radius and protects against prompt injection, hallucination loops,
and poisoned memory banks.

### Domain-Driven Design for Swarms

Domain-Driven Design gives each swarm a bounded context — what it owns, where
code belongs, what is forbidden to reinvent. Retrieval is untrusted input;
treat context injection as a threat vector. This reduces swarm collisions and
hardens the system against both accidental drift and adversarial conditions.

---

## Principle 4 — Swarm Topology: Extended Guidance

### Topology Choices

Topology choices must be explicit, for example:
- **Single agent/pipeline** for bounded tasks with low coordination overhead.
- **Hierarchy** for clear decomposition with centralized decision checkpoints.
- **Mesh** for discovery-heavy work where peers benefit from lateral
  coordination.

**Bio-inspired swarms (experimental):** bee-hive patterns and similar
biologically-inspired coordination models appear in research for large search
and exploration spaces. These are not production-proven at the time of writing.
Naming them here is not an endorsement — it is an acknowledgment that teams
will encounter them. Default to single, pipeline, hierarchy, or mesh unless
your own measured results on your own workload justify bio-inspired
coordination.

### Expected Failure Modes by Topology

Expected failure modes differ by topology: bottlenecked leads in hierarchies,
coordination storms in meshes, hidden coupling in pipelines, and role drift or
signal-amplification errors in bio-inspired swarms (for example, over-committing
to early weak signals). Use bio-inspired topologies only with empirical evidence
that they outperform simpler topologies for the target workload.

### Coordination Discipline

Parallelize exploration and analysis. Serialize decisions that change shared
state. Coordination is never free: shared state must be typed, versioned, and
reconciled. Contracts must be logged. Domain boundaries must prevent collisions.
Without these, a swarm is a mob — agents duplicating work, producing conflicting
diffs, or interpreting constraints inconsistently.

---

## Principle 5 — Autonomy: Extended Guidance

### Long-Lived Agents

Long-lived agents are an exception that requires explicit justification,
heartbeat monitoring, and drift controls. Tools are capabilities; audit tool
access and grant least privilege. Make risky actions reversible or
approval-gated.

The human role is to define the specification, set the tier, and own the
outcome — not to supervise every intermediate step. But autonomy without
governance is negligence. Calibrate the tier to the stakes.

---

## Principle 6 — Knowledge & Memory: Extended Guidance

### Memory Governance Properties

Learned memory must support:
- **Provenance**: Where did this come from?
- **Expiration**: When does this stop being valid?
- **Compression**: How do we keep signal without drowning in noise?
- **Rollback**: How do we undo a poisoned lesson?
- **Domain scoping**: What context does this apply to?

Memory can be poisoned. Every memory entry needs provenance and governance. An
agent that remembers too much hallucinates from noise. An agent that remembers
nothing repeats every mistake. If mistakes repeat, improve the loop:
specifications, evaluations, tools, or memory. Diagnosis precedes blame.

---

## Principle 7 — Context: Extended Guidance

### Retrieval SLOs

Define tiered SLO guidance by architecture class (local, remote,
hybrid+rerank, regulated logging) for context and decisions. Establish practical
retrieval and decision latency baselines suitable for interactive engineering
loops, with alerts and rollback policies when breached.

### Context Budgeting

Context windows are finite and reasoning quality degrades as low-signal context
accumulates. Engineer explicit context budgeting for long-running tasks:
hierarchical retrieval, rolling summaries, state compaction, and authority-
weighted pruning.

### Self-Improving Knowledge Bases

Codify "never do X here" as machine-enforced guidance: repository policies,
architectural constraints, ADR rules, lints, CI gates. Make the knowledge base
self-improving: let retrieval quality metrics feed back into indexing and
curation, so the system gets more precise over time rather than more cluttered.

### Tooling Maturity and Adoption

The context engineering standard described here exceeds what most teams can
build today. No mature ecosystem of context-engineering tooling exists yet.
Adopt incrementally: start by measuring retrieval quality (relevance, latency,
staleness), then add context budgeting for long-running tasks, then tiered
SLOs as scale demands. The principle describes the engineering standard; the
adoption path acknowledges the gap.

---

## Principle 8 — Evaluations & Proofs: Extended Guidance

### Assurance Disciplines

As autonomy and module count grow, assurance must move across distinct practices
with different cost curves:
- **Evaluations and tests** for dynamic, example-based validation.
- **Formal contracts + proofs** for mathematically checking module properties.
- **Model checking** for state-space behavior (especially concurrency and
  protocol invariants).

These are separate disciplines. Use them intentionally: tests by default,
formal methods first on critical paths and high-blast-radius components, then
expand coverage where incident data and economics justify it.

### LLM-as-Judge Risk

When models judge model-generated outputs, evaluator and producer can share
blind spots. Mitigate LLM-as-judge risk with deterministic anchors, diverse
judge models, periodic human-calibrated gold sets, and disagreement tracking
between judges and production outcomes.

### Evaluation Theater

Beware evaluation theater: evals that pass but do not test what matters. If
evaluations do not cover edge cases, adversarial inputs, and behavioral
regressions, they are measuring comfort, not correctness. When evaluation
metrics become optimization targets rather than measures of quality, the system
games the metric and drifts from the goal.

*Advanced bar: include adversarial cases for externally exposed or
high-blast-radius systems. For model-judged evaluations, calibrate against
human-labeled samples on a defined cadence.*

---

## Principle 9 — Observability & Interoperability: Extended Guidance

### Traces vs. Logging

Traces are not logging. Logging records events. Traces reconstruct reasoning —
the full chain from specification to decision to action to outcome. They are the
audit trail that makes agentic systems governable, debuggable, and safe.

If you cannot reconstruct what an agent did and why from traces alone, you
cannot operate safely at scale. If you cannot detect when an agent has deviated
from its constraints in near-real-time, your observability is incomplete.

### Interoperability Requirements

Interoperability requires typed schemas, explicit auth boundaries, versioned
capabilities, and replayable tool logs. Treat adapters as temporary bridges, not
architecture. The goal is replaceable components, not locked pipelines.

*Interoperability minimum bar: If tools cannot be swapped or replayed across
runtimes without rewriting core workflows, the platform is brittle.*

---

## Principle 10 — Emergence & Containment: Extended Guidance

### Chaos Practice

Practice chaos: test with tool outages, noisy retrieval, adversarial inputs,
partial memory corruption, reordered swarms, and model degradation — before
reality does. Offline tests are insufficient for systems that operate
autonomously in the wild. Enforce invariants at runtime with policy checks,
monitors, and automated intervention.

Chaos testing for agentic systems requires its own safety model:
- **Steady-state hypothesis**: define expected behavior before injecting faults,
  so you can detect when the system has left its safe operating envelope.
- **Blast-radius controls**: isolate chaos experiments to scoped environments,
  shadow traffic, or canary populations — never inject faults into the full
  production agent population.
- **Automated abort conditions**: if the system breaches predefined thresholds
  (error rate, latency, cost spike), halt the experiment and roll back
  automatically.
- **Graduated severity**: start with single-fault injection (one tool outage),
  then compound faults only after single-fault resilience is proven.

### Threat Modeling

Threat modeling must explicitly include:
- Prompt injection and jailbreak propagation across agent chains
- Memory/context poisoning and supply-chain contamination
- Agent impersonation and forged role assertions in swarm coordination
- Data exfiltration through tool permissions and connector abuse

Defense-in-depth means identity for agents and tools, signed provenance for
shared state, least-privilege tool scopes, egress controls, and continuous
anomaly detection for cross-agent trust edges.

---

## Principle 11 — Economics: Extended Guidance

### Intelligent Routing

Intelligent routing — selecting the right model, the right agent topology, and
the right resource tier for each task — extends effective capacity by multiples
while maintaining quality. This "economics-aware routing" must consider not just
token cost, but *correlation cost* (avoiding a single point of epistemic failure
by using diverse models and independent tool chains).

### Total Cost of Correctness

Inference cost and assurance cost are coupled, not independent knobs. Cheaper
models may require stronger verification, more retries, or tighter approvals.

The full cost model includes:
- **Inference cost**: tokens, compute, API fees.
- **Verification cost**: evaluation runs, proof checking, canary deployments.
- **Governance overhead**: human review time per tier, approval latency, policy
  maintenance.
- **Incident remediation**: rollback, diagnosis, constraint updates, re-verification.
- **Opportunity cost**: delayed decisions from approval queues or routing latency.
- **Context-switching cost**: debugging heterogeneous failure modes across models
  and vendors.

Optimize total cost of correctness, not inference cost alone. When governance
overhead exceeds the value of the work, reduce governance complexity rather than
adding more layers.

### Multi-Model Risk

Multi-model and multi-vendor swarms introduce heterogeneous failure and policy
risk. Model errors are often correlated through shared dependencies, similar
training artifacts, or vendor-side incidents. Routing policies must include
failure-domain isolation, cross-model canary checks, and explicit data handling
boundaries per provider.

### Resilience Measures

To mitigate systemic fragility, extend resilience measures across the stack:
- **Diversity routing** (different models/judges) to reduce correlated
  hallucinations.
- **Retrieval canaries** across independent indexes.
- **Tool redundancy plans** for rate limits/outages.

This is the "organism avoiding monoculture collapse."

*Advanced bar: route by expected total cost of correctness, not token price.*

---

## Principle 12 — Accountability: Extended Guidance

### Domain-Scoped Ownership

At scale, ownership is domain-scoped, not change-scoped. A named human owns the
risk policy, approval thresholds, and incident response for a bounded domain;
the system enforces those policies per change. Human review must focus on
exceptions, high-risk deltas, and statistically valid sampling, not every
low-risk action.

### Scaling Accountability

The manifesto asks for human accountability at scale, which is mathematically
impossible if your agents are processing thousands of actions. For low-risk and
medium-risk tiers, remove the human from the loop. Instead, build recursive
feedback mechanisms where the system is forced to evaluate its own errors, feed
failures back into its context window, and self-correct or automatically roll
back.

If your engineers spend all day reviewing agent trace logs, you have simply
replaced coding with babysitting. True scale requires automated, isolated
sandboxes where failure is acceptable and recovery is instant.

### The Open Problem

This is mitigation, not full resolution. Oversight saturation at scale remains
an open problem: systems can outgrow meaningful human review bandwidth faster
than governance practices mature. This is not a caveat buried in extended
guidance — it is a load-bearing limitation of the entire manifesto. The
twelve principles are designed to remain useful at any scale, but the
governance model that binds them (human accountability for production outcomes)
is bounded by human bandwidth. Treat this as an active research and operations
frontier, not a solved control mechanism.

### Incident Attribution

When incidents occur, accountability is assigned by policy failure mode:
specification error, verification gap, enforcement failure, or operational
override. This avoids circular blame on the final approver and drives targeted
remediation. If trace volume exceeds meaningful human review, raise automation
barriers or reduce autonomy until oversight signal quality is restored.

### Hallucination Loops

Failures are data: errors and crashes are learning opportunities, and
hallucinations can become a hallucination loop where plausible-but-wrong early
output drives increasingly wrong follow-on fixes. Never simply retry a failed
prompt. Diagnose, update memory, strengthen contracts and constraints, and rerun
verification before retrying.

---

## The Agentic Maturity Spectrum

Maturity is domain-specific, not organization-wide. A team can be Phase 5 in CI
and Phase 2 in production operations. Assess each domain honestly.

**Phase 1 — Guided Exploration ("vibe coding").** Single prompts, no structure,
no memory. Creative but unreliable. Useful for discovering what agents can do;
dangerous for anything that matters. *Failure mode: extrapolating demo results
to production expectations.*

**Phase 2 — Assisted Delivery.** AI as autocomplete. Copilot-style suggestions
where the human executes. Productivity gains are real but bounded by human
throughput. *Failure mode: optimizing human-in-the-loop speed instead of
questioning whether the loop is necessary.*

**Phase 3 — Agentic Prototyping.** Agents execute tasks autonomously within a
single session. Limited memory, limited verification. The moment most teams
realize prompting is not engineering. *Failure mode: autonomy without
verification — the agent said it worked.*

At this phase, teams should begin contract-aware prompting: agents produce
assertions and pre/postconditions with code, even before full proof pipelines
are in place.

**Phase 4 — Agentic Delivery.** Agents operate with basic guardrails:
autonomy tiers are defined, evaluations gate changes, and basic memory persists
across sessions. But the system is still single-domain, single-swarm, and
largely reactive. *Failure mode: governance without feedback — constraints are
enforced but never updated by what the system discovers.*

Phase 4 should pilot formal contracts on a narrow critical path only when team
capability and economics support it.

**Phase 5 — Agentic Engineering.** Structured autonomy at scale.
Specifications steer behavior and evolve through evidence. Multi-agent swarms
operate across domain boundaries, right-sized to each task. The full Agentic
Loop operates as a continuous system. *Failure mode: evaluation theater — evals
pass but do not test what matters.*

This is where contract-first development becomes systematic: code, contracts,
and proofs co-evolve continuously rather than being bolted on late.

**Phase 6 — Adaptive Systems.** Self-improving infrastructure within governed
boundaries. Systems that build, test, and fix themselves — then learn from the
results. Continuous learning with active memory curation. Chaos-tested,
runtime-verified, economically optimized. Specifications co-evolve with the
system's understanding of the problem space. Phase 6 is not inevitable; it
requires capabilities — formal verification, causal reasoning, provable
containment — that are still maturing. Treat it as a frontier, not a
destination. *Failure mode: self-improvement without containment — optimizing
the metric, not the goal.*

At this phase, agents can propose contract refinements and invariant updates,
but proof systems and governance gates must validate changes before adoption.

The key transition is Phase 3 to Phase 5, with Phase 4 as the practical bridge.

---

## Boundary Conditions

This manifesto assumes the environment can support governed autonomy, reliable
evidence capture, and reversible operations. When these assumptions do not hold,
agentic engineering should be constrained or deferred.

Proceed cautiously or cap autonomy at Phase 2-3 when:
- Certification or regulatory regimes require deterministic assurance patterns
  that the current agent/tool chain cannot meet
- Safety-critical or real-time systems cannot tolerate probabilistic behavior at
  the current control boundary
- Classified or restricted environments cannot satisfy data-handling and tool
  isolation requirements
- Teams lack baseline CI/CD quality gates, incident response discipline, or
  domain ownership needed for safe autonomy

In these conditions, use agent assistance for analysis and drafting, but keep
critical implementation and release control predominantly human-driven until
constraints change.

---

## Operational Definitions

**Blast radius**: the maximum credible impact of a wrong action across users,
data, services, or regulatory obligations.

**Right-sized**: the smallest agent topology and model tier that can meet the
required quality and latency targets at acceptable total cost of correctness.

**Evidence bundle**: the minimum artifacts needed to justify a change at a given
phase and risk tier.

Phase-calibrated evidence examples:
- **Phase 3**: tests, diff, trace link, rollback note.
- **Phase 4**: Phase 3 bundle plus policy checks and incident tags.
- **Phase 5+**: Phase 4 bundle plus reproducible replay and, where justified,
  formal artifacts.

---

## Worked Patterns

### Pattern A — Single-Domain Reliability Fix

Specification: "Retry payment capture exactly once after timeout; never
double-charge."

Agent decomposition: implement retry logic, add idempotency key handling, add
tests, produce trace and rollback plan.

Evidence bundle (Phase 4): diff, regression tests, trace ID, policy check
results, rollback command.

Outcome: shipped change, observed behavior, no duplicate charges in canary.

### Pattern B — Multi-Agent, Cross-Domain Coordination

Specification: "Cancel order across `orders`, `billing`, and `notifications`
without double-refund, stale customer status, or orphaned events."

Swarm decomposition:
1. Planner agent creates domain tasks with shared invariants.
2. Domain agents implement bounded changes in parallel.
3. Verification agent runs cross-service regression and contract checks.
4. Coordinator agent resolves conflicting diffs through a single commit path.
5. Operations agent gates rollout with canary and rollback criteria.

Evidence bundle (Phase 5): per-domain diffs, cross-domain trace graph,
invariant check results, reconciliation decisions, canary metrics, rollback
commands.

Outcome: one conflicting refund rule detected pre-merge, corrected via
constraint update, release completed without refund duplication.

---

## Failure Patterns

### Hallucination Loop

An agent misreads a timeout error as auth failure, applies credential retries,
and increases incident volume. The fix is not "retry the prompt"; it is to add
a contract/invariant ("timeout retry must not mutate credentials"), update
evals, and gate rollout until traces confirm behavior.

### Operational Recovery Cycle

1. Diagnose using traces and failure classification.
2. Add or tighten contract/invariant for the violated behavior.
3. Add regression and adversarial tests for the failure class.
4. Re-run verification and canary on constrained scope.
5. Promote only after evidence shows the loop is broken.

---

## Failure Modes of This Manifesto

Applied poorly, this manifesto can fail through:
- **Over-governance**: constraints so heavy that human coding becomes faster.
- **Evidence theater**: large bundles with low signal.
- **Control theater**: humans nominally accountable but operationally blind.
- **Security theater**: policies documented but not enforced at tool/runtime
  boundaries.

The corrective action is always the same: reduce ceremony, increase signal, and
measure cycle time, defect rate, and incident severity together.
