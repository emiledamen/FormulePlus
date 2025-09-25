PATCH_NOTES.md
Doel: build-fouten oplossen met 1-op-1 bestanden (geen layout-wijzigingen).

Bestanden (op repo-root neerzetten, bestaande overschrijven):
- jsconfig.json  → alias '@/*' werkt nu voor imports.
- package.json   → bevat benodigde dependencies & scripts.

Belangrijk:
- Vercel zal automatisch `npm install` doen op basis van package.json.
- Prisma: `postinstall` runt `prisma generate`.
- Migraties: gebruik `npm run prisma:deploy` in CI (of `npx prisma migrate dev` lokaal).

Let op: als je jouw huidige package.json sterk afwijkt, laat het weten: dan merge ik 'm voor je met behoud van jouw custom scripts en versies.
