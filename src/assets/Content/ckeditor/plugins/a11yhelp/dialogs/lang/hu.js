﻿/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.plugins.setLang('a11yhelp', 'hu', {
  title: 'Kisegítő utasítások',
  contents: 'Súgó tartalmak. A párbeszédablak bezárásához nyomjon ESC-et.',
  legend: [
    {
      name: 'Általános',
      items: [
        {
          name: 'Szerkesztő Eszköztár',
          legend:
            'Nyomjon ${toolbarFocus} hogy kijelölje az eszköztárat. A következő és előző eszköztár csoporthoz a TAB és SHIFT TAB-al juthat el. A következő és előző eszköztár gombhoz a BAL NYÍL vagy JOBB NYÍL gombbal juthat el. Nyomjon SPACE-t vagy ENTER-t hogy aktiválja az eszköztár gombot.'
        },
        {
          name: 'Szerkesző párbeszéd ablak',
          legend:
            'Párbeszédablakban nyomjon TAB-ot a következő párbeszédmezőhöz ugráshoz, nyomjon SHIFT + TAB-ot az előző mezőhöz ugráshoz, nyomjon ENTER-t a párbeszédablak elfogadásához, nyomjon ESC-et a párbeszédablak elvetéséhez. Azokhoz a párbeszédablakokhoz, amik több fület tartalmaznak, nyomjon ALT + F10-et hogy a fülekre ugorjon. Ezután a TAB-al vagy a JOBB NYÍLLAL a következő fülre ugorhat. Az előző fülre ugráshoz használja a SHIFT + TAB-ot vagy a BAL NYILAT. Nyomjon SPACE-t vagy ENTER-t hogy kijelölje a fület.'
        },
        {
          name: 'Szerkesztő helyi menü',
          legend:
            'Nyomjon ${contextMenu}-t vagy ALKALMAZÁS BILLENTYŰT a helyi menü megnyitásához. Ezután a következő menüpontra léphet a TAB vagy LEFELÉ NYÍLLAL. Az előző opciót a SHIFT+TAB vagy FELFELÉ NYÍLLAL érheti el. Nyomjon SPACE-t vagy ENTER-t a menüpont kiválasztásához. A jelenlegi menüpont almenüjének megnyitásához nyomjon SPACE-t vagy ENTER-t, vagy JOBB NYILAT. A főmenühöz való visszatéréshez nyomjon ESC-et vagy BAL NYILAT. A helyi menü bezárása az ESC billentyűvel lehetséges.'
        },
        {
          name: 'Szerkesztő lista',
          legend:
            'A listán belül a következő elemre a TAB vagy LEFELÉ NYÍLLAL mozoghat. Az előző elem kiválasztásához nyomjon SHIFT+TAB-ot vagy FELFELÉ NYILAT. Nyomjon SPACE-t vagy ENTER-t az elem kiválasztásához. Az ESC billentyű megnyomásával bezárhatja a listát.'
        },
        {
          name: 'Szerkesztő elem utak sáv',
          legend:
            'Nyomj ${elementsPathFocus} hogy kijelöld a elemek út sávját. A következő elem gombhoz a TAB-al vagy a JOBB NYÍLLAL juthatsz el. Az előző gombhoz a SHIFT+TAB vagy BAL NYÍLLAL mehetsz. A SPACE vagy ENTER billentyűvel kiválaszthatod az elemet a szerkesztőben.'
        }
      ]
    },
    {
      name: 'Parancsok',
      items: [
        { name: 'Parancs visszavonása', legend: 'Nyomj ${undo}' },
        { name: 'Parancs megismétlése', legend: 'Nyomjon ${redo}' },
        { name: 'Félkövér parancs', legend: 'Nyomjon ${bold}' },
        { name: 'Dőlt parancs', legend: 'Nyomjon ${italic}' },
        { name: 'Aláhúzott parancs', legend: 'Nyomjon ${underline}' },
        { name: 'Link parancs', legend: 'Nyomjon ${link}' },
        { name: 'Szerkesztősáv összecsukása parancs', legend: 'Nyomjon ${toolbarCollapse}' },
        {
          name: 'Hozzáférés az előző fókusz helyhez parancs',
          legend:
            'Nyomj ${accessNextSpace} hogy hozzáférj a legközelebbi elérhetetlen fókusz helyhez a hiányjel előtt, például: két szomszédos HR elemhez. Ismételd meg a billentyűkombinációt hogy megtaláld a távolabbi fókusz helyeket.'
        },
        {
          name: 'Hozzáférés a következő fókusz helyhez parancs',
          legend:
            'Nyomj ${accessNextSpace} hogy hozzáférj a legközelebbi elérhetetlen fókusz helyhez a hiányjel után, például: két szomszédos HR elemhez. Ismételd meg a billentyűkombinációt hogy megtaláld a távolabbi fókusz helyeket.'
        },
        { name: 'Kisegítő súgó', legend: 'Nyomjon ${a11yHelp}' }
      ]
    }
  ]
});
