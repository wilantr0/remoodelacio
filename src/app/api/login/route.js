import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validatePassword } from '@/lib/password';
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export async function POST(req) {
  
  const body = await req.formData()
  const data = Object.fromEntries(body.entries())

  const {email, password} = data
  
  // Validar que se envíen ambos campos
  if (!email || !password) {
    return NextResponse.json({ message: 'Todos los campos son requeridos.' }, { status: 400 });
  }

  try {
    // Buscar al usuario en la base de datos con Prisma
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // Si no se encuentra el usuario
    if (!user) {
      return NextResponse.json({ message: 'Usuario no encontrado.' }, { status: 404 });
    }

    //Aquí deberías verificar la contraseña (usualmente con bcrypt o alguna otra herramienta de hashing)
    if (! await validatePassword(password, user.password)) {
      return NextResponse.json({ message: 'Contraseña incorrecta.' }, { status: 401 });
    }


    // Si el login es exitoso
    const token = jwt.sign({user: user.id}, process.env.JWT_SECRET, {expiresIn:"1d"})
    cookies().set("cookieUser", token)
    return NextResponse.json({ message: 'Login exitoso', user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error en el servidor. ' + error.message }, { status: 500 });
  }
}





