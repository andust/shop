import { TextDecoder } from "util";

export const decode = (jwt: string) => {
  const {
    0: encodedHeader,
    1: encodedPayload,
    2: signature,
    length,
  } = jwt.split(".");

  if (length !== 3) {
    throw new TypeError("invalid jwt");
  }

  const decode = (input: string): JSON => {
    return JSON.parse(
      new TextDecoder().decode(new Uint8Array(Buffer.from(input, "base64"))),
    );
  };

  return {
    header: decode(encodedHeader),
    payload: decode(encodedPayload),
    signature: signature,
  };
};
