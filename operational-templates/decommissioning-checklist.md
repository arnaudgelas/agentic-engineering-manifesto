# Decommissioning Checklist — Retired Agents and Retired Claims

**Status:** Wave 2, item W2.7 — DRAFT (governance-authority signoff required for institutional adoption).
**Audience:** AI governance authority, engineering steward, IGM revision authority, accountable authority, procurement steward, DPO, security reviewer, internal audit.
**Purpose:** Standard checklist for the orderly retirement of (a) AI agents and (b) IGM claims (or claim families). Implements ISO/IEC 42001 A.6.2.6 + A.10 retirement obligations, NIST AI RMF GV.1.7 (decommissioning processes with stakeholder communication), MG.2.3 (deactivation procedures), COBIT DSS04 Managed Continuity (transition planning), AEnt-M Principle 12 (retirement lifecycle), and IGM Principle 5 (Curate / retire).

**This checklist dovetails with `integration/decommissioning.md` (planned by A8 — `integration/` directory currently empty).** When that document is produced, this template becomes the operational artefact it references; cross-link both directions at adoption.

**Cross-references:** `operational-templates/agent-inventory-schema.md`, `operational-templates/ai-risk-register.md`, `regulatory/foundation-model-third-party-register.md`, `regulatory/iso-42001-crosswalk.md`, `governance/authority-accountability-matrix.md`.

**Repo-wide convention:** "epistemic tier" replaces "confidence" for the IGM scalar substrate-level meaning.

**CSA 2026 finding context.** The Cloud Security Alliance survey *Autonomous but Not Controlled* (April 2026) reported that **only 21% of organizations have formal AI agent decommissioning processes**. Adoption of this checklist closes that gap.

---

## 1. Triggers for decommissioning

### 1.1 Agent decommissioning triggers

- Replacement by a successor agent (functional supersession).
- Foundation-model deprecation with no viable successor on the existing supplier; transition complete.
- Sustained failure to maintain regulatory classification fitness (e.g., system fails high-risk obligations and remediation cost is greater than retirement cost).
- Sustained risk-appetite breach with no remediation path.
- Substrate dependencies retired or consolidated such that the agent's domain disappears.
- Strategic change (line of business exit, jurisdictional withdrawal).
- Provider exit (supplier register exit-trigger fires).
- Regulatory directive (forced retirement by competent authority).
- Discovery: retroactively-discovered agent that fails the registration gate beyond remediation.

### 1.2 Claim (or claim-family) retirement triggers

- L3 supersession that invalidates an L2 claim chain (IGM P5 Curate).
- Provenance integrity breach (P14) — cryptographic provenance fails on revalidation.
- Sustained validation failure (P13) — claim cannot be revalidated against observable reality.
- Decay-window expiry without revalidation (P5).
- Source retraction (the source authority retracts the original publication).
- Corruption / poisoning detection.
- Domain consolidation (claim family superseded by reorganised domain).

---

## 2. Decommissioning checklist — agents

For each retired agent, every item below is completed and evidenced. The checklist is owned by the governance authority for the agent's highest consequence class served; the engineering steward executes; cross-functional reviewers signoff.

### Phase 1 — Decision and announcement

- [ ] **Decommissioning rationale documented.** Reference trigger from §1.1; link to risk register row(s) if applicable.
- [ ] **Decommissioning plan drafted** with target retirement date, transition / wind-down profile, dependency analysis.
- [ ] **Stakeholder register reviewed.** Affected populations identified per `regulatory/nist-ai-rmf-crosswalk.md` §3.1; communication plan drafted.
- [ ] **Successor identified (if any).** Successor agent registered and at production status, or confirmed N/A.
- [ ] **Authority signoff obtained.** Governance authority + accountable authority (per consequence class) + engineering steward + procurement steward (if third-party dependencies); for Critical class, dual-authority + governance authority.
- [ ] **Regulator notification (if required).** EU AI Act high-risk system retirement may require prior notification depending on Annex III item; DORA ICT-third-party retirement notified per Pillar 4 obligations; GDPR processing changes notified per DPIA / Art 30 maintenance.

### Phase 2 — Transition and wind-down

- [ ] **Action classes systematically reverted** to synchronous or restricted scope ahead of cut-over (no Operational-relocation classes at the moment of retirement).
- [ ] **Initiative status revoked.** `initiative_authorization_status = Suspended` then `Not authorized`.
- [ ] **Composite-state hash frozen.** No further composite-state changes accepted post-freeze.
- [ ] **Substrate write-paths closed.** Agent's authority to write new claims into the IGM substrate (P10 feedback loops) is revoked at the freeze.
- [ ] **Substrate read-paths preserved during wind-down.** Read-only continuation is permitted only if necessary for transition; revoked at cut-over.
- [ ] **In-flight actions concluded.** Open transactions handled per consequence-class wind-down plan; no new actions accepted post-cut-over.
- [ ] **Successor cut-over evidence.** If a successor exists, parallel-run period evidence (decision-quality comparison) is documented before the predecessor is retired.

### Phase 3 — Cut-over and retirement

- [ ] **Production traffic terminated.** Network egress and inference-API access revoked.
- [ ] **Credentials and secrets rotated and revoked.** Foundation-model API keys, knowledge-base read tokens, integration credentials.
- [ ] **Memory-state checkpointed and archived.** For audit-reconstruction purposes.
- [ ] **Observability sources retained for retention period.** Logs, traces, evidence bundles per retention policy and applicable regulatory record-keeping rules (EU AI Act Article 19, DORA, GDPR Art 30/32, sectoral).
- [ ] **Risk register rows closed or transferred.** Open rows either resolved (treatment delivered by retirement) or transferred to successor.
- [ ] **Supplier register entries reconciled.** Foundation-model dependencies removed if not used by other agents; supplier register row updated.
- [ ] **Inventory status updated.** `status = Decommissioning` → `Retired`; row preserved (not deleted) for audit.
- [ ] **Composite-state-history closed.** Append final entry indicating retirement.
- [ ] **Claim-feedback closure.** Any claims that originated from this agent's feedback loop are revalidated by the IGM revision authority; orphan claims handled per claim-retirement workflow (§3).

### Phase 4 — Post-retirement obligations

- [ ] **Stakeholder communication delivered.** Internal communication, client communication (if client-facing), regulator communication (if required).
- [ ] **Lessons-learned recorded.** Feeds into `regulatory/incidents-appendix.md` if a lesson is broadly relevant; into local lessons-learned otherwise.
- [ ] **Audit working-paper updated.** Internal audit references retirement in next audit cycle.
- [ ] **Periodic review of retained data.** Per retention policy.
- [ ] **Final closure.** Retirement record finalised after retention-period checkpoint (typically 1–7 years depending on regulatory regime).

---

## 3. Decommissioning checklist — claims

For each retired claim or claim family, every item below is completed and evidenced. Owned by the IGM revision authority; assertion authority and inference authority reviewed; accountable authority informed if any in-scope action class depends on the claim.

### Phase 1 — Decision and announcement

- [ ] **Retirement rationale documented.** Reference trigger from §1.2.
- [ ] **Cascade analysis run.** Inference authority identifies downstream claims and action classes that depend on the retiring claim. Output: list of dependent claims, list of dependent action classes, list of agents affected (per agent inventory).
- [ ] **Stakeholder review.** Affected accountable authorities and workflow owners notified; substrate consumers (agents, dashboards, downstream applications) inventoried.
- [ ] **Authority signoff.** Revision authority + assertion authority + accountable authorities for any High/Critical action classes affected; governance authority informed.

### Phase 2 — Cascade and revalidation

- [ ] **Dependent claim handling.**
  - For each dependent L2 claim: revalidate, demote one tier, or schedule for retirement per its own decay-class.
  - For each dependent L3 claim: assess whether the L3 framework is itself affected (rare — usually L3 is the cause not the dependent).
- [ ] **Dependent action-class handling.**
  - For each dependent action class: revert one AEnt-M relocation stage if epistemic tier requirement is no longer met; pause Operational-relocation classes pending revalidation.
  - For Critical classes: notify dual-authority and governance authority before any reliance on demoted/retired claim.
- [ ] **Substrate updates.** Claim status moved to `retired` (not deleted); supersession chain preserved per IGM P5; provenance trail intact.

### Phase 3 — Retirement and post-retirement

- [ ] **Provenance preserved.** The retired claim's full provenance chain remains queryable for audit reconstruction; only its status and applicability change.
- [ ] **Contradictions resolved.** If retirement was driven by contradiction, the contradiction is closed with the retirement event recorded as the resolution; conflicting positions preserved per IGM P4 (contradictions are information).
- [ ] **Inference-authority confirmation.** Confirms downstream queries no longer return the retired claim as a basis for action.
- [ ] **Audit recordkeeping.** Retirement event added to substrate-level audit trail; cross-referenced from any evidence bundle that previously cited the claim.
- [ ] **Lessons-learned recorded.** If the retirement was driven by integrity failure or systemic decay-class issue, escalate to governance authority for systemic-control review.

---

## 4. Operational rules

- **No deletion.** Retired agents and retired claims are not deleted; their records are preserved with `status = Retired` and remain queryable for audit. Deletion only occurs after the retention-period checkpoint and only if no regulatory or legal hold is in force.
- **Reversibility.** Up to the moment of cut-over (Phase 3 for agents; Phase 2 close for claims), retirement is reversible. After cut-over, reinstatement requires a new registration / reinstatement workflow — this is not a "rollback" path.
- **Discovery alignment.** Every retirement updates the agent inventory and (where relevant) the foundation-model third-party register; reconciliation latency target is 48h.
- **Audit linkage.** Retirements are highlighted in the next 3rd-line audit working paper for the affected systems (`regulatory/coso-cobit-crosswalk.md` §3.3).
- **Incident overlap.** When retirement is triggered by an incident (e.g., security breach), the incident workflow takes precedence; this checklist runs in parallel under the incident response.

---

## 5. Open DRAFT items requiring author judgment

- **DRAFT — author review needed:** retention periods are jurisdiction-dependent and out of scope here; institutions must reconcile against EU AI Act Article 19, DORA, sectoral retention obligations, GDPR storage-limitation, and litigation-hold processes.
- **DRAFT — author review needed:** the "no deletion" rule may need a privacy carve-out for personal-data-bearing artefacts; coordinate with DPO.
- **DRAFT — author review needed:** when `integration/decommissioning.md` (A8) is produced, this checklist is the operational artefact it references; cross-links should be added in both directions and any duplication resolved (this checklist takes precedence on operational detail; integration/decommissioning.md takes precedence on integration patterns).

---

## 6. References

- ISO/IEC 42001:2023 A.6.2.6, A.10.3, A.10.4.
- NIST AI RMF 1.0 GV.1.7, MG.2.3.
- COBIT 2019/2023 DSS04 Managed Continuity.
- IGM `manifesto-principles.md` Principle 5 (decay / Curate / retire).
- AEnt-M `manifesto.md` Principle 12 (lifecycles, retirement).
- Cloud Security Alliance, *Autonomous but Not Controlled*, April 2026 — context for the 21%-formal-decommissioning gap.
- `operational-templates/agent-inventory-schema.md` — `status = Decommissioning` / `Retired` transitions.
- `operational-templates/ai-risk-register.md` — risk-row closure.
- `regulatory/foundation-model-third-party-register.md` — supplier-register reconciliation.
- `regulatory/iso-42001-crosswalk.md` — Annex A obligations.
- `governance/authority-accountability-matrix.md` — owner naming.
- `integration/decommissioning.md` (planned, A8) — to be cross-linked when produced.
