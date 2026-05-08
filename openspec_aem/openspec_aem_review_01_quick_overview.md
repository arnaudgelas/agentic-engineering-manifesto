# OpenSpec — Agentic Engineering Manifesto Alignment Review

**Framework:** OpenSpec — "AI-native system for spec-driven development" (`package.json` `description`); a CLI plus generated AI-assistant skills that scaffold change folders containing `proposal.md`, `specs/<capability>/spec.md` deltas, `design.md`, and `tasks.md`, validates their Markdown structure, and archives merged deltas into `openspec/specs/`.
**Version reviewed:** 1.3.1
**Review date:** 2026-05-08
**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@08123c263794b5cc24dbb3e1a5897a74288026e9`
**Reviewer methodology:** Agentic Engineering Manifesto — 12 Principles, 6-Phase Model, Agentic Loop, Agentic DoD (incl. Hardening DoD, agentic provenance record, evidence freshness rules), all Adoption / Companion / Beyond-Agile documents, AEM-relevant content from `governance/`, `integration/`, `regulatory/`, and `operational-templates/`, and European insurance domain guidance
**Context:** Allianz — European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II
**Overall Score:** 25.4/100
**Maturity Level:** Phase 1 — Exploration, with proto-elements of Phase 2 in the form of structured Markdown specs, delta blocks (`## ADDED Requirements` / `## MODIFIED Requirements` / `## REMOVED Requirements`), and a structural validator (`openspec validate`). The next phase's gate requirements are substantially unmet, the lowest being "an executable evaluation contract bound to specifications that the framework runs and gates merges on".

---

## Framing Warning

### What OpenSpec is

OpenSpec is a Node.js CLI distributed as `@fission-ai/openspec` (`package.json`) that generates AI-assistant slash-command skills (`/opsx:propose`, `/opsx:apply`, `/opsx:verify`, `/opsx:archive` and others) for "20+ AI assistants" (`README.md`). Its philosophy line is "fluid not rigid → iterative not waterfall → easy not complex → built for brownfield not just greenfield" (`README.md`). The product asserts it "adds a lightweight spec layer so you agree on what to build before any code is written" (`README.md`). Inputs are user intent and prior `openspec/specs/<capability>/spec.md` content; outputs are change folders and merged main specs.

### What the manifesto's scope OpenSpec covers by design

OpenSpec touches the manifesto's **Specify** loop phase (P2) and a thin slice of **Plan** (`tasks.md`). It produces versioned, reviewable, human-and-agent-readable specifications with `### Requirement:` / `#### Scenario:` blocks in Given/When/Then form (`docs/concepts.md`), enforced by `openspec validate` against a Zod schema (`openspec/specs/cli-validate/spec.md`). The delta model — `## ADDED`, `## MODIFIED`, `## REMOVED`, `## RENAMED` (`schemas/spec-driven/schema.yaml`) — gives brownfield change a first-class artefact. `openspec/config.yaml` injects a project `context:` block and per-artefact `rules:` into AI prompts.

### What is out of scope by design (scope gap vs. failure)

OpenSpec is "a lightweight spec layer" (`README.md`), not a runtime, an autonomy controller, an evaluation engine, or an observability stack. It does not execute scenarios, does not bind specs to test fixtures, does not enforce domain boundaries at runtime, does not score or constrain agent autonomy, does not log decisions or tool calls, does not route to model tiers, does not record cost, and does not name accountable humans. The README compares OpenSpec to Spec Kit and Kiro and frames it as "lighter and lets you iterate freely" — i.e., a planning artefact framework. Manifesto dimensions outside Specify/Plan are scope gaps, not capability failures, **for the framework's stated intent**. They remain alignment gaps for any deployer who relies on OpenSpec alone for governance.

### Score interpretation warning

These scores measure manifesto alignment, not fitness for OpenSpec's stated purpose. A dimension OpenSpec documents as out of scope (runtime enforcement, evaluation execution, observability, autonomy tiering, model routing, accountability) is reported in the preceding subsection and does not count as a capability failure of OpenSpec — it counts as a gap a deployer must close through composition with other tooling. A low score on out-of-scope dimensions therefore reflects a genuine alignment gap an Allianz deployer must close through external runtime, evidence, and governance infrastructure — not that OpenSpec is broken at what it claims to do. Allianz must make a separate judgment about whether OpenSpec closes governance gaps that existing model-governance, change-management, and second-line tooling already cover, or whether OpenSpec adds a parallel artefact stream that does not reach the regulator-credible bar set by Solvency II Article 124, EU AI Act Article 17, and DORA Article 6. Several gaps are operationally critical at Allianz because Solvency II Article 116 internal-model documentation, GDPR Article 22(4) automated-decision constraints, and EU AI Act Article 12 logging obligations apply to artefacts and runtime behaviour OpenSpec does not produce, regardless of how well its specs are authored.

---

## Part 1 — Overall Scores

### Manifesto Principles Table

| # | Principle Name | Weight | Score | Weighted | Severity |
|---|---|---|---|---|---|
| P1 | Outcomes are the unit of work | 10% | 32 | 3.2 | Critical |
| P2 | Specifications are living artifacts | 8% | 62 | 4.96 | Medium |
| P3 | Architecture is defense-in-depth | 8% | 18 | 1.44 | Critical |
| P4 | Right-size the swarm | 6% | 22 | 1.32 | Critical |
| P5 | Autonomy is a tiered budget | 10% | 12 | 1.2 | Critical |
| P6 | Knowledge and memory are infrastructure | 7% | 30 | 2.1 | Critical |
| P7 | Context is engineered like code | 7% | 35 | 2.45 | Critical |
| P8 | Evaluations are the contract | 10% | 34 | 3.4 | Critical |
| P9 | Observability covers reasoning | 10% | 14 | 1.4 | Critical |
| P10 | Assume emergence, engineer containment | 8% | 14 | 1.12 | Critical |
| P11 | Optimize economics of intelligence | 6% | 10 | 0.6 | Critical |
| P12 | Accountability requires intelligibility | 10% | 22 | 2.2 | Critical |
| **Total** | | **100%** | | **25.4** | **Critical** |

> **Weighted calculation:**
> P1 0.32×10=3.2; P2 0.62×8=4.96; P3 0.18×8=1.44; P4 0.22×6=1.32; P5 0.12×10=1.2;
> P6 0.30×7=2.1; P7 0.35×7=2.45; P8 0.34×10=3.4; P9 0.14×10=1.4; P10 0.14×8=1.12;
> P11 0.10×6=0.6; P12 0.22×10=2.2 → **sum = 25.39 ≈ 25.4**

The Score column on the Total row is left blank. The Severity column on the Total row reflects the overall severity of 25.4 per the canonical thresholds (0–39 = Critical).

---

### Agentic Loop Phases Table

| Phase | Score | One-sentence assessment |
|---|---|---|
| Specify | 60 | `schemas/spec-driven/schema.yaml` `proposal` and `specs` artefact templates plus `### Requirement:` / `#### Scenario:` Given/When/Then format (`docs/concepts.md`) make Specify a first-class step; the manifesto's loop-readiness gate (business need validated, value measurable, accountable human named, blast radius assessed) has no counterpart in OpenSpec's spec template. |
| Design | 35 | `schemas/spec-driven/schema.yaml` `design` artefact and `docs/concepts.md` "Architecture Decisions" section give Design a place; OpenSpec encodes no machine-enforced domain boundaries, type contracts, or repository gates and treats `design.md` as an "implementation plan" the agent generates rather than a constraint the system enforces. |
| Plan | 55 | `schemas/spec-driven/schema.yaml` `tasks` artefact format (`- [ ] X.Y Task description`) and the apply-phase tracker (`apply: tracks: tasks.md`) give Plan a parseable structure; OpenSpec does not size tasks against autonomy tier, blast radius, or capacity, and contains no signal that a task exceeds the operating tier. |
| Execute | 25 | `/opsx:apply` ("Implement tasks, updating artifacts as needed", `docs/opsx.md`) and `apply: requires: [tasks]` (`schemas/spec-driven/schema.yaml`) hand execution to the host AI assistant; OpenSpec does not bound the executing agent's tool scope, permission set, or blast radius — execution governance is delegated entirely to the host runtime. |
| Verify | 30 | `/opsx:verify` (`openspec/specs/opsx-verify-skill/spec.md`) checks "Completeness, Correctness, Coherence" against artefacts and produces CRITICAL/WARNING/SUGGESTION output; the same skill states that verify "Does not block archive" (`docs/commands.md` line 336) and that scenario coverage is a warning, not a gate, so verification is advisory not contractual. |
| Validate | 12 | The framework names `/opsx:verify` but exposes no Validate phase that asks "did we build the right thing" against business outcomes; `manifesto-principles.md` §8's distinction between verification and validation is not represented anywhere in `OpenSpec/openspec/specs/` or `OpenSpec/docs/`. |
| Observe | 14 | `src/telemetry/index.ts` records command names and version anonymously per the README ("only command names and version… No arguments, paths, content, or PII", `README.md`); there is no decision trace, tool-call log, memory-retrieval log, near-miss capture, or governance-state observability of the kind required by `manifesto-principles.md` §9. |
| Learn | 28 | The archive flow (`openspec/specs/cli-archive/spec.md`) merges `## ADDED` / `## MODIFIED` / `## REMOVED` deltas into `openspec/specs/<id>/spec.md` so durable spec evolution is captured; OpenSpec has no learned-memory store, no provenance metadata on agent-authored artefacts, and no expiry/rollback mechanism for memory entries — Learn is reduced to spec merging. |
| Govern | 18 | `openspec/config.yaml` `rules:` are injected per artefact (`docs/opsx.md` "Rules injection") and provide a thin governance hook; there is no policy envelope, no control state record, no waiver lifecycle, no economics review, no kill switch, and no out-of-scope-tool-call detection — the manifesto's Govern checklist is structurally absent. |

---

### Agentic Definition of Done Table

| Condition | Score | One-sentence assessment |
|---|---|---|
| Shipped | 22 | `openspec/specs/cli-archive/spec.md` archives a change once `tasks.md` checkboxes are marked complete; "Shipped" in the manifesto means "deployed or delivered" with a deployment ID (`manifesto-done.md`), and OpenSpec has no deployment record, no environment promotion, and no evidence that anything reached production. |
| Observable | 12 | Anonymous command-name telemetry (`src/telemetry/index.ts`, `README.md`) is the only built-in telemetry; the manifesto requires inspectable traces of decisions, tool calls, policy violations, memory retrievals, cost per task, and near-misses (`manifesto-principles.md` §9) — none are emitted by OpenSpec. |
| Verified | 30 | `/opsx:verify` (`openspec/specs/opsx-verify-skill/spec.md`) authors a CRITICAL/WARNING/SUGGESTION report and `openspec validate` enforces Markdown structure (`openspec/specs/cli-validate/spec.md`); `manifesto-done.md` requires "evidence bundle (diffs, trace IDs, policy check outputs) required for every automated merge" — none of these are produced or required by archive. |
| Provable | 8 | `openspec validate --strict --json` produces a stable JSON shape `{ items[], summary, version }` that CI can parse (`openspec/specs/cli-validate/spec.md`); OpenSpec contains no formal invariants, no replayable proof artefacts, and no contract-level proofs of the kind described in `manifesto-principles.md` §8. |
| Learned from | 25 | Archived changes are preserved under `openspec/changes/archive/<date>-<name>/` with proposal, design, tasks, and specs intact (`docs/concepts.md` "Why Archive Matters") so the change history is durable; `manifesto-principles.md` §6's distinction between knowledge and learned memory, and the provenance/expiration/rollback mechanisms required of memory, are absent. |
| Governed | 18 | `openspec/config.yaml` `rules:` blocks (`docs/opsx.md`) inject per-artefact governance hints into AI prompts; `manifesto-done.md` requires autonomy tier, named accountable human, rollback procedure, and control state record — none of these are produced or required by `openspec/specs/cli-archive/spec.md`. |
| Economical | 8 | OpenSpec records nothing about model choice, model tier, inference cost, or routing; the only cost-adjacent reference is `README.md`'s "Model selection: OpenSpec works best with high-reasoning models. We recommend Opus 4.5 and GPT 5.2" — a configuration recommendation, not the runtime model routing required by `manifesto-principles.md` §11. |

---

### Maturity Phase Verdict

OpenSpec maps to **Phase 1 (Exploration)** in the manifesto's six-phase model. The verdict is bounded by the lowest unmet gate, named in the next paragraph.

Phase 1 requirements are met: a versioned, reviewable specification artefact exists (`openspec/specs/<id>/spec.md` with `### Requirement:` / `#### Scenario:` structure per `docs/concepts.md`); a structural validator exists (`openspec validate` per `openspec/specs/cli-validate/spec.md`); a change record format exists (`openspec/changes/<name>/` plus `openspec/changes/archive/<date>-<name>/` per `docs/concepts.md` "Why Archive Matters"); a project context-injection mechanism exists (`openspec/config.yaml`). Proto-elements of higher phases are present — delta operations (`## ADDED Requirements` / `## MODIFIED Requirements` / `## REMOVED Requirements` in `schemas/spec-driven/schema.yaml`) approach a Phase 2 change-record discipline, and `/opsx:verify`'s CRITICAL/WARNING/SUGGESTION report (`openspec/specs/opsx-verify-skill/spec.md`) is a proto-evaluation pattern — but neither raises the verdict.

The lowest unmet Phase 2 gate is **executable evaluation bound to the specification that the framework runs and gates merges on**. `manifesto-principles.md` §8 requires "Every change must be verified against the evaluation suite — and every change must preserve or improve evaluation performance"; `openspec/specs/cli-archive/spec.md` does not run scenarios as executable assertions, does not bind a scenario to a test fixture, does not require a regression suite, and `/opsx:verify` "Does not block archive" (`docs/commands.md` line 336). Closing this gate requires (1) a scenario-to-test-asset binding mechanism in the spec schema; (2) a runner that executes those assertions during `openspec validate` or archive; (3) an archive precondition that fails the merge when scenarios fail or coverage decreases. Other unmet Phase 2 gates: a named-human accountability record in change metadata (closes via a required `accountable_human:` field in `.openspec.yaml` plus archive-time validation per `manifesto-principles.md` §12 minimum bar); an autonomy-tier declaration per change (closes via a required `autonomy_tier:` field with values 1–4 plus tier-vs-phase validation per `manifesto-principles.md` §5); a structured trace of agent decisions during `/opsx:apply` (closes via a tool-call/decision log written to `openspec/changes/<name>/.trace.jsonl` plus retention policy per `manifesto-principles.md` §9); and a control state record produced at archive time (closes via a `control_state.json` artefact in each archived change per `manifesto.md` "What the Loop Produces").

For Allianz specifically, the hard autonomy caps in `domains/insurance.md` for personal-lines underwriting (Tier 1), claims adjudication (Tier 1), IDD-scope advisory (Tier 1), and SCR calculation (Tier 1) mean the most operationally critical gaps are the absences of a tier declaration, a blocking second-line validation gate, and a named accountable human — not the absence of Tier 4 policy-envelope autonomy infrastructure. Gaps in executable evaluations and machine-readable acceptance criteria are critical because Solvency II Article 121 (statistical quality standards) and EU AI Act Article 15 (accuracy, robustness, cybersecurity) require testable acceptance evidence the spec scenarios in `openspec/specs/<id>/spec.md` do not constitute. The absence of a model-tier routing layer (P11) is less operationally critical at Phase 1 because Allianz's regulated use cases are capped at Tier 1–2 by `domains/insurance.md` regardless of P11 maturity.

---

## Part 2 — Scoring Methodology

OpenSpec artefacts read end-to-end before scoring: `OpenSpec/README.md`, `OpenSpec/package.json`, `OpenSpec/CHANGELOG.md`, `OpenSpec/AGENTS.md` (empty; noted), `OpenSpec/docs/concepts.md`, `OpenSpec/docs/workflows.md`, `OpenSpec/docs/commands.md`, `OpenSpec/docs/opsx.md`, `OpenSpec/docs/customization.md`, `OpenSpec/docs/getting-started.md`, `OpenSpec/docs/cli.md`, `OpenSpec/docs/installation.md`, `OpenSpec/docs/migration-guide.md`, `OpenSpec/docs/multi-language.md`, `OpenSpec/docs/supported-tools.md`, `OpenSpec/schemas/spec-driven/schema.yaml`, `OpenSpec/openspec/config.yaml`, the `openspec/specs/` directory listing (40 capability spec folders including `cli-validate`, `cli-archive`, `change-creation`, `opsx-verify-skill`, `opsx-archive-skill`, `opsx-onboard-skill`, `specs-sync-skill`, `context-injection`, `rules-injection`, `instruction-loader`, `schema-validate-command`, `schema-fork-command`, `schema-init-command`, `telemetry`, `workspace-foundation`, `workspace-links`, `workspace-open`), and `OpenSpec/src/commands/` and `OpenSpec/src/telemetry/` source-file listings. Manifesto sources read: `manifesto.md`, `manifesto-principles.md`, `manifesto-done.md`, `glossary.md`, `domains/insurance.md` (paraphrased to AEM-equivalent terms wherever it referenced out-of-scope frameworks).

Scope gaps were treated per the master prompt's hard rule 5: a documented scope boundary (e.g., "OpenSpec is a lightweight spec layer", `README.md`) is reported in the Framing Warning subsection "What is out of scope by design" and the principle is still scored against the manifesto's full bar; the score below 100 reflects an alignment gap a deployer must close, not a capability failure at OpenSpec's stated intent. The canonical 12-principle weighting from `prompt.md` was applied with scores expressed as decimals; severity labels follow the canonical thresholds (Critical 0–39, High 40–54, Medium 55–69, Low 70–100).

The framework's actual version (1.3.1) was verified against `OpenSpec/package.json` `version: "1.3.1"` and `OpenSpec/CHANGELOG.md` heading `## 1.3.1`. The review date 2026-05-08 is the date the agent was invoked. Unmerged or unreleased work was checked: `OpenSpec/openspec/changes/IMPLEMENTATION_ORDER.md` and `OpenSpec/openspec/explorations/*` describe planned workspace-UX work which is documented as "under active development and is not ready for use yet" (`docs/concepts.md` "Coordination Workspaces") — those capabilities are noted as planned/unreleased and do not count toward scores.

---

## Principle-by-Principle Score Rationale

### P1 — Outcomes are the unit of work (32/100 — Critical)

OpenSpec asserts that "AI coding without specs means vague prompts and unpredictable results. OpenSpec brings predictability without the ceremony" (`README.md`) and produces structured artefacts (proposal, specs, design, tasks, archived change) that survive past the chat session — a partial answer to the manifesto's "an agent that says 'done' has proven nothing" (`manifesto-principles.md` §1). What is absent is the manifesto's evidence definition: `manifesto-principles.md` §1 names "evaluation reports with pass/fail and metrics, trace IDs… deployment IDs… rollback plans… policy check outputs… memory updates"; OpenSpec produces none of these and `openspec/specs/cli-archive/spec.md` archives once `tasks.md` checkboxes are marked. For Allianz, Solvency II Article 124 (validation standards) and EU AI Act Article 15 require evidenced outcomes, not checked-task assertions.

### P2 — Specifications are living artifacts (62/100 — Medium)

OpenSpec is at its strongest here. `docs/concepts.md` defines `### Requirement:` and `#### Scenario:` blocks with RFC 2119 keywords ("MUST/SHALL — absolute requirement"), and `schemas/spec-driven/schema.yaml` mandates "Each requirement: `### Requirement: <name>`… Every requirement MUST have at least one scenario". The delta model (`## ADDED Requirements`, `## MODIFIED Requirements`, `## REMOVED Requirements`, `## RENAMED Requirements` per `schemas/spec-driven/schema.yaml`) makes spec evolution first-class. What is absent is the constraint-vs-specification distinction (`manifesto-principles.md` §2), the convergence gate ("acceptance criteria stable across three consecutive iterations"), and a machine-readable form: scenarios are prose, not parsed `WHEN`/`THEN` semantics. Solvency II Article 116 internal-model documentation requires structured, regulator-readable spec artefacts; OpenSpec's prose scenarios are reviewable but not machine-validatable beyond Markdown shape.

### P3 — Architecture is defense-in-depth (18/100 — Critical)

OpenSpec offers a `design.md` artefact and `docs/concepts.md` describes "Architecture Decisions" but provides no machine-enforced boundary mechanism. `manifesto-principles.md` §3 requires "machine-enforced policies: repository gates, type contracts, lint rules, domain ownership maps, CI checks"; OpenSpec has no domain-ownership map, no type contract on spec structure beyond Markdown headings, and no runtime wrapper. `openspec validate` is structural-only (`openspec/specs/cli-validate/spec.md`). The minimum bar — "If a boundary is described but not enforced at runtime with automated detection and recovery, it is not architecture — it is documentation" — is failed: OpenSpec produces a `design.md` document, not enforced architecture. EU AI Act Article 15 (accuracy, robustness, cybersecurity) and DORA Article 6 (ICT risk management) require enforced boundaries Allianz must source elsewhere.

### P4 — Right-size the swarm (22/100 — Critical)

OpenSpec is single-agent by design — `/opsx:propose`, `/opsx:apply`, `/opsx:verify`, `/opsx:archive` are invoked by one host AI assistant per `docs/opsx.md` "Commands" table — which aligns with `manifesto-principles.md` §4's "default to single-agent or pipeline" guidance. What is absent is the manifesto's coordination machinery for cases where a swarm is justified: typed, versioned shared state; conflict resolution; tier-containment for orchestrator-to-specialist delegation; specialised governance roles (specification critique, threat modeling, evidence assembly). `manifesto-principles.md` §4 minimum bar — "If shared state is not typed, versioned, and reconciled, the swarm is a mob" — is structurally unaddressable in OpenSpec. For Allianz, second-line independent challenge under EIOPA AI Guidelines requires role separation OpenSpec does not encode.

### P5 — Autonomy is a tiered budget (12/100 — Critical)

OpenSpec encodes no autonomy tier. There is no field in `openspec/changes/<name>/.openspec.yaml` for tier (1–4), no permission scope per artefact, no blast-radius assessment, no policy envelope, no rubber-stamping detection. `manifesto-principles.md` §5 minimum bar — "If you cannot reconstruct an agent's reasoning at any tier, your autonomy model has failed" — and the tool-authorization minimum bar — "If an agent can invoke tools that have not been explicitly authorized for its operating tier, the tier model is nominal" — are both unaddressable: OpenSpec records neither tier nor tool manifest. For Allianz, `domains/insurance.md` hard autonomy caps (Tier 1 for personal-lines underwriting, claims, IDD advisory, SCR) cannot be enforced through OpenSpec; tier governance must be sourced from another control plane.

### P6 — Knowledge and memory are infrastructure (30/100 — Critical)

OpenSpec treats `openspec/specs/<capability>/spec.md` as the durable source of truth — "Specs describe your system's behavior" (`docs/concepts.md`) — which maps to the manifesto's *knowledge* category: versioned, deterministic, authoritative, changed through governed processes. What is absent is *learned memory* (`manifesto-principles.md` §6): there is no learned-memory store, no provenance metadata on agent-authored artefacts, no expiration policy, no rollback of memory entries, no domain-scoped namespacing. Agent-authored specs and archive entries enter the knowledge base unlabelled, exposing Allianz to the "Knowledge contamination" failure mode named in `manifesto-principles.md` §6 — agent-authored ADRs retrieved with the same epistemic authority as human-authored knowledge. GDPR Article 5(1)(d) accuracy obligations require provenance OpenSpec does not record.

### P7 — Context is engineered like code (35/100 — Critical)

`openspec/config.yaml` and `docs/opsx.md` "Project Configuration" provide a `context:` block ("Tech stack: TypeScript, React, Node.js…") and per-artefact `rules:` injected into AI prompts wrapped in `<context>...</context>` and `<rules>...</rules>` tags with a 50KB context size limit. This is a thin context-engineering layer. What is absent is the manifesto's full bar (`manifesto-principles.md` §7): no hierarchical retrieval, no rolling summaries, no state compaction, no authority-weighted pruning, no retrieval performance benchmark, no test for retrieval correctness. Stale-embedding detection, conflicting-source resolution, and authority-weighting error detection are unaddressable. EIOPA AI Guidelines on data governance for AI inputs require retrieval discipline OpenSpec does not provide.

### P8 — Evaluations are the contract (34/100 — Critical)

Scenarios in `openspec/specs/<id>/spec.md` are prose interpreted by an agent, not executable evaluations. `openspec validate` (`openspec/specs/cli-validate/spec.md`) checks Markdown structure; `/opsx:verify` (`openspec/specs/opsx-verify-skill/spec.md`) produces a CRITICAL/WARNING/SUGGESTION report and "Does not block archive" (`docs/commands.md` line 336). Verification, validation, and independent validation are collapsed into one agent-run skill executed by the same actor that produced the implementation, failing `manifesto-principles.md` §8's three-discipline distinction. There is no governance evaluation suite (evidence bundle completeness, provenance consistency, control state record accuracy, rollback procedure currency, SBOM completeness). For Allianz, Solvency II Article 124 (independent validation), DORA Article 16 (digital operational resilience testing), and EU AI Act Article 17 (quality management system) require evaluation evidence OpenSpec does not produce.

### P9 — Observability covers reasoning (14/100 — Critical)

`src/telemetry/index.ts` and the README state OpenSpec collects "only command names and version… No arguments, paths, content, or PII. Automatically disabled in CI" (`README.md`). This is anonymous usage telemetry, not reasoning observability. `manifesto-principles.md` §9 requires "Instrument decisions, tool calls, policy violations, memory retrievals, cost per task, and near-misses" and "Every agent action must produce an inspectable trace: diffs, tool calls, decision chains, evaluation results, rollbacks". None of this is emitted by OpenSpec or by `/opsx:apply`. Governance-state observability (stale artefacts, failed/waived controls, ownership gaps, rubber-stamping patterns, model/prompt/tool manifest changes) is absent. EU AI Act Article 12 logging obligations and DORA Article 9 ICT operations require traces Allianz must source elsewhere.

### P10 — Assume emergence, engineer containment (14/100 — Critical)

OpenSpec contains no rate limits, circuit breakers, kill switches, threat model, or guardrails. Prompt injection (untrusted retrieval artefacts), privilege escalation (chained agent calls), data exfiltration (egress controls on tool outputs), supply chain attacks (pinned tool manifests with checksum verification), and social engineering (primary-artefact review interfaces) — the five threat classes in `manifesto-principles.md` §10 — are unaddressed. `openspec validate` "fails on unrecognized fields" per `openspec/specs/cli-validate/spec.md` is not containment, it is structural validation. For Allianz, GDPR Article 32 (security of processing) and DORA Article 10 (ICT-related incident detection and response) require containment evidence OpenSpec does not produce.

### P11 — Optimize economics of intelligence (10/100 — Critical)

`README.md` "Usage Notes" recommends "Opus 4.5 and GPT 5.2 for both planning and implementation" — a configuration recommendation, not a runtime routing decision. `manifesto-principles.md` §11 minimum bar — "If model choice is a configuration constant instead of a runtime decision, you are overspending" — is failed by design: model selection is the host AI assistant's, not OpenSpec's. There is no cost-per-task tracking, no cost-per-outcome metric, no governance-overhead accounting, no incident-remediation-cost field. Multi-model coherence handling (`manifesto-principles.md` §11) is unaddressable. For Allianz, ORSA model-cost disclosures and Solvency II operational-risk capital require cost evidence OpenSpec does not produce.

### P12 — Accountability requires intelligibility (22/100 — Critical)

OpenSpec records no named accountable human per change. `openspec/changes/<name>/.openspec.yaml` (per `docs/commands.md`) holds "schema, created date" — there is no `accountable_human:` field, no risk-acceptance signature, no waiver lifecycle. `/opsx:archive` (`openspec/specs/opsx-archive-skill/spec.md`) archives once tasks are checked, with no named-reviewer requirement. The minimum bar — "If no named human can inspect the reasoning, review the evidence, and own the outcome of a production agent, the system is ungoverned" — is structurally unaddressable. Oversight adequacy metrics (HITL override rates, HOTL false-negative rates, HOLL audit currency, EDL qualification currency) are absent. For Allianz, EIOPA's board-level AI accountability expectation, Solvency II Article 41 (system of governance), and SR 11-7 §V (effective challenge) require named accountability OpenSpec does not encode.

---

## Allianz / European Insurance Specific Observations

OpenSpec is being assessed for Allianz in the European insurance and financial services regulatory context — SR 11-7, DORA, EU AI Act, GDPR, and Solvency II — where the binding constraints come from `domains/insurance.md` regulatory floors, not from internal risk preference. The most valuable OpenSpec capability for Allianz is its specification artefact format (P2): the `### Requirement:` / `#### Scenario:` Given/When/Then structure in `docs/concepts.md`, the `## ADDED` / `## MODIFIED` / `## REMOVED` delta model in `schemas/spec-driven/schema.yaml`, and the change-archive history in `openspec/specs/cli-archive/spec.md` together produce structured spec documentation that maps to Solvency II Article 116 internal-model documentation requirements and EU AI Act Article 11 technical documentation requirements — but only if Allianz extends the schema with the actuarial rationale, calibration evidence, and change-classification fields those regulations require.

The most operationally critical alignment gaps for Allianz given the hard autonomy caps in `domains/insurance.md` are: (a) absence of a tier declaration per change against EU AI Act Annex III §5(b) high-risk classification for personal-lines underwriting (Tier 1 cap), claims decisions affecting coverage (Tier 1 cap), and IDD-scope customer advisory (Tier 1 cap); (b) absence of a blocking second-line validation gate against Solvency II Article 48 (actuarial function) and SR 11-7 §V (effective challenge), since `/opsx:verify` "Does not block archive" (`docs/commands.md` line 336); (c) absence of named accountable-human records against EIOPA AI Guidelines (board-level AI accountability) and Solvency II Article 41 (system of governance); (d) absence of provenance metadata on agent-authored artefacts against GDPR Article 5(1)(d) (accuracy) and EU AI Act Article 13 (transparency); (e) absence of decision traces against EU AI Act Article 12 (record-keeping) and DORA Article 9 (ICT operations).

Several gaps are less operationally critical at Allianz because the relevant use cases are already capped at lower tiers by `domains/insurance.md`: the absence of Tier 4 policy-envelope autonomy infrastructure is irrelevant for SCR calculation under Solvency II Articles 112–127 (Tier 1 cap), for IDD-scope customer advisory (Tier 1 cap per IDD Article 20 suitability requirement), and for claims adjudication where GDPR Article 22(4) prohibits solely-automated decisions on health data. The absence of model-tier routing (P11) is less critical because operational routing decisions for Tier 1–2 use cases are made by the host AI assistant, not by the spec authoring layer. The absence of multi-model coherence handling matters less while Allianz's regulated work item classes are single-agent supervised.

A specific regulatory requirement OpenSpec directly addresses, in part, is EU AI Act Article 11 technical documentation: the structured spec artefact in `openspec/specs/<capability>/spec.md` produces a versioned, reviewable description of system behaviour. It is not sufficient on its own — Article 11 also requires data governance documentation (Article 10), risk management system documentation (Article 9), and accuracy/robustness/cybersecurity test results (Article 15) — but it is a usable input. A specific requirement OpenSpec structurally cannot address is GDPR Article 22(4)'s prohibition on solely-automated decisions based on special category data: that prohibition is enforced at the runtime decision boundary, which is outside OpenSpec's scope and outside its source code. A specific requirement under DORA Article 28 (third-party ICT risk) that Allianz must address through composition is third-party register entries for the foundation-model providers OpenSpec's host AI assistants depend on — OpenSpec records no foundation-model identifier, no provider category, and no deployment mode in archived changes, leaving the DORA Pillar 4 register dependent on out-of-band records.
