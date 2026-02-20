# The Agentic Engineering Manifesto

*Principles for building systems where humans steer intent, agents execute
within governed boundaries, and verified outcomes are the only measure that
matters.*

---

We are moving from writing software to architecting systems that write, test,
and ship software under human direction. Through this work, we have come to
value:

| We Value More | over | We Also Value |
|---|---|---|
| **Iterative steering and alignment** | over | Rigid upfront specifications |
| **Verified outcomes with auditable evidence** | over | Fluent assertions of success |
| **Right-sized agent collaboration** | over | Monolithic god-agents |
| **Curated, high-signal context and memory** | over | Stateless sessions and noisy memory |
| **Tooling, telemetry, and observability** | over | Chat-based heroics |
| **Resilience under stress** | over | Performance in ideal conditions |

That is, while there is value in the items on the right, we value the items on
the left more.

**Architectural basis (vendor-neutral):** enforceable constraints, durable
knowledge and memory, continuous evaluations, behavioral observability, and
economics-aware routing.

---

## What is Agentic Engineering?

Agentic Engineering is the discipline of architecting environments, constraints,
and feedback loops where autonomous agents can safely plan, execute, and verify
complex work under human governance.

It is distinct from:
- **AI Engineering**: Building and training the base models themselves.
- **Prompt Engineering**: Crafting text inputs to steer model outputs.
- **AI-Assisted Software Engineering**: Using AI as an autocomplete or co-pilot to
  write human-authored code faster.

Agentic Engineering is about treating **agents as system components** rather
than as human proxies. It shifts the primary human role from writing code to
specifying intent, defining verifiable contracts, and operating the system that
executes the work.

---

## What This Is — and What It Is Not

This manifesto is not "prompting harder." It is not LLMs running production
unsupervised. It is not replacing engineering judgment with agent confidence,
and it is not more meetings with new names.

It is enforced constraints, verified outcomes, persistent learning, and human
accountability — applied to systems that include AI agents as first-class
participants in the engineering process.

---

## The Agentic Loop

Every principle in this manifesto serves a single feedback cycle:

**Specify → Plan → Execute → Verify → Observe → Learn → Govern → Repeat**

This loop is not a waterfall. Any phase can trigger a return to an earlier one
based on evidence. The loop is the system. The principles are how you keep it honest.

Failures are data across every phase. Incidents, hallucinations, and policy
violations must produce post-incident updates to specifications, evaluations,
tooling constraints, and memory before retry.

```mermaid
flowchart LR
    Specify --> Plan --> Execute --> Verify --> Observe --> Learn --> Govern
    Govern -->|Repeat| Specify

    Verify -.->|Plan / Execution Failure| Plan
    Verify -.->|Invalid Intent| Specify
    Observe -.->|Runtime Drift| Specify
```

---

## Twelve Principles

### 1. Outcomes are the unit of work

Progress is measured by the cycle **Outcome → Evidence → Learning** — not by
tokens generated, tasks dispatched, or agents spawned. An agent that says "done"
has proven nothing. A change is done only when it is shipped, observable,
verified against evaluations, and learned from. "It compiled" is not done. "The
agent said it worked" is not done. Done means: deployed, instrumented,
evaluated, and fed back into memory.

Evidence means: evaluation reports with pass/fail and metrics, trace IDs linking
to the full decision chain, diffs showing what changed, deployment IDs
confirming what shipped, rollback plans confirming reversibility, policy check
outputs confirming constraint compliance, and memory updates confirming what was
learned. Anything less is assertion, not evidence.

*Minimum bar: If it is not deployed, instrumented, and evaluated with attached
evidence, it is not done.*

### 2. Specifications are living artifacts that evolve through steering

Requirements, constraints, and acceptance criteria must be versioned,
reviewable, and machine-readable — because they drive agent behavior directly.
Specifications are hypotheses that sharpen as agents explore the problem space
and evidence accumulates. Express what must be true when the work is complete.
Express what is forbidden. Let the swarm find the path. When the path reveals
that the spec was wrong, update the spec and run again.

*Minimum bar: If a specification cannot be versioned, reviewed, and revised
based on execution evidence, it is a wish, not an engineering artifact.*

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
structural violations (Principle 3), evaluations catch semantic errors
(Principle 8), and observability catches behavioral drift (Principle 9). No
single layer catches everything. All three must hold.

*Minimum bar: If a boundary is described but not enforced at runtime with
automated detection and recovery, it is not architecture — it is documentation.*

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

### 8. Evaluations are the contract; proofs are a scale strategy

Every change must preserve or improve evaluation performance. Evaluations are
the contract between human intent and agent behavior. They define what
"correct" means in terms the system can verify autonomously.

Evaluations evolve with the system: happy-path validation, adversarial testing,
regression coverage, and behavioral checks. Without evaluations, you are not
iterating — you are guessing.

"Proofs" here means formal verification of the contracts and infrastructure
around agents — not of the agent's reasoning itself. You can prove that a
retry policy is idempotent, that a state machine has no deadlocks, or that a
type contract is satisfied. You cannot formally verify what an LLM will decide.
The value of proofs scales with module count and risk: as more agents interact
through more contracts, the contracts themselves become worth proving.

*Minimum bar: If evaluations do not include regression cases, they are
insufficient.*

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

### 12. Accountability requires visibility

Agents execute; humans own outcomes, risks, approvals, and incidents. No agent —
however capable — absorbs legal, ethical, or operational responsibility. Release
decisions, risk acceptance, production behavior, and incident response require a
human with skin in the game.

But accountability without visibility is a legal fiction. You cannot own what
you cannot see. The autonomy tiers in Principle 5, the traces in Principle 9,
and the evaluations in Principle 8 exist to make human accountability meaningful
rather than ceremonial.

Failures are data: errors and crashes are learning opportunities, and
hallucinations can become a hallucination loop where plausible-but-wrong early
output drives increasingly wrong follow-on fixes. Never simply retry a failed
prompt. Diagnose, update memory, strengthen contracts and constraints, and rerun
verification before retrying. But someone must own the consequences when systems
go live. Clear responsibility is not bureaucracy; it is system safety.

*Minimum bar: If no named human can inspect the reasoning, review the evidence,
and own the outcome of a production agent, the system is ungoverned.*

---

## The Agentic Definition of Done

Tokens generated and tasks dispatched are vanity metrics. "The agent said it
worked" is not a completed ticket.

A change is **done** when it is:

**Shipped** — deployed or delivered, not just merged.

**Observable** — instrumented and logged so reasoning can be inspected and
reconstructed from traces.

**Verified** — evaluated against regression tests (and adversarial cases),
with an evidence bundle (diffs, trace IDs, policy check outputs) required for
every automated merge.

**Provable (when risk requires it)** — formalized invariants and replayable
proof artifacts attached for critical workflows.

**Learned from** — knowledge base and learned memory updated with what was
discovered, with provenance.

**Governed** — operating within autonomy tiers appropriate to its risk, with
human accountability assigned.

**Economical** — routed through appropriate model tiers, cost tracked and
justified per outcome.

Anything less is in progress.

This DoD is phase-calibrated, not all-or-nothing. At Phase 3, "verified" means
tests and a diff; at Phase 5, it means reproducible replay with formal artifacts
where justified. "Provable" applies only when risk requires it; "economical"
matters only when routing infrastructure exists. The bar rises with the stakes —
but at every phase, the question is the same: can you show evidence, not just
assertions?

**Why it matters:** This forces the system to optimize for actual business
outcomes rather than raw output volume, killing the illusion of productivity.

---

*Exploration is a phase. Engineering is a discipline. These principles are not
the last word — they are the minimum for a world where systems build, test, and
ship their own code under human direction. The question that remains is whether
governance can scale as fast as autonomy. We bet it can. This manifesto is how
we intend to prove it.*
