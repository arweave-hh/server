import auth from "../../services/auth.js";
import { signUpSchema } from "../../zod.js";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../response.js";

export default async function signUp({ email, password, confirmPassword }: {  email: string; password: string; confirmPassword: string }): Promise<Response> {
  const result = signUpSchema.safeParse({  email, password, confirmPassword });
  if (result.success) {
    try {
      const key = await auth.createUser({
        key: {
          providerId: "email",
          providerUserId: email.toLocaleLowerCase(),
          password
        },
        attributes: {
          email,
        }
      });
      const session = await auth.createSession({
        userId: key.userId,
        attributes: {
          email
        }
      });
      const sessionCookie = auth.createSessionCookie(session);
      return new Response(null, {
        headers: {
          "Set-Cookie": sessionCookie.serialize() // store session cookie
        },
        status: 204
      });
    } catch (e) {
      console.log(e);
      return INTERNAL_SERVER_ERROR;
    }
  }
  return BAD_REQUEST;
}
