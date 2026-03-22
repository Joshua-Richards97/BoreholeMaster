# Borehole Master

**Field Hydrogeological Calculator** — a mobile-first Progressive Web App for hydrogeologists.

---

## Features

- **Borehole Volume Calculator** — diameter, depth, water level → water volume and 3× purge volume with a live annotated cross-section diagram
- **Groundwater Level Monitoring** — create monitoring points, record readings over time, view trends and calculate differentials between readings
- **Recovery / Drawdown Tracking** — 3-step workflow with interval countdown timer, automatic timestamping and flow rate calculation
- **Project System** — group all records by project; active project syncs across all tabs
- **Saved Logs** — searchable, filterable by project, BH ID, sampler, date range; swipe to delete; long-press to reload into calculator
- **Field Sheet PDF** — A4 formatted field sheet with site ID, well parameters, volumes, purging record table, sample details, sign-off block
- **GPS capture** — high-accuracy device GPS saved with every record, copy-to-clipboard
- **Photo capture** — site photos attached to logs and GW readings
- **Backup / Restore** — full JSON export/import, storage meter with quota warnings
- **Offline-ready** — Progressive Web App with service worker caching

---

## Files

| File | Purpose |
|------|---------|
| `borehole-calculator.html` | Main application (single file, no dependencies) |
| `manifest.json` | PWA manifest — required for home screen install |
| `service-worker.js` | Offline caching — register via manifest |
| `icon-192.png` | App icon 192×192 px *(you must supply this)* |
| `icon-512.png` | App icon 512×512 px *(you must supply this)* |

---

## Setup — GitHub Pages (free hosting)

1. Create a new GitHub repository (public or private)
2. Upload all files: `borehole-calculator.html`, `manifest.json`, `service-worker.js`, `icon-192.png`, `icon-512.png`
3. Go to **Settings → Pages → Source** → select `main` branch, root folder
4. Your app will be live at `https://yourusername.github.io/your-repo-name/borehole-calculator.html`

### Icons
Export `icon-192.png` and `icon-512.png` from the logo SVG using any image editor or a free SVG-to-PNG converter (e.g. [realfavicongenerator.net](https://realfavicongenerator.net)).

### Installing as a PWA
- **iPhone / iPad**: Open in Safari → Share → Add to Home Screen
- **Android**: Open in Chrome → browser menu → Add to Home Screen (or Install App prompt appears automatically)
- **Desktop Chrome/Edge**: Click the install icon in the address bar

---

## Updating the app

1. Edit `borehole-calculator.html`
2. Bump `CACHE_VERSION` in `service-worker.js` (e.g. `v1` → `v2`) so existing installs pick up the new version
3. Push to GitHub — Pages deploys automatically within ~1 minute

---

## App Store distribution (optional)

Use [Capacitor](https://capacitorjs.com/) (free, open-source) to wrap the HTML file into a native iOS / Android binary:

```bash
npm install @capacitor/core @capacitor/cli
npx cap init "Borehole Master" com.yourname.boreholemaster
npx cap add ios     # requires Xcode on Mac
npx cap add android # requires Android Studio
npx cap copy
npx cap open ios    # opens Xcode for App Store submission
```

Store fees: Apple Developer Program = USD $99/year · Google Play = USD $25 one-time.

---

## Data storage

All data is stored in the browser's `localStorage` (~5 MB limit). Use **Logs → Backup All Data** regularly to export a JSON backup. The backup file can be restored on any device via **Restore Backup**.

---

## Built with

Pure HTML, CSS and JavaScript — zero dependencies, zero build step.

*Borehole Master · Field Hydrogeological Calculator*
