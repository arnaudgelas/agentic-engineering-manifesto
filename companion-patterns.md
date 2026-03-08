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
