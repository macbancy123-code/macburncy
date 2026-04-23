"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";

export default function CheckoutPage() {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart();

  return (
    <div className="min-h-screen bg-white">
      {/* Cinematic Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="Shopping Bag Hero"
          fill
          className="object-cover scale-105"
          priority
        />

        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 flex h-full flex-col items-center justify-center px-6"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-amber-600 mb-4 block">
              Mac Bancy
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-none  drop-shadow-lg">
              Your Shopping Bag
            </h1>
          </motion.div>
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
