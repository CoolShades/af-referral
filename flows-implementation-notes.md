# Pre-critique implementation notes

Tracks what was applied to `index-sym.html` based on the 25-agent pre-critique (`flows-pre-critique.md`), and what was deferred for clinician sign-off.

## Applied

### Flow 01 — Acute exclusion (terminal)
- **Reordered items.** `2222 peri-arrest call` is now item 1 (was item 3).
- **Added** IV Amiodarone pathway (300 mg over 10–20 min, then 900 mg / 24 h via large-bore or central access).
- **Added** anaesthetics for DCCV sedation.
- **Added** pre-DCCV bundle: IV access × 2, continuous cardiac monitoring, 12-lead ECG, pads on, bloods (troponin, K, Mg, TFTs, lactate, FBC, U&Es, clotting), LMWH/heparin peri-cardioversion.
- **Added** "identify which adverse feature fired" with specific routes (BP < 100/60 → fluids/vasopressor; HR < 60 → atropine/pacing not DCCV; ECG ischaemia → cath-lab; HF → CCU/HDU; LOC → resus).
- Eyebrow updated to "Peri-arrest AF · ALS pathway".

### §3 re-referral templating
- **Fixed:** `referralCeiling` now substitutes per agent. Verapamil flows no longer demand "max Bisoprolol 10 mg OD". Combo flows name both agents. Includes a "Do not add Bisoprolol — contraindicated with Verapamil" note for Verap flows.
- Added "Cardiology may consider IV amiodarone, rhythm control or DCCV" — names the escalation options for the receiving cardiology reg.

### §1 item 4 — conditional on sepsis flag
- **Fixed:** When sepsis ticked, this item becomes an active Sepsis Six management line (cultures before antibiotics, antibiotics within 1 h, IV fluids, source control, NEWS2 4-hourly).
- When sepsis NOT ticked, this item becomes a reassessment safety-net ("reassess for occult sepsis or hypovolemia if patient deteriorates") rather than a leak from the septic-flow template.

### §2 GP advice — conditional on state
- **Fixed:** No agent + not refractory → "GP review within 1–2 weeks for rhythm reassessment and to start rate-control if HR rises". On combo + not refractory → "review whether dual rate-control is still required — consider stepping down". Other cases keep the standard "to uptitrate" wording.

### Digoxin level language (universal)
- **Replaced** "< 2 ng/mL if renal impaired" everywhere with:
  > Pre-dose level (≥ 6 h post-dose): target **0.8 – 2.0 ng/mL**; in AF aim **0.5 – 0.9 ng/mL** (DIG post-hoc / ESC 2024). Hold if > 2.0 or features of toxicity (nausea, visual halos, confusion, new bradyarrhythmia, AV block).
- Applied in `digoxinRecipe` (Step 4) and the reusable `DIGOXIN_LEVEL_TEXT` fragment used across `agentMedicationItems()`.

### Digoxin loading (body-weight / age / renal adjusted)
- **Added** to the loading recipe: *"Reduce to 250 + 250 mcg if elderly, frail, weight < 60 kg, or eGFR < 30."*

### BNF step-up wording for Bisoprolol
- **Replaced** "Uptitrate to 5 mg, then 10 mg OD" with the BNF step-up ladder (1.25 → 2.5 → 3.75 → 5 → 7.5 → 10 mg OD), with "reassess after 12–24 h before each step" and "if already at 10 mg OD, escalate to Digoxin loading".

### β-blocker contraindications enumerated
- **Added** the BB CI list (asthma / severe COPD, 2°/3° AV block, sick sinus, decompensated HF, severe PVD, untreated phaeochromocytoma) — reusable text fragment used wherever "if no β-blocker contraindication" appears.

### Verapamil + Digoxin PK interaction warning
- **Added** a new `.esc-warn` bar in Step 4 combo branches when the patient is on Verap+Digox (analogous to the existing Biso+Verap mutex warning bar):
  > **Verapamil raises Digoxin levels ~50–75 %** (BNF severe P-gp interaction). Check pre-dose level before any uptitration regardless of renal function; target combo trough < 1.5 ng/mL.
- **Added** to the Step 5 plan items for all Verap+Digox flows: mandatory pre-dose level, dose-reduction note if Digox was started before Verap.
- Maintenance dose reduced to 62.5 mcg OD (or alternate days if eGFR < 50) and level recheck at 5–7 d when adding Digox to existing Verap.

### Verapamil HFrEF caveat
- **Added** "Verapamil contraindicated in LVEF < 40 % — request inpatient TTE if echo unavailable" to all Verap branches (single Verap; combo Verap+Digox; both septic and non-septic).
- Step 4 gating extended: SBP > 100, LVEF ≥ 40 %, PR < 200 ms, HR ≥ 60.

### Sepsis hold criteria for BB/CCB
- **Added** explicit hold criteria for all septic flows:
  - **BB:** Hold next dose if SBP < 100, MAP < 65, lactate rising, NEWS2 ≥ 5. Reassess at each drug round.
  - **CCB (Verap):** Hold and discuss cardiology if SBP < 100, MAP < 65, lactate rising, AKI developing, or pulmonary congestion. Switch rate-control to Digoxin alone if Verap held.
- Septic + refractory + BB: explicit "**Do not uptitrate while sepsis is active — consider holding or halving**" branch (was previously permissive "uptitrate if SBP > 100").
- Septic + refractory + Verap: explicit "**Do NOT routinely uptitrate Verapamil in sepsis**".

### Toxicity recognition cues for Digoxin
- **Added** "nausea, visual halos, confusion, new bradyarrhythmia, AV block" wherever Digoxin maintenance is discussed. DigiFab mentioned for life-threatening toxicity in septic + Digox refractory flows.

### K⁺/Mg²⁺ cross-link to Digoxin toxicity
- **Added** "Hypokalaemia potentiates digoxin toxicity" / "Hypomagnesaemia also potentiates digoxin toxicity" to the K⁺ and Mg²⁺ §1 items.

### Symptom check / NICE NG196 lenient-vs-strict prompt
- **Added** to single-Biso controlled flows: *"NICE NG196 endorses lenient (< 110) only if asymptomatic AND preserved LVEF; if symptomatic or HFrEF, target stricter rate or earlier cardiology input."*

### Exertional rate prompt for Digox monotherapy
- **Added** to single-Digox controlled flow: *"Confirm exertional HR also controlled (24-h tape) before accepting monotherapy long-term, particularly if ambulant — Digoxin works via vagal tone, poor on exertion (NG196 §1.5)."*

### Wean-review prompt for combo controlled flows
- **Added** to Flows 18 / 20: *"Review whether combination is still required — consider stepping down to monotherapy if rate has been stably controlled. Wean Digoxin first in active patients; wean BB/CCB first if bradycardia, hypotension or fatigue."*

### Amiodarone bridge mentioned for refractory + septic
- **Added** to refractory + septic + Digox flow and the §3 referral text: *"Cardiology / critical care may consider IV amiodarone if rate uncontrolled and patient deteriorating despite Digoxin — escalate early; do not delay for BB/CCB titration."*

### Outpatient echo / 24-h tape body text strengthened
- Echo body now notes: *"rule out HFrEF; particularly relevant if patient is on a non-DHP CCB."*
- 24-h tape body now notes: *"confirms exertional rate control (important if patient is on Digoxin monotherapy)."*

### Step 4 single Digox (non-septic, refractory) intro
- **Fixed** the dangerous "Already loaded over 24 hours" assumption → "Confirm Digoxin status first — mid-load / chronic maintenance / fully loaded. Optimise Digoxin before adding a second agent."

### Biso+Verap warning text strengthened
- **Updated** the warn bar: *"Do not add Bisoprolol — combination with Verapamil contraindicated (β-blocker + non-DHP CCB → severe bradycardia / AV block / asystole)."*

---

## Deferred — needs UI change or local-protocol sign-off

### Step 3 dose-tier capture
- The current code can't tell whether a patient is on Bisoprolol 1.25 mg or 10 mg, or whether they're on Verapamil 40 mg TDS or MR 240 mg OD. Plan copy now uses BNF step-up wording so a clinician scanning the plan won't blindly jump from 1.25 → 10 — but a proper fix needs a dose dropdown in Step 3 under each agent card.
- **Why deferred:** UI change, ~30–45 min of work, no clinical-safety urgency now that the step-up wording is in place.

### Symptom checkbox in Step 3
- For NG196 lenient-vs-strict target HR. Currently the plan mentions the symptom dependency in body text rather than gating logic.
- **Why deferred:** UI change. Would require a new state field and conditional rendering.

### AF onset / duration in Step 2
- < 48 h vs ≥ 48 h matters for downstream cardioversion candidacy.
- **Why deferred:** UI change, clinical-flow question — affects §2 wording rather than acute plan.

### NEWS2 escalation banner
- "Call 2222 if deteriorates" is the current escalation. NEWS2 ≥ 5 / rising-by-2 is the RCP standard mid-trigger. Mentioned in the new §1 item 4 sepsis body but not as a standalone escalation line.
- **Why deferred:** Wording / placement choice for the clinician.

### "Treat sepsis or hypovolemia" reassessment block in §2 when discharge
- §2 "Outpatient follow-up" items currently fire regardless of sepsis-resolution status.
- **Why deferred:** Could gate the §2 block on "sepsis resolved / discharge-ready" — but that's a state the wizard doesn't currently capture.

### IV amiodarone in Step 4 escalation for septic + refractory single-Digox
- Currently named in plan §1 body and in §3 re-referral text. Not added as an explicit Step 4 branch.
- **Why deferred:** Would crowd Step 4 visual layout. Plan content covers it.

### Specific local-protocol values
- Numeric thresholds (SBP 100 vs 110, MAP 65, NEWS2 5) chosen as defensible defaults per NICE NG109 / Surviving Sepsis 2021. Your local AEC protocol may want different values.

---

## Pre-critique items consciously NOT applied
- **"AF onset < 48 h vs ≥ 48 h" Step 2 prompt** — would need a UI element.
- **PE / alcohol / surgery in §1 reversible precipitant search** — over-broad for the AEC pathway; the existing TFT/K/Mg/sepsis sweep is the trust convention.
- **Discharge safety-net wording in §2** — too patient-facing for a clerk-note tool; should live in the patient discharge letter, not the clerk plan.
- **ECG ruling out WPW before adding Digox** — captured implicitly by "If Bisoprolol does not control HR — load Digoxin" pathway; WPW + AF is a separate non-AEC cardiology problem.

---

## Files touched
- `/Users/coolshades/Documents/Code/af-referral/index-sym.html` — `buildPlan()`, `agentMedicationItems()` (with reusable text fragments declared above it), `renderSuggestion()`, `digoxinRecipe` template.
- `/Users/coolshades/Documents/Code/af-referral/wizard-flows.md` — banner added at top noting content is now driven by updated code; per-flow item descriptions remain as a *previous-state* reference.

## How to verify
Open `index-sym.html` and walk each flow:
1. Hero → "Rate control".
2. **Flow 01:** Click *Yes — at least one* on Step 1. Confirm the plan now leads with "Call 2222" and includes the IV amiodarone pathway + pre-DCCV bundle.
3. **Flows 02 / 18 / 20** (no agent or combo + not refractory): confirm the GP advice item is state-appropriate (no "uptitrate a drug they're not on" leak; combo flows get "review whether combination is still required").
4. **Flows 07 / 15 / 21 / 25** (Verapamil flows + refractory): confirm §3 re-referral text now names Verapamil, not Bisoprolol. Confirm the new `.esc-warn` Verap+Digox interaction bar appears on Flows 21 / 25.
5. **Any septic flow** (Flows 10–17, 22–25): confirm the sepsis-conditional §1 item 4 wording fires, and the BB/CCB hold criteria are visible in the agent-specific items.
6. **Any flow** with Digoxin: confirm the level target reads "0.8 – 2.0 ng/mL; AF aim 0.5 – 0.9" everywhere (Step 4 recipe sub-bullet + plan items).
7. Click *Copy* on the plan card — confirm `planAsText()` reflects the new wording.
