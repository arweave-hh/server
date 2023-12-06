import Elysia, { t } from "elysia";
import { setup } from "../../../utils";
import compress from "./compress";
import getAll from "./getAll";
import post from "./post";


export const data = new Elysia({ name: "data" })
  .use(setup)
  .get("/data", ({ userId }) => getAll({ userId }), {
    detail: { tags: ["Data"] }
  })
  .post("/data/upload", ({ userId, body: { dataIds } }) => post({ userId, dataIds }), { body: t.Object({ dataIds: t.Array(t.String()) }), detail: { tags: ["Data"] } })
  .post("/data/compress", ({ userId, body }) => compress({
    files: body.files,
    compressBy: body.compress_by,
    userId,
  }), { body: t.Any(), detail: { tags: ["Data"] } })
