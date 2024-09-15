import { NextApiResponse, NextApiRequest } from 'next';
import { conn } from '@/utils/database';

export default async function idDB (req: NextApiRequest, res: NextApiResponse) {

  const query = await conn.query('SELECT NOW()')

  return res.json(query)
}
