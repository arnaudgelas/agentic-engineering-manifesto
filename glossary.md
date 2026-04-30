# Agentic Engineering Manifesto — Glossary

*Canonical definitions for terms used across the manifesto, principles, companion
documents, and domain pages. When a term is used in any manifesto document, it
carries the meaning defined here unless the document explicitly states otherwise.*

See the [Manifesto](manifesto.md) for core values and the Agentic Loop.
See the [Twelve Principles](manifesto-principles.md) for the normative principle
statements.

---

## A

**Agent / Autonomous agent**
A software process or runtime entity that can plan, decompose work, invoke
tools, and produce outputs without step-by-step human instruction. Agents are
treated as system participants with defined scope and governed autonomy, not as
human proxies. Agents operate within autonomy tiers set by human governance.

**Agent incident classification**
The five categories of production incidents specific to agent products: quality,
behavioral, safety, persona, and adversarial. Defined in `agent-operations.md`.

**Agent product**
An agent or agentic system deployed to serve a business purpose directly, where
the agent itself is the deliverable (not software produced by agents). Examples:
a claims processing agent, a regulatory reporting agent, a customer advisory
agent.

**Agent Product Brief**
The Stage 1 output of the APLC: business purpose, user model, trust
architecture, persona design, regulatory classification, and success criteria
for an agent product. Defined in `agent-conception.md`.

**Agentic engineering**
The discipline of architecting environments, constraints, protocols, and feedback
loops in which autonomous agents can safely plan, execute, and verify complex
work under human governance. Distinct from AI engineering (building models),
prompt engineering (crafting inputs), and AI-assisted development (using AI as
autocomplete).

**Agentic loop**
The core feedback cycle: Specify → Design → Plan → Execute → Verify → Validate
→ Observe → Learn → Govern → Repeat. Any phase can trigger a return to an
earlier phase on evidence. See [manifesto.md](manifesto.md#the-agentic-loop) for
the full description and feedback arrows.

**APLC**
Agentic Product Lifecycle. The seven-stage framework governing agent systems
delivered as products: Conceive, Specify Behaviorally, Build & Evaluate,
Release, Operate, Maintain, Retire. Positions the manifesto as its engineering
execution engine for the Build stage.

**ASDLC**
Agentic Software Delivery Lifecycle. The four-layer framework (Demand & Value,
Engineering Execution, Release & Deployment, Operations & Maintenance) that
positions the Agentic Engineering Manifesto as its engineering execution layer
for software delivery.

**Audit trail**
The immutable, tamper-evident record of agent actions, tool calls, and decisions
required for post-incident diagnosis and regulatory compliance. Audit trails are
infrastructure concerns — agents must not have write access to their own audit
trail. See also: *trace*.

**Autonomy tier** One of three levels of authorized agent action:
- **Tier 1 (Observe)** — read-only; output is advisory only; no changes without
  explicit human approval.
- **Tier 2 (Branch)** — agents may act in isolated or sandboxed environments;
  changes require human review before merging or deploying.
- **Tier 3 (Commit)** — agents may act in production or commit directly, with
  verified rollback capability. The domain owner retains accountability for all
Tier 3 actions.  Tier assignment is a governance decision driven by blast
radius, reversibility, and confidence maturity. See [Tier Assignment Decision
Checklist](companion-principles.md#tier-assignment-decision-checklist).

---

## B

**Behavioral baseline**
The measured behavioral profile of a deployed agent, established at release and
used to detect drift. Defined in `agent-release-governance.md`.

**Behavioral drift**
A change in an agent product's behavior over time not caused by an intentional
update. May result from foundation model updates, knowledge base changes, memory
accumulation, or input distribution shift. Governed by APLC Stage 6.

**Behavioral release gate**
The APLC Stage 3→4 interface: the conditions an agent product must satisfy before
production release, including behavioral baseline documentation, red-team
clearance, and composite state manifest. Defined in
`agent-release-governance.md`.

**Behavioral specification**
The Stage 2 output of the APLC: the behavioral envelope, use-case coverage map,
uncertainty protocol, and escalation design for an agent product. Extends the
companion-re-framework vocabulary to the product level.

**Blast radius**
The maximum credible impact if an agent acts incorrectly: scope of data affected,
number of downstream systems or users, reversibility of the harm, and time to
detection. Blast radius is the primary input to tier assignment. It is assessed
per task class, not per agent.

---

## C

**Composite agent state**
The five components that together constitute what an agent "is" at any point in
time: application code, system prompt, foundation model version, knowledge base
version, and memory state. Relevant to versioning and incident investigation.
Defined in `agent-composite-versioning.md`.

**Constraint** (vs. *specification*) A requirement that governs the boundaries
of what the system may do, typically safety, compliance, or architectural in
nature. Constraints require a governed review process to relax; they do not
evolve within an iteration. Contrast with *specification*, which may be refined
as evidence accumulates within an iteration.  See [Specifications vs.
Constraints](companion-principles.md#specifications-vs-constraints).

**Context window**
The bounded working memory visible to a model at inference time: the accumulated
prompt, prior tool call results, retrieved knowledge, and conversation history.
Context windows are a finite resource; context engineering (P7) governs what
enters them and when items are pruned or archived.

---

## D

**Definition of Done (DoD)**
The set of conditions a change must satisfy before it is considered complete.
The agentic DoD requires a change to be: shipped, observable, verified, provable
(when risk requires it), learned from, governed, and economical. The DoD is
phase-calibrated — the bar rises with phase maturity and risk level.
See [manifesto-done.md](manifesto-done.md).

**Demand backlog**
The managed queue of validated business needs awaiting specification and loop
entry. Governed by ASDLC Layer 1.

**Domain boundary**
An enforced architectural perimeter that constrains which agents may access which
data, tools, and services. Domain boundaries are enforced at the infrastructure
layer (not the prompt layer). Violation of a domain boundary by an agent is a
containment failure, not a prompt failure. See *P3 — Architecture*.

**Domain owner**
The named human accountable for a domain's specifications, autonomy tier
assignments, evidence bundles, and outcomes. Every agent-generated change in
a governed domain has a domain owner. The domain owner is not the author of
every artifact — agents generate many — but is the human who cannot disclaim
responsibility for what ships. See *P12 — Accountability*.

---

## E

**Evaluation**
A structured test that verifies agent output against a specified behavior or
property. Evaluations are not the same as unit tests: they include adversarial
cases, behavioral regression coverage, and holdout cases not derived from the
development session. See also: *evaluation portfolio*, *evaluation theater*.

**Evaluation portfolio**
The full collection of evaluations for a given agent capability or specification:
behavioral tests, adversarial cases, holdout cases, and regression coverage.
An evidence bundle attached to a change must include a passing evaluation portfolio.

**Evaluation theater**
Evaluations that pass but do not test what matters: happy-path-only coverage,
no adversarial cases, no holdout separation, or metrics optimized for the
development session rather than production behavior. The primary symptom is
evaluations that pass while production incidents go unpredicted. See
[Detecting Evaluation Theater](companion-principles.md#detecting-evaluation-theater).

**Evidence bundle**
The artifact package attached to a completed change, required for every automated
merge at Phase 3 and above. Minimum contents: passing evaluation results, diff,
trace IDs for the relevant agent session, and policy check outputs. At Phase 4+,
evidence bundles also include formal proof artifacts for critical workflows.

---

## F

**Foundation model update governance**
The process of detecting, assessing, and accepting or rejecting a foundation
model provider update in a deployed agent product. Defined in
`agent-maintenance.md`.

---

## G

**Governance**
The set of human-accountable decisions and review processes that constrain and
direct agent behavior: tier assignment, specification review, evidence bundle
approval, economics review, and policy enforcement. Governance is a behavioral
practice, not a document structure. A governance mechanism that does not change
agent behavior is theater. See *P12 — Accountability*.

---

## K

**Knowledge** (vs. *memory*)
Durable, curated facts about the domain, system, and codebase — persisted in a
knowledge base with provenance and version control. Knowledge captures what is
true and has been verified. Contrast with *learned memory*, which captures
heuristics and patterns inferred from experience that may decay or be wrong.
See *P6 — Knowledge & Memory*.

---

## L

**Learned memory**
Inferred patterns, routing preferences, and reusable heuristics derived from
agent experience and persisted across sessions. Learned memory must carry
provenance metadata, TTLs (expiration), conflict resolution rules, and promotion
criteria to become *skill memory*. Learned memory is probabilistically derived
and may be incorrect; it requires governance to prevent drift.

**Loop-ready specification**
A specification that has passed the specification readiness gate and is ready to
enter the Agentic Loop's Specify phase. See `specification-readiness.md`.

---

## O

**Operational DoD**
The ASDLC Layer 4 Definition of Done. Defined in `operations-dod.md`.

**Operational readiness gate**
The ASDLC Layer 3→4 interface: the conditions a deployed system must satisfy
before it is considered operationally ready.

**Orchestrator**
An agent responsible for decomposing a task, delegating subtasks to specialist
agents, and integrating their outputs. The orchestrator does not necessarily
execute any subtask directly; its role is coordination, sequencing, and
synthesizing results. The tier containment rule applies: an orchestrator cannot
delegate actions that would exceed its own authorized autonomy tier; tier
elevation requires the same approval path regardless of whether the request
originates from a human or an orchestrating agent. This requirement is stated
normatively in P4. See *P4 — Swarm Topology* in
[manifesto-principles.md](manifesto-principles.md).

---

## P

**Phase** (adoption phase)
One of six maturity levels describing an organization's adoption of agentic
engineering, from Phase 1 (first structured agent use) through Phase 6
(recursive self-improvement with full governance infrastructure). Phases are
descriptive, not prescriptive; movement between phases is governed by go/no-go
evidence gates, not calendar schedules.

**Prompt injection**
An adversarial technique in which malicious input causes an agent to override
its instructions or act outside its authorized scope. Prompt injection is a
containment failure vector; the mitigation is infrastructure-level enforcement
of domain boundaries and tool allowlists, not prompt-level defenses alone.

---

## R

**Red-team protocol**
Structured adversarial testing of an agent product's behavioral boundaries:
prompt injection, persona break attempts, behavioral envelope probing. A
required evaluation practice before release. Defined in
`agent-behavioral-evaluation.md`.

**Release DoD**
The ASDLC Layer 3 Definition of Done. Defined in `release-governance.md`.

**Release gate**
The ASDLC Layer 2→3 interface: the conditions a loop output must satisfy before
it can enter the release layer for production deployment.

**Rollback gate**
An infrastructure-enforced checkpoint that requires verified rollback capability
before an action is authorized at Tier 3. A rollback gate confirms that (a) the
action can be undone within a defined time window and (b) the rollback procedure
has been verified against the current system state.

---

## S

**Skill memory**
Reusable, promoted learned memory that has been validated and elevated from
heuristic to documented capability. Skill memory is the output of the Learn phase
at Phase 4+. It is curated, versioned, and governed like knowledge — not discarded
at session end like raw learned memory.

**Specification** (vs. *constraint*)
A description of what the system should do, expressed in a form that is
machine-readable, contains observable success criteria, and can evolve within
an iteration as evidence accumulates. Specifications are the primary input to
the Specify phase and the governing document for the Verify phase. Contrast with
*constraint*, which bounds what the system may do and requires governed review
to change.

**Specification readiness gate**
The ASDLC Layer 1→2 interface: the set of conditions a business need must
satisfy before it can enter the Agentic Loop as a specification.

**Steward**
The named human accountable for a system's maintenance, long-term health, and
eventual deprecation. Distinct from the accountable human at deployment time
(P12).

**Swarm**
An orchestrated collection of multiple agents, each with a bounded scope,
collaborating to complete a task that exceeds a single agent's context or
capability. Swarms require explicit topology (orchestrator/specialist), domain boundary
enforcement between agents, and typed, versioned shared state for coordination.
See *P4 — Swarm Topology*.

---

## T

**Trace**
The structured, machine-readable record of an agent's reasoning and actions
within a session: tool calls made, inputs and outputs, decision points, and
any policy checks invoked. Traces are the primary diagnostic artifact for
post-incident analysis. Contrast with *audit trail*: traces capture agent
reasoning; audit trails capture the tamper-evident event record for compliance.
In practice, traces feed the audit trail — they are not the same artifact.

**Trust model**
The design of who can instruct an agent product to do what, at what authority
level, and under what conditions. A Stage 1 (Conceive) design decision. Defined
in `agent-conception.md`.

---

## V

**Validation** (vs. *verification*)
The check that the built system satisfies real-world need: did we build the
right thing? Validation is the Validate phase of the Agentic Loop. It asks
whether the specification itself was correct, not whether the implementation
matches the specification. An agent can pass every verification check and still
fail validation. See also: *verification*.

**Value realisation**
The business-level outcome measured post-deployment against the success
criterion defined at the specification readiness gate.

**Verification** (vs. *validation*)
The check that the implementation satisfies the specification: did we build it
right? Verification is the Verify phase of the Agentic Loop. It is technical
correctness against a stated contract. Verification is necessary but not
sufficient: passing verification does not mean the specification was worth
satisfying. See also: *validation*.
