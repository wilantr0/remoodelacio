import 'bootstrap/dist/css/bootstrap.css'
import NavBar from '@/components/LoggedNavBar'
import type { Metadata } from 'next'

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

      <body className='bg-orange-300'>
        <NavBar />
        <main>
          {children}
        </main>
      </body>

  )
}