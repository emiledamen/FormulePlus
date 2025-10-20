export const dynamic = 'force-static';

export default function MaintenancePage() {
  return (
    <main style={styles.main}>
      <section style={styles.card}>
        <h1 style={styles.h1}>We zijn zo terug</h1>
        <p style={styles.p}>
          FormulePlus is tijdelijk in onderhoud. Probeer het later nog eens.
        </p>
        <p style={styles.small}>
          Heb je toegang nodig? <a href="/login" style={styles.link}>log in</a> of ga naar je <a href="/admin/artikelen" style={styles.link}>admin</a>.
        </p>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  card: {
    maxWidth: 560,
    width: '100%',
    background: 'white',
    border: '1px solid rgba(0,0,0,0.06)',
    borderRadius: 16,
    padding: 24,
    boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
    textAlign: 'center',
  },
  h1: { margin: '0 0 8px 0', fontSize: 28, lineHeight: 1.2 },
  p: { margin: '0 0 12px 0', color: '#555' },
  small: { margin: 0, color: '#666', fontSize: 13 },
  link: { color: '#0f172a', textDecoration: 'underline' },
};
