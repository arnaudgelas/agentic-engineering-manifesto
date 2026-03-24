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

### Specifications as Agent-Consumable Artifacts

The specification-as-living-artifact pattern now has concrete implementations.
Agent Skills (SKILL.md files — structured metadata plus step-by-step
instructions that agents consume at runtime) and AGENTS.md (repository-level
machine-readable constraints) are now widely adopted across major IDEs and coding
agents. Both formats validate the core P2 claim: specifications that agents can
parse directly reduce ambiguity, improve adherence, and make convergence
measurable. Skills define *what* an agent can do; AGENTS.md defines *how* it
must behave within a codebase. Together with agent-to-tool protocols (which
define *how* agents connect to external capabilities), they form the
specification layer of the emerging standards stack.

### The Specification-Driven Development Movement

The specification-first pattern is not just an architectural recommendation — it
is converging as the dominant practitioner workflow. A wave of open-source
specification-driven development (SDD) frameworks has emerged, all built on the
same thesis P2 advocates: write the spec before the agent writes the code.
The pattern across these frameworks is consistent: specifications are treated as
code artifacts, baked into workflows, and consumed by agents before
implementation begins — whether through specify-plan-implement pipelines,
state-machine-governed iteration, or composable skill-driven workflows. This
validates P2's core claim at practitioner scale. See
[Sources](beyond-agile-sources.md) for specific framework references.

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

The Agentic Loop addresses validation explicitly through the Validate →
Observe → Learn → Govern cycle: after verification confirms technical
correctness, validation checks fitness for real-world use; runtime behavior,
usage data, and business outcomes then feed back into specification revision.
But this only works if teams treat Validate as a distinct discipline from
Verify, not just a technical monitoring step. Concretely:

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

AGENTS.md files (an AAIF-governed open standard for repository-level agent
instructions) offer a practical mechanism for encoding architectural constraints
at the repository level. They function as machine-readable ADRs that coding agents respect at
runtime — a concrete implementation of architecture as defense-in-depth.

### Agent-as-Tool and Software of Unknown Provenance

In regulated development, software components are classified by provenance and
qualification status. When agents participate in development, three
classification questions arise:

1. **The AI model itself**: Non-deterministic, version-dependent, and opaque.
   Under IEC 62304 (SOUP), DO-178C/DO-330 (tool qualification), and GAMP 5
   (software categories), the model cannot currently be qualified through
   traditional means.
2. **Agent-selected dependencies**: When an agent pulls in a library or
   pattern, it is making a provenance decision that may carry regulatory
   consequences. The human must own dependency approval; the agent must not
   introduce unvetted dependencies silently.
3. **Agent-generated code**: May incorporate training-data patterns that
   constitute derivative unclassified software. Evidence bundles must capture
   sufficient provenance to support classification.

The manifesto's defense-in-depth response: treat the agent as an unqualified
tool and independently verify all output through qualified means. This is
architecturally equivalent to treating retrieval as untrusted input (above).
The infrastructure must enforce dependency allow-lists, and evidence bundles
must capture dependency provenance.

See [companion-frameworks.md](companion-frameworks.md#cross-domain-regulatory-insights)
for the cross-domain analysis and [domains/](domains/README.md) for
domain-specific classification requirements.

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

### Inter-Agent Communication Standards

Agent-to-agent protocols (notably A2A, now under AAIF governance) are
standardizing agent discovery, task lifecycle management, and cross-framework
collaboration. The manifesto's governance model — tiers, traces,
accountability — sits above these protocols: the protocol handles agent-level
coordination; the manifesto's principles govern what those agents are allowed to
do and how their decisions are audited. Teams adopting multi-agent topologies
should treat communication protocols as the coordination layer and the
manifesto's tier model as the authorization layer.

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

### Topology as a Runtime Concern

The topology choices above are presented as design-time decisions, and for most
teams at Phase 3–4 they are. But the frontier is moving toward adaptive topology
selection — systems that choose coordination patterns at runtime based on task
characteristics, resource availability, and learned performance data. Indicators
of this shift include: federation hubs that route work across heterogeneous agent
pools, ephemeral workers that share persistent state rather than maintaining
their own, and consensus-backed coordination that replaces static orchestrator
hierarchies.

Teams should design their topology as a deliberate architectural choice today,
but build the abstraction layer that allows the topology to change without
rebuilding the system. The practical test: can you switch from hierarchy to mesh
for a given task class without rewriting coordination logic? If not, the topology
is hardcoded, and you will pay for that rigidity as the ecosystem matures.

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

### Infrastructure-Level Tier Enforcement in Practice

Enterprise agent runtimes are demonstrating what infrastructure-level tier
enforcement looks like at scale: declarative permission policies (typically
YAML or equivalent), audit logs for every agent action, and guardrail
constraints that the agent cannot override regardless of prompt instructions.
This is the pattern the manifesto requires — enforcement at the infrastructure
layer, not the prompt layer. Tiered autonomy is only meaningful when the
infrastructure, not the agent, enforces the boundaries.

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

### Emerging Memory Infrastructure

The memory infrastructure the manifesto calls for is beginning to materialize.
Git-native agent memory systems demonstrate what governance-aware memory looks
like in practice: provenance (every entry traceable to its source), rollback
(versioned snapshots with merge-safe conflict resolution), and domain scoping
(namespace isolation preventing cross-agent collisions in multi-branch
workflows). Dependency-graph approaches validate the P7 claim that context must
be engineered, not concatenated — tracking explicit task dependencies rather than
relying on flat retrieval. Teams evaluating memory infrastructure should assess
whether their chosen solution provides at minimum: provenance metadata, versioned
snapshots, and scoped namespaces.

### Beyond Retrieval: Persistent Agent Cognition

The manifesto frames memory governance in terms of retrieval infrastructure —
provenance, expiration, rollback, scoping. This is necessary but no longer
sufficient to describe the frontier. The emerging memory discipline includes
three layers:

- **Retrieval memory** — the layer the manifesto already covers well. Embedding
  stores, vector search, scoped retrieval with SLOs. This is the "better RAG"
  layer.
- **Skill memory** — durable behavioral patterns agents acquire through
  experience, stored as reusable artifacts rather than retrieved context. An
  agent that has solved a class of problem before should carry forward not just
  the facts it retrieved but the approach that worked. Skill memory is closer
  to procedural knowledge than to information retrieval.
- **Causal and trajectory memory** — the ability to store not just what happened
  but why it worked or failed, and to consolidate trajectories across tasks into
  generalizable reasoning patterns. This is learning in the operational sense:
  the agent's future behavior improves based on structured reflection over past
  behavior.

All three layers require the same governance properties (provenance, expiration,
rollback, scoping). But they differ in what "poisoning" means and how rollback
works. Reverting a bad embedding is straightforward. Reverting a bad learned
skill is harder — the skill may have influenced downstream decisions that
themselves became learned patterns. Teams building memory infrastructure should
design for rollback at each layer independently.

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

### Memory Governance at Machine Scale

The governance properties described above (provenance, expiration, compression,
rollback, domain scoping) are necessary but not sufficient at production volume.
A single agent executing 100 tasks per hour generates 100 memory entries per
hour. Human curators can meaningfully review 10-20 entries per hour — an
immediate 5-10x backlog. At this scale, reactive curation (diagnose regression,
identify poisoned entry, rollback) is a post-mortem methodology, not a
governance strategy. Proactive detection is required.

**Implement these four mechanisms before agents generate significant memory
volume:**

**1. Retrieval canaries (continuous).** For each memory shard serving a
production domain, define one known-good query with an expected result. Run it
on every retrieval cycle. If retrieved results deviate from expected, isolate
the shard immediately and alert. This catches poisoning before agents act on
bad context. Pattern C in [companion-patterns.md](companion-patterns.md) shows
this as a recovery step — it should be a permanent fixture, not a post-incident
addition.

**2. Consistency check on write.** When a new memory entry contradicts an
existing entry in the same domain, flag both for resolution before the new
entry is propagated. Do not silently overwrite. The contradiction is signal —
either the new lesson is wrong, the old lesson is stale, or both need
re-examination.

**3. Structured memory entry schema.** Require all memory entries to carry:
- `lesson`: what was learned (one sentence)
- `rationale`: why this is believed to be true
- `confidence`: 1-5 (1 = tentative observation, 5 = validated across many cases)
- `domain_scope`: which domain(s) this applies to
- `expires_at`: ISO 8601 datetime (see defaults below)
- `provenance`: trace ID of the event that generated this entry

Agents cannot store memory without these fields. Entries without valid schema
are rejected at the memory layer, not silently dropped.

**4. Default TTL policy by volatility.**

| Domain type | Default TTL | Rationale |
|---|---|---|
| Model routing preferences | 7 days | Provider behavior changes frequently |
| Transient operational learnings | 7 days | Short-lived context (incidents, deployments) |
| API behavior and integration patterns | 30 days | APIs change on release cycles |
| Architectural patterns (project-specific) | 90 days | Reviewed at quarterly retro |
| Security policies and constraints | Never auto-expire | Human review required for any change |
| Compliance-relevant learnings | Never auto-expire | Regulatory retention requirements apply |

Expired entries are not deleted automatically — they enter a review queue.
A domain expert validates or discards them monthly. Target: 5% of active
entries reviewed per month (manageable volume, full corpus covered in
20 months). Low validation rate triggers memory system remediation.

**When memory governance fails at scale**, the tell is a sudden degradation in
evaluation metrics for a specific domain without a corresponding code change.
The recovery path is Pattern C (Memory Poisoning Recovery). The prevention path
is these four mechanisms deployed before the volume problem appears.

### Memory Governance in Regulated Environments

The governance properties described above (provenance, expiration,
compression, rollback, domain scoping) are necessary everywhere and
insufficient in regulated environments. Data classification adds a layer
of constraints on what agents may accumulate, retain, and retrieve.

**What regulated environments add to memory governance:**

| Domain | Memory Retention Constraint | Retrieval Constraint | Key Regulatory Basis |
|---|---|---|---|
| **Financial services** | Customer PII must not persist in agent memory beyond the session unless a DPA is in place. Banking secrecy jurisdictions may prohibit retention entirely. | External LLM retrievals must not send Confidential/Restricted financial data to unclassified endpoints. | GDPR Art. 5 (data minimisation); DORA third-party risk |
| **Medical devices / pharma** | Patient-level data must not persist in learned memory. GxP operational data retention follows the applicable retention schedule, not agent TTL. | GxP raw data must never be retrieved into an agent context that has write access to production records. | HIPAA §164.528; GDPR Art. 5; GxP data integrity |
| **Aviation** | ITAR/EAR-controlled technical data retained in agent memory constitutes a controlled export if transmitted to a non-compliant endpoint. | Retrieval from ITAR-controlled knowledge stores must operate within a Technology Control Plan. | ITAR 22 CFR 120-130; EAR 15 CFR 730-774 |
| **Defense / government** | CUI (Controlled Unclassified Information) must not persist in any memory store without appropriate classification handling. Classified information must not enter agent systems at all. | Retrieval must be restricted to approved, accredited environments. | CMMC 2.0; NIST SP 800-171; 32 CFR Part 2002 |

**The practical rule:** In regulated environments, learned memory is a
data store subject to the same classification, retention, and access
controls as any other system data. The manifesto's memory governance
properties (provenance, expiration, rollback, scoping) are the mechanism;
the applicable data regulation determines the thresholds. A GDPR data
minimisation obligation, for instance, means the TTL default for
customer-identifiable learnings is "session only" — not 30 days.

**Audit trail for memory changes.** In regulated contexts, the memory
governance operations themselves (write, expire, rollback) must be logged.
The standard memory entry schema fields (`provenance`, `expires_at`,
`domain_scope`) are the minimum; add `classification` and
`retention_basis` fields for regulated memory stores to make the audit
trail complete.

See the domain documents for domain-specific memory classification
requirements: [financial-services.md](domains/financial-services.md#data-residency-and-classification) ·
[pharma.md](domains/pharma.md#data-integrity-for-agent-systems) ·
[medical-devices.md](domains/medical-devices.md#tool-configuration-notes) ·
[aviation.md](domains/aviation.md#export-control-itarear)

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
build today. The tooling ecosystem is maturing rapidly — MCP, Agent Skills, and Git-native
agent memory systems represent early but widely adopted solutions — though
production-grade governance tooling remains nascent. Adopt incrementally: start
by measuring retrieval quality (relevance, latency, staleness), then add context
budgeting for long-running tasks, then tiered SLOs as scale demands. The
principle describes the engineering standard; the adoption path acknowledges the
gap.

### The Emerging Agent Stack

Recent frontier-lab writing is converging on a useful systems frame: the agent
is not just a model with a prompt. The operational stack increasingly looks
like:

- **Model** — the reasoning engine
- **Context layer** — retrieval, summaries, memory, and task framing
- **Harness** — execution loop, tool orchestration, constraints, checkpoints,
  and cleanup
- **Tools / APIs** — the external actions available to the agent
- **Environment / runtime** — the bounded execution context, permissions,
  traces, and operational controls

This is mostly a vocabulary clarification, not a new principle. The manifesto's
contribution is that it provides the governance model across this stack. P7
governs the context layer directly, but its quality depends on the harness
that selects and compacts context, the tools that retrieve it, and the runtime
that preserves or constrains state across sessions. In practice, treating
"context engineering" as a standalone discipline without connecting it to the
harness and runtime is how teams end up with excellent retrieval feeding
poorly-governed execution loops.

As of early 2026, four open standards are crystallizing around this stack, all
under the Agentic AI Foundation (AAIF, launched December 2025 by the Linux
Foundation, co-founded by Anthropic, OpenAI, Google, Microsoft, AWS, and Block):

- **MCP** (Model Context Protocol) — agent-to-tool connectivity at the
  tools/APIs layer. The de facto standard for how agents discover and invoke
  external capabilities.
- **A2A** (Agent-to-Agent, Google) — agent-to-agent communication at the
  coordination layer. Agent Cards for discovery, task lifecycle management,
  cross-framework collaboration.
- **Agent Skills** — capability definition at the harness layer.
  SKILL.md files that encode domain expertise, constraints, and procedures
  agents consume at runtime.
- **AGENTS.md** — repository-level constraints at the environment
  layer. Machine-readable architectural guidance that coding agents respect.

The manifesto's governance model — tiers, traces, accountability, evaluations —
sits across all four standards. No single protocol provides governance; the
manifesto's principles provide the governance framework that connects them.

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

The "proofs are a scale strategy" claim is now operationally achievable, not
just theoretically sound. Executable specification languages allow teams to
write specifications that are simultaneously human-readable documentation,
testable assertions, and inputs to model checkers — collapsing the gap between
"we wrote a spec" and "we proved a property." Model-based testing workflows
can generate test suites directly from executable specifications, connecting
formal models to CI pipelines without requiring teams to become proof engineers.
The practical entry point is not theorem proving but executable specs on one
critical path — the same scope recommended in the adoption playbook's formal
contracts step.

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

### Champion-Challenger Testing in Regulated Contexts

Champion-challenger testing compares agent system performance against an
incumbent approach — the current model, the prior system version, or the
clinical/operational standard of care. This is a cross-domain regulatory
expectation, not a financial-services-specific concept:

- **Financial services (SR 11-7)**: Requires comparing agent outputs against
  alternative approaches or incumbent models. Statistical methodology for
  handling output variability (non-deterministic agents) is an open regulatory
  question; conservative approach is to run champion-challenger on a held-out
  sample with human adjudication of disagreements.
- **Medical devices**: FDA GMLP and ISO/TS 24971-2 expect performance
  comparison against predicates (prior cleared devices) or the clinical
  standard of care. The manifesto's evaluation portfolio (P8) is the
  infrastructure for this comparison — extend evaluation suites with
  predicate-device test cases.
- **Pharma**: CSA expects assurance that a new system performs at least as
  well as the system it replaces. Run champion-challenger during PQ by
  executing parallel workflows and comparing outputs. Evidence bundle
  includes disagreement analysis and resolution rationale.
- **Aviation**: No direct champion-challenger requirement, but DO-178C
  requires that verification objectives are satisfied. For agent-assisted
  workflows replacing manual activities, demonstrate that the agent-assisted
  approach produces equivalent or better coverage per Table A objectives.

**The non-determinism problem.** Traditional champion-challenger assumes
identical inputs produce comparable outputs. Agents are non-deterministic.
Practical mitigation: run multiple agent invocations per input (N=3-5);
use the majority-vote or highest-confidence output as the champion response;
compare the distribution of champion responses against the incumbent.
Statistical confidence intervals, not point comparisons, are the evidence.

### Independent Verification in Regulated Contexts

Regulated industries share a common governance requirement: the party that
verifies a system must be organizationally independent from the party that
built it. SR 11-7 (financial services) requires independent model validation.
IEC 62304 (medical devices) requires verification by qualified parties
distinct from developers. DO-178C (aviation) requires independence at each
design assurance level.

In agentic engineering, this principle extends to agent-generated output: the
evaluation infrastructure that verifies agent work should be independent of the
agent that produced it. Concretely:

- Evaluation criteria should not be visible to the producing agent (evaluation
  holdout, described above)
- Evaluation models should differ from production models where feasible (avoid
  shared blind spots — see P1 correlated failure domains)
- For Tier 3 operations in regulated environments, organizational independence
  between agent development and agent validation should mirror existing
  regulatory expectations

This is not a new principle — it is a regulated-environment application of the
existing evaluation-as-contract pattern. See
[companion-frameworks.md](companion-frameworks.md#cross-domain-regulatory-insights)
for the cross-domain analysis and [domains/](domains/README.md) for
domain-specific independence requirements.

### Fairness and Bias Testing in High-Risk AI

EU AI Act Article 10 requires that training, validation, and testing datasets
for high-risk AI systems are "free of errors and complete" and that they account
for "characteristics or elements that are particular to the specific geographical,
behavioural or functional setting." In practice, this mandates bias testing
as part of the evaluation portfolio for any high-risk AI system.

This is a cross-domain obligation, not a financial-services-specific one:

- **Financial services**: Explicit fairness testing against protected
  classes under ECOA, FHA, and FCA Consumer Duty. Evaluation suites must
  include demographic parity and disparate impact analysis.
- **Medical devices**: Clinical AI systems must demonstrate equivalent
  performance across demographic subgroups (age, sex, ethnicity). ISO/TS
  24971-2 explicitly addresses this. Evaluation portfolios for Class B/C
  SaMD must include subgroup performance analysis.
- **Pharma**: ICH E8(R1) requires that clinical trial populations are
  representative of the intended treatment population. AI systems used in
  patient selection or stratification must be tested for demographic bias.
- **Automotive / industrial**: AI systems in driver monitoring or operator
  safety systems must demonstrate consistent performance across demographic
  characteristics that could influence detection accuracy.

**Minimum evaluation bar for high-risk AI systems**: Include at least one
explicit fairness evaluation category alongside behavioral regression and
adversarial cases. Fairness evaluation should specify: (1) which subgroup
characteristics are tested, (2) which performance disparity metric is used
(demographic parity, equalized odds, etc.), (3) the maximum acceptable
disparity, and (4) who owns the determination that the disparity is
acceptable. The last item is a human judgment — not an evaluation output.

### Workflow-Level Evaluation Enforcement

The evaluation-as-contract pattern extends beyond test suites into the
development workflow itself. Workflow-level skill frameworks now enforce strict red-green-refactor TDD: if
an agent writes implementation code before a failing test exists, the framework
deletes the code and forces a restart. Design-first, plan-first, and test-first
phases are mandatory, not suggested. This is evaluation-as-contract applied to
the development process rather than the runtime — and it demonstrates that P8's
principle operates at multiple layers, from CI pipelines to agent harness
constraints.

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

The Model Context Protocol (MCP) is now the de facto implementation of this
pattern for agent-to-tool connectivity. MCP provides JSON-RPC based typed
schemas, capability discovery, and structured tool invocation — exactly the
properties the manifesto requires. For agent-to-agent interoperability, Google's
A2A protocol standardizes discovery (Agent Cards), task delegation, and
collaboration. Together, MCP and A2A cover the two interoperability axes: how
agents connect to tools, and how agents coordinate with each other. Both are
governed under the Agentic AI Foundation (AAIF).

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

### Real-World Containment Failures

The OpenClaw ecosystem (2025-2026) provides instructive case studies. OpenClaw
itself — an open-source autonomous agent with 247K GitHub stars — demonstrated
how rapidly agentic systems scale when governance is absent. The Moltbook
incident (February 2026) exposed 1.5 million registered agents (only 17,000
human owners) through a misconfigured Supabase database with full read/write
access. The failure hit every threat category above: no identity controls, no
domain scoping, no blast-radius limits, no audit trail.

NVIDIA's response — NemoClaw (GTC 2026) — is an enterprise-hardened fork that
adds YAML-based permission policies, audit logging, and guardrail constraints.
This is containment engineering in practice: the same agent runtime, now with
the governance layer the manifesto requires. The pattern validates the core
P10 claim: emergence is not a feature to celebrate but a hazard to engineer
around. Systems that scale without containment infrastructure will produce
incidents at scale.

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

### Total Cost of Correctness — Decision Framework

The manifesto defines the formula conceptually. Here is how to use it for
routing decisions.

**The formula:**
```
Total Cost of Correctness =
  (Inference cost per task × Task count)
  + (Verification cost per task × Task count)
  + (Governance overhead per task × Task count)
  + (Expected remediation cost per failure × Failure rate)
  + (Opportunity cost of latency)
```

**Worked example: generating integration tests for a new API endpoint**

| Model tier | Inference cost | Expected pass rate | Rework cost on failure | Total cost of correctness |
|---|---|---|---|---|
| Fast/cheap model | $0.04 | 85% (3 failures of 20) | $0.50/failure = $1.50 | **$1.54** |
| Balanced model | $0.08 | 95% (1 failure) | $0.50/failure = $0.50 | **$0.58** |
| High-capability model | $0.20 | 99% (0.2 failures) | $0.50/failure = $0.10 | **$0.30** |

Naive cost optimization picks the fast model. Total-cost optimization picks the
high-capability model. The fast model's lower failure rate in simple cases
matters less than the higher-capability model's reliability on edge cases.

**Routing decision record.** For each routed task, capture:
```
task_type: [description]
estimated_complexity: [1-10]
model_selected: [model name/tier]
rationale: [why this model for this complexity]
actual_outcome: [pass / fail / rework]
actual_cost: [inference + verification + remediation]
```

Feed these records into a FinOps dashboard quarterly. Within three months of
operation, you will have an empirical cost model that makes routing decisions
data-driven rather than intuition-driven. The goal is not the cheapest model —
it is the model with the lowest total cost of correctness for that task class.

**DORA concentration risk note.** In regulated financial services, model routing
is not only an economics decision — it is a DORA third-party risk control.
Routing policies must include: failure-domain isolation (ensure no single
provider failure disables all tasks), cross-model canary checks, and documented
exit procedures if a provider becomes unavailable. Multi-model routing should
be documented in the DORA third-party risk register.

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
