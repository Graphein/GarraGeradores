import { pbkdf2Sync, randomBytes } from 'crypto-browserify';

export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const useSalt = salt || randomBytes(16).toString('hex');
  const hash = pbkdf2Sync(password, useSalt, 1000, 64, 'sha512').toString('hex');
  return { hash, salt: useSalt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const verifyHash = hashPassword(password, salt);
  return verifyHash.hash === hash;
}