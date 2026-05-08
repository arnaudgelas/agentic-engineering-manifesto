## Principle 10 — Emergence & Containment: Extended Guidance


*See Principle 10 in the manifesto for the core statement and minimum bar.*

### Chaos Practice

Practice chaos: test with tool outages, noisy retrieval, adversarial inputs,
partial memory corruption, reordered swarms, and model degradation — before
reality does. Offline tests are insufficient for systems that operate
autonomously in the wild. Enforce invariants at runtime with policy checks,
monitors, and automated intervention.

Chaos testing for agentic systems requires its own safety model:
- **Steady-state hypothesis**: define expected behavior before injecting faults,
  so you can detect when the system has left its safe operating envelope.
- **Blast-radius controls**: isolate chaos experiments to scoped environments,
  shadow traffic, or canary populations — never inject faults into the full
  production agent population.
- **Automated abort conditions**: if the system breaches predefined thresholds
  (error rate, latency, cost spike), halt the experiment and roll back
  automatically.
- **Graduated severity**: start with single-fault injection (one tool outage),
  then compound faults only after single-fault resilience is proven.

### Threat Modeling

Threat modeling must explicitly include:
- Prompt injection and jailbreak propagation across agent chains
- Memory/context poisoning and supply-chain contamination
- Agent impersonation and forged role assertions in swarm coordination
- Data exfiltration through tool permissions and connector abuse

Defense-in-depth means identity for agents and tools, signed provenance for
shared state, least-privilege tool scopes, egress controls, and continuous
anomaly detection for cross-agent trust edges.

### Real-World Containment Failures

The OpenClaw ecosystem (2025-2026) provides instructive case studies. OpenClaw
itself — an open-source autonomous agent with 247K GitHub stars — demonstrated
how rapidly agentic systems scale when governance is absent. The Moltbook
incident (February 2026) exposed 1.5 million registered agents (only 17,000
human owners) through a misconfigured Supabase database with full read/write
access. The failure hit every threat category above: no identity controls, no
domain scoping, no blast-radius limits, no audit trail.

NVIDIA's response — NemoClaw (GTC 2026) — is an enterprise-hardened fork that
adds YAML-based permission policies, audit logging, and guardrail constraints.
This is containment engineering in practice: the same agent runtime, now with
the governance layer the manifesto requires. The pattern validates the core
P10 claim: emergence is not a feature to celebrate but a hazard to engineer
around. Systems that scale without containment infrastructure will produce
incidents at scale.

---
