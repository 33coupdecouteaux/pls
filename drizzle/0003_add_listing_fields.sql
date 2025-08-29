-- Add capacity and price fields to listing table
-- Using IF NOT EXISTS to handle existing columns and DEFAULT to avoid NULL issues

-- Add capacity columns with defaults
ALTER TABLE "listing" ADD COLUMN IF NOT EXISTS "bedrooms" integer DEFAULT 0;
ALTER TABLE "listing" ADD COLUMN IF NOT EXISTS "bathrooms" integer DEFAULT 0;  
ALTER TABLE "listing" ADD COLUMN IF NOT EXISTS "beds" integer DEFAULT 0;

-- Add price columns (nullable as they're optional)
ALTER TABLE "listing" ADD COLUMN IF NOT EXISTS "price_min_weekly" integer;
ALTER TABLE "listing" ADD COLUMN IF NOT EXISTS "price_max_weekly" integer;

-- Update any NULL values to 0 for capacity fields
UPDATE "listing" SET "bedrooms" = 0 WHERE "bedrooms" IS NULL;
UPDATE "listing" SET "bathrooms" = 0 WHERE "bathrooms" IS NULL;
UPDATE "listing" SET "beds" = 0 WHERE "beds" IS NULL;

-- Set NOT NULL constraints after ensuring no NULL values
ALTER TABLE "listing" ALTER COLUMN "bedrooms" SET NOT NULL;
ALTER TABLE "listing" ALTER COLUMN "bathrooms" SET NOT NULL;
ALTER TABLE "listing" ALTER COLUMN "beds" SET NOT NULL;
