import { router } from './core';
import { listingRouter } from './routers/listing';

export const appRouter = router({
  listing: listingRouter,
});

export type AppRouter = typeof appRouter;
