# AEM Principle Coverage Map

**Status:** Normative cross-framework appendix (Wave 3, item W3.10).
**Audience:** Readers of any of AEM, IGM, AEnt-M who need to know which AEM principles are extended, partially covered, missing, or delegated by IGM and AEnt-M.
**Purpose:** Replace the implicit and inconsistent coverage claims with one explicit map. For every AEM principle, state IGM's coverage status and AEnt-M's coverage status. For "Missing" or "Partial" entries, name the new IGM/AEnt-M principle (or stub, planned by other agents) that closes the gap. For "Delegated", state explicitly that the principle remains AEM's; the manifesto operates within its constraints without re-specifying.

**Glossary note.** "Epistemic tier" replaces IGM's "confidence" throughout. See `glossary.md` (repo root) for the term-collision appendix.

**Coverage statuses:**

- **Strong** — the manifesto explicitly addresses the AEM principle and extends or operationalises it for its layer.
- **Partial** — the manifesto touches the principle but does not address all minimum bars; the gap is named.
- **Missing** — the manifesto does not address the principle; named gap-closing artefact (existing or planned by other Wave 1/2 agents) is identified.
- **Delegated-to-AEM** — the manifesto explicitly defers to AEM; no re-specification at this layer; the manifesto operates within AEM's constraints without restating them.

---

## 1. The map

### AEM Principle 1 — Outcomes are the unit of work

Source: [`manifesto-principles-01.md`](../manifesto/manifesto-principles-01.md#1-outcomes-are-the-unit-of-work). Minimum bar: deployment + instrumentation + verification + validation.

| | IGM | AEnt-M |
|---|---|---|
| Coverage | **Partial** (drift) | **Partial** (drift) |
| What's addressed | IGM Principle 11 (traceability) operationalises one form of outcome — the agent action traceable to claim to source. IGM "domain Definition of Done" (8 criteria) addresses substrate-side outcome readiness. | AEnt-M P12 names "intelligence + agent + delivery" as three lifecycles producing outcomes; metrics in §Metrics provide outcome signals (substrate health, governance effectiveness, enterprise capability). |
| What's missing | The AEM Outcome cycle (Outcome → Evidence → Learning) is not mirrored in IGM's domain DoD. "Validation" in the AEM sense ("did we build the right thing?") has no IGM counterpart distinct from "claim validation" (an SME confirms a claim). | "Outcomes" at AEnt-M is enterprise outcomes; per-action outcomes (the AEM scope) are not mirrored. The four outcome claims (Evaluation / Verification / Validation / Independent validation) are not articulated. |
| Gap-closing | Vocabulary clarification in `glossary.md` (W2.1) — distinguish *outcome validation* from *claim validation*. IGM should add a note that domain DoD is substrate-side and does not displace AEM outcome accounting. | AEnt-M to add per-action outcome accounting via reference to `governance/evidence-bundle-schema.md` AEM components; explicitly delegate per-action outcome semantics to AEM P1. |

### AEM Principle 2 — Specifications are living artifacts that evolve through steering

Source: [`manifesto-principles-02.md`](../manifesto/manifesto-principles-02.md#2-specifications-are-living-artifacts-that-evolve-through-steering). Minimum bar: versioned, reviewable, machine-readable; specification convergence test.

| | IGM | AEnt-M |
|---|---|---|
| Coverage | **Partial** (drift) | **Missing** |
| What's addressed | IGM treats claims as living artifacts (provenance, supersession, decay), which is structurally similar to AEM's "specs are hypotheses." | AEnt-M says agents surface action opportunities (P6) but does not address what makes those opportunities *specifications* (versioning, reviewability, machine-readability). |
| What's missing | IGM does not address how *specifications about the substrate* (ontology, schema, decay rules) evolve. The semantic-authority role implies governance for ontology change, but the change-management discipline analogous to AEM P2 is not articulated. | The B8 problem identified in the coherence review: agent-surfaced opportunities bypassing the AEM 9-condition loop-readiness gate. |
| Gap-closing | IGM stub: "Substrate ontology change follows AEM P2 specification discipline." Light extension; no new IGM principle needed. | AEnt-M to add explicit AEM-loop-readiness gate for agent-surfaced opportunities (W1.8 / B8). The opportunity is a *demand candidate*; it becomes a specification only after passing the AEM 9-condition gate. See `governance/authority-accountability-matrix.md` row C5 + E4. |

### AEM Principle 3 — Architecture is defense-in-depth, not a document

Source: [`manifesto-principles-03.md`](../manifesto/manifesto-principles-03.md#3-architecture-is-defense-in-depth-not-a-document). Minimum bar: machine-enforced policies; defense-in-depth across structural, semantic, and behavioural layers.

| | IGM | AEnt-M |
|---|---|---|
| Coverage | **Missing** | **Missing** |
| What's addressed | Indirectly: IGM P9 (structured inquiry) and P11 (traceability) require machine-enforced patterns. P6 (four authorities) is a write-path access control. | Indirectly: AEnt-M P5 (retrieval / reasoning / action governance) implies three control layers. |
| What's missing | No IGM principle on substrate-architecture defense-in-depth. The integrity-verification claim in IGM P2 is mentioned but not enforced. The "claims are attack surfaces" addition is a gap closure (see below). | No AEnt-M defense-in-depth statement for the enterprise layer. The five-layer governance stack is named but its defense-in-depth interactions are not specified. |
| Gap-closing | New IGM principle "Claims are attack surfaces" (W1.3 / B3) — cryptographic provenance, write-path access controls, indirect prompt injection threat model. Closes the IGM gap. | AEnt-M to add P5 defense-in-depth detail: machine-enforced retrieval / reasoning / action layer separation (W3.8). And see W2.5 (security threat models for substrate; circuit-breakers for emergent multi-agent interaction; rate limits — added to both manifestos). |

### AEM Principle 4 — Right-size the swarm to the task

Source: [`manifesto-principles-04.md`](../manifesto/manifesto-principles-04.md#4-right-size-the-swarm-to-the-task). Minimum bar: typed/versioned/reconciled shared state; orchestrator tier containment; single commit path; conflict resolution.

| | IGM | AEnt-M |
|---|---|---|
| Coverage | **Missing** | **Missing** |
| What's addressed | IGM does not address agent topology. Implicit: the four authorities provide a coordination model for governance work, but not for agent-execution swarms. | AEnt-M Principle 12 names three concurrent lifecycles but not multi-agent coordination on the substrate. The "one substrate, not one mind" framing of P5 says agents share substrate but not how they coordinate. |
| What's missing | No IGM rule about how multiple agents reading/writing the substrate concurrently coordinate. Conflict resolution at the substrate level is implied by inference + revision authorities but not specified for agent-write contention. | No AEnt-M rule about right-sizing the agent set, single commit path, conflict resolution between agents on shared substrate. |
| Gap-closing | IGM stub: substrate-write contention is governed by Assertion authority + write-path access controls (W1.3). Multiple agents writing the same claim simultaneously requires Assertion authority adjudication. Add to IGM W2.3. | New AEnt-M section / principle for swarm coordination on substrate (W2.3): orchestrator tier containment in the AEnt-M sense (no agent in the enterprise can perform an action class above the consequence-class authorisation of its orchestrator), conflict resolution, single commit path on the substrate. |

### AEM Principle 5 — Autonomy is a tiered budget, not a switch

Source: [`manifesto-principles-05.md`](../manifesto/manifesto-principles-05.md#5-autonomy-is-a-tiered-budget-not-a-switch). Minimum bar: tier authorisation; tool authorisation; Tier 4 prerequisites; oversight pattern (HITL / HOTL / HOLL / EDL); blast-radius assessment.

| | IGM | AEnt-M |
|---|---|---|
| Coverage | **Partial** (drift) | **Partial** (drift) |
| What's addressed | IGM "confidence-to-action thresholds" (now: epistemic-tier thresholds, companion-guide.md:60–69) is a parallel autonomy gate but for the substrate axis. IGM does not redefine AEM tiers. | AEnt-M P7 (governance relocation) operates inside Tier 4 per `governance/governance-integration-note.md`. AEnt-M P8 (consequence-class accountability) is orthogonal to AEM tier. |
| What's missing | IGM does not state that the epistemic gate composes with AEM tier; the composition rule (W2.6) closes this. | AEnt-M does not explicitly state that relocation operates *inside* Tier 4 (the integration note now does). Oversight patterns (HITL / HOTL / HOLL / EDL) are not addressed at the enterprise layer. |
| Gap-closing | `governance/composition-rule.md` (this Wave 1 effort) makes the composition explicit. IGM should reference it from its principles or companion guide. | `governance/governance-integration-note.md` makes the inside-Tier-4 relationship explicit. AEnt-M P7 should reference it. AEnt-M to add an oversight-pattern map per consequence class (companion guide, W2.27). |

### AEM Principle 6 — Knowledge and memory are distinct infrastructure

Source: [`manifesto-principles-06.md`](../manifesto/manifesto-principles-06.md#6-knowledge-and-memory-are-distinct-infrastructure). Minimum bar: memory expiration, rollback, provenance; revalidation against current architecture.

| | IGM | AEnt-M |
|---|---|---|
| Coverage | **Strong** | **Strong** (via IGM ref) |
| What's addressed | IGM is the architecture behind AEM P6's declaration that "knowledge and memory are distinct infrastructure." IGM L2 is the institutional knowledge; L1 is working memory; L3 is foundational. Provenance, decay, contradiction handling, governance status — all are IGM strengths. | AEnt-M Principle 1 ("domain graph is enterprise infrastructure") and Principle 4 ("substrate deepens through use") explicitly delegate the substrate-side governance to IGM. |
| What's missing | The five "memory failure modes" in AEM P6 (memory poisoning, cross-agent contamination, consistency under concurrency, audit trail gap, knowledge contamination) are partially addressed by IGM (provenance, scope, contradiction handling) but the failure-mode framing is not mirrored. Memory poisoning specifically — where agents write incorrect learnings — overlaps IGM's substrate pollution failure mode. | — |
| Gap-closing | IGM to add a cross-reference subsection mapping AEM P6 failure modes to IGM mechanisms (memory poisoning ↔ substrate pollution + Capture validation; cross-agent contamination ↔ scope enforcement + scoped views; consistency under concurrency ↔ Assertion authority; audit trail gap ↔ point-in-time provenance snapshots; knowledge contamination ↔ AEM P6's provenance label propagation, also relevant to IGM P10 feedback observations). | None — AEnt-M correctly delegates. |

### AEM Principle 7 — Context is engineered like code

Source: [`manifesto-principles-07.md`](../manifesto/manifesto-principles-07.md#7-context-is-engineered-like-code). Minimum bar: retrieval performance + context quality (no stale embeddings, no semantic precision failures, no authority-weighting errors).

| | IGM | AEnt-M |
|---|---|---|
| Coverage | **Partial** (drift) | **Partial** |
| What's addressed | IGM L1 working memory addresses scope-match enforcement, freshness gates, confidence floors, and contradiction surfacing — all are AEM P7 minimum-bar concerns at the substrate level. | AEnt-M P5 (scoped views) is the enterprise-layer expression of AEM P7. |
| What's missing | IGM does not address retrieval performance (the time dimension of AEM P7); the assumption is that fast retrieval is an engineering concern, not a governance concern. | No metrics in AEnt-M for retrieval-quality at runtime. |
| Gap-closing | IGM stub: retrieval performance is delegated to AEM P7 within the engineering loop; substrate-side filtering (L1) is the IGM contribution. Light cross-reference. | AEnt-M to define scoped-view filtering rules (W3.8). |

### AEM Principle 8 — Evaluations are the contract; proofs are a scale strategy

Source: [`manifesto-principles-08.md`](../manifesto/manifesto-principles-08.md#8-evaluations-are-the-contract-proofs-are-a-scale-strategy). Minimum bar: regression cases; verification ≠ validation ≠ independent validation; governance evaluations.

| | IGM | AEnt-M |
|---|---|---|
| Coverage | **Missing** | **Missing** |
| What's addressed | IGM P3 says corroboration earns confidence — but corroboration is not validation against observable reality. | AEnt-M does not articulate evaluation portfolios at the enterprise layer. APLC has the behavioural evaluation portfolio for agent products. |
| What's missing | This is B2 from the coherence review. Two sources agreeing on a falsehood produce a high-confidence wrong claim. AEnt-M's "decision quality post-action" metric is the closest, but it is enterprise-level monitoring, not evaluation. | AEnt-M should adopt AEM P8 evaluation portfolio for any system in scope, and add governance evaluations for the substrate (W2.5) — substrate-quality evaluations as a precondition for governance relocation. |
| Gap-closing | New IGM principle (W1.2 / B2): "Claims must be validatable, not only corroborated." Promotion to Confirmed+ requires at least one validation event against an observable reality not used as a corroborating source. | AEnt-M to add an evaluation-portfolio principle (W2.5) for governance evaluations of the substrate, plus reference to AEM P8 for agent-product evaluations. |

### AEM Principle 9 — Observability and interoperability cover reasoning, not just uptime

Source: [`manifesto-principles-09.md`](../manifesto/manifesto-principles-09.md#9-observability-and-interoperability-cover-reasoning-not-just-uptime). Minimum bar: traces sufficient to answer "why did this happen"; governance-state observability.

| | IGM | AEnt-M |
|---|---|---|
| Coverage | **Partial** (drift) | **Partial** |
| What's addressed | IGM P11 (traceability) is observability for substrate. The 25 canonical governance queries (`intelligence-governance-manifesto/governance/queries.md`) are governance-state observability for IGM. | AEnt-M Metrics §3 (Substrate health, Governance effectiveness, Enterprise capability) provides observable signals. |
| What's missing | IGM observability is claim-centric; reasoning-trace observability (the AEM sense of "why did the agent decide this?") is delegated to AEM. The integration is implicit. | AEnt-M does not specify a single integrated trace format. The B7 problem (three audit trails). |
| Gap-closing | IGM stub: reasoning traces are AEM's concern; substrate citations within those traces are IGM's concern. The unified evidence bundle (W1.7 + this map's Section 1 reference) integrates them. | `governance/integrated-audit-trail.md` (this Wave 2 effort, W2.16) shows how the three trails interleave. |

### AEM Principle 10 — Assume emergence; engineer containment

Source: [`manifesto-principles-10.md`](../manifesto/manifesto-principles-10.md#10-assume-emergence-engineer-containment). Minimum bar: chaos-tested + threat-modelled (prompt injection, privilege escalation, exfiltration, supply chain, social engineering); governance failure modes (evidence laundering, approval laundering, compliance theatre, stale-control reliance, automated rubber-stamping, waiver accumulation).

| | IGM | AEnt-M |
|---|---|---|
| Coverage | **Missing** (security) | **Partial** (epistemic only) |
| What's addressed | IGM P2 mentions "verifiable for integrity" but does not specify mechanism. The "Adversarial compromise" failure mode (manifesto.md:180–181) is named but not threat-modelled. | AEnt-M P11 is an epistemic circuit-breaker (epistemic emergence, not behavioural emergence in the AEM P10 sense). AEnt-M failure modes (manifesto.md:181–195) cover initiative theatre, substrate monoculture, governance accumulation, etc., but not adversarial substrate attacks. |
| What's missing | This is B3 from the coherence review. No substrate threat model; no claim-poisoning, provenance-spoofing, contradiction-injection, or indirect-prompt-injection treatment. | No multi-agent interaction containment; no rate limits; no behavioural-emergence circuit breakers (only epistemic). |
| Gap-closing | New IGM principle (W1.3 / B3): "Claims are attack surfaces." Cryptographic provenance, write-path access controls, indirect-prompt-injection threat model, contradiction-injection attack class added to red-team protocols. | AEnt-M to add containment principle for multi-agent interaction (W2.5): rate limits per agent + per substrate class, circuit breakers for cross-agent feedback loops, anomaly detection for emergent multi-agent behaviour. |

### AEM Principle 11 — Optimize the economics of intelligence

Source: [`manifesto-principles-11.md`](../manifesto/manifesto-principles-11.md#11-optimize-the-economics-of-intelligence). Minimum bar: model choice is runtime decision; total cost of correctness; governance overhead vs value.

| | IGM | AEnt-M |
|---|---|---|
| Coverage | **Weakened** (P12 budget only) | **Missing** |
| What's addressed | IGM P12 ("No unfunded mandates") addresses curation funding, which is an economic input. It does not address total cost of correctness or runtime model routing. | AEnt-M does not address economics of agentic operation; "compounding intelligence over scaling compute" is a value but does not articulate cost-of-correctness. |
| What's missing | IGM has no concept of total cost of correctness for substrate operation (curation cost vs value of substrate use). Decay management implies a cost trade-off but does not name it. | No AEnt-M economics principle. |
| Gap-closing | IGM stub: extend P12 to "intelligence economics" — total cost of correctness for substrate operation = ingest cost + curation cost + revalidation cost + drift remediation cost; this must be ≤ value generated through use. Light extension. | New AEnt-M principle / section (W2.4): "Cost of governance must be proportionate to value of governed action." When governance overhead exceeds value (per AEM P11 minimum bar), simplify; reduce autonomy tier; deprecate redundant gates. Reference `governance/authority-accountability-matrix.md` row D4. |

### AEM Principle 12 — Accountability requires visibility

Source: [`manifesto-principles-12.md`](../manifesto/manifesto-principles-12.md#12-accountability-requires-visibility). Minimum bar: named human; visibility into reasoning; oversight-adequacy metrics; agents may not accept residual risk / approve production exposure / waive controls.

| | IGM | AEnt-M |
|---|---|---|
| Coverage | **Partial** (drift) | **Strong** (extended) |
| What's addressed | IGM's four authorities provide named-human accountability for substrate-side decisions. | AEnt-M P8 extends AEM P12 with consequence-class accountability — the most substantive extension of AEM in either manifesto. |
| What's missing | IGM does not articulate that authorities cannot accept residual risk for the substrate (can a Revision authority unilaterally accept a known-poisoned claim? AEM P12 says no, IGM does not say). | AEnt-M Low consequence as currently written (Workflow Owner with audit sample) is *softer* than AEM P12 minimum bar (per-action accountability). This is B10 from the coherence review. |
| Gap-closing | IGM stub: authorities are subject to AEM P12 minimum bars — cannot waive scope, cannot accept residual risk on substrate components, cannot bypass IGM/AEM-required reviews. Add to IGM P6. | Per `governance/authority-accountability-matrix.md` row E3, default resolution: tighten Workflow Owner accountability to per-action post-hoc 100% audit sample within 5 business days. Confirms AEM minimum bar. |

---

## 2. Coverage summary

| Principle | IGM | AEnt-M |
|---|---|---|
| 1 — Outcomes | Partial (drift) | Partial (drift) |
| 2 — Specifications | Partial (drift) | Missing → closed by W1.8 / B8 |
| 3 — Architecture | Missing → closed by W1.3 / B3 + W3.8 | Missing → closed by W2.5 |
| 4 — Right-size the swarm | Missing → addressed via Assertion-authority arbitration | Missing → closed by W2.3 |
| 5 — Autonomy tiers | Partial (drift) → composed by `governance/composition-rule.md` | Partial (drift) → composed by `governance/governance-integration-note.md` |
| 6 — Knowledge & memory | Strong | Strong (via IGM ref) — Delegated-to-AEM for memory-failure-mode framing |
| 7 — Context | Partial (drift) — Delegated-to-AEM for retrieval performance | Partial — closed by W3.8 (scoped-view rules) |
| 8 — Evaluations | Missing → closed by W1.2 / B2 | Missing → closed by W2.5 |
| 9 — Observability | Partial (drift) — Delegated-to-AEM for reasoning traces | Partial — closed by W2.16 (`governance/integrated-audit-trail.md`) |
| 10 — Containment | Missing → closed by W1.3 / B3 | Partial (epistemic only) → closed by W2.5 |
| 11 — Economics | Weakened → light extension to IGM P12 | Missing → closed by W2.4 |
| 12 — Accountability | Partial (drift) — closed by light addition to IGM P6 | Strong (extended) — Low-consequence resolved per `governance/authority-accountability-matrix.md` row E3 |

**Five clusters of gaps** (per the coherence review's Theme T2):

- **Architecture (P3) and Containment (P10)** — both manifestos missing; closed by `governance/foundation-model-third-party-register.md` (third-party / supply chain), W1.3 (claims as attack surfaces), W2.5 (multi-agent containment), W3.8 (machine-enforced retrieval / reasoning / action layer separation).
- **Swarm coordination (P4)** — both manifestos missing; closed by W2.3.
- **Evaluations (P8)** — both missing; closed by W1.2 (IGM) + W2.5 (AEnt-M).
- **Economics (P11)** — IGM weakened, AEnt-M missing; closed by extending IGM P12 + adding AEnt-M economics principle (W2.4).
- **Architecture composition** — Tier-by-tier-by-class composition not specified; closed by `governance/composition-rule.md` and `governance/governance-integration-note.md`.

---

## 3. Delegated-to-AEM principles (explicit list)

For each principle marked Delegated, the relevant manifesto operates within AEM's constraints without re-specifying. The list:

- **AEM P6 (memory failure modes framing)** — Delegated to AEM by AEnt-M. AEnt-M does not redefine memory failure modes; it operates within AEM P6. (IGM extends, not delegates — IGM is the substrate architecture.)
- **AEM P7 (retrieval performance)** — Delegated to AEM by IGM. The time dimension of context retrieval is an engineering concern. IGM addresses substrate-side filtering only.
- **AEM P9 (reasoning traces)** — Delegated to AEM by IGM and AEnt-M. Reasoning-trace observability is AEM's responsibility; substrate citations within those traces are IGM's. Integration is via the unified evidence bundle.

For Delegated principles, neither IGM nor AEnt-M may state a competing minimum bar. Where they have written principles that touch the delegated area, those principles must be edited (in the editorial pass at Wave 3 / Wave 4) to make the delegation explicit and the cross-reference to AEM clear.

---

## 4. Cross-references

- `governance/governance-integration-note.md` — composition of Tier 4 + relocation + substrate depth.
- `governance/authority-accountability-matrix.md` — who decides at the cross-framework boundaries.
- `governance/composition-rule.md` — formal MIN rule for action permission.
- `governance/evidence-bundle-schema.md` — unified bundle.
- `governance/integrated-audit-trail.md` — three trails interleaved.
- `governance/phase-level-matrix.md` — safe operating points.
- `igm-aent-coherence-review.md` Theme T2 — the original coverage matrix.
- `glossary.md` (repo root) — term-collision appendix.

---

## 5. DRAFT items needing author judgment

- **DRAFT — author review needed:** the IGM "weakened" rating on P11 (Economics) treats P12 ("No unfunded mandates") as the IGM economic principle. This is a generous reading; some reviewers may rate IGM "Missing" on P11. Confirm with IGM authors.
- **DRAFT — author review needed:** the resolution of B10 (Low consequence vs AEM P12 minimum bar) is recorded as "tighten Workflow Owner accountability to per-action post-hoc 100% audit sample within 5 business days." Confirm with AEnt-M authors that they prefer this over the alternative ("declare Low consequence below AEM scope"). Both are acceptable; this map records the former as the resolved default.
- **DRAFT — author review needed:** several "Delegated-to-AEM" callouts (P6 memory failure modes; P7 retrieval performance; P9 reasoning traces) require explicit cross-reference text to be added to IGM and AEnt-M principles in the Wave 3 editorial pass. The map names where; the editorial pass writes the text.
