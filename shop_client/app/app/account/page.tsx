import { cookies } from "next/headers";
import { User } from "../_models/user";

const Account = async () => {
  const access = cookies().get("access")?.value ?? "";

  try {
    const response = await fetch(`${process.env.CLIENT_SERIVCE}/api/account`, {
      cache: "no-cache",

      headers: {
        "Content-Type": "application/json",
        Cookie: `access=${access}`,
      },
      credentials: "include",
      method: "get",
    });
    if (response.ok) {
      const user: User = await response.json();
      return (
        <h1 className="text-xl">
          Hello{" "}
          <strong>
            {user.username} ({user.email})
          </strong>
        </h1>
      );
    }
  } catch (error) {
    return <p>Error!</p>;
  }
  return <div>Loading</div>;
};

export default Account;
