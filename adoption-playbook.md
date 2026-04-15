# Agentic Engineering — Adoption Playbook

*How to adopt the Agentic Engineering Manifesto in your organization:
incremental steps, role evolution, change management, and success metrics.*

Read the [Manifesto](manifesto.md) for the core principles. Read the
[Companion Guide](companion-guide.md) for implementation depth and worked
patterns. Use this playbook to plan and drive the organizational change.

---

## Making the Business Case

Agentic engineering is a technical discipline. But the organizational decision
to adopt it — and sustain it through the J-curve dip before returns materialize
— is a business decision that requires a business case.

### The Competitive Logic

The organizations leading on AI are not winning because they have access to
better models. The same foundation models are broadly available. They are
winning because they can *apply* those models faster, with less risk, and at
greater scale than competitors who are still governing AI with processes
designed for human developers.

That advantage compounds. A team that verifies faster ships faster. A team that
ships faster learns faster. Better learning sharpens specifications, which
improves agent output, which reduces rework, which frees capacity for
higher-value work. The Agentic Loop, run well, is a compounding return on
engineering investment — not a one-time productivity gain.

The teams that build this flywheel early widen the gap continuously. The
question for decision-makers is not "should we invest in agentic engineering?"
but "how long can we afford not to?"

### Stage-Gated Investment Model

Agentic engineering adoption is stage-gated investment, not a single project.
Each phase transition has a distinct investment profile and return horizon:

| Phase transition | Investment character | Return horizon | Key go/no-go signal |
|---|---|---|---|
| **Phase 1→2** (exploration → assisted delivery) | Low: tooling licenses, standardization time | Immediate: measurable cycle time reduction on assisted tasks | AI suggestions accepted >50% without rework |
| **Phase 2→3** (assisted → agentic prototyping) | Low-medium: specification discipline, review process | 1–2 months | Agent outputs consistently reviewable; rework rate tracked |
| **Phase 3→4** (prototyping → governed delivery) | Medium: evidence pipeline, evaluation suite, domain boundary encoding | 2–4 months | Evidence completeness ≥95%; escaped defect rate ≤ human baseline |
| **Phase 4→5** (governed → engineering scale) | Significant: platform ownership, memory governance, multi-domain expansion | 4–8 months | Total cost of correctness declining per outcome; oversight load stable |

**Do not fund the next phase until the current phase has produced evidence that
justifies it.** Organizations that invest in Phase 4 governance infrastructure
before they have Phase 3 evidence that agents produce reviewable output create
bureaucracy, lose team confidence, and stall. The correct sequence: prove the
model in one domain, then replicate. Replication is cheap once proven; the
investment in proof is not recoverable if you skip it.

### Business Outcome Metrics

Frame investment returns in business terms, not engineering activity:

**Cycle time reduction.** Time from specification to verified deployment. Target:
halving cycle time for governed changes by Phase 4. This directly enables faster
product iteration and competitive response.

**Escaped defect rate.** Post-release fixes cost 5–10× pre-release fixes. Every
percentage-point reduction compounds into reduced incident cost, reduced
remediation overhead, and reduced reputational risk.

**Senior talent leverage.** Risk-tiered verification routes low-risk changes
through automated evidence pipelines, freeing senior engineers for
architecture, evaluation design, and high-risk review. Track hours redirected
from low-value review to high-leverage work.

**Total cost of correctness.** The full cycle cost: inference + verification +
governance overhead + incident remediation. This replaces story points and
velocity as the primary economic signal. Track it per domain, per phase, per
quarter. If it is not declining, the phase transition has not delivered.

---

## The New Way of Working

**Humans** express intent as specifications with constraints and acceptance
criteria — then refine those specifications as evidence accumulates. They encode
architecture as enforceable, monitored domain boundaries. They set autonomy
tiers appropriate to risk. They own outcomes and remain accountable. They do not
supervise every intermediate step — they define what success looks like, verify
that the system achieved it, and inspect the reasoning when it matters.

**Agents** decompose specifications into executable tasks. They execute within
domain boundaries, right-sized to complexity. They verify their own outputs
against evaluations. They report evidence, not assertions. They learn from
failure and encode that learning in memory — with provenance, so the system
knows where every lesson came from.

**Systems** maintain persistent knowledge and curated learned memory. They route
work to appropriate model tiers based on cost and quality requirements. They
enforce architectural constraints at runtime and monitor for violations. They
observe behavior, surface anomalies, and maintain the feedback loops that make
everything else work. They forget what no longer serves them.

---

## Contents

### [Roles and the Human Side](adoption-roles.md)

How roles evolve (Developers, Tech Leads, QA Engineers, Operations Engineers)
and the human dimension of the transition: naming the loss, the supervision
paradox, the acceleration trap, sustainable pace, and protecting the junior
pipeline.

### [Adoption Path and Phase Transitions](adoption-path.md)

The six-step incremental adoption path (technical infrastructure for Phase 3+)
and organizational change guidance for every phase transition from Phase 1→2
through Phase 5→6.

### [Resistance, Politics, and Your First Pilot](adoption-pilot.md)

Navigating organizational friction (productivity dip, velocity metrics, cost
conversation, incentive misalignment) and a concrete guide for running your
first governed pilot.

### [Success Metrics and Failure Modes](adoption-metrics.md)

Metrics by phase transition, team health indicators, quarterly review cadence,
and common failure modes of the organizational change program.
