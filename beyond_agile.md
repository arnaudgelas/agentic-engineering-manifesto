# Beyond Agile: Why the Software Industry Urgently Needs a New Manifesto

*The Agile Manifesto was written for a world where humans wrote all the code. That world no longer exists.*

---

## The Agile Manifesto Is Twenty-Five Years Old — and It Shows

In February 2001, seventeen software developers gathered at a ski lodge in Snowbird, Utah, and wrote a document that would reshape an industry. The Agile Manifesto was a rebellion against waterfall bureaucracy, and it won. Its four values — individuals and interactions, working software, customer collaboration, responding to change — liberated a generation of engineers from Gantt charts and heavyweight process.

But the Agile Manifesto was written with an unstated assumption so fundamental that nobody thought to say it aloud: **humans write all the code.**

Every practice built on the manifesto's assumptions — Scrum's two-week sprints, SAFe's velocity tracking, daily standups, story points, pair programming, retrospectives — is calibrated to the pace, cognition, and coordination needs of human teams. When autonomous agents can generate functional applications in hours, execute legacy migrations during a single flight, and run verification pipelines that dwarf what any human QA team could attempt in a quarter, these practices do not merely feel dated. They become structural liabilities <sup>[1](beyond-agile-sources.md#ref-1)</sup><sup>[5](beyond-agile-sources.md#ref-5)</sup>.

Steve Jones, in his widely-circulated essay "AI Killed the Agile Manifesto," argues that the manifesto is "a great way to screw up in a big way when using Agentic SDLCs at scale" because "Agentic SDLCs are too fast for Agile" <sup>[1](beyond-agile-sources.md#ref-1)</sup>. The P3 Group's *From Sprints to Swarms* white paper goes further, calling established agile frameworks "strategic liabilities" that throttle innovation when confronted with AI-driven workflows, and declaring the daily standup "an exercise in absurdity" when an AI orchestrator knows the precise status of every task at any given microsecond <sup>[5](beyond-agile-sources.md#ref-5)</sup>.

Not everyone agrees. Jon Kern, one of the original seventeen signatories, describes himself as "smitten" with vibe coding but insists the manifesto "will endure" — arguing that you "need to understand agility more than ever" and should "learn a little bit more about what constitutes the ability to create high-quality software at speed with responsibility" <sup>[10](beyond-agile-sources.md#ref-10)</sup>. Martin Fowler, hosting a 25th-anniversary workshop at Thoughtworks, said he doesn't "have a lot of time for manifestos" and that writing a new one is "way too early" — though the workshop itself concluded that test-driven development "has never been more important" and "produces dramatically better results from AI coding agents" <sup>[9](beyond-agile-sources.md#ref-9)</sup><sup>[16](beyond-agile-sources.md#ref-16)</sup>. According to InfoQ's summary of Forrester's 2025 State of Agile Development report (primary report not publicly available), 95% of surveyed professionals affirm Agile's critical relevance <sup>[14](beyond-agile-sources.md#ref-14)</sup>.

But relevance and sufficiency are not the same thing. A compass is relevant in a car, but it does not replace the steering wheel. The Agile Manifesto remains relevant as a philosophical compass. It is fundamentally insufficient as an operating system for agentic engineering.

---

## Contents

### [Where Agile Breaks: Ten Structural Failures](beyond-agile-failures.md)

The four Agile values challenged, the practices rendered obsolete, and the
conceptual gaps — memory, non-determinism, self-improving systems — that
Agile never addressed because it never needed to.

### [The Existing Manifestos: What They Get Right and What They Miss](beyond-agile-landscape.md)

A critical review of every competing framework: Casey West's Agentic
Manifesto, the SASE Framework, the DEV Community manifesto, P3 Group's
"From Sprints to Swarms," the AWS Prescriptive Guidance, and ISO/IEC 5338.

### [Sources](beyond-agile-sources.md)

Sixty cited sources classified by type: press, blog, industry, academic,
standard, and internal reference.

---

## What Is Actually Needed: The Case for a New Agentic Engineering Manifesto

Every existing framework gets something right. None of them are complete. The gap is not philosophical — it is operational. The industry needs a manifesto that is simultaneously:

1. **Philosophical** — values that reframe priorities for a probabilistic world
2. **Principled** — concrete engineering principles with minimum bars
3. **Operational** — connected to real tooling and measurable outcomes
4. **Evolutionary** — a maturity spectrum, not a binary switch

The [Agentic Engineering Manifesto](manifesto.md) — six core values, twelve principles mapped to operational tooling, an agentic definition of done, and a maturity spectrum from first adoption to recursive self-improvement — is one attempt to meet this standard. Whether it succeeds is for the engineering community to determine through practice, evidence, and iteration.

What recent agentic-AI research adds is a stronger explanation of *why* a new
discipline is needed. If intelligence at frontier scale is increasingly plural,
relational, and organized through internal or external societies of thought,
then the engineering problem is no longer "how do we steer one smart assistant?"
It becomes: how do we govern distributed cognition across agents, tools, and
humans using explicit protocols, evidence, and institutional checks and
balances? Likewise, if agents can improve by externalizing reusable skills and
refining them through experience, then memory governance is no longer a nice-
to-have optimization. It becomes part of the control plane for learning systems
<sup>[59](beyond-agile-sources.md#ref-59)</sup><sup>[60](beyond-agile-sources.md#ref-60)</sup>.

---

## The Urgency

Gartner predicts that over 40% of enterprise agentic AI projects will be canceled by end of 2027, citing escalating costs, ambiguous value, and inadequate risk controls as contributing factors <sup>[8](beyond-agile-sources.md#ref-8)</sup>. Gartner also identifies "agent washing" — vendors rebranding legacy automation as "agentic AI" — as a primary driver of disillusionment <sup>[8](beyond-agile-sources.md#ref-8)</sup>. While Gartner does not explicitly attribute these failures to methodology mismatch, the pattern is consistent with organizations attempting to force non-deterministic, probabilistic agents into rigid, legacy SDLC workflows — a structural gap that methodology alone cannot close but that methodology must address.

The failure is not only technical — it is organizational. Enterprises are trying to adopt agentic technology using Agile governance structures designed for human teams. The Sprint Review is the governance checkpoint, but who reviews agent output at machine speed? The Scrum Master is the process guardian, but who governs a recursive feedback loop? The Product Owner is the requirements authority, but who owns the specification that constrains agent behavior across a swarm? These roles do not map to agentic engineering, and the P3 Group's observation that organizations face a choice between evolutionary and revolutionary adoption <sup>[5](beyond-agile-sources.md#ref-5)</sup> understates the challenge: most organizations are attempting neither, clinging instead to methodologies calibrated for a world that no longer exists.

The industry is repeating the pattern it followed with every previous paradigm shift: rushing to adopt the new technology while clinging to the old methodology. The two-week sprint does not accommodate machine-speed execution. Story points do not measure probabilistic output. Human code review does not scale to agent-generated volume. Standups do not synchronize digital swarms. Early empirical evidence confirms the scale of the problem: the SWE-CI benchmark, testing 18 models across 100 tasks spanning an average of 233 days of real development history, found that most agents introduce at least one regression in three out of four CI iterations — many of them structural regressions that pass current tests but degrade the codebase's capacity for future change <sup>[22](beyond-agile-sources.md#ref-22)</sup>.

The question is not whether the Agile Manifesto needs a successor. The question is whether the successor will emerge from principled engineering or from the wreckage of failed projects.

The window is closing. Every month without a coherent engineering discipline for agentic systems is another month of "vibe coding" masquerading as engineering, another month of hallucination loops shipping to production, another month of technical debt accruing at machine speed. The organizations that adopt a rigorous agentic engineering manifesto now — with verified outcomes, governed autonomy, curated memory, defense-in-depth architecture, economics-aware routing, formal verification where risk warrants it, and human accountability at every tier — will define the next era of software. The rest risk becoming Gartner's statistic.

*Exploration is a phase. Engineering is a discipline.*
