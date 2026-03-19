import { pgTable, serial, text, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";

export const categoriesTable = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  icon: text("icon").notNull(),
  leadsCount: integer("leads_count").notNull().default(0),
});

export const leadsTable = pgTable("leads", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  budgetMin: integer("budget_min").notNull(),
  budgetMax: integer("budget_max").notNull(),
  timeline: text("timeline").notNull(),
  startDate: text("start_date"),
  isUrgent: boolean("is_urgent").notNull().default(false),
  isVerified: boolean("is_verified").notNull().default(false),
  interestedCount: integer("interested_count").notNull().default(0),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),
  clientPhone: text("client_phone"),
  postedAt: timestamp("posted_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at"),
});
