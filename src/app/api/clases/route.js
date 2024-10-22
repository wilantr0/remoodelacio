import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function GET() {
  
}

export async function POST(req){
  const token = cookies().get("cookieUser")?.value
  const userId = jwt.verify(token, process.env.JWT_SECRET);


  try{
    const body = await req.json()

    const {name, description} = body

    const classrooms = await prisma.classroom.create({
      data:{
        name: name,
        created_by_id: userId.user,
        description: description
      }
    })
    
    return NextResponse.json(classrooms)
  } catch(error){
    return NextResponse.json(error)
  }
}