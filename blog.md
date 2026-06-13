# Guide de rédaction d'articles — ImpotsCouple

## Contexte du projet

**ImpotsCouple** est un simulateur gratuit d'impôts pour les couples français, disponible sur `impotscouple.fr`. L'outil permet de comparer trois situations fiscales en quelques secondes :

- **Scénario A** : chaque partenaire déclare ses revenus séparément (statut célibataire)
- **Scénario B/C** : les deux partenaires déclarent ensemble, via le PACS ou le mariage

Le simulateur intègre le barème progressif de l'impôt 2026, le quotient familial, les enfants (avec garde alternée et situation de handicap), les demi-parts supplémentaires (invalide, veuf de guerre, parent isolé) et la décote. Le résultat affiche l'économie annuelle réalisée en choisissant l'imposition commune.

**Insight clé du produit :** Le PACS et le mariage sont **100 % équivalents sur le plan fiscal** pour l'impôt sur le revenu. Les différences entre les deux statuts concernent uniquement la succession, les droits à pension de réversion et la protection patrimoniale.

**Public cible :** Couples français entre 25 et 50 ans, en concubinage ou en cours de formaliser leur union, qui veulent comprendre l'impact fiscal du PACS ou du mariage avant de se décider. Salariés, indépendants, fonctionnaires, professions libérales — toute situation de couple avec écart de revenus significatif est concernée.

**Ton éditorial :** Direct, factuel, sans langue de bois. Dédramatiser la fiscalité du couple. Pas de discours de notaire ni de comptable. L'utilisateur doit comprendre en 5 minutes ce que lui coûte (ou lui rapporte) le PACS ou le mariage sur sa feuille d'impôts.

---

## Stratégie SEO

### Positionnement éditorial

Le blog d'ImpotsCouple se positionne sur les **questions que se posent les couples français avant de se pacser ou de se marier**. L'angle éditorial est toujours fiscal, mais le contexte est humain : une décision de vie qui a des conséquences financières.

L'objectif SEO est de capter les recherches **informationnelles** (comprendre la fiscalité du couple) et **comparatives** (PACS vs mariage, imposition séparée vs commune). Chaque article doit naturellement inviter à simuler sa propre situation.

### Mots-clés principaux (head keywords)

- impôts mariage
- impôts PACS
- simulation impôts couple
- quotient familial 2026
- imposition commune couple

### Mots-clés secondaires et longue traîne

- calcul impôts PACS vs mariage
- différence fiscale PACS mariage
- économie d'impôts avec le mariage
- se pacser pour payer moins d'impôts
- se marier fiscalement avantages
- imposition séparée ou commune
- quotient familial enfants impôts
- demi-part fiscale 2026
- simulateur impôts couple gratuit
- barème impôt 2026
- décote impôts 2026
- PACS et déclaration fiscale commune
- mariage en cours d'année impôts
- PACS signé en [mois] déclaration
- impôts concubinage vs PACS
- enfants et quotient familial
- garde alternée impôts
- impôts couple avec enfants
- tranche marginale d'imposition couple
- foyer fiscal signification

### Sémantique à intégrer naturellement

> barème progressif, tranche marginale d'imposition (TMI), quotient familial, nombre de parts fiscales, revenu imposable, décote, abattement 10 %, foyer fiscal, déclaration commune, déclaration séparée, imposition au premier euro, PACS, mariage civil, concubinage, cohabitation légale, résidence fiscale, revenus d'activité, revenus du patrimoine, prélèvement à la source, acompte, trop-perçu, restitution d'impôt, DGFIP, formulaire 2042

---

## Sujets à couvrir (liste indicative, non exhaustive)

### Catégorie : PACS et mariage — les bases fiscales

- PACS ou mariage : quelle différence pour vos impôts en 2026 ?
- Comment fonctionne l'imposition commune en France ?
- Quotient familial : ce mécanisme qui peut diviser votre impôt par deux
- Déclaration commune vs séparée : quand chaque option est avantageuse
- Se marier en cours d'année : comment ça se passe pour la déclaration fiscale ?
- Signer un PACS en octobre : doit-on déjà déclarer ensemble cette année ?
- Ce que "foyer fiscal" signifie vraiment et pourquoi c'est important

### Catégorie : Cas pratiques et exemples chiffrés

- Couple avec écart de revenus : le PACS vous fait-il gagner ou perdre ?
- Exemple concret : 2 000 € et 4 000 € de salaire — combien économisez-vous ?
- Les 3 situations où l'imposition commune ne vous avantage pas
- Couple gagnant le même salaire : l'union fiscale est-elle toujours intéressante ?
- Indépendant et salarié en couple : comment la banque (et l'État) vous traitent différemment
- Combien économise-t-on en impôts en se mariant ? Exemples réels

### Catégorie : Enfants et famille

- Enfant et quotient familial : combien de parts supplémentaires et pour quel gain ?
- Garde alternée : comment se partagent les demi-parts fiscales entre parents séparés ?
- Enfant en situation de handicap : quelle demi-part supplémentaire ?
- Premier enfant, deuxième, troisième : l'impact marginal sur l'impôt
- Parent isolé : la majoration de part fiscale expliquée simplement

### Catégorie : Optimisation et stratégie

- Les 4 leviers légaux pour réduire l'impôt d'un couple en France
- Se pacser vs concubinage : le bilan financier complet (impôts + droits + protection)
- Quand vaut-il mieux rester célibataire fiscalement même en couple ?
- Changer de situation en cours d'année : prélèvement à la source et ajustement
- Mariage après 40 ans : enjeux fiscaux et patrimoniaux à connaître avant de signer

### Catégorie : Comprendre le barème et la décote

- Le barème progressif de l'impôt 2026 expliqué avec des exemples
- La décote : cette réduction d'impôt que peu de gens connaissent
- Tranche marginale à 30 % vs 41 % : comment éviter de basculer
- Comprendre son taux d'imposition réel (effectif) vs sa tranche marginale
- Ce que change le prélèvement à la source pour les couples

---

## Instructions de rédaction pour l'IA

### Format de chaque article

Chaque fichier doit être sauvegardé dans le dossier `drafts/` à la racine du projet, avec l'extension `.md`.

**Nom de fichier conseillé :** `NN-slug-de-l-article.md` (ex : `05-pacs-mariage-difference-impots.md`)

Le fichier doit obligatoirement commencer par un bloc frontmatter YAML entre deux lignes `---` :

```
---
slug: pacs-ou-mariage-difference-impots-2026     ← obligatoire · minuscules, chiffres, tirets uniquement
title: PACS ou mariage : quelle différence pour vos impôts en 2026 ?  ← obligatoire · 50-65 caractères
description: Sur le plan fiscal, PACS et mariage sont identiques…     ← obligatoire · 140-155 caractères
category: Fiscalité                              ← optionnel · défaut : Fiscalité
author: ImpotsCouple                             ← optionnel · défaut : ImpotsCouple
---

Contenu markdown ici (sans H1 — le titre est géré par le site)
```

> **Règles sur le slug :** uniquement des lettres minuscules sans accent, des chiffres et des tirets (`-`). Pas d'espaces, pas de majuscules, pas de caractères spéciaux. Le slug doit être unique sur le blog.

Le contenu doit être rédigé en Markdown standard.

### Contraintes de rédaction

- **Longueur :** 700 à 1 200 mots (lecture de 3 à 6 minutes)
- **Pas de sommaire** — le texte se lit d'une traite, comme un article de presse
- **Pas de liste à puces** sauf si vraiment nécessaire (maximum une liste par article)
- **Pas de tableau** dans le corps de l'article
- **Paragraphes courts** : 2 à 4 phrases par paragraphe, jamais plus
- **Titres de section** (H2 et H3) orientés question ou bénéfice, jamais génériques
- **Mot-clé principal** dans le titre, dans le premier paragraphe, et dans au moins un H2
- **Mots-clés secondaires** présents naturellement dans le corps
- **Chiffres 2026** : barème fiscal 2026, plafonds de décote à jour, nombre de parts exact
- **Accroche forte** en ouverture : chiffre inattendu, question que le lecteur se pose, situation concrète
- **Conclusion** : 2 à 3 phrases de synthèse + invitation naturelle à simuler sa propre situation

### Ton et style

- Tutoiement ou vouvoiement : **vouvoiement** (vous) — on ne se permet pas de tutoyer sur un sujet aussi personnel
- Style journalistique : direct, précis, sans fioriture
- Exemples chiffrés obligatoires — un article sans chiffre concret est un article inutile
- Expliquer les mécanismes fiscaux simplement, comme à quelqu'un d'intelligent qui n'est pas fiscaliste
- Pas d'emojis, pas d'exclamations en série
- Pas de formules génériques en ouverture ("Dans cet article", "Nous allons vous expliquer")
- Pas d'optimisme naïf — si une situation fiscale n'est pas avantageuse, le dire clairement

### Valeur ajoutée obligatoire

Chaque article doit apporter au moins **une information ou angle non-évident** :
- Un calcul réel, pas une formule abstraite
- Un cas particulier que l'on ne trouve pas dans les guides administratifs
- Une nuance que même les gens "bien informés" ignorent souvent
- Une comparaison chiffrée entre deux scénarios opposés
- Un retournement de situation (ex : "dans ce cas précis, le PACS vous coûte plus cher")

### Exemple de structure type

```md
---
slug: pacs-ou-mariage-difference-impots-2026
title: PACS ou mariage : quelle différence pour vos impôts en 2026 ?
description: Sur le plan fiscal, PACS et mariage sont identiques. Mais l'union change tout face au célibat. On vous explique pourquoi et combien vous y gagnez.
---

En France, le PACS et le mariage sont strictement équivalents pour l'impôt sur le revenu…

## Ce que change vraiment le statut marital

…

## Un exemple concret avec des chiffres

…
```

> Pas de H1 dans le contenu (le titre est affiché automatiquement par le site). Pas de sommaire.

## Ce qu'il ne faut PAS faire

- Ne pas confondre imposition fiscale et droits patrimoniaux (succession, pension de réversion) — ce sont deux sujets distincts
- Ne pas promettre une économie d'impôts à tout le monde — certains couples ne gagnent rien, voire perdent
- Ne pas écrire de façon générique sans exemple chiffré — un article sur les impôts sans chiffres n'aide personne
- Ne pas citer de sites tiers (impots.gouv.fr peut être cité une seule fois max pour légitimer une information)
- Ne pas écrire un article "définition de dictionnaire" — toujours partir d'une situation humaine concrète
- Ne pas utiliser le mot "article" dans l'article lui-même
- Ne pas commencer par "Dans cet article" ou "Nous allons voir"
- Ne pas rédiger un disclaimer juridique de 3 paragraphes — une phrase de prudence suffit si nécessaire

---

## Domaine et URL

- Domaine : `impotscouple.fr`
- URL des articles : `impotscouple.fr/blog/[slug]`
- Langue : français exclusivement
- Public : France métropolitaine (barème DGFIP, réglementation fiscale française uniquement)
