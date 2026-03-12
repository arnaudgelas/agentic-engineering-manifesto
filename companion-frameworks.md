# Companion Guide — Cross-Cutting Frameworks

*Maturity spectrum, boundary conditions, and operational definitions that
apply across all twelve principles.*

Read the [Manifesto](manifesto.md) for the core values and minimum bars.
See the [Companion Guide](companion-guide.md) for the full table of contents.
See the [Adoption Playbook](adoption-playbook.md) for organizational change
management, role transitions, and pilot design.

---

## The Agentic Maturity Spectrum

Maturity is domain-specific, not organization-wide. A team can be Phase 5 in CI
and Phase 2 in production operations. Assess each domain honestly.

**Phase 1 — Guided Exploration ("vibe coding").** Single prompts, no structure,
no memory. Creative but unreliable. Useful for discovering what agents can do;
dangerous for anything that matters. *Failure mode: extrapolating demo results
to production expectations.*

**Phase 2 — Assisted Delivery.** AI as autocomplete. Copilot-style suggestions
where the human executes. Productivity gains are real but bounded by human
throughput. *Failure mode: optimizing human-in-the-loop speed instead of
questioning whether the loop is necessary.*

**Phase 3 — Agentic Prototyping.** Agents execute tasks autonomously within a
single session. Limited memory, limited verification. The moment most teams
realize prompting is not engineering. *Failure mode: autonomy without
verification — the agent said it worked.*

At this phase, teams should begin contract-aware prompting: agents produce
assertions and pre/postconditions with code, even before full proof pipelines
are in place.

**Phase 4 — Agentic Delivery.** Agents operate with basic guardrails:
autonomy tiers are defined, evaluations gate changes, and basic memory persists
across sessions. But the system is still single-domain, single-swarm, and
largely reactive. *Failure mode: governance without feedback — constraints are
enforced but never updated by what the system discovers.*

Phase 4 should pilot formal contracts on a narrow critical path only when team
capability and economics support it.

**Phase 5 — Agentic Engineering.** Structured autonomy at scale.
Specifications steer behavior and evolve through evidence. Multi-agent swarms
operate across domain boundaries, right-sized to each task. The full Agentic
Loop operates as a continuous system. *Failure mode: evaluation theater — evals
pass but do not test what matters.*

This is where contract-first development becomes systematic: code, contracts,
and proofs co-evolve continuously rather than being bolted on late.

**Phase 6 — Adaptive Systems.** Self-improving infrastructure within governed
boundaries. Systems that build, test, and fix themselves — then learn from the
results. Continuous learning with active memory curation. Chaos-tested,
runtime-verified, economically optimized. Specifications co-evolve with the
system's understanding of the problem space. Phase 6 is not inevitable; it
requires capabilities — formal verification, causal reasoning, provable
containment — that are still maturing. Treat it as a frontier, not a
destination. *Failure mode: self-improvement without containment — optimizing
the metric, not the goal.*

At this phase, agents can propose contract refinements and invariant updates,
but proof systems and governance gates must validate changes before adoption.

Every phase transition has distinct challenges. Phase 2→3 is where the
supervision paradox first hits. Phase 3→4 is where governance overhead must
justify itself. Phase 4→5 requires organizational change, not just tooling.
See the [Adoption Playbook](adoption-playbook.md) for detailed transition
guidance for each phase, role changes, and pilot design.

### Empirical Phase Profiles: Evidence from SWE-CI

The SWE-CI benchmark (arXiv:2603.03823) provides the first empirical evidence
for what each maturity phase looks like in measurable agent performance. SWE-CI
evaluates agents across 100 tasks spanning an average of 233 days and 71 commits
of real-world development history, using an Architect–Programmer dual-agent CI
loop.

- **Phase 1-2 performance**: Agents at these phases fail SWE-CI entirely. They
  lack the iterative capability to sustain a CI loop and cannot integrate
  feedback across cycles.
- **Phase 3 performance**: Agents pass early iterations but accumulate
  regressions at a high rate. Most models achieve a zero-regression rate below
  0.25 — matching Phase 3's canonical failure mode: "autonomy without
  verification." The agent produces plausible output but erodes the codebase
  iteration by iteration.
- **Phase 4 performance**: Agents show basic CI-loop competence with evidence
  per iteration but struggle with cross-iteration learning. Regression rates
  improve but do not plateau. Governance catches individual failures but does
  not address the structural regression pattern.
- **Phase 5+ performance**: Only top-performing models exhibit Phase 5
  characteristics: specification convergence across iterations, declining
  regression rates over time, and improving EvoScore. This matches Phase 5's
  description: the full Agentic Loop operating as a continuous system.

These profiles are descriptive, not normative — SWE-CI tests a specific task
type (long-term code maintenance), and phase maturity is domain-specific. But
they provide a concrete, measurable calibration point for teams self-assessing
their maturity.

### Alternative Framing: The Five Levels of Agentic Development

A complementary practitioner framing describes agentic maturity by *what the
human does* rather than *what governance exists*. These levels (attributed to
Dominik Fretz's analysis of production agentic teams) map to the manifesto's
phases but emphasize the human role transition:

- **Level 0 — Spicy Autocomplete**: AI as tab completion (Phase 1-2).
- **Level 1 — Coding Intern**: Discrete tasks delegated, everything reviewed
  (Phase 2-3).
- **Level 2 — Junior Developer**: Multi-file AI changes, human reads all code
  (Phase 3). *Most teams claiming to be "AI-native" operate here.*
- **Level 3 — Manager**: Human directs AI, reviews at PR level, no longer
  writes code (Phase 3-4 transition).
- **Level 4 — Product Manager**: Human writes specification, evaluates outcomes
  hours later, does not read code (Phase 4-5).
- **Level 5 — Dark Factory**: Specifications in, working software out, no human
  writes or reviews code (Phase 5-6).

The critical insight: **90% of developers who claim to be AI-native operate at
Level 2.** The gap between perceived and actual maturity is the most common
failure mode in agentic adoption. A 2025 study found experienced developers
using AI tools took 19% longer to complete tasks while believing AI made them
24% faster. The manifesto's phase-calibrated evidence requirements exist
precisely to close this perception gap — your phase is determined by the
evidence you can produce, not by the practices you believe you follow.

**Where the two frameworks diverge:** Fretz's levels are descriptive of the
human experience. The manifesto's phases are prescriptive about governance
infrastructure. A team can be at Level 3 (human as manager) while lacking the
Phase 4 governance infrastructure (evidence bundles, evaluation gates, defined
autonomy tiers) that makes Level 3 safe. The manifesto's position: advancing
levels without advancing phases is how you get Level 4 velocity with Phase 2
governance — which is how incidents happen.

---

## Boundary Conditions

This manifesto assumes the environment can support governed autonomy, reliable
evidence capture, and reversible operations. When these assumptions do not hold,
agentic engineering should be constrained — but not abandoned entirely.

### When to Cap Autonomy

Proceed cautiously or cap autonomy at Phase 2-3 when:
- Certification or regulatory regimes require deterministic assurance patterns
  that the current agent/tool chain cannot meet
- Safety-critical or real-time systems cannot tolerate probabilistic behavior at
  the current control boundary
- Classified or restricted environments cannot satisfy data-handling and tool
  isolation requirements
- Teams lack baseline CI/CD quality gates, incident response discipline, or
  domain ownership needed for safe autonomy

### What Regulated Industries Can Still Use

Capping autonomy does not mean the manifesto is irrelevant. Teams in
regulated environments (healthcare, finance, aerospace, defense, government)
can still adopt the manifesto's principles selectively:

- **Principles 1-3 (Outcomes, Specifications, Architecture)** apply fully.
  Outcome orientation, machine-readable specifications, and enforced domain
  boundaries are valuable in any regulatory context — and may strengthen
  compliance posture.
- **Principle 5 (Autonomy)** applies at Tier 1 (Observe) and Tier 2 (Branch)
  in most regulated environments. Agents analyze, propose, and draft in
  isolated environments; humans execute. The manifesto's tier model maps
  naturally to regulatory approval workflows.
- **Principle 8 (Evaluations)** applies fully. Evaluation portfolios,
  regression gates, and evidence bundles are compatible with — and often
  required by — regulatory audit frameworks.
- **Principle 9 (Observability)** applies fully. Structured traces with
  provenance are often more rigorous than existing audit logs.
- **Principle 12 (Accountability)** applies fully. Domain-scoped human
  accountability with incident attribution aligns with regulatory
  responsibility frameworks.

The principles that require caution in regulated environments are primarily
Principle 5 at Tier 3 (production-impacting agent actions), Principle 6
(memory governance in data-restricted environments), and Principle 10
(chaos testing in safety-critical systems).

### What Would Need to Change

For regulated industries to move beyond Phase 3, the following capabilities
must mature: deterministic or formally verifiable agent behavior for critical
paths, certified evidence chains that satisfy audit requirements, and
data-handling frameworks that meet jurisdictional restrictions for agent-
accessible data. These are active areas of development. Teams in regulated
environments should track progress and pilot cautiously rather than waiting
for full maturity.

---

## Operational Definitions

**Blast radius**: the maximum credible impact of a wrong action across users,
data, services, or regulatory obligations.

**Right-sized**: the smallest agent topology and model tier that can meet the
required quality and latency targets at acceptable total cost of correctness.

**Evidence bundle**: the minimum artifacts needed to justify a change at a given
phase and risk tier.

**Total cost of correctness**: `inference + verification + governance overhead +
incident remediation + opportunity cost + context-switching cost`. Optimize this
composite, not any single component. See
[Principle 11 guidance](companion-principles.md#principle-11--economics-extended-guidance).

**Evolution-weighted correctness (EvoScore)**: a metric that measures functional
correctness on future modifications, not just current tests. Agents whose early
decisions facilitate subsequent evolution score higher; agents that accumulate
structural technical debt see progressively declining performance. Introduced by
the SWE-CI benchmark (arXiv:2603.03823). Use evolution-weighted metrics as a
complement to total cost of correctness for long-running agent pipelines. See
[Structural Regression](companion-principles.md#behavioral-regression-vs-structural-regression)
in the P8 extended guidance.

**Structural regression**: a change that passes all current tests but degrades
the codebase's capacity for future change. Distinguished from behavioral
regression (breaking existing functionality). See
[P8 guidance](companion-principles.md#behavioral-regression-vs-structural-regression).

Phase-calibrated evidence examples:
- **Phase 3**: tests, diff, trace link, rollback note.
- **Phase 4**: Phase 3 bundle plus policy checks and incident tags.
- **Phase 5+**: Phase 4 bundle plus reproducible replay and, where justified,
  formal artifacts.

### ALCOA+ Alignment

Organizations operating under GxP, FDA 21 CFR Part 11, or equivalent regulated
data-integrity frameworks will recognise that the manifesto's evidence model
satisfies ALCOA+ by construction:

| ALCOA+ Criterion | Manifesto Mechanism |
|------------------|---------------------|
| **Attributable** | Agent identity in every trace; named human domain owner (P12) |
| **Legible** | Structured, queryable traces — not free-text logs (P9) |
| **Contemporaneous** | Traces captured at execution time, not reconstructed after the fact |
| **Original** | Signed provenance for shared state; immutable evidence bundles |
| **Accurate** | Evaluations as the contract between intent and behavior (P8) |
| **Complete** | Evidence bundles are phase-gated; incomplete bundles block merge |
| **Consistent** | Versioned specifications; regression gates enforce non-degradation |
| **Enduring** | Replayable tool logs; trace retention as infrastructure requirement |
| **Available** | Traces must be queryable and aggregatable for audit at any time (P9) |

This mapping is intentional, not coincidental. The manifesto was designed so that
governed agentic delivery produces records that meet regulated-industry
data-integrity standards without a separate compliance overlay.
