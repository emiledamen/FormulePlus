'use client';

import { useEffect, useState } from 'react';

export default function SuccessPage() {
  const [paymentId, setPaymentId] = useState<string | null>(null);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const id = p.get('id'); // Mollie voegt ?id=tr_xxx toe aan redirectUrl
    if (id) setPaymentId(id);
  }, []);

  return (
    <main>
      <h2>Bedankt voor je bestelling!</h2>
      <p>We hebben je betaling ontvangen. Je krijgt zo een bevestiging per e‑mail via Mollie.</p>
      {paymentId && (
        <p style={{ color: '#555' }}>Betalingsreferentie: <code>{paymentId}</code></p>
      )}
      <p>Je ontvangt een verzendbevestiging met tracking zodra je pakketje onderweg is.</p>
    </main>
  );
}
