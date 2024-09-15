import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler (req, res) {
  if (req.method === 'POST') {
    try {
      const { name, description, createdBy } = req.body

      // Validar los campos requeridos
      if (!name || !createdBy) {
        return res.status(400).json({ error: 'Name and createdBy are required' })
      }

      // Crear la clase en la base de datos
      const classroom = await prisma.classroom.create({
        data: {
          name,
          description,
          createdBy
        }
      })

      // Responder con la clase creada
      return res.status(201).json(classroom)
    } catch (error) {
      console.error('Error creating classroom:', error)
      return res.status(500).json({ error: 'An error occurred while creating the classroom' })
    }
  } else {
    // Manejar otros métodos HTTP no soportados
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: `Method ${req.method} not allowed` })
  }
}
