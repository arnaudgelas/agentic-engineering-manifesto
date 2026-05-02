# Foundation-Model Third-Party Register and DORA Pillar 4 Alignment

**Status:** DRAFT — author/legal review needed. Normative regulatory artefact.
**Wave 1, item W1.6** of the IGM/AEnt-M coherence-review remediation backlog (`igm-aent-coherence-review.md` §3, B6; §5, W1.6).
**Audience:** AEnt-M deployers, procurement, third-party risk management (TPRM), CISO, DPO, vendor-management office, ICT third-party register owner under DORA, internal audit (3rd line), CRO.
**Purpose:** Close the BLOCKER gap that DORA Pillar 4 (ICT third-party / foundation-model providers) is missing from both manifestos, and provide a single register schema, exit-strategy template, CTPP analysis, and procurement gate so that adoption of any foundation model is governed end-to-end. AEnt-M Principle 9 (composite state) detects model changes; it does **not** constitute an ICT third-party register, an exit plan, a sub-processor map, or a critical-third-party (CTPP) designation analysis.

**Cross-references.**
- DORA = Regulation (EU) 2022/2554, in application since **17 January 2025**.
- This artefact integrates with the unified evidence bundle (`governance/evidence-bundle-schema.md`, planned W1.7), the EU AI Act addendum (`regulatory/eu-ai-act-addendum.md`, this wave), and the authority-accountability matrix (`governance/authority-accountability-matrix.md`, planned W1.4).
- Foundation-model providers are also in scope of `intelligence-governance-manifesto/manifesto.md` Principle 14 (claims are attack surfaces, line 170) and AEnt-M Principle 9 (composite-state).

**Citation convention.** DORA Articles cited as "Art. N"; recitals as "Recital N". Authoritative text: Official Journal of the European Union, OJ L 333, 27.12.2022. Implementing technical standards (ITS/RTS) on the register of information are in force per Commission Implementing Regulation (EU) 2024/2956 and Commission Delegated Regulation (EU) 2024/1773 (sub-contracting) — verify current consolidated versions before submission.

---

## 1. Why this matters

### 1.1 Foundation-model providers are ICT third-party services under DORA

DORA Art. 3(21) defines an "ICT third-party service provider" as an undertaking providing ICT services. Art. 3(20) defines "ICT services" broadly to include digital and data services, including those provided by cloud-computing services, **AI services**, and software services. **Foundation-model providers fit squarely.** Recitals 30 and 63 confirm the intent to capture cloud + AI providers.

The financial entities in scope of DORA (Art. 2 — credit institutions, payment institutions, investment firms, insurers and intermediaries, AIFMs/UCITS, CCPs, CSDs, trading venues, crypto-asset service providers, and others) must therefore:

- Maintain a **register of information on contractual arrangements with ICT third-party providers** (Art. 28(3)) — the foundation-model contract is in this register.
- **Assess concentration risk** (Art. 29) before contracting and on an ongoing basis.
- **Assess and document criticality** of ICT third-party services (Art. 28(2)) — including whether the service supports a critical or important function (CIF).
- **Manage sub-contracting risks** (Art. 29(2) + Delegated Regulation 2024/1773) — sub-processors, hyperscaler infrastructure, data labellers, fine-tuning providers.
- **Plan and document exit strategies** (Art. 28(8)) — proportionate to criticality.
- **Stress-test resilience** (Art. 24 + Art. 26(2) for TLPT on critical providers).

### 1.2 The four operational events DORA captures that AEnt-M P9 alone does not

AEnt-M Principle 9 detects changes in the composite state and triggers re-acceptance gates. It is necessary but not sufficient because it is a **detection** mechanism, not a **register**, and it does not produce the artefacts a competent authority will demand under DORA. The four event classes that fall outside AEnt-M P9 alone:

| Event | AEnt-M P9 detects? | What DORA additionally requires |
|---|---|---|
| Provider model-version deprecation / sunset | Partial — surfaces as composite-state change | Exit plan; alternative-provider readiness; transition timeline; SLA on deprecation notice |
| Provider outage / degradation | No | Major-incident reporting (Art. 19); concentration risk if provider is sole; switching capability |
| Provider pricing change / commercial term change | No | Contract review under Art. 30; concentration risk; budget envelope change for AEM P11 economics |
| Sub-processor change (e.g., GPU host change, data-labelling vendor change) | No | Sub-contracting register update (Delegated Reg. 2024/1773); risk assessment; consent under Art. 29(2) where required |

A standalone foundation-model register (this document) closes the gap.

### 1.3 Why the bank example is non-trivial

A typical regulated financial entity in May 2026 will run a heterogeneous foundation-model portfolio: closed frontier APIs (OpenAI, Anthropic, Google), open-weights hosted in their cloud (Mistral, Llama, Qwen variants), and on-premise or private-cloud-hosted local models. Each model relationship has different concentration profiles, sub-processor chains, jurisdictional footprints, and exit dynamics. The register makes that visible. See §6 for a worked example.

---

## 2. Register schema (per provider per model in scope)

The register is the **system of record** for every foundation-model relationship that supports an agentic system in production (or in pre-production where the relationship has been entered). Each entry corresponds to **one (provider, model-family, environment)** triple and is indexed by a stable register ID.

### 2.1 Schema

```
FOUNDATION-MODEL THIRD-PARTY REGISTER ENTRY
============================================
Register ID:                <FMR-NNNN, stable>
Status:                     DRAFT | Active | Sunset-pending | Retired
Last reviewed:              <YYYY-MM-DD>
Reviewed by:                <named TPRM officer + business sponsor + CISO delegate>
Next review due:            <YYYY-MM-DD>

1. PROVIDER IDENTIFICATION
   1.1 Legal entity name:       <e.g., OpenAI, OpC LLC>
   1.2 Registered jurisdiction: <e.g., Delaware, US>
   1.3 EU establishment / rep:  <yes/no + entity>
   1.4 Group structure:         <ultimate parent + relevant subsidiaries>
   1.5 LEI:                     <if available>
   1.6 Provider classification:
       - GPAI provider per EU AI Act Art. 53:    yes / no
       - GPAI with systemic risk per Art. 51:    yes (date notified) / no
       - DORA-designated CTPP (per Art. 31):     yes (designation reference) / no / pending
       - Code of Practice (Art. 56) subscriber:  yes / no

2. MODEL AND VERSION SCOPE
   2.1 Model family:                       <e.g., Claude Opus>
   2.2 Versions in active use:             <list with deployment ID>
   2.3 Composite-state hashes referencing this entry: <list>
   2.4 Endpoint(s) in use:                 <regions, API endpoints>
   2.5 Multi-tenant or dedicated:          <multi / dedicated / both>
   2.6 Fine-tuning / customisation:        <none / RAG / system-prompt / fine-tune / lora>
       2.6.1 If fine-tuned: substantial-modification analysis per
             EU AI Act Art. 25 — see regulatory/substantial-modification-policy.md (DRAFT)

3. SUB-PROCESSORS AND DATA FLOWS
   3.1 Sub-processor list (with each sub-processor's role):
       | Sub-processor | Role | Location of processing | Data categories |
   3.2 Cross-border data flows: <list>
   3.3 SCC / adequacy decision basis where applicable: <reference>
   3.4 Notification commitment: <provider's contractual obligation to notify
       sub-processor changes — duration, format, consent rights>

4. JURISDICTIONAL RESTRICTIONS
   4.1 Permitted geographies for processing:    <list, e.g., EU/EEA only,
       EU/EEA + UK, EU/EEA + US-with-SCC>
   4.2 Excluded geographies / sub-processors:   <list>
   4.3 Data residency commitments:              <if any>
   4.4 Sovereign / sectoral restrictions:       <e.g., FS-only deployments
       must be EU-resident under sectoral SREP guidance>

5. SLA AND OPERATIONAL COMMITMENTS
   5.1 Availability SLA:                <e.g., 99.9% monthly>
   5.2 Latency commitment:              <e.g., p95 ≤ 2s>
   5.3 Throughput limit:                <RPM / TPM / contract>
   5.4 Deprecation notice period:       <e.g., 12 months for retirement of
       a model version; verified in contract>
   5.5 Incident notification:           <provider commitment to deployer —
       hours, channel, content>
   5.6 Audit rights:                    <DORA Art. 30(3)(e) — right of
       access, inspection, audit; mandatory for CIF support>

6. EXIT TRIGGERS AND EXIT PLAN (DORA Art. 28(8))
   6.1 Exit triggers (any one fires the exit plan):
       (a) Provider insolvency / change of control to disqualified party
       (b) Sustained breach of SLA (definition + threshold)
       (c) Material price increase exceeding contractual cap
       (d) Sub-processor change impairing jurisdictional or sectoral compliance
       (e) Provider deprecates a model version below business-continuity threshold
       (f) Regulatory action against provider (e.g., Italy DPA OpenAI 2026 class)
       (g) Provider loss of certification (SOC2 / ISO 27001 / ISO 42001) without
           equivalent replacement
       (h) Provider's GPAI-systemic-risk classification changes adversely
       (i) Concentration ratio breach (see §2.6 of this document)
   6.2 Alternative provider designated:    <FMR-NNNN of alternative>
   6.3 Substitutability rating:            High / Medium / Low (with rationale)
   6.4 Exit timeline:
       Phase A — Triage and decision         T+0 to T+5 d
       Phase B — Re-routing of non-critical  T+5 to T+30 d
       Phase C — Re-routing of critical      T+30 to T+90 d
       Phase D — Provider relationship close T+90 to T+180 d
   6.5 Data-portability obligations:       <fine-tuned weights, RAG embeddings,
       evaluations, eval datasets — provider deletion + return-of-data SLA>
   6.6 Re-evaluation requirement:          on alternative-provider activation,
       full evaluation portfolio (AEM P8) re-run before re-entering Tier 4.
   6.7 Composite-state implications:       provider switch is a P9 reject-by-default
       composite-state change, requiring explicit re-acceptance of every dependent
       agent product.

7. CRITICALITY ASSESSMENT (DORA Art. 28(2))
   7.1 Supports a Critical or Important Function (CIF)?  yes / no
   7.2 If yes, name CIFs supported:                       <bullets>
   7.3 Materiality of disruption:                         <quantified — revenue,
       customer impact, regulatory consequence>
   7.4 Recovery Time Objective (RTO):                     <hours>
   7.5 Recovery Point Objective (RPO):                    <hours>
   7.6 Substitutability under exit plan:                  <consistent with §6.3>

8. SUB-CONTRACTING CHAIN (Delegated Reg. 2024/1773)
   8.1 Direct provider:           <as above>
   8.2 Tier-2 sub-contractors:    <list with role>
   8.3 Tier-3 (where in scope):   <list>
   8.4 Sub-contracting consent class:  <pre-approved list / case-by-case>
   8.5 Right to object / terminate on sub-contractor change: <yes/no + clause>

9. CONCENTRATION RISK (DORA Art. 29)
   9.1 Provider share of foundation-model spend (this entity): <%>
   9.2 Provider share of foundation-model spend (group):       <%>
   9.3 Sub-processor concentration (e.g., shared underlying GPU host
       across multiple foundation-model providers):            <ratio>
   9.4 Industry-level concentration signal:                    <if known>
   9.5 Concentration threshold breached?:                      yes / no

10. PRICING AND RENEWAL
    10.1 Pricing model:                  <per-token / subscription / committed>
    10.2 Annual contract value (ACV):    <€>
    10.3 Renewal cadence:                <annual / multi-year>
    10.4 Renewal notice required:        <days>
    10.5 Pricing-change cap or notice:   <contractual term>

11. SECURITY CERTIFICATIONS AND ATTESTATIONS
    11.1 SOC 2 Type II:               <yes/no, period, auditor, report on file>
    11.2 ISO/IEC 27001:               <yes/no, certificate ref, scope>
    11.3 ISO/IEC 42001:               <yes/no, certificate ref, scope>
    11.4 ISO/IEC 27701 / 27018:       <as relevant>
    11.5 PCI DSS / HIPAA BAA / etc.:  <as relevant per use case>
    11.6 Pen-test / red-team disclosure: <provider sharing cadence>
    11.7 Vulnerability-handling commitment: <CVD policy + SLA>

12. CSH (COMPOSITE-STATE HASH) DEPENDENCIES
    12.1 Agent products depending on this entry: <list with composite-state hash>
    12.2 Substrate domains depending on this entry: <list of IGM domains>
    12.3 AEnt-M consequence classes served:        <list>
    12.4 EU AI Act Annex III high-risk systems served: <list with system ID>

13. LINKED ARTEFACTS
    13.1 Master agreement reference:           <doc id>
    13.2 DPA / SCC reference:                  <doc id>
    13.3 Most recent due-diligence file:       <doc id, date>
    13.4 Most recent risk assessment:          <doc id, date>
    13.5 Last incident (if any):               <reference>
    13.6 EU AI Act Art. 13 instructions citing this entry: <list>
    13.7 FRIAs citing this entry:              <list>

14. APPROVALS
    14.1 First adoption approver:    <named CISO delegate + business sponsor>
    14.2 Date of first adoption:     <YYYY-MM-DD>
    14.3 Last review approver:       <name>
    14.4 Procurement gate signoff:   <reference §7 of this document>
```

### 2.2 Storage and access

The register is held in the same artefact store as the unified evidence bundle. It is **machine-readable** (the schema above is the human-readable shape; a `register_entry.schema.json` will be defined as a sibling artefact and referenced by `governance/evidence-bundle-schema.md`). Read access is broad within the firm; write access is restricted to TPRM officers and is logged.

### 2.3 Update triggers

The entry must be updated within **5 business days** of any of:

- AEnt-M Principle 9 detected composite-state change touching the entry's model.
- Provider notification of sub-processor change.
- Provider notification of model-version deprecation / new release.
- Pricing change.
- Certification update (gain or loss).
- Security incident at provider (Art. 19 DORA major-incident class) or at sub-processor that touches deployer data.
- Litigation, regulatory action, or material adverse event involving the provider.
- Any concentration-risk threshold crossed.

The update event is itself an entry in the unified evidence bundle's "operational signals" component for downstream agents that consume the model.

---

## 3. DORA Pillar 4 alignment (ICT third-party risk management)

### 3.1 Article 28 — Register of information and contract management

Art. 28 imposes the foundational obligations:

- **Art. 28(1)** — sound management of ICT third-party risk.
- **Art. 28(2)** — assess whether the ICT services support a CIF; document the assessment.
- **Art. 28(3)** — maintain a register of information on all contractual arrangements with ICT third-party providers, in a format prescribed by ITS (Implementing Reg. 2024/2956); annual reporting to the competent authority for CIF-supporting arrangements.
- **Art. 28(4)** — pre-contractual due diligence and risk assessment.
- **Art. 28(5)** — contractual provisions (auditable list — see Art. 30).
- **Art. 28(6)** — exit strategy proportionate to function criticality.
- **Art. 28(7)** — board approval for contracts supporting CIFs.

Each register entry per §2 above is therefore the **firm-internal expansion** of the Art. 28(3) register row for that arrangement, plus the exit plan (Art. 28(6)) and the criticality assessment (Art. 28(2)).

### 3.2 Article 29 — Concentration risk

Art. 29 requires assessment of ICT concentration risk. For foundation-model providers in 2026, the concentration vectors are:

1. **Direct concentration** — % of foundation-model spend / load with a single provider.
2. **Underlying-infrastructure concentration** — multiple providers may all run on the same hyperscaler GPU fleet; an outage at the hyperscaler is correlated across nominally diverse providers.
3. **Industry-level concentration** — the broader market depends heavily on a small number of providers; even diversification at the firm level cannot fully mitigate.
4. **Sub-processor concentration** — e.g., several providers depending on the same data-labelling sub-processor, or the same safety-evaluation contractor.

The register's §9 captures (1), (3), and (4); (2) requires a separate cross-provider analysis maintained at the TPRM level (`regulatory/concentration-risk-analysis.md`, planned, Wave 2).

### 3.3 Article 31 — CTPP designation and Article 33 — oversight

Critical ICT third-party providers (CTPPs) are designated by the European Supervisory Authorities (ESAs) per Art. 31, with criteria set out in Commission Delegated Regulation (EU) 2024/1502. CTPPs are subject to direct ESA oversight under Art. 33 and following.

For each foundation-model provider, the register field §1.6 records DORA-designated CTPP status. As of 2026, the first CTPP designations are being processed; expect frontier foundation-model providers serving multiple systemically important institutions to be candidates. The deployer's CTPP analysis at §7 of each register entry includes:

- Substitutability of the service.
- Number of financial entities depending on the provider (qualitative / public data).
- Aggregate value of operations supported.
- Reliance on the provider for CIFs across the financial system.

These are not deployer determinations in isolation — they are the deployer's view feeding into the broader ESA process.

### 3.4 Article 30 — Contractual provisions

Art. 30 enumerates mandatory contractual provisions, materially elevated for CIF-supporting arrangements (Art. 30(3)). The register §5.5 (incident notification) and §5.6 (audit rights) are placeholders for the full clause set, which must include:

(a) Description of services.
(b) Locations of service / data.
(c) Provisions for accessibility, availability, integrity, security, protection of personal data.
(d) Service-level descriptions and quantitative/qualitative performance targets.
(e) Cooperation rights for competent authorities and resolution authorities.
(f) Termination rights and notice periods.
(g) Sub-contracting conditions.
(h) Exit-plan obligations.
(i) Cooperation in TLPT and other resilience testing.

### 3.5 Resilience testing — Article 24 + Article 26

DORA Pillar 3 mandates a digital operational resilience testing programme (Art. 24). Threat-Led Penetration Testing (TLPT) under Art. 26 is required for significant financial entities and **ICT third-party providers may be required to participate**. CTPP-designated foundation-model providers will be included.

For non-CTPP foundation-model providers, the deployer's TLPT scope should include the foundation-model integration boundary — prompt injection, model-output validation, abuse of model capabilities — even if the provider itself cannot be tested. AI red-teaming protocols (cross-ref AEM Principle 8 and the contradiction-injection attack class added under Wave 1 W1.3 / Wave 2 W2.23) feed into the resilience test evidence.

---

## 4. DORA Pillar 2 incident reporting (Article 19) — alignment with EU AI Act Art. 73

### 4.1 Incident-reporting timers (Art. 19 + Commission Delegated/Implementing Regs.)

DORA major-ICT-incident reporting timers:

| Report | Deadline from classification as major | Detail |
|---|---|---|
| **Initial notification** | within **4 hours** of classification, and not later than 24h after detection | Brief: nature, scope, classification |
| **Intermediate report** | within **72 hours** of classification | Status, impact, remediation |
| **Final report** | within **1 month** of incident closure | Full root-cause, remediation, lessons |

Major-incident classification criteria are set in RTS — clients affected, data losses, duration, geographical spread, economic impact, reputational impact, criticality of services affected.

### 4.2 Cross-reference with EU AI Act Art. 73

The two reporting regimes overlap but are **independent**:

| Trigger | DORA Art. 19 | EU AI Act Art. 73 |
|---|---|---|
| A foundation-model failure causes service disruption to bank clients | **Yes** if classified major | **Yes** if the system is high-risk and the malfunction caused (a)–(d) under Art. 3(49) |
| A foundation-model output causes discriminatory credit decision | **No** (not an ICT incident as defined) | **Yes** if classified Art. 73(2) trigger (FR malfunction → 10 days; or other serious → 15 days) |
| A foundation-model provider outage with no client harm | **Possibly** depending on materiality | **No** unless the malfunction causes Art. 3(49) harm |
| A widespread fraud caused by manipulated agent | **Yes** if disruptive at threshold | **Yes** if widespread infringement → 2 days |

**Operational rule (normative):** the on-call Accountable Authority for an Annex-III financial-services agent product must run **both classifications in parallel** during incident triage. The triage tree at `regulatory/incident-triage-tree.md` (planned, Wave 2) implements this.

A single incident may produce filings to:

- The competent authority under DORA (e.g., national FS regulator).
- The market-surveillance authority under EU AI Act Art. 73 (often a different body — verify per Member State).
- The data-protection supervisory authority under GDPR Art. 33 (within 72h).
- Sectoral notifications (e.g., CSDR Art. 7, MiFIR, Solvency II).

### 4.3 Cross-reference table for triage

```
INCIDENT-CLASSIFICATION CROSS-REFERENCE
========================================

AT TRIAGE T+0 — answer all four:
1. Is this a major ICT-related incident under DORA Art. 19?     [Y / N / TBD]
2. Is this a serious incident under EU AI Act Art. 73?          [Y / N / TBD]
   - sub-class: 2-day / 10-day / 15-day
3. Is this a personal-data breach under GDPR Art. 33?           [Y / N / TBD]
4. Sectoral notifications applicable (CSDR / MiFIR / Solvency II / MDR / etc.)? [list]

If TBD: re-triage at T+1h, T+4h, T+12h, T+24h.

Once classified Y, start the corresponding clock and notify the appropriate
single-point-of-contact in:
- TPRM (DORA register entries affected — §2.13.5 last-incident field)
- Legal (sectoral filings)
- DPO (GDPR coordination)
- Accountable Authority (AEnt-M / EU AI Act)
```

---

## 5. DORA Pillar 3 resilience testing — AI red-teaming and TLPT

### 5.1 AI red-teaming for critical foundation-model dependencies

Critical foundation-model dependencies must be subjected to **AI-specific red-teaming** beyond traditional penetration testing. Threat classes (cross-ref `intelligence-governance-manifesto/manifesto.md` line 170, IGM Principle 14):

- **Prompt injection** (direct and indirect; Slack-AI 2024 case).
- **Output manipulation** (jailbreak; sensitive-data exfiltration).
- **Cascading failure** (Nemotron-AIQ class).
- **Contradiction injection** (CSA 2026; new test class added under Wave 1 W1.3 / Wave 2 W2.23).
- **Provenance spoofing** in retrieval-augmented contexts.
- **Sub-processor compromise simulation** — what happens if the data-labeller's pipeline is poisoned upstream?

The AI red-team report is a required input to the next register-entry review (§2.3 trigger) and feeds the EU AI Act Art. 15 cybersecurity assessment.

### 5.2 TLPT scope inclusion

For deployers in scope of TLPT under Art. 26, the foundation-model integration boundary is included as follows:

- **In scope** — the deployer's prompt-construction, retrieval-augmentation, output-validation, and Tier-4 envelope-enforcement code paths.
- **In scope where contractual** — cooperation from the foundation-model provider for joint testing per Art. 30(3)(e) audit rights.
- **Adjacent** — pre-existing red-team results from the provider where shared.

TLPT findings affecting the foundation-model boundary feed directly into the register entry's risk-assessment field (§13.4) and into the AEM evaluations portfolio (Principle 8).

---

## 6. Worked example — a bank using OpenAI GPT-4o + Anthropic Claude Opus 4.7 + a hosted local model

This worked example illustrates the register, CTPP analysis, exit plan, and concentration-risk treatment for a hypothetical European universal bank operating four agent products in production: (a) settlement-instruction reconciliation (Class A), (b) cross-border CSDR penalty assessment (Class B), (c) consumer-credit pre-screening (Class C — high-risk under EU AI Act Annex III point 5(b)), (d) internal employee Q&A (Class D — non-high-risk).

The bank's foundation-model portfolio:

- **OpenAI GPT-4o** via Azure OpenAI Service (EU residency).
- **Anthropic Claude Opus 4.7** via direct API + AWS Bedrock fallback.
- **Hosted local model** — Mistral-Large-Instruct-2411 fine-tuned on bank-specific corpus, hosted on bank-owned GPU cluster in EU data centre.

### 6.1 Register entries — abridged

```
FMR-0001 — OpenAI GPT-4o via Azure OpenAI Service (EU)
=====================================================
Provider:                Microsoft Ireland Operations Ltd (Azure as deployer-side
                         contractual counterparty); upstream OpenAI OpC LLC.
Sub-processors:          OpenAI OpC LLC (model provider), Microsoft Azure
                         (hosting infra).
GPAI provider:           yes (OpenAI). Systemic-risk: yes. Code-of-Practice: yes.
DORA-CTPP:               Microsoft / Azure designated CTPP (verify reference).
                         OpenAI: pending — analysis at §7 below.
Versions in active use:  gpt-4o-2024-08-06; gpt-4o-2024-11-20.
Composite-state hashes:  CSH-recon-A-04, CSH-csdr-B-02, CSH-credit-C-03.
Jurisdictional:          EU/EEA processing only; Azure regional pinning; SCCs in
                         place for any onward US transfer.
Availability SLA:        99.9% monthly via Azure SLA.
Deprecation notice:      6 months for model-version sunset (verify contract).
Criticality:             Supports CIF (CIF-01 settlement reconciliation,
                         CIF-04 consumer credit pre-screening).
Substitutability:        Medium — Claude Opus 4.7 is a substitute for general
                         reasoning; reconciliation-specific evaluations would
                         need to be re-run.
Concentration:           45% of foundation-model spend; concern.
Exit plan:               §6.3 below.

FMR-0002 — Anthropic Claude Opus 4.7
=====================================
Provider:                Anthropic Inc.; alternative routing via AWS Bedrock
                         (AWS Ireland for EU residency).
Sub-processors:          AWS (where Bedrock route used); Anthropic-internal
                         (where direct API).
GPAI provider:           yes (Anthropic). Systemic-risk: yes. Code-of-Practice: yes.
DORA-CTPP:               pending (similar reasoning to OpenAI).
Versions in active use:  claude-opus-4-7 (1M context).
Composite-state hashes:  CSH-recon-A-04 (multi-model orchestrator), CSH-csdr-B-02,
                         CSH-emp-D-01.
Jurisdictional:          EU/EEA via Bedrock; direct API requires SCCs.
Availability SLA:        99.9% (Anthropic) / per AWS Bedrock SLA.
Deprecation notice:      verify contract.
Criticality:             Supports CIF-01 and CIF-02 (CSDR penalty filing).
Substitutability:        Medium — GPT-4o substitute for general reasoning;
                         specific reasoning-style differences require
                         re-evaluation.
Concentration:           38% of foundation-model spend.
Exit plan:               §6.3 below.

FMR-0003 — Hosted local Mistral-Large-Instruct-2411 (fine-tuned)
=================================================================
Provider:                Mistral AI (model provider); Bank's own data centre
                         (hosting). Fine-tuning sub-contractor: <name> for
                         RLAIF passes.
Sub-processors:          Fine-tuning sub-contractor (data flows: documented).
GPAI provider:           Mistral is GPAI provider; systemic-risk: pending.
                         Note: bank's fine-tuning may trigger EU AI Act Art. 25
                         substantial-modification — analysis required.
DORA-CTPP:               No (self-hosted; Mistral as model provider but not
                         CTPP-designated for this deployment).
Versions in active use:  mistral-large-instruct-2411-bank-ft-v3.
Composite-state hashes:  CSH-emp-D-01 (primary), CSH-recon-A-04 (fallback).
Jurisdictional:          Bank-owned EU data centre; no cross-border processing.
Availability SLA:        99.5% (bank IT internal SLA).
Deprecation notice:      bank-controlled.
Criticality:             Supports CIF-03 (employee Q&A — low criticality);
                         fallback for CIF-01.
Substitutability:        High — well-documented open-weights, replaceable with
                         Llama-class or Qwen-class equivalents on same hardware.
Concentration:           17% of foundation-model spend.
Exit plan:               minimal — model weights are bank-held; sub-contractor
                         exit covered separately.
```

### 6.2 CTPP analysis (deployer's view)

For OpenAI and Anthropic, the bank's view is:

| Criterion | OpenAI | Anthropic |
|---|---|---|
| Substitutability for the deployer | Medium (Anthropic substitute) | Medium (OpenAI substitute) |
| Cross-deployer dependence | High (large fraction of FS sector dependent) | High |
| Aggregate value supported | High | High |
| CIF support across the financial system | Likely Yes | Likely Yes |
| Designation likelihood | High — expect designation | High — expect designation |

Both register entries' §1.6 record "DORA-CTPP: pending; reassessment quarterly". Designation, when announced, triggers a register update and a contract-review cycle to ensure Art. 30(3) provisions are present.

### 6.3 Exit plan (worked)

**Scenario:** OpenAI announces deprecation of gpt-4o for 12 months out, with a successor model that the bank's evaluations show degraded performance on Class B (CSDR penalty assessment).

Phase A (T+0 to T+5 d) — Triage and decision:
- Accountable Authority for Class B + TPRM officer + business sponsor convene.
- Decide: either (a) accept successor model and re-evaluate, (b) execute exit plan to Anthropic + Mistral fallback, or (c) negotiate extended support.
- If (b) chosen: enter Phase B.

Phase B (T+5 to T+30 d) — Re-routing of non-critical:
- Class D (employee Q&A) re-routed to Mistral local; minimal risk.
- Class A (settlement reconciliation) shifted from primary OpenAI to primary Anthropic with Mistral fallback; full evaluation portfolio re-run; AEnt-M relocation drops one stage during validation.

Phase C (T+30 to T+90 d) — Re-routing of critical:
- Class B (CSDR penalty) and Class C (credit pre-screening) require FRIA refresh (these are Annex III high-risk); evaluation portfolio re-run; Art. 13 instructions re-issued; composite-state changes accepted explicitly.
- Tier-4 envelopes for these classes are temporarily withdrawn; agents return to Tier 3 synchronous gating during validation.
- Re-entry to Tier 4 only after AEM P8 evaluations pass and AEnt-M control-equivalence evidence accumulates.

Phase D (T+90 to T+180 d) — Provider relationship close:
- Final billing reconciled.
- Data deletion confirmation from provider.
- Fine-tunes / embeddings exported and retained per record-keeping.
- Register entry status changed to Retired; archived for the regulatory record-retention period.

### 6.4 Concentration-risk assessment

- **Direct concentration:** OpenAI 45% / Anthropic 38% / Mistral 17%. The bank applies an internal cap of 50% per provider; OpenAI is at concern threshold (>40%) but below cap.
- **Underlying infrastructure:** Azure (OpenAI) and AWS Bedrock (Anthropic fallback) are the two hyperscalers. A simultaneous outage of both is the worst case — modelled as a Tier-1 scenario in the bank's resilience programme. Mistral local provides degraded but functional fallback for CIF-01 (settlement reconciliation), enabling continuity for the most time-critical class.
- **Industry-level:** documented in the cross-provider analysis. Acknowledged that diversification at the firm level cannot fully mitigate.
- **Sub-processor:** distinct sub-processor stacks (Azure vs AWS vs bank-owned) reduce sub-processor concentration.

The concentration-risk assessment is reviewed quarterly by TPRM and reported annually to the board (DORA Art. 5(2) governance).

---

## 7. Procurement gate — adoption of any new foundation model

A normative gate applied at the moment a business owner proposes to adopt a new foundation model (or a new model version of an existing provider when the change is material).

```
FOUNDATION-MODEL PROCUREMENT GATE — REQUIRED PRECONDITIONS
==========================================================

Owner: <TPRM officer + business sponsor + CISO delegate + AEnt-M Accountable
        Authority for the highest-consequence class served>

[ ] G1. Use-case Annex III classification completed (cross-ref EU AI Act addendum §1.1)
        Output: high-risk yes/no; if yes, which Annex III point.

[ ] G2. Prohibited-practices check (EU AI Act Art. 5)
        Output: pass / fail. Fail blocks adoption.

[ ] G3. Register entry drafted per §2 of this document
        Output: FMR-NNNN draft, status DRAFT.

[ ] G4. CTPP analysis (§3.3 + §6.2) completed
        Output: designation status; pending designations flagged for quarterly re-check.

[ ] G5. Concentration-risk impact assessment (§3.2 + §6.4)
        Output: post-adoption concentration ratio; threshold breach yes/no.

[ ] G6. Exit plan drafted (§2.6 + §6.3)
        Output: alternative provider identified; phase timeline.

[ ] G7. Sub-contracting chain mapped (§2.8)
        Output: sub-processor list with consent / objection rights confirmed.

[ ] G8. Security certifications verified (§2.11)
        Output: SOC2 / ISO 27001 / ISO 42001 status; gaps flagged.

[ ] G9. Substantial-modification analysis (EU AI Act Art. 25)
        Output: provider / deployer-as-provider determination; if deployer-as-provider,
        register entry §2.6 flag set and conformity-assessment trigger evaluated.

[ ] G10. AEM P8 evaluation portfolio designed for the use case
         Output: evaluation suite covering accuracy, robustness, adversarial,
         regression, holdout, and (for high-risk) protected-group performance variation.

[ ] G11. AEnt-M Principle 9 composite-state registration
         Output: CSH allocated; registration as a composite-state-affecting dependency.

[ ] G12. IGM substrate impact assessment
         Output: which IGM domains the model will reason over; effect on
         epistemic-tier reliability per claim category; cascade analysis if model
         affects substrate trust profile (e.g., fine-tuned on internal data feeding
         L2 claim derivation).

[ ] G13. EU AI Act Art. 13 deployer-instructions artefact drafted (for high-risk)
         Output: §2.2 of the EU AI Act addendum template populated.

[ ] G14. FRIA initiated where Art. 27 applies
         Output: §4.2 of the EU AI Act addendum template populated.

[ ] G15. Contract review against DORA Art. 30 mandatory provisions
         Output: gap list; remediation plan or board waiver per §3.5.

[ ] G16. Board approval for arrangements supporting CIFs (DORA Art. 28(7))
         Output: board minute reference.

Gate decision (record in register §14):
[ ] Approved — register entry status moves to Active; composite-state changes
    flagged as accepted; first AEnt-M relocation stage set to Stage 1
    (Full synchronous) by default with advancement subject to evidence.
[ ] Conditionally approved — list conditions and re-gate trigger.
[ ] Rejected — record rationale; entry retained as Retired-pre-adoption.
```

The gate is enforced at the ASDLC release-governance and APLC stage-gate level: no agent product may enter a Tier-4 envelope dependent on a foundation model whose register entry is not Active. Wave 2 W2.18 and W2.19 thread this enforcement through the release-gate evidence schema.

### 7.1 Reduced gate for in-place version updates

Where a provider releases a new minor version of an existing model and the bank's evaluations show no material change, a **reduced gate** may apply: G1 confirmed (no Annex III re-classification), G3 register update only (versions in active use), G10 evaluations re-run, G11 composite-state registration as a P9 minor change. G4–G7, G9, G15, G16 may be skipped if confirmed unchanged.

The criterion for "minor version" is defined operationally by the provider; absent provider clarity, default to full gate.

---

## 8. Implementation and DRAFT items

This document is **DRAFT — author/legal review needed** and must be reviewed by:

- TPRM lead and Head of Operational Risk for DORA fitness.
- In-house legal counsel for contractual provisions and Art. 30 alignment.
- CISO for security-certification and audit-rights specifications.
- DPO for personal-data-processing and GDPR cross-references.
- The named Accountable Authority for any high-risk system that depends on a foundation model.

### Open items

- **W2 — concentration-risk analysis** (`regulatory/concentration-risk-analysis.md`).
- **W2 — substantial-modification policy** (`regulatory/substantial-modification-policy.md`) — also referenced from the EU AI Act addendum.
- **W2 — incident-triage decision tree** (`regulatory/incident-triage-tree.md`) — operationalises §4.3.
- **W2 — register schema as JSON** (`regulatory/foundation-model-register.schema.json`).
- **Pending CTPP designations** under DORA Art. 31 — quarterly re-check.

### Dependency on other Wave-1 artefacts

- `governance/evidence-bundle-schema.md` (W1.7) — the register is a bundle component.
- `governance/authority-accountability-matrix.md` (W1.4) — TPRM officer / business sponsor / CISO delegate / Accountable Authority rows.
- `regulatory/eu-ai-act-addendum.md` (W1.5, this wave) — Art. 13, 27, 73 cross-references.
- `governance/governance-integration-note.md` (W1.1, in repo) — Tier-4 envelope withdrawal cascades on register-driven exit-plan execution.

---

## 9. Cross-references

- DORA: Regulation (EU) 2022/2554, OJ L 333, 27.12.2022.
- DORA RTS / ITS on register of information: Commission Implementing Regulation (EU) 2024/2956.
- DORA RTS on sub-contracting: Commission Delegated Regulation (EU) 2024/1773.
- DORA Delegated Reg. on CTPP designation: Commission Delegated Regulation (EU) 2024/1502.
- EU AI Act: Regulation (EU) 2024/1689; addendum: `regulatory/eu-ai-act-addendum.md`.
- AEnt-M Principle 9 (composite state): `agentic-enterprise-manifesto/manifesto.md`.
- IGM Principle 14 (claims as attack surfaces): `intelligence-governance-manifesto/manifesto.md` line 170.
- Governance Integration Note: `governance/governance-integration-note.md`.
- Swarm changelog: `governance/_swarm-changelog.md`.
