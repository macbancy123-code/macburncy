"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronLeft, ArrowRight } from "lucide-react";
import { getProduct, getProducts, ProductData } from "@/lib/firestore";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";
import { notFound } from "next/navigation";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await getProduct(id);
        if (!data) return;
        setProduct(data);

        // Fetch related
        const all = await getProducts();
        setRelatedProducts(all.filter(p => p.id !== id).slice(0, 3));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <p className="text-zinc-400 font-medium animate-pulse">Unveiling Scent Details...</p>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  // Mock Scent Profile (could be in DB too)
  const scentProfile = {
    top: ["Bergamot", "Saffron", "Black Pepper"],
    heart: ["Incense", "Rose", "Oud"],
    base: ["Sandalwood", "Amber", "Musk"],
  };

  const displayPrice = product.isPromo && product.promoPrice ? `₵${product.promoPrice}` : `₵${product.price}`;

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Navigation / Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <Link 
          href="/shop" 
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Shop
        </Link>
      </div>

      {/* Product Detail Section */}
      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-2">
            
            {/* Product Image */}
            <div className="relative aspect-[456/473] w-full overflow-hidden rounded-2xl bg-zinc-100 shadow-xl">
              <Image
                src={product.imageSrc}
                alt={product.name}
                fill
                className={`object-cover ${!product.inStock ? 'grayscale' : ''}`}
                priority
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="bg-black text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest shadow-2xl">
                    Sold Out
                  </span>
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-400 uppercase tracking-widest">
                  Mac Bancy Atelier
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-black">
                  {product.name}
                </h1>
                <p className="text-xl font-medium text-zinc-500 italic">
                  {product.description}
                </p>
              </div>

              {/* Price and Rating */}
              <div className="flex items-center justify-between py-4">
                <div className="flex flex-col">
                  <div className="text-3xl font-bold text-black pr-8">
                    {displayPrice}
                  </div>
                  {product.isPromo && (
                    <span className="text-sm text-zinc-400 line-through mt-1 italic">₵{product.price}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={18} 
                        className={i < Math.floor(product.rating) ? "fill-black text-black" : "text-zinc-200"} 
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-black ml-2">
                    {product.rating.toFixed(1)} / 5.0
                  </span>
                </div>
              </div>

              {/* Scent Profile */}
              <div className="flex flex-col gap-6">
                <h3 className="text-lg font-bold uppercase tracking-widest text-black">Fragrance Profile</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2 text-center sm:text-left">
                    <span className="text-xs font-bold uppercase text-zinc-400">Top Notes</span>
                    <p className="text-sm font-medium text-zinc-900 leading-relaxed">{scentProfile.top.join(", ")}</p>
                  </div>
                  <div className="flex flex-col gap-2 text-center sm:text-left">
                    <span className="text-xs font-bold uppercase text-zinc-400">Heart Notes</span>
                    <p className="text-sm font-medium text-zinc-900 leading-relaxed">{scentProfile.heart.join(", ")}</p>
                  </div>
                  <div className="flex flex-col gap-2 text-center sm:text-left">
                    <span className="text-xs font-bold uppercase text-zinc-400">Base Notes</span>
                    <p className="text-sm font-medium text-zinc-900 leading-relaxed">{scentProfile.base.join(", ")}</p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-4 flex flex-col gap-4">
                {product.inStock ? (
                  <AddToCartButton product={product as any} />
                ) : (
                  <button disabled className="w-full bg-zinc-200 text-zinc-500 py-6 rounded-full font-bold uppercase tracking-widest cursor-not-allowed">
                    Currently Unavailable
                  </button>
                )}
                <p className="text-center text-xs text-zinc-400 font-bold uppercase tracking-widest">
                  Secure Checkout & Free Global Shipping
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      {product.discoveryText && (
        <section className="bg-white py-20 lg:py-32">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-10 text-black">The Story of {product.name}</h2>
              <div className="text-lg text-zinc-500 leading-relaxed max-w-3xl mx-auto font-light italic">
                  <p>{product.discoveryText}</p>
              </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 lg:py-32 border-t border-zinc-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-black">Explore Others</h2>
              <Link href="/shop" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">
                View All <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-8 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} {...(p as any)} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
