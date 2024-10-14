export const headerCookies = (headers: Headers): Record<string, string> => {
  const result: Record<string, string> = {};
  headers.getSetCookie().forEach((value) => {
    const [k, v] = value.split("=");
    result[k] = v;
  });

  return result;
};
