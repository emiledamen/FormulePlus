# Patch: package.json alias voor prisma-adapter

**Probleem:** Code importeert `@next-auth/prisma-adapter`, terwijl de juiste package tegenwoordig `@auth/prisma-adapter` is.
**Oplossing:** Voeg **beide** deps toe, met een npm-alias zodat legacy imports blijven werken:

```json
"@auth/prisma-adapter": "^1.0.7",
"@next-auth/prisma-adapter": "npm:@auth/prisma-adapter@^1.0.7"
```

## Stappen
1) Vervang `package.json` door deze versie.
2) `npm install` (of laat Vercel opnieuw installeren).
3) Build opnieuw: de import `@next-auth/prisma-adapter` wordt nu netjes doorgelinkt.

## Opmerking
- Geen andere wijzigingen. Je kunt de code later migreren naar `@auth/prisma-adapter` imports, maar dat hoeft nu niet.
