import { NextRequest } from 'next/server';
import { uploadBuffer } from '@/lib/storage/s3';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file');
  if (!file || !(file instanceof File)) {
    return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
  }
  const arrayBuffer = await file.arrayBuffer();
  const key = `listing/${randomUUID()}-${file.name}`.replace(/\s+/g,'_');
  const url = await uploadBuffer(key, Buffer.from(arrayBuffer), file.type);
  return new Response(JSON.stringify({ url, key }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
