/**
 * ============================================================================
 * SOGo Webmail - Modern Expressive (Material 3) Theme
 * Repository: https://github.com/vasskaroly-cvk/sogo-expressive-theme
 * Version: 2.0.0
 * Author: Károly Vass (cvk.hu)
 * License: MIT
 * 
 * Description: 
 * A complete overhaul of the SOGo Webmail interface bringing Google's Material 3
 * (Expressive) design language. Features include seamless Light/Dark mode, 
 * floating 3D cards, modern pill-shaped highlights, optimized calendar events,
 * and intelligent iframe dark-mode injection for emails.
 * ============================================================================
 */

(function() {
  'use strict';

  angular.module('SOGo.Common')
    .config(configure)
    .run(applyExpressiveTheme);

  /* ======================================================
     1. ANGULAR THEME PALETTA CONFIG
     ====================================================== */
  configure.$inject = ['$mdThemingProvider'];
  function configure($mdThemingProvider) {
    var expressiveBlue = $mdThemingProvider.extendPalette('blue', {
      '50': 'c2e7ff', '100': 'c2e7ff', '200': 'c2e7ff', '300': 'c2e7ff',
      '400': 'c2e7ff', '500': 'c2e7ff', '600': 'c2e7ff', '700': 'c2e7ff',
      '800': 'c2e7ff', '900': 'c2e7ff', 'A100': 'c2e7ff', 'A200': 'c2e7ff',
      'A400': 'c2e7ff', 'A700': 'c2e7ff',
      'contrastDefaultColor': 'dark'
    });
    
    $mdThemingProvider.definePalette('expressiveBlue', expressiveBlue);

    $mdThemingProvider.theme('default')
      .primaryPalette('grey', { 'default': '50' }) 
      .accentPalette('expressiveBlue'); 
      
    $mdThemingProvider.generateThemesOnDemand(false);
  }

  /* ======================================================
     2. DUPLEX TÉMAMOTOR ÉS INTELLIGENS SZINKRONIZÁLÁS
     ====================================================== */
  applyExpressiveTheme.$inject = ['$interval', '$timeout'];
  function applyExpressiveTheme($interval, $timeout) {

    function getThemeColors() {
      var val = null;
      try {
        val = localStorage.getItem('sogo_theme') || 
              localStorage.getItem('theme') || 
              localStorage.getItem('theme_mode') || 
              localStorage.getItem('mailcow_theme');
      } catch(e) {}

      if (!val) {
        try {
          if (window.parent && window.parent !== window && window.parent.localStorage) {
            val = window.parent.localStorage.getItem('sogo_theme') || 
                  window.parent.localStorage.getItem('theme') || 
                  window.parent.localStorage.getItem('theme_mode');
          }
        } catch(e) {}
      }

      if (!val) {
        try {
          var match = document.cookie.match(/(?:^|; )\s*(?:sogo_theme|theme|theme_mode)=([^;]*)/);
          if (match) val = decodeURIComponent(match[1]);
        } catch(e) {}
      }

      var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      var isDark = false;
      if (val === 'dark') isDark = true;
      else if (val === 'light') isDark = false;
      else isDark = prefersDark;

      if (isDark) {
        // SÖTÉT MÓD (Expressive Dark)
        return {
          isDark: true,
          bgMain: '#2e3b4b',          
          bgCard: '#364454',          
          bgHeader: '#273342',        
          bgHover: '#425266',         
          bgActiveFolder: '#ffffff',  
          textActiveFolder: '#041e49',
          bgActivePill: '#c2e7ff',     
          textActivePill: '#041e49',   
          bgUnreadFolder: '#3b4b5e',  
          textMain: '#d3dbe2',        
          textPrimary: '#ffffff',     
          textMuted: '#8b9eb0',       
          accentBtn: '#66b2ff',       
          accentFab: '#66b2ff',       
          fabIcon: '#111a22',         
          border: '#273342'           
        };
      } else {
        // VILÁGOS MÓD (Expressive Light)
        return {
          isDark: false,
          bgMain: '#f4f7fc',
          bgCard: '#ffffff',
          bgHover: '#e8eaed',
          bgActiveFolder: '#d3e3fd',
          textActiveFolder: '#041e49',
          bgActivePill: '#c2e7ff',
          textActivePill: '#041e49',
          bgUnreadFolder: '#eaf1fb',
          textMain: '#202124',
          textPrimary: '#041e49',
          textMuted: '#5f6368',
          accentBtn: '#0b57d0',
          accentFab: '#c2e7ff',
          fabIcon: '#001d35',
          border: '#f1f3f4'
        };
      }
    }

    function isMessageSelected(item) {
      if (!item) return false;
      return (item.classList.contains('md-bg') && item.classList.contains('md-hue-2')) ||
             item.classList.contains('sg-message-selected') ||
             item.classList.contains('md-active') ||
             item.classList.contains('sg-item-selected') ||
             item.classList.contains('sg-selected') ||
             item.getAttribute('aria-selected') === 'true' ||
             item.querySelector('.md-bg.md-hue-2, .sg-message-selected, .md-active, .sg-item-selected, .sg-selected, [aria-selected="true"]') !== null;
    }

    function isMessageStarred(item) {
      if (!item) return false;
      return item.classList.contains('sg-star-bg') || item.querySelector('.sg-star-bg') !== null;
    }

    function isFolderSelected(folder) {
      if (!folder) return false;
      return folder.classList.contains('md-active') ||
             folder.classList.contains('sg-item-selected') ||
             folder.classList.contains('sg-folder-selected') ||
             folder.getAttribute('aria-selected') === 'true' ||
             folder.querySelector('.md-active, .sg-item-selected, .sg-folder-selected, [aria-selected="true"]') !== null;
    }

    function injectPersistentStyle() {
      var colors = getThemeColors();
      
      if (colors.isDark) {
        document.documentElement.classList.remove('sogo-light');
        document.documentElement.classList.add('sogo-dark');
      } else {
        document.documentElement.classList.remove('sogo-dark');
        document.documentElement.classList.add('sogo-light');
      }

      var styleId = 'sogo-expressive-theme-v2';
      var style = document.getElementById(styleId);

      if (!style) {
        style = document.createElement('style');
        style.id = styleId;
        document.head.appendChild(style);
      } else {
        if (document.head.lastElementChild !== style) {
          document.head.appendChild(style);
        }
      }

      var shadow3D = colors.isDark 
        ? '0 12px 32px rgba(0, 0, 0, 0.75), 0 0 24px rgba(255, 255, 255, 0.22), 0 2px 8px rgba(255, 255, 255, 0.15)' 
        : '0 12px 28px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.08)';

      style.textContent = `
        /* =========================================
           1. ALAP HÁTTÉR ÉS A GYÖKÉR PADLÓ-GÁT
           ========================================= */
        html, body {
            background-color: ${colors.bgMain} !important;
            height: 100vh !important;
            max-height: 100vh !important;
            border-bottom: 16px solid ${colors.bgMain} !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            color: ${colors.textMain} !important;
        }

        .sg-main-view, [ui-view="main"], .sg-main-container,
        .layout-row, .layout-column {
            background-color: ${colors.bgMain} !important;
            box-sizing: border-box !important;
        }

        md-toolbar, .sg-header md-toolbar {
            background-color: ${colors.bgMain} !important;
            color: ${colors.textMain} !important;
            box-shadow: none !important;
        }

        /* =========================================
           2. A NAGY DOBOZOK FORMÁJA ÉS EGYENES ALSÓ ALAPVONALA
           ========================================= */
        [ui-view="list"], [ui-view="detail"], [ui-view="calendars"], [ui-view="calendar"], [ui-view="contacts"] {
            background-color: transparent !important;
            background: transparent !important;
            box-sizing: border-box !important;
            padding-bottom: 0 !important;
            margin-bottom: 0 !important;
            overflow: visible !important;
        }

        [id="messagesList"], 
        [id="contactsList"],
        .sg-list,
        .sg-contacts-list,
        [id="messagesList"] md-content,
        [id="contactsList"] md-content,
        .sg-list md-content {
            background-color: ${colors.bgCard} !important;
            border-radius: 24px !important;
            margin: 8px 4px 0px 6px !important;
            height: calc(100% - 8px) !important;
            max-height: calc(100% - 8px) !important;
            box-shadow: ${shadow3D} !important;
            overflow: hidden !important;
            border: none !important;
            box-sizing: border-box !important;
            color: ${colors.textMain} !important;
        }

        md-card,
        [id="mailView"],
        [id="messageView"],
        [id="contactView"],
        [id="cardView"],
        .sg-mail-view, 
        .sg-record-view,
        .sg-contact-view,
        .sg-card-view,
        md-card md-content,
        .sg-mail-view md-content {
            background-color: ${colors.bgCard} !important;
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
            border-bottom-left-radius: 24px !important;
            border-bottom-right-radius: 24px !important;
            margin: 0 12px 0px 4px !important;
            height: 100% !important;
            max-height: 100% !important;
            box-shadow: ${shadow3D} !important;
            overflow: hidden !important;
            border: none !important;
            box-sizing: border-box !important;
            color: ${colors.textMain} !important;
        }

        .sg-mail-body:after,
        .sg-mail-container:after,
        .sg-mail-view:after,
        [id="mailView"]:after,
        md-card:after,
        md-card md-content:after {
            content: ' ' !important;
            display: block !important;
            height: 12px !important; 
            min-height: 12px !important;
            width: 100% !important;
            clear: both !important;
        }

        .sg-mail-body,
        .sg-mail-container,
        .sg-mail-view md-content,
        md-card md-content,
        iframe#messageFrame,
        iframe {
            padding-bottom: 12px !important; 
            margin-bottom: 12px !important;
            box-sizing: border-box !important;
        }

        .sg-list md-toolbar, [id="messagesList"] md-toolbar, [id="contactsList"] md-toolbar {
            background-color: ${colors.bgCard} !important;
            border-bottom: 1px solid ${colors.border} !important;
            border-top-left-radius: 24px !important;
            border-top-right-radius: 24px !important;
            color: ${colors.textMain} !important;
        }

        .sg-mail-view md-toolbar, [id="mailView"] md-toolbar, md-card md-toolbar, .sg-contact-view md-toolbar {
            background-color: ${colors.bgCard} !important;
            border-bottom: 1px solid ${colors.border} !important;
            border-radius: 0 !important;
            color: ${colors.textMain} !important;
        }

        .sg-mail-headers, .sg-mail-subject, .sg-mail-header-values {
            color: ${colors.textMain} !important;
        }

        .sg-mail-headers *,
        .sg-mail-headers .sg-mail-header-labels,
        .sg-mail-headers .sg-mail-header-labels *,
        .sg-mail-headers .sg-mail-header-label,
        .sg-mail-headers .md-caption,
        .sg-mail-headers label,
        .sg-mail-header-labels,
        .sg-mail-header-labels *,
        .sg-mail-header-label,
        #mailView .md-caption,
        #messageView .md-caption,
        .sg-mail-view .md-caption {
            color: ${colors.isDark ? '#a0b3c6' : '#5f6368'} !important;
        }

        .sg-mail-headers a, .sg-mail-header-values a, .sg-mail-view a, md-card a {
            color: ${colors.accentBtn} !important;
            text-decoration: underline !important;
        }

        .sg-mail-headers .md-chip,
        .sg-mail-headers .sg-chip,
        .sg-chip,
        md-chips md-chip {
            background-color: ${colors.isDark ? '#2d4257' : '#e0e0e0'} !important;
            color: ${colors.textMain} !important;
            border: 1px solid ${colors.border} !important;
        }

        .sg-mail-headers .md-chip *,
        md-chips md-chip * {
            color: ${colors.textMain} !important;
        }

        /* =========================================
           3. OLDALSÁV ÉS MAPPA KIJELÖLÉS FIX
           ========================================= */
        md-sidenav,
        md-sidenav.md-locked-open,
        md-sidenav md-content,
        md-sidenav md-content.md-default-theme,
        .sg-calendar-sidebar,
        .sg-contacts-sidebar,
        .sg-folder-list {
            background-color: ${colors.bgMain} !important;
            background: ${colors.bgMain} !important;
            border: none !important;
            border-right: none !important;
            box-shadow: none !important;
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
            border-bottom-left-radius: 24px !important;
            border-bottom-right-radius: 24px !important;
            margin-bottom: 0 !important;
            height: 100% !important;
            max-height: 100% !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
        }

        md-sidenav md-subheader,
        md-sidenav .md-subheader,
        md-sidenav .md-subheader-inner,
        md-sidenav md-list,
        md-sidenav .sg-calendar-list,
        md-sidenav .sg-contacts-list,
        md-sidenav .sg-category {
            background-color: transparent !important;
            background: transparent !important;
            box-shadow: none !important;
            border: none !important;
        }

        md-sidenav md-subheader .md-subheader-inner,
        md-sidenav .md-subheader {
            color: ${colors.textMuted} !important;
            font-weight: 700 !important;
            font-size: 12px !important;
        }

        md-sidenav md-list-item {
            margin: 2px 12px !important;
            width: calc(100% - 24px) !important;
            border-radius: 24px !important;
        }
        
        md-sidenav md-list-item .md-button,
        md-sidenav md-list-item .md-no-style {
            border-radius: 24px !important;
        }
        
        md-sidenav md-list-item:hover { 
            background-color: ${colors.bgHover} !important; 
        }

        md-sidenav md-list-item.md-active,
        md-sidenav md-list-item.sg-item-selected,
        md-sidenav md-list-item.sg-folder-selected,
        md-sidenav md-list-item.md-active .md-button,
        md-sidenav md-list-item.sg-item-selected .md-button,
        md-sidenav md-list-item.md-active .md-no-style,
        md-sidenav md-list-item.sg-item-selected .md-no-style,
        .sg-folder-list md-list-item.md-active,
        .sg-folder-list md-list-item.md-active .md-button {
            background-color: ${colors.bgActiveFolder} !important; 
            background: ${colors.bgActiveFolder} !important; 
        }

        md-sidenav md-list-item.md-active *,
        md-sidenav md-list-item.sg-item-selected *,
        md-sidenav md-list-item.sg-folder-selected *,
        md-sidenav md-list-item.md-active md-icon,
        md-sidenav md-list-item.sg-item-selected md-icon,
        md-sidenav md-list-item.md-active md-icon svg,
        md-sidenav md-list-item.sg-item-selected md-icon svg {
            color: ${colors.textActiveFolder} !important;
            fill: ${colors.textActiveFolder} !important;
            font-weight: 700 !important;
        }

        md-sidenav md-list-item.sg-unread:not(.md-active):not(.sg-item-selected),
        md-sidenav md-list-item.sg-folder-unread:not(.md-active):not(.sg-item-selected),
        md-sidenav md-list-item:has(.sg-badge):not(.md-active):not(.sg-item-selected),
        md-sidenav md-list-item:has(.md-secondary):not(.md-active):not(.sg-item-selected) {
            background-color: ${colors.bgUnreadFolder} !important;
        }

        md-sidenav .sg-filter-input,
        md-sidenav md-toolbar.sg-filter-toolbar,
        md-sidenav form.sg-filter,
        md-sidenav [layout="row"]:has(input),
        md-sidenav form,
        md-sidenav .md-toolbar-tools:has(input) {
            background-color: ${colors.bgUnreadFolder} !important;
            background: ${colors.bgUnreadFolder} !important;
            border-radius: 24px !important;
            margin: 8px 12px !important;
            padding: 2px 12px !important;
            color: ${colors.textPrimary} !important;
            border: none !important;
            box-shadow: none !important;
        }

        md-sidenav input,
        md-sidenav input::placeholder,
        .sg-filter-input,
        .sg-filter-input::placeholder,
        form.sg-filter input,
        form.sg-filter input::placeholder,
        .sg-calendar-sidebar input,
        .sg-calendar-sidebar input::placeholder,
        input::placeholder {
            color: ${colors.isDark ? '#a0b3c6' : '#5f6368'} !important;
            opacity: 0.9 !important;
            background-color: transparent !important;
        }

        md-sidenav md-list-item *,
        md-sidenav md-list-item md-icon,
        md-sidenav md-list-item md-icon svg {
            color: ${colors.textMuted} !important;
            fill: ${colors.textMuted} !important;
            font-weight: 500 !important;
        }

        md-switch, md-switch *, md-checkbox, md-checkbox * {
            background-color: initial !important;
            border-color: initial !important;
        }

        /* =========================================
           4. LEVÉLLISTA KAPSZULÁK ÉS KIEMELÉSEK
           ========================================= */
        [id="messagesList"] md-list-item,
        [id="messagesList"] .sg-tile,
        [id="messagesList"] .sg-list-item,
        [id="contactsList"] md-list-item,
        [id="contactsList"] .sg-tile,
        [id="contactsList"] .sg-list-item,
        .sg-contacts-list md-list-item,
        .sg-list md-list-item {
            margin: 2px 10px !important;
            width: calc(100% - 20px) !important;
            max-width: calc(100% - 20px) !important;
            border-radius: 24px !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            transition: background-color 0.2s ease !important;
            color: ${colors.textMain} !important;
        }

        .sg-list md-list-item:not(.md-bg):not(.md-active):not(.sg-item-selected):not(.sg-message-selected):not(.sg-star-bg) *,
        .sg-list .sg-tile:not(.md-bg):not(.md-active):not(.sg-item-selected):not(.sg-message-selected):not(.sg-star-bg) *,
        [id="messagesList"] md-list-item:not(.md-bg):not(.md-active):not(.sg-item-selected):not(.sg-message-selected):not(.sg-star-bg) *,
        [id="messagesList"] .sg-tile:not(.md-bg):not(.md-active):not(.sg-item-selected):not(.sg-message-selected):not(.sg-star-bg) * {
            color: ${colors.textMain} !important;
        }

        [id="messagesList"] .sg-md-caption,
        [id="messagesList"] .sg-date,
        [id="messagesList"] .sg-size,
        [id="messagesList"] .sg-tile-subtitle,
        [id="messagesList"] .sg-snippet,
        .sg-list .sg-date,
        .sg-list .sg-size {
            color: ${colors.textMuted} !important;
        }

        [id="messagesList"] md-list-item:hover,
        [id="messagesList"] .sg-tile:hover,
        [id="contactsList"] md-list-item:hover,
        [id="contactsList"] .sg-tile:hover { 
            background-color: ${colors.bgHover} !important; 
        }

        [id="messagesList"] md-list-item.md-bg.md-hue-2,
        [id="messagesList"] md-list-item.md-active,
        [id="messagesList"] md-list-item.sg-item-selected,
        [id="messagesList"] md-list-item.sg-message-selected,
        [id="messagesList"] md-list-item[aria-selected="true"],
        [id="messagesList"] .sg-tile.md-active,
        [id="messagesList"] .sg-tile.sg-item-selected,
        .sg-list md-list-item.md-bg.md-hue-2,
        .sg-list md-list-item.md-active,
        .sg-list md-list-item.sg-item-selected,
        .sg-list md-list-item.sg-message-selected {
            background-color: ${colors.bgActivePill} !important;
            background: ${colors.bgActivePill} !important;
        }

        .md-bg.md-hue-2 *,
        .sg-message-selected *,
        [id="messagesList"] md-list-item.md-bg.md-hue-2 *,
        [id="messagesList"] md-list-item.md-active *,
        [id="messagesList"] md-list-item.sg-item-selected *,
        [id="messagesList"] md-list-item.sg-message-selected *,
        [id="messagesList"] md-list-item[aria-selected="true"] *,
        [id="messagesList"] .sg-tile.md-active *,
        [id="messagesList"] .sg-tile.sg-item-selected *,
        .sg-list md-list-item.md-bg.md-hue-2 *,
        .sg-list md-list-item.md-active *,
        .sg-list md-list-item.sg-item-selected *,
        .sg-list md-list-item.sg-message-selected * {
            color: #041e49 !important;
            fill: #041e49 !important;
        }

        [id="messagesList"] md-list-item.sg-star-bg:not(.md-bg),
        .sg-list md-list-item.sg-star-bg:not(.md-bg) {
            background-color: #fef08a !important;
            background: #fef08a !important;
        }

        [id="messagesList"] md-list-item.sg-star-bg *,
        .sg-list md-list-item.sg-star-bg *,
        .sg-star-bg .md-button,
        .sg-star-bg .md-no-style,
        .sg-star-bg button,
        .sg-star-bg .md-list-item-inner,
        .sg-star-bg .sg-tile-content {
            color: #041e49 !important;
            fill: #041e49 !important;
        }

        /* =========================================
           5. NAPTÁR ESEMÉNYEK KAPSZULA ÉS LISTA KINÉZET JAVÍTÁS
           ========================================= */
        
        /* ALAPVETŐ FORMA ÉS ÁRNYÉK MINDEN ESEMÉNYRE (Középső lista ÉS jobb oldali rács) */
        .sg-calendar-event-list .sg-tile,
        .sg-calendar-event-list md-list-item,
        .sg-calendar-event,
        .sg-event,
        .sg-calendar-event-tile,
        .sg-event-tile,
        .sg-event-chip {
            border-radius: 8px !important;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4) !important;
            border: none !important;
            overflow: hidden !important; /* Vágja a kilógó sávokat */
        }

        /* KÜLÖN BEÁLLÍTÁS A KÖZÉPSŐ OSZLOP (AGENDA) LISTAELEMEIRE */
        .sg-calendar-event-list .sg-tile,
        .sg-calendar-event-list md-list-item {
            height: auto !important;
            max-height: none !important;
            min-height: 0 !important;
            padding: 6px 10px !important;
            margin: 4px 8px !important;
            box-sizing: border-box !important;
        }

        /* A BELSŐ ELEMEK VÉDELME: Ne kapjanak saját árnyékot, ami "szellemképessé" teszi őket */
        .sg-calendar-event *,
        .sg-event *,
        .sg-calendar-event-list .sg-tile *,
        .sg-calendar-event-list md-list-item *,
        .sg-event-chip * {
            box-shadow: none !important;
            border-radius: 0 !important;
            line-height: 1.2 !important;
        }
        
        .sg-calendar-event-list .sg-tile *,
        .sg-calendar-event-list md-list-item * {
            margin: 0 !important;
        }

        /* SZÖVEGEK ÉS IKONOK KONTRAZTJA (Hogy a világos zöld/sárga naptárszíneken is olvasható legyen) */
        .sg-calendar-event-list .sg-tile *,
        .sg-calendar-event-title,
        .sg-calendar-event-location,
        .sg-event-title,
        .sg-event-time,
        .sg-event .md-caption,
        .sg-event .md-body-1 {
            color: #ffffff !important;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7) !important;
            font-weight: 500 !important;
        }

        /* Ikonok árnyékolása (pl. helyszín ikon) */
        .sg-calendar-event-list md-icon,
        .sg-calendar-event md-icon,
        .sg-event md-icon {
            color: #ffffff !important;
            fill: #ffffff !important;
            filter: drop-shadow(0 1px 2px rgba(0,0,0,0.7)) !important;
        }

        /* =========================================
           6. CKEDITOR 5 INLINE SZERKESZTŐ (COMPOSE) DARK MODE
           ========================================= */
        .ck.ck-toolbar,
        .ck.ck-toolbar_grouping,
        .ck.ck-sticky-panel__content,
        .ck.ck-editor__top,
        .ck.ck-reset_all {
            background-color: ${colors.bgHeader} !important;
            background: ${colors.bgHeader} !important;
            border-color: ${colors.border} !important;
            color: ${colors.textMain} !important;
        }

        .ck.ck-toolbar .ck-button,
        .ck.ck-toolbar .ck-button *,
        .ck.ck-toolbar .ck-dropdown__button,
        .ck.ck-toolbar .ck-dropdown__button * {
            color: ${colors.textMain} !important;
            fill: ${colors.textMain} !important;
        }

        .ck.ck-toolbar .ck-button:hover,
        .ck.ck-toolbar .ck-dropdown__button:hover {
            background-color: ${colors.bgHover} !important;
        }

        .ck.ck-editor__main,
        .ck.ck-editor__editable,
        .ck.ck-editor__editable_inline,
        .ck.ck-content,
        div.ck-editor__editable,
        div.ck-content,
        [contenteditable="true"].ck-content,
        [contenteditable="true"].ck-editor__editable {
            background-color: ${colors.bgCard} !important;
            background: ${colors.bgCard} !important;
            color: #ffffff !important;
            border-color: ${colors.border} !important;
        }

        .ck-content p,
        .ck-content div,
        .ck-content span,
        .ck-content h1,
        .ck-content h2,
        .ck-content h3,
        .ck-content h4,
        .ck-content ul,
        .ck-content ol,
        .ck-content li,
        .ck-content blockquote,
        .ck-editor__editable p,
        .ck-editor__editable div,
        .ck-editor__editable span {
            color: #ffffff !important;
            background-color: transparent !important;
        }

        .sg-mail-compose input,
        .sg-mail-compose textarea,
        .sg-mail-compose md-select,
        .sg-mail-compose .md-select-value {
            color: ${colors.textPrimary} !important;
        }

        /* =========================================
           7. NAPTÁR (CALENDARS) GÖRGETÉS ÉS SÖTÉT MÓD FIX
           ========================================= */
        .sg-calendar-container,
        [ui-view="calendars"] .sg-calendar-container,
        [ui-view="calendar"] .sg-calendar-container {
            display: flex !important;
            flex-direction: row !important;
            height: 100% !important;
            max-height: 100% !important;
            min-height: 0 !important;
            overflow: hidden !important;
        }

        #calendarView,
        .sg-calendar-view,
        [ui-view="calendars"],
        [ui-view="calendar"] {
            display: flex !important;
            flex-direction: column !important;
            flex: 1 1 0% !important;
            min-width: 0 !important;
            min-height: 0 !important;
            height: 100% !important;
            max-height: 100% !important;
            background-color: ${colors.bgCard} !important;
            border-radius: 24px !important;
            box-shadow: ${shadow3D} !important;
            overflow: hidden !important;
        }

        #calendarView md-content,
        .sg-calendar-view md-content,
        .sg-calendar-container md-content,
        .sg-calendar-view-content,
        .sg-calendar-scroll-view,
        .sg-calendar-body,
        .sg-calendar-grid,
        .sg-calendar-hours-scroll,
        .sg-day-view,
        .sg-week-view,
        .sg-month-view {
            flex: 1 1 0% !important;
            min-height: 0 !important;
            height: 100% !important;
            max-height: 100% !important;
            overflow: auto !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
            -webkit-overflow-scrolling: touch !important;
            background-color: ${colors.bgCard} !important;
            background: ${colors.bgCard} !important;
        }

        html.sogo-dark [ui-view="calendars"] .dayLabels,
        html.sogo-dark [ui-view="calendars"] .dayLabels *,
        html.sogo-dark [ui-view="calendars"] .day,
        html.sogo-dark [ui-view="calendars"] .day *,
        html.sogo-dark [ui-view="calendars"] .md-fg,
        html.sogo-dark [ui-view="calendars"] .md-primary,
        html.sogo-dark [ui-view="calendars"] .md-hue-2,
        html.sogo-dark .sg-calendar-header,
        html.sogo-dark .sg-calendar-header *,
        html.sogo-dark .sg-calendar-title,
        html.sogo-dark .sg-calendar-title *,
        html.sogo-dark .sg-calendar-date,
        html.sogo-dark .sg-calendar-date *,
        html.sogo-dark .sg-day-view .md-headline,
        html.sogo-dark .sg-day-view h1,
        html.sogo-dark .sg-day-view h2,
        html.sogo-dark .sg-day-view div {
            color: #ffffff !important;
        }

        html.sogo-dark [ui-view="calendars"] .hours,
        html.sogo-dark [ui-view="calendars"] .hours *,
        html.sogo-dark [ui-view="calendars"] .hour,
        html.sogo-dark .hours,
        html.sogo-dark .hours *,
        html.sogo-dark .hour,
        html.sogo-dark .sg-calendar-hour-header,
        html.sogo-dark .sg-calendar-hour-header *,
        html.sogo-dark .sg-calendar-hours,
        html.sogo-dark .sg-calendar-hours *,
        html.sogo-dark .sg-calendar-hour,
        html.sogo-dark .sg-calendar-time {
            color: #d3dbe2 !important;
            fill: #d3dbe2 !important;
        }

        html.sogo-dark #calendarView md-toolbar,
        html.sogo-dark #calendarView md-toolbar *,
        html.sogo-dark .sg-calendar-view md-toolbar,
        html.sogo-dark .sg-calendar-view md-toolbar *,
        html.sogo-dark [ui-view="calendars"] md-toolbar,
        html.sogo-dark [ui-view="calendars"] md-toolbar *,
        .md-datepicker-input,
        .md-datepicker-input-container input,
        .md-datepicker-value,
        .md-datepicker-value span,
        .md-datepicker-button,
        button.md-datepicker-button {
            color: #ffffff !important;
            fill: #ffffff !important;
            background-color: transparent !important;
        }

        html.sogo-dark .sg-calendar-sidebar,
        html.sogo-dark .sg-calendar-sidebar *,
        html.sogo-dark .sg-calendar-list,
        html.sogo-dark .sg-calendar-list *,
        html.sogo-dark md-sidenav .sg-category,
        html.sogo-dark md-sidenav .md-subheader,
        html.sogo-dark md-sidenav .md-subheader *,
        html.sogo-dark md-sidenav md-list-item,
        html.sogo-dark md-sidenav md-list-item * {
            color: #d3dbe2 !important;
        }

        html.sogo-dark md-sidenav .md-subheader .md-subheader-inner {
            color: #8b9eb0 !important;
            font-weight: 700 !important;
        }

        html.sogo-dark .sg-calendar-event-list *,
        html.sogo-dark md-tabs *,
        html.sogo-dark md-tab-item,
        html.sogo-dark md-tab-item *,
        html.sogo-dark .sg-calendar-view .md-subheader,
        html.sogo-dark .sg-calendar-view .md-subheader *,
        html.sogo-dark [ui-view="list"] .md-subheader,
        html.sogo-dark [ui-view="list"] .md-subheader * {
            color: #d3dbe2 !important;
        }

        html.sogo-dark [ui-view="calendars"] .calendarView,
        html.sogo-dark [ui-view="calendars"] .hours,
        html.sogo-dark [ui-view="calendars"] .day,
        html.sogo-dark [ui-view="calendars"] .days,
        html.sogo-dark [ui-view="calendars"] .allDaysView,
        html.sogo-dark [ui-view="calendars"] .allDaysView--,
        html.sogo-dark [ui-view="calendars"] .allDaysView--container,
        html.sogo-dark [ui-view="calendars"] .allDaysView--expanded,
        html.sogo-dark [ui-view="calendars"] td,
        html.sogo-dark [ui-view="calendars"] tr,
        html.sogo-dark [ui-view="calendars"] table,
        html.sogo-dark .sg-calendar-allday,
        html.sogo-dark .sg-day-view,
        html.sogo-dark .sg-week-view,
        html.sogo-dark .sg-month-view,
        html.sogo-dark .sg-calendar-hours,
        html.sogo-dark .sg-calendar-grid,
        html.sogo-dark .sg-calendar-body {
            background-color: ${colors.bgCard} !important;
            background: ${colors.bgCard} !important;
            border-color: ${colors.border} !important;
        }

        /* =========================================
           8. FELUGRÓ ABLAKOK (MD-DIALOG / ÚJ BEJEGYZÉS) DARK MODE
           ========================================= */
        md-dialog,
        .md-dialog-container,
        md-dialog-content,
        .sg-event-editor,
        .sg-event-dialog,
        form[name="eventForm"],
        md-dialog form,
        md-dialog div,
        md-dialog fieldset,
        md-dialog .layout-row,
        md-dialog .layout-column {
            background-color: ${colors.bgCard} !important;
            background: ${colors.bgCard} !important;
            color: ${colors.textMain} !important;
            border-color: ${colors.border} !important;
        }

        md-dialog .md-dialog-content,
        md-dialog md-dialog-content,
        md-dialog md-input-container,
        md-dialog md-content {
            background-color: ${colors.bgCard} !important;
            background: ${colors.bgCard} !important;
            border-color: ${colors.border} !important;
        }

        md-dialog input,
        md-dialog textarea,
        md-dialog md-select,
        md-dialog md-select-value,
        md-dialog .md-select-value,
        md-dialog label,
        md-dialog span,
        md-dialog div,
        md-dialog p,
        md-dialog md-radio-button .md-label,
        md-dialog md-checkbox .md-label,
        md-dialog .md-subhead,
        md-dialog .md-caption {
            color: ${colors.textPrimary} !important;
        }

        md-dialog md-input-container label,
        md-dialog md-input-container .md-placeholder,
        md-dialog ::placeholder {
            color: ${colors.textMuted} !important;
        }

        md-dialog md-input-container .md-input,
        md-dialog input.md-input {
            border-color: ${colors.border} !important;
            color: ${colors.textPrimary} !important;
            background-color: transparent !important;
        }

        md-dialog md-radio-button .md-off,
        md-dialog md-checkbox .md-icon {
            border-color: ${colors.textMuted} !important;
        }

        md-dialog md-dialog-actions,
        md-dialog .md-actions,
        md-dialog-actions {
            background-color: ${colors.bgCard} !important;
            border-top: 1px solid ${colors.border} !important;
            padding: 12px 16px !important;
        }

        md-dialog md-dialog-actions button,
        md-dialog .md-actions button,
        md-dialog button.md-button,
        md-dialog-actions button.md-button {
            color: ${colors.accentBtn} !important; 
            font-weight: 700 !important;
            border-radius: 20px !important;
        }

        /* =========================================
           9. FOGASKERÉK, KVÓTA ÉS SCROLLBAR
           ========================================= */
        .sg-user-info, .sg-user-info *, .sg-user-name, 
        .sg-md-caption, md-sidenav .md-caption, .sg-quota-label, .sg-quota-info {
            color: ${colors.textMuted} !important; 
        }
        
        md-sidenav md-toolbar md-icon,
        md-sidenav md-toolbar md-icon svg,
        md-sidenav md-toolbar button md-icon,
        md-sidenav md-toolbar button md-icon svg,
        .sg-user-info md-icon, 
        .sg-user-info md-icon svg {
            color: ${colors.textPrimary} !important;
            fill: ${colors.textPrimary} !important;
            opacity: 1 !important; 
        }
        
        md-progress-linear .md-container {
            background-color: ${colors.bgUnreadFolder} !important; 
            border-radius: 4px !important;
        }
        md-progress-linear .md-bar {
            background-color: ${colors.accentBtn} !important; 
            border-radius: 4px !important;
        }

        button.md-fab {
            background-color: ${colors.accentFab} !important;
            border-radius: 16px !important;
        }
        button.md-fab md-icon { 
            color: ${colors.fabIcon} !important; 
            fill: ${colors.fabIcon} !important;
        }
        
        ::-webkit-scrollbar { width: 8px !important; height: 8px !important; }
        ::-webkit-scrollbar-track { background: transparent !important; }
        ::-webkit-scrollbar-thumb { background: ${colors.border} !important; border-radius: 4px !important; }

        /* ====================================================================
           SÖTÉT MÓD JAVÍTÁSOK (Expressive Dark)
           ========================================= */
        
        #sogo-theme-toggle-btn { outline: none !important; box-shadow: none !important; }
        #sogo-theme-toggle-btn:focus { outline: none !important; box-shadow: none !important; }

        ${colors.isDark ? `
        html.sogo-dark .md-subheader.md-default-theme,
        html.sogo-dark .md-subheader {
            background-color: ${colors.bgCard} !important;
            color: ${colors.textMain} !important;
        }
        html.sogo-dark .md-subheader .md-subheader-inner,
        html.sogo-dark .md-subheader .md-subheader-content {
            background-color: transparent !important;
            color: ${colors.textMain} !important;
        }

        html.sogo-dark md-toolbar md-icon,
        html.sogo-dark md-toolbar md-icon svg,
        html.sogo-dark .sg-header md-icon,
        html.sogo-dark .sg-header md-icon svg,
        html.sogo-dark button.md-icon-button md-icon,
        html.sogo-dark button.md-icon-button md-icon svg,
        html.sogo-dark md-card-actions md-icon,
        html.sogo-dark md-card-actions md-icon svg,
        html.sogo-dark md-card-actions .material-icons,
        html.sogo-dark md-card-actions button,
        html.sogo-dark md-fab-speed-dial md-icon,
        html.sogo-dark md-fab-speed-dial md-icon svg,
        html.sogo-dark #detailView md-icon,
        html.sogo-dark #detailView md-icon svg,
        html.sogo-dark #mailView md-icon,
        html.sogo-dark #mailView md-icon svg,
        html.sogo-dark .sg-card-actions md-icon,
        html.sogo-dark .sg-card-actions md-icon svg {
            color: #ffffff !important;
            fill: #ffffff !important;
            opacity: 1 !important;
        }
        ` : ''}
      `;
    }

    function injectThemeToggleButton() {
      if (document.getElementById('sogo-theme-toggle-btn')) return;

      var targetContainer = document.querySelector('.sg-user-info') || document.querySelector('md-sidenav md-toolbar') || document.querySelector('.sg-header md-toolbar');
      if (targetContainer) {
        var btn = document.createElement('button');
        btn.id = 'sogo-theme-toggle-btn';
        btn.type = 'button';
        btn.style.cssText = 'margin-left: 8px; cursor: pointer; border: none; background: transparent; font-size: 16px; padding: 4px 8px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; transition: transform 0.2s;';
        
        var colors = getThemeColors();
        btn.innerHTML = colors.isDark ? '☀️' : '🌙';
        btn.title = colors.isDark ? 'Váltás Expressive Light módra' : 'Váltás Expressive Dark módra';

        btn.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          var isDarkNow = getThemeColors().isDark;
          var newTheme = isDarkNow ? 'light' : 'dark';
          
          try {
            localStorage.setItem('sogo_theme', newTheme);
            localStorage.setItem('theme', newTheme);
            localStorage.setItem('theme_mode', newTheme);
            if (window.parent && window.parent.localStorage) {
              window.parent.localStorage.setItem('sogo_theme', newTheme);
              window.parent.localStorage.setItem('theme', newTheme);
            }
          } catch(err) {}

          btn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
          btn.title = newTheme === 'dark' ? 'Váltás Expressive Light módra' : 'Váltás Expressive Dark módra';

          injectPersistentStyle();
          enforceUniformCardBaseline();
          syncActiveItemsAndFolders();
        };

        targetContainer.appendChild(btn);
      }
    }

    function enforceUniformCardBaseline() {
      var colors = getThemeColors();

      var shadow3D = colors.isDark 
        ? '0 12px 32px rgba(0, 0, 0, 0.75), 0 0 24px rgba(255, 255, 255, 0.22), 0 2px 8px rgba(255, 255, 255, 0.15)' 
        : '0 12px 28px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.08)';

      document.documentElement.style.setProperty('border-bottom', '16px solid ' + colors.bgMain, 'important');
      document.body.style.setProperty('border-bottom', '16px solid ' + colors.bgMain, 'important');

      var parentContainers = document.querySelectorAll('[ui-view="list"], [ui-view="detail"], [ui-view="contacts"]');
      for (var p = 0; p < parentContainers.length; p++) {
        parentContainers[p].style.setProperty('overflow', 'visible', 'important');
      }

      var sideNavs = document.querySelectorAll('md-sidenav, md-sidenav.md-locked-open, md-sidenav md-content, .sg-calendar-sidebar, .sg-contacts-sidebar, .sg-folder-list');
      for (var s = 0; s < sideNavs.length; s++) {
        var sn = sideNavs[s];
        sn.style.setProperty('background-color', colors.bgMain, 'important');
        sn.style.setProperty('background', colors.bgMain, 'important');
        sn.style.setProperty('border', 'none', 'important');
        sn.style.setProperty('border-right', 'none', 'important');
        sn.style.setProperty('border-top-left-radius', '0px', 'important');
        sn.style.setProperty('border-top-right-radius', '0px', 'important');
        sn.style.setProperty('border-bottom-left-radius', '24px', 'important');
        sn.style.setProperty('border-bottom-right-radius', '24px', 'important');
        sn.style.setProperty('margin-bottom', '0px', 'important');
        sn.style.setProperty('height', '100%', 'important');
        sn.style.setProperty('max-height', '100%', 'important');
        sn.style.setProperty('overflow', 'hidden', 'important');
      }

      var subHeaders = document.querySelectorAll('md-sidenav md-subheader, md-sidenav .md-subheader, md-sidenav .md-subheader-inner, md-sidenav md-list, md-sidenav .sg-calendar-list, md-sidenav .sg-contacts-list');
      for (var sh = 0; sh < subHeaders.length; sh++) {
        subHeaders[sh].style.setProperty('background-color', 'transparent', 'important');
        subHeaders[sh].style.setProperty('background', 'transparent', 'important');
        subHeaders[sh].style.setProperty('box-shadow', 'none', 'important');
        subHeaders[sh].style.setProperty('border', 'none', 'important');
      }

      var listCards = document.querySelectorAll('#messagesList, #contactsList, .sg-list, .sg-contacts-list');
      for (var l = 0; l < listCards.length; l++) {
        var lc = listCards[l];
        lc.style.setProperty('border-radius', '24px', 'important');
        lc.style.setProperty('margin', '8px 4px 0px 6px', 'important');
        lc.style.setProperty('height', 'calc(100% - 8px)', 'important');
        lc.style.setProperty('max-height', 'calc(100% - 8px)', 'important');
        lc.style.setProperty('overflow', 'hidden', 'important');
        lc.style.setProperty('background-color', colors.bgCard, 'important');
        lc.style.setProperty('box-shadow', shadow3D, 'important');
      }

      var calContainers = document.querySelectorAll('.sg-calendar-container, [ui-view="calendars"]');
      for (var cc = 0; cc < calContainers.length; cc++) {
        var container = calContainers[cc];
        container.style.setProperty('display', 'flex', 'important');
        container.style.setProperty('flex-direction', 'row', 'important');
        container.style.setProperty('height', '100%', 'important');
        container.style.setProperty('max-height', '100%', 'important');
        container.style.setProperty('min-height', '0', 'important');
        container.style.setProperty('overflow', 'hidden', 'important');
      }

      var calMainCards = document.querySelectorAll('#calendarView, .sg-calendar-view, [ui-view="calendar"]');
      for (var cmc = 0; cmc < calMainCards.length; cmc++) {
        var calCard = calMainCards[cmc];
        calCard.style.setProperty('display', 'flex', 'important');
        calCard.style.setProperty('flex-direction', 'column', 'important');
        calCard.style.setProperty('flex', '1 1 0%', 'important');
        calCard.style.setProperty('min-height', '0', 'important');
        calCard.style.setProperty('min-width', '0', 'important');
        calCard.style.setProperty('height', 'calc(100% - 8px)', 'important');
        calCard.style.setProperty('max-height', 'calc(100% - 8px)', 'important');
        calCard.style.setProperty('overflow', 'hidden', 'important');
        calCard.style.setProperty('background-color', colors.bgCard, 'important');
        calCard.style.setProperty('box-shadow', shadow3D, 'important');
        calCard.style.setProperty('border-radius', '24px', 'important');
      }

      var calScrollers = document.querySelectorAll(
        '[ui-view="calendars"] md-content, [ui-view="calendar"] md-content, #calendarView md-content, ' +
        '.sg-calendar-view-content, .sg-calendar-scroll-view, .calendarView, .sg-calendar-body, .sg-day-view, .sg-week-view, .sg-month-view'
      );
      for (var cs = 0; cs < calScrollers.length; cs++) {
        var scroller = calScrollers[cs];
        scroller.style.setProperty('flex', '1 1 0%', 'important');
        scroller.style.setProperty('min-height', '0', 'important');
        scroller.style.setProperty('height', '100%', 'important');
        scroller.style.setProperty('max-height', '100%', 'important');
        scroller.style.setProperty('overflow', 'auto', 'important');
        scroller.style.setProperty('overflow-y', 'auto', 'important');
      }

      var toolbarInputs = document.querySelectorAll('#calendarView md-toolbar input, .sg-calendar-view md-toolbar input, [ui-view="calendars"] md-toolbar input, .md-datepicker-input');
      for (var ti = 0; ti < toolbarInputs.length; ti++) {
        toolbarInputs[ti].style.setProperty('color', '#ffffff', 'important');
      }

      var sidenavInputs = document.querySelectorAll('md-sidenav input, .sg-filter-input, form.sg-filter input');
      for (var si = 0; si < sidenavInputs.length; si++) {
        sidenavInputs[si].style.setProperty('color', '#a0b3c6', 'important');
      }

      if (colors.isDark) {
        var calDarkElems = document.querySelectorAll(
          '[ui-view="calendars"] .calendarView, [ui-view="calendars"] .hours, [ui-view="calendars"] .day, ' +
          '[ui-view="calendars"] .days, [ui-view="calendars"] td, [ui-view="calendars"] tr, [ui-view="calendars"] table, .allDaysView, .allDaysView--container, .sg-calendar-allday'
        );
        for (var cde = 0; cde < calDarkElems.length; cde++) {
          var elem = calDarkElems[cde];
          if (
            (elem.classList && elem.classList.contains('sg-calendar-event')) ||
            (elem.closest && elem.closest('.sg-calendar-event, md-switch, md-checkbox'))
          ) {
            continue;
          }
          if (elem.style.backgroundColor === 'rgb(255, 255, 255)' || elem.style.backgroundColor === '#ffffff' || elem.style.backgroundColor === '#fff') {
            elem.style.setProperty('background-color', colors.bgCard, 'important');
          }
        }
      }

      var detailCards = document.querySelectorAll('md-card, .sg-mail-view, .sg-record-view, .sg-contact-view, .sg-card-view, #contactView, #cardView');
      for (var d = 0; d < detailCards.length; d++) {
        var dc = detailCards[d];
        dc.style.setProperty('border-top-left-radius', '0px', 'important');
        dc.style.setProperty('border-top-right-radius', '0px', 'important');
        dc.style.setProperty('border-bottom-left-radius', '24px', 'important');
        dc.style.setProperty('border-bottom-right-radius', '24px', 'important');
        dc.style.setProperty('margin', '0px 12px 0px 4px', 'important');
        dc.style.setProperty('height', '100%', 'important');
        dc.style.setProperty('max-height', '100%', 'important');
        dc.style.setProperty('overflow', 'hidden', 'important');
        dc.style.setProperty('background-color', colors.bgCard, 'important');
        dc.style.setProperty('box-shadow', shadow3D, 'important');
      }

      var mailBodies = document.querySelectorAll('.sg-mail-body, .sg-mail-container, .sg-mail-view md-content, md-card md-content');
      for (var b = 0; b < mailBodies.length; b++) {
        var body = mailBodies[b];
        var spacer = body.querySelector('.sg-bottom-spacer');
        if (!spacer) {
          spacer = document.createElement('div');
          spacer.className = 'sg-bottom-spacer';
          body.appendChild(spacer);
        }
        spacer.style.setProperty('height', '12px', 'important');
        spacer.style.setProperty('min-height', '12px', 'important');
        spacer.style.setProperty('width', '100%', 'important');
        spacer.style.setProperty('display', 'block', 'important');
        spacer.style.setProperty('clear', 'both', 'important');
      }

      var ckEditors = document.querySelectorAll('.ck-editor__editable, .ck-content, .ck-editor__main, [contenteditable="true"].ck-content');
      for (var cke = 0; cke < ckEditors.length; cke++) {
        var editorEl = ckEditors[cke];
        if (colors.isDark) {
          editorEl.style.setProperty('background-color', colors.bgCard, 'important');
          editorEl.style.setProperty('background', colors.bgCard, 'important');
          editorEl.style.setProperty('color', '#ffffff', 'important');

          var editorParas = editorEl.querySelectorAll('p, div, span, h1, h2, h3, h4, ul, ol, li, blockquote');
          for (var ep = 0; ep < editorParas.length; ep++) {
            editorParas[ep].style.setProperty('color', '#ffffff', 'important');
            editorParas[ep].style.setProperty('background-color', 'transparent', 'important');
          }
        } else {
          editorEl.style.removeProperty('background-color');
          editorEl.style.removeProperty('background');
          editorEl.style.removeProperty('color');
        }
      }

      var ckToolbars = document.querySelectorAll('.ck-toolbar, .ck-sticky-panel__content, .ck-editor__top');
      for (var ckt = 0; ckt < ckToolbars.length; ckt++) {
        var tbEl = ckToolbars[ckt];
        if (colors.isDark) {
          tbEl.style.setProperty('background-color', colors.bgHeader, 'important');
          tbEl.style.setProperty('background', colors.bgHeader, 'important');
          tbEl.style.setProperty('border-color', colors.border, 'important');
        } else {
          tbEl.style.removeProperty('background-color');
          tbEl.style.removeProperty('background');
          tbEl.style.removeProperty('border-color');
        }
      }

      var iframes = document.querySelectorAll('iframe, #messageFrame, .sg-mail-iframe, .cke_wysiwyg_frame');
      for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes[i];
        try {
          if (iframe.contentDocument && iframe.contentDocument.body) {
            var ifDoc = iframe.contentDocument;
            var ifBody = ifDoc.body;
            ifBody.style.setProperty('padding-bottom', '12px', 'important');
            ifBody.style.setProperty('box-sizing', 'border-box', 'important');

            if (colors.isDark) {
              var ifStyle = ifDoc.getElementById('sogo-dark-iframe-fix-v3');
              if (!ifStyle) {
                ifStyle = ifDoc.createElement('style');
                ifStyle.id = 'sogo-dark-iframe-fix-v3';
                (ifDoc.head || ifDoc.body).appendChild(ifStyle);
              }
              ifStyle.textContent = `
                html, body, body.cke_editable, div.cke_editable, .cke_editable {
                  background-color: ${colors.bgCard} !important;
                  background: ${colors.bgCard} !important;
                  color: #ffffff !important;
                }
                *, p, div, span, h1, h2, h3, h4, h5, h6, table, tbody, tr, td, th, section, article, ul, ol, li, pre, code, blockquote {
                  color: #ffffff !important;
                  border-color: ${colors.border} !important;
                }
                a, a *, span.a {
                  color: ${colors.accentBtn} !important;
                  text-decoration: underline !important;
                }
              `;

              ifBody.style.setProperty('background-color', colors.bgCard, 'important');
              ifBody.style.setProperty('color', '#ffffff', 'important');

              var allIfElems = ifDoc.querySelectorAll('*');
              for (var e = 0; e < allIfElems.length; e++) {
                var el = allIfElems[e];
                if (el.hasAttribute('bgcolor')) el.removeAttribute('bgcolor');
                if (el.style.backgroundColor === 'rgb(255, 255, 255)' || el.style.backgroundColor === '#ffffff' || el.style.backgroundColor === '#fff') {
                  el.style.setProperty('background-color', colors.bgCard, 'important');
                }
                el.style.setProperty('color', '#ffffff', 'important');
              }
            } else {
              var ifStyleOld = ifDoc.getElementById('sogo-dark-iframe-fix-v3');
              if (ifStyleOld) ifStyleOld.remove();
            }
          }
        } catch (e) {}
        iframe.style.setProperty('margin-bottom', '8px', 'important');
      }
    }

    function syncActiveItemsAndFolders() {
      var colors = getThemeColors();

      var listContainers = document.querySelectorAll('#messagesList, #contactsList, [ui-view="list"], .sg-contacts-list, .sg-list');
      for (var c = 0; c < listContainers.length; c++) {
        var list = listContainers[c];
        var items = list.querySelectorAll('md-list-item, .sg-tile, .sg-list-item');
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          
          var selected = isMessageSelected(item);
          var starred = !selected && isMessageStarred(item);

          if (selected) {
            var pillBg = colors.isDark ? '#c2e7ff' : colors.bgActivePill;
            var pillTxt = '#041e49';

            item.style.setProperty('background-color', pillBg, 'important');
            item.style.setProperty('background', pillBg, 'important');
            item.style.setProperty('border-radius', '24px', 'important');

            var kids = item.querySelectorAll('*');
            for (var j = 0; j < kids.length; j++) {
              var kid = kids[j];
              if (kid.closest && kid.closest('.sg-mail-headers, .sg-mail-view, #mailView, #messageView')) {
                continue;
              }
              kid.style.setProperty('background-color', 'transparent', 'important');
              kid.style.setProperty('background', 'transparent', 'important');
              kid.style.setProperty('color', pillTxt, 'important');
              kid.style.setProperty('fill', pillTxt, 'important');
            }
          } else if (starred) {
            var starBg = colors.isDark ? '#fef08a' : '#fde047';
            var starTxt = '#041e49';

            item.style.setProperty('background-color', starBg, 'important');
            item.style.setProperty('background', starBg, 'important');
            item.style.setProperty('border-radius', '24px', 'important');

            var starKids = item.querySelectorAll('*');
            for (var sk = 0; sk < starKids.length; sk++) {
              var sKid = starKids[sk];
              if (sKid.closest && sKid.closest('.sg-mail-headers, .sg-mail-view, #mailView, #messageView')) {
                continue;
              }
              sKid.style.setProperty('background-color', 'transparent', 'important');
              sKid.style.setProperty('background', 'transparent', 'important');
              sKid.style.setProperty('color', starTxt, 'important');
              sKid.style.setProperty('fill', starTxt, 'important');
            }
          } else {
            item.style.removeProperty('background-color');
            item.style.removeProperty('background');

            var unKids = item.querySelectorAll('*');
            for (var k = 0; k < unKids.length; k++) {
              var uChild = unKids[k];
              uChild.style.removeProperty('background-color');
              uChild.style.removeProperty('background');
              if (colors.isDark) {
                if (uChild.classList.contains('sg-date') || uChild.classList.contains('sg-size') || uChild.classList.contains('sg-snippet') || uChild.classList.contains('sg-md-caption')) {
                  uChild.style.setProperty('color', '#a0b3c6', 'important');
                } else if (uChild.classList.contains('sg-tile-content') || uChild.classList.contains('sg-md-subhead') || uChild.classList.contains('sg-md-body')) {
                  uChild.style.setProperty('color', '#ffffff', 'important');
                } else {
                  uChild.style.removeProperty('color');
                }
              } else {
                uChild.style.removeProperty('color');
              }
            }
          }
        }
      }

      var sideNav = document.querySelector('md-sidenav');
      if (sideNav) {
        var folderItems = sideNav.querySelectorAll('md-list-item');
        for (var f = 0; f < folderItems.length; f++) {
          var folder = folderItems[f];
          var selectedFolder = isFolderSelected(folder);

          var innerBtn = folder.querySelector('.md-button, .md-no-style') || folder;

          var hasUnread = false;
          if (!selectedFolder) {
            var textNodes = folder.querySelectorAll('span, div, p, .md-secondary, .sg-badge');
            for (var t = 0; t < textNodes.length; t++) {
              var txt = textNodes[t].textContent ? textNodes[t].textContent.trim() : '';
              if ((/^\d+$/.test(txt) && parseInt(txt, 10) > 0) || (txt.indexOf('|') !== -1 && /\d+/.test(txt))) {
                hasUnread = true;
                break;
              }
            }
          }

          if (selectedFolder) {
            var actBg = colors.isDark ? '#ffffff' : '#d3e3fd';
            var actTxt = '#041e49';

            folder.style.setProperty('background-color', actBg, 'important');
            folder.style.setProperty('background', actBg, 'important');
            folder.style.setProperty('border-radius', '24px', 'important');
            
            var allFolderNodes = folder.querySelectorAll('a, button, div, span, md-icon, .md-button, .md-no-style');
            for (var fn = 0; fn < allFolderNodes.length; fn++) {
              var node = allFolderNodes[fn];
              if (node.tagName === 'MD-CHECKBOX' || node.tagName === 'MD-SWITCH' || (node.closest && node.closest('md-checkbox, md-switch'))) continue;

              node.style.setProperty('background-color', 'transparent', 'important');
              node.style.setProperty('background', 'transparent', 'important');
              node.style.setProperty('color', actTxt, 'important');
              node.style.setProperty('fill', actTxt, 'important');
              node.style.setProperty('font-weight', '700', 'important');
            }
          } else if (hasUnread) {
            folder.style.setProperty('background-color', colors.bgUnreadFolder, 'important');
            folder.style.setProperty('border-radius', '24px', 'important');
            if (innerBtn) {
              innerBtn.style.setProperty('background-color', colors.bgUnreadFolder, 'important');
              innerBtn.style.setProperty('border-radius', '24px', 'important');
            }
            var unreadChildren = folder.querySelectorAll('a, button, div, span, md-icon, .md-button, .md-no-style');
            for (var uc = 0; uc < unreadChildren.length; uc++) {
              var ucNode = unreadChildren[uc];
              if (ucNode.tagName === 'MD-CHECKBOX' || ucNode.tagName === 'MD-SWITCH' || (ucNode.closest && ucNode.closest('md-checkbox, md-switch'))) continue;

              ucNode.style.setProperty('background-color', 'transparent', 'important');
              ucNode.style.setProperty('color', colors.isDark ? '#ffffff' : '#041e49', 'important');
            }
          } else {
            folder.style.removeProperty('background-color');
            folder.style.removeProperty('background');
            if (innerBtn) {
              innerBtn.style.removeProperty('background-color');
              innerBtn.style.removeProperty('background');
            }
            var normalChildren = folder.querySelectorAll('a, button, div, span, md-icon, .md-button, .md-no-style');
            for (var nc = 0; nc < normalChildren.length; nc++) {
              var nChild = normalChildren[nc];
              if (nChild.tagName === 'MD-CHECKBOX' || nChild.tagName === 'MD-SWITCH' || (nChild.closest && nChild.closest('md-checkbox, md-switch'))) continue;

              nChild.style.removeProperty('background-color');
              nChild.style.removeProperty('background');
              if (colors.isDark) {
                nChild.style.setProperty('color', '#a0b3c6', 'important');
                nChild.style.setProperty('fill', '#a0b3c6', 'important');
                nChild.style.removeProperty('font-weight');
              } else {
                nChild.style.setProperty('color', '#041e49', 'important');
                nChild.style.setProperty('fill', '#041e49', 'important');
              }
            }
          }
        }
      }

      if (colors.isDark) {
        var mailViewHeaders = document.querySelectorAll('.sg-mail-headers, .sg-mail-view, #mailView, #messageView, md-card');
        for (var mvh = 0; mvh < mailViewHeaders.length; mvh++) {
          var headerContainer = mailViewHeaders[mvh];
          var headerLabels = headerContainer.querySelectorAll('.sg-mail-header-labels, .sg-mail-header-labels *, .sg-mail-header-label, .md-caption, label, span.md-caption');
          for (var hl = 0; hl < headerLabels.length; hl++) {
            var labelNode = headerLabels[hl];
            labelNode.style.setProperty('color', '#a0b3c6', 'important');
            labelNode.style.setProperty('fill', '#a0b3c6', 'important');
          }
        }
      }

      var dialogs = document.querySelectorAll('md-dialog, .sg-event-editor, .sg-event-dialog');
      for (var d = 0; d < dialogs.length; d++) {
        var dlg = dialogs[d];
        dlg.style.setProperty('background-color', colors.bgCard, 'important');
        dlg.style.setProperty('color', colors.textMain, 'important');

        var dlgContentElems = dlg.querySelectorAll('.md-dialog-content, md-dialog-content, md-input-container, form, fieldset, .layout-row, .layout-column');
        for (var dce = 0; dce < dlgContentElems.length; dce++) {
          dlgContentElems[dce].style.setProperty('background-color', colors.bgCard, 'important');
          dlgContentElems[dce].style.setProperty('background', colors.bgCard, 'important');
        }

        var formInputs = dlg.querySelectorAll('input, textarea, md-select, .md-select-value, label, span, p, md-radio-button, md-checkbox');
        for (var inp = 0; inp < formInputs.length; inp++) {
          formInputs[inp].style.setProperty('color', colors.textPrimary, 'important');
        }

        var dialogBtns = dlg.querySelectorAll('button, .md-button');
        for (var b = 0; b < dialogBtns.length; b++) {
          var btn = dialogBtns[b];
          if (!btn.hasAttribute('disabled')) {
            btn.style.setProperty('color', colors.accentBtn, 'important');
          } else {
            btn.style.setProperty('color', colors.isDark ? '#66b2ff' : '#a8c7fa', 'important');
          }
        }
      }
    }

    $timeout(function() {
      injectPersistentStyle();
      injectThemeToggleButton();
      enforceUniformCardBaseline();
      syncActiveItemsAndFolders();
    }, 100);

    $interval(function() {
      injectPersistentStyle();
      injectThemeToggleButton();
      enforceUniformCardBaseline();
      syncActiveItemsAndFolders();
    }, 300);
  }
})();