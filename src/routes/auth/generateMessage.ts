import { parseJSON } from "../response";

export default async function generateMessage({ address }: { address: string }) {
  return parseJSON({
    message:
      `You are signing into CompAR: 
      Address: ${address} 
      ID: ${crypto.randomUUID()}`
  }
  );
}