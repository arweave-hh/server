import { auth } from "../../services";

export default async function signOut({ userId }: { userId: string; }) {
  try {
    const session = await auth.createSession({
      userId: userId,
      attributes: {
      }
    });
    // make sure to invalidate the current session!
    await auth.invalidateSession(session.sessionId);

    // for session cookies
    // create blank session cookie
    const sessionCookie = auth.createSessionCookie(null);
    return new Response(null, {
      headers: {
        // Location: "/sign-in", // redirect to login page
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