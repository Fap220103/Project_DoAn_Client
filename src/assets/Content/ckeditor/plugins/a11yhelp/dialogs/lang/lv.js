﻿/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.plugins.setLang('a11yhelp', 'lv', {
  title: 'Pieejamības instrukcija',
  contents: 'Palīdzības saturs. Lai aizvērtu ciet šo dialogu nospiediet ESC.',
  legend: [
    {
      name: 'Galvenais',
      items: [
        {
          name: 'Redaktora rīkjosla',
          legend:
            'Nospiediet ${toolbarFocus} lai pārvietotos uz rīkjoslu. Lai pārvietotos uz nākošo vai iepriekšējo rīkjoslas grupu izmantojiet pogu TAB un SHIFT+TAB.  Lai pārvietotos uz nākošo vai iepriekšējo rīkjoslas pogu izmantojiet Kreiso vai Labo bultiņu. Nospiediet Atstarpi vai ENTER lai aktivizētu rīkjosla pogu.'
        },
        {
          name: 'Redaktora dialoga  logs',
          legend:
            'Dialoga logā nospiediet pogu TAB lai pārvietotos uz nākošo dialoga loga lauku, nospiediet SHIFT+TAB lai atgrieztos iepriekšējā laukā, nospiediet ENTER lai apstiprinātu dialoga datus, nospiediet ESC lai aizvērtu šo dialogu. Dialogam kuram ir vairākas cilnes, nospiediet ALT+F10 lai pārvietotos uz nepieciešamo cilni.  Lai pārvietotos uz nākošo cilni izmantojiet pogu TAB vai Labo bultiņu. Lai pārvietotos uz iepriekšējo cilni nospiediet SHIFT+TAB vai kreiso bultiņu. Nospiediet SPACE vai ENTER lai izvēlētos lapas cilni.'
        },
        {
          name: 'Redaktora satura izvēle',
          legend:
            'Nospiediet ${contextMenu} vai APPLICATION KEY lai atvērtu satura izvēlni. Lai pārvietotos uz nākošo izvēlnes opciju izmantojiet pogu TAB vai pogu Bultiņu uz leju. Lai pārvietotos uz iepriekšējo opciju izmantojiet  SHIFT+TAB vai pogu Bultiņa uz augšu. Nospiediet SPACE vai ENTER lai izvelētos izvēlnes opciju. Atveriet tekošajā opcija apakšizvēlni ar SAPCE vai ENTER ka ari to var izdarīt ar Labo bultiņu. Lai atgrieztos atpakaļ uz sakuma izvēlni nospiediet ESC vai Kreiso bultiņu. Lai aizvērtu ciet izvēlnes saturu nospiediet ESC.'
        },
        {
          name: 'Redaktora saraksta lauks',
          legend:
            'Saraksta laukā, lai pārvietotos uz nākošo saraksta elementu nospiediet TAB vai pogu Bultiņa uz leju. Lai pārvietotos uz iepriekšējo saraksta elementu nospiediet SHIFT+TAB vai pogu Bultiņa uz augšu. Nospiediet SPACE vai ENTER lai izvēlētos saraksta opcijas. Nospiediet ESC lai aizvērtu saraksta lauku. '
        },
        {
          name: 'Redaktora elementa ceļa josla',
          legend:
            'Nospiediet ${elementsPathFocus} lai pārvietotos uz  elementa ceļa joslu. Lai pārvietotos uz nākošo elementa pogu izmantojiet TAB vai Labo bultiņu. Lai pārvietotos uz iepriekšējo elementa pogu  izmantojiet SHIFT + TAB vai Kreiso bultiņu. Nospiediet SPACE vai ENTER lai izvēlētos elementu redaktorā.'
        }
      ]
    },
    {
      name: 'Komandas',
      items: [
        { name: 'Komanda atcelt darbību', legend: 'Nospiediet ${undo}' },
        { name: 'Komanda atkārtot darbību', legend: 'Nospiediet ${redo}' },
        { name: 'Treknraksta komanda', legend: 'Nospiediet ${bold}' },
        { name: 'Kursīva komanda', legend: 'Nospiediet ${italic}' },
        { name: 'Apakšsvītras komanda ', legend: 'Nospiediet ${underline}' },
        { name: 'Hipersaites komanda', legend: 'Nospiediet ${link}' },
        { name: 'Rīkjoslas aizvēršanas komanda', legend: 'Nospiediet ${toolbarCollapse}' },
        {
          name: 'Piekļūt iepriekšējai fokusa vietas komandai',
          legend:
            'Nospiediet ${accessPreviousSpace} lai piekļūtu tuvākajai nepieejamajai fokusa vietai pirms kursora. Piemēram: diviem blakus esošiem līnijas HR elementiem. Atkārtojiet taustiņu kombināciju lai piekļūtu pie tālākām vietām.'
        },
        {
          name: 'Piekļūt nākošā fokusa apgabala komandai',
          legend:
            'Nospiediet ${accessNextSpace} lai piekļūtu tuvākajai nepieejamajai fokusa vietai pēc kursora. Piemēram: diviem blakus esošiem līnijas HR elementiem. Atkārtojiet taustiņu kombināciju lai piekļūtu pie tālākām vietām.'
        },
        { name: 'Pieejamības palīdzība', legend: 'Nospiediet ${a11yHelp}' }
      ]
    }
  ]
});
