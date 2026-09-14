"use client";
import Link from "next/link";
import { useActivity } from "@/contextAPI/ActivityContent";

export default function HomeDashboard() {
  const { userActivity } = useActivity();
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

        {/* Recent activity */}
        <div className="mt-8 rounded-[14px] border border-[#dce7e6] bg-white shadow-[0_2px_6px_rgba(20,40,40,0.07)]">
          <div className="border-b border-[#dce7e6] px-5 py-4">
            <h2 className="text-sm font-bold text-[#172121]">
              Recent Activity
            </h2>
          </div>
          <ul className="divide-y max-h-[400px] overflow-y-scroll scrollbar-none divide-[#dce7e6]">
            {userActivity.length > 0 &&
              userActivity.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between px-5 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ecf8f7] text-sm font-semibold text-[#0f766e]">
                      {item.firstName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm tracking-wider font-mono  text-[#172121]">
                        {item.firstName} {item.lastName}
                      </p>
                      <p className="text-xs font-extrabold text-[#526161]">
                        {item.action}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-normal text-[#899695]">
                    {item.time}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </main>
    </section>
  );
}
