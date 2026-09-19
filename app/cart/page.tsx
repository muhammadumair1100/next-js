"use client";

import { getFromCart } from "@/actions/products";
import { useAuth } from "@/contextAPI/AuthContext";
import { ProductsType } from "@/types/ProductsTypes";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import { deleteFromCart } from "@/actions/products";
import { updateProduct } from "@/actions/products";

export default function CartPage() {
  const { user } = useAuth();
  const [cartData, setCartData] = useState<ProductsType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        if (user) {
          const data = await getFromCart(user.uid);
          setCartData([...data]);
        }
      } catch (err: any) {
        setError("Failed To Fetch Data...");
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [user]);

  // ⭐ Calculations
  const subtotal = cartData.reduce(
    (acc, item) => acc + item.sellingPrice! * (item.userQty || 1),
    0,
  );
  const shipping = cartData.length > 0 ? 50 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  function handleIncrease(id?: string) {
    setCartData((prev) =>
      prev.map((i) => {
        if (i.id === id && (i.Qty ?? 0) > 0) {
          return {
            ...i,
            userQty: (i.userQty ?? 0) + 1,
            sold: (i.userQty ?? 0) + 1,
            Qty: (i.Qty ?? 0) - 1,
          };
        }
        return i;
      }),
    );
  }

  function handleDecrease(id?: string) {
    setCartData((prev) =>
      prev.map((i) => {
        if (i.id === id && (i.userQty ?? 0) > 1) {
          return {
            ...i,
            userQty: (i.userQty ?? 0) - 1,
            sold: (i.userQty ?? 0) - 1,
            Qty: (i.Qty ?? 0) + 1,
          };
        }
        return i;
      }),
    );
  }
  async function handleDelete(id?: string, proID?: string) {
    if (!confirm("Are you sure you want to remove this product?")) return;

    try {
      await deleteFromCart(id!);
      if (user) {
        const data = await getFromCart(proID!);
        setCartData([...data]);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  }

  async function handleSellOut() {
    try {
      await updateProduct(cartData);
      console.log("done");
    } catch (err: any) {
      console.log(err.message);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-teal-100 border-t-teal-600"></div>
        </div>
        <p className="mt-6 text-sm font-medium text-slate-500">
          Loading your cart...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <p className="mt-6 text-sm font-medium text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Your Cart
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Review your items before checkout
            </p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-lg shadow-teal-600/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {cartData.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Your cart is empty
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Add some products to get started
                  </p>
                </div>
              ) : (
                cartData.map((data) => (
                  <div
                    key={data.id}
                    className="group flex items-center gap-5 border-b border-slate-100 p-5 transition-colors last:border-b-0 hover:bg-slate-50/70"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 text-xl font-bold text-purple-600">
                      {data.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-slate-900">
                        {data.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500 line-clamp-1">
                        {data.description}
                      </p>

                      <div className="mt-3 inline-flex items-center rounded-lg border border-slate-200 bg-slate-50">
                        <button
                          onClick={() => handleDecrease(data.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-l-lg text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700 active:scale-95"
                          title="Decrease"
                        >
                          <Minus size={14} strokeWidth={2.5} />
                        </button>

                        <span className="flex h-7 w-9 items-center justify-center border-x border-slate-200 bg-white text-xs font-semibold text-slate-900">
                          {data.userQty || 1}
                        </span>

                        <button
                          onClick={() => handleIncrease(data.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-r-lg text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700 active:scale-95"
                          title="Increase"
                        >
                          <Plus size={14} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-slate-900">
                        $
                        {(
                          Number(data.sellingPrice) * (data.userQty || 1)
                        ).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleDelete(data.id!, data.productID)}
                        className="mt-2 rounded-md p-2 text-slate-400 cursor-pointer hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Continue Shopping */}
            <button className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Continue Shopping
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-medium text-slate-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Shipping</span>
                  <span className="font-medium text-slate-900">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Tax (5%)</span>
                  <span className="font-medium text-slate-900">
                    ${tax.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="my-6 border-t border-dashed border-slate-200" />

              <div className="flex justify-between">
                <span className="text-base font-semibold text-slate-900">
                  Total
                </span>
                <span className="text-2xl font-bold text-teal-600">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleSellOut}
                disabled={cartData.length === 0}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/30 transition-all hover:bg-teal-700 hover:shadow-teal-700/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Final Sell Out
              </button>

              <p className="mt-3 text-center text-xs text-slate-400">
                Secure checkout · 30-day returns
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
