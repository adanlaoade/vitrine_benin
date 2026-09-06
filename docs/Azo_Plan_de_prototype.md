# Plan de prototype — 6 jours

Chaque jour se termine par une démo interne de 10 minutes entre les 4 rôles pour recoller les écrans.

## Jour 1 — Fondation

Stack installée, tokens (couleur, typographie, espacements, rayons, états de boutons). Composants de base : `BottomNav` (Accueil / Trouver / Demandes / Mon espace), `SearchBar`, `ProfessionalCard`, `AvailabilityBadge`, `FilterChip`, `EmptyState`, `PrimaryButton`. Squelette de `repository.ts`, `auth.ts` (mock), `types/`. Fixtures : structure vide + 2 profils de test. `manifest.json` PWA posé. Tests des tailles mobiles avant desktop.

## Jour 2 — Parcours client

Accueil (recherche textuelle, catégories, professionnels proches, sélecteur de ville). Trouver / Résultats avec intention comprise éditable, tri distance/disponibilité/note, filtres catégorie/type, et **bloc « Je ne trouve pas ce que je cherche » visible en permanence** sous la liste dès cet écran. Lien vers la vue carte secondaire. Icône favori (cœur) sur les cartes, branchée sur `ContactGate`.

## Jour 3 — Profil, contact et connexion simulée

Profil complet individuel/entreprise, **sans aucun badge de vérification**. Section Formation/Diplômes consultable directement. `ContactGate` branché sur Appeler / WhatsApp / Demander un service, avec modale « Continuer avec Google » (mock) et reprise automatique de l'action après connexion simulée.

## Jour 4 — Inscription et Mon espace

Choix `Professionnel individuel` / `Entreprise ou personne morale`. CIP obligatoire (validation de présence/format, aucune mention « optionnel ») pour l'individuel, privé. Formulaire entreprise distinct. Dans Mon espace : édition de profil, horaires, interrupteur de disponibilité (valeur par défaut = posture choisie à l'inscription), gestion des réalisations (ajout/modification/suppression, mise à jour à tout moment), gestion des formations.

## Jour 5 — Favoris et Tableau de bord Pro

Écran « Mes favoris » (liste des professionnels enregistrés, accessible depuis Mon espace, protégé par la session simulée). Écran d'accueil de Mon espace pour un compte professionnel : Tableau de bord avec compteurs de démonstration (`stats.ts`) — vues du profil, clics téléphone/WhatsApp, demandes reçues, avis, favoris reçus — avec mention explicite « données de démonstration, sur cet appareil ».

## Jour 6 — Voix, demandes, fixtures finales, qualité, pitch

Microphone `idle/listening/transcribing/editable/error`, Web Speech si disponible + chemin texte identique. Formulaire de demande non couverte (description, localisation facultative, consentement minimal) + historique dans Demandes. Fixtures portées à au moins 6 profils (plomberie Godomey, couture Abomey-Calavi, réparation téléphone Cotonou, développement web Fidjrossè, coiffure Porto-Novo, entreprise de maintenance Akassato), horaires et statuts variés. QA mobile réelle (zones tactiles, pas de débordement horizontal, PWA installable). Checklist finale (ci-dessous), tests essentiels, build de production, préparation du pitch.

## Checklist de validation

| Vérification | Attendu |
|---|---|
| Recherche naturelle (texte + voix) | Les critères compris sont visibles et modifiables. |
| Aucun résultat | La demande non couverte est accessible et visible sur l'écran de résultats. |
| Résultats présents | Le bloc « Je ne trouve pas » reste visible malgré tout. |
| Disponibilité | Les 4 statuts sont distinguables et déterministes ; la valeur par défaut reprend la posture d'inscription. |
| Inscription | Le choix individuel/entreprise arrive avant les champs. |
| CIP | Obligatoire et privé pour l'individuel. |
| Profil | Aucun badge « vérifié » ; diplôme/formation consultable directement. |
| Contact | Appeler/WhatsApp/Demander un service/Ajouter aux favoris déclenchent la connexion simulée si absente. |
| Favoris | Cœur sur les cartes et le profil, liste consultable dans Mon espace. |
| Tableau de bord Pro | Compteurs affichés avec mention « données de démonstration ». |
| Portfolio | Ajout, modification, suppression et limite de 6, modifiable à tout moment. |
| Nav bar | Accueil / Trouver / Demandes / Mon espace, atteignables au pouce. |
| Mobile / PWA | Pas de débordement horizontal ; site installable sur téléphone. |
| Résilience | États chargement, erreur, vide et microphone indisponible présents. |

## Commandes attendues

README du projet avec scripts `dev`, `build`, `lint`, `test`. Déploiement Vercel sans variable d'environnement obligatoire — le prototype ne doit exiger aucune clé secrète.
