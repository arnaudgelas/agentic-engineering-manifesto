# /review — Agentic Engineering Manifesto Framework Review

Run a complete manifesto alignment review of a framework across 13 specialised agent roles (with 12 parallel principle agents) in four waves.

## Usage

```
/review FRAMEWORK ORGANIZATION INDUSTRY DOMAIN_FILE [PRIOR_REVIEWS]
```

## Arguments

| Argument | Required | Format | Example |
| --- | --- | --- | --- |
| `FRAMEWORK` | Yes | Name as it appears in the framework's own docs | `abcd` |
| `ORGANIZATION` | Yes | Client organisation name | `ABCD.xyz` |
| `INDUSTRY` | Yes | Industry + key regulations (quote if contains spaces) | `"European insurance — DORA, Solvency II, EU AI Act"` |
| `DOMAIN_FILE` | Yes | Path under `domains/` (e.g., `domains/insurance.md`, `domains/medical-devices.md`, `domains/automotive.md`, etc.) | `domains/insurance.md` |
| `PRIOR_REVIEWS` | No | Comma-separated paths to prior merged reviews, or `none` | `abcd/abcd_manifesto_alignment_review_merged.md` |

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
```

If any are missing, report the error and stop.

**Tracked-files-only.** Every source file the review system reads MUST be tracked by git on the resolved manifesto branch. Files that appear only in the working tree (untracked, `??` in `git status`) are NOT in scope, even if they exist on disk.

**Note:** The review system also reads (when relevant to the agent's task) AEM-relevant content from `{resolved_path}/beyond-agile/`, `{resolved_path}/governance/`, `{resolved_path}/integration/`, `{resolved_path}/regulatory/`, and `{resolved_path}/operational-templates/`. These directories are not strictly required to exist — agents skip cross-references if a directory is absent — but their presence enables fuller coverage. The following are explicitly out of scope and are not read by any agent: `asdlc/`, `aplc/`, `agentic-sdlc-handbook/`, `intelligence-governance-manifesto/`, `agentic-enterprise-manifesto/`, `agentic-enterprise.{md,html}`, `agentic-governance-stack.{md,html}`, `manifesto/manifesto-evolution-plan.{md,html}`, `phase-assessment-checklist.{md,html}`, `aplc-plan*`, `asdlc-plan*`, and `igm-aent-coherence-review*`.

---

### Step 2 — Record the manifesto hash

```bash
MANIFESTO_HASH=$(git -C {resolved_path} rev-parse HEAD)
MANIFESTO_HASH_SHORT=$(git -C {resolved_path} rev-parse --short HEAD)
```

Display to the user:
> Manifesto: `arnaudgelas/agentic-engineering-manifesto@{MANIFESTO_HASH_SHORT}` ([full hash: {MANIFESTO_HASH}](https://github.com/arnaudgelas/agentic-engineering-manifesto/commit/{MANIFESTO_HASH}))

---

### Step 3 — Validate arguments

1. **FRAMEWORK_LOWER** — Derive from `FRAMEWORK`: lowercase, replace spaces and hyphens with underscores. Must match `[a-z0-9_]+`. Report and stop if it does not.

2. **DOMAIN_FILE** — Verify `{resolved_path}/{DOMAIN_FILE}` exists. If not, list available files:
   ```bash
   ls {resolved_path}/domains/*.md
   ```
   Report the missing file and stop.

3. **PRIOR_REVIEWS** — If not `none`, verify each comma-separated path exists (relative to manifesto root or absolute). Report any missing files and stop.

4. **Output directory** — If `{FRAMEWORK_LOWER}/` does not exist in the current working directory, create it:
   ```bash
   mkdir -p {FRAMEWORK_LOWER}
   ```

---

### Step 4 — Substitute variables

Read `{resolved_path}/review/prompt.md` and replace every `[[VARIABLE]]` placeholder:

| Placeholder | Value |
| --- | --- |
| `[[FRAMEWORK]]` | `{FRAMEWORK}` |
| `[[FRAMEWORK_LOWER]]` | `{FRAMEWORK_LOWER}` |
| `[[FRAMEWORK_VERSION]]` | Ask user, or use `unknown` |
| `[[ORGANIZATION]]` | `{ORGANIZATION}` |
| `[[INDUSTRY]]` | `{INDUSTRY}` |
| `[[DOMAIN_FILE]]` | `{DOMAIN_FILE}` |
| `[[PRIOR_REVIEWS]]` | `{PRIOR_REVIEWS}` (or `none`) |
| `[[MANIFESTO_HASH]]` | `{MANIFESTO_HASH}` |
| `[[PRINCIPLE_NUMBER]]` | (only for `prompt-02-principle.md`; values 1..12 across the 12 parallel spawns) |
| `[[PRINCIPLE_NAME]]` | (only for `prompt-02-principle.md`; per-N short name verbatim from `prompt.md`'s weighting table) |

Do the same substitution for each sub-prompt file when spawning agents (read the file from `{resolved_path}/review/prompts/`, substitute, pass to Agent tool).

**Final scan:** After substitution, verify no `[[...]]` patterns remain. If any are found, report and stop.

---

### Step 5 — Execute wave orchestration

Follow the substituted `prompt.md`'s execution order exactly.

**Wave 1a** — spawn 19 agents using the `Agent` tool with the following batching strategy:
- **Concurrency cap:** Spawn agents in batches of up to 6–8 concurrent agents per batch (Claude's standard concurrent Agent tool capacity). Do not exceed 10 concurrent spawns in a single batch.
- **Batching protocol:** If 19 agents exceed the concurrency cap:
  - Batch 1: agents 01, 02-p1..p6 (7 agents)
  - Batch 2: agents 02-p7..p12, 03 (7 agents)
  - Batch 3: agents 04a, 04b, 05a, 07, 08a (5 agents)
- **Single-batch alternative:** If the Agent tool can sustain ≥ 19 concurrent spawns, issue all 19 calls in a single message for true parallelism.
- Record which batching strategy is used in the review run manifest.

For each batch, issue all Agent tool calls in the batch simultaneously. Wait for all agents in a batch to complete before spawning the next batch.

Agents in Wave 1a:
- Agent 01: `{resolved_path}/review/prompts/prompt-01-quick-overview.md`
- Agents 02-p1 through 02-p12 (12 parallel spawns): `{resolved_path}/review/prompts/prompt-02-principle.md` — for each principle N in 1..12, substitute `[[PRINCIPLE_NUMBER]]` = N and `[[PRINCIPLE_NAME]]` = the canonical short name from the weighting table in `prompt.md`:
  - P1 `Outcomes are the unit of work`
  - P2 `Specifications are living artifacts`
  - P3 `Architecture is defence-in-depth`
  - P4 `Right-size the swarm`
  - P5 `Autonomy is a tiered budget`
  - P6 `Knowledge and memory are infrastructure`
  - P7 `Context is engineered like code`
  - P8 `Evaluations are the contract`
  - P9 `Observability covers reasoning`
  - P10 `Assume emergence, engineer containment`
  - P11 `Optimize economics of intelligence`
  - P12 `Accountability requires intelligibility`
- Agent 03: `{resolved_path}/review/prompts/prompt-03-loop-dod.md`
- Agent 04a: `{resolved_path}/review/prompts/prompt-04a-adoption.md`
- Agent 04b: `{resolved_path}/review/prompts/prompt-04b-companion.md`
- Agent 05a: `{resolved_path}/review/prompts/prompt-05a-maturity.md`
- Agent 07: `{resolved_path}/review/prompts/prompt-07-guardrails-security.md` (Parts 12 + 13)
- Agent 08a: `{resolved_path}/review/prompts/prompt-08a-enterprise-domains.md` (Part 14 §14.1–§14.15 intermediate)

**Wait for Wave 1a:** Glob + Read (first/last 5 lines, ≥20 lines each) for all 19 Wave 1a output files. If any are missing after an agent completes, offer to re-run only that agent (for a missing principle, re-run only the affected `prompt-02-principle.md` instance with the matching `[[PRINCIPLE_NUMBER]]` / `[[PRINCIPLE_NAME]]`).

**Wave 1b** — spawn 3 agents simultaneously:
- Agent 04c: `{resolved_path}/review/prompts/prompt-04c-synthesis.md`
- Agent 05b: `{resolved_path}/review/prompts/prompt-05b-industry.md`
- Agent 08b: `{resolved_path}/review/prompts/prompt-08b-enterprise-synthesis.md` (lifts §14.1–§14.15 from 08a, adds §14.16–§14.19, writes the canonical Part 14 file)

**Wait for Wave 1b:** Verify `_review_04_adoption_companion.md`, `_review_05_maturity_industry.md`, and `_review_08_enterprise_guardrails.md` exist and are non-empty.

**Wave 2:** Spawn agent 06: `{resolved_path}/review/prompts/prompt-06-strengths-gaps.md`.

Wait for `_review_06_strengths_gaps.md`.

**Wave 3:** Spawn agent 09: `{resolved_path}/review/prompts/prompt-09-merge.md`.

Wait for `_manifesto_alignment_review_merged.md`.

---

### Step 6 — Report completion

```
✓ Review complete
  Framework:     {FRAMEWORK} ({FRAMEWORK_VERSION})
  Client:        {ORGANIZATION}
  Domain:        {DOMAIN_FILE}
  Manifesto:     arnaudgelas/agentic-engineering-manifesto@{MANIFESTO_HASH_SHORT}
  Output dir:    {FRAMEWORK_LOWER}/
  Files written: {N} files
  Merged review: {FRAMEWORK_LOWER}/{FRAMEWORK_LOWER}_manifesto_alignment_review_merged.md
```

---

## Run manifest

After Wave 3 completes successfully, write `{FRAMEWORK_LOWER}/review_run_manifest.json` containing:

```json
{
  "framework": "{FRAMEWORK}",
  "framework_lower": "{FRAMEWORK_LOWER}",
  "framework_version": "{FRAMEWORK_VERSION}",
  "organization": "{ORGANIZATION}",
  "industry": "{INDUSTRY}",
  "domain_file": "{DOMAIN_FILE}",
  "manifesto_hash": "{MANIFESTO_HASH}",
  "manifesto_hash_short": "{MANIFESTO_HASH_SHORT}",
  "review_date": "YYYY-MM-DD",
  "principle_mapping": {
    "P1": "Outcomes are the unit of work",
    "P2": "Specifications are living artifacts",
    "P3": "Architecture is defence-in-depth",
    "P4": "Right-size the swarm",
    "P5": "Autonomy is a tiered budget",
    "P6": "Knowledge and memory are infrastructure",
    "P7": "Context is engineered like code",
    "P8": "Evaluations are the contract",
    "P9": "Observability covers reasoning",
    "P10": "Assume emergence, engineer containment",
    "P11": "Optimize economics of intelligence",
    "P12": "Accountability requires intelligibility"
  },
  "wave_1a_batching_strategy": "single-batch | batch-1-7-agents | batch-2-7-agents | batch-3-5-agents",
  "total_output_files": 24,
  "merged_review_file": "{FRAMEWORK_LOWER}/{FRAMEWORK_LOWER}_manifesto_alignment_review_merged.md"
}
```

This manifest allows reproducibility and cross-reference verification across multiple reviews.

---

## Notes

- Output files go into `{FRAMEWORK_LOWER}/` relative to the working directory when the skill is invoked, not relative to the manifesto root.
- Every output file will contain `Manifesto: arnaudgelas/agentic-engineering-manifesto@{MANIFESTO_HASH}` in its header — this is enforced by a hard rule in `prompt.md`.
- To check review progress at any point, use `/review-status {FRAMEWORK_LOWER}`.
- To re-run a specific agent after a failure, invoke `/review` again — agents skip files that already exist and are non-empty (idempotent).
