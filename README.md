# The Agentic Engineering Manifesto

Principles for building systems where humans steer intent, agents execute
within governed boundaries, and verified outcomes are the only measure that
matters.

---

## Why This Repository Exists

The Agile Manifesto (2001) was written for a world where humans wrote all the
code. In agentic workflows, generation, verification, and deployment can run at
machine speed. Legacy rituals such as sprint cadence, velocity scoring, and
manual review-first pipelines become bottlenecks or blind spots at scale.
Early empirical evidence — notably the SWE-CI benchmark showing 75%+ regression
rates per CI iteration across 18 models — confirms that agentic systems require
purpose-built engineering discipline, not retrofitted Agile ceremonies.

This repository provides a complete alternative: the case for change, the
manifesto itself, implementation guidance, an organizational adoption path, a
five-wave publishing campaign, and a structured training curriculum.

Start with **[Beyond Agile](beyond_agile.md)**, then move through the manifesto,
companion guidance, and adoption playbook.

---

## Core Values

| We value more | over | We also value |
|---|---|---|
| Iterative steering and alignment | | Rigid upfront specifications |
| Verified outcomes with auditable evidence | | Fluent assertions of success |
| Right-sized agent collaboration | | Monolithic god-agents |
| Curated, high-signal context and memory | | Stateless sessions and noisy memory |
| Tooling, telemetry, and observability | | Chat-based heroics |
| Resilience under stress | | Performance in ideal conditions |

That is, while there is value in the items on the right, we value the items on
the left more.

## Twelve Principles (Summary)

1. **Outcomes are the unit of work**
2. **Specifications are living artifacts that evolve through steering**
3. **Architecture is defense-in-depth, not a document**
4. **Right-size the swarm to the task**
5. **Autonomy is a tiered budget, not a switch**
6. **Knowledge and memory are distinct infrastructure**
7. **Context is engineered like code**
8. **Evaluations are the contract; proofs are a scale strategy**
9. **Observability and interoperability cover reasoning, not just uptime**
10. **Assume emergence; engineer containment**
11. **Optimize the economics of intelligence**
12. **Accountability requires visibility**

See full text in [manifesto-principles.md](manifesto-principles.md).

## The Agentic Loop

**Specify &rarr; Design &rarr; Plan &rarr; Execute &rarr; Verify &rarr; Validate &rarr; Observe &rarr; Learn &rarr; Govern &rarr; Repeat**

---

## Repository Map

### 1) Beyond Agile (Case for Change)

- [beyond_agile.md](beyond_agile.md): Main argument for why Agile is
  insufficient for agentic systems.
- [beyond-agile-failures.md](beyond-agile-failures.md): Ten structural failures
  in values, practices, and conceptual coverage.
- [beyond-agile-landscape.md](beyond-agile-landscape.md): Critical comparison
  of competing manifestos, standards, and frameworks.
- [beyond-agile-sources.md](beyond-agile-sources.md): Twenty-three cited
  sources including academic benchmarks (SWE-CI, Feldt et al.), industry
  frameworks (AWS, P3 Group, ISO 5338), and practitioner perspectives (Fretz,
  Jones, Kern, Reuven).

### 2) The Manifesto (Normative Core)

- [manifesto.md](manifesto.md): Core values, scope, and Agentic Loop.
- [manifesto-principles.md](manifesto-principles.md): Twelve principles with
  minimum bars.
- [manifesto-done.md](manifesto-done.md): Agentic Definition of Done (seven
  criteria plus evolvability).
- [manifesto-agentic-engineering.md](manifesto-agentic-engineering.md):
  Extended single-file edition (core + principles + maturity and roles context).

### 3) Companion Guide (Implementation Guidance)

- [companion-guide.md](companion-guide.md): Overview and navigation.
- [companion-principles.md](companion-principles.md): Extended guidance and
  tradeoffs by principle. Includes the Architect–Programmer pattern (from
  SWE-CI), evaluation holdout and probabilistic satisfaction (from Fretz),
  and behavioral vs. structural regression analysis.
- [companion-frameworks.md](companion-frameworks.md): Maturity spectrum,
  boundary conditions, operational definitions, empirical phase profiles from
  SWE-CI, and an alternative framing mapping Fretz's Five Levels to manifesto
  phases.
- [companion-patterns.md](companion-patterns.md): Worked patterns and failure
  patterns.
- [companion-reference.md](companion-reference.md): Nine failure modes (including
  structural regression without detection) and skill requirements.

### 4) Adoption Playbook (Organizational Transition)

- [adoption-playbook.md](adoption-playbook.md): Playbook overview and new way
  of working.
- [adoption-roles.md](adoption-roles.md): Role evolution, human-side transition
  guidance, and the Acceleration Trap (with perception gap evidence).
- [adoption-path.md](adoption-path.md): Incremental technical adoption path and
  phase transitions.
- [adoption-pilot.md](adoption-pilot.md): Resistance management and first pilot
  execution.
- [adoption-metrics.md](adoption-metrics.md): Success metrics, quarterly review
  cadence, and failure modes.

---

## Recommended Reading Paths

- **Quick orientation (30-45 min):**
  [beyond_agile.md](beyond_agile.md) →
  [manifesto.md](manifesto.md) →
  [adoption-playbook.md](adoption-playbook.md)
- **For practitioners implementing now:**
  [manifesto-principles.md](manifesto-principles.md) →
  [companion-principles.md](companion-principles.md) →
  [companion-patterns.md](companion-patterns.md) →
  [adoption-path.md](adoption-path.md)
- **For engineering leaders and change owners:**
  [beyond-agile-landscape.md](beyond-agile-landscape.md) →
  [adoption-roles.md](adoption-roles.md) →
  [adoption-metrics.md](adoption-metrics.md)

---

## Contributing

This manifesto improves through evidence, not consensus alone. See
[CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on proposing changes,
submitting worked patterns, or reporting issues.

## Authors

See [AUTHORS.md](AUTHORS.md) for the list of contributors.

## License

This work is shared for community discussion and adoption. See [LICENSE](LICENSE)
for details.
