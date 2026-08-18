# Governance Integration Note: Tier 4, Governance Relocation, and Substrate Depth

**Status:** Normative cross-framework artefact (Wave 1, item W1.1).
**Audience:** AEM authors, IGM authors, AEnt-M authors, ASDLC release managers, APLC product managers, regulators, internal audit (3rd line).
**Purpose:** Reconcile three governance models that overlap operationally but diverge semantically: AEM Tier 4 (binary policy envelope), AEnt-M governance relocation (per-action-class staged progression), and IGM substrate-depth-driven relocation. Without this reconciliation, a team operating all three frameworks cannot tell whether one action class can be relocated while another remains synchronous, what evidence the policy envelope must contain, who reverts what when the substrate degrades, or whether substrate depth alone authorises autonomous operation.

**Glossary note — "epistemic tier".** Throughout this and the other governance/ artefacts, "epistemic tier" refers to what IGM calls "confidence" (Provisional, Candidate, Confirmed, High Confidence, Authoritative). The term is renamed to free "confidence" for AEM's verification meaning ("did we build it right?"). See `glossary.md` at the repository root for the unified term-collision appendix.

---

## 1. The three models, sourced

### 1.1 AEM Tier 4 — binary policy envelope

> "Tier 4 — Operate. Agents execute autonomously within a human-approved, machine-enforced policy envelope — without per-change human approval. The human approves the envelope (allowed change classes, blast radius ceiling, required evidence schema, rollback conditions, kill-switch configuration) and retains accountability for its design."
> — [`manifesto/manifesto-principles-05.md#5-autonomy-is-a-permission-ceiling-not-a-switch`](../manifesto/manifesto-principles-05.md#5-autonomy-is-a-permission-ceiling-not-a-switch)

> "Tier 4 is not Tier 3 with the human removed. It is a governance model shift: accountability moves from the action level to the policy level. This only holds when the policy envelope is machine-enforced (not merely documented), control evaluations confirm the governance system itself works (P8), governance observability is instrumented and alerting on stale evidence and drift (P9), and rubber-stamping detection is active (P12)."
> — [`manifesto/manifesto-principles-05.md#5-autonomy-is-a-permission-ceiling-not-a-switch`](../manifesto/manifesto-principles-05.md#5-autonomy-is-a-permission-ceiling-not-a-switch)

AEM Tier 4 is **binary at the envelope level**: either an envelope has been approved (with all four prerequisites — machine enforcement, control evaluations, governance observability, rubber-stamping detection — operational) and the system is in Tier 4 within it, or it has not. AEM does not specify *what may differ inside* an envelope; it specifies what the envelope must contain and the prerequisites for entering Tier 4 at all.

### 1.2 AEnt-M governance relocation — staged, per-action-class, reversible

> "Relocation operates per action class, not globally. It is reversible — if the substrate degrades for a given action class, governance re-tightens for that class."
> — `agentic-enterprise-manifesto/manifesto.md:93`

The four stages (`agentic-enterprise-manifesto/companion-guide.md:96–101`):

1. **Full synchronous** — every action is pre-checked against explicit constraints.
2. **Parallel run** — synchronous check active; substrate-resident governance runs alongside; discrepancies logged.
3. **Monitored relocation** — synchronous check removed for routine instances, retained for edge cases; full audit sampling active.
4. **Operational relocation** — substrate-resident governance is the primary mechanism; asynchronous verification at defined sampling rates; synchronous check available for re-engagement.

> "Each transition requires evidence from the previous stage. Regression at any stage triggers rollback to the previous stage for the affected action class."
> — `agentic-enterprise-manifesto/companion-guide.md:102`

### 1.3 IGM substrate-depth-driven relocation

> "Governance does not disappear. Its enforcement locus migrates from synchronous pre-action gating to the substrate's own causal architecture. Explicit checks shift from universal requirement to risk-based monitoring and audit sampling — per action class, measurably, reversibly. If the substrate degrades, governance re-tightens for affected action classes."
> — `intelligence-governance-manifesto/manifesto.md:117`

> "When the twelve principles operate together over time — when epistemic tier is continuously earned, decay is actively governed, contradictions are preserved, and every engagement feeds back — something structural changes: the enforcement locus of governance migrates from synchronous pre-action gating to the substrate's own causal architecture. This is governance relocation. It is not a separate principle. It is the emergent consequence of the twelve principles working in concert on a deepening substrate."
> — `intelligence-governance-manifesto/manifesto-principles.md`, "the emergent consequence of the twelve principles working in concert"

The IGM phrasing implies that *substrate depth* is what causes relocation. It is silent on (a) what other prerequisites apply and (b) who decides that depth is sufficient.

### 1.4 Why these three look identical and are not

All three describe a transition from synchronous human-in-the-loop to autonomous-within-bounds operation. But:

| Dimension | AEM Tier 4 | AEnt-M relocation | IGM substrate depth |
|---|---|---|---|
| Granularity | Whole envelope (binary) | Per action class (4-stage) | Per action class (continuous) |
| Trigger | Envelope approval + 4 prerequisites | Demonstrated control equivalence at each stage | Substrate becomes "deep enough" |
| Reversibility | Envelope withdrawal (binary) | Stage rollback per class | Re-tightening per class |
| Authority | Domain owner (envelope-level) | Workflow Owner / Decision Reviewer / Accountable Authority / Dual Authority depending on consequence class | Implied — IGM does not name an authority for relocation |
| Object enforced | Allowed change classes, blast radius, evidence schema, rollback, kill-switch | Substrate-resident causal structure + audit sampling | Substrate-resident causal structure |
| Required evidence | Control evaluations passing; governance observability; rubber-stamping detection | Decision quality comparison; error detection rate; response time to degradation; audit reconstructability | Implicit (IGM Definition of Done) |

A team that reads only AEM cannot tell that the envelope can contain mixed-relocation classes. A team that reads only AEnt-M cannot tell that the four prerequisites of AEM Tier 4 must hold for *any* class within it to operate without per-change approval. A team that reads only IGM can mistake substrate depth for a sufficient condition for autonomous operation, when it is necessary but not sufficient.

---

## 2. The integration rule (normative)

The three frameworks compose as follows. Conflicts must be resolved in this order; this section is authoritative when the source documents disagree.

### Rule R1 — AEM Tier 4 is the outer envelope. AEnt-M relocation operates inside it.

A system is **either** in a Tier 4 envelope (AEM) **or** it is not. If it is not, all per-action-class relocation discussion is moot — every action requires per-change human approval at Tier 3 or below. If it is, AEnt-M relocation defines, for each action class within that envelope, whether the substrate-resident governance has been earned for that specific class.

**Operationally:** the AEM envelope is the *policy* (what change classes are permitted, what blast radius, what evidence schema, what rollback, what kill-switch). AEnt-M's four relocation stages are the *enforcement modality* per action class within that policy. An action class at AEnt-M Stage 1 (Full synchronous) inside a Tier 4 envelope still requires synchronous pre-action checking for that class; the envelope authorises Tier 4 *governance accountability* (envelope-level approval) but does not by itself remove synchronous enforcement for any individual class.

**The assertion "this system is in a Tier 4 envelope" is a checkable claim, not a label.** Per `manifesto/manifesto-principles-05.md#5-autonomy-is-a-permission-ceiling-not-a-switch`, Tier 4 has four prerequisites, and per `manifesto/manifesto-principles-12.md` rubber-stamping detection is one of them. The assertion is falsifiable — and may be made — only if each prerequisite is recorded alongside it as a checkable condition, not merely declared satisfied:

| Prerequisite | Recorded condition that makes it checkable |
|---|---|
| Machine-enforced policy envelope | Enforcement mechanism identifier (policy engine, config version) + evidence that it rejects an out-of-envelope action in a test or observed instance |
| Control evaluations confirm the governance system works (P8) | Evaluation suite identifier, version, pass/fail result, and timestamp of most recent run |
| Governance observability instrumented and alerting on stale evidence and drift (P9) | Monitoring system identifier, alert rule references, and timestamp of last confirmed-live alert test |
| Rubber-stamping detection active (P12) | Detection mechanism identifier and timestamp of most recent detection-active check |

A "Tier 4" label with no entry for one or more rows above is not a Tier 4 assertion — it is an unverified claim, and the system defaults to Tier 3 (per-change human approval) until the missing condition is recorded. This table is what the deployment-status disclosure in `manifesto/manifesto-principles-05.md` requires when a team asserts Tier 4 in practice; the worked example in §3 below instantiates it for the envelope parameters.

### Rule R2 — IGM substrate depth is necessary but not sufficient.

Substrate depth (coverage, connectivity, currency — see `agentic-enterprise-manifesto/companion-guide.md:13–28`) is a precondition for advancing an action class beyond AEnt-M Stage 1. It is not sufficient on its own. The other necessary conditions are:

- **Constraint legibility** (AEnt-M Initiative Condition 2; companion-guide.md:31–41) — institutional constraints are machine-reasonable, not document-buried.
- **Demonstrated control equivalence** (AEnt-M P7; companion-guide.md:79–91) — decision quality stable or improved under substrate-resident governance.
- **AEM Tier 4 prerequisites for the envelope** — machine enforcement, control evaluations passing, governance observability, rubber-stamping detection ([`manifesto/manifesto-principles-05.md#5-autonomy-is-a-permission-ceiling-not-a-switch`](../manifesto/manifesto-principles-05.md#5-autonomy-is-a-permission-ceiling-not-a-switch)).
- **Authority assignment** for the consequence class in question (AEnt-M P8) — a Workflow Owner, Decision Reviewer, Accountable Authority, or Dual Authority must be named *before* relocation can advance for that class.

The IGM phrasing "emergent consequence of the twelve principles working in concert" must therefore be read as *necessary substrate emergence*, not *sufficient operational authorisation*. A deep substrate does not by itself authorise autonomous operation — even if every IGM principle is satisfied. AEM and AEnt-M prerequisites must also be met.

### Rule R3 — Reversion is per action class and does not collapse the envelope.

If the substrate degrades for a single action class, or if monitoring detects declining decision quality for that class, AEnt-M's reversion mechanism applies *to that class only*: the class drops to the previous stage (e.g., Operational → Monitored, or Monitored → Parallel). The Tier 4 envelope itself is not withdrawn; other action classes within it continue at their current stages.

The Tier 4 envelope is withdrawn (AEM-level reversion) only when one of the AEM prerequisites fails: machine enforcement breaks down, control evaluations fail in aggregate, governance observability is impaired, or rubber-stamping detection is disabled. These are envelope-level conditions, not class-level.

**Three reversion levels:**

| Level | Trigger | Effect | Authority |
|---|---|---|---|
| Class-level (AEnt-M) | Degraded substrate or decision quality for one action class | Class drops one or more stages; other classes unaffected | Workflow Owner / Decision Reviewer / Accountable Authority / Dual Authority for that class (per consequence class) |
| Envelope-level (AEM) | One of four Tier 4 prerequisites fails system-wide | Envelope withdrawn; all classes revert to Tier 3 (synchronous) | Domain owner who approved the envelope |
| Substrate-level (IGM) | L3 change with cascade through the substrate | Affected L2 claims demoted; classes that depend on those claims revert per class-level trigger | Revision authority + Inference authority |

Substrate-level events propagate *through* the class-level trigger — they do not bypass it. An L3 change demotes L2 claims; demoted claims trigger class-level reversion for any action class that depends on them; the envelope-level survives unless the demotion cascades into a Tier 4 prerequisite failure.

### Rule R4 — Evidence requirements compose, not substitute.

The evidence required for an action under each framework is additive, not alternative. An action in an envelope at AEnt-M Operational relocation, drawing on substrate at IGM High Confidence (now: epistemic tier "High Confidence"), must produce:

- AEM evidence bundle components (`manifesto-done.md`, `asdlc/release-governance.md`).
- IGM provenance and epistemic-tier record (per claim cited).
- AEnt-M traceability chain (regulatory source → claim → contradiction → human approval → composite-state).

The unified schema is specified in `governance/evidence-bundle-schema.md` and `governance/evidence_bundle.schema.json`. No framework's evidence may be omitted because another framework's is present.

### Rule R5 — Authority does not collapse across frameworks.

IGM's four authorities (Semantic, Assertion, Inference, Revision) and AEnt-M's four consequence-class roles (Workflow Owner, Decision Reviewer, Accountable Authority, Dual Authority) are *different* governance dimensions and cannot be silently mapped. The same human may hold authority in both dimensions for a given action, but each must be named separately. The full mapping is in `governance/authority-accountability-matrix.md`.

---

## 3. Worked example: one Tier 4 envelope with three concurrent action-class relocation stages

A European custodian is operating a settlement-operations agent product in a Tier 4 envelope. The envelope was approved on the date below by the named domain owner; the four AEM prerequisites are operational. The substrate (financial-services intelligence graph, IGM L2/L3) has been deepening for nine months.

**Envelope parameters (AEM Tier 4):**

- Allowed change classes: settlement-instruction reconciliation; client-notification message generation; collateral-management calculation; cross-border CSDR penalty assessment.
- Blast-radius ceiling: ≤ €5M direct exposure per action; no actions affecting cross-border systemic-risk-class clients without dual-authority signoff.
- Required evidence schema: per `governance/evidence_bundle.schema.json`.
- Rollback conditions: any action whose composite-state hash differs from the manifest at action time auto-rollbacks within 4h.
- Kill-switch: domain owner + system steward + governance authority can independently revoke the envelope; revocation propagates within 60s.

**Three action classes inside this envelope, three different AEnt-M relocation stages:**

### Class A — Settlement-instruction reconciliation (Low consequence, Operational relocation)

**Consequence class:** Low (internal operational reconciliation, no client impact, fully reversible).
**AEnt-M role (P8):** Workflow Owner.
**AEnt-M relocation stage:** Operational (Stage 4).
**Substrate dependence:** L2 claims about CSD reconciliation rules, recovery procedures, and known operational workarounds. Required epistemic tier (renamed IGM "confidence") for action: **High Confidence**.
**Synchronous check:** removed.
**Asynchronous verification:** 5% audit sample reviewed weekly by system steward; control state records reviewed quarterly by accountable authority.
**Reversion trigger:** if reconciliation error rate exceeds historical baseline by 2σ over a rolling 7-day window, or if any L2 claim used by the class drops below "High Confidence", the class reverts to Monitored relocation (Stage 3) and synchronous check re-engages for edge cases. The other classes in the envelope are unaffected.

### Class B — Cross-border CSDR penalty assessment (High consequence, Monitored relocation)

**Consequence class:** High (regulatory filing, jurisdictional divergence, client impact, partially reversible within filing window).
**AEnt-M role:** Accountable Authority.
**AEnt-M relocation stage:** Monitored (Stage 3).
**Substrate dependence:** L3 regulatory architecture (EU CSDR, UK CREST, ESMA implementing technical standards); L2 jurisdictional-divergence claims; L2 penalty-rate claims by CSD. Required epistemic tier for action: **Authoritative** (regulatory evidence standard).
**Synchronous check:** retained for edge cases — any action where the substrate flags an unresolved jurisdictional divergence, where a claim used drops below Authoritative, or where the action crosses a CSDR Article 7(2) threshold goes to synchronous accountable-authority pre-review. Routine cases (no flags, all claims Authoritative, below threshold) execute via substrate-resident governance.
**Asynchronous verification:** 100% post-action audit sample reviewed within 48h by accountable authority; full evidence bundle retained per regulatory record-keeping rules.
**Reversion trigger:** any unresolved contradiction at IGM P4 type "logical contradiction" within a CSDR claim used by the class; any L3 supersession (e.g., CSDR amendment); accountable authority's override rate exceeding 5% on edge cases. On trigger, the class reverts to Parallel run (Stage 2) and every action goes through synchronous check until the substrate stabilises.

### Class C — Cross-border systemic-risk-class client filing (Critical consequence, Full Synchronous)

**Consequence class:** Critical (cross-border regulatory submission to ESMA + national competent authority; systemic-risk implications).
**AEnt-M role:** Dual Authority.
**AEnt-M relocation stage:** Full synchronous (Stage 1).
**Substrate dependence:** identical to Class B but with additional L3 cross-border-coordination claims and ESMA peer-review precedents. Required epistemic tier: **Authoritative** for every cited claim.
**Synchronous check:** every action pre-checked by dual authority; no automation reduction.
**Asynchronous verification:** N/A (synchronous already).
**Reversion trigger:** N/A (already at Stage 1). Advancement to Stage 2 (Parallel) requires three conditions: (i) substrate fertility metrics for the cross-border class meet AEnt-M Phase 5 thresholds; (ii) at least 50 actions through dual authority with zero overrides over a rolling 90-day window; (iii) governance authority signs off on the advancement after reviewing decision-quality comparison against synchronous baseline.

### What the envelope looks like to a regulator

A regulator examining this envelope receives:

1. The envelope approval document (AEM artefact) listing all four prerequisites operational and the named domain owner.
2. The class register (AEnt-M artefact) listing each action class, its consequence class, its current relocation stage, the named role per AEnt-M P8, the substrate dependencies (L2/L3 claim families), the required epistemic tier per claim family, the reversion triggers.
3. The substrate-state attestation (IGM artefact) listing the epistemic tier of each cited claim, its provenance chain, and any active contradictions in classes the action depends on.
4. Three control state records (one per active class, per the agentic provenance record requirements in `manifesto-done.md:147–186`).
5. A unified evidence bundle (per `governance/evidence-bundle-schema.md`) for any specific action under examination, containing all three frameworks' required components.

The regulator can ask "show me Class A's last 30 days of actions and verify each was within the envelope" and receive the asynchronous audit-sample records plus the control state records. The regulator can ask "show me a Class C action and the dual-authority pre-review" and receive the synchronous-check record plus the dual signoff. The regulator can ask "show me how the substrate change last month affected each class" and receive the cascade analysis showing which classes reverted, which did not, and why.

This is what "one Tier 4 envelope containing Operational, Monitored, and Full-Synchronous classes simultaneously" means in operation.

---

## 4. Edge cases and disambiguations

### 4.1 Can a class within a Tier 4 envelope be at AEnt-M Stage 1 (Full synchronous)?

**Yes.** AEnt-M Stage 1 is not the same as AEM Tier 3. A Stage-1 class inside a Tier 4 envelope has every action pre-checked synchronously, but the *governance accountability* for the envelope is still envelope-level (AEM Tier 4) and the human reviewer for that specific class is performing their pre-check inside an envelope that has been approved at the policy level — "approved" meaning the four prerequisite conditions in the R1 table above are recorded, not merely asserted. This is precisely the configuration shown in Class C of the worked example.

A class operating *outside* any envelope (no Tier 4 envelope approved, i.e. one or more prerequisite conditions unrecorded) at synchronous pre-check is at AEM Tier 3, not Tier 4 with Stage 1 relocation.

### 4.2 What if the substrate is sufficiently deep but no envelope has been approved?

**Substrate depth alone does not authorise relocation.** Relocation requires both substrate depth (IGM precondition) and an approved Tier 4 envelope (AEM authorisation) and class-level demonstrated control equivalence (AEnt-M Stage advancement). Any one missing → synchronous gating remains. This is the resolution of the implicit IGM claim that relocation "emerges" from substrate depth.

### 4.3 What if AEnt-M relocation has advanced for a class but the envelope is withdrawn?

**Envelope withdrawal cascades to all classes inside it.** Every class drops to Tier 3 synchronous gating immediately on envelope withdrawal, regardless of its prior AEnt-M relocation stage. AEnt-M relocation stages survive the withdrawal as a record (so that re-establishment of the envelope can re-engage them after the envelope is re-approved), but they do not authorise actions outside an envelope.

### 4.4 What about a class at AEnt-M Stage 4 (Operational) where IGM substrate depth degrades but the envelope and AEnt-M control-equivalence evidence are still nominally satisfactory?

**Substrate degradation triggers class-level reversion before AEnt-M control-equivalence metrics catch it.** This is by design: IGM's Curate stage is the immune function (manifesto.md:103) and detects degradation at the substrate layer faster than AEnt-M's decision-quality comparison can. The cascade is: IGM Curate detects decay or contradiction → affected L2 claims demoted → any class consuming those claims at the now-insufficient epistemic tier reverts → AEnt-M decision-quality monitoring confirms (or contradicts, in which case escalation per `governance/authority-accountability-matrix.md`).

### 4.5 What if an L3 supersession occurs (e.g., new EU AI Act delegated act)?

**L3 changes are envelope-relevant events, not just class-relevant.** The accountability is split:
- Revision authority + Inference authority (IGM) drive the cascade analysis.
- The domain owner (AEM envelope) is informed and decides whether to maintain, amend, or withdraw the envelope.
- Each affected action class's AEnt-M role decides class-level reversion for the duration of the cascade.

This is detailed in `governance/authority-accountability-matrix.md` rows L3-supersession and envelope-amendment-on-substrate-change.

### 4.6 What if the human reviewing an AEnt-M Stage-1 class action inside a Tier 4 envelope refuses to approve?

The action is blocked. The envelope's existence does not pre-authorise individual class actions at synchronous stage. The envelope authorises the *governance model* (envelope-level accountability for the envelope's design) plus class-level operations *for classes that have advanced beyond Stage 1*. Stage-1 classes still require per-action approval; refusal at synchronous review = blocked action, identical to Tier 3.

### 4.7 Class advancement (Stage 1 → Stage 2 → Stage 3 → Stage 4) — what authorises it?

Each transition requires:
- AEnt-M evidence from the previous stage (decision quality comparison, error detection rate, response time to degradation, audit reconstructability — `agentic-enterprise-manifesto/companion-guide.md:83–91`).
- Substrate state at the required epistemic tier for the class's consequence level (per the composition rule in `governance/composition-rule.md`).
- Authority signoff per consequence class (Workflow Owner / Decision Reviewer / Accountable Authority / Dual Authority).
- Confirmation that the AEM envelope's prerequisites remain operational.

Advancement is not automatic. It is a governance decision recorded in the class register.

---

## 5. What this note does *not* do

- It does not redefine AEM Tier 4. It restates what is in [`manifesto/manifesto-principles-05.md`](../manifesto/manifesto-principles-05.md#5-autonomy-is-a-permission-ceiling-not-a-switch) and explains how AEnt-M relocation fits inside it.
- It does not replace AEnt-M's four-stage progression. It clarifies the dependency on AEM and IGM.
- It does not specify the IGM substrate's required depth thresholds. Those are domain-specific (see `agentic-enterprise-manifesto/companion-guide.md:13–29` for the measurable proxies; calibration per domain is the domain owner's decision).
- It does not address foundation-model-update governance during relocated operation. That is `governance/foundation-model-third-party-register.md` (W1.6, produced by another agent).
- It does not specify how the integrated audit trail is delivered to a regulator. That is `governance/integrated-audit-trail.md`.

---

## 6. Cross-references

- `governance/authority-accountability-matrix.md` — who decides at each integration point.
- `governance/composition-rule.md` — the formal rule (action permitted = MIN of three gates).
- `governance/evidence-bundle-schema.md` — the unified evidence schema referenced by Rule R4.
- `governance/integrated-audit-trail.md` — how the three trails interleave for regulator examination.
- `governance/phase-level-matrix.md` — safe operating points for AEM Phase × IGM Maturity Level × AEnt-M Phase combinations.
- `governance/foundation-model-third-party-register.md` (planned, W1.6) — DORA Pillar 4 register of foundation-model third parties; relevant when a model update changes composite state inside a relocated envelope.
- `glossary.md` (repo root, extended by other agents) — term-collision appendix including the "epistemic tier" rename.

---

## 7. DRAFT items needing author judgment

- **DRAFT — author review needed:** the worked-example reversion thresholds (2σ over 7 days for Class A; 5% accountable-authority override rate for Class B; 50 dual-authority actions / 90 days / zero overrides for Class C) are illustrative starting values. They must be calibrated by the domain owner against historical baselines and risk appetite before any envelope approval. The rationale for these particular figures is not load-bearing for the integration rule; the rule survives any reasonable choice of thresholds.
- **DRAFT — author review needed:** the worked example places the cross-border-CSDR class at "High" rather than "Critical" consequence. The line between High and Critical is partly judgment (cross-border alone may suffice for Critical in some institutions). Confirm with regulatory reviewer.
