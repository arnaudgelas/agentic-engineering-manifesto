# Companion Guide — Worked Patterns and Failure Patterns

*Concrete scenarios showing how the manifesto's principles apply in practice,
including both successful applications and governed failures.*

Read the [Manifesto](manifesto.md) for the core values and minimum bars.
See the [Companion Guide](companion-guide.md) for the full table of contents.
See the [Companion Principles](companion-principles.md) for extended guidance
on each principle.

---

## Worked Patterns

### Pattern A — Single-Domain Reliability Fix

Specification: "Retry payment capture exactly once after timeout; never
double-charge."

Agent decomposition: implement retry logic, add idempotency key handling, add
tests, produce trace and rollback plan.

Evidence bundle (Phase 4): diff, regression tests, trace ID, policy check
results, rollback command.

Outcome: shipped change, observed behavior, no duplicate charges in canary.

### Pattern B — Multi-Agent, Cross-Domain Coordination

Specification: "Cancel order across `orders`, `billing`, and `notifications`
without double-refund, stale customer status, or orphaned events."

Swarm decomposition:
1. Planner agent creates domain tasks with shared invariants.
2. Domain agents implement bounded changes in parallel.
3. Verification agent runs cross-service regression and contract checks.
4. Coordinator agent resolves conflicting diffs through a single commit path.
5. Operations agent gates rollout with canary and rollback criteria.

Evidence bundle (Phase 5): per-domain diffs, cross-domain trace graph,
invariant check results, reconciliation decisions, canary metrics, rollback
commands.

Outcome: one conflicting refund rule detected pre-merge, corrected via
constraint update, release completed without refund duplication.

### Pattern C — Memory Poisoning Recovery

Scenario: A retrieval shard serving the `billing` domain is corrupted by a
batch indexing error. Agents start generating code that references a deprecated
payment API. Three PRs are merged before the pattern is detected through
evaluation regression.

Detection: Evaluation metrics for billing-domain changes show a sudden increase
in API-compatibility failures. Trace analysis reveals all three failing changes
retrieved context from the same shard, and the retrieved context references the
deprecated API.

Recovery:
1. Isolate the corrupted shard — remove from retrieval rotation immediately.
2. Identify all memory entries created or influenced by the bad shard using
   provenance metadata.
3. Roll back billing-domain learned memory to the last known-good snapshot
   (pre-indexing error).
4. Revert or flag the three merged PRs for re-review against corrected context.
5. Re-index the shard from authoritative knowledge sources.
6. Add a retrieval canary for the billing domain: a known-good query with an
   expected result, run on every retrieval cycle, alerting on drift.
7. Update incident memory with the failure class, root cause, and recovery
   steps — so the system recognizes this pattern faster next time.

Evidence bundle: trace IDs of affected changes, memory diff (before/after
rollback), retrieval canary configuration, re-indexed shard validation.

### Pattern D — Economics Routing Decision

Scenario: A specification requires generating integration tests for a new API
endpoint. The team has access to a high-capability model (expensive, strong
reasoning) and a fast model (cheap, weaker on complex logic).

Routing decision:
1. Route the initial test generation to the fast model — integration test
   boilerplate is well-covered in training data and doesn't require deep
   reasoning.
2. Route the edge-case and adversarial test generation to the high-capability
   model — these require understanding failure modes and security boundaries.
3. Route the test review and evaluation against the existing regression suite
   to deterministic tooling — no model needed.

*Illustrative only, not benchmark data.*

Cost comparison (illustrative):
- All tasks to high-capability model: $4.20 total, 45 seconds.
- Routed as above: $0.85 total, 32 seconds (fast model handles 70% of volume).
- All tasks to fast model: $0.40 total, 25 seconds — but edge-case tests miss
  two security boundaries caught in evaluation, requiring a retry on the
  high-capability model. Actual total: $1.60, 55 seconds.

The lesson: total cost of correctness, not token price, is the metric.
The cheapest model is not always the most economical if its failure rate drives
rework.

### Pattern E — Autonomy Tier Escalation at Runtime

Scenario: An agent operating at Tier 2 (Branch) is implementing a database
migration. Mid-task, it discovers that the migration requires modifying a
production configuration value to update a connection string.

Escalation protocol:
1. Agent pauses migration and emits a structured escalation request:
   "Need to update `DB_CONNECTION_STRING` in production config. Reason:
   migration target requires new connection endpoint. Blast radius:
   all services using the billing database. Reversibility: config change is
   reversible via config rollback. Evidence: migration plan diff, test results
   on staging."
2. System routes the request to the domain owner (billing infrastructure).
   Because this is a Tier 2→3 escalation (production-impacting action), it
   requires human approval.
3. Domain owner reviews the evidence, approves with a time-bound scope:
   "Approved for this specific config key, this deployment window only."
4. Agent executes the config change, completes the migration, and the temporary
   Tier 3 elevation expires.
5. Full trace captured: escalation request, approval, action, outcome, tier
   restoration.

Anti-pattern: The agent modifies the production config without escalation
because its prompt says "complete the migration." Infrastructure enforcement —
not prompt compliance — must block this.

### Pattern F — Governance That Didn't Prevent the Incident

Scenario: A team at Phase 4 has evidence bundles, evaluation gates, and
defined autonomy tiers. An agent generates a migration that renames a database
column used by three downstream services. The evidence bundle is complete:
diff, passing tests (all within the agent's domain), trace, rollback command.
The domain owner reviews and approves. The change ships. Two hours later,
three downstream services fail because they depend on the old column name.

What went right: evidence bundle was complete per Phase 4 requirements.
Evaluation gates caught regressions within the domain. The trace made root
cause analysis fast — the team identified the breaking change in minutes,
not hours.

What went wrong: the evaluation suite only tested within the agent's domain
boundary. The specification said "rename the column" but didn't include
cross-domain impact as an acceptance criterion. The domain owner approved
based on evidence that was correct but incomplete.

Why the manifesto didn't prevent this: at Phase 4, governance is single-
domain. Cross-domain evaluation coverage is a Phase 5 capability (shared
evaluation registry, cross-domain trace standards). The team was operating
correctly for their phase — but their phase wasn't sufficient for the task's
actual blast radius.

The lesson: governed failure is still failure. The manifesto reduces the
frequency and blast radius of incidents, and it makes diagnosis and recovery
faster. It does not eliminate incidents. When a governed change still causes
an outage, the question is not "why didn't governance prevent this?" but
"what evidence was missing, and at what phase does the manifesto add that
evidence?" In this case, the answer is Phase 5's cross-domain evaluation
coverage — which the team should now prioritize for domains with shared
dependencies.

The anti-lesson: do not respond to this incident by adding more governance
at Phase 4 (requiring cross-domain reviews for every change). That is
over-governance — it would slow every change to protect against a failure
class that only occurs when changes cross domain boundaries. Instead, promote
the specific domains with shared dependencies to Phase 5 governance.

### Pattern G — Exception-Based Governance at Scale

These sampling thresholds are example defaults; calibrate them to local risk,
review complexity, and incident history. This is a governance pattern, not a
universal policy.

**Context:** A team at Phase 4+ is generating agent-driven changes at a volume
that exceeds meaningful human review of every change. Domain owners are showing
rubber-stamping signals (review time < 2 minutes, rejection rate < 1%).

**The supervision paradox:** Human review does not scale to machine-speed
output. Adding more reviewers at the same volume creates the same pattern
faster. The solution is to reduce the volume of decisions requiring human
review — not the quality of review.

**The pattern:**

1. **Classify all changes by risk tier** using an automated pre-screener built
   from domain rules and change impact analysis:
   - **High-risk:** Changes touching pricing logic, customer-facing decisions,
     shared schemas with cross-domain consumers, security boundaries, or
     compliance-annotated code paths → mandatory human review before merge.
   - **Medium-risk:** Changes within a single domain, touching non-critical paths,
     passing full evaluation suites → statistical sample (10-20%) reviewed by
     domain owner; remainder logged without review.
   - **Low-risk:** Test updates, documentation, configuration in isolated
     environments, changes with complete evidence bundles and no cross-domain
     impact → logged and merged automatically; retrospective audit.

2. **Gate high-risk changes explicitly.** A PreToolUse hook on PR creation
   checks the risk classification and blocks merge until the named domain owner
   approves. Approval latency for high-risk changes is a tracked metric —
   rising latency indicates the high-risk classification is too broad.

3. **Sample medium-risk changes.** The domain owner reviews a random 15% sample
   each week. If the sample catch rate (issues found per reviewed PR) falls below
   2%, the classification threshold may be too conservative — promote some
   medium-risk to low-risk. If the catch rate exceeds 15%, the threshold is too
   permissive — raise more to high-risk.

4. **Log low-risk changes for retrospective audit.** PostToolUse hooks produce
   full audit records. Internal audit or the 2nd line of defense conducts
   periodic retrospective reviews of the low-risk cohort (monthly, 5% random
   sample) to validate the classification is working.

**Evidence bundle:** Risk classification rationale per PR (which rules triggered
which tier), domain owner approval record for high-risk changes, weekly sample
review record, retrospective audit findings.

**Classification criteria examples:**

| Rule | Classification |
|---|---|
| Touches `src/pricing/**` | High-risk |
| Touches `src/claims/**` | High-risk |
| Modifies a database schema | High-risk (cross-domain impact) |
| New dependency added | High-risk (provenance review required) |
| Test file changes only, green regression suite | Low-risk |
| Documentation, README, comments | Low-risk |
| Single-domain logic change, passing evals | Medium-risk |

**Anti-pattern:** Treating all agent-generated changes as equally risky and
requiring human review for all of them. This creates the rubber-stamping failure
mode. The goal is not to review everything — it is to review the right things
with enough attention to catch real problems.

**Relationship to Three Lines of Defense:** In regulated environments, the
classification pre-screener is a 1st-line control. The 2nd-line independent
validation function reviews the classification criteria periodically (not
individual changes) and challenges whether the risk tiers are set appropriately.
The 3rd line audits whether the process was followed.

---

### Pattern H — The Persona Simulator

**When to use:** Before shipping a feature that involves complex user interactions,
ambiguous intent, or high diversity of user populations. Use this pattern to
validate that the specification itself is correct — not just that the implementation
satisfies the specification as written.

**The problem it solves:** Specifications are written from the perspective of the
team that wrote them. They encode assumptions about how users will interact with
the feature, what they will ask, and what they consider a success. These assumptions
are often wrong. Traditional testing verifies that the implementation matches the
spec; it does not verify that the spec matches user reality.

**Pattern:**

Deploy a swarm of simulation agents, each instantiated with a distinct persona
profile: domain expertise, communication style, prior experience with the system,
edge-case goals, adversarial intent (where applicable). Each persona agent
interacts with the feature under development using the specification as its
behavioral target.

The simulation produces two outputs:
1. **Coverage gaps** — interaction paths, question types, or intent categories
   that the specification does not address. These become specification amendments
   before implementation is finalized.
2. **Failure signals** — interactions where the feature's response would be
   incorrect, ambiguous, or unsafe from the perspective of that persona. These
   become evaluation cases in the evaluation portfolio (P8).

**Relationship to the Agentic Loop:** The Persona Simulator belongs to the
Validate phase, not the Verify phase. Verify confirms the implementation satisfies
the specification. Validate asks whether the specification itself is worth satisfying.
Running the simulator before implementation is complete (on a specification stub or
prototype) catches the wrong-thing-built failure class before it is fully built.

**Minimum viable version:**

```
personas = [
  { role: "power user", style: "terse", goal: "efficiency" },
  { role: "first-time user", style: "exploratory", goal: "orientation" },
  { role: "adversarial user", style: "probing", goal: "boundary-finding" },
  { role: "domain expert", style: "precise", goal: "correctness validation" },
]

for persona in personas:
  interactions = simulate(persona, feature_spec, n=20)
  gaps = extract_coverage_gaps(interactions, feature_spec)
  failures = extract_failure_signals(interactions, acceptance_criteria)
  report.add(persona, gaps, failures)
```

**Exit criterion:** The simulation is complete when coverage gaps have been either
addressed in the specification or explicitly accepted as out of scope, and all
failure signals have been added to the evaluation portfolio. Shipping without
addressing the failure signals is an explicit risk decision, not an oversight.

Not all failure signals can be deferred. Any failure signal involving safety,
data integrity, irreversible user harm, or a regulatory requirement is
non-deferrable: it must be addressed in the specification before the
implementation proceeds. Logging it as "accepted out of scope" is not
acceptable for these categories. If no fix is feasible, the feature scope must
be reduced to exclude the interaction class that produces the failure.

**What this pattern is not:** It is not a replacement for user research. Real users
surface failure modes that no persona model anticipates. The Persona Simulator is
a pre-ship filter, not a substitute for post-ship observation. It raises the floor;
it does not guarantee the ceiling.

---

## Failure Patterns

### Hallucination Loop

An agent misreads a timeout error as auth failure, applies credential retries,
and increases incident volume. Each retry generates plausible-but-wrong output
that drives increasingly wrong follow-on fixes.

The fix is not "retry the prompt." It is:
1. Diagnose using traces — identify the misclassification point.
2. Add a contract/invariant: "timeout retry must not mutate credentials."
3. Update evaluations with the failure class as a regression test.
4. Gate rollout until traces confirm the corrected behavior.

Never simply retry a failed prompt. Diagnose, update memory, strengthen
contracts and constraints, and rerun verification before retrying.

### Operational Recovery Cycle

1. Diagnose using traces and failure classification.
2. Add or tighten contract/invariant for the violated behavior.
3. Add regression and adversarial tests for the failure class.
4. Re-run verification and canary on constrained scope.
5. Promote only after evidence shows the loop is broken.

---

### Cross-Domain Incident Classification Framework

A common severity framework enables consistent incident classification,
reporting, and recovery across regulated environments. Domain-specific
calibrations are listed below.

| Severity | Definition | Recovery Expectation | Regulatory Trigger |
|---|---|---|---|
| **Severity 1** | Agent takes unauthorized action with external impact (customer accounts, patient data, regulatory submissions, safety-critical systems) | Immediate containment; production rollback; root cause analysis with executive sign-off | Mandatory regulatory notification in most domains (DORA Art. 17-23; MDR Art. 87; ITAR incident reporting) |
| **Severity 2** | Agent produces incorrect output detected before downstream impact; indicates a control failure (evaluation gate missed, tier enforcement bypassed) | Same-day diagnosis; evidence bundle with root cause; governance review of the failed control | Internal incident record; potential regulatory disclosure depending on data type affected |
| **Severity 3** | Agent performance degradation (latency, accuracy drift, increasing evaluation failure rate) detected through monitoring; within tolerance thresholds | Diagnosis within 24h; specification or tier adjustment if root cause identified | Typically internal; may trigger DORA notification if threshold-breaching degradation continues |
| **Severity 4** | Agent failure fully contained by circuit breakers or fallback mechanisms; no downstream impact | Post-incident review within 48h; update chaos test suite with the failure scenario | Internal only; document in resilience engineering log |

**Domain-specific calibration:**

- **Aviation**: Map to the failure condition category (Catastrophic, Hazardous,
  Major, Minor) of the software component affected. Any agent action affecting
  airborne software in a DAL A/B component is Severity 1 by default.
- **Medical devices**: Map to IEC 62304 safety class and ISO 14971 harm
  probability × severity. Any agent action affecting Class C critical-path
  software is Severity 1. Vigilance reporting timelines apply for Severity 1-2.
- **Pharma**: Map to GxP data integrity impact. Any agent action that
  modifies or corrupts GxP records without a valid audit trail is Severity 1.
  Deviation and CAPA procedures apply.
- **Financial services**: Use the DORA Severity 1-4 taxonomy defined in the
  [financial-services.md](domains/financial-services.md#dora-digital-operational-resilience-act)
  domain document. DORA notification timelines are strict; track them as a
  first-class workflow trigger.
- **Automotive**: Any agent action affecting ASIL C/D safety function
  specifications, test cases, or verification records is Severity 1. ISO 26262
  Part 8 change management requirements apply.
- **Defense / government**: ITAR/EAR violations are automatic Severity 1
  regardless of downstream impact. Report to the cognizant security officer
  immediately; do not attempt self-remediation before reporting.
