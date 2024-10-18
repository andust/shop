import { cookies } from "next/headers";

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json();
    const res = await fetch(
      `${process.env.CATALOG_SERIVCE}/api/v1/basket/add-product`,
      {
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Cookie: `access=${cookies().get("access")?.value ?? ""}`,
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
