# The Agentic Governance Stack

**Canonical one-page reference for the layered relationship between the five manifestos.**

*All five documents in the agentic governance corpus link here. This file is normative when other documents disagree about the stack relationship.*

---

## Term-collision preface

Several terms in this corpus carry materially different meanings across the five layers — including *confidence*, *autonomy tier*, *governance*, *scope*, *validation*, *evidence bundle*, and *initiative*. A reader applying all five documents to one system without resolving these collisions will produce contradictory governance.

The repo-root [`glossary.md`](glossary.md) is the canonical term-collision resolver. Each manifesto's local glossary defers to it for cross-stack terms. When in doubt, the root glossary wins.

---

## The stack

```
Agentic Engineering Manifesto (AEM)
   ├─ Agentic SDLC (ASDLC) — engineering-side governance of agent-built code
   ├─ Agentic Product Lifecycle (APLC) — product-side governance of agent behavior
   ├─ Intelligence Governance Manifesto (IGM) — substrate that agents reason over
   └─ Agentic Enterprise Manifesto (AEnt-M) — enterprise coordination of multiple agents on a shared substrate
       ├─ depends on IGM (substrate)
       └─ inherits AEM principles
```

This diagram is the ground truth. Earlier framings of the relationship as "complementary" or "companion" are retired. The relationship is layered, with explicit dependency direction.

---

## Layer-by-layer scope

### Agentic Engineering Manifesto (AEM) — root layer

**Owns:** the engineering loop in which humans steer intent and agents execute within governed boundaries. Twelve principles cover outcomes, specifications, architecture, swarm right-sizing, autonomy tiers, knowledge & memory, context engineering, evaluations, observability, emergence & containment, economics, and accountability. AEM's Definition of Done is the contract for any agent-produced artefact in this corpus.

**Inherited by:** every other layer. Any system that builds, delivers, operates, or coordinates agentic systems is, by AEM's own scope, an agentic engineering system. The other manifestos extend and specialise AEM; they do not replace its minimum bars.

### Agentic SDLC (ASDLC) — engineering-side governance of agent-built code

**Owns:** the four-layer delivery pipeline (demand → ideation/design → build → operations) for software produced with agent participation. Defines release gates, evidence bundles, autonomy-tier composition rules, waiver governance, and steward portfolio limits.

**Depends on:** AEM (engineering-loop principles).

**Sibling of:** APLC. ASDLC governs the *pipeline*; APLC governs the *product behaviour* on the other side of release.

### Agentic Product Lifecycle (APLC) — product-side governance of agent behavior

**Owns:** seven product stages from conception through retirement. Defines composite-state hashing, behavioural evaluation portfolios, five incident classes, the Initiative Authorisation Gate (W1.11), and the red-team protocols that include contradiction-injection and unsanctioned-initiative cases.

**Depends on:** AEM (engineering-loop principles).

**Sibling of:** ASDLC.

### Intelligence Governance Manifesto (IGM) — substrate that agents reason over

**Owns:** the governed claim model, intelligence lifecycle (Ingest, Consolidate, Curate, Expand, Apply), confidence/epistemic tiers, contradiction taxonomy, decay management, and the four authorities (Semantic, Assertion, Inference, Revision). IGM specialises and extends AEM Principle 6 (knowledge & memory).

**Depends on:** AEM (the substrate-building loop is itself an agentic engineering system).

**Required by:** AEnt-M.

**Standalone-usable in a constrained sense.** A single-team or single-agent context that needs governed claims, provenance, contradiction handling, and decay management can adopt IGM independently of AEnt-M — *if and only if* the consuming agents already operate inside an AEM-conformant engineering loop (or an equivalent declared substitute). IGM does not specify how agents are built or operated; that responsibility belongs to AEM, ASDLC, and APLC.

### Agentic Enterprise Manifesto (AEnt-M) — enterprise coordination of multiple agents on a shared substrate

**Owns:** the enterprise-coordination surface. Twelve principles covering collective initiative, governance relocation, composite state, three concurrent lifecycles, and consequence-class accountability.

**Depends on:** IGM (substrate) and AEM (inherited principles). AEnt-M's coordination problem is undefined without both.

**Not standalone-usable.** Unlike IGM, AEnt-M has no standalone mode. Adopting AEnt-M without AEM, ASDLC, APLC, and IGM beneath it produces enterprise-level vocabulary applied to ungoverned underlying systems.

---

## What the dependency direction means in practice

1. **A reader picking up only AEnt-M is reading the top of an iceberg.** They must read AEM for the principles AEnt-M inherits and IGM for the substrate AEnt-M coordinates over.
2. **A reader picking up only IGM is reading a substrate specification.** They must read AEM for the engineering loop that builds and maintains the substrate.
3. **A regulator asking "show me the audit trail" gets one trail across all five layers**, not five parallel trails. The unified evidence-bundle schema (W1.7) is the artefact that makes this true.
4. **A CRO asking "who decides X" gets one answer**, derived from the cross-stack authority and accountability matrix (W1.4) — not five answers from five glossaries.

---

## Cross-references

- Repo-root [`glossary.md`](glossary.md) — term-collision preface and canonical definitions.
- `governance/governance-integration-note.md` (DRAFT — author review needed) — Tier 4 + governance relocation + substrate depth integration (W1.1).
- `governance/authority-accountability-matrix.md` (DRAFT — author review needed) — cross-stack authority matrix (W1.4).
- [Agentic Engineering Manifesto](manifesto/manifesto.md) — root layer.
- [ASDLC](asdlc/) — delivery pipeline.
- [APLC](aplc/) — product lifecycle.
- [Intelligence Governance Manifesto](https://github.com/witoldreichhart/intelligence-governance-manifesto) — substrate.
- [Agentic Enterprise Manifesto](agentic-enterprise-manifesto/) — enterprise coordination.

---

*Maintained jointly by the AEM, ASDLC, APLC, IGM, and AEnt-M leads. Last updated: May 2026. Licensed under CC BY 4.0 (AEM, ASDLC, APLC) and CC BY-SA 4.0 (IGM, AEnt-M); use the most permissive applicable license for any derivative.*
