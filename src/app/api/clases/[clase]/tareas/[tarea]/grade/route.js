import {prisma} from '@/lib/prisma'

export async function GET(req, { params }) {
  const { tarea } = params;
  console.log(tarea)
  try {
    // Obtiene la tarea y sus entregas
    const grade = await prisma.grade.findMany({
      where: { assignment_id: Number(tarea)},
      include:{
        assignment: true,
        student: true
      }
    });

    
    return new Response(JSON.stringify(grade), { status: 200 });
  } catch (error) {
    console.error("Error fetching assignment:", error);
    return new Response("Error fetching assignment", { status: 500 });
  }
}

export async function POST(req, { params }) {
  const { tarea } = params;
  const {studentId, grade} = await req.json()

  try {
    // Obtiene la tarea y sus entregas
    const newGrade = await prisma.grade.create({
      data: {
        assignment_id: Number(tarea),
        student_id: studentId,
        grade: Number(grade)
      },
    });

    return new Response(JSON.stringify(newGrade), { status: 200 });
  } catch (error) {
    console.error("Error fetching assignment:", error);
    return new Response("Error fetching assignment", { status: 500 });
  }

}