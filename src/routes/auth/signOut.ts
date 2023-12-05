import { auth } from "../../services";
import { UNAUTHORIZED } from "../response";

export default async function signOut({userId, cookie}: { userId: string; cookie: string}) {
  try {
    const sessionId = await auth.readSessionCookie(cookie);
    if (!sessionId) {
      return UNAUTHORIZED;
    }
    const session = await auth.getSession(sessionId);
    await auth.invalidateSession(session.sessionId);
    const sessionCookie = auth.createSessionCookie(null);
    return new Response(null, {
      headers: {
        "Set-Cookie": sessionCookie.serialize() // delete session cookie
      },
      status: 204
    });
  } catch (e) {
    console.log(e);
    return new Response(null, {
      status: 500
    });
  }
}