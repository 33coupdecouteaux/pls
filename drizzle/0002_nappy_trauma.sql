ALTER TABLE "listing" ADD COLUMN "city_quarter" text;--> statement-breakpoint
ALTER TABLE "listing" ADD COLUMN "full_address" text;--> statement-breakpoint
ALTER TABLE "listing" ADD COLUMN "features" json NOT NULL;--> statement-breakpoint
ALTER TABLE "listing" ADD COLUMN "cover_image_url" text;--> statement-breakpoint
ALTER TABLE "listing" ADD COLUMN "image_urls" json NOT NULL;