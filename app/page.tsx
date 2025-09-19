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
        <div className="heroOverlay">
          <div className="container heroInner">
            <div>
              <div className="kicker">NATURAL • FORMULEPLUS</div>
              <h1 className="h1">Natuurlijk goed. Eenvoudig besteld.</h1>
              <p className="lead">Eerlijke ingrediënten, heldere informatie en snelle levering — veilig betalen via iDEAL.</p>
              <div className="cta">
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
            </div>
          </div>
        </div>
      </section>

      
      <section id="shop" className="container section">
        <h2 style={{margin:'0 0 12px 0',color:'var(--brand-ink)'}}>Shop</h2>
        <div className="shopScroller">
          <div className="shopTrack">
            {(function(){
              // herhaal producten zodat we ~6+ kaarten hebben voor een vloeiende loop
              const items = others.length ? others : [];
              const repeat = Math.max(2, Math.ceil(6 / Math.max(1, items.length)));
              const looped: typeof items = Array.from({length: repeat}, () => items).flat();
              return looped.map((p, idx) => (
                <div key={p.id + '-' + idx} className="card productCard">
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
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
              ));
            })()}
          </div>
        </div>
      </section>


      <section id="over" className="container section" style={{paddingTop:0}}>
        <h2 style={{margin:'0 0 6px 0',color:'var(--brand-ink)'}}>Over FormulePlus</h2>
        <p style={{color:'var(--muted)'}}>Wij geloven in natuurlijke formules en duidelijke communicatie. Geen gedoe, wel kwaliteit.</p>
      </section>

      <section id="contact" className="container section" style={{paddingTop:0}}>
        <h2 style={{margin:'0 0 6px 0',color:'var(--brand-ink)'}}>Contact</h2>
        <p style={{color:'var(--muted)'}}>Vragen? Mail ons: <a href="mailto:info@formuleplus.nl">info@formuleplus.nl</a></p>
      </section>
    </main>
  );
}
