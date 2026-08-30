# /review — Agentic Engineering Manifesto Framework Review

Run a complete manifesto alignment review of a framework across 17 specialised agent roles (with 12 parallel principle agents) in four waves.

## Usage

```
/review FRAMEWORK FRAMEWORK_PATH ORGANIZATION INDUSTRY DOMAIN_FILE [PRIOR_REVIEWS]
```

## Arguments

| Argument | Required | Format | Example |
| --- | --- | --- | --- |
| `FRAMEWORK` | Yes | Name as it appears in the framework's own docs | `abcd` |
| `FRAMEWORK_PATH` | Yes | Filesystem path to the root of `FRAMEWORK`'s own source tree (a clone, checkout, or subdirectory). If omitted, ask the user before proceeding — never guess it and never assume it equals the output directory. | `../abcd` or `/Users/me/repos/abcd` |
| `ORGANIZATION` | Yes | Client organisation name | `ABCD.xyz` |
| `INDUSTRY` | Yes | Industry + key regulations (quote if contains spaces) | `"European insurance — DORA, Solvency II, EU AI Act"` |
| `DOMAIN_FILE` | Yes | Path under `domains/` (e.g., `domains/insurance.md`, `domains/medical-devices.md`, `domains/automotive.md`, etc.) | `domains/insurance.md` |
| `PRIOR_REVIEWS` | No | Comma-separated paths to prior merged reviews, or `none`. **Confidentiality:** a prior review is a confidential assessment of another client's framework — before reusing one, confirm with the user that sharing its content (framework name, weaknesses) inside the new client's deliverable is authorised. | `abcd/abcd_manifesto_alignment_review_merged.md` |

---

## Execution

### Step 1 — Resolve the manifesto

Determine the manifesto root path using this priority order:

1. **Current directory:** If the current working directory contains a `review/` subdirectory that itself contains both `prompt.md` and a `prompts/` subdirectory, use the current working directory as the manifesto root. (Legacy fallback: if the current working directory itself contains both `prompt.md` and a `prompts/` subdirectory, also accept it as the manifesto root.) **Skip clone and pull — the user is already working inside the manifesto. Do not attempt to modify it.**
2. **Env var:** If `AGENTIC_MANIFESTO_PATH` is set, use that value.
3. **Default:** Use `~/.local/share/agentic-engineering-manifesto`.

**For cases 2 and 3 only — if the resolved path does not exist, clone it:**

```bash
git clone https://github.com/arnaudgelas/agentic-engineering-manifesto.git {resolved_path}
```

**For cases 2 and 3 only — if the resolved path exists, pull latest:**

```bash
git -C {resolved_path} pull --ff-only
```

If `pull` fails because there are local uncommitted changes, run `git -C {resolved_path} fetch origin` instead and warn:
> ⚠️ The local manifesto copy has uncommitted changes. Scoring will be based on the working tree, not HEAD. Commit or stash changes before running if you need a reproducible result.

**Verify the manifesto is intact** — these files must exist and be tracked by git (all three resolution paths):

```
{resolved_path}/manifesto/manifesto.md
{resolved_path}/manifesto/manifesto-principles.md
{resolved_path}/manifesto/manifesto-principles-01.md
{resolved_path}/manifesto/manifesto-principles-02.md
{resolved_path}/manifesto/manifesto-principles-03.md
{resolved_path}/manifesto/manifesto-principles-04.md
{resolved_path}/manifesto/manifesto-principles-05.md
{resolved_path}/manifesto/manifesto-principles-06.md
{resolved_path}/manifesto/manifesto-principles-07.md
{resolved_path}/manifesto/manifesto-principles-08.md
{resolved_path}/manifesto/manifesto-principles-09.md
{resolved_path}/manifesto/manifesto-principles-10.md
{resolved_path}/manifesto/manifesto-principles-11.md
{resolved_path}/manifesto/manifesto-principles-12.md
{resolved_path}/manifesto/manifesto-done.md
{resolved_path}/glossary.md
{resolved_path}/adoption/path.md
{resolved_path}/companion/frameworks.md
{resolved_path}/companion/principles.md
{resolved_path}/companion/principles-01.md
{resolved_path}/companion/principles-02.md
{resolved_path}/companion/principles-03.md
{resolved_path}/companion/principles-04.md
{resolved_path}/companion/principles-05.md
{resolved_path}/companion/principles-06.md
{resolved_path}/companion/principles-07.md
{resolved_path}/companion/principles-08.md
{resolved_path}/companion/principles-09.md
{resolved_path}/companion/principles-10.md
{resolved_path}/companion/principles-11.md
{resolved_path}/companion/principles-12.md
{resolved_path}/review/prompt.md
{resolved_path}/review/prompts/prompt-01-quick-overview.md
{resolved_path}/review/prompts/prompt-02-principle.md
```

If any are missing, report the error and stop.

**Tracked-files-only.** Every source file the review system reads MUST be tracked by git on the resolved manifesto branch. Files that appear only in the working tree (untracked, `??` in `git status`) are NOT in scope, even if they exist on disk.

**Note:** The review system also reads (when relevant to the agent's task) AEM-relevant content from `{resolved_path}/beyond-agile/`, `{resolved_path}/governance/`, `{resolved_path}/integration/`, `{resolved_path}/regulatory/`, and `{resolved_path}/operational-templates/`. These directories are not strictly required to exist — agents skip cross-references if a directory is absent — but their presence enables fuller coverage. The following are explicitly out of scope and are not read by any agent: `asdlc/`, `aplc/`, `agentic-sdlc-handbook/`, `intelligence-governance-manifesto/`, `agentic-enterprise-manifesto/`, `agentic-enterprise.{md,html}`, `agentic-governance-stack.{md,html}`, `manifesto/manifesto-evolution-plan.{md,html}`, `phase-assessment-checklist.{md,html}`, `aplc-plan*`, `asdlc-plan*`, and `igm-aent-coherence-review*`.

**For ALL THREE cases, including case 1 — check for a dirty working tree, now that `{resolved_path}` is guaranteed to exist:** run `git -C {resolved_path} status --porcelain`. If it reports any changes (staged or unstaged, tracked or untracked), warn:
> ⚠️ The manifesto working tree at `{resolved_path}` has uncommitted changes. Scoring will be based on the working tree, not the recorded commit hash `{MANIFESTO_HASH}`. The provenance line will not reproducibly identify what was actually scored. Commit or stash changes before running if you need a reproducible result.

This check applies to case 1 (running from inside the manifesto, which is the Quick Start's documented path) exactly as it applies to cases 2 and 3 — a dirty tree scored from case 1 is exactly as unreproducible as one scored from case 2 or 3. This check runs here — after clone/pull handling and immediately before recording the hash in Step 2 — rather than before path resolution/cloning, because for cases 2 and 3 on a first-time install `{resolved_path}` does not exist yet; running `git -C {resolved_path} status` before the clone would fail with no such path.

---

### Step 2 — Record the manifesto hash

```bash
# The CORPUS commit — the last commit touching files agents score against.
# Not repo HEAD: tooling commits under review/ must not change provenance.
CORPUS="manifesto companion adoption domains glossary.md governance integration regulatory operational-templates beyond-agile"
MANIFESTO_HASH=$(git -C {resolved_path} log -1 --format=%H -- $CORPUS)
MANIFESTO_HASH_SHORT=$(git -C {resolved_path} log -1 --format=%h -- $CORPUS)

# Repo HEAD, recorded separately so the run itself stays reproducible.
TOOLING_HASH=$(git -C {resolved_path} rev-parse HEAD)
```

Note for zsh: `$CORPUS` does not word-split unquoted; use `${=CORPUS}` or list the
paths literally, or the pathspec collapses to one word and the command silently
returns nothing.

Display to the user:
> Manifesto: `arnaudgelas/agentic-engineering-manifesto@{MANIFESTO_HASH_SHORT}` ([full hash: {MANIFESTO_HASH}](https://github.com/arnaudgelas/agentic-engineering-manifesto/commit/{MANIFESTO_HASH}))

---

### Step 3 — Validate arguments

1. **FRAMEWORK_LOWER** — Derive from `FRAMEWORK`: lowercase, replace spaces and hyphens with underscores. Must match `[a-z0-9_]+`. Report and stop if it does not.

2. **FRAMEWORK_PATH** — If not supplied, ask the user for it before proceeding; do not assume it equals `{FRAMEWORK_LOWER}` or the current directory. Verify the path exists and is readable, **quoting it** in every shell invocation (it is user-supplied and may contain spaces or shell metacharacters):
   ```bash
   ls -- "{FRAMEWORK_PATH}"
   ```
   Report and stop if it does not exist. If `{FRAMEWORK_PATH}` is itself a git repository, additionally run `git -C "{FRAMEWORK_PATH}" rev-parse HEAD` (quoted, same reason) to obtain `{FRAMEWORK_VERSION}` automatically when the user did not supply one; otherwise fall back to `unknown` and warn the user that score disputes against this run will not be reproducible against a specific framework state.
   **Collision check.** Resolve `{FRAMEWORK_PATH}` and `{FRAMEWORK_LOWER}` to canonical absolute paths (relative to the current working directory) and compare them. If they are the same path — e.g. a call like `/review abcd abcd ...` where the framework's own checkout and the review's output slug happen to coincide — STOP and report the collision to the user; ask for either a distinct `FRAMEWORK_PATH` or a distinct `FRAMEWORK_LOWER`/output location. Do not proceed: writing review output into `{FRAMEWORK_PATH}` would corrupt the framework's own source tree and would cause every downstream agent that reads `{FRAMEWORK_PATH}` to ingest this review's own sibling output files as if they were framework artefacts.

3. **DOMAIN_FILE** — Verify `{resolved_path}/{DOMAIN_FILE}` exists. If not, list available files:
   ```bash
   ls {resolved_path}/domains/*.md
   ```
   Report the missing file and stop.

4. **PRIOR_REVIEWS** — If not `none`, verify each comma-separated path exists (relative to manifesto root or absolute). Report any missing files and stop. Confirm with the user (per the Arguments table's confidentiality note) that reuse is authorised before proceeding.

5. **Output directory** — Step 3.2's collision check has already confirmed `{FRAMEWORK_LOWER}/` does not resolve to `{FRAMEWORK_PATH}`. If `{FRAMEWORK_LOWER}/` does not exist in the current working directory, create it. **This directory is output-only — it is never read as a source of `{FRAMEWORK}`'s own artefacts; that is `{FRAMEWORK_PATH}`'s role.**
   ```bash
   mkdir -p -- "{FRAMEWORK_LOWER}"
   ```

6. **REVIEW_DATE** — Set to today's date in `YYYY-MM-DD` format, at the moment this step runs. Used for `[[REVIEW_DATE]]` substitution below.

---

### Step 4 — Resolve variable values (do NOT substitute into `prompt.md` itself)

`{resolved_path}/review/prompt.md` is the orchestrator's own reference document — it defines execution order, the canonical tables, and the hard rules that govern spawning. **It is never passed to the `Agent` tool and is never itself written out as a substituted copy.** Do not run a find-and-replace over `prompt.md`; doing so corrupts its own "Variables" documentation section (which legitimately contains the literal placeholder strings as *names*, not values to replace). Instead, resolve the variable values below into memory and use them (a) when substituting each individual sub-prompt file before spawning it, per Step 5, and (b) when running `Glob`/`Read`/`mkdir` commands that need a literal path or slug operationally.

| Placeholder | Value |
| --- | --- |
| `[[FRAMEWORK]]` | `{FRAMEWORK}` |
| `[[FRAMEWORK_LOWER]]` | `{FRAMEWORK_LOWER}` |
| `[[FRAMEWORK_PATH]]` | `{FRAMEWORK_PATH}` |
| `[[FRAMEWORK_VERSION]]` | Resolved in Step 3.2, or `unknown` |
| `[[ORGANIZATION]]` | `{ORGANIZATION}` |
| `[[INDUSTRY]]` | `{INDUSTRY}` |
| `[[DOMAIN_FILE]]` | `{DOMAIN_FILE}` |
| `[[PRIOR_REVIEWS]]` | `{PRIOR_REVIEWS}` (or `none`) |
| `[[MANIFESTO_HASH]]` | `{MANIFESTO_HASH}` |
| `[[REVIEW_DATE]]` | `{REVIEW_DATE}` (resolved in Step 3.6) |
| `[[PRINCIPLE_NUMBER]]` | (only for `prompt-02-principle.md`; values 1..12 across the 12 parallel spawns) |
| `[[PRINCIPLE_NAME]]` | (only for `prompt-02-principle.md`; per-N name re-derived from the `## N.` heading of the matching `manifesto/manifesto-principles-NN.md` shard — see below) |

**Derive `[[PRINCIPLE_NAME]]` from the live shard, not from a cached table.** For each N in 1..12, read line 1 of the matching zero-padded shard file listed in the "Verify the manifesto is intact" list above (`manifesto-principles-01.md` … `manifesto-principles-12.md` — for N ≥ 10 this is `-10`/`-11`/`-12.md`, NOT `-010`/`-011`/`-012.md`) and strip the `## N. ` prefix to get the full heading text. `prompt.md`'s weighting table carries a short-form cache of these names for convenience; if the cache and the live heading disagree in substance (not just punctuation), use the live heading's substance and flag the drift to the user so `prompt.md` can be corrected.

**Assemble the Universal Prepend Block once per run** per `prompt.md`'s "Universal Prepend Block" — from `prompt.md`'s current weighting/severity/effort/banned-language tables (after any `[[PRINCIPLE_NAME]]` correction above) AND its "Severity for findings that carry no score," "What the composite does and does not measure," "Idempotency policy," "Hard rules for all agents," and "Out-of-scope corpus" sections, verbatim. **This list must match `prompt.md`'s own Universal Prepend Block template exactly** — if the two disagree, `prompt.md` is authoritative and this list is stale; fix it before running. This block is what carries the manifesto-side tracked-files scope, the verbatim-manifesto-quote carve-out, the reading-budget disclosure rule, the provenance-line requirement, and the canonical idempotency rule to every spawned agent — those rules live only in `prompt.md`, which is never itself passed to the `Agent` tool, so omitting any of them from this assembled block makes them invisible to every sub-prompt.

**For each sub-prompt file** (read from `{resolved_path}/review/prompts/`): substitute all double-bracket placeholders with the resolved values, prepend the Universal Prepend Block, then pass the result to the `Agent` tool per Step 5.

**Final scan:** After substitution, verify no unsubstituted placeholder remains in each substituted sub-prompt. Scan only for the specific, identifier-shaped tokens actually used for substitution — `[[FRAMEWORK]]`, `[[FRAMEWORK_LOWER]]`, `[[FRAMEWORK_PATH]]`, `[[FRAMEWORK_VERSION]]`, `[[ORGANIZATION]]`, `[[INDUSTRY]]`, `[[DOMAIN_FILE]]`, `[[PRIOR_REVIEWS]]`, `[[MANIFESTO_HASH]]`, `[[REVIEW_DATE]]`, and (for `prompt-02-principle.md` instances only) `[[PRINCIPLE_NUMBER]]` / `[[PRINCIPLE_NAME]]` — i.e. `\[\[[A-Z][A-Z0-9_]*\]\]`. Do **not** do a bare literal-`[[...]]` (ellipsis) scan: every sub-prompt's own "Placeholder reminder" prose legitimately contains the literal three-dot text `` `[[...]]` `` as a description of the substitution mechanism, not as an unset variable, and a bare scan for that string will always match it and halt every run. If any of the identifier-shaped tokens above are found, report and stop.

---

### Step 5 — Execute wave orchestration

Follow the substituted `prompt.md`'s execution order exactly.

**Wave 1a** — spawn 22 agents using the `Agent` tool, **at most 6 at a time**, waiting for each batch to finish before the next. **The batch list is in `prompt.md` § "Wave 1a — spawn in batches of at most 6"; use it as written and do not restate it here** — two copies of a schedule drift, and a drifted schedule silently drops or double-runs an agent.

- After any agent dies from a stream error or stall, drop the limit to 3 for the rest of the run and split any remaining batch that exceeds it.
- Every spawn message must tell the agent not to spawn sub-agents of its own; the binding version of that rule is in the Universal Prepend Block's "Hard rules for all agents", which is what actually reaches the agent.
- Record in the manifest: the limit used, whether it was degraded, total spawns, and how many were re-runs.

**Completion check.** Accept an output file only if `tail -n 2 <file> | grep -q '<!-- SELF-CHECK: PASSED -->'` succeeds; otherwise delete it and re-spawn that agent. This gates every wave barrier, not just the failure path. Never read a failed agent's output into your own context. After a re-run, regenerate whatever **reads** that agent's file, per `prompt.md` § Idempotency policy.

Agents in Wave 1a:
- Agent 01: `{resolved_path}/review/prompts/prompt-01-quick-overview.md`
- Agents 02-p1 through 02-p12 (12 parallel spawns): `{resolved_path}/review/prompts/prompt-02-principle.md` — for each principle N in 1..12, substitute `[[PRINCIPLE_NUMBER]]` = N and `[[PRINCIPLE_NAME]]` = **the live-shard-derived value already resolved in Step 4** ("Derive `[[PRINCIPLE_NAME]]` from the live shard, not from a cached table"). Do not source `[[PRINCIPLE_NAME]]` from `prompt.md`'s weighting table or from any hand-copied list here — that cached table is a convenience reference only and can drift from the manifesto shards (that is the exact failure mode Step 4's live-shard derivation exists to prevent). Use only the 12 values already resolved in Step 4. For P1, P3, P5, P8, P9, and P12, also append the matching principle-specific test fragment per `prompt.md` § "Spawn mechanism" step 4.
- Agent 03a: `{resolved_path}/review/prompts/prompt-03a-loop-upstream.md` (Part 3 §3.1–§3.3 — Specify, Design, Plan)
- Agent 03b: `{resolved_path}/review/prompts/prompt-03b-loop-build.md` (Part 3 §3.4–§3.6 — Execute, Verify, Validate)
- Agent 03c: `{resolved_path}/review/prompts/prompt-03c-loop-runtime.md` (Part 3 §3.7–§3.10 — Observe, Learn, Govern, Human Escalation)
- Agent 03d: `{resolved_path}/review/prompts/prompt-03d-loop-integrity.md` (Part 3 §3.11 — seams, feedback arrows, remediation, loop output, end-to-end trace, iteration)
- Agent 04a: `{resolved_path}/review/prompts/prompt-04a-adoption.md`
- Agent 04b: `{resolved_path}/review/prompts/prompt-04b-companion.md`
- Agent 05a: `{resolved_path}/review/prompts/prompt-05a-maturity.md`
- Agent 07: `{resolved_path}/review/prompts/prompt-07-guardrails-security.md` (Parts 12 + 13)
- Agent 08a: `{resolved_path}/review/prompts/prompt-08a-enterprise-domains.md` (Part 14 §14.1–§14.15 intermediate)

**Wait for Wave 1a:** apply the completion check to all 22 Wave 1a output files. If any are missing after an agent completes, offer to re-run only that agent (for a missing principle, re-run only the affected `prompt-02-principle.md` instance with the matching `[[PRINCIPLE_NUMBER]]` / `[[PRINCIPLE_NAME]]`).

**Wave 1b** — spawn these 4 agents once their own inputs pass the completion check (per `prompt.md` § Spawn mechanism, an agent is gated on its inputs, not on its wave; 03e and 05b need 05a, 04c needs 04a and 04b, 08b needs 08a — none reads a principle file):
- Agent 03e: `{resolved_path}/review/prompts/prompt-03e-dod.md` (Part 4; reads the `**Maturity Verdict: Phase {N}**` line from `_review_05a_maturity.md` to set the phase-calibrated DoD bar)
- Agent 04c: `{resolved_path}/review/prompts/prompt-04c-synthesis.md`
- Agent 05b: `{resolved_path}/review/prompts/prompt-05b-industry.md`
- Agent 08b: `{resolved_path}/review/prompts/prompt-08b-enterprise-synthesis.md` (reads 08a as evidence; writes §14.16–§14.19 only — agent 09 merges §14.1–§14.15 from 08a directly)

**Wait for Wave 1b:** apply the completion check to `_review_03e_dod.md`, `_review_04c_synthesis.md`, `_review_05b_industry.md`, and `_review_08b_enterprise_synthesis.md`.

**Wave 2:** Spawn agent 06: `{resolved_path}/review/prompts/prompt-06-strengths-gaps.md`.

Wait for `_review_06_strengths_gaps.md`.

**Wave 3:** Spawn agent 09: `{resolved_path}/review/prompts/prompt-09-merge.md`.

Wait for `_manifesto_alignment_review_merged.md`.

---

### Step 6 — Report completion

**Check the merged review's `## Source Integrity` first.** If it contains a `**Maturity-versus-DoD inconsistency**` entry (agent 09 check 4c), the run did **not** produce a settled maturity verdict: agent 05a placed the framework at a phase that agent 03e's phase-calibrated audit contradicts. Report `⚠ Review complete — maturity verdict contested` instead of `✓ Review complete`, name the failing DoD conditions, and give the operator the resolution procedure below. Do not report a clean `✓` over an unresolved contradiction.

**Resolution procedure for a contested maturity verdict.** The dependency runs one way — 05a sets the phase, 03e scores against it — so a contradiction is resolved by re-running 05a with the DoD evidence in hand, not by re-parameterising 03e. Agent 03e has no phase input of its own: it reads the phase verbatim from `_review_05a_maturity.md` and its self-check rejects any phase not taken from that file. Do not attempt to "re-run 03e at N−1"; there is no supported way to do it.

**First, split the failing conditions by whether their applicability is domain-driven.** Agent 05a is **domain-agnostic** — its own prompt forbids it from reading `[[DOMAIN_FILE]]` — and agent 03e's `Provable` trigger can be met *solely* because `[[DOMAIN_FILE]]` names an obligation requiring proof (03e §2.2 Gate 1). Feeding a domain-triggered failure back into 05a would make the same framework receive different "domain-agnostic" Phase 8 verdicts for different clients. So:

- **Domain-independent failures** (a condition failing on `[[FRAMEWORK]]` evidence alone) are maturity evidence and may go to 05a.
- **Domain-triggered failures** (applicability established only via `[[DOMAIN_FILE]]`) are **deployment-fitness** evidence. They belong to Part 9, not Part 8. Never pass them to 05a.

If **every** failing condition is domain-triggered, do not re-run anything: the phase verdict is not contested, the framework is simply unfit for this client's domain at that phase. Record that in Source Integrity, ensure Part 9's Red Line reflects it, and report the run as contested-on-deployment-fitness rather than contested-on-maturity.

Otherwise:

1. **Re-run agent 05a**, appending only the **domain-independent** failing conditions: condition name, score, and the phase bar it was scored against. Pass **no** regulatory citation, no `[[DOMAIN_FILE]]` text, and no client context — 05a must stay domain-agnostic and its output reusable across clients. Agent 05a already places the framework at the **lowest unmet gate** with no partial credit, so this is new gate evidence for a decision it already owns, not a new authority.
2. **Re-run agent 03e** against whatever phase 05a now returns, **then agent 05b** — 05b's Part 9 is bound by the phase and restates the verdict line, so skipping it leaves Part 9 on the stale verdict — then agents 06 and 09, in that order.
3. **If 05a returns the same phase**, the contradiction is not a placement error: 05a's gate evidence and 03e's DoD evidence genuinely disagree. Keep both verdicts, keep the Source Integrity entry, and report the run as contested. Escalate to the named human reviewer — this is exactly the case human sign-off exists for.

Repeat at most **once**. If a second pass still contests, stop and escalate; do not loop.

This is an operator decision, not an automated one: agent 09 has no evidence base of its own, and adding an arbitrator agent would create a scoring authority with no primary evidence. Agent 05a is the correct place to resolve it because it already owns phase placement — it simply needs the DoD evidence it could not have had on the first pass.

```
✓ Review complete
  Framework:     {FRAMEWORK} ({FRAMEWORK_VERSION})
  Framework path: {FRAMEWORK_PATH}
  Client:        {ORGANIZATION}
  Domain:        {DOMAIN_FILE}
  Manifesto:     arnaudgelas/agentic-engineering-manifesto@{MANIFESTO_HASH_SHORT}
  Output dir:    {FRAMEWORK_LOWER}/
  Files written: {N} files
  Agents spawned: {AGENT_COUNT}
  Merged review: {FRAMEWORK_LOWER}/{FRAMEWORK_LOWER}_manifesto_alignment_review_merged.md

  This review has not been signed off by a named human reviewer. It is a
  draft AI-generated assessment scored against a manifesto that its own
  author describes as an "operable specification," "not yet a validated
  discipline" (manifesto.md, "Evidentiary stage"). Before this leaves your
  organisation, a named human must review it and record their name and the
  review date in review_run_manifest.json (see below).
```

---

## Run manifest

After Wave 3 completes successfully, write `{FRAMEWORK_LOWER}/review_run_manifest.json` with every `{PLACEHOLDER}` below replaced by its actual resolved value (these use `{X}` brace syntax, not the `[[X]]` syntax used elsewhere in this system — the `[[...]]` final scan in Step 4 does NOT cover this file. **Validate the written file by parsing it as JSON** — a brace scan is insufficient, because several template values are unbraced sentinels (`true_or_false`, `number_or_null`, `true_or_false_or_null`) that a brace scan will not catch, and `"tool-layer_or_unavailable"` is a syntactically valid string that will pass silently. Parsing catches the unquoted sentinels; for `token_usage_source`, additionally assert the value is exactly `tool-layer` or `unavailable`. Also confirm no `{` `}` remains around any identifier). The `principle_mapping` object below is illustrative only — populate it with the 12 live-shard-derived `[[PRINCIPLE_NAME]]` values actually resolved for this run in Step 4/5, not copied verbatim from this template, which can drift from the current manifesto shards:

```json
{
  "framework": "{FRAMEWORK}",
  "framework_lower": "{FRAMEWORK_LOWER}",
  "framework_path": "{FRAMEWORK_PATH}",
  "framework_version": "{FRAMEWORK_VERSION}",
  "organization": "{ORGANIZATION}",
  "industry": "{INDUSTRY}",
  "domain_file": "{DOMAIN_FILE}",
  "manifesto_hash": "{MANIFESTO_HASH}",
  "tooling_hash": "{TOOLING_HASH}",
  "manifesto_hash_short": "{MANIFESTO_HASH_SHORT}",
  "manifesto_working_tree_dirty": true_or_false,
  "review_date": "{REVIEW_DATE}",
  "agents_spawned": {AGENT_COUNT},
  "reviewer_name": null,
  "reviewer_signoff_date": null,
  "prior_reviews_confidentiality_confirmed": true_or_false_or_null,
  "principle_mapping": {
    "P1": "Outcomes are the unit of work",
    "P2": "Specifications are living artifacts",
    "P3": "Architecture is defense-in-depth",
    "P4": "Right-size the swarm",
    "P5": "Autonomy is a permission ceiling",
    "P6": "Knowledge and memory are distinct infrastructure",
    "P7": "Context is engineered like code",
    "P8": "Evaluations are the contract",
    "P9": "Observability and interoperability cover reasoning",
    "P10": "Assume emergence, engineer containment",
    "P11": "Optimize economics of intelligence",
    "P12": "Accountability requires visibility"
  },
  "max_concurrent_agents": 6,
  "concurrency_degraded": true_or_false,
  "agent_reruns": number,
  "approx_total_output_tokens": number_or_null,
  "token_usage_source": "tool-layer_or_unavailable",
  "maturity_verdict_contested": true_or_false,
  "total_output_files": 28,
  "merged_review_file": "{FRAMEWORK_LOWER}/{FRAMEWORK_LOWER}_manifesto_alignment_review_merged.md"
}
```

`agents_spawned` (above), `max_concurrent_agents`, `concurrency_degraded`, `agent_reruns`, and `approx_total_output_tokens` together satisfy the canonical cost-and-run-accounting rule in `prompt.md` § Universal rules. Token usage is recorded only when the tool layer actually reports it: set `approx_total_output_tokens` to the number and `token_usage_source` to `tool-layer`, or set it to `null` with `token_usage_source` as `unavailable`. Never estimate a token count — an invented figure is worse than a recorded absence. `maturity_verdict_contested` is `true` when agent 09 check 4c fired (see Step 6).

This manifest supports reproducibility on the **manifesto side only** — `manifesto_hash` pins the exact manifesto commit scored against, and `manifesto_working_tree_dirty` flags when that pin does not reflect what was actually read. It does NOT make the **framework side** reproducible when `framework_version` is `unknown`: without a real version, tag, or commit hash for `{FRAMEWORK_PATH}`, nobody can later recover the exact framework state that was scored. Treat `unknown` as a known gap in this manifest, not a resolved field. `reviewer_name` and `reviewer_signoff_date` start `null` — fill them in after a named human has reviewed the merged output (see Step 6's sign-off note); a manifest with both fields still `null` records that no human sign-off has happened yet.

---

## Notes

- Output files go into `{FRAMEWORK_LOWER}/` relative to the working directory when the skill is invoked, not relative to the manifesto root. `{FRAMEWORK_LOWER}/` is write-only for this review system — `{FRAMEWORK_PATH}` is the read source for `{FRAMEWORK}`'s own artefacts.
- Every output file will contain `Manifesto: arnaudgelas/agentic-engineering-manifesto@{MANIFESTO_HASH}` in its header — this is enforced by a hard rule in `prompt.md`, including for the 02-pN principle files (their own hard gate checks for it explicitly).
- To check review progress at any point, use `/review-status {FRAMEWORK_LOWER}`.
- **Idempotency (single rule — see `prompt.md`):** re-running `/review` regenerates an output file if any of its declared inputs are newer than it, or if it fails its completion check; otherwise it is skipped. "Exists and is non-empty" is NOT sufficient. After a re-run, regenerate the agents that **read** the re-run agent's output — not siblings that merely score the same subject. Agent 01 does not read the `02-pN` files, so the two never invalidate each other.
