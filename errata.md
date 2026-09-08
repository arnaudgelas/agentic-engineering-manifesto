# Errata

Dated corrections to previously published content in this repository. Each entry
records what was wrong, what was done about it, and when.

## 2026-09-06

- **`D-62` closed in `domains/pharma.md`: four EU GMP Annex 11 citations moved to
  the paragraph that carries the obligation each row claims.** All four were live
  at `HEAD` (`c1d0d19`) at exactly the register's line numbers — `:124`, `:209`,
  `:311`, `:423` — and live in the working tree at `:153`, `:238`, `:340`,
  `:460` when this pass began (06.09.2026, 20:14 CEST). **Both sets of locators
  are recorded because they address different trees**, and the register's four
  are correct against `HEAD` and stale against the worktree. **The census this
  pass was briefed from gave the worktree locators as `:154`, `:239`, `:341`,
  `:461` — one greater than measured at every one of the four.** Read at primary
  against `inputs/20260905-arnaud/prep/pharma/sources/annex11.pdf`, SHA-256
  `8ec11211ba33bf88ad4e71acc6bf60fd0e7823cfa495b116872e2c287e4aebbb` (EudraLex
  Vol. 4, Annex 11 *Computerised Systems*, rev. 1, in force 30 June 2011),
  through its extracted text `annex11.txt`, SHA-256
  `8465d1b02b5dd60f080451446881a8b4c2809733e8bea8195c402949463b8786` — retrieved
  and hashed by the `T6.3.q7` pass, reused and not re-fetched; and against
  `part211.txt` for 21 CFR 211.68. The annex was read end to end, Principle to
  Glossary, not searched.
  - **`:124` / worktree `:153`, *Data backup and recovery*, `s 7.1` → `s 7.2`.**
    §7.1 is *Data Storage* and requires stored data to be secured and checked for
    accessibility, readability and accuracy; it does not require restore testing.
    §7.2 is the backup provision and is the only place the annex says *"the
    ability to restore the data should be checked during validation and monitored
    periodically"*.
  - **`:209` / worktree `:238`, *Agent-generated data as "original" data*,
    `Annex 11 s 8` dropped.** §8 is *Printouts* — §8.1 clear printed copies, §8.2
    printouts for batch release showing changes since the original entry — and it
    defines no source or original record. *Original* is an ALCOA attribute; the
    row now cites PIC/S PI 041-1 and WHO TRS 1033 Annex 4, which the metadata row
    immediately below already cited correctly, and tightens `21 CFR 211.68` to
    `211.68(b)`.
  - **`:311` / worktree `:340`, GMP batch-record modification cap,
    `Annex 11 §9` → `§15`.** §9 is *Audit Trails*: it records that a change
    occurred and restricts nobody. **§15 *Batch release*** is the provision that
    restricts execution — *"the system should allow only Qualified Persons to
    certify the release of the batches"*, using an electronic signature — and §15
    was cited **nowhere** in the file. The cap itself was never in doubt: it
    survives on the co-cited `21 CFR 211.68(b)`, *"changes in master production
    and control records or other records are instituted only by authorized
    personnel"*, now quoted in the row.
  - **`:423` / worktree `:460`, memory accumulation as a change,
    `Annex 11 s 11` → `s 10`.** §11 is *Periodic evaluation*; §10 is *Change and
    Configuration Management*, **which the same table already cited correctly two
    and one rows above**, at `:421`–`:422` / worktree `:458`–`:459`. This is the
    one of the four that needed no primary at all.
  - **The two uncited provisions the entry required in the same edit are in it.**
    **§12.4** — *"record the identity of operators entering, changing, confirming
    or deleting data including date and time"* — now carries the identity, date
    and time elements the *Agent-modified data* row credited to §9 alone. **§3
    *Suppliers and Service Providers*** now opens §8 *Supplier Qualification*,
    which had cited only GAMP 5 and EU GMP Chapter 7 although §3 is the direct EU
    provision behind it: §3.1 formal agreements stating the third party's
    responsibilities, §3.2 risk-based audit, §3.3 review of COTS documentation,
    §3.4 supplier quality and audit information available to inspectors on
    request.
  - **Nothing is retracted. Every substantive claim in the four rows stands
    unchanged** — that is this defect class's close condition, and each row now
    names in the same sentence the provision it formerly cited, so a reader
    holding the old text can see what moved (`F2`).
- **The register's `aplc` extension of `D-62` was verified rather than assumed,
  and it is complete.** `agent/agent-annex-iv-mapping.md:28` cited **Art. 48**
  (CE marking) for the EU declaration of conformity; the working tree there now
  cites **Art. 47**, with 47(2)/Annex V for the content and 47(1) for the
  provider's 10-year duty. Checked at the hashed AI Act primary
  (`a0f437e8966746b88b15d35bc9e7a9dbe930e2938a941548524a565121c7929b`), read in
  sequence: **Art. 47 is *EU declaration of conformity*, Art. 48 is *CE
  marking***, 48(2) being digital CE marking, and no paragraph of Art. 48 touches
  the declaration. **Enumerated in both trees rather than taken from the
  register**: `aplc` `HEAD` (`821e242`) carries **2** `Art. 47`/`Art. 48` lines
  in 2 files — the one wrong site and a **Solvency II Art. 48** (*Actuarial
  function*) correctly left alone; the working tree carries **14** in 5 files,
  every one of them Art. 47 and correct. **The register's own figure of "25
  occurrences in 8 files" is reproducible against neither tree**, and it does not
  say which tree it addressed.
- **This repository's own Art. 47/48 usage was checked for consistency with that
  repair and needs no edit.** `regulatory/eu-ai-act-addendum.md:607` reads
  *"Issues the EU declaration of conformity (Art. 47) and affixes CE marking
  (Art. 48)"* on the provider row — both correct; `:290` is Art. 47 of the
  Charter of Fundamental Rights (effective remedy), a different instrument.
- **Gates, run 06.09.2026 20:19 CEST from the corpus root.**
  `tools/register-crossref.sh` **exit 0, four consecutive runs, byte-identical**
  (md5 `14bf051ba840a746a583484a7d9313fe`), defects **73**, tasks **55**.
  `tools/link-check.sh` **broken 4 / total 1051 across 5 repos**, against **1046**
  before this pass. **The movement was named before the run and it landed
  exactly**: **+5**, being the four `../errata.md` links added by the `D-62` edit
  in `domains/pharma.md` and one added in `aplc`. **Broken did not move and was
  not expected to** — no link was removed and every added link resolves.
- **Rebuild.** This edit makes the rendered HTML stale for the **thirteenth**
  time. **No `.html` was hand-patched.** A thirteenth rebuild must carry
  `domains/pharma.html` in this repository. `aplc` contains **no `.html` at
  all**, so its edit needs no rebuild.
- **Tracking (`D-73`).** This file is tracked, so
  `git -C agentic-engineering-manifesto diff` **does** show this entry.
  **`agentic-engineering-manifesto` last committed 02.09.2026 at `c1d0d19`** and
  this pass committed nothing, so **none of the four `D-62` repairs above reaches
  a reader holding `HEAD` of this repository**, and all four remain live there at
  `:124`, `:209`, `:311` and `:423`. The checkout is on branch **`alignment`**,
  which `git rev-parse main alignment origin/main` reports identical to `main` at
  `c1d0d19`. **`aplc/errata.md` is no longer untracked** — it is **staged and
  uncommitted** (`git -C aplc status --short errata.md` → `A `, 20:17 CEST) — so
  the register's `D-73` and `D-57` statements about it are stale as of today;
  `aplc` itself last committed **02.05.2026**. **No struck-string row is added
  for any of this**, per the `D-63` precedent: a row green in a working tree and
  red at `HEAD` fails the next checkout.

- **An invented Art. 6(2) test in `domains/financial-services.md`, creating a
  route into high-risk that the Regulation does not contain.** The
  "High-risk classification in financial services" section closed with
  "Additional financial use cases may qualify as high-risk under the general
  criteria in Art. 6(2) when they significantly affect decisions about natural
  persons." Re-read at the hashed primary
  (the Official Journal HTML snapshot of Regulation (EU) 2024/1689, sha256 prefix
  `a0f437e89667`), Art. 6(2) reads in full: "In addition to the high-risk AI
  systems referred to in paragraph 1, AI systems referred to in Annex III shall
  be considered to be high-risk." It is a closed cross-reference to Annex III
  and contains no criteria and no natural-persons threshold. **Both quoted
  phrases are absent from the entire Act** — "general criteria" and
  "significantly affect decisions about natural persons" each probed ABSENT on a
  harness that returned the Art. 6(2), Art. 6(3), Art. 6(4), Art. 7(1) and
  Annex III point 5 text PRESENT as positive controls — so this was a fabrication
  rather than a miscitation. It also ran backwards: the nearest real provision,
  Art. 6(3), is a derogation *out of* high-risk, so a reader following the
  sentence would have classified systems **into** high-risk that the Act
  classifies out. The sentence contradicted `regulatory/eu-ai-act-addendum.md`
  §1.1 ("Annex III is exhaustive for 'high-risk by use'"), the preceding bullets
  in its own file, and `aplc/agent/agent-regulatory-classification.md` § Step 2
  ("eight points and no more ... a category cited outside that structure does
  not exist"). The paragraph was re-attributed rather than deleted: it now
  states that Annex III is the only "by use" route and is amendable only by the
  Commission by delegated act under Art. 7, that the separate Annex I route
  requires both limbs of Art. 6(1), and that Art. 6(3) runs the other way and
  costs the Art. 6(4) documented assessment and Art. 49(2) registration —
  marked `F2` for the residual entry route, which nothing in the Act supports.
  A flattened, whitespace-normalized scan of all six repositories (325 `.md`,
  `.html` and `.txt` files) found the claim at one Markdown source only; a
  line-based grep for "general criteria" returns a false zero even inside the
  affected file, because the phrase wraps across a line break. No other route
  into high-risk outside Annex III and Annex I was found in the corpus.

- **A high-risk classification reached on one of Art. 6(1)'s two limbs, in
  `regulatory/eu-ai-act-addendum.md` §1.1 -- and contradicting this repository's
  own `domains/medical-devices.md` by omission.** The *Healthcare diagnosis
  support* row put **Yes** in the High-risk column and explained it, in the
  Notes cell, by reference to the EU AI Act, as "Annex I if it is a medical device under MDR/IVDR (most
  diagnostic CDS will be)". Device status is limb (a) only. Re-read at the
  hashed primary (the Official Journal HTML snapshot of Regulation (EU) 2024/1689,
  sha256 prefix `a0f437e89667`), EU AI Act Art. 6(1) makes a system high-risk only where
  **both** conditions are fulfilled, and limb (b) additionally requires that the
  product "is required to undergo a third-party conformity assessment, with a
  view to the placing on the market or the putting into service of that product
  pursuant to the Union harmonisation legislation listed in Annex I".
  MDR Art. 52(7), at the hashed primary
  (the EUR-Lex HTML snapshot of Regulation (EU) 2017/745 (MDR), sha256 prefix
  `cac04f2a970b`), provides that manufacturers of class I devices other than
  custom-made or investigational devices "shall declare the conformity of their
  products by issuing the EU declaration of conformity referred to in Article 19
  after drawing up the technical documentation set out in Annexes II and III" --
  self-declaration, no notified body; the only class I exceptions (sterile
  condition, measuring function, reusable surgical instruments) draw
  notified-body involvement limited to those aspects alone. A class I CDS device
  therefore satisfies (a) and **fails (b)**. `domains/medical-devices.md`
  (§ EU MDR + AI Act Dual Compliance) already had this right -- Class IIa+
  requires notified-body involvement, so (b) is generally satisfied for Class
  IIa+ but (a) is not automatic -- and the addendum table contradicted it by
  omission, which is how the wrong version becomes the one a reader trusts.
  **Nothing was deleted and the classification was not withdrawn**: the verdict
  is bounded and the condition now sits **in the verdict's own cell**, not in a
  note below the table, because a table cell travels alone. The cell now reads
  Yes on the Annex III route for 5(a) eligibility and 5(d) triage/dispatch, and
  on the Annex I route only where both limbs of Art. 6(1) are met, naming Class
  I as failing (b) and Class IIa and above as generally satisfying it, and
  directing that the limb the determination turns on be recorded.

- **Art. 6(1) reduced to limb (a), and limb (a) itself halved, in the lead-in to
  the same table.** `regulatory/eu-ai-act-addendum.md:22` read "if a use case is
  not in Annex III and not a safety component under Annex I, it is not high-risk
  by virtue of Annex III". That clause states the Annex I route as the
  safety-component test alone. At the primary, limb (a) is "the AI system is
  intended to be used as a safety component of a product, **or the AI system is
  itself a product**, covered by the Union harmonisation legislation listed in
  Annex I" -- a standalone AI system that is itself an Annex I product is inside
  limb (a) and outside the clause as written -- and limb (a) is in any event not
  sufficient without limb (b). Both limbs are now quoted in full in the lead-in,
  with the cumulative "both" stated and the point made explicitly that limb (a)
  alone is never enough.

- **The pattern was enumerated across this repository, not assumed to be two
  sites.** `command grep` was run from inside the repository (the shell `grep`
  wraps `ugrep --ignore-files` and the root `.gitignore` lists this repository,
  so a root-level search returns nothing from it; `git grep` would also have
  missed `errata.md`, which is untracked). Quoted globs throughout -- an
  unquoted `--include=*.md` is a zsh glob failure and returns a **false zero**,
  reproduced deliberately. Counts: `Art. 6(1)` 6 · `Article 6(1)` 2 ·
  `Annex[ -]I($|[^IVX])` 11 · `safety component` 7 · `third-party conformity
  assessment` 3, over 247 `.md` files; positive controls `Annex III` 96,
  `AI Act` 182, `conformity assessment` 19. Every Art. 6(1) and Annex I site was
  read. **Beyond the two corrected here, no further site states or applies the
  Art. 6(1) test on one limb**: `domains/medical-devices.md:252-263` and
  `integration/igm-aplc-integration-test.md:11` each quote both limbs verbatim;
  `igm-aplc-integration-test.md:65`, `:83` and `:343` are cross-references to
  the correct statement in the same file's §1; `domains/medical-devices.md:247`
  is the **MDR's own** Annex I (general safety and performance requirements), a
  homonym, not the AI Act's. **Further sites of the same pattern: 0.**
  Not verified: whether an MDR notified-body route under Annexes IX to XI is a
  "third-party conformity assessment" within the meaning of Art. 6(1)(b) of the EU AI Act. That
  step is asserted nowhere in this repository and was not adjudicated here.

- **The EU AI Act Annex III 5(b) fraud-detection inversion is withdrawn from
  `domains/financial-services.md` -- it had been corrected in the APLC twin and
  never ported here, and this repository carried no errata entry for it.**
  `domains/financial-services.md:180` offered *credit scoring, insurance
  pricing, fraud detection, AML screening* as EU AI Act Annex III high-risk examples.
  Re-read at the primary (`OJ_L_202401689_AIAct.html.gz`, sha256 prefix
  `a0f437e89667`, `ANNEX III` through `ANNEX IV`), point 5(b) reaches AI systems
  "intended to be used to evaluate the creditworthiness of natural persons or
  establish their credit score, with the exception of AI systems used for the
  purpose of detecting financial fraud". The cell therefore asserted the
  opposite of the provision it cited. APLC withdrew the identical claim at its
  own `domains/financial-services.md:57-63` and `domains/insurance.md:75-82` on
  2026-09-05; the withdrawal was written into the `domains/` files of one repo
  only and no port reached AEM, which is the third time in this programme a
  correction has stopped at one twin. **The claim was not deleted**: the cell
  now names 5(b) for creditworthiness and credit scoring with the fraud
  exception stated in the same sentence, bounds the insurance-pricing example to 5(c)'s
  "in the case of life and health insurance", and records that AML screening
  is not listed anywhere in Annex III. The prose list eleven lines below
  (`:191`), which stated the life-and-health limit correctly but omitted the
  fraud exception -- so that the file asserted the exception's opposite above
  and its subject below -- was rewritten to carry both limits in the sentences
  that make the claims.

- **Personal-lines underwriting re-attributed from Annex III §5(b) to §5(c) and
  bounded, in `domains/insurance.md` -- the D-65 withdrawal never reached this
  repository and no errata entry existed here.** `domains/insurance.md:263`
  cited "EU AI Act Annex III §5(b) (high-risk)" as the regulatory basis for
  the row *Underwriting decisions for individual cover (personal lines)*. At the
  primary, §5(b) is creditworthiness evaluation and credit scoring and does not
  reach underwriting at all; underwriting is §5(c), which reaches risk
  assessment and pricing in relation to natural persons only "in the case of
  life and health insurance" -- so personal-lines property and casualty cover
  is outside it. The row was **re-attributed and bounded rather than deleted**:
  it now cites §5(c) with the life-and-health limit and the P&C exclusion in the
  same cell as the claim, and says what §5(b) actually is. The same §5-family
  over-reach at `domains/financial-services.md:262` and `:265` and at
  `companion/frameworks.md:226` -- each citing a bare "Annex III §5" for credit
  and insurance decisions -- was bounded to 5(b) and 5(c) with their limits in
  place. The Tier caps themselves are unchanged; only the regulatory basis is.

- **Four Annex III scope limits restored to the mapping table in
  `regulatory/eu-ai-act-addendum.md` §1.1.** Each row asserted a point without
  the limit that point carries, and in three of them the Notes cell was empty.
  `:38` cited **point 2** for the row *Critical infrastructure operation* with the
  safety-component test absent, and that test is the whole of the point: it
  reaches only systems "intended to be used as safety components in the
  management and operation of critical digital infrastructure, road traffic, or
  in the supply of water, gas, heating or electricity". The sector list is
  closed; **rail, aviation and air traffic are absent from the Annex III body**.
  `:34` cited **point 6(a)** for the row *Law-enforcement risk assessment for natural
  persons* without distinguishing that 6(a) is *victim* risk ("to assess the
  risk of a natural person becoming the victim of criminal offences") from
  offender and re-offending risk, which is 6(d) and reaches such systems only
  "not solely on the basis of the profiling of natural persons as referred to
  in Article 3(4) of Directive (EU) 2016/680"; point 6's chapeau limit ("in so
  far as their use is permitted under relevant Union or national law") was also
  missing. `:35` cited **point 7** with an empty Notes cell, omitting both that
  chapeau and 7(d)'s "with the exception of the verification of travel
  documents". `:36` cited **point 8** without 8(b)'s exclusion of "AI systems
  to the output of which natural persons are not directly exposed, such as tools
  used to organise, optimise or structure political campaigns from an
  administrative or logistical point of view". In every case the limit was
  placed **in the same cell as the claim it qualifies**, not in the Notes cell
  or a flag below, because a caveat separated from its claim is stripped when
  the claim travels. Two further rows in the same table were bounded in the same
  pass: `:27` (the 5(b) fraud carve-out was in the Notes cell, not the claim),
  `:28` (5(c)'s life-and-health limit likewise), and `:37` (point 3, whose four
  sub-points are each confined to "educational and vocational training
  institutions at all levels", had an empty Notes cell). No row's high-risk
  answer was deleted; each was qualified.

- **NISPOM re-cited from 32 CFR Part 2004 to 32 CFR Part 117.**
  `domains/defense-government.md` grounded the hard rule on classified
  information in "the National Industrial Security Program Operating Manual
  (NISPOM, **32 CFR Part 2004**)". Both parts were retrieved free from the
  official eCFR versioner API on 2026-09-06, pinned to `title-32`'s
  `latest_issue_date` 2026-08-17, and hashed
  (the official eCFR snapshots of Parts 117 and 2004): **32 CFR Part 117**,
  sha256 prefix `94b7bbe1c4b1`, and **32 CFR Part 2004**, sha256 prefix
  `19a0cc8f8a6f`. **Part 117 is the NISPOM** -- its own heading reads
  `PART 117-NATIONAL INDUSTRIAL SECURITY PROGRAM OPERATING MANUAL (NISPOM)`
  and § 117.1 *Purpose* states it "implements policy, assigns
  responsibilities, establishes requirements, and provides procedures ... for
  the protection of classified information that is disclosed to, or developed
  by contractors of the U.S. Government" (85 FR 83312, Dec. 21, 2020).
  **Part 2004 is the ISOO National Industrial Security Program directive** --
  heading `PART 2004-NATIONAL INDUSTRIAL SECURITY PROGRAM (NISP)`, § 2004.1
  *Purpose and scope* "sets out the National Industrial Security Program ...
  ISOO maintains policy oversight over the NISP" (83 FR 19951, May 7, 2018),
  and § 2004.20(a)(3) directs the Executive Agent to "issue[] and maintain[]
  the National Industrial Security Program Operating Manual (NISPOM)". Part
  2004 therefore *requires* the NISPOM; it is not the NISPOM, and the string
  `part 117` occurs in it zero times (whole-token probe, proven against a
  `part 2004` control that HITs the same file). **The claim survives with the
  correct Part**: the citation was re-attributed to Part 117 and a parenthesis
  added recording what Part 2004 actually is, rather than the claim being
  deleted. The other two `32 CFR` citations in this repository --
  `domains/defense-government.md:53` and `companion/principles-06.md:204` --
  both cite **32 CFR Part 2002 (CUI)**, which is the correct Part for
  Controlled Unclassified Information; they were checked and left untouched.

- **The Article 73(6) sub-items in `regulatory/eu-ai-act-addendum.md` are
  withdrawn: the obligation is real, the report-content list is not.** §6.2 was
  headed "Required content (Art. 73(6))" and its fields were cited at four
  template sites and one workflow line as lettered sub-items (a) to (d) of
  Art. 73(6). Article 73 of Regulation (EU) 2024/1689 was read in full at the
  hashed primary (the Official Journal HTML snapshot of Regulation (EU) 2024/1689,
  sha256 prefix `a0f437e89667`) -- **all eleven paragraphs**. **Art. 73(6) has
  no lettered sub-items**: it is two unlettered subparagraphs obliging the
  provider, *after* reporting, to *"perform the necessary investigations in
  relation to the serious incident and the AI system concerned"*, including
  *"a risk assessment of the incident, and corrective action"*, and to
  cooperate with the competent authorities and any notified body without
  altering the system in a way that may affect the evaluation of causes.
  **Article 73 prescribes no report content anywhere.** The only source of
  prescribed content is the Commission guidance mandated by **Art. 73(7)**,
  due 2 August 2025. So this is an **invention, not a miscitation**: the five
  fields are kept because they are useful, but the citation is withdrawn at
  all six sites and the list is now marked in-sentence as this document's own
  construction, with (d) and (e) tied to the genuine Art. 73(6) corrective-
  action and cooperation duties.
- **The same file's Article 73 reporting timers were scrambled, which is the
  more dangerous of the two defects.** §6.1 put **death of a person on the
  2-day clock** and invented a **10-day clock for fundamental-rights
  malfunction**. At the primary: **Art. 73(3)** gives the 2-day clock to a
  widespread infringement or an Art. 3(49)(b) critical-infrastructure
  disruption; **Art. 73(4)** gives **death of a person 10 days**;
  **Art. 73(2)** gives every other serious incident, including the
  Art. 3(49)(c) fundamental-rights infringement, **15 days**. A deployer
  following the withdrawn table would have filed a death two days early and a
  fundamental-rights infringement five days late. The same inversion was
  propagated and is corrected at `operational-templates/slo-table.md:47`
  (row 16 split into 16/16a/17), `governance/authority-accountability-matrix.md`
  D6, `regulatory/foundation-model-third-party-register.md` §4.2,
  `regulatory/nist-ai-rmf-crosswalk.md` MG.4.3 and
  `regulatory/iso-23894-23053-crosswalk.md` `risk-csdr-004`.
  `governance/_swarm-changelog.md:266` records the old clocks as history and is
  left as written.
- **Article 3(61) had a limb the Regulation does not contain.** The §6.1 table
  glossed "widespread infringement" as harming persons "in three or more Member
  States, or one Member State if substantial harm". Art. 3(61)(a) is harm to
  the collective interests of individuals residing in **at least two Member
  States other than** the Member State of origin or establishment;
  Art. 3(61)(b) is concurrent harm with common features by the same operator in
  **at least three Member States**. There is no one-Member-State limb.
- **Article 73(7) was cited for a duty it does not impose.** §6.1 read "the
  deployer ... may have a parallel obligation to report (Art. 73(7))".
  Art. 73(7) obliges the receiving market surveillance authority to inform the
  Art. 77(1) fundamental-rights bodies, and mandates Commission guidance. The
  deployer's duty is **Art. 26(5)** -- inform the provider first, then the
  importer or distributor and the market surveillance authorities -- with
  Art. 73 applying to the deployer only *mutatis mutandis* "*If the deployer is
  not able to reach the provider*". The same wrong duty-holder is corrected at
  §7.1. **Art. 73 binds providers.**
- **A third fabricated sub-clause structure, in a different article of the same
  file, found by enumeration rather than by the flagged line.** §2 read that
  the instructions for use "include the items listed in Art. 13(2)(a)-(f) and
  Art. 13(3)". **Art. 13(2) has no lettered sub-items** -- it is one unlettered
  sentence -- and the (a)-(f) enumeration is Art. 13(3) alone. Worse, four rows
  of the §2.1 table were **labelled (c), (d), (e) and (f) while carrying the
  content of Art. 13(3)(b)(iii), (v), (vi) and (vii)** -- the roman sub-items
  nested inside (b) -- and the genuine Art. 13(3)(c), pre-determined changes,
  was absent from the document entirely. The table then cited the real
  13(3)(d) and 13(3)(e)-(f) two rows further down, so **the same table
  contradicted itself**. All rows are re-keyed to the primary's lettering, the
  missing (c) row is added, and the §2.2 template's two mis-keyed items are
  corrected.
- **Six further citation faults from the same audit, each corrected in place.**
  (1) §1.1 said Annex III point **5(d)** "covers AI used to evaluate
  eligibility for essential healthcare services"; 5(d) is emergency-call
  triage and dispatch, and eligibility is **5(a)**. (2) §1.3 read "Social
  scoring **by public authorities** (Art. 5(1)(c))"; Art. 5(1)(c) is not
  limited to public authorities, and the narrowing would clear a private
  operator's social scoring. (3) §4 cited **Art. 27(5)** for the duty to notify
  the market surveillance authority of the FRIA results; that duty is
  **Art. 27(3)**, and 27(5) mandates only the AI Office template. §4 also
  omitted that Art. 27(1) **excepts Annex III point 2** (critical
  infrastructure) from the FRIA obligation, and that §7 read Art. 27(4) as
  permitting a combined FRIA/DPIA when it says the FRIA "*shall complement*"
  the DPIA. (4) §5.1's logging table was headed "Required logging content
  (Art. 12(2)-(3))" and read as general; its four rows are **Art. 12(3)(a)-(d)
  alone**, which the primary scopes "*For high-risk AI systems referred to in
  point 1 (a), of Annex III*". Art. 12(2) prescribes no fields. Retention was
  cited to **Art. 19**, a provider-facing article, in a deployer-facing
  document; the deployer's six-month duty is **Art. 26(6)**. (5) §7.1 listed
  "energy reporting" among the **Art. 55** systemic-risk obligations. The word
  "energy" does not occur in Art. 55; known or estimated energy consumption is
  an **Annex XI point 2(e)** documentation element reached through
  Art. 53(1)(a). §7.1 also attributed the copyright obligation to
  Art. 53(1)(d); the copyright policy is **53(1)(c)** and (d) is the
  training-content summary. (6) §9's Art. 99(4) row claimed the €15M/3% ceiling
  covers "high-risk obligations Art. 8-22 ... GPAI Art. 53/55". **Art. 99(4) is
  a closed list of seven points**; its provider limb is **Art. 16 only**, and
  GPAI does not appear -- GPAI fines are the Commission's under Art. 101,
  already cited correctly two lines below. §9's "Member States may impose
  criminal sanctions (Art. 99(1))" is **withdrawn**: no criminal-sanctions
  provision exists in the enacting terms, and the adjoining manager-liability
  sentence is now marked unsourced in-sentence rather than deleted.
- **The headline is not the four lines: it is that this file had already been
  corrected twice.** The Article 43 conformity inversion (four faults) and the
  DORA Article 28 paragraph count were both fixed on 2026-09-05, and a third
  and fourth distinct defect class survived both passes. **The point fix was
  therefore replaced by a full-file citation audit**: every Article/Annex
  citation in `regulatory/eu-ai-act-addendum.md` was extracted by script,
  checked structurally against a paragraph-and-letter index built from the
  hashed primary's own 113 enacting articles, and every load-bearing claim was
  read against the article text. **292 citation occurrences checked; 19 faults
  found across 9 of the document's 11 sections; all 19 corrected in place.**
  Two of the nineteen -- the Art. 73(6) letters and the Art. 13(2) letters --
  are the same mechanical defect the checker's §4 test catches; **it saw one of
  the six Art. 73(6) sites and neither Art. 13 site**, because its
  20-line attribution window does not reach a section heading or a code-fence
  template. **Seventeen of the nineteen were invisible to every check in this
  programme**, because a citation that names a real paragraph of a real article
  and then describes the wrong thing is structurally indistinguishable from a
  correct one. That recall gap is handed to the tool owner, not worked around.
- **Enumerated by command, not sampled.** `command grep -rn 'Art\. 73\|Article
  73' --include='*.md' .` run from inside the repository -> **80 lines across
  22 files** before this pass's edits (12 files / 52 lines in this repository,
  7 files / 17 lines in `aplc/`, 3 files / 11 lines in `inputs/`), of which
  **18 lines are in `regulatory/eu-ai-act-addendum.md`** (the
  brief's hypothesis of four sites plus a heading and a template was low: the
  Art. 73(6) claim alone stood at **six** sites, and the file carries twelve
  further Art. 73 citations). The shell's `grep` wraps `ugrep --ignore-files`
  and the root `.gitignore` lists this repository, so a root-level search is
  blind here; `command grep` was used for every count in this entry.
  **Handed back, outside this pass's write scope:** seven `aplc/` sites
  (`domains/financial-services.md`, `insurance.md`, `automotive.md`,
  `aviation.md`, `pharma.md`, `agent/agent-operations.md`,
  `governance/knowledge-base.md`) describe Art. 73 as binding "providers and
  operators" and state no clocks at all -- the duty-holder blur the T6.3
  domain-files packet recorded as UNSIGNED, still open, now joined by the
  finding that the clocks those files omit were **stated wrongly** in the one
  file that did state them.

- **The DORA Article 3 sentence in
  `regulatory/foundation-model-third-party-register.md` was wrong three separate
  ways, and is re-stated rather than deleted.** Section 1.1 opened: *"DORA
  Art. 3(21) defines an 'ICT third-party service provider' as an undertaking
  providing ICT services. Art. 3(20) defines 'ICT services' broadly to include
  digital and data services, including those provided by cloud-computing
  services, **AI services**, and software services. **Foundation-model providers
  fit squarely.** Recitals 30 and 63 confirm the intent to capture cloud + AI
  providers."* Article 3 of Regulation (EU) 2022/2554 was read at the hashed
  primary (the EUR-Lex text snapshot of Regulation (EU) 2022/2554 (DORA),
  sha256 prefix `25328c7e39c4`), definitions **(18) through (22) in sequence**.
  **(1) Both definition numbers were wrong, and swapped.** The provider
  definition is **Art. 3(19)** ("an undertaking providing ICT services"), not
  3(21); the services definition is **Art. 3(21)** ("digital and data services
  provided through ICT systems to one or more internal or external users on an
  ongoing basis, including hardware as a service and hardware services which
  includes the provision of technical support via software or firmware updates
  by the hardware provider, excluding traditional analogue telephone services"),
  not 3(20). **Art. 3(20) is a third definition entirely** -- "ICT intra-group
  service provider" -- which the passage never meant to cite. A neighbouring
  definition that merely sounds right is how this class of error forms, which is
  why the surrounding definitions were read in sequence rather than looked up
  one at a time.
  **(2) A recital was cited as an article.** The cloud/software list is **not in
  Article 3 at all**. It is **Recital 63**, which reads "should cover a wide
  range of ICT third-party service providers, including providers of cloud
  computing services, software, data analytics services and providers of data
  centre services". Recitals are interpretive and articles are binding, so
  citing one as the other misstates the legal weight of the claim; the corrected
  text now names Recital 63 as a recital **and says in the same sentence what
  that means**, and keeps the load-bearing conclusion on the Article 3(21)
  definition, which is binding.
  **(3) The list was wrong even as a recital.** Recital 63's list contains no AI
  limb, and ***AI services* and *artificial intelligence* each occur zero times
  in the entire Regulation** -- measured over the whole text with the citation
  checker's own `normalizeForMatch`, against **thirteen probes of which eight
  were positive controls** (including the three definitions verbatim and
  Recital 63's list verbatim) proving the search resolves against that file, and
  five prefix-safe negative controls (`services`->`products`,
  `intra`->`extra`, `ongoing`->`periodic`, `telephone`->`telegraph`,
  `software`->`hardware`) all correctly ABSENT. One of this task's own probes
  was caught lying before any verdict was recorded: a bare `" ai "` token count
  returned 330 because `normalizeForMatch` trims its argument and the search
  degenerated to the substring "ai" inside words such as "remain"; re-run
  without the trim, the token count is **0**. A zero from a broken search is
  worse than no check.
  **Recital 30 is also dropped from the sentence.** It concerns the absence of
  Union-level rules and of national supervisory mandates on ICT-third-party
  concentration; it names no cloud list and no AI, and does not bear on the
  scope of the provider definition.
  **The claim itself survives**, because it never needed the naming: a hosted
  foundation model is a digital and data service provided through ICT systems to
  external users on an ongoing basis, and so falls inside Art. 3(21) on the
  definition's own terms.
  **Enumerated, not spot-fixed.** Every `Art. 3(` / `Article 3(` citation in
  this repository was listed by command from inside the repository
  (`command grep -rEn "Art(icle)?\.? ?3\(" --include='*.md' .`) -- **26 sites
  across 7 files**. Twenty-five are **EU AI Act** citations, not DORA, and all
  twenty-five were checked against Regulation (EU) 2024/1689 at primary
  (sha256 prefix `a0f437e89667`): 3(3) provider, 3(4) deployer, 3(14) safety
  component, 3(45)/(46) law enforcement, 3(49) serious incident and 3(61)
  widespread infringement each define what the citing site says they define.
  **The one DORA site is the one corrected here**, so the single site named in
  the hand-back was the whole of this defect class -- but this is the **fifth
  distinct defect class** found in this one file, after a wrong EU AI Act Annex III
  classification, five wrong DORA paragraph numbers, a *nine paragraphs* count
  where Art. 28 has ten, and the Art. 43 conformity inversion.

- **A table gave DORA Article 19 three reporting clocks the Regulation does not
  contain -- and a verb-based sweep could never have seen it, because a table
  row is a duty with the verb removed.**
  `regulatory/foundation-model-third-party-register.md` section 4.1, under a
  heading reading "DORA Pillar 2 incident reporting (Article 19)", tabulated an
  initial notification "within **4 hours** of classification", an intermediate
  report "within **72 hours** of classification" and a final report "within
  **1 month** of incident closure". Re-derived at the hashed primary
  (the EUR-Lex text snapshot of Regulation (EU) 2022/2554 (DORA),
  sha256 prefix `25328c7e39c4` -- confirmed by `shasum -a 256`, not by eye),
  normalised through the checker's own `normalizeForMatch` (lower-cased, dashes
  mapped to spaces, whitespace collapsed, trimmed, then padded), Regulation (EU)
  2022/2554 gives `4 hours` **0**, `four hours` **0**, `24 hours` **0**,
  `twenty four hours` **0**, `72 hours` **0**, `seventy two hours` **0**,
  `1 month` **0**. `one month` occurs **once** and is the **Art. 31(5)** CTPP
  oversight start date, not a reporting clock. The zeros are demonstrated
  absences, not dead searches: the same harness returns `major ict related
  incident` **44**, `initial notification` **9**, `intermediate report` **1**,
  `final report` **1**, `regulatory technical standards` **40** and
  `time limits` **3**, and a nonsense needle **0**. Prefix-safe, whole-token
  controls with digit-width swaps: `article 19` **9** against `article 1 `
  **59**, and `article 20` **4** against `article 2 ` **71** -- so neither
  count is a prefix of its neighbour's.
  **What Art. 19(4) actually does is defer.** It requires the three submissions
  *"within the time limits **to be laid down in accordance with Article 20,
  first paragraph, point (a), point (ii)**"*, and Art. 20, first paragraph,
  point (a)(ii) directs the ESAs, through the Joint Committee, to *"determine
  the time limits for the initial notification and for each report referred to
  in Article 19(4)"* by regulatory technical standards. DORA sets no clock at
  all. **The figures were re-attributed, not deleted**: they are plausibly the
  RTS values and a firm has to operate to something, so each row now names
  itself this framework's own operating target, marked `F2` **in the cell**,
  because a row travels alone and the paragraph above it does not travel with
  it; each row points at the RTS under Art. 20, first paragraph, point (a)(ii)
  as where the binding period lives and requires the version relied on to be
  recorded. **No RTS text is on disk**, so the figures are explicitly *not*
  asserted as read at a primary, and the **anchor events** ("of classification",
  "of incident closure") are flagged as RTS-level too -- an anchor is half a
  deadline, and both halves were being asserted from the wrong instrument.
  The row was **not** relabelled NIS2: NIS2 Art. 23(4) does set 24h / 72h /
  one month (with the one month running from the 72-hour notification, not from
  awareness), but the surrounding claim is about DORA, and a row stating a DORA
  obligation does not become a NIS2 row because a NIS2 period happens to
  coincide with the figure the row carried. **The row's defect was that it named
  no source for its own numbers**, and the source it now names is the one the
  paragraph above establishes: DORA's own deferral to the RTS. Whether NIS2 is
  cited anywhere else in this tree has no bearing on that, and the sentence that
  used to claim it was not is withdrawn in the entry at the end of this
  section.
  **The whole table was read, not the flagged row, and every table and lettered
  duty list in the file stating a period or a numbered duty was audited against
  the primaries on disk. Seven further sites were wrong**, all corrected in
  place and each with its own dated note:
  (1) the section 4.1 sentence "major-incident classification criteria are set
  in RTS" -- **the exact mirror of the same defect**: the criteria are in the
  DORA Regulation, at **Art. 18(1)**(a)-(f), and what the RTS adds under
  **Art. 18(3)(a)** is the materiality thresholds;
  (2) the section 3.4 clause list, lettered **(a)-(i)** as though those were
  DORA's own letters when they were not -- its (h) read "exit-plan obligations"
  where **Art. 30(2)(h) is termination rights**, its (i) read "cooperation in
  TLPT" where **Art. 30(2)(i) is security-awareness training**, and it silently
  merged Art. 30(2) items with Art. 30(3) items, so a reader following the
  letters would have cited the wrong point; the list is re-enumerated as DORA's
  own Art. 30(1), 30(2)(a)-(i), 30(3)(a)-(f), 30(4) and 30(5);
  (3) section 1.1 cited **Art. 26(2)** for TLPT participation by ICT
  third-party providers -- 26(2) is the coverage-and-live-production rule;
  participation is **Art. 26(3)**, with **Art. 30(3)(d)** the contractual limb;
  (4) section 3.5 stated TLPT is "required for significant financial entities",
  a class DORA does not use -- **Art. 26(1)** scopes it to entities other than
  those in Art. 16(1) first subparagraph and other than microenterprises,
  identified per Art. 26(8) third subparagraph, **at least every 3 years**,
  adjustable by the competent authority, with **Art. 26(4)** pooled testing
  where direct participation would harm the provider's other customers;
  (5) section 6.4 attributed a **quarterly** TPRM review and an **annual**
  board report in-cell to "DORA Art. 5(2) governance" -- Art. 5(2) sets no
  period at all (Art. 5(2)(h) is *periodically review the policy*); both
  cadences are now marked `F2` as this framework's own;
  (6) section 2.3's **5-business-day** register-update trigger, unattributed
  but sitting inside a DORA section, is now explicitly `F2` -- Art. 28(3)
  requires the register to be maintained and reported at least yearly and fixes
  no update period; and section 2.3's "Art. 19 DORA major-incident class" now
  splits classification (**Art. 18(1)**) from reporting (**Art. 19**);
  (7) the section 4.2 cross-reference table asserted "widespread infringement
  -> 2 days" with no provision, one cell away from a cell citing Art. 73(2);
  the two-day clock is **Art. 73(3)** and covers widespread infringement and
  Art. 3(49)(b) serious incidents only -- now stated in the cell.
  **The same three DORA figures were then found carrying a framework label
  rather than a provision label in two further files of this repository**,
  which is exactly where the 2026-09-05 `aplc` entry said they would survive:
  `operational-templates/slo-table.md` rows **18, 19 and 20** sourced 4h / 72h
  / 1 month to "DORA Pillar 2", and its Sources list said the RTS covers
  classification when it is the *time limits* that are RTS-level. All four are
  corrected. `operational-templates/decommissioning-checklist.md` lines 71 and
  131 were also found citing **EU AI Act Art. 19** -- a *provider*-facing log
  article -- for a *deployer*'s retention duty, which is **Art. 26(6)**; that
  is the surviving twin of a correction this file already recorded for
  `regulatory/eu-ai-act-addendum.md`, and both sites are fixed.
  **This is the sixth distinct defect class in
  `regulatory/foundation-model-third-party-register.md` in one night**, after a
  wrong EU AI Act Annex III classification, five wrong DORA paragraph numbers, a *nine
  paragraphs* count where Art. 28 has ten, the Art. 43 conformity inversion and
  the DORA Art. 3 definition swap. **The lesson is the medium, not the digit:**
  every sweep run tonight was verb- or modal-keyed, and a table row carries a
  duty with the verb deleted, so **no enumeration run tonight could have
  reached this row** -- it was reached only by following a neighbouring
  finding. **The searching claim that stood here is withdrawn -- see the entry
  on burned negative controls at the end of this section.** It gave a wrap-safe
  file count for the four-hour figure, said the line-anchored form reached
  fewer files, and offered a nonsense needle returning nothing as the check on
  both. Re-derivation supports none of the three, and the needle had been
  spelled out in this file's 2026-08-11 section weeks before this sentence
  called it clean. **No number replaces the withdrawn ones, and the finding
  above does not need one:** this row was missed because it states a duty in a
  table cell with the verb deleted, which is the mechanism named two sentences
  above. Primaries consulted:
  Regulation (EU) 2022/2554 (sha256 prefix `25328c7e39c4`) and Regulation (EU)
  2024/1689 (the Official Journal text snapshot of the Regulation).
  **No RTS and no NIS2 figure is asserted from memory anywhere in these edits.**

- **Ten annex citations that named no instrument on their own line, and were
  therefore read as the CSDR's or MiFID II's, now name the EU AI Act. Nothing
  was withdrawn and no citation was renumbered.** All ten are EU AI Act annexes,
  discussing that Regulation's own annexes while naming another instrument as
  the subject matter of the scenario. Sites, each read before it was touched:
  `errata.md` (the 2026-09-05 CSDR withdrawal entry, the sentence that states
  what the withdrawn text had said and what is true instead),
  `integration/igm-aplc-integration-test.md:12` and `:13`, and
  `regulatory/foundation-model-third-party-register.md:504` and `:505`. Two
  further sites of the same shape in `errata.md` and in
  `foundation-model-third-party-register.md` are **left standing and named
  here**: they sit inside verbatim quotations of the withdrawn wording or of the
  primary, where the instrument cannot be inserted without altering quoted text.
  · **Two quotations were re-marked, not re-worded.** At
  `integration/igm-aplc-integration-test.md:12` and
  `regulatory/foundation-model-third-party-register.md:505` the emphasis markers
  sat inside the quotation marks rather than outside them, so a quoted-span
  reader extracted the markers as part of the quotation and could not match it
  against the primary. The markers were moved outside the quotation marks. The
  quoted words are unchanged and both quotations are verbatim at the hashed
  primary (the Official Journal HTML snapshot of Regulation (EU) 2024/1689, sha256
  prefix `a0f437e89667`), which is what the move makes visible.
  · Two more annex citations in `errata.md` and in `domains/medical-devices.md`
  were **read and deliberately left alone because they are correct**: they cite
  the medical-devices Regulation's own annexes, the homonym this file's own
  2026-09-06 entry already records. Naming the EU AI Act on them would have been
  a new defect. `domains/medical-devices.md:261` is the converse case and is
  **named rather than fixed**: it is an EU AI Act annex read as the
  medical-devices Regulation's, of the same class as the ten above, and is left
  for a pass that can price it.
  · This file is tracked in git. The three files edited in this repository all
  have built `.html` twins, so a rebuild was run and the built pages carry the
  named instrument.
- **Remaining annex attributions closed -- the class was re-derived and had
  grown again.** The 2026-09-06 entry above closed twenty-two of these and named
  fifteen more, at eight sites, as still open. Re-derived rather than inherited,
  the same class is **twenty citations at twelve sites**: the earlier
  enumeration had filtered the run's own refusal list to four instruments and so
  could not see four sites where the same defect files an EU AI Act annex under
  DORA or the GDPR. Fixed in this repository, every one a **pure insertion of
  the instrument name on the line**, no citation deleted, re-worded or
  renumbered, and every edited file at exactly the line count it had before:
  seven annex citations plus two cumulative-test article citations in one table
  row of `regulatory/eu-ai-act-addendum.md:32`; `domains/medical-devices.md:261`
  (the converse case the entry above named and left);
  `integration/igm-aplc-integration-test.md:11` (two annex citations plus two
  article citations); `regulatory/foundation-model-third-party-register.md:498`
  and `:502`; and `errata.md:46`, `:410`, `:509` and `:656` in this file.
  · **One re-wrap, for a stated reason.** `domains/financial-services.md:15-16`
  split the instrument's name across the line break, so the annex citation on
  `:16` carried the name of a different instrument named four lines above. The
  two lines were re-wrapped so the name sits on the line it attributes; with the
  blockquote markers stripped the pair is byte-identical before and after under
  the checker's own normalisation, and the paragraph still occupies the same
  number of lines. This is the second live instance of that shape; the first was
  corrected in another repository on the same day.
  · **Five sites were read and deliberately left alone because they are
  correct.** `domains/medical-devices.md:247`, `:248` and `:418`, and
  `errata.md:104`, cite the medical-devices Regulation's **own** annexes, the
  homonym this file already records; naming the EU AI Act on any of them would
  have been a new defect. `errata.md:53` is an EU AI Act annex citation that
  sits **inside a verbatim quotation** of the cumulative-test article, with no
  unquoted text ahead of it on its line: the instrument cannot be named there
  without altering quoted words, so it is recorded and not changed.
  · **Two emphasis markers were moved from inside a pair of quotation marks to
  outside them** at `integration/igm-aplc-integration-test.md:11`, so that a
  span being made attributable could not be read as quoting the markers. Both
  quotations are verbatim at the hashed primary; the quoted words are untouched.
  · **One site outside this corpus's writable scope remains open and is named
  rather than fixed:** `papers/01_READ_FIRST/00_SSRN_INDEX.md:4` carries an
  annex citation of the 2026 amending Regulation that reads as the supervisory
  letter's, because the letter is named earlier in the same line.
  · This file is tracked in git. Three of the four files edited here have built
  `.html` twins, so a rebuild was run and the built pages carry the named
  instrument.
- **Annex citations hidden by a line break, closed; and the quotation site
  closed without altering the quotation.** Three of the sixteen line-break-split
  annex citations described in `aplc/errata.md` are in this repository —
  `domains/financial-services.md` at 174-175 and 209-210, and this file at
  21-22. These produce **no citation record at all** rather than a mis-filed
  one. Each was closed by moving **one word** across the break: nothing added,
  removed or re-worded, line counts unchanged, and the text byte-identical
  under the checker's own normalisation once markers are stripped.
  · **`errata.md:53` — the site the 2026-09-06 entry above named rather than
  fixed — is now closed, and not one character of the quotation moved.** The
  annex citation sits inside a verbatim quotation of the Act's limb (b) test
  with no unquoted text ahead of it on its line, so the instrument cannot be
  named there. Naming it inside the quotation was refused. Two content-
  preserving edits close it instead: the trailing `MDR Art.` that began the
  **next** sentence was moved onto its own line — where it also reunites with
  its own paragraph number, which had been split off the same way — and the
  instrument this repository's own primary re-read is about was named in the
  unquoted lead-in at `:49`, which had itself been reading as the device
  regulation's. With no instrument named on `:53`, the carried instrument is
  now the right one. The quoted span at `:51-53` was extracted before and after
  and compared: **identical**. A pure re-wrap alone was built first and
  **measured not to close it**, which is why the lead-in was named as well.
  · **`papers/01_READ_FIRST/00_SSRN_INDEX.md:4`, named as out of scope above,
  is closed.** Read at its site and corroborated at four other sites in
  `papers/`, the annex it cites is the **AI Act's**, whose high-risk
  obligations the 2026 amending Regulation deferred to 2 December 2027 — not
  the supervisory letter's and not an annex of the amending Regulation. The
  instrument name was inserted, and the sentence was moved onto its own line so
  that the name does not also capture the adjacent scare-quoted phrase about a
  provisional agreement — which, measured, it otherwise does, manufacturing a
  fabricated-quotation flag out of a phrase that claims to quote nothing.
  Recorded in `papers/01_READ_FIRST/_CORRECTIONS_TRACK.md` section G, which is
  where `papers/` keeps its record.
  · This file is tracked in git. Two of the files edited here have built
  `.html` twins, so a rebuild was run and the built pages carry the change.

- **The last four extractor mis-attributions are closed in the prose, not in
  the extractor: three lines now name their instrument and the fourth needed no
  edit.** Each fix is a *pure insertion* -- remove the inserted name and the
  line is byte-identical to its predecessor, including under the citation
  checker's own `normalizeForMatch`, which trims and maps dashes to spaces. The
  writing script asserted that property per line and refused to write
  otherwise. No citation was deleted and no wording withdrawn, and the quoted
  span each triage row is anchored on survives verbatim on all three lines, so
  no adjudication row is voided by these edits.
  · **`errata.md:107`** named no instrument of its own, and the line above it
  describes a notified-body route under the `MDR`, so the checker carried that
  name onto the number. The provision is the EU AI Act's, re-read this pass at
  the hashed primary (`OJ_L_202401689_AIAct.html.gz`, sha256 prefix
  `a0f437e8`): EU AI Act `Art. 6(1)` carries exactly the limbs (a) and (b), and
  limb (b) is the third-party conformity-assessment condition the sentence asks
  about. The MDR reading is impossible on its own terms -- at the hashed MDR
  primary (sha256 prefix `cac04f2a`) that instrument's Article 6 is *Distance
  sales*, four paragraphs, none of them lettered. The site now names
  EU AI Act Art. 6(1)(b) on the line itself, so no carried name reaches it.
  · **`errata.md:465`** said only that the major-incident classification
  criteria are in *the Regulation*, nine lines below a paragraph that declines
  a `NIS2` relabelling, so the checker carried that name forward onto it.
  Re-read at the hashed DORA primary (sha256 prefix `25328c7e`): DORA
  `Art. 18(1)` carries exactly the (a)-(f) the site claims, DORA
  `Art. 18(3)(a)` is the materiality thresholds, and DORA `Art. 17(3)(b)`
  independently cross-refers to the criteria set out in Article 18(1). The line
  now opens `the DORA Regulation, at Art. 18(1)(a)-(f)`.
  · **`errata.md:466` was left alone, because it is already right.** It is the
  second half of the sentence :465 begins, so once :465 names the instrument
  the clause reads unambiguously and needs no insertion of its own; the checker
  attributes it correctly for the same reason. A site left alone because it is
  right is a result, not an omission.
  · **`regulatory/eu-ai-act-addendum.md:570`** named its instrument only by the
  bare abbreviation DSM, which the line neither expanded nor accompanied with
  an instrument name. The provision is the copyright reservation of rights
  that EU AI Act `Art. 53(1)(c)` cross-refers **out** to, and the Directive it
  points at is now named on the line. The extractor still cannot follow this
  one: that Directive is not among its recognised instruments, and adding it
  was measured at 1 right against 22 wrong and refused, so the number stays
  filed under the EU AI Act and stays in the checker's declared-unchecked list.
  The prose, not the tool, is what this edit fixes.
  · Measured on one frozen snapshot, before and after: taken alone, the three
  insertions move the citation checker's `no structure data` from 4 to 1 and
  its sub-clause `OK` from 584 to 587, leave the total triple count, the
  disagreeing pairs, the fabricated findings and the adjudication rows exactly
  where they were, and change nothing else in the report. The further movement
  a reader will see is this entry's own prose, which carries citations of its
  own and is checked like any other text in the corpus.
  · This file is tracked in git. Two of the edited files have built `.html`
  twins, so a rebuild was run and the built pages carry the change.

- **The bullet above counted a string, in prose that contains that string --
  the count was false the moment it was written, and is now removed rather
  than restated.** As first published, the note on
  `regulatory/eu-ai-act-addendum.md:570` read that the bare abbreviation
  occurred "exactly once in this repository". Re-derived this pass with
  `command grep -rInIE '\bDSM\b' --exclude-dir=.git .` run from the repository
  root over 4570 readable files, against a nonsense needle of the same shape --
  described here rather than spelled out, for the reason given in the entry at
  the end of this section -- which returned nothing on that identical command
  and file set while the sweep itself returned matches. **On the tree as it
  stood before this entry was written**, the abbreviation was present on five
  lines in five files: the
  cited addendum line and its built `.html` twin, the note itself, and the
  note's two built copies in `errata.html` and `index.html`. Three of the five
  existed only because the note had been written and the site rebuilt. That
  count is stated with its snapshot precisely because this entry does not
  escape the effect it describes: quoting the pattern above puts the letters
  back into this file -- they slip the word-boundary sweep only because the
  preceding escape leaves the D non-initial, and a plain substring search
  counts them -- and the rebuild copies this entry into two built pages.
  **No live number replaces the false one.** A count excluding the note would
  have been honest but not stable: this file has built twins, so the same
  sentence would go stale at the next rebuild without a word of it changing.
  The
  bullet now describes the defect at its own site -- unexpanded, with no
  instrument name beside it -- which is a claim about one line and cannot be
  moved by anything written elsewhere. The substance is untouched: a bare,
  unexpanded abbreviation still cannot carry an instrument name, and the
  insertion naming the Directive on the addendum line stands.
  · This is this corpus's recorded rule about its own documentation entering
  its own search space, applied rather than rediscovered -- the same rule that
  governs the burned control strings recorded in this file (the negative
  control quoted at `errata.md:518`, and quoted again lower down, is live in
  the corpus for exactly that reason) and is stated in full in the corpus
  execution plan for 2026-09-05. Nothing general is claimed here that is not
  already written down there.
  · The backticks around the abbreviation were dropped with the count. The
  citation checker treats a backticked span as an identifier and excludes it,
  and an instrument name so excluded falls back onto the nearest carried name;
  the abbreviation names an instrument, so it is now set as plain prose.
  · Guarded counts were read before and after this edit and none moved: the
  link checker reports broken 4, the cross-reference checker passes, and the
  citation checker reports disagreeing pairs 68, sub-clause OK 594 with
  fabricated 1 and no-structure-data 1, and section 3c rows 168 with VOID 0,
  REGRESSED 0 and CONFLICT 0, no truly new fabrication. The citation checker
  itself was modified by other work between the before and after readings, and
  gained a report section this edit did not cause; the two readings taken
  after the change are byte-identical to each other, and the guarded numbers
  above are the ones compared. This file's built twins were rebuilt so the
  pages carry the change.

- **A NIS2 absence claim, refuted by the line two above it -- withdrawn, not
  restated with a corrected number.** As first published, the DORA-clock note
  asserted that this repository held no citations of NIS2 at all, offering the
  pattern `\bNIS ?2\b|Directive ?\(EU\) ?2022/2555` and a result of 0 as the
  evidence. No span of the withdrawn sentence is reproduced here, because a
  claim quoted back verbatim beside an instrument's name is read as a quotation
  from that instrument. **Two lines above that sentence, the same paragraph
  cites NIS2 Art. 23 by name and by article**, so the claim was refuted by its own
  immediate neighbour and was false at the moment it was written -- the pattern
  it quoted matches that neighbour, and it matches the quoted pattern itself.
  · **Re-derived rather than inherited.** The pattern was re-run this pass with
  `command grep -rnE` from inside this repository, over 250 readable files with
  `.git` and `node_modules` excluded, alongside a fresh long negative control
  (`quartzflumox_negctl_20260906`, joined with a nonexistent directive number)
  returning nothing over the same sweep on 06.09.2026 and the positive control
  `\bthe\b` returning five figures, so the pattern is live and not silently
  rejected — and in the same breath, because a caveat that travels separately
  from its claim is not a caveat: **that negative control is spent from the
  commit that printed it**, since spelling the needle put it in this file and
  the rebuild puts it in both built twins, so the zero above is reproducible
  only by a reader who generates a needle of their own. **The weight therefore
  sits on the positive control, which this entry cannot burn because that
  pattern is supposed to be present.** The cost is stated rather than talked
  down: a reader cannot re-run a control they cannot see. The needle is left
  spelled rather than deleted, because deleting it here would not un-spend it —
  it is already in the two built pages — and a burn list that quietly loses an
  entry is worse than one that keeps it. [noted 06.09.2026, `D-72` / `T6.1`]
  Every line the pattern reaches sits in this file or in one of its two built
  copies; **no number from that sweep is restated here, and this entry states
  no count of anything it contains**, because it contains the pattern, the
  instrument's short name and the instrument's full directive number, and this
  file is rebuilt into two more pages that would carry all three.
  · **No count replaces the false one, and the reason is one pass old.** The
  sibling note lower in this section withdrew an "exactly once" count over the
  same trap and recorded why: a count scoped to exclude its own note is honest
  but not stable, because this file has built twins and the same sentence goes
  stale at the next rebuild without a word of it changing. That is the identical
  trap one order out here -- a claimed absence against a string the claim's own
  paragraph puts on the page, in a file that is copied twice. The sentence is
  now a claim about the
  row it is defending: a row stating a DORA obligation does not become a NIS2
  row because a NIS2 period coincides with the figure the row carried, and what
  the row needed was the source of its own numbers. Nothing written elsewhere
  in this corpus can move that.
  · **The substance is withdrawn too, not only the number -- and the substance
  was the weaker half.** The sentence was doing work: it offered the absence of
  NIS2 from this corpus as a reason not to relabel the row. That reason no
  longer stands and, on inspection, never carried the argument. NIS2 has since
  been retrieved from the official source and hashed, it holds an article-
  structure entry of its own with a declared last article and an exhaustively
  enumerated Art. 23, and it is cited with sub-clause locators in a sibling
  repository. In the other direction, the two classification-criteria sites at
  `errata.md:465` and `:466` -- which the checker had carried onto NIS2 by name
  -- were re-read against the hashed DORA primary and are DORA's, so the
  citations that made the corpus look like a NIS2 citer were not NIS2's either.
  **Both movements are recorded elsewhere and neither is asserted from memory
  here.** What survives is the part that never depended on a count: the
  surrounding claim is about DORA, DORA defers its periods, and a coincidence
  of figures is not an attribution.
  · **No instrument short name is backticked anywhere in this entry.** A pass
  tonight put an instrument name inside backticks in a note; the citation
  checker treats a backticked span as an identifier and excludes it, the name
  on that line fell back onto the nearest carried name, and the entry
  re-created the defect it had just closed. The sibling note dropped its
  backticks for the same reason. The only backticked spans here are file paths
  and search patterns.
  · **A sweep of this file's other corpus-scoped absence and count claims was
  run and is reported to the brief rather than acted on**, because two of the
  findings sit outside the defect this entry closes and one of them is another
  burned control string. Claims this file makes about the text of external
  primaries are a different class and cannot be moved by this file at all.
  · **Guarded counts were read before and after and none moved**: the link
  checker reports broken 4, the cross-reference checker passes, and the citation
  checker reports disagreeing pairs 68, sub-clause OK 594 with fabricated 1 and
  no-structure-data 1, section 3c rows 168 with VOID 0, REGRESSED 0 and
  CONFLICT 0, no truly new fabrication, and the known-only run exits 0. Two
  consecutive readings taken before the edit are byte-identical to each other.
  This file is tracked in git and has two built copies, so a rebuild was run and
  the built pages carry the change.

- **Two negative controls were written out in this file; one of them had
  already been burned by this same file at the moment it was called clean.**
  Both are withdrawn, and the general remedy they point at is proposed here
  rather than applied across the corpus by fiat.
  · **The site earlier in this section.** A wrap-safe searching claim offered a
  two-word nonsense needle as returning nothing across this tree. Re-run on the
  command and the file set that sentence itself printed, the needle is reached
  in this very file: an entry in the 2026-08-11 section had already spelled it
  out weeks earlier as its own control. That older entry is sound and is not
  disturbed here -- its control was run against a hashed primary's text, not
  against this tree, and it still holds on that reading. What the later
  sentence did was assert a repository-wide absence for a string its own file
  already carried, and the entry carrying it predates the claim, so **this is
  not drift: the claim was false at the moment it was written.** That is the
  failure mode the corpus's execution plan for 2026-09-05 records as the only
  one that returns a green result -- a burned control raises nothing, it
  silently certifies every zero it was offered to validate, and the certificate
  reads the same either way.
  · **Both the number and the claim are corrected there, and which is which is
  said at the site.** Re-derivation also fails the other two halves of that
  sentence. The command as printed reaches one more file than the number beside
  it, because the number quietly assumed an exclusion the command does not
  carry; and the line-anchored form it was contrasted against reaches the same
  files, not fewer, so for that needle the contrast has nothing behind it. The
  finding the sentence was decorating is untouched and never rested on it -- a
  table row states a duty with the verb deleted, so verb- and modal-keyed
  sweeps cannot reach it -- and the corrected passage now says that with no
  number at all. **A burned control does not make a finding wrong. It makes the
  evidence offered for that finding stop standing**, and the two have to be
  separated in writing or the correction reads as a retraction.
  · **The sibling entry's own control, and why its scoping was not left to
  carry it.** The entry earlier in this section that withdrew a
  bare-abbreviation count named its fresh needle in the same breath. The needle
  was genuinely clean when it was run, and *re-derived this pass* scopes the
  re-derivation -- but it does not reach into the parenthetical, which was
  written in the present tense and called the needle fresh. A reader re-running
  it does not get nothing. The string sat in three files, every one of them
  created by the sentence that named it, until this pass removed it. So the
  scoping was enough to keep that entry honest and not enough to keep its
  control usable, which are different things: the reader is not misled, and the
  instrument is still destroyed. The needle is now described there rather than
  spelled, on the same footing as the site above. Its measured figure keeps its
  snapshot and its own statement that it does not escape the effect it
  describes; that half needed nothing.
  · **The remedy, proposed with its cost and not applied everywhere.** Six
  controls in this corpus have now been burned by being written down. The
  corpus documents its own verification, and that documentation lives inside
  the search space it documents, so a control named in published prose is burned
  by the act of publishing it -- not later, and not by anybody's mistake. The
  proposal is narrow: **describe the negative control instead of spelling it,
  and let the positive control carry the weight.** A positive control cannot be
  burned this way, because it is supposed to be present, and it establishes the
  same thing the negative one was there for -- that the command is live and is
  not silently rejecting its own pattern. This file already contains that form,
  written on 2026-08-11: an entry in the last section reports a newly generated
  needle returning nothing, whole and by halves, against positive controls on
  the identical commands, and names none of them. **The cost is real and should
  not be talked down: a reader cannot re-run a control they cannot see.** The
  negative half stops being independently reproducible on the page and becomes
  something taken on the author's word, recorded in the working notes for the
  pass instead. That is a loss of exactly the kind this file exists to prevent,
  which is why it is offered as a judgement to be argued with rather than a
  rule, and why it is applied at the two sites this entry corrects and nowhere
  else.
  · **This entry names no control string and states no count of anything it
  contains.** Both needles are described rather than reproduced, so nothing
  written here can burn them further or be burned by them, and the commands,
  file counts and controls behind the re-derivation are recorded in the working
  notes for this pass rather than as live figures on this page. No phrase
  withdrawn from beside an instrument's name is quoted back here.
  · **Guarded counts were read twice before and twice after and none moved**:
  the link checker reports broken 4, the cross-reference checker passes, and the
  citation checker reports disagreeing pairs 68, sub-clause OK 594 with
  fabricated 1 and no-structure-data 1, section 3c rows 168 with VOID 0,
  REGRESSED 0 and CONFLICT 0, no truly new fabrication, and the known-only run
  exits 0. Line re-anchoring in section 3c moves as a mechanical consequence of
  this file gaining lines; that is not a verdict change. This file is tracked in
  git and has two built copies, so a rebuild was run and the built pages carry
  the change.


## 2026-09-05

- **The Article 43 conformity inversion in `regulatory/eu-ai-act-addendum.md`
  §8.2 is withdrawn and replaced by the instrument's own rule -- one sentence,
  four faults.** The paragraph read: "Required for Annex III point 1(a) remote
  biometric identification, and for systems where a harmonised standard or
  common specification has not been (fully) applied." Article 43 of Regulation
  (EU) 2024/1689 was read in full at the hashed primary
  (the Official Journal HTML snapshot of Regulation (EU) 2024/1689, sha256 prefix
  `a0f437e89667`) -- all six paragraphs, both lettered lists inside paragraph 1,
  and the third subparagraph of paragraph 1. **(1) The harmonised-standard
  triggers do not generalise.** They are the (a)-(d) items of Art. 43(1),
  second subparagraph, and Art. 43(1) is scoped "*For high-risk AI systems
  listed in point 1 of Annex III*"; stating them as a free-standing rule
  asserts the inverse of Art. 43(2), under which providers of the systems
  "*referred to in points 2 to 8 of Annex III*" follow the internal-control
  procedure of Annex VI, "*which does not provide for the involvement of a
  notified body*". Art. 43(6) settles it: subjecting points 2 to 8 to Annex VII
  would take a delegated act. **(2) "Required" is wrong even inside point 1.**
  Where harmonised standards or common specifications have been applied,
  Art. 43(1) says the provider "*shall opt for one of the following conformity
  assessment procedures*" -- Annex VI or Annex VII. It is a choice; Annex VII
  becomes obligatory only in the four cases of the second subparagraph.
  **(3) "Point 1(a)" under-scopes the provision.** Art. 43(1) reaches the whole
  of Annex III point 1 (Biometrics), which is (a) remote biometric
  identification, (b) biometric categorisation and (c) emotion recognition.
  **(4) The four triggers were compressed into one.** "Has not been (fully)
  applied" drops the case where standards "*do not exist, and common
  specifications referred to in Article 41 are not available*", and drops the
  limit that a restricted standard sends only "*the part of the standard that
  was restricted*" to Annex VII. §8.1 carried the matching hedge ("for most
  Annex III systems ... in some cases") and is restated as the Art. 43(2) rule
  it is. Nothing was deleted: the notified body's audit function, the
  free choice of notified body and the Art. 74(8)/(9) market-surveillance
  substitution are all now stated where the route actually applies.
  **This is the same defect corrected across nine sites in `aplc/` on
  2026-09-05; that pass did not reach this repository.**
- **Why no citation check could have found it: the sentence cited no
  provision.** The corrected paragraph named no article number -- "Annex VII"
  is a heading and "harmonised standard" is prose -- so it carried no
  `(instrument, article)` triple and could never be paired against the `aplc/`
  site that contradicted it. `tools/citation-consistency.mjs` §2 keys on
  `Art. N`. It was found instead by `command grep -rn 'Annex VII'`. **A claim
  about a provision that does not cite the provision is invisible to every
  citation-based check in this programme**, and a claim stated confidently
  enough needs no citation to be believed. The recall gap is recorded here and
  handed back to the tool owner rather than worked around.
- **Every conformity-assessment claim in this repository was enumerated by
  command, not sampled.** `command grep -rniE '(annex (vi|vii)([^i]|$)|notified
  body|third-party (conformity )?assessment|self-assessment|internal control)'
  --include='*.md' .` run from inside the repository -> **13 lines across 9
  files**; a second, wider pass on `conformity assess|Art(icle)?\.? ?43|CE
  mark|Annex V` -> 18 lines across 7 files. `command grep` was used for every
  count in this entry: the shell's `grep` wraps `ugrep --ignore-files`, and the
  root `.gitignore` lists this repository, so a root-level search returns
  nothing from it. **Wrong: 3** -- `regulatory/eu-ai-act-addendum.md:573` (the
  inversion), `:564` (the matching hedge in §8.1) and
  `domains/financial-services.md:188`. The remaining ten are sound and were
  left alone: `domains/medical-devices.md:259` and
  `integration/igm-aplc-integration-test.md:11` quote the Art. 6(1) two-limb
  test correctly, `domains/defense-government.md:75` and
  `regulatory/coso-cobit-crosswalk.md:80` are CMMC and COBIT rather than the AI
  Act, and `companion/reference.md:47` and `companion/principles-12.md:103` use
  "self-assessment" of maturity models, not of conformity.
- **`domains/financial-services.md:188` resolved: the hedge was hiding a route
  the Act forecloses.** The Art. 43 row read "Financial services AI may require
  third-party conformity assessment under sector-specific rules." It is hedged
  and attributed to sector rules rather than to the Act, so it was not a false
  statement about Art. 43 -- but it sits in a table whose own Annex III section
  classifies these systems under point 5, and a reader arriving at it reads an
  Annex VII path that Art. 43(2) forecloses for points 2 to 8. The row now
  states the Art. 43(2) rule in its own cell, records that financial services
  legislation is not Union harmonisation legislation listed in Section A of
  Annex I so the Art. 43(3) sectoral route does not apply either, and marks the
  surviving claim `F2`: a supervisory internal-model or IRB approval is a
  sector supervisory requirement, **not** an AI Act conformity assessment. The
  claim is re-attributed, not deleted, because a firm may well face such a
  review -- what was wrong was the instrument it was hung on.
- **DORA Article 28 has ten paragraphs, not nine, and the file that said
  otherwise had been corrected hours earlier for five wrong paragraph numbers
  in the same list.** `regulatory/foundation-model-third-party-register.md:240`
  said "all nine paragraphs of Art. 28 were read end to end at the primary".
  Enumerated at the hashed primary
  (the EUR-Lex text snapshot of Regulation (EU) 2022/2554 (DORA),
  sha256 prefix `25328c7e39c4`), Art. 28 of Regulation (EU) 2022/2554 runs
  1 to 10: **28(9)** is the ESA implementing-technical-standards mandate for
  the register template referred to in paragraph 3, and **28(10)** the ESA
  regulatory-technical-standards mandate for the policy referred to in
  paragraph 2. The same undercount stood in this errata file's own 2026-09-05
  entry ("Reading Art. 28(1) through 28(9)") and is corrected there too. The
  count is corrected in place, and the §3.1 obligation list -- which stopped at
  28(8) -- now carries rows for 28(9) and 28(10) so that the list and the claim
  about it agree. **The lesson is the entry, not the digit:** a claim about
  *how thoroughly a primary was read*, made inside a correction note, is the
  least likely sentence in a document to be re-checked, and it survived a pass
  that rewrote four rows immediately above it. That pass also wrote "verified
  against" as its verdict; the word is replaced with "read at the primary",
  since no model verifies anything.

- **EU AI Act Annex III misclassification of the CSDR penalty class withdrawn -- the twin
  a 2026-09-02 correction left standing.**
  `regulatory/foundation-model-third-party-register.md` §6.3 stated that
  "Class B (CSDR penalty) and Class C (credit pre-screening) require FRIA
  refresh (these are Annex III high-risk)", citing the EU AI Act. Class B is not an EU AI Act Annex III system.
  Annex III of Regulation (EU) 2024/1689 is exhaustive and contains no
  post-trade financial market infrastructure; the words *settlement*,
  *post-trade* and *securities* occur zero times anywhere in the Regulation,
  a demonstrated absence rather than a dead search, with one-word-swap
  negative controls and positive controls confirming the search resolves
  against the file. The nearest point, Annex III 5(b), reaches AI systems
  "intended to be used to evaluate the creditworthiness of natural persons or
  establish their credit score, with the exception of AI systems used for the
  purpose of detecting financial fraud" -- not wholesale settlement-fail
  penalty calculation between institutions. Class C (consumer-credit
  pre-screening) is squarely 5(b) and is unaffected; the FRIA obligation
  scoped to Class B was over-scoped and is withdrawn, and the Phase C step
  now carries a dated classification note in place. **The lesson is recorded
  with the correction:** the identical correction was made to the identical
  worked scenario in `integration/igm-aplc-integration-test.md` on
  **2026-09-02** and landed in that file only, so this file carried the
  withdrawn classification for three further days. Nothing in a per-file
  review or in `git diff` shows a surviving twin -- only an enumeration of
  every site in the repository that classifies the scenario finds it, and
  that enumeration is the reason this entry exists. Primary consulted:
  the Official Journal HTML snapshot of Regulation (EU) 2024/1689
  (sha256 prefix `a0f437e89667`).
- **DORA Article 28 paragraph attributions corrected in four places -- right
  instrument, wrong paragraph, four times over.**
  `regulatory/foundation-model-third-party-register.md` attributed a board-
  approval duty for CIF-supporting arrangements to **DORA Art. 28(7)** in two
  places (the §3.1 obligation list and procurement-gate item G16). Art. 28(7)
  of Regulation (EU) 2022/2554 is termination: it requires financial entities
  to "ensure that contractual arrangements on the use of ICT services may be
  terminated" in four listed circumstances. Reading Art. 28(1) through 28(10)
  end to end -- rather than only the paragraph named -- showed that DORA
  imposes no board approval of an individual arrangement at all: Art. 28(2)
  requires the management body to "regularly review the risks identified in
  respect to contractual arrangements on the use of ICT services supporting
  critical or important functions", and Art. 5(2)(h) requires it to "approve
  and periodically review the financial entity's policy on arrangements
  regarding the use of ICT services provided by ICT third-party service
  providers" -- a policy, not a contract. The phrase "board approval" does not
  occur anywhere in DORA. G16 is re-attributed to Art. 28(2) and now says in
  the same sentence as the claim that per-arrangement board approval is firm
  policy, not a DORA requirement. Reading the whole Article also exposed three
  further neighbour errors in the same list, each corrected in place: the
  CIF-support assessment was attributed to 28(2) (it is **28(4)(a)**), the
  mandatory contractual provisions to 28(5) (they are **Art. 30**; 28(5) is
  information-security standards), and the exit strategy to 28(6) (it is
  **28(8)**; 28(6) is audit and inspection rights) -- the last of these
  contradicting §1.1 and §6 of the same document, which already cited 28(8).
  Every wrong paragraph is a plausible-sounding neighbour of the right one,
  which is how the list survived earlier review. Primary consulted:
  the EUR-Lex text snapshot of Regulation (EU) 2022/2554 (DORA)
  (sha256 prefix `25328c7e39c4`).
- **GDPR Art. 12(3) response period restated in the Regulation's own unit --
  three sites, not the one reported.**
  `operational-templates/slo-table.md` rows 35 and 36 set the data-subject
  explanation and right-to-human-review clocks at "≤ 30 days", the first of
  them attributed in the same cell to "GDPR Art 12", and
  `regulatory/nist-ai-rmf-crosswalk.md:150` carried the same 30-day figure in
  its `rights_and_remedies` field example. Article 12(3) of Regulation (EU)
  2016/679 sets no such period: the controller shall provide information on
  action taken "without undue delay and in any event within one month of
  receipt of the request", and "that period may be extended by two further
  months where necessary, taking into account the complexity and number of the
  requests", with the data subject informed of the extension within one month.
  The strings "30 days" and "60 days" occur zero times anywhere in the
  Regulation, with one-word-swap negative controls (month → 30 days; two →
  three further months) and positive controls confirming the search resolves
  against the file. **A month is not thirty days**, and the error is worse than
  its size because an SLO table is precisely where a reader takes a number and
  builds a timer from it: February would over-run a 28-day month and every
  31-day month would run three days short of the real deadline. The periods are
  restated in the Regulation's own wording rather than converted to days, and
  the paragraph is now cited as Art. 12(3) rather than Art. 12. **The lesson is
  recorded with the correction:** the defect was handed over as one site in a
  different repository; enumerating every figure stated near a data-subject
  right across this repository found three, and none of them where they were
  said to be. Primary consulted:
  the EUR-Lex HTML snapshot of Regulation (EU) 2016/679 (GDPR)
  (sha256 prefix `9952f3f336d4`).
- **EU AI Act Art. 10(4) quotation restored; paragraph numbers added.**
  `companion/principles-08.md` asserted that Article 10 requires datasets to
  account for "characteristics or elements that are particular to the specific
  geographical, behavioural or functional setting." The word **contextual** had
  been dropped from inside the quotation marks. Art. 10(4) of Regulation (EU)
  2024/1689 reads "the characteristics or elements that are particular to the
  specific geographical, contextual, behavioural or functional setting within
  which the high-risk AI system is intended to be used". The quotation is
  restored with "contextual" and the paragraph is now cited as Art. 10(4). The
  article number held: the obligation is in Article 10, not a neighbouring
  provision, and the text was read in the Article body -- not in Recital 67 or
  Article 42, which carry near-identical wording in a different word order and
  would have made a wrong-provision citation look correct. The companion
  "free of errors and complete" quotation, which comes from Art. 10(3) and not
  from 10(4), is now attributed to 10(3) and carries the Act's own qualifier
  "to the best extent possible", which the previous sentence had dropped,
  stating an absolute duty the Act does not impose. Primary consulted:
  the Official Journal HTML snapshot of Regulation (EU) 2024/1689
  (sha256 prefix `a0f437e89667`).
- **DORA citation exemplar corrected -- a bad citation was being taught as the
  model of a good one.** `review/prompts/prompt-07-guardrails-security.md`
  offered, as its *positive* exemplar of a properly grounded regulatory claim,
  "DORA Art. 9(2)(b) requires that ICT systems are protected against ICT
  attacks". No such provision exists. In Regulation (EU) 2022/2554, Article 9
  is *Protection and prevention*; Art. 9(2) is unlettered prose about security
  policies, procedures, protocols and tools, and only Art. 9(3) carries points
  (a)-(d). The defect is worse than its size, because the artefact's purpose is
  to teach reviewers what a well-grounded citation looks like: an exemplar that
  is itself unsupported propagates the defect into every review written from
  the prompt, under the authority of the rule it illustrates. It was not
  repaired by renumbering to 9(3)(b), which exists and would have looked
  plausible: 9(3)(b) requires ICT solutions and processes to "minimise the risk
  of corruption or loss of data, unauthorised access and technical flaws that
  may hinder business activity", which is not what the sentence claimed. The
  phrase "ICT attacks" does not occur anywhere in DORA. The exemplar is
  replaced with Art. 9(4)(c), which unconditionally requires financial entities
  to "implement policies that limit the physical or logical access to
  information assets and ICT assets to what is required for legitimate and
  approved functions and activities only". Art. 9(4)(b) was considered and
  rejected: it mentions cyber-attacks only inside a "may include" hedge, and
  quoting a permissive clause as a requirement would have reproduced the same
  class of error. The replacement also places the sentence's full stop outside
  the closing quotation mark, so the quoted span is exactly the provision's
  words. Primary consulted:
  the EUR-Lex text snapshot of Regulation (EU) 2022/2554 (DORA)
  (sha256 prefix `25328c7e39c4`).
- **Declining intervention rate withdrawn as evidence; rubber-stamping
  screens demoted; a proposed engagement test added.** `adoption/metrics.md`
  presented four behavioural signals (median review time, rejection rate,
  inline comments, rework rate) as quantitative rubber-stamping detection.
  Every one is a proxy a reviewer can satisfy without doing the cognitive
  work, and the research literature on monitoring highly reliable automation
  reports rapid habituation to controls of exactly that kind. The signals are
  retained as continuous screens and are now explicitly stated to be adequate
  to fire an alert and inadequate to clear one; they are no longer an
  assurance basis for an autonomy decision. Added in their place, as a
  **proposed and unvalidated** design: the Engagement Falsification Protocol
  (double-blind synthetic fault injection, with blinding to reviewers and
  their supervisors, a hard interception interlock, pre-registered outcomes of
  supported-within-scope / contradicted / inconclusive, and *d'* rather than a
  raw hit rate as the primary endpoint). Its limits are stated in the text
  alongside it, not in a footnote: it does not reach in-envelope Tier 4
  execution, it excludes irreversible and person-affecting actions, and it
  cannot be powered on a low-volume queue -- run unpowered it returns
  "supported" by default. Nothing in the repository authorises live fault
  injection. The same section now states that a declining intervention or
  override rate is not evidence that oversight can relax, and that the
  decision-quality qualifier does not repair it.
- **No numeric pass criterion is asserted for the protocol.** The commissioned
  research synthesis behind it carries a numeric pass threshold only inside an
  embedded figure image, with no text equivalent anywhere in the document. The
  criterion is therefore stated structurally -- detection on injected faults
  must not decline with the baseline rate -- and no numeral is quoted for it.
- **Tier 4 assurance basis corrected.** `glossary.md` and
  `regulatory/incidents-appendix.md` conditioned Tier 4 authorisation on
  rubber-stamping detection being active without recording that no engagement
  measurement reaches in-envelope Tier 4 execution, where there is no
  per-action human decision to instrument. Both now state that the
  prerequisite bounds the envelope-change and audit functions only, and that
  in-envelope assurance rests on envelope design, machine enforcement and
  post-hoc audit. `governance/authority-accountability-matrix.md`'s D3 trigger
  row carries the same asymmetry note and now requires a positive engagement
  result, or an explicit record of its absence, to restore a tier.
- **Fabricated FDA CSA quotations withdrawn.** `domains/pharma.md` attributed
  seven quoted phrases to FDA's Computer Software Assurance guidance --
  five in a "CSA Principle" table (`:102-106` as then numbered) and two in
  a prose bullet on formal verification (`:338-339`) -- plus a propagated
  eighth site in an Open Regulatory Questions row (`:424`, "leverage
  supplier testing"). None of the eight occurs in either the 2022 CSA
  draft or the live 2026 final, checked at primary with whitespace- and
  hyphen-insensitive matching. The quotations were cut; the table and
  prose bullet were not replaced with alternate quotations, per this
  repository's cut-not-softened standard. The checks covered the FDA's 2022
  draft and 3 February 2026 final guidance, using whitespace- and
  hyphen-insensitive matching.
- **Section 2 scope defect flagged, not rewritten.** The same file's
  §2 headline -- "the strongest alignment point between the manifesto and
  pharma regulation" -- rests on FDA CSA guidance whose own Scope section
  states it applies "for medical devices" under 21 CFR Part 820, not the
  210/211 and EU GMP Annex 11 basis pharma GMP validation actually runs
  on; the guidance has also been superseded twice since the 2022 draft the
  file cites. A dated scope note was added recording this; the section's
  argument was left standing for its author to revise. See the same
  packet, claim C6.
- **GDPR Art. 22 quotation corrected.** `domains/README.md`'s
  cross-domain open-questions table quoted "solely automated
  decision-making" as GDPR Art. 22 itself; that exact wording does not
  occur in Art. 22 (Art. 22(1) reads "a decision based solely on
  automated processing"). The quotation marks and direct attribution were
  removed; the question was kept, unquoted, since it stands on its own.
  No replacement quotation was asserted.

- **DORA Article 14 cross-reference corrected -- the withdrawal that ran in
  two other repositories never reached this one.** `domains/financial-services.md`
  (§ ASDLC and APLC Regulatory Guidance) listed "DORA Article 14" among the
  financial-services requirements mapped to ASDLC Layers 1, 3 and 4. Article 14
  of Regulation (EU) 2022/2554 is *Communication* -- crisis-communication plans
  (¶1), communication policies for internal staff and external stakeholders
  (¶2), and a person tasked with the public and media function (¶3) -- and
  carries no ICT change-management obligation. The obligation the linked ASDLC
  guidance maps to Layer 3 is Article 9(4)(e), documented policies, procedures
  and controls for ICT change management; the cross-reference now cites that,
  with an in-place note. Read at primary against
  the EUR-Lex text snapshot of Regulation (EU) 2022/2554 (DORA)
  (sha256 prefix `25328c7e39c4`). Recorded for the next reader, because a
  correction elsewhere in this programme asserted that Article 14 has no
  paragraph 2: **it does** -- the text is quoted above -- and what does not
  exist is lettered sub-paragraphs under it. Neither this file nor its note
  repeats that claim. The site was missed by the earlier sweep because nothing
  had been withdrawn here, so there was no withdrawal marker to find; it was
  reachable only by searching for the withdrawn string itself.
- **CSA §2 headline: the scope caveat moved out of the blockquote and into the
  claim.** `domains/pharma.md` §2 asserted that "The FDA's 2022 CSA guidance
  replaces traditional CSV with risk-based, critical-thinking-driven assurance"
  and that "This is the strongest alignment point between the manifesto and
  pharma regulation", with the qualification carried in a `> **Scope note**`
  blockquote *above* the sentences. A separated caveat is stripped the moment
  the figure or claim is lifted into a deck, so the qualification is now in the
  sentences themselves: the guidance does not say it "replaces" CSV; "critical
  thinking" occurs zero times in the 2022 draft and zero times in the
  3 February 2026 final, so "critical-thinking-driven" is this document's gloss
  and not the instrument's language; and the alignment judgement is marked as
  asserted on this document's own account against a guidance whose stated scope
  is computer software assurance "for medical devices" under 21 CFR Part 820.
  **No claim was deleted** -- each is now marked unsourced in its own sentence,
  and the scope note is retained and updated to say the qualification has moved.
  Sources checked: the FDA's 2022 draft and 3 February 2026 final guidance.
- **PAT bullet: the caveat now governs what survived the cut, not what was
  removed.** In `domains/pharma.md`, the bullet "**FDA CSA alignment**: targeted
  formal verification on critical paths can support replacing exhaustive
  scripted test matrices" was followed by a parenthetical recording that two
  CSA quotations had been cut from it. That parenthetical qualified **the
  deleted quotations only** -- so the bullet went on attributing the practice to
  FDA CSA in its own label with nothing behind it, next to a caveat a reader
  would take as covering it. "formal verification" occurs zero times in the 2022
  CSA draft and zero times in the 2026 final. The bullet now carries, in its own
  sentence, that the alignment is asserted on this document's account and is not
  sourced to the guidance; the withdrawal parenthetical is kept and now says so.
  The claim was not deleted.
- **Two unquoted CSA tables carried the withdrawn quotations onward.** The same
  day's withdrawal of the seven fabricated FDA CSA quotations (entry above) was
  aimed at quoted strings, and it cleared every one of them. It did not reach
  two tables in `domains/pharma.md` that attribute phrases to the guidance
  **without quotation marks**: the CSV-versus-CSA comparison table in §2 and the
  CSA column of Appendix A's alignment summary. Both carried "Intended use
  drives assurance" -- byte-identical to the withdrawn "CSA Principle" table row
  -- as a live, unmarked attribution to the guidance, so the fabrication
  survived the pass that was supposed to end it. It was found by a ground-truth
  regression row (`RESOLVED-D60-CSA-4` in
  `tools/citation-quotation-known-cases.tsv`) that reported the string
  unexpectedly present, not by re-reading the section. Both cells were reworded
  to "Assurance effort follows intended use and risk"; the claim was not
  deleted, because the guidance is genuinely intended-use- and risk-driven
  ("intended use" occurs 54 times in the 2022 draft and 81 times in the
  3 February 2026 final). All **seven** entries in the §2 comparison table's
  CSA (2022) column were then checked at primary, not just the flagged one:
  "Risk-based documentation", "Unscripted + scripted testing", "Critical
  thinking", "Test to the risk", "Assurance commensurate with risk", the former
  "Intended use drives assurance" and "Continual assurance" each occur **zero
  times** in both texts, with one-word-swap negative controls and five positive
  controls confirming the search resolves against both files. The table now
  carries a note in place stating that the column is this document's paraphrase
  and not the guidance's wording; the Appendix A cell carries the same
  qualification inline. **The lesson is recorded with the correction:** a
  withdrawal pass scoped to quotation marks leaves the identical fabricated
  wording standing wherever the corpus asserts it unquoted, and only an
  enumeration of the surrounding tables -- not of the flagged line -- finds it.

## 2026-08-11

- **Fabricated ROI/overspend figures removed.** `adoption/enterprise.md` carried
  a "40–60% defect-reduction" figure attributed to SWE-CI and an unsourced
  "30–50% overspend" claim beside it. Neither figure is supported by the cited
  source. Both were removed rather than replaced, pending independently
  verified figures.
- **Source count and attribution corrected.** `README.md` and
  `beyond-agile/sources.md` previously stated "twenty-three cited sources" and
  attributed material to "Feldt et al." on the front page in a way that
  overstated the citation's role. The source count is corrected to the actual
  count of sixty cited sources, and the front-page attribution is corrected.
- **SWE-CI unit-of-analysis fixed.** Several passages described the SWE-CI
  benchmark's findings using a unit of analysis (e.g., "75% per CI iteration")
  that does not match how the benchmark actually measures outcomes. The
  framing was corrected across five files to describe the benchmark's actual
  unit of analysis (18 evaluated models, 100 long-horizon tasks,
  zero-regression rate).
- **Hoda/Hassan attributions withdrawn.** Attributions to Hoda and Hassan that
  could not be independently verified against the cited primary sources were
  withdrawn rather than left standing on an unconfirmed citation.
- **Phase-profile empirical framing demoted.** Claims about phase-profile
  behavior that were presented with an empirical framing they did not earn
  were rewritten to remove the empirical framing, pending independently
  verified support.

### D-57 / D-60 · `regulatory/foundation-model-third-party-register.md:283, :288` — two bolded renderings of Art. 30, each a word off

- **Struck.** *"at no additional cost, or at a cost determined ex ante"*
  (Art. 30(2)(f)) and *"participate and fully cooperate in the entity's TLPT"*
  (Art. 30(3)(d)). Both **bold, neither quotation-marked**.
- **The primary.** Art. 30(2)(f) reads *"at no additional cost, or at a cost
  that is determined ex-ante"* — the register dropped **"that is"**. Art. 30(3)(d)
  reads *"participate and fully cooperate in the financial entity's TLPT"* — the
  register dropped **"financial"**. Both corrected forms now return **1** at the
  hashed DORA primary (sha256 prefix `25328c7e39c4`) through the checker's own
  `normalizeForMatch`; negative control `zorkmid frotzwibble` **0**. Both spans
  **wrap across a hard line break**, so a line-based `grep` misses them and they
  were located wrap-safe.
- **Does bold read as verbatim in this file? No — and the file settles it
  itself.** The decisive evidence is **nesting**: at §4 the register writes
  *"within the time limits **to be laid down in accordance with Article 20,
  first paragraph, point (a), point (ii)**"* — bold **inside** quotation marks.
  If bold were the verbatim marker that nesting would be redundant; instead the
  quotation marks carry verbatim and bold carries emphasis within it. The
  distribution agrees: **166** bold spans against **15** quoted spans, and bold
  falls on **Yes**, **No**, **not**, **full**, **Art. 30**, **Art. 26(3)**,
  section headings and whole analytical sentences — none of them quotations. The
  file's explicit *"Citation convention."* note at :13 governs article
  short-forms and the authoritative text, and says nothing promoting bold to a
  verbatim marker. **A reader would not take bold here as verbatim.** The
  adjudication's view is upheld on independently re-derived grounds.
- **Corrected anyway, and that is the judgment.** The verdict on bold decides
  whether these *asserted* something false; it does not decide whether to fix
  them. A near-verbatim rendering a word off is the **D-60 shape whether or not
  it carries marks**, because **a one-word divergence survives review in a way an
  invented sentence does not** — a reader checking the register against DORA
  finds the sentence, matches it approximately, and moves on. Making them exact
  costs nothing, removes the ambiguity permanently, and does not depend on the
  house rule never changing; leaving them would bank on it. Content retained,
  attribution corrected, no control deleted.
- **Rebuild.** This edit makes the rendered HTML stale for the **eleventh** time.
  No `.html` was hand-patched. An eleventh rebuild must carry: the two corrected
  Art. 30 spans and their correction note in `regulatory/foundation-model-third-party-register.html`,
  and, if the site build inlines them, the register's rendered twins in
  `index.html`. Nothing else in this repo was edited by this pass.
- **Tracking, corrected against the brief.** The brief for this pass stated that
  all three repositories' `errata.md` are untracked under `D-57`. That holds for
  `aplc/errata.md` and `asdlc/errata.md` (`git -C <repo> status --porcelain
  errata.md` -> `?? errata.md` for both), but **not for this file**: AEM's
  `errata.md` is tracked (`MM`, and `git -C agentic-engineering-manifesto
  ls-files --error-unmatch errata.md` succeeds), so
  `git -C agentic-engineering-manifesto diff` **does** show this entry. Measured,
  not assumed.

### D-57 / D-61 · six bare article citations carried onto the wrong instrument, five of them in this repository — and a judgment on whether `_swarm-changelog.md` is a claim surface

**Note on how this entry is written.** Every instrument name below is
backticked, and no span is quotation-marked. That is deliberate and it is the
same discipline `aplc/errata.md` records at its `D-57 / aplc-guide.md:296`
entry: an errata entry that spells a needle in citable form becomes a citation
site itself, moves the census it is reporting on, and can manufacture
truly-new fabricated-quotation flags out of its own correction note. Measured,
not supposed — the first draft of this entry did exactly that, adding two
§2 groups, displacing a §2 representative pair, and producing **four**
truly-new flags. The counts are kept here; the needles are not.

- **Five sites in this repository:** `governance/_swarm-changelog.md:284` and
  `:285`, `regulatory/eu-ai-act-addendum.md:322`,
  `regulatory/iso-42001-crosswalk.md:179`, and
  `regulatory/nist-ai-rmf-crosswalk.md:28`. Each line cited a bare article
  number and named no instrument, so the attribution mechanism supplied the
  nearest one on a preceding line — `GDPR` in all five cases. **Every one of
  them is an `EU AI Act` citation.** A sixth site of the identical shape,
  `agent/agent-release-governance.md:156`, is in `aplc` and is recorded there.
- **The instrument is now named on the line. No citation was deleted, no number
  changed, and no other word on any of the six lines was touched:** each edit is
  a pure ten-byte insertion, and each edited line is **byte-identical to its
  predecessor once the inserted instrument name is removed**, compared through
  the checker's own `normalizeForMatch` — normalised first, padded after.
- **Re-derived at the hashed primaries, not inherited from the pass that handed
  them back.** `GDPR` at
  the EUR-Lex HTML snapshot of Regulation (EU) 2016/679 (GDPR) — **zero**
  annex subdivision ids against a positive control of **198** article
  subdivision ids in the same file — and the `EU AI Act` at
  the Official Journal HTML snapshot of Regulation (EU) 2024/1689, sha256 prefix
  `a0f437e89667`, **13** annex ids against **226** article ids. Each of the six
  article headings was read on both instruments and they are not near-misses of
  one another: on `GDPR` the six numbers head *Procedure*, *Representatives of
  controllers or processors not established in the Union* (twice), *Processing
  and public access to official documents*, *Chair*, and *International
  cooperation for the protection of personal data*; on the `EU AI Act` the same
  six numbers head *Post-market monitoring by providers and post-market
  monitoring plan*, *Fundamental rights impact assessment* (twice), *Right to
  explanation of individual decision-making*, *Reporting of serious incidents*,
  and *Transparency obligations for providers and deployers of certain AI
  systems*. Every corpus line matches the second reading and none matches the
  first.
- **The `_swarm-changelog.md:284` case is settled by the primary, not by
  inference.** The `EU AI Act` post-market-monitoring article's third paragraph
  obliges the Commission to adopt an implementing act laying down a template for
  the post-market monitoring plan **by 2 February 2026** — which is exactly the
  corpus line's *pending Commission template … due Feb 2026*. **One inherited
  detail is corrected while we are here:** the hand-back described the `GDPR`
  article of that number as the election of the chair. It is not — that is the
  *next* `GDPR` article; the one at issue is *Procedure*. The trap the hand-back
  described is real, because `GDPR` genuinely carries an article of that number
  and so no last-article bound can refuse it, but the heading it named was the
  wrong one. Re-deriving found that; inheriting would have carried it.
- **Is `_swarm-changelog.md` a claim surface? No — and the fix is a different
  fix because of it.** The earlier exclusion stands and is **not** reopened by
  this edit. This file is an append-only build log, 14% of the §2 queue on its
  own, and its lines record *what was done on a date*, not what the law
  provides; a §2 "disagreement" between a log line and a domain file compares a
  record against a claim, which is not a disagreement about anything. **But
  not-a-claim-surface is not not-a-citation-site.** The line still carries a
  citation token that both a reader and the mechanism resolve, and it was
  resolving to the wrong instrument. On a domain file the fix would be to
  correct the *assertion*; **on a build log the record must not be rewritten**,
  so the fix here is a **disambiguating gloss and nothing more** — it names the
  instrument the entry already meant. That is provable from the entry's own
  wording rather than assumed: the same entry's **goal line at `:262`** already
  names the `EU AI Act` and the very article numbers at issue as the blocker it
  was closing, and the sibling bullet at `:286` already names `DORA` explicitly
  where `DORA` is meant. **No date, no outcome, no description of work done, and
  no wording of what was done was altered.** The entry asserts nothing today
  that it did not assert before. Applying a domain-file fix to a build log —
  rewriting the record to say what we now know — would have been its own error,
  and was not done.
- **Both shapes enumerated, and what the enumeration found beyond the named
  lines is reported rather than silently fixed.** `command grep` run from
  **inside each repository** with **quoted globs** and
  `--exclude-dir=node_modules`, cross-referenced against the checker's own
  `--dump-triples` and its recogniser table with backticked spans masked per the
  identifier-drag guard. The `command grep` file set — **113** here, **30** in
  `aplc` — was proved equal to `git ls-files` plus
  `git ls-files --others --exclude-standard`, so the **untracked**
  `aplc/errata.md` is inside the scan and is not missed the way `git grep`
  would miss it.
  - **Bare article citations on an instrument-less line, both repositories:
    548.** Forty resolve to `GDPR`; **six of those forty are wrong and all six
    are fixed by this pass** (five here, one in `aplc`). The remaining
    thirty-four are correct `GDPR` citations, read at the site. **They came in
    clusters, not as singletons:** `:284` and `:285` are adjacent bullets of one
    list, both dragged by a single `GDPR` token in the bullet at `:280`, and
    `:322`, `:179` and `:28` are each dragged by a *correct* `GDPR` mention one
    to four lines above them.
  - **Bare annex citations on an instrument-less line, both repositories: 326.**
    Beyond the one the no-annex bound refuses — `aplc/agent/agent-conception.md:286`,
    corrected in that repository's errata — **22 further annex citations are
    carried onto an instrument that is not the `EU AI Act`**: `CSDR` **8**,
    `MDR` **6**, `MiFID II` **4**, `Solvency II` **4**. Read at the site, every
    one of the 22 is an `EU AI Act` annex. Eleven are here — `errata.md:626`,
    `integration/igm-aplc-integration-test.md:12` and `:13`,
    `regulatory/foundation-model-third-party-register.md:504` and `:505`
    (carried to `CSDR`), and `errata.md:110` and `:114` (carried to `MDR`) —
    and eleven are in `aplc`, listed there. **They are reported, not fixed.** No
    bound reaches them: the annex-existence fact is **UNKNOWN** for `CSDR`,
    `MiFID II` and `Solvency II`, and absent means unknown rather than "assume
    none". Re-attributing 22 sites at once would change the membership and the
    representative pairs of five §2 annex groups — the same census trade T4.36
    priced and declined — and each needs adjudication at its own site.
    **`reported` is not `fixed`, and this entry says which it is.**
  - A **wrap-safe** scan (`command grep -rlEz` with a quoted `--include='*.md'`
    glob and a `word[[:space:]]+word` pattern) and a normalised whole-file scan
    with dashes mapped to spaces were run alongside the line-scoped scan and
    added **no file** the line-scoped scan missed here. The scan for an
    *instrument name* split from its citation by the newline found **29** files
    here and **19** in `aplc`, none of them wrap-only — but the shape is live at
    `aplc/domains/insurance.md:118-119`, where the instrument name is broken
    across the line ending and the annex on the next line is filed under
    `Solvency II` in consequence.
- **Fresh long negative control, proved against a positive.** A newly generated
  two-word needle returned **0** whole and **0** for each half, line-scoped and
  wrap-safe, in both repositories and on the six edited lines. It is a real
  absence and not a dead scanner: positive controls on the **identical**
  commands returned **203** annex-word hits over **113** files scanned here and
  **317** over **30** in `aplc`, and the inserted instrument name returned
  exactly **1** on each edited line after the edit. **None of the four needles
  this corpus has already burned in errata entries was used** — recording a
  control in errata retires it, and those four are recorded.
- **Prefix-safe controls, whole tokens, because a digit is not a word.** On the
  changelog line, a seven-only pattern with a following-digit exclusion matched
  **0** while the seven-two pattern matched **1**, and a digit-width swap to a
  three-digit number matched **0**. On the `aplc` annex line, the single-numeral
  annex pattern with a following-numeral exclusion matched **0** while the
  four-numeral pattern matched **1**, and both a longer-numeral variant and the
  three-numeral variant matched **0**. The short form does not match the long
  form under the controls used, in either direction.
- **Movement, isolated and named.** Across both repositories: triples
  **1882 → 1883**; `GDPR` **234 → 228**; `EU AI Act` **1146 → 1153**;
  unattributed **460 → 459**; no-annex refusals **6 → 5**. The `--dump-triples`
  diff against the frozen baseline is **exactly** the six moves plus the one
  annex citation the bound had refused and now no longer must — nothing else
  moved, in either direction. **Everything else is unchanged line for line:**
  §2 pairs **73**, §2 groups **96**, truly new **0**, sub-clause OK **564** /
  fabricated **1** / no structure data **27**, §3c rows **158** (live 154, VOID
  0, REGRESSED 0, DUPLICATE KEYS 3), §6 verbatim OK **127**,
  `--known-only` exit **0**, `./tools/register-crossref.sh` exit **0**,
  `./tools/link-check.sh` **broken 4 / total 1043 across 5 repos**,
  `aplc/tools/check_overview_counts.py` exit **0**. Full run exit **1**, twice,
  **byte-identical**.
- **Rebuild.** This edit makes the rendered HTML stale for the **twelfth** time.
  **No `.html` was hand-patched.** A twelfth rebuild must carry exactly four
  files in this repository — `governance/_swarm-changelog.html`,
  `regulatory/eu-ai-act-addendum.html`, `regulatory/nist-ai-rmf-crosswalk.html`
  and `regulatory/iso-42001-crosswalk.html`. **`index.html` is NOT stale from
  this pass**, and that was measured rather than assumed: all four edited
  strings return **0** in it against a positive control returning **1** and a
  negative control returning **0**, so the file was actually read. `aplc`
  contains **no `.html` at all**, so its two edits need no rebuild. Nothing else
  in either repository was edited by this pass.
- **Tracking.** This file is tracked, so
  `git -C agentic-engineering-manifesto diff` **does** show this entry — unlike
  `aplc/errata.md`, which is untracked under `D-57`, is not walked by the
  checker's `git ls-files` at all, and whose companion entry `git -C aplc diff`
  will not show.

---

[← Back to README](README.md)
