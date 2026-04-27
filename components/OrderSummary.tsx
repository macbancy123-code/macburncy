"use client";

import Link from "next/link";
import { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { CartItem, useCart } from "@/context/CartContext";
import { CheckCircle2 } from "lucide-react";

interface OrderSummaryProps {
  subtotal: number;
  cart: CartItem[];
}

export default function OrderSummary({ subtotal, cart }: OrderSummaryProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [reference, setReference] = useState("");
  const { clearCart } = useCart();

  const config = {
    reference: (new Date()).getTime().toString(),
    email: email,
    amount: subtotal * 100, // Paystack uses kobo/pesewas
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_placeholder",
    currency: "GHS",
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference: any) => {
    setIsPaid(true);
    setReference(reference.reference);
  };

  const onClose = () => {
    console.log('closed')
  }

  const handleWhatsApp = () => {
    const productsList = cart.map(item => `- ${item.name} (${item.variant}) x${item.quantity}`).join('\n');
    const message = `Hello Mac Bancy,\n\nI just made a payment of ₵${subtotal.toLocaleString()} for the following items:\n${productsList}\n\nPayment Reference: ${reference}\n\nPlease confirm my order. Thank you!`;
    const whatsappUrl = `https://wa.me/233543940123?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    clearCart();
  };

  return (
    <div className="mt-12 py-8 bg-white">
      <div className="flex flex-col gap-6">
        {/* Order Summary Title and Subtotal Line */}
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-bold tracking-tight text-black uppercase">Order Summary</h2>
          <div className="text-2xl font-bold text-black">
            ₵{subtotal.toLocaleString()}
          </div>
        </div>

        {!isPaid ? (
          <div className="flex flex-col gap-5 py-6 border-y border-zinc-100">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1">
                Customer Email
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. grace@example.com"
                className="w-full py-4 px-5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm font-medium placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black focus:bg-white transition-all duration-300"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1">
                Full Name
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Grace Mensah"
                className="w-full py-4 px-5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm font-medium placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black focus:bg-white transition-all duration-300"
                required
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 py-6 px-4 bg-emerald-50 border border-emerald-100 rounded-xl">
            <CheckCircle2 className="text-emerald-500" size={24} />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-emerald-700">Payment Verified</span>
              <span className="text-xs text-emerald-600">Reference: {reference}</span>
            </div>
          </div>
        )}

        {/* Total Row */}
        <div className="flex justify-between items-center py-4">
          <span className="text-2xl font-bold text-black">Total:</span>
          <span className="text-3xl font-bold text-black">
            ₵{subtotal.toLocaleString()}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {!isPaid ? (
            <>
              <Link
                href="/shop"
                className="flex-1 text-center py-4 px-8 border border-zinc-300 rounded-lg text-sm font-bold text-zinc-600 hover:bg-zinc-50 transition-all uppercase tracking-wide"
              >
                Continue Shopping
              </Link>
              <button
                onClick={() => {
                  if (!email || !name) {
                    alert("Please enter your name and email to proceed.");
                    return;
                  }
                  initializePayment({ onSuccess, onClose });
                }}
                className="flex-1 py-4 px-8 bg-black text-white rounded-lg text-sm font-bold hover:bg-zinc-900 transition-all uppercase tracking-wide shadow-lg shadow-black/10"
              >
                Proceed to Payment
              </button>
            </>
          ) : (
            <button
              onClick={handleWhatsApp}
              className="w-full py-5 px-8 bg-emerald-500 text-white rounded-xl text-lg font-bold hover:bg-emerald-600 transition-all uppercase tracking-widest shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3"
            >
              Confirm Order on WhatsApp
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
