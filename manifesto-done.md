# The Agentic Engineering Manifesto — Definition of Done

*What "done" means in agentic engineering.*

See the [Manifesto](manifesto.md) for the core values and the Agentic Loop.
See the [Twelve Principles](manifesto-principles.md) for the engineering
principles.

---

## The Agentic Definition of Done

Tokens generated and tasks dispatched are vanity metrics. "The agent said it
worked" is not a completed ticket.

A change is **done** when it is:

**Shipped** — deployed or delivered, not just merged.

**Observable** — instrumented and logged so reasoning can be inspected and
reconstructed from traces.

**Verified** — evaluated against regression tests (and adversarial cases),
with an evidence bundle (diffs, trace IDs, policy check outputs) required for
every automated merge.

**Provable (when risk requires it)** — formalized invariants and replayable
proof artifacts attached for critical workflows.

**Learned from** — knowledge base and learned memory updated with what was
discovered, with provenance.

**Governed** — operating within autonomy tiers appropriate to its risk, with
human accountability assigned.

**Economical** — routed through appropriate model tiers, cost tracked and
justified per outcome.

Anything less is not done for the current phase.

This DoD is phase-calibrated, not all-or-nothing. At Phase 3, "verified" means
tests and a diff; at Phase 5, it means reproducible replay with formal artifacts
where justified. "Provable" applies only when risk requires it; "economical"
matters only when routing infrastructure exists. The bar rises with the stakes —
but at every phase, the question is the same: can you show evidence, not just
assertions?

**Evolvability as an implicit criterion.** A change that passes today's tests
but degrades the codebase's capacity for future change is not truly done — it
has traded short-term correctness for structural regression. The SWE-CI
benchmark (arXiv:2603.03823) documents that most agents introduce behavioral
regressions in over 75% of CI iterations, showing high regression rates on a
long-horizon maintenance benchmark; treat it as one calibration point, not a
universal rate. This is evidence of behavioral regression risk, not a direct
measure of architectural evolvability: CI
metrics do not capture coupling growth, cohesion decay, abstraction quality, or
future-changeability. Both risks are real and distinct. At Phase 4 and above,
"verified" should include evolution-weighted signals beyond CI pass rates —
static analysis for coupling growth, module boundary stability, and change
amplification — alongside the behavioral regression coverage the benchmark
measures. See
[Structural Regression](companion-principles.md#behavioral-regression-vs-structural-regression)
in the Companion Guide.

**Why it matters:** This forces the system to optimize for actual business
outcomes rather than raw output volume, killing the illusion of productivity.

---

## Definition of Done for Hardening

*Applying the agentic DoD to work that begins as rapid exploration ("vibe
coding") and must become governed engineering before it ships.*

Exploratory agent output is not production-ready by default. A prototype that
"worked in the demo" has not passed the Agentic Definition of Done. The four
steps below define what hardening means: the path from captured exploration to
governed, verifiable output.

**Step 1 — Capture.** Record the vibe output exactly as produced: diffs,
trace IDs, prompts used, tool calls made, and any model or configuration state
at the time of generation. Treat this as raw evidence, not a deliverable. Do
not edit or clean the output before capturing it — the unmodified artifact is
the baseline.

**Step 2 — Extract Specification.** From the captured output, derive the
specification the agent was implicitly working toward: what behavior does the
output exhibit, what constraints does it respect (or violate), and what
observable success criteria would confirm it is correct? This step converts
intent from the agent's context window into a machine-readable, reviewable
specification. If no coherent specification can be extracted, the output is
not a candidate for hardening — it is a candidate for restart.

**Step 3 — Build Evaluation Portfolio.** For the extracted specification,
author an evaluation portfolio (P8): behavioral tests, adversarial cases,
and at least one holdout case not derived from the captured output. The
portfolio must include explicit regression coverage for any behavior the
captured output depends on. Evaluation theater — a portfolio that only
tests the happy path the exploration already demonstrated — does not satisfy
this step.

**Step 4 — Verify and Refactor.** Run the evaluation portfolio against the
captured output. Fix every failure. Refactor for structural quality (coupling,
abstraction, module boundary stability) sufficient for the change's autonomy
tier and risk level. Attach the evidence bundle (passing evaluations,
trace IDs, refactoring diffs) to the change. The change is done when the
evidence bundle is complete and a named human is accountable for it (P12).

**The practical test.** Ask: if the person who ran the exploration session
left today, could another engineer reproduce, modify, and extend this output
using only the specification, the evaluation portfolio, and the evidence
bundle? If the answer is no, hardening is not complete.

**When to skip hardening.** Exploration output that will be discarded — a
spike, a proof of concept that will be rewritten, a learning exercise — does
not require hardening. The trigger for hardening is intent to ship, not
intent to keep. If the output is going to influence production behavior in any
form, the four steps apply.
