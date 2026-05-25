# Wizard flows — pre-critique synthesis

25 agents critiqued one flow each in parallel. This document folds their findings into (1) **systemic / cross-cutting issues** that need fixing once and ripple through many flows, and (2) **per-flow specifics** that you'll want to spot-check during your own combthrough.

---

## A. Systemic / cross-cutting findings

These appeared in multiple critiques and are best fixed once at the source rather than per-flow.

### A1. Digoxin level target — wrong threshold, wrong gating
Mentioned by Flows 03, 08, 09, 16, 18, 19, 20, 21, 23, 25.
- Current copy says **"check pre-dose level < 2 ng/mL if renal function impaired."**
- `< 2 ng/mL` is the **toxicity ceiling**, not a therapeutic target. Therapeutic range is **0.8 – 2.0 ng/mL**; AF-specific evidence (DIG post-hoc, AFFIRM, ESC 2024) favours **0.5 – 0.9 ng/mL** for mortality benefit.
- The "if renal impairment" gate is too narrow. In sepsis-AKI flows it should be **unconditional**; on Verap+Digox flows (P-gp interaction raises levels 50–75 %) it should also be **unconditional**.
- Specify pre-dose = **≥ 6 h post last dose** — currently implied, not stated.
- Add toxicity recognition cues: nausea, visual halos (xanthopsia), bradyarrhythmia, AV block, confusion.

### A2. §3 re-referral threshold templating bug
Mentioned explicitly by Flows 07, 15, 21, 25.
- §3 currently reads: *"…despite maximal Digoxin 250 mcg OD … **and Bisoprolol 10 mg OD**"* — hard-coded.
- For any Verapamil flow this is wrong — and worse, contradictory: it tells the clinician to escalate to "max Bisoprolol" in a patient where Step 4 has a warning bar against adding Bisoprolol.
- **Fix:** template §3 so the agent name substitutes correctly. Bisoprolol flows → "max Biso 10 mg OD"; Verap flows → "max Verap 80 mg TDS / MR 240 mg OD"; combo flows → both agents named with their respective ceilings.

### A3. Current Bisoprolol dose never captured
Mentioned by Flows 04, 05, 09, 19.
- Step 3 only records *that* the patient is on Biso, not the dose. The plan then says "uptitrate up to 10 mg OD" — meaningless if they're already on 10 mg; dangerous if they're on 1.25 mg and the next clinician reads "up to 10 mg" as license to jump.
- **Fix:** add a dose-tier selector (or free-text field) under each agent button in Step 3. Or at minimum, plan copy should read "uptitrate to the **next BNF step** (1.25 → 2.5 → 3.75 → 5 → 7.5 → 10 mg OD) as SBP > 100, HR > 60 tolerate".
- Same applies to Verapamil dose (40 / 80 mg TDS, or MR 120 / 240 mg OD).

### A4. Verap + Digox PK interaction
Mentioned by Flows 20, 21, 24, 25.
- Verapamil inhibits P-gp → digoxin levels rise **~50 – 75 %** (BNF severe interaction). Sepsis-AKI compounds this.
- Currently the Verap+Digox flows share copy with Biso+Digox flows. They are not clinically symmetrical.
- **Fix:** Verap+Digox flows need (i) an `.esc-warn` bar in Step 4, (ii) mandatory pre-uptitration digoxin level, (iii) starting maintenance reduced (e.g. 62.5 mcg OD or alternate days if eGFR < 50), (iv) target trough lowered to **< 1.5 ng/mL**.

### A5. Sepsis safety net missing on "controlled" flows
Mentioned by Flows 10, 12, 14, 16, 22, 24.
- All "septic / HR controlled" flows currently lean on §1 item 4 ("Treat sepsis or hypovolemia if present"). The agent-specific item just says "continue current dose".
- **Risk:** septic patient on a BB or CCB with a controlled rate **right now** can flip — vasoplegia + negative inotropy/chronotropy with no compensatory tachycardia headroom.
- **Fix:** for any septic flow, the agent item should include a **hold criterion**: SBP < 100, MAP < 65, lactate rising, NEWS2 ≥ 5. Verap-in-sepsis louder than Biso-in-sepsis (negative inotropy is worse than negative chronotropy in distributive shock).

### A6. β-blocker contraindications never enumerated
Mentioned by Flows 03, 05.
- "If no β-blocker contraindication" is the phrase used several times. Juniors using this won't know the list.
- **Fix:** at first mention, expand to: **asthma / severe COPD with reversibility, 2nd/3rd-degree AV block, sick sinus, decompensated HF, severe peripheral vascular disease, untreated phaeochromocytoma**.

### A7. Verapamil contraindicated in HFrEF — never checked
Mentioned by Flows 06, 07, 14, 15, 20, 24, 25.
- Non-DHP CCBs are contraindicated in LVEF < 40 % (BNF, NICE NG196, ESC 2024). The wizard never asks about LV function.
- **Fix:** §2 outpatient echo is too late. Add to all Verap flows: *"If recent echo is not available, request inpatient TTE before uptitrating — verapamil contraindicated in HFrEF."*

### A8. Digoxin loading dose not body-weight / age / renal adjusted
Mentioned by Flows 03, 11.
- Flat **500 mcg + 500 mcg = 1 mg total load** is the upper BNF range. In a frail 50 kg 85-year-old this is dangerous.
- **Fix:** the digoxin loading recipe should branch on weight / age / eGFR. Suggest: *"Use 250 + 250 mcg loading if elderly, frail, weight < 60 kg, or eGFR < 30."*

### A9. Amiodarone never offered as a rescue option
Mentioned by Flows 09, 11, 17, 23.
- For refractory patients especially in sepsis (slow digoxin onset; BB/CCB unsafe), IV amiodarone is the standard cardiology / critical-care bridge (ESC 2024 IIa).
- §3 currently sends the patient to cardiology with no interim option named.
- **Fix:** §3 (refractory flows, especially septic + refractory) should mention: *"Cardiology may consider IV amiodarone 300 mg over 10–60 min, then 900 mg over 24 h via large-bore/central access; or DCCV if anticoagulated / TOE-guided."*

### A10. Target HR / symptom status not asked
Mentioned by Flows 03, 04, 08.
- NICE NG196 §1.4: lenient rate target (< 110) only if **asymptomatic AND preserved LVEF**. Symptomatic or HFrEF → strict (< 80).
- The wizard treats HR > 110 as the only trigger. A symptomatic patient at HR 95 is being told they're "controlled."
- **Fix:** Step 3 should add a symptom checkbox. Plan copy should reference symptoms.

### A11. AF onset / duration not captured
Mentioned by Flow 02.
- The < 48 h vs ≥ 48 h / unknown-onset window matters for downstream cardioversion candidacy.
- **Fix:** Step 2 could include an "AF onset" radio: < 48 h / ≥ 48 h / unknown.

### A12. "Treat sepsis or hypovolemia if present" runs in every plan
Mentioned by Flow 02 (and several others as a softer note).
- This item appears in plans where sepsis was just actively excluded one step earlier. Reads like a templating leak.
- **Fix:** conditional rendering. If sepsis flag is **off**, drop or italicise this item (or replace with "Reassess for occult sepsis if patient deteriorates").

### A13. "Advise patient to make a GP appointment · to uptitrate rate-control medication if required" is wrong in some flows
Mentioned by Flow 02 (and implicitly by Flow 18 / 20).
- Tells the GP to "uptitrate" a drug the patient isn't on (Flow 02), or to "uptitrate" when the patient is already on combination therapy and should be **considered for wean** (Flows 18 / 20).
- **Fix:** branch this item on `agentCount` and `refractory`. No agent → "review and start if HR rises"; combo + controlled → "consider down-titration".

### A14. NEWS2 / observation cadence never specified
Mentioned by Flow 10, 11, 12, 14, 22, 24.
- "Call 2222 if deteriorates" is correct but too late for incremental deterioration in sepsis. NEWS2 ≥ 5 or rising-by-2 is the RCP standard.
- **Fix:** add an observation cadence item to the septic plans: *"Obs minimum 4-hourly while septic; escalate at NEWS2 ≥ 5."*

---

## B. Per-flow findings

Lightly edited from each agent's report. Loud clinical flags are marked **⚠**.

### Flow 01 — Acute exclusion (terminal)
- **⚠ Item ordering is dangerous.** *"DC cardioversion required"* is item 2 and *"Escalate, discuss with cardiology"* is item 3. A clinician scanning the plan may delay 2222 while phoning cardiology. **2222 / peri-arrest call must be item 1.** ALS (Resus Council UK 2021) is unambiguous: adverse features → senior help, sync DCCV up to 3 attempts, then amiodarone.
- **Missing:** anaesthetics for DCCV sedation; IV amiodarone pathway (300 mg over 10–60 min, then 900 mg / 24 h); peri-DCCV anticoagulation (LMWH/heparin); pre-DCCV bundle (IV access × 2, monitoring, 12-lead, bloods incl. troponin/Mg/K/TFTs/lactate, pads on); reversible-cause sweep at the front door; identification of *which* exclusion fired (HR < 60 wants atropine/pacing not DCCV; ECG ischaemia wants cath-lab discussion).
- **Amend:** title "Escalate · Do not template" → "Peri-arrest AF — ALS pathway, not AEC". "DC cardioversion required …" → "Synchronised DCCV up to 3 attempts (ALS adult tachyarrhythmia). Sedation by anaesthetics. If fails or unavailable: Amiodarone 300 mg IV over 10–20 min, then 900 mg over 24 h via large-bore / central access; repeat DCCV." "Escalate immediately" → "Escalate: 2222 peri-arrest call + on-call medical reg + anaesthetics + cardiology reg. CCU/HDU monitored bed."

### Flow 02 — Not septic / no agent / HR controlled
- **⚠ Item 10** tells GP to "uptitrate" a drug the patient is not on — illogical.
- **Missing:** explicit reassess trigger (HR may climb in evolving sepsis or occult driver); AF onset documentation; reversible precipitant beyond TFT/lytes/sepsis (alcohol, recent surgery, PE, CXR); "is this really new AF?" prompt (old ECGs / GP record); patient safety-net wording for discharge.
- **Remove:** Item 4 ("Treat sepsis…") sits awkwardly when sepsis was just excluded.
- **Amend:** Item 5 → add a trigger ("start Biso 1.25–2.5 mg if HR drifts ≥ 110 or symptomatic"); Item 10 → "GP review within 1–2 weeks for rhythm reassessment, AC initiation, start rate-control if HR rises".

### Flow 03 — Not septic / no agent / HR > 110
- **⚠ β-blocker CIs not enumerated**, **⚠ digoxin loading dose not body-weight / age / renal adjusted**, **⚠ digoxin level threshold "< 2 ng/mL" is wrong**.
- **Missing:** Digoxin drug interactions (amiodarone, verap, macrolides, spironolactone); reassessment interval between Branch A and B; explicit target HR; K⁺/Mg²⁺ link to digoxin toxicity.
- **Amend:** Item 5 "uptitrate to 5 mg, then 10 mg" → add "increase no sooner than 24–48 h"; SBP > 100 written consistently throughout; §3 "maximal Digoxin 250 mcg OD" → "maintenance Digoxin at maximum tolerated (up to 250 mcg OD)".

### Flow 04 — Not septic / on Biso / HR controlled
- **⚠ Current dose never captured** — "continue at current dose" hides whether they're on 1.25 mg or 10 mg.
- **Missing:** symptom check (NG196 lenient < 110 only if asymptomatic + preserved EF); BP / bradycardia / asthma safety-net; GP letter; trigger to revisit if HR creeps > 110.
- **Amend:** Item 5 body → add "document the dose, confirm taking it, no acute uptitration"; §2 GP advice → "book within 2 weeks"; 24-h tape → "and BP".

### Flow 05 — Not septic / on Biso / HR > 110
- **⚠ Current dose never captured.** *"Uptitrate Bisoprolol up to 10 mg OD"* is meaningless if patient already on 10 mg, dangerous if on 1.25 mg.
- **Missing:** pre-uptitration safety check (HR floor, PR interval, decompensated HF, asthma); reassessment interval ("after 12–24 h on each new dose"); Digox pre-load checks (U&Es, ECG ruling out AV block/WPW — Digox CI'd in WPW + AF); additive AV-block warning when BB + Digox together (~5–10 %); HFrEF context (slower BB schedule).
- **Amend:** Item 5 → "Uptitrate to next BNF step (2.5 → 5 → 7.5 → 10) provided SBP > 100, HR > 60, no new symptoms. Reassess 12–24 h before each step. If already 10 mg → Digoxin loading."; Item 6 trigger "If Biso does not control HR" → quantified: "after maximal-tolerated Biso (target 10 mg) or BB cannot be uptitrated (SBP < 100, intolerance)"; Step 4 Branch A sub → add "and HR > 60"; §3 → "max-tolerated combination" (not literal 10 mg) so frail patients aren't stranded.

### Flow 06 — Not septic / on Verap / HR controlled
- **⚠ No HFrEF check.** Verap CI'd in HFrEF — not asked.
- **Missing:** Verap-Digox interaction reminder (even if Digox not currently prescribed — defensive); confirm indication (Verap may be for HTN/SVT not AF); ask about constipation/oedema/bradycardia; PR-interval / conduction caveat.
- **Amend:** Item 5 → "Continue Verapamil at current dose — provided no HFrEF and no concurrent β-blocker. No uptitration. If Digox co-prescribed, recheck level."

### Flow 07 — Not septic / on Verap / HR > 110
- **⚠⚠ §3 templating bug** — currently demands "Bisoprolol 10 mg OD" as the re-referral ceiling, directly contradicting the Step 4 warning bar and Step 5 item ("Do not combine with Bisoprolol"). Clinically dangerous.
- **Missing:** Verap renal/hepatic dose caveats; PR-interval / bradycardia check pre-uptitration; HFrEF gate on Step 4 Branch A (currently only SBP > 100); Verap-Digox interaction (raises Digox 50–75 %); constipation/neg-inotropy listed in Branch B intolerance criteria.
- **Amend:** warning bar wording stronger: "Do NOT add Bisoprolol. BB + Verap → severe brady / AV block / asystole. If BB genuinely needed, stop Verap first, wait ≥ 24–48 h."; Branch A → add LVEF ≥ 40 %, PR < 200 ms, HR ≥ 60 to the gate; Branch B → add "Verap raises Digox levels — start maintenance 62.5 mcg OD (or alternate days if eGFR < 50), check pre-dose level at 5–7 days."

### Flow 08 — Not septic / on Digox / HR controlled
- **⚠ Digox level target wrong** ("< 2 ng/mL" → should be 0.8 – 2.0; 1.0 – 1.5 in HFrEF); **⚠ renal trigger too vague** (specify eGFR < 60).
- **Missing:** Digox monotherapy is inadequate for *exertional* rate control (NG196 §1.5 — works at rest via vagal tone, poor on exertion); ESC 2024 neutral/negative mortality signal — prompt outpatient review of ongoing need; interaction sweep (amiodarone, verap, macrolides, spironolactone, NSAIDs); toxicity safety-net (nausea, xanthopsia, bradycardia, confusion).
- **Amend:** Item 5 body → "Resting HR controlled — confirm exertional HR also controlled (24-h tape) before accepting monotherapy long-term, particularly if ambulant."

### Flow 09 — Not septic / on Digox / HR > 110
- **⚠ Unsafe assumption** — Step 4 intro says "Already loaded over 24 hours" but the wizard cannot know whether Digox is a recent inpatient load or chronic GP maintenance, or whether a level has been checked.
- **Missing:** Digox optimisation before adding a second agent (fully loaded? steady-state? level checked? K⁺/Mg²⁺ optimised?); explicit escalation pathway beyond §3 (IV amiodarone, DCCV, ablation referral — name them so the SHO knows what they're escalating *for*).
- **Amend:** Step 4 intro → "Confirm Digox status before adding a second agent — (a) mid-load → give the second 500 mcg if HR > 110 at 6 h before escalating; (b) chronic maintenance → check pre-dose level, if < 2 and renal adequate, uptitrate Digox first; (c) fully loaded + max maintenance → add BB/CCB."; Item 5 → "Add Biso 2.5 mg, titrate as BP/HR tolerate, most inpatients leave on 2.5–5 mg; GP to continue uptitration."

### Flow 10 — Septic / no agent / HR controlled
- **⚠ Plan is dangerously passive in a septic patient** — controlled rate is a snapshot, not a trajectory. The "sepsis" flag is currently invisible in §1 item 5 (reads identical to Flow 02).
- **Missing:** explicit reassess trigger (sepsis-driven AF often deteriorates — reassess HR, BP, lactate, mental state hourly); Sepsis Six / source-control prompt (cultures before Abx, antibiotics within 1 h, IV fluids 30 mL/kg if hypoperfused, urine output); NEWS2 ≥ 5 escalation threshold; pre-emptive guidance on agent choice if HR climbs ("Digox preferred").
- **Amend:** Item 5 → "No rate-control at this time — HR currently controlled but **sepsis is the driver**. Reassess after fluids/source control; if HR climbs > 110 start Digox first (no BP drop). Do NOT start BB/CCB pre-emptively while septic."; Item 4 "self-cardiovert" wording → "resolves the tachyarrhythmia without rate-control escalation".
- **Remove / gate:** §2 outpatient items premature while inpatient septic — gate "once sepsis resolved and discharge-ready".

### Flow 11 — Septic / no agent / HR > 110
- **⚠ Single biggest gap** — rate of 110 in sepsis may be **appropriate compensatory tachycardia**, not pathological AF rate. Plan jumps to rate-control without telling clinician to ask the prior question. Rate suppression in an under-resuscitated septic patient can precipitate shock.
- **Missing:** "confirm AF (not sinus tachy) is driving decompensation, and that fluid resus / cultures / antibiotics are already running, before any rate control"; haemodynamic safety net (SBP threshold to withhold Digox, lactate/MAP guidance, stop if SBP falls); IV amiodarone as the rescue option (oral Digox onset is 1–2 h, slow for genuinely unstable patient — AEC suitability itself questionable).
- **Amend:** intro line "Start with Digox — it doesn't drop BP" → "Treat the driver first — fluids, cultures, antibiotics, source control. Only rate-control if AF (not sinus tachy) is driving decompensation. Digox BP-neutral but slow (onset 1–2 h); discuss critical care if urgent rate control needed."; Item 6 → "Reduce loading dose by ~50 % in eGFR < 30, elderly, low weight."; §3 trigger → "Escalate to cardiology / critical care early if HR > 110 persists after fluid resus and 6 h post-load — do not wait for full BB uptitration."

### Flow 12 — Septic / on Biso / HR controlled
- **⚠ Riskiest "controlled" cell.** Septic patient already β-blocked has lost tachycardic compensatory reserve. Biso t½ 10–12 h → cannot rapidly reverse if SBP drops.
- **Missing:** SBP/MAP threshold for holding Biso (single highest-yield addition); monitoring cadence (minimum 4-hourly obs); reassess after each dose; lactate / end-organ trigger; Digox as a rescue option if Biso has to be held.
- **Amend:** Item 5 → "Continue Biso current dose — but **hold next dose if SBP < 100, MAP < 65, lactate rising, or NEWS2 ≥ 5**. BB blunts tachycardic response to evolving sepsis; pre-empt rather than react. Reassess at each drug round."; soft amber callout: "Sepsis + BB — monitor BP closely."

### Flow 13 — Septic / on Biso / HR > 110
- **⚠ Plan silent on whether to hold / reduce the BB.** Septic + tachycardic + β-blocked is the textbook "BB-masked sepsis" presentation — tachycardia may be the only compensatory response left.
- **Missing:** explicit "review Biso — hold next dose if SBP < 100 / lactate elevated / hypoperfusion; halve if borderline; do not uptitrate"; bradycardia hold trigger post-Digox (additive AV node blockade); K⁺/Mg²⁺/renal pre-Digox cross-reference; IV amiodarone discussion with cardiology before §3.
- **Amend:** Item 7 "uptitrate only if SBP > 100" → "only once sepsis controlled (source treated, lactate down, no fluid/pressor need) AND SBP > 100. Until then, do not uptitrate — actively consider dose reduction."; Step 4 intro "Uptitration of Biso is a second-line option" → "…and only once sepsis is controlled."

### Flow 14 — Septic / on Verap / HR controlled
- **⚠⚠ Highest-risk "controlled" combination in the wizard.** Verap = negative inotrope + vasodilator. In evolving distributive shock with reduced preload, "controlled now" can flip to hypotension / pulmonary oedema / low-output within hours.
- **Missing:** "hold/withhold Verap if SBP < 100 or lactate rising" (single most important addition); haemodynamic monitoring directive (continuous cardiac monitoring, hourly BP, daily ECG for PR prolongation/AV block); pre-empt that second agent if needed = Digox not Biso; "reassess agent choice once sepsis resolves" (Verap may not be right long-term).
- **Amend:** Item 5 → "Continue Verap current dose **while monitoring closely** — HR controlled, but Verap's neg inotropy + vasodilation can unmask shock as sepsis evolves. Do not uptitrate. **Hold and discuss cardiology if SBP < 100, MAP < 65, lactate rising, or pulmonary congestion.**"; promote sepsis warning above item 5 (symmetry with Flows 13 / 15).

### Flow 15 — Septic / on Verap / HR > 110
- **⚠ No instruction to STOP / HOLD Verap in sepsis.** Verap is neg-inotrope + vasodilator — in distributive shock can precipitate collapse, unmask occult HF.
- **Missing:** echo / LV function caveat (Verap CI'd in HFrEF; in undiagnosed HFrEF + sepsis = dangerous); Verap-Digox PK interaction (50–75 % rise) — loading Digox **on top of** Verap without dose adjustment risks toxicity. Start maintenance 62.5 mcg OD; check level earlier (48–72 h).
- **Amend:** Item 7 "Uptitrate current agent only if SBP > 100" → "Do NOT uptitrate Verap routinely in sepsis. Only consider 80 mg TDS if SBP > 110, lactate normalising, no HF signs, and Digox alone has failed at 24 h. Stop and revert if BP drops."; Step 4 Branch B sub "stable" → "haemodynamically improving" (stricter); §3 (Bisoprolol-named) — wrong for this flow.

### Flow 16 — Septic / on Digox / HR controlled
- **⚠ Sepsis + maintenance Digox = AKI risk = toxicity risk.** Current wording ("check level if renal impaired") is passive — wrong directionality for a deteriorating septic patient.
- **Missing:** daily U&Es while septic (active, not conditional); drug interactions (amiodarone, macrolides, spironolactone); K⁺/Mg²⁺ → Digox toxicity link in item 5; toxicity recognition cues; timing of level (pre-dose, ≥ 6 h post-dose).
- **Amend:** Item 5 → "Continue Digox current maintenance dose. HR controlled — no additional agent. **Sepsis risks AKI → Digox accumulation + toxicity (narrow window).** Monitor U&Es daily while septic. If creatinine rises or urine output drops — hold next dose, send pre-dose level (target < 2; ideally 0.5–0.9 in AF), review dose. Watch for toxicity: nausea, visual disturbance, bradyarrhythmia, AV block."

### Flow 17 — Septic / on Digox / HR > 110
- **⚠ Refractory rate in septic Digox patient = check for toxicity first.** Sepsis routinely causes AKI; Digox is 60–80 % renally cleared; K⁺/Mg²⁺ derangement potentiates toxicity. Refractory tachycardia in this phenotype can itself be a sign of toxicity (paradoxical SVT/AT with block).
- **Missing:** mandatory U&Es + pre-dose level **before** uptitrating, with hold criteria (AKI, K⁺ < 4.0, toxicity symptoms); DigiFab for life-threatening toxicity; rhythm reconsideration / Surviving Sepsis 2021 → amiodarone or DCCV rather than rate-limiting agents in septic shock; Step 4 Branch B currently allows Verap — **drop Verap entirely** in this branch or strictly qualify (LV function known + off vasopressors).
- **Amend:** §1 item 5 → "BB *and* CCBs are negatively inotropic; both can precipitate cardiovascular collapse in septic shock."; §3 → "Urgent re-referral / ITU discussion if HR > 110 despite optimised Digox and sepsis source control — do not delay for BB titration."; suppress footnote about cardioversion-non-candidates in septic flows (irrelevant to acute issue).

### Flow 18 — Not septic / on Biso + Digox / HR controlled
- **Missing (most important):** no prompt to review whether combination is still needed. Two AV-nodal agents in a controlled patient → consider stepping down. Wean Digox first in active patients; wean BB first if bradycardia / hypotension / fatigue.
- **Missing:** Digox toxicity safety-net (current "< 2" too loose — DIG post-hoc + ESC 2024 favour < 1.2 in chronic AF); bradycardia/BP check on combo before discharge.
- **Amend:** Item 5 "no uptitration required" → "no uptitration required, **and consider down-titration at outpatient review**."; §2 GP item → "uptitrate if HR rises **or wean one agent if stably controlled**".

### Flow 19 — Not septic / on Biso + Digox / HR > 110
- **⚠ Digox level should be CHECKED, not "if renal".** Refractory HR on loaded Digox is the classic setting for a level check **regardless** of renal function — drug interactions / volume / electrolytes all push levels independently of creatinine. Target 1.0 – 2.0; toxicity overlaps from 1.5.
- **⚠ Biso 10 mg = BNF licensed HF max, not AF rate-control routine ceiling.** Reassess after 24–48 h at each step.
- **Missing:** echo status (refractory rate on combo suggests possible structural driver — inpatient TTE); reversible-driver recheck before maxing out (TFTs back, K⁺/Mg²⁺ replete, no occult sepsis, no PE, no pain/anxiety/anaemia — single highest-yield addition); rhythm-control alternative (DCCV if < 48 h or anticoagulated ≥ 3 weeks; ablation pathway); drug-interaction sweep.
- **Amend:** intro "Maximise each before re-referral" → "Re-check drivers (TFTs, K⁺/Mg²⁺, sepsis, level) before maximising — then reassess at each step."; Item 6 → lead with "Check level first" rather than conditional.

### Flow 20 — Not septic / on Verap + Digox / HR controlled
- **⚠⚠ Verap-Digox interaction not flagged.** Single biggest gap. Verap inhibits P-gp → Digox up 50–75 % within a week. Classic exam-question toxicity setup. Currently inherits Biso+Digox boilerplate which is **not clinically symmetrical**.
- **Missing:** Digox maintenance dose reduction guidance (if Digox started **before** Verap was added, anticipate accumulation — 30–50 % reduction, recheck level); renal function / U&E recheck (Digox renally cleared, eGFR drift drives toxicity); bradycardia / AV-block safety-net counsel ("report dizziness, syncope, pulse < 50"); Verap + occult LV dysfunction (echo in §2 too late — flag for swap if EF later < 40 %).
- **Amend:** Item 5 → "Continue at current doses. HR controlled on combination — no uptitration required, **and consider whether combination is still needed**. **Drug interaction: Verap raises Digox levels ~50–75 % (P-gp inhibition).** Check pre-dose Digox level at 7 days. Aim < 2 ng/mL; if elderly/CKD aim 0.5–0.9 ng/mL."

### Flow 21 — Not septic / on Verap + Digox / HR > 110
- **⚠⚠ Same as Flow 20 plus**: uptitrating **both** simultaneously to maximum doses **without acknowledging the interaction** risks frank Digox toxicity. Flow 21 currently reads almost identically to Flow 19 (Biso + Digox), which is wrong: Biso + Digox is PK-independent; Verap + Digox is not.
- **Missing:** `.esc-warn` bar in Step 4 (analogous to the Biso+Verap mutex warnings); mandated Digox level check **before uptitrating either drug** in §1; target lowered to **< 1.5 ng/mL** for combo; §3 re-referral text — currently inherits Biso-named constant (templating bug).
- **Amend:** Item 6 → "Uptitrate Digox cautiously — Verap raises Digox levels (BNF; P-gp). Check baseline pre-dose level **before** any increase, target **< 1.5 ng/mL**, recheck 5–7 d after each dose change **regardless of renal function**."; Step 4 intro → "Both agents on board — but Verap significantly raises Digox levels. Check a level first; maximise cautiously."

### Flow 22 — Septic / on Biso + Digox / HR controlled
- **⚠ No haemodynamic safety net** for the BB-in-sepsis combo. Normotensive septic patient on Biso + Digox can drop suddenly (vasodilation + neg inotropy + AV-node blockade).
- **⚠ Digox level / renal check should be active, not conditional.** Sepsis-AKI is the rule, not the exception.
- **Missing:** lactate / MAP escalation cue specific to this combo ("reassess hourly while septic" — generic 2222 too late); explicit "BB hold trigger" — SBP < 100, HR < 60, lactate rising.
- **Amend:** Item 5 → "Continue Biso + Digox at current doses, **with caution**." + hold criteria block. The meta-note ("sepsis flag honoured implicitly via §1 item 4") is **insufficient for the combo** — explicit handling needed.

### Flow 23 — Septic / on Biso + Digox / HR > 110
- **⚠⚠ Plan never asks "is the Biso actively harming this patient *right now*?"** Refractory tachycardia in sepsis on a BB is the classic signature of catecholamine-driven compensatory tachycardia that the BB is blunting from the wrong side. Pushing Biso harder before sepsis is controlled is the wrong direction.
- **Missing:** "consider holding/halving Biso" branch — currently the flow only offers "continue" or "uptitrate", no de-escalation path; mandatory Digox level + renal function check before uptitrating beyond current maintenance (sepsis-AKI dynamic risk); IV amiodarone bridge (ESC 2024 IIa in critically ill); K⁺/Mg²⁺ re-check tied to Digox; lactate / source-control re-emphasis (refractory HR in sepsis = inadequate source control until proven otherwise).
- **Amend:** Item 7 "uptitrate only if SBP > 100" → "Do not uptitrate Biso while sepsis is active. **Consider holding or halving** the current dose if SBP < 110, MAP < 65, lactate rising, or AKI developing. Only consider uptitration once fluid-replete, off vasopressors, lactate clearing."; Step 4 intro "stable" → quote criteria (SBP, MAP, lactate, vasopressor-free); §3 trigger should also fire if BB held for haemodynamic reasons and Digox alone insufficient.

### Flow 24 — Septic / on Verap + Digox / HR controlled
- **⚠⚠ Flow 24 currently mirrors Flow 20 verbatim and inherits no sepsis-specific safety language at all.** Verap is materially more dangerous than Biso in sepsis (negative inotropy + vasodilation), plus the PK interaction with Digox, plus AKI risk.
- **Missing:** instruction to consider pausing/holding Verap while septic; mandatory Digox level (not conditional on renal); U&E / renal function trigger ("daily U&Es; if creatinine rises ≥ 26 µmol/L or by 50 %, hold Digox and recheck level"); echo / EF caveat (Verap CI'd in HFrEF); bradycardia/AV-block monitoring (telemetry / repeat ECG).
- **Amend:** Item 5 → "Continue Verap + Digox **with caution** — sepsis flagged. Verap is negatively inotropic + vasodilatory; if SBP < 100, lactate rising, or evolving AKI, **hold Verap and switch rate control to Digox alone**. Re-check Digox level (target pre-dose < 2 ng/mL) — Verap raises Digox by ~50–75 %, AKI compounds toxicity."

### Flow 25 — Septic / on Verap + Digox / HR > 110
- **⚠⚠ The most clinically dangerous flow in the wizard.** Three converging hazards, none currently addressed:
  1. Verap + Digox PK interaction → Digox levels rise 50–75 %.
  2. Verap negative inotropy + vasodilation in sepsis → hypotensive trap.
  3. Sepsis-AKI → further Digox accumulation → toxicity.
- Flow 25 currently is largely copy-pasted from Flow 23 (Biso + Digox).
- **Missing:** "consider pausing/holding Verap while septic" — Step 4 currently invites uptitration "once stable", with "stable" undefined; **mandatory Digox level before any uptitration** (target < 2, ideally 0.5–0.9; per RATE-AF / DIG); daily U&Es + level if creatinine rising ≥ 26 µmol/L or 50 %; echo / EF caveat; bradycardia / AV-block monitoring; §3 currently inherits the Biso-named constant (templating bug).
- **Amend:** Item 7 → "**Do NOT uptitrate Verap while septic.** Consider holding entirely if SBP < 110, AKI, or any HF suspicion. Only resume/uptitrate once sepsis resolved, SBP > 100 sustained, LV function known."; Item 6 → "Check Digox level before any uptitration — Verap raises Digox 50–75 % (BNF)."; Step 4 intro → "Digox remains preferred but level will be elevated by concurrent Verap — check a level. Verap should generally be held, not uptitrated, while septic."

---

## C. Suggested order of attack

If sequencing the fixes:

1. **Templating bug — §3 re-referral wording** (A2). Cheap fix, immediate safety impact. Affects Flows 07, 15, 21, 23, 25.
2. **Flow 01 ordering** (Flow 01). Single most acute clinical danger — 2222 must be item 1.
3. **Digoxin level target / gating** (A1). Touches half the flows.
4. **Verap + Digox interaction warning** (A4). New `.esc-warn` bar + revised maintenance dose + lowered target.
5. **Sepsis safety net on "controlled" flows** (A5). Hold-criteria block. Especially loud on Verap+Sepsis.
6. **Current Biso/Verap dose captured in Step 3** (A3). Bigger refactor — adds a UI element. Defer until clinician sign-off.
7. Everything else as you walk the per-flow list.
