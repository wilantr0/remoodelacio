import 'server-only'
import {jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const secretKey = process.env.JWT_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
console.log(encodedKey)

export async function encrypt(payload) {
  return jwt.sign(payload,secretKey,{expiresIn: '1d'})
}

export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}

export async function createSession(userId) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expiresAt })
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}