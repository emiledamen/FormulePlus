# Mollie Shop Starter (MVP)

Minimale Next.js 14 App Router shop met Mollie-betaling. Versiebadge: 2025-09-15T11:12:17.163099

## Wat zit erin
- Home met productlijst (uit `data/products.json`)
- **/api/checkout**: maakt een Mollie payment aan en redirect naar Mollie Checkout
- **/success** en **/cancel** pagina's
- **/api/webhook**: webhook-stub die Mollie calls accepteert (logt nu alleen)
- `.env.example` met `MOLLIE_API_KEY` en `APP_URL`

## Snel starten
1. **Kloon/uitpakken** en installeer deps:
   ```bash
   npm install
   ```

2. **.env** maken:
   ```bash
   cp .env.example .env
   # Zet MOLLIE_API_KEY en APP_URL
   ```

3. **Dev-run**:
   ```bash
   npm run dev
   # open http://localhost:3000
   ```

4. **Mollie dashboard**:
   - Activeer iDEAL (en andere methoden) in test-modus.
   - Zorg dat `APP_URL` klopt. Mollie voegt automatisch `?id=tr_xxx` toe aan je `redirectUrl`.

5. **Webhook (optioneel in dev)**:
   - Gebruik een tunnel (bv. `cloudflared`/`ngrok`) om `APP_URL` extern bereikbaar te maken, of test zonder webhook.
   - In productie wordt de webhook automatisch bereikt op `https://your-domain/api/webhook`.

## E-mail
- Mollie verstuurt standaard een **betalingsbevestiging** (instelbaar in dashboard).
- Verzendbevestiging met tracking voegen we in **stap 2** toe via Resend/Postmark + mini-admin.

## Belangrijk
- Dit is een slanke basis zonder database. Besteloverzicht zie je in Mollie.
- Voorraad is statisch (boolean per product).

## Deploy (Vercel)
- Zet **MOLLIE_API_KEY** en **APP_URL** als Environment Variables.
- Deploy en test een betaling in **test-modus**.

## Licentie
MIT
