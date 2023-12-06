import { logger } from '@bogeychan/elysia-logger';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { Elysia } from "elysia";
import { authenticated, unauthenticated } from './routes/auth';
import { UNAUTHORIZED, parseJSON } from './routes/response';
import { users } from './routes/users';
import { images } from './routes/v1/data';
import { auth } from './services';
import { setup } from './utils';

export const app = new Elysia()
  .use(
    cors({
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
        'git-protocol',
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
  .use(logger({}))
  .use(swagger({}))
  .get("/", () => parseJSON({ "message": "hello world" }))
  .use(unauthenticated)
  .use(setup)
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
    .derive(async ({ request }) => {
      let sessionId;
      let session;
      try {
        sessionId = auth.readSessionCookie(request.headers.get("cookie")) ?? "";
        session = await auth.validateSession(sessionId);
      } catch (e) {
        console.log(e);
      }
      return {
        userId: session?.user?.userId
      }
    })
    .use(authenticated)
    .use(images)
    .use(users)
  )
  .listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
