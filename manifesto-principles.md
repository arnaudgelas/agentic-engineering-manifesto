# The Agentic Engineering Manifesto — Twelve Principles

*The engineering principles that operationalize the six values.*

See the [Manifesto](manifesto.md) for the core values and the Agentic Loop.
See the [Definition of Done](manifesto-done.md) for what "done" means.

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

*Minimum bar: If a specification cannot be versioned, reviewed, and revised
based on execution evidence, it is a wish, not an engineering artifact.*

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

But agents are probabilistic systems. Do not rely on an LLM's system prompt to
enforce your business rules. Build deterministic infrastructure wrappers around
your probabilistic AI. Enforce permissions, repository gates, API rate limits,
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

*Minimum bar: If shared state is not typed, versioned, and reconciled, the swarm
is a mob.*

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

| Phase | Maximum available tier | Rationale |
|---|---|---|
| Phase 1-2 | Tier 1 only | No evaluation suite, no evidence bundles — agent output is unverified |
| Phase 3 | Tier 1 only | Autonomy without verification; governance infrastructure not yet in place |
| Phase 4 | Tier 2 (branch + human approval) | Verification gates operational; blast radius is contained |
| Phase 5+ | Tier 3 (governed production impact) | Full Agentic Loop with verification, validation, and domain-scoped accountability |

In regulated industries, use-case-specific caps apply independently of phase.
See [Companion Frameworks](companion-frameworks.md#hard-autonomy-caps-by-regulated-use-case)
for the regulated-industry cap table.

---

### 6. Knowledge and memory are distinct infrastructure

An agent without memory is a liability. But knowledge and memory are not the
same thing, and conflating them is dangerous.

**Knowledge** is ground truth: code, documentation, ADRs, formal contracts,
domain constraints. It is versioned, deterministic, and authoritative.

**Learned memory** is heuristic: reasoning patterns, incident learnings, routing
preferences. It is probabilistic, subject to decay, and requires active
curation, including provenance, expiration, compression, rollback, and domain
scoping.

The practical test: if it changes through governed processes (pull requests, ADR
reviews, schema migrations), it is knowledge. If it changes through feedback
loops (agent learning, incident adaptation, routing optimization), it is
learned memory. The governance mechanism determines the classification.

*Minimum bar: If memory cannot expire, be rolled back, or show provenance, it is
not memory — it is a liability.*

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
context is broken infrastructure.*

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
| **Independent validation** | Were verification and validation themselves rigorous? | Organizationally separate team (2nd line) | Pre-production | SR 11-7; SS1/23; DORA; regulated industries |

The most common failure: teams perform verification, label it validation, and
have no independent validation. This is both a quality gap and, in regulated
contexts, an audit finding.

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

---

### 10. Assume emergence; engineer containment

Multi-agent systems exhibit emergent behavior by nature — some useful, some
dangerous. Expect nonlinear failures, feedback loops, and phase changes. Build
guardrails, rate limits, circuit breakers, and safe fallbacks before you need
them.

When emergence produces useful behavior, capture it. When emergence produces
dangerous behavior, contain it. The difference between these two outcomes is
the quality of your containment engineering.

*Minimum bar: If you have not tested with tool outages, noisy retrieval, and
adversarial inputs, you are not chaos-tested.*

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

Failures are data: errors and crashes are learning opportunities, and
hallucinations can become a hallucination loop where plausible-but-wrong early
output drives increasingly wrong follow-on fixes. Never simply retry a failed
prompt. Diagnose, update memory, strengthen contracts and constraints, and rerun
verification before retrying. But someone must own the consequences when systems
go live. Clear responsibility is not bureaucracy; it is system safety.

*Minimum bar: If no named human can inspect the reasoning, review the evidence,
and own the outcome of a production agent, the system is ungoverned.*
