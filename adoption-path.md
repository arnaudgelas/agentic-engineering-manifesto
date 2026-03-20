# Adoption Playbook — Adoption Path and Phase Transitions

*The technical infrastructure for governed delivery and organizational change
guidance for every phase transition.*

Read the [Manifesto](manifesto.md) for the core principles.
See the [Adoption Playbook](adoption-playbook.md) for the full table of contents.
See the [Roles and the Human Side](adoption-roles.md) for how roles evolve
during the transition.

> **For V-model organizations:** If your organization operates a traditional
> V-model SDLC (common in life sciences, medtech, aerospace, automotive, and
> regulated financial services), see [adoption-vmodel.md](adoption-vmodel.md)
> for a V-model-specific variant of this adoption path that preserves your
> existing verification structure while transitioning to agentic execution.

---

## Incremental Adoption Path

This section describes the technical infrastructure you build to support
governed agentic delivery. It assumes your team is at or approaching Phase 3
(agents executing autonomously) and wants to reach Phase 4 and beyond. If you
are at Phase 1 or 2, start with the
[Phase Transitions](#organizational-change-by-phase-transition) section below
— it covers the organizational changes needed before this infrastructure
makes sense.

The seven steps below roughly map to the Phase 3→4 transition (Steps 1–3), the
Phase 4→5 transition (Steps 4–6), and ongoing expansion (Step 7). Each step
is described at the level of what you actually need to do — not just what the
target state looks like.

### Step 1: Define Domain Boundaries and Autonomy Tiers

**What to do:** Map your codebase into domains with clear ownership. For each
domain, define what agents may do (Tier 1: analyze and propose; Tier 2: write
to branches; Tier 3: production actions) and what they must not do. Encode
these as infrastructure-level permissions, not prompt instructions.

**Who leads:** Tech leads, with input from security and operations.

**Minimum viable version:** Start with one domain. Define Tier 1 only (agents
can analyze and propose, zero blast radius). This is safe, reversible, and
immediately useful as a learning exercise.

**Timeline:** 2-4 weeks for initial domain mapping. Ongoing refinement.

**Success signal:** You can answer "what is this agent allowed to do in this
domain?" for every active agent, and the infrastructure enforces the answer.

### Step 2: Require Evidence Bundles for Every Merged Change

**What to do:** Define the minimum evidence bundle for your current phase
(Phase 3: tests, diff, trace link, rollback note). Integrate evidence
collection into your CI/CD pipeline so it's automatic, not manual.

**Who leads:** QA engineers and CI/CD owners.

**Minimum viable version:** Require a diff, a test report, and a rollback
command for every agent-generated PR. Block merge without these. This adds
minutes per PR, not hours.

**Timeline:** 1-2 weeks to configure CI gates. 1-2 sprints to normalize.

**Success signal:** No agent-generated change merges without an evidence
bundle. Engineers stop saying "the agent said it worked" and start pointing
at evidence.

### Step 3: Add Regression Gates Before Expanding Autonomy

**What to do:** Build a regression evaluation suite for each domain where
agents operate. Every agent-generated change must preserve or improve
evaluation performance. Failed evaluations block merge.

**Who leads:** QA engineers, with domain expertise from developers.

**Minimum viable version:** Start with existing tests. Add behavioral
regression tests for the most common agent failure patterns in your domain.
Ten well-chosen regression cases are more valuable than a hundred
boilerplate tests.

**Timeline:** 2-4 weeks for initial suite. Continuous expansion.

**Success signal:** Escaped defect rate for agent-generated changes is equal
to or lower than for human-generated changes.

### Step 4: Add Adversarial and Security Evaluations on Exposed Surfaces

**What to do:** For any agent-generated code that touches external-facing
surfaces (APIs, user interfaces, data pipelines), add adversarial test cases:
injection attacks, malformed inputs, edge cases, authorization bypasses.

**Who leads:** Security engineers and QA.

**Timeline:** 2-4 weeks per exposed surface.

**Success signal:** No agent-generated change reaches an external surface
without adversarial evaluation coverage.

### Step 5: Establish Durable Coordination State

**What to do:** Before expanding to multi-agent topologies or long-running
agent tasks, build the coordination substrate that prevents duplicate work,
orphaned tasks, and post-restart divergence. The minimum infrastructure:

- **Work ledgers**: A single source of truth for what tasks are active, claimed,
  completed, or abandoned. Without this, concurrent agents duplicate effort or
  leave work silently unfinished.
- **Lease-based task ownership**: Agents claim tasks with time-bounded leases.
  If an agent crashes or stalls, the lease expires and the task becomes
  available for reassignment. Without leases, orphaned tasks accumulate
  silently.
- **Restart-safe handoffs**: Agent state must survive restarts. If an agent
  is interrupted mid-task, the next agent (or the same agent after restart)
  must be able to resume from a well-defined checkpoint rather than starting
  over. Design for replay safety: re-executing a handoff must produce the same
  result, not duplicate side effects.

**Who leads:** Platform/infrastructure engineers.

**Minimum viable version:** A shared task ledger with lease expiration for one
multi-agent workflow. This can be as simple as a database table with claim
timestamps and TTLs.

**Timeline:** 2–4 weeks for initial ledger. Ongoing refinement as topologies
expand.

**Success signal:** No orphaned tasks after agent crashes. No duplicate work
across concurrent agents. Restart produces resumption, not repetition.

### Step 6: Pilot Formal Contracts on One High-Blast-Radius Path

**What to do:** Select one critical path (e.g., payment processing, data
integrity constraint, authentication flow) and add machine-checkable contracts
(preconditions, postconditions, invariants). This is not full formal
verification — it is contract-first development on a narrow scope.

**Who leads:** Senior engineers with architecture responsibility. May require
external expertise in formal methods — see the
[Skill Requirements table](companion-reference.md#skill-requirements-by-principle)
in the Companion Guide.

**Timeline:** 4-8 weeks for initial pilot.

**Success signal:** The contracted path has zero escaped defects from
contract-violating changes over the pilot period.

### Step 7: Expand Only When Incident Rate and Economics Improve

**What to do:** Before expanding agent autonomy (promoting from Tier 1 to
Tier 2, or from one domain to multiple domains), verify that the current scope
is working: incident rate is flat or declining, total cost of correctness is
acceptable, and governance overhead is sustainable.

**Who leads:** Engineering leadership with input from operations and finance.

**Expansion criteria:** Incident rate stable or improving for two consecutive
quarters. Total cost of correctness declining per outcome. Human oversight
load (reviews per domain owner) is sustainable.

---

## Organizational Change by Phase Transition

The manifesto defines six maturity phases. The
[Companion Guide](companion-frameworks.md#the-agentic-maturity-spectrum) provides
full definitions and failure modes for each. Here is a summary for reference:

- **Phase 1 — Guided Exploration.** Single prompts, no structure, no memory.
- **Phase 2 — Assisted Delivery.** AI as autocomplete; humans execute.
- **Phase 3 — Agentic Prototyping.** Agents execute within a single session;
  limited verification.
- **Phase 4 — Agentic Delivery.** Basic guardrails: autonomy tiers,
  evaluation gates, persistent memory. Single-domain.
- **Phase 5 — Agentic Engineering.** Structured autonomy at scale.
  Multi-domain, evidence-driven, continuous Agentic Loop.
- **Phase 6 — Adaptive Systems.** Self-improving infrastructure within
  governed boundaries. Frontier capabilities required.

Each transition below describes what changes organizationally, what actions
to take, and what makes the transition hard.

### Phase 1 → 2: From Exploration to Assisted Delivery

**What changes:** You move from unstructured experimentation ("let's see what
ChatGPT can do") to repeatable AI-assisted workflows where humans remain in
the loop for every action. Agents go from novelty to daily tool.

This transition matters to the manifesto because it builds the foundation for
two things that every later phase depends on: the habit of evaluating AI
output critically (the seed of Principle 8 — Evaluations), and the
organizational muscle of defining what tools may and must not do (the seed of
Principle 5 — Autonomy). Teams that skip Phase 2 arrive at Phase 3 with no
discipline around either, and Phase 3 is where the consequences start
compounding.

**Organizational actions:**
- Identify the tasks where AI assistance delivers consistent value (code
  completion, test generation, documentation drafting) and standardize
  tooling around them
- Establish basic usage guidelines: what models are approved, what data may
  be shared with them, what outputs require human review before use
- Begin measuring where AI assistance actually saves time versus where it
  creates rework — intuition is unreliable here; this is your first
  encounter with the economics principle (Principle 11) at the simplest
  possible scale
- Run a lightweight retrospective: which experiments from Phase 1 produced
  real value, and which were demos that impressed but didn't stick?

**The hard part:** The organizational challenge is not technical — it is
cultural. Phase 1 generates enthusiasm and a sense of possibility. Phase 2
demands that you kill the experiments that felt exciting but don't produce
repeatable value. Teams that skip this curation step carry forward a scattered
toolset of one-off prompts and ad-hoc workflows that no one else can
reproduce. Worse, they develop a false confidence that "we're already doing
AI" which becomes a barrier to the deeper changes Phase 3 requires. This is
primarily a curation and standardization exercise, not a technical build.

### Phase 2 → 3: From Assisted Delivery to Agentic Prototyping

**What changes:** You move from AI-as-autocomplete (human executes, AI
suggests) to agents that execute autonomously within a single session. The
human stops typing every line and starts delegating whole tasks. This is the
moment the team realizes prompting is not engineering.

**Organizational actions:**
- Select 2-3 bounded tasks where agents can execute end-to-end within a
  session (e.g., generate a module from a spec, write a test suite for an
  existing component, refactor a file according to a style guide)
- Require human review of every agent-generated output before merge — no
  exceptions. At this phase, the agent has no memory, no verification
  pipeline, and no guardrails beyond the prompt
- Begin documenting failure patterns: where agents hallucinate, where they
  miss edge cases, where they produce plausible-looking code that fails
  silently. This documentation becomes the seed for your evaluation suite
  in Phase 4
- Start writing specifications with explicit acceptance criteria, even if
  informally. The habit of defining "what does done look like" before the
  agent starts is the single most important skill for everything that follows

**The hard part:** The supervision paradox hits here for the first time.
Reviewing agent-generated code is harder than writing it yourself — you
inherit output without context. Teams that don't acknowledge this will either
rubber-stamp agent output (creating quality risk) or reject the workflow
entirely (losing the productivity gain). Neither is acceptable. The answer is
better specifications and the beginning of structured evaluation, which is
exactly what Phase 4 formalizes. Expect this transition to take longer than
Phase 1→2 — your team is moving from "AI suggests, I decide" to "AI
executes, I verify," and learning to verify well takes practice.

### Phase 3 → 4: Governed Delivery Foundation

**What changes:** You move from "agents do things and we hope they work" to
"agents do things within defined boundaries with evidence."

**Organizational actions:**
- Add CI/CD evidence and policy gates
- Assign domain owners and escalation rotations
- Standardize incident classification and rollback drills
- Begin tracking evidence bundle completeness and escaped defect rate

**The hard part:** Convincing teams that the evidence overhead is worth it
when they're already shipping faster than ever. The acceleration trap makes
governance feel like a brake. Frame it as insurance, not bureaucracy: the
evidence bundle is what lets you expand autonomy later. Without it, you're
stuck at Phase 3 forever. Start with a single domain; parallel rollout across
domains is possible but increases coordination overhead.

### Phase 4 → 5: Engineering-Scale Transition

**What changes:** You move from single-domain, reactive governance to
multi-domain, evidence-driven engineering. This is the hardest transition
because it requires organizational change, not just tooling.

**Organizational actions:**
- Establish shared evaluation registry and trace standards
- Create platform ownership for agent runtime, routing, and memory governance
- Formalize security reviews for tools, connectors, and shared state
- Invest in the "Rare" skills identified in the Companion Guide's
  [Skill Requirements table](companion-reference.md#skill-requirements-by-principle):
  distributed systems design, memory governance, ML/retrieval engineering,
  chaos engineering

**The hard part:** This transition often requires new roles or
responsibilities that don't exist in the current org chart. "Platform
ownership for agent runtime" is not something most organizations have. You
are creating infrastructure categories, not just adopting tools. This is not
a sprint goal — it is an organizational redesign that unfolds over multiple
quarters.

### Phase 5 → 6: Adaptive Frontier

**What changes:** Systems begin improving themselves within governed
boundaries. This is a frontier — not all organizations need to reach Phase 6,
and the capabilities required (formal verification, causal reasoning, provable
containment) are still maturing.

**Organizational actions:**
- Require governance for self-updating specifications and routing policies
- Maintain independent audit paths for high-impact domains
- Treat formal methods expertise as targeted specialization, not universal role

**The hard part:** Knowing when you're ready. Phase 6 without Phase 5's
discipline is how you get self-improvement without containment — the system
optimizes the metric, not the goal. Do not attempt Phase 6 until Phase 5 is
stable across all critical domains.
