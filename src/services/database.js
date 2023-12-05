import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "../schema";

export const libSqlClient = createClient({
  // @ts-ignore
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

const database = drizzle(libSqlClient, { schema });

export default database
