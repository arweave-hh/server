import { users } from "./schema";

export interface Metadata {
  fileType: string;
}

export type User = typeof users.$inferInsert;