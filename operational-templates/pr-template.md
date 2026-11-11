# Pull Request Template

**Status:** DRAFT. The rules are written so that a check could enforce them, but no such check ships with this template yet (see [Adoption notes](#3-adoption-notes)). Calibrate the risk-class triggers to your project before adopting it.
**Audience:** contributors and agents opening pull requests, reviewers, accountable humans, maintainers who own a repository's merge policy.
**Purpose:** A pull request description that carries the evidence the [Definition of Done](../manifesto/manifesto-done.md) asks for. It records who or what produced the change, who is accountable for it, what proves it works, and what it affects. It scales with risk, so a spelling fix is not described like a change to a release pipeline.

**Cross-references:** [`manifesto/manifesto-done.md`](../manifesto/manifesto-done.md), [`manifesto/manifesto-principles-05.md`](../manifesto/manifesto-principles-05.md) (autonomy tiers), [`manifesto/manifesto-principles-12.md`](../manifesto/manifesto-principles-12.md) (accountability), [`companion/principles-08.md`](../companion/principles-08.md#evaluation-theater) (evaluation theater), [`operational-templates/agentic-provenance-record.json`](agentic-provenance-record.json), [`operational-templates/evidence-bundle.json`](evidence-bundle.json), [`operational-templates/control-state-record.json`](control-state-record.json), [`CONTRIBUTING.md`](../CONTRIBUTING.md#citation-verification-procedure) (generator-verifier split).

---

## 1. How to use this template

Copy the fenced block in [section 4](#4-the-template) verbatim to
`.github/pull_request_template.md` (GitHub), or to your forge's equivalent. The
block is fenced on this page only so that its guidance, which lives in HTML
comments, stays visible when this page is rendered. In a real pull request the
comments stay in the source and do not show in the rendered description.

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

## 4. The template

~~~~markdown
<!--
How to fill in this description

Each section has a comment, then a skeleton to fill in. The comment has four parts:
- Answers: the question the section answers for the reader.
- Write: what goes under each `###` topic of the skeleton.
- Not here: what belongs in another section instead.
- Example: the expected layout, to replace, never copy.

Rules (written so a check can enforce them):
- Start with Risk class: it decides which sections are required. Each `##` heading carries a
  marker: `required` (every class), `required: standard, high` (a trivial PR deletes the section
  with its heading) or `required: high` (optional otherwise; delete it if unused).
- Keep every remaining `##` and `###` heading and its marker as written: no renaming, reordering
  or deleting beyond what the marker allows.
- A `###` topic with nothing under it is unfilled, and so is an Impact list item with nothing after
  its colon or an empty cell in the Tests table.
- A required section is never left unfilled. Except for Risk class, Intent and Provenance and
  accountability, a required section that does not apply replaces its skeleton (topics, table or
  list) with one line, `None — <reason of three or more words>` (`None -` also works), such as
  `None — spelling fix only`; `None — docs only` is too short. Tests may do so only when the PR
  changes no test, check or CI configuration. In the `high` class, Tests, Verification, Validation
  and Risk and limitations may not be `None`.
- Inside a filled section, an empty topic holds `none` (an Impact item holds `unchanged`).
- Commit messages say why each commit exists. This page says what no single commit can: how they
  fit together, who or what produced them, the evidence, the impact and the risk.
- Write for a reader years from now with only this page and the code: paste key evidence (CI logs
  and artifacts expire) and do not rely on chats or meetings.
- Evidence describes one commit. After any later push, re-run what the push could affect, or mark
  that evidence stale under Verification.
- Security vulnerabilities: follow the project's disclosure process, and keep reproduction steps,
  exploit details and affected configurations off this page until a fixed version is released.
-->

## Risk class <!-- required -->

<!--
Answers: how much evidence does this PR owe its reader?
Write:
  - Class: exactly one of `trivial`, `standard`, `high`.
    - trivial: changes no behaviour, output or meaning (spelling, formatting, comments, a broken
      link), and touches no test, check, dependency or configuration.
    - high: any of these triggers applies:
      - security, permissions or secrets
      - stored data, schemas or data formats
      - public API, or outputs other tools parse
      - build, CI or release pipeline
      - a weakened check
      - an agent acted at autonomy tier 3 (Commit) or above
      - a regulated or safety-relevant domain
    - standard: everything else.
  - Reason: why this class, naming the high triggers that apply, or `none`.
  A reviewer or a check may raise the class. Nobody lowers it below a trigger that applies.
Not here: the risks themselves (Risk and limitations).
Example:
  ### Class
  high

  ### Reason
  Changes the export file format, which other tools parse.
-->

### Class

### Reason

## Intent <!-- required -->

<!--
Answers: why does this PR exist, and how will we know it worked?
Write:
  - Problem: what is wrong or missing on the default branch, as a user or maintainer observes it:
    a symptom, not a cause, and not a metric ("a broken date parser would go unnoticed", not
    "coverage is 72%").
  - Outcome: what is true once this merges, stated so that Validation can show it. Link the
    specification it implements, if there is one.
  - Acceptance criteria (tickets or specifications; `none` otherwise): each criterion, with how it
    is met (a test ID, Validation evidence) or why it is not.
Not here: how it is solved (Design), what changed (Changes).
Example:
  ### Problem
  Exporting a file over 2 GB fails with "out of memory" and writes nothing.

  ### Outcome
  Files of any size export, using less than 500 MB of memory.

  ### Acceptance criteria
  - Exports a 5 GB file: met, T1 and Validation.
-->

### Problem

### Outcome

### Acceptance criteria

## For the reviewer <!-- required: standard, high -->

<!--
Answers: what must the reviewer decide, and where should their attention go?
Write: a list under each topic.
  - Decide: questions to answer before merging, each with the options and a recommendation.
  - Read closely: the parts of the diff that most need a careful reading, and why. Name the parts
    an agent generated with the least supervision.
Not here: choices already made (Decisions and open questions).
Example:
  ### Decide
  - Keep the old flag as a deprecated alias for one release? Recommended: yes, scripts use it.

  ### Read closely
  - The retry loop in `sync.py`, the only code touching shared state; agent-written.
-->

### Decide

### Read closely

## Provenance and accountability <!-- required -->

<!--
Answers: who or what produced this change, who answers for it, and who checked it independently?
Write:
  - Agents: each agent that produced content in this PR (code, tests, text, review), with its role,
    model and version, the autonomy tier it worked at (1 Observe, 2 Branch, 3 Commit, 4 Operate),
    the configuration that shaped it (instructions, tools), a link to its provenance record if one
    exists, and its inference cost where tracked; or `none` if no agent produced any content.
  - Accountable human: the one named person who accepts accountability for the outcome once
    merged; not a team, not an agent.
  - Independent review: who verified what, and that they did not generate it: for code, tests, and
    every added or changed citation or numeric claim. A generator checking its own output does not
    count, and neither does another run of the same agent with the same instructions and context.
    In the `high` class, at least one independent reviewer is a human.
  - Evidence record: links to the evidence bundle and control state record, listing every control
    not `passed` with its state (`failed`, `waived` with the waiver link and expiry, `stale`,
    `needs-decision`); or `none — <reason>` when the project produces none.
  - Knowledge and memory: what this work taught that should outlive it (a constraint found, a
    pitfall, a changed convention), and where it is now recorded (docs, a decision record, agent
    instructions, a knowledge base); or `none`.
Not here: reviews before this request and their findings (Prior reviews), the tests (Tests).
Example:
  ### Agents
  - Coding agent, model X 4.1, tier 2 (Branch): wrote the writer and T1–T3, from the repository's
    agent instructions at a1b2c3d. Provenance record: <link>. Cost: 1.20 USD.

  ### Accountable human
  @maintainer-handle

  ### Independent review
  - Code and tests: @reviewer-handle, who wrote none of it.
  - T4 (holdout): written by @reviewer-handle without reading the implementation.

  ### Evidence record
  Bundle <link>; control state <link>. `coverage-threshold`: waived until 2027-01-31 (#230).

  ### Knowledge and memory
  - The target may be read-only: added to `docs/export.md` and to the agent instructions.
-->

### Agents

### Accountable human

### Independent review

### Evidence record

### Knowledge and memory

## Context <!-- required: standard, high -->

<!--
Answers: where does this work come from, and what must the reader know that the diff does not show?
Write:
  - Ticket: `Closes #<issue>` only if this PR resolves it fully, otherwise `Refs #<issue>` and what
    is left; a full URL for other trackers; or why there is none.
  - Origin: an issue, review, incident, plan or specification, and related PRs and commits.
  - Constraints: deadlines, compatibility promises, limits of a dependency, decisions made
    elsewhere.
  - Reproduction (bugs; `none` otherwise): steps that reproduce it on the default branch, how it was
    found, and since when it exists (version or commit, if known). If it could not be reproduced,
    say so and what the fix is based on. If nobody filed it and a release is affected, consider
    filing an issue: users search issues, not PRs.
Not here: the problem statement (Intent), the approach (Design).
Example:
  ### Ticket
  Closes #212.

  ### Origin
  Follows #198, which streamed reads but kept the in-memory writer.

  ### Constraints
  An external spec fixes the file layout.

  ### Reproduction
  Run `export big.dat` on a 2.1 GB file. Reported by a user; present since 1.4.0.
-->

### Ticket

### Origin

### Constraints

### Reproduction

## Scope <!-- required: standard, high -->

<!--
Answers: where are the edges of this PR?
Write: a list under each topic.
  - In scope: what this PR delivers.
  - Out of scope: what a reader might expect here but is left out, each with the reason and a
    tracking link, so nothing is silently dropped.
Not here: how it is built (Design, Changes), acceptance criteria (Intent).
Example:
  ### In scope
  - A streaming writer for the export command.

  ### Out of scope
  - The import command has the same problem; it needs a reader change first (#215).
-->

### In scope

### Out of scope

## Design <!-- required: standard, high -->

<!--
Answers: how does the solution work, and what must stay true?
Write:
  - Root cause (fixes; `none` otherwise): what was wrong; how the change removes it, or that it only
    treats the symptom; other places with the same cause, fixed here or listed in Scope; and what
    stops it coming back (a test, a generated document, a CI check), or that nothing does.
  - Approach: the idea of the solution, above the level of the code.
  - Invariants: properties later changes must not break.
Not here: the choices and alternatives (Decisions and open questions), per-commit detail (Changes).
Example:
  ### Root cause
  The writer kept every record in memory until the end. T1 now guards against it.

  ### Approach
  Write records as they are produced instead of collecting them first.

  ### Invariants
  - The output is byte-identical to the old writer's.
-->

### Root cause

### Approach

### Invariants

## Decisions and open questions <!-- required: standard, high -->

<!--
Answers: what was decided, and what is left open?
Write: a list under each topic.
  - Decisions: each choice a later reader could question, from the approach to a name or a
    default, including deviations from the ticket, plan or specification and, where two sources
    disagreed (docs and code, a spec and an implementation), which one was taken as the truth.
    Each with the alternative rejected and why. Mark choices an agent made that no human reviewed.
  - Open: questions that do not block merging, each with a tracking link.
Not here: questions that block merging (For the reviewer), the approach and invariants (Design),
  weaknesses of the result (Risk and limitations), work left out (Scope).
Example:
  ### Decisions
  - Stream records rather than use a temporary file, because the target may be read-only.

  ### Open
  - Should the import command share this writer? (#215)
-->

### Decisions

### Open

## Changes <!-- required -->

<!--
Answers: how should the reviewer walk through the diff?
Write: a numbered list giving the order to read the commits in, grouped by purpose. Mark commits
  meant to change no behaviour. For mechanical edits (renames, moves, formatting, codemods), give
  the tool or command so the reviewer can rerun it. If commits are not squashed, name any that does
  not build and pass on its own.
Not here: a retelling of each commit (commit messages), the reasoning (Design).
Example:
  1. Two commits move the writer behind an interface (no behaviour change).
  2. One commit switches the export command to a streaming writer.
  3. One commit adds the tests; read it together with 2.
-->

1.

## Tests <!-- required: standard, high -->

<!--
Answers: which tests were added or changed, what does each prove, and could it have failed?
Write:
  - The table: one row per test or group.
    - Kind: `normal`, `negative` (invalid input, failures), `edge` (empty, limits), `adversarial`
      (input built to break the change) or `holdout` (written without access to the
      implementation or the session that produced it).
    - Written by: the author, the agent named in Provenance, or the independent reviewer. A test
      derived from the code it checks can encode the code's bug; in the `high` class, at least one
      adversarial or holdout case is written by someone other than the code's generator.
    - Evidence it can fail: shows the test would catch a regression:
      - New behaviour or a fix: it fails on the default branch, or with the fix reverted.
      - New tests for existing code: it fails when that code is broken on purpose (a mutant).
      - Refactoring: existing tests pass unchanged before and after and exercise the touched code;
        explain any existing test this PR edits.
      - Intermittent failure: repeated runs, such as "50 runs: 7 failures before, 0 after".
      - New CI check: it fails on a deliberately broken commit.
    With mutation testing, list the surviving or pardoned mutants in the touched code below the
    table, each with the reason.
  - Weakened checks: every test or check removed, skipped, expected to fail, retried, given a longer
    timeout or a lower threshold, or silenced (ignore rule, pardoned mutant, pinned dependency),
    each with the reason, a tracking link and, where it is a waiver, its expiry; or `none`. Any
    entry here makes the PR `high`.
Not here: results of the whole suite (Verification), evidence on real input (Validation).
Example:
  | ID | Scenario            | Kind     | Proves                 | Written by | Evidence it can fail               |
  |----|---------------------|----------|------------------------|------------|------------------------------------|
  | T1 | 3 GB generated file | edge     | completes under 500 MB | agent      | on main: failed with out of memory |
  | T4 | truncated input     | holdout  | fails cleanly, no file | reviewer   | with fix reverted: partial file    |

  ### Weakened checks
  none
-->

| ID | Scenario | Kind | Proves | Written by | Evidence it can fail |
|----|----------|------|--------|------------|----------------------|
| T1 |          |      |        |            |                      |

### Weakened checks

## Verification <!-- required: standard, high -->

<!--
Answers: did we build it right?
Write:
  - Verified at: the head commit SHA of the branch when the checks ran.
  - Checks run: each check beyond what CI shows (local commands, other platforms, manual steps),
    with its outcome and the output lines that matter. By kind of change:
    - Docs or visuals: where the rendered result was checked, and that links and anchors resolve.
    - Citations and numeric claims: each one added or changed, resolved against its source by
      someone other than its author, with a link to the record of that check.
    - CI or release pipeline: links to the runs, and which triggers ran (pull request, push, tag,
      schedule, manual, fork) and which did not; jobs that run only on the default branch or a tag
      are unproven here.
    - Coverage: coverage before and after for the touched modules.
  - Skipped, failed or stale: each check not run, not passing, or run on an earlier commit than the
    head, with the reason; or `none`.
Not here: the tests themselves (Tests), usefulness in practice (Validation).
Example:
  ### Verified at
  a1b2c3d

  ### Checks run
  - CI green; the test suite also passes locally on macOS and Windows.

  ### Skipped, failed or stale
  - The ARM build: no runner available (#220).
  - Windows run was at 9f8e7d6; the later push changed only docs.
-->

### Verified at

### Checks run

### Skipped, failed or stale

## Validation <!-- required: standard, high -->

<!--
Answers: did we build the right thing, so that the Outcome in Intent holds in real conditions?
Write:
  - Input: the real input or user (production-like data, the reporter, the requester), and how it
    was chosen, so its representativeness can be judged.
  - Result: before and after, or what a user now sees. By kind of change:
    - Visuals: before and after screenshots wherever the change appears, in light and dark themes
      and at each size shown.
    - Filed bug: the reporter's own reproduction, run on this branch.
    - Ticket with a requester: their acceptance, with a link.
  - Validated by: who judged the result. An agent judging its own output's usefulness is not
    validation; say so if that is all there is.
Not here: test results (Tests, Verification).
Example:
  ### Input
  The three largest customer files (2.4, 5.1 and 9.8 GB), the worst known cases.

  ### Result
  All failed before; all export now, with a peak of 340 MB.

  ### Validated by
  The reporter, in #212.
-->

### Input

### Result

### Validated by

## Impact <!-- required: standard, high -->

<!--
Answers: who or what is affected, and how do we ship and undo this safely?
Write:
  - The list: for each surface, before -> after if this PR changes it, otherwise `unchanged`. Keep
    every item; add the surfaces your users depend on that are missing, one line each. A fix changes
    behaviour too: someone may rely on the old one, so list it and give it a release note.
  - Release note: what users need to know when upgrading, or `none`.
  - Rollout: flags, ordering or migrations needed, or `none`.
  - Rollback: how to undo it, whether that was tried, and what a revert cannot undo (published
    packages, pushed tags, written data, rotated secrets, messages sent, actions an agent took
    outside the repository).
Not here: doubt about whether this list is complete (Risk and limitations).
Example:
  - Performance and resource use: memory grew with file size -> under 500 MB.

  ### Rollback
  Revert, tried on a staging copy; output files are identical, so nothing to migrate.
-->

- Public API, CLI or UI behaviour:
- Configuration, flags and defaults:
- Data formats, schemas and stored data:
- Outputs other tools parse (reports, logs, exit codes, events):
- Dependencies and supported runtimes or platforms:
- Security, permissions and secrets:
- Build, CI and release pipeline (check names, triggers, duration, cost, permissions, action pinning):
- Agent configuration (instructions, tools, permissions, autonomy tiers):
- Performance and resource use:
- Accessibility (alternative text, contrast, keyboard use, legibility at small sizes):
- Licences and attribution of third-party code, icons, images or fonts:
- Documentation:

### Release note

### Rollout

### Rollback

## Risk and limitations <!-- required: standard, high -->

<!--
Answers: what could still be wrong, and what must the reader not assume?
Write: a list under each topic, or `none`.
  - Not proven: what Tests, Verification and Validation leave unshown.
  - Risks: each with likelihood, consequence and mitigation.
  - Limitations: limits that users or maintainers will hit.
Not here: follow-up work (Scope), certain effects (Impact), the root cause (Design).
Example:
  ### Not proven
  - Network file systems: all runs used local disks.

  ### Risks
  - A slow consumer now stalls the export instead of failing; unlikely; no timeout yet (#221).

  ### Limitations
  none
-->

### Not proven

### Risks

### Limitations

## Prior reviews <!-- required: high -->

<!--
Answers: what did reviews before this request find, and what became of each finding?
Write:
  - Reviews: each review run, with the tool and its settings, or the person, and whether it was
    independent of the generator (see Provenance and accountability).
  - Findings: each with its verdict (fixed, rejected with the reason, deferred with a link), the
    fix, and the test or check that fails without it.
Not here: comments made on this PR (review threads).
Example:
  ### Reviews
  - Automated review, high effort; a different model from the generator.

  ### Findings
  - "File handle leaks on error": fixed in d4e5f6a; T3 fails without it.
-->

### Reviews

### Findings
~~~~
