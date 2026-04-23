"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart, CartItem } from "@/context/CartContext";

interface AddToCartButtonProps {
  product: {
    id: number;
    name: string;
    price: string;
    description: string;
    imageSrc: string;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const priceValue = parseInt(product.price.replace(/[^\d]/g, ""));

  const handleAddToCart = () => {
    const item: CartItem = {
      id: product.id,
      name: product.name,
      variant: product.description,
      pricePerUnit: priceValue,
      quantity: 1,
      imageSrc: product.imageSrc,
    };
    
    addToCart(item);
    setAdded(true);
    
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`flex items-center justify-center gap-3 w-full py-5 rounded-xl font-bold text-lg transition-all shadow-xl active:scale-[0.98] ${
        added 
          ? "bg-green-600 text-white shadow-green-900/20" 
          : "bg-black text-white hover:bg-zinc-900 shadow-black/10"
      }`}
    >
      {added ? (
        <>
          <Check size={22} />
          Added to Bag
        </>
      ) : (
        <>
          <ShoppingCart size={22} />
          Add to Cart
        </>
      )}
    </button>
  );
}
