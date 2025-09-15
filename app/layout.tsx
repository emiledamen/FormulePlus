export const metadata = {
  title: 'Mijn Winkel — Mollie Starter',
  description: 'Lichte shop met Mollie-betaling'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', margin: 0, padding: 0 }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: 24 }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h1 style={{ margin: 0 }}>Mijn Winkel</h1>
            <div style={{ opacity: 0.7, fontSize: 12 }}>MVP • Mollie</div>
          </header>
          {children}
          <footer style={{ marginTop: 48, paddingTop: 16, borderTop: '1px solid #eee', fontSize: 12, color: '#666' }}>
            © {new Date().getFullYear()} Mijn Winkel — Betaalprovider: Mollie
          </footer>
        </div>
      </body>
    </html>
  );
}
