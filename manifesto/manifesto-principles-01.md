## 1. Outcomes are the unit of work


Progress is measured by the cycle **Outcome → Evidence → Learning** — not by
tokens generated, tasks dispatched, or agents spawned. An agent that says "done"
has proven nothing. A change is done only when it is loop-complete, observable,
verified, validated, and learned from.

Four distinct claims must hold before "done" is true:

**Evaluation** is the contract that defines correctness. Evaluations are
versioned, machine-readable, and coupled to the specification. They define what
"correct" means in terms the system can check autonomously.

**Verification** is the act of running evaluations to confirm the implementation
matches the specification. Verification answers: *did we build it right?* It
produces evidence — test reports, policy check outputs, trace IDs — that an
agent's output satisfies the acceptance criteria.

**Validation** is the judgment that the specification itself was worth building.
Validation answers: *did we build the right thing?* It checks fitness for
real-world use against the evidence available at release-candidate handoff —
staged runs, simulated traffic, and evaluation-portfolio results — not live
production outcomes, which sit downstream of AEM's loop in the release and
operations layers (see [the Definition of Done's handoff
boundary](manifesto-done.md#handoff-to-the-release-layer)). Verification can
pass completely while validation fails — you can build exactly what the
specification said, correctly, and hand off the wrong thing.

**Independent validation** is the organizational challenge of whether
verification and validation were genuinely rigorous. It answers: *were the first
two real?* In regulated contexts, this must be performed by a party
organizationally independent from the team that developed and verified the
system. It is not a technical step — it is a governance requirement.

Evidence means: evaluation reports with pass/fail and metrics, trace IDs linking
to the full decision chain, diffs showing what changed, the control state record
confirming what is ready for handoff, rollback plans confirming reversibility
(tested, not just documented), policy check outputs confirming constraint
compliance, and memory updates confirming what was learned. Anything less is
assertion, not evidence.

*Minimum bar: If it is not instrumented for traceability, verified against
evaluations, validated against the evidence available at handoff, and packaged
into a complete evidence bundle ready for release-layer handoff, it is not done.*

---
