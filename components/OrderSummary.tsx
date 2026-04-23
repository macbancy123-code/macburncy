import Link from "next/link";

interface OrderSummaryProps {
  subtotal: number;
}

export default function OrderSummary({ subtotal }: OrderSummaryProps) {
  const total = subtotal; // Shipping and tax are currently placeholder/to be calculated

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

        {/* Details Row */}
        <div className="flex justify-between items-center py-2">
          <span className="text-xl font-medium text-zinc-900">Subtotal:</span>
          <span className="text-xl font-medium text-zinc-900 italic">To be calculated</span>
        </div>

        {/* Total Row */}
        <div className="flex justify-between items-center py-4">
          <span className="text-2xl font-bold text-black">Total:</span>
          <span className="text-3xl font-bold text-black">
            ₵{total.toLocaleString()}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            href="/shop"
            className="flex-1 text-center py-4 px-8 border border-zinc-300 rounded-lg text-sm font-bold text-zinc-600 hover:bg-zinc-50 transition-all uppercase tracking-wide"
          >
            Continue Shopping
          </Link>
          <button
            className="flex-1 py-4 px-8 bg-black text-white rounded-lg text-sm font-bold hover:bg-zinc-900 transition-all uppercase tracking-wide shadow-lg shadow-black/10"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
