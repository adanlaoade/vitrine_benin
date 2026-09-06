# README — Prototype « Azo »

**Azo** (« travail » en fon) — *Azo, trouvez qui sait faire, près de chez vous.*

Ce document est l'index de travail. Il fige les décisions issues des derniers échanges pour que les 4 documents techniques ne se contredisent plus entre eux, et sert de point d'entrée pour l'équipe et pour les agents de coding.

**Échéance : moins d'une semaine.** Le plan (`05_Plan_de_prototype.md`) est calé sur 5 jours.

## Décisions figées pour la V1

| Sujet | Décision |
|---|---|
| Authentification | **Simulée côté client**, aucun vrai backend. Un bouton « Continuer avec Google » ouvre une modale factice, crée une session locale (nom, email, avatar fictifs) stockée séparément des données métier. Aucune clé, aucun vrai OTP en V1. |
| Déclenchement de l'auth | La navigation, la recherche et la consultation des profils restent **libres, sans connexion**. La connexion (simulée) n'est demandée qu'au moment de **Appeler**, **WhatsApp** ou **Demander un service**. |
| OTP | Hors périmètre V1 web. Réservé à une future application mobile native (V2+). |
| CIP | Obligatoire (pas optionnel) pour tout compte `individual`. Jamais affiché publiquement. |
| Badges de confiance | On **retire** « Téléphone vérifié », « Identité CIP vérifiée » et « Qualification vérifiée ». On les remplace par un **accès direct au diplôme / document de formation** déposé par le professionnel, avec la mention honnête « Document fourni par le professionnel » — jamais « Validé ». |
| Disponibilité ON/OFF | Le professionnel choisit à l'inscription une posture par défaut (« Je suis disponible maintenant » ou « Je suis les horaires »). Cette posture devient la valeur initiale de l'interrupteur, qu'il peut ensuite changer à tout moment. |
| « Je ne trouve pas ce que je cherche » | Visible en permanence dès l'écran **Résultats** (2ᵉ écran du parcours), pas seulement quand la liste est vide. |
| Nom de l'onglet profil | « Mon espace » partout (pas « Profil »). |
| Inscription entreprise | Confirmée : formulaire distinct pour « Entreprise / personne morale », sans dupliquer le formulaire individuel. |
| Recherche vocale | Confirmée, cf. micro `idle/listening/transcribing/editable/error` déjà spécifié. |
| Application mobile | Pas de code natif séparé en V1 : le web devient une **PWA installable** (manifest + icônes + shell hors-ligne minimal). |
| Nav bar (confirmée) | **Accueil / Trouver / Demandes / Mon espace**, 4 éléments. |
| Favoris (nouveau, confirmé dans le périmètre V1) | Icône cœur sur chaque carte professionnel (Accueil, Résultats, Carte). Action protégée par la connexion simulée, comme Appeler/WhatsApp. Liste consultable dans « Mon espace ». |
| Tableau de bord Pro (nouveau, confirmé dans le périmètre V1) | Écran d'accueil de « Mon espace » pour un compte professionnel connecté : vues du profil, clics téléphone/WhatsApp, demandes reçues, avis, favoris reçus. **Compteurs simulés côté appareil** (pas de vraie analytique cross-device) — à afficher avec une mention de démonstration. |

## Corrections à reporter sur la maquette (Figma ou équivalent)

La maquette visuelle déjà produite précède ce dernier round de décisions. Avant le développement, il faut corriger le fichier de design :
- Retirer les 3 badges « Téléphone vérifié / Identité (CIP) vérifiée / Qualification vérifiée » de l'écran Profil professionnel.
- Retirer la mention « (optionnel) » sur le champ Numéro CIP de l'inscription ; l'indiquer comme obligatoire.
- Mettre à jour la nav bar : Accueil / Trouver / Demandes / Mon espace (au lieu de Accueil / Explorer / + / Favoris / Profil). Les Favoris restent une fonctionnalité, mais intégrée dans Mon espace plutôt qu'en onglet séparé, et le bouton « + » central est retiré.
- Ajouter à l'écran Profil un accès direct au diplôme/document de formation, à la place des badges retirés.

## Où trouver quoi

- `01_Architecture_technique.md` — stack, arborescence, auth simulée, disponibilité par défaut
- `02_Modele_de_donnees.md` — entités, CIP obligatoire, suppression des champs « vérifié », session utilisateur
- `03_Specification_UX_UI.md` — écrans, nav bar revue, emplacement du bloc « Je ne trouve pas », profil sans badges
- `04_Standards_de_developpement.md` — règles de code (inchangées sur le fond, ajout de la couche auth)
- `05_Plan_de_prototype.md` — plan jour par jour sur 5 jours
- `06_Repartition_taches_equipe.md` — qui fait quoi parmi les 4 rôles
- `07_Prompts_agents_IA.md` — prompts prêts à coller dans Cursor / Claude Code, par rôle et par jour
- `08_Suivi_progression.md` — tableau de suivi à tenir à jour chaque jour

## Point à trancher avec toi

Ton équipe garde les 4 rôles historiques (PO, Backend, Frontend web, Mobile), mais l'architecture technique actuelle est un **prototype 100 % frontend** (pas de vraie API, pas de vrai serveur). J'ai donc redéfini les rôles ainsi pour que personne ne soit sans tâche :

- **« Backend »** → responsable de la **couche logique/données** qui vit quand même côté client : `repository.ts`, `availability.ts`, `search-parser.ts`, `validation.ts`, `auth.ts` (mock), fixtures, types. C'est le rôle qui garantit que remplacer `localStorage` par une vraie API plus tard ne cassera rien.
- **« Mobile »** → responsable de la **PWA** (installabilité, icônes, manifest, shell hors-ligne) et de la **QA mobile réelle** (test sur téléphone, zones tactiles, pas de débordement horizontal) — plutôt qu'un code natif séparé, injouable en 5 jours.

Si tu préfères une autre répartition (ex. le Mobile monte un simple wrapper WebView Flutter/React Native autour du site déployé, juste pour avoir une « appli » à montrer au jury), dis-le-moi et j'ajuste `06_Repartition_taches_equipe.md` et `07_Prompts_agents_IA.md` en conséquence.
