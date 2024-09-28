"use client";

import { FormEvent, useState } from "react";
import Input from "../../_atoms/input/Input";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const res = await fetch(
        "http://localhost:7008/api/v1/login",
        { cache: "no-cache", headers: { "Content-Type": "application/json" }, method: "post", body: JSON.stringify({ email, password}) },
      );
      const sss = await res.json();
      console.log(sss);
      
    } catch (error) {
      
    }
  };

  const onChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLFormElement;
    const setState = { email: setEmail, password: setPassword }[target.name];
    if (setState) {
      setState(target.value);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label>
        <small className="text-slate-500">Email</small>
        <Input
          name="email"
          value={email}
          onChange={onChangeHandler}
          placeholder="Email"
        />
      </label>
      <label>
        <small className="text-slate-500">Password</small>
        <Input
          name="password"
          value={password}
          onChange={onChangeHandler}
          type="password"
          placeholder="password"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
