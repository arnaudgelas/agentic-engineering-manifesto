# Financial Services Regulatory Alignment Mapping

*Mapping the [Agentic Engineering Manifesto](../manifesto.md) principles to
financial services regulatory frameworks.*

> **Disclaimer** -- This document maps concepts from the Agentic Engineering
> Manifesto to financial services regulatory frameworks. It does not constitute
> compliance or regulatory advice. Consult qualified risk, compliance, and
> regulatory professionals for compliance determinations.

---

## Preamble

This document is a companion to [manifesto.md](../manifesto.md). It assumes
familiarity with the [boundary conditions](../companion-frameworks.md) and the
[Agentic V-Model](../adoption-vmodel.md) transition framework. Financial
services already operates the governance infrastructure the manifesto demands:
model risk management, three lines of defense, change control, audit trails.
The bridge to agentic engineering is extension of existing frameworks, not
construction of new ones.

---

## SR 11-7 / OCC 2011-12 Model Risk Management

SR 11-7 defines model risk management expectations for banking organizations
supervised by the Federal Reserve and OCC. Agent systems that influence
financial decisions fall within scope when they meet the SR 11-7 definition
of "model" -- a quantitative method that processes inputs to produce
quantitative estimates used in decision-making.

| SR 11-7 Requirement | Manifesto Mechanism | Alignment | Gap |
|---|---|---|---|
| Model development documentation -- design, theory, data, assumptions | P1 evidence bundles, P2 specifications | Partial | Model development rationale (why this model, alternatives considered, limitations) not captured by default evidence bundles. SR 11-7 expects documentation of the conceptual soundness of the approach, not just that it was built and tested. |
| Independent model validation -- effective challenge by qualified staff | P8 evaluations | Significant gap | SR 11-7 requires organizational independence between developer and validator. The manifesto treats verification as part of the delivery pipeline, performed by the same team. Validation must include conceptual soundness review, not just test execution. |
| Ongoing monitoring -- backtesting, benchmarking, sensitivity analysis, outcomes analysis | P9 observability, structured traces | Good fit | Agent traces provide richer monitoring data than most current model monitoring infrastructure. Traces capture reasoning chains, not just input-output pairs, enabling deeper performance analysis. |
| Model inventory and classification -- tiering by materiality, use, and complexity | None | Missing | Every agent system used in financial decisions must be registered, classified by materiality, and tracked in the model inventory. Classification drives validation frequency, monitoring intensity, and governance oversight. |
| Model risk governance -- roles, escalation, board reporting, risk appetite | P5 autonomy tiers, P12 accountability | Partial | Three Lines of Defense roles and escalation paths not explicitly addressed. Board-level model risk reporting and model risk appetite statements have no manifesto equivalent. |
| Champion-challenger testing -- parallel execution against alternative approaches | None | Missing | Comparing agent outputs against alternative approaches or incumbent models is not part of the manifesto evaluation framework. Critical for demonstrating that the agent system performs at least as well as the approach it replaces. |
| Model limitations documentation -- known weaknesses, boundary conditions, compensating controls | None | Missing | Explicit documentation of what the agent system cannot do, known failure modes, conditions under which outputs should not be relied upon, and compensating controls for known limitations. |
| Vendor model management -- due diligence, ongoing monitoring of vendor models | P11 economics, multi-model routing | Partial | SR 11-7 requires due diligence on vendor models including access to methodology documentation. LLM providers rarely provide the level of transparency SR 11-7 expects for vendor model assessment. |

**SS1/23 (PRA) addendum.** The PRA model risk management principles extend
SR 11-7 with several additions relevant to agentic systems:

- Model risk appetite defined and approved at board level, with explicit
  thresholds for model performance degradation and triggers for remediation.
- Explicit coverage of AI/ML models, removing ambiguity about whether
  agent systems are in scope.
- Proportionality requirements scaled to model materiality -- not every agent
  system requires the same validation intensity.
- Enhanced expectations for data quality in model inputs, strengthening the
  link to P7 (context quality as infrastructure).

These additions reinforce the case for P12 (accountability at governance
level) and P7 (context quality as infrastructure).

**Implementation note.** Organizations should map each agent system to the
SR 11-7 model tiering framework at the point of registration. Tier 1 (highest
materiality) agent systems require annual independent validation, quarterly
ongoing monitoring review, and board-level reporting. Lower-tier systems may
follow a lighter cadence, but no agent system influencing financial decisions
should be exempt from the inventory and governance framework entirely.

The manifesto's evidence bundles (P1) provide a strong foundation for SR 11-7
model documentation, but must be supplemented with:

- Conceptual soundness assessment -- why this agent architecture, what
  alternatives were considered, what are the theoretical limitations.
- Outcome analysis -- comparison of agent decisions against actual outcomes
  over time, with statistical rigor appropriate to the use case.
- Sensitivity analysis -- how agent outputs change under varying inputs,
  context quality, and model provider configurations.

---

## Three Lines of Defense

The Three Lines model is the foundational governance structure in financial
services. Any agentic engineering adoption must map to this structure or it
will not pass internal governance review.

| Line | Traditional Role | Agentic Equivalent | Manifesto Principle | Key Requirement |
|---|---|---|---|---|
| 1st -- Business / Technology | Builds and operates models; owns risk within business domain | Develops agent systems, defines specifications, produces evidence bundles, operates monitoring, manages day-to-day agent performance | P1-P11 | Owns first-line risk for agent systems within its domain; responsible for evidence quality and ongoing monitoring; accountable for agent outputs |
| 2nd -- Risk / Compliance | Oversees, challenges, and independently validates; sets risk frameworks and policies | Independently validates agent systems; monitors ongoing performance against risk appetite; challenges autonomy tier assignments; sets agent governance policy | P8 independent validation, P5 autonomy tiers | Must be organizationally independent from 1st line; cannot develop what it validates; sets model risk appetite for agent systems |
| 3rd -- Internal Audit | Provides independent assurance over the governance framework itself | Audits the entire agent governance framework -- specifications, evidence quality, validation independence, trace completeness, policy adherence | P12 accountability, P9 observability | Evidence bundles and traces enable audit; structured data reduces audit cycle time; audit scope includes the governance process, not just the agent output |

**Segregation of duties.** The team that builds and operates the agent system
cannot also validate it. This is non-negotiable under SR 11-7 and SS1/23.
The manifesto's P8 evaluation framework must be extended to require
organizational separation between the first line (development and operation)
and second line (independent validation and challenge).

In practice, this means:

- First-line teams write specifications, build agent systems, and run
  evaluations as part of their development process.
- Second-line teams independently design validation test cases, execute them
  without first-line involvement, and issue findings that must be remediated
  before production deployment.
- Third-line teams audit the process: was the segregation real, were findings
  tracked to closure, did evidence bundles meet the standard.

---

## DORA (Digital Operational Resilience Act)

DORA applies to financial entities operating in the EU and establishes
requirements for ICT risk management, incident reporting, resilience testing,
and third-party risk management. Agent systems are ICT assets and fall
within scope.

| DORA Pillar | Articles | Requirement | Manifesto Principle | Alignment |
|---|---|---|---|---|
| ICT Risk Management | Art. 5-16 | Agent systems included in ICT risk framework; business impact analysis for agent failure scenarios; risk identification and classification | P3 defense-in-depth, P5 autonomy tiers | Good fit -- defense-in-depth architecture and tiered autonomy map directly to ICT risk management expectations. Agent failure scenarios should be included in business continuity planning. |
| Incident Reporting | Art. 17-23 | Agent failures classified as ICT incidents; classification by severity; notification to competent authorities within regulatory timelines; root cause analysis | P9 observability | Good fit -- structured traces enable incident classification and root cause analysis. Gap: incident reporting workflow, severity classification taxonomy for agent failures, and regulatory notification timelines are not addressed in the manifesto. |
| Resilience Testing | Art. 24-27 | Scenario testing for agent systems; advanced testing including TLPT for significant entities; testing of ICT tools, systems, and processes | P10 containment, chaos testing | Strong fit -- the manifesto's chaos testing (tool outages, noisy retrieval, adversarial inputs) aligns directly with DORA resilience testing expectations for agent systems. TLPT scenarios should include agent-specific attack vectors. |
| Third-Party Risk | Art. 28-44 | LLM providers as critical ICT third parties; concentration risk assessment; exit strategies; right to audit; sub-outsourcing controls; contractual requirements | P11 multi-model routing | Partial -- multi-model routing mitigates concentration risk by design. Gaps: contractual requirements for LLM providers (SLA, data handling, incident notification), exit planning and portability, sub-outsourcing visibility, right-to-audit clauses in provider agreements. |
| Information Sharing | Art. 45 | Agent-specific threat intelligence sharing with peers, regulators, and industry bodies | P10 containment | Supportive -- the manifesto's containment patterns generate threat intelligence (adversarial inputs, failure modes); no explicit mechanism for sharing this intelligence with the financial services community. |

**DORA makes multi-model routing a regulatory requirement.** Under the
third-party risk pillar, concentration risk in a single LLM provider creates
regulatory exposure. If a single provider outage would impair critical
financial functions, DORA requires mitigation. P11 (economics of intelligence)
therefore serves a dual purpose: cost optimization and DORA concentration
risk compliance. Organizations should document their multi-model routing
strategy as a DORA third-party risk mitigation measure.

**Exit planning.** DORA requires exit strategies for critical ICT third-party
providers. For agent systems, this means: the ability to switch LLM providers
without loss of capability, portability of specifications and evaluation
suites across providers, and documented fallback procedures when a provider
becomes unavailable. P2 (specifications) and P8 (evaluations) support this
if they are provider-agnostic by design.

**Incident classification for agent failures.** DORA requires classification
of ICT-related incidents by materiality. Organizations should define
agent-specific incident categories:

- **Severity 1:** Agent takes unauthorized action affecting customer accounts,
  market positions, or regulatory submissions.
- **Severity 2:** Agent produces incorrect output that is detected before
  downstream impact but indicates a control failure.
- **Severity 3:** Agent performance degradation (latency, accuracy drift)
  detected through monitoring but within tolerance thresholds.
- **Severity 4:** Agent failure contained by circuit breakers or fallback
  mechanisms with no downstream impact.

The manifesto's P9 (observability) provides the data needed for classification.
The gap is the classification framework itself and the escalation workflow.

---

## EU AI Act

Financial AI systems frequently fall into the high-risk category under
Annex III. The mapping below focuses on high-risk system obligations, which
apply to most financial use cases involving automated decision-making.

| AI Act Requirement | Article | Manifesto Principle | Notes |
|---|---|---|---|
| Risk classification | Art. 6, Annex III | -- | Financial AI systems are frequently high-risk: credit scoring, insurance pricing, fraud detection, AML screening. Classification triggers the full set of high-risk obligations. |
| Risk management system | Art. 9 | P3, P5, P10 | Defense-in-depth, autonomy tiers, and containment engineering collectively satisfy risk management system requirements. Must be documented as a continuous iterative process. |
| Data governance | Art. 10 | P7 context engineering | Data quality, relevance, representativeness, and freedom from errors. Context quality engineering directly maps. Training data governance for fine-tuned models adds scope beyond P7. |
| Technical documentation | Art. 11 | P1 evidence, P2 specifications | Evidence bundles and versioned specifications satisfy technical documentation. Must include intended purpose, foreseeable misuse, and interaction with other systems. |
| Record-keeping and logging | Art. 12 | P9 observability | Automatic logging of events during system operation. Structured traces exceed this requirement. Logs must enable post-market monitoring and incident investigation. |
| Transparency and information to deployers | Art. 13 | P9 observability | Structured traces satisfy transparency obligations. Traces and documentation must be accessible to deployers in a form they can understand and act upon. |
| Human oversight measures | Art. 14 | P12 accountability, P5 autonomy | Tier-calibrated governance provides graduated human oversight proportional to risk. System must allow human intervention, including ability to override or stop the system. |
| Accuracy, robustness, cybersecurity | Art. 15 | P8 evaluations, P10 containment | Evaluation portfolios address accuracy requirements. Chaos testing addresses robustness. Cybersecurity must cover adversarial attacks specific to agent systems. |
| Conformity assessment | Art. 43 | P1 evidence bundles | Evidence bundles structured to serve as conformity assessment documentation. Financial services AI may require third-party conformity assessment under sector-specific rules. |
| Post-market monitoring | Art. 72 | P9 observability | Ongoing monitoring through traces, evaluation regression tracking, and performance drift detection. Must feed back into the risk management system. |

**High-risk classification in financial services.** Under Annex III, Section 5,
the following financial use cases are explicitly listed as high-risk:

- Creditworthiness assessment of natural persons.
- Risk assessment and pricing for life and health insurance.
- Evaluation of credit scoring or establishment of credit scores.

Additional financial use cases may qualify as high-risk under the general
criteria in Art. 6(2) when they significantly affect decisions about natural
persons. Organizations should conduct a risk classification assessment for
each agent system and document the rationale, including cases where the
system is determined to be non-high-risk.

---

## SOX Controls for Agent Systems

SOX compliance applies to publicly traded companies and focuses on internal
controls over financial reporting. Agent systems that touch financial data,
reporting pipelines, or accounting processes fall within scope.

| SOX Requirement | Manifesto Mechanism | Alignment |
|---|---|---|
| IT General Controls (ITGC) | P3 architecture, P5 autonomy tiers | Good fit -- defense-in-depth and tiered permissions map to ITGC expectations for access management, change management, and operations |
| Change management -- authorization, testing, approval before deployment | P2 specifications, P1 evidence bundles | Good fit -- evidence bundles with evaluation results, diffs, and deployment IDs exceed most ITGC change management documentation requirements |
| Access controls -- logical access, authentication, authorization | P5 autonomy tiers, least privilege | Good fit -- tier enforcement and granular permissions (read but not write, deploy to canary but not full rollout) provide stronger access controls than typical role-based models |
| Audit trails -- who did what, when, and why | P9 structured traces | Strong fit -- traces reconstruct reasoning chains, not just event logs; traces include decision rationale, tool calls, and policy checks |
| Segregation of duties -- incompatible functions separated | -- | Gap -- not explicitly addressed in the manifesto; must be enforced through organizational controls external to the agent system (see Three Lines of Defense above) |
| Financial reporting integrity -- completeness, accuracy, validity | P8 evaluations | Partial -- evaluation portfolios verify correctness but do not specifically address financial statement assertion-level testing (completeness, existence, valuation, rights, presentation) |

---

## Algorithmic Accountability and Explainability

These requirements span multiple regulatory frameworks and represent a
cross-cutting concern for any agent system that influences decisions
affecting individuals.

| Requirement | Source | Manifesto Mechanism | Gap |
|---|---|---|---|
| Right to explanation for automated decisions | GDPR Art. 22 | P9 structured traces | Traces provide system-level reasoning reconstruction. Gap: individual-level explainability (why this specific decision for this specific customer) requires purpose-built explanation generation, not raw trace data. |
| Fairness and non-discrimination testing | Fair Lending (ECOA, FHA), FCA Consumer Duty, EU AI Act Art. 10 | P8 evaluation portfolios | No explicit fairness testing, bias detection, or protected-class impact analysis in the manifesto evaluation framework. Evaluation portfolios must be extended with fairness-specific test cases. |
| Contestability of automated decisions | Consumer protection regulation, FCA Consumer Duty | P12 accountability | No defined process for customer challenge of agent-influenced decisions. Accountability exists but a contestation workflow -- how a customer disputes, how the decision is re-examined, how traces are reviewed -- does not. |
| Kill switches for algorithmic trading systems | MiFID II Art. 17 | P10 containment, circuit breakers | Good fit -- circuit breakers and containment engineering serve as kill switch infrastructure. Must operate in real-time with sub-second latency for trading systems. |
| Model explainability for supervisory review | SR 11-7, SS1/23 | P9 traces, P1 evidence | Partial -- traces explain system-level behavior. Gap: model-level interpretability (feature importance, sensitivity analysis, partial dependence) requires additional tooling beyond manifesto scope. |

**GDPR Art. 22 in practice.** The right not to be subject to solely automated
decision-making with legal or similarly significant effects creates a hard
constraint on agent autonomy tiers in customer-facing financial decisions. Any
agent system that produces a credit decision, insurance pricing determination,
or account action must either:

- Maintain meaningful human involvement in the decision (not rubber-stamping),
  which maps to manifesto Tier 1 (observe) or Tier 2 (branch with approval), or
- Obtain explicit consent and provide the right to contest, which requires a
  contestation workflow that the manifesto does not currently define.

The practical implication is that customer-facing financial decisions should
not exceed Tier 2 autonomy under current regulatory expectations.

---

## Market-Specific Autonomy Guidance

The table below maps common financial services use cases to recommended
autonomy tiers from the manifesto. These are starting points; actual tier
assignments must reflect the organization's risk appetite and regulatory
obligations.

| Use Case | Risk Tier | Recommended Autonomy | Key Regulations | Notes |
|---|---|---|---|---|
| Back-office automation (document processing, reconciliation, data entry) | Low | Tier 1-3 | SOX | Standard manifesto adoption path. Evidence bundles satisfy change management. Low regulatory sensitivity allows higher autonomy tiers. |
| Model development support (quant code generation, research assistance, data exploration) | Medium | Tier 1-2 | SR 11-7 | Agent output independently validated by model validation team. The agent is a development tool, not the model itself. Output enters the model development lifecycle and is subject to full SR 11-7 validation. |
| Regulatory reporting (drafting, data aggregation, consistency checks) | Medium | Tier 1-2 | Various (COREP, FINREP, FR Y-9C, Call Reports) | High value use case. Agent drafts, human approves. Traces provide audit trail for regulatory examination. Accuracy requirements are absolute -- no tolerance for reporting errors. |
| AML/KYC (transaction monitoring, customer due diligence, screening) | High | Tier 1-2 | AML Directives (AMLD6), FinCEN BSA, Wolfsberg Principles | Human review on every SAR. Agent assists triage and evidence assembly but does not make filing determinations. False negative risk is regulatory and criminal. |
| Credit and insurance decisioning (underwriting, pricing, limit setting) | High | Tier 1 (observe only) | EU AI Act (high-risk), Fair Lending (ECOA, FHA), Consumer Duty | High-risk AI classification. Agent provides analysis and recommendations; human makes the decision. Full explainability required. Fairness testing mandatory. |
| Algorithmic trading (execution, market making, systematic strategies) | Highest | Tier 1 (observe only) | MiFID II Art. 17, MAR, Reg SCI | Kill switches mandatory. Agent cannot execute trades autonomously. Real-time monitoring required. Latency constraints may limit agent applicability. |

---

## Data Residency and Classification

Customer PII processed through external LLM APIs triggers GDPR cross-border
transfer obligations (Chapter V), including adequacy decisions, standard
contractual clauses, or binding corporate rules. The Schrems II framework
adds requirements for supplementary measures when transferring data to
jurisdictions without adequate protection.

Banking secrecy laws in certain jurisdictions (Switzerland, Luxembourg,
Singapore, the Cayman Islands) may prohibit sharing financial data with
third-party inference providers entirely. These laws operate independently
of GDPR and may impose stricter constraints.

Data classification must gate agent access, model routing, and memory
retention at the infrastructure level:

- **Public / Internal:** Agent may use any model, including hosted APIs.
  Standard manifesto adoption applies.
- **Confidential:** Agent restricted to approved models with appropriate
  data processing agreements. Memory retention subject to data minimization.
- **Restricted / Secret:** Agent restricted to on-premises or private-cloud
  models only. No external API calls. Memory must not persist beyond session.

This is an infrastructure enforcement concern under P5 (autonomy tiers):
data classification becomes an autonomy constraint enforced at the system
level, not merely a policy document. The routing layer (P11) must respect
classification boundaries -- a cost-optimal route that violates data
residency rules is not a valid route.

---

## Open Regulatory Questions

The following questions do not have settled regulatory answers. Organizations
adopting agentic engineering in financial services should track these areas
and engage with supervisors proactively.

- **SR 11-7 model inventory scope.** Are agent systems "models" under SR 11-7?
  If an agent uses an LLM to generate risk assessments, is the agent the model,
  the LLM the model, or both? Inventory classification methodology for agent
  systems is unsettled. Conservative approach: register the agent system as a
  model and the underlying LLM as a vendor model.
- **DORA third-party risk for LLM APIs.** When agents call external LLM APIs,
  does the LLM provider constitute a critical ICT third-party service provider?
  Concentration risk thresholds and contractual requirements for LLM providers
  are undefined in current regulatory technical standards.
- **Champion-challenger methodology.** Traditional champion-challenger compares
  model outputs on identical inputs. Agent systems are non-deterministic and
  context-dependent. Methodology for meaningful comparison -- including
  statistical approaches to handle output variability -- is undeveloped.
- **Regulatory examination expectations.** Supervisory examination procedures
  for agent governance do not yet exist. Early adopters should prepare for
  ad hoc supervisory inquiries and document governance frameworks defensively.
  Evidence bundles (P1) and traces (P9) position organizations well for this.
- **EU AI Act conformity assessment.** The interaction between AI Act conformity
  assessment and existing financial services supervisory frameworks (CRD, MiFID,
  Solvency II) is not yet clarified by the European Commission. Dual compliance
  obligations may emerge.
