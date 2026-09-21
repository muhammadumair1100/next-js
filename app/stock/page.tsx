"use client";
import { getProducts } from "@/actions/products";
import { ProductsType } from "@/types/ProductsTypes";
import { useEffect, useState } from "react";
import { useAuth } from "@/contextAPI/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StockPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<ProductsType[]>([]);

  const totalStock = products.reduce((acc, p) => acc + (p.Qty ?? 0), 0);
  const totalSold = products.reduce((acc, p) => acc + (p.sold ?? 0), 0);
  const totalProfit = products.reduce(
    (acc, p) =>
      acc + (Number(p.sellingPrice) - Number(p.price)) * (p.sold ?? 0),
    0,
  );
  const remaining = totalStock - totalSold;

  useEffect(() => {
    async function getData() {
      try {
        if (user) {
          const data = await getProducts(user.uid);
          setProducts(data);
        }
      } catch (err: any) {
        console.log(err.message);
      }
    }
    getData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-teal-100 border-t-teal-600"></div>
          <p className="text-sm font-medium text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50/30 px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
          {/* Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          {/* Text */}
          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            Login Required
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            You need to be logged in to view your stock. Please login to
            continue.
          </p>

          {/* Button */}
          <Link
            href="/login"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/30 transition-all hover:bg-teal-700 hover:shadow-teal-700/40 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            Go to Login
          </Link>

          {/* Ya Signup */}
          <p className="mt-4 text-xs text-slate-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-teal-600 hover:text-teal-700"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Stock Management
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Track your inventory, sales and profit
            </p>
          </div>
          <Link
            href={"/productpage"}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/30 transition-all hover:bg-teal-700 hover:shadow-teal-700/40 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Product
          </Link>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Stock */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Total Stock
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">
              {totalStock}
            </p>
            <p className="mt-1 text-xs text-slate-500">items total</p>
          </div>

          {/* Sold */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Sold
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">
              {totalSold}
            </p>
            <p className="mt-1 text-xs text-slate-500">items sold</p>
          </div>

          {/* Remaining */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Remaining
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">
              {remaining}
            </p>
            <p className="mt-1 text-xs text-slate-500">items left</p>
          </div>

          {/* Profit */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Profit
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-teal-600">
              ${totalProfit}
            </p>
            <p className="mt-1 text-xs text-slate-500">earned</p>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <select className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Accessories</option>
            </select>
            <select className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500">
              <option>Sort: Latest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Cost
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Sell
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Sold
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Profit
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.length > 0 &&
                  products.map((p) => (
                    <tr
                      key={p.id}
                      className={`transition-colors ${p.Qty! < 3 ? "bg-red-50/40 hover:bg-red-50/70" : "bg-slate-50/40 hover:bg-slate-50/70"}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {p.Qty! < 3 ? (
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-50 to-red-100 text-sm font-bold text-red-600">
                              U
                            </div>
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 text-sm font-bold text-purple-600">
                              {p.name.charAt(0).toUpperCase()}
                            </div>
                          )}

                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {p.name}
                            </p>
                            {p.Qty! < 3 ? (
                              <p className="text-xs text-red-500 font-medium">
                                ⚠️ Low stock
                              </p>
                            ) : (
                              <p className="text-xs text-slate-500">
                                {p.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        ${Number(p.price).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                        ${Number(p.sellingPrice).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        {p.Qty! < 3 ? (
                          <span className="inline-flex rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                            2
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                            {p.Qty}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                          {p.sold}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-teal-600">
                        +$
                        {(
                          (Number(p.sellingPrice) - Number(p.price)) *
                          (p.sold ?? 0)
                        ).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="rounded-md p-2 text-slate-400 transition-colors hover:bg-green-50 hover:text-green-600"
                            title="Sell"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </button>
                          <button
                            className="rounded-md p-2 text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                            title="Edit"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            className="rounded-md p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                            title="Delete"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/50 px-6 py-4">
            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {products.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {products.length}
              </span>{" "}
              products
            </p>
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50">
                Previous
              </button>
              <button className="rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-medium text-white">
                1
              </button>
              <button className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
