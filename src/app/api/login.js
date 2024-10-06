import { authenticateUser } from '../../lib/auth';
import db from '../../lib/db'; // Supongo que ya tienes una conexión a la BD en este archivo.

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const token = await authenticateUser(username, password, db);

      // Establecer la cookie con el token
      res.setHeader('Set-Cookie', `authToken=${token}; HttpOnly; Path=/; Max-Age=3600`);

      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
