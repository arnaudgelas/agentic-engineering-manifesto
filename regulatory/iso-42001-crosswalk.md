# ISO/IEC 42001:2023 Annex A Crosswalk + Operational Templates

**Status:** Wave 2, item W2.10 — DRAFT (regulatory-reviewer signoff required before publication).
**Audience:** AI Management System (AIMS) certification leads, CROs, internal audit, regulators, ISO 42001 auditors.
**Purpose:** Map IGM and AEnt-M principles to ISO/IEC 42001:2023 Annex A controls (A.2 policies through A.10 third-party). Identify gaps. Provide three new templates required to close the most significant gaps:

1. **AI Impact Assessment template** (A.5).
2. **Provider/Deployer/User RACI** (A.9).
3. **AI supplier register** (A.10) — extending the foundation-model register from W1.6.

**Sources cited:**
- ISO/IEC 42001:2023 *Information technology — Artificial intelligence — Management system*, particularly Clauses 4–10 and Annex A controls A.2.2 through A.10.4.
- ISO/IEC TR 24368:2022 *Information technology — Artificial intelligence — Overview of ethical and societal concerns* (referenced for A.5 impact-assessment scope).

**Cross-references:** `regulatory/nist-ai-rmf-crosswalk.md` (W2.9), `regulatory/iso-23894-23053-crosswalk.md` (W2.13), `regulatory/eu-ai-act-addendum.md` (W1.5), `regulatory/foundation-model-third-party-register.md` (W1.6), `governance/evidence-bundle-schema.md`, `governance/authority-accountability-matrix.md`, `operational-templates/ai-risk-register.md`.

**Repo-wide convention:** "epistemic tier" replaces "confidence" for the IGM scalar substrate-level meaning.

---

## 1. ISO/IEC 42001 Clauses 4–10 — management-system mapping (high level)

ISO 42001 specifies the AI management system (AIMS). Clauses 4–10 establish the system; Annex A enumerates the control objectives.

| 42001 Clause | Theme | IGM coverage | AEnt-M coverage | Combined gap |
|---|---|---|---|---|
| 4 — Context of organization | Internal/external issues, scope of AIMS | P (P1 claim scope) | P (P14 enterprise) | Stakeholder register (NIST MP gap; see `regulatory/nist-ai-rmf-crosswalk.md` §3.1). |
| 5 — Leadership | Policy, roles, commitment | P (P6) | S (P8/P14) | Risk-appetite statement (`operational-templates/risk-appetite-statement.md`). |
| 6 — Planning | Risks/opportunities, AI objectives, change management | P | P (P12) | AI risk register (`operational-templates/ai-risk-register.md`). |
| 7 — Support | Resources, competence, communication, documented information | P (P12 unfunded mandates) | P (P15 economics) | None. |
| 8 — Operation | Operational planning and control; AI risk assessment & treatment; AIA | P (P5/P10) | S (P9/P11/P12) | AI Impact Assessment (§3). |
| 9 — Performance evaluation | Monitoring, internal audit, management review | S (P5/P11) | S (P9/P14) | SLO table (`operational-templates/slo-table.md`). |
| 10 — Improvement | Nonconformity, corrective action | S (P4/P5) | S (P11/P12) | Incident workflow (Article 73; addendum). |

---

## 2. Annex A controls — detailed crosswalk

Coverage codes: **S** = Strong; **P** = Partial; **M** = Missing.

### A.2 — Policies related to AI

| Control | Title | IGM | AEnt-M | Action |
|---|---|---|---|---|
| A.2.2 | AI policy | P | S (P14) | Adopt AEnt-M as the canonical AI policy; reference IGM for substrate policy. |
| A.2.3 | Alignment with other organizational policies | P | P | None. |
| A.2.4 | Review of the AI policy | P | P (P12 lifecycles) | Annual review cadence — adopt as SLO. |

### A.3 — Internal organization

| Control | Title | IGM | AEnt-M | Action |
|---|---|---|---|---|
| A.3.2 | AI roles and responsibilities | S (P6 four authorities) | S (P8 consequence-class roles) | Authority matrix (W1.4). |
| A.3.3 | Reporting of concerns | M | P (P11 escalation) | Adopt whistleblowing / concern-reporting procedure; cross-reference CoE Article 11. |

### A.4 — Resources for AI systems

| Control | Title | IGM | AEnt-M | Action |
|---|---|---|---|---|
| A.4.2 | Resource documentation | P (P12) | P (P15) | Adopt agent-inventory-schema (W2.7). |
| A.4.3 | Data resources | S (P1, P5, P10) | P (P3) | None. |
| A.4.4 | Tooling resources | M | P (P5 layered governance) | Adopt agent-inventory-schema; cross-link to ASDLC. |
| A.4.5 | System and computing resources | M | P (P15) | Adopt as cost-of-correctness sub-discipline. |
| A.4.6 | Human resources | P (P8 expert input) | S (P8) | None. |

### A.5 — Assessing impacts of AI systems

| Control | Title | IGM | AEnt-M | Action |
|---|---|---|---|---|
| A.5.2 | AI system impact assessment process | M | P (consequence classes imply impact) | **Adopt AI Impact Assessment template (§3.1).** |
| A.5.3 | Documentation of AI system impact assessments | M | M | Same — see §3.1. |
| A.5.4 | Assessing AI system impact on individuals or groups | M | M | Same; ties to NIST MP.4.1 + EU AI Act Article 27 FRIA. |
| A.5.5 | Assessing societal impacts of AI systems | M | M | Same; ties to OECD/CoE accountability. |

### A.6 — AI system life cycle

| Control | Title | IGM | AEnt-M | Action |
|---|---|---|---|---|
| A.6.1.2 | Objectives for responsible development of AI systems | P | S (P14) | None. |
| A.6.1.3 | Processes for responsible AI system design and development | S (P5/P10) | S (P5/P12) | None. |
| A.6.2.2 | AI system requirements & specification | P (P9) | P (P3) | Tie to AEM P2 and ASDLC. |
| A.6.2.3 | Documentation of AI system design and development | S (P11) | S (P9 composite-state) | None. |
| A.6.2.4 | AI system verification and validation | P (P13) | P (P7 control equivalence) | Adopt TEVV portfolio (`regulatory/nist-ai-rmf-crosswalk.md` §3.2). |
| A.6.2.5 | AI system deployment | P | S (P9) | None. |
| A.6.2.6 | AI system operation and monitoring | S (P5/P10) | S (P9/P14) | Adopt SLO table. |
| A.6.2.7 | AI system technical documentation | S (P11) | S (P9) | Evidence-bundle schema. |
| A.6.2.8 | AI system event logs | S (P11) | S (P11/P14) | Evidence-bundle schema. |

### A.7 — Data for AI systems

| Control | Title | IGM | AEnt-M | Action |
|---|---|---|---|---|
| A.7.2 | Data for development and enhancement | S (P1/P2/P10) | P | None. |
| A.7.3 | Acquisition of data | S (P7 acquisition modes) | P | None. |
| A.7.4 | Quality of data for AI systems | S (P3 epistemic tier; P13 validation) | S (P3) | None. |
| A.7.5 | Data provenance | S (P2 provenance) | S (P3) | None. |
| A.7.6 | Data preparation | S (P5) | P | None. |

### A.8 — Information for interested parties of AI systems

| Control | Title | IGM | AEnt-M | Action |
|---|---|---|---|---|
| A.8.2 | System documentation and information for users | P (P11) | S (P5) | EU AI Act Article 13 deployer-instructions (addendum). |
| A.8.3 | External reporting | M | P | Adopt incident-reporting workflow (addendum). |
| A.8.4 | Communication of incidents | M | P | Adopt incident-reporting workflow. |
| A.8.5 | Information for interested parties | M | P | Stakeholder register (NIST §3.1). |

### A.9 — Use of AI systems

| Control | Title | IGM | AEnt-M | Action |
|---|---|---|---|---|
| A.9.2 | Processes for responsible use of AI systems | P (P11) | S (P5/P11) | None. |
| A.9.3 | Objectives for responsible use | P | S (P14) | None. |
| A.9.4 | Intended use | P (P1 scope) | S (P5) | **Adopt Provider/Deployer/User RACI (§3.2).** |

### A.10 — Third-party and customer relationships

| Control | Title | IGM | AEnt-M | Action |
|---|---|---|---|---|
| A.10.2 | Allocating responsibilities | M | P (P16) | **Adopt AI supplier register (§3.3) extending W1.6.** |
| A.10.3 | Suppliers | M | S (P16) | Same — §3.3. |
| A.10.4 | Customers | M | P | Same — §3.3 includes customer-side relationships. |

---

## 3. New templates closing the structural gaps

### 3.1 AI Impact Assessment (AIA) template — A.5 control

**Status:** DRAFT — board / regulatory-reviewer signoff required before adoption per system.

**Scope:** one AIA per AI system at first deployment; reassess on triggers (see "Reassessment triggers"). Required for all systems classified as Medium / High / Critical consequence (AEnt-M P8). Optional but recommended for Low.

#### 3.1.1 Header

| Field | Value |
|---|---|
| `aia_id` | `<system_id>-aia-<yyyymmdd>` |
| `system_id` | matches `operational-templates/agent-inventory-schema.md` |
| `aia_version` | monotonic, dated |
| `assessment_date` | ISO date |
| `assessment_owner` | named role; AEnt-M P8 accountable for the consequence class |
| `assessment_reviewers` | named roles; ≥1 governance authority signoff for Medium+; ≥2 for Critical |
| `linked_artefacts` | risk register, FRIA (if EU AI Act high-risk), DPIA (if GDPR), supplier register entries |
| `next_reassessment_due` | ISO date |

#### 3.1.2 Scope

- Intended purpose (one paragraph).
- Operating domain(s) and jurisdictions.
- AEnt-M consequence class (Low / Medium / High / Critical) with rationale.
- EU AI Act risk classification (high-risk if Annex III; or limited / minimal).
- DORA criticality (CTPP-served? ICT third-party dependency?).
- GDPR Article 35 DPIA reference if personal data is processed.
- Foundation-model dependencies (cross-reference: `regulatory/foundation-model-third-party-register.md`).

#### 3.1.3 Affected stakeholders (NIST MP.4.1)

Reproduce or reference the system's stakeholder & impacted-population register (`regulatory/nist-ai-rmf-crosswalk.md` §3.1). At minimum:

- Direct users / operators.
- Indirect users (downstream consumers of outputs).
- Affected individuals (natural persons whose interests may be impacted).
- Affected groups (jurisdictional, demographic, occupational).
- Affected communities (markets, public sector, environment).
- Vulnerable populations.

#### 3.1.4 Individual impact analysis

Per stakeholder category, assess:

| Dimension | Analysis prompts |
|---|---|
| Rights & freedoms | Does the system make decisions affecting individuals' legal status, access to services, financial position, or other significant interests? Article 22 GDPR applicable? Article 86 EU AI Act explanation right applicable? |
| Privacy | Personal data processed (categories, special categories per Art 9 GDPR)? Lawful basis? Retention? |
| Fairness | Disparate-impact risk on protected characteristics? Mitigations? Fairness testing in TEVV portfolio? |
| Health & safety | Could erroneous output cause physical or psychological harm? |
| Autonomy | Does the system constrain individual choice or agency? |
| Redress | What remedies are available if the system errs? Cross-reference: `regulatory/eu-ai-act-addendum.md` (Article 86). |

#### 3.1.5 Societal impact analysis

| Dimension | Analysis prompts |
|---|---|
| Market integrity | Does the system affect price formation, settlement integrity, market access? |
| Competition | Does deployment alter competitive dynamics in the relevant market? |
| Public trust | Could failure damage trust in the institution, sector, or AI broadly? |
| Democracy / public discourse | Does the system affect electoral, deliberative, or media-integrity processes? (Usually N/A for FS but record.) |
| Concentration | Does deployment increase systemic dependency on a few foundation-model providers? |

#### 3.1.6 Environmental impact analysis

| Dimension | Analysis prompts |
|---|---|
| Energy | Inference compute footprint per transaction; provider-disclosed PUE if available. |
| Water | Provider-disclosed water consumption (data-centre cooling). |
| E-waste | Hardware lifecycle; refresh cadence. |
| Mitigation | Workload-rightsizing; model-distillation; inference-time optimization; renewable-energy commitments. |

#### 3.1.7 Reassessment triggers

The AIA must be re-run when any of the following occurs:

- Foundation-model version change crossing a composite-state boundary (AEnt-M P9).
- Material change in operating domain (new jurisdiction, new product line).
- Material change in stakeholder population.
- Material change in regulatory environment (e.g., new EU AI Act delegated act; new Annex III item).
- Detected harm or near-miss above a defined threshold (cross-reference: `operational-templates/ai-risk-register.md`).
- Annual review (mandatory minimum).
- Substantive substrate-level (IGM L3) change cascading into the system's claim dependencies.
- Material change in third-party / supplier landscape (loss of supplier, exit-trigger event).

#### 3.1.8 Outcome and signoff

- Risks identified (entered into `operational-templates/ai-risk-register.md`).
- Treatments identified (linked to AEnt-M P11 response classes and ISO 23894 treatment options).
- Residual risk assessed against board risk appetite (`operational-templates/risk-appetite-statement.md`).
- Authorisation: deploy / deploy-with-conditions / do-not-deploy.
- Named signatories and date.

---

### 3.2 Provider / Deployer / User RACI — A.9 control

**Status:** DRAFT — adapt to institutional org-chart; example below assumes a typical financial-services deployment of a third-party-provided foundation model used inside an in-house agent (the "FS deployer" pattern).

**Roles defined (ISO 42001 + EU AI Act vocabulary):**

- **Provider** — places the AI system on the market or puts it into service under its own name (EU AI Act Article 3(3)). Example: foundation-model vendor.
- **Deployer** — uses an AI system under its authority (Article 3(4)). Example: the FS firm deploying agents.
- **User** — natural person using or interacting with the system; in B2B FS, often an internal operator or downstream client.
- **Distributor / Importer** — secondary providers (often N/A for FS in-house deployments; record if applicable).

**RACI legend:** R = Responsible (does the work); A = Accountable (decision; one per row); C = Consulted; I = Informed.

| Activity | Provider | Deployer | User | AEnt-M role mapping | IGM authority |
|---|---|---|---|---|---|
| Foundation-model training & alignment | A, R | I | I | n/a | n/a |
| Foundation-model evaluation report (model card) | A, R | C | I | engineering steward (consume) | n/a |
| Deployment-context AIA (§3.1) | I | A, R | C | accountable authority (consequence-class) | semantic + assertion authorities |
| Stakeholder & impacted-population register | I | A, R | C | accountable authority | semantic |
| TEVV portfolio for the deployed system | C (model card inputs) | A, R | I | engineering steward + security reviewer | inference (validation) + revision (regression) |
| Substrate / domain-graph maintenance | n/a | A, R | C | workflow / decision / accountable / dual authority depending on class | all four |
| Composite-state acceptance (P9) | I (publishes notice) | A, R | I | accountable authority | revision (cascade) + inference (downstream) |
| Incident detection in production | I | A, R | R (report) | workflow owner (detect) → accountable authority (decide) | revision (claim impact) |
| Incident reporting to regulator (Article 73) | n/a | A, R | I | governance authority (Critical) / accountable authority (High) | n/a |
| Provider-side incident notification to deployer | A, R | I (consume) | I | engineering steward (consume) | n/a |
| Foundation-model deprecation / EOL handling | A, R (notice) | A, R (transition) | I | accountable authority | revision (claim invalidation) |
| Data-subject rights handling (GDPR Art. 22) | C (provider DPA terms) | A, R | R (request) | accountable authority for Medium+; workflow owner for Low | n/a |
| Explanation request (Art. 86 EU AI Act) | C | A, R | R (request) | accountable authority | inference + assertion |
| Model-update advisory | A, R | I (consume) | I | engineering steward + accountable authority | revision |
| Decommissioning | n/a (provider context) | A, R | I | governance authority | revision (final cascade) |

**Reading rule.** When provider and deployer disagree about a row, deployer is accountable to its own regulators (DORA Pillar 4 explicitly: deployer cannot delegate accountability). Contractual flow-down is the mechanism (cross-reference: `regulatory/foundation-model-third-party-register.md` exit triggers and accountability clauses).

---

### 3.3 AI supplier register — A.10 control

**Status:** DRAFT — extends `regulatory/foundation-model-third-party-register.md` (W1.6) to full third-party scope (data providers, tooling providers, evaluation providers, hosting providers, distributors).

**Scope.** Every third party whose service materially affects an in-scope AI system. Coverage:

- Foundation-model providers (already in W1.6 register; cross-reference, do not duplicate).
- Embedding / retrieval providers.
- Vector / graph database providers.
- Data-feed providers (regulatory, market, reference data).
- Annotation / labelling providers.
- Evaluation and red-team-as-a-service providers.
- Hosting / cloud / GPU providers (for self-hosted models).
- AI-tooling providers (orchestration frameworks, agent platforms).
- Consultancies engaged on AI-system development.

**Schema (per supplier).**

| Field | Description |
|---|---|
| `supplier_id` | Stable identifier. |
| `supplier_name` | Legal entity. |
| `supplier_category` | Foundation-model / embedding / data / evaluation / hosting / tooling / consultancy / other. |
| `service_in_scope` | Specific service consumed. |
| `systems_using_supplier` | List of `system_id` values. |
| `criticality` | DORA classification: ICT third-party? CTPP-served? Foundation-model substitutability index (1–5; 1 = highly substitutable, 5 = locked-in). |
| `contract_owner` | Named role; procurement steward. |
| `legal_basis` | Contract, framework agreement, data-processing agreement, model-licence terms. |
| `data_in_scope` | What data flows to/from the supplier; personal data categories if applicable. |
| `gdpr_role` | Controller / processor / sub-processor; Article 28 contract reference if processor. |
| `sub_processors` | Onward chain. |
| `regulatory_obligations_flowed_down` | EU AI Act provider obligations? DORA ICT third-party clauses? GDPR Art 28 clauses? Audit rights? |
| `evidence_obligations` | Model card, evaluation reports, incident reports, change advisories — with cadence. |
| `incident_reporting_clause` | Provider-to-deployer notification SLA; deployer-to-regulator handoff. |
| `change_management_clause` | Notice period for model / service changes; composite-state implications. |
| `exit_triggers` | Conditions under which deployer exits the relationship (security breach, regulatory change, unilateral material change to terms, performance degradation thresholds). |
| `exit_plan` | Concrete plan: alternative supplier identified; data-portability arrangements; transition timeline. Required for criticality ≥3. |
| `last_review_date` | ISO date. |
| `next_review_date` | ISO date. |
| `register_owner` | Named role. |
| `dora_designation` | If supplier is CTPP-served, the joint-examination authority and reporting cadence. |

**Worked example — a foundation-model provider** (illustrative; extends the W1.6 register with full Annex A.10 fields):

| Field | Value (illustrative) |
|---|---|
| `supplier_id` | `fm-provider-001` |
| `supplier_name` | Anthropic, PBC (illustrative) |
| `supplier_category` | Foundation-model |
| `service_in_scope` | Claude family inference API (current model: claude-opus-4-7) |
| `systems_using_supplier` | `csdr-penalty-agent-001`, `client-reporting-agent-001`, `compliance-research-agent-001` |
| `criticality` | ICT third-party; CTPP-served (DORA examination expected); substitutability index 3/5 (large vendor, multiple competitive options exist; cutover effort is non-trivial). |
| `contract_owner` | Procurement steward (Group Procurement) |
| `legal_basis` | Master Service Agreement + DPA |
| `data_in_scope` | Inference inputs may include claim text, regulatory-source excerpts, reasoning traces; no client PII flowed through under current architecture (verify quarterly). |
| `gdpr_role` | Processor under Article 28; sub-processor list reviewed annually. |
| `regulatory_obligations_flowed_down` | EU AI Act provider obligations to be flowed down per addendum 2026-Q3 contract refresh; GDPR Art 28 clauses present; audit rights with 30-day notice. |
| `evidence_obligations` | Model card per release; quarterly incident report; change advisories ≥30 days before composite-state-relevant model change. |
| `exit_triggers` | (a) Security breach affecting deployer's data; (b) provider unilateral material change to model behaviour without 30-day notice; (c) regulatory change that prevents lawful use; (d) sustained P95 inference latency > X ms over 7 days. |
| `exit_plan` | Alternative provider identified (DRAFT); fallback model evaluation refreshed quarterly; transition targeted within 90 days from trigger. |
| `last_review_date` | 2026-04-15 |
| `next_review_date` | 2026-07-15 |
| `register_owner` | Engineering steward + procurement steward |
| `dora_designation` | CTPP examination tracked via Group ICT Risk; joint examination cycle 2026-Q4. |

**Operational rule.** Every supplier with criticality ≥3 must have a documented exit plan and at least one identified alternative supplier with a refreshed evaluation no older than the supplier's review cadence. Failure to maintain this is a deployer-side AIMS nonconformity (42001 Clause 10).

---

## 4. Open DRAFT items requiring author judgment

- **DRAFT — author review needed:** the AIA template (§3.1) reassessment-trigger thresholds (e.g., "material change") are deliberately qualitative; calibrate per domain. Some institutions may quantify via a change-impact-score.
- **DRAFT — author review needed:** the Provider/Deployer/User RACI (§3.2) example assumes no Distributor / Importer. For multi-tenant or reseller arrangements the RACI must be extended.
- **DRAFT — author review needed:** the AI supplier register (§3.3) substitutability index (1–5) is illustrative; institutions may use a different scale or DORA's CTPP designation directly.
- **DRAFT — author review needed:** worked example uses Anthropic / Claude Opus 4.7 to illustrate format; replace with deployer's actual supplier set before publication.

---

## 5. References

- ISO/IEC 42001:2023, *Information technology — Artificial intelligence — Management system*. Clauses 4–10; Annex A controls A.2–A.10.
- ISO/IEC TR 24368:2022, *Information technology — Artificial intelligence — Overview of ethical and societal concerns*.
- `regulatory/nist-ai-rmf-crosswalk.md` — NIST mapping; stakeholder register (§3.1) feeds AIA template.
- `regulatory/iso-23894-23053-crosswalk.md` — risk register example.
- `regulatory/eu-ai-act-addendum.md` — Article 27 (FRIA), Article 13 (deployer instructions), Article 73 (incidents), Article 86 (explanation).
- `regulatory/foundation-model-third-party-register.md` — DORA Pillar 4 register; supplier register (§3.3) extends it.
- `governance/evidence-bundle-schema.md` — unified evidence schema referenced by A.6.2.7 / A.6.2.8.
- `governance/authority-accountability-matrix.md` — RACI cross-reference.
- `operational-templates/ai-risk-register.md` — A.5.2 outcomes feed into this register.
- `operational-templates/risk-appetite-statement.md` — A.5.4/A.5.5 residual-risk acceptance.
