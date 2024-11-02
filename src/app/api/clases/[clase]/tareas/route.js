// /app/api/clases/[clase]/tareas/route.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const assignments = await prisma.assignment.findMany({
      where: { classroom_id: parseInt(params.clase) },
    });
    return NextResponse.json(assignments, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error al obtener las tareas: ' + error.message }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  const body = await req.json();
  const { name, description, dueDate } = body;

  if (!name || !description) {
    return NextResponse.json({ message: 'Todos los campos son requeridos.' }, { status: 400 });
  }

  try {
    const newAssignment = await prisma.assignment.create({
      data: {
        title: name,
        description,
        due_date: dueDate ? new Date(dueDate) : null,
        classroom_id: parseInt(params.clase),
      },
    });
    return NextResponse.json(newAssignment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error al crear la tarea: ' + error.message }, { status: 500 });
  }
}
