# Suivi de progression — Azo

À mettre à jour à la fin de chaque session de travail (voir `Azo_Repartition_taches_equipe.md`).
Statuts possibles : `À faire`, `En cours`, `Bloqué`, `Fait`.

---

## Contexte session (dernière mise à jour)

| Champ | Valeur |
|---|---|
| **Date** | 2026-09-06 |
| **Jour actif** | Jour 5 — Favoris et Tableau de bord Pro |
| **Prochaine étape** | Écran Mes favoris, `stats.ts`, Tableau de bord dans Mon espace |
| **Commandes utiles** | `npm install` · `npm run dev` · `npm run test` · `npm run build` |

### Fichiers clés créés / modifiés (session courante)

| Fichier | Rôle |
|---|---|
| `src/lib/validation.ts` | Schémas individuel/entreprise, validation CIP obligatoire |
| `src/lib/validation.test.ts` | Tests validation CIP et formulaires |
| `src/lib/schedule-defaults.ts` | Horaires par défaut, brouillons localStorage |
| `src/features/onboarding/` | Choix type compte, formulaires individuel/entreprise |
| `src/features/workspace/` | Mon espace pro : profil, dispo, horaires, portfolio, formations |
| `src/lib/repository.ts` | `getOwnedProfessional`, `hasProfessionalProfile` |

### Décisions / dette technique

- **Demander un service** redirige vers `/demandes` (formulaire complet Jour 6).
- **Voir la localisation** ouvre Google Maps sans ContactGate (consultation libre).
- **Mes favoris** (liste dans Mon espace) : Jour 5.
- **Tableau de bord Pro** (compteurs démo) : Jour 5.
- **QA mobile** formulaires + Mon espace : test manuel restant.

### Reprise rapide pour l'agent IA

1. Lire ce fichier + `docs/Azo_Plan_de_prototype.md` (section Jour 5).
2. Créer `stats.ts`, écran Mes favoris, Tableau de bord dans Mon espace.
3. Jours 1–4 faits — ne pas recréer onboarding / validation / workspace de base.

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
| stats.ts (compteurs locaux) | Backend | À faire | |
| Écran Mes favoris | Frontend | À faire | Liste dans Mon espace |
| Écran Tableau de bord (Mon espace) | Frontend | À faire | |
| QA tactile favoris + tableau de bord | Mobile | À faire | |

## Jour 6 — Voix, demandes, finitions

| Tâche | Responsable | Statut | Notes |
|---|---|---|---|
| Composant microphone (5 états) | Frontend | À faire | |
| Écran Demandes + formulaire non couvert | Frontend | À faire | CTA existe, formulaire à compléter |
| search-parser.ts branché voix + saveServiceRequest | Backend | À faire | saveServiceRequest déjà dans repository |
| Fixtures finales (6+ profils) | PO | À faire | |
| Checklist finale passée | PO | À faire | |
| QA mobile/PWA finale | Mobile | À faire | |

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
