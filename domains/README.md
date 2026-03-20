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

---

## Recommended Reading Path

1. [companion-frameworks.md](../companion-frameworks.md) — boundary conditions
   for regulated-industry adoption
2. [adoption-vmodel.md](../adoption-vmodel.md) — V-model-specific adoption
   path for verification-heavy organizations
3. Your domain document (above) — map manifesto principles to your specific
   regulatory framework
