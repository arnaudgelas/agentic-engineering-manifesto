# Beyond Agile: Why the Software Industry Urgently Needs a New Manifesto

*The Agile Manifesto was written for a world where humans wrote all the code. That world no longer exists.*

---

## The Agile Manifesto Is Twenty-Five Years Old — and It Shows

In February 2001, seventeen software developers gathered at a ski lodge in Snowbird, Utah, and wrote a document that would reshape an industry. The Agile Manifesto was a rebellion against waterfall bureaucracy, and it won. Its four values — individuals and interactions, working software, customer collaboration, responding to change — liberated a generation of engineers from Gantt charts and heavyweight process.

But the Agile Manifesto was written with an unstated assumption so fundamental that nobody thought to say it aloud: **humans write all the code.**

Every practice that flows from the manifesto — two-week sprints, daily standups, story points, pair programming, retrospectives — is calibrated to the pace, cognition, and coordination needs of human teams. When autonomous agents can generate functional applications in hours, execute legacy migrations during a single flight, and run verification pipelines that dwarf what any human QA team could attempt in a quarter, these practices do not merely feel dated. They become structural liabilities [[1]](https://blog.metamirror.io/ai-killed-the-agile-manifesto-805ad9a639db)[[5]](https://www.p3-group.com/en/p3-updates/navigating-the-post-agile-future-in-the-age-of-ai/).

Steve Jones (Executive VP at Capgemini), put it bluntly in his widely-circulated essay "AI Killed the Agile Manifesto," arguing that the manifesto is "a great way to screw up in a big way when using Agentic SDLCs at scale" because "Agentic SDLCs are too fast for Agile" [[1]](https://blog.metamirror.io/ai-killed-the-agile-manifesto-805ad9a639db). The P3 Group's *From Sprints to Swarms* white paper goes further, calling established agile frameworks "strategic liabilities" that throttle innovation when confronted with AI-driven workflows, and declaring the daily standup "an exercise in absurdity" when an AI orchestrator knows the precise status of every task at any given microsecond [[5]](https://www.p3-group.com/en/p3-updates/navigating-the-post-agile-future-in-the-age-of-ai/).

Not everyone agrees. Jon Kern, one of the original seventeen signatories, describes himself as "smitten" with vibe coding but insists the manifesto "will endure" — arguing that you "need to understand agility more than ever" and should "learn a little bit more about what constitutes the ability to create high-quality software at speed with responsibility" [[10]](https://www.theregister.com/2026/02/19/jon_kern_vibe_coding/). Martin Fowler, hosting a 25th-anniversary workshop at Thoughtworks, said he doesn't "have a lot of time for manifestos" and that writing a new one is "way too early" — though the workshop itself concluded that test-driven development "has never been more important" and "produces dramatically better results from AI coding agents" [[9]](https://www.theregister.com/2026/02/20/from_agile_to_ai_anniversary/)[[16]](https://www.devclass.com/development/2026/02/21/should-there-be-a-new-manifesto-for-ai-development/4091612). Forrester's 2025 State of Agile Development report found that 95% of professionals affirm Agile's critical relevance [[14]](https://www.infoq.com/news/2026/02/ai-agile-manifesto-debate/).

But relevance and sufficiency are not the same thing. A compass is relevant in a car, but it does not replace the steering wheel. The Agile Manifesto remains relevant as a philosophical compass. It is catastrophically insufficient as an operating system for agentic engineering.

---

## Where Agile Breaks: Eight Structural Failures

The failures are not cosmetic. They are structural — rooted in assumptions that no longer hold.

### 1. "Individuals and interactions over processes and tools" — Inverted

This was Agile's most liberating principle: trust people, not bureaucracy. But in an agentic pipeline, the toolchain *is* the capability. The choice of orchestration platform, the choice of verification fleet, the choice of memory infrastructure — these are not implementation details. They are architectural decisions that determine what is possible. Using one tool versus another creates fundamentally different operational realities [[1]](https://blog.metamirror.io/ai-killed-the-agile-manifesto-805ad9a639db).

Processes and tools are now fundamental to success, not obstacles to it. The human's role has shifted from writing code to architecting the environment in which agents write code. The Agile Manifesto's founding value has been inverted by the reality it never anticipated [[1]](https://blog.metamirror.io/ai-killed-the-agile-manifesto-805ad9a639db)[[6]](https://www.webpronews.com/the-software-development-lifecycle-as-we-know-it-is-over-and-ai-agents-are-writing-the-obituary/).

### 2. "Working software over comprehensive documentation" — Dangerous

This value was a corrective against waterfall's thousand-page specifications that nobody read. It made sense when humans wrote code deliberately and could explain their reasoning. It is actively dangerous when applied to autonomous agents.

AI models excel at producing software that *appears* to work. Jones calls this out directly: "AI is spectacular at building software that looks like it works" but "can create technical debt at a rate that normal developers absolutely couldn't" [[1]](https://blog.metamirror.io/ai-killed-the-agile-manifesto-805ad9a639db). The phenomenon — widely termed "vibe coding" [[10]](https://www.theregister.com/2026/02/19/jon_kern_vibe_coding/) — generates code satisfying immediate tests while lacking modularity, architectural integrity, and scalability. Without documentation serving as the contractual boundary holding agents accountable, systems hallucinate from legacy training data and corrupt their own operational context [[1]](https://blog.metamirror.io/ai-killed-the-agile-manifesto-805ad9a639db)[[3]](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-operationalizing-agentic-ai/software-delivery.html).

In agentic engineering, **documentation is the specification that constrains agent behavior**. Architecture Decision Records, formal contracts, constraint files, capability definitions — these are not bureaucratic overhead. They are the machine-readable rules that prevent autonomous systems from optimizing for the wrong thing. The Agile Manifesto's suspicion of documentation becomes negligence when your workforce is probabilistic [[3]](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-operationalizing-agentic-ai/software-delivery.html)[[6]](https://www.webpronews.com/the-software-development-lifecycle-as-we-know-it-is-over-and-ai-agents-are-writing-the-obituary/).

### 3. "Customer collaboration over contract negotiation" — Reframed

Agile rightly elevated direct customer collaboration over adversarial contract negotiations. But in an agentic system, the "contract" is no longer a legal document between humans — it is the machine-readable specification that governs agent behavior. The agent does not collaborate; it executes within constraints. If those constraints are vague, the agent will fill the gaps with its own probabilistic inference — and the customer will receive something nobody specified [[3]](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-operationalizing-agentic-ai/software-delivery.html).

Contract negotiation has been reborn as specification engineering: defining precise, testable, machine-enforceable boundaries. The collaboration happens between humans during specification. The contract happens between human intent and agent execution [[4]](https://caseywest.com/the-agentic-manifesto/)[[11]](https://dev.to/crywolfe/the-agentic-manifesto-why-agile-is-breaking-in-the-age-of-ai-agents-1939).

### 4. "Responding to change over following a plan" — Incomplete

Agile rightly valued adaptability over rigid upfront planning. But it assumed the entity responding to change was a human with judgment, context, and accountability. When agents respond to change, they do so probabilistically — and without the judgment to know when adaptation has become drift [[3]](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-operationalizing-agentic-ai/software-delivery.html).

Agentic systems need something the Agile Manifesto never contemplated: **specifications that steer behavior and evolve through evidence**. Not rigid plans, but not unconstrained adaptation either. Living specifications that tighten through iterative refinement — specify, execute, evaluate, adjust — with convergence criteria that distinguish productive evolution from scope drift [[3]](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-operationalizing-agentic-ai/software-delivery.html)[[4]](https://caseywest.com/the-agentic-manifesto/).

### 5. Sprint Cadences Are Irrelevant to Machine-Speed Execution

A two-week sprint assumes human pace. When agents can complete a full development cycle in hours [[1]](https://blog.metamirror.io/ai-killed-the-agile-manifesto-805ad9a639db), the sprint boundary is not just arbitrary — it is a bottleneck that prevents the system from shipping validated increments the moment they are architecturally sound [[5]](https://www.p3-group.com/en/p3-updates/navigating-the-post-agile-future-in-the-age-of-ai/)[[11]](https://dev.to/crywolfe/the-agentic-manifesto-why-agile-is-breaking-in-the-age-of-ai-agents-1939).

The replacement is continuous flow with verification gates: agents produce work continuously, and every increment passes through deterministic checks, evaluation harnesses, and proof generation before it advances. The cadence is not time-boxed — it is evidence-gated [[4]](https://caseywest.com/the-agentic-manifesto/)[[11]](https://dev.to/crywolfe/the-agentic-manifesto-why-agile-is-breaking-in-the-age-of-ai-agents-1939).

### 6. Estimation and Velocity Tracking Lose Meaning

Story points and velocity metrics assume human cognitive throughput as the constraint. When an agent can generate ten implementations in the time a human would estimate one, velocity tracking measures the wrong thing [[5]](https://www.p3-group.com/en/p3-updates/navigating-the-post-agile-future-in-the-age-of-ai/). The meaningful metric becomes **total cost of correctness** — inference cost plus verification cost plus incident remediation — not story points completed [[3]](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-operationalizing-agentic-ai/software-delivery.html)[[18]](https://huggingface.co/blog/Svngoku/agentic-coding-trends-2026).

### 7. Human Code Review Becomes the Bottleneck

When agents produce code at machine speed, the human reviewer becomes the rate limiter. The Agile Manifesto has no answer for this because it never imagined a world where code generation was not the bottleneck [[18]](https://huggingface.co/blog/Svngoku/agentic-coding-trends-2026). The answer requires tiered verification: deterministic checks filter autonomously, statistical evaluation filters semi-autonomously, and human review focuses exclusively on high-risk deltas and policy exceptions [[13]](https://www.infoq.com/articles/prompts-to-production-playbook-for-agentic-development/)[[18]](https://huggingface.co/blog/Svngoku/agentic-coding-trends-2026).

### 8. No Framework for Non-Deterministic Behavior

This is the deepest failure. Agile assumes deterministic execution: write code, run tests, the same input produces the same output. Agents are probabilistic. The same specification can produce different implementations across runs. The same tool call can produce different results depending on context window contents, model temperature, and retrieved memory [[3]](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-operationalizing-agentic-ai/software-delivery.html)[[4]](https://caseywest.com/the-agentic-manifesto/).

The Agile Manifesto has no vocabulary for emergence, containment, hallucination loops, memory poisoning, or probability-compounding across multi-agent systems [[4]](https://caseywest.com/the-agentic-manifesto/)[[13]](https://www.infoq.com/articles/prompts-to-production-playbook-for-agentic-development/). These are not edge cases — they are the default operating conditions of agentic engineering.

---

## The Existing Manifestos: What They Get Right and What They Miss

The industry has not been idle. Multiple manifestos and frameworks have emerged to fill the vacuum. But none of them are sufficient.

### Casey West's Agentic Manifesto

**What it gets right:** The shift from verification ("did it do what I said?") to validation ("did it do what I wanted?"). The Agentic Delivery Lifecycle (ADLC) across five non-linear phases. The "Determinism Gap" — the fundamental difference between a system whose output is known in advance and one whose output is discovered in real-time. The emphasis on continuous flow over time-boxed sprints. The insistence that human engineers and agents must work together continuously, rejecting fully unsupervised delegation [[4]](https://caseywest.com/the-agentic-manifesto/).

**What it misses:** No treatment of memory as infrastructure. No framework for distinguishing knowledge from learned memory, or for governing either. No economics-aware routing — no recognition that model choice is a runtime decision with cost implications. No framework for formal verification or proof generation. No treatment of swarm topology as an engineering decision. The manifesto reads as a philosophical reframe of Agile rather than a new engineering discipline.

### The SASE Framework (Academic SE 3.0)

**What it gets right:** The dual modality of SE4H (Software Engineering for Humans) and SE4A (Software Engineering for Agents). The elevation of the developer from syntax author to "Agent Coach." The structured artifacts: BriefingScripts, Merge-Readiness Packs (MRPs), Consultation Request Packs (CRPs). The separation of Agent Command Environment (ACE) and Agent Execution Environment (AEE). The Plan-Do-Assess-Review (PDAR) loop with agent-initiated callbacks [[12]](https://arxiv.org/html/2509.06216v2).

**What it misses:** Overly academic — lacks operational tooling references. No treatment of cost-quality routing. No framework for memory governance beyond "institutional memory." No recognition that formal verification and statistical evaluation are complementary disciplines with different cost curves. No treatment of self-improving recursive systems.

### The DEV Community "Agentic Manifesto"

**What it gets right:** Four values that correctly reframe priorities: human intent over exhaustive requirements, continuous flow over sprints, architectural integrity over feature output, automated validation over manual estimation [[11]](https://dev.to/crywolfe/the-agentic-manifesto-why-agile-is-breaking-in-the-age-of-ai-agents-1939).

**What it misses:** Values without principles are aspirational, not operational. No definition of "done." No treatment of observability, memory, domain boundaries, or accountability. No framework for what happens when architectural integrity conflicts with continuous flow. No recognition that "automated validation" requires a multi-layered verification pyramid (deterministic → statistical → formal → human) rather than a single binary gate.

### The P3 Group's "From Sprints to Swarms"

**What it gets right:** The most thorough deconstruction of how specific Agile practices (standups, sprints, estimation, retrospectives) fail under agentic workflows. The strategic framing of evolutionary versus revolutionary adoption paths. The recognition that the Agile Manifesto's *values* can survive as governance principles even as its *practices* become obsolete [[5]](https://www.p3-group.com/en/p3-updates/navigating-the-post-agile-future-in-the-age-of-ai/).

**What it misses:** Primarily diagnostic rather than prescriptive. Identifies what breaks but does not provide the replacement engineering discipline with sufficient depth. No treatment of formal verification, memory governance, or economics-aware routing. No operational tooling framework.

### The AWS Prescriptive Guidance

**What it gets right:** "Zones of intent" — bounded operational spaces where agents have high autonomy within architectural constraints. The evolution from "Sprint Planning" to "Intent Design." The recognition that "done" must be redefined as runtime readiness with observability, explainable traces, and feedback mechanisms [[3]](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-operationalizing-agentic-ai/software-delivery.html).

**What it misses:** Vendor-contextualized (AWS-centric). No treatment of multi-vendor swarm coordination. No framework for formal verification. Limited treatment of memory and learning systems.

### ISO/IEC 5338:2023

**What it gets right:** The first comprehensive international framework for AI system lifecycle processes. The integration of Model Engineering into standard Implementation processes. The mandate for Continuous Validation — acknowledging that AI agents can suffer from context drift, hallucination, and data staleness over time. The emphasis on bias mitigation, transparency, and purpose-binding for training data [[15]](https://www.softwareimprovementgroup.com/blog/iso-5338-get-to-know-the-global-standard-on-ai-systems/).

**What it misses:** Designed for AI systems broadly, not for agentic engineering specifically. No treatment of multi-agent coordination, swarm topologies, or inter-agent trust. No framework for memory governance, economics-aware routing, or self-improving systems. Compliance-oriented rather than engineering-oriented.

---

## What Is Actually Needed: The Case for a New Agentic Engineering Manifesto

Every existing framework gets something right. None of them are complete. The gap is not philosophical — it is operational. The industry needs a manifesto that is simultaneously:

1. **Philosophical** — values that reframe priorities for a probabilistic world
2. **Principled** — concrete engineering principles with minimum bars
3. **Operational** — connected to real tooling and measurable outcomes
4. **Evolutionary** — a maturity spectrum, not a binary switch

There is a strong need for a new Agentic Engineering Manifesto that addresses all four.

---

## The Urgency

Gartner predicts that over 40% of enterprise agentic AI projects will be canceled by end of 2027 — driven by escalating costs, ambiguous value, and inadequate risk controls [[8]](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027). A primary driver is "agent washing": vendors aggressively rebranding legacy automation as "agentic AI" without delivering genuine autonomous reasoning [[8]](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027). Organizations fundamentally fail because they attempt to force non-deterministic, probabilistic agents into rigid, legacy SDLC workflows [[8]](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027).

The industry is repeating the pattern it followed with every previous paradigm shift: rushing to adopt the new technology while clinging to the old methodology. The two-week sprint does not accommodate machine-speed execution. Story points do not measure probabilistic output. Human code review does not scale to agent-generated volume. Standups do not synchronize digital swarms.

The question is not whether the Agile Manifesto needs a successor. The question is whether the successor will emerge from principled engineering or from the wreckage of failed projects.

The window is closing. Every month without a coherent engineering discipline for agentic systems is another month of "vibe coding" masquerading as engineering, another month of hallucination loops shipping to production, another month of technical debt accruing at machine speed. The organizations that adopt a rigorous agentic engineering manifesto now — with verified outcomes, governed autonomy, curated memory, defense-in-depth architecture, economics-aware routing, formal verification where risk warrants it, and human accountability at every tier — will define the next era of software. The rest will become Gartner's statistic.

*Exploration is a phase. Engineering is a discipline.*

---

## Sources

[1] S. Jones, "AI Killed the Agile Manifesto," MetaMirror, Jan 2026. https://blog.metamirror.io/ai-killed-the-agile-manifesto-805ad9a639db

[2] Infosys, "How Is AI-Native Software Development Lifecycle Disrupting Traditional Software Development?" https://www.infosys.com/iki/techcompass/ai-native-software-development-lifecycle.html

[3] AWS, "Evolving Software Delivery for Agentic AI," AWS Prescriptive Guidance, 2026. https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-operationalizing-agentic-ai/software-delivery.html

[4] C. West, "The Agentic Manifesto: Engineering in the Era of Autonomy," 2025. https://caseywest.com/the-agentic-manifesto/

[5] P3 Group, "From Sprints to Swarms: Navigating the Post-Agile Future in the Age of AI," Sep 2025. https://www.p3-group.com/en/p3-updates/navigating-the-post-agile-future-in-the-age-of-ai/

[6] "The Software Development Lifecycle as We Know It Is Over," WebProNews, 2026. https://www.webpronews.com/the-software-development-lifecycle-as-we-know-it-is-over-and-ai-agents-are-writing-the-obituary/

[7] "Is Agile Dead in the Age of AI?" SD Times. https://sdtimes.com/agile/is-agile-dead-in-the-age-of-ai/

[8] Gartner, "Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027," Jun 2025. https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027

[9] "Test-Driven Development Ideal for AI, Says Agile Workshop," The Register, Feb 2026. https://www.theregister.com/2026/02/20/from_agile_to_ai_anniversary/

[10] "Agile Manifesto Co-Author 'Smitten' with Vibe Coding," The Register, Feb 2026. https://www.theregister.com/2026/02/19/jon_kern_vibe_coding/

[11] "The Agentic Manifesto: Why Agile Is Breaking in the Age of AI Agents," DEV Community. https://dev.to/crywolfe/the-agentic-manifesto-why-agile-is-breaking-in-the-age-of-ai-agents-1939

[12] "Agentic Software Engineering: Foundational Pillars and a Research Roadmap (SASE)," arXiv. https://arxiv.org/html/2509.06216v2

[13] "From Prompts to Production: A Playbook for Agentic Development," InfoQ. https://www.infoq.com/articles/prompts-to-production-playbook-for-agentic-development/

[14] "Does AI Make the Agile Manifesto Obsolete?" InfoQ, Feb 2026. https://www.infoq.com/news/2026/02/ai-agile-manifesto-debate/

[15] "ISO/IEC 5338: Get to Know the Global Standard on AI Systems," SIG. https://www.softwareimprovementgroup.com/blog/iso-5338-get-to-know-the-global-standard-on-ai-systems/

[16] "From Agile to AI: Anniversary Workshop Says Test-Driven Development Ideal for AI Coding," DevClass, Feb 2026. https://www.devclass.com/development/2026/02/21/should-there-be-a-new-manifesto-for-ai-development/4091612

[17] Y. Zhou, "2025 Overpromised AI Agents. 2026 Demands Agentic Engineering," Medium, Jan 2026. https://medium.com/generative-ai-revolution-ai-native-transformation/2025-overpromised-ai-agents-2026-demands-agentic-engineering-5fbf914a9106

[18] "2026 Agentic Coding Trends — Implementation Guide," HuggingFace. https://huggingface.co/blog/Svngoku/agentic-coding-trends-2026

[19] "Toward Agentic Software Engineering Beyond Code: Framing Vision, Values, and Vocabulary," arXiv. https://arxiv.org/html/2510.19692v2

[20] [The Agentic Engineering Manifesto](./manifesto-agentic-engineering.md)

[21] [Comparative Analysis of Manifestos, Frameworks, and Global Standards](./compare_all.md)
