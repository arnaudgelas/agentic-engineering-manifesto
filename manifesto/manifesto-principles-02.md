## 2. Specifications are living artifacts that evolve through steering


Requirements, constraints, and acceptance criteria must be versioned,
reviewable, and machine-readable — because they drive agent behavior directly.
Specifications are hypotheses that sharpen as agents explore the problem space
and evidence accumulates. Express what must be true when the work is complete.
Express what is forbidden. Let the swarm find the path. When the path reveals
that the spec was wrong, update the spec and run again.

Specifications and architectural constraints operate at different layers and
change at different speeds. Constraints are invariants — security policies,
domain ownership boundaries, data integrity rules — that hold across
specification iterations. Specifications are goals and acceptance criteria that
evolve within those invariants. An agent can propose a revised acceptance
criterion without governance overhead; proposing a relaxed constraint triggers a
governed review. If the system cannot distinguish these two change types,
specification iteration will silently erode architectural boundaries. See
[Specifications vs. Constraints](companion-principles.md#specifications-vs-constraints)
in the extended guidance.

*Minimum bar: If a specification cannot be versioned, reviewed, and revised
based on execution evidence, it is a wish, not an engineering artifact.*

These are starter defaults, not universal stop conditions. Calibrate them per
domain, track false-convergence and false-drift, and harden them only after
local evidence justifies the thresholds.

**A specification is done iterating when:**
- Acceptance criteria remain stable across three consecutive iterations
  (no new criteria added, no existing criteria changed).
- Scope is contracting, not expanding — each iteration narrows requirements,
  does not broaden them.
- Agent first-pass verification rate exceeds 80% (the specification is clear
  enough for the agent to satisfy it without mid-task clarification).
- No new stop criteria emerge in the last iteration.

If these are not met after three iterations, treat it as scope drift — not
optimization — and reset the boundary. Iteration is not the goal; convergence
is.

---
