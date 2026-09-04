"use client";
import React, { useState, useEffect } from "react";
import { Package, Plus, Trash2 } from "lucide-react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/Auth";
import { addProducts, getProducts } from "@/actions/products";
import { ProductsType } from "@/types/ProductsTypes";

export default function ProductsPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [products, setProducts] = useState<ProductsType[] | undefined>([]);
  const [fields, setFields] = useState<ProductsType>({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        getProduct(user.uid);
      } else {
        setCurrentUser(null);
        setProducts([]);
      }
    });

    return () => unsubscribe();
  }, []);

  function handleInputFields(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  }

  async function getProduct(userId: string) {
    try {
      const pro = await getProducts(userId);
      setProducts(pro);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!currentUser) {
      console.log("No authenticated user found.");
      return;
    }

    if (fields.name && fields.price && fields.description) {
      try {
        await addProducts(fields, currentUser.uid);
        setFields({ name: "", price: "", description: "" });
        await getProduct(currentUser.uid);
      } catch (err: any) {
        console.log(err.message);
      }
    }
  }

  function handleDelete(id: string) {
    console.log("Deleting product ID:", id);
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-[#f7fafa] px-6 py-10 lg:px-10">
      {" "}
      <div className="mx-auto w-[70%]">
        {" "}
        {/* Header */}{" "}
        <div className="flex flex-col gap-1">
          {" "}
          <h1 className="text-2xl font-bold text-[#172121]">Products</h1>{" "}
          <p className="text-sm text-[#526161]">
            {" "}
            Add and manage your product catalog.{" "}
          </p>{" "}
        </div>{" "}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[380px_1fr]">
          {" "}
          {/* Add Product Form */}{" "}
          <form
            onSubmit={handleSubmit}
            className="h-fit rounded-[14px] border border-[#dce7e6] bg-white p-6 shadow-[0_2px_6px_rgba(20,40,40,0.07)]"
          >
            {" "}
            <h2 className="text-base font-bold text-[#172121]">
              Add Product
            </h2>{" "}
            <div className="mt-5 flex flex-col gap-4">
              {" "}
              <div>
                {" "}
                <label className="text-xs font-semibold text-[#526161]">
                  {" "}
                  Product Name{" "}
                </label>{" "}
                <input
                  type="text"
                  name="name"
                  value={fields.name}
                  onChange={handleInputFields}
                  placeholder="e.g. Wireless Mouse"
                  className="mt-1.5 w-full rounded-[10px] border border-[#dce7e6] bg-[#f7fafa] px-4 py-3 text-sm text-[#172121] placeholder-[#899695] outline-none transition-all focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/30"
                />{" "}
              </div>{" "}
              <div>
                {" "}
                <label className="text-xs font-semibold text-[#526161]">
                  {" "}
                  Price{" "}
                </label>{" "}
                <input
                  type="number"
                  name="price"
                  value={fields.price}
                  onChange={handleInputFields}
                  placeholder="e.g. 25.99"
                  className="mt-1.5 w-full rounded-[10px] border border-[#dce7e6] bg-[#f7fafa] px-4 py-3 text-sm text-[#172121] placeholder-[#899695] outline-none transition-all focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/30"
                />{" "}
              </div>{" "}
              <div>
                {" "}
                <label className="text-xs font-semibold text-[#526161]">
                  {" "}
                  Description{" "}
                </label>{" "}
                <input
                  type="text"
                  name="description"
                  value={fields.description}
                  onChange={handleInputFields}
                  placeholder="Short description..."
                  className="mt-1.5 w-full resize-none rounded-[10px] border border-[#dce7e6] bg-[#f7fafa] px-4 py-3 text-sm text-[#172121] placeholder-[#899695] outline-none transition-all focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/30"
                />{" "}
              </div>{" "}
            </div>{" "}
            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#0f766e] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0b625c] active:scale-95"
            >
              {" "}
              <Plus size={16} /> Add Product{" "}
            </button>{" "}
          </form>{" "}
          {/* Products List */}{" "}
          <div className="rounded-[14px] border border-[#dce7e6] bg-white shadow-[0_2px_6px_rgba(20,40,40,0.07)]">
            {" "}
            <div className="border-b border-[#dce7e6] px-5 py-4">
              {" "}
              <h2 className="text-sm font-bold text-[#172121]">
                {" "}
                Your Products ({products?.length}){" "}
              </h2>{" "}
            </div>{" "}
            {products?.length === 0 ? (
              <div className="flex flex-col mt-20 items-center justify-center gap-2 px-5 py-16 text-center">
                {" "}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ecf8f7] text-[#0f766e]">
                  {" "}
                  <Package size={22} />{" "}
                </div>{" "}
                <p className="text-sm font-medium text-[#172121]">
                  {" "}
                  No products yet{" "}
                </p>{" "}
                <p className="text-xs text-[#899695]">
                  {" "}
                  Add your first product using the form.{" "}
                </p>{" "}
              </div>
            ) : (
              <ul className="divide-y divide-[#dce7e6]">
                {" "}
                {products?.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-start justify-between gap-4 px-5 py-4"
                  >
                    {" "}
                    <div className="flex items-start gap-3">
                      {" "}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#ecf8f7] text-[#0f766e]">
                        {" "}
                        <Package size={18} />{" "}
                      </div>{" "}
                      <div>
                        {" "}
                        <p className="text-sm font-semibold text-[#172121]">
                          {" "}
                          {product.name}{" "}
                        </p>{" "}
                        {product.description && (
                          <p className="mt-0.5 text-xs text-[#526161]">
                            {" "}
                            {product.description}{" "}
                          </p>
                        )}{" "}
                        <p className="mt-1 text-xs font-bold text-[#0f766e]">
                          {" "}
                          ${product.price}{" "}
                        </p>{" "}
                      </div>{" "}
                    </div>{" "}
                    <button className="shrink-0 rounded-[6px] p-2 text-[#899695] transition-colors hover:bg-[#c2413b]/10 hover:text-[#c2413b]">
                      {" "}
                      <Trash2 size={16} />{" "}
                    </button>{" "}
                  </li>
                ))}{" "}
              </ul>
            )}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
