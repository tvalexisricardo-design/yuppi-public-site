# Yuppi — CMS + Scraper + SEO + AdSense

## 1. Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## 2. Supabase CMS

1. Create a Supabase project.
2. Open SQL Editor.
3. Paste/run `supabase-schema.sql`.
4. Copy `.env.example` to `.env.local`.
5. Fill:
   - `SUPABASE_URL`
   - `SUPABASE_SECRET_KEY` (recomendado; a chave legacy `SUPABASE_SERVICE_ROLE_KEY` continua aceite temporariamente). Esta chave é apenas server-side e nunca deve ser exposta como `NEXT_PUBLIC_...`.
   - `ADMIN_USER`
   - `ADMIN_PASSWORD`
6. Seed the current Markdown profiles:

```bash
npm run cms:seed
```

7. Start the app and open `http://localhost:3000/admin`.

The admin uses HTTP Basic Auth. On a deployed site, use a long random password and HTTPS.

## 3. Add/edit professionals after publishing

Go to `/admin` and use **+ Novo profissional**. Changes are stored in Supabase and the public site reads published records dynamically, so a new deploy is not required.

Images are URL-based. This is intentional: Yuppi does not need to receive or store third-party image files. Use an image URL you are allowed to display, ideally supplied/authorized by the professional or hosted in a permitted public source.

## 4. Scraper / discovery pipeline

Put one public professional/business URL per line in `scripts/sources.txt`.

Run:

```bash
npm run scrape:professionals
```

The script creates `data/scrape-candidates.json`. It only reads public page metadata (title, description, og:image) and never publishes anything automatically.

In `/admin` → **Candidatos**, import the JSON file, then **Rever e importar** each candidate. Review the category, location, description and image before publishing.

## 5. SEO

Published profiles automatically feed:
- `/profissionais`
- `/profissionais/perfil/[slug]`
- `/profissionais/[categoria]/[cidade]`
- `/sitemap.xml`

Category landing pages also show matching professionals when available. Empty category/city combinations are not created.

## 6. AdSense

Set `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-...` in the production environment. The site already contains ad placements on the homepage, directory, service/category pages, city/category pages, profiles, partner page and blog articles.

`/ads.txt` is generated automatically from the AdSense publisher ID.

Before serving personalized ads to users in the EEA/UK/Switzerland, configure a Google-certified consent management platform (CMP) appropriate to your AdSense setup and privacy requirements. Do not bypass consent requirements.

## Recommended workflow

Discover → scrape metadata → import candidates → review → add/authorize image → publish → monitor Search Console → grow useful pages → monetize with AdSense.
