import auth from "../../services/auth.js";
import { signUpSchema } from "../../zod.js";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../response.js";
/**
 * 
 * @param {{username: string; email: string; password: string; confirmPassword: string}} _ 
 * @returns {Promise<Response>} 
 */
export default async function signUp({ username, email, password, confirmPassword }) {
  const result = signUpSchema.safeParse({ username, email, password, confirmPassword });
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
          username
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
        status: 200
      });

    } catch (e) {
      console.log(e);
      return INTERNAL_SERVER_ERROR;
    }
  }
  return BAD_REQUEST;
}
