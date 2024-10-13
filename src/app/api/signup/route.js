import { NextResponse } from 'next/server';
import { hashPassword } from '@lib/password';
import { PrismaClient } from '@prisma/client'
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers';

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const body = await req.formData();
    const data = Object.fromEntries(body.entries());

    const { name, email, password, role } = data;

    // Validación de los campos
    if (!name || !email || !password || !role) {
      return NextResponse.json({ message: 'Todos los campos son requeridos.' }, { status: 400 });
    }

    // Hashear la contraseña
    const hashedPassword = await hashPassword(password);

    // Inserción de los datos en la base de datos
      const query = await prisma.user.create({
        data:{
          name,
          email,
          password: hashedPassword,
          role
        }
      })

      const token = jwt.sign({user: query.id}, process.env.JWT_SECRET, {expiresIn:"1h"})
      
      cookies().set("cookieUser", token)

      return NextResponse.json({query}, {status: 201})


  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Error en el servidor: ' + error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Error desconocido en el servidor' }, { status: 500 });
    }
  }
}
