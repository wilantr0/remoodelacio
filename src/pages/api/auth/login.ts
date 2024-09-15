import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';


const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookieStore = cookies()
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
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET||'', { expiresIn: '1h' });
            console.log(token)
            cookieStore.set('token', token)
            const info = jwt.decode(token)
            console.log(info)
            res.status(200).json({ token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
        console.log(error)
    }
}
