import { prisma } from "@/lib/prisma";
import { decodeToken } from "@/lib/password";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { clase } = params;
  try {
    const grades = await prisma.grade.findMany({
      where: { assignment: { classroom_id: Number(clase) } },
      include: {
        assignment: true,
        student: true,
      },
    });
    return NextResponse.json(grades);
  } catch (error) {
    console.error("Error fetching grades:", error);
    return NextResponse.json({ error: "Error fetching grades" }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  const { tarea } = params;
  const cookie = cookies().get("cookieUser");
  if (!cookie) {
    return NextResponse.error();
  }
  const { studentId, grade } = await req.json();
  const userId = decodeToken(cookie.value);

  try {
    const newGrade = await prisma.grade.create({
      data: {
        assignment_id: Number(tarea),
        student_id: studentId,
        grade: Number(grade),
        created_by: userId.user,
      },
    });
    return NextResponse.json(newGrade);
  } catch (error) {
    console.error("Error creating grade:", error);
    return NextResponse.json({ error: "Error creating grade" }, { status: 500 });
  }
}
