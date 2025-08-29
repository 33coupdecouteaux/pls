import { createUploadthing, type FileRouter } from 'uploadthing/server';
import { getServerSession } from '@/lib/auth';

const f = createUploadthing();

export const fileRouter = {
  listingImages: f({ image: { maxFileSize: '4MB', maxFileCount: 12 } })
    .middleware(async () => {
      const session = await getServerSession();
      if (!session) throw new Error('UNAUTHORIZED');
  // better-auth session object exposes userId directly (no nested user object)
  return { userId: session.userId };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      // Option: log or store file.url in DB after client sends list to tRPC
      return { url: file.url, userId: metadata.userId };
    }),
} satisfies FileRouter;

export type AppFileRouter = typeof fileRouter;
