# The Agentic Engineering Manifesto — Twelve Principles

*The engineering principles that operationalize the six values.*

See the [Manifesto](manifesto.md) for the core values and the Agentic Loop.
See the [Definition of Done](manifesto-done.md) for what "done" means.

**Values-to-principles mapping.** The manifesto claims these twelve principles
operationalize the six values. The correspondence:

| Value | Principles |
| --- | --- |
| Iterative steering and alignment | 1 — Outcomes, 2 — Specifications |
| Verified outcomes with auditable evidence | 8 — Evaluations, 12 — Accountability |
| Right-sized agent collaboration | 3 — Architecture, 4 — Swarm, 5 — Autonomy tiers |
| Curated, high-signal context and memory | 6 — Knowledge/memory, 7 — Context |
| Tooling, telemetry, and observability | 9 — Observability |
| Resilience under stress | 10 — Containment, 11 — Economics |

**Why twelve.** The principle count is not chosen for symbolic resonance with
the 2001 Agile Manifesto. Each principle is irreducible: removing any one
uncovers a distinct failure mode that the others do not cover. The closest
candidates for consolidation are P3 (architecture) with P10 (containment), and
P6 (knowledge/memory) with P7 (context). They remain separate because P3
governs deterministic boundaries enforced before agent action while P10
governs the engineered response to emergent behaviour after boundaries are
crossed — different failure modes, different controls; and because P6 governs
what the system retains and how it expires while P7 governs what is retrieved
into a specific reasoning loop and how it is budgeted — different lifetimes,
different infrastructure. A reader who finds twelve excessive should propose
the specific failure mode that becomes uncovered when a principle is removed.

**Sequencing matters.** These principles are not independent. Prerequisites:
Principle 2 (specifications) before Principle 8 (evaluations); Principle 3
(architecture) before Principle 5 (autonomy tiers); Principle 6
(knowledge/memory) before Principle 7 (context); Principle 9 (observability)
before Principle 12 (accountability). The
[Incremental Adoption Path](adoption-path.md) gives the recommended
implementation order.

---

## Contents
- [manifesto-principles-01.md](manifesto-principles-01.md) — Outcomes are the unit of work
- [manifesto-principles-02.md](manifesto-principles-02.md) — Specifications are living artifacts that evolve through steering
- [manifesto-principles-03.md](manifesto-principles-03.md) — Architecture is defense-in-depth, not a document
- [manifesto-principles-04.md](manifesto-principles-04.md) — Right-size the swarm to the task
- [manifesto-principles-05.md](manifesto-principles-05.md) — Autonomy is a permission ceiling, not a switch
- [manifesto-principles-06.md](manifesto-principles-06.md) — Knowledge and memory are distinct infrastructure
- [manifesto-principles-07.md](manifesto-principles-07.md) — Context is engineered like code
- [manifesto-principles-08.md](manifesto-principles-08.md) — Evaluations are the contract; proofs are a scale strategy
- [manifesto-principles-09.md](manifesto-principles-09.md) — Observability and interoperability cover reasoning, not just uptime
- [manifesto-principles-10.md](manifesto-principles-10.md) — Assume emergence; engineer containment
- [manifesto-principles-11.md](manifesto-principles-11.md) — Optimize the economics of intelligence
- [manifesto-principles-12.md](manifesto-principles-12.md) — Accountability requires visibility

See the split files below for the full Manifesto Principles corpus.
