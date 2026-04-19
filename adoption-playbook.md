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
| **Phase 1→2** (exploration → assisted delivery) | Low: tooling licenses, standardization time | Immediate: measurable cycle time reduction on assisted tasks | AI suggestions accepted at a materially positive rate without increasing rework |
| **Phase 2→3** (assisted → agentic prototyping) | Low-medium: specification discipline, review process | 1–2 months | Agent outputs consistently reviewable; rework rate tracked |
| **Phase 3→4** (prototyping → governed delivery) | Medium: evidence pipeline, evaluation suite, domain boundary encoding | 2–4 months | Evidence completeness ≥95%; escaped defect rate ≤ human baseline |
| **Phase 4→5** (governed → engineering scale) | Significant: platform ownership, memory governance, multi-domain expansion | 4–8 months | Total cost of correctness declining per outcome; oversight load stable |

Treat these as starting signals, not universal thresholds. Calibrate against your domain baseline and risk class.

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

## Converting Agile Ceremonies to Agentic Practice

Teams converting from Agile face a specific organizational challenge: the
ceremonies are load-bearing. They are not decoration. They synchronize teams,
surface blockers, and create accountability. Abolishing them without replacing
the function they serve produces confusion and regression. The question is not
whether to keep the ceremonies — it is what mechanism replaces each function.

The table below maps the core Agile ceremonies to their agentic equivalents.
The intent of each ceremony is preserved; the mechanism changes to match
machine-speed, evidence-based execution. These are starting points, not mandates.
Adapt to the team's phase maturity and domain constraints.

| Agile Ceremony | Intent | Agentic Equivalent | Mechanism |
|---|---|---|---|
| **Sprint Planning** | Agree on scope and how to build it | **Spec Refinement & Tier Assignment** | Domain owner and leads convert backlog items into machine-readable specifications with autonomy tier assignments and blast-radius classifications. Ambiguous items are decomposed until unambiguous — not estimated. The plan artifact is a specification, not a story-point count. |
| **Daily Standup** | Synchronize status and surface blockers | **Trace Audit & Anomaly Review** | Daily review of structured traces from the prior period. Tasks with unexpected tool calls, evaluation failures, or cost spikes are flagged for root-cause. The traces are the status; there is no verbal report. The review surfaces behavioral drift before it compounds into a hallucination loop. |
| **Sprint Review** | Demonstrate completed work to stakeholders | **Evidence Bundle Review** | Completed work is presented via evidence bundles: diffs, trace IDs, evaluation results, policy check outputs. Stakeholders review outcomes and audit quality, not demos. "The agent said it worked" does not pass review. |
| **Retrospective** | Reflect on process and improve it | **Memory Curation & Skill Promotion** | Review the knowledge base and learned memory from the cycle: what heuristics held, what failed, what should be promoted to reusable skill artifacts. Stale memory is pruned. Recurring failure patterns become new evaluation cases. The retro artifact is a memory diff, not a list of action items. |
| **Backlog Refinement** | Clarify and prioritize upcoming work | **Specification Sharpening** | Upcoming specifications are reviewed for constraint completeness, risk assignment, and observable success criteria. Items without measurable success criteria are not pulled into the next Spec Refinement cycle. |
| **Release Planning** | Coordinate cross-team work for a release | **Governance Checkpoint** | Cross-domain review of autonomy tier assignments, blast-radius gates, and evidence bundle completeness for all release-bound changes. The domain owner (P12) confirms accountability assignment before deployment. |

**The failure mode to avoid.** Teams that attempt to run Agile ceremonies
unchanged alongside agentic workflows typically end up with two parallel
processes: the Agile process for humans and an ungoverned agentic process
running in parallel. Both processes degrade. The table above collapses the
two into one evidence-based, specification-driven workflow.

**Phase calibration.** At Phase 1–2, the Standup → Trace Audit conversion may
be partial: teams are still building trace infrastructure. Start with a hybrid
(brief verbal check plus whatever traces exist) and migrate fully once tracing
is reliable. Do not adopt the full ceremony mapping before the infrastructure
can support it.

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
