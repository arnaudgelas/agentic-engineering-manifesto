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
2. Make your changes in `manifesto-agentic-engineering.md` (the source of truth) and update `README.md` if the change affects the summary.
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

## Review Process

All changes go through pull request review. Expect that:

- Changes to core values or principles will be held to a higher bar than changes to worked patterns or operational definitions.
- "I think this reads better" is not sufficient justification. Explain what problem the current wording causes.
- Maintainers may ask for evidence or counter-examples before merging.

## Code of Conduct

Engage constructively. Disagree with reasoning and evidence, not with people. This is a technical document about engineering discipline — contributions should reflect that discipline.

## License

By contributing, you agree that your contributions will be licensed under the same terms as the rest of this repository.
