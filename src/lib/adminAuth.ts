import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // This should be moved to environment variables in production
const ADMIN_COOKIE_NAME = 'admin_auth';

export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD && password.length === 16;
}

export function setAdminAuthCookie(): void {
  const cookieStore = cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 // 24 hours
  });
}

export function getAdminAuthStatus(): boolean {
  const cookieStore = cookies();
  return cookieStore.has(ADMIN_COOKIE_NAME);
}

export function clearAdminAuthCookie(): void {
  const cookieStore = cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}