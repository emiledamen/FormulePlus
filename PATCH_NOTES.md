# Hotfix: Email sign-in JSON error

**Symptoom:** Op `/login` verschijnt "Unexpected end of JSON input" na het versturen van de magic link.
**Oorzaak:** `signIn('email', { redirect: false })` laat NextAuth een JSON-respons verwachten van de sign-in route,
die in het email-provider-pad niet geleverd wordt. Daardoor ontstaat een parse error in de client.

**Oplossing (klein & veilig):**
- `components/AuthEmailForm.tsx`: gebruik **redirect (default)** en laat NextAuth doorsturen naar een
  bevestigingspagina. Callback blijft `/account` wanneer de link uit de e-mail wordt gebruikt.
- `app/verify-request/page.tsx`: eenvoudige bevestigingspagina “Check je e-mail”.

## Rooktest
1) Ga naar `/login`, vul e-mail in, klik “Verstuur magic link” → je ziet de pagina “Check je e-mail”.
2) Klik op de link uit de e-mail → je komt terug en bent ingelogd; `/account` werkt.

## Rollback
Vervang de gewijzigde/bijgevoegde bestanden terug naar de vorige versie.
