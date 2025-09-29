// app/api/test-email/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

/**
 * GET /api/test-email?to=you@example.com
 * Sends a simple test email via Resend to verify env vars and domain.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const to = url.searchParams.get('to');

  if (!to) {
    return NextResponse.json({ error: "Missing 'to' query param" }, { status: 400 });
  }
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing RESEND_API_KEY env var" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const from = process.env.EMAIL_FROM || 'onboarding@resend.dev'; // dev-friendly default

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject: 'FormulePlus — Resend test',
      html: `<p>Dit is een testmail vanaf FormulePlus via Resend.<br/>Als je dit ontvangt, werken je env vars.</p>`,
    });
    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json({ ok: true, data });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unknown error' }, { status: 500 });
  }
}
