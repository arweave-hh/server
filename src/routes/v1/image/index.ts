import Elysia, { t } from "elysia";
import { setup } from "../../../utils";
import compress from "./compress";
import getAll from "./getAll";
import post from "./post";


export const images = new Elysia({ name: "image" })
  .use(setup)
  .get("/image", ({ userId }) => getAll({ userId }))
  .post("/image", ({ userId, body: { imageIds } }) => post({ userId, imageIds }), { body: t.Object({ imageIds: t.Array(t.String()) }) })
  .post("/image/compress", ({ userId, body: { files, compressBy } }) => compress({ files, compressBy, userId }), { body: t.Object({ files: t.Files(), compressBy: t.Array(t.Number()) }) })
