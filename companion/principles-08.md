## Principle 8 — Evaluations & Proofs: Extended Guidance


*See Principle 8 in the manifesto for the core statement and minimum bar.*

### Assurance Disciplines

As autonomy and module count grow, assurance must move across distinct practices
with different cost curves:
- **Evaluations and tests** for dynamic, example-based validation.
- **Formal contracts + proofs** for mathematically checking module properties.
- **Model checking** for state-space behavior (especially concurrency and
  protocol invariants).

These are separate disciplines. Use them intentionally: tests by default,
formal methods first on critical paths and high-blast-radius components, then
expand coverage where incident data and economics justify it.

The "proofs are a scale strategy" claim is now operationally achievable, not
just theoretically sound. Executable specification languages allow teams to
write specifications that are simultaneously human-readable documentation,
testable assertions, and inputs to model checkers — collapsing the gap between
"we wrote a spec" and "we proved a property." Model-based testing workflows
can generate test suites directly from executable specifications, connecting
formal models to CI pipelines without requiring teams to become proof engineers.
The practical entry point is not theorem proving but executable specs on one
critical path — the same scope recommended in the adoption playbook's formal
contracts step.

### LLM-as-Judge Risk

When models judge model-generated outputs, evaluator and producer can share
blind spots. Mitigate LLM-as-judge risk with deterministic anchors, diverse
judge models, periodic human-calibrated gold sets, and disagreement tracking
between judges and production outcomes.

### Evaluation Theater

Beware evaluation theater: evals that pass but do not test what matters. If
evaluations do not cover edge cases, adversarial inputs, and behavioral
regressions, they are measuring comfort, not correctness. When evaluation
metrics become optimization targets rather than measures of quality, the system
games the metric and drifts from the goal.

**Detecting evaluation theater.** Evaluation theater is recognizable by the
gap between evaluation metrics and production outcomes. Watch for these signals:

- Evaluation pass rates near 100% while escaped defect rates or user-reported
  issues remain elevated — the evaluation suite is not covering the failure
  modes that matter.
- Adversarial inputs outside the evaluation distribution produce failures the
  suite never triggered — the evaluation distribution is too narrow.
- Evaluation coverage grows (more tests, higher numbers) without growing the
  distribution of tested conditions — the same scenarios run repeatedly with
  minor variations, providing false coverage confidence.
- Incident classes not covered by the current suite recur after remediation —
  the suite did not capture the failure mode, so the same issue reappears.

The primary structural defense is evaluation holdout (see below): scenarios
the agent has never seen and cannot overfit to. Without holdout, high eval
pass rates are consistent with both genuine quality and evaluation theater.
The measurement mechanism for "evaluation theater detection rate" (listed as a
Phase 5→6 metric) is therefore: track the fraction of production incidents that
were not predicted by any evaluation failure in the preceding cycle.

*Advanced bar: include adversarial cases for externally exposed or
high-blast-radius systems. For model-judged evaluations, calibrate against
human-labeled samples on a defined cadence.*

### Evaluation Holdout and the Gaming Problem

If agents can see the evaluation criteria during development, they can overfit
to them — producing output that passes the specific tests while missing the
intent behind them. This is the evaluation equivalent of teaching to the test.

The fix borrows from machine learning: **evaluation holdout.** Behavioral
scenarios — specifications of what the software should do in realistic
end-to-end conditions — are stored separately from the development context. The
agent builds software without access to the evaluation criteria. The scenarios
evaluate whether the output works. Because the agent never sees the evaluation
criteria in its development context, it cannot overfit to them by ordinary
means — but visibility is not the whole problem, and holdout alone does not
make the evaluation ungameable.

Two named failure modes remain even under holdout, and both need their own
mitigation:

- **Specification gaming** — the agent satisfies the letter of a behavioral
  scenario while defeating its intent (for example, hard-coding an output that
  matches an expected test fixture, or special-casing behavior for inputs that
  resemble known evaluation patterns rather than solving the general problem).
  Mitigation: rotate and vary holdout scenarios between cycles so memorized or
  pattern-matched shortcuts stop paying off, and periodically audit passing
  runs for evidence that the underlying capability, not the specific fixture,
  is what passed.
- **Reward hacking** — an agent with sufficient access does not need to solve
  the task at all if it can instead act on the evaluation mechanism itself:
  reading holdout scenarios it should not have access to, editing the
  evaluation harness or its recorded results, or otherwise attacking the
  evaluator rather than the problem. An agent with filesystem or execution
  access that reaches the evaluator can do this; holdout that is not also
  access-isolated is not a defense against it. Mitigation: the evaluation
  harness must sit outside the agent's write scope, run under credentials the
  agent does not hold, and produce results through a path the agent cannot
  write to (see Evaluation Holdout and the Gaming Problem's independence
  requirement below, and the verifier-independence protections in Principle 8's
  minimum bar).

This pattern is already in production. StrongDM's software factory uses holdout
behavioral scenarios as the primary evaluation mechanism, with agents that
implement against specifications and are evaluated against criteria they cannot
see. The result is evaluation that tests intent more reliably than compliance
alone, though no single mechanism eliminates evaluation theater outright.

**When to use holdout evaluation:** For any system where agents iterate
autonomously (Phase 4+), especially when evaluation metrics show suspiciously
high pass rates that do not correlate with production quality. Holdout
evaluation is more expensive to maintain (two separate artifact sets: development
specs and evaluation scenarios) but meaningfully reduces the most insidious
form of evaluation theater — evaluations that pass because the agent learned
the answers, not because it solved the problem. It reduces rather than
eliminates that risk: it must be paired with access isolation of the evaluator
itself (see reward hacking, above), or a sufficiently privileged agent can
still defeat it.

### Champion-Challenger Testing in Regulated Contexts

Champion-challenger testing compares agent system performance against an
incumbent approach — the current model, the prior system version, or the
clinical/operational standard of care. This is a cross-domain regulatory
expectation, not a financial-services-specific concept:

- **Financial services (SR 11-7)**: Requires comparing agent outputs against
  alternative approaches or incumbent models. Statistical methodology for
  handling output variability (non-deterministic agents) is an open regulatory
  question; conservative approach is to run champion-challenger on a held-out
  sample with human adjudication of disagreements.
- **Medical devices**: FDA GMLP and ISO/TS 24971-2 expect performance
  comparison against predicates (prior cleared devices) or the clinical
  standard of care. The manifesto's evaluation portfolio (P8) is the
  infrastructure for this comparison — extend evaluation suites with
  predicate-device test cases.
- **Pharma**: CSA expects assurance that a new system performs at least as
  well as the system it replaces. Run champion-challenger during PQ by
  executing parallel workflows and comparing outputs. Evidence bundle
  includes disagreement analysis and resolution rationale.
- **Aviation**: No direct champion-challenger requirement, but DO-178C
  requires that verification objectives are satisfied. For agent-assisted
  workflows replacing manual activities, demonstrate that the agent-assisted
  approach produces equivalent or better coverage per Table A objectives.

**The non-determinism problem.** Traditional champion-challenger assumes
identical inputs produce comparable outputs. Agents are non-deterministic.
Practical mitigation: run multiple agent invocations per input (N=3-5);
use the majority-vote or highest-confidence output as the champion response;
compare the distribution of champion responses against the incumbent.
Statistical confidence intervals, not point comparisons, are the evidence.

### Independent Verification in Regulated Contexts

Regulated industries share a common governance requirement: the party that
verifies a system must be organizationally independent from the party that
built it. SR 11-7 (financial services) requires independent model validation.
IEC 62304 (medical devices) requires verification by qualified parties
distinct from developers. DO-178C (aviation) requires independence at each
design assurance level.

In agentic engineering, this principle extends to agent-generated output: the
evaluation infrastructure that verifies agent work should be independent of the
agent that produced it. Concretely:

- Evaluation criteria should not be visible to the producing agent (evaluation
  holdout, described above)
- Evaluation models should differ from production models where feasible (avoid
  shared blind spots — see P1 correlated failure domains)
- For Tier 3 operations in regulated environments, organizational independence
  between agent development and agent validation should mirror existing
  regulatory expectations

This is not a new principle — it is a regulated-environment application of the
existing evaluation-as-contract pattern. See
[companion-frameworks.md](companion-frameworks.md#cross-domain-regulatory-insights)
for the cross-domain analysis and [domains/](domains/README.md) for
domain-specific independence requirements.

### Fairness and Bias Testing in High-Risk AI

EU AI Act Article 10 requires that training, validation, and testing datasets
for high-risk AI systems are "free of errors and complete" and that they account
for "characteristics or elements that are particular to the specific geographical,
behavioural or functional setting." In practice, this mandates bias testing
as part of the evaluation portfolio for any high-risk AI system.

This is a cross-domain obligation, not a financial-services-specific one:

- **Financial services**: Explicit fairness testing against protected
  classes under ECOA, FHA, and FCA Consumer Duty. Evaluation suites must
  include demographic parity and disparate impact analysis.
- **Medical devices**: Clinical AI systems must demonstrate equivalent
  performance across demographic subgroups (age, sex, ethnicity). ISO/TS
  24971-2 explicitly addresses this. Evaluation portfolios for Class B/C
  SaMD must include subgroup performance analysis.
- **Pharma**: ICH E8(R1) requires that clinical trial populations are
  representative of the intended treatment population. AI systems used in
  patient selection or stratification must be tested for demographic bias.
- **Automotive / industrial**: AI systems in driver monitoring or operator
  safety systems must demonstrate consistent performance across demographic
  characteristics that could influence detection accuracy.

**Minimum evaluation bar for high-risk AI systems**: Include at least one
explicit fairness evaluation category alongside behavioral regression and
adversarial cases. Fairness evaluation should specify: (1) which subgroup
characteristics are tested, (2) which performance disparity metric is used
(demographic parity, equalized odds, etc.), (3) the maximum acceptable
disparity, and (4) who owns the determination that the disparity is
acceptable. The last item is a human judgment — not an evaluation output.

### Workflow-Level Evaluation Enforcement

The evaluation-as-contract pattern extends beyond test suites into the
development workflow itself. Workflow-level skill frameworks now enforce strict red-green-refactor TDD: if
an agent writes implementation code before a failing test exists, the framework
deletes the code and forces a restart. Design-first, plan-first, and test-first
phases are mandatory, not suggested. This is evaluation-as-contract applied to
the development process rather than the runtime — and it demonstrates that P8's
principle operates at multiple layers, from CI pipelines to agent harness
constraints.

### Boolean vs. Probabilistic Evaluation

The manifesto's current evaluation model is largely boolean: tests pass or fail,
regression cases are covered or not, evidence bundles are complete or incomplete.
This framing is necessary for minimum bars but insufficient for mature agentic
systems.

At Phase 5 and above, consider **probabilistic satisfaction**: of all observed
execution trajectories through all behavioral scenarios, what fraction actually
satisfies the specification? This replaces "did it pass?" with "how reliably
does it pass, across how many conditions?"

The shift matters because agentic systems are inherently probabilistic. A
boolean "pass" on ten test cases tells you the agent produced correct output ten
times. It tells you nothing about the eleventh case, the hundredth case, or the
distribution of partial failures. Probabilistic satisfaction metrics — drawn
from scenario-based evaluation at volume — give a confidence distribution rather
than a binary verdict.

**Practical adoption:** Start boolean (Phase 3-4). Add scenario coverage and
pass-rate distributions as the evaluation portfolio matures (Phase 4-5). Treat
probabilistic satisfaction as the target metric for fully autonomous pipelines
where human review is sampled rather than comprehensive.

### Behavioral Regression vs. Structural Regression

The manifesto's minimum bar for evaluations states: "If evaluations do not
include regression cases, they are insufficient." In practice, there are two
distinct categories of regression, and most teams only test for one.

**Behavioral regression** is what traditional regression testing catches: a
change breaks existing functionality. The tests that passed before now fail.
This is well-understood and well-tooled.

**Structural regression** is subtler and more dangerous: a change passes all
current tests but degrades the codebase's capacity for future change. The code
is locally correct but globally harmful — naming conventions that create
confusion across iterations, architectural choices that increase coupling,
dependency structures that make the next change harder. Structural regression
does not fail any test today; it fails the test that you will need to write
tomorrow.

The SWE-CI benchmark (arXiv:2603.03823v1) offers a related empirical signal,
though it measures behavioral regression, not structural quality directly.
Across 100 tasks spanning an average of 233 days of development history, most
evaluated models achieve a zero-regression rate below 0.25. The benchmark does
not classify these regressions as structural versus behavioral, and it does
not establish that early-iteration decisions compound into later friction —
that mechanism is this section's hypothesis, not a benchmarked finding. Its
EvoScore metric is the closer proxy: it measures functional correctness on
future modifications — not just current tests — which is a useful, if
indirect, signal for structural health.

**Detecting structural regression:**

- **Evolution-weighted metrics**: Track not just whether today's tests pass, but
  whether each change makes the next change easier or harder. EvoScore is one
  formalization; a simpler proxy is iteration-over-iteration regression
  frequency.
- **Coupling analysis**: Monitor dependency graphs, import structures, and
  module boundaries across iterations. Rising coupling without corresponding
  functionality is a structural regression signal.
- **Specification convergence**: If specifications become harder to express
  precisely over time, the codebase's structure is degrading even if tests pass.
  The manifesto's convergence criteria (P2) apply here: diverging specifications
  are a symptom of structural regression.

**The implication for evaluation portfolios:** Teams at Phase 4 and above should
include structural regression indicators alongside behavioral regression tests.
This does not require formal verification — it requires tracking the trajectory
of code quality across iterations, not just the state of code quality at each
iteration.

### Benchmark Instability and Contamination Risk

Benchmarks are necessary and insufficient. As public agent benchmarks mature,
they are increasingly affected by contamination, target leakage, and adaptation
to the benchmark rather than to the underlying engineering problem. Treat
benchmark gains as directional evidence, not as durable truth about production
readiness.

Three practical rules follow:

- **Prefer mutation and refresh over static leaderboard worship.** If a
  benchmark remains unchanged for long enough, the ecosystem will optimize for
  it directly.
- **Maintain private holdouts.** Public benchmarks are useful for comparability;
  private evaluations are necessary for real assurance.
- **Test transfer, not just score.** A claimed improvement matters only if it
  carries over to your stack, constraints, and failure modes.

The manifesto's position is intentionally conservative: external benchmarks help
calibrate ambition, but promotion between maturity phases should be based on the
evidence your own system can produce under your own operating conditions.

See also [Verification without validation](companion-reference.md#failure-modes-of-this-manifesto)
in the Failure Modes section, which describes the related but distinct case
where verification machinery confirms correctness without confirming value.

---
