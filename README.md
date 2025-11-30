# Google Agenda - Coloration automatique des événements

![License MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Google%20Apps%20Script-green)
![Runtime](https://img.shields.io/badge/Google%20Apps%20Script-V8-green)
![Author](https://img.shields.io/badge/Auteur-Fabrice%20Faucheux-orange)

## Description
Ce projet Google Apps Script permet de changer automatiquement la couleur des événements de l'agenda principal de l'utilisateur en fonction de mots-clés présents dans le titre. Le script analyse les événements sur une fenêtre glissante de 30 jours pour assurer une mise à jour continue du planning.

## Fonctionnalités clés
- **Analyse sémantique** : Détection de mots-clés (insensible à la casse) dans les titres d'événements.
- **Palette personnalisable** : Association facile entre mots-clés et couleurs de l'API Calendar (Blue, Green, Red, etc.).
- **Optimisation des quotas** : La couleur n'est mise à jour que si elle diffère de la couleur actuelle, réduisant les appels d'écriture à l'API Google.
- **Robustesse** : Gestion des erreurs par événement (try...catch) pour éviter l'arrêt du script sur un événement corrompu.

## Installation manuelle

1. Ouvrez [Google Apps Script](https://script.google.com/).
2. Créez un nouveau projet nommé `Agenda - Coloration Auto`.
3. Copiez le contenu du fichier `Code.js` dans l'éditeur.
4. Modifiez l'objet `COULEURS_PAR_MOT_CLE` au début du script pour adapter vos propres règles de coloration.
5. Sauvegardez le projet (Ctrl + S).

## Configuration du déclencheur (Trigger)

Pour que le script s'exécute automatiquement :
1. Allez dans la section **Déclencheurs** (icône réveil) à gauche.
2. Cliquez sur **Ajouter un déclencheur**.
3. Configurez comme suit :
    - Fonction : `colorerEvenements`
    - Source de l'événement : `Déclencheur basé sur le temps`
    - Type de déclencheur : `Minuteur`
    - Fréquence : `Toutes les heures` (recommandé)
