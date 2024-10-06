import { conn } from '@/lib/database';

export async function GET() {
  const query = await conn.query('SELECT NOW()')

  return Response.json(query.rows)
}
