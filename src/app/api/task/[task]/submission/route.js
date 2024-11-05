// app/api/assignment/[assignment_id]/submission/route.js
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req, { params }) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const studentId = formData.get("studentId");

    if (!file || !studentId) {
      return new Response("File or studentId is missing", { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${uuidv4()}-${file.name}`;
    const filePath = path.join(process.cwd(),"public", "uploads", filename);
    
    await writeFile(filePath, buffer);

    const submission = await prisma.submission.create({
      data: {
        assignment_id: Number(params.assignment_id),
        student_id: studentId,
        file_path: `/uploads/${filename}`,
      },
    });

    return new Response(JSON.stringify(submission), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
