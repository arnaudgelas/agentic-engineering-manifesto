# Pharma / Life Sciences Regulatory Alignment Mapping

*Maps the [Agentic Engineering Manifesto](../manifesto.md) principles to
pharmaceutical and life sciences regulatory frameworks.*

> **Disclaimer** — This document maps concepts from the Agentic Engineering
> Manifesto to pharmaceutical and life sciences regulatory frameworks. It does
> not constitute compliance or regulatory advice. Consult qualified regulatory
> and quality professionals for compliance determinations.
>
> **Regulatory currency:** This document reflects GAMP 5 (2nd ed. 2022),
> FDA 21 CFR Part 11, EU Annex 11, ICH Q10, and EMA guidance as understood
> at the time of last review. FDA and EMA guidance on AI/ML in regulated
> manufacturing is actively evolving. **Last reviewed: April 2026.**
> Proposed changes not yet enacted are flagged as such.

Related documents:
[Companion Frameworks](../companion-frameworks.md) (boundary conditions, ALCOA+ mapping) |
[V-Model Adoption Path](../adoption-vmodel.md) |
[Manifesto Principles](../manifesto-principles.md)

**Canonical sources.** Normative principle definitions (P1–P12) and autonomy
tier definitions are in [manifesto-principles.md](../manifesto-principles.md).
This document maps those definitions to pharmaceutical regulatory requirements;
it does not redefine them.

---

## 1. GAMP 5 Category Mapping

These mappings are pragmatic classifications, not formal GAMP rulings.

GAMP 5 (2nd edition, 2022) categorizes computerized systems for risk-based
validation. The table below maps each category to its agentic engineering
equivalent and the manifesto mechanism that governs it.

| GAMP Cat | Description | Agent Context | Validation Approach | Manifesto Mechanism |
|----------|-------------|---------------|---------------------|---------------------|
| **1 -- Infrastructure** | OS, databases, networking | Agent runtime infrastructure (container host, network layer, database engine) | Minimal -- qualify as part of platform | P3 architecture enforcement; infrastructure treated as deterministic wrapper |
| **3 -- Non-Configured** | COTS used as-is | LLM API consumed without customization; off-the-shelf agent framework with default settings | Verification of output against intended use; supplier documentation leveraged | P8 evaluation portfolios verify outputs; supplier qualification per GAMP Appendix O3 |
| **4 -- Configured** | Products configured for intended use | Agent system configured via prompts, skills, tool permissions, autonomy tiers | Configuration-focused validation; verify each configured parameter behaves as intended | P2 living specifications; P5 autonomy tiers as validated configuration; P7 context engineering |
| **5 -- Custom** | Bespoke software | Agent-generated code; custom tool integrations; bespoke orchestration logic | Full risk-based validation per GAMP lifecycle | P1 outcome evidence; P8 evaluations as contract; P9 structured traces for traceability |

**Open question: Is the agent system itself Category 3 or Category 4?**

An LLM API used with default parameters is arguably Category 3. The same API
used with system prompts, configured tools, and autonomy tier enforcement is
Category 4. Most production agent deployments are Category 4 at minimum. The
categorization determines validation burden and must be justified in the
system's validation plan. Where agent-generated code is deployed, that code
is Category 5 regardless of the system that produced it.

**Agent-selected dependencies.** When an agent pulls in a library or
framework, it is implicitly making a GAMP categorization decision. The
manifesto's P3 (architecture as defense-in-depth) provides the mechanism --
allowlists and tool permissions -- but the GAMP implications must be
explicitly addressed: each agent-selected dependency inherits a category and
validation obligation that the deploying organization owns.

**GAMP 5 2nd edition "critical thinking" alignment.** The 2022 revision
emphasizes critical thinking over rote compliance -- a philosophy shared with
the manifesto. GAMP 5's risk-based approach to validation effort maps to the
manifesto's phase-calibrated evidence: higher risk demands more rigorous
evaluation, not more documentation.

---

## 2. Computer Software Assurance (CSA) Alignment

The FDA's 2022 CSA guidance replaces traditional CSV with risk-based,
critical-thinking-driven assurance. This is the strongest alignment point
between the manifesto and pharma regulation.

| CSV (Traditional) | CSA (2022) | Manifesto Alignment |
|--------------------|------------|---------------------|
| Document everything | Risk-based documentation | Evidence bundles scaled by risk tier (P1) |
| Scripted testing only | Unscripted + scripted testing | Evaluation portfolios with adversarial cases (P8) |
| Compliance theater | Critical thinking | Outcomes over assertions (P1); verified outcomes over fluent assertions |
| Test to the script | Test to the risk | Phase-calibrated evidence; chaos testing (P10) |
| Every IQ/OQ/PQ step documented | Assurance commensurate with risk | Autonomy tiers match risk (P5); evidence bundles gated by phase |
| Scripted execution as proof | Intended use drives assurance | Specification-first approach (P2); validation distinct from verification |
| Compliance as end-state | Continual assurance | Agentic Loop (Observe, Learn, Govern) as living assurance cycle |

**Strategic context.** The manifesto is an engineering framework that
operationalizes CSA's philosophy. CSA calls for risk-based,
critical-thinking-driven assurance but does not prescribe the engineering
discipline to implement it. The manifesto provides that discipline:
specifications as living artifacts (P2), evaluations as contracts (P8),
structured traces for auditability (P9), and tiered autonomy calibrated to
risk (P5). Organizations struggling to operationalize CSA can adopt the
manifesto's engineering practices as a CSA implementation framework.

Most pharma companies understand CSA's intent but lack the engineering
practices to execute it. The manifesto fills that gap -- not as a compliance
framework, but as the engineering discipline that produces CSA-aligned evidence
by construction.

**CSA principle-to-manifesto detail.**

| CSA Principle | Manifesto Implementation |
|---------------|--------------------------|
| "Assurance activities commensurate with risk" | Phase-calibrated evidence bundles (P1); autonomy tiers scaled to risk (P5) |
| "Use of unscripted testing" | Adversarial evaluation cases (P8); chaos testing (P10) |
| "Critical thinking over scripted compliance" | Outcomes as unit of work (P1); evaluations as contract, not checklist (P8) |
| "Intended use drives assurance" | Specification-first approach (P2); validation distinct from verification (Agentic Loop) |
| "Leverage supplier testing" | Agent-generated evidence bundles as supplier evidence (P1, P8) |

This alignment is structural, not retrofitted. The manifesto's evidence model
produces CSA-compatible artifacts as a byproduct of its engineering discipline.
Organizations adopting the manifesto for agentic delivery simultaneously
produce documentation that satisfies CSA expectations -- without a separate
compliance workstream.

---

## 3. 21 CFR Part 11 / EU Annex 11 Mapping

| Requirement | Regulation | Manifesto Mechanism | Alignment | Gap |
|-------------|------------|---------------------|-----------|-----|
| Audit trails | Part 11 s 11.10(e); Annex 11 s 9 | P9 structured traces -- every agent action produces inspectable trace with decision chain | Good fit | Agent system configuration changes (prompt edits, tier adjustments, tool additions) require their own audit trail beyond action traces |
| Electronic signatures | Part 11 s 11.50-11.100; Annex 11 s 14 | P12 accountability -- humans own outcomes, approvals, risk acceptance | Partial | Agent-produced records entering GxP systems may require legally valid electronic signatures; manifesto does not address signature binding |
| System access controls | Part 11 s 11.10(d); Annex 11 s 12 | P5 autonomy tiers with granular permissions (read/write, deploy scope, data access) | Good fit | -- |
| Closed vs. open system | Part 11 s 11.30 | P3 architecture as defense-in-depth; deterministic wrappers around probabilistic AI | Partial | No classification guidance for whether agent systems with external API calls constitute open systems |
| Data backup and recovery | Annex 11 s 7.1 | P6 memory governance -- rollback, provenance, expiration | Partial | Memory governance covers learned memory; GxP backup requirements extend to all system data and configuration |
| Validation | Part 11 s 11.10(a); Annex 11 s 4 | P8 evaluations as contract; evidence bundles per P1 | Partial | No explicit IQ/OQ/PQ mapping (see section 7 below) |
| Operational checks | Part 11 s 11.10(f) | P10 containment engineering -- circuit breakers, rate limits, safe fallbacks | Good fit | -- |
| Authority checks | Part 11 s 11.10(g) | P5 tier enforcement -- actions gated by tier and permission scope | Good fit | -- |
| Record retention | Part 11 s 11.10(c); Annex 11 s 17 | P9 trace retention as infrastructure requirement; ALCOA+ "Enduring" criterion | Good fit | Retention periods and format migration for agent traces need specification per GxP context |

---

## 4. GxP Context Differentiation

| GxP Context | Key Regulations | Agent Use Cases | Risk Profile | Recommended Max Autonomy |
|-------------|-----------------|-----------------|--------------|--------------------------|
| **GMP** (Manufacturing) | 21 CFR 210/211, EU GMP Annex 11, PIC/S | Batch record review, deviation trending, CAPA root cause analysis, process analytical technology (PAT) | **High** -- errors affect product quality and patient safety; manufacturing records are legal quality documents | **Tier 1** (Observe) -- agents analyze and propose; human executes all GMP record modifications |
| **GLP** (Laboratory) | 21 CFR Part 58, OECD GLP Principles | Protocol drafting, data analysis, literature review, study report compilation | **Medium** -- errors compromise study integrity and regulatory submission basis; raw data integrity is absolute | **Tier 1-2** (Observe/Branch) -- agents draft in isolation; human reviews and approves; agents must never modify raw data |
| **GCP** (Clinical) | ICH E6(R3), 21 CFR 50/56/312, EU CTR | Protocol design assistance, site feasibility, patient matching, medical coding (MedDRA), safety signal detection | **Medium-High** -- errors affect patient safety or trial integrity; ICH E6(R3) "fit-for-purpose" quality management applies | **Tier 1-2** (Observe/Branch) -- agents assist under human governance; causality assessment and patient-facing decisions remain human-owned |

**Differentiating factor.** The manifesto treats "regulated industries" as a
category. Pharma practitioners operate in specific GxP contexts with distinct
requirements. GMP imposes the heaviest constraints on agent autonomy because
manufacturing records are legal quality documents subject to Part 11. GLP
permits more agent involvement in analysis but enforces absolute raw data
integrity. GCP benefits most from ICH E6(R3)'s "fit-for-purpose" alignment
with the manifesto's risk-tiered approach.

**Use-case risk graduation.** Organizations can adopt agentic engineering
incrementally across GxP contexts:

| Use-Case Domain | Regulatory Burden | Starting Autonomy | Expansion Path |
|-----------------|-------------------|-------------------|----------------|
| Drug discovery / research | Low | Tier 2-3 | Manifesto applies directly; minimal regulatory overlay |
| Regulatory affairs | Medium (high value) | Tier 1-2 | Dossier assembly, consistency checking; submission content human-approved |
| Clinical operations (GCP) | Medium | Tier 1-2 | Agents assist; ICH E6(R3) fit-for-purpose quality management applies |
| Pharmacovigilance | Medium-High | Tier 1 | Signal detection, ICSR triage; causality assessment human-owned |
| Manufacturing (GMP) | High | Tier 1 | Batch record review, deviation analysis; agent modification of GMP records requires full Part 11 compliance |

---

## 5. ICH Guidelines Mapping

| ICH Guideline | Core Concept | Relevance to Agentic Engineering | Manifesto Alignment |
|---------------|-------------|----------------------------------|---------------------|
| **Q8** (Pharmaceutical Development) | Design Space -- operating ranges within which changes do not require regulatory notification | Tier 2 autonomy within established boundaries; agents operate freely within a validated Design Space, escalate outside it | P5 autonomy tiers: Tier 2 (Branch) maps to operation within Design Space; boundary crossing triggers Tier 3 governance |
| **Q9** (Quality Risk Management) | Risk-based approach to quality decisions; severity, probability, detectability | Risk assessment drives autonomy level, evidence requirements, and validation depth | P5 risk-tiered autonomy; P8 phase-calibrated evidence; P11 economics of intelligence (cost of correctness includes risk) |
| **Q10** (Pharmaceutical Quality System) | Continual improvement; knowledge management; management review | Agentic Loop (Observe, Learn, Govern) as a continual improvement engine; P6 knowledge vs. learned memory distinction | P6 knowledge infrastructure; P9 observability for management review; Agentic Loop as PQS implementation mechanism |
| **Q12** (Lifecycle Management) | Established conditions; post-approval changes; reporting categories | Revalidation triggers when agent behavior changes; model version updates as post-approval changes; change classification | P2 living specifications; change control for model versions, prompt modifications, and memory accumulation |
| **E6(R3)** (GCP) | "Fit-for-purpose" quality management; proportionate approaches; risk-based monitoring | Risk-tiered governance for clinical agent applications; assurance proportionate to decision impact | P5 autonomy tiers; P8 evaluations scaled to risk; manifesto's risk-based philosophy mirrors E6(R3)'s proportionality principle |

---

## 6. IQ/OQ/PQ Framework for Agent Systems

The pharma qualification framework maps to the manifesto's engineering
practices as follows.

| Qualification Stage | Traditional Scope | Agent System Equivalent | Manifesto Mechanism |
|---------------------|-------------------|-------------------------|---------------------|
| **IQ** (Installation Qualification) | System installed per specification; hardware and software verified | Agent runtime installed; model versions locked and documented; tool connections verified; infrastructure (Cat 1) validated; configuration baselines captured | P3 architecture enforcement; P2 versioned specifications; infrastructure as deterministic wrapper |
| **OQ** (Operational Qualification) | System operates as intended within specified ranges | Agent produces correct outputs for defined test cases; autonomy tiers enforce correctly; traces capture completely; error handling and escalation paths verified | P8 evaluation portfolios; P5 tier enforcement verification; P9 observability validation |
| **PQ** (Performance Qualification) | System performs consistently under production conditions over time | Agent performs reliably under production load and data volumes over an extended period; drift detection active; evidence bundles generated consistently | P9 observability and drift monitoring; P10 resilience under stress; P1 outcome evidence over sustained operation |

**Mapping note.** IQ/OQ/PQ is a sequential qualification framework. The
manifesto's Agentic Loop is continuous. In practice, IQ/OQ/PQ establishes
the initial validated state; the Agentic Loop (Observe, Learn, Govern)
maintains that state through ongoing operation. Requalification is triggered
by changes per the organization's change control procedure -- see section 9.

**IQ/OQ/PQ evidence mapping.**

| Stage | Required Evidence (Traditional) | Agent System Evidence (Manifesto) |
|-------|--------------------------------|-----------------------------------|
| IQ | Installation records, version logs, configuration screenshots | P2 versioned specification snapshot; P3 infrastructure-as-code manifests; model version hash; tool connection test results |
| OQ | Test protocols, test results, deviation reports | P8 evaluation portfolio results; P5 tier enforcement test logs; P9 trace completeness verification |
| PQ | Production run records, performance trending | P9 observability dashboards; P1 evidence bundle consistency over time; P10 resilience metrics under production load |

---

## 7. Data Integrity for Agent Systems

ALCOA+ is the foundational data integrity framework for pharma and GxP. The
manifesto's ALCOA+ mapping in [companion-frameworks.md](../companion-frameworks.md)
covers software development records. Pharma operational records require
additional consideration.

| Data Integrity Concern | Regulatory Basis | Agent-Specific Consideration |
|------------------------|-----------------|------------------------------|
| Agent-generated data as "original" data | 21 CFR 211.68; Annex 11 s 8 | When an agent generates a calculation, trend, or summary entering a batch record or clinical database, the source record must be defined. The agent's input data and logic trace constitute the source. |
| Agent-modified data | Annex 11 s 9; Part 11 s 11.10(e) | Audit trail must capture: original value, new value, reason for change, who authorized the change, timestamp. The manifesto's P9 traces cover agent actions; the authorization chain (P12) must link to a named human. |
| Metadata preservation | WHO Data Integrity Guidance; PIC/S PI 041 | Agents processing GxP data must preserve timestamps, user IDs, system IDs, and audit metadata. Transformation or reprocessing must not corrupt metadata. |
| Data access classification | P5 autonomy tiers | Which GxP data can agents access? Define per data classification: read-only for raw data (GLP), read-only for batch records (GMP), read-write for draft documents only, no access to restricted patient-level data without additional controls. |

**Data access matrix by GxP context.**

| Data Type | GMP Access | GLP Access | GCP Access | Rationale |
|-----------|-----------|-----------|-----------|-----------|
| Raw / source data | Read-only | Read-only (absolute) | Read-only | Raw data integrity is non-negotiable across all GxP contexts |
| Batch records | Read-only | N/A | N/A | Legal quality documents; modifications require human execution with Part 11 signatures |
| Draft documents | Read-write | Read-write | Read-write | Agents draft; humans review and approve before documents enter the quality system |
| Calculated / derived data | Read-write with trace | Read-write with trace | Read-write with trace | Agent must log input data, algorithm, and output; source traceability required |
| Patient-level data | N/A | N/A | Read-only with controls | Additional access controls, anonymization, and data protection requirements apply |

---

## 8. Supplier Qualification

Pharma requires supplier qualification for all critical suppliers of GxP
computerized systems.

| Supplier Qualification Aspect | Agent-Specific Consideration |
|-------------------------------|------------------------------|
| Vendor audit | LLM providers and agent framework vendors require assessment. Audit scope should include: data handling practices, model versioning, availability SLAs, security posture. |
| Quality agreement | Agreements with model providers must address: version notification, deprecation timelines, data confidentiality, uptime commitments, incident notification. |
| Ongoing performance monitoring | P9 observability provides richer monitoring data than traditional supplier review. Track: output quality drift, latency changes, availability, cost-per-query trends. |
| Open-source models | No traditional "supplier" exists. The deploying organization assumes full supplier responsibility: validation, maintenance, version control, incident response. Document this in the validation plan. |
| Multi-vendor routing | P11 economics-aware routing means multiple model providers. Each requires qualification. Routing logic itself is a validated configuration (GAMP Cat 4). |

**Open regulatory issue: who is the "supplier" for open-source models?**

GAMP 5 and EU GMP Chapter 7 assume an identifiable supplier with a quality
system. Open-source foundation models have no such entity. The deploying
organization must formally document that it assumes supplier responsibilities
-- including validation, ongoing monitoring, version control, anomaly
tracking, and incident response. This represents a significant resource
commitment that must be factored into the build-vs-buy decision for GxP
agent deployments.

---

## 9. Change Control Considerations

Treat model updates, prompt edits, tool changes, and memory growth as distinct
change classes; they carry different validation scopes and requalification burdens.

| Change Type | Pharma Change Control Implication | Manifesto Mechanism | Open Question |
|-------------|----------------------------------|---------------------|---------------|
| Model version update | Change to a validated system; requires impact assessment and potential requalification (OQ minimum) | P2 living specifications; revalidation triggers in Agentic Loop | What is the minimum requalification scope for a minor model version change vs. a major version change? |
| Prompt / specification modification | Configuration change to a Cat 4 system; requires change control record | P2 versioned specifications; P9 traces capture specification version | Should prompt changes follow the same change control rigor as software configuration changes? |
| Tool addition or removal | System boundary change; may affect GAMP categorization and validation scope | P3 architecture enforcement; P4 swarm topology | Does adding a tool to an agent's toolkit constitute a change requiring full OQ? |
| Memory accumulation | Agent behavior changes as learned memory grows; this is a novel change type | P6 memory governance -- expiration, rollback, provenance | Is accumulated memory a change requiring change control? At what threshold? |
| Autonomy tier adjustment | Risk profile change; requires risk assessment and potential requalification | P5 tiered autonomy; P12 accountability | Tier escalation (1 to 2) requires documented risk acceptance. Does de-escalation? |
| Periodic review | Annual review obligation remains regardless of continuous monitoring | P9 continuous observability provides richer data than traditional periodic review | How does continuous observability supplement or replace the annual periodic review? |

---

## 10. Viable Starting Points

Not all pharma workflows carry equal GxP burden. The following are realistic
entry points for agentic engineering practices today:

1. **Drug discovery and early research (no GxP obligations).** Manifesto
   applies directly with minimal regulatory overlay. Natural pilot domain.
   Use to build team competency and evidence practices before GxP contexts.

2. **Regulatory dossier consistency checking.** Agents cross-check submission
   sections for internal consistency, identify gaps against CTD format
   requirements, and flag cross-references. Regulatory affairs professional
   approves before submission. High-value use case; Tier 1-2 natural ceiling.

3. **Deviation trending and CAPA root cause assistance.** Agents analyze
   deviation databases, identify patterns, and draft initial root cause
   analyses for human review. Reduces investigation cycle time. No GMP record
   modification — observe only.

4. **Pharmacovigilance signal detection.** Agents analyze ICSR data and
   literature for emerging safety signals. Qualified pharmacovigilance
   professional reviews all findings before regulatory reporting. Contained
   blast radius; significant value at Tier 1 observe.

5. **Protocol drafting assistance (GLP, GCP).** Agents draft study protocol
   sections from templates and prior studies. Principal investigator or
   sponsor review and approval before finalization. Strong alignment with
   ICH E6(R3) "fit-for-purpose" quality management.

6. **IQ/OQ/PQ evidence assembly.** Agents format and compile qualification
   evidence packages from evaluation results. Qualified person signs off.
   Reduces validation cycle time while preserving human accountability for
   all quality decisions.

---

## 11. Hard Autonomy Caps

The following caps apply regardless of organizational maturity phase.
They are derived from GxP data integrity requirements, not from risk
preference.

| Use Case | Maximum Tier | Regulatory Basis | Key Constraint |
|---|---|---|---|
| GMP batch record modification | **Tier 1** (observe only) | 21 CFR 211.68; EU GMP Annex 11 §9; Part 11 | Batch records are legal quality documents. Agents may analyze; humans execute all modifications with Part 11 electronic signatures. |
| GMP manufacturing instructions | **Tier 1** (observe only) | EU GMP Chapter 4; 21 CFR 211 | Agent may draft; qualified person reviews and approves before issuance to production. |
| GLP raw data | **Tier 1** (observe only) | 21 CFR Part 58; OECD GLP Principles | Raw data integrity is absolute. Agents may read; agents must never modify raw data. |
| GCP patient-facing decisions / causality | **Tier 1** (observe only) | ICH E6(R3); 21 CFR 50/56 | Causality assessment and any patient safety decision requires qualified human judgment. |
| Regulatory submission content | **Tier 2** max | FDA, EMA submission regulations | Agent drafts and consistency-checks; regulatory affairs professional approves before submission. |
| Drug discovery / early research | **Tier 3** available | Minimal GxP overlay | Standard manifesto adoption applies. No GxP obligations for pre-IND research. |
| Pharmacovigilance (ICSR triage, signal detection) | **Tier 1-2** | ICH E2A/E2B/E2C; EudraVigilance | Agent assists signal detection and ICSR assembly; qualified pharmacovigilance professional reviews every case before reporting. |

---

## 12. Formal Verification Opportunity

Manifesto Principle 8 states: "proofs are a scale strategy." For pharma,
formal verification creates value in specific contexts:

### Process Analytical Technology (PAT) and Control Strategy

PAT models (ICH Q8, Q10) governing real-time release testing and process
control can benefit from formal verification of the control logic:

- **Process model contracts**: Formal preconditions and postconditions on
  analytical control algorithms can be machine-verified rather than validated
  through scripted testing alone.
- **Agent-generated PAT logic with formal proofs**: Agent-generated control
  logic accompanied by machine-checked proofs of correctness properties
  (no out-of-bounds, monotonicity of response) can produce a stronger
  validation case than test-only approaches.
- **FDA CSA alignment**: CSA's "use of unscripted testing" and "critical
  thinking over scripted compliance" principles support replacing exhaustive
  scripted test matrices with targeted formal verification on critical paths.

### Quantitative Structure-Activity Relationship (QSAR) and Pharmacokinetic Models

QSAR models and PK/PD algorithms used in drug development can benefit from:

- **Formal invariants**: Constraints on output ranges, monotonicity of
  dose-response relationships, and absence of undefined behavior formally
  verified rather than tested across a finite sample.
- **Contract-first specification (P2)**: Specify model constraints as formal
  contracts before implementation. Agent-generated model code verified against
  the formal contract by a model checker provides stronger evidence than
  equivalence testing alone.

### Practical Entry Point

Formal methods do not require a full theorem-proving infrastructure. The
practical entry is executable specification: write GxP acceptance criteria
as machine-checkable assertions (postconditions on calculations, invariants
on data ranges). These serve simultaneously as human-readable requirements
and automated verification inputs — collapsing the gap between specification
and test evidence. This is directly compatible with CSA's intent and
eliminates the overhead of scripted test protocol generation.

---

## 13. Tool Configuration Notes

*How to configure agent tooling to satisfy 21 CFR Part 11 / EU Annex 11
audit trail requirements and GxP data integrity obligations.*

### Audit Trail Hook Mapping

| GxP Requirement | Hook Type | What It Produces |
|---|---|---|
| Audit trail — agent actions on GxP data | PostToolUse audit hook | Timestamp, user/agent identity, action type, before/after values, reason |
| Electronic signatures for GxP records | PreToolUse signature gate | Named qualified person approval with binding electronic signature |
| System access controls | PreToolUse RBAC hook | Access check record; unauthorized access attempts logged |
| Configuration change audit trail | PostToolUse config hook | Specification version changes, prompt modifications, tier adjustments logged |
| Data backup and recovery verification | Scheduled PostToolUse | Periodic archive integrity check |
| Operational checks (circuit breakers) | PreToolUse system check | Agent health check; blocks execution if system state outside validated range |

### GxP Data Classification Enforcement

The MCP allowlist (Layer 6 in enterprise configuration) is the primary
data residency control for GxP systems:

| Data Classification | Agent Access | Routing Constraint |
|---|---|---|
| Raw / source data (GMP, GLP) | Read-only | On-premises or validated private cloud only; no external API |
| Batch records and GMP quality records | Read-only | On-premises only; any agent access logged as a Part 11 event |
| Draft documents | Read-write with audit trail | Approved models with signed DPA; agent writes to draft state only |
| Restricted patient-level data | Read-only with additional controls | Anonymization layer required; local inference preferred |

### GAMP Validation of the Agent Infrastructure

The agent runtime itself is a GAMP Category 4 or 5 system:
- **IQ evidence**: Configuration-as-code (specifications, tool permissions,
  tier settings, model version pins) captured in the version-controlled
  configuration repository.
- **OQ evidence**: Evaluation portfolio results (P8); tier enforcement test
  logs (P5); trace completeness verification (P9).
- **PQ evidence**: Production performance metrics (P9); drift detection
  records; evidence bundle consistency over time (P1).

The configuration repository is the IQ record. Point auditors to it — it
is the answer to "show me your validated system configuration."

---

## 14. Open Regulatory Questions

These questions are unresolved at the intersection of agentic engineering and
pharma regulation. They are listed here to support regulatory strategy
discussions, not to imply that answers exist.

| # | Question | Regulatory Context | Manifesto Reference |
|---|----------|-------------------|---------------------|
| 1 | How should agent systems be categorized under GAMP 5 -- Category 3, 4, or a new category? | GAMP 5 (2nd ed.) | P3, P5 |
| 2 | Do agent-generated GxP records satisfy Part 11 requirements for electronic records? | 21 CFR Part 11 | P9, P12 |
| 3 | What validation approach applies to systems whose behavior changes through learning? | GAMP 5; CSA | P6, P8 |
| 4 | Is a model version change equivalent to a software version change for change control purposes? | EU GMP Annex 11 s 10; ICH Q10 | P2 |
| 5 | Does prompt modification constitute a configuration change requiring formal change control? | GAMP 5 Cat 4; Annex 11 s 10 | P2, P7 |
| 6 | At what point does memory accumulation constitute a change to a validated system? | GAMP 5; Annex 11 s 11 | P6 |
| 7 | Can agent-generated evidence bundles serve as supplier documentation under CSA's "leverage supplier testing" principle? | FDA CSA | P1, P8 |
| 8 | What constitutes an adequate quality agreement with an LLM provider for GxP use? | EU GMP Chapter 7; ICH Q10 | P11 |
| 9 | How should agent systems be classified as open or closed systems under Part 11? | 21 CFR Part 11 s 11.30 | P3 |
| 10 | Does continuous observability (P9) satisfy or supplement periodic review obligations? | EU GMP Annex 11 s 11 | P9 |

These questions reflect the current state of regulatory uncertainty. As
regulatory bodies issue guidance on AI in GxP environments, this section
should be revisited and questions resolved or refined. Organizations should
track FDA, EMA, MHRA, and PIC/S publications for emerging positions.

---

## Appendix A: Alignment Summary by Manifesto Principle

| Principle | GAMP 5 | CSA | Part 11 / Annex 11 | GxP (GMP/GLP/GCP) | ICH Q8-Q12 / E6(R3) |
|-----------|--------|-----|---------------------|--------------------|----------------------|
| P1 Outcomes | Cat 5 validation evidence | Risk-based documentation | Record retention | Evidence across all GxP | Q10 continual improvement |
| P2 Specifications | Cat 4 configuration | Intended use drives assurance | -- | Protocol / specification management | Q12 established conditions |
| P3 Architecture | Category boundary enforcement | -- | Closed/open system classification | System boundary definition | -- |
| P5 Autonomy | Risk-based validation depth | Assurance commensurate with risk | Access controls; authority checks | Tier caps per GxP context | Q8 Design Space; Q9 risk management |
| P6 Memory | -- | -- | Data backup and recovery | Raw data integrity | Q10 knowledge management |
| P8 Evaluations | Validation testing | Unscripted + scripted testing | Validation of computerized systems | IQ/OQ/PQ framework | E6(R3) fit-for-purpose QM |
| P9 Observability | -- | -- | Audit trails; operational checks | Audit trail across GxP | Q10 management review |
| P10 Containment | -- | -- | Operational checks | -- | Q9 risk controls |
| P12 Accountability | -- | Critical thinking | Electronic signatures | Human ownership of GxP records | E6(R3) sponsor/investigator responsibility |

---

## Appendix B: Principle Quick Reference

Manifesto principles referenced throughout this document.

| Ref | Principle | Core Concept |
|-----|-----------|-------------|
| P1 | Outcomes are the unit of work | Evidence bundles; deployed, instrumented, evaluated |
| P2 | Specifications are living artifacts | Versioned, reviewable, machine-readable |
| P3 | Architecture is defense-in-depth | Deterministic wrappers; enforced boundaries |
| P4 | Right-size the swarm | Topology matched to complexity |
| P5 | Autonomy is a tiered budget | Tier 1 Observe / Tier 2 Branch / Tier 3 Commit |
| P6 | Knowledge and memory are distinct | Knowledge (ground truth) vs. learned memory (heuristic) |
| P7 | Context is engineered like code | Versioned, tested, performance-benchmarked |
| P8 | Evaluations are the contract | Evaluation portfolios; regression gates |
| P9 | Observability covers reasoning | Structured traces; audit trails; interoperability |
| P10 | Assume emergence; engineer containment | Circuit breakers; chaos testing; safe fallbacks |
| P11 | Optimize economics of intelligence | Cost of correctness; dynamic model routing |
| P12 | Accountability requires visibility | Human ownership; incident attribution |
