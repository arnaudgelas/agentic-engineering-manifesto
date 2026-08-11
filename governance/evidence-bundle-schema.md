# Unified Evidence Bundle Schema

**Status:** Normative cross-framework artefact (Wave 1, items W1.7 + W1.9).
**Audience:** ASDLC release managers, APLC product owners, IGM revision authorities, AEnt-M consequence-class roles, regulators, internal audit.
**Purpose:** Define the single, unified evidence-bundle artefact that satisfies AEM Definition-of-Done, IGM provenance, AEnt-M traceability, ASDLC release-gate Condition 1, and APLC composite-state-manifest requirements simultaneously. Replaces the three partially-overlapping schemas previously implied by AEM, IGM, and AEnt-M. Companion JSON Schema: `governance/evidence_bundle.schema.json`.

**Glossary note.** Throughout: "epistemic tier" replaces IGM's "confidence" (Provisional, Candidate, Confirmed, High Confidence, Authoritative). The renamed term frees "confidence" for AEM's verification meaning ("did we build it right?"). See `glossary.md` (repo root) for the term-collision appendix.

---

## 1. Why one bundle

The coherence review (`igm-aent-coherence-review.md` §3 B7, B9) found that:

- AEM's evidence bundle (`manifesto-done.md`, [`manifesto/manifesto-principles-01.md#1-outcomes-are-the-unit-of-work`](../manifesto/manifesto-principles-01.md#1-outcomes-are-the-unit-of-work), "Evidence means") lists evaluation reports, trace IDs, diffs, deployment IDs, rollback plans, policy-check outputs, memory updates, control state record.
- IGM provenance ([`intelligence-governance-manifesto/manifesto-principles.md#principle-2-provenance-is-non-negotiable`](../intelligence-governance-manifesto/manifesto-principles.md#principle-2-provenance-is-non-negotiable) for source type / acquisition mode / social challenge process; [`#principle-3-epistemic-tier-is-earned-not-assigned`](../intelligence-governance-manifesto/manifesto-principles.md#principle-3-epistemic-tier-is-earned-not-assigned) for epistemic tier; [`#principle-5-intelligence-decays-govern-the-decay`](../intelligence-governance-manifesto/manifesto-principles.md#principle-5-intelligence-decays-govern-the-decay) for decay window) lists source type, acquisition mode, social challenge process, epistemic tier, decay window — per claim.
- AEnt-M traceability (`agentic-enterprise-manifesto/manifesto.md:159`) lists regulatory source → claim → contradiction → human approval → composite-state.

A bundle complete by any one definition can fail the others. A regulator asking for "the audit trail" should receive *one* artefact, not three. This schema defines that artefact.

---

## 2. Bundle structure

A unified evidence bundle is a single, integrity-protected, structured artefact (machine-readable; recommended: JSON conforming to `evidence_bundle.schema.json`) with five top-level sections:

```
evidence_bundle/
├── bundle_metadata        (versioning, integrity, signatures)
├── aem_components         (AEM Definition-of-Done components)
├── igm_components         (IGM provenance + epistemic-tier records)
├── aentm_components       (AEnt-M consequence-class + composite-state + traceability)
└── cross_references       (links to artefacts external to the bundle)
```

The bundle is required-by-tier (autonomy tier × consequence class). Section 5 below specifies which fields are mandatory for each combination.

---

## 3. Field specification

### 3.1 `bundle_metadata`

| Field | Type | Required | Description |
|---|---|---|---|
| `bundle_id` | string (UUID) | always | Unique identifier for this bundle. |
| `schema_version` | string (semver) | always | Version of `evidence_bundle.schema.json` against which this bundle validates. |
| `created_at` | RFC 3339 timestamp | always | When the bundle was assembled. |
| `system_under_release` | object | always | `{system_id, system_name, version, autonomy_tier, envelope_id (if Tier 4)}`. |
| `consequence_class` | enum | always | One of `low`, `medium`, `high`, `critical`. |
| `bundle_hash` | string (hex SHA-256) | always | Cryptographic hash of the entire bundle (excluding `bundle_hash`, `bundle_signature`, and `signatures` themselves). |
| `bundle_signature` | string (PKCS#7 / detached signature) | required for High/Critical | Detached digital signature over `bundle_hash` by the release system or accountable human. |
| `signatures` | array of objects | required per autonomy tier (see §5) | List of `{signatory_role, signatory_name, signed_at, signature, scope}` records. |

### 3.2 `aem_components` — AEM Definition-of-Done

Required components (per [`manifesto/manifesto-principles-01.md#1-outcomes-are-the-unit-of-work`](../manifesto/manifesto-principles-01.md#1-outcomes-are-the-unit-of-work) "Evidence means", `manifesto-done.md`, and `asdlc/release-governance.md`):

| Field | Type | Required | Description |
|---|---|---|---|
| `evaluation_reports` | array | always | Each entry: `{eval_id, eval_suite_version, ran_at, pass_count, fail_count, regression_pass_count, adversarial_pass_count, holdout_pass_count, metrics{...}, trace_id, status (pass/fail/waived)}`. |
| `trace_ids` | array of strings | always | OpenTelemetry-compatible trace IDs spanning specification → execution → output. Guarantee event reconstruction (replay level 1, per [`manifesto/manifesto-principles-09.md`](../manifesto/manifesto-principles-09.md)) on their own; they support deterministic simulation (level 2) only where `agentic_provenance_record` also pins the tool-response fixtures and model checkpoint used. They do not guarantee live re-execution (level 3) or counterfactual reproduction (level 4) — both are defeated by service or model changes since the run, and by model nondeterminism. Do not describe `trace_ids` as "replayable" without stating which level. |
| `diffs` | array | always | Each entry: `{diff_id, repo, base_ref, head_ref, summary, files_changed_count, lines_added, lines_removed, links}`. |
| `deployment_ids` | array | required at release | Each entry: `{deployment_id, environment, deployed_at, deployed_by, system_version, foundation_model_version, status}`. |
| `rollback_plan` | object | always | `{rollback_id, plan_summary, last_tested_at, last_test_status, mean_rollback_time_seconds, executor_role}`. |
| `policy_check_outputs` | array | always | Each entry: `{policy_id, policy_version, status (pass/fail/waived), evidence_artefact_id, ran_at}`. |
| `memory_updates` | array | required when memory is in scope | Each entry: `{memory_store_id, change_summary, provenance_label (per AEM P6), reviewer_role, reviewed_at}`. |
| `control_state_record` | object | required at release for Tier 2+ | Per `asdlc/release-governance.md` — `{controls[{control_id, status (pass/fail/waived/stale/requires-human-decision), evidence_artefact_id, waiver_owner?, waiver_expiry?, compensating_control?}], generated_at, generator_role}`. |
| `agentic_provenance_record` | object | required when foundation model present | Per `manifesto-done.md:147–186` — `{foundation_model_id, foundation_model_version, provider_category, deployment_mode, eval_model_parity (bool), system_prompt_hash, tool_manifest[], memory_state_version, retrieval_corpus_version, embedding_model_version, dataset_lineage, policy_constraints_active[]}`. |
| `orchestration_topology_manifest` | object | always | Per [`manifesto/manifesto-principles-03.md`](../manifesto/manifesto-principles-03.md) — the typed, versioned orchestration topology bound into harness identity: `{topology_id, topology_version, topology_hash, nodes[{node_id, node_type (agent/tool/human-gate/evaluator)}], edges[{edge_id, from_node, to_node, edge_type, routing_predicate}], state_schema_ref, retry_idempotency_policy[{edge_id, retry_policy, idempotency_key_scope}], failure_compensation_handling[{failure_mode, compensation_action}], human_gates[{gate_id, node_id, trigger_condition}], evaluator_hooks[{hook_id, node_id, gates}], allowed_mutation_scope[{node_id, scope}]}`. A change to any listed element changes `topology_hash` and invalidates the harness identity it is bound into. |
| `bundle_integrity_attestation` | object | required at release | `{hash_algorithm, hash_value, signature_algorithm?, signature_value?, signed_by, signed_at}`. |
| `epistemic_tier_labels` | array | required at release for Tier 2+ | Per artefact in the bundle: `{artefact_id, label}` where label ∈ {`human-authored`, `tool-generated`, `agent-proposed-with-human-review`, `agent-generated`}. (Note: this is AEM's "epistemic tier label" for *artefact origin*. It is distinct from IGM's "epistemic tier" for *claim confidence*; both terms appear because AEM's `release-governance.md:189` uses "epistemic tier" for artefact origin labels. The two senses are namespaced: `epistemic_tier_labels` for AEM artefact origin, `epistemic_tier` for IGM claim tier.) |
| `evidence_freshness_attestation` | object | always | `{threat_model_status, sbom_status, security_static_analysis_status, cost_forecast_status, runbook_status, dpia_status, model_eval_run_status, rollback_test_status, agentic_provenance_record_status}` — each ∈ {`fresh`, `stale`, `projected-stale`, `n/a`}. Per `manifesto-done.md:211–253`. |
| `dpia` | object | required when personal data in scope | Reference to current Data Protection Impact Assessment. |
| `sbom` | object | required for any deployed code | `{sbom_id, generated_at, dependency_count, format (CycloneDX/SPDX)}`. |
| `threat_model` | object | required pre-Tier 1 production deployment | `{threat_model_id, version, last_reviewed_at, attack_surface_summary}`. |

### 3.3 `igm_components` — Intelligence governance evidence

Required components (per IGM principles 1–5, 11; `intelligence-governance-manifesto/manifesto-principles.md`):

| Field | Type | Required | Description |
|---|---|---|---|
| `intelligence_claims_snapshot` | array of objects | required when agent reasons over governed substrate | Each entry: `{claim_id, claim_assertion, claim_type (regulatory/operational/technical/domain-mechanical/external-intelligence), epistemic_tier (provisional/candidate/confirmed/high-confidence/authoritative), provenance_hash, source_type, acquisition_mode (harvest/extract/capture/emerge), scope{jurisdiction, entity, process, system, temporal}, contradiction_status{active (bool), type (logical/jurisdictional/temporal/scope/extraction), counter_claim_id?}, decay_window_remaining_days, projected_stale_at_deploy (bool), governance_status (searchable/recommendable/reasoning-eligible/action-eligible/regulatory-evidence), expert_dependent (bool), dependencies[claim_id]}`. |
| `feedback_observations` | array | required when AEM P10 + IGM P10 are in scope | Each entry: `{observation_id, originating_engagement, claim_id_referenced, observation_type (gap/contradiction/decay/operational-correction), routed_to_ingest_at, status, accepting_authority}`. |
| `contradiction_handling_decisions` | array | required when contradictions present in cited claims | Each entry: `{contradiction_id, type, claim_a_id, claim_b_id, classification_decided_by (inference_authority_id), classification_at, response_class (block/escalate/restrict/advisory/continue), response_class_decided_by, action_taken_id?}`. |
| `provenance_chain` | object | required at release for any cited claim | `{claim_id → [{step_type (source / extraction / validation / promotion / corroboration / supersession / retirement), at, by_authority, evidence_artefact_id, social_challenge_record?}]}`. |
| `epistemic_tier_movements` | array | recommended | History of tier changes for cited claims since the last bundle of the same system. |
| `decay_state_attestation` | object | required at release | `{evaluated_at, claims_in_window, claims_past_window, claims_within_30d_of_window, staleness_metrics_per_domain}`. |
| `four_authorities_state` | object | required at release for Tier 2+ | `{semantic_authority_id, semantic_alternate_id, assertion_authority_id, assertion_alternate_id, inference_authority_id, inference_alternate_id, revision_authority_id, revision_alternate_id, last_review_at}` — per W2.21 succession requirement. |

### 3.4 `aentm_components` — Agentic Enterprise traceability

Required components (per AEnt-M P7, P8, P9, P11, P12; `agentic-enterprise-manifesto/manifesto.md`, `companion-guide.md`):

| Field | Type | Required | Description |
|---|---|---|---|
| `consequence_class` | enum | always | `low`, `medium`, `high`, `critical`. |
| `action_class_id` | string | always | The named AEnt-M action class this bundle's actions belong to. |
| `relocation_stage_at_action` | enum | required when system is in Tier 4 envelope | `full-synchronous`, `parallel-run`, `monitored-relocation`, `operational-relocation` (per `agentic-enterprise-manifesto/companion-guide.md:96–101`). |
| `response_class_at_runtime` | enum | required when epistemic circuit breaker is configured | `block`, `escalate`, `restrict-scope`, `advisory-only`, `continue-with-enhanced-monitoring` (per AEnt-M P11). |
| `composite_state_hash_at_action` | string | always for APLC products | Per APLC composite-state hash — `hash(application_code_hash, system_prompt_hash, foundation_model_id+version, knowledge_base_snapshot_id, memory_state_hash)`. |
| `composite_state_components` | object | always for APLC products | `{application_code_hash, system_prompt_hash, foundation_model_id, foundation_model_version, knowledge_base_snapshot_id, knowledge_base_source_manifest_hash, memory_state_hash}`. |
| `regulatory_source_chain` | array | required for any High/Critical action in a regulated workflow | Each entry: `{regulatory_source_id, source_type (statute/delegated-act/RTS/ITS/guideline/standard/industry-code), citation, version, claim_ids_derived_from_source[], cascade_analysis_complete (bool), cascade_completed_at?}`. |
| `named_human_signoffs` | array | always | Each entry: `{role (workflow_owner/decision_reviewer/accountable_authority/dual_authority_a/dual_authority_b/governance_authority), human_id, signed_at, scope, decision (approve/reject/defer), rationale, evidence_reviewed[]}`. |
| `initiative_authorisation_record` | object | required when the action originated from agent initiative | Per W1.11 — `{initiative_gate_id, three_conditions{substrate_depth_attestation, constraint_legibility_attestation, governance_relocation_attestation}, accountability_anchor_signatures[], gate_decision (authorised/withdrawn), valid_until, last_quarterly_review_at}`. |
| `epistemic_circuit_breaker_state` | object | required when configured | `{breaker_id, threshold_definition, last_activation_at?, activation_count_30d, activation_response_class[]}`. |
| `aem_loop_readiness_attestation` | object | required when action originated from agent-surfaced opportunity | Per W1.8 / B8 — confirms the opportunity passed the same 9-condition AEM loop-readiness gate as a human-authored specification. |

### 3.5 `cross_references`

| Field | Type | Required | Description |
|---|---|---|---|
| `external_artefact_links` | array | always | Each entry: `{artefact_id, artefact_type, location_uri, integrity_hash}`. |
| `predecessor_bundle_id` | string | recommended | If this bundle supersedes an earlier one for the same system, the link. |
| `successor_bundle_id` | string | filled by future bundle | Bidirectional supersession traceability. |
| `incident_links` | array | required if any related incident | Each entry: `{incident_id, incident_class (quality/behavioral/safety/persona/adversarial/regulatory-art-73/dora-pillar-2), severity, related_to_this_bundle_via}`. |
| `waiver_links` | array | required if any related waiver | Each entry: `{waiver_id, condition_waived, waiver_owner, expiry, status}`. |
| `register_links` | object | required for foundation-model components | `{foundation_model_third_party_register_entry_id, ctpp_designation (bool), exit_plan_link}` — per `governance/foundation-model-third-party-register.md`. |

---

## 4. Bundle integrity

- The bundle MUST be assembled at loop completion, not post-hoc.
- The bundle's `bundle_hash` MUST be computed *after* all content is finalised.
- For releases at Tier 2+ or for any High/Critical action class, a detached digital signature in `bundle_signature` is required, with the signing key controlled by the release system or the named accountable human.
- Any post-assembly change to the bundle invalidates `bundle_hash`. A bundle with mismatched hash MUST be rejected at the release gate (per `asdlc/release-governance.md` Condition 1).
- Retention: per the operational lifetime of the system; for EU AI Act high-risk systems, ten years post market placement (per APLC Stage 7).

---

## 5. Required-by-tier matrix

The matrix below specifies which top-level components and fields are mandatory for each combination of AEM autonomy tier × AEnt-M consequence class. Cells use:

- `M` — mandatory (bundle invalid if absent or empty).
- `R` — recommended (auditor's expectation; absence requires structured rationale in `cross_references`).
- `–` — not required.

| Component | T1×Low | T1×Med | T1×High | T1×Crit | T2×Low | T2×Med | T2×High | T2×Crit | T3×Low | T3×Med | T3×High | T3×Crit | T4×Low | T4×Med | T4×High | T4×Crit |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `bundle_metadata.signatures` | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| `bundle_signature` (detached) | – | R | M | M | – | R | M | M | R | M | M | M | M | M | M | M |
| **AEM components** | | | | | | | | | | | | | | | | |
| `evaluation_reports` | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| `trace_ids` | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| `diffs` | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| `deployment_ids` | – | – | – | – | M | M | M | M | M | M | M | M | M | M | M | M |
| `rollback_plan` | R | R | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| `policy_check_outputs` | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| `memory_updates` (when memory in scope) | R | R | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| `control_state_record` | – | – | R | R | M | M | M | M | M | M | M | M | M | M | M | M |
| `agentic_provenance_record` (when FM in use) | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| `orchestration_topology_manifest` | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| `bundle_integrity_attestation` | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| `epistemic_tier_labels` (artefact origin) | – | – | R | R | M | M | M | M | M | M | M | M | M | M | M | M |
| `evidence_freshness_attestation` | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| `dpia` (when personal data) | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| `sbom` | – | – | R | M | M | M | M | M | M | M | M | M | M | M | M | M |
| `threat_model` | – | – | R | M | M | M | M | M | M | M | M | M | M | M | M | M |
| **IGM components** | | | | | | | | | | | | | | | | |
| `intelligence_claims_snapshot` | – | R | M | M | – | R | M | M | R | M | M | M | M | M | M | M |
| `feedback_observations` | – | R | R | R | – | R | R | R | R | R | M | M | R | R | M | M |
| `contradiction_handling_decisions` (when contradictions present) | – | M | M | M | – | M | M | M | M | M | M | M | M | M | M | M |
| `provenance_chain` (per cited claim) | – | M | M | M | – | M | M | M | M | M | M | M | M | M | M | M |
| `epistemic_tier_movements` | – | – | R | R | – | R | R | R | R | R | R | R | R | R | R | R |
| `decay_state_attestation` | – | – | M | M | – | R | M | M | R | M | M | M | M | M | M | M |
| `four_authorities_state` | – | – | R | R | – | R | M | M | R | M | M | M | M | M | M | M |
| **AEnt-M components** | | | | | | | | | | | | | | | | |
| `consequence_class` | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| `action_class_id` | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| `relocation_stage_at_action` | – | – | – | – | – | – | – | – | – | – | – | – | M | M | M | M |
| `response_class_at_runtime` (when configured) | R | M | M | M | R | M | M | M | M | M | M | M | M | M | M | M |
| `composite_state_hash_at_action` (APLC product) | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| `composite_state_components` (APLC product) | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| `regulatory_source_chain` (regulated workflow) | – | M | M | M | – | M | M | M | M | M | M | M | M | M | M | M |
| `named_human_signoffs` | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| `initiative_authorisation_record` (agent-initiative origin) | – | M | M | M | – | M | M | M | M | M | M | M | M | M | M | M |
| `epistemic_circuit_breaker_state` (when configured) | R | M | M | M | R | M | M | M | M | M | M | M | M | M | M | M |
| `aem_loop_readiness_attestation` (agent-surfaced spec) | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M | M |

**Reading the matrix.** A T3×High system at release time MUST produce a bundle with all `M`-marked fields present and non-empty. A `–` field may still be present and is encouraged to support future audit; absence is permitted. An `R` field's absence at release is permitted but generates a `requires-rationale` finding.

**Tier 4 distinction.** For T4 systems, `relocation_stage_at_action` is mandatory because per `governance/governance-integration-note.md` Rule R1, multiple action classes within a Tier 4 envelope can be at different relocation stages, and the bundle must record which stage the specific action was operating under.

**Composite-state mandatory across all rows.** APLC's CSH is required regardless of tier or consequence class because every APLC-governed action has a composite state, and absent CSH = no behavioural identity record = bundle invalid for APLC purposes.

---

## 6. Bundle production responsibilities

| Section | Producer (per `governance/authority-accountability-matrix.md`) |
|---|---|
| `bundle_metadata` | Evidence Bundle Agent + release manager |
| `aem_components` | Engineering loop output (Evidence Bundle Agent assembles control state record per `asdlc/release-governance.md:155–187`) |
| `igm_components` | Substrate-side assembly: Assertion authority + Revision authority sign the substrate-state attestation |
| `aentm_components` | Workflow Owner / Decision Reviewer / Accountable Authority / Dual Authority sign per consequence class; APLC product owner signs composite-state components |
| `cross_references` | Release manager (links); incident management for incident links; waiver owner for waiver links |

---

## 7. Validation

Every bundle MUST validate against `governance/evidence_bundle.schema.json` (JSON Schema draft-2020-12). Validation runs:

- At loop completion (Evidence Bundle Agent): pre-release internal check.
- At release-gate Condition 1 assessment (release manager): authoritative gate.
- At incident reconstruction or audit examination: regulator-facing check.

A bundle that fails schema validation fails ASDLC Release Gate Condition 1 (per `asdlc/release-governance.md`). It is not "mostly complete" — it is incomplete.

---

## 8. Cross-references

- `governance/evidence_bundle.schema.json` — the JSON Schema document.
- `governance/governance-integration-note.md` — composition rules for the three frameworks.
- `governance/authority-accountability-matrix.md` — who signs which section.
- `governance/composition-rule.md` — the MIN rule for permitted action.
- `governance/integrated-audit-trail.md` — how the bundle's three components interleave for regulator examination.
- `asdlc/release-governance.md` Condition 1 — the gate that enforces this bundle at release.
- `manifesto-done.md` Evidence Freshness — the freshness rules for AEM components.
- `manifesto/manifesto-principles-03.md` — the harness identity and orchestration topology this bundle's `agentic_provenance_record` and `orchestration_topology_manifest` fields record.
- `glossary.md` (repo root) — term-collision appendix.

---

## 9. DRAFT items needing author judgment

- **DRAFT — author review needed:** the required-by-tier matrix is an opinionated synthesis. In particular, the choice to make `intelligence_claims_snapshot` recommended (not mandatory) at T1×Low and T2×Low could be tightened. Confirm with IGM authors whether substrate citation is mandatory at T1×Low when the system reasons over governed substrate at all.
- **DRAFT — author review needed:** the dual use of "epistemic tier" — for IGM claim confidence (`epistemic_tier`) and for AEM artefact origin (`epistemic_tier_labels`) — is awkward. The schema namespaces them, but a future editorial pass should rename one. Recommended: keep IGM's "epistemic tier" (which is the substantive renaming the coherence review ordered) and rename AEM's "epistemic tier label" to "artefact-origin label" or "production-mode label".
- **DRAFT — author review needed:** `provenance_hash` in `intelligence_claims_snapshot` is referenced by name but its computation is unspecified (which fields are hashed, which algorithm). Specify in IGM W1.3 implementation guidance.
- **DRAFT — author review needed:** the bundle's retention period for non-EU-AI-Act-high-risk systems is unspecified here. Existing AEM language says "operational lifetime of the system"; APLC for high-risk systems requires ten years post market placement. Other systems should follow domain-specific retention; confirm guidance for unregulated and lightly-regulated workflows.
