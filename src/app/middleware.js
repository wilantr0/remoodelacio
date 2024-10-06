import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req) {
  const token = req.cookies.get('authToken');

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Define qué rutas estarán protegidas
export const config = {
  matcher: ['/dashboard/:path*'], // Protege todas las rutas bajo /dashboard
};
