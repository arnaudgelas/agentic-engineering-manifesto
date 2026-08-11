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

**What determines the cost outcome.** Whether a given routing policy over- or
under-spends, and whether a given observation window is enough to validate a
cost claim, are not settled by model choice or elapsed time alone — they
depend on variables that must be stated, not assumed:
- **Units.** State whether cost is measured per task, per token, per outcome,
  or per unit of verified quality; these do not move together, and a claim in
  one unit does not transfer to another.
- **Task population.** Routing gains depend on the mix of task complexity in
  the population being routed. A population dominated by uniformly complex
  tasks yields little from tiering; a population with a long tail of simple,
  low-risk tasks yields more.
- **Uncertainty treatment.** State whether cost and pass-rate figures are
  point estimates or carry confidence intervals, and over what sample size and
  time window they were measured.
- **Severity and tail risk.** A cheaper model with a higher failure rate on
  high-severity tasks can cost more in expectation than a more expensive
  model, even when its average per-task cost is lower. Tail events, not
  averages, often dominate total cost of correctness.
- **Concentration and switching costs.** Routing across models concentrates or
  diversifies vendor, data-handling, and correlated-failure exposure. The cost
  of qualifying, monitoring, and switching providers is part of the total cost
  of correctness, not a one-time setup expense to be amortized away.

*Minimum bar: State the units, task population, and observation window behind
any cost-per-task, overspend, or "validated" cost-model claim before acting on
it. Whether a fixed model-choice policy overspends, and whether a given
validation window is sufficient, depends on the variables above — neither
holds unconditionally.*

---
