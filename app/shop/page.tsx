"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { getProducts, ProductData } from "@/lib/firestore";
import { PRODUCTS as STATIC_PRODUCTS } from "@/constants/products";

export default function ShopPage() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        // If DB is empty, fallback to static products for initial experience
        if (data.length === 0) {
          // You might want to seed the DB here or just show static
          setProducts(STATIC_PRODUCTS as any);
        } else {
          setProducts(data);
        }
      } catch (error) {
        console.error(error);
        setProducts(STATIC_PRODUCTS as any);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Spacer for floating navbar */}
      <div className="h-32 md:h-44"></div>

      <main className="w-full px-3 sm:px-6 md:px-12 lg:px-24 py-12">

        {loading ? (
          <div className="py-40 text-center text-zinc-400 font-medium">
            Curating collection...
          </div>
        ) : (
          /* Product Grid — 2 cols on mobile, 3 on lg, 4 on xl */
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-3 pb-20">
            {products.map((product) => (
              <ProductCard key={product.id} {...(product as any)} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}