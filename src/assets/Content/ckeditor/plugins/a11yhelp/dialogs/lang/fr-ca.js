﻿/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.plugins.setLang('a11yhelp', 'fr-ca', {
  title: "Instructions d'accessibilité",
  contents: "Contenu de l'aide.  Pour fermer cette fenêtre, appuyez sur ESC.",
  legend: [
    {
      name: 'Général',
      items: [
        {
          name: "Barre d'outil de l'éditeur",
          legend:
            "Appuyer sur ${toolbarFocus} pour accéder à la barre d'outils. Se déplacer vers les groupes suivant ou précédent de la barre d'outil avec les touches TAB et SHIFT-TAB. Se déplacer vers les boutons suivant ou précédent de la barre d'outils avec les touches FLECHE DROITE et FLECHE GAUCHE. Appuyer sur la barre d'espace ou la touche ENTRER pour activer le bouton de barre d'outils."
        },
        {
          name: "Dialogue de l'éditeur",
          legend:
            "A l'intérieur d'un dialogue, appuyer sur la touche TAB pour naviguer jusqu'au champ de dalogue suivant, appuyez sur les touches SHIFT + TAB pour revenir au champ précédent, appuyez sur la touche ENTRER pour soumettre le dialogue, appuyer sur la touche ESC pour annuler le dialogue. Pour les dialogues avec plusieurs pages d'onglets, appuyer sur ALT + F10 pour naviguer jusqu'à la liste des onglets. Puis se déplacer vers l'onglet suivant avec la touche TAB ou FLECHE DROITE. Se déplacer vers l'onglet précédent avec les touches SHIFT + TAB ou FLECHE GAUCHE. Appuyer sur la barre d'espace ou la touche ENTRER pour sélectionner la page de l'onglet."
        },
        {
          name: "Menu contextuel de l'éditeur",
          legend:
            "Appuyer sur ${contextMenu} ou entrer le RACCOURCI CLAVIER pour ouvrir le menu contextuel. Puis se déplacer vers l'option suivante du menu avec les touches TAB ou FLECHE BAS. Se déplacer vers l'option précédente avec les touches SHIFT+TAB ou FLECHE HAUT. appuyer sur la BARRE D'ESPACE ou la touche ENTREE pour sélectionner l'option du menu. Oovrir le sous-menu de l'option courante avec la BARRE D'ESPACE ou les touches ENTREE ou FLECHE DROITE. Revenir à l'élément de menu parent avec les touches ESC ou FLECHE GAUCHE. Fermer le menu contextuel avec ESC."
        },
        {
          name: "Menu déroulant de l'éditeur",
          legend:
            "A l'intérieur d'une liste en menu déroulant, se déplacer vers l'élément suivant de la liste avec les touches TAB ou FLECHE BAS. Se déplacer vers l'élément précédent de la liste avec les touches SHIFT + TAB ou FLECHE HAUT. Appuyer sur la BARRE D'ESPACE ou sur ENTREE pour sélectionner l'option dans la liste. Appuyer sur ESC pour fermer le menu déroulant."
        },
        {
          name: "Barre d'emplacement des éléments de l'éditeur",
          legend:
            "Appuyer sur ${elementsPathFocus} pour naviguer vers la barre d'emplacement des éléments de léditeur. Se déplacer vers le bouton d'élément suivant avec les touches TAB ou FLECHE DROITE. Se déplacer vers le bouton d'élément précédent avec les touches SHIFT+TAB ou FLECHE GAUCHE. Appuyer sur la BARRE D'ESPACE ou sur ENTREE pour sélectionner l'élément dans l'éditeur."
        }
      ]
    },
    {
      name: 'Commandes',
      items: [
        { name: 'Annuler', legend: 'Appuyer sur ${undo}' },
        { name: 'Refaire', legend: 'Appuyer sur ${redo}' },
        { name: 'Gras', legend: 'Appuyer sur ${bold}' },
        { name: 'Italique', legend: 'Appuyer sur ${italic}' },
        { name: 'Souligné', legend: 'Appuyer sur ${underline}' },
        { name: 'Lien', legend: 'Appuyer sur ${link}' },
        { name: "Enrouler la barre d'outils", legend: 'Appuyer sur ${toolbarCollapse}' },
        {
          name: "Accéder à l'objet de focus précédent",
          legend:
            "Appuyer ${accessPreviousSpace} pour accéder au prochain espace disponible avant le curseur, par exemple: deux éléments HR adjacents.  Répéter la combinaison pour joindre les éléments d'espaces distantes."
        },
        {
          name: 'Accéder au prochain objet de focus',
          legend:
            "Appuyer ${accessNextSpace} pour accéder au prochain espace disponible après le curseur, par exemple: deux éléments HR adjacents.  Répéter la combinaison pour joindre les éléments d'espaces distantes."
        },
        { name: "Aide d'accessibilité", legend: 'Appuyer sur ${a11yHelp}' }
      ]
    }
  ]
});
