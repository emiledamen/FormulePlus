'use client';

import { useState } from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  inStock: boolean;
};

async function createCheckout(productId: string) {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId })
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || 'Kon betaling niet starten');
  }
  const data = await res.json();
  if (data.checkoutUrl) {
    window.location.href = data.checkoutUrl;
  } else {
    throw new Error('Geen checkoutUrl ontvangen');
  }
}

export default function Home() {
  const [loading, setLoading] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  // Lazy load products.json to keep this simple
  if (products.length === 0) {
    fetch('/products.json')
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => setProducts([]));
  }

  return (
    <main>
      <p style={{ color: '#555' }}>Kies een product en betaal veilig via Mollie (iDEAL, etc.).</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        {products.map((p) => (
          <div key={p.id} style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
            <h3 style={{ marginTop: 0 }}>{p.name}</h3>
            <p style={{ margin: '8px 0', color: '#555' }}>{p.description}</p>
            <div style={{ fontWeight: 600, marginBottom: 12 }}>
              € {p.price.toFixed(2)}
            </div>
            <button
              onClick={async () => {
                try {
                  setLoading(p.id);
                  await createCheckout(p.id);
                } catch (e: any) {
                  alert(e.message);
                } finally {
                  setLoading(null);
                }
              }}
              disabled={!p.inStock || loading === p.id}
              style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ddd', background: p.inStock ? '#111' : '#ccc', color: '#fff', cursor: p.inStock ? 'pointer' : 'not-allowed' }}
            >
              {p.inStock ? (loading === p.id ? 'Bezig...' : 'Koop nu') : 'Uitverkocht'}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
