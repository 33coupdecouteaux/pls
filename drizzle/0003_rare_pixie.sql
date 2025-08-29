-- Add capacity and price fields to listing table safely
-- Step 1: Add columns with defaults
ALTER TABLE "listing" ADD COLUMN "bedrooms" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "listing" ADD COLUMN "bathrooms" integer DEFAULT 0;--> statement-breakpoint  
ALTER TABLE "listing" ADD COLUMN "beds" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "listing" ADD COLUMN "price_min_weekly" integer;--> statement-breakpoint
ALTER TABLE "listing" ADD COLUMN "price_max_weekly" integer;--> statement-breakpoint

-- Step 2: Set NOT NULL after ensuring no NULL values exist
ALTER TABLE "listing" ALTER COLUMN "bedrooms" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "listing" ALTER COLUMN "bathrooms" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "listing" ALTER COLUMN "beds" SET NOT NULL;