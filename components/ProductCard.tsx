"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Tag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { motion } from "motion/react";

interface ProductCardProps {
  id: string | number;
  name: string;
  description: string;
  price: string | number;
  rating: number;
  imageSrc: string;
  inStock?: boolean;
  isPromo?: boolean;
  promoPrice?: number;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  rating,
  imageSrc,
  inStock = true,
  isPromo = false,
  promoPrice
}: ProductCardProps) {

  const displayPrice = isPromo && promoPrice ? `₵${formatPrice(promoPrice)}` : `₵${formatPrice(price)}`;
  const originalPrice = `₵${formatPrice(price)}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -12 }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`group relative flex flex-col gap-4 sm:gap-6 ${!inStock ? 'opacity-80' : ''}`}
    >
      <Link href={`/product/${id}`} className="block relative overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200/50 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-black/5 group-hover:border-zinc-300/50">
        
        {/* Image Container */}
        <div className="relative aspect-[456/473] w-full overflow-hidden">
          <motion.div 
            className="w-full h-full"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={imageSrc}
              alt={name}
              fill
              className={`object-cover ${!inStock ? 'grayscale' : ''}`}
            />
          </motion.div>

          {/* Status Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {!inStock && (
              <span className="bg-black text-white px-3 py-1 rounded-lg text-[0.6rem] font-bold uppercase tracking-widest">
                Out of Stock
              </span>
            )}
            {isPromo && inStock && (
              <span className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-[0.6rem] font-bold uppercase tracking-widest flex items-center gap-1">
                <Tag size={10} />
                Promo
              </span>
            )}
          </div>
          
          {/* Rating Badge */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-lg bg-white px-3 py-1 text-[0.65rem] font-bold text-black shadow-md z-10">
            <Star className="h-3 w-3 fill-black text-black" />
            {rating.toFixed(1)}
          </div>
        </div>
      </Link>

      {/* Info Content */}
      <div className="flex flex-col gap-3 px-2 pb-4">
        <Link href={`/product/${id}`} className="group/title">
          <h3 className="text-[24px] font-[family-name:var(--font-poppins)] font-normal text-zinc-900 leading-[100%] line-clamp-2 transition-colors group-hover/title:text-black">
            {name}
          </h3>
        </Link>
        {description && (
          <p className="text-[15px] font-[family-name:var(--font-inter)] font-normal text-zinc-500 leading-[100%] line-clamp-1 ">
            {description}
          </p>
        )}

        <div className="mt-2 sm:mt-3 flex items-center justify-between">
          <div className="flex flex-col">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={`/product/${id}`}
                className={`inline-flex items-center justify-center rounded-xl px-5 py-2 sm:px-7 sm:py-2.5 text-[0.7rem] sm:text-sm font-bold transition-all duration-300 whitespace-nowrap ${!inStock
                    ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-zinc-800 hover:shadow-xl hover:shadow-black/10'
                  }`}
              >
                {inStock ? displayPrice : "Unavailable"}
              </Link>
            </motion.div>
            {isPromo && inStock && (
              <span className="text-[10px] text-zinc-400 line-through mt-1 ml-1">{originalPrice}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}