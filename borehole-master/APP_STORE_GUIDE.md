# Borehole Master — App Store Distribution Guide

## What's in this package

```
borehole-master/
├── index.html              ← Your complete app
├── manifest.json           ← PWA manifest (icons, name, theme)
├── service-worker.js       ← Offline caching for field use
├── capacitor.config.json   ← Capacitor native wrapper config
├── package.json            ← Node dependencies
└── icons/
    ├── icon-source.svg     ← Master vector icon (edit this)
    ├── icon-48.png
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-192.png        ← Android / PWA
    ├── icon-512.png        ← Android / PWA
    └── icon-1024.png       ← Apple App Store required size
```

---

## Recommended path: Capacitor (free, minimal code)

Capacitor wraps your HTML file in a native shell. You write no Swift or Kotlin.
Apple App Store requires a Mac + Xcode. Google Play works on any OS.

**One-time costs:**
- Apple Developer Program: USD $99/year (required for App Store)
- Google Play Developer: USD $25 one-time

---

## Step-by-step: iOS (Apple App Store)

### Prerequisites
- Mac running macOS 13+
- Xcode 16+ (free from Mac App Store)
- Node.js 18+ (https://nodejs.org)
- Apple Developer account (https://developer.apple.com)

### 1. Install dependencies
```bash
cd borehole-master
npm install
```

### 2. Add iOS platform
```bash
npx cap add ios
```
This creates an `ios/` folder — a full Xcode project.

### 3. Sync your web files into the native project
```bash
npx cap sync ios
```
Run this every time you update index.html.

### 4. Open in Xcode
```bash
npx cap open ios
```

### 5. In Xcode — configure your app identity
- Click the project name (top left) → "Signing & Capabilities"
- Team: select your Apple Developer account
- Bundle Identifier: `com.boreholemaster.app` (or your own reverse-domain)
- Version: 1.0.0  |  Build: 1

### 6. Add your app icon in Xcode
- In the left panel: App → Assets.xcassets → AppIcon
- Drag `icons/icon-1024.png` into the 1024×1024 slot
- Xcode auto-generates the smaller sizes from this

### 7. Test on a real device or simulator
- Select your device/simulator from the toolbar
- Press the Play ▶ button

### 8. Archive for App Store submission
- Menu → Product → Archive
- When done: Window → Organizer → Distribute App
- Choose "App Store Connect" → follow the wizard

### 9. Complete App Store listing (in App Store Connect)
Go to https://appstoreconnect.apple.com and fill in:
- App name: Borehole Master
- Subtitle: Field Hydrogeological Calculator
- Category: Utilities
- Description (see template below)
- Keywords: borehole, hydrogeology, groundwater, water level, field calculator
- Screenshots: at least 3 × iPhone 6.7" (1290×2796px)
- Privacy Policy URL (required — use a free generator if needed)

---

## Step-by-step: Android (Google Play)

### Prerequisites
- Any OS (Windows, Mac, Linux)
- Node.js 18+
- Android Studio (https://developer.android.com/studio)
- Google Play Developer account

### 1. Add Android platform
```bash
cd borehole-master
npm install
npx cap add android
```

### 2. Sync
```bash
npx cap sync android
```

### 3. Open in Android Studio
```bash
npx cap open android
```

### 4. Configure app identity
In `android/app/build.gradle`:
```gradle
defaultConfig {
    applicationId "com.boreholemaster.app"
    versionCode 1
    versionName "1.0.0"
}
```

### 5. Add icons
Copy your PNG icons into:
- `android/app/src/main/res/mipmap-mdpi/`     → icon-48.png  (rename to ic_launcher.png)
- `android/app/src/main/res/mipmap-hdpi/`     → icon-72.png
- `android/app/src/main/res/mipmap-xhdpi/`    → icon-96.png
- `android/app/src/main/res/mipmap-xxhdpi/`   → icon-128.png (or 192)
- `android/app/src/main/res/mipmap-xxxhdpi/`  → icon-192.png

### 6. Build release APK / AAB
In Android Studio: Build → Generate Signed Bundle/APK
- Choose Android App Bundle (AAB) — required for Play Store
- Create a keystore file and keep it safe (you need it for every update)

### 7. Submit to Google Play Console
Go to https://play.google.com/console
- Create app → fill in store listing
- Upload your AAB under "Production" releases
- Add screenshots (min 2, phone screenshots at 16:9 or 9:16)
- Submit for review (usually 1–3 days)

---

## App Store Description Template

**Name:** Borehole Master

**Subtitle:** Field Hydrogeological Calculator

**Description:**
Borehole Master is a professional field tool for hydrogeologists and environmental scientists. Designed for use in the field — including offline — it handles the calculations you need, when you need them.

**Features:**
• Borehole Volume Calculator — instantly calculate water column volume and 3× purge volume from diameter, depth, and water level. Supports mm and inch casing with standard presets (2", 4", 6") or custom entry.
• Groundwater Level Monitoring — create monitoring points with coordinates and TOC reduced level, record readings over time, view trends, and export to CSV.
• Recovery / Drawdown Tracking — log water level recovery measurements with automatic or manual timestamps, calculate average flow rate, and view the recovery curve.
• Visual borehole diagram — live cross-section updates as you enter values.
• Full offline support — works in the field with no signal.
• CSV export for all data — ready for reporting.

**Keywords:** borehole, hydrogeology, groundwater, water level, piezometer, monitoring well, purge volume, drawdown, recovery test, field calculator

---

## Updating the app in future

Whenever you make changes to index.html:
```bash
npx cap sync          # copies updated HTML to both iOS and Android projects
npx cap open ios      # open Xcode to re-archive
npx cap open android  # open Android Studio to rebuild
```

No need to change any native code — just sync and rebuild.

---

## No-code alternative: Median.co

If you want to avoid the command line entirely:
1. Go to https://median.co
2. Upload your index.html (or host it on GitHub Pages / Netlify first)
3. Median wraps it, builds the iOS/Android binaries in the cloud, and walks you through submission
4. Monthly fee (~$50–100/mo) but zero local setup required

This is the best option if you don't have a Mac (for iOS) or don't want to install Android Studio.
