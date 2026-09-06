# Prompts pour agents de coding

À utiliser dans Cursor, Claude Code ou équivalent. Toujours commencer une session par le **prompt de contexte**, puis enchaîner avec le prompt de la tâche du jour. Les 4 documents `01` à `04` doivent être ouverts/attachés au contexte de l'agent.

## Prompt de contexte (à coller en premier, à chaque nouvelle session)

```
Tu m'aides à développer le prototype "Azo" (slogan : "Azo, trouvez qui sait faire, près de chez vous.").
Documents de référence à respecter strictement, dans cet ordre de priorité :
1. 01_Architecture_technique.md
2. 02_Modele_de_donnees.md
3. 03_Specification_UX_UI.md
4. 04_Standards_de_developpement.md

Règles non négociables :
- Prototype 100% frontend, aucun vrai backend, aucune clé secrète.
- L'authentification est simulée (mock Google), stockée dans lib/auth.ts, clé localStorage séparée des données métier.
- Aucun badge "vérifié" (téléphone, identité, CIP, qualification) nulle part dans le code ni l'UI.
- Le CIP est obligatoire pour un compte individuel, jamais affiché publiquement.
- Le bloc "Je ne trouve pas ce que je cherche" est visible en permanence sur l'écran Résultats, pas seulement si la liste est vide.
- L'onglet profil s'appelle "Mon espace", pas "Profil".
- Toute action Appeler/WhatsApp/Demander un service/Ajouter aux favoris passe par un composant ContactGate qui vérifie la session avant d'agir.
- Les compteurs du Tableau de bord Pro (stats.ts) sont des compteurs locaux à l'appareil, jamais présentés comme une vraie analytique : toujours accompagnés d'une mention "données de démonstration".
- Noms de fichiers/variables/types en anglais, textes visibles par l'utilisateur en français.
- TypeScript strict, pas de `any` sans justification.
- Chaque fonctionnalité doit avoir ses états chargement/erreur/vide et fonctionner sur mobile d'abord.

Avant de coder, confirme-moi en une phrase ce que tu vas faire et quels fichiers tu vas créer/modifier.
```

## Prompt — Backend (couche logique/données)

```
Tâche du jour : [coller la tâche depuis 06_Repartition_taches_equipe.md, colonne "Backend"].
Respecte l'interface décrite dans 01_Architecture_technique.md (repository.ts, auth.ts, availability.ts, search-parser.ts, validation.ts) et les types de 02_Modele_de_donnees.md.
Les composants d'interface ne doivent jamais lire localStorage ou calculer une règle métier directement : toute la logique passe par ces fichiers.
Écris aussi les tests unitaires essentiels décrits dans la section 8 de 04_Standards_de_developpement.md pour la fonction que tu ajoutes.
```

## Prompt — Frontend Web (écrans et composants)

```
Tâche du jour : [coller la tâche depuis 06_Repartition_taches_equipe.md, colonne "Frontend"].
Utilise uniquement les fonctions exposées par lib/repository.ts, lib/auth.ts et lib/availability.ts — n'implémente aucune logique métier dans le composant.
Respecte l'écran tel que décrit dans 03_Specification_UX_UI.md, y compris les libellés français exacts et les états de la section "États à concevoir".
Vérifie l'accessibilité (labels, focus visible, contraste, pas de couleur seule pour un statut) et le comportement mobile avant desktop.
```

## Prompt — Mobile (PWA + QA mobile)

```
Tâche du jour : [coller la tâche depuis 06_Repartition_taches_equipe.md, colonne "Mobile"].
Pour la partie PWA : configure public/manifest.json (nom, icônes, couleur de thème) et un service worker minimal qui met en cache les assets statiques, sans jamais bloquer une donnée dynamique.
Pour la QA : liste-moi, écran par écran, les problèmes de débordement horizontal, de taille de zone tactile (<44px), de police trop petite ou de contraste insuffisant, avec le fichier/composant concerné, sans corriger toi-même le style métier — signale-le au Frontend.
```

## Prompt — PO (contenu et checklist)

```
Tâche du jour : [coller la tâche depuis 06_Repartition_taches_equipe.md, colonne "PO"].
Génère/relis le contenu texte (fixtures, libellés) en respectant le modèle de 02_Modele_de_donnees.md et le ton honnête imposé (jamais "vérifié", toujours "déclaré" ou "fourni par le professionnel" pour les documents de formation).
Fournis les 6 fiches de professionnels demandées dans 05_Plan_de_prototype.md avec des données réalistes mais explicitement fictives.
```
