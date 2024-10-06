import { NextApiRequest, NextApiResponse } from "next";
import { conn } from '@/utils/database';
import ShortUniqueId from 'short-unique-id'


export default async function Queries (req: NextApiRequest, res: NextApiResponse) {
  const {method, body} = req
  const uid = new ShortUniqueId({length:10})
  switch (method) {
    case "GET":
      try {
        const response = await conn.query('SELECT * FROM users')
        res.status(200).json(response.rows);
      } catch (error) {
        res.json(error);
      }
      
      break;
    case "POST":
      console.log(body)
      const { name, email, password, role } = body
      const id = uid.rnd()

      const query = 'INSERT INTO users(id, name, email, password, role) VALUES ($1, $2, $3, $4, $5);'
      const values = [id, name, email, password, role]
      conn.query(query, values)
      res.status(200).json("CREATING user");
      break;
    default:
      res.json("ERROR");
      break;
  }
};
