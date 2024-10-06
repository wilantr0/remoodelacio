import jwt from 'jsonwebtoken';
import cookies from 'next-cookies';

const secretKey = process.env.JWT_SECRET || 'mysecretkey';

export function requireAuth(ctx) {
  const { authToken } = cookies(ctx);

  if (!authToken) {
    throw new Error('Not authenticated');
  }

  try {
    const decoded = jwt.verify(authToken, secretKey);
    return decoded; // Retorna la información decodificada del usuario
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}
