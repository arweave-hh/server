import { eq } from "drizzle-orm";
import { users } from "../../schema";
import { database } from "../../services";
import { User } from "../../types";
import { verifySignature } from "../../utils";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, NO_CONTENT, UNAUTHORIZED } from "../response";

export default async function verifyMessage({ address, message, signature }: { address: string; message: string; signature: string; }) {
  let user: User;
  if (!verifySignature({ address, signature })) {
    return UNAUTHORIZED;
  }
  try {
    const response = await database.query.users.findFirst({ where: eq(users.address, address) });
    if (!response) {
      return NOT_FOUND;
    }
    user = response;
  } catch (e) {
    console.log(e);
    return INTERNAL_SERVER_ERROR;
  }
  if (!verifySignature({ address, signature })) {
    return BAD_REQUEST;
  }
  return NO_CONTENT;
}