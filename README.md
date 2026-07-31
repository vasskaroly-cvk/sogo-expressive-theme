# SOGo Expressive Theme (v2.0)

A modern, clean, and elegant **Material 3 Expressive** theme for **SOGo Webmail 5.x**. 

This theme aggressively overrides SOGo's default AngularJS Material engine to deliver a true, modern Workspace experience across all major modules. Version 2.0 introduces a seamless Dark Mode, massive CSS-driven performance optimizations, and intelligent IFrame styling for HTML emails.

### ☀️ Light Mode
![SOGo Expressive Theme Light Preview](sogo-expressive-theme-screenshot.png)

### 🌙 Dark Mode
![SOGo Expressive Theme Dark Preview](sogo-expressive-theme-dark-screenshot.png)

## ✨ Features

- **Seamless Light & Dark Mode:** Built-in theme toggle button injected directly into the SOGo header. Your preference is remembered persistently across sessions.
- **Intelligent IFrame Dark Mode:** Automatically injects a safe, high-contrast dark theme into HTML emails (iframes) without breaking their layout, ensuring a consistent reading experience.
- **Massive Performance Boost (v2.0):** 95% of the DOM manipulations have been moved to pure, dynamically injected CSS. Say goodbye to CPU-heavy JavaScript polling and micro-stutters.
- **Optimized Calendar Capsules:** High-contrast, perfectly rounded event capsules with zero shadow-overlapping issues and crystal-clear typography on vibrant colors.
- **Comprehensive Groupware Support:** Full Material 3 styling extended beyond Webmail to the **Calendar** and **Contacts** modules.
- **Modernized Dialogs & Pop-ups:** Fully restyled event editors, modals, input fields, and action buttons ensuring a consistent UI throughout the application.
- **Floating Card Layout:** Middle list cards and right detail panels float seamlessly above the background canvas with proper 3D flexbox constraints.
- **Capsule Item Selections:** Two-sided rounded capsule selections (`24px` radius) for sidebar folders and list items.
- **Smart Unread Folder Highlighting:** Folders containing unread emails automatically illuminate with a soft ice-blue (or muted navy) capsule and bold typography.
- **Pixel-Perfect Alignment:** All 3 main columns sit aligned on a single, uniform bottom baseline (`16px`).

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

### Option 3: Injection via Web Server (Nginx / Apache) or Custom JS

If you are using a reverse proxy (Nginx or Apache) in front of SOGo, you can automatically inject the JavaScript file into SOGo's HTML output using `sub_filter` or custom Javascript inclusion headers.

Alternatively, add the script to SOGo's `Custom.js` if supported by your SOGo installation.

## 🎨 Color Palette Reference

| Component | Expressive Light | Expressive Dark |
| :--- | :--- | :--- |
| **App Canvas (Background)** | `#f4f7fc` | `#2e3b4b` |
| **Floating Cards & Modals** | `#ffffff` | `#364454` |
| **Active List Capsule** | `#c2e7ff` | `#c2e7ff` (with navy text) |
| **Active Folder Capsule** | `#d3e3fd` | `#ffffff` (with navy text) |
| **Unread Folder Capsule** | `#eaf1fb` | `#3b4b5e` |
| **Primary Text & Headings** | `#041e49` | `#ffffff` |
| **Muted Text & Labels** | `#5f6368` | `#a0b3c6` |
| **Action & Accent Buttons** | `#0b57d0` | `#66b2ff` |

## 🛠️ Tech Stack & Security

- **Target App:** SOGo Groupware 5.x
- **Architecture:** CSS-in-JS overrides mapped to AngularJS/Angular Material 1.x
- **Security:** Fully client-side. Safe CORS/IFrame handling with zero external telemetry or tracking.
- **Browser Compatibility:** Chrome, Edge, Safari, Firefox (Desktop & Mobile view)

## 📜 License

This project is released under the **MIT License**. Feel free to modify, distribute, and use it freely in your self-hosted SOGo installations.