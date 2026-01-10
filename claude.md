# FISCAL COUPLE OPTIMIZER - Documentation Projet

## 📋 Vue d'Ensemble

**Nom du projet** : Fiscal Couple Optimizer  
**Objectif** : Moteur de simulation fiscale comparant les impacts fiscaux du Célibat, PACS et Mariage en France  
**Public cible** : Couples français cherchant à optimiser leur situation fiscale

---

## 🎯 Fonctionnalités Principales

### 1. Simulateur Fiscal Interactif
- Collecte des revenus nets imposables (N-1)
- Situation familiale (célibataire, PACS, marié)
- Nombre d'enfants à charge
- Frais réels vs abattement 10%
- Parts fiscales additionnelles (invalidité, etc.)

### 2. Comparateur 3 Scénarios
- **Scénario A** : Célibat (imposition séparée)
- **Scénario B** : PACS (imposition commune)
- **Scénario C** : Mariage (imposition commune)
- Calcul du delta financier entre chaque scénario
- Recommandation optimale avec timing (date d'union conseillée)

### 3. Système de Partage
- Génération d'un UUID v4 unique par simulation
- URL partageable : `/resultats/[uuid]`
- Pas de compte utilisateur requis
- Données anonymes et temporaires (30 jours)

### 4. Blog SEO-Optimisé
- Articles en MDX (Markdown enrichi)
- Guides fiscaux (quotient familial, tranches IR, etc.)
- Injection Schema.org (FAQ, Article, FinancialService)

---

## 🛠️ Stack Technique

### Core
- **Framework** : Next.js 14+ (App Router)
- **Language** : TypeScript 5.0+
- **Styling** : Tailwind CSS 3.4+

### Backend
- **Database** : Supabase (PostgreSQL)
- **ORM** : Prisma 5.0+
- **Hosting** : Vercel (Serverless + Edge Functions)

### Libs Additionnelles
- **Validation** : Zod 3.0+
- **Forms** : React Hook Form 7.0+
- **Content** : next-mdx-remote
- **UUID** : crypto.randomUUID() (native)

---

## 📁 Architecture du Projet

```
fiscal-couple-optimizer/
├── app/
│   ├── (marketing)/              # Pages publiques
│   │   ├── page.tsx              # Landing page
│   │   ├── about/
│   │   ├── privacy/
│   │   └── legal/
│   ├── (simulator)/              # Simulateur
│   │   ├── simulateur/
│   │   │   ├── page.tsx
│   │   │   └── [step]/
│   │   └── resultats/
│   │       ├── page.tsx
│   │       └── [uuid]/
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/
│   ├── api/
│   │   ├── simulate/route.ts     # POST calcul
│   │   ├── share/[uuid]/route.ts # GET partage
│   │   └── cleanup/route.ts      # Cron purge
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                       # Design system
│   ├── simulator/                # Formulaires
│   ├── layout/
│   └── seo/
├── lib/
│   ├── fiscal/                   # Moteur de calcul
│   │   ├── calculator.ts
│   │   ├── types.ts
│   │   └── constants.ts
│   ├── db/
│   │   ├── prisma.ts
│   │   └── queries.ts
│   ├── validation/
│   │   └── schemas.ts
│   └── utils/
├── content/blog/                 # Articles MDX
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
├── .env.local
└── package.json
```

---

## 🗄️ Schéma de Base de Données

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Simulation {
  id        String   @id @default(uuid()) @db.Uuid
  
  // Conjoint A
  incomeA      Float
  fraisReelsA  Float    @default(0)
  partsA       Float    @default(0)
  
  // Conjoint B
  incomeB      Float
  fraisReelsB  Float    @default(0)
  partsB       Float    @default(0)
  
  // Foyer
  children        Int      @default(0)
  gardeAlternee   Boolean  @default(false)
  
  // Résultats (JSON)
  results      Json
  
  // Metadata
  createdAt    DateTime @default(now())
  expiresAt    DateTime
  
  @@index([expiresAt])
  @@index([createdAt])
}
```

**Champs du JSON `results`** :
```typescript
{
  solo: {
    conjointA: number,
    conjointB: number,
    total: number
  },
  union: {
    total: number,
    parts: number
  },
  optimization: {
    gain: number,
    isBetter: boolean,
    message: string
  }
}
```

---

## 🧮 Logique Fiscale (Barème 2024)

### Constantes
```typescript
const FISCAL_CONSTANTS = {
  TRANCHES: [
    { threshold: 177106, rate: 0.45 },
    { threshold: 82341, rate: 0.41 },
    { threshold: 28797, rate: 0.30 },
    { threshold: 11294, rate: 0.11 },
    { threshold: 0, rate: 0.00 },
  ],
  ABATTEMENT_10: { 
    min: 442, 
    max: 14171, 
    rate: 0.10 
  },
  PLAFOND_QF_DEMI_PART: 1759,
  DECOTE: {
    seuilCelibataire: 1929,
    seuilCouple: 3191,
    coeff: 0.45,
  }
};
```

### Étapes de Calcul
1. **Revenu Net Imposable (RNI)**
   - RNI = Revenu brut - max(abattement 10%, frais réels)
   - Abattement 10% plafonné : min(max(revenu × 0.10, 442€), 14171€)

2. **Quotient Familial (QF)**
   - QF = RNI / nombre de parts
   - Parts = 1 (célibataire) ou 2 (couple)
   - +0.5 par enfant (2 premiers), +1 par enfant suivant

3. **Impôt Brut**
   - Application du barème progressif sur le QF
   - Multiplication par le nombre de parts

4. **Plafonnement QF**
   - Gain limité à 1759€ par demi-part additionnelle

5. **Décote**
   - Si impôt < seuil : décote = seuil - (impôt × 0.45)
   - Seuil : 1929€ (célibataire) / 3191€ (couple)

---

## 🔐 Privacy & RGPD

### Principes
- **Privacy by Design** : aucune donnée identifiante collectée
- **Minimisation** : seules les données fiscales nécessaires au calcul
- **Transparence** : mentions légales claires sur le traitement

### Données Stockées
✅ **OUI** :
- Revenus (anonymes)
- Nombre d'enfants
- Résultats calculés
- UUID
- Timestamps

❌ **NON** :
- Nom / Prénom
- Email
- Adresse IP
- Cookies tiers
- Analytics nominatifs

### Rétention
- **TTL** : 30 jours (auto-suppression)
- **Cron Job** : Edge Function Vercel quotidienne
- **Cleanup** : `DELETE FROM Simulation WHERE expiresAt < NOW()`

---

## 🔄 Flux Utilisateur

```
1. Landing Page
   └─> CTA "Simuler ma situation"

2. Formulaire Multi-Steps
   ├─> Étape 1 : Revenus Conjoint A
   ├─> Étape 2 : Revenus Conjoint B
   ├─> Étape 3 : Situation familiale
   └─> Étape 4 : Options (frais réels, parts)

3. Calcul & Sauvegarde
   ├─> Validation Zod
   ├─> Appel API /api/simulate
   ├─> Calcul fiscal (lib/fiscal/calculator.ts)
   ├─> Génération UUID
   └─> INSERT Prisma (expiresAt = now() + 30j)

4. Affichage Résultats
   ├─> Comparatif 3 scénarios
   ├─> Graphique gains/pertes
   ├─> Recommandation timing
   └─> Bouton "Partager" → Copie URL /resultats/[uuid]

5. Partage (Optionnel)
   └─> GET /api/share/[uuid]
       ├─> Fetch Prisma
       └─> Affichage read-only
```

---


## 📊 SEO & Schema.org

### Metadata (Next.js 14+)
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: 'Optimiseur Fiscal Couple | PACS vs Mariage',
  description: 'Calculez et comparez l\'impact fiscal du célibat, PACS et mariage. Simulateur gratuit et anonyme.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://fiscal-optimizer.vercel.app',
    siteName: 'Fiscal Couple Optimizer',
    images: ['/og-image.png']
  }
}
```

### JSON-LD (Schema.org)
```typescript
// components/seo/JsonLd.tsx
{
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "Fiscal Couple Optimizer",
  "description": "Simulateur fiscal pour couples",
  "serviceType": "Tax Calculation",
  "areaServed": {
    "@type": "Country",
    "name": "France"
  }
}
```

---

## 🐛 Points d'Attention

### Performance
- **SSR** pour le blog (SEO)
- **Client Components** uniquement pour l'interactivité
- **Code splitting** automatique (Next.js)
- **Images optimisées** (next/image)

### Sécurité
- **Input sanitization** (Zod + DOMPurify si HTML)
- **Rate limiting** (5 req/min par IP sur /api/simulate)
- **UUID v4** (évite énumération séquentielle)
- **CSP headers** (pas de scripts inline)

### Accessibilité
- **ARIA labels** sur tous les inputs
- **Focus management** (navigation clavier)
- **Contraste** AA minimum (WCAG 2.1)
- **Screen reader friendly**

---


## 📚 Ressources Utiles

### Documentation Officielle
- [Next.js 14 Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)

### Fiscalité France
- [Service-Public.fr - Impôt sur le revenu](https://www.service-public.fr/particuliers/vosdroits/F34328)
- [Impots.gouv.fr - Barème](https://www.impots.gouv.fr/particulier/bareme-de-calcul-de-limpot)

---

## 📝 Notes Importantes

1. **Disclaimer Légal** : Ajouter une mention "Simulation à titre indicatif, non contractuelle" sur toutes les pages de résultats.

2. **Mise à Jour Barème** : Le barème fiscal change annuellement. Prévoir un système de configuration facile à updater (fichier constants.ts).
