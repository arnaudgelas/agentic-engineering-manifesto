# Adoption Playbook — Roles and the Human Side

*How roles evolve and how to manage the human dimension of the transition.*

Read the [Manifesto](manifesto.md) for the core principles.
See the [Adoption Playbook](adoption-playbook.md) for the full table of contents.
See the [Adoption Path](adoption-path.md) for incremental steps and phase
transitions.

---

## How Roles Evolve

The transition from writing code to steering agents changes what each role owns
day-to-day. This is not a minor adjustment. It is a fundamental shift in
professional identity that must be named, supported, and managed — not imposed
silently.

These role descriptions show the full trajectory from current state to Phase 5
(Agentic Engineering). The shift is progressive — no one wakes up in the end
state. At Phase 2, developers still write most code; at Phase 3, they begin
delegating and reviewing; at Phase 4, specifications and evidence become the
primary work product. Read these as a direction of travel, not a before/after
switch.

### Developers

**Before (Phase 1-2):** Own code quality through implementation. Write
features, fix bugs, review peers' code. At Phase 2, AI assists with
suggestions and completions, but the developer remains the author.
Professional identity is rooted in craftsmanship — the ability to think
through a problem and express a solution precisely in code.

**Transition (Phase 3-4):** Begin delegating bounded tasks to agents. Write
informal specifications with acceptance criteria. Review agent-generated
output — initially every line, increasingly by evaluating evidence bundles
as evaluation suites mature. Still write code directly for complex or
ambiguous work where specification would cost more than implementation.

**After (Phase 5):** Own specification quality, constraint encoding, and
outcome acceptance. Write machine-readable acceptance criteria and
constraints. Review agent-generated diffs against specifications. Accept or
reject outcomes based on evidence bundles. The core skill shifts from writing
code to expressing intent precisely enough that agents can execute it, then
refining intent based on evidence.

**What this means in practice:** The shift is gradual. At Phase 3, a
developer might spend 70% of their time writing code and 30% reviewing agent
output. By Phase 4, that ratio inverts for routine work. By Phase 5, the
primary work product is the specification and the evaluation — implementation
is delegated. But even at Phase 5, developers still read, understand, and
occasionally write code. The skill doesn't disappear; it becomes the
foundation for a harder skill.

**The identity challenge:** Many engineers became engineers because they love
writing code. The shift to steering agents can feel like being told the skill
they spent years mastering is suddenly less important. This is not imaginary —
it is a real loss of craftsmanship that leaders must acknowledge. The new role
is not lesser; it requires different and often harder skills (system-level
reasoning, precise specification, critical evaluation of code you didn't
write). But the transition needs support, not just announcement.

### Tech Leads

**Before:** Own architectural decisions, code review standards, and technical
direction. Mentor junior engineers through code review and design discussions.

**After:** Own domain boundaries, decision records, topology choices, and
conflict-resolution rules. Design constraints that keep multi-agent
collaboration reliable under load. The core skill shifts from reviewing
individual code quality to designing system-level governance.

**What this means in practice:** Tech leads spend less time in code review and
more time in constraint engineering: defining what agents may and must not do,
choosing swarm topologies, and designing the evaluation portfolios that verify
agent output at scale.

### QA Engineers

**Before:** Own test plans, manual testing, and test automation. Verify that
code behaves as specified through structured test execution.

**After:** Own evaluation portfolios, adversarial coverage, formal-invariant
checks where needed, and evidence gates. The core skill shifts from executing
tests to defining the contract between intent and behavior in
machine-verifiable terms.

**What this means in practice:** QA engineers become the architects of the
verification pyramid. They design evaluation suites that agents run
autonomously, define adversarial test cases that probe agent behavior under
stress, and set the evidence thresholds that gate promotion of changes from
branch to production.

### Operations Engineers

**Before:** Own deployment pipelines, monitoring, incident response, and
infrastructure reliability.

**After:** Own behavioral observability, cost routing, memory governance,
runtime safety, and chaos drills. The core skill shifts from keeping
infrastructure running to keeping the feedback loop honest under real-world
conditions.

**What this means in practice:** Operations engineers own a new category of
infrastructure: agent runtime, memory stores, retrieval systems, and routing
layers. They monitor not just uptime but behavioral drift, cost anomalies,
and evaluation regression. Incident response expands to include agent-specific
failure patterns (hallucination loops, memory poisoning, tier violations).

---

## The Human Side of the Transition

Adopting agentic engineering is not purely a technical change. It is an
organizational transformation that directly affects people's professional
identity, daily work, and career trajectory. Ignoring the human dimension is
how organizations lose their best engineers during the transition.

### Naming the Loss

The shift from writing code to steering agents involves a genuine loss of
craftsmanship for many engineers. AI made producing code easier and made being
an engineer harder — and both things are true simultaneously. Engineers who
raised concerns about this shift have too often been told, explicitly or
implicitly, to "just adapt faster."

That is not how you build a sustainable engineering culture. Leaders must
acknowledge that the transition asks people to redefine what they do and who
they are professionally. This acknowledgment is not a sign of weakness — it is
a prerequisite for maintaining a team that trusts you enough to follow you
through the change.

### The Supervision Paradox

Reviewing AI-generated code is often harder than writing code yourself. When
you write code, you carry the context of every decision. When AI writes code,
you inherit output without reasoning. You see the code but not the decisions
behind it. This is why the manifesto insists on traces that capture reasoning,
not just events (Principle 9). But leaders must also recognize that the
cognitive load of reviewing agent output at volume is a new kind of burden that
doesn't appear in productivity metrics.

If your engineers spend their days as judges on an assembly line, stamping
pull requests that never stop coming, production volume went up but the sense
of craftsmanship went down. That is not a morale problem to be managed. It is
a workflow design problem to be solved — through better specifications
(reducing the need for review), better evaluations (automating the reviewable
parts), and better traces (making the non-automatable review faster).

### The Acceleration Trap

AI makes certain tasks faster. Faster tasks create the perception of more
available capacity. More perceived capacity leads to more work being assigned.
More work leads to more AI reliance. More AI reliance leads to more code that
needs review, more context to maintain, more systems to understand, and more
cognitive load on engineers already stretched thin.

This cycle — what researchers have called "workload creep" — is self-
reinforcing. It looks like productivity from the outside (velocity charts go
up, more PRs merged, more features shipped) while quality quietly erodes,
technical debt accumulates, and the people doing the work run on fumes.

The **perception gap** makes the trap invisible from inside. A rigorous 2025
study found that experienced developers using AI tools took 19% longer to
complete tasks than developers working without them — while believing AI made
them 24% faster. They were wrong not just about the magnitude but about the
direction of the change. This perception gap is where the acceleration trap
becomes self-reinforcing: teams believe they have more capacity, take on more
work, and never measure whether the capacity was real. When the J-curve adoption
dip arrives — productivity declining before improving as new workflows mature —
teams that have already overcommitted have no slack to absorb the dip.

The corrective: set explicit throughput limits per engineer that account for
the full cycle (specification + agent execution + verification + review), not
just the implementation phase. Measure outcomes (defect rate, incident
severity, customer impact) alongside output volume. When output goes up and
outcomes don't improve, the acceleration trap has closed.

### Sustainable Pace

The manifesto optimizes for correctness, governance, and economics. But
governance that burns out the humans governing it is self-defeating. Sustainable
pace is not a nice-to-have — it is a precondition for the human accountability
that the entire manifesto depends on.

Track team health alongside system health. Burnout indicators (review latency
spikes, approval rubber-stamping, rising escaped defect rates) are system
health signals — they indicate that the human layer of governance is degrading.
When these signals appear, the correct response is to reduce autonomy scope or
simplify governance, not to push harder.

### Protecting the Junior Pipeline

If junior engineers traditionally learned by doing routine work — fixing small
bugs, writing straightforward features, implementing well-defined tickets —
and agents now handle that work, the training ground is disappearing.

This is not just a concern for individual careers. It is a systemic risk: if
junior engineers never develop foundational skills through hands-on work, the
industry will face a shortage of senior engineers who truly understand the
systems they oversee. You cannot supervise what you never learned to build.

Concrete actions:
- Dedicate a portion of agent-suitable work to junior engineers as learning
  tasks, even when an agent could do it faster. The efficiency cost is an
  investment in the talent pipeline.
- Use agent output as teaching material: juniors review agent-generated code,
  identify weaknesses, and write the evaluations that catch those weaknesses.
  This builds judgment faster than writing boilerplate ever did.
- Pair junior engineers with agents rather than replacing their work with
  agents. The junior specifies, the agent implements, the junior evaluates.
  This builds specification and evaluation skills from day one.
- Create structured progression paths that move juniors from "evaluating
  agent output" to "designing specifications" to "architecting constraints"
  — making the skill development explicit rather than hoping it happens
  through osmosis.
