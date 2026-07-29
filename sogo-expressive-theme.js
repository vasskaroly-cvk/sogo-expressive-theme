/**
 * ============================================================================
 * SOGo Webmail - Modern Gmail (Material 3) Theme
 * Version: 1.0.1
 * Description: A modern, light-blue Gmail Material 3 theme for SOGo Webmail.
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
    .run(applyGmailTheme);

  /* ======================================================
     1. ANGULAR MATERIAL THEME CONFIGURATION
     ====================================================== */
  configureTheme.$inject = ['$mdThemingProvider'];
  function configureTheme($mdThemingProvider) {
    
    // Define custom Gmail Material 3 Light Blue Palette (#c2e7ff)
    var gmailBlue = $mdThemingProvider.extendPalette('blue', {
      '50': 'c2e7ff', '100': 'c2e7ff', '200': 'c2e7ff', '300': 'c2e7ff',
      '400': 'c2e7ff', '500': 'c2e7ff', '600': 'c2e7ff', '700': 'c2e7ff',
      '800': 'c2e7ff', '900': 'c2e7ff', 'A100': 'c2e7ff', 'A200': 'c2e7ff',
      'A400': 'c2e7ff', 'A700': 'c2e7ff',
      'contrastDefaultColor': 'dark'
    });
    
    $mdThemingProvider.definePalette('gmailBlue', gmailBlue);

    $mdThemingProvider.theme('default')
      .primaryPalette('grey', { 'default': '50' }) 
      .accentPalette('gmailBlue'); 
      
    $mdThemingProvider.generateThemesOnDemand(false);
  }

  /* ======================================================
     2. DYNAMIC STYLES & REAL-TIME DOM SYNCHRONIZATION
     ====================================================== */
  applyGmailTheme.$inject = ['$interval', '$timeout'];
  function applyGmailTheme($interval, $timeout) {

    function injectPersistentStyle() {
      const styleId = 'sogo-gmail-theme-v1-0-1';
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
              border-bottom: 16px solid #f4f7fc !important;
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
          [ui-view="list"], [ui-view="detail"], [ui-view="calendar"], [ui-view="contacts"] {
              background-color: transparent !important;
              background: transparent !important;
              box-sizing: border-box !important;
              padding-bottom: 0 !important;
              margin-bottom: 0 !important;
          }

          /* Middle Column (Email List Card): 24px Radius All Corners */
          [id="messagesList"], 
          [id="contactsList"],
          .sg-list,
          .sg-contacts-list,
          .sg-calendar-view,
          [ui-view="calendar"] > *,
          [id="calendarView"],
          .sg-calendar-container {
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
          [id="contactView"],
          [id="cardView"],
          .sg-mail-view, 
          .sg-record-view,
          .sg-contact-view,
          .sg-card-view {
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
          md-sidenav.md-locked-open,
          md-sidenav md-content,
          md-sidenav md-content.md-default-theme,
          .sg-calendar-sidebar,
          .sg-contacts-sidebar,
          .sg-folder-list {
              background-color: #f4f7fc !important;
              background: #f4f7fc !important;
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

          .sg-list md-toolbar, [id="messagesList"] md-toolbar, [id="contactsList"] md-toolbar, .sg-calendar-view md-toolbar {
              background-color: #ffffff !important;
              border-bottom: 1px solid #f1f3f4 !important;
              border-top-left-radius: 24px !important;
              border-top-right-radius: 24px !important;
          }

          .sg-mail-view md-toolbar, [id="mailView"] md-toolbar, md-card md-toolbar, .sg-contact-view md-toolbar {
              background-color: #ffffff !important;
              border-bottom: 1px solid #f1f3f4 !important;
              border-radius: 0 !important;
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

          /* =========================================
             3. SIDEBAR FOLDER CAPSULES
             ========================================= */
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
              color: #5f6368 !important;
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
          
          md-sidenav .sg-filter-input,
          md-sidenav md-toolbar.sg-filter-toolbar,
          md-sidenav form.sg-filter,
          md-sidenav [layout="row"]:has(input),
          md-sidenav form,
          md-sidenav .md-toolbar-tools:has(input) {
              background-color: #eaf1fb !important;
              background: #eaf1fb !important;
              border-radius: 24px !important;
              margin: 8px 12px !important;
              padding: 2px 12px !important;
              color: #041e49 !important;
              border: none !important;
              box-shadow: none !important;
          }

          md-sidenav input {
              color: #041e49 !important;
              background-color: transparent !important;
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
          [id="messagesList"] .sg-list-item,
          [id="contactsList"] md-list-item,
          [id="contactsList"] .sg-tile,
          [id="contactsList"] .sg-list-item,
          .sg-contacts-list md-list-item {
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
          [id="messagesList"] .sg-tile:hover,
          [id="contactsList"] md-list-item:hover,
          [id="contactsList"] .sg-tile:hover { 
              background-color: #f1f3f4 !important; 
          }

          /* =========================================
             5. DIALOGS & POP-UPS
             ========================================= */
          md-dialog,
          .md-dialog-container,
          md-dialog-content,
          .sg-event-editor {
              background-color: #ffffff !important;
              color: #202124 !important;
              border-radius: 24px !important;
              box-shadow: 0 4px 16px rgba(0,0,0,0.2) !important;
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
          md-dialog md-checkbox .md-label {
              color: #041e49 !important;
          }

          md-dialog md-input-container label,
          md-dialog md-input-container .md-placeholder {
              color: #5f6368 !important;
          }

          md-dialog md-input-container .md-input {
              border-color: #dadce0 !important;
              color: #041e49 !important;
          }

          md-dialog md-dialog-actions,
          md-dialog .md-actions,
          md-dialog-actions {
              background-color: #ffffff !important;
              border-top: 1px solid #f1f3f4 !important;
              padding: 12px 16px !important;
          }

          md-dialog md-dialog-actions button,
          md-dialog .md-actions button,
          md-dialog button.md-button,
          md-dialog-actions button.md-button {
              color: #0b57d0 !important; 
              font-weight: 700 !important;
              border-radius: 20px !important;
          }

          md-dialog button.md-button[disabled] {
              color: #a8c7fa !important;
          }

          /* =========================================
             6. HEADER ICONS, QUOTA & FAB
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

      var sideNavs = document.querySelectorAll('md-sidenav, md-sidenav.md-locked-open, md-sidenav md-content, .sg-calendar-sidebar, .sg-contacts-sidebar, .sg-folder-list');
      for (var s = 0; s < sideNavs.length; s++) {
        var sn = sideNavs[s];
        sn.style.setProperty('background-color', '#f4f7fc', 'important');
        sn.style.setProperty('background', '#f4f7fc', 'important');
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

      var listCards = document.querySelectorAll('#messagesList, #contactsList, .sg-list, .sg-contacts-list, .sg-calendar-view, [ui-view="calendar"], #calendarView, .sg-calendar-container');
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

      var detailCards = document.querySelectorAll('md-card, .sg-mail-view, .sg-record-view, .sg-contact-view, .sg-card-view, #contactView, #cardView');
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

      var iframes = document.querySelectorAll('iframe, #messageFrame, .sg-mail-iframe');
      for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes[i];
        try {
          if (iframe.contentDocument && iframe.contentDocument.body) {
            iframe.contentDocument.body.style.setProperty('padding-bottom', '12px', 'important');
            iframe.contentDocument.body.style.setProperty('box-sizing', 'border-box', 'important');
          }
        } catch (e) {}
        iframe.style.setProperty('margin-bottom', '8px', 'important');
      }
    }

    // ACTIVE EMAIL & UNREAD FOLDER SYNCHRONIZER
    function syncActiveMailAndUnreadFolders() {
      var listContainers = document.querySelectorAll('#messagesList, #contactsList, [ui-view="list"], .sg-contacts-list');
      for (var c = 0; c < listContainers.length; c++) {
        var list = listContainers[c];
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

      var dialogs = document.querySelectorAll('md-dialog, .sg-event-editor');
      for (var d = 0; d < dialogs.length; d++) {
        var dlg = dialogs[d];
        dlg.style.setProperty('background-color', '#ffffff', 'important');
        dlg.style.setProperty('color', '#202124', 'important');

        var formInputs = dlg.querySelectorAll('input, textarea, md-select, .md-select-value, label, span, p');
        for (var inp = 0; inp < formInputs.length; inp++) {
          formInputs[inp].style.setProperty('color', '#041e49', 'important');
        }

        var dialogBtns = dlg.querySelectorAll('button, .md-button');
        for (var b = 0; b < dialogBtns.length; b++) {
          var btn = dialogBtns[b];
          if (!btn.hasAttribute('disabled')) {
            btn.style.setProperty('color', '#0b57d0', 'important');
          } else {
            btn.style.setProperty('color', '#a8c7fa', 'important');
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