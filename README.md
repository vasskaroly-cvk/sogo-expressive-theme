# SOGo Webmail - Modern Expressive Theme (v3.0)
*Material 3 & Thunderbird Edition*

A modern, responsive, and performance-optimized theme for **SOGo Webmail** featuring an intuitive **Material 3 / Thunderbird** aesthetic, **Live Light/Dark Mode switching**, and **Universal HTML Email Color Preservation**.

[![Version](https://img.shields.io/badge/version-3.0-blue.svg)](https://github.com/vasskaroly-cvk/sogo-expressive-theme)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 📸 Screenshots

### ☀️ Light Mode
![SOGo Expressive Theme Light Preview](sogo-expressive-theme-screenshot.png)

### 🌙 Dark Mode
![SOGo Expressive Theme Dark Preview](sogo-expressive-theme-dark-screenshot.png)

---

## ✨ Features

- **🎨 Material 3 & Thunderbird Aesthetics:** Clean card layouts, rounded corners, soft shadows, and refined typography.
- **☀️/🌙 Dynamic Light & Dark Mode:** Instant live switching via floating toggle button without requiring page reloads (`F5`).
- **📧 Universal HTML Email Color Preservation:**
  - Preserves original newsletter colors (e.g. crisp white text on CTA buttons and header bars).
  - Eliminates SOGo's default green/teal link style overrides without touching raw email HTML.
  - Prevents "white-on-white" text issues in Dark Mode.
- **📅 Dark Mode Calendar Event Editor:** Seamless dark styling for `md-dialog`, modals, event editor cards, time/date pickers, and popover menus.
- **✍️ Dark Mode Mail Composer:** Dark dialog UI with a high-contrast white editing canvas (`#ffffff` background with readable `#000000` text).
- **📁 Dark Mode Sidenav & Folder List:** Crisp light-slate (`#e2e8f0`) and white text for folder lists in Dark Mode.
- **⚡ High Performance & Low Overhead:** Uses `MutationObserver` and event-driven triggers instead of resource-intensive DOM polling.

---

## 🚀 Installation & Deployment (Mailcow Docker)

If you are running SOGo via **Mailcow**, copy the theme script directly to Mailcow's custom SOGo configuration directory as `custom-theme.js`:

1. Copy and rename the theme script on your Mailcow server:
   ```bash
   cp sogo-expressive-theme.js /opt/mailcow-dockerized/data/conf/sogo/custom-theme.js
   ```

2. Restart the Mailcow containers to apply the theme:
   ```bash
   docker compose restart sogo-mailcow memcached-mailcow nginx-mailcow
   ```

*(Mailcow automatically mounts `data/conf/sogo/custom-theme.js` into SOGo without requiring additional configuration).*

---

## 🛠️ Configuration & Customization

The theme automatically detects user preference in `localStorage`:
- `sogo_theme`: `'light'` | `'dark'`

Users can switch themes anytime using the floating **Sun/Moon** button at the top of the screen.

---

## 📜 Changelog (v3.0)

- **v3.0 (Final Release):**
  - Instant live Light/Dark mode switching with AngularJS digest integration (`$rootScope.$apply()`).
  - Added universal HTML email color preservation engine for newsletters and CTA buttons.
  - Overhauled Dark Mode Calendar Event Editor modal (removed white frames, whiteframes, and borders).
  - Fixed Dark Mode Mail Composer canvas (white editor with crisp black text).
  - Fixed Dark Mode folder list text visibility in `md-sidenav`.
  - Replaced DOM `dataset` property access with cross-browser `getAttribute`/`setAttribute`.
  - Removed full DOM polling in favor of event-driven `MutationObserver` synchronization.

---

## 👤 Author

**Károly Vass**
- Website: [cvk.hu](https://cvk.hu)
- GitHub: [@vasskaroly-cvk](https://github.com/vasskaroly-cvk)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
