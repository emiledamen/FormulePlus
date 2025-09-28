'use client';

import useSWR from 'swr';

type Image = { id?: string; url: string; alt?: string; sortIndex?: number };
type Product = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  priceCents: number;
  stock: number;
  sku?: string | null;
  status: 'DRAFT' | 'PUBLISHED';
  orderIndex: number;
  images: Image[];
  createdAt?: string;
};

const fetcher = (url: string) => fetch(url, { cache: 'no-store' }).then((r) => r.json());

export default function AdminArtikelenPage() {
  const { data, error, isLoading, mutate } = useSWR<Product[]>('/api/products', fetcher);

  return (
    <main style={styles.main}>
      <section style={styles.header}>
        <h1 style={styles.h1}>Artikelen</h1>
        <p style={styles.sub}>Read-only lijst (Stap 2) — geladen via /api/products, gesorteerd op <code>orderIndex</code>.</p>
      </section>

      {isLoading && <div style={styles.notice}>Laden…</div>}
      {error && <div style={{...styles.notice, color:'#b91c1c'}}>Fout bij laden.</div>}
      {!isLoading && !error && (
        data && data.length > 0 ? (
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Volgorde</th>
                  <th style={styles.th}>Naam</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Prijs</th>
                  <th style={styles.th}>Voorraad</th>
                  <th style={styles.th}>SKU</th>
                  <th style={styles.th}>Afbeelding</th>
                </tr>
              </thead>
              <tbody>
                {data.map((p) => (
                  <tr key={p.id} style={styles.tr}>
                    <td style={styles.tdMono}>{p.orderIndex}</td>
                    <td style={styles.td}><strong>{p.name}</strong><div style={styles.slug}>/{p.slug}</div></td>
                    <td style={styles.td}><span style={p.status === 'PUBLISHED' ? styles.badgeOk : styles.badgeDraft}>{p.status}</span></td>
                    <td style={styles.tdMono}>{(p.priceCents/100).toFixed(2).replace('.', ',')}</td>
                    <td style={styles.tdMono}>{p.stock}</td>
                    <td style={styles.tdMono}>{p.sku ?? '—'}</td>
                    <td style={styles.td}>
                      {p.images?.[0]?.url ? (
                        <img src={p.images[0].url} alt={p.images[0].alt ?? ''} style={styles.thumb} />
                      ) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={styles.empty}>
            <h2 style={{margin:'0 0 6px 0'}}>Nog geen artikelen</h2>
            <p style={{margin:0,color:'#666'}}>Voeg eerst artikelen toe (Stap 3) of seed de database.</p>
          </div>
        )
      )}
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: { padding: '24px', maxWidth: 1200, margin: '0 auto' },
  header: { marginBottom: 16 },
  h1: { margin: 0, fontSize: 24 },
  sub: { margin: '4px 0 0 0', color: '#666' },
  notice: { padding: '12px 14px', background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: 8, display: 'inline-block' },
  empty: { padding: 24, border: '1px dashed #e5e7eb', borderRadius: 12, background: '#fafafa' },
  tableWrap: { overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: 12 },
  table: { width: '100%', borderCollapse: 'separate', borderSpacing: 0 },
  th: { textAlign: 'left', fontWeight: 600, fontSize: 13, padding: '12px 10px', background: '#f8fafc', borderBottom: '1px solid #e5e7eb', whiteSpace: 'nowrap' },
  tr: { borderBottom: '1px solid #f1f5f9' },
  td: { padding: '12px 10px', verticalAlign: 'middle' },
  tdMono: { padding: '12px 10px', verticalAlign: 'middle', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' },
  slug: { color: '#94a3b8', fontSize: 12 },
  badgeOk: { background:'#eafff3', color:'#065f46', border:'1px solid #bbf7d0', fontSize:12, padding:'3px 6px', borderRadius:999 },
  badgeDraft: { background:'#fff7ed', color:'#9a3412', border:'1px solid #fed7aa', fontSize:12, padding:'3px 6px', borderRadius:999 },
  thumb: { width: 48, height: 48, objectFit: 'cover', borderRadius: 8, border: '1px solid #e5e7eb' },
};
