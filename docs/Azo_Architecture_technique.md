# Architecture technique — V1

## Stack cible

Application web Next.js (ou React) en TypeScript et Tailwind CSS, déployable sur Vercel. Les composants sont conçus mobile d'abord, puis élargis en tablette/bureau. Une couche de données locale masque l'implémentation temporaire et permet de remplacer `localStorage` par une API sans réécrire les écrans. **Aucun vrai backend, aucune clé secrète en V1.**

## Organisation proposée

```text
src/
  app/                 # routes et layouts
  components/          # composants UI réutilisables
  features/
    search/            # saisie, voix, parsing, résultats, filtres
    professionals/     # cartes, profil, disponibilité
    onboarding/        # inscription individuel/entreprise
    requests/          # demandes non couvertes et historique
    workspace/         # Mon espace : profil, portfolio, formations, disponibilité
    auth/              # session simulée, modale de connexion
  data/                # fixtures de démonstration
  lib/
    availability.ts    # calcul déterministe du statut
    search-parser.ts   # parsing simple et modifiable
    repository.ts      # interface de persistance (données métier, favoris inclus)
    auth.ts            # session simulée (données de session, séparées du métier)
    validation.ts      # schémas de formulaire
    stats.ts           # compteurs de démonstration pour le tableau de bord pro (par appareil)
  types/               # types métier partagés
public/
  manifest.json        # PWA : nom, icônes, couleurs
```

## Principes de séparation

Les composants ne doivent pas calculer directement la disponibilité, ni lire `localStorage`, ni vérifier eux-mêmes la session. `availability.ts` reçoit un planning, une date/heure et un override manuel, puis retourne un statut et sa justification. `search-parser.ts` retourne une intention partielle et des suggestions ; il ne doit jamais présenter son extraction comme une compréhension certaine. `repository.ts` expose des opérations telles que `listProfessionals`, `saveServiceRequest`, `saveProfessionalProfile`, `updatePortfolio`. `auth.ts` expose `getSession()`, `mockSignInWithGoogle()`, `signOut()` et ne connaît rien du métier.

Les fixtures sont séparées des types et des composants. Les actions de téléphone et WhatsApp produisent des liens externes uniquement dans le prototype. `repository.ts` expose aussi `toggleFavorite`, `listFavorites`. `stats.ts` incrémente des compteurs locaux (vue de profil, clic téléphone/WhatsApp, favori ajouté) à chaque interaction sur cet appareil ; ce ne sont pas de vraies statistiques agrégées, l'interface doit le signaler. La future API pourra ajouter authentification réelle, modération, géocodage, stockage de fichiers et une vraie analytique derrière les mêmes interfaces.

## Authentification simulée (nouveau)

- La navigation, la recherche et la consultation de profils sont **accessibles sans connexion**.
- Un **portail de contact** (`ContactGate`) protège quatre actions liées à un compte : `Appeler`, `WhatsApp`, `Demander un service`, `Ajouter aux favoris`.
- Si `auth.getSession()` est vide, `ContactGate` ouvre une modale « Continuer avec Google » (bouton factice) qui crée une session locale minimale (nom, email, avatar de démonstration) et relance l'action initiale.
- La session est stockée sous une clé `localStorage` **distincte** des données métier, pour rester facile à retirer quand une vraie auth arrivera.
- Aucun OTP en V1 web ; réservé à une future application mobile native.

## Disponibilité — valeur par défaut (mis à jour)

À l'inscription, le professionnel choisit une posture de départ :

- « Je suis disponible maintenant » → `manualOverride` initial = `"on"`
- « Je suis mes horaires » → `manualOverride` initial = `null` (le statut suit le planning)

Ce choix devient la valeur par défaut de l'interrupteur ON/OFF dans Mon espace ; le professionnel peut ensuite la changer librement. La priorité de calcul reste : `manualOverride = off`, puis `on`, puis créneau courant, puis fermé.

## Recherche et classement

Le parsing initial peut normaliser les accents et rechercher des mots-clés de catégories, compétences, villes et expressions de disponibilité, y compris via saisie vocale (mêmes données en sortie que le texte). Le classement doit rester explicable : correspondance de service, proximité simulée, disponibilité demandée, puis note. Ne pas créer de score opaque ni de promesse de pertinence parfaite.

## Confiance et documents (mis à jour)

On ne simule aucune vérification (« vérifié » est interdit sans process réel). À la place, le profil expose un **accès direct** au document de formation/diplôme fourni par le professionnel (fichier ou fiche), avec le libellé « Document fourni par le professionnel » ou « Informations déclarées ». Le CIP reste privé et n'est jamais affiché, quel que soit le contexte.

## PWA (nouveau, tient lieu de « mobile » pour la V1)

`public/manifest.json` (nom, icônes, couleur de thème) + un service worker minimal (cache des assets statiques) suffisent à rendre le site installable sur téléphone (« Ajouter à l'écran d'accueil »). Aucun code natif séparé n'est prévu en V1.

## Robustesse

Prévoir une validation côté client et, plus tard, côté serveur. Ne pas stocker le CIP ou des documents sensibles en clair dans une application de production. Dans le prototype, utiliser des valeurs fictives et une indication de démonstration. Les images doivent être limitées en taille et type, avec aperçu et suppression avant enregistrement.

## Évolution vers la production

Remplacements attendus : repository local → API, fixtures → base de données, auth simulée → vraie auth (Google OAuth réel + éventuellement OTP mobile), images locales → stockage objet, parsing par règles → service de recherche contrôlé, liens directs → intégrations de contact suivies. Ces évolutions ne doivent pas modifier les contrats des composants de présentation.
