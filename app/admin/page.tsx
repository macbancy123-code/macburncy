"use client";


import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  Plus,
  Settings,
  Package,
  Tag,
  Eye,
  Trash2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  LogOut,
  Loader2
} from "lucide-react";
import { motion } from "motion/react";
import { getProducts, updateProduct, deleteProduct, ProductData, seedDatabase } from "@/lib/firestore";
import { PRODUCTS as STATIC_PRODUCTS } from "@/constants/products";
import Image from "next/image";
import Link from "next/link";

export default function AdminDashboard() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const pinVerified = sessionStorage.getItem("admin_pin_verified");
      
      if (!user || pinVerified !== "true") {
        router.push("/admin/login");
      } else {
        setCheckingAuth(false);
        fetchProducts();
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <p className="text-zinc-400 font-bold uppercase tracking-widest animate-pulse">Verifying Credentials...</p>
      </div>
    );
  }

  const toggleStock = async (id: string, currentStatus: boolean) => {
    try {
      await updateProduct(id, { inStock: !currentStatus });
      setMessage({ type: 'success', text: `Product ${!currentStatus ? 'restocked' : 'marked as out of stock'}` });
      fetchProducts();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update stock' });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        setMessage({ type: 'success', text: 'Product deleted' });
        fetchProducts();
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to delete product' });
      }
    }
  };

  const handleSeed = async () => {
    if (confirm("This will import the original collection into your live database. Continue?")) {
      setLoading(true);
      try {
        const res = await seedDatabase(STATIC_PRODUCTS);
        setMessage({ type: res.success ? 'success' : 'error', text: res.message });
        fetchProducts();
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to seed database' });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem("admin_pin_verified");
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 overflow-x-hidden">
      {/* Cinematic Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="Admin Hero"
          fill
          className="object-cover scale-105 brightness-[0.7]"
          priority
        />

        <div className="absolute inset-0 z-0 bg-black/20"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          {/* <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-amber-500 mb-4 block">
            Mac Bancy Atelier
          </span> */}
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-none  drop-shadow-lg">
            Management Suite
          </h1>
          <button 
            onClick={handleLogout}
            className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/80 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-12 relative z-20 pb-20">

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-white p-8 rounded-3xl border border-zinc-100 shadow-xl">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Collection Inventory</h2>
            <p className="text-sm text-zinc-500">Monitor and refine your luxury scent library.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSeed}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 bg-zinc-100 text-zinc-600 px-8 py-4 rounded-2xl font-bold text-sm hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50 min-w-[220px]"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Syncing Collection...
                </>
              ) : (
                "Sync Original Collection"
              )}
            </button>
            <Link
              href="/admin/add"
              className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-zinc-800 transition-all shadow-lg active:scale-95"
            >
              <Plus size={20} />
              Add New Scent
            </Link>
          </div>
        </div>

        {/* Notifications */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-4 rounded-xl flex items-center gap-3 border ${message.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700'
              }`}
          >
            {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span className="text-sm font-medium">{message.text}</span>
            <button onClick={() => setMessage(null)} className="ml-auto opacity-50 hover:opacity-100">
              <Plus className="rotate-45" size={20} />
            </button>
          </motion.div>
        )}

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Total Products', value: products.length, icon: Package },
            { label: 'Active Promos', value: products.filter(p => p.isPromo).length, icon: Tag },
            { label: 'Out of Stock', value: products.filter(p => !p.inStock).length, icon: XCircle },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-zinc-50 rounded-lg text-zinc-400">
                  <stat.icon size={20} />
                </div>
              </div>
              <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-3xl border border-zinc-100 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-100">
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-zinc-400">Product</th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-zinc-400">Price</th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-zinc-400">Status</th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-zinc-400">Promo</th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-zinc-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {loading ? (
                  <tr><td colSpan={5} className="px-6 py-20 text-center text-zinc-400">Loading inventory...</td></tr>
                ) : products.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-20 text-center text-zinc-400">No products found. Add your first scent!</td></tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-100 border border-zinc-200">
                            <Image src={product.imageSrc} alt={product.name} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-zinc-900">{product.name}</p>
                            <p className="text-xs text-zinc-400 truncate max-w-[200px]">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className={`font-bold ${product.isPromo ? 'text-emerald-600' : 'text-zinc-900'}`}>
                            ₵{product.isPromo ? product.promoPrice : product.price}
                          </span>
                          {product.isPromo && (
                            <span className="text-[10px] text-zinc-400 line-through">₵{product.price}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleStock(product.id!, product.inStock)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${product.inStock
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-red-50 text-red-600'
                            }`}
                        >
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        {product.isPromo ? (
                          <div className="flex items-center gap-1.5 text-emerald-600">
                            <Tag size={12} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Active</span>
                          </div>
                        ) : (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">None</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/product/${product.id}`} className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors">
                            <Eye size={18} />
                          </Link>
                          <button className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors">
                            <Settings size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id!)}
                            className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
