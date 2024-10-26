import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { promises as fs } from 'fs-extra';
import path from 'path';

const prisma = new PrismaClient();

export async function GET(req, context) {
  const id = context.params.user;

  console.log(id);

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return NextResponse.json({ message: 'Usuario no encontrado.' }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(req, context) {
  const id = context.params.user;
  const formData = await req.formData();
  
  const name = formData.get("name");
  const email = formData.get("email");
  const imageFile = formData.get("image"); // Obtenemos el archivo de imagen

  let imageUrl = null;

  // Guardamos la imagen en el servidor si es necesario
  if (imageFile && imageFile instanceof Blob) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const filePath = path.join(process.cwd(), 'public', 'uploads', `${id}-${imageFile.name}`);
    await fs.writeFile(filePath, buffer);
    imageUrl = `/uploads/${id}-${imageFile.name}`;
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        ...(imageUrl && { image: imageUrl }), // Solo actualizamos la imagen si existe
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: 'Error al actualizar el usuario.' }, { status: 500 });
  }
}