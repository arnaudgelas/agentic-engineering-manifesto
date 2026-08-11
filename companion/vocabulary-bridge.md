# Vocabulary Bridge

*Status: **NON-NORMATIVE** — explanatory/supporting material; it does not
itself impose requirements or create new constructs, tiers, phases, or
layers. The AEM normative core is `manifesto/*.md`.*

This page maps current practitioner vocabulary — terms that circulate in
blog posts, vendor material, and preprints but are not AEM's own words — to
the existing AEM constructs that already cover the underlying concern. It
exists so that a reader who arrives asking "where does AEM stand on
[current term]?" gets one citable answer instead of silence. It does not
add anything to what AEM requires.

Read the [Manifesto](manifesto.md) for the core values and minimum bars.
See the [Companion Guide](companion-guide.md) for the full table of contents.

---

## How to read this page

Each row positions one term. A row is not a definition (definitions live in
the glossary) and it is not a new obligation. A row can honestly conclude
"AEM has no position" — that is a valid, complete answer, not a gap to be
filled later.

Rows are being filled in incrementally, one per underlying normative task,
so that writing the row can double as a legibility check on the construct
it points to.

---

## Review trigger

This page should be reviewed on whichever of the following comes first:

- **(a)** a new peer-reviewed entrant appears in this space (a term, study,
  or construct that would change a row's "Evidence class" or "Which
  existing AEM construct covers it" field);
- **(b)** a term already on this page enters or leaves practitioner use
  (a row's "What practitioners mean by it" or "Provenance and date" field
  goes stale); or
- **(c)** six months have elapsed since the page's (or an individual row's)
  last edit, whichever is being checked.

Each row's own **Position date** field (not this page-level note) is the
per-row staleness clock; check the row's date, not just the page's.

This is a lightweight trigger, not a standards-currency register. Building
a full standards-currency register is out of scope here and requires
counsel sign-off.

**Owner:** MAINT.

---

## Row template

Every row uses exactly these seven fields, in this order:

| # | Field | What it captures |
|---|---|---|
| 1 | **Term** | The practitioner term being positioned. |
| 2 | **What practitioners mean by it** | A neutral description of common usage, without endorsing or adopting the term as AEM vocabulary. |
| 3 | **Provenance and date** | Where the term originated (paper, vendor, community) and roughly when it entered use. |
| 4 | **Which existing AEM construct covers it** | The principle, mechanism, or artefact in the normative core that already addresses the underlying concern — or "none" if there isn't one. |
| 5 | **What AEM explicitly does NOT claim** | The boundary: what this row is not asserting, including gaps in evidence or scope AEM does not cover. |
| 6 | **Evidence class** | One of: peer-reviewed / preprint / vendor case report / practitioner analysis / repository artefact. Stated honestly, not upgraded. |
| 7 | **Position date** | The date this row's position was last reviewed or confirmed. |

### Blank row (copy this to add a term)

| Field | Content |
|---|---|
| Term | *(pending)* |
| What practitioners mean by it | *(pending)* |
| Provenance and date | *(pending)* |
| Which existing AEM construct covers it | *(pending)* |
| What AEM explicitly does NOT claim | *(pending)* |
| Evidence class | *(pending)* |
| Position date | *(pending)* |

---

## Rows

### Harness engineering

| Field | Content |
|---|---|
| Term | Harness engineering |
| What practitioners mean by it | The discipline of designing and operating the "agent stack" surrounding a foundation model — execution loop, hooks/skills/instruction files, tool registry, permissions, runtime image, routing policy, compaction policy, evaluator wiring, and orchestration topology — as an engineered system in its own right, distinct from prompt or context work. |
| Provenance and date | Emerged in frontier-lab and practitioner writing through 2025, converging on the "model / context layer / harness / tools / environment" stack framing referenced in [Companion Principle 7](principles-07.md#the-emerging-agent-stack); entered wider circulation in vendor and community material through late 2025 and into 2026. |
| Which existing AEM construct covers it | [Principle 7](../manifesto/manifesto-principles-07.md) (context is engineered like code) for the compaction and retrieval concerns; [Principle 3](../manifesto/manifesto-principles-03.md) (architecture is defense-in-depth) for the harness identity construct itself — the single versioned identifier binding execution loop, hooks/skills/instruction files, tool registry, permission set, runtime image, routing policy, compaction policy, evaluator versions, and orchestration topology; and the evidence bundle's agentic provenance record in [`manifesto-done.md`](../manifesto/manifesto-done.md), which requires the tool manifest, model and prompt versions (by hash), and memory/retrieval state to be recorded per loop and re-evaluated whenever the harness identity changes. |
| What AEM explicitly does NOT claim | AEM does not claim evidence that harnesses can safely self-modify — Phase 6 (agentic self-improvement) remains a stated frontier, not a validated capability, and any self-change invalidates the evaluations that authorized the prior harness identity. AEM also does not claim a controlled causal study exists showing that harness engineering, as a discipline, improves productivity or output quality; the governance requirement to version and record the harness identity stands independent of any such causal claim. |
| Evidence class | Mixed, stated honestly: one peer-reviewed research agenda, two preprints, one vendor case report, and one practitioner analysis. None of these constitute a controlled causal study of harness productivity effects. |
| Position date | 2026-08-11 |

### Loop engineering

| Field | Content |
|---|---|
| Term | Loop engineering |
| What practitioners mean by it | Deliberately designing and tuning the fast, iterative generate → run/test → patch cycle an agent executes on its own within a single task — propose a change, run it, observe the result, revise, repeat — as a discipline distinct from the surrounding delivery process. |
| Provenance and date | Emerged in 2025–2026 practitioner and vendor material (agent-harness blog posts, coding-agent product write-ups) describing the seconds-to-minutes inner cycle of autonomous coding agents; not an academic term of art. |
| Which existing AEM construct covers it | The [Agentic Loop](../manifesto/manifesto.md#the-agentic-loop) — Specify, Design, Plan, Execute, Verify, Validate, Observe, Learn, Govern — but only at the loop's own cadence. AEM governs the **outer** engineering loop: the nine phases run at task/change cadence (minutes to days), not the seconds-to-minutes cadence "loop engineering" describes. |
| What AEM explicitly does NOT claim | AEM does not govern the inner, seconds-to-minutes generate-test-patch cycle an agent runs inside a single Execute step — that inner execution loop is what "loop engineering" usually refers to, and AEM does not define its mechanics, tuning parameters, or best practices. This matches [`README.md`](../README.md)'s current statement that the nine phases run "at task/change cadence (minutes to days), not the seconds-to-minutes generate-test-patch cadence of an agent's inner execution loop, which AEM does not govern." |
| Evidence class | practitioner analysis |
| Position date | 2026-08-11 |

---

### Graph engineering

| Field | Content |
|---|---|
| Term | Graph engineering |
| What practitioners mean by it | A label circulating in 2024–2026 vendor and community material for building agent systems as explicit graphs — typed nodes, typed edges, conditional routing, cycles, checkpoints — rather than as a single linear prompt chain. Advocates frame it as a successor paradigm to "the agent loop," sometimes as its own discipline or job title. |
| Provenance and date | Not a single origin. The underlying technique predates the label by years: DAG-based workflow schedulers (Airflow, 2014-ish), state-machine orchestration (AWS Step Functions, 2016), and, specifically for LLM agents, graph-structured orchestration frameworks such as LangGraph (2024), Microsoft's Prompt Flow (2023), and AutoGen's group-chat/handoff graphs (2023–2024). "Graph engineering" as a named epoch is vendor and conference-talk usage from 2024 onward, not a peer-reviewed term of art. |
| Which existing AEM construct covers it | [P3 — Architecture is defense-in-depth](../manifesto/manifesto-principles-03.md) already requires the orchestration topology bound into harness identity to be typed, versioned, and hashed: node set and node type (agent/tool/human-gate/evaluator), typed edges and routing predicates, state schema, retry/idempotency policy, failure/compensation handling, human gates, evaluator hooks, and allowed-mutation scope (`orchestration_topology_manifest` in [`governance/evidence-bundle-schema.md`](../governance/evidence-bundle-schema.md)). [P4 — Right-size the swarm](../manifesto/manifesto-principles-04.md) already requires choosing the simplest coordination topology the task warrants and graduating to more complex coordination only on evidence. Together these already specify what "graph engineering" claims as new practice. |
| What AEM explicitly does NOT claim | AEM does **not** adopt "graph engineering" as a new epoch, paradigm, or named discipline, and this is a considered refusal, not an oversight. A loop is already a cyclic graph — one node, one self-edge, one routing predicate — so "moving from loops to graphs" is not an architectural transition, it is a description of a graph with a small node count. Explicit workflow graphs are not new: DAG schedulers, state-machine orchestration, and LLM-specific frameworks (LangGraph, Prompt Flow, AutoGen) were structuring agent and pipeline execution as typed graphs for years before "graph engineering" entered vendor vocabulary. The process-centric peer-reviewed literature this label sometimes leans on supports graph representations for **observability and evaluation** of multi-step agent behavior — it does not establish that graphs have replaced loops as a computational paradigm, because they never were a different paradigm. AEM's position: adopt the underlying artefact — a typed, versioned, hashed orchestration topology, already required by P3 and P4 — and decline the epoch label built on top of it. |
| Evidence class | practitioner analysis (for the "graph engineering" label and its framing as a successor paradigm); repository artefact (for LangGraph, Prompt Flow, AutoGen, and DAG-scheduler prior art, which predate and undercut the label's novelty claim). |
| Position date | 2026-08-11 |

---

### Subagent / sub-agent delegation

| Field | Content |
|---|---|
| Term | Subagent / sub-agent delegation |
| What practitioners mean by it | A lead agent spawns one or more subordinate agent instances — often in isolated context windows, sometimes in isolated filesystem worktrees — to perform a bounded sub-task and return a condensed result, keeping the lead's own context window free of the sub-task's working detail. Framed by practitioners primarily as a context-isolation technique (prevent context pollution / "context rot" in the lead) and secondarily as a delegation and parallelization mechanism. |
| Provenance and date | Popularized through 2025–2026 coding-agent tooling (e.g., Claude Code's Task/sub-agent tool, and multi-agent orchestration layers built on top of it) and vendor engineering write-ups on context engineering; not a term AEM originated or has adopted as its own vocabulary. |
| Which existing AEM construct covers it | Two constructs, not one, because the term conflates two concerns. The context-isolation half is covered by [Principle 7](../manifesto/manifesto-principles-07.md) ("Context is engineered like code") — a sub-agent's isolated context window is one instance of the explicit context budgeting (hierarchical retrieval, rolling summaries, state compaction) that principle requires be engineered and versioned, not left implicit. The delegation half is covered by [Principle 4](../manifesto/manifesto-principles-04.md)'s tier containment (an orchestrator cannot delegate to a specialist agent at an autonomy tier higher than its own) and [Principle 12](../manifesto/manifesto-principles-12.md)'s delegation properties (agent instance, principal, delegated authority, issuer, expiry, revocation state) — a sub-agent is, for accountability purposes, a delegate, and the same identity and delegation-state requirements apply to it as to any other delegate. |
| What AEM explicitly does NOT claim | AEM does not adopt "subagent" as a defined term, does not specify a sub-agent invocation API or protocol, and does not claim that isolating a sub-task's context window is sufficient on its own to satisfy Principle 7's quality bar (stale/conflicting/poisoned context can still occur inside an isolated window). It also does not claim Principle 12's delegation properties are commonly implemented for sub-agent calls in current tooling — only that they are what the accountability chain requires. |
| Evidence class | practitioner analysis (vendor engineering write-ups, tool documentation) for the term's currency; the mapped AEM constructs are internally reasoned, not externally evidenced. |
| Position date | 2026-08-11 |

---

### Context engineering

| Field | Content |
|---|---|
| Term | Context engineering |
| What practitioners mean by it | The deliberate curation, budgeting, and versioning of everything in an agent's context window — retrieval, compaction, summarization, authority-weighting of sources — treated as an engineering discipline distinct from prompt engineering. |
| Provenance and date | Circulated widely across practitioner and vendor engineering blogs through 2025–2026 as a successor framing to "prompt engineering." |
| Which existing AEM construct covers it | [Principle 7, "Context is engineered like code,"](../manifesto/manifesto-principles-07.md) already covers this directly and by name — this row exists to confirm and cite that coverage, not to add a new mapping. Principle 7 requires context be versioned, tested, and performance-benchmarked; requires explicit context budgeting (hierarchical retrieval, rolling summaries, state compaction, authority-weighted pruning); and ties the compaction policy to the versioned harness identity in Principle 3. |
| What AEM explicitly does NOT claim | AEM does not claim priority for the term or that Principle 7 was written in reference to it; the overlap is in substance, not lineage. |
| Evidence class | practitioner analysis (the term's currency); the AEM construct is the normative text itself. |
| Position date | 2026-08-11 |

---

### Meta-harness and swarm terminology

| Field | Content |
|---|---|
| Term | Meta-harness and swarm terminology |
| What practitioners mean by it | "Meta-harness" — a common orchestration layer sitting over multiple underlying coding-agent harnesses (e.g., Claude Code, Codex, Cursor), letting a user swap or combine harnesses without rewriting. "Swarm" — a set of coordinated, often parallel, agent instances, used both descriptively and as a marketing label for orchestration products. |
| Provenance and date | This specific naming ground is held by Reuven Cohen's stack (Claude Flow, rebranded Ruflo in early 2026) and adjacent projects, which self-describe using both terms; AEM does not originate either term. |
| Which existing AEM construct covers it | [Principle 4](../manifesto/manifesto-principles-04.md) ("Right-size the swarm to the task") uses "swarm" as its own working term for coordinated multi-agent topology, so there is direct terminological overlap — but Principle 4 is a containment and coordination-discipline requirement (typed/versioned/reconciled shared state, tier containment, conflict resolution, choosing the simplest topology that works), not an endorsement of any specific vendor's swarm product or of "meta-harness" as an architecture pattern AEM prescribes. AEM has no position on meta-harness as a distinct architectural claim beyond what Principle 3's versioned harness identity and Principle 4's topology requirements already impose on any orchestration layer, vendor-branded or not. |
| What AEM explicitly does NOT claim | This is the row where the honest answer requires pointing at counterevidence rather than repeating the marketing framing. AEM does **not** claim that naming-ground visibility is evidence of assurance. Per `AEM_critical_review_2026-08.md` §9.2 (repository analysis, not part of the normative core): Ruflo's own release notes self-disclose a formerly stubbed Ed25519 verifier, a removed hard-coded `success: true` result, fail-open scanner behavior, and a live `ReferenceError` that shipped through CI; it was also subject to a CVSS 10.0 unauthenticated MCP-bridge RCE (CVE-2026-59726, patched before 3.16.3). A related `metaharness` npm package (v0.4.4) was found to fall back to placeholder signatures and can report `VALID` with `unverified: true` when a witness method is absent — the critical review calls this "an unfinished self-attestation scaffold" that, even if repaired, would prove artefact integrity and issuer only, not behavior, safe evolution, independent review, or accountability. AEM does not claim these findings generalize beyond the specific versions cited, and does not claim its own conformance mechanisms are more mature in practice than any competitor's — only that "who uses this term first" is not itself an assurance claim. |
| Evidence class | vendor/maintainer self-disclosure (release notes) and an independent vulnerability record (NVD CVE-2026-59726) for the counterevidence; practitioner analysis for the terms' currency. |
| Position date | 2026-08-11 |

---

### Scaffolding

| Field | Content |
|---|---|
| Term | Scaffolding (agent scaffolding) |
| What practitioners mean by it | The surrounding harness a model runs inside — execution loop, tool registry, prompting structure, sandboxing, retry/verification logic — as distinct from the underlying model itself. Used to argue that reported capability differences are often harness-dependent rather than model-dependent. |
| Provenance and date | Long-standing informal usage in agentic-AI practitioner and research writing; given empirical grounding by Vats & Golev, "The Scaffold Effect" (preprint, arXiv:2607.22585, 2026), which ran fixed-model comparisons across scaffolds and found harness-dependent failure fingerprints and cost differences up to roughly 40x tokens per solved task, with smaller and uncertain pass-rate differences. |
| Which existing AEM construct covers it | [Principle 3](../manifesto/manifesto-principles-03.md)'s versioned **harness identity** — the execution loop, hooks/skills/instruction files, tool registry, permission set, runtime image, routing policy, compaction policy, evaluator versions, and orchestration topology, bound together as one accountable, versioned aggregate whose material change invalidates prior evaluation results. "Scaffolding" and AEM's "harness" name substantially the same object; AEM's contribution is treating it as a governed, versioned artefact rather than an implementation detail. |
| What AEM explicitly does NOT claim | AEM does not claim to have measured a scaffold effect of its own, does not adopt "scaffolding" as its own term (it uses "harness"), and does not claim Principle 3's versioning requirement is sufficient to eliminate harness-dependent cost or failure variance — only that it makes such variance attributable to a recorded change rather than silent drift. The Scaffold Effect study is a fixed-model, 300-trial preprint; AEM does not upgrade it to a stronger evidence class than that. |
| Evidence class | preprint (Vats & Golev, arXiv:2607.22585, 300 trials) for the empirical grounding; the AEM construct is the normative text itself. |
| Position date | 2026-08-11 |

---

### Agent identity

| Field | Content |
|---|---|
| Term | Agent identity |
| What practitioners mean by it | A durable, verifiable way to identify which specific agent instance performed an action, distinct from the human or system it acted for — encompassing questions of workload identity, credential issuance, and machine-to-machine authentication for agentic systems. |
| Provenance and date | An active standards and vendor conversation through 2025–2026 spanning OAuth/OIDC extensions for agents, SPIFFE workload identity, SCIM provisioning, and NGAC-style policy access; no single converged standard yet exists for agentic delegation specifically. |
| Which existing AEM construct covers it | [Principle 12](../manifesto/manifesto-principles-12.md)'s delegation properties: for any Tier 2–4 action, the accountability chain must be reconstructable from recorded state — agent instance (a stable identifier for the specific agent that acted), principal (who it acted on behalf of), delegated authority (scope and ceiling), issuer, expiry, and revocation state (queryable at time of action). [Principle 10](../manifesto/manifesto-principles-10.md)'s revocation mechanism (bounded expiry, central revocation, a stated propagation bound) enforces the expiry and revocation-state properties at the security layer. |
| What AEM explicitly does NOT claim | AEM explicitly declines to standardize on a protocol stack. OAuth/OIDC, SPIFFE, SCIM, and NGAC each solve a different piece of the problem, the standards work for agentic delegation specifically is still in draft, and naming one now would freeze the manifesto to a stack likely to be superseded before it stabilizes. AEM claims the six properties are required regardless of which stack implements them — not that any given implementation currently exposes all six. |
| Evidence class | The mapped AEM construct is the normative text itself; no external evidence class applies to this row's positioning (the standards landscape is cited descriptively, not as supporting evidence for an AEM claim). |
| Position date | 2026-08-11 |

---

## Related pages

- [Companion Guide](companion-guide.md) — full table of contents.
- [Frameworks](frameworks.md) — maturity spectrum and cross-cutting definitions.
