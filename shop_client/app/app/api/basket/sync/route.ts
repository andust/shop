import { headerCookies } from "../../../_utils/cookie";

export async function POST(req: Request, res: Response) {
  const access = headerCookies(req.headers).access ?? "";

  try {
    const data = await req.json();
    data.userID = req.headers.get("x-uid");

    const res = await fetch(
      `${process.env.BASKET_SERIVCE}/api/v1/sync`,
      {
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Cookie: `access=${access}`,
        },
        method: "post",
        body: JSON.stringify(data),
      },
    );

    if (res.ok) {
      return Response.json(await res.json(), { status: 200 });
    }
  } catch (error) {
    console.error(error);
  }
  return Response.json("error", { status: 403 });
}
