import auth from "../../services/auth.js";
import { signInSchema } from "../../zod.js";

/**
 * 
 * @param {{email: string, password: string}} _
 * @returns {Promise<Response>} 
 */
export default async function signIn({ email, password }) {
  const result = signInSchema.safeParse({ email, password });
  if (result.success) {
    try {
      const key = await auth.useKey(
        "email",
        email.toLocaleLowerCase(),
        password
      );
      const session = await auth.createSession({
        userId: key.userId,
        attributes: {
        }
      });
      const sessionCookie = auth.createSessionCookie(session);
      // redirect to profile page
      return new Response(null, {
        headers: {
          "Set-Cookie": sessionCookie.serialize() // store session cookie
        },
        status: 200
      });
    } catch (e) {
      console.log(e);
    }
  }
  return new Response(null, {
    status: 400
  });
}