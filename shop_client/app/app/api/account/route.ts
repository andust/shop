import { cookies } from "next/headers";
import { decode } from "../../_utils/jwt";

export async function GET(req: Request, res: Response) {
  try {
    return Response.json(decode(cookies().get("access")?.value ?? "").payload, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
  }

  return Response.json("error", { status: 403 });
}
