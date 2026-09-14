"use client";
import React, { FormEvent, useRef, useState } from "react";
import { logIn } from "@/actions/auth";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";
import { userActivity } from "@/actions/signUpDatabase";
import { getUser } from "@/actions/signUpDatabase";

type Status = "idle" | "sending" | "success" | "error";

export default function LoginForm() {
  const now = new Date();

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    try {
      const loginUser = await logIn(email, password);
      if (loginUser) {
        const userData = await getUser(loginUser.uid);
        userActivity({
          firstName: userData?.firstName as string,
          lastName: userData?.lastName as string,
          time: time,
          action: "LogedIn",
        });
      }

      // try {
      //   await emailjs.send(
      //     process.env.NEXT_PUBLIC_EMAILJS_SERVICE_KEY as string,
      //     process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_KEY as string,
      //     {
      //       name: user.name || "User",
      //       email: user.email,
      //     },
      //     process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string,
      //   );
      //   console.log("Email sent");
      // } catch (emailErr: any) {
      //   console.log("Email error text:", emailErr?.text);
      //   console.log("Full:", emailErr);
      // }

      setEmail("");
      setPassword("");
      router.push("/productpage");
    } catch (err: any) {
      setError(err.message);
      console.log(err.message);
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
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-[10px] border border-[#dce7e6] bg-[#f7fafa] px-4 py-3 text-sm text-[#172121] placeholder-[#899695] outline-none transition-all focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/30"
          />
          <input
            name="password"
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
