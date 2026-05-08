## Principle 1 — Outcomes: Extended Guidance


*See Principle 1 in the manifesto for the core statement and minimum bar.*

### The Probability-Compounding Problem

A common intuition is that system correctness compounds multiplicatively — if
each module is correct with probability `p`, a system of `N` modules has roughly
`p^N` correctness. This mental model is misleading in two directions:

- **Too optimistic**, because it assumes independent failures. Real agentic
  systems share models, knowledge bases, and tool chains that create correlated
  failure domains. A single poisoned retrieval shard or a shared model blind spot
  can invalidate every agent simultaneously — far worse than `p^N` predicts.
- **Too pessimistic**, because cross-verification between agents can break the
  compounding chain in ways that independent modules cannot. When agents verify
  each other's outputs against independent evidence sources, the effective error
  rate can be driven below any individual module's failure rate.

The useful question is not "what is `p^N`?" but **"where are the shared
dependencies that make failures correlated?"** A working failure-domain
decomposition:

- **Correlated model failure**: The same base model is used everywhere, making
  reasoning blind spots systemic.
- **Correlated retrieval failure**: The same poisoned or stale knowledge base
  shard feeds multiple agents. In practice, this is often the most insidious
  class because it produces plausible-looking but systematically wrong outputs.
- **Correlated tool failure**: The same flaky integration or API rate limit
  blocks the entire swarm.
- **Correlated governance failure**: The same reviewer fatigue or policy
  misconfiguration rubber-stamps errors.

This is a practitioner framework, not a proven exhaustive taxonomy. Teams should
extend it for their specific failure surfaces and validate priority ordering
against their own incident data. The shared dependencies it names mean
system-level risk is often much worse than independent-failure models suggest —
but also that targeted decorrelation (diverse models, independent retrieval
indexes, redundant tool chains) can yield outsized reliability gains.

### Evidence Bundles and Assurance Levels

This does not mean full formal verification is a near-term default for every
team. It means assurance must scale with blast radius and system size.
Evidence bundles should be immutable, replayable, and auditable, with proof
artifacts introduced where risk justifies cost: signed trace manifests when
required by policy, deterministic replay artifacts, and formalized invariants
verified by proof or model-checking tools where warranted.

---
