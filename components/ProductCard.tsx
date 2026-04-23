"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Product } from "@/constants/products";

export default function ProductCard({ id, name, description, price, rating, imageSrc }: Product) {
  return (
    <div className="group relative flex flex-col gap-4 sm:gap-6 transition-all duration-500 hover:-translate-y-1">
      <Link href={`/product/${id}`} className="block relative overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200/50 shadow-sm group-hover:shadow-2xl group-hover:shadow-black/5 group-hover:border-zinc-300/50 transition-all duration-500">

        {/* Image Container */}
        <div className="relative aspect-[456/473] w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {/* Subtle Overlay on Hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>

          {/* Rating Badge - On the image, bottom right, minimized */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-lg bg-white px-3 py-1 text-[0.65rem] font-bold text-black shadow-md z-10">
            <Star className="h-3 w-3 fill-black text-black" />
            {rating.toFixed(1)}
          </div>
        </div>
      </Link>

      {/* Info Content */}
      <div className="flex flex-col gap-2.5 px-2 pb-4">
        <Link href={`/product/${id}`} className="group/title">
          <h3 className="text-base sm:text-xl font-bold tracking-tight text-zinc-900 leading-tight line-clamp-2 transition-colors group-hover/title:text-black">
            {name}
          </h3>
        </Link>
        <p className="text-[0.7rem] sm:text-sm font-medium text-zinc-500 leading-tight line-clamp-1 italic">
          {description}
        </p>

        <div className="mt-2 sm:mt-3 flex items-center justify-between">
          <Link
            href={`/product/${id}`}
            className="inline-flex items-center justify-center rounded-xl bg-black text-white px-5 py-2 sm:px-7 sm:py-2.5 text-[0.7rem] sm:text-sm font-bold transition-all duration-300 hover:bg-zinc-800 hover:shadow-xl hover:shadow-black/10 active:scale-95 whitespace-nowrap"
          >
            {price}
          </Link>
          <Link href={`/product/${id}`} className="text-[0.65rem] sm:text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors hidden sm:block">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}