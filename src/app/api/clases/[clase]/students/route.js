// /app/api/clases/[clase]/students/route.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Obtener lista de estudiantes de una clase específica
export async function GET(req, { params }) {
  try {
    const students = await prisma.classroomUser.findMany({
      where: { classroom_id: parseInt(params.clase) },
      include: { user: true }, // Incluye datos del usuario si la relación existe
    });
    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error al obtener los estudiantes: ' + error.message }, { status: 500 });
  }
}

// Agregar un nuevo estudiante a una clase específica
export async function POST(req, { params }) {
  const body = await req.json();
  const { userId } = body;

  if (!userId) {
    return NextResponse.json({ message: 'El ID del usuario es requerido.' }, { status: 400 });
  }

  try {
    const newClassroomUser = await prisma.classroomUser.create({
      data: {
        user_id: parseInt(userId),
        classroom_id: parseInt(params.clase),
      },
    });
    return NextResponse.json(newClassroomUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error al agregar el estudiante a la clase: ' + error.message }, { status: 500 });
  }
}

// Actualizar el rol o información en la clase para un estudiante específico
export async function PUT(req) {
  const body = await req.json();
  const { classroomUserId, role } = body;

  if (!classroomUserId) {
    return NextResponse.json({ message: 'El ID de ClassroomUser es requerido.' }, { status: 400 });
  }

  try {
    const updatedClassroomUser = await prisma.classroomUser.update({
      where: { id: parseInt(classroomUserId) },
      data: {
        role: role || undefined, // Actualiza solo si el rol está presente
      },
    });
    return NextResponse.json(updatedClassroomUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error al actualizar el estudiante en la clase: ' + error.message }, { status: 500 });
  }
}

// Eliminar un estudiante de una clase específica
export async function DELETE(req) {
  const { classroomUserId } = await req.json();

  if (!classroomUserId) {
    return NextResponse.json({ message: 'El ID de ClassroomUser es requerido para eliminar.' }, { status: 400 });
  }

  try {
    await prisma.classroomUser.delete({
      where: { id: parseInt(classroomUserId) },
    });
    return NextResponse.json({ message: 'Estudiante eliminado correctamente de la clase.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error al eliminar el estudiante de la clase: ' + error.message }, { status: 500 });
  }
}
