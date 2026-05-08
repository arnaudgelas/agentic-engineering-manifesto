# Sub-prompt 07 — AI/Runtime Guardrails & Security

**Purpose.** Produce a rigorous, evidence-grounded assessment of `[[FRAMEWORK]]`'s **AI/runtime guardrail architecture** (Part 12) and **security posture** (Part 13) as defined by the Agentic Engineering Manifesto and the regulatory requirements applicable to `[[ORGANIZATION]]` in `[[INDUSTRY]]`.

**Scope boundary with Part 14.** Part 12 covers AI/runtime guardrails — controls that act on prompts, retrievals, tool outputs, and agent behaviour at execution time (input/output filters, behavioural caps, perimeter architecture, adversarial scenario). Enterprise-wide guardrail domain coverage — governance, architecture, demand, autonomy, tools/execution, data/privacy, DevSecOps, supply chain, evidence, release, operations, FinOps, human controls, legal/compliance, learning/memory — is scored in **Part 14** by Agents 08a/08b. Where this Part identifies a gap that maps to one of those 15 domains, name the domain (e.g., "see Part 14, §14.5 Tools/execution") and do not duplicate the analysis. Part 12 stays narrowly focused on the AI-runtime perimeter and the adversarial walk-through; Part 14 covers the broader enterprise-delivery perimeter.

**Placeholder reminder.** Before executing this prompt, confirm that `[[FRAMEWORK]]`, `[[FRAMEWORK_LOWER]]`, `[[FRAMEWORK_VERSION]]`, `[[ORGANIZATION]]`, `[[INDUSTRY]]`, `[[DOMAIN_FILE]]`, and `[[PRIOR_REVIEWS]]` have all been substituted. If any `[[...]]` pattern remains, stop and report the unresolved variable.

**Output file.** Write one file: `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_07_guardrails_security_appendix.md`

**Canonical thresholds.** All severity labels, score ranges, effort labels (S/M/L/XL), and principle weightings come from `prompt.md`. Do not redefine them in this prompt or in the output file. Reference `prompt.md` directly when the output needs a label or a band.

**Banned soft language.** The output file MUST NOT contain any of these tokens or phrases: `consider`, `may`, `could potentially`, `perhaps`, `use judgement`, `use judgment`. State controls, gaps, severities, and remediations as direct facts. Where a fact is unknown, state it as unknown — do not hedge with `may` or `consider`.

**Evidence requirement.** Every claim about `[[FRAMEWORK]]`, the `manifesto-principles` source group, or `[[DOMAIN_FILE]]` MUST be supported by a verbatim quote (≤ 3 lines, in backticks or fenced) drawn from the named source file with its absolute path. Paraphrase is not evidence. A claim with no verbatim quote is a self-check failure.

---

## 1. Inputs to Read

Read all of the following before writing a single scored claim. Do not score from memory.

1. **`[[FRAMEWORK]]` source artefacts** — read systematically for security-relevant content:
   - Tooling allow-lists and MCP/tool manifests. Establish whether tools/MCP manifests are integrity-verified at load time. If yes, document the mechanism (signing key, checksum source, verification frequency). If no, state that explicitly and map the row to the supply-chain integrity entry in §3.2.
   - Secret handling: how credentials, tokens, and keys are stored, accessed, and scrubbed.
   - Prompt-assembly paths: every location where external or user-controlled content is concatenated into an LLM prompt.
   - Identity and authentication: how agents and tools authenticate to each other and to external services.
   - Audit and logging: what is recorded, where, whether records are tamper-evident.
   - Kill-switch and circuit-breaker mechanisms: what stops or contains runaway behaviour.
   - Containment controls: injection defence, output filters, scope limits, iteration caps.

2. **`manifesto/manifesto-principles.md` plus `manifesto/manifesto-principles-01.md` through `manifesto/manifesto-principles-12.md`** — read in full; key anchors for this review:
   - **P3** (Architecture is defence-in-depth): boundaries encoded as machine-enforced policies; deterministic wrappers around probabilistic AI; design for boundary crossing.
   - **P9** (Observability covers reasoning): traces reconstruct *why* something happened; governance-state observability; prompt/response audit trails.
   - **P10** (Assume emergence; engineer containment): threat model covers prompt injection, privilege escalation, data exfiltration, supply-chain attacks, and social engineering; treat every retrieval artefact and tool response as untrusted input. The Governance Failure Modes paragraph (evidence laundering, approval laundering, compliance theater, stale-control reliance, automated rubber-stamping, waiver accumulation) must be engineered against with the same discipline as security threats.

3. **`manifesto/manifesto-done.md`** — read for:
   - The Hardening DoD steps and the **agentic provenance record** required fields.
   - The **bundle integrity attestation** requirement (cryptographic hash or digital signature of the assembled bundle).
   - The **security static analysis** requirement (OWASP ASVS-calibrated, no unresolved Critical or High; waivers documented and approved by the accountable human).
   - The **evidence freshness** rules (threat-model staleness on architecture/tool/data/model changes; SBOM staleness on dependency change; rollback-procedure staleness 48h before deployment; etc.).

4. **Cross-stack normative artefacts (lift only AEM-relevant content; apply scope guard from `prompt.md`):**
   - `governance/evidence-bundle-schema.md` — read the `aem_components` and `bundle_metadata` (integrity / signature) sections. Use them to score §13.5 critical findings around evidence-bundle completeness.
   - `governance/integrated-audit-trail.md` — read the AEM execution trace section. Use it to score §13.2 Audit-trail row, §13.5 critical findings around traceability, and §12.5 detection probability.
   - `governance/governance-integration-note.md` — read the AEM Tier 4 section. Use it to score §12.4 architecture assessment when `[[FRAMEWORK]]` operates or claims to support Tier 4.

5. **`[[DOMAIN_FILE]]`** — read in full for:
   - Hard autonomy caps that apply to `[[ORGANIZATION]]`'s use cases.
   - Regulations with explicit security clauses, as named in `[[DOMAIN_FILE]]`.
   - Fairness and non-discrimination obligations, as named in `[[DOMAIN_FILE]]`.
   - **Scope guard.** If `[[DOMAIN_FILE]]` references out-of-scope corpora (`asdlc/`, `aplc/`, `agentic-sdlc-handbook/`, `intelligence-governance-manifesto/`, `agentic-enterprise-manifesto/`, `agentic-enterprise.md`, `agentic-governance-stack.md`, `manifesto/manifesto-evolution-plan.md`, `phase-assessment-checklist.md`, `asdlc-plan*`, `aplc-plan*`, or `igm-aent-coherence-review*`), ignore those sections — they are out of scope for this review and MUST NOT be forward-propagated into the output file.

6. **Regulatory crosswalks (cite when they add specificity to a security finding). Cite a crosswalk only when the regulation it covers also appears in `[[DOMAIN_FILE]]`.**
   - `regulatory/eu-ai-act-addendum.md` — Articles 9 (risk management), 10 (data governance), 12 (record-keeping), 14 (human oversight), 15 (accuracy/robustness/cybersecurity), 27 (FRIA), 72 (post-market monitoring), 73 (serious incident reporting). GPAI obligations (Articles 51–55).
   - `regulatory/foundation-model-third-party-register.md` — DORA Pillar 4 register schema and exit strategy. Use it to score §13.2 Supply-chain integrity row.
   - `regulatory/nist-ai-rmf-crosswalk.md` — NIST AI 600-1 GenAI Profile risks (G1–G12: confabulation, CBRN, dangerous/violent recommendations, IP, obscene content, value chain, data privacy, information security, harmful bias, environmental impact). Use it to score §12.5 adversarial scenario and §13.5 critical findings.
   - `regulatory/iso-42001-crosswalk.md` — Annex A controls (A.2–A.10).
   - `regulatory/iso-23894-23053-crosswalk.md` — risk treatment options.
   - `regulatory/incidents-appendix.md` — named real-world incidents (Slack-AI exfiltration via indirect prompt injection, DocGo AI-washing, etc.). **Cite at least one incident in the §12.5 adversarial scenario or the §13.5 critical findings whose failure mode `[[FRAMEWORK]]` does not demonstrably mitigate.**

7. **Operational templates (cite when they bound a security control's implementation):**
   - `operational-templates/agent-inventory-schema.md` — discovery and registration; **a registered estate is a precondition for every other control**. If `[[FRAMEWORK]]` produces or extends an agent-inventory artefact, cite it in §13.2 Audit-trail and §13.5 critical findings.
   - `operational-templates/ai-risk-register.md` — AI risk register schema. Use for §13.5 critical-findings remediation.
   - `operational-templates/slo-table.md` — incident-reporting (regulator), waiver expiry, and feedback-loop closure SLOs. Use for §13.4 row remediation and §12.3 behavioural guardrails.
   - `operational-templates/decommissioning-checklist.md` — orderly retirement; supports §13.5 supply-chain integrity findings around model deprecation.

8. **`[[PRIOR_REVIEWS]]`** — if not `none`, read all listed files for findings already recorded in Parts 1–11. Do not duplicate findings already covered; do cross-reference with canonical part numbers where relevant.

---

## 2. Methodology — Part 12: Guardrails Assessment

### 2.1 Five-subsection structure

Part 12 has five subsections — three guardrail categories (12.1 Input, 12.2 Output, 12.3 Behavioural), an architecture assessment (12.4), and an adversarial scenario (12.5). The methodology below enumerates all five. The output spec in §4 mirrors them exactly.

### 2.1.1 Input Guardrails (§12.1)

Controls that inspect, sanitise, or reject content *before* it reaches the LLM or an action executor.
- Enumerate what `[[FRAMEWORK]]` provides: injection detection, content validation, trust classification, schema enforcement, PII scrubbing on inputs.
- Identify what is missing relative to the manifesto's bar: P10 requires treating all retrieval artefacts and tool responses as untrusted input; P3 requires machine-enforced boundaries, not documented policies.
- State the enforcement level of each control: **Infrastructure-level** (enforced by the framework at runtime, cannot be bypassed by caller), **Instruction-level** (enforced by code convention or pre-commit hook, bypassable), or **Absent**.
- State the gap for each guardrail and assign a severity label using the canonical thresholds in `prompt.md`.
- Cite the relevant manifesto principle(s) — P3, P9, and/or P10 — for each row.

### 2.1.2 Output Guardrails (§12.2)

Controls that inspect, filter, or block `[[FRAMEWORK]]`'s outputs before they are persisted, displayed, or acted upon.
- Enumerate what `[[FRAMEWORK]]` provides: PII scrubbing on outputs, CRITICAL-finding gates, scope-limit enforcement, code quality gates.
- Identify what is missing: P3 requires that semantic failures are caught by verification (P8) and observability (P9); P10 requires egress controls on tool outputs and full logging before outputs leave the trust boundary.
- State enforcement level and gap for each.
- Cite the relevant P3, P9, and/or P10 anchor for each row.

### 2.1.3 Behavioural Guardrails (§12.3)

Controls that govern agent behaviour over time: iteration caps, context-budget monitoring, accuracy thresholds, external-tool failure handling, and escalation paths.
- Enumerate what `[[FRAMEWORK]]` provides.
- Identify what is missing relative to P10 (circuit breakers, rate limits, safe fallbacks) and P5 (human escalation before consequences become irreversible).
- State enforcement level and gap for each.
- Cite the relevant P3, P9, and/or P10 anchor for each row.

### 2.2 Guardrail Architecture Assessment (§12.4)

Assess the overall guardrail architecture as a system. Identify:
- Which parts of `[[FRAMEWORK]]` are inside the guardrail perimeter vs. outside it.
- Whether the perimeter is consistent or split-layer (strong in one subsystem, absent in another).
- The highest-risk unguarded vector given `[[ORGANIZATION]]`'s use cases.
- An overall architecture severity label using the canonical bands in `prompt.md`.

### 2.2.1 Governance Failure Mode Coverage (§12.4 sub-block)

Within §12.4, add a sub-block titled **Governance Failure Modes** that scores `[[FRAMEWORK]]` against the six governance failure modes named in the P10 shard:
- **Evidence laundering** — agent assembles its own evidence; no independent verification.
- **Approval laundering** — human approves an agent-generated summary, not the underlying evidence.
- **Compliance theater** — controls added to satisfy audit, not to catch failures (back-test against known past failures).
- **Stale-control reliance** — control marked passing because it has not been re-run since system change.
- **Automated rubber-stamping** — review rate collapses under volume; reviewers approve without inspection.
- **Waiver accumulation** — waivers granted for specific circumstances persist beyond those circumstances.

For each: state whether `[[FRAMEWORK]]` has any detection or containment mechanism (citation required), and the severity of the gap. These are containment concerns, not compliance concerns — score them as such.

### 2.3 Adversarial Scenario (§12.5) — Red-Team Walk-through

The adversarial scenario MUST be drawn from a `[[INDUSTRY]]` / `[[DOMAIN_FILE]]` use-case (not a generic AI scenario). Name the specific business workflow being attacked. Walk through: attack vector → `[[FRAMEWORK]]` detection/containment mechanism → outcome → gap. Conclude with a P3/P10 verdict.

Pick one realistic attack scenario relevant to `[[INDUSTRY]]` — choose from:
- Prompt injection via ticket content, work-item body, PRD file, or retrieved artefact.
- MCP/tool supply-chain compromise (poisoned tool manifest, unverified tool binary).
- Model jailbreak via instructions embedded in a document passed as LLM context.
- Data exfiltration via an output channel (LLM response written to external system without scrubbing).
- Training-data or memory poisoning (adversarial content entering the knowledge base through governed paths).
- Agent-to-agent message tampering or chained tool-call privilege escalation (P10 cross-agent trust edges).

Walk through the full exploit path and name the specific business workflow:
1. Attacker capability and entry point — name the specific `[[ORGANIZATION]]` business workflow being attacked (e.g., SCR model documentation generation, claims-adjudication code review).
2. Step-by-step path through `[[FRAMEWORK]]`'s architecture — at each step, name the specific `[[FRAMEWORK]]` source artefact (file, function, rule) the path traverses.
3. Which controls fire, which are bypassed, and why — attribute control behaviour to each numbered step.
4. Final impact — state it in terms of `[[ORGANIZATION]]`'s operations and regulatory obligations.
5. Detection probability and why.
6. Recommended countermeasure — grounded in controls `[[FRAMEWORK]]` already has or could reuse, named by source-artefact path.

The scenario MUST cite at least one specific `[[FRAMEWORK]]` source artefact by path and quote at least one verbatim line of code, configuration, or rule text from it. Conclude with a **P3/P10 verdict**: was the boundary machine-enforced (P3)? Was the blast radius contained (P10)? Both principles must be cited by name.

---

## 3. Methodology — Part 13: Security Assessment

### 3.1 Determinism and Output Variance

- Does `[[FRAMEWORK]]` control or document LLM temperature, seed, and model-version parameters for its LLM calls?
- Are LLM outputs non-deterministic? What is the stated or observable variance range?
- Are prompts and responses stored in the audit trail, or only token counts and timestamps? State explicitly: (a) where prompts are journalled, (b) where responses are journalled, (c) whether either is hashed or signed, (d) the regulatory mapping of any gap.
- Regulatory implication: map non-determinism and prompt/response journalling to specific clauses cited in `[[DOMAIN_FILE]]` (e.g., record-keeping, model validation, transparency, statistical quality requirements). State whether `[[FRAMEWORK]]`'s outputs are suitable as model documentation or validation artefacts without additional controls.

**Verdict requirement.** Conclude §13.1 with one of: `**Determinism verdict: DETERMINISTIC-ADEQUATE**` / `**PARTIALLY-DETERMINISTIC**` / `**NON-DETERMINISTIC**`. State the specific evidence that drove this verdict (verbatim quote from `[[FRAMEWORK]]` source with path).

### 3.2 Security Coverage Map

Build a markdown table with exactly these columns and exactly these 11 rows. Every row MUST be populated with verbatim evidence from a named `[[FRAMEWORK]]` source artefact (or the explicit absence thereof).

| Control Family | `[[FRAMEWORK]]` position | Gap | Severity |
| --- | --- | --- | --- |
| Authentication & identity | | | |
| Secrets management | | | |
| Input validation & sanitisation | | | |
| Output filtering | | | |
| Audit trail & non-repudiation | | | |
| Supply-chain integrity (model registry, dependencies) | | | |
| Dependency security (CVE / licence scan) | | | |
| Network egress controls | | | |
| Data residency & sovereignty | | | |
| Model integrity (provenance, SBOM) | | | |
| Observability (reasoning traces — see P9) | | | |

Every cell must be grounded in a specific artefact, file, or mechanism observed in `[[FRAMEWORK]]`. Do not infer from naming conventions alone. Severity uses the canonical bands defined in `prompt.md`.

### 3.3 Bias and Fairness Exposure

For `[[INDUSTRY]]` use cases specifically:
- Does `[[FRAMEWORK]]` provide any mechanism to detect or mitigate bias in LLM outputs from phase engines or agent tasks?
- Which `[[FRAMEWORK]]` outputs could indirectly shape customer-facing systems (requirements, behavioural specifications, evaluation criteria)?
- Cite applicable fairness obligations from `[[DOMAIN_FILE]]` only — name the specific Articles or sections present in `[[DOMAIN_FILE]]`.
- Distinguish what is out of scope for a developer tool vs. what represents a genuine gap. For each out-of-scope claim, justify it in one sentence: "We classify this as out-of-scope because `[[FRAMEWORK]]`'s outputs do not directly affect customers; the gap remains relevant if `[[FRAMEWORK]]`'s outputs feed downstream agent products that do."

### 3.4 Regulatory Security Requirements for `[[ORGANIZATION]]`

Enumerate regulations **exclusively** from `[[DOMAIN_FILE]]`'s sections that contain security clauses. For each regulation in `[[DOMAIN_FILE]]` that contains a security clause, produce a row. Do NOT name any regulation that does not appear in `[[DOMAIN_FILE]]`. Do NOT default to financial-services regulations or any other off-domain regulations.

| Regulation | Security requirement | `[[FRAMEWORK]]` Status | Risk Level |
| --- | --- | --- | --- |

Cite broadly applicable cross-jurisdictional regulations (e.g., GDPR Art. 32, EU AI Act Art. 12/15, ISO 27001) *in addition* to the `[[DOMAIN_FILE]]`-derived rows ONLY IF `[[DOMAIN_FILE]]` itself names them. Do not import them by default.

Every status and risk-level claim must cite the specific article and map it to a named artefact or mechanism (or gap) in `[[FRAMEWORK]]`. Risk levels use the canonical severity labels (Critical / High / Medium / Low) defined in `prompt.md`. If a row does not apply to `[[ORGANIZATION]]`'s jurisdiction (e.g., a regulation listed in `[[DOMAIN_FILE]]` that does not bind `[[ORGANIZATION]]`'s operating territory), mark it `N/A — out of jurisdiction` and justify in one sentence.

### 3.5 Critical Security Findings — structure and count

Produce 3–6 findings. Each MUST have the following labelled fields:

- `**Finding N: {title}**`
- **Evidence:** verbatim quote from `[[FRAMEWORK]]` source with path (e.g., `abcd/src/abcd/core/security.py:120-130`).
- **Business impact for `[[ORGANIZATION]]`:** cite the specific regulation (article number) and the operational consequence at `[[ORGANIZATION]]`.
- **Remediation:** name the concrete artefact, function, or mechanism that closes the gap. Where `[[FRAMEWORK]]` already has a relevant control that could be reused or extended, name it.
- **Severity:** Critical / High / Medium / Low — using the canonical bands defined in `prompt.md`.
- **Effort:** S / M / L / XL — using the canonical effort sizing defined in `prompt.md`.
- **Principles violated:** at least one of P3, P9, P10 cited by name with a one-sentence justification.

Each critical security finding (§13.5) MUST cite at least one of P3, P9, P10. Each guardrail gap (Parts 12.1–12.3) MUST cite the relevant manifesto principle(s): P3 (defence-in-depth), P9 (observability of reasoning), and/or P10 (assume emergence; engineer containment).

---

## 4. Output Specification

Write the file `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_07_guardrails_security_appendix.md` with the following exact structure:

```
# [[FRAMEWORK]] Review — Part 12 & 13: Guardrails Assessment and Security Appendix

**Framework:** [[FRAMEWORK]]
**Version:** [[FRAMEWORK_VERSION]]
**Client:** [[ORGANIZATION]]
**Industry:** [[INDUSTRY]]
**Reviewer:** Agent 07
**Date:** YYYY-MM-DD
**Manifesto:** `arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]`
**Sources reviewed:** [list every file read]

---

## Part 12 — Guardrails Assessment

### 12.1 Input Guardrails

[Markdown table: Guardrail | Mechanism | Enforcement Level | Gap | Principle(s) cited]

### 12.2 Output Guardrails

[Markdown table: Guardrail | Mechanism | Enforcement Level | Gap | Principle(s) cited]

### 12.3 Behavioural Guardrails

[Markdown table: Guardrail | Mechanism | Enforcement Level | Gap | Principle(s) cited]

### 12.4 Guardrail Architecture Assessment

[Prose assessment: split-layer vs. unified perimeter, highest-risk unguarded vector, overall architecture severity label per `prompt.md` with rationale]

### 12.5 Adversarial Scenario (Red-Team)

[Full walk-through per §2.3 above; specific `[[ORGANIZATION]]` business workflow named; at least one verbatim quote from a `[[FRAMEWORK]]` source artefact; concluding P3/P10 verdict by name]

---

## Part 13 — Security Assessment

### 13.1 Determinism and Output Variance

[Temperature/seed/model controls; non-determinism status; prompt/response audit coverage; regulatory implications for [[ORGANIZATION]] with specific article citations; concluding **Determinism verdict: DETERMINISTIC-ADEQUATE / PARTIALLY-DETERMINISTIC / NON-DETERMINISTIC** with evidence]

### 13.2 Security Coverage Map

[Markdown table per §3.2 above; all 11 control families populated]

### 13.3 Bias and Fairness Exposure

[Existing mechanisms; customer-facing output review scope; specific regulatory articles from [[DOMAIN_FILE]]; distinction between out-of-scope gaps and genuine gaps with one-sentence justification per out-of-scope claim]

### 13.4 Regulatory Security Requirements for [[ORGANIZATION]]

[Markdown table per §3.4 above; one row per regulation with a security clause enumerated from `[[DOMAIN_FILE]]`; cross-jurisdictional regulations cited only when also named in `[[DOMAIN_FILE]]`; jurisdictional N/A entries justified]

### 13.5 Critical Security Findings

[3–6 findings, each with: title, **Evidence**, **Business impact for [[ORGANIZATION]]**, **Remediation**, **Severity**, **Effort**, **Principles violated**]

---

*Assessment prepared YYYY-MM-DD based on source files in `[[FRAMEWORK_LOWER]]/` at [[FRAMEWORK_VERSION]]. All findings are based on static review of artefacts; dynamic penetration testing was not performed.*
```

---

## 5. Hard Rules

- **Read `[[FRAMEWORK]]`'s source artefacts before scoring.** Every claim must be grounded in a specific file, function, rule, or artefact. Name it and quote it verbatim.
- **Verbatim quotes required.** Where the evidence is a function, rule, test, or configuration, quote the exact identifier or text in backticks with the file path. A claim with no verbatim quote is unsupported and fails the self-check gate.
- **Separate evidence for and evidence against** each finding. Where `[[FRAMEWORK]]` has a partial control that addresses part of the gap, state that explicitly — do not present a partial control as a full gap, and do not present it as full coverage.
- **Ground every regulatory claim in a specific clause.** "DORA requires security controls" is not a citation. "DORA Art. 9(2)(b) requires that ICT systems are protected against ICT attacks" is.
- **No praise without evidence.** Do not credit `[[FRAMEWORK]]` for controls that are documented in a standard but not implemented in the artefacts.
- **Do not penalise out-of-scope gaps — but note them.** If a gap is outside `[[FRAMEWORK]]`'s stated scope, label it clearly as a scope gap and explain why it is still relevant to `[[ORGANIZATION]]`.
- **Severity, effort, and weighting** all come from `prompt.md`. Do not redefine them in the output. Reference `prompt.md` when a label or band is needed.
- Use date format **YYYY-MM-DD** throughout.
- When cross-referencing other parts of the review, use canonical part numbers (e.g., "see Part 9"). Do not use file names or agent numbers in cross-references within output content.
- **Out-of-scope corpus / tracked-files-only.** Every source file cited MUST be tracked by git on the current branch. Do not read or reference `asdlc/`, `aplc/`, `agentic-sdlc-handbook/`, `intelligence-governance-manifesto/`, `agentic-enterprise-manifesto/`, `agentic-enterprise.md`, `agentic-enterprise.html`, `agentic-governance-stack.md`, `agentic-governance-stack.html`, `manifesto/manifesto-evolution-plan.md`, `manifesto-evolution-plan.html`, `phase-assessment-checklist.md`, `phase-assessment-checklist.html`, `asdlc-plan*`, `aplc-plan*`, or `igm-aent-coherence-review*` anywhere in the output. The output MUST contain zero matches for the tokens `ASDLC`, `APLC`, `IGM`, `AEnt-M`, `AEnt_M`, `intelligence-governance-manifesto`, `agentic-enterprise-manifesto`, `agentic-enterprise`, `agentic-governance-stack`, `manifesto-evolution-plan`, `phase-assessment-checklist`, or `agentic-sdlc-handbook`. If `[[DOMAIN_FILE]]`, a regulatory crosswalk, a governance file, or an operational template references these paths, ignore those sections and do not forward-propagate them.

---

## 6. Self-Check Before Writing — gate

**Do not save the output file until every item below is confirmed.** Each item is a hard gate; a single failure blocks the write.

- [ ] All `[[VARIABLE]]` placeholders have been substituted.
- [ ] `[[FRAMEWORK]]` artefacts have been read — specific files are named in the sources-reviewed header.
- [ ] The `manifesto-principles` source group has been read; P3, P9, and P10 are cited by name in the output.
- [ ] `[[DOMAIN_FILE]]` has been read; at least three specific regulatory articles are cited in Part 13.
- [ ] Zero matches for any out-of-scope-corpus token (`ASDLC`, `APLC`, `IGM`, `AEnt-M`, `AEnt_M`, `intelligence-governance-manifesto`, `agentic-enterprise-manifesto`, `agentic-enterprise`, `agentic-governance-stack`, `manifesto-evolution-plan`, `phase-assessment-checklist`, `asdlc/`, `aplc/`, `agentic-sdlc-handbook`, `asdlc-plan`, `aplc-plan`, `igm-aent-coherence-review`) anywhere in the output, even where `[[DOMAIN_FILE]]` or any cross-stack file mentions them. Every cited source file is tracked by git on the current branch.
- [ ] §12.4 contains a Governance Failure Mode Coverage sub-block scoring all six modes (evidence laundering, approval laundering, compliance theater, stale-control reliance, automated rubber-stamping, waiver accumulation).
- [ ] At least one §12.5 adversarial scenario or §13.5 critical finding cites a named real-world incident from `regulatory/incidents-appendix.md` whose failure mode `[[FRAMEWORK]]` does not demonstrably mitigate.
- [ ] Sections 12.1, 12.2, 12.3, 12.4, and 12.5 are all present and non-empty.
- [ ] Sections 13.1, 13.2, 13.3, 13.4, and 13.5 are all present and non-empty.
- [ ] The Security Coverage Map (§13.2) has all 11 control families: Authentication & identity; Secrets management; Input validation & sanitisation; Output filtering; Audit trail & non-repudiation; Supply-chain integrity (model registry, dependencies); Dependency security (CVE / licence scan); Network egress controls; Data residency & sovereignty; Model integrity (provenance, SBOM); Observability (reasoning traces — see P9).
- [ ] §13.4 contains a row for every regulation in `[[DOMAIN_FILE]]` that has an explicit security clause; no regulation absent from `[[DOMAIN_FILE]]` is named (matching the rule in `prompts/prompt-05b-industry.md`).
- [ ] §13.1 ends with `**Determinism verdict: DETERMINISTIC-ADEQUATE**` / `**PARTIALLY-DETERMINISTIC**` / `**NON-DETERMINISTIC**` and the verdict cites specific evidence.
- [ ] §12.5 adversarial scenario names a specific `[[FRAMEWORK]]` source artefact, names the specific `[[ORGANIZATION]]` business workflow, contains at least one verbatim quote, and concludes with a P3/P10 verdict citing both principles by name.
- [ ] Each Parts 12.1, 12.2, 12.3 row cites at least one of P3, P9, P10 by name.
- [ ] §13.5 contains 3–6 findings.
- [ ] Each §13.5 finding has all of: **Evidence** (verbatim with path), **Business impact for `[[ORGANIZATION]]`** (regulation cited), **Remediation** (named artefact), **Severity** label, **Effort** label, **Principles violated** (P3/P9/P10 cited by name).
- [ ] No banned soft language is present: `consider`, `may`, `could potentially`, `perhaps`, `use judgement`, `use judgment`.
- [ ] Every claim about `[[FRAMEWORK]]`, the `manifesto-principles` source group, or `[[DOMAIN_FILE]]` is supported by a verbatim quote with absolute path.
- [ ] The output file path is `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_07_guardrails_security_appendix.md`.
