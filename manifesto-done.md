# The Agentic Engineering Manifesto — Definition of Done

*What "done" means in agentic engineering.*

See the [Manifesto](manifesto.md) for the core values and the Agentic Loop.
See the [Twelve Principles](manifesto-principles.md) for the engineering
principles.

---

## The Agentic Definition of Done

Tokens generated and tasks dispatched are vanity metrics. "The agent said it
worked" is not a completed ticket.

A change is **done** when it is:

**Shipped** — deployed or delivered, not just merged.

**Observable** — instrumented and logged so reasoning can be inspected and
reconstructed from traces.

**Verified** — evaluated against regression tests (and adversarial cases),
with an evidence bundle (diffs, trace IDs, policy check outputs) required for
every automated merge.

**Provable (when risk requires it)** — formalized invariants and replayable
proof artifacts attached for critical workflows.

**Learned from** — knowledge base and learned memory updated with what was
discovered, with provenance.

**Governed** — operating within autonomy tiers appropriate to its risk, with
human accountability assigned.

**Economical** — routed through appropriate model tiers, cost tracked and
justified per outcome.

Anything less is not done for the current phase.

This DoD is phase-calibrated, not all-or-nothing. At Phase 3, "verified" means
tests and a diff; at Phase 5, it means reproducible replay with formal artifacts
where justified. "Provable" applies only when risk requires it; "economical"
matters only when routing infrastructure exists. The bar rises with the stakes —
but at every phase, the question is the same: can you show evidence, not just
assertions?

**Evolvability as an implicit criterion.** A change that passes today's tests
but degrades the codebase's capacity for future change is not truly done — it
has traded short-term correctness for structural regression. Chen et al.,
*SWE-CI: Evaluating Agent Capabilities in Maintaining Codebases via
Continuous Integration* (2026, https://arxiv.org/abs/2603.03823), documents
that most agents introduce behavioral regressions in over 75% of CI iterations
on a long-horizon maintenance benchmark; treat it as one calibration point,
not a universal rate. This complements the issue-resolution benchmarks that
preceded it — Jimenez et al., *SWE-bench: Can Language Models Resolve
Real-World GitHub Issues?* (ICLR 2024, https://arxiv.org/abs/2310.06770), and
Yang et al., *SWE-agent: Agent-Computer Interfaces Enable Automated Software
Engineering* (2024, https://arxiv.org/abs/2405.15793) — by extending the
evaluation surface from single-issue capability to multi-commit, long-horizon
maintenance behaviour. SWE-CI is evidence of behavioral regression risk, not
a direct measure of architectural evolvability: CI metrics do not capture
coupling growth, cohesion decay, abstraction quality, or future-changeability.
Both risks are real and distinct. At Phase 4 and above, "verified" should
include evolution-weighted signals beyond CI pass rates — static analysis for
coupling growth, module boundary stability, and change amplification —
alongside the behavioral regression coverage the benchmark measures. See
[Structural Regression](companion-principles.md#behavioral-regression-vs-structural-regression)
in the Companion Guide.

**Why it matters:** This forces the system to optimize for actual business
outcomes rather than raw output volume, killing the illusion of productivity.

---

## Definition of Done for Hardening

*Applying the agentic DoD to work that begins as rapid exploration ("vibe
coding") and must become governed engineering before it ships.*

Exploratory agent output is not production-ready by default. A prototype that
"worked in the demo" has not passed the Agentic Definition of Done. The four
steps below define what hardening means: the path from captured exploration to
governed, verifiable output.

**Step 1 — Capture.** Record the vibe output exactly as produced: diffs,
trace IDs, prompts used, tool calls made, and any model or configuration state
at the time of generation. Treat this as raw evidence, not a deliverable. Do
not edit or clean the output before capturing it — the unmodified artifact is
the baseline.

**Step 2 — Extract Specification.** From the captured output, derive the
specification the agent was implicitly working toward: what behavior does the
output exhibit, what constraints does it respect (or violate), and what
observable success criteria would confirm it is correct? This step converts
intent from the agent's context window into a machine-readable, reviewable
specification. If no coherent specification can be extracted, the output is
not a candidate for hardening — it is a candidate for restart.

**Step 3 — Build Evaluation Portfolio.** For the extracted specification,
author an evaluation portfolio (P8): behavioral tests, adversarial cases,
and at least one holdout case not derived from the captured output. The
portfolio must include explicit regression coverage for any behavior the
captured output depends on. Evaluation theater — a portfolio that only
tests the happy path the exploration already demonstrated — does not satisfy
this step.

**Step 4 — Verify and Refactor.** Run the evaluation portfolio against the
captured output. Fix every failure. Refactor for structural quality (coupling,
abstraction, module boundary stability) sufficient for the change's autonomy
tier and risk level. Attach the evidence bundle (passing evaluations,
trace IDs, refactoring diffs) to the change. The change is done when the
evidence bundle is complete and a named human is accountable for it (P12).

The evidence bundle has a defined set of required components. The following
components are always required: passing evaluation reports with timestamps,
trace IDs linking specification to execution to output, diffs showing exactly
what changed, and policy check outputs confirming constraint compliance.

**Security static analysis results.** For loop outputs that produce code
touching external interfaces — HTTP endpoints, user-input processing, database
queries, file system operations, or external API calls — static application
security analysis must be run against the generated code and its results
included in the evidence bundle. The analysis must pass with no unresolved
Critical or High severity findings. A finding waived rather than remediated
must be documented with explicit justification and approved by the accountable
human before the evidence bundle is considered complete. The OWASP Application
Security Verification Standard (ASVS) provides the reference set of security
requirements against which static analysis rules should be calibrated; the
specific tooling that executes the analysis is an implementation choice.

**Bundle integrity attestation.** The assembled evidence bundle must be
integrity-protected before the release gate is assessed. Integrity protection
means that any post-assembly modification to the bundle's contents is
detectable. For most organisations, this is achieved by generating a
cryptographic hash of the complete bundle at assembly time and recording the
hash in the governance record, or by applying a digital signature using a key
controlled by the release system or the accountable human. The integrity record
— hash or signature — must be verifiable at the time of release gate assessment
and must be retained alongside the bundle for the duration of the system's
operational lifetime. A bundle whose integrity cannot be verified is a bundle
that may have been modified after the evidence was produced. In regulated
environments where tamper-evident audit trails are legally required, digital
signatures with non-repudiation properties are the appropriate mechanism.

**Agentic provenance record.** For any loop output produced by a system using
foundation models, the evidence bundle must include a machine-readable record
capturing the following fields at the time the loop completed:

- *Foundation model identifier and version* — the specific model used during
  the loop iteration, including fine-tune or adapter identifier if applicable.
- *Model provider category and deployment mode* — the category of provider
  (e.g., third-party API, self-hosted open-weight model, on-premises
  deployment) without naming specific commercial products or vendors.
- *Evaluation model parity* — whether the model used during evaluation matches
  the model deployed to production; if they differ, a documented justification
  must be present.
- *System instructions and prompts* — represented by cryptographic hash, not
  plaintext, to protect confidentiality while enabling change detection across
  iterations.
- *Tool manifest* — the complete list of tools, plugins, and integration
  servers available to the agent during the loop, their version identifiers,
  and their permission scopes.
- *Memory state version* — the identifier of the agent's persistent memory
  state at loop entry and at loop exit, where persistent memory is in use.
- *Retrieval corpus version* — the version identifier of any retrieval corpus,
  vector store, or knowledge base consulted during the loop, where retrieval
  augmentation is in use.
- *Embedding model version* — the model used to generate embeddings, where
  applicable.
- *Dataset lineage* — for systems using fine-tuned or domain-adapted models,
  the lineage of the training or fine-tuning dataset.
- *Policy constraints active* — the set of safety, content, and behavioral
  policies in effect during the loop iteration.

The record must be structured (machine-readable). It must be generated as part
of the loop completion process, not as a manual post-hoc document. It must be
filed with the evidence bundle and retained for the operational lifetime of the
system. The absence of this record is treated as an evidence bundle
incompleteness — not as a pass.

A change in any provenance field between loop iterations constitutes a material
change. It must be surfaced explicitly at the release gate because it may affect
evaluation validity: an evaluation run against one model configuration, tool
manifest, or retrieval corpus does not automatically transfer to a different
configuration. Any such change must be reviewed before the gate is cleared.

**The practical test.** Ask: if the person who ran the exploration session
left today, could another engineer reproduce, modify, and extend this output
using only the specification, the evaluation portfolio, and the evidence
bundle? If the answer is no, hardening is not complete.

**When to skip hardening.** Exploration output that will be discarded — a
spike, a proof of concept that will be rewritten, a learning exercise — does
not require hardening. The trigger for hardening is intent to ship, not
intent to keep. If the output is going to influence production behavior in any
form, the four steps apply.

### Evidence Freshness

Evidence decays. An evidence bundle that was complete and accurate at the time
of filing may become stale as the system changes beneath it. A threat model
produced for last quarter's architecture may not cover this quarter's
integrations. An SBOM generated at the last deployment does not reflect a
dependency update applied in a hotfix. A cost forecast produced before a model
repricing event no longer represents the system's actual cost profile. The
evidence bundle is not a permanent artefact; it is a snapshot of the system's
state at a point in time, and its validity is bounded by the changes that have
occurred since it was produced.

The following freshness rules apply to evidence bundle artefacts:

- **Threat model:** Stale on any material architecture change, tool manifest
  change, data source change, model version change, or integration of new
external systems. There is no calendar freshness window — staleness is
event-triggered by changes to the system's attack surface.
- **SBOM:** Stale on any dependency change or new deployment. A deployment that
  uses a dependency set different from the one in the filed SBOM requires a new
SBOM before the release gate.
- **Security static analysis results:** Stale on any code change to the files
  analyzed. Analysis results are scoped to the specific commit analyzed; they
are not forward-valid for subsequent commits.
- **Cost forecast:** Stale before a release if model pricing has changed since
  the forecast was produced, or if the model tier used in the loop has changed.
Stale in production if actual cost diverges from forecast by more than 20% over
a 30-day window.
- **Runbook:** Stale at every new release. The runbook must be reviewed and
  updated (or confirmed current) before each release before the release gate's
rollback condition is satisfied.
- **DPIA:** Stale on any change to the data purpose, data categories processed,
  or the identity of data subjects affected. A DPIA produced for an initial
version of a system does not automatically apply to a version that processes
additional data categories.
- **Model evaluation suite run:** Stale on any change to the model version,
  prompt version, tool manifest, or retrieval corpus. An evaluation run
conducted under a prior configuration is not valid for a configuration that
differs in any of these dimensions.
- **Rollback procedure test:** Stale 48 hours before production deployment. A
  rollback test must be conducted within the 48-hour window immediately
preceding the planned deployment.
- **Agentic provenance record:** Generated per loop iteration. The provenance
  record for a prior iteration is not valid for a subsequent iteration; any
change to a provenance field generates a new record.

A stale artefact in the evidence bundle does not automatically fail the gate —
it changes the condition's GateState to `stale` and requires the artefact to be
refreshed before the gate can be assessed as passed. The distinction between
`stale` and `fail` matters: a stale threat model was once correct;
understanding when it became stale and why guides the refresh effort. A failed
threat model requires correcting specific deficiencies. Treating all stale
artefacts as failures conflates two different problems and produces the wrong
remediation response — it directs the team toward correcting deficiencies that
may not exist, rather than refreshing coverage for changes that have occurred
since the artefact was produced.
