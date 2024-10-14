import { cookies } from "next/headers";
import { headerCookies } from "../../_utils/cookie";

export async function POST(req: Request, res: Response) {
  const data = await req.json();

  try {
    const res = await fetch("http://shop_user_service:7008/api/v1/login", {
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      method: "post",
      body: JSON.stringify(data),
    });
    if (res.ok) {
      cookies().set({
        name: "access",
        value: headerCookies(res.headers).access,
        httpOnly: true,
        path: "/",
      });
    }

    return Response.json("error", { status: 403 });
  } catch (error) {
    console.error(error);
  }
  return Response.json("ok", { status: 200 });
}
