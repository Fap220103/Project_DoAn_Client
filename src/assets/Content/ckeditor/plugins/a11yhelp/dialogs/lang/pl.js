﻿/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.plugins.setLang('a11yhelp', 'pl', {
  title: 'Instrukcje dotyczące dostępności',
  contents: 'Zawartość pomocy. Wciśnij ESC, aby zamknąć to okno.',
  legend: [
    {
      name: 'Informacje ogólne',
      items: [
        {
          name: 'Pasek narzędzi edytora',
          legend:
            'Wciśnij ${toolbarFocus} aby przejść do paska narzędzi. Przejdź do następnej i poprzedniej grupy narzędzi używając TAB oraz SHIFT-TAB. Przejdź do następnego i poprzedniego narzędzia używając STRZAŁKI W PRAWO lub STRZAŁKI W LEWO. Wciśnij SPACJĘ lub ENTER, aby aktywować zaznaczone narzędzie.'
        },
        {
          name: 'Okno dialogowe edytora',
          legend:
            'Będąc w oknie dialogowym wciśnij TAB aby przejść do następnego pola dialogowego, wciśnij SHIFT + TAB aby przejść do poprzedniego pola, wciśnij ENTER aby wysłać dialog, wciśnij ESC aby anulować dialog. Dla okien dialogowych z wieloma zakładkami, wciśnij ALT + F10 aby przejść do listy zakładek. Gdy to zrobisz przejdź do następnej zakładki wciskając TAB lub STRZAŁKĘ W PRAWO. Przejdź do poprzedniej zakładki wciskając SHIFT + TAB lub STRZAŁKĘ W LEWO. Wciśnij SPACJĘ lub ENTER aby wybrać zakładkę.'
        },
        {
          name: 'Menu kontekstowe edytora',
          legend:
            'Wciśnij ${contextMenu} lub PRZYCISK APLIKACJI aby otworzyć menu kontekstowe. Przejdź do następnej pozycji menu wciskając TAB lub STRZAŁKĘ W DÓŁ. Przejdź do poprzedniej pozycji menu wciskając SHIFT + TAB lub STRZAŁKĘ W GÓRĘ. Wciśnij SPACJĘ lub ENTER aby wygrać pozycję menu. Otwórz pod-menu obecnej pozycji wciskając SPACJĘ lub ENTER lub STRZAŁKĘ W PRAWO. Wróć do pozycji nadrzędnego menu wciskając ESC lub STRZAŁKĘ W LEWO. Zamknij menu wciskając ESC.'
        },
        {
          name: 'Lista w edytorze',
          legend:
            'W polu listy możesz przechodzić do następnego elementu za pomocą klawisza TAB lub STRZAŁKI W DÓŁ. Poprzedni element osiągniesz za pomocą SHIFT+TAB lub STRZAŁKI W GÓRĘ. Za pomocą SPACJI lub ENTERA wybierzesz daną opcję z listy, a za pomocą klawisza ESC opuścisz listę.'
        },
        {
          name: 'Pasek ścieżki elementów edytora',
          legend:
            'Naciśnij ${elementsPathFocus} w celu przejścia do paska ścieżki elementów edytora. W celu przejścia do kolejnego elementu naciśnij klawisz Tab lub Strzałki w prawo. W celu przejścia do poprzedniego elementu naciśnij klawisze Shift+Tab lub Strzałki w lewo. By wybrać element w edytorze, użyj klawisza Spacji lub Enter.'
        }
      ]
    },
    {
      name: 'Polecenia',
      items: [
        { name: 'Polecenie Cofnij', legend: 'Naciśnij ${undo}' },
        { name: 'Polecenie Ponów', legend: 'Naciśnij ${redo}' },
        { name: 'Polecenie Pogrubienie', legend: 'Naciśnij ${bold}' },
        { name: 'Polecenie Kursywa', legend: 'Naciśnij ${italic}' },
        { name: 'Polecenie Podkreślenie', legend: 'Naciśnij ${underline}' },
        { name: 'Polecenie Wstaw/ edytuj odnośnik', legend: 'Naciśnij ${link}' },
        { name: 'Polecenie schowaj pasek narzędzi', legend: 'Naciśnij ${toolbarCollapse}' },
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
        { name: 'Pomoc dotycząca dostępności', legend: 'Naciśnij ${a11yHelp}' }
      ]
    }
  ]
});
