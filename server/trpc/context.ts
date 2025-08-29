import { db } from '@/lib/db';
import { headers } from 'next/headers';

export async function createContext() {
  // Add auth extraction here later
  const h = headers();
  return { db, headers: h };
}
export type Context = Awaited<ReturnType<typeof createContext>>;
