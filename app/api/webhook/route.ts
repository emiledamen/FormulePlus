import { NextResponse } from 'next/server';

/**
 * Mollie stuurt een POST met form-encoded body: id=tr_xxx
 * Deze MVP logt alleen. In productie zou je hier je orderstatus bijwerken.
 */
export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let paymentId = '';

    if (contentType.includes('application/x-www-form-urlencoded')) {
      const text = await req.text();
      const params = new URLSearchParams(text);
      paymentId = params.get('id') || '';
    } else if (contentType.includes('application/json')) {
      const body = await req.json();
      paymentId = body?.id || '';
    } else {
      const text = await req.text();
      const params = new URLSearchParams(text);
      paymentId = params.get('id') || '';
    }

    console.log('[Mollie webhook] payment id:', paymentId);
    return new NextResponse('OK', { status: 200 });
  } catch (e: any) {
    console.error('[Mollie webhook] error', e);
    return new NextResponse('ERR', { status: 500 });
  }
}
