"use client";


import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, Save, Upload, Plus, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { addProduct } from "@/lib/firestore";
import { uploadToCloudinary } from "@/lib/cloudinary-upload";
import Image from "next/image";
import { useEffect } from "react";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const pinVerified = sessionStorage.getItem("admin_pin_verified");
      
      if (!user || pinVerified !== "true") {
        router.push("/admin/login");
      } else {
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "" as any,
    rating: 5.0,
    imageSrc: "",
    category: "Perfume",
    inStock: true,
    isPromo: false,
    promoPrice: "" as any,
  });

  // Mock notes for now
  const [notes, setNotes] = useState({
    top: ["Bergamot", "Saffron"],
    heart: ["Rose", "Incense"],
    base: ["Amber", "Oud"]
  });

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <p className="text-zinc-400 font-bold uppercase tracking-widest animate-pulse">Verifying Credentials...</p>
      </div>
    );
  }

  // Handle Image Upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const url = await uploadToCloudinary(file);
      setFormData({ ...formData, imageSrc: url });
    } catch (err: any) {
      setError(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.imageSrc) {
        throw new Error("Please provide an image URL (for now)");
      }

      await addProduct({
        ...formData,
        price: Number(formData.price),
        promoPrice: formData.isPromo ? Number(formData.promoPrice) : 0,
        notes: notes as any
      } as any);
      
      router.push("/admin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Link 
          href="/admin" 
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors mb-8"
        >
          <ChevronLeft size={16} />
          Back to Inventory
        </Link>

        <div className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Add Scent</h1>
          <button 
            form="product-form"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-zinc-800 transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? "Creating..." : "Save Product"}
          </button>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <form id="product-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-zinc-900 border-b border-zinc-50 pb-4">Essential Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 ml-1">Product Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Spirit of Timbuktu"
                    className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-black transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 ml-1">Short Description</label>
                  <input 
                    type="text" 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="e.g. Original / Midnight Collection"
                    className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-black transition-all outline-none"
                  />
                </div>

              </div>
            </div>

            {/* Pricing & Promo */}
            <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-zinc-900 border-b border-zinc-50 pb-4">Pricing & Promotion</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 ml-1">Base Price (₵)</label>
                  <input 
                    required
                    type="number" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-black transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 ml-1">Promo Price (₵)</label>
                  <input 
                    type="number" 
                    disabled={!formData.isPromo}
                    value={formData.promoPrice}
                    onChange={(e) => setFormData({...formData, promoPrice: e.target.value})}
                    className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-black transition-all outline-none disabled:opacity-30"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, isPromo: !formData.isPromo})}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.isPromo ? 'bg-emerald-500' : 'bg-zinc-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.isPromo ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
                <span className="text-sm font-bold text-zinc-900">Enable Promotional Price</span>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-zinc-900 border-b border-zinc-50 pb-4">Product Media</h3>
              
              <div className="relative aspect-square w-full bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-100 flex flex-col items-center justify-center overflow-hidden group">
                {uploading ? (
                  <div className="flex flex-col items-center gap-2 text-zinc-400">
                    <div className="w-8 h-8 border-4 border-zinc-200 border-t-black rounded-full animate-spin"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest animate-pulse">Distilling Image...</span>
                  </div>
                ) : formData.imageSrc ? (
                  <>
                    <Image src={formData.imageSrc} alt="Preview" fill className="object-cover" />
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, imageSrc: ""})}
                      className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center gap-2 text-zinc-400 hover:text-black transition-colors">
                    <Upload size={32} />
                    <span className="text-xs font-bold uppercase tracking-widest">Select Image</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>

              <div className="text-center">
                <p className="text-[10px] text-zinc-400 font-medium">Recommended: High-resolution portrait orientation.</p>
              </div>
            </div>

            {/* Inventory Status */}
            <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-zinc-900 border-b border-zinc-50 pb-4">Stock Status</h3>
              
              <div className="flex items-center gap-4">
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, inStock: !formData.inStock})}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.inStock ? 'bg-emerald-500' : 'bg-zinc-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.inStock ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
                <span className="text-sm font-bold text-zinc-900">Mark as In Stock</span>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
