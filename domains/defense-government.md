# Defense / Government Regulatory Alignment Mapping

*Mapping the [Agentic Engineering Manifesto](../manifesto.md) principles to
defense and government regulatory frameworks.*

> **Disclaimer** — This document maps concepts from the Agentic Engineering
> Manifesto to defense and government regulatory frameworks. It does not
> constitute compliance, legal, or security advice. Consult qualified security
> officers, program managers, and legal counsel for compliance determinations.
> Classification obligations vary significantly by program; this document
> addresses unclassified system development.
>
> **Regulatory currency:** This document reflects CMMC 2.0, FedRAMP (current
> marketplace and authorization requirements), NIST SP 800-53 Rev 5, NIST SP
> 800-171 Rev 2, ITAR (22 CFR 120-130), EAR (15 CFR 730-774), and DoD
> Instruction 5000.02 as understood at the time of last review. CMMC
> scoping guidance for AI systems is not yet settled; DIBCAC has not issued
> definitive guidance on LLM API boundary classification. FedRAMP
> authorization status for frontier LLM providers is evolving rapidly;
> verify the FedRAMP marketplace before making infrastructure decisions.
> **Last reviewed: April 2026.** Proposed changes not yet enacted are
> flagged as such.

See [companion-frameworks.md](../companion-frameworks.md) for boundary
conditions on regulated-industry adoption.

**Canonical sources.** Normative principle definitions (P1–P12) and autonomy
tier definitions are in [manifesto-principles.md](../manifesto-principles.md).
This document maps those definitions to defense and government regulatory
requirements; it does not redefine them.

**Scope:** CMMC 2.0 (DoD contractor cybersecurity), FedRAMP (federal cloud
authorization), NIST SP 800-53 (federal security controls), NIST SP 800-171
(protecting CUI), ITAR (22 CFR 120-130) / EAR (15 CFR 730-774) export
controls, DoD Instruction 5000.02 (acquisition).

**Audience:** Program managers, system security engineers, Authorizing
Officials, ISSO/ISSMs, and technical leads evaluating agentic engineering
in government and defense contexts.

---

## Primary Constraint: Data Classification

In defense and government contexts, **data classification is the primary
autonomy constraint**, preceding all other considerations. Unlike other
regulated industries where data classification is one of several constraints,
here it is the governing constraint that determines whether an agent system
can be used at all, on what infrastructure, and with what controls.

| Data Level | Agent Permissibility | Infrastructure Requirement | Memory Retention |
|---|---|---|---|
| **Unclassified / Public** | Fully permissible | Standard cloud or on-premises | Standard manifesto TTL policies apply |
| **CUI (Controlled Unclassified Information)** | Permissible with controls | FIPS 140-2/3 validated, CUI-authorized environment; FedRAMP High or equivalent | No CUI in external API calls; memory retention subject to CUI handling requirements (32 CFR Part 2002) |
| **Classified (SECRET / TS / TS/SCI)** | **Not permissible** with non-accredited commercial AI systems | Air-gapped, accredited systems only; non-accredited commercial LLM APIs are categorically excluded | No persistence whatsoever outside the accredited system boundary |
| **ITAR / EAR Controlled Technical Data** | Permissible only on compliant infrastructure | US-person-only access; no transmission to non-compliant cloud endpoints; Technology Control Plan required | Retention only within ITAR-compliant boundary; model training on controlled data requires authorization |

**The hard rule:** No classified information may enter any commercial AI
system, regardless of the system's other security controls. This is not a
risk decision — it is a legal obligation under the National Industrial
Security Program Operating Manual (NISPOM, 32 CFR Part 2004) and applicable
security classification guides.

---

## CMMC 2.0 to Manifesto Mapping

The Cybersecurity Maturity Model Certification (CMMC 2.0) is required for
DoD contractors handling Federal Contract Information (FCI) or CUI. Agent
systems that process FCI or CUI in the context of DoD work must be assessed
as part of the CMMC boundary.

| CMMC Level | Applicable To | Manifesto Alignment | Key Requirement for Agent Systems |
|---|---|---|---|
| **Level 1 — Foundational** | Contractors handling FCI only | Partially aligns with P3 (architecture) and P5 (access control) | 17 basic safeguarding practices from FAR 52.204-21. Agents handling FCI must operate within an access-controlled boundary. |
| **Level 2 — Advanced** | Contractors handling CUI (most defense contractors) | Strong alignment with P3, P5, P8, P9, P12 | 110 NIST SP 800-171 practices. Agent systems are in-scope; all CUI flows through agents must be controlled, logged, and auditable. Third-party assessment required for critical programs. |
| **Level 3 — Expert** | Critical programs handling CUI | Alignment plus additional requirements | 24 additional NIST SP 800-172 practices. Government-led assessment. Agent autonomy tier must be documented in the system security plan. |

### CMMC Practice Mapping (Level 2 / NIST SP 800-171)

| NIST SP 800-171 Practice Family | Manifesto Mechanism | Alignment | Gap |
|---|---|---|---|
| Access Control (3.1.x) | P5 autonomy tiers with granular permissions; MCP allowlist | Strong | Agent-to-agent communications must also be access-controlled; A2A protocols require authorization evidence |
| Audit and Accountability (3.3.x) | P9 structured traces; PostToolUse audit hooks | Strong | Traces must meet NIST log requirements: user, time, type of event, success/failure, system component. Retention: 3 years for CUI systems. |
| Configuration Management (3.4.x) | P2 versioned specifications; P6 knowledge baseline | Strong | Model versions, prompt configurations, and tool permission sets are configuration items requiring CM controls. Changes require CM approval. |
| Identification and Authentication (3.5.x) | P5 tier enforcement; RBAC | Partial | Multi-factor authentication required for CUI access; agent identity (as distinct from human identity) must be established and logged. |
| Incident Response (3.6.x) | P12 accountability; P9 traces for diagnosis | Strong | CMMC requires documented incident response plan, testing, and reporting to appropriate authorities. |
| Risk Assessment (3.11.x) | P3 defense-in-depth; P5 blast radius | Moderate | Formal risk assessment of agent systems as part of the CMMC boundary; agent-specific threat vectors must be included. |
| System and Communications Protection (3.13.x) | P3 architecture; data classification enforcement | Strong | Network segmentation between agent systems handling CUI and those handling unclassified data. MCP traffic requires encryption and access controls. |
| System and Information Integrity (3.14.x) | P8 evaluations; P10 containment; P3 allowlists | Strong | Agents must not introduce unauthorized software or dependencies; allowlists are the enforcement mechanism. Security alerts from agent anomalies must be monitored. |

---

## FedRAMP Authorization for Agent Infrastructure

FedRAMP governs the use of cloud services by federal agencies. If agent
infrastructure (model hosting, orchestration, memory storage) runs on a
cloud service, that service must be FedRAMP authorized at the appropriate
impact level.

| FedRAMP Impact Level | Data Sensitivity | Agent Use |
|---|---|---|
| **Low** | Public federal information | Standard manifesto adoption; commercial cloud FedRAMP Low services permissible |
| **Moderate** | Most CUI, low-sensitivity PII | Most federal agency agent deployments; FedRAMP Moderate authorization required for all cloud components in the agent boundary |
| **High** | Law enforcement, emergency services, financial, health | Strictest cloud requirements; FedRAMP High authorization required; subset of cloud providers qualify |

**Key implication for agent systems:** The LLM API, the orchestration
layer, the memory store, and the observability pipeline are all in-scope
for FedRAMP if they process federal information. Using a commercial LLM API
not on the FedRAMP marketplace for federal agency use is a compliance
violation. As of early 2026, a small number of LLM providers have obtained
or are pursuing FedRAMP authorization; the landscape is evolving rapidly.

**Multi-model routing (P11) and FedRAMP:** Each model provider in a
multi-model routing setup must be FedRAMP-authorized at the applicable
impact level. Routing to a non-authorized provider for cost optimization
is not permissible for in-scope federal workloads.

---

## NIST SP 800-53 Security Control Mapping

NIST SP 800-53 is the security controls catalog for federal information
systems (required under FISMA). Agent systems used in federal contexts
are subject to these controls.

| Control Family | Key Controls | Manifesto Mapping | Agent-Specific Note |
|---|---|---|---|
| Access Control (AC) | AC-2 (account management), AC-3 (access enforcement), AC-6 (least privilege) | P5 autonomy tiers, granular permissions | Agent service accounts must be managed identities with least-privilege permissions; periodic access review required |
| Audit and Accountability (AU) | AU-2 (event logging), AU-9 (protection of audit information), AU-12 (audit record generation) | P9 structured traces | All agent actions are auditable events; trace infrastructure must be tamper-evident and backed up separately from the agent system |
| Configuration Management (CM) | CM-2 (baseline configuration), CM-6 (configuration settings), CM-8 (information system component inventory) | P2/P6 versioned specifications and baselines | Model versions, agent configurations, and MCP tool connections are CM items; deviations from baseline require CM board approval |
| Incident Response (IR) | IR-4 (incident handling), IR-6 (incident reporting) | P12 accountability, P9 traces | Agent-related incidents must follow the organizational IR plan; traces support rapid incident diagnosis |
| Risk Assessment (RA) | RA-3 (risk assessment), RA-5 (vulnerability scanning) | P3/P5/P10 defense-in-depth | Formal risk assessment of agent systems with explicit consideration of AI-specific threat vectors (prompt injection, model poisoning, data exfiltration) |
| System and Services Acquisition (SA) | SA-4 (acquisition process), SA-9 (external information system services) | P11 multi-model routing | LLM providers are external system services subject to SA-9; supply chain risk management (SR family) applies |

---

## ITAR / EAR Export Control

ITAR (22 CFR 120-130) and EAR (15 CFR 730-774) are the primary export
control frameworks for defense and dual-use technology. For agent systems
in defense development contexts, these are not secondary considerations —
they are fundamental constraints on infrastructure architecture.

### What Constitutes an Export

Under ITAR/EAR, transmitting controlled technical data to a non-US-person
or to a foreign country constitutes an "export" — even if the transmission
is digital and within the same organization. Agent systems that process
controlled technical data must be designed to prevent inadvertent export.

### Agent-Specific Export Control Risks

| Risk | Scenario | Manifesto Mitigation |
|---|---|---|
| Data exfiltration via LLM API | Agent sends ITAR-controlled design data to a commercial LLM inference API | MCP allowlist restricts all external API calls for ITAR-classified sessions; no external calls allowed |
| Context window as export vehicle | Agent context containing controlled data is logged or transmitted outside the controlled boundary | Context classification enforcement: sessions with controlled data produce traces that stay within the controlled boundary only |
| Model training on controlled data | Controlled technical data enters model training pipeline | Explicit prohibition in agent system policy; infrastructure-level prevention via data classification gates |
| Foreign national access | Agent system accessible to non-US-persons in a multi-tenant cloud | Architecture requirement: ITAR-rated workloads run on US-person-only infrastructure; access controls verified by system security plan |

### Technology Control Plan Requirements for Agent Systems

Organizations with ITAR/EAR controlled programs must maintain a Technology
Control Plan (TCP). Agent systems handling controlled technical data must
be explicitly included in the TCP with:
1. Identification of controlled data flows through agent systems
2. Access controls preventing foreign national access
3. Monitoring and audit procedures for agent access to controlled data
4. Incident reporting procedures for unauthorized disclosure

---

## DoD Acquisition and Authority to Operate

Agent systems used in DoD programs must operate under an Authority to
Operate (ATO) granted by the Authorizing Official (AO). The ATO process
maps to the manifesto's governance model:

| ATO Stage | Manifesto Mechanism | Evidence Required |
|---|---|---|
| System categorization | P3 architecture; data classification matrix | FIPS 199 categorization; system boundary definition including all agent components |
| Security plan development | P5 autonomy tiers; P12 accountability | System security plan documenting agent configurations, autonomy tier assignments, and accountability structures |
| Security assessment | P8 evaluations; P9 traces | Security control assessment evidence; penetration testing for ASIL C/D equivalent programs |
| ATO decision | P12 named human accountability | AO decision with explicit residual risk acceptance; agent systems are in-scope for risk determination |
| Continuous monitoring | P9 observability; P10 containment | Ongoing monitoring plan; automated alerts for agent anomalies; periodic reauthorization |

**Zero Trust Architecture (ZTA) alignment.** DoD has mandated Zero Trust
Architecture adoption (DoD Zero Trust Strategy, 2022). Agent systems must
be consistent with ZTA principles: assume breach, verify explicitly, use
least privilege. The manifesto's tiered autonomy (P5), enforcement at
infrastructure level (P3), and comprehensive tracing (P9) are direct
implementations of ZTA principles in agentic systems.

---

## Market-Specific Autonomy Guidance

| Use Case | Classification Level | Recommended Autonomy | Notes |
|---|---|---|---|
| Unclassified development tooling (code generation, test automation) | Unclassified | Tier 1-3 | Standard manifesto adoption. CMMC Level 1 practices apply if FCI is involved. |
| CUI document processing and analysis | CUI | Tier 1-2 | Agents analyze and draft; human reviews before any CUI record is modified or transmitted. FedRAMP Moderate infrastructure required. |
| Requirements and traceability analysis | Unclassified / CUI | Tier 1-2 | High-value use case. Agent assembles traceability matrices; human qualified engineer validates. Evidence bundles support ATO documentation. |
| ITAR-controlled program development | ITAR technical data | Tier 1 (observe only) | ITAR compliance requires human control over all controlled technical data. Agent may analyze within the controlled boundary; no external API calls. |
| Classified program development | SECRET / TS | **Not permissible** | Non-accredited commercial AI systems are categorically excluded from classified programs. No exceptions without accredited system boundary and government authorization. Unclassified still requires access control, auditability, and change management. |
| Cybersecurity assessment and testing | Varies | Tier 1-2 | Agent assists vulnerability analysis and security assessment; ISSO/ISSM reviews and approves all findings before remediation actions. |
| Logistics and sustainment analytics | Unclassified | Tier 1-3 | Non-safety-critical domain; standard manifesto adoption. High-value opportunity for cost reduction. |

---

## Viable Starting Points

1. **Unclassified administrative and logistics software.** No classified
   data, no ITAR. Standard manifesto adoption applies. Natural pilot domain
   for building competency before tackling CMMC/FedRAMP requirements.

2. **CUI document analysis (Tier 1 observe).** Agents analyze CUI documents,
   extract requirements, identify inconsistencies, draft summaries. Human
   reviews all outputs before any CUI record is modified. FedRAMP Moderate
   infrastructure required.

3. **Requirements traceability for DoD programs.** Agents assemble
   specification-to-test-to-verification traceability matrices from program
   documentation. Qualified engineer validates completeness. Directly
   supports DI-IPSC-81433B data items and ATO documentation.

4. **CMMC evidence and documentation assembly.** Agents compile CMMC
   assessment evidence packages, security plan sections, and POA&M tracking.
   Reduces CMMC preparation cycle time while keeping human reviewers
   accountable for all compliance determinations.

5. **Software security analysis (Tier 1).** Agents perform static analysis,
   dependency scanning, and security posture assessment at Tier 1. ISSO
   reviews all findings. Human authorizes any remediation actions. No agent
   access to classified or ITAR-controlled components.

---

## Tool Configuration Notes

*How to configure agent tooling to satisfy CMMC and FedRAMP audit trail
requirements and export control data classification obligations.*

### Audit Trail Hook Mapping (NIST SP 800-53 AU family)

| NIST Control | Hook Type | What It Produces |
|---|---|---|
| AU-2 / AU-12 Event logging | PostToolUse audit hook | Agent identity, action type, success/failure, component accessed, timestamp — every event logged |
| AU-3 Content of audit records | PostToolUse with structured schema | Full structured trace including tool calls, data accessed, decision chain |
| AU-9 Protection of audit information | Separate audit log infrastructure | Traces written to tamper-evident, separately-backed-up store; no agent write access to its own audit log |
| AU-11 Audit record retention | Scheduled retention hook | Trace retention: minimum 3 years for CUI systems; format-migrated for long-term preservation |

### CUI Classification Enforcement

The MCP allowlist (Layer 6 in enterprise configuration) is the primary
infrastructure control for CUI data residency:
- CUI-handling sessions must be restricted to FedRAMP-authorized or
  on-premises infrastructure only. No external APIs without authorization.
- Session metadata must include a CUI indicator; traces for CUI sessions
  are handled and retained under CUI requirements.
- Data residency enforcement hook: PreToolUse hook checks the data
  classification of the session context; blocks external API calls for
  CUI-classified sessions.

### Model Version Pinning for ATO Stability

Pin model versions during ATO assessment periods and continuous monitoring
reviews:
- Behavioral changes from model updates may trigger a change request
  requiring AO review.
- Document model version in the system security plan as a CM item.
- Any model change affecting security-relevant behavior (output filtering,
  tool call behavior) must be assessed for ATO impact before deployment.

---

## Open Regulatory Questions

1. **FedRAMP authorization for frontier LLM providers.** The pathway for
   frontier LLM providers to obtain FedRAMP High authorization is complex
   and slow. Most commercially capable models are available only at FedRAMP
   Moderate or below as of early 2026. Monitor FedRAMP marketplace for
   updates; plan architecture to accommodate the current authorization
   landscape.

2. **CMMC scoping for agent systems.** How far does the CMMC assessment
   boundary extend for agent systems? Is the LLM API a third-party service
   subject to SA-9 controls, or is it in-scope as a system component? DIBCAC
   (Defense Industrial Base Cybersecurity Assessment Center) has not issued
   definitive guidance on LLM API scoping.

3. **AI in weapons systems and autonomous functions.** DoD Directive 3000.09
   governs autonomous weapons systems. This document does not address weapons
   systems development. Teams working on programs subject to 3000.09 should
   seek specific guidance from the program legal and policy advisors.

4. **Zero Trust and agent identity.** DoD's Zero Trust Architecture requires
   explicit identity verification for every access request. Agent identity
   (as distinct from human operator identity) must be established in a
   standards-based way. No published DoD standard addresses agent identity
   in the ZTA context; the most current guidance treats agents as service
   accounts, but this is likely insufficient for the autonomy levels the
   manifesto describes.

5. **CUI in agent training and fine-tuning.** Using CUI data to fine-tune
   models creates a complex set of obligations: the fine-tuned model may
   "memorize" CUI that could be extracted later. No regulatory guidance
   addresses this risk specifically. Conservative position: do not use CUI
   for model fine-tuning without explicit legal and security review.
