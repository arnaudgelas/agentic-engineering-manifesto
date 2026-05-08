## 10. Assume emergence; engineer containment


Multi-agent systems exhibit emergent behavior by nature — some useful, some
dangerous. Expect nonlinear failures, feedback loops, and phase changes. Build
guardrails, rate limits, circuit breakers, and safe fallbacks before you need
them.

When emergence produces useful behavior, capture it. When emergence produces
dangerous behavior, contain it. The difference between these two outcomes is
the quality of your containment engineering.

Security is a containment concern, not a separate audit. Agentic systems that
autonomously write, execute, and deploy code present a distinct attack surface
that must be threat-modeled before granting autonomy beyond Tier 1:

- **Prompt injection** — adversarial content in retrieval artifacts, tool
  responses, or code patterns that redirects agent behavior without the
  operator's knowledge. Mitigate by treating all tool responses, retrieval
  artifacts, and agent-to-agent messages as untrusted input subject to input
  schema validation before processing. If the agent runtime cannot enforce an
  input boundary between external content and internal instruction, prompt
  injection is structurally enabled.
- **Privilege escalation** — chained agent calls that accumulate permissions
  no single call would be granted under least-privilege policy.
- **Data exfiltration** — tool calls that surface sensitive data to outputs
  that are not fully inspected or logged. Mitigate with egress controls on tool
  outputs — agent outputs that include retrieved or generated content must be
  logged with full trace before leaving the trust boundary. A system where
  output channels are not fully inspected and logged has no exfiltration
  defense.
- **Supply chain attacks** — poisoned tool registries, model adapters, or
  retrieval sources that corrupt agent behavior at ingestion time. Mitigate by
  pinning tools to verified manifests — checksum or signing verification against
  a known-good registry. A tool added to the manifest without integrity
  verification is an uncontrolled dependency.
- **Social engineering** — AI-generated outputs crafted to pass human reviewer
  scrutiny by exploiting reviewer trust in fluent, confident text. Mitigate by
  surfacing primary artefacts as the default review interface for any
  human-approval decision. An approval workflow whose default view is an
  agent-authored summary is structurally vulnerable to this attack.

Treat every retrieval artifact, tool response, and agent-to-agent message as
untrusted input. Defense-in-depth means identity for agents and tools, signed
provenance for shared state, least-privilege tool scopes, egress controls, and
continuous anomaly detection for cross-agent trust edges.

*Minimum bar: If you have not tested with tool outages, noisy retrieval, and
adversarial inputs, you are not chaos-tested. If you have not threat-modeled
prompt injection, privilege escalation, and exfiltration vectors for your
specific agent topology, you are not security-tested.*

**Governance failure modes are containment concerns, not compliance concerns.**
The following failure modes must be engineered against with the same discipline
applied to security threats:

- **Evidence laundering** — an agent assembles an evidence bundle from outputs
  it generated, creating circular self-attestation with no independent
verification. Mitigate by requiring that at least one verification step in the
evidence bundle is executed by a process that did not produce the artefact
under review.
- **Approval laundering** — a human signs off on a change by reviewing an
  agent-generated summary rather than the underlying evidence. Mitigate with
evidence bundle presentation controls that surface primary artefacts, not
agent-authored summaries, as the default review interface.
- **Compliance theater** — evaluations and controls are added to satisfy audit
  requirements rather than to catch failures. Detectable by back-testing
whether controls would have caught known past failures; if not, the control is
theater.
- **Stale-control reliance** — a control is recorded as passing because it has
  not been re-run since the system changed, not because the system still
satisfies it. Mitigate with the evidence freshness rules in the Definition of
Done.
- **Automated rubber-stamping** — human review rate collapses under volume;
  reviewers approve without meaningful inspection. Detectable via review-time
distribution metrics as defined in adoption-metrics.md; requires the response
defined in Principle 12: raise automation barriers, lower autonomy tiers until
oversight signal quality is restored.
- **Waiver accumulation** — waivers granted for specific circumstances persist
  beyond those circumstances, silently expanding the system's effective policy
boundary. Require waiver expiry dates and automated staleness detection so
accumulated waivers surface at the next release gate.

---
