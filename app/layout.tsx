import './globals.css';

export const metadata = {
  title: 'FormulePlus — Natural',
  description: 'Natuurlijke producten, eenvoudig online bestellen'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <div className="container">
          <header className="header">
            <div className="brand">
              <img src="/logo-formuleplus.png" alt="FormulePlus" />
              <div className="name">FormulePlus</div>
            </div>
            <div className="badge">MVP • Mollie</div>
          </header>
          {children}
          <footer>© {new Date().getFullYear()} FormulePlus — Betaalprovider: Mollie</footer>
        </div>
      </body>
    </html>
  );
}
