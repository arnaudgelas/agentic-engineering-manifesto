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

**Phase 2 — Assisted Delivery.** AI as autocomplete. AI code-completion tool
suggestions where the human executes. Productivity gains are real but bounded by human
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

Use this benchmark family as a calibration aid, not as a universal scorecard.
Public agent benchmarks age quickly, can be contaminated, and tend to attract
optimization pressure from the ecosystem. Treat them as one input into maturity
assessment alongside private holdouts, incident rates, replay quality, and
domain-specific evidence bundles.

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

Anecdotal practitioner reports suggest many teams overestimate their AI-native
maturity — most operate closer to Level 2 than they believe. The gap between
perceived and actual maturity is the most common failure mode in agentic
adoption. A 2025 study reported that experienced developers using AI tools took
19% longer to complete tasks while believing AI made them 24% faster. The manifesto's phase-calibrated evidence requirements exist
precisely to close this perception gap — your phase is determined by the
evidence you can produce, not by the practices you believe you follow.

Use this as calibration, not as a universal scorecard.

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

### Hard Autonomy Caps by Regulated Use Case

Some use cases carry hard autonomy caps regardless of the organization's
maturity phase. These caps are not recommendations — they are regulatory
constraints. A Phase 5 team operating at full agentic maturity still cannot
exceed these caps. The table below shows the strictest cap per domain; see
each domain document for the complete use-case-specific cap table.

| Domain | Conservative Default Cap | Regulatory Basis | Domain Document |
|---|---|---|---|
| **Aviation** (airborne software DAL A/B) | Tier 1 (observe only) | DO-178C; DO-330 tool qualification | [aviation.md](domains/aviation.md) |
| **Medical Devices** (IEC 62304 Class C; EU AI Act high-risk) | Tier 1 (observe only) | IEC 62304; EU MDR + AI Act (Class IIa+) | [medical-devices.md](domains/medical-devices.md) |
| **Pharma** (GMP context; GxP record modification) | Tier 1 (observe only) | GAMP 5; 21 CFR Part 11; EU GMP Annex 11 | [pharma.md](domains/pharma.md) |
| **Financial Services** (credit/insurance decisions; algorithmic trading) | Tier 1 (observe only) | EU AI Act Annex III §5; GDPR Art. 22; MiFID II | [financial-services.md](domains/financial-services.md) |
| **Automotive** (ASIL C/D safety functions) | Tier 1 (observe only) | ISO 26262; UN Regulation 157 | [automotive.md](domains/automotive.md) |
| **Defense / Government** (classified or ITAR-controlled systems) | Tier 1 (observe only) | CMMC; ITAR 22 CFR 120-130; FedRAMP | [defense-government.md](domains/defense-government.md) |

The rows above show conservative defaults for the most restrictive category in
each domain. Lower-risk workflows in the same domain may permit higher tiers if
separately justified. Most workflows in these industries permit Tier 2 or Tier 3
for lower-risk activities. The domain documents contain full use-case-specific
cap tables with the regulatory basis for each row.

**Phase maturity and autonomy tiers interact.** Beyond the hard caps above,
phase maturity is a prerequisite for autonomy tier:
- Phase 3 or below → Tier 1 only, regardless of infrastructure
- Phase 4 → Tier 2 available (branch + human approval)
- Phase 5+ → Tier 3 available, subject to use-case caps above

A team cannot operate at a higher autonomy tier than their phase supports,
even if the infrastructure is in place.

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
(memory governance in data-restricted environments — see
[P6 extended guidance](companion-principles.md#memory-governance-in-regulated-environments)),
and Principle 10 (chaos testing in safety-critical systems — validate
chaos experiments in isolated environments before running on production
equivalents).

For viable starting points by domain, see:
[Aviation](domains/aviation.md#viable-starting-points) ·
[Medical Devices](domains/medical-devices.md#viable-starting-points) ·
[Pharma](domains/pharma.md#viable-starting-points) ·
[Financial Services](domains/financial-services.md#market-specific-autonomy-guidance)

### What Would Need to Change

For regulated industries to move beyond Phase 3, the following capabilities
must mature: deterministic or formally verifiable agent behavior for critical
paths, certified evidence chains that satisfy audit requirements, and
data-handling frameworks that meet jurisdictional restrictions for agent-
accessible data. These are active areas of development. Teams in regulated
environments should track progress and pilot cautiously rather than waiting
for full maturity.

### Cross-Domain Regulatory Insights

Three governance requirements appear independently across regulated domains.
They are not domain-specific — they are structural properties of any high-
stakes verification system.

**Independent validation as a governance principle.** Across regulated domains
— SR 11-7 in financial services, IEC 62304 in medical devices, DO-178C in
aviation — a common requirement emerges: the entity that validates a system
must be independent from the entity that developed it. In agentic engineering,
this applies at two levels: the agent system itself must be validated by
parties independent of its development, and agent-generated outputs in
regulated contexts must be verified through independent means. This maps to
the manifesto's tier model: at Tier 1-2, human review provides independence;
at Tier 3, independent evaluation infrastructure (separate models, holdout
scenarios) provides the independence guarantee. See
[P8 extended guidance](companion-principles.md#independent-verification-in-regulated-contexts).

**SOUP / agent-as-tool categorization.** Multiple regulatory frameworks require
classification of software components by provenance and qualification status:
IEC 62304 (SOUP), DO-178C/DO-330 (COTS/PDS and tool qualification levels),
ISO 26262 (SEooC), and GAMP 5 (software categories). In agentic engineering,
three entities require classification: the AI model itself (non-deterministic,
version-dependent, opaque), agent-selected dependencies (libraries and patterns
chosen during execution), and agent-generated code (may incorporate
training-data patterns as implicit unclassified software). The manifesto's
defense-in-depth response: treat the agent as an unqualified tool and
independently verify all output through qualified means. See
[P3 extended guidance](companion-principles.md#agent-as-tool-and-software-of-unknown-provenance).

**Data classification as an agent constraint.** Agents operating in regulated
environments must respect data classification boundaries. Classification
requirements constrain what data agents may access, where inference may
execute, and what outputs may be retained. Data classification is not a
prompt instruction — it must be enforced at the infrastructure level
(Principle 5: autonomy tiers). Domain-specific constraints:

- **Financial services**: GDPR cross-border transfer rules (Chapter V) and
  banking secrecy laws (Switzerland, Luxembourg, Singapore) may prohibit
  certain data from reaching external inference APIs entirely.
- **Life sciences (pharma / medical)**: GxP record integrity requires
  ALCOA+ compliance; patient-level clinical data carries HIPAA (US) and
  GDPR (EU) obligations; raw GxP data must never be modifiable by agents.
- **Aviation / defense**: ITAR (22 CFR 120-130) and EAR (15 CFR 730-774)
  restrict export-controlled technical data to compliant infrastructure;
  agents must operate within Technology Control Plans.
- **Automotive / industrial**: Safety-function configuration data may be
  restricted under product liability and type-approval obligations.

The manifesto's architecture principle (P3) applies across all domains:
data classification boundaries must be machine-enforced, not documented
and hoped for. See each domain document for the applicable classification
matrix and enforcement mechanism.

**IEC 61508 as the parent functional safety standard.** IEC 61508 (2010)
is the foundational functional safety standard for industrial electronic
systems, from which several domain standards derive: IEC 62304 (medical
device software), ISO 26262 (automotive), EN 50128 (railway), and
IEC 62061 (machinery). Teams in domains not covered by a specific domain
document should map IEC 61508 Safety Integrity Levels (SIL 1–4) to the
manifesto's autonomy tiers using the same logic as the DAL and safety
class mappings: SIL 3-4 functions → Tier 1 (observe only); SIL 2 →
Tier 1-2; SIL 1 → full tier range with evidence controls.

### Domain-Specific Regulatory Alignment

For detailed mappings between the manifesto and specific regulatory frameworks,
see the [Domain Regulatory Alignment](domains/README.md) documents:

- [Aviation](domains/aviation.md) — DO-178C, DO-330, DO-333, ARP 4754A
- [Medical Devices](domains/medical-devices.md) — IEC 62304, ISO 14971,
  ISO 13485, FDA SaMD
- [Pharma / Life Sciences](domains/pharma.md) — GAMP 5, CSA, 21 CFR Part 11,
  ICH
- [Financial Services](domains/financial-services.md) — SR 11-7, DORA,
  EU AI Act, SOX
- [Automotive](domains/automotive.md) — ISO 26262, ASPICE, UN Regulation 157
- [Defense / Government](domains/defense-government.md) — CMMC, FedRAMP,
  NIST SP 800-53, ITAR/EAR

For V-model organizations, see [adoption-vmodel.md](adoption-vmodel.md) for
a V-model-specific adoption path.

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
