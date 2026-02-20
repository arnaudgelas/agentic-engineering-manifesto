# Agentic Engineering — Adoption Playbook

*How to adopt the Agentic Engineering Manifesto in your organization:
incremental steps, role evolution, change management, and success metrics.*

Read the [Manifesto](manifesto.md) for the core principles. Read the
[Companion Guide](companion-guide.md) for implementation depth. Use this
playbook to plan and drive the organizational change.

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

## How Roles Evolve

The transition from writing code to steering agents changes what each role owns
day-to-day.

**Developers** own specification quality, constraint encoding, and outcome
acceptance. The core skill is expressing intent precisely enough that agents can
execute it, then refining intent based on evidence.

**Tech Leads** own domain boundaries, decision records, topology choices, and
conflict-resolution rules. The core skill is designing constraints that keep
multi-agent collaboration reliable under load.

**QA Engineers** own evaluation portfolios, adversarial coverage,
formal-invariant checks where needed, and evidence gates. The core skill is
defining the contract between intent and behavior in machine-verifiable terms.

**Operations Engineers** own behavioral observability, cost routing, memory
governance, runtime safety, and chaos drills. The core skill is keeping the
feedback loop honest under real-world conditions.

---

## Incremental Adoption Path

Start where you are. Do not attempt all principles at once.

1. Define domain boundaries and autonomy tiers.
2. Require evidence bundles for every merged change.
3. Add regression gates before expanding autonomy.
4. Add adversarial/security evaluations on exposed surfaces.
5. Pilot formal contracts on one high-blast-radius path.
6. Expand only when incident rate and economics improve.

---

## Organizational Change by Phase Transition

Adoption requires explicit change management by phase:

### Phase 3 → 4: Governed Delivery Foundation

- Add CI/CD evidence and policy gates
- Assign domain owners and escalation rotations
- Standardize incident classification and rollback drills

**Phase 4 → 5 (engineering-scale transition)**
- establish shared evaluation registry and trace standards
- create platform ownership for agent runtime, routing, and memory governance
- formalize security reviews for tools, connectors, and shared state

**Phase 5 → 6 (adaptive frontier)**
- require governance for self-updating specifications and routing policies
- maintain independent audit paths for high-impact domains
- treat formal methods expertise as targeted specialization, not universal role

Common change-program failure modes:
- process bloat that increases lead time without reducing incidents
- unclear ownership between platform, product, and operations teams
- autonomy expansion before evaluation quality is stable
- vendor lock-in through non-portable tool interfaces

---

## Test This Manifesto

Treat this manifesto as a living specification. Run pilots, publish failure
analyses, measure outcomes, and revise principles based on evidence from real
workflows.

Track these indicators each quarter:
- lead time from specification to verified deployment
- escaped defect rate and incident severity distribution
- rollback frequency and mean time to recovery
- policy violation rate and evidence bundle completeness
- human oversight load (high-risk reviews per domain owner)
- total cost of correctness by domain

If governance overhead rises while quality and resilience do not improve, reduce
control complexity and re-baseline autonomy scope.
