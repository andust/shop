import { cookies } from "next/headers";

export async function GET(req: Request, res: Response) {
  try {
    const res = await fetch(`${process.env.USER_SERIVCE}/api/v1/logout`, {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access=${cookies().get("access")?.value ?? ""}`,
      },
      method: "get",
    });

    if (res.ok) {
      cookies().delete("access");
      return Response.json("logged out", {
        status: 200,
        headers: { Cookie: "access=" },
      });
    }
  } catch (error) {
    console.error(error);
  }
  return Response.json("error", { status: 403 });
}
