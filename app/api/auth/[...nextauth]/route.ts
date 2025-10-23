// app/api/auth/[...nextauth]/route.ts
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { nextAuthHandler } from "../../../../lib/auth";
export const { GET, POST } = nextAuthHandler;
