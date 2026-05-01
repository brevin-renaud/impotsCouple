# FISCAL COUPLE OPTIMIZER - Documentation Projet

## 📋 Vue d'Ensemble

**Nom du projet** : Fiscal Couple Optimizer  
**Objectif** : Moteur de simulation fiscale comparant les impacts fiscaux du Célibat, PACS et Mariage en France  
**Public cible** : Couples français cherchant à optimiser leur situation fiscale

---

## 🎯 Fonctionnalités Principales

### 1. Simulateur Fiscal Interactif

- Collecte des revenus nets imposables (N-1)
- Situations spéciales (invalidité, ancien combattant, parent isolé, etc.)
- Nombre d'enfants à charge (garde alternée, invalidité par enfant)
- Calcul des parts fiscales automatique

### 2. Comparateur 3 Scénarios

- **Scénario A** : Célibat (imposition séparée)
- **Scénario B** : PACS (imposition commune)
- **Scénario C** : Mariage (imposition commune)
- Calcul du delta financier entre chaque scénario
- Recommandation optimale avec export PDF des résultats

### 3. Système de Partage (Stateless)

- Données encodées directement dans l'URL via paramètre `?s=`
- URL partageable : `/resultats?s={code_compressé}`
- Pas de compte utilisateur requis
- Aucune donnée stockée côté serveur pour les simulations
- URL valide indéfiniment (pas d'expiration)
- Encodage : sérialisation Base36 + compression LZ-String

### 4. Blog SEO-Optimisé

- Articles gérés via interface admin (`/admin/articles`)
- Rendu Markdown avec `marked`
- Guides fiscaux (quotient familial, tranches IR, etc.)
- Injection Schema.org (FAQ, Article, FinancialService)

---

## 🛠️ Stack Technique

### Core

- **Framework** : Next.js 16.x (App Router)
- **Language** : TypeScript 5.0+
- **Styling** : Tailwind CSS 4.x
- **React** : 19.x

### Backend

- **Database** : Supabase (PostgreSQL) — utilisée pour feedback, articles blog, user actions (PAS pour les simulations)
- **ORM** : Prisma 5.x
- **Hosting** : Vercel (Serverless + Edge Functions)

### Libs Additionnelles

- **Validation** : Zod 4.x
- **Forms** : React Hook Form 7.x
- **Markdown** : marked 17.x (rendu des articles de blog)
- **Compression URL** : lz-string 1.5.x (encodage des simulations dans l'URL)
- **PDF** : jspdf 4.x (export des résultats)
- **Analytics** : @vercel/analytics + @vercel/speed-insights

---

## 📁 Architecture du Projet

```text
impotscouple/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Landing page
│   │   ├── globals.css
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── simulateur/                 # Formulaire multi-steps
│   │   ├── resultats/
│   │   │   ├── page.tsx                # Page résultats (stateless, lit ?s=)
│   │   │   ├── [uuid]/                 # ⚠️ LEGACY — retourne 404
│   │   │   │   └── partage/            # ⚠️ LEGACY — retourne 404
│   │   │   └── partage/
│   │   ├── blog/
│   │   │   └── [slug]/
│   │   ├── mariage/                    # Page SEO mariage
│   │   ├── pacs/                       # Page SEO PACS
│   │   ├── quotient-familial/          # Page SEO quotient familial
│   │   ├── faq/
│   │   ├── a-propos/
│   │   ├── confidentialite/
│   │   ├── mentions-legales/
│   │   ├── admin/                      # Interface d'administration
│   │   │   ├── articles/
│   │   │   │   ├── [id]/
│   │   │   │   └── nouveau/
│   │   │   ├── avis/
│   │   │   └── stats/
│   │   └── api/
│   │       ├── simulate/route.ts       # POST calcul fiscal (server-side)
│   │       ├── share/[uuid]/route.ts   # ⚠️ LEGACY — répond 410 Gone
│   │       ├── feedback/               # Collecte des avis utilisateurs
│   │       ├── track-action/           # Tracking des actions anonymes
│   │       ├── user-actions/
│   │       ├── publish-scheduled/
│   │       ├── cleanup/route.ts        # Cron purge DB
│   │       └── admin/
│   ├── components/
│   │   ├── ui/                         # Design system (Button, Card, Input…)
│   │   ├── simulator/                  # SimulatorForm, PartsCalculator, FeedbackWidget
│   │   ├── layout/                     # Header, Footer
│   │   ├── blog/                       # MarkdownRenderer
│   │   ├── bannerAd/
│   │   ├── analytics/                  # SpeedInsightsGate
│   │   └── seo/                        # JsonLd
│   └── lib/
│       ├── fiscal/                     # Moteur de calcul
│       │   ├── calculator.ts
│       │   ├── types.ts
│       │   └── constants.ts
│       ├── db/
│       │   └── prisma.ts
│       ├── validation/
│       │   └── schemas.ts
│       ├── utils/
│       │   └── url-serializer.ts       # Encode/décode les simulations dans l'URL
│       ├── blog/
│       └── admin/
├── prisma/
│   └── schema.prisma
├── public/
├── .env.local
└── package.json
```

---

## 🗄️ Base de Données

> **Important** : La base de données n'est PAS utilisée pour stocker les simulations. Les simulations sont entièrement stateless via l'URL.

La DB Supabase (Prisma) est utilisée uniquement pour :

- **Feedback** : avis et retours utilisateurs
- **Article** : articles de blog gérés via l'admin
- **UserAction** : tracking anonyme des actions (pour analytics internes)

Le modèle `Simulation` existe encore dans `prisma/schema.prisma` mais n'est plus écrit. Les routes legacy `/resultats/[uuid]` et `/api/share/[uuid]` retournent respectivement 404 et 410.

---

## 🔗 Système de Partage Stateless

Toutes les données de simulation transitent exclusivement par l'URL.

### Encodage (`src/lib/utils/url-serializer.ts`)

```text
Données → sérialisation Base36 → compression LZ-String → paramètre ?s=
```

**Format intermédiaire** : `{incA}.{incB}.{ssAssB}.{chA}.{chB}`

- Revenus : Base36 (5 chars max pour 10 M€)
- Situations spéciales : 5 bits packés en 1 char Base36 par personne
- Enfants : 1 char count + 1 char par 2 enfants (2 bits/enfant)

**Exemple d'URL** : `/resultats?s=N4IgDg...` (objectif < 100 caractères)

### Décodage

La page `/resultats` lit le paramètre `?s=`, décompresse, désérialise, puis **recalcule les impôts à la volée** sans appel base de données. Un fallback `sessionStorage` permet les rechargements de page.

### Partage

L'utilisateur copie l'URL `?s=...` — le destinataire obtient les mêmes résultats en ouvrant le lien, sans compte ni serveur impliqué.

---

## 🧮 Logique Fiscale (Barème 2024)

### Constantes (`src/lib/fiscal/constants.ts`)

```typescript
const FISCAL_CONSTANTS = {
  TRANCHES: [
    { threshold: 177106, rate: 0.45 },
    { threshold: 82341,  rate: 0.41 },
    { threshold: 28797,  rate: 0.30 },
    { threshold: 11294,  rate: 0.11 },
    { threshold: 0,      rate: 0.00 },
  ],
  ABATTEMENT_10: { min: 442, max: 14171, rate: 0.10 },
  PLAFOND_QF_DEMI_PART: 1759,
  DECOTE: {
    seuilCelibataire: 1929,
    seuilCouple: 3191,
    coeff: 0.45,
  }
};
```

### Étapes de Calcul

1. **Revenu Net Imposable (RNI)** — RNI = Revenu brut - max(abattement 10%, frais réels). Abattement plafonné : min(max(revenu × 0.10, 442€), 14 171€)
2. **Quotient Familial (QF)** — QF = RNI / nombre de parts. Parts : 1 (célibataire), 2 (couple), +0.5 par enfant (2 premiers), +1 par enfant suivant
3. **Impôt Brut** — Barème progressif appliqué au QF, multiplié par le nombre de parts
4. **Plafonnement QF** — Gain limité à 1 759 € par demi-part additionnelle
5. **Décote** — Si impôt < seuil : décote = seuil - (impôt × 0.45)

> Le barème change annuellement — mettre à jour `src/lib/fiscal/constants.ts` chaque année.

---

## 🔐 Privacy & RGPD

### Principes

- **Privacy by Design** : aucune donnée de simulation stockée côté serveur
- **Minimisation** : les données restent dans l'URL du navigateur de l'utilisateur
- **Transparence** : mentions légales claires sur le traitement

### Données Stockées en Base

✅ **OUI** (feedback et analytics anonymes) :

- Avis utilisateurs (feedback)
- Contenu des articles de blog
- Actions anonymes tracées (sans IP ni identifiant personnel)

❌ **NON** (jamais stocké) :

- Revenus des simulations
- Résultats fiscaux
- Nom / Prénom / Email
- Adresse IP
- UUID de simulation
- Cookies tiers

### Rétention

Les simulations n'ont pas de TTL car elles ne sont pas stockées. Le cron `/api/cleanup` purge uniquement les données de feedback et d'actions au-delà de leur durée de rétention.

---

## 🔄 Flux Utilisateur

```text
1. Landing Page
   └─> CTA "Simuler ma situation"

2. Formulaire Multi-Steps (/simulateur)
   ├─> Revenus Conjoint A + situations spéciales
   ├─> Revenus Conjoint B + situations spéciales
   └─> Enfants (nombre, garde alternée, invalidité)

3. Encodage & Redirection (100% client-side)
   ├─> Sérialisation Base36 des données
   ├─> Compression LZ-String
   └─> Redirection vers /resultats?s={code}

4. Affichage Résultats (/resultats)
   ├─> Décodage du paramètre ?s=
   ├─> Recalcul fiscal (lib/fiscal/calculator.ts)
   ├─> Comparatif 3 scénarios
   ├─> Export PDF (jspdf)
   └─> Bouton "Partager" → Copie l'URL ?s= dans le presse-papiers

5. Partage (Optionnel)
   └─> Destinataire ouvre /resultats?s=...
       └─> Même décodage + recalcul, sans base de données
```

---

## 📊 SEO & Schema.org

### Pages SEO Dédiées

- `/mariage` — guide fiscal sur le mariage
- `/pacs` — guide fiscal sur le PACS
- `/quotient-familial` — explication du quotient familial
- `/faq` — questions fréquentes

### JSON-LD (`src/components/seo/JsonLd.tsx`)

```typescript
{
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "Fiscal Couple Optimizer",
  "description": "Simulateur fiscal pour couples",
  "serviceType": "Tax Calculation",
  "areaServed": { "@type": "Country", "name": "France" }
}
```

---

## 🐛 Points d'Attention

### Performance

- **SSR** pour le blog et les pages SEO
- **Client Components** uniquement pour le simulateur et les résultats
- **Code splitting** automatique (Next.js)
- **URL cible** : < 100 caractères pour le paramètre `?s=`

### Sécurité

- **Input sanitization** : Zod valide toutes les entrées avant calcul
- **Stateless par défaut** : pas de surface d'attaque base de données pour les simulations
- **LZ-String** : décompression avec validation — une URL corrompue retourne une erreur gracieuse
- **CSP headers** : pas de scripts inline

### Accessibilité

- **ARIA labels** sur tous les inputs
- **Focus management** (navigation clavier)
- **Contraste** AA minimum (WCAG 2.1)
- **Screen reader friendly**

---

## 📚 Ressources Utiles

### Documentation Officielle

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [lz-string](https://pieroxy.net/blog/pages/lz-string/index.html)

### Fiscalité France

- [Service-Public.fr - Impôt sur le revenu](https://www.service-public.fr/particuliers/vosdroits/F34328)
- [Impots.gouv.fr - Barème](https://www.impots.gouv.fr/particulier/bareme-de-calcul-de-limpot)

---

## 📝 Notes Importantes

1. **Disclaimer Légal** : Toutes les pages de résultats affichent "Simulation à titre indicatif, non contractuelle".

2. **Mise à Jour Barème** : Mettre à jour `src/lib/fiscal/constants.ts` chaque début d'année fiscale.

3. **Routes Legacy** : Ne pas supprimer `/resultats/[uuid]` ni `/api/share/[uuid]` — ils retournent 404/410 proprement pour les anciens liens en circulation.
