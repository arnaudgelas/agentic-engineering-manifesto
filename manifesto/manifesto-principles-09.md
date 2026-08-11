## 9. Observability and interoperability cover reasoning, not just uptime


Instrument decisions, tool calls, policy violations, memory retrievals, cost per
task, and near-misses — so you can explain *why* something happened, not just
*that* it happened. Every agent action must produce an inspectable trace: diffs,
tool calls, decision chains, evaluation results, rollbacks.

Traces are not logging. Logging records events. Traces capture
decision-relevant observable evidence and causal execution history — the
chain of specification, tool calls, state changes, and outcomes that actually
occurred. They do not give you access to the model's latent reasoning: any
model-authored rationale or explanation attached to a trace (a chain-of-thought
summary, a "why I did this" narration) is an **untrusted assertion**, not proof
of what the agent actually did. The model narrating its own reasoning can be
incomplete, post-hoc, or fabricated. Judges and verifiers must check trace
claims against actual environment state — the tool calls, diffs, and system
state the trace records — not accept the narration on its own. Traces are the
audit trail that makes agentic systems governable, debuggable, and safe
precisely because they are checked against what happened, not because they
report what the model says it was thinking.

**"Replay" has levels — traces do not guarantee all of them.** The word is
used loosely across this corpus and that looseness overclaims. There are (at
least) four distinct things "replay" can mean, in increasing order of
difficulty:

1. **Event reconstruction** — reading the trace to reconstruct, after the
   fact, what happened: which tool was called with what arguments, what the
   environment returned, what decision followed. This requires only that the
   trace be complete and honest. It does not require re-running anything.
2. **Deterministic simulation** — re-executing the recorded sequence of calls
   against a fixed or mocked environment (recorded tool responses, a pinned
   model checkpoint, a frozen policy set) to confirm the same trace is
   produced from the same inputs. This requires the model, tools, and
   environment to be pinned or recorded, not just the trace.
3. **Live re-execution** — re-running the same specification against the
   *current* production services and current model version to see whether it
   still produces the same (or an equivalent) outcome. This is defeated by
   any service, dependency, or model version change since the original run,
   and by any source of model nondeterminism (sampling, tool-call ordering
   under concurrency, time- or context-dependent retrieval).
4. **Counterfactual reproduction** — re-running with one input deliberately
   changed to test whether the outcome changes for the reason the trace
   claims it did (e.g., "would this have been blocked if the policy had
   fired first?"). This requires a controlled environment plus the ability to
   hold everything else constant — the hardest of the four, and it is a
   verification capability, not a logging capability.

**What retaining trace IDs actually guarantees today: (1), and, only where
tool responses and model versions were separately recorded and pinned, a
partial (2).** It does not guarantee (3) or (4). A trace ID is a pointer into
recorded history — it lets you reconstruct what happened, it does not by
itself let you re-run it, and it especially does not let you re-run it against
services and models that have since changed, or in the presence of
nondeterministic models. Any claim in this corpus that traces are
"replayable" without further qualification means level (1) (event
reconstruction) unless the bundle also records the pinned tool-response
fixtures and model checkpoint needed for level (2). Treat levels (3) and (4)
as capabilities a system may choose to build on top of traces, not as
something trace retention delivers on its own.

Observability and interoperability are coupled here because portable
observability requires interoperable trace formats. You cannot aggregate traces
across vendor boundaries without standardized contracts, and you cannot debug
cross-runtime failures without replayable tool logs. They have separate minimum
bars but share a dependency: without interoperability, observability fragments
at the system boundary where it matters most.

*Minimum bar (observability): If you cannot answer "why did this happen" from
traces alone, you are not instrumented.*

*Minimum bar (interoperability): If tools cannot be swapped or replayed across
runtimes without rewriting core workflows, the platform is brittle.*

**Trace data governance is part of the minimum bar, not an add-on.** Traces
capture prompts, tool arguments and outputs, retrieved documents, and
intermediate state — which means they routinely capture secrets, credentials,
and personal data pulled in during retrieval or tool use. "Log everything" is
itself a data-exposure risk, not a safe default. A trace pipeline is not
observable-and-governed unless it satisfies the same conditions the
[Definition of Done](manifesto-done.md) requires of any evidence bundle:
minimisation (capture what is decision-relevant, not everything reachable),
redaction of secrets and personal data before persistence or at query time,
encryption at rest and in transit, tenant isolation so traces from one
customer or workload are not readable from another's context, access control
scoped to who needs the trace and why, a defined retention period, and
deletion on schedule or on request. A trace store that cannot answer "who can
read this, how long do we keep it, and how do we delete it" is not
instrumented — it is a liability with a dashboard.

**Observability covers governance state, not only system behavior.** The
following signals must be instrumented alongside decision traces: stale
artefacts in active evidence bundles, surfaced without manual audit using the
freshness rules in the Definition of Done; controls in a failed or waived state
with no recorded resolution timeline or expiry; accountability ownership gaps —
active production components with no named, current owner; rubber-stamping
patterns — review-time distribution anomalies and approval-without-trace events
as defined in the accountability metrics; and model, prompt, or tool manifest
changes that have not triggered an evaluation re-run. Governance-state
observability makes the difference between a system that is governed and a
system that appears governed. If the current health of the governance state
cannot be answered from instrumentation alone, the system is not observable in
the sense that matters for agentic operation.

---
