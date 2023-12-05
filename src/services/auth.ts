import { libsql } from "@lucia-auth/adapter-sqlite";
import { lucia } from "lucia";
import { elysia } from "lucia/middleware";
import { libSqlClient } from "./database.js";

const auth = lucia({
  // @ts-ignore
  env: process.env.ENV,
  middleware: elysia(),
  adapter: libsql(libSqlClient, {
    user: "user",
    key: "user_key",
    session: "user_session"
  })
});

export default auth;
