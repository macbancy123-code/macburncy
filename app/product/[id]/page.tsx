"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronLeft, ArrowRight } from "lucide-react";
import { getProduct, getProducts, ProductData, rateProduct } from "@/lib/firestore";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [hasRated, setHasRated] = useState(false);
  const [ratingLoading, setRatingLoading] = useState(false);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await getProduct(id);
        if (!data) return;
        setProduct(data);

        // Check if already rated in this browser
        const ratedBefore = localStorage.getItem(`rated_${id}`);
        if (ratedBefore) setHasRated(true);

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

  const handleRate = async (score: number) => {
    if (hasRated || ratingLoading) return;
    
    setRatingLoading(true);
    try {
      const newRating = await rateProduct(id, score);
      if (product && newRating !== undefined) {
        setProduct({ ...product, rating: newRating });
      }
      setHasRated(true);
      localStorage.setItem(`rated_${id}`, "true");
    } catch (error) {
      console.error("Failed to rate:", error);
    } finally {
      setRatingLoading(false);
    }
  };

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


  const displayPrice = product.isPromo && product.promoPrice ? `₵${product.promoPrice}` : `₵${product.price}`;

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Spacer for floating navbar */}
      <div className="h-32 md:h-30"></div>

      {/* Navigation / Breadcrumbs */}
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-4">
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
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
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
                <p className="text-xl font-medium text-zinc-500 ">
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
                    <span className="text-sm text-zinc-400 line-through mt-1 ">₵{product.price}</span>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          disabled={hasRated || ratingLoading}
                          onMouseEnter={() => !hasRated && setHoverRating(star)}
                          onMouseLeave={() => !hasRated && setHoverRating(null)}
                          onClick={() => handleRate(star)}
                          className={`transition-all duration-300 ${
                            hasRated ? 'cursor-default' : 'cursor-pointer hover:scale-125 active:scale-95'
                          } ${(hoverRating || (hasRated ? 0 : product.rating)) >= star ? "text-black" : "text-zinc-200"}`}
                        >
                          <Star 
                            size={22} 
                            className={`${(hoverRating || product.rating) >= star ? "fill-current" : ""}`}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-lg font-bold text-black ml-2">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                  <AnimatePresence>
                    {hasRated && (
                      <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] font-bold uppercase tracking-widest text-emerald-500"
                      >
                        Thanks for rating!
                      </motion.span>
                    )}
                  </AnimatePresence>
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
            <div className="text-lg text-zinc-500 leading-relaxed max-w-3xl mx-auto font-light ">
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
