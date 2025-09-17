import './globals.css';

export const metadata = {
  title: 'FormulePlus — Natural',
  description: 'Natuurlijke producten, eenvoudig online besteld. Veilig betalen via iDEAL en Apple Pay.',
  openGraph: {
    title: 'FormulePlus — Natural',
    description: 'Natuurlijke producten, eenvoudig online besteld.',
    images: ['/favicon.svg'],
  },
  icons: { icon: '/favicon.svg' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <header className="header">
          <div className="container headerInner">
            <div className="brand">
              <img src="/logo-formuleplus.png" alt="FormulePlus" />
              <div className="brandName">FormulePlus</div>
            </div>
            <nav className="nav" aria-label="Hoofdmenu">
              <a href="#shop">Shop</a>
              <a href="#over">Over</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="footer">
          <div className="container footerInner">
            <div>© {new Date().getFullYear()} FormulePlus</div>
            <div>Veilig betalen met Mollie (iDEAL, Apple Pay)</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
