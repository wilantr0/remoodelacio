import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

export async function GET() {

  const user = await prisma.user.findMany();

  if (!user) {
    return NextResponse.json({ message: 'Usuario no encontrado.' }, { status: 404 });
  }

  return NextResponse.json(user)
}