# Incidents That Motivated This Manifesto

**Status:** Wave 2, item W2.24 — DRAFT (regulatory-reviewer signoff required before publication; specifics verified against public sources but institutions should confirm against current public records before citing externally).
**Audience:** Boards, CROs, regulators, governance authority, accountable authorities, internal audit, manifesto authors, prospective adopters.
**Purpose:** A curated set of named real-world events that the IGM and AEnt-M (in conjunction with the AEM, ASDLC, and APLC) are designed to prevent, detect, or remediate. Each entry: date, summary, what failed, which manifesto principle would have addressed it, severity for FS use cases.

This appendix is a *learning artefact*. It is not a comprehensive AI-incident database; it is a deliberately small, well-cited set chosen for the particular failure modes the manifestos foreground.

**Cross-references:** `operational-templates/ai-risk-register.md`, `regulatory/eu-ai-act-addendum.md`, `regulatory/foundation-model-third-party-register.md`, `regulatory/iso-23894-23053-crosswalk.md`, `regulatory/coso-cobit-crosswalk.md`.

**Repo-wide convention:** "epistemic tier" replaces "confidence" for the IGM scalar substrate-level meaning.

---

## 1. Slack-AI exfiltration via indirect prompt injection — August 2024

- **Date.** Disclosed by PromptArmor on 20 August 2024; Slack patched the same day.
- **Summary.** PromptArmor demonstrated that Slack AI could be coerced — via *indirect prompt injection* — to exfiltrate data from private channels the attacker did not have access to. The attacker posted a malicious instruction in a public channel; when a user later queried Slack AI, the model treated the instruction as part of its context and acted on it. After August 14 2024 Slack also began ingesting uploaded documents and files, broadening the attack surface to include hidden instructions in PDFs (e.g., white-text instructions invisible to a human reader).
- **What failed.** The model could not distinguish between a "system prompt" / authorised user instruction and instructions embedded in retrieved or ingested context. The retrieval surface was treated as semantically trusted.
- **Manifesto principles that would have addressed it.**
  - **IGM Principle 14 — Claims are attack surfaces.** Direct: ingestion paths and the substrate are explicit attack surfaces; integrity controls (cryptographic provenance, write-path access controls, indirect-prompt-injection threat model in Ingest) are normative.
  - **IGM Principle 15 — Architectural enforcement.** Reasoning, retrieval, and action governance are three distinct layers; instructions in retrieved data cannot escalate to action authority.
  - **AEnt-M Principle 5 — Three governance layers (retrieval / reasoning / action).** Retrieval governance restricts what may be ingested as instruction; reasoning governance restricts what inferences may be drawn from retrieved content; action governance restricts what actions follow.
- **Severity for FS use cases.** **High to Critical.** Comparable patterns in FS deployments (e.g., regulator-correspondence ingestion, client-document ingestion, vendor advisories ingestion) are routine. An indirect-prompt-injection vector against a settlement, compliance, or client-data agent would expose confidential data and could trigger DORA Pillar 2 incident reporting, GDPR Article 33, and contractual confidentiality obligations.
- **Sources.** PromptArmor disclosure, *Data Exfiltration from Slack AI via Indirect Prompt Injection*, 20 Aug 2024; Simon Willison summary, 20 Aug 2024; The Register, 21 Aug 2024.

---

## 2. DocGo SDNY ruling — March 2025 (AI-washing securities class action)

- **Date.** SDNY ruling on motion to dismiss issued in March 2025; later $12.5 million settlement announced.
- **Summary.** Naclerio v. DocGo Inc., No. 1:23-cv-09476 (S.D.N.Y.). DocGo, a mobile health-care provider, was alleged to have misled investors about its "proprietary central AI system." A senior executive's claimed graduate degree in "computational learning theory" was central to the company's narrative around AI capability; the court accepted as plausibly pleaded that the credentials were misrepresented and used to bolster claims about AI-driven operations. The case became a leading example of "AI-washing" — public statements about AI capability outrunning the underlying implementation — drawing SEC and DOJ scrutiny in subsequent commentary.
- **What failed.** The institution made externally-facing AI capability claims without an evidence base reconciling claims to actual implementation; executive credentials were not verified; disclosure controls did not bind public statements about AI to the underlying system.
- **Manifesto principles that would have addressed it.**
  - **AEnt-M Principle 14 — Enterprise governance authority.** The governance authority is accountable for AI-related public disclosure; AI-washing is a category of governance failure, not a marketing oversight.
  - **IGM Principle 13 — Validation, not only corroboration.** External claims about AI capability require validation against observable system behaviour, not corroborating press releases.
  - **AEM unified evidence bundle.** The evidence required to defend a public AI-capability claim is a subset of the evidence bundle: model card, evaluation report, control state record, deployment ID. Public statements that cannot be backed by an evidence bundle should not be made.
  - **Risk-appetite statement (`operational-templates/risk-appetite-statement.md` §4.2).** "AI-related public statements without evidence-bundle backing" is on the "does not accept" list with CRO and General Counsel signoff required for material public statements concerning AI capability.
- **Severity for FS use cases.** **Critical.** FS firms make AI-capability claims to clients, investors, and regulators; AI-washing exposure is a securities-disclosure risk in addition to a reputational and operational risk.
- **Sources.** Justia case docket, *Naclerio v. DocGo Inc.*; A&O Shearman client alert, 2025; Holland & Knight, "SEC and DOJ Warm Up to Enforcement over AI Washing," July 2025; DocGo Securities Settlement notices.

---

## 3. Italy DPA (Garante) fine — OpenAI €15M — December 2024

- **Date.** Decision issued November 2024; fine published 20 December 2024 (€15 million). On 18 March 2026 the Court of Rome annulled the fine; the underlying findings remain instructive.
- **Summary.** The Italian Garante fined OpenAI €15 million for breaches of GDPR including: processing personal data to train ChatGPT without an adequate legal basis; violating transparency obligations; failing to notify a March 2023 security breach; and failing to operate adequate age verification.
- **What failed.** Training-data governance: provenance of personal data flowing into model training; lawful basis for processing; transparency to data subjects; breach-notification process for the AI system specifically.
- **Manifesto principles that would have addressed it.**
  - **IGM Principle 2 — Provenance is non-negotiable.** Provenance of every claim (and, by extension, every training datum) is verifiable for integrity.
  - **IGM Principle 7 — Acquisition has modes.** Match the mode to the source; for personal-data sources, the lawful-basis mode requires explicit recording.
  - **AEnt-M Principle 16 — Supplier governance.** Foundation-model providers' training-data governance is a supplier-register concern; the deployer's contract must reflect provider-side obligations.
  - **EU AI Act Article 73 / DORA Pillar 2 / GDPR Art 33.** Breach-notification clocks are a non-negotiable SLO (`operational-templates/slo-table.md` rows 16–22).
- **Severity for FS use cases.** **High.** FS firms processing personal data through generative AI inherit provider-side training-data risk; the Italian decision was the first EU GenAI fine and is precedent-relevant for other DPAs.
- **Sources.** Italian Garante decision, 2 Nov 2024 (published 20 Dec 2024); Cross-Border Data Forum analysis, 2025; Lewis Silkin client alert, 14 Jan 2025; subsequent Court of Rome annulment, 18 March 2026 (publicly reported).

---

## 4. Massachusetts AG settlement — Earnest Operations — July 2025 ($2.5M, AI lending fairness)

- **Date.** Announced 10 July 2025.
- **Summary.** Massachusetts AG Andrea Joy Campbell announced a $2.5 million settlement with Earnest Operations LLC over alleged disparate-impact harm to Black, Hispanic, and non-citizen applicants from the company's AI underwriting models. Specific allegations included a "knockout rule" excluding applicants without at least a green card and a "cohort default rate" variable using the average default rate of an applicant's college as a proxy. The settlement required Earnest to establish a fair-lending governance system for AI models and to discontinue the cited variables.
- **What failed.** Pre-deployment fairness assessment: disparate-impact testing was not performed, or its results were not acted on; underwriting variables proxying for protected characteristics (immigration status, racial/ethnic correlates via college default rate) were not flagged.
- **Manifesto principles that would have addressed it.**
  - **AEnt-M Principle 8 — Human accountability scoped by consequence class.** Lending decisions are High-consequence; per-action accountability with named human reviewer attached to a fairness-evidenced reasoning chain.
  - **AI Impact Assessment template (`regulatory/iso-42001-crosswalk.md` §3.1).** Impact analysis on individuals and on protected groups is mandatory at first deployment and on reassessment triggers.
  - **TEVV portfolio fairness testing (`regulatory/nist-ai-rmf-crosswalk.md` §3.2).** Quarterly fairness / disparate-impact testing on protected characteristics with go / no-go thresholds tied to AEnt-M response classes.
  - **Risk-register row pattern.** `risk-csdr-005`-style row (worked example) with reputational + regulatory + ECOA / disparate-impact treatment.
- **Severity for FS use cases.** **Critical.** FS lending, insurance underwriting, and customer-segmentation use cases are directly analogous; multiple state AGs and the CFPB are signalling enforcement appetite, and EU AI Act Annex III credit-scoring obligations apply from 2 August 2026.
- **Sources.** Massachusetts AG press release, 10 July 2025; Mass.gov, "AG Campbell Announces $2.5 Million Settlement With Student Loan Lender for Unlawful Practices Through AI Use"; Debevoise Data Blog, "AI Discrimination Risk in Lending," 20 July 2025; Paul Hastings client alert, "Disparate Impact Lives," 2025; ABA Banking Journal, August 2025.

---

## 5. Pennsylvania AG settlement — Home365 — May 2025 (AI-mediated property management)

- **Date.** Announced 28 May 2025.
- **Summary.** Pennsylvania AG Dave Sunday reached a settlement with Las Vegas-based Home365, LLC, over the company's use of an AI-based platform that allegedly caused systemic delays in tenant maintenance and contributed to leasing of unsafe housing. Home365 paid $45,000 ($30,000 restitution + $15,000 costs) and agreed to business-practice changes; the settlement also addressed security-deposit return failures.
- **What failed.** AI-mediated process design without consumer-protection consideration; consequence-class accountability missing — the AI "decided" maintenance prioritisation without a named human accountable for the resulting harms; no Article 22-style human-review pathway for affected residents.
- **Manifesto principles that would have addressed it.**
  - **AEnt-M Principle 8 — Human accountability scoped by consequence class.** Maintenance-affecting-habitability is at minimum Medium consequence (potentially High if safety implicated); a Decision Reviewer must be named.
  - **AEnt-M Principle 11 — Response classes and "fail closed" per consequence class.** When epistemic quality (or actionable maintenance evidence) is below threshold, fail-closed for habitability-affecting actions is escalation, not silent delay.
  - **GDPR Article 22 / EU AI Act Article 86.** Affected individuals have a right to human review of automated decisions affecting them; the explanation pathway is a register row (W2.12).
  - **AI Impact Assessment §3.1.** Affected-individual analysis would surface tenant health/safety risk.
- **Severity for FS use cases.** **High** for FS-adjacent customer-operations use cases (collections, claims, customer-service triage). Consumer-protection regulators are willing to enforce against AI-mediated operational harms even where no algorithm-specific statute exists.
- **Sources.** PA Office of Attorney General press release, 28 May 2025, "AG Sunday Reaches Settlement with Property Management Company Regarding A.I.-Based Platform Resulting in Maintenance Delays"; Insurance Journal, 3 June 2025; Lexology summary, 2025.

---

## 6. Cloud Security Alliance — *Autonomous but Not Controlled* — April 2026

- **Date.** CSA report published 21 April 2026 (commissioned by Token Security; conducted January 2026; n=418 IT and security professionals).
- **Summary.** Survey-based finding that **82% of enterprises have unknown AI agents in their environments**, **65% experienced AI-agent-related incidents in the past 12 months** (61% data exposure; 43% operational disruption; 35% financial loss), and **only 21% have formal AI-agent decommissioning processes**. The headline framing — "Autonomous but Not Controlled" — captures the structural pattern: agents in production at scale without inventory, lifecycle, or accountability.
- **What failed.** Discovery and registration governance; lifecycle governance (no decommissioning); composite-state visibility; the foundation enterprise control of "you can govern only what you can name."
- **Manifesto principles that would have addressed it.**
  - **AEnt-M Principle 9 — Composite state is enterprise state.** Discovery + composite-state visibility prerequisite to every other control.
  - **Agent inventory schema (`operational-templates/agent-inventory-schema.md`).** Schema + discovery procedure (self-registration, automated scan, registration gate) directly closes the 82% gap.
  - **Decommissioning checklist (`operational-templates/decommissioning-checklist.md`).** Closes the 21% formal-process gap.
  - **AEnt-M Principle 16 — Supplier governance.** SaaS-embedded agents (Gartner: 40% of enterprise apps will ship with embedded agents by end-2026) are surfaced through procurement reconciliation.
- **Severity for FS use cases.** **Critical** as a systemic finding. Every FS firm with this pattern is operationally exposed and likely has DORA, ISO 42001, NIST GV.1.6, and EU AI Act inventory obligations unmet.
- **Sources.** CSA press release, 21 April 2026, "New Cloud Security Alliance Survey Reveals 82% of Enterprises Have Unknown AI Agents in Their Environments"; CSA blog, "The Shadow AI Agent Problem in Enterprise Environments," 28 April 2026; Token Security report; Infosecurity Magazine, April 2026.

---

## 7. Cascading-failure pattern — Nemotron-AIQ Agentic Safety dataset (2025–26)

- **Date.** Dataset released by NVIDIA in 2025; ongoing analysis through 2026.
- **Summary.** The Nemotron-AIQ Agentic Safety dataset documents a recurring failure pattern in multi-agent systems: a localised epistemic or operational failure in one agent propagates through orchestrated agent chains, with downstream agents treating upstream outputs as ground truth. Without epistemic-tier propagation, a single confabulated or stale claim becomes a high-confidence input to downstream reasoning, and the cascade amplifies the error.
- **What failed.** Epistemic-tier propagation across agent orchestration; reasoning governance at the boundary between agents; cascading-failure simulation absent from pre-deployment testing.
- **Manifesto principles that would have addressed it.**
  - **AEnt-M Principle 5 — Retrieval / reasoning / action governance as three distinct layers.** Reasoning governance restricts what inferences may be drawn from inputs; cross-agent inputs must declare epistemic tier and the downstream cannot exceed the upstream.
  - **IGM Principle 3 — Confidence (epistemic tier) is earned, not assigned.** Cross-agent epistemic-tier propagation is normative.
  - **TEVV portfolio cascading-failure simulation (`regulatory/nist-ai-rmf-crosswalk.md` §3.2).** Annual minimum + before scale-out.
  - **Risk register `risk-csdr-008`** as a worked example.
  - **AEM Principle 4 — Right-size the swarm.** Orchestrator-tier containment and a single commit path bound the blast radius of a cascade (gap currently in IGM and AEnt-M; W2.3 closes it).
- **Severity for FS use cases.** **Critical.** FS firms are heavy users of orchestrated agent chains (research → analysis → recommendation → execution support). A cascade across this chain in a settlement, compliance, or trade-execution context is a systemic-event candidate.
- **Sources.** NVIDIA Nemotron-AIQ Agentic Safety dataset documentation; cited in `igm-aent-coherence-review.md` Theme T7; CSA *Autonomous but Not Controlled* contextual data on incident frequency.

---

## 8. GDPR Article 22 enforcement — pattern across DPAs (2024–26)

- **Date.** Recurring through 2024–2026 across multiple EEA DPAs; representative cases include the Schufa CJEU decision (C-634/21, December 2023, framing automated credit scoring under Article 22), and subsequent national-level enforcement against credit-scoring, insurance-pricing, and welfare-fraud-detection systems.
- **Summary.** Article 22 GDPR prohibits decisions based "solely" on automated processing where the decision produces legal effects or similarly significantly affects the data subject, save for limited exceptions, each requiring suitable safeguards including the right to obtain human intervention, to express their view, and to contest the decision. Enforcement has clarified that the "solely" threshold is interpreted narrowly: cosmetic human review (e.g., rubber-stamping the algorithm's output) does not remove a decision from Article 22 scope.
- **What failed.** Cosmetic human review treated as the safeguard; no defined per-action accountability with substantive review of reasoning chain; no Article 22 register; no explanation-on-request workflow.
- **Manifesto principles that would have addressed it.**
  - **AEnt-M Principle 8 — Per-action accountability with named human reviewer.** For Medium-and-above consequence classes, the named human reviews the agent's reasoning chain and epistemic-quality summary; this is structural, not cosmetic.
  - **AEM Principle 12 — Rubber-stamping detection.** A Tier 4 prerequisite. If rubber-stamping detection is not active, Tier 4 is not authorised.
  - **EU AI Act Article 86 — Right to explanation of individual decision-making (high-risk systems, post Aug 2026).** Already operational in `regulatory/eu-ai-act-addendum.md`.
  - **SLO row 35–36 — explanation-request and human-review-request response within 30 days.**
- **Severity for FS use cases.** **Critical** for credit, insurance, fraud, anti-money-laundering, and any client-affecting decision pipeline. Article 22 + Article 86 + Article 73 form a cluster: a system that fails one likely fails the others.
- **Sources.** CJEU C-634/21 *Schufa Holding* judgment, 7 Dec 2023; EDPB guidance on automated decision-making; recurring DPA decisions including the Italian Garante's 2024 series; EU AI Act Article 86 (in force phased through 2026/2027).

---

## 9. Foundation-model deprecation incidents (provider-side, 2024–25)

- **Date.** Recurring through 2024–25; representative pattern: foundation-model providers (OpenAI, Anthropic, Google, Mistral, Cohere, others) announce deprecations of older model versions on rolling timelines, sometimes with as little as 6 months' notice; deployers without robust composite-state acceptance and exit-plan readiness experienced production disruption.
- **Summary.** The structural pattern is not a single named incident but a class: an FS deployer hardcoded to a specific model version learns of deprecation, must re-evaluate downstream behaviour (composite-state change), revalidate evaluation portfolios on the successor model, renegotiate contractual terms, and execute cut-over within the deprecation window. Where exit-plans were not in place or where the deployer's substrate dependencies (knowledge-base embeddings, prompt patterns, evaluation portfolios) were tightly coupled to the deprecated model, deployers absorbed transition cost or operated under degraded controls until cut-over.
- **What failed.** Composite-state acceptance not extended to provider-driven deprecations; supplier register incomplete or missing exit triggers; alternative-supplier evaluation not refreshed.
- **Manifesto principles that would have addressed it.**
  - **AEnt-M Principle 9 — Composite state is enterprise state.** Foundation-model deprecation is the canonical composite-state-change event; default reject + explicit acceptance with named accountability.
  - **AEnt-M Principle 16 — Supplier governance / SaaS-embedded-agent governance.**
  - **Foundation-model third-party register (W1.6).** DORA Pillar 4 alignment; exit triggers + exit plan + alternative supplier + transition-target SLO.
  - **AI supplier register (`regulatory/iso-42001-crosswalk.md` §3.3).** Substitutability index ≥3 → exit-plan required; evidence obligations include change advisories.
- **Severity for FS use cases.** **High** routinely; **Critical** when the deprecation hits during a peak settlement, reporting, or regulatory window — DORA Pillar 2 (Section 2.3 of `operational-templates/slo-table.md` rows 18–20) classifies major ICT incidents partly on impact during critical windows.
- **Sources.** Provider deprecation announcements (OpenAI, Anthropic, Google, Mistral) 2024–25; DORA RTS on classification of major ICT-related incidents.

---

## 10. (Optional) Italy DPA — Replika / chat-companion enforcement, OpenAI bans 2023, Garante recurring (2023–24)

- **Date.** February 2023 Replika ban; March 2023 ChatGPT temporary ban (lifted April 2023); subsequent provisional measures.
- **Summary.** The Italian Garante issued a provisional ban on Replika (February 2023) over child-protection and emotional-vulnerability concerns and a temporary ban on ChatGPT (March 2023) over training-data lawful basis, transparency, and age verification, lifted after corrective measures. These actions established the EU enforcement pattern that culminated in the December 2024 fine (item 3).
- **What failed.** Affected-population analysis (children, vulnerable users); transparency to data subjects; age verification.
- **Manifesto principles that would have addressed it.** Same cluster as item 3 plus AI Impact Assessment §3.1 affected-individual analysis (vulnerable populations).
- **Severity for FS use cases.** **Medium.** FS-adjacent for vulnerable-customer-segment analysis (e.g., debt collection, financial-vulnerability detection); model-behavior risk in any chat-style customer interface.
- **Sources.** Italian Garante decisions, February–April 2023; subsequent EDPB guidance.

---

## 11. (Optional) AI-vendor data-handling and contract-flow-down failures (2024–25)

- **Date.** Pattern across 2024–25.
- **Summary.** Multiple analyses (Gartner, MIT Sloan, NIST, EDPB) document a recurring pattern: deployer contracts with foundation-model providers do not flow down provider-side AI Act / GDPR / DORA obligations, leaving the deployer accountable for provider conduct it cannot inspect.
- **What failed.** Contractual flow-down; evidence-of-compliance obligations on the provider; DPO-DPO relationship; Article 28 GDPR clauses.
- **Manifesto principles that would have addressed it.**
  - **AEnt-M Principle 16 — Supplier governance.**
  - **ISO 42001 A.10 supplier register (`regulatory/iso-42001-crosswalk.md` §3.3).**
  - **DORA Pillar 4 register (W1.6).**
- **Severity for FS use cases.** **High.** Procurement-side blind spot is one of the highest-leverage failures in the deployer pattern.
- **Sources.** Gartner forecasts on embedded-agent deployment (2025–26); EDPB Opinion on training AI models using personal data; MIT Sloan / Deloitte AI risk reporting 2025–26.

---

## 12. Cross-cutting summary — failure-mode matrix

| Failure mode | Items | Primary manifesto control |
|---|---|---|
| Indirect prompt injection / claim poisoning | 1 | IGM P14 + AEnt-M P5 |
| AI-washing / public-disclosure mismatch | 2 | AEnt-M P14 + risk-appetite §4.2 |
| Training-data / provenance / lawful-basis | 3, 10 | IGM P2, P7 |
| Disparate-impact / fairness | 4 | AIA §3.1 + TEVV fairness |
| Consumer-protection / human-impact | 4, 5, 8 | AEnt-M P8 + Art 22 / 86 |
| Discovery / inventory / lifecycle | 6 | Agent inventory + decommissioning |
| Cascading multi-agent failure | 7 | AEnt-M P5 + cascading-failure TEVV |
| Article 22 enforcement | 8 | AEnt-M P8 + AEM P12 |
| Provider-side composite-state change / deprecation | 9, 11 | AEnt-M P9 + supplier registers |

---

## 13. Open DRAFT items requiring author judgment

- **DRAFT — author review needed:** items 10 and 11 are marked optional; some institutions may wish to include or exclude based on relevance.
- **DRAFT — author review needed:** the December-2024 OpenAI fine was annulled by the Court of Rome on 18 March 2026; the underlying enforcement pattern remains instructive but the citation should note both the fine and the annulment for accuracy.
- **DRAFT — author review needed:** the cascading-failure example uses the publicly-released Nemotron-AIQ Agentic Safety dataset; institutions producing public-facing versions of this appendix may wish to add an internal-incident illustrative example (anonymised) for relatability.
- **DRAFT — author review needed:** items chosen are FS-relevant; institutions in other sectors may wish to substitute (e.g., HIPAA-relevant for health, FERPA-relevant for education).

---

## 14. References

Each item above lists its sources inline. Cross-cutting:

- IGM `manifesto-principles.md` — P2, P3, P5, P7, P14, P15.
- AEnt-M `manifesto.md` — P5, P8, P9, P11, P14, P16.
- AEM `manifesto-principles.md` — Tier 4, P12 (rubber-stamping detection).
- `operational-templates/ai-risk-register.md`, `operational-templates/agent-inventory-schema.md`, `operational-templates/decommissioning-checklist.md`, `operational-templates/risk-appetite-statement.md`, `operational-templates/slo-table.md`.
- `regulatory/eu-ai-act-addendum.md` — Articles 22 / 73 / 86 detail.
- `regulatory/foundation-model-third-party-register.md` — DORA Pillar 4.
- `regulatory/iso-42001-crosswalk.md` — A.10 supplier register.
- `regulatory/nist-ai-rmf-crosswalk.md` — TEVV portfolio.
- `regulatory/iso-23894-23053-crosswalk.md` — risk register example.
- `regulatory/coso-cobit-crosswalk.md` — Three-Lines artefacts.
