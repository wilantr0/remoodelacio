import { NextApiRequest, NextApiResponse } from "next";
import { conn } from '@/utils/database';

export default async function Queries (req: NextApiRequest, res: NextApiResponse) {

  const {method, query} = req;
  console.log(query)
  const classId = Number(query.class)
  switch (method) {
    case "GET":
      try {
        console.log()
        const queryText = {
          text: 'SELECT * FROM classrooms WHERE classroom_id = $1',
          values: [classId]
        }
        const response = await conn.query(queryText)
        console.log(response)
        res.status(200).json(response.rows[0]);
        return response.rows
      } catch (error) {
        res.json(error);
      }
      res.json(query)
      break;
    case "POST":
      
      break;
    default:
      res.json("ERROR");
      break;
  }
};
