# Requirements Engineering for Agentic Systems — Reference Framework

*Companion document to the Agentic Engineering Manifesto. Extends Principle 2 (Specifications as living artifacts) with a structured Requirements Engineering framework adapted for probabilistic, agentic, and hybrid systems.*

*Primary reference: "Requirements Engineering in the Age of Agentic AI" (submitted framework). Key academic support: arXiv:2602.22302 (Agent Behavioral Contracts), AgentSpec ICSE 2026 (arXiv:2503.18666), NIST AI RMF GenAI Profile (NIST AI 600-1, July 2024), ISO/IEC 5338 (AI system life cycle), ISO/IEC 42001 (AI management systems), EU AI Act (Regulation (EU) 2024/1689).*

---

## 1. The Paradigm Break

Traditional requirements engineering was designed for deterministic systems. A requirement specifies a condition the system must satisfy; a test confirms whether the system satisfies it. Pass or fail.

Agentic systems break this model in three ways:

**Non-determinism.** The same input may produce different outputs across runs. A requirement stating "the system shall return X given input Y" cannot be verified by a single test execution. It must be stated as a probabilistic assurance target: "the system shall return output consistent with class X in at least N% of runs across the evaluation distribution."

**Emergent behavior.** Agentic systems learn, adapt, and generate outputs outside any enumerated set. Requirements that enumerate permitted outputs will always be incomplete. Requirements must instead define a *behavioral envelope* — the boundary the system must stay within — and verify containment rather than specific outputs.

**Dual consumers.** Specifications in agentic pipelines are consumed by both humans (who interpret intent) and agents (who execute literally). A specification that relies on human context to be meaningful will fail when consumed by an agent.

These three breaks require a different RE vocabulary. This document provides it.

---

## 2. The Two-Axes Classification Matrix

Every requirements artifact in an agentic system can be placed on two axes:

**Axis 1 — System type:**
- **Deterministic:** Classical software. Outputs are fully determined by inputs and current state. Traditional RE applies without modification.
- **Agentic:** LLM-based, reinforcement-learning-based, or otherwise probabilistic. Outputs are non-deterministic. Traditional RE must be extended.
- **Hybrid:** Deterministic orchestration layer over agentic execution components. Most production agentic systems. Requires mixed RE strategies.

**Axis 2 — Artifact consumer:**
- **Human:** The requirement is written for a human reader. Natural language is appropriate. Intent can be communicated through context, examples, and commentary.
- **Agent:** The requirement is consumed directly by an agent as part of a specification, system prompt, or AGENTS.md file. Must be unambiguous to a machine. Contextual inference is unreliable.
- **Hybrid:** The requirement must serve both humans (for review, governance) and agents (for execution). This is the hardest case and requires explicit dual-format specifications.

### The 3×3 Matrix

| | Human consumer | Agent consumer | Hybrid consumer |
|---|---|---|---|
| **Deterministic system** | Traditional RE. Prose + formal models. | AGENTS.md / skill files. Machine-readable constraints with no ambiguity. | Canonical prose spec + machine-readable encoding. Keep them in sync. |
| **Agentic system** | Behavioral envelope in prose. Probabilistic assurance targets as acceptance ranges. | Behavioral contracts (arXiv:2602.22302). AgentSpec format (arXiv:2503.18666). Enumerated constraints with explicit probability bounds. | Single source (behavioral envelope) + dual projections: prose for governance, structured format for agent consumption. |
| **Hybrid system** | Separate deterministic and agentic requirement sets. Document which components are which. | Orchestration spec (deterministic, machine-readable) + behavioral envelope (agentic components). | Full RE framework: single-source document → human projection → agent projection → governance projection. |

**Key rule:** Never write a requirement in the human-consumer format when the primary consumer is an agent. The specification will be consumed literally. What a human infers from context, an agent will miss or misapply.

**Stack allocation note:** Requirements must be allocated at the appropriate layer of the system stack: foundation model / provider, prompt and runtime policy, planner or controller, memory, tools and connectors, deterministic orchestration, human review interface, deployment and monitoring infrastructure. A single high-level requirement (e.g., "the system must not exfiltrate sensitive data") typically decomposes into separate requirements at multiple layers: model and provider constraints, retrieval scoping, connector authorization scopes, egress controls, logging, review gates, and incident response. Apply the two-axes classification at the layer where the requirement is enforced, not at the system level.

---

## 3. Hard Requirements vs. Probabilistic Assurance Targets

The requirement type must match the system type.

**Hard requirements** are absolute. The system either satisfies them or it does not. They apply to:
- Deterministic components of hybrid systems
- Safety boundaries (the system must never take action X regardless of context)
- Authorization and access control
- Structural invariants (data formats, API contracts, schema validation)

Hard requirements in agentic systems should be enforced by infrastructure policy wherever possible, not by the agent's own reasoning. An agent instructed not to do X via a prompt can be argued or manipulated out of that constraint. An agent that cannot do X because the tool call is disabled cannot. In practice, critical hard requirements may need layered enforcement — infrastructure policy as the primary control, supplemented by runtime monitoring, human review gates, and post-hoc audit detection. No single enforcement mechanism should be treated as sufficient in isolation for Tier 3 systems.

**Probabilistic assurance targets** define acceptable performance ranges across an evaluation distribution. They apply to:
- Output quality (accuracy, relevance, completeness)
- Behavioral consistency (the system should behave consistently within the behavioral envelope)
- Task success rates

Format: *"The system shall achieve [metric] of [value] ± [tolerance] across [evaluation distribution] with [confidence level]."*

Example: *"The claim extraction agent shall achieve F1 score ≥ 0.85 across the held-out evaluation set of 500 documents, with 95% confidence interval upper bound ≥ 0.82."*

**Critical distinction:** Probabilistic assurance targets are not lower-quality requirements. They are the correct specification format for non-deterministic behavior. Writing a hard requirement for probabilistic behavior is not more rigorous — it is a category error that will always fail at verification.

---

## 4. The Behavioral Envelope

A behavioral envelope defines the space within which agent behavior is acceptable, without enumerating acceptable behaviors. It consists of four layers:

**Layer 1 — Hard boundaries (must never).** Actions the agent is prohibited from taking regardless of context, instructions, or apparent justification. These are enforced structurally (tool removal, permission policy) not by prompt instruction.

Examples: writing to production databases without explicit approval, sending external communications without human review, executing irreversible actions in Tier 3 systems (see Section 6).

**Layer 2 — Soft boundaries (should avoid).** Behaviors that are undesirable but not prohibited. Enforced by evaluation, monitoring, and steering. Alert on violation; do not hard-block.

Examples: producing responses that exceed the approved length envelope, citing sources outside the approved knowledge base, introducing architectural patterns not aligned with the codebase style.

**Layer 3 — Performance envelope.** The acceptable range of quality, cost, latency, and resource consumption. Defines when degraded performance triggers escalation.

**Layer 4 — Adaptation envelope.** For systems that learn or accumulate state: defines what the system is permitted to learn from (allowed data types, sources, and feedback channels), what it must not update on (prohibited inputs to persistent memory or fine-tuning), and how learned behavior is governed and audited. Specify: what counts as adaptation (few-shot history, RAG knowledge base updates, fine-tuning, long-term memory writes); who can write to persistent memory and under what conditions; provenance requirements for stored knowledge; retention and expiry policy; how learned state can be rolled back; and what behavioral changes trigger a revalidation cycle. For systems using retrieval-augmented generation, specify knowledge base governance: source authority, freshness requirements, and access boundaries.

The behavioral envelope is the primary specification artifact for agentic components. It replaces enumerated-output requirements as the verification target. For the full system, the behavioral envelope coexists with hard requirements for deterministic components and interface contracts between system layers.

### Multi-Agent Behavioral Contracts

When multiple agents interact, behavioral envelopes must be specified for each agent individually *and* for inter-agent boundaries. The Agent Behavioral Contracts framework (arXiv:2602.22302) addresses this explicitly: contracts define pre/postconditions and invariants at agent boundaries, and multi-agent contract composition yields computable probabilistic degradation bounds for the chain.

The practical implication: reliability does not improve in a multi-agent system simply by adding more agents. Correlated failure modes — shared base model, shared knowledge base, shared tool chain — mean the combined reliability of a chain can be *worse* than any single agent's reliability, because failures propagate in the same direction simultaneously. Requirements for multi-agent systems must therefore specify:

- **Communication contracts** at each inter-agent boundary: what one agent is permitted to send, what another is required to accept, what triggers rejection or escalation
- **Chain-level reliability targets** stated as probabilistic assurance targets, not derived from per-agent targets by multiplication (which assumes independence that rarely holds)
- **Failure isolation boundaries**: what happens when one agent in the chain fails — does it escalate, fall back, or propagate the error downstream?
- **Shared resource governance**: if agents share a knowledge base, memory store, or tool, specify which agent can write, which can read, and under what conditions

---

## 5. The Single-Source / Multiple-Projections Principle

Agentic pipelines require requirements artifacts in multiple formats for multiple consumers:
- Governance and audit: prose, human-readable, context-rich
- Agent execution: structured, machine-readable, unambiguous
- Testing and evaluation: measurable, with clear pass/fail or threshold criteria
- Regulatory compliance: aligned to ISO/IEC 5338, NIST AI RMF, or domain-specific standards

The failure mode is maintaining separate documents for each consumer. These diverge. The governance document says one thing; the agent execution spec says another; the tests verify a third thing.

**The single-source principle** *(governance best practice, not a legal requirement)*: One canonical source document (the behavioral specification) is the source of truth. All other representations are generated or derived from it, not independently authored. When the source changes, all projections must be updated.

In practice:
- Write the behavioral specification in human-readable prose with explicit, structured sections
- Derive the agent-consumable encoding (AGENTS.md, AgentSpec format, or behavioral contract) from the prose by explicit, documented transformation
- Derive the evaluation suite from the probabilistic assurance targets, not independently
- Derive the compliance mapping from the behavioral envelope using the relevant standard's framework (NIST AI RMF risk categories, ISO/IEC 5338 life cycle requirements)

Every requirement in every projection must trace back to a named section in the canonical source. If it cannot, it either belongs in the source or should not exist.

### Change Control

Because the behavioral specification is the source of truth for all projections, changes to it carry cascading implications. A change control process must specify:

- **Who can propose changes** to the behavioral specification, and who must approve them (minimum: the tier owner and a representative from each affected consumer group — governance, engineering, and security)
- **What triggers mandatory re-evaluation**: new capability deployment, behavioral drift detected by monitoring, incident post-mortem, regulatory change, or elapsed review interval
- **How projections are updated**: no projection may be updated independently. The canonical source is updated first; projections are re-derived. The commit history of the source document is the audit trail.
- **How version mismatches are detected**: agents consuming a behavioral specification should receive a versioned reference. If the version they were instantiated with no longer matches the current canonical version, the mismatch must be flagged before the next deployment cycle.

For Tier 3 systems, changes to Layer 1 hard boundaries require explicit re-authorization: re-specification, updated evidence bundle, and revalidated approval chain.

---

## 6. Tiered Lifecycle

Requirements governance applies differently at different autonomy tiers. Mismatching governance to autonomy tier is a common source of both under-governance (too little control at high autonomy) and over-governance (paralyzing low-risk operations with excessive process).

**Tier 1 — Propose-only (analyze and recommend, no execution).**
Requirements emphasis: output quality, behavioral consistency, information boundary (what data the agent can access). Governance: standard review gates. The blast radius of wrong output is bounded by the human review step.

Minimum requirements artifacts: behavioral envelope (Layers 1 and 3), evaluation suite for output quality, data access specification.

**Tier 2 — Isolated execution (writes to branches, sandboxes, or staging environments; changes require review before promotion).**
Requirements emphasis: all Tier 1 requirements, plus: scope boundary (what the agent can modify), promotion criteria (what review must confirm before promotion), rollback specification.

Minimum requirements artifacts: Tier 1 artifacts + scope boundary document + review gate criteria + rollback procedure.

**Tier 3 — Production-impacting (writes to production state, sends external communications, takes irreversible actions).**
Requirements emphasis: all Tier 2 requirements, plus: explicit human approval requirements (who can authorize, under what conditions), audit trail specification, rollback plan (pre-approved, not improvised), incident escalation path.

Minimum requirements artifacts: Tier 2 artifacts + human approval policy + audit trail specification + pre-approved rollback plan + incident escalation procedure.

EU AI Act obligations apply to high-risk systems operating at Tier 3. Human oversight requirements under the Act are not governance checkboxes — they are system design requirements. Specify: what interface enables operators to monitor, detect anomalies, and override outputs; what training or competency is required to exercise oversight effectively; what stop-operation procedure exists and how quickly it can be invoked; and what post-market monitoring captures for ongoing review. "Human approval" is insufficient as a Tier 3 requirement unless the approval mechanism itself is specified as part of the system.

Tier assignment is a requirements decision, not a deployment parameter. It must be made explicitly at the specification stage and documented in the behavioral specification. Tier assignment determines the governance overhead; an agent assigned to Tier 1 cannot subsequently be granted Tier 3 authority without a full re-specification and review cycle.

---

## 7. Non-Functional Requirements for Agentic Systems

The NFR categories that require explicit treatment in agentic systems:

| NFR Category | Agentic-Specific Consideration | Specification Format |
|---|---|---|
| **Reliability** | Non-determinism means reliability must be stated as a distribution, not a point estimate | Probabilistic assurance target |
| **Safety** | Define the behavioral envelope Layer 1 hard boundaries explicitly | Hard requirement, infrastructure-enforced |
| **Security** | Agentic threat landscape includes: prompt injection (direct and indirect via tool outputs), context poisoning, memory poisoning, goal/behavior hijacking, over-permissioned connectors, privilege escalation, supply-chain risks in tool protocols, and identity abuse. Requires explicit threat model and defense-in-depth — prompt-level controls alone are insufficient. Specify: credential scope per connector, connector trust model and verification, memory integrity requirements, red-team cadence | Hard requirement per threat category + evaluation suite for injection resistance + review gate for connector authorization |
| **Privacy** | Data exposure via context window and memory requires explicit access boundaries | Hard requirement |
| **Fairness / Bias** | Output bias is a behavioral quality metric, not a binary | Probabilistic assurance target + evaluation distribution specification |
| **Explainability** | Traceability of agent reasoning to decision | Hard requirement (trace format) + probabilistic target (trace completeness) |
| **Cost** | Token consumption, compute cost per task | Probabilistic assurance target (p95 cost per run) |
| **Latency** | Time-to-completion distribution | Probabilistic assurance target (p50/p95/p99) |
| **Regulatory compliance** | EU AI Act (high-risk obligations apply on a staged timetable; verify the current application date and transitional rules for your use case): documented post-market monitoring, human oversight, logging of autonomous decisions, traceability | Hard requirements (documentation, logging, override capability) + process requirements (post-market monitoring plan) |
| **Evolvability** | Specifications must evolve without full re-derivation | Single-source principle compliance |

---

## 8. Per-Requirement Checklist

For each requirement in a Tier 2+ agentic system, verify:

- [ ] **Type declared:** Is this a hard requirement or a probabilistic assurance target? Is the type correct for the system type?
- [ ] **Consumer declared:** Is the consumer human, agent, or hybrid? Is the format appropriate?
- [ ] **Axis classification:** Is the system type (deterministic/agentic/hybrid) and consumer type documented?
- [ ] **Traceable to source:** Does this requirement trace to a named section in the canonical behavioral specification?
- [ ] **Verifiable:** Can this requirement be verified by an evaluation or test? Is the evaluation defined?
- [ ] **Tier-appropriate:** Is the governance overhead appropriate for the tier?
- [ ] **Hard boundaries infrastructure-enforced:** If this is a hard boundary, is it enforced by infrastructure policy, not prompt instruction?
- [ ] **Probabilistic targets have distributions:** If this is a probabilistic assurance target, is the evaluation distribution specified?
- [ ] **Memory governance addressed:** If the agent has persistent memory, is the adaptation envelope (Layer 4) specified?
- [ ] **Rollback defined:** If this is Tier 3, is the rollback procedure pre-approved and documented?

---

## 9. Connection to the Manifesto

This framework is an extension of **Principle 2** (Specifications are living artifacts that evolve through steering). It provides the vocabulary and structure that Principle 2 requires but does not define.

The behavioral envelope (Section 4) operationalizes **Principle 5** (tiered autonomy): every tier has a corresponding behavioral envelope scope.

The single-source principle (Section 5) operationalizes **Principle 9** (observability as infrastructure): when requirements are single-source, the audit trail is coherent.

The tiered lifecycle (Section 6) maps directly to the autonomy tiers in **Principle 5** and the blast radius management framework in **Principle 10**.

The probabilistic assurance targets (Section 3) operationalize **Principle 8** (evaluations are the contract): the evaluation contract is the assurance target, not a binary test assertion.

---

## 10. Academic References

- **arXiv:2602.22302** — Agent Behavioral Contracts. Formal specification of agent behavior using pre/postconditions adapted for probabilistic systems. Provides mathematical grounding for the behavioral envelope concept.
- **arXiv:2503.18666** — AgentSpec (ICSE 2026). A domain-specific language for specifying and enforcing *runtime constraints* on LLM agents. Rules consist of triggers, predicates, and enforcement mechanisms that intercept agent actions before execution. Relevant for encoding Layer 1 and Layer 2 behavioral envelope constraints in machine-executable form. Note: AgentSpec is a runtime enforcement tool, not a requirements specification format; it operationalizes the agent-consumer column of the two-axes matrix rather than replacing the requirements specification itself.
- **NIST AI 600-1** (July 2024) — NIST AI RMF Generative AI Profile. Risk category taxonomy for generative AI systems. Maps to Layer 1 and Layer 2 of the behavioral envelope.
- **ISO/IEC 5338** — AI system life cycle processes. International standard for requirements engineering in AI systems. The tiered lifecycle (Section 6) aligns to ISO/IEC 5338's risk-based process tailoring.
- **ISO/IEC 42001** — AI management systems. International standard for governance, performance evaluation, monitoring, and continual improvement of AI systems. The single-source principle (Section 5) and tiered lifecycle (Section 6) align to ISO/IEC 42001's documentation and change management requirements.
- **EU AI Act (Regulation (EU) 2024/1689)** — Obligations for high-risk AI systems enforceable from 2 August 2026. Relevant provisions: post-market monitoring systems, human oversight measures, logging of autonomous decisions, technical documentation. For agentic systems: wrapping a foundation model in an orchestration layer can constitute a substantial modification triggering full provider obligations. Regulatory compliance row in Section 7 maps to these obligations.
- **arXiv:2603.03823** — SWE-CI benchmark (Sun Yat-sen University & Alibaba Group, 2026). Found that most evaluated models achieve zero-regression rates below 0.25, meaning regressions were introduced across the majority of long-horizon maintenance tasks — validating the need for probabilistic assurance targets and independent evaluation rather than point-in-time binary testing.
