-- Add weekly price range columns (stored in cents) so we can avoid float issues
ALTER TABLE "listing" ADD COLUMN IF NOT EXISTS "price_min_weekly" integer;
ALTER TABLE "listing" ADD COLUMN IF NOT EXISTS "price_max_weekly" integer;
