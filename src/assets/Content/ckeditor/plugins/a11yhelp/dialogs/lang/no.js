﻿/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.plugins.setLang('a11yhelp', 'no', {
  title: 'Instruksjoner for tilgjengelighet',
  contents: 'Innhold for hjelp. Trykk ESC for å lukke denne dialogen.',
  legend: [
    {
      name: 'Generelt',
      items: [
        {
          name: 'Verktøylinje for editor',
          legend:
            'Trykk ${toolbarFocus} for å navigere til verktøylinjen. Flytt til neste og forrige verktøylinjegruppe med TAB og SHIFT-TAB. Flytt til neste og forrige verktøylinjeknapp med HØYRE PILTAST og VENSTRE PILTAST. Trykk MELLOMROM eller ENTER for å aktivere verktøylinjeknappen.'
        },
        {
          name: 'Dialog for editor',
          legend:
            'Mens du er i en dialog, trykk TAB for å navigere til neste dialogfelt, press SHIFT + TAB for å flytte til forrige felt, trykk ENTER for å akseptere dialogen, trykk ESC for å avbryte dialogen. For dialoger med flere faner, trykk ALT + F10 for å navigere til listen over faner. Gå til neste fane med TAB eller HØYRE PILTAST. Gå til forrige fane med SHIFT + TAB eller VENSTRE PILTAST. Trykk MELLOMROM eller ENTER for å velge fanen.'
        },
        {
          name: 'Kontekstmeny for editor',
          legend:
            'Trykk ${contextMenu} eller MENYKNAPP for å åpne kontekstmeny. Gå til neste alternativ i menyen med TAB eller PILTAST NED. Gå til forrige alternativ med SHIFT+TAB eller PILTAST OPP. Trykk MELLOMROM eller ENTER for å velge menyalternativet. Åpne undermenyen på valgt alternativ med MELLOMROM eller ENTER eller HØYRE PILTAST. Gå tilbake til overordnet menyelement med ESC eller VENSTRE PILTAST. Lukk kontekstmenyen med ESC.'
        },
        {
          name: 'Listeboks for editor',
          legend:
            'I en listeboks, gå til neste alternativ i listen med TAB eller PILTAST NED. Gå til forrige alternativ i listen med SHIFT + TAB eller PILTAST OPP. Trykk MELLOMROM eller ENTER for å velge alternativet i listen. Trykk ESC for å lukke listeboksen.'
        },
        {
          name: 'Verktøylinje for elementsti',
          legend:
            'Trykk ${elementsPathFocus} for å navigere til verktøylinjen som viser elementsti. Gå til neste elementknapp med TAB eller HØYRE PILTAST. Gå til forrige elementknapp med SHIFT+TAB eller VENSTRE PILTAST. Trykk MELLOMROM eller ENTER for å velge elementet i editoren.'
        }
      ]
    },
    {
      name: 'Kommandoer',
      items: [
        { name: 'Angre', legend: 'Trykk ${undo}' },
        { name: 'Gjør om', legend: 'Trykk ${redo}' },
        { name: 'Fet tekst', legend: 'Trykk ${bold}' },
        { name: 'Kursiv tekst', legend: 'Trykk ${italic}' },
        { name: 'Understreking', legend: 'Trykk ${underline}' },
        { name: 'Link', legend: 'Trykk ${link}' },
        { name: 'Skjul verktøylinje', legend: 'Trykk ${toolbarCollapse}' },
        {
          name: 'Gå til forrige fokusområde',
          legend:
            'Trykk ${accessPreviousSpace} for å komme til nærmeste fokusområde før skrivemarkøren som ikke kan nås på vanlig måte, for eksempel to tilstøtende HR-elementer. Gjenta tastekombinasjonen for å komme til fokusområder lenger unna i dokumentet.'
        },
        {
          name: 'Gå til neste fokusområde',
          legend:
            'Trykk ${accessNextSpace} for å komme til nærmeste fokusområde etter skrivemarkøren som ikke kan nås på vanlig måte, for eksempel to tilstøtende HR-elementer. Gjenta tastekombinasjonen for å komme til fokusområder lenger unna i dokumentet.'
        },
        { name: 'Hjelp for tilgjengelighet', legend: 'Trykk ${a11yHelp}' }
      ]
    }
  ]
});
