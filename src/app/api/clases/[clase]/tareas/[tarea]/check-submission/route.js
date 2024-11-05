import {prisma} from "@/lib/prisma"; // Asegúrate de ajustar el path de tu instancia de Prisma
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
  try {
    // Obtener los parámetros de la solicitud desde la URL
    const clase = params.clase
    const tarea = params.tarea


    // Validar que los parámetros son números
    if (!clase || !tarea || isNaN(clase) || isNaN(tarea)) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    // Consultar en la base de datos si ya existe una entrega para esta tarea y usuario
    const submission = await prisma.submission.findFirst({
      where: {
        assignment_id: parseInt(tarea),
      },
    });

    // Si existe una entrega, retornar true, si no, false
    const hasSubmitted = Boolean(submission);

    return NextResponse.json({ hasSubmitted });
  } catch (error) {
    console.error("Error checking submission:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
