## 5. Autonomy is a permission ceiling, not a switch



Grant permissions by risk tier, least privilege, and blast-radius limits. Agents
behave like serverless functions, not employees: spin up for a guarded task,
verify the result, and terminate.

Autonomy operates in explicit governance tiers — each defining who approves,
what evidence is required, and what blast radius is acceptable:

**Tier 1 — Observe.** Agents analyze and propose. Blast radius: none.

**Tier 2 — Branch.** Agents write to isolated branches. Humans approve merges.
Blast radius: contained.

**Tier 3 — Commit.** Agents take production-impacting actions with explicit
human approval per change, attached rollback plans, and verified evidence. Blast
radius: governed.

**Tier 4 — Operate.** Agents execute autonomously within a human-approved,
machine-enforced policy envelope — without per-change human approval. The human
approves the envelope (allowed change classes, blast radius ceiling, required
evidence schema, rollback conditions, kill-switch configuration) and retains
accountability for its design. Agents act within it; anomaly detection and
governance observability surface deviations for human review. Blast radius:
policy-bounded.

Tier 4 is not Tier 3 with the human removed. It is a governance model shift:
accountability moves from the action level to the policy level. This only holds
when the policy envelope is machine-enforced (not merely documented), control
evaluations confirm the governance system itself works (P8), governance
observability is instrumented and alerting on stale evidence and drift (P9),
and rubber-stamping detection is active (P12). Without these prerequisites,
Tier 4 is ungoverned production autonomy. The control state record produced by
each loop iteration (see *What the Loop Produces*) is the primary audit
mechanism at this tier: it must confirm that each action fell within the
approved envelope before the action is logged as compliant.

Within each tier, define granular permissions: read production data but not
write, deploy to canary but not full rollout, modify test code but not
application code, change configuration but not schema. Tiers define the
governance level; permissions define the allowed actions within that level.

*Minimum bar: If you cannot reconstruct an agent's decision-relevant observable
evidence and causal execution history at any tier, your autonomy model has
failed.*

*Minimum bar (tool authorization): If an agent can invoke tools that have not
been explicitly authorized for its operating tier, the tier model is nominal.
Tool access is part of the permission model — not a separate concern. A tool
that a Tier 1 agent can call without authorization is a tier violation
regardless of whether the agent chooses to call it.*

*Minimum bar (Tier 4): If the policy envelope is not machine-enforced, if
control evaluations are not passing, or if governance observability is not
instrumented, Tier 4 operation is not permitted regardless of phase.*

**Phase maturity is a prerequisite for autonomy tier.** Tiers and phases are
not independent: a team cannot safely operate at a higher tier than their phase
supports, regardless of available infrastructure.

*Deployment status disclosure (as of 2026-05-03):* No production Tier 4
deployment is known to have been independently validated against the
prerequisites stated above. The bar is documented; it has not been empirically
met at scale in any deployment publicly reported against this specification.
Treat Tier 4 as a research target with explicit prerequisites — not a
production target with checklist-clearance — until independent validation
evidence exists. This disclosure will be updated when validated deployments
are reported.

These maximum tiers are conservative defaults for the relevant work item, not a
blanket organization-wide policy. Calibrate by domain, data classification, and
blast radius.

| Phase | Maximum available tier | Rationale |
| --- | --- | --- |
| Phase 1-2 | Tier 1 only for governed production work | No evaluation suite, no evidence bundles — agent output is unverified |
| Phase 3 | Tier 1 only for governed production work | Autonomy without verification; governance infrastructure not yet in place |
| Phase 4 | Tier 2 (branch + human approval) | Verification gates operational; blast radius is contained |
| Phase 5+ | Tier 3 (governed production impact) | Full Agentic Loop with verification, validation, and domain-scoped accountability |
| Phase 5+ with validated governance infrastructure | Tier 4 (policy-envelope autonomous operation) | Machine-enforced envelope, passing control evaluations, active governance observability, and rubber-stamping detection all confirmed operational |

In regulated industries, use-case-specific caps apply independently of phase.
See [Companion Frameworks](companion-frameworks.md#hard-autonomy-caps-by-regulated-use-case)
for the regulated-industry cap table.

**Phase maturity and task blast radius are independent checks.** Team phase
determines the governance capability ceiling; it does not automatically qualify
every task that falls nominally within that tier. For each task, perform a
separate blast-radius assessment before acceptance:

1. What is the maximum credible impact if this specific task fails?
2. Does that impact stay within the governance coverage of the current phase?
3. If not — escalate the task to a phase with appropriate coverage, or decompose
   it so each subtask stays within the governance boundary.

A Phase 4 team operating correctly for Phase 4 can still fail on a cross-domain
task whose blast radius exceeds Phase 4 governance coverage. Phase is a team
capability ceiling; blast-radius assessment is a per-task gate. The most
consequential failures tend to occur at domain boundaries, where tasks cross
phase ceilings that are not checked at the task level.

**Autonomy tiers and human oversight patterns are complementary
classifications.** Tiers classify the scope of agent authority. Oversight
patterns classify the structure of human involvement. Both must be specified;
neither is sufficient alone.

Four oversight patterns correspond to the tier model:

**Human In the Loop (HITL).** A human reviews and approves each agent output
before it is enacted. This is the required pattern for Tier 1 proposals, Tier 2
merge approvals, Tier 3 evidence bundle sign-off, and any Tier 4 envelope
change. HITL has two modes: *synchronous* (human review before the output takes
effect — required when the action is irreversible before review can complete)
and *asynchronous* (agent output enacted, human reviews and may revert
immediately afterward — appropriate when the action is reversible within the
review window). The distinction is not organizational preference; it is
determined by the irreversibility window of the action class.

**Human On the Loop (HOTL).** The agent executes within defined boundaries; a
human monitors and retains intervention authority before consequences become
irreversible. The human does not review every action. HOTL is the natural
oversight pattern for Tier 2 branch execution and Tier 3 operational
monitoring. Its governance condition is the irreversibility window: the time
from action to irreversibility must exceed the sum of alert detection latency,
human notification latency, assessment time, and intervention execution time.
If this condition cannot be satisfied, HOTL is not providing the claimed
governance function — the pattern must be upgraded to HITL or the action's
reversibility must be engineered to be longer.

**Human Off the Loop (HOLL).** The agent executes fully autonomously within a
machine-enforced policy envelope. No human is present during operation. This is
the Tier 4 pattern for in-envelope actions. HOLL requires three conditions
beyond the Tier 4 prerequisites already stated: (1) the per-action evidence
record is sufficient to reconstruct accountability without any human witness —
a regulatory examiner must be able to determine from logs alone whether any
action was within the approved envelope; (2) a periodic compliance audit at a
defined cadence confirms that in-envelope actions remain within the
specification's behavioral intent, not merely within the technical envelope;
(3) reversion triggers are pre-defined — the conditions that cause the system
to revert from HOLL to a more restrictive pattern are specified before
deployment, not determined reactively after an incident.

**Expert-Driven Loop (EDL).** A qualified domain expert — not a
general-competence reviewer — exercises judgment that defines correct behavior
for use cases that cannot be fully pre-specified. EDL is not a separate queue
structure. It is a qualification constraint on HITL: it determines *who* may
serve as the human reviewer for designated work item classes. EDL applies
wherever correct behavior requires domain expertise to assess rather than a
pre-specified contract to enforce. In engineering delivery: independent
validation for high-stakes and regulated systems (where organizational
independence is necessary but not sufficient — domain expertise is also
required); security review for systems with adversarial exposure; compliance
validation in regulated industries. Expert judgment accumulates as ground
truth: each expert review must produce a structured record of the case, the
judgment, and the behavioral pattern it represents, so that the expert's
criteria can be progressively codified into specifications that reduce EDL
dependency over time.

The oversight pattern for a given work item class is not derived from its
autonomy tier alone — it is specified at the point where the work item class is
defined, and it constrains how the tier's governance is implemented. A Tier 3
system with asynchronous HITL has a longer action-to-review window than a Tier
3 system with synchronous HITL; both satisfy the tier model, but one requires a
more demanding reversibility guarantee.

*Minimum bar (HOTL): If the irreversibility window for a HOTL-designated action
class has not been measured and confirmed to exceed the sum of monitoring
detection, notification, assessment, and intervention time, HOTL is not
providing oversight — it is providing the appearance of oversight.*

*Minimum bar (HOLL): If the per-action evidence record is not sufficient to
reconstruct accountability from logs alone — without any human witness — HOLL
is not a governed autonomy model. It is Tier 4 in name with ungoverned
operation in practice.*

*Minimum bar (EDL): If the independent validator's domain qualifications are
not documented, or if their review produces no structured record of judgment
rationale, independent validation is organizational theater, not a governance
control.*

---
