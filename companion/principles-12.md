## Principle 12 — Accountability: Extended Guidance


*See Principle 12 in the manifesto for the core statement and minimum bar.*

### Domain-Scoped Ownership

At scale, ownership is domain-scoped, not change-scoped. A named human owns the
risk policy, approval thresholds, and incident response for a bounded domain;
the system enforces those policies per change. Human review must focus on
exceptions, high-risk deltas, and statistically valid sampling, not every
low-risk action.

### The Accountability Paradox

The manifesto states: "Agents execute; humans own outcomes, risks, approvals,
and incidents. No agent — however capable — absorbs legal, ethical, or
operational responsibility." This is the manifesto's strongest claim about the
human role. It is also the claim most certain to break under scale.

If your agents process thousands of actions per day, human review of every
action is not just impractical — it is impossible. A domain owner who
"approves" 200 changes per day is not governing; they are rubber-stamping.
The manifesto's accountability model, applied literally at volume, collapses
into control theater (see [Failure Modes](companion-reference.md#failure-modes-of-this-manifesto)).

This is not a minor gap. It is the central tension of the entire manifesto:
the principles require human accountability, and the economics of agentic
systems at scale make comprehensive human accountability impossible.

### How to Navigate the Paradox

The manifesto does not resolve this tension — it provides the tools to manage
it. The resolution is not "remove the human" or "review everything." It is a
phase-calibrated layering of accountability mechanisms:

**At Tier 1 (Observe):** Agents can only analyze and propose. Human
accountability is inherent because no action reaches production without human
execution. This is fully compatible with the manifesto at any volume.

**At Tier 2 (Branch):** Agents write to isolated environments. Accountability
shifts from reviewing every action to designing the constraints that bound
agent behavior and the evaluations that verify output. The human owns the
constraint design and the evaluation portfolio, not every individual diff.
When an escaped defect occurs, accountability traces to which constraint or
evaluation was missing — not which reviewer missed which line.

**At Tier 3 (Commit):** Agents take production-impacting actions. This is
where the tension is sharpest. The practical approach: automated policy
enforcement handles routine checks at machine speed; human review focuses
on exceptions, high-risk deltas, and statistically valid sampling. The human
is accountable for the policy, the sampling strategy, and the incident
response — not for having personally inspected every action.

In all tiers, build recursive feedback mechanisms: systems evaluate their own
errors, feed failures back into context, and self-correct or automatically
roll back. This is not replacing human accountability — it is extending the
human's reach through system design.

### The Level 5 Challenge: No Human Writes or Reviews Code

The sharpest version of the accountability challenge comes from teams already
operating at what practitioners call "Level 5" or "dark factory" mode:
specifications go in, working software comes out, no human writes or reviews
code. StrongDM's software factory is the most documented example — three
engineers, no code writing, no code review. Humans write specifications and
evaluate outcomes. Machines do everything in between.

This sounds like it contradicts the manifesto's accountability model. It does
not — but it forces the model to its logical conclusion. In a Level 5 system:

- **Accountability shifts from reviewing code to designing constraints.** The
  human owns the specification quality, the evaluation portfolio (including
  holdout scenarios the agent cannot see), and the incident response policy.
  They do not own every line of code — they own the system that produces and
  verifies the code.
- **Evaluation replaces review.** Instead of reading diffs, humans evaluate
  outcomes against behavioral scenarios, probabilistic satisfaction metrics,
  and business impact measures. The evaluation infrastructure *is* the review
  process — it just runs at machine speed rather than human speed.
- **The accountability surface changes, not the accountability principle.**
  A human is still accountable for production behavior. But "accountable"
  means "designed the constraints, approved the evaluation portfolio, and owns
  the incident response" — not "read every line of code."

This is consistent with the manifesto's Tier 3 governance at scale: automated
policy enforcement handles routine verification, human review focuses on
exceptions and high-risk deltas, and accountability traces to constraint design
rather than individual code inspection. Level 5 is what Tier 3 governance looks
like when the constraints, evaluations, and evidence infrastructure are mature
enough to replace line-by-line review entirely.

The manifesto does not prescribe Level 5 as a target. Most teams are not ready
for it — and the perception gap is real: a 2025 study reported that experienced
developers using AI tools took 19% longer to complete tasks while believing AI
made them 24% faster. Teams that believe they are operating at Level 4 or 5 are
often stuck at Level 2, confusing tool adoption with workflow transformation.
The maturity spectrum (Phase 1-6) and the evidence requirements at each phase
exist precisely to prevent this self-assessment inflation.

### The Open Problem

This layered approach is mitigation, not resolution. Oversight saturation at
scale remains an open problem: systems can outgrow meaningful human governance
bandwidth faster than governance practices mature. This is not a caveat buried
in extended guidance — it is a load-bearing limitation of the entire manifesto.

The twelve principles are designed to remain useful at any scale, but the
governance model that binds them (human accountability for production outcomes)
is bounded by human bandwidth. As agentic systems scale toward Phase 6
(adaptive, self-improving), the fraction of system behavior that any human can
meaningfully review approaches zero. The manifesto's answer — governance
through constraints, evaluations, and evidence rather than through direct
oversight — delays this limit but does not eliminate it.

Treat this as the manifesto's most important active frontier. If your
engineers spend all day reviewing agent trace logs, you have replaced coding
with babysitting and the governance model is already failing. If they review
nothing, accountability is fictional. The correct position is somewhere
between, defined by the quality of your constraints, evaluations, and
feedback loops — and it must be re-evaluated as the system grows.

### Governance as Practice — The Domain Owner's Routine

The manifesto describes governance structure: named owners, defined tiers,
evidence bundles, approval gates. Structure is necessary but not sufficient.
A team can have all structural components in place and still have non-functional
governance: domain owners who approve evidence bundles without understanding
them, audit trails no one reads, policy violations detected but not acted upon.
Governance also requires practice — the ongoing behavioral routine by which a
domain owner actually performs governance rather than performs its appearance.

What distinguishes performed governance from simulated governance:

**Understanding what is being approved.** A domain owner performing governance
can answer, without prompting: what changed, why, what could go wrong, and why
the evidence bundle indicates those risks were addressed. If they cannot answer,
they are signing, not governing.

**Acting on anomalies.** When accountability signals degrade — review times
drop, rejection rate trends toward zero — a governing domain owner reduces
autonomy scope for that domain. A domain owner performing governance theater
adds reviewers or frames the problem as a workload issue.

**Reading incidents as policy feedback.** After an incident, the governing
question is: which constraint was missing, which evaluation didn't catch this,
which evidence bundle criterion was insufficient? The non-governing question
is: who approved the change that caused the incident? The first drives
remediation; the second drives blame without improving the system.

**Maintaining calibration.** A domain owner who has not rejected a change in
two months either has extraordinary agents or has stopped governing. Healthy
rejection rates (5–15% of agent-generated PRs) are a calibration signal, not
a ceiling to minimize. Sustained rates below that range should be treated as
a governance degradation signal, not as quality improvement, unless
corroborated by other evidence.

These behaviors are not auditable by structure alone. They require the domain
owner to treat governance as a craft that degrades without practice.

### Governance Health Monitoring

Accountability frameworks can degrade silently. Control theater — humans
nominally accountable but operationally blind — is the most common governance
failure at scale and cannot be detected from the outside. Detect it from the
inside by monitoring the signals that distinguish meaningful review from
rubber-stamping. The
[Rubber-stamping detection table](adoption-metrics.md#team-health-metrics-all-phases)
in the adoption metrics document provides a quantitative baseline: median review
time, PR rejection rate, inline comment density, and rework rate within one
week. These thresholds are operational heuristics, not empirically validated
figures — treat them as starting points calibrated against your own team's
baseline data. The intervention protocol when thresholds breach is to reduce
autonomy scope for that domain, not to add more reviewers.

### Incident Attribution

When incidents occur, accountability is assigned by policy failure mode:
specification error, verification gap, enforcement failure, or operational
override. This avoids circular blame on the final approver and drives targeted
remediation. If trace volume exceeds meaningful human review, raise automation
barriers or reduce autonomy until oversight signal quality is restored.
