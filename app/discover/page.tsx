"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getProducts, ProductData } from "@/lib/firestore";
import { PRODUCTS as STATIC_PRODUCTS } from "@/constants/products";

function ProductRow({ product, index }: { product: ProductData; index: number }) {
  const isReversed = index % 2 !== 0;

  return (
    <div
      className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-20 mb-16 lg:mb-24 ${isReversed ? "lg:flex-row-reverse" : ""
        }`}
    >
      {/* Image Column */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full lg:w-[40%] flex justify-center"
      >
        <div className="relative w-full max-w-[400px] aspect-square overflow-hidden rounded-2xl shadow-lg group">
          <Image
            src={product.imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        </div>
      </motion.div>

      {/* Text Column */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
        className="w-full lg:flex-1 space-y-4 text-center lg:text-left"
      >
        <div className="space-y-1">
          <h2 className="text-2xl lg:text-4xl font-bold tracking-tight text-zinc-900 leading-tight">
            {product.name}
          </h2>
          {product.description && (
            <p className="text-sm text-amber-600 font-medium  tracking-wide">
              {product.description}
            </p>
          )}
        </div>

        <p className="text-base lg:text-lg text-zinc-500 leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">
          {product.discoveryText || product.description}
        </p>

        <button className="mt-4 px-8 py-3.5 bg-zinc-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-amber-600 transition-all duration-500 shadow-md active:scale-95">
          Shop Now
        </button>
      </motion.div>
    </div>
  );
}

export default function DiscoverPage() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        if (data.length === 0) {
          // Map static products to match ProductData if needed
          setProducts(STATIC_PRODUCTS.map(p => ({
            ...p,
            price: Number(p.price.replace(/[^0-9.-]+/g, "")),
            inStock: true,
            isPromo: false,
            category: "Perfume"
          })) as any);
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
    <div className="min-h-screen bg-white">
      {/* Cinematic Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="Discovery Hero"
          fill
          className="object-cover scale-105"
          priority
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-amber-600 mb-4 block">
            Mac Bancy
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-none ">
            Discover Our Scents
          </h1>
        </motion.div>
      </section>

      {/* Product Feed */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-24 lg:py-40">
        {loading ? (
          <div className="py-20 text-center text-zinc-400 animate-pulse font-bold uppercase tracking-widest">
            Loading Collection...
          </div>
        ) : (
          products.map((product, index) => (
            <ProductRow key={product.id} product={product} index={index} />
          ))
        )}
      </main>
    </div>
  );
}