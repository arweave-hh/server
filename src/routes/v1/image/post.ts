import { and, eq, inArray } from "drizzle-orm";
import { images, users } from "../../../schema";
import { database } from "../../../services";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, NO_CONTENT } from "../../response";

export default async function post({ userId, imageIds }: { userId: string; imageIds: string[]; }): Promise<Response> {
  let data: { id: string; path: string; }[] = [];
  try {
    const response = await database.query.images.findMany({ where: and(inArray(images.id, imageIds), eq(users.id, userId)) });
    if (response.length === 0) {
      return NOT_FOUND;
    }
    for (const _image of response) {
      data.push(_image);
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
