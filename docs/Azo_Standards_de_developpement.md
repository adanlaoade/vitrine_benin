# Standards de développement — V1

## 1. Principes directeurs

Le code doit rester **simple, lisible, testable et remplaçable**. Chaque décision technique doit servir un parcours utilisateur identifié. Éviter le code « magique », les abstractions prématurées, les dépendances inutiles et les composants qui mélangent interface, métier et persistance.

Une fonctionnalité n'est terminée que lorsqu'elle possède son état nominal, ses états de chargement, d'erreur et de contenu vide, son comportement mobile et ses tests essentiels. Aucun écran ne doit dépendre d'une donnée réelle ou d'une clé secrète pour fonctionner en mode démonstration — **y compris l'authentification, qui reste simulée en V1.**

## 2. Organisation des fichiers

Organisation orientée par domaine fonctionnel. Un composant utilisé par une seule fonctionnalité reste dans cette fonctionnalité ; un composant partagé va dans `components/`.

```text
src/
  app/                         # routes, layouts, providers
  components/
    ui/                        # Button, Input, Dialog, Badge, Skeleton
    layout/                    # Header, BottomNav, PageContainer
  features/
    search/                    # SearchBar, IntentSummary, FilterBar, useVoiceSearch
    professionals/             # ProfessionalCard, ProfessionalProfile, availability
    onboarding/                # inscription individuel/entreprise
    requests/                  # demandes non couvertes
    workspace/                 # Mon espace : profil, portfolio, formations, disponibilité
    auth/                      # session simulée, ContactGate, modale de connexion
  data/fixtures/               # données fictives uniquement
  lib/                         # repository, auth, validation, formatters
  types/                       # types transversaux
  styles/                      # tokens et styles globaux
```

## 3. Nommage

Anglais pour fichiers, variables, fonctions, types, routes techniques ; français pour les textes visibles par l'utilisateur.

| Élément | Convention | Exemple |
|---|---|---|
| Composant | PascalCase | `ProfessionalCard.tsx` |
| Hook | `use` + PascalCase | `useVoiceSearch.ts` |
| Fonction | Verbe en camelCase | `calculateAvailability()` |
| Type | Nom métier en PascalCase | `SearchIntent` |
| Fixture | nom explicite | `professionals.fixture.ts` |
| Test | même nom + `.test` | `availability.test.ts` |
| Route | minuscules, segments courts | `/trouver`, `/mon-espace`, `/demandes` |
| Événement | verbe métier | `onRequestSubmitted`, `onAuthRequired` |

Éviter les noms vagues (`data`, `info`, `handleThing`, `utils2`, `Component`).

## 4. TypeScript et modèles métier

Mode strict obligatoire. `any` interdit sauf justification documentée et temporaire. Unions littérales plutôt que chaînes libres pour statuts et catégories. Les données externes ou issues de `localStorage` (y compris la session simulée) sont validées avant d'entrer dans le domaine métier.

```ts
export type AccountType = "individual" | "business";
export type ManualOverride = "on" | "off" | null;

export interface AuthSession {
  userId: string;
  displayName: string;
  email: string;
  isMock: true;
}
```

## 5. Composants et interface

Composants composables et contrôlables par leurs propriétés. Un composant ne connaît pas la route complète dans laquelle il est utilisé. Les composants d'interface génériques ne contiennent aucune logique métier d'Azo.

Toute action de contact (`Appeler`, `WhatsApp`, `Demander un service`) passe par un composant `ContactGate` unique qui vérifie la session avant de déclencher l'action ; il ne doit jamais y avoir de vérification de session dupliquée dans chaque écran.

Aucun composant n'affiche de libellé « vérifié » (téléphone, identité, qualification) : ces états n'existent plus dans le modèle de données. Les couleurs ne sont jamais l'unique moyen de communiquer un statut. Toute action destructive (supprimer une réalisation) demande une confirmation claire.

## 6. Gestion de l'état et persistance

Distinguer état d'interface, état de session et données métier. Ne pas introduire de bibliothèque globale d'état tant que des propriétés, hooks locaux ou contextes ciblés suffisent. Toutes les lectures/écritures `localStorage` passent par `repository.ts` (données métier) ou `auth.ts` (session) — jamais un accès direct à `localStorage` ailleurs. Les deux utilisent des clés distinctes.

Les opérations de repository retournent des résultats prévisibles et ne laissent pas remonter d'erreurs brutes à l'interface. Les fixtures ne sont jamais modifiées directement par un composant. Les mutations sont immuables.

## 7. Recherche et disponibilité

Le parsing de recherche est déterministe et testable, que la saisie vienne du texte ou de la voix. Il normalise les accents, identifie uniquement les termes connus et conserve la requête originale. Un critère incertain est présenté comme suggestion modifiable, jamais comme une vérité.

Le calcul de disponibilité est une fonction pure. Priorité : `manualOverride = off`, puis `on`, puis créneau courant, puis fermé. La valeur initiale de `manualOverride` est dérivée de `defaultPosture`, choisie à l'inscription. Fuseau par défaut : `Africa/Porto-Novo`. Les tests couvrent limites de créneau, jours désactivés, horaires multiples, quatre statuts publics, et l'initialisation depuis `defaultPosture`.

## 8. Tests et qualité

Chaque règle métier critique a des tests unitaires : parsing (texte + voix), disponibilité (y compris valeur par défaut), validation CIP (obligatoire), limites du portfolio, transitions de demande, `ContactGate` (session absente → modale ; session présente → action directe). Tests d'interaction pour les composants complexes : correction des critères, refus du microphone, soumission invalide, suppression d'une réalisation, connexion simulée puis reprise de l'action initiale.

Avant chaque livraison : formatage, lint, vérification TypeScript, tests, build de production. Les tests n'dépendent pas de l'heure réelle, de la géolocalisation réelle ou d'un service externe non contrôlé.

## 9. Git et revue de code

Branches courtes depuis `main`. Commit à intention unique, à l'impératif (`feat: ajouter le portail de contact`). Préfixes `feat`, `fix`, `refactor`, `test`, `docs`, `chore`.

Une pull request explique le besoin utilisateur, la solution, les états couverts, les tests exécutés, les limites connues. Petite, sans mélange refonte visuelle / changement métier sans raison, avec captures mobile si l'interface change.

## 10. Sécurité et confidentialité

Ne jamais committer de secret, numéro CIP réel, document réel, token, `.env` ou donnée personnelle réelle. Le CIP reste privé et obligatoire seulement pour l'usage interne de validation de formulaire. Les documents de formation sont publiés uniquement par choix explicite du professionnel. Entrées utilisateur échappées et validées avant affichage ou persistance.

La session simulée ne doit jamais laisser croire à une vraie identité vérifiée : toujours garder `isMock: true` visible dans le code et, idéalement, une mention discrète dans l'UI de démonstration (« session de démonstration »).

## 11. Performance et accessibilité

Portfolio limité à 6 images, compressées, chargement différé pour les contenus secondaires. Pas de carte interactive avant demande explicite. Éviter re-renders inutiles et dépendances lourdes.

Contraste, labels de formulaires, ordre de tabulation, focus visible, zones tactiles confortables, annonces accessibles pour les changements importants. Tester au clavier et en largeur mobile réelle avant chaque livraison.

## 12. Définition de fini

Une tâche est « finie » si le comportement répond au besoin, les données sont typées et validées, les états d'erreur et de vide existent, l'interface est responsive et accessible, les tests pertinents passent, le lint et le build passent, et la documentation de la fonctionnalité est à jour. Une fonctionnalité simulée (auth, vérification) est explicitement indiquée comme telle dans le code et, si besoin, dans l'interface.
