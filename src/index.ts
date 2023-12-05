import { logger } from '@bogeychan/elysia-logger';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { Elysia } from "elysia";
import { UNAUTHORIZED } from './response';

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
  .guard({
    beforeHandle: async ({ request }) => {
      let sessionId;
      let session;
      try {
        
      } catch (e) {
        console.log(e);
      }
      if (!session) {
        return UNAUTHORIZED;
      }
    }
  }, (app) => app

  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
