import { NextResponse } from 'next/server';
import products from '../../../data/products.json';
import { createPayment } from '../../../lib/mollie';

export async function GET() {
  return NextResponse.json(
    { ok: false, hint: 'Gebruik POST naar /api/checkout met { productId } in de body.' },
    { status: 405 }
  );
}

export async function POST(req: Request) {
  try {
    const { productId } = await req.json();
    const product = (products as any[]).find((p) => p.id === productId && p.inStock);
    if (!product) {
      return new NextResponse('Product niet gevonden of uitverkocht', { status: 400 });
    }

    const appUrl = process.env.APP_URL || 'http://localhost:3000';
    const apiKeySet = !!process.env.MOLLIE_API_KEY;
    if (!apiKeySet) {
      return new NextResponse('Server-melding: MOLLIE_API_KEY ontbreekt. Zet je test_... key in Vercel → Env Vars.', { status: 500 });
    }

    const description = `Bestelling: ${product.name}`;
    const amountValue = product.price.toFixed(2);
    const currency = product.currency || 'EUR';
    const redirectUrl = `${appUrl}/success`; // Mollie voegt ?id=tr_xxx toe
    const webhookUrl = `${appUrl}/api/webhook`;

    const payment = await createPayment({
      amountValue,
      currency,
      description,
      redirectUrl,
      webhookUrl,
      metadata: { productId: product.id, name: product.name, price: amountValue }
    });

    const checkoutUrl = payment?._links?.checkout?.href;
    if (!checkoutUrl) {
      return new NextResponse('Geen checkoutUrl ontvangen van Mollie', { status: 500 });
    }

    return NextResponse.json({ checkoutUrl });
  } catch (err: any) {
    console.error(err);
    return new NextResponse(err?.message || 'Interne fout', { status: 500 });
  }
}
