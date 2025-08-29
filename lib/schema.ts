import { pgTable, text, timestamp, boolean, json, integer } from "drizzle-orm/pg-core";

// Listings table (basic real-estate like structure)
export const listing = pgTable("listing", {
  id: text("id").primaryKey(), // could use uuid generated app-side
  title: text("title").notNull(),
  description: text("description"),
  location: text("location"),
  status: text("status").$defaultFn(() => "draft").notNull(),
  ownerId: text("owner_id").references(() => user.id, { onDelete: "set null" }),
  // New localisation fields
  cityQuarter: text("city_quarter"), // Ville / Quartier
  fullAddress: text("full_address"),
  // Equipments & Features (array of enum values)
  features: json("features").$type<string[]>().$defaultFn(() => [] as string[]).notNull(),
  // Capacity
  bedrooms: integer("bedrooms").$defaultFn(() => 0).notNull(),
  bathrooms: integer("bathrooms").$defaultFn(() => 0).notNull(),
  beds: integer("beds").$defaultFn(() => 0).notNull(),
  // Price range per week (in cents)
  priceMinWeekly: integer("price_min_weekly"),
  priceMaxWeekly: integer("price_max_weekly"),
  // Images (S3 URLs)
  coverImageUrl: text("cover_image_url"),
  imageUrls: json("image_urls").$type<string[]>().$defaultFn(() => [] as string[]).notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull(),
});

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
});
