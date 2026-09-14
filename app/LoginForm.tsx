"use client";
import { Dispatch, useState, SetStateAction } from "react";
import { logIn } from "@/actions/auth";

export function LoginForm({
  signup,
}: {
  signupValue: string;
  signup: Dispatch<SetStateAction<string>>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.ChangeEvent) => {
    e.preventDefault();

    try {
      const user = await logIn(email, password);
      alert("Successfully LogedIn");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      alert(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex max-w-md top-2/4 left-2/4 -translate-2/4 items-center flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
    >
      <h2 className="text-xl font-bold text-slate-900">Login</h2>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="text"
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
      />

      <button
        type="submit"
        className="mt-2 w-full rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-700 active:scale-95"
      >
        Login
      </button>
      <div className="text-[13px] flex gap-2">
        Don't have an account?{" "}
        <span
          onClick={() => signup("SIGNUP")}
          className="font-bold hover:underline cursor-pointer hover:text-teal-600"
        >
          Signup
        </span>
      </div>
    </form>
  );
}
