import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'mysecretkey';

export async function authenticateUser(username, password, db) {
  const user = await db.query('SELECT * FROM users WHERE username = $1', [username]);

  if (user.rowCount === 0) {
    throw new Error('User not found');
  }

  const validPassword = await bcrypt.compare(password, user.rows[0].password);

  if (!validPassword) {
    throw new Error('Invalid password');
  }

  // Crea el token JWT
  const token = jwt.sign(
    {
      userId: user.rows[0].id,
      username: user.rows[0].username,
    },
    secretKey,
    { expiresIn: '1h' }
  );

  return token;
}
