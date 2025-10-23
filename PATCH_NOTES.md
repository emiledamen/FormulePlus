# Patch: NextAuth runtime fix (Node.js + no cache)

**Waarom:** Prisma werkt niet op de Edge-runtime. Een 500 tijdens `/api/auth/*` kan ontstaan als
de route op Edge draait of gecached wordt. Deze patch **forceert Node.js** en schakelt caching uit.

## Gewijzigd
- `app/api/auth/[...nextauth]/route.ts`:
  - `export const runtime = "nodejs"`
  - `export const dynamic = "force-dynamic"`

## Rooktest
1) Deploy deze patch.
2) `/login` → verstuur e-mail → je moet **/verify-request** zien i.p.v. HTTP 500.
3) E-mail ontvangen → klik → **/account** toont sessie.

## Let ook op (mogelijke 500-oorzaken)
- ENV: `NEXTAUTH_URL`, `AUTH_SECRET`, `RESEND_API_KEY`, `RESEND_FROM`, `DATABASE_URL` correct gezet.
- Database heeft NextAuth-tabellen (`User`, `Account`, `Session`, `VerificationToken`): zo niet → run `npm run prisma:deploy`.
- Resend: domein/afzender geverifieerd; API key actief; check Resend Logs voor fouten (401/403/422).
