## 3. Architecture is defense-in-depth, not a document


Domain boundaries define what agents may do and what they must not do. Encode
boundaries as machine-enforced policies: repository gates, type contracts, lint
rules, domain ownership maps, CI checks.

Orchestration is a deterministic concern; execution is a probabilistic one —
conflating them is the root failure mode. Do not rely on an LLM's system prompt
to enforce your business rules. Build deterministic infrastructure wrappers
around your probabilistic AI. Enforce permissions, repository gates, API rate limits,
and data access at the system level. Expect the boundary to be tested. Design
for what happens when it is crossed.

Deterministic wrappers catch structural failures — unauthorized access, schema
violations, forbidden operations. They cannot catch semantic failures — an agent
that writes syntactically valid but logically wrong code. That is why
architecture is *defense-in-depth*, not a single layer: wrappers catch
structural violations (Principle 3), verification catches semantic errors
(Principle 8), and observability catches behavioral drift (Principle 9). No
single layer catches everything. All three must hold.

*Minimum bar: If a boundary is described but not enforced at runtime with
automated detection and recovery, it is not architecture — it is documentation.*

---
