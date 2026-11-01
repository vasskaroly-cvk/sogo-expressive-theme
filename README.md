# SOGo Expressive Theme (v2.5)

A modern, clean, and elegant **Material 3 Expressive** theme for **SOGo Webmail 5.x**. 

This theme transforms SOGo's default AngularJS Material interface into a premier Workspace experience across all groupware modules. Version 2.5 introduces a centered floating theme switcher, refined pastel active and unread folder styling, a complete Calendar grid and modal dialog overhaul, and persistent multi-layer theme synchronization.

### ☀️ Light Mode
![SOGo Expressive Theme Light Preview](sogo-expressive-theme-screenshot.png)

### 🌙 Dark Mode
![SOGo Expressive Theme Dark Preview](sogo-expressive-theme-dark-screenshot.png)

## ✨ Features

- **Centered Floating Theme Toggle (v2.5):** An elegant, circular floating ☀️/🌙 switcher positioned directly in the top header. Seamlessly available across Mail, Calendar, Contacts, and Settings without encroaching on sidebar space.
- **Universal Active Navigation Tracking (v2.5):** Active folders and address books dynamically receive a soft pastel sky-blue (`#cbe6fc` in Light / `#34475e` in Dark) capsule with a sharp 4px focus indicator bar, following your navigation in real time across multilingual setups.
- **Subtle Unread Folder Highlighting (v2.5):** Folders with unread messages automatically illuminate with an ultra-delicate, calm pastel ice-blue tint (`#eef5fd` in Light / `#2b3947` in Dark) and bold typography without competing with the active folder.
- **Calendar & Contacts Modal Dialog Overhaul (v2.5):** Complete visual fix for event and contact editor popups (`md-dialog`). Ensures fully scrollable form contents with a sticky footer so the Save button is always accessible.
- **Calendar Grid Perfection (v2.5):** Restores the clean 3-pane side-by-side flex layout, eliminates inverted dark-mode table grid lines, and ensures readable off-hours scheduling rows.
- **Accurate Quota Progress Bar (v2.5):** Fixed the determinate progress calculation so the account quota bar displays accurate real-world percentages without overflowing or getting stuck at 100%.
- **Seamless Light & Dark Mode Engine:** Fully automatic duplex engine that respects session storage, cookies, or OS system preferences (`prefers-color-scheme`).
- **Intelligent IFrame Dark Mode:** Dynamically injects a clean, non-destructive dark stylesheet into HTML message previews (iframes) and the inline composer, completely preventing blinding white flashes.
- **Global Icon Normalization & Fluid Hover Zoom:** All toolbar, header, card, and secondary action icons automatically adapt to deep navy (`#041e49`) in Light Mode and pure white (`#ffffff`) in Dark Mode, with a smooth 1.18x hover scale animation.
- **Floating 3D Card Architecture:** The message list, calendar view, contacts view, and detail panels float seamlessly above the canvas with unified `20px` border-radii, crisp borders, and a balanced bottom baseline.
- **CKEditor 5 & Compose Dark Mode:** Custom styling for inline mail composing, attachments, recipient chips, and action toolbars.

## 🚀 Installation

### Option 1: Mailcow Dockerized (Recommended)

If you are running Mailcow, you can apply this theme persistently using the built-in custom theme override feature.

1. Save or copy the JavaScript file as `custom-theme.js` inside your Mailcow SOGo configuration directory:
   ```bash
   /opt/mailcow-dockerized/data/conf/sogo/custom-theme.js
   ```

2. Restart the SOGo container to apply the changes:
   ```bash
   docker compose restart sogo-mailcow
   ```

### Option 2: Direct Integration in SOGo WebServerResources

1. Download the `sogo-expressive-theme.js` file from this repository.
2. Place the script inside your SOGo web resources directory:
   ```bash
   /usr/lib/GNUstep/SOGo/WebServerResources/js/sogo-expressive-theme.js
   ```
3. Include the script inside SOGo's HTML template or append it to your custom theme setup.

### Option 3: Injection via Reverse Proxy (Nginx / Apache)

If you are using a reverse proxy in front of SOGo, you can automatically inject the JavaScript file into SOGo's HTML output using `sub_filter` or custom Javascript inclusion headers.

Alternatively, add the script to SOGo's `Custom.js` if supported by your SOGo installation.

## 🎨 Color Palette Reference

| Component | Expressive Light | Expressive Dark |
| :--- | :--- | :--- |
| **App Canvas (Background)** | `#f4f7fc` | `#2e3b4b` |
| **Floating Cards & Modals** | `#ffffff` | `#364454` |
| **Active Folder & Address Book** | `#cbe6fc` *(4px `#0056b3` bar)* | `#34475e` *(4px `#66b2ff` bar)* |
| **Unread Folder Capsule** | `#eef5fd` *(Subtle pastel)* | `#2b3947` *(Subtle slate)* |
| **Active Message Item** | `#dbeafe` *(4px `#0b57d0` bar)* | `#415266` *(4px `#66b2ff` bar)* |
| **Starred Message Item** | `#fef9c3` *(Pastel soft yellow)* | `#423b20` *(Muted amber)* |
| **Primary Text & Headings** | `#002244` / `#041e49` | `#ffffff` |
| **Muted Text & Labels** | `#475569` | `#a0b3c6` |
| **Action & Accent Buttons** | `#041e49` | `#66b2ff` |

## 🛠️ Tech Stack & Security

- **Target App:** SOGo Groupware 5.x
- **Architecture:** Client-side CSS-in-JS overrides mapped to AngularJS/Angular Material 1.x
- **Security:** 100% client-side. Zero external dependencies, fonts, or telemetry trackers.
- **Browser Compatibility:** Chrome, Firefox, Safari, Edge (Desktop & Mobile viewports)

## 📜 License

This project is released under the **MIT License**. Feel free to modify, distribute, and use it freely in your self-hosted SOGo installations.
