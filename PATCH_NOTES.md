# Hotfix: Betrouwbare e-mail sign‑in (CSRF + echte POST)

**Symptoom:** Op `/login` verschijnt nog steeds “Unexpected end of JSON input” na verzenden.
**Oorzaak:** De client probeerde een JSON‑antwoord te verwerken. We omzeilen dit volledig door
een *echte* `POST` naar NextAuth te doen met CSRF‑token (geen fetch/json parsing).

**Wat is aangepast**
- `components/AuthEmailForm.tsx`: geen `signIn()` meer. We halen `csrfToken` op en dienen een
  **onzichtbare HTML‑form** in naar `/api/auth/signin/email` (methode POST) met velden:
  `csrfToken`, `email`, `callbackUrl`. De server doet daarna zelf de redirect naar
  `pages.verifyRequest` (geen JSON).
- `lib/auth/options.ts`: `pages.verifyRequest = "/verify-request"` toegevoegd (expliciet).

**Rooktest**
1) `/login` → e‑mail invullen → klik → pagina navigeert automatisch naar `/verify-request`.
2) Klik de link uit je e‑mail → je landt ingelogd op `/account`.

**Rollback**
Vervang de twee bestanden terug naar de vorige versie.
