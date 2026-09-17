"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contextAPI/AuthContext"; // ⭐ ab andar hai
import Link from "next/link";
import { getUser, userActivity } from "@/actions/signUpDatabase";
import { logOut } from "@/actions/auth";
import {
  Activity,
  Settings,
  ShoppingCart,
  Package,
  ChevronDown,
  LogIn,
  LogOut,
  UserPlus,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth(); // ⭐ ab andar hai — chalega

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { name: "Activity", href: "/", icon: Activity },
    { name: "Cart", href: "/cart", icon: ShoppingCart },
    { name: "Stock", href: "/stock", icon: Package },
  ];

  const settingsItems = [
    { name: "Sign Up", href: "/signup", icon: UserPlus },
    { name: "Login", href: "/login", icon: LogIn },
    { name: "Logout", href: "/logout", icon: LogOut },
  ];

  async function handleLogOut() {
    if (user) {
      const userData = await getUser(user.uid);
      if (!confirm("Are you sure! want to signout?")) return;
      if (userData) {
        userActivity({
          firstName: userData.firstName,
          lastName: userData.lastName,
          time: time,
          action: "LogedOut",
        });
      }
    }
    await logOut();
    router.push("/");
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-md lg:hidden"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay (mobile) */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`top-0 left-0 z-40 flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white shadow-sm transition-transform lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } fixed lg:relative`}
      >
        {/* Logo */}
        <div className="flex h-17.5 items-center gap-3 border-b border-slate-100 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white shadow-md shadow-teal-600/30">
            <Package size={18} />
          </div>
          <span className="text-lg font-bold text-slate-900">Inventory</span>
        </div>

        {/* Navigation */}
        <nav className="relative flex-1 border-5 border-white bg-white px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Menu
          </p>

          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? "bg-teal-50 text-teal-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={
                        active
                          ? "text-teal-600"
                          : "text-slate-400 group-hover:text-slate-600"
                      }
                    />
                    {item.name}
                  </Link>
                </li>
              );
            })}

            {/* Settings with Hover Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setSettingsOpen(true)}
              onMouseLeave={() => setSettingsOpen(false)}
            >
              <button
                className={`group flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  settingsOpen
                    ? "bg-slate-50 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Settings
                    size={18}
                    className={
                      settingsOpen
                        ? "text-slate-600"
                        : "text-slate-400 group-hover:text-slate-600"
                    }
                  />
                  Settings
                </div>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform ${
                    settingsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {settingsOpen && (
                <ul className="absolute left-full top-0 z-50 ml-1 w-44 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
                  {settingsItems.map((item) => {
                    const Icon = item.icon;
                    return item.name === "Logout" ? (
                      <li
                        onClick={handleLogOut}
                        key={item.name}
                        className="flex cursor-pointer items-center gap-3 px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                      >
                        <Icon size={16} className="text-slate-400" />
                        {item.name}
                      </li>
                    ) : (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                        >
                          <Icon size={16} className="text-slate-400" />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-100 p-4">
          <div className="rounded-lg bg-gradient-to-br from-teal-50 to-teal-100 p-3">
            <p className="text-xs font-semibold text-teal-900">
              Inventory Manager
            </p>
            <p className="mt-1 text-xs text-teal-700">v1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}
