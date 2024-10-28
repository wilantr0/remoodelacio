import { Suspense } from 'react';
import UserServer from '@components/UserServer';

export default function Page() {
  return (
    <Suspense fallback={<div>Carregant...</div>}>
      <UserServer />
    </Suspense>
  );
}
