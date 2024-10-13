import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

export async function GET(req, context) {
  const id = context.params.user

  console.log(id)

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return NextResponse.json({ message: 'Usuario no encontrado.' }, { status: 404 });
  }

  return NextResponse.json(user)
}