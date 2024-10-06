import { NextApiRequest, NextApiResponse } from "next";
import { conn } from '@/utils/database';

export default async function Queries(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        const queryText = {
          text: 'SELECT * FROM users WHERE id = $1',
          values: [query.user],
        };
        
        // Realizar la consulta
        const response = await conn.query(queryText);
        console.log(response)

        // Verificar si se encontró algún usuario
        if (response.rows.length === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Enviar la respuesta
        return res.status(200).json(response.rows[0]);
      } catch (error) {
        // Manejar el error y enviar la respuesta
        console.error(error);
        return res.status(500).json({ error: "Error en el servidor" });
      }

    case "POST":
      // Lógica para el caso POST (aquí aún no haces nada)
      break;

    default:
      // Respuesta por defecto para métodos no permitidos
      return res.status(405).json({ message: "Método no permitido" });
  }
}
