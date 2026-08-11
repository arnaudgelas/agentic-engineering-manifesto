## 3. Architecture is defense-in-depth, not a document


Domain boundaries define what agents may do and what they must not do. Encode
boundaries as machine-enforced policies: repository gates, type contracts, lint
rules, domain ownership maps, CI checks.

Orchestration is a deterministic concern; execution is a probabilistic one —
conflating them is the root failure mode. Do not rely on an LLM's system prompt
to enforce your business rules. Build deterministic infrastructure wrappers
around your probabilistic AI. Enforce permissions, repository gates, API rate limits,
and data access at the system level. Expect the boundary to be tested. Design
for what happens when it is crossed.

The orchestration harness is itself part of that deterministic infrastructure,
not an implementation detail beneath notice. A single versioned **harness
identity** binds the components that determine what an agent can do and how:
the execution loop, the hooks/skills/instruction files loaded, the tool
registry, the permission set, the runtime image, the routing policy, the
compaction policy, the evaluator versions in force, and the orchestration
topology. A material change to any one of these components changes the
harness identity value — recorded, not silent — because an evaluation run
under one harness configuration does not automatically transfer to another.
The accountable owner for this aggregate identity is named in
[Roles](../adoption/roles.md#tech-leads).

The orchestration topology named inside that harness identity is itself
typed, versioned, and hashed — not merely asserted. The topology manifest
records: the node set and each node's type (agent, tool, human gate,
evaluator); the typed edges between nodes and the routing predicates that
decide traversal; the state schema each node reads and writes; retry and
idempotency behavior per edge; failure and compensation handling; the human
gates present and their trigger conditions; the evaluator hooks and what
they gate; and the allowed-mutation scope — what state or environment each
node is permitted to change. This manifest is hashed and included in the
evidence bundle ([`governance/evidence-bundle-schema.md`](../governance/evidence-bundle-schema.md)) as a first-class,
versioned element of release identity; changing any element listed above
changes the manifest hash and, through it, the harness identity above. A
loop is already a cyclic graph — this specifies the existing orchestration
construct precisely enough to type, version, and hash it. It does not name a
new construct.

Deterministic wrappers catch structural failures — unauthorized access, schema
violations, forbidden operations. They cannot catch semantic failures — an agent
that writes syntactically valid but logically wrong code. That is why
architecture is *defense-in-depth*, not a single layer: wrappers catch
structural violations (Principle 3), verification catches semantic errors
(Principle 8), and observability catches behavioral drift (Principle 9). No
single layer catches everything. All three must hold.

*Minimum bar: If a boundary is described but not enforced at runtime with
automated detection and recovery, it is not architecture — it is documentation.*

---
