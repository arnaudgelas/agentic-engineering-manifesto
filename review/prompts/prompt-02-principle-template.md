# Sub-prompt 02 — Per-Principle Output Template

This file defines the canonical structure for a single principle review file.
Agent 02 (see `prompt-02-principles.md`) applies this template 12 times, once per principle.
Substitute `{N}` with the principle number, `[[FRAMEWORK]]`, `[[ORGANIZATION]]`, `[[INDUSTRY]]` with orchestrator values.

---

## 1. File path

For each principle N (1 through 12), write to:

```
[[FRAMEWORK_LOWER]]/[[FRAMEWORK_LOWER]]_review_02_principle_p{N}.md
```

---

## 2. H1 heading — exact format

```
# P{N} — {canonical short name} | **{score}/100**
```

The H1 line MUST end with the literal pattern ` | **NN/100**` where `NN` is an integer 0–100. No decimals. No surrounding text after the score.

The 12 canonical principle names (copy verbatim into the H1, taken from `prompt.md`'s weighting table — NOT from `manifesto-principles.md`):

1. P1 — Outcomes are the unit of work
2. P2 — Specifications are living artifacts
3. P3 — Architecture is defense-in-depth
4. P4 — Right-size the swarm
5. P5 — Autonomy is a tiered budget
6. P6 — Knowledge and memory are infrastructure
7. P7 — Context is engineered like code
8. P8 — Evaluations are the contract
9. P9 — Observability covers reasoning
10. P10 — Assume emergence, engineer containment
11. P11 — Optimize economics of intelligence
12. P12 — Accountability requires intelligibility

`manifesto-principles.md` is read for the principle's **definition and Minimum-bar paragraph** only.

---

## 3. Required sections (in order)

Every principle file MUST contain these sections in this order:

1. `## What [[FRAMEWORK]] asserts about this principle`
2. *(Optional — MANDATORY for P1, P3, P5, P8, P9, P12)* the principle-specific test section (see §4)
3. `## What works`
4. `## Where it fails the manifesto's bar`
5. `## [[ORGANIZATION]]-specific implications`
6. `## Score rationale`

### 3.1 `## What [[FRAMEWORK]] asserts about this principle`

One short paragraph. Describe what `[[FRAMEWORK]]` claims or implies about this principle. Quote claims and name artefacts. Cite specific files, commands, or rule identifiers. Use only descriptive verbs (`asserts`, `claims`, `states`, `provides`); avoid evaluative verbs in this section.

### 3.2 `## What works`

4–8 bullets. Each bullet MUST:
- Be concrete and evidence-anchored — name the artefact, command, rule, or mechanism with backtick-quoted file path or identifier (e.g., `` `core/strategy.py` ``, `` `verify_phases.py` ``).
- State what `[[FRAMEWORK]]` does, not what it could do.
- Avoid hedging language that obscures whether the capability exists.

### 3.3 `## Where it fails the manifesto's bar`

4–8 bullets. Each bullet MUST:
1. **Quote the manifesto's actual requirement verbatim** from `manifesto-principles.md` (the Minimum-bar paragraph or principle prose, in double quotes), THEN
2. Show what `[[FRAMEWORK]]` is missing or insufficient — name the specific failure mode (absent, partial, advisory-only, convention-not-enforcement, scope-gap-with-flag).
3. Tie to a `[[ORGANIZATION]]`-specific regulatory exposure with a specific article or obligation number (e.g., `DORA Art. 9`).

The verbatim manifesto quote MUST come first in the bullet — paraphrase is not permitted in this section.

### 3.4 `## [[ORGANIZATION]]-specific implications`

3–5 bullets. Each bullet MUST:
- Cite **at least one specific regulation, clause number, or risk framework** from `[[INDUSTRY]]` / `[[DOMAIN_FILE]]` (e.g., `DORA Art. 19`, `SR 11-7 §IV.A`, `Solvency II Art. 121`, `EU AI Act Art. 9(2)`). Generic regulatory references ("GDPR compliance") are not acceptable.
- Explain the practical consequence for `[[ORGANIZATION]]` of `[[FRAMEWORK]]`'s gap or capability on this principle.
- State what `[[ORGANIZATION]]` MUST do to address the gap.

### 3.5 `## Score rationale`

**Format: one paragraph.** State first: `Score: **{score}/100** ({Severity})`. Then in the same paragraph cite **evidence-for** explicitly (what `[[FRAMEWORK]]` demonstrably does that satisfies this principle), THEN **evidence-against** explicitly (what is absent, partial, or wrong). Do not introduce a separate `Evidence` section elsewhere — evidence-for lives in `## What works`, evidence-against lives in `## Where it fails the manifesto's bar`, and the rationale paragraph cites both sides.

---

## 4. Principle-specific test sections (MANDATORY for P1, P3, P5, P8, P9, P12)

When required, place the test section **immediately after** `## What [[FRAMEWORK]] asserts about this principle` and **before** `## What works`. Reproduce the section title character-for-character.

### P1 — `## Seven-Condition DoD Test`

Assess each of the seven evidence conditions from `manifesto-done.md` against `[[FRAMEWORK]]`'s artefacts. Present as a numbered list:

1. Evaluation reports with pass/fail and metrics
2. Trace IDs linking to the full decision chain
3. Diffs showing what changed
4. Deployment IDs confirming what shipped
5. Rollback plans confirming reversibility
6. Policy check outputs confirming constraint compliance
7. Memory updates confirming what was learned

For each condition: verdict (Met / Partially met / Absent), followed by a one-to-two sentence explanation citing specific `[[FRAMEWORK]]` evidence with file paths in backticks. If the condition is absent, state so directly.

### P3 — `## Blast-Radius Test`

Structure this section as three numbered sub-sections:

1. **Single-agent failure — silent wrong output.** Describe the worst-case scenario: if one agent in a `[[FRAMEWORK]]`-managed workflow produces wrong output silently (syntactically valid, semantically incorrect), what is the maximum blast radius? Trace the propagation path through `[[FRAMEWORK]]`'s lifecycle to its endpoint.

2. **Isolation mechanisms.** List every containment mechanism `[[FRAMEWORK]]` provides. For each: name the mechanism, state whether it is enforced at runtime or only by convention, and state what class of failure it catches (structural / semantic / both).

3. **Verdict.** State plainly whether `[[FRAMEWORK]]`'s architecture is defense-in-depth or defense-in-line, and why. Reference `manifesto-principles.md` P3's minimum bar.

After sub-section 3 (Verdict) and before `## What works`, add this cross-reference placeholder verbatim (character-for-character):

```
> *[Part 12 cross-reference — see Part 12 guardrails assessment; resolved at merge time]*
```

### P5 — `## Tier Assessment`

Structure as a tier-by-tier analysis:

- **What actions `[[FRAMEWORK]]` takes autonomously** (without any human step).
- **What requires human approval** within `[[FRAMEWORK]]`'s lifecycle.
- **What is never autonomous** under `[[FRAMEWORK]]`'s current design.
- **Tier determination.** State the highest manifesto autonomy tier that `[[FRAMEWORK]]` operates at, and what structural evidence supports this determination.
- **What prevents higher tiers.** Name the specific mechanisms or artefacts that would need to exist for `[[FRAMEWORK]]` to safely operate at a higher tier.

### P8 — `## Seven-Condition DoD Test (Evaluation Edition)`

Apply the same seven-condition structure as P1, focused on evaluations as a contract:

1. Evaluations versioned and coupled to specifications
2. Coverage of happy path, adversarial cases, and regression scenarios
3. Evaluations evolve with the system — spec changes trigger evaluation changes
4. Governance evaluations — evidence bundle completeness, provenance consistency, rollback procedure currency, SBOM completeness
5. Verification (did we build it right?) separated from validation (did we build the right thing?)
6. Independent validation — organisationally separate, capable of blocking production deployment
7. Governance evaluation failures trigger the same remediation sub-cycle as product failures

For each condition: verdict (Met / Partially met / Absent) plus a one-to-two sentence explanation citing specific `[[FRAMEWORK]]` evidence with file paths in backticks.

### P9 — `## Does [[FRAMEWORK]]'s observability cover reasoning or only execution?`

This section is a binary diagnostic. Answer the question in the section heading directly and unambiguously (e.g., "**Short answer: execution only.**"). Then explain:

- What `[[FRAMEWORK]]` logs and instruments — be specific: name the log files, watcher plugins, HUD fields, audit-trail artefacts.
- What the manifesto's P9 minimum bar requires for reasoning-level observability, and whether `[[FRAMEWORK]]`'s instrumentation meets it.
- The specific gap between what `[[FRAMEWORK]]` records and what a "why did this happen" query requires.

Do not equivocate. If the observability covers only execution, state so; do not soften the finding.

### P12 — `## Structured Recovery Test`

Assess `[[FRAMEWORK]]` against five recovery steps. Present as numbered steps:

1. **Intent recovery.** Can a new engineer determine what the original engineer was trying to achieve from `[[FRAMEWORK]]`'s artefacts alone?
2. **Decision recovery.** Can a new engineer reconstruct why each significant choice was made?
3. **Evidence recovery.** Can a new engineer locate the artefacts that informed each decision?
4. **Reproduction.** Can a new engineer reproduce the same output given the same inputs?
5. **Modification.** Can a new engineer safely modify the output without breaking undocumented invariants?

For each step: verdict (Pass / Partial / Fail) plus a specific explanation citing `[[FRAMEWORK]]` artefacts with backticked paths.

After the five steps, apply the binding constraint: count how many steps pass fully. Map to score band:
- 5 steps fully passing → 80–100
- 4 steps fully passing → 60–79
- 3 steps fully passing → 40–59
- 2 steps fully passing → 20–39
- 0–1 steps fully passing → 0–19

Partial passes provide credit within the band but cannot move the score across a band boundary.

### Other principles (P2, P4, P6, P7, P10, P11)

These principles do **NOT** have a mandatory test section. Do NOT add a discretionary test section for these principles. Diagnostic depth for any of them belongs inside `## What works` or `## Where it fails the manifesto's bar`.

---

## 5. Evidence requirements (every claim)

- **Verbatim quote + file path** are required for every claim about `[[FRAMEWORK]]`. Paraphrase is not evidence.
- Every bullet in `## What works` and `## Where it fails the manifesto's bar` MUST cite at least one named `[[FRAMEWORK]]` artefact in backticks (file path, command name, or rule identifier).
- Every bullet in `## Where it fails the manifesto's bar` MUST quote the manifesto's actual requirement verbatim from `manifesto-principles.md` first, then show the gap.
- Every bullet in `## [[ORGANIZATION]]-specific implications` MUST cite a specific regulation, article, clause number, or risk framework.
- You may not cite an artefact you have not read or located via Read/Grep/Glob.

---

## 6. Intra-file score consistency

The score in the H1 heading (`# P{N} — ... | **{score}/100**`) MUST be **numerically identical** to the score stated in `## Score rationale` (`Score: **{score}/100**`). If the two differ, resolve before saving the file. The severity label in `## Score rationale` MUST match the threshold band of that score per `prompt.md`'s thresholds table.
