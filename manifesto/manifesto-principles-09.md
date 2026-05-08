## 9. Observability and interoperability cover reasoning, not just uptime


Instrument decisions, tool calls, policy violations, memory retrievals, cost per
task, and near-misses — so you can explain *why* something happened, not just
*that* it happened. Every agent action must produce an inspectable trace: diffs,
tool calls, decision chains, evaluation results, rollbacks.

Traces are not logging. Logging records events. Traces reconstruct reasoning —
the full chain from specification to decision to action to outcome. They are the
audit trail that makes agentic systems governable, debuggable, and safe.

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

**Observability covers governance state, not only system behavior.** The
following signals must be instrumented alongside reasoning traces: stale
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
