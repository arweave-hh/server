import Elysia, { t } from "elysia";
import { setup } from "../../utils";
import generateAPIKey from "./generateAPIKey";
import generateMessage from "./generateMessage";
import signIn from "./signIn";
import signOut from "./signOut";
import signUp from "./signUp";
import verifyMessage from "./verifyMessage";

export const authenticated = new Elysia({ name: "authenticated" })
  .use(setup)
  .post("/sign-out", ({ userId }) => signOut({ userId }), {
    detail: {
      tags: ["Auth"]
    }
  })
  .post("/generate-api-key", ({ userId }) => generateAPIKey({ userId }), {
    detail: {
      tags: ["Auth"]
    }
  })

export const unauthenticated = new Elysia({ name: "unauthenticated" })
  .use(setup)
  .post(
    "/sign-up",
    ({ body }) => signUp(body),
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
        confirmPassword: t.String(),
      }),
      detail: {
        tags: ["Auth"]
      }
    })
  .post(
    "/sign-in",
    ({ body }) => signIn(body),
    {
      body: t.Object({
        email: t.String(),
        password: t.String()
      }),
      detail: {
        tags: ["Auth"]
      }
    })
  .post("/generate-message", ({ body: { address } }) => generateMessage({ address }), {
    body: t.Object({ address: t.String() }),
    detail: {
      tags: ["Auth"]
    }
  })
  .post("/verify-message", ({ body: { address, message, signature } }) => verifyMessage({ address, signature, message }), {
    body: t.Object({ address: t.String(), signature: t.String(), message: t.String() }),
    detail: {
      tags: ["Auth"]
    }
  })
 
  ;
