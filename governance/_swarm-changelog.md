# Swarm Changelog

Running log of edits made by coherence-review remediation agents. Each entry: date, ticket, summary, files touched.

---

## 2026-05-02 — W1.12 — Layered positioning across the agentic governance stack

**Goal:** declare the layered dependency between AEM, ASDLC, APLC, IGM, AEnt-M; replace "complementary" / "companion" framing with explicit dependency direction.

**Layer model encoded as canonical:**

```
Agentic Engineering Manifesto (AEM)
   ├─ Agentic SDLC (ASDLC)
   ├─ Agentic Product Lifecycle (APLC)
   ├─ Intelligence Governance Manifesto (IGM)
   └─ Agentic Enterprise Manifesto (AEnt-M)
       ├─ depends on IGM
       └─ inherits AEM principles
```

**Files touched:**

- `intelligence-governance-manifesto/README.md` — replaced "The governance stack" table with "Position in the agentic governance stack" section: layer diagram + four explicit dependency declarations (inherits AEM; required by AEnt-M; standalone-usable conditional; not a "companion" to AEnt-M).
- `intelligence-governance-manifesto/positioning.md` — appended a new "Position in the agentic governance stack" section before the trailing license line. Resolved the contradiction between `manifesto.md` (5-layer stack) and the previous "companion" framing on line 91. Standalone-usable claim preserved as an explicit if-then.
- `intelligence-governance-manifesto/manifesto.md` — replaced the body of "Connection to the Agentic Governance Stack" (~line 200) so the layer diagram is the canonical statement; existing five-layer table preserved as a narrative restatement.
- `agentic-enterprise-manifesto/README.md` — replaced "The governance stack" table with "Position in the agentic governance stack" section; added explicit "Audience" subsection narrowing claim to *technical governance leaders, architecture boards, and CTOs/CIOs/CROs operating regulated agentic estates* (per cross-manifesto finding 29).
- `agentic-enterprise-manifesto/manifesto.md` — inserted new "Position in the Agentic Governance Stack" section between the title block and "The argument" with the layer diagram and three normative dependency declarations (depends on IGM; inherits AEM; not standalone-usable).
- `agentic-governance-stack.md` (NEW, repo root) — single-page canonical stack reference. Includes term-collision preface pointing to root `glossary.md`, the layer diagram, one paragraph per layer (scope / what it owns / depends on / required by / standalone-usable status), practical implications, and cross-references to `governance/governance-integration-note.md` and `governance/authority-accountability-matrix.md` (both flagged DRAFT — author review needed).
- `README.md` (repo root) — inserted "The agentic governance stack" section between the published-version link and "Six Values"; links to `agentic-governance-stack.md`.
- `governance/_swarm-changelog.md` (NEW, this file).

**Cross-link conventions applied:** all positioning sections now reference (a) `agentic-governance-stack.md` for the canonical stack; (b) repo-root `glossary.md` for term collisions; (c) `governance/governance-integration-note.md` and `governance/authority-accountability-matrix.md` (DRAFT) for cross-stack integration artefacts to be produced under W1.1 and W1.4.

**Open items / DRAFT flags:**

- `governance/governance-integration-note.md` — not yet written (W1.1).
- `governance/authority-accountability-matrix.md` — not yet written (W1.4).
- Root `glossary.md` term-collision appendix — to be added under W2.1.
- Audience narrowing for AEnt-M README is encoded as text but should be reviewed by the AEnt-M lead; flagged as the right wording but author judgment may refine.

---

## 2026-05-02 — W1.2 / W1.3 / W2.2 / W2.5 / W2.20 / W2.21 / W2.25 — IGM substrate-integrity principles + operational additions

**Goal:** add four new IGM principles (13–16) covering validation, substrate as attack surface, architectural delegation to AEM P3, and containment of substrate-driven emergence; add three operational additions (Epistemic Tier Waiver, Authority Continuity, tightened MVG checklist); apply the "confidence" → "epistemic tier" rename.

**Files touched:**

- `intelligence-governance-manifesto/manifesto-principles.md` — promoted "Twelve Principles" → "Sixteen Principles". New Part III (Substrate Integrity) with Principle 13 (claims must be validatable, not only corroborated; AEM P8 hook), Principle 14 (claims are attack surfaces; AEM P10 adversarial hook; named substrate-security owner distinct from the four authorities), Principle 15 (architectural enforcement assumed, delegated to AEM P3 — stub principle), Principle 16 (containment for substrate-driven emergence; rate limits, self-corroboration cycle detection, cascade circuit breakers; AEM P10 emergent hook). Added v1.3 terminology note ("confidence" → "epistemic tier"). Added v1.3 revision-log rows.
- `intelligence-governance-manifesto/manifesto.md` — bumped to v1.3; added top-of-document terminology note; added "Substrate Integrity — Four Additional Principles" short-form section before "Failure Modes"; added v1.3 revision-log row.
- `intelligence-governance-manifesto/implementation-guide.md` — tightened MVG from 5 items to 8 normative Yes-with-evidence checks (W2.25): scope enforcement, contradiction tracking, L1/L2/L3 separation, decay-class taxonomy added; added new "Epistemic Tier Waiver" section modelled on `asdlc/waiver-governance.md` (W2.20: Revision-authority owner, ≤90-day expiry, compensating control, remediation plan, expired-without-remediation reverts to non-operational, portfolio governance); added new "Authority Continuity" section (W2.21: named alternate per authority, 5-business-day activation trigger, annual review, ≤3-domain Revision authority cap, continuity log).

**Cross-references created (planned, not yet authored — referenced as forward links):** `governance/governance-integration-note.md`, `governance/authority-accountability-matrix.md`, `governance/composition-rule.md`. Same forward references as W1.12 — no new files created here.

**Authorial choices flagged "DRAFT — author review needed":**

1. P14: substrate-security owner positioned as a fifth named role distinct from the four governance authorities. Authors to confirm whether this should be a fifth functional authority or a separate security function reporting to a CISO line.
2. P16: rate-limit thresholds, cycle-detection depth, and cascade thresholds left unspecified at the principle level. Authors to decide whether to fix in implementation guidance or per-deployment.
3. Epistemic Tier Waiver: 90-day cap and portfolio thresholds (3 per domain, 20% concentration) inherited from ASDLC waiver-governance defaults. Authors to confirm whether IGM-specific calibration is warranted (e.g. shorter cap for High Confidence → Authoritative waivers).
4. Authority Continuity: 5-business-day activation trigger and 3-domain Revision authority cap as starting points. Authors to confirm whether different caps apply to Semantic / Inference (typically lower-volume) vs Assertion (potentially higher with automation).

**Out of scope for this batch (handoff):**

- `glossary.md` updates for *epistemic tier*, *validation event*, *self-corroboration cycle*, *substrate-security owner*, *Epistemic Tier Waiver*, *authority continuity log* — handoff to W3.1 (IGM glossary cleanup) and W2.1 (unified glossary).
- HTML regeneration (`*.html`) — left for a build pass.
- Companion-guide rewrite to align "confidence" → "epistemic tier" in worked examples and confidence-level table — handoff to W3.1.

---

## 2026-05-02 — W2.18 / W2.19 / W2.26 / W2.28 / W2.30 (+ adjacent items) — ASDLC integration with IGM and AEnt-M

**Goal:** patch the Agentic SDLC framework to integrate with IGM (intelligence governance) and AEnt-M (governance relocation, Tier 4 envelope mechanics, accountability diffusion fix). All edits in `asdlc/` plus one cross-link into IGM `manifesto-principles.md` Principle 10.

**Files touched:**

- `asdlc/asdlc.md` — (a) added L4 → Intelligence Lifecycle feedback path under Feedback Paths, with required investigation contents and ≤30-day claim re-verification SLO; updated the four-layer Mermaid diagram to include the new arrow. (b) Added Tier 4 Appendix A — Policy-Envelope Intelligence Constraints listing required envelope elements (epistemic-tier-to-action mapping, contradiction-handling rules per type, decay boundaries per claim class, feedback-loop closure rules); references `governance/composition-rule.md` (planned). (c) Added Tier 4 relocation mechanics paragraph in the Tier-4-in-Layer-3 section: per-action-class monitoring under AEnt-M P7, per-class reversion-to-synchronous on degradation, re-relocation requires fresh evidence, escalation authority approves reversions.
- `asdlc/release-governance.md` — (a) Condition 1: added governance-relocation evidence sub-condition (`relocation_decision_record`, `decision_quality_baseline`, `error_detection_comparison`, `audit_reconstructability_validation`, `degradation_response_test`) referencing `governance/evidence-bundle-schema.md` (planned by A1). (b) Condition 1: added projected-stale claim status requirement: bundle must include each load-bearing claim's decay window, next revalidation date, current staleness status; `projected-stale` if within 30 days of deployment; explicit steward acceptance required at gate; ≤4h notification on actual-vs-projected divergence with rollback option. (c) Condition 4: spelled out substantive-review standard (three structured attestations: spot-check of evaluation results, spot-check of evidence bundle components, control state record accuracy attestation); added sampling plan (≥20% stratified) for Tier 3 systems with >20 deployments/quarter; added rubber-stamp detection (sub-30-minute median reviews on complex bundles, zero-findings histories) with escalation to governance portfolio steward.
- `asdlc/maintenance-governance.md` — (a) Steward Responsibilities: added quarterly substrate diversity audit for systems depending on intelligence (source diversity, contradiction preservation rate, expert-network health) with warning thresholds (>80% single-source, <2% contradiction density in contested domain, declining peer consultation) and remediation paths (expand Harvest/Capture, activate cross-domain linking, escalate to IGM authorities). (b) Steward Capacity and Portfolio Governance: added portfolio limit override for intelligence-bearing systems — ≤3 systems per steward regardless of autonomy tier — superseding the 5/10/20 tier-calibrated limits; rationale documented (concurrent lifecycles + composite-state tracking + IGM authority coordination).
- `asdlc/specification-readiness.md` — Condition 3: added intelligence governance evaluation case category (confidence-threshold enforcement, contradiction detection, decay-window compliance, feedback-loop closure); required for any system depending on intelligence regardless of autonomy tier.
- `intelligence-governance-manifesto/manifesto-principles.md` — Principle 10: appended "Production-incident feedback path" subsection cross-linking to ASDLC `asdlc.md` Feedback Paths; routes ASDLC L4 incident-feedback artefacts to the Ingest authority; declares an unrouted artefact a Principle 10 compliance gap.

**Conventions applied:** "epistemic tier" used throughout for IGM tier system; "confidence" reserved for AEM verification meaning. Cross-references to planned files (`governance/evidence-bundle-schema.md`, `governance/composition-rule.md`) flagged inline. Tone matches existing ASDLC structured-spec voice.

**Open items / DRAFT flags:**

- `governance/evidence-bundle-schema.md` — referenced from `release-governance.md` Condition 1; not yet written (A1).
- `governance/composition-rule.md` — referenced from `asdlc.md` Tier 4 Appendix A; not yet written.
- AEnt-M Principle 7 metric thresholds — referenced from `asdlc.md` Tier 4 relocation mechanics; assumed defined in AEnt-M source; not cross-checked here.
- ASDLC HTML files (`asdlc.html`, `release-governance.html`, etc.) — markdown sources updated; HTML re-render not performed.

---

## 2026-05-02 — W2.14 — Domain mappings: healthcare, personal data + Data Act, public sector

**Goal:** add three domain files paralleling `domains/financial-services.md`, mapping IGM's twelve principles to (1) healthcare under HIPAA + GDPR Article 9, (2) personal-data systems under GDPR + EU Data Act, (3) public-sector / government use cases under EU AI Act high-risk Annex III + CoE Framework Convention.

**Files added:**

- `intelligence-governance-manifesto/domains/healthcare.md` — Twelve principles mapped to clinical context. Decay table tuned to clinical claim types (anatomy/decades, guidelines/months-years, drug labelling/weeks-months, patient-specific operational/hours-days). Authority structure: clinician (assertion), medical informaticist (semantic), clinical informatics / CDS governance (inference), health information governance + privacy office (revision). Regulatory references: HIPAA Privacy & Security Rules, GDPR Article 9, FDA SaMD framework + GMLP principles, EU MDR/IVDR, EU AI Act high-risk Annex III, OCR enforcement context. Governance relocation explicitly bounded — high-acuity, irreversible, novel-class clinical decisions remain synchronously human-gated regardless of substrate maturity.
- `intelligence-governance-manifesto/domains/personal-data-and-data-act.md` — Twelve principles mapped to GDPR + Data Act context. Lawful basis treated as part of provenance (not external metadata). Rectification (Art. 16) / erasure (Art. 17) propagation made first-class. Article 22 constraints surfaced as epistemic-tier gating on solely automated decisions. Data Act Articles 3–13 (B2B/B2C sharing) and 14–22 (B2G) mapped onto acquisition mode and revision authority. Italy DPA 2026 OpenAI enforcement cited as worked example for Principle 11 (DRAFT — public-record review needed for specific findings).
- `intelligence-governance-manifesto/domains/public-sector.md` — Twelve principles mapped to public-sector context. Authority structure: legal counsel (assertion for legal-rule claims), policy office / programme owner (assertion for policy-intent claims), AI-governance committee (inference), information-governance committee + DPO with ministerial escalation (revision). Regulatory references: EU AI Act Article 27 (FRIA), CoE Framework Convention Article 11 (effective remedies), OECD AI Principles, supreme audit institution mandates, national administrative-law duty to give reasons. Governance relocation bounded — Article 22-class decisions, asylum, criminal justice, child protection remain synchronously human-gated.

**Conventions applied:**

- Matched `domains/financial-services.md` template (regulatory context table → principle-by-principle mapping with application / regulatory connection / gap addressed, plus added "worked example" subsection where instructive → epistemic operational risk closing section).
- Used "epistemic tier" instead of "confidence" throughout (repo-wide rename per Principles v1.3 terminology note); P3 retitled "Epistemic tier is earned, not assigned" in each domain file.
- Marked consequential regulatory claims "DRAFT — domain expert review needed" (or equivalent SME marker per domain).
- Added cross-reference stubs to `governance/authority-accountability-matrix.md` and `governance/foundation-model-third-party-register.md` (latter planned by A11).

**Open items / DRAFT flags:**

- DRAFT items require SME review before publication: clinical informaticist + healthcare compliance officer (healthcare); DPO + privacy counsel (personal-data); public-law counsel + public-sector AI governance officer (public-sector).
- Italy DPA 2026 OpenAI worked example needs primary-source citation pulled from the Garante's published decision before public release.
- The cross-reference target `governance/foundation-model-third-party-register.md` is currently dangling — A11 to land it.
- Domain HTML renders not produced (markdown sources only).

---

## 2026-05-02 — AEnt-M internal coherence pass (W2.8, W2.12, W2.15, W3.2, W3.6 + top T6 internal-coherence findings)

**Scope:** Internal coherence pass on the Agentic Enterprise Manifesto plus three operational additions (concurrent lifecycle sequencing, agent inventory + SaaS-embedded governance, rights & remedies). All edits in `agentic-enterprise-manifesto/`.

**Files touched:**

- `agentic-enterprise-manifesto/glossary.md` — (a) Added missing entries: `Harvest mode` (with `Ingest` synonym normalisation note), `Action opportunity`, `Epistemic quality` (vs. `Epistemic tier`), `Epistemic tier` (with confidence-rename preface), `Temporal supersession`, `Jurisdictional divergence`, `Retrieval governance`, `Reasoning governance`, `Action governance`, `Gap flag`. (b) Extended `Scoped view` with the five normative filtering rules (authorization → task-scope → epistemic-tier → contradiction-status → decay). (c) Added repo-wide naming-convention preface ("epistemic tier" replaces "confidence" in scalar/substrate sense; AEM verification meaning preserved). (d) Updated `Epistemic response classes` and `Epistemic circuit breaker` to reference the per-class fail-closed table in P11.
- `agentic-enterprise-manifesto/manifesto.md` — (a) **W3.2 rename:** all scalar/substrate "confidence" usages replaced with "epistemic tier" / "epistemic quality" (P3, P8, P11 worked example, Phase 1, Phase 2). AEM-verification "confidence" preserved (e.g. "confident wrong answers"). Added inline preface in Part I IGM-prerequisite paragraph. (b) **W3.6 phase timeline fix:** added "Timeline note" framing all phases as illustrative ranges with deliberate overlap; relabelled Phase 3 as "~weeks 17–36, overlapping with Phase 2" and Phase 4 as "from ~month 9, often overlapping with late Phase 3"; eliminates the months-5-vs-week-17 discontinuity. (c) **W3.6 metric calibration:** added "Calibration note" stating thresholds are illustrative for FS at scale; added a Rationale column to all three metric tables with brief justification for each load-bearing threshold (>4h audit reconstruction tied to DORA Pillar 2; 1–15% contradiction-density sweet spot; 10-business-day regulatory-response with DORA/Art. 73 tightening guidance; >80% coverage; >30 days unresolved critical contradiction; <30% claim reuse). (d) **Phase metric mismatch:** revision log corrected to "16 signals" (matched count); added v0.3 (draft) entry summarising this pass. (e) **Substrate monoculture:** added three monitoring metrics — substrate-diversity ratio, expert-consultation-vs-substrate-query rate, novel-problem escalation rate — to the Enterprise capability table. (f) **W2.12 rights & remedies:** added Principle 8 subsection (DRAFT — author review needed) defining explanation, contestation, and remedy pathways for affected natural persons; references GDPR Art. 22 and CoE Framework Convention Art. 11; required for FS use cases (lending, claims, employment screening). (g) **Decay class taxonomy** explicitly enumerated in P10 (regulatory, procedure, vendor-config, operational-workaround, reference-data, foundational) with steward and cadence per class. (h) **"Fail closed" operationalised** per consequence class in P11 with named override authorities. (i) **Composite-state change detection** specified in P9 with detect (automated) / evaluate (combined) / accept (human, named) split and named accountabilities. (j) **Autonomy-vs-initiative ingestion-trigger clarification** in P6 example: agent reasons over claims, not source documents; the new claim enters via IGM Ingest at Candidate tier. (k) **Governance-relocation evidence reconciliation:** P7 now references the Companion's four evidence categories as canonical, restating its three operational signals as derivatives of the decision-quality category.
- `agentic-enterprise-manifesto/companion-guide.md` — (a) **W2.8 Concurrent Lifecycle Sequencing:** new section with feedback SLA tiers (Low/Medium/High/Critical → 1 week / 3 days / 1 day / 1 day with same-day ack); 14-day intelligence-revalidation buffer before release gate; >70% delivery-cycle composite-state-change deferral with security-patch exception; feedback-queue back-pressure rule (>50 unprocessed High/Critical, or any High/Critical >5 days, blocks new deliveries in domain); mid-action claim-update conflict resolution (pause, re-evaluate, escalate, record cross-cycle event). (b) **W2.15 Agent inventory & SaaS-embedded governance:** new section with full agent-inventory schema (ID, owner, autonomy tier, consequence classes, composite-state hash, FM version, provider/deployer status, last evaluation, substrate domains, initiative authorisation, decommissioning triggers); discovery capability with quarterly/monthly/daily cadence guidance; SaaS-embedded governance with provider-vs-deployer split (EU AI Act Art. 13), deployer-instructions register, monitoring expectations, composite-state subscription, exit-plan requirement; procurement gate triggering composite-state registration. (c) Companion-side "confidence" → "epistemic tier" renames in initiative Condition 2, accountability table, and intelligence↔delivery section.

**Conventions applied:** "epistemic tier" used throughout for IGM tier system; "confidence" reserved for AEM binary-verification meaning. Cross-references to `governance/authority-accountability-matrix.md`, `governance/composition-rule.md`, `governance/governance-integration-note.md`, repo-root `glossary.md` consistent with prior swarm work. DRAFT-tags applied to consequential authorial decisions (rights-and-remedies subsection — regulatory positioning; v0.3 revision-log entry).

**Open items / DRAFT flags:**

- Rights-and-remedies subsection (Principle 8) — DRAFT pending author review against post-*Schufa* / *Dun & Bradstreet* GDPR Art. 22 case law and EU AI Act deployer-side obligations as they enter application from August 2026.
- v0.3 revision-log entry marked "(draft)"; promote to numbered version when the parallel A1/B-series swarm passes are merged.
- Procurement-gate and discovery cadence numbers (50 items / 5 days / 80%) are illustrative — require domain-specific tuning before adoption as controls.
- HTML re-render of `agentic-enterprise-manifesto/{manifesto,companion-guide,glossary}.html` not performed; markdown sources are authoritative.

---

## 2026-05-02 — W1.11 + W2.23 — Initiative Authorization Gate, knowledge-base CSH, substrate-vs-agent drift, red-team additions, Stage 1 KB governance plan (APLC patches)

**Goal:** Patch APLC for IGM/AEnt-M coherence per coherence-review B12 (Initiative Authorization Gate) and W2.23 (red-team additions), plus APLC review findings 4, 5, 13.

**Files touched:**

- `aplc/aplc.md` — (a) New "Initiative Authorization Gate (parallel to Stage 4 Release Gate)" section with three pass conditions (substrate-depth, constraint-legibility, governance-relocation), per-domain × per-action-class scope, quarterly review, auto-revoke triggers, dual signature (system steward + IGM revision authority); (b) extended Section 1 (Composite Agent State) so the knowledge-base component of CSH must hash claim set AND IGM-governance metadata (authorities, epistemic tiers, contradiction status, decay schedule); (c) Contents table updated with `initiative-authorization-gate.md`.
- `aplc/initiative-authorization-gate.md` (NEW) — full normative spec: pass conditions with thresholds, decision rule (no waivers), quarterly review, auto-revoke trigger table, accountable signatories with conflict-of-interest test, evidence requirements, downstream effects, failure modes and counter-controls, four DRAFT items.
- `aplc/aplc-guide.md` — (a) Stage 1 minimum extended with 4th condition "Knowledge-base governance plan" (named IGM authorities, planned domain scope, planned ingestion sources, planned epistemic-tier policies; replaced with one-line declaration for non-intelligence agents); (b) new "Initiative Metrics and Audit" section operationalising "action opportunity" (3 criteria), recording discipline (all opportunities logged regardless of acceptance), surfacing-rate vs acceptance-rate distinction, quarterly stratified-sample audit with reasoning-chain traceability and rejection-rationale documentation, < 20% acceptance rate triggers re-gate.
- `aplc/agent/agent-behavioral-evaluation.md` — added two new red-team attack categories: (a) Contradiction-Injection Attack (4 vectors: direct injection, provenance-spoofed, tier-manipulation, decision-flip verification; defence anchored to IGM Principle 14); (b) Initiative-Bypass Attack (audit of gate evidence: metric tampering, held-out reference set integrity, signature integrity; bypass = Critical finding).
- `aplc/agent/agent-operations.md` — added "Substrate-caused vs Agent-caused Drift Investigation" subsection requiring 24h triage classification (agent-caused / substrate-caused / mixed / indeterminate), substrate-state diff alongside composite-state diff, IGM revision authority + Inference authority as co-investigators when substrate cause suspected, explicit rule that recalibration against degraded substrate locks in degradation.
- `governance/_swarm-changelog.md` — this entry.

**Cross-references applied:** new gate/spec references `governance/composition-rule.md`, `governance/authority-accountability-matrix.md`, `governance/governance-integration-note.md`, `integration/loop-readiness-for-agent-opportunities.md`, IGM Principle 14, AEnt-M Principle 6.

**DRAFT flags:** four illustrative thresholds in `initiative-authorization-gate.md` (coverage 80%, freshness 90%, constraint coverage 80%, classification accuracy 90%); 90-day quarterly review cadence; 12-month reference-set refresh cadence; conflict-of-interest test pending formal authority-accountability-matrix; 20% acceptance-rate threshold default. All marked for domain-owner / IGM-revision-authority calibration.

**Repo-wide vocabulary:** "epistemic tier" used throughout; no use of bare "confidence" for IGM tier semantics in any new text.

**Out of scope for this batch (handoff):**

- HTML re-render (`aplc/*.html`, `aplc/agent/*.html`) — markdown sources updated; HTML left for build pass.
- `integration/loop-readiness-for-agent-opportunities.md` — referenced from new gate spec; not yet authored (other ticket).
- `governance/composition-rule.md` and `governance/authority-accountability-matrix.md` — referenced from new gate spec; not yet authored.

---

## 2026-05-02 — IGM internal-coherence pass (W3.1, W3.3, W3.4, W3.5 + glossary punch-list)

**Goal:** Execute the IGM internal-audit punch-list (45 findings) plus W3 editorial bundles. Coordinated with Agent A3 on W2.25 (MVG checklist) — A3 owns the canonical edit; this pass did not duplicate.

### Glossary cleanup (`intelligence-governance-manifesto/glossary.md`) — W3.1

| Fix | Source finding |
|---|---|
| Added standalone `Emerge mode` entry. | IGM internal audit — glossary–body drift |
| Added `Decay class` entry (regulatory / operational / external + Foundational/L3). | IGM internal audit |
| Added `Critical path` entry (runtime property tied to consequence class). | IGM internal audit |
| Added `Subdomain` entry (DRAFT — author review needed). | IGM internal audit |
| Promoted `L1 / L2 / L3 memory layers` composite entry from companion-guide-only. | IGM internal audit / W3.5 |
| Aligned `L1` entry with companion-guide phrasing ("and practitioners' situated knowledge"). | IGM internal audit |
| Renamed `Confidence level` → `Epistemic tier` with backward-compat note + canonical tier table. | Coherence review T1 / W2.1 |
| Renamed `Confidence-to-action threshold` → `Epistemic-tier-to-action threshold`. | Coherence review T1 |
| Replaced `Definition of Done` pointer with the explicit eight-criteria list. | IGM internal audit — DoD-as-pointer |
| Expanded `Acquisition modes` with tier-mapping column. | IGM internal audit |
| Promoted `Epistemic monoculture` from manifesto failure-modes to glossary. | IGM internal audit |
| Reframed `Five contradiction types` with worked example per type. | IGM internal audit |
| Reframed `Epistemic circuit breaker` as inverse indicator of governance relocation. | W3.5 (inversion fix) |
| Resolved `Organizational intelligence` divergence — chose manifesto definition; documented choice. | IGM internal audit |
| Added term-collision appendix (IGM ↔ AEM ↔ AEnt-M). | Coherence review T1 |

### Operational detail promoted to manifesto-principles.md — W3.4

| Detail | Was in | Now in (normative) |
|---|---|---|
| Authority-escalation rules with 10-/30-business-day deadlines + two-authority requirement | companion-guide:167–178 | Principle 6 |
| Decay-triage four-priority model (P1 critical-path → P4 dormant) | implementation-guide:188–200 | Principle 5 |
| Epistemic circuit-breaker spec with consequence-class table | implementation-guide:65–69, 168–184 | Principle 11 |
| L1/L2/L3 memory-layer model | companion-guide:73–117 | Principle 9 |

The promoted-from sections in companion-guide and implementation-guide were retained as elaboration but reframed as implementation notes pointing back to the principle as the normative source.

### Revision-log abbreviation legend (manifesto-principles.md) — W3.3

Added a footnote table mapping SW-/IC-/PC/PD/EC abbreviations to review streams (Stakeholder Workshop / Internal Critique / Peer-Critique / Peer-Driven / External Critique). Marked DRAFT — author review needed.

### L1/L2/L3 ↔ three-level reconciliation (manifesto.md) — W3.5

Added "Which layer are you governing?" decision section under "Intelligence, Not Knowledge", linking the external Knowledge / Organizational Intelligence / Governed Intelligence hierarchy with the internal L1/L2/L3 memory layers via a six-row decision table.

### Tense / inversion fixes — W3.5

- Lifecycle (manifesto.md prescriptive) ↔ L1/L2/L3 (companion-guide conditional): added "Normative status" callout to companion-guide L1/L2/L3 section + tightened opening sentence to prescriptive voice.
- Circuit-breaker frequency: reframed in glossary, P11, implementation-guide metrics row, and circuit-breaker section as the *inverse indicator of governance relocation success* rather than purely a halt mechanism.
- "Should see" / "must see" audit text: searched IGM, none found in IGM scope (this finding applies to AEnt-M, not IGM).

### Specific contradictions reconciled

| Reconciliation | Source |
|---|---|
| `manifesto.md:73–79` Value 3 tightened: "preserve always; halt action when contradiction is material AND consequence class is High/Critical." | Coherence review punch-list |
| companion-guide.md (confidence-table section, since restructured into companion-principles.md) vs `glossary.md:24–32` confidence-table divergence: aligned to single canonical *Epistemic tiers* table; companion-guide section retitled and references the canonical table. | Coherence review punch-list |
| `implementation-guide.md` Level 2 "informal confidence" vs intelligence-theatre failure pattern: clarified Level 2 informal tier acceptable as transient stage, not steady state, and not for above-Low consequence actions. Matching note added to glossary `Intelligence theatre` entry. | Coherence review punch-list |

### Cross-references added (manifesto.md)

- Governance-relocation section → `implementation-guide.md` Metrics + `manifesto-principles.md` P11 (quantitative signals).
- Governance-relocation section → `domains/financial-services.md` (regulated-industry mapping).

### MVG checklist gap (W2.25) — coordination

Verified Agent A3 has added scope enforcement (P1) and contradiction tracking (P4) to `implementation-guide.md` MVG. This pass did not duplicate; checked consistency with the v1.3 MVG note.

### DoD × Maturity-Level mapping (implementation-guide.md)

Added 8-row × 5-level mapping table between maturity-levels and adoption-sequence sections, showing first-achievable and fully-satisfied maturity level for each of the eight DoD criteria.

### Repo-wide rename "confidence" → "epistemic tier"

Applied across IGM `companion-guide.md` and `implementation-guide.md` everywhere the meaning is the IGM tier system. Preserved "confidence" only where AEM-style verification is meant. Backward-compat note in glossary, manifesto-principles preamble, and companion-guide claim-structure section.

### Files modified

- `intelligence-governance-manifesto/glossary.md` (full rewrite)
- `intelligence-governance-manifesto/manifesto.md` (Value 3 tightening; "Which layer are you governing?" section; cross-refs from governance-relocation)
- `intelligence-governance-manifesto/manifesto-principles.md` (P5/P6/P9/P11 normative additions; revision-log abbreviation legend; revision-log entries)
- `intelligence-governance-manifesto/companion-guide.md` (epistemic-tier rename; canonical-table reference; L1/L2/L3 normative-status callout)
- `intelligence-governance-manifesto/implementation-guide.md` (DoD × maturity-level table; circuit-breaker section reframed as implementation notes; decay-triage section reframed as implementation notes; tier rename; Level 2 informal-tier clarification; metric row reframed as inverse indicator)

### Open items / DRAFT flags

- `Subdomain` glossary entry — confirm whether subdomain boundaries are formally registered or emerge through engagement.
- `Decay class` taxonomy normativity — confirm normative vs illustrative.
- Revision-log abbreviation legend — confirm SW/IC/PC/PD/EC mapping.
- HTML re-render of IGM `*.html` files not performed; markdown sources are authoritative.

---

## 2026-05-02 — W1.5 + W1.6 — EU regulatory artefacts (BLOCKER closure)

**Goal:** close BLOCKER gaps B5 (EU AI Act not named — Annex III, Articles 13/14/27, Article 72/73, GPAI, conformity, penalties) and B6 (DORA Pillar 4 / foundation-model third-party governance missing) before the high-risk-system obligations apply 2 August 2026.

**Files created (NEW directory `regulatory/`):**

- `regulatory/eu-ai-act-addendum.md` — multi-page addendum (DRAFT — author/legal review needed). Sections: (1) Annex III mapping for manifesto domains (settlement, credit scoring, insurance pricing, employment screening, healthcare diagnosis support, public-sector decisions) with explicit high-risk yes/no determinations and prohibited-practices Art. 5 attestation. (2) Art. 13 deployer-instructions template — full filled-form structure tying to AEnt-M P8 / P9, IGM authorities, AEM Tier 4. (3) Art. 14 oversight checklist mapping AEM P5/P12, IGM P11, AEnt-M P5/P8/P9. (4) Art. 27 FRIA template — full content per Art. 27(1)(a)–(f), CFR rights table, complaint and redress with GDPR Art. 22 + AI Act Art. 86 cross-ref. (5) Art. 12 logging fields + Art. 72 PMM bridging template (to be replaced by Commission template once published). (6) Art. 73 incident workflow with normative 2-day / 10-day / 15-day clocks, named recipient = market-surveillance authority of MS where incident occurred, full initial-report template. (7) GPAI Art. 51–55 — provider/deployer split, 10²⁵ FLOP threshold, AEnt-M composite-state implications when GPAI provider is systemic-risk. (8) Conformity assessment — internal control vs notified body; ISO/IEC 42001 path. (9) Penalty schedule — €35M/7%, €15M/3%, €7.5M/1%.
- `regulatory/foundation-model-third-party-register.md` — full register schema + DORA Pillar 4 alignment (DRAFT — author/legal review needed). Sections: (1) why AEnt-M P9 alone is not a register; four event classes P9 misses. (2) 14-section register schema — provider, model versions, sub-processors, jurisdictional restrictions, SLAs, exit triggers + 4-phase exit plan, criticality, sub-contracting chain, concentration risk, pricing, certifications, CSH dependencies, linked artefacts, approvals. (3) DORA Art. 28 / 29 / 30 / 31 / 33 alignment. (4) DORA Art. 19 incident reporting (4h / 72h / 1-month) cross-walked with EU AI Act Art. 73; parallel-classification rule. (5) Pillar 3 resilience testing — AI red-teaming + TLPT scope. (6) Worked example — bank running OpenAI GPT-4o + Anthropic Claude Opus 4.7 + hosted Mistral local; CTPP analysis, exit plan, concentration assessment. (7) Procurement gate — 16-condition checklist gating any new foundation-model adoption; reduced gate for minor versions.

**Files touched:**

- `governance/_swarm-changelog.md` (this entry).

**Cross-link conventions applied:** both regulatory artefacts reference (a) `governance/evidence-bundle-schema.md` (planned W1.7) as the artefact integration point; (b) `governance/authority-accountability-matrix.md` (planned W1.4) for "named human" placeholders; (c) `governance/governance-integration-note.md` for Tier-4 + relocation interactions; (d) `intelligence-governance-manifesto/manifesto.md` Principle 14 for substrate threat model; (e) `agentic-enterprise-manifesto/manifesto.md` Principle 9 for composite-state implications. The two artefacts cross-reference each other (Art. 73 ↔ DORA Art. 19 parallel-classification rule; Art. 13 §2.2 row 7 → register entry).

**Open items / DRAFT flags (Wave 2 backlog):**

- `regulatory/substantial-modification-policy.md` — operational threshold for EU AI Act Art. 25 deployer-as-provider determination.
- `regulatory/eu-ncas-by-member-state.md` — list of designated market-surveillance authorities per Member State for Art. 73 routing.
- `regulatory/iso-42001-crosswalk.md` — already on Wave 2 backlog (W2.10).
- `regulatory/incident-triage-tree.md` — decision tree for parallel DORA / Art. 73 / GDPR / sectoral classification.
- `regulatory/concentration-risk-analysis.md` — cross-provider concentration view (separate from per-entry register concentration field).
- `regulatory/foundation-model-register.schema.json` — machine-readable form of register schema.
- Both artefacts marked **DRAFT — author/legal review needed**; require regulatory specialist + in-house counsel + DPO + CISO + Accountable Authority sign-off before operational reliance.
- Pending Commission template for Art. 72 PMM (due Feb 2026): adopt on publication and re-stamp §5.2 of the addendum.
- Pending AI Office template for Art. 27 FRIA notification: adopt on publication and re-stamp §4.3.
- CTPP designations under DORA Art. 31 are pending for major foundation-model providers; quarterly re-check committed in the register schema.

---

## 2026-05-02 — W2.4 / W2.5 (AEnt half) / W2.27 / W3.8 / W3.9 — AEM-coverage closure + P5/P7/P11 tightening in AEnt-M

**Goal:** close AEM-principle coverage gaps in AEnt-M (P11 Economics, P10 Containment, P4 Right-size, P3 Architecture) by adding four new principles to the manifesto, and tighten Principles 5, 7, and 11 in the companion guide.

**Files touched:**

- `agentic-enterprise-manifesto/manifesto.md`
  - Renamed "Twelve principles" → "Sixteen principles"; added a one-paragraph preface that Part IV (Principles 13–16) closes AEM-coverage gaps.
  - Inserted new **Part IV — Cross-cutting governance commitments** between Principle 12 and the worked example, containing:
    - **Principle 13 — *Governance is paid for; when it costs more than the work, reduce autonomy.*** Total cost of correctness (inference + verification + governance overhead + incident remediation + human review). Two admissible responses when overhead exceeds value: reduce autonomy or simplify scope. Multi-model coherence cost — shared retrieval contracts, shared scoped-view rules, shared response-class defaults. Metric: governance-cost-to-action-value ratio per action class (warning >0.4, mandatory review >0.6, autonomy reduction >0.8). Wires AEnt-M to AEM Principle 11. Thresholds DRAFT-tagged.
    - **Principle 14 — *Containment is multi-agent, not just epistemic.*** Substrate threat model: indirect prompt injection across the substrate, cross-agent privilege escalation, tool-call poisoning, cascade emergence. Operational counters: rate limits per agent/tool/write-path, kill-switch held by enterprise governance authority (no dual-authority delay), cascade detection on action-graph fan-out, quarantine. Cross-references AEM P10 (extends — agent-coordination surface above the IGM claim-level threat model). Metric: mean fan-out (warning at *N=5*), kill-switch exercises, post-incident review SLO. *N* and *T* DRAFT-tagged as per-domain configuration.
    - **Principle 15 — *Right-size the agent portfolio; orchestrators do not escape their tier.*** Orchestrator tier-containment (orchestrator cannot delegate beyond its tier; tier elevation needs the same approval whether human- or orchestrator-requested — directly from AEM P4). Single commit path with one ordered queue per substrate domain. Conflict-resolution patterns (preserve typed contradiction, escalate to consequence-class authority, tie-break per Principle 7 priority order, record in inventory). Agent-inventory minimum bar: tier, consequence-class scope, orchestrator-worker links, write authority, kill-switch operator, last governance review. Shadow agents blocked at substrate access layer. Cross-references `governance/authority-accountability-matrix.md`.
    - **Principle 16 — *Architectural enforcement is assumed (stub).*** Declares dependency on AEM Principle 3 (typed boundaries, capability-scoped credentials, allow-listed tool surfaces, deterministic policy enforcement at the action boundary, auditable substrate write-paths). AEnt-M does not respecify; states the dependency. Mirrors planned IGM Principle 15 architectural-enforcement principle.
  - Revision log: added v0.4 (draft) entry naming all four new principles and the companion-guide tightening.

- `agentic-enterprise-manifesto/companion-guide.md`
  - **W3.8 — Principle 5 tightening.** New section *Principle 5 — Retrieval, Reasoning, and Action Governance: Operational Specification* (after Initiative section). Three-layer table (see / think / do); machine-readable artefacts in JSON Schema (or equivalent) for each layer with explicit field lists; maintenance owners (Workflow Owner + Domain steward / Inference Authority / Accountable Authority) with cadence; integration with the substrate (scoped-view computation engine; reasoning-chain validator; action boundary at AEM P3 enforcement point); per-layer failure detection signals. Scoped-view computation rules — five ordered, normative steps including a default claim-tier-minima-per-consequence-class table (Low: Provisional+, Medium: Supported+, High: Confirmed+, Critical: Confirmed + validation event). References `governance/composition-rule.md` (DRAFT — author review needed).
  - **W3.9 — Principle 7 tightening.** New section *Principle 7 — Procedures with Timing and Due Process* (after Governance Relocation: Operational Mechanics) with four explicit procedures and timing tables:
    - (a) Initiative-withdrawal: 6-step procedure (trigger detection → notice → decision → transition plan → effect → appeal) with timing per step; default-on-silence is *confirm withdrawal*; appeal does not pause withdrawal.
    - (b) Governance-relocation reversal: automatic-revert triggers (decision-quality regression, audit-reconstruction failure, substrate degradation, containment incident); discretionary-reversal table by requester. Reversal cuts back one stage of the four-stage progression by default.
    - (c) Dual-authority disagreement: 5-step procedure (pause → capture → escalate to enterprise governance authority → binding decision → quarterly review). Binding-decision SLO 5 business days, **4 hours** for time-pressured Critical actions.
    - (d) Consequence-class tie-breaking: explicit priority order **regulatory > reputational > client > financial**, used only when factors are tied at the same level; driving factor recorded in agent inventory.
  - **W2.27 — Response-class operational rules.** New section *Principle 11 — Response-Class Operational Rules* (after Consequence Classes). Setting defaults (enterprise governance setup, quarterly review). Runtime override (named accountable human only; not delegable to agent; cannot relax Critical below dual authority; cannot admit below minimum *epistemic tier* without exception). Required override artefacts (action class, default, chosen response, named human, role, written rationale, compensating control). Retention: longest of regulatory minimum, audit-reconstruction window, and AEnt-M defaults (7 yr High/Critical, 3 yr Medium, 1 yr Low). Quarterly retrospective on override patterns: rising rate is a mis-calibration signal; rationale-concentration; authority-distribution skew; outcome correlation. Failure mode: zero-override default for four consecutive quarters is a calibration warning, not health.

**Conventions applied:**

- "Epistemic tier" used throughout the new content (per repo-wide rename; no replace-all sweep performed in this ticket — that is the W2.1 / glossary editorial pass surface).
- Cross-references to planned files: `governance/governance-integration-note.md`, `governance/authority-accountability-matrix.md`, `governance/composition-rule.md`, `governance/aem-principle-coverage-map.md`, repo-root `glossary.md`.
- DRAFT tags applied to: P13 thresholds (0.4 / 0.6 / 0.8), P14 cascade thresholds (*N=5*, window *T*).

**Open items / DRAFT flags:**

- `governance/aem-principle-coverage-map.md` — not yet written; referenced from Part IV preface and P16 stub.
- `governance/composition-rule.md` — referenced from the scoped-view computation rules; should align with W2.6 composition-rule artefact.
- IGM Principle 15 (architectural enforcement) — not yet written; AEnt-M P16 declares the dependency.
- HTML re-render not performed; markdown sources are authoritative.

---

## 2026-05-02 — W1.1 / W1.4 / W1.7 / W1.9 / W2.6 / W2.16 / W2.17 / W3.10 — Cross-cutting normative artefacts

**Goal:** produce the seven cross-cutting normative artefacts that other agents reference. Resolves coherence-review BLOCKERS B1, B4, B7, B9, B10, B11 and foundational items W2.6, W2.16, W2.17, W3.10.

**Files created:**

- `governance/governance-integration-note.md` (W1.1, resolves B1) — reconciles AEM Tier 4 (binary policy envelope), AEnt-M governance relocation (per-action-class staged progression), IGM substrate-depth-driven relocation. Five normative integration rules (R1–R5). Worked example with one Tier 4 envelope containing Operational, Monitored, and Full-Synchronous classes simultaneously, including substrate-depth thresholds and reversion triggers per class.
- `governance/authority-accountability-matrix.md` (W1.4, resolves B4 cases 1–5, B11) — DCIE matrix across IGM authorities × AEnt-M consequence-class roles × ASDLC stewards × APLC product managers. ~30 rows in five sections (substrate, action-time, lifecycle, governance-system, conflict-resolution).
- `governance/evidence-bundle-schema.md` (W1.7 + W1.9, resolves B7, B9) — unified evidence-bundle definition with required-by-tier matrix (16 tier × consequence cells). All AEM, IGM, AEnt-M components specified including the new fields `intelligence_claims_snapshot[]`, `feedback_observations`, `contradiction_handling_decisions`, `regulatory_source_chain`, `composite_state_hash_at_action`, `relocation_stage_at_action`.
- `governance/evidence_bundle.schema.json` (W1.7) — JSON Schema (draft-2020-12) document; conforms to the markdown specification.
- `governance/composition-rule.md` (W2.6) — normative composition rule: *permitted action = AEM_gate ∧ IGM_gate ∧ AEnt_M_gate*. Five worked examples (T4+Authoritative+Critical allowed if dual-authority signoff; T4+Confirmed+High blocked at IGM gate; T2+Authoritative+Low allowed; T1+Authoritative+Low blocked at AEM gate; T4+Provisional+Low blocked at IGM gate). Six edge cases. Engineering pseudocode.
- `governance/aem-principle-coverage-map.md` (W3.10) — three-column coverage map for AEM's 12 principles × {IGM, AEnt-M}. Statuses: Strong / Partial / Missing / Delegated-to-AEM. Names the gap-closing artefact for every Missing or Partial. Explicit Delegated-to-AEM list (P6 memory failure modes; P7 retrieval performance; P9 reasoning traces).
- `governance/integrated-audit-trail.md` (W2.16, overlaps W1.7) — specifies how AEM execution trace, IGM provenance chain, AEnt-M traceability chain compose into a single bundle with three trails interleaved through three index keys (`trace_id`, `claim_id`, `composite_state_hash_at_action`). Worked regulator-walkthrough (BaFin examining cross-border CSDR penalty filing) showing a single bundle answering seven distinct regulator questions.
- `governance/phase-level-matrix.md` (W2.17) — AEM Phase × IGM Maturity Level × AEnt-M Phase grid (5 tables, 150 cells). Eight unsafe combinations explicitly named (U1–U8). Safe operating progression (single forward path).

**Conventions applied:**

- "Epistemic tier" used throughout for IGM tier system (Provisional / Candidate / Confirmed / High Confidence / Authoritative). "Confidence" reserved for AEM verification meaning. Each artefact's preamble carries a glossary note.
- Cross-references to: `governance/foundation-model-third-party-register.md` (W1.6, already produced — actually under `regulatory/foundation-model-third-party-register.md` per earlier swarm entry; this batch references at the original `governance/` path; reconcile during editorial pass), repo-root `glossary.md` (term-collision appendix to be added by W2.1).
- All artefacts cross-link to one another via the `Cross-references` section at the end.
- All seven files quote source manifestos by file:line where load-bearing.
- DRAFT items flagged consistently as `DRAFT — author review needed: [reason]`.

**Author-decision points flagged (DRAFT items):**

1. `governance-integration-note.md` — reversion thresholds (2σ over 7 days; 5% override; 50/90/0) illustrative; cross-border CSDR class High vs Critical line judgmental.
2. `authority-accountability-matrix.md` — escalation SLOs (4h Critical / 24h High / 5 BD Medium / 10 BD Low) illustrative; row D2 trigger 80% taken from AEnt-M source verbatim; row E3 default = tighten Workflow Owner accountability to per-action post-hoc 100% audit sample within 5 BD (alternative: carve out Low consequence as below AEM scope); "Knowledge governance committee" naming is placeholder.
3. `evidence-bundle-schema.md` — required-by-tier matrix opinionated (`intelligence_claims_snapshot` recommended, not mandatory at T1×Low / T2×Low); dual use of "epistemic tier" awkward (recommend renaming AEM artefact-origin label); `provenance_hash` computation unspecified (handoff to IGM W1.3 implementation).
4. `composition-rule.md` — Section 3.2 (inferred claims) requires inference-authority tier-derivation rule registration; example 2.5 (Low + Provisional) makes the strong claim that AEnt-M consequence softening does not relax IGM thresholds.
5. `aem-principle-coverage-map.md` — IGM "weakened" rating on P11 (Economics) generous; B10 resolution recorded as option (a) — confirm with AEnt-M authors.
6. `integrated-audit-trail.md` — worked-example IDs / dates illustrative; per-action vs per-release bundle policy in §4 item 1 opinionated.
7. `phase-level-matrix.md` — IGM Maturity Levels synthesised (IGM does not formally name); "AEM Phase 6" naming convenient but not in AEM source; safe progression conservative by design.

**What downstream agents must honour:**

1. The "epistemic tier" rename (any agent extending IGM, AEnt-M, or repo `glossary.md` must preserve naming).
2. The unified evidence bundle schema (new evidence requirements extend `evidence_bundle.schema.json`, do not create competing schemas).
3. The authority/accountability matrix (new decision authorities add rows to the matrix, do not redefine in their own document).
4. The composition rule (new gate logic composes with `composition-rule.md`, does not state alternative gating).
5. The phase-level matrix (any adoption guidance respects the 8 unsafe combinations).

**Out of scope for this batch (handoff):**

- Update repo-root `glossary.md` term-collision appendix (W2.1).
- Update existing manifestos to cross-reference these governance/ artefacts (Wave 3 editorial pass).
- HTML rendering not performed.
- Reconcile path mismatch: this batch references `governance/foundation-model-third-party-register.md`; the earlier swarm produced `regulatory/foundation-model-third-party-register.md`. Editorial pass should choose one canonical location and update all cross-links.

---

## 2026-05-02 — W1.8 / W1.9 / W1.10 / W2.22 / W2.29 / W3.7 — Integration layer between IGM, AEnt-M, ASDLC, APLC, AEM

**Goal:** build the integration layer (new directory `/integration/`) that resolves the remaining cross-framework operational collisions identified in the coherence review (B8, B10, B11, T5, contradiction handling) and provides a worked end-to-end integration test.

**Files created (NEW directory `integration/`):**

- `integration/loop-readiness-for-agent-opportunities.md` (W1.8 / B8) — resolves AEM upstream loop-readiness gate vs AEnt-M agent-surfaced opportunities. Normative rule: agent-surfaced opportunities are *demand candidates*, not loop-ready specifications; they must pass AEM's nine-condition gate before becoming specifications. Workflow: surface → opportunity registry → human triage → loop-readiness review → if pass, becomes specification → enters Specify. Includes opportunity-record schema (initiator agent ID, CSH, surfaced timestamp, reasoning chain, claims cited with epistemic tier and provenance, contradictions observed, proposed action class, consequence class estimate, demand-candidate status, triage record, loop-readiness-review record). Five integration rules; six edge cases; absorbing layer is ASDLC Layer 1.
- `integration/low-consequence-resolution.md` (W1.9 / B10) — resolves AEM P12 minimum bar vs AEnt-M Low-class workflow-level accountability. Two options enumerated; **Option B recommended (DRAFT — author choice needed)**: explicitly carve "Low consequence" out of AEM scope with seven conjunctive criteria (no client impact, no regulatory exposure, no irreversibility, no PII processing, no financial exposure, no safety implications, no precedent-creation). Inside the carve-out: workflow-level accountability + post-hoc audit sampling (≥1% or ≥30 actions / workflow / month); reclassification trigger on any criterion breach. Edits applied to `agentic-enterprise-manifesto/manifesto.md` Principle 8 Low paragraph and `agentic-enterprise-manifesto/companion-guide.md` consequence-class table.
- `integration/composite-state-vs-curate-precedence.md` (W1.10 / B11) — resolves AEnt-M P9 default-reject vs IGM Curate continuous claim-level changes. Class-based precedence: **Class 1** routine revalidations within decay-window bounds (pre-accepted, logged); **Class 2** consequential demotions on critical-path High/Critical claims (4-hour SLO with named Accountable Authority; SLO breach is a P12 governance event with auto-acceptance to avoid substrate freeze); **Class 3** emergency retirements on integrity grounds (per IGM P14) bypass the lock with 24-hour post-hoc review. Five integration rules; seven edge cases. Edits applied to `agentic-enterprise-manifesto/manifesto.md` P9 and `intelligence-governance-manifesto/manifesto-principles.md` P5 minimum bar.
- `integration/decommissioning.md` (W2.22) — five-phase workflow for retirement (trigger → impact analysis → disposition decisions → 30-day grace period → execution → post-retirement audit at 90 days). Disposition matrix for claims maintained primarily for a retiring agent: preserve / preserve-for-regulator / demote-to-archive / retire. Authority chain: IGM Assertion + Revision authorities + APLC product manager + system steward + AEnt-M P8 authorities for affected action classes. Edits applied to `intelligence-governance-manifesto/manifesto-principles.md` P6 minimum bar.
- `integration/igm-aplc-integration-test.md` (W2.29) — worked end-to-end scenario for a regulated trade-settlement penalty calculation agent under CSDR. Crosses APLC Stage 1 (conception) → IGM substrate prep → APLC Stage 2 (behavioural spec) → AEM Specify/Design/Build → ASDLC release gate (unified evidence bundle) → APLC Stage 4 (release with Tier 4 envelope and AEnt-M relocation stages) → APLC Stage 5 (operate with composite-state Class 2 worked event Day 30) → IGM feedback loop → APLC Stage 7 (sunset per `decommissioning.md`). The scenario doubles as an integration test — a failure to produce any named artefact is a failure of the integration claim.
- `integration/contradiction-handling-decision-tree.md` (W3.7) — reconciles IGM Value 3 (preserve contradictions) with AEnt-M P11 (Block on unresolved). Single canonical decision tree: input = `contradiction-type × consequence-class × claim-tier`, output = response class (Block / Escalate / Restrict scope / Advisory only / Continue with enhanced monitoring). Four consequence-class-keyed tables; three worked examples (jurisdictional divergence at High; temporal supersession at Low; scope variation at Critical); seven edge cases. Edits applied to `intelligence-governance-manifesto/manifesto.md` Value 3 section and `agentic-enterprise-manifesto/companion-guide.md` Principle 11 section.

**Source-document edits:**

- `agentic-enterprise-manifesto/manifesto.md` — (a) updated worked example P5 paragraph "An agent with initiative surfaces..." to show the demand-candidate / opportunity-record / triage / loop-readiness-review chain instead of going straight to "human approval"; (b) updated P8 Low paragraph with carve-out criteria and reference to `integration/low-consequence-resolution.md`; (c) updated P9 with Class 1/2/3 precedence cross-reference to `integration/composite-state-vs-curate-precedence.md`.
- `agentic-enterprise-manifesto/companion-guide.md` — (a) updated consequence-class table Low row (workflow tag, ≥1% / ≥30 sampling cadence, ≥90d retention, carve-out cross-reference); (b) added contradiction-decision-tree cross-reference at top of Principle 11 section.
- `intelligence-governance-manifesto/manifesto.md` — added decision-tree cross-reference to Value 3.
- `intelligence-governance-manifesto/manifesto-principles.md` — (a) P5 minimum bar augmented with class-based precedence cross-reference; (b) P6 minimum bar augmented with retirement-workflow cross-reference.

**Conventions applied:**

- "Epistemic tier" used throughout for IGM tier system; "confidence" reserved for AEM verification meaning.
- All consequential authorial choices DRAFT-tagged ("Option B recommendation"; SLO calibrations; criterion-stringency; matrix-cell defaults).
- All integration files quote source manifestos by file:line.
- Cross-references compose with prior batches: `governance/governance-integration-note.md`, `governance/authority-accountability-matrix.md`, `governance/evidence-bundle-schema.md`, `governance/composition-rule.md`, `aplc/initiative-authorization-gate.md`.

**DRAFT items flagged for author review:**

- Option A vs Option B for low-consequence resolution (recommendation: Option B).
- Class 2 4-hour SLO; 24-hour Class 3 post-hoc review window; 30-day grace period; 90-day post-retirement audit cadence; Critical-row default-Block conservatism in the contradiction tree.
- Whether AEM `manifesto.md:295–312` should be edited to declare the Low carve-out (recommended).
- Whether the opportunity registry is single or federated.
- Whether `consequence_class_estimate = Unknown` is permitted in the opportunity record.
- Resolution-status as a fourth axis on the contradiction tree.

**Out of scope for this batch:**

- Repo-root `glossary.md` term updates for *opportunity record*, *demand candidate*, *Class 1/2/3 Curate event*, *retirement disposition matrix* — handoff to W2.1.
- HTML rendering — markdown sources are authoritative.
- `governance/contradiction-decision-tree.schema.json` — referenced from W3.7 artefact but not yet authored.
- Updates to `aplc/agent-retirement.md` to cross-reference `integration/decommissioning.md` — recommended but left to APLC author.

---

## 2026-05-02 — W2.7 / W2.9 / W2.10 / W2.11 / W2.13 / W2.24 — External-standards crosswalks, operational templates, incidents appendix

**Goal:** close the manifestos' external-standards alignment gaps (NIST AI RMF + GenAI Profile; ISO/IEC 42001 Annex A; COSO ERM 2017 + COBIT 2019/2023 + Three-Lines; ISO/IEC 23894 + 23053 + 31000) and produce the operational templates referenced from those crosswalks (AI risk register, risk-appetite statement, agent inventory schema, decommissioning checklist, SLO table). Add the "Incidents that motivated this manifesto" appendix.

**Files produced:**

- `regulatory/nist-ai-rmf-crosswalk.md` (W2.9) — full subcategory mapping across GV/MP/MS/MG; closes Map "context of use" gap with a stakeholder & impacted-population register; closes Measure gap with a TEVV / red-teaming / adversarial-testing portfolio; adopts NIST AI 600-1 GenAI risk vocabulary (G1–G12: confabulation, CBRN, dangerous-violent, IP, obscene, value-chain, etc.).
- `regulatory/iso-42001-crosswalk.md` (W2.10) — Clauses 4–10 high-level mapping + Annex A.2–A.10 detail; provides three new templates: AI Impact Assessment (A.5), Provider/Deployer/User RACI (A.9), AI supplier register (A.10) extending the foundation-model register.
- `regulatory/coso-cobit-crosswalk.md` (W2.11) — one-page COSO ERM 2017 (5×20 principles) + one-page COBIT 2019/2023 (40 objectives, emphasis APO12 / APO14 / DSS04 + AI design factors); Three-Lines operationalisation with 2nd-line challenge log template and 3rd-line audit working-paper template, both mapped to IGM authorities and AEnt-M consequence-class accountability.
- `regulatory/iso-23894-23053-crosswalk.md` (W2.13) — ISO 31000 / 23894 process mapping; treatment-vocabulary crosswalk (AEnt-M Block / Escalate / Restrict / Advisory / Continue ↔ ISO 31000 Avoid / Modify / Share / Retain); ISO 23053 vocabulary mapping (AI actors, lifecycle stages, ML pipeline) to manifesto terms; worked AI risk register example for FS settlement-penalty agent with foundation-model dependency (10 risks).
- `regulatory/incidents-appendix.md` (W2.24) — 11 named events with date, summary, what failed, manifesto principle that would have addressed it, FS severity: Slack-AI exfiltration (Aug 2024); DocGo SDNY AI-washing (Mar 2025); Italy DPA OpenAI €15M (Dec 2024 / annulled Mar 2026); Massachusetts AG Earnest $2.5M (Jul 2025); Pennsylvania AG Home365 (May 2025); CSA "Autonomous but Not Controlled" (Apr 2026); Nemotron-AIQ cascading-failure pattern; Article 22 enforcement pattern; foundation-model deprecation pattern; Italy DPA Replika / ChatGPT (2023); contract-flow-down failure pattern.
- `operational-templates/ai-risk-register.md` + `operational-templates/ai-risk-register.json` (W2.7) — schema + worked examples (10 system-level rows for `csdr-penalty-agent-001` + 5 enterprise-level rows including shadow-agent estate, AI-washing, foundation-model concentration).
- `operational-templates/risk-appetite-statement.md` (W2.7) — board-level template with quantitative thresholds by category and consequence class, qualitative narrative on what board accepts vs rejects vs reserves judgment, operationalisation. Marked DRAFT — board approval required throughout.
- `operational-templates/agent-inventory-schema.md` + `.json` (W2.7) — discovery + registration schema with composite-state-hash mechanism; references CSA 2026 82%-unknown-agents finding; specifies discovery procedure (self-registration, automated scan, registration gate), continuous reconciliation, and discovery & inventory metrics.
- `operational-templates/decommissioning-checklist.md` (W2.7) — Phase 1–4 agent decommissioning + Phase 1–3 claim retirement; references CSA 2026 only-21%-formal-decommissioning finding; designed to dovetail with `integration/decommissioning.md` (already produced; cross-link at adoption).
- `operational-templates/slo-table.md` (W2.7) — 36 SLO rows covering feedback-loop closure, claim revalidation by decay class, contradiction resolution (with material-contradiction sub-row per W1.10 precedence), composite-state acceptance (with default-reject behavior per AEnt-M P9), incident reporting to regulator (EU AI Act Art 73 2-day / 15-day; DORA 4h / 72h / 1-month; GDPR 72h / Art 34), incident reporting internal, waiver expiry, initiative authorisation review, discovery & inventory, stakeholder-rights handling. Each row has a named accountable role and breach handler.

**Cross-references applied repo-wide:**

- "Epistemic tier" used consistently for IGM scalar substrate-level meaning.
- All consequential authorial / regulatory decisions are DRAFT-tagged with explicit "author review needed" or "board approval required" notes.
- Cross-references kept consistent: every artefact points to `regulatory/eu-ai-act-addendum.md` (W1.5), `regulatory/foundation-model-third-party-register.md` (W1.6, currently at the `regulatory/` path per earlier swarm — note the path-reconciliation flag from the cross-cutting batch), `governance/evidence-bundle-schema.md` (W1.7), `governance/authority-accountability-matrix.md` (W1.4), and `glossary.md` term-collision appendix (W2.1).

**Open items / DRAFT flags:**

- All quantitative thresholds (SLOs, risk-appetite numbers, TEVV cadences, review cadences) are illustrative starting values; institution-specific calibration required before adoption.
- Regulatory citations verified via WebSearch (Slack-AI Aug 2024; DocGo Mar 2025; Italy DPA Dec 2024 + Mar 2026 annulment; MA AG Jul 2025; PA AG May 2025; CSA Apr 2026); institutions republishing the appendix should re-verify against current public records.
- The agent inventory schema's composite-state-hash mechanism is unspecified at the cryptographic level; security architecture decision required.
- Italy DPA OpenAI fine annulment by Court of Rome (18 Mar 2026) is noted in the incidents appendix; the underlying findings remain instructive even though the fine itself was vacated.
- Cross-link verification needed once W1.6 path is canonicalised (regulatory/ vs governance/).
