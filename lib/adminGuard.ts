// lib/adminGuard.ts
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

/**
 * Server-side guard to ensure the current user is an admin.
 * Throws an Error when unauthorized; call this at the top of server actions or route handlers.
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  const role = (session as any)?.role ?? "user";
  if (!session || role !== "admin") {
    // You can replace this with NextResponse.redirect('/login') in route handlers if you prefer redirect behavior.
    throw new Error("Unauthorized: admin only");
  }
  return session;
}
