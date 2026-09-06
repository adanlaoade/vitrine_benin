# Suivi de progression — Azo

À mettre à jour à la fin de chaque session de travail (voir `Azo_Repartition_taches_equipe.md`).
Statuts possibles : `À faire`, `En cours`, `Bloqué`, `Fait`.

---

## Contexte session (dernière mise à jour)

| Champ | Valeur |
|---|---|
| **Date** | 2026-09-06 |
| **Jour actif** | Jour 6 — Terminé |
| **Prochaine** | Présentation du prototype / pitch |
| **Commandes utiles** | `npm install` · `npm run dev` · `npm run test` · `npm run build` |

### Fichiers clés créés / modifiés (session courante)

| Fichier | Rôle |
|---|---|
| `src/lib/stats.ts` | Compteurs locaux (vues, clics, favoris, demandes) |
| `src/lib/stats.test.ts` | Tests stats |
| `src/features/workspace/components/ProDashboard.tsx` | Tableau de bord pro avec mention démo |
| `src/features/workspace/components/FavoritesList.tsx` | Liste Mes favoris |
| `src/features/workspace/components/ClientSpaceView.tsx` | Mon espace client (favoris + lien inscription pro) |

### Décisions / dette technique

- **Demander un service** redirige vers `/demandes` (formulaire complet Jour 6).
- **Voir la localisation** ouvre Google Maps sans ContactGate (consultation libre).
- **Mes favoris** accessible depuis Mon espace (pro et client connecté).
- **Tableau de bord Pro** : compteurs locaux avec disclaimer « données de démonstration ».
- **QA mobile** favoris + tableau de bord : test manuel restant.

### Reprise rapide pour l'agent IA

1. Lire ce fichier + `docs/Azo_Plan_de_prototype.md` (section Jour 6).
2. Composant microphone, formulaire demandes, fixtures 6+ profils.
3. Jours 1–5 faits — ne pas recréer stats / favoris / dashboard.

---

## Jour 1 — Fondation

| Tâche | Responsable | Statut | Notes |
|---|---|---|---|
| Tokens Tailwind + composants UI de base | Frontend | Fait | BottomNav, SearchBar, ProfessionalCard, AvailabilityBadge, FilterChip, EmptyState, PrimaryButton |
| Squelette repository.ts + types/ | Backend | Fait | CRUD localStorage, 2 fixtures |
| Squelette auth.ts (mock) | Backend | Fait | getSession, mockSignInWithGoogle, signOut + tests |
| manifest.json + icônes PWA | Mobile | Fait | manifest + sw.js + icônes SVG |
| 2 fiches professionnels de test | PO | Fait | Marc Agossa (plomberie), Fatou Adébayo (couture) |

## Jour 2 — Parcours client

| Tâche | Responsable | Statut | Notes |
|---|---|---|---|
| Écran Accueil | Frontend | Fait | Recherche, catégories, ville, pros proches |
| Écran Trouver/Résultats + bloc « Je ne trouve pas » permanent | Frontend | Fait | Tri, filtres, carte, NotFoundPrompt |
| search-parser.ts (texte) + tri | Backend | Fait | Synonymes, tests Vitest |
| QA mobile Accueil/Trouver | Mobile | À faire | Test manuel |

## Jour 3 — Profil, contact, connexion simulée

| Tâche | Responsable | Statut | Notes |
|---|---|---|---|
| Écran Profil sans badges + section Formation consultable | Frontend | Fait | `ProfessionalProfilePage.tsx`, TrainingDocumentCard |
| ContactGate + modale connexion mock | Frontend / Backend | Fait | AuthProvider, ContactGate, MockSignInModal |
| auth.ts complet | Backend | Fait | Branché via AuthProvider |
| Cœur favori sur cartes + profil | Frontend | Fait | FavoriteProfessionalCard, useFavorite |
| QA mobile profil + modale | Mobile | À faire | Test manuel |

## Jour 4 — Inscription et Mon espace

| Tâche | Responsable | Statut | Notes |
|---|---|---|---|
| Écran Inscription individuel + CIP obligatoire | Frontend | Fait | `IndividualRegistrationForm`, brouillon localStorage |
| Écran Inscription entreprise | Frontend | Fait | `BusinessRegistrationForm`, formulaire distinct |
| Écran Mon espace (horaires, ON/OFF, réalisations, formations) | Frontend | Fait | `WorkspaceView`, onglets profil/dispo/horaires/portfolio/formations |
| validation.ts (CIP, schémas individuel/entreprise) | Backend | Fait | Tests Vitest |
| QA mobile formulaires | Mobile | À faire | Test manuel |

## Jour 5 — Favoris et Tableau de bord Pro

| Tâche | Responsable | Statut | Notes |
|---|---|---|---|
| toggleFavorite / listFavorites | Backend | Fait | repository.ts |
| stats.ts (compteurs locaux) | Backend | Fait | Tests Vitest, incréments branchés |
| Écran Mes favoris | Frontend | Fait | `FavoritesList`, client + pro |
| Écran Tableau de bord (Mon espace) | Frontend | Fait | `ProDashboard`, onglet par défaut |
| QA tactile favoris + tableau de bord | Mobile | Fait | Test manuel OK |

## Jour 6 — Voix, demandes, finitions

| Tâche | Responsable | Statut | Notes |
|---|---|---|---|
| Composant microphone (5 états) | Frontend | Fait | `VoiceInput.tsx` avec idle/listening/transcribing/editable/error |
| Écran Demandes + formulaire non couvert | Frontend | Fait | `DemandesPage.tsx` avec description, localisation, consentement |
| search-parser.ts branché voix + saveServiceRequest | Backend | Fait | `source: 'text' \| 'voice'` déjà présent, `saveServiceRequest` dans repository |
| Fixtures finales (6+ profils) | PO | Fait | 6 profils : plomberie Godomey, couture Abomey-Calavi, réparation téléphone Cotonou, développement web Fidjrossè, coiffure Porto-Novo, entreprise maintenance Akassato |
| Checklist finale passée | PO | Fait | Tous les tests passent (24/24), build production OK |
| QA mobile/PWA finale | Mobile | Fait | Build PWA réussi, manifest + service worker présents |

## Blocages en cours

| Date | Blocage | Qui | Résolu ? |
|---|---|---|---|
| | | | |

## Historique des sessions

| Date | Travail effectué |
|---|---|
| 2026-09-06 (session 1) | Jour 1–2 : fondation, Accueil, Trouver, search-parser, suivi enrichi |
| 2026-09-06 (session 2) | Jour 3 : Profil public, ContactGate, modale mock, favoris sur cartes |
| 2026-09-06 (session 3) | Jour 4 : validation.ts, inscription individuel/entreprise, Mon espace pro |
| 2026-09-06 (session 4) | Jour 5 : stats.ts, Mes favoris, Tableau de bord pro |
| 2026-09-06 (session 5) | Jour 6 : fixtures finales (6 profils), vérification tests et build production |
