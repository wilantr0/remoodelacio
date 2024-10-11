import { prisma } from '@/lib/prisma'; // Asumiendo que tienes configurado Prisma
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  
  const { email, password } = await req.json();
  
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

    // Aquí deberías verificar la contraseña (usualmente con bcrypt o alguna otra herramienta de hashing)
    // if (!bcrypt.compareSync(password, user.password)) {
    //   return NextResponse.json({ message: 'Contraseña incorrecta.' }, { status: 401 });
    // }

    // Si el login es exitoso
    return NextResponse.json({ message: 'Login exitoso', user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error en el servidor.' }, { status: 500 });
  }
}



export async function GET() {
  const cookie = cookies().get('cookie1')

  return Response.json(cookie)
}

