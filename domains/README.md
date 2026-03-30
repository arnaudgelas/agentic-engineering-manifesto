# Domain-Specific Regulatory Alignment

These documents map the principles of the
[Agentic Engineering Manifesto](../manifesto.md) to the regulatory frameworks
that govern specific industries. They bridge the gap between the manifesto's
domain-agnostic guidance and the concrete standards teams must satisfy in
regulated environments.

These documents do **not** explain the regulations themselves, nor do they
constitute compliance advice. They assume the reader already understands the
applicable regulatory landscape and needs to see how agentic engineering
practices align with it.

> **Disclaimer** — These alignment mappings are provided for informational
> purposes only. They do not represent legal, regulatory, or compliance advice.
> Organizations must conduct their own compliance assessments with qualified
> professionals. Regulatory frameworks evolve; always verify against the
> current published standards.

---

## Documents

| Document | Scope |
|----------|-------|
| [Aviation](aviation.md) | DO-178C, DO-330, DO-333, ARP 4754A, DO-326A — airborne software and systems assurance |
| [Medical Devices](medical-devices.md) | IEC 62304, ISO 14971, ISO 13485, FDA SaMD, EU MDR — medical device software lifecycle |
| [Pharma / Life Sciences](pharma.md) | GAMP 5, CSA, 21 CFR Part 11, EU Annex 11, ICH Q8-Q12 — pharmaceutical computerized systems |
| [Financial Services](financial-services.md) | SR 11-7, DORA, EU AI Act, SOX, Three Lines of Defense — banking, insurance, capital markets |
| [Automotive](automotive.md) | ISO 26262, ASPICE, UN Regulation 157 — road vehicle functional safety and autonomous driving |
| [Defense / Government](defense-government.md) | CMMC, FedRAMP, NIST SP 800-53, ITAR/EAR — government contracting and defense systems |

---

## Cross-Cutting Themes

Several themes recur across all domains and are addressed at the manifesto
level rather than in domain-specific documents:

- **Independent validation** as a governance principle — see
  [Companion Principles P8](../companion-principles.md#independent-verification-in-regulated-contexts)
- **SOUP / agent-as-tool categorization** — see
  [Companion Principles P3](../companion-principles.md#agent-as-tool-and-software-of-unknown-provenance)
- **Data classification as an agent constraint** — see
  [Companion Frameworks](../companion-frameworks.md#cross-domain-regulatory-insights)
- **ALCOA+ compliance** — see
  [Companion Frameworks](../companion-frameworks.md#alcoa-alignment)
- **Champion-challenger testing** — see
  [Companion Principles P8](../companion-principles.md#champion-challenger-testing-in-regulated-contexts)
- **Fairness and bias testing** — see
  [Companion Principles P8](../companion-principles.md#fairness-and-bias-testing-in-high-risk-ai)
- **Cross-domain incident classification** — see
  [Companion Patterns](../companion-patterns.md#cross-domain-incident-classification-framework)
- **Supplier and vendor qualification** — see
  [Companion Reference](../companion-reference.md#cross-domain-supplier-and-vendor-qualification)
- **Memory governance in regulated environments** — see
  [Companion Principles P6](../companion-principles.md#memory-governance-in-regulated-environments)
- **Open interoperability requirements** — see
  [Companion Principles P9](../companion-principles.md#interoperability-requirements)
- **Benchmark instability and private holdouts** — see
  [Companion Principles P8](../companion-principles.md#benchmark-instability-and-contamination-risk)

---

## Cross-Domain Open Regulatory Questions

The following questions are unresolved across multiple regulated domains.
They represent the highest-priority areas where industry consensus,
standards-body guidance, or regulatory precedent is needed. Each question
links to the domain that has developed the most specific framing.

| # | Question | Domains Affected | Status |
|---|---|---|---|
| 1 | **Agent-as-tool qualification**: Is an AI agent SOUP (IEC 62304), an unqualified tool (DO-178C/DO-330), a GAMP Cat 3/4 system, or a new category requiring new classification frameworks? No domain has a settled answer. | All | Open — each domain uses the "treat as unqualified tool, independently verify output" pragmatic approach pending regulatory guidance |
| 2 | **Model version change revalidation scope**: When the underlying model is updated (e.g., model version bump by the provider), what revalidation is required? Does a minor version change trigger full re-IQ/OQ/PQ? Full independent model validation? Or only a behavioral regression test? | Medical, Pharma, Financial | Open — PCCP (FDA) partially addresses anticipated modifications but not infrastructure-level model changes |
| 3 | **Memory accumulation as a change control event**: At what point does accumulated learned memory constitute a change to a validated system? No domain has a threshold or methodology. | Pharma (most developed), Medical, Financial | Open — GAMP 5 open question; no regulatory body has published guidance |
| 4 | **Open-source model supplier responsibility**: When a deploying organization uses an open-source model with no identifiable supplier, how should GAMP 5 supplier qualification, ISO 13485 §7.4 purchasing controls, and SR 11-7 vendor model management apply? | Pharma, Medical, Financial | Open — conservative position is to assume full supplier responsibility; regulatory validation of this approach is untested |
| 5 | **GDPR Art. 22 and agent-assisted decisions**: When an agent produces a recommendation that a human rubber-stamps, does that constitute "solely automated decision-making" under GDPR Art. 22? The boundary between meaningful human review and rubber-stamping is undefined in regulatory guidance. | Financial, Medical, All customer-facing | Open — rubber-stamping detection metrics (see adoption-metrics.md) partially address the engineering side; the legal question is unresolved |
| 6 | **Protocol and evidence portability**: What level of interoperability should regulated teams require for tool invocation, agent delegation, trace export, and replay before an agent platform can be treated as operationally governable rather than vendor-bound? | All | Open — open protocols are emerging, but regulatory expectations for portability, replay, and audit export are not yet settled |

---

## Document Structure Template

All domain documents in this directory should include the following sections.
Sections may be omitted only where clearly not applicable to the domain —
in which case add a brief "Not applicable for this domain: [reason]" note.

```
## [Criticality/Risk Level] to Manifesto Autonomy Mapping
Map the domain's primary risk/criticality classification (DAL, safety class,
ASIL, GxP context, etc.) to manifesto autonomy tiers. This is the primary
table readers need.

## [Framework]-by-[Framework] Mapping (repeat for each major standard)
Table mapping each regulatory standard's key requirements to manifesto
principles, with Alignment (Strong/Good/Partial/Gap) and Gap description.

## SOUP / Agent-as-Tool Treatment
How the domain's software component classification framework applies to AI
agents, model dependencies, and agent-selected libraries.

## Hard Autonomy Caps
Regulatory floor caps by use case. These are not recommendations — they are
constraints. Include the regulatory citation for each cap.

## Viable Starting Points
3-6 concrete, low-risk entry points for teams beginning agentic adoption
in this domain. Each should be realistically achievable without resolving
open regulatory questions.

## Tool Configuration Notes
How to configure agent tooling (hooks, RBAC, MCP allowlists, model pinning)
to satisfy the domain's audit trail and data classification requirements.

## ALCOA+ or Equivalent Data Integrity Cross-Reference
Cross-reference to companion-frameworks.md#alcoa-alignment with any
domain-specific additions.

## Open Regulatory Questions
Unresolved questions specific to this domain. Cross-reference to the
cross-domain questions in this README where applicable.
```

---

## Recommended Reading Path

1. [companion-frameworks.md](../companion-frameworks.md) — boundary conditions
   for regulated-industry adoption
2. [adoption-vmodel.md](../adoption-vmodel.md) — V-model-specific adoption
   path for verification-heavy organizations
3. Your domain document (above) — map manifesto principles to your specific
   regulatory framework
