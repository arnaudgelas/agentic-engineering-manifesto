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

**Wave 1a outputs (19 files):**

| File | Agent |
| --- | --- |
| `{FRAMEWORK_LOWER}_review_01_quick_overview.md` | 01 |
| `{FRAMEWORK_LOWER}_review_02_principle_p1.md` … `p12.md` (12 files) | 02-p1 … 02-p12 (parallel) |
| `{FRAMEWORK_LOWER}_review_03_loop_dod.md` | 03 |
| `{FRAMEWORK_LOWER}_review_04a_adoption.md` | 04a |
| `{FRAMEWORK_LOWER}_review_04b_companion.md` | 04b |
| `{FRAMEWORK_LOWER}_review_05a_maturity.md` | 05a |
| `{FRAMEWORK_LOWER}_review_07_guardrails_security_appendix.md` | 07 |
| `{FRAMEWORK_LOWER}_review_08a_domains.md` (intermediate; lifted by 08b) | 08a |

**Wave 1b outputs (3 files):**

| File | Agent |
| --- | --- |
| `{FRAMEWORK_LOWER}_review_04_adoption_companion.md` | 04c |
| `{FRAMEWORK_LOWER}_review_05_maturity_industry.md` | 05b |
| `{FRAMEWORK_LOWER}_review_08_enterprise_guardrails.md` (canonical Part 14) | 08b |

**Wave 2 output (1 file):**

| File | Agent |
| --- | --- |
| `{FRAMEWORK_LOWER}_review_06_strengths_gaps.md` | 06 |

**Wave 3 output (1 file):**

| File | Agent |
| --- | --- |
| `{FRAMEWORK_LOWER}_manifesto_alignment_review_merged.md` | 09 |

### Step 2 — Check each file

For each expected file: check existence and size.
- **Present and non-empty** (≥20 lines): ✓
- **Present but empty or tiny** (<20 lines): ⚠ (corrupted / incomplete)
- **Missing**: ✗

### Step 3 — Report status

Print a table of results, then a wave summary:

```
Review status: {FRAMEWORK_LOWER}/
Manifesto: arnaudgelas/agentic-engineering-manifesto@{MANIFESTO_HASH_SHORT}
  (resolve from the header of any existing output file, or run git in the manifesto path)

Wave 1a  [✓ / ✗]  (N/19 files present and non-empty)
  ✓ _review_01_quick_overview.md
  ✓ _review_02_principle_p1.md … p12.md (12/12)
  ✗ _review_03_loop_dod.md   ← MISSING
  ...

Wave 1b  [waiting / ✓ / ✗]
  ...

Wave 2   [waiting / ✓ / ✗]
Wave 3   [waiting / ✓ / ✗]

Suggested next action:
  Re-run agent 03 (missing _review_03_loop_dod.md), then proceed to Wave 1b.
```

If all 24 files are present and non-empty:
```
✓ Review complete — all 24 files present.
  Merged review: {FRAMEWORK_LOWER}_manifesto_alignment_review_merged.md
```

### Step 4 — Extract manifesto hash (optional)

If any output file exists, extract the manifesto provenance line from its header:
```
Manifesto: arnaudgelas/agentic-engineering-manifesto@{HASH}
```
Display it in the status report so the user knows which manifesto version produced these outputs.
