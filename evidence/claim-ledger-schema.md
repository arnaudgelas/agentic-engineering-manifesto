# Claim Ledger Schema

**Status:** Normative artefact for this repository's evidence machinery.
**Purpose:** Define the row schema for the claim-by-claim evidence ledger. Every citation,
statistic, or attribution in tracked `.md` files is meant to resolve to exactly one row here
once the ledger is populated.
**Data file:** `evidence/claim-ledger.jsonl` — one JSON object per line (JSON Lines), append-only.
**Standing rules this schema exists to enforce:**
- **No number enters the corpus without a ledger row.** Cited metadata, resolved metadata,
  canonical URL, retrieval timestamp, exact supporting quotation, verdict, and verifier identity
  must all be recorded.
- **The verifier is never the generator.** Any correction is checked by a pass (human or agent
  run) that did not produce it — this is AEM's own evidence-laundering control (see AEM
  principle P10).

---

## 1. Why JSON Lines, not CSV

Either CSV or JSONL would satisfy the row schema below. JSONL is used here because the `full_passage` field is
required to hold a complete retrieved passage — potentially multi-paragraph, with embedded
quotation marks, newlines, and punctuation — which is exactly the content CSV escaping corrupts
silently. JSON Lines keeps each row independently parseable (good for `grep`, `jq`, and line-based
diffs) while avoiding CSV's quoting failure mode. If a future task needs a flattened CSV view for
spreadsheet review, generate it mechanically from `claim-ledger.jsonl` — do not hand-maintain two
copies.

---

## 2. Field specification

| Field | Type | Required | Description |
|---|---|---|---|
| `claim_id` | string | always | Stable unique identifier, format `CL-NNNN` (zero-padded, monotonically assigned, never reused). |
| `claim_text` | string | always | The claim as it appears in the corpus — enough to identify what is being verified without opening the source file. A ledger row without it is not independently checkable; kept minimal by design. |
| `source_location` | string | always | `file:line` (or `file:line_start–line_end`) of the citing text in this repo, repo-root-relative. |
| `cited_metadata` | string | always | The source metadata as stated or implied in the corpus at the time of the claim (author, title, venue, identifier, version, date, and the specific figure/quote attributed to it). |
| `resolved_metadata` | string | always | The source metadata as independently confirmed by the verifier against the primary source: correct author(s), title, identifier, version, publication/revision date. |
| `canonical_url` | string (URL) | always | The canonical, version-pinned URL of the resolved source (e.g. `https://arxiv.org/abs/XXXX.XXXXXvN`, not a bare homepage). |
| `retrieval_timestamp` | string (ISO 8601, UTC) | always | When the verifier retrieved/re-retrieved the source for this row. |
| `archive_anchor` | string | always | An Internet Archive / Wayback Machine snapshot URL, or a SHA-256 hash of the retrieved primary-source artefact (PDF/HTML), recorded so the claim can be re-checked even if the live source changes or disappears. Record `PENDING: <reason>` rather than fabricating a hash — an honest gap is a `confidence` signal, not a blocker to filing the row. |
| `full_passage` | string | always | The **complete retrieved supporting passage**, not a single sentence (per review §3.1). Long enough that a reader can judge context, not just match keywords. Multi-paragraph is expected and fine in JSONL. |
| `verdict` | enum | always | One of the fixed vocabulary in §3. No free text. |
| `confidence` | enum | always | One of `high`, `medium`, `low` (see §4). Reflects the verifier's confidence in the *verdict*, not in the underlying source's findings. |
| `generator_identity` | string | always | Who or what produced/inserted the original claim into the corpus, to the best available knowledge (a named human, a named agent + session/run identifier, or `unknown (pre-existing, provenance not tracked)`). |
| `verifier_identity` | string | always | Who resolved this row. Must not be the same identity as `generator_identity` for any row whose verdict is `clean` or `corrected` — a self-verified row is not evidence. |
| `notes` | string | optional | Caveats, uncertainties, or partial-verification limitations that don't fit another field (e.g. "retrieved via summarizing fetch tool, not a raw PDF read — full-text cross-check still pending"). |

---

## 3. `verdict` — fixed vocabulary

Exactly one of:

- **`clean`** — the claim as it stands in the corpus is accurate against the resolved primary
  source; no corpus edit required.
- **`corrected`** — the claim required an edit (metadata, number, framing, attribution) and the
  edit has been made; `cited_metadata` and `resolved_metadata` will differ, and the row documents
  what changed.
- **`withdrawn`** — the claim could not be sourced or re-sourced and has been removed from the
  corpus rather than repaired (withdrawal never blocks on verification; replacement always
  does).
- **`unverifiable`** — the verifier could not reach a resolved position (source inaccessible,
  ambiguous, or contested) and the claim remains flagged, pending further work. Not a permanent
  resting state — every `unverifiable` row needs a named next step or owner.

No other values. A row that doesn't fit one of these cleanly is a sign the claim needs to be split
into more than one row (e.g. one metadata claim + one quantitative claim from the same citation).

---

## 4. `confidence` — fixed vocabulary

- **`high`** — resolved directly against the primary source's raw text (PDF/HTML actually read,
  not summarized), version-pinned, no ambiguity.
- **`medium`** — resolved against the primary source via an intermediary (e.g. an AI-summarizing
  fetch tool) with no independent raw-text cross-check yet; substance corroborated but not
  word-for-word confirmed.
- **`low`** — resolved from a secondary source, an inference, or a partial/ambiguous primary-source
  match; flag for re-verification.

---

## 5. Worked example row

Produced while drafting this schema, by spot-checking the SWE-CI citation at
`README.md:26–28` — the same citation family flagged for correction elsewhere in the corpus.
This row happens to resolve as `clean`: the `README.md` text is already
version-pinned (`v1`), states a sample-level result only, and asserts no per-iteration rate and no
inflation factor — the overclaim pattern present in other files is not present here.
That is a genuine finding, not a placeholder, but `confidence` is capped at `medium` because
resolution used an AI-summarizing fetch tool against the arXiv abstract/HTML pages rather than a
raw read of the PDF — see `notes`.

Rendered as a table for readability (the actual stored row is the JSONL line in
`evidence/claim-ledger.jsonl`):

| Field | Value |
|---|---|
| `claim_id` | `CL-0001` |
| `claim_text` | "Early empirical evidence, including the SWE-CI benchmark, where most of 18 evaluated models achieved zero-regression rates below 0.25 across 100 long-horizon maintenance tasks (arXiv:2603.03823v1), confirms that agentic systems require purpose-built engineering discipline..." |
| `source_location` | `README.md:26–28` |
| `cited_metadata` | SWE-CI benchmark; 18 evaluated models; zero-regression rate below 0.25 for most models; 100 long-horizon maintenance tasks; arXiv:2603.03823v1 |
| `resolved_metadata` | Jialong Chen, Xander Xu, Hu Wei, Chuan Chen, Bing Zhao. "SWE-CI: Evaluating Agent Capabilities in Maintaining Codebases via Continuous Integration." arXiv:2603.03823, v1 submitted 2026-03-04 (revised through v4, 2026-04-01 — v1 is the version this claim is pinned to and matches). |
| `canonical_url` | `https://arxiv.org/abs/2603.03823v1` |
| `retrieval_timestamp` | `2026-08-11T00:00:00Z` |
| `archive_anchor` | `PENDING: no Wayback Machine snapshot taken and no PDF hash computed during this pass; abstract/HTML page fetched live via tool, not archived` |
| `full_passage` | "The benchmark comprises 100 tasks, each deriving from a real-world code repository with a development history spanning an average of 233 days and 71 consecutive commits. ... Our extensive evaluation of 18 models from 8 different providers reveals a consistent pattern: most models achieve a zero-regression rate below 0.25, with only two models in the Claude-opus series exceeding 0.5." |
| `verdict` | `clean` |
| `confidence` | `medium` |
| `generator_identity` | `unknown (pre-existing corpus text, provenance not tracked)` |
| `verifier_identity` | `Claude (Sonnet 5), AEM evidence-machinery session, 2026-08-11` |
| `notes` | "Retrieved via an AI-summarizing web-fetch tool against arxiv.org abstract/HTML pages, not a direct read of the PDF — substance corroborated (matches review §3.5/§4.4's independent v1 quote of the same figures) but not yet word-for-word cross-checked against raw source text, hence `medium` not `high`. This row does not itself close out the other instances of this citation (five other files carry the same citation and were not checked here); it demonstrates the schema and shows `README.md`'s instance is already accurate (sample-level only, version-pinned, no per-iteration or inflation claim)." |

---

## 6. Row-authoring procedure (summary)

Full procedure to be documented in `CONTRIBUTING.md`. In brief: a claim gets a ledger
row only after a pass that (a) did not originate the claim, (b) retrieved the primary source at a
pinned version, (c) recorded the full supporting passage — not a keyword match — and (d) selected
a verdict from the fixed vocabulary in §3. Absence claims and fabrication claims additionally
require full-text search across every extant version of the source.
