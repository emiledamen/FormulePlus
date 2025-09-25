import { auth } from "@/lib/auth";

export async function requireAdmin() {
  const session = await auth();
  if (!session || (session as any).role !== "admin") {
    throw new Error("Not authorized");
  }
  return session;
}
