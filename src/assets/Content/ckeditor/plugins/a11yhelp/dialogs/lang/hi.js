﻿/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.plugins.setLang('a11yhelp', 'hi', {
  title: 'Accessibility Instructions',
  contents: 'Help Contents. To close this dialog press ESC.',
  legend: [
    {
      name: 'सामान्य',
      items: [
        {
          name: 'Editor Toolbar',
          legend:
            'Press ${toolbarFocus} to navigate to the toolbar. Move to the next and previous toolbar group with TAB and SHIFT-TAB. Move to the next and previous toolbar button with RIGHT ARROW or LEFT ARROW. Press SPACE or ENTER to activate the toolbar button.'
        },
        {
          name: 'Editor Dialog',
          legend:
            'Inside a dialog, press TAB to navigate to next dialog field, press SHIFT + TAB to move to previous field, press ENTER to submit dialog, press ESC to cancel dialog. For dialogs that have multiple tab pages, press ALT + F10 to navigate to tab-list. Then move to next tab with TAB OR RIGTH ARROW. Move to previous tab with SHIFT + TAB or LEFT ARROW. Press SPACE or ENTER to select the tab page.'
        },
        {
          name: 'Editor Context Menu',
          legend:
            'Press ${contextMenu} or APPLICATION KEY to open context-menu. Then move to next menu option with TAB or DOWN ARROW. Move to previous option with SHIFT+TAB or UP ARROW. Press SPACE or ENTER to select the menu option. Open sub-menu of current option with SPACE or ENTER or RIGHT ARROW. Go back to parent menu item with ESC or LEFT ARROW. Close context menu with ESC.'
        },
        {
          name: 'Editor List Box',
          legend:
            'Inside a list-box, move to next list item with TAB OR DOWN ARROW. Move to previous list item with SHIFT + TAB or UP ARROW. Press SPACE or ENTER to select the list option. Press ESC to close the list-box.'
        },
        {
          name: 'Editor Element Path Bar',
          legend:
            'Press ${elementsPathFocus} to navigate to the elements path bar. Move to next element button with TAB or RIGHT ARROW. Move to previous button with  SHIFT+TAB or LEFT ARROW. Press SPACE or ENTER to select the element in editor.'
        }
      ]
    },
    {
      name: 'Commands',
      items: [
        { name: ' Undo command', legend: 'Press ${undo}' },
        { name: ' Redo command', legend: 'Press ${redo}' },
        { name: ' Bold command', legend: 'Press ${bold}' },
        { name: ' Italic command', legend: 'Press ${italic}' },
        { name: ' Underline command', legend: 'Press ${underline}' },
        { name: ' Link command', legend: 'Press ${link}' },
        { name: ' Toolbar Collapse command', legend: 'Press ${toolbarCollapse}' },
        {
          name: ' Access previous focus space command',
          legend:
            'Press ${accessPreviousSpace} to access the closest unreachable focus space before the caret, for example: two adjacent HR elements. Repeat the key combination to reach distant focus spaces.'
        },
        {
          name: ' Access next focus space command',
          legend:
            'Press ${accessNextSpace} to access the closest unreachable focus space after the caret, for example: two adjacent HR elements. Repeat the key combination to reach distant focus spaces.'
        },
        { name: ' Accessibility Help', legend: 'Press ${a11yHelp}' }
      ]
    }
  ]
});
