import { NextApiRequest, NextApiResponse } from "next";
import { conn } from '@/utils/database';
import ShortUniqueId from 'short-unique-id'


export default async function Queries (req: NextApiRequest, res: NextApiResponse) {
  const {method, body} = req
  const uid = new ShortUniqueId({length: 10})
  switch (method) {
    case "GET":
      try {
        const response = await conn.query('SELECT * FROM assignments')
        res.status(200).json(response.rows);
      } catch (error) {
        res.json(error);
      }
      
      break;
    case "POST":
      console.log(body)
      const { name, description, classId, teacher } = body
      const id = uid.rnd()
      const createdAt = new Date()
      const updatedAt = createdAt 
      const query = 'INSERT INTO assignments(id, name, description, classId, teacher, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, $6, $7);'
      const values = [id, name, description, classId, teacher, createdAt, updatedAt]
      conn.query(query, values)
      res.status(200).json("CREATING task");
      break;
    default:
      res.json("ERROR");
      break;
  }
};
