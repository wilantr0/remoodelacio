'use server'
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';


const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { mail, password } = req.body;
    console.log(req.body)

    try {
        const user = await prisma.user.findUnique({
            where: { email:mail },
            select: {
                id: true,
                email: true,
                name: true,
                password: true,
            },
        });
        const pass = await bcrypt.compare(password, user!.password)
        console.log(pass)
        console.log(user)
        console.log(password)
        
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
        console.log(error)
    }
}
