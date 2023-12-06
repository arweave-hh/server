import { and, eq, inArray } from "drizzle-orm";
import { data, users } from "../../../schema";
import { database } from "../../../services";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, NO_CONTENT } from "../../response";

export default async function post({ userId, imageIds }: { userId: string; imageIds: string[]; }): Promise<Response> {
  let d: { id: string; path: string; }[] = [];
  try {
    const response = await database.query.data.findMany({ where: and(inArray(data.id, imageIds), eq(users.id, userId)) });
    if (response.length === 0) {
      return NOT_FOUND;
    }
    for (const _data of response) {
      d.push(_data);
    }
  } catch (e) {
    console.log(e);
  }
  try {
    return NO_CONTENT;
  } catch (e) {
    console.log(e);
  }
  return INTERNAL_SERVER_ERROR;
}
