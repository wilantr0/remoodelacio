import jwt from 'jsonwebtoken'

export default function handler (req, res) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Autorización requerida' })
  }

  try {
    const token = authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    res.status(200).json({ message: 'Acceso autorizado', user: decoded })
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' })
  }
}
