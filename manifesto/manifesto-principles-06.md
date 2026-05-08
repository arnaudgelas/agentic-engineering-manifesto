## 6. Knowledge and memory are distinct infrastructure


An agent without memory is a liability. But knowledge and memory are not the
same thing, and conflating them is dangerous.

**Knowledge** is ground truth: code, documentation, ADRs, formal contracts,
domain constraints. It is versioned, deterministic, and authoritative.

**Learned memory** is heuristic: reasoning patterns, incident learnings, routing
preferences, and reusable skills. It is probabilistic, subject to decay, and
requires continuous renewal — not just point-in-time control. Provenance,
expiration, compression, rollback, and domain scoping are the mechanisms of
that renewal cycle: each one governs not only what is stored, but whether what
was learned is still valid before it is reused.

The practical test: if it changes through governed processes (pull requests, ADR
reviews, schema migrations), it is knowledge. If it changes through feedback
loops (agent learning, incident adaptation, routing optimization), it is
learned memory. The governance mechanism determines the classification.

At the frontier, memory is not only retrieval. Agents can externalize
procedures as reusable skill artifacts that evolve through experience without
changing model weights. Those learned skills require the same provenance,
review, rollback, and scoping discipline as any other memory layer.

**Memory failure modes.** The governance mechanisms above address the
what-and-when of memory management. The threat model addresses what goes wrong
when they fail:
- **Memory poisoning** — an agent writes incorrect learnings that corrupt
  future agent behavior across sessions. Mitigate with human review gates on
  memory writes from agents operating at Tier 2 or above.
- **Cross-agent contamination** — Agent A's domain-specific memory leaks into
  Agent B's reasoning context. Mitigate with domain-scoped memory namespacing
  and access controls on memory read paths.
- **Consistency under concurrency** — two agents update the same memory store
  with conflicting observations. Mitigate with versioned writes and explicit
  conflict resolution policies, the same as for any shared mutable state.
- **Audit trail gap** — "what version of memory was active when this decision
  was made?" requires point-in-time snapshots, not just current state, for
  meaningful incident reconstruction.
- **Knowledge contamination** — agent-generated content enters the knowledge
  base through governed processes (commits, ADRs, documentation PRs) and is
  subsequently retrieved in future context with the same epistemic authority as
  human-authored knowledge. Mitigate by requiring provenance labeling of all
  agent-authored artefacts at commit time — the label travels with the artefact
  through versioning and retrieval so that consumers can apply appropriate
  epistemic weight. An unlabeled agent-authored ADR retrieved as authoritative
  knowledge is a failure mode that bypasses both memory governance and retrieval
  quality controls.

*Minimum bar: If memory cannot expire, be rolled back, or show provenance, it is
not memory — it is a liability. And if memory is not revalidated against current
architecture and process before reuse, it is not being governed — it is being
trusted.*

---
