# Insurance Regulatory Alignment Mapping

*Mapping the [Agentic Engineering Manifesto](../manifesto.md) principles to
insurance regulatory frameworks.*

> **Disclaimer** — This document maps concepts from the Agentic Engineering
> Manifesto to insurance regulatory frameworks. It does not constitute
> compliance or regulatory advice. Consult qualified risk, compliance, and
> regulatory professionals for compliance determinations.
>
> **Regulatory currency:** This document reflects Solvency II (Directive
> 2009/138/EC), EIOPA Guidelines on the Use of AI and ML in Insurance (2021),
> IDD (Directive 2016/97/EU), GDPR, DORA (EU 2022/2554), FCA ICOBS, and IAIS
> Insurance Core Principles as understood at the time of last review. Insurance
> regulation varies significantly by jurisdiction and product line; this
> document uses conservative cross-jurisdictional defaults. The EU AI Act
> implementation timeline and Annex III classifications are subject to ongoing
> guidance; verify current status before relying on AI Act references here.
> **Last reviewed: April 2026.** Proposed changes not yet enacted are flagged
> as such.

---

## Preamble

This document is a companion to [manifesto.md](../manifesto.md). It assumes
familiarity with the [boundary conditions](../companion-frameworks.md) and the
[Agentic V-Model](../adoption-vmodel.md) transition framework. Insurance
already operates extensive model governance infrastructure — actuarial model
validation, internal model approval under Solvency II, conduct oversight under
the IDD — and the bridge to agentic engineering is extension of these existing
frameworks, not construction of new ones. The manifesto's evidence-bundle and
tiered-autonomy model maps well to Solvency II model governance requirements;
the principal discipline is making that mapping explicit so internal audit, the
actuarial function, and the regulator can follow it.

**Canonical sources.** Normative principle definitions (P1–P12) and autonomy
tier definitions are in [manifesto-principles.md](../manifesto-principles.md).
This document maps those definitions to insurance regulatory requirements; it
does not redefine them.

---

## Solvency II Model Governance

Solvency II imposes a three-pillar framework that shapes how agent systems are
governed in insurance undertakings.

**Pillar 1 — Solvency Capital Requirement (SCR).** Agent products used in SCR
calculation or that feed the technical provisions are internal models under
Solvency II Article 112–127. The internal model approval process (IMAP)
requires the undertaking to demonstrate that the model meets the use test,
statistical quality standards, calibration standards, profit and loss
attribution, validation standards, and documentation standards. An agent
product that participates in SCR calculation is subject to all six tests.  The
APLC's behavioral specification, evaluation portfolio, and composite state
manifest together constitute the technical documentation required for internal
model approval, but they must be structured to address Solvency II's specific
model documentation format and substance requirements.

**Pillar 2 — Own Risk and Solvency Assessment (ORSA).** The ORSA requires
insurance undertakings to assess all material risks — including model risk from
AI systems — as part of the ongoing solvency assessment. Agent products used in
risk assessment, pricing, or reserve setting contribute to the risk profile
that the ORSA must cover. The governance function's model risk assessment must
include agent products within scope. The ORSA narrative must be able to
explain, to the supervisory authority, how material AI system risks are
identified, assessed, and managed.

**Pillar 3 — Supervisory Reporting.** Solvency II's Quantitative Reporting
Templates (QRTs) and the Regular Supervisory Report (RSR) require documentation
of models used in the undertaking's operations. Agent products used in SCR
calculation or material risk decisions must be disclosed and their governance
described. The composite state manifest and the change record chain provide the
model identification and versioning information the QRTs require.

**Internal model change policy.** Solvency II distinguishes major model changes
(requiring supervisory approval before implementation) from minor changes
(subject to internal governance). The classification of a change as major or
minor is a governance decision that must be made at Stage 1 of the APLC for any
change to an agent product in Solvency II model scope. The APLC's composite
versioning model in
[aplc/agent-composite-versioning.md](../aplc/agent-composite-versioning.md)
provides the change audit trail that demonstrates how each change was
classified and governed. A major model change deployed without supervisory
approval is a Solvency II compliance breach; the APLC release gate for major
model changes must include supervisory pre-approval as a gate condition.

| Solvency II Requirement | Manifesto Mechanism | Alignment | Gap |
| --- | --- | --- | --- |
| Model use test — model must be central to risk management decisions | P12 accountability; decision authority structure | Partial — the use test requires evidence that the model drives decisions; the agent must be demonstrably used in decision-making, not merely consulted | The use test requires board-level attestation. The accountable human named at Stage 1 must have the standing to provide this attestation. |
| Statistical quality standards — mathematical methods, data quality, actuarial best practice | P8 evaluation portfolios; P7 context engineering | Strong — evaluation portfolios demonstrate statistical quality; context engineering ensures data quality | Actuarial best practice requires peer review by a Fellow of an actuarial professional body for material models. The independent validation at Stage 3 must include qualified actuarial review. |
| Calibration standards — calibrated to historical data, consistent with market data | P8 evaluation portfolios | Partial — evaluation portfolios cover correctness; calibration requires specific comparison to observed historical loss data and market pricing benchmarks | Calibration evidence requires actuarial sign-off. The Stage 3 evaluation portfolio must include a calibration section reviewed by the actuarial function. |
| Validation standards — independent validation of model quality | P8 independent validation; Stage 3 governance | Good fit — the APLC's independent validation gate maps to Solvency II validation requirements | Validation must be conducted by persons independent of model development and with sufficient actuarial expertise. The validation function must be organisationally separate. |
| Documentation standards — comprehensive model documentation | P2 specifications; P1 evidence bundles; composite state manifest | Good fit — APLC artifacts constitute the model documentation | Solvency II model documentation must follow the format prescribed by the applicable supervisory authority. The APLC produces substantively correct documentation; format compliance may require an additional translation step. |
| Model change governance — major vs. minor classification | Composite versioning model; Stage 3 release governance | Good fit — the composite versioning model classifies changes and provides the audit trail | Major model changes require supervisory pre-approval. The APLC release gate for Solvency II models must include supervisory notification as a condition before deployment. |

---

## EIOPA AI and ML Guidelines

The EIOPA Opinion on Artificial Intelligence Governance and Risk Management
(2021) and subsequent guidance establish supervisory expectations for AI and ML
use in insurance beyond the Solvency II model governance framework. These
guidelines apply to all material AI systems — not only those in SCR calculation
— including customer-facing systems for pricing, underwriting, and claims.

**Governance expectations.** EIOPA expects that insurance undertakings have
board-level accountability for AI systems, that AI governance is integrated
into the existing risk management framework (not siloed as a separate AI
governance team), and that the second line of defence independently challenges
AI system outputs. The manifesto's P12 (accountability requires visibility) and
P5 (autonomy tiers) directly address these expectations. The named accountable
human at Stage 1 is the board-level accountable person EIOPA expects; the
second-line independent validation at Stage 3 is the independent challenge
function.

**Explainability.** EIOPA expects that insurance AI systems are explainable to
the extent necessary for the supervisory authority to understand their
functioning and for affected individuals to understand decisions that affect
them. For pricing and underwriting agents, explainability is not just a
regulatory aspiration — it is required for conduct compliance (IDD suitability
assessment) and for GDPR Article 22 compliance. The behavioral specification at
Stage 2 must document the agent's explanation capability as a functional
requirement, not a post-hoc documentation task.

**Fairness and non-discrimination.** EIOPA's guidelines address the risk that
AI systems produce indirect discrimination through proxy variables correlated
with protected characteristics. Underwriting and pricing agents that use
behavioural, geographic, or lifestyle data must be assessed for proxy
discrimination against protected characteristics. The evaluation portfolio at
Stage 3 must include a fairness assessment for any agent product affecting
individual insurance pricing or coverage eligibility.

**Data governance.** EIOPA expects robust data governance for training and
inference data. The context engineering framework (P7) and knowledge governance
(P6) map to these expectations. For actuarial data used in pricing and SCR
models, the data governance must address lineage, quality, and fitness for
purpose in actuarial terms.

| EIOPA Expectation | Manifesto Mechanism | Alignment |
| --- | --- | --- |
| Board-level AI accountability | P12 named accountable human; governance tier escalation | Strong |
| Second-line independent challenge | P8 independent validation at Stage 3 | Strong |
| Explainability for supervisors and affected individuals | P9 structured traces; explanation generation capability in behavioral specification | Partial — traces provide system-level explainability; individual-level explanation capability must be designed into the behavioral specification |
| Fairness and non-discrimination assessment | P8 evaluation portfolios extended with fairness testing | Partial — evaluation portfolios must be explicitly extended with fairness categories |
| Data governance for AI inputs | P7 context engineering; P6 knowledge governance | Good fit |
| Ongoing performance monitoring | P9 observability; output quality rate SLO | Good fit |

---

## Insurance Distribution Directive (IDD)

The IDD (Directive 2016/97/EU) regulates the distribution of insurance products
and imposes requirements on all parties involved in selling or advising on
insurance — including, by extension, automated systems that perform advisory
functions.

**Automated advice and IDD applicability.** Whether an agent product
constitutes an insurance intermediary under the IDD depends on a
jurisdiction-specific analysis of whether the agent is carrying out insurance
distribution activities — providing advice on insurance contracts or carrying
out other work preparatory to the conclusion of contracts. If yes, the agent
product (or its deploying organisation) must satisfy IDD requirements. This
determination must be made at Stage 1, not at product launch.

**Suitability assessment.** The IDD requires that insurance distributors carry
out a suitability assessment before providing advice — establishing the
customer's demands and needs and ensuring that the advice meets them. An agent
product that provides insurance advice must perform the suitability assessment,
document it, and provide the customer with a statement describing why the
recommendation meets the customer's demands and needs. The behavioral
specification at Stage 2 must encode the suitability assessment logic, and the
output must include the IDD-required demands and needs statement.

**Product oversight and governance (POG).** The IDD requires insurance
manufacturers to have product oversight and governance procedures that ensure
products are designed for a specific target market and distributed accordingly.
Agent products used in distribution (customer advisory agents, automated
quotation agents) must comply with POG requirements: they must be configured to
serve the identified target market, and any change to their configuration that
affects the target market or distribution approach is a POG-relevant change
requiring the product governance process. The APLC's composite versioning model
captures these changes; the release governance must confirm POG compliance for
changes affecting distribution.

**FCA ICOBS (UK).** In the UK market, the FCA's Insurance: Conduct of Business
Sourcebook (ICOBS) imposes comparable conduct requirements. Agents providing
insurance advice to retail customers must meet ICOBS fair, clear, and not
misleading communication standards, provide appropriate information for
informed decision-making, and ensure that recommended products are appropriate
for the customer. The FCA Consumer Duty (PS22/9) further requires that firms
act to deliver good outcomes for retail customers — including customers
interacting with automated systems.

| IDD / ICOBS Requirement | Manifesto Mechanism | Alignment |
| --- | --- | --- |
| Suitability assessment before advice | Behavioral specification (Stage 2): suitability logic as functional requirement | Partial — the suitability logic must be specified and evaluated; the APLC provides the framework but the insurance suitability criteria must come from domain expertise |
| Demands and needs statement | Output specification in behavioral envelope | Partial — the output format must be specified to produce the IDD-required statement |
| POG compliance for distribution changes | Composite versioning; release governance compliance documentation condition | Good fit |
| FCA Consumer Duty — good customer outcomes | Output quality rate SLO calibrated against customer outcome metrics; ongoing monitoring | Partial — SLO calibration must be against customer outcome metrics, not only technical accuracy |

---

## GDPR and Special Category Data in Insurance

Insurance operations involve extensive processing of personal data, including
special category data under GDPR Article 9: health data, genetic data, and data
concerning disability. This creates specific design constraints for agent
products in insurance.

**Health data in claims processing.** Health insurance claims agents routinely
process health data. GDPR Article 9 requires a legal basis for processing
special category data; for health insurance claims, the most common bases are
explicit consent or processing necessary for an insurance contract. The legal
basis must be confirmed before the agent product is designed, and the data
processing must be within the scope of the confirmed legal basis. Agent
products that expand health data processing beyond the confirmed legal basis
create GDPR compliance exposure that cannot be resolved through technical
controls alone.

**GDPR Article 22 and underwriting decisions.** Insurance underwriting
decisions based solely on automated processing of special category health or
genetic data are subject to GDPR Article 22(4)'s prohibition on solely
automated decisions based on special category data. The prohibition applies
unless the individual has given explicit consent or Member State law provides
for it. For automated underwriting agent products processing health or genetic
data, this prohibition is the binding constraint: a human must be in the
decision loop for every individual underwriting decision based on special
category data — not available for review on request, but actually reviewing and
accepting responsibility for the decision.

**Data residency and cross-border transfer.** Insurance data processing
frequently involves cross-border transfers — particularly for international
reinsurance, global corporate insurance, and shared service operations.  The
GDPR Chapter V cross-border transfer requirements must be incorporated into the
agent product's data processing design at Stage 1: which data can the agent
access, through which infrastructure, and under what transfer mechanism?

---

## Solvency II Model Validation Mapping

| Validation Requirement | APLC Mechanism | Notes |
| --- | --- | --- |
| Conceptual soundness — mathematical and actuarial basis documented | P2 behavioral specification with actuarial rationale | The behavioral specification must document the actuarial methodology underlying the agent's outputs — not only what it does but why it is actuarially sound |
| Empirical validation — model outputs compared to observed outcomes | P8 evaluation portfolio with backtesting against historical claims and pricing data | Backtesting against realised outcomes is an actuarial discipline that must supplement the standard evaluation portfolio |
| Sensitivity and scenario testing | P8 adversarial evaluations; scenario-based test cases | Standard manifesto evaluation portfolios must be extended with actuarial scenario tests and stress tests relevant to the SCR calculation |
| Independent validation by persons not involved in development | Stage 3 independent validation gate | The validator must have actuarial qualifications appropriate to the model's subject matter for Solvency II compliance |
| Annual model validation cycle | Stewardship model; quarterly health review | The annual validation cycle must produce a formal validation report addressed to the board and the supervisory authority; the steward's monitoring data feeds into this report |

---

## Hard Autonomy Caps

The following caps are regulatory floors for insurance use cases — derived from
Solvency II, IDD, GDPR, and EU AI Act requirements, not from risk preference.
A mature Phase 5 organisation still cannot exceed these caps for the listed use
cases.

| Use Case | Maximum Tier | Regulatory Basis | Key Constraints |
| --- | --- | --- | --- |
| Underwriting decisions for individual cover (personal lines) | **Tier 1** (observe only) | EU AI Act Annex III §5(b) (high-risk); GDPR Art. 22 (health/genetic data); EIOPA AI guidelines | Agent may analyse and recommend; human underwrites every individual risk. Full explainability required. Fairness testing mandatory. |
| Claims decisions affecting coverage or payout | **Tier 1** (observe only) | EU AI Act high-risk; FCA Consumer Duty; GDPR Art. 22 where health data involved | Agent may triage and summarise; human adjudicates every claim. Right to contestation must be operational, not nominal. |
| IDD-scope customer advisory (products advice) | **Tier 1** (observe only) | IDD suitability requirement; FCA ICOBS | Suitability assessment must be demonstrably connected to individual customer demands and needs. Automated advice without human confirmation is IDD non-compliant in most jurisdictions. |
| Fraud detection triggering account/claim action | **Tier 2** max | Consumer Duty; GDPR | Agent may score and flag; human authorises account restriction or claim suspension. |
| Pricing optimisation (fleet, commercial, non-personal-lines) | **Tier 2** max | EIOPA AI guidelines; indirect discrimination obligation | Agent may optimise; pricing actuary reviews material rate changes before implementation. Proxy discrimination assessment mandatory. |
| SCR calculation using internal model | **Tier 1** (observe only) | Solvency II Art. 112–127; IMAP use test | Agent output is a model input; the actuarial function owns the SCR output. Agent cannot produce the final SCR without actuarial sign-off. |
| Back-office automation (document processing, data entry) | **Tier 3** available | Minimal regulatory overlay | Standard manifesto adoption applies. Not in scope for Solvency II internal model governance unless it feeds risk calculation. |

---

## Market-Specific Autonomy Guidance

| Use Case | Risk Profile | Recommended Starting Autonomy | Key Regulations | Notes |
| --- | --- | --- | --- | --- |
| Claims document triage and classification | Low-Medium | Tier 1-2 | FCA Consumer Duty; GDPR | Agent classifies and routes claims; human adjudicates. High-value efficiency use case with contained blast radius. |
| Fraud pattern detection and alert generation | Medium-High | Tier 1-2 | Consumer Duty; GDPR; EIOPA AI guidelines | Agent flags anomalies; human investigates and decides. False negative risk is significant; Tier 1-2 is a permanent ceiling. |
| Regulatory reporting consistency checking | Medium | Tier 1-2 | Solvency II QRT/RSR; DORA | Agent cross-checks data; actuary or reporting function approves before submission. |
| Actuarial analysis assistance | Medium-High | Tier 1-2 | Solvency II validation standards | Agent assists data preparation, model calibration review, and report drafting. Fellow of actuarial professional body reviews and signs off all actuarial outputs. |
| Policy administration and renewals | Low | Tier 1-3 | IDD (unless advice involved) | Standard manifesto adoption for non-advisory administrative tasks. Escalate to Tier 1 if the task involves advice. |
| Solvency II internal model support | High | Tier 1 | Solvency II Art. 112–127; EIOPA guidelines | Agent assists model documentation, validation evidence assembly, and change impact analysis. The model itself and all SCR outputs remain human-owned. |

---

## ASDLC and APLC Regulatory Guidance

For insurance-specific regulatory requirements mapped to ASDLC Layers 1, 3, and 4, see [ASDLC Insurance Domain Guidance](../asdlc/domains/insurance.md).

For agent product regulatory guidance applicable to insurance agent products governed by the APLC, see [APLC Insurance Domain Guidance](../aplc/domains/insurance.md).
