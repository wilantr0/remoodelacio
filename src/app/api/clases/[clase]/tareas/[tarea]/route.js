// app/api/classroom/[classroom_id]/assignment/[assignment_id]/route.js

import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  const { tarea } = params;

  try {
    // Obtiene la tarea y sus entregas
    const assignment = await prisma.assignment.findUnique({
      where: { assignment_id: Number(tarea) },
      include: {
        submissions: {
          include: {
            student: {
              select: { name: true, email: true, image: true },
            },
          },
        },
      },
    });

    if (!assignment) {
      return new Response("Assignment not found", { status: 404 });
    }

    return new Response(JSON.stringify(assignment), { status: 200 });
  } catch (error) {
    console.error("Error fetching assignment:", error);
    return new Response("Error fetching assignment", { status: 500 });
  }
}

export async function POST(req, { params }) {
  const { tarea } = params;

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    // Verifica que el archivo se haya subido
    if (!file) {
      return new Response("No file provided", { status: 400 });
    }

    // Ruta de archivo (simulación de almacenamiento)
    const filePath = `/uploads/${file.name}`;

    // Almacena el archivo en la base de datos
    const submission = await prisma.submission.create({
      data: {
        assignment_id: Number(tarea),
        student_id: "student_id_placeholder", // Reemplaza con el ID del estudiante
        file_path: filePath,
      },
    });

    return new Response(JSON.stringify(submission), { status: 201 });
  } catch (error) {
    console.error("Error submitting assignment:", error);
    return new Response("Error submitting assignment", { status: 500 });
  }
}
