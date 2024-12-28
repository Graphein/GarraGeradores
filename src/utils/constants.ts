// Demo users with pre-computed password hashes
export const DEMO_USERS = [
  {
    id: '1',
    email: 'owner@example.com',
    // Hash of 'owner123' + salt
    password: '5c2dd944dde9e08881bef0894fe7b22a5c9c4b06625c917c8b110e7a36124954',
    name: 'Owner',
    role: 'owner' as const
  },
  {
    id: '2',
    email: 'employee@example.com',
    // Hash of 'employee123' + salt
    password: '83d93e6c8c2759c9c889038906940c2a4032ec29f87e5078e0e65129d2d79f18',
    name: 'Employee',
    role: 'employee' as const
  }
];