import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { decodeToken } from "@lib/password";

const prisma = new PrismaClient

export async function GET() {

  const userToken = cookies().get('cookieUser')
  const userId = decodeToken(userToken.value)?.user
  console.log(userId)




  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      classroomUsers: true
    }
  })



  if (!user) {
    return NextResponse.json({ message: 'Usuario no encontrado.' }, { status: 404 });
  }

  return NextResponse.json(user)
}