import { NextApiRequest, NextApiResponse } from "next";
import { conn } from '@/utils/database';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
      try {
        const response = await conn.query('SELECT * FROM classrooms');
        return res.json(response.rows)
      } catch (error) {
        return res.json(error)
      }
          }

export async function POST(req: NextApiRequest, res: NextApiResponse) {
      try {
        const { name, description, createdBy } = req.body;

        // Validación básica
        if (!name || !createdBy) {
          return res.status(400).json({ error: 'Name and createdBy are required' });
        }

        const query = `
          INSERT INTO classrooms (name, description, created_by)
          VALUES ($1, $2, $3)
          RETURNING *;
        `;
        const values = [name, description, createdBy];
        const response = await conn.query(query, values);

        res.status(201).json(response.rows[0]);
      } catch (error) {
        console.error('Error creating class:', error);
        res.status(500).json({ error: 'An error occurred while creating the class' });
      }

  }

