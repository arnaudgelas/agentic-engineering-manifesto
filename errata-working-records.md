# Errata working records

Process records from the passes that made the corrections in
[errata.md](errata.md): checker runs and their counts, HTML rebuilds, git
tracking state, and the search controls used. They show how the work was
checked. They do not change any correction, and a reader who only wants to
know what changed can ignore this file.

These bullets were moved here unchanged from `errata.md` on 2026-11-09.
Every count, line number, commit and git state in them is as it stood on
the day of the pass, not today.

## 2026-09-06 — the EU GMP Annex 11 re-citation pass: the companion fix in `aplc`

<a id='wr-2026-09-06-a0'></a>

Records for [this entry](errata.md#e-2026-09-06-01).

- **The register's `aplc` extension of `D-62` was verified rather than assumed,
  and it is complete.** `aplc/agent/agent-annex-iv-mapping.md:28` cited **Art. 48**
  (CE marking) for the EU declaration of conformity; the working tree there now
  cites **Art. 47**, with 47(2)/Annex V for the content and 47(1) for the
  provider's 10-year duty. Checked at the hashed AI Act primary
  (`a0f437e8966746b88b15d35bc9e7a9dbe930e2938a941548524a565121c7929b`), read in
  sequence: **Art. 47 is *EU declaration of conformity*, Art. 48 is *CE
  marking***, 48(2) being digital CE marking, and no paragraph of Art. 48 touches
  the declaration. **Enumerated in both trees rather than taken from the
  register**: `aplc` `HEAD` (`821e242`) carries **2** `Art. 47`/`Art. 48` lines
  in 2 files — the one wrong site and a **Solvency II Art. 48** (*Actuarial
  function*) correctly left alone; the working tree carries **14** in 5 files,
  every one of them Art. 47 and correct. **The register's own figure of "25
  occurrences in 8 files" is reproducible against neither tree**, and it does not
  say which tree it addressed.

## 2026-09-06 — the EU GMP Annex 11 re-citation pass

<a id='wr-2026-09-06-a'></a>

Records for [this entry](errata.md#e-2026-09-06-01).

- **Gates, run 06.09.2026 20:19 CEST from the corpus root.**
  `tools/register-crossref.sh` **exit 0, four consecutive runs, byte-identical**
  (md5 `14bf051ba840a746a583484a7d9313fe`), defects **73**, tasks **55**.
  `tools/link-check.sh` **broken 4 / total 1051 across 5 repos**, against **1046**
  before this pass. **The movement was named before the run and it landed
  exactly**: **+5**, being the four `../errata.md` links added by the `D-62` edit
  in `domains/pharma.md` and one added in `aplc`. **Broken did not move and was
  not expected to** — no link was removed and every added link resolves.
- **Rebuild.** This edit makes the rendered HTML stale for the **thirteenth**
  time. **No `.html` was hand-patched.** A thirteenth rebuild must carry
  `domains/pharma.html` in this repository. `aplc` contains **no `.html` at
  all**, so its edit needs no rebuild.
- **Tracking (`D-73`).** This file is tracked, so
  `git -C agentic-engineering-manifesto diff` **does** show this entry.
  **`agentic-engineering-manifesto` last committed 02.09.2026 at `c1d0d19`** and
  this pass committed nothing, so **none of the four `D-62` repairs above reaches
  a reader holding `HEAD` of this repository**, and all four remain live there at
  `:124`, `:209`, `:311` and `:423`. The checkout is on branch **`alignment`**,
  which `git rev-parse main alignment origin/main` reports identical to `main` at
  `c1d0d19`. **`aplc/errata.md` is no longer untracked** — it is **staged and
  uncommitted** (`git -C aplc status --short errata.md` → `A `, 20:17 CEST) — so
  the register's `D-73` and `D-57` statements about it are stale as of today;
  `aplc` itself last committed **02.05.2026**. **No struck-string row is added
  for any of this**, per the `D-63` precedent: a row green in a working tree and
  red at `HEAD` fails the next checkout.

## 2026-09-06 — the `D-57 / D-60` pass

<a id='wr-2026-09-06-b'></a>

Records for [this entry](errata.md#e-2026-09-06-25).

- **Rebuild.** This edit makes the rendered HTML stale for the **eleventh** time.
  No `.html` was hand-patched. An eleventh rebuild must carry: the two corrected
  Art. 30 spans and their correction note in `regulatory/foundation-model-third-party-register.html`,
  and, if the site build inlines them, the register's rendered twins in
  `index.html`. Nothing else in this repo was edited by this pass.
- **Tracking, corrected against the brief.** The brief for this pass stated that
  all three repositories' `errata.md` are untracked under `D-57`. That holds for
  `aplc/errata.md` and `asdlc/errata.md` (`git -C <repo> status --porcelain
  errata.md` -> `?? errata.md` for both), but **not for this file**: AEM's
  `errata.md` is tracked (`MM`, and `git -C agentic-engineering-manifesto
  ls-files --error-unmatch errata.md` succeeds), so
  `git -C agentic-engineering-manifesto diff` **does** show this entry. Measured,
  not assumed.

## 2026-09-06 — the `D-57 / D-61` pass

<a id='wr-2026-09-06-c'></a>

Records for [this entry](errata.md#e-2026-09-06-26).

- **Fresh long negative control, proved against a positive.** A newly generated
  two-word needle returned **0** whole and **0** for each half, line-scoped and
  wrap-safe, in both repositories and on the six edited lines. It is a real
  absence and not a dead scanner: positive controls on the **identical**
  commands returned **203** annex-word hits over **113** files scanned here and
  **317** over **30** in `aplc`, and the inserted instrument name returned
  exactly **1** on each edited line after the edit. **None of the four needles
  this corpus has already burned in errata entries was used** — recording a
  control in errata retires it, and those four are recorded.
- **Prefix-safe controls, whole tokens, because a digit is not a word.** On the
  changelog line, a seven-only pattern with a following-digit exclusion matched
  **0** while the seven-two pattern matched **1**, and a digit-width swap to a
  three-digit number matched **0**. On the `aplc` annex line, the single-numeral
  annex pattern with a following-numeral exclusion matched **0** while the
  four-numeral pattern matched **1**, and both a longer-numeral variant and the
  three-numeral variant matched **0**. The short form does not match the long
  form under the controls used, in either direction.
- **Movement, isolated and named.** Across both repositories: triples
  **1882 → 1883**; `GDPR` **234 → 228**; `EU AI Act` **1146 → 1153**;
  unattributed **460 → 459**; no-annex refusals **6 → 5**. The `--dump-triples`
  diff against the frozen baseline is **exactly** the six moves plus the one
  annex citation the bound had refused and now no longer must — nothing else
  moved, in either direction. **Everything else is unchanged line for line:**
  §2 pairs **73**, §2 groups **96**, truly new **0**, sub-clause OK **564** /
  fabricated **1** / no structure data **27**, §3c rows **158** (live 154, VOID
  0, REGRESSED 0, DUPLICATE KEYS 3), §6 verbatim OK **127**,
  `--known-only` exit **0**, `./tools/register-crossref.sh` exit **0**,
  `./tools/link-check.sh` **broken 4 / total 1043 across 5 repos**,
  `aplc/tools/check_overview_counts.py` exit **0**. Full run exit **1**, twice,
  **byte-identical**.
- **Rebuild.** This edit makes the rendered HTML stale for the **twelfth** time.
  **No `.html` was hand-patched.** A twelfth rebuild must carry exactly four
  files in this repository — `governance/_swarm-changelog.html`,
  `regulatory/eu-ai-act-addendum.html`, `regulatory/nist-ai-rmf-crosswalk.html`
  and `regulatory/iso-42001-crosswalk.html`. **`index.html` is NOT stale from
  this pass**, and that was measured rather than assumed: all four edited
  strings return **0** in it against a positive control returning **1** and a
  negative control returning **0**, so the file was actually read. `aplc`
  contains **no `.html` at all**, so its two edits need no rebuild. Nothing else
  in either repository was edited by this pass.
- **Tracking.** This file is tracked, so
  `git -C agentic-engineering-manifesto diff` **does** show this entry — unlike
  `aplc/errata.md`, which is untracked under `D-57`, is not walked by the
  checker's `git ls-files` at all, and whose companion entry `git -C aplc diff`
  will not show.

---

[← Back to errata](errata.md)
