# COSO ERM 2017 + COBIT 2019/2023 Crosswalk and Three-Lines Operationalisation

**Status:** Wave 2, item W2.11 — DRAFT (regulatory-reviewer signoff required before publication).
**Audience:** CROs, CIOs, internal-audit (3rd line) leads, 2nd-line risk-and-compliance leads, COSO/COBIT-aligned governance functions, regulators.
**Purpose:** Bridge the manifestos' enterprise-AI vocabulary into COSO ERM 2017 (5 components × 20 principles) and COBIT 2019/2023 (40 governance/management objectives). Provide explicit Three-Lines-of-Defence operationalisation: 2nd-line challenge log template, 3rd-line audit working-paper template — both mapped to IGM authorities and AEnt-M consequence-class accountability.

**Sources cited:**
- COSO. *Enterprise Risk Management — Integrating with Strategy and Performance*, 2017. Five components: Governance & Culture; Strategy & Objective-Setting; Performance; Review & Revision; Information, Communication & Reporting. Twenty principles.
- ISACA. *COBIT 2019 Framework: Governance and Management Objectives*, 2018, with 2022/2023 updates introducing AI design factors.
- IIA. *The IIA's Three Lines Model*, July 2020 (replacing the 1999 Three Lines of Defence model). The manifestos use "Three Lines of Defence" as the more familiar regulatory term while inheriting the 2020 model's substance.

**Cross-references:** `regulatory/nist-ai-rmf-crosswalk.md` (W2.9), `regulatory/iso-42001-crosswalk.md` (W2.10), `regulatory/iso-23894-23053-crosswalk.md` (W2.13), `regulatory/eu-ai-act-addendum.md` (W1.5), `governance/authority-accountability-matrix.md`, `governance/evidence-bundle-schema.md`, `operational-templates/ai-risk-register.md`.

---

## 1. COSO ERM 2017 crosswalk (one page)

| COSO component | COSO principle | IGM mapping | AEnt-M mapping | Coverage |
|---|---|---|---|---|
| **1. Governance & Culture** | 1. Exercises board risk oversight | (P12) | P14 governance authority | P |
| | 2. Establishes operating structures | P6 four authorities | P8 consequence-class roles | S |
| | 3. Defines desired culture | n/a | P14 enterprise governance | P |
| | 4. Demonstrates commitment to core values | n/a | P14 | P |
| | 5. Attracts, develops, retains capable individuals | n/a | n/a | M (DRAFT — author note) |
| **2. Strategy & Objective-Setting** | 6. Analyses business context | P1 claim scope | P1 substrate as enterprise infrastructure | P |
| | 7. Defines risk appetite | (DRAFT — adopt risk-appetite statement) | (DRAFT) | M → addressed by `operational-templates/risk-appetite-statement.md` |
| | 8. Evaluates alternative strategies | n/a | n/a | M |
| | 9. Formulates business objectives | P9 structured inquiry | P14 | P |
| **3. Performance** | 10. Identifies risk | P4 contradictions; P14 attack surface | P11 response classes | S |
| | 11. Assesses severity of risk | P3 epistemic tier | P8 consequence class | S |
| | 12. Prioritizes risks | P5 decay-class taxonomy | P11 response classes | S |
| | 13. Implements risk responses | P11 traceability; P15 architectural enforcement | P11 (Block / Escalate / Restrict / Advisory / Continue) | S |
| | 14. Develops portfolio view | P10 every engagement feeds back | P9 composite-state across portfolio | S |
| **4. Review & Revision** | 15. Assesses substantial change | P5 Curate; P15/P16 | P9 composite-state acceptance | S |
| | 16. Reviews risk and performance | P11 traceability | P14 metrics; P9 monitoring | S |
| | 17. Pursues improvement in ERM | P10 substrate deepens | P9 substrate deepens through use | S |
| **5. Information, Communication & Reporting** | 18. Leverages information & technology | P9 structured inquiry | P3 substrate inquiry | S |
| | 19. Communicates risk information | P11 traceability | P11 escalation; P14 governance authority | S |
| | 20. Reports on risk, culture, performance | P11 | P14 metrics block | S |

**Top three takeaways for a CRO:**

1. **COSO Principle 7 (risk appetite) is the highest-leverage gap.** Both manifestos imply risk appetite via consequence classes and response classes but neither states it explicitly at board level. Adopt `operational-templates/risk-appetite-statement.md`.
2. **COSO Principle 5 (capable individuals) is uncovered.** Adopt training and competence requirements in line with ISO 42001 Clause 7.2 and adopt steward-portfolio limits (W2.28).
3. **COSO Principles 10–14 (Performance) are well covered.** This is the manifestos' strength — IGM contradictions / decay / attack surface and AEnt-M consequence / response classes are a coherent risk-assessment-and-response system.

---

## 2. COBIT 2019/2023 crosswalk (one page)

COBIT organizes 40 objectives across five domains: Evaluate-Direct-Monitor (EDM, 5 objectives) for governance; Align-Plan-Organize (APO, 14), Build-Acquire-Implement (BAI, 11), Deliver-Service-Support (DSS, 6), Monitor-Evaluate-Assess (MEA, 4) for management. The 2023 update introduced AI-governance design factors.

Coverage codes: **S** = Strong; **P** = Partial; **M** = Missing.

### 2.1 Governance objectives (EDM)

| COBIT objective | Theme | IGM | AEnt-M | Coverage | Action |
|---|---|---|---|---|---|
| EDM01 Ensured Governance Framework Setting & Maintenance | Framework, principles | P (P6) | S (P14) | S | Cross-reference governance-stack diagram. |
| EDM02 Ensured Benefits Delivery | Value | n/a | S (P15) | P | Tie to AEM P11 economics. |
| **EDM03 Ensured Risk Optimisation** | Risk-strategy alignment | P (P11) | S (P8/P11) | P | Adopt risk-appetite statement. |
| EDM04 Ensured Resource Optimisation | Resources | n/a | P (P15) | P | None. |
| EDM05 Ensured Stakeholder Engagement | Stakeholder | n/a | P (P14) | M | Adopt stakeholder register (NIST §3.1). |

### 2.2 Management objectives — emphasis APO12, APO14, DSS04, plus AI design factors

| COBIT objective | Theme | IGM | AEnt-M | Coverage | Action |
|---|---|---|---|---|---|
| APO01 Managed I&T Management Framework | n/a (org-level) | n/a | P (P14) | P | None. |
| **APO12 Managed Risk** | Risk identification, analysis, response | P (P4/P14) | S (P11) | P | **Adopt AI risk register** (`operational-templates/ai-risk-register.md`). Risk-appetite statement (`operational-templates/risk-appetite-statement.md`). |
| APO13 Managed Security | Security controls | P (P14/P15) | P (P16) | P | Red-team protocol (`regulatory/nist-ai-rmf-crosswalk.md` §3.2). |
| **APO14 Managed Data** | Data quality, lifecycle, governance | S (P1/P2/P3/P5/P10) | S (P3/P9) | S | None — manifestos' strongest area. |
| BAI03 Managed Solution Identification & Build | n/a | P (P9) | P | P | Tie to ASDLC. |
| BAI06 Managed IT Changes | Change management | P (P5 Curate) | S (P9 composite-state) | S | None. |
| BAI09 Managed Assets | Asset inventory | M | P (P9 implies inventory) | M | **Adopt agent-inventory-schema** (`operational-templates/agent-inventory-schema.md`). |
| BAI10 Managed Configuration | Config management | P (P11) | S (P9 composite-state) | S | None. |
| **DSS04 Managed Continuity** | Continuity, resilience, recovery | M | P (P16 supplier) | M | Adopt foundation-model third-party register (W1.6) + decommissioning checklist + DORA Pillar 4 + 5 alignment. |
| DSS05 Managed Security Services | Security operations | P (P14) | P (P16) | P | None. |
| **MEA01 Managed Performance & Conformance Monitoring** | KPI/SLO monitoring | P | S (P14 metrics) | P | **Adopt SLO table** (`operational-templates/slo-table.md`). |
| **MEA02 Managed System of Internal Control** | Control framework | P (P11) | S (P5/P7/P11) | S | Three-lines operationalisation (§3). |
| **MEA03 Managed Compliance with External Requirements** | External obligations | M | P (P14) | M | EU AI Act addendum + DORA + GDPR addenda. |
| **MEA04 Managed Assurance** | Independent assurance | M | M | M | Adopt 3rd-line audit working-paper template (§3.2). |

### 2.3 COBIT 2023 AI-governance design factors

The 2023 update introduces AI-specific governance design factors (e.g., "AI Maturity," "Data Maturity," "Threat Landscape," "Risk Profile related to AI"). Manifesto coverage:

| Design factor | IGM | AEnt-M | Action |
|---|---|---|---|
| AI Maturity | P10 substrate deepens | P14 phased adoption | Cross-reference to `governance/phase-level-matrix.md` (W2.17). |
| Data Maturity | S (P1/P5/P10) | P (P3) | None. |
| Threat Landscape (AI-specific) | S (P14 attack surface) | P (P16) | None. |
| Risk Profile related to AI | P | S (P8 consequence class) | Adopt risk register. |
| Compliance Profile (AI) | M | P | EU AI Act addendum + supplier register. |

---

## 3. Three Lines of Defence operationalisation

The manifestos' authority structures map cleanly onto the Three-Lines model — but only if the artefacts are explicit. This section provides the two missing artefacts.

### 3.1 Three Lines mapping

| Line | Role in IIA model | IGM mapping | AEnt-M mapping | What is missing today |
|---|---|---|---|---|
| **1st line** — operational management owning risk | Workflow / process owners; agent operators | Assertion authority; Inference authority (operational reasoning over the graph) | Workflow Owner (Low); Decision Reviewer (Medium); Accountable Authority (High) | Per-action evidence in evidence bundle (covered by `governance/evidence-bundle-schema.md`). |
| **2nd line** — risk and compliance functions providing oversight and challenge | Risk, compliance, model-risk-management, AI-governance office | Semantic authority (taxonomy / definitions); Revision authority on contradictions | Governance authority for Critical; cross-functional governance committee | **Challenge log** (§3.2). |
| **3rd line** — internal audit providing independent assurance | Internal audit | (none — IGM does not name an audit function; audit reads outputs) | (governance authority signs off but not independent) | **Audit working paper** (§3.3). |
| (External assurance) | Regulators, certified auditors | n/a | n/a | EU AI Act conformity assessment; ISO 42001 certification; SOC 2; DORA TLPT. |

### 3.2 2nd-line challenge log template

**Status:** DRAFT — adapt per institution. Required for every system at AEnt-M Medium consequence and above.

**Owner:** 2nd-line risk-and-compliance / AI-governance office.
**Cadence:** continuous; review at minimum quarterly per system.
**Form:** structured log; one row per challenge.

| Field | Description | Example |
|---|---|---|
| `challenge_id` | Stable identifier | `chal-csdr-2026-04-12-001` |
| `system_id` | matches agent inventory | `csdr-penalty-agent-001` |
| `raised_by` | Named 2nd-line role | "Model risk officer (FS)" |
| `raised_date` | ISO date | `2026-04-12` |
| `consequence_class` | Low / Medium / High / Critical (AEnt-M P8) | `High` |
| `igm_authority_in_scope` | Which IGM authority's decision is being challenged | `Revision authority` |
| `aent_role_in_scope` | Which AEnt-M role's decision is being challenged | `Accountable Authority` |
| `category` | Substrate / model / process / data / control / supplier / regulatory | `model` |
| `description` | One-paragraph statement of the challenge | "Composite-state acceptance for fm-provider-001 model upgrade did not include disparate-impact regression test on cross-border CSDR class." |
| `evidence_cited` | Pointer to evidence | "Evidence bundle EB-2026-04-10-csdr; missing fairness-test artefact." |
| `risk_implication` | What is the worst-case if challenge stands | "Disparate-impact risk on non-EEA counterparties; potential GDPR Art 22 + ECOA exposure." |
| `linked_risk_register_id` | Cross-reference | `risk-csdr-fairness-001` |
| `expected_resolution` | What 2nd-line wants done | "Re-run fairness test on holdout; pause Operational relocation for affected class until cleared." |
| `resolution_owner` | Named 1st-line role | "Engineering steward + accountable authority" |
| `resolution_due_date` | ISO date | `2026-04-26` |
| `escalation_trigger` | What causes escalation if not resolved | "If unresolved at due date, escalate to governance authority; if Critical implication, escalate immediately." |
| `status` | Open / In-progress / Resolved / Escalated / Withdrawn | `Open` |
| `resolution_summary` | What was done | (filled at close) |
| `resolution_date` | ISO date | (filled at close) |
| `lessons_recorded` | Whether lesson was recorded for portfolio learning | (filled at close) |

**Operational rules.**

- 2nd line may not vote on its own challenges; escalation goes to governance authority (AEnt-M P14) or board risk committee depending on consequence class.
- 1st line must respond with evidence; "we considered it" is insufficient.
- Challenges that cannot be resolved within consequence-class SLO (`operational-templates/slo-table.md`) automatically escalate.
- Trends in the challenge log feed the periodic management review (COSO Principle 16).

### 3.3 3rd-line audit working-paper template

**Status:** DRAFT — adapt per institution. Required for every system at AEnt-M Medium+ on the audit plan.

**Owner:** Internal audit.
**Cadence:** per audit-plan cycle; minimum annual for High and Critical, biennial for Medium.

| Section | Content |
|---|---|
| **A. Scope and objectives** | System(s) in scope; consequence class(es); audit objectives expressed in terms of (i) management's stated risk responses, (ii) regulatory obligations (EU AI Act, DORA, GDPR, ISO 42001 if certified), (iii) manifesto-derived controls. |
| **B. Risk assessment** | Auditor's independent view of the risk profile; cross-reference to `operational-templates/ai-risk-register.md` and risk-appetite statement. |
| **C. Control universe** | Enumeration of design controls expected: AEnt-M P5 (three governance layers), P7 (relocation evidence), P8 (consequence-class accountability), P9 (composite-state acceptance), P11 (response classes); IGM P2/P3/P4/P5/P11/P13/P14/P15/P16; ISO 42001 Annex A controls in scope; EU AI Act articles applicable. |
| **D. Control walkthroughs** | One walkthrough per material control; named control owner; named operator; sample size; sample period. Evidence pointer per item. |
| **E. Substantive testing** | Tests selected per consequence class. Required tests for High/Critical: composite-state acceptance log review; epistemic-tier sample (claim provenance trace, decay status, contradictions); evidence-bundle completeness; relocation-stage advancement evidence. |
| **F. Findings** | Per finding: control referenced; observation; cause; effect; recommendation; management response; agreed remediation date; owner. Cross-reference to challenge log if applicable. |
| **G. Reliance on 1st and 2nd lines** | Where audit relies on 1st-line operational logs or 2nd-line challenge log, document the reliance basis and any independent corroboration performed. |
| **H. External assurance reliance** | If external (e.g., ISO 42001 certifier, model-card auditor) work is relied on, document the reliance basis. |
| **I. Conclusion** | Auditor's conclusion expressed as one of: satisfactory / satisfactory with observations / requires improvement / unsatisfactory. Linked to consequence-class implications and any escalation to audit committee. |
| **J. Audit committee report** | Summary suitable for the audit committee or board; quantitative metrics (findings by severity; trend vs prior period); qualitative narrative (control-environment assessment). |
| **K. Cross-references** | `governance/authority-accountability-matrix.md`, `governance/evidence-bundle-schema.md`, `regulatory/iso-42001-crosswalk.md`, `regulatory/eu-ai-act-addendum.md`, `regulatory/incidents-appendix.md` (read across for emerging-risk testing). |

**Mapping audit findings to manifesto authorities.**

| Finding type | IGM authority | AEnt-M role |
|---|---|---|
| Provenance-chain incomplete | Assertion + Revision | Workflow Owner (1st-line); Accountable Authority (signoff for High+) |
| Epistemic tier inflated for action consequence class | Inference + Semantic | Decision Reviewer / Accountable Authority |
| Contradictions not preserved | Revision | Accountable Authority |
| Composite-state acceptance missing or undocumented | (cross-cuts: Inference for downstream impact + Revision for cascade) | Accountable Authority (rejection / acceptance per consequence class) |
| Relocation advanced without control-equivalence evidence | (Revision; the evidence is substrate-quality) | Workflow Owner / Decision Reviewer / Accountable Authority depending on class |
| Response class default overridden without rationale | Revision | Governance authority (override evidence held in evidence bundle) |
| Supplier exit-trigger un-met-but-active | n/a | Accountable Authority + procurement steward |
| Evidence bundle non-conformance | All | Engineering steward + Accountable Authority |

This mapping ensures audit findings travel back through both governance vocabularies and reach the named accountable role for remediation.

---

## 4. Open DRAFT items requiring author judgment

- **DRAFT — author review needed:** COSO Principle 5 (capable individuals) is uncovered by either manifesto. Authors may add a competence / training requirement to AEnt-M P15 economics, or defer to ISO 42001 Clause 7.2 with cross-reference.
- **DRAFT — author review needed:** the COBIT 2023 AI-design-factor list is not yet exhaustive in this crosswalk. The full list of design factors will be revisited as ISACA publishes domain-specific guidance.
- **DRAFT — author review needed:** the 3rd-line audit working-paper template is institution-agnostic; some institutions integrate ISA assurance standards or PCAOB / EBA-specific requirements.
- **DRAFT — author review needed:** the worked-example challenge (CSDR fairness regression) is illustrative; replace with the institution's own scenario at adoption.

---

## 5. References

- COSO. *Enterprise Risk Management — Integrating with Strategy and Performance*, 2017.
- ISACA. *COBIT 2019 Framework: Governance and Management Objectives*, 2018; with 2022/2023 updates.
- IIA. *The IIA's Three Lines Model*, July 2020.
- `regulatory/nist-ai-rmf-crosswalk.md` — NIST mapping (stakeholder register, TEVV portfolio).
- `regulatory/iso-42001-crosswalk.md` — Annex A mapping; AIA, P/D/U RACI, supplier register templates.
- `regulatory/iso-23894-23053-crosswalk.md` — risk register example, vocabulary mapping.
- `regulatory/eu-ai-act-addendum.md` — Article 13/14/27/72/73 obligations.
- `regulatory/foundation-model-third-party-register.md` — DORA Pillar 4 register.
- `regulatory/incidents-appendix.md` — incident library for emerging-risk testing.
- `governance/authority-accountability-matrix.md` — RACI cross-reference.
- `governance/evidence-bundle-schema.md` — unified evidence schema.
- `operational-templates/ai-risk-register.md` — APO12 implementation.
- `operational-templates/risk-appetite-statement.md` — COSO Principle 7 implementation.
- `operational-templates/agent-inventory-schema.md` — BAI09 implementation.
- `operational-templates/decommissioning-checklist.md` — DSS04 implementation.
- `operational-templates/slo-table.md` — MEA01 implementation.
