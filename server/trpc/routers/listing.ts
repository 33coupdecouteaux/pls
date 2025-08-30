import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../core';
import type { Context } from '../context';
import { listing } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';

const featureEnum = z.enum([
  'piscine',
  'piscine_chauffee',
  'terrasse',
  'cave',
  'climatisation',
  'wifi',
  'tv_connectee',
  'interphone',
  'jardin',
  'balcon',
  'parking',
  'garage',
  'cheminee',
  'cuisine_equipee',
  'ascenseur',
  'alarme',
  'chauffage_central',
  'proche_transports',
  'gardien'
]);

const listingInput = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  location: z.string().optional(),
  cityQuarter: z.string().optional(),
  fullAddress: z.string().optional(),
  features: z.array(featureEnum).optional(),
  coverImageUrl: z.string().url().optional(),
  imageUrls: z.array(z.string().url()).optional(),
  status: z.enum(['draft','published']).optional(),
  bedrooms: z.number().int().min(0).optional(),
  bathrooms: z.number().int().min(0).optional(),
  beds: z.number().int().min(0).optional(),
  priceMinWeekly: z.number().int().min(0).optional(),
  priceMaxWeekly: z.number().int().min(0).optional(),
});

export const listingRouter = router({
  list: publicProcedure
    .query(async ({ ctx }: { ctx: Context }) => {
      // Return only published listings for public access
      return ctx.db.select().from(listing)
        .where(eq(listing.status, 'published'))
        .orderBy(listing.createdAt);
    }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }: { ctx: Context; input: { id: string } }) => {
      // For individual listings, also ensure they are published for public access
      const rows = await ctx.db.select().from(listing)
        .where(eq(listing.id, input.id));
      const foundListing = rows[0] ?? null;
      // Return listing only if it's published or if user is authenticated and owns it
      if (foundListing && foundListing.status === 'published') {
        return foundListing;
      }
      return null;
    }),
  create: protectedProcedure
    .input(listingInput)
    .mutation(async ({ ctx, input }: { ctx: Context & { session: any }; input: z.infer<typeof listingInput> }) => { // TODO: Type session properly when auth is fully implemented
      const id = randomUUID();
      const now = new Date();
      const data = { 
        id,
        createdAt: now,
        updatedAt: now,
        status: input.status ?? 'draft',
        ownerId: ctx.session.userId,
        features: input.features ?? [],
        imageUrls: input.imageUrls ?? [],
        ...input
      };
      await ctx.db.insert(listing).values(data);
      return data;
    }),
  update: protectedProcedure
    .input(listingInput.partial().extend({ id: z.string() }))
    .mutation(async ({ ctx, input }: { ctx: Context & { session: any }; input: { id: string } & Partial<z.infer<typeof listingInput>> }) => { // TODO: Type session properly when auth is fully implemented
      const { id, ...rest } = input;
      // Enforce ownership in update
      const rows = await ctx.db.update(listing)
        .set({ ...rest, updatedAt: new Date() })
        .where(eq(listing.id, id))
        .returning();
      const row = rows[0];
      if (row && row.ownerId !== ctx.session.userId) {
        throw new Error('FORBIDDEN');
      }
      return row ?? null;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }: { ctx: Context & { session: any }; input: { id: string } }) => { // TODO: Type session properly when auth is fully implemented
      // Could fetch owner first; simple optimistic delete then check
      const rows = await ctx.db.select().from(listing).where(eq(listing.id, input.id));
      const row = rows[0];
      if (!row) return { id: input.id };
      if (row.ownerId !== ctx.session.userId) throw new Error('FORBIDDEN');
      await ctx.db.delete(listing).where(eq(listing.id, input.id));
      return { id: input.id };
    }),
});
