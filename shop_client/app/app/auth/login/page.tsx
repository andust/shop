import LoginForm from "../../_molecules/login-form/LoginForm";

export default async function Login() {

  return (
    <div className="container py-10">
      <h2 className="text-center text-3xl pb-5">Log in</h2>
      <LoginForm />
    </div>
  );
}
