import Elysia from "elysia";
import { setup } from "../../utils";
import getByUsername from "./getByUsername";
import profile from "./profile";

export const users = new Elysia({ name: "users" })
  .use(setup)
  .get("/profile", ({ userId }) => profile({ userId }))
  .get("/:username", ({ params: { username } }) => getByUsername({ username }));
