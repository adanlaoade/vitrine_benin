# Azo — Vitrine Bénin

**Azo** (« travail » en fon) — *La compétence béninoise à portée de main.*

Prototype 100 % frontend pour mettre en relation clients et professionnels béninois. Aucun backend, aucune clé secrète : données en localStorage, authentification simulée.

## Stack

- React 19 + TypeScript strict
- Vite 8
- Tailwind CSS 4
- React Router
- Vitest

## Commandes

```bash
npm install
npm run dev      # serveur de développement
npm run build    # build de production
npm run lint     # ESLint
npm run test     # tests unitaires
npm run preview  # prévisualiser le build
```

## Structure

```text
src/
  app/              # routes et pages placeholder
  components/       # UI réutilisable et layout
  features/         # domaines fonctionnels (search, professionals…)
  data/fixtures/    # données fictives de démonstration
  lib/              # repository, auth, availability
  types/            # types métier partagés
public/
  manifest.json     # PWA
  sw.js               # service worker minimal
docs/               # spécifications produit et technique
```

## Déploiement

Compatible Vercel sans variable d'environnement obligatoire.

## Documentation

Voir le dossier `docs/` pour l'architecture, le modèle de données, la spec UX/UI et le plan de prototype sur 6 jours.
