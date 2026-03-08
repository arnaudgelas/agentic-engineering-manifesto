# Companion Guide — Principle-by-Principle Guidance

*Extended guidance, tradeoffs, and operational detail for each principle
in the Agentic Engineering Manifesto.*

Read the [Manifesto](manifesto.md) for the core values and minimum bars.
See the [Companion Guide](companion-guide.md) for the full table of contents.
See the [Adoption Playbook](adoption-playbook.md) for organizational change
management, role transitions, and pilot design.

---

## Principle 1 — Outcomes: Extended Guidance

*See Principle 1 in the manifesto for the core statement and minimum bar.*

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

*See Principle 2 in the manifesto for the core statement and minimum bar.*

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

### Validation vs. Verification

Evaluations (Principle 8) and evidence bundles (Principle 1) answer the
verification question: *did we build it right?* They confirm the implementation
matches the specification. But verification alone has a blind spot: **you can
pass every check and still ship the wrong thing, just faster.**

Validation answers a different question: *did we build the right thing?* Does
the specification itself make business sense? Is the work scoped correctly?
Will real users get value from it? Agents make the validation gap more
dangerous because they can generate feature-shaped output quickly — complete
with passing tests, clean architecture, and a full evidence bundle — while the
underlying specification was never worth implementing.

The Agentic Loop addresses validation through the Observe → Learn → Govern
cycle: runtime behavior, usage data, and business outcomes feed back into
specification revision. But this only works if teams treat the Observe phase
as a validation checkpoint, not just a technical monitoring step. Concretely:

- **Frame the work in context before specifying.** Is this a proof of concept,
  a minimum viable feature, or a production commitment? Define "good enough"
  for each context and make the underlying business assumptions explicit. An
  agent cannot validate its own specification against business reality — that
  is a human judgment that must happen before the Loop begins.
- **Define stop criteria, not just acceptance criteria.** Acceptance criteria
  tell the agent when the implementation is correct. Stop criteria tell the
  team when to abandon or pivot the specification itself — when usage data,
  customer feedback, or market evidence shows the spec was wrong regardless of
  implementation quality.
- **Connect evaluation results to business outcomes.** If escaped defect rate
  is low but adoption, usage, or customer satisfaction metrics don't improve,
  the verification machinery is working but the validation loop is broken.

This is not a new idea — it is the core of Agile's "customer collaboration"
value, and it survives unchanged into agentic engineering. What changes is that
agents amplify the failure mode: without explicit validation loops, a team can
ship more verified-but-wrong features in a month than a human team could in a
quarter.

### The Architect Pattern: Agent-Generated Specifications

The manifesto treats specification steering as a human-governed activity. But
emerging evidence shows that specification generation itself can be an agent
capability — and that the quality of this capability is the primary
differentiator in long-term maintainability.

The **Architect–Programmer** pattern separates these concerns explicitly: an
Architect agent observes system behavior (test results, CI feedback, runtime
metrics), diagnoses root causes, and generates machine-readable requirements.
A Programmer agent implements those requirements. The cycle repeats: the
Architect observes the results, refines the specification, and the Programmer
iterates.

This pattern is a concrete instantiation of the Agentic Loop's Observe → Learn
→ Specify cycle. The SWE-CI benchmark (arXiv:2603.03823) validates it
empirically: across 100 tasks spanning an average of 233 days and 71 commits of
real-world development history, the Architect's ability to transform CI feedback
into actionable requirements was the primary differentiator in long-term code
maintainability. The three-step Architect protocol — Summarize (review failures),
Locate (attribute to deficiencies), Design (produce requirements) — maps
directly to the manifesto's convergence criteria: specifications that sharpen as
evidence accumulates.

**When to use this pattern:** Long-running maintenance tasks where the
specification must evolve across many iterations. For bounded, short-horizon
tasks, a single agent with a clear specification may be more efficient (see
Principle 4 guidance on topology choices). The Architect pattern is not a
universal requirement — it is a validated topology for sustained evolution.

**The governance implication:** When specifications are agent-generated, the
human role shifts from writing specifications to governing specification quality.
The human defines the acceptance criteria for the Architect's output — what
constitutes a valid requirement — and reviews the Architect's decisions at a
cadence appropriate to the risk tier. The specification is still a governed
artifact; the governance mechanism changes.

### Specifications vs. Constraints

Specifications and architectural constraints (Principle 3) operate at different
layers and change at different speeds. Constraints are invariants — security
policies, domain ownership boundaries, data integrity rules — that hold across
specification iterations. Specifications are goals and acceptance criteria that
evolve within those invariants.

In practice, this means: an agent can propose a revised acceptance criterion
without governance overhead, but proposing a relaxed constraint triggers a
governed review (ADR update, policy approval, impact assessment). If your system
cannot distinguish these two change types, specification iteration will
silently erode your architectural boundaries.

---

## Principle 3 — Architecture: Extended Guidance

*See Principle 3 in the manifesto for the core statement and minimum bar.*

### Prompt Drift and Enforcement

Prompts drift, and context windows degrade. They approximate compliance — they
do not guarantee it the way a compiler obeys syntax. When architecture is
merely described rather than enforced, agents will violate it. When architecture
is enforced but not monitored, violations will go undetected.

### Domain-Driven Design for Swarms

Domain-Driven Design gives each swarm a bounded context — what it owns, where
code belongs, what is forbidden to reinvent. Retrieval is untrusted input;
treat context injection as a threat vector. This reduces swarm collisions and
hardens the system against both accidental drift and adversarial conditions.

---

## Principle 4 — Swarm Topology: Extended Guidance

*See Principle 4 in the manifesto for the core statement and minimum bar.*

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

### The Single-Agent Default and Its Limits

The manifesto states: "a single well-evaluated agent with excellent tools often
outperforms an expensive, uncoordinated swarm." This holds for bounded,
short-horizon tasks where specification and implementation can be handled in a
single context.

For **long-term maintenance tasks** — where the specification must evolve across
dozens of iterations based on accumulated evidence — the Architect–Programmer
separation may be structurally necessary, not just a preference. The SWE-CI
benchmark (arXiv:2603.03823) provides evidence: across tasks spanning an average
of 233 days and 71 commits, separating specification generation (Architect) from
implementation (Programmer) is the minimal viable structure for sustained code
maintainability. A single agent attempting both roles must hold implementation
context and specification-steering context simultaneously, which degrades at the
timescales long-term maintenance requires.

The practical rule: default to a single agent for bounded tasks. Adopt the
Architect–Programmer topology when the task horizon exceeds what a single
context window can sustain, or when specification quality is the primary
bottleneck. See the [Architect Pattern](companion-principles.md#the-architect-pattern-agent-generated-specifications)
in the P2 extended guidance for operational detail.

### Coordination Discipline

Parallelize exploration and analysis. Serialize decisions that change shared
state. Coordination is never free: shared state must be typed, versioned, and
reconciled. Contracts must be logged. Domain boundaries must prevent collisions.
Without these, a swarm is a mob — agents duplicating work, producing conflicting
diffs, or interpreting constraints inconsistently.

---

## Principle 5 — Autonomy: Extended Guidance

*See Principle 5 in the manifesto for the core statement and minimum bar.*

### Setting Tier Boundaries

The manifesto defines three tiers (Observe, Branch, Commit), but choosing where
to draw the boundaries for your organization is the harder problem. Tier
assignment should be driven by three factors:

- **Blast radius**: What is the maximum credible impact if the agent acts
  incorrectly? Tier 1 (Observe) for actions with no production impact. Tier 2
  (Branch) for actions contained to isolated environments. Tier 3 (Commit) only
  for production-impacting actions with verified rollback.
- **Reversibility**: How quickly and completely can you undo a wrong action?
  Fast, clean rollback justifies higher autonomy. Irreversible actions (data
  deletion, external API calls, customer-facing communications) demand stricter
  gates regardless of blast radius.
- **Confidence maturity**: How long has the agent been operating on this task
  class, and what is the historical error rate? New task types start at Tier 1
  even if the blast radius would theoretically permit Tier 2. Promote only when
  evidence shows consistent correctness over a meaningful sample size.

In practice, start conservative. Most teams should default every new agent
capability to Tier 1 and promote through evidence, not through optimism.

### Runtime Tier Escalation

Agents sometimes discover mid-task that they need capabilities above their
current tier. The protocol for tier escalation must be explicit:

1. The agent pauses execution and emits a structured escalation request: what
   action it needs, why, what evidence supports the request, and what the blast
   radius would be.
2. The system routes the request to the appropriate approver (automated policy
   check for Tier 1→2, human reviewer for Tier 2→3).
3. Approval is scoped and time-bounded — the agent receives temporary elevation
   for a specific action, not a blanket tier promotion.
4. The escalation, approval, and outcome are traced and auditable.

If tier escalation happens frequently for a given task class, that is a signal
to reassess the tier assignment — either the task class belongs at a higher
tier, or the specification needs refinement to keep the task within its current
tier.

### Long-Lived Agents

Long-lived agents are an exception that requires explicit justification,
heartbeat monitoring, and drift controls. Tools are capabilities; audit tool
access and grant least privilege. Make risky actions reversible or
approval-gated.

The human role is to define the specification, set the tier, and own the
outcome — not to supervise every intermediate step. But autonomy without
governance is negligence. Calibrate the tier to the stakes.

### Auditing Tier Compliance

Tier boundaries are only meaningful if compliance is verified. Implement:

- **Runtime enforcement**: The infrastructure (not the agent) blocks actions
  outside the agent's tier. An agent at Tier 1 physically cannot write to a
  production database, regardless of what its prompt says.
- **Compliance dashboards**: Track tier violations, escalation frequency,
  and approval latency per domain. Rising violation rates signal either
  misconfigured tiers or inadequate specifications.
- **Periodic tier reviews**: Quarterly review of tier assignments against
  incident data. Promote agents with strong track records; demote or
  constrain agents with elevated error rates.

---

## Principle 6 — Knowledge & Memory: Extended Guidance

*See Principle 6 in the manifesto for the core statement and minimum bar.*

### Memory Governance Properties — Operational Detail

The manifesto lists five governance properties. Here is what each means in
practice:

- **Provenance**: Every memory entry carries metadata: what event created it,
  which agent, what evidence supported it, when. Implementation: structured
  metadata fields on every entry in your memory store (vector DB, episodic
  store, or whatever layer holds learned memory). Without provenance, you cannot
  trace a bad decision back to a bad lesson.

- **Expiration**: Learned memory decays. A routing preference learned during a
  model outage is wrong once the model recovers. A code pattern learned from a
  since-deprecated API is harmful. Implementation: TTLs on memory entries,
  calibrated by domain. High-volatility domains (model routing, API behavior)
  expire fast. Low-volatility domains (architectural patterns, security
  policies) expire slowly or never. Review expired entries before deletion —
  some should be promoted to knowledge; others should simply disappear.

- **Compression**: Long-running agents accumulate memory faster than it can be
  consumed. Raw memory is noise; compressed memory is signal. Implementation:
  periodic consolidation passes that merge redundant entries, extract patterns
  from clusters of similar learnings, and discard entries that have been
  superseded. Think of it as garbage collection for learned context.

- **Rollback**: When memory is poisoned — an agent learned something wrong from
  a bad incident, a corrupt retrieval shard, or a flawed evaluation — you need
  to undo the damage. Implementation: versioned memory snapshots (daily or per
  significant learning event), with the ability to revert a domain's learned
  memory to a known-good state. Test rollback before you need it. See
  [Pattern C (Memory Poisoning Recovery)](companion-patterns.md#pattern-c-memory-poisoning-recovery)
  in the Worked Patterns.

- **Domain scoping**: A lesson learned in the payments domain should not
  influence code generation in the notification service. Implementation:
  namespace or tag memory entries by domain, and enforce scope boundaries in
  retrieval queries. Cross-domain memory should be explicitly promoted, not
  implicitly leaked.

### The Knowledge-Memory Boundary in Practice

The manifesto defines the boundary by governance mechanism: knowledge changes
through governed processes (PRs, ADRs); learned memory changes through feedback
loops. In practice, entries migrate between the two:

- **Memory → Knowledge promotion**: An agent repeatedly learns that a certain
  retry pattern works. After validation, this should be codified as an ADR or
  repository policy — promoted from heuristic to ground truth.
- **Knowledge → Memory demotion**: A documented best practice stops holding
  under new conditions. Rather than immediately deleting the ADR, demote it to
  learned memory with an expiration, so the system can accumulate evidence for
  or against the change before formalizing it.

The migration process itself needs governance. Unreviewed promotions pollute
your knowledge base. Unreviewed demotions erode architectural standards.

---

## Principle 7 — Context: Extended Guidance

*See Principle 7 in the manifesto for the core statement and minimum bar.*

### Retrieval SLOs

Define tiered SLO guidance by architecture class for context retrieval and
decision latency. Not every retrieval path needs the same latency target:

- **Local retrieval** (file system, in-process cache): < 100ms. This is the
  baseline for interactive agent loops where the developer is waiting.
- **Remote retrieval** (vector DB, API-backed knowledge base): < 500ms with
  a relevance threshold. If retrieval takes longer, the agent should
  proceed with available context and flag the gap rather than block.
- **Hybrid + rerank** (remote retrieval with a reranking model): < 1s end-to-
  end. The reranking step improves precision but adds latency; set a hard
  ceiling and degrade gracefully if exceeded.
- **Regulated logging** (audit-required retrieval in compliance environments):
  latency is secondary to completeness and provenance. Log every retrieval
  with source, relevance score, and timestamp.

When retrieval SLOs are breached, alert and degrade — do not silently
return stale or irrelevant context. An agent that reasons from bad context
produces confidently wrong output.

### Context Budgeting

Context windows are finite and reasoning quality degrades as low-signal context
accumulates. This is not a theoretical concern — it is the most common
root cause of agent quality degradation in long-running tasks. Engineer
explicit context budgeting:

- **Hierarchical retrieval**: Retrieve summaries first, then pull detailed
  context only for the sections the agent identifies as relevant. This
  avoids filling the window with potentially irrelevant detail.
- **Rolling summaries**: For multi-step tasks, compress completed steps into
  structured summaries before starting the next step. The summary should
  capture decisions and outcomes, not raw content.
- **State compaction**: Periodically replace accumulated context with a
  compact representation of current state. The compacted state is the new
  starting point; the raw history is available in traces for debugging but
  does not consume the active context window.
- **Authority-weighted pruning**: When the context budget is exhausted,
  discard low-authority context first (heuristic suggestions, old memory
  entries) and preserve high-authority context (specifications, constraints,
  evaluation results).

A worked example: an agent tasked with refactoring a module across 15 files
hits the context limit at file 8. Without budgeting, it either hallucinates
the remaining files or produces inconsistent changes. With rolling summaries,
it carries a compact summary of decisions made for files 1-7 and retrieves
fresh context for files 8-15.

### Context Poisoning

Context poisoning is distinct from memory poisoning (Principle 6) — it
occurs when the retrieval system returns contextually appropriate but
factually wrong or outdated content within a single task. Memory poisoning
is a persistent corruption; context poisoning can happen on any retrieval
call.

Common sources: stale index entries that survived re-indexing, retrieved
content from a deprecated branch that was never cleaned up, code examples
from a library version that no longer matches the project's dependencies.

Detection: monitor for sudden quality drops in agent output that correlate
with specific retrieval sources. Track retrieval source freshness (time since
last validation) and alert when agents consume context older than a
configurable threshold.

Mitigation: retrieval canaries (known-good queries with expected results,
run on every retrieval cycle), source freshness metadata in every retrieval
response, and a circuit breaker that falls back to specification-only
context when retrieval confidence drops below threshold.

### Self-Improving Knowledge Bases

Codify "never do X here" as machine-enforced guidance: repository policies,
architectural constraints, ADR rules, lints, CI gates. Make the knowledge base
self-improving: let retrieval quality metrics feed back into indexing and
curation, so the system gets more precise over time rather than more cluttered.

The feedback loop: track which retrieved contexts led to successful agent
outcomes (evidence bundle accepted, evaluations passed) and which led to
failures. Over time, demote or remove context sources that consistently
correlate with poor outcomes. This is garbage collection for your knowledge
base, driven by evidence rather than manual curation.

### Cross-Iteration Learning and CI Context

A specific and increasingly important case of context budgeting is **learning
across CI iterations** — where each iteration generates new evidence about the
consequences of previous decisions. In a CI loop spanning dozens of iterations
(the SWE-CI benchmark averages 71 commits per task), the agent must carry
forward not just what changed, but what effect each change had on subsequent
iterations.

This is distinct from single-task context budgeting because the evidence
compounds: iteration 15 generates information about decisions made in
iterations 3, 7, and 12. The context that matters is not "what happened last"
but "which earlier decisions are causing current problems."

Practical approaches for cross-iteration context:

- **Decision-consequence summaries**: After each iteration, compress the
  results into a structured summary that links decisions to outcomes. "Changed
  the retry logic in iteration 5; iteration 9 test failures trace to that
  change." These summaries are the rolling context for subsequent iterations.
- **Regression attribution**: When a regression appears, trace it to the
  iteration that introduced the structural cause — not just the iteration that
  triggered the test failure. This requires structured tracing across
  iterations, not just within them.
- **Evolvability signals**: Track whether each iteration's decisions made the
  next iteration easier or harder. The SWE-CI benchmark's EvoScore metric
  (arXiv:2603.03823) measures this explicitly: agents whose early decisions
  facilitate subsequent evolution score higher. Teams can approximate this by
  tracking iteration-over-iteration test pass rates and regression frequency.

Cross-iteration context management is the primary capability differentiator
for long-running agent pipelines. Without it, agents repeat mistakes, fail to
learn from structural consequences, and accumulate technical debt that
traditional single-iteration metrics miss.

### Tooling Maturity and Adoption

The context engineering standard described here exceeds what most teams can
build today. No mature ecosystem of context-engineering tooling exists yet.
Adopt incrementally: start by measuring retrieval quality (relevance, latency,
staleness), then add context budgeting for long-running tasks, then tiered
SLOs as scale demands. The principle describes the engineering standard; the
adoption path acknowledges the gap.

---

## Principle 8 — Evaluations & Proofs: Extended Guidance

*See Principle 8 in the manifesto for the core statement and minimum bar.*

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

### Evaluation Holdout and the Gaming Problem

If agents can see the evaluation criteria during development, they can overfit
to them — producing output that passes the specific tests while missing the
intent behind them. This is the evaluation equivalent of teaching to the test.

The fix borrows from machine learning: **evaluation holdout.** Behavioral
scenarios — specifications of what the software should do in realistic
end-to-end conditions — are stored separately from the development context. The
agent builds software without access to the evaluation criteria. The scenarios
evaluate whether the output works. Because the agent never sees the evaluation
criteria, it cannot game them.

This pattern is already in production. StrongDM's software factory uses holdout
behavioral scenarios as the primary evaluation mechanism, with agents that
implement against specifications and are evaluated against criteria they cannot
see. The result is evaluation that tests intent, not just compliance.

**When to use holdout evaluation:** For any system where agents iterate
autonomously (Phase 4+), especially when evaluation metrics show suspiciously
high pass rates that do not correlate with production quality. Holdout
evaluation is more expensive to maintain (two separate artifact sets: development
specs and evaluation scenarios) but eliminates the most insidious form of
evaluation theater — evaluations that pass because the agent learned the
answers, not because it solved the problem.

### Boolean vs. Probabilistic Evaluation

The manifesto's current evaluation model is largely boolean: tests pass or fail,
regression cases are covered or not, evidence bundles are complete or incomplete.
This framing is necessary for minimum bars but insufficient for mature agentic
systems.

At Phase 5 and above, consider **probabilistic satisfaction**: of all observed
execution trajectories through all behavioral scenarios, what fraction actually
satisfies the specification? This replaces "did it pass?" with "how reliably
does it pass, across how many conditions?"

The shift matters because agentic systems are inherently probabilistic. A
boolean "pass" on ten test cases tells you the agent produced correct output ten
times. It tells you nothing about the eleventh case, the hundredth case, or the
distribution of partial failures. Probabilistic satisfaction metrics — drawn
from scenario-based evaluation at volume — give a confidence distribution rather
than a binary verdict.

**Practical adoption:** Start boolean (Phase 3-4). Add scenario coverage and
pass-rate distributions as the evaluation portfolio matures (Phase 4-5). Treat
probabilistic satisfaction as the target metric for fully autonomous pipelines
where human review is sampled rather than comprehensive.

### Behavioral Regression vs. Structural Regression

The manifesto's minimum bar for evaluations states: "If evaluations do not
include regression cases, they are insufficient." In practice, there are two
distinct categories of regression, and most teams only test for one.

**Behavioral regression** is what traditional regression testing catches: a
change breaks existing functionality. The tests that passed before now fail.
This is well-understood and well-tooled.

**Structural regression** is subtler and more dangerous: a change passes all
current tests but degrades the codebase's capacity for future change. The code
is locally correct but globally harmful — naming conventions that create
confusion across iterations, architectural choices that increase coupling,
dependency structures that make the next change harder. Structural regression
does not fail any test today; it fails the test that you will need to write
tomorrow.

The SWE-CI benchmark (arXiv:2603.03823) provides the first empirical evidence
for this distinction. Across 100 tasks spanning an average of 233 days of
development history, most agents achieve a zero-regression rate below 0.25 —
meaning in over 75% of CI iterations, agents introduce at least one regression.
Many of these regressions are structural: the agent's decisions in early
iterations create friction that compounds across subsequent iterations. The
benchmark's EvoScore metric captures this by measuring functional correctness on
future modifications — not just current tests.

**Detecting structural regression:**

- **Evolution-weighted metrics**: Track not just whether today's tests pass, but
  whether each change makes the next change easier or harder. EvoScore is one
  formalization; a simpler proxy is iteration-over-iteration regression
  frequency.
- **Coupling analysis**: Monitor dependency graphs, import structures, and
  module boundaries across iterations. Rising coupling without corresponding
  functionality is a structural regression signal.
- **Specification convergence**: If specifications become harder to express
  precisely over time, the codebase's structure is degrading even if tests pass.
  The manifesto's convergence criteria (P2) apply here: diverging specifications
  are a symptom of structural regression.

**The implication for evaluation portfolios:** Teams at Phase 4 and above should
include structural regression indicators alongside behavioral regression tests.
This does not require formal verification — it requires tracking the trajectory
of code quality across iterations, not just the state of code quality at each
iteration.

See also [Verification without validation](companion-reference.md#failure-modes-of-this-manifesto)
in the Failure Modes section, which describes the related but distinct case
where verification machinery confirms correctness without confirming value.

---

## Principle 9 — Observability & Interoperability: Extended Guidance

*See Principle 9 in the manifesto for the core statement and minimum bar.*

### What a Trace Must Contain

A trace is not a log line. A complete agentic trace captures:

- **Specification received**: What was the agent asked to do? The versioned
  specification or task decomposition that initiated the work.
- **Decision chain**: What options did the agent consider, what did it select,
  and what reasoning or scoring drove the selection? For multi-step tasks, the
  chain must show each decision point, not just the final output.
- **Tool calls and responses**: Every external tool invocation — API calls,
  file operations, retrieval queries — with inputs, outputs, and latency.
- **Memory retrievals**: What context was retrieved, from which store, with
  what relevance scores? This is critical for diagnosing retrieval-driven
  hallucinations.
- **Evaluation results**: Which evaluations ran, what passed, what failed,
  what was the delta from previous runs?
- **Policy checks**: Which constraints were checked, which passed, which
  triggered violations or near-misses?
- **Cost accounting**: Tokens consumed, model used, inference latency, total
  cost of this task.

The trace must be structured, not free-text. Structured traces can be queried,
aggregated, and replayed. Free-text logs require human interpretation at every
step.

### Near-Real-Time Drift Detection

Observability is incomplete if it only reconstructs the past. For production
agentic systems, you also need near-real-time detection of constraint
violations, behavioral drift, and anomalous patterns:

- **Constraint violation alerts**: Immediate notification when an agent
  attempts or completes an action outside its tier or domain boundary.
- **Behavioral anomaly detection**: Statistical monitoring of agent outputs
  over time. A sudden shift in code style, error rate, or tool usage pattern
  may indicate context poisoning, model degradation, or specification drift.
- **Cost anomaly alerts**: A task that normally costs $0.50 suddenly costing
  $15 signals a reasoning loop, retry storm, or routing failure.

The goal is not to alert on everything but to detect when the system has left
its expected operating envelope before the damage compounds.

### Interoperability Requirements

Interoperability requires typed schemas, explicit auth boundaries, versioned
capabilities, and replayable tool logs. Treat adapters as temporary bridges, not
architecture. The goal is replaceable components, not locked pipelines.

*Interoperability minimum bar: If tools cannot be swapped or replayed across
runtimes without rewriting core workflows, the platform is brittle.*

---

## Principle 10 — Emergence & Containment: Extended Guidance

*See Principle 10 in the manifesto for the core statement and minimum bar.*

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

*See Principle 11 in the manifesto for the core statement and minimum bar.*

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

*See Principle 12 in the manifesto for the core statement and minimum bar.*

### Domain-Scoped Ownership

At scale, ownership is domain-scoped, not change-scoped. A named human owns the
risk policy, approval thresholds, and incident response for a bounded domain;
the system enforces those policies per change. Human review must focus on
exceptions, high-risk deltas, and statistically valid sampling, not every
low-risk action.

### The Accountability Paradox

The manifesto states: "Agents execute; humans own outcomes, risks, approvals,
and incidents. No agent — however capable — absorbs legal, ethical, or
operational responsibility." This is the manifesto's strongest claim about the
human role. It is also the claim most certain to break under scale.

If your agents process thousands of actions per day, human review of every
action is not just impractical — it is impossible. A domain owner who
"approves" 200 changes per day is not governing; they are rubber-stamping.
The manifesto's accountability model, applied literally at volume, collapses
into control theater (see [Failure Modes](companion-reference.md#failure-modes-of-this-manifesto)).

This is not a minor gap. It is the central tension of the entire manifesto:
the principles require human accountability, and the economics of agentic
systems at scale make comprehensive human accountability impossible.

### How to Navigate the Paradox

The manifesto does not resolve this tension — it provides the tools to manage
it. The resolution is not "remove the human" or "review everything." It is a
phase-calibrated layering of accountability mechanisms:

**At Tier 1 (Observe):** Agents can only analyze and propose. Human
accountability is inherent because no action reaches production without human
execution. This is fully compatible with the manifesto at any volume.

**At Tier 2 (Branch):** Agents write to isolated environments. Accountability
shifts from reviewing every action to designing the constraints that bound
agent behavior and the evaluations that verify output. The human owns the
constraint design and the evaluation portfolio, not every individual diff.
When an escaped defect occurs, accountability traces to which constraint or
evaluation was missing — not which reviewer missed which line.

**At Tier 3 (Commit):** Agents take production-impacting actions. This is
where the tension is sharpest. The practical approach: automated policy
enforcement handles routine checks at machine speed; human review focuses
on exceptions, high-risk deltas, and statistically valid sampling. The human
is accountable for the policy, the sampling strategy, and the incident
response — not for having personally inspected every action.

In all tiers, build recursive feedback mechanisms: systems evaluate their own
errors, feed failures back into context, and self-correct or automatically
roll back. This is not replacing human accountability — it is extending the
human's reach through system design.

### The Level 5 Challenge: No Human Writes or Reviews Code

The sharpest version of the accountability challenge comes from teams already
operating at what practitioners call "Level 5" or "dark factory" mode:
specifications go in, working software comes out, no human writes or reviews
code. StrongDM's software factory is the most documented example — three
engineers, no code writing, no code review. Humans write specifications and
evaluate outcomes. Machines do everything in between.

This sounds like it contradicts the manifesto's accountability model. It does
not — but it forces the model to its logical conclusion. In a Level 5 system:

- **Accountability shifts from reviewing code to designing constraints.** The
  human owns the specification quality, the evaluation portfolio (including
  holdout scenarios the agent cannot see), and the incident response policy.
  They do not own every line of code — they own the system that produces and
  verifies the code.
- **Evaluation replaces review.** Instead of reading diffs, humans evaluate
  outcomes against behavioral scenarios, probabilistic satisfaction metrics,
  and business impact measures. The evaluation infrastructure *is* the review
  process — it just runs at machine speed rather than human speed.
- **The accountability surface changes, not the accountability principle.**
  A human is still accountable for production behavior. But "accountable"
  means "designed the constraints, approved the evaluation portfolio, and owns
  the incident response" — not "read every line of code."

This is consistent with the manifesto's Tier 3 governance at scale: automated
policy enforcement handles routine verification, human review focuses on
exceptions and high-risk deltas, and accountability traces to constraint design
rather than individual code inspection. Level 5 is what Tier 3 governance looks
like when the constraints, evaluations, and evidence infrastructure are mature
enough to replace line-by-line review entirely.

The manifesto does not prescribe Level 5 as a target. Most teams are not ready
for it — and the perception gap is real: a 2025 study found that experienced
developers using AI tools took 19% longer to complete tasks while believing AI
made them 24% faster. Teams that believe they are operating at Level 4 or 5 are
often stuck at Level 2, confusing tool adoption with workflow transformation.
The maturity spectrum (Phase 1-6) and the evidence requirements at each phase
exist precisely to prevent this self-assessment inflation.

### The Open Problem

This layered approach is mitigation, not resolution. Oversight saturation at
scale remains an open problem: systems can outgrow meaningful human governance
bandwidth faster than governance practices mature. This is not a caveat buried
in extended guidance — it is a load-bearing limitation of the entire manifesto.

The twelve principles are designed to remain useful at any scale, but the
governance model that binds them (human accountability for production outcomes)
is bounded by human bandwidth. As agentic systems scale toward Phase 6
(adaptive, self-improving), the fraction of system behavior that any human can
meaningfully review approaches zero. The manifesto's answer — governance
through constraints, evaluations, and evidence rather than through direct
oversight — delays this limit but does not eliminate it.

Treat this as the manifesto's most important active frontier. If your
engineers spend all day reviewing agent trace logs, you have replaced coding
with babysitting and the governance model is already failing. If they review
nothing, accountability is fictional. The correct position is somewhere
between, defined by the quality of your constraints, evaluations, and
feedback loops — and it must be re-evaluated as the system grows.

### Incident Attribution

When incidents occur, accountability is assigned by policy failure mode:
specification error, verification gap, enforcement failure, or operational
override. This avoids circular blame on the final approver and drives targeted
remediation. If trace volume exceeds meaningful human review, raise automation
barriers or reduce autonomy until oversight signal quality is restored.
