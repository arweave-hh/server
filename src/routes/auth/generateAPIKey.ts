import crypto from "crypto";
import { apiKeys } from "../../schema";
import { database } from "../../services";
import { INTERNAL_SERVER_ERROR, NO_CONTENT } from "../response";
export default async function generateAPIKey({ userId }: { userId: string }) {
  const id = crypto.randomBytes(10).toString();
  const apiKey = `compar_${crypto.randomBytes(12).toString()}`;
  try {
    await database.insert(apiKeys).values({ id, userId, key: apiKey })
    return NO_CONTENT;
  } catch (e) {
    console.log(e);
    return INTERNAL_SERVER_ERROR;
  }
}