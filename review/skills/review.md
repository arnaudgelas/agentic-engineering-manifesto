# /review — Agentic Engineering Manifesto Framework Review

Run a complete manifesto alignment review of a framework across 11 specialised agents in four waves.

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
{resolved_path}/manifesto.md
{resolved_path}/manifesto-principles.md
{resolved_path}/manifesto-done.md
{resolved_path}/glossary.md
{resolved_path}/adoption/path.md
{resolved_path}/companion/frameworks.md
{resolved_path}/review/prompt.md
{resolved_path}/review/prompts/prompt-01-quick-overview.md
```

If any are missing, report the error and stop.

**Tracked-files-only.** Every source file the review system reads MUST be tracked by git on the resolved manifesto branch. Files that appear only in the working tree (untracked, `??` in `git status`) are NOT in scope, even if they exist on disk.

**Note:** The review system also reads (when relevant to the agent's task) AEM-relevant content from `{resolved_path}/beyond-agile/`, `{resolved_path}/governance/`, `{resolved_path}/integration/`, `{resolved_path}/regulatory/`, and `{resolved_path}/operational-templates/`. These directories are not strictly required to exist — agents skip cross-references if a directory is absent — but their presence enables fuller coverage. The following are explicitly out of scope and are not read by any agent: `asdlc/`, `aplc/`, `agentic-sdlc-handbook/`, `intelligence-governance-manifesto/`, `agentic-enterprise-manifesto/`, `agentic-enterprise.{md,html}`, `agentic-governance-stack.{md,html}`, `manifesto-evolution-plan.{md,html}`, `phase-assessment-checklist.{md,html}`, `aplc-plan*`, `asdlc-plan*`, and `igm-aent-coherence-review*`.

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

Do the same substitution for each sub-prompt file when spawning agents (read the file from `{resolved_path}/review/prompts/`, substitute, pass to Agent tool).

**Final scan:** After substitution, verify no `[[...]]` patterns remain. If any are found, report and stop.

---

### Step 5 — Execute wave orchestration

Follow the substituted `prompt.md`'s execution order exactly.

**Wave 1a** — spawn simultaneously using the `Agent` tool:
- Agent 01: `{resolved_path}/review/prompts/prompt-01-quick-overview.md`
- Agent 02: `{resolved_path}/review/prompts/prompt-02-principles.md` (reads `prompt-02-principle-template.md`)
- Agent 03: `{resolved_path}/review/prompts/prompt-03-loop-dod.md`
- Agent 04a: `{resolved_path}/review/prompts/prompt-04a-adoption.md`
- Agent 04b: `{resolved_path}/review/prompts/prompt-04b-companion.md`
- Agent 05a: `{resolved_path}/review/prompts/prompt-05a-maturity.md`
- Agent 07: `{resolved_path}/review/prompts/prompt-07-guardrails-security.md`

**Wait for Wave 1a:** Glob + Read (first/last 5 lines, ≥20 lines each) for all 18 Wave 1a output files. If any are missing after an agent completes, offer to re-run only that agent.

**Wave 1b** — spawn simultaneously:
- Agent 04c: `{resolved_path}/review/prompts/prompt-04c-synthesis.md`
- Agent 05b: `{resolved_path}/review/prompts/prompt-05b-industry.md`

**Wait for Wave 1b:** Verify `_review_04_adoption_companion.md` and `_review_05_maturity_industry.md` exist and are non-empty.

**Wave 2:** Spawn agent 06: `{resolved_path}/review/prompts/prompt-06-strengths-gaps.md`.

Wait for `_review_06_strengths_gaps.md`.

**Wave 3:** Spawn agent 08: `{resolved_path}/review/prompts/prompt-08-merge.md`.

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

## Notes

- Output files go into `{FRAMEWORK_LOWER}/` relative to the working directory when the skill is invoked, not relative to the manifesto root.
- Every output file will contain `Manifesto: arnaudgelas/agentic-engineering-manifesto@{MANIFESTO_HASH}` in its header — this is enforced by a hard rule in `prompt.md`.
- To check review progress at any point, use `/review-status {FRAMEWORK_LOWER}`.
- To re-run a specific agent after a failure, invoke `/review` again — agents skip files that already exist and are non-empty (idempotent).
