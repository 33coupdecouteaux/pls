-- Safe fix for capacity columns when previous NOT NULL add failed
-- Adds columns with default 0 if absent, fills nulls, then enforces NOT NULL.
ALTER TABLE "listing" ADD COLUMN IF NOT EXISTS "bedrooms" integer DEFAULT 0;
ALTER TABLE "listing" ADD COLUMN IF NOT EXISTS "bathrooms" integer DEFAULT 0;
ALTER TABLE "listing" ADD COLUMN IF NOT EXISTS "beds" integer DEFAULT 0;

UPDATE "listing" SET "bedrooms" = 0 WHERE "bedrooms" IS NULL;
UPDATE "listing" SET "bathrooms" = 0 WHERE "bathrooms" IS NULL;
UPDATE "listing" SET "beds" = 0 WHERE "beds" IS NULL;

ALTER TABLE "listing" ALTER COLUMN "bedrooms" SET NOT NULL;
ALTER TABLE "listing" ALTER COLUMN "bathrooms" SET NOT NULL;
ALTER TABLE "listing" ALTER COLUMN "beds" SET NOT NULL;
