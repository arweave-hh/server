import { eq } from "drizzle-orm/sql/expressions/conditions";
import { users } from "../../schema";
import { database } from "../../services";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, parseJSON } from "../response";

/**
 * 
 * @param {{userId:string}} _ 
 * @returns {Promise<Response>}
 */
export default async function profile({ userId }) {
  console.log(userId);
  try {
    const user = await database.query.users.findFirst({
      where: eq(users.id, userId)
    });
    if (!user) {
      return NOT_FOUND;
    }
    return parseJSON({ avatar: user.avatar, username: user.username, email: user.email });
  } catch (e) {
    console.log(e);
    return INTERNAL_SERVER_ERROR;
  }
}