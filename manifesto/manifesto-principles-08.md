## 8. Evaluations are the contract; proofs are a scale strategy


Evaluations define what "correct" means in terms the system can check
autonomously. Every change must be verified against the evaluation suite — and
every change must not regress the versioned critical metrics beyond their
agreed thresholds. When the evaluation suite itself changes — a test is
corrected, a metric is redefined, coverage is strengthened — the resulting
score shift is not a regression to hide; it is a recorded, approved tradeoff:
log the old and new metric definitions, the reason for the change, and the
before/after scores. What is never permitted is a silent drop against an
unchanged evaluation suite. Without evaluations, verification is assertion.
Without verification, done is a claim.

Evaluations evolve with the system: coverage of the happy path, adversarial
cases, regression scenarios, and behavioral checks. They are the machine-
readable form of the acceptance criteria in Principle 2. When the specification
changes, evaluations change with it.

"Proofs" here means formal verification of the contracts and infrastructure
around agents — not of the agent's reasoning itself. You can prove that a
retry policy is idempotent, that a state machine has no deadlocks, or that a
type contract is satisfied. You cannot formally prove what an LLM will decide.
The value of proofs scales with module count and risk: as more agents interact
through more contracts, the contracts themselves become worth proving.

*Minimum bar: If evaluations do not include regression cases, verification is
incomplete.*

*Minimum bar (verifier independence): If the evaluation harness runs inside
the agent's write scope, "evaluations passed" is a self-report, not
verification. The harness must sit outside the agent's write scope, and this
is testable against six concrete conditions: (1) promotion runs through a
hermetic executor the agent cannot invoke, configure, or write to directly;
(2) test and holdout-scenario definitions carry immutable, versioned
provenance — content-addressed and diffable run-over-run, so a changed
evaluation is a logged decision, not a silent edit; (3) holdout scenarios are
stored in a location the agent has neither read nor write access to; (4) the
evaluator and judge model, prompt, and configuration versions are recorded in
the release identity alongside the code version, so a passing run is bound to
a specific evaluator, not "an evaluator"; (5) the evaluation harness runs
under least-privilege credentials distinct from the agent's, which the agent
does not hold and cannot escalate to; and (6) the evaluation suite includes
meta-tests that specifically probe for evaluator-bypass attempts — unauthorized
reads of holdout scenarios, writes to the harness or its recorded results, or
execution paths that route around the recorded evaluator — and fail the build
when detected. A system that cannot demonstrate all six is not verified
against an independent evaluator; it is grading its own homework.*

**Verification, validation, and independent validation are distinct disciplines.**
Passing evaluations satisfies verification. It does not satisfy validation or
independent validation, which require additional steps:

| Discipline | Question answered | Owner | Timing | Required by |
| --- | --- | --- | --- | --- |
| **Verification** | Did we build it right? Implementation matches specification. | Development / QA team | Pre-merge, every change | Always |
| **Validation** | Did we build the right thing? Specification matches real-world need. | Product / domain owner | Pre-release | Phase 4+; always for regulated systems |
| **Independent validation** | Were verification and validation themselves rigorous? | Organizationally separate team (2nd line) | Pre-production | Any high-stakes system; mandated by SR 11-7, SS1/23, DORA in regulated industries |

Independent validation is a governance principle, not merely a compliance
requirement. Any system where a verification failure could cause significant
harm — financial, safety-critical, reputational, or legally consequential —
warrants organizational separation between the team that builds and verifies and
the team that validates. Regulation formalizes this requirement; it does not
create it. The most common failure: teams perform verification, label it
validation, and have no independent validation. This is a quality gap in any
context, not only a regulatory audit finding.

Independent validation must be capable of blocking production deployment. A team
that can only observe and advise is not independent validation — it is a
consultation. See Principle 12 for the accountability structure that makes
independent validation meaningful.

**Evaluations must also test whether the governance system works — not only
whether the product works.** A governance evaluation suite verifies: evidence
bundle completeness (all required fields present and non-empty); provenance
consistency (provenance fields match across artefacts in the same bundle);
control state record accuracy (stated pass/fail/waived verdict matches the
underlying artefact); rollback procedure currency (tested within the window
defined by the evidence freshness rules); and SBOM completeness against the
deployed dependency set. When governance evaluations fail, they trigger the
same remediation sub-cycle as product evaluation failures — not a separate
audit process. A governance system that is never evaluated is trusted, not
governed.

---
