import { logger } from '@bogeychan/elysia-logger';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { Elysia, t } from "elysia";
import { authenticated, authentication } from './routes/auth';
import { UNAUTHORIZED, parseJSON } from './routes/response';
import { auth } from './services';
import { setup } from './utils';
import signOut from './routes/auth/signOut';

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
  .get("/", () => parseJSON({"message": "hello world"}))
  .use(setup)
  .use(authentication)
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
  .use(authenticated)
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
