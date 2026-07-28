/**
 * ============================================================================
 * SOGo Webmail - Modern Expressive (Material 3) Theme
 * Version: 1.0.0
 * Description: A modern, light-blue Material 3 inspired theme for SOGo Webmail.
 * Features: 
 *  - Floating rounded card layout
 *  - Pill/capsule selections for folders and email rows
 *  - Smart unread folder highlighting
 *  - Synchronized selection states & dark blue typography
 *  - Custom Material 3 light-blue palette integration
 * License: MIT
 * ============================================================================
 */

(function() {
  'use strict';

  angular.module('SOGo.Common')
    .config(configureTheme)
    .run(applyExpressiveTheme);

  /* ======================================================
     1. ANGULAR MATERIAL THEME CONFIGURATION
     ====================================================== */
  configureTheme.$inject = ['$mdThemingProvider'];
  function configureTheme($mdThemingProvider) {
    
    // Define custom Material 3 Light Blue Palette (#c2e7ff)
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
     2. DYNAMIC STYLES & REAL-TIME DOM SYNCHRONIZATION
     ====================================================== */
  applyExpressiveTheme.$inject = ['$interval', '$timeout'];
  function applyExpressiveTheme($interval, $timeout) {

    function injectPersistentStyle() {
      const styleId = 'sogo-expressive-theme-v1-0-0';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
          /* =========================================
             1. CANVAS & ROOT BASELINE
             ========================================= */
          html, body {
              background-color: #f4f7fc !important;
              height: 100vh !important;
              max-height: 100vh !important;
              border-bottom: 16px solid #f4f7fc !important; /* Root bottom barrier */
              box-sizing: border-box !important;
              overflow: hidden !important;
          }

          .sg-main-view, [ui-view="main"], .sg-main-container,
          .layout-row, .layout-column {
              background-color: #f4f7fc !important;
              box-sizing: border-box !important;
          }

          md-toolbar, .sg-header md-toolbar {
              background-color: #f4f7fc !important;
              color: #202124 !important;
              box-shadow: none !important;
          }

          /* =========================================
             2. FLOATING COLUMN CARDS
             ========================================= */
          [ui-view="list"], [ui-view="detail"] {
              background-color: transparent !important;
              background: transparent !important;
              box-sizing: border-box !important;
              padding-bottom: 0 !important;
              margin-bottom: 0 !important;
          }

          /* Middle Column (Email List Card): 24px Radius All Corners */
          [id="messagesList"], 
          .sg-list {
              background-color: #ffffff !important;
              border-radius: 24px !important;
              margin: 8px 4px 0px 6px !important;
              height: calc(100% - 8px) !important;
              max-height: calc(100% - 8px) !important;
              box-shadow: 0 1px 4px rgba(60,64,67,0.15) !important;
              overflow: hidden !important;
              border: none !important;
              box-sizing: border-box !important;
          }

          /* Right Column (Email Content Card): Flat Top, 24px Round Bottom */
          md-card,
          [id="mailView"],
          [id="messageView"],
          .sg-mail-view, 
          .sg-record-view {
              background-color: #ffffff !important;
              border-top-left-radius: 0 !important;
              border-top-right-radius: 0 !important;
              border-bottom-left-radius: 24px !important;
              border-bottom-right-radius: 24px !important;
              margin: 0 12px 0px 4px !important;
              height: 100% !important;
              max-height: 100% !important;
              box-shadow: 0 2px 5px rgba(60,64,67,0.15) !important;
              overflow: hidden !important;
              border: none !important;
              box-sizing: border-box !important;
          }

          /* Left Sidebar Container: Flat Top, 24px Round Bottom */
          md-sidenav,
          md-sidenav.md-locked-open {
              background-color: #f4f7fc !important;
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

          .sg-list md-toolbar, [id="messagesList"] md-toolbar {
              background-color: #ffffff !important;
              border-bottom: 1px solid #f1f3f4 !important;
              border-top-left-radius: 24px !important;
              border-top-right-radius: 24px !important;
          }

          .sg-mail-view md-toolbar, [id="mailView"] md-toolbar, md-card md-toolbar {
              background-color: #ffffff !important;
              border-bottom: 1px solid #f1f3f4 !important;
              border-radius: 0 !important;
          }

          /* =========================================
             3. SIDEBAR FOLDER CAPSULES
             ========================================= */
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
              background-color: #e8eaed !important; 
          }

          /* Active Folder Highlight (#d3e3fd) */
          md-sidenav md-list-item.md-active,
          md-sidenav md-list-item.sg-item-selected,
          md-sidenav md-list-item.md-active .md-button {
              background-color: #d3e3fd !important; 
          }

          /* Unread Folder Highlight (#eaf1fb) */
          md-sidenav md-list-item.sg-unread:not(.md-active):not(.sg-item-selected),
          md-sidenav md-list-item.sg-folder-unread:not(.md-active):not(.sg-item-selected),
          md-sidenav md-list-item:has(.sg-badge):not(.md-active):not(.sg-item-selected),
          md-sidenav md-list-item:has(.md-secondary):not(.md-active):not(.sg-item-selected) {
              background-color: #eaf1fb !important;
          }
          
          md-sidenav md-list-item *,
          md-sidenav md-list-item md-icon,
          md-sidenav md-list-item md-icon svg {
              color: #041e49 !important;
              fill: #041e49 !important;
              font-weight: 500 !important;
          }

          md-sidenav md-list-item.md-active *,
          md-sidenav md-list-item.sg-item-selected *,
          md-sidenav md-list-item.sg-unread *,
          md-sidenav md-list-item.sg-folder-unread *,
          md-sidenav md-list-item:has(.sg-badge) * {
              font-weight: 700 !important;
          }

          /* =========================================
             4. EMAIL LIST ITEM CAPSULES
             ========================================= */
          [id="messagesList"] md-list-item,
          [id="messagesList"] .sg-tile,
          [id="messagesList"] .sg-list-item {
              margin: 2px 10px !important;
              width: calc(100% - 20px) !important;
              max-width: calc(100% - 20px) !important;
              border-radius: 24px !important;
              box-sizing: border-box !important;
              overflow: hidden !important;
              transition: background-color 0.2s ease !important;
          }

          /* Hover State */
          [id="messagesList"] md-list-item:hover,
          [id="messagesList"] .sg-tile:hover { 
              background-color: #f1f3f4 !important; 
          }

          /* =========================================
             5. HEADER ICONS, QUOTA & FAB
             ========================================= */
          .sg-user-info, .sg-user-info *, .sg-user-name, 
          .sg-md-caption, md-sidenav .md-caption {
              color: #5f6368 !important; 
          }
          
          md-sidenav md-toolbar md-icon,
          md-sidenav md-toolbar md-icon svg,
          md-sidenav md-toolbar button md-icon,
          md-sidenav md-toolbar button md-icon svg,
          .sg-user-info md-icon, 
          .sg-user-info md-icon svg {
              color: #041e49 !important;
              fill: #041e49 !important;
              opacity: 1 !important; 
          }
          
          md-progress-linear .md-container {
              background-color: #eaf1fb !important; 
              border-radius: 4px !important;
          }
          md-progress-linear .md-bar {
              background-color: #0b57d0 !important; 
              border-radius: 4px !important;
          }

          button.md-fab {
              background-color: #c2e7ff !important;
              border-radius: 16px !important;
          }
          button.md-fab md-icon { 
              color: #001d35 !important; 
              fill: #001d35 !important;
          }
          
          ::-webkit-scrollbar { width: 8px !important; height: 8px !important; }
          ::-webkit-scrollbar-track { background: transparent !important; }
          ::-webkit-scrollbar-thumb { background: #dadce0 !important; border-radius: 4px !important; }
          ::-webkit-scrollbar-thumb:hover { background: #bdc1c6 !important; }
        `;
        
        document.head.appendChild(style);
      }
    }

    // BASELINE ALIGNMENT ENFORCER
    function enforceUniformCardBaseline() {
      document.documentElement.style.setProperty('border-bottom', '16px solid #f4f7fc', 'important');
      document.body.style.setProperty('border-bottom', '16px solid #f4f7fc', 'important');

      var wrappers = document.querySelectorAll('[ui-view="list"], [ui-view="detail"]');
      for (var w = 0; w < wrappers.length; w++) {
        wrappers[w].style.setProperty('background-color', 'transparent', 'important');
        wrappers[w].style.setProperty('background', 'transparent', 'important');
        wrappers[w].style.setProperty('padding-bottom', '0px', 'important');
        wrappers[w].style.setProperty('margin-bottom', '0px', 'important');
      }

      var sideNavs = document.querySelectorAll('md-sidenav, md-sidenav.md-locked-open');
      for (var s = 0; s < sideNavs.length; s++) {
        var sn = sideNavs[s];
        sn.style.setProperty('border-top-left-radius', '0px', 'important');
        sn.style.setProperty('border-top-right-radius', '0px', 'important');
        sn.style.setProperty('border-bottom-left-radius', '24px', 'important');
        sn.style.setProperty('border-bottom-right-radius', '24px', 'important');
        sn.style.setProperty('margin-bottom', '0px', 'important');
        sn.style.setProperty('height', '100%', 'important');
        sn.style.setProperty('max-height', '100%', 'important');
        sn.style.setProperty('overflow', 'hidden', 'important');
      }

      var listCards = document.querySelectorAll('#messagesList, .sg-list');
      for (var l = 0; l < listCards.length; l++) {
        var lc = listCards[l];
        lc.style.setProperty('border-radius', '24px', 'important');
        lc.style.setProperty('margin-top', '8px', 'important');
        lc.style.setProperty('margin-bottom', '0px', 'important');
        lc.style.setProperty('height', 'calc(100% - 8px)', 'important');
        lc.style.setProperty('max-height', 'calc(100% - 8px)', 'important');
        lc.style.setProperty('overflow', 'hidden', 'important');
        lc.style.setProperty('background-color', '#ffffff', 'important');
      }

      var detailCards = document.querySelectorAll('md-card, .sg-mail-view, .sg-record-view');
      for (var d = 0; d < detailCards.length; d++) {
        var dc = detailCards[d];
        dc.style.setProperty('border-top-left-radius', '0px', 'important');
        dc.style.setProperty('border-top-right-radius', '0px', 'important');
        dc.style.setProperty('border-bottom-left-radius', '24px', 'important');
        dc.style.setProperty('border-bottom-right-radius', '24px', 'important');
        dc.style.setProperty('margin-bottom', '0px', 'important');
        dc.style.setProperty('height', '100%', 'important');
        dc.style.setProperty('max-height', '100%', 'important');
        dc.style.setProperty('overflow', 'hidden', 'important');
        dc.style.setProperty('background-color', '#ffffff', 'important');
      }
    }

    // ACTIVE EMAIL & UNREAD FOLDER SYNCHRONIZER
    function syncActiveMailAndUnreadFolders() {
      // 1. ACTIVE MAIL SELECTION
      var list = document.getElementById('messagesList');
      if (list) {
        var items = list.querySelectorAll('md-list-item, .sg-tile, .sg-list-item');
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          
          var selected = item.classList.contains('md-active') || 
                         item.classList.contains('sg-item-selected') || 
                         item.classList.contains('sg-item-active') || 
                         item.classList.contains('sg-selected') ||
                         item.getAttribute('aria-selected') === 'true' ||
                         item.querySelector('.md-active, .sg-item-selected, .sg-item-active, .sg-selected, [aria-selected="true"]') !== null;

          if (selected) {
            item.style.setProperty('background-color', '#c2e7ff', 'important');
            item.style.setProperty('background', '#c2e7ff', 'important');
            item.style.setProperty('border-radius', '24px', 'important');

            var children = item.querySelectorAll('*');
            for (var j = 0; j < children.length; j++) {
              var ch = children[j];
              ch.style.setProperty('background-color', 'transparent', 'important');
              ch.style.setProperty('color', '#041e49', 'important');
            }
          } else {
            item.style.removeProperty('background-color');
            item.style.removeProperty('background');

            var unselectedChildren = item.querySelectorAll('*');
            for (var k = 0; k < unselectedChildren.length; k++) {
              unselectedChildren[k].style.removeProperty('background-color');
              unselectedChildren[k].style.removeProperty('background');
              unselectedChildren[k].style.removeProperty('color');
            }
          }
        }
      }

      // 2. UNREAD FOLDER CAPSULE HIGHLIGHT
      var sideNav = document.querySelector('md-sidenav');
      if (sideNav) {
        var folderItems = sideNav.querySelectorAll('md-list-item');
        for (var f = 0; f < folderItems.length; f++) {
          var folder = folderItems[f];
          var isFolderSelected = folder.classList.contains('md-active') || folder.classList.contains('sg-item-selected');
          
          var hasUnread = false;
          
          if (!isFolderSelected) {
            var textNodes = folder.querySelectorAll('span, div, p, .md-secondary, .sg-badge');
            for (var t = 0; t < textNodes.length; t++) {
              var txt = textNodes[t].textContent ? textNodes[t].textContent.trim() : '';
              if ((/^\d+$/.test(txt) && parseInt(txt, 10) > 0) || (txt.indexOf('|') !== -1 && /\d+/.test(txt))) {
                hasUnread = true;
                break;
              }
            }
          }

          var innerBtn = folder.querySelector('.md-button, .md-no-style') || folder;

          if (hasUnread && !isFolderSelected) {
            folder.style.setProperty('background-color', '#eaf1fb', 'important');
            folder.style.setProperty('border-radius', '24px', 'important');
            if (innerBtn) {
              innerBtn.style.setProperty('background-color', '#eaf1fb', 'important');
              innerBtn.style.setProperty('border-radius', '24px', 'important');
            }
            
            var spans = folder.querySelectorAll('span, div, md-icon');
            for (var s = 0; s < spans.length; s++) {
              spans[s].style.setProperty('font-weight', '700', 'important');
              spans[s].style.setProperty('color', '#041e49', 'important');
            }
          } else if (!hasUnread && !isFolderSelected) {
            if (folder.style.backgroundColor === 'rgb(234, 241, 251)' || folder.style.backgroundColor === '#eaf1fb') {
              folder.style.removeProperty('background-color');
              if (innerBtn) innerBtn.style.removeProperty('background-color');
              
              var normalSpans = folder.querySelectorAll('span, div');
              for (var n = 0; n < normalSpans.length; n++) {
                normalSpans[n].style.removeProperty('font-weight');
              }
            }
          }
        }
      }
    }

    $timeout(function() {
      injectPersistentStyle();
      enforceUniformCardBaseline();
      syncActiveMailAndUnreadFolders();
    }, 100);

    $interval(function() {
      injectPersistentStyle();
      enforceUniformCardBaseline();
      syncActiveMailAndUnreadFolders();
    }, 300);
  }
})();