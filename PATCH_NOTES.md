# Patch: Health checks voor ENV + DB

Doel: snel vaststellen of **FormulePlus** de juiste database gebruikt en of Prisma kan verbinden.

## Nieuwe routes
- `GET /api/health/db`
  - Parseert `process.env.DATABASE_URL` en geeft **host**, **database-naam** en **user** terug (geen wachtwoord).
- `GET /api/health/prisma`
  - Doet `SELECT 1` via Prisma en geeft `{ ok: true }` terug bij succes.

Beide routes forceren **Node.js runtime** en `dynamic = "force-dynamic"`.

## Gebruik
1) Deploy deze patch.
2) Open `/api/health/db` → controleer dat **host/db** van de **FormulePlus**-database zijn (niet meld).
3) Open `/api/health/prisma` → verwacht `{ ok: true }`.
4) Werkt dit, maar login nog niet? Dan ligt het aan mail/NextAuth-config, niet aan DB.
