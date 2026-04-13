import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || '';
const secretKey = new TextEncoder().encode(JWT_SECRET);

export interface UserSession {
  id: string;
  email: string;
  name: string;
}

export async function generateToken(user: UserSession): Promise<string> {
  return await new SignJWT({ id: user.id, email: user.email, name: user.name })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secretKey);
}

export async function verifyToken(token: string): Promise<UserSession | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    // Returning the required fields. We use unknown first to satisfy TS, then cast.
    return payload as unknown as UserSession;
  } catch {
    return null;
  }
}
