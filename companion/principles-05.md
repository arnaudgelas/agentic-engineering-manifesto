## Principle 5 — Autonomy: Extended Guidance


*See Principle 5 in the manifesto for the core statement and minimum bar.*

### Setting Tier Boundaries

The manifesto defines four tiers (Observe, Branch, Commit, Operate), but
choosing where to draw the boundaries for your organization is the harder
problem. Tier assignment should be driven by three factors:

- **Blast radius**: What is the maximum credible impact if the agent acts
  incorrectly? Tier 1 (Observe) for actions with no production impact. Tier 2
  (Branch) for actions contained to isolated environments. Tier 3 (Commit) only
  for production-impacting actions with verified rollback. Tier 4 (Operate) only
  within a machine-enforced policy envelope with passing control evaluations and
  active governance observability.
- **Reversibility**: How quickly and completely can you undo a wrong action?
  Fast, clean rollback justifies higher autonomy. Irreversible actions (data
  deletion, external API calls, customer-facing communications) demand stricter
  gates regardless of blast radius.
- **Confidence maturity**: How long has the agent been operating on this task
  class, and what is the historical error rate? New task types start at Tier 1
  even if the blast radius would theoretically permit Tier 2. Promote only when
  evidence shows consistent correctness over a meaningful sample size.

In practice, start conservative. Most teams should default every new agent
capability to Tier 1 and promote through evidence, not through optimism.

### Runtime Tier Escalation

Agents sometimes discover mid-task that they need capabilities above their
current tier. The protocol for tier escalation must be explicit:

1. The agent pauses execution and emits a structured escalation request: what
   action it needs, why, what evidence supports the request, and what the blast
   radius would be.
2. The system routes the request to the appropriate approver (automated policy
   check for Tier 1→2, human reviewer for Tier 2→3, governance board approval
   for Tier 3→4).
3. Approval is scoped and time-bounded — the agent receives temporary elevation
   for a specific action, not a blanket tier promotion.
4. The escalation, approval, and outcome are traced and auditable.

If tier escalation happens frequently for a given task class, that is a signal
to reassess the tier assignment — either the task class belongs at a higher
tier, or the specification needs refinement to keep the task within its current
tier.

### Long-Lived Agents

Long-lived agents are an exception that requires explicit justification,
heartbeat monitoring, and drift controls. Tools are capabilities; audit tool
access and grant least privilege. Make risky actions reversible or
approval-gated.

The human role is to define the specification, set the tier, and own the
outcome — not to supervise every intermediate step. But autonomy without
governance is negligence. Calibrate the tier to the stakes.

### Infrastructure-Level Tier Enforcement in Practice

Enterprise agent runtimes are demonstrating what infrastructure-level tier
enforcement looks like at scale: declarative permission policies (typically
YAML or equivalent), audit logs for every agent action, and guardrail
constraints that the agent cannot override regardless of prompt instructions.
This is the pattern the manifesto requires — enforcement at the infrastructure
layer, not the prompt layer. Tiered autonomy is only meaningful when the
infrastructure, not the agent, enforces the boundaries.

### Auditing Tier Compliance

Tier boundaries are only meaningful if compliance is verified. Implement:

- **Runtime enforcement**: The infrastructure (not the agent) blocks actions
  outside the agent's tier. An agent at Tier 1 physically cannot write to a
  production database, regardless of what its prompt says.
- **Compliance dashboards**: Track tier violations, escalation frequency,
  and approval latency per domain. Rising violation rates signal either
  misconfigured tiers or inadequate specifications.
- **Periodic tier reviews**: Quarterly review of tier assignments against
  incident data. Promote agents with strong track records; demote or
  constrain agents with elevated error rates.

### Tier Assignment Decision Checklist

Before assigning a tier to a new agent capability — or promoting an existing
capability to a higher tier — answer the following questions. Each "yes" to
a risk question is a reason to stay conservative or require additional gates.
This checklist is a decision aid, not a policy replacement; it does not
substitute for domain-specific regulatory requirements.

**Blast radius and reversibility**

1. Could a wrong action affect production data, external parties, or
   safety-critical systems? → Default Tier 1 unless verified rollback exists.
2. Is the action irreversible within a one-hour window (data deletion,
   external API calls, customer-facing communications, financial transactions)?
   → Require Tier 1 or an explicit human approval gate at Tier 2.
3. Does the action cross a domain boundary (e.g., write to a system outside
   the agent's primary scope)? → Require explicit authorization, regardless
   of tier.

**Confidence maturity**

4. Has this agent operated on this exact task class for fewer than a
   calibration-minimum number of cycles with tracked outcomes? → Stay at Tier 1
   until evidence accumulates. (Calibrate the minimum to domain: typically
   20–50 cycles for low-blast-radius tasks; 100+ for production-impacting tasks.)
5. Has the agent's error rate on this task class been measured and is it
   within the threshold for the target tier? → If not measured, start at Tier 1.

**Specification and governance readiness**

6. Is the specification for this task class machine-readable with observable
   success criteria? → If no, Tier 1 regardless of blast radius. Tier escalation
   without a complete specification is not a risk decision — it is an unmanaged
   risk.
7. Is there an evaluation portfolio covering adversarial cases, not just
   happy-path behavior? → If no, do not promote beyond Tier 1.
8. Does the applicable domain set a regulatory floor (e.g., aviation DAL A/B,
   automotive ASIL C/D, medical device Class C, financial services SR 11-7
   high-risk model)? → The regulatory floor overrides the blast-radius
   assessment; it cannot be overridden by team judgment.

**Promotion and demotion rules**

- **Promote** one tier at a time, only after a consecutive-cycle window with
  zero incidents where the agent exceeded its authorized scope or caused
  undetected harm downstream (calibrate cycle count to domain; a reasonable
  starting default is 30 cycles for Tier 1→2, 60 cycles for Tier 2→3, and 90
  cycles with validated governance infrastructure for Tier 3→4).
- **Demote immediately** on any of: agent exceeded authorized scope; incident
  where blast radius exceeded predicted level; regulatory audit finding;
  specification drift detected; new task class introduced without fresh
  assessment.
- Demotion is immediate; re-promotion requires a fresh checklist pass and
  a complete incident review.

---
