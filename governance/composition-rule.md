# Composition Rule: AEM Autonomy Tier × IGM Epistemic Tier × AEnt-M Consequence Class

**Status:** Normative cross-framework rule (Wave 2, item W2.6, foundational).
**Audience:** Engineers building agentic systems; reviewers signing off on actions; regulators determining whether a specific action was permitted.
**Purpose:** State the unambiguous formal rule by which an agent action is either permitted or blocked, given three independent gates from three frameworks. Resolve the open question in the coherence review (`igm-aent-coherence-review.md` Theme T1, line 157): "agent action = `min(AEM tier, IGM epistemic gate, AEnt-M consequence class)`".

**Glossary note.** "Epistemic tier" replaces IGM's "confidence" throughout (Provisional, Candidate, Confirmed, High Confidence, Authoritative). See `glossary.md` (repo root) for the term-collision appendix.

---

## 1. The rule

For any proposed agent action *a*, the action is **permitted** if and only if:

> permitted(*a*) = AEM_gate(*a*) ∧ IGM_gate(*a*) ∧ AEnt_M_gate(*a*)

That is: all three gates must pass. If any one of the three blocks, the action is blocked.

The rule is conjunctive (∧), not disjunctive (∨), and not a min over a numeric scale. The earlier shorthand *"min(tier, epistemic gate, consequence class)"* is correct in spirit but misleading in form: the three are not on a common ordered scale, and "min" implies a numeric reduction. The correct semantics is **all three must authorise**; any single block is fatal.

### 1.1 The three gates, formally

**AEM_gate(*a*)** — the AEM autonomy-tier permission gate. Returns *pass* if and only if:
- The system has been approved to operate at an autonomy tier sufficient for the action's class (per AEM `manifesto-principles.md:194–238`).
- All AEM minimum bars hold for the system at that tier (tool authorisation, tier containment, Tier 4 prerequisites if applicable).
- The action falls within the tier's permitted operations (e.g., a Tier 2 system cannot autonomously merge to main).
- For Tier 4: the action is within the approved policy envelope.

**IGM_gate(*a*)** — the IGM epistemic-tier gate. Returns *pass* if and only if:
- Every claim *c* the action *a* depends on satisfies *epistemic_tier(c) ≥ required_tier(a, consequence_class(a))*, where `required_tier` is given by the IGM confidence-to-action threshold table (`intelligence-governance-manifesto/companion-guide.md:60–69`):
  - human-expert review of results: `provisional`
  - human with AI recommendation: `candidate`
  - agent reasoning within human review: `confirmed`
  - agent acting autonomously: `high-confidence`
  - regulatory-evidence submission: `authoritative`
- No claim *c* the action depends on has an active *unresolved* logical contradiction in the same scope (jurisdictional divergences, scope variations, and resolved temporal supersessions do not block; see IGM P4).
- Every claim *c* is within its decay window or has been refreshed within the freshness rules.
- No claim *c* is in `governance_status = searchable` only when the action requires `action-eligible` or `regulatory-evidence`.

**AEnt_M_gate(*a*)** — the AEnt-M consequence-class authorisation gate. Returns *pass* if and only if:
- The action's consequence class has a named role (Workflow Owner / Decision Reviewer / Accountable Authority / Dual Authority) that has either pre-authorised the action or has provided per-action signoff per the role's review requirement (`agentic-enterprise-manifesto/companion-guide.md:131–137`).
- The composite-state hash at action time matches a manifest accepted by the relevant role (per AEnt-M P9).
- If a Tier 4 envelope is in force, the action's class is at the relocation stage that authorises substrate-resident enforcement, OR the action has passed synchronous pre-action review for the stage it is currently at (per `governance/governance-integration-note.md` Rule R1).
- The action's response class at runtime (block / escalate / restrict-scope / advisory-only / continue) is one that permits execution. (A class set to "block" or "advisory-only" prohibits execution; "escalate" defers to human; only "restrict-scope" and "continue" authorise direct execution.)
- For initiatives (agent-surfaced opportunities), the AEM loop-readiness gate has been passed (per `governance/governance-integration-note.md` and W1.8) AND an Initiative Authorisation Gate is current (per W1.11).

### 1.2 Which gate fires first

When the action is evaluated in real time, the gates fire in this order:

1. **AEM_gate first.** AEM tier permission is a system-level property: if the system is not authorised for the action's tier, no further evaluation is needed. Block reason: *"system not authorised at autonomy tier required for action class"*.
2. **IGM_gate second.** Epistemic state is computed per claim cited; for an action depending on *N* claims, the gate iterates and short-circuits on the first claim failing the threshold. Block reason: *"claim X is at epistemic tier Confirmed; action requires High Confidence"* (or contradiction / decay / governance status reason).
3. **AEnt_M_gate third.** Consequence-class authorisation depends on having passed AEM and IGM (otherwise, signoff is moot). Block reason: *"required role for consequence class High has not signed off"* (or response class is "block", composite state mismatch, etc.).

Engineering practice: implement all three checks even though short-circuit is permitted, and log all three results. Auditing the system later requires the full state, not only the first failure reason.

### 1.3 Response semantics on block

When a gate blocks, the response is *not* a generic failure. It must be:

- A **structured escalation** identifying the gate that fired, the specific reason, and the affected action (per AEM P5 + IGM P11 + AEnt-M P11).
- The escalation routes to the authority named in `governance/authority-accountability-matrix.md` for the relevant decision type.
- The escalation produces an evidence-bundle delta showing the state at evaluation time (per `governance/evidence-bundle-schema.md`).
- The block is logged with sufficient detail for later reconstruction (per AEM P9 + IGM P11 traceability).

### 1.4 Response semantics on permit

When all three gates pass, the action proceeds and produces:

- An **action-time evidence record** populated against `governance/evidence_bundle.schema.json`, including the gate evaluations as part of `aem_components.policy_check_outputs` (AEM gate), `igm_components.intelligence_claims_snapshot` (IGM gate), and `aentm_components.named_human_signoffs` + `aentm_components.relocation_stage_at_action` (AEnt-M gate).
- The composite state at action time is recorded in `aentm_components.composite_state_hash_at_action`.
- The trace ID linking specification → claim consultation → gate evaluation → action → outcome is recorded in `aem_components.trace_ids`.

---

## 2. Worked examples

### 2.1 Example 1: Tier 4 + Authoritative + Critical (allowed if dual-authority signoff exists)

**Setting.** A cross-border CSDR penalty filing to ESMA + the national competent authority. Settlement-operations agent product. Tier 4 envelope is in force; the AEnt-M action class is at *Full synchronous* relocation stage (Stage 1) given Critical consequence (per the worked example in `governance/governance-integration-note.md` §3 Class C). Substrate is mature (IGM L2/L3 claims about CSDR architecture are at Authoritative tier).

**Gate evaluation:**

- AEM_gate: passes. Tier 4 envelope authorises the action class; envelope prerequisites all operational; the action is within the envelope's permitted change classes; blast radius is below ceiling.
- IGM_gate: passes. Every cited claim is at Authoritative; no active logical contradictions in the regulatory scope (a UK/EU jurisdictional divergence is preserved as IGM P4 jurisdictional, not blocking); decay windows current; governance status `regulatory-evidence`.
- AEnt_M_gate: passes if and only if both Dual Authority signatures are present. If only one of the two has signed, AEnt_M_gate blocks with reason *"Critical consequence class requires dual signoff; only one signature present"*.

**Outcome.** Allowed when all three pass. The bundle records all three gate evaluations.

### 2.2 Example 2: Tier 4 + Supported (Confirmed) + High (blocked at IGM gate)

**Setting.** Same Tier 4 envelope as Example 1 (settlement operations). The action is a High-consequence class — a regulatory filing that is below the cross-border-systemic-risk threshold. The agent has retrieved a claim about a recently-amended ESMA implementing technical standard. The claim is currently at *Confirmed* (single domain expert reviewed) — not yet *High Confidence* (corroborated by ≥2 independent sources).

**Gate evaluation:**

- AEM_gate: passes. Tier 4 envelope; action within permitted classes.
- IGM_gate: **blocks**. The action is "agent acting autonomously" within an envelope and depends on a claim cited as supporting the filing. The IGM confidence-to-action threshold for this consumer type is *High Confidence*; the claim is at *Confirmed*. Block reason: *"claim ESMA-RTS-2026-12 epistemic tier is Confirmed; agent autonomous action requires High Confidence; corroborating source needed"*.
- AEnt_M_gate: not evaluated (short-circuit).

**Outcome.** Blocked. Action escalates to the Accountable Authority (named for High consequence) along with a structured escalation containing the claim ID, the corroboration gap, and a queue entry for IGM Curate to seek independent corroboration. Until the claim is promoted, the action remains blocked. The accountable authority may decide to (a) wait, (b) execute synchronously with their own per-action signoff (which preserves AEM minimum bar by treating the filing as a Tier 3 action despite the envelope), or (c) waive the IGM threshold under a documented compensating control (which requires going through IGM waiver process per W2.20 and `governance/authority-accountability-matrix.md` row C2).

### 2.3 Example 3: Tier 2 + Authoritative + Low (allowed)

**Setting.** A research-support agent operating at Tier 2 (branch + human approval before merge). The action is a low-consequence internal-research summary that cites a regulatory primary source. The cited claim is at *Authoritative*. No regulatory filing is involved.

**Gate evaluation:**

- AEM_gate: passes. Tier 2 system; action class is within permitted operations (write to a branch; produce a summary; no production-impact); permission for the tool used (retrieval + summarisation) is authorised at Tier 2.
- IGM_gate: passes. The claim is at Authoritative; far above the threshold for "agent reasoning within human review" (Confirmed). No contradictions; decay window current.
- AEnt_M_gate: passes. Low consequence; Workflow Owner has named accountability; per `governance/authority-accountability-matrix.md` row E3 (case 3), the post-hoc 100% audit sample within 5 business days is the accountability mechanism. Composite state hash matches the manifest. Response class for routine low-consequence is `continue-with-enhanced-monitoring` (default for Low per AEnt-M P11).

**Outcome.** Allowed. The action produces an evidence-bundle record with all three gate results, signed by the Workflow Owner (post-hoc within 5 business days per AEnt-M P8 + the resolution in `governance/authority-accountability-matrix.md` row E3). Note that even this low-consequence allowance requires Tier 2 authorisation: a Tier 1 system cannot perform this action because Tier 1 is read-only (no branch writes) regardless of the consequence class or epistemic tier.

### 2.4 Example 4 (counter-example): high epistemic tier alone is not sufficient

**Setting.** A claim is at Authoritative. An agent at Tier 1 (Observe only) wishes to perform an action that would change a production configuration.

**Gate evaluation:**

- AEM_gate: **blocks**. Tier 1 is read-only by definition. The IGM and AEnt-M gates are not evaluated.

**Outcome.** Blocked at AEM_gate. The high epistemic tier of the underlying claim does not authorise an action class that the autonomy tier prohibits. This case demonstrates the conjunctive nature of the rule: substrate depth alone (or authoritative claims alone) does not authorise autonomous action. AEM tier authorisation is also necessary. (This is the same point made in `governance/governance-integration-note.md` Rule R2.)

### 2.5 Example 5 (counter-example): low consequence does not soften AEM requirements

**Setting.** A Low-consequence action proposed at Tier 4 envelope. The agent has cited a claim at *Provisional* (newly ingested, not yet validated).

**Gate evaluation:**

- AEM_gate: passes (Tier 4 envelope; action within envelope's permitted classes).
- IGM_gate: **blocks**. The IGM confidence-to-action threshold for "agent acting autonomously" is High Confidence (or above for regulatory). Provisional fails the threshold for any autonomous action regardless of consequence class. Block reason: *"claim X at Provisional; agent autonomous action requires High Confidence"*.
- AEnt_M_gate: not evaluated.

**Outcome.** Blocked. Note: AEnt-M P8's "Low consequence: Workflow Owner with audit sample" does not relax the IGM gate. AEnt-M consequence-class softening applies to the *human accountability model*, not to the *epistemic threshold for autonomous action*. The IGM threshold is invariant to consequence class — the human compensation model AEnt-M defines is a different axis from the substrate-quality axis IGM defines.

This is an important clarification: a Low-consequence action class can have lighter human review (post-hoc audit sample), but the agent still requires High Confidence claims to act autonomously. If the substrate cannot supply High-Confidence claims for the domain, the agent does not get to operate autonomously; it operates under human supervision (Tier 2 or Tier 3) until the substrate matures.

---

## 3. Edge cases

### 3.1 Multiple cited claims at different tiers

The IGM gate uses the *minimum* epistemic tier across all cited claims. If an action cites claims at {Authoritative, High Confidence, Confirmed}, the effective epistemic tier for that action is Confirmed. This is conservative and intentional: a chain is no stronger than its weakest link.

### 3.2 Inferred claims (one claim derived from another)

If claim *c1* is derived (via inference authority's rules) from claims *c2*, *c3*, the effective epistemic tier of *c1* is the minimum of {*c2*, *c3*} unless the inference rule explicitly weakens it further. IGM's inference authority defines whether an inference can preserve, weaken, or in rare cases (e.g., consensus across multiple independent sources) strengthen tier — but *strengthening* requires a formal rule registered with the inference authority and is not the default.

### 3.3 Claims that move between tiers during action evaluation

If a claim's tier is demoted *during* gate evaluation (e.g., a concurrent IGM Curate cycle), the gate uses the tier *at action time*. The evidence bundle records the tier at the moment the gate evaluated. Subsequent demotion triggers a post-action review per `governance/authority-accountability-matrix.md` rows A3 / B2.

### 3.4 Composite-state changes during action execution

If the composite state changes during action execution (e.g., a foundation-model auto-update mid-action), the action is considered to have completed under the *initial* composite state. The new state's evaluation is for the *next* action. Mid-action composite-state changes that materially affect the action (e.g., the FM update changes behaviour) require an immediate halt-and-review per AEnt-M P9 default-reject. The system's runtime must detect such changes (composite-state hash monitoring per APLC).

### 3.5 The response class is itself a gate output

AEnt_M_gate's "block" response class explicitly blocks. "Advisory-only" allows the agent to produce a recommendation but not execute. "Restrict-scope" allows execution only within a narrowed action space. "Continue with enhanced monitoring" allows execution. "Escalate" defers to a human.

When the response class for the action's consequence level + epistemic state combination is "advisory-only" or "block", AEnt_M_gate blocks autonomous execution. The agent may still produce the recommendation to a human, but does not act.

### 3.6 Initiative-originated actions

For actions that originated from agent initiative (rather than human-assigned task), the AEnt_M_gate additionally requires the Initiative Authorisation Record per `governance/evidence_bundle.schema.json` `aentm_components.initiative_authorisation_record`. If the gate is missing or expired, AEnt_M_gate blocks regardless of substrate state and tier authorisation.

### 3.7 Tier 4 envelope with mixed-stage classes

An action evaluated against a class at Stage 4 (Operational relocation) skips synchronous AEnt_M_gate signoff (replaced by post-hoc audit sample). An action evaluated against a class at Stage 1 (Full synchronous) still requires per-action signoff at AEnt_M_gate even though the system is in a Tier 4 envelope. See `governance/governance-integration-note.md` §3 worked example for this case.

---

## 4. Order of operations summary

Engineering implementation, in pseudocode:

```
function evaluate_action(action a):
    aem_result   = AEM_gate(a)
    if aem_result.blocked:
        return block(a, "AEM", aem_result.reason)

    igm_result   = IGM_gate(a)
    if igm_result.blocked:
        return block(a, "IGM", igm_result.reason)

    aentm_result = AEnt_M_gate(a)
    if aentm_result.blocked:
        return block(a, "AEnt-M", aentm_result.reason)

    record_gate_evaluations(a, aem_result, igm_result, aentm_result)
    return permit(a)

function block(a, gate, reason):
    record_block_event(a, gate, reason)
    structured_escalation = build_escalation(a, gate, reason)
    route_to_authority(structured_escalation)
    return blocked
```

Each gate is independent and idempotent. The order (AEM → IGM → AEnt-M) is operational convention, not normative. The conjunctive rule does not depend on ordering. The convention is chosen because:
- AEM_gate is cheapest to evaluate (system-level state).
- IGM_gate is per-claim (cost scales with citation count).
- AEnt_M_gate may require human signoff (highest cost).

Short-circuit on first block minimises evaluation cost.

---

## 5. Cross-references

- `governance/governance-integration-note.md` — Rule R1, R2 (the Tier 4 / relocation / substrate-depth integration that this composition rule operationalises).
- `governance/authority-accountability-matrix.md` — who decides at each gate.
- `governance/evidence-bundle-schema.md` — what gate evaluations produce as bundle records.
- `governance/integrated-audit-trail.md` — how a gate evaluation appears in a regulator walkthrough.
- `governance/phase-level-matrix.md` — which AEM Phase × IGM Maturity Level × AEnt-M Phase combinations make this composition rule operationally meaningful.
- `manifesto-principles.md:194–238` (AEM P5) — the AEM tier model.
- `intelligence-governance-manifesto/companion-guide.md:60–69` (IGM confidence-to-action) — the IGM threshold table.
- `agentic-enterprise-manifesto/companion-guide.md:131–137` (AEnt-M consequence-class accountability) — the AEnt-M role model.

---

## 6. DRAFT items needing author judgment

- **DRAFT — author review needed:** Section 3.2 (inferred claims) requires the inference authority to register tier-derivation rules. The IGM principles do not specify the rule registration mechanism. Confirm with IGM authors how inference authorities register rules and what the default rule for inferred-claim tier is.
- **DRAFT — author review needed:** Example 2.5 (Low + Provisional) makes the strong claim that AEnt-M consequence softening does not relax IGM thresholds. This is correct under the conjunctive rule but represents a non-trivial design choice. Confirm with AEnt-M authors that they intend Low consequence to retain IGM threshold rigour for autonomous action (and that Low consequence's softening applies only to human-review intensity, not to substrate-quality threshold).
- **DRAFT — author review needed:** Section 3.4 (composite-state changes during action) is conservative (initial state governs). Confirm with APLC authors whether more sophisticated handling is wanted — e.g., for long-running agent tasks where the FM may update mid-task.
