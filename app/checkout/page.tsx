"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";

export default function CheckoutPage() {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart();

  return (
    <div className="min-h-screen bg-white">
      {/* Spacer for floating navbar */}
      <div className="h-32 md:h-44"></div>

      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        {/* Background Image with Blur */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/p1.jpg" // Using p1 as a thematic background
            alt="Hero Background"
            fill
            className="object-cover blur-md scale-105 brightness-[0.4]"
            priority
          />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center justify-center pt-32 px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight text-center drop-shadow-2xl">
            Your Shopping Bag
          </h1>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="flex flex-col">
            {/* Cart Items List */}
            <div className="divide-y divide-zinc-200 border-t border-zinc-200">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>

            {/* Empty State */}
            {cart.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-xl text-zinc-500">Your shopping bag is empty.</p>
                <Link href="/shop" className="mt-4 inline-block text-black font-bold underline">
                  Go Shopping
                </Link>
              </div>
            )}

            {/* Order Summary */}
            {cart.length > 0 && <OrderSummary subtotal={subtotal} />}
          </div>
        </div>
      </section>
    </div>
  );
}
