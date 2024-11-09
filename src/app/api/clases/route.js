import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import ShortUniqueId from "short-unique-id";

const { randomUUID } = new ShortUniqueId({ length: 7 });
const prisma = new PrismaClient();


export async function GET() {
  const token = cookies().get("cookieUser")?.value;

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  try {
    // Verificamos el token para obtener el ID del usuario
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken?.user;

    // Buscar clases en las que el usuario es profesor o estudiante
    const classes = await prisma.classroom.findMany({
      where: {
        OR: [
          { created_by_id: userId }, // Clases donde el usuario es el creador/profesor
          {
            users: { // Clases donde el usuario está inscrito como estudiante
              some: {
                userId: userId, // Referencia al id de la tabla intermedia ClassroomUser
              }
            }
          }
        ]
      },
      include: {
        created_by: true,  // Información del profesor/creador de la clase
        users: true        // Información de los usuarios (incluyendo estudiantes y profesores)
      }
    });

    return NextResponse.json(classes);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Token inválido o error al obtener clases" }, { status: 403 });
  }
}

export async function POST(req) {
  const token = cookies().get("cookieUser")?.value;

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  try {
    // Verificamos el token para obtener el ID del usuario
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken?.user;

    const body = await req.json();
    const { name, description } = body;

    // Crear una nueva clase
    const newClassroom = await prisma.classroom.create({
      data: {
        classroom_id: randomUUID(),
        name: name,
        description: description,
        created_by_id: userId  // El creador de la clase
      }
    });

    await prisma.classroomUser.create({
      data: {
        classroom_id: newClassroom.classroom_id,
        userId: userId,
        role: 'professor'
      }
    });


    return NextResponse.json(newClassroom);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error al crear la clase" }, { status: 500 });
  }
}

export async function DELETE(req) {
  const token = cookies().get("cookieUser")?.value;

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  try {
    // Verificamos el token para obtener el ID del usuario
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken?.user;

    const { id } = await req.json();

    // Verificar si el usuario es el creador de la clase
    const classroom = await prisma.classroom.findUnique({
      where: {
        id: id,
        created_by_id: userId
      }
    });

    if (!classroom) {
      return NextResponse.json({ error: "No tienes permiso para eliminar esta clase" }, { status: 403 });
    }

    // Eliminar la clase
    await prisma.classroom.delete({
      where: {
        id: id
      }
    });

    return NextResponse.json({ message: "Clase eliminada correctamente" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error al eliminar la clase" }, { status: 500 });
  }
}