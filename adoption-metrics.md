# Adoption Playbook — Success Metrics and Failure Modes

*How to measure progress and the common ways the change program fails.*

Read the [Manifesto](manifesto.md) for the core principles.
See the [Adoption Playbook](adoption-playbook.md) for the full table of contents.
See the [Adoption Path](adoption-path.md) for incremental steps and phase
transitions.

**Canonical sources.** Normative principle definitions (P1–P12) are in
[manifesto-principles.md](manifesto-principles.md). Metric thresholds and
alert bands in this document are *heuristics* — example starting bands that
must be calibrated to local baseline, domain, and risk class before use.
See [glossary.md](glossary.md) for canonical term definitions.

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
but operationally blind — is the most common governance failure at scale. Detect
it quantitatively before it becomes an incident:

| Signal | Example healthy band | Example alert band | What it indicates |
|---|---|---|---|
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

**Intervention protocol when thresholds breach:** Do not add more reviewers.
Reduce autonomy scope for that reviewer's domain until review is meaningful
again. The problem is volume, not capacity. Additional reviewers at the same
volume create the same rubber-stamping pattern faster.

### Governance Overhead Metrics

Governance infrastructure has real cost. Without efficiency metrics, it is
impossible to distinguish "governance is working" from "governance is overhead
with no signal." Finance and leadership will ask; measure proactively.

| Metric | Target | Alert threshold | What to do |
|---|---|---|---|
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

The [Companion Guide](companion-reference.md#failure-modes-of-this-manifesto)
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
  [Sustainable Pace](adoption-roles.md#sustainable-pace).
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
  See [Incentive Misalignment](adoption-pilot.md#incentive-misalignment).
- **Skipping phases.** A team jumps from Phase 2 to Phase 4 because they
  "don't need" Phase 3's learning period. They adopt governance infrastructure
  without having documented the failure patterns it's supposed to catch.
  The fix: each phase builds prerequisites for the next. The phases are not
  a checklist to accelerate through — they are a learning sequence.
