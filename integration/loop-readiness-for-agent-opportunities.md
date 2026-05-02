# Loop-Readiness for Agent-Surfaced Action Opportunities

**Status:** Normative cross-framework artefact (Wave 1, item W1.8 / B8).
**Audience:** AEM authors, AEnt-M authors, ASDLC release managers, APLC product managers, demand-governance owners, internal audit (3rd line).
**Purpose:** Resolve the contradiction between AEM's upstream loop-readiness gate (specifications come from validated demand governance, *out of scope* for AEM execution — `manifesto.md:191–239`, `manifesto.md:295`) and AEnt-M's worked example in which an agent *generates* an action opportunity ("The agent was not assigned this task" — `agentic-enterprise-manifesto/manifesto.md:175`). Without this artefact, agent-surfaced opportunities either (a) bypass AEM's nine-condition gate, fragmenting demand governance, or (b) freeze enterprise initiative entirely because every emitted opportunity is treated as a loop-ready specification.

**Glossary note — "epistemic tier".** Throughout this document, "epistemic tier" refers to what IGM previously called "confidence" (Provisional, Candidate, Confirmed, High Confidence, Authoritative). See repo-root `glossary.md` for the unified term-collision appendix.

---

## 1. The conflict, sourced

### 1.1 AEM — loop-readiness is a nine-condition upstream gate

AEM places specification readiness *before* the engineering loop and *outside* AEM's scope:

> "A specification is **loop-ready** when all of the following are true: business need validated; value measurable; acceptance criteria expressible; constraints identified; accountable human named; blast radius assessed; out-of-scope explicitly stated."
> — `manifesto.md:198–232`

> "If these conditions are not met, the work is not loop-ready and should not enter the loop. Resolving these gaps requires demand governance upstream of engineering execution — clarifying the need, establishing measurable success criteria, and confirming constraints before the loop runs."
> — `manifesto.md:234`

> "Out of scope: Business need validation, demand prioritisation, portfolio governance, and specification readiness — the upstream work that determines what enters the loop."
> — `manifesto.md:295`

AEM's position is unambiguous: a specification arrives at Specify only after a separately governed demand process has validated the nine conditions. AEM does not adjudicate where the specification came from, only that it is ready.

### 1.2 AEnt-M — agents may surface opportunities

AEnt-M's worked example shows an agent generating an action opportunity:

> "An agent with initiative surfaces the action opportunity. A settlement operations agent, reasoning over the updated substrate, perceives that three cross-border settlement programmes reference the superseded methodology. It surfaces this as an action opportunity to the governance team... The agent was not assigned this task."
> — `agentic-enterprise-manifesto/manifesto.md:173–175`

AEnt-M Principle 6 frames initiative as the capacity to surface opportunities aligned with institutional purpose before being asked (`agentic-enterprise-manifesto/manifesto.md:101–106`). Without integration, this either:

- treats agent-surfaced opportunities as loop-ready specifications and bypasses AEM's nine-condition gate (regulatory and governance failure); or
- prevents agents from surfacing anything, since no agent-emitted output can satisfy "business need validated" or "accountable human named" by itself (initiative theatre).

### 1.3 The hidden third position

Both manifestos implicitly assume the *other* governs the missing step. AEM expects upstream demand governance to feed it loop-ready specifications; AEnt-M expects agents to surface opportunities and *something* to absorb them. Neither names the absorbing layer. Without it, agent initiative is unmoored from the engineering loop, and demand governance has no entry point for agent-generated input.

---

## 2. The integration rule (normative)

### Rule R1 — Agent-surfaced opportunities are demand candidates, not loop-ready specifications.

An agent operating with initiative under AEnt-M Principle 6 may surface an *action opportunity*. The output of that surfacing is a **demand candidate**: a structured proposal that enters demand governance as input, not the engineering loop as a specification. Demand candidates carry no implicit authorisation, no accountable human, no validated business need, and no measurable success criterion — those are produced by the demand governance process the candidate enters.

A demand candidate becomes a loop-ready specification *only* after passing AEM's nine-condition loop-readiness gate (`manifesto.md:198–232`). The gate is unchanged by the source of the candidate: agent-surfaced candidates, human-articulated demand, regulatory triggers, and operational incident learnings all converge at the same gate and must satisfy the same nine conditions.

### Rule R2 — Demand governance is the absorbing layer.

The layer that absorbs demand candidates is the demand-governance function — formalised for the agentic stack in ASDLC Layer 1 (`asdlc/asdlc.md:60–80`) and equivalent product-side governance for APLC Stage 1. The function is normatively described as follows:

- An **opportunity registry** receives demand candidates with their full record (see §4 schema below). The registry is the system of record for everything the substrate has surfaced, regardless of whether the candidate ever becomes a specification.
- **Human triage** (named role: demand owner, product owner, or governance authority depending on context) reviews each candidate and routes it to one of four outcomes: (a) advance to loop-readiness review, (b) hold pending information, (c) merge with an existing demand item, or (d) reject with reason. Triage is recorded.
- **Loop-readiness review** is the AEM nine-condition assessment. It is conducted with the named accountable human (P12 anchor) actually present — not by the agent, not by a delegate. Outcomes: (a) pass — the demand candidate is now a loop-ready specification and enters AEM Specify; (b) fail with remediation plan — gaps identified, demand governance owns closure; (c) reject — demand candidate is closed.
- **Audit trail** retains every demand candidate, triage decision, and loop-readiness review outcome for at least the slowest decay class of any cited substrate claim. Rejected candidates are retained because rejection patterns themselves are governance signals (`agentic-enterprise-manifesto/manifesto.md:213` — "coherence without initiative").

### Rule R3 — Agents do not promote their own candidates.

A candidate surfaced by an agent cannot be advanced through triage or loop-readiness review by the same agent or any agent acting on its behalf. The triage and review steps require named human authority. This is a direct application of AEM P12 (`manifesto.md:130` — "Agents execute. Humans are accountable.") and the AEnt-M companion-guide consequence-class accountability model (`agentic-enterprise-manifesto/companion-guide.md:131–137`).

The consequence class of the *prospective* action class governs which human authority must be involved at triage and at loop-readiness review:

| Prospective consequence class | Triage authority | Loop-readiness review authority |
|---|---|---|
| Low | Workflow owner | Workflow owner |
| Medium | Decision reviewer | Decision reviewer + product owner |
| High | Accountable authority | Accountable authority + product owner |
| Critical | Dual authority | Dual authority + governance authority |

If the consequence class cannot be estimated at triage, the candidate routes to the highest plausible class until a class assignment is made. Defaulting to Low is a process failure.

### Rule R4 — The substrate is not authority.

A demand candidate may cite substrate claims (per IGM provenance) as part of its reasoning chain. The substrate's epistemic tier on those claims is *evidence* for the candidate's plausibility; it is not authorisation. Even an action opportunity grounded entirely in Authoritative-tier claims still requires human triage, loop-readiness review, and the named accountable human under AEM P12.

This is a direct application of the AEM/IGM/AEnt-M composition rule (see `governance/composition-rule.md` once written; for now, see `governance/governance-integration-note.md` Rule R2): substrate depth is necessary but not sufficient for autonomous operation, and is *never* sufficient for specification-creation.

### Rule R5 — The opportunity record is the integration artefact.

Every agent-surfaced demand candidate carries an **opportunity record** with the schema in §4 below. The opportunity record is the bridge object: the agent emits it, the registry stores it, triage and review consume it, and (if it becomes a specification) it is referenced from the resulting specification's provenance chain so the chain back to the originating substrate event is auditable.

---

## 3. The workflow (normative)

```
                      AEnt-M layer (governed agent on governed substrate)
                                            |
                                            v
              [Agent surfaces opportunity from substrate reasoning]
                                            |
                                            | emit opportunity record (§4)
                                            v
                              ===========================
                              | Opportunity registry    |  (system of record)
                              ===========================
                                            |
                                            v
                          [Human triage — see Rule R3 table]
                                            |
                          /------------------+------------------\
                          |                  |                  |
                          v                  v                  v
                       Reject            Hold/Merge          Advance
                          |                  |                  |
                                             |                  v
                                             |     [Loop-readiness review]
                                             |     (AEM 9-condition gate,
                                             |     manifesto.md:198–232)
                                             |                  |
                                             |        /---------+---------\
                                             |        |                   |
                                             |        v                   v
                                             |    Fail / remediation     Pass
                                             |        |                   |
                                             |        v                   v
                                             v   demand-gov closes  =================
                                         registry                   | Specification |
                                                                    | (loop-ready)  |
                                                                    =================
                                                                            |
                                                                            v
                                                                      AEM Specify
                                                                      (Layer 2)
```

### Phase 1 — Surface

The agent, operating within an approved Tier 4 envelope or under an explicit AEM tier authorisation, identifies a pattern in the substrate that meets AEnt-M Principle 6's three conditions (substrate depth, constraint legibility, governance relocation — `agentic-enterprise-manifesto/manifesto.md:101–106`) and emits an opportunity record. The agent does not initiate execution. Emitting is not actioning.

### Phase 2 — Register

The opportunity record is appended to the opportunity registry. Registration is unconditional: the registry stores every emitted record so that suppression, gaming, or selective surfacing is detectable on audit.

### Phase 3 — Triage

The triage authority (per Rule R3) reviews the candidate against four criteria:

1. **Plausibility** — does the cited substrate evidence support the candidate's reasoning chain?
2. **Alignment** — does the proposed action class align with organisational purpose, current strategy, and risk appetite?
3. **Duplication** — is this candidate a duplicate of, or merge-target for, an existing demand item?
4. **Class estimation** — what is the prospective consequence class?

Triage outputs one of four decisions: advance, hold, merge, reject. Each decision is recorded with the deciding authority, timestamp, and free-text reason.

### Phase 4 — Loop-readiness review

If triage advances the candidate, the loop-readiness review applies AEM's nine conditions verbatim (`manifesto.md:198–232`):

1. Business need validated.
2. Value measurable.
3. Acceptance criteria expressible.
4. Constraints identified.
5. Accountable human named (the P12 anchor).
6. Blast radius assessed.
7. Out-of-scope explicitly stated.
8. *(per the AEM minimum bar)* What does business success look like and how will it be measured? — answerable.
9. *(implicit in AEM scope text)* The demand sits inside an AEM-conformant operating envelope.

The agent-emitted reasoning chain may inform some conditions (e.g., the substrate evidence may support business need validation), but the review and its sign-off are human acts. Conditions that cannot be satisfied trigger remediation in demand governance, not in the engineering loop.

### Phase 5 — Specify (or close)

On pass, the loop-ready specification enters AEM Specify (`manifesto.md:69`). Its provenance chain references the opportunity record so the regulator-readable trace is: substrate event → opportunity record → triage decision → loop-readiness review → specification → ... → action.

On fail with remediation, demand governance owns closure. The candidate remains in the registry under hold; the specification is not created.

On reject (at triage or review), the candidate is closed and a closure reason is recorded. The registry retains the closed record.

---

## 4. Opportunity record schema (normative)

The opportunity record is a structured object emitted by the surfacing agent and consumed by the registry, triage, and review functions. Required fields:

| Field | Type | Description |
|---|---|---|
| `record_id` | UUID | Globally unique opportunity identifier. |
| `initiator_agent_id` | string | Identifier of the agent that surfaced the opportunity (per APLC composite-state record). |
| `initiator_csh` | string | The Composite State Hash (`aplc/aplc.md` §1) of the surfacing agent at the moment of surfacing. |
| `initiator_envelope_id` | string | The AEM Tier 4 envelope identifier under which the agent is operating (or `tier-3-or-below` if not in an envelope). |
| `surfaced_timestamp` | ISO 8601 | When the agent emitted the record. |
| `domain` | string | The governance domain the opportunity is scoped to (per the substrate's domain partitioning). |
| `reasoning_chain` | array of `reasoning_step` | The agent's reasoning, step by step, from substrate observation to opportunity. Each step references at least one cited claim. |
| `claims_cited` | array of `claim_ref` | Ordered list of every IGM claim cited in the reasoning chain, including: `claim_id`, `epistemic_tier_at_surfacing`, `provenance_chain_root`, `validation_event_ref` (per IGM P13). |
| `contradictions_observed` | array of `contradiction_ref` | Any active contradictions in the cited claim set, typed per IGM P4 (logical, jurisdictional, temporal supersession, scope, extraction). |
| `proposed_action_class` | string | The action class the agent proposes (per the AEnt-M class register — see `governance/governance-integration-note.md`). |
| `consequence_class_estimate` | enum {`Low`, `Medium`, `High`, `Critical`, `Unknown`} | The agent's estimated consequence class (per AEnt-M P8). `Unknown` is allowed; it routes to the highest plausible class at triage. |
| `blast_radius_estimate` | structured | Quantified or bracketed maximum credible impact estimate, per AEM loop-readiness condition 6. |
| `business_value_hypothesis` | string | The agent's articulation of why this opportunity matters institutionally (input to the human triage's "alignment" check). |
| `out_of_scope_explicit` | string | What the proposed action explicitly does *not* cover (input to AEM loop-readiness condition 7). |
| `demand_candidate_status` | enum | One of: `surfaced`, `triaged`, `held`, `merged`, `advanced`, `rejected`, `passed-loop-readiness`, `superseded`. |
| `triage_record` | structured | Triage authority, decision, timestamp, reason. Populated at Phase 3. |
| `loop_readiness_review` | structured | Reviewer identity (P12 anchor + others per Rule R3), per-condition pass/fail/remediation, timestamp. Populated at Phase 4. |
| `specification_ref` | string | UUID of the loop-ready specification, if pass. Empty otherwise. |
| `closed_timestamp` | ISO 8601 | When the record reached a terminal status (`rejected`, `merged`, `superseded`, or `passed-loop-readiness`). |

The schema is referenced from `governance/evidence-bundle-schema.md` so that any specification that originated as an agent-surfaced opportunity carries its `record_id` in its provenance chain, and any audit can trace from action through specification through opportunity record back to the originating substrate event.

> **DRAFT — author review needed.** The exact shape of `reasoning_step`, `claim_ref`, and `contradiction_ref` is delegated to the unified `governance/evidence_bundle.schema.json` to avoid schema drift across artefacts. The list above is the field-level contract; the implementation lives in the JSON schema.

---

## 5. Edge cases and disambiguations

### 5.1 What if the agent surfaces a candidate whose action class would be Critical?

The candidate enters the registry with `consequence_class_estimate = Critical` (or `Unknown`, escalated to Critical at triage). Triage requires Dual Authority; loop-readiness review requires Dual Authority + governance authority. The agent's surfacing is unaffected by the consequence class — the agent emits at any class — but the absorbing process is class-calibrated.

### 5.2 What if the candidate is grounded in a single cited claim at Provisional epistemic tier?

The candidate is registered. Triage will likely route to `held` pending claim corroboration or to `rejected` for insufficient evidence. The registry retains the record. This is by design: low-tier-grounded surfacings are still signal — they tell the governance team which substrate regions the agent is reasoning over and where the substrate may need reinforcement (`intelligence-governance-manifesto/manifesto.md:107` — Expand stage feedback).

### 5.3 What if multiple agents surface the same opportunity within a short window?

Triage merges duplicates. The merged record retains references to every initiator agent (so suppression of any one agent does not drop the candidate), and `demand_candidate_status` becomes `merged` for the duplicates with the surviving record's `record_id` recorded.

### 5.4 What if the agent's surfacing rate is anomalously high?

This is detectable from the registry and is a governance event, not an entry into the loop. AEnt-M's Metrics section (`agentic-enterprise-manifesto/manifesto.md:251–257` — Action opportunities surfaced; Accepted action opportunities; <20% acceptance rate as a warning) covers this. A surfacing rate that is high with a low triage-advance rate is *initiative theatre* (`agentic-enterprise-manifesto/manifesto.md:208`); the response is to investigate the agent's substrate-reasoning quality, not to silence the agent.

### 5.5 What if a candidate is advanced through triage but the loop-readiness review fails on, say, "accountable human named"?

The candidate enters `held` with a remediation note: identify the accountable human, demonstrate willingness to accept P12 anchor accountability, then re-submit. The opportunity does not enter the engineering loop until and unless the gap closes. This is the correct outcome — AEM's nine conditions are non-negotiable.

### 5.6 Can the demand-governance function be partially automated by a *different* agent?

Yes, with constraints. ASDLC's demand-intelligence function (`asdlc/demand/intelligence.md` — referenced from `asdlc/asdlc.md:72–80`) explicitly uses agentic mechanisms to surface candidate demand items from environmental signals. The same constraint applies: agent assistance at triage is permitted; the *triage decision* must be human (per Rule R3). Agent-prepared triage briefs are governed under the same epistemic-tier-and-named-reviewer model that APLC governance agents follow (`aplc/aplc.md:215–235`).

---

## 6. Mapping to the five-layer stack

| Layer | Role in this workflow |
|---|---|
| AEnt-M | Defines initiative (P6) and authorises the agent's surfacing. Provides the substrate-reasoning conditions that make plausible candidates emerge. |
| IGM | Provides the substrate the agent reasons over. Provenance chains, epistemic tiers, contradictions, and validation events (P13) populate the opportunity record's evidence fields. |
| ASDLC | Defines Layer 1 (Demand & Value) which absorbs the candidate. The opportunity registry is an ASDLC Layer 1 artefact; loop-readiness is its exit gate (`asdlc/asdlc.md:60–80`). |
| APLC | Provides the agent's product-side governance. The agent's CSH and envelope identifier in the opportunity record link the candidate to the governing APLC stage. |
| AEM | Defines the loop-readiness gate (`manifesto.md:198–232`) and the engineering loop the resulting specification enters. AEM does not concern itself with the candidate's origin, only that nine conditions are met. |

This is why the "complementary" framing in earlier IGM/AEnt-M positioning was inadequate (`igm-aent-coherence-review.md` Theme T3): without explicit layering, no layer owned the absorbing function. With layering, ASDLC Layer 1 is the named owner.

---

## 7. What this artefact does *not* do

- It does not change AEM's nine-condition gate. The gate text is reused verbatim (`manifesto.md:198–232`).
- It does not specify *how* an agent identifies an opportunity — that is AEnt-M Principle 6 territory and depends on substrate depth in the agent's domain.
- It does not require all agent-surfaced output to enter the registry. Output that is purely advisory to a synchronous human decision (e.g., a recommendation produced inside a current AEM Plan or Execute phase, in response to a current task) is governed under AEM P5 autonomy tiers and does not separately enter the opportunity registry. The registry handles *unsolicited* surfacing — outputs the agent emits without an upstream task.
- It does not specify the registry's storage technology, query API, or UI. Those are implementation details delegated to the consuming organisation.
- It does not address the case of an agent surfacing an opportunity in a domain where no AEnt-M Initiative authorisation has been granted. That is a P0 finding under AEnt-M P6 — the agent should not be surfacing in that domain at all. The registry would still record it (audit trail), but triage would route to `rejected` and the surfacing event would trigger a P12-level governance review of the agent's authorisation scope.

---

## 8. Cross-references

- `agentic-enterprise-manifesto/manifesto.md:101–106` — AEnt-M Principle 6 (initiative).
- `agentic-enterprise-manifesto/manifesto.md:165–183` — worked example (regulatory change propagation), updated under this artefact to show the gate.
- `manifesto.md:198–239` — AEM nine-condition loop-readiness gate.
- `asdlc/asdlc.md:60–80` — ASDLC Layer 1 (Demand & Value), the absorbing layer.
- `aplc/aplc.md:92–96` — APLC Stage 1 conception, parallel absorbing layer for product-level demand candidates.
- `intelligence-governance-manifesto/manifesto-principles.md` (P11 traceability, P13 validation events) — provenance and validation evidence cited in opportunity records.
- `governance/governance-integration-note.md` — Tier 4 + relocation + substrate-depth integration; constrains where surfacing is permitted.
- `governance/authority-accountability-matrix.md` (DRAFT) — names the triage and review authorities by row.
- `governance/evidence-bundle-schema.md` — unified evidence bundle, of which the opportunity record is a referenced upstream object.
- `glossary.md` (repo root) — term-collision appendix and "epistemic tier" rename.

---

## 9. DRAFT items needing author judgment

- **DRAFT — author review needed.** Whether the opportunity registry should be a single enterprise registry or a federated set of domain registries (e.g., one per AEnt-M Phase 1 domain). The artefact assumes single-registry semantics for the audit chain, but federation is operationally common; if federated, each registry must use the same schema and the audit chain must traverse federation boundaries.
- **DRAFT — author review needed.** Whether `consequence_class_estimate = Unknown` should be permitted at all, or whether agents should be required to estimate before emission. Permitting `Unknown` reduces emission friction; requiring estimation forces the agent to ground its reasoning in the AEnt-M P8 model.
- **DRAFT — author review needed.** Whether the opportunity record should include a *retraction* field, allowing the surfacing agent to retract a candidate before triage if the substrate state changes (e.g., the cited claim is retired between surfacing and triage). This artefact does not currently include retraction; rejection-with-reason at triage is the alternative.
