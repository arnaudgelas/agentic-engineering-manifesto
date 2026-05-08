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

The emerging open-protocol stack now covers both interoperability axes the
manifesto requires: how agents connect to tools, and how agents coordinate with
other agents. Recent protocol revisions added stronger authorization models,
structured capability metadata, safer transport patterns, and more durable task
lifecycle support. These developments matter because they move interoperability
from vendor-specific SDK behavior toward inspectable contracts that can be
governed, audited, and replaced.

*Interoperability minimum bar: If tools cannot be swapped or replayed across
runtimes without rewriting core workflows, the platform is brittle.*

---
