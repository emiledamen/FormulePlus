# Patch: A1 Klantenaccounts (magic‑link) + basisprofiel

**Baseline:** FormulePlus-100f0360f4d60053e45fc1a1a6b88dc804129047.zip (23-10-2025)  
**Doel:** Passwordless inloggen via e‑mail (magic link) + beveiligde `/account` pagina.  
**Providers:** NextAuth (Email provider) + Resend HTTP API (stabiel, geen extra npm‑dependency).

## Wat is er gewijzigd/toegevoegd
- `app/api/auth/[...nextauth]/route.ts` – aangepast om gedeelde opties te gebruiken.
- `lib/auth/options.ts` – centrale NextAuth opties (Email provider via Resend, PrismaAdapter).
- `lib/auth/session.ts` – helper voor server‑side sessie toegang.
- `middleware.ts` – beschermt `/account`; redirect naar `/login` als niet ingelogd.
- `app/login/page.tsx` – loginpagina met e‑mailformulier (magic link).
- `components/AuthEmailForm.tsx` – herbruikbaar e‑mailinlogformulier (client component).
- `app/account/page.tsx` – beveiligde accountpagina (skeleton).
- `emails/loginTemplate.ts` – eenvoudige HTML‑template voor login‑e-mail.

> **NB:** Deze patch veronderstelt dat NextAuth + Prisma al aanwezig zijn (zoals in jullie baseline).  
> De standaard **NextAuth Prisma tabellen** (User/Account/Session/VerificationToken) moeten al in de database staan.  
> Indien niet, voer dan een Prisma migratie met die modellen uit voordat je de login gebruikte.

## Nieuwe/gewijzigde ENV namen (voeg toe aan je Vercel/ENV, geen secrets in code)
- `NEXTAUTH_URL` = https://<jouw-domein> (bv. https://formuleplus.vercel.app)
- `AUTH_SECRET` = (sterke random string; `openssl rand -base64 32`)
- **Resend:**
  - `RESEND_API_KEY` = re_... (Resend API Key)
  - `RESEND_FROM` = "FormulePlus <no-reply@jouwdomein.nl>"

> Je kunt Resend gratis starten; alternatief (Postmark/SendGrid) kan later eenvoudig worden ingebouwd door
> `sendVerificationRequest` aan te passen. We kozen Resend HTTP API om **extra npm‑deps te vermijden**
> en stabiliteit te waarborgen.

## Rooktest
1. Deploy Preview met bovenstaande ENV’s ingesteld.
2. Ga naar `/login`, vul je e‑mail in, druk “Verstuur magic link”.
3. Klik op de ontvangen link; je komt terug met sessie actief.
4. Ga naar `/account` → pagina zichtbaar.
5. Sign‑out via `/api/auth/signout` (optioneel zelf een knopje toevoegen).

## Rollback
- Zet de gewijzigde files terug naar de baselineversie (verwijder nieuwe bestanden en herstel `app/api/auth/[...nextauth]/route.ts`).  
- Geen schema‑ of package‑wijzigingen in deze patch → rollback is bestand‑gebaseerd.

## Opmerkingen stabiliteit
- Resend is een gevestigde partij met hoge deliverability. Via HTTP API vermijden we SMTP‑time‑outs.
- Alle secrets via ENV; geen client‑exposure.  
- Middleware beschermt enkel `/account` (smalle scope).  
- Bestaande storefront/checkout wordt niet geraakt.
