import { irys } from "../../../services/irys";
import { Metadata } from "../../../types";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, parseJSON } from "../../response";

export default async function upload({ data, metadata }: { data: Buffer, metadata: Metadata }): Promise<Response> {
  if (!data) {
    return NOT_FOUND;
  }
  try {
    const receipt = await irys.upload(data);
    return parseJSON({ ...receipt });
  } catch (e) {
    console.log(e);
  }
  return INTERNAL_SERVER_ERROR;

}