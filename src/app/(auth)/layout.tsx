import '@/app/globals.css'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>{children}</main>
  )
}