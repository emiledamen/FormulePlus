'use client';

import { useEffect, useState } from 'react';

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

  useEffect(() => {
    fetch('/products.json')
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  const featured = products.find(p => p.inStock) || null;
  const others = products.filter(p => !featured || p.id !== featured.id);

  return (
    <main>
      <section className="hero">
        <div className="heroCard">
          <div className="kicker">NATURAL • FORMULEPLUS</div>
          <h1 className="h1">Natuurlijke producten, eenvoudig besteld</h1>
          <p className="lead">
            Eerlijke ingrediënten, heldere informatie en snelle levering. Betaal veilig via iDEAL.
          </p>
          <div className="ctaRow">
            <a className="btn btnGhost" href="#shop">Bekijk assortiment</a>
            <button
              className="btn btnPrimary"
              onClick={async () => {
                const first = products.find(p => p.inStock);
                if (!first) return;
                try {
                  setLoading(first.id);
                  await createCheckout(first.id);
                } catch (e: any) {
                  alert(e.message);
                } finally {
                  setLoading(null);
                }
              }}
              disabled={!featured || loading === featured?.id}
            >
              {featured ? (loading === featured.id ? 'Bezig…' : `Snel bestellen: ${featured.name}`) : 'Momenteel uitverkocht'}
            </button>
          </div>
          <div className="meta">
            <div>• iDEAL, Apple Pay</div>
            <div>• 1–2 werkdagen</div>
            <div>• NL/BE</div>
          </div>
        </div>
        <div>
          <img src="/logo-formuleplus.png" alt="FormulePlus logo" style={{width:'100%',maxWidth:460,display:'block',margin:'0 auto'}} />
        </div>
      </section>

      <section id="shop" style={{marginTop:24}}>
        <div className="cardGrid">
          {others.map((p) => (
            <div key={p.id} className="card">
              <h3>{p.name}</h3>
              <p className="lead" style={{margin:'6px 0'}}>{p.description}</p>
              <div className="price">€ {p.price.toFixed(2)}</div>
              <button
                className="buy"
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
              >
                {p.inStock ? (loading === p.id ? 'Bezig…' : 'Koop nu') : 'Uitverkocht'}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
