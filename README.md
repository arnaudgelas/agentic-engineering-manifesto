# The Agentic Engineering Manifesto

<!-- github-only -->
<div align="center">

[![Read Online](https://img.shields.io/badge/Read%20Online-Published%20Site-cc2200?style=flat-square)](https://arnaudgelas.github.io/agentic-engineering-manifesto/)&nbsp;
[![Download PDF](https://img.shields.io/badge/Download-PDF-e07000?style=flat-square)](https://github.com/arnaudgelas/agentic-engineering-manifesto/raw/main/manifesto.pdf)&nbsp;
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey?style=flat-square)](LICENSE)&nbsp;
[![Last Commit](https://img.shields.io/github/last-commit/arnaudgelas/agentic-engineering-manifesto?style=flat-square)](https://github.com/arnaudgelas/agentic-engineering-manifesto/commits/main)

</div>

---
<!-- /github-only -->

*Principles for building systems where humans steer intent, agents execute
within governed boundaries, and verified outcomes are the primary measure that
matters for agentic work.*

> **The Agile Manifesto was written for a world where humans wrote all the
> code. That world no longer exists.**

In agentic workflows, generation, verification, and deployment run at machine
speed. Legacy ceremonies — sprint cadence, velocity scoring, manual
review-first pipelines — become bottlenecks and blind spots. Early empirical
evidence, including the SWE-CI benchmark showing regression rates above 75%
per CI iteration across 18 models (arXiv:2603.03823), confirms that agentic
systems require purpose-built engineering discipline, not retrofitted Agile
ceremonies.

This repository provides a complete alternative: the case for change, the
manifesto itself, a companion implementation guide, an organizational adoption
playbook, and domain-specific regulatory alignment for six industries.

**[Read the published version →](https://arnaudgelas.github.io/agentic-engineering-manifesto/)**

---

## Six Values

| We value more | over | We also value |
|---|---|---|
| Iterative steering and alignment | | Rigid upfront specifications |
| Verified outcomes with auditable evidence | | Fluent assertions of success |
| Right-sized agent collaboration | | Monolithic god-agents |
| Curated, high-signal context and memory | | Stateless sessions and noisy memory |
| Tooling, telemetry, and observability | | Chat-based heroics |
| Resilience under stress | | Performance in ideal conditions |

*While there is value in the items on the right, we value the items on the left more.*

---

## Twelve Principles

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

---

## The Agentic Loop

**Specify → Design → Plan → Execute → Verify → Validate → Observe → Learn → Govern → Repeat**

Any phase can trigger a return to an earlier one based on evidence.
The loop is the system. The principles are how you keep it honest.

---

## Who Is This For?

| If you are | Start with |
|---|---|
| New to agentic engineering | [Beyond Agile](beyond_agile.md) → [The Manifesto](manifesto.md) → [Adoption Playbook](adoption-playbook.md) |
| A practitioner implementing now | [Twelve Principles](manifesto-principles.md) → [Principle Guidance](companion-principles.md) → [Patterns](companion-patterns.md) → [Adoption Path](adoption-path.md) |
| An engineering leader or change owner | [Beyond Agile Landscape](beyond-agile-landscape.md) → [Adoption Roles](adoption-roles.md) → [Metrics](adoption-metrics.md) |
| In a regulated industry | [Domain Overview](domains/README.md) → your domain document |

---

## Repository Map

### 1) Beyond Agile (Case for Change)

- [beyond_agile.md](beyond_agile.md): The argument for why Agile is
  insufficient for agentic systems.
- [beyond-agile-failures.md](beyond-agile-failures.md): Ten structural failures
  in values, practices, and conceptual coverage.
- [beyond-agile-landscape.md](beyond-agile-landscape.md): Critical comparison
  of competing manifestos, standards, and frameworks.
- [beyond-agile-sources.md](beyond-agile-sources.md): Twenty-three cited
  sources including academic benchmarks (SWE-CI, Feldt et al.), industry
  frameworks (AWS, P3 Group, ISO 5338), and practitioner perspectives.

### 2) The Manifesto (Normative Core)

- [manifesto.md](manifesto.md): Core values, scope, Agentic Loop, and reading
  guide.
- [manifesto-principles.md](manifesto-principles.md): Twelve principles with
  minimum bars.
- [manifesto-done.md](manifesto-done.md): Agentic Definition of Done (seven
  criteria plus evolvability) and Definition of Done for Hardening (vibe-to-prod
  path).
- [glossary.md](glossary.md): Canonical definitions for all terms used across
  the manifesto document set.

### 3) Implementation Guide

- [companion-principles.md](companion-principles.md): Extended guidance and
  tradeoffs by principle. Includes the Architect–Programmer pattern, evaluation
  holdout and probabilistic satisfaction, and behavioral vs. structural
  regression analysis.
- [companion-frameworks.md](companion-frameworks.md): Maturity spectrum,
  boundary conditions, and operational definitions.
- [companion-patterns.md](companion-patterns.md): Worked patterns and failure
  patterns.
- [companion-re-framework.md](companion-re-framework.md): Requirements
  engineering framework — two-axes classification, behavioral envelopes, and
  probabilistic assurance targets.
- [companion-reference.md](companion-reference.md): Failure modes and skill
  requirements.

### 4) Adoption Playbook (Organizational Transition)

- [adoption-playbook.md](adoption-playbook.md): Playbook overview and new way
  of working.
- [adoption-roles.md](adoption-roles.md): Role evolution and human-side
  transition guidance.
- [adoption-path.md](adoption-path.md): Incremental technical adoption path and
  phase transitions.
- [adoption-vmodel.md](adoption-vmodel.md): V-model-specific adoption path for
  regulated and verification-heavy organizations.
- [adoption-pilot.md](adoption-pilot.md): Resistance management and first pilot
  execution.
- [adoption-metrics.md](adoption-metrics.md): Success metrics, quarterly review
  cadence, and failure modes.

### 5) Domain-Specific Regulatory Alignment

- [domains/README.md](domains/README.md): Navigation and disclaimers.
- [domains/aviation.md](domains/aviation.md): DO-178C, DO-330, DO-333,
  ARP 4754A.
- [domains/medical-devices.md](domains/medical-devices.md): IEC 62304,
  ISO 14971, ISO 13485, FDA SaMD.
- [domains/pharma.md](domains/pharma.md): GAMP 5, CSA, 21 CFR Part 11, ICH.
- [domains/financial-services.md](domains/financial-services.md): SR 11-7,
  DORA, EU AI Act, SOX, Three Lines of Defense.
- [domains/automotive.md](domains/automotive.md): ISO 26262, SOTIF, ASPICE.
- [domains/defense-government.md](domains/defense-government.md): MIL-STD-882,
  DO-326A, NIST AI RMF.

---

This is a living document. Contributions are welcome — see
[CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on proposing changes,
submitting worked patterns, or reporting issues. See [AUTHORS.md](AUTHORS.md)
for contributors. See [LICENSE](LICENSE) for terms.
