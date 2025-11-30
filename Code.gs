/**
 * @license MIT
 * Copyright (c) 2025 Fabrice Faucheux
 * @OnlyCurrentDoc
 * Ce script change la couleur des événements Google Agenda en fonction de
 * mots-clés dans leur titre, en parcourant les 30 prochains jours.
 */

/**
 * Configuration des mots-clés et des couleurs associées.
 * Pour trouver les noms des couleurs, référez-vous à l'énumération
 * GoogleAppsScript.Calendar.EventColor (ex: CalendarApp.EventColor.BLUE).
 */
const COULEURS_PAR_MOT_CLE = {
  'Réunion': CalendarApp.EventColor.BLUE,
  'Projet': CalendarApp.EventColor.GREEN,
  'Déjeuner': CalendarApp.EventColor.YELLOW,
  'Appel': CalendarApp.EventColor.ORANGE,
  'Deadline': CalendarApp.EventColor.RED,
  'Important': CalendarApp.EventColor.RED
  // Ajoutez d'autres paires mot-clé/couleur ici
};

/**
 * Calcule une date future en ajoutant un nombre de jours à aujourd'hui.
 * Gère correctement les passages de mois et d'années.
 * @param {number} [jours=30] - Le nombre de jours à ajouter.
 * @returns {Date} La date future.
 */
const calculerDateFuture = (jours = 30) => {
  const date = new Date();
  date.setDate(date.getDate() + jours);
  return date;
};

/**
 * Traite un événement individuel pour déterminer et appliquer la couleur appropriée.
 * @param {GoogleAppsScript.Calendar.CalendarEvent} evenement - L'événement à traiter.
 */
const traiterEvenement = (evenement) => {
  try {
    const titre = evenement.getTitle();
    const couleurOriginale = evenement.getColor();
    const titreMin = titre.toLowerCase();

    // Recherche du premier mot-clé correspondant
    const motCleTrouve = Object.keys(COULEURS_PAR_MOT_CLE).find(motCle =>
      titreMin.includes(motCle.toLowerCase())
    );

    const nouvelleCouleur = motCleTrouve ? COULEURS_PAR_MOT_CLE[motCleTrouve] : null;

    // Appliquer la couleur seulement si nécessaire (Optimisation API)
    if (nouvelleCouleur && nouvelleCouleur !== couleurOriginale) {
      evenement.setColor(nouvelleCouleur);
      Logger.log(`[SUCCÈS] Événement "${titre}" coloré en ${nouvelleCouleur} (Mot-clé: "${motCleTrouve}").`);
    }

  } catch (erreur) {
    console.error(`[ERREUR] Événement ID ${evenement.getId()} ("${evenement.getTitle()}"): ${erreur.message}`);
  }
};

/**
 * Fonction principale qui récupère les événements des 30 prochains jours
 * et lance le processus de coloration.
 */
function colorerEvenements() {
  try {
    const calendrier = CalendarApp.getDefaultCalendar();
    if (!calendrier) {
      throw new Error("Impossible d'accéder au calendrier par défaut.");
    }

    const maintenant = new Date();
    const dateFin = calculerDateFuture(30);

    Logger.log(`Démarrage : Recherche d'événements entre ${maintenant.toISOString()} et ${dateFin.toISOString()}...`);

    const evenements = calendrier.getEvents(maintenant, dateFin);

    if (evenements.length === 0) {
      Logger.log("Aucun événement trouvé dans la plage de dates spécifiée.");
      return;
    }

    Logger.log(`${evenements.length} événement(s) trouvé(s). Traitement en cours...`);

    // Itération sur les événements trouvés
    evenements.forEach(traiterEvenement);

    Logger.log('Terminé : Coloration des événements effectuée.');

  } catch (erreur) {
    console.error(`[ERREUR CRITIQUE] Fonction colorerEvenements: ${erreur.message}`);
    // Optionnel : Notification admin si nécessaire
  }
}
