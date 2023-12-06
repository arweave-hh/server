import Elysia, { t } from "elysia";
import { setup } from "../../../utils";
import compress from "./compress";
import getAll from "./getAll";
import post from "./post";


export const images = new Elysia({ name: "image" })
  .use(setup)
  .get("/data", ({ userId }) => getAll({ userId }), {
    detail: { tags: ["Images"] }
  })
  .post("/data/upload", ({ userId, body: { imageIds } }) => post({ userId, imageIds }), { body: t.Object({ imageIds: t.Array(t.String()) }), detail: { tags: ["Images"] } })
  .post("/data/compress", ({ userId, body: { file, compress_by } }) => compress({ file, compressBy: compress_by, userId }), { body: t.Object({ file: t.File(), compress_by: t.Number() }), detail: { tags: ["Images"] } })
