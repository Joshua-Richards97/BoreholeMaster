# BH Master v21 — Session Summary & Project State

**Build:** v21 · 2026-04-09 · 786KB · 13,613 lines  
**Previous:** v20 · 2026-04-03 · 802KB · 13,059 lines  
**Net change:** -16KB / +554 lines (inline style extraction saved ~37KB, new features added ~21KB)

---

## What Was Done This Session

### P1.1 Inline Style Extraction (Priority B1 — DONE)
- **563 inline `style=""` attributes extracted → 102 named CSS classes**
- Two-phase extraction: Phase 1 (47 classes, 362 replacements), Phase 2 (55 classes, 208 replacements)
- 55% reduction (1,027 → 464 remaining inline styles)
- Remaining 464: 340 true one-offs + 62 context-specific pairs (diminishing returns)
- PDF-specific classes (18 `pdf-*` classes) injected into `_buildPDFShell` and `exportFieldSheetPDF` standalone templates
- File size reduced ~37KB from deduplication alone

### FW-8: BH Context Strip (Priority B3 — DONE)
- One-line context strip below project banner on Calc, Recovery, and GWL tabs
- Shows: **BH01 · ⌀50mm · 15m · SWL 3.45m** when a BH is active
- Auto-updates via `_applyActiveBHToTabs`, hides when no BH active
- Styled as light blue pill with bold ID and muted parameters

### B2: Recovery Chart Touch Interaction (Priority B2 — DONE)
- Touch/tap handler on recovery canvas
- Snaps to nearest data point within 40px, highlights with amber ring
- Floating tooltip: `t=2.5min · WL=4.230m` (or `H/H₀` for slug tests)
- Works with touch (Android) and mouse click (desktop)

### GWL Card Quick-Add Button
- Green **"+ Add"** button on each GW point card in list view
- Opens point detail with datetime pre-filled and depth field focused
- Skips a tap vs having to open card → scroll → add

### GWL Detail View Restructure (Feedback-driven)
Complete reorder for "log → see hydrograph → export" workflow:
1. **Add Reading** (hero action) — big 18px depth input, large Add button
2. **Instant Feedback** — green panel with depth, RL, Δh, interpretation
3. **Hydrograph** — larger canvas (260px), titled, with multi-point toggle
4. **Stat bar** (compact)
5. **Export buttons** (CSV / PDF / Del)
6. **Readings table**

### Frictionless Field Logging
- Non-essential fields collapsed behind "More fields ▾" toggle (hidden by default)
- Date auto-fills to now, sampler auto-fills from localStorage
- Target: under 10 seconds per reading
- Auto-scroll to feedback + chart after adding
- Rich toast: `BH01: 4.250 m · RL 96.750 · ↑0.045m`

### Instant Feedback Panel
- Appears after every reading or when opening a point with data
- Large 22px depth + RL display
- Δh with colour (↑ green / ↓ red / → grey) and interpretation text
- Timestamp of reading

### Enhanced GW Point Cards
- Inline sparkline SVG (80×28px) with gradient fill beneath line
- Colour-coded: green (rising), red (falling), navy (stable)
- Prominent latest reading: 18px bold depth + RL + Δh
- Removed fragile monkey-patch; sparkline rendered directly in card HTML

### Multi-Point Hydrograph Toggle
- "Show All Points" button in chart card header
- Overlays all project BHs with dashed coloured lines + legend
- Toggle back to single-point view

### Publication-Ready SVG Hydrograph (`_buildSVGHydrograph`)
- **Dual Y-axis**: Depth (m bTOC) left, RL (m AHD) right
- **Gradient fill** beneath line
- **Direction hints**: "↑ shallower" / "↓ deeper"
- **Latest value pill**: navy rounded rect label at last point
- **Optional title**: `{ title: 'Water Level Hydrograph — BH01' }`
- **5 Y-axis ticks**, up to 6 X-axis date labels
- Vector output — scales perfectly at any print size

### Publication-Ready PDF Export (`exportGWPointPDF`)
- Uses SVG hydrograph exclusively (520×200px, full-width on A4)
- Monitoring Period and Range added to statistics
- Borehole depth included in point details
- Report type: "GROUNDWATER LEVEL REPORT"
- Uses `_openPrintWindow()` consistently

### Code Quality Fixes
- Removed duplicate `drawBoreholePlaceholder` (dead compact version)
- Removed fragile sparkline monkey-patch (replaced with inline rendering)
- Fixed `exportSingleLogPDF` → `exportFieldSheetPDF` (onclick referenced non-existent function)
- Fixed 13 bottom sheet backdrops missing `justify-content:center` (sheets off-screen on wider displays)
- Version bump to v21
- All functions validated — zero duplicate function definitions

### UX Fixes
- **Today's Summary popup** — centred on screen + safe-area padding (was clipped to left edge)
- **Logs tab: GWL moved to first position** — subtab order now: Projects | BH | GWL | Purge | Recovery | Chem. GWL is default active tab.
- **Banner sizing homogenised** — calc tab banner replaced inline style with shared `.banner-gradient` class. All 4 tabs now identical.

---

## Current File Metrics

| Metric | v20 | v21 | Change |
|--------|-----|-----|--------|
| File size | 802KB | 786KB | -16KB |
| Lines | 13,059 | 13,613 | +554 |
| Inline styles | ~1,027 | 464 | -563 (55%) |
| CSS classes added | — | 102 | new |
| `_orig` monkey patches | 29 | 28 | -1 |
| Duplicate functions | 1 | 0 | -1 |

---

## Outstanding Items

### Before Capacitor Wrap
| Priority | Item | Status |
|----------|------|--------|
| A | Runtime test program (updated — see test doc) | Ready to test |
| A | Block H/I export/backup runtime tests | Never runtime tested |
| B | Remaining ~28 single-layer monkey patches | Low risk, optional |

### Post-Launch / Capacitor
| Item | Phase |
|------|-------|
| Push notifications for timer | Phase 2 |
| Storage migration (localStorage → Preferences) | Phase 2 |
| Adaptive display CSS (status bar, notch) | Phase 3 |
| Play Store listing (AAB, screenshots) | Phase 3 |
| FW-9 Offline BH position map | Future |
| P2 items (hardcoded colours, duplicate CSS, a11y) | Ongoing |

---

## Key Architecture Notes
- **Single-file HTML PWA** — everything in one `borehole-calculator.html`
- **102 extracted CSS classes** — `d-none`, `flex-between`, `fs-10`, `mb-8`, `banner-btn-ghost`, `pdf-table`, `sheet-handle`, `card-action-row`, etc.
- **Hooks arrays:** `_afterSaveBH`, `_afterSwitchScreen`, `_afterSaveProject`, `_afterSetActiveProject`
- **`_buildPDFShell(type, subtitle, timestamp, body, opts)`** — shared PDF template with company branding + pdf-* classes
- **`_buildSVGHydrograph(point, w, h, opts)`** — vector chart for PDF with dual axis, gradient, title
- **`_fmtDateTime()` / `_fmtTime()` / `_fmtDate()`** — consistent formatting
- **Critical rule:** use `bm.find('</style>')` (first occurrence) for stylesheet injection
