# NIST AI RMF 1.0 + AI 600-1 (GenAI Profile) Crosswalk

**Status:** Wave 2, item W2.9 — DRAFT (regulatory-reviewer signoff required before publication).
**Audience:** CROs, model-risk-management leads, NIST-aligned governance functions, regulators, internal audit.
**Purpose:** Map every IGM principle (1–16) and every AEnt-M principle (1–16) to NIST AI RMF 1.0 functions (Govern, Map, Measure, Manage) at subcategory granularity, plus to NIST AI 600-1 (GenAI Profile, July 2024) GenAI-specific risk vocabulary and suggested actions. Identify Strong / Partial / Missing coverage. Specify gap-closing actions, with explicit attention to:

- Map function: "context of use" — stakeholder and impacted-population register.
- Measure function: TEVV (Test, Evaluation, Validation, Verification), red-teaming, adversarial testing portfolio.
- GenAI Profile risk vocabulary: confabulation, CBRN, dangerous/violent recommendations, IP, obscene content, value chain & component integration, data privacy, information security, harmful bias, environmental impact.

**Sources cited:**
- NIST AI Risk Management Framework 1.0 (NIST AI 100-1, Jan 2023) — functions Govern (GV), Map (MP), Measure (MS), Manage (MG); subcategories enumerated in NIST AI RMF Playbook.
- NIST AI 600-1, *Artificial Intelligence Risk Management Framework: Generative AI Profile*, July 2024 — GenAI-specific risks (G1–G12) and suggested actions per RMF function.

**Cross-references:** `regulatory/eu-ai-act-addendum.md` (W1.5), `regulatory/foundation-model-third-party-register.md` (W1.6), `regulatory/iso-42001-crosswalk.md` (W2.10), `regulatory/iso-23894-23053-crosswalk.md` (W2.13), `governance/evidence-bundle-schema.md`, `governance/authority-accountability-matrix.md`, `glossary.md` (term-collision appendix).

**Repo-wide convention:** "epistemic tier" replaces "confidence" for the IGM scalar substrate-level meaning.

---

## 1. Coverage summary

| RMF function | IGM coverage | AEnt-M coverage | Combined gap |
|---|---|---|---|
| **Govern (GV)** — culture, accountability, oversight, policy | Strong (P6 four authorities; P11 traceability; P13 validation; P14 attack-surface controls) | Strong (P5 three governance layers; P7 governance relocation; P8 consequence-class accountability; P14 enterprise governance) | NIST GV.1.5 (legal & regulatory) — partial: needs explicit EU AI Act / DORA / GDPR mapping (covered by addenda). |
| **Map (MP)** — context of use, impact, stakeholders | **Partial** — IGM frames context as claim scope (P1) and decay class (P5) but does not register impacted populations | **Partial** — AEnt-M consequence classes imply impact but no stakeholder register | **MISSING:** stakeholder / impacted-population register. New template required (see §3.1). |
| **Measure (MS)** — testing, evaluation, metrics | **Partial** — IGM has corroboration (P3) and validation (P13) but no TEVV/red-team portfolio | **Partial** — AEnt-M decision-quality monitoring (P7) and metrics block but no adversarial testing | **MISSING:** TEVV portfolio, adversarial-testing register, red-team protocols. See §3.2. |
| **Manage (MG)** — response, recovery, communication | Strong (P4 contradictions; P5 decay; P15 architectural enforcement; P16 containment) | Strong (P9 composite-state; P11 response classes; P12 lifecycles; P15 economics; P16 supplier governance) | Partial: incident-reporting workflow with regulator clocks → addressed in `regulatory/eu-ai-act-addendum.md` Article 73 section. |

---

## 2. Subcategory-level crosswalk (IGM and AEnt-M → RMF + GenAI Profile)

Coverage codes: **S** = Strong (principle directly addresses subcategory); **P** = Partial (related but incomplete); **M** = Missing (no counterpart in either manifesto); — = not applicable.

### 2.1 Govern (GV)

| RMF subcategory | Description (paraphrased from RMF Playbook) | IGM coverage | AEnt-M coverage | Action to close |
|---|---|---|---|---|
| GV.1.1 | Legal & regulatory requirements understood and managed | P (P11 traceability) | P (P14 enterprise governance) | Adopt EU AI Act addendum + DORA register as referenced artefacts. |
| GV.1.2 | Trustworthy-AI characteristics integrated in policies | S (12 principles; P15) | S (16 principles; P5/P14) | None. |
| GV.1.3 | Risk management processes integrated with org-level processes | P | S (P12 three lifecycles; P14 enterprise governance) | Wire IGM lifecycle into AEnt-M P12 explicitly (W2.16). |
| GV.1.4 | Risk management process documented; reviewed at intervals | S (P11) | S (P14) | None. |
| GV.1.5 | Ongoing oversight of legal/regulatory requirements | P | P | Adopt foundation-model third-party register (W1.6) + EU AI Act PMM (Article 72) commitment. |
| GV.1.6 | Mechanisms in place for inventorying AI systems | M | P (P9 composite-state implies inventory) | **Adopt agent inventory schema** (`operational-templates/agent-inventory-schema.md`). CSA 2026: 82% of firms had unknown agents — this is a known gap. |
| GV.1.7 | Decommissioning processes for AI systems with stakeholder communication | M | P (P12 retirement) | **Adopt decommissioning checklist** (`operational-templates/decommissioning-checklist.md`). |
| GV.2.1 | Roles, responsibilities, lines of communication documented | S (P6 four authorities) | S (P8 consequence-class roles) | Authority matrix already produced (W1.4). |
| GV.2.2 | AI risk management training | M | M | DRAFT — author / training lead to specify. |
| GV.2.3 | Executive leadership accountable for AI risk | P (P6 implies authority) | S (P8 escalation to governance authority) | Adopt risk-appetite statement (W2.7). |
| GV.3.1 | Diversity, equity, inclusion, accessibility considered | M | M | DRAFT — add as IGM/AEnt-M editorial pass; tie to GenAI Profile harmful-bias risk. |
| GV.3.2 | Multidisciplinary team support for AI | P (P8 expert input) | P (P14 governance authority) | None. |
| GV.4.1 | Practices for risk-aware design, development, deployment | S (P3 epistemic tier; P13 validation) | S (P5 three governance layers) | None. |
| GV.4.2 | Open-information sharing | P | P | Adopt incidents appendix (W2.24). |
| GV.4.3 | Stakeholder feedback channels | P (P8) | P (P11 escalation) | Adopt stakeholder register (§3.1). |
| GV.5.1 | External feedback / complaints handled | M | M | Adopt CoE Article 11 / GDPR Article 22 rights & remedies (W2.12). |
| GV.5.2 | Procurement integrates AI risk | M | P (P16 SaaS-embedded-agent + supplier) | Adopt foundation-model third-party register (W1.6) + ISO 42001 A.10 supplier register. |
| GV.6.1 | Third-party risks managed | M | P (P16) | Foundation-model third-party register + ISO 42001 A.10. |
| GV.6.2 | Third-party contracts contain AI-risk clauses | M | M | DRAFT — procurement / legal task. |

### 2.2 Map (MP)

| RMF subcategory | Description | IGM coverage | AEnt-M coverage | Action to close |
|---|---|---|---|---|
| MP.1.1 | Context of use established (intended purpose, deployment setting, operators, users) | P (P1 claim scope) | P (P5 scoped views) | **Adopt stakeholder & impacted-population register** (§3.1). |
| MP.1.2 | Mission/business purpose explicit | P | S (P14 enterprise) | None. |
| MP.1.3 | Organization's AI risk tolerance defined | M | M | **Adopt risk-appetite statement** (`operational-templates/risk-appetite-statement.md`). |
| MP.1.4 | Goals & outcomes documented | P (P9 structured inquiry) | S (P14) | None. |
| MP.1.5 | Organizational stakeholders identified | M | M | See §3.1. |
| MP.1.6 | System requirements understood | S (P9) | S (P3 substrate) | None. |
| MP.2.1 | Tasks the AI will perform documented | M (IGM is substrate, not agent) | P (P5 scope; P8 consequence) | Tie to AEM Specifications (P2). |
| MP.2.2 | Information about AI capabilities, knowledge limits, uncertainty | S (P3 epistemic tier; P4 contradictions) | S (P11 response classes; P3 substrate inquiry) | None. |
| MP.2.3 | Scientific integrity & TEVV considerations during design | P (P13 validation) | M | **Adopt TEVV portfolio** (§3.2). |
| MP.3.1 | Benefits of intended use addressed | P | S (P14) | None. |
| MP.3.2 | Potential costs / harms identified | M | P (P11 consequence classes) | Adopt AI Impact Assessment template (`regulatory/iso-42001-crosswalk.md` §3). |
| MP.3.3 | Application of existing controls evaluated | P (P15 architectural enforcement) | S (P5/P7) | None. |
| MP.3.4 | Identified risks assessed for likelihood, magnitude, severity | M | P (consequence class implies severity) | **Adopt AI risk register** (`operational-templates/ai-risk-register.md`). |
| MP.3.5 | Roles & responsibilities for AI risk decisions | S (P6) | S (P8) | Authority matrix (W1.4). |
| MP.4.1 | Approaches for mapping AI risks for individuals, groups, communities | M | M | **Adopt impacted-population register** (§3.1). |
| MP.4.2 | Practices and personnel for human-AI configuration | P (P8) | S (P5/P8) | None. |
| MP.5.1 | Likelihood and magnitude of risks characterised | M | P | Adopt AI risk register. |
| MP.5.2 | Risks that are negligible, low, medium, high, or systemic identified | M | S (consequence classes) | Calibrate AEnt-M consequence classes against ISO 23894 risk levels (W2.13). |

### 2.3 Measure (MS)

| RMF subcategory | Description | IGM coverage | AEnt-M coverage | Action to close |
|---|---|---|---|---|
| MS.1.1 | Approaches and metrics for AI risks identified | P (IGM metrics in implementation guide) | P (P14 metrics block) | Move metrics into manifesto-principles (W3.4); adopt SLO table (`operational-templates/slo-table.md`). |
| MS.1.2 | Test sets, metrics, details documented | M | M | **Adopt TEVV portfolio** (§3.2). |
| MS.1.3 | Internal experts conduct or oversee measurement | P (P8 expert input) | P (P8 governance authority) | None. |
| MS.2.1 | Test sets representative of operating conditions | M | M | TEVV portfolio. |
| MS.2.2 | Evaluations of human factors | M | P (P8 consequence class) | DRAFT — add. |
| MS.2.3 | System performance demonstrated for all conditions of use | P (P13 validation) | P (P7 control equivalence) | TEVV portfolio. |
| MS.2.4 | Deployment-relevant metrics defined and tracked | P | S (P14 metrics) | Adopt SLO table. |
| MS.2.5 | Validity and reliability assessed | S (P13) | P | Tie to GenAI confabulation (G1) — see §4. |
| MS.2.6 | Computational efficiency / cost monitored | M | P (P15 economics) | Tie to AEM P11 Economics. |
| MS.2.7 | AI system security, resiliency assessed | P (P14 attack surface) | P (P16 supplier) | **Adopt red-team protocol** including indirect prompt injection (Slack-AI 2024) and contradiction injection (CSA 2026). |
| MS.2.8 | Risks of human-AI configurations measured | M | P (P8) | DRAFT — TEVV portfolio. |
| MS.2.9 | Model explanation/interpretability measured | P (P11 traceability) | S (P5 reasoning chain) | None. |
| MS.2.10 | Privacy risks measured | P (P14) | P (P16) | GDPR Article 22 register (W2.12) + Article 5 minimisation. |
| MS.2.11 | Fairness & bias measured | M | M | **Adopt fairness testing in TEVV portfolio**. Tie to GenAI Profile harmful-bias risk (G6). |
| MS.2.12 | Environmental impact measured | M | M | DRAFT — tie to GenAI Profile environmental risk (G12). |
| MS.2.13 | Effectiveness of risk-management measures | P (P11) | P (P14) | None. |
| MS.3.1 | Approaches for monitoring documented | S (P5 decay) | S (P9 composite-state) | None. |
| MS.3.2 | Risk tracking approaches considered for emergent risks | P (P16 containment) | P (P11) | Adopt risk register + circuit-breaker behavior (W2.27). |
| MS.3.3 | Feedback from end-users incorporated | S (P10) | S (P9 substrate deepens through use) | None. |
| MS.4.1 | Measurement approaches updated as risks evolve | S (P5 decay) | S (P9) | None. |
| MS.4.2 | Measurement results assessed | P | P | None. |
| MS.4.3 | Measurable performance improvements demonstrated | P (P10) | P (P14 metrics) | None. |

### 2.4 Manage (MG)

| RMF subcategory | Description | IGM coverage | AEnt-M coverage | Action to close |
|---|---|---|---|---|
| MG.1.1 | Risks ranked, prioritised, action plans created | M | P (consequence classes) | Adopt AI risk register. |
| MG.1.2 | Treatment determined and documented | P (P4 contradictions; P5 decay) | S (P11 response classes) | Tie response classes to ISO 23894 treatment options (W2.13). |
| MG.1.3 | Procedures for prioritised risks | P | S (P11) | None. |
| MG.1.4 | Risks deemed high priority documented | M | P | Adopt risk register. |
| MG.2.1 | Resource for risk-management functions documented | M | P (P15 economics) | None. |
| MG.2.2 | Mechanisms for sustaining value of deployed AI | S (P5 decay) | S (P9) | None. |
| MG.2.3 | Procedures for AI deactivation in place | M | P (P12 retirement) | **Adopt decommissioning checklist**. |
| MG.2.4 | Mechanisms for taking action on identified risks | S (P4) | S (P11 response classes) | None. |
| MG.3.1 | Third-party AI risks managed | M | P (P16) | Foundation-model third-party register. |
| MG.3.2 | Pre-trained models from third parties monitored | M | P (P9 composite-state) | Foundation-model third-party register. |
| MG.4.1 | Post-deployment monitoring | S (P5/P10) | S (P9) | EU AI Act Article 72 PMM template. |
| MG.4.2 | Mechanisms for change-tracking on monitoring metrics | S (P9 IGM Curate) | S (P9 AEnt-M composite-state) | None. |
| MG.4.3 | Incident response & recovery plans | P (P16 containment) | P (P11 response) | **Adopt incident-reporting workflow** with EU AI Act Article 73 (2-day / 15-day) and DORA Pillar 2 (4h / 72h / 1-month) clocks. See `regulatory/eu-ai-act-addendum.md`. |

---

## 3. Templates closing the structural Map / Measure gaps

### 3.1 Stakeholder & impacted-population register (Map function gap closure)

A normative artefact required for every AI system within scope of the manifestos. One register per system; reviewed quarterly or on material change.

| Field | Description | Example |
|---|---|---|
| `system_id` | Stable identifier; matches agent-inventory-schema.md | `csdr-penalty-agent-001` |
| `register_version` | Monotonic, dated | `2026-05-02-v3` |
| `intended_purpose` | One-paragraph statement of mission alignment | "Calculate CSDR settlement penalties for cross-border programmes." |
| `deployment_setting` | Production / sandbox / lab; jurisdictional scope | "Production EU-27 + UK; CSD interfaces." |
| `operators` | Roles operating the system; refers to AEnt-M P8 role | "Settlement-ops workflow owner; accountable authority for cross-border." |
| `users` | Categories of users; direct vs indirect | "Internal: settlement-ops staff. External: client reporting consumes outputs." |
| `affected_individuals` | Natural persons whose interests may be affected | "Issuer / counterparty employees mentioned in penalty notices; client end-investors." |
| `affected_groups` | Groups (e.g., demographic, occupational, jurisdictional) | "EU CSDR participants; UK CREST participants; non-EEA cross-border counterparties." |
| `affected_communities` | Wider communities (markets, public sector) | "EU settlement market integrity; UK-EU cross-border settlement." |
| `vulnerable_populations` | Groups requiring heightened consideration (NIST MP.4.1) | "Smaller buy-side participants with limited reconciliation capacity." |
| `stakeholders_consulted` | Names / roles consulted during MAP | "ESMA liaison; CSD-industry working group; internal compliance committee." |
| `feedback_channels` | How affected parties raise concerns (GV.5.1) | "Incident hotline; client-services case management; regulator submission portal." |
| `rights_and_remedies` | Linked to GDPR Article 22, CoE Article 11, EU AI Act Article 86 | "GDPR Art 22 right to obtain human review; explanation request handled by accountable authority within 30 days." |
| `last_review_date` | ISO date | `2026-04-15` |
| `next_review_date` | ISO date | `2026-07-15` |
| `register_owner` | Named accountable role | "Workflow owner — settlement ops" |
| `linked_artefacts` | Cross-references | `regulatory/iso-42001-crosswalk.md#aia-template`, `regulatory/eu-ai-act-addendum.md#article-27-fria` |

This register satisfies NIST MP.1.1, MP.1.5, MP.3.2, MP.4.1 simultaneously and feeds into the ISO 42001 AI Impact Assessment template (`regulatory/iso-42001-crosswalk.md`).

### 3.2 TEVV / red-teaming / adversarial-testing portfolio (Measure function gap closure)

A normative test suite per AI system. Each system maintains the following test families and produces evidence into the unified bundle (`governance/evidence-bundle-schema.md`).

| Test family | Purpose | Frequency | Owner | Linked NIST RMF + GenAI |
|---|---|---|---|---|
| **Functional regression** | Core behavior preserved across composite-state changes | Per release; per composite-state acceptance | Engineering steward | MS.2.3 |
| **Holdout evaluation** | Performance on held-out data not used in training/tuning/grounding | Per release | Engineering steward | MS.1.2, MS.2.1 |
| **Distribution-shift / drift** | Performance on shifted operating data | Quarterly | Engineering steward + IGM curate authority | MS.3.1, MS.4.1 |
| **Adversarial / red-team** | Resistance to indirect prompt injection, jailbreaks, claim poisoning, contradiction injection | Quarterly + before any Tier 4 envelope advancement | Security reviewer + governance authority | MS.2.7 |
| **Fairness / disparate-impact** | Outcomes by protected characteristic / population | Quarterly + on every model swap | Workflow owner + compliance | MS.2.11; GenAI G6 |
| **Privacy / data-leakage** | Resistance to extraction of training data, customer data, claim provenance | Quarterly | Security reviewer + DPO | MS.2.10; GenAI G2 |
| **Confabulation** | Rate of fabricated claims, fabricated provenance, fabricated citations | Per release + on substrate change | IGM revision authority | MS.2.5; GenAI G1 |
| **CBRN / dangerous-content** | Refusal of CBRN requests; refusal of violent / dangerous / illegal recommendations | Per release | Security reviewer | GenAI G3, G4 |
| **IP exfiltration / obscene content** | Refusal of IP-violating outputs; refusal of obscene content | Per release | Compliance | GenAI G5, G7 |
| **Value-chain / component-integration** | Integration tests across foundation-model, retrieval, action layers; supplier-changes | Per supplier change + quarterly | Architecture steward | GenAI G11 |
| **Environmental** | Compute, energy, cost per inference | Quarterly | Engineering steward | MS.2.12; GenAI G12 |
| **Cascading-failure simulation** | Multi-agent failure cascades (Nemotron-AIQ pattern) | Annually + before scale-out | Security reviewer + architecture | MS.3.2 |

**Required evidence per test:** test-set version, run timestamp, pass/fail criteria, results, owner signoff, retention for ≥ ASDLC release-governance retention period. Cross-reference: `governance/evidence-bundle-schema.md`.

---

## 4. NIST AI 600-1 (GenAI Profile, July 2024) — risk vocabulary mapping

NIST AI 600-1 defines twelve GenAI-specific risks. The manifestos must adopt this vocabulary for cross-framework consistency. Mapping below.

| GenAI Profile risk | NIST description (paraphrased) | IGM principle | AEnt-M principle | Coverage | Gap-closing action |
|---|---|---|---|---|---|
| **G1 Confabulation** | Plausible but inaccurate / fabricated content | P3 (epistemic tier), P4 (contradictions), P13 (validation) | P3 (substrate inquiry), P11 (response classes) | S | Add explicit confabulation-rate metric to TEVV portfolio (§3.2). |
| **G2 Dangerous, violent, hateful content** | Eased access to / production of harmful content | M | P11 (Block response) | P | Add policy filter spec to AEnt-M P5 reasoning governance. |
| **G3 CBRN information / capabilities** | Lowered barrier to chemical/biological/radiological/nuclear info | M | M | M | Adopt CBRN refusal test in TEVV (§3.2); add to AEnt-M P5 retrieval governance. |
| **G4 Data privacy** | Training-data leakage, member-inference, prompt leakage | P14 (claims attack surface) | P5 (retrieval governance) | P | GDPR addendum + privacy red-team test. |
| **G5 Environmental impact** | Energy and water consumption | M | P (P15 economics) | P | Add environmental metric. |
| **G6 Harmful bias / homogenization** | Disparate / homogenized outputs | M | M | M | Fairness testing in TEVV. |
| **G7 Human-AI configuration** | Misalignment of human-machine roles | P (P8) | S (P5/P8) | S | None. |
| **G8 Information integrity** | False / misleading content propagation | S (P3, P4, P13) | P (P9 composite-state) | S | None — IGM is a leading control here. |
| **G9 Information security** | Vulnerability to attack on AI / via AI | S (P14, P15) | P (P16) | S | Adopt red-team test. |
| **G10 Intellectual property** | IP-violating outputs | M | M | M | Add IP refusal test. |
| **G11 Obscene, degrading, abusive content** | Output policy violations | M | P (P11) | P | Add obscene-content refusal test. |
| **G12 Value chain & component integration** | Risk inherited from sub-components, third-party models, integrations | M | S (P9 composite-state, P16 supplier) | S (via AEnt-M) | Foundation-model third-party register (W1.6) is the operational artefact. |

**Action.** Add a "GenAI Risk Vocabulary" subsection to root `glossary.md` (W2.1) defining G1–G12 and pointing to the manifestos' coverage map. Adopt the GenAI Profile as the canonical risk vocabulary for the manifestos' generative AI scope.

---

## 5. Open DRAFT items requiring author judgment

- **DRAFT — author review needed:** GV.3.1 (DEI considerations) is currently uncovered by either manifesto. Authors may choose to (a) add a new IGM/AEnt-M principle, (b) defer to the EU AI Act / GDPR addenda, or (c) note as out-of-scope. Recommendation: (b) — DEI is a regulatory obligation, not a manifesto-shaping principle, and the addendum captures it under Article 10 (data governance) and Article 27 (FRIA).
- **DRAFT — author review needed:** GV.6.2 (third-party contracts contain AI-risk clauses) requires procurement / legal templates outside the manifesto's scope. Cross-reference to ISO 42001 A.10 supplier register only.
- **DRAFT — author review needed:** the TEVV portfolio (§3.2) frequencies are illustrative starting values; calibrate by domain risk profile.
- **DRAFT — author review needed:** the GenAI Profile risk-numbering used here (G1–G12) is for crosswalk convenience; NIST 600-1 itself uses risk names rather than numbers. Confirm preferred citation form before external publication.

---

## 6. References

- NIST. *Artificial Intelligence Risk Management Framework (AI RMF 1.0)*, NIST AI 100-1, January 2023.
- NIST. *Artificial Intelligence Risk Management Framework: Generative AI Profile*, NIST AI 600-1, July 2024.
- `intelligence-governance-manifesto/manifesto-principles.md` — IGM 16 principles.
- `agentic-enterprise-manifesto/manifesto.md` — AEnt-M 16 principles.
- `regulatory/eu-ai-act-addendum.md` (W1.5) — Article 13/14/27/72/73 obligations.
- `regulatory/foundation-model-third-party-register.md` (W1.6) — DORA Pillar 4 register.
- `regulatory/iso-42001-crosswalk.md` (W2.10) — AIA template, P/D/U RACI, supplier register.
- `regulatory/iso-23894-23053-crosswalk.md` (W2.13) — risk register example, vocabulary mapping.
- `governance/evidence-bundle-schema.md` (W1.7) — unified evidence schema.
- `governance/authority-accountability-matrix.md` (W1.4) — who decides at each integration point.
- `operational-templates/ai-risk-register.md` (W2.7) — the standard register.
- `operational-templates/risk-appetite-statement.md` (W2.7) — board-level statement.
- `operational-templates/agent-inventory-schema.md` (W2.7) — discovery + registration.
- `operational-templates/decommissioning-checklist.md` (W2.7) — retirement workflow.
- `operational-templates/slo-table.md` (W2.7) — consolidated SLOs.
- `regulatory/incidents-appendix.md` (W2.24) — incidents that motivated the manifestos.
