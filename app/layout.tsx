import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Script Builder | ????????? ????',
  description: 'Bash, Python, Node.js script generator (Hindi UI)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <body>
        <div className="container">
          <header className="header">
            <h1>????????? ??????</h1>
            <p className="subtitle">Bash ? Python ? Node.js</p>
          </header>
          <main>{children}</main>
          <footer className="footer">? {new Date().getFullYear()} Script Builder</footer>
        </div>
      </body>
    </html>
  );
}
