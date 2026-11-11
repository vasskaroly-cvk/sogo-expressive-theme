/**
 * ============================================================================
 * SOGo Webmail - Modern Expressive (Material 3 & Thunderbird Edition)
 * Repository: https://github.com/vasskaroly-cvk/sogo-expressive-theme
 * Version: 3.0
 * Release notes:
 * - Instant Dynamic Light/Dark Theme Switching without F5 reload (triggers AngularJS digest cycle).
 * - Absolute High-Specificity Dark Mode Calendar Event Editor fix (eliminated white frames, whiteframes & gaps).
 * - Complete Dark Mode Mail Composer overhaul (dark CKEditor & compose dialog with white readable typed text).
 * - Fixed Dark Mode Folder List text visibility.
 * - Multi-selector HTML Email CTA Button & Link Color Engine.
 * - Canonical theme preference stored in localStorage.sogo_theme.
 * Author: Károly Vass (cvk.hu)
 * License: MIT
 * ============================================================================
 */

(function() {
  'use strict';

  console.log('%c [SOGo Expressive Theme] v3.0 (Dynamic Theme Toggle & Dialog Fix) AKTÍV! ', 'background: #004a77; color: #c2e7ff; font-weight: bold; font-size: 13px; padding: 4px 8px; border-radius: 4px;');

  angular.module('SOGo.Common')
    .config(configure)
    .run(applyExpressiveTheme);

  /* ======================================================
     1. ANGULAR THEME PALETTA CONFIG
     ====================================================== */
  configure.$inject = ['$mdThemingProvider'];
  function configure($mdThemingProvider) {
    try {
      var expressiveBlue = $mdThemingProvider.extendPalette('blue', {
        '50': 'c2e7ff', '100': 'c2e7ff', '200': 'c2e7ff', '300': 'c2e7ff',
        '400': 'c2e7ff', '500': 'c2e7ff', '600': 'c2e7ff', '700': 'c2e7ff',
        '800': 'c2e7ff', '900': 'c2e7ff', 'A100': 'c2e7ff', 'A200': 'c2e7ff',
        'A400': 'c2e7ff', 'A700': 'c2e7ff',
        'contrastDefaultColor': 'dark'
      });
      
      $mdThemingProvider.definePalette('expressiveBlue', expressiveBlue);

      $mdThemingProvider.theme('default')
        .primaryPalette('expressiveBlue', { 'default': '500' }) 
        .accentPalette('expressiveBlue'); 
        
      $mdThemingProvider.generateThemesOnDemand(false);
    } catch(e) {}
  }

  /* ======================================================
     2. DUPLEX TÉMAMOTOR ÉS TISZTA CSS
     ====================================================== */
  applyExpressiveTheme.$inject = ['$timeout'];
  function applyExpressiveTheme($timeout) {

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
        return {
          isDark: true,
          bgMain: '#1c242f',          
          bgCard: '#273342',          
          bgCardHeader: '#212c3a',
          bgHeader: '#1c242f',        
          bgHover: '#334356',         
          bgActiveFolder: '#34475e',  
          borderActiveFolder: '#4a6382',
          borderLeftActiveFolder: '#66b2ff',
          textActiveFolder: '#ffffff',
          iconActiveFolder: '#66b2ff',
          bgActivePanel: '#324763',    
          borderActivePanel: '#66b2ff',
          textActivePanel: '#ffffff',  
          bgUnreadFolder: '#2b3947',  
          borderUnreadFolder: '#3b4e63',
          textUnreadFolder: '#ffffff',
          iconUnreadFolder: '#93c5fd',
          bgStarSoft: '#3d351e',
          borderStarSoft: '#ca8a04',
          textStar: '#fef08a',
          textMain: '#e2e8f0',        
          textPrimary: '#ffffff',     
          textMuted: '#94a3b8',
          iconColor: '#ffffff',
          accentBtn: '#66b2ff',       
          accentFab: '#66b2ff',       
          fabIcon: '#111a22',         
          border: '#334155',
          itemCardBg: '#283341',      
          itemCardBorder: '#38475a',
          unreadDot: '#66b2ff',
          folderBadgeBg: '#004a77',         
          folderBadgeText: '#c2e7ff',       
          folderBadgeActiveBg: '#66b2ff',   
          folderBadgeActiveText: '#001d35',
          contactAvatarBg: '#334356',
          contactAvatarColor: '#66b2ff'
        };
      } else {
        return {
          isDark: false,
          bgMain: '#f0f4f9',
          bgCard: '#ffffff',
          bgCardHeader: '#f8fafc',
          bgHeader: '#f0f4f9',
          bgHover: '#f1f5f9',
          bgActiveFolder: '#cbe6fc',          
          borderActiveFolder: '#99cfff',      
          borderLeftActiveFolder: '#0056b3',  
          textActiveFolder: '#002244',
          iconActiveFolder: '#002244',
          bgActivePanel: '#dbeafe',          
          borderActivePanel: '#0b57d0',
          textActivePanel: '#041e49',
          bgUnreadFolder: '#eef5fd',          
          borderUnreadFolder: '#dbeafe',
          textUnreadFolder: '#041e49',
          iconUnreadFolder: '#041e49',
          bgStarSoft: '#fef9c3',              
          borderStarSoft: '#eab308',
          textStar: '#713f12',
          textMain: '#0f172a',
          textPrimary: '#041e49',
          textMuted: '#64748b',
          iconColor: '#041e49',
          accentBtn: '#041e49',
          accentFab: '#c2e7ff',
          fabIcon: '#001d35',
          border: '#cbd5e1',
          itemCardBg: '#ffffff',
          itemCardBorder: '#e2e8f0',
          unreadDot: '#0b57d0',
          folderBadgeBg: '#c2e7ff',         
          folderBadgeText: '#001d35',       
          folderBadgeActiveBg: '#ffffff',   
          folderBadgeActiveText: '#002244',
          contactAvatarBg: '#dbeafe',
          contactAvatarColor: '#0b57d0'
        };
      }
    }

    function isMessageSelected(item) {
      if (!item) return false;
      return item.classList.contains('md-active') ||
             item.classList.contains('sg-message-selected') ||
             item.classList.contains('sg-item-selected') ||
             item.classList.contains('sg-selected') ||
             item.getAttribute('aria-selected') === 'true' ||
             (item.classList.contains('md-bg') && item.classList.contains('md-hue-2'));
    }

    function isMessageStarred(item) {
      if (!item) return false;
      return item.classList.contains('sg-star-bg') || item.querySelector('.sg-star-bg, md-icon.sg-starred') !== null;
    }

    function isMessageUnread(item) {
      if (!item) return false;
      try {
        if (window.angular) {
          var scope = window.angular.element(item).scope();
          if (scope && scope.message) {
            return scope.message.isread === 0 || scope.message.isread === false;
          }
        }
      } catch(e) {}
      if (item.classList.contains('sg-unread') || item.classList.contains('unread')) return true;
      if (item.querySelector('.sg-name.bold, .sg-subject.bold, .sg-unread:not(.tb-unread-dot)')) return true;
      return false;
    }

    function isFolderActive(folder) {
      if (!folder) return false;
      if (folder.classList.contains('md-active') ||
          folder.classList.contains('sg-folder-selected') ||
          folder.classList.contains('sg-item-selected') ||
          folder.classList.contains('sg-selected') ||
          folder.getAttribute('aria-selected') === 'true') {
        return true;
      }
      var titleNode = document.querySelector('.sg-folder-name, [ui-view="main"] md-toolbar .md-toolbar-tools > span, [ui-view="main"] md-toolbar h2, .sg-toolbar-tools span, form.sg-filter input, input.sg-filter-input');
      var currentTitle = '';
      if (titleNode) {
        currentTitle = (titleNode.value || titleNode.placeholder || titleNode.textContent || '').trim().toLowerCase();
        var m = currentTitle.match(/:\s*(.+)$/);
        if (m) currentTitle = m[1].trim();
      }
      if (currentTitle && currentTitle.length > 1 && currentTitle !== 'sogo') {
        var folderNameNode = folder.querySelector('p, span, .sg-name, .md-body-1');
        var fText = ((folderNameNode && folderNameNode.textContent) || folder.textContent || '').trim().toLowerCase();
        fText = fText.replace(/[|:–—\(\[].*$/, '').trim();
        if (fText && currentTitle && fText === currentTitle) {
          return true;
        }
      }
      return false;
    }

    function isFolderUnread(folder) {
      if (!folder) return false;
      if (folder.classList.contains('sg-unread') || folder.classList.contains('sg-folder-unread')) return true;
      var badge = folder.querySelector('.sg-badge, .sg-unread-count, .tb-folder-circle-badge');
      if (badge) {
        var count = parseInt((badge.textContent || '').replace(/\D/g, ''), 10);
        if (!isNaN(count) && count > 0) return true;
      }
      return false;
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

      var styleId = 'sogo-expressive-theme-v3';
      var style = document.getElementById(styleId);

      if (!style) {
        style = document.createElement('style');
        style.id = styleId;
        (document.head || document.documentElement).appendChild(style);
      } else {
        if (document.head && document.head.lastElementChild !== style) {
          document.head.appendChild(style);
        }
      }

      var shadow3D = colors.isDark 
        ? '0 12px 32px rgba(0, 0, 0, 0.7), 0 0 20px rgba(255, 255, 255, 0.08)' 
        : '0 12px 28px rgba(0, 0, 0, 0.10), 0 4px 10px rgba(0, 0, 0, 0.04)';

      style.textContent = `
        /* ===================================================================
           1. ALAP ÉS KERET (SOGO GYÁRI STÍLUSOK FELÜLÍRÁSA)
           =================================================================== */
        html, body {
            background-color: ${colors.bgMain} !important;
            height: 100vh !important;
            max-height: 100vh !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            color: ${colors.textMain} !important;
        }

        .sg-main-view, [ui-view="main"], .sg-main-container,
        .layout-row, .layout-column {
            background-color: ${colors.bgMain} !important;
            box-sizing: border-box !important;
        }

        md-toolbar, .sg-header md-toolbar, md-toolbar.md-default-theme, md-toolbar.md-hue-2 {
            background-color: ${colors.bgHeader} !important;
            color: ${colors.textMain} !important;
            box-shadow: none !important;
        }

        /* Lebegő Nap/Hold gomb */
        #sogo-theme-toggle-btn {
            position: fixed !important;
            left: 50% !important;
            top: 10px !important;
            transform: translateX(-50%) !important;
            z-index: 99999 !important;
            background: ${colors.isDark ? '#273342' : '#ffffff'} !important;
            border: 1px solid ${colors.border} !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
            width: 38px !important;
            height: 38px !important;
            border-radius: 50% !important;
            cursor: pointer !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 18px !important;
            transition: transform 0.2s ease !important;
        }
        #sogo-theme-toggle-btn:hover {
            transform: translateX(-50%) scale(1.15) !important;
        }

        /* ===================================================================
           2. SÖTÉT MÓD TIPOGRÁFIA ÉS KONTRASZT (KIZÁRÓLAG SOGO UI ELEMEKRE)
           =================================================================== */
        html.sogo-dark .sg-main-view,
        html.sogo-dark [ui-view],
        html.sogo-dark md-sidenav,
        html.sogo-dark md-toolbar,
        html.sogo-dark md-card:not(#mailView),
        html.sogo-dark md-dialog,
        html.sogo-dark md-select-menu,
        html.sogo-dark md-content,
        html.sogo-dark .md-button,
        html.sogo-dark .sg-name, html.sogo-dark .sg-subject,
        html.sogo-dark .sg-email, html.sogo-dark .sg-text {
            color: #e2e8f0;
        }

        html.sogo-dark input,
        html.sogo-dark textarea,
        html.sogo-dark select,
        html.sogo-dark md-select,
        html.sogo-dark .md-select-value,
        html.sogo-dark md-select .md-select-value span,
        html.sogo-dark md-input-container input,
        html.sogo-dark md-input-container textarea {
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
        }

        html.sogo-dark .sg-name,
        html.sogo-dark .sg-subject,
        html.sogo-dark .sg-user-name,
        html.sogo-dark md-toolbar .md-toolbar-tools,
        html.sogo-dark md-toolbar .md-toolbar-tools *,
        html.sogo-dark md-dialog md-toolbar * {
            color: #ffffff !important;
        }

        html.sogo-dark label,
        html.sogo-dark md-input-container label,
        html.sogo-dark md-input-container .md-placeholder,
        html.sogo-dark .md-caption,
        html.sogo-dark .sg-date,
        html.sogo-dark .sg-muted,
        html.sogo-dark .md-placeholder {
            color: #94a3b8 !important;
        }

        /* IKONOK SZÍNE ÉS HOVER KIEMELÉSE */
        html.sogo-dark md-icon, html.sogo-dark button md-icon, html.sogo-dark .md-button md-icon,
        html.sogo-dark md-toolbar md-icon, html.sogo-dark md-card md-icon, html.sogo-dark md-dialog md-icon {
            color: #ffffff !important;
        }
        html.sogo-dark md-icon svg path:not([fill="none"]),
        html.sogo-dark button md-icon svg path:not([fill="none"]),
        html.sogo-dark md-toolbar md-icon svg path:not([fill="none"]) {
            fill: #ffffff !important;
        }

        html.sogo-light md-icon, html.sogo-light button md-icon, html.sogo-light .md-button md-icon,
        html.sogo-light md-toolbar md-icon, html.sogo-light md-card md-icon, html.sogo-light md-dialog md-icon {
            color: #041e49 !important;
        }
        html.sogo-light md-icon svg path:not([fill="none"]),
        html.sogo-light button md-icon svg path:not([fill="none"]),
        html.sogo-light md-toolbar md-icon svg path:not([fill="none"]) {
            fill: #041e49 !important;
        }

        button.md-icon-button, .md-icon-button, md-toolbar button, md-toolbar .md-button, .sg-toolbar-tools button {
            border-radius: 50% !important;
            transition: background-color 0.18s ease, transform 0.18s ease !important;
        }
        button.md-icon-button:hover, .md-icon-button:hover, md-toolbar button:hover, md-toolbar .md-button:hover, .sg-toolbar-tools button:hover {
            background-color: ${colors.bgHover} !important;
        }
        button:hover md-icon, a:hover md-icon, md-button:hover md-icon {
            transform: scale(1.15) !important;
        }

        button.md-fab { background-color: ${colors.accentFab} !important; border-radius: 14px !important; }
        button.md-fab md-icon { color: ${colors.fabIcon} !important; fill: ${colors.fabIcon} !important; }

        md-icon.sg-starred, .sg-star-bg md-icon, .sg-starred md-icon, [aria-label*="star"] md-icon {
            color: ${colors.isDark ? '#fef08a' : '#ca8a04'} !important;
            fill: ${colors.isDark ? '#fef08a' : '#ca8a04'} !important;
        }

        /* ===================================================================
           3. KÖZÉPSŐ OSZLOP ÉS LISTÁK
           =================================================================== */
        [ui-view="list"], [ui-view="contacts"], #messagesList, #contactsList {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
        }

        md-subheader, .md-subheader, md-subheader .md-subheader-inner, .md-subheader-inner, .md-subheader-content,
        [ui-view="list"] md-subheader, [ui-view="contacts"] md-subheader, #messagesList md-subheader, #contactsList md-subheader {
            background: transparent !important;
            background-color: transparent !important;
            border: none !important;
            box-shadow: none !important;
            color: ${colors.textMuted} !important;
        }

        [ui-view="list"] md-list-item, #messagesList md-list-item, [ui-view="contacts"] md-list-item, #contactsList md-list-item,
        [ui-view="list"] md-list-item > .md-button, #messagesList md-list-item > .md-button, [ui-view="contacts"] md-list-item > .md-button, #contactsList md-list-item > .md-button {
            border-radius: 12px !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
        }

        [ui-view="list"] md-list-item, #messagesList md-list-item, [ui-view="contacts"] md-list-item, #contactsList md-list-item {
            margin: 6px 4px !important;
            width: calc(100% - 8px) !important;
            background-color: ${colors.itemCardBg} !important;
            border: 1px solid ${colors.itemCardBorder} !important;
            box-shadow: ${colors.isDark ? '0 2px 8px rgba(0,0,0,0.35)' : '0 2px 6px rgba(0,0,0,0.04)'} !important;
            position: relative !important;
            transition: box-shadow 0.15s ease, border-color 0.15s ease, background-color 0.15s ease !important;
        }

        [ui-view="list"] md-list-item:hover, #messagesList md-list-item:hover, [ui-view="contacts"] md-list-item:hover, #contactsList md-list-item:hover {
            box-shadow: ${colors.isDark ? '0 6px 16px rgba(0,0,0,0.5)' : '0 4px 12px rgba(0,0,0,0.08)'} !important;
            border-color: ${colors.isDark ? '#556982' : '#cbd5e1'} !important;
            background-color: ${colors.bgHover} !important;
        }

        html.sogo-dark md-list-item .sg-name, html.sogo-dark md-list-item .md-list-item-text h3 { color: #ffffff !important; font-weight: 600 !important; }
        html.sogo-dark md-list-item .sg-subject, html.sogo-dark md-list-item .md-list-item-text p { color: #cbd5e1 !important; }
        html.sogo-dark md-list-item .sg-date, html.sogo-dark md-list-item .sg-size { color: #94a3b8 !important; }

        .tb-unread-dot {
            width: 8px !important; height: 8px !important; min-width: 8px !important; min-height: 8px !important;
            border-radius: 50% !important; background-color: ${colors.unreadDot} !important;
            box-shadow: 0 0 8px ${colors.unreadDot} !important; position: absolute !important;
            left: 8px !important; top: 50% !important; transform: translateY(-50%) !important; z-index: 10 !important; display: inline-block !important;
        }

        /* ===================================================================
           4. BAL OLDALSÁV (MAPPA LISTA ÉS KVÓTA - SÖTÉT MÓD OLVASHATÓSÁG)
           =================================================================== */
        .sg-user-info { padding: 10px 14px 6px 14px !important; background: transparent !important; }
        .sg-user-info .sg-user-name { color: ${colors.isDark ? '#ffffff' : '#041e49'} !important; font-weight: 700 !important; font-size: 15px !important; }
        .sg-user-info .sg-user-email, .sg-user-info span, .sg-user-info .md-caption, .sg-quota, .sg-quota *, .sg-quota-text, .sg-quota-label, [ng-show*="quota"], [ng-show*="quota"] * {
            color: ${colors.isDark ? '#ffffff' : '#041e49'} !important;
            -webkit-text-fill-color: ${colors.isDark ? '#ffffff' : '#041e49'} !important;
            font-weight: 700 !important; opacity: 1 !important; visibility: visible !important;
        }

        html.sogo-dark md-sidenav md-list-item,
        html.sogo-dark md-sidenav md-list-item *,
        html.sogo-dark md-sidenav md-list-item p,
        html.sogo-dark md-sidenav md-list-item span,
        html.sogo-dark md-sidenav md-list-item .md-body-1,
        html.sogo-dark md-sidenav md-list-item .sg-name {
            color: #e2e8f0 !important;
        }

        html.sogo-dark md-sidenav md-list-item.md-active *,
        html.sogo-dark md-sidenav md-list-item[aria-selected="true"] * {
            color: #ffffff !important;
        }

        md-progress-linear .md-bar1 { display: none !important; }
        md-progress-linear .md-container { background-color: ${colors.isDark ? '#334155' : '#cbd5e1'} !important; border-radius: 4px !important; height: 5px !important; }
        md-progress-linear .md-bar2 { background-color: ${colors.isDark ? '#66b2ff' : '#041e49'} !important; border-radius: 4px !important; height: 5px !important; }

        md-sidenav, md-sidenav.md-locked-open {
            background-color: ${colors.bgMain} !important;
            background: ${colors.bgMain} !important;
            border: none !important;
            border-bottom-left-radius: 20px !important;
            border-bottom-right-radius: 20px !important;
            margin-bottom: 8px !important;
            height: calc(100% - 8px) !important;
            max-height: calc(100% - 8px) !important;
            overflow: hidden !important;
        }

        md-sidenav md-content, .sg-folder-list, .sg-contacts-sidebar {
            background-color: ${colors.bgMain} !important;
            background: ${colors.bgMain} !important;
            border: none !important;
            overflow-x: hidden !important;
            overflow-y: auto !important;
            min-height: 0 !important;
            -webkit-overflow-scrolling: touch !important;
        }

        md-sidenav md-list-item:not(.sg-user-info) {
            margin: 2px 8px !important; width: calc(100% - 16px) !important; border-radius: 8px !important;
            border: 1px solid transparent !important; box-sizing: border-box !important; transition: background-color 0.15s ease !important;
        }

        md-sidenav md-list-item:not(.sg-user-info):hover { background-color: ${colors.bgHover} !important; }

        .tb-folder-circle-badge, .sg-badge, .sg-unread-count, md-sidenav md-list-item .sg-badge {
            min-width: 20px !important; height: 20px !important; line-height: 20px !important; border-radius: 10px !important;
            padding: 0 6px !important; font-size: 11px !important; font-weight: 800 !important; text-align: center !important;
            display: inline-flex !important; align-items: center !important; justify-content: center !important;
            box-sizing: border-box !important; float: right !important; margin-left: auto !important; box-shadow: 0 1px 3px rgba(0,0,0,0.12) !important;
        }

        /* ===================================================================
           5. LEVÉLOLVASÓ ÉS LEVÉL ÍRÁS (SG-COMPOSE-DIALOG / CKEDITOR) TÖRZSE
           =================================================================== */
        #mailView {
            background-color: ${colors.bgCard} !important; border-top-left-radius: 0 !important; border-top-right-radius: 0 !important;
            border-bottom-left-radius: 20px !important; border-bottom-right-radius: 20px !important;
            margin: 0 12px 8px 4px !important; height: calc(100% - 8px) !important; max-height: calc(100% - 8px) !important;
            box-shadow: ${shadow3D} !important; border: 1px solid ${colors.border} !important; box-sizing: border-box !important;
            color: ${colors.textMain} !important; display: flex !important; flex-direction: column !important; overflow: hidden !important; padding: 0 !important;
        }

        #mailView > md-toolbar {
            background-color: ${colors.bgCardHeader} !important; border-bottom: 1px solid ${colors.border} !important;
            border-radius: 0 !important; flex: 0 0 64px !important; height: 64px !important; min-height: 64px !important;
            max-height: 64px !important; flex-shrink: 0 !important; padding: 0 16px !important;
        }

        #mailView .sg-mail-view, .sg-mail-view {
            display: flex !important; flex-direction: column !important; flex: 1 1 auto !important;
            height: calc(100% - 64px) !important; max-height: calc(100% - 64px) !important; min-height: 0 !important;
            overflow: hidden !important; padding: 0 !important; margin: 0 !important; box-sizing: border-box !important;
        }

        #mailView .sg-message-header, .sg-mail-view .sg-message-header {
            flex-shrink: 0 !important; padding: 14px 24px 12px 24px !important; background-color: ${colors.bgCard} !important;
            border-bottom: 1px solid ${colors.border} !important; margin: 0 !important; box-sizing: border-box !important;
        }

        html.sogo-dark .sg-message-header h2, html.sogo-dark .sg-mail-view .sg-message-header h2 { color: #ffffff !important; font-weight: 700 !important; font-size: 19px !important; margin: 0 0 6px 0 !important; }
        html.sogo-dark .sg-message-header a, html.sogo-dark .sg-message-header .sg-email { color: #66b2ff !important; }

        #mailView #messageFrame, .sg-mail-view #messageFrame {
            flex: 1 1 auto !important; width: 100% !important; height: 100% !important; min-height: 0 !important;
            border: none !important; margin: 0 !important; padding: 0 !important; display: block !important; background-color: #ffffff !important;
        }

        /* SÖTÉT MÓD: LEVÉL ÍRÁS / SZERKESZTŐ ABLAK (COMPOSE VIEW ÉS CKEDITOR) */
        html.sogo-dark .sg-compose-dialog,
        html.sogo-dark [ui-view="compose"],
        html.sogo-dark #composeView,
        html.sogo-dark .sg-compose-view,
        html.sogo-dark form[name="composeForm"],
        html.sogo-dark .sg-compose-dialog md-dialog-content,
        html.sogo-dark .sg-compose-dialog md-content {
            background-color: ${colors.bgCard} !important;
            background: ${colors.bgCard} !important;
            color: #e2e8f0 !important;
        }

        html.sogo-dark .sg-compose-dialog md-toolbar,
        html.sogo-dark [ui-view="compose"] md-toolbar,
        html.sogo-dark #composeView md-toolbar,
        html.sogo-dark .sg-compose-view md-toolbar,
        html.sogo-dark .cke_top {
            background-color: ${colors.bgCardHeader} !important;
            background: ${colors.bgCardHeader} !important;
            border-bottom: 1px solid ${colors.border} !important;
        }

        html.sogo-dark .sg-compose-dialog input,
        html.sogo-dark [ui-view="compose"] input,
        html.sogo-dark #composeView input,
        html.sogo-dark .sg-compose-dialog textarea,
        html.sogo-dark [ui-view="compose"] textarea,
        html.sogo-dark #composeView textarea,
        html.sogo-dark md-chips,
        html.sogo-dark md-chip,
        html.sogo-dark .md-chip {
            background-color: ${colors.bgCardHeader} !important;
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
        }

        /* A levél gépelési felülete (tiszta fehér háttér fekete betűvel, így mindig tökéletesen látszik a gépelt szöveg) */
        html.sogo-dark .sg-compose-dialog iframe,
        html.sogo-dark [ui-view="compose"] iframe,
        html.sogo-dark #composeView iframe,
        html.sogo-dark .sg-compose-view iframe,
        html.sogo-dark .cke_contents,
        html.sogo-dark .cke_inner,
        html.sogo-dark .cke_editable,
        html.sogo-dark [contenteditable="true"],
        html.sogo-dark textarea.sg-compose-body {
            background-color: #ffffff !important;
            color: #000000 !important;
            -webkit-text-fill-color: #000000 !important;
            border-radius: 8px !important;
        }

        /* ===================================================================
           6. POPUP MENÜK, DROPDOWN-OK ÉS IDŐ/DÁTUM VÁLASZTÓK (SÜRGŐSSÉG MENÜ ÉS POPUP-OK)
           =================================================================== */
        html.sogo-dark .md-open-menu-container,
        html.sogo-dark md-menu-content,
        html.sogo-dark md-select-menu,
        html.sogo-dark md-select-menu md-content,
        html.sogo-dark .md-datepicker-calendar-pane,
        html.sogo-dark .sg-date-picker,
        html.sogo-dark .sg-date-picker-menu,
        html.sogo-dark .sg-time-picker,
        html.sogo-dark .sg-time-picker-menu,
        html.sogo-dark md-calendar,
        html.sogo-dark .md-calendar,
        html.sogo-dark md-autocomplete-wrap,
        html.sogo-dark md-virtual-repeat-container {
            background-color: ${colors.bgCard} !important;
            background: ${colors.bgCard} !important;
            border: 1px solid ${colors.border} !important;
            box-shadow: ${shadow3D} !important;
            color: #e2e8f0 !important;
        }

        html.sogo-dark .md-open-menu-container *,
        html.sogo-dark md-menu-content *,
        html.sogo-dark md-select-menu *,
        html.sogo-dark .md-datepicker-calendar-pane *,
        html.sogo-dark .sg-time-picker *,
        html.sogo-dark .sg-date-picker * {
            color: #e2e8f0 !important;
        }

        html.sogo-dark .md-datepicker-triangle,
        html.sogo-dark .md-datepicker-expand-triangle,
        html.sogo-dark .md-open-menu-container::before,
        html.sogo-dark .md-open-menu-container::after {
            border-bottom-color: ${colors.bgCard} !important;
            border-top-color: ${colors.bgCard} !important;
        }

        html.sogo-dark md-menu-content md-menu-item .md-button:hover,
        html.sogo-dark md-select-menu md-option:hover,
        html.sogo-dark md-select-menu md-option[selected],
        html.sogo-dark .sg-time-picker button:hover,
        html.sogo-dark .sg-time-picker .md-button.md-active {
            background-color: ${colors.bgHover} !important;
            color: #66b2ff !important;
        }

        /* ===================================================================
           7. NAPTÁR ÉS DIALÓGUS ABLAKOK (MD-DIALOG, SG-EVENT-EDITOR) - ABSZOLÚT HIGHEST SPECIFICITY CSÍKMENTESÍTÉS
           =================================================================== */
        html.sogo-dark body .md-dialog-container,
        html.sogo-dark body .md-dialog-container md-dialog,
        html.sogo-dark body md-dialog,
        html.sogo-dark body .sg-event-editor,
        html.sogo-dark body md-dialog.sg-event-editor,
        html.sogo-dark body md-dialog md-dialog-content,
        html.sogo-dark body md-dialog .md-dialog-content,
        html.sogo-dark body md-dialog md-content,
        html.sogo-dark body md-dialog form,
        html.sogo-dark body .sg-event-editor form,
        html.sogo-dark body .sg-event-editor form[name="eventForm"] {
            background-color: ${colors.bgCard} !important;
            background: ${colors.bgCard} !important;
            border-color: ${colors.border} !important;
            color: #e2e8f0 !important;
            box-shadow: none !important;
        }

        html.sogo-dark body md-dialog .md-whiteframe-1dp,
        html.sogo-dark body md-dialog .md-whiteframe-2dp,
        html.sogo-dark body md-dialog .md-whiteframe-3dp,
        html.sogo-dark body md-dialog .md-whiteframe-z1,
        html.sogo-dark body md-dialog [class*="whiteframe"],
        html.sogo-dark body md-dialog [class*="md-whiteframe"],
        html.sogo-dark body md-dialog md-card,
        html.sogo-dark body md-dialog .md-card,
        html.sogo-dark body md-dialog [layout-padding],
        html.sogo-dark body md-dialog [layout-margin],
        html.sogo-dark body md-dialog div[layout],
        html.sogo-dark body md-dialog fieldset,
        html.sogo-dark body md-dialog md-tabs,
        html.sogo-dark body md-dialog md-tabs-wrapper,
        html.sogo-dark body md-dialog .md-tab,
        html.sogo-dark body md-dialog md-tab-content,
        html.sogo-dark body .sg-event-editor .md-whiteframe-1dp,
        html.sogo-dark body .sg-event-editor .md-whiteframe-2dp,
        html.sogo-dark body .sg-event-editor .md-whiteframe-z1,
        html.sogo-dark body .sg-event-editor [class*="whiteframe"],
        html.sogo-dark body .sg-event-editor [class*="md-whiteframe"],
        html.sogo-dark body .sg-event-editor md-card,
        html.sogo-dark body .sg-event-editor .md-card,
        html.sogo-dark body .sg-event-editor [layout-padding],
        html.sogo-dark body .sg-event-editor [layout-margin],
        html.sogo-dark body .sg-event-editor div[layout],
        html.sogo-dark body .sg-event-editor fieldset,
        html.sogo-dark body .sg-event-editor div[class*="sg-"] {
            background-color: ${colors.bgCardHeader} !important;
            background: ${colors.bgCardHeader} !important;
            border: 1px solid ${colors.border} !important;
            box-shadow: none !important;
            border-radius: 8px !important;
            margin: 6px 0 !important;
        }

        html.sogo-dark body md-dialog input,
        html.sogo-dark body md-dialog textarea,
        html.sogo-dark body md-dialog md-select,
        html.sogo-dark body md-dialog .md-select-value span,
        html.sogo-dark body .sg-event-editor input,
        html.sogo-dark body .sg-event-editor textarea,
        html.sogo-dark body .sg-event-editor md-select,
        html.sogo-dark body .sg-event-editor .md-select-value span {
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
            background-color: transparent !important;
        }

        html.sogo-dark body md-dialog label,
        html.sogo-dark body md-dialog p,
        html.sogo-dark body md-dialog span,
        html.sogo-dark body md-dialog div,
        html.sogo-dark body md-dialog md-checkbox .md-label,
        html.sogo-dark body md-dialog md-radio-button .md-label,
        html.sogo-dark body .sg-event-editor label,
        html.sogo-dark body .sg-event-editor p,
        html.sogo-dark body .sg-event-editor span,
        html.sogo-dark body .sg-event-editor div,
        html.sogo-dark body .sg-event-editor md-checkbox .md-label,
        html.sogo-dark body .sg-event-editor md-radio-button .md-label {
            color: #e2e8f0 !important;
            opacity: 1 !important;
        }

        html.sogo-dark body md-dialog .md-caption,
        html.sogo-dark body md-dialog .sg-muted,
        html.sogo-dark body md-dialog md-input-container label,
        html.sogo-dark body .sg-event-editor .md-caption,
        html.sogo-dark body .sg-event-editor .sg-muted,
        html.sogo-dark body .sg-event-editor md-input-container label {
            color: #94a3b8 !important;
            opacity: 1 !important;
        }

        /* VILÁGOS MÓD: NAPTÁR ÉS ESEMÉNY SZERKESZTŐ ABLAKOK BELSEJE */
        html.sogo-light md-dialog md-dialog-content, html.sogo-light md-dialog md-content, html.sogo-light md-dialog form,
        html.sogo-light md-dialog [layout], html.sogo-light md-dialog md-input-container, html.sogo-light md-dialog .md-whiteframe-z1,
        html.sogo-light .sg-event-editor md-dialog-content, html.sogo-light .sg-event-editor form {
            background-color: transparent !important;
            background: transparent !important;
            box-shadow: none !important;
        }

        /* ALSÓ GOMBOK (CANCEL, RESET, SAVE) */
        md-dialog md-dialog-actions, md-dialog .md-actions {
            background-color: ${colors.bgCardHeader} !important;
            border-top: 1px solid ${colors.border} !important;
            padding: 8px 16px !important;
            flex-shrink: 0 !important;
        }

        html.sogo-dark md-dialog md-dialog-actions .md-button, html.sogo-dark md-dialog .md-actions .md-button { color: #66b2ff !important; font-weight: 700 !important; }
        html.sogo-light md-dialog md-dialog-actions .md-button, html.sogo-light md-dialog .md-actions .md-button { color: #0b57d0 !important; font-weight: 700 !important; }

        ::-webkit-scrollbar { width: 8px !important; height: 8px !important; }
        ::-webkit-scrollbar-track { background: transparent !important; }
        ::-webkit-scrollbar-thumb { background: ${colors.border} !important; border-radius: 4px !important; }
      `;
    }

    function injectThemeToggleButton() {
      var btn = document.getElementById('sogo-theme-toggle-btn');
      var colors = getThemeColors();
      
      if (!btn) {
        btn = document.createElement('button');
        btn.id = 'sogo-theme-toggle-btn';
        btn.type = 'button';
        (document.body || document.documentElement).appendChild(btn);
      }

      var buttonIcon = colors.isDark ? '☀️' : '🌙';
      if (btn.textContent !== buttonIcon) {
        btn.textContent = buttonIcon;
      }
      btn.title = 'SOGo Expressive Theme - ' + (colors.isDark ? 'Váltás világosra' : 'Váltás sötétre');

      btn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        var isDarkNow = getThemeColors().isDark;
        var newTheme = isDarkNow ? 'light' : 'dark';
        
        try {
          localStorage.setItem('sogo_theme', newTheme);
          if (window.parent && window.parent !== window) {
            try {
              window.parent.localStorage.setItem('sogo_theme', newTheme);
            } catch(parentStorageError) {}
          }
        } catch(err) {}

        lastThemeMode = newTheme;
        btn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
        injectPersistentStyle();
        enforceUniformCardBaseline();
        syncActiveItemsAndFolders();
        bindEmailIframe();

        try {
          if (window.angular && window.angular.element(document.body).injector()) {
            var rootScope = window.angular.element(document.body).injector().get('$rootScope');
            if (rootScope && !rootScope.$$phase) {
              rootScope.$apply();
            }
          }
        } catch(angularErr) {}
      };
    }

    function enforceUniformCardBaseline() {
      var colors = getThemeColors();
      var shadow3D = colors.isDark 
        ? '0 12px 32px rgba(0, 0, 0, 0.7), 0 0 20px rgba(255, 255, 255, 0.08)' 
        : '0 12px 28px rgba(0, 0, 0, 0.10), 0 4px 10px rgba(0, 0, 0, 0.04)';

      var middleArea = document.querySelector('[ui-view="list"], #messagesList, .sg-list, [ui-view="contacts"], #contactsList, .sg-contacts-list');
      if (middleArea) {
        middleArea.style.setProperty('background', 'transparent', 'important');
        middleArea.style.setProperty('border', 'none', 'important');
        middleArea.style.setProperty('box-shadow', 'none', 'important');

        var headers = middleArea.querySelectorAll('md-subheader, .md-subheader, .md-subheader-inner, md-toolbar');
        for (var h = 0; h < headers.length; h++) {
          var hEl = headers[h];
          hEl.style.setProperty('background', 'transparent', 'important');
          hEl.style.setProperty('background-color', 'transparent', 'important');
          hEl.style.setProperty('border', 'none', 'important');
          hEl.style.setProperty('box-shadow', 'none', 'important');
          hEl.classList.remove('md-whiteframe-z1', 'md-whiteframe-1dp');

          var texts = hEl.querySelectorAll('span, p, h2, h3, .md-subheader-content');
          for (var tx = 0; tx < texts.length; tx++) {
            texts[tx].style.setProperty('color', colors.textMuted, 'important');
            texts[tx].style.setProperty('background', 'transparent', 'important');
          }
        }
      }

      var forms = document.querySelectorAll('form[name="cardForm"]');
      for (var f = 0; f < forms.length; f++) {
        var frm = forms[f];
        frm.style.setProperty('display', 'flex', 'important');
        frm.style.setProperty('flex-direction', 'column', 'important');
        frm.style.setProperty('flex', '1 1 100%', 'important');
        frm.style.setProperty('min-height', '0', 'important');
        frm.style.setProperty('height', '100%', 'important');
        frm.style.setProperty('overflow', 'hidden', 'important');
      }

      var allCards = document.querySelectorAll('md-card:not(md-dialog md-card):not(#mailView), .sg-card-editor, .sg-contact-view, #contactView');
      for (var c = 0; c < allCards.length; c++) {
        var card = allCards[c];
        card.style.setProperty('border-top-left-radius', '0px', 'important');
        card.style.setProperty('border-top-right-radius', '0px', 'important');
        card.style.setProperty('border-bottom-left-radius', '20px', 'important');
        card.style.setProperty('border-bottom-right-radius', '20px', 'important');
        card.style.setProperty('margin', '0px 12px 8px 4px', 'important');
        card.style.setProperty('height', 'calc(100% - 8px)', 'important');
        card.style.setProperty('max-height', 'calc(100% - 8px)', 'important');
        card.style.setProperty('background-color', colors.bgCard, 'important');
        card.style.setProperty('box-shadow', shadow3D, 'important');
        card.style.setProperty('border', '1px solid ' + colors.border, 'important');
        card.style.setProperty('overflow', 'hidden', 'important');
        card.style.setProperty('display', 'flex', 'important');
        card.style.setProperty('flex-direction', 'column', 'important');

        var scrollers = card.querySelectorAll('[md-scroll-y], md-card-content, .md-card-content, md-content');
        for (var sc = 0; sc < scrollers.length; sc++) {
          var el = scrollers[sc];
          el.style.setProperty('overflow-y', 'auto', 'important');
          el.style.setProperty('overflow-x', 'hidden', 'important');
          el.style.setProperty('flex', '1 1 0px', 'important');
          el.style.setProperty('min-height', '0', 'important');
          el.style.setProperty('-webkit-overflow-scrolling', 'touch', 'important');
        }
      }
    }

    /*
     * MULTI-SELECTOR HTML EMAIL CTA BUTTON & LINK COLOR ENGINE
     * Kiszűri a SOGo gyári 'a { color: #004a77 !important; }' felülbírálását,
     * és az elemeken megadott inline és szülői színeket !important rangra emeli (gombok, fejlécek fehér szövege).
     */
    function isolateEmailIframe() {
      var iframes = document.querySelectorAll('iframe#messageFrame, iframe.sg-message-frame, [ui-view="message"] iframe, .sg-mail-view iframe');
      if (!iframes || iframes.length === 0) return;

      for (var fIdx = 0; fIdx < iframes.length; fIdx++) {
        var iframe = iframes[fIdx];
        try {
          var doc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
          if (!doc || !doc.body) continue;

          // 1. Eltávolítjuk a SOGo alapértelmezett zöld link kényszerítését az iframe-ből
          var styleId = 'sogo-expressive-iframe-cleaner';
          if (!doc.getElementById(styleId)) {
            var st = doc.createElement('style');
            st.id = styleId;
            st.textContent = `
              html, body {
                background-color: #ffffff !important;
                color: #000000;
              }
              a:not([data-sg-fixed]), a:not([data-sg-fixed]) * {
                color: inherit;
              }
            `;
            (doc.head || doc.body).appendChild(st);
          }

          // 2. Kinyerjük és felminősítjük a saját inline színnel rendelkező HTML elemeket
          var coloredNodes = doc.body.querySelectorAll('[style*="color"], [style*="COLOR"], [color], font');
          for (var i = 0; i < coloredNodes.length; i++) {
            var node = coloredNodes[i];
            
            var inlineStyle = node.getAttribute('style') || '';
            var styleMatch = inlineStyle.match(/(?:^|;\s*)color\s*:\s*([^;!]+)/i);
            var attrColor = node.getAttribute('color');
            var colorVal = styleMatch ? styleMatch[1].trim() : attrColor;

            if (colorVal) {
              node.style.setProperty('color', colorVal, 'important');
              node.setAttribute('data-sg-fixed', 'true');
              if (node.tagName.toLowerCase() === 'a') {
                var aChildren = node.querySelectorAll('*');
                for (var ac = 0; ac < aChildren.length; ac++) {
                  aChildren[ac].style.setProperty('color', colorVal, 'important');
                  aChildren[ac].setAttribute('data-sg-fixed', 'true');
                }
              }
            }
          }

          // 3. Szülői háttérszín és feliratszín kereső motor az 'a' elemeknél (pl. MediaMarkt piros gomb)
          var links = doc.body.getElementsByTagName('a');
          for (var j = 0; j < links.length; j++) {
            var a = links[j];
            if (a.getAttribute('data-sg-fixed')) continue;

            var parent = a.parentElement;
            var foundColor = null;

            while (parent && parent !== doc.body) {
              var pStyle = parent.getAttribute('style') || '';
              var pColorMatch = pStyle.match(/(?:^|;\s*)color\s*:\s*([^;!]+)/i);
              var pAttrColor = parent.getAttribute('color');
              
              if (pColorMatch || pAttrColor) {
                foundColor = pColorMatch ? pColorMatch[1].trim() : pAttrColor;
                break;
              }

              var bgAttr = parent.getAttribute('bgcolor') || '';
              var pBgMatch = pStyle.match(/(?:^|;\s*)background(?:-color)?\s*:\s*([^;!]+)/i);
              if (bgAttr || pBgMatch) {
                var bgVal = (bgAttr || (pBgMatch ? pBgMatch[1] : '')).trim().toLowerCase();
                if (bgVal && bgVal !== '#ffffff' && bgVal !== '#fff' && bgVal !== 'white' && bgVal !== 'transparent' && bgVal !== 'none') {
                  foundColor = '#ffffff';
                  break;
                }
              }

              parent = parent.parentElement;
            }

            if (foundColor) {
              a.style.setProperty('color', foundColor, 'important');
              a.setAttribute('data-sg-fixed', 'true');
              var childNodes = a.querySelectorAll('*');
              for (var cIdx = 0; cIdx < childNodes.length; cIdx++) {
                childNodes[cIdx].style.setProperty('color', foundColor, 'important');
                childNodes[cIdx].setAttribute('data-sg-fixed', 'true');
              }
            }
          }

          // 4. Belső MutationObserver az iframe body megfigyelésére levélváltáskor
          if (!iframe.getAttribute('data-sg-iframe-observed') && doc.body) {
            iframe.setAttribute('data-sg-iframe-observed', 'true');
            var iframeObs = new MutationObserver(function() {
              isolateEmailIframe();
            });
            iframeObs.observe(doc.body, { childList: true, subtree: true });
          }
        } catch(e) {}
      }
    }

    /*
     * Dinamikus eseménykötés az iframe újratöltődésére (amikor új levelet nyit meg a felhasználó)
     */
    function bindEmailIframe() {
      var iframes = document.querySelectorAll('iframe#messageFrame, iframe.sg-message-frame, [ui-view="message"] iframe, .sg-mail-view iframe');
      if (!iframes || iframes.length === 0) return;

      isolateEmailIframe();

      for (var fIdx = 0; fIdx < iframes.length; fIdx++) {
        var iframe = iframes[fIdx];
        if (!iframe.getAttribute('data-sg-theme-bound')) {
          iframe.setAttribute('data-sg-theme-bound', 'true');
          iframe.addEventListener('load', function() {
            isolateEmailIframe();
            setTimeout(isolateEmailIframe, 50);
            setTimeout(isolateEmailIframe, 200);
          });
        }
      }
    }

    function syncActiveItemsAndFolders() {
      var colors = getThemeColors();

      var items = document.querySelectorAll('[ui-view="list"] md-list-item, #messagesList md-list-item, [ui-view="contacts"] md-list-item, #contactsList md-list-item');
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var selected = isMessageSelected(item);
        var starred = !selected && isMessageStarred(item);
        var unread = isMessageUnread(item);

        var existingDot = item.querySelector('.tb-unread-dot');
        if (unread) {
          if (!existingDot) {
            var dot = document.createElement('span');
            dot.className = 'tb-unread-dot';
            item.appendChild(dot);
          }
          item.style.setProperty('padding-left', '12px', 'important');
        } else {
          if (existingDot) existingDot.remove();
          item.style.removeProperty('padding-left');
        }

        if (selected) {
          item.style.setProperty('background-color', colors.bgActivePanel, 'important');
          item.style.setProperty('border', '1px solid ' + colors.borderActivePanel, 'important');
          item.style.setProperty('border-left', '5px solid ' + colors.borderActivePanel, 'important');
        } else if (starred) {
          item.style.setProperty('background-color', colors.bgStarSoft, 'important');
          item.style.setProperty('border', '1px solid ' + colors.borderStarSoft, 'important');
          item.style.setProperty('border-left', '5px solid ' + colors.borderStarSoft, 'important');
        } else {
          item.style.setProperty('background-color', colors.itemCardBg, 'important');
          item.style.setProperty('border', '1px solid ' + colors.itemCardBorder, 'important');
          item.style.removeProperty('border-left');
        }
      }

      var sideNavListItems = document.querySelectorAll('md-sidenav md-list-item');
      for (var f = 0; f < sideNavListItems.length; f++) {
        var folder = sideNavListItems[f];
        if (folder.classList.contains('sg-user-info') || folder.querySelector('.sg-avatar, .sg-user-name')) continue;

        var isSel = isFolderActive(folder);
        var isUnread = !isSel && isFolderUnread(folder);

        var targetBadgeBg = isSel ? colors.folderBadgeActiveBg : colors.folderBadgeBg;
        var targetBadgeText = isSel ? colors.folderBadgeActiveText : colors.folderBadgeText;

        var allChildNodes = folder.querySelectorAll('*');
        for (var cn = 0; cn < allChildNodes.length; cn++) {
          var ch = allChildNodes[cn];
          var chText = (ch.textContent || '').trim();
          if (/^[1-9]\d*$/.test(chText) && ch.children.length === 0) {
            ch.classList.add('tb-folder-circle-badge');
            ch.style.setProperty('background-color', targetBadgeBg, 'important');
            ch.style.setProperty('color', targetBadgeText, 'important');
            ch.style.setProperty('-webkit-text-fill-color', targetBadgeText, 'important');
          }
        }

        var folderTexts = folder.querySelectorAll('p, span, .sg-name, .md-body-1, md-icon');
        for (var tx = 0; tx < folderTexts.length; tx++) {
          if (colors.isDark) {
            folderTexts[tx].style.setProperty('color', isSel ? '#ffffff' : '#e2e8f0', 'important');
          } else {
            folderTexts[tx].style.setProperty('color', isSel ? '#002244' : '#041e49', 'important');
          }
        }

        if (isSel) {
          folder.style.setProperty('background-color', colors.bgActiveFolder, 'important');
          folder.style.setProperty('border', '1px solid ' + colors.borderActiveFolder, 'important');
          folder.style.setProperty('border-left', '4px solid ' + colors.borderLeftActiveFolder, 'important');
        } else if (isUnread) {
          folder.style.setProperty('background-color', colors.bgUnreadFolder, 'important');
          folder.style.setProperty('border', '1px solid ' + colors.borderUnreadFolder, 'important');
          folder.style.removeProperty('border-left');
        } else {
          folder.style.removeProperty('background-color');
          folder.style.removeProperty('border');
          folder.style.removeProperty('border-left');
        }
      }
    }

    var refreshTimer = null;
    var lastThemeMode = null;
    var observer = null;

    function refreshTheme(forceStyle) {
      var colors = getThemeColors();
      var mode = colors.isDark ? 'dark' : 'light';

      if (forceStyle || mode !== lastThemeMode) {
        injectPersistentStyle();
        lastThemeMode = mode;
      }

      injectThemeToggleButton();
      enforceUniformCardBaseline();
      syncActiveItemsAndFolders();
      bindEmailIframe();
    }

    function scheduleRefresh(forceStyle) {
      if (refreshTimer) {
        $timeout.cancel(refreshTimer);
      }

      refreshTimer = $timeout(function() {
        refreshTimer = null;
        refreshTheme(!!forceStyle);
      }, 80, false);
    }

    function startObserver() {
      if (!window.MutationObserver || !document.body) return;

      observer = new MutationObserver(function() {
        scheduleRefresh(false);
      });

      observer.observe(document.body, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['class', 'aria-selected', 'ng-class']
      });
    }

    $timeout(function() {
      refreshTheme(true);
      startObserver();
    }, 150, false);

    window.addEventListener('storage', function(event) {
      if (!event || !event.key || event.key === 'sogo_theme' ||
          event.key === 'theme' || event.key === 'theme_mode') {
        scheduleRefresh(true);
      }
    });

    try {
      var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (mediaQuery && mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', function() {
          var explicitTheme = null;
          try {
            explicitTheme = localStorage.getItem('sogo_theme');
          } catch(storageError) {}
          if (explicitTheme !== 'dark' && explicitTheme !== 'light') {
            scheduleRefresh(true);
          }
        });
      } else if (mediaQuery && mediaQuery.addListener) {
        mediaQuery.addListener(function() {
          var explicitTheme = null;
          try {
            explicitTheme = localStorage.getItem('sogo_theme');
          } catch(storageError) {}
          if (explicitTheme !== 'dark' && explicitTheme !== 'light') {
            scheduleRefresh(true);
          }
        });
      }
    } catch(mediaError) {}
  }
})();
