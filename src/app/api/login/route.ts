import { conn } from '@/lib/database';

export async function GET() {
  const query = conn ? await conn.query('SELECT NOW()') : {rows:"Error"}

  return Response.json(query.rows)
}
