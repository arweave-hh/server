import Elysia from "elysia";
import { setup } from "../../utils";
import profile from "./profile";

export const users = new Elysia({ name: "users" })
  .use(setup)
  .get("/profile", ({ userId }) => profile({ userId }));
