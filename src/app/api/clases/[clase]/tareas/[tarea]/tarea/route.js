import { decodeToken } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const cookie = cookies().get("cookieUser");
  if (!cookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = decodeToken(cookie.value);

  const formData = await req.formData();
  const file = formData.get("file");
  const url = formData.get("url"); // Obtenemos la URL en caso de que se haya enviado

  // Validar si es archivo PDF o URL y gestionar en consecuencia
  if (!file && !url) {
    return NextResponse.json({ error: "No file or URL provided" }, { status: 400 });
  }

  try {
    // Verificar si ya existe una entrega con el mismo student_id y assignment_id
    const existingSubmission = await prisma.submission.findFirst({
      where: {
        student_id: userId.user,
        assignment_id: Number(params.tarea),
      },
    });

    if (existingSubmission) {
      return NextResponse.json(
        { error: "Submission already exists for this student and assignment" },
        { status: 400 }
      );
    }

    if (file) {
      // Si es un archivo PDF, convertirlo a base64 y guardarlo
      const fileBuffer = await file.arrayBuffer();
      const fileBase64 = Buffer.from(fileBuffer).toString("base64");

      await prisma.submission.create({
        data: {
          assignment_id: Number(params.tarea),
          student_id: userId.user,
          file_path: fileBase64,
          submitted_at: new Date(),
        },
      });
    } else if (url) {
      // Si es una URL, guardarla directamente
      await prisma.submission.create({
        data: {
          assignment_id: Number(params.tarea),
          student_id: userId.user,
          file_path: url,
          submitted_at: new Date(),
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  const submissionId = params.submissionId;

  try {
    const submission = await prisma.submission.findUnique({
      where: { id: Number(submissionId) },
    });

    if (!submission) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    if (submission.file_path && submission.file_path.startsWith("data:application/pdf;base64,")) {
      // Si `file_path` contiene un archivo PDF en base64, decodificarlo
      const fileBase64 = submission.file_path.replace("data:application/pdf;base64,", "");
      const fileBuffer = Buffer.from(fileBase64, "base64");

      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${submission.file_name || 'file.pdf'}"`,
        },
      });
    } else if (submission.file_path) {
      // Si `file_path` es una URL, redirigir
      return NextResponse.redirect(submission.file_path);
    } else {
      return NextResponse.json({ error: "No file or URL available" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
