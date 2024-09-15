import { NextApiRequest, NextApiResponse } from "next";
import { conn } from '@/utils/database';

export default async function Queries (req: NextApiRequest, res: NextApiResponse) {

  const {method, query} = req;
  console.log(query)
  switch (method) {
    case "GET":
      try {
        const queryText = {
          text: 'SELECT * FROM tasks WHERE id = $1',
          values: [query.class]
        }
        const response = await conn.query(queryText)
        console.log(response)
        res.status(200).json(response.rows);
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
