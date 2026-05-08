## 7. Context is engineered like code


If the knowledge store is polluted with bad embeddings or stale data, the agent
hallucinates — no matter how clean the code. Context quality and code quality
are coupled. Context is a first-class dependency, engineered with the same
rigor as code: versioned, tested, and performance-benchmarked.

Context retrieval must be fast enough to sustain the reasoning loop. Context
windows are finite and reasoning quality degrades as low-signal context
accumulates. Engineer explicit context budgeting: hierarchical retrieval,
rolling summaries, state compaction, and authority-weighted pruning.

*Minimum bar: If retrieval takes longer than the reasoning loop tolerates,
context is broken infrastructure. But slow is not the only failure mode: stale
embeddings, conflicting sources, semantic precision failures (fast retrieval of
wrong artifacts), poisoned retrieval artifacts, and authority-weighting errors
(an outdated ADR silently overriding current policy) are quality failures that a
performance criterion does not catch. Context quality and code quality are
coupled — both must be verified, not just timed.*

---
