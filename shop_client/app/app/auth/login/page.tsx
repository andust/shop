import { redirect, RedirectType } from "next/navigation";
import { cookies } from "next/headers";

import LoginForm from "../../_molecules/login-form/LoginForm";

export default async function Login() {
  if (cookies().get("access")?.value ?? "") {
    redirect("/", RedirectType.replace);
  }
  return (
    <div className="container py-10">
      <h2 className="text-center text-3xl pb-5">Log in</h2>
      <LoginForm />
    </div>
  );
}
