# Adoption Playbook — Success Metrics and Failure Modes

*How to measure progress and the common ways the change program fails.*

Read the [Manifesto](../manifesto/manifesto.md) for the core principles.
See the [Adoption Playbook](playbook.md) for the full table of contents.
See the [Adoption Path](path.md) for incremental steps and phase
transitions.

**Canonical sources.** Normative principle definitions (P1–P12) are in
[manifesto-principles.md](../manifesto/manifesto-principles.md). Metric thresholds and
alert bands in this document are *heuristics* — example starting bands that
must be calibrated to local baseline, domain, and risk class before use.
See [glossary.md](../glossary.md) for canonical term definitions.

---

## Success Metrics

Treat this manifesto as a living specification. Run pilots, publish failure
analyses, measure outcomes, and revise principles based on evidence from real
workflows.

Treat every threshold below as a starting baseline that must be calibrated to
local review size, risk class, and domain history.

### Metrics by Phase Transition

**Phase 1 → 2 (focus on standardization and repeatable value):**
- Number of AI-assisted tasks with documented, repeatable workflows
- Rework rate on AI-assisted outputs (how often does the human redo the
  AI's suggestion entirely?)
- Team coverage: percentage of engineers using approved AI tooling regularly
- Data handling incidents: trending toward zero for sensitive data shared
  with unapproved models (track as a security metric, not an adoption gate)

**Phase 2 → 3 (focus on autonomous execution quality):**
- Agent task completion rate (tasks delegated vs. tasks that required
  human takeover mid-execution)
- Review rejection rate for agent-generated outputs
- Documented failure patterns (growing catalog indicates learning, not
  problems)
- Specification quality: percentage of tasks where acceptance criteria were
  defined before agent execution

**Phase 3 → 4 (focus on governance foundation):**
- Evidence bundle completeness rate (target: 100% of agent-generated changes)
- Escaped defect rate: agent-generated vs. human-generated changes
- Rollback frequency and mean time to recovery
- Time per evidence bundle (sustainability indicator)

**Phase 4 → 5 (focus on scale and economics):**
- Lead time from specification to verified deployment
- Total cost of correctness by domain
- Policy violation rate and resolution time
- Cross-domain evaluation coverage

**Phase 5 → 6 (focus on self-improvement and containment):**
- Specification convergence rate (iterations to stable acceptance criteria)
- Evaluation theater detection rate (evals that pass but miss real issues)
- Self-improvement cycle time and containment breach frequency
- Human oversight load (high-risk reviews per domain owner)

### Team Health Metrics (All Phases)

- Review latency trends (rising latency may indicate review fatigue or
  cognitive overload)
- Approval depth (are reviewers engaging meaningfully or rubber-stamping?)
- Engineer satisfaction and burnout indicators (survey quarterly)
- Junior engineer progression rate (are juniors developing specification and
  evaluation skills?)

Track these alongside system health. If system metrics improve while team
health metrics decline, the governance model is consuming its own foundation.

**Rubber-stamping detection.** Control theater — humans nominally accountable
but operationally blind — is the most common governance failure at scale. The
signals below are cheap continuous *screens* for it. Read the two paragraphs
after the table before using any of them as evidence in an autonomy decision:
they detect careless rubber-stamping, not adapted rubber-stamping, and they are
not an assurance basis.

| Signal | Example healthy band | Example alert band | What it indicates |
| --- | --- | --- | --- |
| Median review time per agent-generated PR | 8–20 minutes | < 2 minutes | Reviewer not reading the diff |
| PR rejection rate (agent-generated) | 5–15% | < 1% | Approving without meaningful review |
| Inline comments per approved PR | 3–7 | Trending to 0 over 4 weeks | Review becoming mechanical |
| Rework rate within 1 week of merge | 1–3% | > 10% | Approved changes requiring hotfixes |

Collect these via your code review platform (GitHub, GitLab, Azure DevOps
— all provide approval timestamps and comment counts via API).

*These thresholds are operational heuristics calibrated from practitioner
experience, not empirically validated across diverse organizations. Treat them
as starting baselines and adjust based on your team's observed patterns. The
alert thresholds are directional: any sustained trend toward them warrants
investigation, even before a hard threshold is crossed.*

**What these signals cannot do, stated here rather than in a footnote.** Every
row above is a *behavioural proxy that a reviewer can satisfy without doing the
cognitive work*: a two-minute floor on review time is met by waiting two
minutes, a three-comment floor is met by three low-content comments, and a
rejection-rate floor is met by rejecting trivial cases. Human-factors research
on monitoring highly reliable automation reports that operators habituate
rapidly to artificial delay timers and wait them out without engaging
(Bainbridge, *Ironies of Automation*, 1983, on vigilance decrement; Parasuraman
& Riley 1997 on complacency and misuse — both as summarised in the commissioned
research synthesis *Progressive Automation Safety Evaluation*, which is a
secondary source and has not been checked against those primaries by a second
reader). These screens therefore detect *careless* rubber-stamping and not
*adapted* rubber-stamping, and adaptation is what the literature predicts once
operators know a proxy is measured. **Use them to decide where to look. Do not
use them as the evidence that oversight is functioning, and do not condition an
autonomy-tier increase on them.** The instrument for that question is the
proposed protocol below, and it is not yet validated either.

**A related and equally common error: a declining intervention, override, or
escalation rate is not evidence that oversight can safely relax.** The observed
rate is a composite of the system's error rate and the reviewer's disengagement,
and it falls identically under a system that has genuinely stopped making
mistakes and under a reviewer who has stopped looking. Standard telemetry
records whether an intervention occurred, never whether the reviewer engaged, so
no quantity of intervention-rate data separates the two cases. Treating the
decline as proof of safety is self-reinforcing: it licenses relaxing training
and oversight, which raises disengagement, which depresses the rate further. A
falling rate is a *reason to test engagement*, never a result.

**Intervention protocol when thresholds breach:** Do not add more reviewers to
the same queue. Reduce autonomy scope for that reviewer's domain until review is
meaningful again. The problem is volume, not capacity. Additional reviewers at
the same volume create the same rubber-stamping pattern faster — Skitka, Mosier
et al. report two-person flight crews making omission and commission errors at
rates statistically indistinguishable from solo operators with highly reliable
decision aids (as cited in the synthesis named above; the primary has not been
second-read). **This does not rule out independent review as such.** A reviewer
placed *outside* the live loop, working from different evidence, with a
different scope and their own authority — the shadow audit in M4 below — is a
different intervention from adding headcount to the same queue at the same
volume, and the crew finding does not speak to it.

### Engagement Falsification Protocol (proposed, unvalidated)

**Status.** This is a *proposed evaluation design*, not a validated method and
not a certification. No safety-critical field has a validated, non-disruptive
way to distinguish functional oversight from rubber-stamping in live operations;
the design below is the best-warranted instrument available and inherits that
open problem. **Run it first in simulation, shadow review, or a sandbox where
synthetic faults cannot commit real actions.** Nothing here authorises live
fault injection: an operational catch-trial study requires a separately approved
protocol covering eligible action classes, containment, abort conditions and
participant arrangements.

**Hypothesis under test, pre-registered before the run.** *For action class A,
the observed decline in the human intervention rate reflects a genuine reduction
in system error rate and not a degradation of reviewer engagement.*

**Design.** Interleave unambiguous, domain-valid synthetic faults into the
review queue at a low fixed probability — the source synthesis proposes ~2% of
queue volume as a starting parameter, not a calibrated optimum — blinded to
reviewers **and to their immediate supervisors**, over 30–60 days. Track
detection on injected faults separately from the baseline intervention rate.

- **Fault validity.** Each fault must be an unambiguous violation of a domain
  rule, safety limit or correctness criterion, adjudicated in advance by two
  qualified reviewers outside the operator pool and discarded on any
  disagreement; of a type the system could plausibly produce; carried with the
  system's normal confidence signalling and no anomaly flag; and
  indistinguishable in metadata, routing and length distribution from live work.
  Faults must be stratified across the real difficulty distribution and rotated
  so none recurs to a reviewer within the study.
- **Blinding and custody.** The schedule, fault set and ground-truth key are
  held by a custodian outside the accountability chain for the result — not the
  domain owner and not the reviewer's management line. Injection is
  pre-scheduled from a sealed seed; no human picks items in the moment. Any
  mid-run unblinding voids the run.
- **Interlock.** Every injected item is intercepted and discarded after the
  reviewer's decision is recorded and never executes, on both branches. Where
  that interlock cannot be enforced in the execution path, the protocol is not
  run.
- **Disclosure.** Reviewers are told at programme start, in writing, that a
  catch-trial programme operates over the queue, that results are aggregate and
  that they are not used for individual performance management. They are not
  told the rate, schedule, fault types or which items were injected. Undisclosed
  monitoring of named individuals is not endorsed here.
- **Exclusions.** No injection into irreversible actions, actions bearing on the
  rights, safety, care, credit, employment or legal position of an identified
  person, or any queue where a missed fault could reach a customer, regulator or
  patient before the interlock fires.

**Outcomes, decided in advance.**

- **Supported within scope** — detection on injected faults holds while the
  baseline rate declines. This licenses only the transition registered, for the
  action class tested, for the operator pool tested, until the next scheduled
  run.
- **Contradicted** — detection on injected faults declines together with the
  baseline rate, or falls below the pre-declared floor. The decline was reviewer
  degradation, not system improvement; the transition does not proceed and
  autonomy scope is reduced.
- **Inconclusive** — the run was underpowered, void, or the case is one the
  protocol cannot reach. **Inconclusive is never permission to graduate.**

**On the pass criterion.** State it structurally: *detection on injected faults
must not decline with the baseline rate*, against a detection floor declared
before the run and defended as a policy choice from the consequence of a missed
fault. The source synthesis does carry a numeric pass threshold, but only inside
an embedded figure image with no text equivalent anywhere in the document; it is
therefore not reproduced here as a threshold, and no numeral should be quoted
for it until the figure has been read and signed by a named person.

**What is measured.**

- **M1 · Injected-fault sensitivity (*d′*).** Primary endpoint. A hit rate is
  not a sensitivity: a reviewer who becomes indiscriminately more challenging
  raises the raw detection rate without discriminating better. Report *d′* and
  the response criterion alongside the raw rate. *d′* requires a false-alarm
  term, which only M4 supplies — **M1 and M4 are one instrument, not two
  options.**
- **M2 · Operating-context-normalised hazard rate.** Envelope-boundary
  violations normalised by a task-difficulty stratification declared *before*
  the run. An unnormalised denominator falls when the work gets easier and says
  nothing about competence.
- **M3 · Verification dwell-to-complexity ratio.** Review time relative to a
  complexity score of the item, not absolute review time. Secondary continuous
  screen only, for the habituation reason given above.
- **M4 · Shadow-audit disagreement rate.** A random sample of *approved* actions
  routed to independent adjudicators blind to the reviewer's decision and to the
  system's output. The only measurement here that establishes an error baseline
  on real traffic. High cost, adds delay, does not scale to real-time
  throughput.

The baseline intervention rate is reported, because it is the quantity the
hypothesis is about. It is never an endpoint.

**Owner, fallback, restoration.** The custodian holds the key and files the run
report; the accountable authority for the affected domain (P12) takes the
decision. **Fallback on a contradicted or inconclusive result:** the current
oversight pattern stands and, on a contradicted result, autonomy scope is
reduced for the affected class — stop or narrow first, investigate second.
**Restoration** requires the reduced scope to be re-tested and a supported
result registered; a protocol draft, a declining baseline or an added reviewer
is not proof of control equivalence. A supported result expires: re-run at the
governing review cadence and immediately on any change to the model, prompt,
tool manifest, task mix or reviewer pool.

**What this protocol does not reach, stated because it is where the corpus most
wants evidence.** It requires a human decision point that can be recorded and
intercepted before execution, so **it does not reach in-envelope Tier 4
execution at all** — there is no per-action human decision there to instrument;
for that pattern it can test the *audit* function and nothing more. With the
exclusions above it also cannot touch irreversible or person-affecting actions.
And it runs out of power before it runs out of subtlety: distinguishing a gross
collapse in detection over a 45-day run at a 2% injection rate needs on the
order of 140 queue items per day, an order of magnitude more for a moderate
degradation, so a low-volume high-consequence queue — exactly the queue an
organisation most wants to relax — cannot be powered within 60 days at all. Such
a run yields a qualitative result (were *any* planted faults missed?) and must
be reported as **inconclusive**, never as supported. **Run unpowered, this
protocol returns "supported" by default and reproduces, with more machinery, the
defect it exists to fix.** Finally, catch trials perturb what they measure —
frequent trials destroy trust, infrequent ones fail to break habituation, and no
published calibration identifies a rate at which neither happens. (The evidence
for that perturbation is motor-adaptation research; its magnitude in cognitive
review work is unknown.)

### Governance Overhead Metrics

Governance infrastructure has real cost. Without efficiency metrics, it is
impossible to distinguish "governance is working" from "governance is overhead
with no signal." Finance and leadership will ask; measure proactively.

| Metric | Target | Alert threshold | What to do |
| --- | --- | --- | --- |
| Governance overhead as % of engineering throughput | < 15% | > 25% for two consecutive quarters | Audit which governance artifacts are actually influencing decisions; remove what isn't |
| False-positive rate on hook blocks | < 5% | > 15% | Rules are over-restrictive; refine with domain input |
| Time-to-update-governance-policy | < 2 weeks for standard changes | > 6 weeks | Governance model is too rigid; simplify change management path for low-risk policy updates |
| Incident-prevention rate attributable to governance controls | At least 1 prevented incident per quarter per active hook | Zero incidents prevented in 2 consecutive quarters | Hook may not be testing what matters; audit coverage |
| Hook false-negative rate (incidents that governance should have caught) | < 2% of total incidents | > 10% | Governance gaps; add coverage for the failure class |

*Calibrate after one quarter of baseline measurement.*

If governance overhead exceeds 25% of throughput with no corresponding
reduction in escaped defects, that is over-governance. Reduce ceremony,
increase signal. The corrective action is always the same: audit what is
actually influencing decisions and cut the rest.

### Quarterly Review Cadence

Begin formal quarterly reviews once your team reaches Phase 4 (governed
delivery). At Phases 1-3, use the phase-specific metrics above in lighter-
weight retrospectives. Once at Phase 4, each quarter review:
- Lead time from specification to verified deployment
- Escaped defect rate and incident severity distribution
- Rollback frequency and mean time to recovery
- Policy violation rate and evidence bundle completeness
- Human oversight load (high-risk reviews per domain owner)
- Total cost of correctness by domain
- Team health indicators

If governance overhead rises while quality and resilience do not improve, reduce
control complexity and re-baseline autonomy scope.

---

## Common Failure Modes of the Change Program

The [Companion Guide](../companion/reference.md#failure-modes-of-this-manifesto)
covers technical failure modes (over-governance, evidence theater, control
theater, etc.). This section covers failures in the organizational change
process itself.

- **Adoption without transition support.** Leadership announces "we're doing
  agentic engineering" without budgeting for training, experimentation time,
  or the productivity dip. Engineers are expected to learn on their own time.
  The fix: budget explicitly for the transition — training, protected
  experimentation time, and a communicated plan that accounts for the dip.
- **Ignoring the human cost.** System metrics improve while engineers burn
  out. Governance load exceeds human capacity but nobody measures it.
  The fix: track team health alongside system health. When burnout indicators
  appear, reduce scope before pushing harder. See
  [Sustainable Pace](roles.md#sustainable-pace).
- **Unclear ownership** between platform, product, and operations teams.
  Nobody knows who owns agent runtime, memory governance, or evaluation
  registries because these infrastructure categories didn't exist before.
  The fix: explicit domain-owner assignments with escalation rotations,
  created as part of the Phase 4→5 transition.
- **Premature autonomy expansion.** A successful pilot in one domain leads
  to immediate rollout across all domains, skipping the evidence that the
  governance model scales. The fix: gate expansion on two consecutive
  quarters of stable or improving metrics in the current scope.
- **Incentive-adoption mismatch.** The organization adopts the manifesto's
  vocabulary but continues rewarding output volume (PRs merged, velocity
  points). Engineers learn to game the new system by producing minimal
  evidence bundles that satisfy the letter of the process without the
  spirit. The fix: align incentives with outcomes before expanding adoption.
  See [Incentive Misalignment](pilot.md#incentive-misalignment).
- **Skipping phases.** A team jumps from Phase 2 to Phase 4 because they
  "don't need" Phase 3's learning period. They adopt governance infrastructure
  without having documented the failure patterns it's supposed to catch.
  The fix: each phase builds prerequisites for the next. The phases are not
  a checklist to accelerate through — they are a learning sequence.
