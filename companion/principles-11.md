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
| --- | --- | --- | --- | --- |
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

Feed these records into a FinOps dashboard quarterly. How long it takes to
reach an empirical, data-driven cost model depends on task volume and the
diversity of the task population being routed, not on elapsed time alone: a
team routing thousands of tasks per week across a narrow set of task classes
may have a usable model within weeks, while a team routing dozens per month,
or covering task classes with rare but high-severity failure modes, may need
a year or more of records before failure rates in the tail are estimated with
any confidence. Track sample size per task class explicitly, and treat the
cost model as provisional for any class that has not yet accumulated enough
observed outcomes to bound its failure rate. The goal is not the cheapest
model — it is the model with the lowest total cost of correctness for that
task class, once that cost is actually known.

**DORA concentration risk note.** In regulated financial services, model routing
is not only an economics decision — it is a DORA third-party risk control.
Routing policies must include: failure-domain isolation (ensure no single
provider failure disables all tasks), cross-model canary checks, and documented
exit procedures if a provider becomes unavailable. Multi-model routing should
be documented in the DORA third-party risk register.

---
