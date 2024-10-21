import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getUser } from "./app/_utils/fetch";
import { headerCookies } from "./app/_utils/cookie";

export async function middleware() {
  const unauthorizedResponse = new NextResponse("Unauthorized", {
    status: 401,
  });
  const access = cookies().get("access")?.value ?? "";

  if (!access.trim()) {
    return unauthorizedResponse;
  }
  try {
    const userResponse = await getUser(access);
    
    if (userResponse.ok) {
      const response = NextResponse.next();
      response.cookies.set({
        name: "access",
        value: headerCookies(userResponse.headers).access,
        maxAge: 24 * 60 * 60,
        httpOnly: true,
      });
      return response;
    }
  } catch (error) {
    console.error(error);
  }
  return unauthorizedResponse;
}

export const config = {
  matcher: [
    "/api/account/:path*",
    "/account",
    "/api/basket/add-product",
  ],
};