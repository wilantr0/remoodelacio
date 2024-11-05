// app/api/assignment/[assignment_id]/submission/[submission_id]/route.js
import { prisma } from "@/lib/prisma";

export async function PUT(req, { params }) {
  try {
    const { grade, feedback } = await req.json();

    const updatedSubmission = await prisma.submission.update({
      where: { submission_id: Number(params.submission_id) },
      data: {
        grade,
        feedback,
      },
    });

    return new Response(JSON.stringify(updatedSubmission), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
