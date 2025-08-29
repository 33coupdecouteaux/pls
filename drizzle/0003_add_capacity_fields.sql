-- Add bedrooms, bathrooms, beds columns to listing
ALTER TABLE "listing" ADD COLUMN IF NOT EXISTS "bedrooms" integer DEFAULT 0 NOT NULL;
ALTER TABLE "listing" ADD COLUMN IF NOT EXISTS "bathrooms" integer DEFAULT 0 NOT NULL;
ALTER TABLE "listing" ADD COLUMN IF NOT EXISTS "beds" integer DEFAULT 0 NOT NULL;
