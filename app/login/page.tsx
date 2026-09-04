"use client";
import React, { useState } from "react";
import { login } from "@/actions/auth";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError("");
    try {
      const user = await login(email, password);
      alert("User Successfully LogedIn...");
      setEmail("");
      setPassword("");
      router.push("/productpage");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#f7fafa] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-[14px] border border-[#dce7e6] bg-white p-8 shadow-[0_6px_16px_rgba(20,40,40,0.1)]"
      >
        <h2 className="text-xl text-center font-bold text-[#172121]">Log In</h2>
        <p className="mt-1 text-sm text-center text-[#526161]">
          Welcome back, enter your details.
        </p>

        {error && (
          <p className="mt-4 rounded-[6px] bg-[#c2413b]/10 px-3 py-2 text-xs font-medium text-[#c2413b]">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-[10px] border border-[#dce7e6] bg-[#f7fafa] px-4 py-3 text-sm text-[#172121] placeholder-[#899695] outline-none transition-all focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/30"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-[10px] border border-[#dce7e6] bg-[#f7fafa] px-4 py-3 text-sm text-[#172121] placeholder-[#899695] outline-none transition-all focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/30"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-[10px] bg-[#0f766e] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0b625c] active:scale-95"
        >
          Log In
        </button>

        <p className="mt-5 text-center text-sm text-[#526161]">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-semibold text-[#0f766e] hover:text-[#0b625c]"
          >
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
