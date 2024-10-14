import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { headerCookies } from "./app/_utils/cookie";

export async function middleware(request: NextRequest) {
  const access = cookies().get("access")?.value ?? "";
  
  if (!access.trim()) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  try {
    const tokenVerifyResponse = await fetch(
      "http://shop_user_service:7008/api/v1/token/verify",
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
      `http://shop_user_service:7008/api/v1/token/refresh`,
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
    return NextResponse.redirect(new URL("/auth/login", request.url));
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/account",
};
