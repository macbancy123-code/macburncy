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
  Loader2,
  GripVertical
} from "lucide-react";
import { motion, Reorder } from "motion/react";
import { 
  getProducts, 
  updateProduct, 
  deleteProduct, 
  ProductData, 
  seedDatabase,
  updateProductsOrder 
} from "@/lib/firestore";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

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
    alert("Database seeding is disabled since you are managing products manually.");
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

  const handleReorder = async (newOrder: ProductData[]) => {
    setProducts(newOrder);
    try {
      const orderUpdates = newOrder.map((p, index) => ({
        id: p.id!,
        order: index
      }));
      await updateProductsOrder(orderUpdates);
    } catch (error) {
      console.error("Failed to save new order:", error);
      setMessage({ type: 'error', text: 'Failed to save arrangement' });
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    setLoading(true);
    try {
      await updateProduct(editingProduct.id!, {
        name: editingProduct.name,
        description: editingProduct.description,
        discoveryText: editingProduct.discoveryText,
        price: Number(editingProduct.price),
        promoPrice: editingProduct.isPromo ? Number(editingProduct.promoPrice) : 0,
        isPromo: editingProduct.isPromo,
        inStock: editingProduct.inStock
      });
      setMessage({ type: 'success', text: 'Product updated successfully' });
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update product' });
    } finally {
      setLoading(false);
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
              <Reorder.Group 
                as="tbody" 
                axis="y" 
                values={products} 
                onReorder={handleReorder}
                className="divide-y divide-zinc-50"
              >
                {loading ? (
                  <tr><td colSpan={5} className="px-6 py-20 text-center text-zinc-400">Loading inventory...</td></tr>
                ) : products.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-20 text-center text-zinc-400">No products found. Add your first scent!</td></tr>
                ) : (
                  products.map((product) => (
                    <Reorder.Item 
                      key={product.id} 
                      value={product}
                      as="tr"
                      className="hover:bg-zinc-50/50 transition-colors cursor-default bg-white"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="text-zinc-300 cursor-grab active:cursor-grabbing hover:text-zinc-600 transition-colors">
                            <GripVertical size={20} />
                          </div>
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
                            ₵{formatPrice(product.isPromo ? product.promoPrice! : product.price)}
                          </span>
                          {product.isPromo && (
                            <span className="text-[10px] text-zinc-400 line-through">₵{formatPrice(product.price)}</span>
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
                          <button 
                            onClick={() => setEditingProduct(product)}
                            className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors"
                          >
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
                    </Reorder.Item>
                  ))
                )}
              </Reorder.Group>
            </table>
          </div>
        </div>
      </div>
      
      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setEditingProduct(null)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-zinc-100 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-zinc-900">Edit Scent</h2>
              <button onClick={() => setEditingProduct(null)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                <Plus className="rotate-45" size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Product Name</label>
                    <input 
                      type="text" 
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-black transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Collection / Short Desc</label>
                    <input 
                      type="text" 
                      value={editingProduct.description}
                      onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-black transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Discover Page Story</label>
                    <textarea 
                      value={editingProduct.discoveryText || ""}
                      onChange={(e) => setEditingProduct({...editingProduct, discoveryText: e.target.value})}
                      rows={3}
                      placeholder="Story for the Discover page..."
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-black transition-all outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Base Price (₵)</label>
                    <input 
                      type="number" 
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value as any})}
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-black transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Promo Price (₵)</label>
                    <input 
                      type="number" 
                      disabled={!editingProduct.isPromo}
                      value={editingProduct.promoPrice || ''}
                      onChange={(e) => setEditingProduct({...editingProduct, promoPrice: e.target.value as any})}
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-black transition-all outline-none disabled:opacity-30"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                <div className="flex gap-8">
                  <div className="flex items-center gap-3">
                    <button 
                      type="button"
                      onClick={() => setEditingProduct({...editingProduct, isPromo: !editingProduct.isPromo})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${editingProduct.isPromo ? 'bg-emerald-500' : 'bg-zinc-200'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${editingProduct.isPromo ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                    <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Promo</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      type="button"
                      onClick={() => setEditingProduct({...editingProduct, inStock: !editingProduct.inStock})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${editingProduct.inStock ? 'bg-emerald-500' : 'bg-zinc-200'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${editingProduct.inStock ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                    <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">In Stock</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-6 py-3 rounded-xl font-bold text-sm text-zinc-500 hover:bg-zinc-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white px-10 py-3 rounded-xl font-bold text-sm hover:bg-zinc-800 transition-all shadow-lg shadow-black/10 active:scale-95 disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
