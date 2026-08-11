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

Open agent-to-agent protocols are beginning to standardize agent discovery,
task lifecycle management, and cross-framework collaboration. The manifesto's
governance model — tiers, traces, accountability — sits above these protocols:
the protocol handles agent-level coordination; the manifesto's principles
govern what those agents are allowed to do and how their decisions are
audited. Teams adopting multi-agent topologies should treat communication
protocols as the coordination layer and the manifesto's tier model as the
authorization layer.

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
separation may be structurally necessary, not just a preference. This is a
design hypothesis, not a benchmarked finding: the SWE-CI benchmark
(arXiv:2603.03823v1) uses an Architect–Programmer harness to *evaluate* agents,
but it does not compare that topology against a single-agent baseline, so it is
not evidence that separation is the minimal viable structure. What SWE-CI does
show is that long-horizon maintenance is hard: across 100 tasks spanning an
average of 233 days and 71 commits, most evaluated models achieve zero-regression
rates below 0.25. A single agent attempting both roles must hold implementation
context and specification-steering context simultaneously, which plausibly
degrades at the timescales long-term maintenance requires — but this specific
mechanism has not been isolated experimentally.

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

If your team frames this as adopting "graph engineering" — an explicit,
typed graph of nodes and routing predicates in place of a linear chain — see
the [Vocabulary Bridge](vocabulary-bridge.md#graph-engineering) for how AEM
positions that label against the topology requirements P3 and P4 already
impose.

### Coordination Discipline

Parallelize exploration and analysis. Serialize decisions that change shared
state. Coordination is never free: shared state must be typed, versioned, and
reconciled. Contracts must be logged. Domain boundaries must prevent collisions.
Without these, a swarm is a mob — agents duplicating work, producing conflicting
diffs, or interpreting constraints inconsistently.

---
