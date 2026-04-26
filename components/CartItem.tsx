import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  id: string | number;
  name: string;
  variant: string;
  pricePerUnit: number;
  quantity: number;
  imageSrc: string;
  onUpdateQuantity: (id: string | number, delta: number) => void;
  onRemove: (id: string | number) => void;
}

export default function CartItem({
  id,
  name,
  variant,
  pricePerUnit,
  quantity,
  imageSrc,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const totalPrice = pricePerUnit * quantity;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-8 border-b border-zinc-200">
      <div className="flex items-center gap-6 w-full sm:w-auto">
        {/* Product Image */}
        <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100">
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-black">{name}</h3>
          <p className="text-zinc-500 text-sm">({variant})</p>
          <p className="text-zinc-400 text-sm mt-2">₵{pricePerUnit.toLocaleString()} per 1</p>
          <button 
            onClick={() => onRemove(id)}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-red-500 transition-colors mt-4"
          >
            <Trash2 size={12} />
            Remove
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto mt-6 sm:mt-0 sm:gap-12 lg:gap-24">
        {/* Quantity Selector */}
        <div className="flex items-center border border-zinc-300 rounded-lg overflow-hidden">
          <button
            onClick={() => onUpdateQuantity(id, -1)}
            disabled={quantity <= 1}
            className="p-3 hover:bg-zinc-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Minus size={18} />
          </button>
          <div className="w-12 text-center font-bold text-lg border-x border-zinc-300 py-2">
            {quantity}
          </div>
          <button
            onClick={() => onUpdateQuantity(id, 1)}
            className="p-3 hover:bg-zinc-50 transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Line Price */}
        <div className="text-xl font-bold text-black min-w-[100px] text-right">
          ₵{totalPrice.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
