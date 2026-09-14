"use client";
import React, { useState, useEffect } from "react";
import {
  Package,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Loader2,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/Auth";
import {
  addProducts,
  getProducts,
  deleteProduct,
  updateProduct,
} from "@/actions/products";
import { ProductsType } from "@/types/ProductsTypes";
import { logOut } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useActivity } from "@/contextAPI/ActivityContent";
import { getUser } from "@/actions/signUpDatabase";
import { useAuth } from "@/contextAPI/AuthContext";
import { userActivity } from "@/actions/signUpDatabase";

export default function ProductsPage() {
  const now = new Date();

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const { user } = useAuth();

  const { setUserActivity } = useActivity();
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState<boolean>(true);
  const [selected, setSelected] = useState<number[]>([]);

  // Form State
  const [fields, setFields] = useState<ProductsType>({
    name: "",
    price: "",
    description: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  // When User Add Product It Will Be Shown Too
  async function fetchProducts(uid: string) {
    try {
      setLoading(true);
      const productData = await getProducts(uid);
      setProducts(productData || []);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  }

  // To Show LogedIn User Product When LogedIn
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      fetchProducts(user.uid);
    } else {
      setProducts([]);
    }
  }, [user]);

  // Input Fields To Add Product
  function handleInputFields(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  }

  // To Edit Product Or Add
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!currentUser) return;

    if (!fields.name || !fields.price || !fields.description) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      if (editingId) {
        await updateProduct(fields, editingId);
      } else {
        await addProducts(fields, currentUser.uid);
        console.log(fields);
      }

      setFields({ name: "", price: "", description: "" });
      setEditingId(null);

      await fetchProducts(currentUser.uid);
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Edit Product
  const handleEditClick = (product: ProductsType) => {
    setFields({
      name: product.name,
      price: product.price,
      description: product.description,
    });
    setEditingId(product.id || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancel Editing Product
  const handleCancelEdit = () => {
    setFields({ name: "", price: "", description: "" });
    setEditingId(null);
  };

  // Delete Product
  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      setLoading(true);
      if (typeof deleteProduct === "function") {
        await deleteProduct(id);
      } else {
        console.warn("deleteProduct action not found, skipping delete.");
        setProducts((prev) => prev.filter((p) => p.id !== id));
        return;
      }

      if (currentUser) {
        await fetchProducts(currentUser.uid);
      }
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setLoading(false);
    }
  }

  // Logout User
  async function handleLogOut() {
    if (user) {
      const userData = await getUser(user.uid);
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

  function handleSelect() {
    setSelect(!select);
  }

  function handleSelectedProducts(id: number) {
    if (select) {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Product Manager
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your inventory efficiently.
            </p>
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={handleLogOut}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-sm ring-1 ring-inset ring-red-200 hover:bg-red-50 transition-colors"
            >
              Sign Out
            </button>
            <button
              onClick={() => handleSelect()}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-teal-600 hover:bg-teal-700  px-4 py-2 text-sm font-medium text-white shadow-sm  transition-colors"
            >
              {select && selected.length > 0
                ? "Confirm"
                : select
                  ? "Cancel"
                  : "Select"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-4">
            <div className="sticky top-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                  {editingId ? "Edit Product" : "Add New Product"}
                </h2>
                {editingId && (
                  <button
                    onClick={handleCancelEdit}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={fields.name}
                    onChange={handleInputFields}
                    placeholder="e.g. Wireless Headphones"
                    className="mt-1 block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={fields.price}
                    onChange={handleInputFields}
                    placeholder="0.00"
                    step="0.01"
                    className="mt-1 block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={fields.description}
                    onChange={handleInputFields}
                    placeholder="Brief details about the product..."
                    className="mt-1 block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white transition-all ${
                    editingId
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-teal-600 hover:bg-teal-700"
                  } disabled:opacity-70`}
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : editingId ? (
                    <Save size={18} />
                  ) : (
                    <Plus size={18} />
                  )}
                  {editingId ? "Update Product" : "Add Product"}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: List */}
          <div className="lg:col-span-8">
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4 flex justify-between items-center">
                <h2 className="font-semibold text-slate-900">Inventory List</h2>
                <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-800">
                  {products.length} Items
                </span>
              </div>

              {loading && products.length === 0 ? (
                <div className="flex h-64 items-center justify-center">
                  <Loader2 className="animate-spin text-teal-600" size={32} />
                </div>
              ) : products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <Package size={32} />
                  </div>
                  <h3 className="text-base font-medium text-slate-900">
                    No products found
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Get started by adding a new product from the form.
                  </p>
                </div>
              ) : (
                <ul className="divide-y max-h-150 overflow-y-scroll scrollbar-none divide-slate-100">
                  {products.map((product, index) => (
                    <li
                      onClick={() => handleSelectedProducts(Number(product.id))}
                      key={product.id}
                      className="group flex cursor-pointer items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {select &&
                          (selected.includes(Number(product.id)) ? (
                            <CheckCircle2 />
                          ) : (
                            <Circle />
                          ))}

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                          <Package size={20} />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900">
                            {product.name}
                          </h4>
                          <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">
                            {product.description}
                          </p>
                          <p className="mt-1 text-sm font-bold text-teal-600">
                            ${product.price}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button className="rounded-md cursor-pointer bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-700 transition-colors">
                          Buy
                        </button>

                        <button
                          onClick={() => handleEditClick(product)}
                          className="rounded-md p-2 text-slate-400 cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id!)}
                          className="rounded-md p-2 text-slate-400 cursor-pointer hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
