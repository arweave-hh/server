import Elysia, { t } from "elysia";
import { setup } from "../../utils";
import signIn from "./signIn";
import signUp from "./signUp";

export const authentication = new Elysia({ name: "authentication" })
  .use(setup)
  .post(
    "/sign-up",
    ({ body }) => signUp(body),
    {
      body: t.Object({
        username: t.String(),
        email: t.String(),
        password: t.String(),
        confirmPassword: t.String(),
      }),
    })
  .post(
    "/sign-in",
    ({ body }) => signIn(body),
    {
      body: t.Object({
        email: t.String(),
        password: t.String()
      }),
    })