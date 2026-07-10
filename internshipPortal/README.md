# BIAL Internships — Desktop App

This is your `internshipPortal1.html` app wrapped in Electron so it runs as a
standalone desktop window instead of in a browser tab.

## Project structure

```
bial-internship-portal/
├── package.json     # dependencies + npm scripts
├── main.js          # Electron main process (creates the window, menu, save dialogs)
├── preload.js       # secure bridge between the app and Electron (contextIsolation on)
├── index.html        # your original app, unchanged
└── assets/           # put app icons here (optional, see "Icons" below)
```

## Run it

```bash
npm install
npm start
```

That's it — a native window will open with the app running inside it.

## What changed vs. the original HTML file

Functionally, nothing — `index.html` is byte-for-byte your original file. Electron just
loads it in a `BrowserWindow` instead of a browser tab. Two small things were added
around it for a proper desktop feel:

- **External links** (`target="_blank"`, `window.open`, etc.) open in the user's normal
  browser instead of a second app window.
- **"Export to Excel"** (the CSV download button) now pops a native "Save As" dialog
  instead of silently dropping the file in the Downloads folder.

Everything else — login, localStorage data, admin dashboard, applications, dark mode —
works exactly as it did in the browser, since `localStorage` works the same way inside
Electron (it's stored per-app in the OS's app-data folder instead of per-browser-profile).

## Good to know: this app needs internet on first paint

The original HTML loads Tailwind CSS and a Google Font from CDNs at runtime:

```html
<script src="https://cdn.tailwindcss.com"></script>
...
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans...');
```

That's fine for a website, but it means this desktop app will show unstyled content
if launched with no internet connection. I left this as-is since changing it means
touching your styling pipeline — but if you want a fully offline app, the fix is to
pre-compile Tailwind into a local `.css` file and self-host the font files, then swap
those two `<script>`/`<style>` lines in `index.html` for local `<link>` tags. Happy to
do that for you if you'd like a fully offline build.

## Packaging into an installer (optional)

`electron-builder` is already wired up in `package.json`. To build a distributable
installer (`.dmg`, `.exe`, `.AppImage`):

```bash
npm run dist
```

Output lands in `dist/`. If you want proper app icons, drop:
- `assets/icon.icns` (macOS)
- `assets/icon.ico` (Windows)
- `assets/icon.png` (Linux, 512x512 recommended)

and `electron-builder` will pick them up automatically. Without them, it'll just use
Electron's default icon — the app still builds and runs fine.

## Notes on data persistence

All app data (users, applications, interns, session, theme, Google Form URL) is stored
via `localStorage`, same as before. In Electron this data lives in the OS-level
per-app storage location (e.g. `~/Library/Application Support/BIAL Internships` on
macOS, `%APPDATA%/BIAL Internships` on Windows) and will persist across app restarts
and updates, but is tied to this specific packaged app — it won't sync with data from
opening the same HTML file in a regular browser.
