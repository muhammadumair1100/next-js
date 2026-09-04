// "use client";
// import { useState } from "react";
// import { SignupForm } from "./SignupForm";
// import { LoginForm } from "./LoginForm";

// export default function Home() {
//   const [signUpLogIn, setSignUpLogIn] = useState("SIGNUP");
//   return (
//     // This section is for firestore and realtime databases
//     // <div className="text-lg mt-10 w-5/12 h-80 flex  flex-col items-center rounded-md justify-center font-medium bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)]">
//     //   <h1 className="text-gray-500">
//     //     Want To Create Post?{" "}
//     //     <span className="uppercase text-black">Click Post Button!</span>
//     //   </h1>
//     //   <h1 className="text-gray-500">
//     //     Want To Watch Post?{" "}
//     //     <span className="uppercase text-black">Click Watch Button!</span>
//     //   </h1>
//     // </div>

//     // This section is for Authentication
//     // <>
//     //   {signUpLogIn === "SIGNUP" ? (
//     //     <SignupForm loginValue={signUpLogIn} login={setSignUpLogIn} />
//     //   ) : (
//     //     <LoginForm signupValue={signUpLogIn} signup={setSignUpLogIn} />
//     //   )}
//     // </>
//   );
// }
"use client";
import React from "react";
import {
  Bell,
  Search,
  LayoutDashboard,
  Users,
  FileText,
  Settings,
} from "lucide-react";
import Link from "next/link";

export default function HomeDashboard() {
  const stats = [
    { label: "Total Users", value: "1,284" },
    { label: "Active Today", value: "312" },
    { label: "Pending Sessions", value: "18" },
  ];

  const activity = [
    { name: "Umair Khan", action: "Signed up", time: "2m ago" },
    { name: "Sara Ahmed", action: "Logged in", time: "14m ago" },
    { name: "Ali Raza", action: "Updated profile", time: "1h ago" },
    { name: "Fatima Noor", action: "Signed up", time: "3h ago" },
  ];

  return (
    <section className="min-h-screen w-full bg-[#f7fafa]">
      {/* Navbar */}
      <header className="flex w-full items-center justify-between border-b border-[#dce7e6] bg-white px-6 py-4 lg:px-10">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#0f766e] text-sm font-bold text-white">
            A
          </div>
          <span className="text-lg font-bold text-[#172121]">Authly</span>
        </div>

        {/* Nav links */}
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#" className="text-sm font-medium text-[#172121]">
            Dashboard
          </a>

          <a
            href="#"
            className="text-sm font-medium text-[#526161] transition-colors hover:text-[#0f766e]"
          >
            Users
          </a>

          <a
            href="#"
            className="text-sm font-medium text-[#526161] transition-colors hover:text-[#0f766e]"
          >
            Reports
          </a>

          <a
            href="#"
            className="text-sm font-medium text-[#526161] transition-colors hover:text-[#0f766e]"
          >
            Settings
          </a>
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          <Link
            href={"/login"}
            className="rounded-[10px] cursor-pointer border border-[#dce7e6] bg-white px-4 py-2 text-sm font-semibold text-[#172121] shadow-[0_2px_6px_rgba(20,40,40,0.07)] transition-all hover:border-[#0f766e] hover:text-[#0f766e] active:scale-95"
          >
            Log In
          </Link>
          <Link
            href={"/signup"}
            className="rounded-[10px] cursor-pointer bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white shadow-[0_2px_6px_rgba(20,40,40,0.07)] transition-all hover:bg-[#0b625c] active:scale-95"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
        {/* Greeting */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-[#172121]">Welcome back</h1>
          <p className="text-sm text-[#526161]">
            Here's what's happening with your users today.
          </p>
        </div>

        {/* Stats row */}
        {/* <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="rounded-[14px] border border-[#dce7e6] bg-white p-5 shadow-[0_2px_6px_rgba(20,40,40,0.07)]"
            >
              <p className="text-xs font-medium text-[#899695]">{stat.label}</p>
              <p className="mt-2 text-2xl font-bold text-[#172121]">
                {stat.value}
              </p>
            </div>
          ))}
        </div> */}

        {/* Recent activity */}
        <div className="mt-8 rounded-[14px] border border-[#dce7e6] bg-white shadow-[0_2px_6px_rgba(20,40,40,0.07)]">
          <div className="border-b border-[#dce7e6] px-5 py-4">
            <h2 className="text-sm font-bold text-[#172121]">
              Recent Activity
            </h2>
          </div>
          {/* <ul className="divide-y divide-[#dce7e6]">
            {activity.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ecf8f7] text-sm font-semibold text-[#0f766e]">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#172121]">
                      {item.name}
                    </p>
                    <p className="text-xs text-[#526161]">{item.action}</p>
                  </div>
                </div>
                <span className="text-xs text-[#899695]">{item.time}</span>
              </li>
            ))}
          </ul> */}
        </div>
      </main>
    </section>
  );
}
