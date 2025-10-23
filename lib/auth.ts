import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { SessionUser } from './types';

const JWT_SECRET = process.env.JWT_SECRET || 'votre-secret-super-securise-changez-moi';

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as SessionUser;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function createToken(user: SessionUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
}
