// app/api/classroom/[classroom_id]/assignment/[assignment_id]/submission/route.js
import { decodeToken } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const cookie = cookies().get("cookieUser");
  if (!cookie) {
    return NextResponse.error();
  }
const userId = decodeToken(cookie.value)

  const formData = await req.formData();
  const file = formData.get("file");

  // Procesa y guarda el archivo (dependiendo de tu configuración de almacenamiento)
  const filePath = `/uploads/${file.name}`;

  try {
    await prisma.submission.create({
      data: {
        assignment_id: Number(params.tarea),
        student_id: userId.user, // Obtén el ID del estudiante de la sesión
        file_path: filePath,
        submitted_at: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
