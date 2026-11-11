# Pull Request Template

**Status:** DRAFT. The rules are written so that a check could enforce them, but no such check ships with this template yet (see [Adoption notes](#3-adoption-notes)). Calibrate the risk-class triggers to your project before adopting it.
**Audience:** contributors and agents opening pull requests, reviewers, accountable humans, maintainers who own a repository's merge policy.
**Purpose:** Introduces [`pull-request-template.md`](pull-request-template.md), a pull request description that carries the evidence the [Definition of Done](../manifesto/manifesto-done.md) asks for. It records who or what produced the change, who is accountable for it, what proves it works, and what it affects. It scales with risk, so a spelling fix is not described like a change to a release pipeline.

**Cross-references:** [`operational-templates/pull-request-template.md`](pull-request-template.md) (the template), [`manifesto/manifesto-done.md`](../manifesto/manifesto-done.md), [`manifesto/manifesto-principles-05.md`](../manifesto/manifesto-principles-05.md) (autonomy tiers), [`manifesto/manifesto-principles-12.md`](../manifesto/manifesto-principles-12.md) (accountability), [`companion/principles-08.md`](../companion/principles-08.md#evaluation-theater) (evaluation theater), [`operational-templates/agentic-provenance-record.json`](agentic-provenance-record.json), [`operational-templates/evidence-bundle.json`](evidence-bundle.json), [`operational-templates/control-state-record.json`](control-state-record.json), [`CONTRIBUTING.md`](../CONTRIBUTING.md#citation-verification-procedure) (generator-verifier split).

---

## 1. How to use this template

Copy [`pull-request-template.md`](pull-request-template.md) verbatim to
`.github/pull_request_template.md` (GitHub), or to your forge's equivalent.
Copy it from the source file. Its guidance lives in HTML comments, so every
rendered view hides it, including the published site and GitHub's file
preview. In a real pull request the comments stay in the source and do not
show in the rendered description.

Each section of the template declares when it is required:

| Marker | Meaning |
| --- | --- |
| `<!-- required -->` | Required in every risk class. |
| `<!-- required: standard, high -->` | Required in `standard` and `high`; a `trivial` PR deletes it. |
| `<!-- required: high -->` | Required in `high`; optional otherwise. |

The author declares the risk class. A reviewer or a check may raise it, and
nobody may lower it below a trigger that applies.

## 2. How the template maps to the manifesto

| Manifesto obligation | Where the template carries it |
| --- | --- |
| DoD *Verified*; P8, evaluations are the contract | Tests (with *Evidence it can fail*, *Kind*, *Written by*), Verification |
| Loop: Verify vs Validate | Verification ("did we build it right?") vs Validation ("did we build the right thing?") |
| DoD *Traceable*; agentic provenance record | Provenance and accountability → Agents, Evidence record |
| P5, autonomy is a permission ceiling | Provenance and accountability → Agents (tier); Risk class (Tier 3+ is a `high` trigger) |
| P12, accountability requires visibility | Provenance and accountability → Accountable human |
| Generator-verifier split | Provenance and accountability → Independent review; Tests → *Written by* |
| DoD *Learned from* | Provenance and accountability → Knowledge and memory |
| Control state record (waivers, stale evidence) | Evidence record; Tests → Weakened checks; Verification → Verified at |
| DoD is phase-calibrated | Risk class, which decides which sections are required |
| DoD *Economical* | Provenance and accountability → Agents (inference cost, where tracked) |
| Rollback procedure | Impact → Rollback |
| Specification artefact (P2) | Intent → Outcome and Acceptance criteria; Context → Origin |

## 3. Adoption notes

- **Phase calibration.** At Phases 1–3 a project usually produces no evidence
  bundle or control state record. Write
  `none — project produces no evidence bundle yet` under Evidence record. The
  rest of the template still applies.
- **No checker ships yet.** The rules are machine-checkable by design: fixed
  headings, fixed markers, one-line list items, fixed placeholders. Introduce
  any checker warn-only first, as this repository does for numeric claims, and
  make it enforcing only once real PRs pass it without noise. A checker can
  also raise the risk class from the changed paths (CI configuration,
  dependency manifests, schemas) and require Tests whenever test files or CI
  configuration change.
- **Documentation-only repositories,** this one included: Tests usually
  becomes `None — <reason>`, and the weight moves to Verification (rendering,
  links, anchors) and to Independent review of every added or changed citation.
  In this repository that means a claim-ledger row per citation, as
  [`CONTRIBUTING.md`](../CONTRIBUTING.md#citation-verification-procedure)
  requires.
- **Agents filling in the template.** An agent may draft every section, but it
  may not fill in Accountable human or Independent review on its own behalf.
  Those two record facts about other parties.
