import Elysia from "elysia";

export const setup = new Elysia({ name: 'setup' })
  .decorate("userId", "" as string)

export function verifySignature({address, signature}: {address: string; signature: string;}): boolean {
  return true;
}
