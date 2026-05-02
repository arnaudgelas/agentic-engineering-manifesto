# ISO/IEC 23894 + 23053 + 31000 Crosswalk and Worked AI Risk Register

**Status:** Wave 2, item W2.13 — DRAFT (regulatory-reviewer signoff required before publication).
**Audience:** AI risk-management leads, model-risk-management functions, internal audit, ISO 23894 / 31000 assurance reviewers, ML / data-engineering leads.
**Purpose:** Map manifesto risk-treatment vocabulary to ISO/IEC 23894:2023 (AI risk management based on ISO 31000:2018), align ISO/IEC 23053:2022 (framework for AI systems using ML) terminology to manifesto vocabulary, and supply a worked AI risk register for a representative financial-services use case (settlement-penalty calculation with foundation-model dependency).

**Sources cited:**
- ISO/IEC 23894:2023 *Information technology — Artificial intelligence — Guidance on risk management*. Aligns ISO 31000:2018 risk-management process to AI-specific concerns.
- ISO 31000:2018 *Risk management — Guidelines*. Treatment options: avoid, modify, share, retain (and pursue opportunity).
- ISO/IEC 23053:2022 *Framework for Artificial Intelligence (AI) Systems Using Machine Learning (ML)*. Defines AI lifecycle stages, AI actors, ML pipeline stages.
- ISO/IEC 22989:2022 *Information technology — Artificial intelligence — Artificial intelligence concepts and terminology* (referenced for terminology alignment).

**Cross-references:** `regulatory/nist-ai-rmf-crosswalk.md` (W2.9), `regulatory/iso-42001-crosswalk.md` (W2.10), `regulatory/coso-cobit-crosswalk.md` (W2.11), `regulatory/eu-ai-act-addendum.md` (W1.5), `operational-templates/ai-risk-register.md` (W2.7), `glossary.md` (term-collision appendix).

---

## 1. ISO/IEC 23894 + ISO 31000 process mapping

ISO 23894 inherits ISO 31000's six-step risk-management process and adds AI-specific risk sources.

| 31000 / 23894 step | What it requires | IGM coverage | AEnt-M coverage | Combined gap |
|---|---|---|---|---|
| **Communication & consultation** | Continuous engagement with stakeholders | P (P10) | P (P11 escalation) | Stakeholder register (NIST §3.1). |
| **Scope, context, criteria** | Establish the scope, context, risk criteria | P (P1 claim scope) | S (P5 scoped views, P14 enterprise) | Risk-appetite statement (`operational-templates/risk-appetite-statement.md`). |
| **Risk identification** | What can go wrong | S (P4 contradictions; P14 attack surface) | S (P11 response classes; P9 composite-state) | None. |
| **Risk analysis** | Likelihood × consequence | P (P3 epistemic tier as one input) | S (P8 consequence class) | AI risk register (`operational-templates/ai-risk-register.md`). |
| **Risk evaluation** | Compare to criteria; prioritise | P | S (P11 response classes) | None. |
| **Risk treatment** | Avoid / Modify / Share / Retain (+ pursue opportunity) | P | S (P11 Block / Escalate / Restrict / Advisory / Continue) | **Mapping table (§2)**. |
| **Monitoring & review** | Continuous, change-aware | S (P5 Curate; P10) | S (P9 composite-state; P14 metrics) | SLO table (`operational-templates/slo-table.md`). |
| **Recording & reporting** | Documentation, audit trail | S (P11 traceability) | S (P9 evidence) | Evidence-bundle schema. |

---

## 2. AEnt-M response classes ↔ ISO 31000 treatment options

The manifestos' response vocabulary (Block / Escalate / Restrict / Advisory / Continue) is operationally aligned with ISO 31000's treatment vocabulary (Avoid / Modify / Share / Retain). The mapping is many-to-one and depends on consequence class.

| AEnt-M response class | ISO 31000 treatment option(s) | Rationale |
|---|---|---|
| **Block** | Avoid (primary) | Action is not taken; risk source is removed by refusing the action. May convert to Modify after remediation. |
| **Escalate** | Modify or Share | Risk is reduced (Modify) by inserting human review; or accountability is shared (Share) with the human decision-maker. |
| **Restrict scope** | Modify | Risk is reduced by narrowing the action space to where epistemic quality is sufficient. |
| **Advisory only** | Modify or Retain (with control) | Risk is reduced by removing execution authority; residual risk is retained with logging. |
| **Continue (with enhanced monitoring)** | Retain (with control) | Risk is retained but compensated by enhanced monitoring; never appropriate for High/Critical absent override. |

**Operational rule.** The default response per consequence class (`agentic-enterprise-manifesto/manifesto.md:165–174`) is the manifesto-level pre-decision aligned with ISO 31000 treatment. Override of the default response = override of the treatment decision; override is itself an event that must be evidenced and is itself subject to risk evaluation.

**ISO 31000 "pursue opportunity"** has no direct AEnt-M counterpart because the manifestos focus on harm-prevention. AEnt-M Principle 6 (initiative) is the closest analogue — surfacing action opportunities — but it is opportunity-identification, not opportunity-treatment. Authors may consider adding an explicit "pursue opportunity" sub-clause if institutional risk practice expects it (DRAFT — author review needed).

---

## 3. ISO/IEC 23053 vocabulary mapping

ISO 23053 defines AI-system actors, lifecycle stages, and ML pipeline stages. Manifesto vocabulary often overlaps; this section makes the mapping explicit.

### 3.1 AI actors (ISO 23053 §6.2)

| ISO 23053 actor | Definition (paraphrased) | Manifesto term |
|---|---|---|
| **AI provider** | Designs, develops, trains, deploys an AI system | EU AI Act provider; ISO 42001 supplier; foundation-model provider |
| **AI producer** | Builds the AI system from components | Engineering steward (ASDLC); accountable authority for assembly choices |
| **AI customer** | Procures or uses the AI system | EU AI Act deployer; AEnt-M enterprise |
| **AI partner** | Auxiliary roles (data provider, evaluation provider, etc.) | ISO 42001 A.10 supplier register |
| **AI subject** | Person whose data is used or who is affected by AI outputs | Affected individual / data subject (NIST stakeholder register; GDPR data subject) |
| **Relevant authority** | Regulators, standards bodies | EU AI Act competent authority, DORA lead overseer, supervisory data-protection authority |

### 3.2 Data subject (GDPR / 23053)

GDPR's "data subject" is a subset of ISO 23053's "AI subject": every data subject is an AI subject if their data is in scope, but AI subjects may include those affected by outputs even when their personal data is not processed. Manifesto convention: use "data subject" for GDPR contexts and "AI subject" / "affected individual" for AI-impact contexts; both populated in the stakeholder register (`regulatory/nist-ai-rmf-crosswalk.md` §3.1).

### 3.3 AI lifecycle stages (ISO 23053 §6.3)

| ISO 23053 stage | Description | IGM mapping | AEnt-M mapping | ASDLC / APLC mapping |
|---|---|---|---|---|
| Inception | Idea, opportunity | n/a | P6 (initiative — agent-surfaced) gated by AEM loop-readiness | APLC Stage 1 |
| Design & development | Spec, design, build | P9 structured inquiry (substrate informs design) | P3, P5 | ASDLC Specify–Build |
| Verification & validation | Test against requirements | P13 validation | P7 control equivalence | ASDLC Evaluate; release-governance |
| Deployment | Push to production | P11 traceability | P9 composite-state acceptance | ASDLC Release; APLC Stage 4 |
| Operation & monitoring | Run-state | P5 Curate; P10 | P9 ongoing; P11 response classes | APLC Stage 5–6; ASDLC L4 |
| Continuous validation | Periodic reassessment | P5 (decay-class cadence) | P7 (relocation-stage advancement) | ASDLC L4 monitoring |
| Re-evaluation | Triggered re-assessment | P10 (substrate signals) | P9 (composite-state change) | APLC Stage 6 incident |
| Retirement | Decommission | (P5 Retire claim) | (P12 retirement) | APLC Stage 7; `operational-templates/decommissioning-checklist.md` |

### 3.4 ML pipeline stages (ISO 23053 §7)

ISO 23053 enumerates ML pipeline stages (data acquisition, preparation, model training, evaluation, deployment, monitoring). The manifestos do not specify ML pipeline internals (this is correctly out of scope) but reference them through:

- IGM P7 (acquisition modes) ↔ ISO 23053 data acquisition.
- IGM P5 (Consolidate / Curate) ↔ ISO 23053 data preparation, data quality monitoring.
- AEnt-M P9 composite-state ↔ ISO 23053 model deployment + version management.
- AEnt-M P11 response classes ↔ ISO 23053 monitoring outputs.

The TEVV portfolio (`regulatory/nist-ai-rmf-crosswalk.md` §3.2) provides the ML-pipeline evaluation evidence; the supplier register (`regulatory/iso-42001-crosswalk.md` §3.3) covers the provider-side ML pipeline where the deployer cannot directly observe.

---

## 4. Worked AI risk register example — FS settlement-penalty calculation with foundation-model dependency

**Scope.** A European custodian operates an agent product, `csdr-penalty-agent-001`, that calculates settlement penalties under EU CSDR + UK CREST regimes. The agent reasons over an IGM substrate (regulatory L3 + jurisdictional-divergence L2 + procedure L2 claims). The agent depends on a third-party foundation-model provider for inference. The agent is in a Tier 4 envelope (per `governance/governance-integration-note.md`) with three action classes at Operational, Monitored, and Full-Synchronous relocation.

The worked register below reflects ten illustrative risks. Format matches `operational-templates/ai-risk-register.md` schema.

| Risk ID | Category | Description | Likelihood | Impact | Inherent risk | Treatment (ISO 31000) | Manifesto response class | Treatment owner | Residual risk | Review cadence |
|---|---|---|---|---|---|---|---|---|---|---|
| `risk-csdr-001` | Technical | Foundation-model upgrade changes calculation behaviour for cross-border CSDR class without prior notice | Medium | High | High | Modify (composite-state acceptance gate) + Share (provider notice clause) | Block + dual-authority notification (Critical class) | Accountable authority (cross-border) | Medium | Per release + quarterly |
| `risk-csdr-002` | Technical | Confabulation: agent fabricates a CSD penalty rate when substrate is silent on a counterparty | High | High | Critical | Modify (epistemic tier gate; Authoritative required for High actions) + Modify (TEVV confabulation test) | Block (epistemic insufficiency) | Engineering steward + IGM revision authority | Low | Per release + monthly |
| `risk-csdr-003` | Operational | L3 regulatory change (e.g., ESMA amendment to CSDR Article 7) cascades through L2 claims with stale revalidation | Medium | High | High | Modify (decay-class cadence; revalidation SLO 14 days before next release) | Restrict scope until revalidation complete | IGM revision authority + accountable authority | Low | Per regulator publication + quarterly |
| `risk-csdr-004` | Regulatory | EU AI Act Article 73 serious-incident clock missed (15-day) for cross-border class fail | Low | High | High | Modify (incident workflow with 2-/15-day clocks; named recipient authorities) | Block + escalation per `regulatory/eu-ai-act-addendum.md` | Governance authority | Low | Annual + post-incident |
| `risk-csdr-005` | Reputational | Disparate-impact on non-EEA counterparties because penalty interpretation favours EEA-domiciled cohort | Medium | Medium | Medium | Modify (fairness test in TEVV; pre-deployment + quarterly) | Escalate to Decision Reviewer; potential Block if disparity exceeds threshold | Workflow owner + 2nd-line compliance | Low | Quarterly |
| `risk-csdr-006` | Strategic | Foundation-model provider deprecates current model with insufficient transition window | Medium | Medium | Medium | Share (contract clause: 90-day notice) + Modify (alternative-supplier evaluation refreshed quarterly per supplier register) | Continue with enhanced monitoring; escalate to procurement on EOL notice | Procurement steward + engineering steward | Medium (substrate-portability not yet proven) | Quarterly + on supplier event |
| `risk-csdr-007` | Operational | Indirect prompt injection via ingested regulator-correspondence PDF causes claim poisoning | Low | High | High | Modify (input-sanitization architecture; IGM P14 attack-surface controls) + Modify (red-team test; quarterly) | Block (epistemic-integrity violation) | Security reviewer + IGM assertion authority | Low | Quarterly red-team |
| `risk-csdr-008` | Technical | Cascading failure: a downstream agent (collateral-mgmt) consumes the penalty agent's output as ground-truth without epistemic-tier propagation | Medium | High | High | Modify (epistemic tier propagation across orchestration; AEnt-M P5 reasoning governance) | Restrict scope (downstream cannot exceed upstream's epistemic tier) | Architecture steward | Low | Annual cascading-failure simulation |
| `risk-csdr-009` | Regulatory | DORA Pillar 2 incident reporting clock missed (4h notification) on a foundation-model outage during a peak settlement window | Low | High | High | Modify (incident workflow with 4h/72h/1-month clocks) + Share (contractual provider-side incident notification clause) | Block (continuity event); escalate to governance authority and operational-resilience function | Governance authority + operational-resilience | Low | Annual + post-incident |
| `risk-csdr-010` | Regulatory | GDPR Article 22 challenge: counterparty employee mentioned in penalty notice contests automated decision-making | Low | Medium | Medium | Modify (Article 22 register; decision is not "solely automated" because Decision Reviewer/Accountable Authority engages per consequence class) + Modify (explanation right per Article 86 EU AI Act with 30-day SLO) | Escalate to Decision Reviewer; produce explanation | Accountable authority + DPO | Low | Annual |

**Reading the register.**

- **Inherent risk** = likelihood × impact before treatment.
- **Residual risk** = likelihood × impact after treatment.
- A residual-risk rating ≥ Medium for a High/Critical-impact row is escalated to the board risk committee per the institution's risk appetite (`operational-templates/risk-appetite-statement.md`).
- Treatment owner = named individual or named role; "the team" is insufficient.
- Each row references the manifesto principle(s) implementing the treatment.

**Coverage check against ISO 31000 risk sources (23894 §B.5).** ISO 23894 enumerates AI-specific risk sources: complexity, transparency, automation bias, dataset issues, level of automation, system hardware, system lifecycle, technology readiness, ML risks (data poisoning, evasion, model theft, etc.), human factors, privacy, fairness, safety, security, sustainability. The register above covers complexity (008), transparency (002), automation bias (010), dataset/lifecycle (003, 006), ML risks (002, 007), human factors (010), privacy (010), fairness (005), safety/security (007, 009), and supplier-lifecycle (006, 009). Sustainability (environmental impact) is not represented in the worked example; institutions should add a sustainability row if material (DRAFT — author note).

---

## 5. ISO 23894 risk-criteria alignment with manifesto consequence classes

| ISO 23894 risk level (illustrative; calibrate per institution) | AEnt-M consequence class | Default treatment | Required oversight |
|---|---|---|---|
| Low | Low | Continue with enhanced monitoring or Restrict scope | Workflow owner; sample audit |
| Medium | Medium | Modify (Escalate to Decision Reviewer) | Decision Reviewer; per-action evidence |
| High | High | Modify (Block + structured escalation) or Avoid | Accountable Authority; full evidence |
| Critical | Critical | Avoid (Block + dual-authority notification) | Dual Authority; governance authority |

This alignment is the basis for AEnt-M P11's response-class defaults (`agentic-enterprise-manifesto/manifesto.md:165–174`) being read as ISO 31000 treatment defaults.

---

## 6. Open DRAFT items requiring author judgment

- **DRAFT — author review needed:** ISO 31000 "pursue opportunity" treatment is not directly mapped to a manifesto response class. Authors may add an explicit principle or note this as out-of-scope (initiative is opportunity-identification, not opportunity-treatment).
- **DRAFT — author review needed:** the worked register's likelihoods and impacts are illustrative; institution-specific calibration required.
- **DRAFT — author review needed:** the worked register omits sustainability / environmental-impact risk; recommend adding a row when material (e.g., "high inference-cost variability with carbon-intensity exposure").
- **DRAFT — author review needed:** ISO 23053 actor mapping (AI customer = EU AI Act deployer) is approximate; some jurisdictions distinguish customer from deployer where the customer subcontracts deployment to a service provider.

---

## 7. References

- ISO/IEC 23894:2023, *Information technology — Artificial intelligence — Guidance on risk management*.
- ISO 31000:2018, *Risk management — Guidelines*.
- ISO/IEC 23053:2022, *Framework for Artificial Intelligence (AI) Systems Using Machine Learning (ML)*.
- ISO/IEC 22989:2022, *Information technology — Artificial intelligence — Artificial intelligence concepts and terminology*.
- `regulatory/nist-ai-rmf-crosswalk.md` — NIST mapping; TEVV portfolio.
- `regulatory/iso-42001-crosswalk.md` — Annex A; AIA, RACI, supplier register.
- `regulatory/coso-cobit-crosswalk.md` — COSO/COBIT; Three-Lines artefacts.
- `regulatory/eu-ai-act-addendum.md` — Article 73 incident workflow + Article 86 explanation.
- `regulatory/foundation-model-third-party-register.md` — DORA Pillar 4 register; supports `risk-csdr-006` and `risk-csdr-009`.
- `operational-templates/ai-risk-register.md` — schema; the worked example here uses the same fields.
- `operational-templates/risk-appetite-statement.md` — risk-criteria source.
- `operational-templates/slo-table.md` — SLOs referenced from rows.
- `governance/evidence-bundle-schema.md` — evidence references for treatment decisions.
- `governance/authority-accountability-matrix.md` — owner-naming reference.
