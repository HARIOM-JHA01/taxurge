import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId;
  fullName: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword);
}

export function generateToken(user: { _id: ObjectId; email: string; fullName: string }): string {
  return sign(
    { userId: user._id.toString(), email: user.email, fullName: user.fullName },
    process.env.JWT_SECRET || '',
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): any {
  try {
    return verify(token, process.env.JWT_SECRET || '');
  } catch (error) {
    return null;
  }
}