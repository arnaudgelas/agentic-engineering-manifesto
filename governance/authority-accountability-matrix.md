# Authority and Accountability Matrix

**Status:** Normative cross-framework artefact (Wave 1, item W1.4).
**Audience:** All four manifesto authors; ASDLC stewards; APLC product managers; risk officers; regulators.
**Purpose:** Resolve the authority conflicts identified between IGM, AEnt-M, AEM, ASDLC, and APLC. For each decision type, name *who decides*, *who is consulted*, *who is informed*, and *what the escalation path is on disagreement*.

**Glossary note.** "Epistemic tier" replaces IGM's "confidence" throughout. See `glossary.md` (repo root) for the term-collision appendix.

---

## 1. Reading this matrix

Columns map to the four governance dimensions:

- **IGM authority** — Semantic / Assertion / Inference / Revision (per IGM P6, [`intelligence-governance-manifesto/manifesto-principles.md#principle-6-four-authorities-govern-the-graph`](https://github.com/witoldreichhart/intelligence-governance-manifesto/blob/main/manifesto-principles.md#principle-6-four-authorities-govern-the-graph)).
- **AEnt-M consequence-class role** — Workflow Owner / Decision Reviewer / Accountable Authority / Dual Authority (per AEnt-M P8 + companion-guide.md:124–137).
- **ASDLC steward** — system steward, release manager, accountable human, security function lead, compliance function lead (per `asdlc/release-governance.md`, `asdlc/maintenance-governance.md`, `asdlc/waiver-governance.md`).
- **APLC product manager** — product owner, named accountable human, governance authority, evaluation team lead (per `aplc/aplc.md`, `aplc/aplc-guide.md`).

Each row uses the RACI variant **DCIE** for compactness:

- **D** — *Decides*. The authority whose signoff is required for the action.
- **C** — *Consulted*. The authority whose input is required before the decision.
- **I** — *Informed*. The authority who must be notified of the decision but does not block it.
- **E** — *Escalation path*. The sequence on disagreement.

Where a single human holds multiple authorities, the matrix is unchanged — each signoff is recorded against the dimension it satisfies.

**Conflict rule.** If two authorities have **D** rights on the same row, both must agree (joint authority). If neither has **D** rights, the AEnt-M consequence-class role decides by default — AEnt-M consequence classes are the most-specific accountability anchor when frameworks conflict.

---

## 2. The matrix

### Section A — Substrate-state decisions (IGM-led, AEnt-M consequence-aware)

#### A1. Claim creation (Provisional → graph) for an unregulated workflow

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | **D** Assertion authority | I (Workflow Owner) | I (system steward) | — |
| Consulted | C Semantic authority (type, scope) | — | — | — |
| Escalation | Assertion → Revision → Knowledge governance committee (10-business-day deadline per IGM companion-guide.md:174) | — | — | — |

#### A2. Claim promotion Confirmed → High Confidence (now: epistemic tier "High Confidence") for a regulated workflow

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | **D** Assertion authority | C Decision Reviewer (Medium consequence) or Accountable Authority (High consequence) | I | I |
| Consulted | C Revision authority (corroboration check) | — | — | — |
| Informed | I Inference authority | — | I (system steward) | — |
| Escalation | Assertion ↔ Revision disagreement → Inference adjudicates → Knowledge governance committee | If Decision Reviewer/Accountable Authority objects, claim returns to Confirmed; assertion authority cannot override consequence-class authority on regulated workflow promotion | — | — |

#### A3. Claim demotion (any tier → lower) affecting a High-consequence action class

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | **D** Revision authority | **D** Accountable Authority (joint) | C system steward | I product owner |
| Consulted | C Assertion authority | — | C release manager (if class is in active deployment) | — |
| Informed | I Semantic, Inference | I Workflow Owner of all classes consuming the claim | I FinOps/security if relevant | I governance authority |
| Escalation | Revision ↔ Accountable Authority disagreement → governance authority adjudicates within 4h SLO (per `governance-integration-note.md` Rule R3) | If Accountable Authority refuses demotion, the claim is flagged "demotion-pending" and consuming actions revert to synchronous check until resolved | If demotion forces release-gate failure, release manager triggers waiver process per `asdlc/waiver-governance.md` | If demotion forces composite-state-change rejection at APLC Stage 5, product owner consulted |

#### A4. Claim retirement (mid-action) on integrity grounds

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | **D** Revision authority (emergency action) | I (notification, not approval; per `governance-integration-note.md` §B11 resolution: "emergency retirements on integrity grounds bypass composite-state lock") | I system steward | I product owner |
| Consulted | C Semantic authority (only for ontology-impacting retirements) | — | — | — |
| Informed | I Assertion, Inference | I all consequence-class roles consuming the claim | I release manager, security function lead | I governance authority |
| Escalation | None at decision time (emergency); post-event review by Knowledge governance committee within 5 business days | Post-event review of which actions were affected; reversion of any actions that depended on the retired claim if reversible | Same as A3 if cascading release-gate failure | Same as A3 if APLC composite-state implications |

#### A5. Contradiction classification (logical / jurisdictional / temporal / scope / extraction)

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | **D** Inference authority | C Workflow Owner of the affected workflow | — | — |
| Consulted | C Assertion authority (provenance for both sides), C Semantic authority (for scope-type) | C Decision Reviewer if regulated workflow | — | — |
| Escalation | Inference ↔ domain expert disagreement → Revision authority adjudicates within 10 business days (IGM companion-guide.md:174); after 30 business days → governance hold (effective tier downgrade) | — | — | — |

#### A6. Preserved contradiction in a regulated workflow (whether to allow agent action despite the contradiction)

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | C Inference authority (contradiction type and material/non-material classification) | **D** Accountable Authority (consequence-class decision per AEnt-M response classes) | I system steward | I product owner |
| Consulted | C Revision authority | C governance authority for Critical consequence | — | — |
| Informed | I Assertion authority | I Workflow Owner | I release manager | — |
| Escalation | If Accountable Authority overrides Inference's "material" classification, the override is logged with a structured rationale; if disagreement repeats >3 times in a quarter on the same domain, escalate to governance authority for review of either the classification rule or the authority's calibration | — | — | — |

> **Resolution of B4 (case 4) from the coherence review:** "IGM 'preserve contradictions' vs AEnt-M 'Block on unresolved contradiction' — who classifies 'material'?" Inference authority classifies; Accountable Authority decides response per consequence class. Inference cannot block (it informs); Accountable Authority cannot reclassify (it can only decide what the response should be given the classification).

#### A7. Decay / staleness alert (claim past validity window) on a critical-path claim

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | **D** Revision authority (revalidate, demote, or retire) | C Accountable Authority for any High/Critical class consuming the claim | I system steward | — |
| Consulted | C Assertion authority (for revalidation) | — | — | — |
| Escalation | Class-based precedence per `governance-integration-note.md` §B11 resolution: routine on-schedule revalidations are pre-accepted within decay window; demotions on critical-path claims require composite-state acceptance with 4h SLO; emergency retirements bypass composite-state lock | — | — | — |

### Section B — Action-time decisions (per-action gates)

#### B1. Epistemic circuit-breaker activation (Block | Escalate | Restrict scope | Advisory only | Continue)

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | **D** Inference authority *sets the threshold*; **D** AEnt-M consequence-class role *sets the response class* (per AEnt-M P11, manifesto.md:115–124) | **D** (joint with IGM Inference) | — | — |
| At runtime decides | **D** Inference authority's threshold engine (automated) — fires the breaker | **D** AEnt-M response class — determines effect | — | — |
| Consulted | — | C Workflow Owner (operational signal pre-deployment) | — | — |
| Informed | I Revision authority (if the activation indicates substrate degradation) | I Accountable Authority for High/Critical | I system steward (pattern of activations) | I governance authority (for Critical) |
| Escalation | If response class at runtime is "Block" but consequence class is Low (mismatch suggesting threshold miscalibration), Inference + Decision Reviewer review and recalibrate within 5 business days; if response class is "Continue" but Inference flags integrity risk, Inference can override to "Block" with post-event review by Accountable Authority | — | — | — |

> **Resolution of B4 (case 2) from the coherence review:** "AEnt-M epistemic circuit breaker fires (Block | Escalate | Restrict): who set the response class, and can IGM's inference authority override?" Response class is set per action class at deployment by joint IGM-Inference + AEnt-M-consequence-class agreement; at runtime, IGM-Inference can override to "Block" on integrity grounds (only); other overrides require post-event escalation.

#### B2. Composite-state change mid-action (model auto-update, knowledge-base claim demotion, prompt change)

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | **D** (for substrate-component changes — claim demotion) Revision authority | **D** (for AEnt-M-level acceptance per P9) Accountable Authority for High; Dual Authority for Critical; Decision Reviewer for Medium; Workflow Owner for Low | **D** (for foundation-model component) ASDLC system steward + release manager (per `asdlc/release-governance.md` agentic provenance record requirements) | **D** (for APLC composite state) APLC product owner (per APLC Stage 6 model-update governance) |
| Consulted | — | — | C security function lead (for FM updates) | C governance authority for Critical |
| Default | **Reject** (per AEnt-M P9, manifesto.md:108–111) | — | — | — |
| Escalation | Joint signoff required across IGM Revision (if substrate-side), AEnt-M consequence-class role (always), ASDLC steward (if FM component), APLC product owner (always for APLC Stage 6 cascades). Disagreement → governance authority within 24h (Critical) / 5 business days (High) / 10 business days (Medium). | — | — | — |

> **Resolution of B4 (case 1, 3) from the coherence review:** "IGM revision authority demotes a claim used by an AEnt-M High-Consequence action: who consents?" Both: IGM Revision *decides the demotion* (substrate question); AEnt-M Accountable Authority *decides whether the action class continues to operate or reverts* given the demotion. They are separate decisions about separate objects.

> **Resolution of B11:** routine on-schedule claim revalidations within decay window are pre-accepted at AEnt-M; only demotions on critical-path claims (used by High/Critical action classes) require composite-state acceptance with 4h SLO; emergency retirements bypass composite-state lock with post-event review.

#### B3. Tier elevation request (Tier 3 → Tier 4 envelope approval)

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | C (substrate-state attestation: deep-enough? Curate active? authorities staffed?) Revision authority | C Accountable Authority for the highest-consequence class in the proposed envelope | **D** ASDLC system steward + accountable human (envelope owner per AEM [`manifesto-principles-05.md#5-autonomy-is-a-permission-ceiling-not-a-switch`](../manifesto/manifesto-principles-05.md#5-autonomy-is-a-permission-ceiling-not-a-switch)) | C APLC governance authority (review of envelope vs APLC Stage 4/5 conformity) |
| Consulted | — | — | C security function lead, FinOps owner | C product owner for each agent product inside the envelope |
| Informed | I all four IGM authorities | I all consequence-class roles for classes inside the envelope | I release manager | — |
| Required prerequisites (before D may be exercised) | All four AEM Tier 4 prerequisites operational (machine enforcement, control evaluations, governance observability, rubber-stamping detection) per [`manifesto-principles-05.md#5-autonomy-is-a-permission-ceiling-not-a-switch`](../manifesto/manifesto-principles-05.md#5-autonomy-is-a-permission-ceiling-not-a-switch) | All consequence classes in scope have named roles | Foundation-model-third-party register up to date (per `governance/foundation-model-third-party-register.md`) | EU AI Act conformity assessment current for any high-risk classes inside the envelope |
| Escalation | If any prerequisite is missing, D is blocked; escalation is to fix the prerequisite, not to override | — | — | — |

#### B4. Tier 4 envelope withdrawal (emergency)

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | I | I | **D** any of: ASDLC system steward, accountable human (envelope owner), security function lead, governance authority — all have unilateral kill-switch authority per [`manifesto-principles-05.md#5-autonomy-is-a-permission-ceiling-not-a-switch`](../manifesto/manifesto-principles-05.md#5-autonomy-is-a-permission-ceiling-not-a-switch) ("kill-switch configuration") | I product owner |
| Effect | All classes inside the envelope drop to Tier 3 synchronous gating immediately | — | — | — |
| Post-event | Mandatory governance authority review within 5 business days; envelope re-approval requires fresh demonstration of all four prerequisites + reason for withdrawal addressed | — | — | — |

### Section C — Lifecycle decisions

#### C1. Initiative-authorisation gate (per AEnt-M three-condition definition + W1.11)

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | C (substrate-depth attestation per IGM DoD criteria 1–4) Revision authority | **D** (substrate-depth + constraint-legibility + governance-relocation conditions met) Accountable Authority for the highest-consequence class in the initiative scope | I (delivery-pipeline traceability state) ASDLC system steward | **D** (APLC Initiative Authorization Gate per W1.11 + governance authority co-signature) APLC product owner + governance authority |
| Consulted | C Inference authority (constraint legibility — are rules machine-reasonable for this domain?) | — | — | — |
| Informed | I all four IGM authorities | I Workflow Owner for each class | I release manager | — |
| Cadence | Quarterly review (per W1.11) | — | — | — |
| Auto-revocation | Triggered on (a) any of the three conditions degrading below threshold, or (b) decision-quality drop > 1σ on the relevant action classes for ≥ 7 days | — | — | — |

#### C2. Waiver issuance (any gate condition)

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | **D** (only for IGM-equivalent waivers per W2.20: epistemic-tier waivers) Revision authority + named waiver owner | C Accountable Authority for any class consuming the waived item | **D** (for ASDLC waivers per `asdlc/waiver-governance.md`) waiver owner + accountable human | **D** (for APLC waivers per `aplc/waiver-governance.md`) waiver owner + accountable human |
| Consulted | — | — | C security or compliance function lead per condition type | — |
| Informed | I all four IGM authorities for IGM waivers; I Revision authority for waivers on substrate-dependent items | I Workflow Owner | I release manager | I governance authority for Critical |
| Required | Owner ≠ requester; risk description; expiry date (≤ 90 days routine, ≤ 180 days with accountable-human approval); compensating control operational; remediation plan with named owner; linked condition ID | — | Same | Same |
| Escalation | If waiver is denied, requester escalates through accountable human → governance authority; no automatic re-grant after denial | — | — | — |

#### C3. Agent retirement (APLC Stage 7)

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | C (substrate dependencies — what claims become orphaned?) Revision authority | I Workflow Owner of any class served by the agent | C ASDLC system steward (operational handoff) | **D** APLC product owner + accountable human (per `aplc/aplc.md` Stage 7) |
| Consulted | — | — | C security function lead (decommission steps), FinOps owner (cost decommission), regulatory/compliance for retention | C governance authority for high-risk classification |
| Informed | I Assertion, Semantic, Inference authorities (orphaned-claim governance) | — | I release manager, deployment owner | I users (migration) |
| Escalation | If retirement orphans claims used by other agents, retirement is conditional on either (a) retaining the claims under a successor authority, or (b) joint retirement of dependent agents | — | — | — |

#### C4. Foundation-model update (provider-initiated change of model version)

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | I (informed of composite-state component change) | **D** (per AEnt-M P9 default-reject per consequence class) per row B2 | **D** (for ASDLC release-gate impact per `asdlc/release-governance.md` foundation model version consistency) ASDLC system steward + release manager | **D** (for APLC Stage 6 foundation-model-update governance per `aplc/aplc.md`) APLC product owner |
| Consulted | C Revision authority (will the substrate's L3 claims about model behaviour need revalidation?) | — | C security function lead, FinOps owner | C governance authority for Critical |
| Informed | I all IGM authorities | I all consequence-class roles | I — | — |
| Required | Behavioral-evaluation portfolio (APLC Layer 2 + Layer 3 minimum) re-run before acceptance | — | — | — |
| Escalation | Joint disagreement at AEnt-M-level resolves at governance authority within 24h (Critical) / 5 business days (High) / 10 business days (Medium); a default-reject under AEnt-M P9 cannot be overridden by ASDLC or APLC | — | — | — |

> **Resolution of B6 from coherence review:** the foundation-model-third-party register (DORA Pillar 4) must be current before C4 is exercised; absence of register entry = automatic reject. See `governance/foundation-model-third-party-register.md`.

#### C5. Specification readiness (ASDLC Layer 1 → Layer 2 transition)

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | C (substrate-state attestation for any spec referencing claim families) Revision authority | I | **D** (per `asdlc/specification-readiness.md` 9-condition gate) demand sponsor + accountable human | C product owner (if APLC product) |
| Required for agent-surfaced specifications (per W1.8 / B8 resolution) | C — agent-surfaced action opportunities pass through this gate identically to human-authored ones; substrate-state attestation must accompany | — | — | — |
| Escalation | If substrate cannot attest (e.g., claims required at "Authoritative" but available only at "Confirmed"), specification fails Condition 1 (loop-readiness) and re-enters demand layer | — | — | — |

#### C6. APLC Stage 4 release gate (Behavioral Release Gate + ASDLC Release Gate combined)

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | C (substrate-state attestation for any claim family the agent reasons over) Revision + Assertion authorities | C Accountable Authority for the highest-consequence class | **D** (combined gate record per `aplc/aplc.md:196–198`) APLC product owner + ASDLC release manager + accountable human | **D** (joint with ASDLC) |
| Consulted | C Inference authority (contradiction state, circuit-breaker calibration) | — | C security function lead, FinOps owner | C evaluation team lead |
| Informed | I all four authorities | I all consequence-class roles | — | — |

#### C7. Cross-jurisdictional regulatory-source-chain change (e.g., new EU AI Act delegated act, ESMA implementing technical standard)

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | **D** (substrate-side: ingest, consolidate, propagate) Assertion authority + Revision authority | **D** (regulatory-source-chain field of evidence bundle per `governance/evidence-bundle-schema.md`) Accountable Authority for High; Dual Authority for Critical | I — | C — |
| Required cascade | Per IGM L3 cascade analysis (companion-guide.md:103–106) — every L2 claim depending on the changed L3 element flagged for revalidation | — | — | — |
| Escalation | Cascade incompleteness (i.e., a revalidation queue not drained within the response-time SLO defined in `governance/composition-rule.md`) → governance authority + accountable human notification within 4h (Critical), 24h (High), 5 business days (Medium); class-level reversion until cascade complete | — | — | — |

### Section D — Governance-system decisions

#### D1. Authority assignment / re-assignment (any of IGM's four authorities or AEnt-M's four roles)

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | **D** Knowledge governance committee (or equivalent cross-domain authority) | **D** Accountable Authority's parent organisational role (e.g., the manager who designates the Accountable Authority) | C system steward portfolio role | C product owner |
| Required | Documented authority boundaries; named alternate (per W2.21 — succession requirement); ≤ 3 domains per Revision authority (per W2.21) | — | — | — |
| Escalation | Vacancy or untenable load → emergency interim assignment by governance authority; permanent re-assignment requires full process | — | — | — |

#### D2. Substrate-diversity monitoring / source-monoculture alert

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | **D** Revision authority (decision: rebalance, accept, escalate) | I | C ASDLC system steward (per W2.26 — substrate-diversity audit responsibility) | I |
| Consulted | C Assertion authority (source-mix analysis) | — | — | — |
| Trigger | >80% claims from a single source (per AEnt-M failure mode "substrate capture" symptom, manifesto.md:191) | — | — | — |

#### D3. Rubber-stamping detection alert (oversight signal-quality degradation)

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | I | **D** Accountable Authority (per AEM P12 minimum bar — raise automation barriers, lower autonomy tiers) | **D** (jointly) ASDLC system steward — operational realisation of tier reduction | I product owner |
| Triggers | Override rate ≈ 0% on complex cases; reviewer agreement >95% sustained; review latency below plausible minimum (per AEM [`manifesto-principles-12.md#12-accountability-requires-visibility`](../manifesto/manifesto-principles-12.md#12-accountability-requires-visibility), "accountability diffusion") | — | — | — |
| Effect | Tier reduction for affected classes; envelope status reviewed; if envelope was Tier 4 with rubber-stamping detection failing, envelope auto-withdraws (per AEM Tier 4 prerequisites) | — | — | — |

#### D4. Governance-overhead-exceeds-value condition (AEM P11 / AEnt-M P11 economics)

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | C Revision authority (substrate-burden attestation) | **D** Accountable Authority + governance authority | **D** (jointly) FinOps owner + system steward | C product owner |
| Triggers | Governance overhead per outcome > value per outcome over rolling window (per AEM [`manifesto-principles-11.md#11-optimize-the-economics-of-intelligence`](../manifesto/manifesto-principles-11.md#11-optimize-the-economics-of-intelligence), "when governance overhead exceeds the value of the work, that is a signal to simplify") | — | — | — |
| Response | Simplify governance — not add more (per AEM P11). Possible actions: collapse adjacent gates, reduce evaluation frequency, narrow waiver categories, deprecate redundant authorities | — | — | — |

#### D5. Domain-graph integrity attack (claim poisoning, provenance spoofing, indirect prompt injection — per W1.3 / B3)

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | **D** Revision authority + security function lead (joint, emergency) | I (notification of affected workflows) | **D** ASDLC security function lead | I product owner |
| Effect | Affected claims quarantined; consuming action classes auto-revert to synchronous; integrity-monitoring forensics initiated | — | — | — |
| Post-event | Mandatory regulatory-incident assessment (EU AI Act Art. 73 — see `governance/foundation-model-third-party-register.md` for incident-reporting workflow); knowledge governance committee review | — | — | — |

#### D6. Regulatory-incident reporting (EU AI Act Art. 73 / DORA Pillar 2)

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | I (substrate-state evidence for the incident bundle) | C (consequence-class evidence) | C (operational evidence) | **D** APLC accountable human + governance authority + compliance function lead |
| Required | Article 73 clocks: 2-day for death/widespread infringement; 15-day for serious-but-non-catastrophic | — | — | — |
| Escalation | Compliance function lead has unilateral filing authority on time pressure; product owner cannot block a regulatory filing | — | — | — |

> Cross-reference: `governance/foundation-model-third-party-register.md` (W1.6) specifies the incident workflow and the named recipient authorities.

### Section E — Cross-framework conflict-resolution

#### E1. IGM Revision authority demotes a claim that AEnt-M Accountable Authority refuses to accept as a composite-state change

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides at substrate layer | **D** Revision authority — claim is demoted | — | — | — |
| Decides at action layer | — | **D** Accountable Authority — class can revert (preferred) or operate at the now-insufficient epistemic tier (refused per AEM minimum bar — accountability requires that no action class operate below its required epistemic tier) | — | — |
| Result | Claim demoted; class reverts to synchronous gating until either (a) claim re-promoted, (b) class re-defined to require lower epistemic tier (governance change, requires Tier-3-elevation-equivalent process), or (c) class retired | — | — | — |
| Escalation | Inability to reach (a) (b) (c) within 5 business days → governance authority + product owner; affected classes default to "Block" response | — | — | — |

#### E2. IGM "preserve contradictions" vs AEnt-M "Block on unresolved contradiction" disagreement

(See A6 above for the resolved row.)

#### E3. AEnt-M Workflow Owner (Low consequence) and AEM P12 minimum bar (per-action accountability)

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | — | **D** Workflow Owner per AEnt-M P8 (Low consequence) | I system steward | — |
| Required (per W1.9 / B10 resolution) | — | Either (a) tighten Workflow Owner accountability to per-action (e.g., post-hoc 100% audit sample within 5 business days), or (b) declare the action class explicitly out-of-AEM-scope and remove the implication of AEM coverage | — | — |
| Default applied | (a) tighten — Workflow Owner remains, post-hoc 100% audit sample within 5 business days; this preserves AEM minimum bar by ensuring any action is reviewable per-action even if the review is post-hoc rather than synchronous | — | — | — |

#### E4. Specification readiness for agent-surfaced opportunity (B8 resolution)

| | IGM | AEnt-M | ASDLC | APLC |
|---|---|---|---|---|
| Decides | C substrate-attestation | **D** classify the action opportunity as *demand candidate*, not loop-ready specification | **D** apply the AEM 9-condition loop-readiness gate identically to human-authored specs | C product owner |
| Required | Same gate, regardless of origin | — | — | — |

---

## 3. The five-case resolution from the coherence review (B4)

For traceability, here is where each of the five cases identified in the swarm review (`igm-aent-coherence-review.md:62–69`) is resolved in this matrix:

| Case | Question | Row(s) | Resolution |
|---|---|---|---|
| 1 | IGM revision authority demotes a claim used by an AEnt-M High-Consequence action: who consents? | A3, B2, E1 | Both: IGM Revision decides the demotion; AEnt-M Accountable Authority decides whether the class continues, reverts, or is redefined. Disagreement → governance authority within 4h SLO. |
| 2 | Epistemic circuit-breaker fires: who set the response class, can IGM Inference override? | B1 | Response class set jointly at deployment by IGM Inference + AEnt-M consequence-class role. At runtime, IGM Inference can override to "Block" only on integrity grounds. |
| 3 | IGM Curate retires a claim mid-action, AEnt-M default for composite-state change is "reject": which wins? | A4, B2 | Emergency retirement on integrity grounds bypasses composite-state lock with post-event review. Routine retirement follows B2: AEnt-M consequence-class role decides reversion within 4h (Critical) / 24h (High) / 5 business days (Medium). |
| 4 | IGM "preserve contradictions" vs AEnt-M "Block on unresolved": who classifies "material"? | A5, A6 | IGM Inference authority classifies (logical/jurisdictional/temporal/scope/extraction). AEnt-M Accountable Authority decides response class given the classification. Inference cannot block; Accountable Authority cannot reclassify. |
| 5 | IGM's four authorities vs AEnt-M's four roles — same humans? different humans? joint authority? | All rows; D1 | Different governance dimensions. Same human may hold authority in both, but each signoff is recorded separately. Authority assignment requires named alternate and ≤3 domains per Revision authority (W2.21). |

---

## 4. Cross-references

- `governance/governance-integration-note.md` — how Tier 4, governance relocation, and substrate depth compose.
- `governance/composition-rule.md` — the formal MIN rule for permitted action.
- `governance/evidence-bundle-schema.md` — what each authority's signoff produces in the bundle.
- `governance/integrated-audit-trail.md` — how this matrix's decisions appear in a regulator-walkthrough.
- `glossary.md` (repo root) — term-collision appendix.

---

## 5. DRAFT items needing author judgment

- **DRAFT — author review needed:** the SLOs for cross-framework escalation (4h Critical, 24h High, 5 business days Medium, 10 business days Low) are stated as illustrative starting values. They must be validated against operational realities — a 4h SLO for substrate-side decisions presumes around-the-clock authority coverage that may not exist in early phases. Calibrate against the named alternate / succession requirements (W2.21).
- **DRAFT — author review needed:** Row D2 trigger (>80% from a single source) is taken from the AEnt-M failure-mode symptom verbatim. It is plausible but unjustified. Confirm or replace with a calibrated value.
- **DRAFT — author review needed:** Row E3 default (a) — tightening Workflow Owner to per-action post-hoc 100% audit sample within 5 business days — is the resolution most consistent with AEM P12. Confirm whether AEnt-M authors prefer this, or option (b) carving out Low consequence as below AEM scope. The latter is also a defensible position but requires removing AEM-coverage language from AEnt-M P8 and the companion guide.
- **DRAFT — author review needed:** the "Knowledge governance committee" appears in IGM companion-guide.md:174 but is not named in the IGM principles or glossary. Either formalise it as the governance authority for cross-domain disputes, or replace with an explicitly-named cross-domain authority. This matrix uses "Knowledge governance committee" as a placeholder.
