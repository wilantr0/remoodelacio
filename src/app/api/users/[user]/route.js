import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


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

  let imageBase64 = null;

  // Convertimos la imagen a base64 si se proporciona una
  if (imageFile && imageFile instanceof Blob) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    imageBase64 = buffer.toString('base64'); // Convertimos a base64
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        ...(imageBase64 && { image: `data:${imageFile.type};base64,${imageBase64}` }), // Guardamos en formato base64 con el tipo de MIME
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: 'Error al actualizar el usuario.' }, { status: 500 });
  }
}
