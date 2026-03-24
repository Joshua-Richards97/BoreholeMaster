# Borehole Master
### Field Hydrogeology Tool — PWA for iOS & Android

A professional single-file progressive web app for hydrogeologists working in the field. Designed for offline-first use on mobile devices, with cloud export and PDF reporting built in.

---

## Deployment

Hosted on GitHub Pages: `https://Joshua-Richards97.github.io/BoreholeMaster/`

### Files required
| File | Purpose |
|------|---------|
| `Borehole Master.html` | Main application (rename to `index.html` for GitHub Pages root) |
| `manifest.json` | PWA install metadata |
| `service-worker.js` | Offline caching — bump `CACHE_VERSION` on each deploy |
| `icon-192.png` | App icon (standard) |
| `icon-512.png` | App icon (large) |
| `icon-1024.png` | App icon (splash) |

### Deploying an update
1. Download the zip, unzip all files
2. GitHub repo → **Add file** → **Upload files** → drag all in → commit to `main`
3. Bump `CACHE_VERSION` in `service-worker.js` to force all installed devices to update

### Installing as a PWA
- **iPhone/iPad**: Safari → Share → Add to Home Screen
- **Android**: Chrome → menu → Install App
- Once installed, works fully offline

---

## Architecture — Data Hierarchy

```
Project
  └── Borehole  (construction details, GPS, casing)
        ├── Purge Logs       (volume calculations per sampling event)
        ├── GW Monitoring    (time-series water level readings)
        ├── Recovery Tests   (drawdown/recovery with chart)
        └── GW Chemistry     (multi-parameter field chemistry)
```

### Active Project / Active Borehole
The app uses a two-level "active" system that propagates context across every tab:

- **Active Project** — filters all borehole selectors and log views
- **Active Borehole** — auto-fills diameter, depth, stand-up, GPS and water level into Purge, Monitor, Recovery, and Chemistry tabs the moment it is set

### Manual Entry flow
Selecting "— Manual Entry —" on any borehole selector:
1. Shows a bottom sheet with a BH ID text field + autocomplete suggestions
2. **Existing BH** → linked and set as active immediately
3. **New BH** → navigates to BH tab with ID pre-filled, returns to origin tab after saving

---

## Tabs

### 🕳 BH — Hero tab (centre)
Central borehole registry. Boreholes listed by project with a toggleable map (Leaflet, colour-coded markers).

**Record fields:** BH ID · Description · Project · Total Depth (m bTOC) · Diameter (mm) · Stand-up (m) · TOC RL (m AHD) · Casing/Screen · Date Drilled · GPS · Easting/Northing · Notes

Creating a borehole automatically creates a linked GW monitoring point and sets the new borehole as active across all tabs.

**Detail view** inner tabs: Info · GW Readings · Purge Logs · Recovery Tests

### 📋 Purge
Calculates well water volume (π r² h) and 3× purge volume. Live scaled cross-section diagram updates as you type.

Inputs: diameter (mm or inches with presets), well depth, water level, stand-up, sampler, GPS, field notes.

**Create Log** saves to the Purge Logs store. Typing an unknown BH ID redirects to borehole creation first.

### 💧 Monitor (GW Levels)
Time-series groundwater level monitoring linked to the active borehole.

- Add readings: date/time, depth to water, sampler, baro pressure, air temp, notes
- Time-series chart (auto-scale)
- Diff calculator between any two readings
- TOC RL → auto-converts depth to AHD elevation
- Baro pressure estimation from air temperature (ISA standard atmosphere)
- With active borehole set, navigates directly to that point's detail on tab switch

### 📈 Sample — two sub-panels

**Drawdown / Recovery**
1. Set up: link borehole, static WL, diameter, depth, sampler
2. Record: add timestamped measurements (auto or manual minutes), live chart
3. Save · CSV · PDF · Google Drive · OneDrive

Calculates average flow rate (L/s, L/min) from water level rise.

**GW Chemistry**
Sampling methods: 3 Well Volume Purge · Low Flow · Grab Sample

Parameters (toggle): Temp · pH · EC · Eh · DO · Pressure · WL · Turbidity

- Purge progress bar: calculates required volume from borehole geometry + pump rate × elapsed time
- Readings table: inline ±10% deviation indicators
- Stabilisation grid: colour-coded per-parameter stable/unstable status
- Draft persistence: navigating away preserves unsaved readings
- Save · CSV · PDF · cloud upload

### 📂 Logs — six subtabs

| Tab | Contents |
|-----|---------|
| **Projects** | Create, edit, delete projects |
| **BH** | Borehole register — tap to open, hold for context menu |
| **Purge** | Purge logs — swipe left to delete, hold for options |
| **Recovery** | Recovery test summaries |
| **GWL** | GW level readings by monitoring point |
| **Chem** | Chemistry sessions — hold for CSV, PDF, Delete |

All tabs: project filter · sort · search · date range · CSV · PDF · cloud upload.

**Data management:** full JSON backup/restore, storage meter, global cloud export.

---

## PDF Reports

All reports share a consistent A4 template (BOREHOLE MASTER header, report type, subtitle, timestamp, footer).

| Report | Contents |
|--------|---------|
| Borehole Record | Construction table + complete GW readings history |
| Borehole Register | Summary table of all boreholes |
| Purge Log | Volume parameters, diagram description, notes |
| Recovery Test | Setup table + full measurement table |
| GW Chemistry | Method info + readings with deviation colour-coding |
| GW Levels | Time-series readings + chart image |

---

## Local Storage Keys

| Key | Contents |
|-----|---------|
| `boreholeLogs` | Purge log records |
| `recoveryTests` | Recovery/drawdown tests |
| `gwPoints` | GW monitoring points + readings |
| `boreholes` | Borehole registry |
| `bmProjects` | Projects |
| `bmActiveProjectId` | Active project ID |
| `chemSessions` | GW chemistry sessions |
| `_activeBHId` | Active borehole ID |
| `_hasSeenWelcome` | Onboarding dismissed flag |
| `samplerName` | Remembered sampler name |

Session: `_chemDraft` — unsaved chemistry readings (cleared on save/clear).

---

## Offline Behaviour

- Service worker caches the full app shell on first install
- All data in localStorage — no server required, works on aeroplane mode
- Updates: bump `CACHE_VERSION` in `service-worker.js` to push refresh to all devices

---

## Companion App: Reudi Field

A separate PWA for miniRUEDI dissolved gas field analysis, sharing the same Project → Borehole → Measurement architecture.

**Navigation:** REUDI · Sample (GW Chemistry + Recovery + GW Levels) · BH · Logs

Repo: `Joshua-Richards97/ReudiField`

---

*Vanilla HTML/CSS/JS — no frameworks, no build step. Optional CDN dependencies: Leaflet.js (map, loaded on demand), Chart.js (loaded on demand).*
