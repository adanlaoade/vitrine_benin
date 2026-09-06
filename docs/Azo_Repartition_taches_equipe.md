# Répartition des tâches — équipe de 4

Rôles réinterprétés pour un prototype 100 % frontend (voir `00_README_Prototype.md` pour la justification). À ajuster si vous préférez une autre logique.

| Rôle historique | Rôle réel en V1 | Fichiers/dossiers sous responsabilité |
|---|---|---|
| Chef de projet / PO | Contenu, cohérence produit, QA fonctionnelle, pitch | `data/fixtures/`, `08_Suivi_progression.md`, checklist finale, script de démo |
| Développeur Backend | Couche logique/données | `lib/repository.ts`, `lib/auth.ts`, `lib/availability.ts`, `lib/search-parser.ts`, `lib/validation.ts`, `types/` |
| Développeur Frontend Web | Écrans et composants | `components/`, `features/*/components`, `app/` (routes), accessibilité |
| Développeur Mobile | PWA + QA mobile réelle | `public/manifest.json`, service worker minimal, tests sur téléphone, révision tactile de tous les écrans |

## Jour 1

- **PO** : rédige les 6 fiches de professionnels (texte, catégories, villes) et les critères de la checklist finale.
- **Backend** : squelette `repository.ts` (CRUD en mémoire/localStorage), `types/`, squelette `auth.ts` (session mock).
- **Frontend** : tokens Tailwind, `BottomNav`, `SearchBar`, `ProfessionalCard`, `AvailabilityBadge`, `FilterChip`, `EmptyState`, `PrimaryButton`.
- **Mobile** : `manifest.json`, icônes, test d'installation sur un téléphone réel, mise en place d'un environnement de test (device réel ou émulateur).

## Jour 2

- **PO** : relit l'écran Résultats avec les vraies fiches, vérifie que le bloc « Je ne trouve pas » est bien toujours visible.
- **Backend** : `search-parser.ts` (texte), branchement des fixtures à `listProfessionals`, tri distance/disponibilité/note.
- **Frontend** : écrans Accueil et Trouver/Résultats, filtres, lien vers la carte.
- **Mobile** : QA tactile de l'Accueil et de Trouver sur téléphone réel (débordement, zones tactiles).

## Jour 3

- **PO** : rédige les libellés honnêtes (« Document fourni par le professionnel », « Informations déclarées ») et vérifie qu'aucun mot « vérifié » ne subsiste où que ce soit.
- **Backend** : `auth.ts` complet (`getSession`, `mockSignInWithGoogle`, `signOut`), logique de `ContactGate`.
- **Frontend** : écran Profil sans badges, section Formation/Diplômes consultable, modale de connexion simulée, intégration du `ContactGate` sur les 3 actions de contact.
- **Mobile** : QA du profil et de la modale de connexion sur téléphone (tailles de police, boutons Appeler/WhatsApp).

## Jour 4

- **PO** : relit les deux parcours d'inscription (texte, ordre des champs), vérifie que le CIP est bien obligatoire côté formulaire.
- **Backend** : `validation.ts` (schéma individuel/entreprise, CIP obligatoire), sauvegarde du profil et de la posture de disponibilité par défaut.
- **Frontend** : écrans Inscription (individuel/entreprise) et Mon espace (édition profil, horaires, interrupteur ON/OFF, gestion réalisations et formations).
- **Mobile** : QA des formulaires longs sur petit écran (clavier, défilement, messages d'erreur visibles).

## Jour 5 — Favoris et Tableau de bord Pro

- **PO** : rédige les libellés « données de démonstration » et vérifie qu'aucun chiffre du tableau de bord n'est présenté comme une vraie statistique agrégée.
- **Backend** : `repository.ts` → `toggleFavorite`/`listFavorites` ; `stats.ts` (compteurs locaux : vue profil, clic téléphone/WhatsApp, favori, demande).
- **Frontend** : cœur favori sur les cartes et le profil (branché `ContactGate`), écran « Mes favoris », écran Tableau de bord dans Mon espace.
- **Mobile** : QA tactile du cœur favori (zone tactile suffisante) et du tableau de bord sur petit écran.

## Jour 6

- **PO** : fixtures finales (6+ profils), script de démo, passage complet de la checklist.
- **Backend** : `search-parser.ts` branché sur la voix, gestion des demandes non couvertes (`saveServiceRequest`, historique), gestion des erreurs de quota/parsing `localStorage`.
- **Frontend** : composant microphone (`idle/listening/transcribing/editable/error`), formulaire de demande non couverte, écran Demandes, finitions d'accessibilité.
- **Mobile** : QA finale complète sur téléphone réel, vérification de l'installation PWA, remontée des derniers bugs d'affichage.

## Points de synchronisation obligatoires

Fin de chaque jour, 10 minutes à 4 : chacun montre son écran/module, on met à jour `08_Suivi_progression.md` ensemble.
