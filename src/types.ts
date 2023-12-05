import { users } from "./schema";

export interface Metadata {
  fileType: string;
  compress: number;
}

export type User = typeof users.$inferInsert;