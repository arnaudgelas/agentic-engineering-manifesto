# Beyond Agile: Why the Software Industry Urgently Needs a New Manifesto

*The Agile Manifesto was written for a world where humans wrote all the code. That world no longer exists.*

---

## The Agile Manifesto Is Twenty-Five Years Old — and It Shows

In February 2001, seventeen software developers gathered at a ski lodge in Snowbird, Utah, and wrote a document that would reshape an industry. The Agile Manifesto was a rebellion against waterfall bureaucracy, and it won. Its four values — individuals and interactions, working software, customer collaboration, responding to change — liberated a generation of engineers from Gantt charts and heavyweight process.

But the Agile Manifesto was written with an unstated assumption so fundamental that nobody thought to say it aloud: **humans write all the code.**

Every practice built on the manifesto's assumptions — Scrum's two-week sprints, SAFe's velocity tracking, daily standups, story points, pair programming, retrospectives — is calibrated to the pace, cognition, and coordination needs of human teams. When autonomous agents can generate functional applications in hours, execute legacy migrations during a single flight, and run verification pipelines that dwarf what any human QA team could attempt in a quarter, these practices do not merely feel dated. They become structural liabilities <sup>[1](#ref-1)</sup><sup>[5](#ref-5)</sup>.

Steve Jones, in his widely-circulated essay "AI Killed the Agile Manifesto," argues that the manifesto is "a great way to screw up in a big way when using Agentic SDLCs at scale" because "Agentic SDLCs are too fast for Agile" <sup>[1](#ref-1)</sup>. The P3 Group's *From Sprints to Swarms* white paper goes further, calling established agile frameworks "strategic liabilities" that throttle innovation when confronted with AI-driven workflows, and declaring the daily standup "an exercise in absurdity" when an AI orchestrator knows the precise status of every task at any given microsecond <sup>[5](#ref-5)</sup>.

Not everyone agrees. Jon Kern, one of the original seventeen signatories, describes himself as "smitten" with vibe coding but insists the manifesto "will endure" — arguing that you "need to understand agility more than ever" and should "learn a little bit more about what constitutes the ability to create high-quality software at speed with responsibility" <sup>[10](#ref-10)</sup>. Martin Fowler, hosting a 25th-anniversary workshop at Thoughtworks, said he doesn't "have a lot of time for manifestos" and that writing a new one is "way too early" — though the workshop itself concluded that test-driven development "has never been more important" and "produces dramatically better results from AI coding agents" <sup>[9](#ref-9)</sup><sup>[16](#ref-16)</sup>. According to InfoQ's summary of Forrester's 2025 State of Agile Development report (primary report not publicly available), 95% of surveyed professionals affirm Agile's critical relevance <sup>[14](#ref-14)</sup>.

But relevance and sufficiency are not the same thing. A compass is relevant in a car, but it does not replace the steering wheel. The Agile Manifesto remains relevant as a philosophical compass. It is fundamentally insufficient as an operating system for agentic engineering.

---

## Where Agile Breaks: Ten Structural Failures

The failures are not cosmetic. They are structural — rooted in assumptions that no longer hold. Some belong to the Agile Manifesto itself: its four values, written for a human-only world. Others belong to the practices that grew around it — Scrum's sprints, SAFe's velocity tracking, the ceremonies and metrics that became the operational expression of Agile but were never part of the original document. The distinction matters: the manifesto is a philosophical statement; the practices are an implementation. Both break, but for different reasons.

### The Four Values — Challenged

### 1. "Individuals and interactions over processes and tools" — Inverted

This was Agile's most liberating principle: trust people, not bureaucracy. But in an agentic pipeline, the toolchain *is* the capability. The choice of orchestration platform, the choice of verification fleet, the choice of memory infrastructure — these are not implementation details. They are architectural decisions that determine what is possible. Using one tool versus another creates fundamentally different operational realities <sup>[1](#ref-1)</sup>.

Processes and tools are now fundamental to success, not obstacles to it. The human's role has shifted from writing code to architecting the environment in which agents write code. The Agile Manifesto's founding value has been inverted by the reality it never anticipated <sup>[1](#ref-1)</sup><sup>[6](#ref-6)</sup>.

### 2. "Working software over comprehensive documentation" — Dangerous

This value was a corrective against waterfall's thousand-page specifications that nobody read. It made sense when humans wrote code deliberately and could explain their reasoning. It is actively dangerous when applied to autonomous agents.

AI models excel at producing software that *appears* to work. Jones calls this out directly: "AI is spectacular at building software that looks like it works" but "can create technical debt at a rate that normal developers absolutely couldn't" <sup>[1](#ref-1)</sup>. The phenomenon — what Andrej Karpathy termed "vibe coding" <sup>[7](#ref-7)</sup> — generates code satisfying immediate tests while lacking modularity, architectural integrity, and scalability. Without documentation serving as the contractual boundary holding agents accountable, systems hallucinate from legacy training data and corrupt their own operational context <sup>[1](#ref-1)</sup><sup>[3](#ref-3)</sup>.

In agentic engineering, **documentation is the specification that constrains agent behavior**. Architecture Decision Records, formal contracts, constraint files, capability definitions — these are not bureaucratic overhead. They are the machine-readable rules that prevent autonomous systems from optimizing for the wrong thing. The Agile Manifesto's suspicion of documentation becomes negligence when your workforce is probabilistic <sup>[3](#ref-3)</sup><sup>[6](#ref-6)</sup>.

### 3. "Customer collaboration over contract negotiation" — Reframed

Agile rightly elevated direct customer collaboration over adversarial contract negotiations. But in an agentic system, the "contract" is no longer a legal document between humans — it is the machine-readable specification that governs agent behavior. The agent does not collaborate; it executes within constraints. If those constraints are vague, the agent will fill the gaps with its own probabilistic inference — and the customer will receive something nobody specified <sup>[3](#ref-3)</sup>.

Contract negotiation has been reborn as specification engineering: defining precise, testable, machine-enforceable boundaries. The collaboration happens between humans during specification. The contract happens between human intent and agent execution <sup>[4](#ref-4)</sup><sup>[11](#ref-11)</sup>.

### 4. "Responding to change over following a plan" — Incomplete

Agile rightly valued adaptability over rigid upfront planning. But it assumed the entity responding to change was a human with judgment, context, and accountability. When agents respond to change, they do so probabilistically — and without the judgment to know when adaptation has become drift <sup>[3](#ref-3)</sup>.

Agentic systems need something the Agile Manifesto never contemplated: **specifications that steer behavior and evolve through evidence**. Not rigid plans, but not unconstrained adaptation either. Living specifications that tighten through iterative refinement — specify, execute, evaluate, adjust — with convergence criteria that distinguish productive evolution from scope drift <sup>[3](#ref-3)</sup><sup>[4](#ref-4)</sup>.

The four Agile values each assumed a human-only world. But the structural failures extend beyond the values themselves — into the practices, metrics, and ceremonies that Scrum, SAFe, and related frameworks built on top of those values.

### The Practices — Obsolete

### 5. Sprint Cadences Are Irrelevant to Machine-Speed Execution

A two-week sprint assumes human pace. When agents can complete a full development cycle in hours <sup>[1](#ref-1)</sup>, the sprint boundary is not just arbitrary — it is a bottleneck that prevents the system from shipping validated increments the moment they are architecturally sound <sup>[5](#ref-5)</sup><sup>[11](#ref-11)</sup>.

The replacement is continuous flow with verification gates: agents produce work continuously, and every increment passes through deterministic checks, evaluation harnesses, and proof generation before it advances. The cadence is not time-boxed — it is evidence-gated <sup>[4](#ref-4)</sup><sup>[11](#ref-11)</sup>.

### 6. Estimation and Velocity Tracking Lose Meaning

Story points and velocity metrics assume human cognitive throughput as the constraint. When an agent can generate ten implementations in the time a human would estimate one, velocity tracking measures the wrong thing <sup>[5](#ref-5)</sup>. The meaningful metric becomes **total cost of correctness** (the sum of inference spend, verification overhead, and incident remediation when failures escape) — not story points completed <sup>[3](#ref-3)</sup><sup>[18](#ref-18)</sup>.

The economics shift runs deeper than metrics. In Agile, cost is simple: developers cost X per sprint, multiply by sprints. In agentic engineering, the cost model is per-token, per-model, per-task — and it varies by orders of magnitude depending on which model is routed to which task. Sending every task to the most capable model is like flying first-class for a cross-town trip; sending every task to the cheapest is like taking a bicycle to the airport. The Agile Manifesto has no vocabulary for **economics-aware routing** — selecting which model handles which task based on the cost-quality tradeoff — because it never needed one <sup>[17](#ref-17)</sup>. The Gartner prediction that 40% of agentic projects will be canceled cites "escalating costs" as a primary driver <sup>[8](#ref-8)</sup> — this is precisely the problem: organizations burning through inference budgets because they lack cost-quality routing discipline.

### 7. Human Code Review Becomes the Bottleneck

When agents produce code at machine speed, the human reviewer becomes the rate limiter. The Agile Manifesto has no answer for this because it never imagined a world where code generation was not the bottleneck <sup>[18](#ref-18)</sup>. The answer requires tiered verification: deterministic checks filter autonomously, statistical evaluation filters semi-autonomously, and human review focuses exclusively on high-risk deltas and policy exceptions <sup>[13](#ref-13)</sup><sup>[18](#ref-18)</sup>.

### The Conceptual Gaps — Missing Entirely

### 8. No Framework for Non-Deterministic Behavior

This is the deepest category of failure — concepts that neither the manifesto nor its derivative practices ever addressed, because they did not need to. Agile assumes deterministic execution: write code, run tests, the same input produces the same output. Agents are probabilistic. The same specification can produce different implementations across runs. The same tool call can produce different results depending on context window contents, model temperature, and retrieved memory <sup>[3](#ref-3)</sup><sup>[4](#ref-4)</sup>.

The Agile Manifesto has no vocabulary for emergence, containment, hallucination loops, memory poisoning, or probability-compounding across multi-agent systems <sup>[4](#ref-4)</sup><sup>[13](#ref-13)</sup>. These are not edge cases — they are routine operating conditions in agentic engineering.

### 9. No Concept of Systems That Learn from Their Own Execution

This may be the most consequential failure — the one that generates all the others. Agile's feedback loop is the retrospective: humans reflecting on what happened, deciding what to change, implementing changes in the next sprint. That loop runs on a two-week cadence because it requires human cognition. The feedback is soft — "we should try shorter sprints," "let's refine our definition of done."

Agentic systems have a qualitatively different feedback loop. Errors, logs, successes, and failures feed back into the system in real-time. The system does not wait for a retrospective. It does not require human reflection to adapt. The feedback is hard, unambiguous signals: passing tests, zero runtime errors, validated API responses, converging evaluation metrics <sup>[2](#ref-2)</sup><sup>[17](#ref-17)</sup>. This is not merely faster iteration — it is a different kind of learning. Reasoning consolidation cycles can compress chains of inference using reinforcement-learning algorithms in seconds. Meta-cognitive layers enable systems to monitor and modify their own operational parameters. Self-optimizing architectures adapt query and retrieval strategies in microseconds based on access patterns <sup>[19](#ref-19)</sup>.

The Agile Manifesto has no concept of a system that improves its own process without human intervention. It assumes the learner is human, the cadence is weekly, and the feedback requires interpretation. In agentic systems, the learner is the system itself, the cadence is continuous, and the feedback is machine-readable. This is not an incremental improvement over retrospectives — it is a paradigm shift that Agile's vocabulary cannot express <sup>[2](#ref-2)</sup>.

### 10. No Treatment of Memory as Infrastructure

Agile's concept of institutional memory is tribal knowledge and documentation that nobody reads. There is no Agile practice for curating, governing, or versioning what the organization *knows* — let alone what it has *learned*. In an agentic system, this gap is fatal.

An agent without persistent memory — whether internalized or externalized through retrieval layers, episodic stores, or vector databases — must be reconstructed from scratch for every task. Some architectures externalize memory entirely, separating the agent from its state. But the memory still exists as infrastructure; it still requires curation, governance, and retrieval engineering. The question is not whether memory is needed but where it lives and who governs it. In practice, the distinction between a stateless tool and a memory-augmented agent is the ability to accumulate, curate, and act on context across invocations <sup>[19](#ref-19)</sup>. And memory itself is not monolithic: knowledge (what was given) and learned memory (what was discovered through execution) are distinct infrastructure with different curation, governance, and retrieval requirements <sup>[17](#ref-17)</sup>.

Context windows are finite. What goes into them determines what comes out. **Memory governance** — the discipline of deciding what to retain, what to forget, how to retrieve, and how to prevent poisoning of an agent's accumulated context — is an engineering discipline as consequential as database design. The Agile Manifesto treats memory as overhead. Agentic engineering treats it as infrastructure <sup>[3](#ref-3)</sup>.

---

## The Existing Manifestos: What They Get Right and What They Miss

The industry has not been idle. Multiple manifestos and frameworks have emerged to fill the vacuum. But none of them are sufficient.

### Casey West's Agentic Manifesto

**What it gets right:** The shift from verification ("did it do what I said?") to validation ("did it do what I wanted?"). The Agentic Delivery Lifecycle (ADLC) across five non-linear phases. The "Determinism Gap" — the fundamental difference between a system whose output is known in advance and one whose output is discovered in real-time. The emphasis on continuous flow over time-boxed sprints. The insistence that human engineers and agents must work together continuously, rejecting fully unsupervised delegation <sup>[4](#ref-4)</sup>.

**What it misses:** No treatment of memory as infrastructure — West does not distinguish knowledge from learned memory or address memory governance. No economics-aware routing — no recognition that model choice is a runtime decision with cost implications <sup>[17](#ref-17)</sup>. No framework for formal verification or proof generation — and this matters because when execution is non-deterministic, at least one layer of the verification pyramid must be provably correct; emerging executable specification languages and verification-aware compilers are beginning to make this feasible, though production-scale evidence remains limited <sup>[12](#ref-12)</sup><sup>[19](#ref-19)</sup>. No treatment of swarm topology as an engineering decision. The manifesto reads as a philosophical reframe of Agile rather than a new engineering discipline.

### The SASE Framework (Academic SE 3.0)

**What it gets right:** The dual modality of SE4H (Software Engineering for Humans) and SE4A (Software Engineering for Agents). The elevation of the developer from syntax author to "Agent Coach." The structured artifacts: BriefingScripts, Merge-Readiness Packs (MRPs), Consultation Request Packs (CRPs). The separation of Agent Command Environment (ACE) and Agent Execution Environment (AEE). The Plan-Do-Assess-Review (PDAR) loop with agent-initiated callbacks <sup>[12](#ref-12)</sup>.

**What it misses:** Overly academic — lacks operational tooling references. No treatment of cost-quality routing. No framework for memory governance beyond "institutional memory." No recognition that formal verification and statistical evaluation are complementary disciplines with different cost curves <sup>[19](#ref-19)</sup>. No treatment of self-improving recursive systems.

### The DEV Community "Agentic Manifesto"

**What it gets right:** Four values that correctly reframe priorities: human intent over exhaustive requirements, continuous flow over sprints, architectural integrity over feature output, automated validation over manual estimation <sup>[11](#ref-11)</sup>.

**What it misses:** Values without principles are aspirational, not operational. No definition of "done." No treatment of observability, memory, domain boundaries, or accountability. No framework for what happens when architectural integrity conflicts with continuous flow. No recognition that "automated validation" requires a multi-layered verification pyramid (deterministic → statistical → formal → human) rather than a single binary gate <sup>[13](#ref-13)</sup>.

### The P3 Group's "From Sprints to Swarms"

**What it gets right:** The most thorough deconstruction of how specific Agile practices (standups, sprints, estimation, retrospectives) fail under agentic workflows. The strategic framing of evolutionary versus revolutionary adoption paths. The recognition that the Agile Manifesto's *values* can survive as governance principles even as its *practices* become obsolete <sup>[5](#ref-5)</sup>.

**What it misses:** Primarily diagnostic rather than prescriptive. Identifies what breaks but does not provide the replacement engineering discipline with sufficient depth. No treatment of formal verification, memory governance, or economics-aware routing. No operational tooling framework.

### The AWS Prescriptive Guidance

**What it gets right:** "Zones of intent" — bounded operational spaces where agents have high autonomy within architectural constraints. The evolution from "Sprint Planning" to "Intent Design." The recognition that "done" must be redefined as runtime readiness with observability, explainable traces, and feedback mechanisms <sup>[3](#ref-3)</sup>.

**What it misses:** Vendor-contextualized (AWS-centric). No treatment of multi-vendor swarm coordination. No framework for formal verification. Limited treatment of memory and learning systems.

### ISO/IEC 5338:2023

**What it gets right:** Among the first comprehensive international frameworks for AI system lifecycle processes <sup>[20](#ref-20)</sup>. The integration of Model Engineering into standard Implementation processes. The mandate for Continuous Validation — acknowledging that AI agents can suffer from context drift, hallucination, and data staleness over time. The emphasis on bias mitigation, transparency, and purpose-binding for training data <sup>[15](#ref-15)</sup>.

**What it misses:** Designed for AI systems broadly, not for agentic engineering specifically. No treatment of multi-agent coordination, swarm topologies, or inter-agent trust. No framework for memory governance, economics-aware routing, or self-improving systems. Compliance-oriented rather than engineering-oriented.

---

## What Is Actually Needed: The Case for a New Agentic Engineering Manifesto

Every existing framework gets something right. None of them are complete. The gap is not philosophical — it is operational. The industry needs a manifesto that is simultaneously:

1. **Philosophical** — values that reframe priorities for a probabilistic world
2. **Principled** — concrete engineering principles with minimum bars
3. **Operational** — connected to real tooling and measurable outcomes
4. **Evolutionary** — a maturity spectrum, not a binary switch

The [Agentic Engineering Manifesto](manifesto-agentic-engineering.md) — six core values, twelve principles mapped to operational tooling, an agentic definition of done, and a maturity spectrum from first adoption to recursive self-improvement — is one attempt to meet this standard. Whether it succeeds is for the engineering community to determine through practice, evidence, and iteration.

---

## The Urgency

Gartner predicts that over 40% of enterprise agentic AI projects will be canceled by end of 2027, citing escalating costs, ambiguous value, and inadequate risk controls as contributing factors <sup>[8](#ref-8)</sup>. Gartner also identifies "agent washing" — vendors rebranding legacy automation as "agentic AI" — as a primary driver of disillusionment <sup>[8](#ref-8)</sup>. While Gartner does not explicitly attribute these failures to methodology mismatch, the pattern is consistent with organizations attempting to force non-deterministic, probabilistic agents into rigid, legacy SDLC workflows — a structural gap that methodology alone cannot close but that methodology must address.

The failure is not only technical — it is organizational. Enterprises are trying to adopt agentic technology using Agile governance structures designed for human teams. The Sprint Review is the governance checkpoint, but who reviews agent output at machine speed? The Scrum Master is the process guardian, but who governs a recursive feedback loop? The Product Owner is the requirements authority, but who owns the specification that constrains agent behavior across a swarm? These roles do not map to agentic engineering, and the P3 Group's observation that organizations face a choice between evolutionary and revolutionary adoption <sup>[5](#ref-5)</sup> understates the challenge: most organizations are attempting neither, clinging instead to methodologies calibrated for a world that no longer exists.

The industry is repeating the pattern it followed with every previous paradigm shift: rushing to adopt the new technology while clinging to the old methodology. The two-week sprint does not accommodate machine-speed execution. Story points do not measure probabilistic output. Human code review does not scale to agent-generated volume. Standups do not synchronize digital swarms.

The question is not whether the Agile Manifesto needs a successor. The question is whether the successor will emerge from principled engineering or from the wreckage of failed projects.

The window is closing. Every month without a coherent engineering discipline for agentic systems is another month of "vibe coding" masquerading as engineering, another month of hallucination loops shipping to production, another month of technical debt accruing at machine speed. The organizations that adopt a rigorous agentic engineering manifesto now — with verified outcomes, governed autonomy, curated memory, defense-in-depth architecture, economics-aware routing, formal verification where risk warrants it, and human accountability at every tier — will define the next era of software. The rest risk becoming Gartner's statistic.

*Exploration is a phase. Engineering is a discipline.*

---

## Sources {#sources}

*Sources are classified by type: [P] press/trade, [B] blog/opinion, [I] industry/vendor, [A] academic, [S] standard, [R] internal reference.*

<a id="ref-1"></a>[1] S. Jones, "AI Killed the Agile Manifesto," *MetaMirror* (blog), Jan 2026. [B] https://blog.metamirror.io/ai-killed-the-agile-manifesto-805ad9a639db

<a id="ref-2"></a>[2] Infosys, "How Is AI-Native Software Development Lifecycle Disrupting Traditional Software Development?" *Infosys IKI TechCompass*, 2025. [I] https://www.infosys.com/iki/techcompass/ai-native-software-development-lifecycle.html

<a id="ref-3"></a>[3] AWS, "Evolving Software Delivery for Agentic AI," *AWS Prescriptive Guidance*, 2026. [I] https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-operationalizing-agentic-ai/software-delivery.html

<a id="ref-4"></a>[4] C. West, "The Agentic Manifesto: Engineering in the Era of Autonomy," *caseywest.com*, Nov 2025. [B] https://caseywest.com/the-agentic-manifesto/

<a id="ref-5"></a>[5] P3 Group, "From Sprints to Swarms: Navigating the Post-Agile Future in the Age of AI," *P3 Group White Paper*, Sep 2025. [I] https://www.p3-group.com/en/p3-updates/navigating-the-post-agile-future-in-the-age-of-ai/

<a id="ref-6"></a>[6] D. Shortino, "The Software Development Lifecycle as We Know It Is Over," *WebProNews*, Jan 2026. [P] https://www.webpronews.com/the-software-development-lifecycle-as-we-know-it-is-over-and-ai-agents-are-writing-the-obituary/

<a id="ref-7"></a>[7] D. Rubinstein, "Is Agile Dead in the Age of AI?" *SD Times*, 2025. [P] https://sdtimes.com/agile/is-agile-dead-in-the-age-of-ai/

<a id="ref-8"></a>[8] Gartner, "Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027," *Gartner Press Release*, Jun 2025. [I] https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027

<a id="ref-9"></a>[9] L. Claburn, "Test-Driven Development Ideal for AI, Says Agile Workshop," *The Register*, Feb 2026. [P] https://www.theregister.com/2026/02/20/from_agile_to_ai_anniversary/

<a id="ref-10"></a>[10] L. Claburn, "Agile Manifesto Co-Author 'Smitten' with Vibe Coding," *The Register*, Feb 2026. [P] https://www.theregister.com/2026/02/19/jon_kern_vibe_coding/

<a id="ref-11"></a>[11] crywolfe, "The Agentic Manifesto: Why Agile Is Breaking in the Age of AI Agents," *DEV Community*, 2025. [B] https://dev.to/crywolfe/the-agentic-manifesto-why-agile-is-breaking-in-the-age-of-ai-agents-1939

<a id="ref-12"></a>[12] R. Feldt et al., "Agentic Software Engineering: Foundational Pillars and a Research Roadmap," *arXiv:2509.06216v2*, Sep 2025. [A] https://arxiv.org/html/2509.06216v2

<a id="ref-13"></a>[13] B. Linders, "From Prompts to Production: A Playbook for Agentic Development," *InfoQ*, 2026. [P] https://www.infoq.com/articles/prompts-to-production-playbook-for-agentic-development/

<a id="ref-14"></a>[14] B. Linders, "Does AI Make the Agile Manifesto Obsolete?" *InfoQ*, Feb 2026. Note: cites Forrester's 2025 State of Agile Development report; primary report not publicly available. [P] https://www.infoq.com/news/2026/02/ai-agile-manifesto-debate/

<a id="ref-15"></a>[15] Software Improvement Group, "ISO/IEC 5338: Get to Know the Global Standard on AI Systems," *SIG Blog*, 2024. [I] https://www.softwareimprovementgroup.com/blog/iso-5338-get-to-know-the-global-standard-on-ai-systems/

<a id="ref-16"></a>[16] T. Claburn, "From Agile to AI: Anniversary Workshop Says Test-Driven Development Ideal for AI Coding," *DevClass*, Feb 2026. [P] https://www.devclass.com/development/2026/02/21/should-there-be-a-new-manifesto-for-ai-development/4091612

<a id="ref-17"></a>[17] Y. Zhou, "2025 Overpromised AI Agents. 2026 Demands Agentic Engineering," *Medium*, Jan 2026. [B] https://medium.com/generative-ai-revolution-ai-native-transformation/2025-overpromised-ai-agents-2026-demands-agentic-engineering-5fbf914a9106

<a id="ref-18"></a>[18] Svngoku, "2026 Agentic Coding Trends — Implementation Guide," *Hugging Face Blog*, 2026. [B] https://huggingface.co/blog/Svngoku/agentic-coding-trends-2026

<a id="ref-19"></a>[19] L. Cabrera-Diego et al., "Toward Agentic Software Engineering Beyond Code: Framing Vision, Values, and Vocabulary," *arXiv:2510.19692v2*, Oct 2025. [A] https://arxiv.org/html/2510.19692v2

<a id="ref-20"></a>[20] ISO/IEC, "ISO/IEC 5338:2023 — Information technology — AI system life cycle processes," *International Organization for Standardization*, 2023. [S] https://www.iso.org/standard/81118.html
