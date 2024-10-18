import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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
    const tokenVerifyResponse = await fetch(
      `${process.env.USER_SERIVCE}/api/v1/token/verify`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          Cookie: `access=${access}`,
        },
      },
    );
    if (tokenVerifyResponse.ok) {
      return NextResponse.next();
    }

    const refreshResponse = await fetch(
      `${process.env.USER_SERIVCE}/api/v1/token/refresh`,
      {
        cache: "no-cache",
        headers: {
          Cookie: `access=${access}`,
        },
        method: "get",
      },
    );
    if (refreshResponse.ok) {
      const response = NextResponse.next();
      response.cookies.set({
        name: "access",
        value: headerCookies(refreshResponse.headers).access,
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
  matcher: ["/account", "/api/basket/add-product"],
};
