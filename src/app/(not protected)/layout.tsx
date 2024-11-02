import NavBar from '@components/NavBar'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Remoodelacio',
    default: 'Remoodelacio',
  },
};

export default function NotProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <>
      <NavBar />
      <main>{children}</main>
      <div className='absolute bottom-0'>
        
      </div>
    </>


  );
}
