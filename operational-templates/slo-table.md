# Consolidated SLO Table

**Status:** Wave 2, item W2.7 — DRAFT (governance-authority signoff required for institutional adoption; calibrate quantitative values per institution).
**Audience:** AI governance authority, accountable authorities, workflow owners, engineering steward, IGM revision authority, security reviewer, internal audit, regulators.
**Purpose:** Single consolidated Service-Level-Objectives table covering: feedback-loop closure, claim revalidation, contradiction resolution, composite-state acceptance, incident reporting (regulator), incident reporting (internal), waiver expiry. Each SLO has a named accountable role.

**Cross-references:** `operational-templates/ai-risk-register.md`, `operational-templates/agent-inventory-schema.md`, `operational-templates/risk-appetite-statement.md`, `regulatory/eu-ai-act-addendum.md`, `regulatory/iso-23894-23053-crosswalk.md`, `governance/authority-accountability-matrix.md`.

**Repo-wide convention:** "epistemic tier" replaces "confidence" for the IGM scalar substrate-level meaning.

---

## 1. SLO conventions

- **Direction.** All SLOs are stated as ceilings unless explicitly noted ("≤ X" — "must not exceed X").
- **Measurement basis.** Calendar hours unless noted; business hours basis stated where used.
- **Breach handling.** Each SLO has a defined breach handler (the row's "Accountable role"). Breach + non-remediation within stated remediation window = escalation per the row.
- **Auditability.** Every measured SLO must have a queryable evidence path: log → metric → report. Evidence retention follows the agent's regulatory-classification retention policy.
- **Calibration.** Quantitative thresholds below are illustrative starting values aligned with the manifestos' P1 metric calibration concerns (`igm-aent-coherence-review.md` Theme T6). Institutions must calibrate against their consequence-class definitions and risk appetite.

---

## 2. SLO table

| # | SLO | Threshold | Measurement window | Consequence class | Accountable role | Breach handler | Linked artefacts |
|---|---|---|---|---|---|---|---|
| **Feedback-loop closure (IGM P10)** | | | | | | | |
| 1 | Time from production engagement to substrate update with engagement-derived claim or null result | ≤ 14 days | Continuous | All classes | Engineering steward + IGM assertion authority | If breach: investigate why feedback path is blocked; escalate to governance authority on second consecutive breach | IGM P10; agent inventory feedback-status field |
| 2 | Proportion of engagements that produce a feedback artefact (claim, contradiction, or null record) | ≥ 80% | Rolling 30-day | All classes | Workflow owner | Below threshold for High/Critical → revert relocation stage one level | IGM P10 |
| **Claim revalidation (IGM P5 / decay class)** | | | | | | | |
| 3 | Regulatory decay-class claim revalidation cadence | ≤ quarterly (or per regulator publication) | Continuous | All classes | Regulatory authority (legal/compliance) | Overdue regulatory revalidation → claim demotion + restrict-scope on dependent High/Critical action classes | IGM P5 decay-class table; AEnt-M P10 decay-class table |
| 4 | Procedure decay-class revalidation cadence | ≤ quarterly | Continuous | All classes | Process owner | Overdue → demotion | IGM/AEnt-M decay-class table |
| 5 | Vendor-config decay-class revalidation cadence | Per vendor release | Continuous | All classes | Engineering steward | Overdue → composite-state acceptance gate | Composite-state acceptance |
| 6 | Operational-workaround decay-class revalidation cadence | ≤ monthly | Continuous | All classes | Operations steward | Overdue → demotion + escalation | Decay-class table |
| 7 | Reference-data decay-class revalidation cadence | Per publication (daily–annual depending on series) | Continuous | All classes | Data steward | Overdue → demotion | Decay-class table |
| 8 | Foundational decay-class revalidation cadence | ≤ annual | Continuous | All classes | Domain expert | Overdue → review and demotion if confirmed | Decay-class table |
| 9 | Critical-path claim revalidation latency on demotion (claims used by High/Critical actions) | ≤ 4 hours from demotion notification to action-class reversion | Per demotion event | High / Critical | IGM revision authority + accountable authority | Breach → governance authority + immediate suspend of the affected action class | IGM P5; AEnt-M P9 governance-integration-note Rule R3 |
| **Contradiction resolution (IGM P4)** | | | | | | | |
| 10 | Time from contradiction detection to typed-classification (logical / temporal / jurisdictional / scope-divergence) | ≤ 24 hours | Per contradiction | All classes | IGM assertion authority | Breach → revision authority intervention; affected action classes restrict scope | IGM P4 |
| 11 | Time from typed-classification to resolution (preservation, supersession, scoped reconciliation, or escalation) | ≤ 5 business days for non-Critical paths; ≤ 24 hours for Critical-path contradictions | Per contradiction | All classes | IGM revision authority + (for Critical) accountable authority | Breach → governance authority; Critical-path contradictions Block dependent actions | IGM P4; AEnt-M P11 |
| 12 | Material-contradiction classification SLO (per W1.10 precedence) | ≤ 4 hours from detection | Per contradiction | High / Critical | Governance authority + IGM revision | Breach → escalation | governance-integration-note Rule R3 |
| **Composite-state acceptance (AEnt-M P9)** | | | | | | | |
| 13 | Time from composite-state-change detection to explicit acceptance / rejection decision | ≤ 24 hours for High/Critical; ≤ 5 business days for Medium; ≤ 10 business days for Low | Per change event | Per class | Accountable authority (per consequence class) | Auto-suspend agent for the affected consequence class on breach until decision is recorded | AEnt-M P9; agent inventory composite-state-history |
| 14 | Default decision when SLO 13 expires | Reject (suspend) | n/a | All | Engineering steward (executes) | n/a | AEnt-M P9 default reject |
| 15 | Provider-side composite-state advisory ingestion latency | ≤ 24 hours from provider notice to inventory entry | Per provider notice | All | Engineering steward + procurement steward | Breach → 2nd-line challenge | Supplier register change-management clause |
| **Incident reporting — regulator** | | | | | | | |
| 16 | EU AI Act Article 73 — serious-incident notification, death / widespread infringement | ≤ 2 days from awareness | Per incident | Critical (typically) | Governance authority + General Counsel | Breach → board notification; regulatory exposure | EU AI Act addendum §Article 73 |
| 17 | EU AI Act Article 73 — serious-incident notification, other categories | ≤ 15 days from awareness | Per incident | High / Critical | Governance authority + General Counsel | Breach → board notification | EU AI Act addendum |
| 18 | DORA Pillar 2 — major ICT-related incident initial notification | ≤ 4 hours from classification | Per incident | High / Critical | Governance authority + operational-resilience function | Breach → ICT regulator escalation; board notification | DORA Pillar 2 |
| 19 | DORA Pillar 2 — intermediate report | ≤ 72 hours | Per incident | High / Critical | Operational-resilience function | Breach → escalation | DORA Pillar 2 |
| 20 | DORA Pillar 2 — final report | ≤ 1 month | Per incident | High / Critical | Operational-resilience function | Breach → escalation | DORA Pillar 2 |
| 21 | GDPR Article 33 — data-breach notification to supervisory authority | ≤ 72 hours from awareness | Per personal-data breach | Per data scope | DPO + governance authority | Breach → GDPR enforcement risk | GDPR Art 33 |
| 22 | GDPR Article 34 — communication to data subjects (high-risk to rights and freedoms) | "Without undue delay" — institution sets internal SLO ≤ 5 business days | Per qualifying breach | Per data scope | DPO + General Counsel | Breach → enforcement risk | GDPR Art 34 |
| **Incident reporting — internal** | | | | | | | |
| 23 | Mean time-to-detection (MTTD) for AI incidents | ≤ 4 hours | Rolling 90-day | All | Security reviewer + workflow owner | Breach of rolling threshold → 2nd-line challenge; appetite-threshold breach (`risk-appetite-statement.md` §3.1) | Risk-appetite statement |
| 24 | Mean time-to-remediation (MTTR) for AI incidents — any | ≤ 5 business days | Rolling 90-day | All | Engineering steward + accountable authority | Breach → 2nd-line challenge | Risk-appetite statement |
| 25 | MTTR for High/Critical AI incidents | ≤ 24 hours | Per incident + rolling 90-day | High / Critical | Accountable authority + governance authority | Breach → board paper at next risk committee | Risk-appetite statement |
| 26 | Time from incident classification to risk-register update | ≤ 48 hours | Per incident | All | 2nd-line risk + accountable authority | Breach → 3rd-line audit finding | Risk register |
| 27 | Time from regulatory-incident filing to internal post-mortem | ≤ 30 calendar days from filing close | Per incident | All | Governance authority | Breach → audit committee paper | Internal audit |
| **Waiver expiry (manifesto-wide)** | | | | | | | |
| 28 | Active-waiver review cadence | ≤ quarterly | Continuous | All classes | Waiver owner + governance authority | Overdue review → waiver expires automatically | AEM waiver model; IGM Confidence-Tier Waiver (W2.20) |
| 29 | Waiver expiry handling — auto-expire on stated date | Honored on stated date | Per waiver | All | Engineering steward (executes) | At expiry: action class subject to waiver returns to non-waivered control; if compensating control still required, new waiver via fresh signoff | AEM waiver model |
| 30 | Waiver-expiry-without-renewal compensating-control review | ≤ 5 business days post-expiry | Per expiry | All | Waiver owner | Breach → 2nd-line escalation | Waiver register (cross-link to ASDLC waiver-governance) |
| **Initiative authorisation (W1.11)** | | | | | | | |
| 31 | Initiative-authorisation quarterly review | ≤ 90 days between reviews | Continuous | All initiative-authorised systems | Governance authority + accountable authority | Overdue → auto-revoke initiative status; system reverts to non-initiative operation | AEnt-M Initiative Authorization Gate |
| 32 | Initiative auto-revocation latency on metric degradation | ≤ 24 hours from threshold breach to revocation | Per breach event | All | Governance authority + engineering steward | Breach → governance-authority paper at next cadence | Initiative gate |
| **Discovery & inventory (CSA 2026 / NIST GV.1.6)** | | | | | | | |
| 33 | Time from automated-scan flag of unregistered agent to triage decision | ≤ 5 business days | Continuous | All | Engineering steward + governance authority | Breach → 2nd-line challenge | Agent inventory schema §3.2 |
| 34 | Time from triage-as-AI-system to gate-passed registration or decommissioning | ≤ 30 days | Per discovery | All | Engineering steward + accountable authority | Breach → governance authority paper | Agent inventory schema §3.3 |
| **Stakeholder-rights handling** | | | | | | | |
| 35 | GDPR Article 22 / EU AI Act Article 86 explanation request response | ≤ 30 days from request (per GDPR Art 12) | Per request | All scoped systems | Accountable authority + DPO | Breach → GDPR enforcement risk; complaint pathway | GDPR Art 22; EU AI Act Art 86 |
| 36 | Article 22 right-to-human-review request handling | ≤ 30 days | Per request | All scoped | Accountable authority | Breach → escalation | GDPR Art 22 |

---

## 3. SLO operationalisation

- **Dashboard.** Rows are surfaced in a governance dashboard reviewed by the governance authority monthly; the board risk committee receives a quarterly summary.
- **Linkage.** Each SLO row is linked to (i) the relevant manifesto principle, (ii) the relevant external-standard clause, (iii) the relevant agent-inventory field, and (iv) the relevant risk-register row that triggers if the SLO breaches.
- **Compounding breaches.** Two or more SLO breaches affecting the same agent within the same review window auto-escalates to the governance authority; three or more auto-escalates to the board risk committee.
- **Integration with composite-state.** SLO 13/14 are the operational instantiation of AEnt-M P9's "default reject" rule; SLO 9 / 12 are the operational instantiation of `governance/governance-integration-note.md` Rule R3 reversion.

---

## 4. Open DRAFT items requiring author judgment

- **DRAFT — author review needed:** every quantitative threshold above is illustrative; calibrate against existing institutional SLAs and regulatory obligations. EU AI Act Article 73 thresholds are statutory and not negotiable.
- **DRAFT — author review needed:** SLOs 23/24/25 are aligned with the risk-appetite-statement thresholds; if the appetite statement is calibrated differently, this table must be reconciled.
- **DRAFT — author review needed:** GDPR Article 34 communication-to-data-subjects SLO is qualitative ("without undue delay") — institution sets internal SLO; 5 business days is illustrative.
- **DRAFT — author review needed:** SLO 31 quarterly review of initiative authorisation is aligned with W1.11; some institutions may shorten for high-velocity domains.
- **DRAFT — author review needed:** the table currently does not enumerate SLOs for the foundation-model third-party register's exit-trigger response (e.g., time-to-cutover on triggered exit). When `regulatory/foundation-model-third-party-register.md` (W1.6) is finalised, add corresponding rows.

---

## 5. References

- IGM `manifesto-principles.md` — P4, P5, P10, P11.
- AEnt-M `manifesto.md` — P9, P11; companion-guide.md decay-class table.
- AEM `manifesto-principles.md` — Tier 4 prerequisites; waiver model.
- EU AI Act Article 73 (serious-incident reporting); Article 86 (explanation right).
- DORA Pillar 2 (incident classification and reporting): RTS on classification of major ICT-related incidents.
- GDPR Articles 22, 33, 34.
- Cloud Security Alliance, *Autonomous but Not Controlled*, April 2026.
- `operational-templates/ai-risk-register.md` — paired register.
- `operational-templates/agent-inventory-schema.md` — paired inventory.
- `operational-templates/risk-appetite-statement.md` — appetite linkage.
- `governance/authority-accountability-matrix.md` — accountable-role naming.
- `governance/governance-integration-note.md` — Rule R3 reversion linkage.
