export default {
  schema: "./src/schema.js",
  driver: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN
  },
  out: "./migrations/",
  verbose: true,
  strict: true,
}
