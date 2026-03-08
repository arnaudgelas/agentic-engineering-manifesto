# The Agentic Engineering Manifesto — Definition of Done

*What "done" means in agentic engineering.*

See the [Manifesto](manifesto.md) for the core values and the Agentic Loop.
See the [Twelve Principles](manifesto-principles.md) for the engineering
principles.

---

## The Agentic Definition of Done

Tokens generated and tasks dispatched are vanity metrics. "The agent said it
worked" is not a completed ticket.

A change is **done** when it is:

**Shipped** — deployed or delivered, not just merged.

**Observable** — instrumented and logged so reasoning can be inspected and
reconstructed from traces.

**Verified** — evaluated against regression tests (and adversarial cases),
with an evidence bundle (diffs, trace IDs, policy check outputs) required for
every automated merge.

**Provable (when risk requires it)** — formalized invariants and replayable
proof artifacts attached for critical workflows.

**Learned from** — knowledge base and learned memory updated with what was
discovered, with provenance.

**Governed** — operating within autonomy tiers appropriate to its risk, with
human accountability assigned.

**Economical** — routed through appropriate model tiers, cost tracked and
justified per outcome.

Anything less is in progress.

This DoD is phase-calibrated, not all-or-nothing. At Phase 3, "verified" means
tests and a diff; at Phase 5, it means reproducible replay with formal artifacts
where justified. "Provable" applies only when risk requires it; "economical"
matters only when routing infrastructure exists. The bar rises with the stakes —
but at every phase, the question is the same: can you show evidence, not just
assertions?

**Evolvability as an implicit criterion.** A change that passes today's tests
but degrades the codebase's capacity for future change is not truly done — it
has traded short-term correctness for structural regression. The SWE-CI
benchmark (arXiv:2603.03823) provides empirical evidence: most agents introduce
regressions in over 75% of CI iterations, many structural rather than
behavioral. At Phase 4 and above, "verified" should include evolution-weighted
signals — not just whether current tests pass, but whether each change makes the
next change easier or harder. See
[Structural Regression](companion-principles.md#behavioral-regression-vs-structural-regression)
in the Companion Guide.

**Why it matters:** This forces the system to optimize for actual business
outcomes rather than raw output volume, killing the illusion of productivity.
