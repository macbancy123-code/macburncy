import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/constants/products";

export default function ShopPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Spacer for floating navbar */}
      <div className="h-32 md:h-44"></div>

      <main className="w-full px-3 sm:px-6 md:px-12 lg:px-24 py-12">
        <div className="flex flex-col gap-4 mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Our Collection
          </h1>
          <p className="text-base sm:text-lg text-zinc-500 max-w-2xl">
            Discover our range of luxury African fragrances, each crafted with heritage and sophistication in mind.
          </p>
        </div>

        {/* Product Grid — 2 cols on mobile, 3 on lg, 4 on xl */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-3 xl:grid-cols-4 pb-20">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </div>
  );
}