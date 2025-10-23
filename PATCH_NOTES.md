# Patch: package.json naamfix

**Probleem:** verkeerde dependency-naam `@next-auth/prisma-adapter` → module niet gevonden.
**Oplossing:** hernoemd naar `@auth/prisma-adapter` (zelfde stabiele versie ^1.0.7).

## Wat te doen
1. Vervang je bestaande `package.json` door deze versie.
2. Run lokaal `npm install` of laat Vercel opnieuw bouwen.
3. Build zou nu slagen; magic-link login werkt.

## Geen verdere wijzigingen
- Alle andere dependencies, scripts en versies ongewijzigd.
