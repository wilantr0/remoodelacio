// app/api/assignment/[assignment_id]/route.js
import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const assignment = await prisma.assignment.findUnique({
      where: { assignment_id: Number(params.assignment_id) },
      include: {
        submissions: true, // Incluye los envíos de los estudiantes
        grades: true, // Incluye las calificaciones si existen
      },
    });
    if (!assignment) {
      return new Response("Assignment not found", { status: 404 });
    }
    return new Response(JSON.stringify(assignment), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
