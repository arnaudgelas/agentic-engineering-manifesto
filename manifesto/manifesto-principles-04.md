## 4. Right-size the swarm to the task


Prefer specialized agents coordinated through shared contracts and state. But do
not default to maximum parallelism. A single well-evaluated agent with excellent
tools often outperforms an expensive, uncoordinated swarm. Scale agents to
complexity, not to ambition.

Design conflict resolution, not just parallelism. Swarms propose; a single
commit path commits. Choose the simplest topology that solves the problem and
graduate to more complex coordination only when evidence shows it is needed.

The point of a swarm is not to mimic an organization chart. It is to create
structured disagreement, specialization, and reconciliation where the workload
benefits from multiple perspectives. Intelligence at system scale is often
plural rather than monolithic. The engineering question is not "how many agents
can we run?" but "what coordination pattern produces better verified outcomes
than a single agent on this workload?" Swarms are not only for implementation:
the same coordination patterns — specialization, structured disagreement,
reconciliation — apply to governance work such as specification critique, threat
modeling, evidence assembly, and release risk assessment; a swarm that only
writes code while governance remains a separate human overlay is not a governed
agentic system.

**Signals that indicate a single agent is insufficient:**
- The task requires concurrent reads or writes across multiple bounded contexts
  where race conditions cannot be resolved inside a single agent.
- Evaluation pass rate plateaus below threshold across successive sessions
  despite specification refinement, indicating context degradation under length.
- The task requires adversarial specialization — roles whose objectives conflict
  and cannot be fully trusted from the same agent (e.g., implementation and
  independent security review).
- Single-agent tool call depth or context budget is consistently saturated on
  representative tasks.

In the absence of these signals, default to single-agent or pipeline.

**Shared state needs an operating model, not just a schema.** A typed,
versioned state store is necessary but not sufficient once more than one agent
can write to it concurrently. For every piece of state multiple agents touch,
define:

- **Authority** — which agent or service owns writes to this state. Readers
  may cache; only the owner mutates. An orchestrator delegating a task does
  not thereby acquire write authority over the delegate's state.
- **Atomicity** — transitions that must be indivisible (no agent observes a
  half-applied update) are protected by transactions or single-writer
  discipline, not left to convention or lucky scheduling.
- **Idempotency** — every write carries an idempotency key so retries after a
  timeout, crash, or duplicate delivery do not double-apply.
- **Leases and locks** — contested resources are protected by time-bounded
  leases, not indefinite locks; a crashed or hung holder cannot deadlock the
  swarm past the lease expiry.
- **Conflict resolution** — concurrent writes to the same key have a defined
  resolution (single commit path with rejection, last-writer-wins with vector
  clocks, CRDT merge) decided before the swarm ships, not improvised when two
  agents collide in production.
- **Partial-failure recovery** — if an agent dies or is killed mid-transaction,
  the system detects the incomplete state and either completes or rolls it
  back; it does not leave state in an ambiguous, unattributed condition.
- **Replay determinism** — state mutations are logged so the sequence can be
  reconstructed after the fact (replay level 1, per
  [`manifesto-principles-09.md`](manifesto-principles-09.md)). Do not claim
  re-execution or counterfactual guarantees (levels 2–4) for shared-state
  history unless tool responses and model checkpoints were separately pinned
  at write time.
- **Taint propagation** — state derived from an unverified or untrusted
  source (another agent's unreviewed output, an external tool result) carries
  that taint forward through every downstream write until an explicit
  verification step clears it. Downstream agents and evaluators must be able
  to inspect provenance and taint, not just the current value.
- **Retention** — how long each class of state persists, and what triggers
  its expiry, is specified up front rather than left to accumulate
  indefinitely.
- **Rollback** — state changes are revertible to a known-good checkpoint when
  a swarm run is aborted, a downstream evaluation fails, or a commit is later
  found to violate policy.
- **Garbage collection** — orphaned locks, leases, and scratch state left by
  crashed, timed-out, or abandoned agents are reclaimed on a schedule, not
  left to leak and starve future runs.

*Minimum bar: If shared state is not typed, versioned, and reconciled — with
explicit authority, atomicity, idempotency, leases and locks, conflict
resolution, partial-failure recovery, replay determinism, taint propagation,
retention, rollback, and garbage collection — the swarm is a mob.*

*Minimum bar (tier containment): An orchestrator cannot delegate actions to
specialist agents that exceed its own authorized autonomy tier. Tier elevation
requires the same approval path regardless of whether the request originates
from a human or an orchestrating agent.*

---
