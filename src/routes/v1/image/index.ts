import Elysia, { t } from "elysia";
import { setup } from "../../../utils";
import getAll from "./getAll";
import post from "./post";


export const image = new Elysia({ name: "image" })
  .use(setup)
  .get("/data", ({ userId }) => getAll({ userId }))
  .post("/data", ({ userId, body: { files } }) => post({ userId, files }), { body: t.Object({ files: t.Files() }) })
  .post("/data/compress", ({userId, body: { files }}) => {}, { body: t.Object({files: t.Files()})})