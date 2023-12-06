import crypto from "crypto";
import fs from "fs";
import { database } from "../../../services";
import { data } from "../../../schema";
import { parseJSON } from "../../response";


async function ensureDirectoryExists(dirpath: string) {
  try {
    await fs.promises.mkdir(dirpath, { recursive: true });
  } catch (err) {
    // @ts-ignore
    if (err.code !== 'EEXIST') throw err
  }
}

export default async function compress({ userId, files, compressBy }: { userId: string, files: Blob[]; compressBy: number }) {
  const paths: string[] = [];
  let size = 0;
  await ensureDirectoryExists(`./temp/${userId}/`);
  for (const file of files) {
    const randomString = `${crypto.randomBytes(10).toString('hex')}`;
    const path = `./temp/${userId}/${randomString}}`;
    fs.writeFile(path, await file.arrayBuffer(), (e) => console.log(e));
    paths.push(path);
    size += file.size;
  }
  try {
    const dataIds: string[] = [];
    const objects = paths.map((path) => {
      const id = crypto.randomBytes(10).toString('hex');
      dataIds.push(id);
      return { id, path, userId };
    });
    await database.insert(data).values(objects);
    return parseJSON({ dataIds, size: size * compressBy });
  } catch (e) {
    console.log(e)
  }
}