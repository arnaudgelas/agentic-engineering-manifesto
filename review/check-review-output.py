#!/usr/bin/env python3
"""Mechanical checks on a completed review's OUTPUT files.

Scope, deliberately narrow: this reads the generated review only. It never reads
prompt.md or any sub-prompt, and it asserts nothing about them. Validating prose
against prose is the failure mode that produced ~800 lines of green-but-useless
machinery earlier in this project; validating artefacts is different work.

It checks what an agent grading its own output demonstrably cannot: arithmetic,
exact string requirements, and cross-file consistency. The provenance check
exists because the requirement was untestable across two full runs while every
agent self-reported compliance.

Usage:  python3 review/check-review-output.py <output_dir> [--hash HASH]
Exit 0 = clean, 1 = findings.
"""
import json
import re
import sys
from pathlib import Path

def _weights() -> dict[int, int]:
    """Source the principle weights from prompt.md's canonical table.

    This reads prompt.md, which the file header otherwise forbids — the ban is on
    CHECKING prose (validating descriptions against each other, the failure mode
    that produced a green validator over a non-runnable patch). Sourcing a
    constant from its single source is the opposite: hard-coding the weights here
    would mean a change to the canonical table silently yields a wrong composite,
    which is precisely the defect this script exists to catch. If the table
    cannot be parsed this raises rather than falling back to a stale copy.
    """
    md = (Path(__file__).parent / "prompt.md").read_text(encoding="utf-8")
    # anchor at line start: "### Score weighting scheme" inside the Universal
    # Prepend Block template contains this heading as a substring and holds a
    # placeholder, not the table.
    block = md.split("\n## Score weighting scheme", 1)[1].split("\n## ", 1)[0]
    w = {int(n): int(p) for n, p in re.findall(r"\|\s*P(\d+)\b[^|]*\|\s*(\d+)%", block)}
    if sorted(w) != list(range(1, 13)) or sum(w.values()) != 100:
        raise SystemExit(f"cannot parse the weighting table in prompt.md (got {w}) — "
                         "fix the table or this script; do not hard-code weights")
    return w


WEIGHTS = _weights()
MARKER = "<!-- SELF-CHECK: PASSED -->"
BANNED = re.compile(r"\b(consider|could potentially|perhaps|use judge?ment)\b", re.I)
OUT_OF_SCOPE = re.compile(r"\bASDLC\b|\bAPLC\b|\bAEnt-M\b|intelligence-governance-manifesto|"
                          r"agentic-governance-stack|manifesto-evolution-plan|phase-assessment-checklist|"
                          r"agentic-sdlc-handbook|aplc-plan|asdlc-plan|igm-aent-coherence-review")
PLACEHOLDER = re.compile(r"\[\[[A-Z][A-Z0-9_]*\]\]")

# Which generated file each agent writes, and which generated files it reads.
# This lived in dependencies.json until the JSON's only consumer turned out to be
# this script, while the same edges were also stated in prose in prompt.md and the
# skill — the two-copies problem the file's own drift note admitted to. Facts about
# filenames belong next to the code that resolves filenames.
SUFFIX = {
    "01": "_review_01_quick_overview.md",
    "02-pN": "_review_02_principle_p{N}.md",
    "03a": "_review_03a_loop_upstream.md",
    "03b": "_review_03b_loop_build.md",
    "03c": "_review_03c_loop_runtime.md",
    "03d": "_review_03d_loop_integrity.md",
    "03e": "_review_03e_dod.md",
    "04a": "_review_04a_adoption.md",
    "04b": "_review_04b_companion.md",
    "04c": "_review_04c_synthesis.md",
    "05a": "_review_05a_maturity.md",
    "05b": "_review_05b_industry.md",
    "06": "_review_06_strengths_gaps.md",
    "07": "_review_07_guardrails_security_appendix.md",
    "08a": "_review_08a_domains.md",
    "08b": "_review_08b_enterprise_synthesis.md",
    "09": "_manifesto_alignment_review_merged.md",
}
_P = [f"02-p{i}" for i in range(1, 13)]
_WAVE1 = ["01", *_P, "03a", "03b", "03c", "03d", "03e",
          "04a", "04b", "04c", "05a", "05b", "07", "08a", "08b"]
READS = {
    "03e": ["05a"], "04c": ["04a", "04b"], "05b": ["05a"], "08b": ["08a"],
    "06": _WAVE1,
    "09": [*_WAVE1, "06"],
}


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if not args:
        print(__doc__)
        return 1
    d = Path(args[0])
    want_hash = None
    if "--hash" in sys.argv:
        want_hash = sys.argv[sys.argv.index("--hash") + 1]
    else:  # take it from the manifest if present
        m = d / "review_run_manifest.json"
        if m.exists():
            try:
                want_hash = json.loads(m.read_text()).get("manifest_hash") or \
                            json.loads(m.read_text()).get("manifesto_hash")
            except Exception:  # noqa: BLE001
                pass

    files = sorted(f for f in d.glob("*.md"))
    if not files:
        print(f"no .md files in {d}")
        return 1
    findings: list[str] = []
    # Pre-marker runs: the completion-marker rule postdates them. prompt.md's
    # migration note says judge those by the other rules, not by a missing
    # marker — otherwise every file in an older review reads as a failure.
    legacy = not any(MARKER in f.read_text(encoding="utf-8") for f in files)
    if legacy:
        print("  note: no completion markers anywhere — treating as a pre-marker run "
              "and skipping the attestation check (prompt.md migration note)")

    # --- per-file mechanical checks -------------------------------------
    for f in files:
        text = f.read_text(encoding="utf-8")
        n = f.name

        if want_hash and f"arnaudgelas/agentic-engineering-manifesto@{want_hash}" not in text:
            findings.append(f"{n}: provenance substring for @{want_hash[:7]} absent")

        markers = [ln for ln in text.splitlines() if ln.strip().startswith("<!-- SELF-CHECK: PASSED")]
        if legacy:
            pass
        elif len(markers) > 1:
            findings.append(f"{n}: {len(markers)} completion markers — exactly one allowed "
                            "(a lifted marker from an upstream file is the usual cause)")
        elif not markers:
            findings.append(f"{n}: no completion marker — output was never attested")
        elif text.rstrip().splitlines()[-1].strip() != MARKER:
            findings.append(f"{n}: completion marker is not the final line")

        for tok in set(PLACEHOLDER.findall(text)):
            findings.append(f"{n}: unsubstituted placeholder {tok}")

        for mt in set(OUT_OF_SCOPE.findall(text)):
            # manifesto-done.md's own handoff boundary is a permitted quotation
            if "Handoff to the Release Layer" in text or "Loop-Complete" in text:
                continue
            findings.append(f"{n}: out-of-scope corpus token {mt!r}")

        prose = [ln for ln in text.splitlines()
                 if not ln.lstrip().startswith((">", "|", "`")) and '"' not in ln and "`" not in ln]
        for hit in {m.group(0).lower() for ln in prose for m in [BANNED.search(ln)] if m}:
            findings.append(f"{n}: banned soft-language token {hit!r} in unquoted prose")

    # --- cross-file arithmetic ------------------------------------------
    scores: dict[int, int] = {}
    for i in range(1, 13):
        pf = d / f"{d.name.replace('_a4', '')}_review_02_principle_p{i}.md"
        if not pf.exists():
            cands = list(d.glob(f"*_review_02_principle_p{i}.md"))
            pf = cands[0] if cands else None
        if pf and pf.exists():
            m = re.search(r"\*\*(\d+)/100\*\*", pf.read_text().splitlines()[0])
            if m:
                scores[i] = int(m.group(1))

    if len(scores) == 12:
        exact = sum(scores[p] * WEIGHTS[p] for p in WEIGHTS) / 100
        composite = round(exact, 1)
        merged = list(d.glob("*_manifesto_alignment_review_merged.md"))
        if merged:
            mt = merged[0].read_text()
            # Only the authoritative statements of the composite. Agent 01 no
            # longer emits one at all (it writes `—`), so there is a single
            # composite in the document; this pattern set stays narrow anyway,
            # because a loose one would match any decimal in the prose.
            claimed = {float(x) for x in
                       re.findall(r"sum\s*=\s*[\d.]+\s*(?:→|->)\s*(\d{1,3}\.\d)", mt)
                       + re.findall(r"\|\s*\*\*Total\*\*.*?\*\*(\d{1,3}\.\d)\*\*", mt)
                       + re.findall(r"Overall score:\s*(\d{1,3}\.\d)\s*/\s*100", mt)}
            if claimed and composite not in claimed:
                findings.append(f"merged review: composite {sorted(claimed)} does not match "
                                f"Σ(score×weight)={exact:.2f} → {composite} recomputed from the 12 principle files")
            rounded_sum = round(sum(round(scores[p] * WEIGHTS[p] / 100, 1) for p in WEIGHTS), 1)
            if rounded_sum in claimed and composite not in claimed:
                findings.append("merged review: composite appears to round each weighted row "
                                f"before summing ({rounded_sum}); the rule rounds the sum once ({composite})")
        print(f"  composite recomputed from 12 principle files: {exact:.2f} → {composite}")
    else:
        print(f"  note: {len(scores)}/12 principle files found — composite not recomputed")

    # --- staleness: a reader older than something it read -----------------
    sfx, reads = SUFFIX, dict(READS)
    if sfx:

        def path_for(a: str):
            s = sfx.get(a) or (sfx["02-pN"].replace("{N}", a.split("p")[-1]) if a.startswith("02-p") else None)
            if not s:
                return None
            hits = list(d.glob(f"*{s}"))
            return hits[0] if hits else None

        # mtime ordering is only meaningful if the files were actually written
        # at different times. git checkout, cp -R and archive extraction all
        # rewrite mtimes wholesale, which makes every edge look stale or fresh
        # at random. Detect that and skip rather than emit invented findings.
        stamps = [f.stat().st_mtime for f in files]
        if max(stamps) - min(stamps) < 5:
            print("  staleness: skipped — all files share one mtime, so ordering "
                  "carries no information (restored from git, copied, or extracted)")
            reads = {}

        for agent, inputs in reads.items():
            out = path_for(agent)
            if not out or not inputs:
                continue
            for src in inputs:
                sp = path_for(src)
                if sp and sp.stat().st_mtime > out.stat().st_mtime:
                    findings.append(f"{out.name}: stale — older than {sp.name}, which it reads "
                                    f"(regenerate {agent} after {src})")
        print(f"  staleness: checked {sum(len(v) for v in reads.values())} input edges")

    print(f"  files checked: {len(files)}")
    if findings:
        print(f"\nFAIL — {len(findings)} finding(s):")
        for x in findings:
            print(f"  - {x}")
        return 1
    print("\nPASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
