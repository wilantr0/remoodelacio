import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// GET handler to fetch attendance for a class
export async function GET(req, { params }) {
  const { clase } = params;

  try {
    const attendanceRecords = await prisma.attendance.findMany({
      where: {
        classId: parseInt(clase),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true, // Selecciona los campos que necesites del usuario
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(attendanceRecords);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    return NextResponse.json({ error: "Error fetching attendance records" }, { status: 500 });
  }
}

// POST handler to save attendance for a class
export async function POST(req, { params }) {
  const { clase } = params;
  const attendanceData = await req.json(); // Expecting an array of attendance objects

  try {
    const updatedAttendance = await Promise.all(
      attendanceData.map(async (record) => {
        return prisma.attendance.upsert({
          where: {
            userId_classId: {
              userId: record.userId,
              classId: parseInt(clase),
            },
          },
          update: {
            status: record.status,
            observation: record.observation,
          },
          create: {
            userId: record.userId,
            classId: parseInt(clase),
            status: record.status,
            observation: record.observation,
            date: new Date(), // or use a provided date if needed
          },
        });
      })
    );

    return NextResponse.json({ success: true, data: updatedAttendance });
  } catch (error) {
    console.error("Error updating attendance:", error);
    return NextResponse.json({ error: "Error updating attendance" }, { status: 500 });
  }
}
