# BH Master — Code Improvements Backlog

**Status:** v21 build. Pre-Capacitor migration.  
**Not features** — structural, maintainability, and robustness improvements.

---

## Priority 1 — Completed ✅

### ~~1.1 Inline style extraction~~ ✅ DONE (v21)
563 of ~1,027 inline styles extracted to 102 named CSS classes (55% reduction).
Remaining 464: 340 true one-offs + 62 pairs. Diminishing returns — these are context-specific.

### ~~1.2 Monkey-patch consolidation (top 7)~~ ✅ DONE (v20)
Top 7 functions consolidated with hooks arrays:
- ✅ `saveBorehole`, `switchScreen`, `saveNewProject`, `setActiveProject` (hooks)
- ✅ `clearActiveProject`, `createLog`, `saveNewPoint` (merged into core)

### ~~1.3 PDF template deduplication~~ ✅ DONE (v20)
`_buildPDFShell` with `opts` (landscape, extraCSS, pg-break) + company branding.
7 → 4 standalone templates. pdf-* classes shared across all templates.

### ~~1.4 Dead code removal~~ ✅ DONE (v21)
- Duplicate `drawBoreholePlaceholder` removed
- Duplicate `filterBoreholes` removed (v20)
- Fragile sparkline monkey-patch removed (inline rendering now)
- 3 double-return blocks removed (v20)

---

## Priority 2 — Do during Capacitor migration

### 2.1 Hardcoded colours → CSS variables (~150 instances in HTML)
Top offenders in HTML body:
- `#16a34a` 48× (should be `var(--green)` or similar)
- `#dc2626` 26× (should be `var(--red)`)
- `#e2e8f0` 23× (should be `var(--border)`)
- `#94a3b8` 21× (should be `var(--hint)`)

**Approach:** Define colour variables, search-and-replace in HTML. Overlaps with remaining inline styles.

### 2.2 Duplicate CSS declarations
`.nav-label` defined at lines 173 and 899. `.subtab-bar` at 626 and 860. `.export-actions` at 625 and 879.

**Approach:** Audit all duplicate selectors, merge, delete redundant. ~0.5 session.

### 2.3 Accessibility — label associations (110 inputs without `for=`)
Labels exist visually but aren't programmatically linked.

**Approach:** Add `id` to inputs and `for=` to labels. Enables screen readers and tappable labels.

### 2.4 Remaining ~28 single-layer monkey patches
All single-wrap. Healthy pattern. Low risk to leave.
Could consolidate into hooks if refactoring for readability, but not a blocker.

---

## Priority 3 — Nice to have

### 3.1 Service worker audit
Current SW caches by BUILD_DATE. Should also cache all CDN assets (Leaflet tiles, etc.).

### 3.2 Error boundaries
No global error handler. A `window.onerror` that shows a user-friendly message + logs to localStorage would help debug field issues.

### 3.3 Performance profiling
13,600 lines in one `<script>` block. Parse time on cold load may be noticeable on low-end Android. Measure and consider lazy-loading non-critical sections.
