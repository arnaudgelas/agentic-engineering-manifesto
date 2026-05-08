## Principle 6 — Knowledge & Memory: Extended Guidance


*See Principle 6 in the manifesto for the core statement and minimum bar.*

### Memory Governance Properties — Operational Detail

The manifesto lists five governance properties. Here is what each means in
practice:

- **Provenance**: Every memory entry carries metadata: what event created it,
  which agent, what evidence supported it, when. Implementation: structured
  metadata fields on every entry in your memory store (vector DB, episodic
  store, or whatever layer holds learned memory). Without provenance, you cannot
  trace a bad decision back to a bad lesson.

- **Expiration**: Learned memory decays. A routing preference learned during a
  model outage is wrong once the model recovers. A code pattern learned from a
  since-deprecated API is harmful. Implementation: TTLs on memory entries,
  calibrated by domain. High-volatility domains (model routing, API behavior)
  expire fast. Low-volatility domains (architectural patterns, security
  policies) expire slowly or never. Review expired entries before deletion —
  some should be promoted to knowledge; others should simply disappear.

- **Compression**: Long-running agents accumulate memory faster than it can be
  consumed. Raw memory is noise; compressed memory is signal. Implementation:
  periodic consolidation passes that merge redundant entries, extract patterns
  from clusters of similar learnings, and discard entries that have been
  superseded. Think of it as garbage collection for learned context.

- **Rollback**: When memory is poisoned — an agent learned something wrong from
  a bad incident, a corrupt retrieval shard, or a flawed evaluation — you need
  to undo the damage. Implementation: versioned memory snapshots (daily or per
  significant learning event), with the ability to revert a domain's learned
  memory to a known-good state. Test rollback before you need it. See
  [Pattern C (Memory Poisoning Recovery)](companion-patterns.md#pattern-c-memory-poisoning-recovery)
  in the Worked Patterns.

- **Domain scoping**: A lesson learned in the payments domain should not
  influence code generation in the notification service. Implementation:
  namespace or tag memory entries by domain, and enforce scope boundaries in
  retrieval queries. Cross-domain memory should be explicitly promoted, not
  implicitly leaked.

### Emerging Memory Infrastructure

The memory infrastructure the manifesto calls for is beginning to materialize.
Git-native agent memory systems demonstrate what governance-aware memory looks
like in practice: provenance (every entry traceable to its source), rollback
(versioned snapshots with merge-safe conflict resolution), and domain scoping
(namespace isolation preventing cross-agent collisions in multi-branch
workflows). Dependency-graph approaches validate the P7 claim that context must
be engineered, not concatenated — tracking explicit task dependencies rather than
relying on flat retrieval. Teams evaluating memory infrastructure should assess
whether their chosen solution provides at minimum: provenance metadata, versioned
snapshots, and scoped namespaces.

### Beyond Retrieval: Persistent Agent Cognition

The manifesto frames memory governance in terms of retrieval infrastructure —
provenance, expiration, rollback, scoping. This is necessary but no longer
sufficient to describe the frontier. The emerging memory discipline includes
three layers:

- **Retrieval memory** — the layer the manifesto already covers well. Embedding
  stores, vector search, scoped retrieval with SLOs. This is the "better RAG"
  layer.
- **Skill memory** — durable behavioral patterns agents acquire through
  experience, stored as reusable artifacts rather than retrieved context. An
  agent that has solved a class of problem before should carry forward not just
  the facts it retrieved but the approach that worked. Skill memory is closer
  to procedural knowledge than to information retrieval.
- **Causal and trajectory memory** — the ability to store not just what happened
  but why it worked or failed, and to consolidate trajectories across tasks into
  generalizable reasoning patterns. This is learning in the operational sense:
  the agent's future behavior improves based on structured reflection over past
  behavior.

All three layers require the same governance properties (provenance, expiration,
rollback, scoping). But they differ in what "poisoning" means and how rollback
works. Reverting a bad embedding is straightforward. Reverting a bad learned
skill is harder — the skill may have influenced downstream decisions that
themselves became learned patterns. Teams building memory infrastructure should
design for rollback at each layer independently.

The full operational specification for governing learned memory — what counts as
adaptation, who may write to persistent memory and under what conditions,
provenance requirements, retention and expiry policy, rollback mechanisms, and
which behavioral changes trigger a revalidation cycle — is the **Adaptation
Envelope (Layer 4)** of the behavioral envelope framework. See
[companion-re-framework.md, Section 4 (Behavioral Envelope, Layer 4)](companion-re-framework.md#4-the-behavioral-envelope)
for the complete specification. Principle 6 names the governance properties;
Layer 4 specifies what to actually write.

Recent agent-learning work sharpens this distinction further: reusable skills
can function as an external learning substrate, allowing agents to improve by
writing, selecting, and refining structured procedural artifacts rather than by
updating model weights. This makes skill governance a first-class engineering
concern. If a learned skill can change behavior across many future tasks, it
should be treated as governed operational memory, not as an implementation
detail hidden inside prompts.

This also changes the minimum governance question. It is no longer enough to
ask whether a memory entry is traceable. Teams also need to ask:

- **Who may promote a learned behavior into a reusable skill?**
- **What evidence is required before a skill is reused across domains?**
- **How is skill rollback triggered and validated after an incident?**
- **Which skills are experimental, local, approved, or forbidden?**

Without these controls, a successful one-off workaround can silently become a
portable failure mode.

### The Knowledge-Memory Boundary in Practice

The manifesto defines the boundary by governance mechanism: knowledge changes
through governed processes (PRs, ADRs); learned memory changes through feedback
loops. In practice, entries migrate between the two:

- **Memory → Knowledge promotion**: An agent repeatedly learns that a certain
  retry pattern works. After validation, this should be codified as an ADR or
  repository policy — promoted from heuristic to ground truth.
- **Knowledge → Memory demotion**: A documented best practice stops holding
  under new conditions. Rather than immediately deleting the ADR, demote it to
  learned memory with an expiration, so the system can accumulate evidence for
  or against the change before formalizing it.

The migration process itself needs governance. Unreviewed promotions pollute
your knowledge base. Unreviewed demotions erode architectural standards.

### Memory Governance at Machine Scale

The governance properties described above (provenance, expiration, compression,
rollback, domain scoping) are necessary but not sufficient at production volume.
A single agent executing 100 tasks per hour generates 100 memory entries per
hour. Human curators can meaningfully review 10-20 entries per hour — an
immediate 5-10x backlog. At this scale, reactive curation (diagnose regression,
identify poisoned entry, rollback) is a post-mortem methodology, not a
governance strategy. Proactive detection is required.

**Implement these four mechanisms before agents generate significant memory
volume:**

**1. Retrieval canaries (continuous).** For each memory shard serving a
production domain, define one known-good query with an expected result. Run it
on every retrieval cycle. If retrieved results deviate from expected, isolate
the shard immediately and alert. This catches poisoning before agents act on
bad context. Pattern C in [companion-patterns.md](companion-patterns.md) shows
this as a recovery step — it should be a permanent fixture, not a post-incident
addition.

**2. Consistency check on write.** When a new memory entry contradicts an
existing entry in the same domain, flag both for resolution before the new
entry is propagated. Do not silently overwrite. The contradiction is signal —
either the new lesson is wrong, the old lesson is stale, or both need
re-examination.

**3. Structured memory entry schema.** Require all memory entries to carry:
- `lesson`: what was learned (one sentence)
- `rationale`: why this is believed to be true
- `confidence`: 1-5 (1 = tentative observation, 5 = validated across many cases)
- `domain_scope`: which domain(s) this applies to
- `expires_at`: ISO 8601 datetime (see defaults below)
- `provenance`: trace ID of the event that generated this entry

Agents cannot store memory without these fields. Entries without valid schema
are rejected at the memory layer, not silently dropped.

**4. Default TTL policy by volatility.**

| Domain type | Default TTL | Rationale |
| --- | --- | --- |
| Model routing preferences | 7 days | Provider behavior changes frequently |
| Transient operational learnings | 7 days | Short-lived context (incidents, deployments) |
| API behavior and integration patterns | 30 days | APIs change on release cycles |
| Architectural patterns (project-specific) | 90 days | Reviewed at quarterly retro |
| Security policies and constraints | Never auto-expire | Human review required for any change |
| Compliance-relevant learnings | Never auto-expire | Regulatory retention requirements apply |

Expired entries are not deleted automatically — they enter a review queue.
A domain expert validates or discards them monthly. Target: 5% of active
entries reviewed per month (manageable volume, full corpus covered in
20 months). Low validation rate triggers memory system remediation.

**When memory governance fails at scale**, the tell is a sudden degradation in
evaluation metrics for a specific domain without a corresponding code change.
The recovery path is Pattern C (Memory Poisoning Recovery). The prevention path
is these four mechanisms deployed before the volume problem appears.

### Memory Governance in Regulated Environments

The governance properties described above (provenance, expiration,
compression, rollback, domain scoping) are necessary everywhere and
insufficient in regulated environments. Data classification adds a layer
of constraints on what agents may accumulate, retain, and retrieve.

**What regulated environments add to memory governance:**

| Domain | Memory Retention Constraint | Retrieval Constraint | Key Regulatory Basis |
| --- | --- | --- | --- |
| **Financial services** | Customer PII must not persist in agent memory beyond the session unless a DPA is in place. Banking secrecy jurisdictions may prohibit retention entirely. | External LLM retrievals must not send Confidential/Restricted financial data to unclassified endpoints. | GDPR Art. 5 (data minimisation); DORA third-party risk |
| **Medical devices / pharma** | Patient-level data must not persist in learned memory. GxP operational data retention follows the applicable retention schedule, not agent TTL. | GxP raw data must never be retrieved into an agent context that has write access to production records. | HIPAA §164.528; GDPR Art. 5; GxP data integrity |
| **Aviation** | ITAR/EAR-controlled technical data retained in agent memory constitutes a controlled export if transmitted to a non-compliant endpoint. | Retrieval from ITAR-controlled knowledge stores must operate within a Technology Control Plan. | ITAR 22 CFR 120-130; EAR 15 CFR 730-774 |
| **Defense / government** | CUI (Controlled Unclassified Information) must not persist in any memory store without appropriate classification handling. Classified information must not enter agent systems at all. | Retrieval must be restricted to approved, accredited environments. | CMMC 2.0; NIST SP 800-171; 32 CFR Part 2002 |

**The practical rule:** In regulated environments, learned memory is a
data store subject to the same classification, retention, and access
controls as any other system data. The manifesto's memory governance
properties (provenance, expiration, rollback, scoping) are the mechanism;
the applicable data regulation determines the thresholds. A GDPR data
minimisation obligation, for instance, means the TTL default for
customer-identifiable learnings is "session only" — not 30 days.

**Audit trail for memory changes.** In regulated contexts, the memory
governance operations themselves (write, expire, rollback) must be logged.
The standard memory entry schema fields (`provenance`, `expires_at`,
`domain_scope`) are the minimum; add `classification` and
`retention_basis` fields for regulated memory stores to make the audit
trail complete.

See the domain documents for domain-specific memory classification
requirements: [financial-services.md](domains/financial-services.md#data-residency-and-classification) ·
[pharma.md](domains/pharma.md#7-data-integrity-for-agent-systems) ·
[medical-devices.md](domains/medical-devices.md#tool-configuration-notes) ·
[aviation.md](domains/aviation.md#export-control-itarear)

---
