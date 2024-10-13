import 'bootstrap/dist/css/bootstrap.css'
import LoggedNavBar from '@/components/LoggedNavBar'
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

      <body className=''>
        <LoggedNavBar />
        
          {children}
        
      </body>

  )
}