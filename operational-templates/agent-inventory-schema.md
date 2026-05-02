# Agent Inventory Schema — Discovery and Registration

**Status:** Wave 2, item W2.7 — DRAFT (governance-authority signoff required for institutional adoption).
**Audience:** AI governance authority, engineering stewards, security reviewer, procurement steward, internal audit, AEnt-M accountable authorities, ISO 42001 A.4.4 / GV.1.6 evidence reviewers.
**Purpose:** Standard schema for discovering, registering, and continuously inventorying every AI agent the institution operates — including in-house, procured, and SaaS-embedded agents. Implements NIST AI RMF GV.1.6, ISO/IEC 42001 A.4.2 / A.4.4, COBIT BAI09 Managed Assets, and AEnt-M Principle 9 (composite-state visibility).

**Companion machine-readable schema:** `operational-templates/agent-inventory-schema.json`.
**Cross-references:** `operational-templates/ai-risk-register.md`, `operational-templates/decommissioning-checklist.md`, `regulatory/foundation-model-third-party-register.md`, `regulatory/iso-42001-crosswalk.md`, `regulatory/incidents-appendix.md`, `governance/authority-accountability-matrix.md`.

**Repo-wide convention:** "epistemic tier" replaces "confidence" for the IGM scalar substrate-level meaning.

---

## 1. Why this schema is non-optional

The Cloud Security Alliance's April 2026 survey *Autonomous but Not Controlled: AI Agent Incidents Now Common in Enterprises* found that **82% of enterprises have unknown AI agents in their environments**, **65% of organizations have experienced AI-agent-related incidents in the past 12 months**, and **only 21% have formal AI-agent decommissioning processes**. (See `regulatory/incidents-appendix.md` for the full citation.)

Without a registered estate, no other manifesto control operates: composite-state acceptance (AEnt-M P9) cannot apply to systems that are not registered; the foundation-model third-party register (DORA Pillar 4) cannot enumerate dependencies of unregistered agents; the AI risk register cannot price unknown exposure; the EU AI Act's high-risk inventory cannot be produced. **Discovery, registration, and the registration gate are prerequisites for every other control.**

---

## 2. Schema (one row per agent)

| Field | Type | Required | Description |
|---|---|---|---|
| `agent_id` | string | yes | Stable identifier; human-meaningful; e.g., `csdr-penalty-agent-001`. Immutable across composite-state changes; only retired in decommissioning. |
| `inventory_version` | string | yes | Monotonic, dated; e.g., `2026-05-02-v3`. |
| `display_name` | string | yes | Human-readable name. |
| `description` | string | yes | One-paragraph summary of intended purpose and operating domain. |
| `owner` | string | yes | Named accountable role per AEnt-M P8 consequence class. |
| `engineering_steward` | string | yes | Named engineer responsible for build / maintenance. |
| `governance_authority` | string | yes | Named role per AEnt-M P14. |
| `procurement_owner` | string | conditional | Required if any third-party / SaaS / foundation-model dependency. |
| `dpo_owner` | string | conditional | Required if personal data processed. |
| `security_owner` | string | yes | Named role responsible for AI-specific security (red-team, attack-surface, incident response). |
| `autonomy_tier` | enum | yes | AEM Tier per `manifesto-principles.md`: `Tier 1` (Author) / `Tier 2` (Reviewer) / `Tier 3` (Approver) / `Tier 4` (Operate-within-envelope). |
| `tier_4_envelope_id` | string | conditional | Required if `autonomy_tier = Tier 4`; matches the envelope approval document. |
| `consequence_classes_served` | array of enum | yes | Subset of `[Low, Medium, High, Critical]` — every consequence class the agent operates in. |
| `aentm_relocation_stage_per_class` | object | yes | For each `consequence_classes_served` entry, the AEnt-M relocation stage: `Full synchronous` / `Parallel run` / `Monitored relocation` / `Operational relocation`. |
| `foundation_models` | array of objects | yes | Each: `provider`, `model_family`, `model_version`, `last_evaluation_date`, `next_evaluation_due`, `composite_state_hash_at_last_evaluation`. Cross-reference `regulatory/foundation-model-third-party-register.md`. |
| `composite_state_hash_current` | string | yes | Hash of the current composite state (application code commit + system prompt revision + foundation-model version + knowledge-base version + memory-state checkpoint). Recomputed on every change. |
| `composite_state_history` | array of objects | yes | Append-only log of composite-state hashes with timestamp, change type, accepting authority. |
| `igm_domains_accessed` | array of strings | yes | IGM domain identifiers the agent reasons over. |
| `igm_authorities_in_scope` | array of strings | yes | Subset of `[Semantic, Assertion, Inference, Revision]` for the domains accessed. |
| `epistemic_tier_required_per_class` | object | yes | For each consequence class served, the required epistemic tier (Provisional / Candidate / Confirmed / High Confidence / Authoritative). |
| `action_classes_authorized` | array of strings | yes | Each authorised action class with brief description; matches AEnt-M P9 class register. |
| `data_in_scope` | object | yes | `personal_data` (boolean), `special_categories` (boolean), `client_data` (boolean), `regulator_correspondence` (boolean), `market_data` (boolean), `internal_only` (boolean). |
| `gdpr_lawful_basis` | string | conditional | Required if `personal_data = true`. |
| `regulatory_classification` | object | yes | `eu_ai_act_high_risk` (boolean), `eu_ai_act_annex_iii_item` (string or null), `dora_ictservice` (boolean), `dora_ctpp_chain` (boolean), `gdpr_art22_in_scope` (boolean), `sectoral_classification` (string). |
| `initiative_authorization_status` | enum | yes | `Not authorized` / `Authorized — limited scope` / `Authorized — full scope` / `Suspended`. Per AEnt-M Initiative Authorization Gate (W1.11). |
| `initiative_three_conditions_evidence` | object | conditional | Required if `initiative_authorization_status != Not authorized`: `substrate_depth_evidence`, `constraint_legibility_evidence`, `governance_relocation_evidence`, signoff date, signatory. |
| `last_aia_date` | ISO date | yes | Last AI Impact Assessment per `regulatory/iso-42001-crosswalk.md` §3.1. |
| `next_aia_due` | ISO date | yes | Per AIA reassessment triggers. |
| `last_evaluation_date` | ISO date | yes | TEVV portfolio last full run; cross-reference `regulatory/nist-ai-rmf-crosswalk.md` §3.2. |
| `next_evaluation_due` | ISO date | yes | Per evaluation cadence. |
| `last_red_team_date` | ISO date | yes | Quarterly minimum. |
| `next_red_team_due` | ISO date | yes |  |
| `slo_register_link` | string | yes | Pointer to applicable rows in `operational-templates/slo-table.md`. |
| `linked_risk_register_ids` | array of strings | yes | Risk-register rows for this agent. |
| `linked_supplier_register_ids` | array of strings | yes | Supplier-register rows. |
| `discovery_metadata` | object | yes | How the agent was discovered: `discovery_method` (`Self-registered` / `Automated scan` / `Manual report` / `Audit finding`), `discovery_date`, `registration_gate_passed_date`. |
| `decommission_plan` | string | conditional | Required if agent is targeted for decommissioning; matches `operational-templates/decommissioning-checklist.md`. |
| `status` | enum | yes | `Proposed` / `In-build` / `Pre-production` / `Production` / `Suspended` / `Decommissioning` / `Retired`. |
| `last_review_date` | ISO date | yes |  |
| `next_review_date` | ISO date | yes | Cadence: monthly for Critical, quarterly for High, semi-annual for Medium, annual for Low. |
| `notes` | string | optional |  |

---

## 3. Discovery procedure

The institution maintains a continuous discovery capability covering self-registration, automated scan, integration test, and the registration gate. Discovery and registration is owned by the engineering steward and governance authority jointly.

### 3.1 Self-registration (1st-line — primary path)

- Every team building or procuring an AI system registers the agent in the inventory **before** any production traffic is permitted.
- Self-registration produces a draft row at `status = Proposed`.
- Self-registration is the only path that does not require post-hoc remediation.

### 3.2 Automated scan (2nd-line / security — discovery path)

The institution operates an automated scanning capability that runs at least weekly and detects:

- Foundation-model API calls from any internal source not matched against an inventory row (LLM-API egress; vendor-SDK invocations; embedding-API calls).
- Vector-database / graph-database write paths from unregistered sources.
- SaaS-embedded agents shipped with vendor applications (per Gartner: 40% of enterprise apps will ship with embedded agents by end-2026).
- Scheduled or triggered jobs whose output structure resembles AI-generated content (heuristic).
- Data-flow patterns matching agent-style multi-turn behavior.

Scan findings produce an "unregistered agent candidate" record. Each candidate is triaged within 5 business days; a candidate confirmed as an AI system is moved to the discovery queue.

### 3.3 Integration test (registration gate — gate path)

Before an agent reaches `status = Production`, it passes the **registration gate**:

| Gate condition | Evidence |
|---|---|
| All required schema fields populated | Schema validator passes. |
| AIA performed and current | `last_aia_date` ≤ AIA cadence. |
| TEVV portfolio run with passing results for the consequence class | Test artefacts attached; cross-reference `regulatory/nist-ai-rmf-crosswalk.md` §3.2. |
| Foundation-model entries reconciled with `regulatory/foundation-model-third-party-register.md` | Cross-link verified. |
| Risk register has at least the baseline rows for the agent's category profile | `linked_risk_register_ids` populated. |
| SLO rows defined and linked | `slo_register_link` populated. |
| Authority assignments match consequence class | Authority matrix consulted; signatures present. |
| For Tier 4: envelope approval document referenced and the four AEM prerequisites verified operational | Cross-reference `governance/governance-integration-note.md` §1.1. |
| For initiative-authorized: three-condition evidence attached and signed off | `initiative_three_conditions_evidence` populated. |
| Decommissioning plan stub created | `decommission_plan` non-empty even at production entry. |

Failure of any gate condition blocks production entry. Override of the gate requires governance-authority signoff with rationale documented in the row's `notes` and an explicit remediation plan with deadline.

### 3.4 Continuous reconciliation

- The inventory is reconciled monthly against (i) automated scan results, (ii) procurement records, (iii) foundation-model third-party register, (iv) ASDLC release manifests, (v) SLO breach incidents.
- Any reconciliation gap triggers a 2nd-line risk register entry.

---

## 4. Operational rules

- **Composite-state hash on every change.** Any change to application code, system prompt, foundation-model version, knowledge base, or memory-state checkpoint produces a new `composite_state_hash_current`; the prior value is appended to `composite_state_history` with the accepting authority. Default for unaccepted change is `reject` per AEnt-M P9.
- **Foundation-model version drift detection.** When provider notifies a model version change (or an automated check detects one), the agent enters a 24h composite-state-evaluation window. If the change is not explicitly accepted within the window, the agent is automatically suspended for that consequence class until accepted or rolled back.
- **Initiative status review.** `initiative_authorization_status` is reviewed quarterly. Auto-revocation triggers: any of the three conditions falls below threshold; any incident attributable to initiative behavior; any 2σ degradation in decision-quality vs synchronous baseline (Wave-1 W1.11).
- **Status transitions.** `Proposed → In-build → Pre-production → Production` requires gate evidence; `Production → Suspended` is unilateral by governance authority on any high-severity event; `Production → Decommissioning → Retired` follows `operational-templates/decommissioning-checklist.md`.
- **Audit linkage.** Every inventory row has at least one corresponding audit working paper (`regulatory/coso-cobit-crosswalk.md` §3.3) at the next audit cycle.

---

## 5. Discovery and registration metrics (feeds the appetite statement)

- **Inventory coverage.** Production AI systems registered / production AI systems detected. Target: ≥ 99%; appetite threshold > 5% gap (`operational-templates/risk-appetite-statement.md` §3.1 strategic).
- **Discovery-to-registration latency.** Median days from automated-scan flag to gate-passed registration. Target: ≤ 30 days.
- **Gate-failure rate.** Proportion of registration gate attempts failing on first submission. Target: ≤ 30% (high failure rate indicates quality issues; very low rate indicates gate is too lenient).
- **Composite-state acceptance latency.** Median hours from foundation-model change detected to composite-state acceptance / rejection. Target: < 24h for High/Critical classes.
- **Initiative auto-revocation rate.** Proportion of initiative-authorized agents auto-revoked per quarter. Trend metric (sudden rise indicates substrate or supplier instability).

---

## 6. Open DRAFT items requiring author judgment

- **DRAFT — author review needed:** the schema's discovery-metadata categories (`Self-registered` / `Automated scan` / `Manual report` / `Audit finding`) may be expanded to track procurement-side discovery (vendor disclosures) and customer-driven discovery (client demand for embedded-agent transparency).
- **DRAFT — author review needed:** the composite-state hash mechanism is unspecified at the cryptographic level; institutions must select an algorithm and key-management approach (deferred to security architecture).
- **DRAFT — author review needed:** review-cadence calibration (monthly Critical, quarterly High, etc.) is illustrative; some institutions will tighten for high-velocity foundation-model environments.

---

## 7. References

- ISO/IEC 42001:2023 Annex A.4.2, A.4.4; Clause 4 (Context).
- NIST AI RMF 1.0 GV.1.6 (system inventory), GV.1.7 (decommissioning).
- COBIT 2019/2023 BAI09 Managed Assets.
- Cloud Security Alliance, *Autonomous but Not Controlled: AI Agent Incidents Now Common in Enterprises*, April 2026 — survey of 418 IT/security professionals (commissioned by Token Security).
- `operational-templates/agent-inventory-schema.json` — machine-readable.
- `operational-templates/ai-risk-register.md` — linked rows.
- `operational-templates/decommissioning-checklist.md` — retirement workflow.
- `operational-templates/slo-table.md` — SLO references.
- `regulatory/foundation-model-third-party-register.md` — supplier crosslink.
- `regulatory/iso-42001-crosswalk.md` — Annex A control mapping.
- `regulatory/incidents-appendix.md` — CSA 2026 finding citation.
- `governance/governance-integration-note.md` — Tier 4 envelope context.
- `governance/authority-accountability-matrix.md` — owner-naming reference.
