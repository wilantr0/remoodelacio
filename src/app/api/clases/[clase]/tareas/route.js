import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(req) {
  const token = cookies().get("cookieUser")?.value;

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  try {
    // Verificamos el token para obtener el ID del usuario
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken?.user;

    const { clase } = req.nextUrl.searchParams;

    // Buscar tareas en la clase
    const tasks = await prisma.task.findMany({
      where: {
        classroomId: parseInt(clase),
        created_by_id: userId
      },
      include: {
        classroom: true,
        created_by: true
      }
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Token inválido o error al obtener tareas" }, { status: 403 });
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

    const { clase } = req.nextUrl.searchParams;
    const body = await req.json();
    const { name, description } = body;

    // Crear una nueva tarea
    const newTask = await prisma.task.create({
      data: {
        name: name,
        description: description,
        classroomId: parseInt(clase),
        created_by_id: userId
      }
    });

    return NextResponse.json(newTask)
  }

    catch(e){
      return NextResponse.json({ error: "Error al crear la tarea" }, { status: 500 });
    }
  }