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

*Minimum bar: If shared state is not typed, versioned, and reconciled, the swarm
is a mob.*

*Minimum bar (tier containment): An orchestrator cannot delegate actions to
specialist agents that exceed its own authorized autonomy tier. Tier elevation
requires the same approval path regardless of whether the request originates
from a human or an orchestrating agent.*

---
