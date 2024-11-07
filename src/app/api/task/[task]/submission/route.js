// app/api/assignment/[assignment_id]/submission/route.js
import { prisma } from "@/lib/prisma";
import { bucket } from "@/lib/mongodb";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const studentId = formData.get("studentId");

    if (!file || !studentId) {
      return NextResponse.json({ error: "File or studentId is missing" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${uuidv4()}-${file.name}`;
    const uploadStream = bucket.openUploadStream(filename);

    return new Promise((resolve, reject) => {
      uploadStream.on("finish", async (result) => {
        try {
          const submission = await prisma.submission.create({
            data: {
              assignment_id: Number(params.assignment_id),
              student_id: studentId,
              file_path: `/api/assignment/${params.assignment_id}/submission/download/${result._id}`,
            },
          });
          resolve(NextResponse.json(submission, { status: 201 }));
        } catch (dbError) {
          console.error("Error saving submission to DB:", dbError);
          reject(NextResponse.json({ error: "Error saving submission to DB" }, { status: 500 }));
        }
      });

      uploadStream.on("error", (err) => {
        console.error("Error uploading to GridFS:", err);
        reject(NextResponse.json({ error: "Error uploading file" }, { status: 500 }));
      });

      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Ruta para descargar el archivo desde MongoDB GridFS
export async function GET(req, { params }) {
  const { fileId } = params;

  try {
    const downloadStream = bucket.openDownloadStream(fileId);

    return new NextResponse(downloadStream, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${fileId}"`,
      },
    });
  } catch (error) {
    console.error("Error downloading file:", error);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}