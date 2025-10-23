# Hotfix: A1 path aliases → relative imports

**Probleem:** Build faalde met `Module not found: Can't resolve '@/...'` — baseline heeft geen `@` alias ingesteld in `tsconfig.json`.
**Oplossing:** Alias-imports vervangen door **relatieve paden** in 3 bestanden.

## Gewijzigde bestanden
- `app/login/page.tsx` → `@/components/AuthEmailForm` → `../../components/AuthEmailForm`
- `app/account/page.tsx` → `@/lib/auth/session` → `../../lib/auth/session`
- `app/api/auth/[...nextauth]/route.ts` → `@/lib/auth/options` → `../../../../lib/auth/options`

## Rooktest
- Deploy opnieuw → build moet slagen voorbij eerdere errors.
- `/login` rendert, magic-link flow intact.

## Rollback
- Zet bovenstaande bestanden terug naar vorige versie (met alias import). Geen verdere impact.
