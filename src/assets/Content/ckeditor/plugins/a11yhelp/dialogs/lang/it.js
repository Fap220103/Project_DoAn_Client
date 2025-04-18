﻿/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.plugins.setLang('a11yhelp', 'it', {
  title: 'Istruzioni di Accessibilità',
  contents: 'Contenuti di Aiuto. Per chiudere questa finestra premi ESC.',
  legend: [
    {
      name: 'Generale',
      items: [
        {
          name: 'Barra degli strumenti Editor',
          legend:
            'Premi ${toolbarFocus} per navigare fino alla barra degli strumenti. Muoviti tra i gruppi della barra degli strumenti con i tasti Tab e Maiusc-Tab. Spostati tra il successivo ed il precedente pulsante della barra degli strumenti usando le frecce direzionali Destra e Sinistra. Premi Spazio o Invio per attivare il pulsante della barra degli strumenti.'
        },
        {
          name: 'Finestra Editor',
          legend:
            "All'interno di una finestra di dialogo, premi Tab per navigare fino al campo successivo della finestra di dialogo, premi Maiusc-Tab per tornare al campo precedente, premi Invio per inviare la finestra di dialogo, premi Esc per uscire. Per le finestre che hanno schede multiple, premi Alt+F10 per navigare nella lista delle schede. Quindi spostati alla scheda successiva con il tasto Tab oppure con la Freccia Destra. Torna alla scheda precedente con Maiusc+Tab oppure con la Freccia Sinistra. Premi Spazio o Invio per scegliere la scheda."
        },
        {
          name: 'Menù contestuale Editor',
          legend:
            "Premi ${contextMenu} o TASTO APPLICAZIONE per aprire il menu contestuale. Dunque muoviti all'opzione successiva del menu con il tasto TAB o con la Freccia Sotto. Muoviti all'opzione precedente con  MAIUSC+TAB o con Freccia Sopra. Premi SPAZIO o INVIO per scegliere l'opzione di menu. Apri il sottomenu dell'opzione corrente con SPAZIO o INVIO oppure con la Freccia Destra. Torna indietro al menu superiore con ESC oppure Freccia Sinistra. Chiudi il menu contestuale con ESC."
        },
        {
          name: 'Box Lista Editor',
          legend:
            "Dentro un box-lista, muoviti al prossimo elemento della lista con TAB o con la Freccia direzionale giù. Spostati all'elemento precedente con MAIUSC+TAB oppure con Freccia direzionale sopra. Premi SPAZIO o INVIO per scegliere l'opzione della lista. Premi ESC per chiudere il box-lista."
        },
        {
          name: 'Barra percorso elementi editor',
          legend:
            "Premi ${elementsPathFocus} per navigare tra gli elementi della barra percorso. Muoviti al prossimo pulsante di elemento con TAB o la Freccia direzionale destra. Muoviti al pulsante precedente con MAIUSC+TAB o la Freccia Direzionale Sinistra. Premi SPAZIO o INVIO per scegliere l'elemento nell'editor."
        }
      ]
    },
    {
      name: 'Comandi',
      items: [
        { name: ' Annulla comando', legend: 'Premi ${undo}' },
        { name: ' Ripeti comando', legend: 'Premi ${redo}' },
        { name: ' Comando Grassetto', legend: 'Premi ${bold}' },
        { name: ' Comando Corsivo', legend: 'Premi ${italic}' },
        { name: ' Comando Sottolineato', legend: 'Premi ${underline}' },
        { name: ' Comando Link', legend: 'Premi ${link}' },
        { name: ' Comando riduci barra degli strumenti', legend: 'Premi ${toolbarCollapse}' },
        {
          name: 'Comando di accesso al precedente spazio di focus',
          legend:
            'Premi ${accessPreviousSpace} per accedere il più vicino spazio di focus non raggiungibile prima del simbolo caret, per esempio due elementi HR adiacenti. Ripeti la combinazione di tasti per raggiungere spazi di focus distanti.'
        },
        {
          name: 'Comando di accesso al prossimo spazio di focus',
          legend:
            'Premi ${accessNextSpace} per accedere il più vicino spazio di focus non raggiungibile dopo il simbolo caret, per esempio due elementi HR adiacenti. Ripeti la combinazione di tasti per raggiungere spazi di focus distanti.'
        },
        { name: ' Aiuto Accessibilità', legend: 'Premi ${a11yHelp}' }
      ]
    }
  ]
});
