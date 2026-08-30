# /review-status — Check Manifesto Review Progress

Show which output files exist, which are missing, and what wave a review is on.

## Usage

```
/review-status FRAMEWORK_LOWER
```

## Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `FRAMEWORK_LOWER` | Yes | Lowercase underscore slug of the framework (e.g., `abcd`) |

---

## Execution

### Step 1 — Locate output files

Check for the following files in `{FRAMEWORK_LOWER}/` relative to the current working directory.

**Wave 1a outputs (22 files):**

| File | Agent |
| --- | --- |
| `{FRAMEWORK_LOWER}_review_01_quick_overview.md` | 01 |
| `{FRAMEWORK_LOWER}_review_02_principle_p1.md` … `p12.md` (12 files) | 02-p1 … 02-p12 (parallel) |
| `{FRAMEWORK_LOWER}_review_03a_loop_upstream.md` | 03a |
| `{FRAMEWORK_LOWER}_review_03b_loop_build.md` | 03b |
| `{FRAMEWORK_LOWER}_review_03c_loop_runtime.md` | 03c |
| `{FRAMEWORK_LOWER}_review_03d_loop_integrity.md` | 03d |
| `{FRAMEWORK_LOWER}_review_04a_adoption.md` | 04a |
| `{FRAMEWORK_LOWER}_review_04b_companion.md` | 04b |
| `{FRAMEWORK_LOWER}_review_05a_maturity.md` | 05a |
| `{FRAMEWORK_LOWER}_review_07_guardrails_security_appendix.md` | 07 |
| `{FRAMEWORK_LOWER}_review_08a_domains.md` (§14.1–§14.15; merged into Part 14 by 09) | 08a |

**Wave 1b outputs (4 files):**

| File | Agent |
| --- | --- |
| `{FRAMEWORK_LOWER}_review_03e_dod.md` (Part 4; phase-calibrated, reads 05a) | 03e |
| `{FRAMEWORK_LOWER}_review_04c_synthesis.md` | 04c |
| `{FRAMEWORK_LOWER}_review_05b_industry.md` | 05b |
| `{FRAMEWORK_LOWER}_review_08b_enterprise_synthesis.md` (§14.16–§14.19) | 08b |

**Wave 2 output (1 file):**

| File | Agent |
| --- | --- |
| `{FRAMEWORK_LOWER}_review_06_strengths_gaps.md` | 06 |

**Wave 3 output (1 file):**

| File | Agent |
| --- | --- |
| `{FRAMEWORK_LOWER}_manifesto_alignment_review_merged.md` | 09 |

### Step 2 — Check each file

For each expected file, run `tail -n 2 <file> | grep -q '<!-- SELF-CHECK: PASSED -->'`.
- **Present and completion check passes**: ✓
- **Present but completion check fails**: ⚠ (incomplete — the agent died before its self-check, or never ran it)
- **Missing**: ✗

### Step 3 — Report status

Print a table of results, then a wave summary:

```
Review status: {FRAMEWORK_LOWER}/
Manifesto: arnaudgelas/agentic-engineering-manifesto@{MANIFESTO_HASH_SHORT}
  (resolve from the header of any existing output file, or run git in the manifesto path)

Wave 1a  [✓ / ✗]  (N/22 files passing the completion check)
  ✓ _review_01_quick_overview.md
  ✓ _review_02_principle_p1.md … p12.md (12/12)
  ✗ _review_03d_loop_integrity.md   ← MISSING
  ...

Wave 1b  [waiting / ✓ / ✗]
  ...

Wave 2   [waiting / ✓ / ✗]
Wave 3   [waiting / ✓ / ✗]

Suggested next action:
  Re-run agent 03d (missing _review_03d_loop_integrity.md), then proceed to Wave 1b.
```

If all 28 files pass the completion check, **that alone is still not completion.** Before reporting, check two things in the merged review and the run manifest:

1. `## Source Integrity` — does it contain a `**Maturity-versus-DoD inconsistency**` entry (agent 09 check 4c)?
2. `review_run_manifest.json` — is `maturity_verdict_contested` `true`?

If either holds, report the contested form; `/review` and `/review-status` must never disagree about whether a run completed cleanly.

```
✓ Review complete — all 28 files present.
  Merged review: {FRAMEWORK_LOWER}_manifesto_alignment_review_merged.md
```

Contested form:
```
⚠ Review complete — maturity verdict contested.
  All 28 files present, but Part 4's phase-calibrated DoD audit contradicts
  the Phase {N} verdict in Part 8. Failing conditions: {list}.
  See `## Source Integrity` in the merged review, and the resolution
  procedure in the /review skill, Step 6.
```

### Step 4 — Extract manifesto hash (optional)

If any output file exists, extract the manifesto provenance line from its header:
```
Manifesto: arnaudgelas/agentic-engineering-manifesto@{HASH}
```
Display it in the status report so the user knows which manifesto version produced these outputs.
