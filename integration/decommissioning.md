# Decommissioning Workflow — Retired Agents and Retired Claims

**Status:** Normative cross-framework artefact (Wave 2, item W2.22).
**Audience:** AEM authors, IGM authors, AEnt-M authors, ASDLC release managers, APLC product managers, system stewards, internal audit (3rd line), regulators.
**Purpose:** Specify the workflow when an agent is retired (APLC Stage 7 / Sunset) or a claim is retired (IGM Curate decision). Without an integrated workflow, retirement of an agent leaves orphan claims that no consuming system needs but the substrate keeps validating; retirement of a claim leaves orphan agent dependencies that fail silently in production. This artefact resolves both with a decision matrix, a named-authority chain, and a 30-day grace period.

---

## 1. The two retirement triggers and why they need integration

### 1.1 Agent retirement (APLC Stage 7)

> "Stage 7 is the governed decommission of the agent product. It includes user migration planning, decision record preservation, composite state manifest archive, and regulated decommission confirmation. For EU high-risk AI systems, technical documentation must be retained for ten years after market placement. Silent abandonment — switching off the agent without migration, retention, or regulatory notification — is a governance failure, not an operational convenience."
> — `aplc/aplc.md:122–124`

Agent retirement removes a *consumer* from the substrate. It does not address what should happen to claims that were maintained primarily because that consumer needed them.

### 1.2 Claim retirement (IGM Curate decision)

> "Curate → Maintain quality. Validate, promote, demote, manage contradictions, monitor decay."
> — `intelligence-governance-manifesto/manifesto.md:103`

Retirement is the terminal Curate decision: the claim is removed from active reasoning. IGM does not currently specify what should happen to agents that depend on retired claims at the moment of retirement.

### 1.3 Why both need a single integrated workflow

The two triggers create the same governance problem from opposite ends:

- *Agent retired, claims orphaned.* The substrate continues to invest curation effort in claims whose only consumer is gone. This is *substrate pollution* (`intelligence-governance-manifesto/manifesto.md:103` — pollution as one of the six failure modes the Curate immune function defends against, but a curiously different sense: the claim is technically valid, just no longer needed).
- *Claim retired, agents orphaned.* Agent products that depended on the retired claim continue running and may produce wrong outputs without realising the substrate has moved.

Without integration, the failure modes are bilateral: substrate inflation in one direction, silent agent failure in the other.

---

## 2. The integration rule (normative)

### Rule R1 — Retirement is a triggered workflow, not an event.

A retirement (agent or claim) is a *trigger* that initiates a workflow with five phases (per §3 below). The terminal state is reached only after impact analysis, disposition decisions, a 30-day grace period, and execution. Premature termination — switching off an agent or removing a claim before the workflow completes — is a P12-level governance failure, not an operational convenience.

### Rule R2 — Authority is shared and named.

Retirement workflows have multiple named accountable parties:

| Role | Responsibility | Source |
|---|---|---|
| **Assertion authority** (IGM) | Originally created/curated affected claims; advises on claim disposition. | `intelligence-governance-manifesto/manifesto-principles.md` P6 |
| **Revision authority** (IGM) | Authorises claim demotions and retirements as terminal Curate decisions. | `intelligence-governance-manifesto/manifesto-principles.md` P6 |
| **APLC product manager** | Owns the retired agent product (or the products affected by a claim retirement); decides on user migration and behavioural baseline preservation. | `aplc/aplc.md` Stage 7 |
| **System steward** (ASDLC) | Owns the agent's infrastructure, runtime, and data flows; executes the operational decommission. | `asdlc/maintenance-governance.md` |
| **Workflow / Decision / Accountable / Dual Authority** (AEnt-M P8) | Per consequence class of any action class affected by the retirement; consents to disposition. | `agentic-enterprise-manifesto/manifesto.md` Principle 8 |

For Critical-consequence affected actions, the **governance authority** is also informed. For agents/claims processing personal data, the **DPO** is informed. For high-risk AI systems under the EU AI Act, the **regulatory owner** ensures Article 73 (serious-incident) and Article 49 (registration update) implications are addressed.

### Rule R3 — The decision matrix governs claim disposition on agent retirement.

When an agent is retired, every claim maintained primarily for that agent is reviewed against the matrix below. The disposition is recorded in the retirement evidence bundle.

| Claim has other consumers? | Claim is regulator-required (e.g., audit-trail dependency)? | Claim has training-data value (forms part of an institutional knowledge corpus)? | Disposition |
|---|---|---|---|
| Yes (≥1 active agent product or active workflow) | — | — | **Preserve** (no change). Continue curation under existing IGM cadence. |
| No | Yes | — | **Preserve** (regulator requires retention). Move to a "regulator-retention" tier with reduced curation cadence; document the retention basis. |
| No | No | Yes | **Demote** to a lower epistemic tier (typically Provisional or Candidate) and move to the *retired-agent-archive* sub-graph. Curation is paused. The claim remains queryable for retrospective audit and for downstream agents that may eventually re-discover the domain, but is not used in active reasoning until re-promoted. |
| No | No | No | **Retire** (Class 2 or Class 3 per `/integration/composite-state-vs-curate-precedence.md`, per the consequence class of the action classes the claim was used by). Provenance chain preserved per IGM P11; claim itself moves to retired state. |

**Notes on the matrix.**

- "Other consumers" includes future-planned consumers within the next two release cycles, recorded in the demand registry. Speculative future use is *not* sufficient.
- Regulator-required claims are kept *even if no agent currently consumes them*. The regulatory retention period is the floor.
- "Training-data value" is judged by the Assertion authority and the system steward jointly. The bar is high: a claim qualifies only if it is part of a recognised institutional knowledge corpus (e.g., an SME-validated case bank), not merely "we might need it later."
- The disposition decision is recorded in the retirement evidence bundle with the deciding authority, the matrix row applied, and a free-text reason.

### Rule R4 — Agent disposition on claim retirement is governed by the consequence class of the affected action classes.

When a claim is retired (whether by routine Curate cycle or because of cascade from another retirement), every agent product whose composite state cites that claim is notified. The disposition for the agent depends on the consequence class (per AEnt-M P8) of the action classes it operates:

- **Low-class action classes** — log the retirement; agent continues; post-hoc audit sample reviews whether output quality changed. (The Low carve-out per `/integration/low-consequence-resolution.md` does not exempt the *agent* from the notification — only the per-action review.)
- **Medium-class action classes** — agent paused for affected action classes; Decision Reviewer reviews whether the class can run on the substrate's new state, with another claim, or must be retired itself. Resumption requires named approval.
- **High-class action classes** — agent is *blocked* for affected action classes (per AEnt-M P11 "Block" response). Accountable Authority and APLC product manager review impact; affected action classes are either re-specified, re-validated against an alternative claim, or moved to a different agent. Resumption requires the same release-gate path the action class went through originally.
- **Critical-class action classes** — Dual Authority + governance authority + regulatory owner review. May trigger the agent's own retirement (cascade).

### Rule R5 — The 30-day grace period is the default; some triggers compress or extend it.

A 30-day grace period between disposition decision and execution is the default. During the grace period:

- Affected action classes operate under the disposition decision (e.g., a paused class stays paused; a re-specified class re-runs the relevant gate).
- Substrate consumers other than the retiring agent that newly discover dependencies on the retiring claims are surfaced.
- Migration tooling moves any preserved data, behavioural baselines, and provenance chains to their post-retirement homes.
- The retirement is announced to internal and (where applicable) external stakeholders.

**Compressed grace periods** (≤7 days) apply when:

- The retirement is driven by a substrate-integrity event (Class 3 claim retirement) — IGM P14 attack-surface response; the claim is compromised and cannot be retained.
- The agent is retired due to safety incident (APLC Stage 5 incident class; cannot continue) where regulatory or reputational risk exceeds the value of full grace.

**Extended grace periods** (>30 days) apply when:

- Regulatory retention requires longer (some FS instruments require 7-year retention; some health data 25 years; EU AI Act high-risk technical documentation 10 years).
- User migration genuinely requires more time (e.g., a high-volume client-facing agent with a multi-month communication and migration plan).

### Rule R6 — Retirement evidence bundle.

Every retirement workflow produces a retirement evidence bundle, structured as part of the unified `governance/evidence-bundle-schema.md`. Required components:

- **Trigger record.** The triggering event (agent retirement decision per APLC Stage 7; claim retirement per IGM Curate decision; cascade from another retirement).
- **Impact analysis.** A complete enumeration of: agents affected, action classes affected per agent, claims affected per agent, action classes consuming each claim, downstream specifications and code referencing each affected claim or agent, regulatory obligations affected.
- **Disposition decisions.** For each affected agent: the consequence-class decision (per Rule R4). For each claim primarily maintained for the retiring agent: the matrix decision (per Rule R3).
- **Authority sign-offs.** Per Rule R2 — every named accountable party signs the disposition decisions within their scope.
- **Grace-period record.** Start date, planned end date, mitigation activities during the grace period.
- **Execution record.** What was actually done at end of grace, by whom, when.
- **Post-retirement audit hook.** A scheduled review (recommended: 90 days post-execution) confirming no orphan dependencies surfaced and no regression in retained claims/agents.

The retirement evidence bundle is retained per the longest applicable retention period (typically the EU AI Act high-risk 10-year clock, regulatory retention rules, or substrate decay class — whichever is longest).

---

## 3. The five-phase workflow

```
   Trigger ─→ Impact analysis ─→ Disposition decisions ─→ 30-day grace ─→ Execution ─→ Post-retirement audit
```

### Phase 1 — Trigger

Either:
- *Agent retirement trigger* (APLC Stage 7 — `aplc/aplc.md:120`): behavioural quality cannot be restored to specification despite recalibration; business purpose no longer achievable; regulatory classification change requiring capabilities the architecture cannot support; foundation model changes incompatible; accountable human declares end-of-life. Trigger is recorded with the named declaring authority.
- *Claim retirement trigger* (IGM Curate decision per Revision authority — `intelligence-governance-manifesto/manifesto.md:103`): claim has reached end-of-validity-window with no successor; claim has been superseded; claim is retired on integrity grounds (per IGM P14, Class 3 per `/integration/composite-state-vs-curate-precedence.md`); claim has zero consumers and no other matrix-row criterion applies.

### Phase 2 — Impact analysis

The named owner of the triggering event (APLC product manager for agent retirement; Revision authority for claim retirement) initiates impact analysis. The system steward and the Assertion authority assist. Outputs:

- For agent retirement: the list of all claims maintained primarily for this agent, the list of action classes the agent operated, the list of human users (where applicable), the list of downstream specifications and dependencies.
- For claim retirement: the list of all agent products citing this claim, the list of action classes consuming the claim, the cascade of dependent claims (per IGM P16 cascade detection), the list of in-flight ASDLC delivery cycles citing the claim.

Impact analysis must complete before any disposition decision. Analysis cost is the gate, not a formality — incomplete analysis leaves orphan dependencies that surface in production.

### Phase 3 — Disposition decisions

Apply Rule R3 (claim disposition) and Rule R4 (agent disposition). Each decision is recorded with the deciding authority and the rationale. Affected AEnt-M P8 authorities (per consequence class) and APLC product managers participate in scope.

Where consequence-class consultation cannot reach consensus on disposition, the highest applicable authority decides — Accountable Authority for High; Dual Authority + governance authority for Critical. Disagreement is recorded.

### Phase 4 — 30-day grace period

The grace period (or compressed/extended per Rule R5) runs. Mitigation, migration, and announcement happen here. Affected action classes operate under the disposition decisions. New dependencies discovered during the grace period are surfaced and added to the retirement evidence bundle.

### Phase 5 — Execution and post-retirement audit

At end of grace, execution is performed by the system steward (for agent retirement) or the Revision authority (for claim retirement). Composite-state events are emitted per `/integration/composite-state-vs-curate-precedence.md` (claim retirement is Class 2 if affecting High/Critical action classes; Class 3 if integrity-driven). User-facing notifications are dispatched. Retention archives are sealed.

A post-retirement audit at 90 days reviews:
- Were any orphan dependencies discovered post-execution? If yes, the disposition decision was incomplete; corrective action follows.
- Are retained claims (preserved or moved-to-archive) still meeting their retention purpose?
- Did any down-stream system fail in a way attributable to the retirement?

The audit results feed back into the retirement evidence bundle and into governance improvements (refined matrix criteria, improved impact-analysis tooling).

---

## 4. Edge cases and disambiguations

### 4.1 What if agent retirement reveals claims with hidden critical-path dependence?

Impact analysis must be exhaustive enough to catch this. If a claim that was thought to have no other consumers turns out to be critical-path for another High/Critical action class on the same or a different agent, the matrix routes the claim to **Preserve** automatically. The retiring agent is decommissioned; the claim continues curation under existing cadence. This is the safe-default direction.

### 4.2 What if a claim retirement cascade triggers a wave of agent retirements?

Each agent retirement starts its own workflow per §3 above. A cascade of retirements is governed by IGM P16 (containment for substrate-driven emergence — [`intelligence-governance-manifesto/manifesto-principles.md#principle-16-containment-is-required-for-substrate-driven-emergence`](../intelligence-governance-manifesto/manifesto-principles.md#principle-16-containment-is-required-for-substrate-driven-emergence)) and the substrate-level circuit-breaker pauses cascades exceeding thresholds for human review. The 30-day grace period applies to each retirement individually but they may be batched if they share execution dates.

### 4.3 What if a regulator orders an agent's immediate retirement?

The compressed-grace-period path applies (Rule R5). Regulator-ordered retirement may have ≤24h compliance windows. The full workflow still runs — impact analysis, disposition decisions, execution, post-retirement audit — but compressed in time. The retirement evidence bundle records the regulator's order as the trigger, with the named deciding authority being the regulatory owner.

### 4.4 What if the agent has personal data in its memory state at retirement?

GDPR Article 17 (right to erasure) and equivalent rules apply. Memory-state archive is *not* automatic — personal data must be erased per request, retained per legal basis, or anonymised. The DPO is the named accountable party for this dimension. Retention of behavioural baselines and provenance chains for the retired agent must comply with data-minimisation rules. This is governed by the regulatory owner per `agent-retirement.md` (APLC) and is referenced from the retirement evidence bundle.

### 4.5 What if a retired agent's behavioural baseline is needed for a successor agent?

The behavioural baseline is preserved per APLC retention rules (`aplc/aplc.md:122–124` — 10-year retention for high-risk EU AI Act systems). The successor agent's APLC Stage 1 conception phase may reference the baseline as input. The retirement evidence bundle's "Execution record" notes that the baseline has been transferred to the successor's archive, not destroyed.

### 4.6 What if a claim retirement happens while an agent is mid-action consuming it?

This is governed by `/integration/composite-state-vs-curate-precedence.md`. A Class 2 retirement (consequential demotion / supersession on critical-path) triggers AEnt-M P11 response per consequence class — typically Block for High/Critical, Escalate for Medium. The in-flight action does not silently fail; it halts under structured response. A Class 3 emergency retirement bypasses the lock and immediately halts dependent in-flight actions per the Class 3 pathway.

---

## 5. Edits required to source documents

### 5.1 Edit to `intelligence-governance-manifesto/manifesto-principles.md`

Add a cross-reference at IGM P5 (the decay-management principle, where the Curate stage's terminal action — retirement — lives) and at IGM P6 (the four-authorities principle, where the Revision authority's responsibility for retirement decisions is named). The minimum-bar edit at P5 is in `/integration/composite-state-vs-curate-precedence.md` §5.2; the additional edit here is to P6's text on the Revision authority.

> Append to the Revision-authority paragraph in P6:
> "Retirement workflows for agents and claims follow [`/integration/decommissioning.md`](../../integration/decommissioning.md), which specifies the five-phase workflow (trigger → impact analysis → disposition decisions → 30-day grace period → execution → post-retirement audit), the disposition matrix for claims maintained primarily for a retiring agent, and the named-authority chain (Revision + Assertion + APLC product manager + system steward + AEnt-M P8 authorities for affected action classes)."

### 5.2 Optional edit to `aplc/aplc.md` Stage 7 description

> Recommended addition to the Stage 7 paragraph (`aplc/aplc.md:122–124`):
> "Stage 7 retirement integrates with the IGM substrate via the workflow specified in [`/integration/decommissioning.md`](../integration/decommissioning.md): claims maintained primarily for the retiring agent are reviewed against the disposition matrix (preserve / preserve-for-regulator / demote-to-archive / retire) and the cascade of consequences for other agent products is managed under the 30-day grace period."

### 5.3 Optional edit to `aplc/agent-retirement.md`

Add a section "IGM substrate disposition" cross-referencing this artefact and Rule R3 of the matrix. (DRAFT — author review needed; the file's exact structure is not enumerated here.)

---

## 6. Cross-references

- `aplc/aplc.md:120–124` — APLC Stage 7 retirement triggers and conditions.
- `intelligence-governance-manifesto/manifesto.md:103` — Curate stage (terminal Curate action is retirement).
- `intelligence-governance-manifesto/manifesto-principles.md` P5 (decay), P6 (four authorities), P14 (substrate as attack surface — Class 3 trigger), P16 (containment for cascade retirements).
- `agentic-enterprise-manifesto/manifesto.md` Principle 8 (consequence-class roles), Principle 9 (composite state, default reject).
- `governance/governance-integration-note.md` — Tier 4 + relocation + substrate-depth integration; envelope withdrawal cascade may trigger agent retirements.
- `governance/evidence-bundle-schema.md` — unified evidence bundle, of which the retirement evidence bundle is a defined sub-schema.
- `governance/authority-accountability-matrix.md` (DRAFT) — authority chain for retirement workflows.
- `/integration/composite-state-vs-curate-precedence.md` — composite-state class structure that retirements use (Class 2 for consequential, Class 3 for integrity-driven).
- `/integration/loop-readiness-for-agent-opportunities.md` — opportunity records reference cited claims; retirement of those claims may invalidate pending demand candidates.

---

## 7. DRAFT items needing author judgment

- **DRAFT — author review needed.** The 30-day grace period default is a starting value. Some institutions will require shorter (operational simplicity) or longer (regulatory complexity). Calibration by domain owner.
- **DRAFT — author review needed.** The 90-day post-retirement audit cadence is a starting value.
- **DRAFT — author review needed.** Whether "retired-agent-archive" sub-graph is a normative requirement (recommended) or a pattern (optional).
- **DRAFT — author review needed.** The "training-data value" criterion in Rule R3 is judgement-driven. Whether to formalise it (e.g., "claim is part of a documented institutional knowledge corpus with active steward") or leave it as the Assertion authority's call.
- **DRAFT — author review needed.** Whether the §5.2 / §5.3 edits to APLC files should be applied directly here. This artefact recommends they be applied; the APLC author may prefer to author them directly.
