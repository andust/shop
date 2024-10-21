import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getValidToken } from "./app/_utils/fetch";

export async function middleware() {
  const unauthorizedResponse = new NextResponse("Unauthorized", {
    status: 401,
  });
  const access = cookies().get("access")?.value ?? "";

  if (!access.trim()) {
    return unauthorizedResponse;
  }
  try {
    const { validAccess, isFresh } = await getValidToken(access);

    if (!isFresh) {
      const response = NextResponse.next();
      response.cookies.set({
        name: "access",
        value: validAccess,
        maxAge: 24 * 60 * 60,
        httpOnly: true,
      });
      return response;
    }

    const response = NextResponse.next();
    response.cookies.set({
      name: "access",
      value: validAccess,
      maxAge: 24 * 60 * 60,
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.error(error);
  }

  unauthorizedResponse.cookies.set({
    name: "access",
    value: "",
    maxAge: -1,
    httpOnly: true,
  });
  return unauthorizedResponse;
}

export const config = {
  matcher: ["/api/account/:path*", "/account", "/api/basket/add-product"],
};
