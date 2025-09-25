Additieve module (1-op-1 te kopiëren naar repo-root). Nieuwe bestanden:
- prisma/schema.prisma
- lib/prisma.ts
- lib/auth.ts
- lib/adminGuard.ts
- app/api/auth/[...nextauth]/route.ts
- app/api/products/route.ts
- app/api/products/[id]/route.ts
- app/api/products/reorder/route.ts
- app/login/page.tsx
- app/admin/artikelen/page.tsx
- middleware.ts
- .env.example

Benodigd:
npm i prisma @prisma/client next-auth @auth/prisma-adapter resend zod
npx prisma generate

Vul .env in, daarna migreren: npx prisma migrate dev (lokaal) of prisma:deploy in CI.
