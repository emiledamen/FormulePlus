import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.DATABASE_URL || "";
  try {
    const u = new URL(url);
    const masked = {
      protocol: u.protocol.replace(":", ""),
      host: u.host,
      pathname: u.pathname.replace(/^\//, ""),
      user: decodeURIComponent(u.username || ""),
      // password intentionally omitted
      sslmode: u.searchParams.get("sslmode") || undefined,
    };
    return NextResponse.json({ ok: true, db: masked });
  } catch (e:any) {
    return NextResponse.json({ ok: false, error: "Invalid DATABASE_URL", details: String(e) }, { status: 500 });
  }
}
