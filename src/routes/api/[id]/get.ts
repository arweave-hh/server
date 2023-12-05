import { eq } from "drizzle-orm";
import database from "../../../services/database";
import { users } from "../../../schema";
import { NOT_FOUND, parseJSON } from "../../response";

export default async function get({ id }: { id: string }): Promise<Response> {
  const user = await database.query.users.findFirst({ where: eq(users.id, id) });
  if (!user) {
    throw NOT_FOUND;
  }
  return parseJSON(user);
}