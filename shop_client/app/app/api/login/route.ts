import { cookies } from "next/headers";
import { headerCookies } from "../../_utils/cookie";

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json();
    const res = await fetch(`${process.env.USER_SERIVCE}/api/v1/login`, {
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      method: "post",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const oneDay = 24 * 60 * 60 * 1000;
      cookies().set({
        name: "access",
        value: headerCookies(res.headers).access,
        httpOnly: true,
        expires: Date.now() + oneDay,
        path: "/",
      });
      return Response.json(await res.json(), { status: 200 });
    }
  } catch (error) {
    console.error(error);
  }
  return Response.json("error", { status: 403 });
}
