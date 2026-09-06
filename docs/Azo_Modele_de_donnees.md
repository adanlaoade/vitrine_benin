# Modèle de données — V1

## Entités principales

| Entité | Champs essentiels | Visibilité |
|---|---|---|
| `Professional` | id, accountType, displayName, photoUrl/logoUrl, category, skills, description, location, phone, whatsapp, rating, reviewCount, joinedAt, availability | Public, sauf données sensibles. |
| `BusinessDetails` | businessName, legalName, contactName, sector, legalIdentifiers | Public pour le nom/secteur ; identifiants légaux privés par défaut. |
| `Location` | city, commune, district, neighborhood, latitude?, longitude? | Ville/commune/quartier publics ; coordonnées exactes optionnelles et contrôlées. |
| `AvailabilitySchedule` | timezone, weeklySlots, manualOverride, defaultPosture, updatedAt | Statut et horaires publics ; historique interne non requis au prototype. |
| `WeeklySlot` | day, start, end, enabled | Public si le professionnel choisit de publier ses horaires. |
| `PortfolioItem` | id, imageUrl, title, description, sortOrder, createdAt | Public après publication. Maximum prototype : 6, modifiable/supprimable à tout moment. |
| `TrainingDocument` | id, title, institution?, year?, documentUrl?, description | Public uniquement après choix du professionnel ; libellé « déclaré/fourni », **jamais « vérifié »**. |
| `ServiceRequest` | id, requesterId?, description, location, status, createdAt | Privé au demandeur et à l'espace de gestion ; agrégats anonymisés possibles. |
| `SearchIntent` | rawQuery, service?, category?, location?, availability?, confidence?, editable, source | Session locale ; ne pas persister par défaut. `source: "text" \| "voice"`. |
| `AuthSession` (nouveau) | userId, displayName, email, avatarUrl, isMock | Session locale simulée, stockée séparément des données métier ; n'existe que côté client. |
| `FavoriteItem` (nouveau) | id, userId, professionalId, createdAt | Privé à l'utilisateur connecté (session simulée). |
| `ProDashboardStats` (nouveau) | professionalId, profileViews, phoneClicks, whatsappClicks, favoritesReceived, requestsReceived | **Compteurs de démonstration, par appareil**, incrémentés localement — pas une vraie analytique cross-utilisateurs. À afficher avec une mention explicite (« données de démonstration »). |

## Champs retirés (V1)

`phoneVerified`, `identityVerifiedCIP`, `qualificationVerified` sont **supprimés du modèle**. Ils ne doivent apparaître nulle part dans l'interface ni dans les fixtures. La confiance passe désormais uniquement par l'accès au document de formation (`TrainingDocument`) et par les avis.

## Type TypeScript indicatif

```ts
type AccountType = "individual" | "business";
type AvailabilityStatus =
  | "available_now"
  | "available_by_schedule"
  | "closed_by_schedule"
  | "unavailable";

type ManualOverride = "on" | "off" | null;
type DefaultPosture = "available_now" | "follow_schedule"; // choisi à l'inscription

interface AvailabilitySchedule {
  timezone: "Africa/Porto-Novo";
  weeklySlots: WeeklySlot[];
  manualOverride: ManualOverride; // initialisé selon defaultPosture
  defaultPosture: DefaultPosture;
}

interface WeeklySlot {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  start: string; // HH:mm
  end: string;   // HH:mm
  enabled: boolean;
}

interface AuthSession {
  userId: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
  isMock: true; // rappel explicite : aucune vraie identité en V1
}
```

## Règles de données

Le CIP est **obligatoire** pour `individual` (pas optionnel), validé sur présence et format au prototype, stocké dans un champ privé et exclu de toute réponse publique. Il ne faut jamais afficher le document CIP ni un badge « identité vérifiée ». Les documents de formation sont facultatifs à ajouter, mais dès qu'ils existent ils sont **consultables** sur le profil public, sans état « vérifié » sans preuve d'un workflow réel.

Les avis ne sont pas éditables par le professionnel dans le prototype. Les notes et distances des fixtures sont des données de démonstration. Une réalisation supprimée ne doit plus apparaître dans le profil public. Le portfolio doit pouvoir être **ajouté, modifié et supprimé** à tout moment depuis Mon espace. Les formulaires doivent préserver les brouillons localement en cas de retour arrière ou de connexion interrompue.

`AuthSession` ne doit jamais être mélangée aux données de `Professional` ou `ServiceRequest` dans le stockage local : clé `localStorage` dédiée (ex. `vnb.session`), pour rester isolable quand une vraie auth remplacera le mock.

## Statuts de demande

Une demande peut être `draft`, `submitted`, `viewed` ou `closed` dans le prototype, mais l'interface client n'a besoin d'exposer que `Envoyée` et `Clôturée`. La collecte de demandes non couvertes doit être exploitable sous forme agrégée sans exposer inutilement les coordonnées personnelles.
