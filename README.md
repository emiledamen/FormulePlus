# Mollie Shop Starter (MVP)
Versie: 2025-09-15T16:48:06.698556

## Inhoud
- Next.js 14 (App Router), React 18
- Productlijst (`public/products.json`)
- API: `/api/checkout` (Mollie payment), `/api/webhook` (stub)
- Pagina's: `/success`, `/cancel`

## Snel starten
```bash
npm install
cp .env.example .env
# Zet MOLLIE_API_KEY en APP_URL
npm run dev
# open http://localhost:3000
```
**APP_URL** = publieke basis-URL, bv. `http://localhost:3000` lokaal of je Vercel-URL in productie.

## Vercel env vars
- `MOLLIE_API_KEY` (test_… in testmodus)
- `APP_URL` (bv. https://<project>.vercel.app)

## Opmerking
Zonder Mollie key draait de site, maar /api/checkout geeft een fout (verwacht).

MIT
