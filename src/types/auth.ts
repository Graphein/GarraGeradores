export type UserRole = 'owner' | 'employee';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}