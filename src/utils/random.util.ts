import { v4 as uuidv4 } from "uuid";

export function generateShortId(length: number) {
  const uuid = uuidv4().replace(/-/g, "");
  const shortId = uuid.substring(0, length);

  return shortId;
}
