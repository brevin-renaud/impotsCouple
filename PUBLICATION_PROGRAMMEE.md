# Publication Programmée des Articles

## Fonctionnalité

Le système permet de programmer la publication automatique des articles de blog à une date et heure spécifiques (10H).

## Comportement

### Lors de la création/modification d'un article :

1. **Article en brouillon (`isDraft = true`)** :
   - L'article n'est pas publié, quelle que soit la date
   - `publishedAt = null`
   - `scheduledPublishAt = null`

2. **Article publié sans date spécifique** :
   - Publication immédiate
   - `publishedAt = Date actuelle`
   - `scheduledPublishAt = null`

3. **Article publié avec date passée ou du jour** :
   - Publication immédiate
   - `publishedAt = Date actuelle`
   - `scheduledPublishAt = null`

4. **Article publié avec date future** :
   - Publication programmée à 10H le jour spécifié
   - `publishedAt = null`
   - `scheduledPublishAt = Date choisie à 10H00`

### Affichage sur le site

Seuls les articles avec `isDraft = false` ET `publishedAt != null` sont visibles publiquement.

## Configuration Technique

### 1. Schéma Prisma

```prisma
model Article {
  // ...
  publishedAt        DateTime? // Date de publication effective
  scheduledPublishAt DateTime? // Date de publication programmée à 10H
  isDraft            Boolean   @default(true)
  // ...
}
```

### 2. Endpoint de Publication

**Route** : `/api/publish-scheduled`

**Méthode** : `POST`

**Authentification** : Bearer token via header `Authorization`

**Fonctionnement** :
- Recherche tous les articles avec :
  - `isDraft = false`
  - `publishedAt = null`
  - `scheduledPublishAt <= maintenant`
- Met à jour ces articles :
  - `publishedAt = maintenant`
  - `scheduledPublishAt = null`

### 3. Cron Job (Vercel)

Configuré dans `vercel.json` :

```json
{
  "crons": [
    {
      "path": "/api/publish-scheduled",
      "schedule": "0 10 * * *"
    }
  ]
}
```

**Exécution** : Tous les jours à 10H00 (heure du serveur UTC)

### 4. Variables d'Environnement

Ajouter dans Vercel ou `.env.local` :

```env
CRON_SECRET=votre_token_secret_tres_long_et_aleatoire
```

⚠️ **Important** : Générer un token sécurisé (ex: `openssl rand -base64 32`)

## Test en Local

### Vérifier les articles programmés (sans publier) :

```bash
curl -H "Authorization: Bearer VOTRE_TOKEN" \
  http://localhost:3000/api/publish-scheduled
```

### Publier manuellement les articles programmés :

```bash
curl -X POST \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  http://localhost:3000/api/publish-scheduled
```

## Déploiement

1. **Configurer le CRON_SECRET dans Vercel** :
   ```bash
   vercel env add CRON_SECRET
   ```

2. **Déployer** :
   ```bash
   vercel --prod
   ```

3. **Vérifier les Cron Jobs** :
   - Dashboard Vercel → Projet → Settings → Cron Jobs
   - Les logs d'exécution sont visibles dans l'onglet "Logs"

## Notes

- Le cron Vercel utilise UTC. 10H UTC = 11H Paris (hiver) ou 12H Paris (été)
- Pour ajuster l'heure, modifier le schedule dans `vercel.json` :
  - `0 9 * * *` = 9H UTC (10H/11H Paris)
  - `0 8 * * *` = 8H UTC (9H/10H Paris)
- Les articles programmés ne sont pas visibles publiquement tant que `publishedAt` est null
- Le système supporte plusieurs articles programmés pour le même jour
