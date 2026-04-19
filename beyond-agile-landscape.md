# Beyond Agile — The Existing Manifestos: What They Get Right and What They Miss

*A critical review of every competing framework.*

See [Beyond Agile](beyond_agile.md) for the full argument.
See [Ten Structural Failures](beyond-agile-failures.md) for how Agile breaks.
All references link to [Sources](beyond-agile-sources.md).

---

The industry has not been idle. Multiple manifestos and frameworks have emerged to fill the vacuum. But none of them are sufficient.

## Casey West's Agentic Manifesto

**What it gets right:** The shift from verification ("did it do what I said?") to validation ("did it do what I wanted?"). The Agentic Delivery Lifecycle (ADLC) across five non-linear phases. The "Determinism Gap" — the fundamental difference between a system whose output is known in advance and one whose output is discovered in real-time. The emphasis on continuous flow over time-boxed sprints. The insistence that human engineers and agents must work together continuously, rejecting fully unsupervised delegation <sup>[4](beyond-agile-sources.md#ref-4)</sup>.

**What it misses:** No treatment of memory as infrastructure — West does not distinguish knowledge from learned memory or address memory governance. No economics-aware routing — no recognition that model choice is a runtime decision with cost implications <sup>[17](beyond-agile-sources.md#ref-17)</sup>. No framework for formal verification or proof generation — and this matters because when execution is non-deterministic, at least one layer of the verification pyramid must be provably correct; executable specification languages and model checkers are now production-viable for this purpose <sup>[12](beyond-agile-sources.md#ref-12)</sup><sup>[19](beyond-agile-sources.md#ref-19)</sup>. No treatment of swarm topology as an engineering decision. No recognition that alignment must move from the single-agent prompt layer toward institutional alignment across interacting agents, tools, and humans <sup>[59](beyond-agile-sources.md#ref-59)</sup>. The manifesto reads as a philosophical reframe of Agile rather than a new engineering discipline.

## The SASE Framework (Academic SE 3.0)

**What it gets right:** The dual modality of SE4H (Software Engineering for Humans) and SE4A (Software Engineering for Agents). The elevation of the developer from syntax author to "Agent Coach." The structured artifacts: BriefingScripts, Merge-Readiness Packs (MRPs), Consultation Request Packs (CRPs). The separation of Agent Command Environment (ACE) and Agent Execution Environment (AEE). The Plan-Do-Assess-Review (PDAR) loop with agent-initiated callbacks <sup>[12](beyond-agile-sources.md#ref-12)</sup>.

**What it misses:** Overly academic — lacks operational tooling references. No treatment of cost-quality routing. No framework for memory governance beyond "institutional memory." No recognition that formal verification and statistical evaluation are complementary disciplines with different cost curves <sup>[19](beyond-agile-sources.md#ref-19)</sup>. No treatment of self-improving recursive systems or of skill memory as an external learning substrate that must itself be governed <sup>[60](beyond-agile-sources.md#ref-60)</sup>.

## The DEV Community "Agentic Manifesto"

**What it gets right:** Four values that correctly reframe priorities: human intent over exhaustive requirements, continuous flow over sprints, architectural integrity over feature output, automated validation over manual estimation <sup>[11](beyond-agile-sources.md#ref-11)</sup>.

**What it misses:** Values without principles are aspirational, not operational. No definition of "done." No treatment of observability, memory, domain boundaries, or accountability. No framework for what happens when architectural integrity conflicts with continuous flow. No recognition that "automated validation" requires a multi-layered verification pyramid (deterministic → statistical → formal → human) rather than a single binary gate <sup>[13](beyond-agile-sources.md#ref-13)</sup>.

## The P3 Group's "From Sprints to Swarms"

**What it gets right:** The most thorough deconstruction of how specific Agile practices (standups, sprints, estimation, retrospectives) fail under agentic workflows. The strategic framing of evolutionary versus revolutionary adoption paths. The recognition that the Agile Manifesto's *values* can survive as governance principles even as its *practices* become obsolete <sup>[5](beyond-agile-sources.md#ref-5)</sup>.

**What it misses:** Primarily diagnostic rather than prescriptive. Identifies what breaks but does not provide the replacement engineering discipline with sufficient depth. No treatment of formal verification, memory governance, or economics-aware routing. No operational tooling framework.

## The AWS Prescriptive Guidance

**What it gets right:** "Zones of intent" — bounded operational spaces where agents have high autonomy within architectural constraints. The evolution from "Sprint Planning" to "Intent Design." The recognition that "done" must be redefined as runtime readiness with observability, explainable traces, and feedback mechanisms <sup>[3](beyond-agile-sources.md#ref-3)</sup>.

**What it misses:** Vendor-contextualized (AWS-centric). No treatment of multi-vendor swarm coordination. No framework for formal verification. Limited treatment of memory and learning systems.

## ISO/IEC 5338:2023

**What it gets right:** Among the first comprehensive international frameworks for AI system lifecycle processes <sup>[20](beyond-agile-sources.md#ref-20)</sup>. The integration of Model Engineering into standard Implementation processes. The mandate for Continuous Validation — acknowledging that AI agents can suffer from context drift, hallucination, and data staleness over time. The emphasis on bias mitigation, transparency, and purpose-binding for training data <sup>[15](beyond-agile-sources.md#ref-15)</sup>.

**What it misses:** Designed for AI systems broadly, not for agentic engineering specifically. No treatment of multi-agent coordination, swarm topologies, or inter-agent trust. No framework for memory governance, economics-aware routing, or self-improving systems. Compliance-oriented rather than engineering-oriented.

## The Agentic AI Foundation and the Emerging Standards Stack

Since the frameworks above were published, the most significant structural
development has been institutional: in December 2025, the Linux Foundation
launched the Agentic AI Foundation (AAIF), co-founded by Anthropic, OpenAI,
Google, Microsoft, AWS, and Block <sup>[35](beyond-agile-sources.md#ref-35)</sup>.
MCP, A2A, AGENTS.md, and goose were donated as founding projects.

This matters because the competing frameworks above all suffer from the same
gap: they describe what agentic engineering needs without naming the protocols
that implement it. As of the current ecosystem snapshot, the industry is
actively standardizing into four complementary layers, all under neutral governance:

- **MCP** (Model Context Protocol) — agent-to-tool connectivity. Defines typed
  schemas, auth boundaries, and replayable tool
  logs <sup>[36](beyond-agile-sources.md#ref-36)</sup>.
- **A2A** (Agent-to-Agent Protocol) — agent discovery, task delegation, and
  cross-framework collaboration <sup>[37](beyond-agile-sources.md#ref-37)</sup>.
- **Agent Skills** — capability definition via SKILL.md files consumed at
  runtime <sup>[38](beyond-agile-sources.md#ref-38)</sup>.
- **AGENTS.md** — repository-level machine-readable constraints for coding
  agents <sup>[39](beyond-agile-sources.md#ref-39)</sup>.

None of the six frameworks reviewed above anticipated this convergence. The
Agentic Engineering Manifesto does not prescribe specific protocols — its
contribution is the governance model that sits across all four layers. But the
existence of AAIF supports one of the manifesto's core theses: vendor-neutral,
interoperable architecture is not aspirational but actively being built.

A parallel movement reinforces the shift: specification-driven development (SDD)
frameworks are emerging as an increasingly common workflow pattern for agentic coding.
Multiple widely-adopted open-source frameworks <sup>[43](beyond-agile-sources.md#ref-43)</sup><sup>[44](beyond-agile-sources.md#ref-44)</sup><sup>[45](beyond-agile-sources.md#ref-45)</sup><sup>[46](beyond-agile-sources.md#ref-46)</sup><sup>[48](beyond-agile-sources.md#ref-48)</sup>
now enforce the same discipline — write the specification before the agent writes
the code. This effectively inverts Agile's founding principle of "working
software over comprehensive documentation." In agentic workflows, comprehensive
specification *is* the precondition for working software. The documentation is
not overhead; it is the control surface.
