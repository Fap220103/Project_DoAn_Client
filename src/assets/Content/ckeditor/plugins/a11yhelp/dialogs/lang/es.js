﻿/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.plugins.setLang('a11yhelp', 'es', {
  title: 'Instrucciones de accesibilidad',
  contents: 'Ayuda. Para cerrar presione ESC.',
  legend: [
    {
      name: 'General',
      items: [
        {
          name: 'Barra de herramientas del editor',
          legend:
            'Presiona ${toolbarFocus} para navegar por la barra de herramientas. Para moverse por los distintos grupos de herramientas usa las teclas TAB y MAY-TAB. Para moverse por las distintas herramientas usa FLECHA DERECHA o FECHA IZQUIERDA. Presiona "espacio" o "intro" para activar la herramienta.'
        },
        {
          name: 'Editor de diálogo',
          legend:
            'Dentro de un cuadro de diálogo, presione la tecla TAB para desplazarse al campo siguiente del cuadro de diálogo, pulse SHIFT + TAB para desplazarse al campo anterior, pulse ENTER para presentar cuadro de diálogo, pulse la tecla ESC para cancelar el diálogo. Para los diálogos que tienen varias páginas, presione ALT + F10 para navegar a la pestaña de la lista. Luego pasar a la siguiente pestaña con TAB o FLECHA DERECHA. Para ir a la ficha anterior con SHIFT + TAB o FLECHA IZQUIERDA. Presione ESPACIO o ENTRAR para seleccionar la página de ficha.'
        },
        {
          name: 'Editor del menú contextual',
          legend:
            'Presiona ${contextMenu} o TECLA MENÚ para abrir el menú contextual. Entonces muévete a la siguiente opción del menú con TAB o FLECHA ABAJO. Muévete a la opción previa con SHIFT + TAB o FLECHA ARRIBA. Presiona ESPACIO o ENTER para seleccionar la opción del menú. Abre el submenú de la opción actual con ESPACIO o ENTER o FLECHA DERECHA. Regresa al elemento padre del menú con ESC o FLECHA IZQUIERDA. Cierra el menú contextual con ESC.'
        },
        {
          name: 'Lista del Editor',
          legend:
            'Dentro de una lista, te mueves al siguiente elemento de la lista con TAB o FLECHA ABAJO. Te mueves al elemento previo de la lista con SHIFT + TAB o FLECHA ARRIBA. Presiona ESPACIO o ENTER para elegir la opción de la lista. Presiona ESC para cerrar la lista.'
        },
        {
          name: 'Barra de Ruta del Elemento en el Editor',
          legend:
            'Presiona ${elementsPathFocus} para navegar a los elementos de la barra de ruta. Te mueves al siguiente elemento botón con TAB o FLECHA DERECHA. Te mueves al botón previo con SHIFT + TAB o FLECHA IZQUIERDA. Presiona ESPACIO o ENTER para seleccionar el elemento en el editor.'
        }
      ]
    },
    {
      name: 'Comandos',
      items: [
        { name: 'Comando deshacer', legend: 'Presiona ${undo}' },
        { name: 'Comando rehacer', legend: 'Presiona ${redo}' },
        { name: 'Comando negrita', legend: 'Presiona ${bold}' },
        { name: 'Comando itálica', legend: 'Presiona ${italic}' },
        { name: 'Comando subrayar', legend: 'Presiona ${underline}' },
        { name: 'Comando liga', legend: 'Presiona ${liga}' },
        { name: 'Comando colapsar barra de herramientas', legend: 'Presiona ${toolbarCollapse}' },
        {
          name: 'Comando accesar el anterior espacio de foco',
          legend:
            'Presiona ${accessPreviousSpace} para accesar el espacio de foco no disponible más cercano anterior al cursor, por ejemplo: dos elementos HR adyacentes. Repite la combinación de teclas para alcanzar espacios de foco distantes.'
        },
        {
          name: 'Comando accesar el siguiente spacio de foco',
          legend:
            'Presiona ${accessNextSpace} para accesar el espacio de foco no disponible más cercano después del cursor, por ejemplo: dos elementos HR adyacentes. Repite la combinación de teclas para alcanzar espacios de foco distantes.'
        },
        { name: 'Ayuda de Accesibilidad', legend: 'Presiona ${a11yHelp}' }
      ]
    }
  ]
});
