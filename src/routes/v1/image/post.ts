import { eq } from "drizzle-orm";
import { users } from "../../../schema";
import { database } from "../../../services";
import { irys } from "../../../services/irys";
import { User } from "../../../types";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, parseJSON } from "../../response";

export default async function post({ userId, files }: { userId: string, files: File[] }): Promise<Response> {
  let user: User;
  let result: string[];
  let data: Buffer[];
  try {
    const response = await database.query.users.findFirst({ where: eq(users.id, userId) });
    if (!response) {
      return NOT_FOUND;
    }
    user = response;
  } catch (e) {
    console.log(e);
    return INTERNAL_SERVER_ERROR;
  }
  if (!data) {
    return NOT_FOUND;
  }
  try {
    const receipt = await irys.upload(data);
  } catch (e) {
    console.log(e);
  }
  return INTERNAL_SERVER_ERROR;
}
