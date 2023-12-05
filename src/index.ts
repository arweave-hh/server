import { logger } from '@bogeychan/elysia-logger';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { Elysia, t } from "elysia";
import { generate, signOut } from './routes/auth';
import { UNAUTHORIZED } from './routes/response';
import { auth } from './services';
import { setup } from './utils';

export const app = new Elysia()
  .use(logger({}))
  .use(cors({
    allowedHeaders: [
      'accept-encoding',
      'accept-language',
      'accept',
      'access-control-allow-origin',
      'authorization',
      'cache-control',
      'connection',
      'content-length',
      'content-type',
      'dnt',
      'pragma',
      'range',
      'referer',
      'user-agent',
      'x-authorization',
      'x-http-method-override',
      'x-requested-with',
    ],
    credentials: true,
  }))
  .use(swagger({}))
  .use(setup)
  .post("/auth/verify", ({ body }) => generate(body),
    { body: t.Object({ address: t.String(), signature: t.String() }) }
  )
  .guard({
    beforeHandle: async ({ request }) => {
      let sessionId;
      let session;
      try {
        sessionId = auth.readSessionCookie(request.headers.get("cookie")) ?? "";
        session = await auth.validateSession(sessionId);
      } catch (e) {
        console.log(e);
      }
      if (!session) {
        return UNAUTHORIZED;
      }
    }
  }, (app) => app
    .post("/sign-out", ({ request, userId }) => signOut({ userId, cookie: request.headers.get("cookie") ?? "" }))
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
