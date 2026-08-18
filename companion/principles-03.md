## Principle 3 — Architecture: Extended Guidance

*See Principle 3 in the manifesto for the core statement and minimum bar.*

### Prompt Drift and Enforcement

Prompts drift, and context windows degrade. They approximate compliance — they
do not guarantee it the way a compiler obeys syntax. When architecture is
merely described rather than enforced, agents will violate it. When architecture
is enforced but not monitored, violations will go undetected.

### Domain-Driven Design for Swarms

Domain-Driven Design gives each swarm a bounded context — what it owns, where
code belongs, what is forbidden to reinvent. Retrieval is untrusted input;
treat context injection as a threat vector. This reduces swarm collisions and
hardens the system against both accidental drift and adversarial conditions.

AGENTS.md files (an emerging repository-level convention in the AAIF ecosystem
for agent instructions) offer a practical mechanism for encoding architectural constraints
at the repository level. They function as machine-readable ADRs that coding agents respect at
runtime — a concrete implementation of architecture as defense-in-depth.

### Agent-as-Tool and Software of Unknown Provenance

In regulated development, software components are classified by provenance and
qualification status. When agents participate in development, three
classification questions arise:

1. **The AI model itself**: Non-deterministic, version-dependent, and opaque.
   Under IEC 62304 (SOUP), DO-178C/DO-330 (tool qualification), and GAMP 5
   (software categories), the model cannot currently be qualified through
   traditional means.
2. **Agent-selected dependencies**: When an agent pulls in a library or
   pattern, it is making a provenance decision that may carry regulatory
   consequences. The human must own dependency approval; the agent must not
   introduce unvetted dependencies silently.
3. **Agent-generated code**: May incorporate training-data patterns that
   constitute derivative unclassified software. Evidence bundles must capture
   sufficient provenance to support classification.

The manifesto's defense-in-depth response: treat the agent as an unqualified
tool and independently verify all output through qualified means. This is
architecturally equivalent to treating retrieval as untrusted input (above).
The infrastructure must enforce dependency allow-lists, and evidence bundles
must capture dependency provenance.

See [companion-frameworks.md](companion-frameworks.md#cross-domain-regulatory-insights)
for the cross-domain analysis and [domains/](domains/README.md) for
domain-specific classification requirements.

### On "harness engineering" and "graph engineering"

Principle 3 already requires the harness identity — including the
orchestration topology (node types, typed edges, routing predicates, retry
and human-gate handling) — to be versioned, hashed, and re-evaluated on
change. If you have encountered "harness engineering" or "graph engineering"
as terms in vendor or practitioner material, see the
[Vocabulary Bridge](vocabulary-bridge.md#harness-engineering) for how AEM
positions those terms against this construct.

---
