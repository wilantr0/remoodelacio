import 'bootstrap/dist/css/bootstrap.css';
import LoggedNavBar from '@/components/LoggedNavBar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Remoodelacio',
    default: 'Remoodelacio',
  },
};

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
        <LoggedNavBar />
        <main>{children}</main>

    </div>

  );
}
