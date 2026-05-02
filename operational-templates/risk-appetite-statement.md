# AI Risk Appetite Statement (Board-Level Template)

**Status:** **DRAFT — board approval required.** This template is illustrative; thresholds, exposures, and qualitative narrative must be calibrated by the board (or board risk committee) before adoption. Do not publish or operationalise without board signoff.

**Wave 2, item W2.7.**
**Audience:** Board, board risk committee, CEO, CRO, CFO, General Counsel, CIO, CDO, AI governance authority, internal audit (3rd line), regulators.
**Purpose:** Express the board's tolerance for AI-related risk in quantitative thresholds and qualitative narrative. Underpins COSO ERM Principle 7 (Defines risk appetite), ISO/IEC 23894 risk-criteria step, COBIT EDM03 Ensured Risk Optimisation, and ISO/IEC 42001 Clauses 5 and 6. Defines the boundary at which 1st-line operations escalate; gives the 2nd line and 3rd line a stable yardstick; gives regulators a coherent answer to "what does your board accept?"

**Cross-references:** `operational-templates/ai-risk-register.md`, `regulatory/iso-23894-23053-crosswalk.md`, `regulatory/nist-ai-rmf-crosswalk.md` (stakeholder register), `regulatory/eu-ai-act-addendum.md`, `regulatory/coso-cobit-crosswalk.md`, `governance/authority-accountability-matrix.md`.

**Repo-wide convention:** "epistemic tier" replaces "confidence" for the IGM scalar substrate-level meaning.

---

## 1. Preamble

> The Board recognises that the agentic enterprise is built on three governed substrates: engineered code, governed intelligence, and a governed agent estate. Risk-bearing actions taken by AI systems remain the institution's actions; AI does not absorb accountability. The Board's appetite below applies to the institution's use of AI systems whether developed in-house, procured, or embedded in vendor SaaS. The Board reaffirms that the Agentic Engineering Manifesto principle — *agents may not accept residual risk, approve production exposure, waive controls, or absorb accountability for business outcomes* — is the floor; this statement defines the ceiling.

This statement is reviewed at least annually and on any material change in regulatory environment, foundation-model supplier landscape, or agent estate scale.

---

## 2. Scope

This appetite applies to:

- All AI systems deployed in production, regardless of consequence class (Low, Medium, High, Critical per AEnt-M P8).
- All AI systems in pre-production where the institution intends to deploy.
- All AI systems embedded in third-party SaaS used by the institution (via the AI supplier register, ISO 42001 A.10).
- All foundation-model providers in scope of the foundation-model third-party register (DORA Pillar 4).

Out of scope: research-only systems with no production touchpoint and no provider relationship (these are governed under research data-use policy, not this statement).

---

## 3. Quantitative thresholds (DRAFT — calibrate per institution)

These thresholds define the boundary between "within appetite" (operate as designed), "at threshold" (escalate), and "above appetite" (board-level intervention).

### 3.1 By risk category

| Category | Metric | Within appetite | At threshold (2nd-line escalation) | Above appetite (board escalation) |
|---|---|---|---|---|
| **Technical — substrate / model integrity** | Confabulation rate on TEVV portfolio (per system) | ≤ 0.5% | 0.5% – 1.5% | > 1.5% |
| | Composite-state changes accepted vs rejected ratio (rolling 90-day) | ≥ 1.5× rejected (institution leans toward rejection) | 1× ratio | < 1× ratio (institution accepts more than it rejects without enhanced review) |
| | Cascading-failure simulation pass rate | 100% | One simulation requires re-run | Two consecutive failures |
| **Operational — incidents** | AI-attributable incidents per quarter (any consequence class) | ≤ 4 | 5 – 8 | > 8 |
| | AI-attributable incidents per quarter (High/Critical consequence) | 0 | 1 | ≥ 2 |
| | Mean time-to-detection (MTTD) for AI incidents | ≤ 4 hours | 4–24 hours | > 24 hours |
| | Mean time-to-remediation (MTTR) for AI incidents (any) | ≤ 5 business days | 5–10 business days | > 10 business days |
| | MTTR for High/Critical incidents | ≤ 24 hours | 24–72 hours | > 72 hours |
| **Operational — financial exposure** | € exposure per AI-attributable incident (single-event) | ≤ €100k | €100k – €500k | > €500k |
| | Annual aggregate AI-attributable losses | ≤ €1m | €1m – €3m | > €3m |
| **Regulatory — reporting clocks** | EU AI Act Article 73 2-day clock missed (per year) | 0 | n/a (immediate escalation on miss) | ≥ 1 |
| | EU AI Act Article 73 15-day clock missed | 0 | n/a (immediate escalation) | ≥ 1 |
| | DORA Pillar 2 4h notification clock missed | 0 | n/a (immediate escalation) | ≥ 1 |
| | GDPR Art 33 72h breach-notification clock missed | 0 | n/a (immediate escalation) | ≥ 1 |
| | Material regulatory finding referencing AI controls | 0 | 1 (lessons learned + remediation plan) | ≥ 2 in rolling 12 months |
| **Reputational** | Material adverse media events linking AI failure to institution name | 0 | 1 minor (factual reporting) | ≥ 1 sustained / ≥ 2 minor / any naming an executive |
| | AI-washing-style disclosure issues (DocGo SDNY pattern) | 0 | n/a (immediate escalation) | ≥ 1 |
| **Strategic** | Foundation-model supplier concentration (% of Critical-class systems served by single provider) | ≤ 50% | 50% – 75% | > 75% |
| | Number of suppliers with criticality ≥3 lacking documented exit plan | 0 | 1 – 2 | > 2 |
| | Shadow-agent estate (% of production AI systems not on inventory) | ≤ 1% | 1% – 5% | > 5% |
| | Critical-class systems with AIA older than 12 months | 0 | 1 | ≥ 2 |

### 3.2 By consequence class

| Consequence class | Default risk tolerance | Override authority |
|---|---|---|
| **Low** | Risks within Low impact accepted; medium-impact risks treated to Low residual within 90 days. | Workflow owner; review by 2nd line. |
| **Medium** | Risks above Medium residual escalated; treatment to Low residual within 60 days expected. | Decision Reviewer; review by 2nd line. |
| **High** | Residual risk must be Low or Very Low; Medium residual permitted only with named compensating control and ≤ 30-day remediation plan. | Accountable Authority; signoff by governance authority. |
| **Critical** | Residual risk must be Very Low. No deployment with Medium+ residual. | Dual Authority + governance authority. |

### 3.3 By foundation-model dependency

| Dependency profile | Tolerance |
|---|---|
| Single provider, Critical-class system | Exit plan + alternative-supplier evaluation refreshed quarterly. |
| Single provider, multiple Critical-class systems | Concentration > 50% triggers diversification plan within 12 months. |
| Provider in restructuring / financial distress | Immediate evaluation of exit plan; consider transition. |
| Provider on regulator's CTPP list | Formal joint examination preparedness; tabletop exercises ≥ annual. |

---

## 4. Qualitative narrative — what the Board accepts vs rejects

### 4.1 The Board accepts (within appetite)

- **Initiative under three earned conditions** (AEnt-M P6): substrate depth, constraint legibility, governance relocation. Initiative without all three is rejected.
- **Operational relocation** of governance for action classes where decision-quality comparison vs synchronous baseline is at parity or better, evidenced per `governance/governance-integration-note.md` Rule R4.
- **Composite-state changes from suppliers** when the change is detected, evaluated, and explicitly accepted with named accountability.
- **Foundation-model dependence** when the supplier is on the supplier register, criticality is assessed, exit triggers and exit plan are documented, and concentration is within thresholds (§3.3).
- **Residual risk at Low/Very Low after treatment** for High/Critical consequence systems.
- **Routine claim revalidation, contradiction resolution within decay window** without case-by-case board approval, per `governance/governance-integration-note.md` Rule R3 reversion classes.

### 4.2 The Board does not accept (above appetite)

- **Shadow agents in production.** Any AI system not on the agent inventory schema is unauthorised; discovery → register-or-decommission within the discovery cadence (`operational-templates/agent-inventory-schema.md`).
- **Initiative without the three conditions.** Surfacing action opportunities is permitted; acting on them under initiative without earning the three conditions is not.
- **Operational relocation without control-equivalence evidence.** AEnt-M Stage 4 (Operational) for any class without documented decision-quality comparison is rejected.
- **Critical-class actions on substrate below "Authoritative" epistemic tier.** No exception.
- **Automated decisions producing legal or similarly significant effect on a natural person without an Article 22 / Article 86 pathway** documented in the system's AIA.
- **AI-related public statements without evidence-bundle backing.** AI-washing pattern (DocGo SDNY 2025) is unacceptable; the General Counsel and CRO must signoff on material public statements concerning AI capability.
- **Procurement of AI systems without ISO 42001 A.10 / supplier-register entry.** No exception.
- **Failure to meet regulatory reporting clocks (EU AI Act Article 73 2-day / 15-day; DORA Pillar 2 4h / 72h / 1-month; GDPR Art 33 72h).** Immediate board escalation; remediation plan required at next board meeting.
- **Foundation-model concentration above 75% on Critical-class systems** without an active diversification programme.

### 4.3 Areas where the Board reserves judgment

- **Use of generative AI for client-facing content.** Permitted only with named human accountability and consequence-class controls; the Board reviews scope annually.
- **Agent initiative in regulated client interactions.** Currently restricted to advisory-only outputs; scope expansion requires explicit Board action.
- **Cross-border substrate sharing.** Subject to data-protection, sector-regulator, and national-security review prior to expansion.

---

## 5. Operationalisation

### 5.1 Roles and authorities

| Role | Responsibility |
|---|---|
| Board / Board Risk Committee | Approve / refresh appetite annually; receive escalations above appetite. |
| CRO / Group AI Risk Officer | Own the appetite statement; report against it quarterly. |
| Governance authority (per AEnt-M P14) | Operate the appetite for in-scope systems; report exceptions. |
| Accountable authority / Decision Reviewer / Workflow Owner | Operate within appetite for their consequence class; escalate threshold breaches. |
| Internal audit (3rd line) | Independently assess adherence; report to audit committee. |
| External audit / regulators | Receive disclosure as required. |

### 5.2 Reporting cadence

- **Board Risk Committee:** quarterly dashboard against quantitative thresholds; immediate paper on any "above appetite" event.
- **Audit Committee:** annual review of internal-audit findings; semi-annual deep-dive on a selected AI-system risk theme.
- **Governance authority:** monthly portfolio review; quarterly refresh of supplier-register concentration.
- **Public disclosure:** material AI risk factors disclosed in annual report consistent with applicable securities-disclosure obligations.

### 5.3 Escalation pathway

1. **Within appetite.** 1st line operates; 2nd line samples; record in risk register (`operational-templates/ai-risk-register.md`).
2. **At threshold.** 2nd-line risk-and-compliance issues challenge log entry (`regulatory/coso-cobit-crosswalk.md` §3.2); 1st-line owner produces remediation plan within consequence-class SLO.
3. **Above appetite.** Immediate notification to governance authority and Group AI Risk Officer; risk register row reclassified `Above appetite — escalation required`; agenda item at next Board Risk Committee or sooner per consequence class.

### 5.4 Tolerances vs targets

This statement specifies **tolerances** (limits beyond which the institution will not operate without board action), not **targets** (preferred operating points). 1st-line management may set internal targets within tolerance to drive continuous improvement.

---

## 6. Open DRAFT items requiring board judgment

- **DRAFT — board calibration required:** every quantitative threshold in §3 is illustrative. Calibrate against the institution's risk profile, financial materiality thresholds, and existing enterprise risk-appetite ratios.
- **DRAFT — board judgment required:** the qualitative narrative in §4 reflects manifesto-aligned positions. Boards may modify based on strategic posture, but every "does not accept" item that is loosened increases regulatory exposure.
- **DRAFT — author note:** if the institution maintains a single enterprise risk-appetite statement, this AI appetite is a sub-section under it, not a parallel document. Reconciliation with enterprise-level appetite is required.

---

## 7. References

- COSO ERM 2017 Principle 7.
- ISO/IEC 23894:2023; ISO 31000:2018 risk-criteria step.
- ISO/IEC 42001:2023 Clauses 5 and 6.
- COBIT 2019/2023 EDM03.
- `operational-templates/ai-risk-register.md` — the operating register against this appetite.
- `regulatory/iso-23894-23053-crosswalk.md` — risk-treatment vocabulary.
- `regulatory/coso-cobit-crosswalk.md` — Three-Lines artefacts.
- `regulatory/eu-ai-act-addendum.md` — Article 73 incident clocks.
- `regulatory/incidents-appendix.md` — exemplar events the appetite is designed to prevent.
- `governance/authority-accountability-matrix.md` — escalation authorities.
