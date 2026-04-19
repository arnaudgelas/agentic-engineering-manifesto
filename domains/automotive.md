# Automotive Regulatory Alignment Mapping

*Mapping the [Agentic Engineering Manifesto](../manifesto.md) principles to
automotive functional safety and software process frameworks.*

> **Disclaimer** — This document maps concepts from the Agentic Engineering
> Manifesto to automotive regulatory frameworks. It does not constitute
> compliance or certification advice. Consult qualified functional safety
> engineers and type-approval specialists for compliance determinations.
>
> **Regulatory currency:** This document reflects ISO 26262:2018, ASPICE 3.1,
> UN Regulation 157 (ALKS), UN Regulation 155 (cybersecurity), ISO/SAE 21434,
> and ISO PAS 8800 (draft) as understood at the time of last review. ISO PAS
> 8800 is under active development; its requirements may change materially
> before publication. **Last reviewed: April 2026.** Proposed changes not yet
> enacted are flagged as such.

See [companion-frameworks.md](../companion-frameworks.md) for boundary
conditions on regulated-industry adoption. See
[adoption-vmodel.md](../adoption-vmodel.md) for the V-model adoption path
applicable to verification-heavy lifecycles.

**Canonical sources.** Normative principle definitions (P1–P12) and autonomy
tier definitions are in [manifesto-principles.md](../manifesto-principles.md).
This document maps those definitions to automotive regulatory requirements;
it does not redefine them.

**Scope:** ISO 26262, ASPICE (Automotive SPICE), UN Regulation 157 (ALKS),
UN Regulation 155 (cybersecurity), ISO/SAE 21434 (cybersecurity), ISO PAS
8800 (AI in road vehicles — under development).

**Audience:** Functional safety engineers, ASPICE assessors, software leads,
and systems engineers evaluating where agentic engineering practices can
operate within existing type-approval and functional safety constraints.

---

## Automotive Safety Integrity Level (ASIL) to Manifesto Autonomy Mapping

ISO 26262 assigns Automotive Safety Integrity Levels (ASIL A through D) to
safety functions based on Severity × Exposure × Controllability. The mapping
below constrains the maximum permissible agent autonomy tier based on the
ASIL of the software element under development.

| ASIL | Failure Potential | Max Agent Autonomy Tier | Verification Depth | Rationale |
|------|------------------|------------------------|---------------------|-----------|
| **ASIL D** | Most severe | Tier 1 — Observe only | All agent output independently verified through qualified means; Part 6 (software) objectives at ASIL D rigor | No tool credit for unqualified tool output. Agent assists analysis and proposes; qualified engineer authors and verifies. |
| **ASIL C** | Severe | Tier 1 — Observe only | Independent verification required; Part 6 ASIL C objectives apply | Same constraint as ASIL D. Reduced objective count does not relax the independence requirement. |
| **ASIL B** | Significant | Tier 1-2 — Observe or Branch | Agent may draft artifacts to isolated branches; merge requires qualified human verification against Part 6 ASIL B objectives | Fewer independence requirements at ASIL B. Agent-drafted code and tests are viable when independently reviewed. |
| **ASIL A** | Low | Tier 1-3 — Full tier range | Standard evidence bundles (P1) attached to each agent contribution; verification per Part 6 ASIL A objectives | Reduced verification rigor. Agent contributions with evidence bundles can satisfy most objectives with standard review. |
| **QM** (Quality Management only) | Negligible safety relevance | Tier 1-3 — Full tier range | Standard manifesto governance; no functional safety objectives | No ASIL applies. Normal manifesto governance is sufficient. |

*These are conservative defaults for safety-relevant software paths; lower-risk
QM and supporting tooling may permit higher autonomy.*

**ASIL decomposition.** ISO 26262 supports ASIL decomposition: an ASIL D
requirement may be decomposed into two ASIL B requirements handled by
independent channels. In agentic contexts, ASIL decomposition applies to
the agent's contribution to each decomposed channel independently — the
two-channel independence requirement must be preserved even when agents
assist in developing both channels.

**Key constraint:** ASIL assignment is determined by the hazard analysis and
risk assessment (HARA, ISO 26262 Part 3), not by the development team. The
ASIL dictates the autonomy ceiling; the team cannot raise it.

---

## ISO 26262 Software Process to Manifesto Mapping

ISO 26262 Part 4 (system level) and Part 6 (software level) govern the
development process. The table below maps key activities to manifesto
principles.

| ISO 26262 Activity | Part / Clause | Manifesto Equivalent | Principle | Alignment | Gap |
|---|---|---|---|---|---|
| Initiation of product development at software level | Part 6, §5 | Specification scope; autonomy tier assignment | P2, P5 | Strong. Machine-readable specifications map to software development plan inputs. | SW development plan must document tool qualification and agent usage as part of the SW development environment. |
| Specification of software safety requirements | Part 6, §6 | Specify phase; machine-readable specs with safety constraints | P2 | Strong. Living specifications support traceability to ASIL-allocated safety requirements. | Formal notation may be required for ASIL C/D; agent-drafted formal specs must be independently reviewed. |
| Software architectural design | Part 6, §7 | Design phase; domain boundaries (P3) | P3 | Strong. Enforced boundaries map to software component isolation. | ASIL C/D require freedom from interference between components; independent verification of architectural decisions required. |
| Software unit design and implementation | Part 6, §8 | Execute phase; agent generates code | P4, P5 | Partial. Agent execution replaces human coding. | Tool qualification (Part 8, §11) applies to tools that automate Part 6 activities. See Tool Qualification section below. |
| Software unit verification | Part 6, §9 | Verify phase; evaluation portfolio (P8) | P8 | Strong. Evaluation gates exceed minimum unit test requirements. | Must include static analysis (ASIL B/C/D), code coverage (MC/DC at ASIL D), and review by independent party (ASIL C/D). |
| Software integration and testing | Part 6, §10 | Verify phase; integration evaluations | P8, P9 | Strong. Traces reconstruct cross-component interactions. | Integration testing must verify software component interfaces per architectural design. |
| Verification of software safety requirements | Part 6, §11 | Validate phase; outcome-based evidence (P1) | P1, P8 | Strong. Outcome-based validation aligns with ASIL-calibrated verification. | Requirements-based testing must trace to every software safety requirement. |
| Configuration management | Part 8, §7 | Knowledge as versioned ground truth (P6) | P6 | Strong. Versioned specifications and evidence bundles map to CM objectives. | Agent-generated artifacts must be CM items; model versions must be baselined alongside source code baselines. |
| Change management | Part 8, §8 | Govern phase; autonomy tier gate on changes | P5, P12 | Strong. Tier 2 branch-to-merge workflow enforces change management. | Impact analysis for ASIL-relevant changes must be performed by a qualified safety engineer before merge. |

---

## ISO 26262 Part 8, §11 — Tool Qualification

ISO 26262 Part 8, §11 determines whether a software development tool requires
qualification. This is the primary constraint on agent use in ASIL-relevant
development, analogous to DO-330 in aviation.

### Tool Confidence Level (TCL) Determination

A tool's Confidence Level (TCL 1, 2, or 3) is determined by:
- **Tool Impact (TI)**: Could tool errors remain undetected and cause or
  contribute to a violation of safety requirements?
- **Tool Error Detection (TD)**: Could the error be detected before it could
  affect the safety of the item?

| TCL | Basis | Agent Feasibility |
|-----|-------|------------------|
| TCL 1 | Low tool impact or high detection | Viable. If agent output is always independently reviewed by qualified engineers, the detection probability is high, placing many agent functions at TCL 1. |
| TCL 2 | Moderate tool impact, moderate detection | Viable with constraints. Requires increased confidence measures: use case restrictions, validation of tool use environment, or tool monitoring. |
| TCL 3 | High tool impact, low detection | Challenging. Requires formal tool qualification or use of a pre-qualified tool. Current LLMs are not practical candidates for TCL 3 qualification under present evidence and qualification expectations. |

**The viable path.** Independent human verification of all agent output is
the primary mechanism for achieving high TD (tool error detection), which
reduces the TCL classification for most agent functions. An agent that
generates code which is always reviewed by a qualified engineer before
integration typically achieves TCL 1 or TCL 2 — making tool qualification
unnecessary for those functions.

---

## ASPICE (Automotive SPICE) Process Alignment

ASPICE is the software process framework used across the automotive supply
chain. Most OEM development contracts require ASPICE assessment at Level 2
or 3. Agentic engineering does not conflict with ASPICE — it accelerates
several process areas.

| ASPICE Process Area | Manifesto Alignment | Agent Contribution |
|---|---|---|
| **SWE.1** — Software Requirements Analysis | P2 living specifications | Agents assist requirements traceability, consistency checking, and impact analysis |
| **SWE.2** — Software Architectural Design | P3 defense-in-depth | Agents draft architectural views; qualified engineers verify against safety requirements |
| **SWE.3** — Software Detailed Design and Unit Construction | P4/P5 execution with autonomy tiers | Agents generate code at ASIL-appropriate tier; independent review required for ASIL B+ |
| **SWE.4** — Software Unit Verification | P8 evaluations as contract | Agent-generated test cases and coverage analysis; qualified engineer reviews before baseline |
| **SWE.5** — Software Integration and Integration Testing | P8/P9 evaluation and observability | Agents generate integration test suites; traces support integration evidence |
| **SWE.6** — Software Qualification Testing | P1 outcome evidence | Agent-assisted test execution and evidence bundle assembly; human qualified by domain approves |
| **SUP.1** — Quality Assurance | P12 accountability | Named domain owner accountable for agent output quality; QA role is independent oversight |
| **SUP.8** — Configuration Management | P6 knowledge as versioned ground truth | Agent artifacts are CM items; model versions tracked alongside software baselines |
| **SUP.10** — Change Request Management | P5 tier enforcement | Tier 2 branch gate enforces change request workflow before integration |

---

## UN Regulation 157 (ALKS) and Autonomous Driving

UN Regulation 157 governs Automated Lane Keeping Systems (ALKS) and
represents the most developed regulatory framework for autonomous driving
functions. It establishes performance requirements that interact directly
with agent autonomy tiers.

The fundamental constraint: agents assisting in the development of ALKS
software face the highest ASIL assignments (typically ASIL C/D for the
safety-relevant functions). All development activity on these functions
is subject to the ASIL-based autonomy caps in the first table above.

**Agent use cases for ALKS development:**

| Use Case | Recommended Tier | Notes |
|---|---|---|
| Scenario generation for safety validation | Tier 1-2 | Agents generate candidate scenarios from failure mode databases. Human safety engineer validates scenario coverage and acceptance criteria. |
| Simulation test infrastructure | Tier 1-3 (QM functions) | Simulation toolchain is typically QM; standard manifesto adoption applies. |
| Requirements traceability | Tier 1-2 | Agents assemble traceability matrices from system, software, and test requirements. Human validates completeness against ASIL allocation. |
| Safety case argumentation | Tier 1 | Agents may assist structuring the safety case (GSN/CAE format). All safety arguments require human authorship and qualified engineer sign-off. |
| Regression test suite maintenance | Tier 1-2 | Agents update test cases as specifications evolve. Qualified engineer approves changes to safety-relevant test cases. |

---

## ISO/SAE 21434 — Cybersecurity Engineering

ISO/SAE 21434 governs cybersecurity engineering for road vehicles, complementing
ISO 26262 for safety. Agents introduce specific cybersecurity risk vectors that
must be addressed in the Threat Analysis and Risk Assessment (TARA).

| Cybersecurity Concern | Manifesto Mapping | Automotive-Specific Note |
|---|---|---|
| Agent model supply chain integrity | P3 architecture boundaries | Model provenance, integrity verification, and version pinning. An untrusted model update is a supply chain attack vector affecting the CAL (Cybersecurity Assurance Level) of the affected function. |
| Prompt injection in development agents | P10 containment | Adversarial inputs to development agents could introduce vulnerabilities in vehicle software. Independent verification (TCL 1 path) is the primary mitigation. |
| Data exfiltration via agent context | P7 context engineering | Agent context windows may contain CSMS-protected design data or cybersecurity-relevant technical information. |
| Model routing and multi-vendor supply chain | P11 economics | Each model provider in a multi-model routing setup expands the supply chain; each requires TARA assessment under CSMS obligations. |

---

## Market-Specific Autonomy Guidance

| Workflow | ASIL / Risk Level | Recommended Autonomy | Notes |
|---|---|---|---|
| ASIL D/C safety-critical software | ASIL D/C | Tier 1 (observe only) | Agent assists analysis and proposes; qualified engineer authors and verifies all artifacts. TCL qualification typically not required due to high TD through independent review. |
| ASIL B software | ASIL B | Tier 1-2 | Agents draft to isolated branches; independent verification required before integration. |
| ASIL A and QM software | ASIL A / QM | Tier 1-3 | Standard evidence bundles sufficient. Natural pilot domain for early adoption. |
| Test generation (any ASIL) | Tool output only | Tier 1 (observe) | Agents generate candidate test cases, traceability matrices, and coverage analyses. Qualified engineer accepts before baseline. No TCL 3 qualification required at Tier 1. |
| Simulation and virtual validation | QM context | Tier 1-3 | Simulation infrastructure is typically QM. Standard manifesto adoption. High-value domain for accelerating validation campaigns. |
| Safety case and FMEA support | Safety-critical analysis | Tier 1 | Agents assist structuring FMEAs, FTAs, and safety cases. All safety determinations are human-authored and signed off by a qualified functional safety engineer. |
| ASPICE process documentation | Process improvement | Tier 1-3 | ASPICE artifacts (work products) are human-reviewed. Agent-assisted generation reduces cycle time for lower-risk work products. |

---

## Viable Starting Points

1. **QM software development.** No ASIL obligations. Full agentic loop
   permissible. Standard evidence bundles. Use to build team competency and
   evidence practices before taking on ASIL-rated functions.

2. **Test generation for any ASIL (Tier 1 observe).** Agents generate
   candidate unit tests, integration scenarios, and regression cases.
   Qualified engineer accepts before baseline. High value, low regulatory
   risk regardless of ASIL level.

3. **ASPICE process documentation.** Agent-assisted generation of work
   products: software development plans, traceability matrices, review
   records. Human authors and signs off. Reduces ASPICE preparation cycle
   time significantly.

4. **Simulation scenario generation.** Agents generate candidate test
   scenarios for virtual validation campaigns from failure mode libraries
   and operational design domain specifications. Safety engineer validates
   coverage and acceptance criteria.

5. **Requirements traceability automation.** Agents assemble
   specification-to-test-to-verification matrices. Qualified engineer
   validates completeness. Directly supports ASPICE SWE.4/SWE.5 evidence.

6. **Regression test suite maintenance.** As specifications evolve, agents
   update test cases to reflect changes. Human reviews all changes to
   safety-relevant test cases before re-baseline.

---

## Tool Configuration Notes

*How to configure agent tooling to satisfy ISO 26262 CM obligations and
ISO/SAE 21434 cybersecurity requirements.*

### Configuration Management Hook Mapping

ISO 26262 Part 8, §7 requires that all safety-relevant development artifacts
are identified, baselined, and change-controlled. Agent configuration
contributes to this:

| ISO 26262 CM Objective | Hook Type | What It Produces |
|---|---|---|
| Identification of agent-generated artifacts | PostToolUse audit hook | Artifact ID, agent session ID, model version, timestamp, ASIL context |
| Change control for ASIL-relevant artifacts | PreToolUse gate hook | ASIL classification check; blocks merge to safety-relevant branch without qualified reviewer approval |
| Problem reporting from evaluation failures | PostToolUse evaluation hook | Evaluation failure record with trace ID; automatic problem report creation |
| Model version baselining | SessionStart hook | Records model version in session metadata; must match approved baseline |

### Data and Design Protection

- Restrict MCP servers to on-premises or approved endpoints for sessions
  containing CSMS-protected design data or ASIL-rated requirement documents.
- Model version pinning is a CM obligation for ASIL-relevant development:
  pin to the approved model version in the development environment configuration;
  any model change requires a change request and ASIL impact assessment.
- Apply ITAR/EAR controls (see defense-government.md) if the program involves
  defense-related content subject to export control.

---

## Open Regulatory Questions

1. **ISO PAS 8800 (AI in road vehicles).** ISO PAS 8800 is under active
   development and will be the primary standard governing AI system
   development for road vehicles. Its release will clarify tool qualification
   requirements, autonomy constraints, and evidence requirements for
   AI-assisted development. Monitor ISO TC22/SC32.

2. **Tool qualification path for AI-based development tools.** ISO 26262
   Part 8, §11 predates LLM-based development tools. The existing TCL
   framework can be applied (and the Tier 1 observe approach achieves high
   TD), but no guidance exists specifically for non-deterministic generation
   tools. Industry groups (ISO TC22, AUTOSAR) are developing clarifications.

3. **ASIL decomposition and agent-generated dual-channel software.**
   When ASIL decomposition is used to justify agent involvement in both
   channels, the independence requirement between channels must be preserved
   at the model, knowledge store, and evaluation infrastructure levels —
   not just at the code level. Methodology for demonstrating this independence
   is undeveloped.

4. **UN Regulation 157 / ALKS edge case coverage.** The regulation requires
   demonstration of performance across a defined operational design domain.
   Agent-generated scenario coverage methodologies for satisfying ODD
   completeness arguments are not yet standardized.

5. **Memory and learned behavior in development tools.** If agent learned
   memory influences ASIL-rated software output, does that memory become a
   CM item? The conservative position (consistent with aviation) is yes —
   but automotive standards do not address this explicitly.
