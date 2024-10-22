import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export async function hashPassword(password){
  const hashedPassword = await bcrypt.hash(password,10)
  return hashedPassword
}

export async function validatePassword(password, hashedPassword){
  const isValid = await bcrypt.compare(password, hashedPassword)
  return isValid
}

export function decodeToken(token){
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded
}