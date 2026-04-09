# BH Master v21 — Pre-Capacitor Test Program & Outstanding Tasks

**Date:** 2026-04-09  
**Build:** v21 · 786KB · 13,613 lines  
**Status:** Feature-complete. Needs device testing round before Capacitor wrap.

---

## PART 1: Outstanding Tasks

### Priority A — Must do before Capacitor

| # | Task | Effort | Notes |
|---|------|--------|-------|
| A1 | **Run full test program below** | 1 hour | On Android device (Chrome or PWA). All 78 tests. |
| A2 | **Block I export tests (critical)** | 30 min | JSON backup/restore, all CSV exports, all PDF exports — never runtime tested. |

### Priority B — Should do before Play Store

| # | Task | Effort | Notes |
|---|------|--------|-------|
| B1 | Remaining ~28 single-layer monkey patches | Optional | All single-wrap. Healthy pattern. Low risk to leave. |
| B2 | P2 items (hardcoded colours → CSS vars, duplicate CSS, a11y labels) | 1–2 sessions | Best done during Capacitor migration. |

### Capacitor Phase

| # | Task | Phase | Notes |
|---|------|-------|-------|
| CAP1 | Run scaffold, test on Android emulator | Phase 1 | Scaffold delivered (`bh-master-android-scaffold.zip`). |
| CAP2 | Storage migration (localStorage → Capacitor Preferences) | Phase 2 | Bridge script ready (`capacitor-storage-bridge.js`). |
| CAP3 | Push notifications for timer | Phase 2 | `@capacitor/local-notifications`. |
| CAP4 | Adaptive display CSS (status bar, notch, safe areas) | Phase 3 | |
| CAP5 | Play Store listing (AAB, screenshots, description) | Phase 3 | $25 one-time developer account. |

---

## PART 2: Comprehensive Runtime Test Program

**Instructions:**
- Test on Android device (Chrome or installed PWA)
- Clear cache before starting
- Work through sequentially — some tests depend on data from earlier tests
- Mark each Pass/Fail, note any issues

---

### Block A — First Launch & Onboarding (5 tests)
| # | Test | Expected | Pass/Fail |
|---|------|----------|-----------|
| A1 | Fresh load (no data) | Splash → BH tab → onboarding tips visible | `[ ]` |
| A2 | Console check | No errors (especially no TDZ errors) | `[ ]` |
| A3 | Create first project via onboarding | Project created, banner updates on all tabs | `[ ]` |
| A4 | Create first BH via onboarding | BH created, GW point auto-created, GPS auto-captured | `[ ]` |
| A5 | Dismiss onboarding | Tips hide, don't reappear on reload | `[ ]` |

### Block B — Project System (4 tests)
| # | Test | Expected | Pass/Fail |
|---|------|----------|-----------|
| B1 | Project banner on all 4 tabs | Shows project name + Round/Switch/+New buttons | `[ ]` |
| B2 | Switch project | All tabs update, BH list filters | `[ ]` |
| B3 | Create new project from any tab | Modal opens, created, set as active | `[ ]` |
| B4 | Clear active project | Banners reset, all BHs visible | `[ ]` |

### Block C — Borehole Management (10 tests)
| # | Test | Expected | Pass/Fail |
|---|------|----------|-----------|
| C1 | Create BH via + New BH | Modal opens, GPS auto-captures | `[ ]` |
| C2 | BH card shows edit button | Bottom action row with ✎ Edit + Set Active | `[ ]` |
| C3 | Tap ✎ Edit | Edit modal opens, data pre-filled. One tap. | `[ ]` |
| C4 | Set Active on card | BH active across all tabs | `[ ]` |
| C5 | Bulk + → manual entry | Table shows, add rows, create | `[ ]` |
| C6 | Bulk + → paste from clipboard | Tab/comma-separated data fills correctly | `[ ]` |
| C7 | Bulk + → load from file | .csv/.txt, rows populate | `[ ]` |
| C8 | Bulk + → skip duplicates | Existing IDs skipped with count | `[ ]` |
| C9 | Helper note visible | "you can edit details later" note | `[ ]` |
| C10 | BH detail view | Tap card body → detail opens | `[ ]` |

### Block D — Round Tracker (7 tests)
| # | Test | Expected | Pass/Fail |
|---|------|----------|-----------|
| D1 | Open Round Tracker from any tab | Bottom sheet with BH checklist | `[ ]` |
| D2 | Tick a BH | Green tick, timestamp, incomplete sorted first | `[ ]` |
| D3 | Progress bar updates | "X of Y complete · Z remaining" | `[ ]` |
| D4 | BH card shows ✓ Round badge | 50% opacity, green badge | `[ ]` |
| D5 | Untick a BH | Tick removed, full opacity | `[ ]` |
| D6 | Reset round | All cleared after confirmation | `[ ]` |
| D7 | Per-project persistence | Switch project → different state → switch back → original | `[ ]` |

### Block E — Purge Calculator (4 tests)
| # | Test | Expected | Pass/Fail |
|---|------|----------|-----------|
| E1 | Volume calculation | BH01 (50mm, 15m, WL 3.45m, 0.5m stand-up) → ~22.7L | `[ ]` |
| E2 | Create log | Toast + active log banner | `[ ]` |
| E3 | Water level auto-populates | Switch to BH with GW readings → WL filled | `[ ]` |
| E4 | Sampler sync | Enter name on calc → appears on all tabs | `[ ]` |

### Block F — Recovery / Slug Tests (13 tests)
| # | Test | Expected | Pass/Fail |
|---|------|----------|-----------|
| F1 | Add measurement | Row in table, chart updates, scroll to last | `[ ]` |
| F2 | Enter key adds | Type depth, Enter → added | `[ ]` |
| F3 | Smart number entry | Focus empty → integer pre-filled from last | `[ ]` |
| F4 | Dup Last button | Appears after first reading | `[ ]` |
| F5 | Tap depth to edit | Bottom sheet, ✎ icon on edited cell | `[ ]` |
| F6 | Reset measurements | Clears all | `[ ]` |
| F7 | Switch Recovery ↔ Slug | Prompts to clear, resets slug H₀ | `[ ]` |
| F8 | Slug H₀ note | Help text visible | `[ ]` |
| F9 | Timer vibrates + beeps | Countdown → vibrate + beep + toast | `[ ]` |
| F10 | Timer persists across tabs | Start → switch → return → still running | `[ ]` |
| F11 | Unsaved work protection | Switch tab → "You have X unsaved" prompt | `[ ]` |
| F12 | Save + post-save prompt | Next BH / New test / GW Chem / Done | `[ ]` |
| F13 | **Chart touch interaction** | Tap point → amber highlight + tooltip with time/WL | `[ ]` |

### Block G — GW Levels (12 tests) ★ CORE WORKFLOW
| # | Test | Expected | Pass/Fail |
|---|------|----------|-----------|
| G1 | "+ Add Reading" button | Goes to active BH's GW detail, date pre-filled | `[ ]` |
| G2 | **Quick-add from card** | Green "+ Add" on card → opens detail with depth focused | `[ ]` |
| G3 | Add GW reading | Depth field large (18px), Add button prominent | `[ ]` |
| G4 | **Instant feedback** | Green panel shows depth, RL, Δh, interpretation | `[ ]` |
| G5 | **Auto-scroll to feedback** | After add, scrolls to feedback + chart | `[ ]` |
| G6 | **Rich toast** | Shows `BH01: 4.250 m · RL 96.750 · ↑0.045m` | `[ ]` |
| G7 | **Hydrograph is hero** | Chart is large (260px), positioned below feedback | `[ ]` |
| G8 | **Multi-point toggle** | "Show All Points" button → overlays project BHs | `[ ]` |
| G9 | **Collapsible extra fields** | "More fields ▾" → opens date/sampler/baro/notes | `[ ]` |
| G10 | **BH context strip** | Strip below banner: "BH01 · ⌀50mm · SWL 3.45m" | `[ ]` |
| G11 | **Sparkline on cards** | 80×28px filled SVG on each card with data | `[ ]` |
| G12 | Next BH navigation | "→ BH02" after adding, prioritises unmeasured | `[ ]` |

### Block H — GW Chemistry (5 tests)
| # | Test | Expected | Pass/Fail |
|---|------|----------|-----------|
| H1 | Start chemistry session | Select method → params → first modal auto-opens | `[ ]` |
| H2 | Pump rate persistence | Lock rate → switch BH → return → auto-filled | `[ ]` |
| H3 | QA pills work | Tap toggles, no double-fire | `[ ]` |
| H4 | Sample ID editable | Not readonly | `[ ]` |
| H5 | Chem table scrollable | Swipe hint + scrollbar visible | `[ ]` |

### Block I — Exports & Backups (14 tests) ★ NEVER RUNTIME TESTED
| # | Test | Expected | Pass/Fail |
|---|------|----------|-----------|
| I1 | JSON backup | Exports all data as .json, downloadable | `[ ]` |
| I2 | JSON restore | Import → all data restored | `[ ]` |
| I3 | Purge logs CSV | One row per log, proper headers | `[ ]` |
| I4 | Recovery CSV (single) | One row per measurement + BH metadata | `[ ]` |
| I5 | Recovery CSV (all) | One row per test summary | `[ ]` |
| I6 | GW readings CSV | One row per reading + point metadata | `[ ]` |
| I7 | Chem session CSV | One row per reading, params as columns | `[ ]` |
| I8 | Purge log PDF | A4 field sheet, correct data | `[ ]` |
| I9 | Recovery summary PDF | Landscape table | `[ ]` |
| I10 | **GW point PDF** | Metadata + SVG hydrograph (RL axis) + readings table | `[ ]` |
| I11 | **GW project report PDF** | Summary + multi-BH overlay + per-point pages | `[ ]` |
| I12 | BH record PDF | Single BH detail sheet | `[ ]` |
| I13 | BH register PDF | All BHs table format | `[ ]` |
| I14 | GW time series CSV | All project BHs, flat table, chronological | `[ ]` |

### Block J — App Lifecycle (8 tests)
| # | Test | Expected | Pass/Fail |
|---|------|----------|-----------|
| J1 | Quick resume | Close → reopen → last active screen | `[ ]` |
| J2 | App resume (visibilitychange) | Background → return → timer recalculated | `[ ]` |
| J3 | Today's Summary | Button → bottom sheet with today's work | `[ ]` |
| J4 | Field notes | Persists per project per date | `[ ]` |
| J5 | Today status chips | BH cards show "Today: Purged / Recovery / Chem / GW" | `[ ]` |
| J6 | Clear all boreholes | Confirmation → cleared, no onboarding re-trigger | `[ ]` |
| J7 | Rapid BH switching (10×) | No crash, correct BH each time | `[ ]` |
| J8 | Negative water level | Field accepts -1.5, chart renders | `[ ]` |

### Block K — Card & UI Consistency (5 tests)
| # | Test | Expected | Pass/Fail |
|---|------|----------|-----------|
| K1 | All card types have bottom action row | Purge, recovery, chem, GWL, BH, projects | `[ ]` |
| K2 | All delete buttons show 🗑 | Every delete across app | `[ ]` |
| K3 | Nav tap targets | 48px minimum | `[ ]` |
| K4 | Date format consistency | All YYYY-MM-DD HH:MM:SS | `[ ]` |
| K5 | Modal backdrop dismiss | All modals dismiss on backdrop tap | `[ ]` |

---

**Total: 87 tests across 11 blocks.**

★ marks indicate the highest-priority test blocks for v21 changes.

Pass all of these and the app is ready for Capacitor wrap.
