import { User } from "lucia";
import { getUserByAddress } from "../../repository";
import { auth } from "../../services";
import { verifySignature } from "../../utils";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../response";

async function signUpUser({ address }: { address: string }): Promise<User> {
  return await auth.createUser({
    key: {
      providerId: "address",
      providerUserId: address.toLocaleLowerCase(),
      password: address
    },
    attributes: {
      address
    }
  });
}

async function signInUser({ address }: { address: string }) {
  return await auth.useKey(
    "address",
    address.toLocaleLowerCase(),
    address
  );
}

export default async function verify({ address, signature }: { address: string; signature: string; }) {
  if (verifySignature({ signature, address })) {
    try {
      const user = await getUserByAddress({ address });
      let key;
      if (user) {
        key = await signInUser({ address });
      } else {
        key = await signUpUser({ address });
      }
      if (!key) {
        throw Error("Failed to create key");
      }
      const session = await auth.createSession({
        userId: key.userId,
        attributes: { address }
      });
      const sessionCookie = auth.createSessionCookie(session);
      return new Response(null, {
        headers: {
          "Set-Cookie": sessionCookie.serialize() // store session cookie
        },
        status: 204
      });
    } catch (e) {
      console.log(e);
      return INTERNAL_SERVER_ERROR;
    }
  }
  return BAD_REQUEST;
}