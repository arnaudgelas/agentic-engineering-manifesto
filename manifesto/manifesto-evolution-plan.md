# Agentic Engineering Manifesto — Evolution Plan

*What changes, what stays, and exactly how to make it.*

---

## Context and Constraints

The manifesto is well-designed for its purpose: governing agentic systems in the engineering execution phase of the software lifecycle. The inner loop — Specify through Govern — is rigorous, the principles are well-calibrated, and the companion and adoption document sets are mature. The changes below are **additive and minimal**. No principles change. No existing section is removed. All existing reviews and assessments remain valid.

The gap is structural, not substantive: the manifesto is an inner-loop document that has been used as a complete SSDLC story. The fix is to make the manifesto's actual scope explicit, define the interfaces where it connects to the outer lifecycle, and point outward to the frameworks that cover the rest.

The manifesto is **shared engineering execution infrastructure** for two distinct delivery modes:

| Delivery mode | What is being delivered | Outer framework |
| --- | --- | --- |
| **Software delivery** | Software, built using agents as tools | ASDLC — Agentic Software Delivery Lifecycle |
| **Agent product delivery** | An agent system that serves a business purpose directly | APLC — Agentic Product Lifecycle |

In both modes the manifesto governs the inner engineering execution loop — Specify through Govern. What surrounds that loop differs completely: a software delivery lifecycle (demand, release, ops for a software artifact) versus an agent product lifecycle (conception, behavioral specification, behavioral operations for a decision-making system). The changes below position the manifesto correctly as the shared inner layer, with explicit pointers to both outer frameworks.

**What does not change:**
- The six values
- The twelve principles (P1–P12) and their minimum bars
- The Agentic Loop phases (Specify through Govern)
- The Definition of Done and its seven conditions
- The Hardening DoD
- The companion document set (companion-guide, companion-principles, companion-patterns, companion-reference, companion-re-framework, companion-frameworks)
- The adoption document set (adoption-path, adoption-playbook, adoption-enterprise, adoption-metrics, adoption-pilot, adoption-vmodel)
- The domain files
- The review prompt system (except the additions in Phase 6 of the ASDLC plan)

**Summary of changes:**
- `manifesto.md` — 3 additions: upstream interface section, downstream interface section, scope section update (now references both ASDLC and APLC)
- `adoption-roles.md` — 1 addition: demand-layer roles forward reference
- `adoption-path.md` — 1 addition: ASDLC framing note
- `glossary.md` — additions after both ASDLC and APLC documents are written

---

## Change 1 — `manifesto.md`: Add "Specification Readiness Gate"

**Location:** In "The Agentic Loop" section, between the Mermaid diagram and the first phase definition (currently "- **Specify** defines what to build and why.").

**What to add:** A new sub-section titled "What must be true before entering Specify." This is the L1→L2 interface contract: the conditions a piece of demand must meet to become a governed specification that can enter the loop. Without this gate, the loop's rigour is applied to unvalidated input — perfectly verified, governed output of the wrong thing.

**Full text to insert:**

```markdown
### What Must Be True Before Entering Specify

The loop is rigorous. It verifies, validates, observes, learns, and governs with
discipline. But that rigour is only as valuable as the intent it is applied to.
Specify is not the beginning of a software lifecycle — it is the beginning of
the execution phase. Something must precede it.

A specification is **loop-ready** when all of the following are true:

**Business need validated.** The need is real and evidence-backed — not just
articulated. User research, data analysis, regulatory mandate, or executive
decision with documented rationale constitutes validation. A stakeholder request
without supporting evidence is not a validated need.

**Value measurable.** A success criterion at the business level exists and is
measurable post-deployment. "Improve customer experience" is not measurable.
"Reduce mean time to resolution for claims by 20% within 90 days of deployment"
is. If you cannot define what business success looks like before entering the
loop, you cannot validate at the end.

**Acceptance criteria expressible.** The need can be expressed as machine-readable
acceptance criteria and constraints. If a domain expert cannot write a first draft
of the acceptance criteria before the loop starts, the need is not well-understood
enough to specify.

**Constraints identified.** Security requirements, compliance obligations, domain
ownership boundaries, performance envelopes, and data classification constraints
are known before Specify begins. Discovering a compliance constraint at the
Verify phase is a scope failure, not a verification failure.

**Accountable human named.** A named person accepts business-level accountability
for the outcome before the loop runs — the P12 anchor, established upstream. This
person owns the success criterion, not the implementation.

**Blast radius assessed.** A preliminary assessment of maximum credible impact if
the implementation fails. This informs the autonomy tier (P5) and the scope of
the evidence bundle required. A change whose failure impacts one microservice
requires different governance than one whose failure affects a regulatory filing.

**Out-of-scope explicitly stated.** What this specification explicitly does not
include. Absent this, scope expands during execution — a common driver of
specification drift inside the loop.

If these conditions are not met, the work belongs in the demand layer (Layer 1
of the ASDLC — see the [ASDLC overview](asdlc.md)), not in the Specify phase.
Entering the loop without a loop-ready specification does not save time — it
produces well-executed work on the wrong problem.

*Minimum bar: If you cannot answer "what does business success look like and how
will you measure it?" before entering Specify, the loop is not ready to run.*
```

---

## Change 2 — `manifesto.md`: Add "Loop Output Contract"

**Location:** After the Govern phase description (currently ending with "- **Govern** applies policy, accountability, change control, and economics review. When inference or governance cost exceeds the value of the work, Govern signals Specify to simplify scope or reduce autonomy rather than continuing to spend.") and before the "Verification and validation are distinct disciplines" paragraph.

**What to add:** A sub-section titled "What the Loop Produces." This is the L2→L3 interface contract: the artefacts the loop hands to the release layer. Currently the DoD condition "Shipped — deployed or delivered, not just merged" implies a hand-off, but the artefacts and criteria for that hand-off are not defined. The release layer (Layer 3 of the ASDLC) begins where this contract ends.

**Full text to insert:**

```markdown
### What the Loop Produces

The loop's output is not code. It is an **evidence-backed deployable** — a
package of artefacts that together satisfy the Definition of Done and provide
the release layer with everything it needs to make a governed deployment decision.

A complete loop output contains:

**The deployable artefact.** The code, configuration, model, or process change
that implements the specification. Built, tested, and ready to deploy to the
target environment.

**The evidence bundle.** Per Principle 1 and the Definition of Done: evaluation
reports with pass/fail and metrics, trace IDs linking to the full decision chain,
diffs showing what changed, policy check outputs confirming constraint compliance,
and memory updates confirming what was learned. The evidence bundle is the
machine-readable record of how "done" was proven. Anything less is assertion.

**The specification artefact.** The versioned, final state of the specification
as it stood when the evaluation suite passed. This is the document against which
independent validation (P8) is performed, and the reference against which future
changes to this component will be assessed.

**The rollback procedure.** A tested rollback plan (not just documented — tested
in a representative environment) that allows the deployment to be reversed within
a defined time window if the change produces unintended production behaviour.
The rollback procedure is a condition of the DoD's "Governed" criterion.

**The accountability sign-off.** A named human who has reviewed the evidence
bundle, accepted that the DoD conditions are satisfied, and accepts production
accountability for the outcome (P12). This is not a rubber stamp — it is the
governance record that the evidence was reviewed.

These artefacts are handed to the release layer as a unit. A release layer that
accepts a deployable without a complete evidence bundle is accepting unverified
output. A release layer that accepts an evidence bundle without a named accountable
human is accepting ungoverned output. Both are governance failures at the boundary,
not in the loop.

See [Release & Deployment Governance](release-governance.md) for how the release
layer receives and acts on these artefacts.
```

---

## Change 3 — `manifesto.md`: Update "Scope and Non-Goals"

**Location:** Replace the existing "Scope and Non-Goals" section entirely. The current section defines scope negatively ("what we don't cover") without acknowledging the adjacent lifecycle layers that practitioners need. The updated section names the manifesto's actual position within the ASDLC and provides explicit pointers to the outer layers.

**Full replacement text:**

```markdown
## Scope and Framework Context

### What this manifesto covers

The engineering discipline for governing systems that include autonomous agents
as first-class participants in **engineering execution**: from a loop-ready
specification entering Specify through governed output exiting the loop. This
includes:

- The Agentic Loop: Specify, Design, Plan, Execute, Verify, Validate, Observe,
  Learn, Govern — and the feedback paths between them.
- Governance structures, autonomy controls, and evidence practices for the
  execution phase.
- The Definition of Done: the conditions that prove a loop output is complete.
- Adoption guidance for transitioning teams through the maturity phases.
- Domain-specific mappings to regulatory frameworks for teams in regulated
  industries.

### Position as shared engineering execution infrastructure

This manifesto is the **engineering execution layer** shared by two outer
frameworks, each serving a different delivery mode:

**When the deliverable is software — use the ASDLC.** Agents are tools that
build, test, and deliver software. This manifesto governs the inner loop;
the ASDLC governs the full software delivery lifecycle.

| ASDLC Layer | Name | Scope | Document |
| --- | --- | --- | --- |
| 1 | Demand & Value | Business need → loop-ready specification | [asdlc.md](asdlc.md) |
| **2** | **Engineering Execution** | **Specify → Govern → loop output** | **This manifesto** |
| 3 | Release & Deployment | Loop output → production | [release-governance.md](release-governance.md) |
| 4 | Operations & Maintenance | Production → operated, patched, retired | [operations-governance.md](operations-governance.md) |

**When the deliverable is an agent system — use the APLC.** The agent itself
is the product, serving a business purpose directly (a claims agent, a trading
agent, a regulatory reporting agent). This manifesto still governs the
engineering build phase; the APLC governs the full agent product lifecycle:
conception, behavioral specification, behavioral release, behavioral operations,
model update governance, and regulated retirement. The two delivery modes differ
at every layer beyond the inner loop. See [aplc.md](aplc.md).

The manifesto's principles apply fully as the engineering execution engine in
both modes. They are relevant starting points for the outer layers, but those
layers have their own governance requirements, stakeholders, and feedback
mechanisms that this document does not cover.

### What this manifesto does not cover (and where to find it)

**For software delivery (ASDLC):**

- *Upstream (Layer 1):* Business need validation, demand prioritisation, portfolio
  governance, specification readiness. See [Demand & Value](asdlc.md#layer-1).
- *Downstream — delivery (Layer 3):* Release gates, environment promotion,
  change management, compliance documentation. See [release-governance.md](release-governance.md).
- *Downstream — operations (Layer 4):* Incident management, SLO governance,
  security patching, ownership transfer, deprecation. See [operations-governance.md](operations-governance.md).

**For agent product delivery (APLC):**

- *Stage 1 (Conceive):* Agent product brief, trust model design, persona design,
  EU AI Act risk classification. See [agent-conception.md](agent-conception.md).
- *Stage 2 (Specify Behaviorally):* Behavioral envelope at the product level,
  use-case coverage, uncertainty protocol, escalation design. See
  [agent-behavioral-specification.md](agent-behavioral-specification.md).
- *Stages 4–7 (Release through Retire):* Behavioral release gate, composite state
  versioning, behavioral drift governance, model update governance, regulated
  retirement. See [aplc.md](aplc.md).

**Out of scope in all frameworks:**
- Training, fine-tuning, or evaluating foundation models.
- Deploying agents in physical systems, robotics, or non-software operational
  domains.
- Legal advice, compliance determinations, or jurisdiction-specific regulatory
  guidance. Domain pages map principles to frameworks; they are not substitutes
  for qualified regulatory counsel.
- Autonomous weapons systems, or the safety certification of autonomous control
  systems themselves.
- Federated agent networks without a single accountable operator.
- Agent deployment in classified environments.
```

---

## Change 4 — `adoption-path.md`: Add ASDLC Framing Note

**Location:** At the top of the document, after the existing callout block about V-model organisations and before the "Incremental Adoption Path" heading.

**What to add:** A framing note that clarifies the phase transitions described in this document are inner-loop maturity phases (Layer 2 of the ASDLC), not full-lifecycle maturity phases. A team can reach Phase 5 of the inner loop while having immature demand management, absent release governance, or no maintenance model. The outer layers of the ASDLC are orthogonal to inner-loop phase, not sequential.

**Full text to insert:**

```markdown
> **ASDLC context:** The phases and transitions described in this document are
> **Layer 2 maturity phases** — the maturity of the engineering execution loop,
> as defined in the [Agentic Engineering Manifesto](manifesto.md). A team at
> Phase 5 of the inner loop has highly mature engineering execution. That does
> not imply maturity in the demand layer (how well business needs are validated
> before entering the loop), the release layer (how governed the path to
> production is), or the operations layer (how well the team can maintain and
> operate what has been delivered). Those layers have their own maturity
> assessment, covered in the [ASDLC](asdlc.md).
>
> Recommended sequencing: build Phase 3 inner-loop maturity (governed agentic
> delivery in at least one domain) before investing heavily in outer-layer
> governance. A team with no reliable inner loop cannot benefit from improved
> demand management or release governance — those investments require a working
> execution engine to govern. The correct sequence is: prove the inner loop,
> then extend outward.
```

---

## Change 5 — `adoption-roles.md`: Add Demand-Layer Roles Forward Reference

**Location:** At the end of the "How Roles Evolve" section, after the last existing role description (before any organisational or transition guidance).

**What to add:** A forward reference section that acknowledges the roles that are absent from the current document — those operating at Layer 1 (Demand & Value). The current document covers developers, QA engineers, tech leads, architects, and platform engineers — all inner-loop roles. The demand layer requires roles that interface between the business and the loop.

**Full text to insert:**

```markdown
### Demand-Layer Roles

The roles above operate within the engineering execution loop (Layer 2 of the
ASDLC). The ASDLC's demand layer (Layer 1) introduces roles that do not have a
natural home in the current engineering role taxonomy:

**Product Owner (agentic context).** Accountable for specification readiness and
business value definition at the Layer 1→2 boundary. This role differs from the
traditional product owner role in one critical respect: in an agentic context,
the product owner's primary output is a loop-ready specification — not a backlog
of user stories for human engineers. The specification must be machine-readable,
have verifiable acceptance criteria, and pass the specification readiness gate
before entering the loop. The product owner owns the success criterion and the
business-level Definition of Done, distinct from the engineering DoD.

**Business Demand Sponsor.** Accountable for the business need validation that
precedes specification. This role may be a business analyst, a domain expert, or
a senior business stakeholder. Their function is to ensure the need is real
(evidence-backed, not assumed), the value is quantifiable, and the out-of-scope
is explicitly stated before the product owner begins translating the need into a
specification.

**Specification Analyst.** Responsible for the translation from validated business
need to loop-ready specification. In smaller organisations this is often the
product owner; in larger organisations it is a distinct role that understands both
the domain and the manifesto's specification requirements (machine-readable
acceptance criteria, versioned constraints, blast-radius framing).

For the full evolution of these roles through the ASDLC maturity phases, see
[Demand & Value — Roles](asdlc.md#roles).
```

---

## Change 6 — `glossary.md`: Additions (deferred to after ASDLC documents are written)

The following terms should be added to `glossary.md` once the ASDLC documents exist to define them authoritatively. This is the last change to execute.

**ASDLC terms to add** (after ASDLC documents are written):
- **ASDLC** — Agentic Software Delivery Lifecycle. The four-layer framework (Demand & Value, Engineering Execution, Release & Deployment, Operations & Maintenance) that positions the Agentic Engineering Manifesto as its engineering execution layer for software delivery.
- **Loop-ready specification** — A specification that has passed the specification readiness gate and is ready to enter the Agentic Loop's Specify phase. See `specification-readiness.md`.
- **Specification readiness gate** — The ASDLC Layer 1→2 interface: the set of conditions a business need must satisfy before it can enter the Agentic Loop as a specification.
- **Release gate** — The ASDLC Layer 2→3 interface: the conditions a loop output must satisfy before it can enter the release layer for production deployment.
- **Operational readiness gate** — The ASDLC Layer 3→4 interface: the conditions a deployed system must satisfy before it is considered operationally ready.
- **Steward** — The named human accountable for a system's maintenance, long-term health, and eventual deprecation. Distinct from the accountable human at deployment time (P12).
- **Demand backlog** — The managed queue of validated business needs awaiting specification and loop entry. Governed by ASDLC Layer 1.
- **Release DoD** — The ASDLC Layer 3 Definition of Done. Defined in `release-governance.md`.
- **Operational DoD** — The ASDLC Layer 4 Definition of Done. Defined in `operations-dod.md`.
- **Value realisation** — The business-level outcome measured post-deployment against the success criterion defined at the specification readiness gate.

**APLC terms to add** (after APLC documents are written):
- **APLC** — Agentic Product Lifecycle. The seven-stage framework governing agent systems delivered as products: Conceive, Specify Behaviorally, Build & Evaluate, Release, Operate, Maintain, Retire. Positions the manifesto as its engineering execution engine for the Build stage.
- **Agent product** — An agent or agentic system deployed to serve a business purpose directly, where the agent itself is the deliverable (not software produced by agents). Examples: a claims processing agent, a regulatory reporting agent, a customer advisory agent.
- **Agent Product Brief** — The Stage 1 output of the APLC: business purpose, user model, trust architecture, persona design, regulatory classification, and success criteria for an agent product. Defined in `agent-conception.md`.
- **Behavioral specification** — The Stage 2 output of the APLC: the behavioral envelope, use-case coverage map, uncertainty protocol, and escalation design for an agent product. Extends the companion-re-framework vocabulary to the product level.
- **Behavioral baseline** — The measured behavioral profile of a deployed agent, established at release and used to detect drift. Defined in `agent-release-governance.md`.
- **Behavioral drift** — A change in an agent product's behavior over time not caused by an intentional update. May result from foundation model updates, knowledge base changes, memory accumulation, or input distribution shift. Governed by APLC Stage 6.
- **Composite agent state** — The five components that together constitute what an agent "is" at any point in time: application code, system prompt, foundation model version, knowledge base version, and memory state. Relevant to versioning and incident investigation. Defined in `agent-composite-versioning.md`.
- **Foundation model update governance** — The process of detecting, assessing, and accepting or rejecting a foundation model provider update in a deployed agent product. Defined in `agent-maintenance.md`.
- **Agent incident classification** — The five categories of production incidents specific to agent products: quality, behavioral, safety, persona, and adversarial. Defined in `agent-operations.md`.
- **Red-team protocol** — Structured adversarial testing of an agent product's behavioral boundaries: prompt injection, persona break attempts, behavioral envelope probing. A required evaluation practice before release. Defined in `agent-behavioral-evaluation.md`.
- **Trust model** — The design of who can instruct an agent product to do what, at what authority level, and under what conditions. A Stage 1 (Conceive) design decision. Defined in `agent-conception.md`.
- **Behavioral release gate** — The APLC Stage 3→4 interface: the conditions an agent product must satisfy before production release, including behavioral baseline documentation, red-team clearance, and composite state manifest. Defined in `agent-release-governance.md`.

---

## Execution Sequence

These changes can be executed in this order:

1. **Changes 1–3** (`manifesto.md`) — can be done together in one session. Changes 1 and 2 add new sections with no dependencies. Change 3 replaces the scope section and adds forward links to ASDLC documents (use placeholder links that resolve once ASDLC documents exist).

2. **Changes 4–5** (`adoption-path.md`, `adoption-roles.md`) — can be done in parallel with Changes 1–3, or immediately after.

3. **Change 6** (`glossary.md`) — do this last, after both ASDLC and APLC documents are written and canonical definitions are stable. ASDLC terms can be added once ASDLC is written; APLC terms follow when APLC is written.

Total estimated effort: 2–3 focused sessions for Changes 1–5. Change 6 is mechanical once both outer frameworks exist.

---

## Quality Check Before Merging

Before merging these changes, verify:

- [ ] The Specification Readiness Gate section is internally consistent with `specification-readiness.md` once that document exists.
- [ ] The Loop Output Contract section is consistent with the evidence bundle definition in P1 and the DoD.
- [ ] The updated scope section links resolve (all referenced ASDLC documents exist before publishing).
- [ ] The forward references in `adoption-roles.md` resolve to the correct anchors in `asdlc.md`.
- [ ] No existing principle text has been altered.
- [ ] No existing minimum bar has been changed.
- [ ] `glossary.md` additions do not duplicate or contradict existing definitions.
- [ ] APLC terms in the glossary are consistent with definitions in `agent-conception.md`, `agent-behavioral-specification.md`, and `aplc.md`.
- [ ] The two-table scope section (ASDLC table + APLC paragraph) correctly represents each framework's scope without overlap or gap between them.
