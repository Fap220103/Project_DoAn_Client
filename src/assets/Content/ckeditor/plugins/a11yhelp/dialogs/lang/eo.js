﻿/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.plugins.setLang('a11yhelp', 'eo', {
  title: 'Uzindikoj pri atingeblo',
  contents: 'Helpilenhavo. Por fermi tiun dialogon, premu la ESKAPAN klavon.',
  legend: [
    {
      name: 'Ĝeneralaĵoj',
      items: [
        {
          name: 'Ilbreto de la redaktilo',
          legend:
            'Premu ${toolbarFocus} por atingi la ilbreton. Moviĝu al la sekva aŭ antaŭa grupoj de la ilbreto per la klavoj TABA kaj MAJUSKLIGA-TABA. Moviĝu al la sekva aŭ antaŭa butonoj de la ilbreto per la klavoj SAGO DEKSTREN kaj SAGO MALDEKSTREN. Premu la SPACETklavon aŭ la ENENklavon por aktivigi la ilbretbutonon.'
        },
        {
          name: 'Redaktildialogo',
          legend:
            'En dialogo, premu la TABAN klavon por navigi al la sekva dialogkampo, premu la MAJUSKLIGAN + TABAN klavojn por reveni al la antaŭa kampo, premu la ENENklavon por sendi la dialogon, premu la ESKAPAN klavon por nuligi la dialogon. Por dialogoj kun pluraj retpaĝoj sub langetoj, premu ALT + F10 por navigi al la langetlisto. Poste moviĝu al la sekva langeto per la klavo TABA aŭ SAGO DEKSTREN. Moviĝu al la antaŭa langeto per la klavoj MAJUSKLIGA + TABA aŭ  SAGO MALDEKSTREN. Premu la SPACETklavon aŭ la ENENklavon por selekti la langetretpaĝon.'
        },
        {
          name: 'Kunteksta menuo de la redaktilo',
          legend:
            'Premu ${contextMenu} aŭ entajpu la KLAVKOMBINAĴON por malfermi la kuntekstan menuon. Poste moviĝu al la sekva opcio de la menuo per la klavoj TABA aŭ SAGO SUBEN. Moviĝu al la antaŭa opcio per la klavoj MAJUSKLGA + TABA aŭ SAGO SUPREN. Premu la SPACETklavon aŭ ENENklavon por selekti la menuopcion. Malfermu la submenuon de la kuranta opcio per la SPACETklavo aŭ la ENENklavo aŭ la SAGO DEKSTREN. Revenu al la elemento de la patra menuo per la klavoj ESKAPA aŭ SAGO MALDEKSTREN. Fermu la kuntekstan menuon per la ESKAPA klavo.'
        },
        {
          name: 'Fallisto de la redaktilo',
          legend:
            'En fallisto, moviĝu al la sekva listelemento per la klavoj TABA aŭ SAGO SUBEN. Moviĝu al la antaŭa listelemento per la klavoj MAJUSKLIGA + TABA aŭ SAGO SUPREN. Premu la SPACETklavon aŭ ENENklavon por selekti la opcion en la listo. Premu la ESKAPAN klavon por fermi la falmenuon.'
        },
        {
          name: 'Breto indikanta la vojon al la redaktilelementoj',
          legend:
            'Premu ${elementsPathFocus} por navigi al la breto indikanta la vojon al la redaktilelementoj. Moviĝu al la butono de la sekva elemento per la klavoj TABA aŭ SAGO DEKSTREN. Moviĝu al la butono de la antaŭa elemento per la klavoj MAJUSKLIGA + TABA aŭ SAGO MALDEKSTREN. Premu la SPACETklavon aŭ ENENklavon por selekti la elementon en la redaktilo.'
        }
      ]
    },
    {
      name: 'Komandoj',
      items: [
        { name: 'Komando malfari', legend: 'Premu ${undo}' },
        { name: 'Komando refari', legend: 'Premu ${redo}' },
        { name: 'Komando grasa', legend: 'Premu ${bold}' },
        { name: 'Komando kursiva', legend: 'Premu ${italic}' },
        { name: 'Komando substreki', legend: 'Premu ${underline}' },
        { name: 'Komando ligilo', legend: 'Premu ${link}' },
        { name: 'Komando faldi la ilbreton', legend: 'Premu ${toolbarCollapse}' },
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
        { name: 'Helpilo pri atingeblo', legend: 'Premu ${a11yHelp}' }
      ]
    }
  ]
});
