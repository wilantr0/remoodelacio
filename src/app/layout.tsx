import 'bootstrap/dist/css/bootstrap.css'
import NavBar from '@/components/NavBar'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Remoodelacio',
    default: 'Remoodelacio', // a default is required when creating a template
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <NavBar />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}