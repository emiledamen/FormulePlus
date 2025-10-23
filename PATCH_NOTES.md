# Hotfix 2: Auth adapter & pad-fixes

**Problemen:**
1) `Module not found: Can't resolve '@auth/prisma-adapter'`
2) Alias-imports in `lib/auth/...` verwezen naar `@/...`

**Oplossing:**
- `package.json`: voeg stabiele dependency **@auth/prisma-adapter** toe.
- `lib/auth/options.ts`: alias naar relatieve import voor e-mailtemplate.
- `lib/auth/session.ts`: alias naar relatieve import voor options.

## Gewijzigde bestanden
- `package.json.MERGE_ME.txt` (voeg dependency toe)
- `lib/auth/options.ts` (import pad fix)
- `lib/auth/session.ts` (import pad fix)
- `lib/auth/options.ts` (import pad fix)
- `lib/auth/session.ts` (import pad fix)

## Rooktest
- `npm install` / Vercel build zou nu doorgaan voorbij vorige fouten.
- `/login` → e-mail ontvangen → link werkt → `/account` OK.

## Rollback
- Zet deze drie bestanden terug naar baseline. Geen migraties / schema-changes.
