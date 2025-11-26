import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Video info table
export const videos = pgTable("videos", {
  id: text("id").primaryKey(), // YouTube video ID
  title: text("title").notNull(),
  thumbnail: text("thumbnail").notNull(),
  duration: text("duration").notNull(),
  views: text("views").notNull(),
  formats: jsonb("formats").notNull().$type<VideoFormat[]>(),
  thumbnails: jsonb("thumbnails").notNull().$type<ThumbnailFormat[]>(),
});

// Thumbnail templates table
export const thumbnailTemplates = pgTable("thumbnail_templates", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // "minimal", "bold", "professional", etc.
  preview_url: text("preview_url").notNull(),
  template_data: jsonb("template_data").notNull().$type<ThumbnailTemplateData>(),
  is_premium: integer("is_premium").default(0), // 0 = free, 1 = premium
  created_at: text("created_at").notNull(),
});

// User-created thumbnails table
export const userThumbnails = pgTable("user_thumbnails", {
  id: text("id").primaryKey(),
  user_id: text("user_id"), // Optional for anonymous users
  video_id: text("video_id"), // YouTube video ID if created from video
  title: text("title").notNull(),
  thumbnail_data: jsonb("thumbnail_data").notNull().$type<ThumbnailData>(),
  created_at: text("created_at").notNull(),
  updated_at: text("updated_at").notNull(),
});

// User table (keeping from the original schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Schemas for data validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertVideoSchema = createInsertSchema(videos);

// Types for the application
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type VideoInfo = typeof videos.$inferSelect;

export interface VideoFormat {
  format_id: string;
  format: string;
  quality: string;
  ext: string;
  resolution?: string;
  filesize?: number;
  filesize_approx?: number;
}

export interface ThumbnailFormat {
  id: string;
  url: string;
  width: number;
  height: number;
  quality: string;
  ext: string;
}

export interface ThumbnailElement {
  id: string;
  type: "text" | "image" | "shape" | "sticker";
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  opacity?: number;
  zIndex: number;
  content?: string; // For text elements
  src?: string; // For image/sticker elements
  style?: {
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
    color?: string;
    backgroundColor?: string;
    borderRadius?: number;
    border?: string;
    textAlign?: "left" | "center" | "right";
    textShadow?: string;
    filter?: string;
  };
}

export interface ThumbnailData {
  canvas: {
    width: number;
    height: number;
    backgroundColor: string;
    backgroundImage?: string;
  };
  elements: ThumbnailElement[];
  metadata: {
    title: string;
    style: string;
    aiGenerated?: boolean;
    sourceVideoId?: string;
  };
}

export interface ThumbnailTemplateData extends ThumbnailData {
  variables?: {
    [key: string]: {
      type: "text" | "image" | "color";
      defaultValue: any;
      label: string;
    };
  };
}
