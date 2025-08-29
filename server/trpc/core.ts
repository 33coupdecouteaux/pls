import { initTRPC } from '@trpc/server';
import type { Context } from './context';
import { getServerSession } from '@/lib/auth';

const t = initTRPC.context<Context>().create({});

const authMiddleware = t.middleware(async ({ ctx, next }) => {
	const session = await getServerSession();
	if (!session) {
		throw new Error('UNAUTHORIZED');
	}
	return next({ ctx: { ...ctx, session } });
});

export const protectedProcedure = t.procedure.use(authMiddleware);

export const router = t.router;
export const publicProcedure = t.procedure;
