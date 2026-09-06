# Spécification UX/UI — V1

## Architecture d'expérience

Le parcours client commence toujours par une intention simple : **Que cherchez-vous ?**, saisie au clavier ou à la voix. Les catégories servent de raccourcis. Après validation, l'écran de résultats (2ᵉ écran du parcours) affiche un résumé « J'ai compris » sous forme de critères modifiables. Cette étape évite qu'une interprétation silencieuse conduise à de mauvais résultats.

La liste est la vue par défaut. Chaque carte affiche le nom ou nom commercial, activité, lieu, distance, disponibilité, note, un cœur (favori) et deux actions maximum. La carte géographique s'ouvre depuis un bouton secondaire « Voir sur la carte ». Elle ne remplace pas la liste, notamment sur mobile.

L'Accueil peut afficher un sélecteur de ville (ex. « Cotonou ▾ ») : c'est la même mécanique que la localisation manuelle de l'état « Localisation inconnue ». Une cloche de notification peut être présente à titre de démonstration (ex. un message fixe « Un professionnel correspondant à votre demande vient de s'inscrire ») ; en V1, sans backend, elle ne déclenche aucune vraie notification push et doit rester clairement un élément de démonstration.

## Barre de navigation (revue)

4 éléments, atteignables au pouce, aucune icône de rôle secondaire :

| Icône/Libellé | Rôle |
|---|---|
| **Accueil** | Recherche rapide, catégories, professionnels proches |
| **Trouver** | Recherche avancée + résultats + filtres (écran principal du parcours client) |
| **Demandes** | Historique des « Je ne trouve pas ce que je cherche » envoyées |
| **Mon espace** | Pour un professionnel connecté : tableau de bord (stats de démonstration), édition de profil, horaires, disponibilité, portfolio, formations, et un accès « Mes favoris ». Remplace « Profil ». |

Pour un visiteur non professionnel/non inscrit, « Mon espace » ouvre l'écran d'inscription (individuel/entreprise) plutôt qu'un espace vide.

## « Je ne trouve pas ce que je cherche » (mis à jour)

Le bloc est affiché **en permanence sous la liste de résultats**, dès l'écran Résultats (2ᵉ écran), qu'il y ait 0, peu ou beaucoup de résultats — pas seulement en cas de liste vide. Le libellé s'adapte : incitation neutre si des résultats existent (« Vous ne trouvez toujours pas ? »), message explicite si la liste est vide.

## États à concevoir

| État | Réponse UX |
|---|---|
| Chargement | Cartes skeleton, puis conserver les critères de recherche. |
| Aucun résultat | Expliquer simplement l'absence de résultat ; le bloc « Je ne trouve pas » est déjà visible, on le met en avant. |
| Résultats insuffisants | Garder le bloc de demande sous la liste, avec reformulation du besoin et localisation. |
| Microphone refusé | Informer brièvement et focaliser le champ texte. |
| Localisation inconnue | Demander ville/commune/quartier manuellement ; ne pas bloquer la recherche. |
| Formulaire invalide | Signaler l'erreur au champ, conserver les valeurs saisies, expliquer le format attendu. |
| Hors connexion | Montrer les données déjà disponibles ou un message de reprise ; ne pas simuler une réussite réseau. |
| Demande envoyée | Récapitulatif, identifiant local, lien vers Demandes. |
| **Contact sans connexion (nouveau)** | Au clic sur Appeler / WhatsApp / Demander un service sans session, ouvrir la modale « Continuer avec Google » (mock) ; après connexion simulée, relancer l'action initiale automatiquement. |

## Disponibilité

Le système calcule d'abord un statut à partir du fuseau horaire du Bénin et du planning hebdomadaire. Le professionnel peut forcer l'état avec un interrupteur manuel dans Mon espace : `ON` = disponible maintenant ; `OFF` = indisponible même si les horaires indiquent une ouverture. **La valeur initiale de cet interrupteur reprend la posture choisie à l'inscription** (« disponible maintenant » ou « je suis mes horaires »).

Côté client : `Disponible maintenant` (forçage ON), `Disponible selon les horaires` (créneau ouvert sans forçage), `Fermé selon les horaires` (hors créneau), `Indisponible` (forçage OFF). Le professionnel voit toujours la raison du statut.

## Inscription

Écran initial : `Je m'inscris comme` avec deux cartes accessibles : `Professionnel individuel` et `Entreprise / personne morale`. Un indicateur d'étapes reste visible.

Individuel : identité, téléphone, **CIP obligatoire**, catégorie, compétence, description, localisation, horaires + **posture de disponibilité par défaut**, WhatsApp, photo, formations facultatives, réalisations. Entreprise : nom commercial, raison sociale si pertinente, responsable/contact, secteur, services, téléphone, WhatsApp, localisation, horaires + posture par défaut, logo, informations légales facultatives, réalisations. Champs communs réutilisés par composant, champs spécifiques distincts.

## Profil public (mis à jour — sans badges de vérification)

Haut du profil : nom, image, activité, lieu, distance, note, statut de disponibilité. Boutons `Appeler` et `WhatsApp` prioritaires (protégés par la connexion simulée si nécessaire). `Voir la localisation` et `Demander un service` secondaires mais toujours visibles.

Sections : `À propos`, `Services`, `Réalisations`, `Formation / Diplômes`, `Horaires`. **Aucun badge « Téléphone vérifié », « Identité vérifiée » ou « Qualification vérifiée » n'apparaît.** La section Formation n'apparaît que si des éléments existent ; chaque élément est **consultable directement** (fichier ou fiche) avec la mention `Document fourni par le professionnel` ou `Informations déclarées`, jamais `Validé`.

## Mon espace (renommage + ajout)

Onglet unique pour le professionnel connecté. Écran d'accueil de cet onglet : **Tableau de bord** — vues du profil, clics téléphone/WhatsApp, demandes reçues, avis, favoris reçus, avec la mention « Données de démonstration, sur cet appareil » pour rester honnête. En dessous : édition de profil, horaires hebdomadaires, interrupteur de disponibilité (valeur par défaut = posture d'inscription), **gestion des réalisations avec mise à jour possible à tout moment** (ajout/modification/suppression, limite 6), gestion des formations/diplômes, et un accès **Mes favoris** (liste des professionnels ajoutés en favori). L'interface explique toujours le statut de disponibilité et sa source (override manuel ou planning).

Pour un visiteur non professionnel connecté (compte particulier via la connexion simulée), Mon espace affiche uniquement **Mes favoris** et l'historique de ses demandes.

## Favoris (nouveau)

Une icône cœur apparaît sur chaque carte professionnel (Accueil, Résultats, popup Carte) et en haut du profil public. Au clic, `ContactGate` vérifie la session comme pour Appeler/WhatsApp : sans session, la modale de connexion simulée s'ouvre puis l'ajout se fait automatiquement après connexion. Le cœur est plein si déjà en favori, vide sinon ; aucune confirmation n'est requise pour ajouter, une confirmation légère (toast) suffit pour retirer.

## Accessibilité et performance

Labels explicites, navigation clavier, focus visible, taille de cible confortable, messages non dépendants de la couleur, texte alternatif pour chaque image. Compresser les images de portfolio, charger les éléments secondaires à la demande, éviter une carte lourde au premier rendu. Actions WhatsApp et téléphone toujours de vrais liens adaptés au mobile.
