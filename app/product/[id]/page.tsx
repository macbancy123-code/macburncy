import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, ChevronLeft, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/constants/products";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";
import { notFound } from "next/navigation";

// Utility to get random products for "Related Products"
const getRelatedProducts = (currentId: number, count: number = 3) => {
  return PRODUCTS.filter((p) => p.id !== currentId)
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
};

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === parseInt(id));

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id);

  // Mock Scent Profile
  const scentProfile = {
    top: ["Bergamot", "Saffron", "Black Pepper"],
    heart: ["Incense", "Rose", "Oud"],
    base: ["Sandalwood", "Amber", "Musk"],
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Spacer for floating navbar */}
      <div className="h-32 md:h-44"></div>

      {/* Navigation / Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8 md:hidden">
        <Link 
          href="/shop" 
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-black transition-colors"
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
                className="object-cover"
                priority
              />
            </div>

            {/* Product info */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-400 uppercase tracking-widest">
                  Mac Bancy Perfumes
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-black">
                  {product.name}
                </h1>
                <p className="text-xl font-medium text-zinc-500 italic">
                  {product.description}
                </p>
              </div>

              {/* Price and Rating */}
              <div className="flex items-center justify-between py-4 border-y border-zinc-100">
                <div className="text-3xl font-bold text-black border-r border-zinc-100 pr-8">
                  {product.price}
                </div>
                <div className="flex items-center gap-2 pl-8">
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
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase text-zinc-400">Top Notes</span>
                    <p className="text-sm font-medium text-zinc-900 leading-relaxed">{scentProfile.top.join(", ")}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase text-zinc-400">Heart Notes</span>
                    <p className="text-sm font-medium text-zinc-900 leading-relaxed">{scentProfile.heart.join(", ")}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase text-zinc-400">Base Notes</span>
                    <p className="text-sm font-medium text-zinc-900 leading-relaxed">{scentProfile.base.join(", ")}</p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-4 flex flex-col gap-4">
                <AddToCartButton product={product} />
                <p className="text-center text-sm text-zinc-400 font-medium">
                  Free shipping on all luxury collections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description / Story Section */}
      <section className="bg-zinc-50 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-8 text-black">The Story of {product.name}</h2>
            <div className="flex flex-col gap-6 text-lg text-zinc-600 leading-relaxed max-w-3xl mx-auto">
                <p>
                    Macbancy Perfumes, founded in Ghana, celebrates Africa's heritage through captivating scents. Each fragrance tells a unique story using rare herbs, spices, and botanicals. We honor the continent's legacy by blending tradition with the art of perfumery.
                </p>
                <p>
                    {product.name} is a testament to this vision, offering a bold yet sophisticated olfactory journey that captures the essence of luxury and cultural pride.
                </p>
            </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-black">You May Also Like</h2>
            <Link href="/shop" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-8 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
