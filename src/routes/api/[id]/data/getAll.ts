import { eq } from "drizzle-orm";
import { users } from "../../../../schema";
import { database } from "../../../../services";
import { NOT_FOUND, parseJSON } from "../../../response";

export default async function getAll({ userId }: { userId: string }): Promise<Response> {
  const user = await database.query.users.findFirst({ where: eq(users.id, userId) });
  if (!user) {
    throw NOT_FOUND;
  }
  return parseJSON({});
}