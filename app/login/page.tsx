'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      setStatus('sending');
      setMessage('');
      const res = await signIn('email', {
        email,
        redirect: false,
        // Pas eventueel aan, bijvoorbeeld naar /admin/artikelen
        callbackUrl: '/',
      });
      if (res?.ok) {
        setStatus('sent');
        setMessage('Check je e-mail voor de inloglink.');
      } else {
        setStatus('error');
        setMessage('Kon geen e-mail versturen. Probeer het later opnieuw.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage('Er ging iets mis. Probeer het later opnieuw.');
    }
  }

  return (
    <main style={styles.main}>
      <section style={styles.card}>
        <h1 style={styles.h1}>Inloggen</h1>
        <p style={styles.p}>
          Vul je e-mailadres in en ontvang een <strong>magic link</strong> om in te loggen.
        </p>

        <form onSubmit={onSubmit} style={styles.form}>
          <label htmlFor="email" style={styles.label}>E-mailadres</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jij@voorbeeld.nl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            disabled={status === 'sending'}
          />

          <button type="submit" style={styles.button} disabled={status === 'sending'}>
            {status === 'sending' ? 'Versturen…' : 'Stuur inloglink'}
          </button>
        </form>

        {message ? <p style={styles.message}>{message}</p> : null}
        {status === 'sent' ? (
          <p style={styles.small}>
            Geen mail ontvangen? Controleer je spamfolder of probeer het later opnieuw.
          </p>
        ) : null}
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    background: 'transparent',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    background: 'white',
    border: '1px solid rgba(0,0,0,0.08)',
    borderRadius: 12,
    padding: 24,
    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
  },
  h1: {
    margin: '0 0 8px 0',
    fontSize: 24,
    lineHeight: 1.2,
  },
  p: {
    margin: '0 0 16px 0',
    color: '#666',
  },
  form: {
    display: 'grid',
    gap: 12,
    marginTop: 8,
  },
  label: {
    fontSize: 13,
    color: '#333',
  },
  input: {
    appearance: 'none',
    width: '100%',
    height: 44,
    padding: '0 12px',
    borderRadius: 8,
    border: '1px solid #e5e7eb',
    outline: 'none',
  },
  button: {
    height: 44,
    border: '1px solid #111',
    background: '#111',
    color: '#fff',
    borderRadius: 8,
    cursor: 'pointer',
  },
  message: {
    marginTop: 12,
    color: '#111',
  },
  small: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
};
