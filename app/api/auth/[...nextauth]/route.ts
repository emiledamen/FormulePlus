import NextAuth from "next-auth";
import { authOptions } from "../../../../lib/auth/options";

// Ensure this API route runs on the Node.js runtime (required for Prisma)
export const runtime = "nodejs";
// Avoid static optimization/caching on auth routes
export const dynamic = "force-dynamic";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
