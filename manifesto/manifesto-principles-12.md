## 12. Accountability requires visibility


Agents execute; humans own outcomes, risks, approvals, and incidents. No agent —
however capable — absorbs legal, ethical, or operational responsibility. Release
decisions, risk acceptance, production behavior, and incident response require a
human with skin in the game. Agents may prepare evidence, summarize risk, flag
missing controls, and recommend decisions. Agents may not accept residual risk,
approve production exposure, waive controls, or absorb accountability for
business outcomes. The boundary is not capability — it is consequence: when a
decision has consequences the organization must answer for, a named human must
make it.

But accountability without visibility is a legal fiction. You cannot own what
you cannot see. The autonomy tiers in Principle 5, the traces in Principle 9,
and the verification and validation disciplines in Principle 8 exist to make
human accountability meaningful rather than ceremonial.

In regulated environments, accountability extends to independent validation:
the organizational separation between the team that builds and verifies a system
and the team that independently validates it is not bureaucracy — it is the
mechanism that makes accountability real. A governance structure where the same
team both builds and validates has no external check on whether its verification
was genuine.

**Accountability at scale operates at the policy level, not the action level.**
When agents process thousands of actions daily, per-action human review is
neither feasible nor the right model. The resolution is a three-tier framework
applied per action class:

| Action class | Human involvement | Accountability mechanism |
| --- | --- | --- |
| **Low-risk, reversible** (Tier 1, contained blast radius) | None per action; domain owner reviews statistical samples and trend dashboards | Automated evidence bundle; rollback ready; anomaly alert if pattern deviates |
| **Medium-risk, governed** (Tier 2, branch + approval) | Human approves merge; does not review every line | Evidence bundle gates approval; trace available on demand |
| **High-risk, production-impacting** (Tier 3) | Named human reviews evidence and accepts risk per change | Full evidence bundle required; no automated promotion |
| **Policy-envelope autonomous** (Tier 4) | Human approves and owns the policy envelope; no per-action review; anomaly detection routes deviations to human | Control state record confirms each action fell within the approved envelope; governance observability surfaces drift; kill switch available and tested |

A domain owner owns the risk policy, the autonomy tier ceiling, the escalation
path, and the incident response protocol for their domain. They do not approve
every low-risk action — they own the framework that governs those actions, and
they carry the accountability when that framework fails. When trace volume
exceeds meaningful review capacity, the correct response is to raise automation
barriers (tighten evaluation thresholds, lower autonomy tiers) until oversight
signal quality is restored — not to accept degraded oversight as a workload
problem.

Failures are data: errors and crashes are learning opportunities, and
hallucinations can become a hallucination loop where plausible-but-wrong early
output drives increasingly wrong follow-on fixes. Never simply retry a failed
prompt. Diagnose, update memory, strengthen contracts and constraints, and rerun
verification before retrying. But someone must own the consequences when systems
go live. Clear responsibility is not bureaucracy; it is system safety.

*Minimum bar: If no named human can inspect the reasoning, review the evidence,
and own the outcome of a production agent, the system is ungoverned.*

**The four oversight patterns define how accountability is exercised, not just
claimed.** The three-tier action class table above maps action risk to human
involvement. The oversight patterns from P5 specify the structure of that
involvement. Together they close the gap between "a named human is accountable"
(a statement about who) and "accountability is actually being exercised" (a
statement about how).

Accountability failures in agentic systems cluster around three patterns:

*Accountability diffusion* — the accountable human's name is on the record, but
their actual review was nominal. The oversight design nominally provides HITL;
in practice, the reviewer approves without reviewing. Detected by: override
rate at or near zero for work item classes with known complexity; reviewer
agreement rate above 95% for sustained periods; review latency consistently
below the minimum plausible for the case type. When these signals appear, raise
the investigation before assuming the agent has become trustworthy — the more
likely explanation is that human oversight has degraded into a signature
ceremony.

*Accountability displacement* — the oversight design nominally provides HOTL,
but the monitoring design does not detect violations within the irreversibility
window. The human is on the loop in principle; the loop has no signal that
reaches them in time to act. Detected by: monitoring false negative rate
(violations that did not generate alerts, discovered post-hoc);
alert-to-intervention latency exceeding the irreversibility window on measured
cases; monitoring coverage validation failures.

*Accountability abstraction* — the oversight design nominally provides HOLL,
but the per-action evidence record is insufficient to reconstruct what happened
and why. The policy envelope was approved; the audit cannot confirm compliance.
Detected by: evidence records with missing fields; audit findings that cannot
be resolved because the log is incomplete; inability to answer, for a specific
action, whether it was within the approved envelope.

**The Expert-Driven Loop is the fourth accountability mechanism.** When correct
behavior cannot be fully pre-specified, the domain expert who defines it is the
accountability anchor for that determination. An independent validation
performed by a reviewer without domain expertise does not satisfy the
accountability requirement for expert-designated work item classes — it
satisfies the presence requirement while failing the quality requirement. The
accountable expert is not interchangeable with an accountable generalist for
work item classes where the distinction matters.

**Oversight adequacy is measurable.** "We have HITL" is not an accountability
claim. "Our HITL override rate is N%, reviewer calibration is current, SLO
compliance is N%, and capture detection has not triggered in N months" is an
accountability claim. Accountability requires visibility — into the agent's
reasoning (P9) and into the oversight mechanism's performance. Both must be
instrumented.

*Minimum bar (oversight adequacy): If you cannot report, for each oversight
pattern in use, the metrics that indicate whether the pattern is delivering
genuine governance — override rates for HITL, false negative rates for HOTL,
compliance audit currency for HOLL, expert qualification currency for EDL — you
cannot claim the governance is functioning. You can only claim it is present.*
