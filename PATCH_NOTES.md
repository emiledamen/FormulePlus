PATCH_NOTES.md
Fix: 'Module not found' voor prisma en '@/lib/prisma'.
- Toegevoegd: lib/prisma.ts (PrismaClient singleton)
- Aangepast: lib/auth.ts importeert nu './prisma' (geen '@/')
- API routes gebruiken relatieve imports naar lib/prisma.ts

Plaats alles 1-op-1 op repo-root en deploy opnieuw.
