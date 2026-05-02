# EU AI Act Addendum

**Status:** DRAFT — author/legal review needed. Normative regulatory artefact.
**Wave 1, item W1.5** of the IGM/AEnt-M coherence-review remediation backlog (`igm-aent-coherence-review.md` §3, B5; §5, W1.5).
**Audience:** AEnt-M deployers, IGM substrate stewards, ASDLC release managers, APLC product managers, in-house counsel, CRO, internal audit (3rd line), DPOs, regulatory reviewers preparing for EU market surveillance authorities.
**Purpose:** Close the BLOCKER gap that the EU AI Act (Regulation (EU) 2024/1689) is nowhere named in the IGM, AEnt-M, AEM, ASDLC, or APLC bodies of work, despite an audience of regulated enterprises in 2026. This addendum maps manifesto domains against Annex III high-risk classifications, attaches operational templates for Articles 13, 14, 27, 12, 72, 73, treats GPAI obligations (Articles 51–55), and specifies conformity assessment and penalty exposure.

**As of the publication date (May 2026):** the EU AI Act entered into force on 1 August 2024. Prohibited-practices obligations applied from 2 February 2025; GPAI obligations from 2 August 2025. **High-risk-system obligations (Annex III + Articles 8–22, 26–29) apply from 2 August 2026 — three months from this document's date.** Member-state market surveillance authorities and the European AI Office are operational. The Commission post-market-monitoring template (Article 72) was due February 2026; if published by the time this addendum is consumed, adopt it directly and treat the template in §5.2 as bridging only.

**Cross-references.** All evidence requirements specified below are implemented through the unified evidence bundle (`governance/evidence-bundle-schema.md`, planned under W1.7). Authority assignments are normative in `governance/authority-accountability-matrix.md` (DRAFT, W1.4). Foundation-model provider obligations interact with `regulatory/foundation-model-third-party-register.md` (W1.6, this same wave).

**Citation convention.** Articles cited as "Art. N" with paragraph reference where relevant; recitals as "Recital N". Authoritative consolidated text and unofficial annotations: https://artificialintelligenceact.eu/ (mirror of the Official Journal text). The Official Journal text controls.

---

## 1. Scope and applicability — Annex III mapping

The EU AI Act applies to (a) providers placing AI systems on the Union market or putting them into service in the Union; (b) deployers established in the Union; (c) providers and deployers in third countries where the output is used in the Union (Art. 2(1)). For agentic systems built under AEM/AEnt-M and reasoning over an IGM-governed substrate, the **deployer** role is typical for the enterprise; the **provider** role applies to the foundation-model vendor and (for in-house-trained or substantially-modified models) the enterprise itself per Art. 25.

### 1.1 High-risk classification under Annex III

The following table maps the typical use cases targeted by the AEnt-M companion guide and the `domains/` files against Annex III (high-risk areas) of the EU AI Act. **Annex III is exhaustive for "high-risk by use" — if a use case is not in Annex III and not a safety component under Annex I, it is not high-risk by virtue of Annex III.** Other obligations may still apply (Art. 50 transparency, GPAI provisions, prohibited practices Art. 5).

| Manifesto domain / use case | Annex III point | High-risk? | Notes |
|---|---|---|---|
| **Settlement-instruction reconciliation** (custodian operations agent — `domains/financial-services.md`) | Not in Annex III | **No** by Annex III | Operational, not credit-scoring or insurance-pricing. Other obligations apply (DORA, MAR, transparency under Art. 50 if interacting with natural persons). |
| **Credit scoring / creditworthiness evaluation of natural persons** (retail bank, consumer credit) | Annex III, point 5(b) | **Yes** | Carve-out: AI used to detect financial fraud is excluded (point 5(b)). |
| **Risk assessment and pricing for life and health insurance** | Annex III, point 5(c) | **Yes** | Property and casualty insurance pricing is *not* in Annex III — verify with legal review per product. |
| **Insurance fraud detection** | Not in Annex III, point 5(b) carve-out applies analogously by recital reasoning | **No** typically | Document the analysis; mark in evidence bundle. |
| **Employment screening and CV filtering** (HR agent reading résumés, ranking candidates) | Annex III, point 4(a) | **Yes** | Includes AI used to advertise vacancies, screen, evaluate candidates. Recital 57. |
| **Workforce performance and behaviour monitoring** | Annex III, point 4(b) | **Yes** | Includes promotion/demotion decisions and termination. |
| **Healthcare diagnosis support** (clinical-decision-support agent) | Annex I + Annex III, point 5(d) | **Yes** | Annex I if it is a medical device under MDR/IVDR (most diagnostic CDS will be). Annex III, 5(d) covers AI used to evaluate eligibility for essential healthcare services. |
| **Public-sector benefit eligibility decisions** | Annex III, point 5(a) | **Yes** | Public authorities or on their behalf. |
| **Law-enforcement risk assessment for natural persons** | Annex III, point 6(a) | **Yes** | Strict; deployer obligations elevated. |
| **Border-management migration/asylum processing** | Annex III, point 7 | **Yes** | |
| **Administration of justice / democratic processes** | Annex III, point 8 | **Yes** | Includes AI used to assist judicial decision-making. |
| **Education and vocational training admission/evaluation** | Annex III, point 3 | **Yes** | |
| **Critical infrastructure operation** | Annex III, point 2 | **Yes** | Power grid management, water, gas, road safety. |

**Substantial-modification rule (Art. 25 + Recital 84).** A deployer that substantially modifies a high-risk AI system, or markets it under their own brand, becomes a *provider* and inherits provider obligations (Articles 16–22). Fine-tuning a foundation model on enterprise data, or wrapping a third-party model in an enterprise-branded agent, may cross this threshold. **DRAFT — legal review needed:** define an explicit threshold in `regulatory/substantial-modification-policy.md` (planned, Wave 2).

### 1.2 Out-of-scope and excluded uses (Art. 2)

- **Pure R&D systems** before placement on market (Art. 2(8)).
- **Military, defence, national security** purposes (Art. 2(3)) — but dual-use systems re-enter scope when deployed for civilian uses.
- **Personal non-professional** activity (Art. 2(10)).
- **Free and open-source AI components** released under permissive licences (Art. 2(12)) — but high-risk and GPAI obligations still apply if integrated into a high-risk system or a GPAI provider's offering.

### 1.3 Prohibited practices (Art. 5) — applicable since 2 February 2025

The following are **prohibited** regardless of risk class. Deployer-side compliance check:

- Subliminal manipulation, exploitation of vulnerabilities (Art. 5(1)(a)–(b)).
- Social scoring by public authorities (Art. 5(1)(c)).
- Real-time remote biometric identification in public spaces for law enforcement (Art. 5(1)(h)) with narrow exceptions.
- Workplace and education emotion-recognition (Art. 5(1)(f)) with carve-outs for medical/safety.
- Biometric categorisation of sensitive attributes (Art. 5(1)(g)).
- Predictive policing based solely on profiling (Art. 5(1)(d)).
- Untargeted scraping of facial images for facial-recognition databases (Art. 5(1)(e)).

The AEM-internal "Loop-readiness" gate and AEnt-M Principle 5 (constraint legibility) **must include an Art. 5 prohibited-practices check** as a precondition for any specification. **DRAFT — author action needed:** add a row to the AEnt-M loop-readiness checklist (referenced in the integration note) requiring explicit Art. 5 attestation before substrate ingest of any new use case.

---

## 2. Article 13 — Deployer instructions artefact

Art. 13 requires that high-risk AI systems be accompanied by **instructions for use** that include the items listed in Art. 13(2)(a)–(f) and Art. 13(3). The provider must furnish; the deployer must read, follow, and use them as the basis for human-oversight design under Art. 14 and FRIA under Art. 27.

### 2.1 Required content (Art. 13(3))

| Required item (Art. 13) | Where in manifesto stack it sits |
|---|---|
| (a) Identity and contact of provider | `regulatory/foundation-model-third-party-register.md` (W1.6) |
| (b) Characteristics, capabilities, limitations of performance, including intended purpose and level of accuracy, robustness, cybersecurity (Art. 15 metrics) | AEnt-M Principle 9 composite-state record + IGM substrate-state attestation |
| (c) Known or foreseeable circumstances that may lead to risks to health, safety, fundamental rights | FRIA (§4) + AEnt-M response classes |
| (d) Performance regarding specific persons or groups on which it is intended to be used | IGM domain claims + AEnt-M consequence-class assignment |
| (e) Specifications for input data, training, validation, testing data sets used | AEM evidence bundle + IGM provenance + ASDLC data-governance artefact |
| (f) Information enabling deployers to interpret output | IGM epistemic-tier record per cited claim + AEnt-M traceability chain |
| Human oversight measures including technical measures put in place by provider (Art. 13(3)(d)) | AEM Principle 5 Tier 4 envelope + AEnt-M relocation stage + IGM authorities |
| Expected lifetime and maintenance + log retention (Art. 13(3)(e)–(f)) | ASDLC maintenance-governance + IGM decay/curate cycle + foundation-model register exit-trigger schedule |

### 2.2 Template — Deployer Instructions Artefact

**Filename convention:** `regulatory/deployer-instructions/<system-id>-v<version>.md`. One file per high-risk AI system. Updated on every composite-state change material to Art. 13 content (per AEnt-M Principle 9).

```
DEPLOYER INSTRUCTIONS — Art. 13 EU AI Act
==========================================
System ID:                 <stable identifier>
Composite-state hash:      <from AEnt-M P9 register>
Version:                   <vN.M>
Issue date:                <YYYY-MM-DD>
Provider:                  <legal entity, registered address, EU rep if non-EU>
Deployer (this file):      <legal entity>
Annex III classification:  <point N(letter)>

1. Intended purpose
   - Use cases included:        <bullets>
   - Use cases excluded:        <bullets — material exclusions>
   - Geography of intended use: <Member States>
   - Categories of natural persons affected: <as in FRIA §4>

2. Capabilities and performance metrics (Art. 13(3)(b) + Art. 15)
   - Accuracy: <metric, value, conditions, evaluation date, reference dataset>
   - Robustness: <adversarial test results, drift bound>
   - Cybersecurity: <threat model link, pen-test date>
   - Known performance variation across protected groups: <table>

3. Known limitations (Art. 13(3)(b))
   - Out-of-distribution conditions: <list>
   - Edge cases requiring synchronous review: <list — feeds AEnt-M relocation stages>
   - Foundation-model GPAI dependency notes: <link to register>

4. Foreseeable misuse and risk circumstances (Art. 13(3)(c))
   - Reasonably foreseeable misuse: <list, paired with Art. 5 attestations>
   - Risks to health: <materiality assessment>
   - Risks to safety: <materiality assessment>
   - Risks to fundamental rights: <link to FRIA>

5. Data governance (Art. 13(3)(e) cross Art. 10)
   - Training data sources, characteristics, biases known: <bullets>
   - Validation set design: <bullets>
   - Testing set design + holdout strategy: <bullets>
   - Data-quality monitoring in production: <link to ASDLC artefact>

6. Human oversight measures (Art. 13(3)(d), Art. 14) — see §3 of this addendum
   - Tier-4 envelope ID: <link to AEM envelope-approval>
   - AEnt-M relocation stage per action class: <table>
   - Authority assignments per consequence class: <link to authority matrix>
   - Override procedures: <link>

7. Expected lifetime and maintenance (Art. 13(3)(e)–(f))
   - Retraining cadence: <e.g., quarterly>
   - Substrate revalidation cadence: <link to IGM decay-class table>
   - Foundation-model version-pinning strategy: <link to register>

8. Logs (Art. 12) — automatic logging configuration
   - Events logged: <link to §5 of this addendum>
   - Retention period: <≥ 6 months by default, longer per sectoral law>
   - Log-integrity mechanism: <hashing, append-only, KMS>

9. PMM hooks (Art. 72) — see §5
   - Indicator metrics: <list>
   - Reporting cadence to provider: <if non-self-provided>

10. Incident classification and reporting (Art. 73) — see §6
    - Named NCA / market-surveillance authority: <Member State + body>
    - Internal escalation contacts: <names + 24/7 reachability>
    - Trigger thresholds for each Art. 73 class: <bullets>

11. Update history
    | vN.M | Date | Composite-state delta | Author | Approver |
```

The instructions artefact is itself part of the unified evidence bundle. ASDLC release gate Condition 1 cannot pass for an Annex-III system without a current Art. 13 instructions artefact attached.

---

## 3. Article 14 — Human oversight measures

Art. 14(1) requires high-risk AI systems to be designed and developed such that they can be **effectively overseen by natural persons during the period in which they are in use**. Art. 14(4)(a)–(e) enumerates oversight capabilities.

### 3.1 Cross-reference to manifesto principles

| Art. 14(4) requirement | AEM | IGM | AEnt-M |
|---|---|---|---|
| (a) Properly understand capacities and limitations of the system | P5 (Tier 4 prerequisites: control evaluations + governance observability) + P8 evaluations | P11 traceability of claims used | P5 constraint legibility + P9 composite-state record |
| (b) Remain aware of automation bias | P12 rubber-stamping detection (mandatory Tier 4 prerequisite) | — | P8 consequence-class accountability — Decision Reviewer / Accountable Authority must demonstrate non-rubber-stamp behaviour |
| (c) Correctly interpret output | P9 observability | Per-claim epistemic-tier record + provenance chain | Traceability chain (regulatory source → claim → action) |
| (d) Decide not to use the output / disregard / reverse | P5 Tier 4 envelope kill-switch | P5 Curate retire authority | P9 composite-state-change "reject" default |
| (e) Intervene or interrupt operation through "stop" button | P5 envelope kill-switch (≤ 60s propagation) | — | Class-level reversion (R3 of integration note) + Block response class |
| (5) For Annex III point 1(a) biometric: two-natural-persons rule | — | — | P8 Dual Authority (matches by structure) |

### 3.2 Checklist — mapping manifesto oversight artefacts to Article 14

For each high-risk system, a deployer must produce evidence that all six rows below are operational. This list is normative for ASDLC release-gate Condition 1 on Annex-III systems.

```
ARTICLE 14 OVERSIGHT CHECKLIST
==============================

[ ] Art. 14(4)(a) — Capabilities and limitations
    Evidence: Art. 13 instructions artefact issued and read by named human.
    Manifesto artefact: AEM evidence bundle + AEnt-M composite-state record.
    Named human: <Decision Reviewer / Accountable Authority>

[ ] Art. 14(4)(b) — Automation-bias awareness
    Evidence: rubber-stamping detection metric live; alert threshold set;
              quarterly review of override rate.
    Manifesto artefact: AEM P12 metric in governance observability.
    Named human: <Accountable Authority + governance observability owner>

[ ] Art. 14(4)(c) — Output interpretation
    Evidence: per-decision audit reconstructable to cited claims and
              their epistemic tiers; provenance chain available.
    Manifesto artefact: IGM provenance + AEnt-M traceability chain.
    SLO: audit reconstruction ≤ 4 hours per AEnt-M Principle 12.

[ ] Art. 14(4)(d) — Decline / disregard / reverse
    Evidence: kill-switch tested in last 90 days; reversal procedure
              documented; rollback within blast-radius window.
    Manifesto artefact: AEM Tier 4 envelope kill-switch test record.

[ ] Art. 14(4)(e) — Intervene / interrupt
    Evidence: class-level reversion drill executed; envelope-level
              withdrawal drill executed in last 12 months.
    Manifesto artefact: Reversion-drill records per integration note R3.

[ ] Art. 14(5) — Two-person rule (Annex III 1(a) biometric only)
    Evidence: AEnt-M P8 Dual Authority assigned; both signatures
              recorded for every action.
    Manifesto artefact: Authority-matrix row for biometric class.
```

### 3.3 Authority anchor

For each high-risk system, **one named natural person** must be the Art. 14 oversight accountability anchor. By default this is the AEnt-M Accountable Authority for the highest-consequence class served by the system. The anchor is identified in the deployer instructions artefact (§2.2 row 6) and is recorded in `governance/authority-accountability-matrix.md`.

---

## 4. Article 27 — Fundamental Rights Impact Assessment (FRIA)

Art. 27 imposes a FRIA obligation on **deployers that are bodies governed by public law, private operators providing public services, or deployers of certain Annex III systems** (creditworthiness — point 5(b); life and health insurance pricing — point 5(c)). Member-state law may extend the obligation. The FRIA is performed **before first use** and updated when material elements change (Art. 27(2)).

### 4.1 Required content (Art. 27(1))

(a) Description of deployer's processes in which the high-risk AI system will be used.
(b) Period of time and frequency of intended use.
(c) Categories of natural persons and groups likely to be affected.
(d) Specific risks of harm likely to impact those categories.
(e) Description of human oversight measures.
(f) Measures to be taken in case those risks materialise — including internal governance and complaint mechanisms.

The deployer must notify the market-surveillance authority of the **results** of the FRIA via the AI Office template (Art. 27(5)) — to be published; bridging template in §4.3.

### 4.2 Template — FRIA artefact

**Filename convention:** `regulatory/fria/<system-id>-FRIA-v<version>.md`. Living document, refreshed on material change. Linked from the deployer instructions artefact §2.2 row 4.

```
FUNDAMENTAL RIGHTS IMPACT ASSESSMENT (FRIA) — Art. 27 EU AI Act
================================================================

Status:                    DRAFT — author/legal review needed
System ID:                 <stable identifier>
Annex III classification:  <point N(letter)>
Deployer legal entity:     <name + registered address>
Notified to authority on:  <YYYY-MM-DD or "not yet">
Authority:                 <Member-state market-surveillance body>
FRIA approver:             <named natural person; AEnt-M Accountable Authority>
FRIA reviewer:             <DPO + legal counsel>
Effective from:            <YYYY-MM-DD>
Next material review by:   <YYYY-MM-DD>

1. Intended purpose (Art. 27(1)(a))
   1.1 Process description: <how the system fits into deployer process>
   1.2 Decision points where the AI output influences a natural person:
       <bulleted list with each decision named>
   1.3 Out-of-scope uses: <bulleted list>

2. Frequency and period of use (Art. 27(1)(b))
   - Volume of decisions per period: <N per day/week/month>
   - Concurrent affected persons (peak): <N>
   - Time horizon of deployment: <until date or indefinite>

3. Categories of natural persons affected (Art. 27(1)(c))
   - Direct subjects of decisions: <e.g., applicants, employees, patients>
   - Indirect parties: <e.g., dependents, communities>
   - Vulnerable categories present (Art. 5(1)(b) factors): <minors,
     persons with disabilities, economic vulnerability, etc.>

4. Specific risks of harm (Art. 27(1)(d))
   For each fundamental right potentially affected, document:

   | FR (CFR Article) | Risk description | Likelihood | Severity | Reversibility |
   |---|---|---|---|---|
   | Dignity (Art. 1)         | <e.g., algorithmic dehumanisation in benefit denial>          | <L/M/H> | <L/M/H> | <Yes/No> |
   | Non-discrimination (Art. 21) | <protected-attribute proxy in scoring>                   | | | |
   | Privacy (Art. 7) + Data protection (Art. 8) | <inference of sensitive data>             | | | |
   | Effective remedy (Art. 47) | <inability to contest>                                      | | | |
   | Right to good administration (Art. 41) | <opacity to public-service applicants>          | | | |
   | Children's rights (Art. 24) | if applicable                                              | | | |
   | Workers' rights (Art. 31) | if employment-screening                                      | | | |

5. Human oversight measures (Art. 27(1)(e))
   - Reference to Art. 14 oversight checklist (this addendum §3.2)
   - AEnt-M relocation stage at first use: <stage; default Stage 1
     for FRIA-bearing systems>
   - Named accountability anchor: <person>
   - Override authority: <person + procedure>

6. Measures if risks materialise (Art. 27(1)(f))
   6.1 Internal mitigation:
       - Containment trigger: <metric threshold>
       - Containment action: <e.g., revert to Stage 1 or withdraw envelope>
       - Notification chain: <internal stakeholders + DPO + legal>
   6.2 External notification:
       - Art. 73 trigger conditions met → see §6 of this addendum.
       - GDPR Art. 33 personal-data-breach trigger: 72 h to supervisory authority.
       - Sectoral notifications (e.g., DORA major incident — see foundation-model
         register §4) — list per use case.
   6.3 Complaint and redress (Art. 85 + complementing CoE Convention Art. 11):
       - Affected-person complaint channel: <web form + postal + email>
       - Acknowledgement SLA: <≤ 5 business days>
       - Substantive response SLA: <≤ 30 calendar days>
       - Right to human review of automated decision (GDPR Art. 22 + Art. 86 EU AI Act):
         <process + named decision-reviewer authority>
       - Right to explanation: <how the cited claims and their epistemic tiers
         are summarised for the affected person>

7. DPIA cross-reference (GDPR Art. 35)
   For systems also requiring a DPIA, FRIA may be combined with DPIA
   per Art. 27(4). State whether combined and link both documents.

8. Approval signatures
   <Accountable Authority>      <DPO>      <Legal Counsel>      <Date>

9. Notification to market-surveillance authority
   - Notified on:    <date>
   - Method:         <AI Office template / national equivalent>
   - Reference:      <ack reference if assigned>
```

### 4.3 Notification flow

Until the AI Office template (Art. 27(5)) is published, deployers should submit the FRIA summary (sections 1, 3, 4, 5, 6 above) to the national market-surveillance authority designated under Art. 70. List of designated authorities should be tracked at `regulatory/eu-ncas-by-member-state.md` (planned, Wave 2). Submit in advance of first use; Recital 96 supports advance engagement.

---

## 5. Article 12 — Logging; Article 72 — Post-market monitoring

### 5.1 Article 12 — Automatic logging over the system lifetime

Art. 12 requires high-risk AI systems to **automatically record events ("logs")** over the lifetime of the system. Art. 12(2) requires logs to ensure a level of traceability appropriate to the intended purpose. For systems under Annex III point 1(a) (remote biometric identification), Art. 12(3) mandates specific log content. Logs must be kept for a period appropriate to the intended purpose, **at least 6 months unless sectoral law specifies otherwise** (Art. 19).

### Required logging content (Art. 12(2)–(3))

| Event class | Logged fields | Retention |
|---|---|---|
| Each use period | start/end timestamp, system version, composite-state hash, operator (if attended) | ≥ 6 months |
| Reference database against which input data has been checked (when applicable) | DB ID, version, query hash | ≥ 6 months |
| Input data leading to a match (when applicable) | hashed reference (preserve privacy), match confidence | ≥ 6 months |
| Identification of natural persons involved in result verification | named human ID, role, decision (approved/overrode) | ≥ 6 months |

The IGM substrate-state attestation, AEnt-M traceability chain, and AEM evidence bundle together produce the Art. 12 logs. The unified schema (`governance/evidence-bundle-schema.md`) **must include Art. 12 fields as required for any Annex-III system**.

### 5.2 Article 72 — Post-market monitoring

Art. 72(1) requires providers (and deployers acting as providers under Art. 25) to establish and document a **post-market monitoring system** proportionate to the nature of the AI technologies and the risks of the high-risk AI system. Art. 72(2) obliges actively and systematically collecting, documenting, and analysing relevant data about performance throughout lifetime. Art. 72(3): the Commission shall adopt an implementing act with a template — **due by 2 February 2026**. As of May 2026, the template is to be adopted on publication; until then the bridging template below applies.

### PMM bridging template (adopt Commission template once published)

```
POST-MARKET MONITORING PLAN — Art. 72 EU AI Act (BRIDGING TEMPLATE)
====================================================================

System ID, Annex III class, provider/deployer, period covered.

1. Performance indicators (sourced from Art. 13 instructions §2)
   - Accuracy on production traffic vs validation
   - Robustness drift indicators (input distribution shift, output distribution shift)
   - Latency and availability
   - User override rate (Art. 14(4)(b) signal)
   - Cited-claim epistemic tier distribution (IGM signal — what fraction of
     decisions relied on Authoritative claims vs Confirmed)
   - Composite-state changes per period (AEnt-M P9)

2. Incident counters
   - Art. 73 reportable incidents by class
   - Near-misses (incidents that would have been reportable but for an
     intervening control)
   - Customer complaints classified per FRIA §6.3 channel

3. Foundation-model dependency signals (cross-ref foundation-model register)
   - Provider-side notices of model deprecation, version change,
     training-data update
   - Sub-processor changes
   - SLA breaches by provider

4. Substrate health (cross-ref IGM)
   - Decay-window breaches per decay class
   - Active contradictions on critical-path claims
   - Curate-cycle latency

5. Reporting cadence
   - Internal monthly review by Accountable Authority
   - Quarterly review by governance observability owner
   - Annual provider-deployer review (if separate parties)

6. Trigger conditions for corrective action
   - Indicator threshold X exceeded for N consecutive periods → cause analysis
   - Substrate degradation → AEnt-M class-level reversion
   - Repeated same-class incidents → envelope-level review

7. Connection to evidence bundle (governance/evidence-bundle-schema.md)
   - PMM data feed populates the bundle's "operational signals" component
     for systems under Annex III.
```

When the Commission template is published, replace this section with the official template and re-stamp this addendum.

---

## 6. Article 73 — Serious-incident reporting

Art. 73 requires providers (and deployers acting as providers per Art. 25) of high-risk AI systems to **report serious incidents to the market-surveillance authority of the Member State where that incident occurred**. A "serious incident" (Art. 3(49)) means an incident or malfunction directly or indirectly leading to (a) death or serious damage to health, (b) serious and irreversible disruption of critical infrastructure, (c) infringement of obligations under Union law intended to protect fundamental rights, (d) serious damage to property or environment.

### 6.1 Reporting timers (Art. 73(2)–(4))

| Trigger class | Initial-report deadline | Detail |
|---|---|---|
| Death of a person, or *widespread infringement* (Art. 3(61): infringement harming or affecting persons in three or more Member States, or one Member State if substantial harm) | **2 days** from awareness | Initial information; updates as info becomes available |
| Other serious incidents (a)–(d) | **15 days** from awareness | |
| Malfunction breaching obligations under Union law intended to protect fundamental rights | **10 days** from awareness | |

The deployer must inform the provider without undue delay (Art. 26(5)) and may have a parallel obligation to report (Art. 73(7)) where the deployer becomes aware. **Both clocks may run.**

### 6.2 Required content (Art. 73(6))

(a) Description of the incident or malfunction.
(b) AI system identification (provider, model, version, composite-state hash).
(c) Description of harm caused.
(d) Corrective measures taken or envisaged.
(e) Investigation cooperation undertaking.

### 6.3 Workflow

```
ART. 73 SERIOUS-INCIDENT REPORTING WORKFLOW
============================================

T0 — Incident detected (by AEnt-M observability, customer complaint, third-party alert)

Step 1 — Triage (≤ 2 hours from T0)
    Performed by:    On-call Accountable Authority for the affected system
    Output:          Trigger-class assessment (Art. 73(2)(a) / (b) / fundamental-rights / not Art. 73)
    Tooling:         Decision tree in regulatory/incident-triage-tree.md
    Compose with:    DORA major-incident assessment (foundation-model register §4) — both
                     classifications run in parallel.

Step 2 — Internal containment (parallel to Step 1)
    Performed by:    System steward + Accountable Authority
    Action:          Class-level reversion (default), or envelope withdrawal if appropriate
    Evidence:        Reversion record appended to evidence bundle

Step 3 — Initial report to NCA (≤ 2 / 10 / 15 days per trigger class)
    Performed by:    Accountable Authority (deployer) / Provider liaison (if separate)
    Recipient:       Market-surveillance authority of Member State where incident occurred
                     (list at regulatory/eu-ncas-by-member-state.md)
    Format:          Per Art. 73(6) — see §6.4 template below
    Cooperation:     Parallel cross-border notification via EU AI Office for widespread infringement

Step 4 — Investigation and follow-up reports
    Cadence:         Updates as further information becomes available (Art. 73(5))
    Final report:    Submitted on completion of investigation

Step 5 — Lessons-learned (≤ 30 days post-final-report)
    - Substrate update: revoke or amend claims that contributed
    - APLC red-team: add the incident class to red-team protocols (cross-ref
      W2.23 contradiction-injection cases)
    - Composite-state change applied
    - Authority matrix reviewed

Step 6 — Public reporting
    - GDPR Art. 34 personal-data-breach communication if applicable
    - Internal disclosure to affected business lines
    - External disclosure per sectoral law
```

### 6.4 Initial-report template

```
ART. 73 SERIOUS INCIDENT — INITIAL REPORT
==========================================

Filed by:                 <Provider / Deployer-as-provider entity>
Filed on (UTC):           <YYYY-MM-DD HH:MM>
Trigger class:            [ ] death/widespread (2d)  [ ] FR-malfunction (10d)
                          [ ] other serious (15d)
Awareness timestamp:      <YYYY-MM-DD HH:MM, UTC, when provider/deployer became aware>
Recipient authority:      <NCA name, country, reference>
Cross-border notification: <yes/no — EU AI Office>

1. Incident description (Art. 73(6)(a))
   - Onset: <UTC>
   - Detection: <UTC + detection mechanism>
   - Containment: <UTC + action>
   - Geography of impact: <Member States>

2. AI system identification (Art. 73(6)(b))
   - System ID:               <stable id>
   - Annex III class:         <point>
   - Provider:                <legal entity>
   - Foundation-model deps:   <ref to register entry>
   - Version + composite-state hash at time of incident: <hash>
   - Tier-4 envelope ID + status: <link>

3. Harm caused (Art. 73(6)(c))
   - Persons affected: <numbers + categories from FRIA §3>
   - Health/safety harm: <description>
   - Fundamental-rights impact: <CFR articles + description>
   - Property/environmental: <description>

4. Corrective measures (Art. 73(6)(d))
   - Immediate (≤ 24h): <list>
   - Short-term (≤ 30 days): <list>
   - Investigation plan: <scope, owner, completion target>

5. Cooperation undertaking
   - Single point of contact: <name, role, 24/7 reachable>
   - Provider–deployer division of labour for follow-up: <description>

6. Other regulatory notifications filed in parallel
   - DORA major-incident (if FS): <yes/no, reference>
   - GDPR Art. 33 (if personal-data breach): <yes/no, reference>
   - Sectoral (e.g., CSDR Art. 7 for FS, MDR vigilance for medical devices):
     <list>
```

### 6.5 Recipient authority — named per Member State

The market-surveillance authority is determined by the Member State where the incident occurred (Art. 73(1)). For systems with multi-MS operation, primary recipient is the MS of incident; widespread-infringement triggers cross-border notification via the EU AI Office. **DRAFT — list to be maintained:** `regulatory/eu-ncas-by-member-state.md` (planned, Wave 2); illustrative entries: France — CNIL + market-surveillance lead per sector; Germany — BNetzA + sectoral; Ireland — DPC + designated MSA; Italy — Garante + designated MSA; Spain — AESIA.

---

## 7. GPAI obligations (Articles 51–55)

### 7.1 Provider vs deployer split

The EU AI Act distinguishes:

- **GPAI model provider** (Art. 53): obligations include model documentation, copyright training-data summary (Art. 53(1)(d)), cooperation with AI Office, transparency to downstream system providers.
- **GPAI model with systemic risk** (Art. 51): additional obligations under Art. 55 — model evaluations including adversarial testing, systemic-risk assessment, serious-incident tracking, cybersecurity, energy reporting.
- **Downstream provider** (the enterprise integrating a GPAI into a high-risk AI system): inherits Art. 16–22 provider obligations for the integrated high-risk system; relies on the GPAI provider's documentation per Art. 53.
- **Deployer** of the high-risk system: Art. 26 obligations (use per instructions, monitor, log, FRIA where applicable, incident reporting per Art. 73).

### 7.2 Systemic-risk classification (Art. 51)

A GPAI model is presumed to have systemic risk if its training cumulative compute exceeds **10²⁵ floating-point operations** (Art. 51(2)). The Commission may also designate a model as systemic-risk based on capability indicators (Art. 51(1)(b)). Providers must **notify the Commission within 2 weeks** of meeting the threshold or becoming aware (Art. 52(1)).

The 10²⁵ FLOP threshold is met by current frontier models including (illustrative — verify per provider disclosure): GPT-4 class and successors, Claude 3 / 4 / 4.5 / 4.6 / 4.7 family, Gemini Ultra / Pro 2 / 2.5, Llama 3.1 405B class and above.

### 7.3 Implications for AEnt-M composite-state tracking

When the foundation model in the composite state of an agent product is **provided by a systemic-risk GPAI provider**, the following additional considerations apply:

- The composite-state hash must record the provider's stated systemic-risk status and Art. 52 notification reference.
- A change in the GPAI model's systemic-risk classification (newly designated, or threshold-crossing version) is a **composite-state change** under AEnt-M Principle 9 with default reaction "reject" — i.e., requires explicit re-acceptance, not silent passthrough.
- The foundation-model third-party register (`regulatory/foundation-model-third-party-register.md`) must include a "systemic-risk classification" field with notification date.
- The GPAI provider's Art. 55 model-evaluation summaries (where shared) feed the deployer's AEM Principle 8 evaluation portfolio.

### 7.4 Code of Practice (Art. 56)

The voluntary GPAI Code of Practice (published by the AI Office; applicable from 2 August 2025) is the bridging compliance instrument for Art. 53 and Art. 55 obligations until harmonised standards are adopted. Deployers should require GPAI providers to confirm Code of Practice subscription as a procurement gate (cross-ref foundation-model register §7).

---

## 8. Conformity assessment

Art. 43 specifies the conformity-assessment procedure for high-risk AI systems.

### 8.1 Internal-control conformity (Annex VI)

For most Annex III systems (other than Annex III point 1 biometric, in some cases), conformity is assessed via **internal control** (Annex VI). The provider:

- Establishes a quality-management system (Art. 17) — ISO/IEC 42001 is a strong path; harmonised standard expected.
- Drafts the technical documentation (Art. 11 + Annex IV).
- Performs the conformity assessment without notified-body involvement.
- Issues the EU declaration of conformity (Art. 47) and affixes CE marking (Art. 48).

### 8.2 Notified-body conformity (Annex VII)

Required for Annex III point 1(a) remote biometric identification, and for systems where a harmonised standard or common specification has not been (fully) applied. The notified body audits the provider's QMS and the technical documentation.

### 8.3 ISO/IEC 42001 as a path

ISO/IEC 42001:2023 (AI management systems) is widely treated as a candidate for harmonisation under Art. 40. Adopting ISO/IEC 42001 with Annex A controls fulfils a substantial part of Art. 17 QMS obligations. Cross-reference `regulatory/iso-42001-crosswalk.md` (planned, Wave 2 W2.10) for the mapping.

### 8.4 Substantial-modification triggers re-assessment

A substantial modification to a CE-marked high-risk system triggers a new conformity assessment (Art. 43(4)). The composite-state change semantics (AEnt-M Principle 9) provide the operational mechanism: any composite-state change that crosses the substantial-modification threshold (defined in `regulatory/substantial-modification-policy.md`, planned) **must** trigger re-assessment, not merely composite-state acceptance.

---

## 9. Penalty schedule (Article 99)

Art. 99 sets administrative fines applied by Member States, with the following ceilings (whichever is higher of fixed amount or percentage of preceding-financial-year worldwide annual turnover):

| Infringement | Cap (the higher of) | Article reference |
|---|---|---|
| **Prohibited practices** (Art. 5) | **€35M / 7% global turnover** | Art. 99(3) |
| **Non-compliance with other provisions** (high-risk obligations Art. 8–22, deployer Art. 26, transparency Art. 50, GPAI Art. 53/55, etc.) | **€15M / 3% global turnover** | Art. 99(4) |
| **Supply of incorrect, incomplete, or misleading information** to NCAs / notified bodies | **€7.5M / 1% global turnover** | Art. 99(5) |

For SMEs and start-ups, the lower of the fixed amount or the percentage applies (Art. 99(6)).

In addition: GPAI-specific fines under Art. 101 — **up to 3% of global turnover or €15M** — for GPAI providers' breaches.

Member States may impose criminal sanctions (Art. 99(1)). Individual liability for managers may arise under member-state law.

---

## 10. Implementation and DRAFT items

This addendum is **DRAFT — author/legal review needed** and must be reviewed by:

- In-house legal counsel and DPO of each deployer organisation before relying on it operationally.
- A regulatory specialist with EU AI Act practice for the Annex III mapping per use case.
- The named Accountable Authority for each high-risk system, who signs off on the FRIA and Art. 13 instructions artefacts.

### Open items

- **W2 — substantial-modification policy** (`regulatory/substantial-modification-policy.md`).
- **W2 — NCA register by Member State** (`regulatory/eu-ncas-by-member-state.md`).
- **W2 — ISO 42001 crosswalk** (`regulatory/iso-42001-crosswalk.md`).
- **W2 — incident-triage decision tree** (`regulatory/incident-triage-tree.md`).
- **Pending Commission template** for Art. 72 PMM (due Feb 2026): adopt on publication and re-stamp §5.2.
- **Pending AI Office template** for Art. 27 FRIA notification: adopt on publication and re-stamp §4.3.

### Dependency on other Wave-1 artefacts

- `governance/evidence-bundle-schema.md` (W1.7) — required for every Art. 13 instructions artefact and every FRIA approval.
- `governance/authority-accountability-matrix.md` (W1.4) — required for every "named human" placeholder in §3 and §4.
- `regulatory/foundation-model-third-party-register.md` (W1.6, this wave) — required for every Art. 13 §2.2 row 7 and §7.3 entry.

---

## 11. Cross-references

- Authoritative consolidated text: https://artificialintelligenceact.eu/ (mirror) — Official Journal text controls.
- AEnt-M Principle 8 (consequence-class accountability): `agentic-enterprise-manifesto/manifesto.md` lines covering P8 (per `igm-aent-coherence-review.md` §3 B10).
- AEnt-M Principle 9 (composite state): `agentic-enterprise-manifesto/manifesto.md`.
- AEM Principle 12 (accountability): `manifesto-principles.md`.
- IGM Principle 6 (authorities): `intelligence-governance-manifesto/manifesto.md` line 156.
- IGM Principle 14 (claims are attack surfaces — Wave 1 W1.3): `intelligence-governance-manifesto/manifesto.md` line 170.
- Governance Integration Note (Tier 4 / relocation / substrate): `governance/governance-integration-note.md`.
- Foundation-Model Third-Party Register: `regulatory/foundation-model-third-party-register.md`.
