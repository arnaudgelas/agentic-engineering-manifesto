## Principle 7 — Context: Extended Guidance


*See Principle 7 in the manifesto for the core statement and minimum bar.*

### Retrieval SLOs

Define tiered SLO guidance by architecture class for context retrieval and
decision latency. Not every retrieval path needs the same latency target:

- **Local retrieval** (file system, in-process cache): < 100ms. This is the
  baseline for interactive agent loops where the developer is waiting.
- **Remote retrieval** (vector DB, API-backed knowledge base): < 500ms with
  a relevance threshold. If retrieval takes longer, the agent should
  proceed with available context and flag the gap rather than block.
- **Hybrid + rerank** (remote retrieval with a reranking model): < 1s end-to-
  end. The reranking step improves precision but adds latency; set a hard
  ceiling and degrade gracefully if exceeded.
- **Regulated logging** (audit-required retrieval in compliance environments):
  latency is secondary to completeness and provenance. Log every retrieval
  with source, relevance score, and timestamp.

When retrieval SLOs are breached, alert and degrade — do not silently
return stale or irrelevant context. An agent that reasons from bad context
produces confidently wrong output.

### Context Budgeting

Context windows are finite and reasoning quality degrades as low-signal context
accumulates. This is not a theoretical concern — it is the most common
root cause of agent quality degradation in long-running tasks. Engineer
explicit context budgeting:

- **Hierarchical retrieval**: Retrieve summaries first, then pull detailed
  context only for the sections the agent identifies as relevant. This
  avoids filling the window with potentially irrelevant detail.
- **Rolling summaries**: For multi-step tasks, compress completed steps into
  structured summaries before starting the next step. The summary should
  capture decisions and outcomes, not raw content.
- **State compaction**: Periodically replace accumulated context with a
  compact representation of current state. The compacted state is the new
  starting point; the raw history is available in traces for debugging but
  does not consume the active context window.
- **Authority-weighted pruning**: When the context budget is exhausted,
  discard low-authority context first (heuristic suggestions, old memory
  entries) and preserve high-authority context (specifications, constraints,
  evaluation results).

A worked example: an agent tasked with refactoring a module across 15 files
hits the context limit at file 8. Without budgeting, it either hallucinates
the remaining files or produces inconsistent changes. With rolling summaries,
it carries a compact summary of decisions made for files 1-7 and retrieves
fresh context for files 8-15.

### Context Poisoning

Context poisoning is distinct from memory poisoning (Principle 6) — it
occurs when the retrieval system returns contextually appropriate but
factually wrong or outdated content within a single task. Memory poisoning
is a persistent corruption; context poisoning can happen on any retrieval
call.

Common sources: stale index entries that survived re-indexing, retrieved
content from a deprecated branch that was never cleaned up, code examples
from a library version that no longer matches the project's dependencies.

Detection: monitor for sudden quality drops in agent output that correlate
with specific retrieval sources. Track retrieval source freshness (time since
last validation) and alert when agents consume context older than a
configurable threshold.

Mitigation: retrieval canaries (known-good queries with expected results,
run on every retrieval cycle), source freshness metadata in every retrieval
response, and a circuit breaker that falls back to specification-only
context when retrieval confidence drops below threshold.

### Self-Improving Knowledge Bases

Codify "never do X here" as machine-enforced guidance: repository policies,
architectural constraints, ADR rules, lints, CI gates. Make the knowledge base
self-improving: let retrieval quality metrics feed back into indexing and
curation, so the system gets more precise over time rather than more cluttered.

The feedback loop: track which retrieved contexts led to successful agent
outcomes (evidence bundle accepted, evaluations passed) and which led to
failures. Over time, demote or remove context sources that consistently
correlate with poor outcomes. This is garbage collection for your knowledge
base, driven by evidence rather than manual curation.

### Cross-Iteration Learning and CI Context

A specific and increasingly important case of context budgeting is **learning
across CI iterations** — where each iteration generates new evidence about the
consequences of previous decisions. In a CI loop spanning dozens of iterations
(the SWE-CI benchmark averages 71 commits per task), the agent must carry
forward not just what changed, but what effect each change had on subsequent
iterations.

This is distinct from single-task context budgeting because the evidence
compounds: iteration 15 generates information about decisions made in
iterations 3, 7, and 12. The context that matters is not "what happened last"
but "which earlier decisions are causing current problems."

Practical approaches for cross-iteration context:

- **Decision-consequence summaries**: After each iteration, compress the
  results into a structured summary that links decisions to outcomes. "Changed
  the retry logic in iteration 5; iteration 9 test failures trace to that
  change." These summaries are the rolling context for subsequent iterations.
- **Regression attribution**: When a regression appears, trace it to the
  iteration that introduced the structural cause — not just the iteration that
  triggered the test failure. This requires structured tracing across
  iterations, not just within them.
- **Evolvability signals**: Track whether each iteration's decisions made the
  next iteration easier or harder. The SWE-CI benchmark's EvoScore metric
  (arXiv:2603.03823) measures this explicitly: agents whose early decisions
  facilitate subsequent evolution score higher. Teams can approximate this by
  tracking iteration-over-iteration test pass rates and regression frequency.

Cross-iteration context management is the primary capability differentiator
for long-running agent pipelines. Without it, agents repeat mistakes, fail to
learn from structural consequences, and accumulate technical debt that
traditional single-iteration metrics miss.

### Tooling Maturity and Adoption

The context engineering standard described here exceeds what most teams can
build today. The tooling ecosystem is maturing rapidly — open protocols for
tool connectivity, structured capability definitions, and version-aware memory
layers now exist — though production-grade governance tooling remains nascent.
Adopt incrementally: start by measuring retrieval quality (relevance, latency,
staleness), then add context budgeting for long-running tasks, then tiered SLOs
as scale demands. The principle describes the engineering standard; the
adoption path acknowledges the gap.

### The Emerging Agent Stack

Recent frontier-lab writing is converging on a useful systems frame: the agent
is not just a model with a prompt. The operational stack increasingly looks
like:

- **Model** — the reasoning engine
- **Context layer** — retrieval, summaries, memory, and task framing
- **Harness** — execution loop, tool orchestration, constraints, checkpoints,
  and cleanup
- **Tools / APIs** — the external actions available to the agent
- **Environment / runtime** — the bounded execution context, permissions,
  traces, and operational controls

This is mostly a vocabulary clarification, not a new principle. The manifesto's
contribution is that it provides the governance model across this stack. P7
governs the context layer directly, but its quality depends on the harness
that selects and compacts context, the tools that retrieve it, and the runtime
that preserves or constrains state across sessions. In practice, treating
"context engineering" as a standalone discipline without connecting it to the
harness and runtime is how teams end up with excellent retrieval feeding
poorly-governed execution loops. For where AEM stands on "harness engineering"
specifically — what it maps to, what it does not claim, and the evidence
behind that position — see the [harness engineering row](vocabulary-bridge.md#harness-engineering)
of the vocabulary bridge.

As of early 2026, four open interface patterns are crystallizing around this
stack:

- **Tool connectivity protocols** — typed schemas, capability discovery,
  authorization, and structured tool invocation at the tools/APIs layer.
- **Agent coordination protocols** — agent discovery, task lifecycle
  management, and cross-runtime delegation at the coordination layer.
- **Capability definition artifacts** — reusable, reviewable descriptions of
  domain procedures, constraints, and operational skills at the harness layer.
- **Repository-level instruction artifacts** — machine-readable project
  constraints and local conventions at the environment layer.

The manifesto's governance model — tiers, traces, accountability, evaluations —
sits across all four. No single protocol provides governance; the manifesto's
principles provide the governance framework that connects them.

---
