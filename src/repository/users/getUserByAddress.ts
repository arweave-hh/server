import { eq } from "drizzle-orm/sql";
import { users } from "../../schema";
import { database } from "../../services";
import { User } from "../../types";

export default async function getUserByAddress({ address }: { address: string }): Promise<User | undefined> {
  return await database.query.users.findFirst({ where: eq(users.address, address) });
}