const API_BASE = 'https://api.mollie.com/v2';

export async function createPayment({ amountValue, currency, description, redirectUrl, webhookUrl, metadata }) {
  const apiKey = process.env.MOLLIE_API_KEY;
  if (!apiKey) throw new Error('MOLLIE_API_KEY ontbreekt');

  const res = await fetch(`${API_BASE}/payments`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount: { currency, value: amountValue },
      description,
      redirectUrl,
      webhookUrl,
      metadata
      // Je kunt 'method' of 'locale' meegeven indien gewenst
    }),
    // Next.js runtime hint
    cache: 'no-store'
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Mollie error: ${res.status} ${txt}`);
  }
  return res.json();
}
