# Integrated Audit Trail

**Status:** Normative cross-framework artefact (Wave 2, item W2.16; overlaps with W1.7).
**Audience:** Internal audit (3rd line); regulatory examiners (EU AI Act, DORA, GDPR, FS supervisory authorities); external auditors.
**Purpose:** Specify how three partially-overlapping audit trails — AEM's execution trace, IGM's provenance chain (per claim cited), AEnt-M's traceability chain (regulatory source → claim → contradiction → human approval → composite-state) — compose into a single integrated trail. Resolve B7 from the coherence review: a regulator's "show me the audit trail" request must resolve to a single evidence bundle with the three trails interleaved.

**Glossary note.** "Epistemic tier" replaces IGM's "confidence" throughout. See `glossary.md` (repo root) for the term-collision appendix.

---

## 1. The three trails

### 1.1 AEM execution trace

Source: AEM P9 (`manifesto-principles.md:496–532`) + AEM Definition of Done (`manifesto-done.md`).

The AEM execution trace records:

- The full chain from specification → design → plan → execute → verify → validate → observe → learn → govern.
- Per agent action: tool calls, decisions, evaluation results, rollbacks, near-misses.
- Trace IDs that link each action to its specification, evidence bundle, control state record.
- Reasoning traces that answer "why did this happen?" (not just "that this happened").
- Governance-state observability signals: stale evidence, control state, accountability ownership gaps, rubber-stamping patterns, model/prompt/tool manifest changes.

**Identifier:** `aem_components.trace_ids` (per `governance/evidence_bundle.schema.json`). OpenTelemetry-compatible.

**Replayable from:** trace ID + agentic provenance record (`aem_components.agentic_provenance_record`) + tool manifest + composite state.

### 1.2 IGM provenance chain (per claim)

Source: IGM P2, P3, P5, P11 (`intelligence-governance-manifesto/manifesto-principles.md:29–46, 61–66, 125–131`) + claim model (`intelligence-governance-manifesto/companion-guide.md:9–69`).

Per claim, the IGM provenance chain records:

- Source (document, expert interview, operational observation, graph inference).
- Acquisition mode (Harvest / Extract / Capture / Emerge).
- Date of acquisition; social challenge process (where material).
- Epistemic-tier movements: when the claim was promoted/demoted, by which authority.
- Corroboration history: which independent sources, when validated.
- Decay state: validity window, last revalidation, projected staleness.
- Contradiction status: whether contradictions have been raised, typed, and resolved.
- Dependencies: which other claims this one rests on; cascade traces if dependencies changed.
- Provenance-integrity hash for the chain.

**Identifier:** `igm_components.provenance_chain[claim_id]` (per `governance/evidence_bundle.schema.json`). Each claim cited by the action has its own chain.

**Replayable from:** `claim_id` + `provenance_hash` + traversal of IGM L2/L3 governance graph at the recorded timestamps.

### 1.3 AEnt-M traceability chain

Source: AEnt-M Worked example (`agentic-enterprise-manifesto/manifesto.md:159`) + P12 + `companion-guide.md` lifecycle interactions.

The AEnt-M traceability chain records:

- The regulatory source(s) that authorise or constrain the action (EU AI Act article, DORA pillar, ESMA RTS, etc.).
- The claims derived from each regulatory source, with their epistemic tier at action time.
- Contradictions detected and how they were classified and handled.
- The named human(s) who approved at each consequence-class signoff point.
- The composite-state hash at action time (application code + system prompt + foundation model + knowledge base + memory state).
- The intelligence lifecycle, agent lifecycle, and delivery lifecycle events that bracketed the action (cross-lifecycle cascades).

**Identifier:** `aentm_components.regulatory_source_chain` + `aentm_components.named_human_signoffs` + `aentm_components.composite_state_hash_at_action` + `aentm_components.composite_state_components`.

**Replayable from:** the regulatory citations + the substrate state at action time (linked back to IGM provenance) + the composite state record (linked forward to the agent product version).

---

## 2. Composition into a single bundle

The three trails are not parallel records. They compose **vertically** through a single evidence bundle (per `governance/evidence-bundle-schema.md` and `governance/evidence_bundle.schema.json`):

```
Evidence bundle (one per release / one per high-consequence action)
├── bundle_metadata
│   └── trace_ids → AEM execution trace (Trail 1)
├── aem_components
│   ├── evaluation_reports
│   ├── trace_ids
│   ├── diffs, deployment_ids, rollback_plan
│   ├── policy_check_outputs
│   ├── memory_updates
│   ├── control_state_record
│   ├── agentic_provenance_record
│   ├── bundle_integrity_attestation
│   └── ...
├── igm_components
│   ├── intelligence_claims_snapshot         ← citations from this action
│   ├── provenance_chain[claim_id]            ← Trail 2 (one chain per cited claim)
│   ├── contradiction_handling_decisions     ← contradictions encountered
│   ├── epistemic_tier_movements
│   ├── decay_state_attestation
│   └── four_authorities_state
├── aentm_components
│   ├── consequence_class
│   ├── action_class_id
│   ├── relocation_stage_at_action
│   ├── response_class_at_runtime
│   ├── composite_state_hash_at_action       ← Trail 3 anchor
│   ├── composite_state_components
│   ├── regulatory_source_chain               ← Trail 3 source side
│   ├── named_human_signoffs                  ← Trail 3 human side
│   ├── initiative_authorisation_record
│   ├── epistemic_circuit_breaker_state
│   └── aem_loop_readiness_attestation
└── cross_references
    ├── external_artefact_links
    ├── incident_links
    ├── waiver_links
    └── register_links (foundation-model third-party register)
```

The three trails are linked through three index keys:

| Index | Used by | Links | Resolution |
|---|---|---|---|
| `trace_id` | AEM execution trace | trace_id ↔ specification ↔ action ↔ evidence record | Returns the full reasoning chain for an action |
| `claim_id` | IGM provenance chain | claim_id ↔ provenance_chain ↔ source_document | Returns the lineage of a single claim |
| `composite_state_hash_at_action` | AEnt-M traceability chain | hash ↔ composite_state_components ↔ knowledge_base_snapshot ↔ memory_state_snapshot | Returns the agent product's behavioural identity at action time |

A regulator-grade audit query touches all three indexes. The unified bundle stores all three so a single query traverses one artefact.

---

## 3. Worked regulator walkthrough

**Setting.** A European regulator (BaFin) examines an enforcement complaint against the European custodian whose Tier 4 envelope was the worked example in `governance/governance-integration-note.md` §3. The complaint alleges that on 14 March 2026, an automated CSDR penalty filing for client #4839 produced an incorrect penalty assessment under the post-Brexit UK CREST regime. The custodian's defence rests on the audit trail.

The regulator says: **"Show me the audit trail for the action."**

What the custodian produces is **one evidence bundle** (per `governance/evidence_bundle.schema.json`), retrieved from the bundle store by action ID. The bundle's three sections interleave to answer the regulator's questions.

### 3.1 Question 1 — "What did the agent do?"

The bundle's `aem_components` answers:

- `trace_ids: ["trace-2026-03-14-actID-7c3e..."]` — replayable execution trace.
- `evaluation_reports`: the policy-check outputs that ran at action time, including `csdr-cross-border-jurisdictional-check` (status: pass) and `cspr-penalty-rate-currency-check` (status: pass).
- `agentic_provenance_record`: foundation model `model-XYZ-v3.2.1`, system prompt hash, tool manifest with `csdr-rate-lookup-tool@v2.4.0`, retrieval corpus version `intelligence-graph-v2026.03.10`, etc.
- `diffs`: empty (this was a runtime action; no code change).
- `deployment_ids`: the deployment of the agent product the action ran under.
- `control_state_record`: every required control passed at action time.

The regulator can replay the full reasoning chain from `trace_ids[0]`. The trace shows: input received (settlement-fail event for client #4839, instrument-type, currency, jurisdiction); claims retrieved from the substrate (cited by `claim_id`); intermediate reasoning steps; final penalty calculation; output recorded.

### 3.2 Question 2 — "On what knowledge did the agent rely?"

The bundle's `igm_components.intelligence_claims_snapshot` lists every claim cited by the action. For each, the snapshot records:

- `claim_id: "esma-csdr-art-7-2-penalty-formula-v2026"` — the EU CSDR penalty calculation rule.
- `epistemic_tier: "authoritative"` — required for regulatory-evidence consumer per IGM threshold.
- `provenance_hash: "9a3c..."`.
- `source_type: "regulatory-statute"`; `acquisition_mode: "extract"`.
- `scope: { jurisdiction: "EU", entity: "csd", process: "settlement-penalty-calculation", system: "TARGET2-Securities" }`.
- `contradiction_status: { active: true, type: "jurisdictional", counter_claim_id: "uk-crest-csdr-divergence-v2026" }` — *the UK divergence is a preserved jurisdictional contradiction, not a logical contradiction; both claims are valid within their scope per IGM P4*.
- `decay_window_remaining_days: 89`; `projected_stale_at_deploy: false`.
- `governance_status: "regulatory-evidence"`.

For each `claim_id`, `igm_components.provenance_chain[claim_id]` provides the full chain: source document (EU Regulation 909/2014, Article 7(2), v2024 amendment) → extraction (date, by whom, evidence artefact) → validation (domain expert review record) → promotion to Authoritative (date, by which authority, corroborating sources cited) → most recent revalidation (date, decay window).

The regulator sees that the agent reasoned over an Authoritative-tier claim with a jurisdictional divergence preserved. **The regulator's enforcement question becomes: did the agent correctly apply the EU rule to an EU action, or did it misapply it to a UK case?**

### 3.3 Question 3 — "Why is the EU rule the correct one for this client?"

The bundle's `aentm_components.regulatory_source_chain` answers:

- `regulatory_source_id: "eu-reg-909-2014-art-7-2"`; `citation: "Regulation (EU) No 909/2014 of the European Parliament and of the Council, Article 7(2)"`; `version: "consolidated 2024-08"`.
- `claim_ids_derived_from_source: ["esma-csdr-art-7-2-penalty-formula-v2026", ...]`.
- `cascade_analysis_complete: true`; `cascade_completed_at: "2026-03-08T..."` — the full cascade after the most recent ESMA RTS amendment was complete six days before the action.

And critically — the bundle's `aentm_components.named_human_signoffs` records:

- `role: "accountable_authority"`; `human_id: "U-1129-Heinrich-S"`; `signed_at: "2026-03-14T08:42:13Z"`; `scope: "csdr-penalty-filing-eu-jurisdiction-client-class-A"`; `decision: "approve"`; `evidence_reviewed: ["claim:esma-csdr-art-7-2-penalty-formula-v2026", "claim:uk-crest-csdr-divergence-v2026 (acknowledged jurisdictional)", "scope-attestation:client-4839-jurisdiction-EU"]`.

The accountable authority — Heinrich S. — reviewed the action on 14 March before it executed. (Recall Class B in `governance/governance-integration-note.md` is at AEnt-M Stage 3 *Monitored* relocation: the action passes through synchronous review *because* a jurisdictional divergence flag was present.) The evidence reviewed includes a scope attestation that client 4839 falls in the EU jurisdiction class — meaning the EU rule applies and the UK regime is correctly excluded.

### 3.4 Question 4 — "How is client #4839 classified as EU-jurisdiction?"

The trace ID returns the upstream resolution: `trace-2026-03-14-actID-7c3e` shows that the agent retrieved claim `client-4839-jurisdiction-classification-v2026` (epistemic tier *Authoritative*; source: client-master-data record version V19; provenance chain leads back to the client onboarding documentation). The agent applied the scope-match enforcement (IGM L1 working memory control) and correctly excluded any UK-CREST claims because the client's scope did not match.

If the regulator now alleges that the client classification is wrong (e.g., the client is in fact a UK entity), the audit trail shifts to the *substrate-state* question: was the classification claim correctly maintained? The provenance chain answers: who validated, when, against what source, with what corroboration. If the substrate is correct, the agent's action is defensible. If the substrate is incorrect, the substrate-side accountability (IGM Assertion authority and Revision authority) is implicated — and AEnt-M provides a separate trail for *who is accountable for the substrate maintenance*, distinct from who is accountable for the action.

### 3.5 Question 5 — "What was the agent product's behavioural identity at action time?"

The bundle's `aentm_components.composite_state_hash_at_action` and `composite_state_components` answer:

- `composite_state_hash_at_action: "f4b2...9e7c"`.
- `application_code_hash: "..."` (ties to a specific commit in the agent product repository).
- `system_prompt_hash: "..."` (ties to a versioned system prompt).
- `foundation_model_id: "model-XYZ"`; `foundation_model_version: "v3.2.1"`.
- `knowledge_base_snapshot_id: "intelligence-graph-snapshot-2026.03.10-v143"`.
- `knowledge_base_source_manifest_hash: "..."`.
- `memory_state_hash: "..."`.

If the model provider had auto-updated `model-XYZ` to `v3.2.2` before the action, the composite-state hash at action time would not match the manifest accepted for this action class, and AEnt-M P9's default-reject would have fired. The bundle confirms: at action time, composite state matched the accepted manifest.

The regulator can now ask: *"Show me the foundation-model third-party register entry for model-XYZ."* The bundle's `cross_references.register_links.foundation_model_third_party_register_entry_id` returns the entry ID (per `governance/foundation-model-third-party-register.md`, which is W1.6 produced by another agent). The register answers: provider, sub-processors, exit plan, CTPP designation, last-update date, change-notification handling.

### 3.6 Question 6 — "Could the agent have acted on stale information?"

The bundle's `igm_components.decay_state_attestation` answers:

- `evaluated_at: "2026-03-14T08:38:00Z"` (4 minutes before action).
- `claims_in_window: 14821`; `claims_past_window: 0` (for cited claims); `claims_within_30d_of_window: 3`.

The cited claims were within their decay windows; one claim was within 30 days of needing revalidation but had not crossed the threshold. The bundle's `aem_components.evidence_freshness_attestation` confirms: `model_eval_run_status: fresh`, `agentic_provenance_record_status: fresh`, all other freshness states fresh.

### 3.7 Question 7 — "Was there an unresolved contradiction the agent ignored?"

The bundle's `igm_components.contradiction_handling_decisions` answers:

- One contradiction relevant to this action: `{ contradiction_id: "csdr-eu-vs-uk-divergence-v2026", type: "jurisdictional", claim_a_id: "esma-csdr-art-7-2-penalty-formula-v2026", claim_b_id: "uk-crest-csdr-divergence-v2026", classification_decided_by: "U-2087-Inference-AuthA", classification_at: "2026-03-08T...", response_class: "continue-with-enhanced-monitoring", response_class_decided_by: "U-1129-Heinrich-S" }`.

The contradiction was *jurisdictional* (per IGM P4 type) — preserved, not silently overwritten. The Inference authority classified it on 8 March; the Accountable Authority decided the response class for High-consequence cross-border filings. At action time, the response class was "continue with enhanced monitoring" because the agent's scope-match (client EU jurisdiction) ensured the EU claim was correctly applied, not the UK claim.

If the agent had applied the UK rule to an EU client, that would be a scope-violation and the bundle's `aem_components.policy_check_outputs` would have fired the `csdr-cross-border-jurisdictional-check` policy with status fail. Since status is pass, the agent applied the rule consistent with scope.

### 3.8 What the regulator concludes

From a single bundle, traversing three trails interleaved through three index keys:

1. The agent did X (AEM trace).
2. On the basis of claims Y1, Y2, ..., each at the required epistemic tier with documented provenance (IGM trail).
3. Authorised by named human Z with a documented review of the regulatory source chain, scope attestation, contradiction handling, and composite-state acceptance (AEnt-M trail).

If the regulator finds the action substantively defensible, the audit closes. If they find a defect, the bundle identifies precisely which trail surfaces the defect — and the integrated audit trail enables the regulator to determine whether the defect is in execution (AEM-level), substrate (IGM-level), or governance accountability (AEnt-M-level).

This is what "show me the audit trail" must resolve to: **one bundle, three interleaved trails, three index keys, traversable in seconds**.

---

## 4. Operational requirements

To produce integrated audit trails at the quality the worked walkthrough demonstrates, the operating environment must support:

1. **Bundle assembly at action time.** The bundle is assembled by the Evidence Bundle Agent at action completion (per `asdlc/release-governance.md`). For high-consequence actions inside a Tier 4 envelope, a per-action bundle may be required — not a per-release bundle. (For low-consequence actions, per-release bundles with action-class aggregation suffice.)
2. **Citation tracking at runtime.** Every claim retrieved during the action's reasoning must be logged with its `claim_id` and the epistemic tier *at retrieval time*. Late substrate changes do not retroactively change the citation record.
3. **Composite-state hash at action time.** The hash is computed at action start; if the system detects a hash mismatch during action execution, the action halts (per AEnt-M P9 default-reject).
4. **Authority signoff capture.** Synchronous signoffs are captured as structured records (per the `named_human_signoffs` schema). Post-hoc audit-sample signoffs are linked back to the original action's bundle within the SLO defined in `governance/authority-accountability-matrix.md` row E3.
5. **Bundle integrity.** The bundle's `bundle_hash` and `bundle_signature` are computed at assembly. Any post-assembly modification invalidates the integrity attestation.
6. **Bundle retrieval.** Bundles must be retrievable by `bundle_id`, by action ID (via trace_id linking), by claim_id (via citation index), and by composite-state-hash (via behavioural-identity index). Three retrieval paths, one storage location.
7. **Cross-bundle consistency.** When a substrate event (e.g., claim demotion) cascades to past actions, the cascading-event record links forward to every bundle that cited the affected claim. The integrated audit trail must be navigable in both directions: from action to substrate state, and from substrate event to all affected actions.

---

## 5. Cross-references

- `governance/evidence-bundle-schema.md` — the full bundle schema with required-by-tier matrix.
- `governance/evidence_bundle.schema.json` — JSON Schema document.
- `governance/governance-integration-note.md` — the worked example referenced by the walkthrough.
- `governance/authority-accountability-matrix.md` — who decides at each integration point.
- `governance/composition-rule.md` — the gate evaluations recorded in the bundle.
- `governance/foundation-model-third-party-register.md` (planned, W1.6) — DORA Pillar 4 register linked from `cross_references.register_links`.
- `manifesto-principles.md:496–532` (AEM P9) — Trail 1 source.
- `intelligence-governance-manifesto/manifesto-principles.md:29–46, 125–131` (IGM P2, P11) — Trail 2 source.
- `agentic-enterprise-manifesto/manifesto.md:159` — AEnt-M Trail 3 worked example.
- `glossary.md` (repo root) — term-collision appendix.

---

## 6. DRAFT items needing author judgment

- **DRAFT — author review needed:** the worked-example client number, dates, model versions, and personnel identifiers are illustrative. Confirm with regulatory reviewer whether the walkthrough should use real EU regulation citations (which it does — Reg 909/2014, Art 7(2) is genuine) and whether ESMA/CSD specifics need elaboration. The structure of the walkthrough is the load-bearing content.
- **DRAFT — author review needed:** the per-action vs per-release bundle policy in §4 item 1 ("for high-consequence actions inside a Tier 4 envelope, a per-action bundle may be required") is opinionated. Some regulators may accept per-release bundles with action-class aggregation for high-consequence; others require per-action. Confirm with regulatory reviewer.
- **DRAFT — author review needed:** §4 item 7 (cross-bundle consistency for cascading substrate events) implies a substrate-event-to-bundle index that may not exist in early implementations. State whether this is mandatory or aspirational at each adoption phase.
