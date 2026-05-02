# Phase × Maturity × Phase Compatibility Matrix

**Status:** Normative cross-framework matrix (Wave 2, item W2.17).
**Audience:** Programme leads adopting agentic frameworks; risk officers evaluating organisational readiness; regulators assessing whether a deployed system is operating at a safe combination of maturities.
**Purpose:** Provide a dense grid showing safe operating points for each combination of AEM Phase (1–6) × IGM Maturity Level (1–5) × AEnt-M Phase (1–5). Identify the unsafe combinations explicitly with reasons.

**Glossary note.** "Epistemic tier" replaces IGM's "confidence" throughout. See `glossary.md` (repo root) for the term-collision appendix.

---

## 1. The three axes

### 1.1 AEM Phase (1–6)

Phase progression for AEM teams (per `manifesto-principles.md:248–254` and the broader AEM adoption discussion):

| Phase | Description | Maximum autonomy tier |
|---|---|---|
| 1 | Initial individual use; no governance infrastructure | Tier 1 only |
| 2 | Early team adoption; fragmented practice | Tier 1 only |
| 3 | Formal team practice; some governance | Tier 1 only for governed production work |
| 4 | Verification gates operational; evidence bundles routine | Tier 2 |
| 5 | Full Agentic Loop with verification, validation, domain-scoped accountability | Tier 3 |
| 6 | Phase 5 + validated governance infrastructure (machine-enforced envelopes, control evaluations passing, governance observability, rubber-stamping detection) | Tier 4 |

(Note: AEM principles use "Phase 5+ with validated governance infrastructure" rather than naming Phase 6. For this matrix Phase 6 = the operational state where Tier 4 envelopes are authorised. The matrix uses Phase 6 for clarity.)

### 1.2 IGM Maturity Level (1–5)

IGM does not formally name maturity levels in the principles, but the implementation guide and the eight-criterion Definition of Done (`intelligence-governance-manifesto/manifesto.md:147–158`) imply a progression. For this matrix, the levels are:

| Level | Description |
|---|---|
| 1 | No governance; documents only; no claims; no provenance; no decay management |
| 2 | Initial claim extraction; some provenance; no governance authorities; no contradiction handling |
| 3 | All four authorities staffed; basic decay management; contradictions detected (manual); domain DoD criteria 1–4 (Populated, Connected, Validated, Governed) met for at least one domain |
| 4 | Domain DoD all eight criteria met for at least one domain; cascade analysis automated; feedback loops operational; authoritative-tier claims supported |
| 5 | Multi-domain substrate; cross-domain edges established; substrate fertility measurable; demonstrated control equivalence supports governance relocation; substrate-state attestation continuous |

### 1.3 AEnt-M Phase (1–5)

Per `agentic-enterprise-manifesto/manifesto.md:236–274`:

| Phase | Description |
|---|---|
| 1 | Governed substrate for one domain (weeks 1–8). No agents yet connected. |
| 2 | First governed agents (weeks 9–16). Restricted to advisory output; medium-consequence with human review on every recommendation. Composite state tracking deployed. |
| 3 | Governance relocation for first action classes (months 5–9). Demonstrated control equivalence for at least one action class. |
| 4 | Domain expansion (months 10+). Cross-domain linking; multiple domains. |
| 5 | Enterprise-scale initiative (12+ months). Multiple domains; agent portfolio governed via composite state; relocation across multiple action classes; agents surfacing action opportunities across domain boundaries. |

(Note: the phase-timeline arithmetic in AEnt-M source has identified inconsistencies — see `igm-aent-coherence-review.md` Theme T6, point W3.6. This matrix uses the phase descriptions, not the literal week ranges.)

---

## 2. The grid

Each cell records the **safe operating point** (✓ = safe; ✗ = unsafe) and, when unsafe, the **reason**. The grid has 6 × 5 × 5 = 150 cells. To make it manageable, the matrix is presented as five tables — one per AEnt-M Phase — with rows = AEM Phase and columns = IGM Maturity Level.

### Reading the cells

- **✓ Safe** — the combination is operationally meaningful and safe to operate.
- **✓ Constrained** — safe but with explicit constraints; operate only at the constrained scope. Constraints are listed.
- **✗ Unsafe — [reason]** — the combination is incompatible with the AEnt-M Phase shown; do not operate. Reason names the gap.
- **N/A** — the combination is logically impossible (e.g., AEnt-M Phase 5 requires multi-domain, which requires IGM Level ≥ 4).

### Table A — AEnt-M Phase 1 (Governed substrate for one domain; no agents yet)

|  | IGM L1 | IGM L2 | IGM L3 | IGM L4 | IGM L5 |
|---|---|---|---|---|---|
| **AEM 1** | ✓ Safe (no agents in scope) | ✓ Safe | ✓ Safe | ✓ Safe | ✓ Safe |
| **AEM 2** | ✓ Safe | ✓ Safe | ✓ Safe | ✓ Safe | ✓ Safe |
| **AEM 3** | ✓ Safe | ✓ Safe | ✓ Safe | ✓ Safe | ✓ Safe |
| **AEM 4** | ✓ Safe | ✓ Safe | ✓ Safe | ✓ Safe | ✓ Safe |
| **AEM 5** | ✓ Safe | ✓ Safe | ✓ Safe | ✓ Safe | ✓ Safe |
| **AEM 6** | ✓ Safe | ✓ Safe | ✓ Safe | ✓ Safe | ✓ Safe |

**Reading:** AEnt-M Phase 1 has no agents connected to the substrate yet. Substrate construction is independent of AEM phase; any AEM phase is compatible because no agents are reasoning over the substrate. The constraint at AEnt-M Phase 1 is on substrate scope (single domain), not on agent-side maturity.

### Table B — AEnt-M Phase 2 (First governed agents; advisory only; medium-consequence with HITL)

|  | IGM L1 | IGM L2 | IGM L3 | IGM L4 | IGM L5 |
|---|---|---|---|---|---|
| **AEM 1** | ✗ Unsafe — *AEM Phase 1 has no governance infrastructure for agent-substrate consumption* | ✗ Unsafe — same | ✗ Unsafe — same | ✗ Unsafe — same | ✗ Unsafe — same |
| **AEM 2** | ✗ Unsafe — *AEM Phase 2 has fragmented practice; cannot operate substrate-aware agents at medium consequence* | ✗ Unsafe — same | ✗ Unsafe — same | ✗ Unsafe — same | ✗ Unsafe — same |
| **AEM 3** | ✗ Unsafe — *AEM Phase 3 only Tier 1 for governed production work; no evidence bundles for IGM-cited actions* | ✗ Unsafe — same | ✓ Constrained — Tier 1 advisory only; HITL on every recommendation; substrate must be at IGM L3+ (four authorities staffed) | ✓ Constrained — Tier 1 advisory only; HITL on every recommendation | ✓ Constrained — Tier 1 advisory only; HITL on every recommendation |
| **AEM 4** | ✗ Unsafe — *substrate at L1 cannot supply confidence-tiered claims required for medium-consequence agent reasoning* | ✗ Unsafe — *substrate at L2 lacks staffed authorities; no governance for the substrate-side decisions agents will trigger* | ✓ Safe — Tier 2 with HITL; medium-consequence with reasoning chain review | ✓ Safe | ✓ Safe |
| **AEM 5** | ✗ Unsafe — *substrate L1 + AEM 5 = high autonomy on ungoverned substrate; the most dangerous combination* | ✗ Unsafe — *substrate L2 still lacks authority structure; AEM 5 production exposure is governed but substrate is not* | ✓ Safe — Tier 3 with full evidence bundle, HITL per consequence class | ✓ Safe | ✓ Safe |
| **AEM 6** | ✗ Unsafe — *Tier 4 envelope assumes governed substrate; L1 substrate cannot support envelope claims* | ✗ Unsafe — *L2 substrate lacks the authority structure that envelope-side claim references must trace to* | ✓ Constrained — Tier 4 envelope possible but only for action classes at AEnt-M Stage 1 (Full synchronous); substrate not yet sufficient for relocation | ✓ Safe | ✓ Safe |

**Notes for Table B:**

- **U1 (Unsafe combination 1):** AEM Phase ≤ 3 + AEnt-M Phase 2 — agents are connected to the substrate but the AEM team lacks infrastructure to govern the agent side (Tier 2+ requires verification gates per AEM Phase 4). Result: agent recommendations enter consumption without the AEM-side audit trail, which fails the unified evidence bundle's `aem_components` requirements (per `governance/evidence-bundle-schema.md`).
- **U2:** IGM L1 + any AEnt-M Phase ≥ 2 — agents reason over a substrate that has no claims, no provenance, no governance. Agent outputs have no traceable knowledge basis. This violates IGM P11 (traceability) and AEM P12 (accountability) simultaneously.

### Table C — AEnt-M Phase 3 (Governance relocation for first action classes; demonstrated control equivalence)

|  | IGM L1 | IGM L2 | IGM L3 | IGM L4 | IGM L5 |
|---|---|---|---|---|---|
| **AEM 1** | ✗ Unsafe — *AEM 1 has no envelope concept; relocation requires Tier 4* | ✗ Unsafe | ✗ Unsafe | ✗ Unsafe | ✗ Unsafe |
| **AEM 2** | ✗ Unsafe — same | ✗ Unsafe | ✗ Unsafe | ✗ Unsafe | ✗ Unsafe |
| **AEM 3** | ✗ Unsafe — same | ✗ Unsafe | ✗ Unsafe | ✗ Unsafe | ✗ Unsafe |
| **AEM 4** | ✗ Unsafe | ✗ Unsafe | ✗ Unsafe — *AEM 4 max tier is 2; relocation to substrate-resident enforcement requires Tier 4* | ✗ Unsafe — same | ✗ Unsafe — same |
| **AEM 5** | ✗ Unsafe | ✗ Unsafe | ✗ Unsafe — *AEM 5 max tier is 3; relocation requires Tier 4 envelope per `governance/governance-integration-note.md` Rule R1* | ✗ Unsafe — same | ✗ Unsafe — same |
| **AEM 6** | ✗ Unsafe — *L1 substrate cannot supply control-equivalence evidence* | ✗ Unsafe — *L2 substrate lacks authority structure for substrate-side reversion decisions* | ✗ Unsafe — *L3 substrate has authorities but lacks demonstrated cross-domain depth required for control-equivalence evidence* | ✓ Safe — Tier 4 envelope; AEnt-M relocation per class to Stage 2 (Parallel run) only; control-equivalence evidence accumulating | ✓ Safe — full per-class relocation possible up to Stage 4 (Operational) for action classes with demonstrated control equivalence |

**Notes for Table C:**

- **U3 (Unsafe combination 3):** AEnt-M Phase 3 + AEM Phase < 6 — relocation requires a Tier 4 envelope per `governance/governance-integration-note.md` Rule R1; only AEM Phase 6 supports Tier 4. AEnt-M Phase 3 attempted at AEM Phase 5 means the system is claiming relocation without Tier 4 prerequisites — accountability gaps.
- **U4:** AEnt-M Phase 3 + IGM Level < 4 — relocation requires demonstrated control equivalence (per AEnt-M P7), which requires substrate at IGM Level 4+ (cascade analysis automated; feedback loops operational). Substrate at L3 can support synchronous gating but cannot provide the substrate-resident causal structure that relocation depends on.

### Table D — AEnt-M Phase 4 (Domain expansion; multiple domains; cross-domain linking)

|  | IGM L1 | IGM L2 | IGM L3 | IGM L4 | IGM L5 |
|---|---|---|---|---|---|
| **AEM 1** | ✗ Unsafe | ✗ Unsafe | ✗ Unsafe | ✗ Unsafe | ✗ Unsafe |
| **AEM 2** | ✗ Unsafe | ✗ Unsafe | ✗ Unsafe | ✗ Unsafe | ✗ Unsafe |
| **AEM 3** | ✗ Unsafe | ✗ Unsafe | ✗ Unsafe | ✗ Unsafe | ✗ Unsafe |
| **AEM 4** | ✗ Unsafe | ✗ Unsafe | ✗ Unsafe — *cross-domain claims require IGM L4+ for cascade analysis across domains* | ✗ Unsafe — *AEM 4 lacks Tier 3 governance for cross-domain consequence-class actions* | ✗ Unsafe — same |
| **AEM 5** | ✗ Unsafe | ✗ Unsafe | ✗ Unsafe — *as Tier 3 + IGM L3: substrate cannot support cross-domain claims at the required tier* | ✓ Constrained — Tier 3 + multi-domain; relocation not available; per-action review for High/Critical | ✓ Safe — Tier 3 + multi-domain; full IGM substrate; relocation deferred to AEnt-M Phase 5 |
| **AEM 6** | ✗ Unsafe | ✗ Unsafe | ✗ Unsafe | ✓ Safe — Tier 4 envelope per domain; cross-domain edges; per-class relocation per `governance/governance-integration-note.md` | ✓ Safe — multi-domain Tier 4 with cross-domain initiative emerging |

**Notes for Table D:**

- **U5:** AEnt-M Phase 4 + IGM Level ≤ 3 — domain expansion requires IGM substrate to scale across domains. IGM L3 is single-domain governance; multi-domain at L3 has no cross-domain edge structure. Cross-domain agent reasoning is unsupported.

### Table E — AEnt-M Phase 5 (Enterprise-scale initiative; multi-domain; relocation across multiple action classes; agents surface action opportunities cross-domain)

|  | IGM L1 | IGM L2 | IGM L3 | IGM L4 | IGM L5 |
|---|---|---|---|---|---|
| **AEM 1** | N/A | N/A | N/A | N/A | N/A |
| **AEM 2** | N/A | N/A | N/A | N/A | N/A |
| **AEM 3** | N/A | N/A | N/A | N/A | N/A |
| **AEM 4** | N/A | N/A | N/A | N/A | N/A |
| **AEM 5** | ✗ Unsafe | ✗ Unsafe | ✗ Unsafe | ✗ Unsafe — *AEM 5 lacks Tier 4 prerequisites; enterprise initiative requires substrate-resident enforcement that only Tier 4 supports* | ✗ Unsafe — same |
| **AEM 6** | ✗ Unsafe — *L1 substrate cannot support initiative — no claims to perceive patterns over* | ✗ Unsafe — *L2 substrate lacks the authority structure for cross-domain initiative review* | ✗ Unsafe — *L3 substrate is single-domain; cross-domain initiative requires L4+* | ✓ Constrained — initiative possible but constrained to domains at IGM L4; cross-domain edge density still developing | ✓ Safe — full enterprise-scale initiative across multiple domains with IGM-attested substrate fertility |

**Notes for Table E:**

- "N/A" rows: AEnt-M Phase 5 requires multi-domain at-scale operation; AEM Phase ≤ 4 cannot reach Tier 3+ governance, which is necessary for medium/high/critical-consequence cross-domain agent action. The combination is not just unsafe — it is logically excluded.
- **U6:** AEnt-M Phase 5 + AEM Phase 5 — even at the highest IGM level, AEM 5's Tier 3 ceiling cannot support enterprise-scale initiative because initiative requires governance relocation, which requires Tier 4. This is the same root cause as U3 but at a different combination.
- **U7:** AEnt-M Phase 5 + IGM Level ≤ 3 — enterprise-scale initiative requires substrate fertility (the rate at which existing knowledge generates new knowledge through operation), which is an IGM L5 property. L3 substrate does not generate new connections through use.

---

## 3. The five-to-eight unsafe combinations explicitly named

Per the W2.17 specification, the matrix should identify 5–8 unsafe combinations with reasons. The specific named cases:

| # | Unsafe combination | Reason |
|---|---|---|
| **U1** | AEM Phase ≤ 3 + AEnt-M Phase ≥ 2 | AEM Phases 1–3 lack the governance infrastructure (verification gates, evidence bundles) required for agent-substrate consumption. Agents recommend without traceable evidence bundles; violates `governance/evidence-bundle-schema.md` required-by-tier matrix at Tier 2+. |
| **U2** | IGM Level 1 + any AEnt-M Phase ≥ 2 | Substrate has no claims, no provenance, no authorities. Agents reasoning over it produce ungoverned outputs. Violates IGM P1 (claim is the unit), P2 (provenance), P11 (traceability) and AEM P12 (accountability). |
| **U3** | AEnt-M Phase 3 + AEM Phase ≤ 5 | Governance relocation requires Tier 4 envelope (per `governance/governance-integration-note.md` Rule R1); only AEM Phase 6 supports Tier 4. Earlier AEM phases attempting relocation produce accountability gaps. |
| **U4** | AEnt-M Phase 3 + IGM Level ≤ 3 | Relocation requires demonstrated control equivalence (per AEnt-M P7), which requires substrate at IGM Level 4+ (cascade analysis automated; feedback loops operational). At L3, substrate-resident causal structure is insufficient for relocation. |
| **U5** | AEnt-M Phase 4 + IGM Level ≤ 3 | Domain expansion requires IGM substrate at L4+ (cross-domain edges). L3 is single-domain; multi-domain operation at L3 has no cross-domain edge structure for agents to reason over. |
| **U6** | AEM Phase 6 + IGM Level 1 | The combination the W2.17 specification gives explicitly: *"evaluations against an ungoverned substrate are unverifiable."* AEM P8 evaluations against claims with no provenance, no tier, no decay management produce metrics that are statistical artefacts, not governance evidence. Tier 4 envelope prerequisites cannot be satisfied. |
| **U7** | AEnt-M Phase 5 + IGM Level ≤ 3 | Enterprise-scale initiative requires substrate fertility (IGM L5 property). At L3, substrate does not compound through operation; "initiative" claimed at L3 is initiative theatre (per AEnt-M failure mode). |
| **U8** | Tier 4 envelope (AEM Phase 6) + IGM Level 2 | Tier 4 prerequisites include "control evaluations confirm the governance system itself works" (`manifesto-principles.md:213–217`). At IGM L2, no governance authorities are staffed; control evaluations of the substrate-governance system are vacuously meaningless. |

---

## 4. Safe operating progression

The intended forward progression for an organisation adopting all three frameworks together:

| Stage | AEM Phase | IGM Level | AEnt-M Phase | Notes |
|---|---|---|---|---|
| Start | 1–2 | 1–2 | 1 | Build substrate; no agents yet. |
| Substrate ready | 1–3 | 3 | 1 | Authorities staffed; first domain at IGM Level 3. |
| First agents | 4 | 3–4 | 2 | AEM verification gates; agents advisory; substrate stabilising. |
| First governed agents in production | 5 | 4 | 2–3 (advisory only) | Tier 3; substrate cascade automation. |
| First Tier 4 envelope | 6 | 4 | 2–3 | Single-class relocation pilot. |
| Multi-class relocation | 6 | 4–5 | 3 | AEnt-M Phase 3 reaches operational meaning. |
| Multi-domain | 6 | 5 | 4 | Cross-domain edges established. |
| Enterprise-scale initiative | 6 | 5 | 5 | All three at maximum. |

This is the *only* safe path to enterprise-scale operation. Attempts to skip stages produce one of the U1–U8 unsafe combinations.

---

## 5. Operational interpretation

The matrix is consulted at:

- **Adoption planning** — the programme lead identifies the current (AEM, IGM, AEnt-M) coordinates and the target. The path is the sequence through safe-only cells.
- **Governance review** — the risk officer compares the claimed operating mode (e.g., "we are running Tier 4 with relocation across three classes in two domains") against the matrix to verify it is a safe combination.
- **Regulatory examination** — the regulator can ask: "what is your AEM phase, IGM maturity level, and AEnt-M phase, and is that combination safe per the matrix?" An organisation that cannot answer any of the three has not characterised its own state.

**A combination not in the matrix is not undefined.** It is the union of one or more unsafe cells. Operating outside the matrix is operating at a known-unsafe combination.

---

## 6. Cross-references

- `governance/governance-integration-note.md` — Rule R1 (Tier 4 envelope as outer container) is the basis for U3 and U6.
- `governance/composition-rule.md` — formal rule that depends on the safe combinations.
- `governance/authority-accountability-matrix.md` — authority assignments that presuppose IGM Level ≥ 3.
- `governance/evidence-bundle-schema.md` — required-by-tier matrix that presupposes AEM Phase ≥ 4 for Tier 2+ bundles.
- `manifesto-principles.md:248–254` (AEM phase × tier table) — AEM phase progression source.
- `intelligence-governance-manifesto/manifesto.md:147–158` (IGM Definition of Done) — IGM Level criteria source.
- `agentic-enterprise-manifesto/manifesto.md:236–274` (AEnt-M Adoption Path) — AEnt-M phase descriptions source.
- `glossary.md` (repo root) — term-collision appendix.

---

## 7. DRAFT items needing author judgment

- **DRAFT — author review needed:** the IGM Maturity Level definitions in §1.2 are derived (the Definition of Done's eight criteria + a synthesis); IGM does not formally name maturity levels. Confirm with IGM authors whether this five-level synthesis is acceptable or whether a different mapping is preferred.
- **DRAFT — author review needed:** the matrix uses "AEM Phase 6" to denote Phase 5+ with validated governance infrastructure. This naming is convenient but not in AEM source. Confirm with AEM authors whether to formalise Phase 6 in AEM's adoption path or to keep "Phase 5+ with validated governance infrastructure" as the canonical expression and adjust this matrix accordingly.
- **DRAFT — author review needed:** Table B's AEM 3 + IGM L3+ "Constrained Tier 1 advisory only" cell is a defensible safe operating point for cautious adopters but represents a strict reading. Some organisations may argue that AEM 3 + AEnt-M 2 + IGM L3+ is unsafe entirely. Confirm.
- **DRAFT — author review needed:** the "safe operating progression" table in §4 is presented as the only safe path. Aggressive adopters may want a faster path. The matrix is conservative by design; confirm whether this matches the authors' intent.
