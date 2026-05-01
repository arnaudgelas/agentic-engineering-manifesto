# Framework Review — Master Orchestration Prompt

**Variables (replace before running):**
- `[[FRAMEWORK]]` — framework name as it appears in its own documentation (e.g., `ABCD`)
- `[[FRAMEWORK_LOWER]]` — lowercase slug using **underscores only** (no hyphens, no spaces) for file/directory naming (e.g., `abcd`)
- `[[FRAMEWORK_VERSION]]` — version, tag, or commit hash if known (e.g., `v1.2.0` or `HEAD`); use `unknown` if not versioned
- `[[ORGANIZATION]]` — client organisation name (e.g., `ABCD.xyz`)
- `[[INDUSTRY]]` — industry and regulatory context (e.g., `European insurance and financial services — SR 11-7, DORA, EU AI Act, GDPR, Solvency II`)
- `[[DOMAIN_FILE]]` — path to the relevant industry domain file (e.g., `domains/insurance.md`); must match an existing file under `domains/`
- `[[PRIOR_REVIEWS]]` — comma-separated paths to prior review files for peer comparison, or `none` (e.g., `abcd/abcd_manifesto_alignment_review_merged.md` or `none`)
- `[[MANIFESTO_HASH]]` — full 40-character SHA-1 commit hash of the agentic engineering manifesto used for this review run (e.g., `112e83f0e2f94e925b3a5e5a89aadf1a372888f5`). **Computed automatically by the `/review` skill; do not substitute manually.** Run `git -C {manifesto_path} rev-parse HEAD` to obtain it.

---

## Preflight check

**Before spawning any agent**, scan this prompt for unreplaced placeholders. The prompt MUST NOT contain `[[FRAMEWORK]]` or any other unsubstituted variable. If any `[[...]]` pattern remains (e.g., the literal text `[[FRAMEWORK]]`, `[[FRAMEWORK_LOWER]]`, `[[FRAMEWORK_VERSION]]`, `[[ORGANIZATION]]`, `[[INDUSTRY]]`, `[[DOMAIN_FILE]]`, or `[[PRIOR_REVIEWS]]` still appears in your working copy), stop immediately and report which variables are unset. Do not proceed until all variables are substituted.

---

## Mission

Spawn a swarm of focused agents — one per sub-prompt — to produce an extremely tough, thorough, and deep assessment of **[[FRAMEWORK]]** against the Agentic Engineering Manifesto. Each agent writes one output file. A final agent merges all files into a master review. Do not try to please. Do not soften findings. Every score must be justified by evidence in [[FRAMEWORK]]'s own artefacts. This review is career-critical.

**Before spawning any agent:** read [[FRAMEWORK]]'s own source files. Do not score on assumptions. Quote exact artefact names, phase numbers, and rule text wherever possible.

## Spawn mechanism

Use the **`Agent` tool** to spawn each sub-agent. For each agent:
1. Read the corresponding sub-prompt file from `prompts/`.
2. Substitute all `[[VARIABLE]]` placeholders with the values defined above.
3. Pass the substituted text as the `prompt` parameter to the `Agent` tool.
4. Each spawned agent runs independently — do not execute sub-prompts inline in your own context.

Wave 1a agents may be spawned simultaneously by issuing all `Agent` tool calls in a single response. The same applies to Wave 1b agents (04c and 05b) once Wave 1a is fully complete.

## Output directory

All output files go into `[[FRAMEWORK_LOWER]]/`. Create the directory if it does not exist.

## Naming convention

| Agent | Output file |
| --- | --- |
| 01 — Quick Overview | `[[FRAMEWORK_LOWER]]_review_01_quick_overview.md` |
| 02 — Principles | `[[FRAMEWORK_LOWER]]_review_02_principle_p{N}.md` × 12 |
| 03 — Loop & DoD | `[[FRAMEWORK_LOWER]]_review_03_loop_dod.md` |
| 04a — Adoption (Part 6) | `[[FRAMEWORK_LOWER]]_review_04a_adoption.md` |
| 04b — Companion (Part 7) | `[[FRAMEWORK_LOWER]]_review_04b_companion.md` |
| 04c — Adoption+Companion+Synthesis | `[[FRAMEWORK_LOWER]]_review_04_adoption_companion.md` |
| 05a — Maturity (Part 8) | `[[FRAMEWORK_LOWER]]_review_05a_maturity.md` |
| 05b — Industry + Combined (Parts 8+9) | `[[FRAMEWORK_LOWER]]_review_05_maturity_financial.md` |
| 06 — Strengths & Gaps | `[[FRAMEWORK_LOWER]]_review_06_strengths_gaps.md` |
| 07 — Guardrails & Security | `[[FRAMEWORK_LOWER]]_review_07_guardrails_security_appendix.md` |
| 08 — Merge | `[[FRAMEWORK_LOWER]]_manifesto_alignment_review_merged.md` |

## Canonical part numbering

All agents must use this mapping. Cross-references in any output file must use these part numbers.

| Part | Title | Source agent |
| --- | --- | --- |
| Part 1 | Overall Scores | 01 |
| Part 2 | Scoring Methodology | 01 |
| Part 3 | Manifesto Principles — P1 through P12 | 02 |
| Part 4 | Agentic Loop Phase Analysis | 03 |
| Part 5 | Agentic Definition of Done | 03 |
| Part 6 | Adoption Document Alignment | 04a (lifted by 04c) |
| Part 7 | Companion Framework Alignment | 04b (lifted by 04c) |
| Part 8 | Maturity Phase Placement | 05a (lifted by 05b) |
| Part 9 | Industry & Client Assessment | 05b |
| Part 10 | Genuine Strengths | 06 |
| Part 11 | Gap Analysis: Path to Next Phase | 06 |
| Part 12 | Guardrails Assessment | 07 |
| Part 13 | Security Assessment | 07 |

## Score weighting scheme

All agents must use this weighting when computing a composite score. Do not invent a different weighting.

| Principle | Weight |
| --- | --- |
| P1 — Outcomes are the unit of work | 10% |
| P2 — Specifications are living artifacts | 8% |
| P3 — Architecture is defense-in-depth | 8% |
| P4 — Right-size the swarm | 6% |
| P5 — Autonomy is a tiered budget | 10% |
| P6 — Knowledge and memory are infrastructure | 7% |
| P7 — Context is engineered like code | 7% |
| P8 — Evaluations are the contract | 10% |
| P9 — Observability covers reasoning | 10% |
| P10 — Assume emergence, engineer containment | 8% |
| P11 — Optimize economics of intelligence | 6% |
| P12 — Accountability requires intelligibility | 10% |

**Overall score** = Σ(principle_score × weight). Round to one decimal place.

## Severity thresholds

All agents must use this mapping for severity labels. Do not use different thresholds.

| Severity | Score range |
| --- | --- |
| Critical | 0–39 |
| High | 40–54 |
| Medium | 55–69 |
| Low | 70–100 |

## Effort sizing

All agents that produce remediation roadmaps must use this calibration. Do not use different effort labels.

| Label | Definition |
| --- | --- |
| S | Single engineer, less than one sprint (<2 weeks) |
| M | Small team, 1–4 sprints (2 weeks – 2 months) |
| L | Multi-team effort, one quarter (2–3 months) |
| XL | Organisation-level change, more than one quarter (>3 months) |

## Sub-prompt files

Each agent is fully specified in `prompts/`:

```
prompts/prompt-01-quick-overview.md
prompts/prompt-02-principles.md          # loop orchestration; reads prompt-02-principle-template.md
prompts/prompt-02-principle-template.md  # canonical per-principle output format (resource, not an agent)
prompts/prompt-03-loop-dod.md
prompts/prompt-04a-adoption.md           # Part 6: 7 adoption docs
prompts/prompt-04b-companion.md          # Part 7: 6 companion docs
prompts/prompt-04c-synthesis.md          # reads 04a+04b; writes combined adoption_companion.md
prompts/prompt-05a-maturity.md           # Part 8: generic maturity (no domain file)
prompts/prompt-05b-industry.md           # Part 9: domain-specific; writes combined maturity_financial.md
prompts/prompt-06-strengths-gaps.md
prompts/prompt-07-guardrails-security.md
prompts/prompt-08-merge.md
```

## Execution order

### Wave 1a — spawn in parallel

Spawn agents 01, 02, 03, 04a, 04b, 05a, and 07 simultaneously.

**Wait condition:** Use `Glob` + `Read` (first/last 5 lines, ≥20 lines each) to verify all 19 Wave 1a output files exist and are non-empty before proceeding to Wave 1b:

- `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_01_quick_overview.md`
- `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p1.md` through `[[FRAMEWORK_LOWER]]_review_02_principle_p12.md` (12 files)
- `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_03_loop_dod.md`
- `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04a_adoption.md`
- `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04b_companion.md`
- `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_05a_maturity.md`
- `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_07_guardrails_security_appendix.md`

Agent 02 writes 12 principle files sequentially. Wave 1a is not complete until the Glob check confirms all 19 files.

**Recovery:** If any Wave 1a file is missing, re-run only the responsible agent. For agent 02: re-run with explicit instruction to write only the missing principle files.

### Wave 1b — after Wave 1a is fully complete

Spawn agents 04c and 05b simultaneously. Each has its own dependency:
- **04c** depends on: `_review_04a_adoption.md` and `_review_04b_companion.md` (both Wave 1a outputs)
- **05b** depends on: `_review_05a_maturity.md` (Wave 1a output)

**Wait condition:** Use `Glob` + `Read` to verify both Wave 1b outputs exist and are non-empty:

- `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_04_adoption_companion.md`
- `[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_05_maturity_financial.md`

### Wave 2 — after Wave 1b is fully complete

Spawn agent 06 using the `Agent` tool. Confirm with `Glob` that all 21 Wave 1a + 1b files exist and are non-empty before spawning.

### Wave 3 — after Wave 2 is fully complete

Spawn agent 08. The following 18 canonical files (read by agent 08) must all exist and be non-empty:

| Source | File | Count |
| --- | --- | --- |
| Agent 01 | `_review_01_quick_overview.md` | 1 |
| Agent 02 | `_review_02_principle_p{N}.md` for N=1..12 | 12 |
| Agent 03 | `_review_03_loop_dod.md` | 1 |
| Agent 04c | `_review_04_adoption_companion.md` | 1 |
| Agent 05b | `_review_05_maturity_financial.md` | 1 |
| Agent 06 | `_review_06_strengths_gaps.md` | 1 |
| Agent 07 | `_review_07_guardrails_security_appendix.md` | 1 |
| **Total** | | **18** |

Note: The intermediate files `_review_04a_adoption.md`, `_review_04b_companion.md`, and `_review_05a_maturity.md` are NOT direct inputs to agent 08 — they are consumed by agents 04c and 05b respectively.

Use `Glob` to confirm all 18 files before spawning agent 08. **If any source file is missing, do not run agent 08. Report the missing files and stop.**

If any output file already exists, update it in place. Replace wholesale only if [[FRAMEWORK]] has changed substantially — defined as: more than 30% of source artefacts have changed by content, or a phase, layer, or major structural element has been added or removed.

## Hard rules for all agents

- **Read [[FRAMEWORK]]'s source artefacts before scoring.** Every claim must be grounded in a specific file, rule, or phase.
- **Read the manifesto's own source artefacts before scoring.** At minimum: `manifesto-principles.md`, agentic loop phase definitions, Agentic DoD conditions, and maturity level definitions. Do not score from memory of the manifesto — read the current files.
- Scores are 0–100. State the score, then state the evidence for and the evidence against separately.
- Use the canonical weighting scheme above for any composite score calculation.
- Use the canonical severity thresholds above for all severity labels.
- Use the canonical effort sizing above for all remediation roadmaps.
- Do not praise the framework for things it does not demonstrably do.
- Do not penalise the framework for problems that are out of its stated scope — but do note the scope gap explicitly.
- Include a **Gap to Next Level** section that states exactly what is missing to reach the next maturity phase. Be specific: name the artefact, the mechanism, or the process that would close the gap.
- Industry context ([[INDUSTRY]]) is not decoration — map every major finding to a specific regulation or risk type that applies to [[ORGANIZATION]].
- Use date format **YYYY-MM-DD** wherever a date appears.
- When cross-referencing another part of the review, use the canonical part number (e.g., "see Part 12"). Do not use file names or agent numbers in cross-references within output content.
- **Every output file MUST include the manifesto provenance line in its header metadata block:** `Manifesto: arnaudgelas/agentic-engineering-manifesto@[[MANIFESTO_HASH]]`. This ensures every review is traceable to the exact manifesto version used for scoring.
