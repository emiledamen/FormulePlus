// app/api/auth/[...nextauth]/route.ts
import { nextAuthHandler } from "../../../../lib/auth";
export const { GET, POST } = nextAuthHandler;
