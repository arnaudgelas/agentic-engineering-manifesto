# Medical Device Regulatory Alignment Mapping

*Mapping the [Agentic Engineering Manifesto](../manifesto.md) to medical device
regulatory frameworks.*

> **Disclaimer** -- This document maps concepts from the Agentic Engineering
> Manifesto to medical device regulatory frameworks. It does not constitute
> compliance or regulatory advice. Consult qualified regulatory and quality
> professionals for compliance determinations.

See also: [Companion Frameworks](../companion-frameworks.md) (boundary
conditions, ALCOA+ mapping), [Agentic V-Model](../adoption-vmodel.md)
(V-model lifecycle transition for regulated industries).

---

## IEC 62304 Safety Class to Manifesto Autonomy Mapping

IEC 62304 safety classification determines documentation depth, verification
rigor, and -- in this mapping -- the permissible agent autonomy ceiling. The
2026 update is expected to collapse Classes A and B; until published, map
conservatively to the three-class model.

| Safety Class | Risk Level | Max Agent Autonomy | Documentation Depth | Evidence Bundle Requirements |
|---|---|---|---|---|
| **Class A** (no injury) | Negligible | Tier 1-3 (P5). Full agentic loop permissible. | Minimal: requirements + release documentation. | Standard evidence bundles per manifesto phase. |
| **Class B** (non-serious injury) | Moderate | Tier 1-2 (P5). Agents propose; humans approve merges. | Moderate: architecture + integration testing required. | Enhanced bundles with SOUP risk analysis per item. |
| **Class C** (death / serious injury) | High | Tier 1 only (P5). Agents analyze and propose; humans implement. | Full: detailed design + unit-level verification required. | Complete bundles with SOUP verification, unit-level trace, formal risk linkage. |

Notes:
- Autonomy ceilings are conservative defaults. Organizations may justify
  narrower or wider bounds through documented risk-benefit analysis.
- Class C Tier 1 restriction means agents assist with analysis, traceability
  matrix generation, and test scaffolding -- not code generation for
  safety-critical paths.
- If the 2026 IEC 62304 update merges Class A and B into a single class,
  re-evaluate the Tier 1-2 boundary for the merged class based on the
  updated documentation requirements.
- Evidence bundle requirements scale with safety class. Class C bundles must
  include unit-level traceability from requirement through design, implementation,
  and verification -- satisfying IEC 62304 Clause 5.6 in full.

---

## IEC 62304 Software Lifecycle to Manifesto Mapping

| IEC 62304 Activity | Clause | Manifesto Equivalent | Principle | Alignment | Gap |
|---|---|---|---|---|---|
| Software development planning | 5.1 | Specification + Plan phases of Agentic Loop | P2, P5 | Strong. Living specifications exceed static plans. | Plans must be frozen at submission; manifesto assumes evolution. Snapshot mechanism needed. |
| Software requirements analysis | 5.2 | Specify phase; machine-readable specs | P2 | Strong. Machine-readable specs satisfy traceability. | Requirements must include safety requirements traced to risk analysis (ISO 14971 linkage). |
| Software architectural design | 5.3 | Design phase; domain boundaries (P3) | P3 | Strong. Enforced boundaries map to software items. | Architecture must decompose to software items with assigned safety classes. |
| Software detailed design | 5.4 | Design phase (Class C depth) | P3 | Partial. Manifesto does not mandate unit-level design docs. | Class B/C require detailed design for each software unit. Agents can generate but humans must verify. |
| Unit implementation | 5.5 | Execute phase | P4, P5 | Partial. Agent execution replaces human coding. | Agent-as-tool qualification is unresolved (see Open Questions). |
| Unit verification | 5.6 | Verify phase; evaluation portfolio (P8) | P8 | Strong. Evaluation gates exceed minimal unit test requirements. | Must include static analysis, code review equivalent, and SOUP verification. |
| Integration and integration testing | 5.7 | Verify phase; integration evaluations | P8, P9 | Strong. Traces reconstruct cross-component interactions. | Integration must verify software item interfaces per architectural design. |
| System testing | 5.8 | Validate phase | P1, P8 | Strong. Outcome-based validation aligns directly. | System tests must trace to software requirements (5.2). |
| Software release | 5.9 | Govern phase; release evidence bundle | P12 | Strong. Evidence bundles with accountability satisfy release criteria. | Release must include version identification, known anomalies, and SOUP list. |
| Software maintenance | 5.10 | Learn + Govern phases; living specifications | P2, P6 | Strong. Continuous loop exceeds reactive maintenance. | Problem and modification analysis must follow change control procedures. |

---

## ISO 14971 Risk Management to Manifesto Mapping

| ISO 14971 Element | Clause | Manifesto Mechanism | Alignment |
|---|---|---|---|
| Intended use / reasonably foreseeable misuse | 4.2-4.3 | Specification scope (P2); boundary enforcement (P3) | Strong. Machine-enforced boundaries prevent foreseeable misuse categories. |
| Hazard identification | 5.2 | Adversarial testing (P8); chaos testing (P10) | Moderate. Manifesto identifies runtime hazards; clinical hazards require domain expertise outside agent scope. |
| Risk estimation | 5.4 | Observability data (P9); incident attribution (P12) | Moderate. Runtime data informs probability estimation; severity requires clinical judgment. |
| Risk evaluation | 5.5 | Autonomy tiering (P5); blast-radius limits | Moderate. Risk-based autonomy is philosophically aligned; acceptability criteria require manufacturer determination. |
| Risk control | 6 | Defense-in-depth (P3); deterministic wrappers; evaluation gates (P8) | Strong. Layered controls (wrappers + evaluations + observability) map to inherent safety, protective measures, and information for safety. |
| Residual risk evaluation | 7 | Evidence bundles; evaluation portfolio completeness | Partial. Manifesto does not explicitly model residual risk acceptance. Requires human risk-benefit judgment. |
| Production and post-production information | 8 | Observe + Learn phases; telemetry (P9) | Strong. Continuous observability exceeds traditional post-market surveillance data collection. |

**ISO/TS 24971-2 (ML-specific risk management):** Extends ISO 14971 for
ML-based medical devices. Key additions relevant to agentic systems:

- **Data quality risk**: training and inference data quality directly affects
  agent output quality. Manifesto's context engineering (P7) addresses data
  curation but does not prescribe medical-device-specific data quality metrics.
- **Model drift monitoring**: the manifesto's Observe phase and evaluation
  regression gates (P8) detect drift. ISO/TS 24971-2 requires drift to feed
  back into the risk management file.
- **Performance degradation detection**: continuous evaluation portfolios
  satisfy this requirement when evaluation thresholds are calibrated to
  clinically meaningful performance boundaries.
- **Uncertainty quantification**: ISO/TS 24971-2 expects ML systems to
  characterize output uncertainty. The manifesto does not mandate uncertainty
  quantification but its evaluation framework can incorporate it.

---

## ISO 13485 QMS to Manifesto Mapping

| ISO 13485 Requirement | Clause | Manifesto Mechanism | Notes |
|---|---|---|---|
| Design input | 7.3.3 | Specifications (P2); machine-readable requirements | Specs must include applicable regulatory requirements, standards, and risk control outputs. |
| Design output | 7.3.4 | Evidence bundles; verified artifacts | Outputs must reference design input requirements and include acceptance criteria. |
| Design review | 7.3.5 | Govern phase; human accountability (P12) | Named domain owner reviews at each design stage. Agent-generated artifacts are inputs to review, not substitutes. |
| Design verification | 7.3.6 | Verify phase; evaluation portfolio (P8) | Evaluation results serve as verification records when traced to design inputs. |
| Design validation | 7.3.7 | Validate phase; outcome-based acceptance (P1) | Validation must occur under defined use conditions. Simulated environments require justification. |
| Design transfer | 7.3.8 | Release evidence bundle; deployment records | Transfer procedures must ensure design outputs are verified before manufacturing. |
| Document control | 4.2.4 | Versioned specifications (P2); immutable evidence bundles | Manifesto versioning satisfies document control if retention and approval workflows are formalized. |
| Traceability | 7.5.9 | Trace infrastructure (P9); specification-to-outcome links | Structured traces exceed typical traceability matrices. Must extend to UDI and device identification. |
| CAPA | 8.5.2-3 | Learn phase; incident-driven specification updates | Manifesto's "failures are data" philosophy aligns. CAPA records must follow prescribed timelines and formats. |
| Management review | 5.6 | Govern phase; accountability (P12) | Requires periodic QMS effectiveness review. Manifesto governance is continuous but must produce discrete review records. |
| Purchasing controls | 7.4 | SOUP management; agent-selected dependencies | Supplier qualification applies to SOUP items. Agent-selected dependencies must go through purchasing/supplier evaluation. |

---

## SOUP / Agent-as-Tool in Medical Device Context

### SOUP Requirements by Safety Class

| Requirement | Class A | Class B | Class C |
|---|---|---|---|
| SOUP identification | Required | Required | Required |
| SOUP risk analysis | -- | Required | Required |
| Published anomaly list review | -- | Required | Required |
| SOUP functional/performance requirements | -- | Required | Required |
| SOUP verification (detailed) | -- | -- | Required |
| SOUP qualified via testing | -- | Recommended | Required |

### AI Model as SOUP

In agentic engineering, the AI model exhibits SOUP characteristics that exceed
traditional SOUP assumptions:

- **Non-deterministic**: identical inputs may produce different outputs across
  invocations, violating the implicit SOUP assumption of repeatable behavior.
- **Version-dependent**: model updates change behavior without explicit
  changelogs, making published anomaly list review impractical.
- **Opaque anomaly list**: failure modes cannot be enumerated a priori; the
  "published anomaly list" for a foundation model is effectively unbounded.

### Agent-Selected Dependencies as SOUP Decisions

When agents select libraries, frameworks, or code patterns during execution,
each selection is a SOUP decision that must be captured and evaluated. The
manifesto's trace infrastructure (P9) records these selections but does not
automatically trigger SOUP evaluation workflows.

### Training-Data Patterns as Implicit SOUP

Agent-generated code may incorporate patterns, algorithms, or architectural
decisions derived from training data. These constitute implicit SOUP -- code
of unknown provenance embedded without explicit dependency declaration.

### Manifesto Response

Treat the agent as an unqualified tool. Independently verify all agent output
through the evaluation portfolio (P8) and human review (P12). This is
consistent with the manifesto's position that agent assertions are never
evidence -- only verified outcomes count (P1).

Practical implication: for Class B and C devices, every agent execution that
produces deliverable artifacts must include a SOUP impact assessment in the
evidence bundle. This assessment identifies any new dependencies introduced,
any training-data-derived patterns detected (where feasible), and confirms
that independent verification was performed on the output.

See [Companion Frameworks -- Boundary Conditions](../companion-frameworks.md)
for SOUP treatment in the cross-cutting regulated-industry guidance.

---

## FDA SaMD / GMLP / PCCP

### Predetermined Change Control Plan (PCCP)

The FDA PCCP framework for AI/ML-based SaMD requires a pre-specified plan for
anticipated modifications. The manifesto's living specifications (P2) and
continuous revalidation triggers align structurally:

| PCCP Element | Manifesto Mechanism |
|---|---|
| Description of anticipated modifications | Living specifications with versioned change categories (P2) |
| Modification protocol (implementation, V&V) | Agentic Loop: Execute, Verify, Validate phases with evidence gates |
| Real-world performance monitoring plan | Observe + Learn phases; telemetry and drift detection (P9) |
| Revalidation triggers | Evaluation regression gates (P8); specification change triggers re-verification |

Gap: PCCP requires pre-submission of the change control plan. The manifesto's
continuous evolution must be bounded by the approved PCCP scope for marketed
SaMD.

### GMLP Principles to Manifesto Mapping

| GMLP Principle | Manifesto Principle | Alignment |
|---|---|---|
| Multi-disciplinary expertise | Right-sized swarm (P4); human domain ownership (P12) | Strong |
| Good software engineering practices | Architecture (P3); evaluations (P8) | Strong |
| Clinical association and scientific validity | Outside manifesto scope | Gap -- requires clinical expertise |
| Data quality assurance | Context engineering (P7); knowledge governance (P6) | Moderate |
| Data management and relevance | Memory curation (P6); versioned data (P7) | Moderate |
| Computational and statistical rigor | Evaluation portfolio (P8); formal verification | Strong |
| Study design transparency | Observability (P9); evidence bundles | Strong |
| Performance assessment across subgroups | Adversarial evaluations (P8) | Moderate |
| Independent datasets for testing | Evaluation design practice | Moderate -- not explicitly mandated |
| Monitoring and retraining | Observe + Learn phases (P9, P6) | Strong |

### Total Product Lifecycle (TPLC)

The FDA TPLC approach for AI/ML SaMD maps directly to the Agentic Loop.
Both assume continuous monitoring, learning, and modification rather than
a single pre-market snapshot.

| TPLC Stage | Agentic Loop Phase | Notes |
|---|---|---|
| Planning and development | Specify, Design, Plan | Manifesto specifications serve as the SaMD development plan. |
| Verification and validation | Execute, Verify, Validate | Evidence bundles document V&V activities per PCCP scope. |
| Deployment and monitoring | Observe, Learn | Real-world performance monitoring feeds back into specifications. |
| Modification and revalidation | Govern, Specify (repeat) | PCCP-scoped modifications trigger re-entry into the loop. |

The manifesto's loop (Specify-Design-Plan-Execute-Verify-Validate-Observe-
Learn-Govern) is a superset of the TPLC cycle. The key constraint: TPLC
modifications outside the approved PCCP scope require new regulatory
submissions.

---

## EU MDR + AI Act Dual Compliance

From August 2026, medical devices classified IIa or higher that incorporate
AI are automatically high-risk AI systems under the EU AI Act. This creates
dual compliance obligations.

| Requirement Source | Requirement | Manifesto Principle | Notes |
|---|---|---|---|
| AI Act Art. 10 | Data governance | P6 (Knowledge/Memory), P7 (Context) | Training, validation, and testing datasets must meet quality criteria. Manifesto's data curation aligns but must be formalized per Annex IV. |
| AI Act Art. 13 | Transparency | P9 (Observability) | Traces and decision reconstruction satisfy transparency requirements. Must include user-facing documentation per AI Act format. |
| AI Act Art. 14 | Human oversight | P5 (Autonomy tiers), P12 (Accountability) | Tiered autonomy with named human owners directly satisfies human oversight requirements. |
| AI Act Art. 15 | Accuracy, robustness, cybersecurity | P8 (Evaluations), P10 (Containment) | Evaluation portfolios and chaos testing address accuracy/robustness. Cybersecurity requires supplementary assessment. |
| MDR Annex I, Ch. I | General safety and performance | P1 (Outcomes), P3 (Architecture) | Risk-based design with verified outcomes. Clinical performance outside manifesto scope. |
| MDR Annex II | Technical documentation | P2 (Specifications), P9 (Observability) | Versioned specs + structured traces produce technical documentation artifacts. Format must comply with MDCG guidance. |
| MDR Art. 83-86 | Post-market surveillance / vigilance | P9 (Observability), Learn + Govern phases | Continuous observability exceeds minimum PMS requirements. Vigilance reporting timelines are regulatory obligations outside manifesto scope. |

Notes:
- Class IIa+ devices with AI components = high-risk AI system automatically
  under AI Act Article 6(1) via Annex I, Section A. No separate risk
  classification is needed on the AI Act side.
- Notified bodies must assess both MDR and AI Act conformity. A single
  evidence bundle strategy that satisfies both regimes reduces audit burden.
  The manifesto's evidence model is designed for this consolidation.
- AI Act conformity assessment may be integrated into the MDR conformity
  assessment procedure. Manufacturers should plan for a single, unified
  technical file that addresses both sets of requirements.
- AI Act Article 9 (risk management) overlaps significantly with ISO 14971.
  A single risk management file can serve both regimes if it addresses
  AI-specific risks (bias, drift, opacity) alongside device-level hazards.

---

## Clinical Evidence Boundary

Clinical evaluation (EU MDR Article 61), post-market clinical follow-up
(PMCF), and benefit-risk determination are explicitly **outside agent scope**.
These require clinical domain expertise, investigator judgment, and regulatory
strategy that agents cannot provide.

Agents may assist with:
- Traceability matrix generation between requirements and clinical evidence
- Evidence assembly and formatting for clinical evaluation reports
- Statistical analysis of post-market surveillance data
- Literature search and screening for clinical evaluation

Agents must NOT:
- Make clinical judgments or risk-benefit determinations
- Generate clinical evidence claims or conclusions
- Determine clinical investigation endpoints or study design
- Assess clinical significance of post-market data

---

## ALCOA+ Compliance

The manifesto's evidence model satisfies ALCOA+ data integrity requirements
by construction. See [Companion Frameworks -- ALCOA+ Alignment](../companion-frameworks.md)
for the complete mapping table.

For medical device applications, this means evidence bundles produced through
governed agentic delivery inherently meet the data integrity expectations of
ISO 13485 record-keeping and FDA 21 CFR Part 820 quality system requirements,
provided the underlying trace infrastructure is validated.

Key implementation note: the trace infrastructure itself is a computerized
system subject to validation under 21 CFR Part 11 / Annex 11. Organizations
must validate the evidence capture pipeline before relying on it for
regulatory records. The manifesto's observability requirements (P9) provide
the functional specification for this validation.

---

## Open Regulatory Questions

The following questions are unresolved in current regulatory guidance and
represent areas where industry consensus, standards body clarification, or
regulatory precedent is needed:

1. **Agent-as-tool qualification under IEC 62304**: Is an AI agent a
   "software tool" requiring qualification per IEC 62304 Clause 8, or is it
   SOUP, or something that requires a new classification? Current guidance
   does not address non-deterministic, general-purpose generation tools.

2. **SOUP classification for continuously-learning systems**: IEC 62304
   assumes SOUP is versioned and stable between versions. A continuously-
   learning agent violates this assumption. How should SOUP risk analysis
   apply when the SOUP item's behavior changes without a discrete version
   boundary?

3. **Version change revalidation requirements**: When the underlying model
   is updated (e.g., GPT-4 to GPT-5), what revalidation scope is required?
   The PCCP framework addresses anticipated modifications but does not
   explicitly cover infrastructure-level model changes that alter agent
   behavior without software changes.

4. **FDA / notified body stance on agent-generated SaMD components**: No
   regulatory body has published guidance on whether code generated by AI
   agents requires different verification than human-written code. The
   manifesto's position -- that agent output is unverified until
   independently confirmed -- is conservative but has not been tested in
   a regulatory submission.
