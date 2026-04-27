"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getProducts, ProductData } from "@/lib/firestore";

export default function ProductSection() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const maxIndex = Math.max(0, products.length - itemsPerPage);
  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const slideNext = () => {
    if (startIndex < maxIndex) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const slidePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const getVisiblePages = () => {
    const totalSteps = Math.max(0, products.length - itemsPerPage + 1);
    if (totalSteps === 0) return [];
    
    let start = Math.max(0, startIndex - 1);
    let end = Math.min(totalSteps - 1, start + 2);

    if (end === totalSteps - 1) {
      start = Math.max(0, end - 2);
    }

    return Array.from({ length: Math.min(totalSteps, (end - start) + 1) }, (_, i) => start + i);
  };

  return (
    <section id="best-sellers" className="bg-white py-12 pb-20 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        {/* Header Decor */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Best Selling Perfumes
          </h2>
        </div>

        {/* Product Grid */}
        <div
          key={startIndex}
          className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-3 min-h-[400px]"
        >
          {loading ? (
            <div className="col-span-full py-20 text-center text-zinc-400 font-bold uppercase tracking-widest animate-pulse">
              Curating Scent Selection...
            </div>
          ) : visibleProducts.map((product) => (
            <div key={product.id}>
              <ProductCard {...(product as any)} />
            </div>
          ))}
        </div>

        {/* Pagination - Simplified Sliding Controls */}
        <div className="mt-20 flex items-center justify-center gap-4 sm:gap-10">
          <button
            onClick={slidePrev}
            disabled={startIndex === 0}
            className={`flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest transition-all ${startIndex === 0
              ? "opacity-20 cursor-not-allowed text-zinc-400"
              : "text-black hover:opacity-70 cursor-pointer"
              }`}
          >
            <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
            <span>Previous</span>
          </button>

          <div className="flex gap-1.5 sm:gap-3">
            {getVisiblePages().map((index) => (
              <button
                key={index}
                onClick={() => setStartIndex(index)}
                className={`flex h-10 min-w-[3.5rem] sm:h-12 sm:min-w-[4.5rem] px-4 sm:px-6 items-center justify-center rounded-lg transition-all text-xs sm:text-sm font-bold ${startIndex === index
                  ? "bg-black text-white shadow-md"
                  : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200 hover:text-black"
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={slideNext}
            disabled={startIndex >= maxIndex}
            className={`flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest transition-all ${startIndex >= maxIndex
              ? "opacity-20 cursor-not-allowed text-zinc-400"
              : "text-black hover:opacity-70 cursor-pointer"
              }`}
          >
            <span>Next</span>
            <ChevronRight size={16} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
