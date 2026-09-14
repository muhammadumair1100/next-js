"use client";
import { SignupTypes } from "@/types/AuthTypes";
import React, { useState } from "react";
import { signUp } from "@/actions/auth";
import { getUser, registerUser, userActivity } from "@/actions/signUpDatabase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/Auth";
import { useActivity } from "@/contextAPI/ActivityContent";
import { useAuth } from "@/contextAPI/AuthContext";

export default function SignupForm() {
  const now = new Date();

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const { setUserActivity } = useActivity();
  const { user } = useAuth();

  const [signupForm, setSignupForm] = useState<SignupTypes>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  function handleInputFields(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setSignupForm({ ...signupForm, [name]: value });
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError("");

    if (
      !signupForm.firstName &&
      !signupForm.lastName &&
      !signupForm.email &&
      !signupForm.password
    ) {
      setError("Fill all the fields");
      return;
    }
    try {
      const registerUser = await signUp(signupForm);

      if (registerUser) {
        const userData = await getUser(registerUser.uid);
        userActivity({
          firstName: userData?.firstName as string,
          lastName: userData?.lastName as string,
          time: time,
          action: "Registered",
        });
      }

      setSignupForm({
        ...signupForm,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
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
        <h2 className="text-xl font-bold text-center text-[#172121]">
          Sign Up
        </h2>
        <p className="mt-1 text-sm text-center text-[#526161]">
          Create your account to get started.
        </p>

        {error && (
          <p className="mt-4 rounded-[6px] bg-[#c2413b]/10 px-3 py-2 text-xs font-medium text-[#c2413b]">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex gap-3">
            <input
              type="text"
              name="firstName"
              value={signupForm.firstName}
              onChange={handleInputFields}
              placeholder="First Name"
              className="w-1/2 rounded-[10px] border border-[#dce7e6] bg-[#f7fafa] px-4 py-3 text-sm text-[#172121] placeholder-[#899695] outline-none transition-all focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/30"
            />
            <input
              type="text"
              name="lastName"
              value={signupForm.lastName}
              onChange={handleInputFields}
              placeholder="Last Name"
              className="w-1/2 rounded-[10px] border border-[#dce7e6] bg-[#f7fafa] px-4 py-3 text-sm text-[#172121] placeholder-[#899695] outline-none transition-all focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/30"
            />
          </div>
          <input
            type="email"
            name="email"
            value={signupForm.email}
            onChange={handleInputFields}
            placeholder="Email"
            className="w-full rounded-[10px] border border-[#dce7e6] bg-[#f7fafa] px-4 py-3 text-sm text-[#172121] placeholder-[#899695] outline-none transition-all focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/30"
          />
          <input
            type="password"
            name="password"
            value={signupForm.password}
            onChange={handleInputFields}
            placeholder="Password"
            className="w-full rounded-[10px] border border-[#dce7e6] bg-[#f7fafa] px-4 py-3 text-sm text-[#172121] placeholder-[#899695] outline-none transition-all focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/30"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-[10px] bg-[#0f766e] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0b625c] active:scale-95"
        >
          Sign Up
        </button>

        <p className="mt-5 text-center text-sm text-[#526161]">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-[#0f766e] hover:text-[#0b625c]"
          >
            Log In
          </a>
        </p>
      </form>
    </div>
  );
}
