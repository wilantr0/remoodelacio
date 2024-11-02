import 'bootstrap/dist/css/bootstrap.css';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Remoodelacio',
    default: 'Remoodelacio',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <main>{children}</main>

      </body>
    </html>
  );
}
