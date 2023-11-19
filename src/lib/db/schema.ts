import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const USER_SYSTEM_ENUM = pgEnum("USER_SYSTEM_ENUM", ["SYSTEM", "USER"]);

export const Chats = pgTable("Chats", {
  id: serial("id").primaryKey(),
  pdfName: text("pdf_name").notNull(),
  pdfUrl: text("pdf_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  fileKey: varchar("file_key").notNull(),
});

export const Messages = pgTable("Messages", {
  id: serial("id").primaryKey(),
  chatId: integer("chat_id")
    .references(() => Chats.id)
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  role: USER_SYSTEM_ENUM("role").notNull(),
});
