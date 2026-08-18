# AEM Conformance Checklist

**Purpose.** Let a team self-assess AEM conformance from this one page plus two JSON Schemas —
without re-reading the full manifesto. Every row below is a direct restatement of a "Minimum bar"
sentence from the corresponding principle file; nothing here was added editorially.

**What you need.**
1. This page.
2. `governance/evidence_bundle.schema.json` — validate your release evidence bundle against it.
3. `operational-templates/agent-inventory-schema.json` — validate your agent inventory rows against it.

**How to use it.** For each row, answer yes/no against your system as it actually runs (not as
designed). Any "no" on a P1–P12 row is a conformance gap on that principle. Then validate your
evidence bundle and agent inventory against the two schemas — schema validation failures are
conformance gaps regardless of what you answer below, since the schemas are the machine-checkable
form of these same bars.

---

## Part 1 — Principle minimum bars (P1–P12)

| # | Principle | Minimum bar (must all be true) |
|---|---|---|
| P1 | Outcomes are the unit of work | ☐ Every "done" claim is deployed, instrumented, verified against evaluations, **and** validated against real-world outcomes — all four, not a subset. |
| P2 | Specifications are living artifacts | ☐ Every specification is versioned, reviewed, **and** revisable based on execution evidence. |
| P3 | Architecture is defense-in-depth | ☐ Every stated domain boundary is enforced at runtime with automated detection and recovery — not merely described. |
| P4 | Right-size the swarm | ☐ Shared state is typed, versioned, and reconciled, with explicit authority, atomicity, idempotency, leases/locks, conflict resolution, partial-failure recovery, replay determinism, taint propagation, retention, rollback, and garbage collection. <br>☐ **Tier containment**: no orchestrator delegates to a specialist agent at an autonomy tier higher than its own; tier elevation requires the same approval path whether requested by a human or an orchestrating agent. |
| P5 | Autonomy is a permission ceiling | ☐ An agent's decision-relevant observable evidence and causal execution history can be reconstructed at any tier. <br>☐ **Tool authorization**: no agent can invoke a tool not explicitly authorized for its operating tier (an unauthorized call is a tier violation whether or not the agent "chooses" to make it). <br>☐ **Tier 4**: the policy envelope is machine-enforced, control evaluations are passing, and governance observability is instrumented — for every Tier 4 operation, in every phase. <br>☐ **If using HOTL**: the irreversibility window for each HOTL action class has been measured and confirmed to exceed monitoring detection + notification + assessment + intervention time. <br>☐ **If using HOLL**: the per-action evidence record reconstructs accountability from logs alone, without a human witness. <br>☐ **If using EDL**: the independent validator's domain qualifications are documented and their review produces a structured record of judgment rationale. |
| P6 | Knowledge and memory are distinct infrastructure | ☐ Memory can expire, be rolled back, and shows provenance. <br>☐ Memory is revalidated against current architecture and process before reuse. |
| P7 | Context is engineered like code | ☐ Retrieval latency does not exceed what the reasoning loop tolerates. <br>☐ Context is verified — not just timed — against stale embeddings, conflicting sources, semantic precision failures, poisoned retrieval artifacts, and authority-weighting errors. |
| P8 | Evaluations are the contract | ☐ Evaluations include regression cases. <br>☐ **Verifier independence**, tested against all six conditions: (1) promotion runs through a hermetic executor the agent cannot invoke, configure, or write to; (2) test/holdout definitions carry immutable, versioned, content-addressed provenance; (3) holdout scenarios sit where the agent has neither read nor write access; (4) evaluator/judge model, prompt, and config versions are recorded in the release identity; (5) the evaluation harness runs under least-privilege credentials distinct from and not escalatable by the agent; (6) the suite includes meta-tests that detect and fail the build on evaluator-bypass attempts. |
| P9 | Observability and interoperability | ☐ "Why did this happen" is answerable from traces alone. <br>☐ Tools can be swapped or replayed across runtimes without rewriting core workflows. |
| P10 | Assume emergence; engineer containment | ☐ The system has been chaos-tested: tool outages, noisy retrieval, adversarial inputs. <br>☐ The system has been security-tested: prompt injection, privilege escalation, and exfiltration vectors threat-modeled **and actually run** for the specific agent topology, not merely named. |
| P11 | Optimize the economics of intelligence | ☐ Every cost-per-task, overspend, or "validated" cost-model claim states its units, task population, and observation window before being acted on. |
| P12 | Accountability requires visibility | ☐ A named human can inspect the reasoning, review the evidence, and own the outcome of every production agent. <br>☐ **Oversight adequacy**: for each oversight pattern in use, you can report the metric that indicates it is delivering genuine governance — override rate (HITL), false-negative rate (HOTL), compliance audit currency (HOLL), expert qualification currency (EDL). |

Conformance requires every applicable box checked. Boxes marked "if using X" apply only when that
autonomy/oversight pattern is in scope for the system under assessment; otherwise skip them.

---

## Part 2 — Evidence bundle: validate against `governance/evidence_bundle.schema.json`

Every release evidence bundle must pass schema validation. In addition to the schema's own
`required` fields, confirm:

- ☐ `bundle_metadata` is present with `bundle_id`, `schema_version`, `created_at`,
  `system_under_release` (including `autonomy_tier`), `consequence_class`, `bundle_hash`, and at
  least one entry in `signatures`.
- ☐ If `system_under_release.autonomy_tier` is `tier-4`, `envelope_id` is present.
- ☐ `aem_components` includes `evaluation_reports`, `trace_ids`, `diffs`, `policy_check_outputs`,
  `rollback_plan`, `orchestration_topology_manifest`, `evidence_freshness_attestation`, and
  `bundle_integrity_attestation`.
- ☐ The bundle satisfies the schema's `allOf`/`if`/`then` required-by-tier matrix for its
  `autonomy_tier` × `consequence_class` combination (encoded per T4.1; see
  `governance/evidence-bundle-schema.md` §5 for the human-readable matrix). A bundle that is
  stripped below what its tier × consequence class requires **fails validation** — do not
  hand-waive this; run the schema.
- ☐ `aentm_components` is present and populated per the same tier × consequence-class matrix.

A bundle that fails JSON Schema validation is a conformance failure regardless of any narrative
claim of "done" (see P1).

## Part 3 — Agent inventory: validate against `operational-templates/agent-inventory-schema.json`

Every agent in production must have one conformant row in the agent inventory. Confirm each row
carries, at minimum, the schema's required fields:

- ☐ Identity and ownership: `agent_id`, `display_name`, `description`, `owner`,
  `engineering_steward`, `governance_authority`, `security_owner`.
- ☐ Authorization: `autonomy_tier` (with `tier_4_envelope_id` if Tier 4), `consequence_classes_served`,
  `aentm_relocation_stage_per_class`, `action_classes_authorized`, `initiative_authorization_status`.
- ☐ Traceability: `foundation_models`, `composite_state_hash_current`, `composite_state_history`.
- ☐ Scope: `igm_domains_accessed`, `igm_authorities_in_scope`, `epistemic_tier_required_per_class`,
  `data_in_scope`, `regulatory_classification`.
- ☐ Review cadence: `last_aia_date` / `next_aia_due`, `last_evaluation_date` / `next_evaluation_due`,
  `last_red_team_date` / `next_red_team_due`, `last_review_date` / `next_review_date`.
- ☐ Registers: `slo_register_link`, `linked_risk_register_ids`, `linked_supplier_register_ids`,
  `discovery_metadata`, `status`.

A production agent with no inventory row, or a row that fails schema validation, is a conformance
failure under P5 (permission ceiling) and P12 (accountability) regardless of runtime behavior.

---

## Result

- **Conformant**: every Part 1 box checked (including all applicable conditional boxes), the
  evidence bundle validates against `governance/evidence_bundle.schema.json`, and every production
  agent has a row that validates against `operational-templates/agent-inventory-schema.json`.
- **Partial**: any unchecked box or schema validation failure. Name the specific principle or field
  and treat it as an open gap — do not average across rows to a passing score. AEM has no notion of
  "mostly conformant"; see P1's "done" test.
- **Not assessed**: this checklist was not run against a real system. A checklist filled from
  intent rather than observed system behavior is not a conformance assessment.

This checklist is a summary tool. It does not replace `manifesto-principles-01.md` through
`manifesto-principles-12.md` as the source of truth for wording, nor `governance/evidence_bundle.schema.json`
and `operational-templates/agent-inventory-schema.json` as the source of truth for machine-checkable
structure. If any conflict is found between this page and those files, file it and treat the
underlying files as authoritative until reconciled.
