"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/constants/products";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface DiscoverRowProps {
  product: Product;
  isReversed?: boolean;
}

export default function DiscoverRow({ product, isReversed }: DiscoverRowProps) {
  return (
    <div className={`flex flex-col gap-12 md:gap-24 py-20 md:py-32 border-b border-zinc-50 last:border-0 ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}>
      {/* Image Column */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full md:w-1/2"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-zinc-50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] group">
          <Image
            src={product.imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-1000" />
        </div>
      </motion.div>

      {/* Content Column */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 flex flex-col gap-8 text-center md:text-left items-center md:items-start"
      >
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-600">
            Fragrance Note No. 0{product.id}
          </span>
          <h2 className="text-[24px] md:text-[40px] font-[family-name:var(--font-poppins)] font-normal text-zinc-900 leading-[100%]">
            {product.name}
          </h2>
          <p className="text-[15px] font-[family-name:var(--font-inter)] font-normal text-zinc-400 leading-[100%] tracking-wide">
            {product.description}
          </p>
        </div>

        <p className="text-lg text-zinc-500 font-light leading-relaxed max-w-lg">
          {product.discoveryText || "An olfactory journey inspired by the rich heritage of the Gold Coast, blending rare botanicals with modern distillation techniques."}
        </p>

      </motion.div>
    </div>
  );
}
