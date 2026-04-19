# Adoption Playbook — Resistance, Politics, and Your First Pilot

*Navigating organizational friction and running your first governed pilot.*

Read the [Manifesto](manifesto.md) for the core principles.
See the [Adoption Playbook](adoption-playbook.md) for the full table of contents.
See the [Roles and the Human Side](adoption-roles.md) for the human dimension
of the transition.

---

## Navigating Resistance and Politics

The [Human Side of the Transition](adoption-roles.md#the-human-side-of-the-transition)
covers the emotional and cognitive challenges individuals face. This section
covers the organizational and political friction points that leaders must
navigate.

### The Productivity Dip

Teams will be slower before they're faster. Writing specifications is slower
than writing code — at first. Building evidence gates adds overhead — at
first. Reviewing agent output is harder than reviewing human code — until
traces and evaluations reduce the review burden.

**What to do:** Set expectations explicitly at the start of the transition.
Budget for a 2-4 week productivity dip per domain. Measure the dip so you
can show the recovery. Protect the team from "why is velocity down?" pressure
by communicating the plan to leadership in advance. This is where the
acceleration trap (described in
[The Human Side](adoption-roles.md#the-acceleration-trap)) is most dangerous:
the temptation to skip governance and reclaim velocity is strongest when the
dip is visible to leadership.

### Management That Wants Velocity Metrics

The manifesto explicitly argues that velocity, story points, and lines of
code are the wrong metrics for agentic engineering. But management may still
demand them — especially if the AI investment was justified on productivity
grounds.

**What to do:** Don't fight the productivity narrative. Redirect it. Show
that the *right* productivity metrics (lead time from specification to
verified deployment, escaped defect rate, total cost of correctness per
outcome) capture actual business value, while velocity measures raw output
that may or may not produce value. Frame it as "we're measuring the thing
that matters to the customer, not the thing that looks good on a slide."

### The Cost Conversation

Agentic infrastructure costs money: inference costs, tooling, memory
infrastructure, evaluation pipelines. The investment must be justified before
results are fully proven.

**What to do:** Start with a narrow pilot (Step 1 in the
[adoption path](adoption-path.md#incremental-adoption-path)) where costs are
containable and measurable. Track total cost of correctness from day one, so
you can demonstrate economics improvement as the pilot matures. Frame the
comparison against the true cost of the status quo: escaped defects, incident
remediation, technical debt accruing at machine speed.

### Incentive Misalignment

If developers are still measured on lines of code, PRs merged, or tickets
closed, the manifesto's values will lose to the incentive structure every
time. Incentives that reward output volume punish the careful specification,
verification, and governance the manifesto requires.

**What to do:** Align incentives with outcomes, not output. Reward: defect-
free deployments, specification quality (measured by agent first-pass success
rate), evaluation coverage, and incident prevention. These are harder to
measure than "PRs merged" but they measure what actually matters.

---

## How to Run Your First Pilot

This pilot is designed to take your team from Phase 3 (agents executing
autonomously without governance) to Phase 4 (governed delivery with evidence
bundles and autonomy tiers). It maps to Steps 1-3 of the
[Incremental Adoption Path](adoption-path.md#incremental-adoption-path). Do
not attempt this pilot until your team has worked through Phase 2→3: agents
are executing whole tasks, your team has documented initial failure patterns,
and engineers are writing specifications with acceptance criteria (even if
informally).

### Selecting the Pilot Domain

Choose a domain that is:
- **Bounded:** Clear inputs, outputs, and domain boundaries. You should be
  able to define what agents may and must not do without ambiguity.
- **Low-to-medium risk:** Not your most critical production path. A failure
  should be recoverable without customer impact.
- **Well-tested:** Existing test coverage provides a baseline for evaluating
  agent output quality.
- **Owned by a willing team:** The team should be curious, not coerced.
  Forced adoption produces compliance, not learning.

Good pilot domains: internal tools, test infrastructure, documentation
generation, non-critical API endpoints, CI/CD pipeline improvements.

Bad pilot domains: payment processing, authentication, customer-facing decisions
with legal or financial impact, and other high-blast-radius or controlled-data
workflows — these are Step 5, not Step 1.

### Pilot Structure

**Duration:** 6-8 weeks minimum. Shorter pilots don't generate enough
evidence to distinguish signal from noise.

**Team size:** 3-5 engineers from the pilot domain, plus one operations
engineer and one QA engineer. Small enough to iterate fast; large enough to
test real workflows.

**Scope:** One domain, Tier 1 autonomy (agents analyze and propose), with
evidence bundles required for every merged change.

**Tooling investment:** Minimal. Use existing CI/CD with added evidence
gates. Do not invest in specialized agent platforms before validating the
workflow.

### Pilot Success Criteria

The pilot succeeds if:
- Escaped defect rate for agent-generated changes is equal to or lower than
  the domain's historical baseline
- Engineers can produce evidence bundles without unsustainable overhead
  (measure time per bundle)
- The team can articulate what worked, what didn't, and what they'd change
  for the next domain
- At least one specification was refined based on execution evidence
  (demonstrating the Agentic Loop in practice)

The pilot fails if:
- Governance overhead exceeds the value of agent output (teams spend more
  time on evidence than the agent saves on implementation)
- Escaped defect rate increases
- Team burnout indicators appear (review rubber-stamping, evidence bundle
  quality declining over time)

### After the Pilot

Document findings as a case study: what worked, what broke, what you'd change.
Use the case study to inform the next domain's adoption. Do not generalize
from one pilot — each domain has different failure surfaces.
