# Composite-State vs IGM Curate — Class-Based Precedence

**Status:** Normative cross-framework artefact (Wave 1, item W1.10 / B11).
**Audience:** AEnt-M authors, IGM authors, ASDLC release managers, APLC product managers, internal audit (3rd line), regulators.
**Purpose:** Resolve the operational collision between AEnt-M Principle 9 (composite-state changes default to *reject*) and the IGM Curate stage (continuous demotions, retirements, supersessions as a normal mode of operation). Without integration, every Curate decision triggers an enterprise-level composite-state acceptance and the substrate freezes under approval load. With this artefact, Curate operates inside a class-based precedence: routine actions are pre-accepted, consequential actions require named acceptance with an SLO, and integrity-driven actions bypass the lock.

**Glossary note — "epistemic tier".** Throughout this document, "epistemic tier" refers to what IGM previously called "confidence" (Provisional, Candidate, Confirmed, High Confidence, Authoritative).

---

## 1. The conflict, sourced

### 1.1 AEnt-M Principle 9 — composite-state default reject

> "An agent product's behavioral identity is determined by five components simultaneously: application code, system prompt, foundation model, knowledge base, and memory state. When any component changes — including a model update the engineering team did not initiate — the composite state changes and the agent's behavior may change with it."
> — `agentic-enterprise-manifesto/manifesto.md:131–132`

> "The enterprise must detect, evaluate, and explicitly accept or reject composite state changes across its entire agent portfolio. **The default is reject.** Accepted changes are logged with the accepting authority. Undetected composite state drift is the enterprise equivalent of a silent configuration change in production — the system is no longer what you tested."
> — `agentic-enterprise-manifesto/manifesto.md:134`

The AEnt-M default is unambiguous: composite-state change without explicit acceptance is rejected. The "knowledge base" component (`agentic-enterprise-manifesto/manifesto.md:131`) is one of the five composite-state inputs.

### 1.2 IGM Curate — continuous claim-level change as normal operation

> "Curate → Maintain quality. Validate, promote, demote, manage contradictions, monitor decay. Maintains nodes and edges. This is the immune function — the stage that defends the substrate against the six failure modes of epistemic degradation: pollution, staleness, fragmentation, amnesia, cascade failure, and structural distortion."
> — `intelligence-governance-manifesto/manifesto.md:103`

> "Not sequential — concurrent. All five stages run continuously."
> — `intelligence-governance-manifesto/manifesto.md:111`

IGM Principle 5 ("Intelligence decays. Govern the decay.") makes continuous demotion and retirement the *expected* operational mode (`intelligence-governance-manifesto/manifesto-principles.md` P5). The lifecycle's heartbeat depends on it.

### 1.3 Why the collision freezes the system

Each Curate decision changes the knowledge-base component of the composite state for every agent product that consumes the affected claim. By AEnt-M P9 default, every such decision requires explicit acceptance by the enterprise. The Curate cycle is continuous; the acceptance load is unbounded; the substrate does not curate or the enterprise does not function.

The two manifestos cannot both be correct as written. This artefact specifies the precedence.

---

## 2. The integration rule (normative)

### Rule R1 — Curate decisions are class-partitioned at the moment of decision.

Every Curate decision is partitioned into one of three classes at the moment the Revision authority (or the responsible IGM authority) decides. The class determines the AEnt-M P9 acceptance pathway. Classification is recorded as part of the Curate event itself.

### Rule R2 — The three classes and their pathways.

#### Class 1 — Routine revalidation within decay-window bounds

**Definition.** A Curate event is Class 1 when **all** the following hold:

- The event is a planned revalidation, scheduled tier check, or routine decay refresh — not triggered by a contradiction, an integrity event, or a supersession.
- The change occurs **within the claim's declared decay window** (per IGM P5 minimum bar; `intelligence-governance-manifesto/manifesto-principles.md` P5).
- The change moves the claim's epistemic tier by **at most one tier in either direction** within the IGM tier system (Provisional → Candidate → Confirmed → High Confidence → Authoritative).
- The claim is not on a critical path for any High- or Critical-consequence action class (per `agentic-enterprise-manifesto/manifesto.md` Principle 8 and `governance/governance-integration-note.md`).
- No active typed contradiction (per IGM P4) involves the claim.
- The change is reversible by routine Revision authority action within the same cadence.

**Pathway.** **Pre-accepted at the composite-state level.** The Curate event is logged in the substrate event stream with class tag `class-1-routine-revalidation`. It is *not* gated on enterprise composite-state acceptance. The composite-state ledger records the event but does not block downstream agent action. The audit trail captures: claim identifier, prior tier, new tier, decay-window reference, deciding authority (named), timestamp.

**Why this is safe.** Class 1 is the operational equivalent of a "configuration change inside the bounds we already approved" — the bounds are the decay window declared at claim creation. By pre-approving Class 1 within those bounds, the enterprise is not waiving governance; it is moving the governance gate upstream to *the design of the decay window itself*. The Revision authority's role at runtime is to certify that an event is in fact Class 1.

#### Class 2 — Consequential demotion or supersession on critical-path claims

**Definition.** A Curate event is Class 2 when **any** of the following hold:

- The change is a demotion (lowered epistemic tier) for a claim used by any High- or Critical-consequence action class (per AEnt-M P8).
- The change is a temporal supersession (per IGM P4 type "temporal supersession") affecting a claim cited in any active loop-ready specification or any in-flight ASDLC delivery cycle.
- The change moves a claim's epistemic tier by more than one tier in a single event.
- The change occurs **outside** the claim's declared decay window (i.e., earlier than scheduled, on the basis of new evidence).
- The change involves a claim that gates an AEnt-M Tier 4 envelope (per `governance/governance-integration-note.md`) or a relocated action class at AEnt-M Stage 3 or Stage 4 (Monitored or Operational relocation).

**Pathway.** **Requires composite-state acceptance with a 4-hour SLO and a named accountable human.**

- The Revision authority emits a composite-state-change request to the Accountable Authority for each affected action class (per AEnt-M P8 — Accountable Authority for High; Dual Authority for Critical).
- The Accountable Authority must accept or reject the change within **4 hours** of emission.
- If accepted: the change propagates and is logged with the named human's identity. Affected action classes may be subject to AEnt-M relocation reversion (per `governance/governance-integration-note.md` Rule R3) if the change indicates substrate degradation.
- If rejected: the Curate event is held; the Revision authority and the Accountable Authority must reconcile. While held, the affected claim's pre-change tier is what consuming agents see (the substrate is *not* updated until acceptance). Reconciliation is bounded by a recovery SLO (DRAFT — see §6).
- If the SLO expires without decision: the change defaults to **acceptance with logged SLO breach**. The breach itself is a P12-level governance event (named human did not respond within the agreed window) and is escalated. This avoids the "freeze the substrate" failure mode while making non-response visible to governance.

**Why a 4-hour SLO.** Long enough to allow a human to review the change with cited evidence; short enough that a single-day Curate cadence does not stack 24+ pending decisions.

> **DRAFT — author review needed.** The 4-hour SLO is the recommended starting value. It must be calibrated by the domain owner against the operational tempo of the relevant action classes. For domains with longer decision tempos (e.g., quarterly regulatory cycles), 24h or 72h SLOs may be appropriate; for fast-moving domains (e.g., trading-floor settlement), 1h may be required. The integration rule survives any reasonable choice.

#### Class 3 — Emergency retirement on integrity grounds

**Definition.** A Curate event is Class 3 when **any** of the following hold:

- The retirement, demotion, or removal is driven by a substrate-integrity event under IGM Principle 14 (`intelligence-governance-manifesto/manifesto-principles.md` P14): claim poisoning detection, provenance spoofing detection, indirect-prompt-injection detection in ingested material, contradiction injection detection, insider-tampering detection.
- The change is required to halt an active or imminent harm (e.g., a claim is being used by an agent in a High/Critical action and the claim has just been identified as compromised).
- The change is mandated by an external authority (regulator, internal CISO, substrate-security owner) acting under emergency protocols.

**Pathway.** **Bypasses composite-state lock; immediate log; post-hoc review within 24 hours.**

- The Revision authority (or the substrate-security owner, per IGM P14) executes the retirement immediately. No composite-state acceptance is required to act.
- The event is logged in real time with: trigger evidence, deciding authority (named), affected claims, immediate impact assessment (which agents/action classes are affected), and the integrity-event reference.
- All consuming agents and action classes are notified asynchronously; in-flight actions that depend on the retired claim are halted under AEnt-M P11 ("Block" response class for High/Critical; "Escalate" for Medium; "Restrict scope" for Low).
- A **post-hoc review within 24 hours** is performed by the Accountable Authority for the affected highest-consequence class (Dual Authority + governance authority if any Critical class is affected). The review confirms or amends the emergency action and records the finding.
- If the post-hoc review concludes the retirement was incorrect (false positive on the integrity event), the Revision authority works with the Inference and Assertion authorities to restore the claim and reconcile. Restored claims re-enter Class 2 acceptance (the restoration is itself a composite-state change).

**Why bypass.** AEnt-M P9's reject-by-default is correct for *legitimate operational changes*. Integrity events are not legitimate operational changes — they are *attacks or compromises*. The default-reject would mean an attacker who poisons a claim cannot have their poison removed without enterprise approval, which inverts the security objective. Class 3 names this exception explicitly so the bypass is governed, not silent.

### Rule R3 — Class assignment is the Revision authority's decision and is auditable.

The Revision authority assigns the class at the moment of the Curate decision. The assignment is part of the audit trail and is reviewable on sample by the Accountable Authority (Class 1) or as part of the composite-state acceptance (Class 2) or post-hoc review (Class 3). Misclassification is itself a governance event — a Class 2 event misclassified as Class 1 is a *control gap*; a Class 3 misclassification (false positive bypass) is a *control breach*.

### Rule R4 — Cross-framework precedence on collision.

If a Curate event has properties that satisfy multiple class definitions (e.g., a routine revalidation that turns out to involve a critical-path claim), the **higher-numbered class wins**. Class 3 > Class 2 > Class 1. This is the safe-default direction: collision elevates rigour, never lowers it.

### Rule R5 — Audit trail compose, not substitute.

The unified evidence bundle (per `governance/evidence-bundle-schema.md`) records, for every action that cited a claim, the claim's epistemic tier and any Curate events affecting that claim during the action's reasoning window. The class tag on each Curate event is part of that record. A regulator examining a specific action sees: cited claims; their tier history; Curate events on those claims; the class of each event; the deciding authority; the acceptance pathway followed. This is regulator-readable substrate dynamics.

---

## 3. Worked example

A European custodian is operating the settlement-operations agent product described in `governance/governance-integration-note.md` §3 (Tier 4 envelope, three concurrent action classes A/B/C).

### 3.1 Class 1 example

**Event.** A claim about CSD reconciliation cutoff times for the German market, last validated 11 months ago, reaches its 12-month decay window and is revalidated against current CSD documentation. The Revision authority confirms no change is needed; tier remains Confirmed.

**Class.** 1 — routine revalidation, within decay window, no tier movement, no contradiction, no integrity event.

**Pathway.** Logged in the Curate event stream with class tag `class-1`. No composite-state acceptance request is emitted. Class A (settlement-instruction reconciliation, Operational relocation) consuming this claim sees no change. Audit trail captured for sample review.

### 3.2 Class 2 example

**Event.** A new ESMA Q&A clarifies that the CSDR penalty methodology for fails involving non-EU CSDs has a different applicability boundary than previously interpreted. The corresponding L2 jurisdictional-divergence claim is demoted from Authoritative to High Confidence pending re-validation against the new ESMA text. The claim is on the critical path for Class B (cross-border CSDR penalty assessment, High consequence, Monitored relocation).

**Class.** 2 — demotion of a High-consequence critical-path claim outside the standard decay window.

**Pathway.** Revision authority emits composite-state-change request to the Accountable Authority for Class B. The Accountable Authority reviews the ESMA Q&A and the proposed demotion within the 4-hour SLO. Outcome 1 — accept: the claim's tier drops; Class B's reversion trigger fires (per `governance/governance-integration-note.md` §3 Class B reversion criteria — "any L3 supersession (e.g., CSDR amendment)"); Class B reverts to Parallel run (Stage 2). Outcome 2 — reject: the demotion is held; reconciliation is required between Revision and Accountable authorities. Outcome 3 — SLO breach: the demotion auto-accepts, the breach is logged as a P12 event, and a separate governance review is triggered into the Accountable Authority's response capacity.

### 3.3 Class 3 example

**Event.** The substrate-security owner detects, via integrity monitoring (per IGM P14 minimum bar), a tier-promotion pattern on a claim about UK CREST penalty rates that matches the contradiction-injection signature from the CSA 2026 attack class. The deciding authority — substrate-security owner — concludes the promotion is adversarial and the claim is compromised.

**Class.** 3 — emergency retirement on integrity grounds.

**Pathway.** The compromised claim is immediately retired. The retirement is logged in real time. Class B (which cited the claim in active in-flight actions) is halted under AEnt-M P11 "Block" — every in-flight action is paused, structured escalation goes to the Accountable Authority. The substrate-security owner, the Revision authority, and the Accountable Authority + governance authority convene a post-hoc review within 24h. The review confirms the integrity finding, documents the indicators of compromise, and updates the substrate-integrity playbook. The finding feeds back into IGM P14's quarterly red-team and into APLC red-team protocol updates (per `igm-aent-coherence-review.md` W2.23).

---

## 4. Edge cases and disambiguations

### 4.1 What about claim *promotions* (lower-tier → higher-tier)?

Promotions follow the same class structure but with one asymmetry: a promotion that **adds** a critical-path claim to a High/Critical action class is Class 2 (the action class now has a new dependency the substrate must keep good). A promotion within decay-window bounds for a claim already on the critical path is Class 1. This is symmetric with demotions in the consequential direction.

### 4.2 What about new claim ingestion (Ingest stage)?

Ingest is not Curate. New claim ingestion is governed under IGM P1 (claim definition), P2 (provenance), P3 (epistemic tier earned), and P7 (acquisition mode). New claims do not by themselves trigger composite-state events for existing agent products until those agents start consuming the new claim. Consumption is a delivery-cycle event, governed by ASDLC release gates.

### 4.3 What if a Class 2 event's 4h SLO consistently breaches across many claims?

This indicates an operational mismatch: the Accountable Authority's capacity does not match the substrate's Curate cadence. The fix is on the capacity side, not the SLO side — either the Accountable Authority role is split across more named humans, or the workflow is automated up to but not including the decision (an AI-assisted triage agent, governed under APLC governance-agent rules, can prepare the decision package for the human). This is an `igm-aent-coherence-review.md` W2.27 (response-class operational behaviour) issue.

### 4.4 What if the same claim is on the critical path of action classes at multiple consequence classes?

The highest consequence class governs the Class 2 acceptance pathway for any change to the claim. A claim used by a Low class and a Critical class is governed at Critical for composite-state-acceptance purposes.

### 4.5 What about Curate events on claims that are *not* used by any agent product (yet)?

These are routine substrate maintenance and are Class 1 by default. The class assignment can change immediately when a new agent product begins consuming the claim — this is why class assignment is per-event, not per-claim.

### 4.6 What about cascading demotions (one demotion triggers dependent claim demotions)?

Each individual demotion is classified independently. A cascade may include Class 1, Class 2, and Class 3 events simultaneously. AEnt-M's P9 acceptance pathways operate per-event, with the cascade as a whole governed by IGM P16 (containment for substrate-driven emergence — [`intelligence-governance-manifesto/manifesto-principles.md#principle-16-containment-is-required-for-substrate-driven-emergence`](https://github.com/witoldreichhart/intelligence-governance-manifesto/blob/main/manifesto-principles.md#principle-16-containment-is-required-for-substrate-driven-emergence)). Cascades exceeding the AEM/IGM circuit-breaker thresholds (per IGM P16 minimum bar) pause for human review regardless of individual event classes.

### 4.7 What about the L3 layer (architecture changes to the substrate)?

L3 changes (semantic-authority decisions affecting the ontology, not individual claims) are *not* Curate events. They are governed under IGM Principle 6 (four authorities) — specifically the Semantic authority. Composite-state implications of L3 changes are addressed in `governance/governance-integration-note.md` §3 (substrate-level events) and §4.5.

---

## 5. Edits required to source documents

### 5.1 Edit to `agentic-enterprise-manifesto/manifesto.md` Principle 9

The current paragraph "The enterprise must detect, evaluate, and explicitly accept or reject composite state changes across its entire agent portfolio. The default is reject." (`agentic-enterprise-manifesto/manifesto.md:134`) is augmented by a cross-reference to this artefact:

> Append: "Composite-state changes originating from the IGM Curate cycle (continuous claim-level changes — promotions, demotions, supersessions, retirements) follow a class-based precedence specified in [`/integration/composite-state-vs-curate-precedence.md`](../integration/composite-state-vs-curate-precedence.md): routine revalidations within decay-window bounds are pre-accepted; consequential demotions on critical-path claims require composite-state acceptance with a 4-hour SLO; emergency retirements on integrity grounds bypass the lock with post-hoc review within 24 hours. The default-reject rule applies in full to non-Curate-originated composite-state changes (foundation-model updates, prompt revisions, application-code changes, memory-state revisions)."

### 5.2 Edit to `intelligence-governance-manifesto/manifesto-principles.md` Principle 5

The minimum bar of IGM P5 ([`intelligence-governance-manifesto/manifesto-principles.md#principle-5-intelligence-decays-govern-the-decay`](https://github.com/witoldreichhart/intelligence-governance-manifesto/blob/main/manifesto-principles.md#principle-5-intelligence-decays-govern-the-decay)) — "Every claim has an expected validity window. Claims past their window trigger review alerts. Staleness metrics are tracked per domain." — is augmented:

> Append to the minimum-bar paragraph: "Curate events on claims that affect any agent product's composite state follow the class-based precedence in [`/integration/composite-state-vs-curate-precedence.md`](../../integration/composite-state-vs-curate-precedence.md), which specifies the AEnt-M P9 acceptance pathway per class (routine pre-accepted; consequential 4-hour SLO; emergency bypass with 24h post-hoc review). The Revision authority is responsible for class assignment at decision time."

---

## 6. DRAFT items needing author judgment

- **DRAFT — author review needed.** The 4-hour SLO for Class 2 acceptance is illustrative. Calibration by domain owner against operational tempo is required. For some domains 1h; for others 24h or 72h.
- **DRAFT — author review needed.** The 24-hour post-hoc review window for Class 3 emergency retirements is a regulatory-counsel question for industries with tighter incident-reporting clocks (e.g., DORA Pillar 2 4h initial / 72h intermediate / 1-month final).
- **DRAFT — author review needed.** The recovery SLO for held Class 2 events (when reconciliation is required between Revision and Accountable authorities) is unspecified. Recommended starting value: ≤72h. Calibration by domain.
- **DRAFT — author review needed.** Whether Class 1 pre-acceptance requires *any* downstream notification to consuming agent products. This artefact assumes "no notification required, audit log only"; some operational models require notification for telemetry purposes.

---

## 7. Cross-references

- `agentic-enterprise-manifesto/manifesto.md` Principle 9 — composite-state default.
- `intelligence-governance-manifesto/manifesto.md:103` — Curate stage definition.
- `intelligence-governance-manifesto/manifesto-principles.md` P4 (contradiction taxonomy), P5 (decay), P6 (four authorities), P14 (substrate as attack surface), P16 (containment for substrate-driven emergence).
- `governance/governance-integration-note.md` — Tier 4 + relocation + substrate-depth integration.
- `governance/authority-accountability-matrix.md` (DRAFT) — authority-to-class mapping rows.
- `governance/evidence-bundle-schema.md` — unified evidence bundle, of which Curate event records and class tags are required components for any action that cited a claim.
- `integration/loop-readiness-for-agent-opportunities.md` — opportunity records reference cited claims; Curate events on those claims during the candidate's lifetime are part of its provenance.
- `integration/decommissioning.md` — claim retirement on agent decommissioning.
