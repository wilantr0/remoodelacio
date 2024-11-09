// /app/api/clases/[clase]/materiales/route.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const materials = await prisma.classroomMaterial.findMany({
      where: { classroom_id: params.clase },
    });
    return NextResponse.json(materials, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error al obtener los materiales: ' + error.message }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  const body = await req.json();
  const { name, description, url } = body;

  if (!name || !url) {
    return NextResponse.json({ message: 'Nombre y URL son requeridos.' }, { status: 400 });
  }

  try {
    const newMaterial = await prisma.classroomMaterial.create({
      data: {
        title: name,
        description,
        url,
        classroom_id: params.clase,
      },
    });
    return NextResponse.json(newMaterial, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error al crear el material: ' + error.message }, { status: 500 });
  }
}
