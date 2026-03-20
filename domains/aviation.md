# Aviation / Avionics Regulatory Alignment Mapping

*Mapping the [Agentic Engineering Manifesto](../manifesto.md) principles to
aviation certification frameworks.*

See [companion-frameworks.md](../companion-frameworks.md) for boundary
conditions on regulated-industry adoption. See
[adoption-vmodel.md](../adoption-vmodel.md) for the V-model adoption path
applicable to verification-heavy lifecycles.

**Scope:** DO-178C, DO-330, DO-333, ARP 4754A, ARP 4761/4761A, DO-326A,
DO-356A, DO-278A.

**Audience:** DERs, ODA unit members, certification liaisons, software leads,
and systems engineers evaluating where agentic engineering practices can operate
within existing certification constraints.

> **Disclaimer** -- This document maps concepts from the Agentic Engineering
> Manifesto to aviation regulatory frameworks. It does not constitute
> compliance or certification advice. Consult your DER, ODA, or certification
> authority for compliance determinations.

---

## Design Assurance Level to Manifesto Autonomy Mapping

The manifesto defines three autonomy tiers (Principle 5): Tier 1 (Observe),
Tier 2 (Branch), Tier 3 (Commit). The mapping below constrains the maximum
permissible tier based on the failure condition severity tied to the software
component's Design Assurance Level.

| DAL | Failure Condition | Max Agent Autonomy Tier | Verification Depth | Rationale |
|-----|-------------------|------------------------|---------------------|-----------|
| A | Catastrophic | Tier 1 -- Observe only | All agent output independently verified through qualified means (DO-178C Table A-1 through A-10 objectives, independence requirements) | No certification credit for unqualified tool output. Agent may analyze and propose; human authors and verifies. |
| B | Hazardous | Tier 1 -- Observe only | Independent verification required for all objectives with independence (Table A-4, A-5, A-7) | Same constraint as DAL A. Reduced objective count does not relax the independence requirement. |
| C | Major | Tier 1-2 -- Observe or Branch | Agent may draft artifacts to isolated branches; merge requires qualified human verification against applicable Table A objectives | Fewer objectives with independence. Agent-drafted code and tests are viable when independently reviewed before baseline. |
| D | Minor | Tier 1-3 -- Full tier range | Standard evidence bundles (P1) attached to each agent contribution; verification per Table A objectives | Reduced verification rigor. Agent contributions with evidence bundles can satisfy most objectives with standard review. |
| E | No Effect | Tier 1-3 -- Full tier range | Standard manifesto adoption path applies | No certification objectives apply. Normal manifesto governance is sufficient. |

**Key constraint:** DAL assignment is determined by the system safety assessment
(ARP 4754A/4761A), not by the development team. The DAL dictates the ceiling;
the team cannot raise it.

---

## DO-178C Objectives to Manifesto Principle Mapping

DO-178C organizes airborne software lifecycle activities into five process
categories. The table below maps each to the most applicable manifesto
principles.

| DO-178C Process | Key Objectives | Manifesto Principle | Alignment | Notes |
|----------------|----------------|---------------------|-----------|-------|
| **Planning Process** (Section 4) | PSAC, SDP, SVP, SCMP, SQAP | P2 -- Specifications are living artifacts | Strong | Machine-readable specifications (P2) strengthen plan-to-artifact traceability. Plans remain human-approved documents. |
| **Planning Process** | Standards definition, transition criteria | P5 -- Autonomy is a tiered budget | Moderate | Autonomy tiers map to plan-defined transition criteria. Agent permissions can be encoded in SDP/SVP. |
| **Development Process** (Section 5) | Requirements, design, coding, integration | P1 -- Outcomes are the unit of work | Strong | Evidence bundles per outcome satisfy DO-178C's requirement for traceable development output. |
| **Development Process** | Architecture, detailed design | P3 -- Architecture is defense-in-depth | Strong | Manifesto boundary enforcement aligns with DO-178C architectural partitioning (Section 2.4.1). |
| **Development Process** | Source code, integration | P4 -- Right-size the swarm | Moderate | Multi-agent coordination must preserve single-threaded configuration baselines. |
| **Verification Process** (Section 6) | Reviews, analyses, test cases, test procedures, test results | P8 -- Evaluations are the contract | Strong | Evaluation portfolios map directly to verification cases/procedures. Evidence bundles map to test results. |
| **Verification Process** | Structural coverage, requirements-based testing | P9 -- Observability covers reasoning | Strong | Trace-level observability supports structural coverage analysis and requirements-based test traceability. |
| **Verification Process** | Independence of verification | P12 -- Accountability requires visibility | Strong | Manifesto's accountability model requires named human ownership; DO-178C requires verification independence. Both demand separation of authoring from verification. |
| **CM Process** (Section 7) | Configuration identification, baselines, change control, status accounting, archival | P6 -- Knowledge and memory are infrastructure | Strong | Knowledge as versioned ground truth (P6) maps to CM identification and baseline management. |
| **CM Process** | Problem reporting, change review | P9 -- Observability covers reasoning | Moderate | Agent action traces provide richer change history than traditional problem reports. |
| **QA Process** (Section 8) | Process assurance, compliance, transition criteria | P12 -- Accountability requires visibility | Strong | QA's role as independent process watchdog parallels manifesto's accountability requirements. |
| **QA Process** | Standards compliance | P8 -- Evaluations are the contract | Moderate | Evaluation gates can automate portions of conformity review, but QA independence remains human-owned. |

---

## DO-330 Tool Qualification -- The Hard Constraint

DO-330 determines when a software development tool requires qualification and
at what rigor. This is the single hardest regulatory constraint for agentic
engineering in aviation.

### Tool Qualification Level Determination

An agent used in the development of airborne software is a development tool
under DO-330. Its Tool Qualification Level (TQL) is determined by the DAL of
the software it produces and whether its output errors are detectable.

| TQL | Software DAL | Error Detectability | Required Tool Development Rigor | Agent Feasibility (Current State) |
|-----|-------------|---------------------|---------------------------------|----------------------------------|
| TQL-1 | DAL A | Undetectable | Equivalent to DO-178C DAL A | Not feasible. LLMs are non-deterministic, requirements are unknowable, and exhaustive testing is impossible. |
| TQL-2 | DAL A-B | Detectable | Equivalent to DO-178C DAL B | Not feasible. Same fundamental obstacles as TQL-1 with marginally reduced scope. |
| TQL-3 | DAL A-C | Detectable | Equivalent to DO-178C DAL C | Not feasible. Requires demonstrable tool requirements and verification. Current LLMs cannot satisfy these. |
| TQL-4 | DAL B-D | Detectable | Equivalent to DO-178C DAL D | Marginal. Possible only with extremely constrained agent scope and deterministic wrappers. |
| TQL-5 | DAL C-E | Detectable | Equivalent to DO-178C DAL E | Viable for narrow tool functions where all output is independently verified. |

### The Realistic Path

Current LLMs cannot achieve TQL-1 through TQL-3 qualification. The fundamental
obstacles are non-determinism, absence of specifiable tool requirements (in the
DO-330 sense), and inability to demonstrate coverage or absence of anomalous
behavior.

The viable approach: **treat the agent as an unqualified development tool and
independently verify all of its output.**

DO-178C already accommodates unqualified tools -- their output simply receives
no certification credit until independently verified. This is precisely the
manifesto's model:

- **Evidence bundles (P1)** document what the agent produced and what evidence
  supports it.
- **Evaluation portfolios (P8)** provide the independent verification that
  replaces tool qualification credit.
- **Observability traces (P9)** provide the audit trail showing that
  verification was performed and by whom.

The agent accelerates development; verification provides the assurance credit.
This is Tier 1 and Tier 2 operation by construction.

**Note:** This constraint may evolve. EASA and FAA have issued AI roadmaps
(EASA AI Concept Paper 2.0, FAA AI Safety Assurance Framework). Certification
authorities are actively developing guidance for ML-based tools.
Industry groups (SAE G-34/EUROCAE WG-114) are drafting standards for
ML in airborne systems. Monitor these developments.

---

## DO-333 Formal Methods -- The Opportunity

DO-333 is the formal methods supplement to DO-178C. It provides certification
credit for formal analyses that replace specific testing objectives -- making it
the most natural intersection between agentic engineering and aviation
certification.

Manifesto Principle 8 states: "proofs are a scale strategy." DO-333 is the
certification framework that gives this statement regulatory teeth.

### DO-333 Credit Categories Mapped to Manifesto

| DO-333 Credit | What It Replaces | Manifesto Formal Contracts Approach | Aviation Applicability |
|--------------|-----------------|-------------------------------------|----------------------|
| Formal proof of absence of runtime errors | Robustness testing objectives | Agent-generated code with formal proofs via tools like Astree, Polyspace, or Frama-C | Production precedent: Astree on Airbus A380/A350, A340 |
| Formal proof of requirements satisfaction | Requirements-based test cases (partial) | Formal contracts as machine-verifiable specifications (P2 + P8) | Applicable where requirements are formally expressible |
| Model checking of state machines | State machine testing | Agent-generated models with exhaustive state exploration | Applicable to control logic, mode management |
| Formal equivalence checking | Integration testing (partial) | Agent-generated code verified against formal reference model | Applicable to compiler/code generator qualification (CompCert precedent) |

### Why This Matters for Agentic Engineering

Agent-generated code accompanied by machine-checked formal proofs can produce
a **stronger** certification case than traditionally hand-written code with
manual testing alone. The proof is the evidence, and it is independently
verifiable by deterministic tools.

Production precedents exist:
- **Astree** -- abstract interpretation, deployed on Airbus A380/A350 flight
  control software, proving absence of runtime errors.
- **CompCert** -- formally verified C compiler, applicable to TQL arguments.
- **SCADE** -- qualified code generator with formal semantics, used across
  multiple Airbus and other airborne platforms.

The manifesto's position that "proofs are a scale strategy" is directly
validated by the DO-333 credit model: formal methods scale certification
evidence in ways that test-only approaches cannot.

---

## ARP 4754A System-Level Mapping

ARP 4754A governs the system development process that produces the safety
requirements and DAL assignments flowing down to DO-178C software development.
Agents can assist at this level, but human accountability is absolute.

| ARP 4754A Process | Agent Role (Manifesto Alignment) | Human Accountability |
|-------------------|----------------------------------|---------------------|
| Functional Hazard Assessment (FHA) | Agent assists with analysis: identifies failure modes from system architecture, cross-references historical FHA databases (P6 -- Knowledge). | Human owns hazard classification. FHA severity assignments require engineering judgment and regulatory agreement. |
| Preliminary System Safety Assessment (PSSA) | Agent drafts fault trees and dependency diagrams from architectural models; proposes failure rates from component databases (P1 -- Evidence bundles). | Human approves safety assessment. PSSA conclusions drive DAL allocation and must be defensible to the certification authority. |
| System Safety Assessment (SSA) | Agent generates bidirectional traceability matrices between safety requirements, design artifacts, and verification evidence (P9 -- Observability). | Human validates completeness and correctness. SSA is the final safety argument; it must be human-owned. |
| Common Cause Analysis (CCA) | Agent identifies common causes across subsystems: shared resources, environmental factors, cascading failures (P10 -- Containment). | Human approves analysis and determines acceptability of residual common-cause risk. |
| Requirements validation | Agent cross-checks system requirements against FHA/PSSA allocations for completeness and consistency (P2 -- Specifications). | Human confirms that derived requirements are correctly captured and allocated. |
| FDAL/IDAL allocation | Agent proposes allocation based on FHA severity and architectural independence arguments. | Human owns allocation decisions. FDAL/IDAL assignments are certification commitments. |

---

## Configuration Management

DO-178C Section 7 requires configuration management with identification,
baselines, traceability, change control, status accounting, and archival for
all software lifecycle data.

Agent-generated artifacts are software lifecycle data and fall under the same
CM requirements as human-generated artifacts. The manifesto's model supports
this:

- **Evidence bundles (P1)** are CM items. Each bundle carries identification
  (trace ID, agent ID, timestamp), provenance, and linked problem reports.
- **Manifesto trace model (P9)** provides bidirectional traceability from
  specification through implementation to verification -- the same traceability
  DO-178C Section 7.2 requires.
- **Knowledge as versioned ground truth (P6)** maps to CM baseline management.
  Agent knowledge stores must be baselined and change-controlled alongside
  source code and requirements.

Agent memory (the heuristic/learned component per P6) is **not** a CM item
unless it influences airborne software output. If it does, it must be
baselined, and changes must go through problem reporting.

### CM Mapping Summary

| DO-178C CM Objective (Section 7) | Manifesto Mechanism | Implementation Note |
|----------------------------------|---------------------|---------------------|
| Configuration identification | Evidence bundle IDs (P1), trace IDs (P9) | Each agent-generated artifact carries a unique identifier linked to the agent session, model version, and prompt hash. |
| Baselines | Knowledge baseline (P6) | Agent knowledge stores and model versions are baselined alongside software baselines at each lifecycle milestone. |
| Traceability | Bidirectional trace model (P9) | Specification-to-code-to-test traceability generated by agents must be independently validated for completeness. |
| Problem reporting | Evaluation failures (P8) | Failed evaluations generate problem reports automatically. Agent-introduced defects trace back to the originating session. |
| Change control | Autonomy tier gates (P5) | Tier 2 branch-to-merge workflow enforces change control. No agent-generated change enters a baseline without human approval. |
| Release and archival | Evidence bundles (P1) | Bundles are archival-ready: self-contained, immutable, and reproducible. |

---

## ARP 4761 / 4761A Safety Assessment

ARP 4761 (and its revision 4761A) defines the safety assessment methods that
produce the failure condition classifications driving DAL assignment. Agent
involvement in safety assessment activities requires particular care because
errors propagate into DAL assignments and certification scope.

| Safety Assessment Method | Agent Contribution | Constraint |
|-------------------------|-------------------|------------|
| Fault Tree Analysis (FTA) | Agent drafts fault trees from system architecture models and failure mode libraries. | Human validates logical correctness, cut set analysis, and probability assignments. Automated generation must not mask missing failure modes. |
| Failure Modes and Effects Analysis (FMEA) | Agent populates FMEA worksheets from component databases, prior analyses, and architecture descriptions. | Human reviews severity classifications, detection methods, and recommended actions. Agent cannot assign severity. |
| Markov Analysis | Agent builds state transition models and computes reliability metrics. | Human validates state space completeness and transition rate assumptions. |
| Dependency Diagram Analysis | Agent generates dependency diagrams from system interconnection data. | Human validates that all relevant dependencies are captured, including latent and environmental dependencies. |
| Common Mode Analysis (CMA) | Agent cross-references design data to identify shared resources, manufacturing processes, and environmental exposures. | Human owns the determination of common mode acceptability and any required design changes. |

The manifesto's Principle 10 (containment) is directly relevant: safety
assessment errors are emergent risks that compound through the certification
chain. Independent human review is non-negotiable for all safety assessment
outputs regardless of DAL.

---

## Airworthiness Security (DO-326A / DO-356A)

DO-326A establishes the airworthiness security process; DO-356A provides the
information security supplement. Agentic engineering introduces specific threat
vectors that must be addressed in the Security Risk Assessment.

### Manifesto Alignment

| Security Concern | Manifesto Mapping | Aviation-Specific Consideration |
|-----------------|-------------------|-------------------------------|
| Agent data access scope | P10 -- Containment; P3 -- Defense-in-depth | Agents must not have access to airborne software beyond their authorized development scope. Network isolation and data classification enforcement apply. |
| Supply chain integrity of agent models | P3 -- Architecture boundaries | Model provenance, integrity verification, and version control. Untrusted model updates are a supply chain attack vector. |
| Prompt injection / adversarial input | P10 -- Containment | Adversarial inputs to development agents could introduce subtle vulnerabilities in airborne code. Independent verification (DO-330 unqualified tool path) is the mitigation. |
| Data exfiltration via agent context | P7 -- Context is engineered | Agent context windows may contain export-controlled technical data. |

### Export Control (ITAR/EAR)

Airborne software, particularly defense-related avionics, is frequently subject
to ITAR (22 CFR 120-130) or EAR (15 CFR 730-774) restrictions. Agents that
process ITAR/EAR-controlled technical data must operate within compliant
infrastructure: no data transmission to non-compliant cloud endpoints, no
model training on controlled data without authorization, and access controls
consistent with Technology Control Plans.

---

## DO-278A -- Ground-Based Software

DO-278A governs software for ground-based CNS/ATM systems. It is structurally
similar to DO-178C but uses Assurance Levels (AL 1-6) rather than DALs and
applies to a lower-criticality domain overall.

DO-278A is a strong candidate for earlier agentic adoption:

| DO-278A Assurance Level | Equivalent Rigor | Agent Autonomy Ceiling |
|------------------------|------------------|----------------------|
| AL-1 | Comparable to DAL A | Tier 1 |
| AL-2 | Comparable to DAL B | Tier 1 |
| AL-3 | Comparable to DAL C | Tier 1-2 |
| AL-4 | Comparable to DAL D | Tier 1-3 |
| AL-5 | Below DAL D | Tier 1-3 |
| AL-6 | Below DAL E | Tier 1-3 |

The same DO-330 tool qualification constraints apply. The path is identical:
unqualified tool with independent verification of all output.

---

## Viable Starting Points

Not all aviation software carries equal certification burden. The following
are realistic entry points for agentic engineering practices today:

1. **DAL D/E software development.** Reduced verification objectives, fewer
   independence requirements. Evidence bundles and evaluation gates provide
   sufficient assurance credit with standard review.

2. **Ground support equipment (GSE) software.** Often not subject to DO-178C
   at all. Standard manifesto adoption applies.

3. **Test generation and requirements analysis automation.** Agents operating
   at Tier 1 (Observe) to generate candidate test cases, requirements
   traceability matrices, and coverage analyses. Output is reviewed and
   accepted by qualified personnel -- no tool qualification required.

4. **Traceability automation and evidence bundle assembly.** Agent-assembled
   traceability data and certification evidence packages. Human validates
   completeness. High-value, low-risk application.

5. **Formal proof assistance (DO-333 credit).** Agents generate proof
   obligations or proof scripts for formal verification tools. The tool
   (Astree, Frama-C, etc.) provides the deterministic verification.
   Agent output is checked by the prover, not by human review alone.

6. **DO-278A AL-4 through AL-6 systems.** Lower assurance levels with
   proportionally reduced verification burden. Natural pilot domain.

---

## Open Regulatory Questions

The following questions do not have settled answers as of this writing.
Organizations should track developments from FAA, EASA, SAE G-34, and
EUROCAE WG-114.

1. **Certification authority stance on agent-generated airborne software.**
   No published policy exists specifically addressing LLM-generated code in
   DO-178C certification. Current guidance is interpreted through existing
   tool qualification (DO-330) frameworks.

2. **Issue Paper likelihood.** Novel technologies in certification programs
   typically trigger FAA Issue Papers or EASA Certification Review Items
   (CRIs). An agentic development approach in a DAL A-C program should
   anticipate this.

3. **PSAC framing.** How to describe agentic engineering practices in the
   Plan for Software Aspects of Certification without triggering unnecessary
   concern. Framing agents as unqualified development tools with independent
   verification is the current pragmatic approach.

4. **Tool qualification evolution for AI-based tools.** SAE G-34/EUROCAE
   WG-114 are developing ARP 6983 (ML in airborne systems) and related
   guidance. Future standards may provide a path to qualified AI-based
   development tools that does not exist today.

5. **Multi-model supply chain.** When multiple models (routing per P11) are
   used in a development workflow, the tool qualification and CM implications
   compound. No guidance exists for multi-model development tool chains.

6. **Memory and learned behavior in development tools.** If an agent's learned
   memory (P6) influences airborne software output, does that memory become
   lifecycle data under DO-178C Section 7? The conservative position is yes.
