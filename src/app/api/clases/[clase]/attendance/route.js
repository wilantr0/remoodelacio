import { prisma } from "@/lib/prisma";

/**
 * Endpoint POST: Guarda asistencias de una clase.
 * Ruta: /api/clases/[classroom_id]/attendance
 */
export async function POST(req, { params }) {
  const { classroom_id } = params;
  const body = await req.json();

  try {
    // Validamos que la clase exista
    const classroom = await prisma.classroom.findUnique({
      where: { classroom_id },
    });

    if (!classroom) {
      return new Response(JSON.stringify({ error: "Clase no encontrada" }), {
        status: 404,
      });
    }

    // Formateamos y guardamos asistencias
    const asistencias = Object.entries(body).map(([userId, estado]) => ({
      classroom_id,
      status: estado,
      userId,
      date: new Date(),
    }));

    await prisma.attendance.createMany({
      data: asistencias,
    });

    return new Response(JSON.stringify({ message: "Asistencia guardada" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error guardando asistencia:", error);
    return new Response(
      JSON.stringify({ error: "Error al guardar asistencia" }),
      { status: 500 }
    );
  }
}
