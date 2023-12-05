import { eq } from "drizzle-orm";
import { repositories, users } from "../../schema";
import { database } from "../../services";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../response";

/**
 * @param {{username: string;}} _
 * @returns {Promise<Response>}
 */
export default async function getByUsername({ username }) {
  try {
    const user = await database.query.users.findFirst({ where: eq(users.username, username) });
    if (!user) {
      return NOT_FOUND;
    }
    const data = await database.select({ "name": repositories.name }).from(repositories).where(eq(repositories.userId, user.id));
    return new Response(
      JSON.stringify({
        avatar: user.avatar,
        username: user.username,
        repositories: data
      }), {
      status: 200
    });
  } catch (e) {
    return INTERNAL_SERVER_ERROR;
  }
}