"use client";
import { Dispatch, SetStateAction, useState, ChangeEvent } from "react";
import { signUp } from "@/actions/auth";
import { SignUpTypes } from "@/types/AuthTypes";
import { registerUser } from "@/actions/signUpDatabase";

export function SignupForm({
  login,
}: {
  loginValue: string;
  login: Dispatch<SetStateAction<string>>;
}) {
  const [signUpForm, setSignUpForm] = useState<SignUpTypes>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  // Handle All Signup Input Fields
  function handleInputFields(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setSignUpForm({ ...signUpForm, [name]: value });
  }

  // Handle When All The Fields Are Typed And Clicked Submit
  const handleSubmit = async (e: React.ChangeEvent) => {
    e.preventDefault();

    try {
      const userCredential = await signUp(
        signUpForm.email,
        signUpForm.password,
      );

      const uid = userCredential?.user.uid;

      await registerUser(uid, {
        firstName: signUpForm.firstName,
        lastName: signUpForm.lastName,
        phoneNumber: signUpForm.phoneNumber,
      });

      alert("Successfully Registered");
      setSignUpForm({
        ...signUpForm,
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
      });
    } catch (err: any) {
      alert(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex max-w-md top-2/4 left-2/4 -translate-2/4 items-center flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
    >
      <h2 className="text-xl font-bold text-slate-900">Sign Up</h2>

      <input
        value={signUpForm.firstName}
        onChange={handleInputFields}
        placeholder="First Name"
        name="firstName"
        type="text"
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
      />
      <input
        value={signUpForm.lastName}
        onChange={handleInputFields}
        placeholder="Last Name"
        name="lastName"
        type="text"
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
      />
      <input
        value={signUpForm.phoneNumber}
        onChange={handleInputFields}
        placeholder="Phone Number"
        name="phoneNumber"
        type="text"
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
      />
      <input
        value={signUpForm.email}
        onChange={handleInputFields}
        placeholder="Email"
        name="email"
        type="text"
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
      />
      <input
        value={signUpForm.password}
        onChange={handleInputFields}
        type="password"
        name="password"
        placeholder="Password"
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
      />

      <button
        type="submit"
        className="mt-2 w-full rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-700 active:scale-95"
      >
        Sign Up
      </button>
      <div className="text-[13px] flex gap-2">
        Alread have an account?{" "}
        <span
          onClick={() => login("LOGIN")}
          className="font-bold hover:underline cursor-pointer hover:text-teal-600"
        >
          Login
        </span>
      </div>
    </form>
  );
}
