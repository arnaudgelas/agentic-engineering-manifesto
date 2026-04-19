# The Agentic Engineering Manifesto — Twelve Principles

*The engineering principles that operationalize the six values.*

See the [Manifesto](manifesto.md) for the core values and the Agentic Loop.
See the [Definition of Done](manifesto-done.md) for what "done" means.

**Values-to-principles mapping.** The manifesto claims these twelve principles
operationalize the six values. The correspondence:

| Value | Principles |
|---|---|
| Iterative steering and alignment | 1 — Outcomes, 2 — Specifications |
| Verified outcomes with auditable evidence | 8 — Evaluations, 12 — Accountability |
| Right-sized agent collaboration | 3 — Architecture, 4 — Swarm, 5 — Autonomy tiers |
| Curated, high-signal context and memory | 6 — Knowledge/memory, 7 — Context |
| Tooling, telemetry, and observability | 9 — Observability |
| Resilience under stress | 10 — Containment, 11 — Economics |

**Sequencing matters.** These principles are not independent. Prerequisites:
Principle 2 (specifications) before Principle 8 (evaluations); Principle 3
(architecture) before Principle 5 (autonomy tiers); Principle 6
(knowledge/memory) before Principle 7 (context); Principle 9 (observability)
before Principle 12 (accountability). The
[Incremental Adoption Path](adoption-path.md) gives the recommended
implementation order.

---

### 1. Outcomes are the unit of work

Progress is measured by the cycle **Outcome → Evidence → Learning** — not by
tokens generated, tasks dispatched, or agents spawned. An agent that says "done"
has proven nothing. A change is done only when it is shipped, observable,
verified, validated, and learned from.

Four distinct claims must hold before "done" is true:

**Evaluation** is the contract that defines correctness. Evaluations are
versioned, machine-readable, and coupled to the specification. They define what
"correct" means in terms the system can check autonomously.

**Verification** is the act of running evaluations to confirm the implementation
matches the specification. Verification answers: *did we build it right?* It
produces evidence — test reports, policy check outputs, trace IDs — that an
agent's output satisfies the acceptance criteria.

**Validation** is the judgment that the specification itself was worth building.
Validation answers: *did we build the right thing?* It checks fitness for
real-world use: does the deployed behavior produce the intended business outcome?
Verification can pass completely while validation fails — you can build exactly
what the specification said, correctly, and ship the wrong thing.

**Independent validation** is the organizational challenge of whether
verification and validation were genuinely rigorous. It answers: *were the first
two real?* In regulated contexts, this must be performed by a party
organizationally independent from the team that developed and verified the
system. It is not a technical step — it is a governance requirement.

Evidence means: evaluation reports with pass/fail and metrics, trace IDs linking
to the full decision chain, diffs showing what changed, deployment IDs
confirming what shipped, rollback plans confirming reversibility, policy check
outputs confirming constraint compliance, and memory updates confirming what was
learned. Anything less is assertion, not evidence.

*Minimum bar: If it is not deployed, instrumented, verified against evaluations,
and validated against real-world outcomes, it is not done.*

---

### 2. Specifications are living artifacts that evolve through steering

Requirements, constraints, and acceptance criteria must be versioned,
reviewable, and machine-readable — because they drive agent behavior directly.
Specifications are hypotheses that sharpen as agents explore the problem space
and evidence accumulates. Express what must be true when the work is complete.
Express what is forbidden. Let the swarm find the path. When the path reveals
that the spec was wrong, update the spec and run again.

Specifications and architectural constraints operate at different layers and
change at different speeds. Constraints are invariants — security policies,
domain ownership boundaries, data integrity rules — that hold across
specification iterations. Specifications are goals and acceptance criteria that
evolve within those invariants. An agent can propose a revised acceptance
criterion without governance overhead; proposing a relaxed constraint triggers a
governed review. If the system cannot distinguish these two change types,
specification iteration will silently erode architectural boundaries. See
[Specifications vs. Constraints](companion-principles.md#specifications-vs-constraints)
in the extended guidance.

*Minimum bar: If a specification cannot be versioned, reviewed, and revised
based on execution evidence, it is a wish, not an engineering artifact.*

These are starter defaults, not universal stop conditions. Calibrate them per
domain, track false-convergence and false-drift, and harden them only after
local evidence justifies the thresholds.

**A specification is done iterating when:**
- Acceptance criteria remain stable across three consecutive iterations
  (no new criteria added, no existing criteria changed).
- Scope is contracting, not expanding — each iteration narrows requirements,
  does not broaden them.
- Agent first-pass verification rate exceeds 80% (the specification is clear
  enough for the agent to satisfy it without mid-task clarification).
- No new stop criteria emerge in the last iteration.

If these are not met after three iterations, treat it as scope drift — not
optimization — and reset the boundary. Iteration is not the goal; convergence
is.

---

### 3. Architecture is defense-in-depth, not a document

Domain boundaries define what agents may do and what they must not do. Encode
boundaries as machine-enforced policies: repository gates, type contracts, lint
rules, domain ownership maps, CI checks.

Orchestration is a deterministic concern; execution is a probabilistic one —
conflating them is the root failure mode. Do not rely on an LLM's system prompt
to enforce your business rules. Build deterministic infrastructure wrappers
around your probabilistic AI. Enforce permissions, repository gates, API rate limits,
and data access at the system level. Expect the boundary to be tested. Design
for what happens when it is crossed.

Deterministic wrappers catch structural failures — unauthorized access, schema
violations, forbidden operations. They cannot catch semantic failures — an agent
that writes syntactically valid but logically wrong code. That is why
architecture is *defense-in-depth*, not a single layer: wrappers catch
structural violations (Principle 3), verification catches semantic errors
(Principle 8), and observability catches behavioral drift (Principle 9). No
single layer catches everything. All three must hold.

*Minimum bar: If a boundary is described but not enforced at runtime with
automated detection and recovery, it is not architecture — it is documentation.*

---

### 4. Right-size the swarm to the task

Prefer specialized agents coordinated through shared contracts and state. But do
not default to maximum parallelism. A single well-evaluated agent with excellent
tools often outperforms an expensive, uncoordinated swarm. Scale agents to
complexity, not to ambition.

Design conflict resolution, not just parallelism. Swarms propose; a single
commit path commits. Choose the simplest topology that solves the problem and
graduate to more complex coordination only when evidence shows it is needed.

The point of a swarm is not to mimic an organization chart. It is to create
structured disagreement, specialization, and reconciliation where the workload
benefits from multiple perspectives. Intelligence at system scale is often
plural rather than monolithic. The engineering question is not "how many agents
can we run?" but "what coordination pattern produces better verified outcomes
than a single agent on this workload?"

**Signals that indicate a single agent is insufficient:**
- The task requires concurrent reads or writes across multiple bounded contexts
  where race conditions cannot be resolved inside a single agent.
- Evaluation pass rate plateaus below threshold across successive sessions
  despite specification refinement, indicating context degradation under length.
- The task requires adversarial specialization — roles whose objectives conflict
  and cannot be fully trusted from the same agent (e.g., implementation and
  independent security review).
- Single-agent tool call depth or context budget is consistently saturated on
  representative tasks.

In the absence of these signals, default to single-agent or pipeline.

*Minimum bar: If shared state is not typed, versioned, and reconciled, the swarm
is a mob.*

*Minimum bar (tier containment): An orchestrator cannot delegate actions to
specialist agents that exceed its own authorized autonomy tier. Tier elevation
requires the same approval path regardless of whether the request originates
from a human or an orchestrating agent.*

---

### 5. Autonomy is a tiered budget, not a switch

Grant permissions by risk tier, least privilege, and blast-radius limits. Agents
behave like serverless functions, not employees: spin up for a guarded task,
verify the result, and terminate.

Autonomy operates in explicit governance tiers — each defining who approves,
what evidence is required, and what blast radius is acceptable:

**Tier 1 — Observe.** Agents analyze and propose. Blast radius: none.

**Tier 2 — Branch.** Agents write to isolated branches. Humans approve merges.
Blast radius: contained.

**Tier 3 — Commit.** Agents take production-impacting actions with explicit
human approval, attached rollback plans, and verified evidence. Blast radius:
governed.

Within each tier, define granular permissions: read production data but not
write, deploy to canary but not full rollout, modify test code but not
application code, change configuration but not schema. Tiers define the
governance level; permissions define the allowed actions within that level.

*Minimum bar: If you cannot reconstruct an agent's reasoning at any tier, your
autonomy model has failed.*

**Phase maturity is a prerequisite for autonomy tier.** Tiers and phases are
not independent: a team cannot safely operate at a higher tier than their phase
supports, regardless of available infrastructure.

These maximum tiers are conservative defaults for the relevant work item, not a
blanket organization-wide policy. Calibrate by domain, data classification, and
blast radius.

| Phase | Maximum available tier | Rationale |
|---|---|---|
| Phase 1-2 | Tier 1 only for governed production work | No evaluation suite, no evidence bundles — agent output is unverified |
| Phase 3 | Tier 1 only for governed production work | Autonomy without verification; governance infrastructure not yet in place |
| Phase 4 | Tier 2 (branch + human approval) | Verification gates operational; blast radius is contained |
| Phase 5+ | Tier 3 (governed production impact) | Full Agentic Loop with verification, validation, and domain-scoped accountability |

In regulated industries, use-case-specific caps apply independently of phase.
See [Companion Frameworks](companion-frameworks.md#hard-autonomy-caps-by-regulated-use-case)
for the regulated-industry cap table.

**Phase maturity and task blast radius are independent checks.** Team phase
determines the governance capability ceiling; it does not automatically qualify
every task that falls nominally within that tier. For each task, perform a
separate blast-radius assessment before acceptance:

1. What is the maximum credible impact if this specific task fails?
2. Does that impact stay within the governance coverage of the current phase?
3. If not — escalate the task to a phase with appropriate coverage, or decompose
   it so each subtask stays within the governance boundary.

A Phase 4 team operating correctly for Phase 4 can still fail on a cross-domain
task whose blast radius exceeds Phase 4 governance coverage. Phase is a team
capability ceiling; blast-radius assessment is a per-task gate. The most
consequential failures tend to occur at domain boundaries, where tasks cross
phase ceilings that are not checked at the task level.

---

### 6. Knowledge and memory are distinct infrastructure

An agent without memory is a liability. But knowledge and memory are not the
same thing, and conflating them is dangerous.

**Knowledge** is ground truth: code, documentation, ADRs, formal contracts,
domain constraints. It is versioned, deterministic, and authoritative.

**Learned memory** is heuristic: reasoning patterns, incident learnings, routing
preferences, and reusable skills. It is probabilistic, subject to decay, and
requires continuous renewal — not just point-in-time control. Provenance,
expiration, compression, rollback, and domain scoping are the mechanisms of
that renewal cycle: each one governs not only what is stored, but whether what
was learned is still valid before it is reused.

The practical test: if it changes through governed processes (pull requests, ADR
reviews, schema migrations), it is knowledge. If it changes through feedback
loops (agent learning, incident adaptation, routing optimization), it is
learned memory. The governance mechanism determines the classification.

At the frontier, memory is not only retrieval. Agents can externalize
procedures as reusable skill artifacts that evolve through experience without
changing model weights. Those learned skills require the same provenance,
review, rollback, and scoping discipline as any other memory layer.

**Memory failure modes.** The governance mechanisms above address the
what-and-when of memory management. The threat model addresses what goes wrong
when they fail:
- **Memory poisoning** — an agent writes incorrect learnings that corrupt
  future agent behavior across sessions. Mitigate with human review gates on
  memory writes from agents operating at Tier 2 or above.
- **Cross-agent contamination** — Agent A's domain-specific memory leaks into
  Agent B's reasoning context. Mitigate with domain-scoped memory namespacing
  and access controls on memory read paths.
- **Consistency under concurrency** — two agents update the same memory store
  with conflicting observations. Mitigate with versioned writes and explicit
  conflict resolution policies, the same as for any shared mutable state.
- **Audit trail gap** — "what version of memory was active when this decision
  was made?" requires point-in-time snapshots, not just current state, for
  meaningful incident reconstruction.

*Minimum bar: If memory cannot expire, be rolled back, or show provenance, it is
not memory — it is a liability. And if memory is not revalidated against current
architecture and process before reuse, it is not being governed — it is being
trusted.*

---

### 7. Context is engineered like code

If the knowledge store is polluted with bad embeddings or stale data, the agent
hallucinates — no matter how clean the code. Context quality and code quality
are coupled. Context is a first-class dependency, engineered with the same
rigor as code: versioned, tested, and performance-benchmarked.

Context retrieval must be fast enough to sustain the reasoning loop. Context
windows are finite and reasoning quality degrades as low-signal context
accumulates. Engineer explicit context budgeting: hierarchical retrieval,
rolling summaries, state compaction, and authority-weighted pruning.

*Minimum bar: If retrieval takes longer than the reasoning loop tolerates,
context is broken infrastructure. But slow is not the only failure mode: stale
embeddings, conflicting sources, semantic precision failures (fast retrieval of
wrong artifacts), poisoned retrieval artifacts, and authority-weighting errors
(an outdated ADR silently overriding current policy) are quality failures that a
performance criterion does not catch. Context quality and code quality are
coupled — both must be verified, not just timed.*

---

### 8. Evaluations are the contract; proofs are a scale strategy

Evaluations define what "correct" means in terms the system can check
autonomously. Every change must be verified against the evaluation suite — and
every change must preserve or improve evaluation performance. Without
evaluations, verification is assertion. Without verification, done is a claim.

Evaluations evolve with the system: coverage of the happy path, adversarial
cases, regression scenarios, and behavioral checks. They are the machine-
readable form of the acceptance criteria in Principle 2. When the specification
changes, evaluations change with it.

"Proofs" here means formal verification of the contracts and infrastructure
around agents — not of the agent's reasoning itself. You can prove that a
retry policy is idempotent, that a state machine has no deadlocks, or that a
type contract is satisfied. You cannot formally prove what an LLM will decide.
The value of proofs scales with module count and risk: as more agents interact
through more contracts, the contracts themselves become worth proving.

*Minimum bar: If evaluations do not include regression cases, verification is
incomplete.*

**Verification, validation, and independent validation are distinct disciplines.**
Passing evaluations satisfies verification. It does not satisfy validation or
independent validation, which require additional steps:

| Discipline | Question answered | Owner | Timing | Required by |
|---|---|---|---|---|
| **Verification** | Did we build it right? Implementation matches specification. | Development / QA team | Pre-merge, every change | Always |
| **Validation** | Did we build the right thing? Specification matches real-world need. | Product / domain owner | Pre-release | Phase 4+; always for regulated systems |
| **Independent validation** | Were verification and validation themselves rigorous? | Organizationally separate team (2nd line) | Pre-production | Any high-stakes system; mandated by SR 11-7, SS1/23, DORA in regulated industries |

Independent validation is a governance principle, not merely a compliance
requirement. Any system where a verification failure could cause significant
harm — financial, safety-critical, reputational, or legally consequential —
warrants organizational separation between the team that builds and verifies and
the team that validates. Regulation formalizes this requirement; it does not
create it. The most common failure: teams perform verification, label it
validation, and have no independent validation. This is a quality gap in any
context, not only a regulatory audit finding.

Independent validation must be capable of blocking production deployment. A team
that can only observe and advise is not independent validation — it is a
consultation. See Principle 12 for the accountability structure that makes
independent validation meaningful.

---

### 9. Observability and interoperability cover reasoning, not just uptime

Instrument decisions, tool calls, policy violations, memory retrievals, cost per
task, and near-misses — so you can explain *why* something happened, not just
*that* it happened. Every agent action must produce an inspectable trace: diffs,
tool calls, decision chains, evaluation results, rollbacks.

Traces are not logging. Logging records events. Traces reconstruct reasoning —
the full chain from specification to decision to action to outcome. They are the
audit trail that makes agentic systems governable, debuggable, and safe.

Observability and interoperability are coupled here because portable
observability requires interoperable trace formats. You cannot aggregate traces
across vendor boundaries without standardized contracts, and you cannot debug
cross-runtime failures without replayable tool logs. They have separate minimum
bars but share a dependency: without interoperability, observability fragments
at the system boundary where it matters most.

*Minimum bar (observability): If you cannot answer "why did this happen" from
traces alone, you are not instrumented.*

*Minimum bar (interoperability): If tools cannot be swapped or replayed across
runtimes without rewriting core workflows, the platform is brittle.*

---

### 10. Assume emergence; engineer containment

Multi-agent systems exhibit emergent behavior by nature — some useful, some
dangerous. Expect nonlinear failures, feedback loops, and phase changes. Build
guardrails, rate limits, circuit breakers, and safe fallbacks before you need
them.

When emergence produces useful behavior, capture it. When emergence produces
dangerous behavior, contain it. The difference between these two outcomes is
the quality of your containment engineering.

Security is a containment concern, not a separate audit. Agentic systems that
autonomously write, execute, and deploy code present a distinct attack surface
that must be threat-modeled before granting autonomy beyond Tier 1:

- **Prompt injection** — adversarial content in retrieval artifacts, tool
  responses, or code patterns that redirects agent behavior without the
  operator's knowledge.
- **Privilege escalation** — chained agent calls that accumulate permissions
  no single call would be granted under least-privilege policy.
- **Data exfiltration** — tool calls that surface sensitive data to outputs
  that are not fully inspected or logged.
- **Supply chain attacks** — poisoned tool registries, model adapters, or
  retrieval sources that corrupt agent behavior at ingestion time.
- **Social engineering** — AI-generated outputs crafted to pass human reviewer
  scrutiny by exploiting reviewer trust in fluent, confident text.

Treat every retrieval artifact, tool response, and agent-to-agent message as
untrusted input. Defense-in-depth means identity for agents and tools, signed
provenance for shared state, least-privilege tool scopes, egress controls, and
continuous anomaly detection for cross-agent trust edges.

*Minimum bar: If you have not tested with tool outages, noisy retrieval, and
adversarial inputs, you are not chaos-tested. If you have not threat-modeled
prompt injection, privilege escalation, and exfiltration vectors for your
specific agent topology, you are not security-tested.*

---

### 11. Optimize the economics of intelligence

Not every task requires the most capable model. Build a dynamic routing layer.
Route simple tasks to fast, cheap models. Reserve expensive, high-reasoning
models for complex orchestration and critical decisions. Model choice is a
runtime decision, not a configuration constant.

Optimize total cost of correctness — not just inference cost, but the full
cycle: `inference + verification + governance overhead + incident remediation`.
Include human costs: review time per tier, context-switching across model
behaviors, and debugging heterogeneous failure modes in multi-model routing.
Track cost per task, cost per outcome, and cost per quality unit. When
governance overhead exceeds the value of the work, that is a signal to simplify,
not to add more governance.

**Multi-model coherence.** In heterogeneous swarms, different models may hold
conflicting internal representations of the same codebase — different
architectural pattern priors, different conventions for what "correct" looks
like, different training-data views of domain boundaries. This coherence gap
compounds at Phase 5+ when agent roles are highly specialized. Mitigate by:
making shared architectural decisions explicit in the knowledge base rather than
relying on implicit prompt conventions; routing semantically related tasks
through the same model tier when consistency matters more than cost; and
treating cross-model disagreement on shared artifacts as an observable quality
signal rather than a coordination annoyance.

*Minimum bar: If model choice is a configuration constant instead of a runtime
decision, you are overspending.*

---

### 12. Accountability requires visibility

Agents execute; humans own outcomes, risks, approvals, and incidents. No agent —
however capable — absorbs legal, ethical, or operational responsibility. Release
decisions, risk acceptance, production behavior, and incident response require a
human with skin in the game.

But accountability without visibility is a legal fiction. You cannot own what
you cannot see. The autonomy tiers in Principle 5, the traces in Principle 9,
and the verification and validation disciplines in Principle 8 exist to make
human accountability meaningful rather than ceremonial.

In regulated environments, accountability extends to independent validation:
the organizational separation between the team that builds and verifies a system
and the team that independently validates it is not bureaucracy — it is the
mechanism that makes accountability real. A governance structure where the same
team both builds and validates has no external check on whether its verification
was genuine.

**Accountability at scale operates at the policy level, not the action level.**
When agents process thousands of actions daily, per-action human review is
neither feasible nor the right model. The resolution is a three-tier framework
applied per action class:

| Action class | Human involvement | Accountability mechanism |
|---|---|---|
| **Low-risk, reversible** (Tier 1, contained blast radius) | None per action; domain owner reviews statistical samples and trend dashboards | Automated evidence bundle; rollback ready; anomaly alert if pattern deviates |
| **Medium-risk, governed** (Tier 2, branch + approval) | Human approves merge; does not review every line | Evidence bundle gates approval; trace available on demand |
| **High-risk, production-impacting** (Tier 3) | Named human reviews evidence and accepts risk per change | Full evidence bundle required; no automated promotion |

A domain owner owns the risk policy, the autonomy tier ceiling, the escalation
path, and the incident response protocol for their domain. They do not approve
every low-risk action — they own the framework that governs those actions, and
they carry the accountability when that framework fails. When trace volume
exceeds meaningful review capacity, the correct response is to raise automation
barriers (tighten evaluation thresholds, lower autonomy tiers) until oversight
signal quality is restored — not to accept degraded oversight as a workload
problem.

Failures are data: errors and crashes are learning opportunities, and
hallucinations can become a hallucination loop where plausible-but-wrong early
output drives increasingly wrong follow-on fixes. Never simply retry a failed
prompt. Diagnose, update memory, strengthen contracts and constraints, and rerun
verification before retrying. But someone must own the consequences when systems
go live. Clear responsibility is not bureaucracy; it is system safety.

*Minimum bar: If no named human can inspect the reasoning, review the evidence,
and own the outcome of a production agent, the system is ungoverned.*
