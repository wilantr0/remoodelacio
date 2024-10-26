import { cookies } from 'next/headers';
import { decodeToken } from '@/lib/password';
import UserProfile from '@components/UserProfile';

async function getUserData() {
  const cookieStore = cookies();
  const token = cookieStore.get('cookieUser')?.value;
  const userId = decodeToken(token);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId.user}`);
  const data = await res.json();

  return data;
}

export default async function UserServer() {
  const user = await getUserData();
  return <UserProfile user={user} />;
}
