import crypto from "crypto";
import fs from "fs";
import { database } from "../../../services";
import { data } from "../../../schema";

export default async function compress({ userId, file }: { userId: string, file: File; compressBy: number }) {
  const paths = [];
  const randomString = `${crypto.randomBytes(10).toString('hex')}`;
  const path = `/${userId}/${file.name + '_' + randomString}}`;
  paths.push(path);
  //@ts-ignore
  fs.writeFile(file, path, (e) => console.log(e));
  try {
    const objects = paths.map((path) => {
      const id = crypto.randomBytes(10).toString('hex');
      return { id, path, userId };
    });
    await database.insert(data).values(objects);
  } catch (e) {
    console.log(e)
  }
}