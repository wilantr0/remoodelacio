// import { conn } from '@/lib/database';
import { NextResponse } from 'next/server';
// import { hashPassword } from '@lib/password'

export async function POST(req: Request) {
  const body = await req.json()

  return NextResponse.json(body)
  
  // const {name, email, password, role} = await req.json()
  
  // if (!name || !email || !password || !role) {
  //   return NextResponse.json({ message: 'Todos los campos son requeridos.' }, { status: 400 });
  // }

  // const hashedPassword = await hashPassword(password)
  
  // const query = conn ? await conn.query('INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
  //     [name, email, hashedPassword, role]) : {rows:"Error"}
      
  // return Response.json(query.rows)
}
