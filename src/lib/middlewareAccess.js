import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation'

export default function Access() {const cookieStore = cookies();
  const token = cookieStore.get('cookieUser')?.value;

  if (!token) {
    redirect('login')
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return decoded
}