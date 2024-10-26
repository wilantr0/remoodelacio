import NavBar from '@components/NavBar'

export default function NotProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <>
      <NavBar />
      <main>{children}</main>
    </>


  );
}
