# Patch: Auth 500-fix (Prisma singleton + non-throwing email send)

**Probleem:** HTTP 500 tijdens `/api/auth/signin/email` / `/verify-request`.
Bekende oorzaken: meerdere Prisma instanties in serverless, of exceptions in `sendVerificationRequest` (mailfout).
Deze patch adresseert beide.

**Wat is aangepast:**
- `lib/prisma.ts` (nieuw): Prisma **singleton** via `globalThis` (Next.js aanbevolen patroon).
- `lib/auth/options.ts`: gebruikt singleton; `sendWithResend` **gooit niet meer** bij mailfout (logt alleen).
  Zo blijft de route up zonder 500, en zie je mailfouten in logs/Resend.

**Let op:** Zorg dat `RESEND_API_KEY` en **geverifieerde** `RESEND_FROM` correct zijn.
Voor een snelle test kun je tijdelijk `RESEND_FROM=onboarding@resend.dev` gebruiken.

## Rooktest
1) Deploy → `/login` → verstuur → je hoort **/verify-request** te zien (geen 500).
2) Met geldige Resend-config komt mail aan; klik → `/account` met sessie.
