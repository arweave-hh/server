import { parseJSON } from "../response";
import crypto from "crypto";

export default function generate({ address }: { address: string }) {
  const id = crypto.randomUUID();
  return parseJSON({
    message: `You are signing into Arweave \n 
              Address: ${address}
              ID: ${id}`
  });
}
