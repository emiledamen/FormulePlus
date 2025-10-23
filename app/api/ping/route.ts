import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    ok: true,
    ts: '2025-09-17T08:12:21.224943Z',
    env: {
      APP_URL_set: !!process.env.APP_URL,
      MOLLIE_API_KEY_set: !!process.env.MOLLIE_API_KEY
    }
  });
}
