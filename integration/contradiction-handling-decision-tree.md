# Contradiction-Handling Decision Tree

**Status:** Normative cross-framework artefact (Wave 3, item W3.7).
**Audience:** AEnt-M authors, IGM authors, AEM authors, internal audit (3rd line), regulators, runtime operators.
**Purpose:** Reconcile IGM Value 3 ("preserved contradictions over forced consensus" — `intelligence-governance-manifesto/manifesto.md:78–82`) with AEnt-M Principle 11 ("Block on unresolved contradiction" for High/Critical actions — `agentic-enterprise-manifesto/manifesto.md` Principle 11). The two are not in fact contradictory — IGM governs *the substrate's preservation* of contradictions; AEnt-M governs *what an agent does when its reasoning chain encounters one*. But without a single canonical decision tree, runtime operators cannot tell which contradiction-types should fail closed (Block) at which consequence classes, which should escalate, and which should continue under enhanced monitoring.

This artefact provides the canonical tree: input = `contradiction-type × consequence-class × claim-tier`, output = `response-class`. Three worked examples illustrate the mapping at jurisdictional, temporal, and scope contradictions.

**Glossary note — "epistemic tier".** Throughout this document, "epistemic tier" refers to what IGM previously called "confidence" (Provisional, Candidate, Confirmed, High Confidence, Authoritative).

---

## 1. The conflict, sourced

### 1.1 IGM Value 3 — preserve contradictions

> "When two claims conflict, both are preserved. The contradiction itself is a first-class object — with its own provenance, scope, and resolution status. Auto-resolution destroys the most important signal in the system. Conflicts must be typed: logical contradiction, jurisdictional divergence, temporal supersession, scope variation, or extraction error."
> — `intelligence-governance-manifesto/manifesto.md:78–80` (Value 3)

> "In regulated workflows, material unresolved contradictions may require operational halt until human resolution — not just visibility, but action constraint."
> — `intelligence-governance-manifesto/manifesto.md:82`

IGM's frame: contradictions are *signal*, not noise. They are preserved with type and resolution status. Some — "material" ones in regulated workflows — may require action constraint.

### 1.2 AEnt-M Principle 11 — Block on unresolved contradiction at High/Critical

> "When epistemic confidence falls below threshold — stale claims on a critical path, **unresolved contradictions in a reasoning chain**, scope mismatches between claim and use context — the system responds according to the consequence class of the action: Block — halt the action entirely... Escalate — route to human decision-maker... Restrict scope... Advisory only... Continue with enhanced monitoring."
> — `agentic-enterprise-manifesto/manifesto.md` Principle 11

> "'Fail closed' is the default for high-consequence actions. Lower-consequence actions may degrade gracefully."
> — `agentic-enterprise-manifesto/manifesto.md` Principle 11

AEnt-M's frame: at runtime, an action whose reasoning chain encounters an unresolved contradiction is governed by a response class calibrated to consequence.

### 1.3 The reconciliation

The two are complementary, not contradictory: IGM governs *what the substrate does with contradictions* (preserve, type, track resolution); AEnt-M governs *what the agent does at the moment of action when its reasoning chain involves one*. The missing piece is a single canonical decision tree that operators, agents, and auditors can use to derive the response class from the contradiction type, the consequence class, and the epistemic tier of the claims involved. Both manifestos refer to "the response class" but neither specifies the cross-product mapping. This artefact is that cross-product.

---

## 2. The decision tree (normative)

### 2.1 Inputs

For every action that encounters a contradiction in its reasoning chain, three inputs are required:

1. **Contradiction type** (per IGM P4 taxonomy — `intelligence-governance-manifesto/manifesto-principles.md` P4): `logical_contradiction`, `jurisdictional_divergence`, `temporal_supersession`, `scope_variation`, `extraction_error`.
2. **Consequence class of the action** (per AEnt-M P8 — `agentic-enterprise-manifesto/manifesto.md` Principle 8): `Low` (carve-out — see `/integration/low-consequence-resolution.md`), `Medium`, `High`, `Critical`.
3. **Highest epistemic tier of the contradictory claims** (per IGM tier system, renamed from "confidence" to *epistemic tier*): `Provisional`, `Candidate`, `Confirmed`, `High Confidence`, `Authoritative`. The relevant input is the *highest* tier on either side of the contradiction (because if even one side is Authoritative, the contradiction has institutional weight).

### 2.2 Output

The response class drawn from AEnt-M P11: `Block`, `Escalate`, `Restrict scope`, `Advisory only`, `Continue with enhanced monitoring`.

### 2.3 The tree (canonical mapping)

The tree is most readably expressed as a series of consequence-class-keyed tables. Where multiple type/tier combinations apply, the **higher response** is taken (response strength order: `Block` > `Escalate` > `Restrict scope` > `Advisory only` > `Continue with enhanced monitoring`).

#### 2.3.1 Critical-consequence actions

| Contradiction type | Highest epistemic tier on either side | Response |
|---|---|---|
| `logical_contradiction` | any | **Block.** Halt the action; structured escalation to Dual Authority + governance authority. |
| `jurisdictional_divergence` | Authoritative or High Confidence | **Block** (default) unless the action is *scope-limited to one jurisdiction* and the divergence is documented and out-of-scope for the action; in that case **Restrict scope** with explicit jurisdiction tag. |
| `jurisdictional_divergence` | Confirmed or below | **Block** until at least one side is upgraded to Confirmed+ via validation event (per IGM P13). |
| `temporal_supersession` | Authoritative on the new side; old side any | **Block** — the action must not run on superseded regulation. Resume after substrate re-validation confirms the new side is operationally usable. |
| `temporal_supersession` | new side below Authoritative; old side Authoritative | **Block** until the new side is validated and promoted (the supersession is in transition; the system must not run on either side until clarified). |
| `scope_variation` | any | **Block** (default) unless the action is demonstrably within the intersection of all claim scopes; in that case **Restrict scope**. The default-Block is because Critical actions have no margin for scope mis-match. |
| `extraction_error` | any | **Block.** This is a substrate quality event, not a substantive contradiction. Halt; route to Revision authority for re-extraction; do not run the action on suspected-bad claims. |

#### 2.3.2 High-consequence actions

| Contradiction type | Highest epistemic tier on either side | Response |
|---|---|---|
| `logical_contradiction` | any | **Block.** Structured escalation to Accountable Authority. |
| `jurisdictional_divergence` | Authoritative or High Confidence | **Restrict scope** if the action is jurisdiction-tagged and within one jurisdiction; **Block** if the action straddles jurisdictions or jurisdiction is undetermined. |
| `jurisdictional_divergence` | Confirmed or below | **Escalate** to Accountable Authority for human decision; do not auto-block, but do not run on un-validated divergence. |
| `temporal_supersession` | Authoritative on the new side; old side any | **Block.** |
| `temporal_supersession` | new side below Authoritative; old side Authoritative | **Escalate.** The Accountable Authority decides whether to operate on the old side (running risk of regulator-noted lag) or block until promotion. |
| `scope_variation` | any | **Restrict scope** if the action is demonstrably within the intersection; **Escalate** otherwise. |
| `extraction_error` | any | **Block.** Same reasoning as Critical: substrate-quality event. |

#### 2.3.3 Medium-consequence actions

| Contradiction type | Highest epistemic tier on either side | Response |
|---|---|---|
| `logical_contradiction` | any | **Escalate** to Decision Reviewer. |
| `jurisdictional_divergence` | Authoritative or High Confidence | **Restrict scope** if the action is jurisdiction-tagged; **Escalate** otherwise. |
| `jurisdictional_divergence` | Confirmed or below | **Advisory only.** The output is delivered with explicit "epistemic-quality below threshold" tag and no execution authority. |
| `temporal_supersession` | Authoritative on the new side; old side any | **Escalate** to Decision Reviewer (reviewer determines whether the new side is operationally usable). |
| `temporal_supersession` | new side below Authoritative; old side Authoritative | **Advisory only.** |
| `scope_variation` | any | **Restrict scope** if intersection-derivable; **Advisory only** otherwise. |
| `extraction_error` | any | **Escalate.** Substrate-quality event; reviewer routes to Revision authority. |

#### 2.3.4 Low-consequence actions (carve-out — see `/integration/low-consequence-resolution.md`)

| Contradiction type | Highest epistemic tier on either side | Response |
|---|---|---|
| `logical_contradiction` | any | **Continue with enhanced monitoring** but log the contradiction in the post-hoc audit sample with a flag for workflow-owner review. The carve-out's seven criteria preclude any contradiction having institutional consequence — but the workflow owner must verify this claim is accurate (a logical contradiction is a strong signal that the carve-out criteria may have shifted). |
| `jurisdictional_divergence` | any | **Continue with enhanced monitoring**; if the action affects any other jurisdiction the carve-out criteria fail and the action is not Low (reclassify per `/integration/low-consequence-resolution.md` §3). |
| `temporal_supersession` | any | **Continue with enhanced monitoring.** If the new side has institutional consequence, the carve-out criteria fail. |
| `scope_variation` | any | **Continue with enhanced monitoring.** |
| `extraction_error` | any | **Continue with enhanced monitoring.** Log for Revision authority sample review. |

> **Note on Low.** The Low carve-out (per `/integration/low-consequence-resolution.md`) requires *no client impact, no regulatory exposure, no irreversibility, no PII processing, no financial exposure, no safety implications, no precedent-creation*. By construction, contradictions encountered at Low have minimal institutional consequence. But a contradiction is itself a signal that the workflow may have crossed a carve-out criterion — the workflow owner reviews the contradiction-flagged actions in the next post-hoc audit cycle and confirms (or reclassifies) the workflow.

---

## 3. Worked examples

### 3.1 Example 1 — Jurisdictional divergence at High consequence

**Action.** A custodian's settlement-fail penalty calculation for a cross-border fail (EU CSDR + UK CREST). Consequence class: High (regulatory filing, partially reversible within filing window).

**Contradiction encountered.** The agent's reasoning chain cites both the EU CSDR Authoritative-tier penalty methodology and the UK CREST Authoritative-tier penalty methodology. The contradiction type is `jurisdictional_divergence`. Both sides at Authoritative tier.

**Tree lookup.** Critical → No. High → row 2 (`jurisdictional_divergence`, `Authoritative or High Confidence`): "Restrict scope if the action is jurisdiction-tagged and within one jurisdiction; Block if the action straddles jurisdictions or jurisdiction is undetermined."

**Result.** This action *straddles* jurisdictions (it is a cross-border fail). Therefore: **Block**. The action halts. Escalation routes to the Accountable Authority. The Accountable Authority either (a) decomposes the action into two scope-tagged sub-actions (one EU side, one UK side) and the agent runs them independently — at which point each is `Restrict scope` for its own jurisdiction; or (b) declines and routes the case to manual handling. The contradiction itself remains preserved in the substrate (per IGM Value 3); it is not "resolved" by this decision.

### 3.2 Example 2 — Temporal supersession at Low consequence

**Action.** An internal-research workflow generating a summary of historical penalty-rate trends for a research-prototype paper. Consequence class: Low (no client impact, no regulatory exposure, no irreversibility, no PII, no financial exposure, no safety implications, no precedent-creation — all seven carve-out criteria hold; the workflow is genuinely below AEM scope).

**Contradiction encountered.** The substrate contains both a pre-2024 Authoritative-tier claim about CSDR penalty rates and a post-2024 Authoritative-tier claim that supersedes it. The contradiction type is `temporal_supersession`.

**Tree lookup.** Low → row 3 (`temporal_supersession`, any): "Continue with enhanced monitoring. If the new side has institutional consequence, the carve-out criteria fail."

**Result.** **Continue with enhanced monitoring.** The agent produces the summary noting both the pre- and post-supersession states (which is correct for a historical-trend research output). Logged for the workflow-owner's post-hoc audit. The post-hoc audit confirms the carve-out criteria still hold — the research output has no client impact and is not used in client-facing or regulatory work. If the post-hoc audit reveals the output is being used in client-facing work, the workflow is reclassified to at least Medium and the next encounter of the same contradiction is responded to per Medium → row 4 (Advisory only at Authoritative-old).

### 3.3 Example 3 — Scope variation at Critical consequence

**Action.** A bank's cross-border systemic-risk client filing to ESMA + national competent authority. Consequence class: Critical (cross-border regulatory submission, systemic-risk implications, dual-authority).

**Contradiction encountered.** Two scope-variant claims: claim A asserts the systemic-risk threshold for cross-border fail aggregation in jurisdiction X is €50M; claim B asserts the threshold is €75M but is scoped to a different sub-class of instruments. The contradiction type is `scope_variation`. Both claims at Confirmed tier. The action's intersection-of-scopes is unclear without further interpretation.

**Tree lookup.** Critical → row 6 (`scope_variation`, any): "Block (default) unless the action is demonstrably within the intersection of all claim scopes; in that case Restrict scope. The default-Block is because Critical actions have no margin for scope mis-match."

**Result.** The action is *not* demonstrably within the intersection (the intersection cannot be confidently derived without further regulatory interpretation). Therefore: **Block**. Structured escalation to Dual Authority + governance authority. The Dual Authority either (a) commissions a regulatory interpretation that resolves the scope intersection (a new claim, with validation event per IGM P13, that becomes the basis for resumption), or (b) declines and the filing reverts to manual preparation.

---

## 4. How the tree is used at runtime

### 4.1 Embedded in the AEnt-M Reasoning-governance schema (P5)

The tree is normatively embedded in the AEnt-M Reasoning-governance schema (per `agentic-enterprise-manifesto/companion-guide.md` P5 elaboration). When the agent's reasoning chain encounters a typed contradiction (per IGM P4), the schema validator looks up the response per the consequence class of the action and the highest epistemic tier of the contradictory claims, and emits the response.

### 4.2 Encoded as a machine-readable rule set

The tree is encoded as a JSON Schema rule set (file: `governance/contradiction-decision-tree.schema.json` — DRAFT, planned). The schema is referenced from:
- AEnt-M Reasoning-governance schemas (P5).
- The Action-governance schema's response-class trigger predicates.
- The runtime monitoring telemetry (so each invocation is logged with the rule that fired).

### 4.3 Audit trail

Every action that encounters a contradiction logs: the contradiction's claim references, the contradiction type, the consequence class of the action, the highest epistemic tier on either side, the rule that fired, the response class issued, the named human (if any) the action was escalated to, and the resolution. This is part of the unified evidence bundle (`governance/evidence-bundle-schema.md`).

### 4.4 Override

The Accountable Authority (High) or Dual Authority + governance authority (Critical) may override a tree-derived response. Overrides are logged with rationale and are subject to rubber-stamping detection (per AEM P12). An override pattern indicates either (a) the tree is mis-calibrated for the domain (and should be reviewed) or (b) the human is rubber-stamping (and should be retrained or replaced).

---

## 5. Edits required to source documents

### 5.1 Edit to `intelligence-governance-manifesto/manifesto.md` Value 3

Append a cross-reference at the end of Value 3 (currently `intelligence-governance-manifesto/manifesto.md:78–82`):

> "When an agent's reasoning chain encounters a contradiction at runtime, the response is governed by the canonical decision tree in [`/integration/contradiction-handling-decision-tree.md`](../integration/contradiction-handling-decision-tree.md), which maps `contradiction-type × consequence-class × claim-tier` to a response class (Block / Escalate / Restrict scope / Advisory only / Continue with enhanced monitoring) per AEnt-M Principle 11. The substrate's preservation of the contradiction (this Value) is unchanged by the runtime response — IGM preserves; the decision tree determines what the agent does with what is preserved."

### 5.2 Edit to `agentic-enterprise-manifesto/companion-guide.md`

The companion-guide P11 section (where response classes are operationalised) should reference the tree. Suggested addition (placement: after the existing P11 elaboration, before consequence-class table):

> "The mapping from contradiction encounters to response classes is the canonical decision tree in [`/integration/contradiction-handling-decision-tree.md`](../integration/contradiction-handling-decision-tree.md). Inputs: contradiction type (per IGM P4), consequence class (per AEnt-M P8), and the highest epistemic tier on either side of the contradiction. Output: response class. The tree is encoded as a machine-readable rule set referenced from the AEnt-M Reasoning-governance schema (P5)."

> **DRAFT — author review needed.** The exact location in `companion-guide.md` (P11 elaboration) depends on the file's current structure; the author may choose where to place the cross-reference. The text above is the recommended insertion.

---

## 6. Edge cases and disambiguations

### 6.1 What if the contradiction is between two claims at different epistemic tiers (e.g., Authoritative and Provisional)?

The tree uses the *highest* tier on either side as input. The reason is institutional: an Authoritative claim contradicting a Provisional claim is institutionally weighty (the Provisional claim is the deviation), and the tree defaults to handling the contradiction as if Authoritative-tier evidence exists on at least one side. In practice, low-tier claims contradicting high-tier claims should rarely persist in the substrate (the lower-tier claim should either promote with validation event or retire); but at the moment of action the tree handles whatever it finds.

### 6.2 What if multiple contradictions are encountered in the same reasoning chain?

The strongest response from the tree (per the response-strength ordering) is taken. If three contradictions in the chain map to {Restrict scope, Escalate, Block}, the action is Blocked.

### 6.3 What if a contradiction is detected mid-action (after the action has begun)?

The action is paused and the response class is issued as if the contradiction had been encountered at the start. If Block, the action is halted and any partial output is held until resolution. If Escalate, the action pauses and routes to a human reviewer. If Restrict scope, the action's scope is narrowed; partial outputs outside the new scope are discarded. This requires the runtime to support mid-action interruption (per AEM P10 containment).

### 6.4 What if the contradiction type is `extraction_error` and the substrate is being actively re-extracted?

Block (per the tree at any consequence class for `extraction_error`). The substrate is unstable for this claim. Resumption requires the Revision authority to confirm the re-extraction has produced a consistent claim.

### 6.5 What about contradictions that the agent itself introduces (e.g., the agent's reasoning chain produces an output that contradicts a cited claim)?

This is a P10-type emergence event. It does not enter the IGM substrate as a contradiction unless it is promoted by the assertion authority. At runtime, the agent's reasoning chain validator catches it before action — the action is Blocked under AEM Govern (out-of-scope reasoning) regardless of the consequence class, because the agent has produced a claim it does not have authority to assert.

### 6.6 What if the contradiction is a *deliberate* preserved contradiction (e.g., a UK ↔ EU jurisdictional divergence that is intentionally maintained as a feature of the substrate)?

Per the tree: jurisdictional divergence at Authoritative on both sides → Restrict scope (if action is jurisdiction-tagged) or Block (if undetermined). The deliberate preservation does not exempt the action; it simply means the contradiction is not a defect to be resolved away — the action must be jurisdiction-tagged to proceed.

### 6.7 What about contradictions flagged but not yet typed by IGM Curate?

Until the Curate stage assigns a type per IGM P4, the contradiction is treated as `logical_contradiction` (the strictest type at every consequence class) for the purposes of the tree. This is the safe-default direction — the action defaults to Block (Critical and High) or Escalate (Medium) until the type is assigned.

---

## 7. The tree's relationship to other artefacts

| Artefact | Relationship |
|---|---|
| `intelligence-governance-manifesto/manifesto-principles.md` P4 | Defines the contradiction taxonomy that is the first input axis. |
| `agentic-enterprise-manifesto/manifesto.md` Principle 8 | Defines the consequence class that is the second input axis. |
| `intelligence-governance-manifesto/manifesto.md` (tier system in v1.3+) | Defines the epistemic tier that is the third input axis. |
| `agentic-enterprise-manifesto/manifesto.md` Principle 11 | Defines the response classes that are the output. |
| `governance/governance-integration-note.md` | The composition rule (action permitted = MIN of three gates) operates *upstream* of this tree — the action's permitted-or-not is decided first; if permitted, the contradiction tree decides *what response*. |
| `/integration/composite-state-vs-curate-precedence.md` | Class 3 emergency retirements may resolve a contradiction by retiring one side — but until that resolution, the tree governs the agent's behaviour. |
| `governance/evidence-bundle-schema.md` | The tree's output (with the rule that fired and the named authorities involved) is logged in the unified evidence bundle. |

---

## 8. Cross-references

- `intelligence-governance-manifesto/manifesto.md:78–82` — IGM Value 3 (preserve contradictions).
- `intelligence-governance-manifesto/manifesto-principles.md` P4 — contradiction taxonomy (5 types).
- `agentic-enterprise-manifesto/manifesto.md` Principle 11 — response classes (5).
- `agentic-enterprise-manifesto/manifesto.md` Principle 8 — consequence classes (4 + Low carve-out).
- `agentic-enterprise-manifesto/companion-guide.md` Principle 5 — retrieval/reasoning/action governance schemas (where the tree is embedded).
- `/integration/loop-readiness-for-agent-opportunities.md` — opportunity records carry contradiction-observed fields; triage applies the tree at the consequence-class-estimate level.
- `/integration/composite-state-vs-curate-precedence.md` — class structure interacts with contradiction resolution timing.
- `/integration/low-consequence-resolution.md` — Low carve-out's contradiction handling.
- `governance/contradiction-decision-tree.schema.json` (DRAFT, planned) — machine-readable encoding.

---

## 9. DRAFT items needing author judgment

- **DRAFT — author review needed.** The Critical-row defaults are deliberately conservative (Block on most cross-products). Author judgment may calibrate specific cells (e.g., temporal supersession with both sides Authoritative may, in practice, allow Restrict scope to the new side rather than Block).
- **DRAFT — author review needed.** The Low-row "Continue with enhanced monitoring" is permissive given the carve-out criteria. Author judgment may prefer "Advisory only" at Low for symmetry with the rest of the tree.
- **DRAFT — author review needed.** The "highest tier on either side" rule for the third input axis may be too coarse for some domains. An alternative is "tier of the side that the agent's reasoning chain relied on" — finer-grained but harder to instrument.
- **DRAFT — author review needed.** Whether to extend the tree with a fourth input axis: the *resolution status* of the contradiction (per IGM Value 3 — contradictions have a resolution status). Resolved contradictions may not need to fire the response at all. The current artefact treats unresolved contradictions only.
