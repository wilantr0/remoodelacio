import { conn } from '@/lib/database';
import { cookies } from 'next/headers';


export async function GET() {
  const query = conn ? await conn.query('SELECT NOW()') : {rows:"Error"}
  cookies().set('cookie1', 'amandaaa')

  return Response.json(query)
}
