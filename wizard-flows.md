# AF Rate-Control Wizard — All Flows Audit

> ⚠ **Status note:** The Step 4 / Step 5 plan content was rewritten on the basis of the parallel-agent pre-critique (`flows-pre-critique.md`). Per-flow item lists below describe the **previous** wording; the live app now generates **expanded, clinically-tightened content** — digoxin level targets corrected (0.8 – 2.0 ng/mL; AF aim 0.5 – 0.9), Verap+Digox PK interaction warning bar added, BNF step-up wording for Bisoprolol, sepsis hold criteria for BB/CCB, HFrEF caveats for Verapamil, agent-aware §3 re-referral ceiling, conditional sepsis item, conditional GP advice, ALS-aligned Flow 01. Use this document as a flow-state reference (which scenario is which Flow #); read the **live app** for the current plan text.

This document enumerates every possible flow through the rate-control wizard (Chapter I), with the verbatim Step 4 escalation content (where applicable) and Step 5 plan text that gets generated.

## State model

The wizard's state has four variables that determine the plan:

| State | Set in | Values |
|---|---|---|
| `acute` | Step 1 (Yes / No exclusion buttons) | `true` / `false` |
| `septic` | Step 2 (sepsis checkbox) | `true` / `false` |
| `agents` | Step 3 (Bisoprolol / Verapamil / Digoxin cards — **multi-select**; click again to deselect; Biso + Verap mutually exclusive) | boolean map; valid combinations: `{}`, `{biso}`, `{verap}`, `{digox}`, `{biso,digox}`, `{verap,digox}` |
| `refractory` | Step 3 (HR > 110 checkbox) | `true` / `false` |

If `acute = true` → wizard short-circuits to a terminal "not for AEC" plan; the other state is irrelevant.
If `acute = false` → 2 × 6 × 2 = **24 combinations**, plus the 1 acute path = **25 total flows**. (Bisoprolol + Verapamil is excluded by mutex — contraindicated.)

## Constant content across non-acute flows

Every non-acute plan starts with the same four workup items in §1 and ends with the same anticoagulation + deteriorating-patient items. The middle (agent-related) items vary by `septic` × `agent` × `refractory`.

**§1 head (always):**
1. **Add on TFTs.** Thyroid function — rule out thyrotoxicosis as a precipitant.
2. **Aim K⁺ 4.0 – 4.5 mmol/L.** Replace if below target.
3. **Aim Mg²⁺ > 1.0 mmol/L.** Replace if below target — often coexists with hypokalaemia.
4. **Treat sepsis or hypovolemia if present.** Common precipitants for new AF. Fluid-resuscitate, send cultures, treat the source — fixing the driver often lets the patient self-cardiovert without further rate-control escalation.

**§1 tail (always, after the agent items):**
- **Consider anticoagulation.** Score CHA₂DS₂-VASc and ORBIT (see §II — Anticoagulation below).
- **If the patient deteriorates · Call 2222.** Drop in BP, drop in conscious level, or signs of end-organ compromise — this is a medical emergency. Put out a Medical Emergency Call. Urgent cardiology input required.

**§2 (always, header varies):**
- Header: `Outpatient follow-up · once HR is controlled (< 110)` when refractory, else `Outpatient follow-up`.
- **Outpatient echocardiogram.** Request if a recent one is not available — for structural assessment.
- **Outpatient 24-hour tape.** To quantify rate control and identify paroxysmal patterns.
- **Advise patient to make a GP appointment.** To uptitrate rate-control medication if required.
- **Request outpatient cardiology clinic review.** Send an eCare message to the cardiology secretaries — new-patient referral.

**§3 (only when refractory):**
- Header: `Only if HR remains > 110 despite maximum therapy`
- **Urgent re-referral to cardiology.** Re-refer only if HR remains > 110 despite **maximal Digoxin 250 mcg OD** (after full 500 mcg + 500 mcg loading) **and** **Bisoprolol 10 mg OD** (or as much as tolerable). New referral — patient remains in uncontrolled AF despite maximum oral therapy.

**Footnote (always, non-acute):**
> **Consider ·** If the patient is not a candidate for cardioversion or ablation (frail, cannot undergo GA, permanent AF without rhythm-control benefit) — consider GP follow-up *only* instead of an outpatient cardiology clinic referral.

---

# Flow 01 — Acute exclusion (terminal)

**State:** `acute = true`

**Click path:**
1. Step 1 → click **Yes — at least one** (any of: SBP < 100/60, HR < 60, LOC, ECG ischaemia, decompensated HF)

**Wizard short-circuits straight to Step 5 (plan). Steps 2/3/4 are skipped.**

### Step 5 plan

- **Eyebrow:** `Acute care · Not for AEC`
- **Title:** `Escalate · Do not template`

**§1 · Acute care · Not for AEC**
1. **Patient meets exclusion criteria.** Acutely unwell — not for the AEC pathway. Examples: BP < 100/60, HR < 60, LOC, ECG ischaemia, decompensated HF.
2. **DC cardioversion required.** If haemodynamically compromised — proceed to synchronised DC cardioversion as per ALS protocol.
3. **Escalate immediately.** Discuss with the on-call cardiology registrar. Patient requires monitored bed.

*(No §2, no §3, no footnote.)*

---

# Section A — `acute = false`, `septic = false` (8 flows)

For all flows in this section the user has clicked **No — none present** in Step 1 and has left the sepsis checkbox in Step 2 unticked.

## Flow 02 — Not septic · No current agent · Not refractory

**State:** `acute=false, septic=false, agent=null, refractory=false`

**Click path:**
1. Step 1 → **No — none present**
2. Step 2 → Continue (sepsis checkbox left unticked)
3. Step 3 → don't pick any agent; leave HR>110 checkbox unticked; **Continue**

`refractory=false` → Step 4 is skipped; jumps straight to Step 5.

### Step 5 plan

- **Eyebrow:** `Rate-control plan · AF · AEC pathway`
- **Title:** `Plan — paste into the notes`

**§1 · Acute management · Inpatient**
1. Add on TFTs · *Thyroid function — rule out thyrotoxicosis as a precipitant.*
2. Aim K⁺ 4.0 – 4.5 mmol/L · *Replace if below target.*
3. Aim Mg²⁺ > 1.0 mmol/L · *Replace if below target — often coexists with hypokalaemia.*
4. Treat sepsis or hypovolemia if present · *Common precipitants for new AF. Fluid-resuscitate, send cultures, treat the source — fixing the driver often lets the patient self-cardiovert without further rate-control escalation.*
5. **No rate-control medication required at this time.** *Heart rate is well controlled; the patient is not on (and does not need) any rate-control agent.*
6. Consider anticoagulation · *Score CHA₂DS₂-VASc and ORBIT (see §II — Anticoagulation below).*
7. If the patient deteriorates · Call **2222** · *Drop in BP, drop in conscious level, or signs of end-organ compromise — this is a medical emergency. Put out a Medical Emergency Call. Urgent cardiology input required.*

**§2 · Outpatient follow-up**
8. Outpatient echocardiogram · *Request if a recent one is not available — for structural assessment.*
9. Outpatient 24-hour tape · *To quantify rate control and identify paroxysmal patterns.*
10. Advise patient to make a GP appointment · *To uptitrate rate-control medication if required.*
11. Request outpatient cardiology clinic review · *Send an eCare message to the cardiology secretaries — new-patient referral.*

*(No §3.)*

Footnote (Consider): standard.

---

## Flow 03 — Not septic · No current agent · Refractory

**State:** `acute=false, septic=false, agent=null, refractory=true`

**Click path:**
1. Step 1 → **No — none present**
2. Step 2 → Continue
3. Step 3 → don't pick any agent; tick **HR > 110 despite this**; **Continue**

`refractory=true` → goes to Step 4.

### Step 4 (escalation suggestions)

- **Title:** `Patient is not yet on rate-control.`
- **Intro:** `Per the trust AEC protocol, here's how to start.`

**Branch A — Start Bisoprolol 2.5 mg OD**
- Sub: *— first-line if no β-blocker contraindication and SBP > 100, patient stable*
- Body: Start **Bisoprolol 2.5 mg OD**. Uptitrate to 5 mg, then 10 mg OD if needed and BP tolerates. *If β-blocker contraindicated, start **Verapamil 40 mg TDS** instead — do not combine with bisoprolol.*

**Branch B — Add Digoxin loading**
- Sub: *— if first-line cannot control HR*
- Recipe (`.esc-recipe`):
  1. **Digoxin 500 mcg PO stat**
  2. **Digoxin 500 mcg PO 6 hours later** if HR > 110
  3. Maintenance: **Digoxin 62.5 mcg PO OD**, *uptitratable up to 250 mcg OD* as needed
     - Normal renal function — start directly
     - Impaired renal function — check digoxin pre-dose level **< 2 ng/mL** before maintenance

### Step 5 plan

**§1 · Acute management · Inpatient**
1. Add on TFTs · *…*
2. Aim K⁺ 4.0 – 4.5 mmol/L · *…*
3. Aim Mg²⁺ > 1.0 mmol/L · *…*
4. Treat sepsis or hypovolemia if present · *…*
5. **Start Bisoprolol 2.5 mg OD — first-line per AEC protocol.** *If no β-blocker contraindication and SBP > 100 mmHg. Uptitrate to 5 mg, then 10 mg OD as tolerated. If β-blocker contraindicated, start Verapamil 40 mg TDS (or MR 120 mg OD) instead — do not combine with bisoprolol.*
6. **If first-line cannot control HR — load Digoxin 0.5 mg PO stat and 0.5 mg in 6 hours if HR > 110 at 6 h.** *Maintenance: 62.5 mcg OD initially, uptitratable up to 250 mcg OD as needed and as renal function allows (check pre-dose level < 2 ng/mL first if renal impairment).*
7. Consider anticoagulation · *…*
8. If the patient deteriorates · Call **2222** · *…*

**§2 · Outpatient follow-up · once HR is controlled (< 110)**
9. Outpatient echocardiogram · *…*
10. Outpatient 24-hour tape · *…*
11. Advise patient to make a GP appointment · *…*
12. Request outpatient cardiology clinic review · *…*

**§3 · Only if HR remains > 110 despite maximum therapy**
13. **Urgent re-referral to cardiology.** *Re-refer only if HR remains > 110 despite maximal Digoxin 250 mcg OD (after full 500 mcg + 500 mcg loading) and Bisoprolol 10 mg OD (or as much as tolerable). New referral — patient remains in uncontrolled AF despite maximum oral therapy.*

Footnote: standard.

---

## Flow 04 — Not septic · On Bisoprolol · Not refractory

**State:** `acute=false, septic=false, agent='bisoprolol', refractory=false`

**Click path:**
1. Step 1 → **No — none present**
2. Step 2 → Continue
3. Step 3 → pick **Bisoprolol**; leave HR>110 unticked; **Continue**

`refractory=false` → Step 4 skipped.

### Step 5 plan

**§1 · Acute management · Inpatient**
1. Add on TFTs · *…*
2. Aim K⁺ 4.0 – 4.5 mmol/L · *…*
3. Aim Mg²⁺ > 1.0 mmol/L · *…*
4. Treat sepsis or hypovolemia if present · *…*
5. **Continue Bisoprolol at the current dose.** *HR controlled — no uptitration required.*
6. Consider anticoagulation · *…*
7. If the patient deteriorates · Call **2222** · *…*

**§2 · Outpatient follow-up** (no "once HR controlled" suffix — not refractory)
8–11: standard four outpatient items.

*(No §3.)* Footnote: standard.

---

## Flow 05 — Not septic · On Bisoprolol · Refractory

**State:** `acute=false, septic=false, agent='bisoprolol', refractory=true`

**Click path:**
1. Step 1 → **No — none present**
2. Step 2 → Continue
3. Step 3 → pick **Bisoprolol**; tick **HR > 110**; **Continue**

### Step 4

- **Title:** `Patient is on Bisoprolol.`
- **Intro:** `Two paths. Pick whichever applies, then reassess.`

**Branch A — Uptitrate Bisoprolol**
- Sub: *— if SBP > 100 mmHg and patient remains stable*
- Body: Increase Bisoprolol to **5 mg OD, then 10 mg OD if tolerated**.

**Branch B — Add Digoxin loading**
- Sub: *— if Bisoprolol cannot be uptitrated (low SBP, side effects, intolerance)*
- Recipe: full digoxin loading (500 mcg stat → 500 mcg at 6 h → 62.5 mcg OD maintenance with renal sub-bullets) as in Flow 03 Branch B.

### Step 5 plan

**§1 · Acute management · Inpatient**
1–4: standard workup head.
5. **Increase Bisoprolol up to 10 mg OD if the patient is able to tolerate.** *Step up to 5 mg OD, then 10 mg OD as SBP permits (> 100 mmHg).*
6. **If Bisoprolol does not control HR — load with Digoxin 0.5 mg stat and 0.5 mg in 6 hours if HR > 110 at 6 h.** *Then maintenance Digoxin 62.5 mcg OD initially, uptitrating up to 250 mcg OD as needed and as renal function allows (check pre-dose level < 2 ng/mL first if renal impairment).*
7. Consider anticoagulation · *…*
8. If the patient deteriorates · Call **2222** · *…*

**§2 · Outpatient follow-up · once HR is controlled (< 110)**
9–12: standard four outpatient items.

**§3 · Only if HR remains > 110 despite maximum therapy**
13. Urgent re-referral to cardiology · *as Flow 03.*

Footnote: standard.

---

## Flow 06 — Not septic · On Verapamil · Not refractory

**State:** `acute=false, septic=false, agent='verapamil', refractory=false`

**Click path:**
1. Step 1 → **No — none present**
2. Step 2 → Continue
3. Step 3 → pick **Verapamil**; leave HR>110 unticked; **Continue**

### Step 5 plan

**§1 · Acute management · Inpatient**
1–4: standard workup head.
5. **Continue Verapamil at the current dose.** *HR controlled — no uptitration required.*
6–7: anticoagulation + deteriorate.

**§2:** standard outpatient follow-up. *(No §3.)* Footnote: standard.

---

## Flow 07 — Not septic · On Verapamil · Refractory

**State:** `acute=false, septic=false, agent='verapamil', refractory=true`

**Click path:**
1. Step 1 → **No**
2. Step 2 → Continue
3. Step 3 → pick **Verapamil**; tick **HR > 110**; **Continue**

### Step 4

A warning bar precedes both branches (because verapamil + adding bisoprolol is contraindicated):
> ⚠ **Do not** add Bisoprolol — combination contraindicated.

- **Title:** `Patient is on Verapamil.`
- **Intro:** `Two paths. Pick whichever applies, then reassess.`

**Branch A — Uptitrate Verapamil**
- Sub: *— if SBP > 100 mmHg and patient remains stable*
- Body: Increase Verapamil to **80 mg TDS (or MR 240 mg OD)**.

**Branch B — Add Digoxin loading**
- Sub: *— if Verapamil cannot be uptitrated (low SBP, side effects, intolerance)*
- Recipe: full digoxin loading as in Flow 03.

### Step 5 plan

**§1**
1–4: standard.
5. **Increase Verapamil up to 80 mg TDS (or MR 240 mg OD) if the patient is able to tolerate.** *Provided SBP > 100 mmHg.*
6. **Load with Digoxin 0.5 mg stat and 0.5 mg in 6 hours if HR > 110 at 6 h.** *Then maintenance Digoxin 62.5 mcg OD initially, uptitrating up to 250 mcg OD as needed and as renal function allows (check pre-dose level < 2 ng/mL first if renal impairment). Do not combine Verapamil with Bisoprolol.*
7–8: anticoagulation + deteriorate.

**§2 · Outpatient follow-up · once HR controlled (< 110)** — standard four items.

**§3 · Only if HR remains > 110 despite maximum therapy** — urgent re-referral (as Flow 03).

Footnote: standard.

---

## Flow 08 — Not septic · On Digoxin · Not refractory

**State:** `acute=false, septic=false, agent='digoxin', refractory=false`

**Click path:**
1. Step 1 → **No**
2. Step 2 → Continue
3. Step 3 → pick **Digoxin**; leave HR>110 unticked; **Continue**

### Step 5 plan

**§1**
1–4: standard.
5. **Continue Digoxin maintenance.** *HR controlled — no additional agent required. Check pre-dose level < 2 ng/mL if renal function impaired.*
6–7: anticoagulation + deteriorate.

**§2:** standard. *(No §3.)* Footnote: standard.

---

## Flow 09 — Not septic · On Digoxin · Refractory

**State:** `acute=false, septic=false, agent='digoxin', refractory=true`

**Click path:**
1. Step 1 → **No**
2. Step 2 → Continue
3. Step 3 → pick **Digoxin**; tick **HR > 110**; **Continue**

### Step 4

- **Title:** `Patient is on Digoxin.`
- **Intro:** `Already loaded over 24 hours. Add a second agent — pick whichever applies.`

**Branch A — Start Bisoprolol**
- Sub: *— first choice if no β-blocker contraindication and SBP > 100*
- Body: Start **Bisoprolol 2.5 mg OD**. Uptitrate to 5 mg, then 10 mg OD as BP tolerates.

**Branch B — Start Verapamil**
- Sub: *— alternative if β-blocker contraindicated, SBP > 100*
- Body: Start **Verapamil 40 mg TDS** (or MR 120 mg OD). Uptitrate as tolerated. *Do not combine with bisoprolol.*

### Step 5 plan

**§1**
1–4: standard.
5. **Add Bisoprolol 2.5 mg OD, uptitrating up to 10 mg OD if tolerated.** *First choice if no β-blocker contraindication and SBP > 100. Or, if β-blocker contraindicated, add Verapamil 40 mg TDS (uptitrate as tolerated). Do not combine Bisoprolol with Verapamil.*
6. **Continue Digoxin maintenance — uptitrate up to 250 mcg OD as needed.** *Already loaded with 500 mcg stat + 500 mcg at 6 h. Check pre-dose level < 2 ng/mL if renal function impaired.*
7–8: anticoagulation + deteriorate.

**§2 · Outpatient follow-up · once HR controlled (< 110)** — standard four.

**§3 · Only if HR remains > 110 despite maximum therapy** — urgent re-referral.

Footnote: standard.

---

# Section B — `acute = false`, `septic = true` (8 flows)

For all flows in this section the user has clicked **No — none present** in Step 1 and has **ticked the sepsis checkbox in Step 2**.

## Flow 10 — Septic · No current agent · Not refractory

**State:** `acute=false, septic=true, agent=null, refractory=false`

**Click path:**
1. Step 1 → **No**
2. Step 2 → tick **Is this AF septic/hypovolemia driven?**; Continue
3. Step 3 → don't pick any agent; leave HR>110 unticked; **Continue**

`refractory=false` → Step 4 skipped.

Note: in this combination, `septic=true` does **not** change the agent items — when `refractory=false` and no agent is on board, the plan simply states "no rate-control medication required". The sepsis flag is honoured implicitly by the standing "Treat sepsis or hypovolemia if present" item (always in §1 item 4).

### Step 5 plan

**§1**
1–4: standard workup.
5. **No rate-control medication required at this time.** *Heart rate is well controlled; the patient is not on (and does not need) any rate-control agent.*
6–7: anticoagulation + deteriorate.

**§2:** standard. *(No §3.)* Footnote: standard.

---

## Flow 11 — Septic · No current agent · Refractory

**State:** `acute=false, septic=true, agent=null, refractory=true`

**Click path:**
1. Step 1 → **No**
2. Step 2 → tick **sepsis**; Continue
3. Step 3 → don't pick any agent; tick **HR > 110**; **Continue**

### Step 4

- **Title:** `Patient is not yet on rate-control.`
- **Intro:** **Sepsis/hypovolemia flagged.** Start with Digoxin — it doesn't drop BP.

**Branch A — Start Digoxin loading**
- Sub: *— BB/CCB drop BP in already-hypotensive septic patients*
- Recipe: full digoxin loading as in Flow 03.

**Branch B — Consider adding Bisoprolol**
- Sub: *— once driver is controlled and SBP > 100 mmHg, and patient remains stable*
- Body: Start **Bisoprolol 2.5 mg OD**. Uptitrate to 5 mg, then 10 mg OD as BP tolerates.

### Step 5 plan

**§1**
1–4: standard.
5. **Sepsis/hypovolemia flagged — Digoxin preferred as first agent.** *β-blockers and CCBs further drop BP in already-hypotensive patients. Treat the driver first.*
6. **Start Digoxin loading: 0.5 mg PO stat and 0.5 mg in 6 hours if HR > 110 at 6 h.** *Maintenance: 62.5 mcg OD initially, uptitratable up to 250 mcg OD as needed and as renal function allows (check pre-dose level < 2 ng/mL first if renal impairment).*
7. **Only once sepsis/hypovolemia is controlled and SBP comfortably > 100 mmHg — consider adding Bisoprolol 2.5 mg OD.** *Uptitrate up to 10 mg OD as tolerated.*
8. Consider anticoagulation · *…*
9. If the patient deteriorates · Call **2222** · *…*

**§2 · Outpatient follow-up · once HR controlled (< 110)** — standard four.

**§3 · Only if HR remains > 110 despite maximum therapy** — urgent re-referral.

Footnote: standard.

---

## Flow 12 — Septic · On Bisoprolol · Not refractory

**State:** `acute=false, septic=true, agent='bisoprolol', refractory=false`

**Click path:**
1. Step 1 → **No**
2. Step 2 → tick sepsis; Continue
3. Step 3 → pick **Bisoprolol**; leave HR>110 unticked; **Continue**

### Step 5 plan

**§1**
1–4: standard.
5. **Continue Bisoprolol at the current dose.** *HR controlled — no uptitration required.*
6–7: anticoagulation + deteriorate.

**§2:** standard. *(No §3.)* Footnote: standard.

(`septic=true` does not change the agent item when HR is controlled — sepsis flag is honoured implicitly via §1 item 4.)

---

## Flow 13 — Septic · On Bisoprolol · Refractory

**State:** `acute=false, septic=true, agent='bisoprolol', refractory=true`

**Click path:**
1. Step 1 → **No**
2. Step 2 → tick sepsis; Continue
3. Step 3 → pick **Bisoprolol**; tick **HR > 110**; **Continue**

### Step 4

- **Title:** `Patient is on Bisoprolol.`
- **Intro:** **Sepsis flagged.** Digoxin is preferred — it doesn't drop BP. Uptitration of Bisoprolol is a second line option.

**Branch A — Add Digoxin loading**
- Sub: *— BB/CCB drop BP in already-hypotensive septic patients*
- Recipe: full digoxin loading as in Flow 03.

**Branch B — Uptitrate Bisoprolol**
- Sub: *— only if SBP > 100 mmHg and patient remains stable. Second-line in sepsis.*
- Body: Increase Bisoprolol to **5 mg OD, then 10 mg OD if tolerated** — second-line in sepsis.

### Step 5 plan

**§1**
1–4: standard.
5. **Sepsis flagged — Digoxin preferred.** *β-blockers and CCBs further drop BP in already-hypotensive septic patients. Treat sepsis first; rate often settles once the driver is controlled.*
6. **Load with Digoxin 0.5 mg stat and 0.5 mg in 6 hours if HR > 110 at 6 h.** *Then maintenance Digoxin 62.5 mcg OD initially, uptitrating up to 250 mcg OD as needed and as renal function allows (check pre-dose level < 2 ng/mL first if renal impairment). Preferred over uptitrating Bisoprolol in sepsis.*
7. **Uptitrate current agent only if SBP comfortably > 100 mmHg.** *Second line in sepsis — be cautious of further BP drop.*
8. Consider anticoagulation · *…*
9. If the patient deteriorates · Call **2222** · *…*

**§2 · Outpatient follow-up · once HR controlled (< 110)** — standard four.

**§3 · Only if HR remains > 110 despite maximum therapy** — urgent re-referral.

Footnote: standard.

---

## Flow 14 — Septic · On Verapamil · Not refractory

**State:** `acute=false, septic=true, agent='verapamil', refractory=false`

**Click path:** as Flow 12 but Verapamil.

### Step 5 plan

**§1**
1–4: standard.
5. **Continue Verapamil at the current dose.** *HR controlled — no uptitration required.*
6–7: anticoagulation + deteriorate.

**§2:** standard. *(No §3.)* Footnote: standard.

---

## Flow 15 — Septic · On Verapamil · Refractory

**State:** `acute=false, septic=true, agent='verapamil', refractory=true`

**Click path:** as Flow 13 but Verapamil.

### Step 4

The warning bar precedes both branches:
> ⚠ **Do not** add Bisoprolol — combination contraindicated.

- **Title:** `Patient is on Verapamil.`
- **Intro:** **Sepsis flagged.** Digoxin is preferred — it doesn't drop BP. Uptitration of Verapamil is a second line option.

**Branch A — Add Digoxin loading** — same as Flow 13 Branch A.

**Branch B — Uptitrate Verapamil**
- Sub: *— only if SBP > 100 mmHg and patient remains stable. Second-line in sepsis.*
- Body: Increase Verapamil to **80 mg TDS (or MR 240 mg OD)** — second-line in sepsis.

### Step 5 plan

**§1**
1–4: standard.
5. **Sepsis flagged — Digoxin preferred.** *(same body as Flow 13 item 5.)*
6. **Load with Digoxin 0.5 mg stat and 0.5 mg in 6 hours if HR > 110 at 6 h.** *Then maintenance Digoxin 62.5 mcg OD initially, uptitrating up to 250 mcg OD as needed and as renal function allows (check pre-dose level < 2 ng/mL first if renal impairment). Preferred over uptitrating Verapamil in sepsis.*
7. **Uptitrate current agent only if SBP comfortably > 100 mmHg.** *Second line in sepsis — be cautious of further BP drop.*
8–9: anticoagulation + deteriorate.

**§2 · Outpatient follow-up · once HR controlled (< 110)** — standard four.

**§3 · Only if HR remains > 110 despite maximum therapy** — urgent re-referral.

Footnote: standard.

---

## Flow 16 — Septic · On Digoxin · Not refractory

**State:** `acute=false, septic=true, agent='digoxin', refractory=false`

**Click path:** as Flow 12 but Digoxin.

### Step 5 plan

**§1**
1–4: standard.
5. **Continue Digoxin maintenance.** *HR controlled — no additional agent required. Check pre-dose level < 2 ng/mL if renal function impaired.*
6–7: anticoagulation + deteriorate.

**§2:** standard. *(No §3.)* Footnote: standard.

---

## Flow 17 — Septic · On Digoxin · Refractory

**State:** `acute=false, septic=true, agent='digoxin', refractory=true`

**Click path:** as Flow 13 but Digoxin.

### Step 4

- **Title:** `Patient is on Digoxin.`
- **Intro:** **Sepsis flagged.** Digoxin is the appropriate choice — continue and avoid adding BB/CCB unless BP comfortably allows.

**Branch A — Continue Digoxin — preferred in sepsis**
- Sub: *— treat the sepsis, fluid-resuscitate; rate often settles once driver is controlled*
- Body: Confirm full loading completed and maintenance dose appropriate for renal function. Reassess after sepsis is treated before considering a second agent.

**Branch B — Add a second agent**
- Sub: *— only if SBP > 100 mmHg and patient remains stable. Bisoprolol first, Verapamil if β-blocker contraindicated.*
- Body: Add **Bisoprolol 2.5 mg OD** (uptitrate as tolerated) *or* **Verapamil 40 mg TDS** if β-blocker contraindicated. *Do not combine bisoprolol with verapamil.*

### Step 5 plan

**§1**
1–4: standard.
5. **Sepsis flagged — Digoxin preferred.** *β-blockers and CCBs further drop BP in already-hypotensive septic patients. Treat sepsis first; rate often settles once the driver is controlled.*
6. **Continue Digoxin maintenance — uptitrate up to 250 mcg OD as needed.** *Already loaded — appropriate choice in sepsis. Check pre-dose level < 2 ng/mL if renal function impaired.*
7. **Only add a second agent (BB or CCB) if SBP comfortably > 100 mmHg.** *Reassess after sepsis is treated before adding Bisoprolol or Verapamil. Do not combine the two.*
8–9: anticoagulation + deteriorate.

**§2 · Outpatient follow-up · once HR controlled (< 110)** — standard four.

**§3 · Only if HR remains > 110 despite maximum therapy** — urgent re-referral.

Footnote: standard.

---

# Section C — `acute = false`, combination agents (8 new flows)

Step 3 supports multi-select: a patient on both **Bisoprolol + Digoxin** or **Verapamil + Digoxin** can be modelled now. Bisoprolol + Verapamil is forbidden by mutex (contraindicated). When picking the second agent, the click action persists the prior selection rather than replacing it.

## Flow 18 — Not septic · On Bisoprolol + Digoxin · Not refractory

**State:** `acute=false, septic=false, agents={biso,digox}, refractory=false`

**Click path:**
1. Step 1 → **No — none present**
2. Step 2 → Continue (sepsis unticked)
3. Step 3 → pick **Bisoprolol**, then pick **Digoxin** (both now lit); leave HR > 110 unticked; **Continue**

`refractory=false` → Step 4 skipped.

### Step 5 plan

**§1 · Acute management · Inpatient**
1–4: standard workup head.
5. **Continue Bisoprolol + Digoxin at current doses.** *HR controlled on combination therapy — no uptitration required. Check digoxin pre-dose level < 2 ng/mL if renal function impaired.*
6. Consider anticoagulation · *…*
7. If the patient deteriorates · Call **2222** · *…*

**§2 · Outpatient follow-up** — standard four. *(No §3.)* Footnote: standard.

---

## Flow 19 — Not septic · On Bisoprolol + Digoxin · Refractory

**State:** `acute=false, septic=false, agents={biso,digox}, refractory=true`

**Click path:**
1. Step 1 → **No**
2. Step 2 → Continue
3. Step 3 → pick **Bisoprolol**, then pick **Digoxin**; tick **HR > 110**; **Continue**

### Step 4

- **Title:** `Patient is on Bisoprolol + Digoxin.`
- **Intro:** Both agents on board. Maximise each before re-referral.

**Branch A — Uptitrate Bisoprolol**
- Sub: *— if SBP > 100 mmHg and patient remains stable*
- Body: Increase Bisoprolol to **5 mg OD, then 10 mg OD if tolerated**.

**Branch B — Uptitrate Digoxin maintenance**
- Sub: *— up to 250 mcg OD as needed and renal function allows*
- Body: Confirm full loading completed. Uptitrate up to **250 mcg OD**. Check pre-dose level < 2 ng/mL if renal function impaired.

### Step 5 plan

**§1**
1–4: standard.
5. **Uptitrate Bisoprolol up to 10 mg OD if the patient is able to tolerate.** *Step up to 5 mg OD, then 10 mg OD as SBP permits (> 100 mmHg).*
6. **Uptitrate Digoxin maintenance up to 250 mcg OD as needed.** *Already loaded — uptitrate as renal function allows. Check pre-dose level < 2 ng/mL if renal impairment.*
7. Consider anticoagulation · *…*
8. If the patient deteriorates · Call **2222** · *…*

**§2 · Outpatient follow-up · once HR controlled (< 110)** — standard four.

**§3 · Only if HR remains > 110 despite maximum therapy** — urgent re-referral.

Footnote: standard.

---

## Flow 20 — Not septic · On Verapamil + Digoxin · Not refractory

**State:** `acute=false, septic=false, agents={verap,digox}, refractory=false`

**Click path:**
1. Step 1 → **No**
2. Step 2 → Continue
3. Step 3 → pick **Verapamil**, then pick **Digoxin**; leave HR > 110 unticked; **Continue**

### Step 5 plan

**§1**
1–4: standard.
5. **Continue Verapamil + Digoxin at current doses.** *HR controlled on combination therapy — no uptitration required. Check digoxin pre-dose level < 2 ng/mL if renal function impaired.*
6–7: anticoagulation + deteriorate.

**§2:** standard. *(No §3.)* Footnote: standard.

---

## Flow 21 — Not septic · On Verapamil + Digoxin · Refractory

**State:** `acute=false, septic=false, agents={verap,digox}, refractory=true`

**Click path:**
1. Step 1 → **No**
2. Step 2 → Continue
3. Step 3 → pick **Verapamil**, then pick **Digoxin**; tick **HR > 110**; **Continue**

### Step 4

(No `.esc-warn` warning bar — the patient isn't being asked to add Bisoprolol.)

- **Title:** `Patient is on Verapamil + Digoxin.`
- **Intro:** Both agents on board. Maximise each before re-referral.

**Branch A — Uptitrate Verapamil**
- Sub: *— if SBP > 100 mmHg and patient remains stable*
- Body: Increase Verapamil to **80 mg TDS (or MR 240 mg OD)**.

**Branch B — Uptitrate Digoxin maintenance**
- Sub / body: as Flow 19 Branch B.

### Step 5 plan

**§1**
1–4: standard.
5. **Uptitrate Verapamil up to 80 mg TDS (or MR 240 mg OD) if the patient is able to tolerate.** *Provided SBP > 100 mmHg.*
6. **Uptitrate Digoxin maintenance up to 250 mcg OD as needed.** *Already loaded — uptitrate as renal function allows. Check pre-dose level < 2 ng/mL if renal impairment.*
7–8: anticoagulation + deteriorate.

**§2 · Outpatient follow-up · once HR controlled (< 110)** — standard four.

**§3 · Only if HR remains > 110 despite maximum therapy** — urgent re-referral.

Footnote: standard.

---

## Flow 22 — Septic · On Bisoprolol + Digoxin · Not refractory

**State:** `acute=false, septic=true, agents={biso,digox}, refractory=false`

**Click path:**
1. Step 1 → **No**
2. Step 2 → tick **sepsis**; Continue
3. Step 3 → pick **Bisoprolol**, then pick **Digoxin**; leave HR > 110 unticked; **Continue**

### Step 5 plan

Item 5 is unchanged from Flow 18 because the sepsis flag is honoured implicitly by §1 item 4 ("Treat sepsis or hypovolemia if present"). HR is already controlled — no escalation needed.

**§1**
1–4: standard.
5. **Continue Bisoprolol + Digoxin at current doses.** *(same as Flow 18 item 5.)*
6–7: anticoagulation + deteriorate.

**§2:** standard. *(No §3.)* Footnote: standard.

---

## Flow 23 — Septic · On Bisoprolol + Digoxin · Refractory

**State:** `acute=false, septic=true, agents={biso,digox}, refractory=true`

**Click path:**
1. Step 1 → **No**
2. Step 2 → tick sepsis; Continue
3. Step 3 → pick **Bisoprolol**, then pick **Digoxin**; tick **HR > 110**; **Continue**

### Step 4

- **Title:** `Patient is on Bisoprolol + Digoxin.`
- **Intro:** **Sepsis flagged.** Digoxin remains preferred; uptitrate Bisoprolol cautiously only once stable.

**Branch A — Continue / uptitrate Digoxin maintenance** *— preferred in sepsis*
- Sub: *— already loaded; uptitrate up to 250 mcg OD as renal function allows*
- Body: Confirm full loading completed. Uptitrate up to **250 mcg OD** as needed. Check pre-dose level < 2 ng/mL if renal function impaired.

**Branch B — Uptitrate Bisoprolol**
- Sub: *— only if SBP > 100 mmHg and patient remains stable. Second-line in sepsis.*
- Body: Increase Bisoprolol to **5 mg OD, then 10 mg OD if tolerated** — second-line in sepsis.

### Step 5 plan

**§1**
1–4: standard.
5. **Sepsis flagged — Digoxin preferred.** *β-blockers and CCBs further drop BP in already-hypotensive septic patients. Treat sepsis first; rate often settles once the driver is controlled.*
6. **Continue / uptitrate Digoxin maintenance — up to 250 mcg OD as needed.** *Already loaded — appropriate choice in sepsis. Check pre-dose level < 2 ng/mL if renal function impaired.*
7. **Uptitrate Bisoprolol only if SBP comfortably > 100 mmHg.** *Second line in sepsis — be cautious of further BP drop.*
8–9: anticoagulation + deteriorate.

**§2 · Outpatient follow-up · once HR controlled (< 110)** — standard four.

**§3 · Only if HR remains > 110 despite maximum therapy** — urgent re-referral.

Footnote: standard.

---

## Flow 24 — Septic · On Verapamil + Digoxin · Not refractory

**State:** `acute=false, septic=true, agents={verap,digox}, refractory=false`

**Click path:**
1. Step 1 → **No**
2. Step 2 → tick sepsis; Continue
3. Step 3 → pick **Verapamil**, then pick **Digoxin**; leave HR > 110 unticked; **Continue**

### Step 5 plan

**§1**
1–4: standard.
5. **Continue Verapamil + Digoxin at current doses.** *(same as Flow 20 item 5.)*
6–7: anticoagulation + deteriorate.

**§2:** standard. *(No §3.)* Footnote: standard.

---

## Flow 25 — Septic · On Verapamil + Digoxin · Refractory

**State:** `acute=false, septic=true, agents={verap,digox}, refractory=true`

**Click path:**
1. Step 1 → **No**
2. Step 2 → tick sepsis; Continue
3. Step 3 → pick **Verapamil**, then pick **Digoxin**; tick **HR > 110**; **Continue**

### Step 4

- **Title:** `Patient is on Verapamil + Digoxin.`
- **Intro:** **Sepsis flagged.** Digoxin remains preferred; uptitrate Verapamil cautiously only once stable.

**Branch A — Continue / uptitrate Digoxin maintenance** *— preferred in sepsis* — sub + body as Flow 23 Branch A.

**Branch B — Uptitrate Verapamil**
- Sub: *— only if SBP > 100 mmHg and patient remains stable. Second-line in sepsis.*
- Body: Increase Verapamil to **80 mg TDS (or MR 240 mg OD)** — second-line in sepsis.

### Step 5 plan

**§1**
1–4: standard.
5. **Sepsis flagged — Digoxin preferred.** *(same body as Flow 23 item 5.)*
6. **Continue / uptitrate Digoxin maintenance — up to 250 mcg OD as needed.** *(same body as Flow 23 item 6.)*
7. **Uptitrate Verapamil only if SBP comfortably > 100 mmHg.** *Second line in sepsis — be cautious of further BP drop.*
8–9: anticoagulation + deteriorate.

**§2 · Outpatient follow-up · once HR controlled (< 110)** — standard four.

**§3 · Only if HR remains > 110 despite maximum therapy** — urgent re-referral.

Footnote: standard.

---

# Quick cross-reference matrix

| # | Flow | Acute | Septic | Agent(s) | Refractory | Step 4 | §3 in plan |
|---|---|---|---|---|---|---|---|
| 01 | Acute exclusion | ✔ | — | — | — | skipped | — (acute plan) |
| 02 | Not septic / no agent / HR controlled | | | none | | skipped | no |
| 03 | Not septic / no agent / HR > 110 | | | none | ✔ | shown | yes |
| 04 | Not septic / on Biso / HR controlled | | | Biso | | skipped | no |
| 05 | Not septic / on Biso / HR > 110 | | | Biso | ✔ | shown | yes |
| 06 | Not septic / on Verap / HR controlled | | | Verap | | skipped | no |
| 07 | Not septic / on Verap / HR > 110 | | | Verap | ✔ | shown (+ warn) | yes |
| 08 | Not septic / on Digox / HR controlled | | | Digox | | skipped | no |
| 09 | Not septic / on Digox / HR > 110 | | | Digox | ✔ | shown | yes |
| 10 | Septic / no agent / HR controlled | | ✔ | none | | skipped | no |
| 11 | Septic / no agent / HR > 110 | | ✔ | none | ✔ | shown | yes |
| 12 | Septic / on Biso / HR controlled | | ✔ | Biso | | skipped | no |
| 13 | Septic / on Biso / HR > 110 | | ✔ | Biso | ✔ | shown | yes |
| 14 | Septic / on Verap / HR controlled | | ✔ | Verap | | skipped | no |
| 15 | Septic / on Verap / HR > 110 | | ✔ | Verap | ✔ | shown (+ warn) | yes |
| 16 | Septic / on Digox / HR controlled | | ✔ | Digox | | skipped | no |
| 17 | Septic / on Digox / HR > 110 | | ✔ | Digox | ✔ | shown | yes |
| 18 | Not septic / on Biso+Digox / HR controlled | | | Biso+Digox | | skipped | no |
| 19 | Not septic / on Biso+Digox / HR > 110 | | | Biso+Digox | ✔ | shown | yes |
| 20 | Not septic / on Verap+Digox / HR controlled | | | Verap+Digox | | skipped | no |
| 21 | Not septic / on Verap+Digox / HR > 110 | | | Verap+Digox | ✔ | shown | yes |
| 22 | Septic / on Biso+Digox / HR controlled | | ✔ | Biso+Digox | | skipped | no |
| 23 | Septic / on Biso+Digox / HR > 110 | | ✔ | Biso+Digox | ✔ | shown | yes |
| 24 | Septic / on Verap+Digox / HR controlled | | ✔ | Verap+Digox | | skipped | no |
| 25 | Septic / on Verap+Digox / HR > 110 | | ✔ | Verap+Digox | ✔ | shown | yes |

> Bisoprolol + Verapamil never appears in the matrix — the mutex in Step 3 prevents the combination ever being recorded.

---

## Verification process

For each flow:

1. Walk through the click path in the live app.
2. Confirm Step 4 (where applicable) matches the content listed here.
3. Confirm Step 5 plan items and their bodies match.
4. Note any clinical amendments inline (e.g. "Flow 13 item 6 — please change body to read…").

When you've marked up this document, send it back and I'll roll the amendments into `index-sym.html`.
