# AI Risk Register Template

**Status:** Wave 2, item W2.7 — DRAFT (board / risk-committee approval required for institutional adoption).
**Audience:** AI risk-management leads, model-risk-management functions, 1st-line workflow / accountable owners, 2nd-line risk and compliance, internal audit, board risk committee.
**Purpose:** Standard register schema for AI risks across the manifesto-governed estate. Implements ISO/IEC 23894 + ISO 31000 risk-management process, COBIT APO12 Managed Risk, ISO/IEC 42001 Clause 6 / Annex A.5, and NIST AI RMF Map / Manage functions in a single artefact.

**Companion machine-readable schema:** `operational-templates/ai-risk-register.json`.
**Cross-references:** `regulatory/iso-23894-23053-crosswalk.md` (worked example with 10 risks), `regulatory/iso-42001-crosswalk.md`, `regulatory/coso-cobit-crosswalk.md`, `regulatory/nist-ai-rmf-crosswalk.md`, `operational-templates/risk-appetite-statement.md`, `governance/authority-accountability-matrix.md`.

**Repo-wide convention:** "epistemic tier" replaces "confidence" for the IGM scalar substrate-level meaning.

---

## 1. Schema (one row per risk)

| Field | Type | Required | Description |
|---|---|---|---|
| `risk_id` | string | yes | Stable identifier; format `risk-<system_id>-<short>` (e.g., `risk-csdr-002`). |
| `system_id` | string | yes | The AI system the risk relates to; matches `agent-inventory-schema.md`. May be `enterprise` for enterprise-level risks. |
| `register_version` | string | yes | Monotonic, dated; e.g., `2026-05-02-v3`. |
| `owner` | string | yes | Named role accountable for the risk record; one of: workflow owner / decision reviewer / accountable authority / dual authority / governance authority / engineering steward / procurement steward / DPO / security reviewer / 2nd-line risk / 3rd-line audit. |
| `category` | enum | yes | One of: `technical`, `operational`, `regulatory`, `reputational`, `strategic`. |
| `description` | string | yes | One-paragraph statement of what could go wrong. |
| `cause` | string | yes | Root-cause hypothesis(es); ties to ISO 23894 risk source. |
| `effect` | string | yes | Worst-credible-case effect. |
| `likelihood` | enum | yes | `Very Low / Low / Medium / High / Very High` — calibrate per `operational-templates/risk-appetite-statement.md`. |
| `impact` | enum | yes | `Very Low / Low / Medium / High / Very High`. |
| `inherent_risk` | enum | yes | Combination of likelihood × impact pre-treatment. |
| `treatment_iso31000` | enum | yes | One of: `Avoid / Modify / Share / Retain / Pursue Opportunity`. |
| `response_class_aentm` | enum | yes | One of: `Block / Escalate / Restrict scope / Advisory only / Continue with enhanced monitoring`. |
| `manifesto_controls` | array of strings | yes | List of IGM and AEnt-M principles + ISO 42001 Annex A controls implementing the treatment. |
| `treatment_owner` | string | yes | Named role responsible for executing treatment. |
| `treatment_evidence` | string | yes | Pointer(s) to evidence-bundle artefact(s) demonstrating treatment is in place. |
| `residual_likelihood` | enum | yes | Post-treatment likelihood. |
| `residual_impact` | enum | yes | Post-treatment impact. |
| `residual_risk` | enum | yes | Post-treatment combination. |
| `risk_appetite_alignment` | enum | yes | `Within appetite / At threshold / Above appetite — escalation required`. |
| `consequence_class` | enum | yes | AEnt-M consequence class of affected actions: `Low / Medium / High / Critical`. |
| `epistemic_tier_required` | enum | yes | Required IGM epistemic tier for actions in scope: `Provisional / Candidate / Confirmed / High Confidence / Authoritative`. |
| `review_cadence` | string | yes | E.g., `Quarterly`, `Per release`, `Annual + on incident`. |
| `last_review_date` | ISO date | yes | When this row was last reviewed. |
| `next_review_date` | ISO date | yes | Auto-calculated from cadence; review overdue triggers escalation. |
| `last_reviewer` | string | yes | Named reviewer. |
| `escalation_trigger` | string | yes | Condition under which the risk is escalated to governance authority or board risk committee. |
| `linked_artefacts` | array of strings | yes | AIA reference, FRIA reference, supplier register row, regulatory addendum sections, evidence bundles. |
| `incidents_realised` | array of strings | optional | If the risk has materialised (in part or whole), list of incident IDs cross-referenced to `regulatory/incidents-appendix.md` style record. |
| `notes` | string | optional | Free-form. |

---

## 2. Worked examples (5–10 risks for a typical FS agentic-enterprise deployment)

The 10 worked rows are detailed in `regulatory/iso-23894-23053-crosswalk.md` §4. Reproduced below in the register schema for adoption convenience. Five additional enterprise-level rows are added for portfolio risk.

### 2.1 System-level: `csdr-penalty-agent-001`

| risk_id | category | description (one-line) | likelihood | impact | inherent | treatment_iso31000 | response_class_aentm | manifesto_controls | treatment_owner | residual | review_cadence |
|---|---|---|---|---|---|---|---|---|---|---|---|
| risk-csdr-001 | technical | Foundation-model upgrade changes calculation behaviour without notice | Medium | High | High | Modify + Share | Block | AEnt-M P9, P16; ISO 42001 A.10.3; supplier register exit clauses | Accountable authority (cross-border) | Medium | Per release + quarterly |
| risk-csdr-002 | technical | Confabulation of CSD penalty rate when substrate silent | High | High | Critical | Modify | Block | IGM P3, P13; AEnt-M P11; TEVV confabulation test | Engineering steward + IGM revision | Low | Per release + monthly |
| risk-csdr-003 | operational | L3 ESMA amendment cascades through stale L2 claims | Medium | High | High | Modify | Restrict scope | IGM P5, P11; ISO 42001 A.6.2.6 | IGM revision + accountable authority | Low | Per regulator pub + quarterly |
| risk-csdr-004 | regulatory | EU AI Act Art 73 15-day clock missed | Low | High | High | Modify | Block + escalate | EU AI Act addendum §Art 73 | Governance authority | Low | Annual + post-incident |
| risk-csdr-005 | reputational | Disparate impact on non-EEA counterparties | Medium | Medium | Medium | Modify | Escalate to Decision Reviewer | TEVV fairness test (NIST §3.2); ISO 42001 A.5.4 | Workflow owner + 2nd-line compliance | Low | Quarterly |
| risk-csdr-006 | strategic | Foundation-model deprecation with insufficient transition window | Medium | Medium | Medium | Share + Modify | Continue with monitoring | AEnt-M P16; supplier register exit plan | Procurement + engineering steward | Medium | Quarterly + on event |
| risk-csdr-007 | operational | Indirect prompt injection via regulator-correspondence PDF | Low | High | High | Modify | Block | IGM P14 attack-surface; quarterly red-team | Security reviewer + IGM assertion | Low | Quarterly |
| risk-csdr-008 | technical | Cascading failure across orchestrated agents | Medium | High | High | Modify | Restrict scope | AEnt-M P5; cascading-failure simulation | Architecture steward | Low | Annual |
| risk-csdr-009 | regulatory | DORA Pillar 2 4h notification clock missed | Low | High | High | Modify + Share | Block | DORA Pillar 2; supplier incident-notification clause | Governance + operational-resilience | Low | Annual + post-incident |
| risk-csdr-010 | regulatory | GDPR Article 22 challenge from affected counterparty employee | Low | Medium | Medium | Modify | Escalate to Decision Reviewer | GDPR Art 22 register; EU AI Act Art 86 | Accountable authority + DPO | Low | Annual |

### 2.2 Enterprise-level (cross-system) — five additional rows

| risk_id | category | description (one-line) | likelihood | impact | inherent | treatment_iso31000 | response_class_aentm | manifesto_controls | treatment_owner | residual | review_cadence |
|---|---|---|---|---|---|---|---|---|---|---|---|
| risk-ent-001 | strategic | Shadow-agent estate (CSA 2026 — 82% of firms had unknown agents) | High | High | Critical | Modify | Continue (with discovery + registration) | Agent inventory schema; quarterly discovery scan; AEnt-M P9 | Engineering steward + governance authority | Medium | Quarterly |
| risk-ent-002 | regulatory | Aggregated foundation-model concentration risk (single provider serving multiple Critical-class systems) | Medium | High | High | Modify + Share | Continue (with portfolio diversification) | Supplier register criticality + substitutability index ≥3 → exit-plan required | Procurement steward + governance authority | Medium | Semi-annual |
| risk-ent-003 | reputational | AI-washing (DocGo SDNY 2025): external statements about AI capability inconsistent with actual implementation | Low | High | High | Avoid | Block public-disclosure changes lacking evidence-bundle | AEnt-M P14 governance authority; disclosure-control gate | CRO + General Counsel + governance authority | Low | Per material disclosure |
| risk-ent-004 | technical | Composite-state drift undetected across portfolio when foundation-model auto-updates | Medium | High | High | Modify | Block (default reject for composite-state change) | AEnt-M P9; supplier change-management clauses | Engineering steward + accountable authorities (per system) | Low | Continuous |
| risk-ent-005 | operational | Lifecycle desynchronisation: substrate updates outpace delivery / agent lifecycles, producing projected-stale claims at deploy time | Medium | Medium | Medium | Modify | Restrict scope (decay-window enforcement at release gate) | IGM P5; AEnt-M P12; concurrent-lifecycle sequencing rules (W2.8) | Accountable authority + engineering steward | Low | Quarterly |

---

## 3. Operational rules

- **Naming and freshness.** Every row must have a named owner (no "the team"). A row whose `next_review_date` is in the past is overdue; overdue rows for High/Critical impact escalate to governance authority within 5 business days.
- **Residual risk above appetite.** A row with `risk_appetite_alignment = Above appetite — escalation required` is reported to the board risk committee at the next scheduled meeting (or sooner per consequence class).
- **Linkage to evidence.** Every treatment must point to evidence (test artefacts, control records, contractual clauses). Treatments without evidence are treated as un-implemented for risk-aggregation purposes.
- **Aggregation.** Enterprise risks are aggregated by category and by foundation-model provider; aggregation is reviewed at every governance authority cadence.
- **Incident realisation.** When a risk materialises (incident occurs), the row is annotated with the incident ID; lessons-learned feed into either the row's treatment refinement or new rows.
- **Lifecycle.** Risks are not deleted; retired risks are marked `status = retired` with rationale and date, but row history is preserved for audit reconstruction.

---

## 4. Open DRAFT items requiring author judgment

- **DRAFT — author review needed:** likelihood / impact scales should be calibrated against the institution's existing enterprise risk register conventions; the 5-point scale here is illustrative.
- **DRAFT — author review needed:** worked-example rows are illustrative for an FS settlement use case; replace at adoption.
- **DRAFT — author review needed:** "Pursue Opportunity" treatment option (ISO 31000) is in the schema but unused in the worked examples. Authors may exclude or extend usage.

---

## 5. References

- ISO/IEC 23894:2023; ISO 31000:2018.
- COBIT 2019/2023 APO12 Managed Risk.
- ISO/IEC 42001:2023 Clause 6, Annex A.5.
- NIST AI RMF 1.0 Map and Manage functions.
- `regulatory/iso-23894-23053-crosswalk.md` — worked example detail.
- `operational-templates/ai-risk-register.json` — machine-readable schema.
- `operational-templates/risk-appetite-statement.md` — appetite reference.
- `operational-templates/agent-inventory-schema.md` — system_id source.
- `operational-templates/slo-table.md` — review-cadence inputs.
