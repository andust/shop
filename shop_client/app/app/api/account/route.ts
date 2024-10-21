import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function GET(req: Request, res: Response) {
  try {
    const access = cookies().get("access")?.value;

    const userResponse = await fetch(
      `${process.env.USER_SERIVCE}/api/v1/user`,
      {
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Cookie: `access=${access}`,
        },
        method: "get",
      },
    );

    if (userResponse.ok) {
      return NextResponse.json(await userResponse.json())
    }
  } catch (error) {
    console.error(error);
  }

  return Response.json("error", { status: 403 });
}
