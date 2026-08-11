## Principle 2 — Specifications: Extended Guidance


*See Principle 2 in the manifesto for the core statement and minimum bar.*

### Contract-First Agentic Development

In practice, this can include contract-first agentic development: agents propose
both implementation and machine-checkable contracts (preconditions,
postconditions, invariants), then iterate in a tight loop: specify, implement,
attempt to prove, fail, refine, repeat. Proof failure is not a blocker to hide;
it is a steering signal.

### Specifications as Agent-Consumable Artifacts

The specification-as-living-artifact pattern now has concrete implementations.
Agent Skills (SKILL.md files — structured metadata plus step-by-step
instructions that agents consume at runtime) and AGENTS.md (repository-level
machine-readable constraints) are increasingly supported across several IDEs and coding
agents. Both formats validate the core P2 claim: specifications that agents can
parse directly reduce ambiguity, improve adherence, and make convergence
measurable. Skills define *what* an agent can do; AGENTS.md defines *how* it
must behave within a codebase. Together with agent-to-tool protocols (which
define *how* agents connect to external capabilities), they form the
specification layer of the emerging standards stack.

### The Specification-Driven Development Movement

The specification-first pattern is not just an architectural recommendation — it
is converging as the dominant practitioner workflow. A wave of open-source
specification-driven development (SDD) frameworks has emerged, all built on the
same thesis P2 advocates: write the spec before the agent writes the code.
The pattern across these frameworks is consistent: specifications are treated as
code artifacts, baked into workflows, and consumed by agents before
implementation begins — whether through specify-plan-implement pipelines,
state-machine-governed iteration, or composable skill-driven workflows. This
validates P2's core claim at practitioner scale. See
[Sources](beyond-agile-sources.md) for specific framework references.

### Convergence Criteria

Specification evolution needs convergence criteria. Treat a specification as
converging when acceptance criteria remain stable across successive iterations,
scope narrows rather than expands, and incident classes trend downward. If each
loop adds ambiguity or expanding goals without quality improvement, treat it as
scope drift and reset the boundary.

### Validation vs. Verification

Evaluations (Principle 8) and evidence bundles (Principle 1) answer the
verification question: *did we build it right?* They confirm the implementation
matches the specification. But verification alone has a blind spot: **you can
pass every check and still ship the wrong thing, just faster.**

Validation answers a different question: *did we build the right thing?* Does
the specification itself make business sense? Is the work scoped correctly?
Will real users get value from it? Agents make the validation gap more
dangerous because they can generate feature-shaped output quickly — complete
with passing tests, clean architecture, and a full evidence bundle — while the
underlying specification was never worth implementing.

The Agentic Loop addresses validation explicitly through the Validate →
Observe → Learn → Govern cycle: after verification confirms technical
correctness, validation checks fitness for real-world use; runtime behavior,
usage data, and business outcomes then feed back into specification revision.
But this only works if teams treat Validate as a distinct discipline from
Verify, not just a technical monitoring step. Concretely:

- **Frame the work in context before specifying.** Is this a proof of concept,
  a minimum viable feature, or a production commitment? Define "good enough"
  for each context and make the underlying business assumptions explicit. An
  agent cannot validate its own specification against business reality — that
  is a human judgment that must happen before the Loop begins.
- **Define stop criteria, not just acceptance criteria.** Acceptance criteria
  tell the agent when the implementation is correct. Stop criteria tell the
  team when to abandon or pivot the specification itself — when usage data,
  customer feedback, or market evidence shows the spec was wrong regardless of
  implementation quality.
- **Connect evaluation results to business outcomes.** If escaped defect rate
  is low but adoption, usage, or customer satisfaction metrics don't improve,
  the verification machinery is working but the validation loop is broken.

This is not a new idea — it is the core of Agile's "customer collaboration"
value, and it survives unchanged into agentic engineering. What changes is that
agents amplify the failure mode: without explicit validation loops, a team can
ship more verified-but-wrong features in a month than a human team could in a
quarter.

### Requirements Engineering for Agentic Systems

Traditional RE was designed for deterministic systems. Agentic and hybrid
systems require an extended framework. The key extensions are covered in
`companion-re-framework.md`. The three most important for specification work:

**Two-axes classification.** Every requirements artifact sits on two axes:
(1) system type — deterministic, agentic, or hybrid; and (2) artifact consumer
— human, agent, or hybrid. The cell your requirement occupies determines the
correct format and verification approach. Probabilistic assurance targets
replace binary pass/fail requirements for agentic components. Agent-consumable
specifications must be unambiguous to a machine — contextual inference is
unreliable.

**Behavioral envelopes.** For agentic components, the primary specification
artifact is a behavioral envelope — the boundary the system must stay within —
not a list of enumerated acceptable outputs. The envelope's Layer 1 hard
boundaries must be enforced by infrastructure policy, not prompt instruction.
The performance envelope generates the evaluation suite directly.

**Single-source principle.** When a specification serves both human and agent
consumers, one canonical document must be the source of truth. All other
representations — governance prose, machine-readable encoding, evaluation
criteria, compliance mapping — are derived projections. Independent authoring
of separate documents is a divergence schedule.

See `companion-re-framework.md` for the full framework: two-axes matrix, hard
requirements vs. probabilistic assurance targets, behavioral envelope structure,
tiered lifecycle, per-requirement checklist, and academic references
(arXiv:2602.22302, arXiv:2503.18666, NIST AI 600-1, ISO/IEC 5338).

### The Architect Pattern: Agent-Generated Specifications

The manifesto treats specification steering as a human-governed activity. But
emerging evidence shows that specification generation itself can be an agent
capability — and that the quality of this capability is the primary
differentiator in long-term maintainability.

The **Architect–Programmer** pattern separates these concerns explicitly: an
Architect agent observes system behavior (test results, CI feedback, runtime
metrics), diagnoses root causes, and generates machine-readable requirements.
A Programmer agent implements those requirements. The cycle repeats: the
Architect observes the results, refines the specification, and the Programmer
iterates.

This pattern is a concrete instantiation of the Agentic Loop's Observe → Learn
→ Specify cycle, and it mirrors the Architect–Programmer harness that SWE-CI
(arXiv:2603.03823v1) uses to *evaluate* agents across 100 tasks spanning an
average of 233 days and 71 commits of real-world development history. SWE-CI
does not isolate the Architect's specification quality as a variable, so it is
not evidence that this ability is the primary differentiator in long-term code
maintainability — only that most evaluated models achieve zero-regression rates
below 0.25 on the task overall. The three-step Architect protocol — Summarize
(review failures), Locate (attribute to deficiencies), Design (produce
requirements) — is drawn from SWE-CI's harness design and maps directly to the
manifesto's convergence criteria: specifications that sharpen as evidence
accumulates.

**When to use this pattern:** Long-running maintenance tasks where the
specification must evolve across many iterations. For bounded, short-horizon
tasks, a single agent with a clear specification may be more efficient (see
Principle 4 guidance on topology choices). The Architect pattern is not a
universal requirement — it is a validated topology for sustained evolution.

**The governance implication:** When specifications are agent-generated, the
human role shifts from writing specifications to governing specification quality.
The human defines the acceptance criteria for the Architect's output — what
constitutes a valid requirement — and reviews the Architect's decisions at a
cadence appropriate to the risk tier. The specification is still a governed
artifact; the governance mechanism changes.

### Specifications vs. Constraints

Specifications and architectural constraints (Principle 3) operate at different
layers and change at different speeds. Constraints are invariants — security
policies, domain ownership boundaries, data integrity rules — that hold across
specification iterations. Specifications are goals and acceptance criteria that
evolve within those invariants.

In practice, this means: an agent can propose a revised acceptance criterion
without governance overhead, but proposing a relaxed constraint triggers a
governed review (ADR update, policy approval, impact assessment). If your system
cannot distinguish these two change types, specification iteration will
silently erode your architectural boundaries.

---
