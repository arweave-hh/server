import { eq } from "drizzle-orm";
import { images, users } from "../../../schema";
import { database } from "../../../services";
import { query } from "../../../services/query";
import { User } from "../../../types";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, parseJSON } from "../../response";

export default async function getAll({ userId }: { userId: string }): Promise<Response> {
  let transactions: string[];
  let user: User;
  let result: string[];
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

  try {
    const response = await database.select({ transactionId: images.transactionId }).from(images).where(eq(users.id, userId));
    transactions = Array.from(response.map(({ transactionId }) => transactionId ?? "").filter((d) => d != ""));
  } catch (e) {
    console.log(e);
    return INTERNAL_SERVER_ERROR;
  }
  try {
    const response = await query.search("irys:transactions").ids(transactions);
    result = response.map(({ id }) => id);
    return parseJSON({ data: result });
  } catch (e) {
    console.log(e);
    return INTERNAL_SERVER_ERROR;
  }
}