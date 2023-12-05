import { relations } from "drizzle-orm";
import { blob, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  username: text("username").unique().notNull(),
  avatar: text("avatar"),
});

export const session = sqliteTable("user_session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  activeExpires: blob("active_expires", {
    mode: "bigint"
  }).notNull(),
  idleExpires: blob("idle_expires", {
    mode: "bigint"
  }).notNull()
});

export const key = sqliteTable("user_key", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  hashedPassword: text("hashed_password")
});

export const apiKey = sqliteTable("api_key", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  apiKey: text("api_key")
    .notNull(),
}); 
