# Contributing to The Agentic Engineering Manifesto

Thank you for your interest in contributing. This manifesto is a living specification — it improves through evidence, not consensus alone. Contributions that sharpen the principles, add real-world grounding, or fix genuine errors are welcome.

## What We Look For

**Valued contributions:**

- **Worked patterns** — Real-world examples (anonymized if needed) that demonstrate a principle in action or reveal a gap. These carry the most weight.
- **Failure analyses** — Cases where applying a principle failed or produced unintended consequences. The manifesto has a "Failure Modes of This Manifesto" section for a reason.
- **Clarity improvements** — Rewording that makes a principle more precise without changing its meaning. Ambiguity is a bug.
- **Corrections** — Factual errors, broken logic, or internal contradictions between principles.
- **Translations** — Making the manifesto accessible to non-English-speaking communities.

**Out of scope:**

- Adding principles beyond the twelve without strong evidence that the existing set is insufficient.
- Vendor-specific tooling recommendations. The manifesto is deliberately vendor-neutral.
- Stylistic rewrites that change tone without improving precision.
- Promotional content or links to commercial products.

## How to Contribute

### Issues

Open an issue before submitting large changes. Describe:

1. **Which principle or section** is affected.
2. **What the problem is** — ambiguity, gap, error, or missing pattern.
3. **Evidence** — link to a real scenario, failure case, or published work that supports the change.

For typos and small clarity fixes, a pull request without a prior issue is fine.

### Pull Requests

1. Fork the repository and create a branch from `main`.
2. Make your changes in the relevant source file (e.g., `manifesto-principles.md` for principle text, `companion-*.md` for companion guidance, `adoption-*.md` for adoption content) and update `README.md` if the change affects the summary.
3. Keep changes focused. One concern per pull request.
4. In your PR description, explain:
   - **What** changed and **why**.
   - **Evidence** supporting the change (experience, incident, published reference).
5. Expect discussion. Manifesto changes affect how people build systems — review will be thorough.

### Style

- Write in plain, direct English. Avoid jargon that does not earn its keep.
- Prefer concrete over abstract. If a sentence could apply to any methodology, it is too vague.
- Minimum bars must be testable: a team should be able to read a minimum bar and determine whether they meet it.
- Keep the document self-contained. External links for further reading are fine; external dependencies for comprehension are not.

## Citation Verification Procedure

Every citation, numeric claim, or absence/fabrication claim ("no source supports X") added to a tracked `.md` file must be independently verified before it ships. This procedure is mandatory for all pull requests that add or modify a citation, and it is a required step on the release checklist wherever one exists for this repository.

**The generator-verifier split.** The person or process that produced a citation (wrote the claim, drafted the reference, or generated it with an LLM) may never be the one who resolves and verifies it. A second, independent pass — a different contributor, reviewer, or verification agent that did not generate the original text — must re-resolve the citation against the primary source before it is accepted. A self-check by the author does not satisfy this requirement.

**What the verification pass must record.** The verifier resolves the citation against its canonical source and records, at minimum:

- the source `file:line` making the claim,
- the cited metadata (title, author, date, URL, etc.) as originally stated,
- the resolved metadata as confirmed against the primary source,
- the canonical URL,
- a retrieval timestamp,
- an archive or hash anchor where feasible,
- the **full retrieved passage** supporting or contradicting the claim — not a single sentence,
- a verdict from a fixed vocabulary (e.g., `clean`, `contested`, `superseded`, `fabricated`, `unresolved`),
- a confidence level,
- the generator's identity and the verifier's identity (must differ).

These fields follow the claim-ledger schema defined under `evidence/` (see the remediation plan's T1.1). Every citation added or changed by a PR must have a corresponding ledger row before merge.

**Full-passage rule.** A single retrieved sentence is not proof of a claim, and it is never proof of absence. "This standard does not mention X" or "no source supports Y" must not ship on the strength of a partial excerpt. The verifier must perform a full-text search over the complete document — and, where a source has multiple extant versions (e.g., preprint revisions, superseded standards), over **every** extant version — before an absence or fabrication verdict is recorded. A citation whose supporting passage has not been captured in full does not pass verification.

**Consequence of failing this pass.** A citation that has not been through an independent resolve-and-quote pass, or whose supporting passage is not fully recorded, must not merge. Reviewers should block PRs on missing or incomplete ledger rows the same way they block PRs on missing tests.

## Review Process

All changes go through pull request review. Expect that:

- Changes to core values or principles will be held to a higher bar than changes to worked patterns or operational definitions.
- "I think this reads better" is not sufficient justification. Explain what problem the current wording causes.
- Maintainers may ask for evidence or counter-examples before merging.

## Code of Conduct

Engage constructively. Disagree with reasoning and evidence, not with people. This is a technical document about engineering discipline — contributions should reflect that discipline.

## License

By contributing, you agree that your contributions will be licensed under the same terms as the rest of this repository.
