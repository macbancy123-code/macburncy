"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Tag } from "lucide-react";
import { formatPrice } from "@/lib/utils";

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
    <div className={`group relative flex flex-col gap-4 sm:gap-6 transition-all duration-500 ${!inStock ? 'opacity-80' : 'hover:-translate-y-1'}`}>
      <Link href={`/product/${id}`} className="block relative overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200/50 shadow-sm group-hover:shadow-2xl group-hover:shadow-black/5 group-hover:border-zinc-300/50 transition-all duration-500">

        {/* Image Container */}
        <div className="relative aspect-[456/473] w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={name}
            fill
            className={`object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${!inStock ? 'grayscale' : ''}`}
          />

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
      <div className="flex flex-col gap-2.5 px-2 pb-4">
        <Link href={`/product/${id}`} className="group/title">
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-zinc-900 leading-tight line-clamp-2 transition-colors group-hover/title:text-black">
            {name}
          </h3>
        </Link>
        <p className="text-[0.7rem] sm:text-xs font-medium text-zinc-500 leading-tight line-clamp-1 ">
          {description}
        </p>

        <div className="mt-2 sm:mt-3 flex items-center justify-between">
          <div className="flex flex-col">
            <Link
              href={`/product/${id}`}
              className={`inline-flex items-center justify-center rounded-xl px-5 py-2 sm:px-7 sm:py-2.5 text-[0.7rem] sm:text-sm font-bold transition-all duration-300 active:scale-95 whitespace-nowrap ${!inStock
                  ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-zinc-800 hover:shadow-xl hover:shadow-black/10'
                }`}
            >
              {inStock ? displayPrice : "Unavailable"}
            </Link>
            {isPromo && inStock && (
              <span className="text-[10px] text-zinc-400 line-through mt-1 ml-1">{originalPrice}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}