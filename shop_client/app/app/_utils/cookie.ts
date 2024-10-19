export const headerCookies = (headers: Headers): Record<string, string> => {
  const result: Record<string, string> = {};
  headers.getSetCookie().forEach((value) => {
    const [k, v] = value.split("=");
    if (k === "access") {
      result[k] = v.split("; Path")[0];
    } else {
      result[k] = v;
    }
  });

  return result;
};
