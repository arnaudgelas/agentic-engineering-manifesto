## 11. Optimize the economics of intelligence


Not every task requires the most capable model. Build a dynamic routing layer.
Route simple tasks to fast, cheap models. Reserve expensive, high-reasoning
models for complex orchestration and critical decisions. Model choice is a
runtime decision, not a configuration constant.

Optimize total cost of correctness — not just inference cost, but the full
cycle: `inference + verification + governance overhead + incident remediation`.
Include human costs: review time per tier, context-switching across model
behaviors, and debugging heterogeneous failure modes in multi-model routing.
Track cost per task, cost per outcome, and cost per quality unit. When
governance overhead exceeds the value of the work, that is a signal to simplify,
not to add more governance.

**Multi-model coherence.** In heterogeneous swarms, different models may hold
conflicting internal representations of the same codebase — different
architectural pattern priors, different conventions for what "correct" looks
like, different training-data views of domain boundaries. This coherence gap
compounds at Phase 5+ when agent roles are highly specialized. Mitigate by:
making shared architectural decisions explicit in the knowledge base rather than
relying on implicit prompt conventions; routing semantically related tasks
through the same model tier when consistency matters more than cost; and
treating cross-model disagreement on shared artifacts as an observable quality
signal rather than a coordination annoyance.

*Minimum bar: If model choice is a configuration constant instead of a runtime
decision, you are overspending.*

---
