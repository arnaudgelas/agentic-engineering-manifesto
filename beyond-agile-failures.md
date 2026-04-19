# Beyond Agile — Where Agile Breaks: Ten Structural Failures

*The four values challenged, the practices rendered obsolete, and the
conceptual gaps Agile never addressed.*

See [Beyond Agile](beyond_agile.md) for the full argument.
See the [Existing Manifestos](beyond-agile-landscape.md) for what competing
frameworks get right and miss. All references link to
[Sources](beyond-agile-sources.md).

---

The failures are not cosmetic. They are structural — rooted in assumptions that no longer hold. Some belong to the Agile Manifesto itself: its four values, written for a human-only world. Others belong to the practices that grew around it — Scrum's sprints, SAFe's velocity tracking, the ceremonies and metrics that became the operational expression of Agile but were never part of the original document. The distinction matters: the manifesto is a philosophical statement; the practices are an implementation. Both break, but for different reasons. These failures are failures of Agile in agentic systems; they are not a claim that Agile is obsolete for all human-led software work.

## The Four Values — Challenged

### 1. "Individuals and interactions over processes and tools" — Inverted

This was Agile's most liberating principle: trust people, not bureaucracy. But in an agentic pipeline, the toolchain *is* the capability. The choice of orchestration platform, the choice of verification fleet, the choice of memory infrastructure — these are not implementation details. They are architectural decisions that determine what is possible. Using one tool versus another creates fundamentally different operational realities <sup>[1](beyond-agile-sources.md#ref-1)</sup>.

In agentic systems, processes and tools are now fundamental to success, not obstacles to it. The human's role has shifted from writing code to architecting the environment in which agents write code. The Agile Manifesto's founding value has been inverted by the reality it never anticipated <sup>[1](beyond-agile-sources.md#ref-1)</sup><sup>[6](beyond-agile-sources.md#ref-6)</sup>.

### 2. "Working software over comprehensive documentation" — Dangerous

This value was a corrective against waterfall's thousand-page specifications that nobody read. It made sense when humans wrote code deliberately and could explain their reasoning. It is actively dangerous when applied to autonomous agents.

In agentic systems, AI models excel at producing software that *appears* to work. Jones calls this out directly: "AI is spectacular at building software that looks like it works" but "can create technical debt at a rate that normal developers absolutely couldn't" <sup>[1](beyond-agile-sources.md#ref-1)</sup>. The phenomenon — what Andrej Karpathy termed "vibe coding" <sup>[7](beyond-agile-sources.md#ref-7)</sup> — generates code satisfying immediate tests while lacking modularity, architectural integrity, and scalability. Without documentation serving as the contractual boundary holding agents accountable, systems hallucinate from legacy training data and corrupt their own operational context <sup>[1](beyond-agile-sources.md#ref-1)</sup><sup>[3](beyond-agile-sources.md#ref-3)</sup>.

In agentic engineering, **documentation is the specification that constrains agent behavior**. Architecture Decision Records, formal contracts, constraint files, capability definitions — these are not bureaucratic overhead. They are the machine-readable rules that prevent autonomous systems from optimizing for the wrong thing. The Agile Manifesto's suspicion of documentation becomes negligence when your workforce is probabilistic <sup>[3](beyond-agile-sources.md#ref-3)</sup><sup>[6](beyond-agile-sources.md#ref-6)</sup>.

### 3. "Customer collaboration over contract negotiation" — Reframed

Agile rightly elevated direct customer collaboration over adversarial contract negotiations. But in an agentic system, the "contract" is no longer a legal document between humans — it is the machine-readable specification that governs agent behavior. The agent does not collaborate; it executes within constraints. If those constraints are vague, the agent will fill the gaps with its own probabilistic inference — and the customer will receive something nobody specified <sup>[3](beyond-agile-sources.md#ref-3)</sup>.

Contract negotiation has been reborn as specification engineering: defining precise, testable, machine-enforceable boundaries. The collaboration happens between humans during specification. The contract happens between human intent and agent execution <sup>[4](beyond-agile-sources.md#ref-4)</sup><sup>[11](beyond-agile-sources.md#ref-11)</sup>.

### 4. "Responding to change over following a plan" — Incomplete

Agile rightly valued adaptability over rigid upfront planning. But it assumed the entity responding to change was a human with judgment, context, and accountability. When agents respond to change, they do so probabilistically — and without the judgment to know when adaptation has become drift <sup>[3](beyond-agile-sources.md#ref-3)</sup>.

In agentic systems, specifications need to steer behavior and evolve through evidence — something the Agile Manifesto never contemplated. Not rigid plans, but not unconstrained adaptation either. Living specifications that tighten through iterative refinement — specify, execute, evaluate, adjust — with convergence criteria that distinguish productive evolution from scope drift <sup>[3](beyond-agile-sources.md#ref-3)</sup><sup>[4](beyond-agile-sources.md#ref-4)</sup>.

The four Agile values each assumed a human-only world. But the structural failures extend beyond the values themselves — into the practices, metrics, and ceremonies that Scrum, SAFe, and related frameworks built on top of those values.

---

## The Practices — Obsolete

### 5. Sprint Cadences Are Irrelevant to Machine-Speed Execution

A two-week sprint assumes human pace. When agents can complete a full development cycle in hours <sup>[1](beyond-agile-sources.md#ref-1)</sup>, the sprint boundary is not just arbitrary — it is a bottleneck that prevents the system from shipping validated increments the moment they are architecturally sound <sup>[5](beyond-agile-sources.md#ref-5)</sup><sup>[11](beyond-agile-sources.md#ref-11)</sup>.

The replacement is continuous flow with verification gates: agents produce work continuously, and every increment passes through deterministic checks, evaluation harnesses, and proof generation before it advances. The cadence is not time-boxed — it is evidence-gated <sup>[4](beyond-agile-sources.md#ref-4)</sup><sup>[11](beyond-agile-sources.md#ref-11)</sup>.

### 6. Estimation and Velocity Tracking Lose Meaning

Story points and velocity metrics assume human cognitive throughput as the constraint. When an agent can generate ten implementations in the time a human would estimate one, velocity tracking measures the wrong thing <sup>[5](beyond-agile-sources.md#ref-5)</sup>. The meaningful metric becomes **total cost of correctness** (the sum of inference spend, verification overhead, and incident remediation when failures escape) — not story points completed <sup>[3](beyond-agile-sources.md#ref-3)</sup><sup>[18](beyond-agile-sources.md#ref-18)</sup>.

This point is worth sharpening because even sophisticated frameworks miss it. McKinsey's *AI Transformation Manifesto* frames success in terms of EBITDA uplift and return on AI investment — business outcomes, not engineering activity. That framing is correct and the manifesto community should adopt it. But McKinsey's own framework contains no mechanism for *how* those outcomes are verified at the task level. The missing link is exactly total cost of correctness: the economics-aware routing, verification overhead, and incident cost that determine whether a given investment in AI delivery produces real return or just faster output that fails downstream.

The economics shift runs deeper than metrics. In Agile, cost is simple: developers cost X per sprint, multiply by sprints. In agentic engineering, the cost model is per-token, per-model, per-task — and it varies by orders of magnitude depending on which model is routed to which task. Sending every task to the most capable model is like flying first-class for a cross-town trip; sending every task to the cheapest is like taking a bicycle to the airport. The Agile Manifesto has no vocabulary for **economics-aware routing** — selecting which model handles which task based on the cost-quality tradeoff — because it never needed one <sup>[17](beyond-agile-sources.md#ref-17)</sup>. Reuven Cohen has described a "sudden flip in the cost curve" around mid-2025 — the moment long-horizon agentic swarms became economically feasible, making cost-quality routing not just desirable but essential <sup>[21](beyond-agile-sources.md#ref-21)</sup>. The Gartner prediction that 40% of agentic projects will be canceled cites "escalating costs" as a primary driver <sup>[8](beyond-agile-sources.md#ref-8)</sup> — this is precisely the problem: organizations burning through inference budgets because they lack cost-quality routing discipline.

### 7. Human Code Review Becomes the Bottleneck

When agents produce code at machine speed, the human reviewer becomes the rate limiter. The Agile Manifesto has no answer for this because it never imagined a world where code generation was not the bottleneck <sup>[18](beyond-agile-sources.md#ref-18)</sup>. The answer requires tiered verification: deterministic checks filter autonomously, statistical evaluation filters semi-autonomously, and human review focuses exclusively on high-risk deltas and policy exceptions <sup>[13](beyond-agile-sources.md#ref-13)</sup><sup>[18](beyond-agile-sources.md#ref-18)</sup>.

---

## The Conceptual Gaps — Missing Entirely

### 8. No Framework for Non-Deterministic Behavior

In agentic systems, this is the deepest category of failure — concepts that neither the manifesto nor its derivative practices ever addressed, because they did not need to. Agile assumes deterministic execution: write code, run tests, the same input produces the same output. Agents are probabilistic. The same specification can produce different implementations across runs. The same tool call can produce different results depending on context window contents, model temperature, and retrieved memory <sup>[3](beyond-agile-sources.md#ref-3)</sup><sup>[4](beyond-agile-sources.md#ref-4)</sup>.

The Agile Manifesto has no vocabulary for emergence, containment, hallucination loops, memory poisoning, or probability-compounding across multi-agent systems <sup>[4](beyond-agile-sources.md#ref-4)</sup><sup>[13](beyond-agile-sources.md#ref-13)</sup>. These are not edge cases — they are routine operating conditions in agentic engineering.

It is worth noting that even current enterprise guidance — including McKinsey's *AI Transformation Manifesto* — reproduces this gap at the strategic level. McKinsey's theme on agentic engineering (#11 of their twelve themes) describes the challenge as "ingesting unstructured data, extending AI platforms with agentic capabilities, automating guardrails and controls." This describes Agile-era configuration management dressed in agentic vocabulary. It has no concept of blast radius, swarm topology, correlated failure modes, or the verification/validation distinction that separates "the agent said it worked" from "we can prove it worked." The absence of non-determinism vocabulary in enterprise AI guidance is not a strategic oversight — it is a symptom of the same conceptual gap that limits Agile: the framework was designed for human executors, and the vocabulary has not caught up to probabilistic ones.

### 9. No Concept of Systems That Learn from Their Own Execution

In agentic systems, this may be the most consequential failure — the one that generates all the others. Agile's feedback loop is the retrospective: humans reflecting on what happened, deciding what to change, implementing changes in the next sprint. That loop runs on a two-week cadence because it requires human cognition. The feedback is soft — "we should try shorter sprints," "let's refine our definition of done."

Agentic systems have a qualitatively different feedback loop. Errors, logs, successes, and failures feed back into the system in real-time. The system does not wait for a retrospective. It does not require human reflection to adapt. The feedback is hard, unambiguous signals: passing tests, zero runtime errors, validated API responses, converging evaluation metrics <sup>[2](beyond-agile-sources.md#ref-2)</sup><sup>[17](beyond-agile-sources.md#ref-17)</sup>. This is not merely faster iteration — it is a different kind of learning. Reasoning consolidation cycles can compress chains of inference using reinforcement-learning algorithms in seconds. Meta-cognitive layers enable systems to monitor and modify their own operational parameters. Self-optimizing architectures adapt query and retrieval strategies in microseconds based on access patterns <sup>[19](beyond-agile-sources.md#ref-19)</sup>.

The Agile Manifesto has no concept of a system that improves its own process without human intervention. It assumes the learner is human, the cadence is weekly, and the feedback requires interpretation. In agentic systems, the learner is the system itself, the cadence is continuous, and the feedback is machine-readable. This is not an incremental improvement over retrospectives — it is a paradigm shift that Agile's vocabulary cannot express <sup>[2](beyond-agile-sources.md#ref-2)</sup>.

### 10. No Treatment of Memory as Infrastructure

In agentic systems, Agile's concept of institutional memory — tribal knowledge and documentation that nobody reads — is fatally insufficient. There is no Agile practice for curating, governing, or versioning what the organization *knows* — let alone what it has *learned*. In an agentic system, this gap is fatal.

An agent without persistent memory — whether internalized or externalized through retrieval layers, episodic stores, or vector databases — must be reconstructed from scratch for every task. Some architectures externalize memory entirely, separating the agent from its state. But the memory still exists as infrastructure; it still requires curation, governance, and retrieval engineering. The question is not whether memory is needed but where it lives and who governs it. In practice, the distinction between a stateless tool and a memory-augmented agent is the ability to accumulate, curate, and act on context across invocations <sup>[19](beyond-agile-sources.md#ref-19)</sup>. And memory itself is not monolithic: knowledge (what was given) and learned memory (what was discovered through execution) are distinct infrastructure with different curation, governance, and retrieval requirements <sup>[17](beyond-agile-sources.md#ref-17)</sup>.

Context windows are finite. What goes into them determines what comes out. **Memory governance** — the discipline of deciding what to retain, what to forget, how to retrieve, and how to prevent poisoning of an agent's accumulated context — is an engineering discipline as consequential as database design. The Agile Manifesto treats memory as overhead. Agentic engineering treats it as infrastructure <sup>[3](beyond-agile-sources.md#ref-3)</sup>.
