# Low-Consequence Resolution: AEnt-M P8 vs AEM P12

**Status:** Normative cross-framework artefact (Wave 1, item W1.9 / B10).
**Audience:** AEM authors, AEnt-M authors, ASDLC release managers, internal audit (3rd line), regulators.
**Purpose:** Reconcile AEM Principle 12's Tier 1 ("Low-risk, reversible") accountability model with AEnt-M Principle 8's "Low consequence" class (post-hoc audit sampling at the workflow level). AEM P12 already provides a per-class model that does not require per-action review at Tier 1 ([`manifesto/manifesto-principles-12.md#12-accountability-requires-visibility`](../manifesto/manifesto-principles-12.md#12-accountability-requires-visibility), "Low-risk, reversible" action-class table row); the two documents describe closely related mechanisms without cross-referencing each other or aligning their criteria. This artefact maps the two and states shared criteria and terminology — it does not resolve a conflict, because AEM does not in fact impose a uniform per-action floor across all consequence classes.

---

## 1. AEM Tier 1 and AEnt-M Low, sourced

### 1.1 AEM Principle 12 — the minimum bar

AEM P12 sets a per-action accountability floor for Medium consequence and above, but already varies that floor by consequence class at the low end:

> "Agents may prepare evidence, summarize risk, flag missing controls, and recommend decisions. Agents may not accept residual risk, approve production exposure, waive controls, or absorb accountability for business outcomes."
> — [`manifesto/manifesto-principles-12.md`](../manifesto/manifesto-principles-12.md#12-accountability-requires-visibility)

> "A named human who has reviewed the evidence bundle, accepted that the DoD conditions are satisfied, and accepts production accountability for the outcome (P12). This is not a rubber stamp — it is the governance record that the evidence was reviewed."
> — `manifesto/manifesto.md:129–132`

AEM P12 itself already recognizes a lowest tier that does not require per-action human review: "Low-risk, reversible (Tier 1, contained blast radius) | None per action; domain owner reviews statistical samples and trend dashboards" ([`manifesto/manifesto-principles-12.md#12-accountability-requires-visibility`](../manifesto/manifesto-principles-12.md#12-accountability-requires-visibility), "Low-risk, reversible" action-class table row). So AEM's floor is not uniformly per-action across all consequence classes — Tier 1 is already a statistical-sampling, workflow-level model, not a per-action one.

### 1.2 AEnt-M Principle 8 — Low consequence weakens to workflow-level

AEnt-M P8 introduces consequence-class accountability with a Low class that drops below per-action review:

> "Low consequence (internal research, non-client-facing analysis) — human accountability at the workflow level. Named human owns the workflow. Individual actions are logged with audit trail."
> — `agentic-enterprise-manifesto/manifesto.md` (P8 — historical line 122; line numbers shift with edits)

> "Low | Workflow owner | Post-hoc audit sampling | Action log with reasoning chain | Continue with enhanced monitoring"
> — `agentic-enterprise-manifesto/companion-guide.md:134`

AEnt-M's Low class is a workflow-level, post-hoc-sampling model. That is not weaker than AEM's *own* Tier 1 (per §1.1) — it is directionally the same model AEM P12 already applies at Tier 1. What is missing is not an AEM floor that AEnt-M falls below; it is an explicit mapping between AEM's Tier 1 and AEnt-M's Low class so a reader does not have to infer that the two are describing the same thing in different vocabulary.

### 1.3 What remains to be reconciled

The two documents describe materially similar mechanisms (statistical/post-hoc sampling, workflow- or domain-owner-level accountability, no mandatory per-action review) using different names, different trigger criteria, and no cross-reference between them. Left unreconciled, a reader of AEM alone would not know that AEnt-M's Low class corresponds to AEM's Tier 1, and a reader of AEnt-M alone would not know that AEM already licenses this model rather than merely tolerating a deviation from it. The remaining work is terminological and criteria alignment between AEM P12 Tier 1 and AEnt-M P8 Low — not the invention of a carve-out AEM does not otherwise have. (Reconciling the tier/class taxonomy itself, including naming, is tracked separately — see `manifesto/manifesto-principles-05.md` and `manifesto/manifesto-principles-12.md` for the two AEM tier definitions this document's Tier 1 references.)

---

## 2. The two options

### Option A — Tighten AEnt-M Low consequence to per-action accountability

Bring AEnt-M Low into AEM compliance by requiring per-action accountability even at the lowest consequence class. Either: (a) require named-human review of every action; or (b) require automated AEM-conformant evidence bundles with named human review at a defined sampling rate, where the sampling rate is high enough that "review" is per-action in practical terms (e.g., ≥50% of actions).

**Pros.**
- Preserves AEM as the absolute minimum bar for any action under enterprise governance.
- Avoids the readability problem of two competing accountability models.
- Regulators see a single accountability floor across the stack.

**Cons.**
- Operationally expensive at scale. The Low class is the high-volume class; per-action review adds friction that may not be commensurate with the institutional cost of any individual action.
- May produce *rubber-stamping* (AEM P12's named failure mode — `manifesto.md:131`): named humans approving fast-volume actions without genuine review, which is itself a P12 violation. The cure is worse than the disease.
- Makes AEM itself more burdensome to adopt for use cases where the institutional cost of error is genuinely small.

### Option B — Carve "Low consequence" out of AEM scope explicitly

Declare that AEM principles apply to actions whose consequence class is Medium or higher, and that AEnt-M's "Low consequence" class is explicitly *below the AEM-governed envelope*. Below-envelope actions are governed by post-hoc audit sampling and workflow-level accountability, not by per-action AEM bars. Criteria for Low classification are tightened so the carve-out is narrow and defensible.

**Pros.**
- Makes the scope boundary explicit. Readers can tell whether any given action is AEM-governed.
- Operationally proportionate. Low-cost, fully-reversible, no-client-impact actions are not forced through per-action human review.
- Regulators see a declared envelope with defensible criteria, not a silent weakening.
- Compatible with AEM's existing scope-statement model (AEM already declares many things out of scope — `manifesto.md:295–312`).

**Cons.**
- Narrows AEM's claimed coverage. AEM no longer governs *all* agent actions in an enterprise; it governs actions at Medium consequence and above.
- Requires AEM to be edited to declare the carve-out. Without the AEM edit, the carve-out is unilaterally declared by AEnt-M, which is the same readability problem in reverse.
- Requires defensible criteria for "Low consequence" so the carve-out cannot expand by drift.

---

## 3. The recommendation — Option B (DRAFT)

> **DRAFT — author choice needed.** This artefact recommends **Option B** on operational and proportionality grounds. The choice is consequential and must be ratified by the AEM and AEnt-M authors before publication. If Option A is preferred, this artefact is inverted: tighten AEnt-M Low to per-action and remove the carve-out language below.

### 3.1 The criteria for Low-consequence classification (carve-out criteria)

An action class qualifies as "Low consequence" — and is therefore *outside the AEM-governed envelope* — only when **all** of the following are true:

1. **No client impact.** The action does not affect any client, customer, counterparty, or external party. Effects are entirely internal to the enterprise.
2. **No regulatory exposure.** The action is not subject to any sectoral regulator's reporting, retention, or conduct rules. It is not within the scope of any high-risk classification under the EU AI Act Annex III (or analogous classifications elsewhere). It is not subject to DORA, GDPR Article 22, MiFID II, CSDR, Solvency II, or other regulated-industry obligations.
3. **No irreversibility.** The action is fully reversible by routine operational means within ≤24h. Reversibility is verified — there is a tested rollback procedure or the action's effects are by construction transient (e.g., cached outputs that age out).
4. **No PII processing.** The action does not process, store, or derive from personally identifiable information. Personal data of any kind takes the action out of Low.
5. **No financial exposure.** The action does not commit financial resources, alter financial records, or affect financial reporting. Internal infrastructure-cost actions (e.g., spinning up a sandbox VM) are permitted within a pre-approved budget envelope.
6. **No safety implications.** The action has no health, physical, or psychological safety implications.
7. **No precedent-creation.** The action does not establish a precedent that would constrain future Medium- or High-consequence actions (e.g., an internal "research prototype" whose outputs are then used in client-facing work would inherit the client-facing class).

If any one criterion fails, the action class is **not** Low. It is at minimum Medium and is therefore inside the AEM-governed envelope.

### 3.2 What "outside AEM scope" means operationally

Within the carve-out, the AEM principles do not apply *to those specific actions*. Specifically:

- AEM P12's per-action review requirement does not apply.
- AEM Definition of Done's per-action evidence bundle is not required.
- AEM autonomy-tier gating per-action is replaced by workflow-tier gating.

What does apply:

- **Workflow-level accountability.** A named human owns the workflow as a whole and is accountable for the workflow's design, its consequence-class assignment, its scope, and its periodic review. This is AEnt-M P8 Low at workflow granularity.
- **Post-hoc audit sampling.** A statistically valid sample of actions is reviewed by a named human at a defined cadence (recommended: monthly review of ≥1% of actions or ≥30 actions per workflow per month, whichever is larger; calibrated to risk appetite per workflow).
- **Continuous logging.** Every action is logged with a structured record: timestamp, agent identifier, agent CSH, inputs, outputs, reasoning chain, claims cited (if any), and the workflow's consequence-class tag. Logs are retained per the slowest decay class of any cited claim, but at least 90 days.
- **Reclassification triggers.** Any action that turns out to have crossed any of the seven criteria above (e.g., an internal action that unexpectedly affected a client) is *immediately* reclassified, the workflow is paused, and AEM-governed remediation applies. This is a P12-level governance event.
- **AEM minimum bar above the carve-out.** Any action that the workflow cannot guarantee in advance falls inside Low must default to Medium. The presumption is *inside* AEM scope unless the seven criteria are demonstrably and durably true.

### 3.3 Why this preserves AEM's integrity

AEM's claim is that the principles are the minimum bar for governed agent execution at Phase 4 and above. The Option B carve-out does not weaken that claim — it scopes it. Within scope (Medium/High/Critical), AEM's per-action floor holds without exception. Outside scope (Low), AEnt-M takes over with a different but explicitly declared accountability model. A regulator reading both documents sees a single coherent map of "where does AEM apply?" rather than two contradictory accountability models silently overlapping.

### 3.4 Why post-hoc sampling is still defensible at Low

Post-hoc audit sampling is a regulated-industry standard for low-consequence high-volume operational controls (see ISO 27001 sample-based control testing; SOC 2 control sampling). The defensibility of post-hoc sampling depends on:

- The criteria for the carve-out being narrow and tight (per §3.1).
- The sampling cadence being sufficient to detect emerging patterns within decision-relevant windows.
- The reclassification trigger being sharp enough that mistakes do not persist.

These conditions are stated as part of the workflow-level accountability model in §3.2.

---

## 4. Edits required to AEnt-M

### 4.1 Edit to `agentic-enterprise-manifesto/manifesto.md` Principle 8

The current Low-consequence language (`agentic-enterprise-manifesto/manifesto.md` P8 paragraph "Low consequence") must be tightened to declare the carve-out and reference this artefact. See §6 for the exact replacement text applied to the manifesto.

### 4.2 Edit to `agentic-enterprise-manifesto/companion-guide.md` Consequence-class table

The Low row of the consequence-class table (`agentic-enterprise-manifesto/companion-guide.md:134`) must declare the carve-out criteria (per §3.1) and reference this artefact. See §6 for the exact replacement text.

### 4.3 Cross-reference into AEM (recommended but optional)

> **DRAFT — author review needed.** Whether AEM's `manifesto.md` "What this manifesto does not cover" section (`manifesto.md:295–312`) should add a line declaring the carve-out is *recommended*. Without it, the carve-out is declared in AEnt-M but not acknowledged in AEM, which is the same readability problem in reverse. The recommended addition:

> "Low-consequence actions explicitly carved out per AEnt-M Principle 8 and `integration/low-consequence-resolution.md`. Actions in this class operate under workflow-level accountability with post-hoc audit sampling rather than per-action review. The AEM principles do not apply to actions in this class; criteria for the carve-out are stated in the integration document."

This edit is left to the AEM author's discretion. The carve-out is operationally workable without it but is more readable with it.

---

## 5. Edge cases and disambiguations

### 5.1 What if a workflow contains some Low-consequence actions and some Medium-consequence actions?

The workflow must be decomposed. Actions whose consequence class is Medium or higher are inside the AEM-governed envelope and require per-action review. Actions whose consequence class is Low are outside the envelope and can use workflow-level accountability. A single workflow that mixes classes either decomposes into separate workflows by class or governs the whole workflow at the highest class present.

### 5.2 What if an action is in a "research prototype" workflow but its outputs are subsequently used in client-facing work?

The act of using the outputs in client-facing work is a *new action* whose consequence class is Medium or higher. The original Low-class action is not retroactively reclassified; the *new* action is governed. This requires explicit data-flow tracking from research workflows into production workflows so the consequence-class boundary is enforced at use, not at production.

### 5.3 What if a Low-class action causes harm despite the carve-out criteria?

This is a P12-level governance event. The action is reclassified, the workflow is paused, AEM-governed remediation applies, and the seven criteria for the Low class are reviewed for the workflow as a whole. Recurrence indicates the carve-out criteria for that workflow were misapplied; the workflow is reclassified to Medium permanently.

### 5.4 What about agent-to-agent actions inside an automated workflow with no human in the loop?

Agent-to-agent actions inside a Low workflow are still bound by the seven criteria. If any agent-to-agent action would breach a criterion if its outputs were realised externally, the action is not Low. AEnt-M's Principle 11 response classes (Block/Escalate/Restrict/Advisory/Continue) apply within the workflow regardless of the workflow's consequence class — the response classes are about epistemic quality, not consequence class.

### 5.5 What about logging cost?

The logging requirement at Low (every action logged with reasoning chain and cited claims) is non-trivial at high volume. This is intentional. Without the log, the post-hoc sampling is meaningless and the workflow is ungoverned. If the logging cost is itself prohibitive, the workflow is too high-volume to be Low — the operational model needs reconsideration, not the governance model.

### 5.6 Can the carve-out criteria be relaxed for specific industries or jurisdictions?

No. The seven criteria are the floor. Industries with lighter regulatory environments may *also* govern Medium and above more lightly within their own envelopes, but the Low criteria themselves are not a regulatory variable — they define the boundary of "outside AEM" and AEM's minimum bar is industry-invariant.

---

## 6. The exact replacement text (for the AEnt-M edits)

### 6.1 Replacement for AEnt-M Principle 8 — Low paragraph

The current bullet for Low (text along the lines of "Low consequence (internal research, non-client-facing analysis) — human accountability at the workflow level. Named human owns the workflow. Individual actions are logged with audit trail.") is replaced by:

> "*Low consequence* — explicitly carved out of the AEM-governed envelope per `/integration/low-consequence-resolution.md`. Action classes qualify as Low only when **all** of the following hold: no client impact, no regulatory exposure, no irreversibility, no PII processing, no financial exposure, no safety implications, no precedent-creation. The AEM per-action accountability minimum bar ([`manifesto/manifesto-principles-12.md`](/manifesto/manifesto-principles-12.md#12-accountability-requires-visibility) P12) does not apply to actions in this class. Instead: workflow-level accountability — a named human owns the workflow, accepts accountability for its design, its class assignment, and its periodic review. Individual actions are logged with reasoning chain, claims cited (if any), and the workflow tag. Post-hoc audit sampling (recommended: ≥1% or ≥30 actions per workflow per month, whichever is larger) is reviewed by the workflow owner. Any action that breaches any of the seven criteria is immediately reclassified and AEM-governed remediation applies."

### 6.2 Replacement for the companion-guide table row

The Low row of the table at `agentic-enterprise-manifesto/companion-guide.md:134` is updated so that:

- The "Named human" cell reads: "Workflow owner (carve-out applies — see `/integration/low-consequence-resolution.md`)".
- The "Review requirement" cell reads: "Post-hoc audit sampling at ≥1% or ≥30 actions / workflow / month, whichever is larger".
- The "Evidence" cell reads: "Continuous action log with reasoning chain, claims cited, workflow tag, retained ≥90d".
- The "Response on epistemic failure" cell is unchanged ("Continue with enhanced monitoring").

A new row of explanatory text below the table is added:

> "Low is the only class outside the AEM-governed envelope. Qualification requires all seven carve-out criteria in `/integration/low-consequence-resolution.md` §3.1. Defaulting to Low without those criteria demonstrably true is a governance failure, not a tier election."

---

## 7. Cross-references

- [`manifesto/manifesto-principles-12.md`](../manifesto/manifesto-principles-12.md#12-accountability-requires-visibility) P12 — the AEM minimum bar that the carve-out scopes around.
- `manifesto.md:295–312` — AEM "What this manifesto does not cover", which the optional AEM edit (§4.3) extends.
- `agentic-enterprise-manifesto/manifesto.md` Principle 8 — the AEnt-M paragraph being edited.
- `agentic-enterprise-manifesto/companion-guide.md:131–137` — the AEnt-M consequence-class table being edited.
- `governance/governance-integration-note.md` — Tier 4 + relocation + substrate-depth integration; the carve-out applies *inside* a Tier 4 envelope as an additional class scoping rule.
- `governance/authority-accountability-matrix.md` (DRAFT) — workflow-owner authority is named here.
- `integration/loop-readiness-for-agent-opportunities.md` — note that Low-class action classes still produce demand candidates that pass through the same loop-readiness gate; the carve-out is about action-execution accountability, not about specification creation.

---

## 8. DRAFT items needing author judgment

- **DRAFT — author choice needed.** The recommendation (Option B) must be ratified or replaced. If Option A is preferred, this artefact's §3 and §6 are inverted: tighten AEnt-M Low to per-action and remove the carve-out language.
- **DRAFT — author review needed.** The seven carve-out criteria in §3.1 are stated as conjunctive (all must hold). Whether any specific criterion can be relaxed for specific operational contexts is a regulatory-counsel question.
- **DRAFT — author review needed.** The sampling cadence in §3.2 ("≥1% or ≥30 actions / workflow / month, whichever is larger") is illustrative. Calibration should be by domain owner against historical incident rates.
- **DRAFT — author review needed.** Whether AEM's `manifesto.md:295–312` should be edited (§4.3). Recommended for readability; left to AEM author's judgment for whether to amend AEM itself.
