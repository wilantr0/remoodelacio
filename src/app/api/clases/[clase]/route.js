import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';



const prisma = new PrismaClient();

export async function GET(req, context) {
  const classroomId = context.params.clase
  console.log(classroomId)

  try {

    // Buscar clases en las que el usuario es profesor o estudiante
    const classData = await prisma.classroom.findUnique({
      where: {
        classroom_id: parseInt(classroomId)
      }
    });

    return NextResponse.json(classData);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Token inválido o error al obtener clases" }, { status: 403 });
  }
}

export async function POST(req) {
  const {title, description, due_date} = await req.json()
  try {

    // Buscar clases en las que el usuario es profesor o estudiante
    const assignaments = await prisma.assignment.create(
      {
        data:{
          title,
          description,
          due_date,
        }
      }
    )

    return NextResponse.json(assignaments);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Token inválido o error al obtener clases" }, { status: 403 });
  }
}

export async function PUT(req){
  const token = cookies().get("cookieUser")?.value;

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken?.user;
  const { id } = req.json()

  const joinClass = await prisma.classroomUser.create(
    
    {
      data:{
        classroom_id: id,
        userId: userId,
        role:'student'
      }
    }
  )

  return NextResponse.json(joinClass)

  
}