// Simple hash function using SHA-256
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'garra-salt'); // Add a salt for extra security
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Pre-computed hashed passwords for demo users
export const DEMO_USERS = [
  {
    id: '1',
    email: 'owner@example.com',
    // Pre-computed hash of 'owner123' with salt
    password: '8c6c2751db5e3583a6f55e80d89fe275e823c5c99a7d07fb939937c1542b4b74',
    name: 'Owner',
    role: 'owner'
  },
  {
    id: '2',
    email: 'employee@example.com',
    // Pre-computed hash of 'employee123' with salt
    password: '6d3f685b4d86774140985535e4993a8af44f1519c931a7d8c3c3d4ff419573f2',
    name: 'Employee',
    role: 'employee'
  }
] as const;